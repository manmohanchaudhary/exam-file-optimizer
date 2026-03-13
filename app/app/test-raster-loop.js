const { execSync } = require('child_process');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
const crypto = require('crypto');

async function rasterizePdfPass(inputPath, bestBuffer, dpi, quality) {
  const tmpDir = fs.mkdtempSync(path.join(require('os').tmpdir(), 'pdf-raster-'));
  try {
    execSync(`gs -sDEVICE=jpeg -r${dpi} -dJPEGQ=${quality} -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${tmpDir}/page-%03d.jpg" "${inputPath}" > /dev/null 2>&1`);
    
    const files = fs.readdirSync(tmpDir).filter(f => f.endsWith('.jpg')).sort();
    if (files.length === 0) return bestBuffer;
    
    const pdfDoc = await PDFDocument.create();
    for (const file of files) {
      const imgPath = path.join(tmpDir, file);
      const imgBytes = fs.readFileSync(imgPath);
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
    console.log(`Rasterized at ${dpi} DPI, ${quality}% quality: ${rasterBuffer.length} bytes`);
    if (rasterBuffer.length > 0 && rasterBuffer.length < bestBuffer.length) {
      return rasterBuffer;
    }
  } catch (err) {
    console.warn(`Rasterize pass failed at ${dpi} DPI:`, err);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
  return bestBuffer;
}

async function main() {
  // Create a dummy PDF with 10 pages
  const pdfDoc = await PDFDocument.create();
  for (let i = 0; i < 10; i++) {
    const page = pdfDoc.addPage([612, 792]);
    page.drawText(`Page ${i + 1}`, { x: 50, y: 700, size: 50 });
  }
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('test_10pages.pdf', pdfBytes);
  
  let bestBuffer = Buffer.from(pdfBytes);
  console.log(`Original size: ${bestBuffer.length} bytes`);
  
  bestBuffer = await rasterizePdfPass('test_10pages.pdf', bestBuffer, 100, 60);
  bestBuffer = await rasterizePdfPass('test_10pages.pdf', bestBuffer, 72, 40);
  bestBuffer = await rasterizePdfPass('test_10pages.pdf', bestBuffer, 50, 30);
  bestBuffer = await rasterizePdfPass('test_10pages.pdf', bestBuffer, 36, 20);
  bestBuffer = await rasterizePdfPass('test_10pages.pdf', bestBuffer, 20, 10);
}

main().catch(console.error);
