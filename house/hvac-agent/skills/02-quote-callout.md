---
name: hvac-quote-callout
description: Generate an instant callout quote for breakdown / diagnostic / single-fault jobs (no cool, no heat, capacitor, contactor, drain pan, filter, thermostat, leak find). Use BUSINESS CONFIG rates. Show working. Stay honest about "subject to diagnostic" for anything that can grow into a system replacement.
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
- It's a single-component or single-fault job
- Examples: capacitor swap, contactor swap, fan motor diagnosis +
  replace, condenser coil clean, indoor coil clean (light), drain pan
  + condensate line flush, filter replacement, thermostat upgrade,
  no-cool / no-heat diagnostic, single-zone leak detection,
  refrigerant top-up *after* leak is fixed (small charge correction)

Use `03-quote-project.md` instead if:
- Split system changeout (single or multi-head — full equipment swap)
- Ducted reverse-cycle install or major retrofit
- Heat pump retrofit (residential or hydronic)
- Commercial RTU change-out
- Ductwork run / replace
- Anything where the existing unit is being replaced rather than repaired
- Multi-day work

## The structure of a callout quote

Every callout quote is the same shape:

```
Callout fee:          $[X]   (covers first 30 mins + diagnostic)
Labour (after 30):    $[X]/hr at [day rate]
Estimated time:       [X] mins / [X] hrs
Parts (typical):      $[X]   (range if unknown)
Tax ([GST/VAT]):      $[X]
─────────────────────────────────────
Total estimate:       $[X] — $[Y]
```

Then add **one** caveat line. Pick the right one:

- *"Diagnostic-led — if it turns out to be a [common cause, e.g.
  failed capacitor], we'll have you cool/heat in under an hour.
  If it's deeper (compressor / coil leak / control board), I'll
  stop and re-quote before any extra work."*
- *"This is a fixed quote — no surprises."* (only when you're sure —
  e.g. capacitor + contactor swap on a system you've seen before)
- *"Quote assumes the leak is at a serviceable joint (flare nut,
  schrader, condenser coil flare). If it's a pinhole in the indoor
  coil, I'll quote you the choice — repair or replace, with honest
  ROI numbers — before doing extra work."*
- *"Quote assumes condensate line clears with vacuum. If we need
  to camera the line or rebuild a section, we'll stop and re-quote
  first."*

## Job-type specifics (use these typical ranges, override with BUSINESS CONFIG)

| Job | Typical AU range | UK range | US range | Notes |
|---|---|---|---|---|
| No-cool diagnostic (split) | $150–280 | £90–180 | $120–250 | Pure diagnostic; credited toward repair if escalated |
| Capacitor replacement | $220–380 | £140–240 | $180–350 | Most common AC failure; carry stock in van; 1 hour job |
| Contactor replacement | $240–400 | £150–260 | $200–380 | Often paired with capacitor on older units |
| Condenser fan motor swap | $400–650 | £250–420 | $350–600 | Brand-specific; lead time risk on older units |
| Condenser coil clean | $220–380 | £140–240 | $180–350 | High-margin, recommend annually as part of service plan |
| Indoor coil deep clean | $320–550 | £200–340 | $260–500 | Carry foam coil cleaner; reschedule if needs full strip |
| Drain pan + condensate flush | $180–320 | £110–200 | $150–300 | Quick if accessible; ceiling cassette adds 30 min |
| Filter replacement (van stock) | $80–180 | £55–115 | $70–160 | Often loss-leader; bundle into service plan |
| Thermostat upgrade (smart) | $280–520 | £180–340 | $230–480 | ecobee / Nest / Tado / Sensibo Sky — same labour, different SKU |
| Leak detection + minor repair | $480–950 | £300–600 | $400–880 | Electronic + UV; charges separately for the leak find vs the recharge |
| Refrigerant recharge (after fix) | + $80-220/kg | + £50-140/kg | + $70-200/lb | R32 cheaper than R410A; R454B premium; price moves with market |
| No-heat diagnostic (heat pump) | $180–320 | £110–200 | $150–300 | Often defrost cycle / reversing valve / sensor |
| Reversing valve fault | $650–1200 | £400–760 | $550–1100 | High-labour; on old unit often pushes to changeout discussion |

