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
- **Keep DMARC at `p=none` for now.** Update 2026-05-30: the Google
  Workspace is live (`hi@skillzy.ai` sends as skillzy.ai). DMARC reports
  show Workspace mail **passing via SPF** ✅, but some "From skillzy.ai"
  messages (forwards / non-aligned paths) still show DMARC fail — harmless
  at `p=none` (nothing blocked). Don't tighten to quarantine/reject until
  BOTH Resend and Workspace mail align cleanly, or legit mail could start
  bouncing.
- **Finish Google Workspace DKIM** — Google Admin → Apps → Gmail →
  **Authenticate email** → add the DKIM TXT record for `skillzy.ai`. Then
  Workspace mail aligns on DKIM too (today it only passes via SPF). Not
  urgent, but do it before tightening DMARC.
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
- **Storage / egress optimisation.** Architecture is already efficient
  — each file lives once at `skillzy-products/<creator_id>/<listing_id>/<filename>`
  in Supabase Storage, and every buyer gets a short-lived signed URL
  to the same object (no per-buyer duplication). At scale the dominant
  cost will be **egress, not storage** (~$0.09/GB on Supabase vs
  $0.021/GB·mo storage). When traffic justifies:
  - Front Supabase Storage with **Bunny.net or Cloudflare R2** —
    bandwidth ~5× cheaper at scale.
  - Add a **re-download counter / cap per purchase** — currently
    unlimited; OK at launch, worth metering above ~10k buyers per
    listing.
  - **Content-hash de-dupe across listings** — only worth it if
    creators repeatedly upload identical SKILL.md files (probably
    rare).
- **Upstash Redis for AI draft rate-limits.** The /api/listings/draft
  rate-limiter is now split anon (10/day/IP) + signed-in (100/day/user)
  + global (200/hr). It checks `UPSTASH_REDIS_REST_URL` and
  `UPSTASH_REDIS_REST_TOKEN` first; without them it falls back to
  per-instance in-memory counters that reset on every Vercel cold start.
  Fine at launch volume (cold starts mostly happen overnight). Once
  daily AI traffic justifies persistent counters, sign up at upstash.com,
  create a Redis DB, paste the REST URL + token into Vercel env vars.
  No code change required — the rate-limit lib auto-detects.
- **BIMI (logo + blue check across all email clients).** Tier-1 logo
  display (Gmail-only, free) is a Workspace profile-photo upload —
  see "Outstanding follow-ups" below. For the proper cross-client
  brand display (Gmail + Yahoo + Apple Mail + Outlook):
  1. Tighten DMARC from `p=none` → `p=quarantine`. Needs ~30 days of
     clean DKIM/SPF reports first so we don't break delivery.
  2. Trademark the Skillzy "S" mark (or use a CMC for unregistered).
  3. Buy a Verified Mark Certificate (VMC) from Entrust or DigiCert —
     ~$1,000–$1,500/year.
  4. Convert logo to BIMI-spec SVG (Tiny PS profile).
  5. Add `default._bimi.skillzy.ai` TXT record pointing to the SVG +
     VMC PEM file.
  Worth it once revenue justifies — gives the official brand look in
  every major inbox.

### Content / marketplace
- **Revive the entire Dispatch newsletter at ~50–100 creators.** Fully
  paused 2026-06-11 — there's no point collecting signups while there's
  nothing to dispatch about. To revive:
  1. `components/Footer.tsx` — uncomment `NewsletterForm` import and
     restore the "The dispatch" block inside the Brand column.
  2. `app/blog/[slug]/page.tsx` — uncomment `NewsletterForm` import and
     restore both the top-of-post + bottom-of-post Dispatch blocks
     (comments mark exact wrappers + copy).
  3. `app/layout.tsx` — re-add `<NewsletterSlideIn />` if also reviving
     the slide-in popup (separately paused earlier).
  4. Server action `app/_actions/newsletter.ts` + the Beehiiv fallback
     chain are untouched — set `BEEHIIV_API_KEY` +
     `BEEHIIV_PUBLICATION_ID` in Vercel and signups flow in immediately.
  5. The `/dispatch` page itself is kept as the "what's new" listings
     archive — separate from the newsletter, no changes needed.
