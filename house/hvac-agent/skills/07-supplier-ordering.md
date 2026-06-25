---
name: hvac-supplier-ordering
description: Generate a parts + equipment order to your usual HVAC wholesaler (Beijer / Actrol / Reece HVAC / Kirby AU; Realcold / HRP NZ; Wolseley / CPS / Aircon Centre UK; Johnstone / Carrier Enterprise / Ferguson HVAC US; Master Group / Wolseley CA). Format it for paste-in or email. Track delivery against job start date. Flag pre-summer stockouts that hurt jobs.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Supplier ordering — parts + equipment for the next job

## Your job

When a quote is accepted or a job is booked, generate a parts +
equipment list for the wholesaler. Match it to the job's actual
scope (not just generic). Track lead time against job start date so
you don't show up without the indoor unit.

For HVAC, equipment lead time is highly seasonal:
- Splits in AU/NZ: 3-5 days shoulder, 7-14 days pre-summer surge
- Ducted indoor units: 1-3 weeks year-round; can blow to 6 weeks
  pre-summer
- Commercial RTU: 4-12 weeks (especially Carrier, Lennox, Trane)
- Heat pump retrofits (UK BUS-eligible): 2-6 weeks; pre-winter surge
  for residential ASHP

Pre-buying refrigerant cylinders (R32 especially) in Aug-Sep AU /
Feb-Mar UK&US is a recognised tactic — agent reminds operator in
pre-season weekly report.

## When to order

- **At quote acceptance** — order the big-ticket equipment
  (indoor + outdoor units, ducted plenum, RTU, heat pump tank)
- **Day before the job** — quick top-up if any small parts are short
  (capacitor sizing, contactor coil voltage, drain pan parts)
- **Standing weekly order** — restock van consumables (capacitors
  35+5 / 45+5 / 55+5 μF, contactors 24V/220V coil 1-pole / 2-pole,
  flare nuts 1/4 1/2 5/8, drain pan tabs, condensate line vacuum
  attachments, R32 cylinder if low, vacuum pump oil, electronic
  detector calibration cylinder)
- **Pre-season bulk** — refrigerant cylinders, common capacitors,
  filter stock, drain pan tabs — order before the surge starts

## Trigger this skill when

- A project quote (`03-quote-project.md`) is accepted
- A callout quote (`02-quote-callout.md`) needs non-stocked items
- Operator runs "restock the van"
- Operator runs "pre-season bulk"
- A job is at risk because equipment is short

## The order template

Format depends on the wholesaler. Most accept:

- **Email order** (slowest but works for all)
- **Trade portal upload** (Beijer Trade, Actrol mobile, Reece HVAC
  portal, Wolseley Direct, Johnstone HVAC.com, Carrier Enterprise
  Connect, Ferguson HVAC) — agent generates the CSV or cart link
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
| FTKM50QVMA| Daikin Cora indoor unit 5.0kW R32   | 1   | $895  | $895     |
| RXM50QVMA | Daikin Cora outdoor unit 5.0kW R32  | 1   | $955  | $955     |
| FN-9      | R32 cylinder 9 kg                    | 1   | $580  | $580     |
| WB-OUT-G  | Outdoor wall bracket galvanised      | 1   | $42   | $42      |
| LS-15-22  | Insulated line set 15m 1/4 + 1/2     | 1   | $128  | $128     |
| FL-FN-K   | Flare nut kit asst                   | 1   | $18   | $18      |
| DR-30B    | Condensate drain 30m 22mm + fittings | 1   | $32   | $32      |
| EL-IS-2P  | Electrical isolation switch 2-pole   | 1   | $48   | $48      |

Subtotal:                                              $2,698
GST/VAT:                                               $269.80
**TOTAL**                                              **$2,967.80**

DELIVERY NOTES
- Job starts [date]. Equipment MUST be delivered by [date — 1 day
  before].
- Phone [your mobile] if the Daikin Cora 5.0kW indoor is
  stocked-out — Mitsubishi MSZ-AP50 is the equivalent if available,
  same install spec.
- If R32 9 kg cylinder out, accept 5 kg pair as substitute (we
  need ~1.2 kg for this charge + reserve).

