---
name: stripe-portal-reporting
description: Enable Stripe Customer Portal so subscribers self-serve (cancel, swap plan, update card), and walk the user through a clean monthly reporting routine they can hand to their accountant.
allowed_platforms: [claude, openclaw, chatgpt]
tools: []
---

# Customer portal + reporting

## Your job

Make the ongoing operation as low-touch as possible:
1. Customers manage themselves (no "please cancel my sub" emails)
2. The user has a monthly reporting habit so books stay clean

## Part one — Customer Portal

Only needed if the user has subscriptions or wants buyers to be able
to update billing info / re-download / see history.

### Step 1 — enable + configure

- Dashboard → Settings → Billing → Customer portal
- Toggle: **Enable portal**
- Configure what customers CAN do:
  - ✓ Update payment method (always on)
  - ✓ Update billing address (always on)
  - ✓ See invoice history (usually on)
  - ✓ Cancel subscription (depends — on for self-serve SaaS, often
    off for high-touch services)
  - ✓ Switch subscription plans (on if they have multiple plans)
  - ✓ Update quantity (on for seat-based products)

For each behaviour, also configure the policy:
- **Cancellation timing** — immediate vs end of period (end of period
  is standard)
- **Proration** — apply when switching plans (Stripe handles this
  automatically)

### Step 2 — get the portal link to customers

Three options:

#### Option A — auto-link in receipts (easiest)
- Settings → Customer emails → Receipts → enable "Include link to
  customer portal"
- Every receipt now includes a "Manage subscription" link

#### Option B — link from the user's site
- Generate a portal session per logged-in customer:

```ts
const session = await stripe.billingPortal.sessions.create({
  customer: customerId,
  return_url: 'https://example.com/account',
})
return Response.redirect(session.url, 303)
```

The user adds a "Manage billing" link in their app that hits an API
route running the above.

#### Option C — direct link (simplest)
- For one-off use, give the user this URL pattern:
  `https://billing.stripe.com/p/login/<config-id>`
- Found in: Settings → Billing → Customer portal → Configuration
- Less personalised — customer logs in via email

Pick the option matching their setup. Walk through one.

### Step 3 — brand the portal

- Settings → Branding → covers the portal too
- Confirm logo + colour are set (uses the same as receipts)

### Step 4 — test
- In test mode, create a test subscription
- Trigger the portal link from the test receipt
- Step through as a customer: cancel, then re-subscribe
- Confirm the user can see the events in dashboard

---

## Part two — monthly reporting routine

Set this up ONCE so the user has a clean monthly close.

### Step 1 — what to pull

End of every month, in the dashboard:

1. **Reports → Reports overview** — top-line MRR, gross volume,
   refunds, fees
2. **Reports → Balance** → "Payouts" — exact $ that hit the bank
3. **Reports → Income → Gross revenue** — download CSV for the month
4. **Reports → Tax** (if Stripe Tax is on) — collected tax to remit

### Step 2 — automate the download

For users on Stripe Standard:
- Dashboard → Settings → Reports → Automated emails
- Set a monthly email with the Income summary
- Send to themselves + their accountant

For users with API access:
- Use the Reports API for scheduled exports — out of scope for this
  bundle. Mention that as a future option.

### Step 3 — the spreadsheet (low-tech)

For solo operators without an accounting tool, recommend this
two-tab sheet structure:

```
Month  | Gross  | Refunds | Fees  | Net    | Tax collected | Payouts received
2026-06|        |         |       |        |               |
2026-07|        |         |       |        |               |
```

Fill it from the Stripe reports each month. Send a copy to the
accountant quarterly. This single habit catches 90% of bookkeeping
issues before they snowball.

### Step 4 — Xero / QuickBooks integration

If the user uses Xero, MYOB, QuickBooks:
- Their accounting tool has an official Stripe connector
- Walk them through enabling it (each tool's setup is different)
- Once connected, every charge + refund auto-feeds into the books

For larger operations, this is non-negotiable. For sole traders
under $50k/yr revenue, the spreadsheet path is fine.

---

## Part three — final checklist

Before declaring "done", make sure these are all true:

- [ ] Stripe account is activated + 2FA on
- [ ] Statement descriptor is branded
- [ ] Products + prices exist for everything they sell
- [ ] A live payment page accepts real money
- [ ] At least one $1 live test has succeeded + been refunded
- [ ] Webhook / Zapier connection is delivering events somewhere
- [ ] Tax setup is configured (auto or manual)
- [ ] Customer Portal is enabled (if applicable)
- [ ] User has a monthly reporting routine

Run this checklist with the user item by item.

## Done condition

- Customer Portal works (if applicable)
- The user has a calendar reminder set for monthly Stripe reports
- The checklist above is complete

When done, say: *"You're trading. From here on, just say "Stripe
question" and we'll pick up where we left off."* and stand by.
