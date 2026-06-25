---
name: builder-quote-smalljob
description: Generate a quick quote for small-job / handyman / maintenance work under ~$5k — door rehangs, deck repairs, fence sections, single-room paint, rotted weatherboards, blocked gutters, single-window swap. Use BUSINESS CONFIG rates. Stay honest about "subject to inspection" for anything that can grow into structural work.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Small-job quote — handyman / maintenance, fast

(Internally we think of this as "small-job-quote". The file name
keeps the `02-quote-callout.md` convention from the other trade
bundles for build-script compatibility.)

## Your job

Read the qualified small-job lead from intake. Generate a clear
quote within 24 hours. Send it back via the channel the client used
(email / SMS / form reply).

This skill exists because builders DO get the "can you just fix
this one thing?" enquiries — and turning them away breaks the
referral chain. The trick is to scope them tight so you don't get
dragged into a project quote masquerading as a callout.

## What counts as a small job

Use this skill when:
- The whole job will likely finish in ≤2 days
- It's a single-element repair or replacement
- No council approval is required
- No structural engineer involvement needed
- Examples: door rehang, replace rotted weatherboards (section, not
  whole wall), deck board replacement, fence section repair,
  single-room paint, rehang a gate, replace a single window like-
  for-like, repair a roof leak (single tile / flashing — sub the
  roofer if more), patch render, replace gutter section, repair a
  pergola post, replace skirting in a room, re-stick lifting
  vinyl, repair a kitchen cabinet door, replace a single internal
  door, install a single shelf system, fix a sticking door, repair
  a deck handrail, patch + paint a hole in plaster

Use `03-quote-project.md` instead if:
- Kitchen / bathroom renovation (always a project — selections,
  rough-in coordination)
- Extension / new build / addition
- Anything requiring council / planning approval
- Structural engineer involvement
- More than 2 days work
- More than one trade besides yourself (a small painting job is
  small; a small job that needs a sparky AND a plumber is a
  project)
- Insurance work (separate flow — assessor involvement)
- New construction of any kind

If you're not sure, use the bigger skill (`03-quote-project.md`).
Over-quoting a small job as a project costs you the job; under-
quoting a project as a small job costs you margin.

## The structure of a small-job quote

Every small-job quote is the same shape:

```
Labour:           [X] hrs at $[Y]/hr        = $[X]
Materials:        itemised below            = $[X]
Disposal / skip:  if relevant               = $[X]
Site visit:       only if needed (sub line) = $[X]
Tax ([GST/VAT]):                            = $[X]
─────────────────────────────────────────────
Total:                                       $[X] – $[Y]
```

Then add **one** caveat line. Pick the right one:

- *"Locked-in price if the weatherboards behind the rotted ones
  are sound. If we find more rot we'll stop, photograph it, and
  give you the option (re-quote for the wider section, or stop
  where we are and you organise the rest)."*
- *"This is a fixed quote — no surprises."* (only when you can be
  sure — e.g. an obvious door rehang on a recent build)
- *"Quote assumes the substrate underneath is sound. If it's
  rotted to the framing, that's a structural call and goes back
  to you for a wider quote."*
- *"Quote based on the photo. If the actual condition is different,
  we'll let you know within 30 minutes of arriving and you choose
  whether to proceed."*

## Job-type specifics (use these typical ranges, override with BUSINESS CONFIG)

| Job | Typical AU range | UK range | US range | Notes |
|---|---|---|---|---|
| Door rehang (internal) | $250-450 | £200-400 | $250-500 | Quick if frame is square; sub the door if you're not on tools that day |
| Replace 2-4 weatherboards | $450-900 | £300-800 | $400-900 | Plus paint touch-up = +$150 or note as separate |
| Deck board replacement (5-10 boards) | $400-800 | £300-700 | $350-800 | Same timber species if matching; sub-grade if a Bunnings job |
| Single room paint (walls only) | $600-1,200 | £400-1,000 | $500-1,200 | Strong upsell for ceiling +$200, trim +$200 |
| Fence section repair (1 panel) | $300-600 | £200-500 | $250-500 | Excludes paint/stain |
| Single window swap (like-for-like) | $850-1,800 | £600-1,400 | $700-1,800 | Excludes any reframing if rotted sill |
| Roof tile replacement (1-5 tiles) | $250-600 | £200-500 | $250-550 | Or sub the roofer — assess if you're ladder-comfortable |
| Gutter section + downpipe | $400-900 | £300-700 | $350-850 | Better in a quiet week — annoying scheduling otherwise |
| Patch plaster + paint (hole repair) | $300-600 | £200-500 | $250-550 | Quote a 24hr buffer for drying time |
| Replace 1 internal door + handle set | $400-800 | £300-700 | $400-800 | Excludes architrave if it needs replacing |
| Fix sticking door / adjust hinges | $180-350 | £150-300 | $150-350 | 1-hr job for a competent carpenter |
| Repair pergola post / replace 1 | $450-900 | £350-800 | $400-900 | Engineer call if structural in any way |
| Skirting replacement (1 room) | $400-800 | £300-700 | $350-800 | Excludes paint |

## Client-facing send (email — projects + most small jobs)

