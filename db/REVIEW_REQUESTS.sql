-- =====================================================================
-- Skillzy — REVIEW REQUEST + GUEST REVIEWS migration
-- Paste into Supabase SQL editor and Run. Fully idempotent.
-- =====================================================================

-- Track which review-request emails went out so the cron doesn't
-- double-send.
alter table public.purchases
  add column if not exists review_email_sent_at timestamptz,
  add column if not exists review_followup_sent_at timestamptz;

-- Buyers complete purchase as guests (no Skillzy account required),
-- so reviews need to allow NULL buyer_id. The /api/reviews/submit
-- route verifies an HMAC token bound to the purchase id (mirrors the
-- delivery-token pattern) and writes via the service-role client.
alter table public.reviews
  alter column buyer_id drop not null;
