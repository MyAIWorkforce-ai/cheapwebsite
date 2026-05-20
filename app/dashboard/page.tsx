import Link from 'next/link'
import { redirect } from 'next/navigation'
import { products, getProduct, type Product } from '@/lib/catalog'
import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/auth'
import { hasSupabase } from '@/lib/env'

export const metadata = {
  title: 'Dashboard',
  description: 'Your purchases, downloads, listings, and sales on Skillzy.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

type Purchase = {
  product: Product
  orderId: string
  date: string
}

type ListingRow = {
  id: string
  slug: string
  title: string
  type: 'skill' | 'guide' | 'agent_setup'
  price_cents: number
  version: string | null
  status: string
}

type EarningsRow = {
  listing_id: string
  amount_cents: number
  creator_payout_cents: number
  created_at: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

async function loadBuying(userId: string, email: string): Promise<Purchase[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('purchases')
    .select(
      'id, created_at, listings:listing_id (slug)',
    )
    .or(`buyer_id.eq.${userId},buyer_email.eq.${email}`)
    .eq('status', 'paid')
    .order('created_at', { ascending: false })
    .limit(100)

  if (!data) return []
  return data
    .map((row) => {
      const slug = (row.listings as { slug?: string } | null)?.slug
      const product = slug ? getProduct(slug) : undefined
      if (!product) return null
      return {
        product,
        orderId: `SKZ-${(row.id as string).slice(0, 8).toUpperCase()}`,
        date: formatDate(row.created_at as string),
      } as Purchase
    })
    .filter((p): p is Purchase => Boolean(p))
}

async function loadSelling(userId: string) {
  const supabase = createClient()
  const [{ data: listingRows }, { data: earningsRows }] = await Promise.all([
    supabase
      .from('listings')
      .select('id, slug, title, type, price_cents, version, status')
      .eq('creator_id', userId)
      .order('created_at', { ascending: false }),
    supabase
      .from('purchases')
      .select('listing_id, amount_cents, creator_payout_cents, created_at')
      .eq('status', 'paid')
      .in(
        'listing_id',
        (await supabase.from('listings').select('id').eq('creator_id', userId))
          .data?.map((l) => l.id as string) ?? [],
      ),
  ])

  const listings = (listingRows ?? []) as ListingRow[]
  const earnings = (earningsRows ?? []) as EarningsRow[]

  const totalEarningsCents = earnings.reduce(
    (acc, p) => acc + (p.creator_payout_cents ?? 0),
    0,
  )
  const totalSales = earnings.length

  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000
  const last30 = earnings.filter((p) => new Date(p.created_at).getTime() >= cutoff)

  return {
    listings,
    totalEarnings: (totalEarningsCents / 100).toFixed(0),
    totalSales,
    monthlyByListing: listings.map((l) => {
      const matches = last30.filter((p) => p.listing_id === l.id)
      const revenueCents = matches.reduce(
        (acc, p) => acc + (p.creator_payout_cents ?? 0),
        0,
      )
      return {
        listing: l,
        monthSales: matches.length,
        monthRevenue: (revenueCents / 100).toFixed(0),
      }
    }),
  }
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { view?: string }
}) {
  // Demo mode (no Supabase configured): preserve the clickable prototype.
  if (!hasSupabase) {
    return <DemoDashboard view={(searchParams.view ?? 'buying') as 'buying' | 'selling'} />
  }

  const user = await getUser()
  if (!user) redirect('/signin?next=/dashboard')

  const view = (searchParams.view ?? 'buying') as 'buying' | 'selling'
  const purchases = await loadBuying(user.id, user.email)
  const selling = await loadSelling(user.id)

  return (
    <div className="paper">
      {/* hero */}
      <section className="px-6 lg:px-10 pt-14 sm:pt-20 pb-10 sm:pb-14 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Hello {(user.name ?? user.email.split('@')[0]).toLowerCase()},
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

          <div className="mt-6 flex items-center gap-5 flex-wrap text-sm">
            <Link href="/account" className="border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors">
              Account settings →
            </Link>
            <Link href="/dashboard/payouts" className="text-brand-muted hover:text-brand-ink transition-colors">
              Payouts
            </Link>
            <Link href="/help" className="text-brand-muted hover:text-brand-ink transition-colors">
              Help
            </Link>
          </div>
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
              {selling.listings.length}
            </span>
          </Link>
        </div>
      </div>

      {view === 'buying' ? (
        <BuyingView purchases={purchases} />
      ) : (
        <SellingView
          listings={selling.listings}
          totalEarnings={selling.totalEarnings}
          totalSales={selling.totalSales}
          monthlyByListing={selling.monthlyByListing}
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
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight" style={{ letterSpacing: '-0.03em' }}>
            Purchases
          </h2>
          <Link href="/marketplace" className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors">
            Find your next plug-in →
          </Link>
        </div>

        {purchases.length === 0 ? (
          <div className="py-16 text-center bg-brand-cream-card border border-brand-hairline">
            <p className="font-display text-3xl">Nothing here yet.</p>
            <p className="mt-2 text-brand-muted">When you buy a bundle it’ll live here, re-downloadable forever.</p>
            <Link href="/marketplace" className="mt-6 inline-block text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors">
              Browse the marketplace →
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-brand-hairline border-y border-brand-hairline">
            {purchases.map((purchase) => (
              <li key={purchase.orderId} className="py-6 sm:py-7">
                <div className="grid grid-cols-12 gap-4 items-baseline">
                  <div className="col-span-12 sm:col-span-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                      {purchase.product.type}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl mt-1 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                      <Link href={`/marketplace/${purchase.product.id}`} className="hover:text-brand-gold transition-colors">
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
                      <Link href={`/marketplace/${purchase.product.id}`} className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted hover:text-brand-ink transition-colors">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

function SellingView({
  listings,
  totalEarnings,
  totalSales,
  monthlyByListing,
}: {
  listings: ListingRow[]
  totalEarnings: string
  totalSales: number
  monthlyByListing: Array<{
    listing: ListingRow
    monthSales: number
    monthRevenue: string
  }>
}) {
  return (
    <section className="px-6 lg:px-10 py-12 sm:py-16">
      <div className="max-w-page mx-auto">
        {/* stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-hairline border border-brand-hairline mb-10 sm:mb-14">
          <div className="bg-brand-cream-card p-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">Earnings</span>
            <p className="font-display text-4xl mt-2 text-brand-gold" style={{ letterSpacing: '-0.03em' }}>
              ${Number(totalEarnings).toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-brand-muted">All time, after 20% fee</p>
          </div>
          <div className="bg-brand-cream-card p-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">Sales</span>
            <p className="font-display text-4xl mt-2" style={{ letterSpacing: '-0.03em' }}>
              {totalSales.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-brand-muted">Bundles sold</p>
          </div>
          <div className="bg-brand-cream-card p-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">Listings</span>
            <p className="font-display text-4xl mt-2" style={{ letterSpacing: '-0.03em' }}>
              {listings.length}
            </p>
            <p className="mt-1 text-xs text-brand-muted">Live + pending</p>
          </div>
          <div className="bg-brand-cream-card p-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">Next payout</span>
            <p className="font-display text-4xl mt-2" style={{ letterSpacing: '-0.03em' }}>
              Friday
            </p>
            <p className="mt-1 text-xs text-brand-muted">via Stripe</p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight" style={{ letterSpacing: '-0.03em' }}>
            Your listings
          </h2>
          <div className="flex items-center gap-5 flex-wrap">
            <Link href="/dashboard/payouts" className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors">
              Payouts →
            </Link>
            <Link href="/sell/new" className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-6 py-3 text-sm hover:bg-brand-gold-dark transition-colors">
              Publish a new listing
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="py-16 text-center bg-brand-cream-card border border-brand-hairline">
            <p className="font-display text-3xl">Nothing here yet.</p>
            <p className="mt-2 text-brand-muted">Publish your first listing in about ten minutes.</p>
            <Link href="/sell/new" className="mt-6 inline-block text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors">
              Start a new listing →
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-brand-hairline border-y border-brand-hairline">
            {monthlyByListing.map(({ listing: l, monthSales, monthRevenue }) => (
              <li key={l.id} className="py-6 sm:py-7">
                <div className="grid grid-cols-12 gap-4 items-baseline">
                  <div className="col-span-12 sm:col-span-5">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                      {l.type} · {l.version ?? 'v1.0'}
                      {l.status !== 'live' && (
                        <span className="ml-2 text-brand-muted">· {l.status.replace('_', ' ')}</span>
                      )}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl mt-1 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                      <Link href={`/marketplace/${l.slug}`} className="hover:text-brand-gold transition-colors">
                        {l.title}
                      </Link>
                    </h3>
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted block">
                      Sales (30d)
                    </span>
                    <span className="font-display text-2xl mt-1" style={{ letterSpacing: '-0.02em' }}>
                      {monthSales}
                    </span>
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted block">
                      Revenue (30d)
                    </span>
                    <span className="font-display text-2xl mt-1 text-brand-gold" style={{ letterSpacing: '-0.02em' }}>
                      ${monthRevenue}
                    </span>
                  </div>
                  <div className="col-span-12 sm:col-span-3 sm:text-right">
                    <div className="flex sm:justify-end gap-3 flex-wrap">
                      <Link href={`/dashboard/listings/${l.slug}/edit`} className="font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors">
                        Edit
                      </Link>
                      <Link href={`/marketplace/${l.slug}`} className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted hover:text-brand-ink transition-colors">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

// Demo-mode fallback — used only when Supabase isn't configured, so the
// clickable prototype still works for design review.
function DemoDashboard({ view }: { view: 'buying' | 'selling' }) {
  const samplePurchases: Purchase[] = products.slice(0, 4).map((p, i) => ({
    product: p,
    orderId: `SKZ-DEMO${i}`,
    date: formatDate(new Date(Date.now() - i * 86400000 * 7).toISOString()),
  }))

  const sampleListings: ListingRow[] = products.slice(0, 3).map((p) => ({
    id: p.id,
    slug: p.id,
    title: p.title,
    type: 'skill',
    price_cents: Number(p.price.replace(/[^0-9.]/g, '')) * 100,
    version: p.version,
    status: 'live',
  }))

  return (
    <div className="paper">
      <section className="px-6 lg:px-10 pt-14 sm:pt-20 pb-10 sm:pb-14 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Demo mode
          </span>
          <h1 className="font-display mt-4 text-5xl sm:text-7xl tracking-tight leading-[0.95]" style={{ letterSpacing: '-0.03em' }}>
            Your <em className="italic text-brand-gold font-medium">stuff.</em>
          </h1>
        </div>
      </section>
      {view === 'buying' ? (
        <BuyingView purchases={samplePurchases} />
      ) : (
        <SellingView
          listings={sampleListings}
          totalEarnings="0"
          totalSales={0}
          monthlyByListing={sampleListings.map((l) => ({
            listing: l,
            monthSales: 0,
            monthRevenue: '0',
          }))}
        />
      )}
    </div>
  )
}
