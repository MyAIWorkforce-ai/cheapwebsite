---
name: cleaner-supplier-ordering
description: Generate a chem + kit + consumables order to your usual wholesaler (Jangro UK, Janpro AU, Bunnings cleaning aisle AU, Wesco / Grainger / Uline US, Mister Maid CA, Diversey / Ecolab commercial). Format it for paste-in or email. Track delivery against contract demand. Flag stockouts that hurt jobs.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Supplier ordering — chems + kit + consumables

## Your job

Keep the chems, equipment, and consumables stocked so the crew
never shows up short. Generate orders to the wholesaler matched
to actual demand (recurring contracts drive predictable burn;
bond / post-build cleans spike). Track lead time. Flag patterns
that hurt the business (chronic stockouts of a critical chem).

## When to order

- **Weekly standing order** — restock crew chems + consumables
  (microfibre, mop heads, bin liners, gloves, PPE, refill chems
  for the caddies)
- **Job-triggered** — when a bond clean / post-build clean is
  booked, pre-order anything beyond standard kit (extra
  degreaser, carpet shampoo, specialty chems)
- **Contract-triggered** — for STR turnovers + commercial
  nightly, monthly restock for the restock items (paper, soap,
  bin liners, coffee pods for STR)
- **Low-stock flag** — when the agent notices a chem dropping
  below safety stock from the daily usage log

## Trigger this skill when

- Friday end-of-week (standing weekly order)
- A bond clean or post-build clean is booked >3 days out
- A commercial / STR contract restock cycle hits
- Crew flags low stock during a job
- A job is at risk because a critical chem is short

## The order template

Format depends on the wholesaler. Most accept:

- **Email order** (slowest but works for all)
- **Trade portal upload** (Jangro online, Bunnings PowerPass,
  Wesco trade portal, Grainger.com, Uline.com — agent generates
  the CSV or cart link)
- **Phone in** — agent generates a clean list for the operator
  to read off (or for the counter staff)
- **Walk in** — agent generates a printable shopping list

```
SUPPLIER ORDER — [Wholesaler name]
====================================
Account #:        [from BUSINESS CONFIG]
Order date:       [date]
Reference:        Week-[week#] / Bond-[customer name] / Restock-[contract name]
Delivery to:      [Business address / store pickup]
Delivery date:    [date — at least 1 day before next job needing it]

CHEMS

| Code      | Product                              | Qty | Unit  | Subtotal |
|---|---|---|---|---|
| DIV-7522  | Diversey Suma Bac D10 5L              | 2   | $48   | $96      |
| DIV-7520  | Diversey Glance NA glass cleaner 5L  | 1   | $42   | $42      |
| SEL-225   | Selleys Sugar Soap concentrate 1L     | 6   | $9    | $54      |
| DOM-001   | Domestos bleach 2L                    | 4   | $7    | $28      |
| HAR-002   | Harpic toilet cleaner 750ml           | 8   | $5    | $40      |
| BNA-301   | Bona timber floor cleaner 1L         | 2   | $24   | $48      |
| STO-501   | Stoddard carpet extraction shampoo 5L | 1   | $72   | $72      |
| CLR-101   | CLR rust + lime remover 750ml         | 3   | $14   | $42      |

EQUIPMENT / RE-STOCK

| Code      | Product                              | Qty | Unit  | Subtotal |
|---|---|---|---|---|
| EC-MF-50  | E-Cloth microfibre pack of 50         | 1   | $85   | $85      |
| MOP-FH-12 | Flat mop heads (colour-coded) box 12  | 1   | $52   | $52      |
| GL-NIT-100| Nitrile gloves box of 100 (M, L)     | 2   | $24   | $48      |
| HEPA-NH   | Numatic Henry HepaFlo bags pack 10    | 1   | $28   | $28      |
| BAG-X240  | Bin liners 240L bulk pack             | 1   | $42   | $42      |
| BAG-X120  | Bin liners 120L bulk pack             | 1   | $32   | $32      |

CONSUMABLES — for STR + commercial contracts

| Code       | Product                              | Qty | Unit  | Subtotal |
|---|---|---|---|---|
| TP-2PLY-48 | Toilet paper 2-ply x 48 rolls         | 2   | $48   | $96      |
| HSP-5L     | Hand soap refill 5L                   | 2   | $36   | $72      |
| COF-POD-100| Coffee pods (Nespresso compat) x 100  | 1   | $48   | $48      |
| TEA-50     | Tea bags x 50                         | 2   | $12   | $24      |

PPE
| Code       | Product                              | Qty | Unit  | Subtotal |
|---|---|---|---|---|
| MSK-P2-50  | P2/N95 masks pack 50 (post-build)     | 1   | $42   | $42      |
| GG-CLR     | Safety glasses clear                  | 4   | $8    | $32      |

Subtotal:                                              $[X]
GST/VAT:                                               $[X]
**TOTAL**                                              **$[X]**

DELIVERY NOTES
- Standing weekly order — restock for [week#].
- Anything stocked-out, call [your mobile] — substitutes OK
  for like-for-like (e.g. Suma Bac D10 → Suma Bac equivalent
  fine; substitute chem range NO without confirming).
- Don't substitute carpet shampoo brand — different
  formulations leave residue on different fibres.

Cheers,
[your name] — [Business name]
```

