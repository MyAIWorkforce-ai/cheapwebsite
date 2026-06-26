---
name: cleaner-invoice-payment
description: Generate the invoice (one-off Stripe link, recurring direct-debit auto-trigger, commercial Net 30, NDIS-specific). Embed payment links. Track receipt. Chase politely after due date. Manage direct debit failures for recurring.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: [stripe.invoice.create, gocardless.payment.create, square.invoice.create]
---

# Invoice + payment

## Your job

After the job is done and the sign-off is signed, generate the
invoice and send it with a clear payment method. Track when it's
paid. Chase politely if it's late. Manage direct debit setup +
failures for recurring contracts.

## Invoice path by customer type

| Customer type | Payment method | Terms |
|---|---|---|
| Bond clean (renter) | 30% deposit at booking + 70% Stripe link on completion day | Pre-clean |
| One-off deep / move-in / post-build | Stripe link on completion | Net 7 |
| Specialty one-off | Stripe link on completion | Net 7 |
| Recurring residential | Direct debit on visit-day (GoCardless / Stripe DD) | Auto-charge |
| Recurring commercial nightly | Monthly invoice, Net 30 | Net 30 |
| STR turnover (per-host) | Monthly statement covering prior month's turns | Net 7 |
| NDIS — plan-managed | Invoice to plan manager | Per plan manager terms (usually 7-30 days) |
| NDIS — self-managed | Invoice to participant | Net 7-14 |
| NDIS — NDIA-managed | Claim via PRODA / myplace portal | Per NDIA |
| Real estate agent (bond — billed to agent) | Invoice to agency | Often 14-30 days (slow-pay common) |

## Invoice rule of thumb

The invoice mirrors the quote, plus:
- Any variations agreed during the job (the smoker bond clean
  took 2 extra hours and we agreed to a $180 variation)
- Any add-ons added on the day (carpet steam was originally
  declined; customer changed their mind on arrival)
- Less deposit credited (for bond cleans with the 30% deposit)
- Photo evidence pack link (always)

The invoice does NOT include surprises. If something cost more
than quoted and you didn't get it agreed mid-job, eat it.
Cleaners who surprise-bill don't get repeat work — and
property managers tell other property managers.

## Invoice template — ONE-OFF (bond / deep / etc.)

```
INVOICE — [Business name]
=========================
Invoice #:      INV-[YYYYMM]-[N]
Issued:         [date]
Due:            [date — per BUSINESS CONFIG terms]

BILL TO
[Customer name]
[Customer billing address — or agent address if billing to agent]
[Customer ABN/VAT/EIN if commercial]

JOB
[Address where work was done]
[Date(s) work performed]
[One-line job summary — e.g. "Bond clean, 3-bed unit"]

LINE ITEMS

| Item                                  | Qty  | Unit price | Total    |
|---|---|---|---|
| Bond clean (3-bed, 9 hrs × 2 cleaners)| 1    | $920.00    | $920.00  |
| Carpet steam clean (3 rooms)          | 3    | $55.00     | $165.00  |
| Oven deep clean                       | 1    | $65.00     | $65.00   |
| External windows (12)                 | 12   | $5.00      | $60.00   |
| Pest fumigation cert (QLD only —      |      |            |          |
   sub-contracted, pass-through)        | 1    | $190.00    | $190.00  |
| [Variation if any — labelled]         | [n]  | $[X]       | $[X]     |
| **Subtotal**                          |      |            | **$1,400**|
| GST (10%) / VAT / Sales tax           |      |            | $140.00  |
| Less deposit paid [date]              |      |            | -$420.00 |
| **TOTAL DUE**                         |      |            | **$1,120.00** |

PAYMENT

Option 1 — Stripe (instant, covers card / Apple Pay / Google Pay):
[Stripe hosted invoice URL]

Option 2 — EFT:
  BSB:    [from BUSINESS CONFIG]
  Acct:   [from BUSINESS CONFIG]
  Ref:    INV-[YYYYMM]-[N]

PHOTO EVIDENCE PACK
[Link to time-stamped photo pack — kitchen, bathrooms,
bedrooms, living areas]
Sent at: [time]

72-HOUR BOND GUARANTEE
Activated at [completion time]. If the property manager flags
anything missed within 72 hours, reply to this invoice with a
screenshot of their email — we attend free of charge to re-clean.

WARRANTY
Bond clean: 72-hour guarantee (above).
For one-off deep / move-in / post-build: 7-day satisfaction
guarantee — anything missed, flag within 7 days and we'll come
back free.

Thanks for the work,
[your name]
[Business name]
[ABN / VAT / EIN]
[Public liability: $X, [insurer]]
[Email + phone]
```

