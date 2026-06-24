---
name: plumber-recurring-maintenance
description: Manage commercial maintenance contracts — backflow prevention testing (legally mandated annually), hot water cylinder servicing, grease trap pump-outs, body corp common-area plumbing, periodic gas safety inspections. Generate the schedule, the reminder cycle, the on-site checklist, the post-visit report. This is the single highest-margin work for an established plumber.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Recurring maintenance — commercial contracts

## Your job

Commercial clients (offices, restaurants, factories, retail, body
corps, schools, dental practices, vet clinics) need regular plumbing
maintenance on a legally-mandated or insurance-required schedule.
This is the most reliable, highest-margin work a plumber can have.
Manage the schedule, the comms, the on-site checklists, and the
reports.

## What "recurring maintenance" typically includes

| Service | Frequency | Region notes |
|---|---|---|
| **Backflow prevention testing** | Annually (legally mandatory in most regions for connections above low hazard) | AU: AS/NZS 2845 + state water authority; NZ: NZBC G12; UK: WaterReg + Building Regs; US: state water authority + AWWA M14; CA: provincial |
| **Hot water cylinder servicing** | Annually (more frequent for commercial / high-use) | TPR valve test, anode check, sediment flush — manufacturer requirement for warranty |
| **Grease trap pump-out + clean** | 3-monthly (food premises legal requirement in most regions) | Council trade waste agreement determines exact frequency |
| **Hydrant / fire service testing** | Annually (separate fire service licence usually required) | AS 1851 (AU/NZ); NFPA 25 (US); BS 5306 (UK) |
| **Roof / downpipe / gutter clean** | 6-monthly (commercial) | Particularly pre-wet-season |
| **Gas appliance safety check (commercial kitchens)** | Annually — gas ticket required | AS/NZS 5601 + state gas regulator |
| **Drainage CCTV survey (planned condition)** | Every 2-5 years for older properties | Pre-emptive — find issues before they're emergencies |
| **TMV (thermostatic mixing valve) servicing** | Annually for high-risk (aged care, hospitals, schools) | Scald prevention regulation |
| **Pressure-limiting valve check** | Annually | Replace every 5-10 years per manufacturer |

## Step 1 — Set up the contract

When onboarding a new commercial client:

```
Tell me about the property:
- Address(es) covered (single site / multi)
- Property type (office / restaurant / factory / retail / school /
  body corp / aged care / medical)
- Square metres or number of WC / kitchens
- Number of HWS units + type (gas / electric / heat pump / solar)
- Number of backflow preventers (estimate — type: RPZ / DCV / PVB)
- Grease trap on site? (Y/N — capacity, last pump-out date)
- TMV count (aged care / schools / medical)
- Existing testing records? (request copies)
- Insurer requirements (some require annual backflow + TMV)
- Council trade waste agreement (for food premises grease traps)
- Their nominated contact (facility manager, building manager,
  strata manager)
- Preferred service times (after-hours? weekends? early-morning
  before opening?)
- Quoting cycle (annual contract / quarterly invoice / per-visit)
- Access notes (security, lockup, alarm code, dog)
```

Then propose the contract:

```
MAINTENANCE CONTRACT PROPOSAL — [Customer]
==========================================
Property:      [address]
Service area:  [list — kitchen, plant room, retail front, etc.]

INCLUDED SERVICES + FREQUENCY
1. Backflow prevention testing — annually (March)
2. Hot water cylinder service — annually (May)
3. Grease trap pump-out + clean — 3-monthly (Jan, Apr, Jul, Oct)
4. TMV service — annually (June) [if applicable]
5. Drainage CCTV — every 3 years (next 2027)
6. Annual gas safety check — Type A licensed (April, same visit
   as backflow)

VISITS PER YEAR
4 × grease trap visits + 2 × combined service visits = 6 scheduled
visits, plus emergency call-out cover at standard rates.

PRICING
$4,200 + GST/VAT per annum, billed quarterly ($1,050/quarter).
Includes all routine testing, certificates, digital records
register, and council backflow lodgement.

EXCLUSIONS
- Repairs / rectifications discovered during testing — quoted
  separately at standard rates
- Out-of-scope emergency callouts — standard emergency rates apply
- Replacement parts (cartridges, TPR valves, backflow rebuild kits)
  at trade + 20%
- Grease trap repairs (lining, lid, baffle replacement) — quoted
  separately

DELIVERABLES PER VISIT
- Test results uploaded to your digital records register
- Compliance Certificate / Backflow Test Cert / Gas Cert as
  applicable
- Photo evidence of any issues found
- A 1-page summary report emailed to your nominated contact
- Lodgement with local water authority for backflow tests

CONTRACT TERMS
- 12-month initial, auto-renew unless 30 days notice
- 30-day exit clause on either side
- Liability per public liability policy ($20M)

Yours,
[your name]
[Business name]
[Plumbing Lic # / Gas Type A #]
```

## Step 2 — Lock in the schedule

Once accepted, generate calendar entries 12 months ahead. Recurring
maintenance is the most powerful work-smoothing tool you have. Lock
in dates well in advance so quote-and-callout work fills around it.

For grease traps specifically, schedule with the licensed waste
carrier (the trade waste contractor) — most plumbers don't own a
vac truck and contract this out. The agent should book the
sub-contracted pump-out before the plumber's service visit.

Per BUSINESS CONFIG → Scheduling tool:

- **Google Calendar:** Recurring events for each visit type
- **simPRO / ServiceM8 / AroFlo:** Recurring job templates
- **Manual:** Print a calendar for the year

## Step 3 — Reminder cycle

Send reminders at:

- **2 weeks out:** "Heads up — your next maintenance visit is [date].
  Anything we should know about? Any new fixtures we should add to
  the testing schedule? Grease trap fullness?"
