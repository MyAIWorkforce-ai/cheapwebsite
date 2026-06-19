---
name: social-ideate-hooks
description: Generate hooks in batches for this week's calendar slots. Score each one against learnings.md (what worked, what flopped) and the brand's banned-words list. Present 3 options per slot; user picks.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Ideate — hooks for this week's slots

## Your job

For each slot in this week's calendar, generate **3 candidate
hooks**. Read `learnings.md` first; rank candidates against what
landed before. Filter out anything that breaks BRAND CONFIG's
banned-words list. Present all options; user picks.

## What "hook" means

The first 1–2 lines of a post. On Reels/TikTok, the first 1–2
seconds of audio/text. The hook decides whether the rest of the
post gets read or watched. **80% of the work, 100% of the time.**

## Hook frameworks that work (use, but don't repeat)

| Framework | Example for "Running biomechanics" pillar |
|---|---|
| Contrarian | "Stretching before a run won't fix your shin splints." |
| Specific number | "Three drills I'd do before I'd ever buy new shoes." |
| Mistake callout | "If your knee hurts at mile 3, this is usually why." |
| Question | "Why do runners who 'do strength' still get injured?" |
| Personal story | "I cracked a rib because I ignored this for 6 months." |
| Result + skepticism | "She PB'd 5km in 6 weeks. Here's what actually changed." |

**Banned framework: engagement-bait.** No *"STOP scrolling"*, no
*"Comment YES if you agree"*, no fake-urgency. The agent rewrites
any of these silently.

## Output — one block per slot

For each calendar slot this week, render:

```
SLOT — <day, platform, format, pillar>

Hook A: <hook>
        Framework: <which one>
        Learnings note: <e.g. "Contrarian hooks averaged +12%
                         reach last 4 weeks">

Hook B: <hook>
        Framework: ...
        Learnings note: ...

Hook C: <hook>
        Framework: ...
        Learnings note: ...

→ My pick: <A / B / C> because <one line>
```

Always give a pick — but make it clear it's a recommendation, not
the final answer. User can override.

## Hard rules

- Read `learnings.md` first. Lean into frameworks in the "Hooks that
  landed" list; avoid ones in the "Hooks that flopped" list.
- Respect BRAND CONFIG banned words / topics. Silent rewrite.
- Don't repeat a hook framework more than twice in one week's slate.
- Each hook ≤ 12 words on text platforms; ≤ 8 words / 2 seconds on
  video.

## Confirm + handoff

> *"Three hooks per slot. Pick A/B/C for each, or say 'rewrite slot
> X' and I'll draft three new ones. Once picked, I write the full
> captions + video scripts."*

Save picked hooks in context.

## Done condition

- Every slot in this week's calendar has a picked hook
- User confirmed all picks

When done, say:
> *"Hooks picked. Next: full captions for the text/carousel slots.
> Then video scripts for the Reel/TikTok slots."*

Then load `06-write-captions.md` (and `07-write-video-scripts.md` in
parallel for video slots).
