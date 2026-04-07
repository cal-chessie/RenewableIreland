import styles from "@/app/counties/[county]/page.module.css";

interface HeroProps {
  countyName: string;
  countySlug: string;
  subtitle: string;
  phone: string;
  accreditation: string;
}

export default function Hero({ countyName, countySlug, subtitle, accreditation }: HeroProps) {
  return (
    <section
      className={styles.hero}
      id="main-content"
      role="banner"
      aria-labelledby="hero-heading"
    >
      <div className="container">
        <div className={styles.heroBadge} aria-label={`${accreditation} accredited installers`}>
          {accreditation} Accredited Installers Serving County {countyName}
        </div>
        <h1 id="hero-heading">
          Solar Panels {countyName}.<br />
          <span className={styles.heroHighlight}>Done Right.</span>
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
