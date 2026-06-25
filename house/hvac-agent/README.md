# HVAC Agent, end to end.

A complete trades desk for your HVAC business. Drop this bundle into
the agent you already use, brief it on your business, and it runs
the whole desk: intake, quoting, dispatch, refrigerant compliance,
invoicing, follow-ups, supplier ordering, after-hours triage,
annual service plans, weekly reports. From the first text from a
homeowner whose AC died on a 40°C day to the review request after
the changeout — one agent, every step.

Built for solo HVAC techs, small refrigeration & AC firms, ducted
specialists, heat pump installers, and commercial RTU crews who want
to spend more time on the tools and less in front of a screen. Works
the same in Australia, New Zealand, the UK, the US, and Canada — the
regional reference inside the bundle maps every term (ARC RHL vs EPA
608 vs F-Gas REFCOM vs ODSHAR, GST vs VAT, R32 vs R410A vs R454B).

## The full loop

```
text / call / form arrives ("AC not cooling, 38° outside, baby in the house")
   → intake (qualify: breakdown / install / service plan / commercial / refrigerant)
   → quote (callout or system project, with equipment + install + commissioning)
   → dispatch (calendar + route, seasonal load-balancing)
   → on-the-job (refrigerant logbook + photos + commissioning sheet)
   → invoice (with payment link)
   → compliance docs (refrigerant handling log + handover + warranty rego)
   → follow-up (1 day) + review request (3 days)
   → end of week: report + learnings update
```

Maintains a running `learnings.md` so the agent gets sharper each week
— tracks which job types win on margin (split changeouts vs callout
diagnostics), which suburbs convert on service plans, what your
heatwave-week capacity looks like, and which suppliers consistently
stock-out on R32 cylinders going into summer.

## What's in this bundle

```
hvac-agent/
├── README.md                       ← this file
├── SETUP.md                        ← 10-minute setup
├── MASTER_PROMPT.md                ← orchestrator system prompt
├── LISTING_COPY.md                 ← internal: copy used for the listing
├── PUBLISH.md                      ← internal: how to publish
├── config/
│   ├── business-config-template.md ← rates, service area, ABN/VAT, refrigerant licence
│   └── learnings-template.md       ← running learnings file
├── skills/
│   ├── 01-intake.md                ← qualify the lead: no cool? no heat? service plan? install?
│   ├── 02-quote-callout.md         ← instant breakdown quote with diagnostic flow
│   ├── 03-quote-project.md         ← split / ducted / heat pump / RTU system installs
│   ├── 04-dispatch.md              ← schedule + route + seasonal load-balancing
│   ├── 05-compliance.md            ← refrigerant logbook / ARC / F-Gas / EPA 608 / TSSA
│   ├── 06-invoice-payment.md       ← invoice + Stripe/Square payment link
│   ├── 07-supplier-ordering.md     ← parts from Beijer / Actrol / Reece HVAC / Wolseley / Johnstone
│   ├── 08-emergency-247.md         ← heatwave AC failures / winter heat failures / vulnerable occupants
│   ├── 09-recurring-maintenance.md ← annual service plans — the recurring revenue spine
│   ├── 10-leadgen-local-seo.md     ← seasonal campaigns (pre-summer tune-ups / pre-winter heating)
│   ├── 11-followup-reviews.md      ← post-job follow-up + review ask + service plan upsell
│   └── 12-weekly-report.md         ← end-of-week pipeline + learnings update
├── templates/
│   ├── callout-quote.md
│   ├── project-quote.md            ← system install quote
│   ├── invoice.md
│   ├── compliance-certificate.md   ← refrigerant logbook + handover + warranty rego pack
│   ├── sms-pack.md                 ← booking, on-the-way, completion, follow-up, seasonal blasts
│   ├── email-pack.md
│   ├── review-request.md
│   └── maintenance-contract.md     ← annual service plan contract (the strongest doc in the bundle)
└── knowledge/
    └── regional-reference.md       ← AU / NZ / UK / US / CA refrigerant + HVAC standards
```

## How it works

1. **Drop it in your agent.** Claude, OpenClaw, ChatGPT, Gemini,
   Grok — drop the `hvac-agent/` folder into a project or
   knowledge base.
2. **Load the orchestrator.** Paste `MASTER_PROMPT.md` as the system
   prompt. It tells the agent which skill to use when.
