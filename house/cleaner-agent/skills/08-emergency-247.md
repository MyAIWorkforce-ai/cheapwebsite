---
name: cleaner-emergency-247
description: After-hours + urgent intake. Triage urgent jobs fast — flood cleanup, biohazard, last-minute STR turnover (host has a guest arriving in 4 hours), complaint recovery on a recurring contract. Safety advice on biohazard within 60 seconds. Quote the surcharge upfront. Route to the on-call crew or sub-out where the operator isn't cleared.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Emergency / urgent — after-hours triage

## Your job

When an urgent message arrives (per BUSINESS CONFIG → working
hours, or marked urgent during hours), triage in seconds:

1. **True emergency?** (active flood, biohazard / sewage spill,
   guest arriving at STR with property still dirty) → dispatch
   crew within response window, regardless of after-hours rate
2. **Urgent but containable?** (complaint on recurring, late STR
   turnover with longer window, urgent bond clean for next-day
   handover) → offer urgent rate or move to standard tomorrow
3. **Not urgent?** → take the lead, schedule for normal hours

Cleaning emergencies are less time-critical than plumbing or
gas emergencies — but cleaning emergencies have HIGH customer
emotion (a flooded house, a guest arriving in 4 hours, an angry
landlord refusing the bond). Fast response + clarity beats
speed alone.

## Triage rules

