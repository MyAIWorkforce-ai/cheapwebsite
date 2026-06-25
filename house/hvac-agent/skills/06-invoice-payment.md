---
name: hvac-invoice-payment
description: Generate the invoice (matching the original quote + any variations + refrigerant log + handover pack). Embed a Stripe/Square payment link. Send to customer. Track receipt. Chase politely after due date.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: [stripe.invoice.create, square.invoice.create]
---

# Invoice + payment

## Your job

After the job is done and the refrigerant logbook + handover pack
are signed, generate the invoice and send it with a clear payment
method. Track when it's paid. Chase politely if it's late.

## Invoice rule of thumb

The invoice mirrors the quote, plus:
- Any variations agreed during the job (the line set that turned
  out to be pitted, the dedicated electrical sub-circuit the sparky
  ran, the second condenser pad needed because the first ground
  spot was sloped)
- The refrigerant cylinder usage (kg of R32 / R410A / R454B charged
  + any recovery + disposal cost)
- The compliance + commissioning fees (refrigerant logbook,
  warranty registration, certified disposal of old refrigerant)
- The actual hours worked (if different from estimate — but show
  the variance honestly)
- Deposit credited (for staged jobs)

The invoice does NOT include surprises. If something cost more than
quoted and you didn't get it agreed mid-job, eat it. HVAC techs who
surprise-bill don't get repeat work — and homeowners tell other
homeowners, especially in suburbs where neighbours compare AC
brands at BBQs.

## Invoice template

```
INVOICE — [Business name]
=========================
Invoice #:      INV-[YYYYMM]-[N]
Issued:         [date]
Due:            [date — per BUSINESS CONFIG terms]

BILL TO
[Customer name]
[Customer billing address]
[Customer ABN/VAT if commercial]

JOB
[Address where work was done]
[Date(s) work performed]
[One-line job summary]

LINE ITEMS

| Item                                  | Qty  | Unit price | Total    |
|---|---|---|---|
| Callout fee                           | 1    | $150.00    | $150.00  |
| Labour — recovery + decommission      | 1.0  | $130.00/hr | $130.00  |
| Labour — install + commissioning      | 4.25 | $130.00/hr | $552.50  |
| Apprentice / 2nd-pair labour          | 1.5  | $65.00/hr  | $97.50   |
| Daikin Cora FTKM50 5.0kW split system | 1    | $1,850.00  | $1,850.00|
| Wall bracket (outdoor) — galvanised   | 1    | $85.00     | $85.00   |
| Indoor bracket + drainage kit         | 1    | $45.00     | $45.00   |
| Insulated line set (15m)              | -    | -          | $145.00  |
| Condensate drain pipe + fittings      | -    | -          | $35.00   |
| R32 refrigerant — 1.2 kg @ $145/kg    | 1.2  | $145.00    | $174.00  |
| Refrigerant logbook + handover pack   | 1    | $35.00     | $35.00   |
| Old unit disposal (certified)         | 1    | $40.00     | $40.00   |
| Recovered R410A disposal              | 1    | $35.00     | $35.00   |
| **Subtotal**                          |      |            | **$3,374.00** |
| GST (10%)                             |      |            | $337.40  |
| Less deposit paid [date]              |      |            | -$892.65 |
| **TOTAL DUE**                         |      |            | **$2,818.75** |

PAYMENT
Pay via Stripe (instant — covers card, BPAY, Apple Pay):
[Stripe payment link]

Or EFT:
  BSB:    [from BUSINESS CONFIG]
  Acct:   [from BUSINESS CONFIG]
  Ref:    INV-[YYYYMM]-[N]

DOCUMENTATION ATTACHED
- Refrigerant logbook entry RL-[YYYYMM]-[N] (please keep for
  property records — at next sale or system service this is
  needed)
- Handover pack (warranty registration, commissioning results,
  user operation guide, equipment serials)
- [Gas cert if applicable]

WARRANTY
12 months on workmanship from install completion date.
Daikin manufacturer warranty: 5 years parts + labour (registered
in your name; rego ref [X]).
Service plan year 1: included as agreed.

Thanks for the work,
[your name]
[Business name]
[Refrigerant licence — e.g. ARC RHL Full # 12345]
[ABN / VAT / EIN]
[Email + phone]
```

## Stripe (or Square) integration

If BUSINESS CONFIG has Stripe connected, generate the payment link
via `stripe.invoice.create`:

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

Embed the resulting `hosted_invoice_url` in the email.

For Square, equivalent flow via Square Invoices API.

For manual EFT only: include BSB / SWIFT details + the invoice
reference as the "payment ref."

## Send the invoice

Email is the default for invoices (paper trail). SMS works for
small (<$400) callout invoices where the customer prefers it.

