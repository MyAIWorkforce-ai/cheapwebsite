# PUBLISH — internal notes

How to publish this bundle to a new Skillzy listing.

## Recommended listing config

- **Title:** Bookkeeper Agent, end to end.
- **Type:** Agent Setup
- **Price:** $249 USD (premium tier — higher than $199 trades because
  the target buyer is a higher-income professional with a bigger
  underlying problem to solve)
- **Niche:** `bookkeepers, bas-agents, accountants, fractional-cfo, professional-services`
- **Platforms:** All agents (Skillzy `All agents` toggle)
- **Tagline:** *Quote, engage, onboard, close, lodge, invoice, review — your full bookkeeping practice in one agent. Catch-ups to CFO-lite. Works AU, NZ, UK, US, CA.*

## Upload via /sell/new

1. Sign in as **@skillzy-house** (house@skillzy.ai login)
2. Go to **/sell/new**
3. Drop `bookkeeper-agent.zip` (from `house/_bundles/`) in step 02
4. Let the AI draft run from the README + skills
5. Override:
   - Title (if AI suggests something off)
   - Niche (trim to 3-5)
   - Platforms (toggle "All agents")
   - Tagline (use the recommended one if AI is verbose)
6. Set Price = $249 (premium tier)
7. Publish

## Smoke-test after publish

- Buy a copy yourself with a $1 test card (or use Stripe test mode)
- Confirm the zip downloads cleanly
- Unzip, confirm the structure matches what the listing description
  promises (all 28 files present)
- Check the listing page renders without overflow

## Price justification (for marketplace blurb + buyer FAQ)

Bookkeepers are a higher-income professional cohort with:

- Average billing $80-$180/hr (vs trades $90-$150/hr)
- Recurring monthly engagements (vs trades' one-off-heavy model)
- Bigger downstream upside — saving 4 hrs/week on workflow plumbing
  unlocks 200+ hrs/year for advisory ($150-$300/hr realised)
- One retained $1,800/mo client = $21,600 ARR — pays for the bundle
  86× in year one
- Practice owners think in lifetime value of clients; $249 vs $199
  is a rounding error against any retained engagement

The $249 price point also:

- Filters out non-buyers (bargain-hunters who'd never implement)
- Positions premium against the $199 trades tier (signal the
  bundle is for the higher-revenue professional)
- Matches the willingness-to-pay curve for bookkeeper SaaS
  ($50-$200/mo subscriptions are normal in this segment)

## Optional: Showcase tier

This is a strong candidate for the $49 Showcase upgrade — the navy
card stands out on the marketplace grid, and bookkeepers / accountants
searching "AI agent for my bookkeeping practice" should hit a
premium-feeling listing first. Toggle Showcase after publish if you
want to test it.

## Cross-listing on awesome-claude-skills

After publish, optionally:

1. Create `github.com/skillzy/bookkeeper-agent` (public repo with
   the README + LISTING_COPY content + link to Skillzy listing)
2. Submit PRs to:
   - ComposioHQ/awesome-claude-skills
   - karanb192/awesome-claude-skills
   - BehiSecc/awesome-claude-skills
   - any "AI for accountants" / "AI for bookkeepers" awesome lists

That gives the listing GitHub-native discovery + organic backlinks.

## Targeted distribution

Higher-converting channels for this specific bundle (try these
before general PPC):

- **ICB Australia / IPA member forums** — directly addressable
- **AAT / ICB UK community forums + LinkedIn groups**
- **The Bookkeeper podcast** (UK + AU) — sponsor or guest
- **r/bookkeeping**, **r/Accounting** — be useful, link in
  comments only when contextually relevant
- **Karbon / Ignition customer Slack communities** — these tools
  attract the practice-management-mature bookkeeper, the perfect
  buyer
- **AccountingWEB UK** — paid content placement
- **Practice Ignition / Karbon affiliate / partner page** if
  reachable — they want their customers buying complementary tools
- **Bookkeeper conferences** — Xerocon (AU/NZ/UK/US/CA),
  QuickBooks Connect, AAT Annual Conference, ICB Summit

## Future improvements (post-launch)

- **Region-specific sub-listings** — separate landing pages tuned
  for AU (BAS-agent-focused), UK (MTD-focused with AML/CTF as
  feature), US (sales-tax + 1099-focused), CA (GST/HST + T4-
  focused). Same bundle, different positioning.
- **Industry-specific variants** — eComm bookkeeping (A2X-heavy),
  trades bookkeeping (jobs, allowances, EOY tradie patterns),
  hospitality bookkeeping (POS sync, tips, cash-handling AML),
  not-for-profit bookkeeping (DGR, grants, restricted funds)
- **CFO-lite sub-bundle** — strip out compliance-only skills,
  emphasise advisory + cash flow + Spotlight Reporting +
  scenario modelling
- **Integration recipes** — explicit n8n / Zapier / Make flows
  for the common stack (Xero + Karbon + Ignition + Hubdoc +
  Stripe direct debit) bundled as optional add-on
- **Compliance pack** — generated AML/CTF KYC pack templates +
  ATO portal letter responses + HMRC dispute letter templates
  as a $99 add-on
- **Real case-study customer** — once 5+ practices are using it,
  publish a "how a Brisbane bookkeeper saved 8 hours a week on
  source-doc chasing and onboarded 4 new monthly engagements"
  case study on the marketplace blog

## Pricing tier strategy reminder

The trades bundles (plumber, HVAC, builder) are $199. This is the
first $249 bundle in the house catalogue. Track:

- Conversion rate at $249 vs the trades' rate at $199 (sample size
  matters — give it 60 days)
- AOV impact (if Showcase upgrade attaches at higher rate, the bundle
  is "feeling" premium)
- Refund rate (target <5% — bookkeepers are detail-oriented; a refund
  is signal the bundle missed)
- Repeat purchases of other bundles (Stripe bundle, "AI for
  professional services" if it exists)

If the $249 holds with similar conversion to $199 trades, prep
$299 for a future "Accounting Practice Agent" (CPA / EA-focused
with full tax-return prep flow). The bookkeeper bundle is the
beachhead.
