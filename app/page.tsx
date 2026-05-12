import Link from 'next/link'
import Logo from '@/components/Logo'
import ProductCard, { type Product } from '@/components/ProductCard'

const agentSetups: Product[] = [
  {
    id: 'real-estate-agent-setup',
    type: 'Agent Setup',
    title: 'Real Estate, end to end.',
    creator: 'Harlow Realty Tools',
    platform: 'Claude · n8n',
    rating: 4.9,
    ratingCount: 218,
    price: '$249',
    number: '№01',
  },
  {
    id: 'bookkeeper-agent-setup',
    type: 'Agent Setup',
    title: 'Bookkeeper & BAS.',
    creator: 'Ledgerlab',
    platform: 'Claude',
    rating: 4.8,
    ratingCount: 142,
    price: '$199',
    number: '№02',
  },
  {
    id: 'tradie-agent-setup',
    type: 'Agent Setup',
    title: 'On-site Tradie Ops.',
    creator: 'Sitebench',
    platform: 'Claude · Make',
    rating: 4.9,
    ratingCount: 96,
    price: '$179',
    number: '№03',
  },
]

const skills: Product[] = [
  {
    id: 'daily-summary-email',
    type: 'Skill',
    title: 'Daily Summary Email',
    creator: 'Jonas Krüger',
    platform: 'Claude',
    rating: 4.8,
    ratingCount: 412,
    price: '$12',
  },
  {
    id: 'invoice-generator',
    type: 'Skill',
    title: 'Invoice Generator',
    creator: 'paperless.io',
    platform: 'Claude · n8n',
    rating: 4.9,
    ratingCount: 524,
    price: '$15',
  },
  {
    id: 'website-scraper',
    type: 'Skill',
    title: 'Website Scraper',
    creator: 'datajedi',
    platform: 'OpenClaw',
    rating: 4.6,
    ratingCount: 188,
    price: '$19',
  },
  {
    id: 'review-responder',
    type: 'Skill',
    title: 'Review Responder',
    creator: 'Kai Mendoza',
    platform: 'Claude',
    rating: 4.7,
    ratingCount: 233,
    price: '$9',
  },
]

const guides: Product[] = [
  {
    id: 'wire-claude-and-n8n',
    type: 'Guide',
    title: 'Wire Claude into n8n in a weekend.',
    creator: 'Mira Sato',
    platform: 'Claude · n8n',
    rating: 4.9,
    ratingCount: 178,
    price: '$14',
  },
  {
    id: 'first-skill-md',
    type: 'Guide',
    title: 'Your first SKILL.md, the right way.',
    creator: 'agentschool',
    platform: 'All platforms',
    rating: 4.8,
    ratingCount: 402,
    price: '$9',
  },
  {
    id: 'agent-prompt-patterns',
    type: 'Guide',
    title: 'Patterns for prompts that hold up.',
    creator: 'promptforge',
    platform: 'All platforms',
    rating: 4.9,
    ratingCount: 612,
    price: '$24',
  },
]

const niches = [
  { name: 'Real Estate', slug: 'real-estate', count: 24 },
  { name: 'Accountants', slug: 'accountants', count: 18 },
  { name: 'Builders & Trades', slug: 'builders', count: 21 },
  { name: 'E-commerce', slug: 'ecommerce', count: 33 },
  { name: 'Coaches', slug: 'coaches', count: 12 },
  { name: 'Lawyers', slug: 'lawyers', count: 9 },
  { name: 'Marketing', slug: 'marketing', count: 27 },
  { name: 'Hospitality', slug: 'hospitality', count: 11 },
]

const platforms = ['Claude', 'OpenClaw', 'n8n', 'Make', 'Zapier', 'Ollama', 'Grok', 'Gemini']

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="label-cap text-brand-emerald">{children}</span>
  )
}

