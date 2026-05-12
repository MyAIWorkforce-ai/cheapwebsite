export const metadata = {
  title: 'Privacy — Skillzy',
  description: 'Skillzy privacy policy.',
}

export default function PrivacyPage() {
  return (
    <article className="px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-ink">
          Privacy
        </h1>
        <p className="mt-3 text-sm text-brand-muted">Last updated: when we launch.</p>

        <div className="mt-8 space-y-6 text-base text-brand-ink">
          <p>
            Skillzy collects only what we need to run the marketplace: your email, your purchases, and (for creators) your Stripe-connected payout details.
          </p>

          <section>
            <h2 className="text-xl font-bold">What we store</h2>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-brand-muted">
              <li>Account email and authentication.</li>
              <li>Purchase history and download receipts.</li>
              <li>For creators: listing files, payout account reference (Stripe holds the financial details — not us).</li>
              <li>Basic site analytics — page views, no fingerprinting.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold">What we don’t do</h2>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-brand-muted">
              <li>We don’t sell your data.</li>
              <li>We don’t share it with advertisers.</li>
              <li>We don’t email you more than you ask for.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold">Contact</h2>
            <p className="mt-2 text-brand-muted">
              Privacy questions or data deletion requests:{' '}
              <a href="mailto:hello@skillzy.com" className="text-brand-purple font-semibold">hello@skillzy.com</a>.
            </p>
          </section>

          <p className="text-brand-muted italic">
            This is a placeholder. Full privacy policy will replace this page before public launch.
          </p>
        </div>
      </div>
    </article>
  )
}
