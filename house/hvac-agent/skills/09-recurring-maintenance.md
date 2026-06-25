---
name: hvac-recurring-maintenance
description: Sell, onboard, schedule, and run the annual service plan — the recurring revenue spine of an HVAC business. Filter changes, refrigerant pressure check, drain pan + condensate clean, capacitor/contactor inspection, controls calibration, gas safety check (if ticketed). Target 60-70% attach rate on new installs, 30-40% on callouts. Build the plan into every customer touchpoint. Contracts double customer lifetime value.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Recurring maintenance — annual service plans

## Your job

The annual service plan is THE most important revenue stream in an
HVAC business. Established HVAC firms earn 40-60% of revenue from
service plans + the rectification work that flows from them.
Customers on a plan are:

- 4× more likely to call you for breakdowns (vs going to Google)
- 6× more likely to call you for the next system install
- 8× more likely to give you a 5-star review when they DO have an
  issue (you've maintained the relationship)
- 3× higher lifetime value than callout-only customers

So this skill is the strongest in the bundle. The agent's job is to:

1. **Sell the plan** — every quote, every install, every
   post-callout follow-up surfaces the offer
2. **Onboard new plan members** — contract, payment schedule,
   visit calendar, welcome pack
3. **Schedule the visits** — 12 months ahead, lock dates
4. **Run the on-site checklist** — what to do, what to test, what
   to photo
5. **Generate the post-visit report** — customer keepsake + upsell
   gateway for rectifications
6. **Renew the plan** — 30 days before expiry, propose renewal
   with year-over-year value statement

Target attach rates:
- **New install customers:** 60-70% on a plan
- **New callout customers:** 30-40% on a plan
- **Commercial repeat:** 80%+ on a plan
- **Year-1 → Year-2 renewal:** 85%+

If you're seeing rates below these, the agent flags in the weekly
report.

## The service plan offer (three tiers)

```
PLAN A — Essential ($245-$295/year per single-head split)
- 1 × annual service visit (60-90 min on site)
- Filter check + clean
- Outdoor condenser coil clean
- Drain pan + condensate flush
- Refrigerant pressure check (no recharge — that's separate
   if leak found)
- Capacitor + contactor visual check
- Controls calibration + remote sync
- Written service report + photo evidence
- 10% off any breakdown callout during plan year
- Priority booking (24h ahead of non-plan customers)

PLAN B — Comprehensive ($395-$495/year)
- Everything in Plan A, PLUS:
- 2 × visits per year (pre-summer + pre-winter)
- Coil sanitisation treatment (anti-mould)
- Indoor coil deep clean (every 2nd year)
- Refrigerant leak inspection per AS/NZS 5149 / F-Gas / EPA 608
- Gas safety check (if gas heating component, ticketed only)
- 15% off any breakdown callout + 10% off parts during plan year
- Same-day priority for breakdown calls in heatwave/cold-snap

PLAN C — Commercial ($X — quoted per site)
- 4 × quarterly visits per year
- All A + B services
- Refrigerant logbook + mandatory leak inspection cadence per
   tCO2e banding (F-Gas / AS 5149)
- Refrigerant trading auth recordkeeping per regulator
- Pre-summer + pre-winter capacity test
- Service report with KPIs (energy delta, runtime hours,
   alarms triggered)
- Same-day breakdown response, no surcharge for first call
- BAS / controls health check (if applicable)
```

(Pricing ranges shown — overridden by BUSINESS CONFIG.)

For ducted systems, multi-head splits, and heat pumps, prices step
up — the agent uses BUSINESS CONFIG → Plan pricing by system type.

## When the agent surfaces the plan offer

Every customer touchpoint. The agent surfaces it (without being
pushy) at these moments:

| Touchpoint | Plan-ask framing |
|---|---|
| New install quote (`03-quote-project.md`) | "Year 1 included if you go ahead within 14 days — normally $295" |
| New install handover (`04-dispatch.md` completion SMS) | "Service plan year 1 included as agreed. We'll text in [month] for year 2" |
| Callout completion (`04-dispatch.md`) | "Heads up — your system is X years old, our annual service plan catches the next breakdown before it happens. Want details?" |
| Day-7 follow-up after callout (`11-followup-reviews.md`) | "Now's the moment people usually think: 'I should get this serviced regularly' — happy to send the plan details" |
| Annual reminder month (this skill — visit schedule) | "Time for your annual visit — booking [month]" |
| Renewal (this skill — 30 days before expiry) | "Year 2 renewal — same plan, 15% loyalty discount, or upgrade to Plan B" |
| Lost-customer reactivation (`10-leadgen-local-seo.md`) | "It's been 18 months since we serviced your system — pre-summer tune-up?" |

## Onboarding a new plan member

When a customer says yes to the plan (whether at install, after
callout, or via campaign):

```
WELCOME PACK — [Customer name]
================================
Plan:             [Plan A — Essential / Plan B — Comprehensive / Plan C]
Plan #:           SP-[YYYYMM]-[N]
Start date:       [date]
First visit due:  [date approx 12 months from install — or pre-
                   summer/winter for retrofitted-to-plan customers]
Renewal date:     [12 months from start]

CUSTOMER
[name]
[email + mobile]
[billing address]
[service address — if different]

SYSTEM(S) COVERED
- System 1: [Daikin Cora FTKM50 5.0kW split, master bedroom,
             installed [date], serial [X]]
- System 2: [Mitsubishi MSZ-AP35 3.5kW split, living, installed
             [date — predates our work, customer-supplied detail]]
- (etc — list every unit on the plan)

PRICING
- Plan fee per year: $[X]
- Payment method:    [Direct debit monthly $X / Annual upfront /
                      Quarterly]
- Renewal terms:     Auto-renew unless 30 days notice; 15% loyalty
                      discount applied year-2 onwards if no claim
                      against workmanship warranty

INCLUDED THIS YEAR
- 1 × annual visit (or 2 × for Plan B; 4 × for Plan C)
- Inspection report after each visit
- 10% (Plan A) / 15% (Plan B) / no-surcharge (Plan C) discount
   on any breakdown callout
- Priority dispatch — 24h ahead of non-plan customers
- Refrigerant logbook + handover for any work

EXCLUSIONS (priced separately)
- Repairs / parts / rectifications discovered during the visit
- Refrigerant recharge if a leak is detected (leak repair quoted
   separately under our standard rates with 10% discount for plan)
- System replacement or new install (separate quote)
- Out-of-scope emergency callout in extreme weather (heatwave /
   cold snap with vulnerable occupant) — covered without surcharge
   for Plan C; standard rate less your plan discount for A + B

THE FIRST VISIT
We'll text you 2 weeks out, then 2 days out, then morning of.
Typical visit is 60-90 mins per system. We need access to:
- The indoor head (clear furniture nearby)
- The outdoor unit (clear of plants, blockages)
- The breaker panel (label your AC breaker if you can)

You don't need to be home if you can leave us a way in.

Welcome on board.

— [your name]
[Business name]
[Refrigerant licence #]
```

## Step 1 — Schedule the visits

Once accepted, generate calendar entries 12 months ahead. Service
plan visits are the most powerful work-smoothing tool you have.
Lock in dates well in advance so callout and install work fills
around them.

Per BUSINESS CONFIG → Scheduling tool:

- **Google Calendar:** Recurring events for each visit type
- **simPRO / ServiceM8 / AroFlo / FieldEdge / Housecall Pro /
   Jobber / ServiceTitan:** Recurring job templates
- **Manual:** Print a calendar for the year

For Plan A (1 visit): schedule in the shoulder season before the
customer's primary use period — pre-summer for AC-dominant
households, pre-winter for heat-pump-dominant.

For Plan B (2 visits): pre-summer + pre-winter, ~6 months apart.

For Plan C (4 visits): quarterly.

For Plan C with mandatory leak inspections (UK systems ≥5 tCO2e;
AU commercial above threshold) — calendar the leak inspection at
required cadence (annual / 6-monthly / 3-monthly per F-Gas
tCO2e banding) and treat it as a contract obligation.

## Step 2 — Reminder cycle

Send reminders at:

- **2 weeks out:** "Heads up — your annual service visit is due
  [date]. Anything we should know about? Any noises, smells, or
  drips since we were here last?"
- **2 days out:** "Confirming [date] [time] for your annual
  service. Access details same as last time? Any pets or new
  units we should know about?"
- **Morning of:** "On the way for your annual — ETA [time]."

For Plan C with mandatory leak inspection cadence:

```
Hi [name] — your scheduled F-Gas leak inspection is due in [month].
For your [system kW] [type] at [address], this is mandatory under
UK F-Gas Regs at the [annual/6-monthly] cadence (you're at [X
tCO2e]).

Want to book it for [date] alongside the routine service visit?
That bundles cost — about $[X] for the bundled visit vs $[Y] for
separates.

— [your name]
```

## Step 3 — On-site checklist

When the operator is on site, the agent renders the visit
checklist. Example for a Plan A annual visit on a residential
single-head split:

```
ON-SITE CHECKLIST — Plan A Annual Service
==========================================
Customer:     [name]
Address:      [address]
Date:         [date]
System:       [make / model / kW / refrigerant]
System age:   [years from install]
Last visit:   [date — read from learnings.md]
Plan member since: [date]
Tech:         [name + RHL #]

PRE-VISIT REVIEW
☐ Read last visit's notes — any flagged issues to follow up
☐ Customer reported anything since last visit? (warmer / colder
   air, noise, smell, drip)

INDOOR HEAD (split / cassette / ducted indoor)
☐ Visual inspection — cabinet, louvres, condition
☐ Filter — remove, clean (vacuum + wash if washable, replace if
   pleated and >50% loaded)
☐ Indoor coil — visual + foam clean if accessible
☐ Drain pan — check for algae, sediment; flush condensate line
   with vac and water
☐ Fan blade — clean, check for vibration
☐ Drain line — verify positive discharge to exterior
☐ Operating noise — sound check at low + high fan
☐ Mode test — Cool 5 min, Heat 5 min, Auto 5 min

OUTDOOR UNIT (condenser)
☐ Visual inspection — cabinet condition, refrigerant pipe
   insulation intact, mounting tight
☐ Coil — clean with foam coil cleaner, rinse from inside out
☐ Fan blade — clean, check for damage
☐ Capacitor — test with capacitance meter, record μF, compare
   to nameplate (±6% = healthy; ±10% = replace within 6 months;
   beyond = replace now and quote)
☐ Contactor — visual + listen for arcing; clean contact face
☐ Refrigerant pressure check (cool mode, ambient 25°C ±):
   - Suction pressure: [reading]
   - Discharge pressure: [reading]
   - Sub-cool: [reading]
   - Superheat: [reading]
   - Verdict vs nameplate: [in spec / low — leak inspection
      recommended / out of spec — quote leak find]
☐ Electrical isolation — switch operates, tagged

CONTROLS
☐ Remote / wall pad / smart thermostat — function check
☐ App pairing tested (if smart)
☐ Setpoints customer-preferred — recalibrate if drifted

REFRIGERANT (logbook entry generated separately if work done)
☐ Pressure check only — no kg moved
☐ OR — leak inspection per F-Gas / AS 5149 cadence + result

GAS (if Plan B + ticketed)
☐ Combustion test on gas-fired component
☐ Flue spillage check
☐ CO measurement

POST-VISIT
☐ Filter type + size noted for next visit
☐ Any flagged issues photographed
☐ Customer briefed on findings + any quoted rectifications
☐ Service plan reminder for next visit booked into calendar
```

For ducted systems, multi-head, heat pump, RTU — separate checklist
variants. The agent loads the right one based on the customer's
plan record.

## Step 4 — Post-visit report

Generate a one-page report for the customer:

```
SERVICE PLAN VISIT REPORT — [Date]
===================================
Customer:      [name]
System:        [make / model / kW]
Plan:          [A / B / C]
Visit by:      [Tech name, Refrigerant licence #]
Visit date:    [date]

SUMMARY
All routine service tasks completed. System operating in spec.
[N] items flagged for monitoring; [M] items quoted for
rectification (separate quote attached).

WHAT WE DID
- Replaced indoor mesh filter (light-load, clean, reusable for
   3 more months)
- Cleaned outdoor condenser coil (heavy lint build-up — first
   service since install; recommend annual)
- Flushed condensate drain — clear discharge confirmed
- Verified refrigerant pressures within Daikin spec:
   - Suction: 8.5 bar (target 8-9 in cool mode at 25°C ambient)
   - Discharge: 32 bar (target 28-35)
- Tested capacitor: 45.2 μF (nameplate 45+5 ±6%; passing)
- Tested contactor: clean contact face, no arcing
- Calibrated wall thermostat — was reading 1°C high; corrected

WHAT WE FOUND
- Outdoor unit pad is showing minor settling on one corner —
   not yet causing vibration but worth monitoring. We'll re-check
   next visit; if it worsens, level-pad install is $180 + 30 min.
- Indoor head returns slightly warmer air on the right side of
   the coil — likely partial coil contamination behind the
   blower. Deep coil clean is $320 + 45 min, recommended within
   12 months.

NO RECTIFICATIONS QUOTED THIS VISIT
   (no separate quote attached this time)

SYSTEM HEALTH
This 5-year-old Daikin Cora is performing close to factory spec.
Likely service life ahead: 7-10 more years assuming continued
routine service. Refrigerant charge held since install — no leak
detected. Capacitor in good shape — typical first replacement
at 8-10 years.

NEXT VISIT DUE
[date] — annual visit, included in your plan.

YOUR PLAN STATUS
Plan A renewed automatically [date next year]. Year-2 loyalty
discount of 15% applied. Renewal price: $[X].

If anything changes before then (new noises, drips, breakdown),
call us first — your plan discount applies to any callout.

Thanks,
[your name]
[Business name]
[Refrigerant licence #]
```

## Step 5 — Invoice (if plan billed per-visit) or skip (if annual upfront)

Per BUSINESS CONFIG → Plan billing cycle. Use
`06-invoice-payment.md` for any rectification work quoted at the
visit.

## Step 6 — Renewal cycle (30 days before plan expires)

Send the renewal proposal:

```
Subject: Service plan renewal — [Customer]

Hi [name],

Your service plan with [Business name] is coming up for renewal on
[date] — just 30 days away. Quick year-in-review:

Past 12 months under your plan:
- 1 × annual service visit completed [date]
- 0 breakdowns (great — that's what the plan is for)
- $0 rectifications quoted, $0 acted on

YEAR-2 RENEWAL — three options:

1. RENEW PLAN A — Essential
   $245/year (15% loyalty discount applied) — was $295 year-1
   Same scope as year-1.

2. UPGRADE TO PLAN B — Comprehensive
   $395/year (15% loyalty discount applied) — was $495 standard
   Adds: 2 visits/year (pre-summer + pre-winter), coil
         sanitisation, indoor coil deep clean every 2nd year, 15%
         off breakdowns + parts.
   Worth it if: system is 5+ years old, you've had 1+ breakdowns,
   you want extra warmth re: longevity.

3. END THE PLAN
   No drama. We'll keep your system records on file in case you
   come back later.

Reply with "renew A" / "upgrade B" / "end" and I'll lock it in.
If we don't hear, Plan A auto-renews per the original contract
terms.

Thanks for the year,
[your name]
[Business name]
```

## Special case — service plan for commercial customers

Commercial (offices, restaurants, retail, factories, body corps,
medical, schools, hospitality, aged care) — different rhythm:

- Quarterly visits as default (Plan C)
- Refrigerant logbook + mandatory leak inspection cadence per
  regulator (F-Gas in UK; AS 5149 commercial in AU; ODSHAR in CA)
- Per-site contract pricing (not retail tier)
- Often quoted on RFP / tender — agent generates the tender
  response document
- Net 30 payment terms — annual upfront discount of 5-10%

For restaurants + hospitality, schedule visits OUTSIDE service
hours (early morning before opening or late night) — operators
take it for granted; agent makes sure dispatch reflects this.

For aged care + medical, refrigerant + air quality + filtration
are all elevated concerns — agent surfaces additional services
(HEPA filter swaps, anti-microbial coil treatment, BAS health
check) as upsell within the plan.

## Special case — landlord / property manager plans

Landlord-owned rental properties — the "customer" is the property
manager / landlord; the user is the tenant. The plan covers the
system, not the occupant.

- Bill: landlord / property manager
- Visit access: coordinate with property manager who coordinates
  with tenant
- Reports: copy to both landlord AND tenant (so tenant knows the
  system was serviced and isn't tempted to call a competing tech)
- Rectifications: landlord approves before action (tenant can flag
  issues, landlord pays for fixes)
- Renewals: often auto-renew via portfolio management contract;
  agent surfaces individual property plans for portfolio bundling
  discount

## Hard rules

- **Schedule 12 months ahead.** Recurring work that's only "planned
  for later" doesn't happen. Lock dates.
- **Never skip the visit because the customer says "everything's
  fine."** This is the entire point of preventive service —
  catching the next breakdown before it happens.
- **Photo evidence is non-negotiable** for any issue found. Before
  and after on coil cleans, pressure gauge readings, capacitor
  meter readings.
- **Always send the report within 24 hours of the visit.** Late
  reports erode trust on contracts.
- **Mandatory leak inspection cadence is NOT optional** under UK
  F-Gas Regs (for ≥5 tCO2e systems). Missing this = customer
  non-compliance AND operator's REFCOM cert at risk.
- **Refrigerant pressure check ≠ leak inspection.** Pressure check
  is "are we in spec right now?" Leak inspection is "did we
  electronic-leak-detector / UV-detect / soap-test the joints?"
  Different obligation, different test.
- **Surface relationship signals to the operator** — if a plan
  customer asks for extra work, flag it as upsell opportunity, not
  scope creep.
- **Rectification work quoted = revenue gateway.** Target 15-25% of
  annual plan revenue from rectification work surfaced during
  visits. If your rectification rate is below 10%, you're either
  not looking hard enough OR the customer base is too new.
- **The renewal conversation is the most important one.** Send it
  30 days out; auto-renew is a backstop, not a strategy.

## Reading the learnings.md

Track on service plans:
- Attach rate by entry point (install / callout / campaign)
- Renewal rate (target: 85%+)
- Average rectification revenue per visit (target: 15-25% of plan
   value annually)
- Customer satisfaction signal (asked at renewal)
- Which plans grew vs shrunk on extras
- Service plan revenue trajectory — quarter-over-quarter,
   year-over-year

This is the single most important section of the learnings file.

## Confirm + handoff

> *"Service plan visit scheduled / report sent / contract renewed:
> [outcome]. Next visit for [Customer] is [date]. Reminder cycle
> queued. Plan attach rate this week: [X%] (target [Y%]).
> Rectification revenue quoted: $[X] from this visit."*
