# Publish — Real Estate Agent, end to end.

Step-by-step to publish this bundle on skillzy.ai. Should take ~5 minutes.

## Before you start

- Sign in to skillzy.ai as the **Skillzy House** creator account
- Confirm Stripe Connect is done for that account
- Unzip `_bundles/real-estate-agent.zip` somewhere accessible

## Step 1 — open /sell/new

`https://skillzy.ai/sell/new`

## Step 2 — drop in the files

Drag all 12 .md files from the unzipped folder into the file dropper:

**Root files:**
- `00_START_HERE.md`
- `SKILL.md`

**knowledge/:**
- `01_real-estate-knowledge-base.md`
- `02_frameworks.md`
- `03_regional-reference.md`

**prompts/:**
- `prompt-library.md`

**templates/:**
- `email-templates.md`
- `listing-and-scripts.md`
- `listing-presentation-script.md`
- `crm-notes-and-logs.md`

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
Qualify leads, write listings, prep CMAs, handle objections, keep deals on track. The full residential workflow — drop it into any agent.
```

### Description
```
A complete real estate desk dropped into your agent. The same workflow top-producing agents run — lead qualification (BANT-R), CMA pricing logic, objection handling (AREA), vendor feedback conversations, "always end with a next step" client comms — distilled into one bundle. Drop it into Claude, ChatGPT, Gemini, or any agent, and you've got a tireless team member at your shoulder.

Built compliance-first. The agent describes the property, not the "ideal buyer" — every output stays inside fair-housing / anti-discrimination rules. It refuses to invent square footage, school zones, or sold prices. It flags missing facts for you to confirm. Your licence stays clean.

Covers the full workflow: lead response, listing descriptions (portal-ready + socials), CMA pricing narratives, weekly vendor updates, price-reduction conversations, open-house invites + follow-ups, offer-to-unconditional management, and the transaction-timeline checklist. Plus phone and SMS scripts for the conversations agents actually have. Built by humans. Tested. AI-ready.
```

### What you get (paste as bullets, one per line)
```
SKILL.md — the agent brain with operating principles, capabilities, and the default workflow
Real Estate Knowledge Base — the sales process, key terms, compliance guardrails, AU/NZ + US/UK regional notes
Decision Frameworks — BANT-R for qualification, comp-based CMA logic with a comparison table, AREA objection handling, vendor feedback structure
Prompt Library — ready-to-run prompts for every recurring task
Email & Message Templates — buyer enquiry, re-engagement, post-appraisal, weekly vendor update, post-open, under-contract
Listing Formulas & Scripts — portal description shape, social caption formula, phone + SMS scripts (inbound calls, vendor asks, price-reduction, expired-listing outreach, FSBO, referral asks, just-sold drops, auction confirmation)
Workflows & Checklists — SOPs for new listings, open houses, lead-to-appointment, offer-to-unconditional, transaction timeline, weekly campaign rhythm
A worked sample run-through (Marrickville listing, brief to first offer) so you see what good output looks like before you spend a dollar
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
4. Click → confirm all 9 files in the bundle
5. Drop into Claude and try: *"Write a listing description for a 3-bed 2-bath in Marrickville, renovated, north-facing deck, $1.8M"*
6. The agent should ask any missing details, then produce a listing-shaped description with the compliance guardrails in place

## Done

The listing is live under @skillzy-house at $199.
