# Project quote template

For hot water replacements, bathroom renos, drainage repairs, gas
line work, new builds, commercial fit-outs. The agent fills this in
from BUSINESS CONFIG + site inspection results + `03-quote-project.md`
logic.

```
PROJECT QUOTE — [Customer]
============================
Date:                [date]
Quote #:             Q-[YYYYMM]-[N]
Valid for:           30 days from issue
Customer:            [name]
Phone:               [phone]
Address:             [billing address]
Job address:         [where work is done — if different]
Site inspection:     [done — date / not done — quote subject to]

1. SCOPE OF WORK

[Plain-English description — 3-7 bullet points]
- [Work item 1 — e.g. "Remove existing 135L electric storage HWS"]
- [Work item 2 — e.g. "Install Rheem Stellar 360L gas continuous-flow"]
- [Work item 3 — e.g. "Run 4m of 20mm copper gas line from meter"]
- ...

2. MATERIALS (markup transparent)

| Item                                  | Qty | Trade $ | Customer $ |
|---|---|---|---|
| [item 1 — named: brand + model + size]| [n] | [$X]    | [$X+markup]|
| [item 2]                              | [n] | [$X]    | [$X+markup]|
| ...                                                                |
| **Materials subtotal**                |     |         | **$[X]**    |

3. LABOUR (by day, with apprentice/2nd-pair where used)

| Day | Task                              | Hrs | Rate    | $        |
|---|---|---|---|---|
| 1   | [task]                            | [n] | $/hr    | $[X]     |
| 1   | Apprentice / 2nd-pair             | [n] | $/hr    | $[X]     |
| 2   | [task]                            | [n] | $/hr    | $[X]     |
| ... |                                   |     |         |          |
| **Labour subtotal**                     |     |         | **$[X]** |

4. COMPLIANCE + ADMIN

| Item                                  | Amount |
|---|---|
| Plumbing Compliance Cert fee          | $[X]   |
| Gas Type A Compliance Plate + Cert    | $[X]   |
| (only if gas work — must have ticket)         |
| Council permit + inspection fee       | $[X]   |
| Utility locates lodgement (DBYD/811)  | $[X]   |
| Old unit removal + disposal           | $[X]   |
| **Compliance subtotal**               | **$[X]** |

5. TOTAL

| Section                | Amount      |
|---|---|
| Materials              | $[X]        |
| Labour                 | $[X]        |
| Compliance             | $[X]        |
| Subtotal               | $[X]        |
| Tax ([10%/15%/20%/etc.])| $[X]       |
| **TOTAL**              | **$[X]**    |

6. PAYMENT TERMS

For jobs under $1,500:
- Due on completion, Net 7

For jobs $1,500–$5,000:
- 30% deposit on acceptance ($[X]) — locks in cylinder/parts order
- 70% on completion, Net 7

For bathroom renos / multi-stage jobs:
- 30% deposit on acceptance
- 30% on rough-in completion
- 40% on fit-off completion

Pay via Stripe link in deposit invoice, or EFT
  (BSB: [X], Acct: [X])

7. TIMELINE

- Booking available [date range]
- Work runs [X] days / consecutive
- Certificate(s) issued on completion day
- Cylinder/parts arrive [date] (lead time confirmed with supplier)

8. WHAT'S NOT INCLUDED

- Any repair of pre-existing galvanised, corroded, or undersized
  pipework discovered during the work — quoted separately as a
  variation, with photos before any extra work
- Wall/floor making good if access required (we cap and finish
  flush; cabinet maker / tiler does the visible side)
- Electrical work (we coordinate but isolation/decommission billed
  by a sparky separately)
- Council permit fees if a permit is required for added load /
  drainage falls / new connection (assessed after inspection)
- Anything outside the scope above

9. WHAT'S GUARANTEED

- 12-month workmanship warranty
- Materials warranty per manufacturer (cylinders typically 7–12
  years; tapware typically 5–10 years; mixers/cartridges 1–5 years)
- All work to [AS/NZS 3500 / AS/NZS 5601 / BS EN 806 / UPC / IPC /
  NPC + CSA B125]
- Compliance Cert / Gas Cert / G3 Cert / Permit Notice issued on
  completion

10. VARIATIONS

If additional work is needed during the project, we'll:
1. Stop and show you what we've found (with photos)
2. Quote the variation separately
3. Wait for your "yes" before starting the extra work
4. Add the variation as a separate line on the final invoice

No surprises. Ever.

----

Reply "go ahead" to lock it in. Happy to walk you through the quote
on a 5-min call if anything's unclear.

Thanks,
[your name]
[Business name]
[Plumbing Lic # / Gas Type A # / Drainlayer #]
[ABN / VAT / EIN]
[Insurance: Public liability $[X], [insurer]]
[Phone] · [Email]
```
