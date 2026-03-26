import Link from 'next/link';
import { Header, Footer } from '@/components/Navigation';
import { blogPosts } from '@/lib/blog';
import { ChevronRight, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Blog | Exam Notifications & Updates | ExamResize',
  description: 'Stay updated with the latest government exam notifications, eligibility criteria, application processes, and tips for resizing your exam photos and documents.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | Exam Notifications & Updates | ExamResize',
    description: 'Stay updated with the latest government exam notifications, eligibility criteria, and application processes.',
    url: 'https://examresize.online/blog',
    type: 'website',
    siteName: 'ExamResize',
  },
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://examresize.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://examresize.online/blog"
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <section className="bg-white border-b border-slate-200 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-slate-500 mb-8">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-slate-900 font-medium">Blog</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
              Exam Notifications & Updates
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed">
              Stay updated with the latest government exam notifications, eligibility criteria, application processes, and guides on how to properly format your documents.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group h-full">
                <article className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 h-full flex flex-col transition-all duration-200 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-4 font-medium">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-3">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-600 line-clamp-3 mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-blue-600 font-medium text-sm mt-auto">
                    Read article <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
