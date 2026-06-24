# Plumber Agent, end to end.

A complete trades desk for your plumbing business. Drop this bundle
into the agent you already use, brief it on your business, and it runs
the whole desk: intake, quoting, dispatch, compliance certificates,
invoicing, follow-ups, supplier ordering, after-hours triage, weekly
reports. From the first text from a homeowner with a burst pipe to the
review request after the job — one agent, every step.

Built for solo plumbers, small plumbing firms, gas fitters, and
drainage crews who want to spend more time on the tools and less in
front of a screen. Works the same in Australia, New Zealand, the UK,
the US, and Canada — the regional reference inside the bundle maps
every term (Compliance Certificate vs WRAS vs Permit/Inspection, GST
vs VAT, AS/NZS 3500 vs UPC vs CSA B125, gas Type A vs Gas Safe).

## The full loop

```
text / call / form arrives ("blocked toilet, sewage backing up")
   → intake (qualify: emergency / quote / service / new build / gas)
   → quote (callout or project, with parts + labour)
   → dispatch (calendar + route)
   → on-the-job (compliance check + photos + parts list)
   → invoice (with payment link)
   → compliance certificate (plumbing + gas if applicable)
   → follow-up (1 day) + review request (3 days)
   → end of week: report + learnings update
```

Maintains a running `learnings.md` so the agent gets sharper each week
— tracks which job types win on margin (hot water swaps vs blocked
drains), which suburbs have the shortest drive times, which customer
types convert at quote stage, what your after-hours conversion looks
like, and which suppliers consistently stock-out on cartridges.

## What's in this bundle

```
plumber-agent/
├── README.md                       ← this file
├── SETUP.md                        ← 10-minute setup
├── MASTER_PROMPT.md                ← orchestrator system prompt
├── LISTING_COPY.md                 ← internal: copy used for the listing
├── PUBLISH.md                      ← internal: how to publish
├── config/
│   ├── business-config-template.md ← rates, service area, ABN/VAT, gas ticket
│   └── learnings-template.md       ← running learnings file
├── skills/
│   ├── 01-intake.md                ← qualify the lead: burst pipe? blocked? hot water?
│   ├── 02-quote-callout.md         ← instant callout quote with breakdown
│   ├── 03-quote-project.md         ← bathroom renos, hot water replacements, new builds
│   ├── 04-dispatch.md              ← schedule + route optimisation
│   ├── 05-compliance.md            ← Compliance Cert / Gas Type A / WRAS / Permit
│   ├── 06-invoice-payment.md       ← invoice + Stripe/Square payment link
│   ├── 07-supplier-ordering.md     ← parts from Reece, Tradelink, Wolseley, Ferguson
│   ├── 08-emergency-247.md         ← burst pipe / sewage / no hot water in winter
│   ├── 09-recurring-maintenance.md ← backflow testing, hot water servicing, body corps
│   ├── 10-leadgen-local-seo.md     ← Google Business Profile + lead replies
│   ├── 11-followup-reviews.md      ← post-job follow-up + review ask
│   └── 12-weekly-report.md         ← end-of-week pipeline + learnings update
├── templates/
│   ├── callout-quote.md
│   ├── project-quote.md
│   ├── invoice.md
│   ├── compliance-certificate.md   ← AU / NZ / UK / US permit / CA inspection
│   ├── sms-pack.md                 ← booking, on-the-way, completion, follow-up
│   ├── email-pack.md
│   ├── review-request.md
│   └── maintenance-contract.md
└── knowledge/
    └── regional-reference.md       ← AU / NZ / UK / US / CA terms + standards
```

## How it works

1. **Drop it in your agent.** Claude, OpenClaw, ChatGPT, Gemini,
   Grok — drop the `plumber-agent/` folder into a project or
   knowledge base.
2. **Load the orchestrator.** Paste `MASTER_PROMPT.md` as the system
   prompt. It tells the agent which skill to use when.
3. **Fill the business config.** First run, the agent walks you
   through `config/business-config-template.md` — your hourly rate,
   service area, callout fee, ABN/VAT, gas ticket number (if you
   gas fit), suppliers, payment methods.
4. **Forward your inbox.** Set up email forwarding from your business
   address + SMS forwarding (via OpenPhone / TextMagic / Twilio) so the
   agent sees inbound leads. Or just paste customer messages in as
   they come.
5. **Run the desk.** Every text/email/form: agent qualifies → quotes
   → schedules → invoices → certifies → follows up. Weekly: report.

## What the buyer ends up with

- A locked **business config** (hourly rate, service area, ABN/VAT,
  plumbing licence + gas ticket, insurance, suppliers, payment
  methods, off-hours rules)
- **Instant callout quotes** with breakdown — labour, parts, callout
  fee, GST/VAT — sent by SMS or email within minutes
- **Project quotes** for hot water replacements, bathroom renos,
  drainage repairs, gas line installs, new builds — itemised against
  your usual rates with staged payment terms
- A **dispatch schedule** with route optimisation between jobs
- **Pre-job confirmations** ("on the way, ETA 9:35am") sent automatically
- **Compliance certificates** generated post-job: Compliance Cert
  (AU/NZ), WRAS / Gas Safe / Unvented G3 (UK), Permit/Inspection
  (US), Provincial cert (CA) — with the right regulatory references
- **Invoices** with embedded Stripe/Square payment links
- **Supplier ordering** drafts (Reece, Tradelink, Wolseley, Ferguson,
  Plumbing World, Plumbmaster)
- **Emergency after-hours intake** for burst pipes, sewage backups,
  no hot water in winter — with surcharge logic baked in
- **Recurring maintenance** scheduling for commercial clients
  (backflow testing, hot water servicing, grease trap pump-outs)
- **Local SEO replies** for Google Business Profile reviews + Q&A
- A **weekly report** of jobs done, revenue, pipeline, no-shows, and
  what to fix next week

## Regions it works in

- **Australia** — references AS/NZS 3500 (Plumbing & Drainage), state
  Compliance Certs (CCEW NSW, COC VIC), gas Type A certification,
  AS/NZS 5601, GST 10%, ABN format
- **New Zealand** — references AS/NZS 3500, PGDB licensing
  (Plumbers, Gasfitters and Drainlayers Board), gas Type A, GST 15%
- **United Kingdom** — references WRAS approvals, Gas Safe Register
  for any gas work, Building Regs Part G + L, Unvented hot water G3,
  CIPHE / APHC trade bodies, VAT 20%
- **United States** — references UPC (Uniform Plumbing Code) or IPC
  (International Plumbing Code) depending on state, backflow
  certification, sewer line permits, state-by-state licensing
- **Canada** — references CSA B125 (plumbing fittings) + provincial
  codes, TSSA gas tickets (Ontario), provincial licensing, GST/PST/HST

The regional reference inside the bundle maps every term — you don't
need to teach the agent which country you're in beyond filling out
the business config.

## Agent platforms it runs on

- **Claude** (Claude Code, Claude Projects, Claude.ai with file uploads)
- **OpenClaw** (drop straight into skills tab)
- **ChatGPT** (paste into Custom GPT instructions / Project files)
- **Gemini / Grok** (paste skills as a system prompt + knowledge files)
- **n8n / Make / Zapier** (advanced — treat each SKILL as a prompt block)

## Support

Reply to your confirmation email or write to `creators@skillzy.ai`.
