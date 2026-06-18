import Link from 'next/link'
import { getUser } from '@/lib/auth'
import { createServiceClient } from '@/lib/supabase/server'
import { hasSupabase, isAdminEmail } from '@/lib/env'
import CreatorList from './CreatorList'

export const metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

function Stat({
  label,
  value,
  sub,
  tone,
}: {
  label: string
  value: string
  sub?: string
  tone?: 'gold' | 'warn'
}) {
  return (
    <div className="bg-brand-cream-card p-6">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
        {label}
      </span>
      <p
        className={
          'font-display text-4xl mt-2 ' +
          (tone === 'gold'
            ? 'text-brand-gold-dark'
            : tone === 'warn'
              ? 'text-red-700'
              : '')
        }
        style={{ letterSpacing: '-0.03em' }}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-brand-muted">{sub}</p>}
    </div>
  )
}

type CreatorAgg = {
  id: string
  name: string
  handle: string
  connected: boolean
  sales: number
  grossCents: number
  payoutCents: number
}

type CreatorRow = {
  id: string
  email: string
  name: string
  handle: string
  joined: string
  listings: number
  sales: number
  connected: boolean
}

type Metrics = {
  grossCents: number
  payoutCents: number
  skillzyCents: number
  refundedCents: number
  netCents: number
  paidCount: number
  refundedCount: number
  refundRatePct: number
  avgOrderCents: number
  listings: number
  liveListings: number
  pendingListings: number
  creators: number
  connectedCreators: number
  subscribers: number
  newListings7d: number
  topListings: { title: string; sales: number; gross: number }[]
  topCreators: CreatorAgg[]
  unconnectedEarners: CreatorAgg[]
  // House-listings aggregate (creators whose handle starts with skillzy-).
  // Lets the super admin separate Skillzy House revenue from third-party
  // creator revenue at a glance.
  house: {
    sales: number
    grossCents: number
    payoutCents: number
    platformFeeCents: number
    creators: number
  }
  creatorList: CreatorRow[]
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
        db.from('listings').select('id, title, status, created_at, creator_id'),
        db
          .from('profiles')
          .select('id, handle, name, stripe_account_id, stripe_payouts_enabled'),
        db.from('subscribers').select('id', { count: 'exact', head: true }),
      ],
    )

    const purchases = purchasesRes.data ?? []
    const listings = listingsRes.data ?? []
    const profiles = profilesRes.data ?? []

    const titleById = new Map(listings.map((l) => [l.id, l.title]))
    const creatorByListing = new Map(
      listings.map((l) => [l.id as string, l.creator_id as string]),
    )
    const profileById = new Map(
      profiles.map((p) => [
        p.id as string,
        {
          name:
            (p.name as string | null) ||
            (p.handle as string | null) ||
            'Unknown',
          handle: (p.handle as string | null) || '—',
          connected: p.stripe_payouts_enabled === true,
        },
      ]),
    )

    let grossCents = 0
    let payoutCents = 0
    let skillzyCents = 0
    let refundedCents = 0
    let paidCount = 0
    let refundedCount = 0
    const byChannel: Record<string, number> = {}
    const salesByListing: Record<string, { sales: number; gross: number }> = {}
    const byCreator: Record<string, CreatorAgg> = {}

    for (const p of purchases) {
      if (p.status === 'paid') {
        paidCount++
        grossCents += p.amount_cents ?? 0
        payoutCents += p.creator_payout_cents ?? 0
        skillzyCents += p.platform_fee_cents ?? 0
        const ch = (p.referrer_channel as string | null) || 'organic'
        byChannel[ch] = (byChannel[ch] ?? 0) + 1

        const lid = p.listing_id as string
        salesByListing[lid] = salesByListing[lid] ?? { sales: 0, gross: 0 }
        salesByListing[lid].sales++
        salesByListing[lid].gross += p.amount_cents ?? 0

        const cid = creatorByListing.get(lid)
        if (cid) {
          const prof = profileById.get(cid)
          byCreator[cid] = byCreator[cid] ?? {
            id: cid,
            name: prof?.name ?? 'Unknown',
            handle: prof?.handle ?? '—',
            connected: prof?.connected ?? false,
            sales: 0,
            grossCents: 0,
            payoutCents: 0,
          }
          byCreator[cid].sales++
          byCreator[cid].grossCents += p.amount_cents ?? 0
          byCreator[cid].payoutCents += p.creator_payout_cents ?? 0
        }
      } else if (p.status === 'refunded') {
        refundedCount++
        refundedCents += p.amount_cents ?? 0
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

    const creatorsAgg = Object.values(byCreator)
    // House-listings rollup: any creator whose handle begins with
    // skillzy- (e.g. @skillzy-house). Filter case-insensitive, ignore
    // the leading @.
    const houseCreators = creatorsAgg.filter((c) =>
      /^skillzy[-_]/i.test((c.handle ?? '').replace(/^@/, '')),
    )
    const house = {
      sales: houseCreators.reduce((s, c) => s + c.sales, 0),
      grossCents: houseCreators.reduce((s, c) => s + c.grossCents, 0),
      payoutCents: houseCreators.reduce((s, c) => s + c.payoutCents, 0),
      platformFeeCents: houseCreators.reduce(
        (s, c) => s + (c.grossCents - c.payoutCents),
        0,
      ),
      creators: houseCreators.length,
    }
    const topCreators = [...creatorsAgg]
      .sort((a, b) => b.grossCents - a.grossCents)
      .slice(0, 10)
    const unconnectedEarners = creatorsAgg
      .filter((c) => !c.connected && c.sales > 0)
      .sort((a, b) => b.payoutCents - a.payoutCents)

    const totalOrders = paidCount + refundedCount

    // Full creator/user roster with emails. Emails live in auth.users
    // (not profiles), so pull them via the admin API and join.
    const listingCountByCreator: Record<string, number> = {}
    for (const l of listings) {
      const cid = l.creator_id as string
      if (cid) listingCountByCreator[cid] = (listingCountByCreator[cid] ?? 0) + 1
    }
    let creatorList: CreatorRow[] = []
    try {
      const { data: usersData } = await db.auth.admin.listUsers({
        page: 1,
        perPage: 1000,
      })
      creatorList = (usersData?.users ?? [])
        .map((u) => {
          const prof = profileById.get(u.id)
          const agg = byCreator[u.id]
          return {
            id: u.id,
            email: u.email ?? '—',
            name: prof?.name ?? (u.email ? u.email.split('@')[0] : '—'),
            handle: prof?.handle ?? '—',
            joined: u.created_at ?? '',
            listings: listingCountByCreator[u.id] ?? 0,
            sales: agg?.sales ?? 0,
            connected: prof?.connected ?? false,
          }
        })
        .sort((a, b) => (a.joined < b.joined ? 1 : -1)) // newest first
    } catch {
      /* listUsers may be unavailable; leave the roster empty */
    }

    return {
      grossCents,
      payoutCents,
      skillzyCents,
      refundedCents,
      netCents: grossCents - refundedCents,
      paidCount,
      refundedCount,
      refundRatePct:
        totalOrders > 0 ? Math.round((refundedCount / totalOrders) * 100) : 0,
      avgOrderCents: paidCount > 0 ? Math.round(grossCents / paidCount) : 0,
      listings: listings.length,
      liveListings: listings.filter((l) => l.status === 'live').length,
      pendingListings: listings.filter((l) => l.status === 'pending_review')
        .length,
      creators: profiles.length,
      connectedCreators: profiles.filter(
        (p) => p.stripe_payouts_enabled === true,
      ).length,
      subscribers: subsRes.count ?? 0,
      newListings7d: listings.filter((l) => new Date(l.created_at) >= since)
        .length,
      topListings,
      topCreators,
      unconnectedEarners,
      house,
      creatorList,
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
            Admin · live · {user?.email}
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
            {/* MONEY */}
            <div>
              <h2
                className="font-display text-2xl tracking-tight mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                Money
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-hairline border border-brand-hairline">
                <Stat label="Total sales (gross)" value={money(m.grossCents)} sub={`${m.paidCount} paid orders`} />
                <Stat label="Skillzy 20%" value={money(m.skillzyCents)} sub="platform fee — your income" tone="gold" />
                <Stat label="Creator payouts" value={money(m.payoutCents)} sub="80% out to creators" />
                <Stat label="Net" value={money(m.netCents)} sub={`after ${money(m.refundedCents)} refunded`} />
                <Stat label="Avg order" value={money(m.avgOrderCents)} sub="per paid order" />
                <Stat label="Refunds" value={`${m.refundedCount}`} sub={`${m.refundRatePct}% of orders`} tone={m.refundRatePct >= 10 ? 'warn' : undefined} />
                <Stat label="Listings" value={String(m.listings)} sub={`${m.liveListings} live · ${m.pendingListings} in review`} />
                <Stat label="Creators" value={String(m.creators)} sub={`${m.connectedCreators} Stripe-connected`} />
              </div>
            </div>

            {/* SKILLZY HOUSE — first-party revenue, separated from third-party
                creator income for clean monthly reporting. Any creator whose
                handle starts with `skillzy-` rolls up here. */}
            {m.house.sales > 0 && (
              <div>
                <h2
                  className="font-display text-2xl tracking-tight mb-1"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Skillzy House
                </h2>
                <p className="text-sm text-brand-muted mb-4 max-w-prose">
                  First-party listings sold under handles starting with{' '}
                  <span className="font-mono">@skillzy-</span>. The payout
                  number is the 80% routed to whichever connected Stripe
                  the House account is linked to (currently My AI Workforce).
                  In Stripe, filter Payments by{' '}
                  <span className="font-mono">metadata.creator_handle = skillzy-house</span>{' '}
                  to see only these transactions in your books.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-hairline border border-brand-hairline">
                  <Stat label="House sales" value={String(m.house.sales)} sub={`${m.house.creators} house creator${m.house.creators === 1 ? '' : 's'}`} />
                  <Stat label="House gross" value={money(m.house.grossCents)} sub="from buyers" />
                  <Stat label="Skillzy 20%" value={money(m.house.platformFeeCents)} sub="kept on platform Stripe" tone="gold" />
                  <Stat label="House 80%" value={money(m.house.payoutCents)} sub="paid to connected Stripe" />
                </div>
              </div>
            )}

            {/* ALL CREATORS — searchable roster with emails */}
            <CreatorList creators={m.creatorList} />

            {/* ACTIONABLE: earning but no payout account */}
            <div>
              <h2
                className="font-display text-2xl tracking-tight mb-1"
                style={{ letterSpacing: '-0.02em' }}
              >
                ⚠ Earning but not paid out
              </h2>
              <p className="text-sm text-brand-muted mb-4">
                Creators with sales whose Stripe isn’t connected — their share
                is sitting on the platform. Chase these.
              </p>
              {m.unconnectedEarners.length === 0 ? (
                <p className="text-sm text-brand-muted">
                  None — every creator with sales is connected. 👍
                </p>
              ) : (
                <ul className="divide-y divide-brand-hairline border-y border-brand-hairline">
                  {m.unconnectedEarners.map((c) => (
                    <li
                      key={c.id}
                      className="py-3 flex items-baseline justify-between gap-4"
                    >
                      <span className="truncate">
                        <Link
                          href={`/admin/creators/${c.id}`}
                          className="border-b border-brand-ink/30 hover:text-brand-gold hover:border-brand-gold"
                        >
                          {c.name}
                        </Link>{' '}
                        <span className="text-brand-muted">{c.handle}</span>
                      </span>
                      <span className="font-mono text-sm text-red-700 shrink-0">
                        {c.sales} sales · {money(c.payoutCents)} owed
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* BEST CREATORS */}
              <div>
                <h2
                  className="font-display text-2xl tracking-tight mb-4"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Best creators
                </h2>
                {m.topCreators.length === 0 ? (
                  <p className="text-sm text-brand-muted">No sales yet.</p>
                ) : (
                  <ul className="divide-y divide-brand-hairline border-y border-brand-hairline">
                    {m.topCreators.map((c) => (
                      <li
                        key={c.id}
                        className="py-3 flex items-baseline justify-between gap-4"
                      >
                        <span className="truncate">
                          <Link
                            href={`/admin/creators/${c.id}`}
                            className="border-b border-brand-ink/30 hover:text-brand-gold hover:border-brand-gold"
                          >
                            {c.name}
                          </Link>{' '}
                          <span className="text-brand-muted">{c.handle}</span>
                          {/^skillzy[-_]/i.test((c.handle ?? '').replace(/^@/, '')) && (
                            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] px-1.5 py-0.5 bg-brand-navy text-brand-cream align-middle">
                              House
                            </span>
                          )}
                          {!c.connected && (
                            <span className="text-red-700"> · no payout</span>
                          )}
                        </span>
                        <span className="font-mono text-sm text-brand-muted shrink-0">
                          {c.sales} · {money(c.grossCents)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* TOP LISTINGS */}
              <div>
                <h2
                  className="font-display text-2xl tracking-tight mb-4"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Top listings
                </h2>
                {m.topListings.length === 0 ? (
                  <p className="text-sm text-brand-muted">No sales yet.</p>
                ) : (
                  <ul className="divide-y divide-brand-hairline border-y border-brand-hairline">
                    {m.topListings.map((t, i) => (
                      <li
                        key={i}
                        className="py-3 flex items-baseline justify-between gap-4"
                      >
                        <span className="truncate">{t.title}</span>
                        <span className="font-mono text-sm text-brand-muted shrink-0">
                          {t.sales} · {money(t.gross)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* CHANNELS */}
            <div>
              <h2
                className="font-display text-2xl tracking-tight mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                Sales by channel
              </h2>
              {Object.keys(m.byChannel).length === 0 ? (
                <p className="text-sm text-brand-muted">No sales yet.</p>
              ) : (
                <ul className="divide-y divide-brand-hairline border-y border-brand-hairline max-w-md">
                  {Object.entries(m.byChannel)
                    .sort((a, b) => b[1] - a[1])
                    .map(([ch, n]) => (
                      <li
                        key={ch}
                        className="py-3 flex items-baseline justify-between gap-4"
                      >
                        <span>{ch}</span>
                        <span className="font-mono text-sm text-brand-muted">
                          {n}
                        </span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
