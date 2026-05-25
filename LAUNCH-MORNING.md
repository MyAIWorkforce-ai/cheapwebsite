# Skillzy — Launch morning checklist

> Follow top to bottom. Don't skip the test steps — they're how you
> know it actually works before real creators arrive. ~45-60 min total.
> Tick each box as you go.

---

## PART 1 — New Skillzy Stripe account (~20 min)

You're separating Skillzy from My AI Workforce so the fee reads
"Skillzy", buyers' statements say Skillzy, and the books are clean.

### 1.1 Create the account
- [ ] Go to **dashboard.stripe.com** → account switcher (top-left) → **+ New account**
- [ ] Name it **Skillzy**, country Australia, your details
- [ ] Set the **public business name** to `Skillzy` (Settings → Business → Public details)

### 1.2 Get the API keys
- [ ] In the new Skillzy account → **Developers → API keys**
- [ ] Decide LIVE vs TEST. For a real launch use **LIVE** (toggle top-right). For a dry run first, use TEST and switch later.
- [ ] Copy **Secret key** (`sk_live_…`) and **Publishable key** (`pk_live_…`)

### 1.3 Enable Connect (Standard)
- [ ] Left sidebar → **Connect** → **Get started / Enable** (choose Platform/marketplace)
- [ ] Go to `dashboard.stripe.com/settings/connect/onboarding-options` → **OAuth** tab
- [ ] Toggle **Enable OAuth** ON
- [ ] Copy the **Client ID** (`ca_…`)
- [ ] Add **Redirect URI**: `https://skillzy.ai/api/stripe/connect/return` → Save

### 1.4 Register the webhook
- [ ] **Developers → Webhooks → Add endpoint**
- [ ] URL: `https://skillzy.ai/api/webhooks/stripe`
- [ ] Events: `payment_intent.succeeded`, `account.updated`, `charge.refunded`, `checkout.session.completed`
- [ ] Save → copy the **Signing secret** (`whsec_…`)

### 1.5 Swap the env vars in Vercel
Vercel → project → Settings → Environment Variables. Update these **four** (edit existing, paste new values from the Skillzy account):
- [ ] `STRIPE_SECRET_KEY` = `sk_live_…`
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_…`
- [ ] `STRIPE_CONNECT_CLIENT_ID` = `ca_…`
- [ ] `STRIPE_WEBHOOK_SECRET` = `whsec_…`
- [ ] All scoped **Production + Preview**; secret key + webhook secret = Sensitive ON

### 1.6 Redeploy
- [ ] Vercel → Deployments → top → ⋯ → **Redeploy** (or tell Claude to push a commit)

---

## PART 2 — Three quick settings (~5 min)

### 2.1 Instant signup (fixes the listing dead-end) 🔴
- [ ] Supabase → **Authentication → Providers → Email** → turn **OFF** "Confirm email" → Save

### 2.2 Verify DB columns
- [ ] Supabase → SQL Editor → run:
```sql
select column_name from information_schema.columns
where table_schema='public' and table_name='purchases'
and column_name in ('referrer_slug','referrer_channel','review_email_sent_at','review_followup_sent_at');
```
- [ ] If all 4 show → done. If fewer → paste + run `db/RECONCILE_PRODUCTION.sql`

### 2.2b Run the affiliate migration (activates Refer & earn)
- [ ] Supabase → SQL Editor → paste + run **`db/migrations/007-affiliate.sql`**
- [ ] This adds `profiles.referred_by/referred_at` + the
  `affiliate_earnings` table. Until it runs, the "Refer & earn" tab
  shows zeros and no referrals are tracked. Idempotent — safe to run.

### 2.3 (Optional, 15 min) Brand the Google sign-in screen
- [ ] Google Cloud Console (`skillzy-497006`) → OAuth consent screen → set App name "Skillzy", logo, support email, privacy/terms URLs. Makes the Google login read "Sign in to Skillzy".

---

## PART 3 — Test before anyone arrives (~10 min)

### Test A — List a skill (logged out)
- [ ] Open `/sell/new` in a fresh/incognito window (logged out)
- [ ] Build a listing → Publish
- [ ] Sign up (email+password OR Google) → should sign in **instantly**, no email wait
- [ ] Bounced back to `/sell/new` with your draft → Publish → listing goes **live**
- [ ] ✅ Pass = listing appears in the marketplace

### Test B — Buy + creator gets paid
- [ ] Creator → `/dashboard/payouts` → Connect Stripe → authorise their **own** account → shows "Live"
- [ ] From a different account, buy that listing (real card if live mode)
- [ ] Creator's **own** Stripe → click the payment → breakdown shows:
  - Payment amount (gross)
  - **Skillzy application fee** (your 20%)
  - Net amount (creator's 80%)
- [ ] ✅ Pass = fee now says "Skillzy", split is correct, money in creator's own account

### Test C — Quick smoke test
- [ ] Homepage loads, hamburger menu works
- [ ] Marketplace filters (niche/platform dropdowns) work
- [ ] A magic-link sign-in shows "Check your email" and the email arrives
- [ ] `/creator/<your-handle>` loads your live listing

---

## PART 4 — Soft launch (the right way)

Don't open to the whole world day one. Instead:

- [ ] Invite **20-50 creators you can actually talk to** (DM, existing audience)
- [ ] Watch the first listings + sales closely
- [ ] Fix anything they hit (Claude's on standby)

While they're listing, do the **scale-up** items so you're ready to market hard:
- [ ] Vercel **Hobby → Pro** (bandwidth + function timeout)
- [ ] Supabase **Free → Pro** (storage + DB)
- [ ] Resend **Free → paid** (email volume)
- [ ] Add **Sentry** (paste DSN into Vercel — code's already wired) so you see errors live

Once the soft-launch batch is smooth and plans are upgraded → **market to the world.**

---

## If anything fails a test
Screenshot it and send to Claude. Most likely culprits:
- "Connect Stripe" errors → the new account's OAuth toggle or redirect URI didn't save
- Signup still says "check inbox" → email confirmation didn't turn off (2.1)
- Fee still says "My AI Workforce" → you're testing on the old keys; confirm the new `sk_live_…` is in Vercel and you redeployed

---

## The one-line status
**Payments work. Listing works. Brand assets + content ready.** Tomorrow's Stripe swap + the 3 settings = ready for a real, controlled launch. Plan upgrades = ready for the world. You're at the finish line.
