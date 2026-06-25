# Website Builder Agent, end to end.

A complete website desk for your agent. Drop this bundle into the
agent you already use, brief it on the business you're building for,
and it walks you from a blank page to a deployed, domain-pointed,
SEO-ready, analytics-tracked, accessibility-clean, performance-tuned
site at your own URL. Then it stays on standby — every later change
ships with a sentence like *"make the headline say X."*

Built for solo founders, freelance designers, web shops, marketers,
and operators who want a small-business site shipped this week, not
this quarter. Works the same in Australia, New Zealand, the UK, the
US, and Canada — the regional reference inside the bundle maps every
privacy law, hosting option, registrar, language quirk, and tax
disclosure so you don't have to guess.

## The full loop

```
brief arrives ("plumber in Adelaide, need a booking site")
   → discover (audience, brand, scope, payments, region)
   → information architecture (sitemap + URL plan + conversion paths)
   → scaffold the build (Next.js/Astro/Webflow — agent picks)
   → write the actual content (hero, services, about, FAQs, CTAs)
   → deploy to Vercel + preview branches
   → wire the custom domain (DNS, SSL, redirects)
   → SEO on-page (meta + JSON-LD + Core Web Vitals)
   → analytics + tracking (GA4 / Plausible / consent banner)
   → payments (light — pointer to the Stripe Setup bundle)
   → forms + lead capture (anti-spam, CRM hand-off)
   → launch checklist (a11y, perf, security, soft launch)
   → maintain + update — the standing-by desk forever after
```

Maintains a running `learnings.md` so the agent gets sharper each
project — tracks which page types convert, which CTAs win for which
audience, which hosting decisions paid off, which CMS the buyer
actually ended up using, which DNS gotchas keep showing up, which
analytics events mattered.

## What's in this bundle

```
site-builder/
├── README.md                              ← this file
├── SETUP.md                               ← 10-minute setup
├── MASTER_PROMPT.md                       ← orchestrator system prompt
├── LISTING_COPY.md                        ← internal: marketplace copy
├── PUBLISH.md                             ← internal: how to publish
├── config/
│   ├── business-config-template.md        ← business, brand, audience, region, scope
│   └── learnings-template.md              ← running learnings file
├── skills/
│   ├── 01-discover.md                     ← interview + requirements
│   ├── 02-information-architecture.md     ← sitemap, URLs, conversion paths
│   ├── 03-scaffold-build.md               ← stack choice + scaffold
│   ├── 04-content-writing.md              ← page-type writing playbook
│   ├── 05-deploy-vercel.md                ← deploy + preview branches
│   ├── 06-connect-domain.md               ← DNS, SSL, registrars, CDN
│   ├── 07-seo-onpage.md                   ← meta + schema + Core Web Vitals
│   ├── 08-analytics-tracking.md           ← GA4, Plausible, consent, GTM, events
│   ├── 09-payments-integration.md         ← pointer to Stripe Setup bundle
│   ├── 10-forms-leads.md                  ← contact forms, anti-spam, CRM
│   ├── 11-launch-checklist.md             ← pre-launch QA + soft launch
│   └── 12-maintain-update.md              ← ongoing updates, content cadence
├── templates/
│   ├── sitemap-template.md
│   ├── homepage-content-template.md       ← hero/proof/features/CTA blocks
│   ├── about-page-template.md
│   ├── services-page-template.md
│   ├── pricing-page-template.md
│   ├── contact-page-template.md
│   ├── blog-post-template.md
│   ├── legal-pages-pack.md                ← privacy, terms, cookie, refund — region-aware
│   └── launch-day-checklist.md
└── knowledge/
    └── regional-reference.md              ← AU/NZ/UK/US/CA web specifics
```

## How it works

1. **Drop it in your agent.** Claude, OpenClaw, ChatGPT, Gemini,
   Grok — drop the `site-builder/` folder into a project, knowledge
   base, or skills tab.
2. **Load the orchestrator.** Paste `MASTER_PROMPT.md` as the system
   prompt. It tells the agent which skill to use when and routes
   based on whether payments are needed.
