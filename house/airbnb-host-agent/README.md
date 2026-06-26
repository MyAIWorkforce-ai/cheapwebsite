# Airbnb Host Agent, end to end.

A complete short-term rental desk for your hosting business. Drop
this bundle into the agent you already use, brief it on your
properties, and it runs the whole operation: guest inquiries,
pre-arrival comms, dynamic pricing, turnover coordination,
mid-stay support, post-stay reviews, channel-fee tracking,
maintenance scheduling, regulatory compliance, weekly P&L per
property. From the first booking inquiry at 11pm Sunday to the
review response three days after checkout — one agent, every
step.

Built for solo Airbnb hosts, VRBO super-hosts, Booking.com Genius
hosts, and small portfolio managers running 1-50 properties. Works
across Airbnb, VRBO, Booking.com, Stayz, and direct-booking sites
(Hostfully, OwnerRez, Lodgify, Hostaway, Hospitable, Guesty,
iGMS). Universal across Australia, New Zealand, the UK, the US,
and Canada — the regional reference inside the bundle maps every
regulatory regime (NSW STRA Code, VIC STRA levy, London 90-day
rule, Edinburgh STL licence, NYC LL18, San Francisco 90-night
limit, BC Bill 35, Toronto by-law, Vancouver primary residence
rule).

## The full loop

```
booking inquiry arrives ("any chance for 5 nights end of March?")
   → triage (qualify: dates fit, channel, guest profile, party risk)
   → rate quote (dynamic price, discount logic for 7/14/28+ nights)
   → confirm + welcome (channel auto-message, house rules,
                         check-in window)
   → 7 days pre-arrival (reminder + parking + arrival window)
   → 24h pre-arrival (door code + wifi + first-night essentials)
   → check-in day (lock code rotation, "all good?" 6pm)
   → mid-stay (day-2 check-in, address any small issues)
   → check-out morning (reminder + checkout time + how to leave it)
   → 1hr after checkout (turnover dispatched to cleaner)
   → cleaner "all clear" → next guest ready to check in
   → +24h (post-stay thank you + review request)
   → +3 days (review response — yours to them + theirs to you)
   → end of week: per-property occupancy, ADR, RevPAR, review
                  score, maintenance log, channel mix report
```

Maintains a running `learnings.md` so the agent gets sharper each
week — tracks which properties earn highest RevPAR, which channels
have the worst guest mix, which weeks the dynamic pricing
under-quoted, what the average lead time is per property, and
which cleaner consistently turns over on time.

## What's in this bundle

