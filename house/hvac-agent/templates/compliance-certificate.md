# Refrigerant logbook + handover pack template

The HVAC equivalent of a Compliance Certificate is actually TWO docs:
the refrigerant logbook entry (regulator-facing) and the handover
pack (customer-facing). For installs, both are issued. For
recovery/service-only work, the logbook is issued.

Regional variants below. Pull the right one from BUSINESS CONFIG →
Region + State/Province. Defaults to AU if both are missing.

Gas-fired heating work requires its own separate certificate under
separate licence — see the regional reference for gas cert format
(not duplicated here; HVAC gas cert is similar in shape to plumber
gas cert).

## AU — ARC Refrigerant Logbook Entry

```
REFRIGERANT LOGBOOK ENTRY (AU — ARC)
======================================
Logbook ID:          RL-[YYYYMM]-[N]
ARC RHL #:           [from BUSINESS CONFIG]
ARC RTA # (business):[from BUSINESS CONFIG]
Technician:          [Tech name + RHL #]
Business:            [Business name]
Date:                [date]

PROPERTY / SYSTEM
Customer:            [name]
Property address:    [full address]
System type:         [Split / Multi / Ducted / RTU / Heat pump]
Indoor make/model/serial:  [X]
Outdoor make/model/serial: [X]
Refrigerant type:    [R32 / R410A / R454B / R134a / R290]
Refrigerant GWP:     [675 R32 / 2088 R410A / 466 R454B /
                      1430 R134a / 3 R290]
Refrigerant tonnage (tCO2e): [charge kg × GWP / 1000]

WORK PERFORMED (tick)
☐ New install — pre-charged + topped up
☐ Like-for-like changeout — old recovered + new charged
☐ Recovery only (decommission)
☐ Leak detection + repair + recharge
☐ Routine service plan visit (pressure check only)
☐ Refrigerant charge correction post-leak-repair

REFRIGERANT MOVEMENTS
| Action     | Type   | kg     | From cylinder #   | To cylinder #   |
|---|---|---|---|---|
| Recovered  | [X]    | [X]    | system             | [recovery serial]|
| Charged    | [X]    | [X]    | [virgin serial]   | system           |

Final system charge: [kg] (nameplate spec [kg ± X%])

LEAK INSPECTION (mandatory record)
Method:               [Electronic + UV / Soap test / Pressure decay]
Detector model + cal date: [model / within 12 mo]
Result:               [PASS / FAIL with location + repair]

PRESSURE / VACUUM
Pressure-tested to:   [pressure, time, result]
Vacuum to:            [microns, time, held / failed]
Final operating: suction [X] / discharge [X] / sub-cool [X] /
                      superheat [X]

WORK CATEGORY (re recharge/recovery — for trading auth records)
☐ Install
☐ Decommission
☐ Leak repair + recharge
☐ Service

REGULATORY REFERENCE
AS/NZS 5149:2016 (Refrigeration systems & heat pumps)
AS/NZS 5141:2017 (HFC system compliance)
Ozone Protection and Synthetic Greenhouse Gas Management Act 1989
AS/NZS 60335.2.40 (heat pump safety, where applicable)

DECLARATION
I declare the refrigerant handling work to which this entry
relates has been carried out under my ARC Refrigerant Handling
Licence and the Ozone Protection Act 1989.

Technician signature: ________________________________
Print name:           [Tech]
RHL #:                [X]
Date:                 [date]
ARC return status:    [submitted / pending — within RTA cadence]
```

## NZ — Refrigerant Handling Record

```
REFRIGERANT HANDLING RECORD (NZ)
==================================
Trading group:        [ARTGM member or equivalent]
Technician approval:  [industry scheme + #]
Business:             [Business name + NZBN]
Date:                 [date]

PROPERTY / SYSTEM
[as per AU format]

WORK PERFORMED
[as per AU format]

REFRIGERANT MOVEMENTS
[as per AU format]

LEAK INSPECTION
[as per AU format]

REGULATORY REFERENCE
AS/NZS 5149:2016
Climate Change Response Act 2002 (HFC phasedown)
NZBC G4 (Ventilation), H1 (Energy Efficiency)

DECLARATION
I declare the work was carried out per AS/NZS 5149 and the Climate
Change Response Act.

Technician signature: ________________________________
Approval #:           [X]
Date:                 [date]
```

## UK — F-Gas Logbook Entry

