import Link from 'next/link'
import { getUser } from '@/lib/auth'
import { createServiceClient } from '@/lib/supabase/server'
import { hasSupabase, isAdminEmail } from '@/lib/env'

export const metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

function Stat({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="bg-brand-cream-card p-6">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
        {label}
      </span>
      <p
        className="font-display text-4xl mt-2"
        style={{ letterSpacing: '-0.03em' }}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-brand-muted">{sub}</p>}
    </div>
  )
}

type Metrics = {
  grossCents: number
  payoutCents: number
  skillzyCents: number
  paidCount: number
  refundedCount: number
  listings: number
  liveListings: number
  pendingListings: number
  creators: number
  subscribers: number
  newListings7d: number
  topListings: { title: string; sales: number; gross: number }[]
  byChannel: Record<string, number>
}

async function loadMetrics(): Promise<Metrics | null> {
  if (!hasSupabase) return null
  try {
    const db = createServiceClient()
    const since = new Date()
    since.setDate(since.getDate() - 7)

    const [purchasesRes, listingsRes, profilesRes, subsRes] = await Promise.all(
      [
        db.from('purchases').select(
          'amount_cents, creator_payout_cents, platform_fee_cents, status, referrer_channel, listing_id, created_at',
        ),
        db.from('listings').select('id, title, status, created_at'),
        db.from('profiles').select('id', { count: 'exact', head: true }),
        db.from('subscribers').select('id', { count: 'exact', head: true }),
      ],
    )

    const purchases = purchasesRes.data ?? []
    const listings = listingsRes.data ?? []
    const titleById = new Map(listings.map((l) => [l.id, l.title]))

    let grossCents = 0
    let payoutCents = 0
    let skillzyCents = 0
    let paidCount = 0
    let refundedCount = 0
    const byChannel: Record<string, number> = {}
    const salesByListing: Record<string, { sales: number; gross: number }> = {}

    for (const p of purchases) {
      if (p.status === 'paid') {
        paidCount++
        grossCents += p.amount_cents ?? 0
        payoutCents += p.creator_payout_cents ?? 0
        skillzyCents += p.platform_fee_cents ?? 0
        const ch = (p.referrer_channel as string | null) || 'organic'
        byChannel[ch] = (byChannel[ch] ?? 0) + 1
        const k = p.listing_id as string
        salesByListing[k] = salesByListing[k] ?? { sales: 0, gross: 0 }
        salesByListing[k].sales++
        salesByListing[k].gross += p.amount_cents ?? 0
      } else if (p.status === 'refunded') {
        refundedCount++
      }
    }

    const topListings = Object.entries(salesByListing)
      .map(([id, v]) => ({
        title: titleById.get(id) ?? id,
        sales: v.sales,
        gross: v.gross,
      }))
      .sort((a, b) => b.gross - a.gross)
      .slice(0, 8)

    return {
      grossCents,
      payoutCents,
      skillzyCents,
      paidCount,
      refundedCount,
      listings: listings.length,
      liveListings: listings.filter((l) => l.status === 'live').length,
      pendingListings: listings.filter((l) => l.status === 'pending_review')
        .length,
      creators: profilesRes.count ?? 0,
      subscribers: subsRes.count ?? 0,
      newListings7d: listings.filter((l) => new Date(l.created_at) >= since)
        .length,
      topListings,
      byChannel,
    }
  } catch {
    return null
  }
}

const money = (c: number) =>
  '$' + (c / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })

export default async function AdminDashboard() {
  const user = await getUser()

  if (!isAdminEmail(user?.email)) {
    return (
      <div className="paper px-6 lg:px-10 py-24 sm:py-32">
        <div className="max-w-xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Admin
          </span>
          <h1
            className="font-display mt-4 text-5xl tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            Not for you.
          </h1>
          <p className="mt-5 text-brand-muted">
            This page is restricted. Add your email to{' '}
            <span className="font-mono">ADMIN_EMAILS</span> and sign in.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
          >
            ← Home
          </Link>
        </div>
      </div>
    )
  }

  const m = await loadMetrics()

  return (
    <div className="paper">
      <section className="px-6 lg:px-10 pt-14 sm:pt-20 pb-10 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Admin · live
          </span>
          <h1
            className="font-display mt-4 text-5xl sm:text-7xl tracking-tight leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            The numbers.
          </h1>
        </div>
      </section>

      {!m ? (
        <div className="px-6 lg:px-10 py-20 max-w-page mx-auto">
          <p className="text-brand-muted">
            Supabase isn’t reachable — metrics load once the DB env is wired.
          </p>
        </div>
      ) : (
        <section className="px-6 lg:px-10 py-12 sm:py-16">
          <div className="max-w-page mx-auto space-y-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-hairline border border-brand-hairline">
              <Stat label="Gross" value={money(m.grossCents)} sub={`${m.paidCount} paid orders`} />
              <Stat label="Creator payouts" value={money(m.payoutCents)} sub="80% out" />
              <Stat label="Skillzy share" value={money(m.skillzyCents)} sub="20% platform fee" />
              <Stat label="Refunded" value={String(m.refundedCount)} sub="orders" />
              <Stat label="Listings" value={String(m.listings)} sub={`${m.liveListings} live · ${m.pendingListings} in review`} />
              <Stat label="New listings" value={String(m.newListings7d)} sub="last 7 days" />
              <Stat label="Creators" value={String(m.creators)} sub="profiles" />
              <Stat label="Subscribers" value={String(m.subscribers)} sub="newsletter" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h2 className="font-display text-2xl tracking-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
                  Top listings
                </h2>
                {m.topListings.length === 0 ? (
                  <p className="text-sm text-brand-muted">No sales yet.</p>
                ) : (
                  <ul className="divide-y divide-brand-hairline border-y border-brand-hairline">
                    {m.topListings.map((t, i) => (
                      <li key={i} className="py-3 flex items-baseline justify-between gap-4">
                        <span className="truncate">{t.title}</span>
                        <span className="font-mono text-sm text-brand-muted shrink-0">
                          {t.sales} · {money(t.gross)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h2 className="font-display text-2xl tracking-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
                  Sales by channel
                </h2>
                {Object.keys(m.byChannel).length === 0 ? (
                  <p className="text-sm text-brand-muted">No sales yet.</p>
                ) : (
                  <ul className="divide-y divide-brand-hairline border-y border-brand-hairline">
                    {Object.entries(m.byChannel)
                      .sort((a, b) => b[1] - a[1])
                      .map(([ch, n]) => (
                        <li key={ch} className="py-3 flex items-baseline justify-between gap-4">
                          <span>{ch}</span>
                          <span className="font-mono text-sm text-brand-muted">{n}</span>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
