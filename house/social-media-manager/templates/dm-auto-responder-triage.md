# DM auto-responder triage script

For brands using Instagram, Facebook, or LinkedIn DM auto-responders
(via Manychat, Chatfuel, Many.bot, or native Meta Business Suite
greeting messages). Templates for the opening message + the triage
tree that routes inbound DMs to the right path.

Auto-responders are not a substitute for human reply — they're a
holding pattern that buys the user time and qualifies inbound traffic.

---

## When to use a DM auto-responder

- **High inbound DM volume** (>10/day, sustained)
- **Predictable common questions** (pricing, hours, "do you do X")
- **Lead-magnet flow** (someone DMs a keyword to get a resource)
- **Sales-qualification** (filter buyers from window-shoppers)

When NOT to use:

- Low DM volume — auto-replies feel cold for a 5-DM-a-day brand
- Brand voice that doesn't suit automation (clinical, premium, very
  personal)
- Regulated category where a robot response could be misread as
  advice

---

## Opening message template

The first DM the user sees when they DM you fresh (no prior contact).

```
Hey! Thanks for the DM.

Quick — what brought you here? Pick one:

1. <Lead magnet> — DM "GUIDE"
2. Booking / pricing — DM "BOOK"
3. Just a question — type away, I'll get back to you within 24h

— [your name]
```

### Rules

- Brand voice match (clinical brand = no "Hey!" exclamation; tradie
  brand = "G'day")
- Three options max — more confuses
- One clear option for "I just want to talk" — auto-responders that
  force a menu kill conversation
- Always mention the human response time ("within 24h") so they
  don't expect instant

---

## Keyword triage tree

Each keyword triggers a different flow.

### Keyword: "GUIDE" (or "PLAN", "PDF", "RESOURCE")

```
Sweet — here's the [name of resource]:

[Link]

Heads up: it's [one-line description of what's in it]. If you
have questions after going through it, just DM back.

— [your name]
```

Then the system tags the lead with "GUIDE_REQUESTED" so the agent
follows up in 48h if no further engagement.

### Keyword: "BOOK" (or "PRICE", "QUOTE", "HIRE")

```
Awesome. Quick: [one qualifying question that helps you scope].

Once I know that, I can [send pricing / send the booking link /
get back to you with options].
```

The qualifying question varies by brand. Examples:

- **Physio:** "Quick: is this for an injury, a screen, or training
  support?"
- **Cafe (event hire):** "Quick: roughly how many people, and what
  date are you thinking?"
- **Coach:** "Quick: what's the main thing you're working toward
  right now?"

The system tags as "BOOKING_INTENT" and surfaces to the user via the
sales triage in `11-engagement-replies.md`.

### Keyword: "STOP" (or "UNSUBSCRIBE")

```
No worries — won't message again. If you change your mind, send any
message and I'll be back.
```

The system tags as "OPTED_OUT" and pauses any follow-up sequences
for that user.

### Keyword: anything else (free-form)

The auto-responder doesn't attempt to answer free-form messages.
Instead:

```
Got it — let me read this properly and come back to you within 24h.

— [your name]
```

Tagged as "HUMAN_NEEDED" and surfaced to the user in the next DM
triage pass.

---

## Lead-magnet delivery flow (DM → resource → follow-up)

For brands using DM keywords to deliver lead magnets:

### Step 1 — Inbound DM with keyword

User DMs "GUIDE".

### Step 2 — Auto-responder delivers

Auto-responder fires the resource link within 5 seconds.

### Step 3 — System tags + waits 24h

If no further user activity, system queues a follow-up.

### Step 4 — 24h follow-up DM

```
Hey — sent you the [resource] yesterday. Did it land?

If you've had a chance to skim it, two questions to gauge the
biggest blocker right now…

— [your name]
```

