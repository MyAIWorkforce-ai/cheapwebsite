---
name: cleaner-compliance
description: Per-job checklist + sign-off. For bond cleans — regional REIQ / RTA / TDS / DPS checklist + photo evidence pack. For NDIS — Code of Conduct + proof of service record. For commercial — COSHH / SDS daily log + sign-off. For STR — turnover checklist + photo pack. Verifies operator clearances are current before allowing the job to be issued.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Compliance — the checklist + sign-off every job needs

## Your job

After a job is done — or before, for the regulated ones — generate
the correct checklist and sign-off based on:

1. **Region** from BUSINESS CONFIG → maps to the right
   regulatory framework
2. **State / province** for sub-region rules (bond requirements
   especially)
3. **Job type** — bond / NDIS / commercial / STR / recurring
   each has its own checklist + sign-off
4. **Operator clearances** — police check / WWCC / NDIS / DBS /
   vulnerable sector — verified current BEFORE work proceeds

## Region → compliance framework map

| Region | Bond clean framework | NDIS-equivalent | Commercial chem regs | Worker checks |
|---|---|---|---|---|
| **AU — NSW** | NSW Fair Trading + Residential Tenancies Act 2010; bond returned via Rental Bond Board | NDIS Worker Screening + Code of Conduct + Orientation Module | Work Health & Safety Act + SDS for all chems + GHS labelling | Police check + WWCC NSW (where applicable) |
| **AU — VIC** | Residential Tenancies Act 1997 + Consumer Affairs Victoria; bond via RTBA | NDIS as above | OHS Act 2004 + SDS | Police check + Working with Children Check VIC |
| **AU — QLD** | RTA Form 12 condition report; QLD additionally requires pest fumigation cert for many lease end cleans | NDIS as above | WHS Act QLD + SDS | Police check + Blue Card QLD (for working with kids) |
| **AU — WA** | Residential Tenancies Act 1987 (WA); bond via Bond Administrator | NDIS as above | OSH Act + SDS | Police check + WWCC WA |
| **AU — SA** | RTA SA; bond via Consumer Business Services | NDIS as above | WHS Act SA + SDS | Police check + WWCC SA |
| **NZ** | Residential Tenancies Act 1986; bond via Tenancy Services Bond Centre | NZ-specific Children's Worker Safety Check (no direct NDIS analog — disability supports through ACC / Whaikaha) | HSWA + WorkSafe NZ + SDS | Police check + Children's Worker Safety Check |
| **UK** | Housing Act 2004 + bond protection: TDS, DPS, MyDeposits (one of three mandatory schemes); end-of-tenancy inventory check | DBS Enhanced + vulnerable sector for care homes / schools / NDIS-equivalent supports | COSHH 2002 + SDS folder mandatory on site | DBS check (Basic for general, Enhanced + vulnerable sector for care homes/schools) |
| **US** | State-by-state — security deposit return law varies (CA, NY, TX all different); some require itemised return; most states 14-30 days return window | No federal NDIS analog; state Medicaid HCBS waivers cover some recurring residential cleaning for disabled adults | OSHA HazCom 1910.1200 + SDS for every chem + GHS labelling | State-varying — some states require bonded + insured certification + business licence; vulnerable sector + drug screen for care homes/schools |
| **CA — ON** | Residential Tenancies Act; security deposits illegal in Ontario (no bond clean equivalent — but "last month's rent" sometimes treated similarly) | Provincial — Ontario uses Ministry of Children, Community and Social Services for vulnerable sector clearance | WHMIS 2015 + provincial OHSA + SDS | Police check + vulnerable sector check (where applicable) |
| **CA — other** | Provincial — BC, AB, QC each have separate security deposit + condition report rules | Provincial vulnerable sector clearances | WHMIS 2015 + provincial OHSA | Police check + provincial vulnerable sector |

**Default to AU/NSW if region missing in BUSINESS CONFIG. If
state is missing, ask before generating — never guess a
state-specific bond format.**

## The clearance gate — refuse if not held

Before generating a sign-off for any regulated work:

- **NDIS work (AU):** Check BUSINESS CONFIG → NDIS Worker
  Screening Check current AND NDIS Orientation Module
  completed. If either expired / missing → REFUSE. The
  participant's plan can't fund work by uncleared workers.
- **Vulnerable sector (UK aged care, schools, NDIS-equivalent;
  CA same):** Check Enhanced DBS + vulnerable sector / CA
  vulnerable sector. If missing → REFUSE.
