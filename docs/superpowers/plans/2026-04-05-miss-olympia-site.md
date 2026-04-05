# Miss Olympia Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page frontend-only demo website for Miss Olympia fragrance shop in Tirana, Albania.

**Architecture:** Plain HTML/CSS/JS with no framework or build step. 4 HTML files share a single CSS file and single JS file. Bilingual content uses `data-al`/`data-en` attributes toggled by JS. Placeholder images use Unsplash URLs via `https://images.unsplash.com/`.

**Tech Stack:** HTML5, CSS3 (custom properties, clamp(), grid, flexbox), vanilla JavaScript (IntersectionObserver, localStorage), Google Fonts (Playfair Display, Lato)

**Spec:** `docs/superpowers/specs/2026-04-05-miss-olympia-website-design.md`

**Note on innerHTML:** The language toggle uses `el.innerHTML` because some bilingual content contains `<br>` tags. All data comes from trusted hardcoded `data-al`/`data-en` attributes — no user input. This is safe for a static demo site.

---

## File Map

| File | Responsibility |
|------|---------------|
| `css/style.css` | All styles: reset, custom properties, typography, layout, components, animations, responsive |
| `js/main.js` | Language toggle, scroll animations, mobile menu, shop filters, navbar scroll effect |
| `index.html` | Homepage: hero, brands, gender split, bestsellers, trust signals, about teaser, instagram, footer |
| `shop.html` | Shop: filter bar + 16 product cards in grid |
| `about.html` | About: hero banner, story, values, visit us / map |
| `contact.html` | Contact: methods, form, map |
| `images/logo.svg` | Text-based SVG logo |

---

### Task 1: CSS Foundation + Logo SVG

**Files:**
- Create: `css/style.css`
- Create: `images/logo.svg`

This task builds the entire design system: reset, custom properties, typography, and all reusable component styles. Every subsequent task just writes HTML that uses these classes.

- [ ] **Step 1: Create the logo SVG**

Create `images/logo.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 60">
  <text x="200" y="42" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="36" font-weight="700" letter-spacing="6" fill="#2c2420">MISS OLYMPIA</text>
</svg>
```

- [ ] **Step 2: Create style.css with full design system**

Create `css/style.css` with the following sections in order. This is the complete CSS for the entire site.

**Section 1 — Reset + Custom Properties:**

```css
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg-primary: #faf8f5;
  --bg-secondary: #f0ebe3;
  --bg-accent: #ebe4da;
  --text-primary: #2c2420;
  --text-muted: #9a8577;
  --text-body: #5a4d44;
  --accent-gold: #bea082;
  --accent-light: #d4c5b0;
  --white: #ffffff;
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Lato', 'Segoe UI', sans-serif;
  --max-width: 1200px;
  --nav-height: 72px;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  font-size: clamp(16px, 1.1vw, 18px);
  line-height: 1.7;
  color: var(--text-body);
  background: var(--bg-primary);
  -webkit-font-smoothing: antialiased;
}

img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }
```

**Section 2 — Typography:**

```css
h1, h2, h3, h4 { font-family: var(--font-heading); color: var(--text-primary); line-height: 1.2; }
h1 { font-size: clamp(2.4rem, 5vw, 4rem); letter-spacing: 3px; }
h2 { font-size: clamp(1.8rem, 3vw, 2.6rem); letter-spacing: 1px; }
h3 { font-size: clamp(1.2rem, 2vw, 1.5rem); }
.label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-muted);
}
.section-divider {
  width: 60px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
  margin: 1rem auto;
}
```

**Section 3 — Layout utilities:**

```css
.container { max-width: var(--max-width); margin: 0 auto; padding: 0 1.5rem; }
.section { padding: 6rem 0; }
.section--alt { background: var(--bg-secondary); }
.text-center { text-align: center; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }

@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
}
@media (min-width: 769px) and (max-width: 1024px) {
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
}
```

**Section 4 — Navbar:**

```css
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  height: var(--nav-height);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 2rem;
  transition: background 0.4s, box-shadow 0.4s;
}
.navbar.scrolled {
  background: var(--bg-primary);
  box-shadow: 0 2px 20px rgba(44,36,32,0.06);
}
.navbar.page-nav {
  background: var(--bg-primary);
  box-shadow: 0 2px 20px rgba(44,36,32,0.06);
}
.nav-logo { font-family: var(--font-heading); font-size: 1.4rem; letter-spacing: 4px; text-transform: uppercase; color: var(--text-primary); font-weight: 700; }
.nav-links { display: flex; gap: 2rem; align-items: center; }
.nav-links a {
  font-family: var(--font-body); font-size: 0.8rem; letter-spacing: 2px;
  text-transform: uppercase; color: var(--text-body);
  position: relative; transition: color 0.3s;
}
.nav-links a::after {
  content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1.5px;
  background: var(--accent-gold); transition: width 0.3s;
}
.nav-links a:hover::after, .nav-links a.active::after { width: 100%; }
.nav-links a:hover { color: var(--text-primary); }

.lang-toggle {
  display: flex; border: 1px solid var(--bg-accent); border-radius: 20px; overflow: hidden;
}
.lang-toggle button {
  border: none; background: transparent; padding: 0.35rem 0.8rem;
  font-family: var(--font-body); font-size: 0.7rem; letter-spacing: 1px;
  cursor: pointer; color: var(--text-muted); transition: all 0.3s;
}
.lang-toggle button.active {
  background: var(--accent-gold); color: var(--white);
}

.hamburger {
  display: none; flex-direction: column; gap: 5px; cursor: pointer;
  background: none; border: none; padding: 4px;
}
.hamburger span {
  width: 24px; height: 1.5px; background: var(--text-primary);
  transition: all 0.3s;
}
.hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(4px, 5px); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(4px, -5px); }

.mobile-menu {
  display: none; position: fixed; top: var(--nav-height); left: 0; right: 0; bottom: 0;
  background: var(--bg-primary); flex-direction: column; align-items: center;
  justify-content: center; gap: 2rem; z-index: 999;
}
.mobile-menu.open { display: flex; }
.mobile-menu a {
  font-family: var(--font-heading); font-size: 1.5rem; color: var(--text-primary);
  letter-spacing: 2px;
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .hamburger { display: flex; }
}
```

