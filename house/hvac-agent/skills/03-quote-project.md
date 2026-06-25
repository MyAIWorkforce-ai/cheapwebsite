---
name: hvac-quote-project
description: Generate a project-scale quote for system installs and changeouts — split, multi-head, ducted reverse-cycle, heat pump retrofits, commercial RTU. Insist on a site visit first unless scope is genuinely certain. Itemise equipment + install + commissioning + warranty. Offer brand/tier options. Stage payments. Push the annual service plan as an add-on.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Project quote — system installs, sharper, slower

## Your job

Read the qualified lead. Decide whether the install can be quoted
from the description, or whether a site inspection is essential.
Then build an itemised quote the customer can compare against other
HVAC techs — without hiding anything — and that they can decide on
within 30 days.

## When to insist on a site inspection first

Almost always for HVAC installs. The list of things you NEED to see:

- **Ducted reverse-cycle install** — roof space access, ceiling
  joist depth, return-air path, supply diffuser layout, electrical
  supply capacity, outdoor unit pad position with neighbour noise +
  serviceable clearances. Quoting ducted without site visit is the
  #1 way to underquote a job by $3,000+.
- **Multi-head split** — line-set runs, indoor head positions,
  outdoor unit position (one outdoor for all heads = compact;
  multiple outdoors = simpler but ugly), wall structure for
  brackets (brick/render/cladding/timber affects mounting).
- **Heat pump retrofit (hot water)** — existing HWS position, power
  supply, drain access, space for the larger outdoor unit, sound
  considerations.
- **Heat pump retrofit (hydronic — Altherma / Ecodan / aroTHERM /
  Compress)** — existing emitter compatibility (radiator vs UFH),
  pipe runs, buffer tank space, MCS-eligible install requirements
  if claiming grant. UK-specific consideration.
- **Commercial RTU change-out** — crane access, structural roof
  load, gas + power isolation, ductwork transition, building
  occupancy schedule for shutdown windows.
- **Anywhere the customer says "I'm not sure"** — site inspection.
- **Anywhere the existing unit is being replaced and you haven't
  seen the line set / connections / electrical** — site inspection.

Site inspection is its own callout — quote it at the callout fee +
30 mins labour (per BUSINESS CONFIG). If they book the install after
the inspection, credit the inspection fee toward the job.

## When you can quote without a site visit

- Like-for-like single-head split changeout (same kW, same brand
  family, same wall position, line set visible in photo, isolation
  visible) — quote with a "subject to standard install conditions"
  clause
- New-build pre-install (working off plans — ask for the
  architectural + mechanical drawings)
