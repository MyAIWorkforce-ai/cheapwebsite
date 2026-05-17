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

### Step 1 — Point skillzy.ai at this branch (Vercel, ~3 min)

1. vercel.com → log in → open the project whose **Domains** list
   includes `skillzy.ai`.
2. Settings → Git → confirm the repo is `MyAIWorkforce-ai/cheapwebsite`.
3. Settings → Git → **Production Branch**: set it to
   `claude/build-skillzy-website-MIbCF` and save.
4. Deployments → ⋯ on the latest → **Redeploy**.
5. Settings → Domains → confirm `skillzy.ai` shows **Valid** for this
   project.

### Step 2 — Stripe keys, TEST first (Stripe + Vercel, ~5 min)

1. stripe.com → log into the shared account → turn **Test mode ON**
   (top toggle).
2. Developers → API keys → copy the **Secret key** (`sk_test_…`) and
   **Publishable key** (`pk_test_…`).
3. Vercel → Skillzy project → Settings → Environment Variables, add for
   **Production** (paste keys directly — never share them in chat/email):
   - `STRIPE_SECRET_KEY` = `sk_test_…`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_test_…`
   - `NEXT_PUBLIC_SITE_URL` = `https://skillzy.ai` (if not already set)
4. Redeploy (env changes need a redeploy).
5. Confirm `RESEND_API_KEY` and the Supabase vars already exist in this
   project (needed for the confirmation email + recording the sale).

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
