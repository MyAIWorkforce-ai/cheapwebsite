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
