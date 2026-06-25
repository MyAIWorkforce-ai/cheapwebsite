---
name: hvac-weekly-report
description: End-of-week report. Jobs done, revenue, pipeline, leads, conversion rate by source, service plan attach rate, no-shows, reviews earned, supplier issues, seasonal capacity status. Updates learnings.md with the week's signal. Brief next week's focus.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Weekly report — pipeline + revenue + learnings + service plan health

## Your job

Close out the working week with a tight, honest report. Pull what
actually happened. Update `learnings.md` with the patterns. Brief
next week. The whole thing should take 10 minutes for the user to
review and approve.

## Run this skill

- Friday afternoon (default for HVAC businesses on a Mon-Fri rhythm)
- Or whatever day the operator chooses (rural/regional trades often
  prefer Sunday evening; commercial-heavy techs may prefer Monday
  morning so they can plan the week ahead)

## Step 1 — Pull the week's data

From conversation context, aggregate:

```
WEEK ENDING [date]
==================
Season:                [heatwave / cold snap / shoulder / deep summer / deep winter]
Heatwave/snap days:    [count]
Vulnerable-occupant callouts: [count]

LEADS
- Total leads:              [count]
- By source:
  - GBP message:            [count]
  - GBP review reply:       [count]
  - SMS direct / repeat:    [count]
  - Hi Pages / Angi /
    Houzz / Checkatrade / HomeStars: [count]
  - Facebook group:         [count]
  - Word of mouth / referral: [count]
  - Website form:           [count]
  - After-hours emergency:  [count]
  - Seasonal campaign:      [count]
  - Service plan member breakdown: [count]
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
  - Diagnostic / no-cool callout: [count, $]
  - Capacitor / contactor:    [count, $]
  - Coil clean (condenser):   [count, $]
  - Drain pan + condensate:   [count, $]
  - Filter / minor:           [count, $]
  - Leak detect + repair:     [count, $]
  - Split changeout:          [count, $]
  - Multi-head split:         [count, $]
  - Ducted reverse-cycle:     [count, $]
  - Heat pump retrofit:       [count, $]
  - Commercial RTU:           [count, $]
  - Annual service (plan visits): [count, $]
  - Thermostat upgrade:       [count, $]

SERVICE PLAN HEALTH (THE strategic number)
- New plans signed this week:    [count]
- By entry point:
  - From new install (target 60%+ attach): [X% — count Y / count Z installs]
  - From callout (target 30%+ attach):    [X% — count Y / count Z callouts]
  - From campaign:                          [count]
- Total active plans:                     [count]
- Plan annual recurring revenue:          $[X]
- Renewals due this month:                [count]
- Renewals due next month:                [count]
- Year-over-year plan growth:             [%]
- Rectification revenue from plan visits this week: $[X]
   (target 15-25% of plan revenue annually)

NO-SHOWS / CANCELLATIONS
- Customer no-shows:        [count] — log reasons
- Customer cancellations:   [count] — log reasons
- Operator cancellations:   [count] — log reasons (weather risk
                             on ducted/RTU, supply delay, etc.)

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
- Heatwave / cold snap:     [count of each]
- Dispatched:               [count]
- Declined / scheduled
  for next-day:             [count]
- Avg emergency revenue:    $[X]
- Most common emergency:    [heatwave no-cool / cold-snap no-heat /
                             refrigerant smell / dripping]
- Service plan attach from emergency: [%]

PIPELINE (looking forward)
- Quotes outstanding:       [count] — $[X] potential
- Jobs booked for next week: [count] — $[X] expected
- Plan visits queued:       [count]
- Equipment on order:       [count] — promised arrival dates
- Heat pump retrofits in grant pipeline (UK BUS / AU state /
  US IRA / CA Greener Homes): [count]

COMPLIANCE
- Refrigerant logbook entries: [count]
- Refrigerant kg charged this week (by type):
  - R32: [kg]
  - R410A: [kg]
  - R454B: [kg]
  - R134a: [kg]
- Refrigerant kg recovered this week: [kg by type]
- F-Gas leak inspections done (UK):     [count]
- F-Gas leak inspections due next 30 days (UK): [count]
- Gas safety checks issued (if ticketed): [count]
- Handover packs issued:                 [count]

SEASONAL / CAPACITY
- Capacity utilisation:       [%] (target: 80% in shoulder; 100% in peak)
- Bookings turned away:       [count, type]
- Heatwave / cold-snap forecast next 14 days: [Y/N — adjust dispatch
                                                accordingly]
- Service plan campaign status: [pre-summer / pre-winter — week N of M]
- Refrigerant cylinder stock:  [healthy / low — order before peak]
- Equipment lead times trending: [normal / extending — flag in next
                                   project quotes]
```

