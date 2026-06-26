---
name: airbnb-weekly-report
description: End-of-week per-property report. Pulls inquiries, bookings, ADR, RevPAR, occupancy, reviews, turnovers, maintenance, channel mix, dynamic-pricing audit. Updates learnings.md with the week's signal. Briefs next week. The 10-minute Friday session that turns running properties into running a business.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Weekly report — per-property P&L + learnings

## Your job

Close out the working week with a tight, honest, per-property
report. Pull what actually happened from the week's conversation
context — inquiries, bookings, turnovers, reviews, maintenance,
supply orders, regulatory deadlines. Update `learnings.md` with the
patterns. Brief next week. The whole thing should take the operator
10 minutes to review + approve.

For a multi-property business this is the single most important
file: it's how the operator knows which property is winning, which
is leaking, and which is at risk.

## Run this skill

- **Friday afternoon** — default for most STR operations (Mon-Sun
  booking week)
- **Sunday evening** — alternative for hosts who track on
  check-out-day cadence
- After any week with a critical event (party, double-booking,
  Aircover claim) — interim report

The operator picks the cadence in BUSINESS CONFIG. Stick to it.

## Step 1 — Pull the week's data

From conversation context across the week's skills (intake → quote
→ dispatch → emergency → invoicing → followup), aggregate per
property:

```
WEEK ENDING [date]
==================
Business: [name]
Properties: [count]

PER-PROPERTY ROLLUP
===================

PROPERTY: [internal name]
---------

INQUIRIES (this week)
- Total inquiries:           [count]
- By channel:
  - Airbnb:                  [count]
  - VRBO:                    [count]
  - Booking.com:             [count]
  - Stayz (AU):              [count]
  - Direct site form:        [count]
  - Repeat / direct outreach:[count]
- Avg time-to-first-reply:   [mins]  (target: <60 mins for Superhost)
- Inquiry → booking rate:    [%]
- Inquiries declined:        [count] — log reasons (party risk, dates
                                       blocked, BUSINESS CONFIG misfit,
                                       registration block)

BOOKINGS (this week — confirmed + check-in within week)
- Confirmed:                 [count]
- Cancellations (host):      [count] — log reasons
- Cancellations (guest):     [count] — log reasons + refund tier
- ADR (this week):           $[X]
- Average nights/booking:    [N]
- Lead time (booking → check-in): [avg days]

OCCUPANCY
- This week:                 [%]   (booked nights ÷ available nights)
- 4-week trailing avg:       [%]
- vs. target ([Y]% from BUSINESS CONFIG): [✓ / borderline / 🚩 below]
- Empty nights this week:    [count] — flag if calendar gaps look fixable

ADR (Average Daily Rate)
- This week:                 $[X]
- 4-week trailing avg:       $[X]
- vs. PriceLabs / Beyond / Wheelhouse recommendation:
                             [delta — over / under / on]
- vs. target ($[Y] from BUSINESS CONFIG): [...]

RevPAR (ADR × Occupancy)
- This week:                 $[X]
- 4-week trailing avg:       $[X]
- vs. target ($[Y] from BUSINESS CONFIG): [...]

REVENUE
- Gross revenue (booked nights × rate): $[X]
- Cleaning fees collected:   $[X]
- Channel commission paid:
  - Airbnb (15% host-only): $[X]
  - Booking.com (15-18% + Genius if applicable): $[X]
  - VRBO (5% pay-per-booking or annual sub): $[X]
  - Stripe / direct payment processor: $[X]
- Net revenue after commission: $[X]
- Cleaning fee net (after cleaner cost): $[X]
- Lodging tax collected (auto vs. manual): $[X]
- Net to operator (before income tax): $[X]

REVIEWS EARNED (this week)
- New reviews:               [count]
- Avg score:                 [4.X]
- By channel:
  - Airbnb:                  [count, avg]
  - VRBO:                    [count, avg]
  - Booking.com:             [count, avg]
  - Direct (Google/Trustpilot): [count, avg]
- Review-request response rate: [%] (asks → reviews left)
- Time-to-review (avg days from request): [N]
- Notable review content: [1-line summary of standout positive +
                            standout critical]

TURNOVERS (this week)
- Total turnovers:           [count]
- On-time rate:              [%] (cleaner all-clear before check-in window)
- Avg turnover hours:        [hrs from checkout to all-clear]
- Cleaner performance:
  - [Primary cleaner]:       [N turnovers, on-time %, issues]
  - [Backup cleaner]:        [N turnovers, on-time %, issues]
- Late check-outs that disrupted: [count] — fee applied? Y/N
- Linen rotation health:     [% of stays starting with fresh laundered linen]

HOUSE-RULE VIOLATIONS
- Party / noise sensor triggered: [count + decibel + outcome]
- Smoking detected (smoke detector / clean inspection): [count + claim?]
- Unauthorized guests / overcap: [count + fee applied?]
- Pets without approval: [count + fee applied?]
- Late check-out (after grace): [count + fee applied?]
- Damage to property: [count + Aircover/claim filed?]

MAINTENANCE ISSUES
- Issues logged this week:   [count] — list:
  - [Property — issue — date — status (rectified / pending / scheduled)]
- Rectified this week:       [count]
- Pending:                   [count + due dates]
- Tradesperson dispatched:   [count]
- Avg time issue → resolved: [hrs]

DAMAGE / AIRCOVER CLAIMS
- Claims filed this week:    [count]
- Claim $ total:             $[X]
- Recovered (in week):       $[X]
- Pending:                   $[X]
- Avg time-to-resolve (rolling): [days]

SUPPLY ORDERS (this week)
- Linen replenishment:       [items, $X]
- Toiletries (shampoo / soap / TP): [units, $X]
- Coffee / consumables:      [units, $X]
- Replacement furniture / item: [items, $X]
- Total supply spend (week): $[X]
- Cost-per-stay (rolling avg): $[X]

REGULATORY DEADLINES (within 60 days)
- STR registration renewal:  [date — days out]
- Lodging tax filing:        [date — days out]
- Insurance renewal:         [date — days out]
- HOA / strata annual fee:   [date — days out]
- Smoke alarm / safety check: [date — days out]
- Property-specific licence: [date — days out]
- ⚠️ Flag any < 30 days out as urgent

CHANNEL MIX (this week + 4-week trailing)
- Airbnb:                    [%]  (this week / 4w avg)
- VRBO:                      [%]
- Booking.com:               [%]
- Stayz:                     [%]
- Direct:                    [%]
- Repeat / loyal guest:      [%]
- ⚠️ Flag if any single channel >85% (channel-concentration risk)

DYNAMIC PRICING AUDIT
- PriceLabs / Beyond / Wheelhouse recommendation (avg, this week): $[X]
- Realised ADR:              $[X]
- Delta:                     [+/- $X / +/-%]
- Bookings accepted below min: [count — should be 0]
- Bookings declined due to min-rate guardrail: [count]
- Verdict: [Capturing upside / Min too tight / Min too loose /
            Tool recommendation off]
```

