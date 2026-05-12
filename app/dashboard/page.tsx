import Link from 'next/link'
import { products, getProductsByCreatorHandle, Product } from '@/lib/catalog'

export const metadata = {
  title: 'Dashboard — Skillzy',
}

// Mock signed-in user. In real life: pull from auth.
const me = {
  name: 'Alex',
  email: 'alex@example.com',
  creatorHandle: 'harlow', // pretend I publish under @harlow
}

// Mock purchases — pretend these were bought.
const purchaseIds = [
  'daily-summary-email',
  'invoice-generator',
  'wire-claude-and-n8n',
  'review-responder',
]

type Purchase = {
  product: Product
  orderId: string
  date: string
}

function makePurchases(): Purchase[] {
  return purchaseIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p))
    .map((p, i) => ({
      product: p,
      orderId: `SKZ-${(2613 - i * 31).toString().padStart(4, '0')}`,
      date: ['10 May 2026', '4 May 2026', '27 Apr 2026', '14 Apr 2026'][i] ?? '',
    }))
}

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { view?: string }
}) {
  const view = (searchParams.view ?? 'buying') as 'buying' | 'selling'
  const purchases = makePurchases()
  const listings = getProductsByCreatorHandle(me.creatorHandle)

  const totalEarnings = listings
    .reduce((acc, p) => acc + Number(p.price.replace(/[^0-9.]/g, '')) * p.ratingCount * 0.8, 0)
    .toFixed(0)
  const totalSales = listings.reduce((acc, p) => acc + p.ratingCount, 0)
  const avgRating =
    listings.reduce((acc, p) => acc + p.rating * p.ratingCount, 0) /
    Math.max(1, listings.reduce((acc, p) => acc + p.ratingCount, 0))

  return (
    <div className="paper">
      {/* hero */}
      <section className="px-6 lg:px-10 pt-14 sm:pt-20 pb-10 sm:pb-14 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Hello {me.name.toLowerCase()},
          </span>
          <h1
            className="font-display mt-4 text-5xl sm:text-7xl tracking-tight leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Your{' '}
            <em className="italic text-brand-gold font-medium">stuff.</em>
          </h1>
          <p className="mt-5 text-brand-muted max-w-prose">
            Everything you’ve bought lives here. Everything you’ve sold too.
          </p>
        </div>
      </section>

      {/* tabs */}
      <div className="max-w-page mx-auto px-6 lg:px-10 pt-8 sm:pt-10 border-b border-brand-hairline">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 -mb-px">
          <Link
            href="/dashboard?view=buying"
            className={
              'text-sm pb-3 border-b -mb-[1px] transition-colors ' +
              (view === 'buying'
                ? 'border-brand-gold text-brand-gold font-semibold'
                : 'border-transparent text-brand-muted hover:text-brand-ink')
            }
          >
            What you bought
            <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.18em]">
              {purchases.length}
            </span>
          </Link>
          <Link
            href="/dashboard?view=selling"
            className={
              'text-sm pb-3 border-b -mb-[1px] transition-colors ' +
              (view === 'selling'
                ? 'border-brand-gold text-brand-gold font-semibold'
                : 'border-transparent text-brand-muted hover:text-brand-ink')
            }
          >
            What you sell
            <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.18em]">
              {listings.length}
            </span>
          </Link>
        </div>
      </div>

      {view === 'buying' ? (
        <BuyingView purchases={purchases} />
      ) : (
        <SellingView
          listings={listings}
          totalEarnings={totalEarnings}
          totalSales={totalSales}
          avgRating={avgRating}
        />
      )}
    </div>
  )
}

