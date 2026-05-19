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
