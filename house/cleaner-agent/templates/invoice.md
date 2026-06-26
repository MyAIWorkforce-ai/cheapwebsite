# Invoice template

The agent fills this in from BUSINESS CONFIG + the matching
quote + any variations + photo evidence pack link.

## One-off invoice (bond / deep / move-in / post-build /
specialty)

```
INVOICE — [Business name]
=========================
Invoice #:      INV-[YYYYMM]-[N]
Issued:         [date]
Due:            [date — per BUSINESS CONFIG terms]

BILL TO
[Customer name]
[Customer billing address]
[Customer ABN/VAT/EIN if commercial]

JOB
[Address where work was done]
[Date(s) work performed]
[One-line job summary]

LINE ITEMS

| Item                                  | Qty  | Unit price | Total    |
|---|---|---|---|
| [Bond clean / Deep / Post-build / etc.]| 1   | $[X]       | $[X]     |
| Carpet steam clean ([N] rooms)        | [N]  | $[X]       | $[X]     |
| Oven deep clean                       | 1    | $[X]       | $[X]     |
| External windows ([N])                | [N]  | $[X]       | $[X]     |
| Pest fumigation cert (QLD pass-thru)  | 1    | $[X]       | $[X]     |
| [Variation if any — labelled]         | [n]  | $[X]       | $[X]     |
| **Subtotal**                          |      |            | **$[X]** |
| Tax ([GST 10% / VAT 20% / Sales tax])  |      |            | $[X]     |
| Less deposit paid [date]              |      |            | -$[X]    |
| **TOTAL DUE**                         |      |            | **$[X]** |

PAYMENT

Option 1 — Stripe (instant, covers card / Apple Pay):
[Stripe hosted invoice URL]

Option 2 — EFT:
  BSB / Acct (AU) / SWIFT / IBAN: [from BUSINESS CONFIG]
  Ref:    INV-[YYYYMM]-[N]

PHOTO EVIDENCE PACK
[Link to time-stamped photo pack]
[For bond cleans: also sent to property manager [agent name]]

WARRANTY
- Bond clean: 72-hour bond guarantee — re-clean free if agent
  flags within 72 hrs of completion
- Deep / move-in / post-build: 7-day satisfaction — anything
  missed, flag within 7 days + we come back free
- Specialty: 7-day satisfaction

LATE PAYMENT
[Per BUSINESS CONFIG — e.g. "Late fee 2% per month after 14
days" or "No late fee — please get in touch if you need
flexibility"]

Thanks for the work,
[your name]
[Business name]
[ABN / VAT / EIN]
[Public liability + insurer]
[Email] · [Phone]
```

## Recurring residential visit receipt (direct debit)

```
VISIT RECEIPT — [Business name]
=================================
Customer:         [name]
Property:         [address]
Visit date:       [date]
Visit type:       [weekly / fortnightly / monthly] per contract
                   MC-[XXX]
Receipt #:        RCT-[YYYYMM]-[N]

LINE ITEMS
| Item                                          | Total    |
|---|---|
| Recurring clean (per contract)                | $[X]     |
| [Add-on if any — e.g. extra fridge clean]     | $[X]     |
| Tax                                           | included |
| **Total charged today**                       | **$[X]** |

PAYMENT
Auto-charged via direct debit on visit-day.
[GoCardless transaction ID / Stripe payment ID]
Status: PAID

NEXT VISIT
[Auto — e.g. fortnightly Wednesday, next is [date]]

— [your name]
[Business name]
```

## Commercial nightly monthly invoice (Net 30)

```
INVOICE — [Business name]
=========================
Invoice #:      INV-[YYYYMM]-[N]
Issued:         [first of next month]
Due:            [Net 30 — last day of month]

BILL TO
[Business name]
[Address]
[ABN / VAT / EIN]
Attn: [facility manager / accounts payable]

PERIOD
[Previous month — e.g. 1 [Month] – 31 [Month] [Year]]

JOB
[Site address]
Service: Nightly office clean per contract MC-[XXX]

LINE ITEMS
| Item                                          | Qty | Unit price | Total    |
|---|---|---|---|
| Nightly clean (Mon-Fri × [N] weeks)           | [N] | $[X]       | $[X]     |
| Public holidays (paid double) [dates]         | [N] | $[X]       | $[X]     |
| Supplies pass-through (paper, soap, liners)   | -   | -          | $[X]     |
| Quarterly internal glass clean                | 1   | $[X]       | $[X]     |
| [Other contracted extras]                     |     |            | $[X]     |
| **Subtotal**                                  |     |            | **$[X]** |
| Tax                                           |     |            | $[X]     |
| **TOTAL DUE**                                 |     |            | **$[X]** |

PAYMENT
Net 30 — due [date].

Option 1 — Direct debit (1% discount):
[GoCardless / Stripe DD link]

Option 2 — EFT (preferred):
[BSB / Acct / SWIFT / IBAN]
Ref: INV-[YYYYMM]-[N]

Option 3 — Stripe link:
[link]

REPORT FOR THE PERIOD
- Visits completed: [N] (no missed)
- Issues flagged: [list]
- Supplies running low for next month: [list]
- Quarterly walk-through scheduled: [date]

— [your name]
[Business name]
[ABN / VAT / EIN]
[Public liability + worker comp policy #]
```

