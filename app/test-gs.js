const { execSync } = require('child_process');
const fs = require('fs');

try {
  const pdfContent = `%PDF-1.4
1 0 obj <</Type /Catalog /Pages 2 0 R>> endobj
2 0 obj <</Type /Pages /Kids [3 0 R] /Count 1>> endobj
3 0 obj <</Type /Page /Parent 2 0 R /MediaBox [0 0 612 792]>> endobj
xref
0 4
0000000000 65535 f
0000000009 00000 n
0000000056 00000 n
0000000111 00000 n
trailer <</Size 4 /Root 1 0 R>>
startxref
190
%%EOF`;
  fs.writeFileSync('test.pdf', pdfContent);
  
  console.log('Running GS...');
  const out = execSync(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dColorImageDownsampleThreshold=1.0 -dGrayImageDownsampleThreshold=1.0 -dMonoImageDownsampleThreshold=1.0 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="test_out.pdf" "test.pdf" 2>&1`);
  console.log('GS Output:', out.toString());
  
  const stat = fs.statSync('test_out.pdf');
  console.log('Output size:', stat.size);
} catch (e) {
  console.error('Error:', e.message);
  if (e.stdout) console.error('Stdout:', e.stdout.toString());
  if (e.stderr) console.error('Stderr:', e.stderr.toString());
}
