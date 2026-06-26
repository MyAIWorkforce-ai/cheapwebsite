---
name: cleaner-quote-project
description: Generate a recurring contract quote — weekly / fortnightly / monthly residential, commercial nightly / weekly, STR per-turnover. Insist on a site visit for commercial. Itemise per-visit rate, frequency, scope per visit, exclusions, auto-renew, scheduled price escalation. Lock the spine of the business.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Recurring contract quote — the spine of the business

## Your job

Read the qualified lead. Decide whether the recurring contract
can be quoted from the description, or whether a site inspection
is essential. Then build an itemised contract the customer can
compare against other cleaners — without hiding anything.

This is the most important quote you generate. A recurring
fortnightly at $145/visit × 26 visits = $3,770/year/customer.
30 of those = $113,000/year baseline revenue. Smooths cash
flow. Reduces sales effort. Survives the slow weeks.

## When to insist on a site visit first

Always require a site visit (even just 30 mins) for:

- **Any commercial nightly contract** (offices, retail, gyms,
  medical) — sqm + WC count + special hazards + access route
  + alarm code + existing cleaner transition
- **Multi-storey or unusually large residential** (>4 beds, or
  steep stairs, or 2-storey with single cleaner)
- **STR contracts above 4 turnovers/month** at one address (gear
  up the laundry / linen pipeline, photo evidence workflow)
- **Recurring with allergic / sensory accommodations**
  (chem switch — eco-tier, fragrance-free, asthma-safe)
- **NDIS plan-managed recurring contracts** (need a service
  agreement matched to plan funding)

Site visit is its own callout — quote it at the standard
callout fee or first visit fee (per BUSINESS CONFIG). If they
sign the recurring contract after the visit, credit the visit
fee toward the first month.

## When you can quote without a site visit

- Standard 2-3 bed residential recurring (description + photos
  is enough)
- STR turnover for a host you already work with elsewhere
- Repeat work after the customer's been on a one-off (you've
  been before)
- Specialty recurring (window clean monthly, gutter clean
  6-monthly) — fits a published rate card

## The structure of a recurring contract quote

Every recurring quote has six sections:

```
1. Scope per visit (what you do every time — checklist + add-ons)
2. Frequency + visit schedule (weekly / fortnightly / monthly /
   nightly, day-of-week, time window, crew size)
3. Per-visit rate + annual total
4. Auto-renew + price escalation (CPI + 1-2% standard)
5. Termination clause (typically 30 days notice either side)
6. Exclusions (what triggers a separate quote)
```

## Quote template — RECURRING RESIDENTIAL (email)

```
Subject: Recurring clean proposal — [Customer], [N-bed at address]

Hi [name],

Here's the recurring clean proposal for [address]:

1. SCOPE PER VISIT
- Kitchen: surfaces wipe, sink scrub, stovetop, splashback,
  spot-clean cupboard fronts, bins emptied + relined
- Bathrooms: shower screen, tiles + grout (quick), toilet
  (inside + base), basin, mirror, exhaust vent dust
- Bedrooms: vacuum + mop (or vacuum carpets), light dust,
  bed-make if linens left out
- Living areas: vacuum, dust low surfaces + tables, cushion
  fluff, throw blanket fold
- Floors: hard floor mop, carpet vacuum
- Extras (annual rotation): blinds, light fittings, skirting
  boards, internal windows, fridge inside — one rotates each
  visit so the deep stuff stays current

NOT INCLUDED in standard recurring:
- Oven deep clean (separate $[X] when requested)
- Carpet steam (separate $[X]/room)
- Internal window full-detail (separate $[X])
- Outdoor / balcony / garage
- Decluttering / tidying personal items (we clean around,
  don't move)

2. FREQUENCY
- Frequency:     Weekly / Fortnightly / Monthly (pick one)
- Day:           [e.g. Wednesday mornings]
- Time window:   [e.g. 9am-11am — we'll text exact ETA the
                  morning of]
- Crew:          [1 or 2 cleaners — 2 is faster + better
                  cross-check]
- Visit duration: [e.g. 2.5 hrs — 1 cleaner / 1.5 hrs — 2 cleaners]
- Visit count per year: [52 / 26 / 12]

3. PRICING
- Per-visit rate:        $[X]
- Annual cost:           $[X] (= per-visit × visits/year)
- Tax:                   included in per-visit rate (specify
                          included / excluded per region)

4. PAYMENT
- Direct debit on visit-day (recommended — never a missed
  payment)
- Setup link:            [GoCardless UK / Stripe PayTo AU /
                           Stripe ACH US]
- Or pay by Stripe link on each invoice
- Or EFT within 7 days of each invoice

5. AUTO-RENEW + PRICE ESCALATION
- Initial term: 12 months
- Auto-renews each anniversary unless 30 days notice
- Annual price review on anniversary: CPI + 1.5%
  (typical: 4-6% per year given current inflation + chems
  + crew wages)
- We notify you 60 days before any escalation

6. TERMINATION
- 30 days notice either side, any reason
- No exit fee
- Direct debit cancels with notice

7. WHAT'S GUARANTEED
- Same crew where possible (consistency = better quality)
- 24-hour re-clean guarantee — if anything's missed, we come
  back within 24 hrs at no extra charge
- All cleaners hold police check + [WWCC if family home] +
  current public liability $[X]
- Same chem range every visit (so you know what's on your
  surfaces — eco / standard / fragrance-free, your call)

8. KEY / ACCESS
- Lockbox / smart-lock code / key under mat / owner present
  / neighbour holds key — confirm preferred method
- If we hold a key, it's signed in/out each visit and stays
  in a locked van between jobs

9. WHAT WE NEED FROM YOU
- A consistent access method (above)
- Heads up at least 24h before a visit if you need to
  reschedule (otherwise we charge 50% no-show; for cancels
  same-day we charge 100%)
- Tell us about new pets / new family members / surface
  changes (new stone bench needs different chems)

Reply "go ahead" + we'll send the direct debit / contract sign
link. First clean booked within the week.

Thanks,
[your name]
[Business name]
[Lic / cert # / ABN VAT EIN]
```

