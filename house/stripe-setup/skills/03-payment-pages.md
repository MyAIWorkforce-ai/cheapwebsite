---
name: stripe-payment-pages
description: Pick the right payment surface (Payment Link vs hosted Checkout vs Embedded Payment Element vs Invoice vs Mobile SDK) for the operator's situation, ship a working live URL, and confirm a real $1 charge succeeds end-to-end.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Payment pages

## Your job

Get the operator from "products exist in Stripe" to a real,
shareable URL or button buyers can pay at. Pick the right surface
— five options, very different use cases. Then verify it works
with a real $1 charge.

## Step 1 — pick the surface

Ask these decision questions:

1. *"Do you have your own website where the buy button will live,
   or are you sharing via DM / email / social link?"*
2. *"Can buyers self-serve, or do you need to send a custom amount
   per customer?"*
3. *"Do you need the payment form on your own page, or is a redirect
   to Stripe's checkout fine?"*
4. *"Mobile app, or web only?"*

Route based on answers:

| Operator situation | Recommend |
|---|---|
| No website / share via link / one product per link | **Payment Link** (Path A) |
| Own website + want a "Buy" button → redirect | **Hosted Checkout** (Path B) |
| Own website + want form embedded on page | **Payment Element** (Path C) |
| Custom amount per customer (consultants, freelancers, agencies) | **Invoice** (Path D) |
| Native mobile app | **Mobile SDK** (Path E) |

Cover the path they actually need. Don't dump all five on them.

For SaaS with a pricing page → usually Path B (hosted Checkout).
For solo consultants → usually Path D (Invoice).
For "creator selling one course" → Path A (Payment Link).
For agencies with custom proposals → Path D (Invoice).
For an e-commerce site with cart → Path B (hosted Checkout) or
Path C (Element) for full brand control.

---

## Path A — Payment Link

Fastest, simplest. A URL like `https://buy.stripe.com/abc123` you
share anywhere. Zero code.

### Setup

1. Dashboard → **Payment Links → New**
2. Select the Product + Price (use the Price ID from skill 02)
3. Configure:
   - **Quantity adjustable?** On for physical goods, off for services
   - **Collect customer address?** Required for physical goods, GST/
     VAT tax compliance, or shipping
   - **Allow promotion codes** — turn on (so PROMO codes from skill
     02 work)
   - **After payment** — set the success URL OR use Stripe's
     confirmation page (default works for solo creators)
   - **Email notifications** — confirm enabled
4. **Save**. Copy the URL.

### Multi-product cart

If the operator wants buyers to pick multiple items (e.g. workshop +
optional add-on):
- Add multiple Prices via the "More options" tab
- "Customer can adjust quantity" gives multi-item flexibility per
  product
- For complex multi-product baskets → switch to Path B (hosted
  Checkout)

### Where to share it

- Email signature
- Social bio (LinkTree, Instagram bio link, X profile)
- DMs ("here's the link: ...")
- "Pay now" button on a Squarespace / Webflow / WordPress site:
  ```html
  <a href="https://buy.stripe.com/abc123" class="cta-button">
    Buy now — $99
  </a>
  ```
- QR code on printed material (Stripe auto-generates one in the
  dashboard — flyers, business cards, posters)
- Embed in newsletter (most ESPs accept HTML)
- Add to "thank you" page after a free-tier signup → upsell

### Test it

In test mode:
1. Click the URL
2. Use Stripe's test card `4242 4242 4242 4242`, any future expiry,
   any CVC, any postcode
3. Confirm:
   - Charge appears in Dashboard → Payments (Test data)
   - Receipt arrives at the buyer email
   - Buyer is redirected to success page
4. Other useful test cards:
   - `4000 0000 0000 9995` — declined (insufficient funds)
   - `4000 0025 0000 3155` — requires 3DS authentication
   - `4000 0000 0000 0341` — succeeds then disputes (good for
     dispute flow testing — skill 09)

