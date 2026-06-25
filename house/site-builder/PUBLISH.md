# PUBLISH — internal notes

How to publish this bundle to a new Skillzy listing.

## Recommended listing config

- **Title:** Website Builder Agent, end to end.
- **Type:** Agent Setup
- **Price:** $199 USD
- **Niche:** `small-business, freelancers, designers, marketers, local-services`
- **Platforms:** All agents (Skillzy `All agents` toggle)
- **Tagline:** *Discovery, sitemap, scaffold, content, deploy, DNS,
  SEO, analytics, forms, launch — your full website desk in one
  agent. Works AU, NZ, UK, US, CA.*

## Upload via /sell/new

1. Sign in as **@skillzy-house** (house@skillzy.ai login)
2. Go to **/sell/new**
3. Drop `site-builder.zip` (from `house/_bundles/`) in step 02
4. Let the AI draft run from the README + skills
5. Override:
   - Title (if AI suggests something off — the AI tends to add
     "Builder" or "Creator" suffixes; keep it as "Website Builder
     Agent, end to end.")
   - Niche (trim to 3-5)
   - Platforms (toggle "All agents")
   - Tagline (use the recommended one if AI is verbose)
6. Set Price = $199
7. Publish

## Smoke-test after publish

- Buy a copy yourself with a $1 test card (or use Stripe test mode)
- Confirm the zip downloads cleanly
- Unzip, confirm the structure matches what the listing description
  promises:
  - 5 root MDs (README, SETUP, MASTER_PROMPT, LISTING_COPY, PUBLISH)
  - 2 config files
  - 12 skill files
  - 9 template files
  - 1 knowledge file (regional reference)
- Drop into Claude, run with: *"I want to build a one-page landing
  for a fictional Adelaide plumber"* — agent should start with
  discover (skill 01) and route correctly
- Check the listing page renders without overflow

## Optional: Showcase tier

This is a strong candidate for the $49 Showcase upgrade — the navy
card stands out on the marketplace grid, and solo founders /
freelance designers searching "AI agent that builds my website" or
"AI agent for client websites" should hit a premium-feeling listing
first. Toggle Showcase after publish if you want to test it.

## Cross-listing on awesome-claude-skills

After publish, optionally:

1. Create `github.com/skillzy/site-builder` (public repo with the
   README + LISTING_COPY content + link to Skillzy listing)
2. Submit PRs to:
   - ComposioHQ/awesome-claude-skills
   - karanb192/awesome-claude-skills
   - BehiSecc/awesome-claude-skills

That gives the listing GitHub-native discovery + organic backlinks.

## Cross-promotion with Stripe Setup bundle

Skill 09 hands off to the **Stripe Setup, end to end.** bundle. If
your buyer needs payments, the natural upsell path is:

1. Buyer purchases site-builder ($199)
2. During skill 09, agent surfaces: *"For payments, the cleanest
   path is the Stripe Setup, end to end. bundle on Skillzy. Both
   bundles plug into each other — want me to point you at it?"*
3. Buyer purchases Stripe Setup ($199)
4. Both bundles installed; site-builder runs to launch; Stripe Setup
   handles the payments craft

Consider a **bundle discount** later: $349 for both ($49 off).

## Bundles with the trades agents

If a buyer is building for a plumbing / HVAC / electrical / building
client, the site-builder bundle pairs naturally with the relevant
trades bundle:

- **Plumber Agent + Website Builder Agent** — site for the plumbing
  business + the desk to run the business behind it
- **Electrician Agent + Website Builder Agent**
- **HVAC Agent + Website Builder Agent**
- **Builder Agent + Website Builder Agent**

Each pair is ~$398. Could test a $329 bundle price.

## Future improvements (post-launch)

- **Region-specific landing pages** —
  `/marketplace/site-builder?region=uk` pre-fills the regional
  reference for the buyer. (Listing detail page renders the UK-
  relevant snippet first.)
- **CMS-specific variants** — a stripped-down "WordPress edition"
  or "Webflow edition" of the bundle for buyers who already know
  their CMS. ~$149 each.
- **Industry-specific templates** — content + sitemap templates
  tuned for trades, coaches, accountants, dentists, real estate
  agents as separate sub-bundles.
- **Integrations directory** — explicit n8n / Zapier / Make flows
  for the common tools (HubSpot, Mailchimp, Calendly, Cal.com,
  Tally, Notion CMS) bundled as optional add-ons.
- **Multilingual variant** — for Quebec / Switzerland / Belgium /
  general bilingual builds; expand the content writing skill with
  i18n patterns (next-intl, Astro i18n).
- **Real case-study customer** — once 5+ buyers have shipped sites,
  publish a "how a Sydney designer shipped 6 client sites in a
  month with this bundle" case study on the marketplace blog.
- **Sub-skill: re-platform** — for buyers moving an existing site
  (WordPress → Next.js, Squarespace → Webflow) — picks up where
  scaffold normally starts and adds a content-migration pass.
