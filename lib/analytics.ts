// Provider-agnostic analytics. No-op until a provider is wired, so
// event instrumentation can land now and the Plausible-vs-PostHog-
// vs-Vercel decision doesn't block anything. When a provider is
// chosen, implement `send` once here — every call site already
// emits the right events.

export type AnalyticsEvent =
  | 'listing_view'
  | 'listing_buy_click'
  | 'checkout_started'
  | 'checkout_completed'
  | 'newsletter_signup'
  | 'free_listing_download'
  | 'creator_signup'
  | 'referral_click'

type Props = Record<string, string | number | boolean | undefined>

function send(event: AnalyticsEvent, props?: Props) {
  if (typeof window === 'undefined') return
  // Vercel Analytics custom events, if the script is present.
  const w = window as unknown as { va?: (...a: unknown[]) => void }
  if (typeof w.va === 'function') {
    w.va('event', { name: event, ...props })
    return
  }
  // Plausible, if present.
  const p = window as unknown as {
    plausible?: (name: string, opts?: { props?: Props }) => void
  }
  if (typeof p.plausible === 'function') {
    p.plausible(event, props ? { props } : undefined)
    return
  }
  // No provider yet — keep a dev breadcrumb, never throw.
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, props ?? {})
  }
}

export const track = {
  listingView: (id: string) => send('listing_view', { id }),
  listingBuyClick: (id: string, price: string) =>
    send('listing_buy_click', { id, price }),
  checkoutStarted: (id: string) => send('checkout_started', { id }),
  checkoutCompleted: (id: string) => send('checkout_completed', { id }),
  newsletterSignup: (source: string) =>
    send('newsletter_signup', { source }),
  freeListingDownload: (id: string) =>
    send('free_listing_download', { id }),
  creatorSignup: () => send('creator_signup'),
  referralClick: (ref: string) => send('referral_click', { ref }),
}
