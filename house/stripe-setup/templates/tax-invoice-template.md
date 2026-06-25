# Tax invoice templates by region

For operators sending invoices to B2B customers, the invoice
format must comply with regional rules. Stripe's default invoice
template covers most of these when business + tax IDs are filled
in. These templates are for operators sending custom invoices
outside Stripe, or for operators who want to override the
default.

---

## Australia 🇦🇺 — Tax Invoice (GST registered)

Required by ATO: "Tax Invoice" header, supplier ABN, GST amount
shown.

```
TAX INVOICE
===========
[Business name (legal name)]
ABN: [11 digits]
GST registered: Yes

Invoice number:  INV-[YYYYMM]-[N]
Issued:          [DD/MM/YYYY]
Due:             [DD/MM/YYYY]

BILL TO
[Customer name]
[Customer address]
[Customer ABN if business]

LINE ITEMS

| Description              | Qty | Unit ex-GST | Total ex-GST |
|---|---|---|---|
| [Service / product]      | 1   | $X          | $X           |
| [Another line]           | N   | $X          | $X           |
| Subtotal (ex-GST)        |     |             | $X           |
| GST 10%                  |     |             | $X           |
| **TOTAL (inc-GST)**      |     |             | **$X**       |

PAYMENT
Stripe invoice link: [URL]
EFT: BSB [BSB] / Acct [Acct]
Reference: INV-[YYYYMM]-[N]

Terms: Net 14 / Pay on receipt / etc.

[Business name]
[Address]
[Email] · [Phone]
```

For tax-inclusive pricing in AU B2C: same format but flip the
math — show GST included in the total.

---

## New Zealand 🇳🇿 — Tax Invoice

Required by IRD: "Tax Invoice" header, supplier GST number, GST
amount shown.

```
TAX INVOICE
===========
[Business name]
GST Number: [9-digit IRD GST number]

Invoice number:  INV-[YYYYMM]-[N]
Issued:          [DD/MM/YYYY]
Due:             [DD/MM/YYYY]

BILL TO
[Customer name]
[Customer address]

LINE ITEMS

| Description              | Qty | Unit ex-GST | Total ex-GST |
|---|---|---|---|
| [Service / product]      | 1   | $X          | $X           |
| Subtotal (ex-GST)        |     |             | $X           |
| GST 15%                  |     |             | $X           |
| **TOTAL (inc-GST)**      |     |             | **$X**       |

PAYMENT
Stripe link: [URL]
Bank transfer: [bank account]
Reference: INV-[YYYYMM]-[N]

Terms: Net 14

[Business name]
[NZBN: ___]
[Email] · [Phone]
```

---

## United Kingdom 🇬🇧 — VAT Invoice

Required by HMRC: VAT number, VAT rate per item, VAT amount.

```
VAT INVOICE
===========
[Business name (legal entity)]
Company number: [Companies House 8 digits]
VAT number: GB[9 digits]

Invoice number:  INV-[YYYYMM]-[N]
Issued:          [DD/MM/YYYY]
Tax point:       [DD/MM/YYYY]
Due:             [DD/MM/YYYY]

BILL TO
[Customer name]
[Customer address]
[Customer VAT number if applicable]

LINE ITEMS

| Description    | Qty | Unit Net | Total Net | VAT Rate | VAT  |
|---|---|---|---|---|---|
| [Service]      | 1   | £X       | £X        | 20%      | £X   |
| [Reduced item] | 1   | £X       | £X        | 5%       | £X   |
| Subtotal       |     |          | £X        |          |      |
| VAT total      |     |          |           |          | £X   |
| **TOTAL**      |     |          |           |          | **£X** |

VAT scheme: [Standard / Flat Rate / Cash Accounting]
(state your scheme if relevant)

PAYMENT
Stripe: [URL]
BACS: Sort [XX-XX-XX] / Acct [XXXXXXXX]
Reference: INV-[YYYYMM]-[N]

Terms: Net 30 / 14 days / on receipt

[Business name]
[Registered address]
[Email] · [Phone]
```

Notes:
- If VAT is not chargeable (e.g. reverse charge B2B EU, zero-rated
  exports), add line "Reverse charge — customer to account for VAT
  under Articles 44/196 EU VAT Directive" or "Zero-rated export"
- MTD VAT compliance: invoice must be digital + linked to your
  MTD-compatible accounting tool (Xero / QBO / FreeAgent / Sage)

---

## United States 🇺🇸 — Sales Receipt / Invoice

US has no federal "tax invoice" requirement, but B2B sales with
sales tax need to show the tax breakdown by state. Many B2B
customers want a formal invoice for their books.

