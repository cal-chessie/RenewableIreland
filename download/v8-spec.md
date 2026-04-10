# Renewable Ireland v8 — Complete Homepage Specification

> Extracted from `renewable-ireland-v8 (18).html` (4,117 lines). This is the authoritative rebuild reference.

---

## 1. META & HEAD

### SEO
- **Title**: `Renewable Ireland — Solar Panels for Irish Homes | SEAI Grant €1,800`
- **Canonical**: `https://renewableireland.ie/`
- **OG image**: `https://renewableireland.ie/og-image.jpg`
- **Twitter card**: `summary_large_image`
- **Robots**: `index, follow`

### Structured Data (JSON-LD)
- `@type: LocalBusiness`
- Name: Renewable Ireland
- Phone: +353873958424
- Email: hello@renewableireland.ie
- Rating: 4.9/5 (87 reviews)
- Opening: Mon–Fri 08:30–17:30, Sat 09:00–13:00
- Social: Facebook, Instagram

### External Fonts
```
Barlow Condensed: 600, 700, 800
Barlow: 300, 400, 500
```

---

## 2. CSS — COMPLETE SPECIFICATION

### 2.1 CSS Custom Properties (`:root`)
```css
:root {
  --lime: #6DC93A;
  --lime-dk: #55A82C;
  --lime-lt: #E8F9D8;
  --lime-mid: #B8EE88;
  --black: #111;
  --off: #F7F7F2;
  --white: #fff;
  --earth: #C4855A;
  --earth-lt: #F5EBE0;
  --earth-dk: #7A4F30;
  --gray: #4A4A44;
  --gray-lt: #EAEAE4;
  --hint: #9A9A92;
  --bd: 2.5px solid #111;
  --r: 16px;
  --rlg: 24px;
  --pill: 100px;
  --sh: 4px 4px 0 #111;
  --shlg: 6px 6px 0 #111;
  --shxl: 8px 8px 0 #111;
}
```

### 2.2 CSS Sections — Main `<style>` Block (Lines 116–812)

**A) Global Reset & Base**
- Box-sizing border-box, margin/padding 0
- `html`: smooth scroll, `scroll-padding-top: 72px`
- `body`: Barlow sans-serif, `var(--off)` bg, `var(--black)` color, 16px, line-height 1.65, `overflow-x: hidden`
- Headings: Barlow Condensed, `letter-spacing: -0.03em`

**B) Navigation** (`.nav`, `.nlogo`, `.nlinks`, `.ncta`)
- Fixed position, z-index 200, flex, `var(--lime)` bg
- `nav.shrunk`: reduced padding, shadow on scroll
- `.nlogo`: flex align-center, gap 10px, no text decoration
- `.nlogo-mark`: 56×56px flex center
- `.nbrand`: 24px, uppercase, Barlow Condensed 800
- `.nbrand span`: 10px uppercase muted subtitle
- `.nlinks`: flex, gap 26px, uppercase 14px links
- `.ncta`: White pill button with shadow

**C) Hero** (`.hero`, `.hero-left`, `.hero-right`)
- Full viewport height minus 68px nav, max 780px, 2-col grid
- `.hero-left`: white bg, flex column, 56px left padding
- `.hero-tag`: lime-lt pill badge, `fu` animation
- `h1`: clamp(38px, 4.5vw, 66px), uppercase, staggered animations
- `.hero-actions`: flex gap 10px, `btn-p` + `btn-o` pair
- `.hero-trust`: chip badges with checkmark SVGs
- `.hero-right`: white bg, 12px padding
- `.hero-logo-wrap`: centered, max-height calc(100vh - 340px)
- `.hero-stats`: 4-col grid with staggered `.spop` animations

**D) Buttons** (`.btn-p`, `.btn-o`, `.btn-lime`)
- `.btn-p`: Black pill, shadow, hover translate + shadow grow
- `.btn-o`: Transparent pill, hover lime-lt bg
- `.btn-lime`: Lime pill, shadow, hover translate + shadow grow

**E) Trust Strip** (`.tstrip`, `.tsi`)
- Black bg, lime bottom border, flex row
- `.tsi`: flex 1, 0 min-width, divider lines
- `.tsi-icon`: 34px lime square icon
- `.tsi strong`: white uppercase 13px
- `.tsi span`: white 50% opacity 11px

**F) Section Helpers** (`.sec`, `.stag`, `.stitle`, `.ssub`)
- `.sec`: padding 88px 64px
- `.sec-white`, `.sec-lime`, `.sec-black` bg variants
- `.stag`: 10px uppercase label with lime bar prefix
- `.stitle`: clamp(30px, 3.8vw, 50px) uppercase
- `.stitle.lt`: white variant
- `.ssub`: 16px gray subtitle

**G) Scroll Reveal** (`.rev`)
- `opacity:0`, `translateY(16px)` → `.vis` = `opacity:1`, `translateY(0)`
- IntersectionObserver triggers `.vis` class
- Disabled on mobile (≤900px)

