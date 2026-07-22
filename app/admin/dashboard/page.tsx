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

// Matches FEATURE_PRICE_CENTS in app/api/listings/[id]/feature-checkout/route.ts.
// Bump this in lockstep if the Showcase upgrade price changes.
const SHOWCASE_PRICE_CENTS = 4900

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
  purchases: number
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
  // `accounts` = every signed-up user (auth.users). `creators` = the
  // subset of those accounts with at least one listing — not everyone
  // who signs up actually lists something.
  accounts: number
  creators: number
  connectedCreators: number
  subscribers: number
  newListings7d: number
  topListings: { title: string; sales: number; gross: number }[]
  topCreators: CreatorAgg[]
  unconnectedEarners: CreatorAgg[]
  // Showcase featured-listing upgrades — $49 charges that don't land
  // in the `purchases` table (the webhook only flips
  // listings.featured_tier), so they need their own rollup.
  showcase: {
    count: number
    revenueCents: number
    listings: {
      title: string
      creatorName: string
      creatorHandle: string
      since: string | null
    }[]
  }
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
  // Wise payout track — creators using the Wise rail (not Stripe Connect).
  // Pending = accrued 80% waiting for the nightly cron once balance ≥ $50.
  // Failed = a prior cron attempt errored (needs admin retry from Wise).
  wise: {
    creatorsOnWise: number
    pendingRows: number
    pendingCents: number
    failedRows: number
    failedCents: number
    creators: {
      id: string
      name: string
      handle: string
      country: string | null
      currency: string | null
      pendingCents: number
      failedCents: number
      readyToFire: boolean
    }[]
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

    const [purchasesRes, listingsRes, profilesRes, subsRes, wiseProfilesRes] =
      await Promise.all([
        db.from('purchases').select(
          'amount_cents, creator_payout_cents, platform_fee_cents, status, referrer_channel, listing_id, buyer_id, created_at, payout_provider, payout_status',
        ),
        db
          .from('listings')
          .select(
            'id, title, status, created_at, creator_id, featured_tier, featured_started_at',
          ),
        db
          .from('profiles')
          .select('id, handle, name, stripe_account_id, stripe_payouts_enabled'),
        db.from('subscribers').select('id', { count: 'exact', head: true }),
        db
          .from('profiles')
          .select(
            'id, handle, name, wise_recipient_country, wise_recipient_currency',
          )
          .eq('payout_method', 'wise'),
      ])

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

    // -------- Wise payout rollup --------
    // Which creators are on the Wise rail, and how much do they have
    // accrued (pending) vs stuck (failed). Uses purchase columns from
    // migration 013 (payout_provider / payout_status).
    const wiseProfiles = wiseProfilesRes.data ?? []
    const wisePendingByCreator: Record<string, number> = {}
    const wiseFailedByCreator: Record<string, number> = {}
    let wisePendingRows = 0
    let wiseFailedRows = 0
    for (const p of purchases) {
      if (p.payout_provider !== 'wise') continue
      const cid = creatorByListing.get(p.listing_id as string)
      if (!cid) continue
      const cents = (p.creator_payout_cents as number) ?? 0
      if (p.payout_status === 'pending') {
        wisePendingByCreator[cid] = (wisePendingByCreator[cid] ?? 0) + cents
        wisePendingRows += 1
      } else if (p.payout_status === 'failed') {
        wiseFailedByCreator[cid] = (wiseFailedByCreator[cid] ?? 0) + cents
        wiseFailedRows += 1
      }
    }
    const WISE_THRESHOLD_CENTS = 50 * 100
    const wiseCreatorsList = wiseProfiles
      .map((wp) => {
        const cid = wp.id as string
        const pending = wisePendingByCreator[cid] ?? 0
        const failed = wiseFailedByCreator[cid] ?? 0
        return {
          id: cid,
          name:
            (wp.name as string | null) ||
            (wp.handle as string | null) ||
            'Unknown',
          handle: (wp.handle as string | null) || '—',
          country: (wp.wise_recipient_country as string | null) ?? null,
          currency: (wp.wise_recipient_currency as string | null) ?? null,
          pendingCents: pending,
          failedCents: failed,
          readyToFire: pending >= WISE_THRESHOLD_CENTS,
        }
      })
      // Failed first (needs manual attention), then ready-to-fire, then
      // pending under threshold, then quiet accounts.
      .sort((a, b) => {
        if (a.failedCents !== b.failedCents) return b.failedCents - a.failedCents
        if (a.readyToFire !== b.readyToFire) return a.readyToFire ? -1 : 1
        return b.pendingCents - a.pendingCents
      })
    const wise = {
      creatorsOnWise: wiseProfiles.length,
      pendingRows: wisePendingRows,
      pendingCents: Object.values(wisePendingByCreator).reduce(
        (a, b) => a + b,
        0,
      ),
      failedRows: wiseFailedRows,
      failedCents: Object.values(wiseFailedByCreator).reduce(
        (a, b) => a + b,
        0,
      ),
      creators: wiseCreatorsList,
    }
    const unconnectedEarners = creatorsAgg
      .filter((c) => !c.connected && c.sales > 0)
      .sort((a, b) => b.payoutCents - a.payoutCents)

    const totalOrders = paidCount + refundedCount

    // Showcase upgrades — paid $49 each, recorded only via
    // listings.featured_tier='showcase'. Roll them into their own
    // section so the founder can see featured revenue + who's bought it.
    const featuredListings = listings.filter(
      (l) => (l.featured_tier as string | null) != null,
    )
    const showcase = {
      count: featuredListings.length,
      revenueCents: featuredListings.length * SHOWCASE_PRICE_CENTS,
      listings: featuredListings
        .map((l) => {
          const prof = profileById.get(l.creator_id as string)
          return {
            title: (l.title as string) ?? '—',
            creatorName: prof?.name ?? 'Unknown',
            creatorHandle: prof?.handle ?? '—',
            since: (l.featured_started_at as string | null) ?? null,
          }
        })
        .sort((a, b) => {
          if (!a.since) return 1
          if (!b.since) return -1
          return a.since < b.since ? 1 : -1
        }),
    }

    // Full creator/user roster with emails. Emails live in auth.users
    // (not profiles), so pull them via the admin API and join.
    const listingCountByCreator: Record<string, number> = {}
    for (const l of listings) {
      const cid = l.creator_id as string
      if (cid) listingCountByCreator[cid] = (listingCountByCreator[cid] ?? 0) + 1
    }
    // Purchases bought per buyer — counted from purchases.buyer_id
    // (only set when the buyer was signed in at checkout). Guest
    // purchases never appear here, by design — the admin roster is
    // about identified accounts.
    const purchasesByBuyer: Record<string, number> = {}
    for (const p of purchases) {
      if (p.status !== 'paid') continue
      const bid = (p as { buyer_id?: string | null }).buyer_id
      if (bid) purchasesByBuyer[bid] = (purchasesByBuyer[bid] ?? 0) + 1
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
            purchases: purchasesByBuyer[u.id] ?? 0,
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
      // `accounts` counts everyone with a profile row (one is created
      // on first signup). `creators` only counts profiles that own ≥1
      // listing — the actual ratio of "signed up" vs "listed" matters.
      accounts: profiles.length,
      creators: profiles.filter(
        (p) => (listingCountByCreator[p.id as string] ?? 0) > 0,
      ).length,
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
      wise,
      showcase,
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
                <Stat label="Accounts" value={String(m.accounts)} sub={`${m.creators} have listed`} />
                <Stat label="Creators" value={String(m.creators)} sub={`${m.connectedCreators} Stripe-connected`} />
              </div>
            </div>

            {/* SHOWCASE UPGRADES — $49 featured-listing buys. They don't
                land in the purchases table (the webhook only flips
                listings.featured_tier), so they need their own rollup. */}
            <div>
              <h2
                className="font-display text-2xl tracking-tight mb-1"
                style={{ letterSpacing: '-0.02em' }}
              >
                Showcase upgrades
              </h2>
              <p className="text-sm text-brand-muted mb-4 max-w-prose">
                $49 each, paid by the creator to feature their listing.
                Counted from{' '}
                <span className="font-mono">listings.featured_tier</span>{' '}
                — the webhook flips the flag rather than writing a purchase
                row.
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-hairline border border-brand-hairline">
                <Stat
                  label="Showcase sold"
                  value={String(m.showcase.count)}
                  sub={m.showcase.count === 1 ? 'upgrade' : 'upgrades'}
                  tone="gold"
                />
                <Stat
                  label="Showcase revenue"
                  value={money(m.showcase.revenueCents)}
                  sub={`${m.showcase.count} × $49`}
                  tone="gold"
                />
              </div>
              {m.showcase.listings.length > 0 && (
                <div className="mt-4 border border-brand-hairline bg-brand-cream-card">
                  <div className="px-5 py-3 border-b border-brand-hairline font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                    Featured listings
                  </div>
                  <ul>
                    {m.showcase.listings.map((s, i) => (
                      <li
                        key={`${s.title}-${i}`}
                        className={
                          'px-5 py-3 grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-2 items-baseline ' +
                          (i < m.showcase.listings.length - 1
                            ? 'border-b border-brand-hairline'
                            : '')
                        }
                      >
                        <span className="text-sm text-brand-ink">
                          {s.title}
                        </span>
                        <span className="text-sm text-brand-muted">
                          {s.creatorName}{' '}
                          <span className="font-mono text-xs">
                            {s.creatorHandle.startsWith('@')
                              ? s.creatorHandle
                              : `@${s.creatorHandle}`}
                          </span>
                        </span>
                        <span className="font-mono text-xs text-brand-muted whitespace-nowrap">
                          {s.since
                            ? new Date(s.since).toLocaleDateString('en-AU', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })
                            : '—'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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

            {/* ACCOUNTS — every signed-up user, with what they've
                listed, sold, and bought. Not everyone here is a
                creator (some have 0 listings) — see the Creators
                section below for the active subset. */}
            <CreatorList creators={m.creatorList} mode="accounts" />

            {/* CREATORS — accounts that have actually listed something.
                The honest "we have N real creators" number. */}
            <CreatorList creators={m.creatorList} mode="creators" />

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

            {/* WISE PAYOUTS — creators on the Wise rail, pending balances,
                failed transfers needing manual attention. */}
            {m.wise.creatorsOnWise > 0 && (
              <div>
                <h2
                  className="font-display text-2xl tracking-tight mb-1"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Wise payouts
                </h2>
                <p className="text-sm text-brand-muted mb-4 max-w-prose">
                  Creators paid via Wise (not Stripe Connect). Pending =
                  accrued 80% awaiting the nightly cron; fires per creator
                  once their balance crosses $50 USD. Failed rows need
                  manual investigation on Wise.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-hairline border border-brand-hairline">
                  <Stat
                    label="Creators on Wise"
                    value={String(m.wise.creatorsOnWise)}
                    sub="using Wise instead of Stripe"
                  />
                  <Stat
                    label="Pending balance"
                    value={money(m.wise.pendingCents)}
                    sub={`${m.wise.pendingRows} sale${m.wise.pendingRows === 1 ? '' : 's'} waiting`}
                    tone="gold"
                  />
                  <Stat
                    label="Failed transfers"
                    value={money(m.wise.failedCents)}
                    sub={`${m.wise.failedRows} row${m.wise.failedRows === 1 ? '' : 's'} — retry on Wise`}
                    tone={m.wise.failedRows > 0 ? 'warn' : undefined}
                  />
                  <Stat
                    label="Ready to fire"
                    value={String(
                      m.wise.creators.filter((c) => c.readyToFire).length,
                    )}
                    sub="creators ≥ $50 threshold"
                  />
                </div>
                {m.wise.creators.length > 0 && (
                  <div className="mt-4 border border-brand-hairline bg-brand-cream-card">
                    <div className="px-5 py-3 border-b border-brand-hairline font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted grid grid-cols-[1fr_auto_auto_auto] gap-4">
                      <span>Creator</span>
                      <span>Country · CCY</span>
                      <span className="text-right">Pending</span>
                      <span className="text-right">Failed</span>
                    </div>
                    <ul>
                      {m.wise.creators.map((c, i) => (
                        <li
                          key={c.id}
                          className={
                            'px-5 py-3 grid grid-cols-[1fr_auto_auto_auto] gap-4 items-baseline text-sm ' +
                            (i < m.wise.creators.length - 1
                              ? 'border-b border-brand-hairline'
                              : '')
                          }
                        >
                          <span className="truncate">
                            <Link
                              href={`/admin/creators/${c.id}`}
                              className="border-b border-brand-ink/30 hover:text-brand-gold hover:border-brand-gold"
                            >
                              {c.name}
                            </Link>{' '}
                            <span className="text-brand-muted">
                              {c.handle.startsWith('@') ? c.handle : `@${c.handle}`}
                            </span>
                            {c.readyToFire && (
                              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] px-1.5 py-0.5 bg-brand-gold text-brand-ink align-middle">
                                Ready
                              </span>
                            )}
                            {c.failedCents > 0 && (
                              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] px-1.5 py-0.5 bg-red-700 text-white align-middle">
                                Failed
                              </span>
                            )}
                          </span>
                          <span className="font-mono text-xs text-brand-muted whitespace-nowrap">
                            {c.country ?? '—'} · {c.currency ?? '—'}
                          </span>
                          <span
                            className={
                              'font-mono text-sm text-right whitespace-nowrap ' +
                              (c.readyToFire
                                ? 'text-brand-gold-dark font-semibold'
                                : 'text-brand-muted')
                            }
                          >
                            {money(c.pendingCents)}
                          </span>
                          <span
                            className={
                              'font-mono text-sm text-right whitespace-nowrap ' +
                              (c.failedCents > 0
                                ? 'text-red-700 font-semibold'
                                : 'text-brand-muted')
                            }
                          >
                            {c.failedCents > 0 ? money(c.failedCents) : '—'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

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
