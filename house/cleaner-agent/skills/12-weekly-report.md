---
name: cleaner-weekly-report
description: End-of-week report. Jobs done, revenue, recurring vs one-off mix, contract renewal pipeline, supply spend, crew hours, complaints, photo-evidence compliance rate, reviews earned, lead source conversion. Updates learnings.md with the week's signal. Brief next week's focus.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Weekly report — pipeline + revenue + learnings

## Your job

Close out the working week with a tight, honest report. Pull
what actually happened. Update `learnings.md` with the patterns.
Brief next week. The whole thing should take 10 minutes for the
user to review and approve.

## Run this skill

- Friday afternoon (default for cleaning businesses on a Mon-Sat
  rhythm)
- Or whatever day the operator chooses (commercial-heavy
  businesses sometimes prefer Sunday — after the weekend cleans
  + before the Monday-morning office cycle)

## Step 1 — Pull the week's data

From conversation context + calendar + invoicing tool, aggregate:

```
WEEK ENDING [date]
==================

LEADS
- Total leads:              [count]
- By source:
  - GBP message:            [count]
  - GBP review reply:       [count]
  - Airtasker:              [count, credits used $X]
  - Hipages:                [count, credits used $X]
  - Oneflare / Bark / etc:  [count]
  - Thumbtack:              [count]
  - TaskRabbit / Angi:      [count]
  - SMS direct / repeat:    [count]
  - Facebook group:         [count]
  - Word of mouth / referral: [count]
  - Website form:           [count]
  - STR host referral:      [count]
  - Property manager referral: [count]
  - After-hours / urgent:   [count]
  - Other:                  [count]

QUOTES
- Quotes sent:              [count]
- Quotes accepted:          [count]
- Quote → booking rate:     [%]
- Average quote value:      $[X]
- Largest quote:            $[X] — [Customer + job]

JOBS COMPLETED
- Jobs done:                [count]
- Revenue:                  $[X]
- Average job value:        $[X]
- Hours billed:             [hrs]
- $/hr realised:            $[X]   (target: $[from BUSINESS CONFIG])

By job type:
  - Recurring residential:  [count, $]
  - Recurring commercial:   [count, $]
  - STR turnover:           [count, $]
  - Bond / end-of-tenancy:  [count, $]
  - Deep / spring:          [count, $]
  - Move-in:                [count, $]
  - Post-build:             [count, $]
  - Specialty:              [count, $]
  - NDIS:                   [count, $]

By customer type:
  - Homeowner:              [count, $]
  - Renter (bond cleans):   [count, $]
  - Real estate agent:      [count, $]
  - Property manager:       [count, $]
  - Airbnb host:            [count, $]
  - Business / commercial:  [count, $]
  - NDIS participant / plan manager: [count, $]

RECURRING VS ONE-OFF MIX
- Recurring revenue:        $[X]   ([%] of total — target 70%+)
- One-off revenue:          $[X]
- New contracts signed:     [count]
- Contracts lost (notice / churn): [count] — log reasons
- Net contract change:      [+/- count]
- Recurring conversion offers sent: [N]
- Conversions achieved:     [M] ([%])

NO-SHOWS / CANCELLATIONS
- Customer no-shows:        [count] — log reasons
- Customer cancellations:   [count] — log reasons
- Operator cancellations:   [count] — log reasons (illness,
                              crew shortage, etc.)

INVOICES + PAYMENTS
- Invoices sent:            [count]
- Paid (this week):         [count]
- Overdue (>7 days):        [count] — total $[X]
- Direct debit successes:   [count of recurring]
- Direct debit failures:    [count] — surfaced for follow-up
- Paid via Stripe / Square: [count]
- Paid via EFT / other:     [count]
- Average days to payment:  [days]
- Slowest payer:            [name — surface to operator if pattern]

REVIEWS
- New reviews:              [count]
- Average rating:           [4.X]
- Day-3 review asks sent:   [count]
- Day-3 → review conversion: [%]
- 3-star+ reviews this week: [count — recovery flow status]

PHOTO EVIDENCE COMPLIANCE
- Bond cleans completed:    [count]
- Photo packs delivered within 1 hr: [count] ([%])
- STR turnovers completed:  [count]
- Photo packs delivered within 30 min: [count] ([%])
- Commercial nightly sign-offs: [count]
- Sign-offs synced to facility manager same-day: [count] ([%])
- NDIS proof of service complete: [count] ([%])

URGENT / AFTER-HOURS
- Urgent calls:             [count]
- Dispatched:               [count]
- Sub-out (trauma / mould): [count]
- Declined / scheduled
  for next-day:             [count]
- Avg urgent revenue:       $[X]
- Most common urgent type:  [flood / biohazard / last-min STR
                              / complaint recovery]

PIPELINE (looking forward)
- Quotes outstanding:       [count] — $[X] potential
- Jobs booked for next week: [count] — $[X] expected
- Recurring visits next wk: [count]
- Contract renewals next 60 days: [count]
- Contract escalation notices going out next 60 days: [count]

COMPLIANCE
- Police check status:      [all current / 1 expiring in X days]
- WWCC status:              [all current / 1 expiring]
- NDIS Worker Screening:    [all current / 1 expiring]
- DBS status:               [all current / 1 expiring]
- Public liability:         [current / renews date]
- Vulnerable sector check:  [current / renews date]
- BICSc / CIMS-GB cert:     [current / renews]
- SDS folder updated:       [yes / new chems added this week]

CONTRACT MARGIN AUDIT (quarterly when due)
- Contracts Green:          [count]
- Contracts Yellow:         [count] — surface for review
- Contracts Red:            [count] — surface for action

CREW
- Crew hours total billed:  [hrs]
- Crew hours total paid:    [hrs]
- 5-star attribution by crew: [name + count]
- Complaints attribution:   [name + count — investigate]
- Hours cap breaches:       [count — should be 0]
- Sick / late / no-shows:   [count]

SUPPLY SPEND
- Total chems + consumables spend: $[X]
- As % of revenue:                 [%] (target <12%)
- Stockouts that hurt jobs:         [count — log + flag]
- New chem brands trialled:        [list]
```

