# Skillzy — Ads Tracking Setup Runbook (Google + Meta)

*Operational runbook. Written for a Skillzy ops bot (or a human doing
it manually) to execute end-to-end. Covers Google Analytics 4,
Google Ads, and Meta (Facebook / Instagram) Pixel. Every step has a
clear outcome you can verify before moving on.*

**Last updated: 2026-11-15**

---

## What this gets us

- **Google Analytics 4** — traffic + events on skillzy.ai
- **Google Ads conversion tracking** — 5 goals (purchase, listing
  published, Grok Bot template download, Grok Bot browse click,
  Grok Bot sell click)
- **Meta Pixel** — matching events on Facebook + Instagram so
  campaigns on both Meta Ads Manager and Google Ads optimise
  against the same goal conversions
- Everything **ENV-driven** — zero code changes needed after this
  runbook is executed

## What's already done (don't redo)

The code side is live on the deployed branch
(`claude/build-skillzy-website-MIbCF`). Specifically:

- `<GoogleTags />` component (GA4 + Google Ads) mounted in root layout
- `<MetaPixel />` component mounted in root layout, auto-fires
  PageView on every route change
- `track.*` helpers fire BOTH Google events AND Meta events in one
  call. Meta uses Facebook's standard event names (`Purchase`, `Lead`,
  `CompleteRegistration`, `ViewContent`, `AddToCart`,
  `InitiateCheckout`, `Subscribe`) so Ads Manager can optimise
  against them out of the box
- Conversion fire-points live on:
  - `/order/success` (purchase complete)
  - `/sell/new/done` (listing published)
  - `/grok-bots` hero (Browse + Sell CTAs)
  - `/grok-bots` creator-section (Template download + Guide + Publish)
  - `/sell/new` (Template download CTA — fires on click)

## What the bot will do

**Three dashboards, 8 env vars, one redeploy. ~35 minutes total.**

| Step | What | Where | Time |
|---|---|---|---|
| 1 | Create GA4 property, get Measurement ID | analytics.google.com | 5 min |
| 2 | Create Google Ads account | ads.google.com | 5 min |
| 3 | Create 5 Google Ads conversion actions, note each label | ads.google.com | 10 min |
| 4 | Create Meta Pixel, get Pixel ID | business.facebook.com | 5 min |
| 5 | Set up Meta standard event optimisation (Purchase, Lead) | business.facebook.com | 5 min |
| 6 | Add 8 env vars in Vercel | vercel.com | 3 min |
| 7 | Redeploy + verify (Chrome Tag Assistant + Meta Pixel Helper) | Vercel + Chrome | 2 min |

---

## Pre-flight

Toby needs to sign in to each of these — the bot cannot create
accounts under his identity. Either Toby shares screen while the bot
operates, or Toby signs in then hands the bot over.

- **Google account**: `hi@skillzy.ai` (or whichever Google account
  owns the Skillzy GA/Ads setup)
- **Meta Business account**: whichever Meta/Facebook account owns the
  `skillzyai` Facebook Page. If no Business account exists yet, bot
  creates one in step 4 before the pixel.
- **Vercel account**: the one that owns project `skillzyai`
- **Browser**: Chrome (needed for Tag Assistant + Meta Pixel Helper)

---

## Step 1 — Google Analytics 4 (5 min)

1. Open <https://analytics.google.com>. Sign in.
2. If no GA4 property exists for Skillzy:
   a. **Admin** (gear icon, bottom left) → **+ Create → Property**
   b. Property name: `Skillzy`
   c. Reporting time zone: `(GMT+10:00) Australian Eastern Time`
   d. Currency: `Australian Dollar (AUD)`
   e. Next → Business details: *Small business*, *Online business*
   f. Business objectives: tick *Generate leads*, *Drive online sales*,
      *Examine user behaviour*
   g. Create → Accept T&C (Australia region)
3. On the "Choose a platform" screen → **Web**.
   a. Website URL: `https://skillzy.ai`
   b. Stream name: `Skillzy production`
   c. **Enable enhanced measurement** (left ON)
   d. Create stream
4. **Copy the Measurement ID**. Top of the Web Stream Details page.
   Format: `G-XXXXXXXXXX`.

