# Business config

Fill this in once. Every later skill reads from it. Re-edit anytime
your properties, rates, channels, cleaners, or regulatory status
change. This is the single most important file in the bundle —
sharp config = sharp agent.

```
BUSINESS CONFIG
===============
Operator name:        <e.g. Sam Pearce>
Trading as:           <e.g. Eastside Stays, ABN/Co # ...>
Business email:       <where guest comms route to / are CC'd>
Primary timezone:     <e.g. Australia/Hobart>

REGION                (Australia | New Zealand | United Kingdom | United States | Canada)
State / Province:     <e.g. Tasmania | Auckland | Scotland | Hawaii | British Columbia>
City / Council:       <e.g. Hobart | Edinburgh | Honolulu | Vancouver | Toronto>

PROPERTIES
==========
(One block per listing. Repeat the block for each property.)

PROPERTY #1
-----------
Internal name:        <e.g. "Battery Point Cottage">
Address:              <full street address>
Property type:        <Whole apartment | Whole house | Cabin | Private room |
                       Shared room | Boutique unit>
Bedrooms / beds:      <e.g. 2 BR / 1 K + 2 S>
Bathrooms:            <e.g. 1>
Max guests:           <e.g. 4>
Pets allowed:         <yes / no — if yes, max + fee>
Smoking:              <strictly no — always>
Parties:              <strictly no — always; sensor in place: NoiseAware / Minut / none>
Primary residence:    <yes / no — critical for regulatory>

CHANNEL LISTINGS (one per active channel)
  Airbnb listing ID:  <####### — find in URL /rooms/#######>
  Airbnb URL:         <full URL>
  VRBO listing ID:    <####### >
  VRBO URL:           <full URL>
  Booking.com #:      <#######>
  Booking.com URL:    <full URL>
  Stayz # (AU):       <#######>
  Direct booking URL: <e.g. eastsidestays.com.au/battery-point>

CHANNEL FEE STRUCTURE
  Airbnb host-only fee: <typically 15% — confirm in your dashboard>
  Booking.com commission: <typically 15-18%; Genius +5%; confirm>
  VRBO model:         <pay-per-booking ~5% / annual subscription>
  Direct booking fee: <usually 0% + Stripe ~2.9% + 30c>

REGULATORY STATUS
  STR registration #: <e.g. NSW STRA #..., Edinburgh STL #..., NYC LL18 #...,
                       BC provincial registry #..., Toronto by-law #...,
                       Vancouver business licence #..., Montreal CITQ #...,
                       Honolulu BMR #..., Austin #..., Nashville #...>
  Registration expiry: <date>
  Lodging tax registration: <state/city occupancy tax #, GST/VAT #>
  Lodging tax auto-collected by: <Airbnb yes/no, VRBO yes/no, Booking yes/no>
  Strata / HOA / body corp: <name + by-laws permit STR? yes/no/limited>
  Insurance — building: <insurer + policy #>
  Insurance — STR liability: <Proper / Pikl / Sharemaster / Aircover only? policy #>
  Insurance — contents: <insurer + policy #>
  Insurance — public liability amount: <e.g. AUD $20M / GBP £5M / USD $1M>

RATES (in local currency)
  Base nightly rate:  <e.g. $185>
  Min rate (last-minute fill): <e.g. $135>
  Max rate (peak):    <e.g. $385>
  Cleaning fee:       <e.g. $95 — built into ADR or separate>
  Security deposit:   <e.g. $500 held via Airbnb / Stripe / VRBO>
  Pet fee:            <e.g. $50/stay if pets allowed>
  Extra guest fee:    <e.g. $25/night above 2>
  Length-of-stay discount:
    7+ nights:        <e.g. 10% off>
    14+ nights:       <e.g. 15% off>
    28+ nights:       <e.g. 25% off + MTR rate>
  Last-minute discount: <e.g. 10% off for stays within 7 days>
  Long-lead discount: <e.g. 5% off for stays >90 days out>

DYNAMIC PRICING
  Tool:               <PriceLabs | Beyond Pricing | Wheelhouse | AirDNA |
                       Manual (formula in this file)>
  PriceLabs (etc.) listing ID: <####### >
  Override rule:      <e.g. "agent never accepts below min rate without operator confirm">
  Seasonal multipliers:
    Peak season (months): <e.g. Dec-Feb +25%>
    Shoulder (months): <e.g. Mar, Oct +10%>
    Low (months):     <e.g. May-Aug base>
  Event surge:        <list local events that justify +30-100% e.g. Hobart
                       Dark Mofo, Edinburgh Fringe, F1 Albert Park, SXSW Austin>

CHANNEL MANAGER (the central nervous system)
  Tool:               <Hospitable | OwnerRez | Hostaway | Guesty For Hosts |
                       Guesty Pro | Lodgify | iGMS | Hostfully | None — Airbnb app only>
  Unified inbox:      <how it routes to the agent — webhook / email forward / Slack>
  Auto-message templates loaded in tool: <yes / no — if yes, agent defers to those>

TURNOVER / CLEANER NETWORK
  Cleaner tool:       <Turno (formerly TurnoverBnB) | Tidy | Properly |
                       Breezeway | ResortCleaning | Direct text>
  Primary cleaner:    <name, mobile, region they cover>
  Backup cleaner:     <name, mobile>
  Turnover time:      <e.g. 11am checkout → 3pm check-in = 4 hr turnover window>
  Cleaning checklist: <link to Properly / Breezeway checklist if used; otherwise in this file>
  Linen rotation:     <3-set rule: one on bed, one in cupboard, one at laundry>
  Linen service:      <internal cleaner / commercial service — e.g. Spotless,
                       Alsco, regional laundry>
  Mid-stay clean (>7 night stays): <included / charged separately>

SMART LOCK + CODE ROTATION
  Lock brand:         <Igloohome | RemoteLock | August | Yale | Schlage Encode |
                       Lockly | Manual lockbox + rotating combo>
  Code rotation rule: <auto-rotate per booking (Igloohome / RemoteLock) /
                       monthly rotation (manual / lockbox)>
  Backup access:      <e.g. lockbox at side gate with master code for cleaner / contractor>

NOISE / PARTY DETECTION
  Sensor:             <NoiseAware | Minut | Roomonitor | None>
  Sensor ID per property: <####### >
  Decibel threshold:  <e.g. 70 dB sustained 10 min>
  Occupancy threshold (Minut): <e.g. >max guests +2>
  Auto-response:      <text-first vs. on-call dispatch>

WIFI + UTILITIES
  Wifi network name:  <e.g. "BatteryPointCottage-Guest">
  Wifi password:      <static or rotates? if rotates, how>
  Speed expected:     <e.g. Eero mesh, 200+ Mbps>
  Streaming setup:    <Apple TV + guest mode / Roku / smart TV native apps>
  Thermostat:         <ecobee / Nest / Tado / manual — temperature range allowed>

PARKING / ACCESS
  Parking:            <e.g. 1 off-street spot in driveway / street parking — explain>
  Access route:       <front door / side gate / lift code / stair access only>
  Difficulty:         <e.g. "3 flights of stairs, no lift" / "easy ground floor">
  Luggage notes:      <e.g. "luggage drop possible from 11am via lockbox">

CHECK-IN / CHECK-OUT WINDOWS
  Standard check-in:  <e.g. from 3pm>
  Standard check-out: <e.g. by 11am>
  Early check-in:     <e.g. allowed from 1pm if turnover done, no fee>
  Late check-out:     <e.g. up to 1pm free / $35 fee for later>
  Self check-in:      <yes / no — auto code via Igloohome / RemoteLock>

HOUSE RULES (concise — go in the welcome pack)
  - <e.g. "Quiet from 10pm – 7am (NoiseAware monitoring)">
  - <e.g. "No parties or events of any kind">
  - <e.g. "No smoking anywhere on the property">
  - <e.g. "Pets only with prior approval + pet fee">
  - <e.g. "Maximum guests as booked — extra guests = $50/night + immediate
     review impact">
  - <e.g. "Towels on the rail to dry, please don't put on the wood floor">
  - <e.g. "Take rubbish out on the morning of checkout — bin Tuesday/Friday">

CANCELLATION POLICY
  Channel default:    <e.g. Airbnb Strict / Moderate / Flexible per channel>
  Direct booking:     <e.g. Full refund 14 days out / 50% 7-14 days / no refund <7>

CUSTOMER COMMUNICATION
  Inbound channel mix: <Airbnb messages + VRBO + Booking + direct SMS / email>
  Out-of-channel SMS: <yes / no — note Airbnb prohibits taking off-platform
                       until booked>
  Reply target:       <under 1 hour during awake hours; 8am-10pm; auto-acknowledge
                       outside>

OFF-HOURS
  Available 24/7?     <yes / no>
  After-hours hours:  <e.g. 10pm-7am local>
  On-call coverage:   <self / co-host / virtual assistant / partner host swap>
  Emergency response target: <e.g. "lockout via Igloohome reset within 5 min;
                              maintenance dispatched within 30 min">

CO-HOST / VA (if applicable)
  Co-host name:       <name + role + access scope>
  Co-host commission: <e.g. 15% of net booking revenue>
  Access scope:       <which messages / calendar / payouts they can see>

GOAL THIS QUARTER
  Per-property occupancy target: <e.g. 75%>
  Per-property ADR target: <e.g. $215>
  RevPAR target:      <e.g. $161>
  Review score target: <e.g. maintain 4.92 avg, Superhost retain>
  New direct bookings target: <e.g. 3/month from repeat guests>

BANNED PHRASES / TONE
  - <e.g. "never use 'cozy' in the listing — it codes 'small'">
  - <e.g. "never auto-discount in the inquiry — surface to me first">
  - <e.g. "never tell a guest a maintenance issue is 'in progress' — say
     'fixed by 6pm' with a real time">
  - <e.g. "never reply to a 5-star review with a generic 'thanks for staying'">

PROPERTY #2
-----------
(repeat the property block above for each listing)

...

REGIONAL TERMS (auto-filled by the agent based on Region above)
  STR registration name: <NSW STRA / Edinburgh STL / NYC LL18 / BC Bill 35 /
                          Toronto STR by-law / Vancouver business licence /
                          Montreal CITQ / Honolulu BMR / Austin Type 1-2-3 /
                          Nashville Type 1-2>
  Lodging tax label:  <GST + state occupancy / VAT + council tax / Hotel
                       Occupancy Tax / GET + TAT (HI) / TOT (CA)>
  Insurance norm:     <Sharemaster (AU) / Pikl (UK) / Proper (US) / Square One (CA)>
  Currency:           <AUD / NZD / GBP / USD / CAD>
  Date format:        <DD/MM/YYYY or MM/DD/YYYY>
```

