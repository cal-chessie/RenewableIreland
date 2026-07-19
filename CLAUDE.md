# Renewable Ireland — website (Next.js 16, App Router)

National brand site, 32 county pages at `/counties/<slug>` (+ per-county
services and blogs). Part of Cal's estate — map:
`~/Desktop/SONSSONS/COMH/RENEWABLY/LAUNCH_MAP.md`
Kernel law: `~/Desktop/SONSSONS/COMH/RENEWABLY/KERNEL_INTELLIGENCE.md`

## House rules
- Read before write. Never `--force` push. Never commit `.env*`.
- Don't change the visual design.
- Single-domain strategy is DECIDED: all canonicals/sitemap use
  renewableireland.ie/counties/<slug> (county domains in `src/data/counties.ts`
  were rewritten 2026-07-18 — do not revert to per-county domains).

## State (2026-07-18 — uncommitted; no .git yet, first commit pending)
- Homepage: `src/app/page.tsx` ONLY (deleted conflicting `src/app/route.ts` +
  v8-homepage.html copies — never re-add a root route.ts).
- Chat on OpenAI (`OPENAI_API_KEY`); z-ai + next-auth removed from package.json.
- 4 lead routes (chat/lead, book-survey, exit-intent, qualify) send Postmark
  email via `src/lib/notify.ts` AND forward to AISOLAR via `src/lib/aisolar.ts`.
- Security headers in next.config.ts; robots.txt welcomes AI crawlers; llms.txt.
- Prisma is scaffold-only (no route uses it) — add a Lead model or drop it.

## Deploy
Vercel from main. Env in `.env.example`. Steps in `DEPLOYMENT.md`.
