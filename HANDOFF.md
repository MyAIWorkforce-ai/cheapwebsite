# Skillzy embedded checkout — handoff

> Temporary coordination doc for the embedded-checkout cutover.
> **Delete this file once the "Outstanding" steps are done and verified.**

Branch: `claude/build-skillzy-website-MIbCF` · Commit: `e194d83`

## Done (code, pushed)

- Checkout is embedded on the Skillzy page (Stripe Payment Element,
  Skillzy-themed) — no redirect to a Stripe-hosted page.
- PaymentIntent is created at submit time with the buyer email in
  metadata. No `receipt_email` is set, so Stripe never sends its
  account-branded receipt — Skillzy sends its own via Resend.
- Webhook handles `payment_intent.succeeded` (records the sale + sends
  the Skillzy confirmation), retry-safe.
- Build passes. One shared Stripe account; My AI Workforce untouched.

## Outstanding — infra, needs Monty (no code)

1. Confirm skillzy.ai serves this app — the Vercel project must build
   branch `claude/build-skillzy-website-MIbCF`.
2. Set Skillzy Vercel env vars to the shared Stripe account's values:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET` (from the new endpoint in step 3)
3. Add a NEW webhook endpoint on the same Stripe account (do NOT modify
   the existing My AI Workforce one):
   - URL: `https://skillzy.ai/api/webhooks/stripe`
   - Events: `payment_intent.succeeded`, `checkout.session.completed`,
     `account.updated`, `charge.refunded`
4. Do NOT change account branding, disable Stripe emails, delete Payment
   Links, or create a new Stripe account.

## Decide (optional, Monty)

- The buyer's bank/card statement line still uses the shared account's
  statement-descriptor prefix (account-level, not code-controllable).
  In-app + email are 100% Skillzy. If the statement prefix matters, set
  it to something brand-neutral. Per-product suffix (`SKILLZY-…`) is
  already applied by the code.

## Verify (after steps 1–3)

- Live test purchase on skillzy.ai. Confirm: buyer never leaves Skillzy,
  no "My AI Workforce" anywhere in checkout or email, sale recorded,
  Skillzy confirmation email received.
- Must be a live re-test (no network/Stripe in the build environment).
