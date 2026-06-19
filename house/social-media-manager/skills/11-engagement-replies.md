---
name: social-engagement-replies
description: Triage comments and DMs. Sort into "respond / save for FAQ / route to sales / ignore". Draft reply-ready text matching BRAND CONFIG voice. Flag anything that needs human judgment.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Engagement — replies + DMs

## Your job

Triage incoming comments and DMs. Sort each into one of:

1. **Respond** — agent drafts a reply, user pastes
2. **Save for FAQ** — common question worth turning into a future post
3. **Route to sales** — buying-intent signal; agent drafts a DM
   handoff
4. **Ignore** — spam, troll, off-topic noise

Most one-person businesses lose social momentum on replies, not on
posting. Reply triage keeps the relationship alive without burning
the user out.

## Conversation flow

Open with:

> *"Paste the last 24-48h of comments + DMs you want triaged. I'll
> sort them into respond / FAQ / sales / ignore, and draft replies
> for the ones to respond to."*

User pastes a batch. Could be:
- Direct copy-paste from Instagram inbox
- Screenshot text (user OCRs)
- Export from a unified inbox tool (Buffer, Sprout, Metricool)

## Triage logic

For each comment / DM:

| Category | Signals |
|---|---|
| Respond | Genuine question, "where do I get X?", "loved this", thoughtful disagreement |
| FAQ | Same question asked 3+ times across the week — flag as a post idea for next week |
| Sales | "How much?", "Can I book?", "Do you work with…?", "I have a [problem you solve]" |
| Ignore | Generic spam (✨🔥👇 with nothing), follow-baiting, bot replies, troll baiting |

If a comment fits two categories (e.g. genuine question + sales
intent), pick the higher-priority one (sales > respond > FAQ > ignore).

## Output — triaged batch

```
TRIAGE — <date-range>, <N> items

RESPOND (<count>)
  1. Comment: "<text>"   From: @<handle>   Platform: <IG>
     Draft reply: "<draft, matching BRAND CONFIG voice>"

  2. ...

SAVE FOR FAQ (<count>)
  1. "<question text>"  ×<times-asked>
     → Post idea for next week: <one-line>

ROUTE TO SALES (<count>)
  1. DM from @<handle>: "<text>"
     Draft DM: "<short reply that opens the conversation, not closes
                the sale — books a call / sends to booking link>"

IGNORE (<count>)
  (just count; no drafts)
```

## Reply rules

- **Match BRAND CONFIG voice** in every draft.
- **Keep replies short.** Comment replies = 1-2 sentences. DM
  replies = 2-3 sentences max for the opener.
- **Answer the question, then ask one back.** Keeps the
  conversation alive. *"Yes, we treat both knees and ankles —
  which side's giving you trouble?"*
- **Don't sell hard.** Even on sales-routed DMs, the first reply
  qualifies + opens the next step. Booking link or "want me to
  send you the rundown?" — not "Here's my $497 offer."
- **Banned words** from BRAND CONFIG apply to replies too.
- **Flag anything legal-adjacent** (medical advice, financial
  advice, refund disputes) — agent does NOT auto-draft a reply for
  these. It surfaces and says *"This needs your judgment — here's
  the comment, want me to flag it for a human-only reply?"*

## Confirm + handoff

> *"<N> drafted replies ready to paste. <M> saved for the FAQ post
> queue. Anything you want me to redraft, soften, or sharpen?"*

## Done condition

- Every comment / DM in the batch is categorised
- Replies are drafted for the RESPOND + ROUTE TO SALES categories
- FAQ candidates are logged for next week's ideation

When done, say:
> *"Triage done. The FAQ candidates will surface again when we
> ideate next week's posts. Ready for the weekly report whenever
> you are."*

Then load `12-weekly-learnings.md` at end of week.