## Step 2 — Score the week

In one sentence, rate the week against goals from BUSINESS
CONFIG:

```
WEEK SCORECARD
- Revenue: $[X] vs target $[Y] = [v / borderline / FLAG below]
- Recurring revenue share: [X%] vs target 70% = [...]
- Avg job value: $[X] vs target $[Y] = [...]
- Conversion (quote→booking): [X%] vs target [Y%] = [...]
- Recurring conversion (one-off→recurring): [X%] vs target 25% = [...]
- New reviews: [X] vs target [>=1/week] = [...]
- Photo evidence compliance: [X%] vs target 100% = [...]
- Overdue invoices: [X] vs target [0] = [...]
- Crew hours cap breaches: [X] vs target 0 = [...]
- Supply spend % revenue: [X%] vs target <12% = [...]
```

## Step 3 — Update learnings.md

For each section of `config/learnings-template.md`:

- **Job types by ROI** — recompute from this week's data and
  update the rolling 4-week average
- **Recurring vs one-off mix** — update the running %
- **Suburbs by drive-time ROI** — same
- **Quote → booking conversion** — update by source and by job
  type
- **Recurring conversion rate** — update (this is the big one)
- **Customer types** — update margins per type
- **What's lifting margin (keep doing)** — add this week's wins
- **What's hurting margin (stop doing)** — add this week's
  drags
- **Bond clean specifics** — update bond return success rate,
  callbacks, common rejection items, add-on attach rate
- **STR turnover patterns** — update avg turnaround, late
  turnovers, linen issues, restock burn
- **After-hours / urgent patterns** — add any urgent intakes
- **Supplier patterns** — flag any stockouts or delays, chem
  yield observations
- **Crew patterns** — $/hr realised per crew, 5-star
  attribution, complaint attribution
- **No-show / cancellation reasons** — log each
- **Reviews — what customers say** — extract praised +
  criticised themes
- **Bond agent / property manager scoring** — update pickiest
  list
- **Open experiments** — close completed, log results
- **Banned, refined** — any phrases / tactics that backfired
- **Compliance + admin** — update clearance expiry dates if any
  renewed