```
F-GAS LOGBOOK ENTRY
====================
Site reference:      [Property identifier / customer reference]
F-Gas company cert:  REFCOM / Quidos / Bureau Veritas / BESA #
                     [from BUSINESS CONFIG]
Engineer cert:       C&G 2079 (refrigerant) + C&G 2078 (low-GWP /
                     heat pumps) #
Business:            [Business name, Company #]
Date:                [date]

PROPERTY / SYSTEM
Customer:            [name]
Property address:    [full address]
System type:         [Split / VRF / Cassette / RTU / Heat pump
                      hydronic / HW heat pump]
Equipment make/model/serial: [X]
Refrigerant type:    [R32 / R410A / R454B]
Refrigerant charge:  [kg]
GWP:                 [as above]
CO2e (tonnes):       [kg × GWP / 1000]

INSPECTION FREQUENCY OBLIGATION
☐ <5 tCO2e — no mandatory inspection
☐ 5–50 tCO2e — annual leak inspection
☐ 50–500 tCO2e — 6-monthly leak inspection
☐ >500 tCO2e — quarterly leak inspection

Next inspection due: [date]

WORK PERFORMED
[as per AU format]

REFRIGERANT MOVEMENTS
[as per AU format]

LEAK INSPECTION
Method:               [electronic — BS EN 14624 detector / continuous
                       leak system]
Detector model + cal date: [X]
Result:               [PASS / FAIL]

If leak found — repair within 14 days mandatory under UK F-Gas:
- Repair date:        [date]
- Repair method:      [X]
- Re-inspection date: [within 1 month of repair]
- Re-inspection result: [PASS]

REGULATORY REFERENCE
F-Gas Regulation UK 2015 (retained EU 517/2014)
BS EN 378-1 to -4
BS EN 14624 (leak detector spec)
Building Regs Part F + L (where install)
MCS standards (where heat pump install for grant)

DECLARATION
I confirm the work has been carried out per UK F-Gas Regulation,
BS EN 378, and the company's REFCOM certification.

Engineer signature:   ________________________________
Print name:           [Engineer name]
C&G 2079 / 2078:      [X]
Date:                 [date]

Records on site / Environment Agency for 5 years per regulation.
```

## US — EPA Section 608 Refrigerant Record

```
EPA SECTION 608 — REFRIGERANT HANDLING RECORD
==============================================
Performed under:      EPA Section 608 + [State HVAC contractor
                      regs]
Permit / state lic #: [local AHJ + state]
Tech cert:            EPA 608 Type [I / II / III / Universal] #
                      [from BUSINESS CONFIG]
Business:             [Business name, EIN, state HVAC license #]
Date:                 [date]

PROPERTY / SYSTEM
Customer:             [name]
Property address:     [full address]
System type:          [Residential split / Mini-split / Ducted
                       central / RTU / Commercial chiller]
Equipment make/model/serial: [X]
Refrigerant type:     [R410A / R32 / R454B / R134a]
GWP / AIM Act class:  [phasedown tier]
Charge amount:        [lb / kg]

WORK PERFORMED
[as per AU format]

REFRIGERANT MOVEMENTS
[as per AU format — with cylinder serials]

Recovery cylinder DOT spec verified: [yes]
Recovery efficiency verified per EPA 608 for system type.

LEAK INSPECTION (if applicable)
[as per AU format]

Note: EPA Section 608 prohibits known venting. Leak repair within
30 days for systems >50 lb charge.

REGULATORY REFERENCE
EPA Section 608 (federal)
AIM Act 2020 (HFC phasedown)
ASHRAE 15 (Safety) + 34 (Refrigerant designations)
[State HVAC code — IMC / UMC + amendments]
CA Title 24 (if California)

DECLARATION
I confirm the work was performed per EPA Section 608 and
applicable state HVAC regulations. No knowing venting occurred.
Records retained 3 years per federal regulation.

Tech signature:       ________________________________
EPA 608 cert #:       [X]
State HVAC license #: [X]
Date:                 [date]
```

## CA — ODSHAR Refrigerant Record

```
ODSHAR REFRIGERANT HANDLING RECORD
===================================
Performed under:      Federal ODSHAR + provincial trade rules
Provincial trade:     Red Seal Refrigeration & AC Mechanic
                      [313A ON / provincial #]
TSSA gas (if gas work in ON): [G1/G2/G3 #]
Business:             [Business name, BN]
Date:                 [date]

PROPERTY / SYSTEM
[as per AU format]

WORK PERFORMED
[as per AU format]

REFRIGERANT MOVEMENTS
[as per AU format]

LEAK INSPECTION
[as per AU format]

REGULATORY REFERENCE
ODSHAR (federal — SOR/2016-137)
CSA B52 (Mechanical Refrigeration Code)
CSA B149.1 (where gas work)
National Building Code + provincial (OBC / BCBC / Code de
construction)

DECLARATION
I confirm the work was carried out per ODSHAR and [provincial
trade regulations]. No venting occurred.

Tech signature:       ________________________________
Red Seal / Provincial #: [X]
Date:                 [date]
```

