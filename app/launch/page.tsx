import Link from 'next/link'
import { pageMetadata } from '@/lib/seo'

// Single-page deep-dive used as the destination for Product Hunt /
// Show HN launches. Intentionally not in the nav (scope 5.4).
export const metadata = pageMetadata({
  title: 'Skillzy — The marketplace for AI agent skills',
  description:
    'What Skillzy is, who it’s for, and why it exists. Drop-in AI agent skills, setups, and guides — built by creators, for the work that actually ships.',
  path: '/launch',
})

export default function LaunchPage() {
  return (
    <div className="paper">
      <section className="px-6 lg:px-10 pt-20 sm:pt-28 pb-14 sm:pb-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Now live
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-8xl tracking-tight leading-[0.92] max-w-4xl"
            style={{ letterSpacing: '-0.035em' }}
          >
            The marketplace for{' '}
            <em className="italic text-brand-gold font-medium">agent skills.</em>
          </h1>
          <p className="mt-7 text-xl sm:text-2xl text-brand-ink max-w-3xl leading-snug">
            Pre-built skills, full setups, and guides for Claude, n8n,
            OpenClaw, ChatGPT and more. Built by people who do the work.
            Drop them into the agent you already use.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
            >
              Browse the catalogue
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              How it works →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
          {[
            { h: 'For operators', b: 'Tradies, agents, clinics, agencies. The non-technical people who need an agent doing real work today, not a weekend of YAML.' },
            { h: 'For creators', b: 'Built something that works? List it once, sell it forever. Keep 80%. Zero IP lock-in.' },
            { h: 'You own it', b: 'Buy once, yours forever. Re-downloadable, no subscription, no IP lock-in. Creators warrant what they sell; we act fast on bad actors.' },
          ].map((c) => (
            <div key={c.h} className="bg-brand-cream-card p-7 sm:p-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                {c.h}
              </span>
              <p className="mt-3 text-brand-muted leading-relaxed">{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto max-w-3xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Why it exists
          </span>
          <h2
            className="font-display mt-4 text-3xl sm:text-5xl tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            Skills shouldn’t be scattered.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-brand-muted">
            <p>
              Every working AI agent is a stack of small, specific skills. The
              tricks for doing them well live in Discord threads, blog posts,
              and the heads of the people already doing the work.
            </p>
            <p>
              Skillzy collects that working knowledge and pays the people who
              built it. You build. We sell.{' '}
              <span className="text-brand-ink">They use.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-16 sm:py-24">
        <div className="max-w-page mx-auto text-center">
          <h2
            className="font-display text-4xl sm:text-6xl tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            Drop it in. Agent supercharged.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
            >
              Browse skills
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/sell"
              className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              Sell your own →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
