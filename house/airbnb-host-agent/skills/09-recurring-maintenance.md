---
name: airbnb-property-maintenance
description: Run the recurring maintenance rhythm that keeps every property earning. Monthly deep cleans (inside oven, behind fridge, descale shower head, fan filters), quarterly maintenance walks (smoke alarms, fire extinguisher, water heater, HVAC filter, mattress flip, leaking taps, grout), bi-annual carpet + upholstery, annual safety + compliance (smoke + CO alarm replacement, fire extinguisher service, HVAC service, hot water flush, gas safety check, electrical inspection, pool + spa, pest control, insurance renewal, STR registration renewal, lodging tax). The schedule that keeps a 4.9 listing at 4.9. Generate 12 months forward per property. On-site checklists. Post-visit reports. Hand off to skill 07 for supplies, skill 06 for invoices.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Recurring maintenance — the property-maintenance rhythm

## Your job

A property that's run hard — back-to-back turnovers, 70%+
occupancy, 200+ guests/year — depreciates faster than a private
residence by a factor of 3-5×. The 4.9 listing that becomes a 4.7
listing usually didn't have a sudden catastrophe. It had:

- A shower-head that scaled up over 8 months
- An oven that didn't get deep-cleaned in a year
- A fan filter clogged enough to make the AC weak in summer
- A leaking tap that got "fixed by tightening" four times
- A smoke alarm with a flat battery for the last 3 months
- A grout line that went grey

None of those make a single 1-star review. All of them, together,
shave 0.2 off the listing's annual average. The recurring
maintenance schedule is what stops that.

This is the equivalent of an HVAC service plan or commercial
plumbing contract — except the customer is the operator
themselves, and the goal is **protecting the asset's earnings**,
not selling a service. The agent runs the schedule, the comms to
contractors, the on-site checklists, the post-visit reports, and
the budget tracking. It surfaces what's coming up, what slipped,
and what investment needs operator approval.

## The three-tier cadence

```
TIER 1 — MONTHLY DEEP CLEAN
  Who: cleaner (extended turnover OR scheduled deep-clean slot)
  When: once a month, ideally on a low-occupancy day
  Cost: ~$50-$120 add-on to a normal turnover
  Time: 60-90 min beyond turnover

TIER 2 — QUARTERLY MAINTENANCE WALK
  Who: operator or paid handyman (1-2 hr per property)
  When: every 3 months
  Cost: ~$100-$200 if outsourced; $0 if operator
  Time: 1-2 hr

TIER 3 — ANNUAL SAFETY + COMPLIANCE
  Who: licensed trades (HVAC, plumber, gas fitter, electrician,
       pest control, pool tech), insurance broker, council
  When: once a year (some items 5 / 10 year)
  Cost: $400-$1500/property/year typical
  Time: spread across multiple visits
```

Each property runs all three tiers. The agent generates the
calendar 12 months ahead and pegs against the channel calendar
(low-occupancy weeks).

## When to trigger this skill

- Operator runs "schedule the year for [property]" or "what's due
  on [property]?"
- Monthly checkpoint: agent surfaces next month's deep-clean date
- Quarterly checkpoint: agent surfaces the upcoming walk + the
  checklist
- 60 days before any annual compliance item (STR registration,
  insurance, fire-extinguisher service, gas safety check, EICR,
  pool inspection)
- An issue flagged in skill 04 turnover (cleaner reports something)
  or skill 08 emergency triggers a "needs follow-up" task
- End of quarter — generate the next-quarter calendar
- Reminders going to contractors / cleaners (1 week + 2 day + day-of)

## Tier 1 — monthly deep clean

The standard turnover (skill 04) is fast — 2-4 hours typical, focus
on guest-visible surfaces. The monthly deep clean adds the
behind-the-scenes work that doesn't fit a tight turnover window.

### Monthly deep-clean checklist

