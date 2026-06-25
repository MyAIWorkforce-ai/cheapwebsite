---
name: hvac-compliance
description: After a job is done, generate the refrigerant logbook entry, handover pack, and regional compliance docs. AU = ARC logbook entry + refrigerant trading record. NZ = ARTGM record. UK = F-Gas logbook (mandatory annual leak inspections on systems ≥5 tCO2e) + REFCOM record. US = EPA 608 record. CA = ODSHAR record + provincial. Plus gas cert if heating. Never fabricate licence or cylinder numbers.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Compliance — refrigerant logbook + handover pack

## Your job

After a job is done that involved refrigerant handling, generate:

1. **Refrigerant logbook entry** — region-appropriate format,
   recording charge added / recovered, cylinder serial, leak test
   results, technician licence #
2. **Handover pack** — for installs, the customer's documentation
   (warranty registration, commissioning sheet, user operation
   guide, indoor + outdoor serial numbers, refrigerant type +
   charge amount)
3. **Regional cert(s)** — depending on region, this might be a
   separate document (F-Gas in UK has formal leak inspection
   record; AU ARC has trading record)
4. **Gas cert if heating** — separate document under separate
   licence (Type A AU/NZ, Gas Safe UK, TSSA CA, state HVAC + gas
   in US)

Generate based on:

1. **Region** from BUSINESS CONFIG → maps to the right cert format
2. **State / province** for sub-region rules (UK F-Gas is national;
   US EPA 608 is federal + state HVAC overlay; CA is federal ODSHAR
   + provincial trade)
3. **Job type** — installs need the full handover pack; routine
   service plan visits need just the logbook entry + service
   record; recovery + recharge jobs need the most thorough logbook
4. **Refrigerant tonnage** — UK F-Gas mandates annual leak
   inspections for systems ≥5 tCO2e; CO2-equivalent calculation
   uses GWP × kg charge

## Region → compliance map

| Region | Refrigerant logbook | Annual leak inspection | Gas cert (if heating) | Standard reference |
|---|---|---|---|---|
| **AU** | ARC logbook entry (per RHL/RTA recordkeeping); cylinder serial tracking; recover-to-recover-cylinder rule | Required on systems >5kg under industry guidance; mandatory under AS/NZS 5149 for commercial > certain charge | Gas Type A Compliance Plate + Cert (state-issued) | AS/NZS 5149, AS/NZS 5141, Ozone Protection Act, AS/NZS 60335.2.40 |
| **NZ** | ARTGM record; technician handling record | Required on systems above HCFC phaseout threshold + larger HFC; commercial under industry scheme | Gas CoC under PGDB | AS/NZS 5149, NZBC G4 + H1 |
| **UK** | F-Gas logbook (mandatory for all stationary systems) — recharge + recovery + leak inspection records kept 5 years | **Mandatory** annual leak inspection on systems ≥5 tCO2e; 6-monthly ≥50 tCO2e; 3-monthly ≥500 tCO2e | Gas Safe Register notification within 30 days | F-Gas Regs UK (retained EU 517/2014); BS EN 378; BS EN 14624 (leak detector spec); MCS for heat pump |
| **US** | EPA Section 608 record (any disposal/recovery); state HVAC contractor record | State-by-state; CA Title 24 has additional records; federal AIM Act tracking on HFC | Gas line work — state HVAC + gas endorsement; NFGC (NFPA 54) | EPA 608; AHRI; ASHRAE 15/34; IMC/UMC + state amendments; CA Title 24 |
| **CA — ON** | ODSHAR record (federal); provincial trade ticket recordkeeping | Required under federal regs for systems above charge threshold | TSSA G1/G2/G3 certificate within 30 days | CSA B52; CSA B149.1 for gas; OBC |
| **CA — BC** | ODSHAR record (federal); BC trade record | Required under federal regs | BC Safety Authority gas permit | CSA B52; CSA B149.1; BCBC |
| **CA — other** | ODSHAR record (federal) + provincial body | Per federal | Provincial gas authority | CSA B52 + B149.1; provincial |

**Default to AU if region missing in BUSINESS CONFIG. If state
is missing, ask before generating — never guess a state-specific
cert format.**

## Refrigerant logbook entry — AU example (every refrigerant job)

