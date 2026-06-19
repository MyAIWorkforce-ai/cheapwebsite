---
name: electrician-supplier-ordering
description: Generate a parts order to your usual wholesaler (Rexel, CEF, Sparky Direct, etc.). Format it for paste-in or email. Track delivery against job start date. Flag stockouts that hurt jobs.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Supplier ordering — parts for the next job

## Your job

When a quote is accepted or a job is booked, generate a parts list
for the wholesaler. Match it to the job's actual scope (not just
generic). Track lead time against job start date so you don't show
up without the gear.

## When to order

- **At quote acceptance** — order the bulk of parts for the job
  (switchboard, RCBOs, cable, fittings)
- **Day before the job** — quick top-up if any small parts are short
- **Standing weekly order** — restock van consumables (cable, screws,
  terminals, fuses)

## Trigger this skill when

- A project quote (`03-quote-project.md`) is accepted
- A callout quote (`02-quote-callout.md`) needs non-stocked items
- Operator runs "restock the van"
- A job is at risk because a part is short

## The order template

Format depends on the wholesaler. Most accept:

- **Email order** (slowest but works for all)
- **Trade portal upload** (Rexel app, CEF Trade Direct, Sparky Direct
  online) — agent generates the CSV
- **Phone in** — agent generates a clean list for the operator to
  read off

```
SUPPLIER ORDER — [Wholesaler name]
====================================
Account #:        [from BUSINESS CONFIG]
Order date:       [date]
Reference:        Job-INV-[YYYYMM]-[N] / [Customer surname]
Delivery to:      [Business address]
Delivery date:    [date — at least 1 day before job start]

ITEMS

| Code     | Description                          | Qty | Unit | Subtotal |
|---|---|---|---|---|
| CLP-9512 | Clipsal 32A RCBO Type C              | 6   | $73  | $438     |
| CLP-MS63 | Clipsal main switch 63A 4P           | 1   | $68  | $68      |
| OLEX-25  | Olex 2.5mm twin + earth cable 100m   | 1   | $185 | $185     |
| HEY-T16  | Hellermann T16 terminals (pk 100)    | 1   | $32  | $32      |
| ENC-MET  | Metal switchboard enclosure 12-pole  | 1   | $172 | $172     |

Subtotal:                                              $895
GST/VAT:                                               $89.50
**TOTAL**                                              **$984.50**

DELIVERY NOTES
- Job starts [date]. Parts MUST be delivered by [date — 1 day before].
- Phone [your mobile] if any items are stocked-out so we can swap.

Cheers,
[your name] — [Business name]
```

## Per-wholesaler quirks

| Wholesaler | Region | Notes |
|---|---|---|
| **Rexel** | AU / NZ / UK / US / CA | Best for big-ticket items, slowest for small parts; Rexel app works |
| **CEF (Sparky Direct in AU)** | AU / UK | Strong wholesale price; portal works for trade accounts |
| **City Electric Supply (CES)** | US | Strong local branches; expects in-person pickup often |
| **MM Electrical Merchandising** | AU | Big national, OK pricing, online portal |
| **Sparky Direct** | AU | Online-only, fast for small parts |
| **Lawson HIS / Lawrence Hunt** | UK | Smaller regional, often better service for sparkies |
| **Middendorp** | AU | NSW-focused, strong for HV and commercial |
| **Lights.co.nz / Total Power** | NZ | Strong NZ-specific |
| **Home Depot / Lowes Pro** | US | Only for emergency stockouts; pricing isn't trade-best |
| **Eecol Electric / Westburne** | CA | Major Canadian wholesalers |

If the BUSINESS CONFIG primary wholesaler is listed above, use the
known quirks. If not listed, default to email format.

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

> *"Stockout flag: [item] from [wholesaler] won't arrive until [date].
> Job for [Customer] is booked [date]. Options: (a) call [other
> wholesaler] for a substitute; (b) reschedule the job; (c) split
> the job (do the part you have, finish on second visit)."*

Don't let the operator turn up to a job missing parts.

## Hard rules

- **Always include order ref + job ref** so when parts arrive,
  cross-matching is fast.
- **Always include a delivery deadline** with the job start date as
  context.
- **Markup is on the customer side, not the wholesaler side.** Order
  at trade price; markup happens in the invoice per BUSINESS CONFIG.
- **Track common stockouts in learnings.md** — patterns emerge (some
  wholesalers chronically stock-out particular items). Update the
  primary wholesaler in BUSINESS CONFIG if a pattern is bad.

## Confirm + handoff

> *"Order placed with [wholesaler] for $[X], promised by [date] for
> the [Customer] job on [date]. I'll flag if anything slips."*