```
MONTHLY DEEP CLEAN — [Property name]
====================================
Cleaner:        [name]
Date:           [date — paired with a 2+ night gap if possible]
Time budget:    Standard turnover + 60-90 min

KITCHEN
  ☐ Inside oven — full degrease + glass clean (Easy-Off / Mr Muscle /
     Bar Keepers Friend)
  ☐ Range hood filter — degrease + dishwasher cycle if metal mesh;
     replace if paper / carbon
  ☐ Behind fridge — pull out, vacuum coils, wipe floor + wall, check
     for water leak signs
  ☐ Behind / under microwave — wipe out grease film
  ☐ Inside dishwasher — descale + filter clean (white vinegar cycle)
  ☐ Kettle — descale (vinegar or commercial descaler — important in
     hard-water regions; UK, US Southwest, parts of AU)
  ☐ Coffee machine — descale + group head deep clean
  ☐ Toaster — empty crumb tray + invert + tap
  ☐ Inside cupboards — wipe shelves, check for pantry pests
  ☐ Bin — deep wash with bleach solution, replace liner

BATHROOM (each)
  ☐ Shower head — descale (vinegar soak or commercial descaler);
     in hard-water region, monthly is the minimum
  ☐ Tap aerators — unscrew + descale
  ☐ Grout — scrub with grout brush + bleach pen on visible mould
  ☐ Silicone seals — check + spot replace if blackened
  ☐ Exhaust fan — vacuum cover, wipe blades, run cycle test
  ☐ Drain — pour boiling water + bicarb + vinegar; check for slow
     drain (early sign of hair clog)
  ☐ Behind toilet — wipe down (often missed in turnover)
  ☐ Behind / under vanity — wipe + check for leak
  ☐ Mirror seals — wipe for steam-stains
  ☐ Replace any worn welcome-pack items (hairdryer cord check)

LIVING / BEDROOM
  ☐ Dust skirting boards (often missed)
  ☐ Dust ceiling fan blades + light fittings
  ☐ Vacuum behind + under sofa; lift cushions, vacuum frame
  ☐ Vacuum mattress (HEPA) + flip / rotate (see Tier 2 — but
     mattress rotation can happen monthly)
  ☐ Curtain check — vacuum or shake out; spot-clean if needed
  ☐ Window track clean (often missed)
  ☐ Light switches + door handles — wipe with disinfectant
  ☐ Remote controls — wipe + battery check
  ☐ Picture frames — dust top edges
  ☐ Throw cushions / blankets — wash if not done last cycle

LAUNDRY
  ☐ Washing machine — bleach cycle empty; descale soap drawer
  ☐ Dryer — clean lint filter to spotless + vacuum behind
  ☐ Iron — descale; check soleplate clean
  ☐ Laundry sink — wipe + descale tap

EXTERIOR / FRONTAGE
  ☐ Clean front door + frame
  ☐ Wipe smart lock keypad (sticky from sunscreen / lotion)
  ☐ Sweep entry path
  ☐ Clean exterior of windows reachable from ground / safe stepladder
  ☐ Check letterbox — empty, no junk-mail pileup
  ☐ Check garden bins — empty, clean (especially after a long stay)

POST-CLEAN
  ☐ Photo log: 5-10 photos of finished property (proof + listing
     refresh ammo)
  ☐ Flag any maintenance needs to operator (loose handle, leaking
     tap, scuff, low stock — see skill 07)
  ☐ Log time spent + any consumables used
```

The cleaner sends back photos + a short note via the cleaner tool
(Turno, Tidy, Properly, Breezeway) or via channel manager
unified inbox.

### Scheduling Tier 1

Lock the monthly deep clean to a low-occupancy slot — ideally a
night between guests with a 2+ night gap, or a deliberate calendar
block.

For high-occupancy properties (>80%), there's often no 2-night
gap. Options:

- Extend a Sunday turnover by 90 min (charge the cost into the
  operating budget, not the cleaning fee)
- Take a planned 1-night block once a month
- Split the deep-clean across two turnovers (kitchen one month,
  bathroom the next) — only for very high occupancy

### Cost of Tier 1

```
MONTHLY DEEP-CLEAN BUDGET
=========================
Cleaner extra hours:    1.5 hr × $[hourly rate] = $[X]
Deep-clean consumables: ~$15-25 (oven cleaner, descaler, grout)
Total monthly cost:     $[X]/property
Annual:                 $[X × 12]
% of annual revenue:    [calculate against per-property revenue]
```

