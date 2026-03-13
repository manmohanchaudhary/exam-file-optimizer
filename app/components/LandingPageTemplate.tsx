import { FileUp, Image as ImageIcon, FileText, Settings, Download, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import AppContainer from '@/components/AppContainer';

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
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">ExamFileOptimizer</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900">How it Works</Link>
            <Link href="/#presets" className="text-sm font-medium text-slate-600 hover:text-slate-900">Presets</Link>
            <Link href="#faq" className="text-sm font-medium text-slate-600 hover:text-slate-900">FAQ</Link>
          </nav>
        </div>
      </header>

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

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="w-5 h-5 text-indigo-400" />
              <span className="font-bold text-xl text-white tracking-tight">ExamFileOptimizer</span>
            </div>
            <p className="text-sm max-w-md">
              The fastest and most secure way to resize and compress photos, signatures, and documents for online exam forms.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/photo-resize-for-ssc-form" className="hover:text-white transition-colors">SSC Photo Resizer</Link></li>
              <li><Link href="/signature-resize-for-exam" className="hover:text-white transition-colors">Exam Signature Optimizer</Link></li>
              <li><Link href="/20kb-photo-converter" className="hover:text-white transition-colors">20KB Photo Converter</Link></li>
              <li><Link href="/passport-photo-for-exam-forms" className="hover:text-white transition-colors">Passport Photo Maker</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
          &copy; {new Date().getFullYear()} ExamFileOptimizer. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
