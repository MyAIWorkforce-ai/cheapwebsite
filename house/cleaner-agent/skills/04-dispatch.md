---
name: cleaner-dispatch
description: Once a quote is accepted, assign the crew, prep the supplies, manage key / lockbox / smart-lock access, route the day, send confirmation + on-the-way + arrival nudge + completion SMS with photo-pack link. Update the calendar (ServiceM8 / Jobber / Housecall Pro / ZenMaid / Google Calendar) per BUSINESS CONFIG.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Dispatch — crew + route + access + comms

## Your job

Take an accepted quote and turn it into a calendar entry, a
confirmed time slot, crew assignment, supplies prep, access
plan, and a sequence of SMS / email touches: booking confirm,
on-the-way, arrival, completion (with photo pack link). Keep
the day's route sensible (cleaners shouldn't drive across town
three times — fuel + traffic + tired-cleaner-makes-mistakes all
eat margin and reviews).

## When this skill runs

- A customer replies "go ahead" / "Friday morning works" /
  "let's book it"
- Operator manually books a job
- Recurring contract auto-creates the next visit (via
  `09-recurring-maintenance.md`)
- Re-booking after a cancellation
- STR turnover triggered by calendar feed (Airbnb / Stayz iCal)

## Step 1 — Pick the slot + crew

Open the calendar (per BUSINESS CONFIG). For each available
slot, score it:

| Factor | Good slot | Bad slot |
|---|---|---|
| Suburb cluster | Within 5 km of next/previous job | More than 15 km from any other job |
| Time window | Customer's stated preference | Customer's stated NO |
| Day | Working hours per BUSINESS CONFIG | Day off |
| Buffer | 30 mins gap before/after (bond + post-build run over) | Back-to-back with no gap |
| Crew availability | Right crew size + skill mix | Crew member overscheduled |
| Crew hours cap | Within daily + weekly cap | Pushes crew over cap → REJECT |
| Crew chem allocation | Right chems already in crew vehicle | Crew has wrong kit for this job |
| Sun/holiday | Weekday or rate-justified weekend | Sunday without premium rate |
| Bond clean — must finish before lease end | Day before handover ideal | Same-day as handover risky (no buffer for re-clean) |
| STR turnover — must finish in window | Within checkout→checkin window | Outside the window |
| Commercial nightly — after staff depart | After 6pm | Before 6pm (staff still there) |
| NDIS — match plan funded hours | Within plan funded count | Beyond plan funding |

Pick the highest-scoring slot. If there's a tie, prefer the
slot that maximises the day's route efficiency (closest to
other jobs).

## Step 2 — Assign crew

Match the crew to the job:

| Job type | Crew composition |
|---|---|
| Residential recurring 1-2 bed | 1 cleaner |
| Residential recurring 3-4 bed | 1 cleaner (2.5-3 hrs) or 2 cleaners (1.5 hrs) — customer preference + crew availability |
| Bond clean 1-2 bed | 1-2 cleaners (4-6 hrs) |
| Bond clean 3+ bed | 2-3 cleaners (6-9 hrs) |
| Deep clean | 2 cleaners (efficient cross-check, catches misses) |
| Post-build | 2-3 cleaners (drywall dust is heavy work) |
| Commercial nightly small | 1 cleaner |
| Commercial nightly large (>500sqm) | 2 cleaners |
| STR turnover 1-2 bed | 1 cleaner |
| STR turnover 3+ bed | 1-2 cleaners (laundry pickup + clean split) |
| NDIS in-home | 1 cleaner, must hold NDIS Worker Screening + Orientation |
| Vulnerable sector (care home, school) | DBS Enhanced + vulnerable sector (UK) / Vulnerable sector check (CA) — non-negotiable |

Check BUSINESS CONFIG crew hours cap. Refuse the booking if it
pushes a crew member over the cap. Flag to the operator if
multiple jobs in one day push crew over.

