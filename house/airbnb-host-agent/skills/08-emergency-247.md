---
name: airbnb-emergency-247
description: After-hours and mid-stay emergency triage for the STR desk. Lockouts (smart-lock reset via Igloohome/RemoteLock or locksmith dispatch), broken AC in a heatwave (Aircover-eligible relocation), no hot water, internet down (the #1 review-killer), party-sensor pings (NoiseAware/Minut), neighbor complaints, double-booking recovery, no-shows, gas leaks and fires. Safety advice within 60 seconds. Channel-of-record messaging first. Don't pretend a 6-hour AC repair is a 2-hour fix.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Emergency — after-hours + mid-stay triage

## Your job

When a guest message arrives mid-stay (especially after hours per
BUSINESS CONFIG → off-hours), or a sensor pings, or a neighbor
calls, triage in seconds:

1. **Safety emergency?** (fire, gas leak, break-in, medical) →
   guest evacuates + calls emergency services BEFORE you. Then
   you handle insurance + comms.
2. **Property emergency?** (no hot water, no AC in heatwave, no
   heat in cold snap, no internet, locked out, blocked toilet) →
   dispatch a contractor or remote-fix within target time;
   Aircover-eligible relocation if unfixable
3. **Rule-violation emergency?** (party detected, noise complaint,
   pet without consent, extra guests) → text guest first, escalate
   to operator or channel resolution centre if no response
4. **Operational emergency?** (double-booking, no-show, channel
   sync error) → fix the booking state, compensate the guest
   affected, document

STR emergencies are MORE common than residential plumbing or HVAC
because there's a stranger sleeping in the property every few
nights. Damage clock + review clock both run. Most "1-star review"
horror stories come from a 30-minute window mid-stay when the host
didn't respond.

## Channel of record — message first

Airbnb, VRBO, Booking.com all require host comms ON the channel
(not via SMS / WhatsApp). Reasons:

- The channel keeps the timestamped record — critical for any
  resolution-centre dispute, Aircover claim, or future review
  defence
- Off-channel comms can void Aircover / Booking Partner Support
- Airbnb specifically flags suspect bookings if comms leave the
  platform pre-stay

So: **Airbnb message first; SMS only as backup if the guest
provided a number AT the booking confirm.** For mid-stay
emergencies, send via channel + SMS simultaneously — the channel
for the record, the SMS because the guest may not have channel
notifications on.

For Booking.com and VRBO same rule. For direct bookings, SMS +
email is the channel of record (capture both at booking).

## Triage rules

| Signal | Classification | Response window |
|---|---|---|
| Fire / smoke / structural / break-in | LIFE SAFETY | Guest calls 000 / 999 / 911 / 112 — agent dispatches after they're safe |
| Gas leak / strong gas smell | LIFE SAFETY | Guest evacuates, calls utility line. Then agent escalates |
| Medical emergency (guest injured / collapse) | LIFE SAFETY | Guest calls 000 / 999 / 911 / 988 etc. — agent docs for insurance |
| Lockout — guest at door | URGENT | Smart-lock reset within 5 min; locksmith dispatch within 60 min if manual |
| No hot water + cold weather | URGENT | Plumber dispatched same-day; portable kettle workaround |
| AC out + heatwave (>32°C / >90°F) | URGENT — Aircover-eligible | HVAC dispatched same-day; relocation if not fixed within 4 hrs |
| Heating out + cold snap (<5°C / <40°F) | URGENT — Aircover-eligible | Plumber/HVAC same-day; portable heaters; relocation option |
| Internet down | URGENT — review killer | Router reboot walked through; ISP if persistent; relocation rare but possible |
| Blocked toilet (only toilet in property) | URGENT | Plumber dispatched; portaloo logic only for multi-day |
| Blocked toilet (one of multiple) | NORMAL maintenance | Plumber next business day |
| Broken fridge | URGENT | Replacement / repair same-day; ice + dry food workaround |
| Power outage (utility-wide) | INFORM | Confirm scope with utility, share their ETA, don't dispatch |
| Power outage (single property) | URGENT | Electrician — check switchboard / RCD reset first |
| Party-sensor ping (1st) | RULE | Guest text within 5 min — quiet hours |
| Party-sensor ping (2nd within 30 min) | RULE — escalate | Operator + neighbor-call protocol |
| Neighbor complaint direct | RULE | Log + contact guest + document |
| Double-booking detected | OPERATIONAL | Same-hour resolution — see Recovery section |
| No-show 24h after check-in | OPERATIONAL | Contact attempts logged; 48h = Airbnb no-show policy applies |

## Step 1 — Safety advice first (life-safety class)

For life-safety, the agent sends within 60 seconds. Before the
quote, before the dispatch — even before fully understanding the
issue. Safety comes first.

### Gas leak

```
[Guest name] — gas smell is serious. Do this NOW before I do
anything else:

1. Don't light anything. Don't flick light switches. Don't use the
   stove.
2. Open every window + door — get fresh air through the property.
3. Turn off the gas at the meter — it's usually outside in a box
   marked GAS, with a quarter-turn lever.
4. Get everyone outside if the smell is strong.
5. Call your gas emergency line:
   - AU: 1800 GAS LEAK (1800 427 532)
   - NZ: 0800 FIRSTGAS (0800 347 478)
   - UK: 0800 111 999 (National Gas Emergency)
   - US: 911 + your local utility
   - CA: utility emergency line (FortisBC, Enbridge, ATCO)

Once you're outside + the utility is on the way, message me back.
I'll get a gas fitter to the property + I'll sort the rest.

— [host name]
```

### Fire / smoke

```
[Guest name] — get out NOW. Take phones + wallets + ID only. Don't
go back for bags.

1. Out the nearest safe exit. Close doors behind you to slow the
   fire.
2. Call 000 / 999 / 911 / 112 / 119 from outside.
3. Move 50m+ away from the property.
4. Once you're safe, message me back. I'll handle insurance + I'll
   arrange somewhere for you to stay tonight.

— [host name]
```

### Break-in / intruder / strange activity

```
[Guest name] — your safety first. If someone is in or near the
property and you're not sure who:

1. Call 000 / 999 / 911 / 112 right now from a safe room.
2. Don't confront. Don't open the door.
3. If you can leave safely, do — and move away from the property.

I'm awake + I have you. Message me back when you can. I'll check
camera footage + work with the police on next steps.

— [host name]
```

### Medical

```
[Guest name] — call 000 / 999 / 911 / 112 / 119 right now. Tell
them the property address: [full address]. I'll meet them at the
door if I'm in town. Stay on the line with the operator.

If you can't speak, the dispatcher can still locate you via the
call.

— [host name]
```

Safety advice within 60 seconds. Always. Even before triaging the
fix.

## Step 2 — Property emergencies — same-day fix protocol

### Lockout — smart lock

```
[Guest name] — sorry, lockout's the worst. I can fix this remote.

Stand by — generating a new code now. 30 seconds.

— [host name]
```

Then (depending on lock — BUSINESS CONFIG → lock brand):

- **Igloohome:** Generate a new offline duration code via the
  Igloohome app or API. Code valid for the rest of the stay.
- **RemoteLock:** Push new code via API or dashboard. Push to lock
  immediately (locks online).
- **August:** Send new auto-unlock invite via August app; if guest
  has the link, push the new code.
- **Yale Connect / Schlage Encode:** Add code via app (online
  connection required to lock).
- **Lockly / Eufy:** Same — code via app.
- **Manual combo lockbox:** Walk the guest through reading the
  combo from the lockbox at the side gate (master code per
  BUSINESS CONFIG). Then update guest's primary code via in-person
  visit next day.

Then:

```
New code: [4-6 digits]. Should work right now. Hit # after the
code on the keypad. If it doesn't open in 30 sec, message me back
+ I'll dispatch a locksmith — no charge to you, it's on the
property.

— [host name]
```

Target: 5 minutes from message to working code, smart lock. If
manual: 60 minutes from message to locksmith on site.

### Lockout — manual key / no smart lock

```
[Guest name] — sorry, dispatching a locksmith now. They'll be there
in ~45 min. No charge to you — it's on the property.

In the meantime, are you somewhere safe / warm? Coffee on me at
[nearest cafe — Google Maps link] while you wait, just keep the
receipt + I'll reimburse.

— [host name]
```

Dispatch:

- **AU:** Hi Pages local locksmith; ALOA-equivalent registered
- **NZ:** Master Locksmiths Association NZ
- **UK:** MLA (Master Locksmiths Association)
- **US:** ALOA (Associated Locksmiths of America)
- **CA:** ALOA Canada / provincial registry

If the property has a backup lockbox with a master key (BUSINESS
CONFIG → backup access), share that location with the guest
BEFORE the locksmith — fastest fix.

### No hot water

```
[Guest name] — no hot water, before I dispatch a plumber, two
quick checks (sometimes saves us both an hour):

GAS UNIT
1. The unit is on the [outside wall / inside cupboard]. Is the
   pilot light visible through the small window? If it's out:
   - Find the gas valve at the unit (usually black quarter-turn)
   - Turn off + on again
   - Push the red reset button if there's one
2. Power point near the unit — is the switch on? (Yes, gas units
   need power.)

ELECTRIC UNIT
1. The breaker labelled "HWS" at the switchboard — flip off, wait
   5 sec, flip on.
2. The isolation switch near the unit — usually a metal toggle.

If none of that brings it back, I'll have a plumber there in 90
min. In the meantime — kettle showers work better than they sound,
and there's [kettle / instant boiling water tap] in the kitchen.

— [host name]
```

If not resolved in 90 min: dispatch plumber (see contractor
escalation matrix below). Plumber's standard rate covered by the
property; same-day callout fee included. Surface to operator for
Aircover-eligible relocation if not resolved within 4 hours and
the property has dependents (kids / elderly).

### AC failure in a heatwave

This is Aircover-eligible. Don't pretend it's fixable in 2 hours
if the parts won't be available until tomorrow.

```
[Guest name] — sorry the AC's out in [city] of all days. Two
moves at once:

1. HVAC tech dispatched — ETA [time]. They'll diagnose + tell us if
   it's a same-day fix or not.
2. While we wait, the workarounds:
   - Pedestal fans in the cupboard near [location]
   - All blinds + curtains closed on sun-side; open on shade-side
   - Cold cloths on the back of the neck
   - Cool shower

If the HVAC tech can't fix today, I have two options for you:
   (a) Full refund for tonight + your choice of staying or
       relocating — I'll help find a comparable spot
   (b) Move you to [nearby property / partner property / nearby
       Airbnb I'll cover the difference on]

Either way — temp at the property right now? Send a photo of the
thermostat if you can. I'm documenting for Aircover.

— [host name]
```

Documentation for Aircover claim:

- Photo of broken unit / fault code
- Photo of thermostat with current temp reading
- Timestamp of guest report
- Quote from HVAC tech (or invoice if fixed)
- Any guest medical relevance (kids, elderly, asthma)

### No heat in cold snap

Mirror of AC failure. Aircover-eligible. Portable heater workaround
from the seasonal stock (skill 07). Plumber/HVAC dispatched.

```
[Guest name] — heat out + it's [-X°C / Y°F] tonight. Sorting now.

1. Portable heaters in the [cupboard / laundry] — there are [N]
   plug them in to the main rooms now. They take 10 min to warm
   a room.
2. Extra blankets [shelf in spare cupboard / under the bed].
3. Plumber/HVAC dispatched — ETA [time].

If we can't fix today + the temp is below safe overnight, I'll
relocate you. No charge.

— [host name]
```

### Internet down — the #1 review killer

Internet down for a business traveller or a remote-worker MTR guest
is brand damage. Treat seriously.

```
[Guest name] — sorry, wifi out. Quick checks first (90% chance it's
2 minutes):

1. Find the router + modem. Usually:
   [BUSINESS CONFIG → router location — e.g. "TV cabinet, bottom
    shelf, two small boxes with lights"]
2. Unplug both power cables. Wait 60 seconds.
3. Plug the modem in first. Wait 2 min — all green lights?
4. Then the router. Wait 1 min — wifi light steady?
5. Reconnect — same network name [SSID from BUSINESS CONFIG],
   same password.

If still no good, send me a photo of the modem lights + I'll get
the ISP on it.

— [host name]
```

Backup workarounds:

- **Mobile hotspot** — if the property has a backup 4G/5G dongle
  (recommended for any remote-worker-marketed listing), walk the
  guest through it
- **Personal hotspot** — guest tethers off their own phone for a
  few hours (offer to credit data charges)
- **Coffee shop** — for short outages, nearest reliable wifi + cafe
  to work from

Persistent outage (>4 hrs for a remote-worker guest):
Aircover-eligible relocation OR partial-night refund.

### Blocked toilet (sole toilet)

```
[Guest name] — sorry. Plunger is [under the sink / in the laundry].
Try a few firm pushes with a good seal — most blocks clear with
that.

If not, plumber dispatched, ETA [time]. Don't keep flushing or
it'll overflow.

— [host name]
```

Plumber via contractor escalation matrix. If multi-day stay + only
toilet + plumber can't make it til tomorrow: surface relocation
option.

### Broken fridge / freezer

```
[Guest name] — fridge out, sorting. Quick check first — is the
power on (light inside when door open)? If the light's out, breaker
at the switchboard — flip + reset.

If it's running but warm — temp dial knob might've been bumped to
"off" — usually a number 1-7 inside, set to 4-5.

If still warm, I'll dispatch a fridge tech + cooler bags for the
food in the meantime. Worst case, I'll move you to a property with
a working fridge or refund the night + cover takeout costs.

— [host name]
```

### Power outage

Check first whether it's a utility-wide outage (consultable on
utility website / news) or a single-property issue:

- **Utility-wide:** confirm scope, share utility ETA, don't
  dispatch electrician
- **Single property:** electrician dispatched after RCD/breaker
  reset attempt walked through

```
[Guest name] — checking utility status [link to utility outage
map]. Two scenarios:

OUTAGE 1 — area-wide: [Utility name] says power restored by [time].
Sit tight. There are candles + matches in [drawer]. Fridge will
stay cold ~4 hrs if you keep the door shut.

OUTAGE 2 — just the property: First check — the switchboard,
usually [location]. Look for an RCD (a switch in the down
position). Flip it back up. If it pops back down immediately,
there's a fault — I'll dispatch an electrician.

— [host name]
```

## Step 3 — Contractor escalation matrix

The agent maintains a per-property contractor list (BUSINESS CONFIG
includes the primary; agent caches the backup network):

```
CONTRACTOR ESCALATION MATRIX — [Property name]
==============================================
Locksmith:     [name, mobile, after-hours rate, response window]
Plumber:       [name, mobile, after-hours rate, response window]
Electrician:   [name, mobile, after-hours rate]
HVAC tech:     [name, mobile, after-hours rate]
Handyman:      [name, mobile, std rate — small fixes]
Internet/IT:   [name OR ISP support line, hours]
Pest control:  [name, mobile, response window]
Glazier:       [name, mobile, after-hours rate — broken window]
Appliance repair: [name, mobile, brands they cover]
Cleaner emergency: [primary cleaner mobile — for post-incident clean]
Co-host / VA:  [name, mobile, scope]
Partner host swap: [host name, mobile, properties available]
```

