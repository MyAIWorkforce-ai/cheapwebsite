# Publish — Stripe Setup, end to end.

Step-by-step to publish this bundle on skillzy.ai. Should take ~5 minutes.

## Before you start

- Sign in to skillzy.ai as the **Skillzy House** creator account
- Confirm Stripe Connect is done for that account
- Have this folder (`house/stripe-setup/`) downloaded locally so you
  can drag files into the form

## Step 1 — open /sell/new

`https://skillzy.ai/sell/new`

## Step 2 — drop in the files

Drag these 9 files into the file dropper:

**From `house/stripe-setup/`:**
- `README.md`
- `SETUP.md`
- `MASTER_PROMPT.md`

**From `house/stripe-setup/skills/`:**
- `01-account-setup.md`
- `02-products-prices.md`
- `03-payment-pages.md`
- `04-webhooks-fulfillment.md`
- `05-tax-refunds.md`
- `06-portal-reporting.md`

**DO NOT upload** `LISTING_COPY.md` (internal-only)
**DO NOT upload** this `PUBLISH.md`

## Step 3 — paste the listing copy

### Title
```
Stripe Setup, end to end.
```

### Tagline
```
From a blank Stripe account to your first paid customer. Products, payment pages, tax, refunds, customer portal — your agent walks every step in plain English.
```

### Description
```
A complete Stripe-onboarding desk dropped into your agent. The agent interviews you about what you sell, walks you through activating Stripe, sets up Products and Prices, picks the right payment surface (Payment Link, hosted Checkout, embedded, or invoices), wires webhooks for fulfillment, sets up tax (GST / VAT / sales tax), and configures the Customer Portal so subscribers manage themselves. By the end you've taken a real $1 from a real card and refunded it cleanly.

Built from how we set Stripe up live for clients. The agent never asks for your API keys — every action stays in your hands via the Stripe dashboard. It just removes the guessing.

Includes the bits most setup guides skip: branded statement descriptors so customers recognise the charge, dispute-evidence habits that win chargebacks, tax-inclusive vs exclusive pricing decisions, and a monthly reporting routine you can hand straight to your accountant.
```

### What you get (paste as bullets, one per line)
```
6 SKILL.md files covering account setup, products + prices, payment pages, webhooks, tax + refunds, customer portal + reporting
Master orchestrator prompt so the agent knows which step to run when
Real Stripe dashboard walk-throughs — no developer required
Three payment-surface paths (Payment Link, hosted Checkout, embedded) — agent picks the right one for your situation
Tax setup for Stripe Tax (automatic) OR manual rates — works for AU/NZ GST, EU VAT, US sales tax
Webhook integration patterns for Zapier / Make / n8n / custom endpoints — including the signature-verification code small teams usually get wrong
Dispute defence checklist that wins chargebacks
Monthly reporting routine + Xero/QuickBooks connection notes
```

## Step 4 — set the meta

- **Type**: Agent Setup
- **Niche**: Small Business
- **Platforms**: Claude, OpenClaw, ChatGPT
- **Price**: **$129**

## Step 5 — publish

Hit Publish. Listing should land on its detail page.

## Step 6 — smoke-test

In an incognito tab:
1. Open the listing as a buyer
2. Buy it with a real card (refund yourself after)
3. Confirm download email arrives
4. Click → confirm 9 files in the bundle
5. Drop into Claude and try: *"I sell coaching at $150 per session and want to take payments"* — agent should start at skill 01 (account setup)

## Done

The listing is live under @skillzy-house at $129.
