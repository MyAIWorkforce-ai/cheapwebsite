# Skillzy — Office list (manual tasks)

> **Status update — Thu 21 May 2026.** Most items shipped. Outstanding work flagged ⏳ at the bottom.

---

## 🟣 0. Rename the GitHub repo: `cheapwebsite` → `skillzy` — ⏳ **NOT DONE**

Left for later. 2-min job, no urgency. Steps:

1. Open repo: **github.com/MyAIWorkforce-ai/cheapwebsite**
2. **Settings** (top tab) → scroll to **Repository name**
3. Change `cheapwebsite` → `skillzy`
4. Click **Rename**

**Note:** Vercel auto-updates the GitHub link on rename — no redeploy needed. Old `github.com/MyAIWorkforce-ai/cheapwebsite/...` URLs auto-redirect indefinitely.

---

## 🔴 1. Stripe webhook — ✅ **DONE**

- All 4 events subscribed on `skillzy.ai/api/webhooks/stripe`: `payment_intent.succeeded`, `account.updated`, `charge.refunded`, `checkout.session.completed`.
- Was missing `payment_intent.succeeded` — added.
- Signing secret unchanged → no env var update needed.

**Important correction to original brief:** The "broken webhook" referenced (30 failed deliveries to `myaiworkforce.ai/api/webhooks/stripe`) was for a **separate business**, not Skillzy. Skillzy's endpoint had 0% error rate the whole time. **No backfill SQL needed** — no creators were affected.

---

## 🔴 2. Supabase migration — ✅ **DONE (subscribers); ⚠ may need more)**

- Ran `db/migrations/001-subscribers.sql` (21 lines — creates `citext` extension + `public.subscribers` table + RLS policy for anonymous insert from footer newsletter form).
- Copied from GitHub raw view, pasted into Supabase SQL Editor, ran successfully.

**⚠ Possibly still outstanding — quick check:** The audit also flagged missing columns on `purchases`: `referrer_slug`, `referrer_channel`, `review_email_sent_at`, `review_followup_sent_at`. Those live in:

- `db/migrations/003-referrals.sql`
- `db/migrations/004-referral-channel.sql`
- `db/REVIEW_REQUESTS.sql`

If these were already run during the earlier session (the other Claude added referrer tracking + day-3/7 review cron, so they probably were), you're fine. **If unsure, the cleanest one-shot is to paste `db/RECONCILE_PRODUCTION.sql` into Supabase SQL Editor and Run — it's idempotent and reconciles all of them in one go.** Takes ~10 sec.

**Sanity check command (paste in Supabase SQL Editor, no risk):**

```sql
select column_name
from information_schema.columns
where table_schema = 'public'
  and table_name = 'purchases'
  and column_name in (
    'referrer_slug', 'referrer_channel',
    'review_email_sent_at', 'review_followup_sent_at'
  );
```

If you see all 4 column names listed, you're done. If you see fewer, run RECONCILE_PRODUCTION.

---

## 🟠 3. Sign in with GitHub + Google — ✅ **DONE**

**GitHub OAuth App:** Created at github.com/settings/developers.
- App name: Skillzy
- Homepage: `https://skillzy.ai`
- Callback: `https://pbcfhpemrrxpshxfhhad.supabase.co/auth/v1/callback`
- Client ID + Client Secret pasted into Supabase. Enabled + saved.

**Google OAuth:** Created **new** Google Cloud project `skillzy` (project ID `skillzy-497006`) under `myaiworkforce.ai` org.
- OAuth consent screen: External, published to production (basic scopes only, no verification required).
- Web client "Skillzy Web" with JS origin `https://skillzy.ai` + redirect URI = Supabase callback above.
- Both Client ID + Secret pasted into Supabase Google provider.

**Supabase URL Configuration:**
- Site URL: `https://skillzy.ai`
- Redirect URLs: both apex and `www` `/auth/callback` set.

**Gotcha noted:** Had to clear leftover "resend" placeholder text in both GitHub and Google provider fields in Supabase before saving — otherwise the save was rejected.

---

## 🟠 4. Resend domain verification — ✅ **DONE**

`skillzy.ai` was already verified May 18 via GoDaddy DNS records before this session started. Ready to send.

---

## 🟠 4b. Skillzy-branded auth email templates — ⏳ **DEFERRED — will do in code**

**Not done via Supabase paste.** Reason: 4 templates were drafted in chat (cream/gold Skillzy style — files at `supabase/email-templates/*.html` in the repo), but Toby decided to redo them in code so they match the broader website theme rather than the standalone template draft. Templates currently live as drafts only — Supabase is still using its default templates for now.

