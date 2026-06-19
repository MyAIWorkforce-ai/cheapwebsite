---
name: electrician-quote-callout
description: Generate an instant callout quote for small jobs (powerpoints, lights, fans, fault-finding, single-circuit work). Use BUSINESS CONFIG rates. Show working. Stay honest about "subject to site inspection" for anything that can grow.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Callout quote — small jobs, fast

## Your job

Read the qualified lead from intake. Generate a clear quote within
15 minutes (the agent's target — actual is seconds). Send it back via
the channel the customer used (SMS / email / GBP / form reply).

## What counts as a callout

Use this skill when:
- The whole job will likely finish in ≤2 hours
- It's a single-circuit, single-fixture, or single-fault job
- Examples: install a powerpoint, replace a light fitting, swap a
  ceiling fan, find a tripping circuit, replace a smoke alarm

Use `03-quote-project.md` instead if:
- Multi-day or multi-trade
- Switchboard upgrade or new build
- Solar / EV charger / commercial fitout

## The structure of a callout quote

Every callout quote is the same shape:

```
Callout fee:          $[X]   (covers first 30 mins on site)
Labour (after 30):    $[X]/hr at [day rate]
Estimated time:       [X] mins / [X] hrs
Parts (typical):      $[X]   (range if unknown)
Tax ([GST/VAT]):      $[X]
─────────────────────────────────────
Total estimate:       $[X] — $[Y]
```

Then add **one** caveat line. Pick the right one:

- *"Locked-in price if it's exactly as described. If something extra
  shows up on site I'll let you know before doing any extra work."*
- *"This is a fixed quote — no surprises."* (only when you can be sure)
- *"Quote assumes existing wiring is to current standard. If we find
  pre-1980 wiring under the fitting, we'll stop and re-quote."*

## Customer-facing send (SMS — keep it under 320 chars)

```
Hi [name] — quote for [job summary] at [address]:

Callout: $99 (covers first 30 mins)
Labour after 30 mins: $125/hr
Parts (typical for this): $25–60
Total: ~$185–250 incl. GST

Ready Thursday morning or Friday arvo. Reply with your pick to lock
it in.

— [your name], [Business name]
```

## Customer-facing send (email — slightly longer is fine)

```
Subject: Quote for [job summary] at [address]

Hi [name],

Here's the quote for [job summary]:

| Item                          | Amount    |
|---|---|
| Callout fee (first 30 mins)   | $99       |
| Labour (after 30 mins)        | $125/hr   |
| Estimated time                | 45 mins   |
| Parts (typical)               | $25–60    |
| GST (10%)                     | included  |
| **Total estimate**            | $185–250  |

Locked-in price if it's exactly as described above. If something
extra shows up on site I'll flag it before doing any extra work.

Available [Thursday morning 8–11am] or [Friday arvo 1–4pm]. Reply
with which one suits.

Thanks,
[your name]
[Business name]
[License # — required in some regions]
[Insurance + ABN/VAT line for compliance]
```

## Hard rules — auto-rewrite if violated

- **Always include** the callout fee + the after-30-min rate, even
  if the job is "definitely under 30 mins." Customers respect the
  honesty.
- **Always include** tax (GST/VAT) explicitly. "Includes GST" or "+
  GST" — not silent.
- **Always include** at least one time window. "I'll get back to you
  with timing" is a quote-killer.
- **Never quote** below the minimum charge in BUSINESS CONFIG.
- **Never quote** outside service area without a travel surcharge.
- **Never quote** anything in BUSINESS CONFIG → "Job types you DON'T
  do" — decline politely.
- **No emoji** unless the BUSINESS CONFIG voice asks for it.
- **Banned phrases** from BUSINESS CONFIG → silent rewrite.

## Reading the learnings.md before quoting

Open `learnings.md`. If:
- The job type is in the **margin thin** column → quote firm at the
  minimum charge floor; don't discount.
- The job type is in the **win — push** column → quote confidently;
  this is what you want to do.
- The suburb is in the **drive-time poor** column → add a travel
  surcharge per BUSINESS CONFIG.

## Outputting the internal record

For each quote sent, save in context:

```
QUOTE #<n> — <timestamp>
Lead:        LEAD #<n>
Job type:    <powerpoint install / fault-find / etc.>
Quote sent:  $<low> – $<high>
Time est:    <mins / hrs>
Channel:     <SMS | email>
Time slot 1: <day, window>
Time slot 2: <day, window>
Status:      <awaiting reply | booked | declined>
```

## Confirm + handoff

Tell the user (you, the operator):
> *"Quote sent: $X–Y for [job summary]. Two time slots offered. I'll
> watch for the reply and load `04-dispatch.md` when they confirm."*

If reply doesn't come within 24 hours, prompt the user to send a
nudge:

> *"Hey [name], just bumping the quote from yesterday — still keen?
> Same windows are open."*

After two follow-ups, mark the lead as `lapsed` in the weekly report
and move on. Don't chase a third time.