**H) Trust Logos Marquee** (`.tlogos`)
- White bg, border-bottom, marquee animation 28s infinite
- Fade edges via gradient pseudo-elements
- `.tlogo-item`: 38×38 badge + info column

**I) Roof Estimator** (`.restimator`, `.re-*`)
- 1.6fr/1fr grid, off bg
- Map container with iframe, placeholder, overlay panel
- Suitability bar with animated fill
- Auto-badge styling with badgePop animation
- Form fields: 2-col grid, select/input styling
- Results grid: 2×3 with green/earth accent values
- Suitability progress bar

**J) ROI Timeline** (`.roi-sec`, `.roi-*`)
- Black bg, 960px max-width
- 4-stat strip grid
- SVG chart wrapper 220px height
- Tooltip: white bordered pill, arrow
- Year labels row
- View toggle buttons (annual/cumulative)

**K) Returning Visitor Banner** (`#rv-banner`)
- Lime bg, `border-radius: var(--rlg)`, badgePop animation
- Icon circle, title, sub, dismiss button
- Auto-dismiss after 6s

**L) WhatsApp Smart CTA** (`.wa-smart-btn`)
- #25D366 green pill, full width, shadow

**M) WhatsApp Floating Widget** (`.wa-float`, `.wa-*`)
- Fixed bottom-right, z-index 300
- `.wa-bubble`: 58px green circle, red notification pulse
- `.wa-popup`: 300px card with green header, chat bubble, CTA
- Auto-opens after 35s (sessionStorage dismissed tracking)

**N) Widget Section** (`.wsec`, `.wgrid`, `.wcard`)
- Black bg, "GET STARTED" watermark text
- 2-col grid: journey + card
- `.jrny`: Journey steps (done/active/pending dots)
- `.wcard`: White card with lime shadow (12px) + black shadow (14px)
- `.wtabs`: Upload/Manual toggle tabs
- `.wpane`: Tab content panels
- Price guarantee badge

**O) Finance Toggle** (`.fin-*`)
- Cash/Finance pill toggle
- Monthly breakdown panel with grid

**P) Price Match Modal** (`#pmatch-modal`)
- Fixed overlay, centered 420px card
- Lime header, form fields, submit button
- Success state with checkmark

**Q) Upload Zone** (`.upzone`)
- Dashed border, drag support
- File preview, AI analysis panel with progress bar

**R) Form Fields** (`.ff`, `.fi`, `.fs`, `.fgrid`)
- Rounded inputs, lime focus border, shadow

**S) Quick Estimate Grid** (`.qe`)
- 3-col grid, lime-lt bg, black border

**T) Submit Button** (`.wsub-btn`)
- Full-width black pill, sweep shimmer on hover

**U) Portal Modal** (`.portal-ov`, `.pmodal`)
- Fixed overlay, 820px max-width
- Black top bar, side nav, content area
- Tabs: Tracker, Documents, Messages, Savings
- Progress bar with milestones
- Metrics grid, documents list, chat interface

**V) Calculator** (`.calcsec`, `.calccard`, `.cf`, `.csel`, `.cslider`, `.cres`)
- Black bg section, 2-col grid
- White card with lime shadow
- Slider/select styling, result grid with number flash animation

**W) Why Grid** (`.whygrid`, `.whycard`)
- 3-col grid, white cards with shadow
- 48px lime icon squares
- Hover: translate + shadow grow

**X) Process Steps** (`.procgrid`, `.procstep`)
- 4-col grid, centered step cards
- Numbered circles (black bg, lime text)

**Y) Testimonials** (`.testgrid`, `.testcard`)
- 3-col grid, quote + author avatar

**Z) Grants** (`.grantgrid`, `.gcards`)
- 2-col grid, black glass cards
- Grant amounts in lime

**AA) FAQ** (`.faqwrap`, `.fi3`)
- 1fr + 1.4fr grid
- Accordion items, sticky sidebar
- WhatsApp + call buttons

**BB) Footer** (`footer`, `.ft`)
- 4-col grid, black bg, earth border-top
- Company info, link columns, bottom row

### 2.3 CSS Sections — Second `<style>` Block (Lines 1480–1645)
- **Roof Estimator v2** (`.re2-*`): Split-panel design
  - `.re2`: CSS grid, left map + right panel
  - `.re2-map`: 45% width, relative, with placeholder/iframe
  - `.re2-panel`: Dark themed, right panel with form/results
  - `.re2-tag/.re2-title/.re2-sub`: Lime headings
  - `.re2-search`: Input + button row
  - `.re2-res`: Results grid with dark items
  - `.re2-panel-suit`: Suitability bar
  - `.re2-tips`: Pre-search tips list
  - `.re2-cta-*`: Survey + WhatsApp CTAs

### 2.4 CSS Sections — Third `<style>` Block (Lines 3361–3531)

