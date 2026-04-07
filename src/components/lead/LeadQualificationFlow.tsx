"use client";

import React, { useMemo, useState } from "react";
import { useLeadFlow } from "./LeadFlowProvider";
import { ALL_COUNTIES } from "@/lib/eircode";
import "./lead-flow.css";

// ─── Icons (inline SVG for zero dependencies) ───
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const CheckIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
);

const BoltIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);

const LeafIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L8 20"/><path d="M11 2.25c0 0-3.8 7.81 1.72 13.24C18.39 21.22 22 14 22 14s-3.8-7.81-11-11.75z"/><path d="M11 2.25c0 0 3.8 7.81 11 11.75"/></svg>
);

const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

// ─── Bill Range Options ───
const BILL_RANGES_IE = [
  { label: "Under €100", value: "75" },
  { label: "€100 – €150", value: "125" },
  { label: "€150 – €200", value: "175" },
  { label: "€200 – €300", value: "250" },
  { label: "€300+", value: "350" },
];

const BILL_RANGES_GB = [
  { label: "Under £100", value: "75" },
  { label: "£100 – £150", value: "125" },
  { label: "£150 – £200", value: "175" },
  { label: "£200 – £300", value: "250" },
  { label: "£300+", value: "350" },
];

// ─── Home Types ───
const HOME_TYPES = [
  "Detached House",
  "Semi-Detached",
  "Terraced",
  "Bungalow",
  "Apartment",
];

// ─── Main Component ───
export function LeadQualificationFlow() {
  const {
    isOpen,
    currentStep,
    formData,
    isSubmitting,
    submitResult,
    direction,
    closeLeadFlow,
    nextStep,
    prevStep,
    updateFormData,
    detectCounty,
    computeSavings,
    submitLead,
    resetFlow,
  } = useLeadFlow();

  const billRanges = formData.country === "GB" ? BILL_RANGES_GB : BILL_RANGES_IE;
  const currencySymbol = formData.country === "GB" ? "£" : "€";

  const progressPercent = useMemo(() => {
    if (currentStep === 5) return 100;
    return (currentStep / 4) * 100;
  }, [currentStep]);

  if (!isOpen) return null;

  return (
    <div className="lead-overlay" role="dialog" aria-modal="true" aria-label="Lead Qualification">
      <div className="lead-modal">
        {/* Progress Bar */}
        <div className="lead-progress">
          <div className="lead-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <span className="lead-progress-text">
          {currentStep < 5 ? `Step ${currentStep} of 4` : "Complete"}
        </span>

        {/* Close Button */}
        <button className="lead-close-btn" onClick={closeLeadFlow} aria-label="Close">
          <XIcon />
        </button>

        {/* Step 1: Location Detection */}
        {currentStep === 1 && <Step1 direction={direction} />}

        {/* Step 2: Energy Usage */}
        {currentStep === 2 && <Step2 direction={direction} />}

        {/* Step 3: Personalised Results */}
        {currentStep === 3 && <Step3 direction={direction} />}

        {/* Step 4: Book Survey */}
        {currentStep === 4 && <Step4 direction={direction} />}

        {/* Step 5: Success */}
        {currentStep === 5 && <Step5 />}
      </div>
    </div>
  );
}

