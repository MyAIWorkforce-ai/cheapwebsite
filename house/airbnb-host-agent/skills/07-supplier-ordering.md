---
name: airbnb-supplies-inventory
description: Keep every property stocked. Generate the order — linens, toiletries, kitchen consumables, welcome-pack basics, seasonal extras, replacement furniture — for the right supplier per region (Spotlight / Dunelm / Walmart / Costco / Bunnings / Mitre Linen / Hotel Resource), formatted for paste-in or cart upload. Track par-levels per property. Flag low stock before the cleaner runs out mid-turnover.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Supplies + inventory — keep every property stocked

## Your job

A property that runs out of toilet paper at 9pm on a Saturday earns
a 3-star review. A bed without a third set of sheets in the cupboard
forces the cleaner to delay the turnover. A coffee machine without
pods on day 1 is in every "things-we-noticed" review paragraph.

This skill is the unglamorous spine of the operation. When stock
gets low, the agent generates an order — to the right supplier for
the region, at the right tier for the property — and tracks it
through to delivery. It also runs the annual linen-rotation
schedule and the multi-year replacement cycle (mattresses, sofas,
appliances).

## When to trigger this skill

- Cleaner reports low stock during turnover (skill 04 surfaces this)
- Par-level tracker (in this file or learnings.md) shows count
  below threshold
- A bed linen set has been laundered too many times (>50 washes
  rule of thumb for budget; >100 for mid; >200 for high-tier)
- Seasonal change — heater out, fan in (or vice versa)
- Annual replacement cycle hits — mattress at 5 years, sofa at 7,
  pillows at 12 months, mattress protectors at 12 months
- Operator runs "restock [property]" or "restock all"
- A consumable runs out mid-stay (emergency reorder via local
  same-day delivery)

## The 3-set linen rule

Every bed, every property, needs **three full sets of linen** in
rotation. At any moment:

- **Set 1:** on the bed
- **Set 2:** in the cupboard, clean, ready for next turnover
- **Set 3:** at the laundry / in the wash / drying

This is non-negotiable for any property doing back-to-back
turnovers. Two sets means the cleaner is waiting on a wash cycle.
One set means the property doesn't turn over the same day.

The agent tracks every set by property:

```
LINEN ROTATION — [Property name]
================================
Beds:
  Master king:
    Set A — purchased [date], wash count [N], on bed
    Set B — purchased [date], wash count [N], in cupboard
    Set C — purchased [date], wash count [N], at laundry
  Second queen:
    Set A — [date] / [washes] / on bed
    Set B — [date] / [washes] / in cupboard
    Set C — [date] / [washes] / at laundry
  Sofa bed / trundle (if used):
    Set A — [date] / [washes] / in cupboard
    Set B — [date] / [washes] / in cupboard

REPLACEMENT TRIGGERS
  Sheets at 100+ washes (mid-tier) → reorder + retire to back-up
  Pillowcases at 100+ washes → reorder
  Duvet cover at 80+ washes (more wear, washed every stay) → reorder
  Towels at 75+ washes → demote to "cleaner rag" or replace
  Mattress protector annually → replace regardless
  Pillows annually → replace regardless
```

Order one replacement set per property per year as a baseline. More
if the property runs >75% occupancy.

## Linen brands by region + tier

Match the property's pricing tier (BUSINESS CONFIG → base rate
band).

| Tier | Indicator | AU/NZ | UK | US | CA |
|---|---|---|---|---|---|
| **Budget** | <$150/night | Big W / Kmart Anko / Target AU | Argos / Wilko / Dunelm Essentials | Walmart / Target / Wayfair Basics | Walmart CA / Canadian Tire |
| **Mid** | $150-$350/night | Sheridan Outlet / Adairs / Bed Bath N' Table | White Company / Dunelm / John Lewis Any Day | Hotel Collection / Wamsutta / Brooklinen / Boll & Branch | Bouclair / Linen Chest / Simons |
| **High** | >$350/night | Sheridan / Cultiver / I Love Linen / Bemboka | The White Company / Volga Linen / Soak & Sleep | Sferra / Frette / Matouk / Boll & Branch Signature | Au Lit / Frette CA / QE Home |