Repeat the per-property block for every property in BUSINESS CONFIG.

## Step 2 — Portfolio rollup

After per-property, roll up the business:

```
PORTFOLIO TOTALS
================
- Total properties active:   [N]
- Total revenue (net):       $[X]
- Total nights booked:       [N]
- Average occupancy:         [%]
- Average ADR:               $[X]
- Average RevPAR:            $[X]
- Total reviews earned:      [N]
- Avg review score:          [4.X]
- Total turnovers:           [N]
- Total maintenance spend:   $[X]
- Total supply spend:        $[X]
- Total claims $ recovered:  $[X]
```

## Step 3 — Per-property scorecard

For each property, score vs. BUSINESS CONFIG goals:

```
SCORECARD — [Property internal name]
- Occupancy: [X]% vs. target [Y]% = [✓ / borderline / 🚩 below]
- ADR:       $[X] vs. target $[Y] = [...]
- RevPAR:    $[X] vs. target $[Y] = [...]
- Review:    [4.X] vs. target [4.Y] = [...]
- Reviews this week (count): [N] vs. target [≥1/week] = [...]
- Channel mix risk: [✓ diversified / 🚩 >85% on one channel]
- Maintenance backlog: [N pending] vs. target [0] = [...]

VERDICT: [Win — push / Steady — maintain / Push more / Intervention
needed]
```

Verdicts:
- **Win — push**: hitting all targets, lean in (more cross-listing,
  higher max rate, photo refresh to extend streak)
- **Steady — maintain**: hitting most targets, don't change much
- **Push more**: missing one or two targets, identify the lever
- **Intervention needed**: missing multiple, surface to operator
  with proposed plan

## Step 4 — Update learnings.md

For each section of `config/learnings-template.md`, recompute and
update:

- **Per-property scorecard (4-week rolling)** — update with this
  week's numbers
