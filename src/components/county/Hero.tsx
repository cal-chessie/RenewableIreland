import styles from "@/app/counties/[county]/page.module.css";

interface HeroProps {
  countyName: string;
  countySlug: string;
  subtitle: string;
  phone: string;
}

export default function Hero({ countyName, subtitle, phone }: HeroProps) {
  return (
    <header
      className={styles.hero}
      id="main-content"
      role="banner"
      aria-labelledby="hero-heading"
    >
      <div className={styles.heroOverlay} />
      <div className={`container ${styles.heroContent}`}>
        <h1 id="hero-heading">
          Solar Panel Installers in{" "}
          <span>{countyName}</span>
        </h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>
        <div className={styles.heroButtons}>
          <a href="#bill-upload" className={styles.btnPrimary}>
            Get Your Free Quote
          </a>
          <a href="#bill-upload" className={styles.btnSecondary}>
            Upload Your Bill
          </a>
        </div>
      </div>
    </header>
  );
}
