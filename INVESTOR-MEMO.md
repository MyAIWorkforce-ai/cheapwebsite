# Skillzy — Investor Memo

*The marketplace for drop-in AI agents. Built for the Grok Bot /
Claude Skills / MCP era. Private memo, November 2026.*

---

## The one-liner

> **Skillzy is the marketplace where AI creators sell drop-in agents
> to the businesses that need them.** Creators keep 80% of every sale.
> We take 20% of the transaction — forever.

Think Shopify-for-AI-agents, built for the moment when every founder
and operator is trying to deploy a working agent and nobody has time
to build one from scratch.

---

## The thesis

AI agents are proliferating across every platform in 2026 — Claude,
ChatGPT, Grok, Cursor, Windsurf, Gemini, n8n. Each platform has made
agent-building accessible enough that **creators are now building
niche-vertical agents faster than buyers can discover them.**

The supply side is already here:

- Grok Bots for specific industries (Greg Isenberg: *"one of the best
  businesses to build right now"* — Nov 2026)
- Claude Skills (Anthropic's native distribution format)
- MCP servers (the new interoperability standard)
- Cursor rules, Windsurf rules, n8n workflows, ChatGPT GPTs

The demand side is bigger:

- Every SMB, agency, and solopreneur wants an AI agent that does
  real work today — not a research project
- Current discovery is fragmented: Gumroad, GitHub, Discord screenshots,
  a creator's personal site, a tweet with a Stripe link
- No one has built the **single, trusted marketplace** with payments,
  reviews, categorisation, and a clean creator payout model

**Skillzy is that marketplace.** We're to AI agents what the App Store
was to mobile apps, Shopify was to DTC merchants, Etsy was to indie
makers.

---

## What we sell (and how the transaction works)

Three product types live today:

| Type | What it is | Price range |
|---|---|---|
| **Skill** | Drop-in capability files (SKILL.md, prompts, configs) | $9 – $109+ |
| **Guide** | How-to playbooks for specific operator tasks | $9 – $59+ |
| **Agent Setup** | Complete niche-vertical agent, end-to-end | $49 – $999+ |

**Platforms supported** (as filter chips, not integrations — the
listings work via drop-in files, not API locks): Claude · Grok ·
Grok Bots · ChatGPT · Gemini · Cursor · Windsurf · OpenClaw · Hermes ·
Ollama · Mistral · DeepSeek · n8n · Make · Zapier.

### The transaction mechanic

For every listing, the buyer-side experience is identical:

1. Browse marketplace by niche, platform, or type
2. Checkout via embedded Stripe (buyer's card → Stripe → 80% creator,
   20% platform, instantly routed via Stripe Connect)
3. Download the bundle (zip of files + a `SETUP.md`)
4. Follow the 5-minute install into their own agent
5. **They own it forever.** No subscription, no ongoing dependency on
   the creator, no risk the creator deletes it.

**No float risk, no chargeback liability on us.** Money moves
creator-to-buyer via Stripe Connect Standard. Skillzy's cut is a
platform application fee, taken at transaction time. We never hold
creator funds.

---

## The timing — why now (and specifically Nov 2026)

Three market signals converged in the last 90 days:

1. **Grok Bots crossed the threshold.** Greg Isenberg (600k followers)
   publicly called "a Grok Bot for one industry" one of the best
   businesses to build in 2026. xAI has no native "export my bot"
   feature. Skillzy fills the gap with a standardised bundle template
   (live at `/templates/skillzy-grok-bot-bundle.zip`) and creator guide
   (`/guides/sell-grok-bot`) — shipped Nov 14.
2. **Anthropic doubled down on Claude Skills** as a first-class
   distribution format (SKILL.md is now their canonical creator
   artifact). Every Skill on Skillzy is Claude-native.
3. **MCP (Model Context Protocol) went cross-platform** — Claude,
   Cursor, Windsurf, and ChatGPT all added MCP support in 2026. MCP
   servers are the new reusable unit for giving agents tools and data.

**All three trends point to the same gap: no neutral marketplace for
the distribution artifact.** Platforms (xAI, Anthropic, OpenAI) are
model-first, not creator-first. We're the creator-first layer sitting
on top of all of them.

---

## Unit economics

Based on the current catalogue mix and live listing price points:

- **Average listing price:** ~$79
- **Skillzy take-rate:** 20% = ~$15.80 per sale (gross)
- **Stripe processing:** ~$2.60 per sale
- **Net to Skillzy:** ~**$13.20 per transaction**
- **Creator keeps:** ~$63.20 (~80%)

Infrastructure cost per transaction (hosting, DB, email): ~$0.01.
Effectively 100% gross margin on each incremental sale. Fixed costs
are negligible — Supabase Pro ($25/mo), Vercel ($20/mo), Resend
(~free), domain + sundries (~$10/mo). **Total monthly OPEX under
$100.** Breakeven is single-digit sales per month.

### The two-sided network effect

Standard marketplace flywheel:

- More creators → more listings → more buyers find what they want
- More buyers → higher earnings → more creators join
- No single-player mode on either side — neither works without the
  other, which is Skillzy's long-term moat

Each new creator onboarded is permanent inventory. Each listing
compounds search surface and SEO.

---

## What's live right now

- **Full marketplace** at [skillzy.ai](https://skillzy.ai)
- **Real Stripe checkout** (embedded Payment Element, 20% application
  fee, destination charges via Stripe Connect Standard)
- **Creator dashboard** — listing creation, edits, sales tracking,
  payout history
- **13 live demo listings** across Real Estate, Bookkeeping,
  Hospitality, Trades, Prompt Engineering, and more — seeded to
  prove the surface
- **Branded email flow** (purchase confirmation, admin notification,
  auth emails — all via Resend custom SMTP)
- **SEO-indexed** with per-listing Open Graph cards, sitemap,
  structured data
- **Grok Bot creator kit** (shipped Nov 14): bundle template +
  10-minute packaging guide + /sell/new CTA — the first vertical
  we've fully productised for creators

Live infrastructure: Next.js 14 (App Router) on Vercel, Supabase
Pro for DB/auth/storage, Stripe + Stripe Connect for payments,
Resend for transactional email.

---

## Roadmap (next 6 months)

Rolling forward from live baseline:

| Quarter | Goal |
|---|---|
| **Q4 '26** | Grok Bot vertical push: paid acquisition against *"sell Grok bot"* search traffic. Target: 20 live Grok Bot listings by EOY. |
| **Q1 '27** | MCP Server as a first-class 4th listing type. Niche-vertical landing pages (dentists, plumbers, real estate, bookkeeping) to capture industry search. |
| **Q1 '27** | Creator OAuth via GitHub for one-click repo-to-listing imports (largest publishing-friction removal available). |
| **Q2 '27** | Buyer-side account aggregation: "my agent toolbox" — one install surface across all a buyer's purchases. |
| **Q2 '27** | Wise payouts for creators in countries Stripe doesn't support (opens India, LATAM, parts of MENA creator supply). |

None of these require architectural change — they're surface
expansions on a working core.

---

## Competitive landscape

| Player | What they do | Why we're different |
|---|---|---|
| **GPT Store** (OpenAI) | OpenAI's custom GPT directory | Walled garden: only runs on ChatGPT. No creator payouts yet. We're platform-neutral. |
| **Anthropic Skills** (future) | Anthropic hasn't built a marketplace yet — just the format | We're the marketplace layer. When Anthropic ships one, we're already indexed and ranked on Claude Skills search. |
| **Gumroad / Lemonsqueezy** | Generic digital-goods storefronts | Not AI-native. No niche filtering, no platform tagging, no agent-specific metadata. |
| **GitHub** | Where developers currently put SKILL.md files | No payment layer, no discovery for non-devs, no buyer trust signals. |
| **Zapier / Make marketplaces** | Workflow marketplaces | Automation-only; not positioned for the "drop-in agent" buyer. |

**No one is positioned at the intersection: platform-neutral,
creator-first, agent-shaped, with payments and discovery.** We are.

---

## Why the model is defensible

1. **Creator lock-in via dashboard + payouts** — once a creator has
   listings earning, moving platforms means re-uploading, re-linking,
   losing reviews. Switching cost increases monotonically with sales.
2. **SEO moat** — each new listing adds a crawlable surface. We're
   already the top result for *"SKILL.md marketplace"* and climbing
   for *"sell AI skill"*, *"buy Grok bot"*.
3. **Trust signals** — reviews, ratings, creator verification. These
   compound; a new entrant can't manufacture them.
4. **Platform-neutral positioning** — any single-platform marketplace
   (GPT Store, hypothetical Claude Store) is bounded by one vendor's
   fortune. We ride ALL of them.

---

## The team

**Toby Banks, founder.** Operating entity: AI Virtual Assistant
Australia Pty Ltd. Prior: My AI Workforce (agent-build agency),
sub-contracted carpentry, small business operator background.

Lean by design — Skillzy is built, shipped, and run with Claude Code
as the primary engineering surface. Sub-$100/month fixed OPEX.
Founder-owned IP. No current outside capital.

---

## Current ask

[Fill in — common asks for a founder at this stage:]

- **Advisory conversation** — introduction to AI-creator ecosystems
  (Anthropic BD, xAI DevRel, etc.)
- **Distribution help** — reaching the 100 top Grok/Claude/Cursor
  creators to seed listings
- **Capital** — pre-seed round to accelerate creator acquisition +
  category launches (Grok Bots push, niche-vertical landing pages,
  paid search). Modest round sized to extend runway 18 months at
  current burn, not change the model.

---

## Risks (honest)

- **Platform risk** — a major LLM provider (OpenAI, Anthropic, xAI)
  builds their own first-party marketplace. Mitigation: platform-
  neutrality + first-mover SEO + creator relationships compound.
- **Creator supply thinness** — classic two-sided cold-start.
  Mitigation: paid creator acquisition with the Grok Bot push as a
  focused wedge, demo listings seeded to prove surface.
- **Discovery / search** — new marketplaces live and die on whether
  buyers find them. SEO playbook running; paid acquisition unlocked
  with capital.
- **Transaction safety** — digital goods have inherent
  non-deliverability questions. Mitigated by Skillzy's standard
  refund policy + Stripe dispute handling. No creator can abscond
  with funds (direct payouts).

---

## Where to look next

- **Live product:** [skillzy.ai](https://skillzy.ai)
- **Creator onboarding:** [skillzy.ai/sell/new](https://skillzy.ai/sell/new)
- **Grok Bot creator path:** [skillzy.ai/guides/sell-grok-bot](https://skillzy.ai/guides/sell-grok-bot)
- **Marketplace:** [skillzy.ai/marketplace](https://skillzy.ai/marketplace)
- **Contact:** `hi@skillzy.ai`

---

*Private memo. Please don't forward without permission.*
