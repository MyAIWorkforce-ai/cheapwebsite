-- 010-listing-promo-codes.sql
--
-- Per-listing promo codes. v1 = 100% off ("free copy") only. Future
-- can add percentage discounts via a discount_type column without a
-- breaking change.
--
-- Use case: founders giving away free copies to seed early creators,
-- friends-of-the-platform, conference demos, hot-tub fixes for the
-- electrician who keeps the listing alive on Reddit, etc.
--
-- Optional redemption cap so you can hand out N free copies, then
-- the code closes itself.
--
-- Idempotent.

create table if not exists public.listing_promo_codes (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings (id) on delete cascade,
  code text not null,
  -- v1 only supports 'free' (100% off). Schema is shaped to add
  -- 'percent_off' or 'amount_off' later without a migration.
  discount_type text not null default 'free'
    check (discount_type in ('free')),
  -- null = unlimited; integer = cap on total redemptions.
  max_redemptions integer,
  -- bumped atomically whenever a purchase is recorded with this code.
  redemption_count integer not null default 0
    check (redemption_count >= 0),
  -- soft delete: owner can disable a code without losing the audit
  -- trail of past redemptions.
  active boolean not null default true,
  created_at timestamptz not null default now(),
  -- Codes are case-insensitive within a listing — uppercase before
  -- compare. Postgres unique index uses upper() for that.
  constraint listing_promo_codes_unique unique (listing_id, code)
);

create index if not exists listing_promo_codes_listing_active_idx
  on public.listing_promo_codes (listing_id)
  where active;

create unique index if not exists listing_promo_codes_code_ci_idx
  on public.listing_promo_codes (listing_id, upper(code));

alter table public.listing_promo_codes enable row level security;

-- Owners can read + write codes on their own listings.
drop policy if exists "promo_codes_owner_all" on public.listing_promo_codes;
create policy "promo_codes_owner_all"
  on public.listing_promo_codes for all
  using (
    exists (
      select 1 from public.listings l
      where l.id = listing_id and l.creator_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.listings l
      where l.id = listing_id and l.creator_id = auth.uid()
    )
  );

-- Public has NO direct read access — code lookup goes through the
-- API with the service-role client to avoid leaking valid codes by
-- enumeration.

-- Track on purchases which code (if any) was used, so the dashboard
-- + admin can attribute revenue / freebies.
alter table public.purchases
  add column if not exists promo_code_id uuid
    references public.listing_promo_codes (id) on delete set null;

create index if not exists purchases_promo_code_idx
  on public.purchases (promo_code_id)
  where promo_code_id is not null;