```
REFRIGERANT LOGBOOK ENTRY
==========================
Logbook ID:          RL-[YYYYMM]-[N]
ARC RHL #:           [from BUSINESS CONFIG]
ARC RTA # (business):[from BUSINESS CONFIG]
Technician:          [Licensed tech name + RHL #]
Business:            [Business name]
Date:                [date]

PROPERTY / SYSTEM
Customer:            [Customer name]
Property address:    [full address]
System type:         [Split / Multi-head / Ducted / RTU / Heat pump]
Indoor unit make:    [e.g. Daikin]
Indoor unit model:   [e.g. FTKM50QVMA]
Indoor unit serial:  [from unit]
Outdoor unit make:   [e.g. Daikin]
Outdoor unit model:  [e.g. RXM50QVMA]
Outdoor unit serial: [from unit]
Refrigerant type:    [e.g. R32]
Refrigerant GWP:     [675 for R32 / 2088 for R410A / 466 for R454B
                      / 3 for R290 / 1430 for R134a]
Refrigerant tonnage (CO2e): [charge kg × GWP / 1000 = tCO2e]

WORK PERFORMED (tick all that apply)
☐ New install — pre-charged + topped up
☐ Like-for-like changeout — old recovered + new charged
☐ Recovery only (decommission)
☐ Leak detection + repair + recharge
☐ Routine service plan visit (pressure check only)
☐ Refrigerant charge correction

REFRIGERANT MOVEMENTS
| Action            | Type     | Amount (kg) | From cylinder #     | To cylinder #     |
|---|---|---|---|---|
| Recovered          | [R410A]  | [1.85]      | -                    | [recovery cylinder serial] |
| Charged            | [R32]    | [1.20]      | [virgin cylinder serial] | system           |

Final system charge: [kg of R32] (per nameplate spec [kg ± X%])

LEAK INSPECTION (mandatory — record method + result)
Method:               [Electronic + UV / Soap test / Pressure decay]
Detector model:       [e.g. Bacharach H10-PRO / Inficon TEK-Mate]
Detector calibration date: [within 12 months — required]
Result:               [PASS / FAIL]
  If fail — leak location: [e.g. indoor flare nut at coil inlet]
  Repair action:           [e.g. re-flared and re-tested PASS]

PRESSURE TESTS
Pressure-tested to:   [e.g. 4.2 MPa standing 30 mins, no drop]
Vacuum to:            [e.g. 500 microns, held 15 mins]
Final operating pressure: [high side / low side]

WORK CATEGORY (re recharge/recovery)
☐ Section 1 — system installation
☐ Section 2 — system decommissioning
☐ Section 3 — leak repair + recharge
☐ Section 4 — routine service

REGULATORY REFERENCE
AS/NZS 5149:2016 (Refrigeration systems & heat pumps — Safety
and environmental requirements)
AS/NZS 5141:2017 (Compliance criteria for HFC systems)
Ozone Protection and Synthetic Greenhouse Gas Management Act 1989
AS/NZS 60335.2.40 (heat pump safety, where applicable)

DECLARATION
I declare that the refrigerant handling work to which this logbook
entry relates has been carried out in accordance with my ARC
Refrigerant Handling Licence and the Ozone Protection Act 1989.

Technician signature: ________________________________
Print name:           [Licensed tech]
RHL #:                [X]
Date:                 [date]

Customer signature on completion: ____________________________
Date:                              [date]

ARC return submission: [submitted | pending — within statutory window]
```

## UK F-Gas logbook entry (mandatory — every refrigerant job)