- **Working with children (AU family homes with kids present
  during clean, depending on state):** Check WWCC for the
  state. If missing → REFUSE that visit pattern or recommend
  visits when kids not home.
- **Police check current (all regions):** If lapsed → flag
  immediately, decline work that requires it (commercial sites
  often require, residential customers increasingly ask).
- **Public liability current:** If lapsed → REFUSE all work.

If refused, the agent surfaces this to the operator
IMMEDIATELY:

> *"CLEARANCE GATE — [clearance type] is [expired / missing /
> not held] in BUSINESS CONFIG. Can't issue sign-off for
> [Customer], [job type]. Options: (a) update BUSINESS CONFIG
> with current clearance #, (b) sub-out to a cleared partner,
> (c) decline the work."*

## Generate the checklist + sign-off — BOND CLEAN (AU/NZ)

```
BOND CLEAN CHECKLIST + SIGN-OFF
================================
State / region:      [NSW / VIC / QLD / WA / SA / NT / TAS / NZ]
Standards reference: [RTA / RTBA / NSW Fair Trading / NZ Tenancy
                       Services + Bond Centre]
Property address:    [full]
Tenant name:         [name]
Property manager:    [name + agency]
Lease end date:      [date]
Date of clean:       [date]
Crew lead:           [name + police check #, current]

CLEARANCES VERIFIED
☐ Police check current (operator)
☐ WWCC current (if family-home + children present, state-specific)
☐ Public liability current ($[X])
☐ SDS folder on-vehicle

KITCHEN
☐ Oven — internal + door glass + tray + racks (degrease, finish
   wipe)
☐ Stovetop + knobs + griller (degrease, finish)
☐ Rangehood — filter, exterior, light
☐ Splashback — degrease, finish (silicone seal check)
☐ Sink — descale + finish
☐ Tap (kitchen) — descale + finish
☐ Benches — all
☐ Cupboards — fronts (all), insides emptied? Y/N (per agent reqs)
☐ Drawers — insides empty, wipe
☐ Fridge — internal if empty, external (if remaining)
☐ Dishwasher — inside + door seal + filter
☐ Floor — sweep + mop

BATHROOMS (one set per bathroom)
☐ Shower screen — water marks + soap scum
☐ Shower tiles + grout — descale + scrub
☐ Shower floor — descale + scrub
☐ Bath (if separate) — descale + finish
☐ Toilet — bowl + behind + base + cistern + seat (both sides)
☐ Vanity / basin — descale + finish
☐ Mirror — finish
☐ Exhaust vent — dust + wipe
☐ Tap (bathroom) — descale + finish
☐ Towel rail, toilet roll holder, hooks
☐ Floor — sweep + mop

BEDROOMS (one set per bedroom)
☐ Vacuum (carpet) / mop (hard floor)
☐ Skirting boards — dust + wipe
☐ Cobwebs — corners + ceiling
☐ Window sill — wipe
☐ Window track — vacuum + wipe
☐ Wardrobe — inside (mirror, shelving, hanging rail) + outside
☐ Light fitting — dust
☐ Light switches + power points — wipe
☐ Mirror — (if present) finish

LIVING AREAS
☐ Vacuum + mop
☐ Skirting boards
☐ Cobwebs
☐ Window sills + tracks
☐ Blinds — dust + spot wipe
☐ Light fittings — dust
☐ Light switches + power points — wipe
☐ Wall marks — spot clean
☐ Air-con unit — dust filter + exterior

LAUNDRY
☐ Sink (laundry tub) — descale + finish
☐ Tap — finish
☐ Floor — sweep + mop
☐ Cupboards / shelving — wipe
☐ Lint trap (if dryer remaining) — clean

ADD-ONS (if booked)
☐ Carpet steam clean — [N rooms, machine: brand]
☐ Oven deep clean — receipt of degreaser application
☐ External windows — [N windows]
☐ Garage clean — sweep, wipe shelves, cobwebs
☐ Balcony / outdoor — sweep, mop, cobwebs
☐ Pest fumigation cert (QLD only) — [sub-contractor cert #
                                       attached]

PHOTO EVIDENCE PACK (delivered within 1 hr of completion)
☐ Kitchen — wide + close on oven interior + sink + stovetop
☐ Each bathroom — wide + close on toilet base + shower screen
   + tiles
☐ Each bedroom — wide shot
☐ Each living area — wide shot
☐ Laundry — wide shot
☐ Any pre-existing damage (not caused by us) — close shot +
   1-line note
☐ Sent to: [tenant email] + [property manager email]
☐ Sent at: [time, date]

72-HOUR GUARANTEE
Activated at [completion time]. If property manager flags any
item missed within 72 hrs, we attend free of charge to re-clean
that area.

DECLARATION
I confirm the bond clean has been completed to the
[REIQ / RTA / NSW Fair Trading / etc.] standard,
that photo evidence pack has been delivered, and that the
72-hour guarantee applies.

Crew lead signature:     ________________________________
Print name:              [name]
Date / time:             [date, time]

Customer / tenant sign-off (where present):
Signature:               ________________________________
Print name:              [name]
Date:                    [date]
```