| Signal | Classification | Action |
|---|---|---|
| Active flood / water from above / pipe burst (PLUMBER first, cleaner after) | EMERGENCY (cleaner role: post-mitigation) | Refer to plumber first ("call your plumber + insurance"). Then cleaner triages flood cleanup once water is off. |
| Sewage spill / biohazard | EMERGENCY | Safety advice first (PPE warning to homeowner; ventilate; isolate area; don't track through). Then dispatch with biohazard PPE — OR sub-out if operator isn't bonded for biohazard. |
| STR guest arriving in <4 hrs + property dirty (host's contractor cancelled, last-min cleanup needed) | EMERGENCY | Dispatch within 30 mins if crew available. Surcharge upfront. |
| Bond clean tomorrow + nothing booked / cleaner no-show | URGENT | Same-day book if possible; surcharge applies. |
| Complaint on recurring — customer angry, wants re-clean now | URGENT | Same-day re-clean if work was within 7 days (covered by warranty). |
| Death / trauma / crime scene clean | DECLINE — specialist | Always refer to licensed trauma cleaner (varies by region — IICRC trauma cert US, Crime Scene Cleanup Services AU, etc.). Even cleaners with biohazard experience shouldn't take this without specific trauma training. |
| Mould remediation | DECLINE — specialist | IICRC mould cert (US) or specialist mould remediation company. |
| Hoarder property | URGENT — quote-only first | Site visit before quoting. Significantly above bond clean rates. Often co-quoted with rubbish removal. |
| Single broken window / quick tidy | NOT URGENT | Book for tomorrow at standard rates. |

## Step 1 — Safety advice first (for biohazard / sewage)

Before quoting on biohazard or sewage, send safety advice
within 60 seconds. Most of the customer's exposure and damage
happens between the call and the arrival.

**Sewage / biohazard spill:**
```
Hi [name] — sewage / biohazard is hazardous, treat it
seriously:

1. STAY OUT of the affected area until we (or you) can PPE
   up. Sewage carries pathogens.
2. Keep kids + pets OUT.
3. Open windows for ventilation.
4. STOP USING any drain or fixture that feeds into the
   affected line (if it's an internal blockage).
5. Don't use bleach or chems yet — wait until we can assess.
6. Lift anything from the wet area you can (rugs, low items)
   so we can get to the source.

If actively water-flowing, also call your plumber to find the
source. We handle the cleanup AFTER the leak's stopped.

Quote in 5 minutes. ETA if confirmed: [X].

— [your name], [Business name]
```

**Flood (after plumber's stopped the water):**
```
Hi [name] — flood cleanup. First steps:

1. Make sure the water source is OFF (call your plumber if not).
2. Open windows for ventilation.
3. Lift anything off the wet floor (rugs, books, electronics
   — especially electronics).
4. Don't turn off the power at the wet wall — leave that to
   us / an electrician.
5. We bring a wet-vac + dehumidifier and pull the water out
   first. The clean comes after.

Heads up: water damage that's been sitting >48 hrs can grow
mould. Faster we get there, less risk. Quote in 5 minutes.

— [your name]
```

For STR last-minute turnovers, no safety advice needed — go
straight to confirm + quote.

## Step 2 — Urgent quote (surcharge upfront)

Be explicit about the cost. Urgent customers EXPECT to pay more,
but they HATE surprise. So put it in the first line:

```
Available now. Just so you know upfront — urgent / after-hours
callout is:

  Standard rate ×1.5
  Plus emergency mobilisation fee: $[X]
  Plus parts/chems at cost + 30% (more dispatching urgency)

For [job summary] that's roughly: $[X] all in.

Standard tomorrow rates would be $[Y] all in if you can wait.
Your call.

For flood cleanup specifically, the longer it sits the worse
it gets — mould risk after 48 hrs. Worth doing today if you can.

— [your name]
```

Wait for the customer to confirm before dispatching. Never
assume.

For STR turnovers where speed = saving the host's booking:

```
Got it — guest arrives [time], property needs full turnover.
Crew can be there in [X] mins.

Urgent turnover rate: $[X] (50% premium on standard $[Y] —
covers crew mobilisation + me chasing chems back to your van).

Reply YES + we roll. Photo pack to you within 30 min of done.

— [your name]
```

## Step 3 — Dispatch (if confirmed)

If the customer says go:

```
On the way, [name]. Crew lead [name] arriving [time]. Address
confirmed as [X]?

Quick confirm before we roll:
1. Access — door open / lockbox / key / smart-lock?
2. Pets / dogs at the property?
3. Anyone home on arrival or empty property?
4. (For biohazard) — area cordoned off? Kids + pets clear?

— [your name]
```

Update calendar (per BUSINESS CONFIG). Hand off to
`04-dispatch.md` for the rest of the job (sign-off, photo
pack, invoice afterwards).

## Step 4 — Decline (if business is genuinely off-call or
uncleared)

If BUSINESS CONFIG → Available 24/7 = NO and it's the off
week:

```
Hi [name] — really sorry, we're on our scheduled off-call
rotation tonight. For an urgent cleaning issue right now:

  - Flood (water stopped) — wet-vac the worst pools, open
    windows, you're OK till 7am. Mould risk only after 48 hrs.
  - Sewage spill — keep everyone out of the area. Open
    windows. Don't touch.
  - STR guest arriving — message them an apology + offer
    discount, sometimes Airbnb will adjust. Then call us first
    thing tomorrow.

  - Try [partner cleaning business] on [phone] — they cover
    our off-call nights.
  - Or any 24/7 cleaner via Airtasker / Hipages / Bark /
    Thumbtack / your Google search.

If it can safely wait til 7am, send through the details now
and I'll book you in first thing tomorrow at standard rates.

— [your name]
```

Always offer the partner business by name + number — they're
doing the same for you on your on-call weeks. Reciprocity.

## Step 5 — Biohazard / trauma sub-out (if not cleared)

If the emergency is true trauma / crime scene / heavy biohazard
and you don't hold the right cert (most cleaning businesses
don't), after the safety advice:

```
For trauma / crime scene cleanup specifically, that needs a
licensed bioremediation specialist by law in most regions —
not a regular cleaner.

In your area, [specialist business name + phone] handle this.
They have the right cert (IICRC trauma / Crime Scene Cleanup
licensed / etc.), the PPE, and they coordinate with police +
insurance.

Call them first. Once they've done the bioremediation, if
there's general cleaning to be done after (most properties
need this), I can come in then at standard rates.

— [your name]
```

## Special case — complaint recovery on recurring contract

This is the highest-stakes "urgent" — a recurring customer is
about to fire you because they're not happy with the last clean.
Don't argue. Recover. Cost of recovery < cost of lost contract
+ negative review.

```
Hi [name] — [your name]. Sorry the [issue] wasn't to the
standard. Genuinely. We'll come back and re-clean the [area]
free of charge — when works for you? Today / tomorrow / this
week?

Two questions while I'm here:
1. Anything else on the visit that wasn't to standard? Want
   to know it all so we sort it.
2. The cleaner who did this one was [name] — would you like
   us to send a different team for the re-clean + the next
   visit? Not a problem either way.

We genuinely want to keep your account.

— [your name]
```

Then internal: flag the cleaner in `learnings.md`. If it's a
pattern (same cleaner, multiple complaints), retrain or
restructure. Don't quietly fire — investigate first.

After the re-clean:
- Free, with apology
- Photo evidence pack delivered same day
- Optional: $20-50 credit on next month's invoice
- Pause future direct debits for a week so the next charge is
  AFTER the customer's seen the recovery

## Special case — late STR turnover (guest checked out late)

```
Hi [host name] — quick update, guest checked out at [time]
instead of [scheduled]. Crew arrives [new time], we're still
on track for check-in window.

If [next guest] message comes early asking if they can come
in early, redirect them to 3pm — we won't be done before then.

— [your name]
```

For chronic late checkouts (same host, multiple late turns),
flag for `09-recurring-maintenance.md` → contract conversation
("we need to add a late-checkout buffer to your per-turn
rate").

## After the job

Emergency / urgent jobs follow the standard flow afterwards:
- `04-dispatch.md` for completion comms
- `05-compliance.md` for the sign-off + photo pack (especially
  important after biohazard / flood — insurance documentation)
- `06-invoice-payment.md` for the invoice (surcharge on it,
  matching what was quoted)
- `11-followup-reviews.md` next-day check-in (especially
  important after emergencies — they want to know it's holding)

Emergency follow-ups often get the strongest reviews — customers
remember "the cleaner who saved my Airbnb booking at 4 hours
notice" forever. Make sure the review request goes out.

## Logging for the learnings file

Each emergency, log:

```
EMERGENCY #<n> — <timestamp>
Time of intake:    [time]
Issue:             [one-line — e.g. "Flood cleanup,
                     plumber stopped leak at 10pm"]
Safety advice sent: [Y/N] — [time to send]
Dispatched:        [Y/N — if N, reason]
Time to site:      [hh:mm from confirm to arrival]
Time on site:      [hh:mm]
Revenue:           $[X]
Surcharge applied: $[X]
Conversion to repeat customer: [tracked next quarter]
```

Patterns to track in `learnings.md`:
- Time-of-day patterns (Friday night STR last-min turnovers
  spike; Sunday morning bond clean panics)
- Season patterns (flood cleanups spike in storm season;
  STR turnover spikes around school holidays + long weekends)
- Issue-type patterns (which emergencies you handle best)
- Conversion to repeat (emergency customers can become great
  repeat customers if first interaction goes well)

## Hard rules

- **Safety advice before the quote** for biohazard / sewage.
  Always. Within 60 seconds.
- **Surcharge upfront.** Never hide the urgent rate. Customer
  trust is built on price transparency.
- **Customer must confirm dispatch.** Don't assume. They might
  choose to wait or sub to a partner.
- **Decline warmly with options.** Even at 2am, a kind decline
  that routes them elsewhere builds your reputation.
- **Never take trauma / crime scene work without the cert.**
  Refer always.
- **Never take mould remediation without the cert.** Refer
  always.
- **Complaint recovery is FREE.** Always. Cost-of-recovery <
  cost-of-lost-contract. No exceptions.
- **Biohazard PPE before entering.** Gloves, mask, eye
  protection, boot covers. Internal note: agent reminds operator
  to grab the biohazard kit before rolling.

## Confirm + handoff

> *"Urgent intake handled: [outcome — dispatched, declined,
> scheduled for tomorrow, sub-out to specialist]. [If
> dispatched: loading `04-dispatch.md` for on-job comms +
> `05-compliance.md` for photo pack.]"*
