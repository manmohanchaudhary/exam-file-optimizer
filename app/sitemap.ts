import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://examresize.online'
  const lastModifiedDate = '2026-03-15'
  
  const routes = [
    '',
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
    '/ssc-photo-resizer',
    '/rrb-photo-resizer',
    '/ibps-photo-resizer',
    '/sbi-photo-resizer',
    '/rbi-photo-resizer',
    '/upsc-photo-resizer',
    '/neet-photo-resizer',
    '/jee-photo-resizer',
    '/ssc-photo-size-guide',
    '/rrb-photo-size-guide',
    '/ibps-photo-size-guide',
    '/sbi-photo-size-guide',
    '/rbi-photo-size-guide',
    '/upsc-photo-size-guide',
    '/neet-photo-size-guide',
    '/jee-photo-size-guide',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: lastModifiedDate,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...blogRoutes]
}
