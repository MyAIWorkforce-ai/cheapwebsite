'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { saveWiseDetails, disconnectWise, type WiseSetupState } from './actions'

const initial: WiseSetupState = {}

// Countries where Stripe Connect Standard is NOT available and we
// steer creators toward Wise instead. The full country list is
// ~160 (Wise's coverage); listing every one in a native <select> is
// noise. We surface the top-30 by expected creator volume, then a
// free-text "Other country" for the tail. If a creator picks Other,
// they type the ISO code manually.
const COMMON_COUNTRIES: Array<{ code: string; name: string }> = [
  { code: 'IN', name: 'India' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'NP', name: 'Nepal' },
  { code: 'PH', name: 'Philippines' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'TH', name: 'Thailand' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'KE', name: 'Kenya' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'EG', name: 'Egypt' },
  { code: 'MA', name: 'Morocco' },
  { code: 'AR', name: 'Argentina' },
  { code: 'BR', name: 'Brazil' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'MX', name: 'Mexico' },
  { code: 'PE', name: 'Peru' },
  { code: 'TR', name: 'Türkiye' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'RO', name: 'Romania' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'CA', name: 'Canada' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
]

// Currencies we surface prominently. Wise supports 50+ target
// currencies but 8 cover ~90% of realistic recipient volume for
// Skillzy's creator base.
const CURRENCIES = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'PHP', name: 'Philippine Peso' },
  { code: 'NGN', name: 'Nigerian Naira' },
  { code: 'BRL', name: 'Brazilian Real' },
]

export type WiseDefaults = {
  name: string
  country: string
  currency: string
  email: string
  bankAccount: string
  bankIfsc: string
  bankIban: string
  bankOther: string
  active: boolean
  updatedAt: string | null
}

function SaveButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-brand-gold text-brand-ink font-semibold px-6 py-3 text-sm hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
    >
      {pending ? 'Saving…' : 'Save Wise details'}
    </button>
  )
}

function DisconnectButton() {
  const [confirming, setConfirming] = useState(false)
  async function onClick() {
    if (!confirming) {
      setConfirming(true)
      window.setTimeout(() => setConfirming(false), 4000)
      return
    }
    await disconnectWise()
    setConfirming(false)
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs uppercase tracking-wider text-brand-muted hover:text-red-700 transition-colors"
    >
      {confirming ? 'Tap to confirm' : 'Disconnect Wise'}
    </button>
  )
}

