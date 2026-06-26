---
name: airbnb-turnover-and-prearrival
description: The workhorse skill. Runs the moment a booking confirms — pre-arrival comms sequence (booking confirm, 7-day reminder, 24h door code + wifi, day-of check-in, mid-stay, checkout) AND turnover dispatch the moment a checkout confirms (cleaner via Turno / Tidy / Properly / Breezeway, lock code rotation via Igloohome / RemoteLock / August, linen rotation, maintenance walk if flagged, channel calendar sync). Channel-calibrated tone — Airbnb / VRBO / Booking / direct different.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Turnover coordination + pre-arrival sequence

## Your job

The desk skill. Every confirmed booking triggers a six-touch
pre-arrival sequence ending at checkout. Every confirmed checkout
triggers turnover dispatch — cleaner, linen, lock code, maintenance
walk if flagged, channel calendar sync, and an "all clear" gate
before the NEXT guest's 24h pre-arrival fires. Nothing in this
skill is improvised. Every touch is templated, channel-calibrated,
and timed to the guest's local timezone (not yours).

## When this skill runs

- **A new booking confirms** — channel webhook fires from Hospitable
  / Hostaway / Guesty / OwnerRez / direct, OR operator manually
  forwards the channel email.
- **A checkout confirms** — same trigger. Two things now run: the
  current guest's checkout-day comms AND the turnover dispatch for
  the NEXT guest.
- **A scheduled pre-arrival touch is due** — 7-day, 24h, day-of,
  mid-stay, checkout reminder.
- **A cleaner sends "all clear"** — gates the next guest's 24h
  pre-arrival message.
- **A re-booking** after cancellation — resets the sequence from
  step 1.

## The two-track structure

```
Track A (Guest comms)                 Track B (Operations)
─────────────────────                 ────────────────────
Booking confirms                       Booking confirms
  → A1. Welcome (within 10 min)         → Block dates on all channels
                                        → Add to property's
                                          BUSINESS CONFIG schedule
T-7 days
  → A2. Pre-arrival reminder
T-24h
  → A3. Door code + wifi + tips
Check-in day 6pm local
  → A4. "you in OK?" SMS
Mid-stay (day 2-3)
  → A5. Quiet check-in
Checkout morning
  → A6. Checkout reminder

Guest checks out                       Guest checks out
                                        → B1. Cleaner dispatched
                                          (Turno / Tidy / Properly /
                                           Breezeway / direct SMS)
                                        → B2. Lock code rotated
                                          (Igloohome / RemoteLock /
                                           August)
                                        → B3. Linen rotation check
                                        → B4. Maintenance walk if
                                          flagged from prior review
                                        → B5. Wait for "all clear"
                                          (cleaner photos + sign-off)
                                        → B6. Gate next guest's A3
                                          (24h pre-arrival) on B5
                                          confirmation
```

The "all clear" gate is the most important link in the chain. The
24h pre-arrival to the NEXT guest does not fire until the cleaner
confirms turnover complete. If the cleaner is running late, the
agent surfaces — does not fire the message into an unready property.

---

# PART A — Pre-arrival comms sequence

## A1 — Booking confirmation (within 10 mins of confirm)

The first message after a booking confirms. Tone is channel-
calibrated. Channel manager auto-responds in most cases — the agent
drafts and surfaces if the auto-message is off, or if there's
something property-specific worth saying (key collection from a
neighbour, peculiar parking, gate code).

**Airbnb template:**

```
Hi [first name] — booking's in for [arrival date] – [departure date],
welcome! I'm [host first name], host of [property name].

Quick orientation:
- Check-in any time from 3pm — full door code and wifi go out 24h
  before arrival
- Check-out by 11am
- Address: [street + suburb] — I'll send a Google Maps pin closer
  to arrival
- House rules + the welcome pack: [Airbnb listing link / Hospitable
  link]

Anything specific to your trip (early arrival, late checkout, parking
for a van, allergies, dietary) — flag it now and I'll work it in.

See you on [arrival date].

[host first name]
```

**VRBO template (family-warm):**

```
Hi [first name] and family — confirmed for [arrival] – [departure].

We've hosted lots of families at [property name] — a couple of
things that help:
- Pack-n-play and high chair on request (free, just message me)
- Beach gear / kid bikes / pool noodles in the garage — help yourself
- Streaming logins for Netflix + Disney+ are in the welcome pack
- Check-in from 3pm, out by 11am

Door code + wifi go out 24h before arrival. Any questions ahead of
that, just message.

[host first name]
```

**Booking.com template (transactional):**

