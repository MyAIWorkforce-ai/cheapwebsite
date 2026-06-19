---
name: electrician-compliance
description: After a job is done, generate the right compliance certificate for the region. AU = COC (state-specific). NZ = ESC. UK = EICR / Installation Cert / Minor Works. US = Permit/Inspection note. CA = ESA / equivalent. Pull the right standards reference. Never fabricate code numbers.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Compliance — the certificate every job needs

## Your job

After a job is done, generate the correct compliance certificate
based on:

1. **Region** from BUSINESS CONFIG → maps to the right cert type
2. **State / province** for sub-region rules
3. **Job type** — some work requires a more thorough cert (rewire,
   switchboard) vs minor work (single circuit add)

## Region → certificate map

| Region | Cert type | Issued via | Standard reference |
|---|---|---|---|
| **AU — VIC** | Certificate of Electrical Safety (CES) | Energy Safe Victoria portal | AS/NZS 3000:2018 |
| **AU — NSW** | Certificate of Compliance for Electrical Work (CCEW) | Fair Trading NSW | AS/NZS 3000:2018 |
| **AU — QLD** | Certificate of Test (eCOES) | Electrical Safety Office | AS/NZS 3000:2018 |
| **AU — WA** | Notice of Completion (NOC) + Electrical Safety Certificate | EnergySafety WA | AS/NZS 3000:2018 |
| **AU — SA** | Certificate of Compliance (CoC) | Office of the Technical Regulator | AS/NZS 3000:2018 |
| **NZ** | Certificate of Compliance (CoC) + (if needed) Electrical Safety Certificate | EWRB | AS/NZS 3000:2018, ESR 2010 |
| **UK** | EICR (existing install inspection) / Installation Certificate (new work) / Minor Works (small jobs) | NICEIC / NAPIT / ELECSA / EAL | BS 7671:2018+A2:2022 |
| **US** | Permit + post-job inspection by AHJ; some states require state-issued cert | State electrical board / municipal | NEC (NFPA 70), state amendments |
| **CA — ON** | ESA (Electrical Safety Authority) permit + inspection | esasafe.com | CEC + Ontario Reg 22/04 |
| **CA — BC** | Technical Safety BC permit + inspection | technicalsafetybc.ca | CEC + BC amendments |
| **CA — other** | Provincial electrical safety body permit + inspection | varies | CEC + provincial amendments |

**Default to AU/VIC if region missing in BUSINESS CONFIG. If state
is missing, ask before generating — never guess a state-specific
cert format.**

## Generate the cert — AU (CES Victoria example)

```
CERTIFICATE OF ELECTRICAL SAFETY (CES)
======================================
State:               Victoria
REC number:          [from BUSINESS CONFIG]
Issued by:           [Licensed Electrician name, license #]
Business:            [Business name]

Customer:            [Customer name]
Property address:    [full address]
Inspection date:     [date]
Work completed:      [one-line summary]

WORK CATEGORY
☐ Prescribed (≥3 prescribed circuits altered, switchboard, mains)
☐ Non-prescribed (minor work)
☐ Periodic verification

WORK PERFORMED
[Itemised list of work — copy from quote / job notes]

TESTS COMPLETED
☐ Continuity of earthing
☐ Insulation resistance (≥1 MΩ)
☐ Polarity correctness
☐ Earth fault loop impedance
☐ RCD operation (≤300ms at rated current)
☐ Polarity and neutral integrity

RESULTS
All tests pass / [exception noted]

DECLARATION
I declare that the electrical installation work to which this
certificate relates has been tested and complies with AS/NZS
3000:2018.

Signed:              [Electrician signature]
Date:                [date]

Customer receipt:    [Customer signature on completion]
```

## Generate the cert — UK (EICR example)

