---
name: social-production-briefs
description: Generate production briefs for AI image, video, talking-head, and voice tools (Nano Banana, Higgsfield, HeyGen, ElevenLabs). One brief per asset, pasteable straight into the target tool.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Production briefs — what to feed each tool

## Your job

For each picked slot this week, write a production brief targeted at
the tool the user has available (BRAND CONFIG → Production tools).
Each brief is a single paste-ready block with the prompt, style
notes, dimensions, and any reference assets the tool expects.

## Tool routing

Read BRAND CONFIG → Production tools. Pick the brief format that
matches what's available:

| Asset type | If tool = | Brief format |
|---|---|---|
| Static image | Nano Banana | Nano Banana prompt block (subject, style, lighting, aspect ratio) |
| Static image | Midjourney | `/imagine` prompt with `--ar` + style tokens |
| Static image | Camera roll | Shot list with composition + lighting notes |
| Short video | Higgsfield | Higgsfield scene prompt + duration + camera move |
| Short video | Sora | Sora scene prompt + duration + pacing |
| Short video | Phone-shot | Shot list with director's notes |
| Talking head | HeyGen | HeyGen avatar + voice + script (links to `06-write-video-scripts.md`) |
| Talking head | Yourself | Camera setup notes + teleprompter version of the script |
| Voice / VO | ElevenLabs | Voice ID + emotion + script (max 5000 chars) |
| Voice / VO | Yourself | Read-aloud script with pacing marks |

## Static image — Nano Banana brief format

```
NANO BANANA BRIEF — <slot label>

Subject:       <one sentence>
Composition:   <rule of thirds / centred / off-centre, etc.>
Lighting:      <natural soft / studio key / golden hour / etc.>
Palette:       <pull from BRAND CONFIG voice — warm neutrals,
                clinical whites, navy + brass, etc.>
Mood:          <2 words>
Aspect ratio:  <1:1 for IG feed, 4:5 for IG portrait, 9:16 for
                Reel cover, 16:9 for LinkedIn, etc.>
Negative:      <what to avoid — text in image, hands, logos, etc.>

Reference:     <link to brand reference image if available>

Prompt: <single paragraph rendering all the above as the Nano
         Banana prompt body>
```

## Short video — Higgsfield brief format

```
HIGGSFIELD SCENE BRIEF — <slot label>

Duration:      <7-15 seconds for Reels/Shorts, 15-30 for TikTok>
Aspect ratio:  9:16 (vertical-first)
Scene:         <one sentence>
Camera move:   <static / slow push / orbit / tracking>
Pacing:        <calm / energetic / staccato>
On-screen text: <if needed — the first 1-2 second hook>

Style:         <pull from BRAND CONFIG voice>

Prompt: <single paragraph rendering all the above as the Higgsfield
         scene prompt>
```

## Talking head — HeyGen brief format

```
HEYGEN AVATAR BRIEF — <slot label>

Avatar:        <name from user's HeyGen account>
Voice:         <ElevenLabs voice ID, or HeyGen native>
Background:    <plain / office / branded asset>
Aspect ratio:  9:16
Duration:      <target seconds>

Script: <full talking-head script, broken into ~10-15 word lines
         for natural pacing>

Notes for editor: <where to insert b-roll, captions, end card>
```

## Voice / VO — ElevenLabs brief format

```
ELEVENLABS VO BRIEF — <slot label>

Voice ID:      <from BRAND CONFIG>
Emotion:       <warm / authoritative / playful>
Pacing:        <bpm or words/minute target>

Script: <under 5000 chars; one paragraph per scene with [pause]
         markers and stress underlines>
```

## Camera roll / phone-shot brief format

For users without AI tools, give a director's shot list:

```
SHOT LIST — <slot label>, phone-shot

Setup:         <location, time of day, frame orientation>
Lighting:      <natural / softbox / ring light>
Lens:          <main / 0.5x wide / 2x>

Shots:
  1. <action> + <duration> — <composition>
  2. ...
  3. ...

Director notes: <what NOT to do — phone movement, dialogue beat>
```

## Hard rules

- One brief per slot. Don't merge.
- Always include aspect ratio. Wrong ratio = re-render.
- Always include "negative" / "avoid" list. Hands, text-in-image,
  competitor logos, banned words from BRAND CONFIG.
- Tool name in the brief title (so the user pastes into the right
  tool first time).

## Confirm + handoff

Present all briefs for this week's slots together. Ask:

> *"One brief per slot, ready to paste into your tools. Want me to
> tighten any of them, or move to writing the captions next?"*

## Done condition

- Every picked slot has a production brief
- User confirmed or asked for tweaks

When done, say:
> *"Briefs ready. Captions next — native per-platform, respecting
> truncation and hashtag caps."*

Then load `06-write-captions.md`.
