import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog'
import { EXAMS } from '@/lib/presets'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://examresize.online'
  const lastModifiedDate = new Date().toISOString().split('T')[0]
  
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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: lastModifiedDate,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const examRoutes = EXAMS.flatMap((exam) => {
    const routes = [];
    
    // Only add dynamic resizer route if it doesn't have a static equivalent
    if (exam.id !== 'ssc' && exam.id !== 'otet-2026' && exam.id !== 'dsssb' && exam.id !== 'ssb-odisha') {
      routes.push({
        url: `${baseUrl}/${exam.id}-photo-resizer`,
        lastModified: lastModifiedDate,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      });
    }

    // Always add the guide route
    routes.push({
      url: `${baseUrl}/${exam.id}-photo-size-guide`,
      lastModified: lastModifiedDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    });

    return routes;
  })

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...examRoutes, ...blogRoutes]
}
