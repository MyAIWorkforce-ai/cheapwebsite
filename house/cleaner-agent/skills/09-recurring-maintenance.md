---
name: cleaner-recurring-maintenance
description: THE main spine of the cleaning business. Manage recurring contracts — weekly / fortnightly / monthly residential, commercial nightly, STR per-turnover. Lock dates 12 months ahead. Monitor margin per contract. Flag scope creep. Manage scheduled price escalation (CPI + 1.5%). Handle 72-hour bond callback. Be the relentless contract-conversion machine after every one-off.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Recurring maintenance — the spine of the cleaning business

## Your job

Recurring contracts are the cleaning business. If 70% of weekly
capacity is contracted, the business smooths cash flow + reduces
sales effort + survives the slow weeks. This skill is the
machine that makes that happen:

1. **Manage every active recurring contract** — schedule, supplies,
   crew, customer health, margin
2. **Flag every one-off as a recurring conversion candidate** —
   trigger the offer after Day-1 follow-up
3. **Lock dates 12 months ahead** — recurring work that's only
   "planned for later" doesn't happen
4. **Monitor scope creep** — the customer who started with a
   2.5hr fortnightly that's somehow become a 4hr clean (with no
   extra charge)
5. **Manage scheduled price escalation** — annual CPI + 1.5%
   review, 60-90 days notice
6. **Handle 72-hour bond return callbacks** — the bond clean
   recovery flow
7. **Quarterly contract health audit** — which contracts are
   growing, shrinking, or at risk

## The contract types this skill manages

| Type | Frequency | Margin pattern | Renewal cycle |
|---|---|---|---|
| Residential weekly | Weekly | Highest margin per visit; lowest per hour after a year (customer expects more) | Monthly auto-renew |
| Residential fortnightly | Fortnightly | Steady margin; most common contract type | 12-month auto-renew |
| Residential monthly | Monthly | Lower margin per visit but stable customer | 12-month auto-renew |
| Commercial nightly | Mon-Fri or 5-night weeks | Stable margin; predictable hours; key to scaling | 12-month auto-renew with 60-day notice |
| Commercial weekly | Once/twice weekly | Margin per visit higher than nightly; less predictable | 12-month auto-renew |
| Strata / common areas | Monthly or fortnightly | Steady; building manager relationship key | 12-month auto-renew |
| STR per-turnover | Per turnover (varies — 4-20+/month) | High margin per turn; volume dependent | Month-to-month |
| NDIS recurring | Per plan schedule | Stable; NDIS Price Guide rate; admin overhead | Per plan cycle, often annual |

## Step 1 — Set up the contract (after acceptance from
`03-quote-project.md`)

When onboarding a new recurring contract:

1. **Generate the formal contract** (per
   `templates/maintenance-contract.md`)
2. **Set up direct debit / Net 30 invoicing** (per
   `06-invoice-payment.md`)