```
Dear [first name],

Confirmed: [property name], [arrival] – [departure].

Check-in: from 15:00. Check-out: by 11:00.
Address provided 24 hours before arrival, along with the door code
and wifi password.

For early arrival, late checkout, or any special requests, reply to
this message.

Regards,
[host first name]
```

**Direct booking template (warmest — earned this guest):**

```
Hi [first name] — so glad you're coming back to [property name].

Same drill as last time — check-in from 3pm, codes 24h ahead,
[any property-specific reminder, e.g. "the back deck firepit's
got fresh wood stacked"].

Total: $[X] — paid in full / deposit cleared, balance due [date].
Stripe receipt in your email.

See you on [arrival date].

[host first name]
```

If `learnings.md` flags this guest as a repeat, prepend:
`"Welcome back, [first name] — third stay, we'll have the [thing they liked last time] ready."`

## A2 — 7 days pre-arrival

The reminder. Confirms dates, sets up arrival logistics. Don't drop
the door code yet — too far out, guests forget by check-in.

**Standard template (works across channels with tone tuning):**

```
Hi [first name] — checking in on your stay at [property name],
[arrival] – [departure]. One week to go.

A few practicals:
- Address: [street + suburb + Google Maps pin]
- Parking: [BUSINESS CONFIG parking — one off-street spot in
  driveway / street parking, free 2-hr permits available at
  [council link] / no parking, public transport is [distance] away]
- Arrival window: any time from 3pm — message me if you'll arrive
  after 8pm so I can leave a light on / let the cleaner know
- 24h before arrival you'll get the door code + wifi + first-night
  tips

If anything's changed on your end — flight delay, extra guest,
cancellation — let me know now rather than later.

[host first name]
```

Include the Google Maps pin as a URL. Guests in unfamiliar
neighbourhoods skip listing addresses but click pins.

## A3 — 24 hours pre-arrival (the critical one)

The most-opened message of the whole sequence. Contains door code,
wifi, first-night tips. Times to land in the guest's local timezone,
24h before their stated arrival time (default 3pm).

**Standard template:**

```
Hi [first name] — checking in tomorrow!

CHECK-IN
- Door code: [4-6 digit code from Igloohome / RemoteLock — active
  from 1pm tomorrow, expires 12pm day after checkout]
- Address: [street + Google Maps pin]
- Parking: [parking note]
- Self check-in any time from 3pm — earlier if the cleaner's
  finished, I'll message if so

INSIDE
- Wifi: [network name] / [password]
- Streaming: [Apple TV / Roku — sign-in instructions in the welcome
  pack on the kitchen bench]
- Thermostat: set to 20°C — adjust to suit, BUSINESS CONFIG range is
  18-23°C
- Welcome pack on the kitchen bench has the rest — bin night,
  emergency contact, my mobile

FIRST NIGHT
- Coffee + tea + sugar in the cupboard above the kettle
- Milk in the fridge (oat + dairy)
- Local takeaway menus in the welcome pack — the Thai 2 doors down
  does the best green curry in the suburb

If anything's tricky on arrival — code won't take, can't find the
lockbox, you're locked out, kettle's dead — message me. I'm awake
till 10pm and the on-call number on the fridge after that.

See you tomorrow.

[host first name]
```

For self-check-in via Igloohome / RemoteLock, the code generated
must be active from 1pm of arrival day to 12pm the day after
checkout — gives early arrivals + late checkouts a buffer.

For lockbox + manual code, include a photo of the lockbox location:
`"Lockbox is the black box on the gas meter (photo attached) — code rotates monthly, this month it's [code]."`

## A4 — Check-in day "you in OK?" SMS at 6pm local

Short, low-friction. Pulls guest into the channel — most issues
surface at this exact moment (door code didn't work, wifi's slow,
TV remote dead).

```
Hi [first name] — you in OK? Anything not working?

[host first name]
```

That's it. If they reply with an issue, the agent routes to
`08-emergency-247.md`. If they reply "all good thanks" — log a
positive signal in learnings.md ("smooth check-in") and don't
message again until A5.

If no response by 8pm AND no door code activation logged on
Igloohome / RemoteLock — surface to operator. Possible no-show or
guest in trouble.

## A5 — Mid-stay check-in (day 2-3 for stays 4+ nights)

Skip for 1-3 night stays. Sequencing kills the experience on short
stays. For 4+ nights:

```
Hi [first name] — half way through. Everything good with the place?

[host first name]
```

If they reply with anything maintenance-related (slow drain, AC
making a noise, fridge running warm) — route to
`09-recurring-maintenance.md` or `08-emergency-247.md` based on
urgency. Don't promise "we'll send someone tomorrow" — say "I'll
sort it" and come back with a real time.

