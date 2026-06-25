# Webhook handler — complete pattern

The agent uses this as a base when the operator wants their own
webhook endpoint (skill 04 Path B). Adapt to the operator's stack.

## Next.js App Router — full router with idempotency + queue

```ts
// app/api/stripe-webhook/route.ts
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { redis } from '@/lib/redis'
import { queue } from '@/lib/queue'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const runtime = 'nodejs'  // NOT 'edge' — needs Stripe SDK
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const body = await req.text()  // RAW body — required for verification
  const sig = (await headers()).get('stripe-signature')

  if (!sig) {
    console.error('[webhook] missing stripe-signature header')
    return NextResponse.json({ error: 'missing signature' }, { status: 400 })
  }

  // 1. Verify signature
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (err) {
    console.error('[webhook] signature verification failed', err)
    return NextResponse.json(
      { error: `bad signature: ${(err as Error).message}` },
      { status: 400 },
    )
  }

  // 2. Idempotency check (event-id-based dedup)
  const dedupKey = `stripe:event:${event.id}`
  const existing = await redis.get(dedupKey)
  if (existing === 'done') {
    console.log(`[webhook] duplicate event ${event.id}, skipping`)
    return NextResponse.json({ received: true, duplicate: true })
  }
  // Mark as processing (7-day TTL)
  await redis.set(dedupKey, 'processing', 'EX', 60 * 60 * 24 * 7)

  // 3. Acknowledge fast, work async
  try {
    await queue.add('process-stripe-event', {
      eventId: event.id,
      type: event.type,
      data: event.data.object,
    })
    await redis.set(dedupKey, 'done', 'EX', 60 * 60 * 24 * 7)
    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[webhook] queue failed', err)
    // Don't mark as done; let Stripe retry
    return NextResponse.json({ error: 'queue failed' }, { status: 500 })
  }
}
```

## Worker — the actual fulfillment

