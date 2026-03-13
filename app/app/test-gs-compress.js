const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs/promises');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { PDFDocument } = require('pdf-lib');

const execAsync = promisify(exec);

async function test() {
  const tmpDir = os.tmpdir();
  const inputId = crypto.randomUUID();
  const inputPath = path.join(tmpDir, `${inputId}_in.pdf`);
  const outputPath = path.join(tmpDir, `${inputId}_out.pdf`);
  
  // Create a dummy PDF with an image to test compression
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  page.drawText('Hello World!');
  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(inputPath, pdfBytes);
  
  console.log('Original size:', pdfBytes.length);

  try {
    await execAsync(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`);
    let outBuffer = await fs.readFile(outputPath);
    console.log('Ebook size:', outBuffer.length);
    
    await execAsync(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`);
    outBuffer = await fs.readFile(outputPath);
    console.log('Screen size:', outBuffer.length);
    
    await execAsync(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dColorImageDownsampleType=/Bicubic -dColorImageResolution=36 -dGrayImageDownsampleType=/Bicubic -dGrayImageResolution=36 -dMonoImageDownsampleType=/Bicubic -dMonoImageResolution=36 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`);
    outBuffer = await fs.readFile(outputPath);
    console.log('Extreme size:', outBuffer.length);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