**Section 5 — Hero:**

```css
.hero {
  position: relative; height: 100vh; display: flex; align-items: center;
  justify-content: center; text-align: center; overflow: hidden;
}
.hero-bg {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  animation: heroZoom 20s ease-in-out infinite alternate;
}
@keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.08); } }
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(250,248,245,0.2) 0%, rgba(240,235,227,0.7) 60%, rgba(250,248,245,0.95) 100%);
}
.hero-content { position: relative; z-index: 1; }
.hero-content h1 { margin-bottom: 0.5rem; }
.hero-content .tagline {
  font-family: var(--font-body); font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: var(--text-muted); letter-spacing: 2px; margin-bottom: 2rem;
}
.btn {
  display: inline-block; padding: 0.9rem 2.5rem;
  font-family: var(--font-body); font-size: 0.8rem; letter-spacing: 3px;
  text-transform: uppercase; border: 1.5px solid var(--accent-gold);
  color: var(--text-primary); background: transparent;
  transition: all 0.4s; cursor: pointer;
}
.btn:hover { background: var(--accent-gold); color: var(--white); }
.btn--filled { background: var(--accent-gold); color: var(--white); }
.btn--filled:hover { background: var(--text-primary); border-color: var(--text-primary); }

.page-hero {
  height: 50vh; display: flex; align-items: center; justify-content: center;
  text-align: center; position: relative; overflow: hidden;
  margin-top: var(--nav-height);
}
.page-hero .hero-bg { animation: none; }
.page-hero .hero-overlay {
  background: linear-gradient(180deg, rgba(250,248,245,0.3) 0%, rgba(240,235,227,0.85) 100%);
}
```

**Section 6 — Brand marquee:**

```css
.brand-marquee { overflow: hidden; padding: 2rem 0; }
.brand-track {
  display: flex; gap: 4rem; animation: marquee 30s linear infinite;
  width: max-content;
}
.brand-track span {
  font-family: var(--font-heading); font-size: 1.2rem; letter-spacing: 3px;
  color: var(--accent-light); text-transform: uppercase; white-space: nowrap;
  transition: color 0.3s;
}
.brand-track span:hover { color: var(--accent-gold); }
@keyframes marquee { to { transform: translateX(-50%); } }
```

**Section 7 — Gender split cards:**

```css
.gender-split { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.gender-card {
  position: relative; height: 500px; overflow: hidden; cursor: pointer; display: block;
}
.gender-card img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.6s ease;
}
.gender-card:hover img { transform: scale(1.05); }
.gender-card .overlay {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  background: linear-gradient(180deg, transparent 30%, rgba(44,36,32,0.5) 100%);
  transition: background 0.4s;
}
.gender-card:hover .overlay { background: linear-gradient(180deg, transparent 20%, rgba(44,36,32,0.65) 100%); }
.gender-card .overlay h2 { color: var(--white); font-size: clamp(1.5rem, 3vw, 2.2rem); }
.gender-card .overlay .label { color: rgba(255,255,255,0.8); margin-bottom: 0.5rem; }

@media (max-width: 768px) {
  .gender-split { grid-template-columns: 1fr; }
  .gender-card { height: 350px; }
}
```

**Section 8 — Product cards:**

```css
.product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.product-card {
  background: var(--white); overflow: hidden;
  box-shadow: 0 2px 15px rgba(44,36,32,0.04);
  transition: transform 0.4s, box-shadow 0.4s;
  position: relative;
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(44,36,32,0.08);
}
.product-card::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 2px; background: var(--accent-gold); transform: scaleX(0);
  transition: transform 0.4s;
}
.product-card:hover::after { transform: scaleX(1); }
.product-card-img {
  height: 280px; overflow: hidden; background: var(--bg-secondary);
  display: flex; align-items: center; justify-content: center;
}
.product-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.product-card:hover .product-card-img img { transform: scale(1.05); }
.product-card-body { padding: 1.2rem 1.5rem 1.5rem; }
.product-card-brand {
  font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase;
  color: var(--text-muted); margin-bottom: 0.3rem;
}
.product-card-name { font-family: var(--font-heading); font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.3rem; }
.product-card-volume { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem; }
.product-card-price { font-family: var(--font-heading); font-size: 1.15rem; color: var(--text-primary); }
.product-card-btn {
  display: block; text-align: center; padding: 0.7rem;
  font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase;
  color: var(--accent-gold); border-top: 1px solid var(--bg-accent);
  margin-top: 1rem; transition: all 0.3s;
  opacity: 0; transform: translateY(5px);
}
.product-card:hover .product-card-btn { opacity: 1; transform: translateY(0); }
.product-card-btn:hover { background: var(--accent-gold); color: var(--white); }

@media (max-width: 768px) { .product-grid { grid-template-columns: 1fr; } }
@media (min-width: 769px) and (max-width: 1024px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
```

**Section 9 — Trust signals:**

```css
.trust-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; text-align: center; }
.trust-item svg { width: 40px; height: 40px; stroke: var(--accent-gold); fill: none; stroke-width: 1.5; margin-bottom: 1rem; }
.trust-item h3 { font-size: 1rem; margin-bottom: 0.3rem; }
.trust-item p { font-size: 0.85rem; color: var(--text-muted); }

@media (max-width: 768px) { .trust-grid { grid-template-columns: 1fr; gap: 3rem; } }
```

**Section 10 — About teaser (split layout):**

