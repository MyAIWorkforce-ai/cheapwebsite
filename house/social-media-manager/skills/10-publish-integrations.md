---
name: social-publish-integrations
description: Push every post to the user's publishing tool — Buffer, Hootsuite, Later, Sprout Social, Sked Social, Pallyy, Publer, SocialBee, Ayrshare, Postiz, n8n, native platform APIs (Meta Business Suite, TikTok Business Suite, LinkedIn Campaign Manager, YouTube Studio), or copy-paste blocks. Optional Telegram approval flow so the user signs off before anything goes live.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: [http_request]
---

# Publishing — push to the user's tool of choice

## Your job

For each gated-and-passed post, format and send to whichever publishing
tool BRAND CONFIG specifies. Twelve paths supported, plus copy-paste.

Most users will pick one. Agencies running multiple clients sometimes
pick two (eg. Sprout for the main client roster + Telegram approval
on top).

## The supported paths

1. **Buffer** — most common for small teams
2. **Hootsuite** — enterprise + agency
3. **Later** — visual planning, IG-first
4. **Sprout Social** — agency-grade, expensive
5. **Sked Social** — strong in AU; IG + TikTok focus
6. **Pallyy** — budget IG-focused
7. **Publer** — broad multi-platform
8. **SocialBee** — content category rotation
9. **Ayrshare** — single API → all major platforms (developer-first)
10. **Postiz** — open-source self-hosted scheduler
11. **n8n / Make / Zapier** — workflow → fan out to native APIs
12. **Native APIs** — Meta Graph API, TikTok Business API, LinkedIn
    API, YouTube Data API (verified business accounts only)
13. **Copy-paste blocks** — no automation; renders blocks the user
    pastes manually

## Decide the path

Read BRAND CONFIG → Publishing tool. Route to the matching section.

---

## Path 1 — Buffer

Buffer is the default for solo creators and small teams. Free tier
handles 3 channels; Essentials at $6/channel/month unlocks more.

### Setup
- User connects each social channel inside Buffer Dashboard →
  Channels
- For Instagram: requires switching to Business or Creator account +
  connecting via Facebook
- For TikTok: requires Business account
- For LinkedIn: personal OR Company Page (separate connections)
- For Pinterest: requires Pinterest Business

### Per-post format

The agent renders a Buffer-ready block:

```
BUFFER PUSH — <slot>

Channel:        <Instagram Business | Twitter | LinkedIn Personal |
                 LinkedIn Page | TikTok | Pinterest | Facebook Page>
Type:           <Post | Reel | Story | Tweet | Thread>
Schedule:       <ISO8601 in BRAND CONFIG timezone>

Caption:
<full caption with hashtags at end>

First Comment (LinkedIn / IG):
<URL if applicable>

Asset:          <URL or path to file — Buffer accepts video MP4 + image PNG/JPG>
Aspect:         <9:16 | 1:1 | 4:5 | 16:9>
Cover:          <URL to custom thumbnail if Reel/video — Buffer
                  supports custom covers via Reel composer>
```

### Buffer API (for n8n / Zapier wiring)

```
POST https://api.bufferapp.com/1/updates/create.json
Authorization: Bearer <user's Buffer access token>

profile_ids[]:   <profile ID per channel>
text:            <full caption>
media[link]:     <asset URL>
scheduled_at:    <ISO8601>
```

Common Buffer issues:
- Instagram requires Business/Creator + Facebook Page connection
- TikTok schedule sometimes fails if account hasn't been active 14+
  days — Buffer surfaces error; manual post once to unblock
- Carousels: Buffer supports up to 10 IG images via composer
- Reels: scheduling Reels requires custom cover frame OR auto-picks
  first frame

### Limits
- Free: 3 channels, 10 scheduled posts per channel
- Essentials ($6/ch/mo): unlimited posts, 1 channel
- Team ($12/ch/mo): collaboration features
- Agency ($120/mo): 10+ channels

---

## Path 2 — Hootsuite

Enterprise + agency standard. More expensive ($99+/mo) but
unified inbox + listening + analytics.

