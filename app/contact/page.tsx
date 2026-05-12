export const metadata = {
  title: 'Contact — Skillzy',
  description: 'Get in touch with the Skillzy team.',
}

export default function ContactPage() {
  return (
    <article className="px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-ink">
          Contact
        </h1>

        <div className="mt-8 space-y-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-purple">
              General
            </p>
            <p className="mt-2 text-lg">
              <a href="mailto:hello@skillzy.com" className="text-brand-ink font-semibold hover:text-brand-purple">
                hello@skillzy.com
              </a>
            </p>
            <p className="text-brand-muted text-sm">
              Buyer support, creator onboarding, partnerships.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-purple">
              Trust & safety
            </p>
            <p className="mt-2 text-lg">
              <a href="mailto:safety@skillzy.com" className="text-brand-ink font-semibold hover:text-brand-purple">
                safety@skillzy.com
              </a>
            </p>
            <p className="text-brand-muted text-sm">
              Report a listing or a security concern. Every report gets a human review.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
