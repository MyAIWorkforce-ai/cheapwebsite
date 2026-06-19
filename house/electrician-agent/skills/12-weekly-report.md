---
name: electrician-weekly-report
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
  - Hi Pages / Angi:        [count]
  - Facebook group:         [count]
  - Word of mouth / referral: [count]
  - Website form:           [count]
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

REVIEWS
- New reviews:              [count]
- Average rating:           [4.X]
- Day-3 review asks sent:   [count]
- Day-3 → review conversion: [%]

PIPELINE (looking forward)
- Quotes outstanding:       [count] — $[X] potential
- Jobs booked for next week: [count] — $[X] expected
- Maintenance visits queued: [count]

COMPLIANCE
- Certs issued:             [count]
- Permits lodged:           [count]
- Compliance issues:        [list any defects found / quoted as
                             rectification]
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
- **After-hours patterns** — add any emergency intakes
- **Supplier patterns** — flag any stockouts or delays
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
- [Job type / format / hook that hit this week]
- [Customer type that converted well]
- [Lead source that converted above target]

PULL BACK FROM:
- [Job type / approach that flopped]
- [Source that's bringing wrong-fit leads]

TEST (one new thing):
- [E.g. try raising the callout fee by $20 for solo bookings]
- [E.g. trial a "$50 off your next job for a Google review"
  referral program for the referrer — NOT the reviewer (Google
  bans incentivised reviews)]

ALREADY ON THE CALENDAR
- [Customer 1] — [date], [job type], $[X]
- [Customer 2] — [date], [job type], $[X]
- [Maintenance visit for Customer N] — [date]

LEADS TO CHASE (sitting in pipeline)
- [Customer A] — quote sent [date], no reply
- [Customer B] — quote accepted, awaiting booking confirmation
- [Customer C] — site inspection requested, not yet scheduled

DEFECTS / RECTIFICATIONS QUOTED
- [List of separate quotes from compliance checks awaiting decision]

ADMIN
- [Permits to lodge / certs to upload]
- [Stripe overdue list to chase]
- [GBP post to draft and approve]
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
- **Honest about flops.** "Underquoted Smith's switchboard by 2
  hours" beats "had a tough week."
- **No emoji unless BUSINESS CONFIG asks for it.**

## Confirm + handoff

> *"Week closed. Report ready for review — sending now? Once you sign
> off, learnings.md is locked for next week, and I'll start Monday
> with the queued leads."*

After sign-off, archive the report (e.g. `/reports/2026-w25.md`) and
load Monday's intake queue.
