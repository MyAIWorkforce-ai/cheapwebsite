import type { MetadataRoute } from 'next'
import { products, allCreatorHandles } from '@/lib/catalog'
import { getAllNiches, getAllPlatforms, COMBO_PAGES } from '@/lib/content'
import { getAllPosts } from '@/lib/blog'
import { SITE_URL } from '@/lib/seo'

// Canonical host is the apex (https://skillzy.ai), matching every
// route's self-referencing canonical. www.skillzy.ai must 301 → apex
// at the Vercel domain layer (config task, not code).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}`,             changeFrequency: 'daily',   priority: 1.0, lastModified },
    { url: `${base}/marketplace`, changeFrequency: 'daily',   priority: 0.9, lastModified },
    { url: `${base}/sell`,        changeFrequency: 'weekly',  priority: 0.7, lastModified },
    { url: `${base}/about`,       changeFrequency: 'monthly', priority: 0.5, lastModified },
    { url: `${base}/how-it-works`, changeFrequency: 'monthly', priority: 0.6, lastModified },
    { url: `${base}/blog`,        changeFrequency: 'weekly',  priority: 0.7, lastModified },
    { url: `${base}/dispatch`,    changeFrequency: 'daily',   priority: 0.6, lastModified },
    { url: `${base}/help`,        changeFrequency: 'monthly', priority: 0.5, lastModified },
    { url: `${base}/contact`,     changeFrequency: 'monthly', priority: 0.4, lastModified },
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

  const nicheRoutes: MetadataRoute.Sitemap = getAllNiches().map((n) => ({
    url: `${base}/for/${n.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
    lastModified,
  }))

  const platformRoutes: MetadataRoute.Sitemap = getAllPlatforms().map((p) => ({
    url: `${base}/platforms/${p.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
    lastModified,
  }))

  const comboRoutes: MetadataRoute.Sitemap = COMBO_PAGES.map((c) => ({
    url: `${base}/for/${c.niche}/${c.platform}`,
    changeFrequency: 'weekly',
    priority: 0.6,
    lastModified,
  }))

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
    lastModified: new Date(p.updatedAt),
  }))

  return [
    ...staticRoutes,
    ...listingRoutes,
    ...creatorRoutes,
    ...nicheRoutes,
    ...platformRoutes,
    ...comboRoutes,
    ...blogRoutes,
  ]
}
