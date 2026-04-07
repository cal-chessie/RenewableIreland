# County site production spec — 2026

This is the build standard for every county site. If it's not in here, it's not done. No exceptions.

---

## What a county site is

A county site is a local lead generation page for one Irish/NI county. It captures bill uploads, phone calls, and email enquiries from homeowners, businesses, and farmers considering solar. Every county site uses the same template with county-specific content swapped in. There are 32 of these to build.

A county site is NOT a brochure. It's a conversion machine. Every section exists to move someone closer to uploading their bill or picking up the phone. If a section doesn't serve that purpose, cut it.

---

## 1. HTML document structure

Every page must have this document skeleton. No exceptions, no shortcuts.

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <!-- 1. Character encoding — always first -->
  <meta charset="UTF-8">

  <!-- 2. Viewport — required for mobile -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- 3. Title — county name + primary keyword + brand -->
  <title>Solar [County] | Solar Panel Installers in [County], [Region]</title>

  <!-- 4. Meta description — 150-160 chars, include MCS, county, CTA -->
  <meta name="description" content="Solar [County] — MCS accredited solar panel installers in [County]. Residential, commercial and agricultural solar systems. Get your free quote today.">

  <!-- 5. Canonical URL — prevents duplicate content -->
  <link rel="canonical" href="https://solar[county].ie/">

  <!-- 6. Open Graph — for social sharing -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Solar [County] | Solar Panel Installers in [County]">
  <meta property="og:description" content="MCS accredited solar panel installers serving homes, businesses and farms across [County]. Free quote available.">
  <meta property="og:image" content="https://solar[county].ie/images/og-image.jpg">
  <meta property="og:url" content="https://solar[county].ie/">
  <meta property="og:locale" content="en_GB">
  <meta property="og:site_name" content="Solar [County]">

  <!-- 7. Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Solar [County] | Solar Panel Installers">
  <meta name="twitter:description" content="MCS accredited solar panel installers in [County]. Free quote.">
  <meta name="twitter:image" content="https://solar[county].ie/images/og-image.jpg">

  <!-- 8. Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

  <!-- 9. Preconnect to font origin BEFORE loading fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- 10. Fonts — display=swap prevents render blocking -->
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- 11. CSS — external stylesheet, cached across county sites -->
  <link rel="stylesheet" href="/css/county-site.css">

  <!-- 12. Structured data — see section 3 below -->
  <script type="application/ld+json">
    // LocalBusiness schema goes here
  </script>
  <script type="application/ld+json">
    // FAQ schema goes here
  </script>
</head>
<body>
  <!-- Skip navigation — accessibility requirement -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- Top bar -->
  <!-- Nav — only ONE role="banner" on the page, goes on nav or header, not both -->
  <!-- Hero — use <header> with id="main-content" -->
  <!-- Sections -->
  <!-- Footer -->

  <!-- JS — loaded at end of body, not in head -->
  <script src="/js/county-site.js" defer></script>
</body>
</html>
```

### Rules for the document head

- `lang="en-GB"` not `lang="en"` — we're targeting Northern Ireland and Ireland
- Title format is always: `Solar [County] | Solar Panel Installers in [County], [Region]`
- Meta description must be 150-160 characters, must include county name, must include a call to action
- Canonical URL is mandatory — even on a single-page site
- Open Graph image must be a real photograph, minimum 1200x630px, showing solar panels on a local property
- Every page gets its own canonical, its own OG tags — no sharing between counties

### Rules for the document body

- ONE `role="banner"` per page — goes on the `<header>` element only
- ONE `role="navigation"` with `aria-label="Main navigation"` on the `<nav>`
- ONE `role="main"` or use `<main>` element for the primary content area
- ONE `role="contentinfo"` on `<footer>`
- Every section gets `aria-labelledby` pointing to its heading ID
- The skip link targets `#main-content` which goes on the hero `<header>`

---

## 2. SEO requirements

### On-page SEO checklist

Every county page must have:

- [ ] Unique `<title>` with county name (under 60 characters)
- [ ] Unique `<meta name="description">` (150-160 characters)
- [ ] `<link rel="canonical">` pointing to the page's own URL
- [ ] One `<h1>` per page — must include county name and "solar"
- [ ] Heading hierarchy: h1 → h2 → h3 — no skipping levels
- [ ] All images have descriptive `alt` attributes (not "image" or empty)
- [ ] Internal links to service sub-pages use descriptive anchor text
- [ ] External links (if any) use `rel="noopener noreferrer"` and open in new tab
- [ ] Page loads in under 3 seconds on 3G
- [ ] No broken internal links — every href must resolve to a real page or anchor

