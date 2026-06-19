---
name: electrician-invoice-payment
description: Generate the invoice (matching the original quote + any variations + cert). Embed a Stripe/Square payment link. Send to customer. Track receipt. Chase politely after due date.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: [stripe.invoice.create, square.invoice.create]
---

# Invoice + payment

## Your job

After the job is done and the cert is signed, generate the invoice
and send it with a clear payment method. Track when it's paid. Chase
politely if it's late.

## Invoice rule of thumb

The invoice mirrors the quote, plus:
- Any variations agreed during the job
- The compliance cert fee (if not in original quote)
- The actual hours worked (if different from estimate — but show
  the variance honestly)

The invoice does NOT include surprises. If something cost more than
quoted and you didn't get it agreed mid-job, eat it. Trades who
surprise-bill don't get repeat work.

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
| Callout fee                           | 1    | $99.00     | $99.00   |
| Labour — standard rate                | 4.5  | $125.00    | $562.50  |
| Apprentice labour                     | 2.0  | $65.00     | $130.00  |
| [Materials — itemised, e.g.:]         |      |            |          |
| Clipsal 16A RCBO                      | 4    | $80.00     | $320.00  |
| Cable + termination                   | -    | -          | $45.00   |
| Certificate of Compliance fee         | 1    | $35.00     | $35.00   |
| **Subtotal**                          |      |            | **$1,191.50** |
| GST (10%)                             |      |            | $119.15  |
| **TOTAL DUE**                         |      |            | **$1,310.65** |

PAYMENT
Pay via Stripe (instant — covers card, BPAY, Apple Pay):
[Stripe payment link]

Or EFT:
  BSB:    [from BUSINESS CONFIG]
  Acct:   [from BUSINESS CONFIG]
  Ref:    INV-[YYYYMM]-[N]

CERTIFICATE OF COMPLIANCE
Attached: [cert filename] — please keep for property records.

WARRANTY
12 months on workmanship from job completion date.

Thanks for the work,
[your name]
[Business name]
[License #]
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

Here's the invoice for the work today. Total: $[X].

Pay instantly via the Stripe link in the invoice (covers card, Apple
Pay, BPAY). Or EFT — BSB and account in the invoice.

Cert of Compliance attached for your records.

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
Due date:        [date]
Payment method:  [Stripe link sent / Square / EFT only]
Status:          [SENT | PAID | OVERDUE | DISPUTED]
Paid date:       [when]
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

## Hard rules

- **Always include the cert** as an attachment with the invoice.
- **Always show the line items** matching the original quote. If a
  line item changed from the quote, mark the change with a note
  ("variation — added under-cabinet light per Mrs Smith's request").
- **Never silently add charges** the customer didn't agree to.
- **Always include the warranty period** (12 months minimum on
  workmanship, per BUSINESS CONFIG).
- **Tax label correct for region** (GST in AU/NZ/CA, VAT in UK, sales
  tax in US — varies by state).
- **License + ABN/VAT/EIN at the bottom** — required for compliance
  in most regions.

## Reading the learnings.md

Open `learnings.md`. If:
- Customer is a repeat → mention it ("thanks for the repeat work")
- Customer was slow-pay last time → tighten the chase cadence
- Customer is a builder/property mgr → check their preferred
  invoicing system (Xero, MYOB, sometimes they want a specific format)

## Confirm + handoff

> *"Invoice INV-[XXX] sent for $[X]. Watching for payment. Loading
> `11-followup-reviews.md` for next-day follow-up + 3-day review
> request."*
