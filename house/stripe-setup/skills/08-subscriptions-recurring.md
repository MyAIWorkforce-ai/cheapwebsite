---
name: stripe-subscriptions-recurring
description: Deep skill for subscription businesses. Billing cycles, free trials, plan changes with proration, dunning rules (Smart Retries vs custom), card-update flows, churn rescue, pause/resume, annual upgrades, and the customer comms pack for each lifecycle moment.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Subscriptions + recurring billing

## Your job

Make subscription billing not leak money. Specifically:

1. **Trial-to-paid conversions** are tracked + nudged
2. **Plan changes** happen cleanly with correct proration
3. **Dunning** recovers the 20-40% of failed payments that are
   recoverable
4. **Card-expired** customers update their card before churning
5. **Voluntary churn** has a "before you go" rescue moment
6. **Annual upgrades** are pitched at the right time
7. **The full lifecycle comms pack** is in place

Subscription operators that don't tune this lose 15-25% of MRR
per year to involuntary churn alone. Done right, that drops to
4-8%.

## Step 1 — billing cycle decisions

### Anchor day

Each subscription has an **anchor day** — the day of the month
billing happens. Stripe default: the day the sub was created.

For consumer subs: anchor day = creation day is fine. Customer
billed July 14, Aug 14, Sep 14 etc.

For B2B / cohort-style: consider **fixed anchor** — all subs bill
1st of month. Easier reporting. Set via `billing_cycle_anchor`
parameter at sub creation:

```ts
await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: priceId }],
  billing_cycle_anchor: nextMonthFirst,  // Unix timestamp
  proration_behavior: 'create_prorations',  // pro-rate first month
})
```

### Interval

Already set on the Price (skill 02). Common patterns:

| Interval | Use case |
|---|---|
| Monthly | Default; consumer SaaS |
| Annual | Discounted to drive longer commitment; ~20% cheaper than monthly is the sweet spot |
| Quarterly | B2B mid-market |
| 6-monthly | Edge case; mostly B2B |
| Weekly | Rarely useful — fitness apps, content drips |
| Daily | API/usage businesses with daily cycles |

### Charging upfront vs in arrears

Default: charged at start of period (upfront).

For B2B contracts where the customer wants "use first, pay end of
month": configure `payment_behavior: 'pending_if_incomplete'` and
collect via Invoice flow.

## Step 2 — free trials

Set on the Price (skill 02) or per-subscription:

```ts
await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: priceId }],
  trial_period_days: 14,
})
```

Or without card collection (free trial without commitment):

```ts
await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: priceId }],
  trial_period_days: 14,
  trial_settings: {
    end_behavior: { missing_payment_method: 'cancel' },
  },
  payment_settings: {
    save_default_payment_method: 'on_subscription',
  },
})
```

Trial UX patterns:

| Pattern | Description | When |
|---|---|---|
| **Card upfront, trial then charge** | Card captured at signup, charged when trial ends | High-intent products; most SaaS |
| **No card, trial then prompt** | Free trial; prompt for card at end | Lower-friction onboarding; lower trial-to-paid conv |
| **Money-back guarantee** | Charged upfront, refund if asked within X days | Highest signal of intent; clearest revenue |

Stripe defaults:
- "Trial ending in 7 days" email — Settings → Customer emails →
  Subscriptions; turn ON
- "Trial ended, payment failed" email — auto

### Custom trial comms

Better than Stripe defaults: send your own:
- Day 0 (signup): "Welcome to trial. Here's how to get started."
- Day 3: "How's it going? Here's a feature you might have missed."
- Day 7: "4 days left. Here's what other customers love."
- Day 12: "2 days left. Update your card to keep going."
- Day 14: "Trial ended. Welcome to Pro." (or "Sad to see you go.")

See `templates/subscription-comms-pack.md`.

### Trial conversion target

Industry benchmarks for trial → paid conversion:

| Product type | Card-upfront | No-card |
|---|---|---|
| Consumer SaaS | 60-70% | 15-25% |
| B2B SaaS | 50-65% | 8-15% |
| Pro-tools (designer / dev) | 50-65% | 20-30% |
| Premium content / media | 40-55% | 5-12% |

Track in `learnings.md`. If trial conv is <40% with card upfront,
the product isn't activating users fast enough — fix onboarding.

## Step 3 — plan changes (upgrades, downgrades, swaps)

### How Stripe handles plan changes

When a customer switches plans mid-cycle, Stripe applies
**proration** by default:

- Customer on $29/mo plan, on day 15 switches to $99/mo
- Stripe pro-rates the unused $29 (15 days = ~$14.50 credit)
- Stripe pro-rates the new $99 for the remaining 15 days (~$49.50
  charge)
