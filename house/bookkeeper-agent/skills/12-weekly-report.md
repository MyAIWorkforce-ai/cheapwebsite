---
name: bookkeeper-weekly-report
description: End-of-week firm report. WIP by client, hours by partner / senior / junior, receivables aging, capacity vs commitments, BAS calendar for next 90 days, monthly recurring revenue, package attach rate, lodgement on-time rate. Updates learnings.md with the week's signal. Brief next week's focus. This is the firm-level view that lets the principal manage the practice rather than be managed by it.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Weekly report — WIP, capacity, receivables, lodgement calendar

## Your job

Close out the working week with a tight, honest firm-wide report.
Pull what actually happened across every client. Update
`learnings.md` with the patterns. Brief next week. The whole
thing should take 15 minutes for the principal to review and
approve.

## Run this skill

- Friday afternoon (default for most practices)
- Or the principal's preferred end-of-week time
- Mid-week pulse if the firm is over-committed or has emergency
  events

## Step 1 — Pull the week's data

From conversation context (+ Karbon / Ignition / Xero data where
connected), aggregate:

```
WEEK ENDING [date]
==================

NEW PROSPECTS
- Total prospects:                            [count]
- By source:
  - Accountant referral:                      [count]
  - Existing client referral:                 [count]
  - Financial planner referral:               [count]
  - Business coach referral:                  [count]
  - ICB / IPA / AAT / NACPB / CPB directory:  [count]
  - GBP message:                              [count]
  - LinkedIn outbound (replied):              [count]
  - Website form:                             [count]
  - Cold inbound:                             [count]
  - Other:                                    [count]
- Quotes drafted this week:                   [count]
- Quotes accepted this week:                  [count]
- Average days from prospect → engagement:    [days]

QUOTES OUTSTANDING
- One-off quotes pending reply (>5 days):     [count, total $]
- Monthly package quotes pending reply (>5 days): [count, total
                                                    $/mo]

CLIENT WORK COMPLETED
- Month-end closes completed:                 [count]
- BAS / VAT / 941 / GST/HST lodged:            [count]
- EOFY / EOY packs delivered:                 [count]
- Catch-up projects completed:                [count]
- Other one-off project deliverables:         [count]

REVENUE THIS WEEK
- Recurring fees DD'd (in advance):           $[X]
- Lodgement fees invoiced (Tier 1):           $[X]
- Project / catch-up milestone billing:       $[X]
- Total billed this week:                     $[X]

MRR + ARR
- MRR start of week:                          $[X]
- MRR end of week:                            $[X]
- Net change:                                 $[X] ([up/down])
  - Tier upgrades:                            [count, +$/mo]
  - Tier downgrades:                          [count, -$/mo]
  - New monthly engagements:                  [count, +$/mo]
  - Disengagements:                           [count, -$/mo]
- Annualised RR:                              $[X]

HOURS BY ROLE
| Role             | Billable | Non-billable | Total | Util % |
|---|---|---|---|---|
| Partner          | [hrs]    | [hrs]        | [hrs] | [%]    |
| Senior bookkeeper| [hrs]    | [hrs]        | [hrs] | [%]    |
| Junior bookkeeper| [hrs]    | [hrs]        | [hrs] | [%]    |
| Admin / ops      | -        | [hrs]        | [hrs] | -      |
| **Firm total**   | [hrs]    | [hrs]        | [hrs] | [%]    |

Target util: 65-75% billable for senior; 75-85% for junior; 50-60%
for partner (admin + advisory + lead-gen consume the rest).

CAPACITY NEXT WEEK
- Hours available across firm:                [hrs]
- Hours committed (scheduled work):           [hrs]
- Buffer:                                     [hrs] ([%])
- Status:                                     [Healthy / Tight /
                                                Over-committed]

LODGEMENT CALENDAR — NEXT 30 DAYS
| Due date  | Client            | Lodgement     | Status        |
|---|---|---|---|
| 28 Aug    | Smith Plumbing    | BAS Q4 FY25   | Prep complete; awaiting partner sign-off |
| 28 Aug    | Café Lavender     | BAS Q4 FY25   | Prep in progress, on track |
| 31 Aug    | Studio One        | BAS Q4 FY25   | Prep in progress, on track |
| 7 Sep     | Acme Consulting   | VAT Q4 24-25  | Prep complete; awaiting client sign-off |
| 15 Sep    | Sole-Trader Co    | STP final     | Setup; first run |
| ...       |                   |               |               |

URGENT THIS COMING WEEK (within 7 days)
- [Client]: [Lodgement / Action] — [Status]

LODGEMENT CALENDAR — NEXT 90 DAYS
[Same table, condensed; surface any lodgements with risk]

RECEIVABLES AGING
| Bucket          | Count | Total $     | Verdict       |
|---|---|---|---|
| Current (≤7)    | [n]   | $[X]        | OK            |
| 8-30 days       | [n]   | $[X]        | OK            |
| 31-60 days      | [n]   | $[X]        | Chase         |
| 61-90 days      | [n]   | $[X]        | URGENT        |
| >90 days        | [n]   | $[X]        | EXIT review   |
| **TOTAL**       | [n]   | $[X]        |               |

Days Sales Outstanding (DSO): [X] days (target: ≤30 non-DD; ≤2 DD)

DD attach rate: [X]% (target: 90%+)
DD failure rate this week: [X]% (target: ≤3%)

REVIEW + REFERRAL FLOW
- Day-7 review asks sent:                     [count]
- New reviews received:                       [count, avg rating]
- Day-90 relationship touches sent:           [count]
- Annual review meetings held:                [count]
- Tier upgrades at annual review this week:   [count]
- Referrals received from accountant partners: [count]
- Referrals received from existing clients:   [count]
- LinkedIn outbound messages sent:            [count]

PACKAGE ATTACH RATE
- New clients this week starting on monthly:  [count]
- New clients on one-off only:                [count]
- Monthly attach rate (rolling 90 days):      [%] (target: 70%+)
- T2 → T3 upgrade rate (rolling 90 days):     [%] (target: 25%+)
- T3 → T4 upgrade rate (rolling 90 days):     [%] (target: 15%+)

EMERGENCIES + DEADLINE-RESCUES
- ATO / HMRC / IRS / CRA letters received:    [count]
- Audits / formal investigations:             [count]
- Missed lodgements (firm-side):              [count] (TARGET: 0)
- Payroll emergencies:                        [count]
- Data / file emergencies:                    [count]
- Disengagement letters issued:               [count]

CLIENT HEALTH DASHBOARD (top 20 clients by MRR)
| Client            | Tier | MRR  | DD ok? | Docs on time? | Lodgement on time? | Last touch | Status |
|---|---|---|---|---|---|---|---|
| FinPlan Co        | T4   | $2.4k| ✓      | ✓             | ✓                 | 2 days ago | A      |
| Acme Consulting   | T3   | $980 | ✓      | ✓             | ✓                 | 1 day ago  | A      |
| Café Lavender     | T3   | $980 | ⚠      | ⚠ docs 5d late | risk             | 7 days ago | B → C? |
| Smith Plumbing    | T2   | $480 | ✓      | ✓             | ✓                 | 4 days ago | A      |
| Shopify Co        | T3   | $1.2k| ✓      | ✓             | ✓                 | 3 days ago | A      |
| ...               |      |      |        |               |                   |            |        |

Action: [list any clients flagging to B or C tier — need
        intervention]

COMPLIANCE
- AML/CTF reviews due this month:             [list]
- Professional registration renewals due:     [list — TPB / HMRC
                                                AML / AAT / ICB /
                                                NACPB / CPB]
- Insurance renewal due:                      [date]
- Software subscription renewals:             [list with cost]
- Continuing Professional Development (CPD)
  hours logged this week:                     [hrs]
  YTD vs annual requirement:                  [progress]
```