## Step 3 — Send the booking confirmation

```
SMS — booking confirm (send within 10 mins of acceptance):

Booked in, [name]: [day, date], [time window], at [address].
Total: $[X] ([deposit terms / due on day / Net 7]).

I'll text the morning of with a tighter ETA + crew name.

— [your name], [Business name]
```

For bond cleans, add the access + property condition prompt:

```
Quick prep for the bond clean:
- Can you send a photo of the property the day before? Just
  helps us pre-load the right chems + check the carpet
  condition.
- Confirm access — lockbox / key under mat / agent will be
  there / you'll be there.
- 30% deposit secures the slot. Stripe link: [link]
- 72-hour guarantee starts the moment we finish.
```

For STR turnovers, add the access + restock prompt:

```
Confirmed — turnover at [property] on [date], window [X-Y].
Smart-lock code current — we use the rotating code we've got.
Linen drop-off: we'll restock from the on-site cupboard. If you
need anything specific stocked (e.g. a new coffee blend), tell
us by [day before].
```

For commercial nightly, add the access + after-hours prompt:

```
Confirmed start — first nightly visit [date]. We'll arrive at
[time] after your staff depart. Alarm code we use is on file
(rotated quarterly). Cleaner lead [name] will sign in / out via
the alarm panel + send you a time-stamped report after each
visit.
```

For NDIS, add the participant + plan-manager confirm:

```
Confirmed — fortnightly NDIS-funded clean for [first name],
starting [date]. Plan manager [name] copied on this confirm.
Service agreement signed. Each invoice will follow the NDIS
Price Guide line item.
```

## Step 4 — Prep the supplies

For each job, generate a supplies pre-load list for the crew
based on:
- Job type (bond / recurring / commercial / STR / NDIS / etc.)
- Property type (carpet / hard floor / mixed)
- Special chem needs (allergic accommodations, stone surfaces)
- Photo evidence requirements (which jobs need photos)

```
SUPPLIES PRE-LOAD — [Customer], [date]
======================================
Job type: [bond clean / recurring / commercial / STR / etc.]

CHEMS (in colour-coded caddy)
- Red (toilet/WC): [chem name + qty]
- Blue (bathroom): [chem + qty]
- Green (kitchen): [chem + qty]
- Yellow (general surfaces): [chem + qty]
- Specialty: [stone-safe / oven degreaser / glass cleaner / etc.]

EQUIPMENT
- Vacuum: [Numatic Henry / Sebo / backpack vac]
- Mop: [flat mop + 6 colour-coded heads]
- Microfibre: [12 cloths, colour-coded]
- Carpet steam machine: [if booked as add-on]
- Pressure washer: [if booked]
- Ladder: [for high windows / light fittings]

CONSUMABLES
- Bin liners: [size + qty for this property]
- Toilet paper: [if restock required — STR + commercial]
- Hand soap refill: [STR + commercial]
- Restock items: [STR — coffee pods, tea, sugar, paper towels]

SDS / COSHH FOLDER
- Confirmed in van: yes / no — top up if needed

PPE
- Gloves: nitrile + heavy-duty
- Mask: P2 / N95 for post-build + biohazard
- Eye protection: for chem mixing / pressure wash
- Boot covers: bond + NDIS in-home (customer protection)
```

For STR turnovers specifically, add the laundry / linen pickup
step:

```
LINEN + LAUNDRY ROUTING — STR Turnover
- Pickup soiled linens from property → [laundry name + address]
- Drop clean linens at property → from previous wash cycle
- Laundry turnaround: [hours]
- Backup linen stock on-site at property: [counts]
```

## Step 5 — Update the calendar

Per BUSINESS CONFIG → Scheduling tool:

- **Google Calendar:** Create event with title `[Customer] —
  [job type] — $[total]` and description containing the full
  quote, address, customer mobile, crew assigned, access notes
  (lockbox code, smart-lock, key location), and supplies
  pre-load.
