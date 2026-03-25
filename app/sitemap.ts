import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog'
import { EXAMS } from '@/lib/presets'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://examresize.online'
  const lastModifiedDate = '2026-03-15'
  
  const staticRoutes = [
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
    '/otet-photo-resize-2026',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: lastModifiedDate,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const examRoutes = EXAMS.flatMap((exam) => [
    {
      url: `${baseUrl}/${exam.id}-photo-resizer`,
      lastModified: lastModifiedDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/${exam.id}-photo-size-guide`,
      lastModified: lastModifiedDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  ])

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...examRoutes, ...blogRoutes]
}
