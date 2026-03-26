import { NextResponse } from 'next/server';
import { EXAMS } from '@/lib/presets';
import { blogPosts } from '@/lib/blog';

const INDEXNOW_KEY = 'f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6';
const HOST = 'https://examresize.online';

export async function POST(req: Request) {
  try {
    // 1. Gather all URLs (matching sitemap logic)
    const staticRoutes = [
      '',
      '/about',
      '/faq',
      '/contact',
      '/privacy',
      '/terms',
      '/blog',
      '/20kb-photo-converter',
      '/exam-photo-size-converter',
      '/passport-photo-for-exam-forms',
      '/photo-resize-for-ssc-form',
      '/signature-resize-for-exam',
      '/otet-photo-resize-2026',
      '/document-compressor',
      '/dsssb-image-optimizer',
    ].map(route => `${HOST}${route}`);

    const examRoutes = EXAMS.flatMap(exam => {
      const routes = [];
      if (exam.id !== 'ssc' && exam.id !== 'otet-2026' && exam.id !== 'dsssb') {
        routes.push(`${HOST}/${exam.id}-photo-resizer`);
      }
      routes.push(`${HOST}/${exam.id}-photo-size-guide`);
      return routes;
    });

    const blogRoutes = blogPosts.map(post => `${HOST}/blog/${post.slug}`);

    const allUrls = [...staticRoutes, ...examRoutes, ...blogRoutes];

    // 2. Submit to IndexNow (Bing is the main endpoint, it shares with others)
    const response = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: 'examresize.online',
        key: INDEXNOW_KEY,
        keyLocation: `${HOST}/${INDEXNOW_KEY}.txt`,
        urlList: allUrls,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `IndexNow submission failed: ${errorText}` }, { status: response.status });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully submitted ${allUrls.length} URLs to IndexNow.`,
      urlsSubmitted: allUrls.length 
    });
  } catch (error) {
    console.error('IndexNow Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