```css
.split-section { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
.split-section img { width: 100%; height: 400px; object-fit: cover; }
.split-section .content h2 { margin-bottom: 1rem; }
.split-section .content p { margin-bottom: 1.5rem; }

@media (max-width: 768px) {
  .split-section { grid-template-columns: 1fr; gap: 2rem; }
  .split-section img { height: 300px; }
}
```

**Section 11 — Instagram grid:**

```css
.insta-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; }
.insta-item {
  position: relative; aspect-ratio: 1; overflow: hidden; cursor: pointer; display: block;
}
.insta-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.insta-item:hover img { transform: scale(1.08); }
.insta-item .insta-overlay {
  position: absolute; inset: 0; background: rgba(44,36,32,0.4);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.3s;
}
.insta-item:hover .insta-overlay { opacity: 1; }
.insta-item .insta-overlay svg { width: 32px; height: 32px; fill: var(--white); }

@media (max-width: 768px) { .insta-grid { grid-template-columns: repeat(2, 1fr); } }
```

**Section 12 — Footer:**

```css
.footer { background: var(--text-primary); color: rgba(255,255,255,0.7); padding: 4rem 0 2rem; }
.footer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.footer h4 { font-family: var(--font-heading); color: var(--white); margin-bottom: 1rem; font-size: 1.1rem; }
.footer a { color: rgba(255,255,255,0.6); font-size: 0.9rem; transition: color 0.3s; display: block; margin-bottom: 0.5rem; }
.footer a:hover { color: var(--accent-gold); }
.footer-bottom {
  margin-top: 3rem; padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  text-align: center; font-size: 0.8rem; color: rgba(255,255,255,0.4);
}
.social-links { display: flex; gap: 1rem; }
.social-links a {
  width: 36px; height: 36px; border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  transition: all 0.3s; margin-bottom: 0;
}
.social-links a:hover { border-color: var(--accent-gold); background: var(--accent-gold); }
.social-links svg { width: 16px; height: 16px; fill: rgba(255,255,255,0.7); }

@media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr; } }
```

**Section 13 — Shop page filters:**

```css
.filter-bar { display: flex; gap: 0.8rem; flex-wrap: wrap; justify-content: center; margin-bottom: 3rem; }
.filter-pill {
  padding: 0.5rem 1.5rem; border: 1px solid var(--bg-accent);
  font-family: var(--font-body); font-size: 0.75rem; letter-spacing: 2px;
  text-transform: uppercase; cursor: pointer; background: transparent;
  color: var(--text-muted); transition: all 0.3s;
}
.filter-pill.active, .filter-pill:hover {
  background: var(--accent-gold); color: var(--white); border-color: var(--accent-gold);
}
```

**Section 14 — Contact form:**

```css
.contact-form { max-width: 600px; margin: 0 auto; }
.form-group { margin-bottom: 1.5rem; }
.form-group label {
  display: block; font-size: 0.75rem; letter-spacing: 2px;
  text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;
}
.form-group input, .form-group textarea {
  width: 100%; padding: 0.9rem 1rem; border: 1px solid var(--bg-accent);
  font-family: var(--font-body); font-size: 0.95rem; color: var(--text-body);
  background: var(--white); transition: border-color 0.3s; outline: none;
}
.form-group input:focus, .form-group textarea:focus { border-color: var(--accent-gold); }
.form-group textarea { height: 150px; resize: vertical; }
```

**Section 15 — Contact method cards:**

```css
.contact-method {
  text-align: center; padding: 2.5rem 1.5rem; background: var(--white);
  box-shadow: 0 2px 15px rgba(44,36,32,0.04); transition: transform 0.3s;
}
.contact-method:hover { transform: translateY(-4px); }
.contact-method svg { width: 36px; height: 36px; stroke: var(--accent-gold); fill: none; stroke-width: 1.5; margin-bottom: 1rem; }
.contact-method h3 { margin-bottom: 0.5rem; }
.contact-method p { font-size: 0.9rem; color: var(--text-muted); }
.contact-method a { color: var(--accent-gold); font-weight: 600; }
```

**Section 16 — Values grid (about page):**

```css
.value-card { text-align: center; padding: 2rem; }
.value-card svg { width: 48px; height: 48px; stroke: var(--accent-gold); fill: none; stroke-width: 1.5; margin-bottom: 1rem; }
.value-card h3 { margin-bottom: 0.5rem; }
.value-card p { font-size: 0.9rem; color: var(--text-muted); }
```

**Section 17 — Scroll animations:**

```css
.fade-in {
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.fade-in.visible { opacity: 1; transform: translateY(0); }
.fade-in-delay-1 { transition-delay: 0.1s; }
.fade-in-delay-2 { transition-delay: 0.2s; }
.fade-in-delay-3 { transition-delay: 0.3s; }
.fade-in-delay-4 { transition-delay: 0.4s; }
.fade-in-delay-5 { transition-delay: 0.5s; }
.fade-in-delay-6 { transition-delay: 0.6s; }
```

- [ ] **Step 3: Verify CSS file**

Open `css/style.css` and confirm it has all 17 sections. File should be approximately 350-400 lines.

- [ ] **Step 4: Commit**

```bash
git add css/style.css images/logo.svg
git commit -m "feat: add complete design system CSS and logo SVG"
```

---

### Task 2: Homepage (`index.html`)

**Files:**
- Create: `index.html`

**Depends on:** Task 1 (CSS must exist)

The homepage has 7 content sections plus navbar and footer. All text uses `data-al`/`data-en` attributes for bilingual support.

- [ ] **Step 1: Create index.html**

Create `index.html` with this structure. The complete HTML follows.

**Document head:**

```html
<!DOCTYPE html>
<html lang="sq">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Miss Olympia — Parfumeri | Tiranë</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
```

**Navbar** (used identically on all 4 pages, only `active` class changes):

