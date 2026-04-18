import React from 'react';
import { Metadata } from 'next';
import AppContainer from '@/components/AppContainer';
import AdBanner from '@/components/AdBanner';
import { Header, Footer } from '@/components/Navigation';
import { CheckCircle2, XCircle, FileUp, Settings, Download } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'BPSC TRE Signature & Document Resizer | TRE 4.0, TRE 3.0 & All BPSC Teacher Exams 2026',
  description: 'Free tool to resize your BPSC TRE signature and documents instantly. Works for TRE 4.0, TRE 3.0 and all BPSC teacher recruitment forms — signature under 20KB, documents under 100KB. No signup required.',
  keywords: [
    'BPSC TRE 4.0 2026',
    'BPSC TRE 4.0 signature size 2026',
    'BPSC TRE 4.0 document size 2026',
    'BPSC TRE 4.0 application form 2026',
    'BPSC TRE 4.0 apply online 2026',
    'signature not uploading in BPSC TRE 4.0',
    'file size too large BPSC TRE 4.0',
    'BPSC TRE 4.0 document upload error',
    'how to resize signature for BPSC TRE 4.0 2026',
    'BPSC TRE 4.0 upload issue',
    'BPSC TRE 4.0 form requirements',
    'live photo capture',
    'webcam photo',
    'signature size in KB and pixels',
    'document upload limit',
    '2026 exam form',
    'upload error fix'
  ],
  alternates: {
    canonical: 'https://examresize.online/bpsc-tre-4-0-signature-document-resizer'
  }
};

