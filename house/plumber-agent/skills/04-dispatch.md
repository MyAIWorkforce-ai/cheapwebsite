---
name: plumber-dispatch
description: Once a quote is accepted, schedule the job. Build a sensible day route (cluster jobs by suburb). Send confirmation SMS, on-the-way SMS, completion SMS. Update the calendar (Google Cal / simPRO / ServiceM8 / Tradify / AroFlo) per BUSINESS CONFIG.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Dispatch — schedule + route + comms

## Your job

Take an accepted quote and turn it into a calendar entry, a confirmed
time slot, and three SMS / email touches: booking confirm, on-the-
way, completion. Keep the day's route sensible (don't drive across
town three times — fuel, tolls, and unblocking-a-drain-while-
tired-from-traffic all eat margin).

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
| Buffer | 30 mins gap before/after (plumbing jobs often run over — wax rings, seized fittings) | Back-to-back with no gap |
| Sun/holiday | Weekday or rate-justified weekend | Sunday without premium rate justification |
| Hot water replacement | Morning slot preferred (so customer has hot water by evening) | Late afternoon (risk of running into evening) |
| Drainage / excavation | Allow for utility locates lead time (Dial Before You Dig — 1-2 business days) | Same-day for any dig |

Pick the highest-scoring slot. If there's a tie, prefer the slot
that maximises the day's route efficiency (closest to other jobs).

## Step 2 — Send the booking confirmation

```
SMS — booking confirm (send within 10 mins of acceptance):

Booked in, [name]: [day, date], [time window], at [address].
Total: $[X] (30% deposit on acceptance / due on completion / Net 7).

I'll text you the morning of with a tighter ETA.

— [your name], [Business name]
```

For hot water replacements, add:
```
Quick heads up — water will be off for ~2 hours during the swap.
Fill a couple of kettles beforehand if you need water for tea / pets.
You'll have hot water back by [time].
```

For drainage / excavation jobs, add:
```
I've lodged the utility locate (Dial Before You Dig / 811 / etc.) —
they'll mark gas, water, comms at the property by [date]. Don't
remove the paint marks before I arrive.
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
  address, customer mobile, and any access notes (gate code,
  dog, side gate, etc.).
- **simPRO / ServiceM8 / Tradify / AroFlo:** Use the existing
  job-creation API workflow. Agent renders the data block for the
  operator to paste in (or n8n it).
- **Manual:** Output a paste-ready block for the operator's
  preferred system.

## Step 4 — On-the-way SMS (morning of job)

Send 30 mins before ETA. Don't send the night before — too far out.

```
On the way, [name] — ETA [time]. See you at [address] shortly.

— [your name]
```

If there's a delay on a prior job (the wall plate was rotted, the
seized cartridge needed heat, the wax ring took 3 attempts), update:

```
Running ~20 mins late from a previous job, [name]. New ETA [time].
Sorry for the wait — I'll be there.

— [your name]
```

Send the delay text the moment you know, not when you arrive. Trades
who text early get higher review scores even when they run late.

## Step 5 — Completion SMS (after job done, before next)

```
Job done, [name] — [one-line summary of what got fixed].
[Compliance Cert issued | Cert coming via email today].
Invoice on the way — $[X]. Thanks for the work, [first name].

— [your name]
```

For hot water swaps specifically:
```
Job done, [name] — new Rheem 360L gas continuous-flow installed and
running. Hot water should be at temperature within 10 minutes.
Compliance Cert + Gas Type A Cert in your email by tonight. Invoice
on the way — $[X]. Cheers.

— [your name]
```

For drainage clear-outs:
```
Drain cleared, [name] — [tree roots / wipes / grease, whatever]. CCTV
footage on its way via email — there's [no further issues / one spot
worth watching at the boundary trap]. Invoice on the way — $[X].
Cheers.

— [your name]
```

## Day-route optimisation

Each morning, look at the day's bookings. Render a route plan:

```
DAY ROUTE — [date]
================
07:30  Leave depot
08:00–09:30  [Customer A] — [suburb] — [job — e.g. leaking tap]
09:45–11:00  [Customer B] — [suburb] — [job — blocked drain]
11:15–12:00  Drive to lunch / pickup at Reece [suburb]
12:30–15:30  [Customer C] — [suburb] — [job — hot water swap, 3 hrs]
15:45–16:30  [Customer D] — [suburb] — [job — toilet install]
17:00  Return to depot

Total drive time: [hrs]
Total billable hours: [hrs]
Estimated revenue: $[X]
```

If two jobs are more than 20 km apart and could be swapped, suggest
the swap.

For dig days (drainage / excavation) — block out the whole day,
don't schedule small jobs on the back of an excavation. Excavations
overrun.

## Handling cancellations + reschedules

If a customer cancels:

```
SMS — cancellation:
No worries, [name] — cancelled. If you want to rebook just send
through the date and I'll find a slot.

— [your name]
```

Log it in `learnings.md` under "no-show / cancellation reasons" with
the reason (got a cheaper quote? landlord didn't approve? decided to
live with the drip? tenant cancelled?).

If a customer reschedules:

- Repeat Steps 1–3 with the new slot
- Don't make them feel bad about it
- If they reschedule more than twice in a row, flag in learnings
  (could be a non-converting lead pattern)

## Special case — hot water emergency rescheduling

If a confirmed hot water swap customer is currently without hot water
(and it's winter), prioritise their reschedule above quoting work.
Hot water customers are the lowest-friction repeat customer you can
have — they remember "the plumber who got me hot water back".

## Confirm + handoff

Tell the operator:
> *"Booked [Customer] for [day, date] [time]. Confirmation SMS sent.
> Calendar updated. On-the-way SMS queued for [day] [time-30 mins]."*

After the job, hand off to:
- `07-supplier-ordering.md` if parts needed for next time
- `05-compliance.md` for the certificate(s) — plumbing + gas if
  applicable
- `06-invoice-payment.md` for the invoice
- `11-followup-reviews.md` for next-day follow-up

## Done condition

- Slot confirmed by customer
- Calendar updated
- Booking SMS sent
- Day route updated
- Utility locates lodged if dig involved
