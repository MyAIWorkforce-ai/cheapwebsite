# PUBLISH — internal notes

How to publish this bundle to a new Skillzy listing.

## Recommended listing config

- **Title:** Cleaner Agent, end to end.
- **Type:** Agent Setup
- **Price:** $199 USD
- **Niche:** `cleaners, bond-cleaning, commercial-cleaning, str-turnover, home-services`
- **Platforms:** All agents (Skillzy `All agents` toggle)
- **Tagline:** *Quote, dispatch, photo-evidence, invoice, direct-debit recurring, follow up — your full cleaner's desk in one agent. Bond cleans to STR turnovers to commercial nightly contracts. Works AU, NZ, UK, US, CA.*

## Upload via /sell/new

1. Sign in as **@skillzy-house** (house@skillzy.ai login)
2. Go to **/sell/new**
3. Drop `cleaner-agent.zip` (from `house/_bundles/`) in step 02
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

This is a strong candidate for the $49 Showcase upgrade. Cleaning
business owners searching "AI agent for my cleaning business" or
"automate Airbnb turnovers" should hit a premium-feeling listing
first. The navy card stands out on the marketplace grid. Toggle
Showcase after publish if you want to test it.

## Cross-listing on awesome-claude-skills

After publish, optionally:

1. Create `github.com/skillzy/cleaner-agent` (public repo with the
   README + LISTING_COPY content + link to Skillzy listing)
2. Submit PRs to:
   - ComposioHQ/awesome-claude-skills
   - karanb192/awesome-claude-skills
   - BehiSecc/awesome-claude-skills

That gives the listing GitHub-native discovery + organic backlinks.

## Cross-promotion with the Airbnb Host Agent bundle

The STR turnover skill (in `09-recurring-maintenance.md`) is
deliberately built to dovetail with the Airbnb Host Agent bundle.
On the listing, surface the pairing:

> *Pairs with the Airbnb Host Agent bundle if you run both sides
> of the loop (host + turnover crew). The cleaner agent recognises
> STR-host customers and adjusts comms (per-turnover photo
> evidence, linen restocks, amenity checklist, sub-2-hour
> turnaround windows).*

Add the pairing badge to the listing page footer for both
bundles to drive cross-cart attach.

## Future improvements (post-launch)

- **NDIS specialist variant** — a stripped-down variant for
  NDIS-only providers (Worker Screening Check + Code of Conduct
  enforcement, NDIS-specific invoicing format, NDIS Quality and
  Safeguards Commission compliance audit support).
- **Bond clean specialist variant** — for operators who are 80%+
  bond cleans. REIQ / RTA / TDS / DPS state-by-state checklist
  packs, photo-evidence pack templates pre-formatted for landlord
  delivery.
- **STR turnover variant** — pure STR / Airbnb turnover operator.
  Sub-2-hour turnaround templates, host comms integration,
  laundry / linen / restock SKU tracking.
- **Commercial-only variant** — for crews that only do
  after-hours commercial cleaning. Key-holder + alarm-code
  management, CIMS-GB / BICSc compliance support, multi-site
  contract roll-up reporting.
- **Region-specific landing pages** — `/marketplace/cleaner-agent?region=uk`
  pre-fills the regional reference for the buyer.
- **Real case-study customer** — once 5+ cleaners are using it,
  publish a "how a Sydney bond cleaner used this to do 18 bonds
  in a week without losing a single deposit" case study on the
  marketplace blog.
- **Integrations directory** — explicit n8n / Zapier flows for
  ServiceM8 / Jobber / Housecall Pro / ZenMaid / Launch27 /
  Booking Koala bundled as optional add-ons.
