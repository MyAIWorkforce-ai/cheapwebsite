import Link from 'next/link'

export const metadata = {
  title: 'Sell your skills — Skillzy',
  description:
    'Publish skills, guides, and agent setups on Skillzy. Keep 80% of every sale. Stripe pays you directly.',
}

const steps = [
  { n: '01', title: 'List it', desc: 'Pick a type — skill, guide, or full agent setup. Upload your files or paste them in.' },
  { n: '02', title: 'Let it describe itself', desc: 'Talk, type, or drop in your notes. The listing writes itself. You sign off.' },
  { n: '03', title: 'Connect Stripe', desc: 'One click at the moment you publish. Payouts go straight to your account.' },
  { n: '04', title: 'Get paid', desc: 'Keep 80%. Stripe handles the split. No platform-held funds.' },
]

export default function SellPage() {
  return (
    <div className="paper">
      {/* Hero */}
      <section className="px-6 lg:px-10 pt-16 sm:pt-28 pb-14 sm:pb-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <span className="label-cap text-brand-emerald">For creators</span>
            <h1
              className="font-display mt-5 text-[3rem] sm:text-[5rem] lg:text-[6.5rem] leading-[0.95] tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              Sell your{' '}
              <em className="italic text-brand-emerald font-medium">skills.</em>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-lg text-brand-ink leading-relaxed max-w-md">
              Built something good? List it. Keep 80% of every sale. We won&rsquo;t
              ever touch the money.
            </p>
            <Link
              href="/signin?intent=sell"
              className="mt-7 inline-flex items-center gap-2 bg-brand-emerald text-brand-cream font-medium px-7 py-4 text-[15px] hover:bg-brand-emerald-deep transition-colors"
            >
              Start selling
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 lg:px-10 py-14 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
          {[
            { n: '80%', label: 'You keep', desc: 'On every sale. More than Ramp. Matches Agensi.' },
            { n: '$0', label: 'To list', desc: 'No fees. No subscriptions. Pay nothing until you earn.' },
            { n: 'I.', label: 'Click to connect Stripe', desc: 'Only when you’re ready to publish.' },
          ].map((s) => (
            <div key={s.label} className="bg-brand-cream-card p-8 sm:p-10">
              <p className="font-display text-7xl text-brand-emerald" style={{ letterSpacing: '-0.03em' }}>{s.n}</p>
              <p className="font-display text-xl mt-3">{s.label}</p>
              <p className="text-sm text-brand-muted mt-2 max-w-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 lg:px-10 py-20 sm:py-28 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="label-cap text-brand-emerald">How it works</span>
          <h2
            className="font-display mt-5 text-4xl sm:text-6xl tracking-tight max-w-2xl"
            style={{ letterSpacing: '-0.02em' }}
          >
            Four steps. <em className="italic text-brand-emerald font-medium">No assembly.</em>
          </h2>

          <ol className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-hairline border border-brand-hairline">
            {steps.map((s) => (
              <li key={s.n} className="bg-brand-cream-card p-7 sm:p-8">
                <span className="label-cap text-brand-emerald">№{s.n}</span>
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

      {/* Agent Setups */}
      <section className="px-6 lg:px-10 py-20 sm:py-28">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <span className="label-cap text-brand-emerald">Highest-value tier</span>
            <h2
              className="font-display mt-5 text-4xl sm:text-6xl tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Agent Setups <em className="italic text-brand-emerald font-medium">sell for more.</em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-brand-muted leading-relaxed">
              A complete agent for a single line of work — every skill, prompt,
              integration, and setup guide bundled into one purchase. Price
              from $49 to $499+.
            </p>
            <Link
              href="/signin?intent=sell"
              className="mt-7 inline-flex items-center gap-2 text-sm border-b border-brand-ink pb-0.5 hover:text-brand-emerald hover:border-brand-emerald transition-colors"
            >
              Publish your first Agent Setup →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
