---
name: social-hashtag-stacks
description: Build hashtag stacks per slot, per platform, respecting hashtag caps (IG 10 practical, LinkedIn 3, TikTok 5, X 0-1, Pinterest 0, YouTube 3 in description) and pulling from BRAND CONFIG hashtag sets. Mix brand + niche + community + discovery. Rotate to avoid stagnant stacks.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Hashtag stacks — per slot, per platform

## Your job

For every slot this week, pick a hashtag stack that:

1. Pulls from BRAND CONFIG hashtag sets (don't invent random tags
   each week — keeps the brand tag-trail consistent and searchable)
2. Respects per-platform caps
3. Mixes four flavours: **brand + niche + community + discovery**
4. Avoids any tag in BRAND CONFIG banned topics
5. Rotates within sets so the stack doesn't go stagnant

## Per-platform hashtag truth

| Platform | Platform cap | Optimal | Notes |
|---|---|---|---|
| Instagram (all surfaces) | 30 | 5-10 mixed | More than 10 reads spammy; engagement plateaus after ~10 |
| TikTok | 30 | 3-5 | Hashtags weaker discovery signal than caption keywords + content |
| LinkedIn | none | 3 max | LinkedIn dampens posts with 4+ hashtags |
| Facebook | 30 | 0-2 | Hashtags barely move the needle on Facebook |
| X / Twitter | none | 0-1 | Hashtags actively hurt reach on X |
| Threads | none | 0-1 | Same as X — hashtags low signal |
| YouTube (description) | 15 visible | 3 | First 3 show under title; in description, not title |
| YouTube (title) | – | 0 | Hashtags in title hurt CTR per YouTube guidance |
| Pinterest | 20 | 0 | Skip — Pinterest deprioritises hashtags; keywords in title + description |
| Snapchat | – | 1-3 | Sticker form |
| Reddit | – | – | Hashtags don't exist on Reddit |

## The four flavours

| Flavour | What it is | Example (for a Brisbane physio) |
|---|---|---|
| **Brand** | Your handle + brand tag. ALWAYS in every stack. | `#yourbrandhandle` |
| **Niche** | Specific to what you do + locale. | `#brisbanephysio` `#runningphysio` `#brisbaneallied` |
| **Community** | What your audience already follows. | `#runlife` `#parkrun` `#marathontraining` `#brisbanerunners` |
| **Discovery** | Broader topical tags that bring fresh eyes. | `#runningtips` `#injuryprevention` `#runfaster` |

## Per-platform stack composition

### Instagram (10-tag stack)

| Slot | Type | Example |
|---|---|---|
| 1 | Brand | `#yourbrandhandle` |
| 2-4 | Niche | `#brisbanephysio` `#runningphysio` `#brisbaneallied` |
| 5-7 | Community | `#runlife` `#parkrun` `#brisbanerunners` |
| 8-10 | Discovery | `#runningtips` `#injuryprevention` `#runfaster` |

For Reels, drop to 5 tags (cleaner look, similar reach):

| Slot | Type |
|---|---|
| 1 | Brand |
| 2-3 | Niche |
| 4 | Community |
| 5 | Discovery |

### TikTok (3-5 tag stack)

| Slot | Type |
|---|---|
| 1 | Brand (if it has search volume on TikTok; if not, skip) |
| 2-3 | Niche + community (broad-ish tags work better here) |
| 4 | Discovery (broader — TikTok rewards broad tags more than IG) |
| 5 | Pillar-tag (e.g. `#runningphysio` for educate pillar) |

TikTok's algorithm relies more on caption keywords + content matching
than hashtags. Don't over-engineer the stack.

### LinkedIn (3-tag stack)

| Slot | Type |
|---|---|
| 1 | Brand or industry handle |
| 2 | Topic / pillar |
| 3 | Community / industry tag |

LinkedIn hashtags are discovery-light. Use them for topical filing
not reach. More than 3 dampens the post.

### YouTube (3 in description)

| Slot | Type |
|---|---|
| 1 | Brand |
| 2 | Topic / niche |
| 3 | Discovery |

NOT in title — YouTube guidance: hashtags in title hurt CTR.

### Pinterest (0 — keywords instead)

Pinterest is a search engine. Put keywords in:

- Pin title (100 chars — keyword first)
- Pin description (500 chars — keyword-dense, natural prose)
- Board title (matches the search intent)

Hashtags are deprioritised. Skip.

## Tag volume guidance

Avoid mega-tags. They drown your post.