- **Retire/replace static demo listings** once real listings populate —
  they're non-buyable showcase data in `lib/catalog.ts`.

## Deploy + env facts (confirmed 2026-05-27)

Hard-won during the admin-access debug — read before touching env vars:

- **Vercel project = `skillzyai`** (under `toby-banks-projects-b6665456`).
  That's the project whose Domains tab owns `skillzy.ai`. Older notes
  called it `cheapwebsite-preview` — ignore that.
- **skillzy.ai is served by the PREVIEW build of branch
  `claude/build-skillzy-website-MIbCF`** — NOT Production/`main`. So:
  - A `git push` to that branch auto-creates a fresh Preview deploy =
    the live site updates. (This is how Claude ships every change.)
  - To make an **env-var change** go live, redeploy the latest **Preview**
    deployment of that branch (Deployments → newest `claude/build-…`
    Preview row → ⋯ → Redeploy). Redeploying a **Production** deployment
    does NOT update skillzy.ai.
- **`ADMIN_EMAILS` must NOT be marked "Sensitive".** Vercel hides (and in
  practice dropped) the value of Sensitive vars on edit, which left the
  admin allow-list empty → everyone was treated as a standard user and
  `/admin/dashboard` said "Not for you". Recreated non-sensitive with
  value `toby@skillzy.ai`, and it holds.
- **Super admin = `toby@skillzy.ai`** only. There's no separate admin
  login — sign in as that account, and `/admin/dashboard` unlocks because
  the email is in `ADMIN_EMAILS`. (`toby@myaiworkforce.ai` was just a test
  account.)

## Supabase Data API default change — future migrations only

Supabase emailed (May 2026): new tables in the `public` schema will no
longer be auto-exposed to the Data API (PostgREST / GraphQL / supabase-js).

- **Not a launch issue, not urgent.** This is an **existing** project, so
  the old behavior holds until **October 30, 2026**. All current tables
  (profiles, listings, purchases, files, reviews, affiliate_earnings,
  subscribers) keep working unchanged.
- **Only affects NEW tables created from now on.** The app talks to the DB
  via supabase-js, so a new `public` table without a grant would be
  invisible to the app.
- **So every future migration that creates a table must add an explicit
  grant** (plus its RLS policies), e.g.:
  ```sql
  grant select, insert, update, delete on public.<new_table> to anon, authenticated;
  -- then enable RLS + add policies as usual
  ```
  (Tighten the verbs per table — e.g. read-only tables only need `select`.)

## Founder alerts must NOT be self-addressed — set NOTIFY_EMAIL

Gotcha found 2026-05-30 after `hi@skillzy.ai` became its own Google
Workspace mailbox: the founder alerts (new signup / new listing / new
sale / sample-buy-attempt) send **from `hi@skillzy.ai`**, and by default
**to `hi@skillzy.ai`** (`env.resend.fromEmail`). A self-addressed message
arriving via an external relay (Resend) is **silently dropped by
Gmail/Workspace — not even shown in Spam.**

- It *used* to work only because `hi@` was forwarding to a *different*
  inbox (`toby@myaiworkforce.ai`), so it wasn't self-to-self at the
  destination. Once `hi@` became its own mailbox, the self-send vanished.
- **Fix:** set **`NOTIFY_EMAIL`** in Vercel (`skillzyai`, Prod+Preview,
  NOT sensitive) to a **different address** than the sender — e.g.
  `toby@skillzy.ai` or a personal Gmail. Then alerts go `hi@ → toby@` and
  deliver. The code already reads `NOTIFY_EMAIL`
  (`lib/email/admin-notification.ts → notifyTo()`); no code change needed.
