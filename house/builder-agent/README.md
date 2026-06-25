# Builder Agent, end to end.

A complete builder's office in your agent. Drop this bundle into the
agent you already use, brief it on your business, and it runs the
whole desk: enquiry intake, site visits, fixed-price + cost-plus
quotes, contracts, deposit invoicing, subbie coordination, council
approvals, certifier sign-offs, progress claims, prime cost (PC)
items, variations, handover packs, defects liability, 11-month
warranty sweeps, weekly WIP + cash-position reporting. From the
first enquiry from a homeowner thinking about a reno through to the
final retention release a year after handover — one agent, every
step.

Built for residential builders, small commercial builders, general
contractors, design-and-construct outfits, and renovation
specialists who want to spend more time on tools and on site, and
less time chasing paperwork. Works the same in Australia, New
Zealand, the UK, the US, and Canada — the regional reference inside
the bundle maps every term (HIA + MBA vs NZS 3915 vs JCT vs AIA vs
CCDC, DA + CC + OC vs Building Consent + CCC vs Planning + Building
Regs vs Building Permit + CofO vs Permit + Final Inspection, GST vs
VAT vs sales tax).

## The full loop

```
enquiry arrives ("thinking about a rear extension, ballpark?")
   → intake (qualify: small job / project / full build; budget shape)
   → site visit + concept + budget
   → fixed-price OR cost-plus quote + contract
   → deposit invoice (5–10%, capped by law in some regions)
   → council approval / building consent / permit
   → subbie scheduling + materials ordering
   → stage 1 (demo / footings / slab) → progress claim
   → stage 2 (frame) → progress claim
   → stage 3 (lock-up) → progress claim
   → stage 4 (fix-out / 2nd-fix) → progress claim
   → practical completion (PC) → final claim
   → handover pack (cert of occupation + defects schedule + warranties)
   → defects liability period (12 months)
   → 11-month defects sweep (the highest-ROI service you don't offer yet)
   → retention release
   → end of week: WIP + cash position report
```

Maintains a running `learnings.md` so the agent gets sharper every
project — tracks which job types win on margin (kitchen reno vs
extension vs new build), which subbies show up on the booked day,
which suppliers actually deliver to site on time, which PC items
clients overspend on, and where variations slip without sign-off.

## What's in this bundle

```
builder-agent/
├── README.md                       ← this file
├── SETUP.md                        ← 10-minute setup
├── MASTER_PROMPT.md                ← orchestrator system prompt
├── LISTING_COPY.md                 ← internal: copy used for the listing
├── PUBLISH.md                      ← internal: how to publish
├── config/
│   ├── business-config-template.md ← rates, builder licence, insurance,
│   │                                  subbie list, contract type, regions
│   └── learnings-template.md       ← running learnings file
├── skills/
│   ├── 01-intake.md                ← enquiry triage: small job vs project
│   ├── 02-quote-callout.md         ← small jobs / handyman / maintenance <$5k
│   ├── 03-quote-project.md         ← full project quote — fixed-price OR cost-plus
│   ├── 04-dispatch.md              ← subbie scheduling, materials, site coord
│   ├── 05-compliance.md            ← DA/CC/OC, Building Consent, certifier sign-offs
│   ├── 06-invoice-payment.md       ← deposit, progress claims, PC adjustments, retention
│   ├── 07-supplier-ordering.md     ← materials, lead times, PC item allowances
│   ├── 08-emergency-247.md         ← site incident / urgent client (theft, water,
│   │                                  council orders, subbie no-show)
│   ├── 09-recurring-maintenance.md ← defects liability + 11-month sweep + warranty
│   ├── 10-leadgen-local-seo.md     ← architects + designers as referral sources;
│   │                                  portfolio + Google reviews
│   ├── 11-followup-reviews.md      ← post-handover reviews + repeat work
│   └── 12-weekly-report.md         ← WIP + cash position + pipeline
├── templates/
│   ├── callout-quote.md            ← small-job / maintenance quote
│   ├── project-quote.md            ← full project quote (fixed-price + cost-plus +
│   │                                  PC schedule + line-item breakdown)
│   ├── invoice.md                  ← progress-claim invoice
│   ├── compliance-certificate.md   ← handover pack: OC/CCC/CofO + defects
│   │                                  schedule + warranties index
│   ├── sms-pack.md
│   ├── email-pack.md
│   ├── review-request.md
│   └── maintenance-contract.md     ← defects liability schedule + 11-month sweep
│                                     (not a maintenance "contract" — a defects plan)
└── knowledge/
    └── regional-reference.md       ← AU / NZ / UK / US / CA building codes +
                                       contracts (HIA, JCT, AIA, NZS, CCDC)
```

## How it works

1. **Drop it in your agent.** Claude, OpenClaw, ChatGPT, Gemini,
   Grok — drop the `builder-agent/` folder into a project or
   knowledge base.
2. **Load the orchestrator.** Paste `MASTER_PROMPT.md` as the system
   prompt. It tells the agent which skill to use when.
3. **Fill the business config.** First run, the agent walks you
   through `config/business-config-template.md` — your builder
   licence, insurance, base rates, contract type (HIA / NZS / JCT /
   AIA / CCDC), preferred subbies, suppliers, deposit cap rules,
   retention policy.