Region-aware default — for an Edinburgh STL mid-tier property, the
agent quotes Dunelm + White Company, not Sheridan.

For volume purchasers, commercial linen suppliers are cheaper per
unit:

- **AU:** Spotless (commercial laundry + linen supply), Alsco,
  Linen House Hotel
- **NZ:** Briscoes (semi-commercial), Linen House NZ
- **UK:** Mitre Linen, Vision Linens, Out of Eden
- **US:** Hotel Resource, American Hotel Register, H&L Russel
- **CA:** Linen Chest commercial, Whitehall Hospitality

For 5+ properties or for any property running >80% occupancy, switch
to a commercial supplier — same look, half the cost per set, and
they replace faded sets on a service contract.

## Toiletries — two camps

### Camp 1: Refillable dispensers (preferred for most operators)

Sustainability-conscious, saves real money, modern guest expectation.
The agent recommends:

- **Brand-neutral dispensers:** wall-mounted 250ml or 350ml — Marius
  Fabre, Davids, generic salon dispensers (Bunnings / Amazon / IKEA
  Tagghult)
- **Bulk refill product:** shampoo / conditioner / body wash / hand
  soap — 5L jugs

Bulk refill suppliers:

- **AU:** Body Care Australia, Aussie Soap Supplies, Earthwise
- **NZ:** Ecostore bulk, Earthwise NZ
- **UK:** Bramley Bath & Body, Faith In Nature 5L, Pure & Essential
- **US:** Plaine Products, Beekman 1802 Bulk, Pure Bare, Aromas of
  Eden
- **CA:** Live Clean bulk, The Soap Dispensary

A 5L jug of shampoo at ~$45 refills 20 × 250ml dispensers — works
out to ~$2.25 per dispenser fill. Compare to per-bottle mini at
$1-$3 each, used by one guest, landfilled.

### Camp 2: Mini-bottles (boutique tier, no compromise)

For high-tier properties where the bathroom is part of the brand:

- **AU/NZ:** Appelles, Hunter Lab, Salt & Stone, Aesop (top tier),
  Bondi Wash, Therapie
- **UK:** Bramley, Cowshed, Molton Brown, ESPA, Aromatherapy
  Associates
- **US:** Lather, Beekman 1802, Malin + Goetz, Aesop, Le Labo
- **CA:** Rocky Mountain Soap, Province Apothecary

Algotherm and similar marine-spa brands ship globally and tend to
look more premium per dollar than the equivalent domestic brand.

Cost per stay: $3-$8 for mini-bottles. Worth it only above ~$400
ADR.

## The welcome-pack consumables list

Every property needs these on every check-in, full and untouched.
The agent tracks par-levels and triggers a reorder when a property
runs below.

