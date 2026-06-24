# Invoice template

The agent fills this in from BUSINESS CONFIG + the matching quote +
any variations + the cert(s).

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
| [Material 1 — named: brand + model]   | [n]  | $[X]       | $[X]     |
| [Material 2]                          | [n]  | $[X]       | $[X]     |
| Plumbing Compliance Certificate       | 1    | $[X]       | $[X]     |
| Gas Type A Compliance Plate + Cert    | 1    | $[X]       | $[X]     |
| (only if gas, only if ticketed)               |
| Old unit disposal                     | 1    | $[X]       | $[X]     |
| [Variation if any — labelled]         | [n]  | $[X]       | $[X]     |
| **Subtotal**                          |      |            | **$[X]** |
| Tax ([10%/15%/20%])                   |      |            | $[X]     |
| Less deposit paid [date]              |      |            | -$[X]    |
| **TOTAL DUE**                         |      |            | **$[X]** |

PAYMENT

Option 1 — Stripe (instant, covers card / Apple Pay / BPAY):
[Stripe hosted invoice URL]

Option 2 — EFT:
  BSB:    [from BUSINESS CONFIG]
  Acct:   [from BUSINESS CONFIG]
  Ref:    INV-[YYYYMM]-[N]

CERTIFICATES ATTACHED
- Plumbing Compliance Certificate ([filename]) — keep for property
  records. Conveyancers and insurers will ask for this.
- Gas Type A Compliance Certificate ([filename]) — keep with gas
  records. Required at next gas inspection or property sale.
- [G3 Unvented Hot Water Cert / Backflow Test Cert / etc.]

WARRANTY
12 months on workmanship from job completion date.
Materials carry the manufacturer warranty:
  - Hot water cylinder: [manufacturer + years, e.g. Rheem 12 years
    cylinder, 3 years parts]
  - Tapware: typically 5–10 years
  - Mixers / cartridges: 1–5 years
We've registered the manufacturer warranty in your name.

LATE PAYMENT
[Per BUSINESS CONFIG — e.g. "Late fee 2% per month after 14 days" or
"No late fee — please get in touch if you need flexibility"]

Thanks for the work,
[your name]
[Business name]
[Plumbing Lic # / Gas Type A #]
[ABN / VAT / EIN]
[Email] · [Phone]
```
