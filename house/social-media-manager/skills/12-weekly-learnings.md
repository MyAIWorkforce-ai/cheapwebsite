---
name: social-weekly-learnings
description: End-of-week report. Pull what posted, what landed, what flopped. Update learnings.md with new winners + losers. Brief next week's calendar with the insight already baked in.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Weekly learnings — what worked, what to repeat

## Your job

Close the week with a report + an updated `learnings.md`. The
learnings file is the agent's brain. It gets sharper each week, so
ideation in `04-ideate-hooks.md` keeps leaning into what's already
working for *this* account.

## Ask one thing first

> *"Paste this week's analytics. Per slot — reach, saves, shares,
> link clicks, comments, followers gained. Screenshots OK, or a
> dump from your scheduler."*

User pastes. If a slot's data is missing, ask for it. Don't guess.

## Compile the week's data

For each posted slot:

| Slot | Platform | Format | Pillar | Hook | Reach | Saves | Shares | Link clicks | Verdict |
|---|---|---|---|---|---|---|---|---|---|

Render this in a fenced block. Then read against the previous
week's averages (saved in `learnings.md`).

## Score each post

For each slot:

- **Hit** — top 25% on the metric that matters for the pillar
- **Average** — middle 50%
- **Miss** — bottom 25%

The "metric that matters" depends on the pillar's goal:

| Pillar goal | Metric to score against |
|---|---|
| Awareness | Reach + follower gain |
| Engagement | Saves + shares + comments |
| Leads | Link clicks + DM volume |
| Conversions | Bookings / purchases attributed |

## Update learnings.md

Update each section of `config/learnings-template.md`:

- **Hooks that landed** — add this week's hits
- **Hooks that flopped** — add this week's misses (with theory)
- **Formats by ROI** — recompute averages
- **Best posting times** — refine from this week's data
- **Hashtag sets that performed** — note which stacks lifted reach
- **CTA phrasings that converted** — log winners verbatim
- **Trends we tried and dropped** — any trend you tested that didn't fit
- **Open experiments** — close completed ones; log results
- **Banned, refined** — add any phrase that flopped + felt off-brand

Show the updated `learnings.md` back to the user in a fenced block.
Ask for sign-off:

> *"Updated learnings. Anything I read wrong, or anything you'd
> change before this rolls into next week's ideation?"*

## Brief next week

Once `learnings.md` is signed off, write a one-page brief for next
week that bakes the insight in:

```
NEXT WEEK BRIEF — week of <date>

Lean into:
  - <Pillar / format / hook framework that hit this week>
  - <Posting window that lifted reach>

Pull back from:
  - <Pillar / format that flopped, and why>

Test (one new thing):
  - <one new hook framework / format / hashtag stack to try>

Calendar pillars (rotation):
  - <pull from monthly rotation in 03-weekly-calendar>

Approval needed by:
  - <when next week's ideation should run by>
```

## Hard rules

- **Don't invent metrics.** If reach is missing, ask. If link clicks
  weren't tracked (no UTMs), say so — don't backfill.
- **Don't overfit.** One week is signal, not a verdict. Three
  weeks of the same hook framework hitting is signal.
- **Honest about flops.** "Hook was clever but off-voice" beats
  "audience didn't get it".

## Confirm + handoff

> *"Learnings updated, next week briefed. Ready for next Monday's
> ideation — say the word and I'll start at `04-ideate-hooks.md`
> with the new insight already loaded."*

## Done condition

- This week's data is logged
- `learnings.md` is updated and signed off
- Next week's brief is written

When done, say:
> *"Week closed. See you Monday for next week's posts."*
