import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Contact Skillzy — Support, Creators & Trust',
  description:
    'Get in touch with the Skillzy team — buyer support, creator onboarding, partnerships, and trust + safety. A human reads every message.',
  path: '/contact',
  keywords: ['contact Skillzy', 'support', 'trust and safety'],
})

export default function ContactPage() {
  return (
    <article className="paper px-6 lg:px-10 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
          Contact
        </span>
        <h1
          className="font-display mt-5 text-5xl sm:text-7xl tracking-tight"
          style={{ letterSpacing: '-0.03em' }}
        >
          Say{' '}
          <em className="italic text-brand-gold font-medium">hello.</em>
        </h1>

        <dl className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-px bg-brand-hairline border border-brand-hairline">
          <div className="bg-brand-cream-card p-8">
            <dt className="label-cap text-brand-gold">General</dt>
            <dd className="mt-3">
              <a
                href="mailto:hi@skillzy.ai"
                className="font-display text-2xl border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
              >
                hi@skillzy.ai
              </a>
            </dd>
            <p className="mt-3 text-sm text-brand-muted">
              Buyer support, creator onboarding, partnerships.
            </p>
          </div>
          <div className="bg-brand-cream-card p-8">
            <dt className="label-cap text-brand-gold">Trust &amp; safety</dt>
            <dd className="mt-3">
              <a
                href="mailto:help@skillzy.ai"
                className="font-display text-2xl border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
              >
                help@skillzy.ai
              </a>
            </dd>
            <p className="mt-3 text-sm text-brand-muted">
              Report a listing or a security concern. A human reads every one.
            </p>
          </div>
        </dl>
      </div>
    </article>
  )
}
