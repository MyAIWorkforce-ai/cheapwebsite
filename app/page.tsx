import Link from 'next/link'
import Logo from '@/components/Logo'
import ProductCard from '@/components/ProductCard'
import { products, toCardProduct, NICHES } from '@/lib/catalog'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Skillzy — AI agent skills, setups & guides. Drop-in, not DIY.',
  description:
    'Pre-built AI agent skills, full setups, and guides for Claude, n8n, OpenClaw, ChatGPT and more. Built for tradies, real estate, bookkeepers, and 20+ trades.',
  path: '/',
  keywords: [
    'AI agent skills',
    'AI agent setups',
    'AI agent marketplace',
    'Claude skills',
    'n8n agents',
    'SKILL.md',
  ],
})

const agentSetups = products
  .filter((p) => p.type === 'Agent Setup')
  .slice(0, 3)
  .map(toCardProduct)

const skills = products
  .filter((p) => p.type === 'Skill')
  .slice(0, 4)
  .map(toCardProduct)

const guides = products
  .filter((p) => p.type === 'Guide')
  .slice(0, 3)
  .map(toCardProduct)

// Pulled from the master list in lib/catalog so every place that
// shows niches (filter row, hustle grid) stays in sync. "Anything
// else" is a CTA tile, not a real niche, so it's appended here only.
const niches = [...NICHES, 'Anything else']

function Squiggle({ className = '' }: { className?: string }) {
  // hand-drawn-feel underline
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 14"
      preserveAspectRatio="none"
      className={className}
    >
      <path
        d="M2 9 C 40 -2, 80 14, 120 6 S 200 0, 240 8 S 290 4, 298 8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function Sticker({
  children,
  rotate = '-3deg',
  tone = 'mustard',
  className = '',
}: {
  children: React.ReactNode
  rotate?: string
  tone?: 'mustard' | 'emerald' | 'cream'
  className?: string
}) {
  const toneClass =
    tone === 'mustard'
      ? 'bg-brand-gold text-brand-ink'
      : tone === 'emerald'
        ? 'bg-brand-navy text-brand-cream'
        : 'bg-brand-cream text-brand-ink border border-brand-ink'
  return (
    <span
      className={`inline-block font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 ${toneClass} ${className}`}
      style={{ transform: `rotate(${rotate})` }}
    >
      {children}
    </span>
  )
}

