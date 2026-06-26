---
name: bookkeeper-one-off-job-quote
description: Generate a one-off-job quote for catch-up work (clients 12+ months behind), EOY clean-up, BAS-only filings, sales-tax catch-ups, audit-support packs, terminated bookkeeper handovers. Use fixed-fee where possible; hourly only when scope is genuinely uncertain. Always include an "if it grows, here's the conversion path to monthly" lead-in to the recurring package.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# One-off-job quote — catch-up, EOY, BAS-only, audit

## Your job

Read the qualified prospect from intake. Generate a clear scope +
price within one business day. Send it via email (one-off
engagements almost always go by email — they're contractual, want
a paper trail). Always offer a fixed-fee unless the scope is
genuinely uncertain — and if uncertain, propose a paid diagnostic
first.

## What counts as a one-off

Use this skill when:

- **Catch-up work** — client 6+ months behind on bookkeeping; needs
  to be brought current before anything else can happen
- **EOY clean-up** — sole trader / small Pty Ltd needs the books
  closed for the financial year; not coming on monthly
- **BAS-only / VAT-only** — client codes their own file, just wants
  someone to prep + lodge the BAS / VAT each quarter
- **Sales-tax catch-up (US)** — multi-state Shopify seller hasn't
  filed in 18 months, needs to get current
- **Audit-support pack** — preparing workpapers + supporting docs
  for client's external auditor or ATO / HMRC review
- **Handover from departing bookkeeper** — client's previous
  bookkeeper has left, file needs review + cleanup before resuming
  normal cycle
- **Migration work** — MYOB → Xero, Wave → QBO, FreshBooks → Xero
  (these are real projects with defined deliverables)
- **One-off project work** — chart of accounts redesign, GST
  treatment review, payroll setup from scratch

Use `03-quote-project.md` instead if:
- The client wants ongoing monthly bookkeeping going forward
- The conversation is "I want a bookkeeper", not "I need this one
  thing sorted"
- The work is recurring by nature (monthly close, payroll runs,
  quarterly BAS)

**Tip:** most catch-up work should end with an offer to convert to
a monthly engagement. The catch-up gets them current; the monthly
keeps them there. The price of catch-up + monthly together is
usually less than two more years of catch-ups.

## The structure of a one-off quote

Every one-off quote has six sections:

```
1. Scope (what we're doing — in plain English, bulleted)
2. Method (fixed-fee OR hourly with cap; explain why)
3. Price + payment terms (with deposit if >$2k)
4. Timeline (start date + finish date)
5. What's NOT included (the scope-protection line)
6. What happens next — including the optional "convert to monthly"
```

## Fixed-fee vs hourly — the right call

**Fixed-fee** is the default. Use when:

- The file is visible (you've seen the Xero / QBO file or a
  diagnostic has been done)
- Transaction volume is known (e.g. "12 months × ~120 txns/mo")
- The complexity is bounded (sole trader, no employees, no
  inventory, single bank account)

**Hourly with a not-to-exceed cap** when:

- Scope is uncertain (e.g. "shoebox of receipts, no idea how many",
  "previous bookkeeper left a mess, depth unknown")
