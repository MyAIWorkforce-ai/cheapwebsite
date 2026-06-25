---
name: social-weekly-calendar
description: Build a weekly + monthly calendar mapping pillar → platform → post format → peak window. Sustainable cadence first; volume second. Platform-specific cadence (IG 4-7/wk, LinkedIn 3-5/wk, TikTok daily, YouTube 1-3/wk, X 5+/day). Time-zone-aware. Three posts a week kept beats seven posts skipped.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Calendar — the rhythm we'll actually keep

## Your job

Turn pillars + platforms + the user's available hours/week into a
sustainable calendar. Pillars rotate so no pillar disappears for a
month. Slots are scheduled into the **peak windows** logged in the
BRAND CONFIG (or pulled from `knowledge/regional-reference.md`
defaults).

The cadence respects platform algorithm rhythm (TikTok wants daily,
LinkedIn wants 3-5/wk, YouTube wants weekly long-form + Shorts in
between) and the user's actual capacity.

## Per-platform cadence ceiling

Pull from `knowledge/platform-spec-sheet.md` — summary here:

| Platform | Floor (algo de-prioritises below) | Standard | Ceiling (more = fatigue) |
|---|---|---|---|
| Instagram (Reels) | 3/week | 4-7/week | 14/week (2/day) |
| Instagram (feed) | 2/week | 3-5/week | 7/week (1/day) |
| Instagram (Stories) | 0 — optional | 3-10/day | 30+/day |
| TikTok | 3/week | 1-3/day | 5+/day (only if you can hit quality) |
| LinkedIn (personal) | 2/week | 3-5/week | 7/week (1/day) |
| LinkedIn (Company Page) | 0 — optional | 1-2/week | 5/week |
| YouTube long-form | 1/week | 1-2/week + 3-5 Shorts | 3 long/week + daily Shorts |
| YouTube Shorts | 3/week | 3-5/week | 14+/week (2/day) |
| Facebook (Page) | 2/week | 3-5/week | 14/week (2/day) |
| X / Twitter | 3-5/day | 5-10/day | 30+/day |
| Threads | 3/day | 3-10/day | 20/day |
| Pinterest | 3/week | 5-25 pins/week | unlimited (most brands undershoot) |

## Cadence map by user hours

Set total weekly cadence honestly against hours/week:

| Hours/week | Suggested total cadence | Platform spread |
|---|---|---|
| < 2 hrs | 3 posts/week | 1 platform — primary |
| 2-4 hrs | 4-5 posts/week | 1-2 platforms + 1 short-form video |
| 4-8 hrs | 6-8 posts/week | 2-3 platforms + 2-3 short-form videos |
| 8-15 hrs | 10-14 posts/week | 3 platforms + daily on primary |
| 15-30 hrs (small team or agency-managed) | 20-30 posts/week | 4+ platforms; daily primary + Shorts/Reels repurposed |
| 30+ hrs (in-house team) | 40+/week | Full multi-platform with paid amplification |

Push back gently if the user under-budgets:

> *"Three sustained beats seven planned. Want me to set this at 3/week
> and we can grow once you're hitting it consistently — or hold at 5
> and we'll trim if you can't keep up?"*

## Weekly grid

For the chosen cadence + platforms, render this in a fenced markdown
block. Tag every slot with pillar + format + peak window:

```
WEEKLY CALENDAR — <Business>, <hours/week>, <region timezone>
================
Mon  9am   IG Reel              Pillar 1 (Educate)    → peak: Mon 9-10am
Mon  7pm   IG Reel              Pillar 3 (Hot take)   → peak: Mon 7-9pm
Tue  8am   LinkedIn text post   Pillar 4 (Founder)    → peak: Tue 7-9am
Tue  6pm   TikTok               Pillar 1 (Educate)    → peak: Tue 6-10pm (repurpose Mon's Reel)
Wed  12pm  Threads              Pillar 5 (Q&A)        → peak: mid-day
Wed  7pm   IG Carousel          Pillar 2 (Demystify)  → peak: Wed 7-9pm
Thu  8am   LinkedIn carousel    Pillar 2 (Demystify)  → peak: Thu 7-9am
Thu  6pm   TikTok               Pillar 4 (Founder)    → peak: Thu 6-10pm
Fri  3pm   IG Story Q&A         Pillar 5              → peak: late afternoon
Sat  10am  IG single-image      Pillar 3              → peak: Sat 10am-12pm
Sat  3pm   YouTube Shorts       Pillar 1 (Educate)    → peak: Sat 3-7pm
Sun  —     OFF                   (rest day)            
```

Rules baked in:

