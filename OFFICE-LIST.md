# Skillzy — Office list (manual tasks)

> Things only YOU can do. Code-side fixes are already pushed.
> Work top-to-bottom; the 🔴 items have real money / customer impact.

---

## 🔴 1. Fix the broken Stripe webhook (explains "money not showing for creators")

Stripe is currently trying to deliver events to `https://myaiworkforce.ai/api/webhooks/stripe` — wrong URL. 30 failed deliveries since 17 May. Will stop trying on 26 May.

**Impact:** every `account.updated` event is being lost, so creators who finish Stripe Connect onboarding never get their `stripe_payouts_enabled` flag flipped → their sales sit in your platform balance instead of going to them.

**Steps:**
1. Stripe Dashboard → **Developers → Webhooks**
2. Click the broken endpoint → **Edit** → change URL to `https://skillzy.ai/api/webhooks/stripe`
3. Make sure these events are subscribed: `payment_intent.succeeded`, `account.updated`, `charge.refunded`, `checkout.session.completed`
4. **Copy the new Signing secret** (`whsec_…`)
5. Vercel → Env Vars → edit `STRIPE_WEBHOOK_SECRET` → paste new value → Save
6. Trigger a fresh deploy (push any commit or click Redeploy)

**Then backfill the affected creator(s):**

```sql
-- Run in Supabase SQL Editor (one row per affected creator)
update profiles
set stripe_payouts_enabled = true
where handle = '<their-handle>';
```

Also check Stripe Payments → filter by Transfers → if any past sales should have transferred to a creator but didn't, you may owe them a manual transfer.

---

## 🔴 2. Run the Supabase migration

Until you do this, day-3 / day-7 review emails are silently failing and newsletter signups go nowhere (missing columns + missing `subscribers` table).

1. Supabase Dashboard → **SQL Editor → New query**
2. In the GitHub web UI, open `db/RECONCILE_PRODUCTION.sql` and copy the entire file
3. Paste into Supabase SQL Editor → click **Run**
4. Expect lots of `NOTICE` lines, no errors

It's idempotent — safe to re-run anytime.

---

## 🟠 3. Sign in with GitHub + Google (Gmail)

The buttons exist; the providers aren't enabled inside Supabase yet.

**GitHub OAuth App** (github.com/settings/developers → New OAuth App):
- Application name: `Skillzy`
- Homepage URL: `https://skillzy.ai`
- Authorization callback URL: `https://<your-supabase-project-ref>.supabase.co/auth/v1/callback`
  *(Find the project ref in Supabase URL or Settings → API → Project URL)*
- Click Register → copy **Client ID** + generate **Client Secret**

**Google OAuth credentials** (console.cloud.google.com → APIs & Services → Credentials → + Create credentials → OAuth client ID → Web application):
- Authorized JavaScript origins: `https://skillzy.ai`
- Authorized redirect URIs: `https://<your-supabase-project-ref>.supabase.co/auth/v1/callback`
- Copy Client ID + Client Secret

**Supabase Dashboard → Authentication → Providers:**
- GitHub → toggle ON → paste Client ID + Secret → Save
- Google → toggle ON → paste Client ID + Secret → Save

**Supabase Dashboard → Authentication → URL Configuration:**
- Site URL: `https://skillzy.ai`
- Redirect URLs (add both):
  - `https://skillzy.ai/auth/callback`
  - `https://www.skillzy.ai/auth/callback`

---

## 🟠 4b. Paste the Skillzy-branded auth emails into Supabase

The actual sign-up + magic-link emails Skillzy sends out today come from Supabase's default template — plain, no branding, easy to mistake for spam. I've written four Skillzy-branded HTML templates. You paste them in. ~5 min total.

### Step 1 — Open one of the HTML files I created

In your repo on GitHub (mobile or laptop):

1. Browse to the folder **`supabase/email-templates/`**
2. Click on **`confirm-signup.html`**
3. Click the **"Raw"** button (top-right of the file view) — this shows just the HTML text
4. **Select all** (Cmd-A or Ctrl-A) → **Copy** (Cmd-C or Ctrl-C)

### Step 2 — Paste it into Supabase

1. Open supabase.com → your project → **Authentication → Email Templates**
2. From the **dropdown at the top of the page**, pick **"Confirm signup"**
3. You'll see two boxes:
   - **Subject heading** — a one-line text box
   - **Message body (HTML)** — a big box with HTML in it
4. In **Subject heading**: clear it, type `Verify your Skillzy account`
5. In **Message body (HTML)**: clear ALL the existing default content, then **paste** what you copied from GitHub
6. Click **Save changes**

### Step 3 — Repeat for the other 3

Same pattern. Use this table:

| Supabase dropdown picks | File to copy from GitHub | Subject heading to type |
|---|---|---|
| Confirm signup | `supabase/email-templates/confirm-signup.html` | `Verify your Skillzy account` |
| Magic Link | `supabase/email-templates/magic-link.html` | `Your Skillzy sign-in link` |
| Reset Password | `supabase/email-templates/reset-password.html` | `Reset your Skillzy password` |
| Change Email Address | `supabase/email-templates/change-email.html` | `Confirm your new Skillzy email` |

### Step 4 — Test

