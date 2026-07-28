import Link from 'next/link'
import ProfileShareKit from '@/components/ProfileShareKit'
import AffiliatePanel from '@/components/AffiliatePanel'
import AddToHomeScreenPrompt from '@/components/AddToHomeScreenPrompt'
import AddToHomeLink from '@/components/AddToHomeLink'
import { getUser, claimOrphanPurchases } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { hasSupabase, isAdminEmail } from '@/lib/env'
import { affiliateSummary } from '@/lib/affiliate'

export const metadata = {
  title: 'Dashboard',
  description: 'Your purchases, downloads, listings, and sales on Skillzy.',
  robots: { index: false, follow: false },
}

type Purchase = {
  id: string
  orderId: string
  date: string
  status: 'paid' | 'refunded' | 'pending'
  amount_cents: number
  listing: {
    id: string
    slug: string
    title: string
    type: 'skill' | 'guide' | 'agent_setup'
    creator: string
  }
}

type SellerListing = {
  id: string
  slug: string
  title: string
  type: 'skill' | 'guide' | 'agent_setup'
  version: string | null
  price_cents: number
  status: 'live' | 'pending_review' | 'removed'
}

type SellerStats = {
  totalEarnings: number    // cents
  totalSales: number
  monthSalesByListing: Record<string, number>
  monthRevenueByListing: Record<string, number> // cents
  referredSales: number
  referredPayout: number   // cents
  byChannel: Record<string, number>
  // Sum of creator_payout_cents on Wise sales currently pending
  // payout — what the dashboard callout shows as the running balance
  // heading toward the $50 cron threshold.
  pendingWiseCents: number
}

const CHANNEL_LABEL: Record<string, string> = {
  qr: 'QR code',
  social: 'Social post',
  post: 'LinkedIn/email',
  profile: 'Profile link',
  print: 'Print/poster',
  link: 'Direct link',
  other: 'Other',
}

const TYPE_LABEL: Record<SellerListing['type'], string> = {
  skill: 'Skill',
  guide: 'Guide',
  agent_setup: 'Agent Setup',
}

const STATUS_LABEL: Record<SellerListing['status'], string> = {
  live: 'Live',
  pending_review: 'Pending review',
  removed: 'Removed',
}

async function loadBuyer(userId: string): Promise<Purchase[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('purchases')
    .select(
      `
      id,
      created_at,
      status,
      amount_cents,
      listings:listing_id (
        id,
        slug,
        title,
        type,
        profiles:creator_id ( name, handle )
      )
    `,
    )
    .eq('buyer_id', userId)
    .order('created_at', { ascending: false })

  if (error || !data) return []

  return data.map((row): Purchase => {
    // Supabase types nested relations as arrays here, so we cast to
    // unknown first and reshape into the flat object the UI wants.
    const raw = row as unknown as {
      id: string
      created_at: string
      status: Purchase['status']
      amount_cents: number
      listings:
        | {
            id: string
            slug: string
            title: string
            type: SellerListing['type']
            profiles?: { name: string | null; handle: string | null } | { name: string | null; handle: string | null }[] | null
          }
        | { id: string; slug: string; title: string; type: SellerListing['type']; profiles?: unknown }[]
        | null
    }
    const listing = Array.isArray(raw.listings) ? raw.listings[0] : raw.listings
    const profile = listing
      ? Array.isArray((listing as { profiles?: unknown }).profiles)
        ? ((listing as { profiles?: { name: string | null; handle: string | null }[] }).profiles?.[0])
        : ((listing as { profiles?: { name: string | null; handle: string | null } | null }).profiles)
      : null
    const r = {
      id: raw.id,
      created_at: raw.created_at,
      status: raw.status,
      amount_cents: raw.amount_cents,
      listings: listing
        ? {
            id: listing.id,
            slug: listing.slug,
            title: listing.title,
            type: listing.type,
            profiles: profile,
          }
        : null,
    }
    return {
      id: r.id,
      orderId: r.id.slice(0, 8).toUpperCase(),
      date: new Date(r.created_at).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      status: r.status,
      amount_cents: r.amount_cents,
      listing: {
        id: r.listings?.id ?? '',
        slug: r.listings?.slug ?? '',
        title: r.listings?.title ?? 'Listing',
        type: r.listings?.type ?? 'skill',
        creator: r.listings?.profiles?.name ?? r.listings?.profiles?.handle ?? '—',
      },
    }
  })
}

