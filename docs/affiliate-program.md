# Skillzy — Affiliate program (design doc)

> Status: **DESIGN — not built yet.** Brainstorm + spec to build
> post-launch. Decisions still open are marked ❓.

## Goal

Let influencers and existing creators share an affiliate link. When a
**new creator** signs up through that link and starts selling, the
referrer earns a percentage of that creator's sales. Drives creator
acquisition without paid ads.

---

## The model — where the money comes from

Every sale splits **Creator 80% / Skillzy 20%** today. The affiliate
cut comes **out of Skillzy's 20%** — never the creator's 80%, never an
extra charge to the buyer.

Example, $20 sale:
- Creator: **$16** (80% — untouched)
- Affiliate: **$1** (5% of sale)
- Skillzy: **$3** (remaining 15%)

So we trade a slice of margin for growth. Creators are unaffected, so
adoption isn't hurt.

### Rates + terms (proposed — ❓ confirm)
- **Affiliate rate:** ❓ 5% of each sale (≈ a quarter of our 20%)
- **Duration:** ❓ 12 months from the referred creator's signup (vs
  lifetime). 12 months is the sustainable default.
- **Who can be an affiliate:** ❓ open signup with a light review, or
  invite-only to start.
- **Payout:** affiliates connect Stripe (same Standard Connect flow as
  creators); paid on a schedule once they pass a **$50 minimum**.

---

## 🚨 Fraud / self-referral prevention (the critical part)

The whole risk: a creator games the system to skim an extra 5% on
their **own** sales. Every guard below is about stopping that. Build
these from day one — retrofitting fraud rules after money has flowed is
painful.

### Abuse vectors + defences

| Vector | How they'd try it | Defence |
|---|---|---|
| **Self-referral, one account** | Affiliate refers their own creator account | **Hard block:** `affiliate.user_id == creator.user_id` → no commission, ever |
| **Second account** | Creator makes a 2nd creator account, refers it with their own affiliate link, sells through it | **Same Stripe account block:** if the affiliate's connected Stripe account id == the referred creator's Stripe account id → no commission. To get paid both need Stripe; a self-dealer almost always reuses the same bank/Stripe. Strongest signal. |
| | | **Same email / email-root block:** normalise emails (strip dots/+aliases) and block matches |
| **Cross-referral ring** | A refers B, B refers A — both skim | **Reciprocal-referral detection:** if two accounts refer each other, flag both, withhold commission pending review |
| **Bulk fake creators** | One person spins up many referred accounts | **Velocity flags:** many signups from one affiliate in a short window, or sharing device/IP → flag for admin review before any payout |
| **Same payment instrument** | Different Stripe accounts, same underlying bank/card | Stripe's own **radar / linked-account signals**; flag matching bank fingerprints |

### Layered approach
1. **Automatic hard blocks** (no commission, silent): same user_id, same
   Stripe account, same normalised email.
2. **Automatic flags** (commission held, admin reviews): reciprocal
   referrals, signup velocity, shared IP/device at signup.
3. **Manual gate:** affiliate earnings sit in a **pending** state and
   only pay out after a threshold + a quick admin sanity check. Money
   never auto-flows to a brand-new affiliate without one look.
4. **Terms:** affiliate agreement explicitly bans self-referral; gives
   us the right to void commissions + ban for abuse.

### The single most important rule
**An affiliate never earns commission on a creator who shares their
Stripe account, email, or identity.** That one check kills ~90% of the
abuse cheaply.

---

## Data model (sketch)

- `affiliates`: id, user_id (the affiliate's Skillzy account),
  code/slug (their link), stripe_account_id, status
  (pending/active/banned), created_at
- `profiles.referred_by_affiliate_id` (nullable) — set ONCE at creator
  signup if a valid affiliate cookie is present and passes the blocks
- `affiliate_earnings` ledger: id, affiliate_id, purchase_id,
  creator_id, amount_cents, status (pending/approved/paid/void),
  created_at — one row per qualifying sale, so it's fully auditable
- `affiliate_payouts`: batched transfers once over threshold

## Attribution flow

1. Affiliate shares `skillzy.ai/?aff=<code>` (mirrors the existing
   `skz_ref` cookie pattern already in middleware)
2. Cookie `skz_aff` set (e.g., 30-day window)
3. New creator signs up → if cookie present AND passes the hard blocks
   (not self, not same Stripe/email) → `profiles.referred_by_affiliate_id`
   is set permanently
4. Every paid sale by that creator within the window → write an
   `affiliate_earnings` row (status pending) for the affiliate's cut,
   carved from Skillzy's 20%
5. Earnings approved (auto after review window or admin action) → batched
   → paid via Stripe Connect transfer

## Affiliate-facing pages

**Affiliates must have a Skillzy account — the affiliate function is a
TAB inside the existing dashboard, not a separate signup.** (Toby's
call — and it's a strong fraud reducer: every affiliate is a real,
known account, so there are no throwaway affiliate-only accounts to
build referral rings with, and "can't refer yourself" is a trivial
user_id check.)

- **Dashboard → Affiliate tab:** their link, clicks, creators referred,
  earnings (pending vs paid)
- **To withdraw affiliate commission they must connect Stripe** (the
  same Standard Connect flow). This feeds the strongest guard — no
  commission when the affiliate's Stripe == the referred creator's
  Stripe. Combined, an attacker would need 2 full accounts + 2 Stripe
  accounts + 2 banks + 2 identities to skim 5% — economically pointless.
- Open to **any account holder** — creators AND influencers (an
  influencer with no product can still refer creators).

## Admin controls (extend the existing /admin dashboard)

- List affiliates + status, total paid, pending
- Flagged-for-review queue (reciprocal/velocity/shared-identity)
- Approve / void earnings, ban affiliates
- Per-affiliate drill-down (who they referred, each one's sales)

---

## Build phases (post-launch)

1. **Phase 1 — tracking only:** affiliate links + cookie + record
   `referred_by_affiliate_id` + write earnings ledger (pending). No
   payouts yet. Lets you watch real behaviour + tune the rate before
   any money moves.
2. **Phase 2 — fraud guards:** the hard blocks + flags + admin review
   queue.
3. **Phase 3 — payouts:** affiliate Stripe connect + batched transfers
   + threshold.

Doing tracking first (Phase 1) with **no auto-payout** means you can
launch affiliates "in beta", see who refers whom, catch self-dealers
manually, and only turn on real money once the guards are proven.

---

## Open decisions for Toby ❓

1. Affiliate rate — **5%** of sale, or higher?
2. Duration — **12 months** per referred creator, or lifetime?
3. Affiliate eligibility — open signup, or invite/approve to start?
4. Payout threshold — **$50** before a transfer fires?
5. Attribution window — **30 days** from click to signup?

Lock these five and Phase 1 can be specced into tickets.