## Invoice template — RECURRING RESIDENTIAL (direct debit)

For recurring contracts, payment is usually auto-charged. The
"invoice" is really a receipt that confirms the visit + the
charge.

```
VISIT RECEIPT — [Business name]
=================================
Customer:         [name]
Property:         [address]
Visit date:       [date]
Visit type:       [weekly / fortnightly / monthly] recurring
Receipt #:        RCT-[YYYYMM]-[N]
Issued:           [date]

LINE ITEMS

| Item                                          | Total    |
|---|---|
| Fortnightly clean (per contract)              | $145.00  |
| Carpet steam — flagged for next month         | (quoted) |
| Tax included                                  | -        |
| **Total charged today**                       | **$145.00**|

PAYMENT
Auto-charged via direct debit on visit-day.
[GoCardless transaction ID / Stripe payment ID]
Status: PAID

PHOTO (optional — internal)
Mid-clean kitchen shot for your records: [link]

NEXT VISIT
[Auto-calculated from contract — e.g. fortnightly Wednesday,
next is [date]]

— [your name], [Business name]
```

## Invoice template — COMMERCIAL NIGHTLY (Net 30, monthly)

```
INVOICE — [Business name]
=========================
Invoice #:      INV-[YYYYMM]-[N]
Issued:         [first of next month, e.g. 1 [Month] [Year]]
Due:            [Net 30 — e.g. last day of [Month]]

BILL TO
[Business name]
[Address]
ABN / VAT / EIN: [#]
Attn: [facility manager / accounts payable]

PERIOD
[Previous month — e.g. 1 [Month] – 31 [Month] [Year]]

JOB
[Site address]
Service: Nightly office clean per contract [MC-XXXX]

LINE ITEMS

| Item                                          | Qty | Unit price | Total    |
|---|---|---|---|
| Nightly office clean (Mon-Fri × 4 weeks)      | 20  | $95.00     | $1,900.00|
| Public holidays (paid double) [list dates]    | 1   | $190.00    | $190.00  |
| Supplies pass-through (paper, soap, liners)   | -   | -          | $124.00  |
| Quarterly internal glass clean                | 1   | $180.00    | $180.00  |
| **Subtotal**                                  |     |            | **$2,394**|
| GST (10%) / VAT (20%) / Sales tax             |     |            | $239.40  |
| **TOTAL DUE**                                 |     |            | **$2,633.40** |

PAYMENT
Net 30 — due [date].

Option 1 — Direct debit (1% discount):
[GoCardless link / Stripe DD link]

Option 2 — EFT (preferred for commercial):
  BSB / Acct / SWIFT / IBAN:    [from BUSINESS CONFIG]
  Ref:                           INV-[YYYYMM]-[N]

Option 3 — Stripe link (cards / Apple Pay):
[link]

REPORT FOR THE PERIOD
- Visits completed: 20 (no missed)
- Issues flagged: [list — e.g. "WC 2 soap dispenser broken
  20 [date] — repaired by your facility team 22 [date]"]
- Supplies running low for next month: [list]
- Quarterly walk-through scheduled: [date]

— [your name], [Business name]
[ABN / VAT / EIN]
[Public liability + worker comp policy #]
```

## Invoice template — STR TURNOVER (monthly statement)

```
STATEMENT — STR TURNOVERS
==========================
Host:             [name]
Properties:       [list — if multiple]
Period:           [previous month]
Statement #:      STM-[YYYYMM]-[N]
Issued:           [first of next month]
Due:              Net 7

TURNOVERS THIS PERIOD

| Date     | Property            | Turn type  | Rate    | Total  |
|---|---|---|---|---|
| 03/05    | 12 Bourke St unit   | Standard   | $120.00 | $120.00|
| 07/05    | 12 Bourke St unit   | Standard   | $120.00 | $120.00|
| 11/05    | 12 Bourke St unit   | Standard   | $120.00 | $120.00|
| 15/05    | 12 Bourke St unit   | Deep (between long stays) | $185.00 | $185.00|
| 19/05    | 22 Brunswick St     | Standard   | $145.00 | $145.00|
| 23/05    | 12 Bourke St unit   | Late-notice (+25%) | $150.00 | $150.00|
| ...      |                     |            |         |        |
| **Subtotal turnovers**                                    | **$X** |

RESTOCKS PASS-THROUGH (at cost + 15%)
- Coffee pods x 60                                          | $42.00 |
- Hand soap refills x 4                                     | $18.00 |
- Toilet paper x 24                                         | $32.00 |
- ...                                                       |        |
| **Subtotal restocks**                                     | **$X** |

LINEN HANDLING (if applicable)
- Pickup + drop-off × [N] turns × $[X]                      | $X     |

| **Subtotal**                                              | **$X** |
| Tax                                                       | $X     |
| **TOTAL DUE**                                             | **$X** |

PAYMENT
Net 7. Stripe link / EFT / [GoCardless DD link].

PHOTO EVIDENCE
All turnover photo packs from this period available here:
[link to archive]

— [your name], [Business name]
```

