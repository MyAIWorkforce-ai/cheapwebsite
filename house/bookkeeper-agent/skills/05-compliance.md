---
name: bookkeeper-compliance
description: Prepare and (where firm is registered) lodge BAS / IAS / VAT / MTD / sales-tax / payroll filings. Generate the lodgement pack for partner sign-off. Handle ATO / HMRC / IRS / CRA correspondence. Manage AML/CTF documentation. Never lodge what the firm isn't registered to lodge — same rule as "no gas ticket, no gas cert" in the trades bundles.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Compliance — lodgement + correspondence + AML

## Your job

After the monthly close is done, the agent prepares the lodgement
pack for the period. For BAS-agent / Tax-agent / MTD-enrolled
firms, the agent then lodges via the regulator's portal — under
the firm's registration. For firms not registered, the agent
prepares the lodgement-ready pack and hands it off to a registered
agent.

This skill also handles:

- ATO / HMRC / IRS / CRA correspondence (penalty notices, audit
  letters, compliance reviews, clarifying responses)
- AML/CTF documentation (UK + NZ mandatory; AU expanding 2026)
- TPB / professional body annual return obligations

## The lodgement scope check — every time

Before preparing any lodgement, the agent reads BUSINESS CONFIG →
Lodgement scope and refuses to do what the firm isn't registered
for:

| Lodgement type | Required registration | If not registered |
|---|---|---|
| AU BAS (GST + PAYG-W + PAYG-I + FBT instalment) | TPB BAS Agent | Prepare pack; hand to registered BAS Agent or Tax Agent |
| AU income tax return (individual / Pty Ltd / trust / partnership) | TPB Tax Agent | Prepare workpapers; refer to Tax Agent for return |
| NZ GST | IRD tax agent listing (optional but recommended) | Prepare pack; can lodge as agent if listed; otherwise client lodges |
| NZ income tax return | IRD tax agent listing | Refer to tax agent |
| UK VAT (MTD-mandatory) | HMRC MTD VAT agent enrolment + AML supervision | If not MTD-enrolled, cannot lodge; refer |
| UK MTD ITSA (from Apr 2026) | HMRC MTD ITSA agent + AML | If not enrolled, refer |
| UK PAYE RTI | HMRC PAYE agent + AML | Some payroll bureaus do this; check firm scope |
| UK Corporation Tax CT600 | HMRC CT agent | Refer to accountant |
| UK Self Assessment SA100 | HMRC SA agent | Refer to accountant |
| US sales tax (state-by-state) | State business registration; PTIN if preparing returns | Most bookkeepers can prepare; some states allow direct lodgement by bookkeeper |
| US Form 941 (payroll) | EIN + e-file PIN | Most bookkeepers can prepare + e-file with client's authority |
| US Form 1099-NEC + W-2 | None — anyone can prepare | Bookkeeper-handled normally |
| US Form 1040 / 1120 / 1065 income tax | PTIN (and ideally EA or CPA for representation) | Refer to CPA / EA |
| CA GST/HST | BN + CRA representative authorization | RAC on file enables; otherwise prepare for client lodgement |
| CA T4 / T4A / T5 | RAC + client authority | Bookkeeper-handled normally |
| CA T2 corporate income tax | None to prepare; CPA typically | Refer to accountant |

The agent refuses lodgement if the firm isn't registered. Never
"just this once". Same rule as the plumber bundle: no gas ticket,
no gas cert.

## Step 1 — AU BAS preparation pack

For an AU monthly client at quarter-end:

