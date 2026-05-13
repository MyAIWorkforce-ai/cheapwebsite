export const metadata = {
  title: 'Privacy — Skillzy',
  description: 'Skillzy privacy policy.',
}

export default function PrivacyPage() {
  return (
    <article className="paper px-6 lg:px-10 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto">
        <span className="label-cap text-brand-gold">Fine print</span>
        <h1
          className="font-display mt-5 text-5xl sm:text-6xl tracking-tight"
          style={{ letterSpacing: '-0.025em' }}
        >
          Privacy.
        </h1>
        <p className="mt-3 label-cap text-brand-muted">Last updated — at launch.</p>

        <div className="mt-12 space-y-10 text-base leading-relaxed">
          <p>
            Skillzy collects only what we need to run the marketplace: your
            email, your purchases, and (for creators) your Stripe-connected
            payout details.
          </p>

          <section>
            <h2 className="font-display text-2xl tracking-tight">What we store</h2>
            <ul className="mt-3 space-y-2 text-brand-muted list-disc pl-5">
              <li>Account email and authentication.</li>
              <li>Purchase history and download receipts.</li>
              <li>For creators — listing files and a Stripe payout reference. Stripe holds the financial details, not us.</li>
              <li>Basic page analytics. No fingerprinting.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl tracking-tight">What we don’t do</h2>
            <ul className="mt-3 space-y-2 text-brand-muted list-disc pl-5">
              <li>We don’t sell your data.</li>
              <li>We don’t share it with advertisers.</li>
              <li>We don’t email you more than you ask for.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl tracking-tight">Contact</h2>
            <p className="mt-3 text-brand-muted">
              Data deletion or privacy questions:{' '}
              <a
                href="mailto:hi@skillzy.ai"
                className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
              >
                hi@skillzy.ai
              </a>
              .
            </p>
          </section>

        </div>
      </div>
    </article>
  )
}
