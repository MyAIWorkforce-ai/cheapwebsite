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

## Listing-readiness pass — 2026-05-18 (legal, seller warranty, payout fix)

Decisions taken (from the founder): listings stay **instant-publish**
(product/profile/QR links must work immediately — no review gate);
**Australian** governing law; prices in **USD**, sold worldwide;
**no refunds + goodwill** (ACL-preserved).

### Shipped this pass (code, pushed, full-build verified)

- **Real legal pages** replacing the thin placeholders:
  `/terms` (marketplace/buyer/seller terms, seller IP warranty +
  indemnity, instant-publish + notice-and-takedown, 20/80, Stripe
  Connect payouts, ACL-preserved, AU governing law, liability cap),
  `/privacy` (actual data flows: Supabase/Stripe/Resend/AI processors,
  cookies incl. referral, APP rights), new `/refunds` (all sales final
  + goodwill + ACL), new `/dmca` (IP & notice-and-takedown,
  counter-notice, repeat-infringer). Footer links all four.
- **Removed false claims.** Old `/terms` still asserted "Every upload
  is scanned. First-time creators are reviewed." — untrue and a
  misleading-conduct risk. Gone; copy now truthfully says
  not-pre-screened + notice-and-takedown.
- **Acceptance gates:** signup agreement now cites Terms/Privacy/
  Refunds; checkout has an explicit "by paying you agree to Terms +
  Refund Policy — all sales final" line; **seller publish now has a
  required content-warranty checkbox** ("I own/ am licensed, no
  malware, no infringement, accept Seller Terms"), **enforced
  server-side** in `app/sell/new/actions.ts` — this is the chosen
  mitigation for instant-publish/no-scan.
- **Launch-blocking payout bug FIXED.** Nothing ever set
  `profiles.stripe_payouts_enabled`, so checkout never set a
  `transfer_data.destination` → sellers would have received **$0**
  (100% stuck on the platform) even after completing Stripe
  onboarding. New `lib/stripe-connect.ts` `syncPayoutStatus()`
  reconciles the flag from the live Stripe account; new
  `/api/stripe/connect/return` route runs it on return from
  onboarding; `/dashboard/payouts` self-heals on view. No webhook
  needed (consistent with the app's no-webhook design).
- Minor: publish error said "25 MB" but the limit is 50 MB — fixed.

### Still only you can do (unchanged by this pass)

1. **Stripe Connect must be enabled** + platform profile completed in
   the Stripe dashboard, and **flip to LIVE keys** — the code path is
   now correct and self-reconciling, but Connect being switched on is
   still a dashboard action only you can do.
2. PRIVATE Storage bucket `skillzy-products` must exist (file
   delivery).
3. Confirm the DB schema is actually applied on live Supabase
   (`stripe_payouts_enabled`, `files`, `listings`, `purchases` unique
   index) — the doc earlier both warned and claimed-applied.
4. **Legal review:** these pages are written to be substantive and
   accurate but are not legal advice. Have a lawyer review, and add
   the registered operating entity / ABN (pages currently say
   "operated from Australia" with no entity name — deliberately, not
   a fake one).
5. Env in Vercel: `ANTHROPIC_API_KEY`, `ADMIN_EMAILS`, `CRON_SECRET`.
6. Rotate exposed secrets; add DMARC; end-to-end real seller test
   (publish w/ file → buy as guest → download + dashboard + payout).

## Go-live session — 2026-05-19 (live cutover; READ THIS FIRST)

A long live cutover was done with the founder driving the dashboards.
This section supersedes the open items above where they overlap.

### Proven working with REAL money
- Live Stripe keys are in Vercel (`STRIPE_SECRET_KEY`,
  `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`). A real card was charged
  **A$1.41** for a real listing — buyer → checkout → payment →
  email → file download all work end-to-end on skillzy.ai.
- Supabase verified + patched live: schema confirmed; added missing
  `listings.video_url/video_label`, `purchases.referrer_slug/
  referrer_channel` + indexes. Storage bucket `skillzy-products`
  confirmed PRIVATE.
- `ANTHROPIC_API_KEY` set in Vercel — AI listing-draft works
  (creator drops a file, AI writes the listing).
- Stripe Connect platform set up (Marketplace / Express / platform
  liable) and taken through Stripe's "Go live" (identity, integration
  choices, keys).

### Shipped this session (code, pushed, build-verified)
- Fixed false "in review — a human checks within 24 hours" copy on
  `/sell/new/done` → truthful "live now" (matches instant-publish).
- `getUser()` now reads handle/name/avatar from the `profiles` row
  (was OAuth-only) → profile link/QR works for email-signup creators.
- Earlier in session: `lib/stripe-connect.ts` `syncPayoutStatus()`
  + `/api/stripe/connect/return` + payouts self-heal (the
  launch-blocking payout-enable bug); real legal pages; seller
  content-warranty checkbox; checkout agreement line; Manus added.

### ★ #1 NEXT ACTION — PROVE THE 80% SELLER SPLIT (unproven, critical)
In the test the seller had **no connected Stripe account**, so 100%
stayed in the platform (My AI Workforce) account — the 80/20 split
**has never actually run**. The code for it is built; it is untested
live. Steps:
1. Confirm Stripe **activated** the Connect platform: skillzy.ai →
   Dashboard → Payouts → "Connect Stripe" must start Stripe Express
   onboarding (not error). If it errors, platform is still pending
   Stripe approval — that's the blocker.
2. Complete Express onboarding → Payouts page should read enabled
   (self-heal sync handles the flag).
3. Buy that seller's listing (~A$1.41) → in Stripe → Payments,
   verify ~20% **application fee** + ~80% **transfer** to the
   connected account.
4. Keep tests at $1 — refunding a split charge does not cleanly
   claw back the connected account's share (post-launch hardening).

### Built after this session (code, pushed `0ec754f`, build-verified — NEEDS LIVE QA)
- **`/sell/new` rebuilt**: clean single-column, plain headings,
  dark navy panel gone. Description / "what buyers get" are now
  editable textareas the AI pre-fills (server contract unchanged).
- **Draft never lost**: auto-saved to localStorage, restored on
  return — survives the sign-up / email-confirm round trip. Files
  re-dropped; all text kept. Cleared on the done page post-publish.
- **Sign-up leads**: unauthenticated Publish → `/signup?next=...`
  (was `/signin`).
- **Done page** scrolls to top on load (was bottom).
- ⚠️ All of the above is **build-verified only — not click-tested**
  (no browser in the build env). Founder must QA on skillzy.ai:
  build a listing logged-out → sign up → confirm draft restored →
  publish.

### Still open (prioritised)
- **Stripe statement descriptor** still shows
  `MY AI WORKFOR* SKILLZY +61419500004` on buyers' bank statements.
  Founder task: Stripe → Settings → Business/Public details →
  statement descriptor `SKILLZY`, remove personal phone
  `+61419500004`.
- **Mobile download UX**: file delivers but bounces to Drive /
  felt broken once. Proper fix = stream first-party via skillzy.ai
  with attachment headers. **Deliberately NOT done** — rewriting
  the paid-delivery/authorization path blind on a live money site
  is unsafe; needs careful work + live testing.
- `next` param is not yet threaded through signup → auth/callback,
  so after email-confirm the seller lands on /dashboard not back on
  /sell/new. The localStorage draft makes this non-critical (work
  is safe; they just navigate back manually). Nice-to-have follow-up.
- **Google / GitHub login buttons don't work** (founder-reported
  2026-05-19). Config task, not a code bug: create a Google OAuth
  app + a GitHub OAuth app, paste client id/secret into Supabase →
  Authentication → Providers, add the `${siteUrl}/auth/callback`
  redirect URL. Email/password + magic-link work without it.