## Quote template — COMMERCIAL NIGHTLY CONTRACT

```
Subject: Nightly cleaning proposal — [Customer business name]

Hi [name],

Following the site walk [date], here's the nightly contract
proposal for [property + address]:

1. SCOPE PER NIGHTLY VISIT
- WCs (all): toilets, urinals, basins, mirrors, dispensers
  refilled (soap, paper, hand towel, sanitary), bins emptied
  + relined, hand-touch points sanitised, floor mopped
- Kitchens + tea points: benches wiped, sink scrubbed,
  bins emptied + relined, hand-touch points sanitised,
  dishwasher restocked if loaded by staff, floor mopped
- Open office areas: bins emptied + relined, desks wipe-down
  (NO touching paperwork), floor vacuum + spot-mop hard
  floor, glass doors spot-clean
- Meeting rooms: chairs pushed in, table wipe, whiteboard
  wipe (with permission), bin empty, floor vacuum / mop
- Reception + entry: high-touch sanitise (door handles, lift
  buttons), floor mop, glass front spot-clean
- Stairs + corridors: vacuum carpet, mop hard floor
- Lights off, alarm set, door locked on exit

WEEKLY / FORTNIGHTLY / MONTHLY ROTATIONS (one per visit night)
- Internal glass / partition clean
- Kitchen fridge wipe (community fridge — staff to label items)
- Skirting boards + door frames
- Vent grilles + air-con returns
- Carpet edges + tight corners (extension wand)

NOT INCLUDED in standard nightly:
- Carpet steam clean (quarterly — separate quote)
- External windows (separate)
- High dusting > 3m reach (need MEWP / ladder cert)
- Deep kitchen including oven / dishwasher disassembly
- Floor strip + seal (annual — separate)

2. FREQUENCY + SCHEDULE
- Nights covered: [e.g. Mon-Fri 6pm-onwards, post-staff
  departure]
- Time on site: [e.g. ~2 hrs avg — we sign in / out via
  alarm panel + send time-stamped report]
- Visits per month: [21 typically]
- Annual visit count: [252]

3. PRICING
- Per-visit rate:        $[X]
- Monthly:               $[X]
- Annual:                $[X]
- Tax:                   excluded ([region tax label] @ [%])

4. PAYMENT
- Net 30 terms (commercial standard)
- Monthly invoice on the 1st, due the 30th
- Direct debit available if you prefer (1% discount on monthly
  invoice — incentivises auto-pay)

5. AUTO-RENEW + PRICE ESCALATION
- Initial term: 12 months
- Auto-renews each anniversary unless 60 days notice
  (commercial standard — gives both sides time to plan)
- Annual price review on anniversary: CPI + 1.5%
- We notify you 90 days before any escalation

6. TERMINATION
- 60 days notice either side (commercial standard)
- No exit fee
- Final clean included in the final monthly invoice

7. KEY HOLDER / ALARM
- We are key-holder for [building entry / suite entry]
- Alarm code held by named lead cleaners only (no shared
  codes); code rotated quarterly
- Key sign-in / sign-out on every visit
- Lost key = re-key at our cost (covered by public liability)

8. COMPLIANCE
- All cleaners hold current police check
- COSHH / SDS folder on site (UK) / SDS folder on site
  (AU/US/CA)
- Chemicals used: [list — Diversey range / Ecolab range /
  brand list per BUSINESS CONFIG]
- Public liability: $[X]
- Worker comp / employer's liability: [yes — policy #]
- BICSc / CIMS-GB / [other cert] held [if applicable]

9. REPORTING
- After each nightly visit: time-stamped sign-off in our app
  ([ServiceM8 / Jobber / CleanTelligent / etc.]) — viewable
  by your facility manager
- Monthly: 1-page report — visits completed, hours, issues
  found, stocked items low (paper, soap)
- Quarterly: walk-through with your facility manager to
  review

10. WHAT WE NEED FROM YOU
- Alarm code (changed to a dedicated cleaner code is best
  practice — we can advise on setup)
- Stocked items source (do you supply paper / soap / bin
  liners, or do we supply at cost + 20%?)
- Facility manager contact + after-hours contact (alarm
  trips do happen — we need someone to call)

Reply "go ahead" + we'll send the formal contract + start date.

Thanks,
[your name]
[Business name]
[Lic / cert # / ABN VAT EIN]
[Insurance: Public liability $X, [insurer]]
```

