import Link from 'next/link'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Refund Policy — Skillzy',
  description:
    'How refunds work for instant-delivery digital Products on Skillzy — all sales final, with goodwill for genuine faults and your non-excludable consumer rights preserved.',
  path: '/refunds',
})

const UPDATED = '18 May 2026'

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl tracking-tight">{children}</h2>
}

export default function RefundsPage() {
  return (
    <article className="paper px-6 lg:px-10 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto">
        <span className="label-cap text-brand-gold">Fine print</span>
        <h1
          className="font-display mt-5 text-5xl sm:text-6xl tracking-tight"
          style={{ letterSpacing: '-0.025em' }}
        >
          Refund Policy.
        </h1>
        <p className="mt-3 label-cap text-brand-muted">
          Last updated — {UPDATED}
        </p>

        <div className="mt-12 space-y-10 text-base leading-relaxed">
          <section className="space-y-3">
            <H2>All sales are final</H2>
            <p className="text-brand-muted">
              Products on Skillzy are digital and delivered immediately —
              the moment your payment clears, you receive the files by email
              and a download link. Because the Product is fully delivered at
              that point, purchases are non-refundable as a general rule, and
              by completing checkout you acknowledge this.
            </p>
          </section>

          <section className="space-y-3">
            <H2>Goodwill exceptions</H2>
            <p className="text-brand-muted">
              We want buyers treated fairly. We’ll review a refund, in good
              faith and case by case, where:
            </p>
            <ul className="space-y-2 text-brand-muted list-disc pl-5">
              <li>you were charged twice or charged in error;</li>
              <li>
                the Product is broken, doesn’t work as the listing
                describes, or was materially misrepresented;
              </li>
              <li>the Product contains malicious or unsafe content; or</li>
              <li>the purchase was unauthorised.</li>
            </ul>
            <p className="text-brand-muted">
              Approved refunds are returned to your original payment method
              via Stripe. The corresponding amount is reversed from the
              seller.
            </p>
          </section>

          <section className="space-y-3">
            <H2>Your consumer rights</H2>
            <p className="text-brand-muted">
              Nothing here limits rights you have under the Australian
              Consumer Law or any other law that can’t be excluded. If a
              Product fails a consumer guarantee, you may be entitled to a
              remedy regardless of this policy.
            </p>
          </section>

          <section className="space-y-3">
            <H2>How to request one</H2>
            <p className="text-brand-muted">
              Email{' '}
              <a
                href="mailto:hi@skillzy.ai?subject=Refund%20request"
                className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
              >
                hi@skillzy.ai
              </a>{' '}
              within a reasonable time, with your order email and what went
              wrong. We usually respond within a few business days. Please
              contact us before raising a chargeback — disputes opened
              without contacting us first slow everyone down and may lead to
              account restrictions.
            </p>
          </section>

          <p className="text-sm text-brand-muted">
            See also our{' '}
            <Link
              href="/terms"
              className="border-b border-brand-muted hover:text-brand-ink hover:border-brand-ink"
            >
              Terms
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="border-b border-brand-muted hover:text-brand-ink hover:border-brand-ink"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </article>
  )
}
