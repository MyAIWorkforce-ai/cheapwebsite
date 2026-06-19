---
name: electrician-recurring-maintenance
description: Manage commercial maintenance contracts — RCD testing, thermal imaging, switchboard servicing, periodic inspection cycles. Generate the schedule, the reminder cycle, the on-site checklist, the post-visit report. This is the single highest-margin work for an established sparky.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Recurring maintenance — commercial contracts

## Your job

Commercial clients (offices, factories, retail, body corporates,
schools) need regular electrical testing on a legally-mandated
schedule. This is the most reliable, highest-margin work an
electrician can have. Manage the schedule, the comms, the on-site
checklists, and the reports.

## What "recurring maintenance" typically includes

| Service | Frequency | Region notes |
|---|---|---|
| **RCD testing** | Every 6 months (AU/NZ workplace), 5 years (UK domestic landlord, sooner for commercial) | AS/NZS 3760 (AU/NZ), BS 7671 18th Edn (UK) |
| **Thermal imaging** | Annually for industrial, biennially for commercial | Identifies overloaded circuits, loose connections |
| **Switchboard servicing** | Annually or per insurer requirement | Visual check, torque test, dust/clean |
| **Emergency lighting tests** | Monthly self-test + 6-month duration test + annual full test | AS/NZS 2293 (AU/NZ), BS 5266 (UK) |
| **Test and tag** | Per workplace risk profile | AS/NZS 3760 (AU/NZ) |
| **PAT testing (UK)** | Annually or per risk | IET PAT Code of Practice |
| **EICR (UK rental)** | Every 5 years for rentals, sooner for commercial | Landlord and Tenant Act |
| **Earth bonding inspection** | Annually | Often required by insurer |

## Step 1 — Set up the contract

When onboarding a new commercial client:

```
Tell me about the property:
- Address(es) covered (single site / multi)
- Property type (office / factory / retail / school / body corp)
- Square metres
- Number of switchboards
- Number of RCDs (estimate)
- Existing emergency lighting? (Y/N)
- Existing testing records? (request copies)
- Insurer requirements (some require annual thermal imaging)
- Their nominated contact (facility manager, building manager)
- Preferred service times (after-hours? weekends? during opening?)
- Quoting cycle (annual contract / quarterly invoice / per-visit)
```

Then propose the contract:

```
MAINTENANCE CONTRACT PROPOSAL — [Customer]
==========================================
Property:      [address]
Service area:  [list — office floor, plant room, retail front, etc.]

INCLUDED SERVICES + FREQUENCY
1. RCD testing — 6-monthly (April + October)
2. Emergency lighting full test — annually (March)
3. Switchboard servicing — annually (May)
4. Thermal imaging — annually (June)
5. Test & tag — annually (April, same visit as RCD)

VISITS PER YEAR
2 × scheduled visits (April + October) + 1 × annual visit (May).

PRICING
$3,800 + GST/VAT per annum, billed quarterly ($950/quarter).
Includes all routine testing, certificates, and the digital records
register.

EXCLUSIONS
- Repairs / rectifications discovered during testing — quoted
  separately at standard rates
- Out-of-scope emergency callouts — standard emergency rates apply
- Replacement parts at trade + 20%

DELIVERABLES PER VISIT
- Test results uploaded to your digital records register
- Certificate of Test or equivalent
- Photo evidence of issues found
- A 1-page summary report emailed to your nominated contact

CONTRACT TERMS
- 12-month initial, auto-renew unless 30 days notice
- 30-day exit clause on either side
- Liability per public liability policy ($20M)

Yours,
[your name]
[Business name]
[License # / NICEIC #]
```

## Step 2 — Lock in the schedule

Once accepted, generate calendar entries 12 months ahead. Recurring
maintenance is the most powerful work-smoothing tool you have. Lock
in dates well in advance so quote-and-callout work fills around it.

Per BUSINESS CONFIG → Scheduling tool:

- **Google Calendar:** Recurring events for each visit type
- **ServiceM8 / Tradify:** Recurring job templates
- **Manual:** Print a calendar for the year

## Step 3 — Reminder cycle

