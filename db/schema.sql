-- =============================================
-- Skillzy schema. Run this in Supabase SQL editor.
-- Designed for the marketplace described in BUILD_DOC:
--   listings (Skill / Guide / Agent Setup),
--   purchases, reviews, creator profiles,
--   Stripe Connect accounts, downloadable files.
-- =============================================

-- Helpful extensions.
create extension if not exists "pgcrypto";
create extension if not exists "citext";

-- =========
-- profiles
-- =========
-- One row per auth.users row. Public-readable for creator pages.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  handle citext unique,
  name text,
  bio text,
  avatar_url text,
  -- Stripe Connect (creator payouts)
  stripe_account_id text,
  stripe_payouts_enabled boolean not null default false,
  -- timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_read_all" on public.profiles;
create policy "profiles_read_all"
  on public.profiles for select
  using (true);

drop policy if exists "profiles_owner_update" on public.profiles;
create policy "profiles_owner_update"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "profiles_owner_insert" on public.profiles;
create policy "profiles_owner_insert"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create a profile on user sign-up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, handle, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(
      new.raw_user_meta_data->>'user_name',
      new.raw_user_meta_data->>'preferred_username',
      split_part(new.email, '@', 1)
    ),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========
-- listings
-- =========
do $$ begin
  create type listing_type as enum ('skill', 'guide', 'agent_setup');
exception when duplicate_object then null; end $$;

do $$ begin
  create type listing_status as enum ('pending_review', 'live', 'removed');
exception when duplicate_object then null; end $$;

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  creator_id uuid not null references public.profiles (id) on delete cascade,
  type listing_type not null,
  status listing_status not null default 'pending_review',
  title text not null,
  tagline text,
  niche text,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'usd',
  version text default 'v1.0',
  platform_list text[] not null default '{}',
  description jsonb not null default '[]'::jsonb,    -- string[]
  what_you_get jsonb not null default '[]'::jsonb,   -- string[]
  how_it_works jsonb not null default '[]'::jsonb,   -- {n,title,desc}[]
  skill_md_preview text,
  use_cases jsonb,                                   -- {who,what}[]
  faqs jsonb not null default '[]'::jsonb,           -- {q,a}[]
  related_ids text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists listings_creator_idx on public.listings (creator_id);
create index if not exists listings_status_idx on public.listings (status);
create index if not exists listings_type_idx on public.listings (type);
create index if not exists listings_niche_idx on public.listings (niche);

alter table public.listings enable row level security;

drop policy if exists "listings_read_live" on public.listings;
create policy "listings_read_live"
  on public.listings for select
  using (status = 'live' or auth.uid() = creator_id);

drop policy if exists "listings_owner_write" on public.listings;
create policy "listings_owner_write"
  on public.listings for all
  using (auth.uid() = creator_id)
  with check (auth.uid() = creator_id);

-- =========
-- files (bundle artifacts for each listing)
-- =========
create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings (id) on delete cascade,
  name text not null,
  storage_path text not null,
  size_bytes integer,
  created_at timestamptz not null default now()
);

create index if not exists files_listing_idx on public.files (listing_id);

alter table public.files enable row level security;

-- Files aren't publicly listed. Buyers access via signed URLs.
drop policy if exists "files_owner_all" on public.files;
create policy "files_owner_all"
  on public.files for all
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

-- =========
-- purchases
-- =========
do $$ begin
  create type purchase_status as enum ('paid', 'refunded', 'pending');
exception when duplicate_object then null; end $$;

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid references public.profiles (id) on delete set null,
  buyer_email text not null,
  listing_id uuid not null references public.listings (id) on delete restrict,
  amount_cents integer not null,
  currency text not null default 'usd',
  platform_fee_cents integer not null default 0,
  creator_payout_cents integer not null default 0,
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  status purchase_status not null default 'pending',
  refunded_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists purchases_buyer_idx on public.purchases (buyer_id);
create index if not exists purchases_listing_idx on public.purchases (listing_id);
create index if not exists purchases_session_idx on public.purchases (stripe_checkout_session_id);

alter table public.purchases enable row level security;

-- Buyer can read their own purchases. Creator can read purchases of their listings.
drop policy if exists "purchases_read_self_or_creator" on public.purchases;
create policy "purchases_read_self_or_creator"
  on public.purchases for select
  using (
    auth.uid() = buyer_id
    or exists (
      select 1 from public.listings l
      where l.id = listing_id and l.creator_id = auth.uid()
    )
  );

-- =========
-- reviews
-- =========
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  purchase_id uuid not null references public.purchases (id) on delete cascade,
  buyer_id uuid not null references public.profiles (id) on delete cascade,
  listing_id uuid not null references public.listings (id) on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  body text,
  created_at timestamptz not null default now(),
  unique (purchase_id)
);

create index if not exists reviews_listing_idx on public.reviews (listing_id);

alter table public.reviews enable row level security;

drop policy if exists "reviews_read_all" on public.reviews;
create policy "reviews_read_all"
  on public.reviews for select
  using (true);

drop policy if exists "reviews_buyer_insert" on public.reviews;
create policy "reviews_buyer_insert"
  on public.reviews for insert
  with check (
    auth.uid() = buyer_id
    and exists (
      select 1 from public.purchases p
      where p.id = purchase_id and p.buyer_id = auth.uid() and p.status = 'paid'
    )
  );

drop policy if exists "reviews_buyer_update" on public.reviews;
create policy "reviews_buyer_update"
  on public.reviews for update
  using (auth.uid() = buyer_id)
  with check (auth.uid() = buyer_id);

-- =========
-- helpful view: listings with aggregate rating
-- =========
create or replace view public.listings_with_rating as
select
  l.*,
  coalesce(avg(r.rating), 0)::numeric(3,2) as avg_rating,
  count(r.id)::int as rating_count
from public.listings l
left join public.reviews r on r.listing_id = l.id
group by l.id;

-- =========
-- updated_at trigger
-- =========
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists listings_updated_at on public.listings;
create trigger listings_updated_at
  before update on public.listings
  for each row execute function public.touch_updated_at();

-- =========
-- subscribers (newsletter)
-- =========
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email citext unique not null,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;

-- Insert-only for the anon role via the form action.
drop policy if exists "subscribers_anyone_insert" on public.subscribers;
create policy "subscribers_anyone_insert"
  on public.subscribers for insert
  with check (true);

-- =========
-- storage bucket for bundle files
-- =========
-- Run separately, or via the dashboard:
--   create a private bucket named "skillzy-products"
--   no public policies; signed URLs only.
