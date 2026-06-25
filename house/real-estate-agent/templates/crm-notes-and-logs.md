# CRM Notes & Activity Log Templates

The bundle outputs notes in a format the agent can paste straight into any CRM. No API needed, no setup, no failure modes.

The same shape works because every CRM stores the same five things:
**WHO + WHAT-HAPPENED + WHEN + OUTCOME + NEXT-ACTION**.

The first part of this file gives the universal format. The second part gives the **per-CRM wiring** for the top 3 systems per region (VaultRE / Reapit / Follow Up Boss), so the agent can paste-into-field without re-shaping the output.

---

## 1. Contact / lead record — the first note (universal)

When a new lead arrives, the agent generates this block. The user pastes it into the lead's first contact note:

```
LEAD: [Name]
Contact: [phone] / [email]
Source: [portal-realestate-au / portal-zillow / referral-[name] / database /
         signboard / open-home / social-instagram / paid-ads-meta / direct /
         cold-outreach]
Date received: [DATE]
Property of interest: [ADDRESS or "buying in <suburb> at $X-Y"]

BANT-R snapshot
- Budget: [pre-approved at $X / quoted $X-Y / unknown]
- Authority: [sole / partner / co-owner / executor]
- Need: [upsizing / downsizing / relocating / investing / first home /
         divorce / deceased estate]
- Timeframe: [weeks / months / browsing]
- Readiness: [pre-approved + seen properties / pre-approved + new / early]

Temperature: [HOT / WARM / COLD]
One-line summary: [the lead in one sentence]

Next step: [specific action]
Next contact: [DATE]
```

---

## 2. Activity log line — every subsequent touch (universal)

After every interaction (call, text, email, inspection, offer), the agent generates a single line:

```
[YYYY-MM-DD HH:MM] [TYPE] [CONTACT NAME] — [OUTCOME] — [NEXT ACTION by DATE]
```

**Examples:**

```
2026-06-15 14:30  CALL  James Park — Hot, partner inspecting Tue 6pm — Confirm Mon 10am
2026-06-15 16:00  SMS   Priya Mehta — Sent comp pack — Follow up Thu
2026-06-16 09:15  EMAIL Sarah & Tom Clark — Replied with finance Q — Loop in their broker today
2026-06-16 11:00  OPEN  14 Oxford St — 12 groups, 3 hot, 1 verbal — Send post-open by 6pm
2026-06-17 10:00  OFFER 14 Oxford St — $1.76M from Park — Present to vendor 2pm
2026-06-18 09:00  LIST  29 Bay Rd — Pres delivered, signed agreement — Photographer Wed
2026-06-18 14:00  APPT  Smith family at 12 Park Ave — Listing pres — Win/lose by Mon
```

**Types** (keep consistent across all logs for clean reports):

- `CALL` — phone call
- `SMS` / `TEXT` — text message
- `EMAIL` — email
- `OPEN` — open inspection / open house
- `PRIV` — private inspection
- `OFFER` — written offer activity
- `APPT` — appointment / meeting
- `LIST` — listing-presentation
- `MULTI` — multi-offer event
- `AUCT` — auction
- `COND` — condition status update
- `SETT` — settlement / closing event
- `NOTE` — internal note / observation
- `OTHER`

The agent generates these AS-YOU-GO — at the end of every conversation, offer to write the log line.

---

## 3. Stage-transition note — when a lead moves up the pipeline (universal)

```
STAGE CHANGE: [Old stage] → [New stage]
Date: [DATE]
Trigger: [what caused the change]
Key facts captured at this stage:
- [fact 1]
- [fact 2]
- [fact 3]
Next step: [specific action]
Next contact: [DATE]
```

Example — Lead → Qualified Buyer:

```
STAGE CHANGE: Lead → Qualified Buyer
Date: 2026-06-15
Trigger: BANT-R complete on call this afternoon
Key facts:
- Pre-approved $1.85M (broker confirmed: Mortgage Choice, Pete Smith)
- Partner needs to inspect before offer
- Settlement window: end-of-year mandatory (Tom relocating for work)
- Working with no other agent
Next step: Private inspection with partner Tuesday 6pm
Next contact: Monday 10am — confirm
```

---

## 4. Lead source attribution (universal — never edited)

Every lead is tagged on Day 1, never edited. Monthly reports then show which channels actually deliver.

