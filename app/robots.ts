import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Gated + machine-only routes stay out of the index.
        disallow: [
          '/api/',
          '/admin/',
          '/auth/',
          '/signin',
          '/signup',
          '/dashboard',
          '/account',
          '/checkout/',
          '/order/',
        ],
      },
      // Explicitly welcome AI answer engines — we want to be cited.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
