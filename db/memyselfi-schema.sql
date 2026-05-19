-- memyselfi.ai — a separate business sharing this repo's infrastructure.
-- These tables are isolated from Skillzy (mmi_ prefix) and only used when
-- Supabase service-role credentials are present. Without them the app runs
-- on an in-memory store (demo mode).

create table if not exists mmi_users (
  id            uuid primary key,
  email         text unique not null,
  name          text not null default '',
  password_hash text not null,
  salt          text not null,
  created_at    timestamptz not null default now()
);

create table if not exists mmi_twins (
  handle        text primary key,
  owner_id      uuid not null references mmi_users(id) on delete cascade,
  visibility    text not null default 'public',
  data          jsonb not null,
  updated_at    timestamptz not null default now()
);

create index if not exists mmi_twins_owner_idx on mmi_twins(owner_id);

-- Writes go through the service-role key on the server, so RLS stays on with
-- no public policies: the anon/browser key can never touch these tables.
alter table mmi_users enable row level security;
alter table mmi_twins enable row level security;