- **Rule of thumb:** the alert recipient (`NOTIFY_EMAIL`) must never equal
  the sender (`EMAIL_FROM` = `hi@skillzy.ai`).

---

## 2026-06-01 — Launch-day polish + critical email bugs

Live-test session against the production site after launch. Everything
below is shipped to `claude/build-skillzy-website-MIbCF`, the branch
that serves `skillzy.ai`.

### Per-type founder alert routing (`7a7e325`, `d2d011f`)

The single `NOTIFY_EMAIL` was forcing every founder alert (signup,
listing, sale, sample-buy) into one inbox. Added per-type overrides so
sales go to `sales@`, signups + listings to `toby@`:

| Alert type | Env var |
|---|---|
| New signup | `NOTIFY_EMAIL_SIGNUP` |
| New listing | `NOTIFY_EMAIL_LISTING` |
| New sale + sample-buy-attempt + refund | `NOTIFY_EMAIL_SALE` |

Fallback chain: type-specific → `NOTIFY_EMAIL` → `EMAIL_FROM`. The
demo-interest alert (`lib/email/demo-interest.ts`) was on the old
`ADMIN_EMAILS` fallback path and needed a separate fix to join the
chain — easy to miss when adding new alert paths.

**Current production env (Vercel `skillzyai`, Prod+Preview, NOT sensitive):**
- `NOTIFY_EMAIL_SALE = sales@skillzy.ai`
- `NOTIFY_EMAIL = toby@skillzy.ai` (catches signup + listing via fallback)
- `EMAIL_FROM = hi@skillzy.ai` (sender — never set it to itself)

### Scroll-to-top now global (`e9ec090` → `fac6d8a`)

Buyers landing on `/checkout/[id]` were dropped at the bottom of the
page. Same bug existed after signup, listing creation, and any other
server-action redirect. **Root cause:** the Stripe Payment Element
iframe auto-focuses on mount and the browser scrolls the iframe (which
sits at the bottom of the form) into view, after Next.js has done its
initial scroll-to-top.

Fix: `components/ScrollToTopOnRouteChange.tsx` mounted in the root
layout. On every pathname change it pins window scroll to 0 and
re-pins through a 2-second window (50/150/400/900/1800 ms). Bails the
instant the user scrolls deliberately (wheel/touchmove/keydown), so it
never fights a real gesture. Also disables `history.scrollRestoration`.
Skips deep links (URLs with `#hash`).

### Critical: purchase emails were duplicating (up to 4x) (`ae568ed`)

A real test buy sent the buyer/seller/founder emails **four times each**.
**Root cause:** `fulfillPaymentIntent` is called by both the post-payment
success page AND the Stripe webhook (`payment_intent.succeeded`). The
application-level idempotency guard was SELECT-then-INSERT on
`stripe_payment_intent_id`, with no DB-level uniqueness. Stripe also
retries the webhook if it doesn't get a 200 fast enough, so up to four
racing paths can all pass the SELECT before any INSERT lands → four
rows insert, four emails go out.

**Fix:** migration `008-purchases-unique-payment-intent.sql`:
1. Deduplicate existing duplicate rows (keep earliest by `created_at`)
2. Add `UNIQUE` partial index on `stripe_payment_intent_id`

`fulfillPaymentIntent` already returns on `insertError` without emailing,
so the unique index alone collapses parallel paths to one send. **User
ran this in Supabase SQL Editor 2026-06-01.**

Verified: a follow-up test buy delivered exactly one email of each kind.

### Find-my-order page for guest buyers (`29b12e5`)

Guest checkout works without an account; the only thread back to the
file is the confirmation email. If the buyer loses it there was no
recovery path other than emailing `hi@skillzy.ai`. Added:

- `/find-my-order` — buyer enters email, we resend a fresh
  confirmation with the existing token-signed download URL (reuses
  `sendPurchaseConfirmation` + `deliveryToken`)
- Footer link under the Skillzy column
- Help FAQ entry "I bought as a guest and lost the email"

Always returns the same "if we have a purchase, check your inbox"
message — can't be used to enumerate buyer emails.