export default function HomePage() {
  return (
    <div className="paper overflow-x-clip">
      {/* identity strip — no nav */}
      <div className="max-w-page mx-auto px-6 lg:px-10 pt-7 sm:pt-9 flex items-center justify-between">
        <Logo size="md" />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted hidden sm:block">
          A marketplace for agent skills · Est. 2026
        </span>
      </div>

      {/* HERO */}
      <section className="px-6 lg:px-10 pt-14 sm:pt-24 pb-20 sm:pb-28">
        <div className="max-w-page mx-auto">
          <Sticker rotate="-2.5deg" className="mb-8">
            ✿ Built by creators
          </Sticker>

          <h1
            className="font-display text-[3rem] sm:text-[6rem] lg:text-[8rem] leading-[0.9] tracking-tight text-brand-ink"
            style={{ letterSpacing: '-0.035em' }}
          >
            <span className="block">Drop it in.</span>
            <span className="block pl-[0.06em]">Your agent</span>
            <span className="block pl-[0.06em]">
              just got{' '}
              <span className="relative inline-block">
                <em className="italic font-medium text-brand-gold">smarter.</em>
                <Squiggle className="absolute -bottom-3 sm:-bottom-5 left-0 w-full h-3 sm:h-5 text-brand-gold" />
              </span>
            </span>
          </h1>

          <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <p className="lg:col-span-7 text-xl sm:text-2xl leading-snug max-w-2xl text-brand-ink">
              Pre-built skills, guides, and full agent setups from creators in
              the field. Drop them into any agent — yours levels up instantly.
            </p>
            <div className="lg:col-span-5 flex items-center gap-6 lg:justify-end">
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
              >
                Browse skills
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/sell"
                className="text-sm text-brand-ink hover:text-brand-gold transition-colors border-b border-brand-ink hover:border-brand-gold pb-0.5"
              >
                Or sell yours
              </Link>
            </div>
          </div>

          {/* search */}
          <form
            action="/marketplace"
            method="GET"
            className="mt-16 sm:mt-20 pt-8 border-t border-brand-hairline"
          >
            <label
              htmlFor="hero-search"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold block mb-4"
            >
              Or look something up
            </label>
            <div className="flex items-baseline gap-4 border-b border-brand-ink pb-3">
              <svg
                aria-hidden
                className="w-5 h-5 text-brand-ink shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                />
              </svg>
              <input
                id="hero-search"
                type="search"
                name="q"
                placeholder="invoices, real estate, daily summary…"
                className="flex-1 bg-transparent outline-none font-display text-2xl sm:text-3xl text-brand-ink placeholder:text-brand-muted/70 placeholder:italic"
                style={{ letterSpacing: '-0.015em' }}
                autoComplete="off"
              />
              <button
                type="submit"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ink hover:text-brand-gold transition-colors"
              >
                Search →
              </button>
            </div>
          </form>

          {/* platforms */}
          <div className="mt-12 sm:mt-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted mb-4">
              Works with
            </p>
            <p className="font-display text-lg sm:text-xl leading-relaxed text-brand-ink">
              Claude · OpenClaw · Hermes ·
              ChatGPT · Gemini · Grok · Ollama · Mistral · DeepSeek · n8n ·
              Make · Zapier
            </p>
          </div>
        </div>
      </section>

      {/* CREATOR HOOK — quiet strip between hero and products */}
      <section className="border-y border-brand-hairline">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-6 sm:py-7 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-baseline gap-x-3 gap-y-1 flex-wrap">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              For creators
            </span>
            <span className="text-brand-ink">
              Built something good?{' '}
              <span className="font-display text-lg italic text-brand-gold">
                Sell it.
              </span>{' '}
              <span className="text-brand-muted">
                · One listing. Sell it forever · Keep 80% of every sale
              </span>
            </span>
          </div>
          <Link
            href="/sell"
            className="font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors whitespace-nowrap"
          >
            Start selling →
          </Link>
        </div>
      </section>

      {/* SETUPS */}
      <section className="px-6 lg:px-10 py-20 sm:py-28">
        <div className="max-w-page mx-auto">
          <div className="flex items-end justify-between gap-6 mb-12 sm:mb-14 flex-wrap">
            <div>
              <h2
                className="font-display text-4xl sm:text-6xl tracking-tight"
                style={{ letterSpacing: '-0.03em' }}
              >
                Setups.
              </h2>
              <p className="mt-3 text-lg text-brand-muted">
                The whole agent. In a box.
              </p>
            </div>
            <Link
              href="/marketplace?type=agent-setup"
              className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              See all setups →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
            {agentSetups.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                variant={p.featured ? 'emerald' : 'cream'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="px-6 lg:px-10 py-20 sm:py-28 border-t border-brand-hairline">
        <div className="max-w-page mx-auto">
          <div className="flex items-end justify-between gap-6 mb-12 sm:mb-14 flex-wrap">
            <div>
              <h2
                className="font-display text-4xl sm:text-6xl tracking-tight"
                style={{ letterSpacing: '-0.03em' }}
              >
                Skills.
              </h2>
              <p className="mt-3 text-lg text-brand-muted">
                One thing. Done sharp.
              </p>
            </div>
            <Link
              href="/marketplace?type=skill"
              className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              See all skills →
            </Link>
          </div>

          <ol className="divide-y divide-brand-hairline border-y border-brand-hairline">
            {skills.map((s, i) => (
              <li key={s.id}>
                <Link
                  href={`/marketplace/${s.id}`}
                  className="group grid grid-cols-12 gap-4 py-6 sm:py-7 items-baseline hover:bg-brand-cream-card transition-colors px-2 -mx-2"
                >
                  <span className="col-span-1 font-mono text-xs text-brand-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className="font-display col-span-12 sm:col-span-6 text-2xl sm:text-3xl tracking-tight group-hover:text-brand-gold transition-colors"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {s.title}
                  </h3>
                  <span className="hidden sm:block sm:col-span-3 text-sm text-brand-muted">
                    {s.creator}
                  </span>
                  <span className="hidden sm:block sm:col-span-1 font-mono text-[11px] uppercase tracking-widest text-brand-muted">
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

      {/* GUIDES */}
      <section className="px-6 lg:px-10 py-20 sm:py-28 border-t border-brand-hairline">
        <div className="max-w-page mx-auto">
          <div className="flex items-end justify-between gap-6 mb-12 sm:mb-14 flex-wrap">
            <div>
              <h2
                className="font-display text-4xl sm:text-6xl tracking-tight"
                style={{ letterSpacing: '-0.03em' }}
              >
                Guides.
              </h2>
              <p className="mt-3 text-lg text-brand-muted">
                From people who already did it.
              </p>
            </div>
            <Link
              href="/marketplace?type=guide"
              className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              See all guides →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-brand-hairline border border-brand-hairline">
            <div className="lg:col-span-7">
              <ProductCard product={guides[0]} variant={guides[0].featured ? 'emerald' : 'cream'} />
            </div>
            <div className="lg:col-span-5 grid grid-cols-1 gap-px bg-brand-hairline">
              <ProductCard product={guides[1]} />
              <ProductCard product={guides[2]} />
            </div>
          </div>
        </div>
      </section>

      {/* NICHES — sticker-pill grid */}
      <section className="px-6 lg:px-10 py-20 sm:py-28 border-t border-brand-hairline">
        <div className="max-w-page mx-auto">
          <h2
            className="font-display text-5xl sm:text-7xl tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            Pick your hustle.
          </h2>
          <p className="mt-3 text-lg text-brand-muted">
            Built for the work you actually do.
          </p>

          <div className="mt-12 flex flex-wrap gap-3 sm:gap-4">
            {niches.map((n, i) => {
              const rotations = ['-1deg', '0.6deg', '-0.4deg', '1.2deg', '-1.4deg', '0.3deg']
              const rot = rotations[i % rotations.length]
              const isCatchAll = n === 'Anything else'
              const href = isCatchAll
                ? '/marketplace'
                : `/for/${n.toLowerCase().replace(/\s+/g, '-')}`
              return (
                <Link
                  key={n}
                  href={href}
                  style={{ transform: `rotate(${rot})` }}
                  className="inline-flex items-center bg-brand-cream-card border border-brand-ink px-4 py-2 text-sm sm:text-base hover:bg-brand-navy hover:text-brand-cream hover:border-brand-navy transition-colors"
                >
                  {n}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CREATORS' REVOLUTION — dark manifesto strip */}
      <section className="relative px-6 lg:px-10 py-24 sm:py-32 bg-brand-navy text-brand-cream overflow-hidden">
        <div
          aria-hidden
          className="absolute top-10 right-10 sm:top-16 sm:right-20 hidden sm:block"
        >
          <Sticker tone="mustard" rotate="6deg">
            ✿ Manifesto
          </Sticker>
        </div>

        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cream/70">
            For creators
          </span>

          <h2
            className="font-display mt-6 text-5xl sm:text-7xl lg:text-[7.5rem] leading-[0.92] tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            <span className="block">The creators&rsquo;</span>
            <span className="block">
              <em className="italic text-brand-gold-soft font-medium">revolution</em>{' '}
              starts here.
            </span>
          </h2>

          <p className="mt-10 text-xl sm:text-2xl leading-snug max-w-3xl text-brand-cream/90">
            The old marketplaces took 70% and locked your IP behind their
            walls. Skillzy gives you 80%, keeps your name on the work, and
            lets every listing earn forever.{' '}
            <span className="text-brand-cream">You build. We sell. They use.</span>
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-cream/10 border border-brand-cream/15">
            {[
              { n: '80%', label: 'Stays with you', desc: 'Every sale. No exceptions.' },
              { n: '$0', label: 'Held by us', desc: 'Stripe pays you direct, instantly.' },
              { n: '∞', label: 'Resales per listing', desc: 'List once. Earn forever.' },
            ].map((s) => (
              <div key={s.label} className="bg-brand-navy p-8">
                <p
                  className="font-display text-6xl sm:text-7xl text-brand-gold-soft"
                  style={{ letterSpacing: '-0.04em' }}
                >
                  {s.n}
                </p>
                <p className="font-display text-xl mt-3">{s.label}</p>
                <p className="text-sm text-brand-cream/70 mt-1.5">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
            >
              Become a creator
              <span aria-hidden>→</span>
            </Link>
          </div>

          {/* mobile-only sticker, placed in flow */}
          <div className="mt-12 sm:hidden">
            <Sticker tone="mustard" rotate="-3deg">
              ✿ Manifesto
            </Sticker>
          </div>
        </div>

        {/* creator handles marquee — full-bleed under the section */}
        <div className="mt-16 sm:mt-20 -mx-6 lg:-mx-10 overflow-hidden border-y border-brand-cream/15 py-5">
          <div className="flex gap-12 animate-marquee whitespace-nowrap font-display text-2xl sm:text-3xl text-brand-cream/85">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex gap-12 shrink-0" aria-hidden={dup === 1}>
                {[
                  '@harlow',
                  '@ledgerlab',
                  '@sitebench',
                  '@storefrontlabs',
                  '@practiceos',
                  '@fronthouse',
                  '@jonask',
                  '@paperless',
                  '@datajedi',
                  '@kaim',
                  '@mirasato',
                  '@agentschool',
                  '@promptforge',
                ].map((handle) => (
                  <span key={`${dup}-${handle}`} className="inline-flex items-baseline gap-12">
                    <span style={{ letterSpacing: '-0.018em' }}>{handle}</span>
                    <span aria-hidden className="text-brand-gold-soft/70">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
