# Email pack — longer-form customer touches

The agent uses these when email is preferred over SMS (project
quotes, invoices, formal warranty / cert correspondence, commercial
customers). Merge fields tagged like the SMS pack.

## Quote — project (use with `03-quote-project.md`)

```
Subject: Quote — [job summary] at [address]

Hi [name],

Quote for [job summary] at [address]:

[Full itemised quote — see 03-quote-project.md for structure]

Reply "go ahead" to lock it in. Happy to walk you through the quote
on a quick call if anything's unclear.

Thanks,
[your name]
[Business name]
[Plumbing Lic # / Gas Type A # / Drainlayer #]
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

Compliance Cert + Gas Cert attached for your records.

Any questions, just reply.

Thanks,
[your name]
[Business name]
```

## Compliance cert covering note (when sending cert(s) via email)

```
Subject: Compliance Cert(s) — [job summary] at [address]

Hi [name],

As promised, here's the [Compliance Certificate + Gas Type A Cert /
G3 Cert / EICR-equivalent / Permit Notice] for the work completed
[date]. Keep these for your property records — conveyancers will ask
for them at sale time, and insurance may require them after the
next claim event (and any future gas inspection definitely will).

If you misplace them, just drop me a line — I keep copies on file
for seven years.

Thanks,
[your name]
[Business name]
[Plumbing Lic # / Gas Type A #]
```

## Hot water cylinder — warranty registration confirmation

```
Subject: Your new HWS warranty is registered

Hi [first name],

Quick housekeeping note — I've registered your new [brand + model]
hot water unit warranty in your name with [manufacturer].

Warranty terms:
- Cylinder/heat exchanger: [years]
- Parts: [years]
- Labour (manufacturer): [years]

If anything fails within the warranty period, call us first — we
handle the manufacturer claim for you. No paperwork on your end.

Operating tips:
- The outlet temperature is set to 50°C (hot enough, safe for
  scalding regs)
- The tundish under the unit is your "everything OK" indicator —
  if you ever see water dripping from it, that's the safety
  pressure valve relieving. Call us — it's covered.
- Manufacturer recommends a service every 12 months. We'll send a
  reminder.

Thanks,
[your name]
[Business name]
```

## Day-30 warranty check-in (project jobs)

```
Subject: 30-day check — [job summary]

Hi [first name],

[your name] from [Business name] here. Just touching base 30 days on
from the [job summary]. Couple of quick checks:

- Is the [thing] still working as expected?
- Any noises, drips, or temperature issues?
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
check-in: anything plumbing-related we can sort while we're in the
area? Could be small (a tap that's started weeping, a slow drain
you've been meaning to mention) or big (planning a bathroom reno,
HWS upgrade, gas appliance install).

No pressure — just keeping the line open.

Thanks,
[your name]
[Business name]
```

## Commercial contract renewal proposal

```
Subject: Maintenance contract renewal — [Customer]

Hi [name],

The [Customer Business] plumbing maintenance contract is coming up
for renewal on [date]. Quick summary of the last 12 months:

- [N] scheduled visits completed (backflow, HWS service, TMV,
  grease trap)
- [M] minor issues identified and rectified
- [K] hours of unscheduled call-outs (covered separately)
- Backflow + TMV all certs current and lodged

Proposed renewal terms (no changes from current contract):

[Renewal terms — see 09-recurring-maintenance.md for full template]

Happy to walk through any changes you'd like, or just reply "renew"
and I'll lock it in.

Thanks,
[your name]
[Business name]
[Plumbing Lic #]
```

## Quote follow-up (project quotes that haven't replied after 5 days)

```
Subject: Following up — quote for [job summary]

Hi [first name],

Following up on the quote I sent for [job summary] on [date]. Wanted
to check in:

- Any questions about the quote?
- Has the timing changed at your end?
- Anything in the scope you'd like adjusted?

The quote stays valid for 30 days from issue. For hot water swaps
specifically, cylinder pricing can move — if we're locking it in
within the next week the price holds.

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
moves. E.g.: "I expected the existing copper hot/cold to be in
good nick. They're galvanised iron from probably the early 70s —
heavy corrosion at every joint. We can't just connect the new
cylinder onto that without it failing within months. We need to
re-run the hot/cold from the meter to the cylinder position."]

Updated quote attached. Worth noting:

- The original was based on [original assumption]
- We found [actual condition], which means [implication]
- New total: $[Y] (was $[X])

Happy to talk it through — give me a call on [phone] if anything's
unclear. If the new number's a stretch, we can also look at a
staged approach (do [the critical bit — e.g. "just the cylinder
swap with isolation"] now, [the rest — e.g. "the pipe re-run"]
within 6 months).

Thanks,
[your name]
[Business name]
```

## Good-news email — under quote

```
Subject: Job done at $[X under quote] — [job summary]

Hi [first name],

Quick good-news note: the [job] came in $[X] under the quoted price.
The [reason — e.g. "isolation valve was actually fine, didn't need
replacing"]. I've adjusted the invoice down accordingly — final is
$[Y] instead of the original quote of $[Z].

Compliance Cert attached.

Thanks for the work,
[your name]
[Business name]
```

## Hot water emergency follow-up (after temp fix overnight)

```
Subject: Tomorrow's swap — your hot water

Hi [first name],

As discussed last night — your hot water unit is past its life and
needs replacing. I've set you up with [temporary measure, e.g.
"a tepid supply from the cold mains through the existing valve so
you can wash dishes tonight"].

Tomorrow ([date]) I'll be back at [time] with the new [brand +
model + L] cylinder. Job takes ~3 hours; you'll have full hot water
by [time].

Quote for the replacement attached. The $[X] from last night's
emergency callout will be credited against tomorrow's invoice.

See you in the morning,
[your name]
```