- Repeat work for a known property (you've been before)
- A "next size up" single-head split for the same room as an
  existing failing unit

## The structure of a project quote

Every project quote has six sections:

```
1. Scope (what you're doing — in plain English)
2. Equipment (named: brand + model + kW + indoor/outdoor, with
   brand/tier options if relevant)
3. Install + labour (broken down by day)
4. Commissioning + compliance (refrigerant logbook, electrical
   isolation cert, gas cert if applicable, warranty registration,
   commissioning sheet)
5. Total + tax + payment terms (staged for jobs over $2,000)
6. Service plan offer (year 1 included or discounted)
```

## Single-head split changeout — example

```
Subject: Quote — Split system changeout, Master bedroom

Hi [name],

Quote for replacing the failing 3.5kW Mitsubishi split in your
master bedroom with a new 5.0kW reverse-cycle unit (the existing
3.5kW is undersized for the room — measured 28sqm with N-facing
glass, 5.0kW handles peak summer and winter shoulder).

1. SCOPE
- Recover refrigerant from existing Mitsubishi split (logbook entry,
  reclaim to recovery cylinder)
- Decommission and remove existing indoor head + outdoor unit
  (taken to scrap; cylinder + electronics to certified disposal)
- Supply and install new 5.0kW Daikin Cora FTKM50 reverse-cycle
  R32 split system (or equivalent — see brand options below)
- Re-use existing line set if condition acceptable; pressure-test +
  flush; replace if pitted, kinked, or undersized
- New indoor wall bracket + drainage
- New outdoor wall mount bracket (or pad if ground-level)
- Run new condensate drain to exterior (or existing if intact)
- Electrical isolation switch checked + tagged
- Pressure test, vacuum to 500 microns, charge to spec
- Commission, set fan curves, run on cool + heat 15 min each
- Issue refrigerant logbook entry + handover pack (manuals,
  warranty registration in customer's name)

2. EQUIPMENT — three brand options

  OPTION A: DAIKIN Cora FTKM50 (recommended)
  - 5.0kW cool / 6.0kW heat
  - R32 refrigerant, pre-charged for line sets ≤15m
  - Daikin 5-year parts + labour warranty (registered in your name)
  - $1,850 unit
  - Why this: best inverter modulation in class, quietest at low fan,
    Daikin's local parts network is the deepest of the three

  OPTION B: MITSUBISHI ELECTRIC MSZ-AP50 (premium)
  - 5.0kW cool / 6.0kW heat
  - R32 refrigerant
  - Mitsubishi 5-year parts + labour warranty
  - $1,980 unit
  - Why this: marginally quieter than Daikin at low fan; reputation
    for compressor longevity beyond 10 years

  OPTION C: FUJITSU Lifestyle ASTG12KMCC (value)
  - 4.8kW cool / 6.0kW heat
  - R32 refrigerant
  - Fujitsu 5-year warranty
  - $1,580 unit
  - Why this: cheapest of the three; reliable but not as polished
    on the inverter side; parts availability slightly thinner

3. INSTALL + LABOUR
| Day | Task                                      | Hrs | Rate    | $        |
|---|---|---|---|---|
| 1   | Recovery + decommission of old unit       | 1.0 | $130/hr | $130     |
| 1   | Install indoor + outdoor, new bracketry   | 3.5 | $130/hr | $455     |
| 1   | Pressure test + vacuum (500 microns)      | 0.75| $130/hr | $97.50   |
| 1   | Commissioning + handover walk-through     | 0.75| $130/hr | $97.50   |
| **Labour subtotal**                              |     |         | **$780** |

4. COMMISSIONING + COMPLIANCE
| Item                                       | Cost    |
|---|---|
| Refrigerant logbook entry + handover pack  | included|
| Recovered refrigerant — certified disposal | $35     |
| Warranty registration (in customer's name) | included|
| Old unit disposal                          | $40     |
| **Compliance subtotal**                    | **$75** |

5. TOTAL — based on OPTION A (Daikin Cora 5.0kW)

| Section                | Amount      |
|---|---|
| Equipment              | $1,850      |
| Labour                 | $780        |
| Commissioning + disposal | $75       |
| Subtotal               | $2,705      |
| GST (10%)              | $270.50     |
| **TOTAL**              | **$2,975.50** |

(Option B adds $130. Option C subtracts $270.)

PAYMENT TERMS
- 30% deposit on acceptance ($892.65) — locks in equipment order
- 70% on completion, Net 7

TIMELINE
- Equipment lead time: 3-5 working days (Daikin Cora 5.0kW from
  Beijer, current stock confirmed)
- Install: single day, on-site approx 6-7 hrs including
  commissioning
- Compliance + handover pack issued same day

WHAT'S NOT INCLUDED
- Replacement of existing line set if unrecoverable (typically
  $180-$320 — quoted as variation only if needed; we'll show you
  the pitting/damage before doing it)
- Repair / replacement of existing condensate drain if it's
  cracked or undersized
- Electrical sub-board work if the unit needs a dedicated circuit
  upgrade (we'll quote, sparky bills separately)
- Building work for any new wall penetration (we'll core a clean
  hole, you handle the visible patch / paint)
- Crane / scissor lift if 1st floor or above (quoted separately
  per actual access)

WHAT'S GUARANTEED
- 5-year manufacturer warranty on Daikin/Mitsubishi/Fujitsu units
  (registered in your name)
- 12-month workmanship warranty on our install
- All work to AS/NZS 5149 (refrigeration), AS/NZS 5141 (HFC use),
  AS/NZS 3000 (electrical isolation)
- Refrigerant logbook entry + handover pack on completion day

6. SERVICE PLAN — first year included

If you go ahead within 14 days, we'll include the first year of our
annual service plan FREE (normally $295). Covers a 12-month service
visit: filter check + clean, condenser coil clean, drain pan +
condensate flush, refrigerant pressure check, capacitor + contactor
inspection, full diagnostic. Saves you from the next breakdown
before it happens.

After year 1, renew at $245 (15% loyalty discount) or end with no
contract.

Reply "go ahead — Option A" (or B/C) to lock it in. Happy to walk
you through the quote on a quick call if anything's unclear.

Thanks,
[your name]
[Business name]
[Refrigerant licence — e.g. ARC RHL Full # 12345]
[ABN / VAT / EIN]
[Insurance: Public liability $20M, [insurer]]
```

## Ducted reverse-cycle install — structure

Ducted installs are bigger ticket ($8,000-$22,000 residential)
and the variation risk is higher. Site inspection is mandatory.

```
SCOPE — Ducted reverse-cycle install, [property]

System: 14.0 kW Daikin Air Intelligence ducted reverse-cycle
        outdoor + RZAG140 indoor + 7-zone controller, ducting in
        roof space, return air through hall ceiling, fresh-air
        intake from eaves.

PHASE 1 — Roof space install:
- Roof space prep, structural assessment (truss spacing,
  cross-brace clearance for trunk duct run)
- Hang ducted indoor unit from supplied bracketry, isolation
  pads for vibration
- Run trunk + branch ducting (R0.6 insulated flexible to AS 4254)
  to 7 zones — 4 bedrooms, lounge, dining/kitchen, study
- Cut + install grilles (white powder-coated steel) at each
  diffuser position
- Cut + install return air grille (1100×500 mm in hall ceiling)
- Run insulated condensate line to soffit safe discharge

PHASE 2 — Outdoor unit install:
- Concrete pad install (or wall bracket if elevated)
- Refrigerant line set run (insulated, 22m total — within Daikin's
  max for this model)
- Electrical sub-circuit run from main board (sparky-coordinated)
- Pressure test + vacuum to 500 microns
- Charge per spec, run on cool + heat

PHASE 3 — Controls + commissioning:
- Install Daikin BRC1H zone controller in hall (or app-only if
  preferred)
- Zone touch panels at each room? (optional, +$180 ea)
- Commission system, balance airflow per zone via dampers
- 15-min run on cool, 15-min on heat, monitor pressure +
  temperature differentials
- Walk-through with customer: how to set each zone, controller
  walkthrough, app pairing, filter access for monthly check
```

Staged payments for ducted:
- 30% deposit on acceptance (locks equipment order, lead time
  usually 2-3 weeks for ducted indoor units)
- 30% on roof space rough-in completion (ducting run, return
  air, branch grilles cut)
- 40% on commissioning + handover

## Multi-head split, heat pump retrofit — same structure, brand options

Apply the same six-section structure. Always offer 2-3 brand
options, with honest reasoning for the recommendation.

## Heat pump retrofit specifics (residential — growing fast)

For hot water heat pumps (Sanden, Reclaim, Stiebel Eltron, Daikin
Altherma EHS, Vaillant aroSTOR, Bosch Compress 7000i AW), structure
the quote around:

1. **Existing HWS condition + decommissioning**
2. **New heat pump tank or split system + outdoor unit positioning**
3. **Power supply** (often needs a dedicated circuit + new
   isolation — sparky-coordinated)
4. **Drain access** (heat pumps generate more condensate than
   storage electrics — drain to existing waste required)
5. **Rebate / grant capture** (regional — VIC Solar Vic for AU;
   BUS for UK; IRA + utility for US; Greener Homes for CA)

Heat pump retrofits ARE eligible for grants in most regions. Quote
should show pre-grant + post-grant prices. The agent looks up
current grant availability per region.

For hydronic heat pump retrofit (Altherma / Ecodan / aroTHERM /
Compress) — UK-heavy at the moment. Quote with MCS-eligible install
language and reference the BUS (Boiler Upgrade Scheme) grant
(currently £7,500 for ASHP in UK). MCS certificate from the cert
body MUST be issued for the customer to claim — bring this up in
the quote.

## Commercial RTU change-out — structure

Same six-section approach, plus:

- **Pre-install survey** — separate paid engagement, $X depending
  on rig
- **Shutdown window** — customer specifies, quote validity tied to
  date because crane costs move
- **Crane / lift** — itemised; never absorbed into the install line
- **Building approval** — if structural roof load changes, customer's
  responsibility but agent surfaces the requirement
- **Refrigerant tonnage logbook** — commercial RTUs often >5 tCO2e
  → mandatory annual leak inspections in UK + AU (under F-Gas + AS
  protocols). Build this into the quote and the service plan.

## Hard rules

- **Itemise equipment, don't hide markup.** Customers researching
  Daikin Cora 5.0kW can see Beijer's trade price. Honesty wins more
  than it loses.
- **Show labour by day.** Customers want to know if it's a 1-day or
  3-day job. Affects their availability planning.
- **Name the model, not the category.** "Split system" is not a
  quote — "Daikin Cora FTKM50 R32 reverse cycle" is.
- **Always offer brand options** (2-3) with honest reasoning. This is
  the single biggest trust-builder vs the competitor who quotes one
  brand with no rationale.
- **Always include compliance section** — refrigerant logbook + cert
  fees + warranty rego. Quote without these = quote that will surprise
  the customer at invoice time.
- **Always have a "Not Included" section** — protects you from scope
  creep. "If the line set is pitted, we'll quote the replacement as a
  variation with photos" — clear, fair, defensible.
- **Always specify the standard you're working to** (AS/NZS 5149, BS
  EN 378, ASHRAE 15/34 + IMC/UMC, CSA B52). Region-pulled from
  BUSINESS CONFIG.
