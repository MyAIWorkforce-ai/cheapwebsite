---
name: site-scaffold-and-build
description: Pick the right stack (Next.js default; Astro, Webflow, WordPress as alternates), bootstrap the project, build the page skeletons from the locked sitemap, get it running locally. No final copy yet — that's skill 04.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok]
tools: [file.write, file.read, terminal]
---

# Scaffold + build

## Your job

Take the SITE BRIEF + sitemap and produce a project that builds and
runs locally. Real structure, real layout, real components — but the
final copy comes in skill 04. This skill ships the bones.

## Step 1 — pick the stack

Default is **Next.js 15 (App Router) + Tailwind CSS + TypeScript +
Vercel**. Switch only if the brief calls for it.

### When to switch from the default

| Buyer signal | Switch to | Why |
|---|---|---|
| "I want WordPress" or has plugin dependency | WordPress (Bedrock / SiteGround / WP Engine) | Plugin ecosystem |
| "I want no-code" or designer-driven | **Webflow** or **Framer** | Visual editor, faster handoff |
| Pure content site, mostly Markdown, perf-obsessed | **Astro** + Cloudflare Pages | Lightest weight, near-zero JS |
| Squarespace / Wix already chosen, won't budge | Squarespace / Wix | Buyer comfort |
| Heavy e-commerce >20 SKUs | **Shopify** | Inventory + payments + tax baked in |
| Lots of content + needs CMS but Next.js | Next.js + **Sanity** or **Contentful** or **Storyblok** | Headless CMS + framework |
| Buyer wants to avoid Vercel for cost reasons | **Cloudflare Pages** (Next.js works), **Netlify**, or self-host on **Render** / **Railway** | Long-tail traffic — Vercel Hobby is rate-limited |

If switching, surface trade-offs:
- **Webflow / Framer**: faster build, locked into platform, monthly
  fee, harder to customise
- **WordPress**: huge ecosystem, requires more maintenance (plugins,
  security), DB hosting
- **Astro**: zero-JS by default, mainly content sites; less
  interactive
- **Shopify**: e-commerce gold standard, monthly fee, harder to
  customise outside Liquid

Confirm the stack pick before scaffolding.

## Step 2 — confirm project name + locations

Ask:

- **Project folder name** — default to the slugified business name
  from BUSINESS CONFIG (e.g. `smith-plumbing`)
- **Folder location** — default `~/code/<project-name>` on Mac/Linux,
  `C:\code\<project-name>` on Windows
- **GitHub username** — for the repo

Don't proceed until those three are confirmed.

## Step 3 — scaffold (Next.js default)

Give the user this exact command to run in their terminal:

```bash
npx create-next-app@latest <project-name> \
  --typescript --tailwind --app --src-dir --import-alias "@/*" \
  --no-eslint --no-turbopack
cd <project-name>
```

Wait for "done" / "ok" before proceeding. If they hit any error
(permission, network, npm version), diagnose from the actual error
— don't loop.

### Astro alternative

```bash
npm create astro@latest <project-name>
cd <project-name>
npx astro add tailwind
```

### Webflow alternative

No terminal — open `webflow.com/dashboard` → New Site → blank
template. Skill switches to step-by-step Webflow walk-through.

### WordPress alternative (self-hosted SiteGround / Kinsta)

No local scaffold; provision via host's installer.

## Step 4 — set up the global layout

For Next.js, replace `app/layout.tsx` with:

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'PLACEHOLDER — replaced by 07-seo-onpage.md',
  description: 'PLACEHOLDER — replaced by 07-seo-onpage.md',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-AU" className={inter.variable}>
      <body className="min-h-screen antialiased font-sans flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

Adjust `lang="en-AU"` to match BUSINESS CONFIG → Language. For
bilingual, use `<html lang="en">` and per-page lang attributes.

`display: 'swap'` on the font is non-negotiable — it prevents CLS
during font load (Core Web Vitals).

## Step 5 — header + footer components

Create `src/components/Header.tsx`:

