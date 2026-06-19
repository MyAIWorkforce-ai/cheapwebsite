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

---

# Appendix: Full Raw Research Findings

The synthesis above is distilled from 50+ cited sub-agent research streams. The full raw research is preserved below — organised by theme — so you can dig into specific claims, follow source URLs, and adversarially check anything that looks too convenient. Every section ends with the original sub-agent's own caveats (what they could NOT verify), so trust nothing on faith. Each finding is a complete primary-source dossier.

---

## Section A — Direct Competitor Deep Dives

### A1. OpenAI GPT Store

**(a) Product — Custom GPTs.** No-code customized versions of ChatGPT built via natural-language instructions, optionally with uploaded knowledge files, custom actions/APIs, and tool access (browsing, DALL-E, code interpreter). Launched Jan 10, 2024; gated behind ChatGPT Plus/Team/Enterprise. ([OpenAI](https://openai.com/index/introducing-the-gpt-store/))

**(b) Pricing / revenue model — the headline finding.** Original promise: US-based builders would get paid based on "user engagement." Launched Q1 2024 in pilot ([VentureBeat](https://venturebeat.com/ai/openai-launches-gpt-store-but-revenue-sharing-is-still-to-come)). Program technically exists but is widely viewed as a failure: payouts average ~$0.03/conversation, soft ceiling $100–500/mo for most creators, formula opaque, 25-conversations/week minimum to qualify ([The GPT Shop](https://www.thegptshop.online/blog/openai-gpt-store-revenue-sharing), [FRANKI T Oct 2025](https://www.francescatabor.com/articles/2025/10/19/monetising-custom-gpts)). OpenAI is effectively sunsetting the consumer GPT Store: Dec 2025 reporting calls it "a flop" and signals replacement by an "Agent Store" ([Medium](https://medium.com/@maskendrickcw/openai-is-killing-the-gpt-store-welcome-to-the-agent-store-c79f6217095a)). Apr 22, 2026: OpenAI launched Workspace Agents as the enterprise successor to Custom GPTs (Slack/Salesforce integrations, credit-based pricing after May 6, 2026) ([VentureBeat](https://venturebeat.com/orchestration/openai-unveils-workspace-agents-a-successor-to-custom-gpts-for-enterprises-that-can-plug-directly-into-slack-salesforce-and-more), [Reworked](https://www.reworked.co/digital-workplace/openai-launches-workspace-agents-for-enterprise-workflow-automation/)).

**(c) Creator / listing counts.** 3M+ Custom GPTs created total; only ~159,000 public in the store ([SEO.ai](https://seo.ai/blog/gpt-store-statistics-facts)). Custom GPT usage grew 19x in 2025; ~20% of enterprise messages now go through Custom GPTs or Projects.

**(d) Traffic / usage.** Distribution sits inside ChatGPT: 900M WAU (Feb 2026, reaffirmed June 2026 by Reuters); ~1B MAU on the ChatGPT app by June 2026 ([demandsage](https://www.demandsage.com/chatgpt-statistics/), [TechnologyChecker](https://technologychecker.io/blog/chatgpt-statistics)). No per-GPT MAU disclosed.

**(e) Differentiators.** Native distribution to ~900M WAU inside ChatGPT — no separate app install. Integrated tool use (browsing, code interpreter, DALL-E, custom actions) out of the box, no infra for creators.

**(f) Weaknesses / controversies.** Flooded with spam and thin clones ("PDF summarizers," "dating coaches"); TechCrunch documented spam saturation March 2024 ([TechCrunch](https://techcrunch.com/2024/03/20/openais-chatbot-store-is-filling-up-with-spam/embed)). Discovery is poor and creator monetization is widely seen as broken — most builders earn $0; revenue share was geo-restricted to US for over a year ([OpenAI community thread](https://community.openai.com/t/guidance-for-gpt-store-builders-outside-the-us/1357911)). Privacy/security: prompt-leakage exploits exposed system prompts and uploaded docs; OpenAI logs metadata on all conversations ([Top10VPN](https://top10vpn.substack.com/p/friday-digest-16-privacy-pitfalls)). Strategic abandonment: pivot to Workspace/Agent Store signals consumer GPT Store is being deprecated as a creator platform.

### A2. OpenAI ecosystem state (June 2026)

- **ChatGPT Plugins: SHUT DOWN.** New plugin installs/chats disabled March 19, 2024; fully deactivated April 9, 2024. Replaced by Custom GPTs/Actions. ([gradually.ai](https://www.gradually.ai/en/chatgpt-plugins/))
- **Custom GPTs: dying for business, alive for individuals.** Being deprecated for Business/Enterprise/Edu/Teachers accounts (sunset Aug 26, 2026), replaced by Workspace Agents launched Apr 22, 2026. Individual consumer GPTs continue. ([VentureBeat](https://venturebeat.com/orchestration/openai-unveils-workspace-agents-a-successor-to-custom-gpts-for-enterprises-that-can-plug-directly-into-slack-salesforce-and-more), [Formwise](https://formwise.ai/blog/openai-deprecating-custom-gpts-migration-path))
- **GPT Store revenue share: never properly launched.** Announced Jan 2024, pilot remained invite-only, US-only, through 2025-2026. Rate never publicly disclosed; community reporting shows ~$0.03/conversation, $100-500/mo ceiling, 25-conversations/week minimum to qualify, most creators earn $0. ([VentureBeat](https://venturebeat.com/ai/openai-launches-gpt-store-but-revenue-sharing-is-still-to-come), [The GPT Shop](https://www.thegptshop.online/blog/openai-gpt-store-revenue-sharing), [community.openai.com](https://community.openai.com/t/what-is-the-status-with-gpt-store-revenue-share/839172))
- **Apps in ChatGPT / Apps SDK: launched DevDay Oct 6, 2025; App Directory opened Dec 2025.** Third-party monetization is via external checkout on developer's own domain. In-app "Instant Checkout" via Agentic Commerce Protocol (Stripe + OpenAI) is beta, physical goods only — digital goods/subscriptions NOT yet allowed. OpenAI takes an undisclosed cut. ([OpenAI](https://openai.com/index/introducing-apps-in-chatgpt/), [Apps SDK monetization](https://developers.openai.com/apps-sdk/build/monetization), [Inc.](https://www.inc.com/ben-sherry/chatgpt-just-created-a-new-way-for-brands-to-make-money-heres-how-it-works/91279264))
- **AgentKit/Agent Builder: NO marketplace, and Agent Builder is being killed.** Launched DevDay Oct 2025; OpenAI announced deprecation June 3, 2026, full shutdown Nov 30, 2026. ([OpenAI](https://openai.com/index/introducing-agentkit/), [community.openai.com](https://community.openai.com/t/deprecation-notice-agent-builder/1382650))
- **Major 2025-2026 pivots:** Plugins killed (Apr 2024); Assistants API sunset; Agent Builder deprecated (Nov 30, 2026); enterprise Custom GPTs replaced by Workspace Agents (Aug 26, 2026). ([killedbyopenai.com](https://www.killedbyopenai.com/))

**Takeaway:** OpenAI has repeatedly promised and abandoned creator economies. No working horizontal creator-payout system exists today.

### A3. PromptBase

**(a) Product categories.** Marketplace for AI prompts across ChatGPT, Midjourney, DALL-E, Stable Diffusion, Sora, FLUX, Gemini ([PromptBase](https://promptbase.com/)). Categories: art, logo, photography, 3D, cyberpunk, chatbot, marketing copy, email, writing, games. Expanded to: "Apps" (no-code AI app builder/store), "Hire" (creator services), and an AI Generator/playground ([PromptBase blog](https://promptbase.com/blog/promptbase-apps), [PromptBase create](https://promptbase.com/create)).

**(b) Pricing / revenue model.** 80/20 split — sellers keep 80%, platform takes 20% commission on prompts ([godofprompt.ai](https://godofprompt.ai/blog/ai-prompt-libraries-comparison-features-pricing-quality/), [aihungry.com](https://aihungry.com/tools/promptbase/pricing)). Prompts typically $2.99–$9.99; bundles $7.99–$14.99. No listing fee; $30 minimum payout threshold. Apps revenue split is 75/25 (creator/platform) on Pro-plan credit consumption due to compute costs.

**(c) Creators / listings.** "Over 130,000" curated prompts cited in 2025 reviews; "100k+" referenced in app-builder copy; some secondary sources claim 170,000 ([moge.ai](https://moge.ai/product/promptbase), [similarlabs](https://similarlabs.com/p/promptbase)). Public seller count not disclosed.

**(d) Traffic.** Similarweb (Sept 2025 snapshot): 51.76% organic search, 38.33% direct. Audience skews 65.5% male, primary age 25–34 ([Similarweb](https://www.similarweb.com/website/promptbase.com/)). Semrush (July 2025) groups it with competitors prompthero.com and imageprompt.org in a 1M–23M visit range, suggesting low-single-digit-million monthly visits ([Semrush](https://cw.semrush.com/website/promptbase.com/competitors)). Both gated behind login for exact figures.

**(e) Differentiators.** First-mover/brand: launched June 2022, "first platform to let creators sell prompts." Vertically integrated stack — Marketplace + no-code App Builder + Hire-a-prompt-engineer + in-house AI Generator playground.

**(f) Weaknesses / complaints.** Seller frustration: opaque prompt rejections, weak support, payout manipulation, long messaging bans (up to 112 days) ([trustedrevie.ws](https://trustedrevie.ws/reviews/promptbase.com)). Unmoderated 1-star reviews and fake accounts harming sellers ([Trustpilot](https://www.trustpilot.com/review/promptbase.com)). Broader community pushback that paywalling prompts "threatens openness of AI" — buyers can replicate purchased prompts free using ChatGPT itself ([Substack](https://datasciencelearningcenter.substack.com/p/the-substack-for-dall-e-prompts-has)).

### A4. PromptHero

**(a) What they sell.** Image/video AI prompt search engine + community gallery covering Stable Diffusion, Midjourney, DALL-E, ChatGPT ([futurepedia](https://www.futurepedia.io/tool/prompthero)). In-platform image/video generation via credits, one-tap "remix" of public creations, creator portfolios. Mobile app on Google Play. Single-modality (image/video); no agents or workflows. Reviewers call it "useless for text prompts" ([Medium](https://medium.com/design-bootcamp/i-tested-5-ai-prompt-libraries-for-30-days-heres-what-worked-f6efa8dc1b00)).

**(b) Pricing / revenue model.** Free tier; Starter $19/mo; Pro $29/mo (600 credits, priority access) ([saasworthy](https://www.saasworthy.com/product/prompthero/pricing)). Extra credits: $19 for 300, non-expiring. **No public creator revenue split disclosed** — it's a community/showcase + generation-credits model, not a transactional marketplace like PromptBase.

**(c) Creator/listing count.** No precise figures disclosed. Marketing claims "millions of AI prompts" — unverified.

**(d) Traffic.** Nov 2025: ~1.34M visits/mo, down 1.35% MoM (Semrush). Sept 2024: 919K; Nov 2024: 862K (Similarweb). Other source: ~2M monthly, global rank ~29K. Top geos: India, US, Brazil.

**(e) Differentiators.** Visual-first browsable gallery with searchable prompt-to-image pairs — strongest tool for Midjourney/SD inspiration. Integrated generation + community remix loop.

**(f) Weaknesses / complaints.** Image-only; no text/LLM/agent coverage. Scamdoc trust score 45%; "no refunds for ToS violations" complaints.

**(g) Status — alive, acquired.** Acquired by ElevenYellow on Nov 6, 2024 ([PitchBook](https://pitchbook.com/profiles/company/539641-54)). Pricing updated Aug 2025; active mobile app + steady ~1M+ monthly visits. No pivot to agents/workflows.

### A5. Anakin AI

**(a) What they sell.** No-code platform with 1,000+ pre-built AI apps spanning text/image/video/voice generation, chatbots, workflows, batch processing and "Auto Agents" ([anakin.ai App Store](https://anakin.ai/apps)). Users can build standalone AI apps via no-code builder; multi-model access (GPT-4, Claude 3, Stable Diffusion, Gemini).

**(b) Pricing / revenue model.** Free tier: 30 credits/day, Gemini only. Basic $9.90/mo, Pro $19.90/mo, with ~9,000 credits and access to GPT-4/Claude. Credit-based consumption. **No published creator revenue split or payout program** — monetization is subscription-only for Anakin, not a two-sided marketplace.

**(c) Creator/listing count.** 1,000+ pre-built apps advertised, but disclosures conflate Anakin-built vs. user-published apps.

**(d) Traffic.** Semrush: ~904K visits Dec 2025, declining to ~497K by Apr 2026 — roughly 45% drop in 4 months ([semrush](https://www.semrush.com/website/anakin.ai/overview/)).

**(e) Key differentiators.** Multi-model + visual workflow builder + batch processing — features Poe/ChatGPT don't expose.

**(f) Weaknesses.** "Community discussion is thin… no meaningful body of independent user reviews… lacks organic word-of-mouth." Scam Detector trust score only 48.4. Mobile unsupported; beta-stage bugs; steep learning curve. Negligible Reddit footprint.

**Bottom line:** Anakin monetizes end-users via subscription; creators are not a monetized segment. Declining traffic + silent creator community suggest it's not a competitive threat.

### A6. CrewAI Marketplace

- **Official marketplace exists at marketplace.crewai.com** — but it functions as a submission portal for crew templates to be featured inside CrewAI Enterprise, not a consumer storefront. ([marketplace.crewai.com](https://marketplace.crewai.com/), [docs](https://docs.crewai.com/en/enterprise/features/marketplace))
- **Template sharing is official and centralized.** CrewAI publishes `crewAIInc/marketplace-crew-template` and `marketplace-flow-template` repos as the standardized scaffold for submissions. Approved templates get hosted inside the CrewAI Enterprise app.
- **Creator monetization is PLANNED, not live.** Marketplace messaging promises early partners "access to a planned revenue share program for templates used by enterprise customers." **No specific percentage is published** — only described as "planned." Submission itself is free.
- **CrewAI Enterprise / AMP is separate.** AMP ("Agent Management Platform") is the paid SaaS/self-hosted product (Free, Pro $25/mo, Enterprise custom — estimated $60-120K/yr). The marketplace is a distribution channel feeding templates *into* AMP. ([blog.crewai.com](https://blog.crewai.com/crewai-amp-the-agent-management-platform/), [lindy.ai pricing](https://www.lindy.ai/blog/crew-ai-pricing))
- **Third-party template repos are active.** Official `crewAIInc/awesome-crewai`; core repo at ~47.8K stars (Apr 2026). Third-party hubs exist but individual-maintainer scale.
- **No acquisitions or shutdowns 2025-2026.** $18M Series A (Insight Partners, Oct 2024); ~$3.2M ARR in 2025; 2B executions in trailing 12 months by Jan 2026. ([pulse2.com](https://pulse2.com/crewai-multi-agent-platform-raises-18-million-series-a/), [getlatka](https://getlatka.com/companies/crewai.com))

**Bottom line:** CrewAI is not a direct competitor for creator-monetized AI workflows today. Vague future revenue share — no working creator payout rails as of June 2026.

### A7. LangChain Hub

- **What it is / URL:** LangChain Hub is a community prompt-sharing repository built **inside LangSmith** (LangChain's observability/eval platform), at **`smith.langchain.com/hub`**. The legacy `hub.langchain.com` redirects/has been superseded; the GitHub `hwchase17/langchain-hub` repo is the deprecated original. ([docs.smith.langchain.com](https://docs.smith.langchain.com/prompt_engineering/how_to_guides/prompts/langchain_hub))
- **Hub vs LangSmith:** LangSmith is the broader product (tracing, evals, debugging, deployment); the Hub is a sub-feature for prompt browsing/forking/versioning. Each prompt gets a URI (`owner/prompt-name:commit-hash`) pulled via SDK.
- **Pricing (2026):** Developer = free (1 seat, 5k traces/mo, 14-day retention). Plus = $39/seat/mo (10k traces, $2.50/1k overage). Enterprise = custom (SSO, self-host, SOC2/HIPAA). Browsing the Hub itself requires no account.
- **CRITICAL — Creator monetization: NONE.** Adversarially checked: no payouts, no revenue share, no paid prompt listings. It is a free community/reference repository; LangChain explicitly notes prompts are "user-generated and unverified." Creators only get attribution + a URI handle.
- **Prompt count:** No official public count published.
- **Users:** Heavily enterprise/developer — 5,000+ companies use LangChain's LLMOps monthly, including Rakuten, Klarna, Elastic, Moody's, Retool, Podium. The Hub itself skews toward LangChain/LangGraph developers needing reference prompts.

**Bottom line:** LangChain Hub is *not* a creator-monetization competitor — it's a free dev-tools reference repo.

### A8. Anthropic Claude Skills

- **Launch date.** Anthropic launched Skills on **Oct 16, 2025**, with prebuilt skills for PPTX/XLSX/DOCX/PDF and custom-skill support across Claude.ai, Claude Code, and the API. The Agent Skills spec was then published as an **open standard on Dec 18, 2025** at agentskills.io. ([verdent.ai](https://www.verdent.ai/guides/claude-skills-announcement-news), [aibusiness.com](https://aibusiness.com/foundation-models/anthropic-launches-skills-open-standard-claude))
- **Official Anthropic marketplace.** Anthropic runs a curated plugin/skill directory at **github.com/anthropics/claude-plugins-official** and a community-review directory **claude-community**; both surface in Claude Code's "Discover" tab. Official skills repo at **github.com/anthropics/skills**. No paid storefront — distribution is free/Git-based.
- **File format.** A skill is a folder with a required **`SKILL.md`** (YAML frontmatter — required fields `name` and `description`, optional extras — then markdown instructions). Optional sibling dirs: `scripts/`, `references/`, `assets/`. Progressive disclosure: metadata loads first, body on demand. ([agentskills.io](https://agentskills.io/home), [deepwiki SKILL.md spec](https://deepwiki.com/anthropics/skills/2.2-skill.md-format-specification), [code.claude.com](https://code.claude.com/docs/en/skills))
- **Folder paths.** Claude Code: personal at **`~/.claude/skills/`**, project-scoped at **`.claude/skills/`** in repo (Windows: `C:\Users\<user>\.claude\skills\`). Claude.ai: managed via Settings > Capabilities (org-admin controlled on Team/Enterprise). ([agensi.io](https://www.agensi.io/learn/where-are-claude-skills-stored))
- **Third-party Skills directories (direct Skillzy competitors).**
  - **claudeskills.info** ("Claude Skills Hub") — self-billed "largest" browse/download marketplace.
  - **claudemarketplaces.com** — directory of skills, MCP servers, plugins.
  - Multiple **awesome-claude-skills** GitHub lists: **ComposioHQ** (1000+), **karanb192** (50+ verified), **travisvn**, **JayZeeDesign**, **Chat2AnyLLM**, **BehiSecc**.
  - **sickn33/antigravity-awesome-skills** (~1200 skills).
  - **dashed/claude-marketplace** — local personal marketplace tooling.
- **Creator monetization.** **No announced first-party monetization or revenue share from Anthropic.** Skills are positioned as a retention/differentiation layer on existing Claude subscriptions; analyst commentary speculates about future premium/à-la-carte pricing but nothing shipped. ([getmonetizely](https://www.getmonetizely.com/articles/are-claude-skills-a-feature-a-sku-or-a-platform-monetization-layer), [venturebeat](https://venturebeat.com/ai/how-anthropics-skills-make-claude-faster-cheaper-and-more-consistent-for))

**Implication for Skillzy:** the existing third-party directories are all **free catalogs**, not paid storefronts. No incumbent has paid checkout + creator payouts — the monetization lane is open.

### A9. Cursor Directory + Latitude

**Cursor Directory (cursor.directory)**

- **What's listed:** .cursorrules / .mdc rule files for Cursor AI editor, plus MCP servers, a jobs board, and community/news feed.
- **Pricing / monetization:** Free to use; fully open-source (~3,800 GitHub stars). Revenue ~$35K/month, driven primarily by the jobs board and sponsored placements — not creator monetization. There is no revenue share to rule authors. ([tinystartups](https://www.tinystartups.com/revenue/cursor-directory), [mcpize](https://mcpize.com/alternatives/cursor-directory))
- **Listings / contributors:** Site claims "83k+ developers" in community and ~1,800+ MCP servers listed. **PatrickJS/awesome-cursorrules** has ~40K stars and 500+ curated rules. Founded by Pontus Abrahamsson (also co-founder of Midday); launched on a weekend in mid-2024 and hit HN front page with 364K page views in first weekend.
- **Differentiators:** First-mover/canonical brand for Cursor ecosystem; bundles rules + MCP + jobs + community in one hub vs fragmented GitHub awesome-lists.
- **Weaknesses:** Rule quality uneven and unvetted. Competition fragmented: awesome-cursorrules (40K stars), awesome-cursor-rules-mdc, awesome-cursor-skills, Cursor's own official marketplace at cursor.com/marketplace launched in 2026 — risks platform-disintermediation.

**Latitude (latitude.so)**

- **What's listed/sold:** **Has pivoted.** Originally (2024) an open-source "prompt engineering platform" for prompt versioning, evaluation, and deployment. By late 2025/2026 repositioned as an **AI Agent Observability Platform**. Sells observability/eval tooling, not a prompt marketplace. ([Product Hunt](https://www.producthunt.com/products/latitude-4), [latitude.so blog](https://latitude.so/blog/best-ai-agent-observability-tools-2026-comparison))
- **Pricing / revenue:** Freemium SaaS + open-source self-hosted. Free Hobby tier (up to 2 users, ~40K monthly runs); Team and Enterprise tiers paid. **No creator monetization / no marketplace revenue share.**
- **Listings / contributors:** GitHub repo latitude-dev/latitude-llm has ~3.9K stars, 19 contributors. Claims 2,800+ app integrations. No "marketplace count" — they don't operate a marketplace.
- **Differentiators:** (1) **GEPA** — auto-generates evals from annotated production failures; (2) First-class **issue lifecycle tracking** for agent failures.
- **Weaknesses:** Pivot risk / identity confusion — went from prompt engineering → prompt+eval → agent observability in <18 months. Name collides with Latitude Finance, Latitude.sh, Latitude WMS. Crowded observability category vs Langfuse, Helicone, Braintrust, Arize, LangSmith.

**MCP-Marketplace Context.** MCP server directories are mostly free for creators. **Smithery** (~7,000 servers, Docker-Hub-style); **Glama.ai** (~6,000 listings, meta-registry); **mcp.so** (20,222 servers, largest); **mcpservers.org** ~4,000. Security gap: scan of 8,000+ public MCP servers found 36.7% had SSRF vulns and 41% had zero auth in the official registry — opens a wedge for a curated/paid trust layer.

### A10. ProductHunt scan + Agent.ai + Gumloop + Lindy + FlowGPT

**Direct ProductHunt launches (2025-2026)**

- **Claude Marketplace (Anthropic, official)** — Launched ~March 2026. **624 upvotes**, #1 of the day, #15 monthly. Limited preview; lets enterprises spend their Anthropic commitment on Claude-powered solutions from Anthropic customers. ([PH](https://www.producthunt.com/products/claude-marketplace))
- **Claude Skills Hub** — Launched Oct 22, 2025. **111-121 upvotes, 6 comments**. Curated directory of Claude Code skills. ([PH](https://www.producthunt.com/products/claude-skills-hub))
- **Brief** — March 2026 launch, 264 upvotes. Helps agents reach product-market fit.
- **n8nChat** — 2025 launch, AI-generated n8n workflows.
- **n8n AI Workflow Builder** — Oct 14, 2025 launch.

**Established players (the real competition)**

- **Agent.ai (Dharmesh Shah / HubSpot cofounder)** — biggest AI agent marketplace by users. 47K users at INBOUND 2024 → 258K Jan 2025 → 1.1M May 2025 → **2M+ by Oct 2025**. 1,000 public agents, 26,000 user-built agents. Runs independently of HubSpot. ([agent.ai](https://agent.ai))
- **Gumloop** — **$50M Series B (Benchmark, 2025)**, total ~$70M raised. Enterprise traction: Instacart (1,000+ users), Shopify, Ramp, Gusto, Samsara, Opendoor. Visual workflow builder; marketplace is secondary.
- **Lindy** — **$53-54M raised**. Natural-language agent builder.
- **FlowGPT** — $10M Pre-Series A (Feb 2024, Goodwater Capital + DCM). Peak claim: 4M MAU across 110 countries, 100K+ AI apps. **However, Getlatka shows only $1.9M ARR in 2025 at $5.6M valuation** — suggests monetization stalled despite user count. Traction signal: weak.

### A11. Agentverse + Replit Agents

**Agent.ai** — (a) Free AI agents/tools (b) Currently free; payments "possible in future" (c) ~280+ agents, 230K users by Jan 2025 ([Boston Globe](https://www.bostonglobe.com/2025/01/31/business/hubspot-dharmesh-shah-ai-artificial-intelligence-agents/)) (d) Similarweb Mar 2026: 355.7K visits/mo, bounce 51.3%, session ~1m02s (e) Diff: founder distribution muscle, "professional network for agents" framing (f) Weakness: no monetization yet; low engagement = novelty traffic.

**Fetch.ai AgentVerse** — (a) Autonomous agents (crypto/Web3-flavored), A2A payments (b) FET-token denominated, no traditional take-rate (c) Claims ~2-2.7M agents mid-2026 (inflated by auto-registration) (d) Audience is crypto investors, not commercial buyers (e) Diff: agent SEO/discovery, blockchain A2A payments (f) Weakness: crypto-coupled = thin commercial buyer base.

**Botpress Hub** — Integrations (WhatsApp/Slack/Stripe) + chatbot templates, not standalone monetized agents. No take rate — monetized via $89-$495/mo platform subs. Not a creator marketplace; integrations only.

**SuperAGI** — Dormant/stalled, project pivoted, security issues unaddressed. Skip.

**AgentHub (UnleashX variant)** — Plug-and-play business agent templates. **70/30 split** to creators; top earners ~$2K/mo ([UnleashX](https://unleashx.ai/agents-hub/)). Brand confusion across 3+ "AgentHub" products.

**Replit** — (a) Replit Templates Gallery has hundreds of thousands of templates but they're **free to fork**, not a paid storefront. **Bounties shut down Sept 6, 2025** ([HN](https://news.ycombinator.com/item?id=44643875)). (b) No marketplace take rate published. Monetization runs via **RevenueCat integration (Apr 9, 2026)** — creators add paywalls via natural-language prompts; billing flows through app stores (standard Apple/Google cuts), not a Replit fee. Visa strategic investment May 2026. (c) 50M users, 500K+ paid businesses, $525M ARR Apr 2026. **No published agent-listings or creator-payout figures.** (d) Semrush Apr 2026: **~19.58M monthly visits**. (e) Agents are **hosted, executable apps** (buyer gets a running product, not a template). End-to-end build-to-revenue pipeline in one platform. (f) Agent 3 cost-overrun complaints Sept 2025. Trust hit: Agent deleted SaaStr's prod DB July 2025.

### A12. Lindy / Cassidy / Adept / Vellum / Bind / MuleRun

**Primary list:**

- **Lindy AI** (lindy.ai): marketplace=N, payouts=N, status=alive — 100+ template gallery (free scaffolds); creator program pays for marketing videos, not agent sales.
- **Cassidy AI** (cassidyai.com): marketplace=N, payouts=N, status=alive — B2B SaaS with template scaffolds; $10M Series A, 20k+ teams.
- **Adept AI** (adept.ai): marketplace=N, payouts=N, status=acqui-hired/zombie — Amazon hired founders Jun 2024; never shipped a marketplace; 4 of 5 co-founders since left Amazon.
- **Flowise** (flowiseai.com): marketplace=N, payouts=N, status=alive — "Marketplace" is community templates via GitHub PR; no money flow.
- **Vellum** (vellum.ai): marketplace=N, payouts=N, status=alive — Internal prompt workspace for versioning; LLMOps tool, no buyer marketplace.
- **Bind AI** (getbind.co): marketplace=N, payouts=N, status=alive — AI IDE/website-builder; plugin marketplace is for integrations, not creator-sold bundles.

**Bonus threat surfaced:** **MuleRun Creator Studio** (launched Dec 2025) — explicitly positions as AI-agent monetization marketplace and imports Flowise/n8n agents. Worth tracking.

**Closest competitor to a SKILL.md bundle marketplace:** PromptBase is the only direct analog with real buyer-facing marketplace + creator payouts, but it sells prompts, not executable agent bundles. The structural gap (no one selling packaged, runnable agent bundles with creator revenue share) is wide open — MuleRun is the only entrant moving into it.

---

## Section B — Adjacent Platforms

### B1. n8n / Make / Zapier templates

**n8n (n8n.io/workflows)**

- **Free.** All templates in the gallery are free to use; no premium tier on the gallery itself.
- **No direct revenue share for templates.** n8n does NOT pay creators per template download or sale. Instead, the "Creators Hub" routes creators into n8n's **affiliate program (30% commission on n8n Cloud referrals for 12 months)** — so income comes from referrals, not the template itself. ([n8n.io/affiliates](https://n8n.io/affiliates/))
- **~9,000–10,200 templates.** The live workflows page header showed "10238 Workflow Automation Templates" in the search result snippet ([n8n.io/workflows](https://n8n.io/workflows/)).
- **Thriving third-party market.** Multiple Gumroad sellers (e.g. [usamaakrm.gumroad.com/l/100-premium-n8n-templates](https://usamaakrm.gumroad.com/l/100-premium-n8n-templates), [automatewithbishal](https://automatewithbishal.gumroad.com/l/25High-Impactn8nAutomationPowerPack)) plus Etsy listings; the n8n community explicitly discusses external marketplaces.

**Make.com (make.com/en/templates)**

- **Free to use.** Public templates in the gallery are free.
- **No documented revenue share.** Make's help docs describe submitting a team template for review to be promoted into the **public templates library** — no mention of payment to submitters.
- **~1,000 public templates** in the official gallery; some third-party blogs cite "7,000+" but conflates community/private templates.
- **Gumroad bundles exist** but volume is lower than n8n.

**Zapier (zapier.com/templates)**

- **Free to use** (template itself).
- **No revenue share. Submission is unpaid and gatekept.** Only **integration developers** (app partners) can submit Zap templates ([docs.zapier.com](https://docs.zapier.com/platform/publish/zap-templates)).
- **~7,000+ public templates** cited in third-party reviews.
- Third-party sellers exist (Getly, Pickaxe wrappers), but Zapier templates are harder to package since the Zap lives in the buyer's account; pricing is lower ($10–40/Zap).

**Bottom line:** None of the three platforms pay template creators a revenue share. All three have spawned third-party paid marketplaces (heaviest on n8n via Gumroad), confirming demand for a dedicated paid-template marketplace.

### B2. HF Spaces, ChatGPT Apps, Replit

**Hugging Face Spaces**

- **Free vs paid:** Spaces are free to host (public or private, unlimited). End users access them free. **ZeroGPU** Spaces are free with a daily quota; PRO users ($9/mo) get 8x quota; over-quota GPU runs at $1 per 10 min of GPU time.
- **Revenue share to creators: No.** No creator revenue-share program for Spaces. HF monetizes via Pro subs, Inference Endpoints, and enterprise — not by paying Space authors. Sacra and Contrary both describe HF as "under-monetized," with revenue coming from enterprise managed offerings, not creator splits.
- **Listings:** ~400,000+ Spaces, with ~2,000 new daily ([safonas.com](https://safonas.com/blog/hugging-face-spaces-guide)).
- **Earnings signal:** None — creators get hosting + compute credits, not cash.

**ChatGPT — GPT Store vs Apps in ChatGPT (distinct)**

- **Old GPT Store (Jan 2024):** OpenAI announced a US-builder revenue program tied to "user engagement," never published a rate card. Community reports describe it as small and opaque — most creators don't meet the ~25-conversations/week threshold.
- **New "Apps in ChatGPT" (DevDay Oct 6, 2025; submissions opened ~Dec 2025):** Third-party Apps SDK; pilot partners Spotify, Canva, Booking, Figma, Expedia, Zillow, Coursera. Open to indie devs via submission/review.
- **Revenue share: Not yet.** Selling digital goods/subs/in-app services is *not allowed* in the early phase. Only physical-goods link-outs and the Agentic Commerce Protocol (Shopify partnership, ~4% take) are live. OpenAI says monetization details "to come."

**Replit**

- **Templates / end users:** Free to fork; Replit charges users for compute/Core sub.
- **Revenue share: No active program.** **Replit Bounties shut down Sept 6, 2025**. Current creator-facing push is "Race to Revenue" (apps opened Dec 9, 2025; 20 builders) — an accelerator/cohort to help builders monetize their *own* apps, not a marketplace revshare.

**Bottom line:** None of the three currently pays meaningful cash to indie skill/agent creators.

### B3. Cursor rules, Vercel v0, Pieces

**Vercel v0 & Templates Marketplace**

- **Free vs paid:** All templates listed in Vercel's gallery are free to clone/deploy. v0 generations themselves are gated by a paid v0 plan.
- **Creator payments:** No template-creator revenue-share program. Templates marketplace is a showcase, not a paid storefront.
- **Third-party paid:** WrapPixel sells "Vercel templates" as paid themes ([wrappixel.com](https://wrappixel.com/templates/category/vercel-templates)).

**Cursor Rules / cursor.directory**

- **Free vs paid:** Completely free, open-source community directory.
- **Creator payments:** None. Platform monetizes via job-board sponsorships / featured placements, not creator payouts.
- **Scale:** Reported ~250k users/month and 67k+ community members; no official rule-count published.
- **Third-party paid:** Active Gumroad market — "Cursor Rules Mega Pack — 53 .cursorrules files" ([survivoragent.gumroad.com/l/lydtly](https://survivoragent.gumroad.com/l/lydtly)) and "50 Production-Tested .cursorrules" ([oliviacraftlat.gumroad.com/l/wyaeil](https://oliviacraftlat.gumroad.com/l/wyaeil)). Confirms a real off-platform paid market for free-directory content.

**Pieces for Developers (pieces.app)**

- **Free vs paid:** Individual plan is "free forever"; Teams plan is contact-sales.
- **Product shape:** On-device personal snippet manager + AI copilot; **not** a marketplace. No buy/sell mechanism for snippets.
- **Creator payments:** None.
- **Third-party paid analogues:** Snippet-selling exists on unrelated platforms — **PieceX**, **GitMarket**, and Gumroad bundles.

**Pattern:** All three are free directories/tools with **no creator payouts**; the only real paid market is off-platform (Gumroad, PieceX, WrapPixel), where individuals resell bundled artifacts.

---

## Section C — Market Signals

### C1. AI Agent Platform Growth Metrics (2025-2026)

**Anthropic Claude API / Revenue**
- Revenue run rate hit **$30B by April 2026** (from $87M in Jan 2024 — ~345x in 27 months) — 80x growth in Q1 2026 alone. ([VentureBeat](https://venturebeat.com/technology/anthropic-says-it-hit-a-30-billion-revenue-run-rate-after-crazy-80x-growth))
- **Claude Code** hit **$1B ARR within 6 months** of mid-2025 launch; **$2.5B+ ARR by early 2026**, >50% of enterprise spend. ([MindStudio](https://www.mindstudio.ai/blog/anthropic-30b-arr-4-months-pulling-ahead-openai))
- Earlier 2026 waypoints: ~$14B then ~$19B run rate before hitting $30B.

**OpenAI GPT Store**
- **~3 million custom GPTs created** total, but only **~159,000 public** in the GPT Store.
- GPT-5.2 (Dec 2025) reframed Custom GPTs as "agentic mini-apps."

**n8n**
- **9,000+ workflow templates** in marketplace as of May 2026; 500+ native integrations.
- **Valuation $5.2B** (May 2026), $254M raised across 5 rounds, Series C closed May 13, 2026. Prior $60M round March 2025. ([PitchBook](https://pitchbook.com/profiles/company/398691-46), [TechCrunch](https://techcrunch.com/2025/03/24/fair-code-pioneer-n8n-raises-60m-for-ai-powered-workflow-automation))
- Headcount: 1,003 (May 2026).

**Claude Skills**
- Launched **Oct 16, 2025** with pre-built doc skills (PPTX/XLSX/DOCX/PDF) across Claude.ai, Code, API.
- Official skills GitHub repo: **141,000+ stars, 16,000+ forks** by May 2026 — one of the most-watched AI tooling repos.
- Open-standard spec published **Dec 18, 2025** at agentskills.io; launch partners include Atlassian, Canva, Cloudflare, Figma, Notion, Ramp, Sentry. ([AI Business](https://aibusiness.com/foundation-models/anthropic-launches-skills-open-standard-claude))

**Comparable automation marketplaces**
- **Zapier:** **7,000+ app integrations**, thousands of shared templates; projected **~$400M ARR in 2025 (+29% YoY)**.
- **Make.com:** ~1,000 app integrations.

**Key takeaway for Skillzy positioning:** The marketplace tier sits at 9K (n8n) → 159K (GPT Store public) templates; the Claude Skills repo's 141K stars in ~7 months suggests outsized creator-side appetite for the Skills format specifically.

### C2. Google Trends & Search Interest

**"AI agent"** — Strongly rising. Gartner projects 100M+ workers interacting with AI agents by 2025; market grew from ~$7.6B (2025) to projected $52B by 2030 (CAGR 46.3%). Google Cloud's 2025 ROI study: 52% of GenAI orgs have agents in production.

**"Claude skills"** — Sharply rising from near-zero. Term essentially didn't exist before Anthropic's Oct 2025 Skills launch. Karpathy Behavioral Skill (Jan 2026) hit 144K GitHub stars in weeks. ClaudSkills registry now lists 65K+ skills. ([Composio](https://composio.dev/content/top-claude-skills), [SmartScope](https://smartscope.blog/en/generative-ai/claude/claude-skills-trend-2025/))

**"SKILL.md"** — Rising, very low absolute volume. Pure-developer term; tracks Claude Skills launch curve. Only meaningful traffic since Oct 2025; mostly GitHub/docs referrals.

**"agent marketplace"** — Rising but low volume.

**"AI agent template"** — Rising. Low/no-code AI agent builders (LangGraph, CrewAI, Autogen, Langflow) drove template-search demand; teams now deploy agents in 15-60 min via templates.

**"n8n template"** — Strongly rising. n8n.io template gallery is a top SEO destination.

**"GPT Store"** — **Falling sharply.** Peaked early 2024 launch. 3M+ GPTs created but quality collapse; OpenAI mass-removing duplicates; ChatGPT itself losing share (-24.9 pts YoY; market share <50%). Custom GPTs declared dying. ([Futurism](https://futurism.com/artificial-intelligence/chatgpt-peaked-data), [Wikipedia](https://en.wikipedia.org/wiki/GPT_Store))

### C3. SKILL.md as Emerging Open Standard

**Origin and competing formats.** Anthropic defined SKILL.md and published the Agent Skills specification on **December 18, 2025** ([thenewstack.io](https://thenewstack.io/agent-skills-anthropics-next-bid-to-define-ai-standards/), [paperclipped.de](https://www.paperclipped.de/en/blog/agent-skills-open-standard-interoperability/)). A skill is a folder with a required SKILL.md (YAML frontmatter: `name`, `description` + Markdown body), optional `scripts/`, `references/`, `assets/`. Competing/adjacent formats: **AGENTS.md** (project-level instructions, originated with OpenAI Codex), **CLAUDE.md**, **.cursorrules**, **.prompt files**, and **MCP** server configs — these serve different purposes (AGENTS.md is always-in-context project README; SKILL.md is progressively loaded per-capability).

**GitHub repo count.** I could **not retrieve an exact count** — github.com/search requires auth for code search. Reported third-party figures (Vercel skills.sh: 89,753 skills; ~490,000 skills across SkillsMP/Skills.sh/ClawHub by March 2026) are marketplace counts, not GitHub repo counts. **Treat these as vendor-blog claims, not verified.**

**Adopters beyond Anthropic.** Reported: VS Code/Microsoft, OpenAI Codex CLI + ChatGPT, Cursor, Google Gemini CLI, JetBrains Junie, AWS Kiro, Block Goose, GitHub Copilot — "32 tools" by March 2026.

**Standards bodies.** No IETF RFC. The **AAIF (AI Agent Interoperability Forum)** reportedly grew to 146 member orgs by Feb 2026 as a neutral governance home — could not independently verify beyond a single source.

**AGENTS.md trajectory.** AGENTS.md has broader, older compatibility (30+ agents incl. Codex, Claude Code, Copilot, Cursor, Aider, Zed, Windsurf, Devin). They're **complementary, not competing**: AGENTS.md = project context; SKILL.md = packaged capabilities.

**Assessment.** Evidence quality is mixed: Anthropic origin and the spec are well-attested, but the dramatic adoption numbers come largely from a single SEO-styled blog. Trajectory **looks** like a de-facto standard, but specific adoption figures should be independently confirmed.

### C4. Reddit/HN Demand Sentiment

**Hacker News (strongest signal)**

Three Show-HN/discussion posts in 2026 confirm vendors ARE arriving, but the original demand was organic:

1. **"Skly is a marketplace for AI agent skills"** ([HN](https://news.ycombinator.com/item?id=46961474)) (Feb 2026) — Show HN by vendor. Built on Next.js + Supabase (same stack as Skillzy).
2. **"Show HN: Agent Skills – 1k curated Claude Code skills from 60k+ GitHub skills"** ([HN](https://news.ycombinator.com/item?id=46693426)) (Jan 2026) — Vendor curating because users complained quality is too scattered.
3. **"We created documents for selling AI Agent Skills"** ([HN](https://news.ycombinator.com/item?id=46945252)) — Another vendor-side post.
4. **"Claude Skills | HN"** ([HN](https://news.ycombinator.com/item?id=45607117)) and **simonw's "Claude Skills are awesome, maybe a bigger deal than MCP"** ([HN](https://news.ycombinator.com/item?id=45619537)) — Both high-traffic threads driving organic interest.

**Reddit (weak organic signal in search)**

Direct Reddit threads matching the queries did not surface in WebSearch — most "marketplace" search results are Gumroad sellers (vendor-pushed). This suggests r/ClaudeAI conversation around skills exists but is fragmented in share-threads, not "where do I buy" threads. r/n8n demand is strong but routes to **free** GitHub mega-collections (Mavericks Edge 6,000 workflows, Allan Niñal's 2,641-workflow free library, vicckylove's 16,223 free workflows). **Signal: people want templates but expect them free.**

**Competitive landscape (already crowded):** Skly.ai, agensi.io, lobehub.com/skills, agentskill.sh (69k+ skills), awesomeclaude.ai, VoltAgent/awesome-agent-skills, BehiSecc/awesome-claude-skills (13k GitHub stars). AWS, Google Cloud, Microsoft, Salesforce all launched agent marketplaces in 2025.

**Verdict:** Demand is REAL but mixed. The SKILL.md format creates genuine pull (simonw's viral post, 60k+ community skills). However, the demand is being met by free curated GitHub awesome-lists, vendor-launched marketplaces (Skly, agensi, lobehub), and Gumroad solopreneurs. The n8n analogue is instructive: massive template demand but routed to free libraries. A paid Skillzy-style marketplace faces the same gravity unless it solves a quality/trust problem the free curated lists don't.

### C5. AI Slop Backlash

**PromptBase-specific complaints**

Direct "flooded with AI slop" complaints about PromptBase are surprisingly thin — the platform's quality problems are framed as **inconsistent seller quality** and a glut of sellers chasing few buyers, not AI-generated listings per se. Trustpilot reviews are mixed; refunds are capped to a 24-hour window.

**General "AI slop" discourse (2025-2026)**

The backlash is mainstream and well-documented:
- **Merriam-Webster + Macquarie Dictionary** both named "slop" word of the year for 2025 ([Euronews](https://euronews.com/culture/2025/12/17/ai-slop-clean-girl-aesthetic-and-clutter-2025s-biggest-cultural-trends)).
- **404 Media** runs a dedicated AI Slop tag with deep investigations into Facebook's economy of AI-image farms in Pakistan/India/Vietnam monetized via Meta's Creator Bonus Program ([404 Media tag](https://www.404media.co/tag/ai-slop/)).
- **YouTube** deleted 16 AI-slop channels totaling 35M subs / 4.7B views; CEO Neal Mohan made slop mitigation a top 2026 priority.
- **2026 anti-AI marketing** is being called out as a defining ad trend.

**"Human-made" as credible counter-positioning**

- **Cara.app** grew 40k → 650k users in one week (June 2024) on an explicit anti-AI stance; downloads ~314k in days ([TechCrunch](https://techcrunch.com/2024/06/06/a-social-app-for-creatives-cara-grew-from-40k-to-650k-users-in-a-week-because-artists-are-fed-up-with-metas-ai-policies/)).
- **Kagi** (paid, human-centric search) hit ~53k paying subs and break-even in 2025.
- **Marketplace (NPR)** ran "Is 'made by humans' the new premium label?" April 2026.
- Streaming data cited: algorithmic playlist engagement down ~23% 2023→2026, human-curated up ~31%.

**Counter-evidence — is the backlash overblown?**

Partial. Acceptance is real but context-dependent. Alvarez & Marsal: consumers "widely accept" AI-curated media. Acceptance is **53% entertainment / 47% ads / only 21% news**. But: 51% disagree with a more-AI future; consumer enthusiasm dropped 60%→26% (2023→2025); 86% want AI content disclosed; Gartner: 53% distrust AI search results.

**Bottom line for Skillzy:** "Human-made / human-curated" is a **credible and rising** positioning angle. The weakness: could not find Reddit/Twitter threads explicitly trashing PromptBase as "AI slop flooded." If pitching against PromptBase, lean on the broader cultural slop backlash, not PromptBase-specific viral threads.

### C6. Gumroad AI Economy

**Fraction of top Gumroad sellers selling AI prompts/agents/workflows**

**No hard official Gumroad data exists.** Third-party sources (Storeleads/Insightraider) rank "Software Development" at ~$65.8M total revenue as the top category, followed by Business & Money, 3D Assets, and Design. AI prompts are repeatedly listed in "top 5 categories" lists for 2025-2026, but these are SEO-driven aggregator pieces. **Skeptical view:** the "AI prompts are huge on Gumroad" claim is mostly recycled blog content, not verified.

**Named top sellers / approx revenue**

Verified individual earnings are modest:
- One creator reported **~$1,900 from a 3-prompt digital product**.
- "Simple Scale" reports **$1,000+ in 2 months** from a prompt pack.
- A 7-day test yielded **$12 on Gumroad**.
- "Harsh truth" piece argues most prompt-seller earnings claims are inflated.

**No named seller with audited recurring $10k+/mo from AI prompts on Gumroad surfaced.** Treat $X/month claims skeptically.

**Gumroad fee structure (2025+)**

Flat: **10% platform fee + $0.50 per transaction**, plus payment processing (~2.9% + $0.30 via Stripe). Effective take-home ~85-87% on a $30 sale. Discover marketplace fee = 30%. Since Jan 2025, Gumroad is Merchant of Record (handles VAT/sales tax).

**n8n / Cursor / agent bundles on Gumroad — yes, active**

Real listings:
- **"4,000+ n8n workflows"** bundle ([digifolio21](https://digifolio21.gumroad.com/l/n8n-automation-workflows-4000-plus))
- **n8n Workflows store** ([automationn8n.gumroad.com](https://automationn8n.gumroad.com/))
- **Hormozi-framework n8n template** ([limitlessai](https://limitlessai.gumroad.com/l/tnchq))
- **AI Agent Complete Bundle, $29** (10 tools/templates) ([aiagenttools.gumroad.com](https://aiagenttools.gumroad.com/l/riwdzt))

n8n dominates the Gumroad automation-template niche.

**Skeptical bottom line:** The "sell AI prompts and get rich" narrative is heavily SEO-farmed. Verifiable Gumroad earnings for AI prompt sellers are mostly $0–$2k total, not monthly. The clearer opportunity is **n8n/agent bundles** (priced $29–$499, with multi-thousand-template packs already moving) rather than raw prompt packs.

---

## Section D — YouTuber Profiles (Distribution Targets)

### D1. Matt Wolfe & Matthew Berman

**Matthew Berman** (@matthew_berman)
- Subscribers: ~534K–613K (2025/2026, varies by source; vidIQ ~534K, SocialCounts ~613K)
- Niche: AI news, LLMs, open-source AI, generative AI tutorials, agents, machine learning
- Monetization/products: Runs **Forward Future** ecosystem — free newsletter (~70K subscribers, part of a 600K+ community), a **merch shop** (shop.forwardfuture.ai), and **sponsorships booked via Passionfroot**. No prominent Skool/course; primary revenue is sponsor-driven newsletter + YouTube ads.

**Matt Wolfe** (@mreflow)
- Subscribers: ~694K (2025), approaching 1M
- Niche: AI tools, AI news roundups, "no-code"/practical AI for creators and entrepreneurs; co-hosts The Next Wave podcast
- Monetization/products: Runs **futuretools.io** (curated AI tool directory monetized via affiliate links) and a **free newsletter (~230K–250K readers)** sent Wed/Fri, monetized through sponsorships. No paid course or Skool community; revenue is affiliate + newsletter sponsorships + YouTube ads/sponsorships.

### D2. Wes Roth & Riley Brown

**Wes Roth** (@WesRoth)
- Subscribers: ~305K-318K (2026)
- Niche: AI news, breakthrough coverage, AI agents/automation, commercial AI applications
- Monetization/products: Runs paid Skool community "NATURAL 20" (~$37/mo, ~924 members); daily AI newsletter "NATURAL 20" on Beehiiv; Udemy courses; courses listed on genai.works; brand sponsorships via smoothmedia.co; merch.

**Riley Brown** (@rileybrown.ai)
- Subscribers: ~221K (2026); grew from 60K to 150K in a few months in late 2025
- Niche: Vibe coding with Cursor, AI-driven app building, no-code/voice-to-code tutorials
- Monetization/products: Co-founder/founder of VibeCode (vibecodeapp / vibecode.dev) — an AI mobile-app builder he actively promotes; runs newsletter at newsletter.vibecodeapp.com; published 250-min comprehensive Cursor vibe-coding tutorial. Primary monetization is funneling viewers into his own VibeCode product.

### D3. Nick Saraev & Igor Vassilev

**Nick Saraev**
- **YouTube:** [@nicksaraev](https://www.youtube.com/@nicksaraev) — ~308K-313K subscribers as of early 2026. He has a stated goal of 1M by Dec 31, 2026.
- **Niche:** n8n / Make.com / AI automation, AI agency-building, "automation agency operator" content. Official n8n Creator.
- **Monetization / products:** Runs **Maker School** (Skool community + course) at **$184/month** (rising to $204/month at 2,550 members), 90-day money-back guarantee, 218+ video lessons, n8n + Make.com end-to-end courses, 40+ templates. Also sells templates via [leftclicker.gumroad.com](https://leftclicker.gumroad.com).

**Igor Vassilev**
- **Unable to verify.** Multiple targeted searches returned no n8n YouTuber by this name. Closest hits were unrelated. The name may be misspelled or the channel may be too small to surface.

### D4. AI Explained & David Shapiro

**AI Explained** (@aiexplained-official)
- Subscribers: ~328K (2025)
- Niche: Simplifying complex AI/ML and frontier model analysis; rigorous research-style breakdowns
- Monetization/products: Patreon "AI Insiders" at $9/month for exclusive analysis; created and licenses **Simple Bench** — a reasoning benchmark for LLMs; podcast.

**David Shapiro** (@DaveShap)
- Subscribers: ~184K (Sept 2025 per vidIQ)
- Niche: AI philosophy, Post-Labor Economics, cognitive architectures, AI tutorials/podcasts
- Monetization/products: Patreon tiers $5 / $50 / $300 with Discord community; "Breaking into the Creator Economy" course; Substack newsletter; three self-published books on cognitive architectures with LLMs; consulting.

Both actively monetize via Patreon + community/Discord. Shapiro is the more aggressive product-seller (course, books, multiple tiers, Substack). AI Explained's commercial output is narrower — Patreon plus Simple Bench as an industry benchmark — and skews more research/analyst than product/audience-monetization.

---

## Section E — Marketplace Strategy Lessons (Bootstrapping Case Studies)

### E1. How Gumroad Bootstrapped

**Launch (April 2011)**

- **Hacker News "Show HN: my weekend project, Gumroad"** is confirmed at https://news.ycombinator.com/item?id=2406614. The product was built in ~22 hours over a weekend; Sahil was Pinterest employee #2.
- Launch day drew ~50,000 visitors but produced almost no paying customers.

**Bootstrapping tactics (2011–2014)**

1. **Thousands of cold emails.** Sahil "started sending cold emails every day and sent thousands of cold emails."
2. **Founder Twitter + HN engagement.** Sahil's personal Twitter presence was the primary creator-discovery surface.
3. **Founder credibility flywheel** — Pinterest pedigree + early backing from Kleiner Perkins, First Round, Naval Ravikant, Chris Sacca provided social proof.

**The Pivot (Oct 2015 → community-led growth)**

- After failing to raise a Series B, Sahil laid off **75% of staff** in October 2015 and went remote/distributed.
- Break-even reached ~2017; profitable thereafter on a 5% + 30¢/sale take rate.
- **2021 Republic community raise: $5M at a $100M cap** — supply side and capital base both sourced from the creator community itself.

**The Minimalist Entrepreneur playbook (2021 book)**

Sahil's codified post-2015 acquisition philosophy:
- **"Build a community, then solve a problem for them, charge for something even before you've built anything."**
- "Spend your time (not money) building a following (audience) online and offline."
- "Every day you should just be talking to customers, doing manual sales, and making your offerings better."

**Funding:** Seed Aug 2, 2013: $2.1M (SV Angel, CRV). Series A June 2014: $15M, Index Ventures (Danny Rimer). Series B Jan 2016: $30M.

### E2. How Substack Bootstrapped

**The anchor-writer launch (Oct 2017)**

Founded 2017 by Chris Best (ex-Kik), Jairaj Sethi (ex-Kik) and Hamish McKenzie. Best wrote the prototype "in the spare room of his Kitchener, Ontario, apartment" using Stripe plus an enterprise email tool.

The launch was deliberately bootstrapped on **one** anchor writer. McKenzie's contact Bill Bishop — author of the China newsletter *Sinocism*, which had been free for ~5 years — flipped on the first paywall on **15–18 October 2017** and, by his own account and Substack's, **generated six figures in subscription revenue within 24 hours** from a list of ~30K free subscribers. Substack staff literally typed subscriber names into a database by hand.

**The free-product, low-take-rate base offer**

Substack's standing offer to writers from day one: **free to publish, 10% of subscription revenue** (vs. Patreon's higher fees and Apple IAP exposure).

Growth: **25K paid subs by Oct 2018** (up from 11K in July 2018), and 50K paid subs by the time of the July 2019 Series A ($15.3M led by Andrew Chen at a16z).

**Substack Pro — paid advances to anchor writers (2020–2021)**

Year 1 — writer receives an upfront cash advance and Substack keeps 85% of subscription revenue; Year 2 onward — reverts to standard 90/10 split with no minimum.

Reported individual deals:
- **Matthew Yglesias (Slow Boring):** ~$250,000 advance + 15% of sub revenue year one
- **Daniel Lavery (Daniel Mallory Ortberg):** $430,000 two-year advance
- **Grace Lavery:** $125,000 advance
- Six-figure advances also reported for Matt Taibbi, Glenn Greenwald, Andrew Sullivan, Roxane Gay

Series B: **$65M at ~$650M valuation, announced 30 March 2021**.

### E3. How Patreon Bootstrapped

**Origin story (Feb–May 2013)**

- The "Pedals" music video cost **$10,000** and earned **$166 in ad revenue**.
- Conte sketched the idea on **14 sheets of printer paper** in Feb 2013 and pitched his Stanford ex-roommate Sam Yam over coffee at Coffee Bar on Bryant St, **March 6, 2013**. Yam started coding that night.
- Launch: **May 7, 2013**. At launch Conte had ~100,000 YouTube subscribers via Pomplamoose.

**Bootstrap tactic #1 — Founder-as-anchor-creator**

Conte was Patreon's first creator. He embedded an in-video CTA in "Pedals" pointing to patreon.com. Within ~2 weeks he was reportedly earning a six-figure run-rate (~$5,000+ per video pledged).

**Bootstrap tactic #2 — Cold outreach to YouTuber peers (mostly failed)**

Per the Stanford Magazine account: Conte personally reached out to **~40 fellow creators** before launch asking them to make accounts. **None signed up.** Day-one creators were Conte, his girlfriend (Nataly Dawn), and his roommate.

**Bootstrap tactic #3 — Social proof from Conte's earnings**

Once Conte's pledge numbers were visible, that became the recruiting pitch — concrete dollar proof to YouTuber peers. By June 2014 (Series A) Patreon reported **~125,000 patrons in the first 18 months**.

**Bootstrap tactic #4 — M&A to absorb an adjacent creator network (Subbable, March 2015)**

Patreon acquired Subbable (founded by John & Hank Green), which brought CGP Grey, CrashCourse, SciShow, and 24 other curated creators onto Patreon. By the acquisition, Patreon was projecting **>$25M/yr to creators** and reported **250,000 active patrons**.

**Funding:** Seed Aug 2, 2013: $2.1M (SV Angel, CRV). Series A June 2014: $15M, Index Ventures (Danny Rimer). Series B Jan 2016: $30M. No evidence Patreon went through Y Combinator.

### E4. How Etsy Bootstrapped

**Verbatim founder quote (Chris Maguire, via CNBC 2022):** While he, Kalin, Schoppik and Tarbell were building/maintaining the GetCrafty.com community site, crafters on the forums kept saying: *"I wish there was a place to sell things that I made, like eBay's too expensive and unwieldy. And there's not really a whole lot out there that, you know, caters to just us."*

**Verified tactics:**

**a) Pre-launch piggyback on Get Crafty (Jean Railla's community).** In 2004 Kalin and his co-founders were hired to rebuild Jean Railla's GetCrafty.com — a DIY/crafting community. Railla was then hired as a consultant for Etsy's April–June 2005 launch.

**b) Cold outreach to Craftster.org's ~100,000-member forum.** Kalin contacted Leah Kramer (Craftster founder) pre-launch; this seeded "thousands of sellers excited to register" at launch on June 18, 2005.

**c) Fee-free listings at launch while billing was built.** Listing fees waived because the billing system wasn't ready.

**d) In-person craft-fair flyering + Renegade Craft Fair.** Kalin's team handed out flyers at indie craft fairs.

**e) Etsy Labs (Brooklyn) — physical community space.** Opened in DUMBO; Fred Wilson wrote about it Feb 2007. Free first-Thursday Craft Nights, $20/month membership, silkscreen/letterpress/sewing equipment.

**f) Matt Stinchcomb's "no marketing budget, build community" doctrine.** Stinchcomb (employee #1) was hired by Kalin specifically to "apply what he'd learned building up French Kicks' fanbase to drawing sellers to Etsy."

**g) Kalin personally relocating sellers.** Kalin cold-contacted a Seattle clothing-maker pair and offered free Brooklyn workspace.

**Timeline milestones:**
- **June 18, 2005** — launch
- **End of Year 1 (mid-2006)** — ~9–10K sellers, ~22–40K buyers, >$1M GMS
- **2007** — Etsy Labs operational; NYT Magazine "Handmade 2.0" feature
- **July 2008** — Maria Thomas replaces Kalin as CEO; ~50 employees, ~120K registered sellers in 127 countries

### E5. Airbnb Supply-vs-Demand

**Verdict: SUPPLY-FIRST (hosts), then ran DEMAND hacks on Craigslist using existing third-party supply.**

**Founder quote (Brian Chesky, recounting Paul Graham's pivotal advice on Masters of Scale "Handcrafted," 2017):** *"Paul Graham... said, 'Where's your business?' We said, 'New York.' He said, 'Go there.'... We would go to New York every weekend, meet our customers, and we'd interview them. We even started staying with them."* The customers being visited were **hosts**; the founders rented a DSLR and photographed host apartments because listings had bad photos.

**Sources:**
- https://mastersofscale.com/brian-chesky/ (Chesky/Hoffman "Handcrafted")
- https://medium.com/@bchesky/7-rejections-7d894cbaa084 (Chesky, "7 Rejections")
- https://davegooden.com/2011/05/how-airbnb-became-a-billion-dollar-company/ (Gooden's reverse-engineering)
- https://venturebeat.com/2011/06/02/airbnb-admits-gaming-craigslist (Airbnb's admission)

**Verdict expanded:** The NYC door-knocking was to **hosts** (improving photos, retention). The Craigslist hack went in **both directions** but the Gooden-exposed one was **supply-scrape**: Airbnb emailed Craigslist vacation-rental posters urging them to relist on Airbnb. The separate "post-to-Craigslist" feature let hosts cross-post Airbnb listings to CL — siphoning **demand** from CL renters using Airbnb's existing supply.

**Adversarial note — story drift:** Chesky's telling has evolved. Early Y Combinator-era retellings (2010-2013) emphasized the gritty Craigslist-host email outreach (later disowned as a "rogue contractor"). The 2017 *Masters of Scale* version sanitized this into the heroic photographer/door-knock narrative. Popular retellings now conflate "door-knocking" with recruiting *guests*, which is wrong: doors were **hosts'** doors.

### E6. Uber Supply-vs-Demand

**Verdict: SUPPLY-FIRST (drivers).** Uber bootstrapped by recruiting existing limo/black-car operators before having any meaningful rider demand — the test run in NYC (Jan 2010) used 3 black cars, and the SF launch on July 5, 2010 went live with a pre-signed fleet of licensed Lincoln Town Car drivers who were idle between scheduled limo jobs. Riders were seeded second, beginning with ~100 friends of the founders.

**Founder quote:** From Garrett Camp's Medium post "The Beginning of Uber" (Aug 22, 2017), the founders' original concept and v1 service was framed as a driver/car-supply play first: a "timeshare limo service" where Camp and Kalanick "would split the costs of a driver, a Mercedes S Class, and a parking spot," then opened it up via the app. Camp confirms the SF launch used "a small fleet of black luxury cars" before any consumer marketing.

**Sources:**
- [The Beginning of Uber — Garrett Camp, Medium](https://medium.com/@gc/the-beginning-of-uber-7fb17e544851)
- [Uber's Founding — Uber Newsroom](https://www.uber.com/us/en/newsroom/ubers-founding)
- [Timeline of Uber — Wikipedia](https://en.wikipedia.org/wiki/Timeline_of_Uber)

**Adversarial note:** The asymmetry is real and structurally deliberate: drivers (who already owned cars and had idle hours between pre-booked limo jobs) were the cheap side to seed; riders were not paid/subsidized at launch — this differed from later city expansions (2012+) where Uber used $1,000 sign-up bonuses and minimum-hourly guarantees to recruit drivers.

### E7. DoorDash Supply-vs-Demand

**Verdict: DEMAND-FIRST (concierge MVP)**

Stanley Tang (Stanford eCorner "Scaling the Unscalable" / YC CS183B Lecture 8, "Doing Things That Don't Scale," recounting the Jan 12, 2013 launch):

> *"We shipped PaloAltoDelivery.com — that alias was available for $9, and that's why we got it. It was a static page where you saw eight PDF menus of restaurants we frequented in Palo Alto. The only way you could order was to call a Google Voice number that would ring the cell phones of the four founders, and one of us would pick up, take your order, place the order on your behalf, go get the order, and deliver it to you."*

**Sources:**
- Stanford eCorner, Stanley Tang – Scaling the Unscalable: https://stvp.stanford.edu/podcasts/stanley-tang-doordash-scaling-the-unscalable/
- YC "Doing Things That Don't Scale" lecture write-ups

**Verdict:** The four Stanford founders scraped 8 restaurant PDF menus off the public web, posted them with a Google Voice number, and tested whether *customer demand* existed. Restaurants were NOT signed up, knew nothing of DoorDash, and were called by founders posing as ordinary phone-in customers; founders paid out of pocket and drove orders themselves. First call came within an hour. Restaurant supply was acquired retroactively only after demand was proven.

### E8. OpenTable Supply-vs-Demand

**Verdict: SUPPLY-FIRST (restaurants, via the Electronic Reservation Book)**

**Best verbatim fragment from a primary source** (Chuck Templeton, via Adam Mendler's Thirty Minute Mentors interview):

> *"Templeton discovered that many restaurants' reservation systems weren't technology-based, with pen-and-paper booking still highly predominant, so he realized that if he wanted to hook into their technology, he'd have to build it for them."*

And the most-cited operational quote:

> *"OpenTable sold software to restaurants that created value for them without requiring any diners on the 'buyer' side of the marketplace. They built a unique table management and CRM product (the 'Electronic Reservation Book') and charged a subscription fee... Once OpenTable acquired hundreds of restaurants in a city, they started to have a compelling diner value proposition."*

**Sources:**
- https://www.adammendler.com/blog/chuck-templeton/
- https://www.nfx.com/post/19-marketplace-tactics-for-overcoming-the-chicken-or-egg-problem
- https://www.researchgate.net/publication/339544749 ("Single-Player Mode" academic case)

**Verdict:** OpenTable's ERB was a standalone, paid SaaS+hardware product sold to restaurants first; the consumer reservation marketplace was layered on top only after "hundreds of restaurants in a city" were locked in.

---

## Section F — Marketplace Theory

### F1. NFX Network Effects Manual

**Title:** "The Network Effects Manual: 16 Different Network Effects (and counting)"
**Author:** James Currier (with the NFX team)
**URL:** https://www.nfx.com/post/network-effects-manual

The 16 categories (verbatim names from NFX/Currier):
1. Physical (Direct)
2. Protocol (Direct)
3. Personal Utility (Direct) — e.g. iMessage, WhatsApp
4. Personal (Direct) — e.g. Facebook
5. Market Network — e.g. HoneyBook, AngelList
6. 2-Sided Marketplace — e.g. eBay, Craigslist
7. Platform — e.g. Windows, iOS, Android
8. Asymptotic Marketplace — e.g. Uber, Lyft
9. Data — e.g. Waze, Yelp
10. Tech Performance — e.g. BitTorrent, Skype
11. Language (Social) — e.g. Google, Xerox
12. Belief (Social) — e.g. currencies, religions
13. Bandwagon (Social) — e.g. Slack, Apple
14. Tribal (Social) — e.g. Apple, Harvard, NY Yankees
15. Expertise — e.g. Figma, Excel
16. Hub & Spoke (plus a Reinforcement category)

**NFX on Marketplace Liquidity & Tipping Point**

- Operational definition (Currier): liquidity is "the probability of selling something you list or of finding something you are looking for."
- Tipping point: "Network effect businesses, once they hit the tipping point, typically show geometric growth, either because they are viral, or because their metrics are so good, they can afford to buy traffic versus other competitors."
- Closest essay: "The NFX Marketplace Scorecard" — Currier's "28 Elements of a Great Marketplace."

**Bill Gurley, "All Markets Are Not Created Equal"**

URL: https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/

The 10 factors:
1. New Experience vs. the Status Quo
2. Economic Advantages vs. the Status Quo
3. Opportunity for Technology to Add Value
4. High Fragmentation
5. Friction of Supplier Sign-Up
6. Size of the Market Opportunity
7. Expand the Market
8. Frequency
9. Payment Flow
10. Network Effects

Quote: *"Great marketplaces do not simply aggregate a market; they enhance it and offer consumers a user experience that simply was not possible before."*

**Sangeet Paul Choudary — Platform vs Linear (Pipes)**

- Key essay: "The Platform Manifesto" (https://platformed.info/the-platform-manifesto/) — 16 principles for digital transformation
- Framework quote: *"We are in the business of enabling interactions. We are not in the business of creating goods or services."*
- Pipes-vs-Platforms: *"Pipes have been the dominant model of business where firms create stuff, push them out and sell them to customers, with value produced upstream and consumed downstream in a linear flow."* Platforms *"allow users to create and consume value."*

### F2. a16z Marketplace Canon (13 Metrics)

**"13 Metrics for Marketplace Companies"** (Jordan/Chen/Coolican/Jin, Feb 2020) — URL: https://a16z.com/13-metrics-for-marketplace-companies/

The 13 metrics:
1. Match rate / utilization / success rate
2. Market depth
3. Time to match / inventory turnover / days to turn
4. Concentration or fragmentation of supply and demand
5. Take rate
6. Unit economics
7. Prevalence of multi-tenanting
8. Switching/multi-homing costs
9. User retention cohorts
10. Core action retention cohorts
11. Dollar retention & paid user retention cohorts
12. Retention by location/geography
13. Power user curves

**Liquidity definition** (from the companion "Marketplace Glossary"): *"the ease with which buyers and sellers can find the right counterpart in the marketplace... the likelihood that a seller is able to find a buyer, or that a buyer is able to find the product or service they're looking for."* Measured via fill/match rate, market depth, and time-to-match.

**Li Jin — "1,000 True Fans? Try 100"** (Feb 6, 2020)

Thesis: A creator can earn ~$100,000/year from just 100 true fans paying $1,000/year each (≈$83/month), rather than Kevin Kelly's original 1,000 fans × $100. *"Creators need to amass only 100 True Fans paying $1,000 a year — not 1,000 fans paying $100."*

**Jeff Jordan — marketplace essays**

- **"Managing Tensions In Online Marketplaces"** (Feb 2015) — Framework: marketplaces must engineer *"perfect competition"* and actively manage buyer/seller tensions.
- **"A Recipe for Growth: Adding Layers to the Cake"** — Framework for sustaining YoY growth past initial-market saturation by stacking expansion layers (geography, category, format, monetization).
- **"Marketplaces and Network Effects"** — Why marketplace economics beat classic e-commerce.

**D'Arcy Coolican — "Four Paths to Marketplace Success"**

Segments marketplaces by transaction frequency × AOV: "Holy Grails" (multiple/month, >$100), "Everyday Necessities" (frequent, <$100, e.g., Wag), "Occasional Splurges" (rare, >$1,000, e.g., Airbnb), plus a fourth low-frequency/low-AOV path.

### F3. Andrew Chen — Atomic Network

**Verdict: CONFIRMED.** Andrew Chen formally defines it in *The Cold Start Problem* (2021) as: **"the smallest network needed that can stand on its own"** — a network with enough density and stability to "break through early anti-network effects, and ultimately grow on its own."

**Specified sizes:**
- **Slack:** a team of 3
- **Zoom:** 2 people
- **Tinder (USC):** **~500 users** — not 5,000. The number commonly cited from the book is ~500 hyper-connected USC students seeded via a sponsored sorority birthday party requiring Tinder install for entry.
- **Uber:** Not "a few drivers in a neighborhood" as a stated number — Chen's specific Uber framing in the book is temporal/spatial, not a user count: *"5pm at the Caltrain Station at 5th and King Street"* in SF, not the whole city.
- **Airbnb:** "hundreds of active rental listings in a market"

**Adversarial check:** "Atomic network" is genuinely Chen's term and a chapter in his book. The "5,000 at USC" figure in the prompt is **incorrect** — the figure consistently cited is **~500**.

### F4. Marketplace Density Thresholds (Myths vs Reality)

**Airbnb**

**No primary-source "300 listings per city" threshold found.** Brian Chesky's well-documented early-Airbnb advice is qualitative ("do things that don't scale," go door-to-door in NYC, take photos for hosts, write the first reviews) — not a numerical density rule. Paul Graham's essay is "Do Things That Don't Scale" (paulgraham.com/ds.html, July 2013) — not "How To Start Airbnb." It contains the Airbnb door-knocking anecdote but **no listing-count threshold**.

**Verdict: FOLKLORE.** Any specific "300 listings per city" rule attributed to Chesky/Airbnb appears to be secondhand blog interpretation, not a quoted founder claim.

**Uber**

**Bill Gurley (Benchmark, Uber board), July 11, 2014, "How to Miss By a Mile":** in high-liquidity cities, **average pickup times are less than five minutes**.

**The "3-minute ETA" specifically attributed to Travis Kalanick: I could not find a primary source.** Kalanick's TED talk and public interviews don't surface it. Chen has referenced internal targets around 5-minute ETA as the operational goal — not 3.

**Verdict on "3-min ETA from Kalanick": FOLKLORE.** The sourced number is **5 minutes**, from Gurley (investor, not founder), 2014.

**Thumbtack**

**No primary numerical density threshold found from Marco Zappacosta.** Thumbtack's growth as deliberately **category-and-geography-independent** (they went broad, not deep, opposite of Airbnb's city-by-city playbook). Their early seeding hack was republishing pro profiles to Craigslist.

**Verdict: No threshold exists in primary sources.**

**Andrew Chen / The Cold Start Problem (2021)**

- **Tinder: ~500 people at USC.** A sponsored launch party requiring app install to enter.
- **Slack: 3 people per team.** "Slack works with 2 people, but it takes 3 to make it really work."
- **Zoom: 2 people** (a single call).
- **Uber: a handful of drivers in a small geographic-time slice** — Chen's canonical example is "5pm at the Caltrain station at 5th and King St."

**The "100 listings" / "1,000 listings" Rule**

**FOLKLORE.** No primary source — no founder, no VC essay, no book — proposes a universal "100 listings" or "1,000 listings" marketplace-launch threshold. The closest legitimate framing is Sangeet Paul Choudary's "liquidity" metric (percent of listings leading to successful interactions within a time window) — explicitly a *ratio*, not a count.

**Bottom Line**

Only two specific numbers survive primary-source scrutiny: **Tinder ~500 at USC (Chen)** and **Uber <5-min pickup in liquid cities (Gurley, 2014)**. Slack-3 and Zoom-2 are Chen's framework numbers. Everything else — "300 listings per city," "3-min ETA Kalanick," Thumbtack pro density, the "100/1,000 listings rule" — is folklore.

### F5. Liquidity Definition Adversarial Check

**CLAIM 1: "Atomic network" is a formally defined concept in Andrew Chen's The Cold Start Problem (2021)**

**Verdict: CONFIRMED**

**CLAIM 2: "100 listings threshold" for a marketplace**

**Verdict: FOLKLORE.** The actual documented Airbnb finding (Jonathan Golden, Airbnb's first PM): **"Cofounder Nate Blecharczyk determined that 300 listings, with 100 reviewed listings, was the magic number to see growth take off in a market."** Airbnb-specific, per-market, not a universal marketplace law. OpenTable's analogous number was 50–100 *restaurants* per city.

**CLAIM 3: Operational definition of liquidity**

Common thread: liquidity is operationally **% of listings/searches that result in a transaction within some window** (fill rate / match rate), not raw inventory count.

- **a16z Marketplace Glossary**: liquidity is *"the likelihood that a seller is able to find a buyer, or that a buyer is able to find the product or service they're looking for."*
- **Bill Gurley**: recommends computing **search-to-fill rate** (% of searches/requests resulting in completed transactions) **and** utilization rate, granularly.
- **Lenny Rachitsky** (ex-Airbnb): four key marketplace metrics are **fill rate, bookings growth, supply growth, GMV growth**; "the marketplace who hits liquidity first typically wins… winner-take-all or winner-take-most."
- **Airbnb (Golden)**: an operational threshold expressed as **300 listings + 100 with reviews per market** producing a step-function in bookings.
- **Sarah Tavel**: deliberately reframes away from raw liquidity toward **"Minimum Viable Happiness"** — the end-to-end buyer/seller experience.

### F6. Supply-First Canon (and Dissenters)

**Andrew Chen — supply-first, but framed as "the hard side"**

**Title:** "Solve a Hard Problem (Tinder)" / *The Cold Start Problem* (2021)
**Stance quote:** *"The order of operations for most consumer-facing marketplaces is 'supply, demand, supply, supply, supply.'"* He also frames it as: *"the hard side for marketplaces is usually the supply side... products must, above all else, attract the hard side."*

**Sarah Tavel — explicitly demand-first (adversarial flag)**

**Title:** "The Hierarchy of Marketplaces — Introduction and Level 1" (2019)
**Stance quote:** *"The demand side is the one that you really have to nail. If you get the demand side, then supply is going to want those sales so they are going to come to you."*

**Lenny Rachitsky — "it depends" (adversarial flag)**

**Stance quote (from his X summary of Part 2):** *"80% focused on supply... Only Rover, TaskRabbit, and Zillow were demand constrained."*
**Confidence:** Soft supply-first as empirical majority (~80% of marketplaces he studied), but he explicitly names exceptions and has a whole separate essay arguing demand-driven supply is the loop behind Airbnb, Uber, Lyft, Square, DocuSign.

**a16z — supply-first in operator framing, no single canonical essay**

Treat any citation of "a16z says supply-first" with skepticism — it is folklore, not text.

**Bill Gurley — explicitly demand-first in later writing (adversarial flag)**

**Stance quote (2012):** *"Aggregating suppliers is a necessary, but insufficient step on its own. You must also organically aggregate demand."*
**Stance quote (2020 tweet):** *"A lesson I have learned many times in my 20 years as a marketplace investor is that aggregating demand is the one & only key. Aggregating supply is not the hard part."*
**Confidence:** Gurley is the strongest dissenter and the strongest evidence the supply-first doctrine is overstated.

**Adversarial summary**

Only **Andrew Chen** unambiguously prescribes supply-first, and even he qualifies it as "the hard side, which is usually supply." **Tavel and Gurley actively prescribe the opposite** (demand-first). **Lenny** is empirical/contingent. **a16z** has no canonical supply-first essay. The "supply-first" doctrine is real but materially overstated as consensus — the more defensible version of the rule is Chen's "constrain the hard side."

### F7. Academic Literature on Cold-Start

**Short answer:** The academic literature endorses "asymmetric ignition" — getting one side onto the platform before/cheaper than the other — but the dominant framing is *price-structure* (subsidize-side vs money-side) and *cross-side network-effect asymmetry*, **not** a universal "supply-first" rule. No paper empirically tests whether supply-first marketplaces succeed more often than demand-first ones.

**Rochet & Tirole, "Platform Competition in Two-Sided Markets," JEEA 1(4) 2003.** Foundational. Prescribe a *pricing-structure* rule: subsidize the side with stronger cross-group externality and/or more elastic demand. This is about *who pays*, not *who arrives first chronologically*.

**Caillaud & Jullien, "Chicken & Egg," RAND J. Econ. 34(2) 2003.** Theoretical model of the cold-start. Solution is "divide-and-conquer" pricing (subsidize one side, extract from the other).

**Eisenmann, Parker & Van Alstyne, "Strategies for Two-Sided Markets," HBR Oct 2006.** Coined the "subsidy side / money side" framing. The subsidy side is whichever side has greater cross-side network effects and higher price elasticity — explicitly contingent, not "always supply."

**Hagiu, "Strategic Decisions for Multisided Platforms," MIT Sloan Mgmt Rev, Winter 2014.** Hagiu explicitly frames it as *contingent on willingness-to-pay and acquisition difficulty*, and offers the reseller workaround as evidence the "chicken-and-egg" framing is itself escapable.

**Parker, Van Alstyne & Choudary, Platform Revolution (2016).** Catalogues *eight* launch strategies (seeding, piggyback, big-bang, micromarket, single-side, producer-evangelism, big-flip, marquee-user) — supply-first is one option among many.

**Ott, Eisenhardt & Bingham, "Beyond the Chicken and Egg," Kenan Institute 2018.** Inductive grounded-theory study of **N=8** ventures. Finds entrepreneurs *do* tend to sequence supply → demand → geography. But: qualitative, no control group, no failed-venture sample. The authors describe a pattern, not test a causal claim.

**Adversarial finding:** No peer-reviewed paper empirically compares the success rate of supply-first vs demand-first marketplaces. The "supply-first doctrine" — as stated in VC blog posts, Reforge, Applico, etc. — is a folk extension of (a) Evans & Schmalensee's case anecdotes and (b) the Rochet-Tirole/Eisenmann price-structure result. Hagiu is explicit that it's situational.

### F8. Supply-First vs Demand-First (Casey Winters Critique)

**Andrew Chen (a16z) — *The Cold Start Problem* (2021)**

- **The "hard side" is not always supply, and it shifts.** From Ch. 8 summary: "the hard side of the network is not always the same as the network evolves... one example being a B2C marketplace where the hard side of the network shift[s] from supply to demand."
- **Marketplace patterns don't generalize.** Per the Stripe Atlas interview, Chen warns there is "significant nuance with marketplaces, and many people incorrectly group them as a unified sector when applying patterns from hot companies; sometimes this works, but most times it doesn't."

**Casey Winters (Reforge, ex-Pinterest/Grubhub/Eventbrite)**

- **Strongest direct critique in the set.** In "The Best Way to Drive Demand in Marketplaces is Hiding in Plain Sight" (with Dan Hockenmaier), Winters argues supply should *generate* demand — the "Goldilocks Zone" of **10–40% of demand driven by supply**. He explicitly partitions marketplaces by whether this works:
  - Works: Grubhub (~30% of demand from restaurants), Faire, Eventbrite.
  - **Fails**: "Uber and Airbnb fail on the first point, most peer-to-peer marketplaces like Poshmark fail on the second, and Upwork and Thumbtack fail on the third."
- Implication: the Uber/Airbnb supply-first playbook is the *exception*, not the template.

**Lenny Rachitsky + Brian Rothenberg (ex-Eventbrite/TaskRabbit)**

- "Demand driving supply: The little-understood growth loop behind a surprising number of iconic billion-dollar companies" (Feb 2023) flips the script: "A surprisingly large number of iconic billion-dollar-plus companies — including **Airbnb, DocuSign, Uber, Lyft, Square, Eventbrite, GoFundMe, and SurveyMonkey** — share a unique and little-understood growth loop: demand driving supply."
- Rothenberg's mechanism: convert *buyers into sellers*. At Eventbrite, half of ticket buyers didn't know they could host events; closing that gap "more than tripled their demand-to-supply conversion rate."

**Sangeet Paul Choudary (Platform Revolution / platformed.info)**

- Argues many marketplaces solve cold start through **"Standalone Mode"** (single-player utility) rather than getting supply-first: OpenTable sold restaurant *software* (not diners) for years before activating the marketplace side.

### F9. Founder-Works-the-Supply-Side Playbook

**Airbnb — Chesky & Gebbia photographing NYC hosts**

**Primary source: Paul Graham, "Do Things That Don't Scale" (July 2013).** PG codifies the story: after he told the Airbnb founders their users were in NY but they were in Mountain View, Chesky and Gebbia commuted to NYC weekly, knocked on hosts' doors, and — unable to afford photographers — bought a wide-angle camera and shot the listings themselves. Listings with the new photos saw bookings roughly double.

**Verdict: Real, well-documented, not apocryphal.**

**TaskRabbit — Leah Busque personally running errands**

**Founding moment:** A snowy Boston night in February 2008, Busque was out of dog food for her 100-lb yellow lab Kobe.

**Supply-side hustle:** Originally **RunMyErrand.com** (renamed TaskRabbit April 2010). Busque quit IBM after ~10 weeks, launched SMS-based in Boston, and "recruited errand-runners from Craigslist."

**Caveat:** I could not surface a verbatim Busque quote saying "I ran the first errands myself." What's airtight is the manual recruiting of runners one by one.

**DoorDash — Tony Xu, Stanley Tang, Andy Fang, Evan Moore delivering in Palo Alto**

**Originally "Palo Alto Delivery"** (palodelivery.com, 2013). The founders built a quick landing page with PDFs of local restaurant menus and their cell numbers at the bottom. First customer called within hours — a Thai-food order which they picked up and delivered themselves.

**All four founders delivered** — Stanford students by day, drivers by night.

**Famous detail (Sequoia Crucible Moments podcast, Tony Xu):** when an order couldn't be fulfilled one night, the founders refunded it, baked cookies themselves and drove them to the customer the next morning.

**Stripe — the "Collison installation"**

**Primary source: Paul Graham, "Do Things That Don't Scale" (2013).** PG coins the term in the essay itself: *"At YC we use the term 'Collison installation' for the technique they invented."* Pattern: when a prospect said yes to trying Stripe, Patrick or John would say "Right then, give me your laptop" and integrate the code on the spot.

**The "founder DM" tactic**

**Lenny Rachitsky's data ("How the biggest consumer apps got their first 1,000 users"):** the #2 most common acquisition tactic — used by ~30% of consumer startups — was "go recruit them directly, either through email, DMs, phone calls, or door to door," and this tactic "was almost exclusively used by marketplace startups to bootstrap the supply side."

**Concrete examples Lenny surfaces:**
- **Figma:** Dylan Field "built a custom script to find the most influential designers on Twitter and cold-DM'd them to show them Figma."
- **Cameo:** founders hired $10/mo interns to DM celebrities/influencers on Instagram and Twitter.
- **Retool:** filtered Crunchbase by recency of fundraise + vertical for targeted cold outreach.

### F10. Indie Marketplace Distribution Channels

**TL;DR:** For bootstrapped marketplaces, exactly four channels reliably work at 0-to-1: (1) hand-curated community seeding with a hook (invites, free tools, embeds), (2) free open-source product as a distribution wedge, (3) riding an adjacent platform's gravity (Reddit/Discord/Twitter creator communities), and (4) Product Hunt as a one-time accelerant *after* community is warm. SEO is a 12-24 month lag, not a launch channel. Paid never works at this stage.

**The AI-marketplace cohort (most relevant to Skillzy)**

**Civitai — community aggregation, NOT product.** Founder Justin Maier built Civitai in 2022 because Stable Diffusion models were scattered across Reddit and Discord with no central hub. They went from 50 models at launch to 500/day uploaded within a year, hit 10M monthly visitors before a16z funded them in Nov 2023.

**Hugging Face — open-source library as distribution wedge.** Hugging Face started as a teen chatbot. The pivot was 2018: when Google released BERT, Thomas Wolf shipped a PyTorch implementation within a week. **The transformers library became the standard NLP distribution channel.**

**Replicate — rode the Stable Diffusion wave.** Founded 2019. Their inflection was **August 2022 when Stable Diffusion's release caused a massive traffic spike** — they were the easiest place to run image models via API.

**OpenAI GPT Store — the cautionary tale.** Despite OpenAI's distribution advantage, GPT Store has stagnated. Even ChatGPT's massive built-in audience can't substitute for genuine creator demand and clear monetization.

**Community-led (the dominant 0-to-1 pattern)**

**Product Hunt — email list of insiders.** Ryan Hoover built the MVP in 20 minutes as a curated email list ("Linkydink"). He seeded it by posting on **Quibb** (an invite-only community of founders/investors).

**Dribbble — invite-only as quality moat.** Cederholm and Thornett hand-sent ~100 t-shirts with handwritten invite codes to designers they admired in 2008.

**Pinterest — grassroots, not SEO.** 3 months in, Pinterest had only 3,000 users. Silbermann personally emailed users, shared his phone number, ran in-person meetups at boutiques.

**Twitter/X-led + Product Hunt combo**

**Cal.com — open-source positioning + PH launch.** Peer Richelsen googled "Calendly open source" found nothing, built it. Tagline "the open-source alternative to Calendly" did most of the conversion work. **Hit #1 Product of the Day, then Week, then Month on Product Hunt in April 2021.** $7.4M seed.

**Tally.so — embed flywheel.** 0 to 16K users + $8.5K MRR in year 1 via: aggressive 1:1 outreach, generous free plan, open Slack for feedback, multiple PH launches. The critical mechanic was a **"Made with Tally" button at the bottom of every form**.

**Synthesis for Skillzy:** AI marketplaces don't manufacture demand, they aggregate already-active creator communities or ride adjacent viral releases. Your 0-to-1 channel is almost certainly **(a) find the Discord/Reddit/X communities where AI-skill creators are already swapping prompts and workflows, (b) hand-curate the first 50-100 sellers Dribbble-style with personal outreach, (c) ship a free embeddable/open-source wedge that puts a "powered by Skillzy" mark on every transaction (Tally pattern), and (d) save the Product Hunt launch for when supply is warm enough to convert demand.**

### F11. YC + Hoffman + Altman on Cold-Start

**Paul Graham — "Do Things That Don't Scale" (2013)** — http://paulgraham.com/ds.html

PG does NOT prescribe supply-first as a rule. His thesis is "the most common unscalable thing founders have to do at the start is to recruit users manually." Airbnb is his example, but the door-to-door work was with **hosts** (supply) — yet PG frames it as "recruit users," not "recruit supply first."

**Sam Altman — Startup Playbook** — https://playbook.samaltman.com/

Echoes PG: "recruit users manually." No marketplace-specific supply-first rule found.

**Michael Seibel (YC CEO)** — https://www.michaelseibel.com/blog/yc-s-essential-startup-advice

*"You have product-market fit when your bottleneck is supplying user demand instead of generating user demand"* — frames demand as the harder side at PMF.

**Gustaf Alström​er (ex-Airbnb growth, YC partner)**

Closest to a supply-first prescription: *"Most marketplaces start with supply-side first, and once they had critical mass of supply they would go out and get demand."* But he qualifies: which side is constrained *"varies over time and by geography."*

**Lenny Rachitsky — "How to Kickstart a Marketplace, Part 2"**

The strongest supply-first claim in the corpus: *"Every marketplace starts off supply constrained — you first need something to sell."*

**Reid Hoffman — Masters of Scale Ep. 1 "Handcrafted" w/ Brian Chesky**

Hoffman's extracted lesson is **NOT** "supply first" — it's *"Hand-craft the core experience. Serve your customers one-by-one. Then figure out how and what to scale."*

**James Currier (NFX) — adversarial counter-frame**

Currier's tactic #1 is *"Get the hardest side first"* — explicitly NOT a blanket supply-first rule.

**Adversarial flag:** The "supply-first" rule is **oversimplified**. PG, Seibel, Hoffman, and Currier all prescribe side-agnostic handcrafting or "harder side first." Only Lenny/Alström​er give a supply-first heuristic.

---

## Section G — Take Rate Analysis

### G1. Marketplace Take Rates (2025/2026)

| Marketplace | Take Rate | Source URL |
|---|---|---|
| **Etsy — listing** | $0.20 per listing (every 4 months) | https://www.etsy.com/legal/fees/ |
| **Etsy — transaction** | 6.5% of total sale | https://www.etsy.com/legal/fees/ |
| **Etsy — payment processing** | ~3% + $0.25 (US) | https://www.etsy.com/legal/fees/ |
| **Etsy — Offsite Ads** | 15% (shops < $10K/yr) or 12% (shops ≥ $10K/yr) | https://help.etsy.com/hc/en-us/articles/360000338367 |
| **Gumroad** | Flat 10% per sale + Stripe/PayPal pass-through | https://gumroad.com/pricing |
| **Airbnb — host-only** | 15.5% standard (16% Brazil); mandatory as of Oct 27, 2025 | https://www.airbnb.com/help/article/1857 |
| **Fiverr** | Flat 20% seller service fee | https://www.fiverr.com/support/articles/360010560358 |
| **Upwork** | Flat 10% on all contracts as of May 3, 2023 | https://support.upwork.com/hc/en-us/articles/211062538 |
| **Apple App Store — standard** | 30% commission on digital goods/IAP | https://developer.apple.com/app-store/small-business-program/ |
| **Apple Small Business Program** | 15% if prior-year proceeds ≤ $1M | https://www.apple.com/newsroom/2020/11/apple-announces-app-store-small-business-program/ |
| **Substack** | Flat 10% of paid-subscription revenue | https://support.substack.com/hc/en-us/articles/360037607451 |
| **Patreon — new creators (post Aug 4, 2025)** | Flat 10% standard | https://support.patreon.com/hc/en-us/articles/36426991446797 |
| **Patreon — legacy tiers** | Lite 5% / Pro 8% / Premium 12% | https://support.patreon.com/hc/en-us/articles/11111747095181 |
| **OnlyFans** | 20% of all creator earnings | OnlyFans ToS |
| **Eventbrite** | 3.7% + $1.79 per paid ticket + 2.9% payment processing | https://www.eventbrite.com/organizer/pricing/ |
| **StockX** | 9% base transaction fee + 3% payment processing | https://stockx.com/help/articles/what-are-stockxs-fees-for-sellers |
| **eBay — Final Value Fee** | 12.9%–15% of total sale + $0.30 per order | https://www.ebay.com/help/selling/fees-credits-invoices/selling-fees |

**Key notes on sourcing**

- **Gumroad**: The 10% flat change was announced by Sahil Lavingia primarily via Twitter and email to users (Dec 2022, effective Jan 31, 2023).
- **Airbnb**: 2025 transition consolidates all hosts onto host-only 15.5% — biggest structural change of the year.
- **Patreon**: Two-tier reality now — pre-Aug 4, 2025 creators on old Lite/Pro/Premium; post that date on flat 10%.

### G2. 20% Take Rate Adversarial Verification

**Short answer: 20% is on the HIGH end of marketplace norms — closer to Fiverr/OnlyFans/Apple territory than the true median, which sits around 10-15%. Skillzy is anchoring on the most extractive examples.**

**Distribution by category (verified)**

**Physical goods (low extraction, 5-15%):**
- eBay: 3-15% final value fee, category-dependent
- Etsy: 6.5% transaction + $0.20 listing (+ processing)
- Amazon Handmade: 15% referral; Amazon 3P: 8-15% base
- OpenSea (NFT): 2.5%

**Travel/lodging (mid, 8-15%):**
- Vrbo: ~8% total (5% commission + 3% processing)
- Airbnb: 15.5% host-only, or split ~3% host + ~14% guest
- Booking.com: deliberately undercut incumbents in Europe

**Freelance/services (wide, 10-30%):**
- Upwork: ~18.5% overall take rate (Q2 2025); since May 2025 variable 0-15%+
- Fiverr: 20% flat (the anchor)
- Toptal: 15% to designer + margin on top
- TaskRabbit: 15% service fee + 7.5% trust/support to poster (~22.5% total extraction)

**Creator economy (low, 5-20%):**
- Substack: 10% flat
- Patreon: 8% (Pro) or 12% (Premium)
- OnlyFans: 20% (outlier in this category)

**Food delivery (high, restaurant-hostile, 15-30%):**
- UberEats: 15-30%
- DoorDash: up to 30-40% all-in

**Is 20% the median?**

**No.** The median across these ~20 marketplaces lands around **10-15%**. The 20%+ bucket is dominated by:
1. Aggregators with captive demand (Apple/Google 15-30%, Fiverr 20%, OnlyFans 20%)
2. Operationally heavy logistics (DoorDash, UberEats, TaskRabbit all-in)

Pure two-sided digital marketplaces for skills/content cluster at **8-15%** (Substack 10%, Patreon 8-12%, Vrbo 8%, Etsy ~10% all-in, Upwork moving variable).

**Implication for Skillzy:** 20% is defensible only if you're providing Fiverr-level demand generation and trust infrastructure. As a new entrant in a freelance/skills marketplace with no demand-side moat, the **closer analogs are Substack (10%), Patreon (8-12%), and the new Upwork variable model** — not Fiverr. 20% is an anchoring choice from two outliers, not a benchmark-driven number.

### G3. Take-Rate Theory Essays (Gurley's "Rake Too Far")

**Bill Gurley — "A Rake Too Far: Optimal Platform Pricing Strategy" (April 18, 2013)**

URL: https://abovethecrowd.com/2013/04/18/a-rake-too-far-optimal-platformpricing-strategy/

**Thesis:** Rakes that look profit-maximizing in the short run damage platform competitiveness, because the take rate is part of the consumer's landed price. Gurley argues for *modest* take rates — frequently cited as ~10–15% — and uses Facebook/Zynga's 30% as the canonical "rake too far." His framing: *"You want to build a platform that has the least amount of friction (both product and pricing). High rakes are a form of friction."*

He notes the distinction between *what you can extract vs. what you should extract*: pushing the rake too far makes the marketplace pricing unnaturally high and forfeits the "definitive place to transact" position. The Facebook example: when Facebook insisted on 30% of all Zynga revenue (including off-platform), Zynga had massive incentive to disintermediate.

**NFX — James Currier**

Currier explicitly says take rate spans enormously by category — *"Some marketplaces do well at 1.4% take rate on a transaction and others at 70%"* — so rake dynamics must be tested.

**Sahil Lavingia / Gumroad**

In Dec 2022/Jan 2023 he *raised* the rake to a flat 10% + processing fees passed through. Sacra reports the increase ~doubled monthly revenue ($1M → $1.8M) and flipped Gumroad from –$1M to +$9M net in 2023. Supply response: creator backlash was loud on Twitter but supply did not measurably leave; suggests demand-side stickiness can absorb a rake hike on an entrenched marketplace.

**Bottom line for the Skillzy take-rate decision**

Gurley's 10–15% sits at the low end of the canonical "safe" range; 20% is widely cited as the modal/optimal rate for new marketplaces; 30%+ (Facebook/Zynga, Apple App Store, Gumroad post-2023) is repeatedly identified as the danger zone — but only Gumroad's recent move offers a clean empirical test, and it shows an established marketplace can raise rake without losing supply.

---

## Section H — Failure Analysis (Survivorship Bias Check)

### H1. CB Insights Post-Mortems

- **CB Insights "483 Startup Failure Post-Mortems"** — running list (originally ~76 in 2014, now 483 as of the 10/1/2023–5/28/2024 update). Top root causes: ran out of cash (70%), no PMF (43%), bad timing (29%), bad unit economics (19%). https://www.cbinsights.com/research/startup-failure-post-mortem/
- **CB Insights "Top 20 Reasons Startups Fail"** PDF: https://s3-us-west-2.amazonaws.com/cbi-content/research-reports/The-20-Reasons-Startups-Fail.pdf

**Per-startup evidence**

**Homejoy** — *Stated cause:* poor cleaner quality, no repeat customers, worker-classification lawsuits. *Bootstrap:* Explicitly supply-first. First Round Review documents that Homejoy's playbook was "building up the supply of cleaners in each city in order to meet eventual demand"; "Once it reached 100 cleaners on its platform, it considered that city launched."

**Beepi** — *Stated cause:* $7M/month burn, couldn't build inventory critical mass. *Bootstrap:* Supply-first — "Beepi's initial outreach involved contacting car sellers on the local San Francisco Craigslist site for its first awareness campaign."

**Fab.com** — *Stated cause:* lost curation edge, $14M/month burn after expanding SKUs 1k→11k+. *Bootstrap:* Supply-first curated — Shellhammer "handpicked" designer goods. Hit 1M members in 5 months *after* curating supply.

**Quirky** — *Stated cause:* community votes ≠ paying demand; high manufacturing cost. *Bootstrap:* Pure supply-side (inventor community) first.

**Munchery** — *Stated cause:* scaled to multiple cities before unit economics worked; $125M raised. *Bootstrap:* Supply-side first — built captive central kitchens.

**Sidecar** — *Stated cause:* outspent by Uber/Lyft. *Bootstrap:* "Supply (drivers) and demand (riders) grew out of sync."

**Washio** — *Stated cause:* low margins, grew too fast, lost quality control. *Bootstrap:* Supply-side ops territory-by-territory.

**SpoonRocket** — *Stated cause:* couldn't raise more despite positive contribution margin. *Bootstrap:* Vertically-integrated supply.

**Move Loot** — *Stated cause:* opened a furniture stockroom without modeling expenses.

**Laurel & Wolf** — *Stated cause:* overspend on marketing + bad customer reputation.

**Shyp** — couldn't find profitable unit economics on on-demand pickup supply.

**Conclusion for the survivorship-bias argument**

Every failed marketplace investigated here seeded supply first or simultaneously — the same playbook attributed to Airbnb, DoorDash, Uber and OpenTable. **None of these post-mortems blame "started supply-first" as the cause** — they cite unit economics, quality, capital, retention. That is the survivorship-bias signature: the doctrine is uncorrelated with the outcome it claims to predict. Supply-first appears in roughly the same proportion among the dead as among the living.

### H2. Homejoy / Munchery / Beepi / Sidecar / Fab Specifics

**HOMEJOY (Adora Cheung, shut Jul 2015)**

- **Bootstrap order:** SUPPLY-FIRST, then heavy demand-side discounting. Cheung was literally the first cleaner herself, then recruited cleaners city-by-city ("100 cleaners = launched"). But demand was juiced with $19 Groupon-style deals vs $85 rack rate — ~75% of bookings came from discounts.
- **Quote (Cheung):** worker-classification lawsuits were the *"deciding factor"* preventing a Series C.
- **Stated cause:** retention collapsed (only ~25% of customers returned after month 1, <10% after 6 months), cleaners defected to direct client relationships.

**MUNCHERY (Tri Tran / Conrad Chu, shut Jan 2019)**

- **Bootstrap order:** SUPPLY-FIRST, vertically integrated. Built own kitchens, hired celebrity chefs on salary + revenue share + 9-5 hours.
- **Stated cause (bankruptcy filing):** *"increased competition, over-funding, aggressive expansion efforts and Blue Apron's failed IPO."* LA/NYC/Seattle kitchens proved unviable.
- **Supply-first evidence:** Cleanest case. They *controlled* supply completely. Overcapacity in supply was the murder weapon.

**BEEPI (Ale Resnik, shut Feb 2017)**

- **Bootstrap order:** SUPPLY-FIRST, with capex-heavy inspections. Deployed 100+ field inspectors to do 240-point evaluations.
- **Quote (Resnik to WSJ, 2015):** seeking *"monster round of $300 million at a $2 billion valuation"* to fuel national expansion.
- **Stated cause:** $7M/month burn, fund mismanagement, failed exits. ~3,000 sellers/month were *rejected* by the strict inspection — supply gating killed liquidity.

**SIDECAR (Sunil Paul, shut Dec 2015)**

- **Bootstrap order:** SIMULTANEOUS, supply-constrained. Invented modern rideshare but never had the war chest to subsidize drivers at Uber/Lyft scale.
- **Quote (Paul):** *"We are the innovation leader in ridesharing despite a significant capital disadvantage."* Sidecar raised ~$39M vs Uber's $10B+, Lyft's $1.26B.
- **Stated cause:** Pure capital asymmetry.
- **Supply-first evidence:** Counter-example. Sidecar pioneered the supply-side rideshare model. Being supply-first first didn't matter — whoever could subsidize supply hardest won.

**FAB.COM (Jason Goldberg, fire-sold 2015)**

- **Bootstrap order:** SUPPLY-FIRST via curation. Co-founder Bradford Shellhammer hand-curated boutique designers.
- **Quote (Goldberg):** *"We started to lose the curation edge. I remember we were all sitting around doing a preview of our products, and my team was like, 'This is not inspiring at all.' Our best-selling product was a t-shirt with a giant picture of an animal on it. Just crappy stuff."*
- **Stated cause:** Inventory bloat from 1k to 11k+ SKUs destroyed curation; $14M/month burn.

**Synthesis:** All five seriously invested in supply. **Munchery and Beepi are your strongest evidence** — both vertically controlled supply and died of supply-side overinvestment. **Sidecar** shows being supply-pioneer doesn't matter without capital. **Fab** shows curated supply works until scale destroys it.

### H3. Failed Marketplaces Bootstrap Strategies

For each: (a) name | (b) what came first | (c) source | (d) stated failure reason.

1. **Homejoy** — DEMAND-first via Groupon. Failed on unit economics & regulation.
2. **Sidecar** — SUPPLY-first. Capital asymmetry vs Uber/Lyft.
3. **Munchery** — SUPPLY-first vertically integrated. Capex of multi-city kitchens.
4. **Beepi** — SUPPLY-first inspections. $7M/mo burn, founder mismanagement.
5. **SpoonRocket** — SUPPLY-first vertically integrated. Couldn't raise in frosty 2016 climate.
6. **Washio** — DEMAND-first. Unit economics couldn't cover pickup logistics.
7. **Postmates** (pre-acquisition struggles, 2011–~2016) — Tried SUPPLY-first then forced to rebuild courier crowd. Survived (Uber acquired for $2.65B in 2020).
8. **Vayable** — SUPPLY-first. Experiences are "nice-to-have"; Airbnb Experiences crushed demand-side.
9. **Zaarly** — DEMAND-first then pivoted to SUPPLY-first. Couldn't scale beyond Kansas City.
10. **RelayRides/Turo** — SUPPLY-first. Pivoted away from hardware model and survived.
11. **Quirky** — SUPPLY-first. "Voters are NOT the customers" — community votes didn't predict retail demand.
12. **Fab.com** — DEMAND-first. Burned $200M chasing European expansion.
13. **Gigwalk** — SUPPLY-first. Quietly pivoted to enterprise B2B SaaS.

**Adversarial verdict on the supply-first hypothesis:**

- **Supply-first failures:** Sidecar, Munchery, Beepi, SpoonRocket, Vayable, Quirky, Gigwalk, Turo-v1 (8)
- **Demand-first failures:** Homejoy, Washio, Fab, Zaarly-v1 (4)
- **Tried both / mixed:** Postmates, Zaarly, Turo (pivoted)

**Steelman holds:** Supply-first does NOT explain success. The majority of these failures DID seed supply first and died anyway. They died from: capital asymmetry, unit economics/capex, category-is-nice-to-have demand ceilings, founder/governance failures, regulation, and over-expansion.

**Bottom line for Skillzy:** Survivorship bias is real here. "Supply-first" as a slogan is roughly 50/50 among failures and survivors; what actually distinguishes survivors is unit economics at steady state and not running out of capital before achieving liquidity in a defined geography.

### H4. Survivorship Bias Critique of "Supply-First"

**Direct hit on the exact claim: not found.** No writer surfaces who explicitly says "the supply-first marketplace doctrine is survivorship bias" and then enumerates failed marketplaces that also went supply-first.

**Closest adjacent material:**

1. **Sparkline Capital — "The Platform Economy"** Names survivorship bias directly: "The historical performance of platform companies will be grossly overstated if these companies are selected with the benefit of hindsight."

2. **Lenny Rachitsky** explicitly concedes survivorship bias in the Airbnb Craigslist-hack/door-knocking lore, and his own dataset of 23 marketplaces shows "Only Rover, TaskRabbit, and Zillow were demand constrained" — i.e., he admits the supply-first rule is a generalization from a sample dominated by winners.

3. **Sarah Tavel — Hierarchy of Marketplaces, Level 2/3.** Closest thing to an insider warning: *"the advice you receive when solving the cold start problem rapidly becomes dangerous as your marketplace heats up."* Uses Etsy's loss of soul (mass-produced goods crowding out crafters) as the canonical counterexample where supply-maxing destroyed the marketplace.

4. **"Most Startup Advice Is Survivorship Bias from Outliers"** (https://blog.mean.ceo/startup-advice-bias/). Generic version of the user's hypothesis.

5. **Failory — "44 Failed Marketplace Startups"** and **Juggernaut — "10 Uber for X Startups That Failed"**. Both catalog marketplaces where supply was seeded heavily but the marketplace died. Neither author connects this to a survivorship-bias critique of the doctrine.

**Gap / opportunity.** The explicit synthesis the user is hypothesizing — "the supply-first rule is survivorship bias; here are N failed marketplaces that did supply-first and died anyway" — does not appear to have been written. Failory's list plus Sarah Tavel's "dangerous as your marketplace heats up" hedge plus the Sparkline survivorship-bias frame would together support that essay, but no one has assembled them.

---

## End notes

This appendix preserves every cited finding from the research streams that fed the synthesis at the top of this document. Where sub-agents could not access primary sources (WebFetch 403'd on many sites — Sahil Lavingia's essay, Andrew Chen's blog, NFX, abovethecrowd.com, etc.), they relied on search-result snippets of those primary sources. **Treat any specific dollar amount, percentage, or "X said Y" claim as worth double-checking** before publishing it externally.

The strategic takeaways at the top of this document are intentionally more decisive than the raw research warrants — that's a feature, not a bug. The raw research is here for when you need to defend a number to an investor, a creator, or yourself at 2am. The synthesis is here for when you need to act.

Go build it.