## STR turnover monthly statement (Net 7)

```
STATEMENT — STR TURNOVERS
==========================
Host:             [name]
Properties:       [list]
Period:           [previous month]
Statement #:      STM-[YYYYMM]-[N]
Issued:           [first of next month]
Due:              Net 7

TURNOVERS
| Date     | Property            | Turn type  | Rate    | Total   |
|---|---|---|---|---|
| [date]   | [property 1]        | Standard   | $[X]    | $[X]    |
| [date]   | [property 1]        | Standard   | $[X]    | $[X]    |
| [date]   | [property 2]        | Standard   | $[X]    | $[X]    |
| [date]   | [property 1]        | Deep (between long stays) | $[X] | $[X] |
| [date]   | [property 1]        | Late-notice (+25%)        | $[X] | $[X] |
| ...      |                     |            |         |        |
| **Subtotal turnovers**                                  | **$[X]** |

RESTOCKS PASS-THROUGH (cost + 15%)
| Item                                                    | Total |
| Coffee pods x [qty]                                     | $[X]  |
| Hand soap refills x [qty]                               | $[X]  |
| Toilet paper x [qty]                                    | $[X]  |
| Paper towels x [qty]                                    | $[X]  |
| Bin liners x [qty]                                      | $[X]  |
| Misc                                                    | $[X]  |
| **Subtotal restocks**                                   | **$[X]** |

LINEN HANDLING (if applicable)
| Pickup + drop-off × [N] turns × $[X]                    | $[X]  |

| **Subtotal**                                            | **$[X]** |
| Tax                                                     | $[X]    |
| **TOTAL DUE**                                           | **$[X]** |

PAYMENT
Net 7. Stripe link / EFT / [GoCardless DD].

PHOTO EVIDENCE
All turnover photo packs from this period: [link archive]

— [your name]
[Business name]
```

## NDIS invoice — plan-managed

```
INVOICE — [Business name]
=========================
Invoice #:      INV-NDIS-[YYYYMM]-[N]
Issued:         [date]
Due:            [per plan manager terms — usually 7-14 days]

BILL TO
[Plan manager business name]
[Plan manager billing email]
Re: Participant [first name only], NDIS # [#]

SERVICE DETAILS
Provider:           [Business name]
Provider ABN:       [#]
Worker:             [name]
NDIS Worker Screening Check #: [#]
NDIS Orientation Module: completed [date]
NDIS Code of Conduct: agreed [date]

LINE ITEMS — per NDIS Pricing Arrangements

| Service date | Hours | Item code           | Rate $/hr | Total |
|---|---|---|---|---|
| [date]       | 3.0   | 01_011_0107_1_1     | $[X]     | $[X]  |
| [date]       | 3.0   | 01_011_0107_1_1     | $[X]     | $[X]  |
| ...          |       |                     |          |       |
| **Total**    |       |                     |          | **$[X]** |

PAYMENT
[Plan manager bank details / via PRODA portal claim]

Proof of service for each line is attached / available in
our system.

— [your name]
[Business name]
[Provider ABN]
[Worker Screening + Orientation Module current]
```

## NDIS invoice — self-managed (to participant)

Same as above but BILL TO is the participant + their preferred
payment method (typically Stripe link or EFT).

## NDIS — NDIA-managed claim

No customer invoice — claim is lodged via PRODA / myplace
portal directly. Internal record only:

```
NDIS CLAIM RECORD
=================
Claim date:       [date]
Participant:      [first name + NDIS #]
Item code:        [from NDIS Pricing Arrangements]
Hours:            [N]
Rate:             $[X]/hr
Total claimed:    $[X]
PRODA reference:  [#]
Status:           [Submitted | Paid | Rejected — log reason]
```

## Hard rules (across all variants)

- **Always include photo evidence pack link** with bond / STR
  / commercial / post-build invoices.
- **Always show line items** matching original quote. Mark
  any variation with a note ("variation — smoker residue
  added 2 hrs labour + extra degreaser, agreed mid-clean").
- **Never silently add charges** the customer didn't agree to.
- **Always include warranty / guarantee window** (72-hr bond,
  7-day satisfaction, 24-hr recurring re-clean).
- **Tax label correct for region** (GST in AU/NZ/CA, VAT in
  UK, sales tax in US — varies by state).
- **Show deposit credit clearly** — bond cleans should show
  original total, less 30% deposit, equals due now.
- **NDIS invoices MUST cite NDIS Pricing Arrangements item
  code.** Wrong code = invoice rejected.
- **Plan-managed NDIS goes to plan manager**, not participant.
- **Commercial Net 30 by default** unless contract specifies
  otherwise.
- **STR statements Net 7 by default** with monthly cycle.
- **ABN / VAT / EIN at the bottom** — required for compliance
  in most regions.
- **Public liability + worker comp policy # in the footer** —
  commercial customers verify this.