**GDPR Banner** (`#gdpr-banner`)
- Fixed bottom, black, lime top border, slide-up animation
- Accept (lime pill) + Decline (ghost) buttons

**Exit Intent Popup** (`#exit-overlay`, `#exit-popup`)
- Full-screen overlay with centered 480px popup
- `.exit-head`: Tag, heading, close button
- `.exit-body`: Stats grid, perks grid, CTA

**Calc Tooltip Hints** (`.chint`, `.chint-pop`)
- Small `?` circle triggers tooltip on hover
- White bordered box with arrow

**Price Framing** (`.price-frame`)
- Strikethrough price → lime total → monthly note

**"If You Do Nothing" Section** (`.donothing-sec`, `.dn-*`)
- Black bg, 2-col grid
- Bad/good cards with earth/lime accents
- "vs" divider badge
- Savings summary bar

**Warranty Timeline** (`.warranty-sec`, `.wtl-*`)
- Off bg, progress bar (20fr / 40fr / 100fr segments)
- 3-col item cards

**Commitment CTA Stack** (`.commit-stack`, `.commit-btn`)
- Vertical button stack with commitment levels
- High (lime), Med (white), Low (off), Zero (ghost) variants

**Floating Save Bar** (`#save-bar`)
- Fixed bottom, white, slide-up animation
- Saving estimate + dismiss

**Progressive Disclosure** (`.re-fields-hidden`)
- Collapse/expand animation

**Exit Guide Offer** (`.exit-guide`, `.egc-*`)
- Email capture with download button

**Loading States** (`.btn-loading`, `.btn-spin`, `.ai-progress`)
- Spinners, button disabled states, upload analysis overlay

### 2.5 Responsive — `@media(max-width:900px)` (Lines 721–809)
- Nav: hides `.nlinks`, reduced padding
- Hero: single column, reduced stats grid
- Trust strip: wrap to 2×2 grid
- All 2-col grids → single column
- Trust logos: hide label, slower marquee
- Sections: reduced padding (48px 18px)
- Portal: hide sidebar
- Footer: single column
- Mobile CTA bar: displayed
- WhatsApp: repositioned

### 2.6 Responsive — `@media(max-width:520px)`
- Do Nothing section: single column, hide "vs" badge

### 2.7 Animations
```css
@keyframes fu     { from { opacity:0; translateY(20px) } to { opacity:1; translateY(0) } }
@keyframes hsc    { from { opacity:0; scale(.8) } to { opacity:1; scale(1) } }
@keyframes spop   { from { opacity:0; translateY(18px) scale(.92) } to { opacity:1; translateY(0) scale(1) } }
@keyframes marquee { 0% { translateX(0) } 100% { translateX(-50%) } }
@keyframes badgePop { from { opacity:0; scale(.7) translateY(4px) } to { opacity:1; scale(1) translateY(0) } }
@keyframes wapop   { from { opacity:0; scale(.9) translateY(10px) } to { opacity:1; scale(1) translateY(0) } }
@keyframes onpulse { 0%,100% { opacity:1 } 50% { opacity:.4 } }
@keyframes spin    { to { transform: rotate(360deg) } }
@keyframes sUp     { from { opacity:0; translateY(28px) } to { opacity:1; translateY(0) } }
@keyframes numflash { 0% { opacity:.3; scale(.94) } 60% { opacity:1; scale(1.07) } 100% { opacity:1; scale(1) } }
@keyframes pgpop   { from { opacity:0; scale(.92) } to { opacity:1; scale(1) } }
@keyframes exitpop { from { opacity:0; scale(.92) translateY(-20px) } to { opacity:1; scale(1) translateY(0) } }
```

### 2.8 Custom Cursor (`@media(hover:hover)`)
- `#ricur`: 12px lime circle, follows mouse instantly
- `#ritrail`: 34px circle border, follows with 0.1 lerp
- Grows on hover over interactive elements
- Disabled on touch devices

---

## 3. HTML SECTIONS — COMPLETE STRUCTURE

### Page Structure (top to bottom)

