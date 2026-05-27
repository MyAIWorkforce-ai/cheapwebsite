import Link from 'next/link'
import { getUser } from '@/lib/auth'
import { createServiceClient } from '@/lib/supabase/server'
import { hasSupabase, isAdminEmail } from '@/lib/env'
import AdminListingActions from './AdminListingActions'
import DeleteAccountButton from './DeleteAccountButton'

export const metadata = {
  title: 'Admin · creator',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

const money = (c: number) =>
  '$' + (c / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })

type ListingAgg = {
  id: string
  title: string
  slug: string | null
  status: string
  priceCents: number
  units: number
  grossCents: number
  feeCents: number
  payoutCents: number
  refunds: number
}

type CreatorDetail = {
  name: string
  handle: string
  bio: string | null
  connected: boolean
  stripeAccountId: string | null
  joined: string
  totals: {
    units: number
    grossCents: number
    feeCents: number
    payoutCents: number
    refunds: number
  }
  listings: ListingAgg[]
}

async function loadCreator(id: string): Promise<CreatorDetail | null> {
  if (!hasSupabase) return null
  try {
    const db = createServiceClient()

    const { data: profile } = await db
      .from('profiles')
      .select(
        'id, handle, name, bio, stripe_account_id, stripe_payouts_enabled, created_at',
      )
      .eq('id', id)
      .single()
    if (!profile) return null

    const { data: listings } = await db
      .from('listings')
      .select('id, title, slug, status, price_cents, created_at')
      .eq('creator_id', id)

    const rows = listings ?? []
    const listingIds = rows.map((l) => l.id as string)

    let purchases: Array<Record<string, unknown>> = []
    if (listingIds.length > 0) {
      const { data: pData } = await db
        .from('purchases')
        .select(
          'amount_cents, platform_fee_cents, creator_payout_cents, status, listing_id',
        )
        .in('listing_id', listingIds)
      purchases = pData ?? []
    }

    const agg: Record<string, ListingAgg> = {}
    for (const l of rows) {
      agg[l.id as string] = {
        id: l.id as string,
        title: (l.title as string) ?? '(untitled)',
        slug: (l.slug as string | null) ?? null,
        status: (l.status as string) ?? 'unknown',
        priceCents: (l.price_cents as number) ?? 0,
        units: 0,
        grossCents: 0,
        feeCents: 0,
        payoutCents: 0,
        refunds: 0,
      }
    }
    for (const p of purchases) {
      const a = agg[p.listing_id as string]
      if (!a) continue
      if (p.status === 'paid') {
        a.units++
        a.grossCents += (p.amount_cents as number) ?? 0
        a.feeCents += (p.platform_fee_cents as number) ?? 0
        a.payoutCents += (p.creator_payout_cents as number) ?? 0
      } else if (p.status === 'refunded') {
        a.refunds++
      }
    }

    const listingAggs = Object.values(agg).sort(
      (x, y) => y.grossCents - x.grossCents,
    )
    const totals = listingAggs.reduce(
      (t, l) => ({
        units: t.units + l.units,
        grossCents: t.grossCents + l.grossCents,
        feeCents: t.feeCents + l.feeCents,
        payoutCents: t.payoutCents + l.payoutCents,
        refunds: t.refunds + l.refunds,
      }),
      { units: 0, grossCents: 0, feeCents: 0, payoutCents: 0, refunds: 0 },
    )

    return {
      name:
        (profile.name as string | null) ||
        (profile.handle as string | null) ||
        'Unknown',
      handle: (profile.handle as string | null) || '—',
      bio: (profile.bio as string | null) ?? null,
      connected: profile.stripe_payouts_enabled === true,
      stripeAccountId: (profile.stripe_account_id as string | null) ?? null,
      joined: profile.created_at
        ? new Date(profile.created_at as string).toLocaleDateString()
        : '—',
      totals,
      listings: listingAggs,
    }
  } catch {
    return null
  }
}

