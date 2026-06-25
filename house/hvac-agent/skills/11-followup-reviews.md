---
name: hvac-followup-reviews
description: Day-1 check-in to make sure the work's holding up. Day-3 polite review request — the single highest-leverage action an HVAC tech takes. Day-7 service plan ask — the second-highest-leverage action. Day-30 reminder if any warranty issues. Day-90 "still cool?" relationship touch.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Follow-up + reviews + service plan ask

## Your job

Most HVAC techs stop talking to a customer the moment the invoice is
paid. That's a mistake. The next 90 days is where 60% of your
reviews, 80% of your referrals, 100% of your repeat work, and 40%
of your service plan signups come from.

HVAC specifically has high repeat-customer potential: every
homeowner has another AC issue, another heat pump retrofit
question, another rental property to fit out, or another need for
a system upsize within 24-36 months. The tech who stayed in touch
wins the next job.

Run a five-touch follow-up sequence after every job:

| Day | Touch | Purpose |
|---|---|---|
| **+1** | SMS check-in | Make sure work's holding up; head off any small issues early |
| **+3** | Review request | Highest-impact ask — HVAC tech's biggest growth lever |
| **+7** | Service plan ask | Second-highest-impact — convert callouts onto recurring |
| **+30** | Warranty/anniversary touch | If applicable, prompts "still working?" |
| **+90** | Relationship touch | Friendly check-in; surfaces next jobs |

## Touch 1 — Day-1 check-in

SMS, sent the morning after the job. Short.

```
Morning [first name] — [your name] from [Business name]. Quick check:
how's the [thing fixed — e.g. "new split"] holding up? Any noises,
smells, or temperature weirdness, sing out and I'll sort it.

— [your name]
```

If they reply with an issue:
- Acknowledge within the hour
- Re-attend if it's something simple (the new head dripping, the
  thermostat reading wrong, the outdoor unit vibrating)
- Don't charge for a re-attend if it's within 24h and the same job —
  it's warranty work

If they reply positively, perfect setup for the Day-3 ask.

If they don't reply: don't chase. Move to Day-3.

### Job-specific Day-1 check-ins

**Split changeout:**
```
Morning [first name] — [your name] from [Business name]. Quick check
— new Daikin holding temp since yesterday? Any noises from the
outdoor unit, weird vibrations, or smells? Let me know straight
away if anything's off.

— [your name]
```

**No-cool diagnostic / capacitor replacement:**
```
Morning [first name] — [your name]. Hope you stayed cool last night.
The new capacitor doing the job? Any cycling on/off, fan running but
no cool? If anything plays up, call me first — warranty covers the
re-attend.

— [your name]
```

**Ducted install:**
```
Morning [first name] — [your name]. Quick check — ducted system
running OK? Even temps across the zones? Any zones blowing
weak/warm/cold? Filter access make sense from yesterday's
walkthrough?

The 30-day warranty covers anything install-related, no charge.

— [your name]
```

**Heat pump retrofit:**
```
Morning [first name] — [your name]. Heat pump running OK? In hot
water mode, you should hear it cycle on every few hours overnight
— that's normal. If it's noisy / running constantly / making
sharper sounds, let me know.

— [your name]
```

**Annual service visit (Plan member):**
```
Morning [first name] — [your name]. Annual service done yesterday.
System running OK today? The capacitor reading and refrigerant
pressures were both in spec, so you should be sweet for the year.
Any noises since yesterday, give me a call.

— [your name]
```

## Touch 2 — Day-3 review request

This is THE follow-up. Send 3 days after job completion (long enough
that they've used the thing, short enough that the experience is
fresh).

### SMS version (preferred — higher response rate)

```
Hi [first name] — HVAC tech [your name] again. Glad the [thing —
e.g. "AC"] is sorted. If you've got 30 seconds to leave a Google
review, it makes a huge difference to a small business like ours.

Link: [shortened GBP review link]

Cheers either way,
[your name]
```

### Email version (for older customers / less SMS-friendly)

