import { FileUp, Image as ImageIcon, FileText, Settings, Download, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import AppContainer from '@/components/AppContainer';
import { Header, Footer } from '@/components/Navigation';

export default function LandingPageTemplate({
  title,
  description,
  keyword,
  faqs
}: {
  title: string;
  description: string;
  keyword: string;
  faqs: { q: string; a: string }[];
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            {description}
          </p>
          
          {/* Main App Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-4xl mx-auto overflow-hidden mb-12">
            <div className="p-6 md:p-8">
              <AppContainer />
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
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">1. Upload</h3>
                <p className="text-slate-600">Upload your original file. We support JPG, PNG, and PDF formats up to 10MB.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">2. Select Preset</h3>
                <p className="text-slate-600">Choose the exact requirement preset or enter custom dimensions and size.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
      </main>

      <Footer />
    </div>
  );
}
