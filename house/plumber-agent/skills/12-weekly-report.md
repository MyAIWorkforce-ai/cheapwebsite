---
name: plumber-weekly-report
description: End-of-week report. Jobs done, revenue, pipeline, leads, conversion rate by source, no-shows, reviews earned, supplier issues. Updates learnings.md with the week's signal. Brief next week's focus.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Weekly report — pipeline + revenue + learnings

## Your job

Close out the working week with a tight, honest report. Pull what
actually happened. Update `learnings.md` with the patterns. Brief
next week. The whole thing should take 10 minutes for the user to
review and approve.

## Run this skill

- Friday afternoon (default for trades businesses on a Mon-Fri rhythm)
- Or whatever day the operator chooses (rural/regional trades often
  prefer Sunday evening)

## Step 1 — Pull the week's data

From conversation context, aggregate:

```
WEEK ENDING [date]
==================

LEADS
- Total leads:              [count]
- By source:
  - GBP message:            [count]
  - GBP review reply:       [count]
  - SMS direct / repeat:    [count]
  - Hi Pages / Angi /
    Checkatrade / Trustatrader: [count]
  - Facebook group:         [count]
  - Word of mouth / referral: [count]
  - Website form:           [count]
  - After-hours emergency:  [count]
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
- By job type:
  - Callouts (taps, blocks): [count, $]
  - Hot water replacement:   [count, $]
  - Bathroom / kitchen:      [count, $]
  - Drainage:                [count, $]
  - Gas:                     [count, $]
  - Maintenance contracts:   [count, $]

NO-SHOWS / CANCELLATIONS
- Customer no-shows:        [count] — log reasons
- Customer cancellations:   [count] — log reasons
- Operator cancellations:   [count] — log reasons

INVOICES + PAYMENTS
- Invoices sent:            [count]
- Paid (this week):         [count]
- Overdue (>7 days):        [count] — total $[X]
- Paid via Stripe / Square: [count]
- Paid via EFT:             [count]
- Average days to payment:  [days]
- Slowest payer:            [name — surface to operator if pattern]

REVIEWS
- New reviews:              [count]
- Average rating:           [4.X]
- Day-3 review asks sent:   [count]
- Day-3 → review conversion: [%]

EMERGENCY / AFTER-HOURS
- Emergency calls:          [count]
- Dispatched:               [count]
- Declined / scheduled
  for next-day:             [count]
- Avg emergency revenue:    $[X]
- Most common emergency:    [burst pipe / sewage / no hot water / gas]

PIPELINE (looking forward)
- Quotes outstanding:       [count] — $[X] potential
- Jobs booked for next week: [count] — $[X] expected
- Maintenance visits queued: [count]
- Cylinders on order:       [count] — promised arrival dates

COMPLIANCE
- Plumbing Certs issued:    [count]
- Gas Certs issued:         [count] (only if ticketed)
- Backflow tests lodged:    [count]
- Permits lodged:           [count]
- Compliance issues / defects found
  but not yet rectified:    [list — these are open variation quotes]
```

## Step 2 — Score the week

In one sentence, rate the week against goals from BUSINESS CONFIG:

```
WEEK SCORECARD
- Revenue: $[X] vs target $[Y] = [✓ / borderline / 🚩 below]
- Avg job value: $[X] vs target $[Y] = [...]
- Conversion: [X%] vs target [Y%] = [...]
- New reviews: [X] vs target [≥1/week] = [...]
- Overdue invoices: [X] vs target [0] = [...]
- Emergency conversion: [X%] vs target [70%+] = [...]
```

## Step 3 — Update learnings.md

For each section of `config/learnings-template.md`:

- **Job types by ROI** — recompute from this week's data and update
  the rolling 4-week average
- **Suburbs by drive-time ROI** — same
- **Quote → booking conversion** — update by source and by job type
- **Customer types** — update margins per type
- **What's lifting margin (keep doing)** — add this week's wins
- **What's hurting margin (stop doing)** — add this week's drags
- **After-hours patterns** — add any emergency intakes (season
  patterns matter: burst-pipe spike, hot water failure spike,
  blocked-drain Christmas spike)
