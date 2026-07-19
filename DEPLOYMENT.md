# Deploying Renewable Ireland to Vercel

## What was fixed (July 2026 cleanup)
The homepage had three competing implementations: `src/app/page.tsx`, a `src/app/route.ts` reading a file that doesn't exist in this repo (`upload/renewable-ireland-v8 (18).html` — instant crash), and a rewrite to a static `v8-homepage.html`. `page.tsx` + `route.ts` in the same folder is also a hard Next.js build error. Resolution: `page.tsx` (the full 4,000-line v8 design with proper metadata) is now the only homepage; the broken route, the rewrite, and both stale HTML copies are gone. Design untouched.

Also fixed: `z-ai-web-dev-sdk` (sandbox-only) swapped for OpenAI in the chatbot; all five lead-capture endpoints (chat lead, survey booking, exit-intent, lead qualification) now email leads via Postmark instead of only console-logging them; canonical URLs, OG tags and sitemap moved from the unwired 32-county-domain scheme to single-domain paths (`renewableireland.ie/counties/<county>`); robots.txt now welcomes AI crawlers (was silent on them) and references the sitemap; `llms.txt` added; security headers added (there were none); stale lockfiles removed; `next dev`/`build`/`start` scripts normalised (standalone-output hack removed — Vercel doesn't need it).

## Steps
1. This folder has no `.git` (it's a GitHub zip export). Push it to your repo:
   ```bash
   npm install
   npm run build          # verify locally
   git init && git add -A && git commit -m "Deployment cleanup"
   git remote add origin <your-repo-url> && git push -u origin main
   ```
2. Import in Vercel, framework preset Next.js.
3. Set env vars from `.env.example` — minimum `OPENAI_API_KEY`, `POSTMARK_SERVER_TOKEN`, `CONTACT_EMAIL_FROM`.
4. Add the domain, verify in Google Search Console, submit `/sitemap.xml`.

## Known debt
- Prisma is scaffold-only (User/Post models, no Lead model, no route uses the DB). Either add a Lead model and persist leads, or drop Prisma.
- If you later revive the 32-county-domain strategy, it needs middleware mapping each domain to its `/counties/<slug>` content, per-domain Vercel config, and Search Console verification for every domain. Single-domain concentrates authority and is the recommended default.
- Rate limiting exists on chat/referral/qualify/roi-certificate but not on the simpler lead endpoints — fine at current scale, revisit if spam appears.
