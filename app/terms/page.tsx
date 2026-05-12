export const metadata = {
  title: 'Terms — Skillzy',
  description: 'Skillzy terms of service.',
}

export default function TermsPage() {
  return (
    <article className="px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-ink">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-brand-muted">Last updated: when we launch.</p>

        <div className="mt-8 space-y-6 text-base text-brand-ink">
          <p>
            These terms govern your use of Skillzy. By using the site you agree to them. If anything is unclear, email{' '}
            <a href="mailto:hello@skillzy.com" className="text-brand-purple font-semibold">hello@skillzy.com</a>.
          </p>

          <section>
            <h2 className="text-xl font-bold">The marketplace</h2>
            <p className="mt-2 text-brand-muted">
              Skillzy is a marketplace for skills, guides, and agent setups. Creators publish products; buyers purchase them. Skillzy retains 20% commission on each sale; creators keep 80%.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">Creator content</h2>
            <p className="mt-2 text-brand-muted">
              You own what you publish. You grant Skillzy the right to display, distribute, and deliver your product to buyers who purchase it. You confirm that you have the right to sell every file in your listing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">Refunds</h2>
            <p className="mt-2 text-brand-muted">
              If a product is broken, materially misrepresented, or malicious, you’re entitled to a refund. Open a request from your dashboard and our team will review.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">Acceptable use</h2>
            <p className="mt-2 text-brand-muted">
              No malware, no copyright theft, no fraud. We scan every upload and review first-time creators. Listings that break the rules are removed.
            </p>
          </section>

          <p className="text-brand-muted italic">
            This is a placeholder. Full legal terms will replace this page before public launch.
          </p>
        </div>
      </div>
    </article>
  )
}