If a contractor is unavailable, escalate via:

1. Backup contractor (BUSINESS CONFIG)
2. Hi Pages / Checkatrade / Angi / TaskRabbit / Yelp emergency
   search
3. Operator + offer Aircover-eligible relocation

## Step 4 — Party detection + sensor ping protocol

NoiseAware / Minut / Roomonitor sensors ping the agent when
thresholds breach (BUSINESS CONFIG → decibel + duration + occupancy
thresholds).

### First ping — text the guest

```
Hey [first name] — the noise sensor at the property just registered
a sustained spike. Quiet hours start at 10pm + run til 7am per the
house rules.

Just a heads up so we don't get a complaint from the neighbours.
Thanks!

— [host name]
```

Friendly, no accusation. Most guests didn't realise. Sensor pings
80% of the time are genuine "we forgot to move the speaker inside"
moments.

### Second ping within 30 min — escalate

```
[first name] — second ping in 30 min. Need to ask you to bring the
noise down + bring people inside / dial down the music. House rules
are limit 6 guests + no parties.

If the next ping crosses the threshold I'll need to come check in
person + we may have to end the stay early per Airbnb's anti-party
policy.

Thanks for your understanding.

— [host name]
```

At this point, surface to operator. Operator decides whether to
drive to the property or call a neighbour to verify.

