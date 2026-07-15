import Link from 'next/link'
import { getUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { hasSupabase, hasStripe } from '@/lib/env'
import { getStripe } from '@/lib/stripe'
import ConnectButton from './ConnectButton'
import DisconnectButton from './DisconnectButton'
import WiseCard, { type WiseDefaults } from './WiseCard'
import { syncPayoutStatus } from '@/lib/stripe-connect'

export const metadata = {
  title: 'Payouts',
  description: 'Connect Stripe and receive payouts on every sale.',
  robots: { index: false, follow: false },
}

type ProfileRow = {
  stripe_account_id: string | null
  stripe_payouts_enabled: boolean
  payout_method: 'stripe' | 'wise' | null
  wise_recipient_name: string | null
  wise_recipient_country: string | null
  wise_recipient_currency: string | null
  wise_recipient_email: string | null
  wise_recipient_details: Record<string, string> | null
  payout_method_updated_at: string | null
}

type Sale = {
  id: string
  created_at: string
  listing_title: string
  amount_cents: number
  payout_cents: number
  currency: string
}

const PENDING_DAYS = 7
const DAY_MS = 24 * 60 * 60 * 1000

async function getPayoutProfile(userId: string): Promise<ProfileRow | null> {
  if (!hasSupabase) return null
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('profiles')
      .select(
        'stripe_account_id, stripe_payouts_enabled, payout_method, wise_recipient_name, wise_recipient_country, wise_recipient_currency, wise_recipient_email, wise_recipient_details, payout_method_updated_at',
      )
      .eq('id', userId)
      .single()
    return (data as ProfileRow) ?? null
  } catch {
    return null
  }
}

/**
 * Sum of pending Wise payouts owed to this creator across all their
 * live listings. What the dashboard shows as "Pending payout: $X" and
 * what the nightly cron will use to decide whether the balance's
 * crossed the $50 threshold to trigger a Wise transfer.
 */
async function getPendingWiseBalanceCents(userId: string): Promise<number> {
  if (!hasSupabase) return 0
  try {
    const sb = createClient()
    // Grab this creator's listing ids first, then sum pending Wise
    // payouts scoped to those. Two-hop keeps the SQL cheap + the
    // RLS-friendly (purchases policy already scopes creator reads
    // through the listing join).
    const { data: listings } = await sb
      .from('listings')
      .select('id')
      .eq('creator_id', userId)
    const ids = (listings ?? []).map((l) => l.id as string)
    if (ids.length === 0) return 0
    const { data: rows } = await sb
      .from('purchases')
      .select('creator_payout_cents')
      .in('listing_id', ids)
      .eq('payout_provider', 'wise')
      .eq('payout_status', 'pending')
    return (rows ?? []).reduce(
      (acc, r) => acc + ((r.creator_payout_cents as number) ?? 0),
      0,
    )
  } catch {
    return 0
  }
}

async function getConnectedAccountEmail(
  stripeAccountId: string,
): Promise<string | null> {
  if (!hasStripe) return null
  try {
    const account = await getStripe().accounts.retrieve(stripeAccountId)
    return account.email ?? null
  } catch {
    return null
  }
}

async function getRecentSales(userId: string): Promise<Sale[]> {
  if (!hasSupabase) return []
  try {
    const sb = createClient()
    const { data: listings } = await sb
      .from('listings')
      .select('id, title')
      .eq('creator_id', userId)
    const rows = listings ?? []
    if (rows.length === 0) return []
    const titleById = new Map(
      rows.map((l) => [l.id as string, l.title as string]),
    )
    const ids = rows.map((l) => l.id as string)
    const { data: purchases } = await sb
      .from('purchases')
      .select(
        'id, created_at, listing_id, amount_cents, creator_payout_cents, currency, status',
      )
      .in('listing_id', ids)
      .eq('status', 'paid')
      .order('created_at', { ascending: false })
      .limit(20)
    return (purchases ?? []).map((p) => ({
      id: p.id as string,
      created_at: p.created_at as string,
      listing_title: titleById.get(p.listing_id as string) ?? 'Listing',
      amount_cents: (p.amount_cents as number) ?? 0,
      payout_cents: (p.creator_payout_cents as number) ?? 0,
      currency: ((p.currency as string) ?? 'usd').toUpperCase(),
    }))
  } catch {
    return []
  }
}

