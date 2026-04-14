import { FileUp, Settings, Download, ShieldCheck, Zap, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import AppContainer from '@/components/AppContainer';
import { Header, Footer } from '@/components/Navigation';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Compress PDF for Exam Forms | Free Online PDF Size Reducer',
  description: 'Easily compress your PDF files to meet strict size limits for government exam forms like SSC, UPSC, RRB, and IBPS online for free.',
  alternates: {
    canonical: '/compress-pdf-for-exam-forms',
  },
};

export default function CompressPdfForExamFormsPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PDF Compressor for Exam Forms",
    "description": "Compress PDF to exact size for exam forms like SSC, UPSC, RRB",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "url": "https://examresize.online/compress-pdf-for-exam-forms",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why do exam forms require specific PDF sizes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Government and competitive exam portals handle millions of applications. To save server space and ensure fast processing, they enforce strict file size limits (often 50KB to 200KB) for uploaded documents like mark sheets and certificates."
        }
      },
      {
        "@type": "Question",
        "name": "Will compressing my PDF make the text blurry?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Our PDF size reducer uses advanced compression algorithms to shrink the file size without losing quality. Your scanned text, signatures, and images will remain crisp and legible, perfect for official exam forms."
        }
      },
      {
        "@type": "Question",
        "name": "Is it safe to upload my Aadhar card or mark sheet here?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it is 100% secure and private. All file transfers are protected with 256-bit SSL encryption. Furthermore, your sensitive documents are permanently and automatically deleted from our servers within one hour of compression."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <main className="flex-grow">
        <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-4 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
              <ShieldCheck className="w-4 h-4" /> Secure SSL upload
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
              <Zap className="w-4 h-4" /> Files are auto-deleted after processing
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
              <CheckCircle className="w-4 h-4" /> No file stored on server
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Compress PDF for Exam Forms
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Instantly reduce your PDF file size to meet strict upload limits for SSC, UPSC, RRB, IBPS, and other competitive exams.
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-4xl mx-auto overflow-hidden mb-12">
            <div className="p-6 md:p-8">
              <AppContainer initialFileType="document" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto my-8">
            <AdBanner dataAdSlot="YOUR_AD_SLOT_ID" />
          </div>
        </section>
        
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Why exact PDF size matters for exam uploads</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  Government exam portals like SSC, UPSC, RRB, and IBPS have strict file size limits. If your document is even 1KB over the limit, the portal will reject it. Compressing your PDF ensures a smooth, error-free application process.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Common errors during document upload:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
                    <span className="text-slate-600"><strong>&quot;File size exceeds maximum limit&quot;:</strong> Your PDF is too large. Our tool fixes this instantly.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
                    <span className="text-slate-600"><strong>&quot;Invalid file format&quot;:</strong> Ensure you are uploading a PDF, not a JPEG or PNG, if a document is requested.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
                    <span className="text-slate-600"><strong>&quot;Document is illegible&quot;:</strong> Over-compressing can make text blurry. We maintain readability while reducing size.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Before vs After</h3>
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="w-24 h-32 bg-white border-2 border-slate-300 rounded-lg shadow-sm flex items-center justify-center mb-3 mx-auto">
                      <span className="text-slate-400 font-medium">Original</span>
                    </div>
                    <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">2.5 MB</span>
                  </div>
                  <div className="text-slate-400">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-32 bg-white border-2 border-emerald-400 rounded-lg shadow-md flex items-center justify-center mb-3 mx-auto relative overflow-hidden">
                      <div className="absolute inset-0 bg-emerald-50 opacity-50"></div>
                      <span className="text-emerald-600 font-bold relative z-10">Optimized</span>
                    </div>
                    <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">100 KB</span>
                  </div>
                </div>
                <p className="text-center text-sm text-slate-500 mt-6">Crisp text and clear images, perfectly sized for upload.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How to compress PDF for exam forms</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Follow these simple steps to reduce your PDF file size instantly.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white text-center p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-16 h-16 bg-blue-100 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">1. Upload Your PDF</h3>
                <p className="text-slate-600">Select or drag and drop your document. We support standard PDF files up to 10MB.</p>
              </div>
              <div className="bg-white text-center p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-16 h-16 bg-blue-100 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">2. Specify Target Size</h3>
                <p className="text-slate-600">Enter the exact maximum KB required by your exam portal (e.g., 50KB, 100KB, or 200KB). Our tool will optimize to fit.</p>
              </div>
              <div className="bg-white text-center p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-16 h-16 bg-blue-100 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">3. Download Instantly</h3>
                <p className="text-slate-600">Click compress and download your optimized file. It&apos;s ready for immediate upload.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions (FAQs)</h2>
            
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Why do exam forms require specific PDF sizes?</h3>
                <p className="text-slate-600">Government and competitive exam portals handle millions of applications. To save server space and ensure fast processing, they enforce strict file size limits (often 50KB to 200KB) for uploaded documents like mark sheets and certificates.</p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Will compressing my PDF make the text blurry?</h3>
                <p className="text-slate-600">No. Our PDF size reducer uses advanced compression algorithms to shrink the file size without losing quality. Your scanned text, signatures, and images will remain crisp and legible, perfect for official exam forms.</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Is it safe to upload my personal documents?</h3>
                <p className="text-slate-600">Yes, it is 100% secure. All file transfers use SSL encryption, and your documents are automatically deleted from our servers within one hour. No files are permanently stored.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">More PDF Compression Tools</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Need a specific file size? Check out our dedicated tools.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/document-compressor" className="block p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Custom PDF Compressor</h3>
                <p className="text-sm text-slate-600">Compress PDF to any custom size.</p>
              </Link>
              <Link href="/compress-pdf-to-50kb" className="block p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Compress PDF to 50KB</h3>
                <p className="text-sm text-slate-600">For strict ID proofs and small uploads.</p>
              </Link>
              <Link href="/compress-pdf-to-100kb" className="block p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Compress PDF to 100KB</h3>
                <p className="text-sm text-slate-600">Common for mark sheets and certificates.</p>
              </Link>
              <Link href="/compress-pdf-to-200kb" className="block p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Compress PDF to 200KB</h3>
                <p className="text-sm text-slate-600">Ideal for multi-page documents.</p>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
