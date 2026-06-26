# Firm config

Fill this in once. Every later skill reads from it. Re-edit anytime
your rates, software, services, or registrations change.

```
FIRM CONFIG
===============
Firm name:           <e.g. Sharp Books Pty Ltd>
Trading as:          <e.g. Sharp Books & Co>
Principal:           <your name + qualification, e.g. Jane Smith FICB, BAS Agent>

Region:              <Australia | New Zealand | United Kingdom | United States | Canada>
States / provinces serviced: <e.g. NSW + VIC + QLD; or "England & Wales"; or "TX + OK">
Timezone:            <e.g. Australia/Sydney>

REGISTRATIONS + LODGEMENT AUTHORITY
  Lodgement scope:   <choose ONE — affects what the agent will refuse to lodge>
                     - "Full" — can lodge BAS/VAT + income tax for clients
                     - "BAS only" (AU) — TPB BAS Agent, can lodge BAS / IAS / payroll
                                          but NOT income tax returns
                     - "Compliance prep only" — preps lodgements, hands off to
                                                 registered tax agent / CPA / EA
                     - "Unregistered" — bookkeeping only, no lodgement at all
                                         (must refer clients out for any filing)

  AU — TPB BAS Agent #:    <8-digit number, or "Not registered">
  AU — TPB Tax Agent #:    <if also Tax Agent, or "Not registered">
  AU — ABN:                <11 digits>
  AU — Professional body:  <ICB Australia / IPA / CA ANZ / CPA Australia / other>

  NZ — IRD tax agent listed: <Y/N>
  NZ — NZBN:               <13 digits>
  NZ — Professional body:  <ICB NZ / NZICA / CAANZ>

  UK — HMRC agent code:    <ASA agent reference, or "Not enrolled">
  UK — MTD VAT agent:      <Y/N — enrolled in MTD for VAT>
  UK — MTD ITSA agent:     <Y/N — enrolled when client list is mandatorily ITSA>
  UK — AML supervision by: <HMRC / AAT / ICB / IAB / ACCA / ICAEW — MANDATORY for
                             bookkeeping for fee>
  UK — Company number:     <Companies House>
  UK — VAT number:         <GBxxxxxxxxx>

  US — PTIN (if preparing returns): <or "N/A">
  US — EIN:                <federal employer id>
  US — State licences (if any): <bookkeeping is unregulated federally; check state>
  US — Professional body:  <NACPB / AIPB / AICPA / state CPA society>

  CA — RAC (Representative Authorization) on file with CRA: <Y/N>
  CA — BN:                 <Business Number 9 digits>
  CA — Province registered:<ON / BC / etc.>
  CA — Professional body:  <CPB Canada / CGA / CPA Canada>

  Insurance:               <Professional Indemnity — required for ICB/AAT/etc.>
  Insurance amount:        <e.g. AUD $2M PI + $20M public liability>

SERVICE TIERS (price per month, in your local currency, fixed-fee)

  TIER 1 — Compliance only
    Monthly fee:           <e.g. $0; this is BAS-only billed quarterly>
    Quarterly BAS fee:     <e.g. $450 per BAS>
    Annual EOY fee:        <e.g. $1,200>
    Scope:                 <just BAS / VAT prep + lodge, EOY accounts; no monthly
                            bookkeeping; client codes themselves>
    Best fit:              <sole-trader tradie with simple file, no employees>

  TIER 2 — Basic monthly
    Monthly fee:           <e.g. $450>
    Scope:                 <bank rec monthly, GST coding, 50 source docs/mo limit,
                            quarterly BAS, EOY pack>
    Best fit:              <small business <$500k turnover, 1-3 employees, <100
                            transactions/mo>

  TIER 3 — Full-service monthly
    Monthly fee:           <e.g. $950>
    Scope:                 <Tier 2 + payroll for up to 5 staff, AP/AR management,
                            monthly management report, ad-hoc support>
    Best fit:              <small business $500k-$2m, 3-10 staff, 100-400 txns/mo>

  TIER 4 — CFO-lite / Fractional CFO
    Monthly fee:           <e.g. $2,500+>
    Scope:                 <Tier 3 + cash forecast (Float / Futrli), management
                            accounts pack with Spotlight Reporting, monthly
                            advisory meeting, scenario modelling, KPI dashboard>
    Best fit:              <growing business $2m-$10m, needs financial direction
                            but can't afford full-time CFO>

  ADD-ONS (per-engagement extras)
    Payroll per employee:  <e.g. $30/mo per active employee — capped at 5 in Tier 3>
    Extra source-doc bucket: <e.g. $80 per 50 extra receipts over Tier 2 limit>
    Stock / inventory module: <e.g. $150/mo extra if Unleashed / Cin7 reconciliation>
    A2X / e-commerce sync: <e.g. $200/mo extra for Shopify / Amazon reconciliation>
    Spotlight Reporting / Fathom: <e.g. $250 quarterly pack>
    Catch-up work (separately quoted, see one-off): <hourly OR fixed-fee>

ONE-OFF RATES (when fixed-fee doesn't fit)
  Standard hourly rate:    <e.g. $120/hr — for catch-up, audit support, ad-hoc>
  Bookkeeper hourly:       <e.g. $75/hr — for staff-delivered work>
  Senior bookkeeper:       <e.g. $110/hr>
  Principal / advisory:    <e.g. $180/hr — for fractional CFO + advisory>
  Minimum charge:          <e.g. $200 — for ad-hoc one-off jobs>

CAPACITY + ALLOCATION (be honest)
  Number of partners / senior bookkeepers: <e.g. 1 (just me)>
  Hours per week billable target: <e.g. 32 for solo; 35-38 if no admin help>
  Current client count:    <e.g. 18>
  Current MRR:             <e.g. $14,500/mo>
  Max clients before pain: <e.g. 25 for solo; 50 for solo + part-time bookkeeper>
  Available capacity this month: <e.g. 12 hours>

WORKING HOURS
  Working hours:           <e.g. Mon-Thu 8:30am-5pm, Fri 8:30am-2pm>
  Day off:                 <e.g. Saturday + Sunday>
  Out-of-hours response:   <e.g. "ATO penalty notice within 4 hours; everything
                            else next business day">
  Holiday window:          <when you close — affects EOY scheduling>

LODGEMENT DEADLINE CALENDAR (live; agent reads this every Monday)
  AU BAS clients (list ABN + cycle):
    - <ABN, business name, quarterly / monthly, next due date>
    - ...
  UK VAT clients (list VAT # + stagger):
    - <VAT GB#, business name, Stagger 1/2/3, next due date>
    - ...
  US sales-tax clients (by state, by cycle):
    - <state, business name, monthly / quarterly, next due>
    - ...
  CA GST/HST clients (by cycle):
    - <BN, business name, monthly / quarterly / annual, next due>
    - ...
  Payroll cycles per client:
    - <weekly / fortnightly / monthly + region, next pay date>
  Year-end dates:
    - <client name, FY end month, EOY pack target date>

SOFTWARE STACK

  Core accounting (which you use, with subscription tier):
    [ ] Xero — partner discount level <Bronze/Silver/Gold/Platinum>
    [ ] Xero — partner code <for client subs>
    [ ] QuickBooks Online — ProAdvisor tier <Silver/Gold/Platinum/Elite>
    [ ] MYOB (AU) — partner #
    [ ] Sage (UK/CA) — partner #
    [ ] FreeAgent (UK) — partner
    [ ] Wave (US/CA — free)
    [ ] KashFlow (UK)
    [ ] FreshBooks
    [ ] Other:

  Receipt + bill capture:
    [ ] Hubdoc — bundled with Xero
    [ ] Dext (formerly Receipt Bank) — subscription tier
    [ ] AutoEntry — Sage-bundled
    [ ] Veryfi
    [ ] Datamolino
    [ ] Plooto (CA)

  Payroll:
    [ ] Xero Payroll
    [ ] QuickBooks Payroll
    [ ] MYOB PayGlobal
    [ ] KeyPay / Employment Hero (AU)
    [ ] Gusto (US)
    [ ] ADP
    [ ] Rippling
    [ ] PaymentEvolution (CA)
    [ ] Sage Payroll (UK)
    [ ] Other:

  Bills + AP automation:
    [ ] Xero Bills
    [ ] Bill.com (US)
    [ ] Plooto (CA)
    [ ] Approvalmax
    [ ] Spendesk

  AR + collections:
    [ ] Chaser
    [ ] Satago
    [ ] Stripe Invoicing
    [ ] Xero auto-reminders
    [ ] GoCardless (UK/EU/AU direct debit)
    [ ] Stripe Direct Debit (BECS AU)
    [ ] Ignition recurring DD
    [ ] Other:

  E-commerce / POS sync:
    [ ] A2X (Shopify / Amazon → Xero/QBO)
    [ ] Link My Books
    [ ] Synder
    [ ] Webgility
    [ ] Vend / Lightspeed connector
    [ ] Square sync

  Practice management:
    [ ] Karbon (gold standard for the firm)
    [ ] Ignition (engagement letters + recurring billing)
    [ ] Jetpack Workflow
    [ ] Senta
    [ ] FYI Docs
    [ ] IRIS Star Practice Management
    [ ] Iconic Practice
    [ ] BGL
    [ ] Manual / spreadsheet

  Document collection from client:
    [ ] Liscio
    [ ] Content Snare
    [ ] Jetpack Workflow forms
    [ ] Ignition request forms
    [ ] Email + Hubdoc folder

  Reporting + advisory:
    [ ] Spotlight Reporting (AU strong)
    [ ] Fathom
    [ ] Float (cash forecast)
    [ ] Futrli
    [ ] LivePlan
    [ ] Joiin (consolidation)

  Audit / workpapers:
    [ ] Caseware
    [ ] Workpapers (Xero / QBO native)
    [ ] Datapine
    [ ] Manual workpaper folders

CLIENT TIERING (A / B / C — agent reads this to allocate attention)
  A clients (top 20% by margin, easy comms, on-time docs):
    - <client 1>
    - ...
  B clients (steady, paying on time, occasional doc chases):
    - <client>
    - ...
  C clients (late docs, slow pay, scope creep — review at next
   annual review whether to keep, re-tier, or disengage):
    - <client>
    - ...

PAYMENT
  Recurring direct debit via: <GoCardless / Stripe / Ignition>
  Card payment via:           <Stripe / Square>
  EFT for one-off:            <bank details>
  Invoice terms:              <Net 14 / Net 7 / Due on receipt>
  Recurring fee debit cycle:  <e.g. 1st of month, in advance>
  Late fee:                   <e.g. 2% per month / disabled>
  Disengagement trigger:      <e.g. 60 days unpaid + 1 ignored chase = stop work
                               + send disengagement letter>

CUSTOMER COMMUNICATION
  Preferred client channel: <email primary; SMS for nudges only>
  Email sender:            <hello@yoursfirm.com.au>
  Reply within:            <target — e.g. 1 business day on routine; 4 hours on
                             ATO/HMRC letters; same-day on payroll emergencies>
  Tone:                    <formal / friendly / "tradie-friendly" / "professional
                             services">

WORKFLOW

  Monthly close target:    <e.g. day 15 of following month for all monthly clients>
  Source-doc chase day:    <e.g. Mondays, escalation Thursdays>
  Partner review day:      <e.g. Thursdays for week's close work>
  BAS prep window:         <e.g. days 22-28 of last month of quarter>

REVIEW PLATFORMS
  Google Business Profile URL: <link>
  Other:                       <LinkedIn, Karbon directory, ICB directory>

REFERRAL PARTNERS (track these — highest-conversion source for bookkeepers)
  Accountants who refer in:
    - <name, firm, fee-share arrangement if any>
  Financial planners:
    - <name, firm>
  Business coaches:
    - <name, firm>
  Other partners:
    - <name, firm>

GOAL THIS QUARTER
  MRR target:             <$/mo>
  New clients target:     <count>
  Average package value:  <$/mo>
  Average $/hr realised:  <target>
  Annual reviews booked:  <count>

BANNED PHRASES / TONE
  - <e.g. never say "trusted advisor" — it's empty>
  - <e.g. never say "value-add" or "circle back" or "synergy">
  - <e.g. never write "ASAP" — be specific about deadlines>
  - <e.g. never say "It's just a small fee" — own the price>
  - <e.g. never use red text in client comms — looks aggressive>
  - <e.g. never lodge a BAS without partner sign-off, even if running late>
  - <e.g. never give tax advice in writing if not a registered Tax Agent — refer
    to client's accountant>

REGIONAL TERMS (auto-filled by the agent based on Region above)
  Lodgement name:           <BAS / VAT return / Sales Tax filing / GST return>
  Lodgement portal:         <ATO Online Services for Agents / HMRC ASA / IRS BSA
                              / CRA My Business Account>
  Tax label:                <GST / VAT / Sales Tax / HST>
  Tax rate:                 <10% / 15% / 20% / state-by-state / 5%+PST>
  Payroll framework:        <STP Phase 2 / RTI / Form 941 / T4>
  Year-end label:           <EOFY 30 June (AU) / 5 April (UK) / 31 December (US/CA/NZ)>
```

