---
name: electrician-quote-project
description: Generate a project-scale quote for switchboard upgrades, rewires, solar PV, EV chargers, new builds, commercial fitouts. Insist on a site visit first if scope isn't certain. Itemise labour + materials + compliance + tax. Make scope changes a separate variation, not an argument.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Project quote — bigger jobs, slower, sharper

## Your job

Read the qualified lead. Decide whether the job can be quoted from
the description, or whether a site inspection is essential. Then
build an itemised quote the customer can compare against other
tradies — without hiding anything.

## When to insist on a site inspection first

Always require a site inspection (even just 30 mins) for:

- Switchboard upgrades on properties >20 years old
- Rewires of any kind
- Solar PV (roof + meter + switchboard all need eyes-on)
- EV chargers on properties pre-2000 (capacity check)
- Commercial fitouts
- "Add a circuit" requests where the existing switchboard is old
- Anything where the customer says "I'm not sure"

Site inspection is its own callout — quote it at the callout fee +
30 mins labour (per BUSINESS CONFIG). If they book the work after
the inspection, credit the inspection fee toward the job.

## When you can quote without a site visit

- New-build pre-wire (working off plans — ask for the architectural
  drawings + electrical layout)
- Repeat work for known property (you've been before)
- Solar PV / EV charger on a brand-new property (under warranty,
  switchboard guaranteed current standard)
- Simple "I want to add X powerpoint to Y room" if it's clearly on
  the same circuit and the property is <15 years old

## The structure of a project quote

Every project quote has five sections:

```
1. Scope (what you're doing — in plain English)
2. Materials (itemised, with markup transparent)
3. Labour (hours × rate, broken down by day)
4. Compliance + admin (cert fees, council permit if any)
5. Total + tax + payment terms
```

## Quote template (email — projects always go via email)

```
Subject: Quote — [job summary] at [address]

Hi [name],

Quote for [job summary] at [address]:

1. SCOPE
- Replace existing 4-pole switchboard with new 12-pole RCD/RCBO board
- Upgrade main switch to current standard
- Install 6 × RCDs (one per circuit) + 2 × MEN reconnection
- Test and tag all circuits
- Issue Certificate of Compliance (CES VIC)

2. MATERIALS
| Item                                  | Qty | Cost    |
|---|---|---|
| 12-pole metal switchboard (Clipsal)   | 1   | $185    |
| RCD/RCBO 16A (Clipsal Pro 50)         | 6   | $480    |
| Main switch 63A                       | 1   | $75     |
| Cabling + termination components      | -   | $90     |
| MEN link                              | 1   | $25     |
| **Materials subtotal**                |     | **$855**|

(Note: 20% markup applied — wholesale prices vary $720 wholesale)

3. LABOUR
| Day | Task                              | Hrs | Rate    | $       |
|---|---|---|---|---|
| 1   | Disconnect, install new board     | 5   | $125/hr | $625    |
| 1   | Test, certify                     | 1.5 | $125/hr | $187.50 |
| Apprentice (Day 1)                      | 4   | $65/hr  | $260    |
| **Labour subtotal**                     |     |         | **$1,072.50** |

4. COMPLIANCE + ADMIN
| Item                                  | Cost    |
|---|---|
| Certificate of Compliance (CES)       | $35     |
| Council electrical safety lodgement   | $40     |
| **Compliance subtotal**               | **$75** |

5. TOTAL
| Section                | Amount      |
|---|---|
| Materials              | $855.00     |
| Labour                 | $1,072.50   |
| Compliance             | $75.00      |
| Subtotal               | $2,002.50   |
| GST (10%)              | $200.25     |
| **TOTAL**              | **$2,202.75** |

PAYMENT TERMS
- 50% deposit on acceptance ($1,101.40)
- 50% on completion, Net 7

TIMELINE
- Booking available [date range]
- Job runs 1 day
- Certificate issued same day

WHAT'S NOT INCLUDED
- Any rectification of pre-existing non-compliant wiring discovered
  during the upgrade — quoted separately as a variation
- Council permit fees if a permit is required for added circuit
  capacity (we'll let you know after inspection)

WHAT'S GUARANTEED
- 12-month workmanship warranty
- All work to AS/NZS 3000:2018
- Certificate of Compliance issued on the day

Reply "go ahead" to lock it in. Happy to walk you through the quote
on a quick call if anything's unclear.

Thanks,
[your name]
[Business name]
[License # / NICEIC / etc.]
[ABN / VAT / EIN]
[Insurance: Public liability $20M, [insurer]]
```

## Hard rules

- **Itemise materials, don't hide markup.** "Materials: $1,200" is a
  red flag to anyone who's hired a tradie before. Show the markup
  honestly. Trades who hide markups get gazumped by trades who don't.
- **Show labour by day.** Customers want to know if it's a 1-day or
  3-day job. Affects their availability planning.
- **Always include compliance section.** A quote without certificate
  or permit fees is a quote that will surprise the customer at
  invoice time.
- **Always have a "Not Included" section.** This is the line that
  protects you from scope creep. "If we find pre-existing
  non-compliant wiring during the upgrade, we'll quote it as a
  variation" — clear, fair, defensible.
- **Always specify the standard you're working to** (AS/NZS 3000,
  BS 7671, NEC, CEC). Region-pulled from BUSINESS CONFIG.
- **Always show the certificate** that comes with the job. Customers
  pay more confidently when they see what they get.
- **Banned phrases** from BUSINESS CONFIG.

## Reading the learnings.md

Open `learnings.md`. If:
- The job type's win-rate is <30% in the last 4 weeks → consider
  surfacing a competitive variant ("we can also do a 6-pole switchboard
  at $1,650 if you don't need the spare circuits")
- The customer type (homeowner / landlord / builder) has notes →
  apply them ("builders prefer net 14, mention it upfront")

## Outputting the internal record

```
QUOTE #<n> — <timestamp>
Lead:        LEAD #<n>
Job type:    <switchboard upgrade / rewire / solar / etc.>
Site visit:  <yes — done | yes — pending | no, working off description>
Quote total: $<X>
Materials:   $<X>
Labour:      $<X> (Y hrs)
Status:      <draft | sent | accepted | declined | variation requested>
Time slot:   <date range>
```

## Confirm + handoff

Tell the operator:
> *"Project quote drafted: $X for [job summary]. Review before sending?
> Once accepted, I'll deposit-invoice 50% via `06-invoice-payment.md`
> and book the work in `04-dispatch.md`."*

Wait for operator sign-off before sending — never send a project
quote without the user reviewing it first. Project quotes are the
contract.