## Customer Handover Pack (every region — adapt language)

For new installs and changeouts, the customer ALSO gets the
handover pack — separate from the regulator-facing logbook.

```
HANDOVER PACK — [Customer]
============================
System installed:    [e.g. Daikin Cora FTKM50 5.0kW reverse-
                      cycle split]
Install date:        [date]
Installed by:        [Business name, Refrigerant licence # +
                      Tech name]

EQUIPMENT
- Indoor unit:       Make [X], Model [X], Serial [X]
- Outdoor unit:      Make [X], Model [X], Serial [X]
- Refrigerant:       Type [X], Charge [X kg]
- Line set:          [length, diameter, new/re-used]
- Mounting:          [bracket type, condition of pad]

WARRANTY (registered in customer's name with manufacturer)
- Manufacturer:      [X — years parts + labour]
- Workmanship:       [Business name] — 12 months from install
- Registration confirmation #: [manufacturer rego ref]

COMMISSIONING RESULTS
- Pressure test:     [held X MPa for X min, no drop]
- Vacuum:            [pulled to X microns, held X min]
- Refrigerant charge: [X kg per spec]
- Suction pressure (cool mode, X°C ambient): [X]
- Discharge pressure (cool mode): [X]
- Cool mode delta-T at head: [X °C]
- Heat mode delta-T at head: [X °C]
- Drainage tested: [discharges to exterior, no back-up]
- Vibration / mounting: [on isolation pads, no contact]
- Electrical isolation tagged + tested: [pass]

REFRIGERANT LOGBOOK ENTRY (separate doc, attached): RL-[YYYYMM]-[N]

USER OPERATION GUIDE
- Main controls:     [remote / wall pad / app — quick reference]
- Recommended setpoints: [24°C cool / 21°C heat — efficiency band]
- Modes explained:   Cool, Heat, Dry, Fan, Auto
- Air direction:     Vertical sweep via remote; horizontal vane
                     manual
- Filter access:     [How to access — monthly check, deep clean
                     quarterly]
- App pairing:       [if smart-enabled — steps]
- Annual service:    Recommended in [pre-summer / pre-winter
                     depending on hemisphere], via our service
                     plan or one-off

SERVICE PLAN
Year 1 included as agreed at quote. Next service visit due:
[date approx 12 months from install].

TROUBLESHOOTING (DIY before calling)
1. Check the filter (#1 cause of "not cooling")
2. Check the breaker hasn't tripped
3. If error code displays, send a photo
4. Workmanship warranty covers any install fault, no charge

Thanks,
[your name]
[Business name]
[Refrigerant licence # / Tech name]
[Phone] · [Email]
```

## Hard rules (across all variants)

- **Never sign as the tech / engineer.** The human signs. The
  agent prepares the form.
- **Never invent a licence number, ARC RHL #, RTA #, EPA 608 #,
  F-Gas C&G #, MCS #, REFCOM #, TSSA #, Red Seal #, or cylinder
  serial.** Ask if missing from BUSINESS CONFIG.
- **Refrigerant work requires a current licence** in the region
  matching the work scope. If the operator doesn't hold the right
  tier, the logbook entry can't be generated — the work must be
  sub-contracted to a licensed tech who issues their own logbook.
- **Always include the standards reference**.
- **Always include the leak inspection method + detector model +
  calibration date.** "Tested pass" is not a logbook entry.
- **Always include the pressure test + vacuum result** — pressure-
  tested but no result = not tested.
- **For UK systems ≥5 tCO2e: NEVER miss the annual leak inspection
  scheduling.** Calendar-book the next inspection at install or first
  service. Missing this = customer liability + REFCOM cert at risk.
- **Always include the next-service-recommended date** on the
  customer handover pack.
- **Cylinder serials on both sides of every movement** — virgin
  source + recovery destination. Missing serials = audit failure.
- **Keep a copy on file** — 3 years US federal; 5 years UK F-Gas;
  7+ years AU some states under RTA; provincial CA varies.
- **Lodge within the regulator's window** (ARC return per RTA
  cadence; F-Gas inspection records on site; EPA on request;
  TSSA cert within 30 days for ON gas work).
- **Gas heating work issues a separate gas cert under separate
  licence.** Never combine into the refrigerant cert — different
  regulators.
```
