# Project quote template

For switchboard upgrades, rewires, solar PV, EV chargers, new builds,
commercial fitouts. The agent fills this in from BUSINESS CONFIG +
site inspection results + `03-quote-project.md` logic.

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
- [Work item 1]
- [Work item 2]
- ...

2. MATERIALS (markup transparent)

| Item                                  | Qty | Trade $ | Customer $ |
|---|---|---|---|
| [item 1]                              | [n] | [$X]    | [$X+markup]|
| [item 2]                              | [n] | [$X]    | [$X+markup]|
| ...                                                                |
| **Materials subtotal**                |     |         | **$[X]**    |

3. LABOUR (by day)

| Day | Task                              | Hrs | Rate    | $        |
|---|---|---|---|---|
| 1   | [task]                            | [n] | $/hr    | $[X]     |
| 1   | Apprentice support                | [n] | $/hr    | $[X]     |
| 2   | [task]                            | [n] | $/hr    | $[X]     |
| ... |                                   |     |         |          |
| **Labour subtotal**                     |     |         | **$[X]** |

4. COMPLIANCE + ADMIN

| Item                                  | Amount |
|---|---|
| Certificate fee (COC / EICR / etc.)   | $[X]   |
| Council permit fee (if applicable)    | $[X]   |
| Lodgement / inspection scheduling     | $[X]   |
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

- [X]% deposit on acceptance ($[X])
- Balance on completion, Net [X] days
- Pay via Stripe link in deposit invoice, or EFT
  (BSB: [X], Acct: [X])

7. TIMELINE

- Booking available [date range]
- Work runs [X] days / consecutive
- Certificate issued on completion day

8. WHAT'S NOT INCLUDED

- Any rectification of pre-existing non-compliant wiring discovered
  during the work — quoted separately as a variation, with photos
  before any extra work
- Council permit fees if a permit is required for added circuit
  capacity (assessed after inspection)
- Anything outside the scope above

9. WHAT'S GUARANTEED

- 12-month workmanship warranty
- Materials warranty per manufacturer (typically 2–5 years)
- All work to [AS/NZS 3000 / BS 7671 / NEC / CEC]
- Certificate of Compliance / EICR / Permit Notice issued on completion

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
[License # / NICEIC #]
[ABN / VAT / EIN]
[Insurance: Public liability $[X], [insurer]]
[Phone] · [Email]
```
