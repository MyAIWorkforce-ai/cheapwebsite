---
name: stripe-products-prices
description: Translate what the operator actually sells into Stripe Products + Prices. Handles one-off, recurring (monthly/annual/custom), metered/usage-based, multi-currency, multi-tier (Starter/Pro/Enterprise), pay-what-you-want, and bulk-discount patterns. Returns Price IDs ready for skill 03.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Products + prices

## Your job

Take a messy "here's what I sell" from the operator and produce
clean Stripe Products + Prices that:

1. Match the real business model (one-off vs recurring vs hybrid)
2. Cover the currencies the operator's buyers actually use
3. Are structured for clean reporting (you don't want 47 products
   that are really 5 things at different price points)
4. Hand off cleanly to skill 03 (payment surface)

This is where most operators waste hours — creating duplicate
products per currency, mixing recurring + one-off in the same
Product, getting tax behaviour wrong. Get it right once.

## Step 1 — capture what they sell

Ask:

> *"Walk me through what you sell. Just names and prices — bullet
> points fine, don't worry about format. For each, tell me: one-off
> or recurring, what currency, and if it varies (multiple tiers /
> currencies)."*

Pull from BUSINESS CONFIG `WHAT YOU SELL` if it's filled in. If
ambiguous, ask clarifying questions:

- **"Is this one-off or recurring?"** Recurring = subscription;
  bills automatically until cancelled.
- **"Which currencies do you charge in?"** If they charge in
  multiple, each needs its own Price.
- **"Is the price the same for everyone, or does it vary?"** Vary →
  tiered pricing or volume discounts.
- **"Is it tax-inclusive or exclusive?"** Inclusive = price already
  includes GST/VAT (AU/NZ B2C norm). Exclusive = tax added at
  checkout (US norm, B2B everywhere).
- **"Do customers pay upfront or per use?"** Per use = metered/
  usage-based pricing.

## Step 2 — design the Product / Price split

Stripe's model:

- **Product** = the thing being sold (e.g., "Coaching session",
  "Pro plan membership", "Annual workshop pass")
- **Price** = the actual amount in a currency, attached to a
  Product. A single Product can have multiple Prices (USD/AUD,
  monthly/annual, tier 1/2/3).

Apply these rules:

- **One Product per real thing.** Don't split a Product per
  currency. Don't split per billing interval. Don't split per
  pricing tier.
- **One Price per (currency × interval × tier) combination.**
  Example: "Pro plan, $29 USD monthly OR $290 USD yearly OR
  $45 AUD monthly OR $450 AUD yearly" = 1 Product, 4 Prices.
- **Subscription with multiple plans = multiple Products.**
  Starter / Pro / Enterprise are 3 Products. Each has its own
  monthly + annual + currency Prices.
- **Free trial is a Price-level setting, not a separate Product.**

### Worked example — one-off service business

```
PROPOSED PRODUCTS — Acme Coaching
=================================
1. Coaching session (60 min)
   - $150 AUD · one-off
   - $99 USD · one-off

2. Coaching package (5 sessions)
   - $700 AUD · one-off
   - $450 USD · one-off
```

### Worked example — SaaS

```
PROPOSED PRODUCTS — Acme SaaS
=============================
1. Starter plan
   - $19 USD · monthly
   - $190 USD · yearly (2 months free)
   - $29 AUD · monthly
   - $290 AUD · yearly

2. Pro plan
   - $49 USD · monthly
   - $490 USD · yearly
   - $75 AUD · monthly
   - $750 AUD · yearly

3. Enterprise plan
   - Custom — quoted per customer (Invoice flow, not catalogue)
```

### Worked example — marketplace

```
PROPOSED PRODUCTS — Acme Marketplace
====================================
1. Transaction commission
   - 5% of transaction value (platform fee on Connect)

2. Platform monthly fee (sellers)
   - $29 USD · monthly per seller

Note: actual product Prices are dynamic per transaction — handled
in Connect skill 07, not catalogued statically here.
```

Show the proposed structure back to the operator before creating
anything in Stripe.

Wait for *"yes, looks right"* before continuing.

## Step 3 — create in Stripe

Walk through the dashboard:

1. **Products → Add product**
2. Fill in:
   - **Name** (exact, as it appears on receipts and invoices —
     "Pro plan" not "pro-plan-v2-final")
   - **Description** (1-2 sentences — shows on Checkout, helps
     buyers confirm they're buying the right thing)
   - **Image** (square, transparent PNG or product shot — improves
     conversion, especially mobile Checkout)
   - **Statement descriptor suffix** (optional — Stripe appends
     this to the operator's dynamic descriptor prefix; useful for
     multi-product accounts so customers see "ACME* PROPLAN" not
     just "ACME* CHARGE")
3. **Pricing**:
   - **Standard pricing**: enter amount + currency
   - **Recurring**: select "Recurring" → pick interval (daily,
     weekly, monthly, every 3 months, yearly, every 2 years, or
     custom)
   - **Usage-based / metered**: see "Metered patterns" below
   - **Customer chooses price**: see "Pay-what-you-want" below
4. **Tax behaviour** (important):
   - **Inclusive** — buyer sees a price; Stripe extracts the tax
     portion ($110 = $100 + $10 GST)
   - **Exclusive** — buyer sees a price; Stripe adds tax on top
     ($100 + $10 GST = $110)
   - Pick based on BUSINESS CONFIG. Mixing inclusive + exclusive
     across products confuses receipts. Pick one and stick to it.
5. **Save**

Repeat for each Product. For multi-Price Products:
- After creating the Product, scroll to "Pricing" section
- "Add another price"
- Select currency (if multi-currency) and interval (if recurring)

## Step 4 — common patterns

### Multi-currency for the same Product

Don't create separate Products per currency. Add multiple Prices
to the same Product, each with a different currency.

On Checkout, Stripe presents the buyer's local currency
automatically if a Price exists for it (based on buyer's IP /
card BIN). If no Price exists in the buyer's currency, Stripe
charges in the closest currency and converts (2% conversion fee
to the operator).

Cover:
- AUD for AU customers
- USD for US (and global default)
- NZD for NZ
- GBP for UK
- EUR for EU
- CAD for CA

For a global operator: USD as fallback covers most. For a
domestic-focused operator: just their local currency is fine.

### Free trial on subscriptions

Edit the Price → **Trial period** → set in days. Common patterns:

- **7-day trial**: standard SaaS, low-friction
- **14-day trial**: B2B SaaS — gives the buyer time to evaluate
  with their team
- **30-day trial**: enterprise-y, high-trust products
- **No trial, money-back guarantee**: better signal of intent;
  collect payment upfront, refund if asked

Customer card is captured at signup but not charged until trial
ends. **Note:** Stripe sends a "trial ending in 7 days" email
automatically — confirm this is ON in Settings → Customer emails.

### Pay-what-you-want

Stripe supports this via **Customer chooses price** in Payment
Links and Checkout.

- Set a minimum price ($1 minimum at Stripe level)
- Set a suggested price (anchors the buyer — they often pay more)
- Useful for: tip jars, donations, support tiers, freelancers
  with "name your price" intake

### Quantity-based

Selling 1-of-many of the same thing? Don't create N copies.

- Set up the Product once
- On the Checkout / Payment Link in skill 03, enable "Customer can
  adjust quantity"

This works for physical product (10 t-shirts), seat-based SaaS
(per-user pricing), or bundles.

### Tiered / volume pricing

For volume-based per-unit pricing (cheaper per unit when buying
more), use **Tiered pricing**:

- Edit Price → **Pricing model** → Tiered
- Set tiers:

```
Tier 1: 1-10 users      → $10/user/mo
Tier 2: 11-50 users     → $8/user/mo
Tier 3: 51-200 users    → $6/user/mo
Tier 4: 201+ users      → $5/user/mo
```

Two flavours:
- **Volume** — all units at the tier's price (200 users × $5 = $1000)
- **Graduated** — first 10 at tier 1, next 40 at tier 2, etc.

Pick based on the operator's intent. Volume is simpler; graduated
is fairer to the buyer.

### Metered / usage-based pricing

For "$0.01 per API call" or "$0.50 per GB processed":

1. Create the Product
2. Pricing → **Usage-based**
3. Choose:
   - **Per unit** — fixed price per unit
   - **Tiered** — graduated rates as usage grows
4. Choose aggregation:
   - **Sum** — total usage in the period (most common)
   - **Max** — peak usage in the period (utilities-style)
   - **Last during period** — final value at period end
5. Report usage via API: `usage_records.create` against the
   subscription item

For metered usage, the operator NEEDS to wire usage reporting via
API — this can't be done from the dashboard alone. Flag this:
**metered pricing requires developer effort**. Walk through the
basic usage-record API call:

```ts
await stripe.subscriptionItems.createUsageRecord(
  subscriptionItemId,
  { quantity: 100, timestamp: 'now', action: 'increment' }
)
```

### Multi-tier subscriptions (Starter / Pro / Enterprise)

Each tier = a separate Product. Each tier has its own monthly +
annual Prices. Customer-facing pricing page lists them side-by-
side.

For "Enterprise — contact us": don't create a Stripe Product.
Use the Invoice flow (skill 03 Path D) — quote each customer,
send a custom Invoice.

### Annual discount on monthly subs

Common pattern: "$X/mo or $Y/yr (2 months free)".

Just create both Prices on the same Product:

```
Pro plan
- $29 USD · monthly
- $290 USD · yearly (effectively $24.17/mo — 17% discount)
```

Customer picks at Checkout. Up to the operator to display the
"2 months free" or "save 17%" framing on their own pricing page.

### Setup fee + recurring

If there's a one-time setup fee plus recurring:

- Option A (cleaner): two Prices on Checkout — the recurring sub
  Price + a one-off setup Price as a line item
- Option B: bake setup into the first month (Stripe Subscription
  with `add_invoice_items` for setup) — more complex but cleaner UX

Walk through Option A unless the operator specifically wants B.

### Discount / promo codes

Don't bake discounts into Prices. Use **Coupons** instead:

1. Dashboard → **Products → Coupons → New**
2. Pick:
   - Percent off (e.g. 20%) or amount off (e.g. $10)
   - Once / repeating (X months) / forever
   - Duration
   - Optional: max redemptions, expiry, eligible products

3. Then create a **Promotion code** (customer-facing string) bound
   to the coupon: `LAUNCH20`, `BLACKFRIDAY` etc.

Promotion codes are what customers type into Checkout. Coupons
are the underlying discount.

## Step 5 — note the Price IDs

After creating each Price, copy the Price ID (looks like
`price_1ABC...`). These are what skill 03 plugs into Payment
Links / Checkout. Save them in conversation context:

```
PRICE_IDS — Acme SaaS
=====================
Starter monthly USD:    price_1AAA...
Starter yearly USD:     price_1BBB...
Starter monthly AUD:    price_1CCC...
Starter yearly AUD:     price_1DDD...
Pro monthly USD:        price_1EEE...
Pro yearly USD:         price_1FFF...
[...]
```

Also save the Product IDs (`prod_...`) — useful for analytics and
the accounting integration.

## Step 6 — set up Coupons / Promo codes (if applicable)

If the operator runs promotions, create their core coupons now:

```
COUPONS
=======
- LAUNCH20   → 20% off first 3 months (repeating, 3) — onboarding
- ANNUAL50   → 50% off first invoice — yearly conversion push
- VIP10      → 10% off forever — manual application to VIP customers
- WELCOME    → $10 off first invoice — referral codes
```

## Step 7 — Tax behaviour reconciliation

Before declaring done, reconcile tax behaviour:

- If BUSINESS CONFIG says **Inclusive pricing** → confirm all
  Products created with tax_behavior = inclusive
- If **Exclusive** → confirm all created exclusive
- Mixing causes weird receipts and accounting headaches

If the operator changes their mind after creation, tax_behavior
can be edited per Price (Settings on each Price).

## Common mistakes to call out

- **Splitting "Pro plan" into 4 different Products for 4 currencies**
  → reporting becomes a mess; use 1 Product with 4 Prices
- **Creating a "Pro plan 2024 - FINAL" with a different name from
  the original** → ruins MRR continuity reporting; just create a
  new Price on the existing Product and archive the old Price
- **Embedding tax in the price name** ("Pro plan inc GST $99") →
  use tax_behavior=inclusive instead; the receipt handles tax
  display
- **Hard-coding currency to USD when most buyers are AU** → AU
  buyers see USD prices, convert mentally, abandon checkout. Add
  AUD Price.
- **Free product with trial as the "free tier"** → Stripe doesn't
  charge $0 well. For free tier, don't even use a Stripe Product —
  manage in your own system; only push to Stripe when they upgrade.
- **Setting up products in Test Mode and forgetting to recreate
  in Live** → Test Mode products don't exist in Live. Either
  recreate manually in Live, or use Stripe CLI to clone test→live.

## When to archive vs delete a Product

- **Archive** when you stop selling something but want historical
  reporting intact (subscriptions on the old Price continue)
- **Delete** never — Stripe doesn't really let you delete a Product
  with any historical payments; you can only archive

If a Product was created by mistake (typo, wrong currency, etc.)
and has zero payments against it, you can archive it cleanly. If
it has payments, archive and forget.

## Done condition

You're done with this skill when ALL of these are true:

- [ ] All products the operator sells exist in Stripe
- [ ] Each Product has at least one Price
- [ ] Multi-currency / interval / tier structure is clean (no
      duplicated Products where Prices would suffice)
- [ ] Tax behaviour is set consistently (inclusive OR exclusive
      across all)
- [ ] Price IDs are captured in conversation context for skill 03
- [ ] Coupons / promo codes are created (if applicable)
- [ ] The operator confirms the catalogue matches their intent

When done, say:

> *"Catalogue's ready. [N] products, [M] prices. Price IDs saved.
> Time to pick how customers actually pay."*

Load `03-payment-pages.md`.
