---
name: hvac-dispatch
description: Once a quote is accepted, schedule the job. Build a sensible day route (cluster jobs by suburb). Balance seasonal load — heatwave breakdowns get priority, shoulder-season install bookings get the long slots. Send confirmation SMS, on-the-way SMS, completion SMS. Update the calendar (Google Cal / simPRO / ServiceM8 / Tradify / FieldEdge / Housecall Pro) per BUSINESS CONFIG.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Dispatch — schedule + route + comms + seasonal load-balancing

## Your job

Take an accepted quote and turn it into a calendar entry, a confirmed
time slot, and three SMS / email touches: booking confirm, on-the-
way, completion. Keep the day's route sensible (don't drive across
town three times — fuel, tolls, and recovering refrigerant in 38°C
heat while tired all eat margin).

HVAC dispatch is harder than electrical or plumbing because the
load shape isn't flat. The agent watches:
- **Heatwave week** — push install bookings out 4-6 weeks, all
  capacity to breakdowns
- **Cold snap** — same, for no-heat breakdowns
- **Shoulder season** — install + service plan visits dominate
- **Deep season (mid-summer / mid-winter)** — turn down new install
  enquiries if booked out

## When this skill runs

- A customer replies "go ahead" / "Thursday morning works" /
  "let's book it" / "Option A please"
- Operator manually books a job
- Re-booking after a cancellation
- Annual service plan visit (`09-recurring-maintenance.md` triggers
  this for each scheduled service visit)

## Step 1 — Pick the slot

Open the calendar (per BUSINESS CONFIG). Look at the existing day.
For each available slot, score it:

| Factor | Good slot | Bad slot |
|---|---|---|
| Suburb cluster | Within 5 km of next/previous job | More than 15 km from any other job |
| Time window | Customer's stated preference | Customer's stated NO |
| Day | Working hours per BUSINESS CONFIG | Day off |
| Buffer | 45 mins gap before/after install jobs (HVAC jobs often run over — coil corrosion, electrical fault, refrigerant recovery slow) | Back-to-back with no gap |
| Season | Heatwave week + breakdown = same-day priority; install = push to next shoulder | Shoulder = install slot; breakdown = same-day |
| Roof access | Daylight only for ducted install + RTU; needs structural review before crane | After-hours for roof work |
| Vulnerable occupant | Priority same-day in heatwave or cold snap | Standard scheduling |
| Refrigerant logbook | Make sure cylinder + recovery rig + leak detector are in van | Missing recovery rig on a recovery job is the worst |

Pick the highest-scoring slot. If there's a tie, prefer the slot
that maximises the day's route efficiency (closest to other jobs).

## Seasonal load-balancing rules

```
HEATWAVE WEEK (BoM heatwave declared OR forecast >35°C 3+ days)
- All quote turnarounds: <5 mins
- All available slots: breakdowns only
- Install bookings: 4-6 weeks out (customers accept this in heatwave)
- After-hours: surcharge bumped +25% per BUSINESS CONFIG
- Vulnerable-occupant calls: priority dispatch — bump non-emergency
  callouts to next day
- Service plan members: their scheduled visits hold; their
  breakdowns go to the front of the queue

COLD SNAP (forecast overnight <0°C / 32°F for 3+ nights)
- Same rules as heatwave but for no-heat calls
- Heat pump / gas heater breakdowns: priority, especially elderly

SHOULDER SEASON (post-summer or post-winter)
- Install bookings preferred 2-4 weeks out
- Service plan visits scheduled and dispatched
- Catch up on backlog of non-urgent quotes
- Send pre-summer / pre-winter campaigns (via 10-leadgen)

DEEP SEASON CAP (mid-summer / mid-winter, no respite)
- Calendar capacity at full → turn down NEW install enquiries
  politely; route to "I can quote you for shoulder season install
  in [month]"
- Service plan visits hold (these are pre-booked obligations)
- Breakdowns + service plan members only
```