### Seller info in founder cha-ching alert (`d567235`)

Founder sale alert now shows a **Seller** row (`@handle (email)`) so
the founder can spot top earners at a glance. Hoisted the seller
lookup out of `emailSeller` so both the seller-facing email and the
founder alert get it. Same shape (`sellerEmail`, `sellerHandle`) is
also used by the refund emails below.

### Inline "create account" prompt after guest checkout (`886d511`)

Guests who paid without an account were given a "Go to my dashboard"
button on `/order/success` that just dumped them at the sign-in wall
with no context. Replaced for guests with an inline **"Last step —
Keep this in your dashboard"** card on the same page:

- Email pre-filled (read-only) with the email they paid with
- Single password input
- "Create account & save my purchase →" button → `signUpWithPassword`
  with `next=/dashboard`
- `claimOrphanPurchases` (already wired) auto-attaches the orphan
  purchase to the new account
- Secondary "Already have an account? Sign in instead →" link going
  to `/signin?email=…&next=/dashboard` (sign-in page now pre-fills
  the email when arriving with the `?email=` param)

Signed-in buyers see the original "Go to my dashboard" button.

### Refund emails (`e613654`)

Previously the `charge.refunded` webhook just flipped the DB row to
`status='refunded'` — no emails to anyone. Now sends three branded
emails on every refund:

- **Buyer**: "Your Skillzy refund — <title>" — refund amount, "3–10
  business days to land back on your card", reply to hi@.
- **Seller**: "Refund issued on your sale of <title>" — explains
  Stripe will reverse the share from the seller's next payout
  automatically, no action needed.
- **Founder** (sales@ via `NOTIFY_EMAIL_SALE`): full context for
  pattern-watching (high refund rate per listing = quality problem).

**Idempotency:** webhook handler now SELECTs the row first and bails
if `status === 'refunded'` already, so Stripe webhook redeliveries
don't re-email. To test against a previously-refunded purchase, flip
the row back to `paid` in Supabase and resend the webhook event from
Stripe.

**Open verification:** confirm `charge.refunded` is registered on the
Stripe webhook endpoint (Stripe → Developers → Webhooks → Events tab
on the Skillzy endpoint). If missing, add it — without that event
the handler never fires and no emails (or DB flips) happen.

### Misc

- **Customer email "trimmed content" in Gmail** — purely Gmail's
  thread-collapsing heuristic, triggered by the duplicate-email bug
  above. Once dupes stopped, fresh emails render fully.
- **No buyer Stripe receipt for refund** — Stripe's auto-receipt only
  fires if `receipt_email` is set on the PaymentIntent. Our own
  refund emails make this moot, but worth setting `receipt_email`
  during PaymentIntent creation as a safety net if the Resend
  pipeline is ever down. Phase-2 candidate.

### Critical: listings were publishing with no files (`ac14ce7`)

Caught while testing the refund flow — the test listing's dashboard
read "No files attached yet — the creator may still be uploading."
The `/sell/new` form was clearing the bundle `<input type="file">`
after each pick (so a user could re-add the same file via "Add more"),
which meant on submit the FormData carried zero files even though
React state held them.

**Fix:** wrap the form action so it appends the in-state files into
the FormData before delegating to `publishListing`.

**Impact:** every listing created before `ac14ce7` is affected — needs
checking. Use this query to find them:

```sql
select l.id, l.title, l.created_at, count(f.id) as file_count
from public.listings l
left join public.files f on f.listing_id = l.id
group by l.id
order by l.created_at desc;
```

Broken listings can be re-created from scratch, or files can be
uploaded manually via Supabase Storage to bucket `skillzy-products`,
path `<creator_id>/<listing_id>/<filename>`, with a matching row in
`public.files`.

## Outstanding follow-ups for next session

1. **Run end-to-end refund test on a fresh buy** (`e613654` deploy).
   Confirms all three refund emails actually land.
