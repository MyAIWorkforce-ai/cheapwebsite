---
name: electrician-dispatch
description: Once a quote is accepted, schedule the job. Build a sensible day route (cluster jobs by suburb). Send confirmation SMS, on-the-way SMS, completion SMS. Update the calendar (Google Cal / ServiceM8 / Tradify) per BUSINESS CONFIG.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Dispatch — schedule + route + comms

## Your job

Take an accepted quote and turn it into a calendar entry, a confirmed
time slot, and three SMS / email touches: booking confirm, on-the-
way, completion. Keep the day's route sensible (don't drive across
town three times).

## When this skill runs

- A customer replies "go ahead" / "Thursday morning works" /
  "let's book it"
- Operator manually books a job
- Re-booking after a cancellation

## Step 1 — Pick the slot

Open the calendar (per BUSINESS CONFIG). Look at the existing day.
For each available slot, score it:

| Factor | Good slot | Bad slot |
|---|---|---|
| Suburb cluster | Within 5 km of next/previous job | More than 15 km from any other job |
| Time window | Customer's stated preference | Customer's stated NO |
| Day | Working hours per BUSINESS CONFIG | Day off |
| Buffer | 30 mins gap before/after | Back-to-back with no gap |
| Sun/holiday | Weekday or rate-justified weekend | Sunday without premium rate justification |

Pick the highest-scoring slot. If there's a tie, prefer the slot
that maximises the day's route efficiency (closest to other jobs).

## Step 2 — Send the booking confirmation

```
SMS — booking confirm (send within 10 mins of acceptance):

Booked in, [name]: [day, date], [time window], at [address].
Total: $[X] (50% deposit on acceptance / due on completion / Net 7).

I'll text you the morning of with a tighter ETA.

— [your name], [Business name]
```

For project jobs add:
```
Deposit invoice on the way ($[X]). I'll start the job once that's
cleared. Cheers.
```

## Step 3 — Update the calendar

Per BUSINESS CONFIG → Scheduling tool:

- **Google Calendar:** Create event with title `[Customer] — [job
  summary] — $[total]` and description containing the full quote,
  address, and customer mobile.
- **ServiceM8 / Tradify / Fergus:** Use the existing job-creation
  API workflow. Agent renders the data block for the operator to
  paste in (or n8n it).
- **Manual:** Output a paste-ready block for the operator's
  preferred system.

## Step 4 — On-the-way SMS (morning of job)

Send 30 mins before ETA. Don't send the night before — too far out.

```
On the way, [name] — ETA [time]. See you at [address] shortly.

— [your name]
```

If there's a delay on a prior job, update:

```
Running ~15 mins late from a previous job, [name]. New ETA [time].
Sorry for the wait — I'll be there.

— [your name]
```

Send the delay text the moment you know, not when you arrive. Trades
who text early get higher review scores even when they run late.

## Step 5 — Completion SMS (after job done, before next)

```
Job done, [name] — [one-line summary of what got fixed].
[Cert of Compliance issued | Cert coming via email today].
Invoice on the way — $[X]. Thanks for the work, [first name].

— [your name]
```

## Day-route optimisation

Each morning, look at the day's bookings. Render a route plan:

```
DAY ROUTE — [date]
================
07:30  Leave depot
08:00–09:30  [Customer A] — [suburb] — [job]
09:45–11:00  [Customer B] — [suburb] — [job]
11:15–12:00  Drive to lunch / coffee break
12:30–14:00  [Customer C] — [suburb] — [job]
14:30–16:00  [Customer D] — [suburb] — [job]
16:30  Return to depot

Total drive time: [hrs]
Total billable hours: [hrs]
Estimated revenue: $[X]
```

If two jobs are more than 20 km apart and could be swapped, suggest
the swap.

## Handling cancellations + reschedules

If a customer cancels:

```
SMS — cancellation:
No worries, [name] — cancelled. If you want to rebook just send
through the date and I'll find a slot.

— [your name]
```

Log it in `learnings.md` under "no-show / cancellation reasons" with
the reason.

If a customer reschedules:

- Repeat Steps 1–3 with the new slot
- Don't make them feel bad about it

## Confirm + handoff

Tell the operator:
> *"Booked [Customer] for [day, date] [time]. Confirmation SMS sent.
> Calendar updated. On-the-way SMS queued for [day] [time-30 mins]."*

After the job, hand off to:
- `07-supplier-ordering.md` if parts needed for next time
- `05-compliance.md` for the certificate
- `06-invoice-payment.md` for the invoice
- `11-followup-reviews.md` for next-day follow-up

## Done condition

- Slot confirmed by customer
- Calendar updated
- Booking SMS sent
- Day route updated
