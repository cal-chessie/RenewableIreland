'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/* ===== FAQ DATA ===== */
const faqData = [
  {
    id: 1,
    question: 'How much do solar panels cost in Ireland?',
    answer:
      'Solar panel systems in Ireland typically cost between €4,500 and €6,500 for a residential installation after the SEAI grant of €1,800. A 4kWp system starts at around €4,500, a 6kWp system costs approximately €5,500, and an 8kWp system with battery storage is around €6,500. These prices include installation, mounting, inverter, and all necessary components. At Renewable Ireland, the price we quote is the price you pay — no hidden fees, no surprises.',
  },
  {
    id: 2,
    question: 'How much is the SEAI grant for solar panels?',
    answer:
      'The SEAI (Sustainable Energy Authority of Ireland) offers a grant of €1,800 for solar photovoltaic (PV) panel installations on homes built before 2021. The grant covers systems up to 4kWp in size. Renewable Ireland handles the entire grant application process on your behalf, so you receive the grant directly as a discount on your installation cost. There are no complex forms for you to fill out — we manage everything.',
  },
  {
    id: 3,
    question: 'Do solar panels work in Irish weather?',
    answer:
      'Yes, absolutely. Solar panels work very effectively in Irish weather. Modern solar panels generate electricity from daylight, not direct sunlight. Ireland receives approximately 1,000 to 1,200 kWh per square metre of solar irradiance annually. While Ireland has more cloudy days than southern Europe, solar panels still produce 70-80% of their rated capacity even on overcast days. Germany, which has similar weather to Ireland, is one of the world\'s largest solar markets with over 80 GW installed.',
  },
  {
    id: 4,
    question: 'How long does a solar panel installation take?',
    answer:
      'Renewable Ireland completes most residential solar panel installations in just one day. The scaffolding is erected in the morning, panels are mounted by midday, and the electrical connection and commissioning are completed by late afternoon. The entire SEAI grant application and initial survey process typically takes 1-2 weeks before the installation date. We respect your time and your home.',
  },
  {
    id: 5,
    question: 'What warranty do you offer on solar panels?',
    answer:
      'Renewable Ireland offers a comprehensive warranty package: 25-year manufacturer warranty on solar panels guaranteeing at least 80% output at year 25, a 10-year workmanship guarantee covering all installation work, and a 10-year inverter warranty. We also offer an optional extended warranty for an additional 5 years on the inverter. This is one of the most comprehensive warranty packages available in the Irish market.',
  },
  {
    id: 6,
    question: 'How much money will I save with solar panels?',
    answer:
      'Typical savings range from €800 to €1,400 per year depending on your system size, electricity consumption, and whether you have battery storage. A 6kWp system can generate approximately 5,000-5,500 kWh per year in Ireland. With the current average electricity rate and the export tariff of 21c per kWh, most homeowners see a full return on investment within 5-7 years. Use our savings calculator above for a personalised estimate.',
  },
  {
    id: 7,
    question: 'Do I need planning permission for solar panels?',
    answer:
      'In most cases, no planning permission is required. Solar panel installations on domestic dwellings are considered exempted development under Irish planning law, provided certain conditions are met: panels must not extend beyond the roof plane, total area must not exceed 50% of the roof area, and the installation must be at least 1 metre from any roof edge. Our surveyor will confirm your property meets these requirements during the free site survey.',
  },
  {
    id: 8,
    question: 'Is battery storage worth it?',
    answer:
      'Battery storage can increase your solar savings by 20-30% by storing excess daytime generation for evening and night use. A 5kWh battery typically costs an additional €2,000-€3,500. It\'s most worthwhile if you\'re out during the day, have high evening electricity usage, or want energy independence. All Renewable Ireland systems are battery-ready, so you can add storage at any time without replacing your existing equipment.',
  },
  {
    id: 9,
    question: 'What size solar system do I need?',
    answer:
      'The ideal system size depends on your roof space, electricity consumption, and budget. For an average Irish 3-bedroom home consuming 4,200 kWh annually, a 6kWp (14-panel) system is typically recommended. Smaller homes may suit a 4kWp system, while larger homes may benefit from 8-10kWp. Our SEAI-certified surveyor will assess your property during the free survey and recommend the optimal system size for your specific needs.',
  },
  {
    id: 10,
    question: 'Can I sell excess solar energy back to the grid?',
    answer:
      'Yes. Through the Clean Export Guarantee (CEG) scheme, you can sell excess solar energy back to the grid at approximately 21 cents per kWh. Most major electricity suppliers offer this tariff. Renewable Ireland will help you register with your supplier for the export tariff, which provides an additional income stream and improves your overall return on investment. This turns your home into a mini power station.',
  },
  {
    id: 11,
    question: 'How do I apply for the SEAI grant?',
    answer:
      'With Renewable Ireland, you don\'t need to worry about the application. We handle the entire process: completing the application, submitting documentation, and managing communication with SEAI. You simply provide your MPRN number (found on your electricity bill), your Eircode, and some basic property information. The grant is deducted from your installation cost so you benefit immediately.',
  },
  {
    id: 12,
    question: 'Will solar panels damage my roof?',
    answer:
      'No. When professionally installed, solar panels will not damage your roof. Renewable Ireland uses roof-specific mounting systems that attach to the roof rafters, not just the tiles. All installations include a roof inspection and structural assessment. Our 10-year workmanship guarantee covers any installation-related issues, including roof integrity. In fact, solar panels can actually protect the portion of roof they cover.',
  },
  {
    id: 13,
    question: 'How long do solar panels last?',
    answer:
      'Modern solar panels are designed to last 25-30 years or longer. The industry standard warranty guarantees at least 80% of the panel\'s original output at 25 years. Many panels continue producing electricity well beyond 30 years. Inverters typically last 10-15 years and may need one replacement during the system\'s lifetime. The system as a whole requires virtually no maintenance.',
  },
  {
    id: 14,
    question: 'What areas in Ireland do you cover?',
    answer:
      'Renewable Ireland installs solar panels across 15+ counties including Dublin, Cork, Galway, Limerick, Waterford, Kildare, Meath, Wicklow, Wexford, Kilkenny, Tipperary, Clare, Louth, Westmeath, Carlow, and Kerry. We have regional installation teams to ensure quick response times and maintain our 1-day installation standard across our entire coverage area. Contact us to confirm availability in your specific area.',
  },
  {
    id: 15,
    question: 'What brands of solar panels do you install?',
    answer:
      'We install premium Tier 1 solar panels from leading manufacturers including Jinko Solar, Trina Solar, and LONGi Solar. These are among the most efficient and reliable panels on the market with proven performance in European climates. We pair them with industry-leading inverters from SMA, Fronius, and Huawei. All equipment is rigorously tested and backed by comprehensive manufacturer warranties.',
  },
  {
    id: 16,
    question: 'Do solar panels require maintenance?',
    answer:
      'Very minimal maintenance is required. In Ireland, natural rainfall is usually sufficient to keep panels clean and performing optimally. We recommend an annual visual inspection to check for any debris or shading issues. The inverter should be checked periodically. Renewable Ireland includes a monitoring system with every installation so you can track performance and identify any issues early via your project portal or app.',
  },
];

/* ===== HELPER FUNCTIONS ===== */
function sanitizeInput(value: number, min: number, max: number, fallback: number): number {
  if (isNaN(value) || value < min || value > max) return fallback;
  return value;
}

function formatCurrency(value: number): string {
  return '\u20AC' + Math.round(value).toLocaleString('en-IE');
}

function setCookie(name: string, value: string, days: number): void {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie =
    name +
    '=' +
    encodeURIComponent(value) +
    '; expires=' +
    expires +
    '; path=/' +
    '; SameSite=Strict' +
    '; Secure';
}

