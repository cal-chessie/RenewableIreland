import sharedStyles from "./page.module.css";

export default function CountyNotFound() {
  return (
    <div className={sharedStyles.countySite}>
      <a href="#main-content" className={sharedStyles.skipLink}>
        Skip to main content
      </a>

      <main
        id="main-content"
        role="main"
        aria-labelledby="not-found-heading"
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "60px 24px",
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(5rem, 12vw, 8rem)",
              lineHeight: 1,
              color: "var(--accent-red)",
              margin: 0,
              marginBottom: 8,
            }}
          >
            404
          </p>
          <h1
            id="not-found-heading"
            className={sharedStyles.headingH1}
            style={{ marginBottom: 14 }}
          >
            Page Not Found
          </h1>
          <p
            style={{
              color: "var(--text-mid)",
              fontSize: 16,
              lineHeight: 1.7,
              marginBottom: 32,
            }}
          >
            Sorry, the page you are looking for doesn&apos;t exist or has been
            moved. Let us help you get back on track.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              alignItems: "center",
            }}
          >
            <a href="#" className={sharedStyles.btnPrimary}>
              Return to Homepage
            </a>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginTop: 8,
              }}
            >
              <a href="#home-solar-panels" style={{ color: "var(--accent-red)", fontWeight: 500, fontSize: 15 }}>
                Solar Panel Installation
              </a>
              <a href="#battery-storage" style={{ color: "var(--accent-red)", fontWeight: 500, fontSize: 15 }}>
                Battery Storage
              </a>
              <a href="#commercial-solar-panels" style={{ color: "var(--accent-red)", fontWeight: 500, fontSize: 15 }}>
                Commercial Solar
              </a>
              <a href="#ev-chargers" style={{ color: "var(--accent-red)", fontWeight: 500, fontSize: 15 }}>
                EV Chargers
              </a>
            </div>
          </div>

          <div
            style={{
              marginTop: 48,
              padding: "24px",
              background: "var(--primary-bg)",
              borderRadius: 8,
              textAlign: "center",
            }}
          >
            <p style={{ color: "var(--text-dark)", fontWeight: 600, marginBottom: 8, fontSize: 15 }}>
              Need help? Give us a call:
            </p>
            <a
              href="tel:"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.4rem",
                color: "var(--accent-red)",
                textDecoration: "none",
              }}
            >
              {/* Phone number will be injected by the layout context */}
              Contact Us
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
