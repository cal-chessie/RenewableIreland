# Intake hardening status

## Completed in this change

- Public CRM-backed enquiries, chat leads, survey requests, guide requests and
  qualification requests now require JSON, use bounded request sizes and bounded
  text fields, reject cross-origin browser requests, and return safe failures.
- References are generated with cryptographic randomness rather than predictable
  browser-era random values.
- A bounded, instance-local burst limit protects each route as a secondary
  control. It is **not** a replacement for Vercel Firewall / durable rate
  limiting because serverless instances do not share memory.
- All browser-facing responses added by the gate use `Cache-Control: no-store`.
- Common baseline security headers are applied by Next.js.
- Referral and bill-upload journeys are deliberately unavailable. Neither had a
  durable, auditable or privacy-safe implementation. The site must not claim a
  referral reward, generate a referral link, accept a bill, or display a success
  state until those services are built and acceptance-tested.
- The ROI page is deliberately unavailable. It was presented as a guarantee
  certificate despite being an unaudited estimate generated from generic
  assumptions. It must not return until its inputs, assumptions, disclaimer and
  approval route are defined.
- Chat input is bounded and the system prompt now forbids unverified company,
  price, grant, warranty, rating, saving and booking claims.

## Required before re-enabling bill upload

1. Define the purpose, lawful basis, retention period and deletion path for
   uploaded bills and meter identifiers.
2. Add server-side magic-byte validation, malware scanning, encrypted object
   storage, access controls and deletion verification.
3. Use an approved document-analysis flow that returns only data necessary for
   the estimate; never expose account numbers, MPRN/MPAN, names or addresses to
   the browser unless the customer explicitly needs them.
4. Prove failed uploads cannot generate a success response or leave orphaned
   personal data.

## Required before re-enabling referrals

1. Approved customer terms and an owner for reward decisions.
2. A durable database ledger for code issue, click, quote, install and reward
   events, with an audit trail.
3. A fraud policy, consent language and a test that the same event cannot pay
   twice.

## Required before re-enabling the savings calculator

1. Versioned assumptions for electricity rates, grants, export rates, system
   costs, generation and degradation, with an owner and review date.
2. Plain-language estimate disclaimer at the input and result stages; no
   certificate, guarantee, quote or “valid for” language.
3. A clear distinction between calculator output and a surveyed, written
   proposal.

## Platform gate still required

Configure Vercel Firewall / rate limiting for `/api/*`, especially chat and all
lead endpoints. The application-level burst guard reduces accidental or simple
abuse but cannot be relied on as a distributed rate limit.