## Step 2 — Score the week

In one sentence, rate the week against goals from BUSINESS CONFIG:

```
WEEK SCORECARD
- Revenue: $[X] vs target $[Y] = [✓ / borderline / below]
- Avg job value: $[X] vs target $[Y] = [...]
- Conversion: [X%] vs target [Y%] = [...]
- Service plan attach (installs): [X%] vs target 60% = [...]
- Service plan attach (callouts): [X%] vs target 30% = [...]
- New reviews: [X] vs target [≥1/week] = [...]
- Overdue invoices: [X] vs target [0] = [...]
- Emergency conversion: [X%] vs target [70%+] = [...]
- Capacity utilisation: [X%] vs target = [...]
```

## Step 3 — Update learnings.md

For each section of `config/learnings-template.md`:

- **Job types by ROI** — recompute from this week's data and update
  the rolling 4-week average
- **Service plan attach** — THIS is the most important section to
  update. Track:
  - Attach rate by entry point (install / callout / campaign /
     emergency)
  - Total active plans
  - Renewal rate (rolling 12 months)
  - Rectification revenue per visit
  - Plan revenue trajectory
- **Suburbs by drive-time ROI** — same
- **Quote → booking conversion** — update by source and by job type
- **Customer types** — update margins per type AND service plan
  attach by type
- **What's lifting margin (keep doing)** — add this week's wins
- **What's hurting margin (stop doing)** — add this week's drags
- **Seasonal patterns** — heatwave / cold-snap conversion, vulnerable
  occupant count, pre-summer/winter campaign performance
- **After-hours patterns** — add any emergency intakes (season
  patterns matter)
- **Supplier patterns** — flag any equipment stockouts or refrigerant
  cylinder shortages
- **Equipment performance by brand** — note any brand reliability
  patterns from week's jobs (warranty claims, repeat faults)
- **Refrigerant patterns** — kg by type, leak detection conversion,
  any "top-up only" requests declined (track the lost-to-competitor
  count)
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
Season: [shoulder / heatwave / cold snap / deep season]
Forecast: [N days >35°C / <0°C / mild]

