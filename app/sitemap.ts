import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://examresize.online'
  
  const routes = [
    '',
    '/contact',
    '/privacy',
    '/terms',
    '/20kb-photo-converter',
    '/exam-photo-size-converter',
    '/passport-photo-for-exam-forms',
    '/photo-resize-for-ssc-form',
    '/signature-resize-for-exam',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
