---
name: social-hashtag-stacks
description: Build hashtag stacks per slot, per platform, respecting hashtag caps (IG 10, LinkedIn 3, TikTok 5) and pulling from BRAND CONFIG hashtag sets. Mix branded + niche + community + discovery tags.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Hashtag stacks — per slot, per platform

## Your job

For every slot this week, pick a hashtag stack that:

1. Pulls from BRAND CONFIG hashtag sets (don't invent random tags
   each week — keeps the brand tag-trail consistent)
2. Respects per-platform caps (Instagram 10, LinkedIn 3, TikTok 5)
3. Mixes four flavours: **brand + niche + community + discovery**
4. Avoids any tag in BRAND CONFIG banned topics

## The four flavours

| Flavour | What it is | Example (for a Brisbane physio) |
|---|---|---|
| **Brand** | Your handle + brand tag. ALWAYS in every stack. | `#yourbrandhandle` |
| **Niche** | Specific to what you do + locale. | `#brisbanephysio` `#runningphysio` |
| **Community** | What your audience already follows. | `#runlife` `#parkrun` `#marathontraining` |
| **Discovery** | Broader topical tags that bring fresh eyes. | `#runningtips` `#injuryprevention` |

## Per-platform caps + balance

| Platform | Max count | Brand | Niche | Community | Discovery |
|---|---|---|---|---|---|
| Instagram | 10 | 1 | 3 | 3 | 3 |
| TikTok | 5 | 1 | 2 | 1 | 1 |
| LinkedIn | 3 | 1 | 1 | 1 | 0 (LinkedIn discovery hashtags rarely move the needle) |
| Facebook | 2 | 1 | 1 | 0 | 0 |
| X / Threads | 0 | (hashtags hurt reach on X — skip entirely) | | | |
| YouTube Shorts | 0 | (use the description, not the title) | | | |
| Pinterest | 0 | (keywords in title + desc instead) | | | |

## Output — one stack per slot

```
HASHTAG STACK — <day, platform, slot, pillar>

Brand:       #<handle>
Niche:       #<niche1> #<niche2> #<niche3>
Community:   #<community1> #<community2> #<community3>
Discovery:   #<discovery1> #<discovery2> #<discovery3>

→ Final stack (paste-ready):
#<handle> #<niche1> #<niche2> #<niche3> #<community1> ...
```

## Hard rules

- **Always include the brand tag.** Builds a searchable archive
  buyers can scroll.
- **Don't repeat the same 10 tags every post.** Stagnant stacks =
  algorithm penalty. Rotate within the BRAND CONFIG sets.
- **Locale tags for local businesses.** `#brisbanephysio` beats
  `#physio` for a Brisbane clinic — narrower but actually relevant.
- **Avoid mega-tags (100M+ posts).** `#love` `#instagood` drown
  your post. Stick under 1M per tag for niche reach.
- **Banned topics** from BRAND CONFIG → strip any tag that touches them.
- **No hashtags on X / Threads / YouTube Shorts / Pinterest.** They
  hurt or do nothing on those surfaces.

## Confirm + handoff

> *"Stacks ready per slot. Want me to swap any tag, add a new
> community tag, or move to the pre-publish gate?"*

## Done condition

- Every slot has a paste-ready stack
- User confirmed

When done, say:
> *"Stacks set. Next: the pre-publish gate — every post passes a
> checklist before it's scheduled."*

Then load `09-pre-publish-gate.md`.
