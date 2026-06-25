---
name: social-weekly-learnings
description: End-of-week report. Pull what posted, what landed, what flopped. Score each post on the metric that matters for its pillar. Update learnings.md with new winners + losers + best posting times + hashtag stack performance. Brief next week with the insight already baked in.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Weekly learnings — what worked, what to repeat

## Your job

Close the week with a report + an updated `learnings.md`. The
learnings file is the agent's brain. It gets sharper each week so
ideation in `04-ideate-hooks.md` keeps leaning into what's already
working for *this* account.

For agencies running 5+ clients, this skill also produces a
client-facing monthly report on the last Friday of each month
(template at `templates/monthly-client-report.md`).

## Ask one thing first

> *"Paste this week's analytics. Per slot — reach, impressions, saves,
> shares, comments, link clicks, follower gained, video retention.
> Screenshots OK, or a dump from your scheduler. If anything's
> missing, that slot won't update averages — I won't backfill."*

User pastes. If a slot's data is missing, ask once for it. If still
missing, leave it blank and tell the user the slot is excluded from
rolling averages.

## The metric stack

For every post, the agent tries to pull these. Not every platform
exposes all of them — what's available is what's used.

| Metric | What it tells us | Why it matters |
|---|---|---|
| **Reach** | Unique accounts that saw it | Awareness signal |
| **Impressions** | Total views (includes repeat) | Volume signal — compare to reach for stickiness |
| **Engagement rate** | (Likes + comments + saves + shares) / reach | Quality signal |
| **Save rate** | Saves / reach | Strongest engagement signal — bookmark = "I'll come back" |
| **Share rate** | Shares / reach | Spreads the brand beyond followers |
| **Comment quality** | Substantive vs emoji-only | Brand-conversation signal |
| **Profile visits from post** | – | Conversion intent signal |
| **Follower gained** | Net new follows | Awareness conversion |
| **Link clicks** | Clicks on bio link or inline | Lead conversion |
| **CTR** | Link clicks / impressions | Lead efficiency |
| **Video retention curve** | Where viewers drop off | Hook strength + body pacing |
| **Average watch time** | – | Algorithm signal — directly affects reach |
| **Replays** (TikTok) | – | Strong algorithm signal |
| **Swipe-away rate** (Shorts) | – | Inverse of retention |
| **Direct messages from post** | – | Highest-value conversion signal on IG |

## Compile the week's data

For each posted slot, render:

```
WEEK <date> — Slot table
=========================

| Slot | Day | Platform | Format | Pillar | Hook | Reach | Imprs | Saves | Shares | Comments | Link clicks | Followers | Watch time | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
```

If a metric is unavailable (eg. follower gained is opaque on
LinkedIn for organic posts), leave blank.

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
| Conversions | Bookings / purchases attributed (via UTM) |
| Community | Comment quality + reply depth |

Use the rolling 4-week average for that pillar as the baseline. New
accounts (< 4 weeks of data) get exploratory scoring — agent flags
"early signal, n=X posts".

## Update learnings.md

Update each section of `config/learnings-template.md`:

### Hooks that landed

For every Hit-tier post, log:

```
- "<hook text>"
    Pattern:    <framework from the library>
    Platform:   <X>
    Posted:     <date>
    Metric:     <e.g. 18% reach lift vs Pillar 1 avg, 3.2× saves>
    Why:        <one-line theory>
```

### Hooks that flopped

For every Miss-tier post, log:

```
- "<hook text>"
    Platform:   <X>
    Posted:     <date>
    Theory:     <off-voice / wrong platform / over-clever / mistimed
                 trend>
```

### Formats by ROI

Recompute the rolling 8-week table. If a format is now in the bottom
quartile, mark "Drop". If it's in the top quartile sustained 4+
weeks, mark "Keep weekly".

### Pillars by metric

Update the pillar performance table. Flag any pillar where this week
deviates >30% from rolling 4-week.

### Best posting times

Refine from this week's data:

- If a post at a non-default time crushed (eg. Sunday 11am beat the
  default Tue 7pm), log it.
- If a post at the default time tanked, log it.
- After 4 weeks of one signal, update BRAND CONFIG → Peak windows.

### Hashtag sets that performed

For each pillar, note which stack version is winning:

```
Pillar 1 stack (this week's version):
  Brand: #brand
  Niche: #brisbanephysio #runningphysio #brisbaneallied
  Community: #runlife #parkrun #brisbanerunners
  Discovery: #runningtips
  Avg reach lift vs Pillar 1 baseline: +12%
  Verdict: Keep
```

### CTA phrasings that converted

Log winners verbatim:

```
- "DM 'PLAN' for the rundown"  → 14 DMs, 6 booked consults
- "Save this for the next time someone asks"  → 4.2× save rate
- "Comment your situation — I read every one"  → 47 comments avg
```

