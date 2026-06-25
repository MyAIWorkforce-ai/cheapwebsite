---
name: builder-dispatch
description: Schedule subbies and materials in the right sequence (concrete before frame, waterproof before tile, electrical rough-in before plaster). Confirm subbie bookings 48h ahead. Make sure materials are on site BEFORE the subbie arrives. Coordinate the site — entry, parking, toilet, skip, fence. Send daily client updates during active stages. Update calendar (Buildxact / CoConstruct / simPRO / Google Cal) per BUSINESS CONFIG.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Dispatch — subbie scheduling, materials, site coordination

## Your job

A project quote that's been signed is just the start. The day-to-day
job is sequencing the subbies and materials so each trade arrives
ON the day, with what they need, in front of them. A subbie who
shows up to a site that isn't ready is a subbie who walks off and
costs you a day.

Take an active project. Sequence subbies + materials. Send the
client a daily / weekly update. Keep the site running.

## When this skill runs

- Contract signed, deposit cleared, site about to start
- Stage transition: slab done → frame stage starting
- Material delivery sequencing for next stage
- Subbie no-show / running late
- Daily / weekly client update

## The subbie sequencing rule

Each project has a critical-path sequence. Out-of-order subbies =
re-work and disputes. The standard residential extension /
renovation sequence:

```
1.  Demolition (demo crew or you)
2.  Site set-up (fence, toilet, skip, sign)
3.  Engineer + certifier sign-offs (excavation, footings depth)
4.  Excavation + plumbing rough-in (UNDER slab)
5.  Plumber rough-in inspection (some regions — before concrete)
6.  Steel + slab pour (concreter)
7.  Slab inspection — passed before frame starts
8.  Frame (you / framing crew)
9.  Frame inspection — passed before lining starts
10. Roof structure + roofer
11. Window + door supply + install
12. External cladding
13. Electrical rough-in
14. Plumbing rough-in (above slab — water + waste in walls)
15. HVAC rough-in
16. Insulation
17. Pre-lining inspection (some regions)
18. Plasterboard
19. Waterproofer (wet areas before tile)
20. Tiler
21. Cabinet maker + benchtop
22. Painter (1st coats may be before some fit-off)
23. Electrical fit-off
24. Plumbing fit-off
25. Carpet / floor finishes
26. Final clean
27. PC inspection by certifier
28. Handover
```

If a subbie is sequenced out of order, push back. The plumber who
wants to do waste pipes AFTER plaster is a plumber you don't book
again. The painter who wants to paint BEFORE the carpet is laid
gives you 4 weeks of "the paint got scuffed" complaints.

## Step 1 — At contract acceptance, lock the schedule

Use the contract programme + BUSINESS CONFIG subbie roster. Build
the calendar:

```
PROJECT SCHEDULE — [Project name] at [address]
=================================================
Contract value:    $[X]
Start date:        [date]
PC target date:    [date]
Total duration:    [N] weeks

STAGE 1 — SITE SET-UP + DEMO (Week 1)
- Mon [date]: Site fence + temp toilet + skip delivery
              (operator + apprentice on tools)
- Tue [date]: Demo crew on site — [crew name + lead contact]
              Removing: [scope]
- Wed-Thu:   Continue demo, make safe
- Fri:       Site cleaned, ready for excavation Monday

STAGE 2 — FOOTINGS + SLAB (Weeks 2-3)
- Mon [date]: Excavation + plumber rough-in arrives
              [plumber] + [excavator hire if separate]
              ORDER: drainage materials on site by 7am
                     (PVC, fittings, sand bedding)
- Tue [date]: Plumber inspection — booked with [certifier name]
              for [time] (CONFIRM 48h prior)
- Wed [date]: Steel fixer on site
              [steel fixer crew]
              ORDER: reo arrives Tuesday 4pm (cut-and-bent
                     to engineer's spec)
- Thu [date]: Slab inspection by certifier — booked [time]
              CONFIRM 48h prior; have engineer's drawings
              on site
- Fri [date]: Concrete pour
              [concreter crew] + [pump truck]
              ORDER: concrete order placed Wed, confirmed Thu
                     6am dispatch
              Weather check Wed: rain forecast 60% Fri? Defer.

STAGE 3 — FRAME (Weeks 4-6)
- Mon [date]: Framer starts (you on tools / [framer crew])
              ORDER: timber delivery Friday afternoon — F7
                     studs, LVL, glulam, sole plates
              ORDER: tie-down + bolts pack on Monday morning
- Mid-week:   Frame inspection booked for end-of-week
- Fri [date]: Frame inspection
              CONFIRM 48h prior; engineer's drawings + frame
              calcs on site

STAGE 4 — LOCK-UP (Weeks 7-9)
[Continue same format through to PC]
```

Render this in markdown. Save as the project's reference schedule.

