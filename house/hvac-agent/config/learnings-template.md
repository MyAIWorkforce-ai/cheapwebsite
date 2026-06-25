# learnings.md

The running log of what works and what doesn't for *this* HVAC
business. Updated every Friday by `12-weekly-report.md`. Read by every
later skill so the agent gets sharper, not just faster.

```
LEARNINGS — <Business name>
===========================
Updated: <YYYY-MM-DD>

## Job types by ROI (last 4 weeks)
| Job type                | Jobs | Avg revenue | Avg hours | $/hr  | Verdict     |
|---|---|---|---|---|---|
| Split changeout (7kW)   | 5    | $4,200      | 5.0       | $840  | Win — push  |
| Ducted reverse-cycle    | 1    | $14,800     | 28.0      | $529  | Push more   |
| Capacitor / contactor   | 9    | $310        | 1.0       | $310  | Steady      |
| Coil clean (condenser)  | 6    | $280        | 1.25      | $224  | Margin OK   |
| Annual service (split)  | 18   | $295        | 1.0       | $295  | Plan revenue|
| Leak detect + repair    | 4    | $720        | 3.5       | $206  | Margin thin |
| Drain pan + condensate  | 7    | $230        | 0.75      | $307  | Steady      |
| Heatwave no-cool callout| 11   | $620        | 1.5       | $413  | Win — push  |
| Thermostat upgrade      | 3    | $480        | 1.5       | $320  | Steady      |
| RTU change-out (light commercial)| 1 | $9,800   | 12.0      | $817  | Win — chase |

## Service plan attach (THE number to watch)
- New installs (last 4 weeks):       <X> — <Y> attached to service plan = <Z%>
  (target: 60%+)
- New callouts (last 4 weeks):       <X> — <Y> attached to service plan = <Z%>
  (target: 30%+)
- Active service plans on book:      <count> — annual recurring revenue $<X>
- Service plan attach by tech:       <if multi-tech, surface who's better at the ask>
- Renewal rate (last 12 months):     <%> (target: 85%+)

## Suburbs by drive-time ROI
- <suburb>: <jobs/week>, <avg drive time>, <verdict>
- ...

## Quote → booking conversion
- Callout quotes:        <%> (target: 70% — higher than plumbing/electrical because
                              HVAC breakdowns are urgent)
- Project quotes (split): <%> (target: 40%)
- Project quotes (ducted): <%> (target: 30% — bigger ticket, slower decision)
- Heat pump retrofit:    <%> (target: 35% — growing category, decision varies by region
                               and grant availability)
- Quote turnaround:      <avg minutes> (target: <30 mins; <15 in heatwave)

## Customer types
- Homeowner (own home):     <jobs>, <avg margin>, <service plan attach %>
- Landlord / property mgr:  <jobs>, <avg margin>, <service plan attach %>
- Real estate agent (managed): <jobs>, <avg margin> (often slow-pay)
- Builder (new construction):<jobs>, <avg margin>
- Commercial repeat:        <jobs>, <avg margin>, <recurring contract value>
- Strata / body corp:       <jobs>, <avg margin>
- Hospitality (cafe/restaurant — RTU): <jobs>, <avg margin>

## What's lifting margin (keep doing)
- "<specific tactic e.g. quoting split changeouts as a package with annual service plan
   included for year 1 — moves both numbers, customer feels like better value>"
- ...

## What's hurting margin (stop doing)
- "<specific issue e.g. underquoting first-floor split installs — the cherry-picker
   hire is $450 we never budget>"
- "<e.g. taking on R410A retrofit jobs in older systems without confirming line set
   integrity first — half need re-running and we eat the labour>"
- ...

## Seasonal patterns (HVAC-specific — pay close attention)
- Heatwave conversion rate (declared heatwave days):    <%> vs normal <%>
- Heatwave avg revenue per breakdown:                   $<X> vs normal $<Y>
- First cold snap of season — heat failure callouts:    <pattern, by region>
- Pre-summer tune-up campaign signups:                  <count, conversion>
- Pre-winter heating campaign signups:                  <count, conversion>
- Capacity issues (turned away):                        <count, when, what type>
- Shoulder season install conversion rate:              <%>

## After-hours patterns
- Avg calls/week (shoulder):     <n>
- Avg calls/week (peak summer):  <n>
- Conversion rate after-hours:   <%>
- Highest-margin emergency type: <e.g. heatwave no-cool with vulnerable occupant —
                                  they will pay anything>
- "Vulnerable occupant" callouts: <count> — these need priority dispatch

## Supplier patterns
- Avg parts margin:        <%>
- Lead time issues:        <which suppliers slow — e.g. "Beijer Daikin 7kW split
                            chronic 5-day wait Nov-Jan; pre-buy Sep">
- Frequent stockouts:      <items to keep in van — e.g. "R32 9kg cylinder always
                            out at Actrol northern branch by mid-Dec; backstock 4">
- Lead time on commercial RTU: <weeks — affects quote validity periods>

## Equipment performance by brand (track for next quote)
- Daikin: <reliability notes, customer satisfaction signal>
- Mitsubishi Electric: <...>
- Fujitsu: <...>
- Carrier / Lennox / Trane: <...>
- Hitachi / Panasonic / LG / Samsung: <...>
- Bosch / Vaillant heat pumps: <...>
- Surface any that fail-in-warranty more than expected — affects which brand
  you recommend at quote stage

## Refrigerant patterns
- R32 used (last 4 weeks):     <kg>
- R410A used (recovery + recharge): <kg>
- R454B used (new):            <kg> — track as it grows
- R134a used (older):          <kg>
- Leak detection conversion to full repair: <%> (target: 90%+)
- Customers who pushed for "top-up only" and we declined: <count> — what they did
- Lost jobs to competitors who would top-up illegally: <count> — surface this trend

## No-show / cancellation reasons (last 4 weeks)
- "Got a cheaper quote" × <count>
- "Decided to live without AC" × <count> (seasonal — affects winter especially)
- "Tenant cancelled — landlord didn't respond" × <count>
- "AC came back on by itself" (intermittent fault — explain at intake) × <count>
- "Wrong address" × <count>
→ Action: <e.g. for intermittent faults — quote diagnostic-only callout with credit
           if escalated to full repair within 14 days>

## Reviews — what customers say
- Most-praised:  <e.g. "explained why the capacitor blew",
                  "left the roof access cleaner than he found it",
                  "showed up in a heatwave when 3 others said no">
- Most-criticised: <e.g. "took longer than quoted",
                    "didn't follow up on the strange smell that came back">
→ Action: <e.g. quote ducted installs with +half-day buffer for unexpected
           ductwork repairs; add "any aftercare odour" Day-1 check explicit>

## Open experiments
- [ ] <e.g. testing $30 higher heatwave callout fee — week 2 of 4>
- [ ] <e.g. trialling pre-summer tune-up at $189 (down from $295) to lift attach —
       week 1 of 4>
- [ ] <e.g. offering same-day capacitor swap if confirmed before 11am during
       heatwave — measure conversion uplift>
- [ ] <e.g. bundling smart thermostat at $150 into service plans as upsell>

## Service plan revenue trajectory (THE strategic number)
- Q1 plan revenue:    $<X> (<count> active)
- Q2 plan revenue:    $<X> (<count> active)
- Q3 plan revenue:    $<X> (<count> active)
- Q4 plan revenue:    $<X> (<count> active)
- Year-on-year growth: <%>
→ At 200 active plans × $295 = $59k annual recurring + rectification work on top.
   Doubles to $118k at 400 plans. This is the moat.

## Banned, refined
(phrases / tactics added to the banned list because they backfired)
- "<word or phrase>"
- "<tactic — e.g. 'free quote' on ducted installs; brought in shoppers who
   never converted; switch to '$150 site assessment, credited if you book'>"
```

## How to use it

Every quote, every reply, every weekly report: the agent reads this
file FIRST and uses it before generic best-practice. If "Split
changeout (7kW)" is in the Win column, the quote skill leans into
pushing that job type. If "Leak detect + repair" is margin thin, the
agent quotes those firmer at the upper end of the range and surfaces
the option of a full system replacement if the unit is over 10 years
old (often better economics).

Every Friday: `12-weekly-report.md` updates this file with the week's
data.