3. **Fill the business config.** First run, the agent walks you
   through `config/business-config-template.md` — your hourly rate,
   service area, callout fee, ABN/VAT, refrigerant licence type
   (ARC RHL/RTA, EPA 608 Universal, Gas Safe F-Gas REFCOM, TSSA
   ODP/HAR), suppliers, payment methods.
4. **Forward your inbox.** Set up email forwarding from your business
   address + SMS forwarding (via OpenPhone / TextMagic / Twilio) so the
   agent sees inbound leads. Or just paste customer messages in as
   they come.
5. **Run the desk.** Every text/email/form: agent qualifies → quotes
   → schedules → invoices → logs refrigerant → follows up. Weekly:
   report.

## What the buyer ends up with

- A locked **business config** (hourly rate, service area, ABN/VAT,
  refrigerant licence type + tier, insurance, suppliers, payment
  methods, off-hours rules, seasonal capacity)
- **Instant callout quotes** with diagnostic flow — not-cool /
  not-heat / no-power / leak / drip / noise — sent by SMS or email
  within minutes
- **Project quotes** for split changeouts, multi-head systems,
  ducted reverse-cycle installs, heat pump retrofits, hot water heat
  pumps, commercial RTU change-outs, chiller services — itemised
  against your usual rates with brand/tier options and staged payment
- A **dispatch schedule** with route optimisation between jobs +
  seasonal load-balancing (heatwave weeks vs shoulder season)
- **Pre-job confirmations** ("on the way, ETA 9:35am") sent automatically
- **Refrigerant compliance** generated post-job: charge added /
  recovered / type / cylinder serial / leak test result — logbook
  entries that match ARC / F-Gas / EPA 608 / TSSA recordkeeping rules
- **Handover packs** — warranty registration, indoor + outdoor
  serials, refrigerant charge, install commissioning sheet, user
  operation guide
- **Invoices** with embedded Stripe/Square payment links
- **Supplier ordering** drafts (Beijer/Actrol/Reece HVAC/Kirby AU,
  Realcold NZ, Wolseley/CPS Plumbing/Aircon Centre UK, Johnstone/
  Carrier Enterprise/Ferguson HVAC US, Master Group/Wolseley CA)
- **Emergency after-hours intake** for no-cool in a heatwave,
  no-heat in a cold snap, vulnerable occupants — with surcharge
  logic baked in
- **Annual service plans** that build a recurring-revenue spine —
  the maintenance contract template is the strongest doc in the
  bundle, designed to push 60-70% of customers onto a plan
- **Seasonal lead-gen** — pre-summer AC tune-up campaigns
  (Sep-Nov AU, Mar-May UK/US) and pre-winter heating campaigns,
  not flat year-round like a sparky's marketing
- **Local SEO replies** for Google Business Profile reviews + Q&A
- A **weekly report** of jobs done, revenue, service plan attach
  rate, no-shows, and what to fix next week

## Regions it works in

- **Australia** — references ARC (Australian Refrigeration Council)
  RHL (Refrigerant Handling Licence) tiers + RTA (Refrigerant
  Trading Authorisation) for businesses; AS/NZS 5149 (refrigeration
  systems), AS/NZS 5141 (HFC use), Ozone Protection Act; GST 10%,
  ABN format
- **New Zealand** — references ARTGM (Approved Refrigerant Trading
  Group Member) under Climate Change Response Act; AS/NZS 5149; GST 15%
- **United Kingdom** — references F-Gas Regulation (EU 517/2014
  retained post-Brexit) + The Fluorinated Greenhouse Gases
  Regulations 2015 (UK); REFCOM company certification; mandatory
  annual leak inspections on systems ≥5 tCO2e; engineer C&G 2079 /
  City & Guilds 2078 cards; VAT 20%
- **United States** — references EPA Section 608 (Type I/II/III/
  Universal) for stationary refrigerant work; AHRI ratings; HCFC
  phase-out + HFC drawdown under AIM Act; state-by-state HVAC
  contractor licences (e.g. C-20 California, EPA + state in TX,
  Master Mechanic in NYC); some states (CA Title 24, NY HVAC code)
  add load
- **Canada** — references Ozone-Depleting Substances and Halocarbon
  Alternatives Regulations (federal); provincial trade tickets
  (Red Seal Refrigeration and Air Conditioning Mechanic 313A in
  ON, equivalents elsewhere); TSSA G1/G2 for gas-fired heating;
  GST/PST/HST varies

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