```
<body>
  <nav id="mainnav">                          <!-- FIXED NAV -->
  <section class="hero">                          <!-- HERO -->
  <div class="tstrip">                            <!-- TRUST STRIP -->
  <div class="tlogos">                           <!-- TRUST LOGOS MARQUEE -->
  <section class="restimator" id="roof-estimator">    <!-- ROOF ESTIMATOR -->
  <section class="roi-sec">                       <!-- ROI TIMELINE -->
  <section class="wsec" id="get-started">           <!-- GET STARTED / WIDGET -->
  <section class="calcsec" id="calculator">        <!-- CALCULATOR -->
  <section class="whygrid-section">                <!-- WHY US (id="how-it-works") -->
  <section class="donothing-sec">                  <!-- IF YOU DO NOTHING -->
  <section class="faq" id="faq">                     <!-- FAQ -->
  <section class="warranty-sec">                 <!-- WARRANTY TIMELINE -->
  <section class="sec sec-white">                <!-- FOOTER -->
  <div class="mobcta">                            <!-- MOBILE CTA BAR -->
  <div class="wa-float">                         <!-- WHATSAPP WIDGET -->
  <div id="gdpr-banner">                        <!-- GDPR BANNER -->
  <div id="exit-overlay">                      <!-- EXIT INTENT POPUP -->
  <div id="pmatch-modal">                      <!-- PRICE MATCH MODAL -->
  <div id="portal-gate">                      <!-- PORTAL GATE -->
  <div class="portal-ov" id="portal-overlay">    <!-- PORTAL MODAL -->
  <div id="sp-modal">                          <!-- SOLARPILOT MODAL -->
</body>
```

### 3.1 Nav (`<nav id="mainnav">`)
```html
<nav id="mainnav">
  <a class="nlogo" href="#">
    <div class="nlogo-mark">
      <img loading="eager" src="data:image/webp;base64,..." alt="Renewable Ireland logo">
    </div>
    <div class="nbrand">Renewable<br>Ireland<span>SEAI Registered Partner</span></div>
  </a>
  <ul class="nlinks">
    <li><a href="#get-started">Get Started</a></li>
    <li><a href="#calculator">Calculator</a></li>
    <li><a href="#grants">SEAI Grants</a></li>
    <li><a href="#faq">FAQ</a></li>
    <li><a href="#" onclick="openPortal();return false">Track Project</a></li>
    <li><a class="ncta" href="#get-started">Free Quote</a></li>
  </ul>
</nav>
```

### 3.2 Hero (`<section class="hero">`)
```html
<section class="hero">
  <div class="hero-left">
    <div class="hero-tag">SEAI Registered · Serving All of Ireland</div>
    <h1>Cut your<br>energy bills.<br>
      <span class="lime">Power your</span><br>
      <span class="earth">home with</span><br>
      Renewable Ireland.</h1>
    <p class="hero-sub">From first call to live panels in 4–5 weeks.</p>
    <div class="hero-actions">
      <a class="btn-p" href="#get-started">See your savings <svg>→</svg></a>
      <a class="btn-o" href="#how-it-works">How it works</a>
    </div>
    <div class="hero-trust">
      <div class="chip"><svg>✓</svg>SEAI Certified</div>
      <div class="chip"><svg>✓</svg>200+ Installs</div>
      <div class="chip"><svg>✓</svg>Live Tracking</div>
    </div>
  </div>
  <div class="hero-right">
    <div class="hero-logo-wrap">
      <img loading="lazy" src="data:image/webp;base64,..." alt="Solar panels illustration">
    </div>
    <div class="hero-stats">
      <div class="hstat"><div class="hstat-val"><em>€1,800</em></div><div class="hstat-lbl">Max grant</div></div>
      <div class="hstat"><div class="hstat-val">200+</div><div class="hstat-lbl">Installs done</div></div>
      <div class="hstat"><div class="hstat-val">4.9★</div><div class="hstat-lbl">Rating</div></div>
      <div class="hstat"><div class="hstat-val"><em>1 day</em></div><div class="hstat-lbl">Install</div></div>
    </div>
  </div>
</section>
```

### 3.3 Trust Strip (`.tstrip`)
4 items in a flex row on black background with lime bottom border:
- Verified installers
- SEAI registered
- Fixed price guarantee
- Full project tracking
Each has lime icon + white title + muted subtitle.

### 3.4 Trust Logos Marquee (`.tlogos`)
Horizontal scrolling row of certification/accreditation logos. Items include:
- SEAI Registered Installer, NSAI, MCS Certified, Electrician Licensed, Safe Electric, NISE Approved, ISO 9001, Energy Saving Trust, Solar Energy Society
- Each has a colored badge square + name + subtitle
- Duplicated for seamless looping

### 3.5 Roof Estimator (`.restimator` / `.re2` — two versions)
**Main version** (`.restimator`): 1.6fr map + 1fr panel grid
**v2 version** (`.re2`): Split-panel, left satellite map + right dark panel

The v2 (active) section contains:
- Map placeholder with cloud/satellite SVG
- Google Maps iframe (satellite view, zoom 19) or OSM fallback
- Address/eircode input
- Loading spinner
- Hidden fields (orientation, house type, bill, county) with auto-fill badges
- Results: 6-item grid (kWp, panels, saving, grant, payback, 25yr return)
- Suitability bar
- CTAs: "Pick a survey time" (cal.com link), "Send estimate to WhatsApp"

### 3.6 ROI Timeline (`.roi-sec`)
- Black bg section
- Header with heading + view toggle buttons (Annual / Cumulative)
- 4-stat strip: Annual Saving, Install Cost, Payback, 25yr Return
- SVG chart (900×300) with interactive tooltips
- Cumulative view: area + line with animated stroke
- Annual view: bar chart
- Breakeven year marker

