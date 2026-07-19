'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import './exit-intent.css';

// ─── Types ──────────────────────────────────────────────
type Variant = 'A' | 'B' | 'C';

interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
}

// ─── Constants ──────────────────────────────────────────
const SESSION_KEY = 'exit-intent-shown';
const LEAD_KEY = 'lead-submitted';
const MIN_ENGAGEMENT_MS = 15000; // 15 seconds
const MIN_SCROLL_PERCENT = 50;
const SCROLL_VELOCITY_THRESHOLD = -3; // px/ms (negative = scrolling up fast)
const MOBILE_CHECK_INTERVAL = 300;

const VARIANTS: Variant[] = ['A', 'B', 'C'];

// ─── Utility: Pick a random variant (A/B test weighted) ──
function pickVariant(): Variant {
  const idx = Math.floor(Math.random() * VARIANTS.length);
  return VARIANTS[idx];
}

// ─── Utility: Format countdown ──────────────────────────
function formatCountdown(totalSeconds: number): CountdownTime {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return { hours: h, minutes: m, seconds: s };
}

function padZero(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

// ─── SVG Icons ──────────────────────────────────────────
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

// ─── Component ──────────────────────────────────────────
export default function ExitIntentOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [variant, setVariant] = useState<Variant | null>(null);
  const [countdown, setCountdown] = useState(86347); // ~23:59:07
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successEmail, setSuccessEmail] = useState('');

  const hasTriggered = useRef(false);
  const sessionStart = useRef(Date.now());
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Check engagement thresholds ──────────────────────
  const isEngaged = useCallback((): boolean => {
    const elapsed = Date.now() - sessionStart.current;
    if (elapsed < MIN_ENGAGEMENT_MS) return false;

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return elapsed >= MIN_ENGAGEMENT_MS;
    const scrollPercent = (window.scrollY / docHeight) * 100;
    return scrollPercent >= MIN_SCROLL_PERCENT;
  }, []);

  // ─── Can we trigger? ──────────────────────────────────
  const canTrigger = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    if (hasTriggered.current) return false;
    if (sessionStorage.getItem(SESSION_KEY)) return false;
    if (sessionStorage.getItem(LEAD_KEY)) return false;
    if (!isEngaged()) return false;
    return true;
  }, [isEngaged]);

  // ─── Show popup ───────────────────────────────────────
  const showPopup = useCallback(() => {
    if (!canTrigger()) return;
    hasTriggered.current = true;
    setVariant(pickVariant());
    setIsVisible(true);
    document.body.style.overflow = 'hidden';
  }, [canTrigger]);

  // ─── Close popup ──────────────────────────────────────
  const closePopup = useCallback(() => {
    setIsClosing(true);
    document.body.style.overflow = '';
    sessionStorage.setItem(SESSION_KEY, 'true');

    // Track dismissal
    if (typeof window !== 'undefined') {
      fetch('/api/exit-intent/dismiss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variant, timestamp: Date.now() }),
      }).catch(() => {});
    }

    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      setVariant(null);
      setShowForm(false);
      setFormName('');
      setFormEmail('');
      setFormErrors({});
      setIsSuccess(false);
      setSuccessEmail('');
    }, 200);
  }, [variant]);

  // ─── Countdown timer ──────────────────────────────────
  useEffect(() => {
    if (isVisible && variant === 'A' && !isClosing) {
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownRef.current) clearInterval(countdownRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [isVisible, variant, isClosing]);

  // ─── Desktop: mouseleave detection ────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [showPopup]);

  // ─── Mobile: scroll velocity + back button ────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let mobileCheckId: ReturnType<typeof setInterval>;

    // Scroll velocity check (runs periodically)
    mobileCheckId = setInterval(() => {
      const currentY = window.scrollY;
      const currentTime = Date.now();
      const deltaY = currentY - lastScrollY.current;
      const deltaTime = currentTime - lastScrollTime.current;

      if (deltaTime > 0 && deltaY < 0) {
        // Scrolling up
        const velocity = deltaY / deltaTime; // negative when scrolling up
        if (velocity < SCROLL_VELOCITY_THRESHOLD) {
          showPopup();
        }
      }

      lastScrollY.current = currentY;
      lastScrollTime.current = currentTime;
    }, MOBILE_CHECK_INTERVAL);

    // Back button / navigation away detection
    const handlePopState = () => {
      showPopup();
    };

    // Visibility change — tab switching
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && isEngaged()) {
        // Small delay to detect actual tab close vs switch
        setTimeout(() => {
          if (document.visibilityState === 'hidden') {
            showPopup();
          }
        }, 300);
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(mobileCheckId);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [showPopup, isEngaged]);

  // ─── Escape key handler ───────────────────────────────
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closePopup();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, closePopup]);

  // ─── CTA Handlers ─────────────────────────────────────
  const handleCTA = useCallback(() => {
    if (variant === 'C') {
      setShowForm(true);
    } else {
      // Open lead flow
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('open-lead-flow'));
        closePopup();
      }
    }
  }, [variant, closePopup]);

  // ─── Form submission ──────────────────────────────────
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; email?: string } = {};

    if (!formName.trim() || formName.trim().length < 2) {
      errors.name = 'Please enter your name (at least 2 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formEmail.trim() || !emailRegex.test(formEmail.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/exit-intent/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formName.trim(), email: formEmail.trim() }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setSuccessEmail(formEmail.trim());
        sessionStorage.setItem(LEAD_KEY, 'true');
      } else {
        setFormErrors({ email: 'Something went wrong. Please try again.' });
      }
    } catch {
      setFormErrors({ email: 'Network error. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formName, formEmail]);

  // ─── Don't render if not visible ──────────────────────
  if (!isVisible || !variant) return null;

  const time = formatCountdown(countdown);

  return (
    <div
      className={`exit-overlay ${isClosing ? 'closing' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closePopup();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Special offer"
      aria-describedby="exit-description"
    >
      <div className={`exit-card ${isClosing ? 'closing' : ''}`}>
        {/* Close button */}
        <button
          className="exit-close"
          onClick={closePopup}
          aria-label="Close popup"
        >
          <CloseIcon />
        </button>

        <div className="exit-content">
          {/* ─── VARIANT A: Countdown Timer ─── */}
          {variant === 'A' && !showForm && (
            <div>
              <span className="exit-emoji" aria-hidden="true">⏰</span>
              <h2 className="exit-title">
                Your <span className="accent">€1,800 SEAI Grant</span>
              </h2>
              <p className="exit-subtitle">
                Estimate Expires In:
              </p>

              <div className="exit-countdown-wrap">
                <div className="exit-countdown">
                  <div className="exit-countdown-group">
                    <span className="exit-countdown-digit">{padZero(time.hours)}</span>
                    <span className="exit-countdown-label">Hours</span>
                  </div>
                  <span className="exit-countdown-sep">:</span>
                  <div className="exit-countdown-group">
                    <span className="exit-countdown-digit">{padZero(time.minutes)}</span>
                    <span className="exit-countdown-label">Mins</span>
                  </div>
                  <span className="exit-countdown-sep">:</span>
                  <div className="exit-countdown-group">
                    <span className="exit-countdown-digit">{padZero(time.seconds)}</span>
                    <span className="exit-countdown-label">Secs</span>
                  </div>
                </div>
              </div>

              <div className="exit-urgency-bar">
                <span className="exit-urgency-dot" />
                2,847+ homeowners claimed this grant in 2025
              </div>

              <p className="exit-subtitle" id="exit-description">
                Don&apos;t miss out on the government grant. Lock in your free
                quote before the deadline.
              </p>

              <button className="exit-cta" onClick={handleCTA}>
                <LockIcon />
                Claim My Free Quote Now
              </button>

              <button className="exit-dismiss" onClick={closePopup}>
                No thanks, I like paying full price
              </button>

              <div className="exit-privacy">
                <ShieldIcon />
                Your data is safe. We never share your information.
              </div>
            </div>
          )}

          {/* ─── VARIANT B: Personalised Deal ─── */}
          {variant === 'B' && !showForm && (
            <div>
              <span className="exit-emoji" aria-hidden="true">☀️</span>
              <h2 className="exit-title">
                Wait — We Have Something{' '}
                <span className="accent">Special</span> For You
              </h2>
              <p className="exit-subtitle">
                Based on your interest in solar panels, we&apos;re offering:
              </p>

              <div className="exit-benefits">
                <div className="exit-benefit">
                  <div className="exit-benefit-icon">✓</div>
                  <div className="exit-benefit-text">
                    <strong>Free roof survey</strong> (worth €250)
                  </div>
                </div>
                <div className="exit-benefit">
                  <div className="exit-benefit-icon">✓</div>
                  <div className="exit-benefit-text">
                    System design &amp; 3D rendering
                  </div>
                </div>
                <div className="exit-benefit">
                  <div className="exit-benefit-icon">✓</div>
                  <div className="exit-benefit-text">
                    Grant application handled
                  </div>
                </div>
                <div className="exit-benefit">
                  <div className="exit-benefit-icon">✓</div>
                  <div className="exit-benefit-text">
                    Monitoring app included
                  </div>
                </div>
              </div>

              <div className="exit-total-value">
                <span className="exit-total-label">Total Value: €1,450 —</span>
                <span className="exit-total-free">FREE</span>
              </div>

              <p className="exit-subtitle" id="exit-description">
                Everything you need to go solar, completely free. Book your
                survey today.
              </p>

              <button className="exit-cta" onClick={handleCTA}>
                <CheckIcon />
                Yes, Book My Free Survey
              </button>

              <button className="exit-dismiss" onClick={closePopup}>
                No thanks, I&apos;ll pay full price
              </button>

              <div className="exit-privacy">
                <ShieldIcon />
                Your data is safe. We never share your information.
              </div>
            </div>
          )}

          {/* ─── VARIANT C: Lead Magnet (initial view) ─── */}
          {variant === 'C' && !showForm && !isSuccess && (
            <div>
              <span className="exit-emoji" aria-hidden="true">📄</span>
              <h2 className="exit-title">
                <span className="accent">FREE</span> Download
              </h2>

              <div className="exit-guide-visual">
                <div className="exit-guide-icon">📖</div>
                <div>
                  <div className="exit-guide-title">
                    &quot;The Complete Guide to Solar Panels in Ireland 2026&quot;
                  </div>
                  <div className="exit-guide-meta">PDF • 32 pages • Updated Jan 2026</div>
                </div>
              </div>

              <p className="exit-subtitle" id="exit-description">
                Inside you&apos;ll discover:
              </p>

              <div className="exit-guide-list">
                <div className="exit-guide-item">
                  <span className="exit-guide-bullet">•</span>
                  Exact costs for every system size
                </div>
                <div className="exit-guide-item">
                  <span className="exit-guide-bullet">•</span>
                  SEAI grant eligibility guide
                </div>
                <div className="exit-guide-item">
                  <span className="exit-guide-bullet">•</span>
                  County-by-county generation data
                </div>
                <div className="exit-guide-item">
                  <span className="exit-guide-bullet">•</span>
                  Real customer ROI calculations
                </div>
                <div className="exit-guide-item">
                  <span className="exit-guide-bullet">•</span>
                  2026 grant changes explained
                </div>
              </div>

              <button className="exit-cta" onClick={handleCTA}>
                📥 Send Me The Free Guide
              </button>

              <button className="exit-dismiss" onClick={closePopup}>
                No thanks, I already know everything
              </button>

              <div className="exit-privacy">
                <ShieldIcon />
                Your data is safe. We never share your information.
              </div>
            </div>
          )}

          {/* ─── VARIANT C: Lead Magnet Form ─── */}
          {variant === 'C' && showForm && !isSuccess && (
            <div className="exit-form">
              <h2 className="exit-title">
                Get Your <span className="accent">Free Guide</span>
              </h2>
              <p className="exit-subtitle">
                Enter your details below and we&apos;ll send the guide straight to
                your inbox.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="exit-form-group">
                  <label htmlFor="exit-name" className="exit-form-label">
                    Your Name
                  </label>
                  <input
                    id="exit-name"
                    type="text"
                    className={`exit-form-input ${formErrors.name ? 'error' : ''}`}
                    placeholder="e.g. John Murphy"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    autoComplete="given-name"
                  />
                  {formErrors.name && (
                    <div className="exit-form-error">{formErrors.name}</div>
                  )}
                </div>

                <div className="exit-form-group">
                  <label htmlFor="exit-email" className="exit-form-label">
                    Email Address
                  </label>
                  <input
                    id="exit-email"
                    type="email"
                    className={`exit-form-input ${formErrors.email ? 'error' : ''}`}
                    placeholder="john@example.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    autoComplete="email"
                  />
                  {formErrors.email && (
                    <div className="exit-form-error">{formErrors.email}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className={`exit-cta ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  📥 Send Me The Free Guide
                </button>

                <button
                  type="button"
                  className="exit-dismiss"
                  onClick={closePopup}
                >
                  No thanks, I already know everything
                </button>

                <div className="exit-privacy">
                  <ShieldIcon />
                  We respect your privacy. Unsubscribe anytime.
                </div>
              </form>
            </div>
          )}

          {/* ─── VARIANT C: Success State ─── */}
          {variant === 'C' && isSuccess && (
            <div className="exit-success">
              <div className="exit-success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="exit-success-title">Check your email!</h2>
              <p className="exit-success-message">
                We&apos;ve sent the guide to{' '}
                <span className="exit-success-email">{successEmail}</span>.
                Check your inbox (and spam folder) within the next few minutes.
              </p>
              <button className="exit-dismiss" onClick={closePopup} style={{ marginTop: 24 }}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