- Net immediate charge: $49.50 - $14.50 = $35 + tax
- Next month: full $99

```ts
await stripe.subscriptions.update(subscriptionId, {
  items: [{
    id: subscriptionItemId,
    price: newPriceId,
  }],
  proration_behavior: 'create_prorations',  // default
})
```

### Proration behaviour options

| Behaviour | What happens |
|---|---|
| `create_prorations` | Standard: pro-rata credit + new charge calculated, applied next invoice |
| `none` | No proration; customer just billed for new plan from next cycle |
| `always_invoice` | Generate an immediate invoice for the proration delta |

For SaaS where customers expect instant access on upgrade:
`always_invoice` — immediate charge for the upgrade delta.

For downgrades: `create_prorations` with credit applied next
cycle is standard — customer paid for the more expensive plan,
gets the unused value back as credit.

### Upgrade flow (in-app via Customer Portal)

If using Customer Portal (skill 06), plan changes are
self-service. Configure:
- Settings → Billing → Customer Portal → "Switch plans" → ON
- Pick which Products customers can switch between
- Set proration mode

If building custom UI:

```ts
// /api/upgrade-plan
const subscription = await stripe.subscriptions.retrieve(subId)
const item = subscription.items.data[0]

await stripe.subscriptions.update(subId, {
  items: [{ id: item.id, price: newPriceId }],
  proration_behavior: 'always_invoice',  // charge immediately
})
```

### Downgrade flow

Common best practice: **schedule downgrade for end of current
period**, not immediate.

```ts
await stripe.subscriptions.update(subId, {
  items: [{ id: itemId, price: lowerPriceId }],
  proration_behavior: 'none',
  billing_cycle_anchor: 'unchanged',
  // Or use scheduled subscription updates for cleaner UX
})
```

Or use Stripe **Subscription Schedules** for "downgrade at end of
period":

```ts
const schedule = await stripe.subscriptionSchedules.create({
  from_subscription: subId,
})

await stripe.subscriptionSchedules.update(schedule.id, {
  phases: [
    {
      items: [{ price: currentPriceId }],
      end_date: currentPeriodEnd,
    },
    {
      items: [{ price: newLowerPriceId }],
    },
  ],
})
```

## Step 4 — dunning (failed payment recovery)

The biggest single lever for subscription operators. **20-40% of
failed payments are recoverable** — but only if you have a system.

### Smart Retries (Stripe's built-in)

Stripe's ML-based retry logic. Default is ON.

- Settings → Billing → Subscriptions → "Failed payments" → "Smart
  Retries"
- Retries up to 4 times over ~3 weeks at optimal times
- Recovers ~25-35% on average

Good baseline. Most operators leave this on.

### Custom retry schedule

For more control, configure a custom retry schedule:

```
Day 0:  Initial charge fails
Day 1:  Retry #1 + Email "We couldn't charge your card"
Day 3:  Retry #2 + Email "Update your card to keep service"
Day 7:  Retry #3 + Email "Last attempt before cancellation"
Day 14: Retry #4 + Final email
Day 14: Cancel subscription (or grace period extension)
```

Stripe lets you customise via Settings → Billing → Subscriptions
→ "Failed payments" → custom schedule.

### Customer emails

Settings → Customer emails:
- "Send emails when a payment is in retry" → ON
- "Send emails when a card is about to expire" → ON
- "Send emails when a subscription is canceled due to failed
  payments" → ON

Customise the templates if your brand voice matters. See
`templates/subscription-comms-pack.md` for variants.

### Card-update link

In every dunning email, include a one-click card-update link.
Stripe generates these via Customer Portal:

```ts
const session = await stripe.billingPortal.sessions.create({
  customer: customerId,
  return_url: 'https://yourapp.com/account',
  flow_data: {
    type: 'payment_method_update',
  },
})
```

Customer clicks → Stripe Customer Portal opens directly on "Update
payment method" → updates → returns to your app. One click vs 5.
Drives card-update conversion up 2-3x.

### Card-expired prevention

Stripe sends "your card is expiring" emails automatically if you
enable them. Use them. ~30% of customers update proactively when
prompted.

For higher-stakes operators (annual contracts, high LTV):
- Webhook `customer.subscription.updated` → check
  `default_payment_method` expiry
- 60 days before expiry: email "update before your next
  renewal"
- 30 days: nudge again
- 7 days: urgent

### Network Updater (automatic card updates)

