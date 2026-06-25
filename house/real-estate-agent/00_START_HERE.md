# Real Estate Agent Setup — START HERE

A complete, plug-in AI assistant for residential real estate agents. Drop it into any AI agent and you've got a tireless team member that qualifies leads, writes listings, preps CMAs, runs auctions and Best & Finals, manages conditional offers, drafts CRM notes, and keeps your deals on track — across AU, NZ, UK, US, and CA, with state/province-level depth.

**Built by humans. Works on any agent. No code required.**

---

## What's inside

```
real-estate-agent-setup/
├── 00_START_HERE.md                ← you are here
├── SKILL.md                        ← the core agent brain (start with this)
├── knowledge/
│   ├── 01_real-estate-knowledge-base.md   ← process, roles, compliance, scope
│   ├── 02_frameworks.md                    ← BANT-R, CMA, AREA, multi-offer, conditional,
│   │                                          auction, marketing rhythm
│   ├── 03_regional-reference.md            ← AU/NZ/UK/US/CA — regulators, portals,
│   │                                          disclosure regimes, AML, all the specifics
│   ├── 04_connectors-and-tools.md          ← CRM wiring (VaultRE/Reapit/FUB/kvCORE etc.),
│   │                                          lead-cap, comms, eSign, photography
│   └── 05_compliance-deep-dive.md          ← 7 always-on rules + region-specific scripts
├── prompts/
│   └── prompt-library.md                   ← ready-to-run prompts for every task
├── templates/
│   ├── email-templates.md                  ← buyer + seller + open-home + conditional +
│   │                                          post-settlement (20+ templates)
│   ├── listing-and-scripts.md              ← portal copy (AU/UK/US examples), phone scripts,
│   │                                          SMS scripts, social caption formulas
│   ├── listing-presentation-script.md      ← 7-section play that wins the listing
│   ├── crm-notes-and-logs.md               ← universal + per-CRM wiring (VaultRE, AgentBox,
│   │                                          Realhub, Reapit, Dezrez, Alto, FUB, kvCORE,
│   │                                          Chime, Top Producer, HubSpot, Pipedrive)
│   ├── auction-day-script.md               ← AU/NZ auction-day playbook (NEW)
│   ├── best-and-final-script.md            ← UK + multi-region sealed bid playbook (NEW)
│   ├── conditional-offer-playbook.md       ← under-contract management to unconditional (NEW)
│   └── vendor-weekly-report.md             ← 5 report variants (NEW)
├── sops/
│   └── workflows-and-checklists.md         ← 15 SOPs (launch, opens, presentations,
│                                              auctions, Best & Final, settlement,
│                                              past-client nurture, compliance checklist)
└── examples/
    └── sample-runthrough.md                ← worked example: Marrickville listing
                                              from enquiry through pre-auction Best & Final
                                              to settlement (Sydney NSW)
```

---

## How to install (pick your platform)

This setup is **platform-agnostic** — the same files work everywhere.

### Claude (Projects or Claude Code)
- **Claude Project:** create a new Project → add all these files to the Project knowledge. Claude will use `SKILL.md` as its core instructions and pull from the others as needed.
- **Claude Code / skills folder:** drop the whole folder into your skills directory. The `SKILL.md` frontmatter makes it discoverable.

### ChatGPT
- **Custom GPT:** create a new GPT → paste the contents of `SKILL.md` into the Instructions → upload the `knowledge/`, `prompts/`, `templates/`, and `sops/` files as Knowledge.
- **Plain chat:** paste `SKILL.md` at the start of a conversation, then paste whichever resource file you need for the task.

### Gemini / Grok / other agents
- Paste `SKILL.md` into the system prompt / custom instructions.
- Add the resource files into the knowledge base or paste the relevant one when the task needs it.

### Automation tools (n8n / Make / Zapier)
- Use `SKILL.md` as the system message on your LLM node.
- Load the relevant resource file into the prompt for the specific step (e.g. the listing formula for a "write description" node, the auction-day script for an "auction prep" node).

---

## Quick start (60 seconds)