## Step 2 — Score the week

In one paragraph, rate the week against goals from BUSINESS
CONFIG:

```
WEEK SCORECARD
- Revenue billed:        $[X] vs target $[Y]  [✓ / borderline / 🚩]
- New monthly engagements: [count] vs target [n]  [...]
- MRR change:            +$[X] vs target +$[Y]  [...]
- Lodgement on-time:     [%] vs target 100%   [...]
- Annual review held:    [count] vs target [n] [...]
- Receivables aging
  >30 days:              $[X] vs target ≤$[Y]  [...]
- Tier upgrade conversations: [count] vs target [n]
- New reviews:           [count] vs target ≥1/wk [...]
- Hours billable %:      [%] vs target [Y%]    [...]
```

## Step 3 — Update learnings.md

For each section of `config/learnings-template.md`:

- **Service tiers by ROI** — recompute from this quarter's data
- **Industries by margin + retention** — update rolling 12 months
- **Client tiering update** — flag any client moving A → B or B
  → C (or vice versa)
- **Quote → engagement conversion** — update by type + source
- **Source of new clients** — update by channel
- **What's lifting margin (keep doing)** — add this week's wins
- **What's hurting margin (stop doing)** — add this week's drags
- **Source-doc patterns** — chase escalation rate; Hubdoc usage
  shift
- **BAS / VAT lodgement patterns** — on-time rate; ATO/HMRC
  variance enquiries received
- **Payroll patterns** — STP on-time; edge cases logged
- **Customer types** — margins per type
- **Annual review meeting outcomes** — tier changes; price
  refresh
- **Receivables velocity** — DSO trend; DD attach
- **Software stack patterns** — time-sinks identified
- **Referral partner outreach** — accountant touches; referral
  count by partner
- **Reviews — what clients say** — extract praised + criticised
  themes
- **Open experiments** — close completed, log results
- **Banned, refined** — any phrases / tactics that backfired

Show the updated `learnings.md` to the principal in a fenced
block. Ask:

> *"Updated learnings — anything I read wrong, or anything you'd
> change before this rolls into next week?"*

## Step 4 — Brief next week