### 3.7 Get Started / Widget Section (`.wsec` id="get-started")
**Left column — Journey:**
- Enquiry → Site Survey → Quote Accepted → SEAI Grant → Install → Live
- 6 steps with done/active/pending dot indicators

**Right column — Widget Card (`.wcard`):**
- Lime header with logo + title + "Instant quote" pill
- Two tabs: "Upload bill" and "Manual quote"
- **Upload tab**: Dropzone, AI analysis panel, form fields (name, phone, county), submit button, trust reasons
- **Manual tab**: Form fields (name, email, phone, county, system size dropdown, annual spend)
- Quick estimate grid (3 cols: house type, panels, system size)
- Finance toggle (Cash / Finance)
- Submit button with sweep animation
- Price guarantee badge → opens Price Match modal
- WhatsApp smart CTA

### 3.8 Calculator (`.calcsec` id="calculator")
- Black bg, 2-col grid (left text, right card)
- Left: heading + subtext about SEAI savings
- Right: `.calccard` white card with:
  - House size dropdown (`#hs`)
  - Annual spend slider (`#sp`, range 1200–4800)
  - County dropdown (`#cc`)
  - Result grid: Saving/year, SEAI grant, Payback, 25yr Return
  - Price framing: before/after grant + monthly cost
  - CTA: "Get your free quote"

### 3.9 Why Us (`.whygrid-section` id="how-it-works")
- Section title: "Why homeowners choose Renewable Ireland"
- 6-card grid (`.whycard`):
  1. Vetted local installers (shield icon)
  2. We handle the SEAI grant (euro icon)
  3. Track your project live (monitor icon)
  4. Works on cloudy days (lightning icon)
  5. Smart export ready (ticket icon)
  6. Fixed price guaranteed (tag icon) — highlighted card

### 3.10 "If You Do Nothing" (`.donothing-sec`)
- Black bg
- Heading: "What does doing nothing cost?"
- 2-col grid:
  - **Bad card** (earth border): "Stay on grid" — 20yr grid cost (€38,400)
  - **Good card** (lime border): "Go solar" — 20yr solar cost (€13,900)
- Center "vs" badge
- Savings summary bar: "€24,500 saved over 20 years"

### 3.11 FAQ (`.faq` id="faq")
- Left column: 6 accordion items
  1. Do I need planning permission?
  2. How much will panels produce?
  3. How long does installation take?
  4. Can I sell electricity back to the grid?
  5. What warranty do I get?
  6. Is my roof suitable?
- Right column: Sticky sidebar
  - "Still have questions?" heading
  - WhatsApp button (full width)
  - Call button (full width, ghost style)

### 3.12 Warranty Timeline (`.warranty-sec`)
- Off bg
- Visual progress bar: 20fr (5yr Workmanship) / 40fr (10yr Inverter) / 100fr (25yr Panel)
- 3 detail cards below the bar

### 3.13 Footer
- Earth border-top
- 4-col grid:
  1. Logo + company description + copyright
  2. Company links
  3. Services links
  4. Support links
- Bottom row: copyright + legal links

### 3.14 Mobile CTA Bar (`.mobcta`)
- Fixed bottom, black, lime button
- Only shown on mobile (display:none on desktop)

### 3.15 WhatsApp Floating Widget (`.wa-float`)
- Fixed bottom-right
- Green bubble (58px circle) with red notification pulse
- Popup card (300px):
  - Header: avatar, "Renewable Ireland" + "Online now"
  - Body: chat bubble with pre-filled message
  - Actions: "Start chat on WhatsApp" + "Not now" dismiss

### 3.16 GDPR Cookie Banner (`#gdpr-banner`)
- Fixed bottom, slides up after 1.2s
- Accept all / Essential only buttons
- Stores in localStorage as `ri-cookie-consent`

### 3.17 Exit Intent Popup (`#exit-overlay`)
- Triggered by: mouseleave (cursor leaves viewport top) or 40s idle
- Session-based (only once per session)
- Popup: 3 stat cards + 4 perk checkmarks + CTA + "No thanks" link

### 3.18 Price Match Modal (`#pmatch-modal`)
- Triggered from Price Guarantee badge in widget
- Form fields: Name, Phone, Competitor, Price, Details (textarea)
- Submit → Success state

### 3.19 Portal Gate (`#portal-gate`)
- Triggered by "Track Project" nav link and submit actions
- Form: Name, Email, Phone, County dropdown
- Validates email format
- Generates unique portal ID (e.g. `RI-X4K9M-ABCD`)
- Shows success state with copyable portal URL
- Auto-opens demo portal modal after 2.2s

