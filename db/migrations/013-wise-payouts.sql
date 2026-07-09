-- Global creator payouts via Wise Business API.
--
-- Introduced 2026-07-09 after two Instagram-recruited creators (India)
-- hit the Stripe Connect country wall. Wise covers ~160 countries with
-- a proper API + no monthly fee, so creators outside Stripe's ~45
-- supported countries can still get their 80% split, straight to a
-- Wise account or local bank.
--
-- Money flow: Wise creators' sales stay on the Skillzy platform Stripe
-- balance (no transfer_data.destination). Every purchase row records
-- the 80% owed with payout_status = 'pending'. A separate nightly
-- Vercel cron (Phase 2) sums pending by creator and, once balance
-- crosses $50, fires a Wise API transfer + flips those rows to
-- 'paid_out' with the wise_transfer_id + paid_out_at recorded.
--
-- Idempotent — safe to re-run.

-- ==========
-- profiles: creator payout method choice + Wise recipient details.
-- ==========

alter table public.profiles
  add column if not exists payout_method text
    check (payout_method in ('stripe', 'wise'));

-- Stored on the creator's profile so the checkout API can decide
-- whether to route via Stripe destination charge or hold funds for
-- a Wise batch payout. Only one method active per creator at a time.

alter table public.profiles
  add column if not exists wise_recipient_name text;

alter table public.profiles
  add column if not exists wise_recipient_country text;
  -- ISO 3166 alpha-2 (e.g. 'IN', 'PK', 'NG'). Used to shape the
  -- Wise recipient payload and pick the right local bank fields.

alter table public.profiles
  add column if not exists wise_recipient_currency text;
  -- ISO 4217 (e.g. 'INR', 'USD', 'EUR'). What Wise pays the creator
  -- in. FX from USD sale → recipient currency is Wise's problem.

alter table public.profiles
  add column if not exists wise_recipient_email text;
  -- If the creator has a Wise personal account, we pay via email
  -- (Wise auto-routes to their attached bank). Simplest path.

alter table public.profiles
  add column if not exists wise_recipient_details jsonb;
  -- Country-specific bank fields (IBAN, accountNumber+IFSC for India,
  -- routingNumber+accountNumber for US, BSB+account for AU, etc.).
  -- Kept as jsonb so we don't have to migrate for every new country.

alter table public.profiles
  add column if not exists wise_recipient_id text;
  -- Wise's internal ID for the recipient once we've created it via
  -- their API. Cached so we don't re-create on every payout.

alter table public.profiles
  add column if not exists payout_method_updated_at timestamptz;
  -- When the creator last saved a payout method. Useful for audit +
  -- for showing "Payout details updated 3 days ago" in the dashboard.

-- ==========
-- purchases: per-sale payout tracking so we know what's owed via
-- Wise, what's already paid out, and via which provider.
-- ==========

alter table public.purchases
  add column if not exists payout_provider text
    check (payout_provider in ('stripe_connect', 'wise'));

alter table public.purchases
  add column if not exists payout_status text
    check (payout_status in ('not_owed', 'pending', 'paid_out', 'failed'))
    default 'not_owed';
  -- 'not_owed' — creator hadn't set any payout method at sale time, so
  --              per policy §6 the money stays with Skillzy.
  -- 'pending'  — Wise creator, money owed, waiting for next cron run.
  -- 'paid_out' — money reached the creator (Stripe destination charge
  --              or Wise transfer).
  -- 'failed'   — Wise API rejected the transfer; needs manual retry.

alter table public.purchases
  add column if not exists wise_transfer_id text;
  -- Wise's transfer ID after a successful POST /transfers call. Used
  -- to trace individual payouts + reconcile against Wise dashboard.

alter table public.purchases
  add column if not exists paid_out_at timestamptz;
  -- When the money actually reached the creator's account.

-- Fast lookup for the nightly cron: "give me every pending row grouped
-- by creator". Partial index so we don't waste space indexing settled
-- rows (which will vastly outnumber pending ones once the site scales).
create index if not exists purchases_pending_payout_idx
  on public.purchases (listing_id)
  where payout_status = 'pending';

-- ==========
-- Backfill existing rows so the new columns reflect what already
-- happened. Historic Stripe-Connect sales are already paid out; the
-- 100%-to-Skillzy sales are 'not_owed' (matches policy §6).
-- ==========

update public.purchases
set payout_provider = 'stripe_connect',
    payout_status = 'paid_out',
    paid_out_at = coalesce(paid_out_at, created_at)
where status = 'paid'
  and creator_payout_cents > 0
  and payout_provider is null;

-- Any paid purchase with a 0 creator_payout stays 'not_owed' (default),
-- so no update needed for those.