## Fill rules

- **Be honest about lodgement scope.** If you're not BAS-registered
  in AU, set Lodgement scope = "Compliance prep only" and the
  agent will refuse to lodge — preparing the pack for handover to
  a registered Tax Agent instead. This is a regulatory line, not a
  workflow preference.
- **Be honest about capacity.** Setting current capacity to "8
  hours available" when it's actually 2 leads to overbooking and
  late lodgements.
- **List all software actually in use.** The agent reads this to
  pick the right onboarding script. If you say "QBO" but really
  use "Xero", the onboarding scripts will fail clients.
- **A/B/C client tiering matters more than you think.** The agent
  uses it to allocate attention. C-tier clients with annual review
  approaching get flagged for "keep / re-tier / disengage" review.
- **Banned phrases protect the brand.** This is what stops your
  client comms sounding like every other practice. Add specifics
  — "never write 'just a quick favour'", "never start an email
  with 'I hope this finds you well'".

## When the firm evolves

Tell the agent: *"Update firm config — change <field> to <new
value>."* The agent re-reads the file and all later outputs respect
the change. Common updates:

- TPB / HMRC AML / NACPB registration renewals (annual)
- Insurance renewal (annual)
- New software added (e.g. moved from Xero Bills to Approvalmax)
- New service tier (e.g. added CFO-lite tier at $2,500/mo)
- Capacity changed (hired a part-time bookkeeper, can now take 30
  clients instead of 18)
- Banned phrase added (e.g. "stop saying 'leverage' after the
  cringey LinkedIn post")
- Lodgement scope changed (e.g. just passed TPB BAS Agent exam,
  upgrade from "Compliance prep only" to "BAS only")
