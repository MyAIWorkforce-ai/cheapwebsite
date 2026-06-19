# Invoice template

The agent fills this in from BUSINESS CONFIG + the matching quote +
any variations + the cert.

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
| Labour — apprentice                   | [hrs]| $[X]/hr    | $[X]     |
| [Material 1]                          | [n]  | $[X]       | $[X]     |
| [Material 2]                          | [n]  | $[X]       | $[X]     |
| Certificate of Compliance / equiv.    | 1    | $[X]       | $[X]     |
| [Variation if any — labelled]         | [n]  | $[X]       | $[X]     |
| **Subtotal**                          |      |            | **$[X]** |
| Tax ([10%/15%/20%])                   |      |            | $[X]     |
| **TOTAL DUE**                         |      |            | **$[X]** |

PAYMENT

Option 1 — Stripe (instant, covers card / Apple Pay / BPAY):
[Stripe hosted invoice URL]

Option 2 — EFT:
  BSB:    [from BUSINESS CONFIG]
  Acct:   [from BUSINESS CONFIG]
  Ref:    INV-[YYYYMM]-[N]

CERTIFICATE OF COMPLIANCE
Attached: [filename] — please keep for property records (handy for
future sale, insurance, or any next sparky to see what's been done).

WARRANTY
12 months on workmanship from job completion date.
Materials carry the manufacturer warranty (typically 2–5 years).

LATE PAYMENT
[Per BUSINESS CONFIG — e.g. "Late fee 2% per month after 14 days" or
"No late fee — please get in touch if you need flexibility"]

Thanks for the work,
[your name]
[Business name]
[License #]
[ABN / VAT / EIN]
[Email] · [Phone]
```
