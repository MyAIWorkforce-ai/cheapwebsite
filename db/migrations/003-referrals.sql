-- Referral attribution. The middleware writes ?ref=<handle> into the
-- skz_ref cookie at landing; checkout copies it into the Stripe
-- session metadata; the webhook persists it here. Run once in the
-- Supabase SQL editor after the base schema.

alter table public.purchases
  add column if not exists referrer_slug text;

create index if not exists purchases_referrer_idx
  on public.purchases (referrer_slug);
