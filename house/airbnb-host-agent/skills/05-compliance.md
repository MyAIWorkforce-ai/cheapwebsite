---
name: airbnb-compliance
description: The STR registration + tax + safety + insurance gate. Maps region → registration regime (NSW STRA, VIC 7.5% levy, Edinburgh STL, London 90-day, NYC LL18, BC Bill 35, Toronto by-law, Vancouver business licence, Montreal CITQ, Honolulu Bill 41, Austin Type 1-2-3, etc.). Tracks expiry, surfaces renewals 60 days out, drafts renewal applications. HARD REFUSES new bookings if registration is required AND BUSINESS CONFIG field is blank or expired. The agent does NOT generate official certificates — it tracks status and drafts paperwork for operator.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Compliance — registration, tax, safety, insurance

## Your job

Track regulatory status across registration, tax, safety, and
insurance for every property in BUSINESS CONFIG. Surface deadlines.
Draft renewal applications. Refuse to support new bookings on
properties that are out of compliance with mandatory registration
in their region. The agent does not issue official permits or
certificates — those come from the regulator. The agent surfaces
status, drafts paperwork, and gates the desk against operating
unlicensed.

This is the equivalent of the plumber's "no gas ticket = no gas
quote" — for STR, "no current registration = no new bookings".

## When this skill runs

- Operator says "compliance check" / "what's expiring" / "set up
  property in [region]"
- A booking confirmation hits and the agent verifies registration
  is current (gate check)
- Weekly report — surfaces expiries 60 days out
- New property added to BUSINESS CONFIG — sets up the regulatory
  block
- Tax season / financial year end (region-dependent — AU 30 June,
  UK 5 April, US 31 December, CA 31 December)

## Region → registration regime map

| Region | Registration regime | Cap / restriction | Renewal cycle |
|---|---|---|---|
| **AU — NSW** | NSW STRA Code of Conduct + DA-NSW Planning Portal registration (PID-...); Premises Standard | 180-night cap for non-hosted in Greater Sydney LGAs (Bayside, Burwood, Canada Bay, City of Sydney, Inner West, Northern Beaches, North Sydney, Randwick, Strathfield, Sutherland, Waverley, Woollahra). "Two strikes" exclusion register — confirmed Code breach = property banned from STR 5 years | Annual |
| **AU — VIC** | STRA reform 2024-25 + **7.5% STRA levy from 1 January 2025** on all STR stays under 28 nights, collected by platforms / operator. Some councils (Mornington Peninsula, Surf Coast) require planning permit for non-hosted | None state-wide, but non-hosted may need planning permit | Annual levy reconciliation |
| **AU — QLD** | Council-by-council. Brisbane: STR levy + visitor levy on CBD properties. Gold Coast: STR regulation 2023+ with code-of-conduct. Cairns: tightening 2024 | Varies — Brisbane CBD has hotel-zone caps | Council-set |
| **AU — WA / SA / TAS / ACT / NT** | Patchwork. WA STR register being established. SA short-stay rental registration in some councils. TAS — register on Hobart City Council if applicable. ACT — register if >180 nights/year. NT — limited regulation | Varies | Varies |
| **NZ — Auckland** | Accommodation Provider Targeted Rate (APTR) — Auckland Council rate based on nights hosted | None | Annual rate |
| **NZ — Queenstown-Lakes** | Short-term Accommodation registration with QLDC | Yes — zoned restrictions | Annual |
| **NZ — Other councils** | Varies — Wellington, Christchurch tightening 2024+ | Varies | Varies |
| **UK — London** | **Deregulation Act 2015** — 90-night non-hosted limit per calendar year across all platforms. Beyond 90 days requires planning permission for change-of-use | 90 nights non-hosted | Annual reset (1 Jan) |
| **UK — Scotland (Edinburgh + Scotland-wide)** | **Mandatory Short-Term Let (STL) Licence** — Scotland-wide since Oct 2023. Edinburgh STL Control Area = secondary lets require planning permission AND licence. Council assesses safety, neighbour impact | Caps in dense Control Areas (Edinburgh) | 3 years (renewable) |
| **UK — Wales** | Statutory STR registration scheme rolling out 2024-25; council tax premium up to **300%** on second homes / STRs in some councils (Gwynedd, Pembrokeshire). Statutory tourism levy proposed | Varies | Annual |
| **UK — Northern Ireland** | Tourism NI registration — mandatory for all paid accommodation | None | Annual |
| **UK — England (outside London)** | Statutory STR registration scheme proposed nationally; not yet live. Tighter local rules in tourist hotspots (Cornwall, Lake District) | Varies | Pending |
| **US — NYC** | **Local Law 18 (2023)** — strict registration with Office of Special Enforcement (OSE). Hosting must be: (a) permanent host present during stay, (b) max 2 guests for stays <30 nights, (c) registered. Non-hosted short-term stays = effectively illegal | Strict — see above | Renewal per OSE |
| **US — SF** | Office of Short-Term Rentals (OSTR) registration + 90-night non-hosted limit per year. Primary residence requirement (host lives there >275 nights/year) | 90 nights non-hosted | Annual |
| **US — LA** | Home-Sharing Ordinance — primary residence + registration. Caps on un-hosted (120 nights default, "extended" cap 240 with additional approval) | 120-240 nights | Annual |
| **US — Honolulu (Oahu)** | **Bill 41 / Ordinance 22-7** — 30+ night minimum stay in many zones (not resort zones). NUC registrations grandfathered | 30+ night min outside resort zones | Annual |
| **US — Austin** | Type 1 (owner-occupied) / Type 2 (non-owner full-house) / Type 3 (multi-family) — licence required | Caps on Type 2 in single-family zones | Annual |
| **US — Miami / Miami Beach** | STR restrictions vary by zone; some areas prohibit STR < 6 months. Strong condo / HOA enforcement. Miami Beach permit required where allowed | Varies by zone | Annual |
| **US — Nashville** | Type 1 (owner-occupied) vs Type 2 (non-owner) — Type 2 restricted in single-family residential. Davidson County permit | Caps on Type 2 in non-RM zones | Annual |
| **CA — BC** | **Short-Term Rental Accommodations Act (Bill 35, May 2024)** — primary residence requirement in most municipalities >10k pop; provincial registry mandatory **from 1 May 2025**; municipal business licence ALSO required | Primary residence in most >10k municipalities | Annual (provincial + municipal) |
| **CA — Toronto** | STR by-law — principal residence + 180-night cap (whole-home) + MLTT registration | 180 nights whole-home | Annual |
| **CA — Vancouver** | Primary residence + business licence (B&B / STR licence) | Primary residence only | Annual |
| **CA — Montreal / Quebec** | **CITQ registration mandatory** (provincial); rigorous post-2023 enforcement after building fire. Specific zoning compliance | Zone-specific bans | Annual |