## Step 2 — Send the booking confirmation

```
SMS — booking confirm (send within 10 mins of acceptance):

Booked in, [name]: [day, date], [time window], at [address].
[Equipment if project: "5.0kW Daikin Cora R32 split"]
Total: $[X] (30% deposit on acceptance / due on completion / Net 7).

I'll text you the morning of with a tighter ETA.

— [your name], [Business name]
```

For installs, add:
```
Equipment order goes in today — expected delivery [date].
Deposit invoice on the way ($[X]). Install kicks off once equipment
lands.
```

For changeouts, add:
```
Quick heads up — system will be off for ~3-4 hours during the
changeout. If it's hot, plan to be out, or one room cooled by a
fan. Cool air's back by [time].
```

For ducted installs, add:
```
Quick housekeeping — roof space needs to be accessible (manhole
clear, no stored boxes in the path), and we'll need power off at
the board for 30 mins late in the day to wire up the sub-circuit.
I'll text you 15 min before the power-off.
```

For commercial RTU change-outs:
```
Crane booking lodged for [date]. Building access confirmed [time].
Shutdown window [time]–[time] per your facilities. Final
commissioning + handover by [time].
```

## Step 3 — Update the calendar

Per BUSINESS CONFIG → Scheduling tool:

- **Google Calendar:** Create event with title `[Customer] — [job
  summary] — $[total]` and description containing the full quote,
  address, customer mobile, brand + model + refrigerant type, any
  access notes (gate code, dog, side gate, roof manhole position).
- **simPRO / ServiceM8 / Tradify / AroFlo / FieldEdge / Housecall
  Pro / Jobber / ServiceTitan:** Use the existing job-creation
  workflow. Agent renders the data block for the operator to paste
  in (or n8n it).
- **Manual:** Output a paste-ready block for the operator's
  preferred system.

## Step 4 — On-the-way SMS (morning of job)

Send 30 mins before ETA. Don't send the night before — too far out.

```
On the way, [name] — ETA [time]. See you at [address] shortly.

— [your name]
```

If there's a delay on a prior job (the indoor coil was caked, the
contactor took heat-soak time, the line-set needed re-flushing),
update:

```
Running ~30 mins late from a previous job, [name]. New ETA [time].
Sorry for the wait — I'll be there.

— [your name]
```

Send the delay text the moment you know, not when you arrive. Trades
who text early get higher review scores even when they run late.

For heatwave-week vulnerable-occupant callouts, set a much tighter
proactive update cadence — text at confirm, text at ETA, text on
arrival.

## Step 5 — Completion SMS (after job done, before next)

```
Job done, [name] — [one-line summary of what got fixed].
[Refrigerant logbook + handover pack issued | docs coming via
email today].
Invoice on the way — $[X]. Thanks for the work, [first name].

— [your name]
```

For split changeouts specifically:
```
Job done, [name] — new Daikin Cora 5.0kW installed and running.
Cool air at the head within 5 min. Refrigerant log + warranty
registration + manuals in your email by tonight. Invoice on the
way — $[X].

Service plan year 1 included as agreed. We'll text you in
[month next year] to book your annual service. Cheers.

— [your name]
```

For ducted installs:
```
Job done, [name] — ducted system commissioned + balanced.
7 zones set, controller paired with your wifi, app installed on
your phone. Running on cool now — should be at temp in 20 min.
Handover docs + warranty in your email tonight.

Walkthrough video I just sent shows the zone controls + filter
access (monthly check). Invoice on the way — $[X].

— [your name]
```

For diagnostic callouts:
```
Diagnostic done, [name] — turned out to be [capacitor / contactor /
fan motor / control board]. Fixed on the day. Cool air's back.
Logbook entry done. Invoice on the way — $[X].

If you're keen on the annual service plan we talked about, it'd
catch the next one before it happens. Just reply 'plan' and I'll
send the details.

— [your name]
```

