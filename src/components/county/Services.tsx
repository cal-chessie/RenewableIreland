import styles from "@/app/counties/[county]/page.module.css";
import { services } from "@/data/counties";
import type { ServiceData } from "@/data/counties";

function ServiceIcon({ icon, className }: { icon: string; className: string }) {
  const iconProps = {
    className,
    width: 44,
    height: 44,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (icon) {
    case "home":
      return (
        <svg {...iconProps}>
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "building":
      return (
        <svg {...iconProps}>
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <line x1="9" y1="6" x2="9" y2="6.01" />
          <line x1="15" y1="6" x2="15" y2="6.01" />
          <line x1="9" y1="10" x2="9" y2="10.01" />
          <line x1="15" y1="10" x2="15" y2="10.01" />
          <line x1="9" y1="14" x2="9" y2="14.01" />
          <line x1="15" y1="14" x2="15" y2="14.01" />
          <path d="M9 22V18h6v4" />
        </svg>
      );
    case "tractor":
      return (
        <svg {...iconProps}>
          <circle cx="6" cy="17" r="4" />
          <circle cx="18" cy="17" r="4" />
          <path d="M6 13V7a1 1 0 011-1h4l3 4" />
          <path d="M10 13h8l-2-4" />
        </svg>
      );
    case "battery":
      return (
        <svg {...iconProps}>
          <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
          <line x1="23" y1="13" x2="23" y2="11" />
          <line x1="11" y1="10" x2="11" y2="14" />
          <line x1="7" y1="10" x2="7" y2="14" />
          <line x1="15" y1="10" x2="15" y2="14" />
        </svg>
      );
    case "zap":
      return (
        <svg {...iconProps}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...iconProps}>
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

interface ServicesProps {
  countyName: string;
  countySlug: string;
}

export default function Services({ countyName, countySlug }: ServicesProps) {
  return (
    <section
      className={`${styles.section} ${styles.sectionAlt}`}
      id="features"
      aria-labelledby="services-heading"
    >
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Why Renewable {countyName}</div>
          <h2 id="services-heading">Solar Energy Services in {countyName}</h2>
          <p>
            Complete solar solutions for homes, businesses and farms across{" "}
            {countyName}. MCS accredited, fully insured, and installed in a single day.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {services.map((service: ServiceData) => (
            <article key={service.slug} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <ServiceIcon icon={service.icon} className={styles.featureIcon} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.shortDescription}</p>
              <a
                href={`/counties/${countySlug}/${service.slug}`}
                className={styles.serviceLink}
              >
                Learn More
                <svg className={styles.serviceLinkArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
