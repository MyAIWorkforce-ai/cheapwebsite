import Link from 'next/link'
import Logo from '@/components/Logo'
import { BRAND, MARKETPLACE_URL } from '@/lib/brand'

const niches = [
  'Real Estate',
  'Builders',
  'Accountants',
  'E-commerce',
  'Coaches',
  'Lawyers',
  'Marketing',
  'Hospitality',
  'Healthcare',
  'Recruiters',
  'Schools',
  'Anything else',
]

const steps = [
  {
    n: '01',
    title: 'Tell it the job.',
    body: 'Describe the work in plain words — the tasks, the tools, the way you want it done. No code, no prompt-wrangling.',
  },
  {
    n: '02',
    title: 'We build the agent.',
    body: 'Your agent is assembled, wired to your tools, and trained on your way of working — ready to run on the platform you already use.',
  },
  {
    n: '03',
    title: 'Put it on shift.',
    body: 'Deploy it and let it work. Add skills from the Skillzy marketplace any time to make it sharper.',
  },
]

const capabilities = [
  'Answer the inbox',
  'Chase invoices',
  'Book the calls',
  'Write the listings',
  'Qualify the leads',
  'Sort the paperwork',
  'Draft the proposals',
  'Run the reports',
]

function Squiggle({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 300 14" preserveAspectRatio="none" className={className}>
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
  tone?: 'mustard' | 'navy' | 'cream'
  className?: string
}) {
  const toneClass =
    tone === 'mustard'
      ? 'bg-brand-gold text-brand-ink'
      : tone === 'navy'
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
      <div className="max-w-page mx-auto px-6 lg:px-10 pt-7 sm:pt-9 flex items-center justify-between gap-4">
        <Logo size="sm" />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted hidden sm:block">
          {BRAND.tagline} · {BRAND.est}
        </span>
      </div>

      {/* HERO */}
      <section className="px-6 lg:px-10 pt-14 sm:pt-24 pb-20 sm:pb-28">
        <div className="max-w-page mx-auto">
          <Sticker rotate="-2.5deg" className="mb-8">
            ✿ Your AI workforce
          </Sticker>

          <h1
            className="font-display text-[3rem] sm:text-[6rem] lg:text-[8rem] leading-[0.9] tracking-tight text-brand-ink"
            style={{ letterSpacing: '-0.035em' }}
          >
            <span className="block">Build the agent</span>
            <span className="block pl-[0.06em]">that does the</span>
            <span className="block pl-[0.06em]">
              <span className="relative inline-block">
                <em className="italic font-medium text-brand-gold">work.</em>
                <Squiggle className="absolute -bottom-3 sm:-bottom-5 left-0 w-full h-3 sm:h-5 text-brand-gold" />
              </span>
            </span>
          </h1>

          <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <p className="lg:col-span-7 text-xl sm:text-2xl leading-snug max-w-2xl text-brand-ink">
              Tell us the job. We build you an AI agent that handles it — on the
              tools you already use, in the way you already work. No code.
            </p>
            <div className="lg:col-span-5 flex items-center gap-6 lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
              >
                Build my agent
                <span aria-hidden>→</span>
              </Link>
              <a
                href="#how"
                className="text-sm text-brand-ink hover:text-brand-gold transition-colors border-b border-brand-ink hover:border-brand-gold pb-0.5"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* platforms */}
          <div className="mt-16 sm:mt-20 pt-8 border-t border-brand-hairline">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted mb-4">
              Runs on
            </p>
            <p className="font-display text-lg sm:text-xl leading-relaxed text-brand-ink">
              Claude · OpenClaw · Hermes · ChatGPT · Gemini · Grok · Ollama ·
              Mistral · DeepSeek · n8n · Make · Zapier
            </p>
          </div>
        </div>
      </section>

      {/* SKILLZY HOOK — quiet strip linking to the marketplace */}
      <section className="border-y border-brand-hairline">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-6 sm:py-7 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-baseline gap-x-3 gap-y-1 flex-wrap">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Already have an agent?
            </span>
            <span className="text-brand-ink">
              Make it sharper with ready-made{' '}
              <span className="font-display text-lg italic text-brand-gold">skills</span>{' '}
              <span className="text-brand-muted">· skills, guides &amp; full setups on Skillzy</span>
            </span>
          </div>
          <a
            href={MARKETPLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors whitespace-nowrap"
          >
            Browse Skillzy →
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="px-6 lg:px-10 py-20 sm:py-28 scroll-mt-8">
        <div className="max-w-page mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2
              className="font-display text-4xl sm:text-6xl tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              How it works.
            </h2>
            <p className="mt-3 text-lg text-brand-muted">
              Three steps from idea to working agent.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
            {steps.map((s) => (
              <li key={s.n} className="bg-brand-cream p-8 sm:p-10">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                  {s.n}
                </span>
                <h3
                  className="font-display text-2xl sm:text-3xl mt-5 tracking-tight"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {s.title}
                </h3>
                <p className="mt-4 text-brand-muted leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
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
            An agent built for the work you actually do.
          </p>

          <div className="mt-12 flex flex-wrap gap-3 sm:gap-4">
            {niches.map((n, i) => {
              const rotations = ['-1deg', '0.6deg', '-0.4deg', '1.2deg', '-1.4deg', '0.3deg']
              const rot = rotations[i % rotations.length]
              return (
                <span
                  key={n}
                  style={{ transform: `rotate(${rot})` }}
                  className="inline-flex items-center bg-brand-cream-card border border-brand-ink px-5 py-2.5 text-base"
                >
                  {n}
                </span>
              )
            })}
          </div>
        </div>
      </section>

      {/* MANIFESTO — dark strip */}
      <section className="relative px-6 lg:px-10 py-24 sm:py-32 bg-brand-navy text-brand-cream overflow-hidden">
        <div aria-hidden className="absolute top-10 right-10 sm:top-16 sm:right-20 hidden sm:block">
          <Sticker tone="mustard" rotate="6deg">
            ✿ On shift
          </Sticker>
        </div>

        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cream/70">
            Your workforce
          </span>

          <h2
            className="font-display mt-6 text-5xl sm:text-7xl lg:text-[7.5rem] leading-[0.92] tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            <span className="block">Hire an agent</span>
            <span className="block">
              that{' '}
              <em className="italic text-brand-gold-soft font-medium">never clocks off.</em>
            </span>
          </h2>

          <p className="mt-10 text-xl sm:text-2xl leading-snug max-w-3xl text-brand-cream/90">
            Not another tool to learn. A working agent that does the job —
            built for your business, running on your stack, ready in days.{' '}
            <span className="text-brand-cream">You set the work. It shows up.</span>
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-cream/10 border border-brand-cream/15">
            {[
              { n: '24/7', label: 'On the job', desc: 'No breaks. No sick days.' },
              { n: 'Days', label: 'To go live', desc: 'Built and deployed fast.' },
              { n: 'No', label: 'Code required', desc: 'You describe it. We build it.' },
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
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
            >
              Build my agent
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* capabilities marquee */}
        <div className="mt-16 sm:mt-20 -mx-6 lg:-mx-10 overflow-hidden border-y border-brand-cream/15 py-5">
          <div className="flex gap-12 animate-marquee whitespace-nowrap font-display text-2xl sm:text-3xl text-brand-cream/85">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex gap-12 shrink-0" aria-hidden={dup === 1}>
                {capabilities.map((c) => (
                  <span key={`${dup}-${c}`} className="inline-flex items-baseline gap-12">
                    <span style={{ letterSpacing: '-0.018em' }}>{c}</span>
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
