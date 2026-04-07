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
  return (
    <section
      className={styles.trustSection}
      id="trust"
      aria-labelledby="trust-heading"
    >
      <div className="container">
        <div className={styles.trustGrid}>
          <div className={styles.trustImage} role="img" aria-label={`Solar panel installation on a home in ${countyName}`}>
            <div className={styles.trustImagePlaceholder}>
              Solar panel installation on a home in {countyName}
            </div>
          </div>

          <div>
            <h2 id="trust-heading">
              Why Choose Solar {countyName}?
            </h2>
            <div className={styles.trustPoints}>
              <div className={styles.trustPoint}>
                <svg className={styles.trustPointIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                <div className={styles.trustPointContent}>
                  <h3>{accreditation} Accredited</h3>
                  <p>
                    Every installation we carry out in {countyName} is fully
                    certified to {accreditation} standards, ensuring quality
                    workmanship and eligibility for grants and export tariffs.
                  </p>
                </div>
              </div>

              <div className={styles.trustPoint}>
                <svg className={styles.trustPointIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                </svg>
                <div className={styles.trustPointContent}>
                  <h3>500+ Installations</h3>
                  <p>
                    With over 500 solar installations completed across{" "}
                    {countyName} and the surrounding region, our experienced
                    team has seen virtually every roof type and property style.
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
                    A typical solar installation in {countyName} pays for
                    itself in {avgPaybackYears}. After that, your electricity
                    is effectively free for the remaining 25+ year panel life.
                  </p>
                </div>
              </div>

              <div className={styles.trustPoint}>
                <svg className={styles.trustPointIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div className={styles.trustPointContent}>
                  <h3>Local to {countyName}</h3>
                  <p>
                    We&apos;re based right here in {countyName}, not a national
                    call centre. When you call us, you speak to someone who
                    knows the area, the properties, and the local energy
                    landscape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