## Invoice template — NDIS (plan-managed example)

```
INVOICE — [Business name]
=========================
Invoice #:      INV-NDIS-[YYYYMM]-[N]
Issued:         [date]
Due:            [per plan manager terms — usually 7-14 days]

BILL TO
[Plan manager business name]
[Plan manager email]
Re: Participant [first name only], NDIS # [#]

SERVICE DETAILS
Provider:           [Business name]
Provider ABN:       [#]
Worker:             [name]
NDIS Worker Screening Check #: [#]
NDIS Orientation Module completed: [date]

LINE ITEMS — per NDIS Pricing Arrangements

| Service date | Hours | Item code | Rate $/hr | Total    |
|---|---|---|---|---|
| 03/05/2026   | 3.0   | 01_011_0107_1_1 | $X    | $X       |
| 17/05/2026   | 3.0   | 01_011_0107_1_1 | $X    | $X       |
| ...          |       |                 |       |          |
| **Total**    |       |                 |       | **$X**   |

PAYMENT
[Plan manager bank details / via PRODA portal claim]

Proof of service for each line is attached / available in
our system.

— [your name], [Business name]
[Provider ABN]
[Worker Screening + Orientation Module current]
```

## Stripe / GoCardless / Square integration

If BUSINESS CONFIG has Stripe connected, generate the payment
link via `stripe.invoice.create`:

```json
{
  "customer": "[customer email]",
  "description": "Invoice INV-[YYYYMM]-[N] for [job summary]",
  "amount_due": [total in cents],
  "currency": "[from BUSINESS CONFIG]",
  "collection_method": "send_invoice",
  "days_until_due": [per BUSINESS CONFIG terms]
}
```

Embed the resulting `hosted_invoice_url` in the email / SMS.

For recurring direct debit:

**GoCardless (UK + EU):**
```json
{
  "customer": "[customer ID]",
  "mandate": "[mandate ID after authorisation]",
  "charge_date": "[visit date]",
  "amount": [total in pence],
  "currency": "GBP",
  "description": "Fortnightly clean — [date]"
}
```

**Stripe Direct Debit (AU PayTo, US ACH, UK BACS):**
```json
{
  "customer": "[customer]",
  "payment_method": "[saved DD method]",
  "amount": [total in cents],
  "currency": "[region]",
  "confirm": true
}
```

For Square, equivalent flow via Square Invoices API.

For manual EFT only: include BSB / SWIFT / IBAN details + the
invoice reference as the "payment ref."

## Direct debit failure handling

For recurring contracts on direct debit, occasional failures
happen (insufficient funds, customer changed bank, mandate
expired). The agent runs:

1. **First failure:** Auto-retry in 3 business days. SMS to
   customer:
```
Hi [name] — heads up, the direct debit for [date] visit
didn't go through (likely insufficient funds or bank issue).
We'll auto-retry on [date+3]. If you'd rather pay another
way, here's a Stripe link: [link]. No charge for the bounced
payment — we cover that.

— [your name]
```

2. **Second failure:** Pause future direct debits, ask
   customer for a new method:
```
Hi [name] — second direct debit attempt didn't clear. Want to
update the payment method or use a Stripe link for now? We'll
pause future direct debits until sorted. Cleaning continues
as scheduled (don't want you to lose your slot).

— [your name]
```

3. **Third failure or 14 days without resolution:** Surface to
   operator. Operator decides — pause cleaning, switch to
   manual invoicing, or terminate the contract.

## Send the invoice

Email is the default for invoices (paper trail). SMS works for
small (<$300) callout invoices where the customer prefers it.

```
EMAIL SUBJECT: Invoice INV-[YYYYMM]-[N] for [job summary] at [address]

Hi [name],

Here's the invoice for the [bond clean / deep / etc.] today.
Total: $[X] (deposit of $[Y] already credited).

Pay instantly via the Stripe link in the invoice (covers card,
Apple Pay). Or EFT — BSB and account in the invoice.

Photo evidence pack from today's clean: [link]
[for bond cleans]
Already sent to your property manager too.

72-hour bond guarantee active until [date+72h].

Any questions, just reply.

Thanks,
[your name]
[Business name]
```