- **Always show the certificates** that come with the job. Customers
  pay more confidently when they see what they get.
- **Staged payments for jobs over $2,000** — protect cashflow,
  protect the customer.
- **Always include the year-1 service plan offer** — this is the
  single biggest lever for service plan attach rate. Make it free
  for projects, discounted for callout-led customers.
- **Refrigerant work needs the licence reference** on every project
  quote. ARC RHL # / EPA 608 # / F-Gas C&G # / Red Seal 313A # in
  the footer.
- **Gas heating work needs a separate gas cert line + the gas ticket
  number.** No gas ticket? No gas work — sub it out.
- **Banned phrases** from BUSINESS CONFIG.

## Reading the learnings.md

Open `learnings.md`. If:
- Equipment brand performance notes show a brand underperforming
  → quietly drop it from the options, surface to operator at weekly
  report
- Service plan attach is below target → make sure the offer is
  framed as an obvious win ("first year free vs $295 saved")
- Heat pump retrofit quotes are converting poorly → check whether
  the rebate / grant capture is being applied; chase whether the
  customer is comparing apples to apples
- A specific job type's win-rate is < 30% → consider whether a
  cheaper option-C variant should be the lead recommendation
  (e.g. drop Mitsubishi premium and lead Fujitsu value)

## Outputting the internal record

```
QUOTE #<n> — <timestamp>
Lead:        LEAD #<n>
Job type:    <split changeout / multi-head / ducted / heat pump /
              RTU commercial>
Site visit:  <yes — done | yes — pending | no, working off photos>
Quote total: $<X> (base option)
Equipment:   $<X>
Labour:      $<X> (Y hrs)
Refrigerant: <R32 / R410A / R454B / R290 — kg charged>
Service plan offered: <Y/N — included for year 1 / discounted>
Status:      <draft | sent | accepted | declined | variation requested>
Time slot:   <date range>
Lead time on equipment: <days>
```

## Confirm + handoff

Tell the operator:
> *"Project quote drafted: $X for [job summary]. Three brand options
> presented. Year-1 service plan included. Review before sending?
> Once accepted, I'll deposit-invoice 30% via `06-invoice-payment.md`
> and book the work in `04-dispatch.md`. Equipment order goes to
> [supplier] via `07-supplier-ordering.md` on acceptance."*

Wait for operator sign-off before sending — never send a project
quote without the user reviewing it first. Project quotes are the
contract.
