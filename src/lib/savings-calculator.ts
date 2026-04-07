/**
 * Savings Calculator for Solar Panel Lead Qualification
 *
 * Calculates recommended system size, costs, savings, payback period,
 * and environmental impact based on user inputs.
 */

export interface SavingsInputs {
  billAmount: number;   // monthly in EUR or GBP
  homeType: string;     // "Detached House" | "Semi-Detached" | "Terraced" | "Bungalow" | "Apartment"
  county?: string;
  country: "IE" | "GB"; // Republic of Ireland or Northern Ireland
}

export interface SavingsResult {
  recommendedSystem: string;     // "4kWp" | "6kWp" | "8kWp"
  systemCost: number;            // full system cost before grant
  grantAmount: number;           // SEAI grant (ROI) or 0 (NI)
  costAfterGrant: number;        // net cost
  annualSavings: number;         // estimated annual electricity savings
  paybackYears: number;          // years to recoup investment
  lifetimeSavings25yr: number;   // total projected savings over 25 years
  co2OffsetTonnes: number;       // annual CO₂ offset in tonnes
  panels: number;                // number of solar panels
  annualGeneration: number;      // estimated annual generation in kWh
  currencySymbol: string;        // "€" or "£"
  grantLabel: string;            // "SEAI €1,800 Grant" or "SEG Payments"
  country: "IE" | "GB";
}

// ─── System sizing based on monthly bill ───
function getSystemSize(billAmount: number, homeType: string): "4kWp" | "6kWp" | "8kWp" {
  // Base recommendation on bill amount
  // Apartments are capped at 4kWp regardless
  if (homeType === "Apartment") return "4kWp";

  if (billAmount < 100) return "4kWp";
  if (billAmount <= 200) return "6kWp";
  return "8kWp";
}

// ─── System details ───
interface SystemSpec {
  panels: number;
  roiCost: number;         // cost in EUR
  niCost: number;          // cost in GBP
  annualGenROI: number;    // kWh for ROI
  annualGenNI: number;     // kWh for NI
}

const SYSTEM_SPECS: Record<string, SystemSpec> = {
  "4kWp": {
    panels: 10,
    roiCost: 4500,
    niCost: 6000,
    annualGenROI: 3400,
    annualGenNI: 3200,
  },
  "6kWp": {
    panels: 14,
    roiCost: 5500,
    niCost: 8500,
    annualGenNI: 4800,
    annualGenROI: 5100,
  },
  "8kWp": {
    panels: 18,
    roiCost: 6500,
    niCost: 13000,
    annualGenROI: 6800,
    annualGenNI: 6400,
  },
};

// ─── ROI-specific values ───
const ROI_GRANT = 1800;           // SEAI grant in EUR
const ROI_EXPORT_RATE = 0.21;     // Clean Export Guarantee rate per kWh (EUR)
const ROI_IMPORT_RATE = 0.25;     // average electricity import rate per kWh (EUR)

// ─── NI-specific values ───
const NI_SEG_RATE = 0.05;         // Smart Export Guarantee average rate per kWh (GBP)
const NI_IMPORT_RATE = 0.28;      // average electricity import rate per kWh (GBP)

// CO₂ offset: 0.42 kg CO₂ per kWh generated (Irish/NI grid average)
const CO2_PER_KWH = 0.42;

/**
 * Calculate savings and system recommendation based on user inputs.
 */
export function calculateSavings(inputs: SavingsInputs): SavingsResult {
  const { billAmount, homeType, country } = inputs;
  const recommendedSystem = getSystemSize(billAmount, homeType);
  const spec = SYSTEM_SPECS[recommendedSystem];

  const currencySymbol = country === "IE" ? "€" : "£";
  const annualBill = billAmount * 12;

  let systemCost: number;
  let grantAmount: number;
  let annualSavings: number;
  let annualGeneration: number;

  if (country === "IE") {
    // Republic of Ireland calculations
    systemCost = spec.roiCost;
    grantAmount = ROI_GRANT;
    annualGeneration = spec.annualGenROI;

    // Self-consumption: ~50-60% of generated electricity is used directly
    const selfConsumptionRate = 0.55;
    const selfConsumptionKwh = annualGeneration * selfConsumptionRate;
    const exportKwh = annualGeneration * (1 - selfConsumptionRate);

    // Annual savings = self-consumed electricity value + export payments
    const selfConsumptionSavings = selfConsumptionKwh * ROI_IMPORT_RATE;
    const exportEarnings = exportKwh * ROI_EXPORT_RATE;
    annualSavings = Math.round((selfConsumptionSavings + exportEarnings) * 100) / 100;
  } else {
    // Northern Ireland calculations
    systemCost = spec.niCost;
    grantAmount = 0; // No upfront grant in NI
    annualGeneration = spec.annualGenNI;

    // Self-consumption: ~50-60%
    const selfConsumptionRate = 0.55;
    const selfConsumptionKwh = annualGeneration * selfConsumptionRate;
    const exportKwh = annualGeneration * (1 - selfConsumptionRate);

    // Annual savings = self-consumed electricity value + SEG payments
    const selfConsumptionSavings = selfConsumptionKwh * NI_IMPORT_RATE;
    const segEarnings = exportKwh * NI_SEG_RATE;
    annualSavings = Math.round((selfConsumptionSavings + segEarnings) * 100) / 100;
  }

  const costAfterGrant = systemCost - grantAmount;
  const paybackYears = annualSavings > 0
    ? Math.ceil((costAfterGrant / annualSavings) * 10) / 10
    : 99;

  // 25-year lifetime savings (accounting for ~0.5% annual degradation)
  let lifetimeSavings = 0;
  for (let year = 1; year <= 25; year++) {
    const degradationFactor = Math.pow(0.995, year - 1);
    lifetimeSavings += annualSavings * degradationFactor;
  }
  lifetimeSavings = Math.round(lifetimeSavings);

  const co2OffsetTonnes = Math.round((annualGeneration * CO2_PER_KWH) / 1000 * 10) / 10;

  const grantLabel = country === "IE"
    ? "SEAI €1,800 Grant"
    : "SEG Export Payments";

  return {
    recommendedSystem,
    systemCost,
    grantAmount,
    costAfterGrant,
    annualSavings,
    paybackYears,
    lifetimeSavings25yr: lifetimeSavings,
    co2OffsetTonnes,
    panels: spec.panels,
    annualGeneration,
    currencySymbol,
    grantLabel,
    country,
  };
}