export default async function AdminCreatorPage({
  params,
}: {
  params: { id: string }
}) {
  const user = await getUser()
  if (!isAdminEmail(user?.email)) {
    return (
      <div className="paper px-6 lg:px-10 py-24">
        <h1 className="font-display text-4xl tracking-tight">Not for you.</h1>
        <Link href="/" className="mt-6 inline-block text-sm border-b border-brand-ink">
          ← Home
        </Link>
      </div>
    )
  }

  const c = await loadCreator(params.id)

  return (
    <div className="paper">
      <section className="px-6 lg:px-10 pt-14 sm:pt-20 pb-8 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <Link
            href="/admin/dashboard"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted hover:text-brand-gold transition-colors"
          >
            ← Admin
          </Link>
          {!c ? (
            <h1 className="font-display mt-4 text-4xl tracking-tight">
              Creator not found.
            </h1>
          ) : (
            <>
              <h1
                className="font-display mt-4 text-4xl sm:text-6xl tracking-tight leading-[0.95]"
                style={{ letterSpacing: '-0.03em' }}
              >
                {c.name}
              </h1>
              <p className="mt-2 text-brand-muted">
                {c.handle} · joined {c.joined} ·{' '}
                {c.connected ? (
                  <span className="text-brand-gold-dark">Stripe connected</span>
                ) : (
                  <span className="text-red-700">⚠ no payout account</span>
                )}
              </p>
            </>
          )}
        </div>
      </section>

      {c && (
        <section className="px-6 lg:px-10 py-12 max-w-page mx-auto space-y-10">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-brand-hairline border border-brand-hairline">
            {[
              ['Units sold', String(c.totals.units)],
              ['Gross', money(c.totals.grossCents)],
              ['Skillzy 20%', money(c.totals.feeCents)],
              ['Their payout', money(c.totals.payoutCents)],
              ['Refunds', String(c.totals.refunds)],
            ].map(([label, value]) => (
              <div key={label} className="bg-brand-cream-card p-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  {label}
                </span>
                <p
                  className="font-display text-3xl mt-1.5"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {!c.connected && c.totals.payoutCents > 0 && (
            <div className="border border-red-700/40 bg-red-50 p-5 text-sm">
              <span className="font-semibold text-red-700">
                {money(c.totals.payoutCents)} owed, no payout account.
              </span>{' '}
              This creator has earned but hasn’t connected Stripe — their
              money is on the platform. Chase them to connect.
            </div>
          )}

          <div>
            <h2
              className="font-display text-2xl tracking-tight mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Listings
            </h2>
            {c.listings.length === 0 ? (
              <p className="text-sm text-brand-muted">No listings.</p>
            ) : (
              <ul className="divide-y divide-brand-hairline border-y border-brand-hairline">
                {c.listings.map((l) => (
                  <li key={l.id} className="py-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <Link
                        href={`/marketplace/${l.slug ?? l.id}`}
                        className="truncate font-semibold hover:text-brand-gold transition-colors"
                      >
                        {l.title}
                      </Link>
                      <span className="font-mono text-sm text-brand-muted shrink-0">
                        {money(l.grossCents)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-muted">
                        {l.status} · {money(l.priceCents)} · {l.units} sold ·{' '}
                        {money(l.payoutCents)} payout
                        {l.refunds > 0 && (
                          <span className="text-red-700"> · {l.refunds} refunded</span>
                        )}
                      </p>
                      <AdminListingActions
                        id={l.id}
                        creatorId={params.id}
                        status={l.status}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-brand-hairline pt-8">
            <h2
              className="font-display text-2xl tracking-tight mb-1"
              style={{ letterSpacing: '-0.02em' }}
            >
              Danger zone
            </h2>
            <p className="text-sm text-brand-muted mb-4 max-w-prose">
              Permanently delete this account. This can&rsquo;t be undone — and
              it fails safely if the creator has sales (remove their listings
              above instead, which keeps records intact).
            </p>
            <DeleteAccountButton userId={params.id} />
          </div>
        </section>
      )}
    </div>
  )
}
