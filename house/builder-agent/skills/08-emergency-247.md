---
name: builder-site-incident
description: Site incident + urgent client handling. Builders' emergencies aren't burst-pipe callouts — they're water damage from rain on a half-built house, theft from site, neighbour complaints + council orders, subbie no-show on a critical-path day, missed materials delivery. Safety first, comms second, programme impact third. Insurance + photos always.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Site incident + urgent client

(Internally we think of this as "site-incident + urgent client".
The file name keeps `08-emergency-247.md` for build-script
compatibility.)

## Your job

Builders don't get the same kind of 2am emergencies as plumbers or
electricians. Their emergencies are slower-moving but bigger:

1. **Site incident** — something has happened on the build that
   threatens the site, the people, or the structure
2. **Urgent client** — something has happened that requires the
   client to respond urgently (council order, neighbour complaint,
   insurance event)
3. **Critical-path failure** — a subbie didn't show, materials
   didn't arrive, an inspection failed, weather killed the pour

Each one is different. The agent triages, advises on the safety /
insurance / comms response, then runs the programme + client comms.

## Triage rules

| Signal | Classification | Action |
|---|---|---|
| Worker injured on site | EMERGENCY | Call ambulance / 000 / 911 / 999. Then call your work cover authority (WorkSafe / OSHA / HSE / WSIB). Do NOT move the worker unless in further danger. Photo the scene only after EMS clear it. |
| Structural collapse (frame, scaffold, beam) | EMERGENCY | Evacuate site. Call council emergency line + your engineer. Don't re-enter until cleared. |
| Fire on site | EMERGENCY | Evacuate. Fire brigade. Then insurance claim. |
| Major water ingress (storm, burst on rough-in) on half-built structure | URGENT (hrs not days) | Tarp + pump + sandbag if reachable. Document. Then full mitigation. Insurance claim. |
| Theft from site (tools, materials) | URGENT (within 24h) | Police report (insurance requires it). Inventory. Insurance claim. Replace blockers from supplier. |
| Council order / Stop-work notice | URGENT (response within hours) | Read the order carefully. Comply immediately. Don't argue with the inspector on site — get the order in writing, then respond formally. |
| Neighbour complaint (noise, mess, damage to fence) | URGENT (within 24h) | Direct conversation + photo evidence. Don't escalate to council yourself. |
| Subbie no-show on critical-path day | URGENT (within hours) | Phone subbie. Phone backup subbie. Decide: defer, re-sequence, or eat the delay. Update client. |
| Materials no-show on critical-path day | URGENT (within hours) | Phone supplier. Decide: substitute (engineer sign-off if structural), defer, or get from secondary supplier. Update client + subbie. |
| Concrete pour weather risk | URGENT (within hours, before pour scheduled) | Check forecast morning of. If high rain risk, defer. Concrete + crew costs money to defer; concrete + rain costs more. |
| Failed inspection | URGENT (re-book ASAP) | Read failure list. Rectify. Re-book inspection. Update programme + client. |
| Asbestos discovered during demo | URGENT (stop all work in area) | STOP work. Cordon area. Engage licensed asbestos contractor (separate ticket). Update client + variation. |
| Hidden defect found (rotted framing, undersized footing, termite damage) | URGENT (work continues, conversation needed) | Photo. Stop relevant trade. Quote variation. Discuss with client + engineer. Get sign-off before continuing. |
| Insurance event at client's home (storm damage during build phase) | URGENT (within hours) | Tarp + secure the build. Client lodges insurance claim. We coordinate the make-good. |
| Client cash flow problem ("I can't make this progress claim") | URGENT (response same day) | Direct call from operator. Listen. Don't issue legal letter. Discuss options. |
| Architect / certifier RFI urgent (e.g. before tomorrow's inspection) | URGENT (response same day) | Pull the requested document. Send it. Don't ignore. |
| Routine slip (delay 1-2 days, no critical-path impact) | NOT URGENT | Update programme. Notify client at next weekly update. |

## Step 1 — Safety + structure (do this first)

For anything safety-critical (worker injury, structural collapse,
fire, gas leak on site, electrical hazard, asbestos), the first
response is:

1. **Make the situation safe.** People before property.
2. **Call the right emergency service** before anything else:
   - Worker injury: 000 (AU) / 111 (NZ) / 999 (UK) / 911 (US/CA)
   - WorkSafe / OSHA / HSE / WSIB notification (statutory in
     most regions — within 24h for serious injury)
   - Engineer for structural concern (the engineer who designed
     it)
   - Gas utility emergency line if gas (AU 1800 GAS LEAK / NZ
     0800 FIRSTGAS / UK 0800 111 999 / US 911 + utility / CA
     utility)
3. **Photograph the scene** (after EMS clears, before clean-up)
4. **Don't touch / move / disturb** until the right party has been
   on site

## Step 2 — Document EVERYTHING

For ANY site incident, before doing anything else (except the
above safety step):

- Photograph everything from multiple angles
- Write a contemporaneous note (date + time + what happened + who
  was present + what was said by whom)
- Get witness names + contacts if anyone else was there
- Don't post anything on social media
- Don't admit fault verbally — that's for the insurer / lawyer to
  decide

This documentation IS the insurance claim. Build it on the day.

## Step 3 — Insurance claim (within 24-48h)

For anything insurance-relevant (theft, water damage, fire, third
party damage, worker injury):

```
INSURANCE CLAIM NOTE — [Project name]
=======================================
Event date + time:       [exact]
Event type:              [theft / water / fire / TP damage / worker
                          injury / structural]
Site:                    [address]
What happened:           [one paragraph, factual]
Who was on site:         [names + roles]
Witnesses:               [names + contacts]
Photos taken:            [link / count]
Police report ref:       [if applicable]
Material loss / damage:  [estimate $]
Programme impact:        [days delay]
Insurer:                 [name, policy #]
Claim lodged:            [date + claim #]
Assessor due:            [date]
Builder action:          [tarp / make safe / re-procure / etc.]
```

Three insurance policies typically apply to a builder:

- **Public liability** — third party damage / injury (the
  next-door fence falling on a neighbour's car)
- **Construction works / Builder's risk** — damage to the
  building under construction (storm damage to a half-built
  house)
- **Workers compensation / Employer's liability** — workers
  injured on site

Lodge the claim against the right policy. Send the documentation
within 48 hours.

## Step 4 — Client comms

The client always finds out. The question is whether they find
out from you (good) or from a neighbour / passing-by / news
(catastrophic).

Call the client BEFORE you call anyone else (after safety + 000
if applicable). Within 1 hour of incident. Phone, not email.

```
CALL SCRIPT — site incident to client:

"[Client name], it's [your name] from [Business name]. Bad news
— [one-sentence summary]. Everyone's safe / [if not, what's
happening] / engineer's on the way / police called.

Here's what we're doing right now:
- [Action 1 — e.g. tarp + sandbag the open frame]
- [Action 2 — e.g. lodge insurance claim today]
- [Action 3 — e.g. re-book the next stage's subbies]

Programme impact: [honest assessment — e.g. "looks like 3-5
days delay assuming the engineer signs off Tuesday"]

I'll send a written update by [time today] with photos + next
steps. Want to come to site? Happy to walk you through it."
```

Follow up within hours with the written version:

```
Subject: Site incident at [address] — written update

Hi [client name],

Following our call this morning. Bad news + the plan, in writing.

WHAT HAPPENED
[Factual paragraph]

WHAT WE'VE DONE TO MAKE IT SAFE
- [Action 1]
- [Action 2]
- Photos attached

INSURANCE
- Lodged claim with [insurer] this morning, claim #[X]
- Assessor due on site [date]
- This is covered under our [public liability / construction
  works / builder's risk] policy

PROGRAMME IMPACT
- Original PC target: [date]
- Revised PC target: [date] ([N] days delay)
- Reason: [E.g. "frame needs reinforcing + the engineer's
  sign-off plus re-booking the framing crew"]

NEXT STEPS
- [Day 1: ...]
- [Day 2-3: ...]
- [Week 2: ...]

COST IMPACT
- [Variation will be issued for any client-side cost increase,
  with cost recovery from insurance shown]

I'll call again [day] with progress. Any questions, call any time.

[your name]
```

Honest communication wins clients for life. Spin loses them.

## Step 5 — Council order / Stop-work notice

Council inspectors can issue a Stop-Work Notice on the spot. It's
a legal order. Don't argue on site; comply.

```
COUNCIL ORDER RESPONSE — [Project name]
=========================================
Order issued:        [date + time]
Council / Authority: [name]
Inspector:           [name + contact]
Order type:          [Stop work / Show cause / Improvement notice /
                     Restoration order]
Order reason:        [from the written notice — e.g. "work
                     proceeding beyond approved DA scope"]
Order requirements:  [what we must do — e.g. "cease work in zone
                     X; provide updated drawings showing as-built
                     vs approved; respond within 14 days"]

OUR RESPONSE PLAN
- Today: Stop work in the area covered by the order
- Tomorrow: Phone the inspector (NOT to argue — to understand
  the path back to compliant work)
- This week: Compile the documentation requested
- Submit formal response within order timeline

CLIENT NOTIFICATION
- Phone the client today
- Written update tomorrow
- Programme impact: [estimate]

LEARNING (for `learnings.md`)
- [What we missed that triggered this. E.g. "Didn't realise the
  porch addition needed CC variation when we extended the
  cantilever beyond the DA-approved 1.2m. Next time: check
  CC dwgs vs DA dwgs before extending any cantilever beyond
  approved."]
```

## Step 6 — Critical-path subbie no-show

When a subbie no-shows on a critical-path day:

```
SUBBIE NO-SHOW — [Project name]
=================================
Date:           [today]
Subbie:         [name]
Trade:          [e.g. concreter]
Critical-path: YES — concrete pour booked for 10am; crew
                 standby; concrete dispatched 7am

CALLED: [time, 7:30am] — no answer
TEXTED: [time, 7:35am] — no reply
PRIOR INCIDENT: [check learnings.md — has this subbie no-showed
                 before?]

OPTIONS
(a) Defer pour — call concrete supplier to stand down
     - Cost: $[X] short-dispatch fee
     - Programme: 1-2 day slip
     - Risk: low
(b) Run with backup concreter [backup name]
     - Available: [check]
     - Cost: $[X] extra (higher day rate)
     - Programme: 0 days
     - Risk: medium (unfamiliar with site)
(c) Eat the half-day, do prep work, re-pour tomorrow
     - Cost: $[X] for stand-down + extra material
     - Programme: 1 day slip
     - Risk: low (we control)

RECOMMENDED: [based on learnings + cost + risk]

CLIENT MESSAGE (to send if delay confirmed):
"Quick update [client name] — concreter no-showed today. New
plan is to pour [day]; full update Friday. No major programme
impact, but wanted you to know straight away."
```

## Step 7 — Subbie defects discovered after they've left

If a subbie's work fails (waterproofing leaks, electrical
fault, plumbing pinhole) AFTER they've left and been paid:

```
SUBBIE DEFECT — [Project name]
================================
Subbie:           [name]
Trade:            [e.g. waterproofer]
Work scope:       [Bathroom waterproof + screed]
Date completed:   [date]
Date defect found: [date]
Defect:           [describe]
Photo:            [link]
Programme impact: [days]

ACTION
1. Phone subbie immediately
2. Demand return within 48h to rectify
3. Don't release final 10% of their invoice (held by BUSINESS
    CONFIG rule)
4. If subbie refuses to return: engage backup, recover cost from
    held invoice + legal recovery if needed
5. Log in `learnings.md` — this subbie's reliability rating
    drops

CLIENT MESSAGE
"Found an issue with the waterproofing in the main bathroom —
the original subbie's coming back to rectify next week. Doesn't
affect the overall timeline because [reason]. Photos before/after
attached."
```

## Step 8 — Asbestos / lead paint / other hazardous material

If demo uncovers hazardous material:

```
HAZARDOUS MATERIAL DISCOVERY — [Project name]
===============================================
Material:         [asbestos / lead paint / lead pipes / contaminated
                   soil / hydrocarbons]
Where:            [location + photos]
Quantity:         [estimate sqm / m / kg]
Discovered:       [date, by whom]

IMMEDIATE ACTION
1. STOP all work in the affected zone
2. Cordon area
3. Workers move to other tasks; PPE check
4. Phone licensed asbestos / hazmat contractor for testing
5. Phone WorkSafe / OSHA / HSE / WSIB for guidance (some require
    notification)
6. Don't disturb further

CLIENT
"Found [material] during demo in [location] — it's not a major
issue but we have to stop and engage a licensed [asbestos]
contractor. They'll test, sample, and quote removal. Approx
cost $[X-Y]; approx programme impact [N] days. I'll have the
quote to you within [days].

If we'd known this was here, we'd have factored it into the
original quote — it's a variation because it's outside what we
could have known at quote stage."

VARIATION DRAFT
Variation #[N]:
Scope:           Engage licensed asbestos contractor for testing,
                 sampling, quoting, and removal of [material] at
                 [location]
Cost:            $[X-Y] (estimated; finalised after contractor
                 quote)
Programme:       [N] days delay
Client sign-off: Required before contractor engaged
```

## Step 9 — Programme update + cash position

Every site incident shifts the programme. Within 24h of the
incident, the agent regenerates the project programme + the
revised PC target + the revised progress claim schedule.

If the incident moves a progress claim trigger past its expected
date, surface to operator. Builder's cash flow runs on those
claims.

## Hand off after the incident

After incident is stabilised:

- `04-dispatch.md` for any re-scheduling
- `06-invoice-payment.md` for any variation invoice
- `09-recurring-maintenance.md` if the incident relates to defects
- `12-weekly-report.md` for the WIP impact + learnings update
- `11-followup-reviews.md` is paused for this project until things
  are back on track

## Hard rules

- **Safety always comes first.** People before property. Property
  before programme. Programme before margin.
- **Documentation always.** Photo + written note + insurance
  lodgement within 48h on anything insurance-touched.
- **Client comms within 1 hour of incident.** Phone first, written
  follow-up within hours.
- **Don't admit fault verbally.** "Looks like the wind got the
  scaffolding" — not "I should have tied it down better."
  Whether you should have is for the insurer / engineer to
  determine.
- **Council orders comply immediately.** Argue formally, in
  writing, later.
- **Asbestos / hazmat always stops work** + licensed contractor.
- **Subbie defects always trigger return — withhold final
  invoice payment** if subbie won't return.
- **Engineer signs off any structural concern** — never carry on
  past a structural question without engineer in writing.
- **Variations from incidents follow the same discipline as
  client-requested variations** — written + signed + photo'd.

## Reading the learnings.md

Each incident, log:

- Type
- Trigger / cause
- Cost (to builder + to client via insurance)
- Programme impact
- Lessons (what we'd do differently)

Patterns to track:
- Which subbies no-show repeatedly → drop them
- Which suppliers chronically slip → switch primary
- Which inspection failures are recurring → re-train / re-check
- Which materials cause weather-defer issues → pre-check forecast
  earlier
- Which DA conditions get missed → upgrade pre-CC review checklist

## Confirm + handoff

> *"Site incident handled: [outcome — safety stable, insurance
> lodged, client notified, programme revised]. [If applicable:
> loading `06-invoice-payment.md` for variation OR
> `04-dispatch.md` for re-scheduling OR `12-weekly-report.md`
> for impact tracking.]"*
