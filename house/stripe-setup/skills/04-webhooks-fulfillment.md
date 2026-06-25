---
name: stripe-webhooks-fulfillment
description: Set up webhooks so the operator's system knows when a payment, refund, dispute, or subscription event happens. Covers Zapier/Make/n8n paths AND custom-endpoint paths with idempotency, signature verification, retry handling, and the events that actually matter per business model.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Webhooks + fulfillment

## Your job

After a sale, something has to happen — send the file, ship the
order, notify the team, update a CRM, sync to accounting, trigger
onboarding emails. **Stripe webhooks are how your system finds out.**
Get them configured, signature-verified, idempotent, and
retry-safe.

## When this skill is needed

- The operator is selling digital goods and needs to deliver them
- Subscriptions exist (need to handle renewal / cancel / failed payment)
- The operator wants Slack/email notifications on every sale
- Feeding sales into a CRM (HubSpot, Pipedrive, Salesforce)
- Feeding sales into accounting (Xero, MYOB, QBO — handled by
  skill 10, but webhook is the pipe)
- Triggering onboarding sequences (welcome emails, course access,
  Discord invites)
- Tracking dispute / refund / sub-cancel events for `learnings.md`

If the operator is purely manual (sells consulting; checks Stripe
dashboard once a week; emails the file by hand), skip this skill
and jump to `05-tax-refunds.md`. They can wire webhooks later.

## Step 1 — pick the receiver

The webhook needs somewhere to POST to. Options, from easiest to
hardest:

| Receiver | When to choose | Setup time |
|---|---|---|
| **Zapier / Make** | No code, route to Slack / email / Sheets / CRM | 15 min |
| **n8n** | Self-hosted automation, more control, same shape as Zapier | 30 min |
| **Your own endpoint** | Already have a website with Next.js / Node / Python / Ruby etc. | 1-2 hr |
| **Direct CRM connector** | HubSpot, Salesforce — both have native Stripe apps | 20 min |
| **Stripe CLI only** | Just for testing locally; never for production | — |

Ask the operator. For most small businesses, **Zapier or Make** is
the right answer — no code, integrates with everything they
already use.

For dev teams shipping a real app: **own endpoint**.

---

## Path A — Zapier / Make / n8n

Walk through. Same concepts for all three; details differ.

### 1. Create the trigger

**Zapier:**
- New Zap → Trigger app: Stripe → Trigger event:
  - "New Charge" (for one-off sales — fires on successful charge)
  - "New Customer" (sign-up tracking)
  - "New Subscription" (subscription start)
  - "Cancelled Subscription" (subscription end)
  - "New Invoice" (B2B / subscription billing cycles)
  - "Failed Payment" (subscription dunning — important!)
  - "New Refund" (returns)
  - "New Dispute" (chargebacks — high-urgency alerts)

**Make (formerly Integromat):**
- New scenario → Stripe module → "Watch Events"
- Pick the same event categories

**n8n:**
- New workflow → Stripe trigger node → "Webhook" or "Trigger" type
- Auth: OAuth or API key

### 2. Connect Stripe

**Zapier / Make:** OAuth flow. Authorise Zapier/Make on your
Stripe account. They handle webhook signing on their side — the
operator never sees the signing secret.

**n8n:** Same pattern; n8n uses OAuth too.

### 3. Pick what happens next (the action)

Common patterns by business type:

**Digital download / course / template:**
- Trigger: New Charge or New Subscription
- Action: Send email (Gmail / Postmark / Resend / ConvertKit)
  with the download URL or course access link
- Optional: Add to CRM, log to spreadsheet

**Slack alert on every sale:**
- Trigger: New Charge
- Action: Slack → Send channel message
- Message: `💰 $[amount] sale — [customer email] — [product]`

**CRM sync:**
- Trigger: New Customer
- Action: HubSpot / Pipedrive / Salesforce → Create or update
  contact
- Map: customer email → contact email, amount → custom property,
  product → deal stage

**Accounting:**
- Trigger: New Charge
- Action: Xero / QBO → Create sales receipt or invoice
- (Skill 10 has the full integration; webhook is the trigger)

**Spreadsheet ledger (simplest):**
- Trigger: New Charge
- Action: Google Sheets → Add row
- Columns: date, customer, amount, fee, net, product
- Use for: operators below the accounting-tool threshold (early
  days)

**Failed payment alert (subscription operators):**
- Trigger: Failed Payment
- Action: Slack → DM to operator
- Plus: trigger an email to customer asking them to update card
- This single Zap recovers ~30-40% of involuntary churn for small
  operators (more in skill 08)

**Dispute alert (high urgency):**
- Trigger: New Dispute
- Action: Slack → @channel + email to operator
- Include: dispute reason, amount, charge ID, deadline date
- Operator has ~7 days to respond — this alert must not be missed

