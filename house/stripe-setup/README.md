# Stripe Setup Agent, end to end.

A complete Stripe operator's desk for your agent. Drop this bundle
into Claude (or any compatible agent), brief it on your business,
and it walks the entire path from a blank account to a live
operation — products, payment pages, webhooks, tax, refunds,
disputes, subscriptions, marketplaces (Connect), accounting sync,
and the monthly reconciliation routine your accountant will actually
thank you for.

Built for solo founders, SaaS operators, agencies, consultants,
marketplaces, e-commerce stores, and small dev teams who want
Stripe set up properly the first time — not patched together over
six months of guesswork.

Works the same in Australia, New Zealand, the UK, the United States,
and Canada — the regional reference inside the bundle maps every
term (GST vs VAT vs sales tax, BAS vs MTD vs nexus, Xero AU vs Xero
US vs FreeAgent UK vs Wave CA, ABN vs EIN vs UK Company Number).

## The full loop

```
brief the agent ("I'm an AU SaaS doing $200k ARR")
   → account setup (KYC + verification + payouts)
   → catalogue (products + prices, multi-currency, recurring)
   → payment surface (Payment Link / Checkout / Embedded / Invoice)
   → fulfillment (webhooks + idempotency + retries)
   → tax (Stripe Tax + registrations + tax-inclusive vs exclusive)
   → subscriptions (trials, dunning, plan changes, churn rescue)
   → portal (self-serve cancel, swap, update card)
   → fraud + disputes (Radar rules, evidence packs)
   → accounting sync (Xero / MYOB / QuickBooks / FreeAgent / Wave)
   → monthly reconciliation (Stripe payouts → bank → books)
   → ongoing: review fees, plug leaks, ship payment methods buyers want
```

Maintains a running `learnings.md` so the agent gets sharper each
month — tracks fee leakage, which payment methods convert best by
region, where disputes are coming from, what's quietly dunning out
without rescue, and which products are absorbing the most refund
volume.

## What's in this bundle

```
stripe-setup/
├── README.md                          ← this file
├── SETUP.md                           ← 10-minute setup
├── MASTER_PROMPT.md                   ← orchestrator system prompt
├── LISTING_COPY.md                    ← internal: listing form copy
├── PUBLISH.md                         ← internal: how to publish
├── config/
│   ├── business-config-template.md    ← country, currency, tax reg, model
│   └── learnings-template.md          ← running operator learnings file
├── skills/
│   ├── 01-account-setup.md            ← signup, KYC, business verification
│   ├── 02-products-prices.md          ← one-off, recurring, metered, multi-ccy
│   ├── 03-payment-pages.md            ← Links, Checkout, Embedded, Mobile
│   ├── 04-webhooks-fulfillment.md     ← event handling, idempotency, retries
│   ├── 05-tax-refunds.md              ← Stripe Tax, GST/VAT/SUTS, refunds
│   ├── 06-portal-reporting.md         ← Customer Portal + reporting basics
│   ├── 07-connect-marketplaces.md     ← Connect Std/Express/Custom, app fees
│   ├── 08-subscriptions-recurring.md  ← cycles, trials, plan changes, dunning
│   ├── 09-fraud-disputes.md           ← Radar, dispute evidence, chargebacks
│   ├── 10-accounting-integration.md   ← Xero / MYOB / QBO / FreeAgent / Wave
│   ├── 11-payment-methods-by-region.md← local methods per region
│   └── 12-monthly-reconciliation.md   ← payout-to-bank, monthly close
├── templates/
│   ├── webhook-handler.md             ← event router + idempotency pattern
│   ├── refund-policy-text.md          ← legal copy by region
│   ├── customer-receipt-email.md      ← branded receipt copy variants
│   ├── dispute-response-pack.md       ← evidence checklist + cover letter
│   ├── monthly-recon-checklist.md     ← month-end Stripe close
│   ├── tax-invoice-template.md        ← GST AU/NZ, VAT UK/EU, GST CA, US
│   ├── subscription-comms-pack.md     ← welcome, trial-end, dunning, card-exp
│   └── connect-onboarding-email.md    ← for Connect platforms onboarding sellers
└── knowledge/
    └── regional-reference.md          ← AU / NZ / UK / US / CA detail
```