## Per-wholesaler quirks

| Wholesaler | Region | Notes |
|---|---|---|
| **Jangro** | UK | UK trade-cleaner network — buying group of independents. Account-based, deliveries weekly. Strong on Diversey + Ecover commercial range. COSHH sheets auto-attached to every chem. |
| **Janitorial Direct** | UK | UK online + Trade Counter. Faster turnaround than Jangro for small orders. Good on consumables (paper, soap). |
| **Jangro Online** | UK | Same as Jangro but online portal with reorder lists — set up once, reorder one-click. |
| **Bunnings PowerPass** | AU | Bunnings' trade-account program. Cleaning aisle is good for residential-grade chems (Mr Muscle, Selleys, Pine-O-Cleen, Spray and Wipe), microfibre, mops, vacuum bags. Not enough range for commercial Diversey/Ecolab. |
| **Janpro / Cleaner's Warehouse** | AU | Commercial cleaning supply. Strong on Diversey, Ecolab, Tennant chems, commercial-grade equipment. Account-based, deliveries weekly. |
| **Nilfisk-Advance** | AU/UK | Commercial vacuum + scrubber range. Equipment focus, less consumables. |
| **CleanCo / Industrial Cleaning Supplies** | AU regional | Stronger in regional Australia. Worth a check if you're not metro Sydney/Melbourne/Brisbane. |
| **Wesco / Wesco Distribution** | US | Mid-US distributor — good for commercial cleaning chems + paper + soap. Account-based. |
| **Grainger** | US | Industrial supplier. Strong on safety gear, PPE, equipment. Pricey on day-to-day chems compared to Wesco / Uline. |
| **Uline** | US | Massive catalog. Strong on bin liners, paper, bulk consumables. Standard 1-day shipping. |
| **Hillyard / Spartan Chemical** | US | Commercial chem manufacturers — buy direct for accounts, or via distributor. |
| **Sam's Club / Costco Business** | US | Bulk consumables for smaller crews. Not trade pricing but good on toilet paper, hand soap bulk. |
| **Mister Maid** | CA | Canadian cleaning supply. Strong national distribution. |
| **Wesco Distribution Canada** | CA | Same as US Wesco — Canadian arm. |
| **Janitor's Supply** | CA regional | Provincial chains. |
| **Bunzl Cleaning** | UK / AU / NZ | Multi-region distributor of commercial cleaning supplies. Reliable, slightly pricier. |
| **NZ — RJ Distributors / Aotearoa Cleaning Supplies** | NZ | NZ cleaning trade supply. |
| **Mico Wholesale (NZ)** | NZ | Commercial-grade supply. |

If the BUSINESS CONFIG primary wholesaler is listed above, use
the known quirks. If not listed, default to email format.

## Chem-by-job-type cheat sheet (the agent uses this to pre-load
crew supplies)

| Job type | Critical chems |
|---|---|
| Residential recurring | All-purpose (Suma / Selleys / Method); bathroom (Domestos / Harpic / Lysol); kitchen degreaser; glass cleaner; floor cleaner |
| Bond / end-of-tenancy / move-out | Above PLUS: heavy-duty oven degreaser (caustic); descaler (CLR); grout cleaner; mould remover (if any); polish for stainless |
| Post-build | Above PLUS: drywall dust extractor solution; multi-pass general; window film glue remover; tile + grout sealant |
| Commercial nightly office | Commercial range (Diversey Suma / Ecolab Crew); WC sanitiser; floor maintainer; glass; bin liner stock |
| STR turnover | All-purpose; bathroom; kitchen; glass + screens; specialty (between-stays deep) once-monthly |
| Specialty (oven) | Caustic oven degreaser (Oven Pride / Brillo Oven); detail brushes; nitrile heavy-duty gloves; eye protection mandatory |
| Specialty (carpet) | Extraction shampoo (Stoddard / Prochem); pre-treat spotter; deodoriser; ground-in dirt brush; carpet machine |
| Specialty (window) | Glass cleaner; squeegee; window-specific microfibre; ladder + edge protection |
| Specialty (pressure wash) | Concrete cleaner; degreaser; algae killer; pressure machine; PPE |
| Specialty (gutter) | Gutter-vac or scoop kit; ladder; PPE; muck collection bags |
| NDIS in-home | Standard residential chems; allergic / sensory accommodation chems (per participant) |
| Aged care / medical | Hospital-grade disinfectant (Diversey Virex / Hospec); infection control PPE (gloves, mask, gown); colour-coded mops mandatory |

