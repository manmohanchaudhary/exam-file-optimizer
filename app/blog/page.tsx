import Link from 'next/link';
import { Header, Footer } from '@/components/Navigation';
import { blogPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog | Exam Notifications & Updates | ExamResize',
  description: 'Stay updated with the latest government exam notifications, eligibility criteria, and application processes.',
};

export default function BlogIndex() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Exam Notifications & Updates | ExamResize",
    "description": "Stay updated with the latest government exam notifications, eligibility criteria, and application processes.",
    "url": "https://examresize.online/blog",
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "url": `https://examresize.online/blog/${post.slug}`
    }))
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Header />
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Exam Notifications & Updates</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <article className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full transition-shadow hover:shadow-md">
                <p className="text-sm text-slate-500 mb-2">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0056b3] transition-colors">{post.title}</h2>
                <p className="text-slate-600 line-clamp-3">{post.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
