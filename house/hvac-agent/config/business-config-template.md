# Business config

Fill this in once. Every later skill reads from it. Re-edit anytime
your rates, suppliers, or coverage change.

```
BUSINESS CONFIG
===============
Business name:       <e.g. Smith Air Conditioning Pty Ltd>
Trading as:          <e.g. Smith Air & Refrigeration>
Owner / lead tech:   <your name>

Region:              <Australia | New Zealand | United Kingdom | United States | Canada>
State / Province:    <VIC | NSW | QLD | WA | Auckland | London | California | Texas | Ontario | ...>
Timezone:            <e.g. Australia/Melbourne>
Climate:             <e.g. temperate | hot-humid | hot-dry | cold | mixed — affects seasonal rhythm>

LICENSING
  Refrigerant licence (technician):
                     <AU: ARC RHL Full / Restricted / Domestic AC / Trainee + RHL #
                      NZ: industry-approved technician + #
                      UK: C&G 2079 (refrigerant) + C&G 2078 (heat pumps low-GWP) + card #
                      US: EPA 608 Type I / II / III / Universal + #
                      CA: Red Seal Refrigeration & AC Mechanic (e.g. ON 313A) + provincial # >

  Refrigerant trading auth (business):
                     <AU: ARC RTA + RTA #
                      UK: F-Gas company cert — REFCOM / Quidos / Bureau Veritas / BESA + #
                      US: state HVAC contractor licence (e.g. C-20 CA, RMP TX) + #
                      CA: provincial gas/refrigerant business cert + #
                      "Not RTA — sub-out anything over 2 kg charge" if applicable>

  Gas ticket (heating):
                     <AU/NZ: Gas Type A + #
                      UK: Gas Safe Register #
                      US: state gas endorsement / HVAC + gas combined
                      CA: TSSA G2/G3 (ON) or provincial — or "Not gas-ticketed: sub-out">

  Electrical licence (if you do controls + power work yourself):
                     <e.g. restricted electrical AU / NICEIC UK / state — or
                      "Not electrically licensed: sub-out final power connect">

  MCS / heat pump cert (UK if applicable):
                     <MCS installer #, accredited cert body — for BUS / RHI grant work>

  Insurance:         <public liability + workers' comp>
  Insurance amount:  <e.g. AUD $20M public liability>
  ABN / VAT no.:     <ABN 12 345 678 901 (AU), VAT GB123456789 (UK), EIN (US)>

SERVICE AREA
  Primary suburb / postcodes: <e.g. 3000-3199 (Melbourne CBD + east)>
  Will travel up to:          <e.g. 40km from base — extra travel fee beyond>
  Base address:               <where you start the day from>

RATES (in your local currency)
  Standard callout fee:       <e.g. $150 — covers first 30 mins on site + diagnostic>
  Hourly rate (Mon–Fri):      <e.g. $130/hr after first 30 mins>
  Hourly rate (Sat):          <e.g. $195/hr>
  Hourly rate (Sun / public): <e.g. $260/hr>
  After-hours (6pm–7am):      <e.g. $320 callout + $260/hr — bumped further in heatwave week>
  Heatwave premium:           <e.g. +25% on after-hours callout during declared heatwave days
                               (per BoM AU / Met Office UK / NWS US)>
  Minimum charge:             <e.g. $180>
  Apprentice / 2nd-pair rate: <e.g. $65/hr — for lifting outdoor units, brazing extra hands>

  Travel beyond service area: <e.g. $1.80/km, return trip>

  Markup on parts:            <e.g. 25% above trade price (HVAC norm slightly higher than plumbing)>
  Refrigerant per kg:         <e.g. R32 at $X/kg charged + recovery cost separately>
  Leak detection hourly:      <e.g. $180/hr — electronic + UV>
  Vacuum + commissioning:     <e.g. fixed $220 — micron gauge, 500 micron target>

JOB TYPES YOU DO (tick + add typical price for each)
  [ ] Diagnostic / no-cool callout — typical $X
  [ ] Diagnostic / no-heat callout — typical $X
  [ ] Capacitor / contactor replacement — typical $X
  [ ] Condenser coil clean — typical $X
  [ ] Indoor coil clean (deep) — typical $X
  [ ] Drain pan + condensate line clean — typical $X
  [ ] Filter replacement (van stock) — typical $X
  [ ] Thermostat upgrade (smart — ecobee / Nest / Tado / Sensibo) — typical $X
  [ ] Leak detection + repair — typical $X
  [ ] Refrigerant recovery + recharge — typical $X (only if RHL / 608 / F-Gas)
  [ ] Split system changeout (single head) — typical $X
  [ ] Multi-head split changeout — typical $X
  [ ] Ducted reverse-cycle install — typical $X
  [ ] Heat pump retrofit (hot water) — typical $X
  [ ] Heat pump retrofit (hydronic / Altherma / Ecodan / aroTHERM) — typical $X
  [ ] Commercial RTU change-out — typical $X (or quote-only)
  [ ] Chiller service (if you do them) — typical $X (or quote-only)
  [ ] Ductwork repair / sealing — typical $X
  [ ] Annual service (split) — typical $X
  [ ] Annual service (ducted) — typical $X
  [ ] Annual service (commercial RTU) — typical $X (per unit)
  [ ] System commissioning + handover — typical $X
  [ ] BAS / controls integration (commercial) — typical $X
  [ ] Emergency 24/7

JOB TYPES YOU DON'T DO (be explicit so the agent declines politely)
  - <e.g. industrial ammonia refrigeration (separate ticket required)>
  - <e.g. transport refrigeration / reefer trucks (different licence)>
  - <e.g. cool rooms over X kW (sub it out)>
  - <e.g. gas-fired equipment if no Type A / Gas Safe (refer to partner)>
  - <e.g. R290 propane systems (training cert separately)>
  - <e.g. solar PV electrical (sub it out to sparky)>

OFF-HOURS
  Available 24/7?      <yes | no | heatwave-only>
  After-hours hours:   <e.g. 6pm–7am weekdays, all weekend = surcharge>
  Off-week / on-call:  <e.g. one week on, one off, with [partner business]>
  Emergency response target: <e.g. on site within 90 mins of confirm
                               in heatwave week; 2hrs shoulder season>

SEASONAL CAPACITY (HVAC-specific — affects dispatch)
  Peak summer weeks:   <e.g. Dec-Feb AU / Jun-Aug UK&US — install bookings out 4-6 wks>
  Peak winter weeks:   <e.g. Jun-Aug AU / Dec-Feb UK&US — heating breakdown priority>
  Shoulder season:     <e.g. Mar-May + Sep-Nov AU — install + service plan focus>
  Heatwave protocol:   <e.g. "during BoM heatwave declaration: defer new install quotes,
                          all capacity to breakdowns, push after-hours pricing">
  Capacity cap:        <e.g. "max 4 install bookings/week + 6 breakdowns + 2 service plan
                          visits — beyond that, route to next available week">

SUPPLIERS
  Primary HVAC wholesaler: <AU: Beijer (formerly Heatcraft), Actrol, Reece HVAC, Kirby
                            NZ: Realcold, HRP, Mico HVAC
                            UK: Wolseley, CPS, Aircon Centre, BSS, Plumb Center HVAC
                            US: Johnstone Supply, Carrier Enterprise, Ferguson HVAC,
                                Lennox PartsPlus, R.E. Michel, ABCO HVACR
                            CA: Master Group, Wolseley CA, EMCO HVAC, HVAC Express>
  Account number:       <so the agent can format parts orders>
  Other wholesalers:    <list any other accounts — particularly for OEM-specific parts>
  Lead time on parts:   <typical for non-stocked items — split units 2-5 days; ducted 5-15 days;
                         commercial RTU 4-12 weeks>
  Preferred indoor split brands: <e.g. Daikin, Mitsubishi Electric, Fujitsu, Hitachi, Panasonic,
                                   LG, Samsung, Carrier, Lennox, Trane, Bryant, York, Bosch, Toshiba>
  Preferred ducted brand: <e.g. Daikin Air Intelligence, Mitsubishi Electric PEAD, Fujitsu Halcyon,
                            Carrier Performance, Lennox Merit>
  Preferred heat pump brand: <e.g. Daikin Altherma, Mitsubishi Ecodan, Bosch Compress, Vaillant
                                aroTHERM, Sanden Eco>
  Preferred commercial RTU: <e.g. Carrier, Lennox, Trane, York, Daikin Applied>
  Preferred controls: <e.g. ecobee, Nest, Honeywell T-series, Tado, Sensibo, Coolautomation,
                        Daikin BRC>
  Refrigerant cylinders kept on van: <e.g. R32 9 kg, R410A 11 kg, R134a 13.6 kg —
                                       maintain refrigerant log>

PAYMENT
  Accepted methods:     <Stripe / Square / EFT / cash / card on site>
  Stripe account:       <linked, last 4 of business bank acct>
  Bank for EFT:         <BSB + acct or SWIFT>
  Invoice terms:        <e.g. Net 7 / Net 14 / Due on completion>
  Deposit on project:   <e.g. 30% on acceptance for jobs over $2,000 — locks in equipment order>
  Late fee:             <e.g. 2% per month / disabled>

CUSTOMER COMMUNICATION
  Preferred SMS sender: <your business mobile or Twilio number>
  Email sender:         <jobs@yourhvac.com.au>
  Reply within:         <target — e.g. 15 mins in heatwave, 30 mins business hours>

CALENDAR
  Scheduling tool:      <Google Calendar / simPRO / ServiceM8 / AroFlo / Tradify / FieldEdge /
                         Housecall Pro / Jobber / ServiceTitan / manual>
  Working hours:        <e.g. Mon–Fri 7am–4pm>
  Day off:              <e.g. Sunday>
  Lunch:                <e.g. 12:30–1:00, only emergencies during>

REVIEW PLATFORMS
  Google Business Profile URL: <link>
  Other:                       <Facebook page, Houzz, Checkatrade, HomeStars, etc.>

GOAL THIS QUARTER
  Revenue target:       <$/month>
  Avg job value target: <$X>
  Conversion rate goal: <X% of quotes → bookings>
  Service plan attach: <e.g. 60% of new installs, 30% of new callouts>
  Service plan total:  <e.g. 200 active plans by EoY>

BANNED PHRASES / TONE
  - <e.g. never say "we'll just top it up" on a refrigerant-low system —
     always quote leak detection + repair>
  - <e.g. never quote a ducted install without confirming roof space,
     ceiling penetrations, and return-air sizing on site>
  - <e.g. always disclose recovery + leak test cost separately from "the install">
  - <e.g. never quote work requiring gas ticket if not held — sub it out>
  - <e.g. never recommend "cheapest" brand — recommend by load + warranty fit>

REGIONAL TERMS (auto-filled by the agent based on Region above)
  Refrigerant licence name: <ARC RHL / industry-approved tech / F-Gas C&G 2079 /
                              EPA 608 / Red Seal 313A + ODSHAR>
  Refrigerant standard: <AS/NZS 5149 / BS EN 378 / ASHRAE 15+34 + IMC/UMC / CSA B52>
  Tax label:            <GST / VAT / Sales Tax>
  Tax rate:             <10% / 15% / 20% / state-by-state / 5%+PST>
  Heat pump grant scheme: <NZ Warmer Kiwi Homes / UK BUS Boiler Upgrade Scheme / US IRA
                             tax credit + utility rebates / CA Greener Homes /
                             AU state-by-state (VIC Solar Vic / NSW EAPR)>
```

