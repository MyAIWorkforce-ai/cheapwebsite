---
name: airbnb-listing-optimization
description: Channel listing SEO across Airbnb / VRBO / Booking.com / Stayz. Direct-booking site SEO and Google Business Profile for the property. Repeat-guest marketing — the 10% direct-booking invitation, the 90-day relationship touch, the annual re-engagement. Cross-listing strategy to de-risk channel concentration. The "marketing" half of the STR business most hosts run on autopilot until occupancy slips.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Listing optimisation + direct-booking site + repeat-guest marketing

## Your job

For a small STR business, occupancy doesn't come from luck — it comes
from four levers, in order of leverage:

1. **Channel search rank** — where you sit when a guest filters
   "[suburb], 2 bedrooms, $200/night, pool". On Airbnb that's the
   single biggest driver of impressions → views → bookings.
2. **Cover photo + first three photos** — they convert the impression
   into a click. The cover photo is the single most A/B-testable
   asset in the listing.
3. **Repeat / direct guests** — the cheapest booking you can take
   (no commission, no party risk, known guest behaviour). 18-30%
   of mature STR businesses' revenue.
4. **Cross-channel risk reduction** — being on one channel
   (typically Airbnb) is fine until the algorithm shifts or the
   account gets a suspension. Cross-listing on VRBO + Booking +
   direct lifts overall occupancy by 10-25% AND removes single-
   channel risk.

This skill runs the listing-side marketing so the operator just has
to take fresh photos and approve copy. Pull from BUSINESS CONFIG for
channel listing IDs, brand voice, banned phrases. Pull from
`learnings.md` for what's working per property.

## Weekly + monthly cadence