```
BAS PREPARATION PACK — [Client]
================================
Period:               [Q1/Q2/Q3/Q4] FY[year] — [start] to [end]
ABN:                  [client's ABN]
Reporting cycle:      Quarterly (or Monthly if turnover >$20m)
GST registered:       Yes (or threshold check if borderline)
GST method:           Cash / Accruals
PAYG-W cycle:         Quarterly (if monthly W >$50k = monthly)
PAYG-I:               Quarterly instalments per ATO notice

BANK RECONCILIATION SIGN-OFF
  Westpac Business 1234 — reconciled to $X,XXX.XX at [date] — bal
    matches Westpac statement
  Westpac MasterCard — reconciled to $X,XXX.XX at [date] — bal
    matches AmEx statement
  Closing GST clearing account: $X,XXX.XX (rolling forward)

GST DETAILED REPORT (from Xero / QBO)
  G1 — Total sales:                            $XXX,XXX.XX
  G2 — Export sales (GST-free):                $XX.XX
  G3 — Other GST-free sales:                   $XXX.XX
  G10 — Capital purchases (incl GST):          $XX,XXX.XX
  G11 — Non-capital purchases (incl GST):      $XXX,XXX.XX

  1A — GST on sales:                            $XX,XXX.XX
  1B — GST on purchases:                        $XX,XXX.XX
  Net GST payable / (refund):                   $X,XXX.XX

PAYG WITHHOLDING (W1 + W2)
  W1 — Total salary, wages and other payments:  $XX,XXX.XX
  W2 — PAYG tax withheld:                       $X,XXX.XX

  Reconciliation to STP:
    STP reported W1 for quarter:                 $XX,XXX.XX
    STP reported W2 for quarter:                 $X,XXX.XX
    Variance: $0 (or explanation if non-zero)

PAYG INSTALMENT (T1 / T2)
  Per ATO notice for the quarter:                $X,XXX.XX

FBT INSTALMENT (if applicable)
  Per ATO notice:                                $X,XXX.XX

TOTAL BAS LIABILITY / (REFUND)
  GST net:                                       $X,XXX.XX
  PAYG-W:                                        $X,XXX.XX
  PAYG-I:                                        $X,XXX.XX
  FBT:                                           $X,XXX.XX
  TOTAL:                                         $XX,XXX.XX

DEADLINES
  Lodgement due (paper):                         28 [month]
  Lodgement due (BAS Agent — concessional):      25 [month+1]
  Payment due (same as lodgement)
  Direct debit / PAYG portal arrangement:        [client setup]

SIGN-OFF CHECKLIST
  ☐ Bank rec signed off
  ☐ Credit card rec signed off
  ☐ Hubdoc fully processed (no orphan receipts)
  ☐ AP aging matches supplier statements (top 20)
  ☐ AR aging matches debtor statements (top 20)
  ☐ GST coding sample review (20 high-value txns) — pass
  ☐ Payroll STP reconciles to W1 / W2 — pass
  ☐ Partner review (initials, date) — _____ / _____
  ☐ Client sign-off received (if required) — _____ / _____

PREPARED BY: [name + role]
REVIEWED BY: [partner name + BAS Agent #]
LODGED VIA: ATO Online Services for Agents
LODGEMENT DATE: [date]
LODGEMENT REFERENCE: [ATO receipt number, captured post-lodgement]
```

The agent prepares this pack. The PARTNER (registered BAS Agent or
Tax Agent) signs off + lodges. The agent never "just lodges" — the
sign-off is the regulator's required human-in-the-loop step.

## Step 2 — UK VAT (MTD) preparation pack

```
VAT MTD PREPARATION PACK — [Client]
===================================
Period:               VAT quarter Stagger [1/2/3] — [start] to [end]
VAT registration #:   GB [9-digit + suffix]
Scheme:               Standard / Flat Rate / Cash Accounting / Annual
MTD agent of record:  [Firm name, agent code]

VAT RETURN BOXES (from Xero / QBO / Sage MTD-compatible report)
  Box 1 — VAT due on sales:                     £XX,XXX.XX
  Box 2 — VAT due on EC acquisitions (post-Brexit
            mostly £0 except NI):               £0.00
  Box 3 — Total VAT due:                        £XX,XXX.XX
  Box 4 — VAT reclaimed on purchases:           £XX,XXX.XX
  Box 5 — Net VAT to pay or reclaim:            £X,XXX.XX
  Box 6 — Total value of sales ex VAT:          £XXX,XXX.XX
  Box 7 — Total value of purchases ex VAT:      £XXX,XXX.XX
  Box 8 — Goods supplied to EC (NI):            £0.00
  Box 9 — Goods acquired from EC (NI):          £0.00

DIGITAL LINKS CHECK (MTD requirement)
  ☐ Digital records held in MTD-compatible software (Xero /
     QBO / Sage / FreeAgent / KashFlow)
  ☐ No "copy-paste" between systems — all flows via digital link /
     bridging software (where applicable)
  ☐ Supporting bridging software (if used): [name]

RECONCILIATION
  ☐ Bank rec signed off (all UK current accounts)
  ☐ Credit card rec signed off
  ☐ AutoEntry / Dext fully processed
  ☐ AP aging matches supplier statements (top 20)
  ☐ AR aging matches debtor statements (top 20)
  ☐ Box 6 sales total reconciles to P&L revenue (with VAT scheme
     adjustments if Flat Rate or Cash)

DEADLINES
  Lodgement + payment due:                       7 [month + 2 after period end]
  Direct debit arrangement (recommended):        [client setup]

SIGN-OFF CHECKLIST
  ☐ Bookkeeper preparation complete
  ☐ Partner review (initials, date) — _____ / _____
  ☐ Client sign-off received (if required) — _____ / _____
  ☐ Submission via Xero / QBO / Sage MTD gateway

LODGED VIA: Xero MTD bridge → HMRC
LODGEMENT DATE: [date]
HMRC RECEIPT: [reference]
```

