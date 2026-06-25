---
name: builder-weekly-report
description: End-of-week WIP + cash position report. Active projects, stages reached, progress claims raised vs paid, subbie ageing, materials orders outstanding, council / certifier engagement, defects open, pipeline. Updates learnings.md. Brief next week's priorities. The single most important admin moment of a builder's week.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Weekly report — WIP, cash position, pipeline

## Your job

Close out the working week with a tight, honest report. Builders
don't run on a "transactions per day" rhythm like tradies — they
run on Work-In-Progress (WIP) + cash position. The weekly report
is the snapshot.

Pull what actually happened. Update `learnings.md` with the
patterns. Brief next week. The whole thing should take 15-20
minutes for the user to review and approve.

## Run this skill

- Friday afternoon (default)
- Or whatever day the operator chooses (some builders prefer
  Sunday evening so Monday starts with the plan)

## Step 1 — Pull the week's data

From conversation context + project records, aggregate:

```
WEEK ENDING [date]
==================

ACTIVE PROJECTS WIP TABLE
| Project          | Stage    | Started   | PC target | % complete | Contract $ | Claimed $ | Paid $ | Variance |
|---|---|---|---|---|---|---|---|---|
| [Smith reno]    | Lock-up  | [date]    | [date]    | 65%        | $185,000   | $120,250  | $108,000 | -$12,250 |
| [Jones extension]| Frame    | [date]    | [date]    | 40%        | $295,000   | $118,000  | $118,000 | $0       |
| [O'Brien new build] | Slab | [date]    | [date]    | 15%        | $620,000   | $93,000   | $93,000  | $0       |
| [Lee kitchen]   | Fix-out  | [date]    | [date]    | 80%        | $48,000    | $38,400   | $33,600  | -$4,800  |

CONTRACT-VALUE TOTALS
- Active contracts:         $[X] (4 projects)
- Claimed to date:          $[X]
- Paid to date:             $[X]
- Outstanding (in chase):   $[X] — ageing breakdown below

CASH POSITION
- Bank balance:                         $[X]
- Receivables (claims outstanding):     $[X]
  - 0-7 days:  $[X] ([X] claims)
  - 8-14 days: $[X] ([X] claims)
  - 15-30 days:$[X] ([X] claims) — chase tighten
  - 30+ days:  $[X] ([X] claims) — escalate
- Payables (subbies + suppliers due):   $[X]
  - 0-14 days due:  $[X]
  - 14-30 days due: $[X]
  - 30+ days (your own ageing — pay these): $[X]
- Net position (receivables - payables): $[X]

CLAIMS RAISED THIS WEEK
| Project | Stage | Claim # | Amount | Status |
|---|---|---|---|---|
| [Smith] | Frame | INV-202506-12 | $44,400 | SENT [date] |
| [Lee]   | Fix-out | INV-202506-13 | $9,600  | SENT [date] |

CLAIMS PAID THIS WEEK
| Project | Claim # | Amount | Method | Date |
|---|---|---|---|---|
| [Jones] | INV-202506-09 | $33,000 | Stripe | [date] |
| [Smith] | INV-202506-10 | $18,500 | EFT | [date] |

VARIATIONS THIS WEEK
| Project | V# | Scope | $ | Status |
|---|---|---|---|---|
| [Jones] | V-3 | Replace rotted south sill (demo find) | $1,800 | SIGNED |
| [Smith] | V-2 | Upgrade tapware to client selection | $1,038 | SIGNED |
| [O'Brien] | V-1 | Asbestos contractor engagement | $3,800 | DRAFTED, awaiting sign |

NEW ENQUIRIES (LEADS)
- Total new enquiries:       [count]
- By source:
  - Architect: [count] — [which architects]
  - Past client referral: [count]
  - GBP message: [count]
  - Houzz: [count]
  - HiPages / Checkatrade / Angi: [count]
  - Website form: [count]
  - Cold: [count]

QUOTES
- Quotes sent (small-job): [count] — total potential $[X]
- Quotes sent (project):   [count] — total potential $[X]
- Site visits done:        [count]
- Concept letters sent:    [count]
- Quotes accepted:         [count] — total contract value won $[X]
- Quotes declined / lost:  [count] — reasons logged
- Average quote turnaround: [days]

SUBBIE + SUPPLIER ACTIVITY
- Subbies on site this week: [count]
- Subbie no-shows:           [count] — [names, projects]
- Subbie invoices received:  [count] — $[X] total
- Subbie invoices approved:  [count] — $[X] paid out
- Subbie defects held back:  [count, $] (holding 10% on pending defects)
- Material orders placed:    [count] — $[X] total
- Material orders delivered: [count]
- Material orders LATE:      [count] — flag patterns

COUNCIL / CERTIFIER / INSPECTIONS
- Inspections booked:    [count, dates]
- Inspections passed:    [count]
- Inspections failed:    [count] — [reasons, projects]
- DA / Building Consent / Permit submissions: [count]
- DA / Building Consent / Permit approvals received: [count]
- DA / Permit RFIs:      [count]

REVIEWS
- New reviews this week: [count]
- Average rating:        [4.X]
- Week +3 review asks sent: [count]
- Review conversion (Day-X asks → actual reviews this month): [%]

ARCHITECT TOUCHES
- A-list architect catch-ups done: [count, names]
- Architect catch-ups overdue:     [count, names — schedule next
                                    week]
- Architect new referrals received: [count]

DEFECTS / WARRANTY
- Defects raised this week:        [count] — [projects]
- Defects rectified:              [count]
- Open defects (in defects period): [count] — [list, projects]
- 11-month sweeps due in next 60 days: [count] — [projects]
- Retention releases due in next 60 days: [count, $]

EMERGENCY / SITE INCIDENT
- Site incidents this week:        [count]
- Insurance claims lodged:         [count]
- Council orders:                  [count]
- Subbie no-show critical path:    [count]

PIPELINE (looking forward)
- Quotes outstanding (project):    [count] — $[X] potential
- Site visits booked next week:    [count]
- Quotes in concept stage:         [count] — $[X] potential
- Contracts ready to sign:         [count] — $[X]
- Active project stages reaching PC in next 60 days: [count]

LICENCE + INSURANCE STATUS
- Builder licence expiry:         [date — flag if <60 days]
- Public liability renewal:       [date]
- Construction Works renewal:     [date]
- Workers comp renewal:           [date]
- Home Warranty Insurance status: [active / per-project basis]
- Member subscriptions: HIA/MBA/FMB/NAHB/CHBA — current
```

