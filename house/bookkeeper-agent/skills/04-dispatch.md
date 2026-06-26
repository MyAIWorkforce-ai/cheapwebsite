---
name: bookkeeper-weekly-workflow
description: Once an engagement is signed (one-off or monthly), run the workflow. For monthly clients, drive the monthly close calendar — same days every month. For one-off, drive the project schedule. Chase source docs (Hubdoc / Dext / client email). Allocate work across the firm's capacity (partner / senior / junior). Send the right client comms (Monday status, Thursday escalation). This is the "calendar + job-allocation + chase cadence" skill — the operational engine.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Weekly workflow + monthly close calendar

## Your job

For every engaged client, the agent runs the workflow:

- **Monthly clients** — runs the monthly close calendar (week 1
  close, week 2 review, week 3-4 BAS prep), chases source docs,
  allocates work across staff, sends status updates
- **One-off clients** — runs the project schedule (catch-up plan,
  EOY plan, audit-support plan), tracks progress, flags overruns
  early
- **Firm-wide** — keeps a master view of capacity vs commitments,
  surfaces conflicts, schedules partner review

## When this skill runs

- Engagement letter just signed (kick off onboarding)
- Every Monday morning (sweep the book, chase missing docs)
- Every Thursday afternoon (partner review of week's close work)
- Day 15 of each month (drive month-end close completion)
- Day 22-28 (drive BAS / VAT prep window)
- Whenever the user asks "what's due this week?" / "what's late?"

## Step 1 — Monday source-doc sweep

Every Monday morning, sweep across the entire client book:

```
MONDAY SOURCE-DOC SWEEP — [Date]
================================

For each monthly client:
  → Check Hubdoc / Dext: receipts last week?  [Y/N + count]
  → Check bank feed: last sync date            [date]
  → Check Xero/QBO: unreconciled txn count     [count]
  → Check for client emails in queue           [count]
  → Status: ON TRACK / BEHIND / CRITICAL

CLIENT-BY-CLIENT (this Monday):
| Client          | Hubdoc | Bank feed | Unreconciled | Comments | Status |
|---|---|---|---|---|---|
| Smith Plumbing  | 12 new | Synced    | 4 to code    | OK       | ON TRACK |
| Café Lavender   | 0 new  | 3 days stale | 47 to code | "POS broke Wed" | CRITICAL |
| Acme Consulting | 8 new  | Synced    | 0 to code    | Caught up | ON TRACK |
| Shopify Co     | A2X synced | -    | 12 to code   | -        | ON TRACK |
| ...             |        |           |              |          |        |
```

For each CRITICAL or BEHIND client, draft the chase email
immediately. Don't wait for the operator to remember.

## Step 2 — Source-doc chase emails

The receipt/source-doc chase is the bookkeeper's most common
client touch. The agent runs a 3-tier cadence:

### Tier 1 — Friendly nudge (day 3 of month after period end)

```
Subject: Quick chase — [Client] supplier docs for [month]

Hi [first name],

It's the start of the close cycle for [month]. Couple of things
outstanding from your end:

- Supplier invoices: I see [count] from Hubdoc, expecting around
  [typical count]. Anything missing? Common ones from your file:
  [list 2-3 recurring suppliers, e.g. "Synergy electricity",
  "Bunnings hardware", "Officeworks"]
- Bank statements: NAB feed last synced [date]; AmEx last synced
  [date] — both look current. If you've changed cards recently,
  let me know.

Anything to add by Thursday means we close [month] on time. Let
me know if anything's tricky to find.

[your name]
[Firm name]
```

### Tier 2 — Specific ask (day 7 if Tier 1 ignored)

```
Subject: Quick one — [Client] [month] close needs 3 docs

Hi [first name],

Following up on Monday — to close [month] I need:

1. [Specific item, e.g. "September AGL gas bill"]
2. [Specific item, e.g. "Westpac Visa statement Sep"]
3. [Specific item, e.g. "Receipt for the Bunnings purchase Sep 18,
   $487.50 — looks like a tool buy?"]

If you can drop those into Hubdoc by EOD Friday, BAS lodges on
time. If they're gone, just let me know and we'll work around it.

[your name]
[Firm name]
```

The "we'll work around it" line is important — it reduces guilt-
avoidance and gets a response. Bookkeepers who chase aggressively
get ghosted; bookkeepers who chase warmly get docs.

### Tier 3 — Partner escalation (day 12 if Tier 2 ignored)

```
Subject: [Client] — September close at risk

Hi [first name],

[your name] from [Firm name]. I've sent two notes about [month]
source docs — no worries if life got in the way, but I wanted to
flag where we are.

Without the [list of 3 missing items], here's what happens:

- [Month] close is paused (we can't finalise without these)
- Q[X] BAS due [date] runs late (which means ATO penalty notice
  risk)
- Bank feeds keep ticking over so the gap gets harder to fix

Easiest paths from here:

(a) You drop the docs in Hubdoc by EOD Thursday — close goes
    ahead, no impact
(b) You can't find them — let me know and we'll do a workaround
    (estimate based on prior periods or treat as no-receipt
    expense — affects deductibility, we'd flag for your accountant)
(c) Anything else going on we should know about?

Reply by Thursday or I'll call.

[your name]
[Firm name]
```

If Tier 3 fails, the agent flags the client to the firm partner for
direct conversation. Tier-3-ignored is a relationship signal — the
engagement might need re-tier, scope change, or disengagement.

## Step 3 — The monthly close calendar (recurring monthly clients)

Every monthly client runs the same rhythm. Lock the dates at
engagement; never let them slip:

```
MONTHLY CLOSE — [Client] — [Period]
=====================================

Day 1-7 — Source docs sweep
  ☐ Hubdoc / Dext processed (all receipts coded)
  ☐ Bank feed synced + all txns imported
  ☐ Source docs chased if missing (chase email day 3)
  ☐ A2X synced (Shopify / Amazon) if applicable

Day 8-14 — Coding + reco
  ☐ All bank txns coded
  ☐ Bank rec completed + balanced to bank statement
  ☐ Credit card rec completed
  ☐ AP aging reviewed (chase old supplier credits)
  ☐ AR aging reviewed (chase old debtors per client's pref)
  ☐ Payroll reconciliation if monthly STP / RTI / 941 due
  ☐ GST coding sanity check (sample 20 high-value txns)
  ☐ Inter-entity loans reconciled (multi-entity clients)

Day 15-21 — Partner review + management report
  ☐ Partner review of completed close (Thursday review window)
  ☐ Adjustments posted
  ☐ Final P&L + Balance Sheet generated
  ☐ Management report drafted (for Tier 3 clients +)
  ☐ Report emailed to client by day 18

Day 22-28 — BAS prep window (last month of quarter only)
  ☐ Bank rec sign-off across all 3 months of the quarter
  ☐ GST detailed report run
  ☐ PAYG-W / PAYE / NI reconciliation
  ☐ BAS draft generated
  ☐ Partner sign-off
  ☐ Client sign-off (where applicable)
  ☐ Lodgement via ATO / HMRC / IRS / CRA portal
  ☐ Lodgement confirmation forwarded to client
  ☐ Payment due reminder sent
```

The agent maintains this calendar per client and surfaces what's
due this week / today on every Monday sweep.

## Step 4 — Capacity allocation across the firm

For firms with >1 bookkeeper, the agent allocates work across
staff:

```
WEEK ALLOCATION — week of [date]
================================

PARTNER ([partner name]) — capacity 18 hours
  → Smith Plumbing — partner review (1hr Thursday)
  → Café Lavender — BAS sign-off (2hr Wed)
  → Acme Consulting — annual review meeting prep (3hr Wed)
  → Shopify Co — Tier 3 monthly report partner review (1.5hr Thu)
  → Prospect calls (3 × 30 min, 1.5 hrs)
  → Receivables review (1hr Friday)
  → Buffer: 8hrs (recommended: keep buffer for emergencies)

SENIOR BOOKKEEPER ([name]) — capacity 32 hours
  → Smith Plumbing — month-end close (6hr)
  → Café Lavender — month-end close + POS rec (10hr — POS broke
     last week, expect overage)
  → Acme Consulting — month-end + payroll (5hr)
  → Shopify Co — A2X + month-end (4hr)
  → Doc chases + ad-hoc client comms (5hr — typical)
  → Buffer: 2hrs

JUNIOR BOOKKEEPER ([name]) — capacity 30 hours
  → Hubdoc processing batch (8hr)
  → 4 × catch-up clients @ 4hr each (16hr)
  → Bank rec on Tier 1 compliance-only clients (4hr)
  → Buffer: 2hrs

TOTAL FIRM CAPACITY THIS WEEK: 80 hours
COMMITTED:                     71 hours
BUFFER:                        12 hours
STATUS:                        Healthy (target: 10-15% buffer)
```

When buffer < 5 hours, the agent flags to the operator: don't take
new urgent work this week, push to next week or refer out.

## Step 5 — Onboarding new clients (first 30 days post-engagement)

Brand new monthly clients run a 30-day onboarding sprint. The
agent runs this checklist:

```
ONBOARDING — [Client] — engagement signed [date]
================================================

Day 1-3 — Software setup
  ☐ Xero / QBO subscription created (under firm's partner code if
     applicable — saves client 30-50%)
  ☐ Firm added as adviser / accountant user
  ☐ Bank feeds requested (NAB / Westpac / ANZ / CBA + AmEx etc.) —
     usually 3-5 business days to activate
  ☐ Hubdoc enabled (with client's Xero subscription)
  ☐ Dext set up if migrating from Hubdoc
  ☐ Practice management entry created in Karbon / Ignition
  ☐ Engagement letter filed
  ☐ Direct debit mandate confirmed via GoCardless / Stripe
  ☐ First month invoice issued + DD scheduled

Day 4-10 — File health check
  ☐ Chart of accounts review + tighten
  ☐ Tax setup confirmed (GST registered? Cycle? PAYG-W method?)
  ☐ Payroll setup confirmed (STP enabled? Pay schedule correct?
     Super stream linked?)
  ☐ Opening balances confirmed (from prior bookkeeper / accountant)
  ☐ Last 3 months reviewed for issues
  ☐ Any open items from prior period flagged to client

Day 11-20 — First close cycle
  ☐ Source docs from current month requested
  ☐ Hubdoc rules set against existing supplier base
  ☐ First bank rec performed
  ☐ Client trained on Hubdoc forwarding (`hubdoc@client.com.au`)
  ☐ First "Monday status" email sent

Day 21-30 — Lock the rhythm
  ☐ Monthly close calendar locked
  ☐ Partner review day confirmed with client
  ☐ Quarterly BAS calendar set
  ☐ Annual EOFY / EOY date confirmed
  ☐ Annual review meeting pre-booked 11 months out
  ☐ Client portal access (Karbon / Liscio / etc.) confirmed
```

## Step 6 — Status comms to client (Monday status)

Every monthly client gets a Monday status email. The agent drafts
it from the close-calendar state:

```
Subject: [Firm name] — week of [date] for [Client]

Hi [first name],

Quick status on your books — week of [date]:

WHERE WE ARE
- [Month] close: [% complete — e.g. "65% — coding done, rec in
  progress"]
- Q[X] BAS due [date]: [status — e.g. "on track to lodge [date]"]
- Outstanding from your end: [list — e.g. "September AGL bill,
  September AmEx statement"]

DUE FROM US THIS WEEK
- Bank rec for [accounts]
- Payroll for [date]
- Partner review Thursday — management report Friday

DUE FROM YOU
- [Specific docs with deadlines, e.g. "Sept AGL bill by Thursday"]

NEXT WEEK
- [Heads-up — e.g. "We start BAS prep proper next Wednesday;
   please make sure all September docs are in by Tuesday EOD"]

Reply if anything's odd or you'd like to chase me on something.

[your name]
[Firm name]
```

Send this every Monday at 9:30am (after the sweep). It does three
things: keeps client confident the work's happening, surfaces
specific docs needed BEFORE the chase email is needed, and
maintains relationship cadence.

## Step 7 — One-off / project workflow

For one-off engagements, replace the monthly close calendar with a
project Gantt:

```
PROJECT TIMELINE — Catch-up for [Client] — 14 months FY24-FY25
==============================================================

Week 1 ([date])
  ☐ Bank feeds set up + back-fill 14 months
  ☐ Chart of accounts review
  ☐ Existing supplier list extracted from prior bookkeeper file
  ☐ Hubdoc set up + bulk-upload backlog receipts

Week 2 ([date])
  ☐ Coding pass 1 — FY24 Q1
  ☐ Coding pass 1 — FY24 Q2
  ☐ Bank rec Q1 + Q2
  ☐ Status update email to client

Week 3 ([date])
  ☐ Coding pass — FY24 Q3 + Q4
  ☐ Bank rec Q3 + Q4
  ☐ FY24 EOFY adjustments
  ☐ Status update email

Week 4 ([date])
  ☐ FY24 BAS packs ready (Q1, Q2, Q3, Q4) — to BAS Agent for
     lodgement
  ☐ FY25 Q1 catch-up
  ☐ Status update email

Week 5 ([date])
  ☐ FY25 Q1 BAS pack ready
  ☐ EOFY 2025 pack drafted
  ☐ Partner review
  ☐ Status update email

Week 6 ([date])
  ☐ EOFY 2025 pack finalised
  ☐ Workpaper file ready for client's Tax Agent
  ☐ Final invoice issued
  ☐ Convert-to-monthly conversation
```

Update progress weekly; flag overruns by 10% to the operator early
(not at the end).

## Hard rules

- **Source docs before coding.** Never code a transaction without
  the supporting doc visible. Hubdoc / Dext / paper receipt — but
  visible.
- **Same close days every month.** Bookkeepers who move the close
  date around can't manage capacity.
- **Chase warmly, escalate predictably.** Day 3 friendly, day 7
  specific, day 12 partner escalation. Never silent for 14 days
  then dump.
- **Monday status email every monthly client.** Non-negotiable.
- **Partner review on Thursday before report goes to client.**
  Reports without partner review = errors going to client = trust
  damage.
- **Onboarding has a 30-day deadline.** New clients who aren't
  fully onboarded in 30 days become problem clients by month 3.
- **Capacity buffer >10%.** Books at 100% commitment are how late
  lodgements happen. Hold the line.
- **Flag overruns at 10% off-track**, not 50%. Early flags fix; late
  flags blame.
- **Lodgement deadlines drive everything.** A close that's "almost
  done" on the day the BAS lodges = a late lodgement = your firm's
  reputation.

## Reading the learnings.md

Track on workflow:

- Average days from period end to close complete (target: ≤18)
- Chase-cycle effectiveness (% of Tier 1 chases that get docs vs
  Tier 2 vs Tier 3) — if Tier 3 is climbing, retrain the Monday
  status email
- Capacity utilisation vs target (60-75% billable is healthy for
  solo; 70-80% with juniors)
- Onboarding completion in 30 days (% — target: 85%+)
- Per-client average hrs/mo vs Tier budget (variance >20% =
  re-tier conversation due)

## Confirm + handoff

Tell the operator:
> *"Workflow status for the week: [X clients ON TRACK, Y BEHIND, Z
> CRITICAL]. [N source-doc chases drafted, awaiting your sign-off
> to send.] [Capacity: A hrs committed of B available, buffer C
> hrs — healthy / tight / over-committed]."*

After the week's close work is done, hand off to:
- `05-compliance.md` for BAS / VAT / payroll lodgements at the end
  of the cycle
- `06-invoice-payment.md` for monthly fixed-fee invoice run (1st of
  month)
- `11-followup-reviews.md` for post-lodgement client comms

## Done condition

- Monday sweep completed + status emails sent
- Source-doc chase queue cleared (drafted, ready for send)
- Capacity allocation done for the week
- Partner review window booked Thursday
- Monthly close on calendar for every monthly client
- Lodgement deadlines for next 30 days surfaced
