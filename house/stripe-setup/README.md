# Stripe Setup, end to end.

A complete Stripe-onboarding desk for your agent. Drop this bundle
into Claude (or any compatible agent), tell it what you sell, and it
walks you from a blank account to taking real payments — products,
payment pages, tax, refunds, customer portal — all handled.

## Who this is for

- A solo creator, freelancer, or small business
- You want to take payments online without hiring a developer
- You sell one of: one-off services, digital downloads, subscriptions,
  bookings, classes
- You're using a Stripe **Standard** account (the normal kind — not
  Connect / not a marketplace)

## What's in this bundle

```
stripe-setup/
├── README.md
├── SETUP.md                       ← 5-minute onboarding
├── MASTER_PROMPT.md               ← orchestrator system prompt
├── LISTING_COPY.md                ← internal: copy used for the listing
└── skills/
    ├── 01-account-setup.md        ← create account, identity, bank, payouts
    ├── 02-products-prices.md      ← products + prices (one-off + subs)
    ├── 03-payment-pages.md        ← Payment Links vs Checkout vs embedded
    ├── 04-webhooks-fulfillment.md ← order events, signature verification
    ├── 05-tax-refunds.md          ← Stripe Tax (GST/VAT/sales tax) + refunds
    └── 06-portal-reporting.md     ← Customer Portal + reporting basics
```

## What you end up with

- A live Stripe account that can receive money
- Products + prices that match what you actually sell
- A working payment page (link, hosted checkout, or embedded on your site)
- Tax configured for your country
- Refund + dispute workflow set up
- Customer Portal so subscribers can manage themselves (cancel, swap
  plan, update card) without emailing you
- Branded receipts going to buyers
- A clear monthly-reporting routine you can hand to your accountant

## Platforms it works on

- **Claude** (Claude Code, Claude.ai Projects)
- **OpenClaw**
- **ChatGPT** (Custom GPT / Project Knowledge)

## Support

Reply to your confirmation email or write to `creators@skillzy.ai`.
