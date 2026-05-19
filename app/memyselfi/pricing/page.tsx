import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Your twin and your link are free forever. Pay only when you want to scale yourself.',
}

const tiers = [
  {
    name: 'You',
    price: 'Free',
    sub: 'forever',
    line: 'Be yourself, at a link.',
    features: [
      'Your twin + public memyselfi.ai/you',
      'Up to 50 knowledge entries',
      '200 conversations / month',
      'Voice and accent controls',
      'Export or delete anytime',
    ],
    cta: 'Build my twin',
    href: '/memyselfi/create',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$19',
    sub: 'per month',
    line: 'Scale yourself.',
    features: [
      'Everything in You',
      'Unlimited knowledge + conversations',
      'Conversation analytics — see what people ask you',
      'Charge for access (you keep 90%)',
      'Custom domain · remove memyselfi badge',
      'Priority answer tuning',
    ],
    cta: 'Start Pro',
    href: '/memyselfi/signup',
    featured: true,
  },
  {
    name: 'Legacy',
    price: '$149',
    sub: 'once',
    line: 'A voice that outlasts you.',
    features: [
      'Everything in Pro, for life',
      'Hosted in perpetuity',
      'Named beneficiaries who can manage it',
      'Full archive export (yours and your family’s)',
      'White-glove import from interviews & writing',
    ],
    cta: 'Talk to us',
    href: 'mailto:hello@memyselfi.ai',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
      <div className="max-w-2xl">
        <span
          className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: 'var(--mmi-accent)' }}
        >
          Pricing
        </span>
        <h1
          className="mt-4 font-display text-4xl sm:text-6xl"
          style={{ letterSpacing: '-0.03em', color: 'var(--mmi-text)' }}
        >
          Free to be yourself.
        </h1>
        <p
          className="mt-5 text-lg leading-relaxed"
          style={{ color: 'var(--mmi-muted)' }}
        >
          Being you should never cost anything. You only pay the day you want
          your twin to work harder than you can.
        </p>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-5">
        {tiers.map((t) => (
          <div
            key={t.name}
            className="rounded-2xl border p-7 flex flex-col"
            style={{
              borderColor: t.featured ? 'var(--mmi-accent)' : 'var(--mmi-line)',
              backgroundColor: 'var(--mmi-panel)',
            }}
          >
            <div className="flex items-baseline justify-between">
              <h2
                className="text-lg font-semibold"
                style={{ color: 'var(--mmi-text)' }}
              >
                {t.name}
              </h2>
              {t.featured && (
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: 'var(--mmi-accent)' }}
                >
                  Most pick this
                </span>
              )}
            </div>
            <div className="mt-4 flex items-end gap-2">
              <span
                className="font-display text-4xl"
                style={{ color: 'var(--mmi-text)' }}
              >
                {t.price}
              </span>
              <span className="text-[13px] pb-1" style={{ color: 'var(--mmi-muted)' }}>
                {t.sub}
              </span>
            </div>
            <p className="mt-2 text-[14px]" style={{ color: 'var(--mmi-muted)' }}>
              {t.line}
            </p>
            <ul className="mt-6 space-y-2.5 flex-1">
              {t.features.map((f) => (
                <li
                  key={f}
                  className="text-[14px] flex gap-2.5"
                  style={{ color: 'var(--mmi-text)' }}
                >
                  <span style={{ color: t.featured ? 'var(--mmi-accent)' : 'var(--mmi-muted)' }}>
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={t.href}
              className="mt-7 text-center rounded-full px-5 py-3 text-sm font-semibold"
              style={
                t.featured
                  ? { backgroundColor: 'var(--mmi-accent)', color: '#0b0a14' }
                  : {
                      border: '1px solid var(--mmi-line)',
                      color: 'var(--mmi-text)',
                    }
              }
            >
              {t.cta}
            </Link>
          </div>
        ))}
      </div>

      <p
        className="mt-10 text-[13px] text-center"
        style={{ color: 'var(--mmi-muted)' }}
      >
        No card to start. Cancel Pro anytime — your free twin stays exactly
        where it is.
      </p>
    </div>
  )
}
