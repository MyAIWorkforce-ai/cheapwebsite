---
name: site-information-architecture
description: Turn the SITE BRIEF into a sitemap, URL structure, and conversion paths. Decide what pages exist, what each page's job is, how visitors flow from entry to CTA. Set the foundation the next skills build on.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Information architecture — the sitemap before the code

## Your job

Take the SITE BRIEF + BUSINESS CONFIG and produce:

1. **A sitemap** — every page, with its purpose in one line
2. **URL structure** — what slug each page lives at
3. **Conversion paths** — the routes from entry to primary CTA
4. **Navigation plan** — header, footer, secondary nav
5. **Page hierarchy** — what's parent / child / sibling

Show all of it to the user, get sign-off, then move to scaffolding.
Don't write code in this skill. Don't write copy. Both come next.

## The sitemap — by shape

Start from the brief's shape, then customise. Defaults below.

### Landing (one-pager)

```
/
└── single scrolling page
    ├── Hero (with primary CTA)
    ├── Social proof (logos / testimonials)
    ├── Features or services
    ├── Pricing (if relevant)
    ├── FAQ
    └── Final CTA + footer

/privacy
/terms
/cookies (if banner present)
```

Use for: solo coaches, single-product launches, event pages, lead-
magnet pages.

### Marketing (3-5 pages)

```
/
├── /about
├── /services (or /work, /portfolio)
├── /contact

/blog        (optional)
/privacy
/terms
/cookies
```

Use for: consultants, freelance designers/dev, agencies, B2B service
businesses.

### Small-biz (6-10 pages)

```
/
├── /about
├── /services
│   ├── /services/[service-1]
│   ├── /services/[service-2]
│   └── /services/[service-3]
├── /service-areas        (for local trades)
│   ├── /service-areas/[suburb-1]
│   └── /service-areas/[suburb-2]
├── /gallery              (or /work, /case-studies)
├── /pricing              (if pricing is public)
├── /faq
├── /contact

/blog
/privacy
/terms
/cookies
/accessibility-statement  (if UK public sector / AU gov / Quebec)
```

Use for: local trades, dentists, accountants, real estate, restaurants,
small retail.

### Catalog (e-commerce light)

```
/
├── /shop                  (product index)
│   └── /shop/[product]    (product detail)
├── /collections
│   └── /collections/[category]
├── /cart
├── /checkout
├── /account               (if accounts)
├── /about
├── /contact

/privacy
/terms
/refund-policy
/shipping
/cookies
```

Use for: <20 products selling DTC; for larger catalogs, suggest
Shopify instead.

### Content hub / publication

```
/
├── /articles             (or /posts, /blog)
│   └── /articles/[slug]
├── /topics
│   └── /topics/[topic]
├── /authors
│   └── /authors/[name]
├── /about
├── /subscribe
├── /contact

/privacy
/terms
/cookies
```

Use for: newsletters, knowledge bases, niche publications.

### SaaS marketing

```
/
├── /product (or /features)
├── /pricing
├── /customers (or /case-studies)
├── /docs                 (link to external if separate)
├── /changelog
├── /about
├── /contact

/login                    (link to app subdomain usually)
/signup                   (link to app subdomain usually)

/blog
/privacy
/terms
/cookies
/security                 (if enterprise sales)
/dpa                      (data processing agreement — for EU/UK B2B)
```

Use for: B2B SaaS, productized services.

### Portfolio

```
/                         (gallery-first homepage)
├── /work
│   └── /work/[project]
├── /about
├── /services             (or /process)
├── /contact

/privacy
/terms
```

Use for: photographers, designers, illustrators, directors.

## URL conventions

Default rules — only deviate if the brief demands it:

- **All lowercase**. `/about-us`, never `/About-Us`.
- **Hyphens not underscores**. `/service-areas`, never `/service_areas`.
- **No file extensions**. `/about`, not `/about.html`.
- **No trailing slash** — pick one and 301-redirect the other.
  Next.js + Vercel default is no trailing slash; lock it in.
- **Short over clever**. `/about` beats `/about-us` beats
  `/the-team-behind-the-business`.
- **Stable forever**. Once a URL is shipped, it's contractual.
  Change requires a 301 redirect (skill 12 covers this).
