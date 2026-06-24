---
name: plumber-quote-project
description: Generate a project-scale quote for hot water replacements, bathroom renos, drainage repairs, gas line installs, new builds, commercial fit-outs. Insist on a site visit first if scope isn't certain. Itemise labour + materials + compliance + tax. Stage payments. Make scope changes a separate variation, not an argument.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Project quote — bigger jobs, slower, sharper

## Your job

Read the qualified lead. Decide whether the job can be quoted from
the description, or whether a site inspection is essential. Then
build an itemised quote the customer can compare against other
plumbers — without hiding anything.

## When to insist on a site inspection first

Always require a site inspection (even just 30 mins) for:

- Bathroom renovations (waterproofing, sub-floor, drainage falls all
  need eyes-on)
- Kitchen rough-in for renos (existing waste position + new layout)
- Drainage repairs / sewer line work (existing condition unknown)
- Gas line work to a new appliance position (run length + diameter
  affects gas pressure)
- "Add a tap / outlet over there" requests in older properties
  (pipe condition, isolation feasibility)
- Hot water replacement where the customer doesn't know the existing
  type (gas / electric / heat pump / solar — and the connection /
  flue / power supply varies massively between them)
- Rainwater tank install (overflow path + pump position)
- Anything where the customer says "I'm not sure"

Site inspection is its own callout — quote it at the callout fee +
30 mins labour (per BUSINESS CONFIG). If they book the work after
the inspection, credit the inspection fee toward the job.

## When you can quote without a site visit

- Like-for-like hot water swap (same fuel type, same size, brand
  visible in photo, isolation valves visible) — quote with a "subject
  to standard install conditions" clause
- New-build pre-plumb (working off plans — ask for the architectural
  + hydraulic drawings)