Once `learnings.md` is signed off, write a one-page brief for next
week:

```
NEXT WEEK BRIEF — week of [date]

LEAN INTO:
- [Job type / approach that hit this week — e.g. "Catch-up
   quotes converting at 80% with the convert-to-monthly lead-in —
   keep using"]
- [Customer type that converted well]
- [Lead source that converted above target]
- [Annual review meetings to leverage upcoming]

PULL BACK FROM:
- [Approach that flopped — e.g. "T3 add-on payroll for
   eComm clients with multi-currency under-delivered — need to
   re-quote at higher fee or decline"]
- [Source that's bringing wrong-fit leads — e.g. "ICB
   directory leads converted 1/5 this quarter; pause time on
   directory polishing"]

TEST (one new thing):
- [E.g. trial offering a free 15-min CFO-lite scoping
   call to Tier 3 clients hitting 2-year mark — measure
   conversion uplift — week 1 of 4]
- [E.g. trial fortnightly receivables review instead of weekly
   — see if DSO holds — week 1 of 4]

ON THE CALENDAR
- [Lodgement deadlines next week]
- [Annual review meetings booked]
- [New onboarding kicks-off]
- [Prospect calls + scoping sessions]

URGENT ACTIONS (partner-only)
- [E.g. "Approve disengagement letter for [Client] — 96 days
   overdue, two ignored chases"]
- [E.g. "Call [Client] who's flagged for B→C — engagement
   stress signal"]
- [E.g. "Review draft engagement letter for [new client] before
   Monday send"]

PIPELINE TO CHASE
- [Prospect A] — quote sent [date], no reply (Tier 3 monthly,
   $980/mo)
- [Prospect B] — quote accepted, awaiting engagement letter
   sign
- [Prospect C] — scoping session held, formal proposal due
   Friday

REFERRAL PARTNER ACTIONS
- [Accountant 1] — quarterly note due (last sent [date])
- [Accountant 2] — coffee invite due (no referrals in 4 months)
- [LinkedIn outbound — 15 messages to draft + send]

COMPLIANCE / ADMIN
- [Lodgements next week]
- [AML / CTF reviews this month]
- [Registration renewals within 60 days]
- [CPD log update — [N] hours required by [date]]
- [Insurance renewal in [N days]]

LEARNINGS TO REINFORCE
- [Specific thing from this week's update — e.g. "Tier 3 with
   payroll is generating $/hr 30% above plain Tier 3; push T3
   upgrades on monthly clients with employee growth"]
```

## Step 5 — Send to principal + (optionally) team

The full report goes to the principal. The summary section may
go to the team (juniors + seniors) per practice culture. Per
BUSINESS CONFIG → preferred format.

For multi-partner firms, the report runs by partner book + a
firm-wide rollup.

## Hard rules

- **Don't invent numbers.** If something's missing (e.g. timesheet
  not yet completed by junior), flag it for the principal to fill.
- **Don't overfit.** One week is signal, not a verdict. Three
  weeks of the same pattern is signal worth acting on.
- **Honest about flops.** "Underquoted [Client] catch-up by 20% —
  data was messier than diagnostic suggested. Recovered $/hr to
  $95 (target $120). Will tighten diagnostic next time" beats
  "had a tough week".
- **Flag registration renewals early.** TPB / HMRC AML / AAT /
  ICB / NACPB / CPB / insurance — anything within 60 days of
  expiry surfaces here. Lapsed = no work.
- **CPD hours tracked weekly.** ICB / IPA / AAT / ICB / NACPB / CPB
  all have annual minimums. Track during the year, don't scramble
  in the last month.
- **Lodgement on-time = 100% target.** Anything less is a
  reportable event for the firm.
- **Capacity buffer >10% next week.** If under, decline or defer
  new work.
- **Tier upgrade conversations counted.** Even ones that didn't
  convert. The data feeds learnings.

## Reading the learnings.md

Track on the firm itself:

- MRR trend (rising = healthy)
- Average client LTV (rising = retention strong)
- Tier mix shift (more Tier 3 / 4 = practice maturing)
- DSO + DD attach (financial health of the firm itself)
- Lodgement on-time rate (regulatory + reputation)
- Partner billable utilisation (50-60% with 40-50% advisory /
  lead-gen / firm work)
- Junior promotion-ready signals (skills + revenue)

## Confirm + handoff

> *"Week closed. Report ready for review — sending now? Once you
> sign off, learnings.md is locked for next week, and I'll start
> Monday with the queued prospects + sweep + lodgement
> deadlines."*

After sign-off, archive the report (e.g.
`/reports/2026-w25-firm.md`) and load Monday's intake + sweep
queue.

## Quarterly + annual report variants

Beyond the weekly report:

- **Quarterly firm report** (end of each quarter) — same structure
  + tier mix shift, partner P&L if relevant, accountant referrer
  league table
- **Annual firm report** (end of FY) — full retrospective + next
  FY plan + price refresh strategy + capacity plan

These are generated by the agent from the rolling weekly data.
