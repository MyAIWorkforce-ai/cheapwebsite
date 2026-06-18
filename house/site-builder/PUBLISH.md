# Publish — Website Builder, end to end.

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
Website Builder, end to end.
```

### Tagline
```
Build it, deploy it, get found — and take Stripe payments if you sell something. Your agent ships the full thing, then keeps shipping changes after launch.
```

### Description (paste into the description box)
```
A complete website desk, dropped into your agent. Interview, scaffold, write the actual copy, deploy through Vercel, wire the custom domain, set the SEO for Google and AI search — your buyer goes from blank page to a live website at their own domain in an afternoon. Built on the stack we run for live clients: Next.js + Tailwind + GitHub + Vercel. The agent doesn't just generate code; it guides every command, every Vercel click, every DNS record, in plain English. A non-developer can ship this end to end.

If the buyer needs to take payments (coaches charging for sessions, plumbers taking deposits, anyone selling a digital product or subscription), the same agent walks them through activating Stripe, setting up Products and Prices, wiring the payment surface directly into the site, handling tax + refunds + the Customer Portal. They go from "I want a site that takes money" to a real $1 test charge succeeding by end of day.

If the buyer doesn't need payments (informational site, lead-gen page, portfolio), the agent skips the Stripe steps cleanly. They can add them later — just say "add Stripe" and the agent picks up where it left off.

Includes the bits most builders skip: AI-search readiness (llms.txt, structured data Claude + ChatGPT + Perplexity actually read), branded statement descriptors on Stripe charges, dispute-evidence habits that win chargebacks, tax-inclusive vs exclusive pricing decisions, and a monthly reporting routine the buyer can hand straight to their accountant. Then it stays on standby — every later change ships with a single sentence like "make the headline say X".
```

### What you get (paste as bullets, one per line)
```
A real Next.js + Tailwind website on GitHub, deployed to Vercel, at the buyer's own domain
12 SKILL.md files: discovery, scaffold, deploy, domain, SEO, plus 6 Stripe skills (skippable for info-only sites) and a standing-by update skill
Master orchestrator prompt that routes the agent through the right path based on whether payments are needed
Built-in support for AI search (llms.txt + structured-data templates Claude / ChatGPT / Perplexity actually read) — most builders skip this entirely
Three Stripe payment-surface paths integrated with the site: Payment Link, hosted Checkout, embedded Payment Element — agent picks the right one for the use case
Stripe tax setup for AU/NZ GST, EU VAT, US sales tax — automated or manual
Dispute-defence checklist that wins chargebacks
Customer Portal so subscribers self-serve (cancel, swap plan, update card)
Monthly Stripe reporting routine + Xero/QuickBooks connection notes
Update skill is the standing-by mode — the buyer comes back forever and just says "change X"
Real Next.js + Vercel stack — production-grade, free to deploy
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