(The two questions are pillar-specific. Example for a fitness coach:
"What's the longest you've trained consistently before stopping?
What's the gap that always pulls you back in?")

### Step 5 — Tag + route based on reply

User reply → tag as "ENGAGED" + agent drafts a personalised
follow-up in `11-engagement-replies.md`.

No reply → tag as "COLD" + drop from sequence after 7 days.

---

## Sales-qualification flow (DM → qualify → book)

For brands selling services:

### Step 1 — Inbound DM with "BOOK"

User DMs "BOOK" or asks about pricing.

### Step 2 — Auto-responder qualifying question

Per the keyword tree above.

### Step 3 — User answers

Tagged + surfaced to human via `11-engagement-replies.md`.

### Step 4 — Human reply (agent-drafted)

Personalised based on the answer. Drops booking link or sets up call.

### Step 5 — Booking confirmation

If user books, auto-responder sends:

```
Locked in for [date + time]. Calendar invite on its way.

Anything specific you want to make sure we cover? Drop it here so
I can prep.

— [your name]
```

If user doesn't book within 48h, auto follow-up:

```
Hey — saw you were keen to book. Anything blocking? Happy to swap
times if [date] doesn't suit.

— [your name]
```

---

## Tools to set this up

| Tool | Best for | Notes |
|---|---|---|
| **Meta Business Suite (native)** | Basic greeting + away message | Free, limited triage logic |
| **Manychat** | Most flexible IG/FB/WhatsApp bot | Drag-drop flows, lead tags |
| **Chatfuel** | Similar to Manychat | |
| **Many.bot** | Lightweight | |
| **MobileMonkey** | Multi-channel | |
| **LinkedIn**: Sales Navigator + Crystal | LinkedIn DM personalisation | |
| **Native Twitter/X DM auto-reply** | Premium only | Limited triage |

---

## Compliance — don't break disclosure rules

- **DM auto-replies count as commercial communication** in CA (CASL),
  UK (GDPR + PECR for marketing), EU (GDPR), US (CAN-SPAM applies
  loosely to messaging).
- **Consent**: don't add DM senders to email marketing lists without
  explicit opt-in.
- **Identification**: DM auto-responder should make clear it's
  automated if the bot is doing more than a greeting. "Hey, this is
  [name]'s assistant" or similar.
- **Honesty**: don't pretend the bot is the human — surfaces badly
  when caught.
- **Australia**: ACMA Spam Act applies to commercial electronic
  messages including some DMs.
- **Quebec**: Law 25 applies to any commercial DM — French ≥ English
  in commercial communications.

---

## Voice variants by brand archetype

### Clinical / health brand

```
Hi — thanks for the message. Quick: which of these brought you in?

1. Injury or pain — DM "SCREEN"
2. Booking an appointment — DM "BOOK"
3. Just a question — type away, I'll reply within 24h
```

### Tradie / service brand

```
G'day, cheers for the message. Quick:

1. Need a quote — DM "QUOTE"
2. After hours emergency — call [number] direct
3. Anything else — type away, I'll come back in 24h
```

### B2B / SaaS

```
Thanks for the DM. To get you to the right place fast:

1. Demo / pricing — DM "DEMO"
2. Support — please use [support URL] for fastest response
3. Something else — drop your question, I'll reply within 24h
```

### Solo creator

```
Hey, thanks for sending! Pick one to start:

1. The [resource name] — DM "GUIDE"
2. Working together — DM "CALL"
3. Just a question — drop it, I'll reply soon
```

### Cafe / hospitality

```
Thanks for the message! Quick:

1. Booking a table — DM "BOOK"
2. Event hire / private use — DM "EVENT"
3. Hours / location — [auto-respond with info]
4. Anything else — type and I'll get back to you
```

---

## When the auto-responder breaks

Common issues:

- **Keyword detection fragile** — fix: handle case + common typos
  ("BOOk", "book", "Booking" all trigger BOOK flow)
- **Bot tone clashes with brand voice** — fix: rewrite per voice
- **Auto-responder fires on returning customer** (loses warmth) —
  fix: condition on "first-DM-from-this-user" only
- **Sales lead lost in queue** — fix: surface BOOKING_INTENT tags
  with higher priority in `11-engagement-replies.md`

---

## Logging into learnings.md

Track:

- Which keywords trigger most
- Conversion rate from keyword → booking
- Drop-off points in the lead-magnet → follow-up flow
- Auto-responder messages that get negative reactions

Feed back into `12-weekly-learnings.md` and refine messaging.
