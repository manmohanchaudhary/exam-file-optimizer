import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'photo', 'signature', 'document'
    const format = formData.get('format') as string; // 'jpg', 'png', 'pdf'
    const width = formData.get('width') ? parseInt(formData.get('width') as string, 10) : undefined;
    const height = formData.get('height') ? parseInt(formData.get('height') as string, 10) : undefined;
    const maxSizeKb = formData.get('maxSizeKb') ? parseInt(formData.get('maxSizeKb') as string, 10) : undefined;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
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
      
      const pdfDoc = await PDFDocument.load(buffer);
      // Basic compression by saving without object streams or with them
      const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
      outputBuffer = Buffer.from(pdfBytes);
      outputFormat = 'pdf';
      
      // Note: True PDF compression (downsampling images) is complex in pure JS.
      // For MVP, we just re-save which strips some metadata and unused objects.
    } else {
      // Image Processing (Photo or Signature)
      let image = sharp(buffer);
      const metadata = await image.metadata();

      // Signature specific enhancements
      if (type === 'signature') {
        // Increase contrast, convert to grayscale, threshold to make background white and text black
        // This is a simple approach: normalize, grayscale, threshold
        image = image
          .normalize()
          .grayscale()
          .threshold(200); // pixels > 200 become white, < 200 become black
      }

      // Resize
      if (width && height) {
        image = image.resize(width, height, {
          fit: 'fill', // Exam portals usually require exact dimensions, even if it stretches
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        });
      } else if (width) {
        image = image.resize(width, null);
      } else if (height) {
        image = image.resize(null, height);
      }

      // Format and Compression
      let quality = 90;
      let currentBuffer = await image.toFormat(outputFormat as keyof sharp.FormatEnum, { quality }).toBuffer();

      // Binary search-like approach or simple loop to hit target size
      if (maxSizeKb && currentBuffer.length > maxSizeKb * 1024) {
        let minQ = 10;
        let maxQ = 90;
        
        while (minQ <= maxQ) {
          quality = Math.floor((minQ + maxQ) / 2);
          currentBuffer = await image.toFormat(outputFormat as keyof sharp.FormatEnum, { quality }).toBuffer();
          
          if (currentBuffer.length > maxSizeKb * 1024) {
            maxQ = quality - 1;
          } else {
            // Check if we can get a bit higher quality while staying under limit
            const nextQ = quality + 5;
            if (nextQ <= 100) {
              const testBuffer = await image.toFormat(outputFormat as keyof sharp.FormatEnum, { quality: nextQ }).toBuffer();
              if (testBuffer.length <= maxSizeKb * 1024) {
                minQ = quality + 1;
                continue;
              }
            }
            break; // Found a good quality
          }
        }
        
        // If still too large at minimum quality, we might need to resize down
        if (currentBuffer.length > maxSizeKb * 1024) {
          // Fallback: aggressive resize if size is still too large
          const scale = Math.sqrt((maxSizeKb * 1024) / currentBuffer.length);
          const newWidth = Math.max(10, Math.floor((width || metadata.width || 200) * scale));
          const newHeight = Math.max(10, Math.floor((height || metadata.height || 200) * scale));
          
          currentBuffer = await image
            .resize(newWidth, newHeight, { fit: 'fill' })
            .toFormat(outputFormat as keyof sharp.FormatEnum, { quality: 50 })
            .toBuffer();
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