## Fill rules

- **Be honest about rates.** A made-up ADR target gets the agent
  quoting unsustainable stays. Read your last 12 months in PriceLabs
  / Beyond / AirDNA Rentalizer before filling.
- **List EVERY property block.** Multi-property is where the agent
  earns its keep — per-property routing, per-property cleaner,
  per-property lock code. Don't merge properties into one block.
- **STR registration is non-negotiable.** If your region requires
  registration (NSW STRA, Edinburgh STL, NYC LL18, BC Bill 35,
  Toronto, Vancouver, Montreal, Honolulu, Austin, etc.) and the
  field is blank, the agent will flag it and refuse new bookings
  until you fill it. This is the gas-ticket equivalent.
- **Insurance fields matter.** Airbnb's Aircover is supplementary,
  NOT a replacement for STR-specific insurance (Proper / Pikl /
  Sharemaster / Square One). If you're relying on Aircover only,
  the agent will flag the gap in the weekly report.
- **Channel listing IDs make every later skill faster.** Spend the
  5 minutes finding them in your Airbnb / VRBO / Booking.com URLs.
- **Banned phrases stop your agent sounding like every other
  hosting listing.** This is what differentiates your brand voice.

## When the business evolves

Tell the agent: *"Update business config — change `<field>` to
`<new value>`."* The agent re-reads the file and all later outputs
respect the change.

Common updates:

- New property added (paste a new property block + agent walks the
  fill)
- STR registration renewed (annual in most regions — agent flagged
  in weekly report 60 days out)
- Insurance renewal
- Cleaner change (mid-tenure cleaners can be flaky — agent tracks
  on-time rate in learnings.md and surfaces if pattern emerges)
- Channel-fee changes (Airbnb periodically restructures host fees)
- Dynamic pricing tool change (PriceLabs → Beyond or vice versa)
- Lock system upgrade (manual lockbox → Igloohome)
- Region rule change (NSW STRA Code changed enforcement 2024;
  Edinburgh STL phased rollout 2022-2024; Wales registration
  scheme rolling out; BC Bill 35 implementation by 2025; FHL
  abolition April 2025)