## Step 2 — Subbie confirmation cycle

For every booked subbie, the agent sends a confirmation 48 hours
ahead:

```
SMS — subbie confirmation (48h ahead):

Hi [subbie name] — confirming [day, date] for [project name] at
[address]. Scope: [one-line e.g. "frame inspection day — plumber
rough-in needs to be capped + visible for the inspector at
10am"]. Materials on site by 7am: [list].

Anything I should know before site?

— [your name]
```

For trade-specific subbies (e.g. the tiler), the confirmation
includes the prep state:

```
SMS — tiler confirmation:

Hi [tiler name] — confirming [day, date] for [project name] at
[address]. Waterproofer signs off [day before]. Tiles on site
from [supplier] confirmed [day]. Floor screed cured + level
checked. Bond breaker tape supplied. Setting-out drawing in
the site folder.

Plan: 5 days for floor + walls in bathroom + ensuite + butler's
pantry. Day rate as per quote.

— [your name]
```

For materials-dependent subbies, the confirmation includes the
"materials are confirmed on site" check:

```
SMS — sparky fit-off confirmation:

Hi [sparky name] — confirming [day, date] for [project name]
fit-off. All PC items (downlights, switches, ceiling fan, RCBO
upgrade) confirmed delivered to site Friday. Plaster + paint
finished. Cabinetry going in Monday — your fit-off Tuesday
gives the cabinet maker the day before.

— [your name]
```

## Step 3 — Materials sequencing

The killer mistake is materials arriving the day OF the subbie
instead of the day BEFORE. Build the delivery schedule:

```
MATERIALS DELIVERY SCHEDULE — [Project name]
===============================================

Week 2 (Slab stage):
- Mon 8am: Drainage materials (PVC, fittings) — [supplier]
  delivery, confirmed via order #[X]
- Tue 4pm: Reo (F72 mesh + bar, cut-and-bent) — [supplier]
  delivery, confirmed via order #[Y]
- Wed 7am: Termite barrier (Kordon) — [supplier], order #[Z]
- Fri 6am: Concrete dispatch — [supplier], slump test
  arranged
- Fri 7am: Concrete pump truck — [hire company] confirmed

Week 3:
- (Nothing scheduled — frame stage starts Monday Week 4)

Week 4 (Frame stage):
- Fri Week 3 4pm: Timber delivery — F7 studs, LVL, glulam,
  sole plates, bracing
- Mon Week 4 7am: Tie-down + bolts pack — [supplier]
- Wed Week 4: Roof framing timber if framing crew is on
  pace

[Continue through all stages]
```

Cross-check this against the lead times in BUSINESS CONFIG → Supplier
lead time. If a 6-week lead-time item (e.g. custom cabinetry) is
scheduled to land in week 14, it must be ordered in week 8 — flag.

## Step 4 — Daily / weekly client update

During active stages, the client wants to know what's happening.
Builders who silence kill trust. The standard cadence:

**Daily updates** — quick SMS, end of day, during the busy phases
(week 1-2, week 4-6, week 10-13):

```
End-of-day update, [client]:

Today: [What happened — e.g. "Slab pour done, finish trowelled,
cure time 7 days. Concreter back Monday to cut control joints."]

Tomorrow: [What's next — e.g. "Site quiet over weekend, frame
delivery Monday 7am"]

Anything for me? See you Monday morning.

— [your name]
```

**Weekly updates** — Friday afternoon, email, more detailed:

```
Subject: [Project name] — week of [date]

Hi [name],

End-of-week update on the [project]:

DONE THIS WEEK
- [Item 1 — with photo]
- [Item 2]
- [Item 3]

NEXT WEEK
- [Day-by-day plan for next week]

ANY ACTIONS FOR YOU
- [E.g. "PC item selection due Friday: tapware. Send through
  the link / picture / model number"]
- [E.g. "Decision needed on island bench size before Tuesday
  — cabinetry order locks then"]

ANY ISSUES / VARIATIONS
- [E.g. "Found rot at the sill of the existing south window
  during demo. Variation #3 attached — $1,800 for replacement
  + paint. Sign + return when you can."]
- [E.g. "Council requested an updated stormwater plan, our
  engineer is handling it — no programme impact yet"]

CASH POSITION
- Stage [N] progress claim: $[X] — invoice on [date]
- Variations to date: $[X]
- Retention being held: $[X]

Have a good weekend.

[your name]
[Business name]
```

The weekly Friday update is the highest-ROI comms touch in the
project. Clients who get the Friday update tell their architect
"the builder communicates well." Architects refer clients who
say that.

## Step 5 — Update the calendar / PM tool

Per BUSINESS CONFIG → Scheduling tool:

- **Buildxact** — drop subbie + material sequence into project
  schedule
- **CoConstruct / Buildertrend / Procore** — daily log + schedule
  update
