# Cleaner Agent, end to end.

A complete cleaning business desk for your agent. Drop this bundle
into the agent you already use, brief it on your business, and it
runs the whole show: intake, quoting, dispatch, crew scheduling,
compliance, invoicing (including direct-debit recurring),
follow-ups, supplier ordering, after-hours triage, photo-evidence
discipline, and weekly reports. From the first text from a renter
chasing their bond back to the auto-renewing recurring contract
sitting at $480/month — one agent, every step.

Built for solo cleaners, residential cleaning businesses, commercial
cleaning crews, bond/end-of-lease specialists, STR turnover
operators, and cleaning business owners who want to spend more time
billing and less time chasing texts. Works the same in Australia,
New Zealand, the UK, the US, and Canada — the regional reference
inside the bundle maps every term (bond clean vs end-of-tenancy vs
move-out, COSHH vs SDS, NDIS clearance vs DBS vs vulnerable sector
check, GST vs VAT vs sales tax).

## The full loop

```
text / call / form arrives ("need a bond clean by Friday")
   → intake (qualify: one-off / recurring / bond / commercial /
              STR turnover / specialty / decline-out-of-area)
   → quote (callout one-off, or recurring contract)
   → dispatch (crew + supplies + access + key handover)
   → on-the-job (checklist + before/after photos + chem safety)
   → invoice (with payment link or direct debit auto-trigger)
   → photo-evidence pack to customer (bond / commercial / STR)
   → follow-up (1 day) + review request (3 days)
   → recurring-conversion offer (after every one-off)
   → end of week: report + learnings update + contract renewals due
```

Maintains a running `learnings.md` so the agent gets sharper each
week — tracks which job types win on margin (recurring residential
vs one-off deep cleans vs STR turnovers vs bond returns), which
suburbs let you cluster best, which crew members consistently
deliver 5-star reviews, which chems give the best yield per litre,
and which bond agents are pickier than others.

## What's in this bundle

```
cleaner-agent/
├── README.md                       ← this file
├── SETUP.md                        ← 10-minute setup
├── MASTER_PROMPT.md                ← orchestrator system prompt
├── LISTING_COPY.md                 ← internal: copy used for the listing
├── PUBLISH.md                      ← internal: how to publish
├── config/
│   ├── business-config-template.md ← services, region, rates, certs,
│   │                                 insurance, chems, crew, suppliers
│   └── learnings-template.md       ← running learnings file
├── skills/
│   ├── 01-intake.md                ← qualify: bond / recurring / commercial /
│   │                                 STR / specialty / decline
│   ├── 02-quote-callout.md         ← one-off quote — bond, deep clean,
│   │                                 post-build, move-in, spring clean
│   ├── 03-quote-project.md         ← recurring contract quote —
│   │                                 weekly/fortnightly residential,
│   │                                 commercial nightly, STR turnover
│   ├── 04-dispatch.md              ← crew + route + supplies + key /
│   │                                 lockbox / smart-lock handover
│   ├── 05-compliance.md            ← police check, WWCC, NDIS clearance,
│   │                                 DBS, COSHH/SDS, public liability,
│   │                                 worker comp; per-job checklist sign-off
│   ├── 06-invoice-payment.md       ← invoice + Stripe / GoCardless /
│   │                                 PayTo / Square; direct debit for
│   │                                 recurring; NDIS invoicing; net-30
│   │                                 commercial
│   ├── 07-supplier-ordering.md     ← chems / kit / consumables —
│   │                                 Jangro, Bunnings cleaning aisle,
│   │                                 Janpro, Grainger, Uline, Wesco
│   ├── 08-emergency-247.md         ← urgent flood / biohazard / last-min
│   │                                 STR turnover / complaint recovery
│   ├── 09-recurring-maintenance.md ← THE main spine — recurring
│   │                                 contract management, schedule,
│   │                                 supplies replenishment, customer
│   │                                 health, price escalation
│   ├── 10-leadgen-local-seo.md     ← GBP, Airtasker, Hipages, Bark,
│   │                                 Thumbtack, TaskRabbit, referrals
│   ├── 11-followup-reviews.md      ← post-clean review request +
│   │                                 recovery email for 3-star+ +
│   │                                 recurring conversion offer
│   └── 12-weekly-report.md         ← jobs done, contracts renewal,
│                                     supply spend, crew hours, complaints
├── templates/
│   ├── callout-quote.md            ← one-off quote — bond, deep,
│   │                                 post-build, move-in, spring
│   ├── project-quote.md            ← recurring contract — weekly /
│   │                                 fortnightly / monthly residential,
│   │                                 commercial nightly, STR per-turnover
│   ├── invoice.md
│   ├── compliance-certificate.md   ← checklist + sign-off — bond clean
│   │                                 checklist by region, NDIS clean
│   │                                 record, COSHH/SDS sheet
│   ├── email-pack.md
│   ├── sms-pack.md                 ← booking confirms, arrival nudges,
│   │                                 late-day, "we're done" with photos
│   ├── review-request.md
│   └── maintenance-contract.md     ← recurring service agreement —
│                                     auto-renew, price escalation,
│                                     termination notice
└── knowledge/
    └── regional-reference.md       ← AU / NZ / UK / US / CA cleaning
                                      standards, bond requirements,
                                      regulatory bodies, chemical
                                      regulations, certifications
```

## How it works

