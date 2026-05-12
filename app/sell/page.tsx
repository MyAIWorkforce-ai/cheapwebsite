import Link from 'next/link'

export const metadata = {
  title: 'Sell your skills — Skillzy',
  description:
    'Publish skills, guides, and agent setups on Skillzy. Keep 80% of every sale. Stripe handles payouts directly to you.',
}

const steps = [
  {
    n: '01',
    title: 'List it',
    desc: 'Pick a type — skill, guide, or full agent setup. Upload files or paste them in.',
  },
  {
    n: '02',
    title: 'Let the AI describe it',
    desc: 'Talk, type, or drop notes in. The AI writes the listing. You sign off.',
  },
  {
    n: '03',
    title: 'Connect Stripe',
    desc: 'One click at the moment you publish. Payouts go straight to your account.',
  },
  {
    n: '04',
    title: 'Get paid',
    desc: 'Keep 80% of every sale. Stripe handles the split. No manual payouts.',
  },
]

export default function SellPage() {
  return (
    <div>
      {/* Hero */}
      <section className="px-5 sm:px-6 lg:px-8 pt-14 sm:pt-24 pb-12 sm:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-purple mb-3">
            For creators
          </p>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-brand-ink leading-[1.02]">
            Sell your skills.
          </h1>
          <p className="mt-6 text-lg text-brand-muted max-w-xl mx-auto">
            Built something good? List it on Skillzy. Keep 80% of every sale.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/signin?intent=sell"
              className="bg-brand-yellow text-brand-ink font-bold px-8 py-4 rounded-full text-base hover:bg-brand-yellow-dark transition-colors"
            >
              Start Selling
            </Link>
            <Link
              href="/marketplace"
              className="border-2 border-brand-ink text-brand-ink font-semibold px-8 py-4 rounded-full text-base hover:bg-brand-ink hover:text-white transition-colors"
            >
              See What Sells
            </Link>
          </div>
        </div>
      </section>

      {/* Economics */}
      <section className="px-5 sm:px-6 lg:px-8 py-14 sm:py-20 bg-slate-50 border-y border-brand-line">
        <div className="max-w-page mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-2xl border border-brand-line p-7">
            <p className="text-5xl font-extrabold text-brand-purple">80%</p>
            <p className="mt-2 font-semibold text-brand-ink">You keep</p>
            <p className="mt-1 text-sm text-brand-muted">
              On every sale. More generous than Ramp. Matches Agensi.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-brand-line p-7">
            <p className="text-5xl font-extrabold text-brand-purple">$0</p>
            <p className="mt-2 font-semibold text-brand-ink">To list</p>
            <p className="mt-1 text-sm text-brand-muted">
              No listing fees. No subscription. Pay nothing until you earn.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-brand-line p-7">
            <p className="text-5xl font-extrabold text-brand-purple">1</p>
            <p className="mt-2 font-semibold text-brand-ink">Click to connect Stripe</p>
            <p className="mt-1 text-sm text-brand-muted">
              Only when you’re ready to publish. Payouts go straight to your account.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-page mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight mb-10">
            How it works
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {steps.map((s) => (
              <li
                key={s.n}
                className="bg-white rounded-2xl border border-brand-line p-6"
              >
                <span className="text-sm font-bold text-brand-purple">{s.n}</span>
                <h3 className="mt-3 font-bold text-brand-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-brand-muted">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Agent Setups callout */}
      <section className="px-5 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <div className="max-w-page mx-auto">
          <div className="rounded-3xl border border-brand-line p-6 sm:p-12 bg-white">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-purple mb-3">
              Highest-value tier
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
              Agent Setups sell for more.
            </h2>
            <p className="mt-4 text-brand-muted max-w-2xl">
              A full plug-and-play agent for a specific niche — real estate, builders, bookkeeping, anything — bundles all the skills, prompts, integrations, and a setup guide into one purchase. Price them from $49 to $499+.
            </p>
            <Link
              href="/signin?intent=sell"
              className="inline-block mt-7 bg-brand-ink text-white font-bold px-7 py-3.5 rounded-full text-sm hover:bg-brand-purple transition-colors"
            >
              Publish your first Agent Setup
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
