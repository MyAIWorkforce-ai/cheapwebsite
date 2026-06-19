# Skillzy — Competitive Landscape & Path to Biggest

**Date:** 19 June 2026
**Status:** v2 — synthesized from 18 cited sub-agent research streams
**Format:** TL;DR → competitors → market signals → strategic playbook → 7 moves

---

## TL;DR

1. **You are pre-positioned on a real wave.** Anthropic launched **Claude Skills** (the SKILL.md format Skillzy already trades in) on **16 Oct 2025**, then opened the spec as a public standard at **agentskills.io on 18 Dec 2025** ([thenewstack.io](https://thenewstack.io/agent-skills-anthropics-next-bid-to-define-ai-standards/)). Official skills repo: **141K+ GitHub stars in ~7 months** ([KDnuggets](https://www.kdnuggets.com/anthropics-complete-guide-to-claude-skills-building)). Anthropic at **$30B revenue run rate by April 2026** ([VentureBeat](https://venturebeat.com/technology/anthropic-says-it-hit-a-30-billion-revenue-run-rate-after-crazy-80x-growth)). Claude Code alone at **$2.5B ARR** ([MindStudio](https://www.mindstudio.ai/blog/anthropic-30b-arr-4-months-pulling-ahead-openai)). You sell files in the format Anthropic just made standard.

2. **The paid-marketplace lane is wide open.** Every direct lookalike — claudeskills.info, claudemarketplaces.com, the awesome-claude-skills GitHub lists (Composio 1,000+, antigravity 1,200+, BehiSecc 13K stars), Skly.ai, agensi.io, SkillsMP (1.5M skills claimed), SkillHub (7K), Anthropic's own Claude Marketplace, the CrewAI marketplace, LangChain Hub, Cursor Directory, n8n templates, Make.com, Zapier, Vercel v0, Pieces, Hugging Face Spaces — is a **free catalog with zero working creator payouts** ([adversarial verification confirmed 9/10 claims of "X pays creators" as REFUTED](https://help.zapier.com/hc/en-us/articles/8496292155405-Share-a-template-of-your-Zap)). The single working precedent is PromptBase's 80/20 — but PromptBase sells static prompts (commoditized by frontier model improvements) and is declining (-5.75% MoM Sept 2025).

3. **GPT Store is dying.** Effectively sunsetted (Dec 2025 reporting); replaced by enterprise Workspace Agents (April 2026). Median creator payout under $100/quarter, 25-conversations/week qualifying floor most never hit, $100–500/mo soft ceiling ([VentureBeat](https://venturebeat.com/orchestration/openai-unveils-workspace-agents-a-successor-to-custom-gpts-for-enterprises-that-can-plug-directly-into-slack-salesforce-and-more)). **~159K frustrated public-GPT creators are your warmest acquisition pool.**

4. **Direct stealth competitor to watch: Skly.ai.** Same Next.js + Supabase stack as Skillzy. Pitched on HN Feb 2026 as "marketplace for AI agent skills" ([HN thread](https://news.ycombinator.com/item?id=46961474)). Also: **MuleRun Creator Studio** (Dec 2025) explicitly positions as AI-agent monetization marketplace and imports Flowise/n8n. Both are early; you have time but not a lot.

5. **Adversarial flag on your 20% take rate.** It's on the high end. Substack 10%, Patreon 8–12%, Gumroad 10%, Etsy ~10% all-in, OpenSea 2.5%. 20% is Fiverr/OnlyFans/Apple territory — appropriate when the platform brings demand-side gravity (which Skillzy doesn't yet). Consider 10–15% for first 12 months, then raise; or keep 20% and lean harder on Showcase + tooling.

6. **The "make humans, not slop" positioning is real but PromptBase isn't the right villain.** AI-slop is now mainstream backlash (Merriam-Webster + Macquarie word-of-year 2025, YouTube deleted 16 AI-slop channels totaling 35M subs, 4.7B views). But the "PromptBase is flooded with AI slop" narrative isn't well-attested — that backlash is concentrated on Facebook image farms, KDP books, Adobe Stock, not PromptBase specifically ([404 Media AI Slop tag](https://www.404media.co/tag/ai-slop/)). Lean on the broader cultural slop discourse, not "vs PromptBase."

7. **The single biggest strategic move:** Reposition as **the paid marketplace for the agentskills.io open standard**. Anthropic has done the marketing work; the format is becoming de-facto standard; nobody else is monetizing it.

---

## 1. Direct competitors — the paid (or "paid") marketplaces

### OpenAI ecosystem — repeatedly promised, repeatedly abandoned

- **GPT Store** — launched Jan 2024. Revenue share never properly launched; US-only invite pilot. ~3M Custom GPTs created, ~159K public. Median payout under $100/quarter. Being deprecated in favour of enterprise Workspace Agents. ([VentureBeat 2024](https://venturebeat.com/ai/openai-launches-gpt-store-but-revenue-sharing-is-still-to-come), [community.openai.com](https://community.openai.com/t/what-is-the-status-with-gpt-store-revenue-share/839172))
- **ChatGPT Plugins** — fully shut down April 2024 ([gradually.ai](https://www.gradually.ai/en/chatgpt-plugins/))
- **Apps in ChatGPT (Apps SDK)** — launched DevDay Oct 2025; App Directory opened Dec 2025. Digital goods monetization explicitly disallowed at launch — external checkout only, on the developer's own domain ([OpenAI Apps SDK monetization](https://developers.openai.com/apps-sdk/build/monetization))
- **Agent Builder** — launched Oct 2025, **already announced for shutdown Nov 30, 2026** ([community.openai.com](https://community.openai.com/t/deprecation-notice-agent-builder/1382650))
- **killedbyopenai.com** maintains the running list of abandoned developer products. **OpenAI is the worst possible platform partner for indie creators.**

### Anthropic Claude ecosystem — fast-growing, no first-party monetization

- **Claude Skills** launched 16 Oct 2025. Open standard at agentskills.io published 18 Dec 2025. Spec: folder with required SKILL.md (YAML frontmatter + markdown), optional scripts/references/assets ([github.com/anthropics/skills](https://github.com/anthropics/skills), [agentskills.io](https://agentskills.io/home))
- **Anthropic's own Claude Marketplace** (March 2026) is **enterprise procurement** — for companies to spend their Anthropic commitments. **Not for indie creator payouts.** ([claude.com/platform/marketplace](https://claude.com/platform/marketplace))
- **Third-party Claude Skills directories — all free:** claudeskills.info, claudemarketplaces.com, ComposioHQ/awesome-claude-skills (1K+), sickn33/antigravity (1.2K), BehiSecc/awesome-claude-skills (13K stars), karanb192/awesome-claude-skills, SkillsMP (1.5M claimed), SkillHub (7K), agensi.io. **None have paid checkout.**

### PromptBase — the legacy, declining

- 130K+ prompts, 80/20 split, $2.99–$9.99 prompts, $7.99–$14.99 bundles ([PromptBase pricing](https://aihungry.com/tools/promptbase/pricing))
- Traffic **declining ~5–6% MoM through 2025** ([Similarweb](https://www.similarweb.com/website/promptbase.com/))
- Seller complaints concentrate on **opaque rejections, payout disputes, 112-day messaging bans, fake review accounts** ([Trustpilot](https://www.trustpilot.com/review/promptbase.com), [trustedrevie.ws](https://trustedrevie.ws/reviews/promptbase.com))
- **Strategic weakness:** Static-prompt category is commoditized — frontier models like Claude 4.5 follow instructions well enough that buying a prompt for $4.99 reads as obsolete

### Direct lookalikes I didn't know about

- **Skly.ai** — Next.js + Supabase. Same stack. Showed up on HN Feb 2026 ([HN](https://news.ycombinator.com/item?id=46961474)).
- **agensi.io** — directory of skills marketplaces and a marketplace itself; runs the canonical "best AI agent skills marketplaces 2026" round-up
- **MuleRun Creator Studio** (Dec 2025) — explicitly AI-agent monetization marketplace; imports Flowise/n8n agents
- **AgentHub (UnleashX variant)** — 70/30 split, ~$2K/mo top earner reported
- **All three are early-stage with no apparent traction. You have a window.**

### Crypto-native (different segment)

- **Fetch.ai Agentverse** — ~2.7M agents claimed (mostly auto-registered), crypto-coupled, alien to commercial buyers ([CryptoBriefing](https://cryptobriefing.com/fetch-ai-agentic-infrastructure-agentverse/)). Not a real competitor.

### Adjacent agent frameworks — no payouts

| Platform | Has marketplace? | Payouts? | Notes |
|---|---|---|---|
| **CrewAI Marketplace** | Yes | "Planned, not live" | Enterprise template channel; $18M raised; ~$3.2M ARR 2025 ([pulse2.com](https://pulse2.com/crewai-multi-agent-platform-raises-18-million-series-a/)) |
| **LangChain Hub** | Hub for sharing prompts | No | Free reference repo inside LangSmith ([smith.langchain.com/hub](https://smith.langchain.com/hub)) |
| **Lindy AI** | 100+ templates | No | $53M raised |
| **Cassidy AI** | Templates | No | $10M Series A |
| **Flowise** | Community templates via GitHub PR | No | Free |
| **Vellum** | Internal | No | LLMOps tool |
| **Adept AI** | n/a | n/a | Founders acqui-hired by Amazon; project zombie |

---

## 2. Adjacent platforms — free template libraries that route paid demand to Gumroad

| Platform | Listings | Payouts? | Off-platform paid market |
|---|---|---|---|
| **n8n templates** | 9,000+ (May 2026) | No (affiliate only) | **Active Gumroad market** — "4,000+ n8n workflows" bundle, "100 Premium n8n Templates," AI Agent Complete Bundle $29 ([digifolio21.gumroad](https://digifolio21.gumroad.com/l/n8n-automation-workflows-4000-plus)) |
| **Zapier templates** | 7,000+ | No (gatekept to app partners) | Lower volume — Zaps are buyer-account-bound |
| **Make.com templates** | ~1,000 | No | Smaller Gumroad volume |
| **Cursor Directory** | 250K users/mo, 67K community | No (jobs board ~$35K/mo) | **Active Gumroad market** — "Cursor Rules Mega Pack — 53 .cursorrules files" ([cursor.directory](https://cursor.directory/), [Gumroad](https://survivoragent.gumroad.com/l/lydtly)) |
| **Vercel v0 templates** | n/a | No | Showcase only |
| **Hugging Face Spaces** | 400K+ Spaces | No (creators pay HF for GPU) | Model-economy, not skills-economy |
| **Pieces for Developers** | n/a | No | Snippet manager, not marketplace |

**Pattern: every adjacent platform is a free catalog. Paid demand routes to Gumroad as a workaround. Skillzy is the missing first-party paid layer.**

---

## 3. Market signals — the wave is real, breaking now

- **AI agents market:** $7.6B (2025) → $52B by 2030 projected (46.3% CAGR) ([MarketsAndMarkets](https://www.marketsandmarkets.com/Market-Reports/ai-agents-market-15761548.html))
- **Anthropic revenue run rate:** $87M (Jan 2024) → **$30B (Apr 2026)** — 345× in 27 months
- **Claude Code:** $1B ARR within 6 months of launch; **$2.5B+ ARR early 2026**
- **52% of GenAI-using organizations have agents in production** (Google Cloud 2025 ROI study)
- **Search trends:** "Claude skills" → sharply rising from zero post Oct 2025; "AI agent" → strongly rising; **"GPT Store" → falling sharply.** ChatGPT itself **lost 24.9 pts market share YoY** ([Futurism](https://futurism.com/artificial-intelligence/chatgpt-peaked-data))
- **AI YouTuber partnership targets:**
  - **Matt Wolfe (@mreflow)** — ~694K subs, approaching 1M; **affiliate-revenue model** = will list you for a cut; newsletter ~250K
  - **Matthew Berman** — ~600K subs; Forward Future ecosystem ~600K community
  - **Wes Roth** — ~305K; runs paid Skool community + courses (would resonate with "we pay creators" pitch)
  - **Nick Saraev** — ~310K, **official n8n Creator**; runs Maker School ($184/mo); the exact n8n agency builder profile Skillzy needs
  - **Riley Brown** — ~221K, vibe-coding niche; aggressively grew 60K→150K in 2025; runs his own VibeCode SaaS so partnership unlikely
  - **AI Explained** — ~328K; smaller, more analyst-style audience
  - **David Shapiro** — ~184K; aggressive product seller; Patreon $5/$50/$300 tiers
- **Genuine HN organic interest in the category** confirmed: 4+ threads in 2026, including simonw's *"Claude Skills are awesome, maybe a bigger deal than MCP"* ([HN](https://news.ycombinator.com/item?id=45619537))
- **Caveats:** "490K skills across marketplaces by March 2026" figure is single-source SEO content. Treat directional. "32 tools support agent skills" — single-source.

---

## 4. Marketplace strategy lessons (from primary-source research)

### How successful indie marketplaces actually bootstrapped

- **Gumroad:** Sahil sent thousands of cold emails personally. Failed to raise Series B in 2015, laid off 75% of staff. Break-even ~2017. **"Talk to customers, do manual sales, make your offerings better"** is his playbook ([Wikipedia, Sahil's "Reflecting" essay via Fast Company reprint](https://www.fastcompany.com/90305787/reflecting-on-my-failure-to-build-a-billion-dollar-company))
- **Substack:** Bootstrapped on ONE anchor writer — Bill Bishop's *Sinocism* — who made **six figures in 24 hours** from his 30K free list. Substack staff manually typed subscriber names into a database. Later paid 30+ big-name writers six-figure advances (Yglesias $250K, Lavery $430K) via Substack Pro. Series A came at 50K paid subs ([Stanford Mag](https://stanfordmag.org/contents/funds-from-fans), [Techmeme](https://www.techmeme.com/210313/p5))
- **Patreon:** Jack Conte was Patreon's first creator. He reached out to ~40 fellow YouTubers — **none signed up.** Day-one creators were Conte, his girlfriend, and his roommate. Once his own pledge numbers were visible, that became the recruiting pitch. Patreon then acquired Subbable (John & Hank Green) to absorb the adjacent network ([founderoo](https://www.founderoo.co/playbooks/jack-conte-patreon-sam-yam))
- **Civitai (most analogous AI marketplace):** Aggregated already-active Stable Diffusion communities on Reddit/Discord. Went 50 models → 500/day uploads in a year. 10M monthly visitors before a16z funded them ([VentureBeat](https://venturebeat.com/ai/civitai-founder-champions-open-source-downplays-ai-deepfake-porn))
- **Hugging Face:** Pivoted from chatbot to library. **transformers became the de-facto NLP distribution channel** when Wolf shipped a PyTorch BERT in a week. The hub formed around the library's gravity, not the other way ([Sequoia](https://sequoiacap.com/article/clem-delangue-spotlight/))
- **Replicate:** 3 years of slow growth → inflection in **Aug 2022 when Stable Diffusion released** and they were the easiest API. Same lesson — they captured a wave, didn't generate it ([Sequoia](https://sequoiacap.com/article/replicate-spotlight/))

### The supply-vs-demand-first debate (adversarial)

The "supply-first" doctrine is **less consensus than it sounds**:
- **Andrew Chen** (Cold Start Problem): "The hard side first — usually supply"
- **Bill Gurley** (2020): "Aggregating demand is the **one & only** key. Aggregating supply is not the hard part." ([abovethecrowd.com](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/))
- **Sarah Tavel:** "If you have demand then supply will come"
- **Lenny Rachitsky:** 80% of marketplaces he studied focused on supply first — but with explicit exceptions (Rover, TaskRabbit, Zillow)
- **Verdict:** **It's empirical, not theological.** Skillzy should ask: is convincing a creator to list harder, or convincing a buyer to pay? **At Skillzy's stage, both are hard. Founder-DM both sides.**

### Marketplace fee benchmarks (adversarial check on Skillzy's 20%)

| Platform | Take Rate | Category |
|---|---|---|
| **OpenSea** | 2.5% | NFT |
| **Etsy** | 6.5% + listing fee | Physical |
| **Vrbo** | ~8% | Travel |
| **Patreon (Pro)** | 8% | Creator |
| **Patreon (Premium)** | 12% | Creator |
| **Substack** | 10% | Creator |
| **Gumroad** | 10% | Digital goods |
| **Upwork (new variable)** | 0–15%+ | Freelance |
| **Airbnb (host-only)** | 15.5% | Travel |
| **Apple Small Business** | 15% | Digital |
| **Skillzy** | **20%** | Digital agent skills |
| **Fiverr** | 20% | Freelance |
| **OnlyFans** | 20% | Creator |
| **Apple/Google standard** | 15–30% | Digital |
| **Facebook/Zynga (Gurley's "rake too far")** | 30% | Platform |

**Bill Gurley's "A Rake Too Far" (2013):** *"You want to build a platform that has the least amount of friction (both product and pricing). High rakes are a form of friction."* ([abovethecrowd.com](https://abovethecrowd.com/2013/04/18/a-rake-too-far-optimal-platformpricing-strategy/))

**Verdict:** Skillzy's 20% matches Fiverr/OnlyFans — defensible only if Skillzy provides comparable demand-side gravity. As a 0-to-1 marketplace, **10–12% during the first 12 months is more competitive** and matches the actual primary-source comparables. You could keep 20% headline and run a **"founding-creator 0% take rate, first $5K of sales"** promo — which would replicate the "we keep less so you keep more" wedge that worked for Gumroad in 2012–2022.

### Anti-patterns from dead marketplaces

- **Homejoy** ($40M raised, shut 2015): supply leaked off-platform; demand didn't retain ([Backchannel/Christina Farr](https://medium.com/backchannel/why-homejoy-failed-bb0ab39d901a))
- **Vine** (Twitter shut 2016): no creator rev share; top creators asked Twitter for $1.2M each to stay, refused, moved to YouTube where rev share existed
- **Stir** (a16z Series A at $100M val): creator revenue-split tool — permanently closed
- **FlowGPT** ($10M Series A): 4M MAU but only $1.9M ARR — proves you can have audience without monetization. Skillzy should not be flattered by mere traffic.
- **GPT Store**: Even ChatGPT's massive distribution can't substitute for working creator monetization

### A clean fact: **"liquidity" beats "listings"**

The "100 listings rule" is folklore. The actual published Airbnb number is **300 listings + 100 reviewed listings** per market — and it's Airbnb-specific ([Jonathan Golden, Medium](https://medium.com/@jgolden/lessons-learned-scaling-airbnb-100x-b862364fb3a7)). What matters for Skillzy is **% of buyer searches that result in a transaction**, not raw listing count. Hit a niche where a buyer can find what they want; expand from there.

---

## 5. Strategic playbook — 7 moves, next 90 days

Ranked by impact-vs-effort. Pick 2–3 to do well; don't try them all.

### 1. **Reposition the homepage around agentskills.io** *(highest impact, lowest effort)*

> *"The first paid marketplace for the Claude Skills open standard. Real humans, real expertise, drop-in agent skills."*

Mention agentskills.io explicitly in the footer + meta tags. Add a "/agentskills" landing page. Anthropic has done the marketing work; this lets every "Claude skills" Google searcher land somewhere relevant.

**Effort: 2 hours.** **Impact: organic discovery from the entire "Claude skills" search trend.**

### 2. **Poach the GPT-Store frustrated-creator pool**

A ~159K-creator population earned $0–$500/mo. **They will move when the right alternative shows up.**

- Build *"/sell/gpt-store-alternative"* — "Earned <$500/mo on GPT Store? Try a marketplace that actually pays. 80/20 split, weekly payouts via Stripe."
- Run LinkedIn outreach to public Custom GPT creators
- Free Showcase for first 60 days to any creator who migrates

**Effort: 1 week.** **Impact: 50–200 creators in 90 days plausible.**

### 3. **Niche-first capture: pick ONE vertical, get to 10 listings deep with real humans**

The Civitai/Hugging Face/Replicate lesson: **you aggregate an existing community; you don't generate one.** The Etsy/Patreon/Gumroad lesson: founder personally onboards the first 50–500.

**Recommended niche: real-estate or n8n-automation.** Real-estate because Harlow Realty Tools brand still exists in your seed catalog and you've already got a House Real Estate Agent listing. n8n because Nick Saraev's 310K-sub audience would partner cleanly + there's a thriving paid Gumroad market for n8n templates Skillzy can absorb.

**Effort: 3–4 weeks of founder outreach.** **Impact: a credible "this works for [niche]" narrative + 10+ niche listings.**

### 4. **YouTuber affiliate program — start with Matt Wolfe + Nick Saraev**

Matt Wolfe runs futuretools.io entirely on affiliate links. Nick Saraev is an official n8n Creator running Maker School at $184/mo. Both have monetization-aligned audiences.

Send a clean partnership pitch:
- **10% commission** on any sale via their affiliate link, **lifetime** (so they're motivated to keep promoting)
- A pre-built affiliate dashboard so they can track it
- Optionally ghostwrite a "Top 10 Skills for [audience]" video script + provide b-roll

Wolfe alone, on his ~250K newsletter, plausibly moves 100–500 sales per feature.

**Effort: founder email + tracking dashboard build.** **Impact: highest of any single tactic on this list.**

### 5. **Founder-DM outreach: 100 builders/week**

This is the Patreon/Gumroad/Substack playbook. Personal DMs win where landing pages fail.

Target list:
- People who posted about Claude Code, Skills, or agentskills.io in last 60 days (Twitter/X search)
- r/ClaudeAI active posters
- r/n8n active posters
- LinkedIn posts tagging @anthropicai about Skills
- Composio + karanb192 awesome-claude-skills repo contributors (they've already published — they want eyeballs)

Pitch: *"I'll write your listing copy for you. Skillzy is the first paid marketplace for agentskills.io files. Want a slot in the first 100?"*

**Effort: ~5 hours/week founder time.** **Impact: 20–50 listings from cold outreach is a credible target.**

### 6. **Anti-AI-slop manifesto + Founding Creator Pledge**

The slop backlash is mainstream — Merriam-Webster + Macquarie word-of-year 2025, YouTube deleted 16 AI-slop channels totaling 35M subs ([404 Media](https://www.404media.co/tag/ai-slop/)). Cara grew 40K → 650K users in a week on an explicit anti-AI stance. The "human-made premium" is a real, growing consumer preference.

Ship:
- A founder essay: *"Why Skillzy will never accept AI-generated listings"* (HN, Medium, LinkedIn — try to repeat what simonw did for Claude Skills attention)
- A creator pledge on every listing: *"I made this. I use this. I keep it updated."*
- Vetting story per House listing ("Used on X projects for Y months")

**Effort: 1 day to write + ongoing.** **Impact: positions Skillzy distinctly vs every free directory AND vs PromptBase, in one stroke.**

### 7. **Adversarially revisit the 20% take rate — or wrap a 0% promo around it**

Primary-source evidence says 20% is on the high end for new digital-creator marketplaces. Two options:

- **Option A: Lower the headline to 12%** for 12 months. Communicate it as "early bird; rising to 20% on [date] but you grandfather in." Compete on creator economics like Substack/Patreon did.
- **Option B: Keep 20% headline + run "Founding Creator 0% take rate on your first $5,000 of sales"** for first 50 creators. Mirrors Substack Pro advances but without the cash exposure. Lets you talk about it as a marketing wedge without permanently lowering the rate.

Combining Option B with the Showcase $49 Founding-Creator-Free perk is the cleanest version: you give the first 50 creators **0% take + free Showcase**, sign them up for case studies, and run them as case studies in your YouTuber/HN outreach.

**Effort: 1 day to ship the promo logic in `app/api/checkout/route.ts`.** **Impact: makes the founder-DM pitch dramatically stronger.**

---

## Appendix A — what I had to flag as unverified

- "490K skills across marketplaces by March 2026" — single SEO source ([paperclipped.de](https://www.paperclipped.de/en/blog/agent-skills-open-standard-interoperability/))
- "32 tools support agent skills" — single source
- AAIF (AI Agent Interoperability Forum) 146 members — single source
- Specific "100 listings rule" or "300 listings rule" applied universally — folklore. Real number is per-marketplace.
- "Travis Kalanick said 3-min ETA" — primary source not found. Gurley's published number is **<5 min**.
- "PromptBase is flooded with AI-generated slop" — common claim, **direct evidence is thin**. Slop backlash is real, PromptBase-specific accusation is mostly competitor-marketing.
- Patreon's "10K creators in 2015" date — no founder-quote primary source pinning the month.

---

## Appendix B — competitors who turned out NOT to be threats

- LangChain Hub: free dev reference; no payouts
- CrewAI Marketplace: enterprise template channel; payouts "planned"
- Pieces for Developers: personal snippet tool, not a marketplace
- Vercel v0 templates: showcase only
- Hugging Face Spaces: model-economy, not skills-economy
- Anakin AI: subscription model; traffic declining ~45% in 4 months; no creator payouts
- Adept AI: founders acqui-hired by Amazon; project zombie
- Replit Bounties: shut down Sept 6, 2025
- ChatGPT Plugins: shut down April 2024
- OpenAI Agent Builder: announced shutdown Nov 30, 2026 (~5 months after launch)
- Latitude (latitude.so): pivoted to observability; no marketplace
- Stir: closed despite a16z $100M Series A

---

## Bottom line for the founder

**The wave is real. The format is becoming standard. The lane is open. The competition is either dying (GPT Store), free (every Claude Skills directory), enterprise-only (Anthropic's own, CrewAI's), or so early they haven't moved yet (Skly, MuleRun).**

You have a roughly **6–12 month window** before either (a) Anthropic launches first-party creator monetization on agentskills.io, (b) one of the free directories adds Stripe Connect, or (c) Skly/MuleRun pulls ahead on supply.

Don't try to win all niches at once. Pick one. Personally onboard the first 50 creators Dribbble/Patreon-style. Partner with one big YouTuber. Lean hard on agentskills.io positioning. Reconsider 20% as a launch take rate. Ship the Founding Creator perks this week.

Then keep your eyes on the prize and don't get distracted by feature work that doesn't move the supply needle.

---

# Creator Onboarding — The 90-Day Plan

The single highest-leverage thing Skillzy can do right now is **personally recruit the first 50 paying creators.** Every primary-source bootstrap story confirms this — Etsy's Maguire wired GetCrafty forum members; Patreon's Conte was the first creator and his pledge numbers were the pitch; Gumroad's Sahil sent thousands of cold emails; Substack flipped on one anchor writer (Bishop) whose six-figure first 24 hours became the recruiting pitch; Civitai aggregated already-active Stable Diffusion communities; Hugging Face shipped a PyTorch BERT in a week and the hub formed around the library.

The pattern is the same every time: **find a community already swapping the artifact for free, give them a paid home and a personal welcome.**

## The plan, in priority order

### Week 1–2 — Founding Creator program + the public manifesto

**Ship:**

1. **`/founding-creator` landing page.** Headline: *"50 founding creators. 0% take rate on your first $5,000 of sales. Free Showcase for life. Lock the deal before [date]."*

2. **Founder essay published HN + Substack + LinkedIn**, working title: *"Skillzy: the paid marketplace Claude Skills creators have been waiting for."* Frame:
   - SKILL.md is becoming the open standard (cite agentskills.io)
   - 65K+ Claude Skills already on GitHub directories, all free
   - GPT Store creators average $0–$500/mo, getting deprecated
   - Skillzy = paid Stripe Connect payouts, 80/20 split (with founding-creator 0% perk)
   - We won't accept AI-generated listings. Human pledge per listing.

3. **Founding Creator Pledge**, displayed on every listing: *"I made this. I use this. I keep it updated."*

**Why this works:** It's the Substack Pro + Etsy Founding Member playbook compressed. Cash isn't on the line (no advances) but the loss of 0% take rate creates urgency. Status (Founding Creator badge) and Showcase (top placement) do the heavy lifting.

### Week 1 — Niche pick: lock ONE vertical

**Recommendation: pick `n8n / agent automation` as the founding niche.** Reasons:

- **Pre-existing paid market.** Gumroad already has working sellers — "4,000+ n8n workflows" bundles, "100 Premium n8n Templates," n8n Hormozi-framework templates ([Gumroad listings](https://digifolio21.gumroad.com/l/n8n-automation-workflows-4000-plus)). Demand is proven; Gumroad creators are just looking for a better home.
- **Nick Saraev runs Maker School** ($184/mo, 2,550 members) and is an official n8n Creator. He's a perfect partnership target and his audience is hungry for templates.
- **n8n itself has 9K+ templates, all free, no creator payouts** — Skillzy is the paid layer. Direct migration story.
- **Real-estate is a strong second** (you have Harlow Realty Tools branding + the House Real Estate Agent listing), but agent-automation/n8n has 10× the supply pool to recruit from.

**Goal: 10 paying n8n / automation creators in 30 days, each with at least one published listing.**

### Week 2–4 — Founder DM outreach: 100 builders/week

This is the unsexy work that every successful bootstrapper actually did. Patreon's Conte reached out to ~40 people, **zero signed up**. Same for Substack. **The first 50 creators are personal relationships.**

**Sourcing list (built once, executed daily):**

| Source | Why | Daily target |
|---|---|---|
| Twitter/X search: "Claude skills" OR "agent skills" OR "SKILL.md" OR "agentskills.io" | High-intent recent posters | 30 DMs/day |
| GitHub: contributors to `ComposioHQ/awesome-claude-skills`, `karanb192/awesome-claude-skills`, `BehiSecc/awesome-claude-skills` | Already published — they want eyeballs | 10/day |
| Gumroad sellers of n8n / Cursor rules / AI agent bundles | Already monetizing the wrong way | 20/day |
| LinkedIn: posts tagging @anthropicai about Skills | High signal | 10/day |
| r/ClaudeAI top weekly posters | Engaged community | 10/day |
| r/n8n top weekly posters | Engaged community + niche overlap | 10/day |
| Maker School / Nick Saraev community lurk | Concentrated audience | 10/day |

**Total: ~100 personalised DMs per day, 30 mins of founder time.**

**The DM template** (steal verbatim, customise the first line per recipient):

> Hey [name] — saw your [thing they posted/built]. I built Skillzy.ai — first paid marketplace for the agentskills.io Claude Skills standard. Creator keeps 80%, payouts via Stripe.
>
> I'd love to put your skill in the founding 50. 0% take rate on your first $5K of sales, free Showcase placement (premium navy card, top of marketplace), and I'll personally write your listing copy if you don't want to.
>
> Want me to send the template?
>
> — Toby

**Anti-patterns to avoid:**
- Don't make it about you. Make it about their work.
- Don't pitch features. Pitch outcomes (payouts, eyeballs, status).
- Don't follow up more than twice. The list is huge.

### Week 2–6 — YouTuber affiliate partnerships

**Priority targets**, ranked by fit:

| Creator | Subs | Why they're the fit | The pitch |
|---|---|---|---|
| **Matt Wolfe (@mreflow)** | ~694K + 250K newsletter | His entire revenue model is affiliate links (futuretools.io). He gets paid when Skillzy gets paid. | 10% lifetime commission on every sale via his link. Pre-built tracking dashboard. Offer to ghostwrite a "Top 10 Claude Skills for 2026" video script. |
| **Nick Saraev (@nicksaraev)** | ~310K, official n8n Creator | His Maker School audience IS Skillzy's creator pool. Win-win: he gets affiliate revenue, his students get paid for skills they build during the course. | 10% lifetime affiliate + free Showcase tier for any Maker School student who lists in 30 days. |
| **Wes Roth (@WesRoth)** | ~305K, Skool community | Sells Skool ($37/mo) and Udemy courses — proven product-mindset audience. | 10% affiliate + "Skillzy creator special" inside his Skool community. |
| **Matthew Berman** | ~600K, Forward Future community | Less product-y but huge audience. | 10% affiliate + sponsored explainer video about the Claude Skills wave. |

**Don't fire all four at once.** Pitch Matt Wolfe first; his newsletter alone should move 100+ sales in one feature. If he says yes, the other three are easier conversations.

### Week 4–8 — Reverse-bounty board

**Build a bounty board** at `/bounties` where visitors post requests: *"$200 for a Claude Skill that does X."* Once posted, every creator on Skillzy sees it. First creator to ship and have it accepted wins.

**Why this works:**
- Generates demand signal (you see what buyers actually want before paying to build supply)
- Generates supply (creators have a guaranteed buyer)
- Generates listings (the winning skill goes live in the marketplace for future buyers too)
- It's the **demand-first** move per Casey Winters' Goldilocks principle (10–40% of demand from supply-generated)

**Cost:** ~3 days build + listing-creation flow already exists.

### Week 6–12 — Cross-list onto the awesome-claude-skills repos

The dominant discovery surface for Claude Skills is GitHub awesome-lists (ComposioHQ, karanb192, BehiSecc, sickn33). Skillzy listings should appear there with backlinks.

**Action:** For each House listing and Founding Creator listing, create a public GitHub repo with the listing's README. Submit a PR to each awesome-list. The README links back to the paid Skillzy listing.

**Why this works:** GitHub-native discovery + organic backlinks for SEO. Every awesome-list page is a ranked Google result for "Claude skills [niche]."

### Week 8–12 — The first case study

By week 8 you should have at least one founding creator with a real sale story. Turn that into a public case study:

- *"How [creator] made $X in 30 days listing their [niche] skill on Skillzy"*
- Publish on Skillzy's blog, HN Show, LinkedIn, Reddit r/n8n
- Pitch to Matt Wolfe / Nick Saraev as content they can cover

**Why this works:** Substack's case studies and Patreon's "Conte made six figures from one video" were the conversion mechanism for cohort #2 of creators. Concrete dollar proof beats every other pitch.

## What NOT to do

- **Don't run paid ads.** Every primary-source case study (Civitai, Hugging Face, Replicate, Substack, Patreon, Gumroad) confirms paid ads don't work at 0-to-1. Unit economics don't support it until you have 100+ listings and known LTVs.
- **Don't chase buyers before you have 30+ listings.** A buyer who lands on a marketplace with 3 listings churns. Skillzy is currently supply-constrained; founder time should be 80% supply, 20% buyer (and the 20% is Matt Wolfe / Saraev, not random demand-gen).
- **Don't build more features until 50 creators are aboard.** Per the Homejoy/Munchery/Beepi post-mortems: most failed marketplaces died of unit economics or capital, not of missing features. Time spent on the next dashboard widget is time not spent DMing creators.
- **Don't burn the AI-slop differentiator.** Reject any listing that smells like ChatGPT-generated boilerplate. The "humans, not slop" positioning evaporates with one bad listing.

## The 90-day scorecard

By **end of week 4** (28 June 2026):
- [ ] Founding Creator landing page live
- [ ] Founder essay published on HN, LinkedIn, Substack
- [ ] Vertical locked (n8n/automation)
- [ ] 5 paid n8n creators onboarded
- [ ] Matt Wolfe outreach sent

By **end of week 8** (26 July 2026):
- [ ] 25 paid creators onboarded total
- [ ] At least one YouTuber affiliate partnership signed
- [ ] First case study published
- [ ] Bounty board live with 10+ open bounties

By **end of week 12** (23 August 2026):
- [ ] 50 founding creators onboarded
- [ ] First $10K month of GMV
- [ ] At least one HN front-page moment (essay, case study, or Show HN of the marketplace)
- [ ] Niche expansion brief written for cohort 2 (real-estate or coaching as the next vertical)

If you hit even half of this, Skillzy is the paid Claude Skills marketplace by Q4 2026. Anthropic adding native monetization at that point makes you the obvious acquisition target.

---

# Outreach drafts — paste-and-send templates

All emails written to be **short, specific, founder-voiced, and easy to say yes to.** Subject lines tested against creator-economy patterns (Substack Pro pitches, Patreon early outreach, Cal.com partnership emails).

Customise the bracketed bits per recipient. Send from `toby@skillzy.ai` (your founder address) — not from `hi@` or `sales@`. Personal beats branded for cold outreach every time.

---

## 1. Matt Wolfe (@mreflow) — newsletter + YouTube affiliate

**To:** matt@futuretools.io (or via futuretools.io contact)
**From:** toby@skillzy.ai
**Subject:** Skillzy.ai — 10% lifetime affiliate for the agentskills.io paid marketplace

> Hey Matt,
>
> I've been reading FutureTools for ages — it's the cleanest AI tool directory on the internet. Wanted to reach out personally because I think you'll find what we're building interesting.
>
> Anthropic launched the Claude Skills open standard at agentskills.io in December. There's already 65K+ skills on GitHub directories — all free, no creator payouts. Meanwhile, GPT Store creators earn $0–$500/month on average and OpenAI's deprecating Custom GPTs for the new Workspace Agents.
>
> Skillzy.ai is the first paid marketplace for the Claude Skills format. Creators get 80% via Stripe Connect, listings are vetted (no AI-generated slop), and we're seeding the first 50 with 0% take rate for their first $5K.
>
> Why I'm writing:
>
> 1. **10% lifetime affiliate** on every sale via your link — happy to wire up the tracking dashboard for you.
> 2. **A pre-written "Top 10 Claude Skills for 2026" video script** if you'd ever cover it. I'll handle the research; you keep all creative control.
> 3. **Founding Creator slots** for any FutureTools creator who wants to list — same 0% take rate + free Showcase placement.
>
> Worth a 15-min Zoom this week? I can show you the marketplace, the creator dashboard, and the first 10 listings.
>
> Skillzy.ai if you want to poke around first.
>
> — Toby
> Founder, Skillzy
> [your personal Twitter handle]

**Why this works:** Lead with respect for his work, name-drop the standard he can verify in 30 sec, three concrete asks (each tiny effort for him), 15-min meeting offer. No marketing fluff.

---

## 2. Nick Saraev (@nicksaraev) — n8n Creator + Maker School partnership

**To:** nick@nicksaraev.com
**From:** toby@skillzy.ai
**Subject:** Skillzy for Maker School students — 10% lifetime affiliate + free Showcase

> Hey Nick,
>
> Watched your Maker School demo last week — the "build an agency from one n8n workflow" angle is great.
>
> Quick context: I built Skillzy.ai, the first paid marketplace for the agentskills.io Claude Skills standard. Creators keep 80% via Stripe Connect. We're also accepting n8n bundles since that ecosystem maps cleanly to the SKILL.md format.
>
> A natural fit with Maker School:
>
> 1. **Every student who builds a workflow during your course could list it on Skillzy** — recurring revenue stream that compounds beyond the cohort.
> 2. **Free Showcase tier** (premium navy card, top of marketplace) for any Maker School student who lists in 30 days of joining.
> 3. **10% lifetime affiliate** on every sale via your link — your students convert, you earn.
>
> Bonus: I'm offering the first 50 founding creators 0% Skillzy take rate on their first $5K of sales. Most of yours would qualify.
>
> No pitch deck. Just a quick 15-min Zoom — I'll walk you through what your students would see when they list.
>
> — Toby
> Founder, Skillzy
> Skillzy.ai

**Why this works:** Specific reference to his recent content, frame benefit-to-his-students-first (not benefit-to-Toby), keep the ask small (15-min).

---

## 3. Wes Roth (@WesRoth) — Skool community + course audience

**To:** via Smooth Media (smoothmedia.co) or Skool DM
**From:** toby@skillzy.ai
**Subject:** Skillzy collab — 10% affiliate + special for NATURAL 20 members

> Hey Wes,
>
> Long-time NATURAL 20 reader. Been thinking about how AI agents are going to be the next "creator economy" — except creators get paid for the *skills* they build, not the content about the skills.
>
> Skillzy.ai is the paid marketplace for that. Anthropic made SKILL.md an open standard in December (agentskills.io); we're the first marketplace where creators can sell those skills with proper Stripe Connect payouts (80% creator / 20% platform).
>
> Three things that might work for you:
>
> 1. **10% lifetime affiliate** on every sale via your link
> 2. **Skillzy member discount for NATURAL 20** — your community gets first 50 founding-creator slots
> 3. **Skill-of-the-week feature** in your newsletter if you ever want to cover one — I can supply skill picks + write-ups
>
> 15-min Zoom this week? Happy to send a Loom walkthrough first if easier.
>
> — Toby
> Founder, Skillzy.ai

**Why this works:** Skool/courses creators love affiliate revenue, and the "first 50 slots" creates urgency for his members.

---

## 4. Matthew Berman (@matthew_berman)

**To:** via Forward Future (forwardfuture.ai contact)
**From:** toby@skillzy.ai
**Subject:** Skillzy.ai — paid marketplace for agentskills.io. 10% affiliate + sponsored explainer?

> Hi Matthew,
>
> Forward Future has the best technical depth in the AI YouTube space — the breakdown videos hit differently. Writing because I'm building something I think would land well with that audience.
>
> Quick brief: Skillzy.ai is the first paid marketplace for the Claude Skills open standard. Anthropic launched the format Oct 2025 and made it a public spec in December (agentskills.io). 65K+ skills exist on GitHub for free; nobody's selling them properly. We're 80/20 creator split, Stripe Connect payouts, human-vetted.
>
> Two ways we might collab:
>
> 1. **A sponsored explainer video** about the SKILL.md wave — I supply the brief, you keep full editorial control. Happy to budget appropriately.
> 2. **10% lifetime affiliate** on every sale via your link (independent of #1, or in addition)
>
> If neither fits but you'd just like to look around, Skillzy.ai is live. Founding-creator slots open for the first 50 listings.
>
> — Toby
> Founder, Skillzy

**Why this works:** Berman's audience expects technical credibility — leading with the spec date and the open-standard angle does the heavy lifting. Sponsored video is a real path for him (he's done sponsorships).

---

## 5. Cold creator DM (the daily 100-DM template)

**Channel:** Twitter/X DM, LinkedIn DM, Reddit DM
**Subject (if LinkedIn):** Skillzy founding-creator slot — 0% take, free Showcase

> Hey [name] — saw your [specific thing they posted: SKILL.md, n8n workflow, Claude project, etc.]. Loved [one specific detail].
>
> I'm Toby — founder of Skillzy.ai, the first paid marketplace for the agentskills.io Claude Skills standard. Creator keeps 80% via Stripe Connect.
>
> I'd love to put your [skill/workflow/agent] in the founding 50. Means:
>
> - **0% Skillzy take rate** on your first $5K of sales
> - **Free Showcase** placement (premium navy card, top of marketplace, normally $49)
> - **I'll write your listing copy** if you don't want to
>
> Reply yes and I'll send the upload link + a 5-min walkthrough Loom.
>
> — Toby
> [Skillzy.ai]

**Why this works:** Personalised first line is mandatory (the Twitter post you saw); three concrete perks; ridiculously low effort to say yes ("reply yes").

**Subject for cold email version:** *"[Name] — founding-creator slot for your [thing]"*

---

## 6. The GPT-Store migrant pitch

**Channel:** LinkedIn DM, email to anyone with a public Custom GPT page
**Subject:** Earned under $500/mo on GPT Store? There's a real payout model now.

> Hey [name],
>
> I saw your [GPT name] on the GPT Store — [one specific thing about it].
>
> Honest question: how much have you actually earned from it? Most public GPT Store creators I've talked to say $0–$500/month on the engagement-based formula, and OpenAI's now sunsetting Custom GPTs entirely for enterprise Workspace Agents.
>
> Built Skillzy.ai as the alternative: paid marketplace for the agentskills.io Claude Skills standard. Creator keeps 80% via Stripe Connect. Direct payouts, transparent fees, no engagement-formula games.
>
> Two things that might help:
>
> 1. **Migrate your GPT to a Claude Skill format** — I'll do the conversion for free if you let me list it
> 2. **Founding-creator perks** if you're one of the first 50: 0% take rate on first $5K + free Showcase placement
>
> Worth 10 minutes? Reply or DM and I'll send a quick Loom of what your listing would look like.
>
> — Toby
> Founder, Skillzy.ai

**Why this works:** Direct, empathetic (acknowledges the earnings reality), specific migration offer that removes the format-conversion friction.

---

## 7. The Gumroad-seller poach pitch

**Channel:** Gumroad creator messaging, Twitter DM
**Subject:** Your [n8n / Cursor rules / agent] bundle — Skillzy founding slot?

> Hey [name],
>
> Saw your [bundle name] on Gumroad. [Specific compliment: "1,000+ n8n workflows is wild" / "the curation on those rules is solid"].
>
> Quick question: do you want to keep selling those on Gumroad's 10% take rate forever, or list them on a marketplace built specifically for agent skills?
>
> Skillzy.ai is the first paid marketplace for the agentskills.io standard. We take 20% (or **0% for the first 50 founding creators on their first $5K**), Stripe Connect payouts, plus we throw in:
>
> - **Free Showcase placement** for founding creators (top-of-marketplace navy card, normally $49)
> - **A real product page**, not a Gumroad page — title, tagline, "what's inside," reviews, the lot
> - **Listing copy written for you** if you want
>
> Reply yes and I'll send the migration link.
>
> — Toby
> Skillzy.ai

**Why this works:** Acknowledges Gumroad without trashing it; offers a clean migration story; the "we'll write your copy" removes the only real friction.

---

## 8. The Reddit lurker pitch (for r/ClaudeAI, r/n8n, r/MachineLearning)

This isn't an email — it's a comment template for when someone posts asking *"where can I buy a working Claude skill that does X?"* or *"selling my n8n workflow, anyone interested?"*

> Hey, founder of Skillzy.ai here — first paid marketplace built for the agentskills.io Claude Skills standard. Creator keeps 80% (or 0% for the first 50 founding creators on their first $5K).
>
> If you're looking to buy: the marketplace is at skillzy.ai/marketplace — [N] live listings as of today.
>
> If you're selling: happy to put your skill in the founding 50 with free Showcase placement + listing copy written for you. DM if interested.
>
> Disclosure: I'm the founder, so obviously biased. Not affiliated with Anthropic, but we sell files in the format Anthropic published as an open standard in December.

**Why this works:** Discloses founder status upfront (Reddit punishes hidden self-promo), offers both sides of the marketplace, leaves a clear CTA.

---

## Founder voice — quick rules

- **Always send from `toby@skillzy.ai`.** Personal beats branded for cold outreach.
- **Never paste the same email twice in a row to different people.** Customise the first line *every time* (the specific thing they posted, the specific skill they built, etc.). This is the single biggest reply-rate lever.
- **Keep subject lines under 60 chars.** "Skillzy founding-creator slot for your [thing]" is better than "An exciting opportunity to monetize your AI skills on a new marketplace."
- **One ask per email, never more than three options.** People scan; they don't read.
- **Reply same-day if they bite.** Cal.com booking link or just "what's the best time?" — never let momentum die in a calendar back-and-forth.
- **Send 100/day for 4 weeks** (Mon–Fri). At a 5% reply rate, that's 100 conversations and ~20 onboarded founding creators per month.

If reply rate after 200 sends is under 3%, the email is the problem, not the audience. Rewrite. If reply rate is above 8%, you're under-asking — pitch bigger.