```
Subject: Quote for [job summary] at [address]

Hi [name],

Here's the quote for [job summary]:

| Item                                | Detail              | Amount    |
|---|---|---|
| Labour                              | [X] hrs at $[Y]/hr  | $[X]      |
| Materials                           | [itemised below]    | $[X]      |
| Skip / disposal                     | if needed           | $[X]      |
| [Tax]                               | [included / +]      | $[X]      |
| **Total**                           |                     | **$[X]**  |

Materials breakdown:
- [item 1 — e.g. "4x cedar weatherboards 150mm"]: $[X]
- [item 2 — e.g. "primer + finish coat 1L"]: $[X]
- [item 3 — e.g. "fixings + sundries"]: $[X]

Caveat: [one of the standard caveats above]

Time-window: I can be there [option 1: day, AM/PM] or [option 2:
day, AM/PM].

What's included:
- All labour for the scoped work
- Standard materials
- Disposal / make-good of the immediate area
- 6-month workmanship warranty on the repair

What's NOT included:
- Wider repair if we find unexpected rot / damage (quoted
  separately as a variation)
- Painting beyond touch-up of the immediate area (separate quote)
- Council notification (not required for this scope)

Reply with the time-window that suits and I'll book it in. 50%
on completion, 50% by EFT within 7 days, or full payment by EFT
on the day — your call.

Thanks,
[your name]
[Business name]
[Builder licence #]
[ABN / VAT / EIN]
[Insurance: PL $[X], [insurer]]
```

## Client-facing send (SMS — only for the smallest jobs)

For sub-$1k repairs that need a quick turnaround:

```
Hi [name] — quote for [job summary] at [address]:

Labour: $[X] (~[X] hrs)
Materials: ~$[X]
Total: $[X]–$[Y] incl. [tax]

Caveat: [short version of caveat]

Available [day] AM or [day] PM. Reply with your pick to book.

— [your name], [Business name]
```

## Hard rules — auto-rewrite if violated

- **Always include** labour + materials separately. Customers want
  to know what they're paying for.
- **Always include** tax (GST/VAT) explicitly. "Includes GST" or
  "+ GST" — not silent.
- **Always include** at least one time window.
- **Never quote** below BUSINESS CONFIG minimum charge (most
  builders set ~$250-450 minimum — anything less is loss-making
  once travel + paperwork is counted).
- **Never quote** outside service area without a travel surcharge.
- **Never quote** anything in BUSINESS CONFIG → "Work you DON'T do"
  — decline politely.
- **Never quote** anything that requires council approval as a
  small job. The approval pathway alone makes it a project (use
  `03-quote-project.md`).
- **Always caveat** unknowns. "Subject to the substrate being
  sound" is not weasel-talk — it's professional honesty.
- **Always include** the 6-month workmanship warranty (or whatever
  is in BUSINESS CONFIG; never less than what the law requires —
  AU Australian Consumer Law has implied warranties regardless of
  what your quote says, so be explicit).
- **No emoji** unless the BUSINESS CONFIG voice asks for it.
- **Banned phrases** from BUSINESS CONFIG → silent rewrite.

## When the small job is actually a project in disguise

Watch for these signals:

- "While you're here, could you also look at the kitchen..."
- "It's a small leak in the bathroom, but the wall feels soft"
- "Just patch the hole in the ceiling — water was coming through"
- "Replace the rotted weatherboard, but the whole wall might need
  doing"

In every case: the SMALL job (the immediate repair) is fine to
quote as a small job, but the LARGER conversation needs to start.
Reply pattern:

```
Happy to do the [small job] as quoted. Quick flag — what you've
described could also be the front edge of something larger:

- "Soft wall" usually means moisture has been getting in for a
  while. Worth pulling a sheet off to inspect the framing.
- "Whole wall might need doing" is a different conversation — do
  you want me to do an inspection (separate $X visit, 60 mins)
  and quote the wider scope?

Either way, the small repair as quoted stands. Let me know which
you want to start with.

— [your name]
```

This is how small jobs become long-term clients. Don't try to
upsell aggressively. State what you see, offer the inspection,
let them choose.

## Reading the learnings.md before quoting

Open `learnings.md`. If:
- "Small jobs / handyman" is a "Win — push" → quote competitively
  to fill gaps in the calendar
- "Small jobs / handyman" is "Margin thin" → quote at the floor
  or decline if your project pipeline is full
- The address suburb is in the "Drive-time poor" notes → add the
  travel surcharge per BUSINESS CONFIG
- The client type (homeowner / property manager / commercial) has
  notes → apply them
- Past client referral → mention the past project in the reply
  ("good to hear from someone [past client] sent on")

## Outputting the internal record

For each quote sent, save in context:

```
QUOTE #<n> — <timestamp>
Lead:        LEAD #<n>
Job type:    <small job: door rehang / weatherboard repair / paint /
              etc.>
Quote sent:  $<low> – $<high>
Time est:    <hrs / days>
Channel:     <SMS | email>
Time slot 1: <day, window>
Time slot 2: <day, window>
Status:      <awaiting reply | booked | declined>
```

## Confirm + handoff

Tell the user (you, the operator):
> *"Small-job quote sent: $X for [job summary]. Two time slots
> offered. I'll watch for the reply and load `04-dispatch.md` when
> they confirm."*

If reply doesn't come within 48 hours, prompt the user to send a
nudge:

> *"Hey [name], just bumping the quote from Friday — still keen?
> Same windows are open."*

After two follow-ups, mark the lead as `lapsed` in the weekly
report and move on. Don't chase a third time on small jobs — your
time is better spent on the project pipeline.