3. **Lock 12 months of visit dates** in the calendar
4. **Assign primary + backup crew**
5. **Pre-load supplies** (specifically chems matched to the
   customer's preferences — eco / standard / fragrance-free)
6. **Add to the contract health register**

```
CONTRACT REGISTRY — ACTIVE
============================
Contract #:      MC-[YYYYMM]-[N]
Customer:        [name + property]
Type:            [Residential fortnightly / Commercial nightly /
                  STR per-turn / etc.]
Start date:      [date]
Initial term:    12 months
Renewal target:  [auto-renew anniversary date]
Visit cadence:   [pattern — e.g. fortnightly Wed mornings]
Per-visit:       $[X]
Annual value:    $[X]
Crew assigned:   [primary + backup]
Payment method:  [direct debit / Net 30 / Stripe per visit]
Chems:           [eco / standard / fragrance-free / stone-safe]
Access:          [lockbox / smart-lock / key / owner present]
Photo evidence:  [Y/N — mid-clean kitchen for residential,
                  full pack for bond / commercial / STR]
Margin target:   $[X]/hr realised
Margin actual (rolling 3 mo): $[X]/hr
Health flag:     [Green / Yellow / Red]
Renewal status:  [Auto-renewing / 60 days notice from / customer
                  notice received]
```

## Step 2 — The recurring conversion machine (the biggest lever)

After every one-off — bond, deep, post-build, move-in — trigger
the recurring conversion offer in Day-3 follow-up
(`11-followup-reviews.md`):

```
SMS — Day-3 recurring conversion offer:

Hi [first name] — [your name] from [Business name]. Glad the
[one-off type, e.g. "deep clean"] worked out.

Quick offer: if you'd like a regular cleaner coming in, we
can do a fortnightly clean of your place for $[X] per visit.
(About 1.5-2 hrs, 1 cleaner, every other [day of week].)

First fortnightly visit free if you sign up this month —
worth ~$[Y] to you, then it's the standard $[X]/visit after.

Reply YES and I'll send you a sample contract + book the
first visit.

— [your name]
```

Then track:
- How many conversion offers sent
- How many converted
- Conversion rate by source (bond cleans convert at ~15-25%
  in most regions; deep cleans at 30%+)
- Common reasons for "no" (price, renting, just want one-off,
  embarrassed about cleaner seeing the place regularly)
- Common reasons for "yes" (hated the time it took to clean
  themselves, hated cleaning the bathroom most, already had a
  cleaner and we were better)

Update `learnings.md` each week. The single biggest growth
lever for any cleaning business is this conversion rate.

## Step 3 — The 12-month visit calendar

For each active contract, lock 12 months of visits:

```
CONTRACT CALENDAR — [Customer]
================================
[Day, date] [time] — Visit 1 — Crew: [name] — Notes: [first
                                                       visit,
                                                       extended
                                                       30 min
                                                       for
                                                       walk-through]
[Day, date] [time] — Visit 2 — Crew: [name]
[Day, date] [time] — Visit 3 — Crew: [name]
...
[Day, date] [time] — Visit 26 — Crew: [name] — Notes: anniversary
                                                       review +
                                                       price
                                                       escalation
                                                       60-day
                                                       notice
```

Per BUSINESS CONFIG → Scheduling tool, push these to the
calendar / FSM tool.

Auto-trigger each visit through `04-dispatch.md` on the
visit-day morning.

## Step 4 — Reminder cycle

For each active contract visit:

- **48 hrs before visit:** Day-before SMS reminder:
  ```
  Hi [name] — just confirming your fortnightly clean tomorrow,
  [date, time]. Crew lead: [name]. Anything we should know
  about (new pet, no-access area, etc.)? Reply OK to confirm.

  — [your name]
  ```

- **Morning of visit:** On-the-way SMS from
  `04-dispatch.md`

- **Visit-day evening (if photo evidence enabled):** Receipt +
  any flags found

## Step 5 — Scope creep watch

For each recurring contract, the agent watches for:

- **Time creep** — actual time per visit climbing above quoted
  (e.g. customer added a second bathroom in renovation, or
  picked up a dog and now there's pet hair to vac everywhere)
- **Task creep** — customer adding requests outside the
  contracted scope ("can you also clean the outdoor furniture",
  "can you do the windows this week", "can you fold the
  laundry")
- **Pet creep** — got a puppy / cat / second dog = significantly
  more time on vac + chems
- **Surface creep** — added a new stone bench → different chems
  needed; new carpet → vacuum pattern changes
- **Frequency change request** — customer wants weekly instead
  of fortnightly (positive — upsell) OR monthly instead of
  fortnightly (negative — investigate the why)

Surface to operator:

> *"Scope creep flag — [Customer] fortnightly contract: last
> 3 visits averaged 3.2hrs vs contracted 2.5hrs. New dog
> arrived 6 weeks ago (per cleaner notes). Recommend either
> (a) increase per-visit rate to $[X], (b) decrease scope
> (drop blinds rotation), or (c) leave it (customer is high
> NPS, leave the goodwill). Your call."*

Operator decides — agent doesn't unilaterally change pricing.

## Step 6 — Margin per contract (the quarterly audit)

Every quarter, the agent computes per-contract margin:

```
CONTRACT MARGIN AUDIT — Q[N] [Year]
====================================
Customer            | Visits | Revenue   | Hours | $/hr  | Margin trend
[A] Smith fort.     | 6      | $870      | 13.5  | $64   | ↑ steady
[B] Jones weekly    | 13     | $1,560    | 22.0  | $71   | ↑ improving
[C] ABC Office nightly | 65 | $6,175    | 88.0  | $70   | ↘ declining (cleaner slowing)
[D] XYZ STR (3 props) | 32   | $3,840   | 38.0  | $101  | ↑↑ winning
[E] Brown month.    | 3      | $360      | 7.0   | $51   | ↘ thin — investigate
[F] Park strata     | 3      | $1,200    | 12.0  | $100  | ↑ winning
```

Health flags:
- **Green** ($/hr above target) — keep going, push renewal
- **Yellow** ($/hr within 15% of target) — investigate the
  drift; usually scope creep, chem switch, or slower crew
- **Red** ($/hr below 85% of target for 2+ quarters) — the
  conversation — either re-price at renewal or end the
  contract (with grace — recommend partner cleaner)

The agent surfaces Yellow + Red flags to the operator at the
quarterly audit:

> *"Q[N] audit:
> - 6 contracts Green (well above target)
> - 2 Yellow (Smith fort. drifting -8%, ABC Office nightly -12%)
> - 1 Red (Brown month. at $51/hr vs $75 target — 9 months
>   running)
>
> Brown recommendation: at next visit, walk through with
> customer. If scope can be trimmed (drop the laundry fold, drop
> the optional internal windows), re-quote at $X. If not, give
> 30-days notice — politely — and refer to [partner business]
> for a lower-rate replacement."*

## Step 7 — Annual price escalation (CPI + 1.5%)

For each contract, the agent triggers the annual escalation
process 60-90 days before anniversary:

- **90 days out (residential): Generate the escalation notice**
- **60 days out (commercial): Generate the escalation notice**

```
SUBJECT: Annual price review — [Customer], [Business name]

Hi [name],

Quick heads-up — your annual price review is coming up on
[anniversary date], in line with the contract.

Last 12 months at $[old per-visit]:
- [N] visits delivered
- [X] hours total
- $[total revenue]
- [Y] issues flagged + resolved

From [anniversary date], the per-visit rate will be $[new] —
that's [+X.X%], in line with CPI + 1.5% (chems + crew wages
both up 4-6% over the year).

If you'd rather adjust the scope to keep the per-visit price
the same (e.g. drop one of the optional rotation items, or go
monthly instead of fortnightly), happy to chat through
options.

Otherwise, no action needed from you — the new rate kicks in
on [date] and the next direct debit reflects it.

Thanks for the work over the year.

— [your name]
[Business name]
```

If the customer doesn't reply, the rate adjusts on the
anniversary. If they push back, surface to operator — operator
decides whether to hold (loses customer goodwill on inflation
acceptance) or absorb (small per-visit loss for retained
contract).

Track in `learnings.md`:
- % of contracts that accepted the standard escalation
- % that pushed back + amount of escalation absorbed
- % that terminated (rare — usually retention if escalation is
  transparent and reasonable)

## Step 8 — 72-hour bond callback flow

If a property manager flags a bond clean within 72 hrs of
completion, the agent runs this recovery:

```
INTERNAL FLAG — bond callback for [Customer]:

Original clean: [date]
Customer notice received: [date + time — within 72-hr window]
Items flagged by property manager: [list — e.g. "oven not
                                     cleaned to RTA standard",
                                     "skirting in bedroom 2
                                     missed"]

Action:
1. Pull photo evidence pack from original clean
2. Match against flagged items — were they clean in our
   photos?
3. If YES (our photos show clean):
   - Show the photo pack to the property manager (politely)
   - Offer to attend free either way (good faith)
4. If NO or unclear:
   - Schedule re-clean within 48 hrs
   - Same crew or different (per operator decision)
   - Free of charge, no exceptions
   - Bring extra chems for the flagged items
   - Photo evidence pack of the re-clean
5. After re-clean: SMS customer + property manager
```

Customer-facing reply:

```
Hi [name] — got your message about the bond clean. Couple of
quick things:

1. Photo pack from [date] shows [list items as cleaned in
   photos] — I can resend if helpful.
2. Either way — we attend free of charge to re-clean any item
   the property manager flagged. When works for the property
   manager? Could do [tomorrow morning] or [day after].
3. Photo pack of the re-clean comes through within 30 mins of
   finishing.

— [your name]
```

For the property manager:

```
Hi [agent name] — got the bond clean flag for [property].

We attend free of charge to re-clean within the 72-hour
guarantee. Available [tomorrow morning] or [day after] — let
me know what fits your re-inspection schedule.

Attached: the time-stamped photo pack from the original clean
(in case it's helpful for any of the items you've flagged).

— [your name], [Business name]
```

Track in `learnings.md`:
- Bond callback rate (target: <5% of bond cleans)
- Most common flagged items (informs the bond clean checklist
  + the supplies pre-load)
- Pickiest property managers (quote bond cleans for these with
  +30% time buffer; flag for extra-detail photo evidence)

## Step 9 — Customer health checks (recurring)

For each recurring contract, the agent runs a customer health
check quarterly:

```
CUSTOMER HEALTH — [Customer]
=============================
Active contract:      [type, $/visit, since]
Visits last 90 days:  [N — vs scheduled X]
Cancellations:        [N — log reasons]
Complaints:           [N — log + resolution]
Reviews left:         [N + ratings]
Direct debit health:  [N successful / N failed]
Margin trend:         [↑ ↘ ↑↑]
Scope creep flagged:  [Y/N + detail]
Renewal due:          [date]
Renewal sentiment:    [Likely renew / At risk / Likely
                        terminate]

ACTION
- [Suggest specific action — e.g. "send the quarterly
  relationship touch + the discount nudge on add-on services"]
- [or "schedule a 5-min call with the customer to check
  satisfaction"]
- [or "no action — green, on track"]
```

The agent surfaces at-risk contracts to operator weekly.

## Step 10 — STR contract specifics

STR turnover contracts have unique dynamics — book volume
varies massively, hosts have multiple properties, and
turnover quality directly affects host reviews on Airbnb.

For each STR host, the agent maintains:

- **Calendar share** (Airbnb / Stayz / VRBO iCal feed) — auto-
  detects turnovers
- **Property profile per property** (bed count, linen
  inventory, restock SKUs, access method, special host
  preferences)
- **Last 30 days turnover stats** (count, on-time %, photo pack
  delivery time, items flagged to host)
- **Multi-property bundling opportunity** — if a host gets 4+
  properties, propose a multi-property bundle quote

Cross-pair with the Airbnb Host Agent bundle: if the host is
running the Airbnb Host Agent bundle on the other side, the
two agents can swap structured data (next turnover, restock
SKUs, guest checkout signals). This is optional but the
turnover skill is structured to make it easy.

## Step 11 — Commercial nightly contract management

Commercial nightly contracts run on rhythm. The agent:

- **Monitors visit completion 5 nights/week** (sign-off via
  alarm + ServiceM8 / Jobber / CleanTelligent push)
- **Monthly facility manager report** (per
  `06-invoice-payment.md` invoice covers)
- **Quarterly walk-through** with facility manager (the agent
  schedules + drafts the agenda)
- **Issue log** — items flagged each visit go to the monthly
  report ("WC 2 soap dispenser broken — flagged [date],
  repaired by your team [date]")
- **Holiday + closure handling** — Christmas closure, public
  holidays, fire drills — agent adjusts schedule + confirms
  with facility manager

For commercial, the customer relationship is the contract. The
facility manager who likes you renews the contract. The agent
maintains a quarterly touchpoint:

```
QUARTERLY FACILITY MANAGER TOUCHPOINT — [Customer]

Hi [name] — quick 15-min walk-through next [day]? Want to:
1. Walk a sample of areas + check standards
2. Cover the issue log from the quarter
3. Talk about anything coming up (Christmas, refit, expansion)
4. Get your feedback — anything to adjust on the contract?

Available [day, time 1] or [day, time 2].

— [your name]
```

## Step 12 — NDIS contract management

NDIS recurring contracts run on the participant's plan cycle
(usually 12 months). The agent:

- **Monitors plan funded hours used vs available** — flags
  the operator at 80% to discuss continuation
- **Coordinates with plan manager** for invoice + payment
  cycle
- **Quarterly check-in with participant** (or their nominee /
  guardian if relevant) — satisfaction + any plan changes
- **Plan review cycle awareness** — when the participant's
  plan comes up for review (annual), proactive renewal
  discussion 60 days out
- **NDIS Code of Conduct** — ongoing — flag if anything
  observed needs escalation

## Hard rules

- **Lock 12 months ahead.** Recurring work that's only
  "planned for later" doesn't happen.
- **Never skip the visit because the customer says "everything's
  fine."** Skipping breaks the rhythm; once they cancel one,
  they cancel three.
- **Photo evidence pattern matches the contract.** Bond /
  commercial / STR — full pack every visit. Residential
  recurring — optional mid-clean kitchen shot (lifts review
  velocity).
- **Annual escalation is non-negotiable.** CPI + 1.5%. Notify
  60-90 days out. Customers respect transparency.
- **72-hour bond guarantee is honoured EVERY TIME.** No
  arguments, even if photos show our work was clean. Free
  re-clean preserves reputation.
- **Recurring conversion offer goes out after EVERY one-off.**
  No exceptions. This is the biggest growth lever.
- **Margin audit quarterly.** Yellow + Red flags surface to
  operator.
- **Complaint recovery is free.** Always. Cost-of-recovery <
  cost-of-lost-contract.
- **Don't unilaterally change pricing or scope** — surface
  to operator, operator decides.

## Reading the learnings.md

Track on recurring contracts:
- Renewal rate (target: 90%+)
- Average recurring revenue per contract per year
- Recurring conversion rate from one-offs (target: 25%+)
- Bond callback rate (target: <5%)
- Margin trend per contract
- Pickiest property managers (informs bond clean prep)
- Customer satisfaction signal (asked at renewal)
- Which contracts have grown vs shrunk on extras

## Confirm + handoff

> *"Recurring management this week: [N visits delivered,
> M contracts renewed, K escalation notices sent, L
> conversion offers sent, X bond callbacks attended].
> Quarterly audit shows [N green, M yellow, K red — surfaced
> for your review]. Next visit due tomorrow morning for
> [Customer]."*
