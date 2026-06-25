---
name: stripe-portal-reporting
description: Enable Stripe Customer Portal so subscribers self-serve (cancel, swap plan, update card, see invoice history). Plus the basic reporting routine for monthly close and accountant-friendly exports. Hands off to skills 10 (accounting) and 12 (monthly reconciliation) for deeper detail.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Customer portal + reporting basics

## Your job

Make the ongoing operation as low-touch as possible:

1. **Customers manage themselves** (no "please cancel my sub"
   emails)
2. **The operator has a monthly reporting habit** so books stay
   clean

This skill covers portal setup + lightweight reporting. Skill 10
covers deep accounting integration; skill 12 covers full monthly
reconciliation.

---

## Part one — Customer Portal

Only needed if the operator has subscriptions, or wants buyers to
update billing info / re-download / see history.

### Step 1 — enable + configure

- Dashboard → **Settings → Billing → Customer portal**
- Toggle: **Enable portal**

Configure what customers CAN do:

| Feature | Default | When to turn on |
|---|---|---|
| Update payment method | ON | Always — reduces dunning churn |
| Update billing address | ON | Always — needed for tax compliance |
| See invoice history | ON | Usually yes |
| Download invoices as PDF | ON | B2B almost always |
| Cancel subscription | ON for self-serve | OFF for high-touch / agency |
| Switch subscription plans | ON if multiple plans | OFF if single plan |
| Update quantity | ON for seat-based | OFF otherwise |
| Pause subscription | OFF (default) | ON if you offer pauses |

For each behaviour, configure the **policy**:

- **Cancellation timing** — immediate vs end of period
  - End of period: customer keeps access they paid for. **Default.**
  - Immediate: full pro-rata refund + cut access now (rare; only
    if your refund policy says so)
- **Proration** — when switching plans
  - Stripe handles automatically (default). Customer credited /
    charged for the difference on next invoice.
  - Turn off only if you have weird refund rules

### Step 2 — set the cancellation behaviour to NEVER auto-cancel for failed payment from the portal

In Settings → Billing → Subscriptions → "Manage failed payments":
- Confirm Smart Retries is on (skill 08)
- Confirm "Cancel after retries" is set to your dunning policy
- Confirm cancelled-by-failure subs don't auto-refund anything
  (default = no)

### Step 3 — get the portal link to customers

Three options:

#### Option A — auto-link in receipts (easiest, lowest friction)

- Settings → **Customer emails → Receipts** → enable "Include link
  to customer portal"
- Every receipt now includes a "Manage subscription" link
- Customer clicks → portal login screen → enters their email →
  Stripe sends a magic link → logged in to portal

This is the right default for most operators. Zero code.

#### Option B — link from the operator's site

For SaaS apps where you want a "Billing" tab in-app:

```ts
// app/api/billing-portal/route.ts
import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  // Look up the Stripe customer ID for the logged-in user
  const customerId = await getCustomerIdForCurrentUser(req)

  if (!customerId) {
    return NextResponse.json({ error: 'no Stripe customer' }, { status: 404 })
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: 'https://acmecoaching.com/account',
  })

  return NextResponse.json({ url: session.url })
}
```

The frontend:
```tsx
const onManageBilling = async () => {
  const res = await fetch('/api/billing-portal', { method: 'POST' })
  const { url } = await res.json()
  window.location.href = url
}
```

Use this when the operator's app already has user accounts and
they want a seamless in-app billing experience.

#### Option C — direct portal login URL (no code)

For ad-hoc use:
- Found in: Settings → Billing → Customer portal → "Customer Portal Configuration"
- URL pattern: `https://billing.stripe.com/p/login/<config-id>`
- Customer types email → magic link → logged in

Less personalised but zero integration. Put it in your support
email signature, FAQ page, footer.

Pick the option matching the operator's setup. Walk through one.

### Step 4 — brand the portal

- Settings → **Branding** → covers the portal too
- Confirm logo + colour are set (uses the same as receipts)
- Settings → Customer portal → "Branding" tab — confirm preview
  looks right

The portal reads as a continuation of the operator's brand if
done right; a generic "Stripe billing" page if done wrong. 5 mins
to brand; high trust dividend.

### Step 5 — test

In test mode:
1. Create a test customer + subscription
2. Open the portal link with the test customer's email
3. Step through as a customer:
   - View invoice history
   - Download a PDF invoice
   - Update card (use test card `4242 4242 4242 4242`)
   - Try cancelling (then re-subscribing if relevant)
   - Try switching plans (if multiple)
4. Confirm in Dashboard → Subscriptions that the changes took effect
5. Confirm webhook events fired (skill 04) for sub updates

Common surprises:
- "Customer can cancel" — they can. Don't enable unless you mean
  it.
- "Customer can change plan" — they can swap up or down. If
  switching down means revoking features, your app needs to
  reflect that via webhook event handlers.

---

## Part two — basic monthly reporting routine

This is the lightweight version. Skill 12 has the full
reconciliation flow. Use this if the operator is small enough
that monthly is just "pull a summary, email it to the accountant."

### Step 1 — what to pull

End of every month, in the dashboard:

| Report | What it tells you |
|---|---|
| Reports → Reports overview | Top-line: gross volume, refunds, fees, net |
| Reports → Income → Gross revenue (CSV) | Detailed per-transaction list — for accountant |
| Reports → Balance → Payouts | Exact $ that hit the bank, with dates |
| Reports → Tax (if Stripe Tax on) | Per-jurisdiction tax collected — for BAS / VAT / 1099 |
| Reports → Subscriptions (if applicable) | MRR, churn, new subs, cancelled subs |
| Reports → Failed Payments | Dunning context |
| Reports → Disputes | Open + resolved, for risk tracking |