Send reminders at:

- **2 weeks out:** "Heads up — your next maintenance visit is [date].
  Anything we should know about? Any new equipment we should add to
  the testing schedule?"
- **2 days out:** "Confirming [date] [time] for the maintenance visit.
  Access details same as last time? Any closed-off areas?"
- **Morning of:** "On the way for your maintenance — ETA [time]."

## Step 4 — On-site checklist

When the operator is on site, the agent renders the testing checklist
for that visit type. Example for an RCD + Test-and-Tag visit:

```
ON-SITE CHECKLIST — RCD TEST + T&T
====================================
Site:           [address]
Date:           [date]
Tested by:      [electrician name + license #]

RCD TESTING (AS/NZS 3760 / regional equivalent)
For each RCD found:
  ☐ Visual inspection — no damage, no signs of overheating
  ☐ Trip time at rated current ≤300ms (record actual)
  ☐ Trip time at 5× rated current ≤40ms
  ☐ Push-button test functions
  ☐ Reset functions

  RCD #1 — [location]: trip time [Xms] @ [I_an], [Xms] @ 5×I_an ✓
  RCD #2 — ...

TEST AND TAG (AS/NZS 3760)
For each portable appliance:
  ☐ Visual inspection (cord, plug, casing)
  ☐ Earth continuity ≤1Ω
  ☐ Insulation resistance ≥1MΩ
  ☐ Tag applied with date

  Tag # range: [start] – [end]
  Items tested: [count]
  Fails: [count] — listed below

ISSUES FOUND (rectifications quoted separately):
- [Issue 1]: [photo ref] — recommended action
- [Issue 2]: ...

NEXT VISIT DUE: [date]
```

## Step 5 — Post-visit report

Generate a one-page report for the nominated contact:

```
MAINTENANCE VISIT REPORT — [Date]
==================================
Customer:      [Business name]
Property:      [address]
Visit type:    [RCD + T&T / Emergency lighting / etc.]
Performed by:  [electrician name, license #]

SUMMARY
All routine testing completed. [N] items passed, [M] items flagged
for rectification (see below).

PASS / FAIL SUMMARY
| Category          | Items tested | Pass | Fail | % Pass |
|---|---|---|---|---|
| RCDs              | 8            | 8    | 0    | 100%   |
| Portable appliances| 47          | 44   | 3    | 94%    |
| Emergency lights  | n/a this visit                        |

ITEMS REQUIRING ACTION
1. PA #SR012 (kettle, kitchen) — failed earth continuity. Suggest
   replacement, $35.
2. PA #SR018 (microwave, kitchen) — frayed cord. Replace cord or
   appliance.
3. RCD #4 — slightly slow trip time (180ms, within spec but
   trending up). Monitor next visit.

NEXT VISIT DUE
[date] — for [visit type].

RECTIFICATIONS QUOTED
A separate quote for the three items above has been emailed. Total
$185 + GST including parts and labour.

Thanks,
[your name]
[Business name]
[License #]
```

## Step 6 — Invoice

Per BUSINESS CONFIG → Maintenance contract billing cycle (usually
quarterly). Use `06-invoice-payment.md`.

## Hard rules

- **Schedule 12 months ahead.** Recurring work that's only "planned
  for later" doesn't happen. Lock dates.
- **Never skip the visit because the customer says "everything's
  fine."** Insurance requirements + legal liability run on the
  schedule, not on vibes.
- **Photo evidence is non-negotiable** for any issue found.
- **Always send the report within 24 hours of the visit.** Late
  reports erode trust on contracts.
- **Surface relationship signals to the operator** — if a contract
  customer asks for extra work, flag it as upsell opportunity, not
  scope creep.

## Reading the learnings.md

Track on maintenance contracts:
- Renewal rate (target: 90%+)
- Average rectification revenue per visit (target: 15-25% of contract
  value annually)
- Customer satisfaction signal (asked at renewal)

## Confirm + handoff

> *"Maintenance scheduled / report sent / contract renewed: [outcome].
> Next visit for [Customer] is [date]. Reminder cycle queued."*