Stripe partners with Visa + Mastercard for **Account Updater** —
when a card is reissued (new number / expiry), Stripe gets the
new details automatically. ON by default (free, US/UK/EU mostly;
some regions opt-in).

Confirm enabled: Settings → Billing → Subscriptions → Account
Updater status.

This single feature recovers ~5-10% of MRR that would otherwise
churn to expired cards. Don't disable.

### Dunning targets

Track in `learnings.md`:
- Failed-payment rate: <10% of recurring charges (target)
- Recovery rate: >40% of failures recovered (target)
- Time-to-recovery: avg days from first failure to successful retry

If recovery rate <30%, the dunning emails aren't landing or
aren't urgent enough. A/B test subject lines + send times.

## Step 5 — voluntary churn (cancellation)

When a customer wants to cancel, the moment matters.

### Cancel flow

Default (Customer Portal): customer clicks Cancel → confirms →
Stripe schedules cancellation at end of period → customer keeps
access until then.

### Cancellation reason capture

Configure in Customer Portal: "Why are you cancelling?" required
field. Options:

- Too expensive
- Missing a feature
- Switched to a competitor
- Not using it enough
- Temporary — will be back
- Other (free text)

Webhook `customer.subscription.deleted` → save the reason →
`learnings.md`. Patterns inform product.

### "Before you go" rescue

Industry-leading subscription apps offer one of:
- **Discount** ("Stay for 50% off next 3 months") — recovers
  ~10-15% of cancellations
- **Pause** ("Pause for up to 3 months instead?") — recovers ~5-10%
- **Downgrade** ("Switch to a cheaper plan instead?") — recovers
  ~10-20%

Configure in Customer Portal: Settings → Billing → Customer
Portal → "Cancellation reasons" → Offer discounts / Offer pause /
Suggest downgrade.

Custom rescue UI (in-app, more flexible):
- Detect cancel button click
- Show modal: "Wait! Stay for 50% off next 3 months?"
- If accepted: apply coupon to subscription:

```ts
await stripe.subscriptions.update(subId, {
  discounts: [{ coupon: 'SAVE50_3MO' }],
  proration_behavior: 'none',
})
```

- If declined: proceed with cancellation

A/B test rescue offers. Discount % matters (50% > 30% > 20% in
recovery rate, but 50% costs more per save).

### Pause subscriptions

Newer Stripe feature. Customer paused; no billing; no access (or
access depending on config).

```ts
await stripe.subscriptions.update(subId, {
  pause_collection: {
    behavior: 'mark_uncollectible',  // or 'keep_as_draft'
    resumes_at: futureUnixTimestamp,  // null = indefinite
  },
})
```

Use for: seasonal businesses, "I'm on holiday" customer scenarios.

## Step 6 — annual upgrade pitches

The most underused MRR boost: pitch existing monthly customers to
switch to annual.

### Timing

Pitch annual to a monthly customer at:
- Day 90 of being a monthly customer (they've stuck — high
  retention signal)