For commercial RTU change-outs:
```
Job done, [name] — new RTU commissioned, ducting transition
sealed, BAS integration tested. System running on cool now.
Handover pack + commissioning sheet emailed to your facilities
team. Annual service contract starts on date of commissioning —
next visit in [month].

Invoice + final variations on the way.

— [your name]
```

## Day-route optimisation

Each morning, look at the day's bookings. Render a route plan:

```
DAY ROUTE — [date]
================
07:00  Leave depot — check van: R32 cylinder, vacuum pump, recovery
        rig, electronic leak detector, capacitor stock (35+5 μF /
        45+5 μF), contactor stock (24V coil 1-pole + 2-pole)
07:30  Pickup at Beijer [suburb] — Daikin Cora 5.0kW for Smith,
        coil cleaner foam, R32 cylinder if low
08:00–10:00  [Customer A] — [suburb] — no-cool diagnostic
        (Mitsubishi MSZ-EF42 — likely capacitor; van stock OK)
10:30–14:30  [Customer B — Smith] — [suburb] — split changeout
        (Daikin Cora 5.0kW)
15:00–16:30  [Customer C] — [suburb] — annual service plan visit
        (ducted Carrier, year-2 customer)
17:00  Return to depot, refrigerant logbook entries

Total drive time: [hrs]
Total billable hours: [hrs]
Estimated revenue: $[X]
```

If two jobs are more than 20 km apart and could be swapped, suggest
the swap.

For install days (ducted / multi-head / RTU) — block out the whole
day, don't schedule small jobs on the back of an install. Installs
overrun.

For commissioning days — block 30 mins extra in the afternoon for
walking the customer through the controller, app pairing, filter
access. Skipping this is the #1 cause of "the system isn't
working" callbacks 2 weeks later when they couldn't figure out the
mode change.

## Handling cancellations + reschedules

If a customer cancels:

```
SMS — cancellation:
No worries, [name] — cancelled. If you want to rebook just send
through the date and I'll find a slot.

— [your name]
```

Log it in `learnings.md` under "no-show / cancellation reasons" with
the reason (got a cheaper quote? AC came back on by itself? landlord
didn't approve? tenant moved out?).

If a customer reschedules:

- Repeat Steps 1–3 with the new slot
- Don't make them feel bad about it
- If they reschedule more than twice in a row, flag in learnings
  (could be a non-converting lead pattern)

## Special case — heatwave no-cool rescheduling

If a confirmed no-cool customer is currently without AC in a
declared heatwave, prioritise their reschedule above install
quoting work. Heatwave breakdown customers are gold for repeat
work — they remember "the HVAC tech who came on the worst day."
Drop them into the next morning's first slot, no questions asked.

For vulnerable occupants (baby, elderly, medical) — same-day always.
Bump another non-emergency callout if needed.

## Special case — install day with weather risk

For ducted installs and outdoor RTU work:
- Check forecast 48 hrs before. Heavy rain = unsafe roof work +
  ducting can't be exposed.
- If forecast changes, reschedule with customer the day before, not
  the morning of. Customers tolerate weather reschedules; they don't
  tolerate "we got here and decided not to."

## Confirm + handoff

Tell the operator:
> *"Booked [Customer] for [day, date] [time]. Confirmation SMS sent.
> Calendar updated. Equipment ordered from [supplier]. On-the-way SMS
> queued for [day] [time-30 mins]."*

After the job, hand off to:
- `07-supplier-ordering.md` if parts needed for next time
- `05-compliance.md` for the refrigerant logbook + handover pack +
  warranty rego
- `06-invoice-payment.md` for the invoice
- `11-followup-reviews.md` for next-day follow-up

## Done condition

- Slot confirmed by customer
- Calendar updated
- Booking SMS sent
- Day route updated
- Equipment ordered if project
- Refrigerant + tooling check on van for the type of job
