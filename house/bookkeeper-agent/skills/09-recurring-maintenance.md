---
name: bookkeeper-monthly-close-rhythm
description: The recurring revenue spine. Runs the monthly close cycle on the same days every month, the quarterly BAS / VAT cycle on the same days every quarter, the annual EOY / EOFY cycle on the same dates every year. This is what separates a $200k practice from a $600k practice — the cadence. Onboarding a client into the cycle, running it relentlessly, scheduling deliverables, partner review, sign-off, lodgement, communication. The whole loop.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Monthly close / recurring rhythm — the practice's spine

## Your job

A bookkeeping practice that runs on recurring rhythm:

- Closes the books on the same days every month
- Lodges BAS / VAT / sales tax on the same calendar every quarter
- Closes the financial year on the same week every year
- Holds the annual review meeting on the same anniversary of
  engagement every year

…doubles its enterprise value vs a practice that does each
client's work in reactive bursts. The rhythm is the product.

This skill is the operational heartbeat. It overlaps with
`04-dispatch.md` (which is the week-to-week tactical workflow)
but operates at the rhythm-and-cadence layer: month-by-month,
quarter-by-quarter, year-by-year.

## When this skill runs

- New monthly engagement signed (onboard into the rhythm)
- 1st of every month (kick off the close cycle)
- 15th-22nd of every month (drive BAS / VAT prep if quarter end)
- Quarterly (e.g. 28 Oct, 28 Feb, 28 Apr, 28 Jul for AU BAS-agent
  lodgement extension dates)
- Annually at engagement anniversary (annual review meeting)
- Annually at financial year end (EOFY pack)

## The monthly close rhythm (every monthly client)

### Week 1 — Source docs

```
WEEK 1 — Source-doc sweep
Day 1-2:
  ☐ Bank feeds synced for prior month (all accounts)
  ☐ Hubdoc / Dext processed (everything in the "to review" queue
     for prior month)
  ☐ A2X settlement journal generated (for eComm clients)
  ☐ Payroll for the month consolidated (STP / RTI / 941 confirmed
     submitted on each pay date)

Day 3:
  ☐ Source-doc chase email sent to client (Tier 1 — friendly)
  ☐ Specific missing items listed

Day 5-7:
  ☐ Receipts received in response to chase
  ☐ Any expense reports / mileage claims from client team
  ☐ Inter-entity transactions documented (if multi-entity)
```

### Week 2 — Coding + reco

```
WEEK 2 — Coding + reconciliation
Day 8-10:
  ☐ Bank txns coded against chart of accounts
  ☐ Credit card txns coded
  ☐ GST / VAT treatment applied
  ☐ Capital purchases identified (asset register)
  ☐ Hubdoc / Dext receipts matched to bank lines (auto-publish
     does most; manual for the rest)

Day 11-12:
  ☐ Bank rec performed across all accounts
  ☐ Variances investigated
  ☐ Credit card rec performed
  ☐ Loan accounts reconciled (director loans, equipment finance,
     credit facility)
  ☐ Petty cash / float reconciled (if applicable)

Day 13-14:
  ☐ AP aging review — chase old supplier credits
  ☐ AR aging review — chase old debtors per client's preference
  ☐ Stock count reconciliation (if inventory client)
  ☐ POS reconciliation (if hospitality / retail)
```

### Week 3 — Partner review + management report

```
WEEK 3 — Partner review + client report
Day 15:
  ☐ Bookkeeper marks close complete in Karbon / PM tool
  ☐ Partner review begins:
     - P&L scan for unusual variances vs prior month / prior year
     - Balance sheet sanity check (no negative cash, no orphan
        suspense accounts, equity moves explained)
     - GST coding sample review (high-value txns)
     - Payroll reconciliation check

Day 16-17:
  ☐ Adjustments posted by bookkeeper per partner review
  ☐ Final reports generated:
     - P&L (current month + YTD vs same period prior year)
     - Balance Sheet
     - Cash Flow Statement (Tier 3+)
     - GST / VAT detailed report
     - Aged receivables + payables

Day 18:
  ☐ Management report drafted (Tier 3+ clients):
     - Headline P&L
     - Cash position (3 lines: closing balance, receivables,
        payables)
     - 3 KPIs (industry-relevant)
     - 1-2 paragraphs of commentary (variance explanation; flag
        anything client should action)
  ☐ Report emailed to client
  ☐ Karbon work item closed for the month
```

