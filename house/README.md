# Skillzy House listings

Files for the listings published under the `@skillzy-house` creator
account on skillzy.ai. Each subfolder is a complete bundle, ready
to upload via `/sell/new`.

## Listings ready to publish

| Folder | Listing title | Price | Status |
|---|---|---|---|
| `site-builder/` | Site + Stripe, end to end. | $199 | Ready — see `PUBLISH.md` |
| `stripe-setup/` | Stripe Setup, end to end. | $129 | Ready — see `PUBLISH.md` |
| `real-estate-agent/` | Real Estate Agent, end to end. | $199 | Ready — see `PUBLISH.md` |

## How to publish each

Open the folder, read `PUBLISH.md` inside. It has:
- Exactly which files to drag into the `/sell/new` form
- The polished title / tagline / description / what-you-get copy
- The right Type / Niche / Platforms / Price values
- A smoke-test to run after publishing

## Pre-bundled ZIPs (optional)

If you'd rather download one file per listing instead of cloning the
repo, the ZIPs in `_bundles/` contain everything you need:

- `_bundles/site-builder.zip` — drop into `/sell/new` after unzipping
- `_bundles/stripe-setup.zip` — same

These contain ONLY the buyer-facing files. They do NOT contain
`LISTING_COPY.md` or `PUBLISH.md` — those are internal-only and stay
in the source folders.

## Future listings

When we build more — add a sibling folder + a `PUBLISH.md`. The
pattern is consistent:

```
house/<listing-slug>/
├── README.md           ← what's in this bundle (ships to buyer)
├── SETUP.md            ← 5-min setup (ships to buyer)
├── MASTER_PROMPT.md    ← orchestrator (ships to buyer)
├── skills/             ← SKILL.md files (ship to buyer)
├── LISTING_COPY.md     ← internal: listing form copy
└── PUBLISH.md          ← internal: step-by-step to publish
```

## Ideas for next listings

- Lead Capture + Triage (tradies / real estate / coaches)
- Customer Support Desk (e-commerce / services)
- Bookkeeper-BAS prep (AU/NZ bookkeepers, sole traders)
- AI Email Triage (universal)
- Review Reply (Google / Yelp / Trustpilot)