### 4. Test the Zap / scenario

Zapier:
- Use Stripe's test mode + a test card to trigger one
- Check Zap history — confirm event received AND action ran
- Look for any error rows

Make:
- Same — run a test charge, check the scenario's execution log

n8n:
- Same — test trigger via Stripe CLI or test charge

Then switch live and run a real $1 charge to confirm live flow.

### 5. The shape of a typical Stripe event in Zapier

```json
{
  "id": "evt_1ABC...",
  "type": "checkout.session.completed",
  "created": 1719000000,
  "data": {
    "object": {
      "id": "cs_test_a1b2c3...",
      "amount_total": 9900,
      "currency": "usd",
      "customer_details": {
        "email": "buyer@example.com",
        "name": "Jane Buyer"
      },
      "metadata": {
        "product_id": "prod_ABC"
      }
    }
  }
}
```

Tell the operator: when wiring downstream actions, the fields they
care about are usually:
- `data.object.amount_total` — amount in cents (divide by 100)
- `data.object.currency`
- `data.object.customer_details.email`
- `data.object.metadata.*` — anything the operator set on Checkout

Skip the rest of this skill (signature verification, retries) —
Zapier / Make / n8n handle all of that for you.

---

## Path B — Your own endpoint

Use this if the operator has a Next.js / Node / Python / Ruby app
and wants direct control.

### Architecture

```
Stripe → POST your endpoint → verify signature → idempotency check
   → route by event type → do work → 200 OK
                              ↓
                              ↑ Stripe retries (8 times) if 4xx/5xx
```

### The endpoint — Next.js App Router

`app/api/stripe-webhook/route.ts`:

```ts
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()  // RAW body — required for signature verification
  const sig = (await headers()).get('stripe-signature')

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
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: `bad signature: ${(err as Error).message}` },
      { status: 400 },
    )
  }

  // Idempotency check — see "Idempotency" section below
  if (await isAlreadyProcessed(event.id)) {
    return NextResponse.json({ received: true, duplicate: true })
  }
  await markAsProcessing(event.id)

  // Route by event type
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await onCheckoutComplete(session)
        break
      }
      case 'customer.subscription.created':
        await onSubscriptionCreated(event.data.object as Stripe.Subscription)
        break
      case 'customer.subscription.updated':
        await onSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break
      case 'customer.subscription.deleted':
        await onSubscriptionCancelled(event.data.object as Stripe.Subscription)
        break
      case 'invoice.payment_succeeded':
        await onInvoicePaid(event.data.object as Stripe.Invoice)
        break
      case 'invoice.payment_failed':
        await onInvoiceFailed(event.data.object as Stripe.Invoice)
        break
      case 'charge.refunded':
        await onRefund(event.data.object as Stripe.Charge)
        break
      case 'charge.dispute.created':
        await onDispute(event.data.object as Stripe.Dispute)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    await markAsProcessed(event.id)
    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook handler failed:', err)
    await markAsFailed(event.id, err)
    // Return 500 so Stripe retries
    return NextResponse.json({ error: 'handler failed' }, { status: 500 })
  }
}
```

See `templates/webhook-handler.md` for the full router with idempotency
helpers + per-event-type fulfillment functions.

### Set the env vars

In Vercel / Netlify / Cloudflare / wherever:
- `STRIPE_SECRET_KEY` (live key — `sk_live_...`)
- `STRIPE_WEBHOOK_SECRET` (you'll get this in the next step —
  `whsec_...`)

**Use Vercel's "Encrypted" / "Sensitive" flag on both.** Never log
them. Never expose to client code.

### Register the webhook in Stripe

1. Dashboard → **Developers → Webhooks → Add endpoint**
2. URL: `https://<their-domain>/api/stripe-webhook`
3. Events to listen for — start with the conservative set:

**Always:**
- `checkout.session.completed`
- `charge.refunded`
- `charge.dispute.created`

**If subscriptions:**
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `customer.subscription.trial_will_end`

**If Connect (skill 07):**
- `account.updated`
- `application_fee.created`
- `transfer.created`

**If Stripe Tax:**
- `tax.transaction.created`

Don't enable "Select all events" — too noisy. Listen for what you'll
actually act on.

4. Save endpoint
5. Stripe reveals the **Signing secret** (`whsec_...`) — copy into
   `STRIPE_WEBHOOK_SECRET` env var
6. Redeploy

### Test it locally first (Stripe CLI)

Don't deploy webhook code untested. Use the Stripe CLI:

```bash
# Install (macOS)
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward events to local dev server
stripe listen --forward-to localhost:3000/api/stripe-webhook

# (In another terminal) Trigger test events
stripe trigger checkout.session.completed
stripe trigger invoice.payment_failed
stripe trigger charge.dispute.created
```

