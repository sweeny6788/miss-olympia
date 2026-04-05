# Miss Olympia — Fragrance Shop Website Design Spec

**Date:** 2026-04-05
**Purpose:** Frontend-only demo/pitch site for Miss Olympia, a designer fragrance retailer in Tirana, Albania. No backend functionality — this is a visual showcase to win the client.

---

## Business Context

- **Business:** Miss Olympia (@miss_olympia_tirane1 on Instagram)
- **Location:** Tirana, Albania
- **Products:** Designer/branded perfumes (Dior, Chanel, Versace, YSL, Tom Ford, Gucci, etc.)
- **Audience:** Men and women
- **Sales channel:** Currently Instagram-based; this site is a pitch to show what a web presence could look like

## Technical Decisions

- **Tech stack:** Plain HTML, CSS, vanilla JavaScript — no framework
- **Reason:** Easy to hand off, no build step, client can open files directly
- **Pages:** 4 separate HTML files with shared CSS/JS
- **Language:** Bilingual Albanian (primary) / English, client-side toggle
- **Responsiveness:** Mobile-first, fluid responsive up to 1200px max-width
- **Images:** Unsplash/placeholder perfume images initially; client provides real photos later
- **Functionality:** Frontend-only. Forms are visual only (no submission). Shop has no cart/checkout.

## Aesthetic Direction — Warm Neutral Elegance

### Color Palette

| Token              | Value     | Usage                        |
|--------------------|-----------|------------------------------|
| `--bg-primary`     | `#faf8f5` | Page background              |
| `--bg-secondary`   | `#f0ebe3` | Section backgrounds, cards   |
| `--bg-accent`      | `#ebe4da` | Borders, subtle dividers     |
| `--text-primary`   | `#2c2420` | Headings, primary text       |
| `--text-muted`     | `#9a8577` | Subheadings, captions        |
| `--text-body`      | `#5a4d44` | Body text                    |
| `--accent-gold`    | `#bea082` | Accent elements, decorative  |
| `--accent-light`   | `#d4c5b0` | Hover states, soft accents   |
| `--white`          | `#ffffff` | Cards, overlays              |

### Typography

- **Headings:** Playfair Display (Google Fonts) — elegant serif with character
- **Body:** Lato (Google Fonts) — clean, highly readable sans-serif
- **Accent/Labels:** Lato uppercase with wide letter-spacing for labels and navigation
- **Scale:** Fluid type using clamp() — min 16px body, max 18px

### Visual Language

- Generous whitespace — let the products breathe
- Subtle warm gradients on section backgrounds
- Thin gold divider lines as section separators
- Soft box shadows on cards (no harsh borders)
- Smooth scroll behavior and fade-in animations on scroll
- Hover effects: subtle scale on product cards, gold underline on nav links

---

## Page 1 — Homepage (`index.html`)

### Navigation Bar (shared across all pages)
- Fixed/sticky at top
- Logo "Miss Olympia" left-aligned (Playfair Display, uppercase, letter-spaced)
- Nav links center: Kryefaqja / Dyqani / Rreth Nesh / Kontakt
- Language toggle right: AL / EN pill button
- Mobile: hamburger menu with slide-in drawer
- Background: transparent on hero, becomes solid `--bg-primary` on scroll

### Section 1 — Hero
- Full-viewport height (100vh)
- Background: Large atmospheric perfume/fragrance image (Unsplash placeholder)
- Overlay: subtle warm gradient from bottom for text legibility
- Content centered:
  - "Miss Olympia" in large Playfair Display
  - Tagline: "Aroma qe definon elegancen" / "Scents that define elegance"
  - CTA button: "Eksploro Koleksionin" / "Explore Collection" — links to shop page
- Subtle parallax or slow zoom animation on the background image

### Section 2 — Brand Showcase
- Horizontal scrolling logo strip
- Grayscale brand logos, full color on hover
- Brands: Dior, Chanel, Versace, YSL, Dolce & Gabbana, Tom Ford, Gucci, Prada, Armani, Burberry
- Auto-scrolling infinite marquee animation
- Label above: "Brendet qe ne mbajme" / "Brands We Carry"

### Section 3 — Gender Split ("Per Femra / Per Meshkuj")
- Two large side-by-side cards (stack on mobile)
- Left: "Per Femra" (For Women) — feminine fragrance imagery, warm tones
- Right: "Per Meshkuj" (For Men) — masculine fragrance imagery, darker tones
- Each card: full-bleed image with text overlay and hover scale effect
- Links to shop page with gender pre-filtered (visual only in demo)

### Section 4 — Bestsellers / Featured Products
- Heading: "Me te Shitura" / "Bestsellers"
- 4-6 product cards in responsive grid (3-col desktop, 2-col tablet, 1-col mobile)
- Each card:
  - Product image (perfume bottle on clean background)
  - Brand name (small, uppercase, muted)
  - Product name (Playfair Display)
  - Volume (e.g., "100ml EDP")
  - Price in ALL (Albanian Lek)
  - Hover: subtle lift + shadow + "Shiko" / "View" button appears
- Placeholder products with realistic names and prices

### Section 5 — Trust Signals
- Full-width strip with `--bg-secondary` background
- 3 columns with icons:
  - Shield icon: "100% Origjinale" / "100% Authentic"
  - Map pin icon: "Dyqan ne Tirane" / "Store in Tirana"
  - Delivery icon: "Dergesa ne gjithe Shqiperine" / "Delivery across Albania"
