import Link from 'next/link'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Refer & Earn — Get 5% on Every Creator You Refer | Skillzy',
  description:
    'Every Skillzy account comes with an affiliate link. Refer a creator who signs up and sells, and you earn 5% of their sales — paid from Skillzy’s cut, never theirs. You don’t need to list a thing.',
  path: '/affiliates',
  keywords: [
    'Skillzy affiliate',
    'refer and earn',
    'AI marketplace affiliate program',
    'earn 5% referrals',
  ],
})

const steps = [
  {
    n: '01',
    title: 'Get your link',
    body: 'Every Skillzy account already has one — it’s skillzy.ai/?aff=your-handle. Find it on your dashboard under “Refer & earn.” No separate signup, no application.',
  },
  {
    n: '02',
    title: 'Share it',
    body: 'Post it anywhere — socials, your audience, a DM to a mate who builds agents. When a new creator signs up through your link, they’re tied to you.',
  },
  {
    n: '03',
    title: 'Earn 5%',
    body: 'Every sale that creator makes books you 5%, paid out via Stripe. It comes out of Skillzy’s share — never the creator’s 80%, and never an extra charge to the buyer.',
  },
]

const faqs = [
  {
    q: 'Do I need to sell anything myself?',
    a: 'No. Anyone with an account can refer — creators, buyers, or influencers who never list a thing. Your 5% is paid on top of anything you make selling your own work.',
  },
  {
    q: 'Does it cost the creator I refer?',
    a: 'Never. Your commission comes out of Skillzy’s 20% platform fee. The creator still keeps a clean 80%, and the buyer pays the same price.',
  },
  {
    q: 'How do I get paid?',
    a: 'Connect Stripe (the same one-click flow creators use) and your affiliate earnings pay out on a schedule, straight to your account.',
  },
  {
    q: 'Where do I see my referrals and earnings?',
    a: 'On your dashboard — the “Refer & earn” panel shows your link, how many creators you’ve referred, and your pending earnings.',
  },
]

export default function AffiliatesPage() {
  return (
    <div className="paper">
      {/* hero */}
      <section className="px-6 lg:px-10 pt-16 sm:pt-24 pb-16 sm:pb-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Refer &amp; earn
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[0.95] max-w-3xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            Refer creators.{' '}
            <em className="italic text-brand-gold font-medium">Earn 5%.</em>
          </h1>
          <p className="mt-7 text-xl text-brand-ink max-w-2xl leading-snug">
            Every Skillzy account comes with an affiliate link. Anyone who signs
            up through it and sells earns you <strong>5% of their sales</strong>{' '}
            — paid on top of whatever you make yourself. You don’t need to list a
            thing.
          </p>
          <div className="mt-9 flex items-center gap-6 flex-wrap">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
            >
              Get started
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-brand-ink hover:text-brand-gold transition-colors border-b border-brand-ink hover:border-brand-gold pb-0.5"
            >
              Already have an account? Get your link
            </Link>
          </div>
        </div>
      </section>

      {/* steps */}
      <section className="px-6 lg:px-10 py-20 sm:py-28 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <h2
            className="font-display text-4xl sm:text-6xl tracking-tight max-w-3xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            Three steps.{' '}
            <em className="italic text-brand-gold font-medium">No catch.</em>
          </h2>
          <ol className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
            {steps.map((s) => (
              <li key={s.n} className="bg-brand-cream-card p-7 sm:p-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                  №{s.n}
                </span>
                <h3
                  className="font-display text-2xl mt-4 tracking-tight"
                  style={{ letterSpacing: '-0.018em' }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* the math */}
      <section className="px-6 lg:px-10 py-20 sm:py-28 border-b border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <header className="lg:col-span-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Where the money comes from
            </span>
            <h2
              className="font-display mt-3 text-3xl sm:text-5xl tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              Your cut never touches theirs.
            </h2>
            <p className="mt-5 text-lg text-brand-muted leading-relaxed max-w-prose">
              Your 5% is carved out of Skillzy’s platform fee — so the creator
              you refer is no worse off, and neither is the buyer.
            </p>
          </header>
          <div className="lg:col-span-7 lg:flex lg:justify-end">
            <div className="w-full max-w-md bg-brand-cream-card border border-brand-hairline p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Example — a $20 sale
              </p>
              <dl className="mt-5 divide-y divide-brand-hairline">
                <div className="flex items-baseline justify-between py-3">
                  <dt className="text-brand-ink">Creator keeps (80%)</dt>
                  <dd className="font-display text-xl">$16</dd>
                </div>
                <div className="flex items-baseline justify-between py-3">
                  <dt className="text-brand-gold-dark font-semibold">You earn (5%)</dt>
                  <dd className="font-display text-xl text-brand-gold-dark">$1</dd>
                </div>
                <div className="flex items-baseline justify-between py-3">
                  <dt className="text-brand-muted">Skillzy keeps (15%)</dt>
                  <dd className="font-display text-xl text-brand-muted">$3</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-brand-muted">
                Buyer pays the same $20 either way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="px-6 lg:px-10 py-20 sm:py-28 border-b border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              FAQ
            </span>
            <h2
              className="font-display mt-3 text-3xl sm:text-4xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Refer &amp; earn, answered.
            </h2>
          </header>
          <dl className="lg:col-span-8 divide-y divide-brand-hairline border-y border-brand-hairline">
            {faqs.map((f, i) => (
              <div key={i} className="py-6">
                <dt
                  className="font-display text-xl tracking-tight"
                  style={{ letterSpacing: '-0.018em' }}
                >
                  {f.q}
                </dt>
                <dd className="mt-2 text-brand-muted leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* cta */}
      <section className="px-6 lg:px-10 py-20 sm:py-28">
        <div className="max-w-page mx-auto text-center">
          <h2
            className="font-display text-4xl sm:text-6xl tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            Start earning on every creator you bring.
          </h2>
          <div className="mt-9">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
            >
              Get started
              <span aria-hidden>→</span>
            </Link>
          </div>
          <p className="mt-5 text-xs text-brand-muted">
            Full details in the{' '}
            <Link href="/terms" className="border-b border-brand-muted hover:text-brand-ink hover:border-brand-ink">
              affiliate terms
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
