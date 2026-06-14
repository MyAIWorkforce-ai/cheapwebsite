# Site + Stripe, end to end.

A complete website + payments desk for your agent. Drop this bundle
into Claude (or any compatible agent), tell it what you want to build,
and it walks you from a blank page to a deployed, domain-pointed,
SEO-ready site — and wires up Stripe so it actually takes money.

## What's in this bundle

```
site-builder/
├── README.md                       ← this file
├── SETUP.md                        ← buyer onboarding (5-minute setup)
├── MASTER_PROMPT.md                ← orchestrator system prompt
├── LISTING_COPY.md                 ← internal: copy used for the listing
└── skills/
    ├── 01-discover.md              ← interview the buyer (includes payments)
    ├── 02-scaffold-build.md        ← create + write the site
    ├── 03-deploy-vercel.md         ← push to GitHub + Vercel
    ├── 04-connect-domain.md        ← wire up a custom domain
    ├── 05-seo.md                   ← classic + AI search SEO
    │
    ├── 06-stripe-account.md        ← Stripe account + payouts
    ├── 07-stripe-products.md       ← Products + Prices
    ├── 08-stripe-checkout.md       ← Payment page integrated with the site
    ├── 09-stripe-webhooks.md       ← order events / fulfillment (optional)
    ├── 10-stripe-tax-refunds.md    ← Stripe Tax + refund workflow
    ├── 11-stripe-portal-reporting.md ← Customer Portal + monthly reports
    │
    └── 12-update.md                ← receive change requests + ship them
```

## How it works

1. **Drop it in your agent.** Put the `site-builder/` folder into your
   agent's skills folder (or paste the SKILL.md files into Claude's
   project knowledge / OpenClaw's skills tab).
2. **Load the orchestrator.** Paste `MASTER_PROMPT.md` as the system
   prompt or instructions. It tells the agent which skill to use when.
3. **Say what you want.** *"I need a one-page site for my plumbing
   business at acmeplumbing.com.au — strong booking CTA, gallery,
   suburbs we cover."* Or: *"A landing page for my coaching practice
   that takes $150 session bookings."*
4. **The agent runs the desk.** It asks the right questions
   (including whether you want payments), scaffolds the project,
   writes the content, walks you through deploy, wires the domain,
   sets SEO + AI-readable markers, configures Stripe if needed, and
   is then on standby for changes.

## What the buyer ends up with

- A real Next.js (or HTML) site on GitHub, deployed to Vercel
- Custom domain wired (with DNS instructions if needed)
- Full SEO setup: sitemap, robots.txt, meta tags, OG / Twitter cards,
  JSON-LD structured data
- AI search readiness: `llms.txt`, structured content patterns Claude
  + ChatGPT search agents read first
- **(If payments needed)** A live Stripe account, products + prices
  configured, a working payment page integrated into the site, tax
  handled, refund + dispute workflow set up, Customer Portal for
  subscribers, monthly reporting routine
- A working orchestrator the agent uses to ship every later change
  without re-explaining

## Skipping Stripe (informational sites)

If you don't need payments — answer "no" on the payments question in
discovery. The agent skips skills 06–11 cleanly and goes straight to
the update skill once the site's live. You can add Stripe later by
saying *"add Stripe"* and the agent picks up at 06.

## Platforms it works on

- **Claude** (Claude Code, Claude Projects, Claude.ai with file uploads)
- **OpenClaw** (drop straight into skills tab)
- **ChatGPT** (paste into Custom GPT instructions / Project files)
- **n8n / Make** (more advanced; treat each SKILL as a prompt block)

## Support

Reply to your confirmation email or write to `creators@skillzy.ai`.
