import { FileUp, Image as ImageIcon, FileText, Settings, Download, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AdBanner from '@/components/AdBanner';
import AppContainer from '@/components/AppContainer';
import { Header, Footer } from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Instantly Convert Photos & Documents <br className="hidden md:block" />
            <span className="text-indigo-600">for Exam Forms</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Never get your application rejected again. Resize, compress, and format your photos, signatures, and PDFs to meet strict government and competitive exam requirements.
          </p>
          
          {/* Main App Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-4xl mx-auto overflow-hidden mb-12">
            <div className="p-6 md:p-8">
              <AppContainer />
            </div>
          </div>

          {/* AdSense Banner */}
          <div className="max-w-4xl mx-auto my-8">
            <AdBanner dataAdSlot="YOUR_AD_SLOT_ID" />
          </div>
        </section>

        {/* Features Section */}
        <section id="how-it-works" className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Three simple steps to get your files ready for upload.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">1. Upload File</h3>
                <p className="text-slate-600">Drag and drop your photo, signature, or PDF document. Max 10MB.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">2. Select Preset</h3>
                <p className="text-slate-600">Choose from SSC, UPSC, Banking, NEET, or enter custom dimensions and size.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">3. Download</h3>
                <p className="text-slate-600">Get your optimized file instantly. 100% secure, files are deleted immediately.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