## Brand consistency rules

- **Don't switch chem ranges mid-contract.** Recurring customers
  notice. Diversey → Ecolab swap = customer's house smells
  different = customer complains.
- **Eco-tier customers get eco chems consistently.** Method,
  Mrs Meyer's, Ecover, Earthlust — pre-confirmed with the
  customer.
- **Stone-safe customers get non-acid chems.** Marble,
  travertine, limestone — no citric, no vinegar, no acidic
  bathroom cleaners. Use stone-safe formulations (Method
  Stone, Bona Stone, etc.).
- **Commercial accounts get the contracted brand range.** If
  the contract says "Diversey range", don't substitute Ecolab.
  Some commercial customers audit this.

## STR turnover restock SKU tracking

For each STR host, the agent maintains a restock SKU list:

```
HOST: [name + properties]
RESTOCKS PER TURN
- Coffee pods: [brand + qty per turn]
- Tea bags: [brand + qty]
- Sugar sachets: [qty]
- Hand soap: [refill if low]
- Dish soap: [refill if low]
- Toilet paper: [qty rolls]
- Paper towels: [qty rolls]
- Bin liners: [qty]
- [Optional: snacks, water bottles, specialty items per host
   preferences]

USAGE PATTERN
- Avg [N] turns/month → expected SKU burn / month
- Reorder trigger: 1.5× monthly burn on hand
- Source: [Bunnings PowerPass / Costco / Uline / supermarket
           with trade discount / specialty supplier]
```

## Tracking the order

For each order placed:

```
ORDER #<n> — <timestamp>
Wholesaler:    [name]
Items:         [N line items]
Total:         $[X]
Order ref:     [their ref + your ref]
Promised date: [date]
For job/period: [Customer + job / Week N standing / Restock
                  for contract X]
Status:        [PLACED | CONFIRMED | DELIVERED | PARTIAL |
                STOCKOUT]
```

## When chems / kit don't arrive on time

If the wholesaler has emailed back with a stockout or delay,
surface to the operator IMMEDIATELY:

> *"Stockout flag: Diversey Suma Bac D10 from Janpro won't
> arrive until [date]. Bond clean for [Customer] is booked
> [date]. Options: (a) Diversey Suma Bac (no D10) from Bunnings
> PowerPass available same-day — same active ingredients, slightly
> different concentration; (b) reschedule the bond clean; (c)
> switch to Tennant equivalent for this job and document it."*

Don't let the operator turn up to a job missing chems. For bond
cleans specifically, "no oven degreaser" + "no carpet shampoo"
= failed bond return = 72-hour callback = unhappy customer.

## Hard rules

- **Always include order ref + job/period ref** so when chems
  arrive, cross-matching is fast.
- **Always include a delivery deadline** with the job start
  date as context.
- **Markup is on the customer side, not the wholesaler side.**
  Order at trade price; markup happens in the invoice per
  BUSINESS CONFIG.
- **Track common stockouts in learnings.md** — patterns emerge
  (some wholesalers chronically stock-out particular SKUs).
  Update the primary wholesaler in BUSINESS CONFIG if a pattern
  is bad.
- **PPE is non-negotiable.** Always stocked. Nitrile gloves
  always available; P2/N95 masks for post-build days; eye
  protection for chem mixing; heavy-duty gloves for oven degrease
  + biohazard.
- **SDS sheets MUST be on every chem ordered.** New chem brought
  in → SDS to the folder same day.
- **Never substitute chem chemistry without flagging.** "Same
  active ingredient" is OK; "swap acid for alkaline" is NOT —
  could damage surfaces or harm cleaners.
- **Stone-safe + eco customers get the right chems EVERY visit.**
  No substitution.

## Confirm + handoff

> *"Order placed with [wholesaler] for $[X], promised by
> [date]. Covers [week N standing / bond for X / restock for
> contract Y]. I'll flag if anything slips."*