export default function HomePage() {
  return (
    <div className="paper">
      {/* Top mark — replaces the nav. Identity only. */}
      <div className="max-w-page mx-auto px-6 lg:px-10 pt-7 sm:pt-10 flex items-center justify-between">
        <Logo size="md" />
        <span className="label-cap text-brand-muted hidden sm:block">
          Est. MMXXVI &nbsp;·&nbsp; Vol. I
        </span>
      </div>

      {/* HERO — asymmetric editorial */}
      <section className="px-6 lg:px-10 pt-16 sm:pt-28 pb-20 sm:pb-32">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <SectionLabel>№00 &nbsp;·&nbsp; The Marketplace</SectionLabel>
            <h1
              className="font-display mt-6 text-[3.25rem] sm:text-[5rem] lg:text-[7rem] leading-[0.94] tracking-tight text-brand-ink"
              style={{ letterSpacing: '-0.03em' }}
            >
              Give your agent{' '}
              <em className="italic text-brand-emerald font-medium">skills.</em>
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pb-3">
            <p className="text-lg leading-relaxed text-brand-ink max-w-md">
              A catalogue of skills, guides, and ready-to-go agent setups —
              built by humans, dropped into your agent. No tutorials. No
              assembly.
            </p>

            <div className="mt-8 flex items-center gap-5">
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 bg-brand-emerald text-brand-cream font-medium px-7 py-4 text-[15px] hover:bg-brand-emerald-deep transition-colors"
              >
                Browse the catalogue
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/sell"
                className="text-sm text-brand-ink hover:text-brand-emerald transition-colors border-b border-brand-ink hover:border-brand-emerald pb-0.5"
              >
                Or sell yours
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Compatible-with strip — tiny editorial */}
      <section className="border-y border-brand-hairline">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-5 flex flex-wrap items-center gap-x-8 gap-y-2">
          <span className="label-cap text-brand-muted">Compatible with</span>
          {platforms.map((p, i) => (
            <span
              key={p}
              className={
                'text-sm ' +
                (i === 0 ? 'text-brand-ink' : 'text-brand-muted')
              }
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* №01 — Agent Setups, the headliner */}
      <section className="px-6 lg:px-10 py-20 sm:py-28">
        <div className="max-w-page mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 sm:mb-16 items-end">
            <div className="lg:col-span-7">
              <SectionLabel>№01 &nbsp;·&nbsp; Agent Setups</SectionLabel>
              <h2
                className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                Plug in. <em className="italic text-brand-emerald font-medium">Press go.</em>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="text-brand-muted max-w-md">
                A complete agent for a single line of work — skills, prompts,
                integrations, and a setup guide. One purchase. One upload.
              </p>
              <Link
                href="/marketplace?type=agent-setup"
                className="mt-4 inline-block text-sm text-brand-ink border-b border-brand-ink pb-0.5 hover:text-brand-emerald hover:border-brand-emerald transition-colors"
              >
                See all setups →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
            {agentSetups.map((p, i) => (
              <ProductCard key={p.id} product={p} variant={i === 1 ? 'emerald' : 'cream'} />
            ))}
          </div>
        </div>
      </section>

      {/* №02 — Skills, list-style */}
      <section className="px-6 lg:px-10 py-20 sm:py-28 border-t border-brand-hairline">
        <div className="max-w-page mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 sm:mb-16 items-end">
            <div className="lg:col-span-7">
              <SectionLabel>№02 &nbsp;·&nbsp; Skills</SectionLabel>
              <h2
                className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                One job. <em className="italic text-brand-emerald font-medium">Done well.</em>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="text-brand-muted max-w-md">
                Single-purpose SKILL.md files. Send the email. Generate the
                invoice. Scrape the page. Drop it in, move on.
              </p>
              <Link
                href="/marketplace?type=skill"
                className="mt-4 inline-block text-sm text-brand-ink border-b border-brand-ink pb-0.5 hover:text-brand-emerald hover:border-brand-emerald transition-colors"
              >
                See all skills →
              </Link>
            </div>
          </div>

          {/* Editorial list */}
          <ol className="divide-y divide-brand-hairline border-y border-brand-hairline">
            {skills.map((s, i) => (
              <li key={s.id}>
                <Link
                  href={`/marketplace/${s.id}`}
                  className="group grid grid-cols-12 gap-4 py-6 sm:py-7 items-baseline hover:bg-brand-cream-card transition-colors px-2 -mx-2"
                >
                  <span className="col-span-1 label-cap text-brand-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className="font-display col-span-12 sm:col-span-6 text-2xl sm:text-3xl tracking-tight group-hover:text-brand-emerald transition-colors"
                    style={{ letterSpacing: '-0.018em' }}
                  >
                    {s.title}
                  </h3>
                  <span className="hidden sm:block sm:col-span-3 text-sm text-brand-muted">
                    {s.creator}
                  </span>
                  <span className="hidden sm:block sm:col-span-1 label-cap text-brand-muted">
                    {s.platform}
                  </span>
                  <span className="col-span-12 sm:col-span-1 sm:text-right font-display text-xl">
                    {s.price}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* №03 — Guides, magazine spread */}
      <section className="px-6 lg:px-10 py-20 sm:py-28 border-t border-brand-hairline">
        <div className="max-w-page mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 sm:mb-16 items-end">
            <div className="lg:col-span-7">
              <SectionLabel>№03 &nbsp;·&nbsp; Guides</SectionLabel>
              <h2
                className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                From people who <em className="italic text-brand-emerald font-medium">already did it.</em>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-brand-hairline border border-brand-hairline">
            <div className="lg:col-span-7">
              <ProductCard product={guides[0]} variant="emerald" />
            </div>
            <div className="lg:col-span-5 grid grid-cols-1 gap-px bg-brand-hairline">
              <ProductCard product={guides[1]} />
              <ProductCard product={guides[2]} />
            </div>
          </div>
        </div>
      </section>

      {/* Niches — editorial index */}
      <section className="px-6 lg:px-10 py-20 sm:py-28 border-t border-brand-hairline">
        <div className="max-w-page mx-auto">
          <div className="mb-12">
            <SectionLabel>№04 &nbsp;·&nbsp; By trade</SectionLabel>
            <h2
              className="font-display mt-5 text-4xl sm:text-5xl tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Find an agent built for your work.
            </h2>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-brand-hairline">
            {niches.map((n) => (
              <li key={n.slug} className="border-r border-b border-brand-hairline">
                <Link
                  href={`/marketplace?niche=${n.slug}`}
                  className="group flex items-baseline justify-between px-5 py-6 hover:bg-brand-cream-card transition-colors"
                >
                  <span className="font-display text-lg sm:text-xl tracking-tight group-hover:text-brand-emerald transition-colors">
                    {n.name}
                  </span>
                  <span className="label-cap text-brand-muted">{n.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sell pitch — emerald full-bleed */}
      <section className="px-6 lg:px-10 py-20 sm:py-32 bg-brand-emerald text-brand-cream">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <span className="label-cap text-brand-cream/70">For creators</span>
            <h2
              className="font-display mt-5 text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Built something good?{' '}
              <em className="italic text-brand-mustard-soft font-medium">Charge for it.</em>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-brand-cream/85 leading-relaxed">
              Publish a skill, a guide, or a full agent setup. Keep 80% of
              every sale. Stripe handles payouts; we don&rsquo;t touch the money.
            </p>
            <Link
              href="/sell"
              className="mt-7 inline-flex items-center gap-2 bg-brand-cream text-brand-ink px-7 py-4 text-[15px] hover:bg-white transition-colors"
            >
              Start selling
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
