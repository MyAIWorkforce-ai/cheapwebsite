# SMS pack — drop-in messages for every customer touch

The agent uses these as starting points. Each one is in plain
voice, under 320 characters (single-SMS), no emoji unless the
BUSINESS CONFIG asks for it. Tag merge fields as `[name]`,
`[address]`, `[time]`, `[$X]`, `[your name]`, `[link]`, etc.

## Intake — first reply (within 5-15 mins of incoming)

```
G'day [name] — sounds like [their issue, paraphrased]. To get
you a sharp quote, can you [missing fact]? I'll send a quote
and a time window straight back.

— [your name], [Business name]
```

## Quote — sent (one-off, callout-sized)

```
Hi [name] — quote for [job summary] at [address]:

[Service]: $[X] (incl. [carpet / oven / extras if relevant])
Tax: incl.
Total: $[Y]

[Bond clean: Includes 72-hr bond guarantee + photo evidence
pack to your agent.]

Available [day 1] or [day 2]. Reply with your pick + [deposit
if applicable] to lock it in.

— [your name], [Business name]
```

## Quote — sent (recurring)

```
Hi [name] — quote for fortnightly clean at [address]:

$[X] per visit (~2.5 hrs, 1 cleaner)
Annual: $[X] (= $X/visit × 26)
Direct debit on visit-day, auto-renewing 12 months.

First fortnightly free if you sign up this month.

Available [day 1] or [day 2] for first visit. Reply YES + I'll
send the sample contract.

— [your name]
```

## Booking confirmation — one-off

```
Booked, [name]: [day, date], [time window], at [address].
Total: $[X] ([30% deposit / due on day / Net 7]).

I'll text the morning of with a tighter ETA + crew name.

— [your name], [Business name]
```

## Booking confirmation — bond clean (with property condition prompt)

```
Booked, [name]: [day, date], [time window]. Quick prep:
- Photo of the property the day before helps us pre-load
- Confirm access (lockbox / key / agent / you'll be there)
- 30% deposit Stripe link: [link]
- 72-hr guarantee + photo pack to your agent included

— [your name], [Business name]
```

## Booking confirmation — recurring (first visit)

```
Welcome [name]. First recurring clean: [day, date], [time].
Crew lead: [name]. Direct debit set up — first one on
visit-day.

Reach me anytime on [phone] if anything changes.

— [your name], [Business name]
```

## Booking confirmation — STR turnover (host)

```
Booked, [host name] — turnover at [property] on [date], window
[X-Y]. Smart-lock code current — we use the rotating code.
Linen from on-site cupboard. Photo pack within 30 min of done.

— [your name]
```

## Booking confirmation — commercial nightly (first visit)

```
Confirmed first nightly — [date], we arrive [time] after staff
depart. Alarm code on file. Lead [name] signs in/out via
alarm panel + time-stamped report after each visit.

— [your name]
```

## Booking confirmation — NDIS (with plan manager cc)

```
Confirmed — fortnightly NDIS-funded clean for [first name],
starting [date]. Plan manager [name] copied. Service agreement
signed. Each invoice follows NDIS Price Guide line item.

— [your name]
```

## On the way

```
On the way, [name] — [crew lead first name] + crew, ETA [time].
See you at [address] shortly.

— [your name], [Business name]
```

## On the way — recurring (simpler)

```
On the way [name] — [crew lead] arriving [time]. Fortnightly
clean as usual.

— [your name]
```

## Running late

```
Running ~30 mins late from a previous job, [name]. New ETA
[time]. Sorry for the wait — crew lead [name] will be there.

— [your name]
```

## Completion — one-off (with photo pack link)

```
Job done, [name] — [one-line summary].
Photo pack: [link]
Invoice on the way — $[X]. Thanks for the work.

— [your name]
```

## Completion — bond clean (the deliverable)

```
Bond clean complete, [name]. Property looking sharp.

Photo pack (time-stamped, before/after): [link]
Forwarded to [agent name] too — arrives within the hour.

72-hr guarantee active. If agent flags anything, send me
a screenshot — no charge for re-clean.

Invoice on the way — $[X] (less the $[Y] deposit).

— [your name]
```

## Completion — STR turnover (to host)

```
Turnover complete at [property]. Ready for check-in.

Photo pack: [link]
Items flagged: [e.g. "1 wine glass chipped — left in kitchen",
"coffee pods low — added to next order"]

Next turn: [date if known]

— [your name]
```

## Completion — recurring (with optional mid-clean kitchen
photo for review velocity)

```
All done [name] — fortnightly clean wrapped. Mid-clean
kitchen shot for your records: [link]

Direct debit charged. Next visit: [date].

— [your name]
```

## Day-1 check-in

```
Morning [first name] — [your name] from [Business name]. Quick
check: how's [the bond clean / the place feeling / the
turnover]? Any issues, sing out and I'll sort it.

— [your name]
```

## Day-1 check-in — bond clean specific

```
Morning [first name] — quick check on yesterday's bond clean.
Inspection coming up soon? Photo pack still here if you need:
[link]

72-hr guarantee active until [date+72h] — if anything from
the agent, send me a screenshot.

— [your name]
```

## Day-3 review request + recurring conversion offer (the big
one)

```
Hi [first name] — [your name] from [Business name].

Two quick things while [the bond clean / deep clean] is fresh:

1. 30-second Google review: [link]
2. Quick offer: regular fortnightly clean for $[X]/visit
   (1.5-2 hrs, every other [day]). First one free if you
   sign up this month. Reply YES + I'll send contract.

Cheers either way,
[your name]
```

## Day-3 review request — STR / commercial / NDIS (no
conversion offer)

```
Hi [first name] — [your name]. Glad the [service] is going
well. If you've got 30 sec for a Google review, it really
helps a small business: [link]

Cheers,
[your name]
```