// ─── Step 1: Location Detection ───
function Step1({ direction }: { direction: "forward" | "back" }) {
  const { formData, nextStep, updateFormData, detectCounty } = useLeadFlow();
  const [postcodeInput, setPostcodeInput] = useState(formData.postcode);
  const [error, setError] = useState("");
  const [selectedCounty, setSelectedCounty] = useState(formData.county);

  function handlePostcodeChange(value: string) {
    setPostcodeInput(value);
    setError("");

    if (value.length >= 3) {
      detectCounty(value);
    }
  }

  // Sync county detection from context
  React.useEffect(() => {
    if (formData.countyDetected && formData.county) {
      setSelectedCounty(formData.county);
    }
  }, [formData.countyDetected, formData.county]);

  function handleContinue() {
    if (!postcodeInput.trim()) {
      setError("Please enter your Eircode or postcode");
      return;
    }

    if (!selectedCounty && formData.country === "IE") {
      setError("Please select your county");
      return;
    }

    updateFormData({
      postcode: postcodeInput,
      county: selectedCounty || formData.county,
    });
    nextStep();
  }

  return (
    <div className={`lead-step ${direction === "back" ? "slide-back" : ""}`}>
      {/* Back button (hidden on step 1 but structure preserved) */}

      <div className="lead-map-pin">
        <MapPinIcon />
      </div>

      <h2 className="lead-heading">Let&apos;s Find Your Perfect Solar System</h2>
      <p className="lead-subheading">First, where are you located?</p>

      <div className="lead-form-group">
        <label className="lead-label" htmlFor="lead-postcode">
          {formData.country === "GB" ? "UK Postcode (e.g. BT7 1NN)" : "Eircode (e.g. D18 A4K9)"}
        </label>
        <input
          id="lead-postcode"
          type="text"
          className={`lead-input ${error ? "error" : ""}`}
          placeholder={formData.country === "GB" ? "Enter your postcode..." : "Enter your Eircode..."}
          value={postcodeInput}
          onChange={(e) => handlePostcodeChange(e.target.value)}
          autoComplete="postal-code"
        />
        {error && <p className="lead-error-msg">{error}</p>}

        {formData.countyDetected && formData.county && (
          <div className="lead-county-detected">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
            County {formData.county} detected
          </div>
        )}
      </div>

      {/* County Dropdown (fallback) */}
      {!formData.countyDetected && (
        <div className="lead-form-group">
          <label className="lead-label" htmlFor="lead-county">Select Your County</label>
          <select
            id="lead-county"
            className="lead-input lead-input-select"
            value={selectedCounty}
            onChange={(e) => {
              setSelectedCounty(e.target.value);
              updateFormData({ county: e.target.value, country: e.target.value === "" ? formData.country : formData.country });
            }}
          >
            <option value="">Choose a county...</option>
            {ALL_COUNTIES.map((county) => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
        </div>
      )}

      <button className="lead-btn-primary" onClick={handleContinue}>
        Continue <ArrowRightIcon />
      </button>
    </div>
  );
}

// ─── Step 2: Energy Usage ───
function Step2({ direction }: { direction: "forward" | "back" }) {
  const { formData, nextStep, prevStep, updateFormData, computeSavings } = useLeadFlow();
  const [customAmount, setCustomAmount] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [error, setError] = useState("");
  const billRanges = formData.country === "GB" ? BILL_RANGES_GB : BILL_RANGES_IE;

  function handleBillRangeClick(value: string, label: string) {
    setShowCustom(false);
    setCustomAmount("");
    updateFormData({ billRange: value, billAmount: value });
    setError("");
  }

  function handleCustomAmountChange(value: string) {
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setCustomAmount(value);
      updateFormData({ billAmount: value, billRange: "" });
      setError("");
    }
  }

  function handleContinue() {
    if (!formData.billAmount && !customAmount) {
      setError("Please select your monthly electricity bill range");
      return;
    }
    if (!formData.homeType) {
      setError("Please select your home type");
      return;
    }

    const bill = customAmount || formData.billAmount;
    updateFormData({ billAmount: bill });
    computeSavings();
    nextStep();
  }

  return (
    <div className={`lead-step ${direction === "back" ? "slide-back" : ""}`}>
      <button className="lead-btn-back" onClick={prevStep}>
        <ArrowLeftIcon /> Back
      </button>

      <h2 className="lead-heading">Tell Us About Your Energy Usage</h2>
      <p className="lead-subheading">This helps us size your system perfectly</p>

      <div className="lead-form-group">
        <label className="lead-label">Monthly Electricity Bill</label>

        {!showCustom ? (
          <>
            <div className="lead-options-grid cols-2">
              {billRanges.map((range) => (
                <button
                  key={range.value}
                  className={`lead-option-btn ${formData.billRange === range.value ? "selected" : ""}`}
                  onClick={() => handleBillRangeClick(range.value, range.label)}
                >
                  {range.label}
                </button>
              ))}
              <button
                className={`lead-option-btn ${showCustom ? "selected" : ""}`}
                onClick={() => setShowCustom(true)}
                style={{ borderStyle: "dashed" }}
              >
                Custom Amount
              </button>
            </div>

            {showCustom && (
              <input
                type="text"
                className="lead-input"
                placeholder={`Enter exact amount (${formData.country === "GB" ? "£" : "€"})`}
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                style={{ marginTop: "10px" }}
                autoFocus
              />
            )}
          </>
        ) : (
          <div>
            <input
              type="text"
              className="lead-input"
              placeholder={`Enter exact amount (${formData.country === "GB" ? "£" : "€"})`}
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              autoFocus
            />
            <button
              className="lead-btn-back"
              onClick={() => { setShowCustom(false); setCustomAmount(""); }}
              style={{ marginTop: "8px", fontSize: "13px" }}
            >
              ← Back to ranges
            </button>
          </div>
        )}
      </div>

      <div className="lead-form-group">
        <label className="lead-label">Home Type</label>
        <div className="lead-options-grid cols-2">
          {HOME_TYPES.map((type) => (
            <button
              key={type}
              className={`lead-option-btn ${formData.homeType === type ? "selected" : ""}`}
              onClick={() => { updateFormData({ homeType: type }); setError(""); }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="lead-error-msg" style={{ marginBottom: "16px" }}>{error}</p>}

      <button className="lead-btn-primary" onClick={handleContinue}>
        See My Results <ArrowRightIcon />
      </button>
    </div>
  );
}

// ─── Step 3: Personalised Results ───
function Step3({ direction }: { direction: "forward" | "back" }) {
  const { formData, nextStep, prevStep } = useLeadFlow();
  const result = formData.savingsResult;

  if (!result) return null;

  const annualBill = parseFloat(formData.billAmount) * 12;
  const annualAfterSavings = annualBill - result.annualSavings;
  const billBarWidth = 100;
  const savingsBarWidth = Math.max(10, (annualAfterSavings / annualBill) * 100);

  return (
    <div className={`lead-step ${direction === "back" ? "slide-back" : ""}`}>
      <button className="lead-btn-back" onClick={prevStep}>
        <ArrowLeftIcon /> Back
      </button>

      <h2 className="lead-heading">Here&apos;s Your Solar Recommendation</h2>
      <p className="lead-subheading">
        Based on your {result.currencySymbol}{formData.billAmount}/month bill in {formData.county || "your area"}
      </p>

      {/* Grant Banner */}
      <div className="lead-grant-banner">
        <div className="lead-grant-banner-icon">
          <BoltIcon />
        </div>
        <div className="lead-grant-banner-text">
          <strong>{result.grantLabel}</strong> — {result.country === "IE"
            ? "The SEAI Domestic Solar PV Grant covers €1,800 of your installation cost. We handle the application for you."
            : "Earn money from surplus energy exported to the grid through the Smart Export Guarantee."
          }
        </div>
      </div>

      {/* Results Grid */}
      <div className="lead-results-grid">
        <div className="lead-result-card highlight">
          <div className="lead-result-label">Recommended System</div>
          <div className="lead-result-value accent">{result.recommendedSystem}</div>
          <div className="lead-result-unit" style={{ marginTop: "4px" }}>{result.panels} solar panels</div>
        </div>

        <div className="lead-result-card highlight">
          <div className="lead-result-label">Annual Savings</div>
          <div className="lead-result-value accent">
            {result.currencySymbol}{result.annualSavings.toLocaleString()}
          </div>
          <div className="lead-result-unit" style={{ marginTop: "4px" }}>per year</div>
        </div>

        <div className="lead-result-card">
          <div className="lead-result-label">Cost After Grant</div>
          <div className="lead-result-value">
            {result.currencySymbol}{result.costAfterGrant.toLocaleString()}
          </div>
        </div>

        <div className="lead-result-card">
          <div className="lead-result-label">Payback Period</div>
          <div className="lead-result-value success">
            {result.paybackYears} <span className="lead-result-unit">years</span>
          </div>
        </div>

        <div className="lead-result-card">
          <div className="lead-result-label">25-Year Savings</div>
          <div className="lead-result-value">
            {result.currencySymbol}{result.lifetimeSavings25yr.toLocaleString()}
          </div>
        </div>

        <div className="lead-result-card">
          <div className="lead-result-label">CO₂ Offset / Year</div>
          <div className="lead-result-value success">
            {result.co2OffsetTonnes} <span className="lead-result-unit">tonnes</span>
          </div>
        </div>
      </div>

      {/* Savings Chart */}
      <div className="lead-savings-chart">
        <div className="lead-chart-label">Annual Electricity Cost — Before vs After Solar</div>

        <div className="lead-chart-bar-container">
          <span className="lead-chart-bar-label">Before</span>
          <div className="lead-chart-bar-track">
            <div className="lead-chart-bar-fill before" style={{ width: `${billBarWidth}%` }}>
              {result.currencySymbol}{annualBill.toLocaleString()}
            </div>
          </div>
          <span className="lead-chart-bar-amount">
            {result.currencySymbol}{annualBill.toLocaleString()}
          </span>
        </div>

        <div className="lead-chart-bar-container">
          <span className="lead-chart-bar-label">After</span>
          <div className="lead-chart-bar-track">
            <div className="lead-chart-bar-fill after" style={{ width: `${savingsBarWidth}%` }}>
              {result.currencySymbol}{Math.round(annualAfterSavings).toLocaleString()}
            </div>
          </div>
          <span className="lead-chart-bar-amount" style={{ color: "var(--lead-accent)" }}>
            {result.currencySymbol}{Math.round(annualAfterSavings).toLocaleString()}
          </span>
        </div>

        <div style={{ marginTop: "12px", fontSize: "14px", color: "var(--lead-accent)", fontWeight: 600 }}>
          Saving {result.currencySymbol}{result.annualSavings.toLocaleString()} per year ({Math.round((result.annualSavings / annualBill) * 100)}%)
        </div>
      </div>

      {/* Annual Generation */}
      <div className="lead-result-card full-width" style={{ marginBottom: "24px" }}>
        <div className="lead-result-label">Estimated Annual Generation</div>
        <div className="lead-result-value" style={{ fontSize: "22px" }}>
          {result.annualGeneration.toLocaleString()} <span className="lead-result-unit">kWh/year</span>
        </div>
      </div>

      <button className="lead-btn-primary" onClick={nextStep}>
        Book Your Free Survey <ArrowRightIcon />
      </button>
    </div>
  );
}

// ─── Step 4: Book Your Free Survey ───
function Step4({ direction }: { direction: "forward" | "back" }) {
  const { formData, prevStep, updateFormData, submitLead, isSubmitting, submitResult } = useLeadFlow();

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Min date: 2 days from today
  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  }, []);

  function validate(): boolean {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) errs.fullName = "Please enter your full name";
    else if (formData.fullName.trim().length < 2) errs.fullName = "Name must be at least 2 characters";

    if (!formData.phone.trim()) errs.phone = "Please enter your phone number";
    else {
      const phoneRegex = formData.country === "GB"
        ? /^(\+44|0)\s?\d{3,4}\s?\d{5,6}$/
        : /^(\+353|0)\s?\d{1,2}\s?\d{3,4}\s?\d{4}$/;
      if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ""))) {
        errs.phone = formData.country === "GB"
          ? "Please enter a valid UK phone number (e.g. 07XXX XXXXXX)"
          : "Please enter a valid Irish phone number (e.g. 08X XXX XXXX)";
      }
    }

    if (!formData.email.trim()) errs.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Please enter a valid email address";

    if (!formData.address.trim()) errs.address = "Please enter your address";

    if (!formData.surveyDate) errs.surveyDate = "Please select a survey date";
    else if (formData.surveyDate < minDate) errs.surveyDate = "Survey date must be at least 2 days from today";

    if (!formData.surveyTime) errs.surveyTime = "Please select a time slot";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      submitLead();
    }
  }

  return (
    <div className={`lead-step ${direction === "back" ? "slide-back" : ""}`}>
      <button className="lead-btn-back" onClick={prevStep}>
        <ArrowLeftIcon /> Back
      </button>

      <h2 className="lead-heading">Book Your Free Roof Survey</h2>
      <p className="lead-subheading">
        Our surveyor will visit your home, assess your roof, and provide a detailed quote — completely free
      </p>

      {submitResult && !submitResult.success && (
        <div style={{ padding: "12px 16px", marginBottom: "16px", borderRadius: "10px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "var(--lead-error)", fontSize: "14px" }}>
          {submitResult.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="lead-form-group">
          <label className="lead-label" htmlFor="lead-name">Full Name *</label>
          <input
            id="lead-name"
            type="text"
            className={`lead-input ${errors.fullName ? "error" : ""}`}
            placeholder="John O'Brien"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            autoComplete="name"
          />
          {errors.fullName && <p className="lead-error-msg">{errors.fullName}</p>}
        </div>

        <div className="lead-form-row">
          <div className="lead-form-group">
            <label className="lead-label" htmlFor="lead-phone">Phone Number *</label>
            <input
              id="lead-phone"
              type="tel"
              className={`lead-input ${errors.phone ? "error" : ""}`}
              placeholder={formData.country === "GB" ? "07XXX XXXXXX" : "08X XXX XXXX"}
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              autoComplete="tel"
            />
            {errors.phone && <p className="lead-error-msg">{errors.phone}</p>}
          </div>

          <div className="lead-form-group">
            <label className="lead-label" htmlFor="lead-email">Email *</label>
            <input
              id="lead-email"
              type="email"
              className={`lead-input ${errors.email ? "error" : ""}`}
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              autoComplete="email"
            />
            {errors.email && <p className="lead-error-msg">{errors.email}</p>}
          </div>
        </div>

        <div className="lead-form-group">
          <label className="lead-label" htmlFor="lead-address">Address *</label>
          <input
            id="lead-address"
            type="text"
            className={`lead-input ${errors.address ? "error" : ""}`}
            placeholder="12 Main Street, Town..."
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            autoComplete="street-address"
          />
          {errors.address && <p className="lead-error-msg">{errors.address}</p>}
        </div>

        <div className="lead-form-row">
          <div className="lead-form-group">
            <label className="lead-label" htmlFor="lead-date">Preferred Date *</label>
            <input
              id="lead-date"
              type="date"
              className={`lead-input ${errors.surveyDate ? "error" : ""}`}
              min={minDate}
              value={formData.surveyDate}
              onChange={(e) => updateFormData({ surveyDate: e.target.value })}
            />
            {errors.surveyDate && <p className="lead-error-msg">{errors.surveyDate}</p>}
          </div>

          <div className="lead-form-group">
            <label className="lead-label">Preferred Time *</label>
            <div className="lead-radio-group">
              <div className="lead-radio-option">
                <input
                  type="radio"
                  id="lead-time-morning"
                  name="surveyTime"
                  value="morning"
                  checked={formData.surveyTime === "morning"}
                  onChange={() => updateFormData({ surveyTime: "morning" })}
                />
                <label className="lead-radio-label" htmlFor="lead-time-morning">
                  <span className="lead-radio-dot" />
                  Morning (8–12)
                </label>
              </div>
              <div className="lead-radio-option">
                <input
                  type="radio"
                  id="lead-time-afternoon"
                  name="surveyTime"
                  value="afternoon"
                  checked={formData.surveyTime === "afternoon"}
                  onChange={() => updateFormData({ surveyTime: "afternoon" })}
                />
                <label className="lead-radio-label" htmlFor="lead-time-afternoon">
                  <span className="lead-radio-dot" />
                  Afternoon (12–5)
                </label>
              </div>
            </div>
            {errors.surveyTime && <p className="lead-error-msg">{errors.surveyTime}</p>}
          </div>
        </div>

        <div className="lead-form-group">
          <label className="lead-label" htmlFor="lead-notes">Notes (Optional)</label>
          <textarea
            id="lead-notes"
            className="lead-input lead-textarea"
            placeholder="Anything else we should know? (roof type, shading, etc.)"
            value={formData.notes}
            onChange={(e) => updateFormData({ notes: e.target.value })}
            rows={3}
          />
        </div>

        <button
          type="submit"
          className={`lead-btn-primary ${isSubmitting ? "loading" : ""}`}
          disabled={isSubmitting}
        >
          Confirm My Free Survey
        </button>

        <div className="lead-privacy">
          <ShieldIcon />
          <span>
            We&apos;ll never share your data. See our{" "}
            <a href="/counties/dublin/privacy-policy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>.
          </span>
        </div>
      </form>
    </div>
  );
}

// ─── Step 5: Success ───
function Step5() {
  const { submitResult, closeLeadFlow } = useLeadFlow();

  return (
    <div className="lead-success">
      <div className="lead-success-icon">
        <CheckIcon />
      </div>

      <h2 className="lead-success-title">Survey Booked!</h2>
      <p className="lead-subheading" style={{ margin: "0 0 4px", color: "var(--lead-text-muted)" }}>
        Your free roof survey has been confirmed
      </p>

      {submitResult?.reference && (
        <div className="lead-success-ref">
          Ref: {submitResult.reference}
        </div>
      )}

      <p className="lead-success-message">
        One of our certified surveyors will contact you within 24 hours to confirm your appointment.
        They&apos;ll assess your roof, discuss the best system for your home, and provide a detailed
        no-obligation quote.
      </p>

      <button className="lead-btn-primary" onClick={closeLeadFlow} style={{ maxWidth: "280px" }}>
        Close
      </button>
    </div>
  );
}


