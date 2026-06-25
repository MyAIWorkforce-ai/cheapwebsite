# Email pack — longer-form customer touches

The agent uses these when email is preferred over SMS (project
quotes, invoices, formal warranty / handover correspondence,
commercial customers, seasonal campaigns). Merge fields tagged like
the SMS pack.

## Quote — project (use with `03-quote-project.md`)

```
Subject: Quote — [job summary] at [address]

Hi [name],

Quote for [job summary] at [address]:

[Full itemised quote — see 03-quote-project.md for structure]

Reply "go ahead — Option A" (or B/C) to lock it in. Happy to walk
you through the quote on a quick call if anything's unclear.

Thanks,
[your name]
[Business name]
[Refrigerant licence — e.g. ARC RHL Full # / EPA 608 Universal # /
F-Gas C&G 2079 / MCS # / Red Seal 313A]
[Gas ticket # — if applicable]
[ABN / VAT / EIN]
[Insurance: Public liability $20M, [insurer]]
```

## Invoice (use with `06-invoice-payment.md`)

```
Subject: Invoice INV-[YYYYMM]-[N] for [job summary] at [address]

Hi [name],

Here's the invoice for the work [date]. Total: $[X] (deposit of
$[Y] already credited where applicable).

Pay via Stripe (instant — covers card, Apple Pay, BPAY):
[Stripe payment link]

Or EFT:
  BSB:    [from BUSINESS CONFIG]
  Acct:   [from BUSINESS CONFIG]
  Ref:    INV-[YYYYMM]-[N]

Refrigerant logbook + handover pack attached for your records.

Any questions, just reply.

Thanks,
[your name]
[Business name]
```

## Refrigerant logbook + handover pack covering note

```
Subject: Refrigerant log + handover pack — [job summary] at [address]

Hi [name],

As promised, here's the [refrigerant logbook entry + handover pack
+ gas safety cert if applicable] for the work completed [date].

Keep these for your property records:
- The refrigerant logbook entry is what the next HVAC tech will
  ask for (it records what's in the system, how much, and when last
  serviced)
- The handover pack has your warranty registration, commissioning
  results, and user operation guide
- Conveyancers will ask for both at sale time
- Insurance may require them after any claim event

If you misplace them, just drop me a line — I keep copies on file
for [5 years UK / 7 years AU / 3 years US federal] per regulation.

Thanks,
[your name]
[Business name]
[Refrigerant licence # / Gas ticket #]
```

## Equipment warranty registration confirmation

```
Subject: Your new system's manufacturer warranty is registered

Hi [first name],

Quick housekeeping note — I've registered your new [brand + model]
warranty in your name with [manufacturer].

Warranty terms:
- Equipment: [years parts + labour]
- Compressor: [some brands carry extended — e.g. Mitsubishi 10 yr]
- Workmanship (us): 12 months from install

Operating tips:
- Setpoints: 24°C cool / 21°C heat is the efficiency band — every
   degree colder/warmer adds ~6-8% to running cost
- Filter access: lift the front panel of the indoor head, slide
   out the mesh, vacuum monthly (deep clean quarterly)
- The outdoor unit needs clear airflow — keep plants 30cm back,
   clean lint off the coil pre-summer
- Manufacturer recommends an annual service — we'll send a reminder
   in [month next year]

If anything fails within the warranty period, call us first — we
handle the manufacturer claim for you. No paperwork on your end.

Thanks,
[your name]
[Business name]
```

## Day-30 warranty check-in (project jobs)

```
Subject: 30-day check — [job summary]

Hi [first name],

[your name] from [Business name] here. Just touching base 30 days
on from the [job summary]. Couple of quick checks:

- Is the [thing] still running as expected?
- Any noises, vibrations, smells, drips?
- Temperature holding at setpoint?
- Anything small you've been meaning to flag?

Workmanship warranty is 12 months from completion — covers anything
on us. Reply yes/no and I'll respond same day.

Cheers,
[your name]
[Business name]
```

## Quarterly relationship touch (for project + commercial customers)

```
Subject: Quick check-in — [Business name]

Hi [first name],

[your name] — hope all's well at [property / business]. Quick
check-in: anything HVAC-related we can sort while we're in the
area? Could be small (a head running noisier than it used to, a
zone that's stopped pushing air) or big (planning a new build,
RTU change-out, retrofit-to-heat-pump conversation).

No pressure — just keeping the line open.

Thanks,
[your name]
[Business name]
```

## Annual service plan visit — pre-visit confirmation

