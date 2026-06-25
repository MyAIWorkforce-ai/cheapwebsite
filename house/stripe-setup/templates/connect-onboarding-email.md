# Connect onboarding email — for platforms onboarding sellers

For operators running a marketplace / Connect platform (skill 07).
Used during the seller onboarding journey + post-onboarding.

---

## 1. Seller signup invite (initial)

```
Subject: Get paid via [Platform name] — finish setup

Hi [first name],

You're listed on [Platform name]! Now let's get you paid.

Stripe handles the money side — secure, fast bank deposits. To
take payments via [Platform], we need you to verify your
identity + bank account with Stripe.

Takes 5 minutes:

→ COMPLETE SETUP: [Stripe-hosted onboarding URL]

You'll need:
- ID (driver's licence or passport, photo)
- Bank account for payouts ([country-specific format])
- Tax ID ([country-specific])

Once verified, customers can pay you instantly via [Platform].
Payouts hit your bank account every [schedule — daily / weekly /
monthly].

Any questions, reply.

[Platform name]
```

---

## 2. Onboarding incomplete reminder (Day 3 if not completed)

```
Subject: Reminder — finish your [Platform name] payouts setup

Hi [first name],

3 days ago you started setting up payouts with [Platform name].
Looks like a couple of steps are still pending.

Verifying takes ~5 minutes. Until then, you can't accept payments
via [Platform].

→ FINISH SETUP: [Stripe onboarding URL — fresh accountLinks token]

Common stumbles:
- ID photo unclear → retake in good light
- Bank account format → use your banking app to copy the exact
  digits
- Tax ID format → [country-specific guidance]

Stuck? Reply and I'll help personally.

[Platform name]
```

---

## 3. Onboarding incomplete reminder (Day 7)

```
Subject: Your payouts setup — still pending

Hi [first name],

A week since you started [Platform name] payouts setup. It's
still pending verification.

WHAT THIS BLOCKS
Buyers want to pay you — but until verified, [Platform] can't
process payments to your account.

→ FINISH SETUP: [Stripe URL]

If something's blocking you (ID issue, wrong country selected,
bank account problem), reply and we'll work through it.

[Platform name]
```

---

## 4. Onboarding complete — welcome to payouts

```
Subject: You're verified — ready to get paid

Hi [first name],

Stripe verification complete. You're ready to accept payments
via [Platform name].

YOUR SETUP
Payout schedule: [Daily / Weekly Monday / Monthly]
First payout:    Expected within [7-14] days of first sale
Bank account:    ending [last 4]

YOUR STRIPE EXPRESS DASHBOARD
Access your seller dashboard any time:
[Stripe Express login URL]

There you can:
- See your sales, fees, payouts
- Update your bank account
- Change payout schedule
- Download tax documents

PLATFORM FEES
[Platform name] takes [X% / flat $Y] per transaction.

QUESTIONS
Reply to this email.

Welcome aboard,
[Platform name]
```

---

## 5. First payout sent

```
Subject: First payout sent — $[X] on the way to your bank

Hi [first name],

Sent your first [Platform name] payout today: $[X] to your bank
account ending [4].

Should land in 1-2 business days.

THIS PAYOUT
Gross sales:        $[X]
Platform fee:       -$[X]
Stripe processing:  -$[X]
**Total payout:**   **$[X]**

NEXT PAYOUTS
Your payout schedule: [Daily / Weekly / Monthly]
Next expected:       [date]

See full activity: [Stripe Express dashboard URL]

Welcome to selling via [Platform name].

[Platform name]
```

---

## 6. Payout failed — bank rejected

```
Subject: Payout to your bank didn't go through

Hi [first name],

Your $[X] [Platform name] payout from [date] didn't reach your
bank. Stripe says: [failure reason — e.g. "account closed",
"invalid account number"].

UPDATE YOUR BANK ACCOUNT
[Stripe Express dashboard URL → Payouts → Bank account]

Once updated, we'll automatically retry the payout. Funds aren't
lost — they're held in your Stripe balance.

Any trouble updating, reply and we'll sort it.

[Platform name]
```

---

## 7. Connected account — verification needed (additional info)

If Stripe later requires more info (sometimes happens at higher
volumes):

```
Subject: Stripe needs additional info to keep your account active

Hi [first name],

Stripe has requested additional verification for your [Platform
name] payouts account. This sometimes happens as accounts process
more volume.

→ COMPLETE VERIFICATION: [Stripe URL]

You'll need:
[List of what Stripe is asking for — operator-specific from
Stripe's `account.requirements` field]

Until verified:
- New sales: still processed
- Payouts: paused until verification clears
- Existing balance: held safely

We've also notified [Platform] support. Reply if you'd like help.

[Platform name]
```