## Step 2 — Score the week

In one paragraph, rate the week against goals from BUSINESS CONFIG:

```
WEEK SCORECARD
- Revenue billed:    $[X] vs target $[Y] = [✓ / borderline / 🚩 below]
- Cash collected:    $[X] vs target $[Y] = [...]
- Active project count: [N] vs target [M] = [...]
- New project contracts won: [N] vs target [M] = [...]
- New leads (project): [N] vs target [M] = [...]
- Outstanding receivables 30+ days: [$X] — target $0 = [...]
- Reviews earned: [N] vs target [≥1/handed-over project] = [...]
```

## Step 3 — Surface the urgent items

The most important section of the report. Anything the operator
needs to act on Monday morning:

```
URGENT FOR NEXT WEEK
- 🚩 [O'Brien project]: Variation V-1 (asbestos) drafted — client
   hasn't signed. Demo of affected zone can't proceed until
   signed. Phone client Monday.
- 🚩 [Smith project]: Frame inspection booked Tuesday 10am. Need
   to confirm with certifier Monday + ensure engineer's drawings
   on site.
- 🚩 Receivables: [Jones] INV-202506-11 ($33,000) overdue 8 days.
   Phone call from operator Monday.
- ⚠ [Lee kitchen]: tile delivery promised Wed — supplier hasn't
   confirmed final dispatch. Phone supplier Monday AM.
- ⚠ Architect [name]: last contact 6 weeks ago. Catch-up overdue
   — draft below.
- ⚠ [Hartley project — past handover]: 11-month sweep due 4 weeks.
   Book the visit + draft client invitation.

GOOD NEWS (worth noting)
- [Project X] passed slab inspection first round — best one this
   year, certifier called it out
- [Architect Y] referred 2 new projects this week
- [Client Z] left a 5-star review mentioning "process + clarity"
```

## Step 4 — Update learnings.md

For each section of `config/learnings-template.md`:

- **Project types by ROI** — recompute from this week's data and
  update the rolling 12-month average
- **Subbie reliability** — log no-shows, defects, exceptional
  performance
- **Suppliers** — log late deliveries, stockouts, exceptional
  service
- **Quote → contract conversion** — update by source and by
  project type
- **Lead sources** — update mix + conversion
- **Architects** — update referral velocity + conversion + last
  contact dates
- **What's lifting margin (keep doing)** — add this week's wins
- **What's hurting margin (stop doing)** — add this week's drags
- **Variations + PC items** — patterns of overspend / sign-off
  discipline
