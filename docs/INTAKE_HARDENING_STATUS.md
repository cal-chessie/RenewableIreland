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
- The referral journey is deliberately unavailable. It did not have a durable,
  auditable implementation and the site must not claim a referral reward or
  generate a referral link until that service is built and acceptance-tested.
- Bill upload is now an ephemeral analysis path: the customer must opt in,
  uploads are limited and file signatures are verified, the response is not
  cached, and only estimate-relevant fields are returned. The application does
  not store the uploaded bill. It still needs a live production smoke test with
  an approved test bill before public promotion.
- The ROI page is deliberately unavailable. It was presented as a guarantee
  certificate despite being an unaudited estimate generated from generic
  assumptions. It must not return until its inputs, assumptions, disclaimer and
  approval route are defined.
- Chat input is bounded and the system prompt now forbids unverified company,
  price, grant, warranty, rating, saving and booking claims.

## Bill-upload operational checks before public promotion

1. Confirm the public privacy notice covers the purpose and the chosen
   no-storage processing design.
2. Run an approved test PDF, JPG and PNG through the deployed route; prove that
   only supplier, bill amount, period, usage and tariff are returned.
3. Confirm that an invalid file, oversized file, no-consent request and provider
   outage all fail honestly without displaying a successful estimate.
4. Add malware scanning before any future change that stores bills or forwards
   them to another system.

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
