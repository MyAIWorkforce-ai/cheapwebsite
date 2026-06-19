---
name: electrician-followup-reviews
description: Day-1 check-in to make sure the work's holding up. Day-3 polite review request — the single highest-leverage action a sparky takes. Day-30 reminder if any warranty issues. Day-90 "still good?" relationship touch.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Follow-up + reviews

## Your job

Most sparkies stop talking to a customer the moment the invoice is
paid. That's a mistake. The next 90 days is where 60% of your reviews,
80% of your referrals, and 100% of your repeat work comes from.

Run a four-touch follow-up sequence after every job:

| Day | Touch | Purpose |
|---|---|---|
| **+1** | SMS check-in | Make sure work's holding up; head off any small issues early |
| **+3** | Review request | Highest-impact ask — sparky's biggest growth lever |
| **+30** | Warranty/anniversary touch | If applicable, prompts "still working?" |
| **+90** | Relationship touch | Friendly check-in; surfaces next jobs |

## Touch 1 — Day-1 check-in

SMS, sent the morning after the job. Short.

```
Morning [first name] — [your name] from [Business name]. Quick check:
how's the [thing fixed] holding up? Any issues, sing out and I'll
sort it.

— [your name]
```

If they reply with an issue:
- Acknowledge within the hour
- Re-attend if it's something simple (loose connection, tripped RCD)
- Don't charge for a re-attend if it's within 24h and the same job —
  it's warranty work

If they reply positively, perfect setup for the Day-3 ask.

If they don't reply: don't chase. Move to Day-3.

## Touch 2 — Day-3 review request

This is THE follow-up. Send 3 days after job completion (long enough
that they've used the thing, short enough that the experience is
fresh).

### SMS version (preferred — higher response rate)

```
Hi [first name] — sparky [your name] again. Glad the [thing] is
sorted. If you've got 30 seconds to leave a Google review, it makes a
huge difference to a small business like ours.

Link: [shortened GBP review link]

Cheers either way,
[your name]
```

### Email version (for older customers / less SMS-friendly)

```
Subject: Quick favour, [first name]?

Hi [first name],

Quick favour — if you've got 60 seconds, would you be willing to
leave us a Google review for the [job summary] last week? It's the
single biggest help for a small sparky business like ours, and it
takes no time:

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
  next job for a review"). Don't risk the account.
- **Personalise.** Mention the specific job. "Review for the
  switchboard last week" reads as personal; "leave a review" reads
  as spam.
- **Direct link.** Shorten the GBP review URL with bit.ly so it fits
  in an SMS and looks clean.

## Touch 3 — Day-30 / warranty touch (if applicable)

For project jobs with a 12-month workmanship warranty, send at the
30-day mark:

```
Hi [first name] — [your name] from [Business name]. Quick 30-day
check on the [job] from last month. All good? Any small things
playing up that you've been meaning to mention?

Just reply yes/no — no obligation, just want to make sure it's
sorted.

— [your name]
```

Skips for callout-only work (under $300).

## Touch 4 — Day-90 / relationship touch

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
Cheers again for the review, [first name]. If you ever hear someone
mention they need a sparky, my number's [phone] — we look after
referrals well (small discount on the referrer's next job).

No pressure, just appreciate the support.

— [your name]
```

Note: "look after referrals well" implies the discount on the
**referrer's** next job, not bribery for the new lead. This is
standard practice and not the same as an incentivised review.

## Tracking in context

For each customer, track:

```
CUSTOMER #<id>
Name:                [name]
Last job:            [date, summary]
Day-1 check-in:      [sent — response]
Day-3 review ask:    [sent — review left? Y/N — rating]
Day-30 warranty:     [sent — issues raised? Y/N]
Day-90 relationship: [sent — future job booked? Y/N]
Total lifetime value: $[X]
```

The weekly report (`12-weekly-report.md`) reads these to compute
review conversion rate, repeat customer rate, and referral rate.

## Reading the learnings.md

Track:
- Review conversion rate (target: 25% of Day-3 asks → reviews)
- Repeat customer rate (target: 30% of new customers return within
  12 months)
- Time-to-review (faster review = higher quality usually)
- Reviews mentioning specific words (those phrases work in your
  marketing — Day-3 asks that yield reviews mentioning "explained
  everything" mean "I explain everything" is a real strength;
  surface in GBP posts)

## Hard rules

- **The follow-up sequence runs for every job.** No exceptions.
- **Pause if there's an unresolved issue.** Review ask waits.
- **Never spam.** Each touch is a separate decision point — if the
  customer goes silent, you stop. No drip campaigns.
- **Customer voice rules.** If the customer prefers email over SMS,
  log it and use email next time.

## Confirm + handoff

> *"Follow-up sequence loaded for [Customer]: Day-1 check-in queued
> for [date], Day-3 review ask queued for [date]. I'll pause if Day-1
> surfaces an issue."*

After the sequence ends (Day 90 + 1), mark the customer as
"sequence complete" and move them to the long-term relationship list
for the quarterly check-in roster.