---

## 8. Year-end tax summary (US — 1099-K context)

For US Connect platforms:

```
Subject: Your [Year] sales summary — for tax filing

Hi [first name],

Year-end tax summary for your [Platform name] sales in [Year].

[Year] TOTALS
Gross sales:        $[X]
Platform fees:      $[X]
Stripe fees:        $[X]
Refunds issued:     $[X]
Net to your bank:   $[X]

1099-K (US sellers)
If you exceeded the IRS threshold ($[X] in gross), Stripe will
issue a 1099-K to you and the IRS by January 31. Check the
Stripe Express dashboard → Tax documents.

For your accountant: detailed CSV download here:
[Stripe Express → Reports]

DON'T FORGET
- State sales tax obligations (if [Platform] is not collecting on
  your behalf)
- Self-employment tax (US)
- Quarterly estimated tax payments (US)

Not US: this summary still works as your annual P&L.

Questions? Reply.

[Platform name]
```

---

## 9. Platform policy update notice

```
Subject: [Platform name] payouts policy update — [date effective]

Hi [first name],

We're updating our [Platform] payouts policy effective [date].

WHAT'S CHANGING
- [Change 1, e.g. "Platform fee adjusting from 5% to 4%"]
- [Change 2, e.g. "Payout schedule moving from weekly to daily for
   eligible accounts"]
- [Change 3]

WHY
[Brief honest reason]

WHAT TO DO
Nothing required. Updates apply automatically from [date].

If the changes don't work for you, you can withdraw your balance
+ delist your products any time:
[Stripe dashboard URL]

Reply with any questions.

[Platform name]
```

---

## 10. Re-engagement — inactive sellers

```
Subject: Haven't seen sales from you in a while

Hi [first name],

It's been [N] weeks since your last sale on [Platform name].
Just checking in — anything we can help with?

POSSIBLE FIXES
- Product page out of date: [URL to edit]
- Pricing too high vs market: [analytics URL]
- Out of stock: [URL to update inventory]

PLATFORM UPDATES
[Recent things you've shipped]

If you've decided to focus elsewhere: no worries. Withdraw your
balance any time at [URL].

Otherwise — what's blocking? Reply.

[Platform name]
```

---

## Onboarding-flow design considerations

### Branded Express onboarding

In Stripe Connect settings, configure:
- Platform name (shown on Stripe pages during onboarding)
- Platform logo (uploaded in Connect settings)
- Platform website
- Platform support email (shown when sellers have questions)

The more branded the flow looks, the higher the completion rate.

### Email cadence

| Day | Email |
|---|---|
| 0 (signup) | Initial setup invite |
| 3 (if incomplete) | First reminder |
| 7 (if incomplete) | Second reminder |
| 14 (if incomplete) | Third reminder + offer to help personally |
| 30 (if incomplete) | Final reminder — "delete account?" |

After Day 30 without completion: archive the seller account, send
no more emails. (Keep DB record for re-activation if they come
back.)

### Completion rate targets

- 50% on Day 0 (one-session completion)
- 70% by Day 3 (most who'll complete do, do so quickly)
- 85% by Day 7
- 90% by Day 14 (with personal outreach)
- Long-tail 10% never complete (deal with it)

If completion <50% on Day 0: simplify the onboarding flow.

### Multi-language

For platforms with international sellers: localise these emails.
Stripe Express onboarding itself is multi-language (~20 languages
out of the box).

### Tracking via webhook

(Skill 04 / 07) Listen for:
- `account.updated` → check `details_submitted`, `charges_enabled`,
  `payouts_enabled` — drive your reminder logic from these fields
- `account.application.deauthorized` → seller disconnected
- `payout.paid` → trigger first-payout email
- `payout.failed` → trigger payout-failed email

## Compliance notes

For platforms with regulated sellers (financial services,
healthcare, regulated goods):
- Platform may need to verify additional KYB info beyond Stripe's
  default
- Some jurisdictions require platforms to verify seller is over
  18, has the right licence, etc.
- Document this in platform's seller agreement

Stripe handles core KYC. Platform handles category-specific
compliance.

## Marketplace tax disclosures

For US sellers: be clear about whether the platform is collecting
sales tax on their behalf (marketplace facilitator status).

For EU sellers: VAT collection clarification (platform-of-record
vs seller-of-record).

These are legal disclosures that should appear in the seller
agreement, not just emails — but the onboarding email can
reference them: "See section [X] of our seller terms for tax
handling: [URL]".
