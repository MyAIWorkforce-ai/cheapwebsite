---
name: site-seo
description: Set up classic Google SEO (meta, sitemap, structured data, robots) AND AI-search SEO (llms.txt, AI-readable content patterns) so the site ranks in Google AND in Claude / ChatGPT / Gemini search agents.
allowed_platforms: [claude, openclaw, chatgpt]
tools: [file.write]
---

# SEO — Google + AI search

## Your job

Make the site discoverable in both classic search (Google, Bing) and
the newer agent-based search (Claude, ChatGPT, Perplexity, Gemini).
These need different signals — set both.

Pull the production URL and the SITE BRIEF from context. You'll need
them throughout.

## Part one — classic SEO

### 1. Real metadata in `app/layout.tsx`

Replace the placeholder metadata with the real thing. Build the title
+ description from the SITE BRIEF — short, specific, includes the
primary keyword and the location if local:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://<DOMAIN>'),
  title: {
    default: '<Business Name> — <one-line value prop>',
    template: '%s · <Business Name>',
  },
  description:
    '<plain-English description, ~150 chars, ends with the CTA verb>',
  alternates: { canonical: 'https://<DOMAIN>' },
  openGraph: {
    title: '<Business Name> — <value prop>',
    description: '<same description>',
    url: 'https://<DOMAIN>',
    siteName: '<Business Name>',
    type: 'website',
    locale: 'en_AU',  // adjust per brief
  },
  twitter: {
    card: 'summary_large_image',
    title: '<Business Name>',
    description: '<same description>',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}
```

Show the filled-in version to the user before writing the file.

### 2. Per-page metadata

For marketing / small-biz shapes — each `<page>/page.tsx` needs its
own `export const metadata`. Title format: `{Page} · {Business}`.

### 3. `app/sitemap.ts`

```tsx
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://<DOMAIN>'
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    // add additional pages here for marketing / small-biz shape
  ]
}
```

### 4. `app/robots.ts`

```tsx
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://<DOMAIN>/sitemap.xml',
  }
}
```

### 5. Structured data (JSON-LD)

Add this to the home page (or layout if it applies site-wide). Pick
the schema that matches:

**LocalBusiness** (for any business with a physical location):
```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: '<Business Name>',
  url: 'https://<DOMAIN>',
  telephone: '<phone>',
  address: {
    '@type': 'PostalAddress',
    addressLocality: '<city>',
    addressRegion: '<state>',
    addressCountry: '<country code>',
  },
  // areaServed: optional list of suburbs/cities
}

// In the page:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

**Service / Professional** for service businesses without a physical
shopfront — same shape, swap `LocalBusiness` for `ProfessionalService`.

### 6. Submit to Google

After deploy:
1. Open `search.google.com/search-console`
2. Add property → choose the URL prefix method → enter
   `https://<DOMAIN>/`
3. Verify via DNS TXT record (Vercel makes this easy: copy the TXT
   value, paste into Vercel → Domains → DNS records)
4. Once verified, paste the sitemap URL `https://<DOMAIN>/sitemap.xml`
   under Sitemaps

## Part two — AI-search SEO

Different from classic SEO. AI search agents (Claude, ChatGPT,
Perplexity, Gemini) fetch your site and try to summarise it. They
reward sites that:
- Have a clean, single-purpose page
- Use clear H1 / H2 hierarchy
- Have a FAQ-style structure for common questions
- Expose an `llms.txt` file that tells them what the site is about

### 1. `public/llms.txt`

A plain-text file at the site root that LLMs check first. Format:

```
# <Business Name>

> <one-sentence summary>

<Business Name> is a <type of business> based in <location>.
We help <who> with <what>.

## Services
- <service 1>: <one line>
- <service 2>: <one line>

## Contact
- Email: <email>
- Phone: <phone>
- Hours: <hours>

## Booking / CTA
<CTA URL or instructions>
```

Write this from the SITE BRIEF. Keep it under 1000 words. No
marketing fluff — facts only. This file is what AI search agents
quote when someone asks Claude *"who does plumbing in Adelaide?"*

### 2. FAQ section on the home page

If the brief allows, add a FAQ block (4–6 Q&As) covering the
questions buyers actually ask in this niche. Wrap it in
`FAQPage` structured data so Google + AI agents pick it up:

```tsx
const faqs = [
  { q: '<Question 1>', a: '<answer in 1-2 sentences>' },
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

### 3. Heading hygiene

Audit every page:
- Exactly one `<h1>`, matches the SEO title intent
- `<h2>` sections grouped logically
- Use semantic HTML (not div soup) — `<section>`, `<article>`,
  `<nav>`, `<footer>`

AI agents parse heading hierarchy to figure out what a page is for.

## Part three — deploy

Commit + push:

```bash
git add -A
git commit -m "SEO + AI-search setup"
git push
```

Vercel auto-deploys. Verify on the live URL:
- `https://<DOMAIN>/sitemap.xml` returns XML
- `https://<DOMAIN>/robots.txt` returns the robots rules
- `https://<DOMAIN>/llms.txt` returns the plain-text doc
- View-source on the home page: JSON-LD appears

## Done condition

- All four files exist + return content at the live URL
- Google Search Console property is verified and sitemap submitted
- Home page has H1 + structured data + FAQ block (if applicable)

When done, say: *"Search-ready. Next time you want a change, come
back and say *make X say Y* — I'll handle it."* and load
`06-update.md` (which is your standing-by skill from now on).
