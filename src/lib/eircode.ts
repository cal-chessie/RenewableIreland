/**
 * Eircode to County mapping utility for Irish postal codes.
 *
 * An Eircode consists of 7 characters: a 3-character routing key + 4-character unique identifier.
 * Format: [A-Z][0-9]{2}\s?[A-Z0-9]{4}
 * Example: D18 A4K9 (Dublin 18)
 *
 * For Northern Ireland, UK postcodes are used (e.g., BT7 1NN for Belfast).
 */

// Primary mapping: routing key (first 3 chars, no space) -> county
// Some routing keys span multiple counties; later entries take precedence.
// Built via Object.assign to avoid duplicate-key TypeScript errors.
const ROUTING_KEY_MAP: Record<string, string> = Object.assign(
  { // ─── Dublin ───
    D01: "Dublin", D02: "Dublin", D03: "Dublin", D04: "Dublin",
    D05: "Dublin", D06: "Dublin", D07: "Dublin", D08: "Dublin",
    D09: "Dublin", D10: "Dublin", D11: "Dublin", D12: "Dublin",
    D13: "Dublin", D14: "Dublin", D15: "Dublin", D16: "Dublin",
    D17: "Dublin", D18: "Dublin", D20: "Dublin", D22: "Dublin",
    D24: "Dublin",
    A41: "Dublin", A42: "Dublin", A45: "Dublin",
    A53: "Dublin", A54: "Dublin", A55: "Dublin", A56: "Dublin",
    A58: "Dublin", A59: "Dublin", A63: "Dublin", A67: "Dublin",
    A75: "Dublin", A76: "Dublin",
    A81: "Dublin", A82: "Dublin", A83: "Dublin", A84: "Dublin",
    A86: "Dublin", A91: "Dublin", A92: "Dublin", A94: "Dublin",
    A96: "Dublin", A98: "Dublin",
  },
  { // ─── Kildare ───
    A14: "Kildare", A27: "Kildare", A31: "Kildare", A32: "Kildare",
    A52: "Kildare", A62: "Kildare",
    R14: "Kildare", R21: "Kildare", R35: "Kildare", R42: "Kildare",
    R51: "Kildare", R56: "Kildare",
    W12: "Kildare", W23: "Kildare",
  },
  { // ─── Wicklow ───
    A63: "Wicklow", A67: "Wicklow", A98: "Wicklow",
  },
  { // ─── Meath ───
    A34: "Meath", A35: "Meath", A36: "Meath", A37: "Meath",
    A38: "Meath", A39: "Meath", A40: "Meath",
    C15: "Meath",
    K32: "Meath", K34: "Meath", K36: "Meath", K45: "Meath",
    K56: "Meath", K67: "Meath", K78: "Meath", K91: "Meath",
  },
  { // ─── Louth ───
    A41: "Louth", A42: "Louth", A82: "Louth", A91: "Louth", A92: "Louth",
    E32: "Louth", E35: "Louth", E41: "Louth", E53: "Louth",
    E56: "Louth", E91: "Louth",
  },
  { // ─── Cavan ───
    A18: "Cavan", A19: "Cavan", A71: "Cavan", A72: "Cavan",
    A73: "Cavan", A74: "Cavan", A75: "Cavan", A76: "Cavan",
    H12: "Cavan", H14: "Cavan", H16: "Cavan", H18: "Cavan",
    H23: "Cavan", H53: "Cavan",
  },
  { // ─── Monaghan ───
    H18: "Monaghan", H23: "Monaghan", H62: "Monaghan",
    H65: "Monaghan", H71: "Monaghan", H75: "Monaghan",
  },
  { // ─── Longford ───
    N39: "Longford", N41: "Longford", N91: "Longford",
  },
  { // ─── Westmeath ───
    N37: "Westmeath", N38: "Westmeath", N91: "Westmeath",
  },
  { // ─── Roscommon ───
    F12: "Roscommon", F28: "Roscommon", F31: "Roscommon",
    F35: "Roscommon", F42: "Roscommon", F45: "Roscommon",
    F56: "Roscommon", F71: "Roscommon",
    F91: "Roscommon", F92: "Roscommon", F93: "Roscommon", F94: "Roscommon",
  },
  { // ─── Offaly ───
    R14: "Offaly", R32: "Offaly", R35: "Offaly", R42: "Offaly",
    R45: "Offaly", R51: "Offaly", R53: "Offaly", R57: "Offaly",
  },
  { // ─── Laois ───
    R14: "Laois", R21: "Laois", R32: "Laois", R35: "Laois",
    R42: "Laois", R45: "Laois", R51: "Laois", R53: "Laois", R57: "Laois",
  },
  { // ─── Galway ───
    H12: "Galway", H14: "Galway", H16: "Galway", H18: "Galway",
    H23: "Galway", H53: "Galway", H54: "Galway", H55: "Galway",
    H56: "Galway", H62: "Galway", H65: "Galway", H71: "Galway",
    H75: "Galway", H91: "Galway", H92: "Galway", H93: "Galway",
    H94: "Galway", H95: "Galway", H96: "Galway", H98: "Galway",
  },
  { // ─── Mayo ───
    E31: "Mayo", E34: "Mayo", E41: "Mayo", E45: "Mayo",
    E53: "Mayo", E63: "Mayo",
    E91: "Mayo", E92: "Mayo", E93: "Mayo", E94: "Mayo",
    E95: "Mayo", E96: "Mayo",
    F12: "Mayo", F23: "Mayo", F26: "Mayo", F28: "Mayo",
    F31: "Mayo", F35: "Mayo", F42: "Mayo", F45: "Mayo",
    F52: "Mayo", F53: "Mayo", F56: "Mayo", F63: "Mayo",
    F71: "Mayo", F72: "Mayo", F73: "Mayo", F74: "Mayo",
    F75: "Mayo", F81: "Mayo", F82: "Mayo", F83: "Mayo",
    F91: "Mayo", F92: "Mayo", F93: "Mayo", F94: "Mayo",
    F95: "Mayo", F96: "Mayo", F98: "Mayo",
  },
  { // ─── Sligo ───
    F12: "Sligo", F23: "Sligo", F28: "Sligo", F31: "Sligo",
    F35: "Sligo", F42: "Sligo", F45: "Sligo", F53: "Sligo",
    F56: "Sligo", F63: "Sligo", F91: "Sligo", F92: "Sligo",
    F93: "Sligo", F94: "Sligo",
  },
  { // ─── Leitrim ───
    F12: "Leitrim", F23: "Leitrim", F28: "Leitrim", F31: "Leitrim",
    F35: "Leitrim", F42: "Leitrim", F45: "Leitrim", F53: "Leitrim",
    F56: "Leitrim", F63: "Leitrim", F71: "Leitrim", F91: "Leitrim",
    F92: "Leitrim", F93: "Leitrim", F94: "Leitrim",
  },
  { // ─── Donegal ───
    E32: "Donegal", E34: "Donegal", E41: "Donegal", E45: "Donegal",
    E53: "Donegal", E63: "Donegal",
    E81: "Donegal", E82: "Donegal", E83: "Donegal",
    E91: "Donegal", E92: "Donegal", E93: "Donegal", E94: "Donegal",
    E95: "Donegal", E96: "Donegal", E98: "Donegal",
    F12: "Donegal", F23: "Donegal", F26: "Donegal", F28: "Donegal",
    F31: "Donegal", F35: "Donegal", F42: "Donegal", F45: "Donegal",
    F52: "Donegal", F53: "Donegal", F56: "Donegal", F63: "Donegal",
    F71: "Donegal", F72: "Donegal", F73: "Donegal", F74: "Donegal",
    F75: "Donegal", F81: "Donegal", F82: "Donegal", F83: "Donegal",
    F91: "Donegal", F92: "Donegal", F93: "Donegal", F94: "Donegal",
    F95: "Donegal", F96: "Donegal", F98: "Donegal",
  },
  { // ─── Clare ───
    V14: "Clare", V15: "Clare", V23: "Clare", V27: "Clare",
    V31: "Clare", V35: "Clare", V42: "Clare", V45: "Clare",
    V92: "Clare", V93: "Clare", V94: "Clare", V95: "Clare",
    V96: "Clare", V98: "Clare",
  },
  { // ─── Tipperary ───
    E25: "Tipperary", E34: "Tipperary", E41: "Tipperary",
    E45: "Tipperary", E49: "Tipperary", E53: "Tipperary",
    E56: "Tipperary", E57: "Tipperary",
    E91: "Tipperary", E92: "Tipperary", E93: "Tipperary",
    E94: "Tipperary", E95: "Tipperary", E96: "Tipperary", E98: "Tipperary",
    F12: "Tipperary", F23: "Tipperary", F25: "Tipperary",
    F28: "Tipperary", F31: "Tipperary", F35: "Tipperary",
    F42: "Tipperary", F45: "Tipperary", F49: "Tipperary",
    F50: "Tipperary", F51: "Tipperary", F52: "Tipperary",
    F56: "Tipperary", F57: "Tipperary", F67: "Tipperary",
    F91: "Tipperary", F92: "Tipperary", F93: "Tipperary",
    F94: "Tipperary", F95: "Tipperary", F96: "Tipperary", F98: "Tipperary",
  },
  { // ─── Limerick ───
    P12: "Limerick", P17: "Limerick", P24: "Limerick", P25: "Limerick",
    P31: "Limerick", P32: "Limerick", P36: "Limerick", P43: "Limerick",
    P47: "Limerick", P51: "Limerick", P56: "Limerick", P61: "Limerick",
    P62: "Limerick", P67: "Limerick", P72: "Limerick", P85: "Limerick",
    P92: "Limerick", P93: "Limerick", P94: "Limerick",
    P95: "Limerick", P96: "Limerick",
  },
  { // ─── Cork ───
    P12: "Cork", P17: "Cork", P24: "Cork", P25: "Cork",
    P31: "Cork", P32: "Cork", P36: "Cork", P43: "Cork",
    P47: "Cork", P51: "Cork", P56: "Cork", P61: "Cork",
    P62: "Cork", P67: "Cork", P72: "Cork", P81: "Cork",
    P85: "Cork", P92: "Cork", P93: "Cork", P94: "Cork",
    P95: "Cork", P96: "Cork", P98: "Cork",
    T12: "Cork", T23: "Cork", T24: "Cork", T31: "Cork",
    T35: "Cork", T45: "Cork", T56: "Cork", T61: "Cork",
    T71: "Cork", T81: "Cork",
    T92: "Cork", T93: "Cork", T94: "Cork",
    T95: "Cork", T96: "Cork", T98: "Cork",
  },
  { // ─── Kerry ───
    V14: "Kerry", V15: "Kerry", V23: "Kerry", V24: "Kerry",
    V27: "Kerry", V31: "Kerry", V35: "Kerry", V42: "Kerry",
    V45: "Kerry", V92: "Kerry", V93: "Kerry", V94: "Kerry",
    V95: "Kerry", V96: "Kerry", V98: "Kerry",
  },
  { // ─── Waterford ───
    X35: "Waterford", X36: "Waterford", X37: "Waterford",
    X42: "Waterford", X45: "Waterford", X51: "Waterford",
    X52: "Waterford",
    X91: "Waterford", X92: "Waterford", X93: "Waterford",
    X94: "Waterford", X95: "Waterford", X96: "Waterford", X98: "Waterford",
  },
  { // ─── Kilkenny ───
    R93: "Kilkenny", R95: "Kilkenny",
  },
  { // ─── Wexford ───
    Y14: "Wexford", Y21: "Wexford", Y25: "Wexford",
    Y34: "Wexford", Y35: "Wexford",
    Y91: "Wexford", Y92: "Wexford", Y93: "Wexford",
    Y94: "Wexford", Y95: "Wexford",
  },
  { // ─── Carlow ───
    R93: "Carlow",
  },
);