```html
<body>
  <nav class="navbar" id="navbar">
    <a href="index.html" class="nav-logo">Miss Olympia</a>
    <div class="nav-links">
      <a href="index.html" class="active" data-al="Kryefaqja" data-en="Home">Kryefaqja</a>
      <a href="shop.html" data-al="Dyqani" data-en="Shop">Dyqani</a>
      <a href="about.html" data-al="Rreth Nesh" data-en="About">Rreth Nesh</a>
      <a href="contact.html" data-al="Kontakt" data-en="Contact">Kontakt</a>
      <div class="lang-toggle">
        <button class="active" data-lang="al">AL</button>
        <button data-lang="en">EN</button>
      </div>
    </div>
    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="mobile-menu" id="mobileMenu">
    <a href="index.html" data-al="Kryefaqja" data-en="Home">Kryefaqja</a>
    <a href="shop.html" data-al="Dyqani" data-en="Shop">Dyqani</a>
    <a href="about.html" data-al="Rreth Nesh" data-en="About">Rreth Nesh</a>
    <a href="contact.html" data-al="Kontakt" data-en="Contact">Kontakt</a>
    <div class="lang-toggle">
      <button class="active" data-lang="al">AL</button>
      <button data-lang="en">EN</button>
    </div>
  </div>
```

**Section 1 — Hero:**

Use Unsplash image: `https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920&q=80`

```html
  <section class="hero">
    <div class="hero-bg" style="background-image: url('https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920&q=80');"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <p class="label fade-in" data-al="Parfumeri në Tiranë" data-en="Perfumery in Tirana">Parfumeri në Tiranë</p>
      <h1 class="fade-in">Miss Olympia</h1>
      <div class="section-divider fade-in"></div>
      <p class="tagline fade-in" data-al="Aroma që definon elegancën" data-en="Scents that define elegance">Aroma që definon elegancën</p>
      <a href="shop.html" class="btn fade-in" data-al="Eksploro Koleksionin" data-en="Explore Collection">Eksploro Koleksionin</a>
    </div>
  </section>
```

**Section 2 — Brand Marquee:**

```html
  <section class="section text-center">
    <div class="container">
      <p class="label fade-in" data-al="Brendet që ne mbajmë" data-en="Brands We Carry">Brendet që ne mbajmë</p>
      <div class="section-divider"></div>
    </div>
    <div class="brand-marquee">
      <div class="brand-track">
        <span>Dior</span><span>Chanel</span><span>Versace</span><span>Yves Saint Laurent</span>
        <span>Tom Ford</span><span>Gucci</span><span>Prada</span><span>Armani</span>
        <span>Dolce &amp; Gabbana</span><span>Burberry</span>
        <span>Dior</span><span>Chanel</span><span>Versace</span><span>Yves Saint Laurent</span>
        <span>Tom Ford</span><span>Gucci</span><span>Prada</span><span>Armani</span>
        <span>Dolce &amp; Gabbana</span><span>Burberry</span>
      </div>
    </div>
  </section>
```

Note: Brand names duplicated in track for seamless marquee loop.

**Section 3 — Gender Split:**

Images:
- For Her: `https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80`
- For Him: `https://images.unsplash.com/photo-1594035910387-fbd1a485b12e?w=800&q=80`

```html
  <section class="section">
    <div class="container">
      <div class="gender-split">
        <a href="shop.html" class="gender-card fade-in">
          <img src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80" alt="Fragrance for women">
          <div class="overlay">
            <p class="label" data-al="Koleksioni" data-en="Collection">Koleksioni</p>
            <h2 data-al="Për Femra" data-en="For Women">Për Femra</h2>
          </div>
        </a>
        <a href="shop.html" class="gender-card fade-in fade-in-delay-2">
          <img src="https://images.unsplash.com/photo-1594035910387-fbd1a485b12e?w=800&q=80" alt="Fragrance for men">
          <div class="overlay">
            <p class="label" data-al="Koleksioni" data-en="Collection">Koleksioni</p>
            <h2 data-al="Për Meshkuj" data-en="For Men">Për Meshkuj</h2>
          </div>
        </a>
      </div>
    </div>
  </section>
```

**Section 4 — Bestsellers (6 product cards):**

Product data:

| Brand | Name | Volume | Price | Image |
|-------|------|--------|-------|-------|
| Dior | Sauvage | 100ml EDP | 12,500 L | photo-1523293182086-7651a899d37f |
| Chanel | No. 5 | 100ml EDP | 14,800 L | photo-1592945403244-b3fbafd7f539 |
| Versace | Bright Crystal | 90ml EDT | 8,900 L | photo-1563170351-be82bc888aa4 |
| Tom Ford | Black Orchid | 50ml EDP | 15,200 L | photo-1587017539504-67cfbddac569 |
| YSL | Libre | 90ml EDP | 11,300 L | photo-1595425970377-c9703cf48b6d |
| Armani | Acqua di Gio | 100ml EDT | 9,600 L | photo-1557170334-a9632e77c6e4 |

Image URL format: `https://images.unsplash.com/IMAGE_ID?w=600&q=80`

```html
  <section class="section section--alt">
    <div class="container text-center">
      <p class="label fade-in" data-al="Zgjedhjet tona" data-en="Our Picks">Zgjedhjet tona</p>
      <h2 class="fade-in" data-al="Më të Shitura" data-en="Bestsellers">Më të Shitura</h2>
      <div class="section-divider"></div>
    </div>
    <div class="container" style="margin-top: 3rem;">
      <div class="product-grid">
        <!-- Generate 6 cards using the product data table above.
             Each card uses this template: -->
        <div class="product-card fade-in fade-in-delay-N">
          <div class="product-card-img">
            <img src="IMAGE_URL" alt="BRAND NAME">
          </div>
          <div class="product-card-body">
            <p class="product-card-brand">BRAND</p>
            <h3 class="product-card-name">NAME</h3>
            <p class="product-card-volume">VOLUME Eau de Parfum/Toilette</p>
            <p class="product-card-price">PRICE</p>
            <a href="#" class="product-card-btn" data-al="Shiko" data-en="View">Shiko</a>
          </div>
        </div>
        <!-- fade-in-delay-1 through fade-in-delay-6 for staggering -->
      </div>
    </div>
  </section>
```

