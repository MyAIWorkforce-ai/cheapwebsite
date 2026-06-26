# Bookkeeper Agent, end to end.

A complete bookkeeping firm's desk for your agent. Drop this bundle
into the agent you already use, brief it on your firm, and it runs
the whole desk: new client intake + engagement letters, one-off and
monthly fixed-fee quoting, weekly workflow + monthly close cadence,
BAS / VAT / sales-tax lodgement, firm billing + recurring direct
debit, software stack setup (Xero / QuickBooks / MYOB / Sage / Hubdoc
/ Dext / Karbon / Ignition), deadline-rescue triage, monthly close
rhythm, referral cultivation, post-BAS review nudges, and a Friday
WIP + receivables report. From the first email from a tradie with a
shoebox of receipts to the EOY meeting twelve months later — one
agent, every step.

Built for solo bookkeepers, BAS agents, contract CFOs, and small
firms (1-15 staff) who want to stop drowning in source-doc chase
emails and Karbon ticks, and get back to the work that pays
($800-$2,500/mo recurring engagements, EOY clean-ups, advisory).
Works the same in Australia, New Zealand, the UK, the US, and
Canada — the regional reference inside the bundle maps every
framework (BAS vs VAT vs MTD vs sales tax, TPB vs HMRC vs IRS vs
CRA, AS 1140 vs GAAP vs IFRS for SME, super vs auto-enrolment vs
401(k), STP Phase 2 vs RTI vs W-2/1099 vs T4).

## The full loop

```
new prospect emails ("I'm 14 months behind on BAS, can you help?")
   → intake (qualify: catch-up / monthly / EOY / payroll / advisory)
   → AML/CTF + source-of-funds check + engagement letter via Ignition
   → quote (one-off catch-up OR tiered monthly package)
   → tech stack setup (Xero / QBO subscription + Hubdoc + bank feeds)
   → weekly workflow (source docs chased → coded → reconciled)
   → monthly close (week 1 close, week 2 review, week 3-4 BAS prep)
   → BAS / VAT / sales-tax lodged with regulator
   → invoice (fixed-fee recurring via direct debit) + receivables chase
   → post-lodgement review nudge + value extension conversation
   → end of week: WIP, capacity, receivables aging, client health
```

Maintains a running `learnings.md` so the agent gets sharper each
week — tracks which client tiers win on margin (A clients on full
package vs C clients on compliance-only), which industries actually
send source docs on time (trades, eComm, hospitality patterns),
where you're losing recoverable hours (manual data entry that
Hubdoc would kill), which referral partners (accountants, financial
planners, business coaches) actually convert, and which lodgement
deadlines are creeping up.

## What's in this bundle