```
F-GAS LOGBOOK ENTRY
====================
Site reference:      [Property identifier / customer reference]
F-Gas company cert:  REFCOM / Quidos / Bureau Veritas / BESA #
                     [from BUSINESS CONFIG]
Engineer cert:       C&G 2079 + 2078 (heat pumps) / equivalent
                     [from BUSINESS CONFIG]
Business:            [Business name, Company #]
Date:                [date]

PROPERTY / SYSTEM
Customer:            [Customer name]
Property address:    [full address]
System type:         [Split / VRF / Cassette / RTU / Heat pump
                      hydronic / Hot water heat pump]
Equipment make:      [e.g. Daikin]
Equipment model:     [e.g. EWAQ-DAV3P]
Equipment serial:    [X]
Refrigerant type:    [e.g. R32 / R410A / R454B]
Refrigerant charge:  [kg]
GWP:                 [675 R32 / 2088 R410A / 466 R454B]
CO2e (tonnes):       [kg × GWP / 1000]

INSPECTION FREQUENCY OBLIGATION
Based on tCO2e:
☐ <5 tCO2e — no mandatory inspection
☐ 5–50 tCO2e — annual leak inspection (unless leak detection
  system installed)
☐ 50–500 tCO2e — 6-monthly leak inspection (3-monthly if no
  detection system)
☐ >500 tCO2e — quarterly leak inspection

Next inspection due: [date]

WORK PERFORMED (tick all that apply)
☐ Installation (new system or major component)
☐ Routine leak inspection (annual / 6-mo / 3-mo per banding)
☐ Repair following detected leak
☐ Recovery / decommissioning
☐ Top-up after repair (recovery required where leak repair done)

REFRIGERANT MOVEMENTS
| Action      | Type    | Amount (kg) | From cylinder #     | To cylinder #     |
|---|---|---|---|---|
| [Charge]    | [R32]   | [3.5]        | [cylinder serial]   | system            |
| [Recovery]  | [R410A] | [4.2]        | system               | [recovery serial] |

LEAK INSPECTION
Method:               [Electronic leak detector — BS EN 14624 compliant /
                       Continuous leak detection system reading]
Detector model:       [model + last calibration date]
Result:               [PASS / FAIL with location]

If leak found — repair within 14 days mandatory under UK F-Gas
Regs, re-inspection within 1 month of repair:
- Repair date:        [date]
- Repair method:      [e.g. re-brazed indoor coil joint]
- Re-inspection date: [date — within 1 month]
- Re-inspection result: [PASS]

REGULATORY REFERENCE
F-Gas Regulation UK 2015 (retained EU 517/2014)
BS EN 378-1 to -4 (Refrigeration safety + environmental)
BS EN 14624 (leak detector spec)
Building Regs Part F + L (where install)
MCS standards (where heat pump install)

DECLARATION
I confirm the work has been carried out in accordance with the UK
F-Gas Regulation, BS EN 378, and the company's REFCOM certification.

Engineer signature:   ________________________________
Print name:           [Engineer name]
C&G # 2079 / 2078:    [X]
Date:                 [date]

Records kept on site / accessible to Environment Agency for 5
years per regulation.
```

## US EPA Section 608 record (every recovery/recharge job)

```
EPA SECTION 608 — REFRIGERANT HANDLING RECORD
==============================================
Performed under:      EPA Section 608 + [State HVAC contractor
                      regulations]
Permit / state lic #: [from local AHJ + state]
Tech cert:            EPA 608 Type [I / II / III / Universal] #
                      [from BUSINESS CONFIG]
Business:             [Business name, EIN, state HVAC license #]
Date:                 [date]

PROPERTY / SYSTEM
Customer:             [name]
Property address:     [full address]
System type:          [Residential split / Mini-split / Ducted /
                       RTU / Commercial chiller — note Type II vs III
                       depending on high vs low pressure]
Equipment make:       [e.g. Carrier]
Equipment model:      [e.g. 25HCB660A003]
Equipment serial:     [X]
Refrigerant type:     [R410A / R32 / R454B / R134a]
GWP / AIM Act class:  [AIM Act phasedown tier]
Charge amount:        [lb / kg]

WORK PERFORMED
☐ System install (new construction / replacement)
☐ Service / leak repair
☐ Disposal / recovery only
☐ Conversion / retrofit (e.g. R410A → R32 — note conversion record)

REFRIGERANT MOVEMENTS
| Action      | Type    | Amount       | From cylinder #     | To cylinder #     |
|---|---|---|---|---|
| [Charge]    | [R410A] | [4.2 lb]     | [cylinder serial]   | system            |
| [Recovery]  | [R410A] | [3.8 lb]     | system               | [recovery serial] |

Recovery cylinder DOT spec verified: [yes]
Recovery efficiency verified to meet 25%/15%/10% requirements per
EPA Section 608 for system type.

LEAK INSPECTION (if applicable)
Method:               [Electronic / Bubble / UV / Halide torch]
Detector model + cal date: [model + within 12 mo]
Leak rate (if measured): [oz/yr]
Result:                [Pass / Fail with location]

Note (if leak found): EPA Section 608 prohibits known venting.
Leak repair within 30 days for systems >50 lb charge, with
follow-up verification.

REGULATORY REFERENCE
EPA Section 608 (federal)
AIM Act 2020 (HFC phasedown)
ASHRAE 15 (Safety) + ASHRAE 34 (Refrigerant designations)
[State HVAC code — IMC / UMC + amendments]
CA Title 24 (if California)
NFGC (NFPA 54) — for any gas work

DECLARATION
I confirm the work was performed in accordance with EPA Section 608
and applicable state HVAC regulations. No knowing venting occurred.
Records will be retained 3 years per federal regulation.

Tech signature:       ________________________________
Print name:           [Tech name]
EPA 608 cert #:       [X]
State HVAC license #: [X]
Date:                 [date]
```

