---
name: social-production-briefs
description: Generate production briefs for AI image, video, talking-head, and voice tools (Nano Banana, Midjourney, Higgsfield, Sora, HeyGen, Synthesia, ElevenLabs) or phone-shot shot lists with gear specs (Rode SmartLav, Rode Wireless Go II, Sony ZV-E10, iPhone 15 Pro, Aputure, Godox). One brief per asset, pasteable straight into the target tool.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Production briefs — what to feed each tool

## Your job

For each picked slot this week, write a production brief targeted at
the tool the user has available (BRAND CONFIG → Production tools).
Each brief is a single paste-ready block with the prompt, style notes,
dimensions, gear, and any reference assets the tool expects.

The brief should be self-contained — the user pastes it and gets
back a usable asset on first try.

## Tool routing

Read BRAND CONFIG → Production tools. Pick the brief format that
matches what's available:

| Asset type | If tool = | Brief format |
|---|---|---|
| Static image | Nano Banana | Nano Banana prompt block |
| Static image | Midjourney | `/imagine` prompt with `--ar` + style tokens |
| Static image | DALL-E 3 / ChatGPT image | Conversational prompt |
| Static image | Adobe Firefly | Firefly prompt + style ref |
| Static image | Stable Diffusion (local) | SD prompt + negative + sampler |
| Static image | Canva (template-based) | Canva template suggestion + brand variables |
| Static image | Camera roll | Shot list with composition + lighting |
| Short video | Higgsfield | Higgsfield scene prompt |
| Short video | Sora | Sora scene prompt |
| Short video | Runway Gen-3 | Runway prompt + camera move |
| Short video | Pika | Pika prompt + motion params |
| Short video | Veo | Veo prompt |
| Short video | iPhone shoot | Shot list with director's notes + gear |
| Short video | Sony ZV-E10 / DSLR shoot | Shot list + lens + lighting + audio plan |
| Talking head | HeyGen | HeyGen avatar + voice + script |
| Talking head | Synthesia | Synthesia avatar + voice + script |
| Talking head | Yourself | Camera setup + teleprompter + framing |
| Voice / VO | ElevenLabs | Voice ID + emotion + pacing + script |
| Voice / VO | Hired VO | VO brief + delivery notes |

## Static image — Nano Banana brief format

```
NANO BANANA BRIEF — <slot label>

Subject:        <one sentence — what's in the frame>
Composition:    <rule of thirds / centred / off-centre / fill-frame>
Lighting:       <natural soft / studio key / golden hour / overcast /
                 hard rim / softbox>
Palette:        <pull from BRAND CONFIG — warm neutrals, clinical
                 whites, navy + brass, etc.>
Mood:           <2 words — e.g. "calm + considered", "energised",
                 "premium quiet">
Aspect ratio:   <1:1 IG feed | 4:5 IG portrait | 9:16 Reel cover |
                 16:9 LinkedIn | 2:3 Pinterest>
Negative:       <what to avoid — text in image, hands, logos,
                 watermarks, brand-specific banned topics>

Style refs:     <if user has 2-3 reference images, drop URLs here>

Prompt: <single paragraph rendering all the above as the Nano Banana
         prompt body. Specific. Concrete nouns. No corporate slop.>
```

## Static image — Midjourney brief format

```
MIDJOURNEY BRIEF — <slot label>

/imagine <subject>, <composition>, <lighting>, <palette/mood>, <style
modifiers — e.g. "shot on Hasselblad, 50mm, f/2.8", or "minimalist
flat illustration, 2-color palette">, --ar <aspect> --v 6 --style raw

Negative prompt (if needed): --no <list>
Aspect: <1:1 / 4:5 / 9:16 / 16:9>
Iteration plan: 4 grid → upscale best → potential vary-subtle pass
```

## Static image — Camera roll / phone-shot brief

For users without AI tools, give a director's shot list:

```
SHOT LIST — <slot label>, phone-shot

Setup:          <location, time of day, frame orientation>
Lighting:       <natural through window — soft side-key from camera-
                 left | golden hour outdoor | softbox indoor>
Lens:           <main 1× | 0.5× wide | 2× tele | for iPhone, the
                 default is 26mm equiv on main>
Gear:           <iPhone 15 Pro (default) | Sony ZV-E10 + 16-50mm |
                 DSLR>
Audio:          <Rode SmartLav clipped to collar | Rode Wireless Go
                 II receiver to phone | iPhone onboard if no mic>
Stabilisation:  <handheld | gimbal | tripod>

Shots:
  1. <action> + <duration 2-4s> + <composition>
  2. ...
  3. ...

Director notes: <what NOT to do — phone movement, dialogue beat,
                 wardrobe, lighting traps>
```

## Short video — Higgsfield brief format