function getCookie(name: string): string | null {
  const nameEQ = name + '=';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const c = cookies[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

/* ===== MAIN COMPONENT ===== */
export default function Home() {
  /* ----- State ----- */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [calcSystem, setCalcSystem] = useState(6);
  const [calcRate, setCalcRate] = useState(35);
  const [calcUsage, setCalcUsage] = useState(4200);
  const [calcExport, setCalcExport] = useState(21);
  const [showCalcResult, setShowCalcResult] = useState(false);
  const [calcSavingsValue, setCalcSavingsValue] = useState('€0');
  const [calcDetails, setCalcDetails] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [headerBorder, setHeaderBorder] = useState(false);

  /* ----- Refs ----- */
  const headerRef = useRef<HTMLElement>(null);
  const faqAnswerRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const cookieBannerRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ----- Cookie consent on mount ----- */
  useEffect(() => {
    if (getCookie('cookies_accepted') !== 'true' && cookieBannerRef.current) {
      cookieBannerRef.current.classList.add('active');
    }
  }, []);

  /* ----- IntersectionObserver for scroll reveal ----- */
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    } else {
      elements.forEach((el) => el.classList.add('visible'));
    }
  }, []);

  /* ----- Scroll handler for header ----- */
  useEffect(() => {
    function handleScroll() {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        const currentScroll = window.pageYOffset;
        setHeaderBorder(currentScroll > 100);
      }, 10);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  /* ----- Modal focus trap ----- */
  useEffect(() => {
    if (!modalOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setModalOpen(false);
        if (lastFocusedRef.current) lastFocusedRef.current.focus();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  /* ----- Mobile menu body overflow ----- */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  /* ----- Handlers ----- */
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleFaq = useCallback(
    (id: number) => {
      if (activeFaq === id) {
        // Close current
        const ref = faqAnswerRefs.current[id];
        if (ref) ref.style.maxHeight = '0';
        setActiveFaq(null);
      } else {
        // Close previous
        if (activeFaq !== null) {
          const prevRef = faqAnswerRefs.current[activeFaq];
          if (prevRef) prevRef.style.maxHeight = '0';
        }
        // Open new
        setActiveFaq(id);
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
          const ref = faqAnswerRefs.current[id];
          if (ref) ref.style.maxHeight = ref.scrollHeight + 'px';
        }, 10);
      }
    },
    [activeFaq]
  );

  const openModal = useCallback(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement;
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    if (lastFocusedRef.current) lastFocusedRef.current.focus();
  }, []);

  const scrollToCalculator = useCallback(() => {
    const target = document.getElementById('calculator');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 72;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
      closeMobileMenu();
    },
    [closeMobileMenu]
  );

  const calculateSavings = useCallback(() => {
    const systemSize = sanitizeInput(calcSystem, 1, 20, 6);
    const elecRate = sanitizeInput(calcRate, 5, 100, 35);
    const annualUsage = sanitizeInput(calcUsage, 500, 50000, 4200);
    const exportRate = sanitizeInput(calcExport, 0, 100, 21);

    const specificYield = 950;
    const annualGeneration = systemSize * specificYield;
    const selfConsumption = 0.5;
    const selfConsumedKwh = annualGeneration * selfConsumption;
    const exportedKwh = annualGeneration * (1 - selfConsumption);
    const savingsSelfConsumed = selfConsumedKwh * (elecRate / 100);
    const savingsExported = exportedKwh * (exportRate / 100);
    const totalAnnualSavings = savingsSelfConsumed + savingsExported;

    const costPerKwp = 900;
    const systemCost = systemSize * costPerKwp - 1800;
    const finalCost = Math.max(systemCost, 2700);
    const paybackYears = totalAnnualSavings > 0 ? finalCost / totalAnnualSavings : 99;
    const lifetimeSavings = totalAnnualSavings * 25 - finalCost;

    setCalcSavingsValue(formatCurrency(totalAnnualSavings));
    setCalcDetails(
      'Annual generation: ~' +
        Math.round(annualGeneration).toLocaleString('en-IE') +
        ' kWh | ' +
        'Self-consumed: ~' +
        Math.round(selfConsumedKwh).toLocaleString('en-IE') +
        ' kWh | ' +
        'Exported: ~' +
        Math.round(exportedKwh).toLocaleString('en-IE') +
        ' kWh | ' +
        'Est. cost: ' +
        formatCurrency(finalCost) +
        ' | ' +
        'Payback: ~' +
        paybackYears.toFixed(1) +
        ' years | ' +
        '25-year net savings: ' +
        formatCurrency(lifetimeSavings)
    );
    setShowCalcResult(true);
  }, [calcSystem, calcRate, calcUsage, calcExport]);

  const acceptCookies = useCallback(() => {
    setCookie('cookies_accepted', 'true', 365);
    cookieBannerRef.current?.classList.remove('active');
  }, []);

  const onModalOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) closeModal();
    },
    [closeModal]
  );

  /* ----- Render ----- */
  return (
    <>
      {/* Skip to Content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* ===== HEADER ===== */}
      <header
        ref={headerRef}
        className="site-header"
        role="banner"
        style={{
          borderBottomColor: headerBorder
            ? 'rgba(200,255,0,0.2)'
            : 'rgba(200,255,0,0.1)',
        }}
      >
        <div className="container">
          <nav className="nav-wrap" aria-label="Main navigation">
            <a href="/" className="logo" aria-label="Renewable Ireland - Home">
              Renewable<span>Ireland</span>
            </a>
            <div className="nav-links" role="menubar">
              <a
                href="#features"
                role="menuitem"
                onClick={(e) => handleSmoothScroll(e, 'features')}
              >
                Why Us
              </a>
              <a
                href="#process"
                role="menuitem"
                onClick={(e) => handleSmoothScroll(e, 'process')}
              >
                Process
              </a>
              <a
                href="#grant"
                role="menuitem"
                onClick={(e) => handleSmoothScroll(e, 'grant')}
              >
                SEAI Grant
              </a>
              <a
                href="#calculator"
                role="menuitem"
                onClick={(e) => handleSmoothScroll(e, 'calculator')}
              >
                Savings
              </a>
              <a
                href="#faq"
                role="menuitem"
                onClick={(e) => handleSmoothScroll(e, 'faq')}
              >
                FAQ
              </a>
              <a
                href="tel:+353873958424"
                className="nav-cta"
                role="menuitem"
                rel="noopener noreferrer"
              >
                Get Free Quote
              </a>
            </div>
            <button
              className="hamburger"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={toggleMobileMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </nav>
        </div>
        <div
          className={`mobile-menu${mobileMenuOpen ? ' active' : ''}`}
          id="mobile-menu"
          role="menu"
          aria-hidden={!mobileMenuOpen}
        >
          <a href="#features" role="menuitem" onClick={(e) => handleSmoothScroll(e, 'features')}>
            Why Us
          </a>
          <a href="#process" role="menuitem" onClick={(e) => handleSmoothScroll(e, 'process')}>
            Process
          </a>
          <a href="#grant" role="menuitem" onClick={(e) => handleSmoothScroll(e, 'grant')}>
            SEAI Grant
          </a>
          <a href="#calculator" role="menuitem" onClick={(e) => handleSmoothScroll(e, 'calculator')}>
            Savings
          </a>
          <a href="#faq" role="menuitem" onClick={(e) => handleSmoothScroll(e, 'faq')}>
            FAQ
          </a>
          <a
            href="tel:+353873958424"
            className="btn btn-primary"
            role="menuitem"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
          >
            Call Now
          </a>
        </div>
      </header>

      <main id="main-content">
        {/* ===== HERO ===== */}
        <section className="hero" id="hero">
          <div className="container">
            <div className="hero-badge reveal" aria-label="Limited Time Offer">
              €1,800 SEAI Government Grant Available
            </div>
            <h1 className="reveal">
              Solar Panels Ireland.
              <br />
              <span className="highlight">Done Right.</span>
            </h1>
            <p className="reveal">
              Ireland&apos;s most trusted solar panel installer. 2,847+ installations,
              4.9-star rating, 1-day install. From €4,500 with SEAI grant handled
              for you.
            </p>
            <div className="hero-buttons reveal">
              <button
                className="btn btn-primary"
                onClick={scrollToCalculator}
                aria-label="Get your free solar savings estimate"
              >
                Get Free Savings Estimate
              </button>
              <button
                className="btn btn-secondary"
                onClick={openModal}
                aria-label="Upload your electricity bill"
              >
                Upload Your Bill
              </button>
            </div>
          </div>
        </section>

        {/* ===== STATS BAR ===== */}
        <div className="stats-bar" aria-label="Company statistics">
          <div className="stat-item reveal">
            <div className="stat-number" aria-label="2,847 plus installations">
              2,847+
            </div>
            <div className="stat-label">Installations Complete</div>
          </div>
          <div className="stat-item reveal">
            <div className="stat-number" aria-label="4.9 out of 5 star rating">
              4.9★
            </div>
            <div className="stat-label">Customer Rating</div>
          </div>
          <div className="stat-item reveal">
            <div className="stat-number" aria-label="15 plus counties covered">
              15+
            </div>
            <div className="stat-label">Counties Covered</div>
          </div>
          <div className="stat-item reveal">
            <div className="stat-number" aria-label="1-day installation">
              1 Day
            </div>
            <div className="stat-label">Typical Install Time</div>
          </div>
        </div>

        {/* ===== TRUST BADGES ===== */}
        <section className="trust-section" aria-label="Trust and accreditation badges">
          <div className="container">
            <div className="trust-badges">
              <div className="trust-badge reveal">
                <div className="trust-icon" aria-hidden="true">
                  ✔️
                </div>
                <div className="trust-badge-text">SEAI Registered</div>
              </div>
              <div className="trust-badge reveal">
                <div className="trust-icon" aria-hidden="true">
                  ⚡
                </div>
                <div className="trust-badge-text">Safe Electric (ECSS)</div>
              </div>
              <div className="trust-badge reveal">
                <div className="trust-icon" aria-hidden="true">
                  🏆
                </div>
                <div className="trust-badge-text">CIRI Registered</div>
              </div>
              <div className="trust-badge reveal">
                <div className="trust-icon" aria-hidden="true">
                  🛡️
                </div>
                <div className="trust-badge-text">Fully Insured</div>
              </div>
              <div className="trust-badge reveal">
                <div className="trust-icon" aria-hidden="true">
                  ⭐
                </div>
                <div className="trust-badge-text">4.9★ on Google</div>
              </div>
              <div className="trust-badge reveal">
                <div className="trust-icon" aria-hidden="true">
                  💰
                </div>
                <div className="trust-badge-text">Fixed Price</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="section section-alt" id="features" aria-labelledby="features-heading">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-label">Why Renewable Ireland</div>
              <h2 id="features-heading">The Renewable Ireland Difference</h2>
              <p>
                Everything you need for a seamless solar installation, managed from
                start to finish by our expert team.
              </p>
            </div>
            <div className="features-grid">
              <div className="feature-card reveal">
                <div className="feature-icon" aria-hidden="true">💰</div>
                <h3>Fixed Price Guarantee</h3>
                <p>
                  The price we quote is the price you pay. No hidden fees, no
                  surprise charges, no upselling. What you see is exactly what you
                  get, with complete transparency throughout the process.
                </p>
              </div>
              <div className="feature-card reveal">
                <div className="feature-icon" aria-hidden="true">📄</div>
                <h3>Full Grant Handling</h3>
                <p>
                  We handle the entire SEAI grant application process from start to
                  finish. Our team manages all paperwork, submissions, and
                  follow-ups so you never have to deal with bureaucracy.
                </p>
              </div>
              <div className="feature-card reveal">
                <div className="feature-icon" aria-hidden="true">⏱️</div>
                <h3>1-Day Installation</h3>
                <p>
                  Most installations are completed in a single day. Our experienced
                  crews arrive early, work efficiently, and leave your property
                  spotless. Minimal disruption, maximum quality.
                </p>
              </div>
              <div className="feature-card reveal">
                <div className="feature-icon" aria-hidden="true">💻</div>
                <h3>Project Portal</h3>
                <p>
                  Track every stage of your installation through our online project
                  portal. View your system design, monitor progress, access
                  documentation, and communicate with your dedicated project
                  manager.
                </p>
              </div>
              <div className="feature-card reveal">
                <div className="feature-icon" aria-hidden="true">🔋</div>
                <h3>Battery Ready</h3>
                <p>
                  All our systems are designed to be battery-ready from day one.
                  Want to add energy storage later? No problem. Our modular
                  approach means you can upgrade whenever it suits you.
                </p>
              </div>
              <div className="feature-card reveal">
                <div className="feature-icon" aria-hidden="true">🛡️</div>
                <h3>25-Year Panel Warranty</h3>
                <p>
                  Industry-leading 25-year manufacturer warranty on all solar
                  panels, guaranteeing at least 80% output at year 25. Plus our own
                  10-year workmanship guarantee for total peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 5-STEP PROCESS ===== */}
        <section className="section" id="process" aria-labelledby="process-heading">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-label">How It Works</div>
              <h2 id="process-heading">
                Your Solar Journey in 5 Simple Steps
              </h2>
              <p>
                From first enquiry to generating your own clean energy — we make
                the entire process effortless.
              </p>
            </div>
            <div className="process-steps">
              <div className="step-card reveal">
                <div className="step-number" aria-hidden="true">1</div>
                <h3>Upload Your Bill</h3>
                <p>
                  Upload your electricity bill through our SolarPilot tool for an
                  instant system recommendation and savings estimate.
                </p>
              </div>
              <div className="step-card reveal">
                <div className="step-number" aria-hidden="true">2</div>
                <h3>Free Site Survey</h3>
                <p>
                  Our SEAI-certified surveyor visits your home to assess roof
                  space, orientation, and electrical setup.
                </p>
              </div>
              <div className="step-card reveal">
                <div className="step-number" aria-hidden="true">3</div>
                <h3>Custom Design</h3>
                <p>
                  Receive a tailored system design with 3D roof renderings,
                  expected output, and a transparent fixed price.
                </p>
              </div>
              <div className="step-card reveal">
                <div className="step-number" aria-hidden="true">4</div>
                <h3>Grant Application</h3>
                <p>
                  We handle the full SEAI grant application — €1,800 deducted
                  from your invoice automatically.
                </p>
              </div>
              <div className="step-card reveal">
                <div className="step-number" aria-hidden="true">5</div>
                <h3>1-Day Install</h3>
                <p>
                  Our certified team installs your complete system in a single day
                  and commissions it on the spot.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== WHY SOLAR PANELS IN IRELAND ===== */}
        <section className="section section-alt" id="why-solar" aria-labelledby="why-solar-heading">
          <div className="container">
            <div className="content-grid">
              <div>
                <div className="section-label">Comprehensive Guide</div>
                <h2 id="why-solar-heading">
                  Why Solar Panels in Ireland? A 2024/2025 Guide
                </h2>
                <p>
                  Ireland is experiencing a solar energy revolution. With
                  electricity prices having surged by over 100% since 2021, and the
                  government actively incentivising renewable energy adoption
                  through generous SEAI grants, there has never been a better time
                  to invest in solar panels for your home. The Irish solar market
                  has matured rapidly, with over 50,000 homes now generating their
                  own clean electricity.
                </p>
                <p>
                  Many Irish homeowners still harbour misconceptions about solar
                  energy, believing that our climate is simply too cloudy or too
                  rainy for solar panels to be effective. The reality is quite the
                  opposite. Modern photovoltaic technology is remarkably efficient
                  at converting daylight into electricity — not just direct
                  sunlight. Ireland receives between 1,000 and 1,200
                  kilowatt-hours of solar irradiance per square metre annually,
                  which is comparable to parts of Germany that lead the world in
                  solar adoption.
                </p>
                <h3>The Financial Case for Solar in 2024/2025</h3>
                <p>
                  With a typical 6kWp solar panel system costing between €5,500
                  and €6,500 (after the €1,800 SEAI grant), and annual savings of
                  €800 to €1,400, the return on investment has never been more
                  attractive. Most homeowners achieve full payback within 5 to 7
                  years. After that, your system generates essentially free
                  electricity for another 18 to 20 years — representing total
                  savings of €15,000 to €25,000 over the system&apos;s lifetime.
                </p>
                <p>
                  The introduction of the Clean Export Guarantee (CEG) has further
                  improved the economics. You can now earn 21 cents per
                  kilowatt-hour for excess energy exported to the grid, turning
                  your home into a mini power station. Combined with the ability
                  to use your own generated electricity during daylight hours, a
                  well-designed system can reduce your electricity bill by 60 to
                  80 per cent.
                </p>
                <h3>Environmental Impact</h3>
                <p>
                  Beyond the financial benefits, installing solar panels is one of
                  the most impactful actions an individual household can take to
                  reduce carbon emissions. A typical 6kWp system offsets
                  approximately 2.5 tonnes of CO₂ annually — equivalent to
                  planting over 100 trees. With Ireland committed to reaching 80%
                  renewable electricity by 2030, every solar installation
                  contributes to our national climate goals and energy security.
                </p>
              </div>
              <aside className="content-sidebar" aria-label="Key solar facts">
                <div className="sidebar-item">
                  <strong>50,000+</strong>
                  <span>Irish homes with solar</span>
                </div>
                <div className="sidebar-item">
                  <strong>€1,800</strong>
                  <span>SEAI grant available</span>
                </div>
                <div className="sidebar-item">
                  <strong>5-7 Years</strong>
                  <span>Average payback period</span>
                </div>
                <div className="sidebar-item">
                  <strong>€15k-€25k</strong>
                  <span>Lifetime savings</span>
                </div>
                <div className="sidebar-item">
                  <strong>2.5 Tonnes</strong>
                  <span>CO₂ offset per year</span>
                </div>
                <div className="sidebar-item">
                  <strong>21c/kWh</strong>
                  <span>Export tariff rate</span>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ===== HOW SOLAR PANELS WORK IN IRISH WEATHER ===== */}
        <section className="section" id="irish-weather" aria-labelledby="weather-heading">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-label">Science Explained</div>
              <h2 id="weather-heading">
                How Solar Panels Work in Irish Weather
              </h2>
              <p>Debunking the myths about solar energy in Ireland&apos;s climate.</p>
            </div>
            <div className="content-grid">
              <div>
                <p>
                  Let&apos;s address the elephant in the room: Ireland is not known
                  for endless sunshine. However, the idea that solar panels
                  require blazing hot, cloudless skies is one of the most
                  persistent and damaging myths about solar energy. Understanding
                  the science behind how solar panels actually generate electricity
                  reveals why Ireland is, in fact, a perfectly viable location for
                  solar power generation.
                </p>
                <h3>Solar Panels Use Daylight, Not Direct Sunlight</h3>
                <p>
                  Photovoltaic (PV) panels work by converting photons from light
                  into electrical current through the photovoltaic effect. While
                  direct sunlight provides the highest intensity of photons, the
                  diffuse light that penetrates cloud cover still carries
                  sufficient energy for effective electricity generation. On a
                  bright overcast day, solar panels typically produce 60 to 80 per
                  cent of their rated capacity. Even on heavily overcast or rainy
                  days, panels continue generating meaningful amounts of
                  electricity — just at a reduced rate.
                </p>
                <h3>Irish Solar Irradiance: The Numbers</h3>
                <p>
                  Ireland receives approximately 1,000 to 1,200 kWh of solar
                  energy per square metre per year. To put this in perspective,
                  this is roughly 70 per cent of the irradiance received in
                  southern Spain. Germany, which has similar irradiance levels to
                  Ireland, is the world&apos;s fourth-largest solar market, with over 80
                  GW of installed capacity. The difference is policy and adoption,
                  not weather suitability.
                </p>
                <p>
                  Peak solar generation in Ireland occurs between April and
                  September, when daylight hours are longest. During these months,
                  a well-oriented 6kWp system can generate 30 to 40 kWh per day.
                  The extended daylight hours of an Irish summer partially
                  compensate for the lower intensity compared to Mediterranean
                  climates.
                </p>
                <h3>Temperature: The Counterintuitive Advantage</h3>
                <p>
                  Here&apos;s a surprising fact: solar panels actually perform better
                  in cooler temperatures. Photovoltaic cells lose efficiency as
                  they heat up, typically at a rate of about 0.4 per cent per
                  degree Celsius above 25°C. Ireland&apos;s moderate climate means our
                  panels operate closer to their optimal temperature more often
                  than panels installed in hotter countries, potentially gaining 5
                  to 10 per cent in annual output compared to identical panels in
                  a hot climate.
                </p>
                <h3>Real-World Performance Data</h3>
                <p>
                  Data from the Sustainable Energy Authority of Ireland (SEAI)
                  shows that well-installed residential solar PV systems in
                  Ireland consistently meet or exceed their projected generation
                  figures. A south-facing 6kWp system with a 30-degree tilt angle
                  will generate approximately 5,000 to 5,500 kWh annually — enough
                  to cover 70 to 100 per cent of a typical household&apos;s
                  electricity needs when combined with smart usage patterns and
                  the export tariff.
                </p>
              </div>
              <aside className="content-sidebar" aria-label="Weather performance facts">
                <div className="sidebar-item">
                  <strong>60-80%</strong>
                  <span>Output on cloudy days</span>
                </div>
                <div className="sidebar-item">
                  <strong>70%</strong>
                  <span>Of Spain&apos;s irradiance</span>
                </div>
                <div className="sidebar-item">
                  <strong>5,000+</strong>
                  <span>kWh annual generation (6kWp)</span>
                </div>
                <div className="sidebar-item">
                  <strong>70-100%</strong>
                  <span>Bill reduction possible</span>
                </div>
                <div className="sidebar-item">
                  <strong>5-10%</strong>
                  <span>Bonus from cooler temps</span>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ===== SEAI GRANT SECTION ===== */}
        <section className="section section-alt grant-section" id="grant" aria-labelledby="grant-heading">
          <div className="container">
            <div className="grant-grid">
              <div className="reveal">
                <div className="section-label">Government Support</div>
                <h2 id="grant-heading">
                  Understanding the SEAI Grant for Solar Panels
                </h2>
                <p style={{ color: 'var(--grey-light)', fontSize: '1.05rem', marginBottom: 24, lineHeight: 1.8 }}>
                  The Sustainable Energy Authority of Ireland (SEAI) offers a
                  generous grant of €1,800 to homeowners who install solar
                  photovoltaic panels. This guide covers everything you need to
                  know about eligibility, the application process, and how we make
                  it completely hassle-free.
                </p>
                <div className="grant-details">
                  <div className="grant-detail">
                    <div className="grant-check" aria-hidden="true">✓</div>
                    <p>
                      <strong>Grant Amount:</strong> €1,800 for solar PV systems up
                      to 4kWp. This is paid directly as a discount on your
                      installation cost when you choose Renewable Ireland.
                    </p>
                  </div>
                  <div className="grant-detail">
                    <div className="grant-check" aria-hidden="true">✓</div>
                    <p>
                      <strong>Eligibility:</strong> Available to homeowners whose
                      property was built and occupied before 2021. The home must be
                      your primary residence, and you must use an SEAI-registered
                      installer.
                    </p>
                  </div>
                  <div className="grant-detail">
                    <div className="grant-check" aria-hidden="true">✓</div>
                    <p>
                      <strong>Application Process:</strong> Renewable Ireland
                      handles everything. We submit your application, manage all
                      documentation, and communicate with SEAI on your behalf. You
                      simply provide your MPRN number and Eircode.
                    </p>
                  </div>
                  <div className="grant-detail">
                    <div className="grant-check" aria-hidden="true">✓</div>
                    <p>
                      <strong>Timeline:</strong> Grant approval typically takes 2
                      to 4 weeks. Once approved, your installation can be
                      scheduled. The grant is applied directly to your invoice — no
                      waiting for reimbursement.
                    </p>
                  </div>
                  <div className="grant-detail">
                    <div className="grant-check" aria-hidden="true">✓</div>
                    <p>
                      <strong>Additional Grants:</strong> If your home was built
                      before 2007, you may also qualify for additional insulation
                      and heating upgrade grants through SEAI&apos;s Better Energy Homes
                      scheme.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal" style={{ textAlign: 'center' }}>
                <div className="grant-amount">
                  €1,800<span> Government Grant</span>
                </div>
                <p style={{ color: 'var(--grey-light)', fontSize: '1.1rem', marginBottom: 32 }}>
                  Deducted directly from your installation cost. No waiting, no
                  paperwork, no hassle.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={openModal}
                  aria-label="Check your grant eligibility"
                >
                  Check Your Eligibility
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SOLAR SAVINGS CALCULATOR ===== */}
        <section className="section" id="calculator" aria-labelledby="calculator-heading">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-label">Estimate Your Savings</div>
              <h2 id="calculator-heading">Solar Savings Calculator</h2>
              <p>
                Get an instant estimate of how much you could save with solar
                panels based on your home and energy usage.
              </p>
            </div>
            <div className="calculator-card reveal" role="form" aria-label="Solar savings calculator">
              <div className="calc-field">
                <label htmlFor="calc-system">System Size</label>
                <select
                  id="calc-system"
                  aria-describedby="calc-system-desc"
                  value={calcSystem}
                  onChange={(e) => setCalcSystem(Number(e.target.value))}
                >
                  <option value="4">4kWp (10 panels) — Ideal for apartments &amp; small homes</option>
                  <option value="6">6kWp (14 panels) — Most popular for 3-bed homes</option>
                  <option value="8">8kWp (18 panels) — Large homes &amp; high usage</option>
                  <option value="10">10kWp (22 panels) — Maximum generation</option>
                </select>
                <span
                  id="calc-system-desc"
                  className="sr-only"
                  style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    padding: 0,
                    margin: -1,
                    overflow: 'hidden',
                    clip: 'rect(0,0,0,0)',
                    border: 0,
                  }}
                >
                  Select your preferred solar panel system size
                </span>
              </div>
              <div className="calc-field">
                <label htmlFor="calc-rate">Electricity Rate (cents/kWh)</label>
                <input
                  type="number"
                  id="calc-rate"
                  value={calcRate}
                  min={10}
                  max={80}
                  step={1}
                  autoComplete="off"
                  aria-describedby="calc-rate-desc"
                  onChange={(e) => setCalcRate(Number(e.target.value))}
                />
                <span
                  id="calc-rate-desc"
                  style={{ display: 'block', color: 'var(--grey-mid)', fontSize: '0.8rem', marginTop: 4 }}
                >
                  Check your bill for your current rate
                </span>
              </div>
              <div className="calc-field">
                <label htmlFor="calc-usage">Annual Electricity Usage (kWh)</label>
                <input
                  type="number"
                  id="calc-usage"
                  value={calcUsage}
                  min={1000}
                  max={20000}
                  step={100}
                  autoComplete="off"
                  aria-describedby="calc-usage-desc"
                  onChange={(e) => setCalcUsage(Number(e.target.value))}
                />
                <span
                  id="calc-usage-desc"
                  style={{ display: 'block', color: 'var(--grey-mid)', fontSize: '0.8rem', marginTop: 4 }}
                >
                  Average Irish home: 4,200 kWh/year
                </span>
              </div>
              <div className="calc-field">
                <label htmlFor="calc-export">Export Tariff (cents/kWh)</label>
                <input
                  type="number"
                  id="calc-export"
                  value={calcExport}
                  min={0}
                  max={40}
                  step={1}
                  autoComplete="off"
                  aria-describedby="calc-export-desc"
                  onChange={(e) => setCalcExport(Number(e.target.value))}
                />
                <span
                  id="calc-export-desc"
                  style={{ display: 'block', color: 'var(--grey-mid)', fontSize: '0.8rem', marginTop: 4 }}
                >
                  Clean Export Guarantee rate (typically 21c)
                </span>
              </div>
              <button
                className="btn btn-primary"
                onClick={calculateSavings}
                style={{ width: '100%' }}
                aria-label="Calculate your solar savings"
              >
                Calculate My Savings
              </button>
              <div className={`calc-result${showCalcResult ? ' active' : ''}`} id="calc-result" role="status" aria-live="polite">
                <div className="calc-savings" id="calc-savings-value">
                  {calcSavingsValue}
                </div>
                <div style={{ color: 'var(--white)', fontWeight: 600, marginBottom: 8 }}>
                  Estimated Annual Savings
                </div>
                <div className="calc-detail" id="calc-details">
                  {calcDetails}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== COST SECTION ===== */}
        <section className="section section-alt" id="cost" aria-labelledby="cost-heading">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-label">Transparent Pricing</div>
              <h2 id="cost-heading">
                How Much Do Solar Panels Cost in Ireland? (2024/2025)
              </h2>
              <p>
                A detailed, honest breakdown of solar panel costs, factors
                affecting price, and real ROI calculations.
              </p>
            </div>
            <div className="content-grid">
              <div>
                <p>
                  Solar panel costs in Ireland have fallen dramatically over the
                  past decade, making residential solar energy more accessible than
                  ever. At Renewable Ireland, we believe in complete pricing
                  transparency. Here is a detailed breakdown of what you can
                  expect to invest, what affects the price, and the genuine return
                  on investment you can achieve.
                </p>
                <h3>Our Pricing (After €1,800 SEAI Grant)</h3>
                <p>
                  Our Essential 4kWp package starts at €4,500, perfect for
                  smaller homes and apartments. The Popular 6kWp package at €5,500
                  is our most popular option, ideal for the average Irish
                  3-bedroom home. Our Premium 8kWp system with battery-ready
                  design is €6,500, suited for larger homes with higher energy
                  demands. All prices include full installation, mounting,
                  inverter, monitoring system, commissioning, and SEAI grant
                  handling.
                </p>
                <h3>Factors Affecting Your Price</h3>
                <p>
                  Your final price depends on several factors: roof complexity
                  (pitch, accessibility, and material), whether you choose a
                  battery storage add-on, the type of inverter (string, micro, or
                  hybrid), whether your electrical panel needs upgrading, and
                  scaffolding requirements. We assess all these factors during the
                  free site survey and provide a single, fixed price with no
                  surprises.
                </p>
                <h3>Return on Investment</h3>
                <p>
                  With annual savings of €800 to €1,400 and system lifetimes of
                  25 to 30 years, solar panels represent an exceptional
                  investment. At a 6kWp system cost of €5,500 after grant, and
                  annual savings of €1,100, the payback period is approximately 5
                  years. Over the full 25-year warranty period, total savings
                  amount to approximately €27,500 — a net return of over €22,000.
                  When you factor in rising electricity prices (which have
                  historically increased by 5 to 7 per cent annually), the actual
                  return could be significantly higher.
                </p>
              </div>
              <aside className="content-sidebar" aria-label="Pricing overview">
                <div className="sidebar-item">
                  <strong>€4,500</strong>
                  <span>4kWp Essential Package</span>
                </div>
                <div className="sidebar-item">
                  <strong>€5,500</strong>
                  <span>6kWp Popular Package</span>
                </div>
                <div className="sidebar-item">
                  <strong>€6,500</strong>
                  <span>8kWp Premium Package</span>
                </div>
                <div className="sidebar-item">
                  <strong>~5 Years</strong>
                  <span>Typical payback period</span>
                </div>
                <div className="sidebar-item">
                  <strong>€22,000+</strong>
                  <span>Net return over 25 years</span>
                </div>
                <div className="sidebar-item">
                  <strong>€0</strong>
                  <span>Hidden fees — guaranteed</span>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ===== BATTERY STORAGE GUIDE ===== */}
        <section className="section" id="battery" aria-labelledby="battery-heading">
          <div className="container">
            <div className="content-grid">
              <div>
                <div className="section-label">Energy Storage</div>
                <h2 id="battery-heading">
                  Solar Panel Battery Storage: Is It Worth It?
                </h2>
                <p>
                  Battery storage is one of the most commonly asked-about topics
                  in residential solar. This guide helps you make an informed
                  decision about whether adding a battery to your solar system
                  makes financial sense for your household.
                </p>
                <h3>What Is Solar Battery Storage?</h3>
                <p>
                  A solar battery stores excess electricity generated by your
                  panels during the day for use in the evening and overnight.
                  Without a battery, any surplus energy is exported to the grid at
                  the Clean Export Guarantee rate (approximately 21c/kWh). With a
                  battery, you can store that energy and use it yourself,
                  effectively valuing it at your electricity import rate (typically
                  30 to 40c/kWh). This increases the value of every
                  kilowatt-hour you generate.
                </p>
                <h3>Cost Analysis</h3>
                <p>
                  A 5kWh lithium-iron-phosphate (LFP) battery system typically
                  costs between €2,000 and €3,500 installed. This additional
                  investment increases your annual savings by approximately €200 to
                  €400, depending on your usage patterns. The battery payback
                  period is therefore longer than the solar panels alone —
                  typically 8 to 12 years. However, battery prices are falling
                  rapidly (down over 50 per cent since 2019), and the benefits go
                  beyond pure financials.
                </p>
                <h3>When Battery Storage Makes Sense</h3>
                <p>
                  A battery is most worthwhile if you are out of the house during
                  peak daylight hours, you have high evening energy usage
                  (electric vehicle charging, cooking, heating), you want
                  protection against power outages, or you&apos;re motivated by energy
                  independence. At Renewable Ireland, all our systems are
                  battery-ready, meaning you can install panels now and add a
                  battery at any time in the future without replacing any
                  equipment.
                </p>
              </div>
              <aside className="content-sidebar" aria-label="Battery storage quick facts">
                <div className="sidebar-item">
                  <strong>€2,000-€3,500</strong>
                  <span>Battery cost (5kWh)</span>
                </div>
                <div className="sidebar-item">
                  <strong>€200-€400</strong>
                  <span>Extra annual savings</span>
                </div>
                <div className="sidebar-item">
                  <strong>8-12 Years</strong>
                  <span>Battery payback period</span>
                </div>
                <div className="sidebar-item">
                  <strong>10+ Years</strong>
                  <span>Battery warranty</span>
                </div>
                <div className="sidebar-item">
                  <strong>50%+</strong>
                  <span>Price drop since 2019</span>
                </div>
                <div className="sidebar-item">
                  <strong>Anytime</strong>
                  <span>Add battery later — no problem</span>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ===== COMPARISON TABLE ===== */}
        <section className="section section-alt" id="comparison" aria-labelledby="comparison-heading">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-label">Honest Comparison</div>
              <h2 id="comparison-heading">Renewable Ireland vs. Competitors</h2>
              <p>See how we stack up. We believe transparency builds trust.</p>
            </div>
            <div className="comparison-table-wrap reveal">
              <table className="comparison-table" role="table" aria-label="Comparison of solar installation companies">
                <thead>
                  <tr>
                    <th scope="col">Feature</th>
                    <th scope="col" className="highlight-col">
                      Renewable Ireland
                    </th>
                    <th scope="col">Typical Competitor A</th>
                    <th scope="col">Typical Competitor B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Starting Price (after grant)</strong></td>
                    <td className="highlight-col">€4,500</td>
                    <td>€5,500-€7,000</td>
                    <td>€5,000-€6,500</td>
                  </tr>
                  <tr>
                    <td><strong>Panel Warranty</strong></td>
                    <td className="highlight-col">25 years</td>
                    <td>20-25 years</td>
                    <td>25 years</td>
                  </tr>
                  <tr>
                    <td><strong>Workmanship Guarantee</strong></td>
                    <td className="highlight-col">10 years</td>
                    <td>5-10 years</td>
                    <td>5 years</td>
                  </tr>
                  <tr>
                    <td><strong>SEAI Grant Handling</strong></td>
                    <td className="highlight-col check">✓ Full service</td>
                    <td>✓ Full service</td>
                    <td>Partial — customer applies</td>
                  </tr>
                  <tr>
                    <td><strong>Installation Time</strong></td>
                    <td className="highlight-col">1 day</td>
                    <td>1-3 days</td>
                    <td>2-3 days</td>
                  </tr>
                  <tr>
                    <td><strong>Fixed Price Guarantee</strong></td>
                    <td className="highlight-col check">✓ Yes</td>
                    <td className="cross">✗ Variable</td>
                    <td className="check">✓ Yes</td>
                  </tr>
                  <tr>
                    <td><strong>Real-time Monitoring</strong></td>
                    <td className="highlight-col check">✓ Included</td>
                    <td className="cross">✗ Extra cost</td>
                    <td className="check">✓ Included</td>
                  </tr>
                  <tr>
                    <td><strong>Battery-Ready Design</strong></td>
                    <td className="highlight-col check">✓ Standard</td>
                    <td className="cross">✗ Not always</td>
                    <td className="check">✓ Available</td>
                  </tr>
                  <tr>
                    <td><strong>Project Portal</strong></td>
                    <td className="highlight-col check">✓ Yes</td>
                    <td className="cross">✗ No</td>
                    <td className="cross">✗ No</td>
                  </tr>
                  <tr>
                    <td><strong>Counties Covered</strong></td>
                    <td className="highlight-col">15+</td>
                    <td>8-10</td>
                    <td>5-8</td>
                  </tr>
                  <tr>
                    <td><strong>Customer Rating</strong></td>
                    <td className="highlight-col">4.9★</td>
                    <td>4.5★</td>
                    <td>4.3★</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ===== ABOUT OUR TEAM ===== */}
        <section className="section" id="team" aria-labelledby="team-heading">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-label">Expert Team</div>
              <h2 id="team-heading">About Our Team</h2>
              <p>
                Meet the experts behind Ireland&apos;s most trusted solar installation
                company.
              </p>
            </div>
            <div className="team-grid">
              <div className="team-card reveal">
                <div className="team-avatar" aria-hidden="true">👨‍💼</div>
                <h3>Declan O&apos;Sullivan</h3>
                <div className="team-role">Head of Engineering</div>
                <p>
                  Declan holds a BEng in Electrical Engineering from UCD and has
                  over 15 years of experience in renewable energy systems. A
                  chartered engineer with Engineers Ireland, he has designed and
                  overseen more than 2,000 residential solar installations.
                  Declan leads our technical team, ensuring every system meets the
                  highest standards of safety, efficiency, and performance.
                </p>
              </div>
              <div className="team-card reveal">
                <div className="team-avatar" aria-hidden="true">👩‍💻</div>
                <h3>Siobhán Murphy</h3>
                <div className="team-role">SEAI-Certified Surveyor</div>
                <p>
                  Siobhán is a fully SEAI-certified energy surveyor with a diploma
                  in Sustainable Energy Management from TU Dublin. With over 8
                  years conducting site surveys across Ireland, she has an
                  exceptional eye for roof assessment, shading analysis, and system
                  optimisation. Siobhán ensures every installation is perfectly
                  tailored to each customer&apos;s unique property and energy needs.
                </p>
              </div>
              <div className="team-card reveal">
                <div className="team-avatar" aria-hidden="true">👨‍🔧</div>
                <h3>Mark Walsh</h3>
                <div className="team-role">Operations Director</div>
                <p>
                  Mark brings over 12 years of operations management in the
                  construction and renewables sector. He oversees all installations,
                  logistics, and quality control processes. Mark&apos;s commitment to
                  efficiency is behind our industry-leading 1-day installation
                  standard. He ensures every crew is fully trained, every
                  component is quality-checked, and every customer experience
                  exceeds expectations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CERTIFICATIONS ===== */}
        <section className="section section-alt" id="certifications" aria-labelledby="cert-heading">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-label">Accreditations</div>
              <h2 id="cert-heading">Certifications &amp; Accreditations</h2>
              <p>Your guarantee of quality, safety, and professionalism.</p>
            </div>
            <div className="cert-grid">
              <div className="cert-card reveal">
                <div className="cert-icon" aria-hidden="true">🏆</div>
                <h3>SEAI Registered</h3>
                <p>
                  Officially registered installer with the Sustainable Energy
                  Authority of Ireland. Eligible to handle government grant
                  applications.
                </p>
              </div>
              <div className="cert-card reveal">
                <div className="cert-icon" aria-hidden="true">⚡</div>
                <h3>Safe Electric (ECSS)</h3>
                <p>
                  Electrical Contracting Safety Scheme certified. All electrical
                  work meets the highest national safety standards.
                </p>
              </div>
              <div className="cert-card reveal">
                <div className="cert-icon" aria-hidden="true">🏗️</div>
                <h3>CIRI Registered</h3>
                <p>
                  Construction Industry Register Ireland member. Demonstrates our
                  commitment to construction quality and standards.
                </p>
              </div>
              <div className="cert-card reveal">
                <div className="cert-icon" aria-hidden="true">🛡️</div>
                <h3>Fully Insured</h3>
                <p>
                  Comprehensive public liability and employer&apos;s liability insurance.
                  Full protection for your home and our team.
                </p>
              </div>
              <div className="cert-card reveal">
                <div className="cert-icon" aria-hidden="true">🌍</div>
                <h3>ISO Quality Standard</h3>
                <p>
                  Following ISO 9001 quality management principles across all
                  operations, from survey to installation and aftercare.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== AREAS WE COVER ===== */}
        <section className="section" id="areas" aria-labelledby="areas-heading">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-label">Nationwide Coverage</div>
              <h2 id="areas-heading">Areas We Cover</h2>
              <p>
                We install solar panels across 15+ counties in Ireland. Here are
                some of the key areas we serve.
              </p>
            </div>
            <div className="areas-grid">
              {[
                { county: 'Dublin', towns: 'Dublin City, Swords, Dundrum, Lucan, Tallaght, Dun Laoghaire, Rathfarnham, Malahide, Ballymun, Clondalkin' },
                { county: 'Cork', towns: 'Cork City, Douglas, Ballincollig, Carrigaline, Midleton, Mallow, Bandon, Kinsale, Youghal, Blarney' },
                { county: 'Galway', towns: 'Galway City, Oranmore, Athenry, Loughrea, Tuam, Gort, Clifden, Ballinasloe, Headford, Moycullen' },
                { county: 'Limerick', towns: 'Limerick City, Castletroy, Raheen, Dooradoyle, Annacotty, Newcastle West, Adare, Kilmallock' },
                { county: 'Kildare', towns: 'Newbridge, Naas, Maynooth, Celbridge, Leixlip, Kildare Town, Athy, Monasterevin, Clane' },
                { county: 'Meath', towns: 'Navan, Ashbourne, Dunboyne, Trim, Kells, Laytown, Bettystown, Slane, Ratoath, Clonee' },
                { county: 'Wicklow', towns: 'Bray, Greystones, Wicklow Town, Arklow, Enniskerry, Blessington, Roundwood, Newtownmountkennedy' },
                { county: 'Wexford', towns: 'Wexford Town, Enniscorthy, Gorey, New Ross, Ferns, Bunclody, Rosslare, Courtown' },
                { county: 'Waterford', towns: 'Waterford City, Dungarvan, Tramore, Carrick-on-Suir, Passage East, Kilmacthomas' },
                { county: 'Kilkenny', towns: 'Kilkenny City, Thomastown, Callan, Castlecomer, Graiguenamanagh, Freshford' },
                { county: 'Tipperary', towns: 'Clonmel, Nenagh, Thurles, Cashel, Carrick-on-Suir, Templemore, Roscrea, Tipperary Town' },
                { county: 'Clare', towns: 'Ennis, Shannon, Kilrush, Lahinch, Ennistimon, Scariff, Sixmilebridge' },
                { county: 'Louth', towns: 'Drogheda, Dundalk, Ardee, Drogheda, Clogherhead, Termonfeckin' },
                { county: 'Westmeath', towns: 'Mullingar, Athlone, Castlepollard, Kinnegad, Moate, Kilbeggan' },
                { county: 'Carlow', towns: 'Carlow Town, Tullow, Hacketstown, Muine Bheag, Borris' },
                { county: 'Kerry', towns: 'Tralee, Killarney, Listowel, Kenmare, Cahersiveen, Dingle' },
              ].map((area) => (
                <div className="area-card reveal" key={area.county}>
                  <h3>{area.county}</h3>
                  <p>{area.towns}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== GUARANTEE / WARRANTY ===== */}
        <section className="section section-alt" id="guarantee" aria-labelledby="guarantee-heading">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-label">Peace of Mind</div>
              <h2 id="guarantee-heading">Our Guarantee &amp; Warranty</h2>
              <p>
                The most comprehensive warranty package in the Irish solar
                industry. Your investment is protected for decades.
              </p>
            </div>
            <div className="guarantee-grid">
              <div className="guarantee-card reveal">
                <div className="guarantee-icon" aria-hidden="true">☀️</div>
                <div className="guarantee-value">25 Years</div>
                <h3>Panel Warranty</h3>
                <p>
                  Manufacturer warranty guaranteeing at least 80% power output at
                  year 25. Premium Tier 1 panels built to last decades beyond
                  warranty.
                </p>
              </div>
              <div className="guarantee-card reveal">
                <div className="guarantee-icon" aria-hidden="true">🛡️</div>
                <div className="guarantee-value">10 Years</div>
                <h3>Workmanship Guarantee</h3>
                <p>
                  Full guarantee on all installation work including roof mounting,
                  electrical connections, and system integration. We stand behind
                  every installation.
                </p>
              </div>
              <div className="guarantee-card reveal">
                <div className="guarantee-icon" aria-hidden="true">⚡</div>
                <div className="guarantee-value">10 Years</div>
                <h3>Inverter Warranty</h3>
                <p>
                  Industry-leading inverter warranty covering parts and labour.
                  Optional 15-year extended warranty available for maximum peace of
                  mind.
                </p>
              </div>
              <div className="guarantee-card reveal">
                <div className="guarantee-icon" aria-hidden="true">📊</div>
                <div className="guarantee-value">80%</div>
                <h3>Performance Guarantee</h3>
                <p>
                  Your panels are guaranteed to produce at least 80% of their
                  rated capacity at 25 years. We only install panels with proven
                  long-term performance data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CUSTOMER REVIEWS ===== */}
        <section className="section" id="reviews" aria-labelledby="reviews-heading">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-label">Customer Stories</div>
              <h2 id="reviews-heading">What Our Customers Say</h2>
              <p>Real reviews from real homeowners across Ireland.</p>
            </div>
            <div className="reviews-grid">
              <div className="review-card reveal">
                <div className="review-stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <p className="review-text">
                  &ldquo;We had our 6kWp system installed in May and it has completely
                  transformed our electricity bills. Our summer bill dropped from
                  €180 to just €35. The installation team were incredibly
                  professional — they arrived at 8am and were finished by 4pm.
                  You wouldn&apos;t even know they&apos;d been here, the place was
                  spotless. Declan and his crew are a credit to the
                  company.&rdquo;
                </p>
                <div className="review-author">Paul Brennan</div>
                <div className="review-location">Rathfarnham, Dublin</div>
                <div className="review-date">August 2024</div>
              </div>
              <div className="review-card reveal">
                <div className="review-stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <p className="review-text">
                  &ldquo;I was sceptical about whether solar panels would work in
                  Ireland&apos;s climate, but our Renewable Ireland system has exceeded
                  all expectations. We generated 5,200 kWh in our first year —
                  more than the 5,000 kWh estimate. The project portal made
                  tracking everything so easy, and Siobhán&apos;s site survey was
                  thorough and reassuring. Couldn&apos;t recommend them more
                  highly.&rdquo;
                </p>
                <div className="review-author">Aoife Kelly</div>
                <div className="review-location">Douglas, Cork</div>
                <div className="review-date">October 2024</div>
              </div>
              <div className="review-card reveal">
                <div className="review-stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <p className="review-text">
                  &ldquo;As a first-time homeowner, I was nervous about the whole
                  process. Renewable Ireland made it completely stress-free. They
                  handled the SEAI grant application, scheduled everything
                  perfectly, and the installation was done in a single day. My
                  electricity bill is now down 70% and I&apos;m earning money from the
                  export tariff. Best investment I&apos;ve ever made.&rdquo;
                </p>
                <div className="review-author">Eoin O&apos;Connor</div>
                <div className="review-location">Maynooth, Kildare</div>
                <div className="review-date">July 2024</div>
              </div>
              <div className="review-card reveal">
                <div className="review-stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <p className="review-text">
                  &ldquo;We got quotes from four companies and Renewable Ireland was
                  the most transparent. No hidden costs, no pressure to upgrade,
                  and they actually recommended a smaller system than the
                  competitors because that&apos;s all we needed. That honesty sold us
                  immediately. The system has been running for 8 months and
                  we&apos;ve saved over €900 already.&rdquo;
                </p>
                <div className="review-author">Margaret and Tom Higgins</div>
                <div className="review-location">Ennis, Clare</div>
                <div className="review-date">November 2024</div>
              </div>
              <div className="review-card reveal">
                <div className="review-stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <p className="review-text">
                  &ldquo;We added a battery to our 8kWp system and it has been a
                  game-changer. We&apos;re essentially off the grid from April to
                  September. The monitoring app is brilliant — I check it every
                  day to see how much we&apos;re generating. The support team has been
                  fantastic too, answering questions months after the installation.
                  Genuinely impressed.&rdquo;
                </p>
                <div className="review-author">David Chen</div>
                <div className="review-location">Salthill, Galway</div>
                <div className="review-date">September 2024</div>
              </div>
              <div className="review-card reveal">
                <div className="review-stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <p className="review-text">
                  &ldquo;I researched solar panels for over a year before choosing
                  Renewable Ireland. The combination of the 25-year panel
                  warranty, 10-year workmanship guarantee, and their 4.9-star
                  rating gave me the confidence to proceed. Now, 6 months
                  post-installation, I can confirm the hype is real. Our panels
                  are outperforming projections and the whole experience was
                  first-class.&rdquo;
                </p>
                <div className="review-author">Fiona Doyle</div>
                <div className="review-location">Greystones, Wicklow</div>
                <div className="review-date">December 2024</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="section section-alt" id="faq" aria-labelledby="faq-heading">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-label">Questions Answered</div>
              <h2 id="faq-heading">Frequently Asked Questions</h2>
              <p>
                Everything you need to know about solar panels in Ireland.
                Can&apos;t find your answer? Call us.
              </p>
            </div>
            <div className="faq-list" role="list">
              {faqData.map((faq) => (
                <div
                  className={`faq-item reveal${activeFaq === faq.id ? ' active' : ''}`}
                  role="listitem"
                  key={faq.id}
                >
                  <button
                    className="faq-question"
                    aria-expanded={activeFaq === faq.id}
                    aria-controls={`faq-${faq.id}`}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    {faq.question}
                    <span className="faq-icon" aria-hidden="true">
                      +
                    </span>
                  </button>
                  <div
                    className="faq-answer"
                    id={`faq-${faq.id}`}
                    role="region"
                    hidden={activeFaq !== faq.id}
                    ref={(el) => {
                      faqAnswerRefs.current[faq.id] = el;
                    }}
                  >
                    <div className="faq-answer-inner">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="section cta-section" id="cta" aria-labelledby="cta-heading">
          <div className="container">
            <h2 id="cta-heading" className="reveal">
              Ready to Start Saving with Solar?
            </h2>
            <p className="reveal">
              Join 2,847+ Irish homeowners who are already generating their own
              clean energy. Get your free, no-obligation quote today.
            </p>
            <a
              href="tel:+353873958424"
              className="cta-phone reveal"
              rel="noopener noreferrer"
              aria-label="Call us at 087 395 8424"
            >
              087 395 8424
            </a>
            <div className="hero-buttons reveal">
              <button
                className="btn btn-primary"
                onClick={openModal}
                aria-label="Upload your electricity bill for a free estimate"
              >
                Get Your Free Quote
              </button>
              <a
                href="mailto:hello@renewableireland.ie"
                className="btn btn-secondary"
                rel="noopener noreferrer"
                aria-label="Send us an email"
              >
                Email Us
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ===== SOLARPILOT MODAL ===== */}
      <div
        className={`modal-overlay${modalOpen ? ' active' : ''}`}
        id="solarpilot-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={modalRef}
        onClick={onModalOverlayClick}
      >
        <div className="modal">
          <div className="modal-header">
            <h3 id="modal-title">Upload Your Electricity Bill</h3>
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
          <div className="modal-body">
            <iframe
              src="https://solarpilot.ie/upload"
              title="SolarPilot Bill Upload Tool"
              loading="lazy"
              allow="camera; microphone"
            />
          </div>
        </div>
      </div>

      {/* ===== COOKIE BANNER ===== */}
      <div
        className="cookie-banner"
        id="cookie-banner"
        ref={cookieBannerRef}
        role="complementary"
        aria-label="Cookie consent"
      >
        <div className="cookie-content">
          <p>
            We use essential cookies to ensure the best experience on our
            website. By continuing, you agree to our use of cookies.{' '}
            <a href="/privacy" rel="noopener noreferrer">
              Privacy Policy
            </a>
          </p>
          <button
            className="cookie-accept"
            onClick={acceptCookies}
            aria-label="Accept cookies"
          >
            Accept All Cookies
          </button>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="site-footer" role="contentinfo">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="/" className="logo" aria-label="Renewable Ireland">
                Renewable<span>Ireland</span>
              </a>
              <p>
                Ireland&apos;s most trusted solar panel installation company. SEAI
                registered, Safe Electric certified, with over 2,847 successful
                installations nationwide. Helping Irish homeowners save money and
                reduce carbon emissions since 2018.
              </p>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <a href="#features" rel="noopener noreferrer" onClick={(e) => handleSmoothScroll(e, 'features')}>
                Solar Panel Installation
              </a>
              <a href="#battery" rel="noopener noreferrer" onClick={(e) => handleSmoothScroll(e, 'battery')}>
                Battery Storage
              </a>
              <a href="#grant" rel="noopener noreferrer" onClick={(e) => handleSmoothScroll(e, 'grant')}>
                SEAI Grant Assistance
              </a>
              <a href="#calculator" rel="noopener noreferrer" onClick={(e) => handleSmoothScroll(e, 'calculator')}>
                Savings Calculator
              </a>
              <a
                href="https://solarpilot.ie"
                rel="noopener noreferrer"
                target="_blank"
              >
                SolarPilot Upload
              </a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#team" rel="noopener noreferrer" onClick={(e) => handleSmoothScroll(e, 'team')}>
                About Us
              </a>
              <a href="#certifications" rel="noopener noreferrer" onClick={(e) => handleSmoothScroll(e, 'certifications')}>
                Certifications
              </a>
              <a href="#areas" rel="noopener noreferrer" onClick={(e) => handleSmoothScroll(e, 'areas')}>
                Coverage Areas
              </a>
              <a href="#reviews" rel="noopener noreferrer" onClick={(e) => handleSmoothScroll(e, 'reviews')}>
                Reviews
              </a>
              <a href="#faq" rel="noopener noreferrer" onClick={(e) => handleSmoothScroll(e, 'faq')}>
                FAQ
              </a>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <a href="tel:+353873958424" rel="noopener noreferrer">
                087 395 8424
              </a>
              <a href="mailto:hello@renewableireland.ie" rel="noopener noreferrer">
                hello@renewableireland.ie
              </a>
              <a href="/privacy" rel="noopener noreferrer">
                Privacy Policy
              </a>
              <a href="/terms" rel="noopener noreferrer">
                Terms &amp; Conditions
              </a>
              <a href="/sitemap" rel="noopener noreferrer">
                Sitemap
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              © 2024 Renewable Ireland. All rights reserved. Company Reg:
              628491
            </p>
            <p>
              SEAI Registered Installer | Safe Electric (ECSS) | CIRI Member |
              Fully Insured
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
