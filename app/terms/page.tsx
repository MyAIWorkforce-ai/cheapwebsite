import Link from 'next/link'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Terms of Service — Skillzy',
  description:
    'The agreement between you and Skillzy — buyers, sellers, payments, payouts, content rights, acceptable use, and how disputes are handled.',
  path: '/terms',
})

const UPDATED = '18 May 2026'

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl tracking-tight">{children}</h2>
  )
}

export default function TermsPage() {
  return (
    <article className="paper px-6 lg:px-10 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto">
        <span className="label-cap text-brand-gold">Fine print</span>
        <h1
          className="font-display mt-5 text-5xl sm:text-6xl tracking-tight"
          style={{ letterSpacing: '-0.025em' }}
        >
          Terms of Service.
        </h1>
        <p className="mt-3 label-cap text-brand-muted">
          Last updated — {UPDATED}
        </p>

        <div className="mt-12 space-y-10 text-base leading-relaxed">
          <p>
            These Terms govern your use of Skillzy (the “Platform”), a
            marketplace for skills, guides, and ready-to-go agent setups
            (“Products”). Skillzy is operated from Australia (“Skillzy”,
            “we”, “us”). By creating an account, listing a Product, or
            buying one, you agree to these Terms. If you’re using Skillzy
            for an organisation, you confirm you’re authorised to bind it.
            Questions:{' '}
            <a
              href="mailto:hi@skillzy.ai"
              className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
            >
              hi@skillzy.ai
            </a>
            .
          </p>

          <section className="space-y-3">
            <H2>1. The marketplace</H2>
            <p className="text-brand-muted">
              Skillzy connects sellers who publish Products with buyers who
              purchase them. Skillzy is a venue — we are not the author,
              publisher, or guarantor of any Product, and we are not a party
              to the contract of sale between a buyer and a seller. We charge
              a 20% platform commission on each sale; the seller receives the
              remaining 80% via their connected Stripe account (see §6).
            </p>
          </section>

          <section className="space-y-3">
            <H2>2. Accounts</H2>
            <p className="text-brand-muted">
              You must provide accurate details and keep your login secure.
              You’re responsible for activity under your account. You must be
              at least 18 (or the age of majority where you live) and not
              barred from using the Platform under any applicable law or
              sanctions list. We may suspend or close accounts that breach
              these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <H2>3. Buying a Product</H2>
            <p className="text-brand-muted">
              Prices are shown and charged in US dollars (USD); your bank may
              apply conversion or card fees we don’t control. Products are
              digital and delivered immediately after payment by email and a
              secure download link. On purchase you receive a personal,
              non-exclusive, non-transferable, perpetual licence to use the
              Product, including for your commercial work, unless the
              seller’s listing states narrower terms. You may not resell,
              redistribute, or publish the Product itself as a standalone or
              competing item. Refunds are covered by our{' '}
              <Link
                href="/refunds"
                className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
              >
                Refund Policy
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <H2>4. Selling a Product</H2>
            <p className="text-brand-muted">
              Listings go live immediately when you submit them — there is no
              prior human review or automated malware scanning. Because of
              that, you alone are responsible for everything you upload. By
              publishing a Product you represent and warrant, for every file
              and every word in the listing, that:
            </p>
            <ul className="space-y-2 text-brand-muted list-disc pl-5">
              <li>
                you own it or are validly licensed to sell and distribute it,
                and the sale doesn’t infringe anyone’s intellectual property,
                privacy, or other rights;
              </li>
              <li>
                it contains no malware, backdoors, credential harvesters, or
                code designed to harm, deceive, or exfiltrate data;
              </li>
              <li>
                it isn’t unlawful, fraudulent, misleading, or in breach of
                the Australian Consumer Law or any law that applies to your
                buyers; and
              </li>
              <li>
                your listing accurately describes what the buyer receives —
                no fake claims, results, or “as seen” screenshots.
              </li>
            </ul>
            <p className="text-brand-muted">
              You grant Skillzy a worldwide, royalty-free licence to host,
              display, market, and deliver your Product and listing media to
              buyers and to operate and promote the Platform. You keep all
              ownership. You’re responsible for your own tax. You indemnify
              Skillzy against claims, losses, and costs arising from your
              Products or your breach of these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <H2>5. Acceptable use &amp; content removal</H2>
            <p className="text-brand-muted">
              Prohibited: malware or malicious code; infringing, stolen, or
              counterfeit material; illegal content; content that deceives
              buyers; scraping, reverse-engineering, or attacking the
              Platform. We don’t pre-screen Products, but we operate a
              notice-and-takedown process: report anything at{' '}
              <a
                href="mailto:hi@skillzy.ai"
                className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
              >
                hi@skillzy.ai
              </a>{' '}
              and see our{' '}
              <Link
                href="/dmca"
                className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
              >
                IP &amp; takedown policy
              </Link>
              . We may remove any listing, withhold funds linked to a
              disputed or unlawful sale, and terminate repeat infringers, at
              our discretion and without notice where the risk warrants it.
            </p>
          </section>

          <section className="space-y-3">
            <H2>6. Payments &amp; payouts</H2>
            <p className="text-brand-muted">
              Payments are processed by Stripe; Skillzy never sees or stores
              full card details. Sellers are paid through Stripe Connect —
              Skillzy does not hold seller funds; Stripe pays the seller
              directly on Stripe’s schedule, net of the 20% platform
              commission (which covers Stripe’s own processing fees). You
              must complete Stripe’s
              onboarding and identity checks before payouts can run. If a
              sale is refunded or charged back, the corresponding amount
              (including any platform commission already attributed) may be
              reversed from the seller.
            </p>
          </section>

          <section className="space-y-3">
            <H2>7. Consumer rights</H2>
            <p className="text-brand-muted">
              Nothing in these Terms excludes, restricts, or modifies any
              guarantee, right, or remedy you have under the Australian
              Consumer Law or other law that cannot be excluded. Where we are
              permitted to limit liability, our liability is limited to
              resupplying the Product or refunding the amount you paid for
              it.
            </p>
          </section>

          <section className="space-y-3">
            <H2>8. Disclaimers &amp; liability</H2>
            <p className="text-brand-muted">
              Except for non-excludable rights (§7), the Platform and
              Products are provided “as is”. Skillzy doesn’t warrant that any
              Product is fit for your purpose, accurate, secure, or free of
              faults, and isn’t liable for indirect or consequential loss, or
              for loss arising from a seller’s Product or conduct. To the
              extent permitted by law, our total liability to you for any
              claim is capped at the greater of the amount you paid on the
              Platform in the prior 12 months or USD 100.
            </p>
          </section>

          <section className="space-y-3">
            <H2>9. Changes &amp; termination</H2>
            <p className="text-brand-muted">
              We may update these Terms; material changes will be reflected
              by the “last updated” date and, where significant, flagged in
              the product. Continued use means you accept the change. You may
              stop using Skillzy at any time. We may suspend or end access
              for breach.
            </p>
          </section>

          <section className="space-y-3">
            <H2>10. Governing law</H2>
            <p className="text-brand-muted">
              These Terms are governed by the laws of Australia, and you and
              Skillzy submit to the non-exclusive jurisdiction of the courts
              of Australia. If any clause is unenforceable, the rest stays in
              force.
            </p>
          </section>

          <p className="text-sm text-brand-muted">
            See also our{' '}
            <Link
              href="/privacy"
              className="border-b border-brand-muted hover:text-brand-ink hover:border-brand-ink"
            >
              Privacy Policy
            </Link>
            ,{' '}
            <Link
              href="/refunds"
              className="border-b border-brand-muted hover:text-brand-ink hover:border-brand-ink"
            >
              Refund Policy
            </Link>
            , and{' '}
            <Link
              href="/dmca"
              className="border-b border-brand-muted hover:text-brand-ink hover:border-brand-ink"
            >
              IP &amp; Takedown Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </article>
  )
}
