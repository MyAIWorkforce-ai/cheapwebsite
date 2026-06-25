# Connectors & Tools — wiring the agent into the working stack

A real estate agent's day touches: a CRM, a portal-uploader, a CMA data tool, a phone (calls + SMS), email, calendar, photography vendor, conveyancer / solicitor, and a payment / trust system. The bundle's job is to produce outputs that drop straight into these tools.

This file shows you exactly **how the AI structures output for the top tools in each region** — so the agent can copy/paste without reformatting.

---

## CRM wiring — output format per system

The five-field universal note (WHO + WHAT-HAPPENED + WHEN + OUTCOME + NEXT-ACTION) works in every CRM, but each has a preferred field shape. Here's the cheat sheet.

### VaultRE (AU/NZ — dominant)

VaultRE is structured around **Contacts** (with linked Properties) → **Activities** (typed: Call / Email / SMS / Inspection / Offer / Letter / Note) → **Tasks** (with due date + assignee).

**Note format (paste into Activity > Description):**
```
[YYYY-MM-DD HH:MM] [TYPE] — [Outcome in one line]

Detail:
- [bullet detail 1]
- [bullet detail 2]

Next: [specific action] — Task created for [date]
```

**Task format (paste into Task description):**
```
Follow up [CONTACT] re [TOPIC] — call/SMS preferred
Due: [DATE], Priority: [High/Med/Low]
Context: [1 line — why this matters]
```

**Listing-stage update (paste into Property Notes):**
```
[DATE] — Stage: [Pre-list / Listed / Conditional / Unconditional / Settled]
Trigger: [what changed]
Key facts: [1–3 bullets]
Vendor brief: [1 line]
Next milestone: [DATE]
```

VaultRE auto-syncs to REA + Domain — the agent doesn't need to upload to portals separately if the listing is in VaultRE.

### AgentBox (AU)

Structure: **Contacts** → **Activity** (Call / Email / SMS / Note / Letter / Inspection) → **Tasks**.

**Format mirrors VaultRE.** AgentBox's eDM is stronger — for bulk vendor / buyer comms, the agent can output content for AgentBox eDM templates.

### Realhub (AU)

Listing-centric. Properties → eContracts → Vendor Reports.

**Listing brief format (paste into Realhub Listing Notes):**
```
[ADDRESS]
Vendor(s): [NAMES] / Co-vendors: [Y/N]
Strategy: [Auction / Private Treaty / EOI / Off-Market]
Guide: $[X – Y]
Launch: [DATE]
Marketing: $[VPA spend], breakdown: [items]
Conveyancer: [Name + firm + email]
Key compliance: [Section 32 lodged Y/N — date]
```

### Reapit (UK — dominant)

Structure: **Property** (the listing) ↔ **Vendor** + **Applicant** (the buyer) → **Diary Entries** (every interaction) → **Tasks**.

**Diary entry format:**
```
[PROPERTY REF] / [APPLICANT NAME or VENDOR NAME]
Type: [Viewing / Email / Call / SMS / Note / Offer]
Outcome: [one line]
Next action: [specific] — diaried for [DATE]
```

**Property record update:**
```
[PROPERTY REF] — Status update [DATE]
Marketing stage: [Pre-launch / Launched / Under Offer / Exchanged / Completed]
Key milestone: [what changed]
Mat. Info: [Parts A confirmed / Parts B partial / Parts C outstanding]
Next: [action] by [DATE]
```

### Dezrez (UK)

Cloud-native. Similar to Reapit; output diary entries in the same shape.

### Alto (UK, Zoopla-owned)

Simpler structure. Use the universal note format directly.

### Follow Up Boss (US/CA — dominant)

Structure: **People** → **Notes** → **Tasks** → **Action Plans** (drip sequences). Tags drive automation.

**Note format (paste into FUB Notes):**
```
[MM/DD/YYYY HH:MM] [TYPE: CALL / SMS / EMAIL / TEXT / SHOWING / OFFER]
[Contact name] — [Outcome one line]

Detail:
- [bullet 1]
- [bullet 2]

Next: [action] by [DATE]
Tags applied: [hot-buyer / seller-lead / past-client / source-zillow / etc.]
```

**Task format:**
```
[Action] for [Contact name]
Due: [DATE], Assigned: [Agent]
Why: [1 line]
```

**Tag library (standard FUB tags the agent should suggest):**
- Temperature: `hot`, `warm`, `cold`, `nurture`
- Side: `buyer-lead`, `seller-lead`, `past-client`, `referral-source`
- Source: `source-zillow`, `source-realtor`, `source-zillow-premier`, `source-database`, `source-sphere`, `source-open-house`, `source-fsbo`, `source-expired`
- Stage: `new-lead`, `qualified`, `under-contract`, `closed`
- Action plans: `new-lead-7day`, `buyer-nurture-30day`, `seller-nurture-60day`, `past-client-quarterly`

**Action Plan trigger logic (the agent suggests):**
- Tag `new-lead` + `source-zillow` → start `new-lead-7day` plan.
- Tag `buyer-lead` + `hot` → daily for 7 days then 3x weekly.
- Tag `past-client` → quarterly check-in plan.

