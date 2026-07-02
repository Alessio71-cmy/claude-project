import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

const routes = [
  '',
  '/servizi',
  '/servizi/connettivita-avanzata',
  '/servizi/voip',
  '/servizi/iot',
  '/servizi/core-network',
  '/servizi/soluzioni-wireless',
  '/about/identita',
  '/about/case-study',
  '/cyberalps',
  '/agent-ai',
  '/contatti',
  '/privacy',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/contatti' ? 0.9 : 0.7,
  }))
}
