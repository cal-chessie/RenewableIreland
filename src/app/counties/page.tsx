import type { Metadata } from "next";
import Link from "next/link";
import { counties, countySlugs } from "@/data/counties";

export const metadata: Metadata = {
  title: "Counties We Cover | Renewable Ireland",
  description:
    "Renewable Ireland provides solar panel installation services across all 32 counties in Ireland. Find your county and get a free quote today.",
};

export default function CountiesPage() {
  const allCounties = countySlugs.map((slug) => counties[slug]);
  const roi = allCounties.filter((c) => c.country === "IE");
  const ni = allCounties.filter((c) => c.country === "GB");

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#fff",
        fontFamily:
          "'Barlow Condensed', 'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <section
        style={{
          padding: "80px 24px 48px",
          textAlign: "center",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            color: "#a3e635",
            marginBottom: 12,
          }}
        >
          Solar panel installation across Ireland
        </p>
        <h1
          style={{
            fontSize: "clamp(32px, 6vw, 56px)",
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: 16,
            textTransform: "uppercase" as const,
          }}
        >
          Counties We Cover
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.7,
            maxWidth: 540,
            margin: "0 auto",
          }}
        >
          We install solar panels, battery storage, and EV chargers in every
          county across the Republic of Ireland and Northern Ireland. Find your
          county below to get started.
        </p>
      </section>

      {/* Republic of Ireland */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 64px" }}>
        <h2
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            color: "rgba(255,255,255,0.3)",
            marginBottom: 24,
            paddingLeft: 4,
          }}
        >
          Republic of Ireland ({roi.length} counties)
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 12,
          }}
        >
          {roi.map((county) => (
            <CountyCard key={county.slug} county={county} />
          ))}
        </div>
      </section>

      {/* Northern Ireland */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
        <h2
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            color: "rgba(255,255,255,0.3)",
            marginBottom: 24,
            paddingLeft: 4,
          }}
        >
          Northern Ireland ({ni.length} counties)
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 12,
          }}
        >
          {ni.map((county) => (
            <CountyCard key={county.slug} county={county} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          textAlign: "center",
          padding: "48px 24px 80px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>
          Can&apos;t find your area? We cover the whole island.
        </p>
        <a
          href="https://cal.com/renewableireland/15min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            background: "#a3e635",
            color: "#0a0a0a",
            fontWeight: 700,
            fontSize: 13,
            padding: "12px 28px",
            borderRadius: 9999,
            textDecoration: "none",
            textTransform: "uppercase" as const,
            letterSpacing: "0.04em",
          }}
        >
          Get a Free Quote
        </a>
      </section>
    </main>
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
  };
}) {
  return (
    <Link
      href={`/counties/${county.slug}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "16px 20px",
        background: "#111",
        border: `2px solid rgba(255,255,255,0.08)`,
        borderRadius: 12,
        textDecoration: "none",
        color: "#fff",
        transition: "border-color 0.15s, transform 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = county.accentColor || "#a3e635";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 15,
            marginBottom: 2,
          }}
        >
          {county.name}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {county.mainTown} · {county.region}
        </div>
      </div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="2"
        style={{ flexShrink: 0 }}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
