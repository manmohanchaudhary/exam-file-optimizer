import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';

async function test() {
  try {
    console.log(pdfjsLib.GlobalWorkerOptions);
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    console.log("Worker set");
  } catch (e) {
    console.error("Error:", e.message);
  }
}
test();