- **English defaults**. `/about` beats `/le-about` (use `/fr/about`
  or `/fr-ca/a-propos` for proper i18n routing if bilingual).

### Bilingual URL patterns (Quebec / Switzerland / Belgium / etc.)

For sites that need French + English:

```
/                           (locale picker or detect)
/en/...                     (English routes)
/fr/...                     (French routes)
```

Or via subdomain:

```
en.example.com
fr.example.com
```

For Quebec under Bill 96, French must be predominant — French at
the apex, English on `/en/`:

```
/                           (French default)
/en/...                     (English)
```

Use `<link rel="alternate" hreflang>` to declare the language pairs
to search engines.

## Conversion paths

For each entry page, draw the path to the primary CTA. Show it as
an arrow diagram.

### Landing example

```
Visitor lands → reads hero → scrolls past proof → reads features
   → reaches pricing → primary CTA click

OR

Visitor lands → reads hero → primary CTA click (sticky in header)
```

Two paths: hero-CTA fast track + scroll-to-conviction long track.
Both need to land in the same place.

### Small-biz local trades example

```
Google "plumber Adelaide" → lands on /
   → sees H1 ("Emergency plumbing, Adelaide-wide, 24/7")
   → sees phone number in header
   → clicks phone OR clicks "Book a callout" button

OR

Google "blocked drain Norwood" → lands on /services/blocked-drains
   → sees per-service pricing band
   → clicks "Get a quote" → /contact form

OR

Google "plumber near me" → lands on /service-areas/norwood
   → sees suburb-specific copy ("On the way in 45 mins to Norwood")
   → clicks phone

OR

Google Maps listing → lands on / → primary CTA
```

The IA decides which entry pages exist. The content writing (skill
04) decides what they say.

### SaaS marketing example

```
Visitor lands on / → reads outcome-led H1 → 30 seconds on page
   → clicks "Pricing" → reads tiers → clicks "Start free trial"
   → /signup (in-app)

OR

Visitor lands on /case-studies/[client] → reads result
   → clicks "Try it for your team" → /signup
```

## Header + footer plan

### Header

For most shapes:

```
[Logo / Name]    [About] [Services] [Pricing] [Blog]    [Primary CTA button]
```

Mobile: hamburger menu with the same items + primary CTA always
visible at top.

Rules:
- **Max 5 main nav items.** More = decision paralysis.
- **Primary CTA is a button**, not a link. Higher visual weight.
- **Phone number visible** for local-trades sites — top right of
  header, click-to-call on mobile.

### Footer

Three columns typically:

```
[Business / Tagline]    [Site map nav]    [Legal + contact]
                                          - Privacy
                                          - Terms
                                          - Cookies
                                          - Accessibility (if req)
                                          - Email / phone
                        © Year  Business Name  ABN / VAT / EIN
```

For UK Ltd / LLP / PLC, the company number must appear in the
footer (Companies Act 2006 s82).

For AU `.com.au`, ABN should appear in the footer.

For Quebec-facing sites, name in French, plus the registered
business number.

## Sitemap output — show this to the user

In a fenced markdown block, render the proposed sitemap with each
page's job in one line:

```
SITEMAP — <Business name>
==========================

/                              Hero, social proof, services preview, FAQ, CTA
                               → primary CTA: <CTA>

/about                         Who we are, why we do this, trust signals
                               → secondary CTA: <CTA>

/services                      All services overview + per-service CTAs
                               → secondary CTA: <CTA>

/services/blocked-drains       Blocked drains — what we fix, price band,
                               typical timeline
                               → primary CTA: <CTA>

/services/hot-water            Hot water replacement — gas/electric/heat pump,
                               typical pricing, brand options
                               → primary CTA: <CTA>

/service-areas                 Suburbs we cover + per-suburb pages
                               → primary CTA: <CTA>

/service-areas/norwood         Norwood-specific page (local SEO play)
                               → primary CTA: <CTA>

/gallery                       Before/afters with permission
                               → secondary CTA: <CTA>

/pricing                       Callout rates, hourly, hot water bands
                               → primary CTA: <CTA>

/contact                       Phone, form, hours, service area map
                               → primary CTA: form submit

/blog                          (optional, ship empty initially)

/privacy                       Privacy policy (Privacy Act 1988 + APPs for AU)
/terms                         Terms of service
/cookies                       Cookie policy (if consent banner is live)

Header nav:  About · Services · Service Areas · Contact   [Book a callout]
Footer:      Name + ABN | Sitemap | Privacy/Terms/Cookies | © year | Phone
```

