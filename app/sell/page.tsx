import Link from 'next/link'

export const metadata = {
  title: 'Sell your skills — Skillzy',
  description:
    'Publish skills, guides, and agent setups. Keep 80% of every sale. Stripe pays you directly.',
}

function Sticker({
  children,
  rotate = '-3deg',
  tone = 'mustard',
  className = '',
}: {
  children: React.ReactNode
  rotate?: string
  tone?: 'mustard' | 'emerald'
  className?: string
}) {
  const toneClass =
    tone === 'mustard'
      ? 'bg-brand-mustard text-brand-ink'
      : 'bg-brand-emerald text-brand-cream'
  return (
    <span
      className={`inline-block font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 ${toneClass} ${className}`}
      style={{ transform: `rotate(${rotate})` }}
    >
      {children}
    </span>
  )
}

const steps = [
  { n: '01', title: 'List it', desc: 'Skill, guide, or full agent setup. Drop in your files.' },
  { n: '02', title: 'Let it describe itself', desc: 'Talk, type, or paste your notes. The listing writes itself. You sign off.' },
  { n: '03', title: 'Connect Stripe', desc: 'One click. Only when you publish. Payouts go to your account.' },
  { n: '04', title: 'Get paid', desc: 'Keep 80%. Stripe splits the cash. We never hold it.' },
]

export default function SellPage() {
  return (
    <div className="paper overflow-x-clip">
      {/* HERO */}
      <section className="px-6 lg:px-10 pt-16 sm:pt-28 pb-20 sm:pb-28 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <Sticker rotate="-2deg" className="mb-8">
            Made something? cash it.
          </Sticker>

          <h1
            className="font-display text-[3.25rem] sm:text-[7rem] lg:text-[9.5rem] leading-[0.88] tracking-tight"
            style={{ letterSpacing: '-0.035em' }}
          >
            <span className="block">Built it?</span>
            <span className="block">
              <em className="italic font-medium text-brand-emerald">Sell it.</em>
            </span>
          </h1>

          <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <p className="lg:col-span-7 text-xl sm:text-2xl leading-snug max-w-2xl text-brand-ink">
              Skillzy turns your agent and your skills into income. Stripe pays
              you direct. Keep 80% of every sale.
            </p>
            <div className="lg:col-span-5 flex items-center gap-6 lg:justify-end">
              <Link
                href="/signin?intent=sell"
                className="inline-flex items-center gap-2 bg-brand-emerald text-brand-cream font-medium px-7 py-4 text-[15px] hover:bg-brand-emerald-deep transition-colors"
              >
                Start selling
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/marketplace"
                className="text-sm text-brand-ink hover:text-brand-emerald transition-colors border-b border-brand-ink hover:border-brand-emerald pb-0.5"
              >
                See what sells
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THE TAKE */}
      <section className="px-6 lg:px-10 py-14 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
          {[
            { n: '80%', label: 'You keep', desc: 'On every sale. Always.' },
            { n: '$0', label: 'To list', desc: 'No fees. No subscriptions.' },
            { n: '1', label: 'Click to Stripe', desc: 'Only when you publish.' },
          ].map((s) => (
            <div key={s.label} className="bg-brand-cream-card p-8 sm:p-10">
              <p
                className="font-display text-7xl sm:text-8xl text-brand-emerald"
                style={{ letterSpacing: '-0.04em' }}
              >
                {s.n}
              </p>
              <p className="font-display text-xl mt-4">{s.label}</p>
              <p className="text-sm text-brand-muted mt-1.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 lg:px-10 py-20 sm:py-28 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <h2
            className="font-display text-5xl sm:text-7xl tracking-tight max-w-3xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            Four steps. <em className="italic text-brand-emerald font-medium">No assembly.</em>
          </h2>

          <ol className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-hairline border border-brand-hairline">
            {steps.map((s) => (
              <li key={s.n} className="bg-brand-cream-card p-7 sm:p-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-emerald">
                  №{s.n}
                </span>
                <h3
                  className="font-display text-2xl mt-4 tracking-tight"
                  style={{ letterSpacing: '-0.018em' }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-brand-muted leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* AGENT SETUPS — the moneymaker */}
      <section className="relative px-6 lg:px-10 py-20 sm:py-32 bg-brand-emerald text-brand-cream overflow-hidden">
        <div
          aria-hidden
          className="absolute top-8 right-8 sm:top-14 sm:right-14 hidden sm:block"
        >
          <Sticker tone="mustard" rotate="5deg">
            The moneymaker
          </Sticker>
        </div>

        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cream/70">
            Highest-value tier
          </span>

          <h2
            className="font-display mt-6 text-5xl sm:text-7xl lg:text-8xl leading-[0.92] tracking-tight"
            style={{ letterSpacing: '-0.025em' }}
          >
            Agent setups{' '}
            <em className="italic text-brand-mustard-soft font-medium">sell for more.</em>
          </h2>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <p className="lg:col-span-7 text-lg leading-relaxed text-brand-cream/90 max-w-2xl">
              A complete agent for a single line of work — every skill, prompt,
              integration, and setup guide bundled into one purchase. $49 to
              $499+. The hardest thing to clone, the highest margin you can
              charge.
            </p>
            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <Link
                href="/signin?intent=sell"
                className="inline-flex items-center gap-2 bg-brand-cream text-brand-ink font-medium px-7 py-4 text-[15px] hover:bg-white transition-colors"
              >
                Publish your first setup
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
