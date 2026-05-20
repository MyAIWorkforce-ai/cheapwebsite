import Link from 'next/link'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Privacy Policy — Skillzy',
  description:
    'What Skillzy collects, why, who processes it, how long we keep it, and the rights you have over your data.',
  path: '/privacy',
})

const UPDATED = '18 May 2026'

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl tracking-tight">{children}</h2>
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
          Privacy Policy.
        </h1>
        <p className="mt-3 label-cap text-brand-muted">
          Last updated — {UPDATED}
        </p>

        <div className="mt-12 space-y-10 text-base leading-relaxed">
          <p>
            This policy explains how Skillzy (operated from Australia)
            handles personal information, consistent with the Australian
            Privacy Principles. We collect only what we need to run the
            marketplace.
          </p>

          <section className="space-y-3">
            <H2>What we collect</H2>
            <ul className="space-y-2 text-brand-muted list-disc pl-5">
              <li>
                <strong>Account:</strong> email, password hash (via our auth
                provider), and any name or handle you add.
              </li>
              <li>
                <strong>Purchases:</strong> the listing bought, your buyer
                email, amount, timestamp, and download receipts — so you can
                re-download and we can support you.
              </li>
              <li>
                <strong>Seller data:</strong> the files and listing content
                you upload, and a Stripe payout reference. We never see your
                full bank or card details.
              </li>
              <li>
                <strong>Payment data:</strong> handled entirely by Stripe.
                Card numbers are entered on a Stripe-secured field and never
                touch Skillzy’s servers.
              </li>
              <li>
                <strong>AI draft assist:</strong> if you use it, the brief or
                files you submit to draft a listing are sent to our AI
                provider to generate the draft. Don’t paste secrets.
              </li>
              <li>
                <strong>Cookies:</strong> a sign-in session cookie, and
                short-lived referral cookies (which creator/channel sent you)
                so creators get attributed. No advertising or
                cross-site-tracking cookies.
              </li>
              <li>
                <strong>Basic analytics &amp; logs:</strong> aggregate page
                usage and error logs. No fingerprinting.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <H2>Why we use it</H2>
            <p className="text-brand-muted">
              To create your account, process and deliver purchases, pay
              sellers, provide support, send transactional email (receipts,
              download links, seller share kits), prevent fraud and abuse,
              meet legal obligations, and — only if you opt in — send the
              newsletter. You can unsubscribe from the newsletter any time.
            </p>
          </section>

          <section className="space-y-3">
            <H2>Who processes it</H2>
            <p className="text-brand-muted">
              We share data with processors strictly to run the service:
              <strong> Stripe</strong> (payments &amp; payouts),{' '}
              <strong>Supabase</strong> (database, auth, file storage),{' '}
              <strong>Resend</strong> (transactional &amp; newsletter email),
              our <strong>AI provider</strong> (listing-draft assist only),
              and our hosting provider. Some processors are located overseas
              (including the United States), so your data may be processed
              outside Australia under their safeguards. We never sell your
              data or share it with advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <H2>Retention</H2>
            <p className="text-brand-muted">
              We keep account and transaction records while your account is
              active and as long as needed for tax, accounting, and legal
              obligations, then delete or anonymise them. You can ask us to
              delete your account; some records may be retained where the law
              requires.
            </p>
          </section>

          <section className="space-y-3">
            <H2>Security</H2>
            <p className="text-brand-muted">
              Access is restricted, transport is encrypted, seller files are
              stored in a private bucket served only via expiring,
              ownership-checked links, and payment data is isolated at
              Stripe. No system is perfectly secure, but we take reasonable
              steps to protect your information.
            </p>
          </section>

          <section className="space-y-3">
            <H2>Your rights</H2>
            <p className="text-brand-muted">
              You can request access to, correction of, or deletion of your
              personal information, and raise a privacy concern. Email{' '}
              <a
                href="mailto:hi@skillzy.ai"
                className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
              >
                hi@skillzy.ai
              </a>{' '}
              and we’ll respond within a reasonable time. If you’re
              unsatisfied you may contact the Office of the Australian
              Information Commissioner.
            </p>
          </section>

          <section className="space-y-3">
            <H2>Changes</H2>
            <p className="text-brand-muted">
              We’ll update this policy as the service evolves; the “last
              updated” date reflects the current version. See also our{' '}
              <Link
                href="/terms"
                className="border-b border-brand-muted hover:text-brand-ink hover:border-brand-ink"
              >
                Terms
              </Link>{' '}
              and{' '}
              <Link
                href="/refunds"
                className="border-b border-brand-muted hover:text-brand-ink hover:border-brand-ink"
              >
                Refund Policy
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </article>
  )
}
