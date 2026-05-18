-- =====================================================================
-- Skillzy — RECONCILE PRODUCTION DATABASE
-- Paste this ENTIRE file into the Supabase SQL editor and Run.
-- Every statement is idempotent (IF NOT EXISTS / DROP ... IF EXISTS),
-- so it is safe on a fresh OR a partially-applied database. It brings
-- the schema fully in line with the code and ends the recurring
-- "column does not exist" failures.
--
-- Also create a PRIVATE Storage bucket named "skillzy-products"
-- (Storage tab) if it does not exist yet.
-- =====================================================================

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
-- storage bucket for bundle files
-- =========
-- Run separately, or via the dashboard:
--   create a private bucket named "skillzy-products"
--   no public policies; signed URLs only.


-- ---------------------------------------------------------------------
-- migration 001-subscribers
-- ---------------------------------------------------------------------

-- Newsletter signup list. Open insert (anonymous, from the footer form);
-- only authenticated readers via the service role can read or delete.
-- Run this once in the Supabase SQL editor after the base schema.

create extension if not exists "citext";

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email citext unique not null,
  source text default 'footer',
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;

drop policy if exists "subscribers_anon_insert" on public.subscribers;
create policy "subscribers_anon_insert"
  on public.subscribers for insert
  with check (true);

-- No public read. Service role bypasses RLS automatically for admin work.


-- ---------------------------------------------------------------------
-- migration 002-storage-policies
-- ---------------------------------------------------------------------

-- Row-level security on storage.objects for the skillzy-products bucket.
-- Run this once in Supabase SQL editor after the bucket exists.
--
-- Folder convention: skillzy-products/<creator_id>/<listing_id>/<file>
-- The first path segment must equal the auth.uid() of the uploader.
-- Reads are denied at the policy level — buyers only ever get signed URLs
-- generated server-side after a verified purchase.

-- Allow authenticated users to upload to their own folder.
drop policy if exists "skillzy_products_creator_upload" on storage.objects;
create policy "skillzy_products_creator_upload"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'skillzy-products'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow creators to update / replace files in their own folder.
drop policy if exists "skillzy_products_creator_update" on storage.objects;
create policy "skillzy_products_creator_update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'skillzy-products'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'skillzy-products'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow creators to delete files in their own folder.
drop policy if exists "skillzy_products_creator_delete" on storage.objects;
create policy "skillzy_products_creator_delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'skillzy-products'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- No public select policy. The service-role client (used by the
-- /api/download/[id] endpoint after verifying the buyer owns a paid
-- purchase) bypasses RLS and issues short-lived signed URLs.


-- ---------------------------------------------------------------------
-- migration 003-referrals
-- ---------------------------------------------------------------------

-- Referral attribution. The middleware writes ?ref=<handle> into the
-- skz_ref cookie at landing; checkout copies it into the Stripe
-- session metadata; the webhook persists it here. Run once in the
-- Supabase SQL editor after the base schema.

alter table public.purchases
  add column if not exists referrer_slug text;

create index if not exists purchases_referrer_idx
  on public.purchases (referrer_slug);


-- ---------------------------------------------------------------------
-- migration 004-referral-channel
-- ---------------------------------------------------------------------

-- Per-channel referral attribution. The share kit tags each surface
-- with ?c=<channel> (qr / social / post / profile / print / link);
-- middleware captures it into the skz_ch cookie; checkout copies it
-- into the Stripe session metadata; the webhook persists it here so
-- creators can see which channel actually converts.
-- Run once in the Supabase SQL editor after 003-referrals.sql.

alter table public.purchases
  add column if not exists referrer_channel text;

create index if not exists purchases_referrer_channel_idx
  on public.purchases (referrer_channel);


-- ---------------------------------------------------------------------
-- migration 005-video-url
-- ---------------------------------------------------------------------

-- Optional creator-supplied walkthrough video. We store only the URL —
-- the video stays on Loom / YouTube / Vimeo, never on Skillzy, so there
-- is no storage, transcoding, or egress cost. The URL is host-allowlisted
-- and normalised in app/sell/new/actions.ts before it is written here.
-- Run once in the Supabase SQL editor after 004-referral-channel.sql.

alter table public.listings
  add column if not exists video_url text;


-- ---------------------------------------------------------------------
-- migration 006-video-label
-- ---------------------------------------------------------------------

-- Creator-chosen heading for their walkthrough video (e.g. "Watch it
-- work", "2-minute explainer", "See it in action"). Optional — the
-- listing page falls back to "Watch it work" when empty. Trimmed and
-- length-capped in app/sell/new/actions.ts before it is written here.
-- Run once in the Supabase SQL editor after 005-video-url.sql.

alter table public.listings
  add column if not exists video_label text;