| Task | Frequency | Why |
|---|---|---|
| Reply to reviews on every channel | Within 24h | Channel algorithms weigh reply speed + recency |
| Reply to Airbnb / VRBO / Booking guest inquiries | Within 1h | Superhost / Premier Partner / Genius — all hinge on response rate |
| Reply to direct-site form submissions | Within 1h | These are your highest-margin leads — don't lose them to slow reply |
| Reply to GBP / Google reviews for the property | Within 24h | If you run GBP for direct, it ranks |
| Airbnb Insights review — search position, impression funnel | Weekly | Catch a slide before it becomes a month of empty nights |
| Listing-photo refresh consideration | Every 6 months min | Fresh photos lift search rank (Airbnb's recency signal) |
| GBP post (if running GBP for the property) | Weekly | Ranks in local "where to stay [suburb]" |
| Direct-booking site content update | Monthly | Fresh content lifts SEO + gives social-share material |
| Repeat-guest re-engagement | Quarterly + annually | Reactivates known good guests |
| Cross-listing audit (parity check) | Monthly | New photos, new copy, new prices need to roll across all channels |

## Channel listing SEO — Airbnb

Airbnb is 60-90% of most hosts' bookings. The listing is everything.

### Title (60 character cap — Airbnb truncates aggressively)

The title is the first thing the guest reads in the search grid.
Front-load the highest-conversion keywords. Airbnb's search picks up
title words for filter matches.

**Winning title formulas:**

- `Beachfront 2BR + pool — 5 min to [landmark]` (proximity + feature)
- `Designer cottage in [neighbourhood] — King bed, fast wifi` (lifestyle + amenity)
- `Mountain-view cabin w/ hot tub — pet friendly` (view + hero amenity + filter)
- `Family townhouse, 4BR, sleeps 8 — quiet street` (family-channel signal)

**Don't:**
- Generic descriptors ("cozy", "lovely", "perfect") — burn characters, don't convert
- All caps — Airbnb policy + reads spammy
- Emoji unless BUSINESS CONFIG → brand uses them effectively
- "Newly listed!" — fades fast, wastes the slot

### Photos — cover photo is everything

Airbnb has been clear in their host docs: the cover photo determines
click-through rate more than anything else. Test it.

**The cover-photo rules:**
- **Landscape orientation**, shot in natural light, no people
- **Hero room** — usually the kitchen-living shot for a whole-home
  listing; the bedroom for a single-room listing
- **Cover at 16:10 minimum width**, ideally 2048px+
- **No watermark, no text overlay** (Airbnb downranks these)
- **Updated when** the property changes (new sofa, new paint, new
  bedding) OR every 6 months on the recency-signal cycle

**A/B testing the cover photo (Airbnb Insights → Listing-photo
experiments):**
- Test ONE photo at a time, run for 14 days minimum
- Compare CTR (clicks ÷ impressions) — winner becomes new control
- Common wins: dusk exterior shots, hero kitchen with morning light,
  pool/hot-tub shots in warm regions
- Common losers: cluttered bedrooms, bathroom shots first, shots
  with TVs on, shots with chairs pushed-out

**Photo order after cover (first 5 visible without scroll):**
1. Cover — hero living/kitchen
2. Hero bedroom (largest, best light)
3. Bathroom — bright, clean lines, fresh towels
4. View / feature (beach, mountain, pool, hot tub)
5. Kitchen / dining detail

The remaining 15-25 photos fill the bedrooms, living room, exterior,
neighborhood landmarks. Caption every photo — Airbnb's image search
+ accessibility uses captions for ranking.

### Description — problem / solution structure

The first 400 characters are above the "Show more" fold. Make them
count.

```
[One-line hook — what makes this property different]

[Paragraph 1 — who it's for + the problem it solves]
A spotless beachfront 2BR sleeps four — designed for a relaxed
3-night weekend. Five minutes to the [landmark] cafés, ten to the
beach, but quiet enough you can hear the ocean from the deck.

[Paragraph 2 — the space, room by room]
Two bedrooms (King + 2 Singles), one bathroom with rain shower,
open-plan kitchen and living, north-facing deck with sea view…

[Paragraph 3 — the neighborhood]
[Suburb] is the quiet end of [region]. The walking track to
[landmark] starts 200m from the front door…

[Paragraph 4 — the host's voice + house philosophy]
Hosted by [name and partner / family]. We've put 6 years into
making this our favorite place to stay, so expect…
```

**Banned in descriptions:**
- "Welcome to our home!" (filler — costs above-fold real estate)
- "We hope you enjoy your stay" (every listing says this)
- Listing the wifi name (saves wifi-spammers from booking the next
  property over)
- Walls of amenities (the amenities section does this)

### Amenities — check EVERY applicable one

Airbnb's filter search reads amenities first. If a guest filters
"wifi + free parking + pet friendly + air con", you're invisible
unless every one of those is checked.

**Check ruthlessly:**
- Wifi (and report the speed in the description — "Eero mesh, 200+
  Mbps" beats "fast wifi")
- Free parking on premises (vs. "free street parking" — different filter)
- Air conditioning (every unit, vs. "central air")
- Kitchen subitems (full kitchen, stove, oven, microwave, dishwasher,
  coffee maker — espresso vs. drip)
- Workspace (matters for MTR / business travel filter)
- Pets allowed (with conditions in description)
- Self check-in (key huge filter — Igloohome / RemoteLock / lockbox)
- Hot tub / pool — these have their own filter category that drives
  curated browse traffic
- Heating type (gas, central, ducted, fireplace, wood stove)
- Smoke alarm / CO alarm / fire extinguisher / first aid kit
  (safety filters — many guests filter these)

If you've unchecked an amenity because "we're not sure" or "it
broke" — fix it or replace it. Empty amenity slots cost bookings.

### Category tags — the curated browse engine

Since 2022 Airbnb's homepage is largely category-driven (Treehouse,
Beachfront, Tiny Home, Design, Off-the-grid, Surfing, Skiing,
Castles, Cabins, Lakefront, Camping, OMG!, etc.). Airbnb's algorithm
auto-tags listings based on photos + description + amenities. You
can also self-nominate via the listing dashboard.

**Pursue 2-3 category tags per listing — they drive 10-30% of impressions:**
- Beachfront — needs photo evidence of beach <2 min walk
- Design — needs architecturally distinct interior photos
- Tiny Home — under ~40m² with the tiny-home aesthetic
- Treehouse / Cabin / Castle — physical typology
- Pet friendly — straightforward category
- Family — needs multi-bedroom + crib + family-amenity check
- Lakefront / Riverfront / Off-the-grid / Skiing / Surfing —
  location-specific
- OMG! — quirky / standout (think pod-shaped, glass-floor, themed)

If a property qualifies for a category but isn't in it, request via
the listing editor → Property type + amenities. Re-photo if needed.

### Smart Pricing + min/max strategy

Airbnb's native Smart Pricing tends to under-quote in peak and
over-quote in shoulder. Most serious hosts turn it OFF and use
PriceLabs / Beyond / Wheelhouse with manual min/max guardrails (see
BUSINESS CONFIG → DYNAMIC PRICING).

**Recommendation per property in this skill:**
- If using PriceLabs / Beyond / Wheelhouse → Smart Pricing OFF
- Set min rate at the floor where the cleaning fee + commission still
  leaves positive net
- Set max rate at 3-4× base for event surge (Hobart Dark Mofo,
  Edinburgh Fringe, F1 weekend, SXSW)
- Audit the realised ADR vs. PriceLabs recommendation weekly (see
  `12-weekly-report.md` → dynamic pricing audit)

## Channel listing SEO — VRBO

VRBO has less algorithm dialability than Airbnb but the family +
group market is real. About 15-25% of multi-channel hosts' revenue.

### Title + photos

Similar to Airbnb — 60-character cap, hero-photo importance.
Difference: VRBO families respond to "sleeps X" + "X bedrooms" in
the title.

- `4BR family beach house, sleeps 8 — pool + games room`
- `Mountain cabin, sleeps 6 — hot tub + fireplace`
- `Lakefront cottage, sleeps 4 — dock + canoe`

### Description — family-bias

VRBO descriptions can be longer than Airbnb's. Lean into:
- Bed configuration (specific — "King + Queen + 2 Singles + travel cot")
- Family amenities (highchair, crib, board games, fenced yard,
  pack-n-play, baby monitor)
- Safety (pool fence, stair gate, no-balcony details)
- Parking (multiple cars — VRBO families travel with stuff)

### Category tags

VRBO's categories are coarser than Airbnb's:
- Family Friendly (the big one)
- Beach
- Mountain
- Lake
- Pool / Hot Tub
- Pet Friendly
- Ski-in/Ski-out

Tag every applicable one.

### Premier Host (VRBO's Superhost equivalent)

Requirements (verify current — VRBO updates these):
- 3+ bookings in the qualifying period
- 4.3+ average rating
- 90%+ booking acceptance / non-cancellation rate
- 24-hr response rate on inquiries

Premier Host gets a badge + ranking boost. Worth pursuing if VRBO is
>15% of channel mix.

## Channel listing SEO — Booking.com

Booking.com is huge in Europe + Asia + parts of US. The listing is
managed via Booking.com Extranet — different content surface area
than Airbnb.

### Facility list — extremely granular

Booking.com has the most granular facility list in STR. Read the
list end-to-end and check everything that applies:

- Bath vs. shower vs. both (separate filters)
- Toiletries (provided / not — guests filter)
- Coffee: espresso machine vs. Nespresso / filter machine / kettle
  + instant — different filters
- Tea / coffee maker — separate from coffee
- Hairdryer (yes/no — filter)
- Wifi free or paid (separate filters — make sure it's "free")
- Free parking + on-site vs. nearby (different filters)
- Air conditioning per room vs. central
- Heating
- Iron, ironing board, washing machine, drying rack, tumble dryer —
  all separate
- Pet-friendly (with weight limit if applicable)
- Smoking permitted (set to NO)
- Family rooms — yes/no checkbox

Missing facility check = invisible in filtered search.

### Photos

Booking.com photo standards are similar to Airbnb's but the platform
doesn't run A/B experiments on cover photos. The first photo is the
cover by default.

### Genius level participation

Booking.com Genius is the discount-for-loyalty program. Levels 1-3:
- Level 1: 10% off (eligible after 5 stays / 12 months)
- Level 2: 10-15% off + free breakfast / room upgrades
- Level 3: 20% off + late check-out + breakfast

Trade-off: Genius discounts cost 10-20% on top of the base 15-18%
Booking.com commission. Net is often below Airbnb base. Decision:
- If channel mix is heavy Airbnb already → Genius L1 only, drives
  fresh top-of-funnel
- If Booking is a growing channel → Genius L2 for the volume lift
- Never L3 unless ADR margin can absorb 35%+ effective commission

(Surface to operator with the math when proposing Genius enrollment.)

### Instant-confirm

Booking.com guests heavily prefer instant-confirm (instant-bookable
listings rank higher). Default to instant-confirm UNLESS
party-risk filters in `01-intake.md` would flag the guest type — in
which case use Request-to-book per property.

## Listing-photo refresh cadence

Every channel rewards fresh content. The rule:

- **Every 6 months minimum** — re-shoot the cover + at least 5
  hero photos
- **After any furniture / décor change** — new sofa, new paint, new
  bed, new artwork — re-shoot the affected room
- **Before peak season** — 4 weeks before the property's known peak
  (Dec for AU coastal, Jul for UK coastal, ski season for mountain)
- **After any 4-star or below review** that mentions visual concerns
  ("looked different in photos") — surface immediately and re-shoot

Push fresh photos through ALL channels at the same time. The
algorithms read "recency" — uploading the same photos at different
times across channels means each channel gets a separate refresh
bump.

**Photographer brief (if BUSINESS CONFIG has a regular photographer):**
- Bright, natural light (early morning or late afternoon for warm tones)
- Wide-angle but not fisheye (15-24mm full-frame equivalent)
- Beds made with same linens across shoot
- All TVs off, all blinds at consistent position, no shoes / personal
  items visible
- Exterior shot at dusk with warm lights on (the highest-CTR cover
  shot in many categories)
- Capture the view from the deck / window with a person silhouetted
  (engagement signal)

## Direct-booking site SEO

A direct-booking site is the host's leverage against channel risk.
Net rates are 10-15% better (no Airbnb commission), guest data is
yours, repeat bookings are immediate.

### Platform options

| Platform | Strengths | Pricing |
|---|---|---|
| **Hostfully** | Built for property managers, channel sync, websites with templates | $$ — per property |
| **OwnerRez** | Strong CRM + channel + direct site combo | $$ — per property |
| **Lodgify** | Drag-drop website builder + booking widget | $-$$ — flat tiered |
| **Boostly** | Marketing-first; pairs with channel managers | $$ — flat |
| **Lodgify Direct** | Lodgify's direct booking accelerator | $$ |
| **Hospitable Direct** | Hospitable's direct-site bolt-on | Add-on |
| **Custom (Webflow / WordPress + booking plugin)** | Most flexible, owner controls SEO | DIY |

Pull from BUSINESS CONFIG → CHANNEL MANAGER → direct-booking platform.

### On-page SEO

Each property gets a dedicated landing page. Title structure:

```
[Property name] — [Suburb] [Property type] | Book Direct & Save 10%
```

Example: `Battery Point Cottage — Hobart 2BR | Book Direct & Save 10%`

Meta description (155 chars max):

```
Beachfront 2BR cottage in Battery Point, Hobart. Sleeps 4. King bed +
fast wifi + pet friendly. Book direct and save 10% vs. Airbnb.
```

**On-page elements:**
- H1: Property name + suburb
- H2s: "About the space", "The neighborhood", "House rules", "Book direct"
- Keyword targets: "[suburb] Airbnb alternative", "[suburb] direct
  booking", "[suburb] short term rental", "[property type] [suburb]"
- Internal link from homepage + blog content
- External link from social profiles + email signature

**Don't keyword-stuff.** Google's helpful-content update slaps
keyword stuffing harder than ever. One natural mention per keyword
per H2 section.

### Google Business Profile (GBP) for the property

If the property is a defined business (e.g. "Battery Point Cottage"
trading as a registered STR business), it can have a GBP listing.

**Pursue GBP when:**
- The property name is the brand (not just an address)
- Direct bookings are >20% of the channel mix OR a goal in BUSINESS CONFIG
- The property has clear "where to stay [suburb]" search demand
- The region permits (some councils have GBP restrictions for STRs)

**GBP setup:**
1. Claim the listing at business.google.com
2. Category: "Holiday accommodation" or "Vacation home rental
   agency" (depending on registration)
3. Photos: hero exterior, interior shots, view, neighborhood
4. Reviews: prompt past direct-booking guests via the GBP review
   link (channel-platform reviews CAN'T be migrated to GBP, but
   past direct guests can review)
5. Posts: weekly — "currently $145/night for the May long weekend",
   "new outdoor furniture installed", "Mona reopening this Saturday"
6. Q&A: seed common questions ("Do you allow pets?", "Is there
   parking?", "Walking distance to the beach?")

GBP for STRs is contested — Google has tightened the category over
the years. Surface to operator before claiming if uncertain.

### Google Search Console + Google Analytics

Set up both on every direct-booking site:

- **Search Console** — submit the sitemap, monitor indexing,
  catch crawl errors, see which search queries surface the listing
- **Analytics** (GA4) — track traffic source, conversion funnel
  (visit → booking widget open → reservation), bounce rate per page

Weekly review of Search Console — surface to operator:
- New search terms the listing is ranking for
- Pages with high impressions but low CTR (bad title / meta)
- 404s or broken pages

### Schema markup for LodgingBusiness

Direct-booking sites should include schema.org LodgingBusiness
markup. It enables rich results in Google search (price, rating,
availability snippets).

```json
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Battery Point Cottage",
  "address": { "streetAddress": "...", "addressLocality": "Hobart", ... },
  "priceRange": "$185-$385",
  "starRating": { "@type": "Rating", "ratingValue": "4.94" },
  "amenityFeature": [...],
  "url": "https://eastsidestays.com.au/battery-point"
}
```

Most platforms (Hostfully, Lodgify) inject this automatically.
Custom sites need it added — surface to operator if missing.

### The direct-booking pitch

Position direct-booking as a guest win, not a host trick:

> *"Save 10% — book direct with us. We pass on what Airbnb would
> have taken in commission, you get a sharper rate, and we get to
> answer your messages without a middleman. Same property, same
> standards, same cleaning crew."*

The 10% comes out of the 15% Airbnb host commission that the
operator is now saving. Net result:
- Guest pays 10% less than Airbnb
- Host nets 5% more than Airbnb
- Both happier

### Direct-booking trust signals

Guests are nervous booking direct ("what if this is a scam?"). Build
trust on the landing page:

- Real photos (not stock) + dated review snippets
- Insurance + STR registration number visible in footer
- Cancellation policy clearly stated
- Stripe / Square / PayPal logos (payment processor trust)
- Owner's name + photo in the "About the host" section
- Phone number for direct call
- Link to Airbnb listing (proves the same property exists on a
  trusted platform)

## Repeat-guest marketing

The mature STR business has 18-30% of revenue from repeat guests +
direct bookings. The flywheel:

```
1. Guest stays + has a great experience
2. At checkout: invitation to book direct next time
3. 90 days post-stay: relationship touch
4. Annually: season-of-original-stay re-engagement
5. They book direct → new flywheel
```

### At checkout — the direct-booking invitation

In the welcome pack (printed + emailed) and in the checkout-day
message, drop one line:

```
Loved having you. If you come back, book direct via
[eastsidestays.com.au/battery-point] for 10% off the Airbnb rate —
no fees, no middleman, same place.

Code: REPEAT10
```

**Airbnb's rule:** you can't ask a guest to book off-platform for
the CURRENT stay or to leave the platform. You CAN invite them to
book direct for FUTURE stays at THIS property, AFTER the current
stay. The line above is the safe wording.

### 90 days post-stay — relationship touch

If the guest left an email address with you (during stay or via
direct contact — Airbnb does NOT release guest emails), send a 90-day
relationship email:

```
Subject: Hope the rest of summer's been good, [first name]

Hi [first name],

Came across the photo of you on the deck at sunset — couldn't help
but smile. Hope the rest of your travels went well.

We're heading into [season] and the cottage is looking sharp —
[one-line update: new outdoor furniture, refreshed bedroom,
neighborhood event].

If you're thinking of another [region] trip, the door's open.
Direct rate is [10%] off Airbnb — code REPEAT10 on the site.

[name]
[Business name]
```

**Rules:**
- Only to guests who left a 4-star or 5-star review
- Only to guests who provided their email separately (NOT via
  Airbnb's masked email)
- Once per guest per property
- Plain text — feels personal, lifts response

### Annually — season-of-original-stay re-engagement

12 months after the original stay, send a one-touch re-engagement:

```
Subject: A year ago this week, [first name] — Hobart in February

Hi [first name],

A year ago you were here for [event / season / specific thing]. The
cottage is open the same week this year — [dates] — if you've been
thinking about another trip.

Same direct rate (10% off Airbnb), code REPEAT10.

If not this year, no stress. Just a hello.

[name]
```

**Rules:**
- Triggered by the original check-in date + 12 months
- Personalised to the season / event they came for
- Quiet for guests who've already re-booked

### Birthday / anniversary touch (optional, advanced)

If the guest mentioned a milestone during their stay
("anniversary trip", "birthday weekend"), tag it in their record and
send a single touch on the milestone date:

```
Hi [first name] — happy anniversary. Hope this one's as good as
last year. If you're celebrating in [region] again, you know where
to find us.

[name]
```

### Build a guest email list (compliant)

**Airbnb's rule:** you can't harvest guest emails from the platform.
You CAN ask guests to subscribe via:
- A signup form on the direct-booking site
- The welcome pack QR code that links to a "join our list for
  future direct rates" signup
- A separate "leave your email for a 10% direct-booking code"
  invitation at checkout

Use a real email tool (Mailchimp / ConvertKit / Klaviyo / Beehiiv).
Segment by property + guest type.

**Don't:**
- Auto-import Airbnb messaging contacts (Airbnb terms violation)
- Email guests whose email came from a channel system (Booking.com
  guest emails are similarly off-limits for marketing)
- Mass-email — keep it 1:1 in tone even if templated

## Airbnb Insights — the weekly review

Airbnb's Insights dashboard (Listing → Insights) is the single best
data source for SEO health. Review weekly per property:

### Search ranking

- Position vs. competitors for the property's category in the
  property's area
- Trend: up / flat / down over the last 30 days
- Triggers a slide: cancelled bookings, slow reply, declined
  bookings, photo not refreshed in 6+ months, dropped Superhost

### Conversion funnel

```
Impressions  → Views   → Bookings
   ↓             ↓          ↓
(search rank) (cover    (price, reviews,
              + title +  description,
              first 3    house rules,
              photos)    availability)
```

If impressions are stable but views are dropping → cover photo
problem. Test a new one (Insights → Listing-photo experiments).

If views are stable but bookings are dropping → price problem or
calendar problem or review-score problem. Check PriceLabs vs.
realised + the last 5 reviews.

### Competitor pricing

Airbnb Insights shows where competitors are priced for the same
dates. If you're 25% above the median in a soft week, you're
filtering yourself out. If you're 25% below in peak, you're leaving
money on the table.

Cross-check with PriceLabs / Beyond / Wheelhouse recommendation —
they pull broader market data than Airbnb's neighborhood comp set.

## Cross-listing on platforms — channel risk

Many hosts list exclusively on Airbnb. It works until it doesn't.
Risk events:

- Listing temporarily suspended (a single bad review chain or a
  policy review can take a listing offline for days-to-weeks)
- Airbnb algorithm shift (search rank can move 30 places in a week
  during ranking-algorithm changes)
- Account suspension (rare but devastating — entire portfolio offline)
- A single party + neighbor complaint chain → listing demoted

**Cross-listing on VRBO + Booking + direct typically:**
- Lifts overall occupancy 10-25%
- Reduces single-channel risk to ~50-60% of revenue
- Adds 6-10 hrs/month of overhead (channel manager handles most)

**Channel mix targets per property (from `learnings.md`):**

| Channel | Target % | Risk flag |
|---|---|---|
| Airbnb | 50-70% | >85% = channel-concentration risk |
| VRBO | 15-25% | <5% if listed = under-marketing on VRBO |
| Booking.com | 10-20% | If commissions eating margin, dial back |
| Direct | 10-25% | Mature business floor |

Channel manager (Hospitable / Hostaway / OwnerRez / Guesty) syncs
calendar + listings + pricing across all channels — non-negotiable
for multi-channel operation.

## Reply to reviews — the SEO overlap

Detailed playbook in `11-followup-reviews.md`. The SEO angle:

- **Reply to ALL reviews within 24h on ALL channels.** Channel
  algorithms (Airbnb in particular) weigh recency + reply rate.
- **5-star**: personal, specific, brief, signed
- **4-star**: graceful, acknowledge specific feedback, what you'll
  do differently
- **3-star and below**: surface to operator FIRST. Never auto-reply.

Replies are public and indexed. Search engines crawl GBP and Booking
review threads. A specific, warm reply doubles as content.

## Tracking in learnings.md

Update weekly via `12-weekly-report.md`:

- **Per-property search position** (Airbnb Insights)
- **Per-property impression → view → booking funnel** (Airbnb Insights)
- **Cover-photo A/B test results** (when active)
- **Channel mix per property** (% from each channel — flag >85%)
- **Direct-booking conversion** (direct visits → reservations)
- **Repeat-guest direct booking rate** (returning guests / total new
  bookings)
- **Top-praised words from reviews** (use these in the listing copy)
- **Top-criticised words** (resolve, then remove from being a
  recurring theme)
- **GBP impression / clicks** (if running GBP)
- **Search Console queries surfacing the direct site**

## Hard rules

- **Never invent a search position or impression number.** Pull
  from Airbnb Insights / Google Search Console / channel dashboards.
  If the data isn't there, ask the operator to pull it.
- **Never auto-publish a new listing or major copy change.** Show
  the diff in a fenced block, get operator sign-off.
- **Never solicit a guest off Airbnb until they're a confirmed
  past guest with their own email.** Violates Airbnb's terms.
- **No incentivised reviews.** Channel policies AND Google policies
  both ban "review for a discount" — don't risk the account.
- **No keyword stuffing.** "Beachfront beach beachside ocean
  oceanfront ocean view" reads as spam and Google + Airbnb both
  downrank it.
- **No fake scarcity.** "Only 1 night left at this price!" without
  it being true is a channel policy violation.
- **Photos need to match reality.** Misleading photos drive 1-star
  reviews and complaints. Re-shoot when the property changes.
- **Don't run a category tag the property doesn't qualify for.**
  Airbnb removes the tag + dings the listing.
- **No emoji unless BUSINESS CONFIG → brand uses them.**

## Reading the learnings.md

Before any listing work, read:

- **Per-property scorecard** — which property is the win to push,
  which is the steady, which needs help
- **Channel mix per property** — anything >85% flagged needs
  cross-listing pushed
- **Review patterns — most-praised / most-criticised** — feed the
  praised into listing copy, fix the criticised before the next
  refresh
- **Pricing patterns** — PriceLabs vs. realised delta tells you if
  the min/max guardrails need adjustment
- **Open experiments** — don't launch a new test if 2+ are already
  running; you can't read the signal

If the learnings file shows a property losing search position 3
weeks running, that's a "needs intervention" trigger — surface to
operator with a recommendation (refresh photos / change cover /
adjust min rate / re-write description).

## Confirm + handoff

> *"Listing-side tasks this week: [N reviews replied, M Airbnb
> Insights pulled and reviewed, X cover-photo test running on
> [property], 1 GBP post drafted for approval, Y guests added to
> repeat-guest list]. Anything to refine before I send?"*

After sign-off, queue next-week's photo refresh / listing
optimisation tasks into the calendar.