### kvCORE (US/CA)

Structure: **Smart CRM** (behavioural — actions on the IDX site trigger lead score changes) → **Smart Drips** → **Smart Numbers** (SMS).

**Mass campaign brief format (the agent outputs this for kvCORE drip setup):**
```
Campaign: [NAME]
Trigger: [tag / behaviour]
Audience: [criteria]

SMS 1 (Day 0, 12:00 local time): [text content, <160 chars]
Email 1 (Day 1, 9:00 local time): [subject + body]
SMS 2 (Day 3): [content]
Email 2 (Day 5): [subject + body]
Drop-off rule: [after X days no engagement, move to nurture]
```

### Chime / Lofty (US)

Similar to kvCORE. Use the same drip-brief format.

### Top Producer (US — legacy but common)

Older but still widely deployed. Contact + Plans + Activities. Use universal note format.

### LionDesk + Wise Agent (US — solo agents)

Smaller systems. Universal note format works.

### HubSpot / Pipedrive / Salesforce (cross-region, generic)

Use the universal note format. For Pipedrive specifically:
- Treat "Deal" as the transaction (one per listing or per buyer).
- Pipeline stages: New Lead → Qualified → Viewing Booked → Offer → Under Contract → Settled / Closed.
- Activity log = interactions.

---

## Lead-capture connectors (per region)

The AI doesn't capture leads (the user does, via these tools), but it should know what's on the agent's stack and how to handle leads from each source.

### Australia / NZ

- **realestate.com.au Inspection Manager + Property Manager (REA Pro)** — leads land in the agent's REA Pro inbox, often forwarded to email + CRM.
- **Domain Group Pro** — Domain's equivalent.
- **Inspect Real Estate / Inspect & Sales** — open-home registrations.

When a lead comes from REA: tag `source-rea`. Comment in CRM: "REA enquiry [DATE/TIME] on [ADDRESS] re [QUESTION]."

### United Kingdom

- **Rightmove Plus** — Rightmove's agency dashboard. Leads arrive there + email.
- **Zoopla Pro** — same for Zoopla.
- **OnTheMarket agency portal**.
- **Reapit's lead capture forms** — embedded on agency website, leads land in Reapit.

### United States

- **Zillow Premier Agent** — paid lead alerts. Strong push notification flow. Cost-per-zip.
- **Realtor.com Connections+ / OpCity** — concierge-screened leads (OpCity charges a referral fee on close).
- **REDX / Vulcan7** — expired listings + FSBO data feeds. Output: cold-outreach scripts.
- **BoldLeads** — landing-page lead capture + drip.
- **Real Geeks, Ylopo, Sierra Interactive** — IDX websites + lead-capture forms tied to CRM.

### Canada

- **Realtor.ca leads** — channelled through the agent's brokerage.
- **HouseSigma** — popular consumer + agent data.
- Same kvCORE / FUB stack as US.

---

## CMA / data tools

The AI's job here is to **structure** the comp analysis once the user has pulled comps. The user owns the data; the AI does the writing.

### CoreLogic RP Pro (AU/NZ)

The dominant tool. Agent pulls comps via address; export gives sold price + date + key details. Agent pastes into the AI; AI structures the table + narrative.

**Workflow:**
1. Agent: "Here are 4 comps from RP Pro — [paste]."
2. AI: structures the CMA comparison table (from `02_frameworks.md` section 3).
3. AI: writes the pricing narrative.
4. Agent: reviews + sends to vendor.

### PriceFinder / Domain Group equivalent (AU)

Similar to RP Pro.

### Cloud CMA / RPR (US)

- **Cloud CMA** — branded CMA reports. Agent uploads listing + comps; output is a PDF + interactive page.
- **RPR (Realtors Property Resource)** — NAR-included.

For US workflow: AI generates the narrative + interpretation; agent pastes into Cloud CMA report's commentary field.

### Property Data / Land Registry (UK)

Land Registry sold-price data feeds Rightmove / Zoopla / Property Data. Agent pulls comparables, pastes, AI structures.

### CREA HPI / Toronto Real Estate Board MLS (CA)

Provincial board MLS comps. Same workflow.

---

## Communications tools

### SMS / text

- **Twilio** — programmatic, often integrated with CRM via Zapier / direct.
- **OpenPhone** (US/CA) — second number, integrated to FUB / kvCORE.
- **Burst SMS / MessageMedia / SmsBroadcast** (AU/NZ) — bulk SMS.
- **Podium** (US) — review + SMS combo.
- **TextMagic** — global.

**The AI's SMS output:** keep to 160 chars where possible. Sign with agent name. Match locale spelling.

```
Example AU SMS:
"Hi James, Anna here — got your number from the Sat open. Got a sec to send through 2 similar listings off-market? Reply YES."

Example US SMS:
"Hi James, this is Anna re: 14 Oxford. Saw you at Saturday's open — got a min for me to send 2 similar listings I think you'd love? Reply YES."
```

### WhatsApp Business

Common in UK, AU, NZ, Asia, LatAm. Slightly more informal register than SMS. Same length discipline.

