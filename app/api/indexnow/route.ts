import { NextResponse } from 'next/server';
import { EXAMS } from '@/lib/presets';
import { blogPosts } from '@/lib/blog';

const INDEXNOW_KEY = 'f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6';
const HOST = 'https://examresize.online';

export async function POST(req: Request) {
  try {
    const HOST = 'https://examresize.online';
    
    // 1. Gather all URLs (matching sitemap logic)
    const allUrlsSet = new Set<string>();

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
      '/ssb-odisha-image-resizer',
      '/compress-pdf-to-50kb',
      '/compress-pdf-to-100kb',
      '/compress-pdf-to-200kb',
      '/compress-pdf-for-exam-forms',
      '/rrb-photo-resizer',
      '/rrb-ntpc-photo-resizer',
      '/rrb-alp-photo-resizer',
      '/rrb-group-d-photo-resizer',
      '/bpsc-tre-4-0-signature-document-resizer',
    ];

    staticRoutes.forEach(route => {
      let cleanRoute = route.startsWith('/') ? route : `/${route}`;
      cleanRoute = cleanRoute.replace(/\/+/g, '/').replace(/\/$/, '');
      if (cleanRoute === '') cleanRoute = '/';
      if (route === '') cleanRoute = '';
      allUrlsSet.add(`${HOST}${cleanRoute}`);
    });

    const staticExams = [
      'ssc', 'otet-2026', 'dsssb', 'ssb-odisha', 'rrb', 'rrb-ntpc', 
      'rrb-alp', 'rrb-group-d', 'bpsc-tre-4-0-2026'
    ];

    EXAMS.forEach(exam => {
      if (!staticExams.includes(exam.id)) {
        allUrlsSet.add(`${HOST}/${exam.id}-photo-resizer`);
      }
      allUrlsSet.add(`${HOST}/${exam.id}-photo-size-guide`);
    });

    blogPosts.forEach(post => {
      allUrlsSet.add(`${HOST}/blog/${post.slug}`);
    });

    const allUrls = Array.from(allUrlsSet);

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
