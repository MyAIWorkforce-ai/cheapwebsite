# Callout quote template

For small jobs (under 2 hours, single-fault / single-component). The
agent fills this in from BUSINESS CONFIG and `02-quote-callout.md`
logic.

```
CALLOUT QUOTE
==============
Date:           [date]
Customer:       [name]
Phone:          [number]
Address:        [job address]
Job summary:    [one-line — e.g. "AC not cooling — Daikin
                 FTKM50, master bedroom, blowing warm air"]
System type:    [Split single | Multi-head | Ducted | RTU |
                 Heat pump]
Refrigerant:    [R32 / R410A / R454B / R134a — if known]

PRICING
| Item                          | Detail                | Amount    |
|---|---|---|
| Callout fee                   | First 30 mins + diagnostic | $[X]      |
| Labour after first 30 mins    | [rate] / hr           | from $[X] |
| Estimated time                | [X mins / X hrs]      | -         |
| Parts (typical for diagnostic outcome) | range          | $[X]–[Y]  |
| Refrigerant (if recharge needed after leak fix) | per kg | $[X]/kg   |
| GST/VAT                       | [10% / 20% / etc.]    | included  |
| **Estimated total**           |                       | **$[X]–[Y]** |

CAVEAT
[Pick one — locked / locked with caveat / range with re-quote
clause]
- "Diagnostic-led — if it's a capacitor (most common), 1 hr and
   you're cool again. If it's a coil leak on an older unit, I'll
   stop and quote repair vs replace with honest ROI numbers."
- "Quote assumes leak is at a serviceable joint. Coil pinhole on
   unit >10yo, we'll talk repair vs replace before extra work."
- "Locked-in price — capacitor + contactor swap on this Daikin
   model is van stock + 45 min, no surprises."

TIME WINDOWS
- Option 1: [day, date], [time window]
- Option 2: [day, date], [time window]

WHAT'S INCLUDED
- All labour for the scoped diagnostic + fix
- Standard fittings (capacitor / contactor / drain components)
- Refrigerant logbook entry (where any refrigerant moved)
- 12-month workmanship warranty

WHAT'S NOT INCLUDED
- Replacement of equipment beyond capacitor / contactor / coil
  (quoted separately — split changeout typically $2,500–4,500)
- Coil deep clean if beyond standard service scope
- Electrical sub-board changes if the unit needs a dedicated
  circuit rebuild
- Refrigerant top-up WITHOUT leak repair — illegal under
  [F-Gas / EPA 608 / AS 5149 / ODSHAR] and not done by us

SERVICE PLAN (optional)
Annual service plan $295/year covers everything we'd recommend at
the next routine visit (filter, coil, drain, pressure check,
capacitor check). 10% off this callout if you sign during the
visit.

Reply with your pick of time window to book it in.

[your name]
[Business name]
[Refrigerant licence — e.g. ARC RHL Full # / EPA 608 Universal # /
F-Gas C&G 2079 / Red Seal 313A]
[ABN / VAT / EIN]
[Phone] · [Email]
```