The CLI prints a `whsec_...` to stdout — set this as
`STRIPE_WEBHOOK_SECRET` for local dev. Different from live secret.

### Test it in production

After deploying:
1. Dashboard → Webhooks → [your endpoint] → "Send test webhook"
2. Pick `checkout.session.completed`
3. Click send
4. Check the endpoint's logs (Vercel → Functions → logs) for a
   2xx response
5. Check the action took place (email sent, DB row created, etc.)

Then run a real $1 test charge end-to-end.

---

## Idempotency — the thing most operators get wrong

**Stripe sends each event AT LEAST ONCE, sometimes more.** Network
hiccups, retries, your endpoint returning a 500 — all cause
duplicate deliveries.

If the operator's handler isn't idempotent, they'll:
- Send the customer the download link 4 times
- Create 4 sales receipts in QBO
- Charge the customer's loyalty points 4 times
- Get 4 Slack pings

**Fix: track event IDs.**

```ts
// Simple Redis-backed dedup
async function isAlreadyProcessed(eventId: string): Promise<boolean> {
  const exists = await redis.get(`stripe:event:${eventId}`)
  return exists === 'done'
}

async function markAsProcessing(eventId: string): Promise<void> {
  // Set with TTL of 7 days
  await redis.set(`stripe:event:${eventId}`, 'processing', 'EX', 60 * 60 * 24 * 7)
}

async function markAsProcessed(eventId: string): Promise<void> {
  await redis.set(`stripe:event:${eventId}`, 'done', 'EX', 60 * 60 * 24 * 7)
}
```

Or, with a database:

```sql
CREATE TABLE webhook_events (
  event_id VARCHAR(255) PRIMARY KEY,
  type VARCHAR(255),
  status VARCHAR(50),
  received_at TIMESTAMP,
  processed_at TIMESTAMP
);
```

```ts
async function isAlreadyProcessed(eventId: string) {
  const row = await db.query(
    'SELECT status FROM webhook_events WHERE event_id = $1',
    [eventId]
  )
  return row.rows[0]?.status === 'done'
}
```

Stripe's event IDs are stable across retries (`evt_1ABC...` doesn't
change). One row per event ID.

### What if I can't add a DB?

For operators on serverless without persistent storage:
- Use Vercel KV / Upstash Redis (both free tiers cover most
  webhook volume)
- Or use a "fingerprint" approach: hash the event payload, dedupe
  on hash (less robust)
