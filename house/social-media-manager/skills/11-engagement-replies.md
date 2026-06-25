---
name: social-engagement-replies
description: Triage comments and DMs. Sort each into "respond / save for FAQ / route to sales / hide / report / ignore". Draft reply-ready text matching BRAND CONFIG voice. Community-building patterns. Sale-ready conversion flow. Crisis-detection — anything legal-adjacent or reputational surfaces immediately.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Engagement — replies + DMs + community

## Your job

Triage incoming comments and DMs. Sort each into one of six categories:

1. **Respond** — agent drafts a reply, user pastes
2. **Save for FAQ** — common question worth turning into a future post
3. **Route to sales** — buying-intent signal; agent drafts a DM
   handoff
4. **Hide** — spam, dead-link, off-topic; quietly remove
5. **Report** — abusive, threatening, illegal; report + block
6. **Ignore** — passive noise (emoji-only with no engagement value)

Most one-person businesses lose social momentum on replies, not on
posting. Reply triage keeps the relationship alive without burning
the user out.

## Why this skill matters

Algorithm signal on every platform now weights:

- **DMs from a post** as high-value conversion signal (Instagram and
  TikTok explicitly weight)
- **Substantive comments** (>4 words) and **comment replies** as
  engagement
- **Speed of reply** as a freshness signal — Instagram rewards
  comments replied to within an hour

Triage cleanly + quickly = brand grows faster than posting more.

## Conversation flow

Open with:

> *"Paste the last 24-48h of comments + DMs you want triaged. I'll
> sort them into respond / save for FAQ / route to sales / hide /
> report / ignore, and draft replies for the ones to respond to."*

User pastes a batch. Could be:
- Direct copy-paste from Instagram inbox
- Screenshot text (user OCRs)
- Export from a unified inbox tool (Buffer, Sprout, Metricool,
  Hootsuite Streams)
- Single comment / DM in real time

## Triage logic

For each comment / DM:

### Category 1 — Respond

Signals:
- Genuine question ("where do I get X?", "how long does this take?",
  "what shoes are those?")
