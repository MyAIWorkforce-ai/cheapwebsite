# Skillzy embedded checkout — handoff

> Temporary coordination doc for the embedded-checkout cutover.
> **Delete this file once the "Outstanding" steps are done and verified.**

Branch: `claude/build-skillzy-website-MIbCF`

## Done (code, pushed)

- Checkout is embedded on the Skillzy page (Stripe Payment Element,
  Skillzy-themed) — no redirect to a Stripe-hosted page.
- PaymentIntent is created at submit time with the buyer email in
  metadata. No `receipt_email` is set, so Stripe never sends its
  account-branded receipt — Skillzy sends its own via Resend.
- Order fulfilment (record sale + send Skillzy email) runs on the
  post-payment return page, fully idempotent. **No Stripe webhook is
  required for checkout to work.** The webhook still works as an
  optional safety net if an endpoint is ever configured.
- Build passes. One shared Stripe account; My AI Workforce untouched.

## Go-live runbook (Vercel + Stripe logins — no Monty needed)

### Step 1 — How skillzy.ai is wired — ✅ VERIFIED 2026-05-18

Vercel project: **`cheapwebsite-preview`** (repo
`MyAIWorkforce-ai/cheapwebsite`). Domains tab shows:

- **`skillzy.ai`** (apex, the address buyers use) → pinned directly to
  branch **`claude/build-skillzy-website-MIbCF`**, blue tick / working.
  This deploys as a **Preview** deployment, NOT Production. Every push
  to that branch rebuilds it. This is why the live site already shows
  the checkout fix + latest content.
- `www.skillzy.ai` → assigned to Production (`main`), **"Verification
  Needed"** — not working. Minor follow-up (see Optional). Apex works.
- The project's Production branch is `main`, which does NOT have the
  checkout fix — irrelevant while skillzy.ai is pinned to the branch.

