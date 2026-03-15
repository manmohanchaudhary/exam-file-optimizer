import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import Link from 'next/link';
import { Header, Footer } from '@/components/Navigation';
import { blogPosts } from '@/lib/blog';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | ExamResize`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "ExamResize"
    }
  };

  const exams = ['rrb', 'ssc', 'upsc', 'neet', 'jee', 'ibps', 'sbi', 'rbi'];
  const detectedExam = exams.find(exam => slug.includes(exam))?.toUpperCase();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Header />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <article className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <header className="mb-10 border-b pb-8">
            <p className="text-sm text-slate-500 mb-3">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">{post.title}</h1>
          </header>
          <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-[#0056b3] hover:prose-a:text-[#004494]">
            <Markdown>{post.content}</Markdown>
          </div>
        </article>
      </main>
      <Footer />

      {detectedExam && (
        <>
          {/* Desktop Floating Button */}
          <Link 
            href={`/${detectedExam.toLowerCase()}-photo-resizer`} 
            className="hidden md:block fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 z-50 font-semibold transition-colors"
          >
            Resize Photo for {detectedExam} Application
          </Link>
          
          {/* Mobile Sticky Bottom Bar */}
          <div className="md:hidden sticky bottom-0 w-full bg-blue-600 text-white text-center py-3 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <Link 
              href={`/${detectedExam.toLowerCase()}-photo-resizer`} 
              className="block w-full font-semibold"
            >
              Resize Photo for {detectedExam} Application
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
