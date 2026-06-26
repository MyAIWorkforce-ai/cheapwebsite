# Recurring contract quote template

For recurring contracts — weekly / fortnightly / monthly
residential, commercial nightly / weekly, STR per-turnover.
The agent fills this in from BUSINESS CONFIG + site walk +
`03-quote-project.md` logic.

```
RECURRING CONTRACT QUOTE — [Customer]
=======================================
Date:               [date]
Quote #:            Q-[YYYYMM]-[N]
Valid for:          30 days from issue
Customer:           [name]
Phone:              [phone]
Property address:   [address]
Contract type:      [Residential weekly / Fortnightly / Monthly
                      / Commercial nightly / Commercial weekly /
                      Strata / STR per-turnover / NDIS recurring]
Site walk:          [done — date / not required for residential]

1. SCOPE PER VISIT

[Plain-English checklist — what we do every visit]
- [Item 1]
- [Item 2]
- ...

ROTATION ITEMS (cycled across visits so deep stuff stays
current)
- Visit 1: blinds dust
- Visit 2: light fittings
- Visit 3: skirting boards detail
- Visit 4: internal windows
- ...

NOT INCLUDED in standard recurring:
- [List clearly — oven deep, carpet steam, external windows,
  outdoor, decluttering, anything else]

2. FREQUENCY + SCHEDULE

| Item            | Detail                                  |
|---|---|
| Frequency       | [Weekly / Fortnightly / Monthly / Nightly] |
| Day(s)          | [e.g. Wednesday]                        |
| Time window     | [e.g. 9-11am — tighter ETA morning of] |
| Crew            | [1 cleaner / 2 cleaners]                |
| Visit duration  | [e.g. 2.5 hrs]                          |
| Visit count/yr  | [52 / 26 / 12 / 252 nightly]            |

3. PRICING

| Item                              | Amount      |
|---|---|
| Per-visit rate                    | $[X]        |
| Annual cost                       | $[X]        |
| Tax                               | [included / + tax] |

For commercial:
| Item                              | Amount      |
|---|---|
| Per-visit rate                    | $[X]        |
| Monthly                           | $[X]        |
| Annual                            | $[X]        |
| Tax                               | + [tax label] |

4. PAYMENT TERMS

For residential recurring:
- Direct debit on visit-day (recommended — never a missed
  payment)
- Setup link: [GoCardless UK / Stripe PayTo AU / Stripe ACH US]
- Or pay by Stripe link on each invoice
- Or EFT within 7 days of each invoice

For commercial:
- Net 30 from monthly invoice date
- Direct debit available (1% discount on monthly if signed up)
- Stripe / EFT / direct debit per BUSINESS CONFIG

For STR per-turnover:
- Monthly statement on the 1st covering prior month
- Net 7
- Direct debit / Stripe link

5. AUTO-RENEW + PRICE ESCALATION

- Initial term: 12 months
- Auto-renews each anniversary unless [30 days residential /
  60 days commercial / 14 days STR] notice from either side
- Annual price review on anniversary: CPI + 1.5%
  (typical: 4-6% per year given current inflation + chem +
  wage cost increases)
- We notify you [60 days residential / 90 days commercial / 30
  days STR] before any escalation
- Notice is informational only — no action required unless
  you'd like to adjust scope to hold the price

6. TERMINATION

- Notice period: [30 days residential / 60 days commercial /
  14 days STR] either side, any reason
- No exit fee
- Direct debit cancels with notice
- Final clean / final turn included in final invoice

7. WHAT'S GUARANTEED

- Same crew where possible (consistency = better quality)
- 24-hour re-clean guarantee — anything missed, we come back
  within 24 hrs at no extra charge
- All cleaners hold current police check + [WWCC / NDIS / DBS
  as applicable]
- Public liability $[X]
- [Worker comp / employer's liability] active
- [BICSc / CIMS-GB cert held — if applicable]
- Same chem range every visit (so you know what's on your
  surfaces — eco / standard / fragrance-free, your choice)
- [Photo evidence per visit — for commercial / STR / where
  customer requests it]

8. KEY / ACCESS

| Method | Detail |
|---|---|
| Lockbox | code held by lead cleaner + rotated quarterly |
| Smart-lock | code rotated [monthly STR / quarterly resi /
              quarterly commercial] |
| Key | physical key held by lead, signed in/out, locked van
       between jobs |
| Owner present | [time confirmed before each visit] |
| Neighbour | [contact details] |

LOST KEY POLICY
If we lose a key, we cover the re-key at our cost (covered by
public liability).

9. WHAT WE NEED FROM YOU

- A consistent access method (above)
- Heads up at least [24h residential / 7 days commercial / 24h
  STR] before any visit you need to reschedule. Otherwise
  late-cancel rates apply (50% for >12h notice, 100% for
  same-day no-show).
- Tell us about new pets, new family members, surface changes
  (new stone bench needs different chems)
- Refer cleaners we should know about (e.g. eco preference,
  fragrance sensitivity, where chems should NOT go)

10. SCHEDULED REVIEW

- 90-day satisfaction touch (after first 90 days)
- Quarterly health check
- Annual on-site walk-through (commercial) / sit-down review
  (residential)
- Price review at anniversary

Reply "go ahead" + we'll send the direct debit / contract sign
link + book the first visit.

Thanks,
[your name]
[Business name]
[ABN / VAT / EIN]
[Public liability + insurer]
[Phone] · [Email]
```

