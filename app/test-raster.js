const { execSync } = require('child_process');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const path = require('path');

async function rasterizePdf(inputPath, outputPath, dpi) {
  const tmpDir = fs.mkdtempSync(path.join(require('os').tmpdir(), 'pdf-raster-'));
  
  try {
    // 1. Extract pages as JPEGs
    console.log(`Extracting pages at ${dpi} DPI...`);
    execSync(`gs -sDEVICE=jpeg -r${dpi} -dJPEGQ=60 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${tmpDir}/page-%03d.jpg" "${inputPath}"`);
    
    // 2. Read all generated JPEGs
    const files = fs.readdirSync(tmpDir).filter(f => f.endsWith('.jpg')).sort();
    console.log(`Extracted ${files.length} pages.`);
    
    // 3. Create new PDF
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
    
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
    console.log(`Saved rasterized PDF to ${outputPath} (${pdfBytes.length} bytes)`);
    return pdfBytes.length;
  } finally {
    // Cleanup
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

async function main() {
  const pdfContent = '%PDF-1.4\n1 0 obj <</Type /Catalog /Pages 2 0 R>> endobj\n2 0 obj <</Type /Pages /Kids [3 0 R] /Count 1>> endobj\n3 0 obj <</Type /Page /Parent 2 0 R /MediaBox [0 0 612 792]>> endobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000056 00000 n\n0000000111 00000 n\ntrailer <</Size 4 /Root 1 0 R>>\nstartxref\n190\n%%EOF';
  fs.writeFileSync('test.pdf', pdfContent);
  await rasterizePdf('test.pdf', 'test_raster.pdf', 72);
}

main().catch(console.error);