| Tag | Means |
|---|---|
| `portal-<name>` | `portal-zillow`, `portal-realestate-au`, `portal-domain`, `portal-rightmove`, `portal-zoopla`, `portal-realtor-ca`, `portal-trade-me` |
| `referral-<name>` | Person referred them — use their name for tracking |
| `database` | Already in CRM — re-engaged from email blast / DM / SMS |
| `signboard` | Saw the For Sale sign / drove by |
| `open-home` | Walked in to an open inspection |
| `social-<platform>` | `social-instagram`, `social-tiktok`, `social-facebook`, `social-linkedin` |
| `paid-ads-<channel>` | `paid-ads-meta`, `paid-ads-google` |
| `direct` | Asked for the agent by name |
| `cold-outreach` | Agent initiated (door-knock, expired, FSBO, past-database SMS) |
| `past-client` | Previous transaction |
| `other-<source>` | Anything else, named |

Never `unknown` — if you don't know, ask the lead in the first call.

---

## 5. Vendor file note — listing-presentation aftermath (universal)

After a listing presentation, the agent writes this for the CRM vendor file:

```
LISTING PRESENTATION: [ADDRESS]
Date: [DATE]  Time on-site: [MINUTES]
Vendor(s): [NAMES]

Property facts captured
- Beds/baths/car: [X/Y/Z]
- Land / floor: [SIZE]
- Standout features: [LIST]
- Condition: [CONDITION]
- Build year: [YEAR]
- Major updates: [LIST]
- Body corp / strata / HOA / leasehold: [FEES if applicable]
- Conveyancer / solicitor: [NAME + firm if known]

Vendor motivation: [WHY THEY'RE SELLING]
Timeframe: [WHEN]
Other agents seen: [NAMES + quoted prices]

Pricing discussion
- Vendor's expectation: $X
- Comp evidence given: [LIST]
- Recommended guide: $X – $Y
- Agreed strategy: [auction / private treaty / EOI / fixed price]
- Reserve discussion: [scheduled for / set at $X]

Marketing discussion
- Recommended VPA / spend: $X
- Photography: [date booked / pending]
- Floor plan: [Y/N]
- Drone / twilight: [Y/N]
- Open home schedule: [X per week]
- Portal upgrades: [REA Premiere / Domain Platinum / Rightmove Featured / Zillow Premier]
- Signboard: [ordered date]

Compliance status (BEFORE marketing)
- Disclosure document: [Section 32 / Material Info / state form] — [signed off Y/N]
- Agency agreement signed: [Y/N — date]
- AML CDD complete: [Y/N]
- Trust account details confirmed: [Y/N]

Won listing? [YES / NO / PENDING]
If YES: launch date [DATE], agreement signed [DATE]
If NO: reason [REASON] — re-engage [DATE]
If PENDING: vendor needs [WHAT] — follow up [DATE]
```

---

## 6. Post-settlement / closing note — the referral hook (universal)

After settlement, log this in the CRM and set a reminder for the 3-month referral-ask:

```
SETTLED: [ADDRESS]
Settlement / closing date: [DATE]
Sale price: $[X]
Days on market: [X]
Sale-to-list ratio: [X%]
Buyer: [NAME] (now in database as past-buyer)
Vendor: [NAME] (now in database as past-vendor)
Key relationship notes: [referral-likely / hands-off / prefers SMS / etc.]

Next touches scheduled:
- Move-in week thank-you: [DATE]
- 30-day check-in: [DATE]
- 90-day referral ask: [DATE]
- Annual house-anniversary card: [DATE]
- Quarterly market update: [DATE pattern]
```

---

## CRM-specific wiring

The universal format above pastes into any CRM. Below is **per-CRM wiring** for the top systems — exactly what field to paste each piece into.

### VaultRE (AU / NZ — dominant)

VaultRE structure: **Contacts** (with linked Properties) → **Activities** (typed) → **Tasks** (with due date).

**Where each note goes:**