## Day-7 follow-up — bond clean specific

```
Hi [first name] — [your name]. Quick check — did the bond
come back? If the agent flagged anything, the 72-hr
guarantee covers re-attend.

If bond came back full — congrats. A review mentioning
bond return helps other renters find us: [link]

— [your name]
```

## Day-30 warranty / anniversary check

```
Hi [first name] — [your name] from [Business name]. Quick
30-day check on the [job]. All good? Any feedback on what
you'd like to adjust?

— [your name]
```

## Day-90 relationship touch

```
Hi [first name] — [your name]. Hope all's well. Just thinking
— it's been a few months since the [job]. Anything else
lining up?

[For one-offs that didn't convert: Fortnightly offer's
still open if you ever want it — $[X]/visit, first free.]

— [your name]
```

## Urgent — biohazard / sewage safety advice

```
Hi [name] — sewage / biohazard, do NOT enter the area. PPE
up or wait for us. Keep kids + pets out. Open windows. Stop
using any drain or fixture feeding the line.

Quote in 5 min.

— [your name]
```

## Urgent — flood (after plumber)

```
Hi [name] — flood. Few steps now:
1. Water source OFF (plumber if not)
2. Open windows
3. Lift items off the wet floor (especially electronics)
4. Don't touch wet outlets

We bring wet-vac + dehumidifier. Quote in 5 min.

— [your name]
```

## Urgent — last-min STR turnover

```
Got it [host name] — guest [time], property needs full turn.
Crew can be there [X] min.

Urgent rate: $[X] (50% premium on standard $[Y] — covers
crew mobilisation).

Reply YES + we roll. Photo pack within 30 min of done.

— [your name]
```

## Urgent — complaint recovery on recurring

```
Hi [name] — [your name]. Sorry the [issue] wasn't to the
standard. We'll come back and re-clean the [area] free —
when works? Today / tomorrow?

While I'm here — anything else on the visit that wasn't
right? Want to sort it all.

— [your name]
```

## Off-call / urgent decline (with partner business)

```
Hi [name] — really sorry, on off-call rotation tonight. For
urgent, try [partner business] on [phone]. If it can wait
til 7am, send the details + I'll book first thing.

— [your name]
```

## Trauma / mould sub-out

```
For [trauma / mould] specifically, that's a licensed
specialist by law in most areas — not a regular cleaner.

In your area, [specialist business + phone] handles this.
After they've done remediation, if there's general
cleaning needed, I can come in then at standard rates.

— [your name]
```

## Quote follow-up (24h after quote with no reply)

```
Hey [name], just bumping the quote from yesterday — still
keen? Same windows are open. The [Friday morning] slot is
the next before we book it out.

— [your name]
```

## Invoice overdue — 3 days

```
Hi [name] — gentle bump on invoice [INV-XXX] from [date].
Total $[X] still outstanding. Pay link / EFT same as before.
Let me know if anything's holding it up.

— [your name]
```

## Invoice overdue — 10 days

```
Hi [name] — invoice [INV-XXX] now 10 days overdue. Please pay
by [date] or let me know what's holding it up. Late fees per
the original quote apply after that.

— [your name]
```

## Direct debit failed — first

```
Hi [name] — heads up, direct debit for [date] didn't go
through (likely bank issue). We'll auto-retry [date+3]. If
you'd rather pay another way, Stripe link: [link]. No charge
for the bounced payment.

— [your name]
```

## Direct debit failed — second

```
Hi [name] — second DD attempt didn't clear. Want to update the
payment method or use Stripe for now? Pausing future DD until
sorted. Cleaning continues as scheduled.

— [your name]
```

## Cancellation accepted

```
No worries, [name] — cancelled. If you want to rebook just
send through the date and I'll find a slot.

— [your name]
```

## Bond callback (within 72 hrs of bond clean)

```
Hi [name] — got your message. Photo pack from [date] shows
[items as cleaned]. Either way — we attend FREE to re-clean
anything the agent flagged. [Tomorrow morning] or [day after]?

Photo pack of re-clean within 30 min of done.

— [your name]
```

## Annual escalation notice (recurring contract anniversary
nearing)

```
Hi [name] — annual review of your [fortnightly] contract.
From [anniversary date], per-visit moves to $[new] (was
$[old], up [%] — CPI + chems + wages).

No action needed. If you'd rather adjust scope to hold the
price, give me a shout.

— [your name]
```

## Recurring conversion offer (post one-off Day-3)

```
Hi [first name] — [your name]. Quick offer: regular
fortnightly clean for $[X]/visit (1.5-2 hrs). First
fortnightly free this month.

Most customers say it's the best decision they made all
year. Reply YES + I'll send the contract.

No pressure either way.

— [your name]
```

## Referral nudge (after 5-star review)

```
Cheers again for the review, [first name]. If anyone you
know needs a cleaner, my number's [phone] — $30 credit on
your next clean for any referral that books in.

No pressure.

— [your name]
```

## STR linen low alert (to host)

```
Hi [host name] — heads up, [duvet covers / pillow cases]
running low after today's turn. We've got [N] left. Worth
re-stocking before [date] — I can grab from your supplier
if you give me the OK.

— [your name]
```

## Commercial supplies low (to facility manager — monthly
context)

```
Hi [facility manager name] — running low on [paper / soap /
liners] going into next month. We can re-stock from your
supply or order on your account — let me know what suits.

— [your name]
```

## NDIS plan funded hours nearing limit

```
Hi [plan manager / participant] — quick heads up: [participant
first name]'s plan funded cleaning hours at [65%] used. At
current cadence we'll hit the cap around [date]. Want to chat
about next steps before plan review?

— [your name]
```