Ask: *"Look right? Want to add, remove, or rename anything?"*

Common changes the buyer will ask for:
- Add `/faq` — fine, often improves SEO
- Remove `/blog` — fine for solo founders
- Add `/portal` or `/login` — pushes the build into a different
  category; surface scope concern
- Add `/testimonials` — usually better as a section on `/about` or
  `/`; surface this
- Add `/case-studies/[slug]` — fine, plan for the first 2-3 slugs

## Local SEO sitemap patterns

For local trades or area-based businesses, the per-suburb page is
the most powerful local SEO move you can make. Pattern:

```
/service-areas
├── /service-areas/norwood
├── /service-areas/burnside
├── /service-areas/glenelg
└── /service-areas/north-adelaide
```

Each page:
- H1: `<service> in <suburb>` (e.g. "Plumber in Norwood")
- 200-400 words of genuinely suburb-specific content (not lorem
  "we serve Norwood" filler) — local landmarks, common housing
  stock, typical issues
- Per-suburb phone CTA + map
- Schema: `LocalBusiness` with `areaServed` for that suburb

Don't fake this with templated filler content. Google's local
spam detection will catch it.

## URL redirect plan

If the buyer is moving from an existing site, capture the redirect
map now. Skill 11 (launch checklist) sets it up; skill 06 (DNS)
references it.

```
OLD URL                          → NEW URL
/about-us                        → /about
/services/plumbing               → /services
/contact-us                      → /contact
/old-blog-post-slug              → /blog/new-slug
```

If the buyer doesn't know their old URLs, run `xml-sitemaps.com` or
ScreamingFrog over the old site. Or pull from Google Search Console.

## Navigation IA rules

- **The user always knows where they are.** Breadcrumbs on small-biz
  / catalog / content hub for any page > 1 level deep.
- **The user always knows where to go next.** Every page ends in a
  CTA — primary on conversion pages, secondary on trust-building
  pages (about, blog).
- **The header is the contract.** What's in the header is what the
  site is. Don't put "limited-time popup CTA" in the header.
- **The footer is the safety net.** Everything that doesn't fit
  the header.
- **Search is not navigation.** A search bar means the IA failed.
  Only add search for sites with >50 pages of content.
- **Mobile first.** Design the IA assuming mobile, expand to desktop.

## Conversion-path checks

Before sign-off, run these mental checks:

1. **Can I reach the primary CTA from every page within 1 click?**
   Header button or sticky CTA.
2. **Is the primary CTA visible above the fold on the homepage?**
   Mobile especially.
3. **Does every non-conversion page end with a CTA?** About, blog,
   gallery — all need a "next step."
4. **Is the contact path always 1-2 clicks?** Header phone or
   contact link.
5. **For local trades — is the phone number visible without
   scrolling on every page?** Sticky header on mobile.
6. **For e-commerce — is the cart icon visible from every page?**
   Sticky header.

## Hard rules

- **One primary CTA per page, max.** Multiple CTAs of equal weight
  = no CTAs.
- **No nested navigation more than 2 levels.** Three+ levels = the
  user is lost.
- **Every page has a job in one line.** If a page doesn't, cut it.
- **The IA fits in the BUSINESS CONFIG → Shape.** If the buyer
  wants a small-biz layout with 25 services, flag that as catalog
  shape instead.
- **URL slugs are forever.** Pick them once, hold to them.

## Done condition

You're done with this skill when:
- The sitemap is rendered + confirmed by the buyer
- URL slugs are locked
- Header + footer nav is locked
- Conversion paths are sketched + confirmed
- Redirect map (if migrating) is captured
- BUSINESS CONFIG `Pages:` field is updated

When done, say:
> *"IA locked. Moving to scaffold — picking the stack and bootstrapping
> the project."*

Then load `03-scaffold-build.md`.