For 7+ night stays, also offer mid-stay clean:
```
Hi [first name] — half way through. If you'd like a quick freshen-up
(linen swap, towels, bins, kitchen wipe-down) I can send the cleaner
in tomorrow morning — included for stays over 7 nights.

[host first name]
```

## A6 — Checkout morning reminder

Sent at 8am local on checkout day. Tone friendly — guests who get
a polite reminder leave the place better.

```
Hi [first name] — checkout by 11am today.

Quick checkout list:
- Towels in a pile in the bathroom (don't worry about washing)
- Rubbish in the bins outside (left side for general, right for
  recycling — bin night is [day])
- Lock the front door on the way out — code expires at 12pm so no
  need to leave keys
- Anything you spilled / broke, no stress, just text me so the
  cleaner knows what to expect

Safe travels — review request coming in the next couple of days,
and if there's anything that wasn't quite right, message me first
so I can fix it.

[host first name]
```

The "message me first" line catches issues before they go in the
public review. For a property tracking a 4.92 average, one
unaddressed 3-star review is a 30-day recovery — better to know
now.

---

# PART B — Turnover dispatch (the moment a checkout confirms)

## B1 — Pick the cleaner per property

Read BUSINESS CONFIG → property block → primary cleaner / backup
cleaner. Check cleaner availability for the turnover window
(11am checkout → 3pm check-in = 4-hour window).

Decision tree:

```
Primary cleaner available for the turnover window? → assign primary
                                                       ↓ no
Backup cleaner available?                            → assign backup
                                                       ↓ no
Tight window (< 4hr) + same-day check-in?            → surface to operator
                                                       — manual rescue
Long window (> 6hr) + no check-in same day?          → schedule for
                                                       next morning
```

For Turno / Tidy / Properly / Breezeway / ResortCleaning, the
agent dispatches via the tool's marketplace or direct-team API.
For direct text dispatch (small portfolio, regular cleaner):

```
SMS to [cleaner first name]:

Turnover at [property internal name] — [street]
Checkout: [time] [day, date]
Check-in: [time] [day, date]
Turnover window: [X hours]
Last guest: [X nights, count — Y people]
Flagged from review / operator: [anything?]
Linen rotation: [3-set rule — set [X] on bed, [Y] in cupboard,
                  [Z] at laundry]
Checklist: [Properly / Breezeway link OR "standard turnover, photos
            of bedroom + bathroom + kitchen on completion please"]

Confirm when you've got it. Code for the door is [code from Igloohome
/ RemoteLock — active from [time] to [time]].

— [host first name]
```

If the cleaner doesn't confirm within 30 min during business hours
(8am-6pm local), the agent ESCALATES — re-pings primary, or
auto-falls-back to backup with operator surface.

## B2 — Generate the cleaning checklist

If BUSINESS CONFIG → cleaner tool is **Properly** or **Breezeway**,
the checklist already lives in the tool — the agent just links
the cleaner to the right one.

If checklist is inline in BUSINESS CONFIG, render it:

```
TURNOVER CHECKLIST — [property name]
=====================================
BEDROOMS
- [ ] Strip all beds, linen straight to laundry
- [ ] Inspect mattress + protectors for stains
- [ ] Make beds with fresh linen (set [X] from cupboard)
- [ ] Vacuum under beds, in corners
- [ ] Wipe bedside tables, lamps, switches
- [ ] Empty bins, fresh liner

BATHROOMS
- [ ] All towels off — replace with fresh set ([X] bath, [Y] hand,
       [Z] face)
- [ ] Toilet — bowl, seat, base, behind
- [ ] Shower — screen, head, drain hair, soap residue
- [ ] Mirror, vanity, taps
- [ ] Floor — mop including behind toilet
- [ ] Restock: 2 spare loo rolls, soap + body wash + shampoo +
       conditioner (refill or replace), bin liner

KITCHEN
- [ ] Fridge — empty all guest leftovers (binbag separately, save
       photo of contents before binning), wipe shelves
- [ ] Microwave inside + out
- [ ] Oven / stovetop — clean if used
- [ ] Dishwasher — empty + reload if dirty, run cycle
- [ ] Sink — descale, polish
- [ ] Bin — emptied, fresh liner
- [ ] Restock: salt/pepper, oil, coffee, tea, sugar, dish soap,
       sponge, tea towel

LIVING
- [ ] Vacuum all soft surfaces — couch cushions up
- [ ] Wipe coffee table, side tables, TV stand
- [ ] TV remote, AC remote — wipe, test batteries
- [ ] Throw cushions + blanket — rotated / washed if visible mark
- [ ] Welcome pack restocked on kitchen bench

OUTDOOR (if applicable)
- [ ] Sweep deck / balcony
- [ ] Empty outdoor bins
- [ ] BBQ cleaned if used
- [ ] Pool / spa — check chemistry if heating left on

PHOTOS REQUIRED ON COMPLETION
1. Each bedroom — bed made, floor visible
2. Each bathroom — clean toilet, fresh towels visible
3. Kitchen — clean sink + bench
4. Living — vacuumed, welcome pack visible
5. Anything broken / stained / missing — flag with note

FLAGGED FROM PREVIOUS:
[from learnings.md or previous review — e.g. "previous guest noted
slow drain in main bathroom — please test and flag if not running
clear", "remote control batteries reported dead — replace"]

— Send "all clear" + photos to [host first name] when done.
```

