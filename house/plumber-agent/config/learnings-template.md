# learnings.md

The running log of what works and what doesn't for *this* plumbing
business. Updated every Friday by `12-weekly-report.md`. Read by every
later skill so the agent gets sharper, not just faster.

```
LEARNINGS — <Business name>
===========================
Updated: <YYYY-MM-DD>

## Job types by ROI (last 4 weeks)
| Job type             | Jobs | Avg revenue | Avg hours | $/hr  | Verdict     |
|---|---|---|---|---|---|
| Hot water swap (gas) | 4    | $2,800      | 4.5       | $622  | Win — push  |
| Blocked drain (jetter)| 8   | $420        | 1.5       | $280  | Steady      |
| Leaking tap / cartridge| 11 | $185        | 0.75      | $247  | Margin OK   |
| Burst pipe (after-hours)| 3 | $680        | 1.5       | $453  | Win — push  |
| Bathroom reno        | 1    | $9,400      | 28.0      | $336  | Push more   |
| Toilet install       | 5    | $550        | 1.5       | $367  | Steady      |
| Drain camera + locate| 6    | $380        | 1.0       | $380  | Steady      |
| Sewer line excavation| 1    | $4,200      | 14.0      | $300  | Margin thin |
| Gas cooktop install  | 2    | $480        | 2.0       | $240  | Margin thin |

## Suburbs by drive-time ROI
- <suburb>: <jobs/week>, <avg drive time>, <verdict>
- ...

## Quote → booking conversion
- Callout quotes:   <%> (target: 60%)
- Project quotes:   <%> (target: 35%)
- Hot water swap:   <%> (target: 50% — high-intent buyers)
- Quote turnaround: <avg minutes> (target: <30 mins)

## Customer types
- Homeowner (own home):     <jobs>, <avg margin>
- Landlord / property mgr:  <jobs>, <avg margin>
- Real estate agent (managed): <jobs>, <avg margin> (often slow-pay)
- Builder (subbie):         <jobs>, <avg margin>
- Commercial repeat:        <jobs>, <avg margin>
- Body corp / strata:       <jobs>, <avg margin>

## What's lifting margin (keep doing)
- "<specific tactic e.g. quoting hot water replacement same-day,
   including cylinder swap-out + tundish + isolation valve install
   in one fixed price — wins over the 'we'll need to come back to
   look' competitors>"
- ...

## What's hurting margin (stop doing)
- "<specific issue e.g. underquoting older copper hot water swap-outs
   — the connections are always seized and add 45 mins>"
- "<e.g. taking on sewer line excavations without confirming utility
   locates first — 2 hours lost on the last one waiting for Dial
   Before You Dig>"
- ...

## After-hours patterns
- Avg calls/week:   <n>
- Conversion rate:  <%>
- Highest-margin emergency type: <e.g. burst pipes mid-winter — they
   pay anything to stop the leak>
- Hot water "no hot water in winter" calls: <count, conversion>

## Supplier patterns
- Avg parts margin:        <%>
- Lead time issues:        <which suppliers consistently slow — e.g.
                            "Reece flexible hoses chronic 1-week wait">
- Frequent stockouts:      <items to keep in van — e.g.
                            "Rheem 50L gas cylinder always out at
                            Tradelink northern branch on Mondays">

## Hot water replacement specifics
- Gas vs electric vs heat pump split: <%/%/%>
- Avg margin by type:               <$X / $X / $X>
- Customer questions that win the job:
  - "Will you take the old cylinder away?"
  - "Do I need to be home?"
  - "Will I have hot water tonight?"
  (Lead with answers to these in the quote.)

## Drainage patterns
- Blocked-drain conversion by suburb age:
  <e.g. pre-1970 suburbs: 90% of blockages are root intrusion
   → upsell CCTV + reline quote 40% of the time>
- Average jetter callout: <$X>
- CCTV-locate-then-reline conversion: <%>

## No-show / cancellation reasons (last 4 weeks)
- "Got a cheaper quote" × <count>
- "Decided to live with the drip" × <count>
- "Tenant cancelled — landlord didn't respond" × <count>
- "Wrong address" × <count>
→ Action: <e.g. confirm SMS 2hrs before, not 24hrs>

## Reviews — what customers say
- Most-praised:  <e.g. "explained why the toilet was rocking",
                  "left the bathroom cleaner than he found it",
                  "showed up when he said he would">
- Most-criticised: <e.g. "took longer than quoted",
                    "the chrome got scratched">
→ Action: <e.g. quote hot water swaps with +30 mins buffer;
           bring drop sheets every job>

## Open experiments
- [ ] <e.g. testing $20 higher callout fee for jobs west of the river
       — week 2 of 4>
- [ ] <e.g. trialling Checkatrade Sponsored listings — week 1 of 4>
- [ ] <e.g. offering same-day hot water swap if confirmed before 10am
       — measure conversion uplift>

## Banned, refined
(phrases / tactics added to the banned list because they backfired)
- "<word or phrase>"
- "<tactic — e.g. 'free quote' on hot water swaps; brought in
   shoppers who never converted; switch to 'fixed price, gauranteed'>"
```

## How to use it

Every quote, every reply, every weekly report: the agent reads this
file FIRST and uses it before generic best-practice. If "Hot water
swap (gas)" is in the Win column, the quote skill leans into pushing
that job type. If "Gas cooktop install" is margin thin, the agent
quotes those at the minimum charge floor and considers whether to
keep doing them at all.

Every Friday: `12-weekly-report.md` updates this file with the week's
data.