### Setup
- Hootsuite Dashboard → Add social network → connect each channel
- Instagram Business + Facebook Page required
- LinkedIn: personal OR Pages

### Per-post format

```
HOOTSUITE PUSH — <slot>

Social Profile:    <profile name from Hootsuite>
Composer:          <Standard Post | Story | Reel | Carousel>
Schedule:          <ISO8601 in user timezone>

Message:
<full caption with hashtags>

Media:             <URL or file>
First Comment:     <URL if applicable>
Hashtag Manager:   <which Hootsuite tag set to apply>
```

### Hootsuite API

```
POST https://platform.hootsuite.com/v1/messages
Authorization: Bearer <Hootsuite API token>

socialProfileIds: [<profile IDs>]
text:             <full caption>
mediaUrls:        [<asset URLs>]
scheduledSendTime: <ISO8601>
```

### Limits
- Professional: $99/mo, 10 channels
- Team: $249/mo, 20 channels, 3 users
- Business: $739/mo, 35 channels, unlimited content
- Enterprise: custom

Hootsuite has a separate Streams + Listening product not relevant for
publishing.

---

## Path 3 — Later

Strong IG-first scheduler. Visual planner is its key feature.

### Setup
- Later Dashboard → Add account → Connect Instagram (Business or
  Creator)
- TikTok, LinkedIn, Pinterest, Facebook all separate connections
- "Linkin.bio" — Later's link-in-bio tool, optional but free with
  paid plan

### Per-post format

```
LATER PUSH — <slot>

Channel:           <Instagram | TikTok | LinkedIn | Pinterest |
                    Facebook>
Type:              <Post | Reel | Story | Pin | Tweet>
Schedule:          <ISO8601 in user timezone>

Caption:
<full caption with hashtags>

First Comment (IG/LI): <URL if applicable>
Media:             <URL or path>
Cover frame:       <if Reel>
Pinterest title:   <if Pin>
Pinterest URL:     <where the Pin links>

Visual planner slot: <yes — drag to position N of the IG grid preview>
```

### Later API

```
POST https://api.later.com/v1/posts
Authorization: Bearer <token>

socialProfileIds: [<IDs>]
caption:          <text>
media:            [<URLs>]
scheduledAt:      <ISO8601>
```

### Limits
- Starter: $25/mo, 1 social set, 30 posts/profile
- Growth: $45/mo, 3 social sets
- Advanced: $80/mo, 6 social sets

Later's biggest strength is the IG visual grid preview — useful when
the brand cares about feed aesthetic.

---

## Path 4 — Sprout Social

Agency / enterprise standard. Expensive ($249+/mo) but unified inbox
+ scheduling + analytics + listening + CRM.

### Setup
- Sprout dashboard → Account → connect each profile
- Agency setup: per-client dashboards possible
- "Bambu" — Sprout's employee advocacy tool, optional

### Per-post format

```
SPROUT PUSH — <slot>

Profile:           <profile name from Sprout>
Type:              <Post | Story | Reel | Tweet | Thread>
Schedule:          <ISO8601>

Message:
<full caption with hashtags>

First Comment:     <URL if applicable>
Media:             <URL or asset>
Tagging:           <internal Sprout tags for reporting — e.g.
                    "Pillar 1", "Campaign EOFY24">
UTM:               <auto from BRAND CONFIG UTM convention>
```

### Sprout API

Restricted — requires Premium Analytics tier. Most users push through
the Sprout dashboard UI. The agent renders Sprout-formatted blocks
the user pastes.

### Limits
- Standard: $249/mo per user, 5 profiles
- Professional: $399/mo per user, unlimited profiles
- Advanced: $499/mo per user
- Enterprise: custom

Sprout's reporting is its biggest strength — for agencies needing
client-grade reports, Sprout reports drop into the monthly client
template (`templates/monthly-client-report.md`).

---

## Path 5 — Sked Social

Strong in AU. IG + TikTok focused. Solid for visual brands.

### Setup
- Sked dashboard → connect IG Business + TikTok Business + others
- "Sked Link" — link-in-bio tool, included

### Per-post format