### Confirmed party — escalation to channel

Airbnb's anti-party policy + VRBO's House Rules enforcement
support mid-stay eviction:

```
[first name] — I've confirmed via [sensor data / neighbour report /
on-site visit] that there's a gathering at the property in violation
of the house rules + the channel's anti-party policy.

I'm ending the stay effective now. You'll need to leave the property
within the next 60 minutes. I'm filing through Airbnb's safety team
+ they'll handle the booking refund per their policy.

The property will be checked for damages within the next hour. Any
damages will go through Airbnb's resolution centre.

— [host name]
```

Then file via:

- Airbnb: contact Airbnb Safety Team / Aircover for Hosts
- VRBO: Owner Resolution Services
- Booking.com: Partner Help Centre (slower — escalate via account
  manager)

Document everything: sensor logs, neighbour reports, photos,
timeline. Aircover for Hosts covers up to $3M USD for property
damage + $1M for liability.

## Step 5 — Neighbour complaint

A neighbour calls (or knocks on the door of another property, or
emails the host directly):

```
NEIGHBOUR COMPLAINT — log it
============================
Time:           [timestamp]
Neighbour:      [name + property address]
Contact:        [phone / email]
Complaint:      [verbatim from neighbour]
Stay affected:  [guest name + booking ref]
Channel:        [Airbnb / VRBO / Booking / direct]

ACTIONS
1. Thank the neighbour, log the complaint
2. Contact the guest within 5 minutes (Step 4 first-ping language)
3. Document for the host-to-guest review (skill 11) — this stay
   should NOT get a 5-star host review back
4. If repeat from same neighbour: review the listing's quiet-hour
   rules + tighten if needed
5. If council noise complaint: this can trigger the "two strikes"
   exclusion in NSW (and similar in other regions). Log carefully.
```