## Quote template — STR TURNOVER CONTRACT

For Airbnb / Stayz / Booking.com / VRBO hosts with regular
turnovers.

```
Subject: STR turnover crew proposal — [host name / property]

Hi [name],

Here's the STR turnover proposal for [property + address]:

1. WHAT EVERY TURNOVER INCLUDES
- Strip + remake all beds (linens supplied by you / collected
  by us / laundered by us — pick one)
- Bathrooms: shower screen, tiles, toilet, basin, mirror,
  full restock (towels, toiletries)
- Kitchen: dishwasher empty + restock, fresh tea-towels,
  benches, sink, fridge wipe + check for left items,
  oven check (clean if needed)
- Living areas: vacuum, mop, cushion-fluff, throw-fold,
  remote check, lighting check
- Bedrooms: bed-make to standard (hospital corners, throw,
  cushions), vacuum, surface dust, bin empty
- Floors: hard floor mop, carpet vacuum
- Outdoor area (if accessible): sweep, bin check
- Restocks: coffee pods, tea, sugar, salt + pepper, hand
  soap, dish soap, toilet paper, paper towels, bin liners —
  list per BUSINESS CONFIG / host preferences
- Window snapshot + photo evidence pack (next section)

2. PHOTO EVIDENCE PACK (sent to host within 30 mins of
finishing every turnover)
- Each room: 1 wide-angle finished shot
- Beds: 1 close shot
- Bathrooms: shower screen, toilet, basin — 3 shots
- Kitchen: benches + sink shot, fridge inside shot
- Living: wide shot
- Any damage / issues found — separate photo + 1-line note
- Restock items low (so you can re-order before next turn)

3. FREQUENCY + SCHEDULE
- Estimated turnovers / month: [N]
- Window between checkout + check-in: [e.g. 11am-3pm — 4 hrs]
- Standard turnaround: [e.g. 2 hrs per turn for 2-bed]
- Crew: [1 cleaner standard for 1-2 bed; 2 for 3+ bed]

4. PRICING
- Per-turnover rate: $[X] (for [N-bed standard turn])
- Deep turn (between long stays — monthly):  $[X]
- Restock items at cost + 15%
- Late-notice turn (booked <24 hrs out): +25%
- Same-day turn (booked <6 hrs out): +50%
- Holiday turn surcharge: +25%

5. PAYMENT
- Monthly statement on the 1st — covers prior month's turns
- Pay via Stripe link / direct debit / EFT, Net 7
- Or per-turn invoice if preferred (small admin overhead)

6. AUTO-RENEW + ESCALATION
- Month-to-month (STR business needs flexibility)
- Per-turn price review every 12 months: CPI + 1.5%
- 30 days notice on price changes

7. TERMINATION
- 14 days notice either side (STR-appropriate — bookings
  can dry up fast)

8. WHAT GOES WRONG (the honest section)
- Late guest checkout: we wait up to 30 mins free, then
  $[X]/30 mins (or reschedule the turn if you give us a
  heads-up)
- Damage by guests: we photo-document, flag to you within
  10 mins of finding it — you handle the host claim with
  Airbnb / Stayz
- Items left behind by guests: we bag + label + leave in
  the property; you arrange collection
- Linen / restock running short: we flag it; you re-order
- Linen damage by us: we replace at our cost (rare)

9. KEY / ACCESS
- Smart-lock code: rotated monthly (we hold for the month,
  rotates on the 1st)
- Or lockbox: code held + rotated quarterly
- Or key in property safe / hidden spot: documented + we
  return on every turn

10. WHAT WE NEED FROM YOU
- Calendar share (we plug into your iCal / Airbnb / Stayz
  feed so we don't need to chase you for booked turnovers)
- Restock-item preference list
- Linen supply method (decide upfront)
- Backup contact for emergencies (host's mobile not always
  available)

Reply "go ahead" + send us the iCal link + we'll schedule the
first turnover.

Thanks,
[your name]
[Business name]
```