### Email

Integrated to the CRM in most setups. For mass / nurture, agencies use:
- **Mailchimp** — common across regions.
- **Constant Contact** — US.
- **ActiveCampaign / Klaviyo** — for marketing automation.

The AI outputs email in 2-block format: short greeting + body, then signature block. Subject line ≤ 60 chars.

### Calendar / booking

- **Google Calendar + Outlook** — base.
- **Calendly** — open-home registrations, private inspections, listing presentations.
- **Acuity** — alternative to Calendly.
- **Tidycal** — newer.

When the AI proposes booking times, it should suggest 2–3 specific options in the agent's working hours — never "let me know what works."

---

## Floor plans / photography / virtual tours

- **Matterport** — 3D virtual tour. The AI can write copy referencing the 3D tour link.
- **Box Brownie** (AU origin, global) — photo enhancement + virtual staging + day-to-dusk. Strong with REA listings.
- **Open Agent Pro / Loop** (AU) — media asset management.
- **HomeJab, BoxBrownie, RealPhotos** (US) — local photographer networks.
- **Zillow 3D Home** (US) — entry-level 3D.
- **Realtor.com Listing Photo Studio** (US).
- **VirtualTours.com / iGUIDE / Asteroom** — alternatives.

When writing listing copy, the AI should reference the media:
> *"Step inside via the 3D tour [LINK] or come through the open Saturday 11am."*

---

## eSignature & contracts

- **DocuSign** — global standard.
- **Adobe Sign** — second.
- **Realhub eContracts** (AU) — agency-agreement + contract signing.
- **REINSW Realworks** (NSW) — contract generation.
- **REIQ Forms** (QLD) — Form 6 + contract.
- **Macquarie Reseller / Lawcover** (VIC) — Section 32 generation.
- **Reapit Sign / Lifesycle** (UK) — integrated.
- **Dotloop / SkySlope** (US) — transaction management.
- **NotaryCam** (US) — remote online notarisation.

The AI doesn't generate contracts — that's the conveyancer's lane. But it can output:
- Summary cover-notes for what's being signed.
- Reminder messages when conditions are due.
- Status reports on contract progress for vendor / buyer.

---

## Payment & trust (deposits)

- **PEXA** (AU) — e-conveyancing platform; settlements run through it.
- **MacquarieDDA / Macquarie Bank Trust** — common AU trust banking.
- **Reapit Trust** (UK) — integrated.
- **DepositLink / Earnnest** (US) — earnest money e-payment.

**The AI's hands-off rule:** never write text that suggests deposits / earnest money / trust funds can be touched, released early, or used for marketing. If the user asks, route to the conveyancer / broker of record.

---

## Marketing / portal upload mechanics

### realestate.com.au

- "Premiere" tier = top of search results in a postcode for 45 days.
- "Highlight" = standard.
- Auto-feed from CRM (VaultRE, AgentBox, Realhub) → REA listing.
- Listing fields: Headline (≤60 chars), Description (HTML allowed, ~150–300 words ideal), Inspection times, Auction details, Statement of Information (VIC compliance).

### Domain

- "Platinum" / "Gold" / "Silver" tiers.
- Same auto-feed.
- Slightly different field names; AI doesn't care — just outputs the copy.

### Rightmove / Zoopla / OnTheMarket

- Listing fed from CRM (Reapit / Dezrez / Alto).
- Material Information Parts A/B/C fields (Rightmove + Zoopla added these 2023+).
- Description ~150–300 words.

### Zillow / Realtor.com / Redfin

- Fed from MLS (the agent's regional MLS).
- Listing fields include: description (up to 1000 chars), photos, virtual tour link, school data, neighbourhood data.

### MLS-specific (US)

Every regional MLS has its own listing template. AI doesn't need to know the field names — agent copies from AI output into MLS fields manually.

---

## Off-platform marketing channels

- **Google Business Profile (GBP)** — for the agent's own brand presence. AI can output GBP posts, Q&A replies, review responses.
- **Instagram / Facebook / TikTok** — listing posts + Stories + Reels. AI outputs caption + hashtags.
- **LinkedIn** — for commercial-leaning agents + B2B referrers.
- **YouTube** — listing videos + market updates. AI outputs scripts.
- **Direct mail / letterbox** — "just listed / just sold" drops. AI outputs short copy for the postcard.

---

## How the AI should handle "what should I use?" questions

If the user is setting up tooling and asks for a recommendation, the AI gives a **region + budget + scale-appropriate** suggestion, e.g.:

> *"For a solo agent in AU just starting out: VaultRE is overkill on cost — try a simpler CRM like AgentBox or even a HubSpot Starter setup, paired with REA's listing tools. As you grow past 30 listings/year, move to VaultRE."*

> *"For a UK agent at a 3-person firm: Reapit if you can swing the cost; Alto if you need a faster on-ramp. Both feed Rightmove + Zoopla cleanly."*

> *"For a US team in a Zillow-heavy market: Follow Up Boss + Zillow Premier Agent is the standard stack. Add kvCORE if you want IDX + drip in one."*

Don't be a salesperson for any specific tool. Be useful.
