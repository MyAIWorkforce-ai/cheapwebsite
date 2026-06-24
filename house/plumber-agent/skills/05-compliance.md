---
name: plumber-compliance
description: After a job is done, generate the right compliance certificate(s) for the region. AU = Compliance Cert (state-specific) + Gas Type A if gas. NZ = CoC via PGDB + Gas CoC. UK = Building Regs notice / WRAS / Gas Safe / Unvented G3. US = Permit/Inspection note. CA = Provincial cert + TSSA gas. Pull the right standards reference. Never fabricate certificate or licence numbers.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Compliance — the certificate every job needs

## Your job

After a job is done, generate the correct compliance certificate(s)
based on:

1. **Region** from BUSINESS CONFIG → maps to the right cert type
2. **State / province** for sub-region rules
3. **Job type** — some work requires more thorough cert (hot water,
   gas, drainage, backflow) vs minor work (cartridge swap, single
   tap re-washer)
4. **Gas component** — gas always needs its own separate certificate
   under separate licence (Type A AU/NZ, Gas Safe UK, TSSA CA, etc.)

## Region → certificate map

| Region | Plumbing cert | Gas cert (if gas work) | Standard reference |
|---|---|---|---|
| **AU — VIC** | Compliance Certificate (VBA portal) | Gas Type A Compliance Plate + Cert (ESV / VBA) | AS/NZS 3500 + AS/NZS 5601 |
| **AU — NSW** | Certificate of Compliance for Plumbing & Drainage Work (NSW Fair Trading) | Gas Notice of Work + Cert of Compliance (Fair Trading) | AS/NZS 3500 + AS/NZS 5601 |
| **AU — QLD** | Form 4 (Plumbing Notice of Work) + Form 7 (Compliance) — QBCC | Gas Work Notice + Cert (QBCC) | AS/NZS 3500 + AS/NZS 5601 |
| **AU — WA** | Notice of Plumbing Work (NOTW) + Final (NPW) — Building & Energy WA | Gas Notice + Cert (Building & Energy WA) | AS/NZS 3500 + AS/NZS 5601 |
| **AU — SA** | Plumbing CoC — Office of the Technical Regulator | Gas CoC (OTR) | AS/NZS 3500 + AS/NZS 5601 |
| **NZ** | Certificate of Compliance + Producer Statement (where applicable) — PGDB | Gas CoC (separate gasfitting licence under PGDB) | AS/NZS 3500 + AS/NZS 5601 + NZBC G12/G13 |
| **UK** | Building Regs notification (where notifiable — Part G, water fittings); WRAS approval on fittings; CIPHE / APHC quality mark notification | Gas Safe Register notification within 30 days (mandatory) | BS EN 806, Water Regs 1999, Building Regs Part G, Gas Safety (Installation and Use) Regs 1998 |
| **UK** (specific) | Unvented hot water G3 Certificate (mandatory for unvented cylinders) | – | Building Regs Part G |
| **US** | Permit application + post-job inspection by AHJ (municipal building/plumbing dept); state-by-state | Gas line work — separate inspection + state requirement; some states need gas-only licence | UPC (western/most US) or IPC (east/midwest); state amendments; NFGC 54 for gas |
| **CA — ON** | Plumbing permit + inspection (municipality); for backflow — annual test cert to local water authority | Gas: TSSA G1/G2/G3 certificate within 30 days of work | NPC + CSA B125; CSA B149 for gas; Ontario Building Code |
| **CA — BC** | Plumbing permit + inspection (municipality); FSR sign-off where required | Gas: BC Safety Authority gas permit + inspection | NPC + CSA B125; CSA B149 for gas; BCBC |
| **CA — other** | Provincial plumbing safety body permit + inspection | Provincial gas authority permit + inspection | NPC + CSA B125; provincial codes |

**Default to AU/VIC if region missing in BUSINESS CONFIG. If state
is missing, ask before generating — never guess a state-specific
cert format.**

## When in doubt: every hot water, every gas, every drainage job
**must** generate a cert. Cartridge swaps and minor tap repairs
typically don't, but check regional rules — NSW for example requires
notification for any work involving the hot/cold water supply.

## Generate the cert — AU (Compliance Certificate VIC example)

