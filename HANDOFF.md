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

## Outstanding — infra (NOT code; needs Vercel + Stripe logins)

These do not require Monty specifically — anyone with the logins can
do them in ~10 min. There are only TWO:

1. **Deployment** — confirm skillzy.ai is served by the Vercel project
   that builds branch `claude/build-skillzy-website-MIbCF`.
2. **Stripe keys in Skillzy's Vercel env** (from the existing/shared
   Stripe account — Dashboard → Developers → API keys):
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - (`STRIPE_WEBHOOK_SECRET` is **no longer required** — leave unset.)

Do NOT change account branding, disable Stripe emails, delete Payment
Links, or create a new Stripe account.

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