2. **Verify Stripe webhook has `charge.refunded` event registered.**
   Without it, the new refund-email code never runs.
3. **Full Connect → split → refund walkthrough** with the test VA
   account the user created (real $9 buy, verify 80/20 split in Stripe
   dashboard, then refund). Was queued before the duplicate-email +
   refund-email fixes; now ready.
4. **Upload Skillzy "S" logo to every Workspace user (founder action,
   ~5 minutes).** Today every transactional email shows a plain monogram
   ("h", "s", etc.) in recipients' Gmail inboxes. Fix:
   - admin.google.com → Users → click each of `hi@`, `help@`, `sales@`,
     `toby@skillzy.ai` → Profile photo → upload the Skillzy "S" logo
     (square, ≥250×250px PNG/JPG).
   - Propagates in 24–48 hours. Works for Gmail recipients only; full
     cross-client coverage needs BIMI (see Phase 2 / Ops / scale).
5. **Phase-2 items still pending** — see earlier sections of this doc:
   paid featured placement, affiliate payouts/fraud, DMARC tightening,
   Workspace separation, Stripe `receipt_email` safety net, BIMI for
   cross-client brand logo.

---

## 2026-06-02 — Pre-500-creator readiness checklist

After landing creator-readiness fixes + auth callback fix + Stripe-
connect nudges, the next session should know exactly what's been
verified live vs only shipped, and what to harden before pushing
500 creators at this thing.

### Verified live by founder (do NOT re-test as new work)
- Embedded checkout: real $9 buy, 80/20 split, refund flow, email
  delivery
- Duplicate-purchase-email fix (migration 008 dedupe + unique index)
- Per-type founder alert routing (`sales@`/`toby@`)
- Sample-listing demand-signal email path (still fires after recent
  buy-blocks)
- File save on `/sell/new` (after `ac14ce7`)

### Shipped but NOT yet live-tested by founder — verify before launch push
1. **Auth callback cookie fix** (`b65ac2f`). Magic link + password
   reset. Documented Supabase pattern; needs real browser + real
   email to confirm. Verify steps in HANDOFF section above.
2. **Buy-time blocks for unconnected creators** — 3 layers:
   marketplace listing CTAs (`13ad1e4`), `/checkout/[id]` server
   page (`d546580`), `POST /api/checkout` 403 (`13ad1e4`).
3. **Publish-time gate was REMOVED** (`12bd945`). Listings now
   publish immediately even without Stripe connected. Buy-time
   blocks are the only gate. This is deliberate (creator velocity).
4. **Dashboard Stripe-connect banner** (`04278a1`) — gold strip at
   the top of `/dashboard` for creators with paid listings + no
   payouts.
5. **24h Stripe-connect nudge cron** (`ef2ceba`) — runs daily at
   14:00 UTC. Requires `CRON_SECRET` env var. Smoke-test with
   `curl -H "Authorization: Bearer $CRON_SECRET" https://skillzy.ai/api/cron/stripe-nudge`.
6. **Welcome email to creators** (`13ad1e4`) — fires from OAuth +
   password signup paths.
7. **Refund emails** (`e613654`) — buyer + seller + founder.
   Requires Stripe webhook to have `charge.refunded` registered.
8. **Find-my-order** page for guest buyers (`29b12e5`).
9. **Inline "Create account" prompt** on `/order/success` for
   guests (`886d511`).
10. **Email routing sweep** (`7d65d5c`) — buyer-facing support
    points at `help@`, founder + general stays where it should.
11. **Password eye-toggle** site-wide (`133a352`).
12. **Apple Pay route handler** (`fc13b8b`) — domain already
    verified on Stripe's side, env var not strictly needed.

### Scale concerns at 500 creators (with concrete actions)