```
SKED PUSH — <slot>

Account:           <IG Business | TikTok Business | LinkedIn | etc.>
Type:              <Post | Reel | Story | Carousel | Pin>
Schedule:          <ISO8601 in BRAND CONFIG timezone>

Caption:
<full caption with hashtags>

First Comment:     <URL if applicable>
Media:             <URL or path — Sked supports MP4 + JPG/PNG>
Hashtags Manager:  <which Sked tag set>
Sked Link slot:    <if pushing to link-in-bio>

Approval workflow: <if multi-user — Sked has built-in approval>
```

### Sked API

```
POST https://api.skedsocial.com/v3/posts
Authorization: Bearer <token>

accountId:        <ID>
caption:          <text>
media:            [<URLs>]
scheduledFor:     <ISO8601>
firstComment:     <URL>
```

### Limits
- Essentials: $30/mo, 3 accounts
- Professional: $135/mo, 12 accounts
- Enterprise: custom

Sked's IG carousel + story handling is among the strongest of the
schedulers; AU-based support team is a plus for AU buyers.

---

## Path 6 — Pallyy

Budget IG-focused scheduler. Strong free tier.

### Setup
- Pallyy dashboard → Connect IG Business / TikTok / etc.
- "Pallyy Link" — bio tool, free with paid plan

### Per-post format

```
PALLYY PUSH — <slot>

Channel:           <IG | TikTok | LinkedIn | etc.>
Type:              <Post | Reel | Story | Pin>
Schedule:          <ISO8601>

Caption:           <full text + hashtags>
First Comment:     <URL>
Media:             <URL>
```

### Limits
- Free: 1 social set, 15 scheduled posts
- Premium: $18/mo, unlimited posts

---

## Path 7 — Publer

Multi-platform scheduler with AI assist + recycling features.

### Setup
- Publer dashboard → connect channels
- "Recycle" feature — auto-reposts evergreen content

### Per-post format

```
PUBLER PUSH — <slot>

Channel:           <profile name>
Type:              <Post | Reel | Story | Tweet | Pin>
Schedule:          <ISO8601>

Caption:
<full text>

Hashtags:          <stack>
Media:             <URL>
Auto-recycle:      <yes / no — for evergreen content>
```

### Publer API

```
POST https://app.publer.io/api/v1/posts
Authorization: Bearer <token>
```

### Limits
- Free: 3 accounts
- Professional: $12-21/mo
- Business: $25-50/mo

---

## Path 8 — SocialBee

Content category rotation — useful for brands posting from a curated
content library.

### Setup
- SocialBee dashboard → Set up content categories per pillar →
  Connect channels
- Posts pulled from category queues per the calendar

### Per-post format

```
SOCIALBEE PUSH — <slot>

Profile:           <profile name>
Category:          <Pillar 1 | Pillar 2 | etc.>
Type:              <Post | Reel | Story | Pin | Tweet>
Schedule:          <ISO8601 OR "next slot in category">

Caption:           <full text>
Media:             <URL>
```

### Limits
- Bootstrap: $29/mo
- Accelerate: $49/mo
- Pro: $99/mo

---

## Path 9 — Ayrshare

Single API → all major platforms. Developer-first.

### Setup
- Ayrshare dashboard → API key → connect platforms (each platform
  has its own auth flow)

### Per-post format

```
AYRSHARE PUSH — <slot>

POST https://app.ayrshare.com/api/post
Authorization: Bearer <user's Ayrshare API key>
Content-Type: application/json

{
  "post": "<full caption with hashtags>",
  "platforms": ["instagram", "tiktok", "linkedin", "twitter",
                "facebook", "youtube"],
  "mediaUrls": ["<URL of finished asset>"],
  "scheduleDate": "<ISO8601 in BRAND CONFIG timezone>",
  "youTubeOptions": {
    "title": "<title>",
    "thumbNail": "<URL>",
    "visibility": "public"
  },
  "instagramOptions": {
    "reels": true,
    "shareReelsFeed": true
  },
  "firstComment": "<LinkedIn first comment URL>"
}
```

Common Ayrshare issues:
- Missing platform-account link in Ayrshare dashboard
- Asset URL expired (use 24h-valid URLs)
- Post exceeds platform char cap (Ayrshare returns 400)

