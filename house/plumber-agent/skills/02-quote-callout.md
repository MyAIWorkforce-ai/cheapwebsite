---
name: plumber-quote-callout
description: Generate an instant callout quote for small jobs (leaking taps, blocked toilets, single-fixture issues, mixer cartridge swaps). Use BUSINESS CONFIG rates. Show working. Stay honest about "subject to inspection" for anything that can grow into a wall-out or drainage job.
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
- It's a single-fixture or single-fault job
- Examples: re-washer a tap, swap a mixer cartridge, clear a
  blocked head with a plunger or hand snake, replace a toilet
  cistern button, swap a single isolation valve, replace a
  flexible hose, fix a running cistern, clear a single basin trap

Use `03-quote-project.md` instead if:
- Hot water cylinder replacement (always project — sizing,
  connection swap, tundish if unvented, isolation install)
- Bathroom or kitchen renovation rough-in
- Drain excavation or pipe relining
- Gas line work
- New build pre-plumb
- Multi-fixture or multi-day work

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

- *"Locked-in price if the cartridge is a standard fit. If it's a
  proprietary brand we don't carry I'll flag before doing extra
  work."*
- *"This is a fixed quote — no surprises."* (only when you can be
  sure — e.g. a known repeat job at a managed property)
- *"Quote assumes the existing isolation valve is functional. If it's
  seized and needs replacing, that's a $25 part + 10 mins extra —
  I'll let you know on site."*
- *"Quote assumes the blockage clears with the hand snake. If we
  need the jetter or a camera, we'll stop and re-quote first."*

## Job-type specifics (use these typical ranges, override with BUSINESS CONFIG)

| Job | Typical AU range | UK range | US range | Notes |
|---|---|---|---|---|
| Leaking tap (re-washer) | $130–220 | £80–150 | $120–250 | Quick if it's a normal washer; older 1/4-turn ceramics need a cartridge |
| Mixer cartridge swap | $180–320 | £100–200 | $150–350 | Cartridge cost varies by brand; Methven, Grohe, Hansgrohe are pricier than house-brand |
| Blocked toilet (no jetter) | $150–280 | £90–180 | $130–300 | Plunger / hand snake; upsell CCTV if it's recurring |
| Blocked drain (jetter) | $250–450 | £150–300 | $200–450 | Jetter callout is its own rate; CCTV inspection often follows |
| Running cistern | $130–220 | £80–150 | $120–250 | Replace inlet valve + flush valve; takes 30 min if accessible |
| Burst flexi hose under sink | $180–320 | £100–220 | $150–350 | Quick fix; recommend swapping all flexis if pre-2010 |
| Toilet pan rocking | $200–380 | £120–240 | $180–400 | Pull pan, re-set wax ring / Bog Mate / pan collar |
| Replace single isolation valve | $150–250 | £90–170 | $130–280 | Quick mini-stop or stop-cock swap |
| Roof / gutter leak (if you do them) | $200–450 | £120–280 | $180–450 | Often spills into "is this really plumbing?" — quote tight |

## Customer-facing send (SMS — keep it under 320 chars)

```
Hi [name] — quote for [job summary] at [address]:

Callout: $130 (covers first 30 mins)
After 30 mins: $110/hr
Parts (typical): $25–80
Total: ~$200–290 incl. GST

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
| Callout fee (first 30 mins)   | $130      |
| Labour (after 30 mins)        | $110/hr   |
| Estimated time                | 45 mins   |
| Parts (typical)               | $25–80    |
| GST (10%)                     | included  |
| **Total estimate**            | $200–290  |

Locked-in price if the cartridge is a standard size. If it's a
proprietary fit I'll flag before doing extra work. If we find
anything else under the sink (corroded supply line, leaking trap
elbow), I'll stop and quote it separately.

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
- **Never quote gas work** unless gas ticket is current in BUSINESS
  CONFIG.
- **For drain blockages** — always include the caveat about jetter /
  camera escalation. Never quote a blocked drain as "fixed" without
  acknowledging the unknown.
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
- The customer type is "real estate agent (managed)" → tighten
  payment terms upfront; these tend to be slow-pay.

## Outputting the internal record

For each quote sent, save in context:

```
QUOTE #<n> — <timestamp>
Lead:        LEAD #<n>
Job type:    <leaking tap / blocked drain / etc.>
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