```
Subject: Quick favour, [first name]?

Hi [first name],

Quick favour — if you've got 60 seconds, would you be willing to
leave us a Google review for the [job summary, e.g. "AC service
last week"]? It's the single biggest help for a small HVAC
business like ours, and it takes no time:

[link to GBP review form]

Either way, cheers for the work.

[your name]
[Business name]
```

### Hard rules for review requests

- **Send only to satisfied customers.** If the Day-1 check-in
  surfaced an issue and it's not resolved, do NOT ask for a review.
  Fix the issue, then ask 3 days after the fix.
- **Ask once.** Don't follow up the review request. It's an ask, not
  a campaign.
- **No incentive.** Google bans incentivised reviews ("$10 off your
  next service for a review"). Don't risk the account.
- **Personalise.** Mention the specific job. "Review for the AC
  changeout last week" reads as personal; "leave a review" reads
  as spam.
- **Direct link.** Shorten the GBP review URL with bit.ly so it fits
  in an SMS and looks clean.

## Touch 3 — Day-7 service plan ask

This is the second-highest leverage touch. Send 7 days after job
completion — long enough that they've experienced the relief of
the fix, short enough that "prevention" is still top of mind.

### For callout customers not already on a plan:

```
Hi [first name] — [your name] from [Business name]. Quick one.

Now that the [issue] is sorted, this is the moment most of our
customers ask about the annual service plan — because the way the
system failed [reason — "capacitor sat dormant all winter and
popped on first heat" / "drain pan was full of algae we couldn't
see from outside"] is exactly what an annual service catches before
it becomes a breakdown.

Plan A: $295/year for an annual visit (filter, condenser clean,
drain flush, refrigerant pressure check, capacitor + contactor
test). 10% off any breakdown callout during the plan year + priority
booking.

Plan B: $495/year for 2 visits (pre-summer + pre-winter) + leak
inspection + indoor coil treatment. 15% off + same-day priority in
heatwaves.

Want me to send the full details? No pressure.

— [your name]
```

### For project install customers — they already got year 1 free:

```
Hi [first name] — [your name]. Quick reminder — your year-1 service
plan kicks in [date approx 12 months]. We'll text you closer to the
visit. If anything goes weird before then, call me first — your
plan kicks in from install day.

— [your name]
```

### For "no thanks" replies:

Don't argue. Take note, log it, move on. Some customers come back
in year 2 after a breakdown that the plan would have prevented.

```
No worries [first name] — the offer's open if anything changes.
Cheers.

— [your name]
```

Track the no-thanks in `learnings.md` — patterns emerge (some
suburbs say no more than others; some job types convert better).

## Touch 4 — Day-30 / warranty touch (if applicable)

For project jobs with a 12-month workmanship warranty (split
changeouts, ducted installs, heat pump retrofits, RTU change-outs),
send at the 30-day mark:

```
Hi [first name] — [your name] from [Business name]. Quick 30-day
check on the [job, e.g. "ducted install"] from last month. All
good? Any noises, weird smells, zones acting up, or temperature
issues you've been meaning to mention?

Just reply yes/no — no obligation, just want to make sure it's
sorted.

— [your name]
```

Skips for callout-only work (under $400).

## Touch 5 — Day-90 / relationship touch

For project customers and any customer who left a 5-star review:

```
Hi [first name] — [your name]. Hope all's well. Just thinking — it's
been a few months since the [job]. Anything else lining up that we
can help with? Always happy to come back.

— [your name]
[Business name]
```

This is the highest-leverage touch for repeat work. Send by SMS,
keep it light, no upsell. The opener that you remembered them
specifically is the gift.

## Special case — referral request

If a customer leaves a 5-star review with positive text, follow up
with a referral nudge (one time only):

```
Cheers again for the review, [first name]. If you ever hear a
neighbour mention they need an HVAC tech, my number's [phone] — we
look after referrals well (small discount on the referrer's next
service).

No pressure, just appreciate the support.

— [your name]
```

Note: "look after referrals well" implies the discount on the
**referrer's** next service, not bribery for the new lead. This is
standard practice and not the same as an incentivised review.

## Special case — body corp / strata / commercial follow-up

Commercial customers are managed differently — the "customer" is
the facility manager / strata manager / property manager, but the
people who experience the work are the staff/residents. Follow up
to BOTH:

- Day-1: SMS to the facility manager confirming the work is done
- Day-3: Email to the facility manager — DON'T ask for a review
  (they manage dozens of properties; reviews don't help your local
  SEO)
- Instead: ask if there are other units on site (other tenancies,
  other AC heads, other floors) that have similar issues, offer a
  multi-unit discount
- Day-7: service plan / commercial contract ask if not already on
  one. Commercial customers convert better on the plan ask than
  residential (60-80% attach is realistic).

## Special case — heatwave / cold-snap emergency follow-up

Emergency customers (heatwave AC failure, cold-snap heat failure)
remember the experience VIVIDLY. Their review-conversion rate is
50%+ if asked at the right moment, and their service plan attach
rate is 50%+ on Day-7.

Send the review ask 3-5 days after the emergency (long enough for
gratitude to settle, short enough to remember the panic):

```
Hi [first name] — [your name] from [Business name]. Hope the
[heatwave / cold snap] hasn't given you any more grief. If you've
got 30 seconds for a review, [link] — your story would help other
folks who hit the same panic.

Cheers,
[your name]
```

Then on Day-7, the service plan ask hits HARD because they JUST
experienced what they're paying to prevent:

```
Hi [first name] — quick note. The heatwave failure last week — the
capacitor that popped — is exactly the kind of thing an annual
service catches before it fails. $295/year for the plan, 10% off
breakdowns during the year, priority dispatch next heatwave.

Want the full details? No pressure.

— [your name]
```

The "your story would help other folks" framing makes the review
feel useful, not transactional. The service plan ask after a
breakdown is the highest-converting moment in the customer
lifecycle.

## Tracking in context

For each customer, track:

```
CUSTOMER #<id>
Name:                [name]
Last job:            [date, summary]
Day-1 check-in:      [sent — response]
Day-3 review ask:    [sent — review left? Y/N — rating]
Day-7 service plan ask: [sent — yes/no — which plan if yes]
Day-30 warranty:     [sent — issues raised? Y/N]
Day-90 relationship: [sent — future job booked? Y/N]
Total lifetime value: $[X]
Service plan status: [active / declined / year-1 included]
```

The weekly report (`12-weekly-report.md`) reads these to compute
review conversion rate, service plan attach rate, repeat customer
rate, and referral rate.

## Reading the learnings.md

Track:
- Review conversion rate (target: 25% of Day-3 asks → reviews)
- Service plan attach rate (target: 60% on installs, 30% on
   callouts, 50% on emergency)
- Repeat customer rate (target: 35% of new customers return within
   24 months — high for HVAC because of system replacement cycle)
- Time-to-review (faster review = higher quality usually)
- Reviews mentioning specific words (those phrases work in your
   marketing — Day-3 asks that yield reviews mentioning "explained
   the capacitor reading" mean "I explain things" is a real
   strength; surface in GBP posts)

## Hard rules

- **The follow-up sequence runs for every job.** No exceptions.
- **Pause if there's an unresolved issue.** Review ask waits.
- **The Day-7 service plan ask runs even if the customer DIDN'T
  ask about service plans during the job.** Most customers don't
  proactively ask — they say yes if you offer.
- **Never spam.** Each touch is a separate decision point — if the
  customer goes silent, you stop. No drip campaigns.
- **Customer voice rules.** If the customer prefers email over SMS,
  log it and use email next time.
- **Heatwave + emergency customers are gold for service plan
  signups.** Make sure their Day-7 ask goes out with the highest
  warmth.
- **Plan attach rates below target = surface to operator at weekly
  report.** This is the strategic number.

## Confirm + handoff

> *"Follow-up sequence loaded for [Customer]: Day-1 check-in queued
> for [date], Day-3 review ask queued for [date], Day-7 service
> plan ask queued for [date]. I'll pause Day-3 if Day-1 surfaces
> an issue."*

After the sequence ends (Day 90 + 1), mark the customer as
"sequence complete" and move them to the long-term relationship list
for the quarterly check-in roster + the pre-season campaign list.
