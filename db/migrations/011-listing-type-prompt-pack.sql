-- Add 'prompt_pack' to the listing_type enum.
--
-- Introduced 2026-06-26 as a lower-friction listing tier: 10+ curated
-- prompts for a specific role or workflow, priced $29-79+, positioned
-- as a separate tab on the marketplace so it widens the creator top-
-- of-funnel without diluting the premium Setups shelf. See HANDOFF.md
-- ("Prompt Packs" decision) for the framing rationale.
--
-- IF NOT EXISTS makes this migration safe to re-run.

alter type public.listing_type add value if not exists 'prompt_pack';
