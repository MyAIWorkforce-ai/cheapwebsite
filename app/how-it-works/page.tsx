import Link from 'next/link'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'How Skillzy Works — Buy, Download, Drop In',
  description:
    'Three steps: buy a skill, guide, prompt pack, full setup, or scheduled loop; download the pack; drop it into your agent. No coding, no DIY. Here is exactly how it works.',
  path: '/how-it-works',
  keywords: [
    'how Skillzy works',
    'how to use AI agent skills',
    'AI prompt packs',
    'AI agent loops',
    'SKILL.md setup',
  ],
})

const steps = [
  {
    n: '01',
    title: 'Buy a listing',
    body: 'Pick a skill, guide, prompt pack, full agent setup, or scheduled loop. Pay with card via Stripe — Skillzy never sees your card. You do not need an account to buy; the download lands in your email either way.',
    aside: 'Checkout takes about 30 seconds. Your card never touches Skillzy — Stripe handles it.',
  },
  {
    n: '02',
    title: 'Download the pack',
    body: 'A no-login download link lands in your inbox the moment payment clears, and the bundle is waiting on your dashboard — SKILL.md files, system prompts, configs, a README, and example inputs/outputs. Re-download any time, forever.',
    aside: 'Sign in later with the same email and every past purchase is waiting in your dashboard.',
  },
  {
    n: '03',
    title: 'Drop it into your agent',
    body: 'Open your agent — Claude, OpenClaw, ChatGPT, n8n — drop the files in, and tell it to use the skill. The agent handles the rest. Agent Setups include a short wiring guide for connecting your tools.',
    aside: 'Most single skills are running inside two minutes. Full setups, a bit longer.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="paper">
      <section className="px-6 lg:px-10 pt-16 sm:pt-24 pb-12 sm:pb-16 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            How it works
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[0.95] max-w-4xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            Buy it. Download it.{' '}
            <em className="italic text-brand-gold font-medium">Drop it in.</em>
          </h1>
          <p className="mt-6 text-xl text-brand-ink max-w-3xl leading-snug">
            No SKILL.md syntax to learn. No five-tab tutorial. Built by people
            who do the work, for people who do the work.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <ol className="divide-y divide-brand-hairline border-y border-brand-hairline">
            {steps.map((s) => (
              <li key={s.n} className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-1">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                    {s.n}
                  </span>
                </div>
                <div className="lg:col-span-7">
                  <h2
                    className="font-display text-3xl sm:text-5xl tracking-tight"
                    style={{ letterSpacing: '-0.03em' }}
                  >
                    {s.title}
                  </h2>
                  <p className="mt-4 text-lg text-brand-muted leading-relaxed max-w-prose">
                    {s.body}
                  </p>
                  {s.n === '03' && (
                    <p className="mt-4 text-sm text-brand-muted">
                      No agent yet?{' '}
                      <a
                        href="https://myaiworkforce.ai/buildagent"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-ink border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5 transition-colors"
                      >
                        My AI Workforce builds you one →
                      </a>
                    </p>
                  )}
                </div>
                <div className="lg:col-span-4">
                  <div className="bg-brand-cream-card border border-brand-hairline p-5 text-sm text-brand-muted">
                    {s.aside}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14 sm:py-20 border-b border-brand-hairline bg-brand-navy text-brand-cream">
        <div className="max-w-page mx-auto max-w-3xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cream/70">
            The guarantee
          </span>
          <p className="mt-5 font-display text-2xl sm:text-3xl leading-snug tracking-tight">
            If a listing doesn’t work as described, email{' '}
            <a href="mailto:help@skillzy.ai" className="text-brand-gold-soft underline">
              help@skillzy.ai
            </a>{' '}
            with your order number. A human reads every request — no forms, no
            friction.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14 sm:py-20">
        <div className="max-w-page mx-auto flex flex-wrap items-center gap-5">
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
            Or sell your own →
          </Link>
        </div>
      </section>
    </div>
  )
}