```
Subject: Annual service visit — [date]

Hi [first name],

Confirming your annual service visit for [date] at [time window].

What we'll do (60-90 mins per system):
- Check + clean filter
- Clean condenser coil (outdoor unit)
- Flush condensate drain
- Check refrigerant pressures (no recharge unless a leak is found)
- Test capacitor + contactor
- Calibrate controls
- Walk you through any findings

Access needed:
- Indoor head area (clear furniture nearby)
- Outdoor unit (clear plants / blockages)
- Breaker panel
- You don't need to be home if you can leave us a way in

Any system changes since last visit (new units added, controls
reconfigured)?

Cheers,
[your name]
[Business name]
[Refrigerant licence #]
```

## Service plan renewal proposal

```
Subject: Service plan renewal — [Customer]

Hi [name],

Your service plan with [Business name] is up for renewal on [date].
Quick year-in-review:

Past 12 months under your plan:
- [N] × scheduled service visit(s) completed
- [M] breakdowns (covered with 10/15% discount)
- $[X] in rectification work approved (separately quoted)
- Refrigerant log + handover docs current

YEAR-2 RENEWAL — three options:

1. RENEW PLAN A — Essential
   $[X]/year (15% loyalty discount applied) — was $[Y] year-1
   Same scope as year-1.

2. UPGRADE TO PLAN B — Comprehensive
   $[X]/year (15% loyalty discount applied) — was $[Y] standard
   Adds: 2 visits/year (pre-summer + pre-winter), coil
   sanitisation, indoor coil deep clean every 2nd year, 15%
   off breakdowns + parts, same-day priority in heatwaves.
   Worth it if: system 5+ years old, you've had 1+ breakdowns,
   or you want extra peace of mind.

3. END THE PLAN
   No drama. We'll keep your system records on file in case you
   come back.

Reply "renew A" / "upgrade B" / "end" and I'll lock it in.
Auto-renews to Plan A per the original contract if we don't hear.

Thanks for the year,
[your name]
[Business name]
```

## Commercial maintenance contract — quarterly visit summary

```
Subject: Quarterly maintenance visit — [Customer], [date]

Hi [name],

Quarterly service visit complete at [property] on [date]. Summary
of findings:

ROUTINE TASKS COMPLETED
- [N] split / cassette / ducted units serviced (filters, condenser
  coils, drain flushes, refrigerant pressure checks, capacitor +
  contactor tests)
- [M] RTUs serviced (above + belt/bearing check + ductwork
  inspection)
- BAS controls health check (if applicable)
- Refrigerant logbook entries lodged for all units (no recharge
  required this visit)

FLAGGED ITEMS (rectifications quoted separately)
1. [Unit ID] — capacitor reading 28 μF (nameplate 45 ±6%), replace
   within 3 months. $185 + 30 min.
2. [Unit ID] — indoor coil heavy contamination, deep clean
   recommended within 6 months. $320 + 45 min.
3. [Unit ID] — outdoor fan motor bearing noise, monitor + replace
   at next visit if worse. $450 + 1 hr.

REFRIGERANT TRACKING
- kg in system (across all units): [X]
- kg recovered this visit: 0
- kg charged this visit: 0
- Next mandatory leak inspection (UK F-Gas / AU per AS 5149):
  [date — calendared]

ANNUAL PLAN STATUS
- Visits completed YTD: [X of Y]
- Annual plan revenue: $[X]
- Rectification revenue YTD: $[X]
- Plan year ends: [date]

Separate quote attached for the three flagged items above. Total
$[X] + tax.

Thanks,
[your name]
[Business name]
[Refrigerant licence # / Gas ticket #]
```

## Quote follow-up (project quotes that haven't replied after 5 days)

```
Subject: Following up — quote for [job summary]

Hi [first name],

Following up on the quote I sent for [job summary] on [date].
Wanted to check in:

- Any questions about the quote?
- Has the timing changed at your end?
- Anything in the scope you'd like adjusted?
- Want to talk through the brand options A/B/C?

The quote stays valid for 30 days from issue. Heads up — for
heat pump retrofits in particular, the grant scheme cycle [BUS UK /
Solar Vic AU / IRA US] can move month-to-month, so locking in
sooner protects the grant capture.

For [equipment] specifically, current supplier lead time is
[X days/weeks]. If we lock in now we hit [install month]; if we
delay 2 weeks, we slip to [next month].

If it'd help, happy to get on a quick 5-min call.

Thanks,
[your name]
[Business name]
```

## Bad-news email — re-quote required after site inspection