LEAN INTO:
- [Job type / format / hook that hit this week — e.g. "split
   changeouts converted at 55% — keep pushing year-1 plan included"]
- [Customer type that converted well]
- [Lead source that converted above target]
- [Service plan attach point that's working — e.g. "emergency
   Day-7 ask hit 60% attach, lean into emergency campaigns"]

PULL BACK FROM:
- [Job type / approach that flopped — e.g. "thermostat-only upgrades
   margin thin, decline politely or bundle with service visit"]
- [Source that's bringing wrong-fit leads — e.g. "Houzz credits on
   $500k+ home installs — wasted week, pause for a month"]

TEST (one new thing):
- [E.g. try lifting the heatwave callout by $40 — week 1 of 4]
- [E.g. trial bundling smart thermostat into Plan B at $50/month — measure
   uptake]
- [E.g. test "year-1 service plan free + 5-year extended manufacturer
   warranty registered" framing on next 5 install quotes]

ALREADY ON THE CALENDAR
- [Customer 1] — [date], [job type], $[X]
- [Customer 2] — [date], [job type], $[X]
- [Plan visit for Customer N] — [date]
- [Equipment arrival for Customer M] — [date]
- [F-Gas leak inspection for Customer K] — [date — mandatory cadence]

LEADS TO CHASE (sitting in pipeline)
- [Customer A] — quote sent [date], no reply (split changeout, $3.2k)
- [Customer B] — quote accepted, awaiting deposit
- [Customer C] — site inspection requested, not yet scheduled
   (ducted install, $14k)
- [Customer D] — heat pump retrofit quote pending grant confirmation
   (BUS application in progress, £7,500 + £6,200 = £13,700 net)

PLAN RENEWALS COMING UP (30 days out)
- [Customer A] — Plan A renewal, [date], $245 with loyalty discount
- [Customer B] — Plan B renewal, [date], $395 + propose upgrade-A → B
- [Customer C] — Commercial Plan C renewal, [date], proposal already drafted

RECTIFICATIONS QUOTED (from plan visits this week)
- [Customer X] — coil deep clean, $320, awaiting reply
- [Customer Y] — capacitor swap (drifted 9% below nameplate), $220
- [Customer Z] — drain pan algae treatment, $180

REFRIGERANT HANDOVER LIST (if not your licence tier)
- [Customer P] — industrial cool room referred to partner — confirm
   partner has taken the booking, get referral fee back if applicable

PRE-SEASON CAMPAIGN STATUS (if active)
- Pre-summer / pre-winter campaign — week [N] of [M]
- Emails sent this week:                [count]
- Bookings from campaign:               [count]
- Service plans attached:               [count]
- Revenue from campaign:                $[X]
- ROI vs campaign cost:                 [Xx]

ADMIN
- [Refrigerant logbook entries to lodge with regulator — deadline]
- [Gas safety certs to issue — if ticketed]
- [Stripe overdue list to chase]
- [GBP post to draft and approve]
- [Refrigerant licence renewal — if expiring within 60 days]
- [F-Gas REFCOM company cert renewal — annual UK]
- [Insurance renewal check]

SUPPLIER FLAG
- [Equipment lead time getting longer for X model — adjust quote
   validity periods]
- [Refrigerant cylinder stock low — order before next week]
- [Wholesaler X chronically slow on Daikin Cora — try Y for
   shoulder season]
```

## Step 5 — Send to operator + (optionally) accountant

The full report goes to the operator. The financial summary section
optionally goes to the accountant / bookkeeper (Xero / MYOB / QBO
import or just an email). Per BUSINESS CONFIG → preferred format.

## Hard rules

- **Don't invent numbers.** If something's missing (e.g. payment
  status from a customer who paid EFT directly), flag it for the
  operator to fill in.
- **Don't overfit.** One week is signal, not a verdict. Three weeks
  of the same pattern is signal.
- **Honest about flops.** "Underquoted Smith's ducted install —
  return air grille was undersized, ate $480 margin re-doing" beats
  "had a tough week."
- **Flag licence renewals early.** Refrigerant tickets, gas tickets,
  state HVAC licences, REFCOM cert, MCS cert, insurance — anything
  within 60 days of expiry surfaces here. Lapsed licences = no
  quotes.
- **Service plan attach rate is the strategic number.** If it's
  below target for 3 weeks running, flag it as a Process problem,
  not a Numbers problem. The agent probably needs to push the ask
  harder at one of the touchpoints.
- **Equipment lead time changes are a leading indicator.** If
  Daikin lead times went from 3 days to 9 days, NEXT week's quote
  validity period needs to change. Surface it before the operator
  quotes against the old assumption.
- **Refrigerant kg-charged and kg-recovered should reconcile** with
  the logbook entries. If the math doesn't match, the agent flags
  for the operator to investigate — this is the audit number.
- **No emoji unless BUSINESS CONFIG asks for it.**

## Confirm + handoff

> *"Week closed. Report ready for review — sending now? Once you sign
> off, learnings.md is locked for next week, and I'll start Monday
> with the queued leads."*

After sign-off, archive the report (e.g. `/reports/2026-w25.md`) and
load Monday's intake queue.
