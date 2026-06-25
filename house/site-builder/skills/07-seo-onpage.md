---
name: site-seo-onpage
description: Set up classic Google SEO (metadata, sitemap, robots, JSON-LD structured data, canonicals, Open Graph, Twitter cards) AND AI-search SEO (llms.txt, FAQ structure, heading hierarchy). Tune Core Web Vitals to LCP <2.5s / INP <200ms / CLS <0.1. Submit to Google Search Console + Bing Webmaster.
allowed_platforms: [claude, openclaw, chatgpt]
tools: [file.write]
---

# SEO on-page + AI search

## Your job

Make the site discoverable in classic search (Google, Bing) AND
agent-based search (Claude, ChatGPT, Perplexity, Gemini, Grok).
Different signals; set both. Then tune Core Web Vitals — Lighthouse
score 90+, LCP under 2.5s, INP under 200ms, CLS under 0.1.

Pull the production URL and the SITE BRIEF + BUSINESS CONFIG from
context. You'll need them throughout.

## Part 1 — page metadata

### Real metadata in `app/layout.tsx`

Replace the placeholder metadata. Build title + description from
the SITE BRIEF — short, specific, includes the primary keyword and
the location if local:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://<DOMAIN>'),
  title: {
    default: '<Business Name> — <one-line value prop>',
    template: '%s · <Business Name>',
  },
  description: '<plain-English, ~155 chars, ends with the CTA verb>',
  alternates: { canonical: 'https://<DOMAIN>' },
  openGraph: {
    title: '<Business Name> — <value prop>',
    description: '<same description>',
    url: 'https://<DOMAIN>',
    siteName: '<Business Name>',
    type: 'website',
    locale: 'en_AU',   // adjust per BUSINESS CONFIG Language
    images: [
      {
        url: 'https://<DOMAIN>/og.png',
        width: 1200,
        height: 630,
        alt: '<Business Name> — <one-line value prop>',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '<Business Name>',
    description: '<same description>',
    images: ['https://<DOMAIN>/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}
```

Show the filled-in version to the user before writing. Common
locale codes: `en_AU`, `en_NZ`, `en_GB`, `en_US`, `en_CA`, `fr_CA`.

### Title + description writing rules

- **Title**: 50-60 characters. Front-load the keyword + locale.
  e.g. "Plumber Adelaide — 24/7 emergency callouts · Smith Plumbing"
- **Description**: 140-160 characters. Reads like an answer, not an
  ad. e.g. "Adelaide-wide emergency plumbing. Burst pipes, blocked
  drains, no hot water — on the way within 90 minutes. Call (08)
  1234 5678."
- **Don't keyword-stuff.** Google detects it, AI agents penalise it.
- **No emoji in title.** Cluttered SERPs.
- **No date in title.** Goes stale.

### Per-page metadata

For marketing / small-biz / catalog shapes — each `<page>/page.tsx`
needs its own `export const metadata`:

```tsx
// src/app/about/page.tsx
export const metadata = {
  title: 'About — solo plumber on the south side since 2014',
  description: 'I started Smith Plumbing in 2014 after 12 years on commercial. Solo plumber, gas-ticketed, $20M insured. Carlton, Fitzroy, Brunswick.',
  alternates: { canonical: 'https://<DOMAIN>/about' },
}
```

Title template auto-appends ` · Business Name` from layout.

For dynamic routes (`/service-areas/[suburb]`):

```tsx
// src/app/service-areas/[suburb]/page.tsx
export async function generateMetadata({ params }) {
  const { suburb } = await params
  const niceName = suburb.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  return {
    title: `Plumber in ${niceName} — same-day callouts`,
    description: `Local plumber in ${niceName}. Burst pipes, blocked drains, hot water swaps. On the way within 45 mins. Call (08) 1234 5678.`,
    alternates: { canonical: `https://<DOMAIN>/service-areas/${suburb}` },
  }
}
```

## Part 2 — sitemap + robots

### `src/app/sitemap.ts`

```tsx
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://<DOMAIN>'
  const now = new Date()

  const staticPages = [
    { url: base, lastModified: now, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  // Add dynamic pages — services, suburbs, blog posts
  const services = ['hot-water-replacement', 'blocked-drains', 'burst-pipes']
  const servicePages = services.map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const suburbs = ['norwood', 'burnside', 'glenelg']
  const suburbPages = suburbs.map((slug) => ({
    url: `${base}/service-areas/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...suburbPages]
}
```

### `src/app/robots.ts`

```tsx
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Block AI scrapers if the buyer wants — usually leave open
      // { userAgent: 'GPTBot', disallow: '/' },
    ],
    sitemap: 'https://<DOMAIN>/sitemap.xml',
    host: 'https://<DOMAIN>',
  }
}
```

Decision on AI scrapers: leave them open. Blocking GPTBot, Claude-
Web, PerplexityBot etc. removes the buyer from AI search results.
Modern small-biz strategy is to be cited by AI agents.

## Part 3 — structured data (JSON-LD)

Add JSON-LD blocks per page-type. The agent picks the right schema.

### Helper component

`src/components/JsonLd.tsx`:

```tsx
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

### LocalBusiness — for businesses with a service area

```tsx
const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Plumber',   // or specific type — see list below
  '@id': 'https://<DOMAIN>/#business',
  name: '<Business Name>',
  url: 'https://<DOMAIN>',
  telephone: '<phone in international format>',
  email: '<email>',
  priceRange: '$$',
  image: 'https://<DOMAIN>/og.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '<street>',
    addressLocality: '<city>',
    addressRegion: '<state>',
    postalCode: '<postcode>',
    addressCountry: '<country code AU/NZ/GB/US/CA>',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -34.9285,
    longitude: 138.6007,
  },
  areaServed: [
    { '@type': 'City', name: 'Adelaide' },
    { '@type': 'City', name: 'Norwood' },
    { '@type': 'City', name: 'Burnside' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '17:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/...',
    'https://www.instagram.com/...',
  ],
}
```

Specific local business types from schema.org (use the most specific):
- `Plumber`, `Electrician`, `HVACBusiness`, `RoofingContractor`,
  `GeneralContractor`, `HousePainter`, `LocksmithService`
- `Dentist`, `MedicalBusiness`, `Physiotherapist`
- `AccountingService`, `LegalService`, `FinancialService`
- `RealEstateAgent`, `InsuranceAgency`
- `Restaurant`, `Cafe`, `Bakery`, `FoodEstablishment`
- `BeautySalon`, `HairSalon`, `DaySpa`
- For anything else: `LocalBusiness` or `ProfessionalService`

### ProfessionalService — for service businesses without a physical location

Same shape as LocalBusiness but `@type: 'ProfessionalService'`. Use
when the business operates from home or virtually.

### Organization — for SaaS / online business

```tsx
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '<Company name>',
  url: 'https://<DOMAIN>',
  logo: 'https://<DOMAIN>/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: '<email>',
  },
  sameAs: ['https://twitter.com/...', 'https://linkedin.com/company/...'],
}
```

### FAQPage — for any page with FAQ

```tsx
const faqs = [
  { q: 'How quickly can you get here?', a: 'Within 90 minutes for emergencies — burst pipes, sewage backing up, no hot water in winter.' },
  // ...
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}
```

This surfaces in Google's "People also ask" and powers AI answers.

### Article — for blog posts

```tsx
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '<post title>',
  image: 'https://<DOMAIN>/blog/<slug>/hero.jpg',
  datePublished: '2026-01-15',
  dateModified: '2026-01-15',
  author: {
    '@type': 'Person',
    name: '<author>',
  },
  publisher: {
    '@type': 'Organization',
    name: '<Business name>',
    logo: { '@type': 'ImageObject', url: 'https://<DOMAIN>/logo.png' },
  },
}
```

### BreadcrumbList — for deep pages

```tsx
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://<DOMAIN>' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://<DOMAIN>/services' },
    { '@type': 'ListItem', position: 3, name: 'Hot water', item: 'https://<DOMAIN>/services/hot-water' },
  ],
}
```

### Product / Service (for catalog / pricing)

```tsx
const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Hot water replacement',
  provider: { '@type': 'LocalBusiness', name: '<Business name>' },
  areaServed: { '@type': 'City', name: 'Adelaide' },
  offers: {
    '@type': 'Offer',
    priceRange: '$1800-$3400',
    priceCurrency: 'AUD',
  },
}
```

### Validate every JSON-LD

After every push, run Google's Rich Results Test on a few pages:
`search.google.com/test/rich-results`. Any errors, fix.

## Part 4 — AI search readiness

### `public/llms.txt`

A plain-text file at the site root that LLM-based search agents
check first. Format:

```
# <Business Name>

> <one-sentence summary that an AI would quote when asked about you>

<Business Name> is a <type of business> based in <location>.
We help <who> with <what>.

## Services

- <Service 1>: <one line, ~100 chars>
- <Service 2>: <one line>
- <Service 3>: <one line>

## Service area

<list suburbs / regions covered>

## Contact

- Email: <email>
- Phone: <phone>
- Hours: <hours, plain text>

## Pricing

<one or two lines on pricing structure — actual numbers if public>

## About

<2-3 sentences — founders, years, distinguishing fact>

## License + Insurance (if trades / professional)

<licence numbers, insurance, region-relevant>

## Booking / CTA

<CTA URL>
```

Write this from BUSINESS CONFIG. Keep under 1000 words. Facts only.
No marketing fluff.

This is what AI agents quote when someone asks Claude *"who does
plumbing in Adelaide?"* — Claude reads `llms.txt` and summarises
from it.

### `public/llms-full.txt` (optional)

A longer version with full page content. Useful for content-heavy
sites — Claude/Perplexity can quote specific paragraphs.

### Heading hygiene

Audit every page:

- Exactly one `<h1>` per page — matches the SEO title intent
- `<h2>` sections grouped logically (don't skip from h1 to h3)
- Use semantic HTML — `<section>`, `<article>`, `<nav>`, `<footer>`,
  not `<div>` soup

AI agents parse heading hierarchy to figure out what a page is for.

### FAQ structure on key pages

If a page has Q&A content, mark it up with `FAQPage` schema. AI
agents quote FAQ answers heavily — they're the unit AI is happiest
to surface.

### Conversational answer formats

LLMs reward content patterns that look like answers:

- TL;DR at the top of long posts
- "What is X?" headings with direct definitions
- Pricing in a table, not a paragraph
- Step lists with numbered steps
- Comparison tables for "X vs Y" content

Don't over-engineer this. Write like you're answering a customer.

## Part 5 — Open Graph image

Create `public/og.png` — 1200×630, the brand-correct hero with
business name + value prop.

Options:
- **Manual design** in Figma / Canva — best quality
- **Auto-generated** via Next.js OG image generation — sane default

For auto-generated:

`src/app/api/og/route.tsx`:

```tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div style={{
        background: 'white',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 80,
      }}>
        <h1 style={{ fontSize: 96, color: '#1A1A1A' }}>
          <Business Name>
        </h1>
        <p style={{ fontSize: 36, color: '#666' }}>
          <one-line value prop>
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

Then reference `https://<DOMAIN>/api/og` in `openGraph.images` and
`twitter.images`.

Test with `metatags.io` after deploy.

## Part 6 — Core Web Vitals

Targets:
- **LCP** (Largest Contentful Paint): under 2.5s
- **INP** (Interaction to Next Paint): under 200ms
- **CLS** (Cumulative Layout Shift): under 0.1
- **Lighthouse Performance score**: 90+

### Common LCP fixes

- **Hero image dimensions** set via `next/image` `width` and
  `height` props (prevents CLS while loading)
- **Hero image priority**: `<Image priority />` on the LCP
  candidate — preloads it
- **Font display swap**: `display: 'swap'` on `next/font` (already
  in skill 03 scaffold)
- **No render-blocking JS** above the fold — defer or lazy-load
  non-critical scripts
- **Use `next/image`** for every image — auto WebP, auto-resize, lazy
  off-screen

### Common INP fixes

- **No long-running JS on mount** — defer to `requestIdleCallback`
- **Use `<Suspense>` for slow components**
- **Audit third-party scripts** (analytics, chat widgets) — these
  often trash INP

### Common CLS fixes

- **All images have width + height** props
- **Reserve space for above-fold ads / embeds** with `min-height`
- **Don't inject content above visible content** (popups, banners
  loading in)

### Image discipline

Every image:

```tsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="<descriptive alt — required>"
  width={1600}
  height={900}
  priority   // only for LCP candidates above the fold
  className="..."
/>
```

For images from a CMS or remote URL, configure `next.config.js`:

```js
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
}
```

### Font discipline

One sans + maximum one display font. Both loaded via `next/font`:

```tsx
import { Inter, Fraunces } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const fraunces = Fraunces({ subsets: ['latin'], display: 'swap', variable: '--font-display' })
```

Avoid:
- More than 2 font families
- More than 4 weights total
- Self-hosted font CSS without `font-display: swap`

### Measuring

After deploy, run:

1. **PageSpeed Insights**: `pagespeed.web.dev` — gives field +
   lab data
2. **WebPageTest**: `webpagetest.org` — deeper waterfall analysis
3. **Lighthouse in DevTools**: Chrome → DevTools → Lighthouse
4. **CrUX** real-user data from Search Console (after 28 days)

Fix any "Failing" CWV. Re-test after every push.

## Part 7 — submit to search engines

### Google Search Console

1. Open `search.google.com/search-console`
2. **Add property** → choose URL prefix → enter
   `https://<DOMAIN>/`
3. Verify via DNS TXT record (registrar UI from skill 06) OR via
   Google Analytics (if GA4 is set up) OR via HTML tag in
   `app/layout.tsx`
4. Once verified, **Sitemaps** → paste
   `https://<DOMAIN>/sitemap.xml` → Submit
5. **URL Inspection** → enter the homepage → Request indexing
6. Repeat URL inspection for key pages (services, contact)

Coverage report should populate over 1-2 weeks.

### Bing Webmaster Tools

1. Open `www.bing.com/webmasters`
2. Add the site (you can import from Google Search Console if
   that's verified)
3. Submit the sitemap
4. Bing serves Yahoo + Duck Duck Go + ChatGPT search results too,
   so this is worth doing

### IndexNow (for fast indexing)

For sites that update often (blog, news), set up IndexNow — pings
Bing + Yandex within minutes of a new post:

`public/<key>.txt` — a verification file
Then ping the IndexNow endpoint when content changes.

Skip for static small-biz sites; useful for content hubs.

## Part 8 — local SEO (if applicable)

### Google Business Profile

For local trades / restaurants / clinics:

1. `business.google.com` → Create profile
2. Fill: name, category, address, service area, phone, hours,
   photos
3. Add link to website
4. Verify (post card from Google or video)
5. Post weekly updates

Tie the website to GBP:
- Same NAP (Name, Address, Phone) on website + GBP — exactly the
  same wording
- `LocalBusiness` JSON-LD on the website (above)
- Link to GBP in `sameAs` of JSON-LD

### Bing Places

Same workflow, fewer features.

### Apple Business Connect

For visibility in Apple Maps:
`businessconnect.apple.com` → free, walk through onboarding.

### Local directories

For trades especially — list on:
- AU: Yellow Pages AU, Hi Pages, Service Seeking
- NZ: Yellow NZ, Builderscrack, Trade Me Services
- UK: Yell, Checkatrade, TrustATrader, MyBuilder
- US: Yelp, Angi (was Angie's List), Thumbtack, HomeAdvisor,
  Houzz, BBB
- CA: HomeStars, Yelp, BBB

NAP consistency across all directories is more important than the
count of directories.

## Part 9 — deploy + verify

Commit + push:

```bash
git add -A
git commit -m "SEO + AI-search setup"
git push
```

Vercel auto-deploys. Verify on the live URL:

- `https://<DOMAIN>/sitemap.xml` → returns XML
- `https://<DOMAIN>/robots.txt` → returns robots rules
- `https://<DOMAIN>/llms.txt` → returns plain-text doc
- View-source on home page: JSON-LD blocks appear
- `search.google.com/test/rich-results` on home page → no errors
- `metatags.io/?url=<DOMAIN>` → OG + Twitter previews render
- Lighthouse score on home page (incognito Chrome) → 90+

## Hard rules

- **One H1 per page.** Always.
- **Don't keyword-stuff.** AI search penalises it; Google's
  semantic search makes it pointless.
- **Don't fake JSON-LD.** Schema.org validation catches it; Google
  ignores or penalises bogus structured data.
- **Don't block AI scrapers** unless the buyer specifically asks.
  Modern SEO includes being cited by AI.
- **Image alt text is mandatory.** Decorative images use `alt=""`;
  every other image gets descriptive alt.
- **No duplicate canonical URLs.** Each page has exactly one
  canonical pointing to itself.
- **No broken internal links.** Run `linkinator <DOMAIN>` after
  every deploy.
- **Reasonable load time.** If Lighthouse is below 80, debug.

## Done condition

You're done with this skill when:
- Every page has unique, real metadata
- `sitemap.xml`, `robots.txt`, `llms.txt` all return at the live
  URL
- JSON-LD validates on Rich Results Test for home + 2-3 key pages
- OG / Twitter card previews render correctly
- Google Search Console verified + sitemap submitted
- Bing Webmaster verified + sitemap submitted
- Lighthouse Performance score 90+ on home page
- LCP <2.5s, INP <200ms, CLS <0.1 in lab tests
- Local SEO set up (if local business)

When done, say:
> *"Search-ready. Moving to analytics + tracking — so we can see
> what's working."*

Then load `08-analytics-tracking.md`.
