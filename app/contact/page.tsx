export const metadata = {
  title: 'Contact — Skillzy',
  description: 'Get in touch with the Skillzy team.',
}

export default function ContactPage() {
  return (
    <article className="paper px-6 lg:px-10 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        <span className="label-cap text-brand-emerald">Contact</span>
        <h1
          className="font-display mt-5 text-5xl sm:text-7xl tracking-tight"
          style={{ letterSpacing: '-0.025em' }}
        >
          Say hello.
        </h1>

        <dl className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-px bg-brand-hairline border border-brand-hairline">
          <div className="bg-brand-cream-card p-8">
            <dt className="label-cap text-brand-emerald">General</dt>
            <dd className="mt-3">
              <a
                href="mailto:hello@skillzy.com"
                className="font-display text-2xl border-b border-brand-ink hover:text-brand-emerald hover:border-brand-emerald pb-0.5"
              >
                hello@skillzy.com
              </a>
            </dd>
            <p className="mt-3 text-sm text-brand-muted">
              Buyer support, creator onboarding, partnerships.
            </p>
          </div>
          <div className="bg-brand-cream-card p-8">
            <dt className="label-cap text-brand-emerald">Trust &amp; safety</dt>
            <dd className="mt-3">
              <a
                href="mailto:safety@skillzy.com"
                className="font-display text-2xl border-b border-brand-ink hover:text-brand-emerald hover:border-brand-emerald pb-0.5"
              >
                safety@skillzy.com
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