```tsx
import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-neutral-200">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {/* business name */}
        </Link>
        <div className="hidden sm:flex items-center gap-6 text-sm">
          {/* nav links from sitemap */}
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/services" className="hover:underline">Services</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link
            href="/contact"
            className="bg-neutral-900 text-white px-4 py-2 font-semibold hover:bg-neutral-700"
          >
            {/* primary CTA */}
          </Link>
        </div>
        {/* mobile hamburger — placeholder */}
      </nav>
    </header>
  )
}
```

Create `src/components/Footer.tsx`:

```tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-neutral-600">
        <div>
          <p className="font-semibold text-neutral-900">{/* business name */}</p>
          <p className="mt-2">{/* tagline */}</p>
        </div>
        <div>
          <p className="font-semibold text-neutral-900">Site</p>
          <ul className="mt-2 space-y-1">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-neutral-900">Legal</p>
          <ul className="mt-2 space-y-1">
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/cookies">Cookies</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-neutral-500 flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {/* business name */}</span>
          <span>{/* ABN / VAT / Company # */}</span>
        </div>
      </div>
    </footer>
  )
}
```

Adjust nav based on the sitemap from skill 02.

## Step 6 — page skeletons

For every page in the sitemap, create a `page.tsx` skeleton with
the right blocks. Don't write final copy — write structural
placeholders the content skill (04) will fill.

### `src/app/page.tsx` — home (landing or any shape)

```tsx
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-tight">
            {/* HERO H1 — one clear promise — filled in 04 */}
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            {/* HERO SUBHEAD — one sentence — filled in 04 */}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 font-semibold hover:bg-neutral-700"
            >
              {/* primary CTA */}
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 border border-neutral-300 px-6 py-3 font-semibold hover:bg-neutral-50"
            >
              {/* secondary CTA — optional */}
            </Link>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="px-6 py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm uppercase tracking-wide text-neutral-500">
            Trusted by
          </p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
            {/* logos OR testimonial blocks */}
          </div>
        </div>
      </section>

      {/* Features / services preview */}
      <section className="px-6 py-20" id="how-it-works">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold tracking-tight">
            {/* H2 */}
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 3-6 features / services */}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold tracking-tight">
            Frequently asked
          </h2>
          <div className="mt-10 space-y-6">
            {/* 4-6 Q&As */}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            {/* repeat the promise */}
          </h2>
          <p className="mt-4 text-neutral-600">
            {/* one supporting line */}
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex bg-neutral-900 text-white px-6 py-3 font-semibold hover:bg-neutral-700"
          >
            {/* primary CTA */}
          </Link>
        </div>
      </section>
    </>
  )
}
```

### Other pages

Create skeleton page files for every entry in the sitemap. Each
should have the H1 + subhead + content sections marked with
`{/* TODO — filled in 04 */}` comments. Use the page templates in
`templates/` as your reference shape.

```bash
# Each page:
mkdir -p src/app/about src/app/services src/app/contact src/app/pricing
touch src/app/about/page.tsx src/app/services/page.tsx \
      src/app/contact/page.tsx src/app/pricing/page.tsx

mkdir -p src/app/privacy src/app/terms src/app/cookies
touch src/app/privacy/page.tsx src/app/terms/page.tsx \
      src/app/cookies/page.tsx
```

For dynamic routes like service-areas:

```bash
mkdir -p "src/app/service-areas/[suburb]"
touch "src/app/service-areas/[suburb]/page.tsx"
touch "src/app/service-areas/page.tsx"
```

In Next.js App Router, `[suburb]` becomes the param. The page reads
the suburb from `params` and renders accordingly. The content writing
skill fills the per-suburb logic.

## Step 7 — design system primitives

Set up a small set of reusable primitives in `src/components/`:

- `Button.tsx` — primary, secondary, tertiary variants
- `Container.tsx` — `max-w-6xl mx-auto px-6` wrapper
- `Section.tsx` — `py-20` block wrapper
- `Heading.tsx` — H1/H2/H3 with consistent tracking
- `Card.tsx` — service / feature / testimonial cards

