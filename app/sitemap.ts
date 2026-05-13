import type { MetadataRoute } from 'next'
import { products, allCreatorHandles } from '@/lib/catalog'
import { env } from '@/lib/env'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.siteUrl.replace(/\/$/, '')
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`,            changeFrequency: 'daily',   priority: 1.0, lastModified },
    { url: `${base}/marketplace`, changeFrequency: 'daily',   priority: 0.9, lastModified },
    { url: `${base}/sell`,        changeFrequency: 'weekly',  priority: 0.7, lastModified },
    { url: `${base}/sell/new`,    changeFrequency: 'monthly', priority: 0.5, lastModified },
    { url: `${base}/about`,       changeFrequency: 'monthly', priority: 0.4, lastModified },
    { url: `${base}/contact`,     changeFrequency: 'monthly', priority: 0.4, lastModified },
    { url: `${base}/signin`,      changeFrequency: 'yearly',  priority: 0.2, lastModified },
    { url: `${base}/signup`,      changeFrequency: 'yearly',  priority: 0.3, lastModified },
    { url: `${base}/terms`,       changeFrequency: 'yearly',  priority: 0.2, lastModified },
    { url: `${base}/privacy`,     changeFrequency: 'yearly',  priority: 0.2, lastModified },
  ]

  const listingRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/marketplace/${p.id}`,
    changeFrequency: 'weekly',
    priority: 0.8,
    lastModified,
  }))

  const creatorRoutes: MetadataRoute.Sitemap = allCreatorHandles().map((h) => ({
    url: `${base}/creator/${encodeURIComponent(h)}`,
    changeFrequency: 'weekly',
    priority: 0.6,
    lastModified,
  }))

  return [...staticRoutes, ...listingRoutes, ...creatorRoutes]
}