```
WELCOME-PACK CONSUMABLES — per property, per turnover
=====================================================
KITCHEN
  Ground coffee or pods (12+ pods / 250g ground)
  Tea — black + herbal selection (12+ bags)
  Sugar (small jar — refilled, not single-use sachets)
  Milk — long-life UHT 1L (in fridge for next-day arrival)
  Salt + pepper (mills, not sachets)
  Olive oil — small bottle, 250ml (refilled from bulk)
  Dishwasher tabs (10+ — covers 4-5 night stay)
  Dish soap (full bottle)
  Sponges + dishcloth (1 fresh per turnover)
  Paper towel roll (1 minimum, 2 ideal)
  Sandwich wrap / cling film + foil (partial roll OK)
  Bin liner — fresh in every bin
  Tea towels (2 clean per turnover)

BATHROOM (per bathroom)
  Toilet paper (4+ rolls — never less; brand: Quilton / Andrex /
                Charmin / Cottonelle / Cashmere)
  Hand soap (full pump bottle or dispenser)
  Shampoo / conditioner / body wash (refilled or fresh minis)
  Tissue box (full)
  Cotton buds + cotton pads (small jar)
  Hairdryer (functional — check every turnover)
  Toothbrush + paste (sealed welcome packs, 2 sets)
  Razor + small shaving cream (sealed, 1 set)

LAUNDRY (if guest-accessible)
  Laundry pods (4+ — covers a typical stay)
  Stain spray (Vanish / Shout / OxiClean)
  Iron + board (functional, hair-free)

LIVING / BEDROOM
  Hand wash next to sink (full)
  Reed diffuser or refresh spray (low-allergen — avoid heavy
                                    perfume in case of asthma)
  Phone chargers (USB-C + Lightning + Micro USB) — bedside

GUEST INFO / BRAND
  Welcome card (printed or digital)
  House guide (printed or QR to digital)
  Local guide (printed cafes/walks/emergency map)

WIFI + STREAMING
  Wifi card (printed, laminated, on fridge or bedside)
  Streaming login card (if Netflix / Disney+ / Apple TV provided)
```

Stock spreadsheet per property, par-level vs current count:

```
PAR-LEVEL TRACKER — [Property name]
====================================
Item                      | Par | Current | Lead time | Reorder when
Quilton toilet paper      | 24  | 8       | 2 day     | < 12 ←
Dishwasher tabs (Finish)  | 60  | 14      | 2 day     | < 20 ←
Laundry pods (Cold Power) | 40  | 35      | 2 day     | < 15
Shampoo refill 5L         | 1   | 0.3 L   | 5 day     | < 0.5L ←
Conditioner refill 5L     | 1   | 0.6 L   | 5 day     | < 0.5L
Body wash refill 5L       | 1   | 1.0 L   | 5 day     | < 0.5L
Hand soap refill 5L       | 1   | 0.4 L   | 5 day     | < 0.5L ←
Coffee pods (Vittoria)    | 60  | 18      | 2 day     | < 24 ←
UHT milk 1L               | 6   | 3       | 2 day     | < 3 ←
Salt mill refill          | 1   | 0.5     | 5 day     | < 0.3
Pepper mill refill        | 1   | 0.7     | 5 day     | < 0.3
Olive oil 5L              | 1   | 1.2 L   | 5 day     | < 0.5L
Welcome card stock        | 50  | 14      | 7 day     | < 20 ←
Toothbrush packs          | 20  | 6       | 5 day     | < 10 ←
Razor packs               | 20  | 11      | 5 day     | < 10
Linen Set C (king)        | 1   | washing | n/a (rot) | n/a
Tea towels                | 12  | 6       | 5 day     | < 6 ←
Bath towels (white)       | 16  | 10      | 5 day     | < 8
```

Items flagged with ← are below reorder threshold — agent generates
the order.

## Where to order — by region

### Australia

| Category | Primary | Backup | Bulk / commercial |
|---|---|---|---|
| Linen | Adairs / Sheridan Outlet / Big W | Kmart / Target / Bed Bath N' Table | Linen House Hotel, Alsco |
| Toiletries (bulk) | Body Care Australia | Aussie Soap Supplies | Earthwise |
| Consumables (kitchen / paper) | Costco AU | Bunnings | Officeworks bulk |
| Mattresses | Koala / Sealy / Sleeping Duck | Snooze / Forty Winks | Hotel-spec via Hospitality Beds Australia |
| Furniture replacement | Freedom / IKEA / Castle | Amart | Hospitality contract via Nufurn |
| Appliances | The Good Guys Commercial | Harvey Norman | Winning Appliances |
| Welcome packs (toothbrush / razor / mini sets) | Amazon AU | Catch.com.au | Hospitality Wholesale Direct |

### New Zealand