### Week 4 — BAS / VAT prep (last month of quarter only)

```
WEEK 4 — BAS / VAT prep + lodge
Day 22-24:
  ☐ Bank rec sign-off across all 3 months of the quarter
  ☐ GST / VAT detailed report run for the quarter
  ☐ PAYG-W / PAYE / 941 reconciliation
  ☐ BAS / VAT draft generated
  ☐ Bookkeeper prep notes for partner review

Day 25-26:
  ☐ Partner review of BAS / VAT pack
  ☐ Partner sign-off (BAS Agent / Tax Agent / MTD agent)
  ☐ Client sign-off captured if required by engagement

Day 27-28:
  ☐ Lodgement via regulator portal
  ☐ Confirmation receipt captured
  ☐ Client confirmation email sent
  ☐ Payment due reminder sent (with DD timing if set up)
```

## The quarterly BAS cycle (AU)

```
QUARTERLY CYCLE — AU BAS
========================
Q1 (Jul-Sep): close work mid-Oct, BAS lodged by 25 Nov (agent
                                 concession)
Q2 (Oct-Dec): close work mid-Jan, BAS lodged by 28 Feb (NO
                                 concession — partner extension
                                 sometimes available case-by-case)
Q3 (Jan-Mar): close work mid-Apr, BAS lodged by 26 May
Q4 (Apr-Jun): close work mid-Jul, BAS lodged by 25 Aug

PER QUARTER, FIRM-WIDE
- BAS calendar surfaced at start of quarter (all clients
   ordered by lodgement date)
- Capacity allocated across quarter (don't try to lodge all in
   the final week)
- Pre-close client comms 1 week before quarter end:
   "Heads-up — quarter ending [date]. Make sure all your
    September supplier invoices are in Hubdoc by [Friday]."
```

## The quarterly VAT cycle (UK)

```
VAT QUARTERLY CYCLE — UK
========================
Stagger 1 (Jan/Apr/Jul/Oct quarter-ends): lodge by 7 Mar / 7
                                           Jun / 7 Sep / 7 Dec
Stagger 2 (Feb/May/Aug/Nov ends): 7 Apr / 7 Jul / 7 Oct / 7 Jan
Stagger 3 (Mar/Jun/Sep/Dec ends): 7 May / 7 Aug / 7 Nov / 7 Feb

Lodgement via Xero MTD bridge → HMRC.
Payment due same date as lodgement; direct debit recommended.

MTD digital records compliance check each quarter:
- All records held in MTD-compatible software
- No copy-paste between systems (digital links throughout)
- Bridging software (if used) confirmed connected
```

## The annual EOFY / EOY cycle

### Australia EOFY (30 June)

```
EOFY — AUSTRALIA
================

Pre-close (May-June)
- Director / sole-trader contact — strategy call:
   - Asset purchases pre-30 June for immediate write-off
      (small business <$10m, write-off threshold $20k per
      asset for 2024-25)
   - Super contributions before 30 June (cap $30k 2024-25
      concessional)
   - Bad debt write-offs (must be written off before 30 June)
   - Stock count for inventory clients (30 June stocktake)
   - Trust distributions resolutions (corporate trustee — by 30
      June for valid distribution)
- Tax Agent coordination (if separate firm) — what's needed in
   the workpapers

EOFY week (last week of June)
- Process all source docs to 30 June
- Bank rec to 30 June
- Payroll finalisation prep:
   - STP Phase 2 finalisation submission to ATO (by 14 July)
   - Reportable Fringe Benefits Amount included
   - Reportable Employer Super Contributions
- Stock count entries
- Asset purchases captured (with immediate write-off applied
   correctly)

Post-30-June (July)
- Q4 BAS prep (due 25 Aug agent)
- STP finalisation 14 Jul
- Super Guarantee Q4 lodge 28 Jul
- Workpapers for Tax Agent:
   - Trial balance
   - P&L + Balance Sheet
   - GST reconciliation
   - PAYG-W reconciliation
   - Asset register
   - Loan reconciliations (director loan, equipment finance)
   - Bank rec confirmations
   - Notes on any judgment items (accruals, prepayments, doubtful
      debts)

September
- Annual review meeting with client (see Touch 4 in
   `11-followup-reviews.md`)
- Re-engagement letter sent if any scope / price change
- New financial year set up clean
```