### Top-performing posts (rolling top 10)

Update the rolling table.

### Bottom-performing posts (rolling bottom 5)

Update the rolling table with theory on why.

### Trends we tried and dropped

Anything tested that didn't fit:

```
- TikTok dancing trend (sound: <name>) — off-voice for clinical
  brand. Not retrying.
```

### Audience signal

What the comments and DMs are saying:

```
Audience signal this week:
- 5× asked about "long runs and gut issues" → seed Pillar 2 idea
- 3× confused about pricing on consults → may need a pinned post
  or LinkedIn bio update
- 2× shared transformation results (with permission asked) → case
  study material for next month
```

### Open experiments — close completed

If an open experiment was running this week:

```
[x] Tested "Hot take" hook framework — 2 of 3 hit; verdict: keep
    in rotation
[x] Tested new community tag #brisbaneultras — flat vs baseline;
    verdict: drop
```

### Banned, refined

Add any phrase that flopped + felt off-brand:

```
- "Save this for when you need it"  — felt passive-aggressive;
   moving to "Save for the next time someone asks"
```

### Algorithm notes

Per-platform quirks noticed this week:

```
Instagram:  Posts with 7+ slides outperformed 4-slide carousels by
            18% on saves. Worth biasing longer carousels for the
            educate pillar.

TikTok:     Hooks arriving at 1.5s were fine; 2s+ tanked completion
            to <30%. Keep cutting first frame tight.

LinkedIn:   Question-based posts pulled 3× the comment volume vs
            statement-based. Bias toward question hooks for LI
            slots.
```

Show the updated `learnings.md` back to the user in a fenced block.
Ask for sign-off:

> *"Updated learnings. Anything I read wrong, or anything you'd
> change before this rolls into next week's ideation?"*

## Brief next week

Once `learnings.md` is signed off, write a one-page brief for next
week that bakes the insight in:

```
NEXT WEEK BRIEF — week of <date>
================================

Lean into:
  - <Pillar / format / hook framework that hit this week>
  - <Posting window that lifted reach>
  - <CTA phrasing that converted>

Pull back from:
  - <Pillar / format that flopped, and why>
  - <Hook framework that flopped>
  - <Trend that didn't fit>

Test (one new thing):
  - <one new hook framework / format / hashtag stack to try>
  - <hypothesis: what we expect>

Audience signal to address:
  - <repeat question that earns a post>
  - <theme to weave into upcoming posts>

Calendar pillars (rotation per 03-weekly-calendar.md):
  - <pull from monthly rotation>

Calendar-aware notes:
  - <any solemn / commercial day next week>

Approval needed by:
  - <when next week's ideation should run by>
```

## For agencies — monthly client report

On the last Friday of each month, also produce the monthly client
report from `templates/monthly-client-report.md`. The agent pulls
the last 4 weeks of data and renders the client-facing version
(branded, executive-summary on top, detailed metrics below).

## Hard rules

- **Don't invent metrics.** If reach is missing, ask. If link clicks
  weren't tracked (no UTMs), say so — don't backfill.
- **Don't overfit.** One week is signal, not a verdict. Three weeks
  of the same hook framework hitting is signal. Six weeks is a rule.
- **Honest about flops.** "Hook was clever but off-voice" beats
  "audience didn't get it".
- **Reflect confidence in language.** "1 week suggests" vs "8-week
  pattern".
- **Quarterly review prompts.** Every 12 weeks the agent triggers
  the quarterly checklist from learnings-template.md → pillar
  staleness, audience drift, platform ROI, voice check.

## Confirm + handoff

> *"Learnings updated, next week briefed. Ready for next Monday's
> ideation — say the word and I'll start at `04-ideate-hooks.md`
> with the new insight already loaded."*

## Done condition

- This week's data is logged
- `learnings.md` is updated and signed off
- Next week's brief is written
- If end of month for an agency: monthly client report produced
- If quarter end: quarterly review prompts triggered

When done, say:

> *"Week closed. See you Monday for next week's posts."*

## When numbers don't match the story

Sometimes the data says one thing and the user feels another. Surface
honestly:

> *"By the numbers, the Reel on Tuesday flopped — reach was 40% under
> Pillar 1 baseline. You mentioned you liked it. Worth keeping in
> rotation as a test — sometimes a slow-burn post compounds. Want me
> to mark it as Hold/Re-test, or move on?"*

Don't pretend metrics agree with feel when they don't.

## When the user disagrees with a verdict

If user pushes back ("but I really like the listicle format"), log
their preference and tell them transparently:

> *"Logging your preference — keeping listicles in rotation despite
> the avg dip. Will re-evaluate in 4 weeks. If they don't lift by
> then we'll need to either rework the angle or drop."*

The user is the boss. The agent makes recommendations, not decisions.