## Payment tracking

For each invoice sent:

```
INVOICE #<n> — <timestamp>
Customer:         [name]
Amount:           $[X]
Deposit credited: $[Y]
Amount due:       $[Z]
Due date:         [date]
Payment method:   [Stripe link sent / Direct debit auto-trigger /
                    Square / EFT only / NDIS plan-manager claim]
Status:           [SENT | PAID | OVERDUE | DISPUTED | DD-FAILED]
Paid date:        [when]
Photo pack:       [link — for bond / commercial / STR]
72-hr guarantee end: [date — bond cleans only]
```

## Chase polite, chase predictable

If one-off invoice is overdue by 3 days:

```
Hi [name] — gentle bump on invoice [INV-XXX] from [date].
Total $[X] still showing as outstanding. Pay link / EFT
details same as the original invoice. Let me know if there's
anything holding it up.

— [your name]
```

If overdue by 10 days:

```
Hi [name] — invoice [INV-XXX] now 10 days overdue. Please pay
by [date + 5 days] or get back to me with a reason for the
delay. If late payment becomes a pattern, late fees per the
original quote will apply.

— [your name]
```

If overdue by 20 days, surface to the operator — don't
auto-send debt collection language. Operator decides next step.

## Special case — real estate agent / property manager invoices

Managed-property bond clean invoices have a slower payment
cycle (often 14-30 days) because they go through landlord
approval. Don't chase them on the 7-day cycle. Adjust due date
upfront based on customer type (BUSINESS CONFIG → invoice
terms by customer type if available).

When chasing managed properties:
- Address the chase to the property manager, not the tenant
- Reference the landlord's name if known
- Don't escalate before 21 days

## Special case — commercial Net 30 chase

Commercial invoices have a fixed Net 30. The agent chases at
35 days (5 days past due):

```
Hi [accounts payable contact] — invoice INV-XXX from [date]
now slightly past Net 30. Total $[X] still outstanding. We
appreciate the prompt sort-out. Same payment methods as
the invoice.

— [your name], [Business name]
```

Then at 45 days, escalate to the facility manager (the person
who knows you and likes your work):

```
Hi [facility manager name] — wanted to flag that the [Month]
invoice is 15 days past due. Probably stuck in accounts —
mind giving them a nudge? Thanks for your help.

— [your name]
```

## Hard rules

- **Always include photo evidence pack link** with bond / STR
  / commercial / post-build invoices.
- **Always show the line items** matching the original quote.
  If a line item changed from the quote, mark the change with
  a note ("variation — smoker residue added 2 hrs labour + 1
  bottle degreaser, agreed mid-clean").
- **Never silently add charges** the customer didn't agree
  to.
- **Always include the warranty / guarantee window** (72-hr
  bond, 7-day satisfaction, 24-hr recurring re-clean).
- **Tax label correct for region** (GST in AU/NZ/CA, VAT in
  UK, sales tax in US — varies by state).
- **Show the deposit credit clearly** — bond cleans should
  show original total, less 30% deposit, equals due now.
- **Direct debit terms must be in the contract first.** Never
  set up DD without a signed contract.
- **NDIS invoices MUST cite the NDIS Pricing Arrangements
  item code.** Wrong code = invoice rejected.
- **Plan-managed NDIS goes to plan manager**, not participant.
  Self-managed goes to participant. NDIA-managed claims via
  PRODA portal.

## Reading the learnings.md

Open `learnings.md`. If:
- Customer is a repeat → mention it ("thanks for the repeat
  work")
- Customer was slow-pay last time → tighten the chase cadence,
  consider COD on next job
- Customer is a real estate agent → check their preferred
  invoicing format (some want PDF + spreadsheet line items;
  some want it on agency-branded paper)
- Customer is on direct debit → confirm the DD was successful
  before the next visit
- Commercial customer has had repeat invoice issues → flag
  for relationship check in `09-recurring-maintenance.md`
- NDIS plan-manager has been slow-pay → not the participant's
  fault; chase the plan manager, don't pause the cleaning

## Confirm + handoff

> *"Invoice INV-[XXX] sent for $[X]. Photo pack attached.
> [Direct debit triggered / Stripe link sent / EFT details
> included]. Watching for payment. Loading
> `11-followup-reviews.md` for next-day follow-up + 3-day
> review request + recurring-conversion offer."*