**Verify:** The Measurement ID starts with `G-` and is 10–12 chars.

**Save as:** `GA4_MEASUREMENT_ID`

---

## Step 2 — Google Ads account (5 min)

Skip this entire step if a Google Ads account for Skillzy already
exists — grab the Customer ID from the top-right of Ads dashboard
(format: `123-456-7890`).

1. Open <https://ads.google.com>. Sign in with the same Google
   account used in Step 1.
2. If prompted for "campaign-first" setup, click **Switch to Expert
   Mode** at the bottom. Do NOT create a campaign yet — defer until
   after this runbook.
3. **Create account without a campaign** → fill in:
   a. Billing country: `Australia`
   b. Time zone: `(GMT+10:00) Australian Eastern Time`
   c. Currency: `AUD`
   d. Submit.
4. Top-right of the dashboard — note the **Customer ID**
   (format: `123-456-7890`).
5. Tag format you need: prefix `AW-`, no dashes.
   E.g. for `123-456-7890` → `AW-1234567890`.

**Verify:** Tag starts with `AW-` and is 10 digits (no dashes).

**Save as:** `GOOGLE_ADS_ID`

**Do NOT add a payment method yet.** Conversion tracking works
without billing. Billing only needed to run ads.

---

## Step 3 — 5 Google Ads conversion actions (10 min)

Left sidebar → **Goals → Conversions → Summary** →
**+ New conversion action → Website**.

For each of the 5 below:

- Click **+ New conversion action → Website**
- Click **Add conversion action manually**
- Fill fields per the table
- Click **Save and continue**
- On "Tag setup" → **Use Google tag** → **Install the tag yourself**
- Expand **Event snippet** → copy the `send_to` value
  (e.g. `AW-1234567890/AbCdEfGhIjK`) — save the part AFTER the `/`
- Click **Done**

### The 5 actions

| # | Name | Category | Value | Count | Window | Save label as |
|---|---|---|---|---|---|---|
| 1 | `Skillzy Purchase` | Purchase | Use different values | One | 30 days | `ADS_LABEL_PURCHASE` |
| 2 | `Skillzy Listing Published` | Sign-up | Don't use a value | One | 30 days | `ADS_LABEL_LISTING_PUBLISHED` |
| 3 | `Skillzy Grok Bot Template Downloaded` | Lead | Don't use a value | Every | 30 days | `ADS_LABEL_GROK_BOT_TEMPLATE` |
| 4 | `Skillzy Grok Bot Browse Click` | Page view | Don't use a value | Every | 30 days | `ADS_LABEL_GROK_BOT_BROWSE` |
| 5 | `Skillzy Grok Bot Sell Click` | Page view | Don't use a value | Every | 30 days | `ADS_LABEL_GROK_BOT_SELL` |

**Verify:** Conversions summary page shows all 5 with status
"Unverified" (expected — will flip to "Recording conversions" once
real events fire post-deploy).

---

## Step 4 — Meta Pixel (5 min)

1. Open <https://business.facebook.com>. Sign in with the Meta/
   Facebook account that owns the `skillzyai` Facebook Page.
2. If no Business Portfolio exists yet:
   a. Top-right **Create Business Portfolio** → Business name:
      `Skillzy`, your name, business email: `hi@skillzy.ai`
   b. Submit → verify the email in your inbox before proceeding.
3. Left sidebar → **Data sources → Events Manager** →
   **Connect data → Web**.
4. **Meta Pixel** (not Conversions API — do that later if needed).
   Click **Next**.
5. Pixel name: `Skillzy Pixel` → website URL: `https://skillzy.ai`
   → **Create pixel**.
6. **Copy the Pixel ID** from the top of the Overview tab
   (format: 15–16 digits, e.g. `1234567890123456`).
7. When Meta asks "How do you want to install?" → pick **Install code
   manually** → **Continue** → close the setup dialog. Code already
   lives on skillzy.ai — the ID in env is all that's needed to
   activate it.

**Verify:** Pixel ID is 15–16 digits, all numeric.

**Save as:** `META_PIXEL_ID`

### Why no Conversions API (CAPI) yet

