# Skillzy — brand assets

Skillzy wordmark, app icons, and platform-ready cover images. Every file
here is **SVG** — vector, scales to any size without quality loss, and
can be exported to PNG/JPG at any resolution from a browser or any
design tool.

---

## The palette

| Name | Hex | Usage |
|---|---|---|
| **Brand Gold** | `#C19E50` | Primary accent — wordmark, buttons, highlights |
| **Brand Ink** | `#0F1729` | Body text, dark backgrounds, primary mark on cream |
| **Brand Cream** | `#F2F4F8` | Page background, light-mode backdrop |
| Brand Muted | `#5F6B7E` | Secondary text |
| Brand Hairline | `#CCD2DD` | Borders, dividers |
| Brand Cream Card | `#FAFBFE` | Card background, slightly lighter than page |

## The type

- **Display / wordmark:** Fraunces — fall back to Times New Roman, Georgia, serif
- **UI / body:** system sans (San Francisco, Segoe UI, Roboto)
- **Mono / labels:** any monospace

---

## What's in here

### `/logos`

Horizontal "Skillzy" wordmark, six variants:

| File | Best for |
|---|---|
| `wordmark-gold-on-cream.svg` | The default. Light pages, page headers, the website. |
| `wordmark-gold-on-ink.svg` | Dark backgrounds — footer, dark-mode UI, video bumpers. |
| `wordmark-cream-on-ink.svg` | Subtler mark on dark — when gold would clash. |
| `wordmark-ink-on-cream.svg` | Single-colour print, B&W docs, embossed merch. |
| `wordmark-italic-z.svg` | Alt — gold italic "zy" tail. Use on landing pages where you want a bit more personality. |
| `wordmark-with-dot.svg` | Alt — adds a gold accent dot. Good on minimal layouts. |

### `/icons`

Square "S" mark + variants. Use these as avatars, app icons, social profile pictures:

| File | Best for |
|---|---|
| `icon-square-ink-gold.svg` | Default favicon style — gold S on ink. |
| `icon-square-gold-ink.svg` | High-contrast colourful — ink S on gold. |
| `icon-square-cream-ink.svg` | Minimal monochrome — ink S on cream. |
| `icon-rounded-ink-gold.svg` | iOS-style rounded corners — for app stores, home screen tiles. |
| `icon-circle-ink-gold.svg` | Circular avatar — for X, GitHub, LinkedIn profile photos. |
| `icon-circle-gold-ink.svg` | Inverted circular avatar. |
| `stacked-mark.svg` | "S" over "Skillzy" — for square containers where you want both. |
| `favicon-16.svg` / `favicon-32.svg` | Browser tab favicons. (The live site uses Next.js's dynamic icon at `app/icon.tsx`, which renders the same design.) |

### `/social`

Pre-sized covers for every major platform:

| File | Platform | Size |
|---|---|---|
| `og-card-1200x630.svg` | OG card — Twitter / LinkedIn / Facebook link previews | 1200×630 |
| `twitter-banner-1500x500.svg` | X / Twitter header banner | 1500×500 |
| `linkedin-banner-1584x396.svg` | LinkedIn company / personal cover | 1584×396 |
| `instagram-square-1080.svg` | Instagram feed post | 1080×1080 |
| `discord-server-icon-512.svg` | Discord server icon (shown as circle) | 512×512 |

---

## How to export PNG / JPG (if a platform needs raster)

Most platforms accept SVG directly now. If you specifically need PNG:

**Fastest — any modern browser:**
1. Open the `.svg` file in Chrome / Safari / Firefox
2. Right-click → **Save As…** → choose PNG (some browsers) or screenshot the page
3. Or open in Figma → File → Export → PNG @ desired size

**From the command line (if you have ImageMagick or rsvg):**

```bash
# ImageMagick
magick brand/icons/icon-square-ink-gold.svg -resize 180x180 apple-touch-icon-180.png

# librsvg
rsvg-convert -w 180 -h 180 brand/icons/icon-square-ink-gold.svg -o apple-touch-icon-180.png
```

**Recommended PNG export sizes per platform:**

| Asset | Sizes |
|---|---|
| Browser favicon | 16, 32, 48 (ICO bundle) |
| iOS apple-touch-icon | 180×180 |
| Android home-screen | 192×192, 512×512 |
| iOS App Store | 1024×1024 |
| Google Play Store | 512×512 |
| Discord server icon | 512×512 |
| X / Twitter profile | 400×400 |
| Twitter header | 1500×500 (already SVG that size) |
| LinkedIn profile | 400×400 |
| LinkedIn cover | 1584×396 (already SVG that size) |
| Instagram profile | 320×320 (square SVG works fine) |
| Instagram post | 1080×1080 (already SVG that size) |
| GitHub avatar | 400×400 (circle icon already SVG) |

---

## Logo "Don'ts"

- Don't stretch — only scale uniformly
- Don't recolour outside the palette (no purple Skillzy, no rainbow gradients)
- Don't add drop shadows or strokes — the mark is meant to feel editorial / quiet
- Don't put "Skillzy" inside another logo lockup — it stands alone
- Don't use the italic-zy variant in stacked / square contexts — only horizontal

If you need a variant that doesn't exist here, ask and Claude can generate one.