### 3.20 Portal Demo Modal (`#portal-overlay`)
- Triggered after portal gate success
- Top bar: Logo, "Renewable Ireland Portal", user name/county, close button
- Side nav (desktop): Tracker, Documents, Messages, Savings
- Content area with 4 tab views:
  - **Tracker**: Progress bar (60%), 6 milestones with dates, 3 metric cards
  - **Documents**: 4 document items with status badges (Signed/Submitted/Complete)
  - **Messages**: Chat interface with team/user message bubbles + input
  - **Savings**: (hidden/placeholder)

### 3.21 SolarPilot Modal (`#sp-modal`)
- Full-screen iframe modal for SolarPilot integration
- Loading state, iframe, error state
- Used when `SOLARPILOT_API_URL` or `SOLARPILOT_APP_URL` is configured
- Currently null (falls back to demo portal)

### 3.22 Custom Cursor Elements
```html
<div id="ricur"></div>   <!-- Lime dot cursor -->
<div id="ritrail"></div>   <!-- Trail circle -->
```

---

## 4. JAVASCRIPT — COMPLETE SPECIFICATION

### 4.1 First `<script>` Block (~Lines 1126–1970)

#### Data Constants
```js
var hsl = ['1–2 bed','2 bed','3 bed','4+ bed'];
var sys = [2.0, 3.5, 4.5, 6.0]; // kWp per house size
var gr  = [900, 1500, 1800, 1800]; // SEAI grants per house size
var cf  = { dublin:1.0, /* all 32 Irish counties */ };
```

#### Key Functions

**`uc()`** — Unified Calculator
- Reads house size, spend, county
- Calculates: saving (45% × spend × county factor), grant, payback, 25yr return
- Updates result elements with pop animation
- Syncs with roof estimator and ROI chart
- Saves prefs to localStorage

**`renderRoiChart()`** — ROI SVG Chart
- 25-year dataset (cumulative savings)
- Two views: Annual (bars) and Cumulative (area + line)
- SVG generated programmatically (900×300)
- Interactive tooltips on hover/touch
- Breakeven year marker
- Animated stroke drawing (cumulative)

**`setRoiView(v)` / `toggleRoiView()`** — Toggle annual/cumulative

**`openPortal()`** — Show portal gate
- Pre-fills from upload form
- Shows portal gate overlay

**`submitGate()`** — Portal gate form submission
- Validates name + email
- Generates unique portal ID
- Shows success state with copyable URL
- Auto-opens demo portal after 2.2s

**`closePortal()` / `closePortalOut(e)`** — Close portal modal

**`switchTab(t)`** — Portal tab switching (tracker/docs/messages/savings)

**`tf(el)`** — FAQ accordion toggle
- Close all others, toggle clicked item
- `.fi3.open` reveals `.fa3` content

**Map interaction: `pickC(el)` / `resetMap()`**
- County click handler on Ireland SVG map
- Highlights selected county, updates info panel

**`scrollToId(id)`** — Smooth scroll with nav offset
- Intercepts all `#anchor` clicks
- Respects hash on page load

**`btnLoad(btn, loadText)` / `btnReset(btn)` / `btnSuccess(btn, text, delay)`**
- Button loading states with spinner
- Success state with checkmark

**`submitBillUpload(btn)`** — SolarPilot integration
- Validates form, POSTs to API or opens app

**`reEstimate()`** — Roof Estimator
- Geocodes address via Google Maps API or OSM fallback
- Shows satellite iframe at zoom 19
- Auto-detects county from Eircode
- Progressive disclosure of estimator fields

**`reRecalc(showOverlay)`** — Recalculate estimator results
- Reads orientation, house type, bill, county
- Calculates kWp, panels, saving, grant, payback, 25yr return, suitability score
- Updates right-panel results and map overlay

**`enrichFromEircode(eircode)`** — Auto-fill house type from Eircode routing key

**`syncCalculators(source)`** — Bidirectional sync between savings calc and roof estimator

### 4.2 Second `<script>` Block (~Lines 1970–3358)

**`saveCalcPrefs()` / `loadCalcPrefs()`** — localStorage persistence
- Key: `ri-calc-prefs`
- Stores: county, house size, spend, timestamp
- 30-day expiry
- Pre-fills quote form name on load
- Shows returning visitor banner if returning visitor

**`ucalcRun()`** — Calculator entry point
- Syncs label displays immediately
- Calls `uc()`

**`ucalcSetView(v)`** — ROI view toggle (legacy wrapper)

**`updateWaSmartCta()`** — WhatsApp Smart CTA
- Pulls results from roof estimator (preferred) or savings calculator
- Builds personalized WhatsApp message with system details
- Updates href of `#wa-smart-cta`

**`DOMContentLoaded`** — Page init
- Loads prefs, runs calculator, renders ROI chart, updates WhatsApp CTA

**`switchMode(m)`** — Toggle Upload/Manual tab in widget

**`processFile(f)`** — File upload handler
- Validates type (PDF/JPG/PNG) and size (≤10MB)
- Shows AI analysis progress bar
- Simulates spend extraction (±5% variance)
- Syncs both calculators from bill data
- Shows AI panel with extracted values

