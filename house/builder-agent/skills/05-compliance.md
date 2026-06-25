---
name: builder-compliance
description: Navigate council / planning approvals + staged inspections + final handover certification. AU = DA → CC → OC (state-specific); NZ = Building Consent → Producer Statements → CCC; UK = Planning + Building Regs → Building Control; US = Building Permit + staged inspections → CofO; CA = Permit + inspections → Final. Generate the handover pack at PC: certificate + defects schedule + warranties index + sub-trade certs. Never fabricate certificate or licence numbers.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Compliance — approvals, inspections, handover

## Your job

A builder's "compliance" runs across the whole project, not just at
the end:

1. **Pre-start**: planning / DA approval, construction certificate
   / Building Consent / Permit, certifier engagement
2. **Mid-project**: staged inspections (footings, frame,
   waterproofing, drainage, pre-line, insulation, final)
3. **Handover**: Occupation Certificate / CCC / CofO / Final
   Inspection sign-off, defects schedule, warranties index,
   sub-trade certs

This skill runs all three. Pull the right pathway from BUSINESS
CONFIG → Region.

## Region → pathway map

| Region | Approval pathway | Common cert names | Standards |
|---|---|---|---|
| **AU — NSW** | Pre-DA → DA (Council / Sydney Local Planning Panel) → CC (Council or Private Certifier) → Stage inspections by certifier → OC | Development Application (DA), Construction Certificate (CC), Occupation Certificate (OC), Home Warranty Insurance cert | NCC + Environmental Planning & Assessment Act 1979 (NSW) + Home Building Act 1989 (NSW) |
| **AU — VIC** | Town Planning Permit (if required) → Building Permit (Building Surveyor) → Stage inspections → Certificate of Final Inspection (CFI) / OC | Town Planning Permit, Building Permit, CFI/OC, Domestic Building Insurance (DBI) | NCC + Building Act 1993 (VIC) |
| **AU — QLD** | Development Approval (Council) → Building Approval via private cert → Inspections (Form 16) → Form 21 (Final Inspection Cert) | Form 16 (Inspection Certificate), Form 21 (Final), QLD Home Warranty Scheme (QHWS) | NCC + Building Act 1975 (QLD) + QBCC Act |
| **AU — WA** | Building Permit (Local Govt or private cert) → Inspections → Notice of Completion (BA7) | Building Permit, BA7, Home Indemnity Insurance | NCC + Building Act 2011 (WA) |
| **AU — SA** | Development Approval → Building Rules Consent → Inspections → Certificate of Occupancy / Statement of Compliance | SA Building Indemnity Insurance | NCC + Planning Development & Infrastructure Act 2016 (SA) |
| **NZ** | Resource Consent (if non-permitted) → Building Consent (Council BCA) → Construction inspections → Code Compliance Certificate (CCC) → Producer Statements for Restricted Building Work (LBP) | Building Consent, CCC, Producer Statement (PS1-4), LBP Memorandum | NZBC + Building Act 2004 + Construction Contracts Act 2002 |
| **UK — England + Wales** | Planning Permission (if required — many extensions Permitted Development) → Building Regulations Application (Building Control or private Approved Inspector) → Staged inspections → Completion Certificate | Planning Permission, Building Reg Completion Certificate, Party Wall Award (if applicable), CDM 2015 records, NHBC/LABC/Premier Guarantee/BuildZone Structural Warranty | Building Regulations 2010 + Approved Documents A-R + Party Wall Act 1996 + CDM 2015 + Town and Country Planning Act 1990 |
| **UK — Scotland** | Planning Permission → Building Warrant (Local Authority) → Inspections → Completion Certificate (Council) | Building Warrant, Completion Certificate | Building (Scotland) Act 2003 + Technical Handbooks |
| **US** | Pre-permit zoning check → Building Permit Application (Plan Review) → Permit issued → Staged inspections (footing, framing, insulation, drywall, final) → Certificate of Occupancy (CofO) | Building Permit, CofO, Sub-permits (electrical, plumbing, mechanical), HOA approval if applicable | IRC / IBC + state amendments + local AHJ requirements + OSHA |
| **CA — Ontario** | Zoning Compliance → Building Permit (Municipal) → Plan Review → Staged inspections (footing, framing, insulation, occupancy) → Final Inspection + occupancy | Building Permit, Final Inspection sign-off, Tarion warranty (new homes), HRAI for HVAC | Ontario Building Code + Tarion Act |
| **CA — BC** | Development Permit → Building Permit → Inspections → Final | Building Permit, Final | BC Building Code + Homeowner Protection Act |