| Category | Primary | Backup | Bulk |
|---|---|---|---|
| Linen | Briscoes / The Warehouse | Farmers / Smith & Caughey's | Linen House NZ |
| Toiletries | Ecostore bulk | Earthwise NZ | Body Care imports |
| Consumables | Bunnings NZ | Mitre 10 / PaknSave | Gilmours wholesale |
| Mattresses | Sleepyhead / Sealy NZ | The Bed Shop | Hotel-spec via Innerspring NZ |
| Furniture | Freedom NZ / Nood | The Warehouse | Trade Tested |

### United Kingdom

| Category | Primary | Backup | Bulk / commercial |
|---|---|---|---|
| Linen | Dunelm / The White Company / John Lewis | Argos / IKEA | Mitre Linen, Vision Linens |
| Toiletries | Bramley / Faith In Nature 5L | Pure & Essential | Pacific Direct (hospitality) |
| Consumables | Amazon UK / Costco UK | Wilko (legacy) / B&M | Bookers / Makro (Metro) |
| Mattresses | Simba / Emma / Silentnight | IKEA / Dreams | Hypnos Contract / Harrison Spinks |
| Furniture | IKEA / John Lewis / Dunelm | Habitat / Made.com (Next) | Contract Chair / Knightsbridge |
| Welcome packs | Amazon UK | Lakeland (kitchen) | HotelXtras |

### United States

| Category | Primary | Backup | Bulk / commercial |
|---|---|---|---|
| Linen | Target / Walmart / Boll & Branch / Brooklinen | Costco / Macy's | Hotel Resource, American Hotel Register, H&L Russel |
| Toiletries | Plaine Products / Beekman bulk | Aromas of Eden / Pure Bare | Whispering Willow Hospitality |
| Consumables | Costco / Walmart / Amazon US | Sam's Club / Target | Restaurant Depot, US Foods |
| Mattresses | Tempur-Pedic / Sealy / Saatva | Casper / Tuft & Needle | Serta Contract, Simmons Hospitality |
| Furniture | Wayfair / IKEA / West Elm | Article / Pottery Barn | Crate & Barrel Hospitality, Hotel Furniture Outlet |
| Welcome packs | Amazon US | Hotel Resource | American Hotel Register |

(Note: Bed Bath & Beyond closed 2023 — listed as RIP. Overstock
rebranded to Bed Bath & Beyond online; pricing inconsistent. Use
Wayfair or Target instead for fast replacements.)

### Canada

| Category | Primary | Backup | Bulk / commercial |
|---|---|---|---|
| Linen | Linen Chest / QE Home / Costco CA | Bouclair / Simons / Hudson's Bay | Linen Chest commercial, Whitehall Hospitality |
| Toiletries | Live Clean bulk | The Soap Dispensary (Vancouver) | Spa Sense Wholesale |
| Consumables | Costco CA / Walmart CA / Amazon CA | Canadian Tire / Real Canadian Superstore | Sysco CA, GFS |
| Mattresses | Sealy CA / Endy / Casper CA | IKEA CA / Sleep Country | Springwall Contract, Marshall Mattress |
| Furniture | IKEA CA / Bouclair / Structube | The Brick | Nufurn Canada (rare), contract via Linen Chest |
| Welcome packs | Amazon CA | Costco CA | Linen Chest Commercial |

## The order template (paste-ready)

