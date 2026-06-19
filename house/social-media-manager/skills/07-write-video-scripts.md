---
name: social-write-video-scripts
description: Write short-form video scripts for Reels, TikTok, and YouTube Shorts. Three structures available — hook-payoff, listicle, talking-head. Pacing notes, on-screen text cues, and CTA included.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Video scripts — Reels / TikTok / Shorts

## Your job

For every video slot with a picked hook, write a full script with:

- The opening hook (first 1-2 seconds)
- The body (scene beats or talking-head paragraphs)
- The CTA close
- On-screen text cues
- Pacing notes (when to cut, when to hold)

## Pick a structure

Three short-form structures cover ~80% of weekly slots:

### Structure 1 — Hook → Payoff (single beat)
Best for: "Aha" moments, one-tip videos, demos.

```
[0-1s]  HOOK on screen + voiceover
[1-7s]  Build / setup
[7-12s] Payoff / answer
[12-15s] CTA
```

### Structure 2 — Listicle (3-5 beats)
Best for: "3 things…", "5 mistakes…", before-vs-after stacks.

```
[0-1s]  HOOK + first beat tease
[1-4s]  Beat 1
[4-7s]  Beat 2
[7-10s] Beat 3
[10-15s] Payoff (best beat last) + CTA
```

### Structure 3 — Talking head (direct address)
Best for: opinions, takes, founder POV, explainers.

```
[0-2s]  HOOK delivered direct-to-camera
[2-25s] Argument / story / explanation in 2-3 short paragraphs
[25-30s] CTA + handoff
```

## Output — one script per slot

```
VIDEO SCRIPT — <day, platform, slot, pillar>
Hook:           <picked hook from 04>
Structure:      <Hook-Payoff / Listicle / Talking-head>
Duration:       <target seconds>
Aspect ratio:   9:16
Caption file:   <link to caption from 06>

SCRIPT:
[0-1s]   ON-SCREEN: "<hook text large + bold>"
         VO/A: "<voiceover line>"
         CAMERA: <static / push-in / overhead>

[1-4s]   ON-SCREEN: "<small subtitle>"
         VO/A: "<voiceover line>"
         B-ROLL: <what to cut to>

[...continue per beat...]

[final 3s] ON-SCREEN: "<CTA — short>"
           VO/A: "<spoken CTA>"
           END-CARD: <logo / handle / next-step>

Editing notes:
- Cut on every voice beat (every 2-3 seconds max for TikTok)
- Captions burned in (don't rely on auto-captions)
- First frame = hook frozen for 1s — gives the algo a thumbnail
- Sound: trending native audio OK if it doesn't fight the VO
```

## Hard rules

- **Hook in second 0-1.** If your hook arrives at second 4, scroll.
- **Captions burned in.** ~80% of short-form is watched on mute.
- **Cut every 2-3 sec on TikTok.** Static = thumb-stop killer.
- **Aspect 9:16** unless the slot is explicitly LinkedIn/YouTube
  long-form.
- **End on a CTA that fits the BRAND CONFIG primary CTA** — don't
  send TikTok viewers to a LinkedIn link, etc.
- **No fake urgency.** "Last chance!" "ONLY today!" not allowed
  unless literally true.

## Per-platform tweaks

| Platform | Length sweet spot | Cuts | First-frame text |
|---|---|---|---|
| Instagram Reels | 7-22 sec | every 2-3s | Big and centred |
| TikTok | 15-60 sec | every 1-2s; faster than IG | Smaller, off-centre |
| YouTube Shorts | 30-60 sec | every 2-3s | Big, top third |

## Confirm + handoff

Present scripts together. Ask:

> *"Scripts done. Want any tightened, restructured, or moved to a
> different structure? Otherwise next is hashtag stacks per slot,
> then the pre-publish gate."*

## Done condition

- Every video slot has a script with hook, body, CTA, pacing notes
- User confirmed or asked for tweaks

When done, say:
> *"Scripts ready. Next: hashtag stacks per slot."*

Then load `08-hashtag-stacks.md`.
