import { Metadata } from 'next';
import Link from 'next/link';
import { FileUp, Settings, Download, CheckCircle2, AlertTriangle, Image as ImageIcon, FileText } from 'lucide-react';
import AppContainer from '@/components/AppContainer';
import { Header, Footer } from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'OTET 2026 Photo & Signature Resize Tool – Free Online',
  description: 'Easily resize your photo and signature for the OTET 2026 application form. Our tool automatically applies the correct size, format, and aspect ratio limits.',
  alternates: {
    canonical: '/otet-photo-resize-2026',
  },
};

export default function OTETPhotoResize() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "OTET 2026 Photo & Signature Resize Tool",
    "description": "Resize photo and signature for OTET 2026 form using correct size, format and aspect ratio as per latest guidelines.",
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
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the photo size for OTET 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "20 KB to 100 KB in JPG format with passport size ratio."
        }
      },
      {
        "@type": "Question",
        "name": "What is the signature size for OTET 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "10 KB to 50 KB in JPG format."
        }
      },
      {
        "@type": "Question",
        "name": "Does OTET require fixed pixel dimensions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, OTET does not specify fixed pixel dimensions."
        }
      },
      {
        "@type": "Question",
        "name": "Can I upload PNG images?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It is recommended to use JPG/JPEG format."
        }
      },
      {
        "@type": "Question",
        "name": "Is this tool free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it is completely free."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
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
                  <span className="text-slate-900 font-medium">OTET 2026 Resize Tool</span>
                </div>
              </li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            OTET 2026 Photo & Signature Resize Tool
          </h1>
          
          <div className="max-w-3xl mx-auto mb-10 text-left">
            <p className="text-lg text-slate-600 mb-6">
              The Odisha Teacher Eligibility Test (OTET) is a crucial exam for aspiring teachers in Odisha. Uploading correctly formatted images is essential to ensure your application is not rejected. 
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-amber-900 font-medium text-sm md:text-base">
                <strong>Important Note:</strong> OTET does not specify fixed pixel dimensions. This tool uses standard TET guidelines (3.5×4.5 cm photo ratio) for compatibility. Always verify with official notification.
              </p>
            </div>
          </div>
          
          {/* Main App Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-4xl mx-auto overflow-hidden mb-12 text-left">
            <div className="p-6 md:p-8">
              <AppContainer initialExamId="otet-2026" />
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">OTET 2026 Image Requirements</h2>
              <p className="text-slate-600">Ensure your files meet these exact specifications before uploading.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-blue-600" /> Photo Requirements
                </h3>
                <ul className="space-y-4 text-slate-700">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>File Size:</strong> 20 KB – 100 KB</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Format:</strong> JPG/JPEG</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Aspect Ratio:</strong> Passport size (approx 3.5:4.5 ratio)</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Background:</strong> White or light background</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Visibility:</strong> Face clearly visible, front-facing</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Restrictions:</strong> No caps or sunglasses allowed</span></li>
                </ul>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-600" /> Signature Requirements
                </h3>
                <ul className="space-y-4 text-slate-700">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>File Size:</strong> 10 KB – 50 KB</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Format:</strong> JPG/JPEG</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Aspect Ratio:</strong> Approx ratio 3.5:1.5</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Background:</strong> White background</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Ink:</strong> Blue or Black pen</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Restrictions:</strong> Signature should be clear and not in capital letters</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How to Use</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Follow these simple steps to get your file ready for OTET 2026.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white text-center p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileUp className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">1. Upload image</h3>
                <p className="text-sm text-slate-600">Select your raw photo or signature file.</p>
              </div>
              <div className="bg-white text-center p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">2. Select Type</h3>
                <p className="text-sm text-slate-600">Choose either Photo or Signature preset.</p>
              </div>
              <div className="bg-white text-center p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">3. Click resize</h3>
                <p className="text-sm text-slate-600">Our tool will automatically process the image.</p>
              </div>
              <div className="bg-white text-center p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">4. Download</h3>
                <p className="text-sm text-slate-600">Save the processed file to your device.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-10">Features</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="font-medium text-slate-800">Automatic resize and compression</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="font-medium text-slate-800">Maintains quality</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="font-medium text-slate-800">No pixel distortion</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="font-medium text-slate-800">Free and fast</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="font-medium text-slate-800">No login required</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Q1. What is the photo size for OTET 2026?</h3>
                <p className="text-slate-600">Answer: 20 KB to 100 KB in JPG format with passport size ratio.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Q2. What is the signature size for OTET 2026?</h3>
                <p className="text-slate-600">Answer: 10 KB to 50 KB in JPG format.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Q3. Does OTET require fixed pixel dimensions?</h3>
                <p className="text-slate-600">Answer: No, OTET does not specify fixed pixel dimensions.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Q4. Can I upload PNG images?</h3>
                <p className="text-slate-600">Answer: It is recommended to use JPG/JPEG format.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Q5. Is this tool free?</h3>
                <p className="text-slate-600">Answer: Yes, it is completely free.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
