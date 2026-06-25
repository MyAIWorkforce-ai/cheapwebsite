---
name: builder-supplier-ordering
description: Generate materials orders to your usual suppliers (Bunnings Trade, Mitre 10 Trade, Travis Perkins, Buildbase, Home Depot Pro, Lowe's Pro, ABC Supply, Rona Pro, cabinetry maker, tile supplier, window supplier). Match to project stage. Track lead times against stage start dates. Manage PC item allowances — flag when client selections are coming in over allowance.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Supplier ordering — materials, PC items, lead times

## Your job

When a contract is signed or a stage is about to start, generate a
materials order list. Match it to the stage's actual scope (not
generic). Track lead times against stage start dates. Flag PC item
selections that exceed allowance BEFORE the order is placed (so
the variation conversation happens in time).

This isn't just "phone in the order." It's lead-time management +
PC item allowance discipline + supplier reliability tracking.

## When to order

- **At contract signing** — order the long-lead items immediately
  (custom cabinetry 6-8 weeks, custom windows 4-6 weeks, specialty
  tile 4-12 weeks if imported, structural steel 2-4 weeks if
  custom cut)
- **Stage minus 1 week** — order regular stage materials (timber
  for frame, plasterboard for fix-out, paint for final coats)
- **Day before subbie arrives** — confirm trade-specific consumables
  (fixings, sundries, what the subbie said they needed)
- **Standing weekly order** — restock site consumables (screws,
  nails, plugs, silicone, tape, PPE, fence repair materials)

## Trigger this skill when

- A project quote (`03-quote-project.md`) is accepted → lock in
  the long-lead orders + the stage-by-stage materials schedule
- A stage is about to start → confirm + top up
- A PC item selection comes in from the client → check vs
  allowance, adjust
- A subbie says "I need X" → quick order if it's a sundry; flag
  variation if it's a scope creep
- Operator runs "restock the van / site shed"
- A stage is at risk because a delivery is delayed

## Step 1 — Build the project materials schedule

At contract acceptance, build the full schedule:

```
MATERIALS SCHEDULE — [Project name]
======================================

LONG-LEAD ORDERS (place at contract signing)
| Item | Supplier | Lead time | Order target | Site need |
|---|---|---|---|---|
| Custom kitchen cabinetry | [Eurolinea] | 8 wks | Week 1 | Week 10 |
| Bi-fold doors 4-panel AWS | [supplier] | 6 wks | Week 1 | Week 8 |
| Sliding window AWS 1800×1200 | [supplier] | 4 wks | Week 1 | Week 8 |
| Glulam beam 5.4m × 290 × 65 | [timber merchant] | 3 wks | Week 1 | Week 4 |
| Imported Italian tile 600×600 (PC ITEM) | [Beaumont] | 8 wks | Week 3 (after PC selection due) | Week 11 |
| Reverse-cycle HVAC 7kW (PC ITEM) | [supplier] | 3 wks | Week 8 | Week 11 |
| Custom stone benchtop | [Stonemason] | 4 wks (after kitchen install) | Week 11 | Week 14 |

STAGE-BY-STAGE ORDERS
| Stage | Items | Supplier | Order target |
|---|---|---|---|
| 1 (Site set-up) | Site fence, temp toilet, skip, sign | [hire co + skip co] | Week 0 |
| 2 (Footings + slab) | Reo F72 + bars cut-and-bent, termite barrier (Kordon), concrete order, pump truck booking | [steel supplier], [Kordon supplier], [concrete plant], [pump hire] | Week 1 (for week 2 use) |
| 3 (Frame) | F7 90×45 studs, LVL 240×45, sole plates, bracing, tie-downs | [timber merchant] | Week 3 (for week 4 delivery) |
| 4 (Lock-up) | Colorbond Surfmist roof sheets, sarking, R5.0 batts, weatherboard, render mix, flashings | [roofing supplier], [insulation supplier], [render supplier] | Week 6 (for week 7) |
| 5 (Fix-out) | Plasterboard, plaster compound, cornice, skirting + architrave, paint (1st coat), waterproofing membrane, tile adhesive + grout | [trade supplier], [paint supplier] | Week 9 (for week 10) |
| 6 (PC) | Tapware (after selection), light fittings (PC items), appliances (PC items), final paint | [Reece], [light supplier], [appliance supplier] | Week 11 (for week 12 onwards) |
```

The whole schedule sits in the project folder + the agent flags
"order due" 1 week ahead of each line.

## Step 2 — PC item allowance discipline

This is the killer skill. PC items are where margin goes to die
in residential building.

When a client sends a PC item selection:

