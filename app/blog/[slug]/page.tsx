import React from "react";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import Link from "next/link";
import { Header, Footer } from "@/components/Navigation";
import { blogPosts } from "@/lib/blog";
import { EXAMS } from "@/lib/presets";
import {
  ChevronRight,
  Calendar,
  Clock,
  Crop,
  Info,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Globe,
  FileText,
  ListChecks,
  BarChart3,
  AlertCircle,
  Lightbulb,
  Brain,
  Target,
  Bell,
  Zap,
  MessageSquare,
  Link as LinkIcon,
  Megaphone,
  Sparkles,
} from "lucide-react";
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
  BlogChart,
} from "@/components/BlogComponents";

const emojiMap: Record<string, any> = {
  "📅": Calendar,
  "🌐": Globe,
  "🧾": FileText,
  "⚠️": AlertTriangle,
  "📊": BarChart3,
  "🚨": AlertCircle,
  "💡": Lightbulb,
  "🧠": Brain,
  "🎯": Target,
  "❗": Bell,
  "✨": Sparkles,
  "📢": Megaphone,
  "⚡": Zap,
  "🗣️": MessageSquare,
  "🔗": LinkIcon,
  "👉": ArrowRight,
  "✅": CheckCircle2,
  ℹ️: Info,
};

function IconHeading({ level, children }: { level: number; children: any }) {
  const extractText = (node: any): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (node && node.props && node.props.children) {
      return extractText(node.props.children);
    }
    return "";
  };

  const text = extractText(children);

  let icon = null;
  let foundEmoji = "";

  for (const [emoji, IconComp] of Object.entries(emojiMap)) {
    if (text.includes(emoji)) {
      icon = (
        <IconComp className="w-6 h-6 md:w-8 md:h-8 text-blue-600 shrink-0" />
      );
      foundEmoji = emoji;
      break;
    }
  }

  const removeEmoji = (node: any, emojiToRemove: string): any => {
    if (typeof node === "string") return node.replace(emojiToRemove, "").trim();
    if (typeof node === "number") return node;
    if (Array.isArray(node)) return node.map(n => removeEmoji(n, emojiToRemove));
    if (React.isValidElement(node)) {
      return React.cloneElement(
        node as React.ReactElement<any>,
        {},
        removeEmoji((node.props as any).children, emojiToRemove)
      );
    }
    return node;
  };

  const contentToRender = foundEmoji ? removeEmoji(children, foundEmoji) : children;

  const Tag = level === 2 ? "h2" : level === 3 ? "h3" : "h4";

  return (
    <Tag className="flex items-center gap-3 md:gap-4 group font-bold mb-8 mt-10">
      {icon}
      <span className="flex-grow">{contentToRender}</span>
    </Tag>
  );
}

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
    title: post.title,
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
    image: post.image || "https://examresize.online/logo.png",
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "ExamResize",
      url: "https://examresize.online"
    },
    publisher: {
      "@type": "Organization",
      name: "ExamResize",
      logo: {
        "@type": "ImageObject",
        url: "https://examresize.online/logo.png",
        width: 540,
        height: 120
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

  const detectedExamPreset = EXAMS.find(
    (exam) =>
      slug.includes(exam.id) || slug.includes(exam.id.replace("-2026", "")),
  );

  let detectedExam = null;
  if (detectedExamPreset) {
    let url = `/${detectedExamPreset.id}-photo-resizer`;
    if (detectedExamPreset.id === "otet-2026") {
      url = "/otet-photo-resize-2026";
    } else if (detectedExamPreset.id === "dsssb") {
      url = "/dsssb-image-optimizer";
    } else if (detectedExamPreset.id === "ssc") {
      url = "/photo-resize-for-ssc-form";
    }

    detectedExam = {
      name: detectedExamPreset.name,
      url: url,
    };
  }

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
                  <span className="hidden sm:inline-block text-slate-300 shrink-0">
                    •
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </header>

              {/* Markdown Content */}
              <div className="space-y-12">
                {post.content.split(/\n---\n/).map((section, index) => {
                  const isFinalThoughts =
                    section.toLowerCase().includes("final thoughts") ||
                    section.toLowerCase().includes("final thought");
                  const isIntro = index === 0 && !section.startsWith("#");

                  return (
                    <section
                      key={index}
                      className={`
                        ${isIntro ? "" : "bg-slate-50/50 rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm"}
                        ${isFinalThoughts ? "bg-blue-50/50 border-blue-100 !shadow-blue-100/20" : ""}
                      `}
                    >
                      <div
                        className="prose prose-slate prose-lg max-w-none break-words
                        prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-28 prose-headings:break-words
                        prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-0 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-200/60
                        prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-6
                        prose-p:text-slate-700 prose-p:leading-[1.8] prose-p:mb-6 prose-p:break-words prose-p:text-[17px]
                        prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-a:break-words
                        prose-ul:my-8 prose-ul:list-none prose-ul:pl-0
                        prose-ol:my-8 prose-ol:list-decimal prose-ol:pl-6
                        prose-li:text-slate-700 prose-li:mb-4 prose-li:leading-[1.8] prose-li:break-words prose-li:text-[17px]
                        prose-strong:text-slate-900 prose-strong:font-bold
                        prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-10 prose-img:max-w-full
                        prose-hr:hidden
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
                            h2: ({ node, children, ...props }: any) => (
                              <IconHeading level={2} {...props}>
                                {children}
                              </IconHeading>
                            ),
                            h3: ({ node, children, ...props }: any) => (
                              <IconHeading level={3} {...props}>
                                {children}
                              </IconHeading>
                            ),
                            p: ({ node, children, ...props }: any) => {
                              const text =
                                typeof children === "string" ? children : "";
                              if (text.startsWith("👉")) {
                                return (
                                  <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm mb-6 group hover:border-blue-200 transition-colors">
                                    <ArrowRight className="w-5 h-5 text-blue-600 mt-1 shrink-0 group-hover:translate-x-1 transition-transform" />
                                    <span className="text-slate-700 font-medium leading-[1.7]">
                                      {text.replace("👉", "").trim()}
                                    </span>
                                  </div>
                                );
                              }

                              const checkHasImage = (n: any): boolean => {
                                if (n?.tagName === "img") return true;
                                if (n?.children)
                                  return n.children.some(checkHasImage);
                                return false;
                              };
                              const hasImage = checkHasImage(node);

                              if (hasImage) {
                                return (
                                  <div
                                    className="mb-6 leading-[1.8] text-slate-700 text-[17px]"
                                    {...props}
                                  >
                                    {children}
                                  </div>
                                );
                              }

                              return (
                                <p
                                  className="mb-6 leading-[1.8] text-slate-700 text-[17px]"
                                  {...props}
                                >
                                  {children}
                                </p>
                              );
                            },
                            ul: ({ node, children, ...props }: any) => (
                              <ul className="space-y-4 my-8" {...props}>
                                {children}
                              </ul>
                            ),
                            li: ({ node, children, ...props }: any) => (
                              <li
                                className="flex items-start gap-3 group"
                                {...props}
                              >
                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 group-hover:scale-125 transition-transform" />
                                <span className="text-slate-700 leading-[1.8] text-[17px]">
                                  {children}
                                </span>
                              </li>
                            ),
                            a: ({ node, href, children, ...props }: any) => {
                              const isInternal = href?.startsWith("/");
                              if (isInternal) {
                                return (
                                  <Link
                                    href={href}
                                    className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-lg font-bold border border-blue-100 hover:bg-blue-100 transition-all my-1 no-underline shadow-sm hover:shadow-md"
                                    {...props}
                                  >
                                    {children}
                                    <ArrowRight className="w-4 h-4" />
                                  </Link>
                                );
                              }
                              return (
                                <a
                                  href={href}
                                  className="text-blue-600 font-bold hover:underline decoration-2 underline-offset-4"
                                  {...props}
                                >
                                  {children}
                                </a>
                              );
                            },
                            div: ({
                              node,
                              className,
                              children,
                              ...props
                            }: any) => {
                              if (className === "custom-tip-box")
                                return (
                                  <TipBox title={props["data-title"]}>
                                    {children}
                                  </TipBox>
                                );
                              if (className === "custom-warning-box")
                                return (
                                  <WarningBox title={props["data-title"]}>
                                    {children}
                                  </WarningBox>
                                );
                              if (className === "custom-note-box")
                                return (
                                  <NoteBox title={props["data-title"]}>
                                    {children}
                                  </NoteBox>
                                );
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
                                  headers = JSON.parse(
                                    props["data-headers"] || "[]",
                                  );
                                  rows = JSON.parse(props["data-rows"] || "[]");
                                } catch (e) {
                                  console.error(
                                    "Failed to parse table data",
                                    e,
                                  );
                                }
                                return (
                                  <ResponsiveTable
                                    headers={headers}
                                    rows={rows}
                                  />
                                );
                              }
                              if (className === "custom-blog-chart") {
                                let data: any[] = [];
                                try {
                                  data = JSON.parse(props["data-data"] || "[]");
                                } catch (e) {
                                  console.error("Failed to parse chart data", e);
                                }
                                return (
                                  <BlogChart
                                    type={props["data-type"] as 'bar' | 'pie'}
                                    data={data}
                                    title={props["data-title"]}
                                  />
                                );
                              }
                              return (
                                <div className={className} {...props}>
                                  {children}
                                </div>
                              );
                            },
                            span: ({
                              node,
                              className,
                              children,
                              ...props
                            }: any) => {
                              if (className === "custom-tip-box")
                                return (
                                  <span className="bg-emerald-50 text-emerald-900 px-2.5 py-1 rounded-lg border border-emerald-200 text-sm font-bold shadow-sm">
                                    {props["data-title"]
                                      ? `${props["data-title"]}: `
                                      : ""}
                                    {children}
                                  </span>
                                );
                              if (className === "custom-warning-box")
                                return (
                                  <span className="bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200 text-sm font-bold shadow-sm">
                                    {props["data-title"]
                                      ? `${props["data-title"]}: `
                                      : ""}
                                    {children}
                                  </span>
                                );
                              if (className === "custom-note-box")
                                return (
                                  <span className="bg-blue-50 text-blue-900 px-2.5 py-1 rounded-lg border border-blue-200 text-sm font-bold shadow-sm">
                                    {props["data-title"]
                                      ? `${props["data-title"]}: `
                                      : ""}
                                    {children}
                                  </span>
                                );
                              return (
                                <span className={className} {...props}>
                                  {children}
                                </span>
                              );
                            },
                            img: ({ node, src, alt, ...props }: any) => {
                              return (
                                <figure className="my-10">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={src}
                                    alt={alt}
                                    className="w-full rounded-2xl shadow-lg border border-slate-100"
                                    loading="lazy"
                                    {...props}
                                  />
                                  {alt && (
                                    <figcaption className="text-center text-sm text-slate-500 mt-4 font-medium italic">
                                      {alt}
                                    </figcaption>
                                  )}
                                </figure>
                              );
                            },
                          }}
                        >
                          {section}
                        </Markdown>
                      </div>
                    </section>
                  );
                })}
              </div>

              <ShareButtons url={url} title={post.title} />

              {/* In-Article CTA */}
              <div className="mt-16 pt-8 border-t border-slate-200">
                <CTABlock
                  title={
                    detectedExam
                      ? `Ready to apply for ${detectedExam.name}?`
                      : "Need a specific photo size for your exam?"
                  }
                  link={
                    detectedExam
                      ? detectedExam.url
                      : "/exam-photo-size-converter"
                  }
                  buttonText={
                    detectedExam
                      ? `Resize ${detectedExam.name} Photo Now`
                      : "Open Custom Photo Resizer"
                  }
                />
              </div>
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
                      {detectedExam
                        ? `Resize ${detectedExam.name} Photo`
                        : "Need to resize a photo?"}
                    </h3>
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                      {detectedExam
                        ? `Use our free online tool to compress and resize your photos to the exact dimensions and size required for ${detectedExam.name}.`
                        : "Use our free online tool to compress and resize your photos to any custom dimensions and file size required by exam portals."}
                    </p>
                    <Link
                      href={
                        detectedExam
                          ? detectedExam.url
                          : "/exam-photo-size-converter"
                      }
                      className="flex items-center justify-center w-full bg-blue-600 text-white font-semibold px-4 py-3.5 rounded-xl hover:bg-blue-700 transition-all hover:shadow-md hover:-translate-y-0.5"
                    >
                      {detectedExam
                        ? `Open ${detectedExam.name} Resizer`
                        : "Open Custom Photo Resizer"}
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
      <div className="md:hidden sticky bottom-0 w-full bg-blue-600 text-white text-center py-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
        <Link
          href={detectedExam ? detectedExam.url : "/exam-photo-size-converter"}
          className="block w-full font-bold text-lg"
        >
          {detectedExam
            ? `Resize Photo for ${detectedExam.name} →`
            : "Open Custom Photo Resizer →"}
        </Link>
      </div>
    </div>
  );
}
