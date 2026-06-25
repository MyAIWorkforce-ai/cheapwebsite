# PUBLISH — internal notes

How to publish this bundle to a new Skillzy listing.

## Recommended listing config

- **Title:** Builder Agent, end to end.
- **Type:** Agent Setup
- **Price:** $199 USD
- **Niche:** `tradies, builders, general-contractors, construction, renovation, home-services`
- **Platforms:** All agents (Skillzy `All agents` toggle)
- **Tagline:** *Enquiry to retention release — your full builder's office in one agent. Site visit through 11-month defects sweep. Works AU, NZ, UK, US, CA.*

## Upload via /sell/new

1. Sign in as **@skillzy-house** (house@skillzy.ai login)
2. Go to **/sell/new**
3. Drop `builder-agent.zip` (from `house/_bundles/`) in step 02
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
- Check the listing page renders without overflow (since the niche
  / platform fixes shipped earlier in the session)

## Optional: Showcase tier

Builders run higher-value projects than electricians or plumbers
(a single residential extension is $200k+ vs a $500 callout) so
the lifetime value of a builder buyer is high. This is a strong
candidate for the $49 Showcase upgrade — the navy card stands out
on the marketplace grid, and builders searching "AI agent for my
building business" should hit a premium-feeling listing first.
Toggle Showcase after publish if you want to test it.

## Cross-listing on awesome-claude-skills

After publish, optionally:

1. Create `github.com/skillzy/builder-agent` (public repo with the
   README + LISTING_COPY content + link to Skillzy listing)
2. Submit PRs to:
   - ComposioHQ/awesome-claude-skills
   - karanb192/awesome-claude-skills
   - BehiSecc/awesome-claude-skills

That gives the listing GitHub-native discovery + organic backlinks.

## Future improvements (post-launch)

- **Region-specific landing pages** — `/marketplace/builder-agent?region=uk`
  pre-fills the regional reference for the buyer. JCT-focused
  detail snippet renders for UK buyers; HIA + MBA for AU.
- **Industry-specific variants** — quoting templates tuned for
  kitchen + bath specialists, extension specialists, new-build
  specialists, commercial fit-out contractors as separate sub-
  listings. Higher-margin niche listings.
- **Integrations directory** — explicit n8n/Zapier flows for the
  common tools (Buildxact, simPRO, CoConstruct, Buildertrend,
  Procore, Xero, MYOB, QuickBooks, Tradify) bundled as optional
  add-ons.
- **Architect-collab variant** — a stripped-down variant aimed at
  builders who work primarily through architects (different lead-
  gen, different contract pathway, different progress reporting
  format).
- **Real case-study customer** — once 5+ builders are using it,
  publish a "how a Sydney builder used this to recover $14k in
  un-signed variations on a single $400k extension" case study on
  the marketplace blog. (Variations recovery is the strongest
  marketing angle for this bundle.)
