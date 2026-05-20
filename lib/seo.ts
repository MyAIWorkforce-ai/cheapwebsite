import type { Metadata } from 'next'

export const SITE_URL = 'https://skillzy.ai'

/**
 * Build an absolute, query-stripped canonical URL for a path.
 * Pass the pathname only (e.g. "/marketplace", "/marketplace/foo").
 * Root is "" or "/".
 */
export function canonical(path: string): string {
  const clean = path.split('?')[0].replace(/\/+$/, '')
  return clean === '' || clean === '/' ? SITE_URL : `${SITE_URL}${clean}`
}

/**
 * Standard metadata builder so every route gets a self-referencing
 * canonical plus aligned OG/Twitter without repeating boilerplate.
 */
export function pageMetadata(opts: {
  title: string
  description: string
  path: string
  keywords?: string[]
  noindex?: boolean
  ogType?: 'website' | 'article' | 'profile'
}): Metadata {
  const url = canonical(opts.path)
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: 'Skillzy',
      type: opts.ogType ?? 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
    },
    ...(opts.noindex
      ? { robots: { index: false, follow: false } }
      : {}),
  }
}
