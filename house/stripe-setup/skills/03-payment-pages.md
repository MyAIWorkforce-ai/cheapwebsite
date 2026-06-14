---
name: stripe-payment-pages
description: Pick the right payment surface (Payment Link vs hosted Checkout vs embedded) for the user's use case, and ship a working live page that takes real money.
allowed_platforms: [claude, openclaw, chatgpt]
tools: []
---

# Payment pages

## Your job

Get the user from "products exist in Stripe" to a real, shareable URL
buyers can pay at. Pick the right surface — three options, very
different use cases.

## Step 1 — pick the surface

Ask these decision questions:

1. *"Do you have your own website you want this on, or are you using
   social DMs / email to share a link?"*
2. *"Can buyers self-serve, or do you need to send a custom invoice
   each time?"*

Route based on answers:

| User situation | Recommend |
|---|---|
| No website / share via link / one product | **Payment Link** |
| Own website / want a Buy button | **Checkout (hosted)** |
| Own website / want the payment form embedded | **Payment Element** |
| Custom amount per customer (consultants, freelancers) | **Invoice** |

Cover the path they actually need. Don't dump all four on them.

---

## Path A — Payment Link

Fastest, simplest. A URL like `https://buy.stripe.com/abc123` you
share anywhere.

### Setup

1. Dashboard → Payment Links → New
2. Select the Product + Price (use the Price ID from `02-products-prices.md`)
3. Configure:
   - **Quantity adjustable?** On for physical goods, off for services
   - **Collect customer address?** Required for physical goods, GST/VAT
     tax compliance, or shipping
   - **Allow promotion codes** — turn on (you can create codes later)
   - **After payment** → set the success URL OR use Stripe's confirmation
     page
4. Save. Copy the URL.

### Where to share it
- In email signatures
- DMs ("here's the link: ...")
- A "Pay now" button on your website (`<a href="https://buy.stripe.com/abc123">Pay</a>`)
- QR code on printed material (Stripe generates one in the dashboard)

### Test it
Have the user click their own link, use Stripe's test card
`4242 4242 4242 4242` (only works in test mode), and confirm the flow.
Then test mode OFF and try a real $1 charge — they can refund it
in skill `05-tax-refunds.md`.

---

## Path B — Hosted Checkout

A "Buy" button on the user's site → redirects to a Stripe-hosted
checkout page → returns after success.

### Setup

1. Dashboard → Developers → API keys → copy the **Publishable key**
   (starts `pk_live_...`)
2. On their website, add the Buy button. Show them the code:

```html
<form action="/api/checkout" method="POST">
  <button type="submit" class="...">
    Buy now — $99
  </button>
</form>
```

3. The form posts to a tiny serverless function (or platform-specific
   integration) that creates the Checkout Session. Depending on their
   stack:
   - **Next.js (Vercel)** → API route at `app/api/checkout/route.ts`
   - **WordPress / Squarespace / Shopify / Wix** → use the official
     Stripe plugin (no code) — walk them through it
   - **Just a static site** → use Payment Link instead (Path A)

### The Next.js example (most common)

```ts
// app/api/checkout/route.ts
import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',  // or 'subscription' for recurring
    line_items: [{ price: 'price_1ABC...', quantity: 1 }],
    success_url: 'https://example.com/thanks?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://example.com',
  })
  return NextResponse.redirect(session.url!, 303)
}
```

Walk through the env var setup (`STRIPE_SECRET_KEY` in Vercel) and
deploy. Then test.

### Notes

- For subscriptions, change `mode: 'subscription'`
- For multiple products in cart, expand `line_items`
- Always use server-side secret keys; never expose them in the browser

---

## Path C — Payment Element (embedded)

Card form lives on the user's own site, no redirect. Better for brand
control but more code. If the user wants this, recommend looking at
Stripe's docs for "Payment Element" and offer to walk through the
specific integration — out of scope for this skill in detail.

---

## Path D — Invoice

For services billed per customer ("here's your invoice — $X due"):

1. Dashboard → Customers → New customer
2. Customers → that customer → "Create invoice"
3. Add line items (free-form or pick from Products), set due date
4. Send via email — Stripe handles delivery + reminders

Invoices include a hosted payment page automatically. Customer clicks
the link in the email and pays.

Use this when the amount varies per customer (consulting, freelancing,
quotes).

---

## Step 2 — verify it works

For every path, do a real test:

1. Test mode ON, complete the flow with `4242 4242 4242 4242`
2. Confirm the dashboard shows the test payment
3. Confirm the customer (the user's own email) received a receipt

Then switch to live mode and have the user do a real $1 charge to
their own card. Refund it in skill `05-tax-refunds.md` afterwards.

## Done condition

- A real URL exists that accepts payments
- A test payment succeeded
- A live $1 payment succeeded (they'll refund it later)

When done, say: *"Payment page live. Now let's make sure you actually
hear about orders."* and load `04-webhooks-fulfillment.md`.
