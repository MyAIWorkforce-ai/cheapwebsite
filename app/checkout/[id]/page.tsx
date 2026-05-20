import Link from 'next/link'
import { notFound } from 'next/navigation'
import { resolveProduct, isSeedProductId } from '@/lib/listings'
import { getUser } from '@/lib/auth'
import CheckoutForm from './CheckoutForm'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const p = await resolveProduct(params.id)
  if (!p) return { title: 'Checkout', robots: { index: false, follow: false } }
  return {
    title: `Checkout · ${p.title}`,
    description: `Secure Stripe checkout for ${p.title}.`,
    robots: { index: false, follow: false },
  }
}

export default async function CheckoutPage({ params }: { params: { id: string } }) {
  const p = await resolveProduct(params.id)
  if (!p) notFound()
  // Demo/sample listings render the full, real-looking checkout. The
  // "Pay" click is intercepted client-side (no charge): it pings us
  // the demand signal and shows the buyer "no longer available".
  const isDemo = isSeedProductId(params.id)
  const user = await getUser()

  const priceNumber = Number(p.price.replace(/[^0-9.]/g, ''))
  const creatorCut = (priceNumber * 0.8).toFixed(2)
  const platformCut = (priceNumber * 0.2).toFixed(2)

  return (
    <div className="paper">
      {/* breadcrumb */}
      <div className="max-w-page mx-auto px-6 lg:px-10 pt-8 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted"
        >
          <Link href={`/marketplace/${p.id}`} className="hover:text-brand-gold transition-colors">
            ← Back to listing
          </Link>
        </nav>
      </div>

      <section className="px-6 lg:px-10 pt-10 sm:pt-14 pb-20 sm:pb-28">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Checkout
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            One{' '}
            <em className="italic text-brand-gold font-medium">step.</em>
          </h1>
          <p className="mt-4 text-brand-muted max-w-prose">
            Pay, drop it in, get back to work. Stripe handles the money. Files
            in your inbox in under a minute.
          </p>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <CheckoutForm
              listingId={p.id}
              price={p.price}
              defaultEmail={user?.email}
              demo={isDemo}
            />

            {/* SUMMARY */}
            <aside className="lg:col-span-5">
              <div className="bg-brand-cream-card border border-brand-ink p-7 sm:p-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                  Order summary
                </span>

                <div className="mt-4 pb-5 border-b border-brand-hairline">
                  <p
                    className="font-display text-2xl sm:text-3xl tracking-tight leading-tight"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {p.title}
                  </p>
                  <p className="mt-1 text-sm text-brand-muted">
                    {p.type} · by {p.creator.name}
                  </p>
                </div>

                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-brand-muted">Subtotal</dt>
                    <dd className="font-display text-lg">{p.price}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-brand-muted">Tax</dt>
                    <dd>Calculated by Stripe</dd>
                  </div>
                </dl>

                <div className="mt-5 pt-5 border-t border-brand-hairline flex items-baseline justify-between">
                  <span className="font-display text-2xl tracking-tight">Total</span>
                  <span
                    className="font-display text-4xl text-brand-gold"
                    style={{ letterSpacing: '-0.03em' }}
                  >
                    {p.price}
                  </span>
                </div>

                <p className="mt-5 pt-5 border-t border-brand-hairline text-xs text-brand-muted">
                  Of which ${creatorCut} goes to {p.creator.name}, ${platformCut}{' '}
                  keeps the lights on at Skillzy. No subscription. No upsell.
                </p>

                <ul className="mt-6 space-y-2 text-sm text-brand-ink">
                  <li className="flex items-start gap-2">
                    <span aria-hidden className="text-brand-gold">✓</span>
                    Files emailed instantly
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden className="text-brand-gold">✓</span>
                    Re-download from your dashboard forever
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden className="text-brand-gold">✓</span>
                    Creator-warranted: own work, malware-free
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
