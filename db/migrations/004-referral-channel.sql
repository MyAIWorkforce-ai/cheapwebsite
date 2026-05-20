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