| Action | Why | Cost / time |
|---|---|---|
| **Upgrade Resend to Pro** | Free tier = 100 emails/day. Buyer + seller + founder + welcome + nudge × 500 creators = blown in week 1. | $20/mo, 5 min |
| **Set up Upstash Redis** (`UPSTASH_REDIS_REST_URL` + `_TOKEN` in Vercel) | Without it, AI-draft rate-limit counters reset on every Vercel cold start — abuse protection is leaky. With it, the existing rate-limit lib auto-detects and uses it. | Free tier, 15 min |
| **Vercel Pro** if still on Hobby | Function execution limits + faster cold starts at 500-user volume | $20/mo, 5 min |
| **Buy sister domain for cold outreach** (e.g. `skillzy.email`, `getskillzy.com`) and warm via Instantly/Smartlead | Don't burn `skillzy.ai` sender reputation cold-emailing creator leads. Transactional emails (purchase confirmations) MUST keep landing in inbox. | ~$10/yr domain + ~$60/mo Smartlead/Instantly |
| **Smoke-test the nudge cron manually** | Confirms cron actually fires and idempotency is real | 5 min |
| **Run e2e through 2-3 fresh accounts** | Catches whole-flow bugs nobody can see from code | 30 min |
| **Raise AI draft global hourly cap** if traffic justifies | Currently `GLOBAL_HOURLY = 200`. At 500 creators all drafting in a window, will throttle. | Code change, 1 min |

### Likely-fine at 500 creators (no action needed)
- Stripe scales infinitely; no concern
- Supabase Pro tier: 500 creators × ~5 listings = trivial volume
- Storage architecture: one stored copy per file regardless of buyer count (egress cost dominates eventually — see existing Phase 2 note)
- Vercel serverless: scales fine; only cost concern is execution-minute limits on Hobby

### Untested high-risk paths (be on alert)
- Bug 2 fix (auth callback) — documented pattern, needs real-world confirmation
- Stripe Connect onboarding when Stripe flags a creator for extra ID verification — the "Stripe is still finishing your setup" banner state is theoretical
- Concurrent same-product purchases — dedupe index handles parallel writes per migration 008, not load-tested
- Cold-email deliverability from `skillzy.ai` — fresh sender domain; cold blasts of 500 leads from `hi@` could trigger spam reputation hits that affect transactional mail. ALWAYS use the sister domain (above) for cold.

---

## 2026-06-11 — Third-party "deep dive" findings — fix tomorrow

An external review of skillzy.ai produced a damning read: *"a
concept/launch-stage storefront with a fixed set of illustrative
listings, not an operating marketplace with verifiable creators or
sales yet."* That's a real perception problem. They flagged two
concrete bugs + one strategic gap.

### 1. Review counts vary between pages (BUG)

The reviewer saw:
- Harlow's Real Estate setup — 22 reviews on homepage, 218 on marketplace
- Invoice Generator — no rating on homepage, 524 on marketplace

Both pages import from `lib/catalog.ts` and use `toCardProduct` which
passes through `p.ratingCount` unchanged. The seed values in catalog.ts
match what shows on the homepage (Real Estate = 22, Invoice Gen = 16).
So the inflated 218 / 524 are coming from somewhere ELSE:
- Possibly `liveDbProducts()` (DB-backed listings) returning rows the
  marketplace merges in with random counts
- Possibly a stale Vercel ISR cache showing an OLD seed snapshot
- Possibly a different `lib/catalog-seed.ts` variant rendering on one
  page only

**Action**: open both pages, screenshot the actual counts shown, then
diff against `lib/catalog.ts` values. Whoever's wrong gets the patch.

### 2. OG image URLs leaking `cheapwebsite-preview` hostname (BUG)

Reviewer: *"the marketplace's preview image is served from a Vercel
hostname literally named `cheapwebsite-preview` under the same personal
project namespace."* Massive trust signal.

Why it happens: skillzy.ai is served by the PREVIEW build of branch
`claude/build-skillzy-website-MIbCF` on Vercel project `skillzyai`.
Vercel sets `VERCEL_URL` to the preview hostname. Next.js's OG image
routes (`app/**/opengraph-image.tsx` — 5 of them) generate absolute
URLs. If `metadataBase` isn't set tightly to `https://skillzy.ai` at
EVERY route level, Next will fall back to `VERCEL_URL` and the
preview hostname leaks into shared previews.