```
INVOICE
=======
[Business name (DBA)]
EIN: [XX-XXXXXXX]
[State sales tax permit numbers — list each state where you're
 collecting]

Invoice number:  INV-[YYYYMM]-[N]
Issued:          [MM/DD/YYYY]
Due:             [MM/DD/YYYY]
Terms:           Net 30 / Net 14 / Due on receipt

BILL TO
[Customer name / business]
[Customer address]

LINE ITEMS

| Description              | Qty | Unit Price | Subtotal |
|---|---|---|---|
| [Service / product]      | 1   | $X         | $X       |
| Subtotal                 |     |            | $X       |
| Sales tax [State]: ___%  |     |            | $X       |
| **TOTAL**                |     |            | **$X**   |

(For multi-state: show sales tax breakdown per state separately)

PAYMENT
Stripe: [URL]
ACH: Routing [9 digits] / Acct [XXXXXXX]
Wire (if applicable): [details]
Reference: INV-[YYYYMM]-[N]

[Business name]
[Address]
[Email] · [Phone]
```

---

## Canada 🇨🇦 — Invoice with GST/HST/PST

Required by CRA for B2B: business number, tax amounts split by
type.

```
INVOICE
=======
[Business name (legal name)]
Business Number: [BN — 9 digits]RT0001 (or RC for corporation)
GST/HST registration: [if separate]

Invoice number:  INV-[YYYYMM]-[N]
Issued:          [YYYY-MM-DD]
Due:             [YYYY-MM-DD]

BILL TO
[Customer name]
[Customer address]
[Customer BN if business]

LINE ITEMS

| Description              | Qty | Unit Price | Subtotal |
|---|---|---|---|
| [Service / product]      | 1   | $X         | $X       |
| Subtotal                 |     |            | $X       |
| GST 5%                   |     |            | $X       |
| HST [Province]: ___%     |     |            | $X       |
| PST [BC/SK/MB]: ___%     |     |            | $X       |
| QST (Quebec): 9.975%     |     |            | $X       |
| **TOTAL**                |     |            | **$X**   |

(Use the applicable taxes based on customer's province; HST
provinces don't have PST. Quebec uses QST instead of PST.)

PAYMENT
Stripe: [URL]
EFT: Institution [XXX] / Transit [XXXXX] / Acct [XXXXXXX]
Reference: INV-[YYYYMM]-[N]

Terms: Net 30

[Business name]
[Address]
[Email] · [Phone]
```

---

## EU — Cross-border B2B invoice

For EU operators (or non-EU operators selling to EU B2B
customers):

```
INVOICE
=======
[Business name]
[Registered address]
VAT: [VAT number with country prefix, e.g. NL12345678B01]
Company registration: [number]

Invoice number:  INV-[YYYYMM]-[N]
Issued:          [DD-MM-YYYY]
Due:             [DD-MM-YYYY]

BILL TO
[Customer business name]
[Customer address]
[Customer VAT — required for reverse charge to apply]

LINE ITEMS

| Description    | Qty | Unit Net | Total Net |
|---|---|---|---|
| [Service]      | 1   | €X       | €X        |
| Subtotal       |     |          | €X        |
| VAT 0% (reverse charge — customer accounts for VAT)
|     |          | €0        |
| **TOTAL**      |     |          | **€X**    |

REVERSE CHARGE NOTE
"VAT reverse charge: customer to account for VAT under Article
44 of EU VAT Directive 2006/112/EC."

PAYMENT
SEPA: IBAN [XX] / BIC [XXX]
Reference: INV-[YYYYMM]-[N]

Terms: Net 30

[Business name]
[Email] · [Phone]
```

---

## How to wire these into Stripe

For operators using Stripe Invoicing:
- Settings → Customer emails → Invoices → "Email options" — customise
- Settings → Branding → "Public business name" + "Tax IDs" — fills
  the invoice header automatically
- Invoice template inherits brand logo, colour, footer text

Stripe auto-generates:
- Invoice number (custom prefix in Settings)
- Issued date + due date
- Itemised lines with tax breakdown
- Payment link (hosted invoice page)
- Reminder emails (if enabled)
- Reverse charge text (when EU B2B with customer VAT collected)

For operators outside Stripe Invoicing (issuing manually):
- Use any invoicing tool that maps to BUSINESS CONFIG tax data
- Most accounting tools (Xero / QBO / FreeAgent / etc.) generate
  region-compliant invoices automatically when set up properly

## What to NEVER leave off

| Region | Mandatory fields |
|---|---|
| AU | "Tax Invoice" header (if >$82.50 with GST), ABN, GST amount |
| NZ | "Tax Invoice" header, GST number, GST amount |
| UK | "VAT Invoice" header, VAT number, VAT rate, VAT amount, tax point date |
| US | No federal mandate; for B2B, EIN and state tax registration #s |
| CA | BN, GST/HST/PST amounts separately |
| EU | VAT number, supplier VAT, reverse charge note if applicable |

Missing any of these = invoice not legally compliant. Customer
might still pay, but for tax recovery purposes (e.g. customer
claiming VAT back), the invoice is invalid.

## Auto-incrementing invoice numbers

Most jurisdictions require sequential, gapless invoice numbering.

- AU / NZ / UK: sequential per tax period at minimum
- CA / US: best practice, not strict
- EU: strict — invoices must be sequentially numbered

Stripe Invoices auto-increment. If switching between Stripe and
external invoicing, don't share number ranges — use different
prefixes (STR-001, EXT-001).