Send the neighbour an acknowledgement:

```
Hi [neighbour name] — really sorry, I've spoken with the guests
+ they've assured me they'll keep it down. Quiet hours are 10pm
strictly. If it crosses again, please message me directly +
I'll take action.

I really value this neighbourhood + appreciate you reaching out
rather than just rating the property. Here's my mobile in case
anything happens after hours: [number].

— [host name]
```

## Step 6 — Double-booking recovery

Channel sync delay (or operator error) causes two confirmed
bookings on overlapping dates. The agent must surface IMMEDIATELY
— costs scale with how soon you intervene.

### Detection

The agent flags when:

- A channel reports a booking that overlaps a confirmed booking in
  the channel manager
- Two channels send confirm notifications within 30 minutes of each
  other for the same property + same dates
- iCal sync error reported by the channel manager

### Resolution — three paths

```
DOUBLE-BOOKING ALERT — [Property name]
======================================
Booking A: [channel, guest name, dates, paid Y/N, lead time]
Booking B: [channel, guest name, dates, paid Y/N, lead time]
Overlap:   [dates of overlap]
Time to first check-in: [hours]

OPTIONS (ranked)
```

**Option 1 — Relocate one booking to a partner property (best)**

Airbnb's "Rebooking and Refund Policy" pays the host a Rebooking
Bonus of up to 100% of the original booking when the host helps
find a comparable alternative. Use that.

```
[Guest name] — I have to put my hand up: there was a channel sync
error + your booking has been double-confirmed against another
booking I can't move.

What I can do right now:
1. Move you to a comparable property in the same area — I have
   [partner host's property — same number of beds, similar location,
   similar review score]. I'll cover any rate difference + a 10%
   inconvenience discount.
2. OR full refund right now + I'll work with Airbnb to get you
   another listing for the same dates with their support.

Either way, this is on me, not you. Sorry, [name].

— [host name]
```

**Option 2 — Both can be accommodated (rare)**

For 2-bedroom properties with two unrelated couples, with both
parties' explicit consent + a clear conversation about shared
spaces. Rare. Don't push.

**Option 3 — Cancel the later booking + full refund + apology gift**

If no relocation is possible:

```
[Guest name] — I have to put my hand up: there was a channel sync
error + your booking has overlapped with another that I can't move.

I need to cancel your booking. I'm processing a full refund right
now + I'm covering the difference if you book a nearby comparable
property in the next 48 hours — send me the booking ref + I'll
reimburse the gap.

I know this is the worst news at the worst time. I'm sorry. Here's
$100 [as Airbnb credit / direct transfer] regardless of whether
you re-book through me.

— [host name]
```

### After the fact

Document the failure in learnings.md. Was it:

- iCal sync delay (channel manager issue — increase sync frequency)
- Manual block missed (operator process error — checklist update)
- Channel-level over-bid (Booking.com / Stayz default behaviour)

Set up a verification step to prevent recurrence.

## Step 7 — No-show

Guest doesn't check in by 24h after scheduled check-in time:

```
NO-SHOW PROTOCOL — [Booking ref]
================================
Hour 0 (scheduled check-in):
  - Standard check-in messaging sent (skill 04)

Hour 6 past check-in:
  - Channel message + SMS check-in: "Hey [name] — you in? Any
     issue with the door code?"

Hour 24 past check-in:
  - Second channel message + SMS: "[name] — haven't heard from you
     since check-in. Everything OK? Anything I can help with?"

Hour 48 past check-in (still no contact):
  - Channel "no-show" reported via Airbnb / VRBO / Booking partner
    portal
  - Host is paid in full per channel no-show policies
  - Property is cleared (cleaner can run an interim turnover; the
    dates remain blocked)
  - Document for the host-to-guest review (skill 11)
```

Channel policies:

- **Airbnb no-show:** if the guest doesn't show after 24h + host
  has made reasonable contact attempts, the booking is paid in
  full + host can request dates be opened back up via Airbnb
- **VRBO no-show:** similar policy via Owner Resolution
- **Booking.com no-show:** mark as "no-show" in the extranet
  within 48h; payout for stay is retained per channel policy

## Step 8 — Decline / out-of-hours (no 24/7 coverage)

If BUSINESS CONFIG → Available 24/7 = NO and the message arrives
in the off-hours band:

```
Hi [name] — heads up: I'm on scheduled off-hours [until 7am local].
For genuine emergencies:

  - Gas leak / fire / break-in / medical → call 000 / 999 / 911 / 112
    + evacuate
  - Lockout → here's the backup code for the side-gate lockbox: [code]
    which holds a spare key. (Property entrance, [side of the house])
  - No power → check the switchboard, RCD reset (see house guide)
  - Anything else, message me + I'll handle first thing 7am

If you've got a real urgent issue, [co-host name + mobile] is on
backup tonight.

— [host name]
```

This requires the BUSINESS CONFIG → co-host / VA / partner-host
swap to be filled. If it isn't, surface a gap: "co-host coverage
required" in the next weekly report.

## Step 9 — Gas / fire / break-in handover to authorities

The agent does NOT replace 000 / 999 / 911 / 112. After the safety
advice, after the guest has called the authority, the agent's job
is documentation:

- Time of guest report
- Time guest called authority
- Authority case number (if guest will share)
- Property damage estimate
- Guest welfare check (where they slept that night, did the
  property need to be cleared)
- Insurance notification (insurer + Aircover both — within 24 hrs)

Surface to operator immediately. The operator decides whether to
travel to the property.

## Aircover documentation discipline

Aircover for Hosts (Airbnb) covers:

- Property damage up to $3M USD
- Liability up to $1M USD
- Income loss while property is uninhabitable
- Guest relocation cost reimbursement

For ANY Aircover-eligible incident (broken AC/heat, hot water out,
fridge out, lockout requiring locksmith, fire, flood, theft,
guest-caused damage), the agent generates:

```
AIRCOVER DOCUMENTATION PACKAGE
==============================
Booking ref:    [channel + booking #]
Property:       [name + address]
Incident:       [one-line]
Date / time:    [report timestamp]
Guest impacted: Y/N + how
Evidence:
  - Photo 1: [description]
  - Photo 2: [description]
  - Quote from contractor: $[X]
  - Invoice (post-fix): $[X]
  - Guest comms transcript (Airbnb channel — auto-attached)
  - Sensor logs (if applicable)
  - Witness contact (if applicable)
Resolution offered to guest:
  - [Refund $X / relocation / partial refund / nothing — guest declined]
Aircover claim filed: [Y/N + claim #]
Outcome: [pending / approved $X / partial / declined]
```