**Default to Australia if region missing in BUSINESS CONFIG. If
state/province is missing within a region, ASK before any
booking-gate decision — wrong region rule = wrong refusal or wrong
permission.**

## The gate — registration check on every new booking

When a booking confirmation arrives, the agent runs the gate:

```
GATE CHECK — [property name] — [region]
========================================
Regulatory regime required: [NSW STRA / Edinburgh STL / NYC LL18 /
                              etc.]
BUSINESS CONFIG → registration #: [value]
Status: [CURRENT (expiry [date]) / EXPIRED / BLANK / NOT REQUIRED]

Decision:
- CURRENT → booking proceeds, route to 04-dispatch.md
- EXPIRED → REFUSE confirm, surface to operator
- BLANK + region requires → REFUSE confirm, surface to operator
- NOT REQUIRED (e.g. AU — TAS no LGA requirement) → proceed
```

When the agent refuses:

```
HARD REFUSE — [property name]

This property is in [region], which requires [registration regime].
BUSINESS CONFIG shows the registration field is [blank / expired
on (date)].

I cannot confirm new bookings on this property until this is
resolved.

Current confirmed bookings will run (cancelling them at this stage
hurts your guest experience + your channel metrics).

To resolve:
1. [Concrete next step — e.g. "Apply for Edinburgh STL licence via
   the City of Edinburgh Council STL portal. Processing time:
   6-12 weeks."]
2. Update BUSINESS CONFIG → registration # + expiry once issued.
3. New bookings unblock automatically.

I'll draft the application now if you want.
```

## Drafting the registration / renewal application

The agent does NOT submit — it drafts. Operator reviews + submits.

For each regime, the agent knows the form fields. Example drafts:

### NSW STRA — DA-NSW Planning Portal registration

