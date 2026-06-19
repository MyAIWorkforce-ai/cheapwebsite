# Telegram approval template

For users who want a human-in-the-loop sign-off before any post goes
live. Agent posts into a Telegram chat (yours alone, or shared with
a team). Reply ✅ to approve, ❌ to send back for rewrite, ✏️ to
inline-edit.

## One-time setup

1. **Create a Telegram bot.**
   - Message `@BotFather` in Telegram
   - Send `/newbot`, follow prompts
   - Save the bot token

2. **Get your chat ID.**
   - Start a chat with your new bot, send any message
   - Visit `https://api.telegram.org/bot<token>/getUpdates`
   - Find `"chat":{"id": <number>,…}` — save the number

3. **Add to BRAND CONFIG:**
   ```
   Approval channel:  Telegram
     Bot token:       <stored in secrets, NOT in BRAND CONFIG>
     Chat ID:         <number>
   ```

## Per-post approval message format

The agent sends one message per slot, ready for sign-off:

```
🔵 SOCIAL MANAGER — APPROVAL NEEDED

SLOT:       <day, platform, format, pillar>
SCHEDULED:  <date + peak window in local tz>

CAPTION:
<full caption, with hashtags at the end>

ASSET:      <URL to finished asset>
ASPECT:     9:16 (Reel) / 1:1 (IG feed) / 4:5 (IG portrait)
DURATION:   <seconds> (if video)

GATE:       ✅ Passed all checks
VOICE:      ✅ On-brand
HASHTAGS:   ✅ Within cap

→ Reply:
  ✅       Approve, schedule it
  ❌       Send back for rewrite (agent will ask: caption /
           visual / hook?)
  ✏️ ...   Inline edit (paste your edited caption, agent
           updates and re-gates)
```

If the asset is a video or image, the agent **attaches the file**
to the Telegram message (not just a URL) — so you can view it
without clicking out to a tool.

## Agent behaviour on reply

| Reply | Action |
|---|---|
| ✅ | Schedule via the publishing tool (`10-publish-integrations.md`) and log in context |
| ❌ | Ask one question: "What broke? caption / visual / hook / timing?" — route back to the matching skill |
| ✏️ `<new caption>` | Replace caption, re-run gate (`09-pre-publish-gate.md`), re-send for re-approval |
| `delay <duration>` (e.g. `delay 24h`) | Push the schedule by N hours |
| `skip` | Mark this slot as not posting this week; flag in weekly report |

## Group chat approvals (team setups)

If multiple people approve (e.g. founder + comms manager):

- Bot only schedules when it sees ✅ from a specific approver list
  (set in BRAND CONFIG: `Approvers: [@founder, @comms]`)
- One ❌ from any approver = block + ask for rewrite
- 24h timeout: if no reply, agent re-pings ("Reminder — slot X still
  needs sign-off"). If still no reply at 48h, holds without posting.

## Why bother

A 10-second Telegram approval saves the brand from:

- Off-voice posts that slip past the gate
- Wrong-asset attached to the wrong caption
- Posts going up at 3am because of a timezone mix-up
- The agent inventing a stat that sounds plausible but isn't real

Human in the loop is faster and safer than full auto, for any brand
where one bad post outweighs ten good ones.
