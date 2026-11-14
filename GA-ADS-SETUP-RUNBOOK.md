# Skillzy — GA4 + Google Ads Setup Runbook

*Operational runbook. Written for a Skillzy ops bot (or a human doing
it manually) to execute end-to-end. Every step has a clear outcome you
can verify before moving on.*

**Last updated: 2026-11-14**

---

## What this gets us

- **Google Analytics 4** tracking traffic + events on skillzy.ai
- **Google Ads conversion tracking** for 5 goals (purchase, listing
  published, Grok Bot template download, Grok Bot browse click, Grok
  Bot sell click)
- Everything **ENV-driven** — zero code changes needed after this
  runbook is executed

## What's already done (don't redo)

The code side is live on the deployed branch
(`claude/build-skillzy-website-MIbCF`, commit `ecc7a64`). Specifically:

- `<GoogleTags />` component mounted in root layout, reads env vars
- `track.*` helpers fire BOTH GA4 events AND Google Ads conversions
  automatically whenever the matching labels are set
- Conversion fire-points wired on:
  - `/order/success` (purchase complete)
  - `/sell/new/done` (listing published)
  - `/grok-bots` hero (Browse + Sell CTAs)
  - `/grok-bots` creator-section (Template download + Guide + Publish)
  - `/sell/new` (Template download CTA — fires on click)

## What you'll do

**Three dashboards, 7 env vars, one redeploy. ~25 minutes total.**

| Step | What | Where | Time |
|---|---|---|---|
| 1 | Create GA4 property, get Measurement ID | analytics.google.com | 5 min |
| 2 | Create Google Ads account | ads.google.com | 5 min |
| 3 | Create 5 conversion actions, note each label | ads.google.com | 10 min |
| 4 | Add 7 env vars in Vercel | vercel.com | 3 min |
| 5 | Redeploy + verify with Tag Assistant | Vercel + Chrome | 2 min |

---

## Pre-flight

You'll need Toby to sign in to each of these — the bot cannot create
accounts under his identity. Toby signs in, then hands over or shares
screen while the bot operates.

- Google account: `hi@skillzy.ai` (or whichever Google account owns
  the Skillzy GA/Ads setup)
- Vercel account: the one that owns project `skillzyai`
- Browser: Chrome (needed for Google Tag Assistant verification)

---

## Step 1 — Google Analytics 4 (5 min)