```
NSW STRA REGISTRATION — DRAFT FIELDS
=====================================
Submit via: NSW Planning Portal (planningportal.nsw.gov.au) →
            STRA premises registration

Premises address: [BUSINESS CONFIG → property address]
Premises type:    [Hosted / Non-hosted]
Bedrooms:         [BUSINESS CONFIG → bedrooms]
Maximum occupancy: [BUSINESS CONFIG → max guests]
Owner / host details:
  Name:           [BUSINESS CONFIG → operator name]
  ABN:            [BUSINESS CONFIG → trading-as ABN]
  Contact:        [phone + email]
Property manager (if applicable): [name + licence #]

Insurance — public liability ≥ $20M required:
  Insurer:        [from BUSINESS CONFIG → insurance — STR liability]
  Policy #:       [#]
  Expiry:         [date]

Premises Standard compliance (declarations):
  ☐ Smoke alarm in each bedroom + hallway, interconnected, tested
  ☐ Evacuation diagram displayed
  ☐ Emergency contact info displayed
  ☐ Pool fencing compliant (if pool)
  ☐ Gas + electrical safety current
  ☐ No fire-safety order outstanding

Registration fee: $65 (initial) — confirm current rate on portal

Annual renewal: yes — calendar 60 days out
```

### Edinburgh STL — City of Edinburgh Council

```
EDINBURGH STL LICENCE — DRAFT
==============================
Submit via: City of Edinburgh Council STL licence portal

Property address: [BUSINESS CONFIG → property address]
STL type:         [Home letting / Home sharing / Secondary letting /
                   Home sharing AND home letting]
Bedrooms:         [bedrooms]
Maximum guests:   [max guests]

NB: If "secondary letting" in Edinburgh STL Control Area =
    PLANNING PERMISSION required FIRST. Apply via separate portal
    (City of Edinburgh planning) — processing 8-12 weeks.

Applicant:
  Name:           [operator name]
  Address:        [home address]
  Contact:        [phone, email]

Property safety declarations:
  ☐ Gas Safety certificate (annual, by Gas Safe registered engineer)
  ☐ EICR (Electrical Installation Condition Report, every 5 yrs)
  ☐ PAT testing on portable appliances (annual)
  ☐ Interlinked smoke alarms compliant with Scottish standard
       (mandatory all dwellings, Feb 2022)
  ☐ Carbon monoxide detector where solid fuel / gas
  ☐ Fire risk assessment current
  ☐ Public liability insurance ≥ £2M (typical — confirm council
       minimum)
  ☐ EPC (Energy Performance Certificate)
  ☐ Floor plan + Legionella risk assessment

Insurance:
  Insurer:        [BUSINESS CONFIG]
  Cover:          £[X]M
  Policy #:       [#]
  Expiry:         [date]

Fee: £[400-700+ depending on band] — confirm current on portal

Licence term: 3 years (renewable). Calendar 90 days out.
```

### NYC LL18 — Office of Special Enforcement

```
NYC LOCAL LAW 18 REGISTRATION — DRAFT
======================================
Submit via: NYC OSE Short-Term Rental Registration portal

Premises address: [property address]
Permanent host:   [BUSINESS CONFIG → operator name] — MUST be a
                   permanent occupant of the dwelling
Host's primary residence: ☐ confirmed yes
Building type:    [1-2 family / Condo / Co-op / Multi-family
                   permanent residence]
Class A dwelling: [confirmed]

Building approval:
  ☐ Not on "prohibited buildings" list (check OSE list)
  ☐ Building has 5+ dwelling units → CO permits transient use
       (rare)
  ☐ Condo association / co-op board allows (attach approval)

Occupancy rules during STR:
  ☐ Host present during entire stay (for stays <30 nights)
  ☐ Max 2 paying guests for stays <30 nights
  ☐ Internal doors not locked (guests have free access to whole
       unit)

Fee: $145 (initial)

Renewal: per OSE — calendar 60 days out
```

### BC Bill 35 — provincial registry + municipal licence

```
BC PROVINCIAL STR REGISTRY (Bill 35) — DRAFT
=============================================
Submit via: Government of BC Short-Term Rental Registry

Operator name:    [operator name]
BC business #:    [BUSINESS CONFIG → trading-as BN]
Property address: [property address]
Principal residence of operator: ☐ confirmed yes (required in
                                  municipalities >10k pop unless
                                  exempt)
Exemption claimed: [none / resort zone / Indigenous land / accessory
                    dwelling / etc.]
Municipal business licence #: [from municipal application — also
                              required]

Provincial registry # (issued after approval): [pending]

Effective from: 1 May 2025 — display registry # in all listings on
every channel; channels must validate against registry. Listings
without a registry # WILL be delisted by Airbnb / VRBO under
data-sharing arrangement.

Renewal: annual (provincial + municipal) — calendar both 60 days out
```

