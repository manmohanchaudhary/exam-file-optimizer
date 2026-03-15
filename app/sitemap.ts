import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://examresize.online'
  const lastModifiedDate = '2026-03-15'
  
  const routes = [
    '',
    '/faq',
    '/contact',
    '/privacy',
    '/terms',
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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: lastModifiedDate,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
