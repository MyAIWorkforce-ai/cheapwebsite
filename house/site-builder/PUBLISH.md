# Publish — Site + Stripe, end to end.

Step-by-step to publish this bundle on skillzy.ai. Should take ~5 minutes.

## Before you start

- Sign in to skillzy.ai as the **Skillzy House** creator account
- Confirm Stripe Connect is done for that account (Dashboard → Payouts
  should say "Connected")
- Have this folder (`house/site-builder/`) downloaded locally so you
  can drag files into the form

## Step 1 — open /sell/new

`https://skillzy.ai/sell/new`

## Step 2 — drop in the files

Drag these 14 files (everything in this folder + the skills/ subfolder)
into the file dropper. The AI will read them and pre-draft a listing:

**From `house/site-builder/`:**
- `README.md`
- `SETUP.md`
- `MASTER_PROMPT.md`

**From `house/site-builder/skills/`:**
- `01-discover.md`
- `02-scaffold-build.md`
- `03-deploy-vercel.md`
- `04-connect-domain.md`
- `05-seo.md`
- `06-stripe-account.md`
- `07-stripe-products.md`
- `08-stripe-checkout.md`
- `09-stripe-webhooks.md`
- `10-stripe-tax-refunds.md`
- `11-stripe-portal-reporting.md`
- `12-update.md`

**DO NOT upload** `LISTING_COPY.md` — it's internal-only.
**DO NOT upload** this `PUBLISH.md` either.

## Step 3 — paste the listing copy

The AI will draft from the file contents. Replace the AI's draft
with this polished copy from `LISTING_COPY.md`:

### Title
```
Site + Stripe, end to end.
```

### Tagline
```
Build it, deploy it, get found, get paid. Your agent ships a real website AND wires up Stripe payments — from scratch or onto your existing domain.
```

### Description (paste into the description box)
```
A complete website + payments desk, dropped into your agent. Interview, scaffold, deploy, connect domain, write SEO, wire up Stripe so the site actually takes money — all in one agent setup. The buyer goes from "I want to charge for my coaching" or "I want my plumbing business online with a quote form" to a real, deployed, payment-ready site in an afternoon.

Built on the stack we run for live clients: Next.js + Vercel + GitHub + Stripe. The agent doesn't just generate code; it guides every command, every Vercel click, every Stripe dashboard step, in plain English. A non-developer can ship this end to end.

Includes the prompts for AI-search ranking (llms.txt, structured data patterns Claude + ChatGPT + Perplexity actually read), the Stripe-side stuff most setup guides skip (branded statement descriptors, dispute-evidence habits, tax-inclusive vs exclusive decisions), and a monthly Stripe reporting routine the buyer can hand straight to their accountant.

If the buyer doesn't need payments (informational site, lead-gen page), the agent skips the Stripe steps cleanly. They can add them later just by saying "add Stripe".
```

### What you get (paste as bullets, one per line)
```
12 SKILL.md files: 5 for the site, 6 for Stripe (skippable for info-only sites), 1 for ongoing updates
Master orchestrator prompt that routes the agent through the right path
Real Next.js + Tailwind + Vercel stack — production-grade, free to deploy
Built-in support for AI search (llms.txt + structured-data templates) most builders ignore
Three payment-surface paths integrated with the site: Payment Link, hosted Checkout, embedded Payment Element — agent picks the right one
Stripe tax setup for AU/NZ GST, EU VAT, US sales tax — automated or manual
Dispute-defence checklist that wins chargebacks
Customer Portal so subscribers self-serve (cancel, swap plan, update card)
Monthly Stripe reporting routine + Xero/QuickBooks connection notes
Update skill is the standing-by mode — buyer comes back forever and just says "change X"
```

## Step 4 — set the meta

- **Type**: Agent Setup
- **Niche**: Small Business
- **Platforms**: tap **"All agents"** chip → Claude + OpenClaw + ChatGPT (the three this actually works on). Untick the others (Manus, Hermes, etc.) since this bundle is tested on Claude / OpenClaw / ChatGPT only.
- **Price**: **$199**

## Step 5 — publish

Hit Publish. You should land on the listing detail page reading
**Site + Stripe, end to end.** under @skillzy-house, $199, Agent Setup.

## Step 6 — smoke-test it works

In a separate tab (incognito):
1. Open the listing as a buyer
2. Buy it with a real card (you'll refund yourself after)
3. Check the buyer email arrives with the download link
4. Click the download → confirm all 14 files are in the bundle
5. Drop them into Claude and try the orchestrator with: *"I want a landing page for a fictional bakery"*
6. The agent should start with discovery (skill 01) and route correctly

If anything fails, refund yourself in Stripe and ping the relevant
fix into the bundle, then re-publish.

## Done

The listing is live. Buyers can find it via:
- The marketplace
- `/marketplace/site-stripe-end-to-end` (or whatever slug it gets)
- The @skillzy-house creator profile