### Toronto STR by-law

```
TORONTO STR REGISTRATION — DRAFT
=================================
Submit via: City of Toronto STR Registration

Operator:         [name]
Principal residence: [address — must be operator's principal
                       residence]
Property type:    [Detached / Semi / Townhouse / Apartment / Condo]
Bedrooms offered: [N]
Maximum guests:   [max guests]

Whole-home night cap: 180/year (tracked against principal residence
status). Partial-home letting (with host present) = unlimited
nights but capped to 3 rooms.

Condo/HOA approval: [if applicable, attach]

MAT (Municipal Accommodation Tax) — 6% on stays < 28 nights
($14 per stay min) — collected + remitted by host OR by channel
where supported

Fee: $50 annual

Calendar 60 days out for renewal.
```

### Montreal / Quebec CITQ

```
QUEBEC CITQ REGISTRATION — DRAFT
=================================
Submit via: CITQ (Corporation de l'industrie touristique du Québec)
            portal

Property address: [address]
Classification:   [Principal residence / Secondary residence —
                   note: secondary residence STR is BANNED in many
                   Montreal zones since 2023]
Zoning:           [confirm with arrondissement — Plateau, Ville-
                   Marie, Mile End have severe restrictions]
Operator:         [name + Quebec enterprise # if applicable]
Insurance — civil liability ≥ CAD $2M: [insurer + policy #]
Safety:
  ☐ Smoke detector each level + each bedroom
  ☐ CO detector where applicable
  ☐ Fire extinguisher
  ☐ Evacuation plan posted

Tax registration:
  ☐ Quebec lodging tax (TSH) 3.5% — registered + remitting
       (or auto-collected by channel)

Fee: $295 initial — confirm current rate

Renewal: annual. Calendar 60 days out.
```

### Other regions — abbreviated draft templates

For Honolulu Bill 41, Austin Type 1-2-3, Nashville Type 1-2,
Vancouver business licence, London (no formal STR registration —
self-enforced 90-day cap), the agent renders the equivalent
draft. Operator reviews + submits.

## Tax registration + collection

Lodging tax is the second compliance layer. Two questions per
property per channel:

1. **Who collects + remits the lodging tax?** Channel auto-remit
   varies wildly.
2. **Who collects + remits the income tax / GST / VAT?** Always
   the host above the threshold.

### Channel auto-collection of lodging tax — common defaults

| Region | Airbnb auto | VRBO auto | Booking.com |
|---|---|---|---|
| US most jurisdictions | Yes (state sales + city TOT / occupancy where Airbnb has agreement) | Patchier | Varies |
| AU GST 10% | No (host must register + remit if turnover >$75k) | No | No |
| NZ GST 15% | Marketplace rules — Airbnb collects from guest from April 2024 for hosts under threshold | Similar | Similar |
| UK VAT 20% | No (host responsibility above £90k) | No | No |
| CA GST/HST/PST | Marketplace facilitator rules vary by province | Varies | Varies |
| EU VAT | Marketplace facilitator rules | Marketplace facilitator | Marketplace facilitator |

**The agent verifies which channel auto-collects which tax for each
property's region — listed in BUSINESS CONFIG → "Lodging tax auto-
collected by".**

If a property is in NSW + Airbnb but BUSINESS CONFIG says "Lodging
tax auto-collected by Airbnb: yes" — the agent flags: NSW has no
state lodging tax (income + GST are host-side); confirm what's
being auto-collected (likely nothing on tax — only the new VIC 7.5%
levy from Jan 2025 is platform-collected within Australia).

### Host-side tax thresholds

- **AU GST 10%** — register when turnover > $75,000 / 12 months
- **NZ GST 15%** — register when turnover > $60,000 / 12 months
- **UK VAT 20%** — register when turnover > £90,000 / 12 months
- **UK income tax** — Self Assessment, Furnished Holiday Lettings
  **regime ABOLISHED from April 2025** (was favourable — losses
  offsettable, capital allowances available). Post-April 2025,
  STR income is treated as standard property income.
- **US** — federal income tax + state income tax + state/city
  occupancy tax (variable). 1099-K from channels if >$600
- **CA GST 5% / HST 13-15% / PST 7%** depending on province +
  income tax

Surface income-tax-relevant prompts in the weekly report (Friday)
and especially around region-specific year ends.

## Insurance — Aircover is not enough

Most operators discover this too late.