**Section 5 — Trust Signals:**

```html
  <section class="section">
    <div class="container">
      <div class="trust-grid">
        <div class="trust-item fade-in fade-in-delay-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <h3 data-al="100% Origjinale" data-en="100% Authentic">100% Origjinale</h3>
          <p data-al="Vetëm produkte origjinale nga brendet më të njohura" data-en="Only genuine products from the most renowned brands">Vetëm produkte origjinale nga brendet më të njohura</p>
        </div>
        <div class="trust-item fade-in fade-in-delay-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <h3 data-al="Dyqan në Tiranë" data-en="Store in Tirana">Dyqan në Tiranë</h3>
          <p data-al="Vizitoni dyqanin tonë në zemër të Tiranës" data-en="Visit our store in the heart of Tirana">Vizitoni dyqanin tonë në zemër të Tiranës</p>
        </div>
        <div class="trust-item fade-in fade-in-delay-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          <h3 data-al="Dërgesë në Shqipëri" data-en="Delivery in Albania">Dërgesë në Shqipëri</h3>
          <p data-al="Dërgesë e shpejtë në të gjithë Shqipërinë" data-en="Fast delivery across all of Albania">Dërgesë e shpejtë në të gjithë Shqipërinë</p>
        </div>
      </div>
    </div>
  </section>
```

**Section 6 — About Teaser:**

Image: `https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80`

```html
  <section class="section section--alt">
    <div class="container">
      <div class="split-section fade-in">
        <img src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80" alt="Miss Olympia Store">
        <div class="content">
          <p class="label" data-al="Historia jonë" data-en="Our Story">Historia jonë</p>
          <h2 data-al="Pasioni për Parfumin" data-en="A Passion for Fragrance">Pasioni për Parfumin</h2>
          <div class="section-divider" style="margin: 1rem 0;"></div>
          <p data-al="Miss Olympia u themelua me një vizion të thjeshtë — të sjellë parfumet më të mira të botës në Tiranë. Çdo shishe në koleksionin tonë zgjidhet me kujdes për cilësinë dhe elegancën e saj." data-en="Miss Olympia was founded with a simple vision — to bring the world's finest fragrances to Tirana. Every bottle in our collection is carefully selected for its quality and elegance.">Miss Olympia u themelua me një vizion të thjeshtë — të sjellë parfumet më të mira të botës në Tiranë. Çdo shishe në koleksionin tonë zgjidhet me kujdes për cilësinë dhe elegancën e saj.</p>
          <a href="about.html" class="btn" data-al="Lexo Më Shumë" data-en="Read More">Lexo Më Shumë</a>
        </div>
      </div>
    </div>
  </section>
```

**Section 7 — Instagram Feed:**

4 images:
- `https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&q=80`
- `https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80`
- `https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=400&q=80`
- `https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=400&q=80`

Each item wraps in `<a>` linking to the Instagram page:

```html
  <section class="section text-center">
    <div class="container">
      <p class="label fade-in" data-al="Na ndiqni" data-en="Follow Us">Na ndiqni</p>
      <h2 class="fade-in">@miss_olympia_tirane1</h2>
      <div class="section-divider"></div>
    </div>
    <div class="container" style="margin-top: 2rem;">
      <div class="insta-grid">
        <!-- 4 items, each using this template with fade-in-delay-1 through 4: -->
        <a href="https://www.instagram.com/miss_olympia_tirane1/" target="_blank" class="insta-item fade-in fade-in-delay-N">
          <img src="IMAGE_URL" alt="Instagram">
          <div class="insta-overlay">
            <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </div>
        </a>
      </div>
    </div>
  </section>
```

**Footer** (used identically on all 4 pages):

```html
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <h4 data-al="Lidhje të Shpejta" data-en="Quick Links">Lidhje të Shpejta</h4>
          <a href="index.html" data-al="Kryefaqja" data-en="Home">Kryefaqja</a>
          <a href="shop.html" data-al="Dyqani" data-en="Shop">Dyqani</a>
          <a href="about.html" data-al="Rreth Nesh" data-en="About">Rreth Nesh</a>
          <a href="contact.html" data-al="Kontakt" data-en="Contact">Kontakt</a>
        </div>
        <div>
          <h4 data-al="Kontakt" data-en="Contact">Kontakt</h4>
          <a href="tel:+355691234567">+355 69 123 4567</a>
          <a href="mailto:info@missolympia.al">info@missolympia.al</a>
          <a data-al="Tiranë, Shqipëri" data-en="Tirana, Albania">Tiranë, Shqipëri</a>
        </div>
        <div>
          <h4 data-al="Na Ndiqni" data-en="Follow Us">Na Ndiqni</h4>
          <div class="social-links">
            <a href="https://www.instagram.com/miss_olympia_tirane1/" target="_blank" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://wa.me/355691234567" target="_blank" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Miss Olympia. <span data-al="Të gjitha të drejtat të rezervuara." data-en="All rights reserved.">Të gjitha të drejtat të rezervuara.</span></p>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open index.html in browser and verify**

Verify: hero full-screen, brand marquee scrolls (CSS), gender cards side-by-side, 6 product cards in grid, trust signals 3-col, about teaser split layout, instagram 4-col grid, footer 3-col.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add homepage with all 7 sections"
```

---

### Task 3: Shop Page (`shop.html`)

**Files:**
- Create: `shop.html`

**Depends on:** Task 1 (CSS)

- [ ] **Step 1: Create shop.html**

