import styles from "@/app/counties/[county]/page.module.css";

interface TrustSectionProps {
  countyName: string;
  accreditation: string;
  currency: string;
  avgPaybackYears: string;
}

export default function TrustSection({
  countyName,
  accreditation,
  currency,
  avgPaybackYears,
}: TrustSectionProps) {
  const badges = [
    { icon: "✅", text: `${accreditation} Certified` },
    { icon: "⚡", text: "NICEIC Approved" },
    { icon: "🛡️", text: "Fully Insured" },
    { icon: "🏆", text: "5★ Google Rating" },
    { icon: "💰", text: "Fixed Price" },
    { icon: "🔋", text: "Battery Ready" },
  ];

  return (
    <section
      className={styles.trustSection}
      id="trust"
      aria-labelledby="trust-heading"
    >
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Why Choose Us</div>
          <h2 id="trust-heading">
            The Renewable {countyName} Difference
          </h2>
          <p>
            Everything you need for a seamless solar installation, managed from
            start to finish by our expert team.
          </p>
        </div>

        <div className={styles.trustPoints}>
          <div className={styles.trustPoint}>
            <svg className={styles.trustPointIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <div className={styles.trustPointContent}>
              <h3>{accreditation} Accredited</h3>
              <p>
                Every installation is fully certified to {accreditation} standards,
                ensuring quality workmanship and eligibility for grants and export tariffs.
              </p>
            </div>
          </div>

          <div className={styles.trustPoint}>
            <svg className={styles.trustPointIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div className={styles.trustPointContent}>
              <h3>Local Expertise in {countyName}</h3>
              <p>
                Based right here in {countyName}, not a national call centre. When you
                call us, you speak to someone who knows the area and local properties.
              </p>
            </div>
          </div>

          <div className={styles.trustPoint}>
            <svg className={styles.trustPointIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M12 6v6l4 2" />
            </svg>
            <div className={styles.trustPointContent}>
              <h3>{avgPaybackYears} Payback Period</h3>
              <p>
                A typical solar installation in {countyName} pays for itself in{" "}
                {avgPaybackYears}. After that, your electricity is effectively free for
                25+ years.
              </p>
            </div>
          </div>

          <div className={styles.trustPoint}>
            <svg className={styles.trustPointIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <div className={styles.trustPointContent}>
              <h3>1-Day Installation</h3>
              <p>
                Most installations completed in a single day. Our experienced crews
                arrive early, work efficiently, and leave your property spotless.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Row */}
      <div className={styles.trustBadgesSection} aria-label="Trust and accreditation badges">
        <div className="container">
          <div className={styles.trustBadgesRow}>
            {badges.map((badge, i) => (
              <div key={i} className={styles.trustBadge}>
                <div className={styles.trustBadgeIcon} aria-hidden="true">
                  {badge.icon}
                </div>
                <div className={styles.trustBadgeText}>{badge.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
