'use client'

import { FormEvent, useState } from 'react'

export default function CheckoutForm({
  listingId,
  price,
  defaultEmail,
}: {
  listingId: string
  price: string
  defaultEmail?: string
}) {
  const [email, setEmail] = useState(defaultEmail ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: listingId, email }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Checkout failed')
      if (!json.redirectUrl) throw new Error('No redirect URL returned')
      window.location.href = json.redirectUrl
    } catch (err) {
      setError((err as Error).message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="lg:col-span-7">
      <fieldset className="space-y-7">
        <legend className="font-display text-2xl tracking-tight mb-5">
          Where do we send the files?
        </legend>

        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60"
          />
        </label>

        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
            Country
          </span>
          <select
            name="country"
            defaultValue="AU"
            className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg"
          >
            <option value="AU">Australia</option>
            <option value="NZ">New Zealand</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="DE">Germany</option>
            <option value="other">Somewhere else</option>
          </select>
        </label>
      </fieldset>

      <p className="mt-12 pt-10 border-t border-brand-hairline text-sm text-brand-muted max-w-md">
        Card details are entered on Stripe&rsquo;s secure checkout page after
        you confirm — nothing sensitive ever lives on Skillzy.
      </p>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-8 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
      >
        {loading ? 'Redirecting to Stripe…' : `Pay ${price} — plug it in`}
        {!loading && <span aria-hidden>→</span>}
      </button>

      {error && (
        <p className="mt-4 text-sm text-red-700">{error}</p>
      )}

      <p className="mt-4 text-xs text-brand-muted max-w-md">
        Stripe charges only on confirmation. 30-day refund if the bundle
        doesn&rsquo;t do what the listing said.
      </p>
    </form>
  )
}