**Default to AU/NSW if region missing. If state/province is
missing, ASK before generating — never guess the state-specific
form names.**

## Step 1 — Pre-start: approvals

When a contract is signed, the agent generates the approvals
pathway map for THIS project.

```
APPROVAL PATHWAY — [Project name] at [address]
===============================================
Region:           [region from BUSINESS CONFIG]
Council / Auth:   [council from BUSINESS CONFIG]
Certifier:        [private cert / Building Control / AHJ / Approved
                   Inspector — name + contact]

PATHWAY

1. [E.g. DA submission to City of Yarra] — target [date]
   Documents:
   - Architectural drawings + site plan
   - Statement of Environmental Effects
   - BAL assessment (if bushfire zone)
   - Heritage assessment (if heritage overlay)
   - Cost estimate (for Council application fee)
   - Owner consent letter
   Estimated processing: [X weeks]
   Risk: [public notification period, neighbour objections, RFIs]

2. [E.g. CC submission once DA approved]
   Documents:
   - DA approval + conditions
   - Engineer-stamped structural drawings
   - Energy efficiency report (e.g. NatHERS in AU)
   - BASIX certificate (NSW only)
   - Hydraulic engineer drawings (drainage)
   - Mechanical drawings (HVAC)
   - Specifications schedule
   Estimated processing: [X weeks]
   Risk: [further RFIs from certifier on structural calcs]

3. [E.g. Construction inspections — book at CC issue]
   - Pre-pour footing inspection
   - Slab inspection
   - Frame inspection
   - Waterproofing inspection
   - Final inspection (OC)

4. [E.g. Occupation Certificate (OC) issuance — at PC]

5. [Where applicable: Home Warranty / Builders Warranty
   insurance — must be in place BEFORE site start for residential
   work above threshold]
```

Each item in the pathway has its own checklist and trigger. The
agent surfaces what's due next.

## Step 2 — Mid-project: staged inspections

Each inspection has its own pre-flight checklist. The agent
generates them at booking:

```
INSPECTION CHECKLIST — Slab Inspection
=========================================
Project:           [name]
Address:           [address]
Inspector:         [name, certifier/BCA/AHJ/Building Control]
Date booked:       [date, time]
Phone confirm:     Morning of, [time]

ON-SITE PREP (operator checks the morning of):
☐ Engineer's structural drawings on site (or in site folder)
☐ Approved CC / Building Consent / Permit on site
☐ Reo steel placed + bars tied per drawings
☐ Plumbing rough-in capped + visible to inspector
☐ Bar chairs at correct spacing (check 600mm typical)
☐ Termite barrier installed (per AS 3660 if AU)
☐ Footings to depth (engineer's spec) — visible if no concrete
   yet on edges
☐ Slab area clear of debris + accessible
☐ Vapour barrier (where required) installed + sealed at
   penetrations
☐ Setting-out matches drawings (perimeter dimensions)

DOCUMENTS INSPECTOR MAY WANT
- Engineer's structural cert (if any pre-pour element)
- Plumber's rough-in cert (signed by licensed plumber)
- Termite barrier certificate (installer's record)

WHAT WE DO IF INSPECTOR FAILS THE INSPECTION
- Get the written report of failures
- Rectify each + photograph
- Re-book inspection (typically same week)
- Update programme + flag client immediately
- Log in `learnings.md` as a pattern

WHAT WE DO IF INSPECTOR PASSES
- Photograph the signed inspection card / receipt
- File in project folder
- Update progress claim trigger (slab claim raises within 24h)
- Notify concreter we're clear to pour
- Order concrete for Friday (confirm Wed)
```

Render in markdown. Repeat for each inspection. Common ones:

- Footing inspection (before slab pour)
- Pre-pour / slab inspection (steel + plumbing rough-in)
- Plumbing rough-in inspection (some regions, separate)
- Drainage inspection
- Frame inspection
- Waterproofing inspection (wet areas, before tile)
- Pre-line inspection (UK — insulation + services before plaster)
- Insulation inspection (US — before drywall)
- Drywall inspection (US — after first tape coat)
- Final inspection (OC / CCC / CofO / Final / Completion Cert)

