import { notFound } from 'next/navigation';
import { FileUp, Settings, Download, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import AppContainer from '@/components/AppContainer';
import { Header, Footer } from '@/components/Navigation';
import { EXAMS } from '@/lib/presets';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const isResizer = slug.endsWith('-photo-resizer');
  const isGuide = slug.endsWith('-photo-size-guide');

  if (!isResizer && !isGuide) {
    return {};
  }

  const examId = isResizer ? slug.replace('-photo-resizer', '') : slug.replace('-photo-size-guide', '');
  
  // Prevent matching exams that have static pages
  const staticExams = ['ssc', 'otet-2026', 'dsssb', 'ssb-odisha'];
  if (isResizer && staticExams.includes(examId)) {
    return {};
  }

  const exam = EXAMS.find(e => e.id === examId);
  if (!exam) {
    return {};
  }

  const shortName = exam.id.replace('-', ' ').toUpperCase();

  if (isGuide) {
    return {
      title: `${shortName} Photo & Signature Size Guide | Exact Dimensions`,
      description: `Complete guide to ${exam.name} photo and signature size requirements. Learn how to resize your images to the exact dimensions and file sizes required for ${exam.name} applications.`,
      alternates: {
        canonical: `/${slug}`,
      },
    };
  }

  return {
    title: `${shortName} Photo Resizer | Resize for Exam Form`,
    description: `Automatically resize and compress your photo and signature for ${exam.name} exams. Ensure your application is accepted with our free tool that applies the correct dimensions.`,
    alternates: {
        canonical: `/${slug}`,
    },
  };
}

