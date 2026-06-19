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
[License # / NICEIC / etc.]
[ABN / VAT / EIN]
[Insurance: Public liability $20M, [insurer]]
```

## Invoice (use with `06-invoice-payment.md`)

```
Subject: Invoice INV-[YYYYMM]-[N] for [job summary] at [address]

Hi [name],

Here's the invoice for the work [date]. Total: $[X].

Pay via Stripe (instant — covers card, Apple Pay, BPAY):
[Stripe payment link]

Or EFT:
  BSB:    [from BUSINESS CONFIG]
  Acct:   [from BUSINESS CONFIG]
  Ref:    INV-[YYYYMM]-[N]

Cert of Compliance attached for your records.

Any questions, just reply.

Thanks,
[your name]
[Business name]
```

## Compliance cert covering note (when sending the cert via email)

```
Subject: Cert of Compliance — [job summary] at [address]

Hi [name],

As promised, here's the [Certificate of Compliance / EICR / Permit
Notice] for the work completed [date]. Keep it for your property
records — buyers' conveyancers will ask for it, and insurance may
require it after the next claim event.

If you misplace it, just drop me a line — I keep copies on file.

Thanks,
[your name]
[Business name]
[License #]
```

## Day-30 warranty check-in (project jobs)

```
Subject: 30-day check — [job summary]

Hi [first name],

[your name] from [Business name] here. Just touching base 30 days on
from the [job summary]. Couple of quick checks:

- Is the [thing] still working as expected?
- Any small issues you've been meaning to flag?
- Anything that's tripped, made a sound, or felt off?

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

[your name] — hope all's well at [property / business]. Quick check-
in: anything electrical we can sort while we're in the area? Could be
small (a flickering light, a powerpoint that's been on the to-do
list) or big (planning a fit-out, EV charger, switchboard upgrade).

No pressure — just keeping the line open.

Thanks,
[your name]
[Business name]
```

## Commercial contract renewal proposal

```
Subject: Maintenance contract renewal — [Customer]

Hi [name],

The [Customer Business] electrical maintenance contract is coming up
for renewal on [date]. Quick summary of the last 12 months:

- [N] scheduled visits completed
- [M] minor issues identified and rectified
- [K] hours of unscheduled call-outs (covered separately)

Proposed renewal terms (no changes from current contract):

[Renewal terms — see 09-recurring-maintenance.md for full template]

Happy to walk through any changes you'd like, or just reply "renew"
and I'll lock it in.

Thanks,
[your name]
[Business name]
[License #]
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

The quote stays valid for 30 days from issue. If it'd help, happy to
get on a quick 5-min call.

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
moves]

Updated quote attached. Worth noting:

- The original was based on [original assumption]
- We found [actual condition], which means [implication]
- New total: $[Y] (was $[X])

Happy to talk it through — give me a call on [phone] if anything's
unclear. If the new number's a stretch, we can also look at a
staged approach (do [the critical bit] now, [the rest] later).

Thanks,
[your name]
[Business name]
```

## Good-news email — under quote

```
Subject: Job done at $[X under quote] — [job summary]

Hi [first name],

Quick good-news note: the [job] came in $[X] under the quoted price.
I've adjusted the invoice down accordingly — final is $[Y] instead
of the original quote of $[Z].

Cert of Compliance attached.

Thanks for the work,
[your name]
[Business name]
```
