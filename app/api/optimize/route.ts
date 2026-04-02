import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import { checkRateLimit } from '@/lib/rate-limit';

const execAsync = promisify(exec);

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const isAllowed = checkRateLimit(`optimize_${ip}`, 20, 60 * 1000); // 20 requests per minute
    if (!isAllowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'photo', 'signature', 'document'
    const format = formData.get('format') as string; // 'jpg', 'png', 'pdf'
    const width = formData.get('width') ? parseInt(formData.get('width') as string, 10) : undefined;
    const height = formData.get('height') ? parseInt(formData.get('height') as string, 10) : undefined;
    const minSizeKb = formData.get('minSizeKb') ? parseInt(formData.get('minSizeKb') as string, 10) : undefined;
    const maxSizeKb = formData.get('maxSizeKb') ? parseInt(formData.get('maxSizeKb') as string, 10) : undefined;
    const dpi = formData.get('dpi') ? parseInt(formData.get('dpi') as string, 10) : undefined;
    const examId = formData.get('examId') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds the 20MB limit.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let outputBuffer: Buffer;
    let outputFormat = format || 'jpg';

    if (type === 'document' || file.type === 'application/pdf') {
      // PDF Processing
      if (file.type !== 'application/pdf') {
        return NextResponse.json({ error: 'Invalid file type for document. Must be PDF.' }, { status: 400 });
      }
      
      const tmpDir = os.tmpdir();
      const inputId = crypto.randomUUID();
      const inputPath = path.join(tmpDir, `${inputId}_in.pdf`);
      const outputPath = path.join(tmpDir, `${inputId}_out.pdf`);
      
      try {
        await fs.writeFile(inputPath, buffer);
        
        let bestBuffer = buffer;
        
        // Helper function to run GS and check output
        const runGsPass = async (gsCommand: string) => {
          try {
            await fs.unlink(outputPath);
          } catch (e) {
            // Ignore if it doesn't exist
          }
          try {
            await execAsync(gsCommand);
          } catch (err) {
            console.warn('Ghostscript pass returned error/warning, checking if output exists...', err);
          }
          try {
            const outBuffer = await fs.readFile(outputPath);
            if (outBuffer.length > 0 && outBuffer.length < bestBuffer.length) {
              bestBuffer = outBuffer;
            }
          } catch (readErr) {
            // File doesn't exist or can't be read, pass failed
          }
        };

        // Helper function to rasterize PDF pages to JPEG and rebuild PDF
        const rasterizePdfPass = async (dpi: number, quality: number) => {
          const rasterDir = path.join(tmpDir, `raster_${crypto.randomUUID()}`);
          try {
            await fs.mkdir(rasterDir, { recursive: true });
            await execAsync(`gs -sDEVICE=jpeg -r${dpi} -dJPEGQ=${quality} -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${rasterDir}/page-%03d.jpg" "${inputPath}" > /dev/null 2>&1`);
            
            const files = (await fs.readdir(rasterDir)).filter(f => f.endsWith('.jpg')).sort();
            if (files.length === 0) return;
            
            const pdfDoc = await PDFDocument.create();
            for (const file of files) {
              const imgPath = path.join(rasterDir, file);
              const imgBytes = await fs.readFile(imgPath);
              const image = await pdfDoc.embedJpg(imgBytes);
              const page = pdfDoc.addPage([image.width, image.height]);
              page.drawImage(image, {
                x: 0,
                y: 0,
                width: image.width,
                height: image.height,
              });
            }
            
            const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
            const rasterBuffer = Buffer.from(pdfBytes);
            if (rasterBuffer.length > 0 && rasterBuffer.length < bestBuffer.length) {
              bestBuffer = rasterBuffer;
            }
          } catch (err) {
            console.warn(`Rasterize pass failed at ${dpi} DPI:`, err);
          } finally {
            try {
              await fs.rm(rasterDir, { recursive: true, force: true });
            } catch (e) {}
          }
        };

        // Ghostscript compression levels from highest to lowest quality
        const passes = [
          // 0. Lossless / No downsampling (keep original resolution)
          `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dAutoFilterColorImages=false -dColorImageFilter=/FlateEncode -dAutoFilterGrayImages=false -dGrayImageFilter=/FlateEncode -dDownsampleColorImages=false -dDownsampleGrayImages=false -dDownsampleMonoImages=false -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}" > /dev/null 2>&1`,
          // 1. Prepress (300 dpi, high quality)
          `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/prepress -dColorImageDownsampleThreshold=1.0 -dGrayImageDownsampleThreshold=1.0 -dMonoImageDownsampleThreshold=1.0 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}" > /dev/null 2>&1`,
          // 2. Printer (300 dpi)
          `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/printer -dColorImageDownsampleThreshold=1.0 -dGrayImageDownsampleThreshold=1.0 -dMonoImageDownsampleThreshold=1.0 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}" > /dev/null 2>&1`,
          // 3. Ebook (150 dpi)
          `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dColorImageDownsampleThreshold=1.0 -dGrayImageDownsampleThreshold=1.0 -dMonoImageDownsampleThreshold=1.0 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}" > /dev/null 2>&1`,
          // 4. Screen (72 dpi)
          `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dColorImageDownsampleThreshold=1.0 -dGrayImageDownsampleThreshold=1.0 -dMonoImageDownsampleThreshold=1.0 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}" > /dev/null 2>&1`,
          // 5. Extreme custom (36 dpi)
          `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dDownsampleColorImages=true -dDownsampleGrayImages=true -dDownsampleMonoImages=true -dColorImageDownsampleType=/Bicubic -dColorImageResolution=36 -dColorImageDownsampleThreshold=1.0 -dGrayImageDownsampleType=/Bicubic -dGrayImageResolution=36 -dGrayImageDownsampleThreshold=1.0 -dMonoImageDownsampleType=/Bicubic -dMonoImageResolution=36 -dMonoImageDownsampleThreshold=1.0 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}" > /dev/null 2>&1`,
          // 6. Ultra-extreme custom (10 dpi)
          `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dDownsampleColorImages=true -dDownsampleGrayImages=true -dDownsampleMonoImages=true -dColorImageDownsampleType=/Bicubic -dColorImageResolution=10 -dColorImageDownsampleThreshold=1.0 -dGrayImageDownsampleType=/Bicubic -dGrayImageResolution=10 -dGrayImageDownsampleThreshold=1.0 -dMonoImageDownsampleType=/Bicubic -dMonoImageResolution=10 -dMonoImageDownsampleThreshold=1.0 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}" > /dev/null 2>&1`,
          // 7. Remove embedded fonts
          `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dEmbedAllFonts=false -dSubsetFonts=true -dCompressFonts=true -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}" > /dev/null 2>&1`,
          // 8. Grayscale
          `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -sColorConversionStrategy=Gray -dProcessColorModel=/DeviceGray -dColorImageDownsampleThreshold=1.0 -dGrayImageDownsampleThreshold=1.0 -dMonoImageDownsampleThreshold=1.0 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}" > /dev/null 2>&1`
        ];

        // If no maxSizeKb is provided, just run ebook pass to compress it reasonably
        if (!maxSizeKb) {
          await runGsPass(passes[2]); // Ebook pass
        } else {
          // If maxSizeKb is provided, try passes progressively until we are under the limit
          for (const pass of passes) {
            if (bestBuffer.length <= maxSizeKb * 1024) {
              break; // We met the target size!
            }
            await runGsPass(pass);
          }
        }
        
        // If it's STILL too large, try rasterizing the PDF (nuclear option)
        if (maxSizeKb && bestBuffer.length > maxSizeKb * 1024) {
          let currentDpi = 100;
          let currentQuality = 60;
          
          while (bestBuffer.length > maxSizeKb * 1024 && currentDpi >= 20) {
            await rasterizePdfPass(currentDpi, currentQuality);
            
            // Decrease quality and DPI for the next pass if still too large
            currentDpi -= 20;
            currentQuality -= 15;
            
            // Ensure quality doesn't drop below 10
            if (currentQuality < 10) currentQuality = 10;
          }
        }
        
        // If Ghostscript failed or couldn't compress it enough, try pdf-lib as a fallback
        if (bestBuffer.length >= buffer.length) {
          try {
            const pdfDoc = await PDFDocument.load(buffer);
            const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
            const pdfLibBuffer = Buffer.from(pdfBytes);
            if (pdfLibBuffer.length < bestBuffer.length) {
              bestBuffer = pdfLibBuffer;
            }
          } catch (pdfErr) {
            console.error('pdf-lib fallback error:', pdfErr);
          }
        }
        
        let outBuffer = bestBuffer;
        
        // Check if we met the maximum size requirement
        if (maxSizeKb && outBuffer.length > maxSizeKb * 1024) {
          return NextResponse.json(
            { error: `Unable to compress document to under ${maxSizeKb}KB. The smallest possible size achieved was ${(outBuffer.length / 1024).toFixed(2)}KB. Please try uploading a file with fewer pages or simpler graphics.` },
            { status: 422 }
          );
        }
        
        // If it's too small, add padding bytes to the end of the PDF
        if (minSizeKb && outBuffer.length < minSizeKb * 1024) {
          const minBytes = minSizeKb * 1024;
          const maxBytes = maxSizeKb ? maxSizeKb * 1024 : Infinity;
          let paddingSize = minBytes - outBuffer.length + 1024; // Add 1KB extra to be safe
          
          if (maxBytes !== Infinity && outBuffer.length + paddingSize > maxBytes) {
              paddingSize = maxBytes - outBuffer.length;
          }
          
          if (paddingSize > 0) {
              const padding = Buffer.alloc(paddingSize, 0);
              outBuffer = Buffer.concat([outBuffer, padding]);
          }
        }
        
        outputBuffer = outBuffer;
        outputFormat = 'pdf';
      } catch (err) {
        console.error('PDF processing error:', err);
        // Absolute fallback if everything else fails
        outputBuffer = buffer;
        outputFormat = 'pdf';
      } finally {
        // Cleanup temp files
        try { await fs.unlink(inputPath); } catch (e) {}
        try { await fs.unlink(outputPath); } catch (e) {}
      }
    } else {
      // Image Processing (Photo or Signature)
      let image = sharp(buffer);
      const metadata = await image.metadata();

      // Flatten transparency to white (important for PNGs converted to JPG)
      image = image.flatten({ background: { r: 255, g: 255, b: 255 } });

      // Signature specific enhancements
      if (type === 'signature') {
        // Increase contrast to make background white and text clear, while preserving color
        // Using normalize and linear transformation to preserve anti-aliasing (no hard threshold)
        image = image
          .normalize()
          .linear(1.5, -50)
          .trim({ threshold: 20 }); // Auto-crop the signature ink!
      }

      // Resize
      if (width && height) {
        if (type === 'signature') {
          // We want to fit the trimmed signature into the box, but add a small padding (e.g., 5%)
          // so it doesn't touch the absolute edges.
          
          const padX = Math.max(1, Math.floor(width * 0.05));
          const padY = Math.max(1, Math.floor(height * 0.05));
          
          image = image.resize(width - padX * 2, height - padY * 2, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          }).extend({
            top: padY,
            bottom: padY,
            left: padX,
            right: padX,
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          });
        } else if (type === 'photo') {
          // Auto-crop to face/subject using attention strategy
          image = image.resize(width, height, {
            fit: 'cover',
            position: 'attention', // Smart crop focusing on the subject (face)
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          });
        } else {
          image = image.resize(width, height, {
            fit: 'fill',
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          });
        }
      } else if (width) {
        image = image.resize(width, null);
      } else if (height) {
        image = image.resize(null, height);
      }

      if (dpi) {
        image = image.withMetadata({ density: dpi });
      }

      // Format and Compression
      let quality = 90;
      let currentBuffer = await image.toFormat(outputFormat as keyof sharp.FormatEnum, { quality }).toBuffer();

      // Binary search-like approach to hit target size
      if (maxSizeKb || minSizeKb) {
        let minQ = 1;
        let maxQ = 100;
        let bestBuffer = currentBuffer;
        let foundValid = false;
        
        // Target size is slightly below max to be safe
        const maxBytes = maxSizeKb ? maxSizeKb * 1024 : Infinity;
        const minBytes = minSizeKb ? minSizeKb * 1024 : 0;
        
        while (minQ <= maxQ) {
          quality = Math.floor((minQ + maxQ) / 2);
          const testBuffer = await image.toFormat(outputFormat as keyof sharp.FormatEnum, { quality }).toBuffer();
          
          if (testBuffer.length > maxBytes) {
            maxQ = quality - 1;
          } else if (testBuffer.length < minBytes) {
            minQ = quality + 1;
            // If it's the best we have so far that is at least closer to minBytes, we could save it,
            // but we only want to save valid buffers if possible.
            if (!foundValid && testBuffer.length > bestBuffer.length) {
                bestBuffer = testBuffer;
            }
          } else {
            // Valid buffer found!
            bestBuffer = testBuffer;
            foundValid = true;
            // Try to get higher quality while still valid
            minQ = quality + 1;
          }
        }
        
        currentBuffer = bestBuffer;
        
        // If still too large at minimum quality (1), we might need to resize down
        // Only do this if dimensions aren't strictly required, or if we absolutely have to
        if (maxSizeKb && currentBuffer.length > maxBytes) {
          let scale = 0.9;
          let newWidth = width || metadata.width || 200;
          let newHeight = height || metadata.height || 200;
          
          while (currentBuffer.length > maxBytes && scale > 0.1) {
             const w = Math.max(10, Math.floor(newWidth * scale));
             const h = Math.max(10, Math.floor(newHeight * scale));
             currentBuffer = await image
               .resize(w, h, { 
                 fit: type === 'signature' ? 'contain' : 'fill',
                 background: { r: 255, g: 255, b: 255, alpha: 1 }
               })
               .toFormat(outputFormat as keyof sharp.FormatEnum, { quality: 50 })
               .toBuffer();
             scale -= 0.1;
          }
        }
        
        // If still too small at maximum quality (100)
        if (minSizeKb && currentBuffer.length < minBytes) {
           // Append invisible bytes to the end of the buffer to meet the minimum size requirement
           if (outputFormat === 'jpg' || outputFormat === 'jpeg' || outputFormat === 'png') {
               let paddingSize = minBytes - currentBuffer.length + 1024; // Add 1KB extra to be safe
               if (maxBytes !== Infinity && currentBuffer.length + paddingSize > maxBytes) {
                   paddingSize = maxBytes - currentBuffer.length;
               }
               if (paddingSize > 0) {
                   const padding = Buffer.alloc(paddingSize, 0);
                   currentBuffer = Buffer.concat([currentBuffer, padding]);
               }
           }
        }
      }
      
      outputBuffer = currentBuffer;
    }

    // Return the optimized file
    const headers = new Headers();
    headers.set('Content-Type', outputFormat === 'pdf' ? 'application/pdf' : `image/${outputFormat}`);
    headers.set('Content-Disposition', `attachment; filename="optimized_${type}.${outputFormat}"`);
    headers.set('X-File-Size', outputBuffer.length.toString());

    return new NextResponse(new Uint8Array(outputBuffer), {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Optimization error:', error);
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
  }
}
