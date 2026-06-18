# CRM Notes & Activity Log Templates

The bundle outputs notes in a format the agent can paste straight into
any CRM — Follow Up Boss, Vault, Box+Dice, AgentBox, Reapit, HubSpot,
Pipedrive, KVCore, BoomTown, whatever the user runs. No API needed,
no setup, no failure modes.

The same shape works because every CRM stores the same five things:
**WHO + WHAT-HAPPENED + WHEN + OUTCOME + NEXT-ACTION**.

---

## 1. Contact / lead record — the first note

When a new lead arrives, the agent generates this block. The user
pastes it into the lead's first contact note:

```
LEAD: [Name]
Contact: [phone] / [email]
Source: [portal / referral / database / open home / signboard / other]
Date received: [DATE]
Property of interest: [ADDRESS or "buying in <suburb>"]

BANT-R snapshot
- Budget: [pre-approved at $X / quoted X-Y / unknown]
- Authority: [sole / partner / co-owner involved]
- Need: [upsizing / downsizing / relocating / investing / first home]
- Timeframe: [weeks / months / browsing]
- Readiness: [pre-approved, seen properties / early stage]

Temperature: [HOT / WARM / COLD]
One-line: [the lead summary in one sentence]

Next step: [specific action]
Next contact: [DATE]
```

This works in every CRM. The fields map cleanly:
- FUB → "Person" record + first note
- Vault → "Buyer / Vendor" record + comment
- AgentBox → "Contact" + activity
- HubSpot / Pipedrive → "Contact" + first activity log

---

## 2. Activity log line — every subsequent touch

After every interaction (call, text, email, inspection, offer), the
agent generates a single line:

```
[DATE TIME] [TYPE] [CONTACT NAME] — [OUTCOME] — [NEXT ACTION by DATE]
```

**Examples:**

```
2026-06-15 14:30  CALL  James Park — Hot, partner inspecting Tue 6pm — Confirm Mon 10am
2026-06-15 16:00  SMS   Priya Mehta — Sent comp pack — Follow up Thu
2026-06-16 09:15  EMAIL Sarah & Tom Clark — Replied with finance Q — Loop in their broker today
2026-06-16 11:00  OPEN  14 Oxford St — 12 groups, 3 hot, 1 verbal — Send post-open by 6pm
2026-06-17 10:00  OFFER 14 Oxford St — $1.76M from Park — Present to vendor 2pm
```

**Types** (keep these consistent across all logs so reports are clean):
- `CALL` — phone call
- `SMS` — text message
- `EMAIL` — email
- `OPEN` — open inspection
- `PRIV` — private inspection
- `OFFER` — written offer activity
- `APPT` — appointment / meeting
- `LIST` — listing-presentation
- `NOTE` — internal note / observation
- `OTHER`

The agent should generate these AS-YOU-GO — at the end of every
conversation, offer to write the log line for the CRM.

---

## 3. Stage-transition note — when a lead moves up the pipeline

When a lead changes stage (Lead → Qualified → Appraised → Listed →
Under Contract → Settled), use this block to log the transition:

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

Example — Lead → Qualified:

```
STAGE CHANGE: Lead → Qualified Buyer
Date: 2026-06-15
Trigger: BANT-R complete on call this afternoon
Key facts:
- Pre-approved $1.85M (broker confirmed)
- Partner needs to inspect before offer
- Settlement window: end-of-year mandatory
- Working with no other agent
Next step: Private inspection with partner Tuesday 6pm
Next contact: Monday 10am — confirm
```

---

## 4. Lead source attribution

Every lead is tagged with a source on Day 1, never edited. Monthly
reports then show which channels actually deliver.

Standard tags (the agent uses these consistently):

| Tag | Means |
|---|---|
| `portal-<name>` | Came from a portal — `portal-zillow`, `portal-realestate-au`, `portal-rightmove` etc. |
| `referral-<name>` | Person referred them (use their name for tracking) |
| `database` | Already in the CRM — re-engaged from email blast / DM / SMS |
| `signboard` | Saw the For Sale sign / drove by |
| `open-home` | Walked in to an open inspection |
| `social-<platform>` | `social-instagram`, `social-tiktok`, `social-facebook` |
| `paid-ads-<channel>` | `paid-ads-meta`, `paid-ads-google` |
| `direct` | They asked for the agent by name |
| `cold-outreach` | Agent initiated (door-knock, expired listing, FSBO) |
| `other-<source>` | Anything else, named |

Never `unknown` — if you don't know, ask the lead in the first call.

---

## 5. Vendor file note — listing presentation aftermath

After a listing presentation, the agent writes this for the CRM
vendor file:

```
LISTING PRESENTATION: [ADDRESS]
Date: [DATE]  Time on-site: [MINUTES]
Vendor(s): [NAMES]

Property facts captured
- Beds/baths/car: [X / Y / Z]
- Land / floor: [SIZE]
- Standout features: [LIST]
- Condition: [CONDITION]

Vendor motivation: [WHY THEY'RE SELLING]
Timeframe: [WHEN]
Other agents seen: [NAMES + quoted prices]

Pricing discussion
- Vendor's expectation: $X
- Comp evidence given: [LIST]
- Recommended guide: $X – $Y
- Agreed strategy: [auction / private treaty / EOI / price]

Marketing discussion
- Recommended VPA / spend: $X
- Photography: [date booked]
- Open home schedule: [X per week]

Won listing? [YES / NO / PENDING]
If YES: launch date [DATE], agreement signed [DATE]
If NO: reason [REASON] — re-engage [DATE]
If PENDING: vendor needs [WHAT] — follow up [DATE]
```

---

## 6. Post-settlement note — the referral hook

After settlement, log this in the CRM and set a reminder for the
3-month referral-ask:

```
SETTLED: [ADDRESS]
Settlement date: [DATE]
Sale price: $[X]
Days on market: [X]
Sale-to-list ratio: [X%]
Buyer: [NAME] (now in database as past-buyer)
Vendor: [NAME] (now in database as past-vendor)
Key relationship notes: [referral-likely, hands-off, prefers SMS, etc.]

Next touches scheduled:
- Move-in week thank-you: [DATE]
- 30-day check-in: [DATE]
- 90-day referral ask: [DATE]
- Annual house-anniversary card: [DATE]
```

Past clients are 60–80% of a top agent's future business. The note
+ reminders make sure that doesn't slip.

---

## Output rules for the agent

- Always offer the CRM-paste version after any interaction-shaped
  output ("Want me to write the CRM note for that conversation?").
- Default format is the one above unless the user pastes in their
  CRM's preferred structure — then mirror that.
- Never invent a name, contact detail, or fact. Use the user's words.
- Keep notes tight — no fluff. CRMs are searchable; verbose notes get
  ignored.
- For activity-log lines, ONE line per touch. Multi-line = stage note.
