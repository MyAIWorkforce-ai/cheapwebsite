# Setup — 10 minutes

You'll need these in hand before you start. The agent will pause
and ask if anything's missing, but pulling them together up front
makes the run smoother.

## Before you start

### 1. A Stripe account (or be ready to create one)

Sign up free at `dashboard.stripe.com/register` if you don't have
one. Use a business email, not personal. The agent will walk you
through activation either way.

If you already have an account: log in, take a screenshot of the
Home dashboard so the agent knows what state you're in (live vs
test, activated vs pending, payouts wired or not).

### 2. Business identity info

Stripe needs this for KYC / verification. Have it ready:

- **Legal business name** (or your own legal name if sole trader /
  sole proprietor)
- **Business address** (registered address — not the PO box)
- **Tax / business number** — varies by country:
  - AU: ABN (11 digits)
  - NZ: NZBN (13 digits) + GST number if registered
  - UK: Company number (Companies House) + VAT number if registered
  - US: EIN (or SSN if sole proprietor)
  - CA: BN (Business Number, 9 digits)
- **Government ID** — for identity verification on the account
  representative (driver's licence usually works; passport for
  cross-border)
- **Business representative DOB + home address** — Stripe asks
- **For companies** — director / beneficial owner details
  (>25% ownership)

### 3. A bank account for payouts

Personal account is fine if you're a sole trader / proprietor;
otherwise a business account.

- AU: BSB + account number
- NZ: NZ bank account number
- UK: sort code + account number
- US: routing + account number (ACH-capable)
- CA: institution + transit + account number

### 4. What you sell — rough notes

Bullet points are fine. Don't worry about format. The agent helps
you clean it up.

For each thing you sell:
- What it is (one line)
- The price (and currency)
- Is it one-off, recurring (monthly/annual), or usage-based?
- Roughly who buys it (consumers, businesses, both)
- Do they need an invoice (B2B) or just a receipt (B2C)?

### 5. (If relevant) Your existing website / stack

If you have a website where the Buy button will go:
- Platform (Next.js, WordPress, Squarespace, Shopify, Webflow, Wix,
  custom, just-a-link)
- Where it's deployed (Vercel, Netlify, your own server, hosted)
- Domain name

If you don't have a website: Payment Links are your friend. The
agent will route you there.

### 6. (If relevant) Your accounting tool

Tell the agent which you use — it preps the right connector:
- Xero (AU / NZ / UK / US / CA)
- MYOB (AU)
- QuickBooks Online (US / UK / CA / AU global)
- FreeAgent (UK)
- Sage Cloud (UK / global)
- Wave (CA / US — free tier)
- KashFlow (UK)
- FreshBooks (global)
- None / spreadsheet — the agent will set up a basic close routine

## Plus an agent platform

Pick one:

- **Claude.ai** (Pro plan recommended). Create a Project, upload
  the `stripe-setup/` folder, paste `MASTER_PROMPT.md` into the
  project instructions.
- **Claude Code** (terminal). `cd` into the `stripe-setup/`
  folder, run Claude Code there.
- **OpenClaw**. Upload the SKILL files into the Skills tab. Paste
  `MASTER_PROMPT.md` into the instructions.
- **ChatGPT**. Custom GPT — upload all files via Knowledge, paste
  `MASTER_PROMPT.md` into the instructions.
- **Gemini / Grok**. Paste `MASTER_PROMPT.md` plus the relevant
  skill files into a long context window. Works best for one-shot
  questions rather than the whole loop.

## First conversation

Open with one of these:

> *"I'm in [country]. I sell [thing] at [price]. Help me take payments."*

> *"I'm migrating from PayPal to Stripe. Here's my current setup..."*

> *"I have a Stripe account but it's a mess — can you audit and fix it?"*

> *"I run a marketplace in [country]. I need Connect set up properly."*

> *"I'm an [AU/NZ/UK/US/CA] SaaS doing $[X]/mo recurring. Wire me up
> properly with dunning and [Xero/QBO/MYOB/FreeAgent/Wave] sync."*

The agent reads the BUSINESS CONFIG (or asks you to fill it in if
this is your first run), then routes to the right skill based on
where you are in the journey.

## What this bundle does NOT do

To stay honest about scope:

- **It does not give the agent your Stripe API keys by default.**
  Most actions are walked through the dashboard — you stay in
  control. Where API keys are needed (custom webhook endpoint,
  Connect platform, scheduled exports), the agent asks for
  **Restricted Keys** with minimum scopes, not your full secret key.
- **It does not write a custom checkout backend from scratch.** It
  uses Stripe's hosted Payment Links / Checkout / Customer Portal,
  and the embedded Payment Element where you need brand control.
  For deeper custom integrations (Treasury, Issuing, Climate, Atlas
  company formation), the agent flags them and points to Stripe docs.
- **It does not give legal or tax advice.** It walks you through
  the standard Stripe + accounting setup for your region. For
  edge cases (cross-border sales over VAT registration threshold,
  complex Connect tax in marketplaces, US nexus disputes) you still
  want a professional accountant in the loop. The agent helps you
  prep for them.
- **It does not handle pre-Stripe-existence chargebacks.** If you
  had disputes on a previous PSP, those don't migrate. The agent
  helps prevent and defend new ones.

That's it. Setup done. Open the agent and start.