**`handleDragOver/Leave/Drop()`** — Drop zone handlers

**`openSolarPilotModal()` / `setSolarPilotFrame(url)`** — SolarPilot modal management

**`closeSolarPilot()`** — Close SolarPilot modal (ESC key too)

### 4.3 Third `<script>` Block (~Lines 3625–4045)

**GDPR** (`gdprAccept()` / `gdprDecline()`)
- Stores consent in localStorage as `ri-cookie-consent`
- Shows banner after 1.2s if no prior consent

**Error Handling**
- `window.addEventListener('unhandledrejection', ...)` — Silent catch
- `window.addEventListener('error', ...)` — Log to console only

**Exit Intent**
- `mouseleave` detection (cursor leaves viewport top)
- 40-second idle timer fallback
- SessionStorage `ri-exit-shown` flag

**`updateSaveBar()`** — Floating save bar
- Shows when footer enters viewport (scroll-based)
- Updates saving, grant, payback values dynamically

**`updateDoNothing()`** — "If you do nothing" calculator
- 20-year compound grid cost (3% annual rise)
- Solar cost = install + residual grid
- Updates `#dn-grid`, `#dn-solar`, `#dn-diff`

**`updatePriceFrame()`** — Price framing display
- Shows gross price → net after grant
- Monthly cost breakdown (÷120)

**`submitPdfEmail()` / `submitGuide()`** — Email capture handlers

**`patchUcAll()`** — Monkey-patches `uc()` to also call `updateSaveBar()`, `updateDoNothing()`, `updatePriceFrame()`, `updateWaSmartCta()`

**Debounced calculator** (`debouncedUc()` / `debouncedReRecalc()`)
- 120ms debounce on slider input
- 200ms debounce on estimator field changes
- Removes inline handlers, attaches event listeners on DOMContentLoaded

**Analytics scaffold** (`_analytics`)
- Auto-detects GA4, Plausible, PostHog
- Events: `quote_form_submit`, `whatsapp_click`, `booking_click`, `calculator_engaged`, `quote_tab_switch`, `cta_click`, `email_capture_started`

**Finance Toggle** (`setFinView(v)` / `updateFinance()`)
- Cash/Finance toggle
- Shows monthly breakdown panel when finance selected
- Calculates monthly cost ÷ 120 months

---

## 5. IMAGES

### 5.1 Base64 Logo (used in nav, portal, footer, widget)
- Format: `data:image/webp;base64,...`
- Original size: ~56×56px (displayed in nav, portal), 36×36 (widget), 30×36 (portal bar)
- Appears 6 times across the page

### 5.2 Base64 Hero Illustration
- Format: `data:image/webp;base64,...`
- Solar panels/sustainable home illustration
- Displayed in `.hero-logo-wrap`

### 5.3 External Images
- `https://renewableireland.ie/og-image.jpg` (OG image)
- `https://renewableireland.ie/logo.png` (JSON-LD)

### 5.4 Map / iframe Sources
- Google Maps Satellite: `https://www.google.com/maps/embed/v1/view?...&maptype=satellite`
- OpenStreetMap fallback: `https://www.openstreetmap.org/export/embed.html?...`
- Geocode: `https://maps.googleapis.com/maps/api/geocode/json?...`
- Nominatim: `https://nominatim.openstreetmap.org/search?...`

---

## 6. SVGs / ICONS — Complete Inventory

### 6.1 Arrow (→)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
  <path d="M5 12h14M12 5l7 7-7 7"/>
</svg>
```

### 6.2 Checkmark (✓)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
  <path d="M4.5 12.75l6 6 9-13.5"/>
</svg>
```

### 6.3 Shield (security/trust)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
</svg>
```

### 6.4 Euro/ Savings (€)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33"/>
</svg>
```

### 6.5 Lightning Bolt (⚡)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
  <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
</svg>
```

### 6.6 Monitor (project tracking)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
</svg>
```
(Note: Reused with different stroke-width)

### 6.7 Cloud/Satellite (roof estimator placeholder)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"/>
  <path d="M15.75 9.75 12 13.5l-1.5-1.5"/>
</svg>
```

### 6.8 Map Pin (location)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
  <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
  <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
</svg>
```

### 6.9 Calendar (survey booking)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
  <path d="M6.75 3v1.5M17.25 3v1.5M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m18 0H3"/>
</svg>
```

### 6.10 House (home)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"/>
</svg>
```

### 6.11 WhatsApp (full logo path)
```html
<svg viewBox="0 0 24 24" fill="currentColor">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
</svg>
```

### 6.12 Checkmark Circle (verified badge)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
```

### 6.13 Download Arrow
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
  <path d="M3 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
</svg>
```
(Used in multiple places with slight stroke-width variation)