Target: ≤2% of gross annual revenue. Properties spending 4-5% on
deep cleaning often need the cleaner upgraded or the property
upgraded (something's wearing out faster than normal).

## Tier 2 — quarterly maintenance walk

Every 3 months, walk the property with a checklist. Operator or
paid handyman. Hour-and-a-bit per property.

### Quarterly walk checklist

```
QUARTERLY MAINTENANCE WALK — [Property name]
============================================
Walked by:      [operator / handyman name]
Date:           [date]
Last walk:      [date from learnings.md]
Walk number:    [Q1 / Q2 / Q3 / Q4 of property year]

LIFE SAFETY (highest priority)
  ☐ Smoke alarm — press test button each alarm; replace battery
     if low; note install date (replace whole unit at 10 years)
  ☐ CO detector — test each alarm; note install date (replace at
     5-7 years per brand)
  ☐ Fire extinguisher — gauge in green; nozzle clear; no dents;
     mount secure; tag legible (annual professional service is
     Tier 3)
  ☐ Fire blanket (kitchen) — sealed, in date
  ☐ First aid kit — restock per checklist (paracetamol, bandaids,
     antiseptic, antihistamine, burn gel, gauze, tape, gloves)
  ☐ Emergency contact card — current numbers, on the fridge
  ☐ Escape route map — visible (required in some regions —
     Scotland STL, NSW STRA, Honolulu Bill 41)
  ☐ Window/balcony lock check — no compromise on locks for upper
     floors

WATER + PLUMBING
  ☐ Hot water unit — visual inspection (no leaks at fittings,
     no rust at base, valve operates) — annual proper service is
     Tier 3
  ☐ Pressure-limiting valve — visual + listen for hissing
  ☐ TPR valve on storage hot water — quick manual lift to flush
     (drains a litre, then re-seats)
  ☐ Anode rod — visual check if accessible (not typical on STR
     residential)
  ☐ Under-sink leaks — every sink, run water 30 sec, feel under
     trap + supply lines
  ☐ Toilet base seal — wipe finger around, check for moisture
  ☐ Shower seals + silicone — visual + push test on grout corners
  ☐ Outdoor taps — operate, check for drip + frost damage in
     winter regions
  ☐ Washing machine hoses — check for bulges; replace at 5 years
  ☐ Dishwasher inlet — visual at fitting

HVAC + ELECTRICAL
  ☐ HVAC filter — replace pleated filter every 3 months on hard-
     working systems (more often if pets / dust). Change card with
     "last changed [date]" on the unit.
  ☐ AC vent louvres — wipe + open/close test
  ☐ Outdoor condenser — clear leaves, plants 30cm clearance
  ☐ Heat-pump drain pan — check for algae (Tier 1 covers internal;
     this is the outdoor side)
  ☐ Thermostat — verify operates, batteries swapped if low (smart
     thermostat: check wifi connection + app)
  ☐ Ceiling fan — wobble check, oil if squeaking
  ☐ Light bulbs — replace any blown; standardise temperature (warm
     2700K for bedrooms, 3000K for living, 4000K for kitchen / bath)
  ☐ All power points — visual for scorch marks, looseness
  ☐ Switchboard — visual, RCD test (push the T button on each, they
     should trip; reset)

DOORS, WINDOWS, FIXTURES
  ☐ Door handles — tighten screws, lubricate hinges (silicone or
     graphite; not WD-40 long-term)
  ☐ Smart lock — battery level check, code rotation verified per
     BUSINESS CONFIG
  ☐ Door + window seals — visual; replace cracked weather strip
  ☐ Window locks — test
  ☐ Curtain tracks / blinds — operate, check for snag
  ☐ Cupboard doors — soft-close working, hinges tight
  ☐ Drawer slides — open / close, lubricate

SURFACES + GROUT
  ☐ Grout scrub (extends Tier 1 by including all bathroom + kitchen
     splashback)
  ☐ Silicone seals — replace any blackened (cheaper to redo than
     deep-clean repeatedly)
  ☐ Wood floor / tile — visual for damage; spot polish
  ☐ Carpet — vacuum + spot-treat stains (bi-annual professional
     clean is its own line)
  ☐ Wall scuffs — magic eraser or touch-up paint (keep small jar
     of wall-matched paint at the property)
  ☐ Skirtings + door frames — touch-up paint if scuffed

BEDROOM
  ☐ Mattress flip / rotate — every quarter; one-way flip if
     mattress is pillow-top (rotate head-to-foot only)
  ☐ Mattress protector — wash + check for stains
  ☐ Pillows — fold test (return to flat = good; stays folded =
     replace)
  ☐ Bed frame — tighten screws, check for squeak

EXTERIOR
  ☐ Gutters — visual from ground; book a clean if needed (seasonal —
     spring + autumn for deciduous areas)
  ☐ Roof tiles — visual from ground
  ☐ Downpipes — flush check
  ☐ Garden / lawn — tidy if applicable
  ☐ Outdoor furniture — wipe, check for damage, store cushions if
     winter
  ☐ Letterbox — clean
  ☐ House number / address visibility — clear (emergency services
     access)
  ☐ Pest signs — droppings, gnaw marks, ant trails
  ☐ Pool / spa — see Tier 3 if monthly servicing not in place

CONSUMABLES + STOCK
  ☐ All par-levels (skill 07) checked
  ☐ Lightbulb stock (have spares of each type)
  ☐ Welcome-pack stock — toothbrush sets, razor sets, mini-cards
  ☐ Linen rotation — sets count + wash count up to date
  ☐ Spare batteries (AA, AAA, 9V for smoke alarm, CR123 for some
     smart locks)

TECHNOLOGY
  ☐ Wifi — speed test at the property (use a per-property service —
     Speedtest by Ookla). Log result. Flag if <50% of advertised
     speed
  ☐ Router — reboot + check firmware update
  ☐ Smart TV — software update, app login refresh
  ☐ Streaming subs — confirm Netflix / Disney+ / Apple TV current
     (charged to property card)
  ☐ Smart thermostat — software / firmware update
  ☐ Cameras — verify no indoor angles (Airbnb prohibits indoor
     cameras strictly); exterior + entry confirmed in listing

ISSUES FOUND
1. [issue] — photo ref [N] — action: [fix / quote / monitor]
2. ...

QUOTES TO GENERATE (hand off to skill 07 for supplies, skill 06
                    for contractor invoice handling)
- [Item]: [contractor / supply order needed]
- ...

NEXT WALK DUE: [date — 90 days forward]
```

### Outsourcing the quarterly walk

Many operators run the walk themselves, especially single-property
hosts. Multi-property (4+) operators usually pay a handyman to do
it. Typical handyman rate:

- AU: $80-$120/hour + travel
- NZ: NZ$70-$100/hour
- UK: £30-£60/hour
- US: $50-$100/hour
- CA: CA$60-$90/hour

A 1.5-hour walk at $80/hr = $120 per property per quarter. For 5
properties = $600/quarter = $2,400/year. Compared to one missed
maintenance issue causing a $400 emergency callout + a 4-star
review hit = covers itself in one incident.

## Tier 3 — annual safety + compliance

The big-ticket once-a-year items. Many are legally required.
Missing them = insurance void + Aircover void + STR registration
at risk.

### Annual checklist (with regional notes)

```
ANNUAL SAFETY + COMPLIANCE — [Property name]
============================================

LIFE SAFETY
  ☐ Smoke alarm full functionality test (proper sensor test, not
     just battery)
     - 10-year rule: replace the WHOLE UNIT every 10 years
       regardless of test outcome. Date stamped on the back of
       most units. In AU, AS 3786 photoelectric is the spec.
     - In NSW + QLD STR, photoelectric mandatory.
     - In Scotland, interconnected mains-powered + battery
       backup mandatory.
     - In England + Wales, smoke alarm on every floor + heat
       alarm in the kitchen (rentals).
     - In US: per state — most require interconnected; CA
       requires 10-year sealed.
  ☐ CO detector replace at 5-7 years per brand (date stamped)
  ☐ Fire extinguisher professional service:
     - AU/NZ: AS 1851 — annual service tag from licensed servicer
     - UK: BS 5306 — annual service, retag
     - US: NFPA 10 — annual external + 6-year internal + 12-year
       hydrostatic
     - CA: ULC-S536 — annual service tag
  ☐ Fire blanket replace at expiry (typically 5-7 years; sealed
     pack)
  ☐ First aid kit — comprehensive restock, check all expiries

HVAC SERVICE (annual — handed off to skill 06 for invoice)
  ☐ Filter change (in addition to quarterly)
  ☐ Refrigerant pressure check
  ☐ Drain pan + condensate line full clean
  ☐ Capacitor + contactor inspection
  ☐ Outdoor coil deep clean
  ☐ Controls calibration
  ☐ For gas heating component — combustion test, flue spillage,
     CO measurement (licensed gas fitter required)
  ☐ Tag service per region (AS/NZS 5149 / F-Gas UK / EPA 608 US /
     ODSHAR CA)

HOT WATER + PLUMBING
  ☐ Full hot water service:
     - Tank flush (drain sediment)
     - Anode rod check + replace if <50%
     - TPR valve full test
     - Pressure limiting valve test (replace at 5-10 yr per spec)
     - Tempering valve service (residential 50°C delivery
       requirement varies by region)
  ☐ Backflow prevention test (where applicable — commercial-
     classified properties)
  ☐ Drainage CCTV survey every 3-5 years for older properties
  ☐ Septic tank pump-out (if applicable — every 3-5 years per
     household; STR loaded = annual to bi-annual)

GAS APPLIANCE SAFETY CHECK (annual — REQUIRED in many regions)
  ☐ AU: AS/NZS 5601 + state gas safety regulation — annual
     service by Type A licensed gas fitter on all gas
     appliances
  ☐ UK: Annual Gas Safety Check (CP12 certificate) — LEGAL
     REQUIREMENT for any rental including STR. Gas Safe
     registered engineer only. Certificate must be available to
     guests on request.
  ☐ NZ: similar to AU — IPENZ Gas Practitioner
  ☐ US: per state (CSST, gas line, water heater, range)
  ☐ CA: per province (TSSA Ontario, BCSA BC)

ELECTRICAL SAFETY INSPECTION
  ☐ AU: Electrical safety check — RCD test, switchboard check,
     smoke alarm hardwired test (mandatory for some council
     STR registrations)
  ☐ NZ: similar
  ☐ UK: EICR (Electrical Installation Condition Report) — LEGAL
     REQUIREMENT in England (5-year cycle for rentals + STR),
     Scotland EICR required for STL licence, Wales required.
     Registered electrician only. C1 / C2 fails must be remedied
     within 28 days.
  ☐ US: per state; California requires periodic inspection for
     short-term rentals in some jurisdictions
  ☐ CA: per province

PEST CONTROL
  ☐ Annual general pest treatment (ants, cockroaches, spiders,
     silverfish)
  ☐ Termite inspection (REQUIRED in many AU regions — termite
     warranty void without)
  ☐ Rodent check (regions with seasonal rodent migration —
     autumn for NSW, all year for some UK/US regions)
  ☐ Bedbug check (high-traffic STRs are at risk; some operators
     do mattress-protector encasements as preventive)
  ☐ Wasp/hornet nest check (seasonal)

POOL + SPA (if applicable — usually a monthly service plan,
            but annual safety + compliance items here)
  ☐ Pool fence compliance certificate (mandatory in AU — yearly
     inspection in some states)
  ☐ Pool pump service
  ☐ Pool filter clean / replace media
  ☐ Pool water chemistry annual professional balance
  ☐ Spa filter replace
  ☐ Spa cover check + replace if degraded
  ☐ Pool safety signage (depth markers, no-diving where
     applicable)

INSURANCE + COMPLIANCE
  ☐ STR insurance renewal:
     - Sharemaster / ShareCover / Pikl / Proper / Square One —
       review limits + claims history
     - Confirm STR endorsement on building insurance (most
       residential building policies VOID for STR use)
     - Confirm public liability sum insured matches platform
       requirements (Airbnb requires $1M USD via Aircover — but
       independent insurance often gives $5M-$20M)
  ☐ STR registration renewal (60-day flag from this skill):
     - AU NSW: NSW STRA Code of Conduct — annual fee
     - AU VIC: STRA levy quarterly reporting + annual reconcile
     - AU QLD: Brisbane visitor levy quarterly; council-by-
       council elsewhere
     - NZ Auckland: APTR annual rate; Queenstown-Lakes STA
       annual
     - UK Scotland: STL licence — every 3 years, but annual
       compliance review
     - UK Wales: statutory registration scheme — annual renewal
     - UK Northern Ireland: Tourism NI registration annual
     - US NYC: LL18 re-registration every 2 years
     - US SF: STR registration annual
     - US LA: registration annual
     - US Austin: STR licence Type 1/2/3 annual
     - US Honolulu: BMR / NUC annual
     - US Nashville: Type 1/2 annual
     - CA BC: provincial registry annual (Bill 35)
     - CA Toronto: STR by-law annual
     - CA Vancouver: business licence annual
     - CA Montreal: CITQ annual
  ☐ Lodging tax annual reconciliation:
     - Cross-check what the platforms auto-collected vs. what
       was owed (Airbnb auto-collects in many jurisdictions
       but NOT all; Booking less reliably)
     - File any gap with state / city revenue
     - GST/VAT income-tax reconciliation

SUSTAINABILITY + OPERATIONS
  ☐ Hot water + heating temperature audit — match seasonal
     demand
  ☐ Solar panel clean (if applicable)
  ☐ Battery + inverter check (if applicable)
  ☐ Energy bill review — efficiency opportunities

CAPITAL REVIEW
  ☐ Mattress age check (replace at 5 years high-occupancy)
  ☐ Sofa age check (replace at 7-10 years)
  ☐ Appliance age check (replace before next major failure)
  ☐ Listing photos refresh date (re-shoot every 18-24 months OR
     after major refurb)
  ☐ Decor refresh — accent cushions, throws, art — small-budget
     refresh annually keeps the listing photos current
```

### Tier 3 budget per property per year

```
TIER 3 BUDGET — [Property name]
================================
HVAC service:               $200-$400
Hot water service:          $150-$300
Gas safety check (CP12 UK
   etc):                    $80-$150
Electrical inspection
   (EICR ~5-yearly so
   prorate annually):       $50-$150 (annualised)
Fire extinguisher service:  $40-$80
Smoke / CO alarm replace
   (10-yr / 5-yr cycle —
   annualised):             $30-$60
Pest control annual:        $150-$300
Pool / spa annual prof
   service (if applicable): $300-$800
STR insurance:              $400-$1200
STR registration renewal:   $50-$500 (region-dependent)
Lodging tax reconciliation
   (accountant time):       $200-$500
Capital + decor refresh:    $300-$800

Annual Tier 3 total:        ~$2,000-$5,500/property/year
```

For multi-property portfolios, bundle services where possible (one
HVAC contractor for 5 properties = better rate; one electrician
for the EICR round). Budget by property in learnings.md.

## Generate the 12-month calendar

When an operator says "schedule the year for [property]," produce:

```
ANNUAL MAINTENANCE CALENDAR — [Property name] — [Year]
======================================================
Property type:    [whole house / apartment / cabin]
Region:           [region — drives the regional compliance items]
Occupancy target: [%]
Low-occupancy weeks: [list — derived from past year / forecast]

TIER 1 — MONTHLY (12 deep cleans)
  Jan: [date] — low-occupancy slot
  Feb: [date]
  Mar: [date]
  ...
  Dec: [date]

TIER 2 — QUARTERLY (4 walks)
  Q1: [date]
  Q2: [date]
  Q3: [date]
  Q4: [date]

TIER 3 — ANNUAL (booked at specific months)
  Smoke/CO alarm test:           [Jan/Feb]
  Fire extinguisher service:     [Feb]
  HVAC service (pre-summer):     [Sep AU/NZ, Apr UK/US/CA]
  HVAC service (pre-winter
     if dual-cycle):             [Apr AU/NZ, Sep UK/US/CA]
  Hot water service:             [tied to install month]
  Gas safety check (CP12):       [12 months from last — UK legal]
  Electrical EICR:               [5-yr cycle — flag the year due]
  Pest control:                  [seasonal — spring or autumn]
  Pool inspection:               [pre-summer]
  STR insurance renewal:         [12 months from policy date]
  STR registration renewal:      [60-day flag from expiry]
  Lodging tax reconciliation:    [end of financial year]
  Listing photo refresh review:  [18-24 months from last shoot]
  Bi-annual carpet/upholstery:   [twice — spread 6 months]

BI-ANNUAL
  Carpet + upholstery professional clean:  [date 1 + date 2]
  Gutter clean (deciduous areas):          [spring + autumn]

WARRANTY DATES (renewal triggers)
  HWS:       [install date + warranty length]
  HVAC:      [install date + warranty length]
  Mattress:  [purchase date + 5-yr replacement flag]
  Sofa:      [purchase date + 7-yr replacement flag]

REGISTERED CONTRACTORS
  Cleaner (Tier 1 + turnovers): [name + contact]
  Handyman (Tier 2):            [name + contact]
  HVAC tech:                    [name + licence #]
  Plumber + gas fitter:         [name + licence #]
  Electrician:                  [name + licence # + EICR cert ref]
  Pest control:                 [name + chemical reg #]
  Pool tech:                    [name]
  Insurance broker:             [name + policy #]
  Accountant (tax + reg):       [name]
```

## Reminder cycle per item

For each scheduled item:

- **2 weeks out:** message contractor — "Booked for [date] — still
  good?"
- **2 days out:** confirm to contractor + co-host + cleaner
- **Morning of:** "On the way for [property]" + access details
  (gate code, parking, dog)

For 60-day-flag items (STR registration renewal, insurance):

- **60 days out:** surface in weekly report — "Renewal due [date]"
- **30 days out:** generate the renewal application / quote request
- **7 days out:** final-warning surface
- **Day-of:** must be renewed before this date or hosting pauses

## On-site checklist rendering

When a contractor visits, the agent generates the visit-specific
checklist (Tier 3 items are usually one specialist per visit;
Tier 2 walk = consolidated):

For an HVAC service visit, render an HVAC-specific checklist
(handed off to the HVAC contractor — or use the HVAC bundle's
skill 09 checklist directly).

For a plumber visit, render the plumbing checklist (skill 09 from
the plumber bundle).

For a quarterly walk, render the Tier 2 checklist above.

For a Tier 1 deep clean, render the Tier 1 checklist above + send
to the cleaner via the cleaner tool.

## Post-visit report

After every Tier 1, Tier 2, or Tier 3 visit, generate a report:

```
MAINTENANCE VISIT REPORT — [Date]
==================================
Property:      [name]
Visit type:    [Monthly deep clean / Quarterly walk / Annual HVAC
                / Annual gas safety / Pest control / etc.]
Performed by:  [contractor name + licence/cert #]
Visit date:    [date]
Cost:          $[X]  (invoice ref [skill 06 handoff])

SUMMARY
All scheduled tasks completed. [N] items passing inspection;
[M] items flagged for action.

PASS / FLAG SUMMARY
| Category       | Items checked | Pass | Flag | Notes |
|---|---|---|---|---|
| Life safety    | 6             | 6    | 0    | All clear |
| Plumbing       | 8             | 7    | 1    | Bathroom 2 tap drip |
| HVAC           | 4             | 4    | 0    | Filter changed; pressures in spec |
| Electrical     | 3             | 3    | 0    | All RCDs operational |
| Pest           | n/a           | n/a  | n/a  | (separate visit) |

ITEMS REQUIRING ACTION
1. Bathroom 2 — mixer tap drip. Quote for cartridge replacement
   $85 + 30 min labour. Action: schedule with next handyman visit.
2. Smoke alarm in master — install date 2017 — 8 years old.
   Replace within 6 months (10-year rule).
3. Pillow on bed 2 fails fold test. Reorder via skill 07.
4. Wifi speed test at the property — 38 Mbps down (advertised
   100 Mbps). ISP escalation queued.

PHOTOS ATTACHED
- [N] photos: oven before / after, descaled shower head, scorched
  power point (NEW ISSUE FLAGGED to electrician), all life-safety
  units functional.

CONSUMABLES USED + ORDERED
- 200ml descaler, 100ml oven cleaner, 1 mattress protector
   (replaced).
- Reorder via SUPPLY ORDER #[n] — skill 07.

LODGEMENTS (if any)
- Gas safety certificate uploaded to records: [link]
- Fire extinguisher service tag dated [date]
- EICR (if visit) — uploaded, next due [date]

NEXT VISIT DUE
- Next monthly deep clean: [date]
- Next quarterly walk: [date]
- Next annual HVAC service: [date]

Thanks,
[contractor or operator name]
```

Send the report to the operator + archive in learnings.md.

## Handoffs

- **Skill 07 (supplies)** — for any item-replacement order (mattress,
  filter, lightbulb, smoke alarm replacement unit, descaler,
  consumable, linen rotation)
- **Skill 06 (invoice)** — for contractor invoice handling, payment,
  GST/VAT capture, P&L allocation
- **Skill 08 (emergency)** — if a maintenance walk uncovers a
  critical issue (gas leak, electrical hazard, structural)
- **Skill 05 (compliance)** — for STR registration renewal,
  insurance renewal, lodging tax reconciliation
- **Skill 12 (weekly report)** — surface the maintenance budget
  actual vs. target + flag upcoming Tier 3 items in the 60-day
  horizon

## The Cleaner Agent bundle — cross-sell mention

For hosts who don't want to manage cleaners directly (scheduling
the Tier 1 deep cleans, coordinating across multiple properties,
running cleaner SLAs + payments), the **Cleaner Agent bundle**
handles the cleaner's side of the operation. It pairs with this
bundle — this skill schedules + checklist-defines the work, the
Cleaner Agent runs the cleaner's end.

