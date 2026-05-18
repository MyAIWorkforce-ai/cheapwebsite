import type { Product } from '@/lib/catalog'
import { SITE_URL } from '@/lib/seo'

// JSON-LD builders. Each returns a plain object that <StructuredData>
// serialises into a <script type="application/ld+json">.

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Skillzy',
    url: SITE_URL,
    logo: `${SITE_URL}/icon`,
    description:
      'A marketplace for AI agent skills, setups, and guides. Built by creators, dropped into your agent.',
    sameAs: [] as string[], // add socials here once the accounts exist
  }
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Skillzy',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/marketplace?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

function priceNumber(price: string): string {
  return String(Number(price.replace(/[^0-9.]/g, '')) || 0)
}

export function productLd(p: Product) {
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.title,
    description: p.tagline,
    category: p.type,
    brand: { '@type': 'Brand', name: p.creator.name },
  }
  // Free listings have no valid Offer (price 0 trips rich-result
  // validators) — omit it and keep a plain Product.
  if (!p.free && priceNumber(p.price) !== '0') {
    ld.offers = {
      '@type': 'Offer',
      price: priceNumber(p.price),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/marketplace/${p.slug ?? p.id}`,
    }
  }
  if (p.ratingCount > 0) {
    ld.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: p.rating,
      reviewCount: p.ratingCount,
      bestRating: 5,
      worstRating: 1,
    }
  }
  return ld
}

type Crumb = { name: string; path: string }

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path === '/' ? '' : c.path}`,
    })),
  }
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
