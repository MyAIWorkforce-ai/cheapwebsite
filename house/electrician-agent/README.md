# Electrician Agent, end to end.

A complete trades desk for your electrician business. Drop this bundle
into the agent you already use, brief it on your business, and it runs
the whole desk: intake, quoting, dispatch, compliance certificates,
invoicing, follow-ups, supplier ordering, after-hours triage, weekly
reports. From the first text from a homeowner to the review request
after the job — one agent, every step.

Built for solo sparkies, small electrical firms, and contractor crews
who want to spend more time on the tools and less in front of a screen.
Works the same in Australia, New Zealand, the UK, the US, and Canada —
the regional reference inside the bundle maps every term (COC vs EICR
vs Permit/Inspection, GST vs VAT, etc.).

## The full loop

```
text / call / form arrives
   → intake (qualify: emergency / quote / service / new build)
   → quote (callout or project, with parts + labour)
   → dispatch (calendar + route)
   → on-the-job (compliance check + photos + parts list)
   → invoice (with payment link)
   → certificate of compliance / EICR
   → follow-up (1 day) + review request (3 days)
   → end of week: report + learnings update
```

Maintains a running `learnings.md` so the agent gets sharper each week
— tracks which job types win on margin, which suburbs have shortest
drive times, which customer types convert at quote stage, what your
no-show rate looks like.

## What's in this bundle

```
electrician-agent/
├── README.md                       ← this file
├── SETUP.md                        ← 10-minute setup
├── MASTER_PROMPT.md                ← orchestrator system prompt
├── LISTING_COPY.md                 ← internal: copy used for the listing
├── PUBLISH.md                      ← internal: how to publish
├── config/
│   ├── business-config-template.md ← rates, service area, ABN/VAT, etc.
│   └── learnings-template.md       ← running learnings file
├── skills/
│   ├── 01-intake.md                ← qualify the lead: emergency? quote?
│   ├── 02-quote-callout.md         ← instant callout quote with breakdown
│   ├── 03-quote-project.md         ← rewires, switchboards, new builds
│   ├── 04-dispatch.md              ← schedule + route optimisation
│   ├── 05-compliance.md            ← COC / EICR / permit / inspection
│   ├── 06-invoice-payment.md       ← invoice + Stripe/Square payment link
│   ├── 07-supplier-ordering.md     ← parts from your usual wholesalers
│   ├── 08-emergency-247.md         ← after-hours triage + callout fee
│   ├── 09-recurring-maintenance.md ← commercial contracts (RCD/RCBO tests, etc.)
│   ├── 10-leadgen-local-seo.md     ← Google Business Profile + lead replies
│   ├── 11-followup-reviews.md      ← post-job follow-up + review ask
│   └── 12-weekly-report.md         ← end-of-week pipeline + learnings update
├── templates/
│   ├── callout-quote.md
│   ├── project-quote.md
│   ├── invoice.md
│   ├── coc-certificate.md          ← AU / NZ / UK EICR / US permit / CA inspection
│   ├── sms-pack.md                 ← booking, on-the-way, completion, follow-up
│   ├── email-pack.md
│   ├── review-request.md
│   └── maintenance-contract.md
└── knowledge/
    └── regional-reference.md       ← AU / NZ / UK / US / CA terms + standards
```

## How it works

1. **Drop it in your agent.** Claude, OpenClaw, ChatGPT, Gemini,
   Grok — drop the `electrician-agent/` folder into a project or
   knowledge base.
2. **Load the orchestrator.** Paste `MASTER_PROMPT.md` as the system
   prompt. It tells the agent which skill to use when.
3. **Fill the business config.** First run, the agent walks you
   through `config/business-config-template.md` — your hourly rate,
   service area, callout fee, ABN/VAT, suppliers, payment methods.
4. **Forward your inbox.** Set up email forwarding from your business
   address + SMS forwarding (via OpenPhone / TextMagic / Twilio) so the
   agent sees inbound leads. Or just paste customer messages in as
   they come.
5. **Run the desk.** Every text/email/form: agent qualifies → quotes
   → schedules → invoices → certifies → follows up. Weekly: report.

## What the buyer ends up with

- A locked **business config** (hourly rate, service area, ABN/VAT,
  insurance, suppliers, payment methods, off-hours rules)
- **Instant callout quotes** with breakdown — labour, parts, callout
  fee, GST/VAT — sent by SMS or email within minutes
- **Project quotes** for rewires, switchboard upgrades, solar PV,
  EV chargers, new builds — itemised against your usual rates
- A **dispatch schedule** with route optimisation between jobs
- **Pre-job confirmations** ("on the way, ETA 9:35am") sent automatically
- **Compliance certificates** generated post-job: COC (AU/NZ),
  EICR (UK), Permit/Inspection (US), ESA (CA) — with the right
  regulatory references
- **Invoices** with embedded Stripe/Square payment links
- **Supplier ordering** drafts (Rexel, CEF, City Electric, Sparky Direct)
- **Emergency after-hours intake** with surcharge logic baked in
- **Recurring maintenance** scheduling for commercial clients (RCD
  testing, thermal imaging, switchboard servicing)
- **Local SEO replies** for Google Business Profile reviews + Q&A
- A **weekly report** of jobs done, revenue, pipeline, no-shows, and
  what to fix next week

## Regions it works in

- **Australia** — references AS/NZS 3000 (Wiring Rules), COC issuance,
  GST 10%, ABN format
- **New Zealand** — references AS/NZS 3000, ESC issuance, GST 15%
- **United Kingdom** — references BS 7671 (18th Edition), NICEIC/NAPIT
  certifications, EICR format, VAT 20%
- **United States** — references NEC (National Electrical Code),
  permit + inspection process, state-by-state licensing
- **Canada** — references CEC (Canadian Electrical Code), ESA
  inspections (Ontario) / equivalents, GST/PST/HST

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