/**
 * Validate an Irish Eircode format.
 * Format: [A-Z][0-9]{2}\s?[A-Z0-9]{4}
 * Examples: "D18 A4K9", "D18A4K9", "A45 Y7B2"
 */
export function isValidEircode(eircode: string): boolean {
  const regex = /^[A-Z]\d{2}\s?[A-Z0-9]{4}$/;
  return regex.test(eircode.toUpperCase().trim());
}

/**
 * Validate a UK postcode format (for Northern Ireland).
 */
export function isValidUKPostcode(postcode: string): boolean {
  const regex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/;
  return regex.test(postcode.toUpperCase().trim());
}

/**
 * Check if a postcode is likely a Northern Ireland postcode.
 * NI postcode areas: BT (Belfast and surrounding)
 */
export function isNIPostcode(postcode: string): boolean {
  const cleaned = postcode.toUpperCase().trim();
  return cleaned.startsWith("BT");
}

/**
 * Extract the routing key (first 3 characters without space) from an Eircode.
 */
function getRoutingKey(eircode: string): string {
  const cleaned = eircode.toUpperCase().replace(/\s/g, "");
  return cleaned.substring(0, 3);
}

/**
 * Get county from an Eircode.
 * Returns null if the Eircode is invalid or the routing key is unknown.
 */