### URL structure

```
solar[county].ie/                              → Homepage (this template)
solar[county].ie/home-solar-panels-[county]    → Residential service page
solar[county].ie/commercial-solar-[county]     → Commercial service page
solar[county].ie/agricultural-solar-[county]   → Farm service page
solar[county].ie/solar-battery-storage-[county] → Battery page
solar[county].ie/ev-charger-solar-[county]     → EV charger page
solar[county].ie/solar-maintenance-[county]    → Maintenance page
solar[county].ie/privacy-policy                → Privacy policy (required by law)
solar[county].ie/sitemap.xml                   → XML sitemap
solar[county].ie/robots.txt                    → Robots file
```

**Important:** Do NOT link to service pages that don't exist yet. If the page isn't built, don't link to it. A 404 is worse than no link. Use `#services` as the href until the page is live.

### Keyword targets per county page

Primary: `solar panels [county]`, `solar installers [county]`
Secondary: `home solar [county]`, `commercial solar [county]`, `farm solar [county]`
Long tail: `solar panel cost [county]`, `solar grants [county]`, `MCS solar installer [county]`

The county name should appear naturally in:
- H1 (once)
- First paragraph of hero text
- At least 3 section headings
- Alt text of at least 2 images
- Meta title and description
- Footer address/location

Don't stuff it. If reading the page aloud sounds like someone saying "[County]" every other sentence, you've overdone it.

---

## 3. Structured data (schema markup)

Every county page needs THREE schema blocks minimum. These go in `<script type="application/ld+json">` tags in the `<head>`.

### LocalBusiness schema

```json
{
  "@context": "https://schema.org",
  "@type": "ElectricalContractor",
  "name": "Solar [County]",
  "description": "MCS accredited solar panel installers serving [County]",
  "url": "https://solar[county].ie",
  "telephone": "+44-28-XXXX-XXXX",
  "email": "info@solar[county].ie",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[Main Town]",
    "addressRegion": "[County]",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "XX.XXXX",
    "longitude": "-X.XXXX"
  },
  "areaServed": [
    {
      "@type": "AdministrativeArea",
      "name": "[County]"
    }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "08:00",
    "closes": "18:00"
  },
  "priceRange": "££",
  "image": "https://solar[county].ie/images/og-image.jpg",
  "sameAs": []
}
```

### FAQ schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does solar actually work in Northern Ireland's weather?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Solar panels run on daylight, not direct sun — they generate even on overcast days. Output is strongest spring through autumn, but you'll see generation year-round."
      }
    },
    {
      "@type": "Question",
      "name": "What does a solar system cost in [County]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 4kWp system for a typical home generally sits between £6,000 and £9,000. We provide a full written quote at no charge."
      }
    }
  ]
}
```

**Every FAQ item on the page must be in the FAQ schema.** If you add a question to the HTML, add it to the schema. If you remove one, remove it from both.

### Review schema (when real reviews exist)

```json
{
  "@context": "https://schema.org",
  "@type": "ElectricalContractor",
  "name": "Solar [County]",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "6"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Ciarán M." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "Solar Tyrone were different from the first phone call..."
    }
  ]
}
```

**Do NOT use fake review counts or fabricated aggregate ratings.** Only add review schema when you have real, verifiable reviews. Google penalises fake structured data.

---

## 4. Design system

### Typography

- Headings: DM Serif Display (serif)
- Body: DM Sans (sans-serif)
- Base font size: 17px on desktop, scales down to 15px on mobile
- Line height: 1.7 for body text, 1.25 for headings
- Use `clamp()` for responsive font sizing on headings

### Colour palette

```css
:root {
  --primary-bg: #D9D9D9;
  --secondary-dark: #1A1A1A;
  --support-white: #FFFFFF;
  --accent-red: #E10600;
  --accent-red-hover: #B00500;
  --text-dark: #1A1A1A;
  --text-mid: #555555;
  --text-light: #888888;
  --border-color: #BFBFBF;
}
```

### Contrast requirements

Every text/background combination must pass WCAG AA (4.5:1 minimum for body text, 3:1 for large text).

Known failures to fix:
- `rgba(255,255,255,0.65)` on `#1A1A1A` — fails AA. Use `rgba(255,255,255,0.85)` minimum
- `rgba(255,255,255,0.7)` on dark backgrounds — borderline. Use `rgba(255,255,255,0.8)` minimum
- `#888888` on `#FFFFFF` — contrast ratio 3.5:1, fails AA. Use `#666666` (5.7:1) for body text on white

