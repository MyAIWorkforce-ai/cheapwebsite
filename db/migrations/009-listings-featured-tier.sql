-- 009-listings-featured-tier.sql
--
-- Adds a paid-feature column to public.listings so creators can buy
-- a premium "Showcase" treatment on the marketplace (navy/emerald
-- card, top placement). $199 one-time, permanent for v1.
--
-- featured_tier:
--   null         → standard cream card
--   'showcase'   → navy/emerald premium card, sorts first
--
-- featured_started_at:
--   set when the Stripe webhook flips featured_tier. Kept around so
--   we can introduce a time-bounded feature later without another
--   migration; today it's purely informational.
--
-- Idempotent (ADD COLUMN IF NOT EXISTS).

alter table public.listings
  add column if not exists featured_tier text
    check (featured_tier in ('showcase'));

alter table public.listings
  add column if not exists featured_started_at timestamptz;

-- Index to make the marketplace ORDER-BY-featured-first query cheap.
create index if not exists listings_featured_tier_idx
  on public.listings (featured_tier)
  where featured_tier is not null;