```
bookkeeper-agent/
├── README.md                       ← this file
├── SETUP.md                        ← 15-minute setup
├── MASTER_PROMPT.md                ← orchestrator system prompt
├── LISTING_COPY.md                 ← internal: copy used for the listing
├── PUBLISH.md                      ← internal: how to publish
├── config/
│   ├── business-config-template.md ← jurisdictions, software stack, services, rates, registrations
│   └── learnings-template.md       ← running learnings file
├── skills/
│   ├── 01-intake.md                ← qualify the prospect: catch-up / monthly / payroll / advisory / decline
│   ├── 02-quote-callout.md         ← one-off job quote: catch-up, EOY clean-up, BAS-only, audit support
│   ├── 03-quote-project.md         ← monthly fixed-fee package quote (tiered, value-priced)
│   ├── 04-dispatch.md              ← weekly workflow + job allocation + monthly close calendar
│   ├── 05-compliance.md            ← BAS/VAT/MTD/sales-tax lodgement, TPB / HMRC AML, ATO / IRS letters
│   ├── 06-invoice-payment.md       ← firm billing, fixed-fee + value pricing, direct debit via GoCardless/Stripe
│   ├── 07-supplier-ordering.md     ← client tech stack: Xero/QBO subs, Hubdoc, Dext, A2X, integrations
│   ├── 08-emergency-247.md         ← deadline rescue: ATO penalty notice, missed BAS, audit, payroll emergency
│   ├── 09-recurring-maintenance.md ← monthly close + quarterly BAS + EOY rhythm (THE recurring spine)
│   ├── 10-leadgen-local-seo.md     ← referral cultivation from accountants, GBP, ICB/IPA directory
│   ├── 11-followup-reviews.md      ← post-BAS / post-EOY review request, annual review, value extension
│   └── 12-weekly-report.md         ← firm WIP, capacity, receivables aging, client health dashboard
├── templates/
│   ├── callout-quote.md            ← one-off scope (catch-up / EOY / BAS-only)
│   ├── project-quote.md            ← monthly tiered package with scope + exclusions
│   ├── invoice.md                  ← fixed-fee + value-pricing + recurring direct debit
│   ├── compliance-certificate.md   ← engagement letter + BAS cover letter + audit pack
│   ├── email-pack.md               ← receipt chase, BAS review, payment chase, EOY checklist
│   ├── sms-pack.md                 ← short nudges (receipt missing, BAS due, doc needed)
│   ├── review-request.md
│   └── maintenance-contract.md     ← monthly bookkeeping engagement / fixed-fee package
└── knowledge/
    └── regional-reference.md       ← AU / NZ / UK / US / CA bookkeeping + tax specifics
```

## How it works

1. **Drop it in your agent.** Claude, OpenClaw, ChatGPT, Gemini,
   Grok — drop the `bookkeeper-agent/` folder into a project or
   knowledge base.
2. **Load the orchestrator.** Paste `MASTER_PROMPT.md` as the system
   prompt. It tells the agent which skill to use when.
3. **Fill the business config.** First run, the agent walks you
   through `config/business-config-template.md` — your jurisdictions,
   software stack (Xero / QBO / MYOB / Sage / Karbon / Ignition),
   service tiers, rates, BAS-agent or AML registration number,
   capacity, banned phrases.
4. **Forward your inbox.** Set up email forwarding from your firm
   address (hello@yourfirm.com.au, work@, accounts@) and from each
   client's "scan to bookkeeper" Hubdoc/Dext inbox so the agent sees
   inbound docs + lodgement letters. Or just paste the messages in
   as they come.
5. **Run the desk.** Every email / prospect / source-doc chase /
   BAS deadline: agent qualifies → engages → quotes → onboards →
   chases docs → closes → lodges → invoices → reviews. Weekly:
   report. Monthly: close rhythm. Quarterly: BAS / VAT.

## What the buyer ends up with

- A locked **firm config** (jurisdictions, software stack, service
  tiers + price points, BAS-agent registration / TPB / HMRC AML,
  capacity, banned phrases, customer comms cadence)
- **Same-day prospect quotes** — one-off (catch-up, EOY clean-up,
  BAS-only) or recurring monthly package quotes, with three tiered
  options the prospect picks from
- **Engagement letters** automatically scoped against the agreed
  tier — what's in, what's out, what triggers a scope variation
- **Tech stack onboarding scripts** — Xero / QBO subscription via
  partner discount, Hubdoc setup, Dext rules, bank feeds, A2X for
  Shopify clients, payroll software, Ignition for engagement +
  billing
- **A weekly workflow rhythm** — Monday source-doc sweep, Tuesday-
  Wednesday coding + reconciling, Thursday review, Friday WIP
- **A monthly close calendar** — week 1 close, week 2 partner
  review, week 3-4 BAS prep — that the agent runs same days every
  month
- **BAS / VAT / sales-tax preparation packs** — bank rec sign-off,
  GST coding review, payroll / STP / PAYE reconciliation, accrual
  adjustments — ready for partner sign-off and lodgement
- **Receivables velocity** — auto-reminders, fortnightly receivables
  review, "your bookkeeper bill is 60 days late" awkwardness
  handled with a script instead of avoidance
