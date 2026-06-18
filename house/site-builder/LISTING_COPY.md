# Listing copy — paste into /sell/new

Internal: this file isn't shipped to buyers. It's the copy bank for
the Skillzy listing form.

## Title
Website Builder, end to end.

## Tagline
Build it, deploy it, get found — and take Stripe payments if you sell something. Your agent ships the full thing, then keeps shipping changes after launch.

## Type
Agent Setup

## Niche
Small Business

## Platforms (works with)
Claude, OpenClaw, ChatGPT

## Price
$199 (USD)

## Description (paragraphs)

A complete website desk, dropped into your agent. Interview, scaffold, write the actual copy, deploy through Vercel, wire the custom domain, set the SEO for Google and AI search — your buyer goes from blank page to a live website at their own domain in an afternoon. Built on the stack we run for live clients: Next.js + Tailwind + GitHub + Vercel. The agent doesn't just generate code; it guides every command, every Vercel click, every DNS record, in plain English. A non-developer can ship this end to end.

If the buyer needs to take payments (coaches charging for sessions, plumbers taking deposits, anyone selling a digital product or subscription), the same agent walks them through activating Stripe, setting up Products and Prices, wiring the payment surface directly into the site, handling tax + refunds + the Customer Portal. They go from "I want a site that takes money" to a real $1 test charge succeeding by end of day.

If the buyer doesn't need payments (informational site, lead-gen page, portfolio), the agent skips the Stripe steps cleanly. They can add them later — just say *"add Stripe"* and the agent picks up where it left off.

Includes the bits most builders skip: AI-search readiness (`llms.txt`, structured data Claude + ChatGPT + Perplexity actually read), branded statement descriptors on Stripe charges, dispute-evidence habits that win chargebacks, tax-inclusive vs exclusive pricing decisions, and a monthly reporting routine the buyer can hand straight to their accountant. Then it stays on standby — every later change ships with a single sentence like *"make the headline say X"*.

## What you get (bullets)

- A real Next.js + Tailwind website on GitHub, deployed to Vercel, at the buyer's own domain
- 12 SKILL.md files: discovery, scaffold, deploy, domain, SEO, plus 6 Stripe skills (skippable for info-only sites) and a standing-by update skill
- Master orchestrator prompt that routes the agent through the right path based on whether payments are needed
- Built-in support for AI search (`llms.txt` + structured-data templates Claude / ChatGPT / Perplexity actually read) — most builders skip this entirely
- Three Stripe payment-surface paths integrated with the site: Payment Link, hosted Checkout, embedded Payment Element — agent picks the right one for the use case
- Stripe tax setup for AU/NZ GST, EU VAT, US sales tax — automated or manual
- Dispute-defence checklist that wins chargebacks
- Customer Portal so subscribers self-serve (cancel, swap plan, update card)
- Monthly Stripe reporting routine + Xero/QuickBooks connection notes
- Update skill is the standing-by mode — the buyer comes back forever and just says "change X" and the agent ships it
- Real Next.js + Vercel stack — production-grade, free to deploy

## Files to upload at /sell/new

Upload these 15 files from the `house/site-builder/` folder (or unzip
`_bundles/site-builder.zip` and drag the lot):

1. `README.md`
2. `SETUP.md`
3. `MASTER_PROMPT.md`
4. `skills/01-discover.md`
5. `skills/02-scaffold-build.md`
6. `skills/03-deploy-vercel.md`
7. `skills/04-connect-domain.md`
8. `skills/05-seo.md`
9. `skills/06-stripe-account.md`
10. `skills/07-stripe-products.md`
11. `skills/08-stripe-checkout.md`
12. `skills/09-stripe-webhooks.md`
13. `skills/10-stripe-tax-refunds.md`
14. `skills/11-stripe-portal-reporting.md`
15. `skills/12-update.md`

(Don't upload this LISTING_COPY.md or PUBLISH.md — internal only.)

## Suggested handle / creator

`@skillzy-house` — same as the other two house listings.
