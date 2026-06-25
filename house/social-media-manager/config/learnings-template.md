# learnings.md

The running log of what works and what doesn't for *this* account.
Updated every Friday by `12-weekly-learnings.md`. Read by every later
skill so the agent gets sharper, not just faster.

```
LEARNINGS — Brand: <business name>
==================================
Updated:           <YYYY-MM-DD>
Weeks tracked:     <N>
Region:            <AU | NZ | UK | US | CA>

## Hooks that landed

Pattern → win rate over rolling 4 weeks.

- "<hook text>"
    Pattern:    <contrarian / specific-number / mistake-callout /
                 question / personal-story / result+skepticism>
    Platform:   <IG / TikTok / LinkedIn / etc.>
    Posted:     <date>
    Metric:     <e.g. 12% reach lift vs pillar average,
                 4.2× saves vs pillar average>
    Why:        <one line theory>

- "<hook text>"  → ...

## Hooks that flopped (stop using)

- "<hook text>"
    Platform:   <...>
    Posted:     <date>
    Theory:     <why it likely flopped — off-voice / wrong platform /
                 over-clever / mistimed trend>

## Formats by ROI (rolling 8-week)

| Format               | Platform  | Avg reach | Avg saves | Avg shares | Avg link clicks | Verdict     |
|---|---|---|---|---|---|---|
| Reel slow-mo demo    | IG        |           |           |            |                 | Keep weekly |
| Carousel 4-slide     | IG        |           |           |            |                 | Keep biweek |
| Talking-head 30 sec  | TikTok    |           |           |            |                 | Test more   |
| Single image quote   | LinkedIn  |           |           |            |                 | Drop        |
| Document post 10 pg  | LinkedIn  |           |           |            |                 | Keep weekly |
| Long-form 10 min     | YouTube   |           |           |            |                 | Keep biweek |
| Photo Pin 2:3        | Pinterest |           |           |            |                 | Test more   |
| Thread 7-tweet       | X         |           |           |            |                 | Drop        |

## Pillars by metric-that-matters

| Pillar         | Pillar goal  | This week | Rolling 4-wk avg | Verdict |
|---|---|---|---|---|
| Pillar 1       | Awareness    |           |                  |         |
| Pillar 2       | Engagement   |           |                  |         |
| Pillar 3       | Leads        |           |                  |         |
| Pillar 4       | Conversion   |           |                  |         |
| Pillar 5       | Community    |           |                  |         |

## Best posting times (refined from analytics — overrides defaults)

- Instagram (feed):    <time>, <time>
- Instagram (Reels):   <time>, <time>
- TikTok:              <time>
- LinkedIn:            <time>
- YouTube long-form:   <time>
- YouTube Shorts:      <time>
- Facebook:            <time>
- X / Threads:         <time>
- Pinterest:           <time>

## Hashtag sets that performed

For each pillar, which stack version is winning:

- Pillar 1 stack:  <which version is performing best — note the 5-10
                    tags + the avg reach lift vs baseline>
- Pillar 2 stack:  ...

## CTA phrasings that converted

- "<exact CTA text>"  → <conversion lift>, <platform>, <pillar>
- ...

## Top-performing posts (rolling)

| Slot | Platform | Pillar | Hook | Format | Reach | Saves | Link clicks | Notes |
|---|---|---|---|---|---|---|---|---|

## Bottom-performing posts (rolling)

| Slot | Platform | Pillar | Hook | Format | Reach | Saves | Link clicks | Why it flopped |
|---|---|---|---|---|---|---|---|---|

## Trends we tried and dropped

- <trend>  → <reason it didn't fit the brand — peaked before we
              posted / off-voice / audience didn't respond>

## Audience signal — what the comments say

What followers are asking, complaining about, or repeatedly responding
to:

- <theme>  → <frequency, slant>

Use these to seed next month's pillars or new content angles.

## Open experiments

- [ ] <thing we're testing this week — definition of done — by when>
- [ ] ...

## Closed experiments

- [x] <what we tested — what we learned — verdict (adopt / drop / iterate)>

## Banned, refined

Words / phrases / formats we've added to the banned list because they
flopped or sounded off-brand:

- "<word>"  — flopped/off-voice
- "<phrase>"  — engagement-bait read
- "<format>"  — no longer fits voice

## Algorithm notes (per platform)

Quirks the agent has noticed and adjusted for:

- Instagram:  <e.g. "Posts with 7+ slides are getting +18% saves vs
               4-slide — bias longer carousels">
- TikTok:     <e.g. "Hook arriving at 1.5s is fine; 2s+ tanks
               completion">
- LinkedIn:   <e.g. "Posts that ask a question in line 2 get 3×
               comments — keep using">
- YouTube:    <e.g. "Thumbnails with face + 3 words outperform face
               + 5+ words">

## Quarterly review prompts

Every 12 weeks, the agent steps back and asks:

- Are any pillars going stale? (If a pillar hasn't moved metrics in
  6+ weeks, retire or rotate it)
- Is the audience the same as it was 12 weeks ago? (If comments
  drift, audience may have shifted — re-do ICP)
- Are any platforms costing more than they pay? (If 1 hour of
  LinkedIn = 50 followers vs 1 hour of TikTok = 500, rebalance)
- Is the brand voice still right? (Re-read voice examples — do they
  still sound like the brand wants to sound?)

## Cross-account / agency-level insight

(Only if agency mode — leave blank for single-brand setups)

What's working across multiple clients in similar verticals — flag
for testing on this client:

- <cross-client pattern>  → <test on this brand?>

```

## How the agent uses it

Every ideation session, every script, every caption: the agent reads
this file FIRST and **uses it before generic best-practice**.

If "Reel slow-mo demo" is in the Keep column, the agent proposes more
of that. If "Single image LinkedIn" is in the Drop column, the agent
doesn't propose single-image LinkedIn posts again unless you
explicitly override.

If a hook framework is in the "Hooks that landed" list, the agent
biases new hook drafts toward that framework. If a framework is in
the "Hooks that flopped" list, the agent avoids it.

Every Friday: `12-weekly-learnings.md` updates this file with the
week's data.

## When data is missing

The agent **never invents numbers**. If a slot's analytics weren't
captured, the entry stays blank and the slot doesn't influence
rolling averages until the data is supplied.

## When learnings conflict

Sometimes two weeks of data tell opposing stories. Rule:

- **One week is signal, not verdict.**
- **Three weeks of the same direction is a pattern.**
- **Six weeks is a rule.**

The agent reflects this in confidence language — "this week suggests
X (1 week of signal)" vs "carousels consistently outperform Reels for
this brand (8 weeks of pattern, n=24 posts)".