- Every slot tagged with pillar + peak window + local time
- "Off" days protected — burnout kills cadence
- Reels / TikToks repurposed across platforms (note "repurpose Mon's
  Reel" in the slot)
- One Story Q&A weekly minimum (low-effort engagement)
- Peak windows pulled from BRAND CONFIG (or `knowledge/regional-
  reference.md` defaults; refined from `learnings.md` once 4+ weeks
  of data exist)
- Pillars rotate so no two consecutive slots run the same pillar
- Mix of formats per platform (no week of just talking-heads)

## Per-platform timing per region

Pull from `knowledge/regional-reference.md`. Defaults are starting
points; `learnings.md` overrides after 4 weeks.

If region = **AU/NZ** and timezone = AEST/AEDT/NZST/NZDT:

```
Instagram (feed):    Tue 7-9pm, Thu 7-9pm, Sat 10am-12pm
Instagram (Reels):   Daily 7-10am, 12-1pm, 7-10pm
TikTok:              Daily 6-10pm + 7-9am
LinkedIn:            Tue-Thu 7-9am, 12-1pm
Facebook:            Wed-Fri 1-4pm
YouTube Shorts:      Daily 3-7pm
X / Threads:         Weekdays 7-9am, 5-7pm
```

If region = **UK**, GMT/BST:

```
Instagram (feed):    Tue 12-2pm, Wed 6-8pm, Sat 10am-12pm
Instagram (Reels):   Daily 7-9am, 12-2pm, 7-9pm
TikTok:              Daily 6-10pm + 8-10am
LinkedIn:            Tue-Thu 7-9am, 12-1pm
Facebook:            Mid-day weekdays, evenings weekends
YouTube Shorts:      Daily 4-8pm
```

If region = **US**, EST/EDT (Pacific shift -3hr):

```
Instagram (feed):    Mon-Wed 11am-1pm, evenings 7-9pm
Instagram (Reels):   Daily 7-9am, 11am-1pm, 7-10pm
TikTok:              Daily 6-10am + 7-11pm
LinkedIn:            Tue-Thu 8-10am, 12-2pm
Facebook:            Wed-Fri 1-3pm
YouTube Shorts:      Daily 12-3pm, 6-9pm
```

If region = **CA**, ET (BC/AB shift -2 to -3hr):

```
Same as US Eastern with -2 to -3hr shift for BC/AB.
```

## Monthly view — pillar rotation

In a separate fenced block, show 4 weeks at a glance so no pillar
goes dormant:

```
MONTHLY ROTATION — <Month>
==========================
Week 1 — P1, P3, P2, P4, P5, P1, P2  (12 slots)
Week 2 — P3, P1, P4, P2, P5, P3, P1  (12 slots)
Week 3 — P2, P4, P1, P3, P5, P2, P4  (12 slots)
Week 4 — P4, P2, P3, P1, P5, P4, P3  (12 slots)

Pillar share over the month:
  Pillar 1 (Educate):    13 / 48 = 27%
  Pillar 2 (Demystify):  11 / 48 = 23%
  Pillar 3 (Hot take):    9 / 48 = 19%
  Pillar 4 (Founder):     9 / 48 = 19%
  Pillar 5 (Q&A):         6 / 48 = 13%
```

Sanity-check the share:

- No pillar > 40%
- No pillar < 10%
- Sale / promo pillar (if any) capped at 20%

## Calendar-aware overlays

Read the calendar from `knowledge/regional-reference.md` for the
region. Layer:

- **Solemn days** (Anzac Day, Remembrance Day, Memorial Day,
  Truth & Reconciliation Day) — no commercial posts; brand statement
  optional and only if substantive
- **Commercial peak days** (Black Friday, EOFY, Boxing Day,
  Mother's Day, Valentine's, etc.) — bias the sale/promo pillar to
  these weeks
- **Cultural moments** (Pride Month, Matariki, Hispanic Heritage
  Month, Indigenous Peoples Day) — content opportunity if brand has
  substantive relationship; rainbow-washing called out

Render the calendar overlay at the top of the monthly rotation:

```
KEY DATES THIS MONTH:
  - <date>: <event> — <approach: post / skip / brand statement>
```

## Cross-platform repurposing rules

Where slots can share an asset:

- **1 master 9:16 video** → IG Reel + TikTok + YouTube Shorts + FB Reel
- **1 master photo carousel** → IG carousel + LinkedIn document post +
  Pinterest pins (per slide)
- **1 master long-form video** → YouTube long-form + 3-5 Shorts pulled
  from it + LinkedIn video clip + 1 podcast/audio
- **1 master text post** → LinkedIn + Threads + Twitter thread
- **1 master image** → IG single + Pinterest pin + Facebook

The calendar shows repurpose paths inline (eg. "TikTok — repurpose
Mon's IG Reel"). Reduce production by ~60% with repurposing.

**Anti-pattern**: don't ship the same asset everywhere as a literal
duplicate. Strip platform watermarks. Re-write caption native to the
target platform. Adapt hook timing.

## Posting in the right local time

If the brand's audience is split across timezones (eg. AU brand
selling to UK + US), set primary peak windows for the largest
audience cluster and use secondary peaks for the rest.

For agencies running multi-country clients, use one timezone per
client config.

## Hard rules

- **Pillars rotate.** No two adjacent slots on the same pillar.
- **Peak windows respected.** Don't schedule a LinkedIn post at 11pm
  Saturday.
- **Floor cadence respected per platform.** Posting 1× per week on
  TikTok wastes the platform — agent surfaces the trade-off:
  *"TikTok at 1/wk = algorithm de-prioritises. Either go 3+/wk
  (repurpose IG Reels) or drop it."*
- **Ceiling cadence respected.** Don't schedule 4 IG Reels a day —
  the algo punishes spam.
- **Day off honoured.** At least 1 rest day per week for solo
  operators.
- **Region-aware calendar dates.** No commercial post on Anzac Day,
  Remembrance Day, Memorial Day, Truth & Reconciliation Day.

## Confirm + handoff

> *"This is the cadence. Want to swap a day-off, move a peak window,
> adjust a format slot, or rebalance a pillar before I move to
> ideating this week's hooks?"*

Save the calendar in context.

## Done condition

- Weekly grid locked with every slot tagged (pillar, platform, format,
  peak window, local time)
- 4-week monthly view locked with pillar share rendered
- Key dates overlay rendered if any fall in the next 4 weeks
- User confirmed

When done, say:

> *"Calendar set. Next: I'll generate this week's hooks — openers for
> every post slot — scored against your `learnings.md` so we pick the
> strongest before writing full captions."*

Then load `04-ideate-hooks.md`.

## When to re-run this skill

- Brand adds or drops a platform
- User's hours-per-week change (more capacity, less capacity)
- Quarterly pillar review (one pillar retired, one added)
- New region added (timezone + peak windows change)
- Major calendar event ahead (EOFY, Black Friday, Christmas) —
  re-build for the campaign window