## Customer-facing send (SMS — keep it under 320 chars)

```
Hi [name] — quote for [job summary, e.g. "no-cool diagnostic on
your 3.5kW Daikin"] at [address]:

Callout: $150 (covers first 30 min + diagnostic)
After 30 min: $130/hr
Parts: capacitor ~$80; fan motor ~$320; coil clean ~$180
Total: typically $250–480 incl. GST

Ready Thursday morning or Friday arvo. Reply with your pick.

— [your name], [Business name]
```

## Customer-facing send (email — slightly longer is fine)

```
Subject: Quote for [job summary] at [address]

Hi [name],

Here's the quote for [job summary]:

| Item                          | Amount    |
|---|---|
| Callout fee (first 30 mins + diagnostic) | $150 |
| Labour (after 30 mins)        | $130/hr   |
| Estimated time                | 60–90 mins|
| Parts (typical)               | $80–320   |
| GST (10%)                     | included  |
| **Total estimate**            | $250–480  |

Diagnostic-led — most no-cool calls on a system under 8 years old
come back to capacitor or contactor, which we'll have you running
again in under an hour. If it's deeper (compressor / coil pinhole
leak / control board failure on an older unit), I'll stop, show
you the diagnosis, and quote the choice between repair and
replacement with honest ROI numbers. No work without your "go ahead."

Available [Thursday morning 8–11am] or [Friday arvo 1–4pm]. Reply
with which one suits.

While I'm there, happy to also flag whether your unit's a candidate
for our annual service plan ($295/year, includes filter changes,
refrigerant pressure check, drain clean, capacitor + contactor
condition check — usually catches the next breakdown before it
happens). No obligation, I'll just mention it on-site.

Thanks,
[your name]
[Business name]
[Refrigerant licence — e.g. ARC RHL Full # / EPA 608 Universal #]
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
- **Never quote a refrigerant top-up alone.** Always quote leak
  detection + repair first, recharge after fix. Even if the customer
  insists — explain the regulation and the brand-damage path. Lose
  the job to a less ethical competitor if you must; you don't want
  the comeback call.
- **No emoji** unless the BUSINESS CONFIG voice asks for it.
- **For older units (10+ years):** Always mention the
  repair-vs-replace conversation in the quote. Not pushy — just
  honest that for some failures the ROI on repair is poor and a
  changeout is worth pricing.
- **Banned phrases** from BUSINESS CONFIG → silent rewrite.

## Reading the learnings.md before quoting

Open `learnings.md`. If:
- The job type is in the **margin thin** column → quote firm at the
  upper end of the range; don't discount.
- The job type is in the **win — push** column → quote confidently;
  this is what you want to do.
- The suburb is in the **drive-time poor** column → add a travel
  surcharge per BUSINESS CONFIG.
- The customer type is "real estate agent (managed)" → tighten
  payment terms upfront; these tend to be slow-pay.
- Heatwave week is active → quote 5-min turnaround target;
  surface after-hours premium upfront; offer next-day standard rate
  as alternate.
- Service plan attach rate is below target → make sure the quote
  reply includes the service plan mention. Every time.

## Outputting the internal record

For each quote sent, save in context:

```
QUOTE #<n> — <timestamp>
Lead:        LEAD #<n>
Job type:    <no-cool diagnostic / capacitor / coil clean / etc.>
Quote sent:  $<low> – $<high>
Time est:    <mins / hrs>
Channel:     <SMS | email>
Time slot 1: <day, window>
Time slot 2: <day, window>
Service plan mentioned: <Y/N>
Status:      <awaiting reply | booked | declined>
```

## Confirm + handoff

Tell the user (you, the operator):
> *"Quote sent: $X–Y for [job summary]. Two time slots offered. Service
> plan offer mentioned. I'll watch for the reply and load `04-dispatch.md`
> when they confirm."*

If reply doesn't come within 24 hours (or 4 hours in heatwave), prompt
the user to send a nudge:

> *"Hey [name], just bumping the quote from yesterday — still keen?
> Same windows are open."*

After two follow-ups, mark the lead as `lapsed` in the weekly report
and move on. Don't chase a third time.