| Tag follower count | Use |
|---|---|
| 100M+ posts (#love, #instagood, #photooftheday) | Skip — your post is invisible |
| 10M-100M (#fitness, #motivation) | Low priority — pair with niche |
| 1M-10M (#runningtips, #marathontraining) | Good discovery layer |
| 100k-1M (#brisbanephysio, #ultramarathontraining) | Sweet spot for niche |
| 10k-100k (#brisbanerunners, #queenslandphysio) | Strong community, narrower reach |
| < 10k (#mybrandtag) | Brand-only, plus very-locale-specific |

Mix 1-2 broad with 5-8 mid to narrow. Mega-tags = no.

## Rotation — keep the stack fresh

Same 10 tags every post = stagnant signal. Rotate within the BRAND
CONFIG sets:

```
Stack A (Mon Reel — Pillar 1):
  Brand: #brand
  Niche: #brisbanephysio #runningphysio #brisbaneallied
  Community: #runlife #parkrun #brisbanerunners
  Discovery: #runningtips #injuryprevention #runfaster

Stack B (Wed Carousel — Pillar 2):
  Brand: #brand
  Niche: #brisbanephysio #ultrarunningphysio
  Community: #ultrarunaustralia #ultratrailrunning
  Discovery: #ultrarunningtips #trailtraining #ultraprep

Stack C (Thu TikTok — Pillar 1 repurpose):
  Brand: #brand
  Niche: #runningphysio
  Community: #parkrun
  Discovery: #runfaster
```

Different pillars = different stacks. Rotate within stacks across
the month so the same 10 tags don't repeat verbatim.

## Output — one stack per slot

```
HASHTAG STACK — <day, time, platform, slot, pillar>

Brand:       #<handle>
Niche:       #<niche1> #<niche2> #<niche3>
Community:   #<community1> #<community2> #<community3>
Discovery:   #<discovery1> #<discovery2> #<discovery3>

→ Final stack (paste-ready):
#<handle> #<niche1> #<niche2> #<niche3> #<community1> #<community2>
#<community3> #<discovery1> #<discovery2> #<discovery3>

Volume sanity:
  Total tags:        <N>
  Largest tag size:  <X>M posts (target < 10M)
  Smallest tag size: <X>k posts (target > 10k for community / discovery)
```

## Locale tags — get specific

For local businesses, locale tags beat generic ones every time.

- `#brisbanephysio` beats `#physio` (narrower but actually relevant)
- `#londonpilates` beats `#pilates`
- `#torontocafes` beats `#cafe`
- `#sydneymumlife` beats `#mumlife`

The BRAND CONFIG should already have 3-5 locale tags. If not, add
them: `<city><service>`, `<city><niche>`, `<suburb><service>`.

## Hard rules

- **Always include the brand tag.** Builds a searchable archive
  buyers can scroll.
- **Don't repeat the same 10 tags every post.** Stagnant stacks =
  algorithm penalty. Rotate within the BRAND CONFIG sets.
- **Locale tags for local businesses.** `#brisbanephysio` beats
  `#physio` for a Brisbane clinic.
- **Avoid mega-tags (100M+ posts).** `#love` `#instagood` drown your
  post. Stick under 1M per tag for niche reach; under 10M for
  discovery layer.
- **Banned topics** from BRAND CONFIG → strip any tag that touches
  them.
- **No hashtags on X / Threads / Pinterest.** They hurt or do nothing
  on those surfaces.
- **YouTube hashtags in description not title.**
- **LinkedIn cap at 3.** 4+ dampens.
- **Spelling errors in tags = dead tag.** Auto-check; if uncertain,
  ask the user.
- **No competitor brand tags.** Even if they have traffic, tag-jacking
  is a bad look.
- **No banned community tags** — if a community has been hijacked
  by spam/bots/banned topics, skip even if volume looks good.

## Reading learnings.md

Open `learnings.md` → "Hashtag sets that performed". If a stack
version is lifting reach +X% over baseline, bias toward that. If a
stack version is flat, rotate.

After 4-8 weeks of data, the agent has hard evidence on which tags
work and which don't.

## Confirm + handoff

> *"Stacks ready per slot. Want me to swap any tag, add a new
> community tag, or move to the pre-publish gate?"*

## Done condition

- Every slot has a paste-ready stack
- Per-platform cap respected
- Rotation respected (no two stacks this week identical)
- User confirmed

When done, say:

> *"Stacks set. Next: the pre-publish gate — every post passes a
> checklist before it's scheduled."*

Then load `09-pre-publish-gate.md`.

## When the user wants to add new tags

If the user has spotted a new community tag or discovery tag worth
testing, add it to BRAND CONFIG → Hashtag sets and log as an open
experiment in `learnings.md`:

```
Open experiment: Testing #newtag for community layer this week
  Definition of done: 3 posts using it, scored against pillar avg
  Hypothesis: <what we expect>
```

`12-weekly-learnings.md` closes the experiment Friday.