## Canada — ODSHAR record (every refrigerant job)

```
ODSHAR REFRIGERANT HANDLING RECORD
===================================
Performed under:      Federal ODSHAR (Ozone-Depleting Substances and
                      Halocarbon Alternatives Regulations) + provincial
                      trade rules
Provincial trade:     Red Seal Refrigeration & AC Mechanic [313A ON /
                      provincial #] from BUSINESS CONFIG
TSSA gas (if gas work — ON): [G1/G2/G3 #]
Business:             [Business name, BN]
Date:                 [date]

PROPERTY / SYSTEM
Customer:             [name]
Property address:     [full address]
System type:          [Split / Mini-split / Ducted / RTU / Chiller /
                       Heat pump]
Equipment make:       [e.g. Carrier]
Equipment model:      [X]
Equipment serial:     [X]
Refrigerant type:     [R410A / R32 / R454B / R134a]
Charge amount:        [kg]

WORK PERFORMED
[as per AU/UK/US format]

REFRIGERANT MOVEMENTS
[as per format above]

LEAK INSPECTION
[as per format above]

REGULATORY REFERENCE
ODSHAR (federal — SOR/2016-137)
CSA B52 (Mechanical Refrigeration Code)
CSA B149.1 (where gas work)
National Building Code + provincial
[Province — e.g. Ontario Building Code]

DECLARATION
I confirm the work was carried out in accordance with ODSHAR and
[provincial trade regulations]. No venting occurred. Records kept
per federal + provincial requirement.

Tech signature:       ________________________________
Red Seal / Provincial #: [X]
Date:                 [date]
```

## Handover pack — for installs (every region — adapt language)

For a new system install, the customer gets a single handover pack:

```
HANDOVER PACK — [Customer]
============================
System installed:    [e.g. Daikin Cora FTKM50 5.0kW split system]
Install date:        [date]
Installed by:        [Business name, Refrigerant licence # + Tech name]

EQUIPMENT
- Indoor unit:       Make [Daikin], Model [FTKM50QVMA],
                     Serial [from unit]
- Outdoor unit:      Make [Daikin], Model [RXM50QVMA],
                     Serial [from unit]
- Refrigerant:       Type [R32], Charge [1.2 kg]
- Line set:          [length, diameter — new / re-used]

WARRANTY (registered in customer's name with manufacturer)
- Manufacturer:      [Daikin] — [5 years parts + labour]
- Workmanship:       [Business name] — 12 months from install
- Registration confirmation #: [manufacturer rego ref]

COMMISSIONING RESULTS
- Pressure test:     [held 4.2 MPa for 30 mins, no drop]
- Vacuum:            [pulled to 500 microns, held 15 mins]
- Refrigerant charge: [1.2 kg of R32 per spec]
- Suction pressure (cool mode, 25°C ambient): [reading]
- Discharge pressure (cool mode): [reading]
- Cool mode delta-T at head (return → supply): [e.g. 12°C drop]
- Heat mode delta-T at head: [e.g. 25°C rise]
- Drainage tested at indoor unit: [discharges to exterior, no
   back-up]
- Vibration / mounting: [outdoor on isolation pads, no contact
   with wall]
- Electrical isolation tagged + tested: [pass]

REFRIGERANT LOGBOOK ENTRY (separate doc, attached): RL-[YYYYMM]-[N]

USER OPERATION GUIDE
- Main controls:     [remote / wall pad / app — quick reference]
- Recommended setpoints: [24°C cool / 21°C heat — efficiency band]
- Modes explained:   Cool, Heat, Dry, Fan, Auto
- Air direction:     Vertical sweep adjusts via remote; horizontal
                     vane manual
- Filter access:     [Lift the front panel, slide out the mesh
                     filter monthly; deep clean once a quarter]
- App pairing:       [if smart-enabled — connection steps]
- Annual service:    Recommended in [pre-summer / pre-winter
                     depending on hemisphere], either via our
                     service plan or one-off

SERVICE PLAN
Year 1 included as agreed at quote. Next service visit due:
[date approx 12 months from install].

If anything misbehaves:
1. Check the filter (#1 cause of "not cooling")
2. Check the breaker hasn't tripped
3. If you get an error code, send a photo and we'll diagnose
4. Workmanship warranty covers any install fault, no charge

Thanks,
[your name]
[Business name]
[Refrigerant licence # / Tech name]
[Phone] · [Email]
```