```
Subject: Update on the quote for [job summary]

Hi [first name],

After today's site inspection I need to re-quote the [job]. Quick
summary of what changed:

[Honest paragraph — what I expected vs what I found, why the price
moves. E.g.: "I expected the existing line set to be re-usable.
It's the original 14-year-old copper, pitting at the indoor flare
joint, and re-pressure-testing shows a slow drop. We need to
re-run the line set; that's an extra 2 hours labour and $180 in
copper + insulation. The good news: while we were there I confirmed
the outdoor pad position is solid + level, so the equipment side
of the install is faster than I'd budgeted (save 1 hr there)."]

Updated quote attached. Worth noting:

- The original was based on [original assumption]
- We found [actual condition], which means [implication]
- New total: $[Y] (was $[X])

Happy to talk it through — give me a call on [phone] if anything's
unclear. If the new number's a stretch, we can also look at a
staged approach (do [the critical bit] now, [the rest] within a few
months).

Thanks,
[your name]
[Business name]
```

## Good-news email — under quote

```
Subject: Job done at $[X under quote] — [job summary]

Hi [first name],

Quick good-news note: the [job] came in $[X] under the quoted
price. The [reason — e.g. "line set was actually in great nick,
didn't need replacing"]. I've adjusted the invoice down — final
is $[Y] instead of the original quote of $[Z].

Refrigerant log + handover pack attached.

Thanks for the work,
[your name]
[Business name]
```

## Heatwave forecast email — to service plan members

```
Subject: Heatwave forecast next [3] days — quick filter check today?

Hi [first name],

Heatwave declared by [BoM / Met Office / NWS] for [date range],
peaks at [40°C].

One quick thing you can do today (5 mins):
1. Pop the front panel of the indoor head
2. Slide out the mesh filter
3. Vacuum or rinse (let dry before re-installing)

Filters are the #1 cause of "AC not cooling" in a heatwave. Dust
build-up restricts airflow and pushes head pressure up, which is
how compressors fail in 40° heat.

As a plan member, you've got priority dispatch + no surcharge for
the first hour if you do have a breakdown. Call [phone] direct;
we'll skip the queue.

Stay cool,
[your name]
[Business name]
```

## Cold-snap forecast email — to heat pump customers

```
Subject: Cold snap next [3] nights — quick check tonight?

Hi [first name],

Cold snap forecast: overnight lows [X°C] for the next [3] nights.

Heat pump owners — two quick checks:
1. Is your outdoor unit clear of leaves / debris? Heat mode pulls
   air through the coil; blockage = poor heat output.
2. Set the indoor controller to "Heat" mode (not "Auto") tonight
   so the system doesn't waste cycles switching back to cool when
   the room warms.

If you see frost building on the outdoor coil + no defrost cycle
kicking in within an hour, that's a control board / sensor / valve
fault and worth catching now. Call us before it fails overnight at
2am.

Plan members: priority dispatch + no surcharge for first hour.

Stay warm,
[your name]
[Business name]
```

## Pre-summer campaign — past customer email (use with `10-leadgen`)

```
Subject: Pre-summer AC tune-up — $189 if you book by [date]

Hi [first name],

Quick note from [Business name] — pre-summer tune-up window is
open. Through [date] we're running annual AC services at $189
(usually $295).

Why pre-summer matters:
- Capacitors fail more in the first heatwave than the rest of
  the year combined. They sit dormant in winter, contacts
  oxidise, and the first 35°C+ day they pop.
- A capacitor swap on a service visit = $50 part + 30 min.
- A capacitor swap on a heatwave-week emergency = $400 callout
  + $50 part.

What's included:
- Filter clean (replace if needed)
- Outdoor condenser coil clean
- Drain pan + condensate flush
- Refrigerant pressure check
- Capacitor + contactor test
- Controls calibration
- Written report

Book by reply, or call [phone].

If you're interested in the annual service plan ($295/year, year-1
free with this tune-up), let me know — most past customers find
they save money on it within 18 months.

Cheers,
[your name]
[Business name]
```

## Pre-winter campaign — past customer email

```
Subject: Pre-winter heating check — $189 if you book by [date]

Hi [first name],

Pre-winter window is open. Through [date] we're running heat pump
+ ducted heating checks at $189 (usually $295).

Why pre-winter matters:
- Heat pumps share most components with cool mode, but the
  reversing valve + defrost cycle only get tested in winter.
- Marginal faults show at -2°C overnight, not at shoulder
  temperatures.
- Frost forming + staying on outdoor coil = defrost cycle issue.
- Gas heaters: combustion + flue spillage + CO check is
  life-safety, not optional.

What's included:
- Filter clean (replace if needed)
- Indoor coil clean if dusty
- Drain (heat mode produces condensate too)
- Refrigerant pressure check in heat mode
- Reversing valve + defrost cycle test
- Capacitor + contactor check
- Combustion + flue + CO (if gas, ticketed only)
- Written report

Book by reply, or call [phone].

Cheers,
[your name]
[Business name]
```
