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
  | 'grok_bot_template_download'
  | 'grok_bot_hub_cta'

type Props = Record<string, string | number | boolean | undefined>

type GtagFn = (
  command: 'event' | 'config' | 'set' | 'js',
  targetOrEvent: string | Date,
  params?: Record<string, unknown>,
) => void

function send(event: AnalyticsEvent, props?: Props) {
  if (typeof window === 'undefined') return

  // Google Analytics / Google Ads via gtag.js (loaded by
  // components/GoogleTags.tsx when the matching env vars are set).
  // Fires both GA4 events AND Google Ads conversion events — Google's
  // tag knows how to route by configured ID.
  const g = window as unknown as { gtag?: GtagFn }
  if (typeof g.gtag === 'function') {
    g.gtag('event', event, props ?? {})
    // No `return` — also fire into Vercel/Plausible below if either is
    // present, so a session with both GA4 and Plausible gets a single
    // event echoed to both.
  }

  // Vercel Analytics custom events, if the script is present.
  const w = window as unknown as { va?: (...a: unknown[]) => void }
  if (typeof w.va === 'function') {
    w.va('event', { name: event, ...props })
  }

  // Plausible, if present.
  const p = window as unknown as {
    plausible?: (name: string, opts?: { props?: Props }) => void
  }
  if (typeof p.plausible === 'function') {
    p.plausible(event, props ? { props } : undefined)
  }

  // No provider wired — keep a dev breadcrumb, never throw.
  if (
    process.env.NODE_ENV === 'development' &&
    typeof g.gtag !== 'function' &&
    typeof w.va !== 'function' &&
    typeof p.plausible !== 'function'
  ) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, props ?? {})
  }
}

// Google Ads conversion event — used on goal pages (download the
// template, start a listing, complete a sale). Needs a conversion
// label from the Google Ads UI. Reads the account ID from the same
// env var the <GoogleTags /> component uses.
//
// Example call site:
//   fireAdsConversion('AbCdEfGhIjK', { value: 1, currency: 'USD' })
export function fireAdsConversion(
  label: string,
  opts?: { value?: number; currency?: string; transactionId?: string },
) {
  if (typeof window === 'undefined') return
  const id = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim()
  if (!id || !label) return
  const g = window as unknown as { gtag?: GtagFn }
  if (typeof g.gtag !== 'function') return
  g.gtag('event', 'conversion', {
    send_to: `${id}/${label}`,
    value: opts?.value,
    currency: opts?.currency ?? 'USD',
    transaction_id: opts?.transactionId,
  })
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
  grokBotTemplateDownload: (source: string) =>
    send('grok_bot_template_download', { source }),
  grokBotHubCta: (cta: 'browse' | 'sell' | 'guide' | 'template') =>
    send('grok_bot_hub_cta', { cta }),
}
