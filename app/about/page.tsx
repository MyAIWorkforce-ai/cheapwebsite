import Link from 'next/link'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'About Skillzy — A creator-first agent marketplace',
  description:
    'Why we exist, who builds here, and the principles behind every listing. Skillzy gives creators 80%, keeps their name on the work, and never locks IP.',
  path: '/about',
  keywords: [
    'about Skillzy',
    'agent marketplace',
    'AI creator economy',
    'AI agent skills',
  ],
})

export default function AboutPage() {
  return (
    <div className="paper">
      {/* HERO */}
      <section className="px-6 lg:px-10 pt-16 sm:pt-24 pb-14 sm:pb-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            About
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[0.95] max-w-4xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            A marketplace for the{' '}
            <em className="italic text-brand-gold font-medium">working knowledge</em>{' '}
            of AI agents.
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-brand-ink max-w-3xl leading-snug">
            Made by humans. Dropped into your agent. Built for the work you
            actually do.
          </p>
        </div>
      </section>

      {/* WHY */}
      <section className="px-6 lg:px-10 py-16 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Why we exist
            </span>
            <h2
              className="font-display mt-3 text-3xl sm:text-4xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Skills shouldn&rsquo;t be scattered.
            </h2>
          </header>
          <div className="lg:col-span-8 space-y-5 text-lg leading-relaxed text-brand-muted max-w-prose">
            <p>
              Every working AI agent is a stack of small, specific skills. Read
              an invoice. Draft a follow-up. Triage a ticket. Pull a tracking
              number. The tricks live in scattered Discord threads, blog posts,
              and the heads of the people doing the work.
            </p>
            <p>
              Skillzy is the marketplace for that working knowledge. The
              builders who&rsquo;ve already figured it out package what they
              know. Everyone else drops it in.
            </p>
            <p className="text-brand-ink">
              No fluff. No theory. Things that work, today, in the agent you
              already use.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT */}
      <section className="px-6 lg:px-10 py-16 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            What we sell
          </span>
          <h2
            className="font-display mt-3 text-3xl sm:text-4xl tracking-tight"
            style={{ letterSpacing: '-0.025em' }}
          >
            Three things. Done sharp.
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
            {[
              {
                eyebrow: 'Skills',
                price: '$9 — $109+',
                title: 'One thing. Done sharp.',
                body: 'A small bundle — SKILL.md plus the configs, prompts, and examples it needs. Drop it into your agent and that capability is live.',
              },
              {
                eyebrow: 'Guides',
                price: '$9 — $59+',
                title: 'How-tos people read.',
                body: 'Short, no-filler reads from people who already shipped what you’re trying to build.',
              },
              {
                eyebrow: 'Agent Setups',
                price: '$49 — $999+',
                title: 'The whole agent. In a box.',
                body: 'Every prompt, config, connector, and template for a complete line of work. The headliner.',
              },
            ].map((c) => (
              <div key={c.eyebrow} className="bg-brand-cream-card p-7 sm:p-8 flex flex-col">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                    {c.eyebrow}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                    {c.price}
                  </span>
                </div>
                <h3
                  className="font-display text-2xl sm:text-3xl mt-4 tracking-tight"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {c.title}
                </h3>
                <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE SPLIT */}
      <section className="px-6 lg:px-10 py-16 sm:py-20 border-b border-brand-hairline bg-brand-navy text-brand-cream">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cream/70">
            The split
          </span>
          <h2
            className="font-display mt-5 text-4xl sm:text-6xl lg:text-[5rem] tracking-tight leading-[0.95] max-w-3xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            <em className="italic text-brand-gold-soft font-medium">80%</em> goes
            to the creator. Always.
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-brand-cream/85 max-w-2xl">
            Once creators connect their Stripe, every sale pays them 80%
            direct — Stripe handles the money movement. List it once, sell
            it forever.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-cream/10 border border-brand-cream/15">
            {[
              { n: '80%', label: 'Stays with you', desc: 'Every sale. No exceptions.' },
              { n: '$0',  label: 'To list',        desc: 'Free to publish. Keep 80% of every sale.' },
              { n: '∞',   label: 'Resales',        desc: 'List once. Earn forever.' },
            ].map((s) => (
              <div key={s.label} className="bg-brand-navy p-7 sm:p-8">
                <p
                  className="font-display text-5xl sm:text-6xl text-brand-gold-soft"
                  style={{ letterSpacing: '-0.04em' }}
                >
                  {s.n}
                </p>
                <p className="font-display text-lg mt-3">{s.label}</p>
                <p className="text-sm text-brand-cream/70 mt-1.5">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO */}
      <section className="px-6 lg:px-10 py-16 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Who&rsquo;s behind it
            </span>
            <h2
              className="font-display mt-3 text-3xl sm:text-4xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Made by builders.
            </h2>
          </header>
          <div className="lg:col-span-8 space-y-5 text-lg leading-relaxed text-brand-muted max-w-prose">
            <p>
              Skillzy is a small team of agent builders who got tired of
              rebuilding the same skill from scratch every time we started
              a new project. We made what we wished existed.
            </p>
            <p>
              Creators publish instantly. They warrant they own what they
              upload and that it&rsquo;s clean — no malware, no infringing
              work. We act fast on reports.
            </p>
            <p className="text-brand-ink">
              You build. We sell. They use.
            </p>
            <p className="text-sm">
              Support &amp; general enquiries:{' '}
              <a
                href="mailto:hi@skillzy.ai"
                className="text-brand-ink border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
              >
                hi@skillzy.ai
              </a>{' '}
              — a real person reads every message.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-16 sm:py-20">
        <div className="max-w-page mx-auto grid grid-cols-1 sm:grid-cols-2 gap-px bg-brand-hairline border border-brand-hairline">
          <Link
            href="/marketplace"
            className="bg-brand-cream-card p-8 sm:p-10 hover:bg-white transition-colors group"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              For buyers
            </span>
            <p
              className="font-display mt-3 text-3xl sm:text-4xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Browse skills{' '}
              <span className="text-brand-gold group-hover:translate-x-1 inline-block transition-transform">→</span>
            </p>
            <p className="mt-3 text-sm text-brand-muted">
              Drop-in, by people who actually run them.
            </p>
          </Link>
          <Link
            href="/sell"
            className="bg-brand-cream-card p-8 sm:p-10 hover:bg-white transition-colors group"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              For creators
            </span>
            <p
              className="font-display mt-3 text-3xl sm:text-4xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Start selling{' '}
              <span className="text-brand-gold group-hover:translate-x-1 inline-block transition-transform">→</span>
            </p>
            <p className="mt-3 text-sm text-brand-muted">
              Built it once? Sell it forever. Keep 80%.
            </p>
          </Link>
        </div>

        <div className="max-w-page mx-auto mt-10 text-center">
          <p className="text-sm text-brand-muted">
            Or just say hi:{' '}
            <a
              href="mailto:hi@skillzy.ai"
              className="text-brand-ink border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
            >
              hi@skillzy.ai
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
