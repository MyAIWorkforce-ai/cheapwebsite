---
name: site-analytics-tracking
description: Pick + wire analytics (GA4 vs Plausible vs Vercel vs Fathom vs PostHog), GTM if needed, consent banner picked for the buyer's region (Cookiebot / Iubenda / Termly / CookieYes / OneTrust), conversion event tracking that matters. Get the buyer to a "I can see what's working" state.
allowed_platforms: [claude, openclaw, chatgpt]
tools: [file.write]
---

# Analytics + tracking

## Your job

Wire up an analytics setup the buyer will actually look at, with
the right consent for their region, tracking the conversion events
that matter. Different region defaults; different buyer types.

Skip everything that's not in scope. Most small-biz sites need:
one analytics tool + one consent banner + 3-5 conversion events.
That's it.

## Step 1 — pick the analytics tool

Decision tree:

| Buyer signal | Recommend |
|---|---|
| AU/NZ/UK/CA buyer, privacy-conscious, doesn't run paid ads | **Plausible** |
| US buyer, runs paid ads, needs to share with marketers/agencies | **GA4** |
| AU/NZ/UK/CA buyer who runs paid ads | **GA4 + consent banner** |
| Buyer on Vercel, wants zero config | **Vercel Analytics** (free tier; 50K events/mo) |
| Solo founder, wants free + simple + privacy-first | **Plausible** ($9/mo) or **Fathom** ($14/mo) or **Simple Analytics** ($19/mo) |
| Product team, wants funnels + retention | **PostHog** (free tier generous) |
| B2B SaaS, needs CRM integration | **PostHog** or **Mixpanel** |
| E-commerce | **GA4** + **Meta Pixel** (with consent) |

Default for this bundle: **Plausible** for non-US, **GA4** for US.

Confirm the pick before wiring.

## Step 2 — wire it (per tool)

### Plausible

Account: `plausible.io/register`. Pricing: $9/mo for 10K monthly
pageviews; trial 30 days.

Add the site:
1. Plausible dashboard → "+ Add a website"
2. Domain: `theirdomain.com`
3. Timezone: from BUSINESS CONFIG
4. Copy the script tag (looks like):

```html
<script defer data-domain="theirdomain.com" src="https://plausible.io/js/script.js"></script>
```

In Next.js, add to `src/app/layout.tsx`:

```tsx
import Script from 'next/script'

// inside <body>:
<Script
  defer
  data-domain="theirdomain.com"
  src="https://plausible.io/js/script.js"
  strategy="afterInteractive"
/>
```

For self-hosted Plausible (advanced), swap the script URL.

#### Custom events with Plausible

```html
<script defer data-domain="theirdomain.com" src="https://plausible.io/js/script.outbound-links.tagged-events.js"></script>
```

Then:

```html
<a href="tel:+61812345678" class="plausible-event-name=phone_click">Call now</a>
<button class="plausible-event-name=form_submit_book">Book a callout</button>
```

### Google Analytics 4

Account: `analytics.google.com` → Admin → Create Property.

1. Property name, time zone, currency
2. Business details
3. Pick "Web" platform
4. Stream name, URL, get the Measurement ID (G-XXXXXXXXXX)

In Next.js, set the ID as env var:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Then add to `src/app/layout.tsx` (loaded conditionally on consent —
see step 4):

```tsx
import Script from 'next/script'

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="ga-init" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
      anonymize_ip: true,
      send_page_view: false,  // we'll fire manually after consent
    });
  `}
</Script>
```

### Vercel Analytics

Easiest. Already integrated.

1. Vercel project → Analytics → enable
2. Install in the project:

```bash
npm install @vercel/analytics
```

3. In `src/app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react'

// inside <body>:
<Analytics />
```

Free tier: 50K events/month. Beyond that: $10/mo for 250K.

### Fathom

Same shape as Plausible — script tag, custom events via class names
or `fathom('trackGoal', ...)`. Use Fathom over Plausible if buyer
wants a single bill with their email marketing (some bundles
available).

### PostHog

Self-host or cloud. Cloud free tier: 1M events/month.

```bash
npm install posthog-js
```

```tsx
// src/app/posthog-provider.tsx
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: 'https://app.posthog.com',
    capture_pageview: false,  // we'll do it after consent
  })
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

Use PostHog when the buyer wants funnels, session recordings, or
feature flags. Overkill for a marketing site.

## Step 3 — Google Tag Manager (only if needed)

Skip GTM for solo-founder small-biz sites. Add it only if the buyer:
- Runs multiple ad platforms (Meta, Google Ads, LinkedIn Ads,
  TikTok) and needs to manage pixels without redeploys
- Has a marketing agency that wants tag access
- Needs to A/B test via Optimize / VWO

If yes:

