import Link from 'next/link'
import { getUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { hasSupabase, hasStripe } from '@/lib/env'
import { getStripe } from '@/lib/stripe'
import ConnectButton from './ConnectButton'
import { syncPayoutStatus } from '@/lib/stripe-connect'

export const metadata = {
  title: 'Payouts',
  description: 'Connect Stripe and receive payouts on every sale.',
  robots: { index: false, follow: false },
}

type ProfileRow = {
  stripe_account_id: string | null
  stripe_payouts_enabled: boolean
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
      .select('stripe_account_id, stripe_payouts_enabled')
      .eq('id', userId)
      .single()
    return (data as ProfileRow) ?? null
  } catch {
    return null
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
  searchParams: { onboarded?: string }
}) {
  const user = await getUser()

  let profile = user ? await getPayoutProfile(user.id) : null
  // Self-heal: if a Stripe account exists but payouts aren't marked
  // enabled yet, reconcile from Stripe now (no webhook in this app).
  if (user && profile?.stripe_account_id && !profile.stripe_payouts_enabled) {
    profile = await syncPayoutStatus(user.id)
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
  const now = Date.now()
  const status: 'not_connected' | 'pending' | 'enabled' = payoutsEnabled
    ? 'enabled'
    : connected
      ? 'pending'
      : 'not_connected'

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
            Skillzy never holds your money. Stripe pays you directly the
            moment a sale completes &mdash; minus the 20% platform fee.
          </p>
        </div>
      </section>

      {searchParams.onboarded === '1' && status === 'enabled' && (
        <div className="bg-brand-cream-card border-b border-brand-hairline">
          <div className="max-w-page mx-auto px-6 lg:px-10 py-3 text-sm text-brand-gold-dark">
            Stripe onboarding complete. You&rsquo;re ready to sell.
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
                </div>
              )}

              <div className="mt-7">
                {status === 'enabled' ? (
                  <Link
                    href="https://dashboard.stripe.com/express"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
                  >
                    Open Stripe dashboard →
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
                  desc: 'We send you to Stripe&rsquo;s onboarding screen with a few prefilled details.',
                },
                {
                  title: 'Stripe verifies you',
                  desc: 'Usually instant. Sometimes Stripe asks for an ID photo or a tax number.',
                },
                {
                  title: 'Sell',
                  desc: 'Every checkout uses your Connect account. Stripe takes its fee, Skillzy takes 20%, you keep 80%.',
                },
                {
                  title: 'Payouts',
                  desc: 'Money lands in your bank on Stripe&rsquo;s schedule. You can change the cadence inside Stripe.',
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