- Repeat work for a known property (you've been before)
- Simple appliance hook-up (dishwasher, washing machine to existing
  tap point) on a property <15 years old

## The structure of a project quote

Every project quote has five sections:

```
1. Scope (what you're doing — in plain English)
2. Materials (itemised, with markup transparent)
3. Labour (hours × rate, broken down by day)
4. Compliance + admin (cert fees, council inspection if required,
   gas certification if applicable)
5. Total + tax + payment terms (staged for bigger jobs)
```

## Quote template (email — projects always go via email)

```
Subject: Quote — [job summary] at [address]

Hi [name],

Quote for [job summary] at [address]:

1. SCOPE
- Remove existing 135L electric storage hot water cylinder
- Supply and install new Rheem Stellar 360L gas continuous-flow
  (natural gas)
- Run new 20mm gas line from meter (4 metres external)
- Install isolation valves on cold inlet, gas inlet, hot outlet
- Install pressure-limiting valve (500 kPa) on cold inlet
- Install tundish on PTRV discharge to existing drain
- Decommission and remove old unit (taken to scrap)
- Test and commission, issue Compliance Certificate + Gas Type A
  Certificate

2. MATERIALS
| Item                                       | Qty | Cost     |
|---|---|---|
| Rheem Stellar 360L continuous-flow HWS     | 1   | $1,485   |
| Pressure-limiting valve (500 kPa)          | 1   | $48      |
| Tundish kit (20mm)                         | 1   | $35      |
| 20mm copper gas line + fittings (4m)       | -   | $145     |
| Mini-stop valves x 3                       | 3   | $36      |
| Pipe lagging + saddle clips                | -   | $25      |
| Misc fittings + solder + flux              | -   | $40      |
| **Materials subtotal**                     |     | **$1,814**|

(Note: 20% markup applied on consumables. The HWS is at trade price
$1,238 — your unit price reflects the manufacturer warranty
registration we handle for you.)

3. LABOUR
| Day | Task                                      | Hrs | Rate    | $        |
|---|---|---|---|---|
| 1   | Remove old unit, capping + isolation      | 1.5 | $110/hr | $165     |
| 1   | Install new HWS, gas line, tundish        | 3.5 | $110/hr | $385     |
| 1   | Commission + gas pressure test            | 1.0 | $110/hr | $110     |
| **Labour subtotal**                              |     |         | **$660** |

4. COMPLIANCE + ADMIN
| Item                                       | Cost    |
|---|---|
| Plumbing Compliance Certificate            | $35     |
| Gas Type A Compliance Plate + Cert         | $55     |
| Manufacturer warranty registration         | included|
| Old unit disposal (scrap)                  | $20     |
| **Compliance subtotal**                    | **$110**|

5. TOTAL
| Section                | Amount      |
|---|---|
| Materials              | $1,814.00   |
| Labour                 | $660.00     |
| Compliance             | $110.00     |
| Subtotal               | $2,584.00   |
| GST (10%)              | $258.40     |
| **TOTAL**              | **$2,842.40** |

PAYMENT TERMS
- 30% deposit on acceptance ($852.72) — locks in the unit order
- 70% on completion, Net 7

TIMELINE
- Booking available [date range]
- Job runs 1 day (you'll have hot water by 4pm same day)
- Compliance + Gas certs issued same day

WHAT'S NOT INCLUDED
- Repair / replacement of existing internal hot water pipework if
  found to be galvanised or corroded — quoted separately as a
  variation
- Electrical decommissioning of the old electric element (we'll
  isolate at the switchboard; if the dedicated circuit needs to be
  removed by an electrician, we'll coordinate but it's billed
  separately by them)
- Any building work for unit relocation (we install on the existing
  pad / wall position)

WHAT'S GUARANTEED
- 12-month workmanship warranty
- Rheem manufacturer warranty (12 years on cylinder, 3 years on parts
  — we register it for you)
- All work to AS/NZS 3500 (Plumbing) + AS/NZS 5601 (Gas)
- Compliance + Gas Certs issued on the day

Reply "go ahead" to lock it in. Happy to walk you through the quote
on a quick call if anything's unclear.

Thanks,
[your name]
[Business name]
[Plumbing Lic # / Gas Type A #]
[ABN / VAT / EIN]
[Insurance: Public liability $20M, [insurer]]
```

## Bathroom renovation quote structure

Bathroom renos are usually 2-visit jobs: rough-in (before tiler /
waterproofer) and fit-off (after tiler). Quote them as one
fixed-price job with a clear split.

```
SCOPE — bathroom renovation, full strip and refit

Rough-in visit:
- Demo existing tapware, cistern, vanity, shower
- Re-plumb hot/cold lines to new vanity + shower + bath positions
- Drainage: new floor waste position, new bath waste, new shower
  drain (tile-in)
- Cap and pressure-test before tiler starts

Fit-off visit (after tiler + waterproofer + cabinet maker):
- Install vanity + basin + mixer
- Install bath spout + mixer
- Install shower mixer + rose + arm
- Install toilet pan + cistern + button
- Commission all fixtures
- Issue Compliance Cert
```

Staged payments for bathroom renos:
- 30% deposit on acceptance
- 30% on rough-in completion
- 40% on fit-off completion

## Drainage / pipe relining quotes

For sewer line repairs, ALWAYS include a CCTV inspection as a paid
diagnostic first, with the cost credited against any subsequent
repair work. Don't quote a sewer repair without seeing inside the
line — the difference between "tree root, jet-clear $400" and
"collapsed earthenware, excavate + replace $6,500" is what you
charge for being able to tell.

```
SCOPE — sewer line repair, 12 Smith St

Stage 1 (diagnostic): $480
- CCTV inspection from main IO to street boundary
- Locate + depth-mark of any defects
- Written report with footage

Stage 2 (repair — quoted after Stage 1 results):
- Option A: Hydro-jet clear + cure-in-place liner (no dig)
- Option B: Excavate + replace section (if collapse)
- Option C: Reline only the affected section
(Quote within 24h of Stage 1 footage review)
```

## Hard rules

- **Itemise materials, don't hide markup.** "Materials: $1,800" is a
  red flag to anyone who's hired a tradie before. Show the markup
  honestly. Trades who hide markups get gazumped by trades who don't.
- **Show labour by day.** Customers want to know if it's a 1-day or
  3-day job. Affects their availability planning.
- **Hot water replacement quotes name the unit by brand + model.**
  "Hot water cylinder" is not a quote — "Rheem Stellar 360L
  continuous-flow" is.
- **Gas work needs a separate gas cert line + reference to AS/NZS
  5601 (or regional equivalent).** No gas cert? No gas quote.
- **Always include compliance section.** A quote without certificate
  or permit fees is a quote that will surprise the customer at
  invoice time.
- **Always have a "Not Included" section.** This is the line that
  protects you from scope creep. "If we find galvanised pipework
  needing replacement, we'll quote it as a variation" — clear, fair,
  defensible.
- **Always specify the standard you're working to** (AS/NZS 3500,
  AS/NZS 5601, BS EN 806, UPC/IPC, NPC/CSA B125). Region-pulled
  from BUSINESS CONFIG.
- **Always show the certificates** that come with the job. Customers
  pay more confidently when they see what they get.
- **Staged payments for jobs over $1,500** — protect cashflow,
  protect the customer.
- **Banned phrases** from BUSINESS CONFIG.

## Reading the learnings.md

Open `learnings.md`. If:
- The job type's win-rate is <30% in the last 4 weeks → consider
  surfacing a competitive variant ("we can also do a 200L Rheem
  Optima for $2,200 instead of the 360L Stellar if usage is
  moderate")
- The customer type (homeowner / landlord / builder / body corp)
  has notes → apply them ("body corps prefer net 30 and a written
  scope letter, lead with it")
- "Hot water gas swap" is a Win — push it as the recommended option
  when the existing unit is electric and the property has gas
  available

## Outputting the internal record

```
QUOTE #<n> — <timestamp>
Lead:        LEAD #<n>
Job type:    <hot water swap / bathroom reno / drainage / gas / etc.>
Site visit:  <yes — done | yes — pending | no, working off description>
Quote total: $<X>
Materials:   $<X>
Labour:      $<X> (Y hrs)
Gas content: <yes / no — if yes, gas cert applies>
Status:      <draft | sent | accepted | declined | variation requested>
Time slot:   <date range>
```

## Confirm + handoff

Tell the operator:
> *"Project quote drafted: $X for [job summary]. Review before sending?
> Once accepted, I'll deposit-invoice 30% via `06-invoice-payment.md`
> and book the work in `04-dispatch.md`."*

Wait for operator sign-off before sending — never send a project
quote without the user reviewing it first. Project quotes are the
contract.
