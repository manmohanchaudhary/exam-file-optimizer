import { FileUp, Image as ImageIcon, FileText, Settings, Download, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AdBanner from '@/components/AdBanner';
import AppContainer from '@/components/AppContainer';
import { Header, Footer } from '@/components/Navigation';
import { blogPosts } from '@/lib/blog';

export default function Home() {
  const tools = [
    { title: 'SSC Photo Resizer', desc: 'Resize photo and signature for SSC exams.', link: '/ssc-photo-resizer' },
    { title: 'UPSC Photo Resizer', desc: 'Format images for UPSC civil services.', link: '/upsc-photo-resizer' },
    { title: 'NEET Photo Resizer', desc: 'Prepare your NEET application photos.', link: '/neet-photo-resizer' },
    { title: 'IBPS Photo Resizer', desc: 'Resize photos for banking exams.', link: '/ibps-photo-resizer' },
    { title: 'RRB Photo Resizer', desc: 'Optimize images for Railway exams.', link: '/rrb-photo-resizer' },
    { title: '20KB Photo Converter', desc: 'Compress any photo to under 20KB.', link: '/20kb-photo-converter' },
    { title: 'Passport Photo Maker', desc: 'Create standard passport size photos.', link: '/passport-photo-for-exam-forms' },
    { title: 'Signature Optimizer', desc: 'Resize and compress signature scans.', link: '/signature-resize-for-exam' },
  ];

  const faqs = [
    { q: 'Is it safe to upload my documents?', a: 'Yes, absolutely. All processing is done securely and your files are never stored on our servers. They are deleted immediately after processing.' },
    { q: 'What is the maximum file size allowed?', a: 'You can upload files up to 10MB in size. Our tool will compress them to meet your specific exam requirements.' },
    { q: 'Which exams are supported?', a: 'We support all major Indian government and competitive exams including SSC, UPSC, IBPS, SBI, RRB, NEET, and JEE.' },
    { q: 'Can I compress PDF documents?', a: 'Yes, our Document Compressor tool allows you to compress PDF files to specific size limits required by exam portals.' },
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ExamResize",
    "url": "https://examresize.online",
    "description": "Resize, compress, and format your photos, signatures, and PDFs to meet strict government and competitive exam requirements.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Instantly Convert Photos & Documents <br className="hidden md:block" />
            <span className="text-[#28a745]">for Exam Forms</span>
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

        {/* Top Tools Grid */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Popular Tools</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Quickly access our most used photo and document resizing tools.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool, idx) => (
                <div key={idx} className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{tool.title}</h3>
                  <p className="text-sm text-slate-600 mb-6 flex-grow">{tool.desc}</p>
                  <Link href={tool.link} className="inline-flex items-center text-sm font-semibold text-[#0056b3] hover:text-[#004494]">
                    Open Tool <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="how-it-works" className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Three simple steps to get your files ready for upload.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
                <div className="w-16 h-16 bg-blue-100 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">1. Upload File</h3>
                <p className="text-slate-600">Drag and drop your photo, signature, or PDF document. Max 10MB.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
                <div className="w-16 h-16 bg-blue-100 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">2. Select Preset</h3>
                <p className="text-slate-600">Choose from SSC, UPSC, Banking, NEET, or enter custom dimensions and size.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
                <div className="w-16 h-16 bg-blue-100 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">3. Download</h3>
                <p className="text-slate-600">Get your optimized file instantly. 100% secure, files are deleted immediately.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Exams Section */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Supported Exams</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-12">We provide exact presets for all major competitive exams in India.</p>
            <div className="flex flex-wrap justify-center gap-4">
              {['SSC', 'UPSC', 'IBPS', 'SBI', 'RRB', 'RBI', 'NEET', 'JEE'].map((exam) => (
                <Link key={exam} href={`/${exam.toLowerCase()}-photo-resizer`} className="px-6 py-3 bg-slate-100 text-slate-800 font-semibold rounded-full hover:bg-slate-200 transition-colors">
                  {exam}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Latest Exam Updates</h2>
                <p className="text-slate-600 max-w-2xl">Stay informed about recent government exam notifications and requirements.</p>
              </div>
              <Link href="/blog" className="hidden sm:inline-flex items-center text-sm font-semibold text-[#0056b3] hover:text-[#004494]">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                  <article className="bg-slate-50 rounded-2xl border border-slate-200 p-6 h-full transition-shadow hover:shadow-md">
                    <p className="text-sm text-slate-500 mb-2">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0056b3] transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-slate-600 line-clamp-3">{post.excerpt}</p>
                  </article>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-[#0056b3] hover:text-[#004494]">
                View All Updates <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
