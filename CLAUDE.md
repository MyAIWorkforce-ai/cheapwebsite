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
  launch). The dashboard/Stripe/Supabase steps are founder actions, not
  things Claude can do.
- **`BACKEND-SETUP.md`** and **`README.md`** — environment and setup.

## Key facts pulled from the handover docs

- **Payments work with real money.** Checkout is embedded (Stripe Payment
  Element), order fulfilment runs idempotently on the post-payment return
  page — no webhook required for checkout (webhook is an optional safety net).
- **Stripe Connect Standard** with 20% application fee ("Skillzy"); creators
  receive 80% to their own connected account.
- **Hosting:** Vercel project `cheapwebsite-preview`. `skillzy.ai` (apex) is
  pinned to branch `claude/build-skillzy-website-MIbCF` and deploys as a
  **Preview** build, so env vars must be scoped to Production **and** Preview.
- **DB:** Supabase. Migrations live in `db/`. Affiliate "Refer & earn" needs
  `db/migrations/007-affiliate.sql` run to activate.
- Review-request emails are built but need founder activation (see
  HANDOFF.md "Review-request emails" section).

## Conventions

- Don't ship founder-decision items automatically — HANDOFF.md flags these.
- After meaningful work, append a dated note to `HANDOFF.md` so the next
  session inherits the context.