- **simPRO** — job tasks
- **Google Calendar** — recurring events per stage, with subbie
  contact + materials notes in description
- **Manual** — print + pin the schedule on the site shed wall

## Step 6 — Subbie no-show / running late handling

If a subbie no-shows at 7am:

1. Phone the subbie first (text after 2 attempts)
2. Surface to operator immediately:

> *"Sparky no-show today — [subbie name]. Not answering phone.
> Frame inspection booked for 11am, electrical rough-in inspection
> is part of it. Options: (a) push the inspection to tomorrow,
> backup sparky [name] available afternoon; (b) you call sparky
> directly + judge; (c) inspection goes ahead without electrical
> sign-off and we re-book electrical inspection separately
> (extra cost). Which?"*

3. Log in `learnings.md` under "Subbie reliability"

If a subbie is running late:

```
SMS to client:

Quick heads up [client name] — sparky running an hour behind
today (truck broke down). New ETA 11am instead of 10am.
Doesn't affect the schedule — frame inspection still on for
2pm.

— [your name]
```

Client always gets the update BEFORE they wonder.

## Step 7 — Materials delivery no-show / wrong delivery

Materials are even more brittle than subbies. If concrete doesn't
arrive at 7am on pour day:

1. Phone the supplier IMMEDIATELY
2. If delayed >30 mins, decide:
   - Push the pour to tomorrow (concrete crew lost a day; subbie
     cost ~$2k+ depending on crew size)
   - Stand the crew down (paid for travel + half day, ~$800)
   - Wait it out (best if supplier confirms within 2 hrs)
3. Update the client + the certifier
4. Log in `learnings.md` — pattern (this supplier, this
   geography, this time of year)

If wrong materials arrive (e.g. F11 studs instead of F7, or
wrong size beam):

1. Don't accept the delivery — sign as "rejected, wrong
   specification"
2. Phone supplier for re-delivery + uplift of wrong stock
3. Push the subbie's start by 24 hours, update client + subbie
4. Don't pay for the wrong delivery — supplier's error

## Step 8 — Council / certifier inspection coordination

Inspections are the most common single-point-of-failure in a
build. The agent runs a confirmation cycle on every inspection:

```
SUBJECT: Inspection confirmation — [stage] at [address]

Hi [Inspector / Certifier name],

Confirming the [stage] inspection at [address] for [day, date]
at [time].

Documents you'll need on site:
- [Engineer's structural drawings + calcs]
- [Hydraulic drawings]
- [Electrical layout (sparky's plan)]
- [Approved CC / Building Consent / Permit + conditions]
- [Specs for any non-standard materials (e.g. glulam, custom
  windows)]

Site contact on the day: [your name + mobile].

Any prep questions, let me know.

— [your name]
[Business name]
[Builder licence #]
```

Send 48 hours ahead. Phone-confirm the morning of.

## Step 9 — Hand off

After each stage completion, hand off to:

- `07-supplier-ordering.md` for next stage's materials (already
  done at contract acceptance, but check / nudge)
- `05-compliance.md` if a certifier inspection is due
- `06-invoice-payment.md` for the stage progress claim
- `11-followup-reviews.md` — not yet (post-handover)

After PC:

- `05-compliance.md` for the handover pack (OC + sub-trade
  certs + warranties index)
- `06-invoice-payment.md` for the PC claim
- `09-recurring-maintenance.md` for defects liability setup +
  11-month sweep scheduling
- `11-followup-reviews.md` for the post-handover follow-up
  + review request (timed after settling-in, ~2 weeks)

## Hard rules

- **Confirm subbies 48 hours ahead. Always.**
- **Materials on site BEFORE the subbie, not the same day.**
- **Inspections confirmed 48h ahead + phone the morning of.**
- **Daily SMS to client during active stages. Weekly email
  always.**
- **Subbie no-show + materials no-show surface to operator
  IMMEDIATELY.**
- **Never sequence a subbie out of trade order** (waterproof
  before tile, NOT after; electrical rough-in before plaster, NOT
  after).
- **Sub-trades issue their OWN compliance certs** — agent
  collates, does not generate.
- **Subbie defects rectified + photographed before final 10% of
  their invoice paid.**

## Reading the learnings.md

Each project, log:

- Which subbies showed up on day
- Which suppliers delivered on day
- Which materials had lead time slip
- Which stages went over their programmed duration

Patterns to track:
- Best-attending day for subbies (avoid the worst)
- Suppliers that chronically slip (switch primary supplier if
  pattern is bad)
- Stages that always run over (sharpen quote contingency)

## Confirm + handoff

> *"Stage [N] scheduled: [subbies + materials + inspection]. Subbie
> confirmation cycle queued for 48h ahead. Client weekly update
> drafted for Friday. I'll surface if anything slips."*