## How it works

1. **Drop it in your agent.** Claude, OpenClaw, ChatGPT, Gemini,
   Grok, n8n / Make / Zapier — drop the `stripe-setup/` folder into
   a project or knowledge base.
2. **Load the orchestrator.** Paste `MASTER_PROMPT.md` as the system
   prompt. It tells the agent which skill to load when.
3. **Fill the business config.** First run, the agent walks you
   through `config/business-config-template.md` — your country,
   currency, tax registration status, what you sell, your
   accounting tool, your payment-method appetite.
4. **Walk the path.** Skills run in sequence the first time
   (account → products → payment surface → fulfillment → tax →
   subscriptions / portal). After you're live, the agent jumps
   directly to whatever you need (refund, dispute, new product,
   sub change, monthly close).
5. **Monthly close.** End of every month, the agent walks the
   reconciliation: pull the Stripe payout report, match against
   bank, sync to Xero / MYOB / QBO / FreeAgent / Wave, log to
   `learnings.md`.

## What the buyer ends up with

- A **fully activated Stripe account** for their country —
  KYC done, payouts wired, statement descriptor branded, 2FA on
- A **clean catalogue** — Products + Prices that match what they
  actually sell, in the currencies their buyers actually use
- **A live payment surface** — Payment Link, hosted Checkout,
  embedded Payment Element, or Invoice — whichever fits
- **Webhooks delivering events** to Zapier / Make / n8n / a custom
  endpoint — with idempotency, retries, and signature verification
  done properly
- **Tax automated** — Stripe Tax with the right registrations, or
  manual rates if they're below threshold; tax invoices issued
  where the region requires them
- **Subscriptions running cleanly** — trials, plan changes (with
  proration), dunning rules, smart retries, churn rescue
- **Customer Portal live** — buyers manage their own cards, plans,
  cancellations; the operator stops handling cancel emails by hand
- **Radar tuned** — fraud rules set for the operator's risk
  appetite, alerts wired to Slack / email
- **Dispute defence ready** — evidence pack template, response
  process, win-rate tracking
- **Accounting synced** — Stripe → Xero / MYOB / QBO / FreeAgent /
  Wave, with the connector tuned so fees and refunds land in the
  right accounts
- **Monthly reconciliation routine** — a checklist + the workflow
  to close each month in <30 minutes

## Regions it works in

- **Australia** — GST 10%, ABN format, ATO BAS reporting,
  AUSTRAC thresholds, BPay via NPP add-ons, PayID / PayTo, Xero +
  MYOB integration, Apple Pay / Google Pay defaults
- **New Zealand** — GST 15%, NZBN, IRD reporting, account2account
  (POLi sunset), Xero NZ + MYOB integration
- **United Kingdom** — VAT 20% standard + reduced rates, MTD VAT,
  Open Banking via Stripe (GBP), BACS Direct Debit, FCA
  regulations, Xero UK + FreeAgent + Sage Cloud + QuickBooks UK
- **United States** — state-by-state sales tax with nexus tracking
  (Stripe Tax handles), ACH Direct Debit, cards + 3DS, 1099-K
  reporting thresholds, QuickBooks Online US + Xero US + Wave
- **Canada** — GST/HST/PST per province, Interac (limited via
  Stripe), CRA reporting, QuickBooks CA + Xero CA + Wave

The regional reference inside the bundle maps every term — you
don't need to teach the agent which country you're in beyond
filling out the business config.

## Agent platforms it runs on

- **Claude** (Claude Code, Claude Projects, Claude.ai with file uploads)
- **OpenClaw** (drop straight into the skills tab)
- **ChatGPT** (Custom GPT instructions / Project Knowledge)
- **Gemini / Grok** (paste skills as a system prompt + knowledge files)
- **n8n / Make / Zapier** (treat each SKILL as a prompt block)

## Support

Reply to your confirmation email or write to `creators@skillzy.ai`.