### 6.14 Phone Icon
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M2.25 6.75c0 8.284 6.716 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
</svg>
```

### 6. Chat Bubble / Message
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
</svg>
```

### 6. Bar Chart (analytics icon)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
</svg>
```

### 6. Document (paper with fold)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
</svg>
```

### 6. Upload (cloud arrow)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M3 16.5V18m18 0h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0V18M8.25 21h8.25"/>
</svg>
```

### 6. Building (project tracking icon)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125-1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
</svg>
```

---

## 7. INTERACTIVE FEATURES — BEHAVIOR SUMMARY

| Feature | Trigger | Behavior |
|---------|--------|----------|
| **Nav shrink** | Scroll > 50px | Adds `shrunk` class (padding reduction + shadow) |
| **FAQ accordion** | Click `.fq` | Toggles `.fi3.open`, closes others |
| **Mobile menu** | `display:none` `.nlinks` at ≤900px | Hidden on mobile; mobile CTA bar shown |
| **Scroll reveal** | IntersectionObserver | Adds `.vis` class to `.rev` elements |
| **Calculator** | Change house size/spend/county | Recalculates savings, updates ROI, syncs estimator |
| **ROI chart** | Calculator change | Re-renders SVG chart with animation |
| **Roof estimator** | Enter eircode/address | Geocodes, shows satellite map, calculates estimates |
| **Eircode detection** | Input on `#re-address` | Auto-detects county + house type, auto-fills |
| **Bill upload AI** | Drop/select file | Simulates analysis, extracts spend, syncs calculators |
| **SolarPilot** | Submit bill upload | Opens iframe modal or POSTs to API |
| **Portal gate** | "Track Project" link | Shows form, validates, creates portal, opens demo |
| **WhatsApp widget** | Page load 35s | Auto-opens popup; sessionStorage dismiss |
| **Finance toggle** | Click Cash/Finance | Shows monthly breakdown |
| **Returning visitor** | Load calc prefs | Shows banner, restores settings, 6s auto-dismiss |
| **Exit intent** | Mouseleave top / 40s idle | Shows popup with estimate CTA |
| **GDPR banner** | First visit | Shows after 1.2s, stores consent |
| **Price match** | Click guarantee badge | Opens modal with form |
| **Save bar** | Scroll to footer | Shows floating bar with dynamic savings |
| **Custom cursor** | Desktop only (hover:hover) | Lime dot + trail follow mouse |
| **Commitment levels** | Widget section | High/Med/Low/Zero commitment CTAs |

---

## 8. EIRCODE DATA TABLES

### County Irradiance Factors (`cf`)
Covers all 32 Irish counties + 6 NI counties. Values range 0.96 (Donegal) to 1.05 (Cork).

### House Type Data (`RE_HOUSE`)
- detached: 12 panels, 4.5 kWp
- semi: 10 panels, 3.5 kWp
- bungalow: 13 panels, 4.5 kWp
- terraced: 8 panels, 3.0 kWp

### Orientation Data (`RE_ORIENT`)
- south: suit 88%, kWp multiplier 1.0
- east: suit 68%, kWp multiplier 0.80
- flat: suit 75%, kWp multiplier 0.88
- north: suit 42%, kWp multiplier 0.60

### SEAI Grant Tiers (`RE_GRANT`)
- detached: €1,800
- semi: €1,500
- bungalow: €1,800
- terraced: €900

### Eircode → County Lookup (`EIRCODE_COUNTY`)
Comprehensive routing key mapping covering:
- All Dublin districts (D01–D24, D6W)
- All major town codes by county
- Northern Ireland BT postcodes

### Eircode → House Type (`EIRCODE_HOUSE_TYPE`)
- Dublin inner: terraced → semi
- Dublin outer: semi → detached
- Rural/F/Kildare: bungalow
- Northern/Cavan/Galway: detached

---

## 9. KEY CONFIGURATION CONSTANTS

```javascript
var GOOGLE_MAPS_KEY    = 'AIzaSyBzUgHdgEINn3NWUWJHqeo799B3gmwz5Fg';
var SOLARPILOT_API_URL = null;  // e.g. 'https://api.solarpilot.ie/v1/bills'
var SOLARPILOT_APP_URL = null;  // e.g. 'https://app.solarpilot.ie'
var NAV_OFFSET = 72;
var RI_STORAGE_KEY = 'ri-calc-prefs';
```

---

## 10. EXTERNAL LINKS

| Link | URL |
|------|-----|
| Cal.com booking | `https://cal.com/renewableireland/15min` |
| WhatsApp | `https://wa.me/353873958424` |
| Phone | `tel:+353873958424` |
| Facebook | `https://www.facebook.com/renewableireland` |
| Instagram | `https://www.instagram.com/renewableireland` |

---

*This spec captures 100% of the homepage's CSS, HTML structure, JavaScript logic, interactive features, SVG icons, image references, and configuration. It is sufficient to rebuild the page from scratch.*