```
SUPPLY ORDER — [Supplier name]
===============================
Account #:        [from BUSINESS CONFIG if trade account, else "retail"]
Order date:       [date]
Reference:        Property [name] + [reorder | seasonal | replacement]
Delivery to:      [address — property or central if you stage]
Delivery date:    [date — at least 2 days before next turnover]

ITEMS

| SKU / Code   | Description                              | Qty | Unit     | Subtotal |
|---|---|---|---|---|
| 9311428...   | Quilton Gold 3-ply 24-pack toilet paper  | 2   | $26.00   | $52.00   |
| 9415077...   | Finish All-in-One 60 tabs                | 1   | $24.00   | $24.00   |
| —            | Cold Power Sensitive 60 pods             | 1   | $32.00   | $32.00   |
| Refill-SH-5L | Body Care Australia shampoo 5L           | 1   | $48.00   | $48.00   |
| Refill-CO-5L | Body Care Australia conditioner 5L       | 1   | $48.00   | $48.00   |
| Refill-HS-5L | Body Care Australia hand soap 5L         | 1   | $42.00   | $42.00   |
| —            | Vittoria espresso pods 60-pack           | 1   | $34.00   | $34.00   |
| —            | UHT full-cream milk 1L × 12              | 1   | $24.00   | $24.00   |
| WP-TB-x20    | Sealed toothbrush + paste mini × 20      | 1   | $36.00   | $36.00   |
| WP-RZ-x20    | Sealed razor + shave cream mini × 20     | 1   | $28.00   | $28.00   |
| —            | Tea towels white waffle × 12             | 1   | $48.00   | $48.00   |
| LIN-K-S      | Sheridan Outlet sheet set king (Set D)   | 1   | $195.00  | $195.00  |

Subtotal:                                                       $611.00
GST/VAT:                                                        $61.10
**TOTAL**                                                       **$672.10**

DELIVERY NOTES
- Next turnover [date]. Order must arrive by [date — 2 days before].
- New linen Set D will rotate in as Set A retires (135 washes).
- If shampoo 5L jug is short, substitute conditioner ratio to 1.5×
  and ship makeup on next week's order.

— [your name], [Trading as], [property name]
```

For supermarkets / non-account suppliers, generate a shopping list
the operator (or VA) can run instead. For trade accounts, send via
email or upload to the supplier's portal/app.

## Per-supplier quirks

| Supplier | Region | Notes |
|---|---|---|
| **Costco** | AU/NZ/UK/US/CA | Best on bulk paper, dishwasher tabs, laundry pods, UHT milk, batteries. Membership required. Pickup or local same-day delivery (Instacart US, Same-Day AU). |
| **Bunnings** | AU/NZ | Best for cleaning consumables, batteries, lightbulbs, garden, gas bottle swap. Trade account = 5% off. |
| **Spotlight** | AU | Best linen retail outside Sheridan Outlet; Verandah House towels good mid-tier. |
| **Sheridan Outlet** | AU/NZ | The "secret" tier under Sheridan retail — same quality, factory-second pricing. Order via outlet website not retail. |
| **Hotel Resource** | US | Commercial supplier; pack sizes start at 12/24/48. Pricing 30-50% below Target / Walmart on like-for-like sheets and towels. Account application takes 2 weeks. |
| **Mitre Linen** | UK | UK's commercial linen leader. Hotel-grade percale, 200-300 thread count, washable >200 times. Account opens fast. |
| **Vision Linens** | UK | Second to Mitre. Better for unusual sizes (UK super king vs Emperor). |
| **Plaine Products** | US | Sustainable refillable shampoo, conditioner, body wash. Subscribe-and-save discount. Glass bottle return option. |
| **Amazon Business** | All | Account = invoice billing, multi-user, tax exempt where applicable. Worth it for any operator above 3 properties. |
| **Costco Business Centre** | US (limited cities) | Restaurant-supply pricing; not all SKUs in standard Costco. |
| **IKEA** | All | Best on cheap-and-cheerful furniture (DUVHOLMEN duvet inner, KNOPPA pillows, GULLINGEN frames); avoid for mattresses. Furniture rentals via TaskRabbit / Airtasker for assembly. |
| **Linen Chest** | CA | The Costco-of-linen for Canadian portfolio operators. Hotel collection runs commercial-grade. |

If the BUSINESS CONFIG primary supplier is listed above, use the
known quirks. If not listed, default to email format + 5-business-day
lead time.

## Bulk furniture replacement — the multi-year cycle