The agent mentions this without pushing — only if the operator
flags they're spending too much time on cleaner ops.

## Hard rules

- **Schedule 12 months ahead, per property.** Tier 2 walks and
  Tier 3 services that are only "planned for later" don't happen.
  Lock the dates.
- **Never skip a Tier 3 compliance item.** Gas safety, electrical,
  fire extinguisher, smoke alarm, STR registration, insurance —
  missing any one of these can void coverage, invalidate the
  listing, or trigger council action.
- **Photo evidence for every Tier 2 + Tier 3 visit.** Especially
  smoke alarm tests, fire extinguisher gauges, HVAC filter
  changes, gas safety certificates. The host-protective record is
  built visit-by-visit.
- **60-day flag for compliance renewal items.** STR registration,
  insurance, EICR — surface in the weekly report 60 days out;
  re-surface at 30, 7, and day-of.
- **Treat the 10-year smoke alarm rule as absolute.** Date stamped
  on the unit. Replace at year 10 regardless of test outcome.
  This is non-negotiable life safety + insurance hygiene.
- **Don't outsource Tier 1 to the turnover slot if it doesn't
  fit.** Take the 1-night block. A rushed deep clean is worse
  than a delayed one.
- **Tier 2 walks are the cheapest preventive spend in the
  operation.** Skipping them to save handyman cost = the most
  expensive false economy. One missed leaking-tap = one $400
  emergency callout + one bad review.