- **2 days out:** "Confirming [date] [time] for the maintenance visit.
  Access details same as last time? Any closed-off areas?"
- **Morning of:** "On the way for your maintenance — ETA [time]."

For backflow specifically, send the lodgement confirmation to the
water authority + the customer within 7 days:

```
Hi [name] — annual backflow test for [property] complete. Cert
lodged with [Sydney Water / Watercare / Thames Water / etc.]
reference #[X].
```

## Step 4 — On-site checklist

When the operator is on site, the agent renders the testing
checklist for that visit type. Example for a backflow + TMV +
hot water service visit:

```
ON-SITE CHECKLIST — Backflow + TMV + HWS Service
=================================================
Site:           [address]
Date:           [date]
Tested by:      [Plumber name + licence #]

BACKFLOW PREVENTION (AS/NZS 2845 / regional equivalent)
For each device:
  ☐ Visual inspection — no damage, clean shroud
  ☐ Inlet pressure measured (kPa)
  ☐ Test pressure differential
  ☐ Check valve 1 — pass/fail (record psi drop)
  ☐ Check valve 2 — pass/fail
  ☐ Relief valve operation — opens at correct differential
  ☐ Test tag applied with date

  Device #1 — [location, brand, model, serial]: PASS / FAIL details
  Device #2 — ...

Lodge with water authority within 7 days.

HOT WATER CYLINDER SERVICE
For each unit:
  ☐ Visual inspection (corrosion, leaks, lagging)
  ☐ TPR valve test — manual operation, discharges to tundish
  ☐ Anode check (if accessible) — replace if <50% remaining
  ☐ Sediment flush (storage units)
  ☐ Operating temperature check — at outlet
  ☐ Pressure-limiting valve check (storage units)
  ☐ Gas: combustion check, flue spillage, CO reading (if Type A
     ticketed — otherwise schedule with gas contractor)

  Unit #1 — [location, brand, model, serial]: pass/fail
  Unit #2 — ...

TMV SERVICING (TMV3 / AS 4032.4 / regional equivalent)
For each TMV:
  ☐ Set point check — outlet temp at fixture
  ☐ Cold inlet shut-off test — outlet drops within 5 sec
  ☐ Hot inlet shut-off test — outlet drops within 5 sec
  ☐ Strainer clean
  ☐ Service kit replacement (if scheduled — typically every 5 yrs)
  ☐ Tag applied

  TMV #1 — [location]: pass — set 42°C, kit changed [date]
  TMV #2 — ...

ISSUES FOUND (rectifications quoted separately):
- [Issue 1]: [photo ref] — recommended action
- [Issue 2]: ...

NEXT VISIT DUE: [date]
```

## Step 5 — Post-visit report

Generate a one-page report for the nominated contact:

```
MAINTENANCE VISIT REPORT — [Date]
==================================
Customer:      [Business name]
Property:      [address]
Visit type:    [Backflow + HWS + TMV / Grease trap pump-out / etc.]
Performed by:  [Plumber name, licence #]

SUMMARY
All routine testing completed. [N] items passed, [M] items flagged
for rectification (see below).

PASS / FAIL SUMMARY
| Category          | Items tested | Pass | Fail | % Pass |
|---|---|---|---|---|
| Backflow devices  | 3            | 3    | 0    | 100%   |
| Hot water units   | 2            | 2    | 0    | 100%   |
| TMVs              | 8            | 7    | 1    | 87.5%  |
| Grease trap       | 1            | 1    | 0    | 100%   |

ITEMS REQUIRING ACTION
1. TMV #4 (staff kitchen sink) — failed cold shut-off (took 12 sec
   to drop). Service kit replacement recommended, $85 + 30 min.
2. HWS #2 (front building) — anode at 30%, replace at next visit
   ($95 part + 1 hr labour).
3. Grease trap baffle showing wear — monitor over next 2 cycles.

LODGEMENTS
- Backflow test cert lodged with [Sydney Water] reference [X]
- Grease trap waste docket #[X] from [licensed carrier]

NEXT VISIT DUE
[date] — for [visit type].

RECTIFICATIONS QUOTED
A separate quote for the three items above has been emailed. Total
$245 + GST including parts and labour.

Thanks,
[your name]
[Business name]
[Plumbing Lic #]
```

## Step 6 — Invoice

Per BUSINESS CONFIG → Maintenance contract billing cycle (usually
quarterly). Use `06-invoice-payment.md`.

## Hard rules

- **Schedule 12 months ahead.** Recurring work that's only "planned
  for later" doesn't happen. Lock dates.
- **Never skip the visit because the customer says "everything's
  fine."** Insurance requirements + legal liability run on the
  schedule, not on vibes. Backflow especially — failure to lodge
  = customer's water connection can be revoked.
- **Photo evidence is non-negotiable** for any issue found.
- **Always send the report within 24 hours of the visit.** Late
  reports erode trust on contracts.
- **Backflow lodgement within the regulator's window** (usually 7
  days post-test). Missing this = customer non-compliance, your
  fault.
- **Grease trap pump-out docket** goes to the customer for their
  council trade waste records. Without it, council can fine them.
- **Surface relationship signals to the operator** — if a contract
  customer asks for extra work, flag it as upsell opportunity, not
  scope creep.

## Reading the learnings.md

Track on maintenance contracts:
- Renewal rate (target: 90%+)
- Average rectification revenue per visit (target: 15-25% of contract
  value annually)
- Customer satisfaction signal (asked at renewal)
- Which contracts have grown vs shrunk on extras

## Confirm + handoff

> *"Maintenance scheduled / report sent / contract renewed: [outcome].
> Next visit for [Customer] is [date]. Reminder cycle queued.
> Backflow cert lodged with [water authority]."*
