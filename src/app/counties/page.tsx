import type { Metadata } from "next";
import Link from "next/link";
import { counties, countySlugs } from "@/data/counties";

export const metadata: Metadata = {
  title: "Counties We Cover | Renewable Ireland",
  description:
    "Renewable Ireland provides solar panel installation services across all 32 counties of Ireland — 26 in the Republic and 6 in Northern Ireland. Find your county and get a free quote today.",
};

export default function CountiesPage() {
  const allCounties = countySlugs.map((slug) => counties[slug]);
  const roi = allCounties.filter((c) => c.country === "IE");
  const ni = allCounties.filter((c) => c.country === "GB");

  return (
    <>
      <style>{`
        .cnt-page {
          font-family: 'Barlow', sans-serif;
          background: var(--cnt-off, #F7F7F2);
          color: var(--cnt-black, #111);
          min-height: 100vh;
        }
        .cnt-page * { box-sizing: border-box; }
        .cnt-page { overflow-x: hidden; }
        .cnt-page h1, .cnt-page h2, .cnt-page h3 {
          font-family: 'Barlow Condensed', sans-serif;
        }

        /* ═══════════════════════════════════════════════
           HERO HEADER
           ═══════════════════════════════════════════════ */
        .cnt-hero {
          background: #111;
          position: relative;
          overflow: hidden;
          padding: 0;
        }

        /* ── hero row: text left + image right ── */
        .cnt-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 72px 40px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }
        .cnt-hero-text {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .cnt-hero-img {
          flex-shrink: 0;
          height: clamp(260px, 38vw, 440px);
          width: auto;
          max-width: 50%;
          object-fit: contain;
          opacity: 0.95;
          filter: drop-shadow(0 8px 32px rgba(0,0,0,0.35));
        }

        /* ── gradient mesh ── */
        .cnt-hero-grad {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .cnt-hero-grad::before {
          content: '';
          position: absolute;
          top: -20%;
          right: -10%;
          width: 60%;
          height: 100%;
          background: radial-gradient(ellipse at center, rgba(109,201,58,0.14) 0%, transparent 65%);
        }
        .cnt-hero-grad::after {
          content: '';
          position: absolute;
          bottom: -15%;
          left: -8%;
          width: 50%;
          height: 90%;
          background: radial-gradient(ellipse at center, rgba(196,133,90,0.10) 0%, transparent 60%);
        }

        /* ── Ireland map watermark ── */
        .cnt-hero-map {
          position: absolute;
          right: 2%;
          top: 50%;
          transform: translateY(-50%);
          width: clamp(200px, 28vw, 420px);
          height: auto;
          opacity: 0.045;
          z-index: 0;
          pointer-events: none;
        }

        /* ── top tricolor strip ── */
        .cnt-hero-tri {
          display: flex;
          height: 5px;
          position: relative;
          z-index: 2;
        }
        .cnt-hero-tri span {
          flex: 1;
        }
        .cnt-hero-tri .tri-g { background: #169B62; }
        .cnt-hero-tri .tri-w { background: #FFFFFF; }
        .cnt-hero-tri .tri-o { background: #FF883E; }



        /* ── badge ── */
        .cnt-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(109,201,58,0.10);
          border: 1.5px solid rgba(109,201,58,0.25);
          border-radius: 100px;
          padding: 7px 18px 7px 8px;
          margin-bottom: 24px;
        }
        .cnt-hero-badge-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--cnt-lime, #6DC93A);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cnt-hero-badge-dot svg {
          width: 14px;
          height: 14px;
          color: #111;
        }
        .cnt-hero-badge-text {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: var(--cnt-lime, #6DC93A);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* ── heading ── */
        .cnt-hero h1 {
          font-size: clamp(42px, 7vw, 80px);
          font-weight: 800;
          line-height: 0.92;
          text-transform: uppercase;
          letter-spacing: -0.025em;
          color: #fff;
          margin-bottom: 20px;
          position: relative;
        }
        .cnt-hero h1 .h1-line {
          display: block;
        }
        .cnt-hero h1 .h1-accent {
          color: var(--cnt-lime, #6DC93A);
          position: relative;
        }
        .cnt-hero h1 .h1-accent::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          right: 0;
          height: 6px;
          background: rgba(109,201,58,0.25);
          border-radius: 3px;
        }

        /* ── subtitle ── */
        .cnt-hero-sub {
          font-size: clamp(15px, 1.6vw, 17px);
          color: rgba(255,255,255,0.50);
          max-width: 480px;
          line-height: 1.75;
          margin-bottom: 36px;
        }

        /* ── CTA button ── */
        .cnt-hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--cnt-lime, #6DC93A);
          color: #111;
          border: 2.5px solid #111;
          border-radius: 100px;
          padding: 14px 30px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Barlow Condensed', sans-serif;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          box-shadow: 4px 4px 0 rgba(255,255,255,0.10);
          transition: transform 0.15s, box-shadow 0.15s;
          margin-bottom: 48px;
        }
        .cnt-hero-btn:hover {
          transform: translate(-3px, -3px);
          box-shadow: 7px 7px 0 rgba(255,255,255,0.14);
        }

        /* ── stats row ── */
        .cnt-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          width: 100%;
          margin-bottom: -2px;
          position: relative;
          z-index: 2;
        }
        .cnt-stat {
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 20px 16px 18px;
          text-align: center;
          transition: background 0.2s, border-color 0.2s;
        }
        .cnt-stat:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.14);
        }
        .cnt-stat-val {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(28px, 3vw, 36px);
          font-weight: 800;
          color: #fff;
          line-height: 1;
          margin-bottom: 4px;
        }
        .cnt-stat-val.lime { color: var(--cnt-lime, #6DC93A); }
        .cnt-stat-val.earth { color: #C4855A; }
        .cnt-stat-val.off { color: rgba(255,255,255,0.7); }
        .cnt-stat-lbl {
          font-size: 10px;
          font-weight: 600;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: 'Barlow Condensed', sans-serif;
        }

        /* ── bottom clip / transition ── */
        .cnt-hero-clip {
          position: relative;
          z-index: 2;
          height: 32px;
          background: linear-gradient(180deg, #111 0%, #F7F7F2 100%);
        }

        /* Section */
        .cnt-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 24px;
        }
        .cnt-section:last-of-type {
          padding-bottom: 32px;
        }

        .cnt-section-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--cnt-lime-dk, #55A82C);
          margin-bottom: 8px;
        }
        .cnt-section-tag::before {
          content: '';
          width: 18px;
          height: 2.5px;
          background: var(--cnt-lime, #6DC93A);
          border-radius: 2px;
        }


        .cnt-section h2 {
          font-size: clamp(26px, 3.2vw, 38px);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.05;
          color: #111;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .cnt-section-sub {
          font-size: 15px;
          color: var(--cnt-gray, #4A4A44);
          max-width: 500px;
          line-height: 1.65;
          margin-bottom: 36px;
          overflow-wrap: break-word;
          word-break: break-word;
        }

        /* Grid */
        .cnt-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
        }

        /* County card */
        .cnt-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 18px 22px;
          background: #fff;
          border: 2.5px solid #111;
          border-radius: 16px;
          text-decoration: none;
          color: #111;
          box-shadow: 4px 4px 0 #111;
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
          overflow: hidden;
        }
        .cnt-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 8px 8px 0 var(--cnt-lime-dk, #55A82C);
        }
        .cnt-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: var(--cnt-accent, #6DC93A);
          transition: width 0.15s;
        }
        .cnt-card:hover::before {
          width: 6px;
        }
        .cnt-card-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 16px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.01em;
          line-height: 1;
          margin-bottom: 3px;
        }
        .cnt-card-detail {
          font-size: 11px;
          color: var(--cnt-hint, #9A9A92);
          font-weight: 500;
          line-height: 1.3;
        }
        .cnt-card-cost {
          display: inline-block;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: var(--cnt-lime-dk, #55A82C);
          background: var(--cnt-lime-lt, #E8F9D8);
          border: 1.5px solid #111;
          border-radius: 100px;
          padding: 2px 8px;
          margin-top: 5px;
        }
        .cnt-card-arrow {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          color: #111;
          transition: transform 0.15s;
        }
        .cnt-card:hover .cnt-card-arrow {
          transform: translateX(3px);
        }

        /* CTA Section */
        .cnt-cta {
          background: #111;
          border-top: 3px solid var(--cnt-lime, #6DC93A);
          padding: 64px 24px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cnt-cta::before {
          content: 'GO SOLAR';
          position: absolute;
          bottom: -30px;
          right: -20px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 200px;
          font-weight: 800;
          color: rgba(255,255,255,0.03);
          line-height: 1;
          pointer-events: none;
          white-space: nowrap;
        }
        .cnt-cta h2 {
          font-size: clamp(28px, 3.8vw, 44px);
          font-weight: 800;
          text-transform: uppercase;
          color: #fff;
          line-height: 1.05;
          margin-bottom: 12px;
          position: relative;
        }
        .cnt-cta h2 em {
          font-style: normal;
          color: var(--cnt-lime, #6DC93A);
        }
        .cnt-cta p {
          font-size: 15px;
          color: rgba(255,255,255,0.5);
          max-width: 480px;
          margin: 0 auto 28px;
          line-height: 1.65;
          position: relative;
        }
        .cnt-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--cnt-lime, #6DC93A);
          color: #111;
          border: 2.5px solid #111;
          border-radius: 100px;
          padding: 14px 32px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Barlow Condensed', sans-serif;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          box-shadow: 4px 4px 0 rgba(255,255,255,0.15);
          transition: transform 0.15s, box-shadow 0.15s;
          position: relative;
        }
        .cnt-cta-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 rgba(255,255,255,0.2);
        }

        /* Divider */
        .cnt-divider {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .cnt-divider hr {
          border: none;
          height: 2.5px;
          background: repeating-linear-gradient(
            90deg,
            #111 0px, #111 8px,
            transparent 8px, transparent 16px
          );
          opacity: 0.12;
        }

        /* Footer mini */
        .cnt-footer {
          background: #111;
          border-top: 2.5px solid rgba(255,255,255,0.08);
          padding: 24px;
          text-align: center;
          font-size: 12px;
          color: rgba(255,255,255,0.3);
        }
        .cnt-footer a {
          color: var(--cnt-lime, #6DC93A);
          text-decoration: none;
        }
        .cnt-footer a:hover {
          text-decoration: underline;
        }

        /* Tablet: keep row layout, shrink image */
        @media (max-width: 900px) {
          .cnt-hero-inner { padding: 56px 24px 0; gap: 20px; }
          .cnt-hero-img { height: clamp(180px, 28vw, 300px); max-width: 40%; }
          .cnt-hero h1 { font-size: clamp(36px, 7vw, 60px); }
          .cnt-hero-sub { max-width: 360px; font-size: 14px; }
          .cnt-hero-map { right: -2%; width: clamp(140px, 24vw, 300px); opacity: 0.04; }
          .cnt-stats { grid-template-columns: repeat(2, 1fr); gap: 8px; }
        }
        /* Mobile: stack vertically */
        @media (max-width: 640px) {
          .cnt-hero-inner { flex-direction: column; padding: 28px 18px 0; gap: 14px; align-items: flex-start; }
          .cnt-hero-img { max-width: 120px; height: 80px; order: -1; opacity: 0.15; }
          .cnt-hero h1 { font-size: clamp(28px, 10vw, 38px); margin-bottom: 10px; }
          .cnt-hero-map { opacity: 0.03; right: -5%; width: 120px; }
          .cnt-hero-badge { margin-bottom: 10px; padding: 5px 12px 5px 6px; }
          .cnt-hero-badge-dot { width: 22px; height: 22px; }
          .cnt-hero-badge-text { font-size: 10px; }
          .cnt-hero-sub { font-size: 13px; max-width: 100%; line-height: 1.55; margin-bottom: 14px; }
          .cnt-hero-btn { margin-bottom: 20px; padding: 11px 22px; font-size: 13px; }
          .cnt-stats { grid-template-columns: repeat(2, 1fr); gap: 6px; }
          .cnt-stat { padding: 12px 8px; border-radius: 10px; }
          .cnt-stat-val { font-size: 24px; }
          .cnt-stat-lbl { font-size: 9px; }
          .cnt-stats-wrap { padding: 0 18px 24px !important; }
          .cnt-section { padding: 32px 14px; }
          .cnt-section h2 { font-size: clamp(22px, 6vw, 30px); }
          .cnt-section-sub { font-size: 13px; max-width: 100%; margin-bottom: 24px; }
          .cnt-grid { grid-template-columns: 1fr; gap: 10px; }
          .cnt-card { padding: 14px 16px; }
        }
      `}</style>

      <div className="cnt-page">
        {/* ═══ HERO HEADER ═══ */}
        <section className="cnt-hero">
          {/* gradient mesh */}
          <div className="cnt-hero-grad" aria-hidden="true" />

          {/* tricolor strip */}
          <div className="cnt-hero-tri" aria-hidden="true">
            <span className="tri-g" />
            <span className="tri-w" />
            <span className="tri-o" />
          </div>

          {/* content: text + hero image */}
          <div className="cnt-hero-inner">
            {/* Ireland map watermark */}
            <svg className="cnt-hero-map" viewBox="0 0 340 510" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M175 8 L190 12 L200 10 L210 14 L218 12 L228 16 L235 22 L242 18 L250 24 L255 32 L258 42 L262 52 L265 64 L268 76 L272 88 L276 100 L280 112 L282 122 L285 132 L288 140 L290 148 L292 155 L295 160 L300 158 L305 162 L310 168 L314 176 L318 184 L320 192 L318 200 L315 206 L310 212 L306 218 L302 224 L298 230 L295 236 L292 240 L288 244 L284 248 L280 252 L276 256 L272 260 L268 264 L264 268 L260 272 L257 278 L254 284 L252 290 L250 296 L248 302 L245 308 L242 314 L238 320 L234 326 L230 332 L228 338 L226 344 L225 350 L226 356 L228 362 L232 368 L236 374 L240 380 L244 386 L248 392 L252 398 L254 404 L252 410 L248 416 L244 420 L240 424 L236 428 L232 432 L228 436 L225 440 L222 444 L220 448 L218 454 L216 460 L215 466 L214 472 L215 478 L216 484 L214 488 L210 492 L206 494 L200 496 L194 498 L188 500 L182 502 L176 504 L170 505 L164 504 L158 502 L152 500 L146 496 L140 492 L136 488 L132 484 L128 478 L124 472 L120 466 L116 460 L112 454 L108 448 L104 442 L100 436 L96 430 L92 424 L88 418 L84 412 L80 406 L76 400 L72 394 L68 388 L64 382 L60 376 L56 370 L52 364 L48 358 L45 352 L42 346 L40 340 L38 334 L36 328 L35 322 L34 316 L34 310 L36 304 L38 298 L40 292 L42 286 L44 280 L46 274 L48 268 L50 262 L52 256 L54 250 L56 244 L58 238 L60 232 L62 226 L65 220 L68 214 L72 208 L76 202 L80 196 L84 190 L88 184 L92 178 L96 172 L100 166 L104 160 L108 154 L112 148 L115 142 L118 136 L120 130 L122 124 L124 118 L126 112 L128 106 L130 100 L132 94 L134 88 L136 82 L138 76 L140 70 L142 64 L144 58 L146 52 L148 46 L150 40 L152 34 L154 28 L156 22 L158 16 L160 12 L164 8 L170 6 L175 8 Z" />
            </svg>
            <div className="cnt-hero-text">
              <div className="cnt-hero-badge">
                <span className="cnt-hero-badge-dot">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </span>
                <span className="cnt-hero-badge-text">All-Island Solar Coverage</span>
              </div>

              <h1>
                <span className="h1-line">We Cover</span>
                <span className="h1-line"><span className="h1-accent">Every County</span></span>
              </h1>

              <p className="cnt-hero-sub">
                From Donegal to Cork, Dublin to Belfast &mdash; SEAI-registered and MCS-accredited
                solar specialists delivering panels, battery storage, and EV chargers to
                every county across the island of Ireland.
              </p>

              <a
                href="https://cal.com/renewableireland/solar-consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="cnt-hero-btn"
              >
                Get a Free Quote
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Hero image — battery, full colour, right side */}
            <img
              src="/ri-battery-logo.png"
              alt="Renewable Ireland"
              className="cnt-hero-img"
            />
          </div>

          {/* stats */}
          <div className="cnt-stats-wrap" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 40px' }}>
            <div className="cnt-stats">
              <div className="cnt-stat">
                <div className="cnt-stat-val lime">32</div>
                <div className="cnt-stat-lbl">Counties</div>
              </div>
              <div className="cnt-stat">
                <div className="cnt-stat-val">4</div>
                <div className="cnt-stat-lbl">Provinces</div>
              </div>
              <div className="cnt-stat">
                <div className="cnt-stat-val earth">SEAI</div>
                <div className="cnt-stat-lbl">Registered</div>
              </div>
              <div className="cnt-stat">
                <div className="cnt-stat-val off">100%</div>
                <div className="cnt-stat-lbl">Coverage</div>
              </div>
            </div>
          </div>

          {/* clip transition */}
          <div className="cnt-hero-clip" aria-hidden="true" />
        </section>

        {/* Republic of Ireland */}
        <section className="cnt-section">
          <div className="cnt-section-tag">Republic of Ireland</div>
          <h2>{roi.length} Counties Covered</h2>
          <p className="cnt-section-sub">
            From Donegal to Cork, Dublin to Galway &mdash; we&apos;re the SEAI-registered
            solar specialists serving every county in the Republic.
          </p>
          <div className="cnt-grid">
            {roi.map((county) => (
              <CountyCard key={county.slug} county={county} />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="cnt-divider"><hr /></div>

        {/* Northern Ireland */}
        <section className="cnt-section">
          <div className="cnt-section-tag">Northern Ireland</div>
          <h2>{ni.length} Counties Covered</h2>
          <p className="cnt-section-sub">
            MCS accredited solar panel installers serving homes, businesses and farms across
            Northern Ireland &mdash; from Antrim to Fermanagh, Down to Derry.
          </p>
          <div className="cnt-grid">
            {ni.map((county) => (
              <CountyCard key={county.slug} county={county} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cnt-cta">
          <h2>Ready to <em>Go Solar?</em></h2>
          <p>
            Can&apos;t find your area? We cover the whole island. Get a free,
            no-obligation quote and see how much you could save.
          </p>
          <a
            href="https://cal.com/renewableireland/solar-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="cnt-cta-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            Get a Free Quote
          </a>
        </section>

        {/* Footer */}
        <div className="cnt-footer">
          &copy; {new Date().getFullYear()} Renewable Ireland &middot; SEAI Registered Partner &middot;{" "}
          <a href="/">Home</a> &middot;{" "}
          <a href="https://cal.com/renewableireland/solar-consultation">Contact</a>
        </div>
      </div>
    </>
  );
}

function CountyCard({
  county,
}: {
  county: {
    slug: string;
    name: string;
    region: string;
    mainTown: string;
    avgSystemCost: string;
    accentColor: string;
    country: string;
  };
}) {
  const accent = county.accentColor || "#6DC93A";
  return (
    <Link
      href={`/counties/${county.slug}`}
      className="cnt-card"
      style={{ "--cnt-accent": accent } as React.CSSProperties}
    >
      <div>
        <div className="cnt-card-name">{county.name}</div>
        <div className="cnt-card-detail">
          {county.mainTown} &middot; {county.region}
        </div>
        <span className="cnt-card-cost">{county.avgSystemCost}</span>
      </div>
      <svg
        className="cnt-card-arrow"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
