'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

/* ===== SVG Icons ===== */
const GiftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

/* ===== MAIN CLIENT COMPONENT ===== */
export default function ReferralLandingClient({ code }: { code: string }) {
  const [referrerName, setReferrerName] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const referralCode = code.toUpperCase();

    // Store referral code in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('referral_code', referralCode);
      localStorage.setItem('referral_timestamp', new Date().toISOString());
    }

    // Validate code via API
    fetch('/api/referral', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'validate', code: referralCode }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.valid) {
          setReferrerName(data.data.name);
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      })
      .catch(() => {
        setIsValid(false);
      });
  }, [code]);

  const handleGetQuote = () => {
    const event = new CustomEvent('open-lead-flow');
    window.dispatchEvent(event);
  };

  // Extract name from code as fallback
  const fallbackName = code.replace(/^RI-/, '').replace(/-[A-Z0-9]{4}$/, '');
  const displayName = referrerName || (isValid === false ? '' : fallbackName);

  return (
    <div className={styles.landingPage}>
      {/* Skip Link */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      {/* Navigation */}
      <header className={styles.nav} role="banner">
        <div className={styles.navInner}>
          <a href="/" className={styles.navLogo} aria-label="Renewable Ireland - Home">
            Renewable<span>Ireland</span>
          </a>
          <a href="tel:+353873958424" className={styles.navCta}>
            <PhoneIcon />
            Get Free Quote
          </a>
        </div>
      </header>

      <main id="main-content">
        {/* ===== VALID STATE ===== */}
        {isValid === true && (
          <>
            {/* Hero */}
            <section className={styles.hero} aria-labelledby="hero-heading">
              <div className={styles.container}>
                <div className={styles.referralBadge} role="status">
                  <GiftIcon />
                  You&apos;ve been referred! &euro;200 discount applied
                </div>
                <h1 id="hero-heading">
                  <span className={styles.referrerName}>{displayName}</span>{' '}
                  Recommended Renewable Ireland
                </h1>
                <p className={styles.heroSubtitle}>
                  You&apos;ve been referred by a friend who went solar with us.
                  As a referral, you&apos;ll receive &euro;200 off your solar panel installation
                  &mdash; and they&apos;ll earn a &euro;200 thank-you reward when you go ahead.
                </p>
                <div className={styles.heroButtons}>
                  <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={handleGetQuote}
                    aria-label="Get your free solar quote with €200 discount"
                  >
                    Get Your Free Quote
                  </button>
                  <a href="/" className={`${styles.btn} ${styles.btnSecondary}`}>
                    Learn More
                  </a>
                </div>
              </div>
            </section>

            {/* Benefits */}
            <section className={styles.benefitsSection} aria-labelledby="benefits-heading">
              <div className={styles.container}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionLabel}>Why Go Solar</div>
                  <h2 id="benefits-heading">Why 2,847+ Irish Homeowners Chose Us</h2>
                  <p>Renewable Ireland is Ireland&apos;s most trusted solar panel installer.</p>
                </div>
                <div className={styles.benefitsGrid}>
                  <div className={styles.benefitCard}>
                    <div className={styles.benefitIcon}>
                      <ShieldIcon />
                    </div>
                    <div>
                      <h3>Fixed Price Guarantee</h3>
                      <p>The price we quote is the price you pay. No hidden fees, no surprise charges. Complete transparency throughout.</p>
                    </div>
                  </div>
                  <div className={styles.benefitCard}>
                    <div className={styles.benefitIcon}>
                      <ZapIcon />
                    </div>
                    <div>
                      <h3>1-Day Installation</h3>
                      <p>Most installations completed in a single day. SEAI grant of &euro;1,800 handled entirely by our team.</p>
                    </div>
                  </div>
                  <div className={styles.benefitCard}>
                    <div className={styles.benefitIcon}>
                      <GiftIcon />
                    </div>
                    <div>
                      <h3>&euro;200 Referral Discount</h3>
                      <p>Exclusive &euro;200 discount on your installation as a referral. Plus your friend earns &euro;200 too.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Discount Callout */}
            <section className={styles.discountCallout} aria-label="Referral discount amount">
              <div className={styles.container}>
                <div className={styles.discountAmount}>
                  &euro;200<span> discount</span>
                </div>
                <p className={styles.discountLabel}>
                  Applied automatically when you request a quote using this referral link
                </p>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={handleGetQuote}
                >
                  Claim Your &euro;200 Discount
                </button>
              </div>
            </section>

            {/* CTA */}
            <section className={styles.ctaSection} aria-labelledby="cta-heading">
              <div className={styles.container}>
                <h2 id="cta-heading">Ready to Go Solar?</h2>
                <p>
                  Get your free, no-obligation solar savings estimate.
                  Our SEAI-certified surveyor will assess your home and provide a tailored system design.
                </p>
                <a href="tel:+353873958424" className={styles.ctaPhone}>
                  087 395 8424
                </a>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={handleGetQuote}
                  >
                    Get Free Quote
                  </button>
                  <a href="/" className={`${styles.btn} ${styles.btnSecondary}`}>
                    Explore Services
                  </a>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ===== LOADING STATE ===== */}
        {isValid === null && (
          <section className={styles.errorSection}>
            <div className={styles.container}>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
                <div className={styles.spinner} style={{ width: 40, height: 40, borderWidth: 3 }} />
              </div>
              <p style={{ color: '#888888' }}>Validating your referral code...</p>
            </div>
          </section>
        )}

        {/* ===== INVALID STATE ===== */}
        {isValid === false && (
          <section className={styles.errorSection}>
            <div className={styles.container}>
              <h1>Referral Link Not Recognised</h1>
              <p>
                We couldn&apos;t find a referral associated with this code.
                The link may have expired or been entered incorrectly.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/" className={`${styles.btn} ${styles.btnPrimary}`}>
                  Visit Renewable Ireland
                </a>
                <a href="/referral" className={`${styles.btn} ${styles.btnSecondary}`}>
                  Get Your Own Referral Link
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerInner}>
          <a href="/" className={styles.footerLogo}>
            Renewable<span>Ireland</span>
          </a>
          <p className={styles.footerTagline}>
            Ireland&apos;s most trusted solar panel installer. SEAI registered, fully insured.
          </p>
          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} Renewable Ireland. All rights reserved.</p>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