export function countyFromEircode(eircode: string): string | null {
  if (!isValidEircode(eircode)) return null;

  const routingKey = getRoutingKey(eircode);

  // Check direct routing key mapping
  if (ROUTING_KEY_MAP[routingKey]) {
    return ROUTING_KEY_MAP[routingKey];
  }

  return null;
}

/**
 * All 32 Irish counties for the fallback dropdown.
 */
export const ALL_COUNTIES = [
  // Republic of Ireland (26)
  "Carlow", "Cavan", "Clare", "Cork", "Donegal", "Dublin", "Galway",
  "Kerry", "Kildare", "Kilkenny", "Laois", "Leitrim", "Limerick",
  "Longford", "Louth", "Meath", "Monaghan", "Offaly", "Roscommon",
  "Sligo", "Tipperary", "Waterford", "Westmeath", "Wexford", "Wicklow",
  // Northern Ireland (6)
  "Antrim", "Armagh", "Down", "Fermanagh", "Londonderry", "Tyrone",
] as const;

/**
 * Determine if a county is in the Republic of Ireland or Northern Ireland.
 */
export function getCountryFromCounty(county: string): "IE" | "GB" {
  const niCounties = ["Antrim", "Armagh", "Down", "Fermanagh", "Londonderry", "Tyrone"];
  return niCounties.includes(county) ? "GB" : "IE";
}