- **Deadline-rescue triage** — ATO penalty notice, missed BAS, ATO
  audit, payroll emergency (terminated employee, missed STP),
  client just sent a letter they don't understand
- **Referral partner cultivation** — accountant referral cadence,
  financial planner outreach, business-coach reciprocal referrals,
  ICB / IPA / AAT / NACPB directory presence
- **Post-BAS / EOY review nudges** — Google reviews, internal NPS,
  annual review meeting to set the next year's plan + extension
  conversation (advisory, CFO-lite, fractional)
- A **weekly firm report** of WIP by client, hours by partner /
  staff, receivables aging, capacity vs commitments, BAS calendar
  for the next 90 days, and what to fix next week

## Regions it works in

- **Australia** — BAS quarterly (or monthly if turnover >$20m),
  TPB-registered BAS agent required to lodge for fee under the Tax
  Agent Services Act 2009, GST 10% threshold $75k turnover, PAYG
  withholding, Single Touch Payroll Phase 2, SuperStream, FBT
  March year-end, CGT events, ATO portal, ICB Australia + IPA
  membership patterns, AML/CTF Tranche 2 expansion, 7-year
  recordkeeping
- **New Zealand** — GST returns 2-monthly or 6-monthly, IRD, PAYE
  + KiwiSaver + ACC, FBT quarterly, NZICA / CAANZ standards, ICB
  NZ membership, AML/CFT for bookkeepers extending
- **United Kingdom** — VAT quarterly (most), Making Tax Digital
  mandatory + MTD ITSA from April 2026, HMRC, PAYE + NI +
  Auto-Enrolment Pension, Corporation Tax CT600, Self Assessment
  SA100, Companies House filings, AAT / ICB / IAB / ACCA
  membership, AML supervision by HMRC or professional body
- **United States** — Sales tax varies by state (Stripe Tax /
  TaxJar / Avalara automation), no federal VAT/GST, Quarterly
  estimated tax, payroll tax + FICA + state UI, Form 941
  quarterly, W-2 annual, 1099-NEC for contractors >$600, 1099-K
  thresholds, QuickBooks-dominant, AICPA / NACPB / AIPB for
  bookkeepers
- **Canada** — GST/HST/PST (5% GST federal, 13% HST ON, 15% HST
  Atlantic, separate PST in SK + MB + BC + QC), CRA, T4 + T5 +
  T4A annual slips, T2 corporate, CPB Canada, QuickBooks Online
  Canada or Xero CA, payroll source deductions + EI + CPP + WSIB

The regional reference inside the bundle maps every framework —
you don't need to teach the agent which country you're in beyond
filling out the business config.

## Agent platforms it runs on

- **Claude** (Claude Code, Claude Projects, Claude.ai with file
  uploads)
- **OpenClaw** (drop straight into skills tab)
- **ChatGPT** (paste into Custom GPT instructions / Project files)
- **Gemini / Grok** (paste skills as a system prompt + knowledge
  files)
- **n8n / Make / Zapier** (advanced — treat each SKILL as a prompt
  block; Karbon / Ignition / Xero webhook-driven flows work
  particularly well here)

## Why this bundle exists

Bookkeepers are detail-obsessed and time-poor. The recurring spine
of the business (monthly close + quarterly BAS / VAT) eats 80% of
the hours, and the high-margin advisory work (annual reviews, cash
flow, EOY planning, CFO-lite) gets squeezed out because there's
never time. That's the trap.

The agent picks up the workflow plumbing: source-doc chases,
deadline calendar, receivables nudges, weekly WIP, engagement-letter
boilerplate, BAS / VAT cover letters, post-lodgement client comms.
You get the hours back for the work clients actually pay you for —
the judgment work no agent can do (yet): coding ambiguous
transactions, GST treatment edge cases, payroll edge cases,
advisory conversations.

One retained $1,800/mo client pays for this bundle 8× in year one.

## Support

Reply to your confirmation email or write to `creators@skillzy.ai`.
