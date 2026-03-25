import { FileUp, Image as ImageIcon, FileText, Settings, Download, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import AppContainer from '@/components/AppContainer';
import { Header, Footer } from '@/components/Navigation';

export default function LandingPageTemplate({
  title,
  description,
  keyword,
  faqs,
  initialExamId = 'custom',
  initialFileType = 'photo',
  relatedTools = []
}: {
  title: string;
  description: string;
  keyword: string;
  faqs: { q: string; a: string }[];
  initialExamId?: string;
  initialFileType?: any;
  relatedTools?: { title: string; link: string; desc: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
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
        <section className="pt-8 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
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
                  <span className="text-slate-900 font-medium">{title}</span>
                </div>
              </li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            {description}
          </p>
          
          {/* Main App Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-4xl mx-auto overflow-hidden mb-12">
            <div className="p-6 md:p-8">
              <AppContainer initialExamId={initialExamId} initialFileType={initialFileType} />
            </div>
          </div>

          {/* AdSense Placeholder */}
          <div className="max-w-4xl mx-auto bg-slate-100 border border-slate-200 rounded-lg h-24 flex items-center justify-center text-slate-400 text-sm">
            Advertisement Space (Google AdSense)
          </div>
        </section>

        {/* Step-by-step Guide */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How to use our {keyword} tool</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Follow these simple steps to get your file ready.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">1. Upload</h3>
                <p className="text-slate-600">Upload your original file. We support JPG, PNG, and PDF formats up to 10MB.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">2. Select Preset</h3>
                <p className="text-slate-600">Choose the exact requirement preset or enter custom dimensions and size.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">3. Download</h3>
                <p className="text-slate-600">Click optimize and download your processed file instantly. No signup required.</p>
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

        {/* Related Tools Section */}
        {relatedTools.length > 0 && (
          <section className="py-20 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Related Tools</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTools.map((tool, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{tool.title}</h3>
                    <p className="text-sm text-slate-600 mb-6 flex-grow">{tool.desc}</p>
                    <Link href={tool.link} className="inline-flex items-center text-sm font-semibold text-[#0056b3] hover:text-[#004494]">
                      Open Tool <span className="ml-1">→</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
