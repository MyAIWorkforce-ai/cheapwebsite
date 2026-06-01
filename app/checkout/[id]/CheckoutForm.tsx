'use client'

import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  loadStripe,
  type Stripe,
  type StripeElements,
  type Appearance,
} from '@stripe/stripe-js'
import { COUNTRIES_TOP, COUNTRIES_ALL } from '@/lib/countries'
import { registerDemoInterest } from '@/app/_actions/demo-interest'

// Skillzy-branded styling for the embedded Stripe Payment Element so the
// card form blends into our page — the buyer never leaves skillzy.ai and
// never sees the underlying Stripe account name.
const appearance: Appearance = {
  theme: 'flat',
  variables: {
    colorPrimary: '#C19E50',
    colorBackground: '#F2F4F8',
    colorText: '#0F1729',
    colorTextSecondary: '#5F6B7E',
    colorDanger: '#b91c1c',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    borderRadius: '0px',
    spacingUnit: '4px',
  },
  rules: {
    '.Input': {
      border: '1px solid #CCD2DD',
      backgroundColor: 'transparent',
      padding: '12px',
    },
    '.Input:focus': {
      border: '1px solid #C19E50',
      boxShadow: 'none',
    },
    '.Label': {
      color: '#5F6B7E',
      fontSize: '11px',
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
    },
  },
}