## Step 3 — US payroll (Form 941) quarterly

```
FORM 941 PREPARATION — [Client]
===============================
Period:               Q[1/2/3/4] [year]
EIN:                  [9 digits]
State payroll regs:   [state — e.g. Texas TWC, California EDD]

LINE ITEMS
  Line 2  — Wages, tips, other compensation:    $XXX,XXX.XX
  Line 3  — Federal income tax withheld:        $XX,XXX.XX
  Line 5a — Taxable Social Security wages:      $XXX,XXX.XX × 12.4%
  Line 5b — Taxable Medicare wages:             $XXX,XXX.XX × 2.9%
  Line 5d — Additional Medicare (>$200k single): $X,XXX.XX × 0.9%
  Line 6  — Total taxes before adjustments:     $XX,XXX.XX

  Line 11a — Qualified small business R&D
            payroll credit (if applicable):     $XX.XX
  Line 12  — Total taxes after adjustments:     $XX,XXX.XX
  Line 13  — Total deposits for quarter:        $XX,XXX.XX
  Line 14  — Balance due / (overpayment):       $X,XXX.XX

STATE PAYROLL FILINGS (separate by state)
  [State 1]: [filing requirements + amount]
  [State 2]: ...

RECONCILIATION
  ☐ Payroll register reconciles to bank withdrawals for the
     quarter
  ☐ State UI taxes reconciled
  ☐ FUTA (Form 940 annual; check liability accumulated)
  ☐ Each pay run filed timely via EFTPS (semi-weekly /
     monthly deposit schedule)
  ☐ Garnishments + benefit deductions reconciled

DEADLINE
  Form 941:                                      Last day of month
                                                  after quarter end
  Form 940 (annual FUTA):                        31 January following year
  W-2 to employees + SSA:                        31 January
  1099-NEC to contractors + IRS:                 31 January

SIGN-OFF
  Bookkeeper:                                    [name, date]
  Client e-signed authority:                     [Form 8879-EMP]
  E-filed via:                                   [Gusto / ADP / Rippling /
                                                  direct via IRS BSA]
```

## Step 4 — CA GST/HST + T4

```
GST/HST RETURN PREPARATION — [Client]
=====================================
Period:               [Monthly / Quarterly / Annual] — [period]
BN with RT0001:       [9 digits + RT0001]
Province:             [ON / BC / etc.]
HST rate(s) applicable: [13% ON / 15% Atlantic / 5% GST only Alberta]

LINE ITEMS (from Xero / QBO Canada / Sage Canada)
  Line 101 — Sales and other revenue:           $XXX,XXX.XX
  Line 103 — GST/HST collected:                 $XX,XXX.XX
  Line 104 — Adjustment:                        $X.XX
  Line 105 — Total GST/HST and adjustments:     $XX,XXX.XX

  Line 106 — Input tax credits (ITCs):          $XX,XXX.XX
  Line 107 — Adjustment:                        $X.XX
  Line 108 — Total ITCs:                        $XX,XXX.XX

  Line 109 — Net tax:                           $X,XXX.XX
  Line 110 — Instalments paid:                  $X,XXX.XX
  Line 111 — Other (rebates etc.):              $XX.XX
  Line 113 A — Balance owing / (refund):         $X,XXX.XX

PROVINCIAL SALES TAX (if SK / MB / BC / QC — separate from GST/HST)
  PST collected:                                 $X,XXX.XX
  PST paid (cost of business inputs — not ITC):  $X,XXX.XX
  Net PST owing:                                 $X,XXX.XX

RECONCILIATION
  ☐ Bank rec signed off (all CA accounts)
  ☐ HST collected reconciles to sales register
  ☐ ITCs reconcile to supplier docs (no missing source = no ITC)
  ☐ Place-of-supply rules applied correctly (cross-province sales)

DEADLINE
  Monthly cycle:                                 End of following month
  Quarterly cycle:                               End of following month
  Annual cycle:                                  3 months after FY end

PREPARED BY: [bookkeeper, date]
RAC ON FILE: [Y/N — required to lodge via My Business Account]
LODGED VIA:                                      CRA My Business Account
                                                  (or paper if RAC absent)
LODGEMENT REFERENCE:                            [CRA confirmation]
```