## Commercial nightly specific extras

For commercial nightly contracts, ADD these sections:

```
3a. STAFF + CREW

- Lead cleaner: [name — your facility manager will meet at
  setup]
- Backup cleaner: [name]
- Police check: all crew current
- COSHH / SDS folder on-vehicle + at site (UK mandatory; AU/
  US/CA best practice)

3b. ALARM + KEY HOLDER

- We become key holder for [building entry / suite entry]
- Alarm code held by named lead cleaners only (no shared codes)
- Code rotated quarterly + after any cleaner departure
- Key sign-in / sign-out every visit
- Alarm sign-in / sign-out time-stamped + on report
- Lost key = re-key at our cost (public liability covers)

3c. SUPPLIES (consumables — paper, soap, bin liners)

Pick one model:
- [a] You supply, we re-stock from your supply
- [b] We supply, cost + 20% on monthly invoice (specify brand
  range)
- [c] We coordinate ordering from your preferred supplier on
  your account

3d. REPORTING

- After each visit: time-stamped sign-off in
  [ServiceM8 / Jobber / CleanTelligent / Janitorial Manager /
   Swept] — viewable by your facility manager
- Monthly: 1-page report — visits completed, hours, issues
  found, supplies low, schedule for next month
- Quarterly: on-site walk-through with your facility manager
- Annual: contract review + renewal

3e. ADDITIONAL SERVICES (quoted separately)

- Carpet steam clean (quarterly) — $[X]
- External windows (monthly / quarterly) — $[X]
- Floor strip + seal (annual — hard floors only) — $[X]
- Deep kitchen (semi-annual — includes oven, dishwasher
  inside) — $[X]
- Hard floor scrub + buff (quarterly) — $[X]
```

## STR turnover contract specifics

For STR turnover contracts, REPLACE sections 1-4 with:

```
1. WHAT EVERY TURNOVER INCLUDES

- Strip + remake all beds (linens — see section 4)
- Bathrooms: shower screen, tiles, toilet, basin, mirror,
  full restock (towels, toiletries)
- Kitchen: dishwasher empty + restock, fresh tea-towels,
  benches, sink, fridge wipe + check for left items, oven
  check (clean if needed)
- Living areas: vacuum, mop, cushion fluff, throw fold,
  remote check, lighting check
- Bedrooms: bed-make to standard, vacuum, surface dust, bin
  empty
- Floors: hard floor mop, carpet vacuum
- Outdoor area: sweep, bin check
- Restocks: [see section 5]
- Window snapshot + photo evidence pack to host (see
  section 6)

2. FREQUENCY

- Estimated turnovers / month: [N]
- Window between checkout + check-in: [e.g. 11am-3pm]
- Standard turn duration: [e.g. 1.5-2 hrs for 1-2 bed]
- Crew: [1 cleaner standard for 1-2 bed; 2 for 3+ bed]

3. CALENDAR INTEGRATION

- Share your iCal feed (Airbnb / Stayz / VRBO) with us — we
  auto-detect turnovers
- We confirm each turn 24h before
- Late guest checkout (more than 30 min): we wait 30 min free,
  then $[X]/30 min OR reschedule

4. LINENS

Pick one:
- [a] Host supplies on-site, we strip + remake from your stock
- [b] We collect soiled, take to laundry [name], return clean
  next turn ($[X]/turn for handling + laundry pass-through)
- [c] We supply linens from our pool (extra $[X]/turn, full
  service)

5. RESTOCKS

Per-turn at cost + 15%:
- Coffee pods [brand]: [qty]
- Tea bags: [qty]
- Sugar sachets: [qty]
- Hand soap refill: [if low]
- Dish soap refill: [if low]
- Toilet paper: [qty rolls]
- Paper towels: [qty rolls]
- Bin liners: [qty]
- [Optional add-ons per host preference]

6. PHOTO EVIDENCE PACK (every turnover)

Sent to host within 30 mins of finishing:
- Every room: wide finished shot
- Beds: close shot
- Bathrooms: shower, toilet, basin shots
- Kitchen: benches + fridge inside shot
- Living: wide shot
- Outdoor (if applicable)
- Any damage / left items: separate close shot + 1-line note

7. PRICING

| Item                                       | Amount    |
|---|---|
| Standard per-turn (1-2 bed)                | $[X]      |
| Standard per-turn (3+ bed)                 | $[X]      |
| Deep turn (between long stays, monthly)    | $[X]      |
| Restocks                                   | cost + 15% |
| Linen handling (if option b/c)             | $[X]      |
| Late-notice turn (<24 hrs)                 | +25%      |
| Same-day turn (<6 hrs)                     | +50%      |
| Holiday turn (public holiday)              | +25%      |

8. PAYMENT

- Monthly statement on the 1st covering prior month's turns
- Net 7
- Stripe link / EFT / GoCardless DD

9. TERMINATION

- Month-to-month (STR business needs flex)
- 14 days notice either side
- No exit fee

10. WHEN THINGS GO WRONG

- Guest left damage: we photo, flag within 10 mins, you handle
  the Airbnb / Stayz / VRBO damage claim
- Items left by guests: bag + label + leave in property; you
  arrange collection
- Linen / restock running short: we flag; you reorder
- Linen damage by us: we replace at our cost
- Late checkout: 30 min free, then $[X]/30 min OR reschedule

Reply "go ahead" + share your iCal link + we book the first
turn.

[your name]
[Business name]
```

## Hard rules (across all variants)

- **Always quote per-visit AND annual.** Customers think
  per-visit; you think annual; both numbers should appear.
- **Always include auto-renew + escalation clause.**
- **Always include termination clause.** Easy exit = easier
  sale.
- **Commercial: 60-day notice both directions + 90-day
  escalation notice.**
- **STR: month-to-month + 14-day notice.**
- **Residential: 30-day notice + 60-day escalation notice.**
- **NDIS: per plan cycle + plan funding-based renewal.**
- **Always specify the chem range** for residential (eco /
  standard / fragrance-free / stone-safe).
- **Always specify key / access protocol** + lost-key policy.
- **Photo evidence terms explicit per contract type.**
- **Always reference Worker Screening / DBS / WWCC current
  status** in compliance section.
- **NDIS quotes MUST cite NDIS price guide item code** —
  never fabricate.