function money(c: number, cur: string) {
  return `${cur} ${(c / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default async function PayoutsPage({
  searchParams,
}: {
  searchParams: { onboarded?: string; connect?: string }
}) {
  const user = await getUser()

  let profile = user ? await getPayoutProfile(user.id) : null
  // Self-heal: if a Stripe account exists but payouts aren't marked
  // enabled yet, reconcile from Stripe now (no webhook in this app).
  // Merge only the two Stripe fields so we don't clobber the Wise
  // columns we just loaded.
  if (user && profile?.stripe_account_id && !profile.stripe_payouts_enabled) {
    const synced = await syncPayoutStatus(user.id)
    profile = { ...profile, ...synced }
  }

  const connected = Boolean(profile?.stripe_account_id)
  const payoutsEnabled = Boolean(profile?.stripe_payouts_enabled)

  // Surface which Stripe account is actually linked + recent sales so
  // the seller can see pending payouts without bouncing into Stripe.
  const connectedEmail =
    connected && profile?.stripe_account_id
      ? await getConnectedAccountEmail(profile.stripe_account_id)
      : null
  const sales = user ? await getRecentSales(user.id) : []
  const pendingWiseCents = user ? await getPendingWiseBalanceCents(user.id) : 0
  const now = Date.now()
  const status: 'not_connected' | 'pending' | 'enabled' = payoutsEnabled
    ? 'enabled'
    : connected
      ? 'pending'
      : 'not_connected'

  const wiseActive = profile?.payout_method === 'wise'
  const wiseDefaults: WiseDefaults = {
    name: profile?.wise_recipient_name ?? '',
    country: profile?.wise_recipient_country ?? '',
    currency: profile?.wise_recipient_currency ?? '',
    email: profile?.wise_recipient_email ?? '',
    bankAccount:
      (profile?.wise_recipient_details as Record<string, string> | null)?.account_number ??
      '',
    bankIfsc:
      (profile?.wise_recipient_details as Record<string, string> | null)?.ifsc_code ?? '',
    bankIban:
      (profile?.wise_recipient_details as Record<string, string> | null)?.iban ?? '',
    bankOther:
      (profile?.wise_recipient_details as Record<string, string> | null)?.other ?? '',
    active: wiseActive,
    updatedAt: profile?.payout_method_updated_at ?? null,
  }

  const statusCopy = {
    not_connected: {
      label: 'Not connected',
      tone: 'text-brand-muted',
      desc: 'Connect Stripe to start receiving payouts on every sale. One click — Stripe handles the rest.',
    },
    pending: {
      label: 'Finish onboarding',
      tone: 'text-brand-gold-dark',
      desc: 'Your Stripe account exists but Stripe still needs a couple of details before payouts can run.',
    },
    enabled: {
      label: 'Live',
      tone: 'text-brand-gold-dark',
      desc: 'Payouts are running. Money lands in your bank on Stripe’s schedule, not ours.',
    },
  }[status]

  return (
    <div className="paper">
      {/* breadcrumb */}
      <div className="max-w-page mx-auto px-6 lg:px-10 pt-8 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted"
        >
          <Link href="/dashboard?view=selling" className="hover:text-brand-gold transition-colors">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink">Payouts</span>
        </nav>
      </div>

      <section className="px-6 lg:px-10 pt-10 sm:pt-14 pb-14 sm:pb-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Stripe Connect
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Get <em className="italic text-brand-gold font-medium">paid.</em>
          </h1>
          <p className="mt-5 text-brand-muted max-w-prose">
            Once your Stripe is connected, every sale pays you 80% direct
            &mdash; Stripe handles the money movement and their processing
            fees come out of our 20% cut, not yours.
          </p>
        </div>
      </section>

      {searchParams.onboarded === '1' && status === 'enabled' && (
        <div className="bg-brand-cream-card border-b border-brand-hairline">
          <div className="max-w-page mx-auto px-6 lg:px-10 py-3 text-sm text-brand-gold-dark">
            Stripe connected. Your sales now pay 80% straight into your own
            Stripe account.
          </div>
        </div>
      )}
      {searchParams.connect === 'cancelled' && (
        <div className="bg-brand-cream-card border-b border-brand-hairline">
          <div className="max-w-page mx-auto px-6 lg:px-10 py-3 text-sm text-brand-muted">
            Stripe connection cancelled. Tap Connect again when you&rsquo;re ready.
          </div>
        </div>
      )}
      {searchParams.connect === 'error' && (
        <div className="bg-red-50 border-b border-red-200">
          <div className="max-w-page mx-auto px-6 lg:px-10 py-3 text-sm text-red-700">
            Couldn&rsquo;t finish connecting Stripe. Please try again, or write
            to help@skillzy.ai if it keeps happening.
          </div>
        </div>
      )}

      <section className="px-6 lg:px-10 py-16 sm:py-24">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-5">
            <div className="border border-brand-ink bg-brand-cream-card p-7">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                Status
              </span>
              <p
                className={`font-display mt-3 text-4xl tracking-tight ${statusCopy.tone}`}
                style={{ letterSpacing: '-0.025em' }}
              >
                {statusCopy.label}
              </p>
              <p className="mt-3 text-sm text-brand-muted">{statusCopy.desc}</p>

              {connected && profile?.stripe_account_id && (
                <div className="mt-5 pt-4 border-t border-brand-hairline">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                    Connected to
                  </span>
                  <p className="mt-1.5 text-sm">
                    {connectedEmail ?? '—'}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-brand-muted break-all">
                    {profile.stripe_account_id}
                  </p>
                  <div className="mt-4">
                    <DisconnectButton />
                  </div>
                </div>
              )}

              <div className="mt-7">
                {status === 'enabled' ? (
                  <Link
                    href="https://dashboard.stripe.com/payments"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
                  >
                    Open your Stripe dashboard →
                  </Link>
                ) : !hasStripe ? (
                  <p className="text-xs text-brand-muted">
                    Demo mode &mdash; add Stripe keys to enable Connect.
                  </p>
                ) : status === 'pending' ? (
                  <ConnectButton label="Finish on Stripe" />
                ) : (
                  <ConnectButton label="Connect Stripe" />
                )}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-7">
            <h2
              className="font-display text-3xl sm:text-4xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              How it works
            </h2>
            <ol className="mt-7 divide-y divide-brand-hairline border-y border-brand-hairline">
              {[
                {
                  title: 'Click Connect',
                  desc: 'We send you to Stripe to link your own existing Stripe account. No new account, no separate dashboard.',
                },
                {
                  title: 'Authorise Skillzy',
                  desc: 'One screen on Stripe — approve Skillzy to send your sales to your account. Don&rsquo;t have Stripe yet? You can create one in the same flow.',
                },
                {
                  title: 'Sell',
                  desc: 'Every sale pays a clean 80% straight into your own Stripe account. Skillzy keeps 20% — which covers Stripe’s processing fees, so 80% is what you actually get. The money shows in your normal Stripe dashboard.',
                },
                {
                  title: 'Payouts',
                  desc: 'Stripe pays you out to your bank on your usual schedule — same as any other Stripe income.',
                },
              ].map((step, i) => (
                <li key={i} className="py-5 sm:py-6">
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted shrink-0 w-8">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-xl tracking-tight">
                        {step.title}
                      </h3>
                      <p
                        className="mt-1 text-sm text-brand-muted"
                        dangerouslySetInnerHTML={{ __html: step.desc }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 p-5 bg-brand-cream-card border border-brand-hairline text-sm text-brand-muted">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold block mb-2">
                Refunds
              </span>
              If a buyer disputes a charge or you choose to refund a sale,
              Skillzy reverses it through Stripe. Your Stripe balance will
              show the deduction on the next reconciliation.
            </div>
          </div>
        </div>
      </section>

      {/* Wise — alternative payout method for creators in the ~115
          countries Stripe Connect doesn't reach. Renders below the
          Stripe card so it's a clear "or" not a replacement. */}
      <section className="px-6 lg:px-10 py-14 sm:py-20 border-t border-brand-hairline bg-brand-navy-deep/[0.02]">
        <div className="max-w-page mx-auto">
          <div className="mb-8 flex items-baseline gap-4 flex-wrap">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
              — or —
            </span>
            <h2
              className="font-display text-3xl sm:text-4xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Not in a Stripe country?
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <WiseCard
                defaults={wiseDefaults}
                pendingBalanceCents={pendingWiseCents}
                currency="usd"
              />
            </div>
            <aside className="lg:col-span-5">
              <div className="border border-brand-hairline p-6 bg-brand-cream-card">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                  How Wise payouts work
                </span>
                <ol className="mt-4 space-y-4 text-sm text-brand-muted">
                  <li>
                    <span className="font-semibold text-brand-ink">01 · You save details.</span>{' '}
                    Wise account email or local bank fields — takes a minute.
                  </li>
                  <li>
                    <span className="font-semibold text-brand-ink">02 · You sell.</span>{' '}
                    Every sale accrues 80% against your account. Dashboard shows the running balance.
                  </li>
                  <li>
                    <span className="font-semibold text-brand-ink">03 · Balance ≥ $50 USD.</span>{' '}
                    Our nightly cron fires a Wise transfer to your account in your chosen currency.
                  </li>
                  <li>
                    <span className="font-semibold text-brand-ink">04 · Cash arrives.</span>{' '}
                    Wise usually settles in 1–2 business days. You get a confirmation email each time.
                  </li>
                </ol>
                <p className="mt-5 pt-4 border-t border-brand-hairline text-xs text-brand-muted">
                  Wise covers ~160 countries including India, Pakistan, Nigeria,
                  Argentina, Brazil, Egypt, and most of SE Asia.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Recent sales — pending payout */}
      {sales.length > 0 && (
        <section className="px-6 lg:px-10 py-12 sm:py-16 border-t border-brand-hairline">
          <div className="max-w-page mx-auto">
            <h2
              className="font-display text-3xl sm:text-4xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Recent sales
            </h2>
            <p className="mt-3 text-sm text-brand-muted max-w-prose">
              Every paid sale on your listings. Stripe holds funds for
              roughly {PENDING_DAYS} days before they become available — the
              tag below shows where each one is in that clock.
            </p>

            <ul className="mt-8 divide-y divide-brand-hairline border-y border-brand-hairline">
              {sales.map((s) => {
                const ageDays = (now - new Date(s.created_at).getTime()) / DAY_MS
                const pending = ageDays < PENDING_DAYS
                const availableDate = new Date(
                  new Date(s.created_at).getTime() + PENDING_DAYS * DAY_MS,
                ).toLocaleDateString()
                return (
                  <li
                    key={s.id}
                    className="py-4 flex flex-wrap items-baseline justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-display text-lg" style={{ letterSpacing: '-0.018em' }}>
                        {s.listing_title}
                      </p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-brand-muted">
                        {new Date(s.created_at).toLocaleDateString()} ·{' '}
                        {money(s.amount_cents, s.currency)} sale
                        {pending ? (
                          <>
                            {' '}
                            ·{' '}
                            <span className="text-brand-gold-dark">
                              pending — available ~{availableDate}
                            </span>
                          </>
                        ) : (
                          <>
                            {' '}
                            · <span className="text-brand-muted">settled</span>
                          </>
                        )}
                      </p>
                    </div>
                    <p
                      className="font-display text-xl text-brand-gold shrink-0"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      +{money(s.payout_cents, s.currency)}
                    </p>
                  </li>
                )
              })}
            </ul>

            <p className="mt-6 text-xs text-brand-muted">
              &ldquo;Available&rdquo; is Stripe&rsquo;s settlement estimate. Actual
              payout to your bank depends on the cadence set in your Stripe
              dashboard.
            </p>
          </div>
        </section>
      )}
    </div>
  )
}