## Step 5 — Handling ATO / HMRC / IRS / CRA correspondence

When a regulator letter arrives in the client's hands (or via the
portal where the firm is the agent of record), the agent:

1. **Reads the letter carefully.** Most letters are routine
   (BAS reminder, GST registration query, payroll variance,
   superannuation guarantee charge, instalment variation). Some
   are serious (audit, penalty notice, garnishee, prosecution).
2. **Categorises urgency:**
   - **Routine** (acknowledge + lodge / respond by deadline)
   - **Variance enquiry** (provide reconciliation)
   - **Compliance check** (full review of the period — significant
     prep)
   - **Audit / formal investigation** (Tax Agent must lead;
     bookkeeper supports with workpapers)
   - **Penalty notice** (lodge missing item + objection if grounds
     exist; refer to Tax Agent for objection)
3. **Drafts the response** in the regulator's expected format.
4. **Surfaces to partner + (where applicable) the registered Tax
   Agent** before sending. Never sends regulator correspondence
   without partner sign-off.

Example — ATO BAS reminder letter response:

```
[Date]
The Australian Taxation Office
By ATO Online Services for Agents portal

RE: [Client name], ABN [number]
    BAS Reminder — Period ending [date]
    Notice reference: [as per ATO letter]

Dear Officer,

I confirm that BAS for [Client] for the quarter ending [date] is
in the final review stage and will be lodged by [date — within 14
days of the reminder, ideally earlier].

[Add cause if relevant — e.g. "Client was awaiting final supplier
statements for September quarter; received [date]."]

Payment will be made [via direct debit from client's nominated
account / via BPAY / via ATO portal] on the lodgement date.

If you require any further information, please contact me on
[phone].

Yours sincerely,

[Partner name]
[TPB BAS Agent # or Tax Agent #]
[Firm name]
For: [Client name]
ABN: [Client ABN]
```

Example — HMRC compliance check response (UK):

```
[Date]
HMRC
[as per HMRC letter — to specific compliance officer]

Dear [Officer name],

Reference: [HMRC ref]
Client: [Client name + VAT GB number]
Compliance check: VAT return Q[X] [period]

Thank you for your letter of [date] requesting further information
on the above return.

The variance you have queried (Box 4 input tax claim of £[X]
against the prior quarter average of £[Y]) relates to a single
capital purchase of [item — e.g. "a delivery van"] for £[Z]
including VAT, made on [date]. Supporting documentation
attached:

- Tax invoice from [supplier] dated [date]
- Vehicle registration document confirming [Client] ownership
- Confirmation the vehicle is used 100% for business purposes
- Reconciliation showing the input VAT claimed matches the invoice

The vehicle is held as a fixed asset in the client's accounts and
input tax has been claimed in full per Sections 24-26 VATA 1994
on the basis of full business use.

Please let me know if any further information would assist.

Yours sincerely,

[Partner name]
[HMRC agent code]
[Firm name]
For: [Client name]
VAT: GB [number]
```

## Step 6 — Audit / formal investigation

If a letter signals a formal audit:

```
This is an audit / formal investigation. Per BUSINESS CONFIG
scope, [the registered Tax Agent / external accountant] leads the
response. The bookkeeper prepares workpapers + supporting
documents. The bookkeeper does NOT respond directly to the auditor
or attend without the registered Tax Agent unless explicitly
delegated.

ACTION:
1. Acknowledge the letter to the auditor within 5 business days,
   confirming the registered Tax Agent will respond by [date].
2. Notify [Tax Agent name + firm] within 24 hours.
3. Pull workpapers for the period under review.
4. Run `02-quote-callout.md` for the audit-support pack (this is
   chargeable, separate from monthly engagement).
5. Surface the engagement letter scope to client — most monthly
   engagements explicitly exclude audit-response work.
```

## Step 7 — AML/CTF documentation (UK + NZ + AU from 2026)

For UK + NZ firms (mandatory) and AU firms preparing for Tranche 2
(get the muscle now):

