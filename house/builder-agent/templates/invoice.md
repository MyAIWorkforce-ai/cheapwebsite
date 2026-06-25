# Progress claim invoice template

The agent fills this in from BUSINESS CONFIG + the matching
contract + accumulated variations + the stage trigger + photos.

For small-job invoices, see the simpler structure at the bottom.

---

## Progress claim (project stage)

```
PROGRESS CLAIM — INV-[YYYYMM]-[N]
====================================
Issued:        [date]
Stage:         [N] of [N total] — [stage name, e.g. "Slab"]
Trigger:       [E.g. "Slab inspection passed [date] by certifier
                 [name + #]; photos attached"]
Due:           7 days from issue (per contract)

BILL TO
[Client name]
[Client billing address]
[Client ABN / VAT / EIN if commercial]

PROJECT
[Project name + address]
Contract #:                       PQ-[YYYYMM]-[N]
Contract value (orig + V's):      $[X]
Total claimed to date (incl. this): $[Y]
% of contract claimed to date:    [Z]%

THIS CLAIM

| Item                                  | Detail              | Amount    |
|---|---|---|
| Stage [N] — [name]                    | [X]% × $[Contract] | $[X]      |
| Variation #[N] [description]          | Signed [date]       | $[X]      |
| Variation #[N+1] [description]        | Signed [date]       | $[X]      |
| PC item adjustment [item] [over/under] | [details]          | $[X] (+/-) |
| Sub-total                             |                     | $[X]      |
| Tax ([10%/15%/20%])                   |                     | $[X]      |
| Less retention (held)                 | [%] of stage value  | -$[X]     |
| **AMOUNT DUE THIS CLAIM**             |                     | **$[X]** |

CONTRACT TRACKER

| Stage                          | %    | Claimed | Paid | Status |
|---|---|---|---|---|
| Deposit                        | [X]% | $[X]    | $[X] | PAID [date] |
| Slab                           | [X]% | $[X]    | $[X] | PAID / THIS CLAIM |
| Frame                          | [X]% | $0      | $0   | upcoming |
| Lock-up                        | [X]% | $0      | $0   | upcoming |
| Fix-out                        | [X]% | $0      | $0   | upcoming |
| PC                             | [X]% | $0      | $0   | upcoming |
| Retention                      | [X]% | $0      | $0   | held    |
| **Total**                      | 100% | $[X]    | $[X] |        |

VARIATIONS TO DATE
| #  | Date signed | Description | Amount |
|---|---|---|---|
| 1  | [date]      | [scope]     | $[X]   |
| 2  | [date]      | [scope]     | $[X]   |
| **Total variations**           | **$[X]** |

(Variations are billed across progress claims as work is completed.
Each variation listed here corresponds to a signed Variation
Order on file.)

PC ITEM TRACKER
| Item              | Allowance | Selected | Diff      | Status |
|---|---|---|---|---|
| Bi-fold doors     | $12,500   | $14,200  | +$1,700   | Variation #2 signed |
| Tile              | $1,440    | $1,200   | -$240     | Credit on next claim |
| (etc.)            |           |          |           |        |

PAYMENT

Option 1 — Stripe (instant, covers card / Apple Pay / EFTPOS /
BPAY):
[Stripe hosted invoice URL]

Option 2 — EFT:
  BSB / sort code / routing: [from BUSINESS CONFIG]
  Acct:                       [from BUSINESS CONFIG]
  Ref:                        INV-[YYYYMM]-[N]

PROOF OF STAGE COMPLETION
- [Stage] inspection card (passed [date]) — [link to photo]
- [Stage] progress photos — [link to folder]
- [Concrete delivery docket / Frame inspection report / etc.]
  — [link]
- [Engineer's sign-off note (if any)] — [link]

WHAT'S NEXT
- Stage [N+1] start: [date] — assuming this claim cleared by
  [date + 7]
- Inspection target for stage [N+1]: [date]
- Next progress claim raises after stage [N+1] inspection passes

WARRANTY + DEFECTS
- All workmanship covered under defects period from PC
- 12-month full defects liability period
- Region structural warranty: [period from PC]

LATE PAYMENT
[Per BUSINESS CONFIG — e.g. "Late fee 12% pa after 14 days" or
"No late fee — please get in touch if you need flexibility"]

Thanks,
[your name]
[Business name]
[Builder licence # — region-specific]
[ABN / VAT / EIN]
[Email] · [Phone]
```

---

## Cost-plus monthly invoice

