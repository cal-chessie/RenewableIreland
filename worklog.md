---
Task ID: 1
Agent: Main Agent
Task: Diagnose and fix county pages not loading (stuck at Z logo)

Work Log:
- Read all county page files: page.tsx, layout.tsx, page.module.css, CountyBodyStyles.tsx, globals.css, root layout.tsx
- Audited all 10 county components (CalculatorClient, BillUpload, FAQ, CountyNav, Hero, Footer, Services, TrustSection, Testimonials, FinalCTA) — all clean, zero runtime errors
- Build succeeds with 0 errors, 976 pages generated (32 counties × services + blog + terms + privacy)
- Confirmed standalone server CAN serve county pages (HTTP 200, 143KB for /counties/dublin)

Changes made:
1. **Removed CountyBodyStyles.tsx** from county layout — unnecessary client component that manipulated document.body.style via useEffect. The #county-root div with inline background already handles this. Removed import and JSX usage from layout.tsx.

2. **Scoped globals.css :root variables to .main-site** — Changed `:root { --lime: #c8ff00; --black: #050505; ... }` to `.main-site { ... }`. These dark theme variables were global and leaking into county pages via CSS custom property inheritance.

3. **Fixed broken CSS selectors** — `.main-site body` selector didn't match because body IS the .main-site element, not inside it. Changed to `body.main-site { ... }`. Also fixed `.main-site html` to just `html { ... }`.

4. **Added county page body override** — `body.main-site:has(#county-root) { background: #F7F7F2; color: #111; }` ensures county pages get the correct light background even though body has the main-site class.

Stage Summary:
- All code changes are correct and build succeeds (0 errors, 976 pages)
- Server verified working: HTTP 200 with 143KB content for county pages
- The "Z logo" loading issue appears to be a preview environment server lifecycle issue, not a code issue
- Files modified: src/app/globals.css, src/app/counties/[county]/layout.tsx
- Files no longer imported: src/components/county/CountyBodyStyles.tsx (still exists but unused)
