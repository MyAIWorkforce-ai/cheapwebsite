-- Creator-chosen heading for their walkthrough video (e.g. "Watch it
-- work", "2-minute explainer", "See it in action"). Optional — the
-- listing page falls back to "Watch it work" when empty. Trimmed and
-- length-capped in app/sell/new/actions.ts before it is written here.
-- Run once in the Supabase SQL editor after 005-video-url.sql.

alter table public.listings
  add column if not exists video_label text;
