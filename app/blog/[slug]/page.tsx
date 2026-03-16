import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer } from '@/components/Navigation';
import { blogPosts } from '@/lib/blog';
import { ChevronRight, Calendar, Clock } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import remarkDirective from 'remark-directive';
import remarkDirectivePlugin from '@/lib/remarkDirectivePlugin';
import { TableOfContents } from '@/components/TableOfContents';
import { TipBox, WarningBox, NoteBox, StepBlock, CTABlock } from '@/components/BlogComponents';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  
  const url = `https://examresize.online/blog/${slug}`;
  
  return {
    title: `${post.title} | ExamResize`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: url,
      type: 'article',
      publishedTime: post.date,
      siteName: 'ExamResize',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Calculate reading time
  const words = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(words / 200); // Assuming 200 words per minute

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "ExamResize"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ExamResize",
      "logo": {
        "@type": "ImageObject",
        "url": "https://examresize.online/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://examresize.online/blog/${slug}`
    }
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://examresize.online/blog/${slug}`
      }
    ]
  };

  const exams = ['rrb', 'ssc', 'upsc', 'neet', 'jee', 'ibps', 'sbi', 'rbi'];
  const detectedExam = exams.find(exam => slug.includes(exam))?.toUpperCase();
  
  // Get related posts
  const relatedPosts = blogPosts
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <section className="bg-white border-b border-slate-200 py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
              <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
              <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
              <span className="text-slate-900 font-medium truncate">{post.title}</span>
            </nav>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
              {post.title}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content */}
            <article className="lg:w-2/3 max-w-3xl mx-auto lg:mx-0">
              <div className="prose prose-slate prose-lg max-w-none 
                prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200
                prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-slate-700 prose-li:mb-2
                prose-strong:text-slate-900 prose-strong:font-semibold
                prose-img:rounded-xl prose-img:shadow-md prose-img:my-8"
              >
                <Markdown 
                  remarkPlugins={[remarkGfm, remarkDirective, remarkDirectivePlugin]} 
                  rehypePlugins={[rehypeSlug]}
                  components={{
                    div: ({ node, className, children, ...props }: any) => {
                      if (className === 'custom-tip-box') return <TipBox>{children}</TipBox>;
                      if (className === 'custom-warning-box') return <WarningBox>{children}</WarningBox>;
                      if (className === 'custom-note-box') return <NoteBox>{children}</NoteBox>;
                      if (className === 'custom-step-block') {
                        return <StepBlock number={props['data-number']} title={props['data-title']}>{children}</StepBlock>;
                      }
                      if (className === 'custom-cta-block') {
                        return <CTABlock title={props['data-title']} link={props['data-link']} buttonText={props['data-button']} />;
                      }
                      return <div className={className} {...props}>{children}</div>;
                    },
                    img: ({ node, src, alt, ...props }: any) => {
                      return (
                        <figure className="my-8">
                          <img src={src} alt={alt} className="w-full rounded-xl shadow-md" {...props} />
                          {alt && <figcaption className="text-center text-sm text-slate-500 mt-3">{alt}</figcaption>}
                        </figure>
                      );
                    }
                  }}
                >
                  {post.content}
                </Markdown>
              </div>

              {/* In-Article CTA */}
              {detectedExam && (
                <div className="mt-16 pt-8 border-t border-slate-200">
                  <CTABlock 
                    title={`Ready to apply for ${detectedExam}?`}
                    link={`/${detectedExam.toLowerCase()}-photo-resizer`}
                    buttonText={`Resize ${detectedExam} Photo Now`}
                  />
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:w-1/3 space-y-8">
              <TableOfContents content={post.content} />
              
              {/* Sidebar CTA */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Need to resize a photo?</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Use our free online tool to compress and resize your photos to exactly 20KB, 50KB, or any size required by exam portals.
                </p>
                <Link 
                  href="/20kb-photo-converter"
                  className="block w-full text-center bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Open 20KB Photo Converter
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="bg-white border-t border-slate-200 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group block">
                    <article className="bg-slate-50 rounded-xl p-6 border border-slate-200 h-full transition-all hover:shadow-md hover:border-blue-200">
                      <p className="text-xs text-slate-500 mb-2 font-medium">
                        {new Date(relatedPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                      <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />

      {/* Mobile Sticky Bottom Bar */}
      {detectedExam && (
        <div className="md:hidden sticky bottom-0 w-full bg-blue-600 text-white text-center py-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
          <Link 
            href={`/${detectedExam.toLowerCase()}-photo-resizer`} 
            className="block w-full font-bold text-lg"
          >
            Resize Photo for {detectedExam} →
          </Link>
        </div>
      )}
    </div>
  );
}