1. Open <https://analytics.google.com>. Sign in.
2. If no GA4 property exists for Skillzy:
   a. **Admin** (gear icon, bottom left) → **+ Create → Property**
   b. Property name: `Skillzy`
   c. Reporting time zone: `(GMT+10:00) Australian Eastern Time`
   d. Currency: `Australian Dollar (AUD)` (buyer-side spend is USD
      but Toby's reporting is easier in AUD)
   e. Next → Business details: *Small business*, *Online business*
   f. Business objectives: tick *Generate leads*, *Drive online sales*,
      *Examine user behaviour*
   g. Create → Accept T&C (Australia region)
3. On the "Choose a platform" screen → **Web**.
   a. Website URL: `https://skillzy.ai`
   b. Stream name: `Skillzy production`
   c. **Enable enhanced measurement** (left ON — tracks scrolls,
      outbound clicks, file downloads out of the box)
   d. Create stream
4. **Copy the Measurement ID**. It's at the top of the Web Stream
   Details page. Format: `G-XXXXXXXXXX`.

**Verify:** The Measurement ID starts with `G-` and is 10–12 chars.

**Save this value as:** `GA4_MEASUREMENT_ID` (we'll paste into Vercel
in step 4).

---

## Step 2 — Google Ads account (5 min)

Skip this entire step if a Google Ads account for Skillzy already
exists — just grab its account ID from the top-right of the Ads
dashboard (format: `123-456-7890` for display, `AW-1234567890` when
used as a tag).

1. Open <https://ads.google.com>. Sign in with the same Google
   account used in Step 1.
2. If prompted for a "campaign-first" setup, click **Switch to Expert
   Mode** at the bottom of the page. Do NOT create a campaign yet.
   Campaign setup requires Toby to pick a budget and will attempt to
   start spending — defer until after this runbook.
3. **Create account without a campaign** → fill in:
   a. Billing country: `Australia`
   b. Time zone: `(GMT+10:00) Australian Eastern Time`
   c. Currency: `AUD`
   d. Submit.
4. At the top-right of the dashboard, note the **Customer ID**
   (format: `123-456-7890`).
5. The Google Ads Tag format you need is this ID with `AW-` prefix
   and no dashes: e.g. for `123-456-7890` the tag value is
   `AW-1234567890`.

**Verify:** The tag value starts with `AW-` and is 10 digits (no
dashes).

**Save this value as:** `GOOGLE_ADS_ID`.

**Do NOT add a payment method yet.** Conversion tracking works
without billing — billing is only needed once you actually run ads.
Toby adds billing manually when ready to launch a campaign.

---

## Step 3 — Create 5 Google Ads conversion actions (10 min)

Still in Google Ads. Left sidebar → **Goals → Conversions → Summary**
→ **+ New conversion action → Website**.

For each of the 5 actions below:

- Click **+ New conversion action → Website**
- Click **Add conversion action manually** (not URL-based — the code
  already fires events, we just need the action created)
- Fill in the fields per the table below
- Click **Save and continue**
- On the "Tag setup" screen → **Use Google tag** → **Install the tag
  yourself**
- Expand **Event snippet** → copy the `send_to` value (looks like
  `AW-1234567890/AbCdEfGhIjK`) — the part AFTER the slash is the
  label we need (e.g. `AbCdEfGhIjK`). **Save that label.**
- Click **Done**
- Repeat for next action

### The 5 actions

| # | Name | Category | Value | Count | Click-through window | Save label as |
|---|---|---|---|---|---|---|
| 1 | `Skillzy Purchase` | Purchase | Use different values for each conversion | One | 30 days | `ADS_LABEL_PURCHASE` |
| 2 | `Skillzy Listing Published` | Sign-up | Don't use a value | One | 30 days | `ADS_LABEL_LISTING_PUBLISHED` |
| 3 | `Skillzy Grok Bot Template Downloaded` | Lead | Don't use a value | Every | 30 days | `ADS_LABEL_GROK_BOT_TEMPLATE` |
| 4 | `Skillzy Grok Bot Browse Click` | Page view | Don't use a value | Every | 30 days | `ADS_LABEL_GROK_BOT_BROWSE` |
| 5 | `Skillzy Grok Bot Sell Click` | Page view | Don't use a value | Every | 30 days | `ADS_LABEL_GROK_BOT_SELL` |

**Verify after all 5:** The Conversions summary page shows 5 actions,
all with status "Unverified" (that's expected — they'll flip to
"Recording conversions" once real events fire post-deploy).

**Save all 5 labels** — you'll have 5 strings of ~11 chars each.

---

## Step 4 — Add 7 env vars in Vercel (3 min)

1. Open <https://vercel.com>. Sign in.
2. Open project `skillzyai`.
3. **Settings → Environment Variables**.
4. For each row in the table below:
   a. Click **Add**
   b. Key: as shown in the table
   c. Value: the string you saved from step 1, 2, or 3
   d. **Environment: tick BOTH `Production` AND `Preview`** (skillzy.ai
      serves from a Preview build of `claude/build-skillzy-website-MIbCF`
      — if you only tick Production, nothing will reach the live site)
   e. Click **Save**

### The 7 env vars

| # | Key | Value (from steps above) |
|---|---|---|
| 1 | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | the `G-...` from Step 1 |
| 2 | `NEXT_PUBLIC_GOOGLE_ADS_ID` | the `AW-...` from Step 2 |
| 3 | `NEXT_PUBLIC_ADS_LABEL_PURCHASE` | label 1 from Step 3 |
| 4 | `NEXT_PUBLIC_ADS_LABEL_LISTING_PUBLISHED` | label 2 from Step 3 |
| 5 | `NEXT_PUBLIC_ADS_LABEL_GROK_BOT_TEMPLATE` | label 3 from Step 3 |
| 6 | `NEXT_PUBLIC_ADS_LABEL_GROK_BOT_BROWSE` | label 4 from Step 3 |
| 7 | `NEXT_PUBLIC_ADS_LABEL_GROK_BOT_SELL` | label 5 from Step 3 |

**Verify:** The Environment Variables page shows all 7 vars, each
scoped to both Production AND Preview (left column should show two
green badges per row).

### Security note for the bot

All 7 vars start with `NEXT_PUBLIC_` so they are public by design —
they ship to the browser. Google Analytics and Google Ads expect
public tag IDs, that's normal. Do NOT paste them into Slack, DMs,
blog posts etc — public doesn't mean casual.

---

## Step 5 — Redeploy and verify (2 min)

1. Still in Vercel, project `skillzyai`. Top nav → **Deployments**.
2. Find the most recent deployment on branch
   `claude/build-skillzy-website-MIbCF` — top of the list in the
   **Preview** section (NOT Production — the live site is a Preview
   build).
3. Click the `…` (three dots) → **Redeploy**.
4. In the dialog: **Use existing Build Cache: ON**, click
   **Redeploy**.
5. Wait ~90 seconds for the build to go green.

### Verification — do this in Chrome, not Safari

Install the **Google Tag Assistant Legacy** Chrome extension if not
already installed:
<https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk>

1. Open <https://skillzy.ai/grok-bots> in Chrome.
2. Click the Tag Assistant extension icon.
3. Click **Enable**, reload the page.
4. Click Tag Assistant again. You should see **two green tags**:
   - `Google Analytics 4` (your `G-...` ID)
   - `Google Ads Conversion` (your `AW-...` ID)
5. Click **"Browse Grok Bots"** on the page — Tag Assistant should
   log a new `conversion` event firing with the browse label.
6. Back on the hub, click **"Download bundle template (.zip)"** —
   you should see another `conversion` event with the template label.

**If Tag Assistant shows zero tags:** the env vars didn't land. Go
back to step 4 and confirm Environment = Production + Preview, then
redeploy.

**If Tag Assistant shows only GA4 and no Ads:** `NEXT_PUBLIC_GOOGLE_ADS_ID`
is missing or mis-scoped. Same fix.

**If the tags fire but no conversion events appear on click:** one
of the label env vars is missing. Tag Assistant tells you which
label was expected.

---

## After the runbook

This is all the setup. From here:

1. **GA4 data starts populating immediately** — traffic, pageviews,
   outbound clicks, scroll depth, file downloads (template zip is
   caught automatically as an enhanced-measurement file download).
   Realtime report under Reports → Realtime.
2. **Google Ads conversion data takes 24–72 hours** to stabilise and
   show in the Conversions dashboard.
3. **Running your first campaign:** separate decision. Needs billing
   added (Toby's call), a campaign created, keywords targeted
   (recommended starter: `grok bot marketplace`, `sell grok bot`,
   `custom grok bot`), and a daily budget. Don't do this step on
   Toby's behalf — he picks the budget.

---

## Troubleshooting the bot might hit

**Google Ads asks you to create a campaign before letting you make
conversion actions.** Click **Switch to Expert Mode** at the bottom
of any screen pushing you into guided setup. Expert Mode lets you
create conversion actions without any active campaign.

**"Your account isn't eligible" error on Google Ads sign-up.** The
Google account you're using might already have an Ads account under
a different billing country. Check <https://ads.google.com/home/tools/manager-accounts/>
or create the Ads account under a different Google account that
Skillzy controls.

**Vercel says the environment variable name is "reserved".** Only
`NEXT_PUBLIC_` prefix is reserved for Next.js public vars — which is
exactly what we want. If Vercel flags it, double-check the spelling
matches the table exactly (case-sensitive).

**GA4 Measurement ID starts with `UA-` not `G-`.** You're looking at
an old Universal Analytics property. UA is deprecated. Create a new
GA4 property (step 1).

**Can't find the conversion label on the "Tag setup" screen.** The
Ads UI occasionally renames this to "Install your event tag manually".
The format is always the same — a JavaScript snippet containing
`'send_to': 'AW-XXXXXXXXXX/AbCdEfGhIjK'` — the label is the part
after the `/`.

---

## When the bot is done

Reply with:

- Confirmation each step completed
- The `G-...` Measurement ID (for the record, not secret)
- The `AW-...` Account ID (for the record, not secret)
- A screenshot of Tag Assistant on `/grok-bots` showing both green
  tags + a successful conversion fire on button click

Toby can then decide on campaign budget + launch.

---

*For Toby: this doc lives at `GA-ADS-SETUP-RUNBOOK.md` in the repo
root. If the bot hits a step it can't execute (billing, 2FA on
Toby's Google account, ambiguity in the UI), it should pause and
escalate rather than guess.*
