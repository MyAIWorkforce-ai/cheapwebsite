---
name: plumber-invoice-payment
description: Generate the invoice (matching the original quote + any variations + cert). Embed a Stripe/Square payment link. Send to customer. Track receipt. Chase politely after due date.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: [stripe.invoice.create, square.invoice.create]
---

# Invoice + payment

## Your job

After the job is done and the cert(s) are signed, generate the invoice
and send it with a clear payment method. Track when it's paid. Chase
politely if it's late.

## Invoice rule of thumb

The invoice mirrors the quote, plus:
- Any variations agreed during the job (the rotted wall plate, the
  seized isolation valve that needed replacing, the second IO that
  was hidden under the deck)
- The compliance cert fee(s) (plumbing + gas, if not in original
  quote)
- The actual hours worked (if different from estimate — but show
  the variance honestly)
- Deposit credited (for staged jobs)

The invoice does NOT include surprises. If something cost more than
quoted and you didn't get it agreed mid-job, eat it. Plumbers who
surprise-bill don't get repeat work — and tenants tell other tenants.

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
| Callout fee                           | 1    | $130.00    | $130.00  |
| Labour — standard rate                | 4.0  | $110.00    | $440.00  |
| Apprentice / 2nd-pair labour          | 1.5  | $60.00     | $90.00   |
| [Materials — itemised, e.g.:]         |      |            |          |
| Rheem Stellar 360L gas continuous     | 1    | $1,485.00  | $1,485.00|
| Pressure-limiting valve 500 kPa       | 1    | $48.00     | $48.00   |
| Tundish kit 20mm                      | 1    | $35.00     | $35.00   |
| Copper gas line + fittings (4m)       | -    | -          | $145.00  |
| Mini-stop valves                      | 3    | $12.00     | $36.00   |
| Plumbing Compliance Cert fee          | 1    | $35.00     | $35.00   |
| Gas Type A Compliance Plate + Cert    | 1    | $55.00     | $55.00   |
| Old unit disposal (scrap)             | 1    | $20.00     | $20.00   |
| **Subtotal**                          |      |            | **$2,519.00** |
| GST (10%)                             |      |            | $251.90  |
| Less deposit paid [date]              |      |            | -$852.72 |
| **TOTAL DUE**                         |      |            | **$1,918.18** |

PAYMENT
Pay via Stripe (instant — covers card, BPAY, Apple Pay):
[Stripe payment link]

Or EFT:
  BSB:    [from BUSINESS CONFIG]
  Acct:   [from BUSINESS CONFIG]
  Ref:    INV-[YYYYMM]-[N]

CERTIFICATES ATTACHED
- Plumbing Compliance Certificate (please keep for property records —
  conveyancers and insurers will ask for this)
- Gas Type A Compliance Certificate (keep with the property gas
  records — required at next gas check or sale)

WARRANTY
12 months on workmanship from job completion date.
Rheem manufacturer warranty: 12 years on cylinder, 3 years on parts —
registered in your name.

Thanks for the work,
[your name]
[Business name]
[Plumbing Lic # / Gas Type A #]
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
small (<$300) callout invoices where the customer prefers it.

```
EMAIL SUBJECT: Invoice INV-[YYYYMM]-[N] for [job summary] at [address]

Hi [name],

Here's the invoice for the work today. Total: $[X] (deposit of
$[Y] already credited).

Pay instantly via the Stripe link in the invoice (covers card, Apple
Pay, BPAY). Or EFT — BSB and account in the invoice.

Compliance Cert + Gas Cert attached for your records — these are
worth holding onto for any future sale or insurance event.

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
Cert(s) attached: [list]
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

## Hard rules

- **Always include the cert(s)** as attachment with the invoice.
  Plumbing + gas if both apply.
- **Always show the line items** matching the original quote. If a
  line item changed from the quote, mark the change with a note
  ("variation — added isolation valve at customer's request,
  $25 part + 10 mins").
- **Never silently add charges** the customer didn't agree to.
- **Always include the warranty period** (12 months minimum on
  workmanship, per BUSINESS CONFIG). Note the separate manufacturer
  warranty on cylinders / appliances.
- **Tax label correct for region** (GST in AU/NZ/CA, VAT in UK, sales
  tax in US — varies by state).
- **Plumbing licence + ABN/VAT/EIN at the bottom** — required for
  compliance in most regions.
- **Show the deposit credit clearly** — staged invoices for projects
  should show original total, less deposit, equals due now.

## Reading the learnings.md

Open `learnings.md`. If:
- Customer is a repeat → mention it ("thanks for the repeat work")
- Customer was slow-pay last time → tighten the chase cadence,
  consider COD on next job
- Customer is a builder/property mgr → check their preferred
  invoicing system (Xero, MYOB, simPRO PM portal, sometimes they
  want a specific format)
- Customer is body corp/strata → invoice often goes to a strata
  manager, not the building — confirm the bill-to address

## Confirm + handoff

> *"Invoice INV-[XXX] sent for $[X]. Cert(s) attached. Watching for
> payment. Loading `11-followup-reviews.md` for next-day follow-up +
> 3-day review request."*