## Generate the checklist + sign-off — END-OF-TENANCY (UK)

```
END-OF-TENANCY CLEAN — SIGN-OFF
=================================
Property:           [full address]
Tenant name:        [name]
Letting agent:      [name + agency]
Bond protection scheme: [TDS / DPS / MyDeposits — confirm scheme #]
Inventory check by: [agent / inventory clerk — date + time
                      scheduled]
Date of clean:      [date]
Crew lead:          [name + DBS status — current / N/A]

CLEARANCES VERIFIED
☐ DBS check (Basic / Enhanced) current — [level]
☐ Public liability current — £[X]
☐ Employer's liability current (if staff) — £[X]
☐ COSHH folder on-vehicle
☐ HMRC PAYE current (if staff) / self-employed status confirmed

[Same room-by-room checklist as bond clean above, adapted for
UK terminology — "shower" same, "cooker hood" instead of
"rangehood", "lounge" instead of "living area"]

PHOTO EVIDENCE PACK
☐ Delivered to tenant + letting agent within 1 hour
☐ Sent at: [time, date]

WHAT IF THE INVENTORY CHECK FLAGS ANYTHING
We attend free of charge to re-clean any item the inventory
clerk flags within 72 hours, provided photos show our work
left the area clean. Documentation goes to the bond protection
scheme [TDS / DPS / MyDeposits] in the customer's name.

COSHH SHEET — chemicals used today
[Auto-pulled from the day's chem list — every chem + risk
class + first aid + spill procedure]
[Filed to on-vehicle folder + sent with this sign-off]

Crew lead signature:     ________________________________
Print name:              [name]
DBS status:              [Basic / Enhanced / N/A]
Date / time:             [date, time]
```

## Generate the checklist + sign-off — MOVE-OUT (US)

```
MOVE-OUT CLEAN — SIGN-OFF
==========================
Property:           [full address]
Tenant name:        [name]
Landlord / property manager: [name]
State security deposit law: [reference — e.g. CA Civil Code
                              §1950.5; TX Property Code Ch. 92;
                              NY GBL §7-103]
Date of clean:      [date]
Crew lead:          [name + bonded + insured status]

CLEARANCES VERIFIED
☐ State business license (if required)
☐ Bonded — surety bond $[X], provider [name]
☐ Insured — public liability $[X], workers comp [policy #]
☐ OSHA HazCom — SDS folder on-vehicle
☐ Crew immigration status verified (I-9 on file for W-2;
   1099 contractors verified self-employed)

[Same room-by-room checklist, US terminology — "bathroom",
"living room", "bedroom", "kitchen"]

PHOTO EVIDENCE PACK
☐ Delivered to tenant + landlord within 1 hour
☐ Sent at: [time, date]

WHAT IF LANDLORD WITHHOLDS DEPOSIT
We attend free of charge to re-clean any item the landlord flags
within 72 hours of move-out walk-through, provided photos show
our work left the area clean. Photo pack stands as evidence in
any state security deposit dispute.

SDS — chemicals used today
[Auto-pulled — every chem used + GHS hazard class + SDS link]

Crew lead signature:     ________________________________
Print name:              [name]
State license # (if reqd): [X]
Date / time:             [date, time]
```

## Generate the sign-off — NDIS (AU only)

