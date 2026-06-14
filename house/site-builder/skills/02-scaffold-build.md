---
name: site-scaffold-and-build
description: Take the discovery brief and produce a working Next.js project with real content (not lorem ipsum) — landing, marketing, or small-biz shape.
allowed_platforms: [claude, openclaw, chatgpt]
tools: [file.write, file.read, terminal]
---

# Scaffold + build

## Your job

Turn the SITE BRIEF into a working Next.js + Tailwind project on the
user's machine. Real copy, real structure, ready to commit.

## Approach

Always Next.js App Router + Tailwind CSS. It's deploy-friendliest
on Vercel and has the best AI-readable HTML output for SEO.

Three project shapes — pick from the brief:

| Brief.Shape | Pages |
|---|---|
| landing | `/` |
| marketing | `/`, `/about`, `/services`, `/contact` |
| small-biz | `/`, `/about`, `/services`, `/gallery`, `/contact` |

## Steps

### 1. Confirm project name

Ask the user for a project folder name (default to the slugified
business name from the brief, e.g. `acme-plumbing`).

### 2. Scaffold the project

Give the user this exact command to run in their terminal:

```bash
npx create-next-app@latest <project-name> \
  --typescript --tailwind --app --src-dir --import-alias "@/*" \
  --no-eslint --no-turbopack
cd <project-name>
```

Wait for "done" / "ok" before proceeding.

### 3. Generate `app/layout.tsx`

Replace the default with this shape — keep the `<Metadata>` placeholder
strings, the SEO skill fills them in later:

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PLACEHOLDER — replaced by 05-seo.md',
  description: 'PLACEHOLDER — replaced by 05-seo.md',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
```

### 4. Write the actual page content

Don't use placeholder/lorem text. Write copy that matches the brief —
the Who, the Tone, and the CTA. Short paragraphs. One H1 per page.

Use this skeleton for `app/page.tsx` (landing) — adapt for marketing
or small-biz shapes:

```tsx
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b border-neutral-200">
        <nav className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="font-semibold">{/* business name */}</span>
          <Link
            href="#cta"
            className="bg-neutral-900 text-white px-4 py-2 text-sm font-semibold hover:bg-neutral-700"
          >
            {/* CTA label */}
          </Link>
        </nav>
      </header>

      <section className="flex-1 flex items-center px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight leading-tight">
            {/* H1 — one clear promise */}
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            {/* subhead — one sentence */}
          </p>
          <div id="cta" className="mt-10">
            <a
              href={/* tel:, mailto:, or contact link */}
              className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 font-semibold hover:bg-neutral-700"
            >
              {/* CTA label */} →
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200 px-6 py-8 text-sm text-neutral-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} {/* business name */}</span>
          <span>{/* contact line */}</span>
        </div>
      </footer>
    </main>
  )
}
```

For marketing / small-biz shapes, create the additional pages in
`app/<page>/page.tsx`. Add a shared header component in
`app/_components/Header.tsx` if there are multiple pages.

### 5. Write the copy

Write actual content based on the SITE BRIEF. Rules:
- H1 makes one clear promise specific to the niche
- Subhead in plain English (no buzzwords)
- CTA verb-first ("Book now" not "Click here")
- Body copy in short paragraphs (max 3 lines each)
- Match the brief's Tone

Show every page's content to the user as fenced code blocks before
writing the files. Let them edit anything before save.

### 6. Run it locally

Give the user this command:

```bash
npm run dev
```

Tell them to open `http://localhost:3000` and confirm it loads. If
not, ask for the terminal error.

## Done condition

You're done when:
- The project builds + runs locally without errors
- The user has seen the page in their browser and approved the copy
- You've shown them `git status` so they understand the project is
  ready to commit

When done, say: *"Site builds locally. Moving to deploy."* and load
`03-deploy-vercel.md`.