```
HIGGSFIELD SCENE BRIEF — <slot label>

Duration:        <7-15 sec Reels/Shorts | 15-30 sec TikTok>
Aspect ratio:    9:16 (vertical-first)
Scene:           <one sentence — what's happening>
Camera move:     <static | slow push-in | orbit | tracking | dolly>
Pacing:          <calm | energetic | staccato>
On-screen text:  <if needed — the first 1-2 second hook in big text>

Style:           <pull from BRAND CONFIG voice>
Reference:       <2-3 reference video URLs if user has them>

Prompt: <single paragraph rendering all the above as the Higgsfield
         scene prompt>
```

## Short video — Sora brief format

```
SORA SCENE BRIEF — <slot label>

Duration:        <up to 60 sec>
Aspect ratio:    9:16 / 16:9 / 1:1
Scene:           <one sentence>
Camera:          <move + lens>
Lighting:        <described>
Subject motion:  <described — e.g. "person walks left-to-right at
                  walking pace, hands gesturing">

Prompt: <Sora reads conversational prompts well — write as a
         director would describe the shot to a DP>
```

## Short video — phone shoot brief (full)

For users shooting on iPhone / Sony / DSLR:

```
PHONE SHOOT — <slot label>

OVERVIEW
  Slot:        <day, platform, format, pillar>
  Hook:        <picked hook from 04>
  Duration:    <target seconds>
  Aspect:      9:16, 1080×1920 minimum

GEAR
  Camera:      <iPhone 15 Pro main lens 26mm equivalent |
                Sony ZV-E10 + 16-50mm kit at 24mm |
                DSLR + 35mm prime>
  Audio:       <Rode SmartLav clipped to collar (preferred for solo
                talking head) | Rode Wireless Go II — receiver to
                camera/phone (preferred for moving shots) |
                iPhone onboard mic with windscreen (acceptable for
                quiet indoor)>
  Stabilisation: <gimbal (DJI Osmo 6 / Insta360 Flow) |
                  tripod (Manfrotto / Smallrig) |
                  handheld (acceptable for short clips, < 5 sec)>
  Lighting:    <natural window — face toward window, off-axis 45° |
                Aputure MC / Aputure Amaran 60d through softbox |
                Godox SL60 + softbox at 45° |
                ring light (least preferred — flat, dated look)>

LOCATION + WARDROBE
  Location:    <where>
  Wardrobe:    <solid colours, no logos, no busy patterns>
  Background:  <plain wall, off-white preferred, OR branded backdrop>

SHOTS (one per beat)
  Shot 1 — Hook delivery
    Time:        0-1s
    Frame:       Vertical 9:16, head + shoulders, eyes at upper-third
    Action:      Direct address to camera, deliver hook line
    Note:        Hold first frame for 1 sec for algorithm thumbnail

  Shot 2 — Setup
    Time:        1-3s
    Frame:       <description>
    Action:      <description>

  Shot 3 — Body beat 1
    ...

  (continue per beat)

  Final shot — CTA
    Time:        last 3 sec
    Frame:       <description>
    Action:      Deliver CTA + branded end-card insert

POST-PRODUCTION
  Edit in:      <CapCut (default for solo) | Premiere Pro | DaVinci
                 Resolve | InShot | Descript>
  Cuts:         Every 2-3 sec max (faster for TikTok)
  Captions:     Burned in, line-by-line. Don't rely on auto-captions
                — use Capcut's auto-caption + manual proof.
  End-card:     2-sec branded card with handle + main link
  Music:        <native trending audio if relevant, OR brand music
                 OR silent>
  Export:       1080×1920, MP4 H.264, 30 fps
```

## Talking head — HeyGen brief format

```
HEYGEN AVATAR BRIEF — <slot label>

Avatar:         <name from user's HeyGen account>
Voice:          <ElevenLabs voice ID, or HeyGen native voice>
Background:     <plain | office | branded asset>
Aspect ratio:   9:16
Duration:       <target seconds>

Script: <full talking-head script, broken into 10-15 word lines for
         natural pacing. Use HeyGen pause markers [pause 0.5s] and
         stress markers [stress] where needed.>

Notes for editor: <where to insert b-roll, captions, end card>
```

## Talking head — Synthesia brief format

```
SYNTHESIA AVATAR BRIEF — <slot label>

Avatar:         <custom avatar | stock avatar name>
Voice:          <Synthesia voice | ElevenLabs imported>
Background:     <library scene | uploaded brand asset | plain>
Aspect:         9:16 / 16:9 / 1:1

Script: <full script in scenes — each scene 5-15 seconds. Synthesia
         handles scene transitions automatically.>
```

## Voice / VO — ElevenLabs brief format

