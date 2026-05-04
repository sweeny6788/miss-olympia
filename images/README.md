# Miss Olympia — Image Assets

This directory holds image assets that the site references but that are **not yet committed**. The client needs to provide the following files before the site is fully production-ready.

## Required files

### `og-image.jpg` — Open Graph / Twitter Card image
- **Path referenced in HTML:** `https://miss-olympia.vercel.app/images/og-image.jpg`
- **Dimensions:** 1200 × 630 px (the standard Open Graph aspect ratio)
- **Format:** JPEG (`.jpg`), reasonably compressed (under ~300 KB ideal)
- **Content:** A branded image — e.g. the Miss Olympia logo over a fragrance/perfumery photo, with the tagline "Parfumeri me mbushje në Tiranë" or similar. This is what appears as the preview when the site is shared on Facebook, Instagram, WhatsApp, Twitter/X, LinkedIn, etc.
- **Do not use** stock images of branded luxury bottles (Dior/Chanel/etc.) without permission — the business model is refill perfumery, so a neutral/branded shot is safer.

### `favicon.png` — Browser tab icon
- **Path referenced in HTML:** `/favicon.png` (placed at the site root, NOT inside `images/`)
- **Dimensions:** 32 × 32 px minimum (64 × 64 or 192 × 192 also fine — browsers will scale)
- **Format:** PNG with transparent background
- **Content:** A simplified version of the Miss Olympia logo or a single-letter mark ("M") in the brand burgundy (`#8B2252`).

> Note: `favicon.png` lives at the **site root** (`/favicon.png`), not in `images/`. It needs to be uploaded to the project root alongside `index.html`.

## Existing files
- `logo.svg` — primary brand logo (already present)