4. **Forward your enquiries.** Set up email + form forwarding from
   your website (Squarespace / Wix / WordPress) to the agent inbox.
   Or just paste enquiries in as they come.
5. **Run the desk.** Every enquiry: agent qualifies → quotes → wins
   → contracts → orders → schedules → progresses → claims →
   certifies → hands over → defects-manages → reports.

## What the buyer ends up with

- A locked **business config** (builder licence, insurance, contract
  type, base rates, subbie roster, supplier accounts, deposit cap,
  retention rules, PC markup, variation markup, hourly rates for
  cost-plus, off-hours rules)
- **Enquiry triage** that doesn't blow callout time on tyre-kickers
- **Site-visit-then-concept-then-budget** flow so you don't quote
  fully until the client's serious
- **Fixed-price OR cost-plus project quotes** — itemised, with PC
  schedule, allowances, exclusions, and the variation mechanism
  baked in
- **HIA / MBA / NZS 3915 / JCT / AIA / CCDC contract** language
  matched to your region + scope
- **Deposit invoicing** that respects regional caps (e.g. AU NSW 10%)
- **Subbie scheduling + materials coordination** — confirm 48h
  ahead, materials delivered before subbie arrives, sign-off
  before paying their invoice
- **Council + certifier engagement** — DA → CC → OC (AU), Building
  Consent → CCC (NZ), Planning + Building Regs (UK), Permit +
  Inspections (US), Permit + Final (CA) — with the heads-up email
  + the docs the inspector needs
- **Progress claims** generated at each contract stage (deposit,
  base/slab, frame, lock-up, fix-out, PC, retention) with photos
- **Variation discipline** — every change off original scope gets
  written sign-off before work proceeds
- **Handover pack** — Occupation Cert / CCC / CofO, defects
  schedule, warranties index (cabinetry / appliances / tapware /
  structural)
- **Defects liability period management** — 12 months from handover,
  warranty register, and the **11-month sweep** ("we'll check it
  before the defects period ends") which is the highest-ROI service
  most builders skip
- **Retention release** at month 12
- **Architect + designer referral cultivation** (this is where 80%
  of project work comes from in residential building)
- **Google Business Profile + portfolio** management — before/after
  shots, weekly posts, review responses
- **Weekly WIP + cash-position report** — what's on the books, what's
  invoiced, what's owed, what's at risk

## Regions it works in

- **Australia** — references HIA + MBA contracts (lump sum, cost-plus,
  small-works), state-specific licensing (NSW HBA, VIC DBC, QLD
  QBCC, WA Building Commission, SA CBS, TAS CBOS, NT NTBPB),
  Development Application (DA) → Construction Certificate (CC) →
  Occupation Certificate (OC) approval path, private certifiers
  in NSW / VIC / QLD, Home Warranty Insurance thresholds
  (~$20k state-dependent), BAL bushfire ratings, NCC + state
  Building Regs, GST 10%, ABN format
- **New Zealand** — references NZS 3915 + NZIA Standard Conditions
  + CCCS for residential, Building Consent → Code Compliance
  Certificate (CCC), Producer Statements for Restricted Building
  Work (RBW), Licensed Building Practitioner (LBP) scheme,
  Master Builders + Certified Builders associations, GST 15%
- **United Kingdom** — references JCT (Joint Contracts Tribunal)
  Minor Works / Intermediate / Standard contracts, FMB (Federation
  of Master Builders) contracts, Planning Permission + Building
  Regulations approval (Building Control inspector or private
  Approved Inspector), Party Wall Act 1996, CDM 2015 (Construction
  Design & Management), Structural Warranties (NHBC, LABC, Premier
  Guarantee, BuildZone) on new builds, VAT 20% (5% reduced on some
  conversions; 0% on new builds — DIY scheme + zero-rating
  certificates)
- **United States** — references AIA (American Institute of
  Architects) A101 (stipulated sum) / A102 (cost-plus) /
  A201 (general conditions) contracts, CSI specs for commercial,
  state contractor licensing (CA CSLB, TX TREC, FL DBPR, etc.),
  Building Permits + Plan Review + staged inspections, General
  Liability + Workers Comp + Builder's Risk insurance, OSHA
  on-site safety, varying state sales tax
- **Canada** — references CCDC (Canadian Construction Documents
  Committee) suite — CCDC 2 (stipulated price), CCDC 3 (cost-plus),
  CCDC 4 (unit price), CCDC 5A/5B (construction management),
  provincial Building Codes (OBC Ontario, BCBC, etc.), municipal
  Building Permits + inspections, Tarion warranty (Ontario new
  homes), provincial workers comp (WSIB), GST/PST/HST varying

The regional reference inside the bundle maps every term — you
don't need to teach the agent which country you're in beyond
filling out the business config.

## Agent platforms it runs on

- **Claude** (Claude Code, Claude Projects, Claude.ai with file uploads)
- **OpenClaw** (drop straight into skills tab)
- **ChatGPT** (paste into Custom GPT instructions / Project files)
- **Gemini / Grok** (paste skills as a system prompt + knowledge files)
- **n8n / Make / Zapier** (advanced — treat each SKILL as a prompt block)

## Support

Reply to your confirmation email or write to `creators@skillzy.ai`.
