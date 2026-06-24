# Business config

Fill this in once. Every later skill reads from it. Re-edit anytime
your rates, suppliers, or coverage change.

```
BUSINESS CONFIG
===============
Business name:       <e.g. Smith Plumbing, Pty Ltd>
Trading as:          <e.g. Smith Plumbing & Gas>
Owner / lead plumber: <your name>

Region:              <Australia | New Zealand | United Kingdom | United States | Canada>
State / Province:    <VIC | NSW | QLD | WA | Auckland | London | California | Ontario | ...>
Timezone:            <e.g. Australia/Melbourne>

LICENSING
  Plumbing licence:  <e.g. VBA PL12345 (VIC), NSW Lic #X, PGDB cert
                      (NZ), CIPHE / APHC membership (UK), C-36 (CA US),
                      provincial plumbing licence (CA)>
  Gas ticket:        <Type A AU/NZ, Gas Safe Register # UK, TSSA G1/G2/G3
                      Ontario, etc. — or "Not gas-ticketed: sub-out">
  Drainage:          <e.g. Drainlayer registration NZ, drainlayer endorsement
                      AU state, or "Not endorsed: sub-out">
  Insurance:         <public liability + workers' comp>
  Insurance amount:  <e.g. AUD $20M public liability>
  ABN / VAT no.:     <ABN 12 345 678 901 (AU), VAT GB123456789 (UK), EIN (US)>

SERVICE AREA
  Primary suburb / postcodes: <e.g. 3000-3199 (Melbourne CBD + east)>
  Will travel up to:          <e.g. 30km from base — extra travel fee beyond>
  Base address:               <where you start the day from>

RATES (in your local currency)
  Standard callout fee:       <e.g. $130 — covers first 30 mins on site>
  Hourly rate (Mon–Fri):      <e.g. $110/hr after first 30 mins>
  Hourly rate (Sat):          <e.g. $165/hr>
  Hourly rate (Sun / public): <e.g. $220/hr>
  After-hours (6pm–7am):      <e.g. $280 callout + $220/hr>
  Minimum charge:             <e.g. $150>
  Apprentice / 2nd-pair rate: <e.g. $60/hr — for digs, cylinder lifts>

  Travel beyond service area: <e.g. $1.50/km, return trip>

  Markup on parts:            <e.g. 20% above trade price>
  Drain camera hourly:        <e.g. $180/hr (if you own one)>
  Jetter (high-pressure):     <e.g. $400 callout for jetter work>

JOB TYPES YOU DO (tick + add typical price for each)
  [ ] Leaking taps / mixer cartridge swap — callout-rate jobs
  [ ] Blocked toilets / heads — typical price $X
  [ ] Blocked drains — typical price $X (jetter / snake / camera)
  [ ] Burst pipes (emergency) — callout + repair
  [ ] Hot water service (no replacement, just repair) — callout rate
  [ ] Hot water replacement — gas, typical price $X
  [ ] Hot water replacement — electric, typical price $X
  [ ] Hot water replacement — heat pump, typical price $X
  [ ] Hot water replacement — solar (if endorsed)
  [ ] Tapware install / swap — typical price per tap
  [ ] Toilet suite install / replace — typical price $X
  [ ] Vanity / basin install — typical price $X
  [ ] Dishwasher / washing machine connection — typical price $X
  [ ] Gas fitting (if ticketed) — typical price for cooktop, HWS, fire
  [ ] Gas leak diagnosis — typical price $X
  [ ] Drainage repair / pipe relining — typical price $X
  [ ] Sewer line excavation — typical price $X (or quote-only)
  [ ] Backflow prevention install / test — typical price $X
  [ ] Bathroom renovation rough-in + fit-off — typical price $X
  [ ] Kitchen rough-in + fit-off — typical price $X
  [ ] New build pre-plumb — $/hr or fixed
  [ ] Rainwater tank / pump install — typical price $X
  [ ] Roof / gutter / downpipe — if you do it
  [ ] CCTV drain inspection — typical price $X
  [ ] Emergency 24/7

JOB TYPES YOU DON'T DO (be explicit so the agent declines politely)
  - <e.g. high-rise stack pressurisation, sewage treatment plants>
  - <e.g. solar hot water (you sub it out to specialists)>
  - <e.g. gas work (no Type A ticket — refer to partner gas fitter)>
  - <e.g. anything below a sub-floor crawl (back issues)>

OFF-HOURS
  Available 24/7?      <yes | no>
  After-hours hours:   <e.g. 6pm–7am weekdays, all weekend = surcharge>
  Off-week / on-call:  <e.g. one week on, one off, with [partner business]>
  Emergency response target: <e.g. on site within 90 mins of confirm>

SUPPLIERS
  Primary wholesaler:   <e.g. Reece (AU/NZ), Tradelink (AU), Wolseley (UK),
                         Ferguson (US), Plumbing World (NZ), Plumbmaster,
                         Independent Plumbing Supplies>
  Account number:       <so the agent can format parts orders>
  Other wholesalers:    <list any other accounts>
  Lead time on parts:   <typical for non-stocked items, e.g. solar HWS 5 days>
  Hot water cylinders preferred brand: <e.g. Rheem, Rinnai, Bosch, Vaillant,
                                         A.O. Smith, Bradford White>
  Tapware preferred brand: <e.g. Methven, Caroma, Grohe, Hansgrohe, Delta>

PAYMENT
  Accepted methods:     <Stripe / Square / EFT / cash / card on site>
  Stripe account:       <linked, last 4 of business bank acct>
  Bank for EFT:         <BSB + acct or SWIFT>
  Invoice terms:        <e.g. Net 7 / Net 14 / Due on completion>
  Deposit on project:   <e.g. 30% on acceptance for jobs over $1500>
  Late fee:             <e.g. 2% per month / disabled>

CUSTOMER COMMUNICATION
  Preferred SMS sender: <your business mobile or Twilio number>
  Email sender:         <jobs@yourplumbing.com.au>
  Reply within:         <target — e.g. 30 mins business hours>

CALENDAR
  Scheduling tool:      <Google Calendar / simPRO / ServiceM8 / AroFlo /
                         Tradify / manual>
  Working hours:        <e.g. Mon–Fri 7am–4pm>
  Day off:              <e.g. Sunday>
  Lunch:                <e.g. 12:30–1:00, only emergencies during>

REVIEW PLATFORMS
  Google Business Profile URL: <link>
  Other:                       <Facebook page, Trustpilot, Checkatrade, etc.>

GOAL THIS QUARTER
  Revenue target:       <$/month>
  Avg job value target: <$X>
  Conversion rate goal: <X% of quotes → bookings>

BANNED PHRASES / TONE
  - <e.g. never say "guaranteed lowest price">
  - <e.g. never quote a hot water replacement without confirming gas
    vs electric vs heat pump and the existing isolation valve>
  - <e.g. always include "Subject to site inspection" clause for any
    drainage work where the line condition isn't known>
  - <e.g. never quote gas work — sub it out>

REGIONAL TERMS (auto-filled by the agent based on Region above)
  Compliance cert name: <Compliance Certificate / CoC / WRAS approval +
                          Building Notice / Permit + Inspection / Provincial CofA>
  Gas cert name:        <Gas Type A Plate + cert / Gas CoC / Gas Safe
                          notice / NFGC permit notice / TSSA cert>
  Tax label:            <GST / VAT / Sales Tax>
  Tax rate:             <10% / 15% / 20% / state-by-state / 5%+PST>
  Standards reference:  <AS/NZS 3500 + AS/NZS 5601 / BS EN 806 + Water
                          Regs / UPC or IPC / NPC + CSA B125>
```

## Fill rules

- **Be honest about rates.** A made-up "I'll match my competitor's
  price" rate gets the agent quoting unsustainable jobs.
- **List jobs you DON'T do.** The agent will politely decline so
  you don't waste a callout on something you'd sub out anyway.
- **Gas ticket is non-negotiable.** If you don't hold a current gas
  ticket, leave that field blank and add "Gas fitting" to the "Don't
  do" list. The agent will sub it out cleanly.
- **Update after each rate change.** The learnings file flags when
  your win-rate dips below target — that's the cue to reread the
  rates.
- **Banned phrases matter.** This is what stops your agent sounding
  like every other tradie site.

## When the business evolves

Tell the agent: *"Update business config — change <field> to <new
value>."* The agent re-reads the file and all later outputs respect
the change. Common updates: gas ticket renewed (annual in most
regions), insurance bumped, new wholesaler account, hot water
brand swap (manufacturer price hikes change favourites).