```
COMPLIANCE CERTIFICATE — PLUMBING WORK
========================================
State:               Victoria
VBA registration #:  [from BUSINESS CONFIG]
Issued by:           [Licensed Plumber name, licence #]
Business:            [Business name]

Customer:            [Customer name]
Property address:    [full address]
Inspection date:     [date]
Work category:       [Sanitary / Water Supply / Drainage / Gas / Roof
                      / Mechanical / Stormwater]

WORK PERFORMED
[Itemised list — copy from quote / job notes — e.g.:
 - Removed existing 135L electric storage HWS (Rheem 491100)
 - Installed Rheem Stellar 360 continuous-flow gas HWS
 - Installed pressure-limiting valve, tundish, isolation valves
 - Pressure-tested all connections to 1500 kPa for 15 min — pass
 - Commissioned and set outlet temp to 50°C]

TESTS COMPLETED
☐ Visual inspection of installation
☐ Pressure test — all joints to manufacturer / code spec
☐ Backflow check (where applicable)
☐ Temperature control valve / TMV operation
☐ Drainage falls + access (where applicable)

RESULTS
All tests pass / [exception noted]

REGULATORY REFERENCE
AS/NZS 3500.1:2021 (Water Services)
AS/NZS 3500.2:2021 (Sanitary Plumbing & Drainage)
AS/NZS 3500.4:2021 (Heated Water Services)
Plumbing Regulations 2018 (VIC)

DECLARATION
I declare that the plumbing work to which this certificate relates
has been carried out and complies with AS/NZS 3500 and the Plumbing
Regulations 2018.

Signed:              [Plumber signature]
Print name:          [Licensed Plumber name]
Licence #:           [X]
Date:                [date]

Customer signature on completion: ____________________________
Date:                              [date]

VBA portal lodgement:  [submitted | pending]
```

## Generate the cert — AU Gas Type A (separate cert, with plate)

```
GAS TYPE A COMPLIANCE — INSTALLATION CERTIFICATE
=================================================
State:               Victoria
Gas Type A licence:  [from BUSINESS CONFIG]
Issued by:           [Licensed Gas Fitter name]
Business:            [Business name]

Customer:            [Customer name]
Property address:    [full address]
Work date:           [date]

APPLIANCE / INSTALLATION
- Make:              [e.g. Rheem]
- Model:             [e.g. Stellar 360 continuous-flow]
- Serial:            [from unit]
- Input rating:      [kW]
- Gas type:          [Natural Gas / LPG]

WORK PERFORMED
[Itemised — e.g.:
 - Run 4m of 20mm copper gas line from meter to HWS position
 - Installed appliance isolation valve
 - Pressure test gas line at 7 kPa for 5 min — no drop, pass
 - Tested appliance combustion + flue spillage — pass
 - Set CO output [ppm] — within spec
 - Fitted compliance plate to unit]

TESTS COMPLETED
☐ Gas line pressure test (manometer)
☐ Appliance combustion test
☐ Flue spillage test (where flue installed)
☐ CO measurement (ambient + appliance)
☐ Ventilation adequacy check
☐ Compliance plate fitted

REGULATORY REFERENCE
AS/NZS 5601.1:2022 (General installations)
AS/NZS 5601.2:2020 (LP Gas installations in caravans and boats —
                      where applicable)

DECLARATION
I declare the gas work complies with AS/NZS 5601 and the Gas Safety
Act 1997 / Gas Safety (Gas Installation) Regulations 2018.

Signed:              [Gas Fitter signature]
Print name:          [Licensed Gas Fitter name]
Gas licence #:       [X]
Date:                [date]
```

## Generate the cert — NZ (PGDB CoC)