Then switch to live mode and run a real $1 test from the
operator's own card. Refund it from Dashboard → Payments → Refund
(walk through this if it's their first refund).

---

## Path B — Hosted Checkout

A "Buy" button on the operator's site → redirects to a Stripe-
hosted checkout page → returns after success. The most common
setup for SaaS, e-commerce, anything with a real website.

### Setup overview

1. Operator's site has a "Buy" / "Subscribe" button
2. Button posts to a tiny serverless function on the operator's
   site
3. The function creates a Stripe Checkout Session
4. Function redirects the user to the Session URL
5. User pays on Stripe's hosted page
6. Stripe redirects back to operator's success URL
7. Webhook (skill 04) confirms fulfillment

### Get the API keys

- Dashboard → **Developers → API keys**
- **Publishable key** (`pk_live_...`) — safe for client-side, can
  be in source code or env
- **Secret key** (`sk_live_...`) — SERVER-ONLY. Never commit. Never
  expose in browser. Stash in env vars.

For dev work, also note the Test mode keys (`pk_test_...`,
`sk_test_...`) — different keys, different data, doesn't move
money.

### The Next.js example (most common)

```ts
// app/api/checkout/route.ts
import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const { priceId } = await req.json()  // or hard-coded for one product

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',  // 'payment' for one-off, 'subscription' for recurring
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/thanks?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,

    // Recommended extras:
    customer_creation: 'always',  // Save customer for future
    automatic_tax: { enabled: true },  // Stripe Tax (skill 05)
    allow_promotion_codes: true,
    billing_address_collection: 'required',  // For tax compliance
    phone_number_collection: { enabled: false },  // Toggle if useful
    payment_method_types: ['card', 'apple_pay', 'google_pay', 'link'],
    // ↑ Or omit to let Stripe auto-detect based on customer location

    metadata: {
      // Anything the operator wants to round-trip back via webhook
      product_id: priceId,
    },
  })

  return NextResponse.json({ url: session.url })
}
```

And the button on the frontend:

```tsx
'use client'

export function BuyButton({ priceId }: { priceId: string }) {
  const onClick = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ priceId }),
    })
    const { url } = await res.json()
    window.location.href = url
  }
  return <button onClick={onClick}>Buy now</button>
}
```

### Env vars

In Vercel / Netlify / Cloudflare Pages:
- `STRIPE_SECRET_KEY` = `sk_live_...`
- `NEXT_PUBLIC_URL` = `https://acmecoaching.com`

### Subscription mode

For recurring, change:
```ts
mode: 'subscription',
line_items: [{ price: 'price_RECURRING_ID', quantity: 1 }],
```

The buyer is added as a customer and subscribed. Subscription
events fire via webhooks (skill 04).

### Multi-product cart

```ts
line_items: [
  { price: 'price_MAIN', quantity: 1 },
  { price: 'price_ADDON', quantity: 2 },
],
```

### CMS / no-code paths

| Platform | Approach |
|---|---|
| **WordPress** | Use the official Stripe Payments plugin OR WooCommerce + Stripe Gateway |
| **Squarespace** | Built-in Stripe integration via Commerce; or embed Payment Links (Path A) |
| **Shopify** | Stripe is one of Shopify's payment processors; configure in Settings → Payments. For non-Shopify items, use Payment Links |
| **Webflow** | Native Stripe via Webflow Ecommerce; or embed Payment Links |
| **Wix** | Wix Payments → connect Stripe; or embed Payment Links |
| **Framer** | Use Payment Links or embed Stripe.js for Element |
| **Notion** | Payment Links only — embed via Super.so / Potion if making a Notion site |
| **Carrd** | Payment Links via the "Embed" element |
| **Ghost / Substack** | Native Stripe integration for subscriptions; configure in member settings |
| **Static site (just HTML)** | Use Payment Links (Path A) — don't build a backend |

For platforms with native Stripe integration: walk operator through
the platform's own setup (each is different). Reference back to
Stripe's catalogue (Products + Prices) — the platform just routes
to them.

### Test it

1. Test mode ON, click "Buy" → redirect to Stripe Checkout
2. Pay with `4242 4242 4242 4242`
3. Land on success URL
4. Confirm:
   - Dashboard → Payments (Test data) shows the charge
   - Receipt email lands
   - (If subscription) Dashboard → Subscriptions shows it
5. Then test mode OFF and real $1 test

---

## Path C — Payment Element (embedded)

Card form lives on the operator's own site, no redirect. Better
brand control but more code. Right answer when:
- Operator runs a high-trust ecommerce brand
- Mid-funnel checkout where redirect would tank conversion
- Multi-step checkout (collect info → review → pay all on one page)

### How it works

1. Operator's frontend collects items / customer info
2. Frontend POSTs to a `/api/create-payment-intent` endpoint
3. Backend creates a Payment Intent, returns `client_secret`
4. Frontend uses Stripe.js + Payment Element to render the card
   form
5. On submit, Stripe.js confirms the Payment Intent client-side
6. Webhook (skill 04) handles fulfillment

### Frontend

```tsx
'use client'

import { useState, useEffect } from 'react'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function CheckoutForm() {
  const [clientSecret, setClientSecret] = useState<string>()

  useEffect(() => {
    fetch('/api/create-payment-intent', { method: 'POST' })
      .then(r => r.json())
      .then(({ clientSecret }) => setClientSecret(clientSecret))
  }, [])

  if (!clientSecret) return <div>Loading…</div>

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <Form />
    </Elements>
  )
}

function Form() {
  const stripe = useStripe()
  const elements = useElements()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: 'https://acmecoaching.com/thanks' },
    })
    if (error) alert(error.message)
  }

  return (
    <form onSubmit={onSubmit}>
      <PaymentElement />
      <button>Pay</button>
    </form>
  )
}
```

### Backend

```ts
// app/api/create-payment-intent/route.ts
import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST() {
  const intent = await stripe.paymentIntents.create({
    amount: 9900,  // in cents — $99.00
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
  })
  return NextResponse.json({ clientSecret: intent.client_secret })
}
```

### Env

- `STRIPE_SECRET_KEY` (server)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (client — safe to expose)

### When to recommend Element over Checkout

- Operator's brand needs the card form on-page (high-end ecom)
- Multi-step checkout flow
- Custom payment method selection logic (operator only wants card
  + Apple Pay, no Klarna)

When NOT to:
- Operator hasn't shipped React/Vue/Svelte before — too much code
- Operator is on a no-code site — use Path A or Path B
- Operator just wants "something that works" — Path B is 3x less
  code

---

## Path D — Invoice

For services billed per customer, where the amount varies
(consulting, freelancing, agency projects, custom quotes):

### Create the customer first

1. Dashboard → **Customers → New customer**
2. Fill: name, email, business name + tax ID if B2B, address
3. Save

### Create the invoice

1. Customers → [that customer] → **Create invoice**
2. Add line items:
   - **From catalogue** (pick a Product/Price from skill 02), OR
   - **Custom** (free-form description + amount)
3. Set due date (Net 7 / Net 14 / Net 30 — match BUSINESS CONFIG)
4. Tax — apply if Stripe Tax enabled, or manual rate
5. Memo (top of invoice, free text — useful for "Thanks for your
   business" or referencing a PO #)
6. Optional: attach files (PDFs of the proposal, signed scope)
7. **Send** via email → Stripe handles delivery
8. (Optional) **Schedule** — for recurring invoices that need
   manual adjustments per cycle

Invoices include a hosted payment page automatically. Customer
clicks the link in the email and pays via card / bank transfer
(BACS / SEPA / BECS / ACH where enabled).

### Auto-reminders

- Settings → **Customer emails → Invoice reminders**
- Pre-due: 3 days before
- Past-due: 1 day after, 7 days after, 14 days after, 30 days after

Cuts admin time massively. Operators stop having to chase manually.

### Recurring invoices (different from subscription)

For B2B with manual amount per cycle (consulting retainers that
flex by hours used):
- Don't use subscription
- Use the operator-pushed Invoice flow each cycle
- Or: Subscription with `add_invoice_items` for the variable portion

### Quote → Invoice flow

If the operator wants to send a quote first:
1. Dashboard → **Quotes → New quote**
2. Same line items + customer as Invoice
3. Set expiry (Stripe defaults to 30 days)
4. Send → customer signs digitally
5. Quote auto-converts to Invoice when accepted

Good for B2B sales cycles where the buyer wants to review before
paying.

---

## Path E — Mobile SDK (native iOS / Android)

If the operator has a native mobile app, Payment Link / Checkout
work in WebViews but feel un-native. Stripe has Mobile SDKs:

- **iOS** — `StripePaymentSheet` Swift package
- **Android** — `stripe-android` Gradle dependency
- **React Native** — `@stripe/stripe-react-native`
- **Flutter** — `flutter_stripe` package

Pattern is similar to Path C:
1. App calls backend → creates Payment Intent → returns client_secret
2. App renders `PaymentSheet` modal with the client_secret
3. SDK handles card collection + 3DS in-app
4. On success, backend confirms via webhook

Mobile SDK setup is heavier than web. If the operator's not a
mobile developer already, recommend a web Checkout that opens in
the device browser via deep link — they ship in hours instead of
weeks.

---

## Step 2 — wire up Apple Pay + Google Pay

For Path B (Checkout) — Stripe auto-enables Apple Pay + Google Pay
when:
- `payment_method_types` is omitted (auto-detect), OR
- Explicitly listed `['card', 'apple_pay', 'google_pay']`

For Apple Pay on the operator's domain:
1. Dashboard → **Settings → Payment methods → Apple Pay**
2. Add the operator's domain
3. Stripe gives a verification file URL like
   `/.well-known/apple-developer-merchantid-domain-association`
4. Operator uploads it to their site (or for Next.js / Vercel, put
   in `public/.well-known/`)
5. Click verify in dashboard

For Path A (Payment Link): Apple Pay + Google Pay auto-enabled on
Stripe's domain, no operator setup needed.

For Path C (Element): Apple/Google Pay show inside the Payment
Element automatically when conditions are met (HTTPS, eligible
browser/device, domain verified for Apple Pay).

### Why it matters

From data we've seen across operator accounts:
- Apple Pay converts ~10-15 points higher than card on mobile
- Google Pay converts ~8-12 points higher than card on Android
- Link (Stripe's saved-card network) converts ~13 points higher
  than card across the board

Enable all three. The setup cost is tiny vs the conversion lift.

---

## Step 3 — set local payment methods (preview, full detail in skill 11)

Region-specific defaults to consider:

- **AU**: cards, Apple/Google Pay, Link, Afterpay (if avg sale
  $50-2000 and B2C). BECS Direct Debit for B2B / subscriptions.
- **NZ**: cards, Apple/Google Pay, Link.
- **UK**: cards, Apple/Google Pay, Link, BACS Direct Debit
  (subscriptions / B2B), bank redirect, Klarna (BNPL B2C).
- **US**: cards, Apple/Google Pay, Link, Cash App Pay, Affirm /
  Klarna / Afterpay (BNPL), ACH Direct Debit (B2B subs).
- **CA**: cards, Apple/Google Pay, Link, ACSS Direct Debit (subs).

Don't enable methods the operator can't service. Each method has
its own settlement timing, dispute rate, and refund behaviour.
Skill 11 has the full detail.

---

## Step 4 — verify it works end-to-end

For every path, do a real test before declaring done:

### Test mode

1. Complete the flow with `4242 4242 4242 4242`
2. Confirm the dashboard (test data) shows the payment
3. Confirm the customer (operator's own email) received a receipt
4. (For subscriptions) Confirm sub appears in Dashboard →
   Subscriptions

### Live mode

1. Switch test mode OFF (top-right toggle)
2. Operator does a real $1 charge to their own card
3. Confirm:
   - Payment appears in Dashboard → Payments
   - Branded receipt arrives
   - (If using webhooks already) Webhook events fire
4. Operator refunds the $1 from Dashboard → Payments → [...] → Refund

Don't move on without this passing.

## Common gotchas

- **Success URL with `{CHECKOUT_SESSION_ID}` literal not interpolated**
  → use Stripe's exact placeholder string, with curly braces, in
  the `success_url` param. Stripe replaces it server-side.
- **Mode mismatch** → trying to use a recurring Price with
  `mode: 'payment'` errors. Switch to `mode: 'subscription'`.
- **Wrong currency** → if the buyer's card declines with
  "currency mismatch", their card issuer doesn't allow that
  currency. Offer a domestic currency Price.
- **Apple Pay not showing** → domain not verified, or not HTTPS,
  or browser doesn't support, or Stripe account just created
  (Apple Pay can take 24h to activate on new accounts).
- **Cart abandons at tax line** → buyer didn't expect tax addition;
  consider Inclusive pricing (skill 02 / 05).
- **Webhook hits before redirect** → race condition. Don't rely
  on success_url for fulfillment. Use webhook (skill 04).

## When to combine paths

- **Payment Link + Embedded button**: small operator with one
  product, no backend — Payment Link is fine; embed it on the site
  via an `<a>` tag
- **Hosted Checkout + Invoice**: SaaS with self-serve Pro plan
  (Checkout) + Enterprise contracts (Invoice flow)
- **Element + Subscription via Customer Portal**: e-commerce with
  branded checkout (Element) for one-off + Customer Portal for
  ongoing subscriptions

The agent recommends combinations where they fit, not because it's
"more thorough" but because real operators usually need 2 surfaces.

## Done condition

You're done with this skill when ALL of these are true:

- [ ] A real, shareable URL or working "Buy" button exists
- [ ] Test mode payment succeeded end-to-end
- [ ] Live mode $1 test succeeded
- [ ] Receipt arrived branded correctly
- [ ] (If Path B/C) Code is committed + deployed + env vars set
- [ ] (If Apple/Google Pay) Domain verification done for Apple Pay
- [ ] (If subscription) Sub appears in Dashboard → Subscriptions
- [ ] Operator knows where to share the URL / where the button lives

When done, say:

> *"Payment page live. [Path A/B/C/D/E] working. $1 test confirmed.
> Now let's make sure you actually hear about orders."*

Load `04-webhooks-fulfillment.md`.