Implication: env vars must be scoped to **Preview** (or all), because
skillzy.ai runs as a Preview deployment. They are ("Production and
Preview"). **No action needed here.**

### Step 2 — Stripe keys, TEST first — ✅ DONE 2026-05-18

All required env vars already existed in the project, scoped
"Production and Preview" (correct for the branch-pinned domain).
`RESEND_API_KEY`, `EMAIL_FROM`, Supabase vars all present.

Discovered the values in `STRIPE_SECRET_KEY` /
`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` were **live** keys (so the earlier
bad purchase ran on real money). Swapped both to the shared account's
**test** keys (`sk_test_…` / `pk_test_…`) for the safe test run.
`NEXT_PUBLIC_SITE_URL` verified `https://skillzy.ai`.

`NEXT_PUBLIC_*` vars bake in at build time — a fresh build of the
branch is required after any key change (a normal cached "Redeploy"
will keep the old publishable key). Pushing any commit to the branch
triggers that fresh build.

### Step 3 — Test purchase

- On skillzy.ai, buy any listing with test card `4242 4242 4242 4242`,
  any future expiry, any CVC.
- Confirm: stay on Skillzy the whole time, **no "My AI Workforce"
  anywhere** in checkout or the confirmation email, success page shows,
  email arrives.

### Step 4 — Flip to live

- Stripe → Test mode **OFF** → API keys → reveal **live** keys
  (`sk_live_…`, `pk_live_…`).
- Update the same two Vercel env vars with the live keys → redeploy.
- Do one more real purchase (small) to confirm, then refund it in Stripe.

`STRIPE_WEBHOOK_SECRET` is **not required** — leave it unset. Do NOT
change account branding, disable Stripe emails, delete Payment Links,
or create a new Stripe account.

## Optional (later, nice-to-have)

- Add a webhook endpoint as a safety net (in case a buyer closes the
  tab before the return page loads): same Stripe account, URL
  `https://skillzy.ai/api/webhooks/stripe`, events
  `payment_intent.succeeded`, then set `STRIPE_WEBHOOK_SECRET`.
- Bank/card statement line still uses the shared account's
  statement-descriptor prefix (account-level, not code-controllable).
  In-app + email are 100% Skillzy. Set the account descriptor to
  something brand-neutral if it matters. Per-product suffix
  (`SKILLZY-…`) is already applied by the code.

## Verify (after the 2 steps above)

- Live test purchase on skillzy.ai. Confirm: buyer never leaves Skillzy,
  no "My AI Workforce" anywhere in checkout or email, sale recorded,
  Skillzy confirmation email received.
- Must be a live re-test (no network/Stripe in the build environment).

## Current status — 2026-05-18 (supersedes the runbook above)

skillzy.ai is the apex domain, pinned to branch
`claude/build-skillzy-website-MIbCF` (Preview deploy) on Vercel project
`cheapwebsite-preview`. Stripe is on **TEST** keys (not live yet).

### Verified working

- Buyer checkout: embedded, 100% Skillzy-branded, no "My AI Workforce".
- Purchase confirmation email via Resend (skillzy.ai verified;
  `EMAIL_FROM=hi@skillzy.ai`). Copy is "You're all set."
- No-login download/delivery page (re-verifies the PaymentIntent;
  regenerates signed links each visit).
- Sign-in: Supabase custom SMTP → Resend. Magic link delivers, link
  logs in and lands on the dashboard. Prominent "check your email"
  confirmation + OAuth error surfacing shipped.

### Outstanding (ordered)

1. **Demo catalog has no real data/files.** Seed listings (catalog.ts /
   catalog-seed.ts) aren't DB rows, so buying one: records no purchase,
   shows nothing on the dashboard, delivers no file, and (because the
   idempotency guard is the DB insert) re-sends the email on each
   success-page load. DECISION NEEDED: make seed listings non-buyable /
   attach placeholder files / remove them / accept risk.
2. **Real-listing delivery untested.** Create one real listing with an
   uploaded file via /sell/new (now possible — auth works), buy it as a
   guest, confirm the file actually downloads + dashboard shows it.
3. **Seller Stripe Connect / payouts not enabled.** /dashboard/payouts
   "Connect Stripe" fails — Stripe Connect must be enabled and the
   platform profile completed in the Stripe dashboard (and on live keys
   for real payouts). Route now fails gracefully with the real reason.
4. **OAuth providers** (Google/GitHub) not configured in Supabase →
   those buttons error (now surfaced). Magic link works without them.
5. **Polish:** Supabase auth email templates are plain defaults — brand
   them in Supabase → Auth → Email Templates. Sign-in form now shows a
   clear post-submit confirmation.
6. **Flip Stripe to live keys** — only after #1 and #2 are settled.

## Public-launch readiness — full audit (2026-05-18)

Four parallel audits (buyer pipeline, seller/payouts, SEO, security/legal)
were run. Authoritative plan below.

### THE linchpin — apply the DB schema
The live Supabase DB is missing columns/migrations the code expects
(root cause of: purchases not recording, webhook failing, lost video
fields). **Action: paste `db/RECONCILE_PRODUCTION.sql` into the Supabase
SQL editor and Run.** It is fully idempotent (safe on a
partially-applied DB). Also ensure a PRIVATE Storage bucket named
`skillzy-products` exists.

### Shipped in this pass (code, pushed)
- Non-enumerable downloads (ownership proof required).
- buyer_email normalised (no more stranded guest purchases).
- Duplicate confirmation emails fixed (email only after a recorded sale).
- DB-backed marketplace + checkout (real listings sell & deliver);
  listings publish live instantly.
- Demo/seed listings non-purchasable showcase.
- Listing edit fixed (lookup by slug); demo-draft text can't be
  published; truthful seller copy; constant-time admin token.

### Outstanding — only you can do (config/dashboards/DB/legal)

> **OFFICE LIST — Stripe account settings (do these in the Stripe dashboard).**
> The code now forces `SKILLZY <product>` on the card statement
> (commit `b9e0c60`), but the *definitive* fix is account-level —
> until these two are done, buyers' card statements / Stripe emails
> can still surface "MY AI WORKFORCE" and your personal mobile:
>
> 1. **Statement descriptor → `SKILLZY`.** Stripe → Settings →
>    Business / Public details (Customer support). Set the account
>    statement descriptor to `SKILLZY`.
> 2. **Remove personal mobile from support phone.** Same area —
>    delete your personal number; replace with `hi@skillzy.ai` (or a
>    support URL) or leave blank.

1. Apply `db/RECONCILE_PRODUCTION.sql` (linchpin).
2. Stripe Connect: enable Connect + complete platform profile + flip
   to LIVE keys, so creators actually get paid. Until then a sale
   keeps 100% on the platform with no creator transfer.
3. Rotate all secrets (service-role, Stripe, webhook, Resend) — see
   `.env.local` header.
4. Email deliverability (stop spam-foldering): add a **DMARC** DNS
   record at GoDaddy — `_dmarc.skillzy.ai` TXT
   `v=DMARC1; p=none; rua=mailto:hi@skillzy.ai`. Confirm Resend shows
   DKIM + SPF + return-path all Verified for skillzy.ai. New-domain
   reputation needs warmup (low volume, zero bounces, recipients mark
   "not spam"). Consider a dedicated sending subdomain later.
5. `ANTHROPIC_API_KEY` (real listing drafts), `ADMIN_EMAILS`,
   `CRON_SECRET` in Vercel.
6. Moderation decision: with instant-publish + no malware scanning,
   either add scanning, restore a review gate, or accept the risk
   (false "scanned/reviewed" claims already removed from copy).
7. Real legal pages: Terms/Privacy/refund/DMCA (currently placeholders)
   + acceptance at signup/checkout.
8. Optional: Google/GitHub OAuth providers; brand Supabase auth emails.

### Code — DONE this session (pushed, full-build verified)
- ✅ SEO: `slug` on Product; async sitemap with live DB listings by
  slug; demo listings `noindex` + out of sitemap; correct
  canonical/JSON-LD; no invalid free/demo Offer; ISR (product 5 min,
  sitemap hourly).
- ✅ Free listings now deliver: £0 purchase recorded + token-gated
  no-login download page + email; demo free items just get the
  newsletter signup (no false promise).
- ✅ DB reconcile SQL applied (prod schema now matches code; unique
  index on `purchases.stripe_payment_intent_id` added).

### Outstanding — code (next passes, optional / post-decision)
- Restore richer purchase columns now the schema exists
  (currency/fee/payout/referrer) so referral attribution + exact
  payout are tracked again. Low-risk; recommended next.
- Rate-limiting on AI-draft / checkout / signup — needs Vercel KV /
  Upstash provisioned (your infra decision) before it can be wired.
- Refund should reverse the Connect transfer + revoke download —
  depends on Connect being live; post-launch hardening.
- Moderation (file scanning / review gate) — awaiting your decision.

## Demo listings — decision update (2026-05-18, supersedes earlier "non-purchasable")

Earlier passes left demo/seed listings as a static "not for sale"
showcase (see Outstanding #1 above + "Demo/seed listings
non-purchasable showcase"). That is now superseded.

**Current behaviour:** demo/sample listings are indistinguishable
from real ones through the *entire* funnel — same listing CTA, same
`/checkout/<id>` page with the real (Stripe) payment form rendered.
Only when the buyer clicks **"Pay $X"** is it intercepted
client-side: no charge, we email ourselves the demand signal
(listing, the email + country they typed, referrer; to
`ADMIN_EMAILS`, else the Skillzy inbox), and the form swaps to
"Sorry — this isn't available anymore." Code: `app/_actions/
demo-interest.ts`, `lib/email/demo-interest.ts`, plus the `demo`
branch in `app/checkout/[id]/CheckoutForm.tsx` (page passes
`demo={isSeedProductId(...)}`). Demo pages stay `noindex` + out of
JSON-LD Offers. `/api/checkout` still hard-403s seed ids as
defense-in-depth (unreachable from the UI now).

**TODO — remove the demo catalogue entirely once we have ~100
organic (real, DB-backed) listings.** At that point the marketplace
stands on real inventory and the samples/interest-capture become
noise. Removal = drop the seed catalogue (`lib/catalog-seed.ts` seed
data), delete `app/_actions/demo-interest.ts` +
`lib/email/demo-interest.ts`, and remove the `demo` branch/prop from
the checkout page + form; nothing else depends on it. Track
real-listing count to know when we hit the threshold.
