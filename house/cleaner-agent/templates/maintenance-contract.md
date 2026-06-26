# Maintenance contract template

For recurring cleaning contracts — residential weekly /
fortnightly / monthly, commercial nightly / weekly, STR
per-turnover, NDIS recurring. Pulled by
`09-recurring-maintenance.md`.

```
MAINTENANCE CONTRACT — [Customer]
==================================
Contract #:          MC-[YYYYMM]-[N]
Start date:          [date]
Initial term:        12 months (residential / commercial /
                      NDIS — month-to-month for STR)
Renewal:             Auto-renew unless [30 days residential /
                      60 days commercial / 14 days STR / per
                      plan cycle NDIS] notice from either side

CUSTOMER
[Customer business name / individual name]
[Customer ABN / VAT / EIN if commercial / NDIS # if NDIS]
[Customer billing address]
Primary contact:     [name, role if commercial]
Phone:               [phone]
Email:               [email]
Preferred service times: [e.g. fortnightly Wed mornings;
                          nightly after 6pm; STR per Airbnb
                          calendar feed]
Site access:         [lockbox / smart-lock / key / owner
                       present / neighbour]

[For NDIS: add — Plan management (NDIA / Plan-managed /
Self-managed), Plan manager name + email, NDIS Pricing
Arrangements item code]

CONTRACTOR
[Business name]
ABN / VAT / EIN:     [#]
Public liability insurance: $[X], [insurer], [policy #]
Workers' comp / employer's liability: [yes — policy #]
Police check:        all crew current
WWCC:                [held — state # — if family-home work
                       with kids]
NDIS Worker Screening Check: [held — # expiring date — if NDIS
                                work]
NDIS Worker Orientation Module: [completed — date — if NDIS
                                  work]
DBS check:           [Basic / Enhanced + vulnerable sector —
                      level + date — if UK]
Vulnerable sector check: [held — date — if CA + vulnerable
                          populations]
BICSc / CIMS-GB cert: [held — if applicable]

PROPERTY COVERED
[Address(es)]
[Property type: residential — N-bed/N-bath / commercial — sqm
 / strata — N-units / STR — N-properties]
[Special hazards: aged care = scald risk + infection control;
                  food premises = grease + trade waste; medical =
                  infection control protocols; high-rise =
                  external window height + access]

SERVICES INCLUDED

[List items — each with frequency, scope, deliverables]

1. [PRIMARY SERVICE — e.g. FORTNIGHTLY RESIDENTIAL CLEAN]
   Frequency:          Every other [Wed]
   Duration:           [2.5 hrs, 1 cleaner]
   Annual visits:      26
   Scope per visit:    [see scope section]
   Rotation items:     [blinds, light fittings, skirting,
                        internal windows, fridge inside]
   Deliverable:        Visit receipt + mid-clean kitchen photo
                        (residential) / time-stamped photo
                        pack (commercial / STR / bond)

2. [SECONDARY SERVICE — e.g. QUARTERLY CARPET STEAM CLEAN if
   bundled]
   Frequency:          Quarterly
   Duration:           [N hrs, machine]
   Annual:             4 visits
   Standard:           [IICRC / professional carpet cleaning
                        standard]
   Deliverable:        Service record + before / after photos

[Add other services as bundled — semi-annual deep, oven service,
external window quarterly]

VISITS PER YEAR
[Total visits across all services]
Dates locked at contract start; rescheduled with [24h
residential / 7 days commercial / 24h STR] notice if either
party.

PRICING

| Service                       | Per visit | Annual |
|---|---|---|
| Fortnightly clean             | $[X]      | $[X]   |
| Quarterly carpet steam        | $[X]      | $[X]   |
| Annual deep                   | $[X]      | $[X]   |
| **Annual total**              |           | **$[X]** + tax |

Tax: [included / excluded — specify per region]

[For NDIS: cite NDIS Pricing Arrangements item code + rate]

PAYMENT TERMS

[Pick one matching customer type:]

Residential:
- Direct debit on visit-day via [GoCardless UK / Stripe PayTo
  AU / Stripe ACH US]
- Or Stripe link per invoice, Net 7

Commercial:
- Net 30 from monthly invoice date
- Direct debit available — 1% discount on monthly invoice

STR:
- Monthly statement on the 1st covering prior month's
  turnovers + restocks + linen handling
- Net 7

NDIS:
- Per plan manager terms (typically 7-14 days)
- Plan-managed: invoice to plan manager
- Self-managed: invoice to participant
- NDIA-managed: claim via PRODA / myplace portal

EXCLUSIONS (quoted separately as variations)

- [Standard recurring scope only — listed above]
- Oven deep clean if not in scope ($[X])
- Carpet steam clean if not in scope ($[X])
- External windows if not in scope ($[X])
- Outdoor / balcony / garage
- Decluttering / tidying personal items
- Repair / maintenance (we clean only)
- Out-of-scope urgent callouts (urgent rates apply)
- Pest fumigation (sub-contracted, passed through)

Replacement / specialist services (sub-contracted at cost +
10-15% admin):
- Mould remediation (specialist referral, not us)
- Trauma / biohazard (specialist referral, not us)
- Asbestos (refuse, refer to licensed removalist)
- Carpet repair / re-stretching (specialist referral)

ESCALATION / PRICE REVIEW

- Annual price review on contract anniversary
- Adjustment: CPI + 1.5%
- Notice given: [60 days residential / 90 days commercial /
  30 days STR / per plan cycle NDIS]
- If customer prefers, scope can be adjusted to hold per-visit
  price (drop optional rotation items, reduce frequency, etc.)

TERMS

Payment terms:       [As above]
Late payment:        [Per BUSINESS CONFIG — e.g. 2% per month
                      after 30 days commercial; auto-pause DD
                      and recover via Stripe link residential]
Liability cap:       Limited to public liability insurance
                      amount.
Confidentiality:     Both parties agree not to disclose
                      confidential business information beyond
                      the scope of the work.
Termination:         [30 days residential / 60 days commercial
                      / 14 days STR / per plan cycle NDIS]
                      written notice either party. If
                      terminated mid-cycle, paid services are
                      pro-rated.
Renewal:             Auto-renews unless notice given.
Dispute resolution:  Good-faith discussion first; mediation if
                      unresolved within 14 days; small claims
                      tribunal / county court thereafter.
Insurance:           Contractor maintains current public
                      liability + workers comp / employer's
                      liability. Certificate of currency
                      available on request.
Compliance:          Contractor maintains current police check,
                      [WWCC / NDIS Worker Screening + Orientation
                      Module / DBS / vulnerable sector check]
                      as applicable. Lapse = services suspend
                      until renewed; no charge to customer
                      during suspension.
Chemical safety:     Contractor maintains SDS / COSHH folder.
                      Customer entitled to copy on request.
                      Customer briefs contractor on any
                      surface / allergic / sensory sensitivity.
Key + access:        Contractor signs in / out keys per visit.
                      Lost keys: re-key at contractor's cost
                      (covered by public liability). Smart-lock
                      codes rotated [monthly STR / quarterly
                      residential + commercial].
Photo evidence:      As specified per visit type. Time-stamped.
                      Retained per BUSINESS CONFIG retention
                      period (typically 90 days residential,
                      12 months commercial, 7 years NDIS).

GUARANTEES

- 24-hour re-clean guarantee — anything missed flagged within
  24 hours, we attend free of charge to re-clean
- Same chem range every visit (no surprise switches)
- Same crew where possible
- All cleaners current on police check + applicable clearances
- Compliance kit on-vehicle (SDS / COSHH folder)

SIGNATURES

For [Customer]:
Signed:              ________________________________
Print name:          [name, role]
Date:                [date]

For [Business name]:
Signed:              ________________________________
Print name:          [your name]
ABN / VAT / EIN:     [#]
Public liability + insurer policy #: [#]
[NDIS provider # if NDIS-registered: #]
Date:                [date]
```