Cheers,
[your name] — [Business name]
[Refrigerant licence # / RTA #]
```

## Per-wholesaler quirks

| Wholesaler | Region | Notes |
|---|---|---|
| **Beijer (formerly Heatcraft)** | AU / NZ | Largest HVAC wholesaler in AU/NZ; strong on Daikin, Mitsubishi, Fujitsu; trade portal good; branch counter fast for same-day pickup |
| **Actrol** | AU | Strong alternative to Beijer; particularly good for refrigerant cylinders + tools + commercial parts; pricing competitive on bulk fittings |
| **Reece HVAC** | AU | Newer to HVAC (came from plumbing); strong on residential splits + ducted; growing branch network |
| **Kirby** | AU | Good for commercial RTU + chiller parts + specialist refrigeration; thinner residential range |
| **Realcold** | NZ | Major NZ HVAC wholesaler; strong on Mitsubishi + Daikin; good branch coverage |
| **HRP (Heatpump Recovery and Recycling)** | NZ | NZ specialist for refrigerant supply + recovery cylinders + reclaim |
| **Mico HVAC** | NZ | Plumbing-first but growing HVAC range |
| **Wolseley UK (Climate Control division)** | UK | UK national HVAC wholesaler; strong on Daikin, Mitsubishi, Worcester Bosch; trade counter pricing good |
| **CPS (Climate Performance Solutions)** | UK | UK independent; sharp on residential splits + heat pumps; faster delivery in southeast |
| **Aircon Centre** | UK | UK independent specialist; strong on commercial + VRF systems; good for less common brands |
| **BSS / Plumb Center HVAC** | UK | National coverage; OK for top-ups + emergency; better for heat pumps via Plumb Center HVAC arm |
| **Johnstone Supply** | US | Largest US HVAC distributor co-op; strong on residential + commercial; good branch network |
| **Carrier Enterprise** | US | Carrier OEM channel; best for Carrier / Bryant / Payne; thinner on other brands |
| **Ferguson HVAC** | US | National HVAC + plumbing wholesaler; strong on residential + light commercial |
| **R.E. Michel** | US | Strong on residential + commercial parts; less dominant on equipment |
| **Lennox PartsPlus** | US | OEM channel for Lennox; best for parts + warranty replacement |
| **ABCO HVACR** | US | Northeast US specialist; strong on commercial RTU + chillers |
| **Master Group** | CA | Largest Canadian HVAC distributor; strong on residential + commercial + heat pumps |
| **Wolseley CA** | CA | National coverage; good on Daikin + Mitsubishi |
| **EMCO HVAC** | CA | Multi-trade chain; HVAC division solid |
| **HVAC Express** | CA | Regional value; OK for fittings + capacitors |

If the BUSINESS CONFIG primary wholesaler is listed above, use the
known quirks. If not listed, default to email format.

## Equipment ordering rules — specific to HVAC

Equipment (indoor + outdoor units, ducted plenums, heat pump tanks,
RTUs) is the highest-stockout-risk + longest-lead-time category.
Always:

- Order the SPECIFIC model + kW capacity expected (not "5kW
  Daikin" — "FTKM50QVMA + RXM50QVMA")
- Confirm with the wholesaler the unit has the correct
  configuration (refrigerant type — R32 vs R410A vs R454B;
  power supply — 240V vs 415V three-phase; voltage region — some
  units North America-specific 208/230)
- Check warranty registration is in the customer's name, not the
  installer's (most manufacturers will register at install time
  via a serial-number portal — Daikin, Mitsubishi, Carrier all
  have this)
- For UK heat pump (BUS-grant) installs, confirm the unit is
  MCS-certified and the model number matches the MCS Database
  (mcscertified.com) — non-MCS units fail grant eligibility
- For US installs, confirm the AHRI certification number matches —
  needed for utility rebates + tax credits under IRA
- For commercial RTUs — confirm the AHRI tonnage rating; confirm
  the connection orientation (left / right / horizontal /
  downflow); confirm the gas connection if gas-fired

## Refrigerant cylinder ordering rules

- **Track every cylinder serial in BUSINESS CONFIG** — virgin
  cylinders going into the van + recovery cylinders coming back to
  the supplier
- **Recovery cylinder must be DOT/RIN-spec** (US) or equivalent
  (AS 2030 in AU/NZ; UN-spec in UK + EU) — never recover into a
  virgin cylinder
- **Refrigerant trading auth** (AU: RTA, UK: REFCOM company,
  US: state HVAC) requires the business to track every kg moved
  in and out — agent's order template + invoice tracker is the
  end-to-end record

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
Equipment lead time risk: [low / medium / high — based on season]
Status:        [PLACED | CONFIRMED | DELIVERED | PARTIAL | STOCKOUT]
```

## When equipment doesn't arrive on time

If the wholesaler has emailed back with a stockout or delay, surface
to the operator IMMEDIATELY:

> *"Stockout flag: Daikin Cora FTKM50 from Beijer won't arrive
> until [date]. Job for [Customer] is booked [date]. Options:
> (a) Mitsubishi MSZ-AP50 from Beijer available same-day — same
> install spec, $130 more expensive; (b) reschedule the job;
> (c) split the job — install the line set + outdoor bracket +
> electrical isolation today, swap the units on a follow-up visit
> when stock arrives (commission day will need refrigerant charge
> + handover then)."*

Don't let the operator turn up to an install missing equipment. For
heatwave-week installs specifically, "no indoor unit" + "no AC
customer" = brand damage.

## Pre-season bulk ordering (HVAC-specific)

In Aug-Sep AU / Feb-Mar UK / Feb-Mar US, the agent runs a
pre-season check:

```
PRE-SEASON STOCK CHECK — [date]

Van consumables:
- Capacitors 35+5 μF: [stock] — recommend 6 minimum
- Capacitors 45+5 μF: [stock] — recommend 6 minimum
- Capacitors 55+5 μF: [stock] — recommend 4 minimum
- Contactors 24V coil 1-pole: [stock] — recommend 4 minimum
- Contactors 24V coil 2-pole: [stock] — recommend 4 minimum
- Flare nuts 1/4 + 1/2 + 5/8: [stock] — recommend kit + spares
- Filter stock (common indoor splits): [count]
- Drain pan tabs (algae): [count]

Refrigerant:
- R32 cylinders 9 kg: [count in van + stock]
   — recommend 4 going into peak summer
- R410A 11 kg (older systems still common): [count]
   — recommend 2 going into peak summer
- R454B (new-system charge): [count] — recommend 1-2 if doing
   new R454B installs
- R134a 13.6 kg (auto + some commercial): [count] — as needed

Tooling:
- Vacuum pump oil: [count] — recommend 2-3
- Electronic detector — calibrate before peak (annual cal
   required)
- Recovery cylinders empty: [count] — recommend 2-3 going in;
   nothing worse than full cylinder + no empty to recover into

Cylinders past last calibration / hydrotest date?
[Surface any cylinder out of compliance — pull from rotation]
```

## Hard rules

- **Always include order ref + job ref** so when equipment arrives,
  cross-matching is fast.
- **Always include a delivery deadline** with the job start date as
  context.
- **Markup is on the customer side, not the wholesaler side.** Order
  at trade price; markup happens in the invoice per BUSINESS CONFIG.
- **Track common stockouts in learnings.md** — patterns emerge
  (some wholesalers chronically stock-out Daikin 5kW in November).
  Update the primary wholesaler in BUSINESS CONFIG if a pattern is
  bad.
- **Indoor + outdoor unit ordered together as a matched pair.**
  Never split across two wholesalers if avoidable — refrigerant
  pre-charge + warranty terms come from the matched outdoor; mixing
  voids manufacturer warranty.
- **For UK BUS-eligible heat pump installs: confirm MCS-certified
  model + grant scheme eligibility before ordering.** Non-MCS
  equipment kills the grant + ends in customer dispute.
- **For US installs: confirm AHRI certification + state rebate
  eligibility before ordering.** State rebate schemes change
  yearly; check rebatecenter.com or state energy commission.
- **Pre-buy R32 cylinders in shoulder season** — at least 2 weeks
  before forecast first heatwave. Cylinder supply tightens fast.

## Confirm + handoff

> *"Order placed with [wholesaler] for $[X], promised by [date] for
> the [Customer] [job] on [date]. Equipment lead time risk: [low /
> medium / high]. I'll flag if anything slips. Refrigerant cylinder
> stock check: [in spec / order more]."*