export default function WiseCard({
  defaults,
  pendingBalanceCents,
  currency,
}: {
  defaults: WiseDefaults
  pendingBalanceCents: number
  currency: string
}) {
  const [state, action] = useFormState(saveWiseDetails, initial)
  const [mode, setMode] = useState<'email' | 'bank'>(
    defaults.email && !defaults.bankAccount && !defaults.bankIban
      ? 'email'
      : defaults.bankAccount || defaults.bankIban || defaults.bankOther
        ? 'bank'
        : 'email',
  )
  const [country, setCountry] = useState(defaults.country || 'IN')
  const isIndia = country === 'IN'
  const isEuro = ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'IE', 'PT', 'AT', 'FI', 'GR'].includes(country)
  const pendingUsd = (pendingBalanceCents / 100).toFixed(2)

  return (
    <div className="border border-brand-ink bg-brand-cream-card p-7">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
        International payouts
      </span>
      <p
        className="font-display mt-3 text-4xl tracking-tight"
        style={{ letterSpacing: '-0.025em' }}
      >
        Get paid via Wise
      </p>
      <p className="mt-3 text-sm text-brand-muted">
        For creators in the ~115 countries Stripe Connect doesn&rsquo;t cover
        (India, Pakistan, Nigeria, Argentina, and more). Same clean 80% split,
        paid straight into your Wise account or local bank.
      </p>

      {defaults.active && (
        <div className="mt-5 pt-4 border-t border-brand-hairline flex items-baseline justify-between gap-4 flex-wrap">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
              Pending payout
            </span>
            <p
              className="font-display text-3xl mt-1 text-brand-gold-dark"
              style={{ letterSpacing: '-0.025em' }}
            >
              ${pendingUsd} {currency.toUpperCase()}
            </p>
            <p className="mt-1 text-xs text-brand-muted">
              Payouts arrive in your Wise account within a few business days.
            </p>
          </div>
          <DisconnectButton />
        </div>
      )}

      <form action={action} className="mt-6 space-y-4">
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
            Your legal name (as on your bank / Wise)
          </span>
          <input
            type="text"
            name="name"
            required
            defaultValue={defaults.name}
            placeholder="e.g. Raghav Sharma"
            className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-base"
          />
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
              Country
            </span>
            <select
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-base"
            >
              {COMMON_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
              Payout currency
            </span>
            <select
              name="currency"
              defaultValue={defaults.currency || (isIndia ? 'INR' : 'USD')}
              className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-base"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} · {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <fieldset className="pt-2">
          <legend className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted mb-2">
            How should we pay you?
          </legend>
          <div className="flex flex-wrap gap-2">
            <label
              className={`inline-flex items-center gap-2 px-3 py-1.5 border cursor-pointer transition-colors text-sm ${
                mode === 'email'
                  ? 'border-brand-ink bg-brand-ink text-white'
                  : 'border-brand-hairline hover:border-brand-ink'
              }`}
            >
              <input
                type="radio"
                name="_mode"
                value="email"
                checked={mode === 'email'}
                onChange={() => setMode('email')}
                className="sr-only"
              />
              Wise account email
            </label>
            <label
              className={`inline-flex items-center gap-2 px-3 py-1.5 border cursor-pointer transition-colors text-sm ${
                mode === 'bank'
                  ? 'border-brand-ink bg-brand-ink text-white'
                  : 'border-brand-hairline hover:border-brand-ink'
              }`}
            >
              <input
                type="radio"
                name="_mode"
                value="bank"
                checked={mode === 'bank'}
                onChange={() => setMode('bank')}
                className="sr-only"
              />
              Local bank account
            </label>
          </div>
        </fieldset>

        {mode === 'email' ? (
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
              Wise account email
            </span>
            <input
              type="email"
              name="wise_email"
              defaultValue={defaults.email}
              placeholder="you@example.com"
              className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-base"
            />
            <span className="mt-2 block text-xs text-brand-muted">
              Wise routes the payout to whichever bank you&rsquo;ve linked to that
              account. Don&rsquo;t have a Wise account yet? Sign up free at{' '}
              <a
                href="https://wise.com/register"
                target="_blank"
                rel="noreferrer"
                className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
              >
                wise.com/register
              </a>{' '}
              (~5 min).
            </span>
          </label>
        ) : isIndia ? (
          <div className="space-y-4">
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Indian bank account number
              </span>
              <input
                type="text"
                name="bank_account"
                defaultValue={defaults.bankAccount}
                placeholder="e.g. 123456789012"
                className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-base"
              />
            </label>
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                IFSC code
              </span>
              <input
                type="text"
                name="bank_ifsc"
                defaultValue={defaults.bankIfsc}
                placeholder="e.g. SBIN0001234"
                className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-base uppercase"
              />
            </label>
          </div>
        ) : isEuro ? (
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
              IBAN
            </span>
            <input
              type="text"
              name="bank_iban"
              defaultValue={defaults.bankIban}
              placeholder="e.g. DE89 3704 0044 0532 0130 00"
              className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-base uppercase"
            />
          </label>
        ) : (
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
              Bank details
            </span>
            <textarea
              name="bank_other"
              rows={3}
              defaultValue={defaults.bankOther}
              placeholder="Bank name, account number, routing / SWIFT / branch code — whatever your country uses."
              className="mt-2 w-full bg-transparent border border-brand-hairline focus:border-brand-gold outline-none px-3 py-2 text-sm"
            />
            <span className="mt-2 block text-xs text-brand-muted">
              We&rsquo;ll match this to Wise&rsquo;s recipient format for your country
              when we send the payout.
            </span>
          </label>
        )}

        {state.error && (
          <p className="text-sm text-red-700">{state.error}</p>
        )}
        {state.info && (
          <p className="text-sm text-brand-gold-dark">{state.info}</p>
        )}

        <div className="pt-3 border-t border-brand-hairline flex items-center gap-4 flex-wrap">
          <SaveButton />
          {defaults.active && defaults.updatedAt && (
            <span className="text-xs text-brand-muted">
              Last updated {new Date(defaults.updatedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </form>

      <p className="mt-6 pt-5 border-t border-brand-hairline text-xs text-brand-muted">
        Wise transfer fees (~0.5&ndash;1%) come out of Skillzy&rsquo;s 20% cut, not
        your 80%. You get the same clean split as Stripe Connect creators.
      </p>
    </div>
  )
}