### Limits
- Free: 30 posts/month, 1 user
- Premium: $15-149/mo

---

## Path 10 — Postiz

Open-source self-hosted scheduler. For brands wanting full data
ownership.

### Setup
- Self-host Postiz instance (Docker / Kubernetes)
- Connect channels via OAuth

### Per-post format

```
POSTIZ SCHEDULE — <slot>

POST <postiz-endpoint>/v1/posts
Authorization: Bearer <user's Postiz token>
Content-Type: application/json

{
  "content": "<full caption>",
  "platform": "<instagram|tiktok|linkedin|...>",
  "media": ["<asset URL>"],
  "schedule_at": "<ISO8601>"
}
```

---

## Path 11 — n8n / Make / Zapier (workflow)

User has a workflow that fans out to native platform APIs. Agent
fires a webhook with the post payload.

### Per-post format

```
WORKFLOW WEBHOOK — <slot>

POST <user's workflow webhook URL>
Content-Type: application/json

{
  "slot_label":   "<day-platform-pillar>",
  "platform":     "<instagram|tiktok|linkedin|youtube|etc.>",
  "type":         "<Post|Reel|Story|Pin|Tweet>",
  "caption":      "<full caption>",
  "hashtags":     "<final stack>",
  "asset_url":    "<URL>",
  "schedule_at":  "<ISO8601>",
  "first_comment": "<URL if applicable>",
  "approval_required": <true|false>,
  "utm_campaign": "<slot label>"
}
```

The workflow handles platform-specific API calls, Telegram approval,
analytics logging, slack/email notifications — whatever the user has
wired.

---

## Path 12 — Native platform APIs

Only for verified business accounts. User has access tokens in a
secrets file.

| Platform | Endpoint | Notes |
|---|---|---|
| Instagram (Graph API v19+) | `POST /<ig-user-id>/media` then `POST /<ig-user-id>/media_publish` | 2-step container then publish; Reels container takes 30+ sec to ready |
| Instagram Stories | `POST /<ig-user-id>/media?media_type=STORIES` | Same 2-step |
| LinkedIn | `POST /v2/ugcPosts` (Personal) or `POST /v2/posts` (Page) | Verified Sign-in with LinkedIn |
| LinkedIn images | `POST /v2/assets?action=registerUpload` then upload to returned URL | Multi-step |
| X (free) | `POST /2/tweets` | Free tier limits — 50 posts/day Premium, much lower free |
| X (Premium) | Same | Scheduling via own scheduler needed |
| Facebook Pages | `POST /<page-id>/feed` | Uses same Meta Graph API |
| TikTok Content Posting API | `POST /v2/post/publish/content/init/` | Direct publish — requires Sandbox → Production access |
| YouTube Data API | `POST /youtube/v3/videos?part=snippet,status&uploadType=resumable` | Resumable upload; long process |
| Pinterest | `POST /v5/pins` | Pin URL + Image URL required |
| Threads (Meta Threads API) | `POST /v1.0/me/threads_publish` | Verified business only |

Render the full curl block; user runs from their terminal or the agent
fires via http_request tool.

---

## Path 13 — Copy-paste blocks

For users without automation, render paste-ready blocks per slot:

```
COPY-PASTE BLOCK — <slot>
Platform:           <Instagram>
Schedule for:       <Tue 7-9pm AEST>

CAPTION (paste into composer):
<full caption>

HASHTAGS (paste at end of caption):
<final stack>

ASSET:              <asset filename / URL>
ASPECT:             9:16  (Reel)
COVER FRAME:        first frame
FIRST COMMENT (LI): <URL — paste into first comment 60 sec after
                     posting>

CTA INSIDE BIO:     <update link-in-bio to point to: URL>
```

User pastes into Buffer / Later / Metricool / Publer / native app.

---

## Telegram approval flow (optional, recommended)

If BRAND CONFIG → Approval channel = Telegram, every post (after gate
pass) lands in a Telegram chat for human sign-off before being sent
to the publishing tool.

Template lives at `templates/telegram-approval-template.md`. The
agent renders one Telegram-formatted message per slot:

```
TELEGRAM APPROVAL — <slot>

Bot:        <user's bot token, stored in secrets>
Chat ID:    <user's chat ID>

Message body (rendered):
🔵 SOCIAL MANAGER — APPROVAL NEEDED

SLOT:       <day, platform, format, pillar>
SCHEDULED:  <date + peak window in local tz>

CAPTION:    <full caption with hashtags at end>
ASSET:      <URL or attached file>
ASPECT:     9:16 (Reel) / 1:1 (IG feed) / 4:5 (IG portrait)
DURATION:   <sec> (if video)

GATE:       ✅ Passed all checks
VOICE:      ✅ On-brand
HASHTAGS:   ✅ Within cap
DISCLOSURE: ✅ #ad in first 80 chars (or N/A if organic)

→ Reply:
  ✅       Approve, schedule it
  ❌       Send back for rewrite — agent will ask: caption / visual
           / hook?
  ✏️ ...   Inline edit — paste your edited caption, agent updates
           and re-gates
  delay 24h  Push schedule by 24 hours
  skip       Mark this slot as not posting this week
```

The agent waits for user reply. On `✅`, fires the publishing tool
push (Buffer / Sked / Sprout / etc.). On `❌`, asks one clarifying
question and routes back to the right skill. On inline edit, replaces
caption and re-runs the gate.

## Multi-approver setups (for teams)

If BRAND CONFIG → Approvers has multiple names (e.g. founder +
comms manager):

- Bot only schedules when ✅ from a specific approver list
- One ❌ from any approver = block + ask for rewrite
- 24h timeout: agent re-pings ("Reminder — slot X still needs
  sign-off")
- 48h timeout: agent holds without posting + flags in weekly report

## UTM convention

Every outbound link gets UTM parameters per BRAND CONFIG. Default:

```
?utm_source=<platform>&utm_medium=social&utm_campaign=<slot-label>
```

Examples:
- IG Reel pointing to booking page: `?utm_source=ig&utm_medium=social&utm_campaign=2024-w12-mon-ig-reel-p1`
- LinkedIn post pointing to gated PDF: `?utm_source=linkedin&utm_medium=social&utm_campaign=2024-w12-tue-li-p4`

The agent fills these in automatically before the gate.

## Common publishing errors + fixes

| Error | Likely cause | Fix |
|---|---|---|
| "Caption exceeds X chars" | Hashtags pushed it over | Move hashtags to first comment (IG only); cut caption |
| "Aspect ratio not supported" | Mismatch (4:5 sent to 9:16 endpoint) | Re-export at right aspect |
| "Media URL expired" | 24h-valid signed URL expired | Re-upload, use stable URL |
| "Account not connected" | Token expired / scope missing | Reconnect in scheduler dashboard |
| "Instagram requires Business account" | Personal account on IG | Switch to Business/Creator |
| "TikTok Sandbox restriction" | New TikTok Business app | Apply for production access |
| "Rate limit hit" | Too many posts too fast (X especially) | Throttle; X free is ~50/day |
| "Hashtag flagged" | Banned hashtag list on platform | Swap hashtag |
| "First comment failed" | Some schedulers post comment separately, may fail | Manual paste as fallback |

## Confirm + handoff

> *"All posts pushed to <tool>. <N> scheduled, <M> awaiting Telegram
> approval. I'll log this week's plan and stand by for engagement
> triage and the end-of-week report."*

## Done condition

- Every gated-passed post is either scheduled or in the approval queue
- The week's plan is logged in context
- UTM parameters applied
- Schedule honours peak windows per BRAND CONFIG

When done, say:

> *"Schedule is live. As the posts go up, paste the analytics back
> and I'll handle replies (`11-engagement-replies.md`) and the weekly
> report (`12-weekly-learnings.md`)."*

## When the publishing tool fails

If the scheduler returns errors:

1. Surface the exact error message
2. Route to the right fix from the table above
3. Don't retry blindly — fix the root cause
4. If unresolvable in conversation, render the copy-paste block and
   tell the user to publish manually this round

Log scheduler failures in `learnings.md` → "Algorithm notes" → so
next week's planning accounts for them.