export default function CheckoutForm({
  listingId,
  price,
  defaultEmail,
  demo = false,
}: {
  listingId: string
  price: string
  defaultEmail?: string
  demo?: boolean
}) {
  const [email, setEmail] = useState(defaultEmail ?? '')
  const [error, setError] = useState<string | null>(null)
  const [unavailable, setUnavailable] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const [paying, setPaying] = useState(false)
  const [ready, setReady] = useState(false)

  // Mock mode (no Stripe configured): keep the old redirect behaviour.
  const [mockRedirect, setMockRedirect] = useState<string | null>(null)

  const paymentElRef = useRef<HTMLDivElement>(null)
  const stripeRef = useRef<Stripe | null>(null)
  const elementsRef = useRef<StripeElements | null>(null)

  // Open checkout at the top (the payment form), not wherever the buyer
  // was scrolled on the listing page when they tapped buy. useLayoutEffect
  // fires before the browser paints, and we also turn off the browser's
  // own scroll restoration so it doesn't override us.
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  const amountCents = Math.round(
    Number(price.replace(/[^0-9.]/g, '')) * 100,
  )

  // Initialise the embedded Payment Element in Stripe's deferred mode —
  // the PaymentIntent is only created at submit time (with the buyer's
  // email), so Stripe never sends its own account-branded receipt.
  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const res = await fetch('/api/checkout')
        const json = await res.json()
        if (cancelled) return

        if (json.mock) {
          setMockRedirect(`/order/success?id=${listingId}`)
          setInitializing(false)
          return
        }

        if (!json.publishableKey) {
          throw new Error('Payments are not fully configured.')
        }

        const stripe = await loadStripe(json.publishableKey as string)
        if (cancelled) return
        if (!stripe) throw new Error('Could not load the payment form.')

        const elements = stripe.elements({
          mode: 'payment',
          amount: amountCents,
          currency: 'usd',
          appearance,
        })
        const paymentElement = elements.create('payment', { layout: 'tabs' })
        if (!paymentElRef.current) return
        paymentElement.mount(paymentElRef.current)
        paymentElement.on('ready', () => setReady(true))

        stripeRef.current = stripe
        elementsRef.current = elements
        setInitializing(false)
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message)
          setInitializing(false)
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [listingId, amountCents])

  // Stripe's Payment Element iframe auto-focuses when it mounts, which
  // makes the browser scroll the iframe (sitting at the bottom of the
  // form) into view. Re-pin to the top once it's ready — but only if
  // the buyer hasn't deliberately scrolled away in the meantime.
  useEffect(() => {
    if (!ready) return
    if (window.scrollY < 400) window.scrollTo(0, 0)
  }, [ready])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    // Demo/sample listing: no charge. Capture the form (email +
    // country are real demand signal), ping us, then show the buyer
    // the graceful "no longer available" message.
    if (demo) {
      const fd = new FormData(e.currentTarget as HTMLFormElement)
      fd.set('listing', listingId)
      fd.set('email', email)
      setPaying(true)
      try {
        await registerDemoInterest({}, fd)
      } catch {
        /* non-fatal — the buyer still sees the message */
      }
      setUnavailable(true)
      setPaying(false)
      return
    }

    // Mock checkout — Stripe not configured.
    if (mockRedirect) {
      window.location.href = email
        ? `${mockRedirect}&email=${encodeURIComponent(email)}`
        : mockRedirect
      return
    }

    const stripe = stripeRef.current
    const elements = elementsRef.current
    if (!stripe || !elements) {
      setError('The payment form is still loading. One moment…')
      return
    }

    setPaying(true)

    // 1. Validate the card details collected by the Payment Element.
    const submitResult = await elements.submit()
    if (submitResult.error) {
      setError(submitResult.error.message ?? 'Please check your card details.')
      setPaying(false)
      return
    }

    // 2. Create the PaymentIntent now that we have a valid email.
    let clientSecret: string
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: listingId, email }),
      })
      const json = await res.json()
      if (!res.ok || !json.clientSecret) {
        throw new Error(json.error ?? 'Could not start the payment.')
      }
      clientSecret = json.clientSecret as string
    } catch (err) {
      setError((err as Error).message)
      setPaying(false)
      return
    }

    // 3. Confirm the payment. On success Stripe redirects to return_url.
    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/order/success?id=${listingId}&email=${encodeURIComponent(email)}`,
      },
    })

    if (stripeError) {
      setError(stripeError.message ?? 'Payment could not be completed.')
      setPaying(false)
    }
  }

  if (unavailable) {
    return (
      <div className="lg:col-span-7">
        <div className="border border-brand-ink bg-brand-cream-card p-7 sm:p-8">
          <p className="font-display text-2xl sm:text-3xl tracking-tight">
            Sorry — this isn’t available anymore.
          </p>
          <p className="mt-3 text-brand-muted max-w-prose">
            This was a sample listing, so there was no charge. Browse the
            marketplace for agent skills and setups you can buy and download
            right now.
          </p>
          <a
            href="/marketplace"
            className="mt-7 inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
          >
            Browse the marketplace
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="lg:col-span-7">
      <fieldset className="space-y-7" disabled={paying}>
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
            <optgroup label="Common">
              {COUNTRIES_TOP.map((c) => (
                <option key={`top-${c.code}`} value={c.code}>
                  {c.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Every country">
              {COUNTRIES_ALL.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </optgroup>
          </select>
        </label>
      </fieldset>

      <div className="mt-10 pt-10 border-t border-brand-hairline">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
          Payment
        </span>

        {!mockRedirect && (
          <div className="mt-5 min-h-[1px]">
            <div ref={paymentElRef} />
            {initializing && (
              <p className="text-sm text-brand-muted">
                Loading secure payment…
              </p>
            )}
          </div>
        )}

        <p className="mt-6 text-sm text-brand-muted max-w-md">
          Card details are entered securely on this page and handled by Stripe.
          Nothing sensitive ever touches Skillzy&rsquo;s servers.
        </p>
      </div>

      <button
        type="submit"
        disabled={paying || initializing || (!mockRedirect && !ready)}
        className="mt-8 inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-8 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
      >
        {paying ? 'Processing…' : `Pay ${price} — drop it in`}
        {!paying && <span aria-hidden>→</span>}
      </button>

      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

      <p className="mt-4 text-xs text-brand-muted max-w-md">
        You&rsquo;re only charged when you confirm. Secured by Stripe. By
        paying you agree to the{' '}
        <a
          href="/terms"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-brand-ink"
        >
          Terms
        </a>{' '}
        and{' '}
        <a
          href="/refunds"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-brand-ink"
        >
          Refund Policy
        </a>{' '}
        — digital goods, all sales final.
      </p>
    </form>
  )
}