1. `tagmanager.google.com` → New container → Web
2. Get the GTM ID (GTM-XXXXXXX)
3. Add the snippet to `<head>` and `<body>` per GTM instructions
4. Add tags inside GTM (not in code) for GA4, Meta Pixel, etc.

The trade-off: GTM = no redeploys for marketing, but adds 50-100ms
to page load + an extra dependency.

## Step 4 — consent banner

Decision by region (from regional reference):

| Region | Banner needed? | Free option |
|---|---|---|
| AU | Recommended for GA4/Meta; not for Plausible-only | CookieYes free |
| NZ | Recommended | CookieYes free |
| UK | Mandatory for non-essential cookies; ICO enforces | CookieYes free / Cookiebot paid |
| US | Required CA + 5+ states; recommended everywhere | Termly free |
| CA | Required Quebec; recommended elsewhere | CookieYes free |
| If only Plausible / Fathom / Simple | Not required (no cookies) | — |

### CookieYes setup

Default free option for AU/NZ/UK/CA buyers.

1. `cookieyes.com` → sign up → add domain
2. Configure:
   - Consent type: **Implicit** (AU/NZ/CA) or **Explicit** (UK/EU)
   - Banner position: bottom-left
   - Banner text: localised to BUSINESS CONFIG language
   - Categories: Necessary (always on), Analytics, Marketing,
     Functional
3. Copy the script tag
4. Add to `src/app/layout.tsx`:

```tsx
<Script
  id="cookieyes"
  src="https://cdn-cookieyes.com/client_data/<your-id>/script.js"
  strategy="afterInteractive"
/>
```

CookieYes blocks scripts in `<script type="text/plain"
data-cookieyes="cookieyes-analytics">` until consent is given. Wrap
GA4/Meta tags:

```tsx
<Script
  type="text/plain"
  data-cookieyes="cookieyes-analytics"
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
/>
```

### Cookiebot setup (paid, more robust)

For UK / public-sector / enterprise. `cookiebot.com` — pricing
scales with monthly cookie scans + domains. ~$14-50/mo.

Same pattern: script tag in `<head>`, third-party scripts wrapped
with `data-cookieconsent` attribute.

### Iubenda setup

Combines cookie consent + privacy policy + terms generator.
`iubenda.com` — pricing tiers, sometimes simpler for buyers who
want one tool.

### Termly setup

US-friendly. Generates CCPA / state-law compliant banner + Do Not
Sell or Share My Personal Info link.

`termly.io` → free tier 1 banner + 1 policy. Best for solo US
buyers.

### OneTrust

Enterprise. `onetrust.com` — pricing on application. Use for big
buyers with enterprise compliance needs.

## Step 5 — conversion events that actually matter

Don't track everything. Track the events tied to the BUSINESS CONFIG
→ Primary CTA + Secondary CTA.

### Standard events for every site

| Event name | When | Value |
|---|---|---|
| `page_view` | Page load | Track for traffic analysis |
| `scroll_50` | User scrolls past 50% | Quality signal |
| `scroll_90` | User scrolls past 90% | Engagement |
| `external_link_click` | Click on outbound link | Quality signal |

### Local trades extra events

| Event name | When | Value |
|---|---|---|
| `phone_click` | Click on tel: link | Highest-value event |
| `email_click` | Click on mailto: | Medium-value |
| `book_click` | Click on book/calendar | Highest-value |
| `address_click` | Click on map / address | Local-intent signal |
| `service_view_<service>` | View per-service page | Funnel signal |

### Coaching / consulting extra events

| Event name | When | Value |
|---|---|---|
| `discovery_call_click` | Calendly/Cal.com booking button | High-value |
| `pricing_view` | Pricing page visit | Quality signal |
| `case_study_view` | Case study page visit | Quality signal |
| `newsletter_signup` | Email form submit | Medium-value |

### SaaS extra events

| Event name | When | Value |
|---|---|---|
| `signup_click` | "Start free trial" click | High-value |
| `pricing_view` | Pricing page visit | Quality signal |
| `case_study_view` | Case study | Quality signal |
| `demo_request` | Demo form submit | Highest-value (B2B) |

### E-commerce extra events

| Event name | When | Value |
|---|---|---|
| `view_item` | Product page view | Funnel signal |
| `add_to_cart` | Add to cart | Funnel signal |
| `begin_checkout` | Checkout start | High-value |
| `purchase` | Order complete | Highest-value |

GA4 has built-in e-commerce events; use those names (`view_item`,
`add_to_cart`, `purchase`) so the GA4 reports just work.

## Step 6 — implementing events

### Plausible — class-based

Add the tagged-events script:

```tsx
<Script
  defer
  data-domain="theirdomain.com"
  src="https://plausible.io/js/script.outbound-links.tagged-events.js"
  strategy="afterInteractive"
/>
```

Tag elements:

```tsx
<a href="tel:+61812345678" className="plausible-event-name=phone_click">
  (08) 1234 5678
</a>

<Link href="/contact" className="plausible-event-name=book_click">
  Book a callout
</Link>
```

### GA4 — programmatic

```tsx
// src/lib/gtag.ts
declare global { interface Window { gtag: (...args: any[]) => void } }

export function event(name: string, params?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params || {})
}
```

```tsx
import { event } from '@/lib/gtag'

<a
  href="tel:+61812345678"
  onClick={() => event('phone_click', { location: 'header' })}
>
  (08) 1234 5678
</a>
```

For form submits, fire on success:

```tsx
const res = await fetch('/api/contact', { method: 'POST', body: formData })
if (res.ok) event('form_submit', { form_id: 'contact' })
```

### Scroll tracking (vanilla, both platforms)

```tsx
'use client'
import { useEffect } from 'react'
import { event } from '@/lib/gtag'

export function ScrollTracker() {
  useEffect(() => {
    const fired = new Set<number>()
    const handler = () => {
      const pct = Math.round(
        ((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100
      )
      ;[50, 90].forEach((threshold) => {
        if (pct >= threshold && !fired.has(threshold)) {
          fired.add(threshold)
          event(`scroll_${threshold}`)
        }
      })
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return null
}
```

## Step 7 — privacy policy update for trackers

Whatever analytics + consent stack you pick, the privacy policy
must name them. From the legal pack template:

> We use [Plausible Analytics / Google Analytics 4 / Vercel
> Analytics / Meta Pixel / etc.] to understand how visitors use the
> site. [Plausible doesn't use cookies and doesn't track individual
> users / GA4 uses cookies and IP addresses, anonymised before
> processing. You can opt out via our cookie banner.]
>
> Third parties: [list each — Google LLC; Meta Platforms, Inc.;
> Vercel Inc.] — their privacy policies linked.

Skill 11 (launch checklist) re-checks this matches.

## Step 8 — conversion goals in the analytics tool

### Plausible

Dashboard → Goals → Add goal → "Custom event" → enter event name
(`phone_click`, `book_click`, etc.).

Now those events show up in reports + you can filter by them.

### GA4

Admin → Events → Mark as conversion: toggle on for `phone_click`,
`book_click`, `form_submit`, etc.

Conversions show in Reports → Acquisition + Engagement.

### Both — link to Google Search Console

GA4 → Admin → Product Linking → Search Console → link the
verified property. Lets you correlate search queries → conversions.

## Step 9 — test it

For each event:

1. Open the deployed site in an incognito Chrome window
2. Accept consent (or refuse, to test the gated behavior)
3. Click / trigger the event
4. In Plausible → Realtime dashboard, or GA4 → Reports → Realtime,
   confirm the event fires

If it doesn't fire:
- Check the script tag is in `<head>` or `<body>` (per provider
  docs)
- Check consent is granted (banner UI)
- Check the event name spelling
- Check the browser console for errors

## Step 10 — set up a basic weekly report

For the buyer's reference. Default — Plausible/GA4 already email a
weekly summary. Confirm it's on:

- Plausible: Settings → Email reports → Weekly → set recipient
- GA4: Admin → Email reports → Configure
- Vercel Analytics: dashboard only

For a richer report, set up:
- **Looker Studio** report pulling from GA4 — share read-only with
  the buyer
- **Notion / Google Sheet** template with manual weekly numbers if
  GA4 is too complex

## Hard rules

- **No tracking before consent in regions that require it.** UK,
  Quebec, California — block trackers until consent.
- **Don't double-track.** Don't run both GA4 and Plausible
  long-term. One source of truth.
- **Anonymise IPs in GA4.** `anonymize_ip: true` — already in the
  config snippet above.
- **Don't track PII.** Never log email addresses, phone numbers,
  names into analytics event params. Hash or omit.
- **Honour Do Not Track signal in privacy-first stacks.** Plausible
  + Fathom do this by default; GA4 doesn't.
- **Don't add Meta Pixel "just in case".** Each pixel = more
  consent complexity, more page weight. Add only if buyer is
  actually running Meta ads.
- **Update privacy policy when adding a tracker.** Always. Forgot
  = enforceable.
- **Test in incognito after deploy.** Local cookies hide bugs.

## Done condition

You're done with this skill when:
- Analytics tool is live and receiving events
- Consent banner is live and gating non-essential trackers
- 3-5 conversion events fire correctly
- Goals / Conversions are marked in the analytics dashboard
- Buyer has access to the dashboard + receives weekly emails
- Privacy policy mentions every tracker + consent flow
- Tested in incognito on mobile + desktop

When done, say:
> *"Analytics is live. Moving to payments — or skipping if your
> brief said no."*

Then:
- If `Payments: yes` → load `09-payments-integration.md`
- If `Payments: no` → load `10-forms-leads.md`
