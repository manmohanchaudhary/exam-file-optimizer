import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "@/components/Navigation";
import { blogPosts } from "@/lib/blog";
import { ChevronRight, Calendar, Clock, Crop } from "lucide-react";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import remarkDirective from "remark-directive";
import remarkDirectivePlugin from "@/lib/remarkDirectivePlugin";
import { TableOfContents } from "@/components/TableOfContents";
import { ShareButtons } from "@/components/ShareButtons";
import {
  TipBox,
  WarningBox,
  NoteBox,
  StepBlock,
  CTABlock,
  ResponsiveTable,
} from "@/components/BlogComponents";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const url = `https://examresize.online/blog/${slug}`;

  return {
    title: `${post.title} | ExamResize`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: url,
      type: "article",
      publishedTime: post.date,
      siteName: "ExamResize",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Calculate reading time
  const words = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(words / 200); // Assuming 200 words per minute
  
  const url = `https://examresize.online/blog/${slug}`;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "ExamResize",
    },
    publisher: {
      "@type": "Organization",
      name: "ExamResize",
      logo: {
        "@type": "ImageObject",
        url: "https://examresize.online/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://examresize.online/blog/${slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://examresize.online",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://examresize.online/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://examresize.online/blog/${slug}`,
      },
    ],
  };

  const exams = ["rrb", "ssc", "upsc", "neet", "jee", "ibps", "sbi", "rbi"];
  const detectedExam = exams.find((exam) => slug.includes(exam))?.toUpperCase();

  // Get related posts
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      <main className="flex-grow w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Main Content (70%) */}
            <article className="lg:w-[70%] max-w-[720px] w-full min-w-0 mx-auto lg:mx-0 overflow-hidden">
              {/* Hero Section (Integrated) */}
              <header className="mb-12 w-full">
                {/* Breadcrumb */}
                <nav className="flex items-center text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 w-full scrollbar-hide">
                  <Link
                    href="/"
                    className="hover:text-blue-600 transition-colors shrink-0"
                  >
                    Home
                  </Link>
                  <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
                  <Link
                    href="/blog"
                    className="hover:text-blue-600 transition-colors shrink-0"
                  >
                    Blog
                  </Link>
                  <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
                  <span className="text-slate-900 font-medium truncate shrink-0">
                    {post.title}
                  </span>
                </nav>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight break-words">
                  {post.title}
                </h1>

                <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed break-words">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-500 font-medium border-b border-slate-200 pb-8">
                  <div className="flex items-center gap-2 shrink-0">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <span className="hidden sm:inline-block text-slate-300 shrink-0">•</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </header>

              {/* Markdown Content */}
              <div
                className="prose prose-slate prose-lg max-w-none break-words
                prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-28 prose-headings:break-words
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200
                prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-[#333333] prose-p:leading-[1.7] prose-p:mb-6 prose-p:break-words
                prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:break-words
                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-5
                prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-5
                prose-li:text-[#333333] prose-li:mb-6 prose-li:leading-[1.7] prose-li:break-words
                prose-strong:text-slate-900 prose-strong:font-semibold
                prose-img:rounded-xl prose-img:shadow-md prose-img:my-8 prose-img:max-w-full
                prose-hr:my-10 prose-hr:border-slate-200
                prose-pre:max-w-full prose-pre:overflow-x-auto
                prose-table:max-w-full prose-table:overflow-x-auto prose-table:block"
              >
                <Markdown
                  remarkPlugins={[
                    remarkGfm,
                    remarkDirective,
                    remarkDirectivePlugin,
                  ]}
                  rehypePlugins={[rehypeRaw, rehypeSlug]}
                  components={{
                    p: ({ node, children, ...props }: any) => {
                      return <div className="mb-6 leading-[1.7] text-[#333333]" {...props}>{children}</div>;
                    },
                    a: ({ node, href, children, ...props }: any) => {
                      const isInternal = href?.startsWith('/');
                      if (isInternal) {
                        return (
                          <Link 
                            href={href} 
                            className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-md font-semibold border border-blue-100 hover:bg-blue-100 transition-colors my-1 no-underline" 
                            {...props}
                          >
                            {children}
                          </Link>
                        );
                      }
                      return <a href={href} className="text-blue-600 font-medium hover:underline" {...props}>{children}</a>;
                    },
                    div: ({ node, className, children, ...props }: any) => {
                      if (className === "custom-tip-box")
                        return <TipBox title={props["data-title"]}>{children}</TipBox>;
                      if (className === "custom-warning-box")
                        return <WarningBox title={props["data-title"]}>{children}</WarningBox>;
                      if (className === "custom-note-box")
                        return <NoteBox title={props["data-title"]}>{children}</NoteBox>;
                      if (className === "custom-step-block") {
                        return (
                          <StepBlock
                            number={props["data-number"]}
                            title={props["data-title"]}
                          >
                            {children}
                          </StepBlock>
                        );
                      }
                      if (className === "custom-cta-block") {
                        return (
                          <CTABlock
                            title={props["data-title"]}
                            link={props["data-link"]}
                            buttonText={props["data-button"]}
                          />
                        );
                      }
                      if (className === "custom-responsive-table") {
                        let headers: string[] = [];
                        let rows: any[][] = [];
                        try {
                          headers = JSON.parse(props["data-headers"] || "[]");
                          rows = JSON.parse(props["data-rows"] || "[]");
                        } catch (e) {
                          console.error("Failed to parse table data", e);
                        }
                        return <ResponsiveTable headers={headers} rows={rows} />;
                      }
                      return (
                        <div className={className} {...props}>
                          {children}
                        </div>
                      );
                    },
                    span: ({ node, className, children, ...props }: any) => {
                      if (className === "custom-tip-box")
                        return <span className="bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded-md border border-emerald-200 text-sm font-medium">{props["data-title"] ? `${props["data-title"]}: ` : ''}{children}</span>;
                      if (className === "custom-warning-box")
                        return <span className="bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md border border-amber-200 text-sm font-medium">{props["data-title"] ? `${props["data-title"]}: ` : ''}{children}</span>;
                      if (className === "custom-note-box")
                        return <span className="bg-blue-50 text-blue-900 px-2 py-0.5 rounded-md border border-blue-200 text-sm font-medium">{props["data-title"] ? `${props["data-title"]}: ` : ''}{children}</span>;
                      return (
                        <span className={className} {...props}>
                          {children}
                        </span>
                      );
                    },
                    img: ({ node, src, alt, ...props }: any) => {
                      return (
                        <figure className="my-8">
                          <img
                            src={src}
                            alt={alt}
                            className="w-full rounded-xl shadow-md"
                            {...props}
                          />
                          {alt && (
                            <figcaption className="text-center text-sm text-slate-500 mt-3">
                              {alt}
                            </figcaption>
                          )}
                        </figure>
                      );
                    },
                  }}
                >
                  {post.content}
                </Markdown>
              </div>

              <ShareButtons url={url} title={post.title} />

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

            {/* Sidebar (30%) */}
            <aside className="lg:w-[30%]">
              <div className="sticky top-28 space-y-8">
                <TableOfContents content={post.content} />

                {/* Sidebar CTA */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg shadow-slate-100/50 relative overflow-hidden hidden md:block">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Crop className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 border border-blue-100">
                      <Crop className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      Need to resize a photo?
                    </h3>
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                      Use our free online tool to compress and resize your
                      photos to exactly 20KB, 50KB, or any size required by exam
                      portals.
                    </p>
                    <Link
                      href="/20kb-photo-converter"
                      className="flex items-center justify-center w-full bg-blue-600 text-white font-semibold px-4 py-3.5 rounded-xl hover:bg-blue-700 transition-all hover:shadow-md hover:-translate-y-0.5"
                    >
                      Open Photo Converter
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="bg-slate-50 border-t border-slate-200 py-16 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block h-full"
                  >
                    <article className="bg-white rounded-2xl p-6 border border-slate-200 h-full flex flex-col transition-all duration-200 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1">
                      <p className="text-xs text-slate-500 mb-3 font-medium flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(relatedPost.date).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "short", day: "numeric" },
                        )}
                      </p>
                      <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-grow">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-blue-600 font-medium text-sm mt-auto">
                        Read article{" "}
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
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
