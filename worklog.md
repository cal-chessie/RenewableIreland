---
Task ID: 1
Agent: Main Agent
Task: Fix county page design - nested HTML bug and layout issues

Work Log:
- Diagnosed that county layout.tsx was creating nested `<html>` and `<body>` tags inside the root layout's HTML
- This caused the entire design to break - the browser received invalid double-nested HTML
- Rewrote county layout.tsx to remove duplicate html/head/body tags, keeping only a `<div id="county-root">` wrapper with accent CSS variables
- Fixed hardcoded `en-GB` lang attribute (now dynamic based on county country)  
- Fixed hardcoded `#E10600` theme-color (now uses county's actual accentColor)
- Removed duplicate accent var setting from page.tsx and [service]/page.tsx (now handled by layout)
- Verified build succeeds (976 pages generated)
- Verified Tyrone page renders with correct single HTML structure and Tyrone red accent colors

Stage Summary:
- The design was broken due to Next.js App Router nesting layouts - root layout had html/body, county layout also had html/body
- Fixed by converting county layout to a simple div wrapper with accent color CSS custom properties
- County pages now correctly inherit the dark premium design from the CSS module with county-specific accent colors
- Both main site (/) and county pages (/counties/tyrone) render correctly
