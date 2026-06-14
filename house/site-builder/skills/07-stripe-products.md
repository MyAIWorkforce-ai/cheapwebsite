---
name: stripe-products-prices
description: Translate what the user actually sells into Stripe Products + Prices — handles one-off, subscription, multi-currency, and "pay what you want" patterns.
allowed_platforms: [claude, openclaw, chatgpt]
tools: []
---

# Products + prices

## Your job

Take a messy "here's what I sell" from the user and produce clean
Stripe Products + Prices that the next skill can wire into a payment
page.

## Step 1 — capture what they sell

Ask one question first:

> *"Walk me through what you sell. Just the names and prices — bullet
> points are fine. Don't worry about format."*

If they list anything ambiguous, ask the clarifying question:
- "Is this one-off or recurring?"
- "Which currency are you charging in?"
- "Same price for everyone, or does it vary?"

## Step 2 — design the Product / Price split

Stripe's model:

- **Product** = the thing being sold (e.g., "Coaching session", "Site
  Builder Agent Setup", "Monthly Membership")
- **Price** = the actual amount in a currency, attached to a Product.
  A single Product can have multiple Prices (USD/AUD, monthly/annual,
  bulk-discount tiers).

Apply these rules:
- One **Product** per real thing the user sells. Don't split a
  Product per currency.
- One **Price** per (currency × billing-frequency × tier) combination.
  Examples:
  - "Coaching session $150 AUD one-off" → 1 Product, 1 Price.
  - "Membership $19/mo USD OR $190/yr USD" → 1 Product, 2 Prices.
  - "Course $99 AUD one-off OR pay-what-you-want minimum $20" →
    1 Product, 2 Prices (the second uses Custom Pricing).

Show your proposed structure back to the user before creating
anything:

```
PROPOSED PRODUCTS
=================
1. Coaching session
   - $150 AUD · one-off
2. Monthly Membership
   - $19 USD · monthly
   - $190 USD · yearly (2 months free)
```

Wait for *"yes, looks right"* before continuing.

## Step 3 — create in Stripe

Walk them through the dashboard:

1. **Products → Add product**
2. Fill in:
   - **Name** (exact, as it appears on receipts)
   - **Description** (1-2 sentences — shows on Checkout)
   - **Image** (square logo or product shot — optional but improves
     conversion)
3. **Pricing**
   - Standard pricing → enter amount + currency
   - For subscriptions: select "Recurring" → pick interval
4. **Save**

Repeat for each Product. For multi-Price Products, after creating
the Product, scroll down to "More pricing options" → "Add another
price".

## Step 4 — common patterns

If the user's case is one of these, mention it specifically:

### Pay-what-you-want
Stripe supports this via **Customer chooses price** in Payment Links
and Checkout. Set a minimum price ($1 minimum). Useful for tip jars,
donations, support tiers.

### Quantity-based
Selling 1-of-many of the same thing? Don't create N copies. Set the
Product up once, then enable "Customer can adjust quantity" on the
Checkout / Payment Link in the next skill.

### Free trial on subscriptions
Edit the Price → Trial period → set in days. Customer card is still
captured but not charged until trial ends.

### Multi-currency for the same Product
Add multiple Prices (one per currency). On Checkout, Stripe shows the
buyer's local currency automatically when the price exists.

### Bulk / tiered pricing
Edit Price → Pricing model → Tiered. Useful for SaaS, agency retainers
("first 10 users free, then $5 each up to 50, then $2 each").

## Step 5 — note the Price IDs

After creating each Price, copy the Price ID (looks like
`price_1ABC...`). These are what the next skill plugs into Payment
Links / Checkout. Save them in conversation context as:

```
PRICE_IDS
=========
Coaching session (one-off):   price_1ABC...
Monthly Membership:           price_1DEF...
Yearly Membership:            price_1GHI...
```

## Done condition

- All products the user sells exist in Stripe
- Each has at least one Price
- The user has confirmed each Price ID corresponds to the right thing
- You've captured Price IDs in conversation context

When done, say: *"Catalogue's ready. Time to pick how customers pay."*
and load `08-stripe-checkout.md`.