- **ServiceM8 / Jobber / Housecall Pro / ZenMaid / Booking Koala
  / Launch27:** Use the field-service tool's job-creation API
  workflow. Agent renders the data block for the operator to
  paste in (or n8n it).
- **CleanTelligent / Janitorial Manager / Swept** (commercial):
  Use the commercial-cleaning-specific tool's job-template
  workflow.
- **Manual:** Output a paste-ready block for the operator's
  preferred system.

## Step 6 — On-the-way SMS (morning of job)

Send 30 mins before ETA. Don't send the night before — too
far out.

```
On the way, [name] — [crew lead first name] + crew, ETA [time].
See you at [address] shortly.

— [your name], [Business name]
```

For recurring residential, simpler:

```
On the way [name] — [crew lead] arriving [time]. Fortnightly
clean as usual.
```

For STR turnovers, no customer SMS (host doesn't want
notification unless something's wrong). Internal log only.

If there's a delay on a prior job (the bond clean was advertised
as 4-hr and turned into 6-hr), update:

```
Running ~30 mins late from a previous job, [name]. New ETA
[time]. Sorry for the wait — crew lead [name] will be there.

— [your name]
```

Send the delay text the moment you know, not when you arrive.
Cleaners who text early get higher review scores even when
they run late.

## Step 7 — Completion SMS (after job done, photo pack link)

```
Job done, [name] — [one-line summary of what got cleaned + any
add-ons].
Photo pack: [link to time-stamped photos]
Invoice on the way — $[X]. Thanks for the work.

— [your name]
```

For bond cleans specifically (photo pack is the deliverable):

```
Bond clean complete, [name]. Property looking sharp.

Photo pack with time-stamped before/after of every room is
here: [link]
Also forwarded to your property manager [agent name] — should
arrive within the hour.

72-hour bond guarantee starts now. If anything comes back from
the agent, just send me a screenshot of their email and we'll
sort it — no charge.

Invoice on the way — $[X] (less the 30% deposit you already
paid).

— [your name], [Business name]
```

For STR turnovers (photo pack to host):

```
Turnover complete at [property]. Ready for check-in.

Photo pack: [link]
Items I flagged: [e.g. "1 wine glass chipped — left in kitchen
for guest claim", "coffee pods down to 6 — added to next
order"].

Next turn already booked? [date if known]

— [your name]
```

For commercial nightly (report to facility manager, no SMS to
customer):

```
INTERNAL ONLY — Nightly visit complete
Site:        [property]
Crew:        [lead + crew]
Arrival:     [time stamped from alarm panel sign-in]
Departure:   [time stamped from alarm panel sign-out]
Hours:       [X]
Issues:      [list anything found — supply low, breakage,
              maintenance flagged]
Alarm set:   [yes — verified before exit]
Door locked: [yes — verified]
Report sent to facility manager: [yes — link to ServiceM8 /
                                    Jobber / CleanTelligent
                                    sign-off]
```

## Step 8 — Photo evidence (the deliverable for bond / commercial / STR / NDIS)

For each job type that requires it, the crew captures
time-stamped photos. The agent assembles them into a customer-
facing pack:

| Job type | Photo requirement |
|---|---|
| Bond clean | Every room — wide + close on trouble spots (oven inside, shower screen, toilet base, skirting); before AND after where condition was poor |
| Post-build | Every room — wide + close on grout, vents, fittings; before AND after |
| Commercial nightly | Sign-off photos of WCs, kitchens, key high-touch zones |
| STR turnover | Every room — wide finished shot; close on beds, bathrooms, kitchen; flagged damage / left items |
| NDIS | Only with participant consent; otherwise written record only |
| Recurring residential | Not required — but a "mid-clean kitchen shot to the customer" lifts review velocity |

