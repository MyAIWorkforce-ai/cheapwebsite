---
name: social-write-captions
description: Write native captions per platform. Respect Instagram truncation (125 chars before "more"), LinkedIn no-link-in-first-line, TikTok 100-char rule, X 280-char cap, hashtag caps per platform, and BRAND CONFIG voice + banned words.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Captions — native per platform

## Your job

For every slot with a picked hook, write the full caption in the
platform's native format. Truncation rules, hashtag caps, line-break
conventions, and CTA placement all change per platform.

## Per-platform rules (hard)

| Platform | Caption length | First line | Hashtag count | Link |
|---|---|---|---|---|
| Instagram (feed) | 100–200 words | First 125 chars show before "...more" — front-load the hook | 3–10 niche | Link in bio (not clickable in caption) |
| Instagram (Reels) | 50–80 words | First 80 chars critical — hook here | 3–5 | Link in bio |
| TikTok | 50–100 words | First 100 chars visible | 3–5 | Link in bio (or sticker) |
| LinkedIn | 150–300 words | NO link in first line (algorithm penalty) — link in comment 1 instead | 3 max | First comment |
| X / Threads | <280 chars per post; thread for longer | Hook IS the post | 0 | Inline OK |
| Facebook | 50–80 words | Hook in first 60 chars | 0–2 | Inline OK |
| YouTube Shorts | 60-char title + 1-line desc | Title = hook | 0 | In description |
| Pinterest | Pin title + 150 word desc | Search keywords up top | 0 | In Pin URL |

## Caption structure

For text-led posts (carousel, single image, LinkedIn, feed):

```
[Hook line — already picked in 04-ideate-hooks]
[blank line]
[1-3 sentences: the body — teach / story / opinion]
[blank line]
[1 line: the takeaway / CTA]
[blank line]
[hashtags — from BRAND CONFIG hashtag sets]
```

For video posts (Reels, TikTok, Shorts) the **caption sits below the
video** — the hook is on-screen, the caption is context:

```
[1-2 sentences expanding the video's point]
[blank line]
[1 line: where to go next — link in bio / DM "X" for the resource]
[blank line]
[hashtags]
```

## Output — one block per slot

For each slot:

```
SLOT — <day, platform, format, pillar>
Hook:    <picked hook from 04>

CAPTION:
<full caption respecting platform rules>

Hashtags: <stack from BRAND CONFIG — choose set that fits this pillar>
CTA: <one of: link in bio / DM keyword / comment below / save this>
First-comment (LinkedIn only): <if applicable — the link to drop in
                                comment 1 to avoid algo penalty>
```

## Hard rules — auto-rewrite if violated

- **Banned words** from BRAND CONFIG → silent rewrite, never present
- **Engagement bait** — "STOP scrolling", "Comment YES", "Tag a
  friend who needs this" → rewrite into honest CTA
- **Truncation** — Instagram front line must hold up before "...more"
- **LinkedIn first-line link** — never put a URL in the first line
- **Hashtag cap** per platform — don't exceed (IG: 10 max, LinkedIn: 3)
- **Brand voice** — voice 2-3 words from BRAND CONFIG. If a caption
  reads off-voice, rewrite. Don't ship "premium boutique" in a
  "tradie no-nonsense" voice and hope for the best.

## Confirm + handoff

> *"Captions written. Pasted them per slot with hashtags + CTAs.
> Want me to tweak any, or move to the video scripts?"*

## Done condition

- Every slot has a full native caption
- Hashtags chosen from BRAND CONFIG sets
- User confirmed or asked for tweaks

When done, say:
> *"Captions done. Next: video scripts for Reel/TikTok/Shorts slots."*

Then load `07-write-video-scripts.md` (skip if no video slots).
