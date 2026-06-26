# Invoice template

For firm-side billing. Three variants: recurring monthly fixed-
fee (direct debit), one-off project / catch-up milestone, and
quarterly lodgement fee (Tier 1 compliance-only). The agent fills
this from BUSINESS CONFIG + matching engagement letter +
variations + lodgement records.

## Variant 1 — Recurring monthly fixed-fee (Direct Debit notification)

For Tier 2 / 3 / 4 clients on recurring DD. The "invoice" is
really a notification + tax receipt; payment happens automatically
on the 1st via GoCardless / Stripe DD / Ignition.

```
TAX INVOICE — [Firm name]
=========================
Invoice #:        INV-[YYYYMM]-[N]
Issued:           [date — 1st of month]
DD collection:    [date — 1st of month (or business-day-equivalent)]
Status:           AUTOMATICALLY COLLECTED VIA DIRECT DEBIT

BILL TO
[Client name]
[Client billing address]
[Client ABN / VAT / EIN / BN]

ENGAGEMENT
Per engagement letter dated [date]
Tier: [T2 / T3 / T4]
Engagement #: [ENG-XXX]

LINE ITEMS

| Item                                          | Qty | Unit price | Total    |
|---|---|---|---|
| Monthly bookkeeping — Tier [X]                | 1   | $[X]       | $[X]     |
| Period: [month YYYY] (in advance)             |     |            |          |
| Payroll add-on: [N] active employees           | [N] | $[X]       | $[X]     |
| A2X reconciliation add-on (Shopify)           | 1   | $[X]       | $[X]     |
| Spotlight Reporting quarterly pack (if due)   | 1   | $[X]       | $[X]     |
| **Subtotal**                                  |     |            | **$[X]** |
| GST / VAT / sales tax ([%])                   |     |            | $[X]     |
| **TOTAL CHARGED**                             |     |            | **$[X]** |

PAYMENT
Direct debit collected via [GoCardless / Stripe / Ignition] from
[bank account / card ending XXXX] on [date]. No action required.

If anything's changed at your end (different bank, card replaced,
fee discussion needed), reply or call [phone] before [DD
collection date].

ENGAGEMENT STATUS
Last month-end close: [date]
Next BAS / VAT due: [date]
Annual review meeting: [scheduled date]

Thanks for the work,
[your name]
[Firm name]
[BAS Agent # / Tax Agent # / HMRC agent code]
[ABN / VAT / EIN / BN]
[Email] · [Phone]
```

## Variant 2 — One-off project / catch-up / milestone

For catch-up, EOY clean-up, audit support, migration, ad-hoc
project work.

```
TAX INVOICE — [Firm name]
=========================
Invoice #:      INV-[YYYYMM]-[N]
Issued:         [date]
Due:            [date — per engagement terms, usually Net 7]

BILL TO
[Client name]
[Client billing address]
[Client ABN / VAT / EIN / BN]

ENGAGEMENT
[Catch-up bookkeeping FY24-FY25 / EOY clean-up FY25 / etc.]
Per engagement letter dated [date]
Total contract value: $[X] + GST = $[Y]

LINE ITEMS

| Item                                              | Qty | Unit price | Total    |
|---|---|---|---|
| [Engagement name] — milestone [X] of [Y]          | 1   | $[X]       | $[X]     |
|   ([Brief description of milestone — e.g. "FY24   |     |            |          |
|     Q1+Q2 reconciliation complete; BAS packs      |     |            |          |
|     ready for handover to Tax Agent"])            |     |            |          |
|                                                   |     |            |          |
| [If hourly: hours worked + rate]                  |     |            |          |
|   [Partner hours: 4 @ $180/hr]                    | 4   | $180       | $720     |
|   [Senior bookkeeper hours: 12 @ $110/hr]         | 12  | $110       | $1,320   |
|   [Junior bookkeeper hours: 18 @ $75/hr]          | 18  | $75        | $1,350   |
|                                                   |     |            |          |
| [Variations agreed in writing — separately
   labelled]                                        |     |            |          |
|   Variation 1: additional supplier setup          | 1   | $240       | $240     |
|     (38 extra suppliers beyond review estimate,   |     |            |          |
|      agreed by email [date], at $40/supplier)     |     |            |          |
|                                                   |     |            |          |
| **Subtotal**                                      |     |            | **$[X]** |
| GST / VAT / sales tax ([%])                       |     |            | $[X]     |
| Less deposit credit (paid [date])                 |     |            | -$[X]    |
| **TOTAL DUE**                                     |     |            | **$[X]** |

PAYMENT

Option 1 — Stripe (instant, covers card / Apple Pay / BPAY):
[Stripe payment link]

Option 2 — EFT:
  BSB:    [from BUSINESS CONFIG]
  Acct:   [from BUSINESS CONFIG]
  Ref:    INV-[YYYYMM]-[N]

  (UK SEPA / US ACH / CA EFT details as applicable per BUSINESS
   CONFIG)

VARIATION RECORD
[List of variations during the engagement, with dates agreed.
 Each variation must have been agreed in writing — by email or via
 Ignition variation — before being billed. The agent NEVER
 surprise-bills a variation.]

[Variation 1: described above, agreed [date] by email]

WORK DELIVERED (for your records + Tax Agent)
- [List of artefacts delivered — e.g. "FY24 Q1-Q4 BAS packs,
   FY24 EOFY trial balance, FY24 EOFY P&L + BS + GST detailed,
   workpaper file"]
- [Saved to: Karbon / shared folder / sent by email date X]

WARRANTY
12 months on workmanship from delivery. Any errors identified by
you (or your Tax Agent) within that window — corrected free.

CONVERT-TO-MONTHLY [for catch-up + EOY engagements]
If you'd like to stay current going forward, your file is in
shape for Tier [X] monthly at $[Y]/mo. Most catch-up clients
convert — marginal cost of staying current is far less than
another catch-up.

Reply "set up monthly" and I'll send the engagement letter +
direct debit mandate.

LATE PAYMENT
[Per BUSINESS CONFIG — e.g. "Late fee 2% per month after 14
days" or "No late fee — please get in touch if you need
flexibility"]

Thanks for the work,
[your name]
[Firm name]
[BAS Agent # / Tax Agent # / HMRC agent code]
[ABN / VAT / EIN / BN]
[Email] · [Phone]
```

