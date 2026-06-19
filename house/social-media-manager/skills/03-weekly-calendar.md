---
name: social-weekly-calendar
description: Build a weekly + monthly calendar mapping pillar → platform → post format → peak window. Sustainable cadence first; volume second. Three posts a week kept is better than seven posts skipped.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Calendar — the rhythm we'll actually keep

## Your job

Turn pillars + platforms + the user's available hours/week into a
sustainable calendar. Pillars rotate so no pillar disappears for a
month. Slots are scheduled into the **peak windows** logged in the
BRAND CONFIG.

## Cadence map

Set cadence honestly against hours/week:

| Hours/week | Suggested cadence |
|---|---|
| < 2 | 3 posts/week. 1 platform. Mostly static. |
| 2–4 | 4–5 posts/week. 1–2 platforms. + 1 short-form video. |
| 4–8 | 6–8 posts/week. 2–3 platforms. + 2–3 short-form videos. |
| 8+ | Daily on primary, 4–5 on secondaries. Multiple videos. |

Push back gently if the user under-budgets. *"Three sustained beats
seven planned."*

## Weekly grid

For the chosen cadence + platforms, render this in a fenced markdown
block. Tag every slot with pillar + format + peak window:

```
WEEKLY CALENDAR — <Business>, <hours/week>
================
Mon  IG Reel        Pillar 1  → peak: Mon 7-9pm
Tue  —              (off — reply day)
Wed  IG Carousel    Pillar 3  → peak: Wed 7-9pm
Thu  TikTok video   Pillar 1  → peak: Thu 6-10pm  (repurpose Mon's Reel)
Fri  IG Story Q&A   Pillar 2  → peak: Fri 5-7pm
Sat  —              (off)
Sun  IG Single Pic  Pillar 2  → peak: Sun 10am-12pm
```

Rules baked in:

- Every slot tagged with pillar + peak window
- "Off" days protected — burnout kills cadence
- Reels / TikToks repurposed across platforms
- One Story Q&A weekly minimum (low-effort engagement)
- Peak windows pulled from BRAND CONFIG (refined from learnings.md
  once 4+ weeks of data exist)

## Monthly view — pillar rotation

In a separate fenced block, show 4 weeks at a glance so no pillar
goes dormant:

```
MONTHLY ROTATION
================
Week 1 — Pillars 1, 3, 2, 1, 2
Week 2 — Pillars 3, 1, 2, 3, 1
Week 3 — Pillars 1, 2, 3, 1, 3
Week 4 — Pillars 2, 1, 3, 2, 1
```

## Confirm + handoff

> *"This is the cadence. Want to swap a day-off, move a peak, or
> adjust a format slot before I move to ideating this week's hooks?"*

Save the calendar in context.

## Done condition

- Weekly grid locked
- 4-week monthly view locked
- User confirmed

When done, say:
> *"Calendar set. Next: I'll generate this week's hooks — openers
> for every post slot — scored against your `learnings.md` so we
> pick the strongest before writing full captions."*

Then load `04-ideate-hooks.md`.