Mattresses, sofas, dining chairs, and large rugs are the
high-ticket replacements. The agent surfaces these on a 12-month
forward-look:

| Item | Replace at | Indicator |
|---|---|---|
| Mattress | 5-7 years (residential), 3-5 years (high-occupancy STR) | Sagging visible at edges, springs felt through, multiple guest comments on "uncomfortable bed" |
| Mattress protector | Annually | Yellowing not removable, elastic gone |
| Pillows | Annually (per body) | Fold test fail — pillow stays folded |
| Sofa | 7-10 years | Cushion sag, fabric pilling, frame creak, reviews mentioning |
| Dining chairs | 5-8 years | Wobble, fabric stain, finish wear |
| Coffee table | 10+ years | Cosmetic damage past polish |
| Bed frame | 10-15 years | Joint failure |
| Rug (high-traffic) | 3-5 years | Matting, stains past clean |
| Bath towels (white) | 12-18 months | Greying past whitener, fraying |
| Pots + pans | 3-5 years | Non-stick coating gone, warping |
| Toaster / kettle | 3-5 years | Element failure or seal failure |
| Coffee machine | 3-7 years | Pressure drop, descale failing to fix |
| Smart TV | 7-10 years | OS no longer supported, app removals |
| Smart lock battery | 6-12 months | Low-batt warning |
| Smoke alarm | 10 years (full unit replacement — REGULATED) | Date stamped on unit; see skill 09 |

### Mattress brand recommendations

Match the property tier. Don't put a Frette duvet over a Big-W
mattress, and don't put a Tempur mattress in a backpacker hostel.

| Tier | AU/NZ | UK | US | CA |
|---|---|---|---|---|
| Budget ($150-300 mattress) | Koala basic / IKEA HAUGSVÄR | IKEA / Argos Hypnos starter | Zinus / Allswell | IKEA CA / Endy basic |
| Mid ($400-900) | Koala / Sealy Posturepedic / Sleeping Duck | Silentnight / Sealy UK / Emma | Casper / Saatva / Tuft & Needle | Endy / Casper CA / Sealy CA |
| High ($1000+) | Tempur / Sealy Premium / King Living | Tempur / Vispring / Hypnos | Tempur-Pedic / Stearns & Foster / Saatva Classic | Tempur CA / Springwall Luxe |

The hotel-spec route: **Sealy Hospitality, Serta Contract, Hypnos
Contract, Springwall Contract** sell direct to operators with
volume discounts. Worth it above 5 properties.

## Seasonal extras

The agent flips the seasonal stock list with the calendar:

```
SEASONAL FLIP — [Property name] — [Spring → Summer | Autumn → Winter]
=====================================================================
SUMMER IN (Spring → Summer or Northern May / Southern Nov)
  ☐ Pedestal fans (1 per bedroom + 1 living)
  ☐ Window-rated portable AC if no installed AC
  ☐ Extra ice tray + ice bucket
  ☐ Beach towels (separate from bath towels, 2 per guest)
  ☐ Sunscreen (welcome basket sample size SPF 50)
  ☐ Insect repellent + plug-in (region-relevant)
  ☐ Pool toys + noodles (if pool)
  ☐ Beach chairs / umbrella (if coastal)
  ☐ Citronella candle (outdoor)
  ☐ BBQ check — gas bottle level, clean grill
  ☐ Lighter rugs / cushion covers (swap from winter throws)

SUMMER OUT / WINTER IN (Autumn → Winter)
  ☐ Pedestal fans out (clean + store)
  ☐ Heaters (1 per main room — column or panel)
  ☐ Extra blankets (1 per bed, on the shelf not the bed)
  ☐ Hot water bottle (if matches property brand)
  ☐ Heavy throw on sofa
  ☐ Slippers (sealed packs, welcome basket)
  ☐ Tea + cocoa basket extras
  ☐ Firewood + kindling (if fireplace; check chimney swept annually)
  ☐ Door draft stoppers (if old building)
  ☐ Boot scrape / mud mat at entry
  ☐ Heavier duvet (winter tog 13.5) swap with summer tog (4.5)
```