```ts
// workers/stripe-events.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function processStripeEvent({
  eventId,
  type,
  data,
}: {
  eventId: string
  type: string
  data: any
}) {
  console.log(`[worker] processing ${type} (${eventId})`)

  try {
    switch (type) {
      case 'checkout.session.completed':
        await onCheckoutComplete(data as Stripe.Checkout.Session)
        break

      case 'customer.subscription.created':
        await onSubscriptionCreated(data as Stripe.Subscription)
        break

      case 'customer.subscription.updated':
        await onSubscriptionUpdated(data as Stripe.Subscription)
        break

      case 'customer.subscription.deleted':
        await onSubscriptionCancelled(data as Stripe.Subscription)
        break

      case 'customer.subscription.trial_will_end':
        await onTrialEndingSoon(data as Stripe.Subscription)
        break

      case 'invoice.payment_succeeded':
        await onInvoicePaid(data as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await onInvoiceFailed(data as Stripe.Invoice)
        break

      case 'charge.refunded':
        await onRefund(data as Stripe.Charge)
        break

      case 'charge.dispute.created':
        await onDisputeCreated(data as Stripe.Dispute)
        break

      case 'charge.dispute.updated':
      case 'charge.dispute.closed':
        await onDisputeUpdated(data as Stripe.Dispute)
        break

      case 'radar.early_fraud_warning.created':
        await onEarlyFraudWarning(data as Stripe.Radar.EarlyFraudWarning)
        break

      // Connect events (skill 07)
      case 'account.updated':
        await onConnectedAccountUpdated(data as Stripe.Account)
        break

      case 'payout.paid':
        await onPayoutPaid(data as Stripe.Payout)
        break

      case 'payout.failed':
        await onPayoutFailed(data as Stripe.Payout)
        break

      default:
        console.log(`[worker] unhandled event type: ${type}`)
    }
  } catch (err) {
    console.error(`[worker] handler failed for ${type}`, err)
    throw err  // Let queue retry
  }
}

// ---------- handlers ----------

async function onCheckoutComplete(session: Stripe.Checkout.Session) {
  // 1. Look up the order in your DB (or create it)
  const orderId = session.metadata?.order_id
  const customerEmail = session.customer_details?.email

  // 2. Mark order as paid
  await db.orders.update(orderId, {
    status: 'paid',
    stripeSessionId: session.id,
    paidAt: new Date(),
  })

  // 3. Deliver the product
  if (session.mode === 'payment') {
    // One-off: send download link, ship physical, etc.
    await deliverProduct(orderId, customerEmail)
  } else if (session.mode === 'subscription') {
    // Subscription: grant access
    const subscriptionId = session.subscription as string
    await grantSubscriptionAccess(customerEmail, subscriptionId)
  }

  // 4. Notify operator (Slack, email)
  await sendSlackAlert(`💰 Sale: $${session.amount_total! / 100} — ${customerEmail}`)
}

async function onSubscriptionCreated(sub: Stripe.Subscription) {
  await db.subscriptions.create({
    stripeSubscriptionId: sub.id,
    customerId: sub.customer as string,
    status: sub.status,
    currentPeriodEnd: new Date(sub.current_period_end * 1000),
    priceId: sub.items.data[0].price.id,
  })

  await sendWelcomeEmail(sub.customer as string)
}

async function onSubscriptionUpdated(sub: Stripe.Subscription) {
  await db.subscriptions.update(sub.id, {
    status: sub.status,
    currentPeriodEnd: new Date(sub.current_period_end * 1000),
    priceId: sub.items.data[0].price.id,
    cancelAt: sub.cancel_at ? new Date(sub.cancel_at * 1000) : null,
  })

  if (sub.cancel_at_period_end) {
    await sendCancellationConfirmation(sub.customer as string)
  }
}

async function onSubscriptionCancelled(sub: Stripe.Subscription) {
  await db.subscriptions.update(sub.id, {
    status: 'canceled',
    canceledAt: new Date(),
  })

  // Revoke access at period end
  await revokeSubscriptionAccess(sub.customer as string)

  // Trigger win-back sequence at 90 days
  await scheduleWinBackEmail(sub.customer as string, daysFromNow(90))
}

async function onTrialEndingSoon(sub: Stripe.Subscription) {
  await sendTrialEndingNotification(sub.customer as string, sub.trial_end!)
}

async function onInvoicePaid(invoice: Stripe.Invoice) {
  // Subscription renewed — extend access
  if (invoice.subscription) {
    await extendSubscriptionAccess(invoice.subscription as string)
  }
}

async function onInvoiceFailed(invoice: Stripe.Invoice) {
  // Dunning starts
  const subscriptionId = invoice.subscription as string
  const customerId = invoice.customer as string

  // Generate a card-update link
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_URL}/account`,
    flow_data: { type: 'payment_method_update' },
  })

  await sendDunningEmail({
    customerId,
    attempt: invoice.attempt_count,
    nextRetry: invoice.next_payment_attempt,
    cardUpdateUrl: portalSession.url,
  })

  await sendSlackAlert(
    `⚠️ Failed payment: $${invoice.amount_due / 100} — ${customerId} — attempt ${invoice.attempt_count}`
  )
}

async function onRefund(charge: Stripe.Charge) {
  // Track refund + revoke any access if appropriate
  await db.payments.update(charge.id, {
    refundedAmount: charge.amount_refunded,
    refundedAt: new Date(),
  })

  // Log to learnings.md analytics
  await logRefund(charge)
}

async function onDisputeCreated(dispute: Stripe.Dispute) {
  // URGENT — alert operator
  await sendSlackAlert(
    `🚨 DISPUTE: $${dispute.amount / 100} — reason: ${dispute.reason} — ` +
    `evidence due: ${new Date(dispute.evidence_details.due_by * 1000).toISOString()}`
  )

  await sendEmailToOps({
    subject: `Dispute filed: ${dispute.id}`,
    body: buildDisputeAlertEmail(dispute),
  })

  // Save dispute record for tracking
  await db.disputes.create({
    stripeDisputeId: dispute.id,
    chargeId: dispute.charge as string,
    amount: dispute.amount,
    reason: dispute.reason,
    status: dispute.status,
    dueBy: new Date(dispute.evidence_details.due_by * 1000),
  })
}

async function onDisputeUpdated(dispute: Stripe.Dispute) {
  await db.disputes.update(dispute.id, {
    status: dispute.status,
  })

  if (dispute.status === 'won' || dispute.status === 'lost') {
    await sendSlackAlert(
      `Dispute ${dispute.status.toUpperCase()}: $${dispute.amount / 100}`
    )
  }
}