```
NDIS PROOF OF SERVICE — [Participant first name]
=================================================
Service date:       [date]
Service time:       [start - end, total hours]
Support category:   [Assistance with Daily Life / Household Tasks]
Item code:          [NDIS Pricing Arrangements line]
Plan management:    [NDIA / Plan-managed / Self-managed]

PROVIDER
Business:           [Business name]
ABN:                [#]
NDIS Worker Screening Check: held [#X expiring date — VERIFIED CURRENT]
NDIS Worker Orientation Module: completed [date — VERIFIED CURRENT]
NDIS Code of Conduct: agreed [date]
Worker name:        [name]

TASKS COMPLETED (per service agreement)
[Itemised — match the funded scope]
- [e.g. "Kitchen + bathroom clean, vacuum + mop living area +
  bedroom"]

CONSENT
☐ Participant present during service — yes / no
☐ Photo evidence consent — yes / no (default no for NDIS;
   only with explicit consent)

INCIDENTS / FEEDBACK
☐ Anything raised by participant — log if so
☐ Anything observed worker should report (NDIS Code of
   Conduct safeguarding — wellbeing concern, abuse, neglect)
   — escalate to NDIS Quality and Safeguards Commission on
   1800 035 544 if applicable

INVOICE LINE (auto-generated to billing)
- Service date
- Hours
- Item code
- Rate (per NDIS Price Guide)
- Total

Worker signature:    ________________________________
Print name:          [name]
Worker Screening #:  [X]
Date / time:         [date, time]
```

## Generate the sign-off — COMMERCIAL NIGHTLY

```
COMMERCIAL NIGHTLY — SIGN-OFF
==============================
Site:               [property + address]
Date:               [date]
Arrival time:       [stamped from alarm sign-in]
Departure time:     [stamped from alarm sign-out]
Hours on site:      [calc]
Crew:               [lead + crew names]

TASKS COMPLETED
☐ All WCs (toilets, urinals, basins, restocked)
☐ All kitchens / tea points (benches, sinks, restocked)
☐ Office areas (bins emptied, desks wiped, floors)
☐ Meeting rooms (chairs, tables, whiteboards)
☐ Reception + entry (high-touch sanitised)
☐ Stairs + corridors
☐ Rotation item this visit: [internal glass / fridge /
                              skirting / vents]

ISSUES FOUND (logged for facility manager)
- [None / list items: e.g. "Soap dispenser in WC level 2
  broken — flagged for repair", "Carpet stain in meeting
  room 3 — quoted for steam clean separately"]

SUPPLIES NEEDED FOR NEXT VISIT
- [list low items — toilet paper, hand soap, bin liners]

ALARM SET / DOOR LOCKED
☐ Alarm set — verified before exit
☐ Doors locked — all entries / exits
☐ Lights off

SDS / COSHH
☐ Chems used today (per day's SDS log)
☐ No mixing incidents
☐ PPE worn

Crew lead signature:     ________________________________
Print name:              [name]
Date / time:             [date, time]

[Auto-synced to facility manager via ServiceM8 / Jobber /
CleanTelligent / Janitorial Manager / Swept]
```

## Generate the sign-off — STR TURNOVER

```
STR TURNOVER — SIGN-OFF
========================
Property:           [name + address]
Host:               [name]
Turnover date:      [date]
Guest checkout time: [time]
Next check-in time:  [time]
Window:             [hours]
Crew:               [lead + crew]

TASKS COMPLETED
☐ All beds stripped + remade
☐ All bathrooms cleaned + restocked
☐ Kitchen cleaned + restocked
☐ Living areas cleaned
☐ Floors mopped + vacuumed
☐ Outdoor area swept (if applicable)
☐ Restocks: [list — coffee pods, tea, sugar, paper, soap]

LINENS
- Soiled removed: [count by type — duvet covers, sheets,
  pillow cases, towels, tea towels]
- Clean placed: [count by type]
- Linen drop-off: [laundry name]
- Linen low warning: [if any item under safety stock]

ITEMS FOUND / FLAGGED TO HOST
- [None / list: "1 wine glass chipped — left in kitchen for
  guest claim discussion", "guest left phone charger in
  bedside drawer — bagged + tagged in entry table"]

DAMAGE EVIDENCE (if any)
- Photos: [link]
- Items: [list with photo refs]
- Recommendation: [host to claim via Airbnb damage protection
                    / let it ride / re-stock at host's cost]

PHOTO EVIDENCE PACK
☐ Every room wide finished shot
☐ Beds close shot
☐ Bathrooms close shot (shower screen, toilet, basin)
☐ Kitchen wide + fridge inside
☐ Living wide
☐ Outdoor (if applicable)
☐ Sent to host at: [time]
☐ Pack link: [link]

Crew lead signature:     ________________________________
Print name:              [name]
Date / time:             [date, time]
```

## Generate the sign-off — RESIDENTIAL RECURRING

