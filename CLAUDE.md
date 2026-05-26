# CLAUDE.md — project memory & handover

This repo powers **Skillzy** (skillzy.ai), a Next.js marketplace where
creators list skills and buyers pay via embedded Stripe checkout. It also
hosts My AI Workforce content; the two share one codebase.

## Start here — read these every session

Claude Code web sessions are ephemeral and isolated, so all cross-session
memory lives in committed files. Before doing work, read:

- **`HANDOFF.md`** — the running engineering log: what's shipped, what's
  outstanding, decisions made, and dated session notes (newest sections at
  the bottom). Treat the latest dated section as current truth when older
  sections conflict.
- **`LAUNCH-MORNING.md`** — the start-to-finish launch checklist (new
  Skillzy Stripe account → env vars → Supabase settings → tests → soft
  launch). The dashboard/Stripe/Supabase steps are founder actions.
- **`BACKEND-SETUP.md`** and **`README.md`** — environment and setup.

## Key facts pulled from the handover docs

- **Payments work with real money.** Checkout is embedded (Stripe Payment
  Element), order fulfilment runs idempotently on the post-payment return
  page — no webhook required for checkout (webhook is an optional safety net).
- **Separate Skillzy Stripe account (cut over 2026-05-26):**
  `acct_1Tb7o2RV0ws5a7zS` ("Skillzy AI"), under the `hi@skillzy.ai` login
  (same login also has My AI Workforce — use the account switcher).
- **Stripe Connect is Standard via OAuth**, 20% application fee. Creators
  connect their OWN existing Stripe account. The flow reads
  **`STRIPE_CONNECT_CLIENT_ID`** (`ca_…`). ⚠️ If that env var holds the old
  My AI Workforce `ca_`, the connect screen says "My AI Workforce" even
  when the secret key is correct — the platform name comes from the `ca_`.
  Skillzy's is `ca_UaJ871vInQjGSz18qY4KH0oYs6tScEZN`.
- **Four Stripe env vars** (Vercel project `skillzyai`, Production+Preview):
  `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
  `STRIPE_WEBHOOK_SECRET`, `STRIPE_CONNECT_CLIENT_ID`.
- **Hosting:** Vercel project `skillzyai`. `skillzy.ai` (apex) is pinned to
  branch `claude/build-skillzy-website-MIbCF` and deploys as a **Preview**
  build, so env vars must be scoped to Production **and** Preview, and a
  redeploy must rebuild THAT branch (not `main`).
- **DB:** Supabase (`pbcfhpemrrxpshxfhhad`). Migrations live in `db/`. The
  signup trigger `handle_new_user` was hardened 2026-05-26 (handle-dedupe +
  exception guard) after "Database error saving new user" blocked all
  signups — see HANDOFF.md.

## Conventions

- Don't ship founder-decision items automatically — HANDOFF.md flags these.
- After meaningful work, append a dated note to `HANDOFF.md` so the next
  session inherits the context.
