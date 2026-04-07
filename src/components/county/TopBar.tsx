import styles from "@/app/counties/[county]/page.module.css";

interface TopBarProps {
  phone: string;
  email: string;
  accreditation: string;
}

export default function TopBar({ phone, email, accreditation }: TopBarProps) {
  return (
    <div className={styles.topBar} role="presentation">
      <div className={styles.topBarInner}>
        <a href={`tel:${phone}`} className={styles.topBarItem}>
          <svg className={styles.topBarIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          <span>{phone}</span>
        </a>
        <a href={`mailto:${email}`} className={styles.topBarItem}>
          <svg className={styles.topBarIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span>{email}</span>
        </a>
        <div className={styles.topBarAccreditation}>
          <svg className={styles.topBarIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>{accreditation} Certified</span>
        </div>
      </div>
    </div>
  );
}