CAPI is Meta's server-side tracking — stronger signal, but needs a
long-lived access token stored as a Vercel secret + a server-side
endpoint the Pixel can post to. Overkill for current traffic volume.
Add later when you're spending $500+/mo on Meta ads and iOS
privacy-restriction signal loss starts to hurt. Flagged in the
backlog.

---

## Step 5 — Meta standard-event setup (5 min)

Still in Events Manager → the pixel you just made → **Overview** tab.

The code already fires these standard events at the right moments:
`PageView` (automatic on every route), `Purchase`,
`CompleteRegistration`, `Lead`, `ViewContent`, `AddToCart`,
`InitiateCheckout`, `Subscribe`. You don't configure them one by
one — Meta auto-detects them.

What the bot DOES need to do here:

1. Still in Events Manager, right sidebar → **Aggregated Event
   Measurement** (sometimes under **Settings → Event Configuration**
   depending on UI version).
2. Click **Configure Web Events** for the pixel.
3. Order these 4 events by business priority (top = most valuable):
   1. **Purchase** (highest value — someone bought a listing)
   2. **CompleteRegistration** (a seller published a listing)
   3. **Lead** (someone downloaded the Grok Bot template)
   4. **ViewContent** (someone viewed a listing — top-of-funnel)
4. Save.

This matters because iOS users on Meta's post-ATT setup only get
measurement signal on a limited number of events per domain, ranked
by this list.

**Verify:** The 4 events appear in the pixel's expected-events list
in priority order. (They'll show "Inactive" until the first event
fires live — expected.)

---

## Step 6 — Add 8 env vars in Vercel (3 min)

1. Open <https://vercel.com>. Sign in.
2. Open project `skillzyai`.
3. **Settings → Environment Variables**.
4. For each row below:
   a. Click **Add**
   b. Key: as shown
   c. Value: the string you saved from steps 1–4
   d. **Environment: tick BOTH `Production` AND `Preview`** (skillzy.ai
      serves from a Preview build — ticking only Production misses it)
   e. Click **Save**

### The 8 env vars

| # | Key | Value |
|---|---|---|
| 1 | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | the `G-...` from Step 1 |
| 2 | `NEXT_PUBLIC_GOOGLE_ADS_ID` | the `AW-...` from Step 2 |
| 3 | `NEXT_PUBLIC_ADS_LABEL_PURCHASE` | label 1 from Step 3 |
| 4 | `NEXT_PUBLIC_ADS_LABEL_LISTING_PUBLISHED` | label 2 from Step 3 |
| 5 | `NEXT_PUBLIC_ADS_LABEL_GROK_BOT_TEMPLATE` | label 3 from Step 3 |
| 6 | `NEXT_PUBLIC_ADS_LABEL_GROK_BOT_BROWSE` | label 4 from Step 3 |
| 7 | `NEXT_PUBLIC_ADS_LABEL_GROK_BOT_SELL` | label 5 from Step 3 |
| 8 | `NEXT_PUBLIC_META_PIXEL_ID` | the 15-16 digit Pixel ID from Step 4 |

**Verify:** All 8 show in the Environment Variables list, each
scoped to Production + Preview (two green badges per row).

### Security note for the bot

All 8 vars start with `NEXT_PUBLIC_` so they are public by design —
they ship to the browser. Google and Meta tag IDs are always
public, that's normal. Don't paste them into Slack, blog posts,
etc. — public ≠ casual.

---

## Step 7 — Redeploy and verify (2 min)

1. Vercel → project `skillzyai` → top nav **Deployments**.
2. Find the most recent deployment on branch
   `claude/build-skillzy-website-MIbCF` — at the top of the
   **Preview** section (NOT Production — live site is a Preview build).
3. `…` (three dots) → **Redeploy**.
4. Dialog: **Use existing Build Cache: ON** → **Redeploy**.
5. Wait ~90 seconds for green build.

### Verification — Chrome extensions

Install both:

- **Google Tag Assistant Legacy** — [Chrome Web Store](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
- **Meta Pixel Helper** — [Chrome Web Store](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)

Then:

1. Open <https://skillzy.ai/grok-bots> in Chrome.
2. Click **Google Tag Assistant** → **Enable** → reload. Should show
   two green tags: **Google Analytics 4** (`G-...`) and
   **Google Ads Conversion** (`AW-...`).
3. Click **Meta Pixel Helper**. Should show one green pixel: the
   `META_PIXEL_ID` you set, firing `PageView` + any custom events
   from the hub.
4. Click **"Browse Grok Bots"** on the page. Tag Assistant should
   log a new Google Ads `conversion` event with the browse label.
   Meta Pixel Helper should log a `GrokBotHubCta` event.
5. Click **"Download bundle template (.zip)"** from the hub's
   creator section. Tag Assistant logs the template conversion.
   Meta Pixel Helper logs a `Lead` event.

**If Tag Assistant shows zero Google tags:** env vars didn't land.
Confirm Environment = Production + Preview, redeploy.

**If Meta Pixel Helper shows "no pixel found":** `NEXT_PUBLIC_META_PIXEL_ID`
is missing/mis-scoped. Same fix.

**If Google tags fire but no conversion events on click:** one of
the 5 label env vars is missing. Tag Assistant tells you which.

**If Meta Pixel fires PageView but no custom events on click:** the
Meta pixel IS working but iOS ATT may be redacting. Open in a
Chrome incognito window on desktop — if it works there, that's the
expected restriction.

---

## After the runbook

1. **GA4 data** populates immediately — Reports → Realtime.
2. **Meta Pixel data** populates in Events Manager → Overview
   within ~10 minutes.
3. **Google Ads conversion data** takes 24–72 hours to show.
4. **Running your first campaigns:** separate decision per platform.
   Both need billing added (Toby's call) + a campaign + daily
   budget. Don't do this on Toby's behalf — he picks the budget.

Suggested first-campaign targets (for later):

| Platform | Objective | Landing page | Starter keywords / audiences |
|---|---|---|---|
| Google Ads — Search | Conversions (Grok Bot Browse Click) | `/grok-bots` | `grok bot marketplace`, `sell grok bot`, `custom grok bot`, `grok bot for [industry]` |
| Meta Ads — Advantage+ Shopping | Purchase | `/marketplace` | Lookalike of Purchase event (once ≥30 events collected) |
| Meta Ads — Traffic | Lead | `/grok-bots` | Interest targeting: AI, Grok, machine learning, SaaS founders, small business owners |

---

## Troubleshooting

**Google Ads asks you to create a campaign before letting you make
conversion actions.** Click **Switch to Expert Mode** at the bottom
of any guided-setup screen.

**"Your account isn't eligible" on Google Ads sign-up.** The Google
account might already have an Ads account under a different billing
country. Try another Google account Skillzy controls.

**Vercel flags env variable name as "reserved".** Only `NEXT_PUBLIC_`
prefix is reserved, and that's what we want. Double-check spelling
matches the table exactly (case-sensitive).

**GA4 Measurement ID starts with `UA-` not `G-`.** You're on an old
Universal Analytics property. UA is deprecated. Create a new GA4
property (step 1).

**Can't find the conversion label in Google Ads "Tag setup".** UI
occasionally renames it to "Install your event tag manually". The
format is always `'send_to': 'AW-XXXXXXXXXX/AbCdEfGhIjK'` — the
label is the part after the `/`.

**Meta Business Portfolio sign-up loops back.** Meta sometimes
requires you to verify your business email AND verify a Facebook
account before letting you into Events Manager. Complete both,
then retry.

**Meta Pixel Helper shows "Multiple pixels detected".** You have
more than one pixel installed — check for any legacy Pixel tag
embedded in the site (shouldn't be — our only pixel install lives
in `components/MetaPixel.tsx`). If this happens, escalate to Toby.

---

## When the bot is done

Reply with:

- Confirmation each step completed
- The `G-...` Measurement ID (for the record, not secret)
- The `AW-...` Account ID (for the record, not secret)
- The Meta Pixel ID (15-16 digits)
- Screenshots: Tag Assistant on `/grok-bots` showing both Google
  tags green + a successful conversion fire on button click; Meta
  Pixel Helper showing the pixel green + `Lead` event firing on
  template download.

Toby then decides on campaign budget + launch, per platform.

---

*For Toby: this doc lives at `GA-ADS-SETUP-RUNBOOK.md` in the repo
root. If the bot hits a step it can't execute (billing, 2FA on your
Google or Meta account, ambiguity in the UI), it pauses and
escalates to you rather than guessing.*