- **Channel mix per property (4-week rolling)** — same
- **Quote → booking conversion** — by stay type
- **Guest types** — segment by what came in this week
- **What's lifting RevPAR (keep doing)** — add this week's wins
  (specific — "raised Saturday min by $20 on Battery Point, occupancy
  held, ADR +$18")
- **What's hurting RevPAR (stop doing)** — add this week's drags
  (specific — "accepted Booking.com Genius L2 enrollment on Sandy
  Bay Studio, net per night dropped $34, Booking review score 4.1")
- **Pricing patterns** — best/worst day-of-week, last-minute fill
  conversion, lead time distribution, PriceLabs delta
- **Review patterns** — most-praised / most-criticised words from
  this week's reviews
- **Turnover patterns** — cleaner on-time rate, avg turnover hours,
  any maintenance issues found
- **House-rule violations** — log every one (pattern detection)
- **Damage / Aircover claims** — log resolution, time-to-resolve,
  pattern (e.g. "two missing-towel claims in 6 weeks — add explicit
  'towels = $25/each' to welcome pack")
- **Maintenance patterns per property** — update last-tested / next-
  due cycles
- **Supply patterns** — replenishment cycles, $/stay average
- **Channel-fee tracking** — Airbnb host fee %, Booking commission
  paid, VRBO subscription cost
- **Regulatory compliance status** — surface any renewal coming
  within 60 days
- **Open experiments** — close completed ones with results, log new
  ones
- **Banned, refined** — any phrases / tactics added this week

Show the updated `learnings.md` to the operator in a fenced block.

Ask:

> *"Updated learnings — anything I read wrong, or anything you'd
> change before this rolls into next week?"*

## Step 5 — Pre-arrival check (next week)

List every guest checking in next week with what they need:

```
PRE-ARRIVAL — week of [date]

CHECK-INS NEXT WEEK
- [Guest name] — [Property] — [check-in date] — [N nights] —
  [channel] — [stay type — couple / family / business / group]
  Status:
    □ Welcome pack sent (7 days out)
    □ Door code generated / lock code rotated
    □ 24h reminder queued
    □ Cleaner confirmed for prior checkout
    □ Special requests (high chair / late check-in / pet — from CONFIG)

- [Guest name] — [Property] — [check-in date] — ...
```

Surface anything that needs operator attention:
- VIP / repeat guest arriving (handwritten note? welcome gift?)
- First-stay-of-the-week long-stay guest (MTR onboarding pack)
- Property with overlapping back-to-back checkouts (turnover
  pressure — confirm cleaner has capacity)
- Property with maintenance issue NOT yet rectified (must be done
  before check-in or surface to operator NOW)

## Step 6 — Brief next week

Once `learnings.md` is signed off, write a one-page brief for
next week:

```
NEXT WEEK BRIEF — week of [date]
=================================

LEAN INTO:
- [Specific win to push — e.g. "Battery Point hit 92% occupancy and
   reviews are 4.97 — raise max rate to $410 for Dec long weekend"]
- [Channel that converted above target — e.g. "Direct bookings 4
   this week (up from 1) — keep pushing the repeat-guest invite"]
- [Stay type winning — e.g. "MTR inquiries on Sandy Bay converted
   3 of 4 — lean into the corporate-channel cross-listing"]

PULL BACK FROM:
- [Channel / approach that flopped — e.g. "Booking.com Genius L2 on
   Sandy Bay net $34 below Airbnb — drop back to L1 next week"]
- [Stay type that's not working — e.g. "Local-guest Friday-night
   single-night bookings = 2 noise complaints in 4 stays — raise
   Friday min stay to 2 nights"]
- [Lead source bringing wrong-fit guests — e.g. "Stayz inquiries
   from interstate party groups — tighten the listing copy to
   filter"]

TEST (one new thing — only one):
- [E.g. "Test new cover photo on Hobart CBD Apartment — exterior
   dusk shot vs. current kitchen — Airbnb listing-photo experiment,
   2 weeks"]
- [E.g. "Trial 28-night MTR rate on Sandy Bay at $135/night for the
   May-Jul corporate season — surface to operator first"]
- [E.g. "Add 'pet-friendly with $50 fee' to Battery Point listing,
   measure 4-week impact on inquiries"]

ALREADY ON THE CALENDAR
- [Property] — [check-in date] — [guest name] — [N nights] — $[X]
- [Property] — [check-in date] — ...
- Turnover scheduled: [property — date — cleaner]
- Maintenance scheduled: [property — date — tradesperson — issue]

PIPELINE (inquiries open)
- [Property] — [guest] — [dates] — [status: awaiting reply / quote
  sent / inquiry held for operator]
- ...

DEFECTS / RECTIFICATIONS PENDING
- [Property — issue — quoted $X — awaiting operator decision]
- ...

REGULATORY DEADLINES (within 60 days)
- [Property] — [STR registration renewal] — [date — days out]
- [Property] — [insurance renewal] — [date — days out]
- [Property] — [smoke alarm test] — [date — days out]

CLEANER PATTERN ISSUES (if any)
- [Cleaner] — on-time rate [X]% over 4 weeks (target 95%+) —
  surface for conversation
- [Cleaner] — flagged for [specific issue — missed deep clean,
  reported late, quality drop] — surface

SUPPLY ORDERS DUE
- Linen restock for [property]: order by [date]
- Toiletry restock: order by [date]
- Replacement [item] for [property]: order by [date]

ADMIN
- [Channel reconciliation — Airbnb payout matches expected]
- [Lodging tax filing due — date]
- [Property gas / electrical / water inspection due]
- [Insurance renewal documents to file]
- [STR registration renewal — file 60 days out]
```

## Step 7 — Send to operator + (optionally) accountant

The full report goes to the operator. The financial summary
section (revenue, channel commission, lodging tax) optionally goes
to the accountant / bookkeeper (Xero / MYOB / QuickBooks import or
email).

Per BUSINESS CONFIG → preferred format.

## Hard rules

- **Don't invent numbers.** If a channel payout hasn't reconciled
  yet, flag "awaiting payout statement" — don't guess. If PriceLabs
  didn't push a recommendation for a date, note "no PL data" —
  don't extrapolate. If cleaner didn't log an all-clear time, ask
  the operator to fill in.
- **Don't overfit one week.** One week is signal, not a verdict.
  Three weeks of the same pattern is signal. State this in the
  brief — "this is week 1 of a possible pattern" vs. "this is
  week 3, intervention warranted".
- **Honest about flops.** "Battery Point sat empty Wednesday-Thursday
  — should have dropped to $135 min on Tuesday morning, missed it"
  beats "had a quiet week".
- **Flag regulatory deadlines.** Anything within 60 days surfaces
  here. STR registration renewal, insurance renewal, lodging tax
  filing, smoke alarm test, body corp annual fee. Lapsed
  registration = no new bookings under the hard refuse rule in
  MASTER_PROMPT.
- **Flag insurance renewal early.** A lapsed STR-specific policy
  (Proper / Pikl / Sharemaster / Square One) leaves Aircover as the
  only fallback, which isn't sufficient.
- **Flag cleaner pattern issues at week 4, not week 1.** One bad
  turnover is a bad day. Four in a row is a pattern — surface for
  a conversation or backup cleaner activation.
- **Don't bury the lead.** If a property is at risk (review score
  dropping, channel mix concentration, maintenance backlog growing,
  cleaner issues), it goes at the TOP of the report, not buried
  in the per-property block.
- **Channel commission math has to add up.** If gross - commission
  ≠ net, find the difference (occupancy tax remitted by channel,
  resolution-center refund, cleaning fee timing).
- **No emoji unless BUSINESS CONFIG asks for it.**
- **No corporate-speak.** "Property hit target" not "the asset
  achieved key performance indicators".

## Reading the learnings.md

This skill UPDATES `learnings.md` — but should also re-read it at
the start to:
- Compare this week's data to the 4-week trailing average
- Detect pattern shifts (occupancy slide, review-score drop, channel
  mix change, dynamic-pricing delta widening)
- Surface any open experiment that's now complete (e.g. "Battery
  Point Saturday rate test — 4 weeks done, ADR +$22 with occupancy
  steady — make permanent")
- Bring forward any "Intervention needed" flag from prior weeks

## Confirm + handoff

> *"Week closed. Report ready for review — sending now? Once you
> sign off, learnings.md is locked for next week, and I'll start
> Monday with the queued check-ins + the pipeline inquiries."*

After sign-off:
- Archive the report (e.g. `/reports/2026-w26.md`)
- Lock the updated `learnings.md`
- Queue Monday's inquiry triage + pre-arrival comms
- If any "Intervention needed" property was flagged, surface the
  proposed plan in Monday's first message
- If any regulatory deadline is within 30 days, escalate (separate
  message, top of inbox)