## Variants by customer type

### Residential fortnightly — short form (often signed via
DocuSign / Hellosign / etc.)

A trimmed version of the above suitable for residential
customers. Drop the "VISITS PER YEAR" detail and the
"Confidentiality" clause (overkill for residential).

### Commercial nightly — formal full version

Use the full template above. Commercial procurement teams
often request:
- Certificate of Currency for public liability + workers comp
- Crew police check verification process
- Photo of lead crew member for security
- Chem range list with SDS sheets

The agent generates a packet with the contract + these
documents.

### STR per-turnover — month-to-month

Use the template but ADD:
- iCal feed share clause
- Restock SKU list as appendix
- Linen handling option (a/b/c)
- Late checkout policy
- Damage / left-items workflow

### NDIS service agreement — annual

Use the template but ADD:
- Participant first name + NDIS # (don't use surname per
  privacy guidance)
- Plan management type
- Plan manager email (if plan-managed)
- Support category + NDIS Pricing Arrangements item code
- Worker Screening Check # + Orientation Module date
- NDIS Code of Conduct agreement statement
- Participant rights — to change provider, complain to NDIS
  Quality and Safeguards Commission (1800 035 544)
- Cancellation / change clauses matching NDIS guidance
  (typically 14 days notice; emergency cancellation no fee)

### Strata / property management — multi-property

ADD:
- List of all properties covered
- Per-property scope (e.g. some have lifts, some don't)
- Strata committee approval process for variations
- Quarterly building manager report