Sign up with a **throwaway email** on skillzy.ai. The email you receive should look Skillzy-branded (gold button, cream background, "Skillzy" wordmark, big serif headline like *"Almost in. Verify."*) instead of the default plain Supabase one.

If anything looks broken in Gmail or Apple Mail, tell me what you saw and I'll fix it.

---

## 🟠 4. Resend domain verification (your test emails are going to spam)

Right now `EMAIL_FROM=hi@skillzy.ai` but Resend hasn't verified you own `skillzy.ai`, so mail providers (Gmail, Outlook) flag your emails as suspicious and send them to spam.

**Steps:**
1. Resend Dashboard → **Domains** → Add Domain → `skillzy.ai`
2. Resend gives you DNS records to add (SPF TXT, DKIM CNAMEs, optional DMARC)
3. Add those records at your DNS host (wherever skillzy.ai is registered — Cloudflare? GoDaddy?)
4. Back in Resend → click **Verify** until all records show ✓
5. After verification, your buyer/seller/review emails will land in inboxes, not spam

---

## 🟡 5. SEO indexing — get Skillzy into Google + Bing

Code-side SEO is solid (sitemap, robots, JSON-LD on listings, canonicals, weekly health-check cron). What's left is operational: tell search engines you exist.

### 5a. Google Search Console (most important)

1. Go to **search.google.com/search-console** → **Add Property** → enter `https://skillzy.ai` (use the "URL prefix" type)
2. Verify ownership via DNS TXT record (recommended) or HTML tag — Google will give you instructions
3. After verified, left sidebar → **Sitemaps** → submit `https://skillzy.ai/sitemap.xml`
4. (Optional) Add `https://www.skillzy.ai` as a second property the same way — useful for tracking redirected traffic
5. Use **URL Inspection** (top search bar) on a few key pages and click **Request indexing** to nudge them: `/`, `/marketplace`, `/sell`, a couple of high-priority `/for/<niche>` pages
6. Indexing takes anywhere from a few hours to ~2 weeks. Check the **Coverage** report after ~3 days to confirm pages are getting indexed

### 5b. Bing Webmaster Tools (covers Bing + DuckDuckGo + ChatGPT search)

1. Go to **bing.com/webmasters** → sign in → **Add a site** → `https://skillzy.ai`
2. Easiest: import from Google Search Console (Bing offers this on signup — one click)
3. Submit the sitemap manually if it didn't auto-pull
4. Use **URL Submission** to nudge a handful of pages — Bing lets you submit up to 10,000 URLs/day

### 5c. (Optional) IndexNow — fastest indexing for Bing/Yandex

IndexNow lets you ping search engines instantly when a new listing publishes. Already-half-built into Bing Webmaster Tools — they'll show a setup hint. If you want this wired into Skillzy's publish action so new listings get indexed within seconds, tell me and I'll ship the integration (~30 min of code).

### 5d. Verify www.skillzy.ai 301-redirects to apex

The sitemap comment notes: *"www.skillzy.ai must 301 → apex at the Vercel domain layer."* If www isn't already redirecting to the bare domain, both versions can show up in search results competing with each other (the "duplicate content" trap).

1. Vercel → project → **Settings → Domains**
2. Make sure `www.skillzy.ai` is set to **Redirect to** `skillzy.ai` (with 308 or 301), not "Connect to Production"
3. Test: open `https://www.skillzy.ai` in incognito → URL bar should rewrite to `https://skillzy.ai`

### 5e. Open Graph / social cards

Already wired: `app/opengraph-image.tsx` generates a Skillzy-branded OG image dynamically. Test it once: paste `https://skillzy.ai` into **opengraph.xyz** or **cards-dev.twitter.com/validator** and confirm the preview looks right.

---

## 🟡 6. Vercel domain housekeeping

In Vercel → your project → **Settings → Domains**:

- `www.skillzy.ai` — currently "Verification Needed". Click Refresh / add the DNS record Vercel asks for. (Optional but tidy — apex `skillzy.ai` already works.)
- `skillzy.ai` — "DNS Change Recommended". Click Refresh / apply the suggested DNS update.

---

## ✅ 7. Private GitHub repo import — SHIPPED (a5d0cf7)

Now wired. Creators who sign in with GitHub can import from public AND private repos.

**Heads up:** anyone who signed in with GitHub BEFORE this change needs to sign out and sign in again to grant the new `repo` scope.

---

## ✅ What's already fixed in code (no action needed)

- Homepage hamburger menu top-right
- Cron auth fails closed if `CRON_SECRET` is ever blank
- AI draft endpoint now requires sign-in (closes the cost-bomb hole)

---

## 🤔 Anything else worth flagging

- After fixing the Stripe webhook, watch the next few real sales: confirm purchases appear in `dashboard`, the buyer gets an email, the seller gets an email, and `stripe_payouts_enabled` flips for newly-onboarded creators.
- File upload security: today bundles are size-checked but not content-type-checked. A malicious creator could upload an `.exe` renamed to `.pdf`. Low risk while you know every creator personally; flag if you go public.
- Old failed deliveries on the broken webhook: Stripe lets you "Resend" individual past events from the dashboard — useful for backfilling lost `account.updated` events after you fix the URL.
