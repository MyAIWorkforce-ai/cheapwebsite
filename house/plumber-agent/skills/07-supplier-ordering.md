---
name: plumber-supplier-ordering
description: Generate a parts order to your usual wholesaler (Reece, Tradelink, Wolseley, Ferguson, etc.). Format it for paste-in or email. Track delivery against job start date. Flag stockouts that hurt jobs.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Supplier ordering — parts for the next job

## Your job

When a quote is accepted or a job is booked, generate a parts list
for the wholesaler. Match it to the job's actual scope (not just
generic). Track lead time against job start date so you don't show
up without the cylinder.

## When to order

- **At quote acceptance** — order the big-ticket items (hot water
  cylinders, mixers, toilet suites, vanity units, drainage liners)
- **Day before the job** — quick top-up if any small parts are short
- **Standing weekly order** — restock van consumables (PEX coil,
  copper fittings, washers, O-rings, PTFE tape, jointing compound,
  silicone, flexis, cable ties, fuses for the jetter)

## Trigger this skill when

- A project quote (`03-quote-project.md`) is accepted
- A callout quote (`02-quote-callout.md`) needs non-stocked items
- Operator runs "restock the van"
- A job is at risk because a part is short

## The order template

Format depends on the wholesaler. Most accept:

- **Email order** (slowest but works for all)
- **Trade portal upload** (Reece mobile app, Tradelink portal,
  Wolseley Direct, Ferguson.com) — agent generates the CSV or
  cart link
- **Phone in** — agent generates a clean list for the operator to
  read off (or for the wholesaler counter staff)

```
SUPPLIER ORDER — [Wholesaler name]
====================================
Account #:        [from BUSINESS CONFIG]
Order date:       [date]
Reference:        Job-INV-[YYYYMM]-[N] / [Customer surname]
Delivery to:      [Business address — or branch pickup if same-day]
Delivery date:    [date — at least 1 day before job start]

ITEMS

| Code      | Description                          | Qty | Unit  | Subtotal |
|---|---|---|---|---|
| RHM-491100| Rheem Stellar 360 cont-flow NG       | 1   | $1238 | $1,238   |
| 305242    | Reliance PRV 500 kPa 20mm            | 1   | $40   | $40      |
| 254800    | Tundish kit 20mm                     | 1   | $29   | $29      |
| CCU-1565  | Copper tube 20mm Type B (6m length)  | 1   | $98   | $98      |
| CAP-1502  | Capillary fittings — elbow 20mm pk5  | 1   | $24   | $24      |
| 305800    | Mini-stop 1/4 turn 20mm              | 3   | $10   | $30      |
| 256055    | DECA flexi 1/2"x3/8" 300mm           | 4   | $9    | $36      |
| 254922    | Silver solder + flux (10g pk)        | 1   | $32   | $32      |

Subtotal:                                              $1,527
GST/VAT:                                               $152.70
**TOTAL**                                              **$1,679.70**

DELIVERY NOTES
- Job starts [date]. Parts MUST be delivered by [date — 1 day before].
- Phone [your mobile] if the Rheem unit is stocked-out — Rinnai
  Infinity is the equivalent if available, same connection spec.

Cheers,
[your name] — [Business name]
```

## Per-wholesaler quirks

| Wholesaler | Region | Notes |
|---|---|---|
| **Reece** | AU / NZ | Largest by far in AU/NZ; mobile app is excellent for trade ordering; branch counter is fast for same-day pickup; pricing best on bulk fittings; HWS pre-orders by branch transfer |
| **Tradelink** | AU | Strong second to Reece; better for some commercial brands (Caroma, Methven); branch network thinner in regional areas |
| **Plumbing Plus** | AU | Buying group of independents; pricing very competitive; service depends entirely on the branch |
| **Beaumont Tiles / Beacon Lighting plumbing dept** | AU | Avoid unless retail-style customer wants matching aesthetic; not trade-priced |
| **Plumbing World** | NZ | NZ leader alongside Plumbing & Heating Supplies; good for Rheem and Methven |
| **Mico** | NZ | Strong second; good branch network in regions |
| **Wolseley UK** | UK | UK national wholesaler; strong on Worcester Bosch, Vaillant; trade counter pricing good |
| **Plumbase** | UK | UK independent network; usually beats Wolseley on price for fittings |
| **Screwfix / Toolstation** | UK | For consumables and out-of-hours — pricing isn't trade-best on big-ticket but great for emergency van top-ups (open Sundays in most stores) |
| **Ferguson** | US | US national leader; strong on residential + commercial; trade pricing good for accounts |
| **Lowe's Pro / Home Depot Pro** | US | Emergency stockouts only; pricing isn't trade-best on cylinders |
| **PlumbMaster / Bath & Granite Outlet** | US | Regional value chains; good for renovation projects |
| **Wolseley CA / Bartle & Gibson** | CA | Major Canadian plumbing wholesalers |
| **EMCO** | CA | Strong national CA chain; HVAC + plumbing combined |
| **RONA Pro** | CA | Hybrid retail/trade; OK for top-ups |

If the BUSINESS CONFIG primary wholesaler is listed above, use the
known quirks. If not listed, default to email format.

## Cylinder ordering rules

Hot water cylinders are the highest-stockout-risk item. Always:
- Order the SPECIFIC model + serial range expected
- Confirm with the wholesaler the WHS unit has the correct
  configuration (NG vs LPG; left/right inlet; vented vs unvented)
- Check warranty registration is in the customer's name, not the
  installer's (most manufacturers will register at install time
  via a serial-number portal — Rheem, Rinnai, Bosch, Worcester
  all have this)
- For UK unvented cylinders, confirm WRAS approval status — non-WRAS
  units will fail the G3 inspection

## Tracking the order

For each order placed:

```
ORDER #<n> — <timestamp>
Wholesaler:    [name]
Items:         [N items]
Total:         $[X]
Order ref:     [their ref + your ref]
Promised date: [date]
For job:       [Customer + job]
Status:        [PLACED | CONFIRMED | DELIVERED | PARTIAL | STOCKOUT]
```

## When parts don't arrive on time

If the wholesaler has emailed back with a stockout or delay, surface
to the operator IMMEDIATELY:

> *"Stockout flag: Rheem Stellar 360 from Reece won't arrive until
> [date]. Job for [Customer] is booked [date]. Options: (a) Rinnai
> Infinity 26 from Tradelink available same-day — same connection
> spec, $80 more expensive; (b) reschedule the job; (c) split the
> job — install the gas line + isolation today, swap the unit on a
> follow-up visit when stock arrives."*

Don't let the operator turn up to a job missing parts. For hot water
jobs specifically, "no cylinder" + "no hot water customer" = brand
damage.

## Hard rules

- **Always include order ref + job ref** so when parts arrive,
  cross-matching is fast.
- **Always include a delivery deadline** with the job start date as
  context.
- **Markup is on the customer side, not the wholesaler side.** Order
  at trade price; markup happens in the invoice per BUSINESS CONFIG.
- **Track common stockouts in learnings.md** — patterns emerge (some
  wholesalers chronically stock-out Rheem cylinders on Mondays).
  Update the primary wholesaler in BUSINESS CONFIG if a pattern is
  bad.
- **Cylinder + tundish + PRV ordered together.** Forgetting one of
  the three on a unvented HW job = an unhappy return visit.
- **Gas fittings ordered with the gas component** — never split a gas
  fitting order across two wholesalers if avoidable; thread spec
  variations between brands cause leaks.

## Confirm + handoff

> *"Order placed with [wholesaler] for $[X], promised by [date] for
> the [Customer] [job] on [date]. I'll flag if anything slips."*