```
AML / CTF REGISTER — [Client]
=============================
Engaged from:                  [date]
Risk rating:                   Low / Medium / High
PEP screening:                 [date last completed]
Source of funds documented:    [Y/N + summary]

BENEFICIAL OWNERSHIP
  - Owner 1: [name, % holding, ID verified date, ID type]
  - Owner 2: [name, % holding, ID verified date, ID type]
  - Owner 3: [name, % holding, ID verified date, ID type]

ENHANCED DUE DILIGENCE (if Medium or High risk)
  - Source of wealth narrative: [free text]
  - Ongoing monitoring frequency: [annual / 6-monthly]
  - Unusual transaction triggers: [thresholds set]

ANNUAL REVIEW
  Last review: [date]
  Next review due: [date — annually]
  Material changes since last review: [list]

REGULATORY FRAMEWORK
  - UK: Money Laundering Regulations 2017 (MLR 2017) +
        amendments; supervised by [HMRC / ICB / AAT / IAB / ACCA]
  - NZ: AML/CFT Act 2009; Phase 2 includes accountants /
        bookkeepers; supervised by DIA
  - AU: AML/CTF Act 2006 + Tranche 2 expansion from 2026;
        supervised by AUSTRAC

Records retained 5 years (UK) / 5 years (NZ post-engagement) /
7 years (AU recommended even pre-Tranche 2).
```

## Step 8 — Lodgement + receipt capture

Once partner sign-off is on the pack, the agent lodges (where
registered) via the regulator's portal:

- **AU**: ATO Online Services for Agents → BAS lodgement →
  receipt # captured
- **UK**: Xero / QBO MTD bridge → HMRC submission → receipt
  captured
- **US**: Gusto / ADP / Rippling auto-files Form 941 + state
  payroll; QBO files 1099-NEC + W-2 via Intuit transmitter
- **CA**: CRA My Business Account → GST/HST netfile → confirmation
  captured

The agent captures the lodgement receipt and forwards confirmation
to the client:

```
Subject: BAS Q[X] lodged — [Client]

Hi [first name],

Confirming BAS for [Q period] is lodged with the ATO today.

Payment due: $[X] on [date]
ATO receipt: [reference]
Lodged under: [Firm's BAS Agent registration]

If you've set up direct debit through the ATO portal, the payment
will draw on [date]. If not, the payment screen is at:
business.gov.au/registration → BAS → make payment.

Lodgement confirmation attached for your records.

[your name]
[Firm name]
[BAS Agent #]
```

## Hard rules

- **Never lodge what the firm isn't registered to lodge.** Never.
  Same rule as the gas-ticket / no-gas-cert pattern. Lodging
  without registration is a regulatory offence (TPB AU, HMRC UK,
  CRA RAC, IRS Circular 230).
- **Partner sign-off on every lodgement pack.** No exceptions.
- **Bank rec must be signed off** before BAS / VAT / GST is lodged.
  Lodging from an unreconciled file is how errors happen.
- **Hubdoc / Dext fully processed** before lodgement — no orphan
  receipts.
- **GST coding sample reviewed** — 20 high-value txns minimum.
- **STP / RTI / 941 reconciles** to the BAS / VAT / payroll filing —
  variance must be explained.
- **Always confirm filing receipt** captured and stored in
  Karbon / practice management.
- **Never alter a lodged return** without filing a formal amendment
  (Revision Form AU / Amend VAT UK / 941-X US / GST/HST adjustment
  CA).
- **AML/CTF records kept** for full retention period (5 yrs UK /
  NZ post-engagement; 7 yrs AU best practice).
- **For audit / formal investigation**, the registered Tax Agent
  leads, bookkeeper supports. Bookkeeper does not negotiate or
  represent.
- **Never give tax advice in writing in a lodgement-related comm**
  if firm isn't Tax Agent registered. Refer to the Tax Agent.

## Reading the learnings.md

Track on compliance:

- On-time lodgement rate (target: 100% for registered firms)
- ATO / HMRC / IRS / CRA letters received this quarter (target:
  decreasing)
- Audit / compliance check events (track frequency by client +
  industry)
- AML/CTF reviews on schedule (target: 100% annual)
- Variance enquiries on lodged returns (target: <5% — indicates
  coding accuracy)

## Confirm + handoff

> *"Lodgement pack ready for [Client] [period]. [Partner sign-off
> pending — review and lodge / lodged via ATO at [time], receipt
> #[ref]]. Client confirmation email queued. Loading
> `06-invoice-payment.md` for the lodgement fee (if applicable)
> and `11-followup-reviews.md` for post-lodgement nudge."*