1. Install `SKILL.md` as your agent's core instructions (above).
2. Tell the agent which country (+ state/province if AU/US/CA) you work in.
3. Tell the agent what you're working on, e.g.:
   - *"Write a listing description for a 3-bed 2-bath in [suburb], renovated kitchen, north-facing, $X."*
   - *"A buyer lead went quiet 5 days ago — write a re-engagement message."*
   - *"Help me prep a CMA pricing narrative. Here are three comps…"*
   - *"Got 4 offers on a Best & Final. Help me compare and recommend."*
   - *"Auction tomorrow. Walk me through the vendor briefing."*
   - *"Finance condition is slipping — draft the vendor extension-request message."*
4. The agent asks for any missing details, then gives you something ready to send.

---

## Tips for best results

- **Feed it your voice.** Paste one or two emails you've written so it mirrors your tone.
- **Give it the facts.** It will never invent square footage, prices, or school zones — give it the real numbers and it does the rest.
- **Tell it your CRM.** It'll output paste-ready notes for VaultRE / Reapit / Follow Up Boss / kvCORE / etc. without you reformatting.
- **Stack the files.** For a big task (auction-day prep), load the auction script + the listing-presentation script + the prompt library together.

---

## Compliance promise

This bundle is built compliance-first:

- **Fair Housing / Equality / Anti-Discrimination** — describes the property, not the buyer.
- **No invented facts** — flags missing data with `[CONFIRM]`.
- **Disclosure before marketing** — won't launch a campaign until Section 32 / Material Information / Seller Disclosure / PDS is signed off.
- **AML / CDD** — flags the requirement for NZ / UK / CA (mandatory now) + AU (Tranche 2 from 2026).
- **Trust account discipline** — refuses to draft text suggesting deposits can be touched outside contract terms.
- **Underquoting** — applies VIC + NSW + market-honest pricing logic.
- **Material defects** — won't help hide them; offers compliant disclosure phrasing.

Still, **you are the licensed professional** — always review outputs before sending, and confirm any factual claims about a property or the market. This setup supports your work; it doesn't replace your judgment or your licensing obligations.

---

## Region coverage

- **🇦🇺 Australia** — state-by-state regulators (VBA / NSW Fair Trading / QBCC / DMIRS / CBS / CBOS / NTBPB / Access Canberra); REIA + state REIs; disclosure (Section 32 / Form 1 / Contract for Sale / Form 6 + Property Law Act 2023); cooling-off per state; underquoting (VIC + NSW tight); auction law; FIRB; AML Tranche 2 from 2026.
- **🇳🇿 New Zealand** — REA Act + Code of Conduct; REINZ/ADLS Sale & Purchase Agreement; LIM; AML/CFT Act 2009 (mandatory CDD); multi-offer process; auction / tender / deadline sale.
- **🇬🇧 United Kingdom** — TPO + PRS redress schemes; HMRC AML registration (MLR 2017); Material Information Parts A/B/C (NTSELAT); EPC; leasehold reform; gazumping vs Scottish system (Home Report + missives + closing date).
- **🇺🇸 United States** — state real estate commissions (DRE CA, TREC TX, DOS NY, DBPR FL, IDFPR IL etc.); NAR Code of Ethics + 2024 settlement (buyer agency agreements + decoupled commission); MLS clear-cooperation; state seller disclosure forms; Federal Lead-Based Paint Disclosure; Fair Housing Act + state additions; FinCEN GTOs; FUB / kvCORE / Chime / Top Producer wiring.
- **🇨🇦 Canada** — provincial regulators (RECO ON, RECA AB, BCFSA BC, OACIQ QC); CREA + Realtor.ca; PDS / SPIS; FINTRAC AML; BC Home Buyer Rescission Period (2023); Foreign Buyer Ban; multi-offer reform (BC 2024).

---

## What you get vs the previous version

- Region coverage expanded from broad-strokes to state/province-level depth (4× deeper).
- New compliance deep-dive file with the 7 always-on rules + region-specific scripts.
- New connectors-and-tools file mapping per-CRM wiring + lead-capture portals.
- New auction-day script (AU/NZ).
- New Best & Final / sealed bid playbook (UK + multi-region).
- New conditional-offer playbook (under-contract management).
- New vendor weekly report templates (5 variants).
- Expanded email templates (5+ → 20+).
- Expanded prompt library (15 → 60+).
- Expanded SOPs (6 → 15).
- Expanded CRM notes with per-CRM paste-format mapping.
- Full worked sample run-through (Marrickville Sydney listing with pre-auction Best & Final).

---

*Real Estate Agent Setup · by Skillzy House · Human-tested. AI-ready.*