- Right after a high-engagement moment (just used a key feature)
- Right after they discuss extending (e.g. "I'll be using this
  for the next year")

### Offer

Standard:
- Monthly: $29/mo = $348/yr
- Annual: $290/yr (17% discount — "2 months free")

The math:
- Customer saves $58/yr (16.7%)
- You get the cash upfront
- LTV typically 1.5-2x for annual customers (lower churn)

### Mechanics

In-app or via email:
1. Show savings: "Save $58/year — switch to annual"
2. Click → call API:

```ts
await stripe.subscriptions.update(subId, {
  items: [{ id: itemId, price: annualPriceId }],
  proration_behavior: 'always_invoice',
})
```

Customer is charged the annual price (minus pro-rata credit for
their current monthly cycle). Now on annual.

## Step 7 — usage-based / metered billing

Already touched in skill 02. Deep here:

### Reporting usage

```ts
await stripe.subscriptionItems.createUsageRecord(
  subscriptionItemId,
  {
    quantity: 1500,  // 1500 units this period
    timestamp: 'now',
    action: 'increment',  // or 'set' for total
  }
)
```

Call at the moment usage happens, OR batch nightly. Stripe
aggregates per billing period.

### Usage-based + flat fee combo

Common pattern: "$X/mo base + $Y per unit over threshold".

Two subscription items:
```ts
items: [
  { price: 'price_BASE' },  // flat $X/mo
  { price: 'price_PER_UNIT' },  // metered
]
```

Customer billed: base + (units × per-unit price). Stripe handles
the aggregation.

### Reporting usage to customers (transparency)

Customer Portal: enable "Usage history" so customers see their
usage building up.

In your own app: build a usage dashboard updated daily. Customers
hate end-of-month bill surprises.

## Step 8 — annual contract upgrades / mid-cycle adds

For B2B SaaS where mid-year contract additions are common (added
seats, added features):

### Adding seats mid-contract

```ts
await stripe.subscriptions.update(subId, {
  items: [{
    id: seatItemId,
    quantity: newSeatCount,
  }],
  proration_behavior: 'always_invoice',
})
```

Customer gets an immediate invoice for the additional seats
(pro-rated for remaining contract period).

### Add-on products mid-contract

Add a new subscription item:

```ts
await stripe.subscriptions.update(subId, {
  items: [
    { id: existingMainItemId },  // keep existing
    { price: 'price_ADDON' },  // new add-on item
  ],
  proration_behavior: 'always_invoice',
})
```

## Step 9 — subscription cancellation: end-of-life

When a sub finally ends (customer cancelled, didn't reactivate
after grace, etc.):

1. Webhook `customer.subscription.deleted` fires
2. Revoke product access (in your app, not Stripe — Stripe just
   stops billing)
3. Save reason for cancellation
4. Trigger "win-back" email sequence (90 days later: "We've
   shipped X, Y, Z — come back?")
5. Keep customer record in Stripe (don't delete) for analytics +
   re-activation

Win-back conversion benchmarks: 5-10% for SaaS at 90 days.

## Step 10 — comms pack

See `templates/subscription-comms-pack.md` for these variants:

- Welcome email (sub created)
- Trial ending in 7 days
- Trial ending in 2 days
- Trial ended, charged successfully
- Trial ended, payment failed
- Payment succeeded (renewal)
- Payment failed (dunning #1, #2, #3)
- Card expiring soon
- Plan changed (upgrade)
- Plan changed (downgrade)
- Cancellation confirmed
- Win-back at 90 days

Brand them. Stripe's defaults are functional but generic. A
branded comms pack:
- Sounds like the operator
- Includes the operator's support email
- Reduces "I didn't know this was renewing" disputes

## Common gotchas

- **Trial with no card → trial ends → no payment method → bills
  $0 + cancels silently** → customer thinks they're still in
  trial; investigate / build a "trial ended, your account is
  paused" UX
- **Annual customers on monthly products with no upgrade path** →
  build the upgrade flow; missing $X/customer/year in MRR delta
- **Failed-payment emails going to spam** → check SPF / DKIM /
  DMARC on operator's sending domain
- **Dunning takes 3 weeks; customer thinks they cancelled** →
  cancel after retries 4-5; communicate the schedule clearly
- **Customer Portal lets cancel without confirmation** → high
  voluntary churn rate; add a confirm + reason capture
- **Proration confusing on upgrades** → Stripe's emails clearly
  break down the math; trust them or override
- **No webhook handler for `customer.subscription.deleted`** →
  access revoked manually = operator forgets; auto-revoke on event
- **Cards updated via Account Updater fail because of CVC
  re-verify** → some banks require CVC on first charge after
  reissue; build a "verify your card" UX if seeing high failure
  rate after updater
- **Multi-currency subs renewing at outdated rates** → if you
  display prices in customer's local currency, refresh the
  conversion rate periodically

## Monitoring + `learnings.md` integration

Track monthly:
- MRR (start, end, delta)
- New sub MRR
- Upgrade MRR
- Downgrade MRR
- Churned MRR
- Reactivated MRR
- Trial → paid conv rate
- Voluntary churn rate
- Involuntary churn rate
- Dunning recovery rate

See `config/learnings-template.md` for the structure.

## Done condition

You're done with this skill when ALL of these are true:

- [ ] Trial logic configured (with card / no card, length)
- [ ] Trial conversion comms in place (Stripe default OR custom)
- [ ] Plan change flow works (upgrade and downgrade)
- [ ] Smart Retries enabled OR custom dunning schedule configured
- [ ] Card-update link works in dunning emails
- [ ] Account Updater confirmed ON
- [ ] "Before you go" rescue flow in Customer Portal OR custom
- [ ] Subscription comms pack adapted from
      `templates/subscription-comms-pack.md`
- [ ] Webhook handlers wired for trial.will_end, subscription
      .deleted, invoice.payment_failed (skill 04)
- [ ] (If applicable) Annual upgrade pitch flow built
- [ ] MRR / churn metrics being tracked in `learnings.md`

When done, say:

> *"Subscriptions tuned. Trial-to-paid flow, dunning + card-update
> + rescue all in place. MRR leakage minimised. Next: fraud +
> disputes."*

Load `09-fraud-disputes.md`.
