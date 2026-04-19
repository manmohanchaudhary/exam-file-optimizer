import { Metadata } from 'next';
import Link from 'next/link';
import { FileUp, Settings, Download, CheckCircle2, AlertTriangle, Image as ImageIcon, FileText, Fingerprint } from 'lucide-react';
import AppContainer from '@/components/AppContainer';
import { Header, Footer } from '@/components/Navigation';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'SSB Odisha Jr Assistant Photo & Signature Resizer',
  description: 'Free online tool to resize photo, signature, and left thumb impression for SSB Odisha Junior Assistant & Junior Clerk 2026. Auto-resize to exact pixels and KB.',
  alternates: {
    canonical: '/ssb-odisha-image-resizer',
  },
};

export default function SSBOdishaImageResizer() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SSB Odisha Junior Assistant & Junior Clerk 2026 Photo, Signature & Left Thumb Resize Tool",
    "description": "Resize photo, signature, and left thumb impression for SSB Odisha Junior Assistant & Junior Clerk 2026 form using official guidelines. Supports JPG and PNG formats.",
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
        "name": "What is the photo size for SSB Odisha Junior Assistant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The official photo size for SSB Odisha Junior Assistant & Junior Clerk is 390px × 470px, and the file size must be between 30KB and 100KB in JPG or PNG format."
        }
      },
      {
        "@type": "Question",
        "name": "How to resize signature for SSB Odisha 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can use our free online tool. Just select the 'Signature' option, upload your raw image, and it will automatically resize it to 455px × 210px and compress it to 20KB - 50KB."
        }
      },
      {
        "@type": "Question",
        "name": "What is the thumb impression size for SSB Odisha?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The left thumb impression must be 455px × 210px in dimensions, and the file size should be between 20KB and 50KB in JPG or PNG format."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this tool on my mobile phone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this tool is fully mobile-friendly. You can easily upload, resize, and download your images directly from your smartphone."
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
                  <span className="text-slate-900 font-medium">SSB Odisha Image Resizer</span>
                </div>
              </li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            SSB Odisha Junior Assistant & Junior Clerk 2026 Photo, Signature & Left Thumb Resize Tool (Free Online)
          </h1>
          
          <div className="max-w-3xl mx-auto mb-10 text-left">
            <p className="text-lg text-slate-600 mb-6">
              Applying for the SSB Odisha Junior Assistant & Junior Clerk posts (Advt. No. 01/2026)? A common problem candidates face is image rejection due to wrong dimensions or file size confusion during upload. This free online tool solves that instantly by automatically resizing your photo, signature, and left thumb impression to the exact required specifications.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-blue-900 font-medium text-sm md:text-base">
                Works instantly online! Just upload your image, and we will auto-crop, resize to exact pixels, and compress to the correct KB limit.
              </p>
            </div>
          </div>
          
          {/* Main App Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-4xl mx-auto overflow-hidden mb-12 text-left">
            <div className="p-6 md:p-8">
              <AppContainer initialExamId="ssb-odisha" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto my-8">
            <AdBanner dataAdSlot="YOUR_AD_SLOT_ID" />
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Image Upload Requirements (VERY CLEAR)</h2>
              <p className="text-slate-600">Ensure your files meet these exact specifications to avoid application rejection.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-blue-600" /> Passport Photo
                </h3>
                <ul className="space-y-4 text-slate-700">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Dimensions:</strong> 390px × 470px</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>File Size:</strong> 30 KB – 100 KB</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Format:</strong> JPG / PNG</span></li>
                </ul>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-600" /> Signature
                </h3>
                <ul className="space-y-4 text-slate-700">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Dimensions:</strong> 455px × 210px</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>File Size:</strong> 20 KB – 50 KB</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Format:</strong> JPG / PNG</span></li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Fingerprint className="w-6 h-6 text-blue-600" /> Left Thumb
                </h3>
                <ul className="space-y-4 text-slate-700">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Dimensions:</strong> 455px × 210px</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>File Size:</strong> 20 KB – 50 KB</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Format:</strong> JPG / PNG</span></li>
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
              <p className="text-slate-600 max-w-2xl mx-auto">Follow these simple steps to get your files ready for the SSB Odisha portal.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white text-center p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">1. Select Image Type</h3>
                <p className="text-sm text-slate-600">Choose Photo, Signature, or Thumb Impression.</p>
              </div>
              <div className="bg-white text-center p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileUp className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">2. Upload Image</h3>
                <p className="text-sm text-slate-600">Upload your raw image from your device.</p>
              </div>
              <div className="bg-white text-center p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">3. Check & Download</h3>
                <p className="text-sm text-slate-600">Check the preview and click &quot;Download&quot;.</p>
              </div>
              <div className="bg-white text-center p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">4. Upload to Portal</h3>
                <p className="text-sm text-slate-600">Upload directly to the SSB Odisha portal without errors.</p>
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
                <span className="font-medium text-slate-800">Auto-crop & resize to exact pixels</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="font-medium text-slate-800">Auto-compress to exact KB limit</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="font-medium text-slate-800">100% Free & Secure</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="font-medium text-slate-800">No data saved on server</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="font-medium text-slate-800">Mobile-friendly</span>
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
                <h3 className="text-lg font-bold text-slate-900 mb-2">What is the photo size for SSB Odisha Junior Assistant?</h3>
                <p className="text-slate-600">The official photo size for SSB Odisha Junior Assistant & Junior Clerk is 390px × 470px, and the file size must be between 30KB and 100KB in JPG or PNG format.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">How to resize signature for SSB Odisha 2026?</h3>
                <p className="text-slate-600">You can use our free online tool. Just select the &quot;Signature&quot; option, upload your raw image, and it will automatically resize it to 455px × 210px and compress it to 20KB - 50KB.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">What is the thumb impression size for SSB Odisha?</h3>
                <p className="text-slate-600">The left thumb impression must be 455px × 210px in dimensions, and the file size should be between 20KB and 50KB in JPG or PNG format.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Can I use this tool on my mobile phone?</h3>
                <p className="text-slate-600">Yes, this tool is fully mobile-friendly. You can easily upload, resize, and download your images directly from your smartphone.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