- The client wants a "look first, then decide" approach
- Work is genuinely diagnostic (e.g. "review the file and tell me
  if a catch-up is needed")

**Pure hourly without a cap** — almost never. Burns trust both ways.
Offer a 30-min paid diagnostic first if scope is truly unknown:

```
The honest answer is I can't quote catch-up without seeing inside
the file. Two options:

1. 60-min file diagnostic — fixed fee $250. I open the Xero file,
   review bank rec status, GST coding sanity-check, payroll status,
   AP/AR aging. You get a written 1-page report + a fixed-fee
   quote for the catch-up (if needed). The $250 credits against the
   catch-up fee if you proceed within 30 days.

2. Hourly with cap — $120/hr, capped at 8 hours ($960). I work for
   up to 8 hrs and stop. If we need more, I quote the rest
   separately.

Most clients pick option 1 because it locks the catch-up price
before they commit.
```

## Catch-up work — typical structure

Catch-up is the most common one-off. Real example for a sole trader
plumber 14 months behind:

```
QUOTE — Catch-up bookkeeping, [Client], 14 months FY23-FY24

1. SCOPE
- Reconcile primary business bank account (Westpac Business Account
  ending 1234) — 14 months: 1 Aug 2024 → 30 Sep 2025
- Reconcile credit card (Westpac BusinessVantage MasterCard) — same
  period
- Set up Hubdoc + apply rules to existing supplier base from past
  invoices (estimated 60 suppliers from review)
- Code all transactions to a sole-trader-appropriate chart of
  accounts (review of existing chart; cleanup if needed)
- Apply correct GST treatment (10% standard, GST-free for relevant
  expenses, capital purchases >$1,000 captured as Capital
  Acquisitions for BAS)
- Prepare the 5 outstanding BAS lodgements (Q1, Q2, Q3, Q4 FY24
  + Q1 FY25) — packs ready for your TPB BAS Agent to lodge
- Reconcile PAYG instalments paid via ATO portal
- Final EOFY 30 June 2025 reports: P&L, Balance Sheet, GST detailed
  report, supplier statements

2. METHOD
Fixed-fee, based on a 15-min file review yesterday. Approximately
1,800 bank transactions across the period at an average coding
rate of 60/hr = ~30 hrs of coding + 8 hrs of reconciliation + 6
hrs of BAS prep + 2 hrs of partner review = 46 hrs total. Fixed
fee priced at the equivalent of 38 hrs (we'll absorb the rest if
the work runs long — your risk is capped).

3. PRICE
$4,560 + GST = $5,016 total

Payment:
- 30% deposit on engagement letter signed = $1,505 (locks in
  start date)
- 70% on delivery = $3,511 (within 7 days of EOFY pack delivery)

Or pay in 3 equal monthly instalments via direct debit if cash
flow's tight — just ask.

4. TIMELINE
- Engagement letter signed by [date]: start [date+3 business days]
- BAS packs ready for your registered Tax Agent / BAS Agent within
  4 weeks of start
- EOFY pack ready within 6 weeks of start

5. NOT INCLUDED
- Tax return preparation or lodgement (we'll prepare everything
  your Tax Agent needs, but the return itself sits with them)
- Fixing transactions older than 1 Aug 2024 (any pre-existing
  issues we find from earlier periods are flagged for separate
  scope)
- New software migration (if you decide to switch from your
  current MYOB AccountRight to Xero, that's a separate $1,200
  migration project)
- Asset register beyond what's already in the file
- Director loan account reconciliation if found out of balance
  >$5,000 (flag for variation)

6. WHAT HAPPENS NEXT
If you'd like to convert to monthly bookkeeping after the catch-up,
your file will be in shape to start a Tier 2 — Basic Monthly
engagement at $480/mo (covers bank rec, GST coding, quarterly BAS
prep, EOFY). Most catch-up clients convert because the marginal
cost of staying current is far less than another catch-up.

Reply "go ahead" to lock this in. I'll send the engagement letter
via Ignition this afternoon — sign with your phone, deposit invoice
auto-issued, we're started.

[your name]
[Firm name]
[TPB BAS Agent # / Tax Agent #]
[ABN / VAT / EIN]
```

## EOY clean-up — typical structure

EOY work is bounded (one financial year) but variable in scope.
Quote based on size of file:

| File size signal | Typical fixed-fee range |
|---|---|
| Sole trader, <100 txns/mo, no employees | $800-$1,600 |
| Sole trader, 100-300 txns/mo, no employees | $1,400-$2,800 |
| Pty Ltd, 1-3 employees, <500 txns/mo | $2,400-$4,200 |
| Pty Ltd, 5-10 employees, 500-1,500 txns/mo | $4,000-$8,500 |
| Pty Ltd with inventory / multi-entity | $7,500-$18,000 (often broken into stages) |

EOY scope template:

```
SCOPE — EOY clean-up, [Client], FY ending [date]

- Full year bank rec review + adjustments
- GST coding review across the year (sample-based for high-volume
  clients; full review under 1,000 txns)
- Payroll reconciliation (STP / RTI / Form 941) — terminations,
  allowances, leave balances, PAYG/PAYE/NI rec
- AP aging clean-up — match to source docs, write off uncollectibles
- AR aging clean-up — match, write off if statute-barred
- Fixed asset register update (no depreciation calc unless you're
  the Tax Agent of record)
- Inter-entity loan reconciliation (if applicable)
- Year-end accrual + prepayment adjustments
- Final reports: P&L, Balance Sheet, Cash Flow, GST detailed, AR/AP
  aging, fixed asset register
- Workpaper file ready for [Tax Agent / accountant] handover
```

## BAS-only / VAT-only / sales-tax filing — typical structure

The simplest one-off. Client codes the file themselves; we review +
lodge.

```
SCOPE — Quarterly BAS preparation + lodgement, ongoing

- Bank rec sign-off at quarter end (you complete the rec; we
  review)
- GST coding sanity check (sample of 30 high-value transactions
  per quarter)
- PAYG-W / payroll reconciliation
- BAS draft + adjustments
- Partner sign-off
- Lodgement via ATO Online Services for Agents under our BAS Agent
  registration

PRICE: $450 per quarterly BAS, billed on lodgement (Net 7)
       OR $35/mo via direct debit if you'd prefer it smoothed

NOT INCLUDED
- Fixing the bank rec if you haven't reconciled (we'll quote that
  separately)
- Catch-up for previous quarters (separately quoted)
- Any income tax obligations (Tax Agent's scope, not ours)
- Variations if your transaction volume grows beyond ~500/qtr (we'll
  flag and re-tier)
```

## Audit-support pack — typical structure

ATO audit, HMRC compliance check, IRS examination, CRA review — the
client needs workpapers prepared for the auditor:

```
SCOPE — ATO audit support pack, [Client], FY [year]

- Review of audit notification letter to identify scope
- Workpaper preparation for each line item the auditor has flagged
- Source-doc reconciliation (Hubdoc / paper records) per
  transaction tested
- Bank statement reconciliation re-verification
- GST methodology summary + calculation walkthrough
- Payroll reconciliation re-walkthrough if STP / payroll in scope
- Liaison support with the auditor (we attend, you don't have to
  unless asked)
- Final position paper

METHOD: Hourly with cap — $180/hr (partner rate, audit-grade work),
        capped at 24 hrs = $4,320 + GST. If we need more, we stop
        and re-quote.

NOT INCLUDED
- Tax advice on the audit outcome (Tax Agent's call)
- Negotiation of settlement with the ATO (Tax Agent's call)
- Court / tribunal representation
- Original document retrieval if records are at a third party
  (storage fees pass through at cost)

DEPOSIT: $2,000 on engagement (audits move fast; we need to be
         engaged before we start digging)
```

## Hard rules — auto-rewrite if violated

- **Always include scope, method, price, timeline, exclusions,
  what-happens-next.** All six sections, every time.
- **Always include tax (GST/VAT/sales tax) explicitly.** "Plus GST"
  or "incl GST" — not silent.
- **Always include "Not Included".** This is what protects you from
  scope creep on catch-up work especially.
- **Always quote at minimum charge or above** per BUSINESS CONFIG.
- **Never quote tax-return preparation** unless BUSINESS CONFIG
  scope = "Full" (Tax Agent registered).
- **Never quote lodgement** of BAS / VAT unless BUSINESS CONFIG
  scope allows it for the jurisdiction.
- **Never use "starting from"** without an upper bound. "$1,500
  fixed-fee" or "Hourly $120/hr with 8-hr cap" — not "from $1,500".
- **No emoji** unless BUSINESS CONFIG voice asks for it.
- **Banned phrases** from BUSINESS CONFIG → silent rewrite.

## Reading the learnings.md before quoting

Open `learnings.md`. If:

- "Catch-up one-offs" is in the Win column → confidently quote
  fixed-fee; this is firm strength
- The industry (e.g. "Hospitality") is in High Churn → tighten
  scope, more exclusions, deposit higher (50% not 30%)
- The customer type is "previous-bookkeeper-disappeared" → flag in
  internal notes; these often have hidden complexity. Add a "if
  more than 200 supplier setup beyond review" variation trigger
- Average $/hr realised on catch-ups is below target → the next
  catch-up gets fewer absorbed hours; quote at 90% of estimated
  effort, not 80%

## The "convert to monthly" lead-in

Every catch-up quote ends with the next step:

```
After the catch-up:

If you'd like to stay current going forward, the work that keeps
your books in shape is around 3-5 hours a month for a business
your size. Tier 2 — Basic Monthly is $480/mo and covers bank rec,
GST coding, quarterly BAS prep, EOFY. That works out at about $35
per BAS quarter vs $450 doing it one-off — and you don't have to
chase me for it.

Reply "monthly too" with your "go ahead" and I'll bundle the
engagement letter so it covers both.
```

This bumps the conversion rate from one-off → monthly from ~20% to
~50%. Best return on a paragraph of writing in the entire bundle.

## Outputting the internal record

For each quote sent, save in context:

```
QUOTE #<n> — <timestamp>
Prospect:        PROSPECT #<n>
Type:            <catch-up / EOY / BAS-only / audit-support / migration>
Quote method:    <fixed-fee / hourly with cap / diagnostic-first>
Quote amount:    $<X> + tax
Deposit ask:     $<X>
Timeline:        <start → finish>
Convert-to-monthly attached: <Y/N — and what tier>
Channel:         <email>
Status:          <draft | sent | accepted | declined | re-quote requested>
```

## Confirm + handoff

Tell the operator:
> *"Quote drafted: $[X] fixed-fee for [scope] — [Client]. Review
> before sending? I've included the convert-to-monthly lead-in
> recommending Tier 2 at $480/mo. Once accepted, I'll generate the
> engagement letter in `templates/compliance-certificate.md` and
> the deposit invoice in `06-invoice-payment.md`."*

Wait for operator sign-off before sending. One-off engagements are
the contract — same discipline as a project quote.

If reply doesn't come within 5 business days, prompt the user to
send a polite follow-up. After two follow-ups (10 + 14 days), mark
lapsed in the weekly report and move on.