| Note type | VaultRE location |
|---|---|
| First lead note | Contact > Activity (Type: Note) — paste the full block |
| Activity log line | Contact > Activity (correct Type: Call / Email / SMS / Inspection / Offer) — short form |
| Stage transition | Contact > Activity (Type: Note) + update Contact's stage field |
| Listing presentation | Property > Notes section OR linked Contact > Activity |
| Vendor weekly report | Property > Vendor Report module (send via VaultRE's eDM) |
| Settlement note | Property > Activity + Contact > Activity |

**Activity Type mapping:**
- AI's `CALL` → VaultRE Activity Type: "Phone"
- AI's `SMS` → "SMS"
- AI's `EMAIL` → "Email"
- AI's `OPEN` → "Open for Inspection"
- AI's `PRIV` → "Private Inspection"
- AI's `OFFER` → "Offer"
- AI's `APPT` → "Appointment"
- AI's `LIST` → "Appraisal" or "Listing Appointment"

**Tag mapping** (paste into Contact > Tags):
- `hot-buyer`, `warm-buyer`, `nurture-buyer`
- `hot-seller`, `warm-seller`, `nurture-seller`
- `past-client-buyer`, `past-client-vendor`, `referral-source`
- `source-rea`, `source-domain`, `source-database`, `source-signboard`, etc.

**Task creation prompt the AI gives:**
> "Want me to format that as a VaultRE Task too? I'll set Due Date: [X], Assignee: [you], Priority: [High/Med/Low]."

---

### AgentBox (AU)

Structure mirrors VaultRE: **Contacts** → **Activity** (typed) → **Tasks**. Activities are stronger with bulk eDM (mass email) workflows.

**Activity Type mapping:**
- AI's `CALL` → "Phone Call"
- AI's `SMS` → "SMS"
- AI's `EMAIL` → "Email"
- AI's `OPEN` → "Inspection - Open"
- AI's `OFFER` → "Offer"
- AI's `LIST` → "Listing Presentation"

**Bulk eDM brief format (when the agent wants to send to a database segment):**

```
EDM Brief — [Topic]
Audience: [tag — e.g. hot-buyer-NorthSydney]
Subject: [SUBJECT — ≤60 chars]
Preview text: [PREVIEW — ≤90 chars]
Body: [HTML / plain text version]
CTA: [primary button + URL]
Send time: [DATE/TIME]
```

---

### Realhub (AU)

Listing-centric (not contact-centric). Strong eContracts module.

**Where each note goes:**

| Note type | Realhub location |
|---|---|
| Listing brief | Property > Property Notes |
| Vendor report | Property > Vendor Reports (Realhub has a built-in template) |
| Offer presentation | Property > Offers > New Offer (paste fields) |
| Contract status | Property > eContracts |

**Vendor Report compatible format:**

```
VENDOR WEEKLY REPORT — [PROPERTY]
Week: [N]
Stats:
- Online views: [X]
- Enquiries: [X]
- Inspections: [X]
- Offers: [X]

This week's activity: [BULLETS]

Buyer feedback (verbatim):
- "[QUOTE 1]"
- "[QUOTE 2]"

Recommendation: [SPECIFIC]

Next week's plan: [BULLETS]

— [AGENT]
```

---

### Reapit AgencyCloud / Foundations (UK — dominant)

Structure: **Property** ↔ **Vendor** + **Applicant** (the buyer) → **Diary Entries** → **Tasks**.

**Diary Entry format (paste into "Note" field of Diary Entry):**

```
[PROPERTY REF] / [APPLICANT or VENDOR NAME]
Type: [Viewing / Email / Call / SMS / Note / Offer / Memo]
Outcome: [one line]
Next action: [specific] — diaried for [DATE]
```

**Reapit-native types** (map AI's types to these):
- AI's `CALL` → Reapit "Call"
- AI's `EMAIL` → "Email"
- AI's `OPEN` → "Viewing"
- AI's `PRIV` → "Viewing"
- AI's `OFFER` → "Offer"
- AI's `LIST` → "Valuation"

**Property record update (paste into Property > Notes):**

```
[PROPERTY REF] — Status update [DATE]
Marketing stage: [Pre-launch / Launched / Under Offer / Exchanged / Completed]
Material Information: [Parts A confirmed / Parts B partial — outstanding: [items] / Parts C: [items]]
Key milestone: [what changed]
Next: [action] by [DATE]
```

**Reapit applicant matching (when AI suggests matching):**
> "Want me to format these 3 properties as matches to push into [APPLICANT NAME]'s Reapit record? I'll provide property refs + brief description."

---

### Dezrez (UK)

Cloud-native. Same Diary + Property structure as Reapit. Use Reapit format above.

---

### Alto (UK, Zoopla-owned)

Simpler. Use the universal note format directly — paste into Contact > Notes or Property > Notes.

---

### Follow Up Boss (US / CA — dominant)

Structure: **People** → **Notes** → **Tasks** → **Action Plans** (drip sequences) → **Tags** (drive automation).

**Note format (paste into FUB > Person > Notes):**

```
[MM/DD/YYYY HH:MM] [TYPE: CALL / SMS / EMAIL / TEXT / SHOWING / OFFER]
[Contact name] — [Outcome one line]

Detail:
- [bullet 1]
- [bullet 2]

Next: [action] by [DATE]
Tags to apply: [hot-buyer / seller-lead / past-client / source-zillow / etc.]
```

**Task format (paste into FUB > Person > Tasks):**

```
[Action verb] [Contact name] re [topic]
Due: [DATE]
Assigned: [Agent]
Why: [1-line context]
```

**Tag library — standard FUB tag set (agent suggests):**

| Tag | Trigger |
|---|---|
| `hot-buyer` | BANT-R complete, pre-approved, ready to make offers within 14 days |
| `warm-buyer` | Pre-approved, 1–3 month timeline |
| `nurture-buyer` | Browsing, 3+ months |
| `hot-seller` | Listing presentation booked or appointment within 14 days |
| `warm-seller` | Appraisal interest, 1–3 month timeline |
| `nurture-seller` | Curious about value, 6+ months |
| `past-client-buyer` | Closed transaction as buyer |
| `past-client-seller` | Closed transaction as seller |
| `referral-source` | Referred someone or is likely to |
| `under-contract` | Active deal |
| `closed-this-year` | Settled in current calendar year |
| `source-zillow` | Lead from Zillow |
| `source-zillow-premier` | Lead from Zillow Premier Agent paid |
| `source-realtor-com` | Realtor.com lead |
| `source-database` | From sphere |
| `source-open-house` | Walked in |
| `source-fsbo` | Was FSBO |
| `source-expired` | Was expired |
| `source-sphere` | Personal network |

**Action Plan triggers (agent suggests):**

> "Apply tag `hot-buyer` + `source-zillow` → triggers FUB's 'New Buyer Lead 7-Day' Action Plan. That'll fire:
> - Day 0: Welcome SMS + email
> - Day 1: Listings-of-interest email
> - Day 3: Phone task assigned to you
> - Day 5: SMS check-in
> - Day 7: Decision-point task
> Want me to draft the content for that plan?"

---

### kvCORE (US / CA)

**Smart CRM** (behavioural — tracks IDX site actions) + **Smart Drips** + **Smart Numbers** (SMS).

**Smart Drip brief format (paste into kvCORE Drip Campaign builder):**

```
Campaign: [NAME]
Trigger: [tag / behaviour — e.g. "New Buyer Lead from IDX"]
Audience: [criteria]

SMS 1 — Day 0, 12:00pm local:
"[≤160 chars — opening with name + value + soft CTA]"

Email 1 — Day 1, 9:00am local:
Subject: [≤60 chars]
Body: [paste]

SMS 2 — Day 3, 4:00pm:
"[≤160 chars]"

Email 2 — Day 5, 9:00am:
Subject: [≤60 chars]
Body: [paste]

Task assigned to Agent — Day 7:
"Call [Name] for status check"

Drop-off rule: After 14 days no engagement, move to "Long-term Nurture" plan.
```

---

### Chime / Lofty (US)

Same structure as kvCORE. Same drip brief format works.

---

### Top Producer (US — legacy)

Contact + Plans + Activities. Use the universal note format. Top Producer's "Action Plans" mirror FUB's.

---

### LionDesk + Wise Agent (US — solo agents)

Use universal note format directly.

---

### HubSpot / Pipedrive / Salesforce (cross-region)

**Pipedrive specifics:**
- Treat each transaction (listing or buyer engagement) as a Deal.
- Pipeline stages: New Lead → Qualified → Viewing Booked → Offer → Under Contract → Settled.
- Activity log = interactions (Call / Email / Meeting / Task).

**HubSpot specifics:**
- Contact → Deal → Activity timeline.
- Use HubSpot's mass-email module for vendor / buyer drips.

**Salesforce specifics:**
- Account (the household) → Contact (individuals) → Opportunity (the transaction) → Activity.
- Heavy customisation common; the agent uses what fields exist.

---

## Output rules for the agent

- **Always offer the CRM-paste version** after any interaction-shaped output: "Want me to write the [CRM]-formatted note for that conversation?"
- **Default to the universal format** unless the user has told you which CRM they use — then mirror that CRM's preferred shape.
- **Never invent** a name, contact detail, address, or fact. Use the user's words.
- **Keep notes tight** — CRMs are searchable; verbose notes get ignored.
- For activity-log lines: **ONE line per touch**. Multi-line = stage note or first-contact note.
- **Tag every lead with a source** on day 1, never edited later.
- **Set the next-contact date** in every note. No floating leads.
