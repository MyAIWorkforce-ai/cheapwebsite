# Publish — Real Estate Agent, end to end.

Step-by-step to publish this bundle on skillzy.ai. Should take ~5 minutes.

## Before you start

- Sign in to skillzy.ai as the **Skillzy House** creator account
- Confirm Stripe Connect is done for that account
- Unzip `_bundles/real-estate-agent.zip` somewhere accessible

## Step 1 — open /sell/new

`https://skillzy.ai/sell/new`

## Step 2 — drop in the files

Drag all 18 .md files from the unzipped folder into the file dropper:

**Root files:**
- `00_START_HERE.md`
- `SKILL.md`

**knowledge/:**
- `01_real-estate-knowledge-base.md`
- `02_frameworks.md`
- `03_regional-reference.md`
- `04_connectors-and-tools.md`
- `05_compliance-deep-dive.md`

**prompts/:**
- `prompt-library.md`

**templates/:**
- `email-templates.md`
- `listing-and-scripts.md`
- `listing-presentation-script.md`
- `crm-notes-and-logs.md`
- `auction-day-script.md`
- `best-and-final-script.md`
- `conditional-offer-playbook.md`
- `vendor-weekly-report.md`

**sops/:**
- `workflows-and-checklists.md`

**examples/:**
- `sample-runthrough.md`

**DO NOT upload** `LISTING_COPY.md` or `PUBLISH.md` — internal-only.

## Step 3 — paste the listing copy

### Title
```
Real Estate Agent, end to end.
```

### Tagline
```
Qualify leads, write listings, prep CMAs, run auctions and Best & Finals, manage conditional offers, keep deals on track. The full residential workflow — drop it into any agent.
```

### Description
```
A complete real estate desk dropped into your agent. The same workflow top-producing agents run — lead qualification (BANT-R), CMA pricing logic, listing presentations that win, auction-day plays, Best & Final / multi-offer transparency, conditional-offer-to-unconditional management, vendor weekly reports that hold the campaign together, objection handling (AREA), and "always end with a next step" client comms — distilled into one bundle. Drop it into Claude, ChatGPT, Gemini, or any agent, and you've got a tireless team member at your shoulder.

Region-aware across AU (state-by-state — VIC Section 32, NSW Contract for Sale, QLD Property Law Act 2023, WA disclosure, SA Form 1, ACT contract-up-front, underquoting law tight in VIC + NSW), NZ (REA Code, AML 2009, LIM, multi-offer process), UK (Material Information Parts A/B/C, AML MLR 2017, leasehold, gazumping vs Scotland's closing-date system), US (state commissions, NAR 2024 settlement, MLS, Fair Housing, state seller disclosure, Lead-Based Paint), and CA (provincial regulators, FINTRAC, BC rescission period, foreign buyer ban). Speaks the right terms, names the right portals, references the right CRMs (VaultRE, AgentBox, Realhub, Reapit, Dezrez, Alto, Follow Up Boss, kvCORE, Chime/Lofty, Top Producer, Pipedrive, HubSpot), and applies the right compliance frame — automatically.

Built compliance-first. Describes the property, not the "ideal buyer" — every output stays inside Fair Housing / Equality / Anti-Discrimination rules. Refuses to invent square footage, school zones, or sold prices. Won't launch a listing without disclosure signed off. Won't draft text suggesting deposits can be touched. Refuses underquoting and helps you stay clean on AML CDD. Your licence stays clean.

Covers the full workflow: lead response, listing presentations (the 7-section play), portal-ready descriptions, CMA pricing narratives, weekly vendor updates (5 report variants), price-reduction conversations, open-home invites + 24h/48h/7d follow-ups, offer-to-unconditional management, auction-day playbook (AU/NZ), Best & Final / sealed bid process (UK/CA/multi-offer), conditional-offer management, settlement coordination, post-settlement nurture (3-month referral ask, anniversary cards), and the transaction-timeline checklist. Plus phone and SMS scripts. Plus paste-ready CRM notes for the major systems in each region. Built by humans. Tested. AI-ready.
```

### What you get (paste as bullets, one per line)
```
SKILL.md — the agent brain with operating principles, capabilities, and the default workflow
Real Estate Knowledge Base — sales process, listing vs buyer-side workflows, roles, scope, compliance, tone
Decision Frameworks — BANT-R, first-call scripts (buyer + seller), CMA with adjustment table, AREA objection handling, multi-offer / Best & Final, conditional-offer playbook, auction framework, marketing rhythm
Regional Reference — AU state-by-state, NZ, UK (Material Information + AML), US (NAR + state), CA (provincial + FINTRAC)
Connectors & Tools — per-CRM wiring (VaultRE, AgentBox, Realhub, Reapit, Dezrez, Alto, Follow Up Boss, kvCORE, Chime, Top Producer, HubSpot, Pipedrive), lead-cap portals, CMA tools, comms, eSign
Compliance Deep-Dive — 7 always-on rules with region-specific scripts when a user crosses a line
Listing Presentation Script — the 7-section play that wins the right to sell the home
Auction Day Script (AU/NZ) — week-of countdown, "on the market?" moment, pass-in negotiation, underbidder follow-ups
Best & Final Playbook — multi-region (UK/NZ/AU/US/CA) invitation + decision + winner/loser comms
Conditional Offer Playbook — under-contract day-by-day, broker / inspector chase scripts, condition-fail handling, unconditional confirmation
Vendor Weekly Report Templates — 5 variants (standard / first-week / hot / cooling / pivot)
CRM Notes & Activity Logs — universal + per-CRM paste-format mapping
Prompt Library — 60+ ready-to-run prompts
Email & Message Templates — 20+ templates covering the full lifecycle
Phone + SMS Scripts — inbound, vendor asks, price-reduction, expired, FSBO, referral, just-sold, auction, pre/post-open, conditional chases
Workflows & Checklists — 15 SOPs including the pre-launch compliance checklist
Worked end-to-end example — Marrickville Sydney listing from enquiry through pre-auction Best & Final to settlement
Fair-housing / compliance guardrails built into every output
Platform-agnostic — works on Claude, ChatGPT, Gemini, Grok, OpenClaw, or any capable agent
```

## Step 4 — set the meta

- **Type**: Agent Setup
- **Niche**: Real Estate
- **Platforms**: tap **"All agents"** chip (Claude, OpenClaw, ChatGPT, Gemini, Grok, Hermes, Manus, Ollama, Mistral, DeepSeek). Untick n8n/Make/Zapier if you want to keep the platform list tight to LLM agents.
- **Price**: **$199**

## Step 5 — publish

Hit Publish. Listing should land on its detail page.

## Step 6 — smoke-test

In an incognito tab:
1. Open the listing as a buyer
2. Buy it with a real card (refund yourself after)
3. Confirm download email arrives
4. Click → confirm all 18 files in the bundle
5. Drop into Claude and try: *"I'm a Sydney NSW listing agent. Got a pre-auction offer of $1.78M on a 3-bed Marrickville home, auction is in 11 days, 5 other warm buyers in the wings. Help me decide and draft the messaging."*
6. The agent should ask any missing facts, propose the Best & Final play, draft the invitation to all buyers, draft the vendor-decision conversation, and offer to write the CRM note for VaultRE / AgentBox — using NSW-specific terminology throughout

## Done

The listing is live under @skillzy-house at $199.