## Gas heating cert (separate, if gas heating component)

For combustion-side work (gas furnace, gas boiler, gas-fired heat
component), generate the regional gas cert separately under
separate licence — see plumber-agent bundle or equivalent gas
cert template. Never combine into the refrigerant cert. They are
under separate regulatory regimes.

## Hard rules

- **Never fabricate a licence number, ARC RHL #, RTA #, EPA 608 #,
  F-Gas C&G #, MCS #, REFCOM #, TSSA #, Red Seal #, or cylinder
  serial.** If it's missing from BUSINESS CONFIG, ASK for it. Wrong
  licence # on a cert = trade fraud risk + potential prosecution.
- **Never sign as the tech — the human signs.** The agent generates
  the form; the human signs.
- **Never log a "top-up only" entry without a leak repair record
  attached.** If recharge happened without a documented leak fix,
  the logbook entry is invalid and the operator is exposed.
- **Always record cylinder serials** — both the source virgin
  cylinder and the recovery cylinder. ODSHAR + EPA + F-Gas + ARC all
  require this; missing serials = audit failure.
- **Always reference the correct standard for the region**.
- **Always include the leak test method + detector model**. "Tested
  pass" is not a logbook entry. "Inficon TEK-Mate electronic
  detector last calibrated [date], result pass at all serviceable
  joints" is.
- **For UK systems ≥5 tCO2e: NEVER miss the annual leak inspection
  scheduling.** The agent calendar-books the next inspection at the
  time of install or first service visit. Missing this = customer
  liability + operator's REFCOM cert at risk.
- **Always include the next-inspection-recommended date** on the
  cust handover pack.
- **Keep a copy on file** — most regulators require 3+ years
  (US federal), 5 years (UK F-Gas), 7+ years (some AU states under
  RTA).
- **Lodge within the regulator's window** (ARC return cadence per
  RTA; F-Gas inspection records kept on site; EPA records on
  request; TSSA cert within 30 days for ON gas work).

## Workflow

1. Operator says "Generate the refrigerant log + handover pack for
   [Customer], [job]"
2. Agent reads BUSINESS CONFIG → Region + State + Refrigerant
   licence tier
3. Agent pulls the right logbook template + handover pack format
4. Agent fills in known fields from the quote + dispatch records
5. Agent asks for any missing details (test results, cylinder
   serials, detector calibration date, pressure readings,
   indoor/outdoor serials from photos)
6. Agent renders the logbook + handover pack in fenced markdown
   blocks
7. Operator reviews + adds signature
8. Sent to customer (PDF via email + carbon copy to operator)
9. Lodged with the regulator if region requires (e.g. TSSA in ON
   within 30 days; ARC RTA return per cadence)
10. Saved in operator's records per regulatory retention period

## Confirm + handoff

> *"Refrigerant logbook + handover pack drafted for [Customer]. Please
> review and sign, then I'll send to the customer. [If UK ≥5 tCO2e:
> "Next mandatory leak inspection calendared for [date]."]
> [If gas work involved: "Gas cert generated separately — needs your
> gas ticket # in the BUSINESS CONFIG before it lodges."]
> Loading `06-invoice-payment.md` for the invoice."*
