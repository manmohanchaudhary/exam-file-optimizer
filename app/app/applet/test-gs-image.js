const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs/promises');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const execAsync = promisify(exec);

async function test() {
  const tmpDir = os.tmpdir();
  const inputId = crypto.randomUUID();
  const inputPath = path.join(tmpDir, `${inputId}_in.pdf`);
  const outputPath = path.join(tmpDir, `${inputId}_out.pdf`);
  
  // Create a dummy PDF with a large image
  const { PDFDocument } = require('pdf-lib');
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([500, 500]);
  
  // Create a 1000x1000 noisy image
  const sharp = require('sharp');
  const imgBuffer = await sharp({
    create: {
      width: 1000,
      height: 1000,
      channels: 3,
      background: { r: 255, g: 0, b: 0 }
    }
  }).jpeg().toBuffer();
  
  const image = await pdfDoc.embedJpg(imgBuffer);
  page.drawImage(image, { x: 0, y: 0, width: 500, height: 500 });
  
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
    
    await execAsync(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dDownsampleColorImages=true -dDownsampleGrayImages=true -dDownsampleMonoImages=true -dColorImageDownsampleType=/Bicubic -dColorImageResolution=36 -dGrayImageDownsampleType=/Bicubic -dGrayImageResolution=36 -dMonoImageDownsampleType=/Bicubic -dMonoImageResolution=36 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`);
    outBuffer = await fs.readFile(outputPath);
    console.log('Extreme size:', outBuffer.length);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