```
ELECTRICAL INSTALLATION CONDITION REPORT (EICR)
================================================
Issued under:        BS 7671:2018+A2:2022 (18th Edition)
Inspecting body:     NICEIC / NAPIT / ELECSA / EAL [delete as applicable]
Engineer:            [Name, registration #]
Business:            [Business name]

Property:            [full address]
Occupied by:         [Customer name]
Date of inspection:  [date]

PURPOSE OF REPORT
☐ Property purchase / sale
☐ Insurance / mortgage
☐ Periodic inspection (recommended every 5 years for domestic,
   sooner for rental)
☐ Routine condition assessment

SUMMARY
☐ Satisfactory (no remedial work required)
☐ Unsatisfactory — code C1 / C2 issues found (must be addressed
  before installation is deemed safe)
☐ Further investigation required (FI)

OBSERVATIONS
[List of observations with codes:
  C1 — Danger present, risk of injury (immediate action)
  C2 — Potentially dangerous (urgent remedial)
  C3 — Improvement recommended (not urgent)
  FI — Further investigation required]

NEXT INSPECTION RECOMMENDED
[Date — typically 5 years for domestic, 1–3 years for commercial /
rental]

Signed:              [Engineer signature]
Date:                [date]
```

## Generate the cert — US (permit/inspection)

```
ELECTRICAL WORK COMPLETION RECORD
==================================
Performed under:     NEC (NFPA 70) + [State] amendments
Permit number:       [from local AHJ]
Inspector contact:   [name, AHJ office, phone]

Licensed electrician: [name, license # state]
Business:            [Business name, EIN]

Customer:            [name]
Property address:    [full address]
Work completed date: [date]

WORK PERFORMED
[Itemised — match permit application]

INSPECTION STATUS
☐ Pre-rough inspection passed [date]
☐ Final inspection scheduled for [date]
☐ Final inspection passed [date]

NOTES TO CUSTOMER
- Inspection by AHJ required before work is legally complete
- Permit visible during inspection — leave on site
- Failure modes: [if applicable]
```

## Generate the cert — Canada (ESA Ontario example)

```
ESA (ELECTRICAL SAFETY AUTHORITY) NOTIFICATION
================================================
Issued under:        Canadian Electrical Code (CEC) + Ontario Reg 22/04
ECRA #:              [from BUSINESS CONFIG — Electrical Contractors Reg]
Master electrician:  [name, license #]
Business:            [Business name, BN]

Customer:            [name]
Property address:    [full address]
Notification date:   [date]
Permit number:       [if assigned]

WORK PERFORMED
[Itemised list]

ESA INSPECTION
☐ Rough-in inspection: [date]
☐ Final inspection:    [date]
☐ Certificate of Acceptance (CofA): pending / received [date]

Notes:               [any]
```

## Hard rules

- **Never fabricate a license number, REC number, EWRB number, NICEIC
  number, or state license number.** If it's missing from BUSINESS
  CONFIG, ASK for it. Wrong license # on a cert = trade fraud risk.
- **Never sign a cert as the electrician — the human electrician
  signs.** The agent generates the form; the human signs.
- **Always reference the correct standard for the region** (AS/NZS
  3000, BS 7671, NEC, CEC). Wrong standard = invalid cert.
- **Always include the next-inspection-recommended date** where the
  cert format calls for it (EICR especially).
- **Always issue the cert same-day for callout work** — don't let
  paperwork pile up. Customers love seeing the cert before they pay.

## Workflow

1. Operator says "Generate the COC for [Customer], [job summary]"
2. Agent reads BUSINESS CONFIG → Region + State
3. Agent pulls the right cert template
4. Agent fills in known fields from the quote + dispatch records
5. Agent asks for any missing details (test results, observations)
6. Agent renders the cert in a fenced markdown block
7. Operator reviews + adds signature
8. Cert is sent to customer (PDF via email + carbon copy to operator)
9. Saved in operator's records per regulatory requirement (usually
   7 years)

## Confirm + handoff

> *"Cert drafted: [cert type] for [Customer]. Please review and sign,
> then I'll send. Loading `06-invoice-payment.md` for the invoice."*