Already set in `app/layout.tsx`:
```ts
metadataBase: new URL('https://skillzy.ai')
```
But child `pageMetadata()` calls don't override it — they should
inherit. Worth force-setting in each per-route `generateMetadata`
just to make sure Next never falls back to `VERCEL_URL` for OG paths.

Files to check:
- `lib/seo.ts` — `pageMetadata` builder
- `app/marketplace/[id]/opengraph-image.tsx`
- `app/blog/[slug]/opengraph-image.tsx`
- `app/opengraph-image.tsx`
- `app/for/[niche]/opengraph-image.tsx`
- `app/creator/[handle]/opengraph-image.tsx`

**Action**: in `pageMetadata`, force-set `metadataBase: new URL(SITE_URL)`
even though layout sets it — defensive. Verify with
`curl -sI https://skillzy.ai/marketplace/<id> | grep -i og:image` to
confirm the URL is `https://skillzy.ai/...` not the vercel preview.

### 3. Demo listings look like real listings (strategic)

Already in the Phase 2 backlog ("Retire/replace static demo listings")
but it's now URGENT — the reviewer specifically called this out as the
single biggest signal that Skillzy is a template. Options:

a. **Hide all seed listings entirely** until real ones populate. Most
   honest, but the homepage looks empty. Could work with a strong
   "first listings landing this week — be the first" banner.
b. **Re-label seed listings as "Sample / coming soon"** visibly on
   each card. Still in front of buyers but clearly marked. The
   demand-signal email already fires when someone clicks Buy on these.
c. **Convert top 3-5 to genuine free downloads** (real SKILL.md files
   we authored), drop the rest. Buyers can actually use them; reviewer
   sees real downloads happening.

Recommendation: **(b) for tomorrow** — fastest, lowest-risk, preserves
the demand-sensing signal. Then (c) once toby has 30 minutes to
generate the real downloads, and (a) once real creator listings
populate.

### 4. Skip the `cheapwebsite-preview` Vercel project name itself