## NDIS recurring service agreement

```
Subject: NDIS Service Agreement — [Participant first name]

Hi [name],

Service agreement for the recurring NDIS-funded cleaning under
[participant]'s plan.

1. PARTICIPANT
- Name:                [first name only on the document]
- NDIS #:              [#]
- Plan management:     [NDIA / Plan-managed / Self-managed]
- Plan manager:        [name + email — if plan-managed]

2. PROVIDER
- Business:            [Business name]
- ABN:                 [#]
- NDIS-registered:     [yes — registration # | no — participant
                         must be plan- or self-managed]
- Worker Screening:    held [# expiring date]
- NDIS Orientation Module: completed [date]
- NDIS Code of Conduct: agreed
- Public liability:    $[X]

3. SUPPORT BEING PROVIDED
- Support category:    [e.g. Assistance with Daily Life]
- Item code:           [e.g. 01_011_0107_1_1 — Household
                         Cleaning and Other Household Activities]
- Frequency:           [e.g. fortnightly, 3 hours per visit]
- Annual visit count:  [e.g. 26]
- Total hours / year:  [78]

4. SCOPE PER VISIT
[Specific tasks — must match what's funded under the plan]
- [List]

5. RATE
Per NDIS Price Guide for [support category] in [region]:
- Hourly rate: $[X] (cite current NDIS Pricing Arrangements
  line — don't fabricate, ask operator if missing)
- Per-visit cost: $[X]
- Annual cost: $[X]

6. INVOICING
- Invoices issued [weekly / fortnightly / monthly]
- Invoice sent to [plan manager email] / [participant if
  self-managed] / claim via myplace portal if NDIA-managed
- Each invoice includes:
  - Participant name + NDIS #
  - Service dates + hours
  - Support category + item code
  - Provider ABN + name
  - Total

7. CHANGES TO THE AGREEMENT
- Participant can update / cancel any time with 14 days
  notice
- We update the agreement if plan funding changes
- We flag if plan funding looks like it'll run out before
  the service period ends

8. COMPLAINTS / CONCERNS
- Raise with [your name] on [phone] / [email]
- Or with the NDIS Quality and Safeguards Commission on
  1800 035 544

Signed:

For participant:           ________________________________
                            [or guardian / plan nominee]
Date:                       [date]

For [Business name]:        ________________________________
                            [your name]
Date:                       [date]
```

## Hard rules

- **Always quote per-visit AND annual.** Customers think in
  per-visit; you think in annual; both numbers should appear so
  there are no surprises.
- **Always include auto-renew + escalation clause.** Recurring
  contracts without escalation lose money to inflation every
  year.
- **Always include termination clause.** Don't make customers
  feel trapped. Easy exit = easier sale up front.
- **Commercial contracts have 60-day notice + 60-day escalation
  notice** (longer than residential — facility managers need
  time to budget).
- **STR contracts are month-to-month.** STR businesses need
  flex.
- **NDIS recurring agreements MUST cite the NDIS price guide
  item code** — don't fabricate.
- **Always require a site visit for commercial contracts** —
  every site is different.
- **Always specify the chem range** in residential recurring
  (eco / standard / fragrance-free) — customers care.
- **Always specify key / access protocol** — lost-key liability
  is real.
- **Banned phrases** from BUSINESS CONFIG.

## Reading the learnings.md

Open `learnings.md`. If:
- Recurring residential conversion <30% → consider sweetening
  the offer (waive callout fee on first visit, or first month
  free for a 12-month sign).
- Commercial nightly win-rate <25% → consider if the site walks
  are surfacing pricing too high, or if you're targeting the
  wrong size of site.
- "STR turnover" is a Win — push it; specifically, the agent
  notes which hosts have multi-property portfolios and proposes
  multi-property contracts.

## Outputting the internal record

```
QUOTE #<n> — <timestamp>
Lead:        LEAD #<n>
Type:        <recurring-residential | commercial-nightly |
              str-turnover | ndis-recurring>
Frequency:   <weekly | fortnightly | monthly | nightly | per-turn>
Per-visit:   $<X>
Annual:      $<X>
Site visit:  <yes — done | yes — pending | no>
Status:      <draft | sent | accepted | declined>
Start date:  <date>
```

## Confirm + handoff

Tell the operator:
> *"Recurring quote drafted: $X/visit ($Y annual) for [job
> summary]. Review before sending? Once accepted, I'll set up
> the direct debit via [GoCardless/Stripe/etc.] via
> `06-invoice-payment.md` and book the first visit in
> `04-dispatch.md`. The contract will auto-track in
> `09-recurring-maintenance.md`."*

Wait for operator sign-off before sending — never send a
recurring contract without the user reviewing it first.
Recurring contracts are the spine of the business.
