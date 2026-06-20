# PUBLISH — internal notes

How to attach this bundle to the existing live listing.

## The live listing

URL: `https://skillzy.ai/marketplace/93728244-37bb-4720-85a1-1d8cc1f7d80d`
(or the slug-based URL — both work)

Status: **Live, but empty.** Published with no attached files. Anyone
who buys today gets a download page with nothing in it.

## Recommended fix

1. **Sign in as @skillzy-house** (house@skillzy.ai login).
2. Go to **Dashboard → Listings → Social Media Manager Agent. Content
   end-to-end. → Edit.**
3. Scroll to the new **Attached files** section.
4. Use the **Add files** upload zone to attach this entire
   `social-media-manager/` folder. Either:
   - **Zip it first** (`social-media-manager.zip` — the bundle in
     `house/_bundles/`) and drop the single zip in. Buyers unzip
     and drop into their agent.
   - **Or upload every file individually** if you want the listing
     to preview them. Slower; same effect.

5. While you're on the edit page, **trim the niche field** down to
   3-5 niches — currently it has every niche, which dilutes SEO
   relevance and hits every `/for/[niche]` page noisily.
   Recommended trim: `commerce, hospitality, healthcare, coaches,
   tradies`.

6. **Save changes.**

## Then smoke-test

7. Open the marketplace page in an incognito tab. Confirm:
   - Niche tag chips show only the trimmed list (not 20+)
   - Card shows "All agents" instead of the 13-platform run-on
   - Detail page shows the new "Built for" chip group below
     "Compatible with"

8. Optionally buy your own listing with a $1 test (or use Stripe's
   real $0 test card if you've kept test mode enabled) end-to-end
   to confirm the bundle delivers properly.

## If you want to improve the copy

The current marketplace description matches what's in this
`LISTING_COPY.md`. The only **copy thing I'd tighten** is the
title — *"Social Media Manager Agent. Content end-to-end."* reads a bit
generic. Two stronger options:

- **"Social Media Manager Agent, end to end."** (matches the house brand
  pattern: Real Estate Agent, end to end. / Stripe Setup, end to end.)
- **"Social Manager. One agent, every platform."** (sharper hook)

If you change the title, also update the slug to match.

## Long-term: build the bundle out further

This bundle is **v1**. Future improvements when you have data:

- **Per-niche playbook overlays** — `/playbooks/commerce.md`,
  `/playbooks/hospitality.md` etc. — different examples and pillar
  templates per niche.
- **Trend file** — `/trends/weekly.md` updated each week with
  what's emerging in short-form (manual for now; eventually feed
  it from a scraper).
- **Visual style packs** — pre-tuned Nano Banana / Higgsfield
  prompts per brand archetype (clinical, premium, tradie, indie).

None of these block launch. v1 ships as-is.
