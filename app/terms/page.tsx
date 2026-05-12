export const metadata = {
  title: 'Terms — Skillzy',
  description: 'Skillzy terms of service.',
}

export default function TermsPage() {
  return (
    <article className="paper px-6 lg:px-10 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto">
        <span className="label-cap text-brand-emerald">Fine print</span>
        <h1
          className="font-display mt-5 text-5xl sm:text-6xl tracking-tight"
          style={{ letterSpacing: '-0.025em' }}
        >
          Terms.
        </h1>
        <p className="mt-3 label-cap text-brand-muted">Last updated — at launch.</p>

        <div className="mt-12 space-y-10 text-base leading-relaxed">
          <p>
            By using Skillzy, you agree to these terms. If anything’s unclear,
            email{' '}
            <a
              href="mailto:hello@skillzy.com"
              className="border-b border-brand-ink hover:text-brand-emerald hover:border-brand-emerald pb-0.5"
            >
              hello@skillzy.com
            </a>
            .
          </p>

          <section>
            <h2 className="font-display text-2xl tracking-tight">The marketplace</h2>
            <p className="mt-3 text-brand-muted">
              Skillzy is a marketplace for skills, guides, and agent setups.
              Creators publish; buyers purchase. Skillzy keeps 20% commission;
              creators keep 80%.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl tracking-tight">Creator content</h2>
            <p className="mt-3 text-brand-muted">
              You own what you publish. You grant Skillzy the right to display,
              distribute, and deliver it to buyers. You confirm you have the
              right to sell everything in your listing.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl tracking-tight">Refunds</h2>
            <p className="mt-3 text-brand-muted">
              If a product is broken, materially misrepresented, or malicious,
              you’re entitled to a refund. Open a request from your dashboard.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl tracking-tight">Acceptable use</h2>
            <p className="mt-3 text-brand-muted">
              No malware, no copyright theft, no fraud. Every upload is
              scanned. First-time creators are reviewed. Listings that break
              the rules are removed.
            </p>
          </section>

          <p className="text-brand-muted italic">
            Placeholder. Full terms will replace this page before public launch.
          </p>
        </div>
      </div>
    </article>
  )
}
