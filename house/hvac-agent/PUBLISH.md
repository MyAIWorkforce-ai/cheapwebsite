# PUBLISH — internal notes

How to publish this bundle to a new Skillzy listing.

## Recommended listing config

- **Title:** HVAC Agent, end to end.
- **Type:** Agent Setup
- **Price:** $199 USD
- **Niche:** `tradies, hvac, refrigeration, heat-pump, home-services`
- **Platforms:** All agents (Skillzy `All agents` toggle)
- **Tagline:** *Plan, quote, dispatch, refrigerant log, invoice, follow up — your full HVAC tech's desk in one agent. Heatwave breakdowns to ducted installs. Works AU, NZ, UK, US, CA.*

## Upload via /sell/new

1. Sign in as **@skillzy-house** (house@skillzy.ai login)
2. Go to **/sell/new**
3. Drop `hvac-agent.zip` (from `house/_bundles/`) in step 02
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
- Check the listing page renders without overflow

## Optional: Showcase tier

Strong candidate for the $49 Showcase upgrade — the navy card stands
out on the marketplace grid, and HVAC techs searching "AI agent for
my HVAC business" or "agent for refrigeration crew" should hit a
premium-feeling listing first. Toggle Showcase after publish if you
want to test it. HVAC techs are particularly receptive to "annual
service plan" framing — emphasise the recurring-revenue maintenance
skill in the showcase summary.

## Cross-listing on awesome-claude-skills

After publish, optionally:

1. Create `github.com/skillzy/hvac-agent` (public repo with
   the README + LISTING_COPY content + link to Skillzy listing)
2. Submit PRs to:
   - ComposioHQ/awesome-claude-skills
   - karanb192/awesome-claude-skills
   - BehiSecc/awesome-claude-skills

That gives the listing GitHub-native discovery + organic backlinks.

## Future improvements (post-launch)

- **Region-specific landing pages** — `/marketplace/hvac-agent?region=uk`
  pre-fills the F-Gas / REFCOM / MCS heat pump references.
- **Specialty variants** — heat pump retrofit-only (residential
  electrification market), commercial chillers, light commercial
  RTU specialists.
- **Integrations directory** — explicit n8n/Zapier flows for the
  common tools (simPRO, ServiceM8, FieldEdge, Housecall Pro, Jobber,
  ServiceTitan, Xero, MYOB) bundled as optional add-ons.
- **Refrigerant tracking integration** — wire to electronic logbook
  apps (AHRI, manufacturer apps) so the agent's logbook output
  syncs to the regulator-facing system.
- **Real case-study customer** — once 5+ HVAC techs are using it,
  publish a "how a Brisbane HVAC tech moved 38% of customers onto
  service plans in 6 months" case study on the marketplace blog.
- **Service plan attach calculator** — bolt-on widget that takes the
  buyer's last 12 months of jobs and projects revenue uplift if they
  hit 60% service plan attach.
