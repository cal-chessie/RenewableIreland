// ============================================================
// Estimate Engine — ONE SOURCE OF TRUTH for the numbers
// Pure TypeScript. Zero dependencies.
// Ported from AISolar for native client-side use.
// ============================================================

// ---------- Types ----------

export interface EstimateInputs {
  monthlyBill: number;
  annualKwh?: number | null;
  specificYield?: number | null;
  county?: string | null;
  includeBattery?: boolean;
  roofCapKwp?: number | null;
  config?: Partial<EstimateConfig>;
}

export interface EstimateConfig {
  retailRate: number;
  exportRate: number;
  costPerKwp: number;
  batteryCost: number;
  selfConsumptionNoBattery: number;
  selfConsumptionWithBattery: number;
  degradationPerYear: number;
  priceInflationPerYear: number;
  inverterReplacementYear: number;
  inverterReplacementCost: number;
  horizonYears: number;
  minSystemKwp: number;
  maxSystemKwp: number;
  seaiTiers: Array<{ uptoKwp: number; ratePerKwp: number }>;
  seaiCap: number;
  defaultSpecificYield: number;
}

export interface YearCashflow {
  year: number;
  production: number;
  selfConsumedValue: number;
  exportValue: number;
  outgoings: number;
  netCashflow: number;
  cumulative: number;
}

export interface EstimateResult {
  systemSizeKwp: number;
  systemCostGross: number;
  seaiGrant: number;
  systemCostNet: number;
  annualProductionKwh: number;
  annualSavings: number;
  annualSelfConsumptionSavings: number;
  annualExportIncome: number;
  solarOffsetPct: number;
  paybackYears: number | null;
  lifetimeSavings: number;
  co2SavedTonnesPerYear: number;
  assumptions: {
    specificYield: number;
    yieldSource: "pvgis" | "county-fallback" | "default";
    retailRate: number;
    exportRate: number;
    selfConsumption: number;
    annualKwhUsed: number;
    annualKwhSource: "bill" | "estimated-from-spend";
    degradationPerYear: number;
    priceInflationPerYear: number;
    horizonYears: number;
  };
  cashflows: YearCashflow[];
}

// ---------- Defaults ----------

export const DEFAULT_CONFIG: EstimateConfig = {
  retailRate: 0.35,
  exportRate: 0.20,
  costPerKwp: 1650,
  batteryCost: 2500,
  selfConsumptionNoBattery: 0.35,
  selfConsumptionWithBattery: 0.70,
  degradationPerYear: 0.005,
  priceInflationPerYear: 0.02,
  inverterReplacementYear: 12,
  inverterReplacementCost: 1200,
  horizonYears: 25,
  minSystemKwp: 2,
  maxSystemKwp: 12,
  seaiTiers: [
    { uptoKwp: 2, ratePerKwp: 700 },
    { uptoKwp: 4, ratePerKwp: 200 },
  ],
  seaiCap: 1800,
  defaultSpecificYield: 950,
};

export const COUNTY_YIELD_FALLBACK: Record<string, number> = {
  antrim: 880, armagh: 890, carlow: 950, cavan: 900, clare: 940,
  cork: 970, derry: 870, donegal: 870, down: 890, dublin: 950,
  fermanagh: 880, galway: 920, kerry: 980, kildare: 945, kilkenny: 955,
  laois: 940, leitrim: 890, limerick: 950, longford: 915, louth: 930,
  mayo: 900, meath: 935, monaghan: 905, offaly: 935, roscommon: 915,
  sligo: 895, tipperary: 950, tyrone: 875, waterford: 965, westmeath: 930,
  wexford: 970, wicklow: 950,
};

// ---------- SEAI grant calculation ----------

export function calculateSeaiGrant(systemKwp: number, cfg: EstimateConfig): number {
  let grant = 0;
  let prev = 0;
  for (const tier of cfg.seaiTiers) {
    const bandKwp = Math.max(0, Math.min(systemKwp, tier.uptoKwp) - prev);
    grant += bandKwp * tier.ratePerKwp;
    prev = tier.uptoKwp;
    if (systemKwp <= tier.uptoKwp) break;
  }
  return Math.min(Math.round(grant), cfg.seaiCap);
}

// ---------- The engine ----------