---

## 🟡 5. SEO indexing — ✅ **MOSTLY DONE**

### 5a. Google Search Console — ✅ DONE
- `https://skillzy.ai` verified via **Domain name provider** method (TXT record at GoDaddy DNS).
- Sitemap `/sitemap.xml` submitted.
- **Note:** First crawl returned "Couldn't fetch" status — sitemap itself confirmed working at `https://skillzy.ai/sitemap.xml` (contains `/`, `/marketplace`, `/sell`, `/about`, `/how-it-works`, `/blog`, `/dispatch`, `/help`). Expected to self-resolve on next crawl.

### 5b. Bing Webmaster Tools — ✅ DONE
- Imported from Google Search Console (one-click).

### 5c. IndexNow — ⏳ NOT DONE (optional, can revisit)

### 5d. www → apex redirect — ✅ DONE
- `www.skillzy.ai` redirects to `skillzy.ai` via **307** (308 wasn't offered in Vercel dropdown). Confirmed working in incognito.

### 5e. Open Graph / social cards — ⏳ NOT TESTED (deferred)

---

## 🟡 6. Vercel domain housekeeping — ⏳ **PARTIAL**

**Done:**
- Deleted obsolete `skillzy` project (skillzy-ashen.vercel.app, purple "Give your agent skills" build) from **My AI Workforce** Pro account.
- Verified `skillzy-navy` and `skillzy` (beige) projects in Hobby account hold only their default `.vercel.app` domains — not interfering with `skillzy.ai`.
- Production deployment confirmed live at `skillzy.ai`, serving correct homepage ("Drop it in. Your agent just got smarter.") from `skillzyai` project in Hobby account.

**Outstanding (cosmetic, deferred):**
- `www.skillzy.ai` still shows "Verification Needed" warning. Redirect to apex via 307 works fine — site is live, this is a cosmetic Vercel warning only.
- To clear fully: add TXT record to GoDaddy DNS:
  - Name: `_vercel`
  - Value: `vc-domain-verify=www.skillzy.ai,15f0208a6f09f86848e9`
- 308 redirect (preferred for SEO over 307) not offered in current Vercel dropdown.

### 6b. Migrate `skillzyai` from Hobby → My AI Workforce Pro plan — ⏳ **DEFERRED**

30–45 min job. Vercel has no "move project" button — would require recreating in Pro account, reconnecting GitHub repo, copying all env vars (Stripe webhook secret, Supabase keys, etc.), then removing from Hobby. Risk of brief downtime. **Defer unless hitting Hobby plan limits.**

---

## ✅ 7. Private GitHub repo import — SHIPPED (a5d0cf7)

No action needed. Heads up: users who signed in with GitHub before that commit need to sign out + back in to grant the new `repo` scope.

---

## 📌 Key account references (for future sessions)

- **Repo:** `github.com/MyAIWorkforce-ai/cheapwebsite` (rename to `skillzy` still pending — see item #0)
- **Supabase project ref:** `pbcfhpemrrxpshxfhhad` (Singapore region, ap-southeast-1)
- **Supabase auth callback:** `https://pbcfhpemrrxpshxfhhad.supabase.co/auth/v1/callback`
- **Vercel accounts:**
  - "Toby Banks' projects" (Hobby) → contains current working `skillzyai` project
  - "My AI Workforce" (Pro) → currently empty of Skillzy projects (old one deleted)
- **DNS host:** GoDaddy
- **Resend:** `skillzy.ai` verified May 18, region us-east-1
- **Google Cloud project:** `skillzy-497006`

---

## ⏳ Summary of outstanding items

1. **#0** — Rename GitHub repo `cheapwebsite` → `skillzy` (2 min, no urgency)
2. **#2 sanity check** — confirm `purchases` table has the 4 referrer/review columns; run RECONCILE_PRODUCTION if not
3. **#4b** — Build branded Supabase auth email templates in code (to match site theme)
4. **#6** — Clear `www.skillzy.ai` verification warning by adding TXT record to GoDaddy (cosmetic only)
5. **#6b** — Migrate `skillzyai` from Hobby → Pro plan (only if hitting limits)
6. **#5c** — IndexNow integration (optional)
7. **#5e** — OG card visual test via opengraph.xyz (optional)

**Everything else: shipped. Site is live, payments work, auth works, emails verified, SEO submitted.**
