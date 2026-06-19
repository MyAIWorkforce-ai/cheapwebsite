---
name: social-publish-integrations
description: Push every post to the user's publishing tool — Ayrshare, Postiz, n8n, native platform APIs, or copy-paste blocks. Optional Telegram approval flow so the user signs off before anything goes live.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: [http_request]
---

# Publishing — push to the user's tool of choice

## Your job

For each gated-and-passed post, format and send to whichever
publishing tool BRAND CONFIG specifies. Five paths supported:

1. **Ayrshare** (single API → all major platforms)
2. **Postiz** (open-source scheduler, self-hostable)
3. **n8n** (workflow — agent fires a webhook; n8n posts via native APIs)
4. **Native platform APIs** (Instagram Graph API, LinkedIn API, X
   API — only viable for verified business accounts)
5. **Copy-paste blocks** (no automation — agent renders blocks the
   user pastes into their scheduler or the native app)

## Decide the path

Read BRAND CONFIG → Publishing tool. Route to the matching section.

## Path 1 — Ayrshare

User needs an Ayrshare account + API key (in BRAND CONFIG or a
secrets file). For each post:

```
AYRSHARE PUSH — <slot>

POST /post
Authorization: Bearer <user's Ayrshare API key>
Content-Type: application/json

{
  "post": "<full caption with hashtags>",
  "platforms": ["<instagram|tiktok|linkedin|twitter|facebook|youtube>"],
  "mediaUrls": ["<URL of finished asset>"],
  "scheduleDate": "<ISO8601 in BRAND CONFIG timezone>"
}
```

If the user pastes back a non-200 response, surface the error and
walk them through the fix (most often: missing platform-account
link in Ayrshare dashboard, asset URL expired, post exceeds
platform char cap).

## Path 2 — Postiz

User runs a Postiz instance + has the API endpoint in BRAND CONFIG.
For each post:

```
POSTIZ SCHEDULE — <slot>

POST <postiz-endpoint>/v1/posts
Authorization: Bearer <user's Postiz token>
Content-Type: application/json

{
  "content": "<full caption>",
  "platform": "<instagram|tiktok|...>",
  "media": ["<asset URL>"],
  "schedule_at": "<ISO8601>"
}
```

## Path 3 — n8n

User has an n8n workflow with an inbound webhook. For each post:

```
N8N WEBHOOK — <slot>

POST <n8n-webhook-URL>
Content-Type: application/json

{
  "slot_label": "<day-platform-pillar>",
  "platform": "<instagram|...>",
  "caption": "<full caption>",
  "hashtags": "<final stack>",
  "asset_url": "<URL>",
  "schedule_at": "<ISO8601>",
  "approval_required": <true|false>
}
```

n8n then fans out to native platform APIs, Telegram approval,
analytics logging — whatever the user's workflow does.

## Path 4 — Native platform APIs

Only for verified business accounts (Instagram Business via Facebook
Graph API, LinkedIn Business, X API v2). User has the access tokens
in a secrets file. Agent constructs the platform-specific request:

| Platform | Endpoint |
|---|---|
| Instagram (Graph API v18+) | `POST /<ig-user-id>/media` then `POST /<ig-user-id>/media_publish` |
| LinkedIn | `POST /v2/ugcPosts` |
| X | `POST /2/tweets` (no scheduling — needs your own scheduler) |
| Facebook Pages | `POST /<page-id>/feed` |

Render the full curl block; user runs it from their terminal.

## Path 5 — Copy-paste blocks

For users without automation, render paste-ready blocks per slot:

```
COPY-PASTE BLOCK — <slot>
Platform: <Instagram>
Schedule for: <Tue 7-9pm local>

CAPTION:
<full caption>

HASHTAGS (paste at end of caption):
<final stack>

ASSET: <asset filename / URL>
ASPECT: 9:16  (Reel)
COVER FRAME: first frame

CTA: <where the link in bio should point — update if changed>
```

User pastes into Buffer / Later / Metricool / Publer / native app.

## Telegram approval flow (optional)

If BRAND CONFIG → Approval channel = Telegram, every post (after
gate pass) lands in a Telegram chat for human sign-off before being
sent to the publishing tool.

```
TELEGRAM APPROVAL — <slot>

Bot:      <user's bot token, in secrets>
Chat ID:  <user's chat ID>

Message body:
🔵 <slot label> ready for approval

CAPTION: <full caption>
HASHTAGS: <stack>
ASSET: <URL or attached>
SCHEDULE: <Tue 7-9pm local>

Reply ✅ to approve, ❌ to send back for rewrite.
```

Agent waits for the ✅. On ❌, re-runs the relevant skill (caption /
script / hashtags) and re-gates.

## Confirm + handoff

> *"All posts pushed to <tool>. <N> scheduled, <M> awaiting approval.
> I'll log this week's plan and stand by for engagement triage and
> the end-of-week report."*

## Done condition

- Every gated-passed post is either scheduled or in the approval queue
- The week's plan is logged in context

When done, say:
> *"Schedule is live. As the posts go up, paste the analytics back
> and I'll handle replies (`11-engagement-replies.md`) and the
> weekly report (`12-weekly-learnings.md`)."*