Same `<head>` as index.html. Navbar with `active` on Dyqani link and `page-nav` class:

```html
<nav class="navbar page-nav" id="navbar">
```

Half-height hero:

```html
  <section class="page-hero">
    <div class="hero-bg" style="background-image: url('https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=1920&q=80');"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <p class="label" data-al="Koleksioni" data-en="Collection">Koleksioni</p>
      <h1 data-al="Dyqani Ynë" data-en="Our Shop">Dyqani Ynë</h1>
    </div>
  </section>
```

Filter bar + product grid:

```html
  <section class="section">
    <div class="container">
      <div class="filter-bar" id="filterBar">
        <button class="filter-pill active" data-filter="all" data-al="Të Gjitha" data-en="All">Të Gjitha</button>
        <button class="filter-pill" data-filter="women" data-al="Për Femra" data-en="For Women">Për Femra</button>
        <button class="filter-pill" data-filter="men" data-al="Për Meshkuj" data-en="For Men">Për Meshkuj</button>
      </div>
      <div class="product-grid" id="productGrid">
        <!-- 16 product cards -->
      </div>
    </div>
  </section>
```

Product card template (each card has `data-gender="women"` or `data-gender="men"`):

```html
<div class="product-card fade-in" data-gender="GENDER">
  <div class="product-card-img">
    <img src="IMAGE_URL" alt="BRAND NAME">
  </div>
  <div class="product-card-body">
    <p class="product-card-brand">BRAND</p>
    <h3 class="product-card-name">NAME</h3>
    <p class="product-card-volume">VOLUME</p>
    <p class="product-card-price">PRICE</p>
    <a href="#" class="product-card-btn" data-al="Shiko" data-en="View">Shiko</a>
  </div>
</div>
```

16 product cards data (use `https://images.unsplash.com/IMAGE_ID?w=600&q=80`):

| # | Gender | Brand | Name | Volume | Price | Image ID |
|---|--------|-------|------|--------|-------|----------|
| 1 | men | Dior | Sauvage | 100ml Eau de Parfum | 12,500 L | photo-1523293182086-7651a899d37f |
| 2 | women | Chanel | No. 5 | 100ml Eau de Parfum | 14,800 L | photo-1592945403244-b3fbafd7f539 |
| 3 | women | Versace | Bright Crystal | 90ml Eau de Toilette | 8,900 L | photo-1563170351-be82bc888aa4 |
| 4 | men | Tom Ford | Black Orchid | 50ml Eau de Parfum | 15,200 L | photo-1587017539504-67cfbddac569 |
| 5 | women | YSL | Libre | 90ml Eau de Parfum | 11,300 L | photo-1595425970377-c9703cf48b6d |
| 6 | men | Armani | Acqua di Gio | 100ml Eau de Toilette | 9,600 L | photo-1557170334-a9632e77c6e4 |
| 7 | women | Dior | J'adore | 100ml Eau de Parfum | 13,200 L | photo-1541643600914-78b084683601 |
| 8 | men | Versace | Eros | 100ml Eau de Toilette | 8,200 L | photo-1594035910387-fbd1a485b12e |
| 9 | women | Chanel | Coco Mademoiselle | 100ml Eau de Parfum | 14,500 L | photo-1588405748880-12d1d2a59f75 |
| 10 | men | Prada | Luna Rossa Carbon | 100ml Eau de Toilette | 10,800 L | photo-1590736969955-71cc94901144 |
| 11 | women | Lancôme | La Vie Est Belle | 75ml Eau de Parfum | 9,900 L | photo-1585386959984-a4155224a1ad |
| 12 | men | Dolce & Gabbana | The One | 100ml Eau de Parfum | 9,400 L | photo-1547887538-e3a2f32cb1cc |
| 13 | women | Gucci | Bloom | 100ml Eau de Parfum | 10,600 L | photo-1608528577891-eb055944f2e7 |
| 14 | men | Burberry | Hero | 100ml Eau de Parfum | 8,700 L | photo-1615634260167-c8cdede054de |
| 15 | women | Prada | Paradoxe | 90ml Eau de Parfum | 12,100 L | photo-1523293182086-7651a899d37f |
| 16 | men | YSL | Y | 100ml Eau de Parfum | 10,200 L | photo-1592945403244-b3fbafd7f539 |

Include the same footer as index.html.

- [ ] **Step 2: Verify in browser**

Open `shop.html`. Verify page hero, filter pills, 16 cards in grid.

- [ ] **Step 3: Commit**

```bash
git add shop.html
git commit -m "feat: add shop page with 16 product cards and filter bar"
```

---

### Task 4: About Page (`about.html`)

**Files:**
- Create: `about.html`

**Depends on:** Task 1 (CSS)

- [ ] **Step 1: Create about.html**

Same head, navbar (active on "Rreth Nesh"), `page-nav` class. Page hero:

```html
  <section class="page-hero">
    <div class="hero-bg" style="background-image: url('https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1920&q=80');"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <p class="label" data-al="Kush jemi ne" data-en="Who We Are">Kush jemi ne</p>
      <h1 data-al="Rreth Nesh" data-en="About Us">Rreth Nesh</h1>
    </div>
  </section>
```

Our Story:

```html
  <section class="section">
    <div class="container">
      <div class="split-section fade-in">
        <img src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80" alt="Miss Olympia Fragrance">
        <div class="content">
          <p class="label" data-al="Historia jonë" data-en="Our Story">Historia jonë</p>
          <h2 data-al="Një Pasion që Filloi në Tiranë" data-en="A Passion Born in Tirana">Një Pasion që Filloi në Tiranë</h2>
          <div class="section-divider" style="margin: 1rem 0;"></div>
          <p data-al="Miss Olympia lindi nga dashuria për parfumin — arti i zgjedhjes së aromës së përsosur që pasqyron personalitetin tuaj. Që nga fillimi, misioni ynë ka qenë i thjeshtë: të sjellim parfumet më të mira dhe më origjinale të botës direkt në Tiranë." data-en="Miss Olympia was born from a love for perfumery — the art of choosing the perfect scent that reflects your personality. From the beginning, our mission has been simple: to bring the world's finest and most authentic fragrances directly to Tirana.">Miss Olympia lindi nga dashuria për parfumin — arti i zgjedhjes së aromës së përsosur që pasqyron personalitetin tuaj. Që nga fillimi, misioni ynë ka qenë i thjeshtë: të sjellim parfumet më të mira dhe më origjinale të botës direkt në Tiranë.</p>
          <p data-al="Çdo shishe në koleksionin tonë zgjidhet personalisht, duke siguruar që çdo klient gjen aromën që i përshtatet stilit të tij." data-en="Every bottle in our collection is personally curated, ensuring each client finds the scent that matches their style.">Çdo shishe në koleksionin tonë zgjidhet personalisht, duke siguruar që çdo klient gjen aromën që i përshtatet stilit të tij.</p>
        </div>
      </div>
    </div>
  </section>
```

Values:

```html
  <section class="section section--alt">
    <div class="container text-center">
      <p class="label fade-in" data-al="Vlerat tona" data-en="Our Values">Vlerat tona</p>
      <h2 class="fade-in" data-al="Çfarë Na Dallon" data-en="What Sets Us Apart">Çfarë Na Dallon</h2>
      <div class="section-divider"></div>
    </div>
    <div class="container" style="margin-top: 3rem;">
      <div class="grid-3">
        <div class="value-card fade-in fade-in-delay-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
          <h3 data-al="Autenticitet" data-en="Authenticity">Autenticitet</h3>
          <p data-al="Çdo produkt në dyqanin tonë është 100% origjinal, i blerë direkt nga distributorët e autorizuar." data-en="Every product in our store is 100% authentic, purchased directly from authorized distributors.">Çdo produkt në dyqanin tonë është 100% origjinal, i blerë direkt nga distributorët e autorizuar.</p>
        </div>
        <div class="value-card fade-in fade-in-delay-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          <h3 data-al="Kuratësim" data-en="Curation">Kuratësim</h3>
          <p data-al="Nuk mbajmë gjithçka — zgjedhim me kujdes vetëm parfumet që meritojnë vëmendjen tuaj." data-en="We don't carry everything — we carefully select only the fragrances that deserve your attention.">Nuk mbajmë gjithçka — zgjedhim me kujdes vetëm parfumet që meritojnë vëmendjen tuaj.</p>
        </div>
        <div class="value-card fade-in fade-in-delay-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <h3 data-al="Ekspertizë" data-en="Expertise">Ekspertizë</h3>
          <p data-al="Ekipi ynë njeh çdo aromë dhe do t'ju ndihmojë të gjeni parfumin tuaj të përsosur." data-en="Our team knows every scent and will help you find your perfect fragrance.">Ekipi ynë njeh çdo aromë dhe do t'ju ndihmojë të gjeni parfumin tuaj të përsosur.</p>
        </div>
      </div>
    </div>
  </section>
```

Visit Us:

```html
  <section class="section">
    <div class="container">
      <div class="split-section fade-in">
        <div style="background: var(--bg-secondary); height: 400px; display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-size: 0.9rem;">
          <div style="text-align:center;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="stroke: var(--accent-gold); margin-bottom: 1rem;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <p data-al="Harta — Google Maps do të shtohet" data-en="Map — Google Maps will be added">Harta — Google Maps do të shtohet</p>
          </div>
        </div>
        <div class="content">
          <p class="label" data-al="Na vizitoni" data-en="Visit Us">Na vizitoni</p>
          <h2 data-al="Dyqani Ynë" data-en="Our Store">Dyqani Ynë</h2>
          <div class="section-divider" style="margin: 1rem 0;"></div>
          <p><span data-al="Rruga e Durrësit, Nr. 45" data-en="Rruga e Durrësit, Nr. 45">Rruga e Durrësit, Nr. 45</span><br><span data-al="Tiranë, Shqipëri" data-en="Tirana, Albania">Tiranë, Shqipëri</span></p>
          <p style="margin-top: 1rem;">
            <strong data-al="Orari:" data-en="Hours:">Orari:</strong><br>
            <span data-al="E Hënë – E Shtunë: 09:00 – 20:00" data-en="Monday – Saturday: 09:00 – 20:00">E Hënë – E Shtunë: 09:00 – 20:00</span><br>
            <span data-al="E Diel: 10:00 – 18:00" data-en="Sunday: 10:00 – 18:00">E Diel: 10:00 – 18:00</span>
          </p>
          <p style="margin-top: 1rem;">
            <strong>Tel:</strong> <a href="tel:+355691234567" style="color: var(--accent-gold);">+355 69 123 4567</a>
          </p>
        </div>
      </div>
    </div>
  </section>
```

Same footer as index.html.

- [ ] **Step 2: Verify in browser**

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "feat: add about page with story, values, and location"
```

---

### Task 5: Contact Page (`contact.html`)

**Files:**
- Create: `contact.html`

**Depends on:** Task 1 (CSS)

- [ ] **Step 1: Create contact.html**

Same head, navbar (active on "Kontakt"), `page-nav` class. Page hero:

```html
  <section class="page-hero">
    <div class="hero-bg" style="background-image: url('https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1920&q=80');"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <p class="label" data-al="Jemi këtu për ju" data-en="We're Here For You">Jemi këtu për ju</p>
      <h1 data-al="Na Kontaktoni" data-en="Contact Us">Na Kontaktoni</h1>
    </div>
  </section>