- **Supplier patterns** — flag any stockouts or delays (which
  cylinder always stocks out at which branch on which day)
- **Hot water replacement specifics** — gas/electric/heat pump mix,
  customer questions that won the job
- **Drainage patterns** — which suburbs have root intrusion, which
  have grease, conversion of CCTV → reline
- **No-show / cancellation reasons** — log each
- **Reviews — what customers say** — extract praised + criticised
  themes
- **Open experiments** — close completed, log results
- **Banned, refined** — any phrases/tactics that backfired

Show the updated `learnings.md` to the operator in a fenced block.
Ask:

> *"Updated learnings — anything I read wrong, or anything you'd
> change before this rolls into next week?"*

## Step 4 — Brief next week

Once `learnings.md` is signed off, write a one-page brief for next
week:

```
NEXT WEEK BRIEF — week of [date]

LEAN INTO:
- [Job type / format / hook that hit this week — e.g. "same-day
   hot water swaps converted at 65% — keep pushing"]
- [Customer type that converted well]
- [Lead source that converted above target]

PULL BACK FROM:
- [Job type / approach that flopped — e.g. "gas cooktop installs
   margin thin, decline politely or quote at minimum + buffer"]
- [Source that's bringing wrong-fit leads — e.g. "Hi Pages credits
   on bathroom renos converting at 8%, pause for the month"]

TEST (one new thing):
- [E.g. try lifting the after-hours callout by $30 — week 1 of 4]
- [E.g. trial offering CCTV-then-reline as a $99 diagnostic on
   blocked-drain Day-1 follow-ups]

ALREADY ON THE CALENDAR
- [Customer 1] — [date], [job type], $[X]
- [Customer 2] — [date], [job type], $[X]
- [Maintenance visit for Customer N] — [date]
- [Cylinder arrival for Customer M] — [date]

LEADS TO CHASE (sitting in pipeline)
- [Customer A] — quote sent [date], no reply (hot water swap, $2.4k)
- [Customer B] — quote accepted, awaiting deposit
- [Customer C] — site inspection requested, not yet scheduled
  (bathroom reno, $14k)

DEFECTS / RECTIFICATIONS QUOTED
- [List of separate quotes from compliance checks / maintenance
   visits awaiting decision — e.g. "Smith TMV3 service kit $85,
   awaiting strata approval"]

GAS HANDOVER LIST (if not ticketed)
- [Customer X gas cooktop install referred to partner gas fitter
   — confirm partner has taken the booking, get $50 referral fee
   back if applicable]

ADMIN
- [Backflow certs to lodge with water authority — deadline]
- [Compliance Certs to upload to state portal]
- [Stripe overdue list to chase]
- [GBP post to draft and approve]
- [Gas ticket renewal — if expiring within 60 days]
```

## Step 5 — Send to operator + (optionally) accountant

The full report goes to the operator. The financial summary section
optionally goes to the accountant / bookkeeper (Xero / MYOB import
or just an email). Per BUSINESS CONFIG → preferred format.

## Hard rules

- **Don't invent numbers.** If something's missing (e.g. payment
  status from a customer who paid EFT directly), flag it for the
  operator to fill in.
- **Don't overfit.** One week is signal, not a verdict. Three weeks
  of the same pattern is signal.
- **Honest about flops.** "Underquoted Smith's hot water — galvanised
  pipework added 2 hrs, ate $220 margin" beats "had a tough week."
- **Flag licence renewals early.** Gas tickets, plumbing licences,
  insurance — anything within 60 days of expiry surfaces here.
  Lapsed licences = no quotes.
- **No emoji unless BUSINESS CONFIG asks for it.**

## Confirm + handoff

> *"Week closed. Report ready for review — sending now? Once you sign
> off, learnings.md is locked for next week, and I'll start Monday
> with the queued leads."*

After sign-off, archive the report (e.g. `/reports/2026-w25.md`) and
load Monday's intake queue.