Assemble:
- Photos uploaded to cloud (per BUSINESS CONFIG → photo tool)
- Time-stamped (auto by camera / app)
- Organised by room
- Linkable via single shareable link
- Retained per BUSINESS CONFIG → retention period (90 days
  minimum for bond cleans)

## Day-route optimisation

Each morning, look at the day's bookings. Render a route plan:

```
DAY ROUTE — [date]
==================
07:30  Crew leaves depot — [crew lead + members]
08:00–10:30  [Customer A] — [suburb] — [job — recurring fort 3-bed]
10:45–12:30  [Customer B] — [suburb] — [job — bond clean 1-bed]
12:30–13:00  Lunch (in van or local)
13:00–18:00  [Customer C] — [suburb] — [job — bond 3-bed, 2 cleaners]
              (heads up to next-day team: crew may finish at 17:30
               or 18:30 depending on condition)
19:00  Return to depot

Total drive time: [hrs]
Total billable hours: [hrs]
Estimated revenue: $[X]

NIGHTLY CREW (separate roster):
18:30  Commercial site #1 — [address]
20:30  Commercial site #2 — [address]
22:00  Return depot
```

If two jobs are more than 20 km apart and could be swapped,
suggest the swap.

For bond clean days, block out the whole day — bond cleans
overrun (smokers, pet hair, hoarder conditions).

For STR-heavy days, build the route around the turnover windows
(checkout → check-in is usually 11am-3pm or 11am-4pm).

## Handling cancellations + reschedules

If a customer cancels:

```
SMS — cancellation:
No worries, [name] — cancelled. If you want to rebook just send
through the date and I'll find a slot.

— [your name]
```

Cancellation policy from BUSINESS CONFIG:
- More than 48 hrs notice: no charge
- 24-48 hrs notice: 50% charge (deposit retained for bond)
- Less than 24 hrs / no-show: 100% charge (covers crew time
  already lost)

Log it in `learnings.md` under "no-show / cancellation reasons"
with the reason.

If a customer reschedules:
- Repeat Steps 1-3 with the new slot
- Don't make them feel bad about it
- If they reschedule more than twice in a row, flag in
  learnings (could be a non-converting lead pattern)

## Special case — recurring contract visit auto-trigger

For recurring contracts, the calendar auto-creates the next
visit at the cadence agreed in the contract. The agent doesn't
need a customer "go ahead" each time — the contract IS the
ongoing approval. But:

- Send the day-before reminder SMS the day before each visit
- Send the on-the-way SMS the morning of each visit
- If a recurring customer cancels a specific visit, log the
  reason — pattern emerges if they cancel >3 in 6 months
  (engagement is dropping; flag for `09-recurring-maintenance.md`
  customer health check)

## Special case — STR turnover from calendar feed

If BUSINESS CONFIG has a STR host with calendar share
(Airbnb / Stayz iCal):
- Auto-import checkouts as turnover triggers
- Schedule turnover crew within the checkout → check-in window
- If the window is <3 hrs, flag to operator (sub-2-hr turn is
  doable but tight — premium rate applies per BUSINESS CONFIG)
- No customer SMS for routine; only flag the host if something's
  wrong

## Confirm + handoff

Tell the operator:
> *"Booked [Customer] for [day, date] [time]. Crew: [name(s)].
> Supplies pre-load: [done / send to crew now]. Calendar updated.
> Confirmation SMS sent. On-the-way SMS queued for [day]
> [time-30 mins]."*

After the job, hand off to:
- `07-supplier-ordering.md` if supplies low after this job
- `05-compliance.md` for the checklist sign-off + photo pack
- `06-invoice-payment.md` for the invoice
- `11-followup-reviews.md` for next-day check-in + Day-3
  review + recurring-conversion offer

## Done condition

- Slot confirmed by customer
- Crew assigned and notified
- Supplies pre-load drafted
- Calendar updated
- Booking SMS sent
- Day route updated
- Photo-pack template loaded for the right job type
