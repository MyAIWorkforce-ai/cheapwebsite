# Setup — 15 minutes

You need three things to run this end-to-end. If you already have any
of them, skip ahead.

## 1. Pick an agent platform

Any of these work — pick whichever you already use:

- **Claude.ai** (Pro plan recommended). Create a Project, upload the
  entire `airbnb-host-agent/` folder, paste `MASTER_PROMPT.md` into
  the project instructions.
- **Claude Code** (terminal). `cd` into the folder, run Claude Code in
  that directory. Skills load automatically.
- **OpenClaw** — upload the SKILL.md files into the Skills tab, paste
  `MASTER_PROMPT.md` into the instructions.
- **ChatGPT** — create a Custom GPT, upload all files via Knowledge,
  paste `MASTER_PROMPT.md` into the instructions.
- **Gemini / Grok** — paste `MASTER_PROMPT.md` as the system prompt;
  attach the skills as knowledge files.

## 2. Connect a channel manager (one-off, 5-10 mins)

The agent reads inquiries + bookings + reviews from your channel
manager. Pick yours, set up the relay:

- **Hospitable (formerly Smartbnb)** — best all-rounder for solo/small
  hosts. Set up a unified-inbox webhook → email / Slack → agent.
- **OwnerRez** — strong US, includes direct-booking site. Email
  forwarding from the inbox works for the agent.
- **Hostaway** — strong international all-rounder. Has a unified
  inbox + webhook API.
- **Guesty** (Guesty For Hosts for <5 props, Guesty Pro for 5+) —
  inbox export works.
- **Lodgify** — strong for direct booking sites. Inbox + email forward.
- **iGMS** — small-host friendly, all-in-one. Inbox forward.
- **Hostfully** — direct booking + ops platform. Inbox + email.
- **No channel manager (just Airbnb's app)** — also fine. Manually
  paste each inquiry into the agent. Works for hosts with 1-3
  listings.

Whichever you use, set the agent's inbox to receive a copy of every
inbound message + every confirmed booking. **Speed matters — Airbnb
weights response-time within first hour heavily for Superhost
status and search rank.**

## 3. Connect dynamic pricing (one-off, 5 mins)

The agent quotes nightly rates based on your pricing tool's
output. Pick yours:

- **PriceLabs** (most popular) — agent reads recommended price + min
  + max per night, applies length-of-stay discount calculator from
  your business config, generates the rate quote.
- **Beyond Pricing** — same flow, Beyond's recommendation read in.
- **Wheelhouse** — same.
- **AirDNA Rentalizer** — for market analysis (less for daily
  pricing automation).
- **None — manual pricing** — also fine. Set your base rate + min +
  max in BUSINESS CONFIG and the agent uses those with seasonal
  multipliers.

## 4. Connect a turnover / cleaner tool (optional, 5 mins)

For multi-property hosts:

- **Turno (formerly TurnoverBnB)** — STR cleaner marketplace, auto-
  dispatch on checkout.
- **Tidy** — STR-focused turnover.
- **Properly** — checklist + photo evidence.
- **Breezeway** — full ops + maintenance + cleaning.
- **Just your cleaner's mobile** — also fine. Agent texts the cleaner
  directly with the turnover window.

## 5. Smart lock + code rotation (recommended, not required)

The agent generates the next door code per booking; you (or the
lock) apply it:

- **Igloohome** — STR-specific, offline codes (no wifi needed),
  generates time-bound codes.
- **RemoteLock** — strong API + Airbnb sync.
- **August / Yale / Schlage Encode** — wifi-connected, the agent
  generates the code and pushes via API or pastes for you.
- **Lockly** — Bluetooth + wifi, similar to August.
- **No smart lock** — the agent gives the guest your standard code +
  reminds you to change it on a rotation (every 30 days minimum).

## 6. Noise / party detection (optional)

- **NoiseAware** — most common, decibel + occupancy.
- **Minut** — also includes smoke + temperature + humidity.
- **Roomonitor** — UK + EU focused.

When a sensor pings, the agent kicks off the party-protocol flow in
`08-emergency-247.md`.

## 7. First conversation

Once set up, type or say:

> *"Run intake — I want to set up the business config first."*

The agent walks you through `01-intake.md` business-setup
subroutine: every property (one block per listing), channels active
per property, channel manager, pricing tool, cleaner, lock system,
noise sensor, regulatory status (STR registration #, lodging tax
ID, insurance policy), tax registration, off-hours rules.

Expect 20-30 minutes for the first config across 1-5 properties.
Save it, every later skill reads from it.

## Coming back later

For ongoing weekly use, you don't need to do anything special. Just
paste the new inquiry and the agent picks up. Or run a specific skill:

- *"Quote this inquiry: 7 nights end of March, family of 4, at
  [property name]"*
- *"Generate the turnover dispatch — Smith family checks out tomorrow
  11am, Jones family checks in 3pm"*
- *"Draft the response to this 4-star review: [paste review]"*
- *"Time for this week's report — pull occupancy + ADR + RevPAR per
  property."*

## If something gets stuck

- Tell the agent: *"Restart from skill X"* and it'll re-run that step.
- Or paste: *"Show me which skill you're using right now and what
  step you're on."*

That's it. Setup done.