```
CERTIFICATE OF COMPLIANCE — Aotearoa New Zealand
================================================
Issued under:        PGDB — Plumbers, Gasfitters and Drainlayers Board
Issued by:           [Plumber name], practising licence # [X]
Business:            [Business name]

Customer:            [Customer name]
Property address:    [full address]
Inspection date:     [date]

WORK PERFORMED
[Itemised list]

CATEGORY
☐ Plumbing
☐ Gasfitting (NB: requires separate Gas CoC under gasfitting licence)
☐ Drainlaying (NB: requires separate Drainlayer registration)

TESTS COMPLETED
☐ Pressure test
☐ Backflow check
☐ Temperature control valve operation
☐ Drainage falls + IO access

RESULTS
[Pass / exception]

REGULATORY REFERENCE
AS/NZS 3500:2018 (Plumbing & Drainage)
NZBC G12 (Water supplies)
NZBC G13 (Foul water)
Plumbers, Gasfitters, and Drainlayers Act 2006

PRODUCER STATEMENT
☐ Issued (for restricted work — to be lodged with building consent
  authority)
☐ Not required for this work

DECLARATION
I declare the work complies with AS/NZS 3500 and the NZBC.

Signed:              [Plumber signature]
PGDB licence #:      [X]
Date:                [date]
```

## Generate the cert — UK (Unvented Hot Water G3)

```
UNVENTED HOT WATER STORAGE CYLINDER — G3 CERTIFICATE
======================================================
Issued under:        Building Regulations Approved Document G3
Installer:           [Name], G3 cert # [X]
Business:            [Business name, Company #]

Property:            [full address]
Customer:            [Customer name]
Installation date:   [date]

UNIT INSTALLED
- Make:              [e.g. Megaflo]
- Model:             [e.g. Megaflo Eco 300L]
- Serial:            [from unit]
- Capacity:          [L]
- Heat source:       [Direct electric / Indirect via boiler / Solar /
                      Heat pump]

DISCHARGE PIPEWORK
☐ D1 (from PTRV to tundish) — sized correctly
☐ D2 (from tundish to safe discharge) — sized + falls correct
☐ Discharge point safe + visible

SAFETY DEVICES
☐ Pressure & temperature relief valve (PTRV) installed + tested
☐ Expansion vessel correctly sized + pre-charged
☐ Tundish installed visible
☐ Cold inlet — pressure reducing valve (where required)

COMMISSIONING TESTS
☐ Cold fill — no leaks
☐ Pressure test
☐ PTRV manual test — discharges through tundish
☐ Hot water temperature ≤60°C at outlet (TMV if needed)
☐ Customer briefed on operation

REGULATORY REFERENCE
Building Regulations 2010 — Approved Document G3
BS EN 806 (Water installations)
Water Supply (Water Fittings) Regulations 1999

DECLARATION
I confirm the unvented hot water storage system has been installed,
commissioned, and tested in accordance with G3 of the Building
Regulations.

Building Control notification: [Submitted via competent person scheme]

Signed:              [Installer signature]
G3 cert #:           [X]
Date:                [date]
```

## Generate the cert — UK (Gas Safe notification)

```
GAS SAFE REGISTER — INSTALLATION NOTIFICATION
==============================================
Gas Safe Engineer:   [Name]
Gas Safe reg #:      [from BUSINESS CONFIG]
Business:            [Business name]

Customer:            [Customer name]
Property address:    [full address]
Date of work:        [date]

APPLIANCE WORKED ON
- Make / Model:      [e.g. Worcester Bosch 30Si]
- Serial:            [X]
- Type:              [Combi boiler / System boiler / Hot water cylinder
                      with indirect coil / Cooker / Fire / Other]

WORK PERFORMED
[Itemised — e.g.:
 - Replaced existing back-boiler with Worcester Bosch 30Si combi
 - Ran new 22mm gas supply from meter, 4m route
 - Pressurised heating system, vented
 - Tested gas tightness — pass
 - Commissioned boiler, set 65°C flow / 60°C DHW
 - Demonstrated controls to customer]

TESTS COMPLETED
☐ Gas tightness test (let-by + tightness)
☐ Operating pressure check
☐ Flame supervision device
☐ Flue integrity + spillage
☐ Ventilation adequacy
☐ Combustion analyser reading [CO/CO2 ratio]
☐ Benchmark commissioning checklist completed

DECLARATION
I confirm the work has been carried out in accordance with the Gas
Safety (Installation and Use) Regulations 1998 and BS 6891 / BS EN
1775.

Notification to Gas Safe Register: [within 30 days — submitted]
Building Control notification (Part L): [submitted via Gas Safe
                                          competent person scheme]

Signed:              [Engineer signature]
Gas Safe reg #:      [X]
Date:                [date]
```

## Generate the cert — US (permit/inspection)

