# 🏡 Real Estate Agent Setup — START HERE

A complete, plug-in AI assistant for residential real estate agents. Drop it into any AI agent and you've got a tireless team member that qualifies leads, writes listings, preps CMAs, handles client comms, and keeps your deals on track.

**Built by humans. Works on any agent. No code required.**

---

## What's inside

```
real-estate-agent-setup/
├── 00_START_HERE.md          ← you are here
├── SKILL.md                  ← the core agent brain (start with this)
├── knowledge/
│   ├── 01_real-estate-knowledge-base.md
│   └── 02_frameworks.md
├── prompts/
│   └── prompt-library.md
├── templates/
│   ├── email-templates.md
│   └── listing-and-scripts.md
├── sops/
│   └── workflows-and-checklists.md
└── LISTING.md                ← (for sellers on Skillzy — ignore if you're the buyer)
```

---

## How to install (pick your platform)

This setup is **platform-agnostic** — the same files work everywhere.

### Claude (Projects or Claude Code)
- **Claude Project:** create a new Project → add all these files to the Project knowledge. Claude will use `SKILL.md` as its core instructions and pull from the others as needed.
- **Claude Code / skills folder:** drop the whole folder into your skills directory. The `SKILL.md` frontmatter makes it discoverable.

### ChatGPT
- **Custom GPT:** create a new GPT → paste the contents of `SKILL.md` into the Instructions → upload the `knowledge/`, `prompts/`, `templates/`, and `sops/` files as Knowledge.
- **Plain chat:** paste `SKILL.md` at the start of a conversation, then paste whichever resource file you need for the task.

### Gemini / Grok / other agents
- Paste `SKILL.md` into the system prompt / custom instructions.
- Add the resource files into the knowledge base or paste the relevant one when the task needs it.

### Automation tools (n8n / Make / Zapier)
- Use `SKILL.md` as the system message on your LLM node.
- Load the relevant resource file into the prompt for the specific step (e.g. the listing formula for a "write description" node).

---

## Quick start (60 seconds)

1. Install `SKILL.md` as your agent's core instructions (above).
2. Tell the agent what you're working on, e.g.:
   - *"Write a listing description for a 3-bed 2-bath in [suburb], renovated kitchen, north-facing, $X."*
   - *"A buyer lead went quiet 5 days ago — write a re-engagement message."*
   - *"Help me prep a CMA pricing narrative. Here are three comps…"*
3. The agent asks for any missing details, then gives you something ready to send.

---

## Tips for best results

- **Feed it your voice.** Paste one or two emails you've written so it mirrors your tone.
- **Give it the facts.** It will never invent square footage, prices, or school zones — give it the real numbers and it does the rest.
- **Stack the files.** For a big task (new listing going live), load the listing templates *and* the open-house SOP together.

---

## Compliance note

This assistant is built to avoid fair-housing / anti-discrimination pitfalls (it describes the property, not the "ideal buyer"). Still, **you are the licensed professional** — always review outputs before sending, and confirm any factual claims about a property or the market. This setup supports your work; it doesn't replace your judgment or your licensing obligations.

---

*Real Estate Agent Setup · by Skillzy House · Human-tested. AI-ready.*
