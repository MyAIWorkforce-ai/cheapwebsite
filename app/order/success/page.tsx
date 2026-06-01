import Link from 'next/link'
import { resolveProduct } from '@/lib/listings'
import { getStripe, hasStripe } from '@/lib/stripe'
import { fulfillPaymentIntent, orderIdFromIntent } from '@/lib/fulfillment'
import { listingFiles } from '@/lib/delivery'
import { deliveryTokenValid } from '@/lib/delivery-token'
import { getUser } from '@/lib/auth'
import GuestAccountPrompt from './GuestAccountPrompt'

export const metadata = {
  title: "You're all set",
  description: 'Your Skillzy purchase is ready to drop into your agent.',
  robots: { index: false, follow: false },
}

function Sticker({
  children,
  rotate = '-3deg',
}: {
  children: React.ReactNode
  rotate?: string
}) {
  return (
    <span
      className="inline-block font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 bg-brand-gold text-brand-ink"
      style={{ transform: `rotate(${rotate})` }}
    >
      {children}
    </span>
  )
}

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: {
    id?: string
    email?: string
    payment_intent?: string
    payment_intent_client_secret?: string
    redirect_status?: string
    t?: string
  }
}) {
  let productId = searchParams.id
  let email = searchParams.email
  let orderId =
    Math.random().toString(36).slice(2, 6) +
    Date.now().toString(36).slice(-4)

  // Files are only revealed when the visitor proves they own this
  // purchase — either the PaymentIntent client_secret (Stripe appends
  // it to the post-payment redirect) or the signed delivery token (in
  // the confirmation email). A bare/guessed ?payment_intent= shows the
  // page but NO files and triggers NO fulfilment/email.
  let verified = false
  let paidButLocked = false
  const piId = searchParams.payment_intent
  if (hasStripe && piId) {
    try {
      const stripe = getStripe()
      const intent = await stripe.paymentIntents.retrieve(piId)
      if (intent.status === 'succeeded') {
        const authorized =
          (!!intent.client_secret &&
            searchParams.payment_intent_client_secret ===
              intent.client_secret) ||
          deliveryTokenValid(piId, searchParams.t)
        productId =
          (intent.metadata?.listing_id as string | undefined) || productId
        orderId = orderIdFromIntent(intent.id)
        if (authorized) {
          verified = true
          await fulfillPaymentIntent(intent)
          email =
            intent.receipt_email ||
            (intent.metadata?.buyer_email as string | undefined) ||
            email
        } else {
          paidButLocked = true
        }
      }
    } catch (err) {
      console.error('Order-success fulfilment failed', err)
    }
  }

  const p = productId ? await resolveProduct(productId) : undefined

  // Only serve files once the payment is verified — the succeeded
  // PaymentIntent is the buyer's proof of purchase (no login needed).
  const files = verified && productId ? await listingFiles(productId) : []
  orderId = orderId.toUpperCase()
  email = email || 'you@example.com'

  // Guests who paid without an account need a clear next step: add a
  // password to the same email so the purchase auto-attaches to their
  // dashboard. Skip this for signed-in buyers (they already own it).
  const signedIn = await getUser()
  const showGuestPrompt =
    !signedIn && verified && email !== 'you@example.com'

  return (
    <div className="paper">
      <section className="px-6 lg:px-10 pt-16 sm:pt-24 pb-20 sm:pb-28">
        <div className="max-w-page mx-auto">
          <Sticker rotate="-2.5deg">You’re all set.</Sticker>

          <h1
            className="font-display mt-7 text-[3.5rem] sm:text-[6.5rem] lg:text-[8rem] leading-[0.9] tracking-tight"
            style={{ letterSpacing: '-0.035em' }}
          >
            That was{' '}
            <em className="italic text-brand-gold font-medium">easy.</em>
          </h1>

          <p className="mt-8 text-xl text-brand-ink max-w-2xl">
            Your bundle is on its way to{' '}
            <span className="font-semibold">{email}</span>. It’ll also live on
            your dashboard, re-downloadable forever.
          </p>

          {p && (
            <div className="mt-12 bg-brand-cream-card border border-brand-ink p-7 sm:p-9 max-w-3xl">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                    {p.type} · {p.platformList.join(' · ')}
                  </p>
                  <p
                    className="font-display mt-3 text-3xl sm:text-4xl tracking-tight leading-tight"
                    style={{ letterSpacing: '-0.025em' }}
                  >
                    {p.title}
                  </p>
                  <p className="mt-2 text-sm text-brand-muted">
                    by {p.creator.name}
                  </p>
                </div>
                <span
                  className="font-display text-3xl text-brand-gold"
                  style={{ letterSpacing: '-0.025em' }}
                >
                  {p.price}
                </span>
              </div>

              <div className="mt-7 pt-6 border-t border-brand-hairline">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted mb-4">
                  Download now
                </p>
                {paidButLocked ? (
                  <p className="text-sm text-brand-muted leading-relaxed">
                    For your security, open the{' '}
                    <span className="font-semibold text-brand-ink">
                      download link in your confirmation email
                    </span>{' '}
                    to get your files — this page only reveals them through
                    that secure link. Can’t find the email? Write to{' '}
                    <a
                      href="mailto:hi@skillzy.ai"
                      className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold"
                    >
                      hi@skillzy.ai
                    </a>
                    .
                  </p>
                ) : files.length > 0 ? (
                  <ul className="space-y-3">
                    {files.map((f, i) => (
                      <li
                        key={f.name}
                        className={`flex items-center justify-between gap-4 ${
                          i < files.length - 1
                            ? 'border-b border-brand-hairline pb-3'
                            : ''
                        }`}
                      >
                        <span className="font-mono text-sm break-all">
                          {f.name}
                        </span>
                        <a
                          href={f.url}
                          className="font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5 whitespace-nowrap"
                        >
                          ↓ Download
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-brand-muted leading-relaxed">
                    Your files are being prepared. We’ve emailed{' '}
                    <span className="font-semibold text-brand-ink">
                      {email}
                    </span>{' '}
                    — your download link works from that email and from your
                    dashboard, and stays available for re-download. If nothing
                    arrives within a few minutes, write to{' '}
                    <a
                      href="mailto:hi@skillzy.ai"
                      className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold"
                    >
                      hi@skillzy.ai
                    </a>
                    .
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-brand-hairline border border-brand-hairline max-w-2xl">
            <div className="bg-brand-cream-card p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                Order
              </span>
              <p
                className="font-display text-2xl mt-2"
                style={{ letterSpacing: '-0.02em' }}
              >
                №{orderId}
              </p>
            </div>
            <div className="bg-brand-cream-card p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                Sent to
              </span>
              <p
                className="font-display text-lg mt-2 break-all"
                style={{ letterSpacing: '-0.02em' }}
              >
                {email}
              </p>
            </div>
          </div>

          {showGuestPrompt && <GuestAccountPrompt email={email} />}

          <div className="mt-12 flex flex-wrap gap-3 sm:gap-4 items-center">
            {signedIn ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
              >
                Go to my dashboard
                <span aria-hidden>→</span>
              </Link>
            ) : null}
            <Link
              href="/marketplace"
              className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              Browse more
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
