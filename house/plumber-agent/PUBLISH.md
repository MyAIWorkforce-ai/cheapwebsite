# PUBLISH — internal notes

How to publish this bundle to a new Skillzy listing.

## Recommended listing config

- **Title:** Plumber Agent, end to end.
- **Type:** Agent Setup
- **Price:** $199 USD
- **Niche:** `tradies, plumbers, gas-fitters, home-services, property-management`
- **Platforms:** All agents (Skillzy `All agents` toggle)
- **Tagline:** *Plan, quote, dispatch, certify, invoice, follow up — your full plumber's desk in one agent. Burst pipes to bathroom renos. Works AU, NZ, UK, US, CA.*

## Upload via /sell/new

1. Sign in as **@skillzy-house** (house@skillzy.ai login)
2. Go to **/sell/new**
3. Drop `plumber-agent.zip` (from `house/_bundles/`) in step 02
4. Let the AI draft run from the README + skills
5. Override:
   - Title (if AI suggests something off)
   - Niche (trim to 3-5)
   - Platforms (toggle "All agents")
   - Tagline (use the recommended one if AI is verbose)
6. Set Price = $199
7. Publish

## Smoke-test after publish

- Buy a copy yourself with a $1 test card (or use Stripe test mode)
- Confirm the zip downloads cleanly
- Unzip, confirm the structure matches what the listing description
  promises
- Check the listing page renders without overflow (since the niche /
  platform fixes shipped earlier in the session)

## Optional: Showcase tier

This is a strong candidate for the $49 Showcase upgrade — the navy
card stands out on the marketplace grid, and plumbers searching
"AI agent for my plumbing business" should hit a premium-feeling
listing first. Toggle Showcase after publish if you want to test it.

## Cross-listing on awesome-claude-skills

After publish, optionally:

1. Create `github.com/skillzy/plumber-agent` (public repo with
   the README + LISTING_COPY content + link to Skillzy listing)
2. Submit PRs to:
   - ComposioHQ/awesome-claude-skills
   - karanb192/awesome-claude-skills
   - BehiSecc/awesome-claude-skills

That gives the listing GitHub-native discovery + organic backlinks.

## Future improvements (post-launch)

- **Region-specific landing pages** — `/marketplace/plumber-agent?region=uk`
  pre-fills the regional reference for the buyer. (Listing detail
  page renders the UK-relevant snippet first.)
- **Industry-specific templates** — quoting templates tuned for
  hot water specialists, drainage / CCTV pipe inspection contractors,
  or commercial backflow-only contractors as separate sub-listings.
- **Integrations directory** — explicit n8n/Zapier flows for the
  common tools (simPRO, ServiceM8, Tradify, AroFlo, Fergus, Xero,
  MYOB) bundled as optional add-ons.
- **Gas-fitter-only variant** — a stripped-down variant for ticketed
  gas-only contractors (no general plumbing intake, all gas Type A
  cert flow).
- **Real case-study customer** — once 5+ plumbers are using it,
  publish a "how a Brisbane plumber used this to save X hours a week
  on burst-pipe call-outs" case study on the marketplace blog.