- Or accept eventual duplicates and make downstream actions
  themselves idempotent (e.g. "create order with id = stripe
  charge id" — UNIQUE constraint catches duplicates at DB level)

---

## Retries — what Stripe does when your endpoint fails

Stripe retries failed webhooks for **3 days** on this schedule
(approximate):

| Attempt | Delay |
|---|---|
| 1 | Immediate |
| 2 | 5 min |
| 3 | 30 min |
| 4 | 2 hr |
| 5 | 6 hr |
| 6 | 12 hr |
| 7 | 1 day |
| 8 | 2 days |

After ~3 days, Stripe gives up. The event is gone (you can manually
re-send from the dashboard).

### What counts as a failure

- HTTP 4xx (bad request, signature failed) — Stripe DOES retry
  4xx (despite what you'd expect) — yes, fix the bug
- HTTP 5xx — Stripe retries
- Timeout (>20 seconds) — Stripe retries

### What does NOT trigger retry

- HTTP 2xx — Stripe considers it delivered

So: return 200 even if your handler's downstream action partially
fails, and queue the work for retry yourself. Or accept the
retry-storm if your handler is fast and idempotent.

### Best practice

**Acknowledge fast, work async.**

```ts
export async function POST(req: Request) {
  const event = verifyAndParse(req)

  // Idempotency check
  if (await isAlreadyProcessed(event.id)) {
    return NextResponse.json({ received: true })
  }

  // Queue the actual work
  await queue.add('process-stripe-event', { eventId: event.id })

  // Acknowledge immediately
  return NextResponse.json({ received: true })
}
```

Then a worker (Inngest, Trigger.dev, BullMQ, AWS SQS + Lambda)
does the real work — sending emails, updating CRM, etc. — and
retries on its own schedule.

If your handler runs everything inline AND takes >20s, Stripe times
out and retries — leading to potential duplicates if handler isn't
idempotent. Async queue removes the problem.

---

## Event types — what to listen for, when

### One-off sales (Path A / Path B Checkout in `payment` mode)

| Event | Why |
|---|---|
| `checkout.session.completed` | Single source of truth — sale is done, fulfill |
| `charge.refunded` | Operator issued a refund — reverse fulfillment |
| `charge.dispute.created` | Customer disputed — urgent |
| `payment_intent.payment_failed` | Card declined / 3DS failed — for analytics |

### Subscriptions

| Event | Why |
|---|---|
| `customer.subscription.created` | New sub — grant access, send welcome |
| `customer.subscription.updated` | Plan changed — adjust access |
| `customer.subscription.deleted` | Cancelled — revoke access at period end |
| `customer.subscription.trial_will_end` | Trial ends in 3 days — nudge to add card |
| `invoice.payment_succeeded` | Renewal succeeded — extend access |
| `invoice.payment_failed` | Renewal failed — dunning starts |
| `customer.updated` | Customer info changed (card update?) |

### Marketplace (Connect — skill 07)

| Event | Why |
|---|---|
| `account.updated` | Connected account verification / capabilities |
| `transfer.created` | Money sent to connected account |
| `application_fee.created` | Platform fee booked |
| `payout.paid` | Connected account got their bank deposit |
| `payout.failed` | Connected account payout failed |

### Disputes / risk

| Event | Why |
|---|---|
| `charge.dispute.created` | New dispute filed |
| `charge.dispute.updated` | Evidence submitted, bank decision pending |
| `charge.dispute.closed` | Outcome — won or lost |
| `radar.early_fraud_warning.created` | Issuer flagged the charge as potential fraud (proactive — refund before chargeback) |
| `review.opened` | Stripe Radar opened a review (manual eyes on it) |

### Tax (if Stripe Tax)

| Event | Why |
|---|---|
| `tax.transaction.created` | Tax obligation recorded — for reporting |

---

## Common errors and how to fix

### "Bad signature: No signatures found matching the expected signature"

- Wrong webhook secret (test secret with live mode or vice versa)
- Body was JSON.parse'd before signature check — must use the raw
  string body
- Framework middleware mutated the body (e.g. Express
  `body-parser` JSON middleware ran first — needs `express.raw`
  for the webhook route)

Fix: use `req.text()` in Next.js / `bodyParser: false` in Pages
Router / `express.raw({ type: 'application/json' })` in Express.

### Events arriving multiple times

- Idempotency not implemented — see above
- Or, Stripe is retrying because your endpoint returned non-2xx
  (check the dashboard's webhook log for status codes)

### Events not arriving

- Wrong URL (typo in dashboard config)
- DNS / firewall blocking Stripe IPs (Stripe publishes their IP
  range — `stripe.com/docs/ips`)
- Endpoint returning 4xx every time — check logs
- Webhook disabled in dashboard (Stripe sometimes auto-disables
  after persistent failures)

Check Dashboard → Developers → Webhooks → [endpoint] → "Events"
tab. Shows every attempt with status code. If everything reads
"failed", it's your endpoint. If empty, it's URL / DNS.

### Timeouts

- Vercel serverless function: default 10s on Hobby, 60s on Pro,
  300s on Enterprise
- Cloudflare Workers: 30s
- AWS Lambda: 15min default
- Move slow work to a queue

### Signature secret rotated

If you ever rotate the signing secret (Dashboard → Webhooks →
[endpoint] → roll secret), update `STRIPE_WEBHOOK_SECRET` and
redeploy within the rotation window (Stripe accepts both old + new
for 24h).

---

## Monitoring

After the webhook is live, set up monitoring:

1. Dashboard → **Webhooks → [endpoint]**:
   - Watch "Failed deliveries" count weekly
   - Set up email alerts on failed deliveries (Stripe sends them
     after 3 consecutive failures by default)
2. Pipe webhook errors to:
   - Sentry / Bugsnag / Rollbar (error tracking)
   - Datadog / Honeycomb / Logflare (logs)
   - Slack via a "if more than 5 failed events in 1 hour" alert

In `learnings.md`: track webhook health monthly (events
sent / succeeded / failed / avg retries).

## Done condition

You're done with this skill when ALL of these are true:

- [ ] A webhook receiver is wired (Zapier / Make / n8n / own
      endpoint)
- [ ] (Own endpoint) Signature verification is implemented
- [ ] (Own endpoint) Idempotency is implemented
- [ ] Webhook is registered in Stripe dashboard with the right
      event types
- [ ] A test event has been delivered AND processed successfully
- [ ] (Own endpoint) `STRIPE_WEBHOOK_SECRET` is set in production
- [ ] The operator can see in their downstream system (Zap
      history, Sheet rows, app logs) that real events are arriving
- [ ] Monitoring is in place for failed deliveries
- [ ] (Subscriptions) `invoice.payment_failed` triggers a dunning
      action

When done, say:

> *"Sales are heard. [Receiver] is processing events idempotently,
> signature-verified, with retries. Now let's handle tax + refunds
> properly."*

Load `05-tax-refunds.md`.
