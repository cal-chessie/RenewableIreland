'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { Metadata } from 'next';
import styles from './referral.module.css';

/* ===== SVG Icons ===== */
const LinkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const CopyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className={styles.shareIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className={styles.shareIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className={styles.shareIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const EmailIcon = () => (
  <svg className={styles.shareIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

/* ===== QR Code Generator (SVG) ===== */
function generateQRSVG(url: string): string {
  // Simple deterministic QR-like pattern based on URL hash
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }

  const size = 21;
  const cellSize = 8;
  const margin = 16;
  const totalSize = size * cellSize + margin * 2;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalSize}" height="${totalSize}" viewBox="0 0 ${totalSize} ${totalSize}">`;
  svg += `<rect width="${totalSize}" height="${totalSize}" fill="#ffffff"/>`;

  // Position detection patterns (3 corners)
  function drawFinder(cx: number, cy: number) {
    const s = cellSize;
    const x = margin + cx * s;
    const y = margin + cy * s;
    svg += `<rect x="${x}" y="${y}" width="${7*s}" height="${7*s}" fill="#050505"/>`;
    svg += `<rect x="${x+s}" y="${y+s}" width="${5*s}" height="${5*s}" fill="#ffffff"/>`;
    svg += `<rect x="${x+2*s}" y="${y+2*s}" width="${3*s}" height="${3*s}" fill="#050505"/>`;
  }

  drawFinder(0, 0);
  drawFinder(14, 0);
  drawFinder(0, 14);

  // Data pattern (deterministic from hash)
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      // Skip finder pattern areas
      if ((row < 8 && col < 8) || (row < 8 && col > 12) || (row > 12 && col < 8)) continue;

      const val = Math.abs(hash * (row + 1) * (col + 1) + row * 31 + col * 17) % 3;
      if (val === 0) {
        const x = margin + col * cellSize;
        const y = margin + row * cellSize;
        svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#050505"/>`;
      }
    }
  }

  svg += '</svg>';
  return svg;
}

/* ===== MAIN COMPONENT ===== */
export default function ReferralPage() {
  const [nameInput, setNameInput] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [generatedName, setGeneratedName] = useState('');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [shareCopyFeedback, setShareCopyFeedback] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Tracker state
  const [trackCode, setTrackCode] = useState('');
  const [trackerResult, setTrackerResult] = useState<{
    clicks: number; quotes: number; installs: number; rewardTotal: number; name: string;
  } | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [trackNotFound, setTrackNotFound] = useState(false);

  // Terms state
  const [termsOpen, setTermsOpen] = useState(false);
  const termsContentRef = useRef<HTMLDivElement>(null);

  const resultRef = useRef<HTMLDivElement>(null);
  const trackerResultRef = useRef<HTMLDivElement>(null);

  /* ===== Handlers ===== */
  const handleGenerate = useCallback(async () => {
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setError('Please enter your name');
      return;
    }
    setError('');
    setIsGenerating(true);

    try {
      const res = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate', name: trimmed }),
      });
      const data = await res.json();

      if (data.success) {
        setGeneratedCode(data.code);
        setGeneratedUrl(data.url);
        setGeneratedName(data.name);
        setCopyFeedback(false);

        // Scroll to result
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [nameInput]);

  const handleCopy = useCallback(async () => {
    if (!generatedUrl) return;
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = generatedUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    }
  }, [generatedUrl]);

  const handleShareCopy = useCallback(async () => {
    if (!generatedUrl) return;
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setShareCopyFeedback(true);
      setTimeout(() => setShareCopyFeedback(false), 2500);
    } catch {
      setShareCopyFeedback(true);
      setTimeout(() => setShareCopyFeedback(false), 2500);
    }
  }, [generatedUrl]);

  const handleTrack = useCallback(async () => {
    const trimmed = trackCode.trim();
    if (!trimmed) return;
    setIsTracking(true);
    setTrackNotFound(false);
    setTrackerResult(null);

    try {
      const res = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'track', code: trimmed }),
      });
      const data = await res.json();

      if (data.success && data.found) {
        setTrackerResult({
          clicks: data.data.clicks,
          quotes: data.data.quotes,
          installs: data.data.installs,
          rewardTotal: data.data.rewardTotal,
          name: data.data.name,
        });
        setTimeout(() => {
          trackerResultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        setTrackNotFound(true);
      }
    } catch {
      setTrackNotFound(true);
    } finally {
      setIsTracking(false);
    }
  }, [trackCode]);

  const handleToggleTerms = useCallback(() => {
    setTermsOpen(prev => {
      const next = !prev;
      setTimeout(() => {
        if (termsContentRef.current) {
          termsContentRef.current.style.maxHeight = next
            ? termsContentRef.current.scrollHeight + 'px'
            : '0';
        }
      }, 10);
      return next;
    });
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, handler: () => void) => {
    if (e.key === 'Enter') handler();
  }, []);

  // Share URLs
  const whatsappUrl = generatedUrl
    ? `https://wa.me/?text=${encodeURIComponent(`Hey! I'm going solar with Renewable Ireland. Use my link for €200 off your installation: ${generatedUrl}`)}`
    : '#';

  const facebookUrl = generatedUrl
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatedUrl)}`
    : '#';

  const twitterUrl = generatedUrl
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I'm going solar with @RenewableIreland! Use my link for €200 off: ${generatedUrl}`)}&url=${encodeURIComponent(generatedUrl)}`
    : '#';

  const emailUrl = generatedUrl
    ? `mailto:?subject=${encodeURIComponent('€200 off your solar installation with Renewable Ireland')}&body=${encodeURIComponent(`Hey!\n\nI'm going solar with Renewable Ireland. They're Ireland's most trusted solar installer with 2,847+ installations and a 4.9★ rating.\n\nUse my referral link to get €200 off your solar panel installation:\n\n${generatedUrl}\n\nLet's go solar together! 🌞`)}`
    : '#';

  // QR Code
  const qrSvg = generatedUrl ? generateQRSVG(generatedUrl) : '';

  // Body scroll lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <div className={styles.referralPage}>
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
          <div className={styles.navLinks}>
            <a href="/">Home</a>
            <a href="/#features">Why Us</a>
            <a href="/#calculator">Savings</a>
            <a href="/#faq">FAQ</a>
            <a href="tel:+353873958424" className={styles.navCta}>Get Free Quote</a>
          </div>
          <button
            className={styles.hamburger}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen(prev => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div
          className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}
          id="mobile-menu"
          role="menu"
          aria-hidden={!mobileMenuOpen}
        >
          <a href="/" role="menuitem" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="/#features" role="menuitem" onClick={() => setMobileMenuOpen(false)}>Why Us</a>
          <a href="/#calculator" role="menuitem" onClick={() => setMobileMenuOpen(false)}>Savings</a>
          <a href="/#faq" role="menuitem" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <a
            href="tel:+353873958424"
            className={styles.btnPrimary}
            role="menuitem"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '12px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none' }}
          >
            Get Free Quote
          </a>
        </div>
      </header>

      <main id="main-content">
        {/* ===== HERO ===== */}
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={styles.container}>
            <div className={styles.heroBadge}>Referral Programme</div>
            <h1 id="hero-heading">
              Share Solar.{' '}
              <span className={styles.heroHighlight}>Earn Rewards.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Refer a friend to Renewable Ireland and you&apos;ll both benefit.
              They get &euro;200 off their solar installation, and you get a &euro;200 thank-you reward.
            </p>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="how-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>How It Works</div>
              <h2 id="how-heading">Three Simple Steps</h2>
              <p>Sharing solar savings with friends has never been easier.</p>
            </div>
            <div className={styles.stepsGrid}>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>1</div>
                <h3>Share Your Link</h3>
                <p>Your unique referral link is generated automatically. Share it via WhatsApp, email, or social media.</p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>2</div>
                <h3>They Get a Quote</h3>
                <p>When your friend uses your link and requests a solar panel quote, the referral is tracked automatically.</p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>3</div>
                <h3>You Both Win</h3>
                <p>They save &euro;200 on their solar installation, and you earn a &euro;200 thank-you reward. Everyone benefits.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== REFERRAL LINK GENERATOR ===== */}
        <section className={styles.section} aria-labelledby="generate-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>Get Your Link</div>
              <h2 id="generate-heading">Generate Your Referral Link</h2>
              <p>Enter your name and we&apos;ll create your unique referral link instantly.</p>
            </div>
            <div className={styles.linkGeneratorCard}>
              <div className={styles.linkGeneratorForm}>
                <input
                  type="text"
                  placeholder="Enter your name to generate your referral link"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  onKeyDown={e => handleKeyDown(e, handleGenerate)}
                  aria-label="Your name"
                  maxLength={50}
                />
                <button
                  className={styles.btnPrimary}
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  style={{
                    padding: '14px 28px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: isGenerating ? 'wait' : 'pointer',
                    opacity: isGenerating ? 0.7 : 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap',
                    border: 'none',
                    background: '#c8ff00',
                    color: '#050505',
                    minWidth: '140px',
                    justifyContent: 'center',
                  }}
                >
                  {isGenerating ? (
                    <>
                      <span className={styles.spinner} />
                      Generating...
                    </>
                  ) : (
                    <>
                      <LinkIcon />
                      Generate Link
                    </>
                  )}
                </button>
              </div>

              {error && (
                <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '12px' }}>
                  {error}
                </p>
              )}

              {/* Generated Result */}
              <div
                ref={resultRef}
                className={`${styles.generatedResult} ${generatedCode ? styles.active : ''}`}
              >
                <p style={{ color: '#bbbbbb', fontSize: '0.85rem', marginBottom: '8px' }}>
                  Your unique referral link for <strong style={{ color: '#f0f0f0' }}>{generatedName}</strong>:
                </p>
                <div className={styles.generatedUrl}>
                  {generatedUrl}
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button
                    className={`${styles.copyButton} ${copyFeedback ? styles.copied : ''}`}
                    onClick={handleCopy}
                    aria-label="Copy referral link to clipboard"
                  >
                    {copyFeedback ? (
                      <>
                        <CheckIcon />
                        Copied!
                      </>
                    ) : (
                      <>
                        <CopyIcon />
                        Copy Link
                      </>
                    )}
                  </button>
                </div>

                {/* QR Code */}
                <div className={styles.qrSection}>
                  <p className={styles.qrLabel}>Or scan this QR code:</p>
                  <div
                    className={styles.qrCode}
                    dangerouslySetInnerHTML={{ __html: qrSvg }}
                    aria-label={`QR code for ${generatedUrl}`}
                  />
                </div>

                {/* Share Buttons */}
                <div className={styles.shareGrid}>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.shareButton} ${styles.shareWhatsapp}`}
                    aria-label="Share on WhatsApp"
                  >
                    <WhatsAppIcon />
                    WhatsApp
                  </a>
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.shareButton} ${styles.shareFacebook}`}
                    aria-label="Share on Facebook"
                  >
                    <FacebookIcon />
                    Facebook
                  </a>
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.shareButton} ${styles.shareTwitter}`}
                    aria-label="Share on X / Twitter"
                  >
                    <TwitterIcon />
                    X / Twitter
                  </a>
                  <a
                    href={emailUrl}
                    className={`${styles.shareButton} ${styles.shareEmail}`}
                    aria-label="Share via email"
                  >
                    <EmailIcon />
                    Email
                  </a>
                  <button
                    className={`${styles.shareButton} ${styles.shareCopy} ${shareCopyFeedback ? styles.copied : ''}`}
                    onClick={handleShareCopy}
                    aria-label="Copy link"
                  >
                    <CopyIcon />
                    {shareCopyFeedback ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== REFERRAL TRACKER ===== */}
        <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="track-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>Track Progress</div>
              <h2 id="track-heading">Check Your Referral Status</h2>
              <p>Enter your referral code to see how many people have clicked, requested quotes, and gone solar.</p>
            </div>
            <div className={styles.trackerCard}>
              <div className={styles.trackerForm}>
                <input
                  type="text"
                  placeholder="Enter your referral code (e.g. RI-JOHN-8X4K)"
                  value={trackCode}
                  onChange={e => setTrackCode(e.target.value.toUpperCase())}
                  onKeyDown={e => handleKeyDown(e, handleTrack)}
                  aria-label="Referral code"
                  maxLength={20}
                />
                <button
                  className={styles.btnPrimary}
                  onClick={handleTrack}
                  disabled={isTracking}
                  style={{
                    padding: '14px 28px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: isTracking ? 'wait' : 'pointer',
                    opacity: isTracking ? 0.7 : 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap',
                    border: 'none',
                    background: '#c8ff00',
                    color: '#050505',
                    minWidth: '130px',
                    justifyContent: 'center',
                  }}
                >
                  {isTracking ? (
                    <>
                      <span className={styles.spinner} />
                      Tracking...
                    </>
                  ) : (
                    <>
                      <SearchIcon />
                      Track
                    </>
                  )}
                </button>
              </div>

              <div
                ref={trackerResultRef}
                className={`${styles.trackerResult} ${trackerResult ? styles.active : ''}`}
              >
                <p style={{ color: '#bbbbbb', fontSize: '0.9rem', marginBottom: '4px' }}>
                  Referral stats for <strong style={{ color: '#f0f0f0' }}>{trackerResult?.name}</strong>:
                </p>
                <div className={styles.trackerStats}>
                  <div className={styles.trackerStat}>
                    <div className={styles.trackerStatValue}>{trackerResult?.clicks ?? 0}</div>
                    <div className={styles.trackerStatLabel}>Link Clicks</div>
                  </div>
                  <div className={styles.trackerStat}>
                    <div className={styles.trackerStatValue}>{trackerResult?.quotes ?? 0}</div>
                    <div className={styles.trackerStatLabel}>Quotes</div>
                  </div>
                  <div className={styles.trackerStat}>
                    <div className={styles.trackerStatValue}>{trackerResult?.installs ?? 0}</div>
                    <div className={styles.trackerStatLabel}>Installs</div>
                  </div>
                  <div className={styles.trackerStat}>
                    <div className={styles.trackerStatValue}>&euro;{trackerResult?.rewardTotal ?? 0}</div>
                    <div className={styles.trackerStatLabel}>Rewards</div>
                  </div>
                </div>
              </div>

              {trackNotFound && (
                <div className={styles.trackerNotFound}>
                  Referral code not found. Please check the code and try again, or generate a new link above.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ===== TERMS & CONDITIONS ===== */}
        <section className={styles.section} aria-labelledby="terms-heading">
          <div className={styles.container}>
            <div className={styles.termsCard}>
              <button
                className={`${styles.termsToggle} ${termsOpen ? styles.termsToggleActive : ''}`}
                onClick={handleToggleTerms}
                aria-expanded={termsOpen}
                aria-controls="terms-content"
                id="terms-heading"
              >
                Terms &amp; Conditions
                <span className={styles.termsIcon}>+</span>
              </button>
              <div
                id="terms-content"
                ref={termsContentRef}
                className={styles.termsContent}
                role="region"
                aria-labelledby="terms-heading"
              >
                <div className={styles.termsContentInner}>
                  <h4>Referral Reward</h4>
                  <ul>
                    <li>Both the referrer and the referred customer receive a &euro;200 reward.</li>
                    <li>The referred customer&apos;s &euro;200 discount is applied directly to their solar installation invoice.</li>
                    <li>The referrer&apos;s &euro;200 reward is paid via bank transfer within 30 days of the referred customer&apos;s installation completion.</li>
                  </ul>

                  <h4>Eligibility</h4>
                  <ul>
                    <li>The referral code must be used by the referred customer when requesting a quote.</li>
                    <li>The referred customer must be a new customer who has not previously contacted Renewable Ireland.</li>
                    <li>The referred customer must complete a solar panel installation (minimum 4kWp system) for both parties to receive the reward.</li>
                    <li>There is no limit to the number of referrals a customer can make.</li>
                  </ul>

                  <h4>Tracking &amp; Payment</h4>
                  <ul>
                    <li>Referral links and codes are tracked automatically when used to visit our website.</li>
                    <li>The referral code must be entered or the referral link must be used before requesting a quote for the referral to be valid.</li>
                    <li>Rewards are processed once the installation is fully completed and paid for.</li>
                    <li>Renewable Ireland reserves the right to modify or terminate this programme at any time.</li>
                  </ul>

                  <h4>General</h4>
                  <ul>
                    <li>This referral programme is only available to residential customers in the Republic of Ireland.</li>
                    <li>Referral rewards cannot be exchanged for cash alternatives.</li>
                    <li>Referral rewards are not transferable.</li>
                    <li>Renewable Ireland&apos;s standard terms and conditions also apply.</li>
                    <li>For questions about the referral programme, please contact hello@renewableireland.ie or call 087 395 8424.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <a href="/" className={styles.footerLogo}>
              Renewable<span>Ireland</span>
            </a>
            <p className={styles.footerTagline}>
              Ireland&apos;s most trusted solar panel installer. SEAI registered, fully insured, 2,847+ installations nationwide.
            </p>
          </div>
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
