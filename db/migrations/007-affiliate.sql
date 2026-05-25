-- =====================================================================
-- Skillzy — AFFILIATE program migration (007)
-- Paste into Supabase SQL editor and Run. Fully idempotent.
--
-- Every account is an affiliate by default: their affiliate code IS
-- their profile handle, so the link is skillzy.ai/?aff=<handle>.
-- When a NEW creator signs up via that link, profiles.referred_by is
-- set to the affiliate's id (once, permanently). Each paid sale by a
-- referred creator within 12 months books a 5% earning row, carved
-- from Skillzy's 20% platform fee (creator's 80% is untouched).
-- =====================================================================

-- Who referred this creator (the affiliate's profile id) + when.
alter table public.profiles
  add column if not exists referred_by uuid references public.profiles (id) on delete set null,
  add column if not exists referred_at timestamptz;

create index if not exists profiles_referred_by_idx on public.profiles (referred_by);

-- Affiliate earnings ledger — one row per qualifying sale. Fully
-- auditable; status drives the (later) payout batch.
do $$ begin
  create type affiliate_earning_status as enum ('pending', 'approved', 'paid', 'void');
exception when duplicate_object then null; end $$;

create table if not exists public.affiliate_earnings (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid not null references public.profiles (id) on delete cascade,
  creator_id uuid references public.profiles (id) on delete set null,
  purchase_id uuid references public.purchases (id) on delete set null,
  amount_cents integer not null default 0,
  currency text not null default 'usd',
  status affiliate_earning_status not null default 'pending',
  created_at timestamptz not null default now(),
  unique (purchase_id)            -- one earning per sale, idempotent
);

create index if not exists affiliate_earnings_affiliate_idx on public.affiliate_earnings (affiliate_id);

alter table public.affiliate_earnings enable row level security;

-- Affiliates can read their own earnings. Writes happen via the
-- service-role client in fulfilment, which bypasses RLS.
drop policy if exists "affiliate_earnings_read_self" on public.affiliate_earnings;
create policy "affiliate_earnings_read_self"
  on public.affiliate_earnings for select
  using (auth.uid() = affiliate_id);
