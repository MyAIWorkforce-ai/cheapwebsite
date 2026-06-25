---
name: builder-defects-liability
description: Manage the defects liability period after handover. 12 months from PC, all defects rectified at no cost to client. Maintain warranty register (cabinetry / appliances / tapware / structural). Schedule and run the 11-month sweep BEFORE the defects period ends — the highest-ROI service most builders skip. Trigger retention release at 12 months. Bonus pattern for repeat clients.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Defects liability + 11-month sweep + warranties

(Internally we think of this as "defects-liability + warranty
management". The file name keeps `09-recurring-maintenance.md`
for build-script compatibility, but "maintenance contract" isn't
the right framing for builders — defects period management +
warranty register is.)

## Your job

Builders don't usually do recurring maintenance — they finish a
project and walk away. That walk-away is a mistake. The 12-month
defects liability period is BOTH a legal obligation AND the
single highest-ROI service most builders never fully exploit.

Run three things across every handed-over project:

1. **Defects rectification on demand** — for 12 months from PC,
   any defect raised by the client gets responded to within 48h
   and rectified at no cost
2. **11-month sweep** — proactive visit 11 months after PC to
   catch any small issues before the defects period ends. This
   is the highest-leverage repeat-work touch in the business
3. **Retention release** — at month 12, after the sweep, release
   the 5% retention

## Why this matters (the unloved goldmine)

Most builders do (1) reluctantly and skip (2) and (3) entirely.

Builders who DO the 11-month sweep get:

- 90%+ retention payment on time (vs ~30% for builders who skip
  the sweep and have to chase clients who've forgotten)
- 40%+ conversion to repeat work (kitchen reno on a property
  you built, a granny flat addition, the loft conversion next)
- 60%+ five-star reviews on the project as a whole (because the
  defects sweep proves you stand behind the work)
- Architect referral velocity 2-3× higher (architects love a
  builder who looks after the client post-handover; they recommend
  for life)

This skill is where the long tail of the business compounds.

## Step 1 — At handover, set up the defects period

When `05-compliance.md` issues the handover pack, this skill
calendars:

```
DEFECTS LIABILITY PERIOD — [Project name]
==========================================
Client:           [name]
Project:          [name + scope summary]
Property:         [address]
Practical Completion (PC) date: [date]
Defects period ENDS: [date — 12 months from PC]

KEY DATES (auto-scheduled)
- Day +14: Settling-in check (SMS) → `11-followup-reviews.md`
- Day +30: First defects walk (SMS — "any issues yet?")
- Month +3: Quarterly relationship touch (SMS)
- Month +6: Half-way defects touch (SMS)
- Month +9: 90-day-to-end nudge ("we'll be in touch about the
              sweep next month")
- Month +11: 11-MONTH SWEEP visit booking
- Month +12: Retention release request (if sweep complete + clear)

WARRANTY REGISTER (from handover pack)
- Structural / workmanship: 12-month full defects period; then
  [region statutory] structural period (AU 6.5 yrs HBA, NZ
  Master Build 10 yrs, UK NHBC 10 yrs, US implied 10 yrs, CA
  Tarion 1/2/7)
- Materials per manufacturer (cabinetry 7y, bi-folds 7y, glass
  10y, roof 25y, paint 5y, tapware 10y, appliances 2-5y)

CLIENT CONTACT
Primary:          [name, mobile, email]
Preferred channel: [SMS / email — from project record]
Site contact (if commercial): [property manager / FM]
```

## Step 2 — Defects on demand (within 48h response)

When a client emails or texts about a defect, the agent:

1. Acknowledges within 4 hours (always)
2. Triages the defect (is it ours? warranty-covered? our trade
   or a sub-trade?)
3. Surfaces to operator with a recommended response

```
DEFECT REPORT RECEIVED — [Project name]
========================================
Client:          [name]
Date raised:     [date]
PC date:         [date — months since]
Within defects period? [Yes / No (then warranty-only)]

DEFECT
Description:     [from client message]
Photo:           [if provided]
Location:        [room / element]
Severity:        [minor / medium / major / urgent]

TRIAGE
Is it ours?      [Yes / No / Investigation needed]
Trade involved:  [carpentry / electrical / plumbing / paint /
                  HVAC / waterproofing / cabinetry / tile]
Likely cause:    [settlement / workmanship / materials / wear /
                  client-caused]
Within warranty? [Yes — within 12-mo defects period]

RECOMMENDED RESPONSE
- [E.g. "Schedule sparky (Tewksbury) to look at it next Wed
  morning — likely a loose connection on the downlight in the
  hallway. No cost to client."]

CLIENT REPLY DRAFT
"Hi [client name] — got it, thanks for letting me know. Looks
like [issue]. [Sparky / I / [Plumber]] will be there [day, time]
to sort it. No cost to you — that's what the defects period is
for. I'll confirm the time by SMS [day before].

— [your name]"
```

Surface to operator for sign-off before sending — keeps the
relationship warm + the operator informed.

### Common defects in the first 12 months

| Defect type | Frequency | Likely cause | Action |
|---|---|---|---|
| Door sticks (in first summer) | Very high | Timber expansion | Plane + re-paint |
| Plaster hairline cracks | Very high | Building settlement | Filler + paint touch-up after 6 months (let it settle first) |
| Cabinet door alignment | High | Settling + use | Adjust hinges / runners |
| Paint touch-ups | High | Marking from settling-in | Touch up |
| Squeaky floor / loose skirting | Medium | Timber drying out | Tighten / re-fix |
| Tile grout small cracks | Medium | Movement | Re-grout small sections |
| Bi-fold / sliding door stiffness | Medium | Use + dust | Lubricate rollers + hinges |
| Tapware aerator clog | Low | Mineral build-up | Clean (client task usually) |
| Roof leak | Low (but serious) | Flashing / cap issue | Roofer return immediately |

The agent has trade response defaults per defect type. For
sparky / plumber defects, hand to the relevant sub-trade (they
issued the cert; their defect period extends to the project's).

### When it's NOT a defect

Some "defects" raised by clients aren't actually defects:

- Wear and tear (paint marked from furniture, scuff on bench from
  knife)
- Damage from misuse (water left running, broken handle from
  yanking)
- Normal settlement (cracks <1mm in first year, very common)
- Issues caused by 3rd-party work after handover (the painter
  the client hired touched the cabinet door + scratched it)
- Cosmetic preference (the colour reads differently in real
  light than the swatch)

The reply needs to be kind but clear:

```
"Hi [client name] — appreciate you flagging this. Had a look at
the photo. [Honest assessment, e.g.: "The small mark on the
benchtop near the sink is impact damage — looks like something
dropped on it. That's not a defects-period item under the
contract; it's a use / wear thing. Happy to recommend a
benchtop repair specialist if you'd like."]

If you think I've read it wrong, give me a call and we can
talk through it. No pressure either way."
```

Honesty maintains trust. Over-fixing things that aren't defects
trains the client to raise everything as a defect.

## Step 3 — Quarterly relationship touch

At month +3, +6, +9, send a light-touch SMS:

```
Month +3 touch:

Hi [first name] — [your name] from [Business name]. Quick
check-in — [first season since handover] been kind to the
[project, e.g. "new extension"]? Anything come up you'd like me
to look at?

The defects period runs til [date — month 12]. I'll be in touch
about the 11-month sweep in a few months.

— [your name]
```

Each touch is also a planted seed for repeat work. "Anything else
on your mind for the property?" surfaces the kitchen reno that
might be next year.

## Step 4 — The 11-month sweep (the gold)

At month +10.5 to +11, book the sweep visit:

```
SUBJECT: 11-month inspection — [project] at [address]

Hi [client name],

It's been just under 12 months since we handed over the [project]
at [address]. As discussed at handover, I do an 11-month inspection
before the defects period ends — catching anything small before
the warranty window closes.

I'd like to visit on [day, date] or [day, date] for ~90 mins. I'll
walk the property with you (or alone if you can't make it), check
the items below, photograph anything that needs attention, and
rectify on the day where possible (smaller items) or schedule
within 2 weeks (anything bigger).

WHAT I'LL CHECK
- Doors + windows (operation, weather seals, fixings)
- Walls + ceilings (settlement cracks, plaster, paint, cornice)
- Wet areas (waterproofing visible signs, tile, grout, silicone)
- Cabinetry (door alignment, hinges, runners, handle fixings)
- Floors (squeaks, skirting, transitions)
- Roof + gutter (visual external)
- Exterior cladding + windows (any movement / staining / sealant)
- HVAC (operation + filter check)
- Smoke alarms (test)
- Anything you've noticed but haven't raised

WHAT HAPPENS AFTER
- Items rectified on the day (or scheduled within 2 weeks)
- I issue a written sweep report + photos
- We agree the defects are settled
- I send the retention release request (the final 5% of contract
  value held for 12 months — $[X])
- That's it; you're set with the [region statutory] structural
  warranty + manufacturer warranties on materials

Reply with which date works.

Thanks,
[your name]
[Business name]
```

On the day of the sweep:

```
SWEEP CHECKLIST — [Project] at [address]
==========================================
Date:           [date]
Walked with:    [client / alone]

INSIDE
☐ Each room: door operation, paint, plaster, skirting, floor
☐ Each wet area: waterproof visibility, silicone, tile, grout,
   tapware function, drain function
☐ Cabinetry: door alignment, hinges, runners, kitchen + bath
☐ Light fixtures: all working, no flickering, dimmers functioning
☐ Power: all outlets tested
☐ HVAC: heating + cooling tested, filter inspected
☐ Smoke alarms: tested
☐ Hot water: temperature check at fixture
☐ Storage / cupboards: doors aligned, shelves secure

OUTSIDE
☐ Roof: visual from ground (binoculars OK)
☐ Gutter: clear, no overflow stain
☐ Downpipes: connected, no leak
☐ External cladding: no movement, no stain, no fixing pull-out
☐ External windows + doors: operation, weather seal
☐ Decking / pergola: no movement, no rot, fixings secure
☐ External tap + drain points: function
☐ External lighting: function

SUB-TRADE FUNCTIONS
☐ Electrical: any odd behaviour reported by client?
☐ Plumbing: any pressure / temperature issues?
☐ HVAC: any noise / performance issues?

ITEMS FOUND
| # | Location | Item | Action | Done on day? | Scheduled for |
|---|---|---|---|---|---|
| 1 | Main door | Sticking on warm days | Plane + paint | No | Next Tuesday |
| 2 | Main bath grout | Hairline cracks at corners | Re-grout section | Yes |  |
| 3 | Bi-fold panel 2 | Stiff slide | Lubricate roller | Yes |  |
| 4 | Cabinet under sink | Hinge slightly loose | Tighten | Yes |  |
| 5 | Lounge wall | Settling crack 0.5mm | Filler + paint (next year if stable) | No | Mark for 18-mo check |

CLIENT NOTES
[Anything client raised — keep, paraphrase]

PHOTOS
[Folder link]

NEXT STEP
[List of items + dates for any not done on day]
[Retention release request raised — see `06-invoice-payment.md`]

SIGNED OFF BY CLIENT (sweep walk-through):

___________________________________
[Client name]
Date: [date]
```

## Step 5 — Sweep report to client

After the sweep, send the report + retention release request:

```
SUBJECT: 11-month inspection report — [project] at [address]

Hi [client name],

Thanks for the time today. Quick report on the inspection +
next step.

ITEMS RECTIFIED ON THE DAY
- [list]

ITEMS SCHEDULED FOR NEXT [period]
- [list with date]

ITEMS WE'RE LEAVING ALONE (because they're stable wear / settling)
- [list with reasoning]

OVERALL ASSESSMENT
[E.g. "Property is in great condition for 11 months. The settling
cracks in the lounge are typical for a new extension and not
worth filling yet — better to leave another summer then touch up.
The bi-fold panel 2 stiffness is solved with the lubrication today."]

WARRANTY GOING FORWARD
The defects period ends [date — month 12]. After that:
- Structural warranty: [region statutory, e.g. 6.5 years from
  practical completion under NSW Home Building Act]
- Material warranties: per manufacturer (see your handover pack
  warranties index)
- I'm always reachable if you need to know what's covered or
  who to call

RETENTION
The 5% retention ($[X]) held since PC is now due back. Invoice
attached.

If anything new comes up between now and [date — month 12], let
me know — still covered. After that, the structural warranty takes
over.

Thanks for trusting us with the project.

[your name]
[Business name]
```

## Step 6 — Retention release

Hand off to `06-invoice-payment.md` for the retention release
invoice. Calendar the next year's structural warranty + any
manufacturer warranty expiries.

## Step 7 — Repeat-work surfacing

During the sweep visit, the client often mentions other ideas
("we've been thinking about the front yard / the bathroom is
showing its age now / what would a granny flat cost"). The sweep
is a relationship moment, not a hard sell.

```
SWEEP CONVERSATION NOTES
- Client mentioned: [bathroom reno of main bathroom in 18 months]
- Client mentioned: [potential granny flat for elderly parent]
- Client mentioned: [neighbour interested in similar extension]
- Action: file in CRM, follow-up in 3-6 months at relationship
  cadence
- Action: thank-you SMS to client a week after sweep
```

These planted seeds turn into 30-40% of the project pipeline over
the next 12 months.

## Special case — body corp / strata projects

For strata / body corp common-area work, the defects period
works the same but the client is the strata manager, not a
homeowner. Adjust:

- Sweep visit booked with strata manager, not residents
- Sweep report goes to strata manager + the OC committee
- Retention release goes to the strata account
- Common defects: settling, façade work, common-area paint —
  often noticed by residents, raised by strata manager

## Special case — owner-builder + labour-only

If you were on a labour-only basis (the homeowner was the
"builder" of record), the defects liability is different. The
warranty is typically only on YOUR scope (your hours + your
specific trade work), not on the whole project. Adjust the
sweep accordingly — only sweep YOUR scope.

## Special case — commercial fit-out

For commercial (office fit-out, retail fit-out), the defects
period is usually 12 months. But the warranty register is
heavily focused on:

- HVAC (commercial systems have higher fault rate)
- Lighting controls + smart building systems
- Floor systems (carpet tiles, vinyl, polished concrete)
- Joinery
- Glass partitions
- Fire systems (annual inspection often goes to a separate
  contractor)

Sweep is run with the FM / building manager, not the tenant.

## Hard rules

- **Calendar the sweep at handover. No exceptions.** Lost
  retention + lost repeat work = thousands of dollars per
  project.
- **Defects responded to within 48h, always.** Set the standard.
- **Photos always.** Both at the defect report AND at the
  rectification.
- **Sub-trade defects sent to the sub-trade FIRST, not absorbed
  by the builder.** Sparky's issue = sparky's return at the
  sparky's cost (under their cert + warranty).
- **Honest about non-defects.** Misuse / wear / settling = not
  ours.
- **Retention release tied to sweep completion.** Builder pays
  themselves at the right time.
- **Sweep is also a relationship visit.** Never sell, but plant.
- **Insurance event during defects period** (storm, fire) is
  NOT a defects issue — it's an insurance event. Route to
  insurance, don't absorb.

## Reading the learnings.md

Track on each project's defects period:

- Defects raised count (first 30 days, first 90 days, 11-month
  sweep)
- Top 3 defect types (drives future quote contingency +
  workmanship focus)
- Sweep conversion to repeat work (target: 35-50%)
- Time-from-defect-raised to rectified (target: <2 weeks)
- Subbie defect attribution (which subbies' work defects most)
- Retention release timeliness (target: 100% on time)

## Confirm + handoff

> *"Defects + sweep schedule loaded for [project]: 14-day check, 30-day
> walk, quarterly touches, 11-month sweep targeted [date], retention
> release invoiced [date + 1 week]. I'll surface each milestone."*