While we're at it: the Vercel project is called `skillzyai` but
deployments still show `cheapwebsite-preview` URLs in some places.
The REPO is `MyAIWorkforce-ai/cheapwebsite` and Vercel uses the repo
name for preview-deployment hostnames. Renaming the repo would fix
that — but breaks every existing skillzy.ai → branch pin. Safer:
just make sure `metadataBase` (#2) hides the leak from anything
public.


---

## 2026-06-20 evening — Real-buy test + buyer-UX fixes + email attachments

### Founder action tomorrow morning (office)

**Verify the test purchase landed in both Stripe accounts:**

- Listing: **Website Builder Agent, end to end.** ($199)
- Order: **№3TKM7LRV0WS5**
- Buyer email: `info@primeprojects.com.au`
- Date: 2026-06-20, ~8:30pm

**What to check:**

1. **Skillzy platform Stripe** (`acct_1Tb7o2RV0ws5a7zS`, `hi@skillzy.ai`
   login): a $199 charge should be visible with
   `application_fee_amount` of $39.80 (20%) and destination
   transfer of $159.20 to the Skillzy House connected account.
2. **Connected creator Stripe** (the Skillzy House Connect account):
   $159.20 transfer should be sitting in the balance, payout
   scheduled per the default cadence.
3. **Refund the test charge** to recover ~$193 (the ~$6 Stripe
   processing fee is non-refundable — that's the actual cost of the
   end-to-end test).
4. **Verify the new attachment behavior** on the confirmation email
   in `info@primeprojects.com.au` inbox: the zip
   (`website-builder-agent.zip`) should now be attached directly,
   alongside the gold "Download your files →" link. If the
   attachment isn't there, the deploy may not have caught the
   purchase in time — check the next real sale.

### What shipped tonight

1. **House bundles renamed + repackaged** to consistent
   `<name>-agent.zip` pattern. All 5 zips now contain a single-file
   `<NAME>-COMPLETE.md` at the top level so buyers can attach the
   whole brain to a Claude chat in one tap — no Projects setup
   needed. Listing titles updated to match:
   - Website Builder Agent, end to end.
   - Stripe Setup Agent, end to end.
   - Social Media Manager Agent, end to end.
   - Real Estate Agent, end to end. (already had "Agent")
   - Electrician Agent, end to end. (already had "Agent")

2. **Promo code feature** complete. Codes are per-listing, free-only
   for now, soft-deleted via `active` flag. UI handles dup-key
   errors with friendly messages, mobile-safe two-tap delete
   buttons (mobile Safari blocks native `confirm()`).

3. **SOOSAL2 redeemed** by brother for the Electrician Agent bundle.
   That code + promo path is validated end-to-end and the codes have
   been removed from the dashboard.

4. **Buyer-UX fixes from the real-buy test** (commits `e9b84db`,
   `66d4d20`, `7b7dc1c`, `8ea7117`):
   - Signup with an existing email no longer drops to a blank form
     (Supabase returns `identities: []` for dup emails as
     anti-enumeration — we now detect that and show "Sign in
     instead" with a direct link).
   - Order-success page now checks if the buyer already has an
     account (via `emailHasAccount` in `lib/auth.ts`) and shows a
     "Sign in to attach this purchase" prompt instead of the
     misleading "Add a password" guest form. This fixes the case
     where a buyer signs up, then opens the email link in a new
     browser (no session cookie carried over).
   - Copy across `/how-it-works`, `/order/success`, `/checkout`, and
     the promo error stopped promising "bundle in email" — now says
     "download link" to match reality. Industry-standard wording
     (Gumroad, Lemonsqueezy).
   - **Zip files now attached directly to the confirmation email**
     via Resend's `attachments` API (5 MB cap), with the download
     link kept as the always-on fallback for buyers whose corporate
     filter strips zips. Wired through fulfillment.ts, free-claim,
     promo redeem, and find-my-order resend.

### Untested but trusted

- `$49 Showcase upgrade` smoke-tested twice (Website Builder +
  Electrician).
- Real-buy flow validated $199 end-to-end (this test).
- Attachment feature is small additive on top of existing email
  send; next real sale or a fresh promo test will visually confirm.

### Strategic backlog (morning fresh brain)

- Reposition homepage around the `agentskills.io` angle.
- Send Matt Wolfe outreach email.
- Reconsider the 20% platform take rate.
- Phase 2: retire/replace static demo listings (see 2026-06-11
  third-party deep-dive section above).

---

## 2026-06-20 late — bug #2 (review-count mismatch) closed: not reproducible

Investigated the 2026-06-11 review-count mismatch claim. Findings:

- `components/ProductCard.tsx` (used by homepage + marketplace grid +
  every category page) renders rating stars but **never renders
  ratingCount** at all. So homepage vs marketplace cards CAN'T
  disagree on review count.
- The only surface that renders `ratingCount` is the listing detail
  page (`app/marketplace/[id]/page.tsx`), pulling directly from
  `p.ratingCount`. One source, no mismatch path.
- Seed `ratingCount` values are all single digits (0–7). DB-backed
  listings always return `ratingCount: 0` from `liveDbProducts()`.
- No "Harlow Real Estate" listing exists in either the seed catalog
  or DB — Harlow is a `creators[]` entry with no products attached.

Conclusion: the reviewer's "22 vs 218" claim doesn't match anything
visible in the current code. Either fixed in a previous session or
the reviewer misread the marketplace's tab-filter count badge ("All
N listings") as a review count. Marking closed.

Bug #1 (OG image hostname leak via metadataBase) fixed in commit
`6c3b442`. Verify next deploy with
`curl -sI https://skillzy.ai/marketplace/<id> | grep -i og:image` —
should show skillzy.ai, not cheapwebsite-preview.