export function calculateEstimate(inputs: EstimateInputs): EstimateResult {
  const cfg: EstimateConfig = { ...DEFAULT_CONFIG, ...(inputs.config ?? {}) };

  const annualKwhSource = inputs.annualKwh ? "bill" as const : "estimated-from-spend" as const;
  const annualKwh = inputs.annualKwh ?? (inputs.monthlyBill * 12) / cfg.retailRate;

  let specificYield = cfg.defaultSpecificYield;
  let yieldSource: EstimateResult["assumptions"]["yieldSource"] = "default";
  if (inputs.specificYield && inputs.specificYield > 0) {
    specificYield = inputs.specificYield;
    yieldSource = "pvgis";
  } else if (inputs.county) {
    const fy = COUNTY_YIELD_FALLBACK[inputs.county.trim().toLowerCase()];
    if (fy) { specificYield = fy; yieldSource = "county-fallback"; }
  }

  let sizeKwp = annualKwh / specificYield;
  if (inputs.roofCapKwp && inputs.roofCapKwp > 0) sizeKwp = Math.min(sizeKwp, inputs.roofCapKwp);
  sizeKwp = Math.max(cfg.minSystemKwp, Math.min(cfg.maxSystemKwp, Math.round(sizeKwp * 2) / 2));

  const production1 = sizeKwp * specificYield;
  const selfConsumption = inputs.includeBattery ? cfg.selfConsumptionWithBattery : cfg.selfConsumptionNoBattery;
  const selfConsumedKwh1 = Math.min(production1 * selfConsumption, annualKwh);
  const exportedKwh1 = Math.max(0, production1 - selfConsumedKwh1);

  const annualSelfConsumptionSavings = Math.round(selfConsumedKwh1 * cfg.retailRate);
  const annualExportIncome = Math.round(exportedKwh1 * cfg.exportRate);
  const annualSavings = annualSelfConsumptionSavings + annualExportIncome;

  const systemCostGross = Math.round(sizeKwp * cfg.costPerKwp + (inputs.includeBattery ? cfg.batteryCost : 0));
  const seaiGrant = calculateSeaiGrant(sizeKwp, cfg);
  const systemCostNet = systemCostGross - seaiGrant;

  const cashflows: YearCashflow[] = [];
  let cumulative = -systemCostNet;
  let paybackYears: number | null = null;

  for (let y = 1; y <= cfg.horizonYears; y++) {
    const degr = Math.pow(1 - cfg.degradationPerYear, y - 1);
    const infl = Math.pow(1 + cfg.priceInflationPerYear, y - 1);
    const prod = production1 * degr;
    const selfK = Math.min(prod * selfConsumption, annualKwh);
    const expK = Math.max(0, prod - selfK);
    const selfVal = selfK * cfg.retailRate * infl;
    const expVal = expK * cfg.exportRate * infl;
    const outgo = y === cfg.inverterReplacementYear ? cfg.inverterReplacementCost : 0;
    const net = selfVal + expVal - outgo;
    const prevCumulative = cumulative;
    cumulative += net;

    if (paybackYears === null && prevCumulative < 0 && cumulative >= 0) {
      paybackYears = Math.round((y - 1 + (-prevCumulative) / net) * 10) / 10;
    }

    cashflows.push({
      year: y,
      production: Math.round(prod),
      selfConsumedValue: Math.round(selfVal),
      exportValue: Math.round(expVal),
      outgoings: outgo,
      netCashflow: Math.round(net),
      cumulative: Math.round(cumulative),
    });
  }

  const lifetimeSavings = Math.round(cumulative);
  const solarOffsetPct = Math.min(100, Math.round((production1 / annualKwh) * 100));
  const co2SavedTonnesPerYear = Math.round((production1 * 0.33) / 10) / 100;

  return {
    systemSizeKwp: sizeKwp,
    systemCostGross,
    seaiGrant,
    systemCostNet,
    annualProductionKwh: Math.round(production1),
    annualSavings,
    annualSelfConsumptionSavings,
    annualExportIncome,
    solarOffsetPct,
    paybackYears,
    lifetimeSavings,
    co2SavedTonnesPerYear,
    assumptions: {
      specificYield,
      yieldSource,
      retailRate: cfg.retailRate,
      exportRate: cfg.exportRate,
      selfConsumption,
      annualKwhUsed: Math.round(annualKwh),
      annualKwhSource,
      degradationPerYear: cfg.degradationPerYear,
      priceInflationPerYear: cfg.priceInflationPerYear,
      horizonYears: cfg.horizonYears,
    },
    cashflows,
  };
}