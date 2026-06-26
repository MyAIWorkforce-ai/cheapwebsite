# PUBLISH — internal notes

How to publish this bundle to a new Skillzy listing.

## Recommended listing config

- **Title:** Airbnb Host Agent, end to end.
- **Type:** Agent Setup
- **Price:** $199 USD
- **Niche:** `short-term-rental, airbnb-hosts, vrbo-hosts, property-management, hospitality`
- **Platforms:** All agents (Skillzy `All agents` toggle)
- **Tagline:** *Triage every inquiry in minutes (Superhost discipline), quote, turnover, mid-stay, review — your full STR desk in one agent. Airbnb + VRBO + Booking + direct. 1-50 properties. Works AU, NZ, UK, US, CA.*

## Upload via /sell/new

1. Sign in as **@skillzy-house** (house@skillzy.ai login)
2. Go to **/sell/new**
3. Drop `airbnb-host-agent.zip` (from `house/_bundles/`) in step 02
4. Let the AI draft run from the README + skills
5. Override:
   - Title (if AI suggests something off — keep "Airbnb Host Agent,
     end to end." for series consistency)
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
- Check the listing page renders without overflow (niche / platform
  fixes shipped earlier in the session)

## Optional: Showcase tier

This is a strong candidate for the $49 Showcase upgrade. STR hosts
are sophisticated buyers who read forums daily and know exactly
which tools are real (Hospitable, PriceLabs, Igloohome, NoiseAware)
— a premium-feeling listing builds the trust they need before
paying. Toggle Showcase after publish if you want to test it.

## Cross-listing on awesome-claude-skills

After publish, optionally:

1. Create `github.com/skillzy/airbnb-host-agent` (public repo with
   the README + LISTING_COPY content + link to Skillzy listing)
2. Submit PRs to:
   - ComposioHQ/awesome-claude-skills
   - karanb192/awesome-claude-skills
   - BehiSecc/awesome-claude-skills

That gives the listing GitHub-native discovery + organic backlinks.

## Cross-sell to Cleaner Agent bundle

The cleaner bundle (if/when shipped) is THE complementary product —
STR turnovers are a key intersection. When listing both:

- Add a "Pairs well with" note on each listing pointing to the other
- The Airbnb Host Agent dispatches turnovers; the Cleaner Agent
  manages the cleaner's side of the same workflow
- Bundle pricing: consider a $349 combined ("STR ops bundle —
  host side + cleaner side") if both land well

## Future improvements (post-launch)

- **Region-specific landing pages** — `/marketplace/airbnb-host-agent?region=nyc`
  pre-fills the regional reference for the buyer (LL18 + NYC tax
  + Proper Insurance + 2-guest limit lead-in)
- **Channel-manager-specific variants** — pre-tuned config snippets
  for Hospitable users vs OwnerRez users vs Hostaway users (the
  variable names differ across platforms; tuning saves the buyer
  20 mins)
- **Portfolio-tier variant** — for hosts with 10-50 properties, a
  pro variant with multi-property dashboard + cross-listing
  market analysis + dedicated rate-strategy skill
- **Co-host marketplace integration** — for hosts hiring a co-host,
  a sub-bundle with co-host SLA templates + commission-split
  reconciliation
- **Direct-booking site builder skill** — explicit Hostfully /
  OwnerRez / Lodgify / Boostly setup walkthroughs (currently
  referenced in skill 10 but not hand-held)
- **Real case-study host** — once 5+ hosts are using it, publish a
  "how a Hobart Airbnb host went from 65% to 87% occupancy in 90
  days" case study on the marketplace blog
- **Property-type variants** — sub-listings for: cabin hosts (rural,
  longer stays, septic + bore water), beach-house hosts (peak/off
  season swing), urban-apartment hosts (HOA + lockbox + noise),
  high-end / Plum Guide hosts (concierge tier)

## STR-specific upsell potential

Once a host buys this and uses it for a season, natural upsell:

- **Cleaner Agent bundle** ($199) — cleaner side of the workflow
- **Property Manager Agent** ($199-$299) — for hosts who've grown to
  10+ properties and now manage other people's listings
- **Direct Booking Site Setup** ($99 add-on) — Hostfully / OwnerRez
  / Lodgify launch in a week