In the Southern Hemisphere, the agent runs this in October
(summer in) and April (winter in). Northern Hemisphere: April and
October.

For pool / beach properties, also flip the outdoor furniture set,
covers, and pool chemicals — outside the scope of this skill but
flagged to skill 09 maintenance cycle.

## Tracking the order

For each order placed:

```
SUPPLY ORDER #<n> — <timestamp>
Supplier:        [name]
Property:        [property name]
Items:           [N items]
Total:           $[X]
Order ref:       [their ref + your ref]
Promised date:   [date]
Status:          [PLACED | CONFIRMED | DELIVERED | PARTIAL | STOCKOUT]
For next turnover: [date]
```

Carry the running list in learnings.md so each week's report can
show actual supply spend per property vs. target (see skill 12).

## When stock runs out mid-stay

It happens. Guest texts: "no more toilet paper." Options ranked
by speed:

1. **Same-day delivery from local supermarket** — Coles/Woolies AU,
   Countdown NZ, Tesco UK, Instacart/Amazon Fresh US, Loblaws CA.
   1-2 hour window in major cities. Charge to the property card.
2. **Cleaner / co-host drop** — if within 20 min, the cleaner runs
   it. Pay them a callout fee ($30 typical).
3. **Apologetic note + guest reimbursed** — text the guest "Top up
   from the corner shop if you can — keep the receipt, I'll
   reimburse, sorry about that, I'll restock today."

Always option 1 for the basics — toilet paper, coffee, dishwasher
tab. The guest reviewing "ran out of TP and host made me go buy
it" is a 4-star review at best.

After the emergency: top up par-level in the tracker + check what
caused the miss (cleaner forgot to flag, par was too low, last
guest was high-use group). Update learnings.md.

## Hard rules

- **3 linen sets minimum, every bed.** Don't compromise. Two sets
  = late turnovers eventually.
- **Order at least 2 business days ahead of the next turnover.**
  Lead time misses = empty welcome basket = guest review hit.
- **Bulk refills beat mini bottles outside the highest tier.**
  Environmentally + financially. Mini-bottles only above $400 ADR.
- **Never substitute a guest-facing item below the property tier.**
  A high-tier guest knows the difference between Frette and Anko
  sheets. Don't try to slip a tier down "just this once."
- **Track par-levels per property — not aggregate.** Aggregate
  hides the property that's chronically short.
- **Receipt every order in learnings.md.** Supply spend per
  property is a real P&L line — skill 12 needs it.
- **No supplier monopoly.** Maintain a backup for every category
  in case the primary is stocked out. The agent should always
  have a "plan B" supplier in the order template.
- **Welcome basket consumables are NOT optional.** Coffee, tea,
  milk, salt, pepper, oil, toilet paper, dishwasher tab. Every
  turnover. Every property. This is the "5-star vs 4-star"
  threshold for most guests.

## Reading the learnings.md

Track on supplies:

- **Supply spend per property per stay** (target: 4-7% of nightly
  rate per stay — i.e. $9-15 per $200 stay)
- **Stockout incidents per quarter** (target: 0 — every one is a
  review risk)
- **Linen replacement cadence** — too often = paying for low-quality
  sets; too rarely = old sets at guest visibility
- **Supplier on-time rate** — flag if a primary supplier has slipped
  twice in a quarter; switch primary in BUSINESS CONFIG
- **Seasonal flip on-time** — has the property had heaters out by
  June 1 / fans in by November 1? Late flips = guest complaints
  on temperature

## Confirm + handoff

> *"Supply order placed with [supplier] for $[X], delivering [date].
> Covers [property] for the next [N] turnovers + seasonal flip.
> SUPPLY ORDER #[n] logged. I'll flag if it slips."*
