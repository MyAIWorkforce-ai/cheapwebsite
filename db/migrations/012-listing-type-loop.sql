-- Add 'loop' to the listing_type enum.
--
-- Introduced 2026-07-01 as a 5th listing tier: scheduled / recurring
-- agent workflows ("runs itself"). Sits between Skill and Full Agent
-- Setup on the value ladder — more than a single-file capability,
-- less than a whole business desk. Examples: "Daily standup loop",
-- "Weekly LinkedIn content loop", "Monthly Xero → P&L → email loop".
--
-- IF NOT EXISTS makes this migration safe to re-run.

alter type public.listing_type add value if not exists 'loop';