- **Subbie management patterns** — no-show rate, best/worst days
- **Council / certifier patterns** — RFI reasons, processing time
- **Cash flow patterns** — payment days, slowest client types
- **Defects + warranty patterns** — top defects, sweep
  conversion to repeat
- **No-show / lost-quote reasons** — log each
- **Reviews — what clients say** — extract praised + criticised
  themes
- **Open experiments** — close completed, log results
- **Banned, refined** — any phrases/tactics that backfired

Show the updated `learnings.md` to the operator in a fenced block.
Ask:

> *"Updated learnings — anything I read wrong, or anything you'd
> change before this rolls into next week?"*

## Step 5 — Brief next week

Once `learnings.md` is signed off, write a one-page brief for next
week:

```
NEXT WEEK BRIEF — week of [date]

ON SITE
| Project | Stage | Days on site | Subbies in | Materials due |
|---|---|---|---|---|
| [Smith] | Frame inspect Tue; lock-up start Wed | Mon-Fri | Framer, sparky rough-in Thu | Bi-fold doors arriving Mon |
| [Jones] | Fix-out | Mon-Fri | Plasterer, plumber fit-off | Tile due Wed (supplier confirm Mon) |
| [O'Brien] | Asbestos hold | varies | None until cleared | Asbestos contractor — variation needed before |
| [Lee] | PC week | Mon-Wed | Painter Mon-Tue, final clean Wed | Final tapware Mon |

ENQUIRIES TO ACTION
- [Lead 1] — site visit booked Wed PM
- [Lead 2] — concept letter due Friday
- [Lead 3] — tender response due [date]

ARCHITECT TOUCHES
- [Architect A] — coffee booked Tue 10am
- [Architect B] — overdue catch-up — draft sent Mon
- [Architect C] — send project photos + thanks for the referral

DEFECTS + SWEEPS DUE
- [Project from 11 months ago] — 11-month sweep visit booked [date]
- [Defect open on Project X] — sparky returning Tue

ADMIN
- [Builder licence renewal — if within 60 days]
- [Public liability renewal — if within 90 days]
- [Receivables chase: 3 calls scheduled]
- [Subbie payment run: Thursday]
- [GBP + Houzz weekly post — drafts attached]
- [Council DA submission for [project]: due [date]]

CRITICAL-PATH DECISIONS NEEDED FROM YOU
- [E.g. PC selection sign-off needed by [date] for [project]
   to avoid pushing tile install]
- [E.g. variation V-1 sign-off needed for [O'Brien project]
   to proceed with demo]
- [E.g. accept tender invitation from [Architect]? Yes/no by
   Friday]

LEARNING THIS WEEK
[1-2 sentence reflection on the biggest pattern / pivot from
the week's data. E.g.: "Two architect-referred leads this week
both came from [architect name]'s recent project completing —
worth doubling down on the post-handover photo + thank-you to
that architect. Booked the catch-up for Tuesday."]
```

## Step 6 — Send to operator + (optionally) accountant

The full report goes to the operator. The financial summary
section optionally goes to the accountant / bookkeeper (Xero /
MYOB / QuickBooks import or just an email).

For multi-staff builders, a summary version goes to the project
manager / leading hand on each project.

## Hard rules

- **Don't invent numbers.** If something's missing (e.g. supplier
  invoice not received yet), flag it for the operator to fill
  in.
- **Cash position never softened.** Negative cash = surface it.
  "Tight this week" is not a euphemism for "we can't pay subbies."
- **Don't overfit.** One week is signal, not a verdict. Three
  weeks of the same pattern is signal worth acting on.
- **Honest about flops.** "Underquoted Hartley extension —
  galvanised plumbing added 3 days, ate $4,800" beats "had a
  tough week."
- **Flag licence + insurance renewals early.** Builder licence,
  PL insurance, Home Warranty, workers comp — anything within
  60-90 days of expiry surfaces here. Lapsed licence + active
  contracts = legal exposure.
- **Receivables ageing surfaces every week.** Don't let 30+ days
  hide.
- **Subbie payments surface every week.** Subbies paid late are
  subbies who don't show up next time.
- **No emoji unless BUSINESS CONFIG asks for it.**

## Confirm + handoff

> *"Week closed. Report ready for review — sending now? Once you
> sign off, learnings.md is locked for next week, and I'll start
> Monday with the queued urgent items."*

After sign-off, archive the report (e.g. `/reports/2026-w25.md`)
and load Monday's project + enquiry queue.