```
EMAIL SUBJECT: Invoice INV-[YYYYMM]-[N] for [job summary] at [address]

Hi [name],

Here's the invoice for the work [date]. Total: $[X] (deposit of
$[Y] already credited).

Pay instantly via the Stripe link in the invoice (covers card, Apple
Pay, BPAY). Or EFT — BSB and account in the invoice.

Refrigerant logbook + handover pack attached for your records —
these are worth holding onto for any future sale or insurance
event. Manufacturer warranty is registered in your name.

Service plan year 1 is included as agreed at quote. We'll text you
in [month next year] to book your annual service visit.

Any questions, just reply.

Thanks,
[your name]
[Business name]
```

## Payment tracking

For each invoice sent:

```
INVOICE #<n> — <timestamp>
Customer:        [name]
Amount:          $[X]
Deposit credited: $[Y]
Amount due:      $[Z]
Due date:        [date]
Payment method:  [Stripe link sent / Square / EFT only]
Status:          [SENT | PAID | OVERDUE | DISPUTED]
Paid date:       [when]
Docs attached:   [refrigerant log, handover pack, gas cert if applicable]
Service plan:    [included Y1 / not taken / declined]
```

## Chase polite, chase predictable

If invoice is overdue by 3 days:

```
Hi [name] — just a gentle bump on invoice [INV-XXX] from [date].
Total $[X] still showing as outstanding. Pay link / EFT details
same as the original invoice. Let me know if there's anything
holding it up.

— [your name]
```

If overdue by 10 days:

```
Hi [name] — invoice [INV-XXX] now 10 days overdue. Please pay by
[date + 5 days] or get back to me with a reason for the delay. If
late payment becomes a pattern, late fees per the original quote
will apply.

— [your name]
```

If overdue by 20 days, surface to the operator — don't auto-send
debt collection language. Operator decides next step.

## Special case — real estate agent / property manager invoices

Managed-property invoices have a slower payment cycle (often 14-30
days) because they go through landlord approval. Don't chase them
on the 7-day cycle. Adjust due date upfront based on customer type
(BUSINESS CONFIG → invoice terms by customer type if available).

When chasing managed properties:
- Address the chase to the property manager, not the tenant
- Reference the landlord's name if known
- Don't escalate before 21 days

## Special case — commercial / RTU invoices

Commercial customers (restaurants, retail, offices) often have
Net 30 or Net 60 terms. Don't kick into chase mode until past their
agreed terms. Their finance teams batch-pay weekly or fortnightly —
they pay on schedule, just on a slower schedule.

For RTU change-outs that exceed $10,000, consider invoicing per
phase (deposit, mid-project, commissioning) instead of one big
invoice at the end — easier on the customer's payable team.

## Hard rules

- **Always include the refrigerant logbook + handover pack** as
  attachments. They're proof of work + the customer's documentation
  for any future sale, insurance claim, or warranty event.
- **Always show the line items** matching the original quote. If a
  line item changed from the quote, mark the change with a note
  ("variation — replaced pitted line set after pressure test fail,
  $145 + 0.5 hrs").
- **Never silently add charges** the customer didn't agree to.
- **Always include the warranty period** (12 months minimum on
  workmanship, per BUSINESS CONFIG). Note the separate manufacturer
  warranty on equipment (5 years standard, 10 years on some
  Mitsubishi compressor warranties).
- **Tax label correct for region** (GST in AU/NZ/CA, VAT in UK,
  sales tax in US — varies by state).
- **Refrigerant licence + ABN/VAT/EIN at the bottom** — required for
  compliance in most regions, and lifts trust on first-time invoices.
- **Show the deposit credit clearly** — staged invoices for projects
  should show original total, less deposit, equals due now.
- **Refrigerant kg charged shown explicitly.** The customer sees how
  much went into their system; the operator's logbook math matches
  the invoice line.
- **Service plan status visible** — "Year 1 included" / "Not taken —
  $295 to add" / "Already on Plan A." Reinforces the offer.

## Reading the learnings.md

Open `learnings.md`. If:
- Customer is a repeat → mention it ("thanks for the repeat work")
- Customer was slow-pay last time → tighten the chase cadence,
  consider COD on next job
- Customer is a builder/property mgr → check their preferred
  invoicing system (Xero, MYOB, simPRO PM portal, FieldEdge — they
  often want a specific format)
- Customer is body corp/strata → invoice often goes to a strata
  manager, not the building — confirm the bill-to address
- Customer is commercial repeat with a contract → bundle the
  emergency/breakdown work into the monthly contract invoice or
  bill separately per contract terms

## Confirm + handoff

> *"Invoice INV-[XXX] sent for $[X]. Refrigerant logbook + handover
> pack attached. Watching for payment. Loading `11-followup-reviews.md`
> for next-day follow-up + 3-day review request + 7-day service plan
> ask if not already included."*
