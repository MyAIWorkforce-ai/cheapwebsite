# Project quote template

For split changeouts, multi-head, ducted reverse-cycle, heat pump
retrofits, commercial RTU change-outs. The agent fills this in from
BUSINESS CONFIG + site inspection results + `03-quote-project.md`
logic.

```
PROJECT QUOTE — [Customer]
============================
Date:                [date]
Quote #:             Q-[YYYYMM]-[N]
Valid for:           30 days from issue (subject to equipment
                     lead time + refrigerant price moves)
Customer:            [name]
Phone:               [phone]
Address:             [billing address]
Job address:         [where work is done — if different]
Site inspection:     [done — date / not done — quote subject to]

1. SCOPE OF WORK

[Plain-English description — 3-7 bullet points]
- [Work item 1 — e.g. "Recover refrigerant from existing system
   (R410A) to recovery cylinder, logbook entry"]
- [Work item 2 — e.g. "Decommission + remove old indoor + outdoor
   unit, certified disposal"]
- [Work item 3 — e.g. "Install new 5.0kW Daikin Cora R32
   reverse-cycle split, indoor head on existing wall mount,
   outdoor on existing pad with new vibration isolation"]
- [Work item 4 — e.g. "Re-use existing line set after pressure
   test + flush; replace if pitted (variation only)"]
- [Work item 5 — e.g. "Pressure test, vacuum to 500 microns,
   charge to spec, commission, run on cool + heat"]
- ...

2. EQUIPMENT — brand options (recommend transparent)

OPTION A: [Brand A — recommended]
- [Model + indoor/outdoor codes]
- Capacity: [kW cool / kW heat]
- Refrigerant: [R32 / R454B / R410A]
- Warranty: [years parts + labour]
- Unit price: $[X]
- Why this: [honest reasoning — inverter modulation, parts
   availability, customer fit]

OPTION B: [Brand B — premium]
- [as above]

OPTION C: [Brand C — value]
- [as above]

3. INSTALL + LABOUR (by day, with apprentice/2nd-pair where used)

| Day | Task                              | Hrs | Rate    | $        |
|---|---|---|---|---|
| 1   | Recovery + decommission of old    | [n] | $[X]/hr | $[X]     |
| 1   | Install indoor + outdoor + bracketry | [n] | $[X]/hr | $[X]   |
| 1   | Apprentice / 2nd-pair             | [n] | $[X]/hr | $[X]     |
| 1   | Pressure test + vacuum + charge   | [n] | $[X]/hr | $[X]     |
| 1   | Commissioning + handover walkthrough | [n] | $[X]/hr | $[X]  |
| **Labour subtotal**                     |     |         | **$[X]** |

4. COMMISSIONING + COMPLIANCE

| Item                                       | Amount |
|---|---|
| Refrigerant logbook + handover pack         | $[X]   |
| Recovered refrigerant — certified disposal | $[X]   |
| Warranty registration (in customer's name) | included |
| Old unit disposal (electronics + cylinder + scrap) | $[X] |
| [If commercial system >5 tCO2e: F-Gas leak inspection scheduled — annual / 6-monthly / 3-monthly per banding] | calendared |
| [Gas safety check — separate cert + licence if gas-fired] | $[X] |
| **Compliance subtotal**                    | **$[X]** |

5. TOTAL — based on OPTION A

| Section                | Amount      |
|---|---|
| Equipment              | $[X]        |
| Labour                 | $[X]        |
| Commissioning + disposal | $[X]      |
| Subtotal               | $[X]        |
| Tax ([10% / 15% / 20% / state-by-state])| $[X] |
| **TOTAL**              | **$[X]**    |

(Option B adds/subtracts $[Y]. Option C subtracts $[Z].)

6. PAYMENT TERMS

For jobs under $2,000:
- Due on completion, Net 7

For jobs $2,000–$8,000:
- 30% deposit on acceptance ($[X]) — locks equipment order
- 70% on completion, Net 7

For ducted / multi-head / heat pump / RTU $8,000+:
- 30% deposit on acceptance
- 30% on equipment delivery + rough-in (mid-install)
- 40% on commissioning + handover

Pay via Stripe link in deposit invoice, or EFT
  (BSB: [X], Acct: [X])

7. TIMELINE

- Equipment lead time: [days/weeks — from supplier]
- Install start available: [date range]
- Work runs [X] days
- Compliance + handover pack issued on completion day

8. WHAT'S NOT INCLUDED

- Replacement of existing line set if pitted, kinked, or
   undersized (quoted as variation with photos before any extra
   work)
- Electrical sub-circuit work if a new dedicated circuit is
   needed (sparky coordinated; bills separately)
- Building work for new wall penetrations beyond a clean core
   hole
- Crane / scissor lift if access requires it (quoted separately)
- Refrigerant top-ups beyond pre-charged amount (after a
   future leak — separate diagnostic + repair quote)
- Anything outside the scope above

9. WHAT'S GUARANTEED

- [N]-year manufacturer warranty on equipment (registered in
   your name)
- 12-month workmanship warranty
- All work to AS/NZS 5149 / BS EN 378 / ASHRAE 15 + 34 + IMC /
   CSA B52 (region-specific)
- Refrigerant logbook + handover pack on completion day
- Warranty re-registration with manufacturer at install time

10. SERVICE PLAN OFFER (the big one)

Year 1 service plan included FREE if you accept this quote within
14 days (normally $[plan price]).

What's covered:
- 1 × annual visit (60-90 mins per system)
- Filter, condenser coil, drain pan + condensate, refrigerant
   pressure check, capacitor + contactor test, controls calibration
- Written report after each visit
- 10% off any breakdown callout during the plan year
- Priority dispatch (24h ahead of non-plan customers)

Year 2 onwards: $[X] with 15% loyalty discount, or upgrade to
Plan B ($[Y]) for 2 visits/year + leak inspection + indoor coil
treatment.

11. VARIATIONS

If additional work is needed during the install, we'll:
1. Stop and show you what we've found (with photos)
2. Quote the variation separately
3. Wait for your "yes" before starting the extra work
4. Add the variation as a separate line on the final invoice

No surprises. Ever.

----

Reply "go ahead — Option A" (or B/C) to lock it in. Happy to walk
you through the quote on a quick call if anything's unclear.

Thanks,
[your name]
[Business name]
[Refrigerant licence — e.g. ARC RHL Full # / RTA # / EPA 608 # /
F-Gas C&G 2079 / MCS # / Red Seal 313A]
[Gas ticket # — if applicable]
[ABN / VAT / EIN]
[Insurance: Public liability $[X], [insurer]]
[Phone] · [Email]
```
