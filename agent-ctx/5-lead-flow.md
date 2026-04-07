# Work Record — Task 5: Smart Multi-Step Lead Qualification Flow

## Summary
Built a comprehensive 4-step conversational lead qualification flow as a modal component, integrated site-wide via the root layout. Replaces basic "Get a Quote" buttons with an engaging multi-step experience that qualifies leads and shows personalised solar savings results.

## Files Created

### Utilities
1. **`/src/lib/eircode.ts`** — Eircode to County mapping utility
   - Validates Irish Eircode format (`[A-Z]\d{2}\s?[A-Z0-9]{4}`)
   - Validates UK postcodes (for Northern Ireland)
   - Maps Eircode routing keys (first 3 chars) to county names
   - Detects NI postcodes (BT prefix) and switches country context
   - Exports all 32 counties list for dropdown fallback
   - `getCountryFromCounty()` determines IE vs GB jurisdiction

2. **`/src/lib/savings-calculator.ts`** — Solar savings calculation engine
   - System sizing: 4kWp (<€100 bill), 6kWp (€100-€200), 8kWp (€200+)
   - ROI pricing: €4,500 / €5,500 / €6,500 with €1,800 SEAI grant
   - NI pricing: £6,000 / £8,500 / £13,000 with SEG export payments
   - Calculates: annual savings, payback period, 25-year lifetime savings (with 0.5%/yr degradation), CO₂ offset
   - Self-consumption model (55% used directly, 45% exported)
   - CEG rate 0.21€/kWh (ROI), SEG rate 0.05£/kWh (NI)

### Components
3. **`/src/components/lead/lead-flow.css`** — 500+ lines of dark theme CSS
   - CSS custom properties matching site design system (#c8ff00 accent, #111 card, #0a0a0a bg)
   - Progress bar with animated fill (400ms cubic-bezier)
   - Step slide transitions (forward/back, 300ms ease)
   - Input fields: dark bg, lime focus border, error states
   - Option buttons with selected state (lime border + glow)
   - Radio buttons with custom dot animation
   - Results cards grid with accent highlights
   - Savings bar chart (before vs after comparison)
   - Grant banner, success state with pop animation
   - Custom scrollbar styling
   - Mobile responsive (≤480px breakpoints)

4. **`/src/components/lead/LeadFlowProvider.tsx`** — React context provider
   - Manages modal open/close, step navigation, form data persistence
   - County detection from Eircode (debounced at 3+ chars)
   - Savings computation bridge (calls calculator, stores result)
   - Lead submission handler (POST to API, handles success/error)
   - Listens for `window.dispatchEvent(new Event('open-lead-flow'))` custom event
   - Escape key to close, body scroll lock
   - Double-trigger prevention via ref lock

5. **`/src/components/lead/LeadQualificationFlow.tsx`** — Main "use client" modal component
   - **Step 1: Location Detection** — Eircode/postcode input with real-time validation, auto county detection, animated map pin, county dropdown fallback, "Continue" button
   - **Step 2: Energy Usage** — Bill range selection (5 options + custom amount), home type selection (5 options), back navigation, validation
   - **Step 3: Personalised Results** — 6-card results grid (system, savings, cost, payback, 25yr savings, CO₂), before/after bar chart, grant banner, annual generation display
   - **Step 4: Book Survey** — Full contact form (name, phone, email, address), date picker (min 2 days), time slot radio (morning/afternoon), notes textarea, phone/email regex validation, loading state, error handling, privacy note
   - **Step 5: Success** — Animated checkmark, reference number, confirmation message
   - All icons inline SVG (zero external dependencies)
   - Full keyboard support (Escape to close, focus management)
   - Mobile responsive

### API
6. **`/src/app/api/lead/qualify/route.ts`** — POST endpoint
   - Validates all required fields (name, phone, email, address, date, time, postcode, county, country, bill, home type)
   - Phone validation: Irish (08X XXX XXXX) and UK (07XXX XXXXXX) formats
   - Email regex validation
   - Survey date minimum 2 days from today
   - Generates unique reference number (e.g. "RI-2026-JMZG7")
   - Returns structured JSON response
   - Server-side logging for lead tracking

## Files Modified
- **`/src/app/layout.tsx`** — Wrapped children in `<LeadFlowProvider>`, added `<LeadQualificationFlow />` component, imported both

## Integration Points
- **Custom Event Trigger**: Any button can trigger the flow with `window.dispatchEvent(new Event('open-lead-flow'))`
- **React Context**: Components using `useLeadFlow()` can call `openLeadFlow(initialData?)` directly
- **Static HTML**: The context listens for custom events, so static HTML pages can trigger the modal

## Testing
- ✅ ESLint: 0 errors (1 pre-existing warning in county layout)
- ✅ API: `POST /api/lead/qualify` returns 200 with valid data, reference number generated
- ✅ API: Returns 400 with validation errors for missing fields
- ✅ Main page: `GET /` returns 200
- ✅ County pages: `GET /counties/dublin` returns 200