## Fill rules

- **Be honest about rates.** A made-up "I'll match my competitor's
  price" rate gets the agent quoting unsustainable jobs.
- **List jobs you DON'T do.** The agent will politely decline so
  you don't waste a callout on something you'd sub out anyway.
- **Refrigerant licence is non-negotiable.** If you don't hold a
  current licence for the system class you're working on, leave that
  field blank and add the work to the "Don't do" list. The agent
  will sub it out cleanly. Penalties for unlicensed refrigerant
  handling include large fines and criminal prosecution in every
  region in this bundle.
- **Update after each rate change.** The learnings file flags when
  your win-rate dips below target — that's the cue to reread the
  rates.
- **Service plan attach goal is the single most important number.**
  60% on installs is achievable in year 1, 70% by year 3 if the
  team is disciplined. The agent will not stop pushing the ask
  unless told.
- **Banned phrases matter.** "We'll just top it up" is THE most
  damaging phrase in HVAC. Customers parrot it back ten years later
  to your competitor. Ban it explicitly.

## When the business evolves

Tell the agent: *"Update business config — change <field> to <new
value>."* The agent re-reads the file and all later outputs respect
the change. Common updates: refrigerant licence renewed (annual in
most regions; biennial in some), insurance bumped, new wholesaler
account, refrigerant cylinders rebalanced (R32 demand spikes
pre-summer), new brand added (e.g. taking on Vaillant heat pumps
post a manufacturer accreditation course).
