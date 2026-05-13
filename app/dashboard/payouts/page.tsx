import Link from 'next/link'
import { getUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { hasSupabase, hasStripe } from '@/lib/env'
import ConnectButton from './ConnectButton'

export const metadata = {
  title: 'Payouts',
  description: 'Connect Stripe and receive payouts on every sale.',
  robots: { index: false, follow: false },
}

type ProfileRow = {
  stripe_account_id: string | null
  stripe_payouts_enabled: boolean
}

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

export default async function PayoutsPage({
  searchParams,
}: {
  searchParams: { onboarded?: string }
}) {
  const user = await getUser()

  const profile = user ? await getPayoutProfile(user.id) : null

  const connected = Boolean(profile?.stripe_account_id)
  const payoutsEnabled = Boolean(profile?.stripe_payouts_enabled)
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
    </div>
  )
}