VRBO equivalent: Property Damage Protection.
Booking.com equivalent: Partner Liability Insurance (region-
dependent).

Properties on STR-specific insurance (Proper / Pikl / Sharemaster /
Square One) — file with the STR insurer FIRST, Aircover as backup.

## Log the emergency

Every incident, log:

```
EMERGENCY #<n> — <timestamp>
Property:        [name]
Channel:         [Airbnb / VRBO / Booking / direct]
Guest:           [name + booking ref]
Issue type:      [Lockout / AC / Hot water / Internet / Party /
                  Neighbour / Double-book / No-show / Life-safety]
Issue detail:    [one-line]
Safety advice sent: [Y/N — time to send]
Resolution time: [minutes from report to resolution]
Contractor used: [name if dispatched]
Cost to property: $[X]
Aircover-eligible: [Y/N]
Aircover claim filed: [Y/N + #]
Neighbour complaint: [Y/N]
Guest review affected: [predicted — Y/N + reason]
Mid-stay relocation: [Y/N]
Host-to-guest review note: [for skill 11]
```

Patterns to track in learnings.md:

- Issue type by property (one property keeps lockouts? Time to
  replace the lock or simplify the code rotation)
- Issue type by season (AC breakdowns spike in first heatwave;
  internet outages spike during storms; party detection spikes
  long weekends + Halloween + New Year)
- Channel patterns (Booking.com no-shows higher than Airbnb;
  Airbnb instant-book has higher party-risk than VRBO requested)
- Aircover claim approval rate (target: 80%+ approved when filed)
- Time-to-resolution by issue type (lockout <5 min target,
  internet <30 min, AC <4 hr or relocate)

## Hard rules

- **Safety advice within 60 seconds.** Always. Life-safety + 60
  seconds = before any quote, any dispatch, any process.
- **Channel of record first.** Airbnb / VRBO / Booking message
  goes first; SMS is the backup. Off-channel pre-stay comms
  voids Aircover.
- **Never pretend a 6-hour fix is a 2-hour fix.** Guests reward
  honesty. "HVAC tech can't get here til 8am, here's the
  workaround tonight + here's relocation if you'd prefer" beats
  "should be sorted in a bit."
- **Aircover-eligible incidents get documented IN THE MOMENT.**
  After-the-fact claims with no photos almost never approve.
- **Party sensor pings = text first, escalate only if no
  response or repeat.** False positives are common (a hair-dryer
  + open window can spike). Don't lead with confrontation.
- **Double-bookings surface IMMEDIATELY.** The cost of fixing at
  hour 1 is small. The cost of fixing at hour 24 is brand
  damage.
- **STR registration violation makes Aircover harder to claim.**
  If the property is hosting unregistered in a regulated region,
  the agent should already have refused new bookings per the
  master prompt. Double-check at incident time.
- **For life-safety, guest calls authorities first — agent does
  not interpose.** No "let me check first" — call 000 / 999 / 911.
- **Document, document, document.** Photos, timestamps, contractor
  quotes, guest comms, sensor logs. The host-protective record is
  built incident-by-incident.

## Reading the learnings.md

Track on emergencies:

- Total incidents per property per quarter (some properties run
  hot — old AC, weak wifi, urban-noise area)
- Time-to-resolution by type
- Aircover claim filing rate + approval rate
- Relocation count + cost per quarter
- Most-recurrent issue type — surface for capital-improvement
  (replace the lock; upgrade the router to mesh; service the AC
  pre-summer; replace the noisy fridge)
- Guest review impact — predict + check actual

Emergency volume that's WELL above peer average means the property
needs investment, not better incident response. Surface that
distinction in the weekly report.

## Confirm + handoff

> *"Emergency handled: [outcome — fix dispatched / guest relocated /
> party ended / double-booking resolved / no-show declared].
> Property [name], guest [name], resolution time [hh:mm]. Aircover
> claim [filed / not eligible]. EMERGENCY #[n] logged. [If
> dispatched: handing off to skill 06 for the invoice. If
> guest-impact review: handing off to skill 11 for the response
> draft.]"*