### Spacing system

Use a consistent scale. Don't invent values.

```
4px   — tight gaps (icon to text)
8px   — small gaps (between related items)
14px  — medium gaps (between form fields)
24px  — section internal padding
32px  — between section heading and content
52px  — section top/bottom padding
60px  — between two-column grid items
```

### Buttons

- Minimum touch target: 48px height (this is already implemented — keep it)
- All buttons need `:focus-visible` styles — a visible outline for keyboard users
- Button text never wraps — if it would wrap on mobile, shorten the text
- Primary CTA (red) should appear maximum 3 times on the page
- Every button must have either `type="button"` or `type="submit"` — never leave type undefined

### Images

**No page deploys with placeholder images.** Period.

Every image must be:
- A real photograph of solar panels, local properties, or the team
- Optimised: WebP format with JPEG fallback
- Responsive: `srcset` with at least 3 sizes (480w, 768w, 1200w)
- Lazy loaded: `loading="lazy"` on all images below the fold
- Hero image: `loading="eager"` and `fetchpriority="high"` (it's above the fold)
- Alt text: descriptive, includes county name where natural

```html
<!-- Correct image implementation -->
<img
  src="/images/solar-panels-omagh-768.webp"
  srcset="
    /images/solar-panels-omagh-480.webp 480w,
    /images/solar-panels-omagh-768.webp 768w,
    /images/solar-panels-omagh-1200.webp 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Solar panels installed on a family home in Omagh, County Tyrone"
  width="600"
  height="400"
  loading="lazy"
  decoding="async"
>
```

**The OG image** (for social sharing) must be exactly 1200x630px, must show solar panels on a real property, and must include the brand name as a text overlay.

---

## 5. Mobile optimisation

### Breakpoints

```css
/* Mobile first — base styles are mobile */

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }
```

**Important:** Write mobile-first CSS. Base styles = mobile. Media queries add desktop complexity. The Tyrone file had the breakpoints in wrong order (max-width before min-width) — that causes cascade conflicts.

### Mobile requirements

- [ ] Hero image can be hidden on mobile — text content matters more
- [ ] All grids collapse to single column at 768px or below
- [ ] Touch targets minimum 48x48px (buttons, links, interactive elements)
- [ ] No horizontal scroll at any breakpoint — test at 320px, 375px, 414px widths
- [ ] Form inputs are minimum 44px tall with 16px font (prevents iOS zoom on focus)
- [ ] Hamburger menu is fully functional — opens, closes, links work, scroll locks
- [ ] Phone number is a tappable `tel:` link
- [ ] Email is a tappable `mailto:` link
- [ ] Testimonials are truncated or use a carousel on mobile — no 100+ word cards stacking

### Mobile menu requirements

```javascript
// The mobile menu must:
// 1. Toggle open/close on hamburger click
// 2. Close when a menu link is clicked
// 3. Close when clicking outside the menu
// 4. Prevent body scroll when menu is open
// 5. Trap focus inside the menu for keyboard users
// 6. Close on Escape key press
// 7. Update aria-expanded on the hamburger button
```

This is not optional. A broken mobile menu means a broken site for 60%+ of visitors.

---

## 6. Accessibility

### Required elements

- [ ] Skip-to-content link as first focusable element
- [ ] All images have alt text (decorative images get `alt=""` and `aria-hidden="true"`)
- [ ] All form inputs have associated `<label>` elements (not just placeholder text)
- [ ] All emoji icons get `aria-hidden="true"` with separate visually-hidden text
- [ ] Keyboard navigation works for every interactive element
- [ ] Focus is visible on every interactive element (use `:focus-visible`)
- [ ] Colour is never the only way to convey information
- [ ] Page can be zoomed to 200% without breaking layout

### Emoji handling

The current site uses emoji for icons (🏠🔋📞). This is fine visually but screen readers will read them literally. Fix:

```html
<!-- Wrong -->
<div class="service-icon">🏠</div>

<!-- Right -->
<div class="service-icon" aria-hidden="true">🏠</div>
<span class="sr-only">Home solar</span>
```

Or better — replace emoji with proper SVG icons that can be given `role="img"` and `aria-label`.

### Bill upload area

The upload area needs real functionality:

```html
<div class="bill-upload-area" role="button" tabindex="0"
     aria-label="Upload electricity bill"
     onclick="document.getElementById('bill-file').click()"
     onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();document.getElementById('bill-file').click();}">
  <!-- Visual content -->
</div>
<input type="file" id="bill-file" accept=".pdf,.jpg,.jpeg,.png"
       style="display:none" aria-label="Select bill file">
```

### Form structure

All form inputs must be inside a `<form>` tag with:
- `action` pointing to a real endpoint
- `method="POST"`
- A hidden CSRF token field
- Client-side validation with `required`, `type`, and `pattern` attributes
- Server-side validation on the backend (never trust client-side alone)
- An accessible error message system

```html
<form action="/api/bill-upload" method="POST" enctype="multipart/form-data" novalidate>
  <input type="hidden" name="_csrf" value="[TOKEN]">

  <label for="customer-name" class="sr-only">Your name</label>
  <input type="text" id="customer-name" name="name"
         placeholder="Your name" required
         autocomplete="name"
         aria-describedby="name-error">
  <span id="name-error" class="form-error" role="alert"></span>

  <label for="customer-phone" class="sr-only">Your phone number</label>
  <input type="tel" id="customer-phone" name="phone"
         placeholder="Your phone number" required
         autocomplete="tel"
         pattern="[0-9+\s\-\(\)]+"
         aria-describedby="phone-error">
  <span id="phone-error" class="form-error" role="alert"></span>

  <button type="submit">Show Me My Savings →</button>
</form>
```

---

## 7. Security

### Form security

- [ ] Every form has CSRF token protection
- [ ] File uploads are validated server-side: type, size (max 10MB), and content
- [ ] Rate limiting on form submissions (max 5 per IP per hour)
- [ ] Honeypot field to catch bots (hidden input that humans don't fill)
- [ ] All user input is sanitised before storage
- [ ] No sensitive data in URL parameters

### HTTP headers

These should be set at the hosting/server level (Cloudflare, Vercel, etc.):

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### Privacy and GDPR

Every county site collects personal data (name, phone, electricity bills). This means:

- [ ] Privacy policy page exists and is linked from the footer
- [ ] Cookie consent banner if any analytics/tracking is used
- [ ] Data collection notice near every form ("We keep your details private. We never pass them on." is good — but link to the full privacy policy)
- [ ] Data retention policy documented
- [ ] Right to deletion process documented
- [ ] No third-party tracking scripts without consent

---

## 8. Performance

### Targets

- Largest Contentful Paint (LCP): under 2.5 seconds
- First Input Delay (FID): under 100ms
- Cumulative Layout Shift (CLS): under 0.1
- Total page weight: under 1MB (including images)
- Time to Interactive: under 3 seconds on 3G

### Implementation

- [ ] CSS in external stylesheet (not inline in HTML) — enables caching across pages
- [ ] JavaScript at end of body with `defer` attribute
- [ ] Images in WebP with JPEG fallback
- [ ] Hero image preloaded: `<link rel="preload" as="image" href="/images/hero.webp">`
- [ ] Fonts use `display=swap` (already correct)
- [ ] No unused CSS — strip any styles that aren't used on the page
- [ ] Logo as optimised SVG (not base64 JPEG blob)
- [ ] `width` and `height` attributes on all images (prevents CLS)

### Across 32 county sites

When all 32 sites share the same template:

- One external CSS file, cached, served from CDN
- One external JS file, cached, served from CDN
- Shared image assets (logo, icons) served from CDN
- County-specific images stored per-domain
- Template system that swaps: county name, town names, testimonials, phone, email, coordinates

---

## 9. Content requirements per county

Every county page needs these filled in before it can deploy:

### Required content (no deploy without these)

- [ ] Real phone number (not placeholder)
- [ ] Real email address (not placeholder)
- [ ] Real physical location/address for schema
- [ ] GPS coordinates for schema
- [ ] 4-6 area/town names specific to the county
- [ ] Real hero photograph (solar panels on a local property)
- [ ] Real "why us" photograph
- [ ] At least 3 real testimonials from local customers
- [ ] County-specific FAQ answers (costs, grants, planning rules may vary)
- [ ] Copyright year: current year
- [ ] OG image: 1200x630px with real photo + brand overlay

### Content that can be templated across counties

- Service descriptions (home, commercial, farm, battery, maintenance, EV)
- Process steps
- Trust signals and certifications
- Investment/value section (with county name swapped in)
- Footer structure

### Content that MUST be unique per county

- Testimonials (real customers from that county)
- Area names and descriptions
- Hero text (mention specific towns)
- FAQ answers (where costs or regulations differ)
- Schema data (address, coordinates)

---

## 10. Pre-deploy checklist

Run through every item before any county site goes live.

### Critical (blocks launch)

- [ ] Real phone number in all locations
- [ ] Real email address in all locations
- [ ] All images are real photographs (no placeholders)
- [ ] Bill upload form submits to a real endpoint
- [ ] Bill upload file validation works (type and size)
- [ ] Form CSRF protection active
- [ ] Mobile menu opens, closes, and links all work
- [ ] Privacy policy page exists and is linked
- [ ] Structured data validates (test at search.google.com/test/rich-results)
- [ ] Page loads under 3 seconds on mobile
- [ ] No console errors in browser dev tools
- [ ] HTTPS enforced — all HTTP redirects to HTTPS
- [ ] No broken links (internal or external)

### Important (fix within first week)

- [ ] OG image displays correctly when shared on Facebook/Twitter/LinkedIn
- [ ] Google Search Console verified for the domain
- [ ] XML sitemap submitted to Google Search Console
- [ ] robots.txt allows crawling of all public pages
- [ ] Analytics installed (with cookie consent)
- [ ] 404 page exists and is branded
- [ ] Contact form sends confirmation email to the customer
- [ ] All email notifications reach the team reliably

### Polish (fix within first month)

- [ ] Page speed score 90+ on Google PageSpeed Insights
- [ ] All images converted to WebP with JPEG fallback
- [ ] Service sub-pages built and linked
- [ ] Google Business Profile created and linked
- [ ] Review collection process in place

---

## 11. File structure

```
solar[county].ie/
├── index.html
├── privacy-policy.html
├── sitemap.xml
├── robots.txt
├── favicon.svg
├── favicon-32x32.png
├── apple-touch-icon.png
├── css/
│   └── county-site.css
├── js/
│   └── county-site.js
├── images/
│   ├── og-image.jpg          (1200x630, social sharing)
│   ├── hero-480.webp          (mobile hero)
│   ├── hero-768.webp          (tablet hero)
│   ├── hero-1200.webp         (desktop hero)
│   ├── hero-480.jpg           (mobile fallback)
│   ├── hero-768.jpg           (tablet fallback)
│   ├── hero-1200.jpg          (desktop fallback)
│   ├── why-us-480.webp
│   ├── why-us-768.webp
│   ├── why-us-1200.webp
│   └── logo.svg               (vector logo, not base64)
└── pages/
    ├── home-solar-panels-[county].html
    ├── commercial-solar-[county].html
    ├── agricultural-solar-[county].html
    ├── solar-battery-storage-[county].html
    ├── ev-charger-solar-[county].html
    └── solar-maintenance-[county].html
```

---

## 12. What was done well on Solar Tyrone (keep these)

So the developer knows what he got right:

- Section flow is correct: hero → bill capture → services → trust → testimonials → FAQ → final CTA
- Copy tone is natural and locally rooted — doesn't read like template text
- FAQ uses native `<details>` elements — good for accessibility and SEO
- Button minimum height of 48px — correct touch target
- clamp() on heading sizes — proper responsive typography
- CSS custom properties for colours — consistent and maintainable
- Service cards with hover animations — polished interaction
- Sticky navigation — good UX pattern
- aria-labelledby on sections — proper landmark structure
- Mobile menu uses fixed overlay pattern — correct approach

These are foundations to build on, not tear down.

---

## 13. What was missed on Solar Tyrone (fix these)

So the developer knows what needs to change:

- No structured data (LocalBusiness, FAQ, Review schemas)
- No Open Graph or Twitter Card meta tags
- No canonical URL
- No privacy policy page
- No skip-to-content link
- Phone and email are placeholders
- All images are placeholders
- Bill upload form has no file input, no form tag, no backend
- Mobile menu JavaScript appears incomplete/truncated
- Emoji icons not hidden from screen readers
- Duplicate role="banner" (top bar and header)
- Upload area not keyboard accessible (no Enter/Space handler)
- Several contrast failures on dark sections
- CSS breakpoints in wrong order (not mobile-first)
- Base64 JPEG logo in footer adds unnecessary weight
- No sitemap.xml or robots.txt
- Copyright year needs updating
- Inline styles on form elements instead of classes
- Service page links point to pages that don't exist
- No form validation (client or server side)
- No CSRF protection
- No rate limiting
- "80% bill reduction" claim has no qualifying footnote

---

This document is the standard. Build to it every time.