### UK / US / Canada year-ends

UK financial year ends are usually:
- Companies House registered year-end (any month — common 31
  March, 31 December)
- Personal tax year 5 April

US fiscal year ends commonly:
- 31 December (calendar year — vast majority of small biz)
- Or any month elected (with IRS approval)

Canada fiscal year ends:
- Commonly 31 December (sole prop must use Dec 31)
- Corporations elect (often Dec 31 or fiscal end matching
   operating cycle)

Adapt the EOFY checklist above to each jurisdiction.

## The annual review meeting (anniversary of engagement)

This is the highest-leverage hour of the year per client. Run at
the engagement anniversary, not at EOY (different conversation;
EOY is about lodgement, annual review is about the engagement
itself).

```
ANNUAL REVIEW MEETING — [Client] — engagement year [N]
======================================================
Duration:                  60-90 mins
Mode:                      In-person (preferred) or video call

AGENDA
1. The year in numbers (15 min)
   - Revenue trend
   - Gross margin %
   - Operating expenses %
   - Net profit + tax impact
   - Cash position
   - Debtor days / Creditor days
   - 2-3 industry benchmarks
2. What worked this year (10 min)
   - Workflow rhythm — were the close + lodgement deadlines on
      time?
   - Source-doc discipline — Hubdoc rate, chase frequency
   - Communication — was the cadence right?
3. What didn't work (10 min)
   - Where did the engagement strain? (scope creep, late docs,
      ad-hoc work outside package)
   - Where did the client want more visibility?
4. Looking ahead — the business (15 min)
   - Growth plans? New product / service / hire?
   - Capital needs? Bank facility, investor, grant?
   - Compliance changes? (e.g. AU GST registration threshold
      crossed, UK VAT-bound, US sales tax nexus reached new
      state)
5. The engagement (15 min)
   - Tier review — still right tier?
   - Add-ons — payroll (#staff change), A2X (new channel),
      Spotlight (need reporting)?
   - Price refresh — CPI + scope creep adjustment (usually 5-
      8%/year)
   - Renew engagement letter
6. Action items + next meeting (5 min)
```

The agent prepares the meeting pack 3-5 days before:

```
ANNUAL REVIEW PACK — [Client] — [date]
=======================================
1. Year-in-numbers (1-page summary)
2. Variance analysis (current year vs prior year)
3. Industry benchmark comparison (3 KPIs)
4. Engagement health summary:
   - Hours delivered vs budget (per close cycle)
   - Source-doc on-time rate
   - Lodgement on-time rate
   - Chase escalation count
   - Ad-hoc requests count
5. Proposed engagement letter changes (tier / price / scope)
6. Discussion prompts for the meeting
```

After the meeting, the agent drafts the renewal engagement letter
+ price update if applicable. Often results in tier upgrade
(Tier 2 → Tier 3, Tier 3 → Tier 4) and CPI-adjusted price.

## The extension to advisory conversation

For Tier 3 clients at engagement year 2+, the annual review is
the moment to introduce Tier 4 / CFO-lite:

```
Going into year 3, here's what I'm seeing:

- Revenue is up 35% on year 2 ($1.8m → $2.4m)
- You're making decisions about [headcount / new product /
   capital expenditure / acquisition] that have material
   financial impact
- The monthly P&L is useful but it's backward-looking — by the
   time you see it, the decision's already made

The natural next step is CFO-lite — fractional CFO support
without paying $180k for a full-time hire. What changes:

- Monthly 90-min strategic meeting (not just a P&L review — we
   look forward at the decisions you're facing)
- 12-week rolling cash forecast via Float, refreshed weekly
- Spotlight Reporting management pack quarterly (board-grade)
- Scenario modelling on demand (the "what if I hire 2 more
   people" or "what if revenue dips 20%" question)
- Industry KPI dashboard

Fee: $2,400/mo + GST. About 12-15 hours of my time per month at
my partner rate, vs ad-hoc work which would cost more and be
slower.

If you're up for it, I'd suggest a 90-day trial — same notice
either side — and we re-tier from there. Have a think and let
me know.
```

This is the most lucrative conversation in the practice. Run it
EVERY annual review for any Tier 3 client at year 2+.

## Onboarding a new client into the rhythm

```
NEW CLIENT — RHYTHM ONBOARDING
==============================
Engagement signed:      [date]
Tier:                   [T2 / T3 / T4]

Set rhythm dates:
☐ Monthly close target: day 15 of each month
☐ Source-doc chase day: Mondays
☐ Partner review day:   Thursdays
☐ Quarterly BAS prep:   last week of quarter
☐ Annual review:        engagement anniversary [date + 12mo]
☐ EOY pack target:      [3 weeks post FY end]

Calendar entries created in Karbon / Ignition / Google Cal for
12 months ahead.

First-month dry run:
☐ Run the first close cycle 7 days behind real time (don't
   pressure-test against deadlines on month 1)
☐ Identify any data gaps from prior bookkeeper / handover
☐ Document client's preferences (chase tone, report format,
   payment timing)
```

## Hard rules

- **Lock the rhythm at engagement.** Don't let dates drift.
- **Same close days every month.** Not "around the 15th". The 15th.
- **Partner review before client report.** Always. Reports without
  partner review = errors going to client = trust damage.
- **Schedule the annual review 11 months in advance.** Don't wait
  for the anniversary to think about it.
- **Push the extension conversation at Tier 3 year 2+.** This is
  where practice value is created.
- **For BAS-agent firms: never miss the agent-concessional
  lodgement date.** It's a competitive advantage; protect it.
- **EOY is a 6-week project, not a 1-week scramble.** Plan from
  April (AU) or January (UK / US / CA calendar) for completion 6
  weeks later.
- **Engagement letter refresh every year.** No client should be on
  a 3-year-old letter; scope and price drift; legal protection
  weakens.
- **Document the rhythm in Karbon / Ignition.** A bookkeeper who
  holds the rhythm in their head is a bookkeeper whose practice
  collapses if they're sick for a week.

## Reading the learnings.md

Track on rhythm:

- % of monthly closes completed by target date (target: 100%)
- % of BAS / VAT lodged by agent concession date (target: 100%)
- % of clients who attended annual review meeting (target: 90%+
  — if lower, the meeting isn't being valued enough; reframe)
- Tier upgrade rate at annual review (target: 30%+ of Tier 2
  clients to T3 at year 2 anniversary; 15%+ Tier 3 to T4 at year
  3)
- Price refresh % achieved (target: CPI + 3% average)
- Disengagement rate per annual review (target: <5% — higher
  means tier mismatch or scope misalignment surfaced too late)

## Confirm + handoff

> *"Recurring rhythm engaged for [Client]: monthly close day 15,
> partner review Thursday, quarterly BAS due [date], annual review
> meeting [anniversary]. Karbon work items locked for next 12
> months. Loading `04-dispatch.md` for week-of operational view
> and `06-invoice-payment.md` to confirm DD on 1st of month."*

After the annual review meeting, hand off to:
- `06-invoice-payment.md` to update DD amount per refreshed price
- `03-quote-project.md` to issue the new engagement letter if
  tier upgrade
- `07-supplier-ordering.md` if new tools (A2X, Spotlight, payroll
  add) coming in
- `11-followup-reviews.md` to schedule the meeting follow-up touch