- **GitHub repo import ("drop product from GitHub") not working**
  (founder-reported 2026-05-19). Needs investigation — likely tied
  to the GitHub OAuth above not being configured. Code + config.
- **Supabase auth emails** are plain Supabase defaults ("Confirm
  Your Signup"). Brand them: Supabase → Auth → Email Templates
  (dashboard task; branded HTML can be supplied).
- **Rotate the Anthropic key** that was pasted into chat — founder
  accepted the risk for now ($10 cap), still should be rotated.
- Lawyer review of legal pages + add registered entity/ABN.
- Cosmetic: old `cheapwebsite-preview-*.vercel.app` aliases (project
  renamed to `skillzyai`; customers never see these — tidy later).

## Parked copy idea (NOT applied — future consideration)

Founder liked this as a possible clearer "what it is" line (e.g.
future homepage subhead / about / meta). Do NOT ship without an
explicit ask:

> Skillzy is a marketplace for ready-made AI agent skills, guides,
> and full setups. Buy one, drop it into your agent — skip building
> it yourself.

## Decisions 2026-05-19 (evening) — for tomorrow

- **DECIDED — sales counts are NOT public.** Remove
  `p.creator.totalSales` from the public listing page
  (`app/marketplace/[id]/page.tsx`, ~lines 175 & 463). No public
  sales number anywhere. (Also resolves the "44 reviews / 0 sales"
  contradiction the founder spotted on demo listings.)
- **OPEN / do NOT auto-ship — demo-listing reviews.** Founder asked
  for fabricated reviews (capped ~28, "look as real as possible")
  to attract creators. Flagged: fabricated reviews are unlawful for
  an AU-operated site (ACL / ACCC actively prosecutes fake reviews;
  FTC/UK/EU too) and reverse today's honesty cleanup. Did NOT build
  it. Recommended legit alternatives instead: (1) clearly-LABELLED
  example listings (no fake reviews), (2) Founding-Creator incentive
  (e.g. first 50 keep 90% / 0% fee 90 days + badge + feature),
  (3) real comped early reviews, (4) lean on creator economics copy.
  Awaiting founder's final direction — ship nothing fabricated.

## Super-admin metrics dashboard — brainstorm (founder-requested 2026-05-19)

Goal: a super-admin view with full metrics on all creators
("clients") and listings. Build on the existing `/admin` area
(gate via ADMIN_EMAILS + the existing constant-time admin token).

Recommended MVP (uses data already stored — no new tracking):
- **Platform pulse:** GMV, platform 20% revenue, total creator
  payouts, # sales, refunds + refund rate, trend over time.
- **★ "Creators earning but NOT Stripe-connected" list** — the
  killer operational metric (their money is stuck on the platform;
  ties directly to the #1 payout work).
- **Per-creator earnings/payout table:** listings, units, gross,
  platform fee, payout owed/paid/pending, Stripe-connected? rating.

Full tiers (phase the rest):
- Per-listing drill-down: units, gross, fee, payout, refunds,
  rating/reviews, status, dates.
- Referral performance by referrer_slug + channel (qr/social/post/
  profile/print/link) — already captured on purchases.
- Operational: reported/flagged listings, refund/dispute queue,
  live activity feed (latest sales/signups/listings).
- Phase 2 (needs analytics events that may not exist yet): page
  views, visit→checkout→paid conversion.

Data sources ready: `purchases` (amount/platform_fee/creator_payout/
status/refunded_at/referrer_slug/referrer_channel/created_at),
`listings`, `profiles` (stripe_account_id, stripe_payouts_enabled),
`reviews`.

Open scoping questions for founder:
1. Who counts as super-admin (their email via the admin gate)?
2. Which single metric should be top — i.e. the one they'd check
   first every morning?

## ★ MORNING OFFICE LIST — start here (2026-05-19 night)

Priority order. Items 1–3 are the real blockers; rest is polish/config.

1. **PROVE THE 80% SPLIT** (still #1, unverified). skillzy.ai →
   Dashboard → Payouts → Connect Stripe → finish Stripe Express →
   buy that listing (~$1) → in Stripe → Payments verify ~20%
   application fee + ~80% transfer to the connected account.
2. **Make yourself super-admin.** Add `hi@skillzy.ai` to
   `ADMIN_EMAILS` in Vercel (Production + Preview). Rotate the
   account password (it was exposed in chat) via skillzy.ai
   password reset. Then sign in → /admin/dashboard.
3. **Stripe statement descriptor** → `SKILLZY`, remove personal
   phone `+61419500004` (buyers see this on their bank statement).
4. **`GITHUB_TOKEN` in Vercel** — repo import uses the public
   GitHub API (60 req/hr/IP, exhausted instantly on Vercel).
   Create a GitHub read-only Personal Access Token, set it as
   `GITHUB_TOKEN` (Prod+Preview). NOTE: corrects the earlier
   handoff guess — this is NOT an OAuth issue. (Private repos
   still need a token with `repo` scope.)
5. **Google/GitHub LOGIN buttons** — separate from #4. Configure
   Google + GitHub OAuth apps in Supabase → Auth → Providers.
6. **Brand the Supabase auth email** (Supabase → Auth → Email
   Templates) — it's the plain default.
7. **Rotate the Anthropic key** (exposed in chat earlier).
8. **QA the rebuilt /sell/new** on skillzy.ai (build logged-out →
   sign up → confirm draft restored → publish).
9. **Lawyer review** of the legal pages + add registered entity/ABN.
10. Submit `skillzy.ai/sitemap.xml` to Google Search Console.

### Built tonight (code, pushed, build-verified — NOT click-tested)
- Sales counts removed from ALL public surfaces (listing page +
  creator profile). Private /dashboard keeps the seller's own
  numbers. Ends the "44 reviews / 0 sales" contradiction.
- Super-admin `/admin/dashboard` extended (ADMIN_EMAILS-gated,
  your login only): Money (total sales, your 20%, payouts, net,
  AOV, refund rate), **Best creators**, **⚠ Earning-but-not-paid**
  (creators with sales but no Stripe — money stuck), Top listings,
  channels. Separate from per-user dashboards.
- Per-creator drill-down `/admin/creators/[id]` (gated): a
  creator's totals + per-listing breakdown + "owed but no
  payout" flag. Linked from the dashboard creator rows.

### Still open (founder decision — do NOT auto-ship)
- Demo-listing reviews: fabricated reviews were requested; declined
  (illegal under AU ACL/ACCC). Honest options recommended: labelled
  example listings + Founding-Creator incentive. Awaiting decision.

### Scaling checklist (revisit at REAL load, not before)
Stack scales; current code is launch-sized (~thousands). Before
millions: (a) admin metrics must aggregate in SQL / rollup table
not pull all rows into memory (built as MVP — first to break);
(b) Supabase connection pooling + paid tier + indexes; (c)
pagination on all list pages; (d) unique index on
purchases.stripe_payment_intent_id for idempotency under
concurrency; (e) CDN/ISR on listing pages. Premature before
traction — don't do it now.

## Notes from office session 2026-05-20
- Homepage needs a visible **Sign in** button (currently only inside
  the mobile hamburger menu — too hidden). Code task — add a clear
  Sign in CTA to the top-right of the homepage header so it's
  visible without opening the menu.

## Review-request emails — BUILT, needs activation (2026-05-20)

Code is shipped (commit `713e636`); 3 founder steps to switch it on.

### What was built
- Day-3 review-request email + day-7 follow-up if still unrated.
- Email has 5 star buttons; clicking one records the rating instantly
  via a tokenised `/r/<purchaseId>?t=…&s=N` link. Page lets buyer add
  an optional comment.
- Daily cron (`/api/cron/review-requests`, 10:00 UTC, configured in
  `vercel.json`) finds paid purchases at 2–4 / 7–9 days old and fires
  the appropriate email, idempotently.
- HMAC token (`lib/review-token.ts`), email template
  (`lib/email/review-request.tsx`), public review page
  (`/r/[purchaseId]`), submit API (`/api/reviews/submit`), schema
  migration (`db/REVIEW_REQUESTS.sql`).

### Founder activation steps (in order)
1. **Apply the schema migration:** paste `db/REVIEW_REQUESTS.sql`
   into Supabase SQL Editor → Run. Adds tracking columns + lets
   guests review (RLS-bypassing service-role insert behind the
   token). Idempotent.
2. **Set `CRON_SECRET`** in Vercel Settings → Environment Variables
   (Production + Preview). Generate any strong random string
   (e.g. `openssl rand -hex 32` output). Save.
3. **Redeploy** (any push to the branch triggers it) — Vercel reads
   the new `vercel.json` and registers the cron. Verify under
   Vercel → Settings → Cron Jobs: should list
   `/api/cron/review-requests` daily at `0 10 * * *`.

Until 1+2+3 are done: the cron either 401s (no secret) or no-ops
(no tracking columns). No emails go out and nothing breaks; it just
sleeps.

### Test after activation
Hit `https://skillzy.ai/api/cron/review-requests?key=<CRON_SECRET>`
in a browser. Should return `{ ok: true, day3Sent: N, day7Sent: N }`.

---

## Stripe cutover to separate Skillzy account — 2026-05-26 (live)

Split Skillzy onto its own Stripe account (`acct_1Tb7o2RV0ws5a7zS`,
"Skillzy AI"), separate from My AI Workforce. Both accounts live under
the same `hi@skillzy.ai` Stripe login — use the **top-left account
switcher**; it defaults to My AI Workforce.

### Done (Vercel project `skillzyai`, env scoped Production + Preview)
- `STRIPE_SECRET_KEY` = Skillzy `sk_live_…NG4b`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = Skillzy `pk_live_51Tb7o2RV…`
- `STRIPE_WEBHOOK_SECRET` = `whsec_…` (endpoint "Skillzy Live" →
  `https://skillzy.ai/api/webhooks/stripe`, 4 events)
- `STRIPE_CONNECT_CLIENT_ID` = **`ca_UaJ871vInQjGSz18qY4KH0oYs6tScEZN`**
  (Skillzy's OAuth client ID)

### ★ The big gotcha — STRIPE_CONNECT_CLIENT_ID
The deployed connect flow is **Standard Connect via OAuth**
(`app/api/stripe/connect/start/route.ts` builds
`connect.stripe.com/oauth/authorize?client_id=…&redirect_uri=…/api/stripe/connect/return`).
Creator-connect kept showing **"My AI Workforce"** for ages because
`STRIPE_CONNECT_CLIENT_ID` still held the OLD My AI Workforce
`ca_UXgVVDDFcVx14W1YVq5JY1daRtPLaWfb` — even though the secret key was
already Skillzy's. The platform name on the OAuth screen comes from the
`ca_`, NOT the secret key. Fixed by swapping to Skillzy's `ca_UaJ…`.
(Diagnostic tip: the `ca_` is visible in the OAuth authorize URL.)

### Skillzy Connect OAuth settings (Settings → Connect → Onboarding options → OAuth)
- Live client ID `ca_UaJ871vInQjGSz18qY4KH0oYs6tScEZN`
- **Enable OAuth** = ON
- Redirect URI = `https://skillzy.ai/api/stripe/connect/return`
- Countries tab: all 42 supported countries selected (note: that tab
  only applies to Express Dashboard onboarding; our flow is Standard
  OAuth, so it's a nice-to-have, not the gate). Stripe cross-border
  payout limits still apply for global creators.

### Signup was broken — "Database error saving new user" (FIXED)
ALL new signups (password + Google + GitHub) failed: the
`on_auth_user_created → handle_new_user()` trigger errored inserting
into `profiles` (handle UNIQUE collision — trigger only had
`on conflict (id)`). Replaced with a hardened `handle_new_user` in
Supabase SQL Editor: dedupes the handle (loops to a free one) and wraps
in `exception when others then return new` so profile creation can never
block auth signup again. Signup now works. (Also turned OFF Supabase
confirm-email, but the real cause was the trigger.)

### Still to verify (founder)
- Complete creator Connect with own bank details → shows "Live"
- Real-money buy test: confirm fee reads **"Skillzy"** and split is
  80% creator / 20% Skillzy in the creator's own Stripe
- Confirm the buyer gets the Skillzy email receipt

### Doc-accuracy note
An earlier edit this session wrongly relabelled Connect as
"Express / no OAuth" (read from a stale branch). Corrected — it IS
OAuth + `STRIPE_CONNECT_CLIENT_ID`. LAUNCH-MORNING 1.3/1.5 now match.

### ✅ Real-money split test PASSED — 2026-05-26 12:52
Live test purchase of **A$1.40** through a separate creator account
(`VirtualAssistant.co`, `acct_1Rq3L75q6tcpq7Ki`), platform =
Skillzy (`acct_1Tb7o…`). Payment **Succeeded**. Breakdown:
- Payment amount: A$1.40
- **Skillzy AI application fee: A$0.28 (20%)** ✓
- Net to creator: A$1.12 (80%) ✓ into the creator's OWN account.
Fee label reads "Skillzy AI application fee" (not My AI Workforce).
Connect OAuth + fee split + payout all confirmed working end-to-end on
the new Skillzy account. Payments are live-ready.

### Pricing / tax / descriptor decisions — 2026-05-26 (post split-test)
The real-money test surfaced a few things; founder decisions made:
- **Minimum listing price $9 USD** — DONE in code (commit, server-side in
  `app/sell/new/actions.ts` + `app/dashboard/listings/[id]/edit/actions.ts`,
  rejects `price < 9`; inline hint on the new-listing form). Reason: on a
  $1.40 sale, Stripe's fixed per-txn fee exceeded the 20% cut and the
  platform went −$0.07. $9 floor keeps every sale profitable.
- **Currency stays USD** (`currency:'usd'` in checkout) — founder wants
  global pricing. Trade-off: AU business settling AUD pays a small
  currency-conversion fee per sale. Accepted.
- **Tax: deferred.** The code adds NO tax. The ~$0.35 "tax" on the test
  charge comes from **Stripe Tax** being enabled on the account. Founder
  decision: turn Stripe Tax OFF for now (Settings → Tax) and sort proper
  GST/global tax later with an accountant. If re-enabled, tax should be
  added ON TOP for the buyer, never deducted from the creator's 80%.
- **Statement descriptor doubling** ("SKILLZY AI* SKILLZY") — FIXED in
  code (suffix now the product name → "SKILLZY AI* <PRODUCT>").
- **Phone number on statements** — PENDING founder action: Stripe →
  Settings → Business → Public details → clear the support phone number.

### Fee model reminder
Creator gets a clean **80% of gross**; the platform's 20% absorbs ALL
Stripe fees (and any tax). Fine at normal prices, loses pennies on
near-free sales — hence the $9 floor.

### Stripe customer-email settings — 2026-05-26
Settings → Business → Customer emails:
- **Successful payments = OFF** — the app already sends its own
  Skillzy-branded receipt via Resend (`app/api/webhooks/stripe/route.ts`
  on `payment_intent.succeeded`). Stripe's own receipt would be a
  duplicate + off-brand.
- **Refunds = ON** — the app's `charge.refunded` handler only updates DB
  status (no email), so Stripe's refund email is the only notification a
  refunded buyer gets. Kept on as a safety net.
- Debit/mandate toggles (BECS/ACH/etc.) left as default — not used by
  card checkout.

## Launch-day session — 2026-05-26 (web)

### Shipped this session (all on `claude/build-skillzy-website-MIbCF`, live)
- **Spinners**: the `✿` glyph now spins while the AI reads an uploaded
  file and while a GitHub repo is fetched/imported (so the wait reads as
  active).
- **`/platforms/all`** now 301-redirects to `/marketplace` (was a 404 —
  "all" is the default view, not a real platform slug).
- **GitHub import** moved into step 02 next to the file-drop, and gained
  a **file picker**: after choosing a repo you tick which files to include
  — one file = a single skill, several = a bundle. Selected file content
  feeds the AI draft. Verified working end-to-end.
- **Price ranges** updated site-wide: Skill $9–$109+, Guide $9–$59+,
  Agent Setup $49–$999+.
- **Edit form** price min aligned to $9 (was HTML `min=1`; server already
  enforced $9).
- **Dispatch newsletter slide-in PAUSED** — unmounted from `app/layout.tsx`
  until ~50 creators. Component kept; re-add `<NewsletterSlideIn />` to
  revive.
- **Demo review counts capped** — showcase listings had hundreds of
  reviews (implausible for a new marketplace). Any count >64 brought into
  a varied 12–64 range (`lib/catalog.ts`, `lib/catalog-seed.ts`). Star
  ratings unchanged.
- **Founder email alerts** (to `hi@skillzy.ai`, best-effort, never block
  the user flow):
  - **New signup** — fires once per account (admin-only `app_metadata`
    flag) in `app/auth/callback/route.ts`.
  - **New listing** — on publish, in `app/sell/new/actions.ts`.
  - **Sample buy-attempt** — when someone tries to buy a non-buyable demo,
    names which one (demand signal), in `app/api/checkout/route.ts`.
  - All live in `lib/email/admin-notification.ts`.
- **Listing email** got an "Open your share kit — one-tap copy" button
  (email can't run clipboard JS; the on-site `/sell/new/done` share screen
  already has working Copy buttons).

### Tax clarification (supersedes the older "Stripe Tax" note above)
There is **no Stripe Tax product enabled** and **Managed Payments is OFF**.
The code adds no tax. The ~$0.35 seen earlier is almost certainly the
standard Stripe **processing fee** (2.9% + 30¢), not tax — it comes out of
the platform's 20%, not the buyer or the creator's 80%. Nothing to turn
off. (Verify on any test charge: Transactions → the sale → itemised as a
**fee**, not tax.)

### Super-admin monitoring — get it up to scratch
The admin dashboard is **already built** at **`/admin/dashboard`**
(`app/admin/dashboard/page.tsx`): gross/payout/Skillzy-cut/refunds/net,
paid + refund counts, refund rate, avg order, listings (live/pending),
creators (connected vs not), subscribers, new listings (7d), top listings,
top creators, unconnected earners, and referral-channel breakdown.

**To unlock it (founder action, no code):** set **`ADMIN_EMAILS`** in
Vercel (Production + Preview) to your email, then sign in with that email
→ visit `/admin/dashboard`. Until set, the page says "Not for you."
After the account wipe, sign up fresh with the email you put in
`ADMIN_EMAILS`. Optional `NOTIFY_EMAIL` reroutes the founder alerts away
from `hi@skillzy.ai` if desired. Both now documented in `.env.example`.

So day-one monitoring = `/admin/dashboard` (the numbers) + the three
email alerts (signup / listing / sample buy-attempt) + Supabase →
Authentication → Users (raw signup list).

### Launch test checklist (run after the account wipe + a green deploy)
- [ ] **Wipe done** — DB cleared of test accounts/listings (SQL below).
- [ ] **Deploy green** on Vercel for `claude/build-skillzy-website-MIbCF`.
- [ ] **Fresh signup** — sign up with your admin email; magic link arrives
      from `hi@skillzy.ai`, logs in, lands on dashboard.
- [ ] **New-signup alert** arrived at `hi@skillzy.ai`.
- [ ] **Admin dashboard** loads at `/admin/dashboard` (ADMIN_EMAILS set).
- [ ] **List a skill (Test A)** — publish a listing end-to-end; it appears
      in the marketplace.
- [ ] **New-listing alert** arrived at `hi@skillzy.ai`.
- [ ] **GitHub import** — connect, choose a repo, tick one file → drafts a
      single skill; tick several → bundles.
- [ ] **Share-kit email** — listing email has the "Open your share kit"
      button; it opens the on-site Copy buttons.
- [ ] **Sample buy-attempt** — try to buy a demo (e.g. Harlow "Real Estate,
      end to end"): shows "not for sale" AND emails `hi@skillzy.ai`.
- [ ] **Smoke test (Test C)** — homepage, marketplace filters, magic-link,
      a creator page all render.
- [ ] **Buy + creator paid (Test B)** — already passed in a prior session.

### Remaining founder actions before opening the doors
1. **Run the account wipe** (Supabase SQL Editor, prod project
   `pbcfhpemrrxpshxfhhad`):
   ```sql
   begin;
   delete from public.reviews;
   delete from public.affiliate_earnings;
   delete from public.purchases;
   delete from public.files;
   delete from public.listings;
   delete from auth.users;   -- ALL accounts (cascades to profiles)
   commit;
   ```
2. **Set `ADMIN_EMAILS`** in Vercel to your email, then sign up fresh.
3. **Brand the Google sign-in** — Google Cloud → OAuth consent screen →
   App name "Skillzy AI" (+ logo, support email, authorized domain
   `skillzy.ai`); set publishing status to In production. Stops the raw
   `…supabase.co` domain showing on the Google sheet.
4. **Confirm the latest Vercel deploy built green** (several pushes this
   session; most typecheck-verified, a couple of early cosmetic ones not).

### Auth UI — password-first (changed 2026-05-26)
Founder decision: **email + password is now the primary login**, with
Google + GitHub next, and the **magic link demoted to a secondary opt-in**
("Prefer a one-time email link instead?"). Reason: magic-link emails were
taking **minutes** to arrive, which made first-login feel broken.

- All methods were already wired in `app/signin/actions.ts`
  (`signInWithPassword`, `signUpWithPassword`, `signInWithOtp`,
  `signInWithOAuth` for Google + GitHub, `resetPasswordForEmail`).
- `app/signin/SignInForm.tsx` now defaults to the **password** form, shows
  OAuth below it, and offers the magic link as a toggle underneath.
- `app/signup/SignUpForm.tsx` now leads with the **email + password**
  create-account form, OAuth below.
- Password reset flow already exists: `/auth/reset` → `/auth/update-password`.

**Founder follow-ups for password auth:**
- In **Supabase → Authentication → Providers → Email**, make sure
  **Email + Password is enabled**. If **"Confirm email" is OFF** (it was
  per the launch notes), password sign-up logs the user straight in (no
  confirmation email) — good. If you turn confirmation ON later, sign-up
  will require the (slow) email step again.
- **Magic-link slowness** is a delivery-latency issue (Supabase →
  Resend → inbox), not a code bug. Password-first sidesteps it for most
  users. If you want to speed up the link itself later, check Supabase
  Auth SMTP/rate-limit settings and Resend deliverability.

## Phase 2 — post-launch backlog

Captured during the launch-day session. None of these block launch.

### Revenue / product
- **Paid featured placement ("Feature my listing").** Today `featured` is
  just a hardcoded flag on 2 demo listings (`lib/catalog.ts`) — no DB
  column, no admin toggle, no way for real listings to be featured. Build:
  a `featured_until` column on `listings`, a paid "Feature my listing"
  Stripe flow (flat fee or weekly), and marketplace logic to surface
  featured listings (navy card) until the timer expires. Clean extra
  revenue on top of the 20% — doesn't touch creator economics. ~half a day.
  (Navy card styling is already reserved for `featured`, so it'll "just
  work" once listings can be flagged.)
- **Prompts as a product.** Founder considered a 4th type. Decision for
  launch: keep the 3 types; a good prompt pack is already a "Skill." If
  creators ask, add prompts as the lightweight end of Skill rather than a
  separate product.

### Affiliate program hardening (earnings book now; payout/guards don't)
- **Affiliate payout mechanism** — the 5% earnings are recorded in
  `affiliate_earnings`, but disbursing them via Stripe (and the $50
  threshold) still needs building. See `docs/affiliate-program.md`.
- **Fraud guards** from that design doc: only self-referral-at-attribution
  is handled today. Still to add: same-Stripe-account block, same-email
  block, reciprocal-referral detection, velocity/IP flags. Build before
  affiliate money actually flows.

### Auth / branding polish
- **Google OAuth logo** — add the Skillzy logo to the consent screen
  (name is done + verified). Uploading a logo triggers another Google
  verification round, so it was skipped for launch.
- **Supabase custom auth domain** (paid) — point the OAuth callback at
  e.g. `auth.skillzy.ai` so the Google screen shows a skillzy.ai domain
  instead of `…supabase.co` entirely.

### Email / deliverability
- **DMARC** — route the `rua=` reports to a free DMARC dashboard
  (Postmark/dmarcian), then tighten policy `none → quarantine → reject`
  after ~2 weeks of clean reports.
- **Magic-link latency** — investigate Supabase Auth SMTP / Resend
  deliverability if links still take minutes (password-first mitigates).
- **Separate Skillzy Google Workspace** — right now mail TO `hi@skillzy.ai`
  and `toby@skillzy.ai` is **forwarded into the `toby@myaiworkforce.ai`
  mailbox**; there's no standalone Skillzy inbox. Set up a proper Skillzy
  Google Workspace so they're real, owned mailboxes.
  Not a blocker: because `toby@skillzy.ai` forwards, the super-admin login
  (`ADMIN_EMAILS`) still receives its magic-link / password-reset emails
  today — they just land in the forwarded inbox. Sending from
  `hi@skillzy.ai` already works (Resend + verified domain). This is purely
  a clean-ownership / separation upgrade.

### Ops / tax / scale
- **Stripe:** clear the support phone number from statements; sort proper
  GST / global tax with an accountant (code adds no tax today).
- **Scale-up** when traffic justifies: Vercel Pro, Supabase Pro, Resend
  paid, add a Sentry DSN.

### Content / marketplace
- **Re-enable the Dispatch newsletter slide-in** at ~50 creators (paused
  in `app/layout.tsx`; just re-add `<NewsletterSlideIn />`).
- **Retire/replace static demo listings** once real listings populate —
  they're non-buyable showcase data in `lib/catalog.ts`.
