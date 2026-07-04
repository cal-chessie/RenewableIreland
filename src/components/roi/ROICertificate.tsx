"use client";

import type { SavingsResult } from "@/lib/savings-calculator";
import "./roi-certificate.css";

export interface CertificateData {
  fullName: string;
  county: string;
  systemSize: string;
  homeType: string;
  result: SavingsResult;
  certificateNumber: string;
  generatedDate: string;
}

function formatCurrency(value: number, symbol: string = "€"): string {
  return symbol + Math.round(value).toLocaleString("en-IE");
}

function getYearSavings(
  annualSavings: number,
  year: number,
  symbol: string
): string {
  const degradationFactor = Math.pow(0.995, year - 1);
  const yearSaving = annualSavings * degradationFactor;
  return formatCurrency(Math.round(yearSaving), symbol);
}

export default function ROICertificate({ data }: { data: CertificateData }) {
  const { fullName, county, systemSize, result, certificateNumber, generatedDate } = data;
  const cur = result.currencySymbol;

  return (
    <div className="roi-certificate" id="roi-certificate">
      {/* Top lime border */}
      <div className="cert-lime-bar" />

      <div className="cert-content">
        {/* Header */}
        <div className="cert-header">
          <span className="cert-sun-icon" aria-hidden="true">☀️</span>
          <h1 className="cert-brand">RENEWABLE IRELAND</h1>
          <p className="cert-subtitle">SOLAR ROI GUARANTEE CERTIFICATE</p>
        </div>

        {/* Divider */}
        <div className="cert-divider" />

        {/* Certification text */}
        <div className="cert-body">
          <p className="cert-intro">
            This certifies that
          </p>
          <p className="cert-name">{fullName}</p>
          <p className="cert-location">
            of <strong>{county}</strong>, Ireland
          </p>

          <p className="cert-description">
            has been quoted a <strong>{systemSize} solar panel system</strong>
            projected to deliver the following returns:
          </p>

          {/* Metric Cards Row 1 */}
          <div className="cert-cards-grid">
            <div className="cert-card">
              <div className="cert-card-label">Annual Savings</div>
              <div className="cert-card-value">{formatCurrency(result.annualSavings, cur)}</div>
              <div className="cert-card-sub">per year</div>
            </div>
            <div className="cert-card">
              <div className="cert-card-label">System Cost</div>
              <div className="cert-card-value">{formatCurrency(result.costAfterGrant, cur)}</div>
              <div className="cert-card-sub">after grant</div>
            </div>
            <div className="cert-card">
              <div className="cert-card-label">25-Year Total</div>
              <div className="cert-card-value cert-card-highlight">{formatCurrency(result.lifetimeSavings25yr, cur)}</div>
              <div className="cert-card-sub">projected savings</div>
            </div>
          </div>

          {/* Metric Cards Row 2 */}
          <div className="cert-cards-grid">
            <div className="cert-card">
              <div className="cert-card-label">Payback Period</div>
              <div className="cert-card-value">{result.paybackYears} Years</div>
              <div className="cert-card-sub">to recoup investment</div>
            </div>
            <div className="cert-card">
              <div className="cert-card-label">CO₂ Offset</div>
              <div className="cert-card-value">{result.co2OffsetTonnes} Tonnes</div>
              <div className="cert-card-sub">per year</div>
            </div>
            <div className="cert-card">
              <div className="cert-card-label">Panels Installed</div>
              <div className="cert-card-value">{result.panels}</div>
              <div className="cert-card-sub">high-efficiency panels</div>
            </div>
          </div>

          {/* 25-Year Projection Table */}
          <div className="cert-projection">
            <h3 className="cert-projection-title">25-Year Savings Projection</h3>
            <div className="cert-projection-grid">
              <div className="cert-projection-row cert-projection-header">
                <span>Year</span>
                <span>Annual Savings</span>
              </div>
              {[1, 2, 3, 4, 5, 10, 15, 20, 25].map((year, i) => (
                <div
                  key={year}
                  className={`cert-projection-row ${i % 2 === 0 ? "cert-projection-alt" : ""}`}
                >
                  <span>Year {year}</span>
                  <span>{getYearSavings(result.annualSavings, year, cur)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate meta */}
          <div className="cert-meta">
            <div className="cert-meta-row">
              <span className="cert-meta-label">Certificate #:</span>
              <span className="cert-meta-value cert-mono">{certificateNumber}</span>
            </div>
            <div className="cert-meta-row">
              <span className="cert-meta-label">Generated:</span>
              <span className="cert-meta-value">{generatedDate}</span>
            </div>
            <div className="cert-meta-row">
              <span className="cert-meta-label">Valid for 30 days from issue date</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="cert-divider" />

        {/* Footer */}
        <div className="cert-footer">
          <p className="cert-address">
            Unit 12, Sandyford Business Centre, Dublin D18 A4K9
          </p>
          <p className="cert-contact">
            hello@renewableireland.ie &nbsp;|&nbsp; +353 87 395 8424
          </p>
          <p className="cert-website">renewableireland.ie</p>
        </div>
      </div>

      {/* Bottom lime border */}
      <div className="cert-lime-bar" />
    </div>
  );
}