```
PLUMBING WORK COMPLETION RECORD
==================================
Performed under:     [UPC / IPC] + [State] amendments
                     (NFGC 54 if gas work)
Permit number:       [from local AHJ]
Inspector contact:   [name, AHJ office, phone]

Licensed plumber:    [name, license # state]
Gas licence (if applicable): [#]
Business:            [Business name, EIN]

Customer:            [name]
Property address:    [full address]
Work completed date: [date]

WORK PERFORMED
[Itemised — must match permit application]

INSPECTION STATUS
☐ Rough-in inspection passed [date]
☐ Final inspection scheduled for [date]
☐ Final inspection passed [date]

BACKFLOW (where applicable)
☐ Backflow preventer installed (type: [RPZ / DCV / PVB])
☐ Initial test by certified backflow tester [name, cert #]
☐ Annual test cycle to water authority noted

NOTES TO CUSTOMER
- Final inspection by AHJ required before work is legally complete
- Permit visible during inspection — leave on site
- Failure modes: [if applicable]
```

## Generate the cert — Canada (Ontario example)

```
PLUMBING WORK — MUNICIPAL PERMIT NOTIFICATION
===============================================
Performed under:     Ontario Building Code (OBC), NPC, CSA B125
                     (CSA B149 if gas)
Plumbing permit #:   [from municipality]
Inspector contact:   [name, municipality]

Licensed plumber:    [name, P-#]
TSSA gas licence (if gas): [G1/G2/G3 # — if applicable]
Business:            [Business name, BN]

Customer:            [name]
Property address:    [full address]
Notification date:   [date]

WORK PERFORMED
[Itemised list]

INSPECTIONS
☐ Rough-in inspection: [date]
☐ Final inspection:    [date]
☐ Backflow test (if applicable) — annual: [date, cert #]

GAS WORK (where applicable — separate TSSA cert)
☐ TSSA permit lodged + inspection booked
☐ Final gas inspection: [date]

Notes:               [any]
```

## Hard rules

- **Never fabricate a licence number, registration number, gas ticket,
  G3 cert, Gas Safe number, TSSA number, or VBA number.** If it's
  missing from BUSINESS CONFIG, ASK for it. Wrong licence # on a cert
  = trade fraud risk.
- **Never sign a cert as the tradesperson — the human signs.** The
  agent generates the form; the human signs.
- **Never generate a Gas Cert without a current gas ticket.** Gas
  fitting in every region requires a separate, registered licence.
  If the plumber doesn't hold one, the cert can't be issued — the
  gas work must be sub-contracted to a ticketed gas fitter who
  issues their own cert.
- **Always reference the correct standard for the region** (AS/NZS
  3500 + 5601 / BS EN 806 + Gas Safety Regs / UPC/IPC + NFGC / NPC
  + CSA B125 + B149). Wrong standard = invalid cert.
- **Always include the discharge pipework section for unvented HW
  in UK** — this is the most common audit failure.
- **Always include the pressure test result** — pressure-tested but
  no result = not tested.
- **Always issue the cert same-day for callout work** — don't let
  paperwork pile up. Customers love seeing the cert before they pay.
- **Backflow certs are annually-recurring** — when issuing a new
  backflow install cert, calendar the next year's annual test.

## Workflow

1. Operator says "Generate the Compliance Cert for [Customer], [job]"
2. Agent reads BUSINESS CONFIG → Region + State
3. Agent pulls the right cert template(s) — plumbing + gas if needed
4. Agent fills in known fields from the quote + dispatch records
5. Agent asks for any missing details (test results, observations,
   serial numbers from photos)
6. Agent renders the cert in a fenced markdown block
7. Operator reviews + adds signature
8. Cert is sent to customer (PDF via email + carbon copy to operator)
9. Lodged with the regulator (VBA, Gas Safe, AHJ, TSSA, etc.) within
   the required window (usually 30 days)
10. Saved in operator's records per regulatory requirement (usually
    7 years, longer for gas)

## Confirm + handoff

> *"Cert(s) drafted: [Compliance Cert + Gas Type A / Unvented G3 /
> etc.] for [Customer]. Please review and sign, then I'll send.
> Loading `06-invoice-payment.md` for the invoice."*