- Clean SVG icons, centered text below each

### Section 6 — About Teaser
- Split layout: image left (store or lifestyle photo), text right
- Short paragraph about Miss Olympia's story and passion for fragrances
- CTA: "Lexo me shume" / "Read More" linking to About page
- Decorative gold divider line

### Section 7 — Instagram Feed + Footer
- **Instagram section:**
  - Heading: "Na ndiqni ne Instagram" / "Follow Us on Instagram"
  - 4-6 square image tiles in a grid (placeholder lifestyle/perfume images)
  - Hover: overlay with Instagram icon
  - Link to @miss_olympia_tirane1
- **Footer:**
  - 3 columns: Quick Links / Contact Info / Social Media
  - Copyright: "2026 Miss Olympia. Te gjitha te drejtat te rezervuara."
  - Language toggle repeated in footer

---

## Page 2 — Shop (`shop.html`)

### Layout
- Page heading: "Koleksioni Yne" / "Our Collection"
- Filter bar at top:
  - Gender pills: Te Gjitha / Per Femra / Per Meshkuj (All / For Women / For Men)
  - Brand dropdown or horizontal pill scroll
  - Filters are visual only — JavaScript toggles visibility of cards
- Product grid: 3 columns desktop, 2 tablet, 1 mobile
- 12-16 placeholder product cards (mix of men's and women's fragrances)
- Each card same design as homepage bestsellers section

### Product Card Design
- Clean white card with soft shadow
- Product image: 60% of card height
- Below image:
  - Brand (uppercase, small, `--text-muted`)
  - Product name (Playfair Display, `--text-primary`)
  - Size + type (e.g., "100ml Eau de Parfum")
  - Price: "4,500 L" format
- Hover: lift animation, gold border-bottom appears

---

## Page 3 — About (`about.html`)

### Section 1 — Hero Banner
- Half-height hero with warm lifestyle/store imagery
- Overlay text: "Rreth Nesh" / "About Us"

### Section 2 — Our Story
- Two-column layout (image + text), reverses on mobile
- Story of Miss Olympia — curated text about passion for fragrances, years in business, Tirana roots
- Tone: warm, personal, authentic

### Section 3 — Our Values
- 3-column grid with icons:
  - "Autenticitet" / "Authenticity" — only genuine products
  - "Kuratesim" / "Curation" — hand-picked selections
  - "Ekspertize" / "Expertise" — knowledgeable staff
- Each with a short paragraph

### Section 4 — Visit Us
- Large embedded map placeholder (Google Maps iframe or styled static image)
- Address, phone, hours displayed beside it

---

## Page 4 — Contact (`contact.html`)

### Section 1 — Contact Header
- Heading: "Na Kontaktoni" / "Contact Us"
- Subtitle: "Jemi ketu per t'ju ndihmuar" / "We're here to help"

### Section 2 — Contact Methods (3-column grid)
- **Instagram DM:** Icon + link to @miss_olympia_tirane1
- **WhatsApp:** Icon + placeholder phone number with wa.me link
- **Phone:** Icon + placeholder clickable tel: link
- *(Phone/WhatsApp numbers are placeholders — client provides real ones)*

### Section 3 — Contact Form
- Fields: Emri / Name, Email, Mesazhi / Message
- Submit button (visual only — no backend)
- Styled with warm tones, gold accent on focus states

### Section 4 — Location
- Map embed + address + business hours

---

## Shared Components

### Navbar
- Shared HTML structure across all pages
- Active page highlighted with gold underline
- Scroll behavior: transparent to solid background transition on homepage

### Footer
- Identical across all pages
- Quick links, contact info, social icons, copyright

### Language Toggle
- AL/EN pill button
- JavaScript swaps text content using data attributes: `data-al="..."` `data-en="..."`
- Stores preference in localStorage
- No page reload — instant switch

### Scroll Animations
- Sections fade in + slide up on scroll using IntersectionObserver
- Staggered delays for grid items
- CSS-only where possible, minimal JS

---

## File Structure

```
miss-olympia/
  index.html          # Homepage
  shop.html           # Shop / Products
  about.html          # About Us
  contact.html        # Contact
  css/
    style.css         # All styles (single file, CSS custom properties)
  js/
    main.js           # Language toggle, scroll animations, mobile menu, filters
  images/
    logo.svg          # Miss Olympia logo (text-based SVG)
    hero.jpg          # Hero background
    her.jpg           # For Her section image
    him.jpg           # For Him section image
    about-hero.jpg    # About page hero
    store.jpg         # Store/lifestyle photo
    products/         # Product bottle images (placeholders)
    brands/           # Brand logo SVGs
    instagram/        # Instagram grid placeholders
```

## Placeholder Content

Since this is a demo, all product names, prices, and images are realistic placeholders:
- Use well-known fragrance names (Dior Sauvage, Chanel No.5, etc.)
- Prices in Albanian Lek (realistic range: 3,000 - 15,000 L)
- High-quality Unsplash perfume images
- Brand logos as simple text or SVG approximations (no trademark issues for a demo)

## Out of Scope

- No cart or checkout functionality
- No user accounts or authentication
- No backend or database
- No actual form submission
- No real Instagram API integration (static placeholder grid)
- No SEO optimization (demo only)
- No analytics
