-- 008-purchases-unique-payment-intent.sql
--
-- A buyer was receiving the purchase confirmation up to 4 times. Root
-- cause: the post-payment success page AND the Stripe webhook BOTH call
-- fulfillPaymentIntent. The application-level idempotency guard is a
-- SELECT-then-INSERT on stripe_payment_intent_id, which races when the
-- two paths fire simultaneously (and Stripe additionally retries the
-- webhook if it doesn't see a 200 fast enough). Without a unique index,
-- every racing INSERT succeeds → every path emails.
--
-- The fix:
--   1. De-duplicate any existing rows (keep the earliest by created_at).
--   2. Add a UNIQUE index on stripe_payment_intent_id so the second
--      insert fails at the DB level. fulfillPaymentIntent already
--      bails on insertError without emailing, so this single change
--      stops the duplicate sends without any code change.
--
-- Safe to run on production: the dedupe step only touches rows with
-- a non-null stripe_payment_intent_id AND duplicates of one. Single-
-- row purchases are untouched.

begin;

-- 1. Delete duplicate purchase rows (keep the oldest per payment intent).
with ranked as (
  select
    id,
    row_number() over (
      partition by stripe_payment_intent_id
      order by created_at asc
    ) as rn
  from public.purchases
  where stripe_payment_intent_id is not null
)
delete from public.purchases
where id in (select id from ranked where rn > 1);

-- 2. Enforce uniqueness going forward. Partial index so NULL values
--    (legacy rows pre-Stripe-PaymentIntent) don't collide.
create unique index if not exists purchases_payment_intent_unique
  on public.purchases (stripe_payment_intent_id)
  where stripe_payment_intent_id is not null;

commit;