| Coverage type | Channel offering | STR-specific options |
|---|---|---|
| Host damage protection (guest breaks something) | **Airbnb Aircover** ($3M USD/equivalent) — SUPPLEMENTARY, claims process is host-friendly but capped + slow | All STR insurers include this |
| Host liability (guest sues for injury) | **Airbnb Aircover liability** ($1M USD) / **VRBO Liability Insurance** ($1M USD) — supplementary | Required by most regulators at higher amounts (NSW $20M, Edinburgh £2M, BC varies) |
| Building damage from STR (fire, water) | None from channel | STR-specific insurance |
| Loss of rental income (property uninhabitable) | None from channel | STR-specific insurance |
| Guest theft / fraud | Partial — Aircover is theft-of-host-property only | STR-specific |

**STR-specific insurance recommended per region:**

- **AU:** Sharemaster, ShareCover, Hostplus
- **NZ:** Local broker — Initio, NZBrokers, regional
- **UK:** Pikl, CoverButler, Hiscox STR (specifically Hiscox 365)
- **US:** Proper Insurance, Slice, CBIZ
- **CA:** Square One, Aviva, BFL Canada (provincial variability —
  BC + ON major options)

**Standard residential / landlord insurance does NOT cover STR.**
Many policies have an explicit STR exclusion. If a claim is made
on a standard policy with STR use, the policy is voidable.

The agent flags in the weekly report if BUSINESS CONFIG →
"insurance — STR liability" is set to "Aircover only" — this is
a gap.

### Insurance renewal tracking

For each property, the agent tracks:
- Building insurance expiry
- STR liability insurance expiry
- Contents insurance expiry
- Public liability amount (verify meets regulatory minimum for
  region — NSW $20M, Edinburgh £2M typical, BC varies)

Surface in weekly report 60 days before expiry.

## Safety requirements per property

These are the mandatory minimums — most regulators require these
to issue / renew registration.

```
SAFETY CHECKLIST — [property name]
====================================
☐ Smoke alarm — one in each bedroom + hallway, interconnected where
    required by jurisdiction (e.g. Scotland mandatory all
    dwellings since Feb 2022; AU each state varies; UK varies)
☐ CO detector — where gas appliance or solid fuel; AU varies; UK
    required where solid fuel; NZ + US recommended
☐ Fire extinguisher + fire blanket — kitchen area; size + class
    per jurisdiction
☐ First aid kit — accessible, stocked (basics + region-specific
    items e.g. sting cream coastal AU, lyme tweezers UK)
☐ Emergency contact card — visible (fridge or welcome pack);
    includes host mobile + local emergency # (000 / 999 / 911 /
    112)
☐ Evacuation diagram — posted (mandatory NSW STRA, Edinburgh STL,
    several US jurisdictions)
☐ Pool fence — if pool, compliant to local standard (AU AS 1926;
    UK guidance; US ASTM F1346)
☐ Gas safety inspection — annual where gas (Gas Safe UK; AU varies;
    NZ Plumbers, Gasfitters and Drainlayers Board)
☐ Electrical safety check — EICR every 5 years UK; periodic AU/NZ
☐ PAT testing — annual on portable appliances (UK mandatory STR;
    elsewhere recommended)
☐ Window locks / restrictors — where childproofing required
☐ Hot water temperature ≤50°C delivered to taps (scald prevention)
☐ Pool chemistry log — if pool, weekly or per use
☐ Cleaning chemicals locked or out of guest reach
```

The agent does NOT certify these. It tracks dates, surfaces
deadlines, and refuses to support new bookings if a regulator-
mandated certificate (gas safety in UK STL, smoke alarm cert NSW
where required) is expired.

## Body corporate / HOA / strata — the silent killer

By-laws frequently prohibit STR. Common scenarios:

- **AU strata:** by-law against short-term lets; NSW has the
  "two strikes" model where strata can vote in such a by-law
- **UK leasehold:** lease forbids transient occupation
- **US condo:** HOA bylaws ban STR or limit min nights
- **CA strata:** common in Vancouver / Toronto condos

BUSINESS CONFIG → "Strata / HOA / body corp" must indicate:
"name + by-laws permit STR? yes/no/limited"

If "no" — the agent flags. If "limited" — the agent reads the
property's note (e.g. "min 30 nights only", "max 4 nights/month")
and gates bookings against the limit.

## The hard refuse

Mirroring the plumber's gas-ticket rule:

```
IF region in BUSINESS CONFIG requires STR registration
  AND registration # is blank OR expired
  AND no exemption claimed
THEN
  → REFUSE new booking confirmations
  → SURFACE in weekly report (urgent)
  → DO NOT cancel existing confirmed bookings (worse for guest +
    channel score) — let them run, but block new
  → DRAFT renewal/application paperwork for operator
  → DO NOT silently approve "just this one" — the entire premise
    of the agent is that compliance is non-negotiable
```

The agent surfaces explicitly:

```
COMPLIANCE BLOCK — [property name]
===================================
Region: [region]
Required: [registration regime]
Status: [blank / expired (date)]
Bookings blocked: NEW confirmations only.
Existing confirmed bookings: WILL run.
Action: [draft prepared / link to portal].

This block lifts when registration # + expiry are entered in
BUSINESS CONFIG.
```

## What the agent does NOT do

- Does NOT generate official certificates (smoke alarm cert, gas
  safety cert, EICR, pool fence compliance cert, EPC) — these
  come from qualified inspectors
- Does NOT submit applications on the operator's behalf — drafts
  only; operator reviews + submits
- Does NOT lodge tax returns — surfaces obligations, flags
  thresholds, prepares figures for accountant
- Does NOT advise on legal disputes (HOA challenges, council
  enforcement) — recommends the operator engage local STR-
  specialist lawyer
- Does NOT verify primary-residence claims — relies on operator's
  declaration in BUSINESS CONFIG; if operator declares "primary
  residence: yes" the agent takes that at face value (the
  regulator's verification is the operator's risk)

## Hard rules

- **Never confirm a new booking on a property requiring
  registration if BUSINESS CONFIG shows blank / expired.** Even
  for $400 a night. Even with "just this once". The economic
  downside of one fine + ban + Aircover void > the revenue.
- **Never fabricate a registration number** to satisfy a channel
  field. If the channel asks for a number (Airbnb in many regions
  now requires it visibly in the listing), the property must
  actually have one.
- **Never tell a guest "we're registered" if BUSINESS CONFIG
  shows otherwise.**
- **Always default to the strictest applicable rule** — if state
  and council disagree (US, AU), the more restrictive applies.
- **Always surface insurance "Aircover only" as a gap.** The
  agent does not have to convince the operator — but it must
  flag.
- **Always cross-check primary residence claims against the
  channel registration.** Toronto, NYC, SF, LA, BC primary
  residence rules are the most-enforced.
- **Always surface registration expiries 60 days out.** Edinburgh
  STL is 3-yearly + processing time is 12+ weeks. Don't surface
  at 30 days — too late for a 12-week renewal.
- **Always store regulatory deadlines in `learnings.md`** with
  property + regime + date for re-surfacing.

## Reading the learnings.md

Open `learnings.md`. If:
- Property had a previous regulatory warning → escalate urgency on
  next renewal
- Property had a complaint from neighbour / strata → flag in the
  weekly report; consider noise sensor escalation
- Property had a previous Aircover claim → flag insurance review
- Property had a tax notice from ATO / HMRC / IRS / CRA → flag
  for accountant review on the next quarter

## Workflow

1. Operator says "compliance check for [property]" / "set up [new
   property] in [region]" / weekly report surfaces deadline
2. Agent reads BUSINESS CONFIG → region + sub-region + registration
   field + expiry + insurance + safety status
3. Agent maps region → required regime
4. Agent runs status check: current / expired / blank / not
   required
5. If current → no action, log next surface date (60 days before
   expiry)
6. If expired / blank → render hard-refuse block + draft renewal
   paperwork + surface to operator
7. If safety / insurance gap → render gap analysis + surface
8. Insurance + safety expiries calendared
9. Tax thresholds tracked against rolling 12-month revenue

## Confirm + handoff

> *"Compliance status for [property]: [registration] is [status,
> expiry]. Insurance: [status]. Safety: [status]. [Next action] —
> [drafted paperwork attached / no action]. Loading
> `04-dispatch.md` to resume normal operations / staying here
> until you resolve the block."*

Hand off to:
- `04-dispatch.md` if status clears
- `12-weekly-report.md` to surface registry expiry deadlines
- `06-invoice-payment.md` for tax line items on direct bookings

## Done condition

- Per-property registration status tracked + verified
- Expiries calendared 60 days out
- Insurance gaps flagged
- Safety checklist current
- Hard-refuse gate active on any property with blank / expired
  required registration
- Renewal paperwork drafted for any expiring registration