function BuyingView({ purchases }: { purchases: Purchase[] }) {
  return (
    <section className="px-6 lg:px-10 py-12 sm:py-16">
      <div className="max-w-page mx-auto">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
          <h2
            className="font-display text-3xl sm:text-4xl tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            Purchases
          </h2>
          <Link
            href="/marketplace"
            className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
          >
            Find your next plug-in →
          </Link>
        </div>

        <ul className="divide-y divide-brand-hairline border-y border-brand-hairline">
          {purchases.map((purchase) => (
            <li key={purchase.orderId} className="py-6 sm:py-7">
              <div className="grid grid-cols-12 gap-4 items-baseline">
                <div className="col-span-12 sm:col-span-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                    {purchase.product.type}
                  </span>
                  <h3
                    className="font-display text-2xl sm:text-3xl mt-1 tracking-tight"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    <Link
                      href={`/marketplace/${purchase.product.id}`}
                      className="hover:text-brand-gold transition-colors"
                    >
                      {purchase.product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-brand-muted">
                    by {purchase.product.creator.name}
                  </p>
                </div>
                <div className="col-span-6 sm:col-span-2 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  {purchase.date}
                </div>
                <div className="col-span-6 sm:col-span-1 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted sm:text-right">
                  №{purchase.orderId}
                </div>
                <div className="col-span-12 sm:col-span-3 sm:text-right">
                  <div className="flex sm:justify-end gap-3 flex-wrap">
                    <a
                      href="#"
                      className="font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
                    >
                      ↓ Download
                    </a>
                    <Link
                      href={`/marketplace/${purchase.product.id}`}
                      className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted hover:text-brand-ink transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function SellingView({
  listings,
  totalEarnings,
  totalSales,
  avgRating,
}: {
  listings: Product[]
  totalEarnings: string
  totalSales: number
  avgRating: number
}) {
  return (
    <section className="px-6 lg:px-10 py-12 sm:py-16">
      <div className="max-w-page mx-auto">
        {/* stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-hairline border border-brand-hairline mb-10 sm:mb-14">
          <div className="bg-brand-cream-card p-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
              Earnings
            </span>
            <p
              className="font-display text-4xl mt-2 text-brand-gold"
              style={{ letterSpacing: '-0.03em' }}
            >
              ${Number(totalEarnings).toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-brand-muted">All time, after 20% fee</p>
          </div>
          <div className="bg-brand-cream-card p-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
              Sales
            </span>
            <p
              className="font-display text-4xl mt-2"
              style={{ letterSpacing: '-0.03em' }}
            >
              {totalSales.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-brand-muted">Bundles sold</p>
          </div>
          <div className="bg-brand-cream-card p-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
              Rating
            </span>
            <p
              className="font-display text-4xl mt-2"
              style={{ letterSpacing: '-0.03em' }}
            >
              {avgRating.toFixed(1)}
            </p>
            <p className="mt-1 text-xs text-brand-muted">Across your listings</p>
          </div>
          <div className="bg-brand-cream-card p-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
              Next payout
            </span>
            <p
              className="font-display text-4xl mt-2"
              style={{ letterSpacing: '-0.03em' }}
            >
              Friday
            </p>
            <p className="mt-1 text-xs text-brand-muted">via Stripe</p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
          <h2
            className="font-display text-3xl sm:text-4xl tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            Your listings
          </h2>
          <div className="flex items-center gap-5 flex-wrap">
            <Link
              href="/dashboard/payouts"
              className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              Payouts →
            </Link>
            <Link
              href="/sell/new"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-6 py-3 text-sm hover:bg-brand-gold-dark transition-colors"
            >
              Publish a new listing
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="py-16 text-center bg-brand-cream-card border border-brand-hairline">
            <p className="font-display text-3xl">Nothing here yet.</p>
            <p className="mt-2 text-brand-muted">Publish your first listing in about ten minutes.</p>
            <Link
              href="/sell/new"
              className="mt-6 inline-block text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              Start a new listing →
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-brand-hairline border-y border-brand-hairline">
            {listings.map((p) => {
              const price = Number(p.price.replace(/[^0-9.]/g, ''))
              const monthSales = Math.round(p.ratingCount * 0.18)
              const monthRevenue = (price * monthSales * 0.8).toFixed(0)
              return (
                <li key={p.id} className="py-6 sm:py-7">
                  <div className="grid grid-cols-12 gap-4 items-baseline">
                    <div className="col-span-12 sm:col-span-5">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                        {p.type} · {p.version}
                      </span>
                      <h3
                        className="font-display text-2xl sm:text-3xl mt-1 tracking-tight"
                        style={{ letterSpacing: '-0.02em' }}
                      >
                        <Link
                          href={`/marketplace/${p.id}`}
                          className="hover:text-brand-gold transition-colors"
                        >
                          {p.title}
                        </Link>
                      </h3>
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted block">
                        Sales (30d)
                      </span>
                      <span
                        className="font-display text-2xl mt-1"
                        style={{ letterSpacing: '-0.02em' }}
                      >
                        {monthSales}
                      </span>
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted block">
                        Revenue (30d)
                      </span>
                      <span
                        className="font-display text-2xl mt-1 text-brand-gold"
                        style={{ letterSpacing: '-0.02em' }}
                      >
                        ${monthRevenue}
                      </span>
                    </div>
                    <div className="col-span-12 sm:col-span-3 sm:text-right">
                      <div className="flex sm:justify-end gap-3 flex-wrap">
                        <Link
                          href={`/dashboard/listings/${p.id}/edit`}
                          className="font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/marketplace/${p.id}`}
                          className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted hover:text-brand-ink transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
