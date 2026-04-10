import styles from "@/app/counties/[county]/page.module.css";
import type { CountyData } from "@/data/counties";

interface FooterProps {
  county: CountyData;
}

export default function Footer({ county }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              Renewable <span>Ireland</span>
            </div>
            <p>
              {county.accreditation} accredited solar panel installers
              serving homes, businesses and farms across County{" "}
              {county.name}. Based in {county.mainTown}.
            </p>
          </div>

          <div className={`${styles.footerCol} ${styles.footerContact}`}>
            <h4>Contact</h4>
            <a href={`tel:${county.phone}`}>{county.phone}</a>
            <a href={`mailto:${county.email}`}>{county.email}</a>
            <div className={styles.footerAccreditation}>
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              {county.accreditation} Certified
            </div>
          </div>

          <div className={styles.footerCol}>
            <h4>Services</h4>
            <a href={`/counties/${county.slug}/home-solar-panels`}>Home Solar Panels</a>
            <a href={`/counties/${county.slug}/commercial-solar-panels`}>Commercial Solar</a>
            <a href={`/counties/${county.slug}/agricultural-solar-panels`}>Agricultural Solar</a>
            <a href={`/counties/${county.slug}/battery-storage`}>Battery Storage</a>
            <a href={`/counties/${county.slug}/ev-chargers`}>EV Chargers</a>
            <a href={`/counties/${county.slug}/solar-maintenance`}>Maintenance</a>
          </div>

          <div className={styles.footerCol}>
            <h4>Areas We Serve</h4>
            {county.areaTowns.map((town) => (
              <span key={town}>Solar Panels {town}</span>
            ))}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>
            &copy; {currentYear} Renewable Ireland. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <a href={`/counties/${county.slug}/privacy-policy`}>Privacy Policy</a>
            <a href={`/counties/${county.slug}/terms`}>Terms &amp; Conditions</a>
            <a href={`/counties/${county.slug}/blog`}>Blog</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