```
airbnb-host-agent/
├── README.md                       ← this file
├── SETUP.md                        ← 15-minute setup
├── MASTER_PROMPT.md                ← orchestrator system prompt
├── LISTING_COPY.md                 ← internal: copy used for the listing
├── PUBLISH.md                      ← internal: how to publish
├── config/
│   ├── business-config-template.md ← properties, channels, channel manager,
│   │                                  cleaner network, pricing tool, regs
│   └── learnings-template.md       ← running learnings file
├── skills/
│   ├── 01-intake.md                ← guest inquiry triage (Airbnb / VRBO /
│   │                                  Booking / direct) + party-risk filter
│   ├── 02-quote-callout.md         ← nightly rate decisioning + direct
│   │                                  off-platform quote
│   ├── 03-quote-project.md         ← 28+ night stays + corporate blocks
│   │                                  + MTR pivots
│   ├── 04-dispatch.md              ← turnover coordination — cleaner,
│   │                                  linen, maintenance, lock code rotation
│   ├── 05-compliance.md            ← STR registration, tax collection,
│   │                                  permit, fire/safety, insurance, HOA
│   ├── 06-invoice-payment.md       ← channel payouts + direct invoicing
│   │                                  + security deposits + damage claims
│   ├── 07-supplier-ordering.md     ← linens, toiletries, kitchen
│   │                                  consumables, replacement furniture
│   ├── 08-emergency-247.md         ← lockouts, mid-stay maintenance,
│   │                                  double-booking, party detection,
│   │                                  neighbor complaints, no-shows
│   ├── 09-recurring-maintenance.md ← monthly deep cleans, quarterly walks,
│   │                                  annual safety + smoke alarm checks
│   ├── 10-leadgen-local-seo.md     ← channel listing SEO + direct
│   │                                  booking site SEO + repeat guest mkt
│   ├── 11-followup-reviews.md      ← post-stay review request, 5-star
│   │                                  prompting, review responses
│   └── 12-weekly-report.md         ← occupancy, ADR, RevPAR, review score,
│                                       channel mix, profitability/property
├── templates/
│   ├── callout-quote.md            ← rate quote, direct booking, length-
│   │                                  of-stay discount calculator
│   ├── project-quote.md            ← long-stay / corporate proposal
│   ├── invoice.md                  ← direct booking invoice, security
│   │                                  deposit, damages
│   ├── compliance-certificate.md   ← welcome pack + house rules + safety
│   │                                  info + emergency contact card
│   ├── email-pack.md               ← booking confirms, pre-arrival,
│   │                                  check-in, mid-stay, check-out, post
│   ├── sms-pack.md                 ← short comms (check-in code, wifi)
│   ├── review-request.md           ← 5-star prompt + review response
│   │                                  templates by score
│   └── maintenance-contract.md     ← cleaner SLA + maintenance schedule
│                                       + supplier agreements
└── knowledge/
    └── regional-reference.md       ← AU / NZ / UK / US / CA STR regulation
                                       + tax + insurance + channel specifics
```

## How it works

1. **Drop it in your agent.** Claude, OpenClaw, ChatGPT, Gemini,
   Grok — drop the `airbnb-host-agent/` folder into a project or
   knowledge base.
2. **Load the orchestrator.** Paste `MASTER_PROMPT.md` as the system
   prompt. It tells the agent which skill to use when.
3. **Fill the business config.** First run, the agent walks you
   through `config/business-config-template.md` — your properties
   (one block per listing), channel mix, channel manager
   (Hospitable / OwnerRez / Hostaway / Guesty / Lodgify / iGMS /
   Hostfully), dynamic pricing tool (PriceLabs / Beyond / Wheelhouse),
   cleaner network, smart-lock + noise system, regional regulatory
   status, tax registration.
4. **Connect channel inboxes.** Plug your channel-manager unified
   inbox into the agent (Hospitable, Hostaway, and Guesty all
   export to webhook / email forward / Slack). Or just paste inquiries
   as they come.
5. **Run the desk.** Every inquiry: triage → quote → book → confirm
   → pre-arrival sequence → check-in → mid-stay → check-out →
   turnover → review. Weekly: per-property P&L report.

## What the buyer ends up with

- A locked **business config** per property — listing IDs, channel
  mix, base rate + min/max guardrails for dynamic pricing, cleaner
  contact, lock code rotation rule, wifi credentials, parking info,
  noise sensor setup, regulatory status (STR registration #, lodging
  tax registration, insurance policy)
- **Guest inquiry triage** with party-risk filter (local guest +
  short stay + new account = red flag) and Superhost-response-time
  discipline (<1hr to all inquiries)
- **Rate quoting** for direct bookings, including length-of-stay
  discount calculator (7/14/28 nights), seasonal premium, last-minute
  fill, and event-driven surge
- **Long-stay quotes** (28+ nights — MTR pivot) and corporate
  block proposals with tax invoice
- **Turnover dispatch** — cleaner scheduled the moment a checkout
  is confirmed, linen + consumables on a rolling order, lock code
  rotated per booking, maintenance walk if flagged
- **Pre-arrival comms sequence** — booking confirmation, 7-day
  reminder, 24h check-in code, day-of "you in OK?" 6pm SMS,
  mid-stay check, checkout reminder
