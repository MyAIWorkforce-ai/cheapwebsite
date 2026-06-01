import Link from 'next/link'
import { pageMetadata } from '@/lib/seo'
import FindOrderForm from './FindOrderForm'

export const metadata = pageMetadata({
  title: 'Find my order — Skillzy',
  description:
    "Lost your purchase email? Enter the email you used at checkout and we'll resend a fresh download link. No account required.",
  path: '/find-my-order',
  keywords: ['find my order', 'resend download', 'lost receipt', 'Skillzy'],
})

export default function FindMyOrderPage() {
  return (
    <article className="paper px-6 lg:px-10 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
          Find my order
        </span>
        <h1
          className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[0.95]"
          style={{ letterSpacing: '-0.03em' }}
        >
          Lost your{' '}
          <em className="italic text-brand-gold font-medium">link?</em>
        </h1>
        <p className="mt-5 text-brand-muted max-w-prose text-lg leading-relaxed">
          Pop in the email you used at checkout and we&rsquo;ll resend the
          download link. No account needed — the link in the email keeps
          working forever and re-verifies your purchase every time you open it.
        </p>

        <FindOrderForm />

        <div className="mt-16 pt-10 border-t border-brand-hairline">
          <p className="label-cap text-brand-gold">Already have an account?</p>
          <p className="mt-3 text-brand-muted max-w-prose">
            Sign in with the same email you used to buy and your purchases
            attach to your account automatically — they&rsquo;ll show up in
            your{' '}
            <Link
              href="/dashboard"
              className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
            >
              dashboard
            </Link>{' '}
            with permanent re-downloads.
          </p>
          <p className="mt-6 text-brand-muted max-w-prose">
            Still stuck? Email{' '}
            <a
              href="mailto:hi@skillzy.ai"
              className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
            >
              hi@skillzy.ai
            </a>{' '}
            with anything you remember — the rough date, the listing name,
            the card&rsquo;s last four. A human reads every one.
          </p>
        </div>
      </div>
    </article>
  )
}