```

Contact methods:

```html
  <section class="section">
    <div class="container">
      <div class="grid-3">
        <div class="contact-method fade-in fade-in-delay-1">
          <svg viewBox="0 0 24 24" style="fill: var(--accent-gold); stroke: none;"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          <h3>Instagram</h3>
          <p data-al="Na shkruani në DM" data-en="Send us a DM">Na shkruani në DM</p>
          <a href="https://www.instagram.com/miss_olympia_tirane1/" target="_blank">@miss_olympia_tirane1</a>
        </div>
        <div class="contact-method fade-in fade-in-delay-2">
          <svg viewBox="0 0 24 24" style="fill: var(--accent-gold); stroke: none;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          <h3>WhatsApp</h3>
          <p data-al="Na shkruani direkt" data-en="Message us directly">Na shkruani direkt</p>
          <a href="https://wa.me/355691234567" target="_blank">+355 69 123 4567</a>
        </div>
        <div class="contact-method fade-in fade-in-delay-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
          <h3 data-al="Telefon" data-en="Phone">Telefon</h3>
          <p data-al="Na telefononi" data-en="Give us a call">Na telefononi</p>
          <a href="tel:+355691234567">+355 69 123 4567</a>
        </div>
      </div>
    </div>
  </section>
```

Contact form:

```html
  <section class="section section--alt">
    <div class="container text-center">
      <p class="label fade-in" data-al="Dërgoni mesazh" data-en="Send a Message">Dërgoni mesazh</p>
      <h2 class="fade-in" data-al="Na Shkruani" data-en="Write to Us">Na Shkruani</h2>
      <div class="section-divider"></div>
    </div>
    <div class="container" style="margin-top: 2rem;">
      <form class="contact-form fade-in" onsubmit="event.preventDefault();">
        <div class="form-group">
          <label data-al="Emri Juaj" data-en="Your Name">Emri Juaj</label>
          <input type="text" placeholder="...">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" placeholder="...">
        </div>
        <div class="form-group">
          <label data-al="Mesazhi" data-en="Message">Mesazhi</label>
          <textarea placeholder="..."></textarea>
        </div>
        <button type="submit" class="btn btn--filled" data-al="Dërgo Mesazhin" data-en="Send Message">Dërgo Mesazhin</button>
      </form>
    </div>
  </section>
```

Location section (same as about page visit-us), then same footer.

- [ ] **Step 2: Verify in browser**

- [ ] **Step 3: Commit**

```bash
git add contact.html
git commit -m "feat: add contact page with methods, form, and location"
```

---

### Task 6: JavaScript (`js/main.js`)

**Files:**
- Create: `js/main.js`

**Depends on:** Tasks 1-5 (all HTML pages)

- [ ] **Step 1: Create main.js**

```javascript
document.addEventListener('DOMContentLoaded', () => {

  // --- Language Toggle ---
  const langButtons = document.querySelectorAll('.lang-toggle button');
  const bilingualElements = document.querySelectorAll('[data-al]');

  function setLanguage(lang) {
    localStorage.setItem('missOlympia-lang', lang);
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    bilingualElements.forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          // Using textContent where possible; innerHTML needed for <br> in address content
          el.textContent = text;
        }
      }
    });
  }

  const savedLang = localStorage.getItem('missOlympia-lang') || 'al';
  setLanguage(savedLang);

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  // --- Mobile Menu ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Navbar Scroll Effect (homepage only) ---
  const navbar = document.getElementById('navbar');

  if (navbar && !navbar.classList.contains('page-nav')) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // --- Scroll Animations ---
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => observer.observe(el));
  }

  // --- Shop Filters ---
  const filterBar = document.getElementById('filterBar');
  const productGrid = document.getElementById('productGrid');

  if (filterBar && productGrid) {
    const pills = filterBar.querySelectorAll('.filter-pill');
    const cards = productGrid.querySelectorAll('.product-card');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.dataset.filter;

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.gender === filter) {
            card.style.display = '';
            requestAnimationFrame(() => {
              card.classList.remove('visible');
              requestAnimationFrame(() => card.classList.add('visible'));
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

});
```

- [ ] **Step 2: Verify all interactivity**

Test on each page:
- **index.html:** Language toggle switches text. Navbar transitions on scroll. Mobile menu works. Scroll animations fire.
- **shop.html:** Filter pills show/hide by gender. Language toggle persists across pages.
- **about.html + contact.html:** Scroll animations and language toggle work.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add JavaScript for language toggle, animations, menu, and shop filters"
```

---

### Task 7: Visual Polish + Gitignore

**Files:**
- Modify: `css/style.css` (if needed)
- Create: `.gitignore`

**Depends on:** Tasks 1-6

- [ ] **Step 1: Check responsive breakpoints**

Open each page at 375px, 768px, 1024px, 1440px. Fix any overflow, overlapping text, or broken grids by adding targeted media queries to bottom of `style.css`.

- [ ] **Step 2: Check hover states and transitions**

Verify on desktop: navbar links, product cards, gender cards, instagram items, buttons, brand marquee all have proper hover effects.

- [ ] **Step 3: Check language toggle persistence**

Switch to EN on homepage, navigate to shop — should stay EN. Switch back to AL — should persist.

- [ ] **Step 4: Create .gitignore**

```
.superpowers/
.DS_Store
```

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: visual polish, responsive fixes, and gitignore"
```

---

## Execution Summary

| Task | Description | Files | Dependencies |
|------|-------------|-------|--------------|
| 1 | CSS foundation + logo SVG | `css/style.css`, `images/logo.svg` | None |
| 2 | Homepage | `index.html` | Task 1 |
| 3 | Shop page | `shop.html` | Task 1 |
| 4 | About page | `about.html` | Task 1 |
| 5 | Contact page | `contact.html` | Task 1 |
| 6 | JavaScript | `js/main.js` | Tasks 1-5 |
| 7 | Visual polish | Various fixes | Tasks 1-6 |

Tasks 2-5 can run in parallel after Task 1. Task 6 depends on all HTML. Task 7 is the final pass.