## B3 — Rotate the lock code

Per BUSINESS CONFIG → lock brand:

- **Igloohome / igloocompanion API:** Generate new code via API,
  active from check-in -2 hours to checkout +1 hour. Send to next
  guest in their A3 message (24h pre-arrival). Cleaner gets a
  separate one-time code valid for the turnover window only.
- **RemoteLock:** Same flow via RemoteLock API. Cleaner code via
  the "service" category — auto-expires.
- **August / Yale / Schlage Encode (Wi-Fi smart lock with app):**
  Generate one-time code via app API or render instructions for
  operator to set in the app.
- **Manual lockbox + rotating combo:** Surface to operator to
  rotate at the next changeover. Send next guest the same code
  it was set to — and calendar a reminder to rotate monthly.

If the lock is offline / unreachable (Wi-Fi outage, dead battery
flag from Igloohome's status API) — surface IMMEDIATELY. A
self-check-in property without a working lock = guest stranded at
3pm = 1-star review + Aircover claim.

## B4 — Linen rotation check

The 3-set rule: one set on the bed, one in the cupboard, one at
the laundry / commercial linen service (BUSINESS CONFIG → linen
service: Spotless / Alsco / regional commercial / internal).

Cleaner reports linen rotation status as part of "all clear":

```
LINEN STATUS — [property name]
Set on bed: [X] (fresh from cupboard)
Set in cupboard: [Y] (clean, ready)
Set out for collection: [Z] (commercial pickup [day] / internal wash)

If "set in cupboard" drops below 1 → reorder via 07-supplier-ordering.md
```

If linen drops below the 3-set threshold (e.g. one set permanently
out of rotation due to stain / damage), agent flags to
`07-supplier-ordering.md` to replenish.

## B5 — Maintenance walk if flagged

Read `learnings.md` and the previous guest's exit messages /
review. If anything's flagged:

- Slow drain / weak hot water / fridge running warm → schedule
  contractor via `09-recurring-maintenance.md` BEFORE next check-in
- Loose tap handle / squeaky door / loose toilet seat → ask
  cleaner to fix during turnover (most cleaners carry a basic
  toolkit); if not, schedule
- AC noise / pool pump issue / dishwasher not draining → escalate
  to specialist; don't accept the next check-in if it's a
  guest-experience-killer

If maintenance can't be resolved before check-in, surface to
operator: *"Maintenance flag from [guest]'s exit: [issue]. Next
check-in is [date]. Recommend [contractor] dispatched today, OR
relocate guest, OR refund partial + disclose."*

## B6 — Cleaner "all clear" tracking

The gate. Until the cleaner confirms turnover complete with photos,
the next guest's A3 (24h pre-arrival message) does NOT fire.

Cleaner sends:
```
ALL CLEAR — [property name] — [time]
Photos attached (bedrooms x N, bathrooms x N, kitchen, living)
Linen status: [as above]
Issues to flag: [none / specific]
```

Agent logs:
```
TURNOVER LOG — [property name]
Checkout: [time]
Cleaner dispatched: [time]
Cleaner confirmed: [time]
Turnover started: [time]
Turnover complete: [time]
Photos received: [yes]
Issues flagged: [list / none]
Next guest A3 message gated: [yes — fired at 3pm tomorrow]
```

If the cleaner doesn't send "all clear" by 1pm local on check-in
day (assuming 3pm check-in), agent surfaces — the property may
not be ready. Operator decides: delay check-in, swap cleaner, or
greet guest in person.

---

# PART C — Channel sync coordination

## Calendar block on all channels

Channel manager (Hospitable / OwnerRez / Hostaway / Guesty /
Lodgify / iGMS) handles cross-channel calendar sync automatically.
The agent's job: verify the block landed on every listed channel
within 5 minutes of confirm.

If BUSINESS CONFIG → channel manager = **None — Airbnb app only**,
and the property is multi-channel, the agent FLAGS manual sync:

```
MANUAL CALENDAR SYNC REQUIRED — [property name]
Booking confirmed: [channel, dates]
You need to block these dates on:
- VRBO listing [#] (URL)
- Booking.com listing [#] (URL)
- Stayz / Direct site

Risk: double-booking if not blocked within 60 min. Confirm when done.
```

Multi-channel without a channel manager is the #1 cause of
double-bookings. The agent treats it as urgent.

## Double-booking detection

If two confirmations land on overlapping dates for the same
property (channel-sync lag, manual booking missed) — EMERGENCY.

Route IMMEDIATELY to `08-emergency-247.md` double-booking protocol.
Don't try to handle in this skill — the recovery is time-sensitive
(re-house, refund, or upgrade) and the choice depends on which
booking came first, channel cancellation policies, and Aircover
implications.

---

## Pre-arrival templates per channel — tone calibration

| Touch | Airbnb | VRBO | Booking.com | Direct |
|---|---|---|---|---|
| Greeting | "Hi [first name]" | "Hi [first name] and family" | "Dear [first name]" | "Hi [first name]" |
| Length | 60-100 words | 80-120 words (more detail) | 40-70 words (skim-friendly) | 50-80 words (warm, brief) |
| Voice | Friendly + informal | Family-warm + helpful | Transactional + polite | Personal + earned |
| Sign-off | "[host first name]" | "[host first name]" | "Regards, [host first name]" | "[host first name]" |
| Emoji | Optional, low-density | Light — house, suitcase | None | Match relationship history |

---

## Hard rules

- **Never fire the 24h pre-arrival message before the previous
  cleaner sends "all clear".** Sending the door code into an
  unready property = guest arrives to a half-clean place = 1-star
  review.
- **Never give the door code more than 24h ahead.** Codes leak,
  guests forget, and Igloohome / RemoteLock only schedule codes
  with realistic active windows.
- **Never send pre-arrival comms in your timezone if the guest is
  in a different one.** A 2am "checking in tomorrow" message =
  red flag for the algorithm. Send in guest local time.
- **Never use auto-language verbatim across channels.** Booking
  flags suspicious patterns. Tune tone per channel.
- **Never bypass the cleaner "all clear" gate**, even under time
  pressure. If the cleaner is late, surface and decide — don't
  pre-emptively send the code.
- **Always check `learnings.md` for repeat guests.** Direct repeat
  guests get warmer, more personal messages — they earned it.
- **Always verify calendar block landed cross-channel within
  5 minutes** if channel manager is in play. If channel manager
  is "None", flag every booking for manual block.
- **Always include a "message me if anything's tricky" line in
  the 24h pre-arrival.** The one-issue-pre-checkin saved review.
- **Never include the wifi password or door code in the booking
  confirmation (A1)** — it's too early, and guests lose track.
  A3 only.

## Reading the learnings.md

Open `learnings.md`. If:

- This guest is a repeat → warmer A1, mention what they liked last
  time, skip the basic logistics ("you know the drill")
- This guest's previous stay had an issue → fix BEFORE arrival,
  mention it in A3 ("the slow drain you flagged is sorted — fresh
  basin")
- This property has a known A3 fail pattern (guests miss the
  lockbox photo, the wifi password is hard to type) → preempt
- This cleaner is on a 3-strike pattern of late turnovers → assign
  backup
- A specific weekday turnover has historically been tight (Sunday
  → Monday flips with brunch traffic) → build a 30-min buffer

## Confirm + handoff

After dispatch + comms sequence:

> *"Pre-arrival sequence loaded for [guest, property, dates].
> A1 sent via [channel]. A2 scheduled for [date]. A3 scheduled for
> [date+T-24h, time local]. A4-A6 queued. Cleaner [name] dispatched
> for turnover [date, time]. Lock code [code] generated, active
> [window]. Calendar block confirmed on [N] channels. Waiting on
> "all clear" before next A3 fires."*

Hand off to:
- `08-emergency-247.md` if check-in goes sideways
- `05-compliance.md` if STR registration is expiring (60-day
  warning surfaced in weekly report)
- `06-invoice-payment.md` for direct bookings — Stripe receipt
  + security deposit hold
- `11-followup-reviews.md` after checkout — review request + host
  review

## Done condition

- All six guest touches scheduled or sent
- Cleaner dispatched + confirmed
- Lock code rotated + active window correct
- Linen rotation tracked
- Calendar block confirmed cross-channel
- "All clear" gate set on next A3
- Logged in `learnings.md` for the per-property cycle metrics
