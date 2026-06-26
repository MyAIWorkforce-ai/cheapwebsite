# learnings.md

The running log of what works and what doesn't for *this* STR
hosting business. Updated every Friday by `12-weekly-report.md`.
Read by every later skill so the agent gets sharper, not just
faster.

```
LEARNINGS — <Business name>
===========================
Updated: <YYYY-MM-DD>

## Per-property scorecard (last 4 weeks)
| Property                | Occ % | ADR   | RevPAR | Rev    | Reviews | Verdict |
|---|---|---|---|---|---|---|
| Battery Point Cottage   | 87%   | $215  | $187   | $5,234 | 4.94 (3)| Win — push  |
| Sandy Bay Studio        | 72%   | $145  | $104   | $2,912 | 4.81 (2)| Steady      |
| Hobart CBD Apartment    | 58%   | $185  | $107   | $2,996 | 4.72 (1)| Push more   |

(Industry benchmark: typical solo Airbnb host runs 60-70% occupancy
in season, 30-50% off-season. RevPAR varies hugely by region —
PriceLabs market dashboard or AirDNA gives the local comparison.)

## Channel mix per property (last 4 weeks)
| Property      | Airbnb % | VRBO % | Booking % | Direct % | Verdict |
|---|---|---|---|---|---|
| Battery Point | 78%      | 8%     | 14%       | 0%       | Diversify direct |
| Sandy Bay     | 92%      | 0%     | 8%        | 0%       | Heavy Airbnb risk |
| Hobart CBD    | 60%      | 5%     | 30%       | 5%       | Booking pulling weight |

## Quote → booking conversion (direct off-platform only)
- Standard 1-7 night: <%> (target 60%)
- 7-14 night:        <%> (target 50%)
- 28+ night MTR:     <%> (target 35% — qualified lead pool)
- Corporate block:   <%> (target 25%)
- Avg quote turnaround: <mins> (target <60 mins to maintain Superhost
                                 response rate)

## Guest types (segmented from Airbnb / VRBO / Booking metadata)
- Family with kids:        <stays>, <avg margin>, <review avg>
- Couple weekend:          <stays>, <avg margin>, <review avg>
- Solo traveller:          <stays>, <avg margin>, <review avg>
- Business / MTR:          <stays>, <avg margin>, <review avg>
- Group / friends weekend: <stays>, <avg margin>, <review avg> (party risk!)
- Local guest (<50km from listing): <stays>, <party flag rate>
- New account (no reviews):<stays>, <issue rate>

## What's lifting RevPAR (keep doing)
- "<specific tactic e.g. raising minimum stay to 2 nights on Fri/Sat
   eliminated single-night party bookings — cleaning cost down,
   review score up>"
- "<e.g. listing-photo refresh on Hobart CBD lifted CTR 18% per
   Airbnb insights>"
- ...

## What's hurting RevPAR (stop doing)
- "<specific issue e.g. accepting Booking.com Genius discount on
   Sandy Bay — net after commission was below Airbnb base, but
   Booking guests left the lower review scores>"
- "<e.g. NoiseAware threshold at 75dB was too lenient — three
   noise events resulted in complaints; tightened to 68dB>"
- ...

## Pricing patterns
- Best-performing day-of-week to raise: <Saturday — typical +25% absorbs>
- Worst day-of-week to discount: <Sunday — discount converts to
   Monday-night bookings that lose to short-stay cleaning eff.>
- Last-minute fill conversion: <% within 7 days lead time>
- Lead time distribution:    <avg days from booking to check-in,
                              per property>
- PriceLabs vs realised ADR: <delta — too high suggests min-rate
                              guardrail too low / vice versa>

## Review patterns
- Most-praised words (last 4 weeks):
  - "<e.g. 'spotless', 'great communication', 'best Airbnb we've
     stayed in', 'check-in was so easy', 'wifi was fast'>"
- Most-criticised (resolve before they pattern):
  - "<e.g. 'shower pressure low' (need to flush rainwater filter),
     'parking unclear' (needs photo in arrival pack),
     'bed too soft' (Sandy Bay — replace mattress topper)>"
- Day-7 review-request response rate: <% of guests who leave a
                                       review after the ask>
- Avg time from review-request to review: <hrs>
- Channel review score deltas:
  - Airbnb avg:    <4.X>
  - VRBO avg:      <4.X>
  - Booking avg:   <4.X — typically lower; Booking guests skew tougher>
  - Direct review (Google/website): <4.X>

## Turnover patterns
- Avg turnover time:     <hrs from checkout to "all clear">
- Cleaner on-time rate:  <% of turnovers ready by check-in window>
- Linen rotation health: <% of stays starting with fresh laundered linen>
- Maintenance issues found at turnover (last 4 weeks):
  - <e.g. "Battery Point — broken cupboard handle, 4 May; replaced
     7 May"; "Sandy Bay — shower curtain replaced, 12 May">
- Cost-per-turnover trend: <$ avg, up/down/flat>

## House-rule violations (last 4 weeks)
- Parties / noise sensor triggered: <count, by property>
- Smoking detected: <count, by property — Aircover / damage claims filed?>
- Unauthorized guests / overcap: <count, charge applied?>
- Pets without approval: <count, fee applied?>
- Late check-out: <count, fee applied?>

## Damage / Aircover / channel resolution claims
- Claims filed (last 4 weeks): <count>
- Total claim $:    <$>
- Total recovered:  <$>
- Avg resolution time: <days>
- Pattern: <e.g. "two missing-towel claims via Aircover — added
            'towels can be replaced for $25 each' to welcome pack
            soft-warning">

## Maintenance patterns (per property)
- Smoke alarm test cycle: <last tested, next due>
- HVAC filter cycle:   <last changed, next due>
- Gutter clean:        <last done, next due>
- Annual safety:       <last completed, next due>
- Insurance renewal:   <annual date>
- STR registration renewal: <annual date — flag 60 days out>

## Supply patterns
- Linens replacement cycle: <last replaced, expected life>
- Toiletry consumption: <bottles/stay average — refill cycle>
- Coffee / consumable cost per stay: <$>
- Replacement budget actual vs. budgeted: <$, % over/under>

## Channel-fee tracking
- Airbnb host-only fee avg: <% — should be 15%; flag if higher>
- Booking.com commission paid: <% — Genius vs base>
- VRBO subscription / per-booking: <$ for the period>
- Direct booking Stripe fee total: <$ — avg 3% effective>
- Net after commission ÷ gross: <%>

## Regulatory compliance status
- STR registration: <current / expiring [date] / EXPIRED>
- Lodging tax filings: <up to date / pending>
- Insurance: <current / expiring [date] / GAP IDENTIFIED>
- Smoke alarm / safety: <last tested>
- HOA / strata / body corp: <complaints received / status>

## Open experiments
- [ ] <e.g. "Testing $25 higher Saturday rate on Battery Point —
       week 2 of 4">
- [ ] <e.g. "Trialling 2-night minimum on all Friday/Saturday across
       the portfolio to filter party risk — week 1 of 4">
- [ ] <e.g. "A/B testing two cover photos on Sandy Bay Studio per
       Airbnb's listing-photo experiments">
- [ ] <e.g. "Offering 20% direct-booking discount on repeat guests
       via the day-after-checkout email">

## Banned, refined
(phrases / tactics added to the banned list because they backfired)
- "<word or phrase>"
- "<tactic — e.g. 'silently raised cleaning fee +$10 mid-quarter —
   guest reviews mentioned 'expensive cleaning fee' three times in
   four reviews; rolled back>"
```

## How to use it

Every quote, every reply, every weekly report: the agent reads this
file FIRST and uses it before generic best-practice. If "Battery
Point Cottage" is in the Win column, the agent leans into pushing
that property's listing. If "Sandy Bay Studio" has a channel-mix
risk (92% Airbnb), the agent surfaces it in the next quote +
suggests cross-listing. If shower pressure is in the criticised
column, the agent reminds the operator to flush the rainwater filter
before the next stay.

Every Friday: `12-weekly-report.md` updates this file with the
week's data.
