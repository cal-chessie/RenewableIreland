"use client";

import { useState, useCallback } from "react";
import styles from "@/app/counties/[county]/page.module.css";

interface CalculatorClientProps {
  isNI: boolean;
  countyName: string;
}

export default function CalculatorClient({ isNI, countyName }: CalculatorClientProps) {
  const [systemSize, setSystemSize] = useState("6");
  const [rate, setRate] = useState(isNI ? "30" : "35");
  const [usage, setUsage] = useState("4200");
  const [exportRate, setExportRate] = useState(isNI ? "10" : "21");
  const [showResult, setShowResult] = useState(false);
  const [annualSaving, setAnnualSaving] = useState(0);
  const [systemGen, setSystemGen] = useState(0);
  const [exportEarning, setExportEarning] = useState(0);
  const [selfConsumptionSaving, setSelfConsumptionSaving] = useState(0);

  const cur = isNI ? "£" : "€";

  const handleCalculate = () => {
    const size = parseFloat(systemSize);
    const elecRate = parseFloat(rate) / 100;
    const annualUsage = parseFloat(usage);
    const expRate = parseFloat(exportRate) / 100;

    const genPerKw = isNI ? 850 : 920;
    const totalGen = size * genPerKw;
    const selfConsumption = 0.4;
    const selfConsumed = totalGen * selfConsumption;
    const exported = totalGen * (1 - selfConsumption);

    const selfSaving = selfConsumed * elecRate;
    const expSaving = exported * expRate;
    const totalSaving = selfSaving + expSaving;

    setSystemGen(Math.round(totalGen));
    setSelfConsumptionSaving(Math.round(selfSaving));
    setExportEarning(Math.round(expSaving));
    setAnnualSaving(Math.round(totalSaving));
    setShowResult(true);
  };

  return (
    <div className={styles.calculatorCard}>
      <div className={styles.calcField}>
        <label htmlFor="calc-system">System Size</label>
        <select
          id="calc-system"
          value={systemSize}
          onChange={(e) => setSystemSize(e.target.value)}
        >
          <option value="4">4kWp (10 panels) — Ideal for small homes</option>
          <option value="6">6kWp (14 panels) — Most popular for 3-bed homes</option>
          <option value="8">8kWp (18 panels) — Large homes &amp; high usage</option>
          <option value="10">10kWp (22 panels) — Maximum generation</option>
        </select>
      </div>
      <div className={styles.calcField}>
        <label htmlFor="calc-rate">Electricity Rate (pence/kWh)</label>
        <input
          type="number"
          id="calc-rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          min="10"
          max="80"
          step="1"
          autoComplete="off"
        />
        <span className={styles.calcHint}>Check your bill for your current rate</span>
      </div>
      <div className={styles.calcField}>
        <label htmlFor="calc-usage">Annual Electricity Usage (kWh)</label>
        <input
          type="number"
          id="calc-usage"
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
          min="1000"
          max="20000"
          step="100"
          autoComplete="off"
        />
        <span className={styles.calcHint}>
          Average {isNI ? "NI" : "Irish"} home: 4,200 kWh/year
        </span>
      </div>
      <div className={styles.calcField}>
        <label htmlFor="calc-export">
          Export Tariff (pence/kWh)
        </label>
        <input
          type="number"
          id="calc-export"
          value={exportRate}
          onChange={(e) => setExportRate(e.target.value)}
          min="0"
          max="40"
          step="1"
          autoComplete="off"
        />
        <span className={styles.calcHint}>
          {isNI
            ? "Smart Export Guarantee rate (typically 5-15p)"
            : "Clean Export Guarantee rate (typically 21p)"}
        </span>
      </div>
      <button
        className={`${styles.btn} ${styles.btnPrimary}`}
        onClick={handleCalculate}
        style={{ width: "100%" }}
      >
        Calculate My Savings
      </button>
      <div
        className={`${styles.calcResult} ${!showResult ? styles.calcResultHidden : ""}`}
        role="status"
        aria-live="polite"
      >
        <div className={styles.calcSavings}>
          {cur}{annualSaving.toLocaleString()}
        </div>
        <div style={{ color: "var(--black)", fontWeight: 600, marginBottom: 8, fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: ".04em" }}>
          Estimated Annual Savings
        </div>
        <div className={styles.calcDetail}>
          System generates ~{systemGen.toLocaleString()} kWh/year<br />
          Self-consumption savings: {cur}{selfConsumptionSaving.toLocaleString()}/year<br />
          Export earnings: {cur}{exportEarning.toLocaleString()}/year
        </div>
      </div>
    </div>
  );
}