3. **Fill the business config.** First run, the agent walks you
   through `config/business-config-template.md` — the business type,
   target audience, brand voice, region, payment intent, CMS
   preference, hosting target.
4. **Run discovery.** *"I want to build a booking site for a
   plumber in Adelaide."* The agent asks a tight set of questions,
   confirms the brief, and routes to the next skill.
5. **Watch it ship.** Sitemap → scaffold → content → deploy → DNS
   → SEO → analytics → forms → launch QA → live. One skill at a
   time, with checkpoints before anything irreversible.

## What the buyer ends up with

- A working **Next.js + Tailwind site** (or Astro / Webflow / WordPress
  if the brief calls for it), on GitHub, deployed to Vercel
- **Custom domain** wired with HTTPS, HSTS, and CDN — with registrar-
  specific DNS steps walked through
- **SEO baseline**: `metadata`, `sitemap.xml`, `robots.txt`, canonical
  URLs, JSON-LD structured data (LocalBusiness / ProfessionalService
  / Article / FAQPage), `llms.txt` for AI search
- **Core Web Vitals targets met**: LCP <2.5s, INP <200ms, CLS <0.1,
  Lighthouse 90+
- **Accessibility baseline**: WCAG 2.1 AA — semantic HTML, keyboard
  navigable, alt text, contrast checked
- **Analytics + consent**: GA4 or Plausible wired, regional cookie
  banner (Cookiebot / Iubenda / Termly / CookieYes — picked for the
  buyer's region), conversion events
- **Lead capture**: contact form with anti-spam (honeypot + reCAPTCHA
  v3 or Cloudflare Turnstile), routed to email and/or CRM
- **Legal pack**: privacy policy, terms, cookie policy, refund policy
  — region-aware (Privacy Act 1988 / Privacy Act 2020 / UK GDPR + DPA
  2018 / CCPA + state patchwork / PIPEDA + Quebec Law 25)
- **(If payments)** A pointer-skill that hands off to the **Stripe
  Setup, end to end.** bundle — no duplication
- A working **orchestrator** the agent uses for every later change

## Regions it works in

- **Australia** — Privacy Act 1988 (with 2024 amendments) + APPs;
  Spam Act 2003; auDA `.com.au` (ABN required); ACMA; Notifiable
  Data Breaches scheme; GST 10%; hosts: SiteHost, VentraIP, Crucial,
  Vercel
- **New Zealand** — Privacy Act 2020; OPC notifiable breach scheme;
  DNCL `.nz` domains; GST 15%; hosts: SiteHost, Vercel
- **United Kingdom** — UK GDPR + Data Protection Act 2018; ICO;
  PECR for cookies + electronic marketing; ASA + CMA; Accessibility
  Regulations 2018 (public sector); Nominet `.uk`; VAT 20%; hosts:
  Krystal, UKFast, Vercel
- **United States** — State patchwork (CCPA + CPRA, VCDPA, CPA,
  CTDPA, UCPA + 10+ more); CAN-SPAM; FTC; COPPA; ADA accessibility;
  NeuStar `.us`; state sales tax (varies)
- **Canada** — PIPEDA federal; Quebec Law 25 (GDPR-like, French
  required); CASL anti-spam; CIRA `.ca`; bilingual content for
  federal + Quebec; GST/PST/HST

The regional reference inside the bundle maps every term — you don't
need to teach the agent which country you're in beyond filling out
the business config.

## Agent platforms it runs on

- **Claude** (Claude Code, Claude Projects, Claude.ai file uploads)
- **OpenClaw** (drop into the Skills tab)
- **ChatGPT** (Custom GPT Knowledge or Project files)
- **Gemini / Grok** (paste skills as a system prompt + knowledge)
- **n8n / Make / Zapier** (advanced — each SKILL as a prompt block)

## Pairs with

- **Stripe Setup, end to end.** — for the payments side. Skill 09
  hands off to that bundle so you don't double-pay for overlapping
  content. Buy both if the site sells anything.
- **Plumber / Electrician / HVAC / Builder Agent bundles** — these
  run the trades desk for the customer who bought the website you
  just shipped.

## Support

Reply to your confirmation email or write to `creators@skillzy.ai`.
