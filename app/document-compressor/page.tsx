import { FileUp, Settings, Download, ShieldCheck, Zap, Smartphone, CheckCircle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import AppContainer from '@/components/AppContainer';
import { Header, Footer } from '@/components/Navigation';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Document Compressor | Reduce PDF Size for Exam Forms Online',
  description: 'Compress PDF files and reduce document sizes to 50KB, 100KB, or 200KB instantly. The perfect online document compressor for government exam applications. 100% secure and free.',
  alternates: {
    canonical: '/document-compressor',
  },
};

export default function DocumentCompressorPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Document Compressor",
    "description": "Compress PDF files and reduce document sizes to 50KB, 100KB, or 200KB instantly. The perfect online document compressor for government exam applications.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "url": "https://examresize.online/document-compressor",
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
        "name": "How do I reduce a PDF size to under 100KB?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply upload your PDF to our online document compressor, enter '100' in the target size field, and click compress. Our tool will automatically reduce the PDF file size to meet your exact requirement while maintaining readability."
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
      },
      {
        "@type": "Question",
        "name": "Can I use this tool on my mobile phone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Our PDF MB to KB converter is fully mobile-friendly. You can easily compress documents directly from your smartphone's browser without needing to download any apps."
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Free Online Document Compressor - Reduce PDF Size for Exam Forms
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Compress PDF online to exact KB sizes. The ultimate PDF size reducer for students and job applicants.
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
        
        <section id="how-it-works" className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How to Compress PDF Documents to KB Instantly</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Follow these detailed steps to reduce PDF file size for your applications.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">1. Upload Your PDF</h3>
                <p className="text-slate-600">Click to select or drag and drop your document into the compressor. We support standard PDF files up to 10MB.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">2. Specify Target Size</h3>
                <p className="text-slate-600">Enter the exact maximum KB required by your exam portal (e.g., 50KB, 100KB, or 200KB). Our tool will optimize to fit.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">3. Download Instantly</h3>
                <p className="text-slate-600">Click compress and download your optimized file. It&apos;s ready for immediate upload to any government or job portal.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Use Our PDF Size Reducer?</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Built specifically for the needs of exam candidates and job seekers.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <ShieldCheck className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">100% Secure & Private</h3>
                <p className="text-slate-600">
                  We know you are uploading sensitive personal documents like Aadhar cards and mark sheets. All file transfers are secured with 256-bit SSL encryption. Your documents are permanently and automatically deleted from our servers within one hour of compression.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <CheckCircle className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">No Quality Loss (Crisp Text & Images)</h3>
                <p className="text-slate-600">
                  Reduce PDF size without losing quality. Our advanced algorithms ensure that even when you compress a mark sheet to 100kb online, the scanned text, seals, and signatures remain perfectly crisp and legible for verification.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <Smartphone className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Mobile-Friendly & Fast</h3>
                <p className="text-slate-600">
                  Applying from your phone? Our PDF MB to KB converter works flawlessly on all mobile devices. Compress your documents on the go, directly from your browser, with lightning-fast processing speeds.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Perfect for Government & Competitive Exam Applications</h2>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Optimize Documents for RRB Group D, SSC, and Banking Exams</h3>
            <p className="text-slate-600 text-lg leading-relaxed text-left">
              Job and exam applicants often face a frustrating hurdle: government portals have incredibly strict file size requirements. Whether you need to upload mark sheets, category certificates, or identity proofs, the limit is usually capped tightly between 50KB to 100KB. 
              <br /><br />
              Our tool is designed to solve this exact pain point. When you need to compress PDF for exam form submissions, or reduce document size for RRB Group D application, SSC, or UPSC portals, our compressor ensures your files meet these strict limits instantly, without making the crucial details blurry or illegible.
            </p>
          </div>
        </section>

        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions (FAQs)</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">How do I reduce a PDF size to under 100KB?</h3>
                <p className="text-slate-600">Simply upload your PDF to our online document compressor, enter &apos;100&apos; in the target size field, and click compress. Our tool will automatically reduce the PDF file size to meet your exact requirement while maintaining readability.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Will compressing my PDF make the text blurry?</h3>
                <p className="text-slate-600">No. Our PDF size reducer uses advanced compression algorithms to shrink the file size without losing quality. Your scanned text, signatures, and images will remain crisp and legible, perfect for official exam forms.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Is it safe to upload my Aadhar card or mark sheet here?</h3>
                <p className="text-slate-600">Yes, it is 100% secure and private. All file transfers are protected with 256-bit SSL encryption. Furthermore, your sensitive documents are permanently and automatically deleted from our servers within one hour of compression.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Can I use this tool on my mobile phone?</h3>
                <p className="text-slate-600">Absolutely! Our PDF MB to KB converter is fully mobile-friendly. You can easily compress documents directly from your smartphone&apos;s browser without needing to download any apps.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