Use Tailwind tokens not arbitrary values. If brand colour is
provided, extend `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1A1A1A',  // primary
          accent: '#FF5722',   // secondary
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

## Step 8 — accessibility primitives

Bake these in from the start so skill 11 doesn't have to retrofit:

- **Semantic HTML** — `<header>`, `<nav>`, `<main>`, `<section>`,
  `<article>`, `<footer>`. Don't use `<div>` where a tag exists.
- **Heading hierarchy** — one `<h1>` per page; never skip levels.
- **Focus styles** — Tailwind's `focus:ring` on every interactive
  element; never `outline:none` without a replacement.
- **Skip link** — add to `layout.tsx`:

```tsx
<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white p-2 z-50">
  Skip to content
</a>
<main id="main">{children}</main>
```

- **Alt text discipline** — every `<Image>` has an `alt` prop. The
  content skill (04) writes them.
- **Form labels** — every input has an associated `<label>`.
- **Color contrast** — body text 4.5:1, large text 3:1 (WCAG AA).

## Step 9 — run it locally

Give the user this command:

```bash
npm run dev
```

Tell them: *"Open `http://localhost:3000` and confirm it loads.
You should see the skeleton — headers, empty hero, footer. The
copy comes in the next skill."*

If not, ask for the terminal error.

## Step 10 — commit the bones

```bash
git init
git add -A
git commit -m "Scaffold + skeleton pages"
```

Don't push yet — that's skill 05.

## Stack-specific scaffolds

### Astro

```bash
npm create astro@latest <project-name>
cd <project-name>
npx astro add tailwind
```

Astro structure:
- `src/pages/index.astro` — home
- `src/pages/about.astro`, `src/pages/services.astro`, etc.
- `src/layouts/Base.astro` — shared layout
- `src/components/` — Astro components

Same accessibility + semantic HTML rules apply.

### WordPress

- Pick a host (SiteGround for budget, Kinsta for premium, Bedrock if
  agency)
- Install WordPress core
- Pick a starter theme — recommend **Blocksy** (free, blocks-native,
  performance-friendly) or **GeneratePress** (lean, customisable)
- Avoid bloated themes (Avada, Divi, Salient) for new builds
- Install minimum plugins: **Rank Math** (SEO), **WPCode** (snippet
  insertion), **CookieYes** (consent), **WPForms Lite** (forms),
  **Smush** (image optimization)
- Page structure mirrors the sitemap; pages are WP Pages, not Posts

### Webflow

- New Site → Blank
- Set brand styles in Style Manager (primary colour, font, type
  scale)
- Build pages matching the sitemap
- Set page-level SEO (Webflow has it built in)
- Forms wire to Webflow's built-in handler or to Formspree

### Framer

- Similar to Webflow — visual editor
- Built-in SEO + analytics integration
- CMS Collections for blog-like content

## Hard rules

- **No final copy yet.** Skeleton + placeholder only. The content
  skill writes copy from BUSINESS CONFIG + brand voice. Writing
  copy in this skill leads to misaligned voice + revision loops.
- **Mobile-first CSS always.** Default styles target mobile; use
  `sm:` / `md:` / `lg:` to expand up. Never the reverse.
- **Semantic HTML always.** No `<div className="header">`. Use
  `<header>`.
- **One H1 per page.** Always.
- **Image elements always have an `alt` prop** — even if "" for
  decorative.
- **Don't add packages we don't need.** Tailwind + Inter + Next.js
  core is enough for most builds. Each added package = more
  surface area for the buyer to maintain.
- **Don't choose dark/light dual mode unless brief asks.** Default
  to light. Dark mode is a maintenance cost most small-biz sites
  don't recoup.

## Done condition

You're done with this skill when:
- The project builds + runs locally without errors
- Every page from the sitemap has a `page.tsx` (or `.astro` or
  WordPress page) skeleton
- Header + footer render with nav from the sitemap
- The user has seen `localhost:3000` in their browser
- Git is initialised + the first commit is in
- Accessibility primitives are baked in (skip link, focus styles,
  semantic tags)
- No final copy is written yet — placeholders only

When done, say:
> *"Bones up. Moving to content — writing the actual copy for every
> page based on the brand voice and BUSINESS CONFIG."*

Then load `04-content-writing.md`.
