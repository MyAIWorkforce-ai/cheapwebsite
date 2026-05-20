-- Optional creator-supplied walkthrough video. We store only the URL —
-- the video stays on Loom / YouTube / Vimeo, never on Skillzy, so there
-- is no storage, transcoding, or egress cost. The URL is host-allowlisted
-- and normalised in app/sell/new/actions.ts before it is written here.
-- Run once in the Supabase SQL editor after 004-referral-channel.sql.

alter table public.listings
  add column if not exists video_url text;