```
ELEVENLABS VO BRIEF — <slot label>

Voice ID:       <from BRAND CONFIG — locked voice for the brand>
Emotion:        <warm | authoritative | playful | calm | energetic>
Pacing:         <slow (140 wpm) | natural (160 wpm) | brisk (180 wpm)>
Stability:      <Voice Settings — 50% for natural, 70% for consistency>
Style exag:     <0-30% — push higher for dramatic delivery>

Script: <under 5000 chars; one paragraph per scene. Use <emphasis>
         tags on accent words. Use [pause 0.5s] for breath beats.
         Spell out numbers if pronunciation matters
         (e.g. "twenty twenty-five" not "2025").>
```

## Voice / VO — hired VO brief

```
VO BRIEF — <slot label>

Talent:         <VO actor name or "to be cast">
Brief delivery: <calm explainer | warm friend | energetic teacher |
                 dry expert>
Tone refs:      <2-3 examples of voices the user likes for ref>

Script: <full script with stress underlines + pacing notes>

Deliverables:   <raw WAV 48kHz 24-bit + edited final at -16 LUFS for
                 social>
```

## Carousel / static design brief — Canva-style

For carousels and graphic posts:

```
CAROUSEL DESIGN BRIEF — <slot label>

Platform:       <IG | LinkedIn>
Format:         <IG carousel up to 10 slides | LinkedIn document
                 post up to 10 pages>
Aspect:         <1:1 IG square | 4:5 IG portrait | 1:1 LI doc>

Brand setup:
  Logo:         <placement: bottom-right small, or branded end-card>
  Type stack:   <heading font / body font from BRAND CONFIG>
  Palette:      <primary / secondary / accent hex codes>

Slide-by-slide content:
  Slide 1 — Hook
    Big text:    "<hook from 04-ideate-hooks>"
    Small text:  "<subtitle hinting at payoff>"
    Visual:      <full-bleed image / solid colour / number badge>

  Slide 2 — Promise
    Big text:    "<here's what's coming>"
    Small text:  "<3-word tease of what's inside>"
    Visual:      <numbered list / icons>

  Slide 3-N — Body (one beat per slide)
    Big text:    "<one specific point>"
    Small text:  "<2-3 sentence expansion>"
    Visual:      <diagram / photo / before-after>

  Slide N (last) — Payoff + CTA
    Big text:    "<so-what payoff>"
    Small text:  "<CTA — Save / Share / Link in bio for X>"
    Visual:      <branded end-card>

Production notes:
  - One idea per slide
  - Slide 1 must hold without the rest
  - Last slide always has a CTA
  - Branded end-card on last slide includes handle
```

## Hard rules

- **One brief per slot.** Don't merge multi-slot briefs.
- **Always include aspect ratio.** Wrong ratio = re-render.
- **Always include negative / avoid list.** Hands, text-in-image,
  competitor logos, banned words from BRAND CONFIG.
- **Tool name in the brief title** (so the user pastes into the right
  tool first time).
- **Gear list for phone shoots.** Don't write a 3-point lighting brief
  for someone with only an iPhone — match capability to the BRAND
  CONFIG → Production tools list.
- **Reference assets when possible.** AI tools work better with 2-3
  reference images / videos rather than text-only prompts.
- **Negative prompts on AI image** — avoid hands, text-in-image,
  watermarks, brand logos. Specific to each region's banned topics.
- **For regulated brands** (cosmetic, medical, financial) — flag
  briefs that may need disclaimers on the final asset.

## Per-region asset considerations

- **AU/NZ**: Outdoor lighting often hard sun — schedule shoots for
  golden hour (1 hr after sunrise / before sunset). If shooting
  indoor for clinical/wellness brand, use Aputure 60d through softbox
  for soft skin tones.
- **UK**: Most shoots indoor or overcast. Soft, diffuse light is the
  default. Window light at noon works well.
- **US**: Wide range of conditions; specify location climate in brief.
- **CA**: Long winter light periods; bias shoots indoor or use higher-
  output lighting (Aputure 200d).

## Confirm + handoff

Present all briefs for this week's slots together. Ask:

> *"One brief per slot, ready to paste into your tools. Want me to
> tighten any of them, or move to writing the captions next?"*

## Done condition

- Every picked slot has a production brief
- Briefs are formatted for the user's actual tools (no Sora brief if
  they don't have Sora)
- User confirmed or asked for tweaks

When done, say:

> *"Briefs ready. Captions next — native per-platform, respecting
> truncation and hashtag caps."*

Then load `06-write-captions.md`.

## When the user's tools change

If user upgrades or changes tools (gets a Sony A7C, signs up for
HeyGen Pro, drops Midjourney), tell the agent:

> *"Update brand config production tools — added <X>."*

The agent re-formats future briefs.