1. **Drop it in your agent.** Claude, OpenClaw, ChatGPT, Gemini,
   Grok — drop the `cleaner-agent/` folder into a project or
   knowledge base.
2. **Load the orchestrator.** Paste `MASTER_PROMPT.md` as the system
   prompt. It tells the agent which skill to use when.
3. **Fill the business config.** First run, the agent walks you
   through `config/business-config-template.md` — your services,
   per-clean rates, region, police check / WWCC / NDIS clearance /
   DBS, public liability, ABN/VAT, chem suppliers, crew, payment
   methods.
4. **Forward your inbox.** Set up email forwarding from your
   business address + SMS forwarding (via OpenPhone / TextMagic /
   Twilio) so the agent sees inbound leads. Or just paste customer
   messages in as they come.
5. **Run the desk.** Every text/email/form: agent qualifies → quotes
   → schedules crew → invoices → photo-evidence packs → follows up.
   Weekly: report.

## What the buyer ends up with

- A locked **business config** (services, regional rates, police
  check, WWCC / NDIS / DBS / vulnerable sector check, public
  liability, ABN/VAT, chem suppliers, crew rates, payment methods,
  off-hours rules)
- **Instant one-off quotes** with line-item breakdown — bond
  cleans, end-of-tenancy, deep cleans, post-build, move-in,
  spring cleans — sent by SMS or email within minutes
- **Recurring contract quotes** for weekly / fortnightly / monthly
  residential, commercial nightly, STR per-turnover — with
  auto-renew clauses, exclusions, photo-evidence terms, and
  scheduled price escalation
- A **dispatch schedule** with crew assignment + supplies prep +
  key / lockbox / smart-lock access pack
- **Pre-clean confirmations** ("on the way, ETA 9:35am") sent
  automatically
- **On-job checklists** that match the job type (bond clean by
  region, NDIS clean record, commercial nightly sign-off, STR
  turnover photo pack)
- **Time-stamped photo evidence** packs delivered to customer for
  bond returns, commercial sign-offs, STR turnovers, complaint
  recovery
- **Invoices** with Stripe links + direct debit for recurring
  (GoCardless UK, PayTo / Stripe Direct Debit AU, Stripe ACH US)
- **NDIS invoicing** with correct line items + Code of Conduct
  compliance + proof of service
- **Supplier ordering** drafts (Jangro UK, Bunnings AU, Janpro AU,
  Wesco / Grainger / Uline US, Mister Maid CA, Diversey commercial)
- **Emergency intake** for flood cleanup, biohazard, last-min STR
  turnover, complaint recovery — with surcharge logic baked in
- **Recurring contract management** — the spine — schedule
  renewals 60 days out, flag price escalation, monitor margin per
  contract, escalate-or-fire underperforming contracts
- **Bond return guarantee management** — 72-hour callback flow,
  photo evidence to landlord, no-charge re-clean
- **Recurring conversion machine** — after every one-off,
  triggered offer to convert to fortnightly recurring
- **Local SEO replies** for Google Business Profile reviews + Q&A
- A **weekly report** of jobs done, revenue, recurring vs one-off
  mix, contract renewal pipeline, supply spend, crew hours,
  complaints, and what to fix next week

## Regions it works in

- **Australia** — references Cleaning Services Award MA000022,
  state-specific bond requirements (NSW Fair Trading, VIC RTBA,
  QLD RTA), NDIS Worker Screening Check + Code of Conduct,
  Working with Children Check (WWCC by state), public liability
  $20M standard, SDS chemical compliance, ABN format, GST 10%
- **New Zealand** — references WorkSafe NZ, ACC levies, BCSANZ
  membership, police check + Children's Worker Safety Check,
  GST 15%
- **United Kingdom** — references COSHH (Control of Substances
  Hazardous to Health), BICSc certification, DBS check
  (vulnerable sector for care homes/schools), British Cleaning
  Council standards, end-of-tenancy bond protection schemes
  (TDS, DPS, MyDeposits), VAT 20%, auto-enrolment pension, NMW
- **United States** — references CIMS-GB certification (ISSA),
  OSHA HazCom 1910.1200, SDS for all chemicals, state-by-state
  bonding + insurance, state contractor licensing variations,
  state sales tax, 1099 vs W-2 employee distinction
- **Canada** — references provincial WCB / WSIB, CCM (Canadian
  Cleaning Standard), vulnerable sector check + police check,
  GST + PST/HST by province

The regional reference inside the bundle maps every term — you
don't need to teach the agent which country you're in beyond
filling out the business config.

## Agent platforms it runs on

- **Claude** (Claude Code, Claude Projects, Claude.ai with file uploads)
- **OpenClaw** (drop straight into skills tab)
- **ChatGPT** (paste into Custom GPT instructions / Project files)
- **Gemini / Grok** (paste skills as a system prompt + knowledge files)
- **n8n / Make / Zapier** (advanced — treat each SKILL as a prompt block)

## Cross-bundle pairing

Pairs cleanly with the **Airbnb Host Agent** bundle. The STR
turnover skill (in `09-recurring-maintenance.md`) is built to work
either standalone OR as the cleaner-side complement to the host's
side of the loop — the agent recognises STR-host customers and
adjusts the comms (per-turnover photo evidence, linen restocks,
amenity checklist, sub-2-hour turnaround windows).

## Support

Reply to your confirmation email or write to `creators@skillzy.ai`.
