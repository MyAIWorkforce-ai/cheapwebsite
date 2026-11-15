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

type FbqFn = (
  command: 'init' | 'track' | 'trackCustom',
  eventName: string,
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

// Meta Pixel event (fbq). Prefers Meta's "standard events"
// (Purchase, Lead, CompleteRegistration, ViewContent) so campaigns
// built in Meta Ads Manager can optimise against them out of the
// box; falls back to `trackCustom` for anything Meta doesn't name.
// No-op when the pixel isn't loaded.
export function fireMetaEvent(
  eventName: string,
  opts?: { value?: number; currency?: string; isStandard?: boolean } & Record<string, unknown>,
) {
  if (typeof window === 'undefined') return
  const w = window as unknown as { fbq?: FbqFn }
  if (typeof w.fbq !== 'function') return
  const { isStandard = true, ...params } = opts ?? {}
  const method = isStandard ? 'track' : 'trackCustom'
  w.fbq(method, eventName, params)
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

// Goal-specific Google Ads conversion labels, one env var per goal.
// Each is OPTIONAL — if unset, firing is a no-op. Set in Vercel
// after creating the matching conversion action in Google Ads UI.
//
// Format: 'AbCdEfGhIjK' (the label alone; the AW-xxxxxxxxx account
// ID lives in NEXT_PUBLIC_GOOGLE_ADS_ID and is combined with the
// label at fire time by fireAdsConversion()).
const ADS_LABEL = {
  purchase: process.env.NEXT_PUBLIC_ADS_LABEL_PURCHASE?.trim() ?? '',
  listingPublished:
    process.env.NEXT_PUBLIC_ADS_LABEL_LISTING_PUBLISHED?.trim() ?? '',
  grokBotTemplateDownload:
    process.env.NEXT_PUBLIC_ADS_LABEL_GROK_BOT_TEMPLATE?.trim() ?? '',
  grokBotHubBrowse:
    process.env.NEXT_PUBLIC_ADS_LABEL_GROK_BOT_BROWSE?.trim() ?? '',
  grokBotHubSell:
    process.env.NEXT_PUBLIC_ADS_LABEL_GROK_BOT_SELL?.trim() ?? '',
} as const

export const track = {
  listingView: (id: string) => {
    send('listing_view', { id })
    fireMetaEvent('ViewContent', { content_ids: [id], content_type: 'product' })
  },
  listingBuyClick: (id: string, price: string) => {
    send('listing_buy_click', { id, price })
    fireMetaEvent('AddToCart', {
      content_ids: [id],
      content_type: 'product',
      value: Number(price.replace(/[^0-9.]/g, '')) || undefined,
      currency: 'USD',
    })
  },
  checkoutStarted: (id: string) => {
    send('checkout_started', { id })
    fireMetaEvent('InitiateCheckout', { content_ids: [id] })
  },
  checkoutCompleted: (id: string, opts?: { value?: number; transactionId?: string }) => {
    send('checkout_completed', {
      id,
      value: opts?.value,
      transaction_id: opts?.transactionId,
    })
    if (ADS_LABEL.purchase) {
      fireAdsConversion(ADS_LABEL.purchase, {
        value: opts?.value,
        currency: 'USD',
        transactionId: opts?.transactionId,
      })
    }
    fireMetaEvent('Purchase', {
      content_ids: [id],
      content_type: 'product',
      value: opts?.value,
      currency: 'USD',
      order_id: opts?.transactionId,
    })
  },
  newsletterSignup: (source: string) => {
    send('newsletter_signup', { source })
    fireMetaEvent('Subscribe', { content_name: source })
  },
  freeListingDownload: (id: string) => {
    send('free_listing_download', { id })
    fireMetaEvent('Lead', { content_ids: [id] })
  },
  creatorSignup: () => {
    send('creator_signup')
    fireMetaEvent('CompleteRegistration', { content_name: 'creator' })
  },
  referralClick: (ref: string) => {
    send('referral_click', { ref })
    fireMetaEvent('ReferralClick', { ref, isStandard: false })
  },
  grokBotTemplateDownload: (source: string) => {
    send('grok_bot_template_download', { source })
    if (ADS_LABEL.grokBotTemplateDownload) {
      fireAdsConversion(ADS_LABEL.grokBotTemplateDownload)
    }
    fireMetaEvent('Lead', {
      content_name: 'grok_bot_template',
      content_category: 'creator_lead',
      source,
    })
  },
  grokBotHubCta: (cta: 'browse' | 'sell' | 'guide' | 'template') => {
    send('grok_bot_hub_cta', { cta })
    if (cta === 'browse' && ADS_LABEL.grokBotHubBrowse) {
      fireAdsConversion(ADS_LABEL.grokBotHubBrowse)
    }
    if (cta === 'sell' && ADS_LABEL.grokBotHubSell) {
      fireAdsConversion(ADS_LABEL.grokBotHubSell)
    }
    fireMetaEvent('GrokBotHubCta', { cta, isStandard: false })
  },
  listingPublished: (listingId?: string) => {
    send('creator_signup', { listing_id: listingId }) // reuse existing GA event name
    if (ADS_LABEL.listingPublished) {
      fireAdsConversion(ADS_LABEL.listingPublished, {
        transactionId: listingId,
      })
    }
    fireMetaEvent('CompleteRegistration', {
      content_name: 'listing_published',
      content_category: 'creator',
    })
  },
}