async function loadSeller(userId: string): Promise<{
  listings: SellerListing[]
  stats: SellerStats
  payoutsEnabled: boolean
  stripeAccountId: string | null
  payoutMethod: 'stripe' | 'wise' | null
}> {
  const supabase = createClient()
  const { data: listingsData } = await supabase
    .from('listings')
    .select('id, slug, title, type, version, price_cents, status')
    .eq('creator_id', userId)
    .order('created_at', { ascending: false })

  const { data: profileRow } = await supabase
    .from('profiles')
    .select('stripe_account_id, stripe_payouts_enabled, payout_method')
    .eq('id', userId)
    .maybeSingle()
  const payoutsEnabled = Boolean(profileRow?.stripe_payouts_enabled)
  const stripeAccountId = (profileRow?.stripe_account_id as string | null) ?? null
  const payoutMethod = (profileRow?.payout_method as 'stripe' | 'wise' | null) ?? null

  const listings = (listingsData ?? []) as SellerListing[]

  // Pull paid purchases against this creator's listings to aggregate stats.
  const listingIds = listings.map((l) => l.id)
  if (listingIds.length === 0) {
    return {
      listings,
      stats: {
        totalEarnings: 0,
        totalSales: 0,
        monthSalesByListing: {},
        monthRevenueByListing: {},
        referredSales: 0,
        referredPayout: 0,
        byChannel: {},
        pendingWiseCents: 0,
      },
      payoutsEnabled,
      stripeAccountId,
      payoutMethod,
    }
  }

  const since = new Date()
  since.setDate(since.getDate() - 30)

  const { data: salesData } = await supabase
    .from('purchases')
    .select(
      'listing_id, amount_cents, creator_payout_cents, status, created_at, referrer_slug, referrer_channel, payout_provider, payout_status',
    )
    .in('listing_id', listingIds)
    .eq('status', 'paid')

  let totalEarnings = 0
  let totalSales = 0
  let referredSales = 0
  let referredPayout = 0
  let pendingWiseCents = 0
  const monthSalesByListing: Record<string, number> = {}
  const monthRevenueByListing: Record<string, number> = {}
  const byChannel: Record<string, number> = {}

  for (const row of salesData ?? []) {
    // Prefer the recorded payout; fall back to 80% of amount.
    const payout =
      row.creator_payout_cents ?? Math.round((row.amount_cents ?? 0) * 0.8)
    totalEarnings += payout
    totalSales += 1
    if (
      row.payout_provider === 'wise' &&
      row.payout_status === 'pending'
    ) {
      pendingWiseCents += payout
    }
    if (row.referrer_slug) {
      referredSales += 1
      referredPayout += payout
      const ch = (row.referrer_channel as string | null) || 'other'
      byChannel[ch] = (byChannel[ch] ?? 0) + 1
    }
    if (new Date(row.created_at) >= since) {
      monthSalesByListing[row.listing_id] = (monthSalesByListing[row.listing_id] ?? 0) + 1
      monthRevenueByListing[row.listing_id] =
        (monthRevenueByListing[row.listing_id] ?? 0) + payout
    }
  }

  return {
    listings,
    stats: {
      totalEarnings,
      totalSales,
      monthSalesByListing,
      monthRevenueByListing,
      referredSales,
      referredPayout,
      byChannel,
      pendingWiseCents,
    },
    payoutsEnabled,
    stripeAccountId,
    payoutMethod,
  }
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { view?: string }
}) {
  const view = (searchParams.view ?? 'buying') as 'buying' | 'selling' | 'affiliate'

  // Auth-gated for real users; demo mode renders empty state.
  const user = await getUser()
  if (hasSupabase && !user) {
    // Redirect handled by the action layer; here we just bail.
    return (
      <div className="paper px-6 lg:px-10 py-20 sm:py-28">
        <div className="max-w-2xl">
          <h1
            className="font-display text-5xl tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            Sign in to see your dashboard.
          </h1>
          <p className="mt-5 text-brand-muted">
            Your purchases, listings, and sales live behind sign-in.
          </p>
          <Link
            href="/signin?next=/dashboard"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-3.5 mt-8 text-[15px] hover:bg-brand-gold-dark transition-colors"
          >
            Sign in <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    )
  }

  // Quietly link any orphan guest-checkout purchases by email.
  if (user) await claimOrphanPurchases(user)

  const [purchases, sellerData] = user
    ? await Promise.all([loadBuyer(user.id), loadSeller(user.id)])
    : [[], { listings: [], stats: { totalEarnings: 0, totalSales: 0, monthSalesByListing: {}, monthRevenueByListing: {}, referredSales: 0, referredPayout: 0, byChannel: {}, pendingWiseCents: 0 }, payoutsEnabled: false, stripeAccountId: null, payoutMethod: null }]

  const affiliate = user
    ? await affiliateSummary(user.id)
    : { referredCount: 0, pendingCents: 0, paidCents: 0 }

  const displayName = user?.name ?? user?.email?.split('@')[0] ?? 'there'

  // Soft nudge banner for creators with paid listings whose Stripe
  // isn't connected yet (or whose Stripe account exists but Stripe
  // hasn't approved payouts). Listings are fully live and buyable per
  // the 2026-06 policy — the nudge is just about routing future sales
  // to the creator's own bank instead of them missing out on payouts.
  // (Suppress entirely for Wise creators — they have a valid payout
  // method, different rail.)
  const hasPaidListing = sellerData.listings.some(
    (l) => Number(l.price_cents ?? 0) > 0,
  )
  const showStripeBanner =
    hasPaidListing &&
    !sellerData.payoutsEnabled &&
    sellerData.payoutMethod !== 'wise'
  const stripeBannerHeadline = sellerData.stripeAccountId
    ? "Stripe is still finishing your setup."
    : "Connect Stripe so you can earn from your listings."
  const stripeBannerBody = sellerData.stripeAccountId
    ? "Stripe is verifying your account. Once it's done, every future sale pays straight into your account — usually within a few hours."
    : "60 seconds to connect. Every sale after that pays 80% straight to your bank on Stripe's normal schedule."
  const stripeBannerCta = sellerData.stripeAccountId
    ? 'Open Payouts'
    : 'Connect Stripe'

  return (
    <div className="paper">
      {showStripeBanner && (
        <div className="border-b-2 border-brand-gold bg-brand-gold/15">
          <div className="max-w-page mx-auto px-6 lg:px-10 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold-dark">
                60 seconds
              </p>
              <p
                className="font-display mt-1 text-2xl sm:text-3xl tracking-tight leading-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                {stripeBannerHeadline}
              </p>
              <p className="mt-2 text-sm text-brand-ink leading-relaxed">
                {stripeBannerBody}
              </p>
            </div>
            <Link
              href="/dashboard/payouts"
              className="shrink-0 inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-6 py-3 text-[14px] hover:bg-brand-gold-dark transition-colors"
            >
              {stripeBannerCta}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      )}

      {/* hero */}
      <section className="px-6 lg:px-10 pt-14 sm:pt-20 pb-10 sm:pb-14 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Hello {displayName},
          </span>
          <h1
            className="font-display mt-4 text-5xl sm:text-7xl tracking-tight leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Your{' '}
            <em className="italic text-brand-gold font-medium">stuff.</em>
          </h1>

          {/* Public identity strip — shows the creator's handle (the
              part buyers / share links see) plus a quick path to edit
              their name + handle. */}
          <div className="mt-5 flex items-center gap-3 flex-wrap text-sm">
            {user?.handle ? (
              <Link
                href={`/creator/${user.handle.replace(/^@/, '')}`}
                className="font-display text-lg sm:text-xl text-brand-ink border-b border-brand-hairline hover:text-brand-gold hover:border-brand-gold pb-0.5 transition-colors"
                style={{ letterSpacing: '-0.02em' }}
              >
                @{user.handle.replace(/^@/, '')}
              </Link>
            ) : (
              <Link
                href="/account"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold border-b border-brand-gold pb-0.5 hover:text-brand-gold-dark transition-colors"
              >
                Set your handle →
              </Link>
            )}
            <Link
              href="/account"
              className="text-brand-muted hover:text-brand-ink transition-colors"
            >
              Edit name &amp; handle
            </Link>
          </div>

          <p className="mt-5 text-brand-muted max-w-prose">
            Everything you&rsquo;ve bought lives here. Everything you&rsquo;ve sold too.
          </p>

          <div className="mt-6 flex items-center gap-5 flex-wrap text-sm">
            <Link
              href="/account"
              className="border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              Account settings →
            </Link>
            <Link
              href="/dashboard/payouts"
              className="text-brand-muted hover:text-brand-ink transition-colors"
            >
              Payouts
            </Link>
            <Link
              href="/help"
              className="text-brand-muted hover:text-brand-ink transition-colors"
            >
              Help
            </Link>
            <AddToHomeLink />
            {/* Admin-only shortcut — visible ONLY to emails in
                ADMIN_EMAILS. Normal users never see this. Gives the
                founder a one-click jump to /admin/dashboard from the
                normal dashboard instead of typing the URL. */}
            {isAdminEmail(user?.email) && (
              <Link
                href="/admin/dashboard"
                className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cream bg-brand-navy px-3 py-1.5 hover:bg-brand-ink transition-colors"
              >
                <span aria-hidden>◆</span> Admin
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* "Add to home screen" — self-suppresses on desktop, when already
          installed, or when the user has dismissed it once. */}
      <div className="max-w-page mx-auto px-6 lg:px-10 pt-8 sm:pt-10">
        <AddToHomeScreenPrompt />
      </div>

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
              {sellerData.listings.length}
            </span>
          </Link>
          <Link
            href="/dashboard?view=affiliate"
            className={
              'text-sm pb-3 border-b -mb-[1px] transition-colors ' +
              (view === 'affiliate'
                ? 'border-brand-gold text-brand-gold font-semibold'
                : 'border-transparent text-brand-muted hover:text-brand-ink')
            }
          >
            Refer &amp; earn
            {affiliate.referredCount > 0 && (
              <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                {affiliate.referredCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {view === 'buying' ? (
        <BuyingView purchases={purchases} />
      ) : view === 'affiliate' ? (
        <section className="px-6 lg:px-10 py-12 sm:py-16">
          <div className="max-w-page mx-auto">
            <AffiliatePanel
              handle={user?.handle}
              referredCount={affiliate.referredCount}
              pendingCents={affiliate.pendingCents}
              paidCents={affiliate.paidCents}
              payoutsEnabled={sellerData.payoutsEnabled}
            />
          </div>
        </section>
      ) : (
        <SellingView
          listings={sellerData.listings}
          stats={sellerData.stats}
          handle={user?.handle}
          name={displayName}
          payoutsEnabled={sellerData.payoutsEnabled}
          stripeAccountId={sellerData.stripeAccountId}
          payoutMethod={sellerData.payoutMethod}
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
            Find your next drop-in →
          </Link>
        </div>

        {purchases.length === 0 ? (
          <div className="py-16 text-center bg-brand-cream-card border border-brand-hairline">
            <p className="font-display text-3xl">Nothing here yet.</p>
            <p className="mt-2 text-brand-muted">
              The marketplace is where you find your first.
            </p>
            <Link
              href="/marketplace"
              className="mt-6 inline-block text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              Browse skills →
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-brand-hairline border-y border-brand-hairline">
            {purchases.map((purchase) => (
              <li key={purchase.id} className="py-6 sm:py-7">
                <div className="grid grid-cols-12 gap-4 items-baseline">
                  <div className="col-span-12 sm:col-span-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                      {TYPE_LABEL[purchase.listing.type]}
                      {purchase.status !== 'paid' && (
                        <> · <span className="text-brand-muted">{purchase.status}</span></>
                      )}
                    </span>
                    <h3
                      className="font-display text-2xl sm:text-3xl mt-1 tracking-tight"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      <Link
                        href={`/marketplace/${purchase.listing.slug}`}
                        className="hover:text-brand-gold transition-colors"
                      >
                        {purchase.listing.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-brand-muted">
                      by {purchase.listing.creator}
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
                      <Link
                        href={`/dashboard/download/${purchase.id}`}
                        className="font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
                      >
                        ↓ Download
                      </Link>
                      <Link
                        href={`/marketplace/${purchase.listing.slug}`}
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
        )}
      </div>
    </section>
  )
}

function SellingView({
  listings,
  stats,
  handle,
  name,
  payoutsEnabled,
  stripeAccountId,
  payoutMethod,
}: {
  listings: SellerListing[]
  stats: SellerStats
  handle?: string
  name: string
  payoutsEnabled: boolean
  stripeAccountId: string | null
  payoutMethod: 'stripe' | 'wise' | null
}) {
  const earningsDollars = stats.totalEarnings / 100
  const pendingWiseDollars = stats.pendingWiseCents / 100
  // Suppress the Stripe nudge for creators who've already picked
  // Wise — they have a valid payout method, just a different one.
  const needsConnect = !payoutsEnabled && payoutMethod !== 'wise'
  const wiseActive = payoutMethod === 'wise'
  return (
    <section className="px-6 lg:px-10 py-12 sm:py-16">
      <div className="max-w-page mx-auto">
        {needsConnect && (
          <div className="mb-8 border-2 border-brand-gold bg-brand-gold/10 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-5 flex-wrap">
              <div className="max-w-2xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                  Set up payouts to start getting paid
                </p>
                <p
                  className="font-display text-2xl sm:text-3xl mt-2 tracking-tight"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {stripeAccountId
                    ? 'One quick step to finish Stripe.'
                    : 'Two options — pick the one for your country.'}
                </p>
                <p className="mt-2 text-sm text-brand-ink leading-relaxed">
                  {stripeAccountId
                    ? 'You started Stripe onboarding — a couple more details and your payouts are live. 80% of every sale lands straight in your bank.'
                    : 'Stripe Connect (US, UK, AU, EU + 40 more countries) or Wise (India, Nigeria, LatAm + ~115 more). Either way you keep 80% of every sale.'}
                </p>
              </div>
              <Link
                href="/dashboard/payouts"
                className="shrink-0 inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-6 py-3 text-sm hover:bg-brand-gold-dark transition-colors"
              >
                {stripeAccountId ? 'Resume Stripe setup' : 'Set up payouts'}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        )}
        {wiseActive && (
          <div className="mb-8 border border-brand-hairline bg-brand-cream-card p-5 sm:p-6">
            <div className="flex items-start justify-between gap-5 flex-wrap">
              <div className="max-w-2xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                  Wise payouts
                </p>
                <p
                  className="font-display text-2xl sm:text-3xl mt-2 tracking-tight"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Pending{' '}
                  <span className="text-brand-gold-dark">
                    ${pendingWiseDollars.toFixed(2)}
                  </span>
                </p>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                  Payouts arrive in your Wise account within a few business days of the sale.
                </p>
              </div>
              <Link
                href="/dashboard/payouts"
                className="shrink-0 inline-flex items-center gap-2 border border-brand-ink text-brand-ink font-semibold px-6 py-3 text-sm hover:bg-brand-ink hover:text-white transition-colors"
              >
                Update Wise details
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        )}
        <div className="mb-10 sm:mb-14">
          <ProfileShareKit handle={handle} name={name} />
        </div>
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
              ${earningsDollars.toLocaleString(undefined, { maximumFractionDigits: 0 })}
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
              {stats.totalSales.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-brand-muted">Bundles sold</p>
          </div>
          <div className="bg-brand-cream-card p-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
              Live listings
            </span>
            <p
              className="font-display text-4xl mt-2"
              style={{ letterSpacing: '-0.03em' }}
            >
              {listings.filter((l) => l.status === 'live').length}
            </p>
            <p className="mt-1 text-xs text-brand-muted">Out of {listings.length} total</p>
          </div>
          <div className="bg-brand-cream-card p-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
              Next payout
            </span>
            <p
              className="font-display text-4xl mt-2"
              style={{ letterSpacing: '-0.03em' }}
            >
              Stripe
            </p>
            <p className="mt-1 text-xs text-brand-muted">On Stripe&rsquo;s cadence</p>
          </div>
        </div>

        {/* Referrals — sales driven through a creator's own share link/QR */}
        <div className="border border-brand-ink bg-brand-cream-card p-6 sm:p-7 mb-10 sm:mb-14">
          <div className="flex items-baseline justify-between flex-wrap gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Referrals
            </span>
            <span className="text-xs text-brand-muted">
              Sales you drove via your own link &amp; QR
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-px bg-brand-hairline border border-brand-hairline">
            <div className="bg-brand-cream-card p-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Referred sales
              </span>
              <p className="font-display text-4xl mt-2" style={{ letterSpacing: '-0.03em' }}>
                {stats.referredSales.toLocaleString()}
              </p>
            </div>
            <div className="bg-brand-cream-card p-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Earned from referrals
              </span>
              <p
                className="font-display text-4xl mt-2 text-brand-gold"
                style={{ letterSpacing: '-0.03em' }}
              >
                ${(stats.referredPayout / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
          {Object.keys(stats.byChannel).length > 0 && (
            <div className="mt-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Which channel converts
              </span>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1.5 text-sm">
                {Object.entries(stats.byChannel)
                  .sort((a, b) => b[1] - a[1])
                  .map(([ch, n]) => (
                    <span key={ch} className="text-brand-ink">
                      <span className="font-display text-lg">{n}</span>{' '}
                      <span className="text-brand-muted">
                        {CHANNEL_LABEL[ch] ?? ch}
                      </span>
                    </span>
                  ))}
              </div>
            </div>
          )}
          <p className="mt-4 text-sm text-brand-muted">
            Share any listing&rsquo;s link or QR (Edit → Share) to drive your
            own traffic. Each surface is tagged, so you can see exactly which
            one converts.
          </p>
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
            <p className="mt-2 text-brand-muted">
              Drop in a file — the AI writes most of the listing for you.
            </p>
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
              const monthSales = stats.monthSalesByListing[p.id] ?? 0
              const monthRevenue = (stats.monthRevenueByListing[p.id] ?? 0) / 100
              return (
                <li key={p.id} className="py-6 sm:py-7">
                  <div className="grid grid-cols-12 gap-4 items-baseline">
                    <div className="col-span-12 sm:col-span-5">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                        {TYPE_LABEL[p.type]}
                        {p.version && ` · ${p.version}`}
                        {p.status !== 'live' && (
                          <> · <span className="text-brand-muted">{STATUS_LABEL[p.status]}</span></>
                        )}
                      </span>
                      <h3
                        className="font-display text-2xl sm:text-3xl mt-1 tracking-tight"
                        style={{ letterSpacing: '-0.02em' }}
                      >
                        <Link
                          href={`/marketplace/${p.slug}`}
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
                        ${monthRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="col-span-12 sm:col-span-3 sm:text-right">
                      <div className="flex sm:justify-end gap-3 flex-wrap">
                        <Link
                          href={`/dashboard/listings/${p.slug}/edit`}
                          className="font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/dashboard/listings/${p.slug}/edit#share`}
                          className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted hover:text-brand-ink transition-colors"
                        >
                          Share
                        </Link>
                        <Link
                          href={`/marketplace/${p.slug}`}
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
