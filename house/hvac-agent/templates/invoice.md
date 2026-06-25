# Invoice template

The agent fills this in from BUSINESS CONFIG + the matching quote +
any variations + the refrigerant logbook + handover pack.

```
INVOICE — [Business name]
=========================
Invoice #:      INV-[YYYYMM]-[N]
Issued:         [date]
Due:            [date — per BUSINESS CONFIG terms]

BILL TO
[Customer name]
[Customer billing address]
[Customer ABN / VAT / EIN if commercial]

JOB
[Address where work was done]
[Date(s) work performed]
[One-line job summary]

LINE ITEMS

| Item                                  | Qty  | Unit price | Total    |
|---|---|---|---|
| Callout fee                           | 1    | $[X]       | $[X]     |
| Labour — standard rate                | [hrs]| $[X]/hr    | $[X]     |
| Labour — apprentice / 2nd-pair        | [hrs]| $[X]/hr    | $[X]     |
| [Equipment — named: brand + model]    | [n]  | $[X]       | $[X]     |
| [Outdoor unit — separately listed]    | [n]  | $[X]       | $[X]     |
| [Bracketry / mountings]               | [n]  | $[X]       | $[X]     |
| [Line set + insulation]               | -    | -          | $[X]     |
| [Condensate drain components]         | -    | -          | $[X]     |
| Refrigerant — [R32/R410A/R454B/R134a] | [kg] | $[X]/kg    | $[X]     |
| Refrigerant logbook + handover pack   | 1    | $[X]       | $[X]     |
| [Recovered refrigerant — disposal]    | 1    | $[X]       | $[X]     |
| Old unit disposal                     | 1    | $[X]       | $[X]     |
| [Gas safety check + cert if applicable] | 1  | $[X]       | $[X]     |
| [Variation if any — labelled]         | [n]  | $[X]       | $[X]     |
| **Subtotal**                          |      |            | **$[X]** |
| Tax ([10%/15%/20%/state-by-state])    |      |            | $[X]     |
| Less deposit paid [date]              |      |            | -$[X]    |
| **TOTAL DUE**                         |      |            | **$[X]** |

PAYMENT

Option 1 — Stripe (instant, covers card / Apple Pay / BPAY):
[Stripe hosted invoice URL]

Option 2 — EFT:
  BSB:    [from BUSINESS CONFIG]
  Acct:   [from BUSINESS CONFIG]
  Ref:    INV-[YYYYMM]-[N]

DOCUMENTATION ATTACHED
- Refrigerant logbook entry RL-[YYYYMM]-[N] ([filename]) — keep
   for property records. Conveyancers, insurers, and the next
   HVAC tech will all ask for this.
- Handover pack ([filename]) — warranty registration,
   commissioning results, user operation guide, equipment
   serials.
- [Gas safety cert if applicable] — keep with gas records.
- [F-Gas leak inspection record — UK ≥5 tCO2e systems]

WARRANTY
12 months on workmanship from completion date.
Equipment carries the manufacturer warranty:
  - [Brand + model]: [years parts + labour, registered in your
    name; rego ref [X]]
We've registered the manufacturer warranty in your name.

SERVICE PLAN STATUS
[Year 1 included — visit due [date] / Not taken — $[X] to add /
Already Plan A — annual visit booked for [date]]

LATE PAYMENT
[Per BUSINESS CONFIG — e.g. "Late fee 2% per month after 14 days" or
"No late fee — please get in touch if you need flexibility"]

Thanks for the work,
[your name]
[Business name]
[Refrigerant licence — e.g. ARC RHL Full # / EPA 608 Universal #]
[Gas ticket # — if applicable]
[ABN / VAT / EIN]
[Email] · [Phone]
```
