import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct, products } from '@/lib/catalog'

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const p = getProduct(params.id)
  if (!p) return { title: 'Checkout — Skillzy' }
  return { title: `Checkout · ${p.title} — Skillzy` }
}

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const p = getProduct(params.id)
  if (!p) notFound()

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
            Pay, plug in, plug along. Stripe handles the money. Files in your
            inbox in under a minute.
          </p>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* PAYMENT */}
            <form
              action="/order/success"
              method="GET"
              className="lg:col-span-7"
            >
              <input type="hidden" name="id" value={p.id} />

              <fieldset className="space-y-7">
                <legend className="font-display text-2xl tracking-tight mb-5">
                  Where do we send the files?
                </legend>

                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60"
                  />
                </label>

                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                    Country
                  </span>
                  <select
                    name="country"
                    defaultValue="AU"
                    className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg"
                  >
                    <option value="AU">Australia</option>
                    <option value="NZ">New Zealand</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="DE">Germany</option>
                    <option value="other">Somewhere else</option>
                  </select>
                </label>
              </fieldset>

              <fieldset className="mt-12 pt-10 border-t border-brand-hairline space-y-7">
                <legend className="font-display text-2xl tracking-tight mb-5 flex items-center justify-between">
                  <span>Card details</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted normal-case">
                    Secured by Stripe
                  </span>
                </legend>

                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                    Card number
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="4242 4242 4242 4242"
                    className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60 font-mono"
                  />
                </label>

                <div className="grid grid-cols-2 gap-6">
                  <label className="block">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                      Expiry
                    </span>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60 font-mono"
                    />
                  </label>
                  <label className="block">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                      CVC
                    </span>
                    <input
                      type="text"
                      placeholder="123"
                      className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60 font-mono"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                    Name on card
                  </span>
                  <input
                    type="text"
                    placeholder="As it appears"
                    className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60"
                  />
                </label>
              </fieldset>

              <button
                type="submit"
                className="mt-12 inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-8 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
              >
                Pay {p.price} — plug it in
                <span aria-hidden>→</span>
              </button>

              <p className="mt-4 text-xs text-brand-muted max-w-md">
                Mock checkout for the prototype. Real Stripe Connect comes next.
                No real card details will be charged.
              </p>
            </form>

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
                    Scanned and human-reviewed
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden className="text-brand-gold">✓</span>
                    30-day refund if it doesn’t work
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
