import styles from "@/app/counties/[county]/page.module.css";

interface HeroProps {
  countyName: string;
  countySlug: string;
  subtitle: string;
  heroTitle?: string;
  phone: string;
  accreditation: string;
}

export default function Hero({ countyName, countySlug, subtitle, heroTitle, accreditation }: HeroProps) {
  // Split heroTitle into main line and highlighted line
  const titleParts = heroTitle
    ? heroTitle.split("\n")
    : [`Solar Panels ${countyName}.`, "Done Right."];
  const titleMain = titleParts[0];
  const titleHighlight = titleParts[1] || "";

  return (
    <section
      className={styles.hero}
      id="main-content"
      role="banner"
      aria-labelledby="hero-heading"
    >
      <div className={styles.heroContent}>
        <div className={styles.heroBadge} aria-label={`${accreditation} accredited installers`}>
          {accreditation} Accredited Installers Serving County {countyName}
        </div>
        <h1 id="hero-heading">
          {titleMain}<br />
          <span className={styles.heroHighlight}>{titleHighlight}</span>
        </h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>
        <div className={styles.heroButtons}>
          <a href="#calculator" className={`${styles.btn} ${styles.btnPrimary}`}>
            Get Free Savings Estimate
          </a>
          <a href="#bill-upload" className={`${styles.btn} ${styles.btnSecondary}`}>
            Upload Your Bill
          </a>
        </div>
      </div>
    </section>
  );
}