async function onEarlyFraudWarning(warning: Stripe.Radar.EarlyFraudWarning) {
  // Stripe says: card issuer flagged this charge as fraud.
  // Refund immediately to avoid the upcoming dispute + $15 fee.
  await stripe.refunds.create({
    charge: warning.charge as string,
    reason: 'fraudulent',
  })

  await sendSlackAlert(
    `🛡️ Early fraud warning — auto-refunded charge ${warning.charge}`
  )
}

async function onConnectedAccountUpdated(account: Stripe.Account) {
  await db.connectedAccounts.update(account.id, {
    chargesEnabled: account.charges_enabled,
    payoutsEnabled: account.payouts_enabled,
    detailsSubmitted: account.details_submitted,
  })

  if (account.charges_enabled && account.payouts_enabled) {
    await sendSellerOnboardingCompleteEmail(account.id)
  }
}

async function onPayoutPaid(payout: Stripe.Payout) {
  // For monthly reconciliation tracking (skill 12)
  await logPayout(payout)
}

async function onPayoutFailed(payout: Stripe.Payout) {
  await sendSlackAlert(`Payout failed: ${payout.id} — ${payout.failure_message}`)
}
```

## Idempotency helpers

```ts
// lib/redis.ts (using Upstash Redis or similar)
import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})
```

Or use a DB:

```sql
CREATE TABLE webhook_events (
  event_id VARCHAR(255) PRIMARY KEY,
  event_type VARCHAR(100),
  status VARCHAR(20) NOT NULL,  -- 'processing' | 'done' | 'failed'
  received_at TIMESTAMP DEFAULT NOW(),
  processed_at TIMESTAMP,
  error TEXT
);

CREATE INDEX idx_webhook_events_status ON webhook_events(status);
```

```ts
async function isAlreadyProcessed(eventId: string): Promise<boolean> {
  const result = await db.query(
    'SELECT status FROM webhook_events WHERE event_id = $1',
    [eventId]
  )
  return result.rows[0]?.status === 'done'
}
```

## Queue options

- **Inngest** (recommended for Next.js) — `inngest.com`
- **Trigger.dev** — `trigger.dev`
- **BullMQ + Redis** — self-hosted; flexible
- **AWS SQS + Lambda** — for AWS-native ops
- **Cloudflare Queues** — for Workers users
- **Supabase Edge Functions** — if already on Supabase

For solo operators just starting: skip the queue. Do the work
inline. As long as it's <10s and idempotent, you're fine. Add a
queue when you scale.

## Local development (Stripe CLI)

```bash
# Forward webhooks to local dev server
stripe listen --forward-to localhost:3000/api/stripe-webhook \
  --events checkout.session.completed,invoice.payment_failed

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger invoice.payment_failed
stripe trigger charge.dispute.created
stripe trigger radar.early_fraud_warning.created

# Use the printed webhook secret (whsec_...) as STRIPE_WEBHOOK_SECRET
# locally
```

## Python (Flask) equivalent

```python
import stripe
from flask import Flask, request, jsonify

app = Flask(__name__)
stripe.api_key = os.environ['STRIPE_SECRET_KEY']
WEBHOOK_SECRET = os.environ['STRIPE_WEBHOOK_SECRET']

@app.route('/api/stripe-webhook', methods=['POST'])
def stripe_webhook():
    payload = request.get_data(as_text=True)
    sig = request.headers.get('stripe-signature')

    try:
        event = stripe.Webhook.construct_event(payload, sig, WEBHOOK_SECRET)
    except (ValueError, stripe.error.SignatureVerificationError) as e:
        return jsonify({'error': str(e)}), 400

    if is_already_processed(event['id']):
        return jsonify({'received': True, 'duplicate': True})
    mark_processing(event['id'])

    queue.enqueue(process_stripe_event, event)
    mark_done(event['id'])

    return jsonify({'received': True})
```

## Express (Node) equivalent

```ts
import express from 'express'
import Stripe from 'stripe'

const app = express()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// IMPORTANT: webhook needs RAW body for signature verification
app.post(
  '/api/stripe-webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'] as string
    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${(err as Error).message}`)
    }

    if (await isAlreadyProcessed(event.id)) {
      return res.json({ received: true, duplicate: true })
    }

    await queueEvent(event)
    res.json({ received: true })
  }
)
```

## When to NOT use this pattern

If the operator is on Zapier / Make / n8n: they don't need any of
this. The third-party platform handles signature verification,
idempotency, retries.

This pattern is for operators with their own infrastructure who
need control.
