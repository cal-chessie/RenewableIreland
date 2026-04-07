"use client";

import { useState, useCallback, useRef } from "react";
import { Download, Share2, Copy, Phone } from "lucide-react";
import ROICertificate, { type CertificateData } from "@/components/roi/ROICertificate";
import styles from "@/app/roi-calculator/page.module.css";

const COUNTY_LIST = [
  "Antrim", "Armagh", "Carlow", "Cavan", "Clare", "Cork", "Derry",
  "Donegal", "Down", "Dublin", "Fermanagh", "Galway", "Kerry", "Kildare",
  "Kilkenny", "Laois", "Leitrim", "Limerick", "Longford", "Louth",
  "Mayo", "Meath", "Monaghan", "Offaly", "Roscommon", "Sligo",
  "Tipperary", "Tyrone", "Waterford", "Westmeath", "Wexford", "Wicklow",
];

const HOME_TYPES = ["Detached", "Semi", "Terraced", "Bungalow"];
const SYSTEM_SIZES = [
  { value: "4kWp", label: "4kWp", panels: "10 panels" },
  { value: "6kWp", label: "6kWp", panels: "14 panels" },
  { value: "8kWp", label: "8kWp", panels: "18 panels" },
];

export default function ROICalculatorPage() {
  /* ----- State ----- */
  const [fullName, setFullName] = useState("");
  const [county, setCounty] = useState("");
  const [systemSize, setSystemSize] = useState("6kWp");
  const [billAmount, setBillAmount] = useState(150);
  const [homeType, setHomeType] = useState("Detached");
  const [loading, setLoading] = useState(false);
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [toastMsg, setToastMsg] = useState("");
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ----- Toast ----- */
  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMsg(""), 3000);
  }, []);

  /* ----- Generate Certificate ----- */
  const handleGenerate = useCallback(async () => {
    if (!fullName.trim()) {
      showToast("Please enter your full name");
      return;
    }
    if (!county) {
      showToast("Please select your county");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/roi-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: fullName.trim(), county, homeType, systemSize, billAmount }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Generation failed");
      }

      const json = await res.json();
      if (json.success && json.data) {
        setCertificateData(json.data);
        // Scroll to results
        setTimeout(() => {
          document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } catch (err) {
      console.error(err);
      showToast("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [fullName, county, homeType, systemSize, billAmount, showToast]);

  /* ----- Download PDF via print ----- */
  const handleDownloadPDF = useCallback(() => {
    const certEl = document.getElementById("roi-certificate");
    if (!certEl) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      showToast("Please allow popups to download PDF");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Solar ROI Certificate - ${certificateData?.fullName || "Renewable Ireland"}</title>
          <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&display=swap" rel="stylesheet">
          <style>
            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
            body { background: #fff; font-family: 'Barlow Condensed', 'Arial Narrow', Arial, sans-serif; }
            @page { size: A4; margin: 10mm; }
            ${document.querySelector('#cert-print-styles')?.textContent || ''}
          </style>
        </head>
        <body>
          ${certEl.outerHTML}
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }, [certificateData]);

  /* ----- Share on WhatsApp ----- */
  const handleWhatsAppShare = useCallback(() => {
    if (!certificateData) return;
    const r = certificateData.result;
    const text = [
      `☀️ My Solar ROI Certificate - Renewable Ireland`,
      ``,
      `I just generated my personalised solar savings certificate!`,
      ``,
      `📊 System: ${certificateData.systemSize}`,
      `💰 Annual Savings: ${r.currencySymbol}${Math.round(r.annualSavings).toLocaleString()}`,
      `⏱️ Payback: ${r.paybackYears} years`,
      `🌿 CO₂ Offset: ${r.co2OffsetTonnes} tonnes/year`,
      `💵 25-Year Savings: ${r.currencySymbol}${r.lifetimeSavings25yr.toLocaleString()}`,
      ``,
      `Get yours: https://renewableireland.ie`,
    ].join("\n");

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [certificateData]);

  /* ----- Copy to Clipboard ----- */
  const handleCopy = useCallback(async () => {
    if (!certificateData) return;
    const r = certificateData.result;
    const text = `My Solar ROI Certificate | System: ${certificateData.systemSize} | Annual Savings: ${r.currencySymbol}${Math.round(r.annualSavings).toLocaleString()} | Payback: ${r.paybackYears} years | 25-Year Savings: ${r.currencySymbol}${r.lifetimeSavings25yr.toLocaleString()} | Get yours at renewableireland.ie`;

    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard!");
    } catch {
      showToast("Could not copy to clipboard");
    }
  }, [certificateData, showToast]);

  /* ----- Render ----- */
  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.pageContainer}>
          {/* Hero */}
          <section className={styles.heroSection} aria-label="Solar ROI Calculator">
            <div className={styles.heroBadge}>FREE ROI CERTIFICATE</div>
            <h1 className={styles.heroTitle}>
              See Your <span className={styles.lime}>25-Year Solar Savings</span>
            </h1>
            <p className={styles.heroDesc}>
              Generate a personalised ROI guarantee certificate. Enter your details
              below to see your projected annual savings, payback period, and
              lifetime returns.
            </p>
          </section>

          {/* Form Card */}
          <section className={styles.formCard} aria-label="Calculator form">
            <h2 className={styles.formTitle}>Generate Your Free Certificate</h2>
            <div className={styles.formGrid}>
              {/* Full Name */}
              <div className={styles.formField}>
                <label htmlFor="fullName" className={styles.formLabel}>Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  className={styles.formInput}
                  placeholder="e.g. John Murphy"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              {/* County */}
              <div className={styles.formField}>
                <label htmlFor="county" className={styles.formLabel}>County</label>
                <select
                  id="county"
                  className={styles.formSelect}
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                >
                  <option value="">Select your county...</option>
                  {COUNTY_LIST.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* System Size */}
              <div className={`${styles.formField} ${styles.formFieldFull}`}>
                <span className={styles.formLabel}>System Size</span>
                <div className={styles.radioGroup} role="radiogroup" aria-label="System size selection">
                  {SYSTEM_SIZES.map((s) => (
                    <div key={s.value} className={styles.radioOption}>
                      <input
                        type="radio"
                        id={`size-${s.value}`}
                        name="systemSize"
                        value={s.value}
                        checked={systemSize === s.value}
                        onChange={(e) => setSystemSize(e.target.value)}
                      />
                      <label htmlFor={`size-${s.value}`} className={styles.radioLabel}>
                        <span className={styles.radioSizeLabel}>{s.label}</span>
                        <span className={styles.radioPanels}>{s.panels}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Bill Slider */}
              <div className={`${styles.formField} ${styles.formFieldFull}`}>
                <div className={styles.sliderContainer}>
                  <div className={styles.sliderHeader}>
                    <label htmlFor="billSlider" className={styles.formLabel}>Current Monthly Bill</label>
                    <span className={styles.sliderValue}>&euro;{billAmount}</span>
                  </div>
                  <input
                    id="billSlider"
                    type="range"
                    className={styles.slider}
                    min={50}
                    max={500}
                    step={10}
                    value={billAmount}
                    onChange={(e) => setBillAmount(Number(e.target.value))}
                  />
                  <div className={styles.sliderLabels}>
                    <span>&euro;50</span>
                    <span>&euro;500</span>
                  </div>
                </div>
              </div>

              {/* Home Type */}
              <div className={styles.formField}>
                <label htmlFor="homeType" className={styles.formLabel}>Home Type</label>
                <select
                  id="homeType"
                  className={styles.formSelect}
                  value={homeType}
                  onChange={(e) => setHomeType(e.target.value)}
                >
                  {HOME_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <button
              className={styles.generateBtn}
              onClick={handleGenerate}
              disabled={loading}
              aria-label="Generate My ROI Certificate"
            >
              {loading ? "Generating..." : "Generate My ROI Certificate"}
            </button>
          </section>

          {/* Loading */}
          {loading && (
            <div className={styles.loadingState} role="status" aria-live="polite">
              <div className={styles.loadingSpinner} />
              <p className={styles.loadingText}>Calculating your solar returns...</p>
            </div>
          )}

          {/* Results */}
          {certificateData && !loading && (
            <section
              id="results-section"
              className={styles.resultsSection}
              aria-label="ROI Certificate results"
            >
              <div className={styles.resultsHeader}>
                <h2 className={styles.resultsTitle}>Your ROI Certificate is Ready</h2>
                <p className={styles.resultsSubtitle}>
                  Certificate #{certificateData.certificateNumber} &mdash; {certificateData.generatedDate}
                </p>
              </div>

              {/* Quick Stats */}
              <div className={styles.summaryStats}>
                <div className={styles.summaryStat}>
                  <div className={styles.summaryStatValue}>
                    {certificateData.result.currencySymbol}{Math.round(certificateData.result.annualSavings).toLocaleString()}
                  </div>
                  <div className={styles.summaryStatLabel}>Annual Savings</div>
                </div>
                <div className={styles.summaryStat}>
                  <div className={styles.summaryStatValue}>
                    {certificateData.result.paybackYears} yrs
                  </div>
                  <div className={styles.summaryStatLabel}>Payback Period</div>
                </div>
                <div className={styles.summaryStat}>
                  <div className={styles.summaryStatValue}>
                    {certificateData.result.currencySymbol}{certificateData.result.lifetimeSavings25yr.toLocaleString()}
                  </div>
                  <div className={styles.summaryStatLabel}>25-Year Savings</div>
                </div>
              </div>

              {/* Certificate Preview */}
              <div className={styles.certPreviewWrapper}>
                <ROICertificate data={certificateData} />
              </div>

              {/* Action Buttons */}
              <div className={styles.actionButtons}>
                <button
                  className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
                  onClick={handleDownloadPDF}
                  aria-label="Download PDF certificate"
                >
                  <Download size={18} />
                  Download PDF
                </button>
                <button
                  className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}
                  onClick={handleWhatsAppShare}
                  aria-label="Share on WhatsApp"
                >
                  <Share2 size={18} />
                  Share on WhatsApp
                </button>
                <button
                  className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}
                  onClick={handleCopy}
                  aria-label="Copy results to clipboard"
                >
                  <Copy size={18} />
                  Copy Results
                </button>
              </div>

              {/* CTA */}
              <div className={styles.ctaSection}>
                <h3 className={styles.ctaTitle}>Ready to Go Solar?</h3>
                <p className={styles.ctaText}>
                  Get a free, no-obligation site survey and fixed-price quote from
                  Renewable Ireland&apos;s SEAI-certified installation team.
                </p>
                <a href="tel:+353873958424" className={styles.ctaPhone}>
                  <Phone size={20} style={{ display: "inline", verticalAlign: "middle", marginRight: 8 }} />
                  +353 87 395 8424
                </a>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Toast */}
      {toastMsg && (
        <div className={`${styles.toast} ${toastMsg ? styles.show : ""}`} role="alert" aria-live="assertive">
          {toastMsg}
        </div>
      )}
    </>
  );
}