## Variant 3 — Quarterly BAS / VAT lodgement fee (Tier 1)

For Tier 1 compliance-only clients where the BAS / VAT fee is
billed per lodgement.

```
TAX INVOICE — [Firm name]
=========================
Invoice #:      INV-[YYYYMM]-[N]
Issued:         [date — lodgement day]
Due:            [date + 7] Net 7

BILL TO
[Client name]
[Client billing address]
[Client ABN / VAT / EIN / BN]

ENGAGEMENT
Per Tier 1 compliance-only engagement dated [date]

LINE ITEMS

| Item                                           | Qty | Unit price | Total    |
|---|---|---|---|
| Quarterly BAS preparation + lodgement          | 1   | $[X]       | $[X]     |
|   Period: Q[X] FY[year] ([start] - [end])      |     |            |          |
|   Lodged: [ATO Online Services for Agents /    |     |            |          |
|           HMRC MTD bridge / CRA My Business    |     |            |          |
|           Account] on [date]                   |     |            |          |
|   Lodgement receipt: [#ref]                    |     |            |          |
|                                                |     |            |          |
| Bank rec sign-off review (if separate item)    | 1   | $[X]       | $[X]     |
|                                                |     |            |          |
| **Subtotal**                                   |     |            | **$[X]** |
| GST / VAT (10% / 20%)                          |     |            | $[X]     |
| **TOTAL DUE**                                  |     |            | **$[X]** |

PAYMENT
[Stripe link]
[EFT details]

OFFER — switch to recurring monthly direct debit?
At Tier 1 compliance-only with quarterly invoicing, you're paying
$[X] per BAS = $[Y]/yr. On Tier 2 — Basic Monthly at $[Z]/mo
($[T]/yr), you'd get:

- Monthly bank rec (vs you doing it)
- Hubdoc receipt processing
- GST coding sanity check across every txn
- Quarterly BAS still included (no extra fee)
- Monthly P&L + BS emailed

About [$X] more per year, but you'd stop doing your own books.

Reply "Tier 2 me up" and I'll send the engagement letter.

Thanks for the work,
[your name]
[Firm name]
[BAS Agent #]
[ABN]
[Email] · [Phone]
```

## Hard rules across all variants

- **Tax label correct for region** (GST 10% AU/NZ-equivalent, VAT
  20% UK, sales tax US varies by state, GST/HST/PST CA varies by
  province)
- **Engagement number cross-referenced** so any dispute can be
  traced
- **Variations never surprise the client** — must have been
  agreed in writing before they land on the invoice
- **Deposit credit shown clearly** for staged invoicing
- **Lodgement receipt # captured** on lodgement-related invoices
  for regulatory record
- **Direct debit confirmation** for recurring runs — never debit
  silently; always notify
- **Tax Agent / BAS Agent / registration # at the bottom** —
  required for compliance and credibility
- **Warranty stated** — 12 months minimum
- **For UK invoices**: include the firm's VAT number and the
  MTD-compliant invoice format
- **For US**: include EIN; state sales tax registration # if
  applicable
- **For CA**: include BN with RT0001 (GST/HST registrant)