### Step 2 — automate the download

For operators on Stripe Standard (no Sigma):
- Dashboard → **Settings → Reports → Automated emails**
- Set monthly emails for:
  - Income summary
  - Balance / payouts
  - Tax (if Stripe Tax on)
- Send to themselves + their accountant

For Sigma users (paid add-on, ~$10-50/mo for query-by-query;
unlimited tier for higher pricing):
- Schedule SQL queries to run end-of-month
- Export to CSV automatically to email or Google Sheets

### Step 3 — the spreadsheet (low-tech but works)

For solo operators without a deep accounting setup:

```
Month  | Gross  | Refunds | Fees  | Net    | Tax collected | Payouts received | Notes
-------|--------|---------|-------|--------|---------------|------------------|-------
2026-06|  $X    |  $Y     | $Z    | $W     |   $V          |    $U            | first PT month
2026-07|        |         |       |        |               |                  |
```

Fill from Stripe reports each month. Email to accountant
quarterly. This single habit catches 90% of bookkeeping issues
before they snowball.

Pull-fields template:
- Gross → Reports → Overview → "Volume"
- Refunds → Reports → Overview → "Refunds"
- Fees → Reports → Overview → "Stripe fees"
- Net → Gross - Refunds - Fees
- Tax → Reports → Tax (if Stripe Tax on)
- Payouts → Reports → Balance

### Step 4 — Xero / QuickBooks / MYOB integration teaser

If the operator uses Xero, QBO, MYOB, FreeAgent, Wave, etc.:

- Their accounting tool has an official Stripe connector
- Once connected, every charge + refund auto-feeds into the books
- Skill 10 walks through each tool's setup

Strong recommendation: any operator over ~$5k/mo revenue
should NOT be running the spreadsheet — switch to a proper
connector. Skill 10 covers each.

For operators under that: spreadsheet is fine for the first 6
months. Migrate when transactions exceed 50/month or the
operator hits the GST/VAT registration threshold.

---

## Part three — operational dashboards (Slack / Discord / email)

Beyond the monthly close, operators benefit from real-time-ish
visibility. Pick one or two:

### Slack daily summary

- Use Zapier "Schedule" → daily 9am
- Action: Stripe "Find charges" → filter to last 24h
- Action: Slack → send message:
  ```
  📊 Yesterday: $X gross, Y orders, Z refunds, $A net
  Top product: [name]
  Open disputes: N
  ```

### Daily founder email

- Same pattern but email instead of Slack
- 1 email per day, takes 10 seconds to read, replaces dashboard
  fatigue

### Customer milestones

- Webhook: customer.subscription.created
- Slack channel: #signups → "🎉 New Pro plan subscriber: [email]"
- Bonus: humanises growth, team feels it

### Failed-payment urgency

- Webhook: invoice.payment_failed
- Slack DM to operator with customer email + amount + retry
  status
- Skill 08 (subscriptions) covers the full dunning UX

---

## Part four — final checklist before declaring "Phase 1 setup done"

Before declaring the initial setup complete (operator's now live
and operating), run through this with them item by item:

- [ ] Stripe account is activated + 2FA on (skill 01)
- [ ] Statement descriptor is branded (skill 01)
- [ ] Products + prices exist for everything they sell (skill 02)
- [ ] A live payment surface accepts real money (skill 03)
- [ ] At least one $1 live test has succeeded + been refunded
- [ ] Webhook / Zapier connection delivers events somewhere
      (skill 04)
- [ ] Tax setup is configured (auto or manual or not-needed-yet,
      skill 05)
- [ ] Refund policy documented + linked from receipt (skill 05)
- [ ] Customer Portal enabled (if subs)
- [ ] Dispute alerts ON
- [ ] Operator has a monthly reporting routine (this skill) or a
      proper accounting connector (skill 10)

If anything's incomplete, loop back and finish that skill first.

---

## When to advance to the deep skills (07-12)

Phase 1 (skills 01-06) covers ~80% of operators. The other 20%
need depth:

| Operator situation | Load next |
|---|---|
| Marketplace / two-sided platform | `07-connect-marketplaces.md` |
| Subscription business needs dunning / churn rescue / proration | `08-subscriptions-recurring.md` |
| Disputes happening; want to tune Radar | `09-fraud-disputes.md` |
| Wire to Xero / MYOB / QBO / FreeAgent / Wave | `10-accounting-integration.md` |
| Want to add region-specific methods (BACS, ACH, BPay) | `11-payment-methods-by-region.md` |
| Want a serious month-end close (>$10k/mo revenue) | `12-monthly-reconciliation.md` |

The agent suggests these in order based on what the operator
needs next. Don't push all 6 if they're a solo coach with one
Payment Link — they don't need Connect.

## Done condition

You're done with this skill when ALL of these are true:

- [ ] (If subs) Customer Portal is enabled + branded + customer-
      tested
- [ ] Customers can self-serve cancel / swap / update card (or
      operator explicitly chose NOT to enable)
- [ ] Operator has a calendar reminder for monthly Stripe reports
      (or has wired skill 10 for automated accounting sync)
- [ ] Phase 1 checklist (above) is complete

When done, say:

> *"Phase 1 done — you're trading. From here, just tell me what
> you need: refund / dispute / new product / sub change /
> monthly close. Or, depending on your business, the deep skills:
> [list relevant 07-12 based on BUSINESS CONFIG]."*

Stand by for the operator's next ask.