- Personal share ("I'm dealing with the same thing")
- Thoughtful agreement ("This is exactly what I've been thinking
  about")
- Thoughtful disagreement ("I get your point but I'd argue the
  opposite — here's why")
- Compliment with context ("Used your tip last week and it worked,
  thanks")

Action: Draft a reply.

### Category 2 — Save for FAQ

Signals:
- Same question asked 3+ times across the week (or once, but it's a
  good question that will recur)

Action: Flag as a post idea for next week's ideation. Log in
`learnings.md` → Audience signal section.

### Category 3 — Route to sales

Signals:
- "How much?"
- "Can I book?"
- "Do you work with [type of client]?"
- "I have a [problem you solve] — can you help?"
- DM with a specific case/job/need
- Reply to a sale/promo post asking for next steps

Action: Draft a qualifying DM that opens the conversation. Don't
hard-sell. Move them to booking link / Calendly / your inbox.

### Category 4 — Hide

Signals:
- Spam (e.g. "follow me back!", "💯💯💯" with nothing else,
  link-spam, follow-bait)
- Off-topic noise that doesn't add value
- Dead links / bot replies
- Promo from competitors

Action: Hide on Instagram, Facebook. On TikTok, "Filter". On
LinkedIn, no native hide; delete or report. On X, mute.

### Category 5 — Report

Signals:
- Threats, harassment, slurs, doxxing
- Illegal content (CSAM, criminal solicitation)
- Impersonation of the brand
- Coordinated review-bombing

Action: Report to the platform + block. Surface to the user
immediately — these are not for the agent to triage solo.

### Category 6 — Ignore

Signals:
- Emoji-only with no question or substance (😍🔥)
- Generic compliment ("Nice!")
- Comments that don't need acknowledgment to keep relationship warm

Action: Skip. No reply needed.

### Priority hierarchy (when a comment fits two)

```
Sales > Respond > FAQ > Report > Hide > Ignore
```

A "how much?" comment with a friendly compliment → route to sales,
not "respond".

A spammy comment from a verified competitor → hide, not respond.

## Output — triaged batch

```
TRIAGE — <date-range>, <N items>

RESPOND (<count>)
  1. Comment: "<text>"
     From:    @<handle>
     Platform: <IG | TikTok | LinkedIn | etc.>
     Post:    <which post — title/hook for context>
     Draft reply: "<draft, matching BRAND CONFIG voice>"
     Notes:   <anything user needs to know — e.g. "this person has
              commented 3 posts in a row, warm relationship">

  2. ...

SAVE FOR FAQ (<count>)
  1. "<question text>"  ×<times-asked>
     → Post idea for next week: <one-line>
     → Log in learnings.md → Audience signal

ROUTE TO SALES (<count>)
  1. DM from @<handle>: "<text>"
     Buying signal: <"How much" / "Can I book" / specific job>
     Draft DM (opener):
       "<short reply that qualifies + opens the conversation>"
     Next step: <booking link / Calendly / call back / quote>

HIDE (<count>)
  1. "<text>"  — Reason: <spam / off-topic / dead link>
     Platform action: <Hide on IG / Filter on TikTok / Delete on LI>

REPORT (<count>)
  1. "<text>"  — Reason: <harassment / threat / impersonation>
     → SURFACING TO USER NOW — please review and report via
       platform reporting flow.

IGNORE (<count>)
  (just count; no drafts)
```

## Reply rules

### Match BRAND CONFIG voice

Every draft must read in the brand voice. Clinical brand → clinical
reply. Tradie brand → tradie reply. Premium brand → calm authoritative
reply.

### Keep replies short

- Comment replies = 1-2 sentences
- DM replies = 2-3 sentences max for the opener
- Reply to a thoughtful long comment can run 3-4 sentences if the
  response earns it

### Answer the question, then ask one back

Keeps the conversation alive.

> *"Yes, we treat both knees and ankles — which side's giving you
> trouble?"*

> *"Right — most people get this wrong. What's your current setup
> for this?"*

### Don't sell hard

Even on sales-routed DMs, the first reply qualifies + opens the next
step. Booking link or "want me to send you the rundown?" — not "Here's
my $497 offer."

### Banned reply patterns

- Generic thanks ("Thanks for your comment!" — adds nothing)
- "Great question!" as filler
- Emoji replies to substantive comments (reads dismissive)
- Engagement-bait ("Follow me back!")
- Upsells in reply to compliments
- Public disagreement that escalates

### Replies that consistently work

- **Acknowledge the specific thing they said** ("The bit about
  Sunday long runs hit — yeah, that's the killer")
- **Add one concrete next layer** ("Worth checking: is your strength
  work biased to one leg?")
- **Match energy** (excited comment → warm reply, dry comment → dry
  reply)
- **Use their name if visible**
- **Drop a question they can answer with one line**

## Community-building patterns

### Post-engagement loop

When someone comments substantively on 3+ posts, the brand should:

1. Like all their comments fast
2. Reply to the most substantive one with something earned
3. After a few weeks, consider a DM to acknowledge them by name —
   *"Hey, noticed your comments — what's the situation you're working
   through?"*

This is how 1-1 relationships build off social.

### Reply-to-reply

If a commenter replies to your reply, **reply again** within an hour.
Keeps the thread alive + boosts the post's algorithm signal.

### Pinning comments

If a really good comment lands (insightful, on-brand, well-articulated),
pin it. Sends the signal of the kind of comments you want.

### Asking the audience to respond

In a caption: "What's your take?" or "Anyone else seen this?" — only
ask if you'll be there to reply. Asking and not replying = trust
broken.

## Sale-ready DM flow

When a buying-intent DM comes in, the standard flow:

### Step 1 — Acknowledge + qualify

```
Hey [name] — thanks for the message. Quick: [one qualifying question
that helps you scope].
```

Example for a physio:
> *"Hey Sarah — thanks for the message. Quick: is it both knees, or
> the right one acting up after long runs?"*

### Step 2 — Provide value + open next step

Once you have one piece of context, give them something useful AND
the next step:

```
[Specific to their situation, 1-2 sentences.]

[Next step — booking link, quote, call.]
```

Example:
> *"Sounds like the lateral knee thing — really common. Easiest
> next step is a 30-min consult — we'll screen the hip + knee and
> map out a plan. Booking link here: [URL]. Or if you'd rather hop on
> a call first, my Calendly is [URL]."*

### Step 3 — Soft close (not in the first 2 messages)

Only after the prospect has engaged 2-3 times do you push for a
specific commitment.

### Don't

- Send a "thanks for your interest!" with no value
- Ask 5 qualifying questions in row 1
- Open with the price
- Drop the booking link in message 1 with no context
- Ghost after asking the qualifying question

## Flag anything legal-adjacent

Agent does NOT auto-draft a reply for:

- Medical advice ("Should I take ibuprofen for this?")
- Financial advice ("Should I buy this stock?")
- Legal advice ("Can I sue if…?")
- Refund / chargeback disputes ("I bought your course and want a
  refund")
- Threats or harassment in any direction

For these, surface immediately:

> *"This one needs your judgment — here's the comment, want me to
> flag it for a human-only reply, or send a holding response while
> you decide?"*

Holding response template:

> *"Hey [name] — appreciate you reaching out. I'll get back to you
> properly within 24 hours — want to make sure I give you a thorough
> response."*

## Crisis detection

If multiple comments in a short window are negative or coordinated:

- 5+ negative comments on the same post within 1 hour
- A repeat phrase across multiple comments (suggests coordinated
  pile-on or screenshot share)
- News mention or industry callout that has spilled into comments

The agent **stops triaging individually** and surfaces to the user
with the crisis-comms script (`templates/crisis-comms-script.md`).

## Confirm + handoff

> *"<N> drafted replies ready to paste. <M> saved for the FAQ post
> queue. <X> hidden. <Y> flagged for your judgment. Anything you want
> me to redraft, soften, or sharpen?"*

## Done condition

- Every comment / DM in the batch is categorised
- Replies are drafted for RESPOND + ROUTE TO SALES categories
- FAQ candidates are logged for next week's ideation
- Crisis-detection triggered if applicable
- Anything legal-adjacent surfaced

When done, say:

> *"Triage done. The FAQ candidates will surface again when we ideate
> next week's posts. Ready for the weekly report whenever you are."*

Then load `12-weekly-learnings.md` at end of week.

## Reading learnings.md for triage

If the brand has a "Banned, refined" list with phrases that flopped,
also avoid them in replies. If a CTA phrasing has converted ("DM
'PLAN' for the rundown"), reuse it in sales-route DMs.

## Per-platform triage notes

- **Instagram DMs**: 24h reply window matters for algo signal
- **TikTok comments**: filter spam aggressively; respond to top
  commenters first
- **LinkedIn comments**: long substantive replies win — match energy
- **X / Twitter**: speed matters more than length; reply within
  minutes during active windows
- **YouTube comments**: pin the best ones; reply to first 20 comments
  in first hour for algo signal
- **Facebook**: respond to messages within 15 min to keep
  "Very responsive to messages" badge
- **Reddit**: read the sub's rules before replying; some bans
  self-promo even in replies

## Daily cadence for engagement

- **Morning** (15-20 min): triage overnight comments + DMs
- **After each post goes live** (10 min in the first hour): reply to
  every comment in the first hour
- **Mid-day** (10 min): second pass on overnight DMs
- **Evening** (10 min): final pass, queue holding responses

About 45-60 min/day for a 4-7 post/week brand. Scales with volume.
