# Business config

Fill this in once. Every later skill reads from it. Re-edit anytime
your rates, suppliers, or coverage change.

```
BUSINESS CONFIG
===============
Business name:       <e.g. Smith Electrical, Pty Ltd>
Trading as:          <e.g. Smith Electrical>
Owner / lead sparky: <your name>

Region:              <Australia | New Zealand | United Kingdom | United States | Canada>
State / Province:    <VIC | NSW | QLD | WA | Auckland | London | California | Ontario | ...>
Timezone:            <e.g. Australia/Melbourne>

LICENSING
  License number:    <e.g. EC12345 (AU), NICEIC #X (UK), C-10 (CA US)>
  Insurance:         <public liability + workcover/workers' comp>
  Insurance amount:  <e.g. AUD $20M public liability>
  ABN / VAT no.:     <ABN 12 345 678 901 (AU), VAT GB123456789 (UK), EIN (US)>

SERVICE AREA
  Primary suburb / postcodes: <e.g. 3000-3199 (Melbourne CBD + east)>
  Will travel up to:          <e.g. 30km from base — extra travel fee beyond>
  Base address:               <where you start the day from>

RATES (in your local currency)
  Standard callout fee:       <e.g. $99 — covers first 30 mins on site>
  Hourly rate (Mon–Fri):      <e.g. $125/hr after first 30 mins>
  Hourly rate (Sat):          <e.g. $185/hr>
  Hourly rate (Sun / public): <e.g. $250/hr>
  After-hours (6pm–7am):      <e.g. $300 callout + $250/hr>
  Minimum charge:             <e.g. $150>
  Apprentice rate:            <e.g. $65/hr — for jobs that use 2 hands>

  Travel beyond service area: <e.g. $1.50/km, return trip>

  Markup on parts:            <e.g. 20% above trade price>

JOB TYPES YOU DO (tick + add rates for each)
  [ ] Domestic switchboard upgrades — typical price $X
  [ ] Domestic rewires — typical price $X
  [ ] Powerpoints / lights / fans — callout-rate jobs
  [ ] Fault-finding — callout rate
  [ ] Hot water installs — typical price $X
  [ ] Air-con installs — typical price $X
  [ ] Solar PV installs — typical price per kW
  [ ] EV charger installs — typical price $X
  [ ] Commercial maintenance — hourly + parts
  [ ] New build pre-wire — $/hr or fixed
  [ ] Data / Cat6 — typical price $X
  [ ] Pool / spa wiring — typical price $X
  [ ] Emergency 24/7

JOB TYPES YOU DON'T DO (be explicit so the agent declines politely)
  - <e.g. high-voltage transmission, lift wiring, anything over 1kV>
  - <e.g. solar storage / battery installs (you sub it out)>

OFF-HOURS
  Available 24/7?      <yes | no>
  After-hours hours:   <e.g. 6pm–7am weekdays, all weekend = surcharge>
  Off-week / on-call:  <e.g. one week on, one off, with [partner business]>

SUPPLIERS
  Primary wholesaler:   <e.g. Rexel, CEF, City Electric Supply,
                         Sparky Direct, MM Electrical, Middendorp>
  Account number:       <so the agent can format parts orders>
  Other wholesalers:    <list any other accounts>
  Lead time on parts:   <typical for non-stocked items>

PAYMENT
  Accepted methods:     <Stripe / Square / EFT / cash / card on site>
  Stripe account:       <linked, last 4 of business bank acct>
  Bank for EFT:         <BSB + acct or SWIFT>
  Invoice terms:        <e.g. Net 7 / Net 14 / Due on completion>
  Late fee:             <e.g. 2% per month / disabled>

CUSTOMER COMMUNICATION
  Preferred SMS sender: <your business mobile or Twilio number>
  Email sender:         <jobs@yoursparky.com.au>
  Reply within:         <target — e.g. 30 mins business hours>

CALENDAR
  Scheduling tool:      <Google Calendar / ServiceM8 / Tradify / manual>
  Working hours:        <e.g. Mon–Fri 7am–4pm>
  Day off:              <e.g. Sunday>
  Lunch:                <e.g. 12:30–1:00, only emergencies during>

REVIEW PLATFORMS
  Google Business Profile URL: <link>
  Other:                       <Facebook page, Trustpilot, etc.>

GOAL THIS QUARTER
  Revenue target:       <$/month>
  Avg job value target: <$X>
  Conversion rate goal: <X% of quotes → bookings>

BANNED PHRASES / TONE
  - <e.g. never say "guaranteed lowest price">
  - <e.g. never quote without seeing the job for switchboard upgrades>
  - <e.g. always include "Subject to site inspection" clause for big jobs>

REGIONAL TERMS (auto-filled by the agent based on Region above)
  Compliance cert name: <COC / ESC / EICR / Permit + Inspection / ESA>
  Tax label:            <GST / VAT / Sales Tax>
  Tax rate:             <10% / 15% / 20% / state-by-state / 5%+PST>
  Standards reference:  <AS/NZS 3000 / BS 7671 / NEC / CEC>
```

## Fill rules

- **Be honest about rates.** A made-up "I'll match my competitor's
  price" rate gets the agent quoting unsustainable jobs.
- **List jobs you DON'T do.** The agent will politely decline so
  you don't waste a callout on something you'd sub out anyway.
- **Update after each rate change.** The learnings file flags when
  your win-rate dips below target — that's the cue to reread the
  rates.
- **Banned phrases matter.** This is what stops your agent sounding
  like every other tradie site.

## When the business evolves

Tell the agent: *"Update business config — change <field> to <new
value>."* The agent re-reads the file and all later outputs respect
the change.
