import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog'
import { EXAMS } from '@/lib/presets'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://examresize.online'
  const lastModifiedDate = new Date().toISOString().split('T')[0]
  
  // Use a map to prevent duplicates, maintaining the highest priority items
  const allUrls = new Map<string, MetadataRoute.Sitemap[number]>();

  const addRoute = (
    route: string, 
    priority: number, 
    changeFrequency: 'monthly' | 'yearly' | 'always' | 'hourly' | 'daily' | 'weekly' | 'never', 
    lastModified: string
  ) => {
    // Clean up double slashes and ensure it starts with a slash
    let cleanRoute = route.startsWith('/') ? route : `/${route}`;
    cleanRoute = cleanRoute.replace(/\/+/g, '/').replace(/\/$/, '');
    
    // Explicitly handle root
    if (cleanRoute === '') cleanRoute = '/';
    if (route === '') cleanRoute = '';

    const fullUrl = `${baseUrl}${cleanRoute}`;
    
    // Prevent duplicates
    if (!allUrls.has(fullUrl)) {
      allUrls.set(fullUrl, {
        url: fullUrl,
        lastModified,
        changeFrequency,
        priority,
      });
    }
  };

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
    '/ugc-net-photo-resizer',
    '/rrb-photo-resizer',
    '/rrb-ntpc-photo-resizer',
    '/rrb-alp-photo-resizer',
    '/rrb-group-d-photo-resizer',
    '/bpsc-tre-4-0-signature-document-resizer',
  ];

  staticRoutes.forEach(route => {
    addRoute(route, route === '' ? 1 : 0.8, 'monthly', lastModifiedDate);
  });

  EXAMS.forEach((exam) => {
    // Exclude static destinations
    const staticExams = [
      'ssc', 'otet-2026', 'dsssb', 'ssb-odisha', 'rrb', 'rrb-ntpc', 
      'rrb-alp', 'rrb-group-d', 'bpsc-tre-4-0-2026'
    ];
    
    if (!staticExams.includes(exam.id)) {
      addRoute(`/${exam.id}-photo-resizer`, 0.9, 'monthly', lastModifiedDate);
    }

    // Always add the guide route
    addRoute(`/${exam.id}-photo-size-guide`, 0.8, 'monthly', lastModifiedDate);
  });

  blogPosts.forEach((post) => {
    addRoute(`/blog/${post.slug}`, 0.7, 'monthly', post.date || lastModifiedDate);
  });

  return Array.from(allUrls.values());
}
