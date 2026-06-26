# Rate quote — direct booking + length-of-stay discount

For direct-booking inquiries (repeat guests, direct-site enquiries,
referrals, off-platform requests). The agent fills this in from
BUSINESS CONFIG → property block + `02-quote-callout.md` logic +
the live dynamic-pricing read (PriceLabs / Beyond / manual).

Never use this template for an Airbnb / VRBO / Booking.com inquiry
that hasn't yet booked on-platform — channel ToS prohibits
off-platform routing pre-booking. Direct only.

```
RATE QUOTE — [Property internal name]
=======================================
Date issued:        [date]
Quote ref:          DQ-[YYYYMM]-[N]
Guest name:         [first name + last initial]
Guest email / mob:  [contact]
Source:             [Direct site / Referral from <guest> / Repeat
                     guest / Off-platform reply]

STAY
Property:           [Property internal name]
Address:            [suburb / neighbourhood — not full street until paid]
Check-in:           [day, date] from [3pm]
Check-out:          [day, date] by [11am]
Nights:             [N]
Guests:             [N adults + N kids — vs. max [X] on listing]
Pets:               [None / 1 dog as agreed — see pet fee below]

PRICING (all amounts in [AUD / NZD / GBP / USD / CAD])

| Item                                     | Detail                       | Amount    |
|---|---|---|
| Base rate                                | $[X]/night × [N] nights      | $[X]      |
| Length-of-stay discount                  | [7+ / 14+ / 28+ nights, -X%] | -$[X]     |
| Seasonal / event premium                 | [e.g. NYE +30% / shoulder 0] | +$[X]     |
| Cleaning fee                             | one-off                      | $[X]      |
| Extra guest fee                          | [N] guests above [2], $[X]/n | $[X]      |
| Pet fee                                  | per stay, if applicable      | $[X]      |
| Lodging tax                              | [GST 10% / VAT 20% / TOT X% / | $[X]      |
|                                          |  GET+TAT / state occupancy]  |           |
| **Subtotal**                             |                              | **$[X]**  |
| Less repeat-guest discount (if appl.)    | [-5% / -10%]                 | -$[X]     |
| **Total**                                |                              | **$[X]**  |

SECURITY DEPOSIT (held, NOT charged)
$[X] authorisation on the card 48 hrs pre-arrival via Stripe.
Released [3 / 5 / 7] days post-checkout if no damage claim.
Not counted in the total above.

CAVEAT
[Pick one, or combine]
- "Rate locked for 48 hrs from this email. After 48 hrs subject to
  re-quote — dynamic pricing moves daily."
- "Availability subject to channel-sync confirm — these dates aren't
  blocked across Airbnb/VRBO/Booking until you confirm and I lock
  the calendar."
- "Quote assumes [N] guests as stated. Extra guests on arrival =
  extra fee + potential cancel."
- "Pets approved subject to [breed / size / vacc record]. Damage
  beyond standard deposit is on the guest."

TIME WINDOWS — when I need a yes by
- Soft hold: 48 hrs from this email
- Final confirm + deposit: by [day, date, time] local
- Calendar block goes up across all channels the moment I receive
  the deposit

WHAT'S INCLUDED
- All linen + towels (one set on bed, one in cupboard for [N+]
  night stays)
- Wifi — [Eero mesh / Google Nest / Plume], [200+ Mbps] tested,
  network "[name]", password sent 24h pre-arrival
- [1 off-street parking / 1 driveway / street parking — no permit
  needed]
- Self check-in via [Igloohome / RemoteLock / August / Yale /
  lockbox], code sent 24h pre-arrival
- Fully stocked kitchen — coffee, tea, salt/pepper, oil, basic
  pantry, dishwasher tablets
- Starter pack — toilet paper, hand soap, shampoo/conditioner,
  body wash, dish soap (replenish at your own cost on stays >7
  nights or via mid-stay clean below)
- Streaming — [Apple TV / Roku / smart TV] with [Netflix / Disney+
  / Prime] guest-mode (log in with your own account, log out at
  checkout)
- Thermostat — [ecobee / Nest / Tado] set to [auto, X-Y°C range]
- [Property-specific extras — e.g. "BBQ + gas bottle", "beach
  chairs + esky in laundry cupboard", "ski rack in garage"]
- 24/7 contact for anything that breaks — text the host mobile in
  the welcome pack

WHAT'S NOT INCLUDED
- Extra guests above the booked [N] — $[X]/night, or cancel if
  pushed past max [X]
- Pets above what was agreed — separate fee + potential cancel
- Parking violations — your car, your fine; we'll flag any council
  rules in the welcome pack
- Mid-stay cleans on stays > [14] nights — included once per [14
  nights] for stays of [28+], otherwise $[X]/clean on request
- Damage above the security deposit — billed separately via
  damage invoice with photo evidence
- Smoking anywhere on the property — automatic $[X] deep-clean
  charge + cancel of remaining nights (non-negotiable, in house
  rules)
- Events / parties of any kind (NoiseAware / Minut monitoring —
  triggers a host text + then a knock if no response)

PAYMENT — to lock the booking
Option 1 — Stripe (instant, card / Apple Pay / Google Pay):
  [Stripe direct booking link — generated per quote]
  This is the secure direct-booking link. Pays the full amount
  above + holds the security deposit as a separate authorisation.

Option 2 — Bank transfer (EFT, slower):
  [BSB / Sort code / Routing # — from BUSINESS CONFIG]
  [Account # — from BUSINESS CONFIG]
  Ref: DQ-[YYYYMM]-[N]
  Calendar held for 48 hrs from email — released if funds not
  received by [date].

REPEAT GUEST? Direct booking saves us both the [Airbnb / VRBO /
Booking] commission — that's where the [5-10%] repeat-guest
discount above comes from. Same property, same calendar, same
host. The only difference is you're not paying the channel a cut.

CANCELLATION
- Full refund [14+] days out
- 50% refund [7-14] days out
- No refund [<7] days out
- (Force majeure / serious illness — get in touch, we'll find a
  date swap)

Reply with "go ahead" + your preferred payment option and I'll
send the Stripe link + lock the calendar across all channels.
Welcome pack follows 24 hrs pre-arrival.

Thanks,
[Operator name]
[Trading as]
[STR registration # — NSW STRA / Edinburgh STL / NYC LL18 / BC
 registry / Toronto by-law / Vancouver biz licence / Montreal
 CITQ / Honolulu BMR / Austin Type 1-2-3 / Nashville Type 1-2]
[ABN / VAT / EIN]
[Phone] · [Email]
[Direct-booking site URL]
```