- **Regulatory compliance gate** — refuses to support hosting in
  violation (no NSW STRA registration in Greater Sydney, no
  Edinburgh STL licence, no NYC LL18 registration, no BC primary
  residence, etc.)
- **Emergency triage** — lockouts (door code reset via Igloohome /
  RemoteLock), mid-stay maintenance (which tradesperson, which
  escalation), party detection (NoiseAware / Minut alert response),
  neighbor complaints, double-booking recovery, no-shows
- **Channel-payout tracking** — Airbnb 15% host fee, Booking.com
  15-18% commission, VRBO 5% pay-per-booking; direct bookings net
  at ~3% Stripe
- **Post-stay flow** — review request at the right moment, 5-star
  prompt language, automatic review-response templates by score,
  host-to-guest review (always — affects future Superhost screening)
- **Recurring maintenance** — monthly deep cleans, quarterly
  maintenance walks, annual smoke alarm + safety + insurance renewal
- **Listing optimisation** — title + photos + description tuned for
  search-rank uplift on Airbnb + VRBO + Booking; direct-booking
  site SEO; repeat-guest discount + direct-booking invitation
- A **weekly per-property report** — occupancy, ADR, RevPAR, review
  score delta, maintenance log, channel mix, profitability after
  cleaning + supply + commission + tax

## Regions it works in

- **Australia** — references NSW STRA Code of Conduct + DA-NSW
  Premises Standard + 180-night non-hosted cap in Greater Sydney
  + "two strikes" exclusion register; VIC 7.5% STRA levy (Jan
  2025); QLD council-by-council (Brisbane visitor levy, Gold
  Coast, Cairns); WA/SA/TAS/ACT/NT patchwork; GST 10% if >$75k
  turnover; Land Tax surcharge in some states; insurance: Sharemaster,
  ShareCover, Hostplus
- **New Zealand** — Auckland Accommodation Provider Targeted Rate
  (APTR), Queenstown-Lakes STA regulations; GST 15% if >$60k
- **United Kingdom** — London 90-day non-hosted limit (Deregulation
  Act 2015); Edinburgh STL mandatory licence (Scotland-wide STL
  scheme); Wales statutory registration + council tax premium up
  to 300% on second homes/STRs; Northern Ireland Tourism NI
  registration; Furnished Holiday Lettings tax regime (being
  abolished April 2025); VAT 20% if >£90k; insurance: Pikl,
  CoverButler, Hiscox STR
- **United States** — NYC Local Law 18 (effectively kills non-hosted
  short-term); San Francisco 90-night non-hosted limit; LA
  Home-Sharing Ordinance + primary residence; Honolulu 30+ night
  minimum in many zones; Austin Type 1/2/3 licensing; Miami
  Beach restrictions; Nashville Type 1 vs Type 2; lodging tax
  often auto-remitted by channels; insurance: Proper, Slice, CBIZ
- **Canada** — BC Bill 35 (Short-Term Rental Accommodations Act,
  May 2024) + provincial registry; Toronto by-law (principal
  residence + 180-night cap + registration); Vancouver primary
  residence + business licence; Montreal/Quebec CITQ mandatory;
  GST/HST/PST per province if commercial; insurance: Square One,
  Aviva

The regional reference inside the bundle maps every regulatory
regime — you don't need to teach the agent which city/state/province
you're in beyond filling out the business config.

## Agent platforms it runs on

- **Claude** (Claude Code, Claude Projects, Claude.ai with file uploads)
- **OpenClaw** (drop straight into skills tab)
- **ChatGPT** (paste into Custom GPT instructions / Project files)
- **Gemini / Grok** (paste skills as a system prompt + knowledge files)
- **n8n / Make / Zapier** (advanced — treat each SKILL as a prompt block,
  trigger off channel-manager webhooks)

## Support

Reply to your confirmation email or write to `creators@skillzy.ai`.
