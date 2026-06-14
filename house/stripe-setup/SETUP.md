# Setup — 5 minutes

You'll need these in hand before you start. The agent will pause and
ask if anything's missing.

## Before you start

1. **A Stripe account** — sign up free at `dashboard.stripe.com/register`
   if you don't have one. Use a business email, not personal.
2. **Business identity info** — for Stripe's KYC:
   - Legal business name (or your own if sole trader)
   - Business address
   - Tax/ABN/EIN number (if your country requires it)
   - A government ID (for identity verification — driver's licence
     usually works)
3. **A bank account** — for payouts. Personal account is fine if
   you're a sole trader; otherwise a business account.
4. **What you sell** — rough notes. One-off prices, subscriptions, or
   both. Even messy is fine — the agent will help you turn this into
   actual products in Stripe.

## Plus an agent platform

Pick one:

- **Claude.ai** (Pro plan recommended). Create a Project, upload the
  `stripe-setup/` folder, paste `MASTER_PROMPT.md` into the project
  instructions.
- **Claude Code** (terminal). `cd` into the `stripe-setup/` folder,
  run Claude Code in that directory.
- **OpenClaw** — upload the SKILL.md files into the Skills tab, paste
  `MASTER_PROMPT.md` into the instructions.
- **ChatGPT** — Custom GPT, upload all files via Knowledge, paste
  `MASTER_PROMPT.md` into the instructions.

## First conversation

Open with:

> *"I want to start taking payments. Here's what I sell: [...]"*

The agent starts with `01-account-setup.md` and walks you through
every step. You're never more than 1 reply away from "what's next?"

## What this bundle does NOT do

To stay honest about scope:

- **It does not give the agent direct API keys to your Stripe.** The
  agent guides you through the Stripe dashboard. You stay in control
  of every action that costs money or changes account state.
- **It does not handle Stripe Connect** (multi-seller marketplaces).
  That's a different product.
- **It does not write a custom checkout backend.** It uses Stripe's
  own hosted Payment Links / Checkout / Customer Portal. You'll be
  live without a single backend deploy.

That's it. Setup done.