```
COST-PLUS MONTHLY INVOICE — INV-[YYYYMM]-[N]
==============================================
Period:        [date] to [date]
Issued:        [date]
Due:           7 days from issue (per contract)

BILL TO
[Client name]
[Billing address]

PROJECT
[Project name + address]
Estimated contract: $[X] - $[Y]
Total claimed to date (incl. this): $[Z]
% of estimate:      [%]

LABOUR THIS PERIOD
| Date | Worker | Hrs | Rate | $ |
|---|---|---|---|---|
| [date] | [your name — lead] | 6.0 | $95 | $570 |
| [date] | [apprentice]       | 6.0 | $50 | $300 |
| (etc.)                                  |
| **Sub-total labour** |                     | **$[X]** |

SUB-TRADES (invoice + agreed markup [%])
| Sub | Invoice ref | Net | Markup | Total |
|---|---|---|---|---|
| Tewksbury Electrical | TE-2025-44 | $4,200 | $420 (10%) | $4,620 |
| Smith Plumbing       | SP-2025-31 | $2,800 | $280       | $3,080 |
| (etc.)                                                     |
| **Sub-total sub-trades** |                                 | **$[X]** |

MATERIALS (supplier invoice + agreed markup [%])
| Supplier | Invoice ref | Net | Markup | Total |
|---|---|---|---|---|
| Bunnings Trade | BT-998877  | $1,840 | $276 (15%) | $2,116 |
| Eurolinea     | EL-2025-12 | $18,400| $2,760     | $21,160 |
| (etc.)                                                      |
| **Sub-total materials** |                                  | **$[X]** |

ADMIN / OVERHEAD ([%] of direct cost)            $[X]
MARGIN ([%] on direct cost)                       $[X]

TOTAL
| Item               | Amount    |
|---|---|
| Direct cost        | $[X]      |
| Admin / overhead   | $[X]      |
| Margin             | $[X]      |
| Sub-total          | $[X]      |
| Tax                | $[X]      |
| Less retention     | -$[X]     |
| **TOTAL DUE THIS INVOICE** | **$[X]** |

ATTACHED FOR YOUR INSPECTION
- All sub-trade invoices (4 PDFs)
- All material invoices (8 PDFs)
- My time sheet for the period (PDF)
- Cumulative running cost report (Google Sheet link)

PAYMENT
[Stripe / EFT details as above]

Any questions on any line — just reply or call.

[your name]
[Business name]
```

---

## Retention release invoice

```
RETENTION RELEASE — INV-[YYYYMM]-[N]
=====================================
Issued:        [date]
For project:   [name + address]
PC date:       [date 12 months ago]
Retention amount: $[X] ([%] of contract value)
Due:           7 days from issue (per contract)

BILL TO
[Client name]

CONTEXT

Twelve months ago at Practical Completion of [project], [%] of
the contract value ($[X]) was retained per contract clause [X].
The defects liability period ends [date].

We've completed the 11-month defects sweep on [date], and:
- [E.g. "The minor defects identified at the sweep have been
  rectified (photo evidence attached)" OR "No defects identified
  at the sweep — property in excellent condition"]
- The defects schedule from PC has been worked through + signed
  off complete

This invoice requests release of the retention.

THIS CLAIM
| Item                       | Amount  |
|---|---|
| Retention release          | $[X]    |
| Tax (already paid at PC)   | $0      |
| **AMOUNT DUE**             | **$[X]** |

PAYMENT
[Stripe / EFT same details as previous claims]

Thanks for a great project [name]. If anything comes up post the
12-month mark, you've still got the structural warranty
([region-specific period]) and all the manufacturer warranties
on materials. We're around if you ever need us.

[your name]
[Business name]
```

---

## Small-job invoice

For small-job / handyman work invoiced on the day:

```
INVOICE — [Business name]
=========================
Invoice #:      INV-[YYYYMM]-[N]
Issued:         [date]
Due:            On completion (preferred) OR Net 7

BILL TO
[Client name]
[Billing address]

JOB
[Address where work was done]
[Date(s) work performed]
[One-line job summary]

LINE ITEMS

| Item                                  | Qty  | Unit price | Total    |
|---|---|---|---|
| Labour                                | [hrs]| $[Y]/hr    | $[X]     |
| Apprentice / 2nd-pair                 | [hrs]| $[Y]/hr    | $[X]     |
| Materials — itemised below            |      |            | $[X]     |
| Disposal / skip                       | 1    | $[X]       | $[X]     |
| [Variation if any — labelled]         | [n]  | $[X]       | $[X]     |
| **Subtotal**                          |      |            | **$[X]** |
| Tax ([10%/15%/20%])                   |      |            | $[X]     |
| **TOTAL DUE**                         |      |            | **$[X]** |

MATERIALS BREAKDOWN
- [Item 1]: $[X]
- [Item 2]: $[X]

PAYMENT
[Stripe / EFT same details]

WARRANTY
6 months on workmanship for small-job repairs.
Materials carry manufacturer warranty.

Thanks for the work,
[your name]
[Business name]
[Builder licence #]
[ABN / VAT / EIN]
[Email] · [Phone]
```
