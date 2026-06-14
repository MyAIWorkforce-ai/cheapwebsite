---
name: stripe-webhooks-fulfillment
description: Set up webhooks so the user's system knows when a payment happens — for sending fulfillment, updating records, or triggering downstream actions. Includes signature verification.
allowed_platforms: [claude, openclaw, chatgpt]
tools: []
---

# Webhooks + fulfillment

## Your job

After a sale, something has to happen — send the file, ship the
order, notify the team, update a CRM. Stripe webhooks are how your
system finds out. Get them configured + verified.

## When this skill is needed

- The user is selling digital goods and needs to deliver them
- The user wants Slack/email notifications on every sale
- The user is feeding sales into a CRM or accounting tool
- The user is on a subscription product (needs to handle cancel /
  payment_failed / renewed)

If the user is only taking payments and doing fulfillment manually
from the Stripe dashboard, skip this skill and go to
`05-tax-refunds.md`.

## Step 1 — pick the receiver

The webhook needs somewhere to POST to. Options, from easiest to
hardest:

| Receiver | When |
|---|---|
| **Zapier / Make** | No code, route to Slack / email / Sheets / CRM |
| **n8n** | Self-hosted, more control, same shape as Zapier |
| **Your own endpoint** | Already have a website with Next.js / Node etc. |
| **Stripe → email** (CLI test only) | Just testing, not for production |

Ask the user which they want. For most small businesses, **Zapier /
Make** is the right answer — no code, integrates with everything.

---

## Path A — Zapier / Make

Walk them through:

### 1. Create the trigger

- Zapier: New Zap → Trigger app: Stripe → Trigger event: "New Charge"
  (or "New Subscription", "New Invoice" — depends on use case)
- Make: New scenario → Stripe module → choose "Watch Events"

### 2. Connect Stripe

Authorize Zapier/Make to your Stripe account. They'll receive events
directly — Stripe handles the webhook plumbing on their side.

### 3. Pick what happens next

Common patterns:
- **Digital download** → Action: Gmail "Send email" with the file URL
- **Slack alert** → Action: Slack "Send channel message" with $amount
  and customer email
- **CRM** → Action: HubSpot/Pipedrive "Create or update contact"
- **Accounting** → Action: Xero/QuickBooks "Create invoice / sales
  receipt"
- **Spreadsheet** → Action: Google Sheets "Add row" — the simplest
  ledger

### 4. Test the Zap

- Use Stripe's test mode + a test card to trigger one
- Confirm Zapier received the event AND ran the action
- Then switch live

Skip the rest of this skill — Zapier handles everything else
(signature verification, retries).

---

## Path B — Your own endpoint

Use this if the user has a Next.js / Node app and wants direct
control.

### 1. Build the endpoint

`app/api/stripe-webhook/route.ts` (Next.js App Router):

```ts
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get('stripe-signature')
  if (!sig) {
    return NextResponse.json({ error: 'missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (err) {
    return NextResponse.json(
      { error: `bad signature: ${(err as Error).message}` },
      { status: 400 },
    )
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      // Fulfillment logic — send file, mark order, etc.
      console.log('Sale:', session.amount_total, session.customer_email)
      break
    }
    case 'charge.refunded':
      // Handle refund
      break
    case 'customer.subscription.deleted':
      // Subscription cancelled
      break
    // Add more event types as needed
  }

  return NextResponse.json({ received: true })
}
```

### 2. Set the env vars

In Vercel (or wherever they deploy):
- `STRIPE_SECRET_KEY` (live or test, depending on mode)
- `STRIPE_WEBHOOK_SECRET` (you'll get this in the next step)

### 3. Register the webhook in Stripe

- Dashboard → Developers → Webhooks → Add endpoint
- URL: `https://<their-domain>/api/stripe-webhook`
- Events to listen for: pick the ones that matter for fulfillment.
  Conservative starting set:
  - `checkout.session.completed`
  - `charge.refunded`
  - `customer.subscription.deleted` (subscriptions only)
  - `invoice.payment_failed` (subscriptions only)

After saving, Stripe reveals the **Signing secret** — copy it into
`STRIPE_WEBHOOK_SECRET` in the user's deployment env vars.

### 4. Test it

- Use the Stripe CLI: `stripe listen --forward-to https://<their-domain>/api/stripe-webhook`
- Trigger a test event: `stripe trigger checkout.session.completed`
- Confirm their endpoint received it AND verified signature

Or do an end-to-end test with a real $1 test payment.

---

## Common stumbles

- **"Bad signature" errors** — almost always the wrong webhook secret
  (test vs live). Stripe has separate secrets for each.
- **Events arriving multiple times** — Stripe retries until it gets
  2xx. Always make the handler idempotent (check if you've already
  processed this event ID).
- **Events not arriving** — check Stripe dashboard → Webhooks → click
  the endpoint → "Events" tab. If it shows 500s, the endpoint is
  failing. If it shows nothing, the URL is wrong.

## Done condition

- A webhook is configured in Stripe pointing at the receiver
- A test event has been delivered AND processed
- The user can see in their downstream system (Zapier zap history,
  Sheet rows, app logs) that the event arrived

When done, say: *"Sales are heard. Now let's handle tax + refunds
properly."* and load `05-tax-refunds.md`.