export default async function ExamPresetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const isResizer = slug.endsWith('-photo-resizer');
  const isGuide = slug.endsWith('-photo-size-guide');

  if (!isResizer && !isGuide) {
    notFound();
  }

  const examId = isResizer ? slug.replace('-photo-resizer', '') : slug.replace('-photo-size-guide', '');

  // Prevent matching exams that have static pages
  const staticExams = ['ssc', 'otet-2026', 'dsssb', 'ssb-odisha'];
  if (isResizer && staticExams.includes(examId)) {
    notFound();
  }

  const exam = EXAMS.find(e => e.id === examId);
  if (!exam) {
    notFound();
  }

  if (isGuide) {
    const guideSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `${exam.name} Photo & Signature Size Guide`,
      "description": `Ensure your ${exam.name} application is not rejected due to incorrect image dimensions or file sizes. Follow this complete guide to format your photo and signature perfectly.`,
      "image": "https://examresize.online/apple-touch-icon.png",
      "datePublished": "2024-01-01T08:00:00+08:00",
      "dateModified": new Date().toISOString(),
      "author": {
        "@type": "Organization",
        "name": "ExamResize",
        "url": "https://examresize.online"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ExamResize",
        "logo": {
          "@type": "ImageObject",
          "url": "https://examresize.online/apple-touch-icon.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://examresize.online/${slug}`
      }
    };

    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideSchema) }} />
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
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Dimensions:</strong> {exam.photo.dimensionsDescription || (exam.photo.width && exam.photo.height ? `${exam.photo.width} x ${exam.photo.height} pixels` : 'Not specified')}</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>File Size:</strong> {exam.photo.minSizeKb}KB to {exam.photo.maxSizeKb}KB</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Format:</strong> {exam.photo.format.toUpperCase()}</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Additional Info:</strong> {exam.photo.description}</span></li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">2. {exam.name} Signature Size Requirements</h2>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Dimensions:</strong> {exam.signature.dimensionsDescription || (exam.signature.width && exam.signature.height ? `${exam.signature.width} x ${exam.signature.height} pixels` : 'Not specified')}</span></li>
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
                  href={
                    exam.id === 'ssc' ? '/photo-resize-for-ssc-form' :
                    exam.id === 'otet-2026' ? '/otet-photo-resize-2026' :
                    exam.id === 'dsssb' ? '/dsssb-image-optimizer' :
                    exam.id === 'ssb-odisha' ? '/ssb-odisha-image-resizer' :
                    `/${exam.id}-photo-resizer`
                  }
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

  const resizerSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${exam.name} Photo & Signature Resizer`,
    "description": `Automatically apply the correct dimensions and file size limits for ${exam.name}. Upload your photo or signature below.`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "url": `https://examresize.online/${slug}`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(resizerSchema) }} />
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
                <p className="text-slate-600">The correct dimensions and file size limits for {exam.name} are already applied. {exam.id === 'upsc' && <strong>Important: Remember to rename your PDF documents exactly as UPSC instructs (e.g., id_card.pdf) before final upload. Photos and signatures are named automatically.</strong>}</p>
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

        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">{exam.name} Photo & Signature Requirements</h2>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Photo Requirements</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Dimensions:</strong> {exam.photo.dimensionsDescription || (exam.photo.width && exam.photo.height ? `${exam.photo.width} x ${exam.photo.height} pixels` : 'Not specified')}</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>File Size:</strong> {exam.photo.minSizeKb}KB to {exam.photo.maxSizeKb}KB</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Format:</strong> {exam.photo.format.toUpperCase()}</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Additional Info:</strong> {exam.photo.description}</span></li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Signature Requirements</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Dimensions:</strong> {exam.signature.dimensionsDescription || (exam.signature.width ? `${exam.signature.width} x ${exam.signature.height} pixels` : 'Not specified')}</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>File Size:</strong> {exam.signature.minSizeKb}KB to {exam.signature.maxSizeKb}KB</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Format:</strong> {exam.signature.format.toUpperCase()}</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Additional Info:</strong> {exam.signature.description}</span></li>
              </ul>
            </div>

            {exam.document && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Document Requirements (PDF)</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Format:</strong> {exam.document.format.toUpperCase()}</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>File Size:</strong> {exam.document.minSizeKb}KB to {exam.document.maxSizeKb}KB</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Additional Info:</strong> {exam.document.description}</span></li>
                </ul>
              </div>
            )}

            {exam.notes && (
              <div className="bg-amber-50 rounded-2xl shadow-sm border border-amber-200 p-8 mb-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xl font-bold text-amber-900 mb-2">Important Note</h3>
                    <p className="text-amber-800">{exam.notes}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-slate-900">What if my photo background is not white?</h4>
                  <p className="text-slate-600 mt-1">Most exams (like SSC, UP Police) strictly reject non-white backgrounds. {exam.id === 'upsc' && <strong>UPSC strictly requires a plain white background and 75% face coverage.</strong>} Ensure you use a photo with a plain white or light-colored background before resizing.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Can I upload a selfie?</h4>
                  <p className="text-slate-600 mt-1">No. Selfies are rejected by all commissions (UPSC, Bihar Police, etc.). Ensure a straight-facing, professionally clicked photo.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">How do I add my Name and Date to the photo?</h4>
                  <p className="text-slate-600 mt-1">Exams like MP Police and IBPS require this. You should add your name and the date of the photo using a photo editor before uploading it to our resizer to apply the final preset.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">My signature is getting blurry. What should I do?</h4>
                  <p className="text-slate-600 mt-1">Sign on plain white paper with a thick BLACK pen. Crop it closely before uploading to our resizer to maintain clarity within the KB limit.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">How do I resize my photo for {exam.name}?</h4>
                  <p className="text-slate-600 mt-1">Simply upload your photo using the tool above. It will automatically resize and compress your image to meet the exact requirements for {exam.name}.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Is my data safe?</h4>
                  <p className="text-slate-600 mt-1">Yes, all processing is done securely. Your images are not stored on our servers and are deleted immediately after you download them.</p>
                </div>
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
  const resizerParams = EXAMS
    .filter(exam => exam.id !== 'ssc' && exam.id !== 'otet-2026' && exam.id !== 'dsssb' && exam.id !== 'ssb-odisha')
    .map(exam => ({
      slug: `${exam.id}-photo-resizer`,
    }));
  const guideParams = EXAMS.map(exam => ({
    slug: `${exam.id}-photo-size-guide`,
  }));
  return [...resizerParams, ...guideParams];
}
