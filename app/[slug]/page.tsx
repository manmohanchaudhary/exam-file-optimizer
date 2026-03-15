import { notFound } from 'next/navigation';
import { FileUp, Settings, Download, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import AppContainer from '@/components/AppContainer';
import { Header, Footer } from '@/components/Navigation';
import { EXAMS } from '@/lib/presets';

export default async function ExamPresetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const isResizer = slug.endsWith('-photo-resizer');
  const isGuide = slug.endsWith('-photo-size-guide');

  if (!isResizer && !isGuide) {
    notFound();
  }

  const examId = isResizer ? slug.replace('-photo-resizer', '') : slug.replace('-photo-size-guide', '');
  const exam = EXAMS.find(e => e.id === examId);

  if (!exam) {
    notFound();
  }

  if (isGuide) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              {exam.name} Photo & Signature Size Guide
            </h1>
            <p className="text-lg text-slate-600 mb-10">
              Ensure your {exam.name} application is not rejected due to incorrect image dimensions or file sizes. Follow this complete guide to format your photo and signature perfectly.
            </p>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">1. {exam.name} Photo Size Requirements</h2>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Dimensions:</strong> {exam.photo.width} x {exam.photo.height} pixels</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>File Size:</strong> {exam.photo.minSizeKb}KB to {exam.photo.maxSizeKb}KB</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Format:</strong> {exam.photo.format.toUpperCase()}</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Additional Info:</strong> {exam.photo.description}</span></li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">2. {exam.name} Signature Size Requirements</h2>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Dimensions:</strong> {exam.signature.width} x {exam.signature.height} pixels</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>File Size:</strong> {exam.signature.minSizeKb}KB to {exam.signature.maxSizeKb}KB</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Format:</strong> {exam.signature.format.toUpperCase()}</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Additional Info:</strong> {exam.signature.description}</span></li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">3. How to Resize {exam.name} Photo Online</h2>
                <ol className="list-decimal pl-5 space-y-3 text-slate-700">
                  <li>Go to the {exam.name} Photo Resizer tool.</li>
                  <li>Upload your raw photo or signature image.</li>
                  <li>The tool will automatically apply the correct dimensions and file size limits.</li>
                  <li>Click &quot;Process&quot; and download your optimized image.</li>
                </ol>
              </section>

              <div className="mt-10 pt-8 border-t text-center">
                <Link 
                  href={`/${exam.id}-photo-resizer`}
                  className="inline-flex items-center justify-center gap-2 bg-[#0056b3] hover:bg-[#004494] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-md"
                >
                  Use the {exam.name} Photo Resizer Tool <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow">
        <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            {exam.name} Photo & Signature Resizer
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Automatically apply the correct dimensions and file size limits for {exam.name}. Upload your photo or signature below.
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-4xl mx-auto overflow-hidden mb-12">
            <div className="p-6 md:p-8">
              <AppContainer initialExamId={exam.id} />
            </div>
          </div>

          <div className="max-w-4xl mx-auto my-8">
            <AdBanner dataAdSlot="YOUR_AD_SLOT_ID" />
          </div>
        </section>
        
        <section id="how-it-works" className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Three simple steps to get your files ready for upload.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">1. Upload File</h3>
                <p className="text-slate-600">Drag and drop your photo, signature, or PDF document. Max 10MB.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">2. Verify Settings</h3>
                <p className="text-slate-600">The correct dimensions and file size limits for {exam.name} are already applied.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-6">
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

export function generateStaticParams() {
  const resizerParams = EXAMS.map(exam => ({
    slug: `${exam.id}-photo-resizer`,
  }));
  const guideParams = EXAMS.map(exam => ({
    slug: `${exam.id}-photo-size-guide`,
  }));
  return [...resizerParams, ...guideParams];
}
