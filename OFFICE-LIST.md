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

## 🟠 4. Resend domain verification (your test emails are going to spam)

Right now `EMAIL_FROM=hi@skillzy.ai` but Resend hasn't verified you own `skillzy.ai`, so mail providers (Gmail, Outlook) flag your emails as suspicious and send them to spam.

**Steps:**
1. Resend Dashboard → **Domains** → Add Domain → `skillzy.ai`
2. Resend gives you DNS records to add (SPF TXT, DKIM CNAMEs, optional DMARC)
3. Add those records at your DNS host (wherever skillzy.ai is registered — Cloudflare? GoDaddy?)
4. Back in Resend → click **Verify** until all records show ✓
5. After verification, your buyer/seller/review emails will land in inboxes, not spam

---

## 🟡 5. Google Search Console (SEO)

1. search.google.com/search-console → **Add Property** → `https://skillzy.ai`
2. Verify via DNS TXT record (recommended) or HTML tag
3. After verified, go to **Sitemaps** → submit `https://skillzy.ai/sitemap.xml`
4. (Optional) Add `https://www.skillzy.ai` as a separate property

---

## 🟡 6. Vercel domain housekeeping

In Vercel → your project → **Settings → Domains**:

- `www.skillzy.ai` — currently "Verification Needed". Click Refresh / add the DNS record Vercel asks for. (Optional but tidy — apex `skillzy.ai` already works.)
- `skillzy.ai` — "DNS Change Recommended". Click Refresh / apply the suggested DNS update.

---

## 🟢 7. Future feature ask — private GitHub repo import

Today's GitHub import only works for **public** repos. Wiring private repos requires:

- (a) Using the signed-in user's GitHub OAuth session token (from Supabase) instead of the platform `GITHUB_TOKEN` PAT, OR
- (b) Asking the creator to install a GitHub App on their account so Skillzy gets per-repo access.

Option (a) is the lighter build (~1 evening of code). Tell me when you want this and I'll spec + ship.

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