Show the updated `learnings.md` to the operator in a fenced
block. Ask:

> *"Updated learnings — anything I read wrong, or anything
> you'd change before this rolls into next week?"*

## Step 4 — Brief next week

Once `learnings.md` is signed off, write a one-page brief for
next week:

```
NEXT WEEK BRIEF — week of [date]

LEAN INTO:
- [Job type / format / hook that hit this week — e.g. "STR
   turnover photo packs convert at 80% to recurring host
   contracts — keep doing them"]
- [Customer type that converted well]
- [Lead source that converted above target]

PULL BACK FROM:
- [Job type / approach that flopped — e.g. "Airtasker bond
   clean leads from $200 budget customers convert at 8% and
   lose money — stop bidding"]
- [Source that's bringing wrong-fit leads]

TEST (one new thing):
- [E.g. "trial $20 conversion bonus on the Day-3 ask — week 1
   of 4"]
- [E.g. "test offering eco-tier as a $15/visit recurring
   add-on"]

ALREADY ON THE CALENDAR
- [Customer 1] — [date], [job type], $[X]
- [Customer 2] — [date], [job type], $[X]
- [Recurring visit for Customer N] — [date]
- [Bond clean for Customer M — handover Friday] — [date]

LEADS TO CHASE (sitting in pipeline)
- [Customer A] — quote sent [date], no reply (recurring fort,
  $145/visit annual $3.8k)
- [Customer B] — quote accepted, awaiting first visit slot
  confirm
- [Customer C] — site walk done, contract quote draft pending
  — commercial nightly $33k/yr

CONTRACTS DUE RENEWAL (next 60 days)
- [Customer X] — anniversary [date] — escalation notice goes
  out [date — 60 days prior]
- [Customer Y] — auto-renew on [date]
- [Customer Z] — at risk (Yellow flag) — schedule satisfaction
  call

BOND CALLBACKS DUE
- [None / list — bond clean for Customer A on [date], 72-hr
   window ends [date+72h]]

DEFECTS / RECTIFICATIONS QUOTED
- [List of separate quotes from contract management — e.g.
   "Smith carpet steam clean quoted separately, awaiting
   yes"]

NDIS PLAN HEALTH
- [Participant X plan funded hours used: 65% — surface to
   participant + plan manager for next plan review]

CREW SCHEDULE NEXT WEEK
- Crew A: [hours scheduled — within cap?]
- Crew B: [hours]
- ...

ADMIN
- Police check / WWCC / NDIS / DBS / public liability renewals
  within 60 days: [list]
- Stripe / GoCardless overdue list to chase
- GBP post to draft and approve
- Marketplace credit budget for next week: $[X]
```

## Step 5 — Send to operator + (optionally) accountant

The full report goes to the operator. The financial summary
section optionally goes to the accountant / bookkeeper (Xero /
MYOB / QuickBooks / FreshBooks / Wave import or just an email).
Per BUSINESS CONFIG → preferred format.

## Hard rules

- **Don't invent numbers.** If something's missing (e.g.
  payment status from a customer who paid EFT directly), flag
  it for the operator to fill in.
- **Don't overfit.** One week is signal, not a verdict. Three
  weeks of the same pattern is signal.
- **Honest about flops.** "Underquoted Smith's bond clean — 2
  bathrooms turned out to be 3, ate $180 margin" beats "had a
  tough week."
- **Flag clearance renewals early.** Police check, WWCC, NDIS
  Worker Screening, DBS, public liability — anything within 60
  days of expiry surfaces here. Lapsed clearances = no quotes
  for regulated work.
- **Flag contract margin patterns.** Yellow contracts need
  attention; Red contracts need a decision.
- **Flag photo evidence compliance gaps.** Below 95% = systemic
  issue (crew forgetting, app problem, customer not consenting
  — investigate).
- **No emoji unless BUSINESS CONFIG asks for it.**

## Confirm + handoff

> *"Week closed. Report ready for review — sending now? Once
> you sign off, learnings.md is locked for next week, and I'll
> start Monday with the queued leads + the recurring visit
> calendar."*

After sign-off, archive the report (e.g. `/reports/2026-w25.md`)
and load Monday's intake queue.