## Step 3 — The handover pack (the most important deliverable)

At Practical Completion, the agent assembles the handover pack —
the document the client keeps for the life of the property.

```
HANDOVER PACK — [Project name] at [address]
=============================================
Builder:           [Business name + Builder licence #]
Project:           [name + scope summary]
Contract value:    $[X]
Practical Completion date: [date]
Defects liability period: 12 months from PC (ends [date])

CERTIFICATE OF COMPLETION / OCCUPATION

[Pull the right region's certificate — see templates/
compliance-certificate.md]

SUB-TRADE CERTIFICATES (issued by sub-trades under their own
licences)
- Electrical compliance cert (sparky [name, licence #])
- Plumbing compliance cert (plumber [name, licence #])
- Gas compliance cert (gas fitter [name, licence #]) — if gas
- HVAC commissioning cert (HVAC tech [name, licence #])
- Waterproofing cert (waterproofer [name, licence # or
  manufacturer-approved applicator #])
- Smoke alarm install / test cert (per region)
- Termite management plan + ID tag (AU/NZ)
- Energy efficiency / BASIX / BERS / Energy Rating sign-off

WARRANTIES INDEX

| Item / system | Manufacturer / supplier | Warranty period | Registered in client name |
|---|---|---|---|
| Structure / workmanship | [Business name] | 12 months full / [region statutory] | Yes (this cert) |
| Roof: Colorbond Surfmist | BlueScope | 25 years | Yes [link to registration] |
| Bi-fold doors | AWS | 7 years | Yes |
| Glass | Viridian | 10 years | Yes |
| Plasterboard | CSR | 10 years | Yes |
| Paint | Dulux | 5 years | Yes |
| Cabinetry | [Eurolinea] | 7 years | Yes |
| Hardware (hinges, runners) | Blum | Lifetime | Yes |
| Tapware | [brand] | 10 years | Yes |
| Appliances | [brand] | 2-5 years per item | Yes |
| Reverse-cycle HVAC | [brand] | 5 years parts + labour | Yes |
| Hot water unit | [brand] | 7-12 years cylinder, 3 years parts | Yes |

DEFECTS SCHEDULE (signed at PC walk-through)

| # | Location | Defect | Action by builder | Target date | Signed off |
|---|---|---|---|---|---|
| 1 | Kitchen bench | Small chip on benchtop edge | Polish + epoxy fill | Within 1 week | __________ |
| 2 | Lounge wall | Paint touch-up at SE corner | Cut + paint | Within 1 week | __________ |
| 3 | Main bath door | Sticking on warm days | Plane + re-paint | Within 2 weeks | __________ |
| 4 | Bi-fold panel 2 | Slightly stiff slide | Adjust roller | Within 1 week | __________ |
| ... | | | | | |

(All defects signed off + photographed before retention release at
12 months. Items added during defects period get appended.)

DEFECTS LIABILITY PERIOD INFO

For 12 months from PC ([date — date]), I'll come back and rectify
any defect that's our fault under the contract. To raise a defect:

1. Take a photo of the issue
2. Email me at [email] with: photo, location, what's happening,
   when it started
3. I respond within 48 hours with a plan (immediate fix /
   wait-and-monitor / not a defect)
4. Rectification happens at no cost to you within an agreed
   timeframe

Not covered:
- Wear and tear (normal scuffing, paint marking from furniture)
- Damage from misuse / impact (e.g. dropping something on the
  benchtop, hose left running)
- Settlement cracks <1mm in plaster (normal in first year)
- Issues caused by 3rd-party work after handover

At month 11, I'll proactively come back for a defects sweep —
walk the property, catch any small issues before the 12-month
period ends, and rectify them. Retention is released after that
visit.

MAINTENANCE INSTRUCTIONS

[List of regular maintenance items per element — pull from
materials' manufacturer instructions]

- Roof: visual inspection annually, clear gutters 2× yr
- Bi-folds: lubricate rollers + hinges 6-monthly with silicone
- Tile grout in wet areas: re-seal annually with [product]
- Cabinetry: clean with [non-abrasive cleaner], not the alcohol
  wipes
- Tapware: check + clean aerators 6-monthly
- HVAC: clean filters monthly, full service annually (book with
  [HVAC tech])
- Smoke alarms: monthly test (button), replace battery annually,
  replace unit at 10 years
- Hot water unit: anode check + service every 3-5 years
- Termite inspection: annually for life of building (recommended)

PROJECT PHOTOS

[Link to shared folder — Dropbox / Google Drive / WeTransfer]
Includes:
- Pre-start photos (existing condition)
- Excavation + footings
- Slab + steel + pre-pour
- Frame
- Lock-up + waterproofing
- Internal pre-lining + services rough-in
- Fit-out progress
- Post-completion finished shots

These photos are gold for any future sale of the property
(conveyancer, valuer, future buyer's building inspector).

CONTACT FOR DEFECTS / WARRANTY

Builder:           [your name]
Phone:             [phone]
Email:             [email]
Hours:             Mon-Fri 7am-5pm; email any time

For an emergency (water ingress through new roof, structural
movement, gas leak, electrical hazard): call any time.

Signed for and on behalf of [Business name]:

________________________________________
[your name], Licensed Builder, # [X]
Date: [date]

Signed by client (acknowledging receipt of handover pack +
defects schedule):

________________________________________
[Client name]
Date: [date]
```