export default function BPSCTRE40Page() {
  const faqs = [
    {
      q: "What is the signature size for BPSC TRE exams?",
      a: "For all BPSC TRE rounds including TRE 4.0 and TRE 3.0, the signature must be under 20KB in file size, between 150–220 pixels wide and 250–320 pixels tall, in JPG/JPEG format, signed on a white background with a black pen."
    },
    {
      q: "Why is my signature not uploading in the BPSC TRE form?",
      a: "Your BPSC TRE signature upload may be failing because the file size exceeds 20KB, or the dimensions are outside the required 150–220px width and 250–320px height range. This applies to TRE 4.0, TRE 3.0 and all BPSC teacher exam rounds. Use the preset tool above to fix it in one click."
    },
    {
      q: "What is the document size limit for BPSC TRE 4.0?",
      a: "All documents (such as educational certificates, category proofs, or IDs) uploaded in the 2026 exam form must be less than 100 KB in size."
    },
    {
      q: "Do I need to resize a photo for the BPSC TRE 4.0 application?",
      a: "No. The BPSC TRE 4.0 form uses live webcam capture for your photo — you do not upload a photo file at any stage. However, if you are applying for another BPSC teacher exam round that requires a photo upload, the required size is 3.5×4.5cm, JPEG, 20–50KB."
    },
    {
      q: "What is the photo size for BPSC teacher exam application forms?",
      a: "For BPSC teacher exam rounds that require a photo upload (not TRE 4.0 which uses webcam), the standard BPSC photo and signature size is: photo dimensions 3.5cm × 4.5cm, JPEG format, 20–50KB file size, white or light background. The signature should be 3.5cm × 1.5cm, JPEG, under 20KB."
    },
    {
      q: "Is photo upload needed here?",
      a: "No. The BPSC TRE 4.0 2026 application process utilizes a live photo capture system. You take your photograph directly using a webcam during the application process, so there is no need to upload a pre-saved photograph."
    },
    {
      q: "How does live photo capture work in the official form?",
      a: "When you reach the photo section on the BPSC portal, it will turn on your webcam. Ensure your face is fully clear, well-lit, and directly facing the camera with a light background. Do not wear sunglasses, a mask, a cap or helmet, and ensure nobody else is in the frame."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "BPSC TRE 4.0 Signature Resizer",
    "description": "Resize your signature to under 20KB and compress your documents to under 100KB automatically.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          {/* Breadcrumbs */}
          <nav className="flex justify-center text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center hover:text-slate-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-slate-400">/</span>
                  <Link href="/#how-it-works" className="hover:text-slate-900 transition-colors">
                    Tools
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-slate-400">/</span>
                  <span className="text-slate-900 font-medium">BPSC TRE Resizer</span>
                </div>
              </li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
            BPSC TRE Signature & Document Resizer — <br className="hidden md:block" />
            <span className="text-[#28a745]">All BPSC Teacher Exams 2026</span>
          </h1>
          <p className="text-xl text-slate-700 font-medium max-w-3xl mx-auto mb-4">
            Covers TRE 4.0, TRE 3.0 and all upcoming BPSC school teacher recruitment rounds.
          </p>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Use this BPSC TRE resizer below to automatically resize your signature (under 20KB) and compress your documents (under 100KB) quickly for your application.
          </p>
          
          {/* Main App Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-4xl mx-auto overflow-hidden mb-12">
            <div className="p-6 md:p-8 text-left">
              <AppContainer 
                initialExamId="bpsc-tre-4-0-2026" 
                initialFileType="signature" 
                initialMinSize="50"
                hiddenTabs={['photo', 'left_thumb', 'right_thumb', 'declaration']} 
              />
            </div>
          </div>

          {/* AdSense Banner */}
          <div className="max-w-4xl mx-auto my-8">
            <AdBanner dataAdSlot="YOUR_AD_SLOT_ID" />
          </div>
        </section>

        <section className="bg-white border-t border-slate-200 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-20">
            
            {/* Requirements Section */}
            <div id="requirements">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-100">
                BPSC TRE 4.0 2026 Requirements
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                    📸 Live Photo Note
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>Photo is <strong>captured live via webcam</strong></span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>It is <strong>not uploaded</strong> as a file</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>Face the camera directly and keep your eyes open</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>Use good lighting and a light background</span>
                    </li>
                    <li className="flex gap-2">
                      <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>Avoid cap, sunglasses, mask, muffler, or helmet</span>
                    </li>
                    <li className="flex gap-2">
                      <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>Ensure no other person is visible in the frame</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    ✍️ Signature Requirements
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">File size</span>
                      <span className="font-semibold text-slate-900">Less than 20 KB</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Width</span>
                      <span className="font-semibold text-slate-900">150–220 px</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Height</span>
                      <span className="font-semibold text-slate-900">250–320 px</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Format</span>
                      <span className="font-semibold text-slate-900">JPG/JPEG</span>
                    </li>
                    <li className="pt-2 text-slate-500 italic block">
                      Clear signature on white background using black pen.
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    📄 Document Requirements
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">File size</span>
                      <span className="font-semibold text-slate-900">Less than 100 KB</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Upload Method</span>
                      <span className="font-semibold text-slate-900 text-right">Local file / DigiLocker</span>
                    </li>
                    <li className="pt-2 text-slate-500 italic block">
                      Keep the document section simple and practical for users trying to pass upload checks.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Photo Clarification Section */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">
                What About the BPSC TRE Photo? (Important Note for Candidates)
              </h2>
              <div className="text-slate-700 space-y-4 text-lg">
                <p>
                  Many candidates search for a BPSC TRE photo resizer — which is completely understandable. However, the BPSC TRE 4.0 application form does NOT require a photo upload. Your photo is captured live via webcam directly on the BPSC portal during the application.
                </p>
                <div className="bg-white p-6 rounded-lg border border-slate-200 my-6">
                  <p className="font-semibold text-slate-900 mb-3">This means:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>You do <strong>NOT</strong> need to resize or compress a photo file for TRE 4.0</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>There is no photo KB limit or pixel requirement to meet for this exam</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Simply ensure good lighting, a clear face, and a plain background when the webcam activates on the portal</span>
                    </li>
                  </ul>
                </div>
                <p>
                  If you are filling a different BPSC teacher exam or an earlier TRE round that does require a photo upload, the standard BPSC photo and signature size requirement is: photo 3.5cm × 4.5cm, JPEG format, between 20KB and 50KB. Use the button below for those exams.
                </p>
                <div className="pt-4">
                  <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Resize Photo for Other BPSC Exams →
                  </Link>
                </div>
              </div>
            </div>

            {/* Works For All BPSC Section */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                Works for All BPSC Teacher Exams — Not Just TRE 4.0
              </h2>
              <div className="text-slate-600 bg-slate-50 p-8 rounded-xl border border-slate-100 text-lg">
                <p>
                  Whether you are filling the BPSC TRE 4.0 form, TRE 3.0, or any future BPSC teacher recruitment form, this tool applies the correct signature dimensions and file size limits automatically. The BPSC teacher exam signature requirements have stayed consistent across all rounds — under 20KB, 150–220px wide, 250–320px tall, JPG format.
                </p>
              </div>
            </div>

            {/* Why Uploads Fail Section */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                Why Uploads Fail in BPSC TRE 4.0 Application Form 2026?
              </h2>
              <div className="text-slate-600 bg-slate-50 p-8 rounded-xl border border-slate-100">
                <p className="mb-4 text-lg">
                  Candidates frequently face challenges when trying to apply online for the BPSC teacher exam because strict web validations reject improperly formatted files. Common upload issues include:
                </p>
                <ul className="grid sm:grid-cols-2 gap-4 mt-6">
                  <li className="bg-white px-5 py-4 rounded-lg border border-slate-200 shadow-sm flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-slate-900">File too large</strong> 
                      Signatures must strictly be below 20 KB.
                    </div>
                  </li>
                  <li className="bg-white px-5 py-4 rounded-lg border border-slate-200 shadow-sm flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-slate-900">Wrong dimensions</strong> 
                      The signature size in pixels must align with the 150-220px width and 250-320px height limits or the server rejects it.
                    </div>
                  </li>
                  <li className="bg-white px-5 py-4 rounded-lg border border-slate-200 shadow-sm flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-slate-900">Document limit exceeded</strong> 
                      PDFs or JPGs crossing 100 KB are immediately blocked.
                    </div>
                  </li>
                  <li className="bg-white px-5 py-4 rounded-lg border border-slate-200 shadow-sm flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-slate-900">Unclear signature</strong> 
                      Signatures done poorly in blue ink or on lined paper trigger manual rejections.
                    </div>
                  </li>
                  <li className="bg-white px-5 py-4 rounded-lg border border-slate-200 shadow-sm flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-slate-900">Wrong format</strong> 
                      Often providing PNG when JPG is specifically requested.
                    </div>
                  </li>
                  <li className="bg-white px-5 py-4 rounded-lg border border-slate-200 shadow-sm flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-slate-900">Poor lighting on live photo</strong> 
                      While not an upload error, dark or obstructed live webcam photos can disqualify your valid application later.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* How to Use Section */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">
                How to Use This BPSC TRE 4.0 Resizer Tool
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                    <FileUp className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">1. Upload Files</h3>
                  <p className="text-sm text-slate-600">Upload your signature image or document from your phone or PC into the tool.</p>
                </div>
                <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                    <Settings className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">2. Select Preset</h3>
                  <p className="text-sm text-slate-600">Ensure the <strong>BPSC TRE 4.0 2026</strong> preset is selected. The exact signature dimensions and KB sizes apply automatically.</p>
                </div>
                <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                    <Download className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">3. Download File</h3>
                  <p className="text-sm text-slate-600">Click download to save your highly optimized, flawless document/signature ready for upload.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Content (Blog Links Only) */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-12">BPSC Reference Articles</h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <Link href="/blog/bpsc-tre-4-0-recruitment-2026" className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all focus:ring-2 focus:ring-[#0056b3] focus:outline-none flex flex-col text-left">
                <h3 className="text-lg font-bold text-slate-900 mb-2 hover:text-[#0056b3] transition-colors">
                  BPSC TRE 4.0 Recruitment 2026 | Vacancies & Application Guide
                </h3>
                <p className="text-slate-600 text-sm mt-auto font-medium text-blue-600">Read Article →</p>
              </Link>
              
              <Link href="/blog/bpsc-aedo-recruitment-2026-admit-card-exam-dates" className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all focus:ring-2 focus:ring-[#0056b3] focus:outline-none flex flex-col text-left">
                <h3 className="text-lg font-bold text-slate-900 mb-2 hover:text-[#0056b3] transition-colors">
                  BPSC AEDO Recruitment 2026: Admit Card & Exam Dates
                </h3>
                <p className="text-slate-600 text-sm mt-auto font-medium text-blue-600">Read Article →</p>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