Lighter than the above. Customer doesn't need a formal checklist
— but the agent maintains an internal record for quality + the
review velocity pattern.

```
RECURRING VISIT — INTERNAL SIGN-OFF
====================================
Customer:           [name]
Property:           [address]
Visit date:         [date]
Visit type:         [weekly / fortnightly / monthly]
Crew:               [name]
Time on site:       [hh:mm — actual vs quoted]

TASKS COMPLETED
☐ Standard scope per contract
☐ Rotation item this visit: [blinds / light fittings /
                              skirting / internal windows /
                              fridge inside]

CUSTOMER REQUESTS THIS VISIT
- [Anything special asked — note it for next visit]

OBSERVATIONS / FLAGS
- [e.g. "tap dripping in bathroom 2 — recommended plumber",
  "saw new pet — will adjust chems / vac kit",
  "customer mentioned moving in 3 months — flag for end-of-
   recurring + bond clean upsell"]

SUPPLIES USED
- [Internal stock tracking]

NEXT VISIT DUE
[date]

Crew signature:      [internal app sign-off]
Date / time:         [date, time]
```

## COSHH / SDS daily log (commercial sites — UK mandatory, AU/US/CA best practice)

For commercial sites, every visit auto-generates a COSHH /
SDS chem log:

```
COSHH / SDS DAILY LOG — [date]
===============================
Site:               [property]
Crew lead:          [name]

CHEMICALS USED TODAY
| Brand           | Product         | Risk class   | First aid           | Spill procedure   |
|---|---|---|---|---|
| Diversey        | Suma Bac D10    | Irritant     | Eye flush 15 min    | Absorb + bag      |
| Diversey        | Glance NA        | Eye irritant | Eye flush 15 min    | Absorb + bag      |
| Selleys         | Sugar Soap       | Skin irritant| Wash 15 min         | Dilute + flush    |
| ...             |                 |              |                     |                   |

PPE WORN
☐ Nitrile gloves
☐ Eye protection (chem mixing)
☐ Mask (if applicable)

INCIDENTS
[None / list]

Crew lead signature: [internal sign-off]
```

Filed to on-vehicle folder + sent with the commercial nightly
sign-off.

## Hard rules

- **Never sign as the cleaner — the human signs.** The agent
  generates the form; the human signs.
- **Never falsify a clearance #.** Never use a fake police
  check / WWCC / NDIS / DBS / bond / insurance reference.
- **Refuse work the operator isn't cleared for.** NDIS without
  Worker Screening, vulnerable sector work without the right
  check — REFUSE. Sub-out or decline.
- **Bond cleans MUST issue a photo evidence pack within 1 hour
  of completion.** This is the deliverable, not a nice-to-have.
- **STR turnovers MUST issue a photo evidence pack within 30
  minutes of completion.** Hosts use these for guest damage
  claims; delay breaks the workflow.
- **Commercial sign-off MUST include the alarm set + door
  locked confirmation.** Insurance hinges on this.
- **NDIS proof of service MUST cite the NDIS Pricing
  Arrangements item code.** Wrong code = invoice rejected by
  plan manager.
- **COSHH / SDS folder MUST be on-vehicle for every commercial
  job.** UK mandatory; AU/US/CA best practice. Operator
  liability is real.
- **Retention period MUST match BUSINESS CONFIG.** Bond
  cleans — 90 days minimum (dispute window covers this).
  Commercial — 12 months typical. NDIS — 7 years (NDIS Code
  of Conduct requirement).

## Workflow

1. Operator says "Generate checklist + sign-off for
   [Customer], [job type]"
2. Agent reads BUSINESS CONFIG → Region + State + operator
   clearances
3. Agent CHECKS THE CLEARANCE GATE — refuses if any required
   clearance missing or expired
4. Agent pulls the right checklist template for the region +
   job type
5. Agent fills in known fields from the quote + dispatch
   records
6. Agent renders the checklist for the crew to use on-site
7. After job: Agent assembles photo evidence pack (where
   applicable) + sign-off
8. Operator reviews + the crew signs (or app sign-off)
9. Pack + sign-off sent to customer / property manager / host
   / facility manager
10. Saved per BUSINESS CONFIG → retention period

## Confirm + handoff

> *"Checklist + sign-off ready for [Customer]: [bond / NDIS /
> commercial / STR]. Clearances verified. Photo pack [delivered
> at X time / pending crew upload]. Loading
> `06-invoice-payment.md` for the invoice."*