Render in markdown. PDF for client. Keep original on file (7+
years statutory in most regions).

## Step 4 — Lodging certificates with the regulator

After PC, file the closing cert with the regulator:

- AU NSW: OC issued by certifier, copy to Council
- AU VIC: CFI lodged with Council + Building Surveyor
- AU QLD: Form 21 lodged with QBCC + Council
- NZ: CCC issued by Council BCA, kept on property file
- UK: Completion Certificate from Building Control / Approved
  Inspector, kept on property file; Party Wall Award filed with
  Land Registry if applicable
- US: CofO from AHJ, kept on property file
- CA Ontario: Tarion warranty registration filed for new homes

Window for filing: usually 28-30 days from PC. Agent calendars.

## Step 5 — Handing off to defects management

After handover:

- Pass to `09-recurring-maintenance.md` for defects period
  management + 11-month sweep scheduling
- Pass to `06-invoice-payment.md` for retention tracking
- Pass to `11-followup-reviews.md` for the 2-week settling-in
  check + review request

## Hard rules

- **Never fabricate certificate numbers, licence numbers, certifier
  IDs, permit numbers, or warranty registration numbers.** If
  missing, ASK.
- **Never sign as the sub-trade.** Sparky signs the electrical
  cert. Plumber signs the plumbing cert. Gas fitter signs the gas
  cert. Builder coordinates + includes in handover pack — does
  NOT generate the sub-trade's cert.
- **Never generate a final OC / CCC / CofO if a stage inspection
  was failed and not re-passed.** Surface the open failure to the
  operator.
- **Always pull the right region's pathway** from BUSINESS CONFIG.
- **Always include all sub-trade certs in handover pack** — the
  builder is the integrator.
- **Always include the structural warranty by region** in the
  warranties index.
- **Always include the defects schedule signed at PC** + the
  11-month sweep promise.
- **Always file the cert with the regulator within the window** —
  late filing = client's title encumbrance.
- **For new homes in regions with mandatory warranty schemes** (AU
  Home Warranty, NZ Master Build, UK NHBC, CA Tarion), confirm
  the warranty is registered + paid BEFORE site start, not at
  handover.

## Workflow

1. Operator says "Run compliance for [project]" or contract
   acceptance triggers
2. Agent reads BUSINESS CONFIG → Region + State
3. Agent generates the pathway map + key dates
4. At each inspection: agent generates checklist 48h ahead,
   confirms inspector, reminds operator
5. At PC: agent assembles handover pack from project record,
   sub-trade certs (collected during build), warranties (registered
   during build), defects walk-through
6. Operator reviews + signs
7. Pack delivered to client (PDF + printed copies + linked photo
   folder)
8. Lodged with regulator within the filing window
9. Saved on operator's records (7+ year statutory)

## Confirm + handoff

> *"Compliance step [X] for [project]: [pathway item / inspection /
> handover pack] drafted. Please review + sign / approve. Loading
> [next skill]."*
