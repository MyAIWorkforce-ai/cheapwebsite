import Link from 'next/link'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'IP & Takedown Policy — Skillzy',
  description:
    'How to report infringing or unsafe Products on Skillzy, how takedowns and counter-notices work, and our repeat-infringer policy.',
  path: '/dmca',
})

const UPDATED = '18 May 2026'

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl tracking-tight">{children}</h2>
}

export default function DmcaPage() {
  return (
    <article className="paper px-6 lg:px-10 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto">
        <span className="label-cap text-brand-gold">Fine print</span>
        <h1
          className="font-display mt-5 text-5xl sm:text-6xl tracking-tight"
          style={{ letterSpacing: '-0.025em' }}
        >
          IP &amp; Takedown.
        </h1>
        <p className="mt-3 label-cap text-brand-muted">
          Last updated — {UPDATED}
        </p>

        <div className="mt-12 space-y-10 text-base leading-relaxed">
          <p>
            Listings on Skillzy publish instantly and are not pre-screened.
            We rely on a notice-and-takedown process to keep the marketplace
            clean. If something infringes your rights, is unsafe, or breaks
            our{' '}
            <Link
              href="/terms"
              className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
            >
              Terms
            </Link>
            , tell us and we’ll act.
          </p>

          <section className="space-y-3">
            <H2>Report a Product</H2>
            <p className="text-brand-muted">
              Email{' '}
              <a
                href="mailto:help@skillzy.ai?subject=Takedown%20notice"
                className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
              >
                help@skillzy.ai
              </a>{' '}
              with:
            </p>
            <ul className="space-y-2 text-brand-muted list-disc pl-5">
              <li>the listing URL or title;</li>
              <li>
                what’s wrong — e.g. it copies your work, contains malware, is
                misleading or unlawful;
              </li>
              <li>
                for IP claims: identification of the original work and your
                authority to act for the rights holder;
              </li>
              <li>
                a statement that your report is accurate and made in good
                faith, and your contact details.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <H2>What we do</H2>
            <p className="text-brand-muted">
              We review reports promptly. We may remove or disable a listing,
              withhold funds tied to a disputed sale, and notify the seller.
              Where there’s a clear safety risk (e.g. malware), we may act
              first and review after.
            </p>
          </section>

          <section className="space-y-3">
            <H2>Counter-notice</H2>
            <p className="text-brand-muted">
              If your listing was removed and you believe that was a mistake
              or that you hold the rights, reply to our notice with your
              explanation and evidence. If appropriate, we may reinstate the
              listing.
            </p>
          </section>

          <section className="space-y-3">
            <H2>Repeat infringers</H2>
            <p className="text-brand-muted">
              Accounts that repeatedly upload infringing or unsafe Products
              will be terminated, and we may report serious cases to the
              relevant authorities.
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