- **Pool fence + pool safety inspections are non-negotiable** in
  AU + many other regions. Operator cannot waive.
- **Mattress + sofa replacement cycles are written down.** Don't
  let the operator "see how it looks" past the cycle — the
  reviews will tell you eventually, but slowly.
- **Listing photo refresh is part of maintenance.** Capital
  refresh + new photos every 18-24 months. Old photos = listing
  rank drop on Airbnb + VRBO.

## Reading the learnings.md

This skill is the recurring spine of the bundle. The operator's
business gets sharper week by week if these patterns are
surfaced in the weekly report:

- **Maintenance spend per property per quarter** — actual vs.
  target (Tier 1 ~2% of revenue, Tier 2 ~$120/qtr, Tier 3
  ~$2-5k/yr)
- **Recurring issues per property** — if the same toilet blocks
  every quarter, the issue isn't the cleaner, it's the toilet.
  Capital fix.
- **Time-to-action on flagged items** — items found in Tier 2
  walks should be actioned within 14 days; longer = pattern of
  deferred maintenance, eventually = bad review
- **Tier 3 compliance status board** — every property, every
  item, current status (in date / 60-day warning / overdue).
  Overdue items = block new bookings until resolved
- **Capital replacement forecast** — 12-month forward look at
  mattresses, sofas, appliances coming due. Surface in the
  weekly report so the operator can budget
- **Cleaner reliability** — Tier 1 deep clean on-time rate, photo
  log completeness, issue-flag rate (a cleaner who flags ONE
  issue per month is doing the job; ZERO flags = not looking)
- **Contractor reliability** — by trade, on-time + price-drift +
  quality patterns. Switch primary in BUSINESS CONFIG if a
  contractor slips repeatedly

## Confirm + handoff

> *"Maintenance scheduled / walked / serviced / renewed: [outcome].
> [Property name] next visit is [date]: [Tier 1 deep clean / Tier
> 2 walk / Tier 3 specific service]. [N] items flagged for action;
> handoff: skill 07 for [supplies] + skill 06 for [invoices]. 60-
> day horizon: [next compliance flag]. Annual maintenance budget
> tracking [under / on / over] by $[X]."*