```
CLIENT SELECTION RECEIVED — PC ITEM
====================================
Project:        [name]
Item:           [e.g. Kitchen tapware]
Allowance:      $1,800 (per quote)
Client selected: [Brodware Yokato Industrial — $2,640]
Difference:     +$840
Status:         OVER allowance — variation needed

VARIATION DRAFT
Variation #[N]:
Scope:          Upgrade tapware from PC allowance ($1,800) to
                Brodware Yokato Industrial ($2,640)
Cost difference: $840 + tax + 15% PC markup = $1,038 + tax
Programme:      No impact (item delivered before fit-off)
Client sign-off: Required before order placed

If client signs the variation: order placed.
If client declines: re-select within allowance, item stays
                   at $1,800.
```

Agent surfaces to operator:

> *"PC selection received from [client] for [item]: $840 over the
> $1,800 allowance. Variation drafted — review + send for sign-off
> before ordering."*

For UNDER-allowance selections:

> *"PC selection received from [client] for [tile]: $240 under
> the $1,440 allowance. Credit of $240 applies to next progress
> claim. Order can proceed at $1,200."*

## Step 3 — The order template

Format depends on the supplier. Most accept:

- **Trade portal upload** (Bunnings Trade Centre, Travis Perkins
  app, Home Depot Pro Xtra, Lowe's MyProSite) — agent generates
  CSV or cart link
- **Email order** (most reliable for one-off custom items)
- **Phone in** — agent generates a clean list for the operator
  or supplier counter

```
SUPPLIER ORDER — [Supplier name]
====================================
Account #:          [from BUSINESS CONFIG]
Order date:         [date]
Reference:          [Project name + stage]
Delivery to:        [Project site address]
Delivery date:      [date — at least 1 day before stage start]
Site contact:       [your name + mobile]
Access notes:       [Gate / parking / driveway clearance / forklift
                     access if pallet]

ITEMS

| Code | Description                          | Qty | Unit | Subtotal |
|---|---|---|---|---|
| TBR-7-90-45-3600 | F7 90×45 stud 3.6m       | 80  | $12  | $960     |
| TBR-LVL-240-45-7200 | LVL beam 240×45 7.2m  | 4   | $145 | $580     |
| TBR-GLULAM-CUSTOM | Glulam 5.4m × 290 × 65    | 1   | $1,400 | $1,400 |
| FIX-TIEDOWN-PACK | Cyclone tie-down pack      | 1   | $245 | $245     |
| (etc.)                                                            |

Subtotal:                                              $[X]
GST/VAT:                                               $[X]
**TOTAL**                                              **$[X]**

DELIVERY NOTES
- Site has [access note — e.g. "narrow side access, max 6m truck
   length; drop on driveway"]
- Stage starts [date]. Parts MUST be on site by [date — 1 day
   before stage start].
- Phone [your mobile] if any line is stock-out — substitute
   options pre-cleared:
   - LVL 240×45 7.2m → if stock-out, accept 290×45 7.2m (oversized
     OK)
   - Glulam custom → NO SUBSTITUTE — phone immediately, may need
     to defer stage

Cheers,
[your name] — [Business name]
[Account ref]
```

## Per-supplier notes

| Supplier | Region | Notes |
|---|---|---|
| **Bunnings Trade Centre** | AU / NZ | Largest by far in AU/NZ; mobile app good for trade ordering; counter pickup same-day usually fine; lead time on custom timber 3-5 days; lead time on bagged products usually instant; weak on premium cabinetry, premium tapware (use specialist suppliers) |
| **Mitre 10 Trade** | AU / NZ | Strong second in residential; better than Bunnings on some hardware lines; smaller branch network in metro |
| **Dahlsens, Carter Holt Harvey, etc.** | AU / NZ | Specialist timber merchants — better for custom-cut LVL, glulam, F-grade timber, large beams; trade account essential; better pricing on volume orders |
| **PlaceMakers** | NZ | NZ leading trade supplier; account essential for trade pricing; reliable on schedule for frame timber + plywood |
| **Mitre 10 Mega** | NZ | Strong second; better in regional NZ |
| **Travis Perkins** | UK | UK leading builders' merchant; trade pricing solid; reliable on schedule; good for general building materials |
| **Buildbase** | UK | UK independent network; good pricing on civils + groundworks; counter staff variable by branch |
| **Selco Builders Warehouse** | UK | UK chain; good for trade quick-stop; smaller branch network |
| **Howdens** | UK | UK leader on kitchens (joinery); trade-only; account essential; cabinetry lead time 2-4 weeks |
| **B&Q TradePoint** | UK | TradePoint side of B&Q; OK for top-ups, not best on price for big-ticket |
| **Home Depot Pro Xtra** | US | US national leader; trade pricing solid; reliable on schedule for residential; good for lumber, drywall, paint |
| **Lowe's MyProSite** | US | Strong second to Home Depot; sometimes better on appliance pricing for PC items |
| **ABC Supply / Beacon Roofing** | US | Specialist for roofing + siding; better than Home Depot for serious roofing jobs |
| **84 Lumber** | US | US lumber specialist; better pricing on volume orders + custom cuts |
| **RONA Pro / Home Depot Canada / Home Hardware** | CA | Canadian residential trade — RONA strongest in QC + ON metro |
| **Patrick Morin (QC), Castle Building Centres (Atlantic CA)** | CA | Regional CA suppliers — important for QC where French-language ordering is standard |
| **Eurolinea / [local cabinet maker]** | All | Cabinetry typically goes via local cabinet maker rather than big-box; lead time 6-12 weeks for custom; always order at contract signing |

If the BUSINESS CONFIG primary supplier is listed above, use the
known quirks. If not listed, default to email format.

## Critical lead-time tracking

The agent maintains a watch list of items where late delivery
KILLS the schedule:

```
LEAD-TIME WATCH — [Project name]
==================================
| Item | Supplier | Ordered | Promised | At risk? | Site need |
|---|---|---|---|---|---|
| Custom kitchen cabinetry | Eurolinea | Wk 1 | Wk 9 | ✓ on track | Wk 10 |
| Bi-fold doors AWS | Direct | Wk 1 | Wk 7 | ⚠ supplier confirmed via email Tue | Wk 8 |
| Italian tile (Beaumont) | Beaumont | Wk 3 (waiting PC selection) | Wk 11 | 🚩 PC selection not received yet, slipping | Wk 11 |
| Reverse-cycle HVAC | [supplier] | Wk 8 | Wk 10 | ✓ on track | Wk 11 |
```

Items marked 🚩 (red flag) get surfaced to operator every Friday in
the weekly report.

## Step 4 — Tracking the order

For each order placed:

```
ORDER #<n> — <timestamp>
Project:       [name]
Stage:         [N]
Supplier:      [name]
Items:         [N items]
Total:         $[X]
Order ref:     [their ref + your ref]
Promised date: [date]
Status:        [PLACED | CONFIRMED | DELIVERED | PARTIAL |
                STOCKOUT | LATE]
PC item:       [Y/N — link to allowance + variation if over]
```

## Step 5 — When parts don't arrive on time

If the supplier has emailed back with a stockout or delay:

> *"Stockout flag: [item] from [supplier] won't arrive until
> [date]. Stage [N] for [project] starts [date — same week].
> Options: (a) substitute [alternative spec / brand] available
> same-day from [other supplier] at $[X] difference; (b) defer
> stage [N] by [days] — programme impact + client notification
> required; (c) split the stage — do [the part not depending
> on this material] first, fold in the late delivery when it
> arrives. Which?"*

Don't let the operator turn up to a stage missing materials. Subbies
on standby cost money. Clients watching a half-built house tend to
get nervous.

For long-lead PC items specifically (cabinetry, custom windows,
imported tile), the agent flags 2 weeks BEFORE the promised date
to phone-confirm the supplier:

```
SMS — supplier check-in (2 weeks before promised date):

Hi [supplier contact] — quick check on order #[X] for [project],
promised [date]. On track for that date?

Site stage [N] starts [date + 1 week] and depends on this.

— [your name]
```

## Step 6 — Subbie-driven orders (mid-stage)

If a subbie on site says "I need X to finish today":

```
SMS — operator + agent dialogue:

[Subbie name] says: needs 5L of intumescent sealant + 4 packs of
acoustic batts to finish today.

Quote allowance: covered (we factored 6L sealant + 6 packs batts
in the lock-up materials list).

Options:
(a) Apprentice runs to [nearest supplier] — 30 mins + ~$280
(b) Subbie has it on his truck (check) — instant
(c) Defer the wet area finish to tomorrow — needs subbie back

I'd default to (a) if (b) negative. Confirm?
```

## Hard rules

- **Always include order ref + project + stage** so when parts
  arrive, cross-matching is fast.
- **Always include a delivery deadline** with the stage start date
  as context.
- **Markup is on the client side, not the supplier side.** Order
  at trade price; markup happens in the invoice per BUSINESS CONFIG.
- **Track common stockouts in learnings.md** — patterns emerge
  (some suppliers chronically stock-out specific items on
  specific days).
- **Long-lead items ordered at contract signing.** No exceptions.
  Cabinetry / windows / custom timber + steel / imported tile.
- **PC item selections trigger an allowance check BEFORE order is
  placed.** Over-allowance = variation order + sign-off first.
- **Never substitute a structural item without engineer approval.**
  If LVL 240×45 is stock-out, the upsize substitution (290×45)
  needs engineer sign-off in writing before it's accepted.
- **Reject wrong deliveries.** Don't accept the delivery; sign as
  "rejected, wrong specification"; phone supplier for re-delivery
  + uplift.

## Confirm + handoff

> *"Order placed with [supplier] for $[X], promised by [date] for
> the [project] stage [N] starting [date]. PC item allowance
> check: [PASS / OVER — variation drafted]. Watch-list updated.
> I'll flag if anything slips."*
