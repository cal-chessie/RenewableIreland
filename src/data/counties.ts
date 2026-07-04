// County data for all 32 Irish counties (26 Republic + 6 Northern Ireland)
// Tyrone has detailed content; others have standard data

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CountyAccentVars {
  accent: string;
  accentHover: string;
  accentGlow: string;
  accentFaint: string;
  accentSubtle: string;
  accentBorder: string;
  accentBorderStrong: string;
  accentBorderFaint: string;
}

export interface CountyData {
  slug: string;
  name: string;
  region: string;
  province: string;
  country: string; // "GB" for NI, "IE" for Republic
  phone: string;
  email: string;
  domain: string;
  mainTown: string;
  areaTowns: string[];
  lat: string;
  lng: string;
  currency: string;
  accreditation: string;
  grants: string[];
  heroSubtitle: string;
  testimonials: Testimonial[];
  faqs: FAQ[];
  avgSystemCost: string;
  avgPaybackYears: string;
  accentColor: string;
  accentHover: string;
}

/** Convert hex (#RRGGBB) to CSS custom properties for all accent variants */
export function getAccentCSSVars(hex: string, hover: string): Record<string, string> {
  // Parse hex to RGB
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return {
    '--accent': hex,
    '--accent-hover': hover,
    '--accent-glow': `rgba(${r}, ${g}, ${b}, 0.25)`,
    '--accent-faint': `rgba(${r}, ${g}, ${b}, 0.1)`,
    '--accent-subtle': `rgba(${r}, ${g}, ${b}, 0.05)`,
    '--accent-border': `rgba(${r}, ${g}, ${b}, 0.08)`,
    '--accent-border-strong': `rgba(${r}, ${g}, ${b}, 0.15)`,
    '--accent-border-faint': `rgba(${r}, ${g}, ${b}, 0.07)`,
  };
}

// ========================
// TYRONE — FULL DETAILED DATA
// ========================
const tyrone: CountyData = {
  slug: "tyrone",
  name: "Tyrone",
  region: "Northern Ireland",
  province: "Ulster",
  country: "GB",
  phone: "+44-28-8224-5900",
  email: "info@renewabletyrone.ie",
  domain: "renewabletyrone.ie",
  mainTown: "Omagh",
  areaTowns: ["Dungannon", "Cookstown", "Strabane", "Omagh", "Fivemiletown", "Dromore"],
  lat: "54.5965",
  lng: "-7.3049",
  currency: "£",
  accreditation: "MCS",
  grants: [
    "Smart Export Guarantee (SEG) — earn for excess energy exported to the grid",
    "Northern Ireland Renewable Obligation Certificates (ROCs)",
    "Energy Company Obligation (ECO) for qualifying households",
  ],
  heroSubtitle:
    "MCS accredited solar panel installers serving homes, businesses and farms across County Tyrone — from Omagh to Dungannon, Cookstown to Strabane.",
  testimonials: [
    {
      name: "Ciarán Mulgrew",
      location: "Omagh",
      rating: 5,
      text: "Renewable Tyrone were different from the first phone call. No hard sell, just straight answers about what a 4kW system would do for our semi in Omagh. They turned up when they said they would, cleaned up after themselves, and our first full month's bill dropped from £142 to £38. Genuinely the best home improvement we've made.",
    },
    {
      name: "Gráinne Clarke",
      location: "Dungannon",
      rating: 5,
      text: "We run a small B&B outside Dungannon and electricity was one of our biggest overheads. Renewable Tyrone installed a 6kW system on the south-facing roof of the main house and we're now exporting surplus back through SEG. The installation took a single day and caused zero disruption to guests. Highly recommend them to any Tyrone business owner.",
    },
    {
      name: "James Donnelly",
      location: "Cookstown",
      rating: 5,
      text: "As a dairy farmer outside Cookstown, milking parlour electricity was costing a fortune. Renewable Tyrone designed a ground-mounted array that covers almost all of our daytime usage. The ROI projection they gave us at quote stage has been accurate — we're on track for a 5.5-year payback, which is better than they promised.",
    },
    {
      name: "Aoife McCullagh",
      location: "Strabane",
      rating: 5,
      text: "I was sceptical about whether solar panels would work given our weather in Strabane, but the team at Renewable Tyrone explained that daylight — not direct sunshine — is what matters. Even through the winter months we've seen consistent generation. The monitoring app they set up is genuinely useful for tracking output.",
    },
    {
      name: "Patrick O'Neill",
      location: "Fivemiletown",
      rating: 5,
      text: "We had three quotes for our detached house in Fivemiletown. Renewable Tyrone weren't the cheapest, but they were the only ones who came out, measured the roof properly, and explained the difference between panel brands. That level of detail gave us confidence, and the installation has been flawless for six months now.",
    },
    {
      name: "Eleanor Breslin",
      location: "Dromore",
      rating: 5,
      text: "From the initial survey to the final handover, the whole experience with Renewable Tyrone was professional and straightforward. They handled everything — scaffolding, grid application, the lot. Our system has generated over 3,800 kWh in its first year, which is right in line with what they predicted. A great local company.",
    },
  ],
  faqs: [
    {
      question: "Does solar actually work in Northern Ireland's weather?",
      answer:
        "Solar panels generate electricity from daylight, not direct sunshine. Even on overcast days, panels will produce a meaningful amount of power. County Tyrone receives around 1,100–1,200 kWh per square metre of solar radiation annually — that's roughly 70% of what southern Spain gets. Modern panel technology is highly efficient in diffuse light conditions, so a well-designed system in Tyrone can generate 3,200–3,800 kWh per year from a typical 4kW installation.",
    },
    {
      question: "What does a solar panel system cost in Tyrone?",
      answer:
        "A 4kW residential system in County Tyrone typically costs between £6,000 and £9,000, depending on panel quality, inverter choice, and roof complexity. A 6kW system — more common for larger homes or properties with electric heating — ranges from £8,500 to £13,000. All prices include scaffolding, MCS certification, grid connection application, and a comprehensive warranty. We provide a full written quote at no charge after a free site survey.",
    },
    {
      question: "How long does installation take?",
      answer:
        "A typical residential installation on a standard pitched roof in Tyrone takes one working day. This includes mounting the rails, fitting the panels, installing the inverter, wiring the system, and connecting to your consumer unit. Ground-mounted systems or battery storage additions may take two days. We aim to have your system commissioned and generating within two weeks of your quote acceptance.",
    },
    {
      question: "Do I need planning permission for solar panels in Tyrone?",
      answer:
        "In most cases, no. Solar panels on domestic properties in Northern Ireland are classed as permitted development, provided the panels don't extend more than 200mm from the roof slope and aren't installed on a listed building or in a conservation area. For agricultural or commercial installations, different rules may apply — we'll advise you during the free site survey and handle any necessary applications.",
    },
    {
      question: "What is the Smart Export Guarantee and how much will I earn?",
      answer:
        "The Smart Export Guarantee (SEG) is a government-backed scheme that requires energy suppliers to pay you for surplus electricity you export to the grid. Rates vary by supplier but typically range from 1p to 7.5p per kWh. On a typical Tyrone home with a 4kW system, this can generate £80–£200 per year in export payments. We'll help you find the best SEG tariff as part of the installation process.",
    },
    {
      question: "How long do solar panels last and what warranty do I get?",
      answer:
        "Quality solar panels are designed to last 25–30 years and typically come with a 25-year linear performance warranty (guaranteeing at least 80% of original output at year 25). Inverters generally last 10–15 years and come with a 5–10 year warranty. Renewable Tyrone provides a 10-year workmanship warranty on all installations, covering materials and labour. We also offer an annual maintenance service to keep your system performing at its best.",
    },
    {
      question: "Will solar panels affect my home's Energy Performance Certificate?",
      answer:
        "Yes — positively. Installing solar panels can improve your EPC rating by one or two bands, depending on your home's current rating and the system size. This is increasingly important as mortgage lenders and potential buyers look more closely at energy efficiency. In our experience, homes in Tyrone with solar panels are more attractive to buyers and can command a modest premium on the open market.",
    },
    {
      question: "Do you install battery storage and EV chargers too?",
      answer:
        "Yes. Renewable Tyrone installs battery storage systems from leading manufacturers like Tesla Powerwall, GivEnergy, and FoxESS. Adding a battery lets you store excess daytime generation for use in the evening and overnight, reducing your grid dependence to near zero in summer months. We also install EV charger points — ideal if you're considering an electric vehicle, as you can charge for free using your own solar-generated electricity.",
    },
  ],
  avgSystemCost: "£6,000 – £9,000",
  avgPaybackYears: "6–8 years",
  accentColor: "#E10600",
  accentHover: "#ff1a1a",
};

const antrim: CountyData = {
  slug: "antrim",
  name: "Antrim",
  region: "Northern Ireland",
  province: "Ulster",
  country: "GB",
  phone: "+44-28-9032-5800",
  email: "info@renewableantrim.ie",
  domain: "renewableantrim.ie",
  mainTown: "Antrim",
  areaTowns: ["Ballymena", "Larne", "Carrickfergus", "Ballyclare", "Antrim", "Randalstown"],
  lat: "54.7189",
  lng: "-6.2186",
  currency: "£",
  accreditation: "MCS",
  grants: [
    "Smart Export Guarantee (SEG)",
    "Northern Ireland Renewable Obligation Certificates (ROCs)",
    "Energy Company Obligation (ECO)",
  ],
  heroSubtitle:
    "MCS accredited solar panel installers serving County Antrim — from Ballymena to Larne, Carrickfergus to Ballyclare.",
  testimonials: [
    {
      name: "Mark Thompson",
      location: "Ballymena",
      rating: 5,
      text: "Brilliant service from start to finish. The team installed our 4kW system in under a day and we've seen a 65% reduction in our electricity bills. Highly professional outfit.",
    },
    {
      name: "Sandra Johnston",
      location: "Larne",
      rating: 5,
      text: "We were quoted quickly after the site visit, installation was seamless, and the aftercare has been excellent. Our monitoring app shows we're generating exactly what was promised.",
    },
    {
      name: "David Patterson",
      location: "Carrickfergus",
      rating: 5,
      text: "Best investment we've made in our home. The installers were courteous, tidy, and clearly experienced. We've recommended Renewable Antrim to several neighbours already.",
    },
  ],
  faqs: [
    {
      question: "How much do solar panels cost in Antrim?",
      answer:
        "A typical 4kW residential system in County Antrim costs between £6,000 and £9,000. We provide free, no-obligation site surveys and written quotes for every property.",
    },
    {
      question: "Does solar work in Northern Ireland's climate?",
      answer:
        "Yes. Solar panels generate electricity from daylight, not direct sun. Northern Ireland receives sufficient daylight year-round to make solar a worthwhile investment with typical payback periods of 6–8 years.",
    },
    {
      question: "Do I need planning permission for solar panels?",
      answer:
        "Most domestic installations in Northern Ireland are permitted development. Listed buildings and conservation areas may require consent — we'll advise during your free survey.",
    },
    {
      question: "What is the Smart Export Guarantee?",
      answer:
        "The SEG pays you for surplus electricity exported to the grid. Rates vary by supplier from 1p to 7.5p per kWh. We help you find the best available tariff.",
    },
    {
      question: "How long does installation take?",
      answer:
        "A standard residential installation typically takes one working day. Battery storage or ground-mounted systems may take two days.",
    },
  ],
  avgSystemCost: "£6,000 – £9,000",
  avgPaybackYears: "6–8 years",
  accentColor: "#448aff",
  accentHover: "#6aa0ff",
};

const armagh: CountyData = {
  slug: "armagh",
  name: "Armagh",
  region: "Northern Ireland",
  province: "Ulster",
  country: "GB",
  phone: "+44-28-3752-4100",
  email: "info@renewablearmagh.ie",
  domain: "renewablearmagh.ie",
  mainTown: "Armagh",
  areaTowns: ["Portadown", "Lurgan", "Tandragee", "Armagh", "Richhill", "Markethill"],
  lat: "54.3498",
  lng: "-6.6546",
  currency: "£",
  accreditation: "MCS",
  grants: [
    "Smart Export Guarantee (SEG)",
    "Northern Ireland Renewable Obligation Certificates (ROCs)",
    "Energy Company Obligation (ECO)",
  ],
  heroSubtitle:
    "MCS accredited solar panel installers serving County Armagh — from Portadown to Lurgan, Tandragee to Richhill.",
  testimonials: [
    {
      name: "Seamus Hughes",
      location: "Portadown",
      rating: 5,
      text: "Renewable Armagh installed a 5kW system on our property and the results have exceeded expectations. Professional team, clean installation, and great ongoing support.",
    },
    {
      name: "Mairead Kelly",
      location: "Lurgan",
      rating: 5,
      text: "We had quotes from three companies and Renewable Armagh stood out for their detailed survey and honest advice. No pressure, no hidden costs, just a great solar installation.",
    },
    {
      name: "Frank O'Brien",
      location: "Tandragee",
      rating: 5,
      text: "Our farm barns were perfect for solar panels. Renewable Armagh designed a system that covers nearly all our daytime electricity needs. Excellent service throughout.",
    },
  ],
  faqs: [
    {
      question: "How much do solar panels cost in Armagh?",
      answer:
        "A 4kW residential system in County Armagh costs between £6,000 and £9,000. Agricultural and commercial systems are priced individually based on requirements.",
    },
    {
      question: "Is my Armagh home suitable for solar panels?",
      answer:
        "Most homes with a south, south-east, or south-west facing roof are suitable. We carry out a free survey to assess roof condition, orientation, and any shading before providing a quote.",
    },
    {
      question: "What grants are available in Northern Ireland?",
      answer:
        "The Smart Export Guarantee pays you for exported energy. The ECO scheme may provide support for qualifying households. Contact us for the latest information on available incentives.",
    },
    {
      question: "How long do solar panels last?",
      answer:
        "Quality panels are warranted for 25+ years and often last 30+. Inverters typically last 10–15 years. We provide a 10-year workmanship warranty on all installations.",
    },
    {
      question: "Do you offer battery storage in Armagh?",
      answer:
        "Yes — we install battery systems from leading manufacturers including GivEnergy, Tesla Powerwall, and FoxESS. Batteries maximise your self-consumption and reduce grid reliance.",
    },
  ],
  avgSystemCost: "£6,000 – £9,000",
  avgPaybackYears: "6–8 years",
  accentColor: "#536dfe",
  accentHover: "#758bfe",
};

const down: CountyData = {
  slug: "down",
  name: "Down",
  region: "Northern Ireland",
  province: "Ulster",
  country: "GB",
  phone: "+44-28-9042-7800",
  email: "info@renewabledown.ie",
  domain: "renewabledown.ie",
  mainTown: "Downpatrick",
  areaTowns: ["Bangor", "Newry", "Newcastle", "Downpatrick", "Holywood", "Ballynahinch"],
  lat: "54.3314",
  lng: "-5.7076",
  currency: "£",
  accreditation: "MCS",
  grants: [
    "Smart Export Guarantee (SEG)",
    "Northern Ireland Renewable Obligation Certificates (ROCs)",
    "Energy Company Obligation (ECO)",
  ],
  heroSubtitle:
    "MCS accredited solar panel installers serving County Down — from Bangor to Newry, Newcastle to Downpatrick.",
  testimonials: [
    {
      name: "Liam O'Hare",
      location: "Bangor",
      rating: 5,
      text: "We chose Renewable Down based on their MCS accreditation and local reputation. The installation was faultless and we're now generating more than we expected for our Bangor home.",
    },
    {
      name: "Rachel Woods",
      location: "Newry",
      rating: 5,
      text: "From initial contact to commissioning, the whole process was smooth and professional. Our electricity bill has dropped dramatically since the solar panels were installed.",
    },
    {
      name: "Tommy Byrne",
      location: "Newcastle",
      rating: 5,
      text: "Brilliant service. The team was punctual, clean, and clearly knew exactly what they were doing. I'd recommend Renewable Down to anyone considering solar in County Down.",
    },
  ],
  faqs: [
    {
      question: "How much do solar panels cost in Down?",
      answer:
        "A typical 4kW system in County Down costs between £6,000 and £9,000. We offer free surveys and detailed written quotes with no obligation.",
    },
    {
      question: "What is the Smart Export Guarantee?",
      answer:
        "The SEG requires energy suppliers to pay you for surplus electricity exported to the grid. Rates vary by supplier — we'll help you find the best tariff.",
    },
    {
      question: "How long does a solar installation take in Down?",
      answer:
        "Most residential installations are completed in one working day. Complex installations or battery additions may require two days.",
    },
    {
      question: "Do solar panels work during winter in County Down?",
      answer:
        "Yes. While output is lower in winter, panels still generate electricity on overcast days. Annual generation in Down is sufficient for a strong return on investment.",
    },
    {
      question: "Can I add battery storage later?",
      answer:
        "Yes. Solar systems are modular, meaning you can add battery storage at any time. Many of our County Down customers start with panels and add a battery within the first year.",
    },
  ],
  avgSystemCost: "£6,000 – £9,000",
  avgPaybackYears: "6–8 years",
  accentColor: "#2979ff",
  accentHover: "#5291ff",
};

const fermanagh: CountyData = {
  slug: "fermanagh",
  name: "Fermanagh",
  region: "Northern Ireland",
  province: "Ulster",
  country: "GB",
  phone: "+44-28-6632-8100",
  email: "info@renewablefermanagh.ie",
  domain: "renewablefermanagh.ie",
  mainTown: "Enniskillen",
  areaTowns: ["Enniskillen", "Irvinestown", "Lisnaskea", "Ballinamallard", "Tempo", "Belcoo"],
  lat: "54.3668",
  lng: "-7.6707",
  currency: "£",
  accreditation: "MCS",
  grants: [
    "Smart Export Guarantee (SEG)",
    "Northern Ireland Renewable Obligation Certificates (ROCs)",
    "Energy Company Obligation (ECO)",
  ],
  heroSubtitle:
    "MCS accredited solar panel installers serving County Fermanagh — from Enniskillen to Lisnaskea, Ballinamallard to Irvinestown.",
  testimonials: [
    {
      name: "Conor Maguire",
      location: "Enniskillen",
      rating: 5,
      text: "Renewable Fermanagh provided an excellent service from survey to installation. The 4kW system on our home has been performing brilliantly — even through the greyer months around Lough Erne.",
    },
    {
      name: "Bridget O'Donnell",
      location: "Lisnaskea",
      rating: 5,
      text: "We were impressed by the thoroughness of the site survey. The installers were professional and left no mess. Our electricity bill is now a fraction of what it was.",
    },
    {
      name: "Ryan Boyle",
      location: "Ballinamallard",
      rating: 5,
      text: "Top-quality installation on our farm buildings. Renewable Fermanagh understood the specific needs of an agricultural setup and the system has reduced our running costs significantly.",
    },
  ],
  faqs: [
    {
      question: "How much do solar panels cost in Fermanagh?",
      answer:
        "A residential 4kW system in County Fermanagh costs between £6,000 and £9,000. Agricultural and commercial installations are priced based on system size and complexity.",
    },
    {
      question: "Are solar panels worth it in Fermanagh?",
      answer:
        "Absolutely. Fermanagh receives sufficient daylight for solar to be a strong investment. Typical payback is 6–8 years, after which your electricity is essentially free for the remaining panel life.",
    },
    {
      question: "Do I need planning permission?",
      answer:
        "Most domestic installations are permitted development. We assess every property during the free survey and advise on any planning requirements.",
    },
    {
      question: "What happens if my roof is shaded?",
      answer:
        "Shading reduces output but doesn't eliminate it. We use design software to model shading patterns and optimise panel placement to maximise generation from your specific roof.",
    },
    {
      question: "Do you install on agricultural buildings?",
      answer:
        "Yes. We have extensive experience installing ground-mounted and roof-mounted systems on farm buildings across County Fermanagh. Contact us for a free agricultural solar survey.",
    },
  ],
  avgSystemCost: "£6,000 – £9,000",
  avgPaybackYears: "6–8 years",
  accentColor: "#304ffe",
  accentHover: "#5570ff",
};

const londonderry: CountyData = {
  slug: "londonderry",
  name: "Londonderry",
  region: "Northern Ireland",
  province: "Ulster",
  country: "GB",
  phone: "+44-28-7134-2900",
  email: "info@renewablelondonderry.ie",
  domain: "renewablelondonderry.ie",
  mainTown: "Derry",
  areaTowns: ["Derry", "Coleraine", "Limavady", "Dungiven", "Magherafelt", "Claudy"],
  lat: "54.9966",
  lng: "-7.3097",
  currency: "£",
  accreditation: "MCS",
  grants: [
    "Smart Export Guarantee (SEG)",
    "Northern Ireland Renewable Obligation Certificates (ROCs)",
    "Energy Company Obligation (ECO)",
  ],
  heroSubtitle:
    "MCS accredited solar panel installers serving County Londonderry — from Derry to Coleraine, Limavady to Magherafelt.",
  testimonials: [
    {
      name: "Declan Doherty",
      location: "Derry",
      rating: 5,
      text: "Excellent experience with Renewable Londonderry. The team was knowledgeable, efficient, and the price was fair. Our system has been generating consistently for over a year now.",
    },
    {
      name: "Ann Gallagher",
      location: "Coleraine",
      rating: 5,
      text: "We got three quotes and Renewable Londonderry was the most thorough by far. The installation was done in a day and the results speak for themselves — 70% reduction in our electricity bill.",
    },
    {
      name: "Martin Quinn",
      location: "Limavady",
      rating: 5,
      text: "Very pleased with our solar installation. The monitoring system shows exactly how much we're generating and saving. Great aftercare too — they answered all our questions post-installation.",
    },
  ],
  faqs: [
    {
      question: "How much do solar panels cost in Londonderry?",
      answer:
        "A 4kW residential system in County Londonderry costs between £6,000 and £9,000. We provide free surveys and no-obligation written quotes.",
    },
    {
      question: "Is Derry a good location for solar panels?",
      answer:
        "Yes. While Northern Ireland has more overcast days than southern Europe, solar panels work on daylight — not direct sunshine. Londonderry's latitude is well within the productive range for solar energy.",
    },
    {
      question: "What warranty do you offer?",
      answer:
        "We provide a 10-year workmanship warranty, with panel performance warranties of 25 years and inverter warranties of 5–10 years from the manufacturer.",
    },
    {
      question: "Can I get paid for exporting solar energy?",
      answer:
        "Yes, through the Smart Export Guarantee (SEG). Energy suppliers pay you for surplus electricity, typically between 1p and 7.5p per kWh.",
    },
    {
      question: "Do you install EV chargers with solar?",
      answer:
        "Yes. We can install a solar system alongside an EV charge point so you can charge your electric vehicle using your own generated electricity for free.",
    },
  ],
  avgSystemCost: "£6,000 – £9,000",
  avgPaybackYears: "6–8 years",
  accentColor: "#2962ff",
  accentHover: "#4f84ff",
};

// ========================
// REPUBLIC OF IRELAND COUNTIES
// ========================

const carlow: CountyData = {
  slug: "carlow",
  name: "Carlow",
  region: "Leinster",
  province: "Leinster",
  country: "IE",
  phone: "+353-59-913-4100",
  email: "info@renewablecarlow.ie",
  domain: "renewablecarlow.ie",
  mainTown: "Carlow",
  areaTowns: ["Carlow", "Tullow", "Bagenalstown", "Hacketstown", "Leighlinbridge", "Myshall"],
  lat: "52.8365",
  lng: "-6.9341",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Carlow — from Carlow town to Tullow, Bagenalstown to Leighlinbridge.",
  testimonials: [
    { name: "John Murphy", location: "Carlow", rating: 5, text: "Renewable Carlow made the SEAI grant process completely straightforward. Great installation and our bills have been cut dramatically since." },
    { name: "Mary Kavanagh", location: "Tullow", rating: 5, text: "Professional, punctual, and excellent value. The 4kW system on our home in Tullow has exceeded the performance estimates we were given." },
    { name: "Michael Doyle", location: "Bagenalstown", rating: 5, text: "We added a battery to our solar system and now we're virtually off the grid during summer. Fantastic service from the Renewable Carlow team." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Carlow?", answer: "A typical 4kW system in County Carlow costs between €4,500 and €6,500. The SEAI grant can reduce this by up to €1,800." },
    { question: "What SEAI grants are available in Carlow?", answer: "The Domestic Solar PV Grant offers up to €1,800 for home installations. We handle the grant application process on your behalf." },
    { question: "How long does installation take?", answer: "Most residential installations in Carlow are completed in one day. We handle scaffolding, grid connection, and SEAI registration." },
    { question: "Do I need planning permission for solar in Carlow?", answer: "No. Domestic solar panels in Ireland are exempt from planning permission up to certain size limits. We'll confirm during the survey." },
    { question: "How much will I save with solar panels?", answer: "Typical savings are €500–€800 per year on electricity bills, depending on system size and usage patterns." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#aeea00",
  accentHover: "#c0f040",
};

const cavan: CountyData = {
  slug: "cavan",
  name: "Cavan",
  region: "Ulster",
  province: "Ulster",
  country: "IE",
  phone: "+353-49-433-5100",
  email: "info@renewablecavan.ie",
  domain: "renewablecavan.ie",
  mainTown: "Cavan",
  areaTowns: ["Cavan", "Cootehill", "Bailieborough", "Kingscourt", "Virginia", "Ballyjamesduff"],
  lat: "53.9939",
  lng: "-7.3635",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Cavan — from Cavan town to Cootehill, Bailieborough to Virginia.",
  testimonials: [
    { name: "Peter Reilly", location: "Cavan", rating: 5, text: "Excellent service from the Renewable Cavan team. They handled our SEAI grant and the installation was done in a single day. Very happy with the results." },
    { name: "Angela Brady", location: "Cootehill", rating: 5, text: "We were impressed by the professionalism and clear communication throughout. Our electricity bills have dropped significantly since the installation." },
    { name: "Thomas Smith", location: "Bailieborough", rating: 5, text: "Renewable Cavan installed panels on both our home and farm buildings. Both systems are performing well above expectations. Highly recommend." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Cavan?", answer: "A 4kW system in County Cavan costs between €4,500 and €6,500 before the SEAI grant. The grant can reduce your cost by up to €1,800." },
    { question: "Is Cavan suitable for solar panels?", answer: "Yes. Cavan receives ample daylight for effective solar generation. Typical systems generate 3,500–4,000 kWh per year." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800. We manage the application process on your behalf at no extra cost." },
    { question: "How long does installation take?", answer: "Standard residential installations in Cavan take one working day. Farm or commercial installations may take longer." },
    { question: "Do you offer battery storage?", answer: "Yes. We install batteries from GivEnergy, FoxESS, and other leading manufacturers. Adding a battery can increase your solar self-consumption to 80%+." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#9ccc65",
  accentHover: "#b8d98d",
};

const clare: CountyData = {
  slug: "clare",
  name: "Clare",
  region: "Munster",
  province: "Munster",
  country: "IE",
  phone: "+353-65-682-3100",
  email: "info@renewableclare.ie",
  domain: "renewableclare.ie",
  mainTown: "Ennis",
  areaTowns: ["Ennis", "Shannon", "Kilrush", "Ennistimon", "Lahinch", "Scariff"],
  lat: "52.9432",
  lng: "-8.9910",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Clare — from Ennis to Shannon, Kilrush to Lahinch.",
  testimonials: [
    { name: "Brendan Hayes", location: "Ennis", rating: 5, text: "Renewable Clare did a fantastic job on our home. The SEAI grant was handled seamlessly and the system is performing beautifully. Very professional team." },
    { name: "Colette O'Brien", location: "Shannon", rating: 5, text: "We researched several companies before choosing Renewable Clare. Their attention to detail during the survey gave us confidence, and the installation lived up to it." },
    { name: "Sean Flanagan", location: "Kilrush", rating: 5, text: "Great service from start to finish. The installers were efficient, tidy, and thorough. We're seeing significant savings already on our Kilrush home." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Clare?", answer: "A typical 4kW system costs between €4,500 and €6,500 in County Clare. The SEAI grant of up to €1,800 can reduce this considerably." },
    { question: "What SEAI grants are available in Clare?", answer: "The Domestic Solar PV Grant offers up to €1,800 for home installations. Additional grants may be available for businesses." },
    { question: "How long does installation take in Clare?", answer: "Residential installations typically take one working day. We coordinate scaffolding and grid connection for you." },
    { question: "Do I need planning permission?", answer: "Domestic solar panels are exempt from planning permission in Ireland within certain limits. We'll confirm during your free survey." },
    { question: "Will solar work in Clare's coastal areas?", answer: "Yes. Coastal areas in Clare receive excellent daylight. Panels are designed to withstand wind and salt air exposure." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#ff6d00",
  accentHover: "#ff8f33",
};

const cork: CountyData = {
  slug: "cork",
  name: "Cork",
  region: "Munster",
  province: "Munster",
  country: "IE",
  phone: "+353-21-234-5600",
  email: "info@renewablecork.ie",
  domain: "renewablecork.ie",
  mainTown: "Cork",
  areaTowns: ["Cork City", "Mallow", "Bandon", "Clonakilty", "Macroom", "Youghal"],
  lat: "51.8985",
  lng: "-8.4756",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Cork — from Cork City to Mallow, Bandon to Clonakilty.",
  testimonials: [
    { name: "Eamonn O'Sullivan", location: "Cork City", rating: 5, text: "Renewable Cork provided an excellent service. The installation on our terraced house was handled with care and professionalism. Our bills are down by over 60%." },
    { name: "Fiona Murphy", location: "Bandon", rating: 5, text: "We added both solar panels and a battery storage system. Renewable Cork managed the SEAI grant application and the whole process was seamless." },
    { name: "Derek O'Connor", location: "Clonakilty", rating: 5, text: "Outstanding installation on our west Cork home. The team was knowledgeable, efficient, and the system has exceeded the quoted performance figures." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Cork?", answer: "A 4kW system in Cork costs between €4,500 and €6,500. The SEAI grant can reduce this by up to €1,800." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant provides up to €1,800 for home installations. We handle the full application process." },
    { question: "How long does installation take?", answer: "Standard installations in Cork take one working day. Larger commercial or agricultural systems may take 2–3 days." },
    { question: "Do I need planning permission for solar panels in Cork?", answer: "Domestic solar panels are planning-exempt within size limits. Heritage buildings may have restrictions — we'll advise." },
    { question: "Do you install battery storage in Cork?", answer: "Yes. We install battery systems that let you store excess solar energy for evening and night-time use, dramatically reducing your grid dependence." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#00c853",
  accentHover: "#33d475",
};

const donegal: CountyData = {
  slug: "donegal",
  name: "Donegal",
  region: "Ulster",
  province: "Ulster",
  country: "IE",
  phone: "+353-74-912-3100",
  email: "info@renewabledonegal.ie",
  domain: "renewabledonegal.ie",
  mainTown: "Letterkenny",
  areaTowns: ["Letterkenny", "Donegal Town", "Buncrana", "Ballybofey", "Bundoran", "Gweedore"],
  lat: "54.6548",
  lng: "-8.1082",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Donegal — from Letterkenny to Donegal Town, Buncrana to Bundoran.",
  testimonials: [
    { name: "Neil Gallagher", location: "Letterkenny", rating: 5, text: "Despite Donegal's weather reputation, our solar panels are generating brilliantly. Renewable Donegal were upfront about expected output and have delivered exactly what they promised." },
    { name: "Martha Doherty", location: "Buncrana", rating: 5, text: "Very happy with our installation. The team was professional, tidy, and the aftercare has been excellent. Our electricity bills have never been lower." },
    { name: "Joe McFadden", location: "Donegal Town", rating: 5, text: "Renewable Donegal installed a system on our hotel and the savings have been significant. Great service from a trusted local company." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Donegal?", answer: "A 4kW system in Donegal costs between €4,500 and €6,500. The SEAI grant of up to €1,800 can reduce this significantly." },
    { question: "Does solar work well in Donegal?", answer: "Yes. Donegal receives sufficient daylight for solar to be a sound investment. Modern panels are highly efficient even in overcast conditions." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant provides up to €1,800. We manage the full application on your behalf." },
    { question: "How long does installation take?", answer: "Most residential installations in Donegal are completed in one day. Remote locations may require additional logistics planning." },
    { question: "Do I need planning permission?", answer: "Domestic solar panels are exempt in Ireland within certain limits. We'll confirm any requirements during your free survey." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#00c853",
  accentHover: "#33d475",
};

const dublin: CountyData = {
  slug: "dublin",
  name: "Dublin",
  region: "Leinster",
  province: "Leinster",
  country: "IE",
  phone: "+353-1-514-3200",
  email: "info@renewabledublin.ie",
  domain: "renewabledublin.ie",
  mainTown: "Dublin",
  areaTowns: ["Dublin City", "Dundrum", "Swords", "Dun Laoghaire", "Blanchardstown", "Tallaght"],
  lat: "53.3498",
  lng: "-6.2603",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Dublin — from Dublin City to Swords, Dun Laoghaire to Tallaght.",
  testimonials: [
    { name: "David O'Neil", location: "Dublin City", rating: 5, text: "Renewable Dublin installed panels on our semi-detached home and the process was smooth from start to finish. Great communication, clean work, and the results speak for themselves." },
    { name: "Siobhan Walsh", location: "Swords", rating: 5, text: "We were quoted quickly, installation was done in a day, and the SEAI grant was handled entirely by the Renewable Dublin team. Couldn't have asked for a better experience." },
    { name: "Paul Dunne", location: "Dundrum", rating: 5, text: "Excellent installation on our 1960s bungalow in Dundrum. The team was knowledgeable about the specific challenges of older roofs and delivered a first-class result." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Dublin?", answer: "A 4kW system in Dublin costs between €4,500 and €6,500. The SEAI grant can reduce this by up to €1,800." },
    { question: "What SEAI grants are available in Dublin?", answer: "The Domestic Solar PV Grant provides up to €1,800 for homes. Additional grants may be available for businesses." },
    { question: "How long does installation take?", answer: "Most Dublin installations are completed in one working day. We coordinate scaffolding and all permitting." },
    { question: "Are there restrictions on solar panels in Dublin?", answer: "Some areas may have architectural conservation requirements. We check all restrictions during the free survey." },
    { question: "Do you offer battery storage?", answer: "Yes. We install battery systems alongside solar panels to maximise self-consumption and reduce grid reliance." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#c8ff00",
  accentHover: "#d4ff4d",
};

const galway: CountyData = {
  slug: "galway",
  name: "Galway",
  region: "Connacht",
  province: "Connacht",
  country: "IE",
  phone: "+353-91-523-4100",
  email: "info@renewablegalway.ie",
  domain: "renewablegalway.ie",
  mainTown: "Galway",
  areaTowns: ["Galway City", "Tuam", "Athenry", "Oranmore", "Loughrea", "Clifden"],
  lat: "53.2707",
  lng: "-9.0568",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Galway — from Galway City to Tuam, Athenry to Clifden.",
  testimonials: [
    { name: "Aiden Connolly", location: "Galway City", rating: 5, text: "Renewable Galway provided a seamless experience. From the initial survey to commissioning, everything was handled professionally. We're delighted with the results." },
    { name: "Niamh O'Flaherty", location: "Athenry", rating: 5, text: "We added solar and battery storage to our home in Athenry. Renewable Galway's team was excellent — knowledgeable, efficient, and very tidy." },
    { name: "Sean Joyce", location: "Loughrea", rating: 5, text: "Top quality installation at a fair price. The monitoring app shows our system is performing exactly as quoted. Highly recommend Renewable Galway." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Galway?", answer: "A 4kW system in County Galway costs between €4,500 and €6,500 before the SEAI grant of up to €1,800." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800. We handle the full application on your behalf." },
    { question: "How long does installation take?", answer: "Residential installations in Galway typically take one working day. We manage all aspects including scaffolding." },
    { question: "Does Galway get enough sun for solar?", answer: "Yes. Galway receives sufficient daylight for solar to be a strong investment. Panels work on daylight, not direct sunshine." },
    { question: "Do you install on commercial properties?", answer: "Yes. We install commercial solar systems for businesses, schools, and community buildings across County Galway." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#00bfa5",
  accentHover: "#33ccb8",
};

const kerry: CountyData = {
  slug: "kerry",
  name: "Kerry",
  region: "Munster",
  province: "Munster",
  country: "IE",
  phone: "+353-66-712-3100",
  email: "info@renewablekerry.ie",
  domain: "renewablekerry.ie",
  mainTown: "Tralee",
  areaTowns: ["Tralee", "Killarney", "Listowel", "Kenmare", "Dingle", "Cahersiveen"],
  lat: "52.2781",
  lng: "-9.6866",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Kerry — from Tralee to Killarney, Listowel to Dingle.",
  testimonials: [
    { name: "Denis O'Connor", location: "Tralee", rating: 5, text: "Renewable Kerry did a superb job on our home. Professional installation, great communication, and the SEAI grant was handled without any fuss." },
    { name: "Eileen Murphy", location: "Killarney", rating: 5, text: "We were worried about the impact of Kerry's weather but Renewable Kerry explained everything clearly. Our panels are performing well above expectations." },
    { name: "Michael O'Shea", location: "Listowel", rating: 5, text: "Excellent service from the Renewable Kerry team. The installation was done quickly and cleanly, and we're seeing great savings on our electricity bills." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Kerry?", answer: "A 4kW system in County Kerry costs between €4,500 and €6,500. The SEAI grant can reduce this by up to €1,800." },
    { question: "What SEAI grants are available in Kerry?", answer: "The Domestic Solar PV Grant offers up to €1,800 for home installations. We manage the application process." },
    { question: "How long does installation take?", answer: "Most residential installations in Kerry are completed in one working day. We coordinate all logistics." },
    { question: "Do I need planning permission?", answer: "Domestic solar panels in Ireland are planning-exempt within size limits. Heritage areas may have restrictions." },
    { question: "Do you offer battery storage?", answer: "Yes. We install batteries from leading brands including GivEnergy, FoxESS, and others to maximise your solar self-consumption." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#00bfa5",
  accentHover: "#33ccb8",
};

const kildare: CountyData = {
  slug: "kildare",
  name: "Kildare",
  region: "Leinster",
  province: "Leinster",
  country: "IE",
  phone: "+353-45-891-3100",
  email: "info@renewablekildare.ie",
  domain: "renewablekildare.ie",
  mainTown: "Naas",
  areaTowns: ["Naas", "Newbridge", "Kildare Town", "Celbridge", "Maynooth", "Leixlip"],
  lat: "53.2163",
  lng: "-6.6928",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Kildare — from Naas to Newbridge, Celbridge to Maynooth.",
  testimonials: [
    { name: "Robert Whelan", location: "Naas", rating: 5, text: "Renewable Kildare provided excellent service from start to finish. The SEAI grant was sorted and the installation was completed efficiently in a single day." },
    { name: "Laura Maher", location: "Newbridge", rating: 5, text: "Very professional operation. The survey was thorough, the quote was clear, and the installation was spotless. Highly recommend." },
    { name: "Andrew Byrne", location: "Celbridge", rating: 5, text: "We chose Renewable Kildare based on local recommendations and they exceeded expectations. Great communication throughout the process." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Kildare?", answer: "A 4kW system in Kildare costs between €4,500 and €6,500. The SEAI grant of up to €1,800 can reduce your cost significantly." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant provides up to €1,800. We manage the application process at no extra charge." },
    { question: "How long does installation take?", answer: "Residential installations in Kildare typically take one day. We handle all scaffolding and grid connection." },
    { question: "Do I need planning permission?", answer: "No. Domestic solar panels in Ireland are exempt from planning permission within standard size limits." },
    { question: "Do you offer EV charger installations?", answer: "Yes. We can install solar panels alongside EV charge points, allowing you to charge your vehicle for free using solar energy." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#69f0ae",
  accentHover: "#8ff4c4",
};

const kilkenny: CountyData = {
  slug: "kilkenny",
  name: "Kilkenny",
  region: "Leinster",
  province: "Leinster",
  country: "IE",
  phone: "+353-56-772-3100",
  email: "info@renewablekilkenny.ie",
  domain: "renewablekilkenny.ie",
  mainTown: "Kilkenny",
  areaTowns: ["Kilkenny City", "Thomastown", "Castlecomer", "Callan", "Ferrybank", "Graiguenamanagh"],
  lat: "52.6541",
  lng: "-7.2448",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Kilkenny — from Kilkenny City to Thomastown, Castlecomer to Callan.",
  testimonials: [
    { name: "Pat Ryan", location: "Kilkenny City", rating: 5, text: "Renewable Kilkenny provided a thorough survey and transparent pricing. The installation was done professionally and the system is performing very well." },
    { name: "Aisling Brennan", location: "Thomastown", rating: 5, text: "We're very happy with our solar installation. The SEAI grant was straightforward and the team was excellent from start to finish." },
    { name: "John Phelan", location: "Castlecomer", rating: 5, text: "Great local company that delivers on its promises. The installation was clean and efficient, and we're seeing excellent generation figures." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Kilkenny?", answer: "A 4kW system costs between €4,500 and €6,500. The SEAI grant of up to €1,800 reduces this further." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800. We handle the full application process for you." },
    { question: "How long does installation take?", answer: "Most installations in Kilkenny are completed in one working day." },
    { question: "Do I need planning permission?", answer: "Domestic solar panels are planning-exempt in Ireland within standard limits." },
    { question: "Do you install battery storage?", answer: "Yes. Battery storage lets you save excess solar for evening and night use, increasing your self-consumption significantly." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#ffd600",
  accentHover: "#ffde33",
};

const laois: CountyData = {
  slug: "laois",
  name: "Laois",
  region: "Leinster",
  province: "Leinster",
  country: "IE",
  phone: "+353-57-862-3100",
  email: "info@renewablelaois.ie",
  domain: "renewablelaois.ie",
  mainTown: "Portlaoise",
  areaTowns: ["Portlaoise", "Portarlington", "Mountmellick", "Abbeyleix", "Stradbally", "Rathdowney"],
  lat: "53.0327",
  lng: "-7.3034",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Laois — from Portlaoise to Portarlington, Mountmellick to Abbeyleix.",
  testimonials: [
    { name: "James Delaney", location: "Portlaoise", rating: 5, text: "Renewable Laois delivered exactly what they promised. Clean installation, good communication, and our electricity bills are significantly lower." },
    { name: "Margaret Dunne", location: "Abbeyleix", rating: 5, text: "We're very pleased with our solar panels. The SEAI grant was easy to apply for with Renewable Laois's help, and the installation was done in a day." },
    { name: "Liam Fitzpatrick", location: "Mountmellick", rating: 5, text: "Professional and reliable. Renewable Laois installed our system efficiently and it's been generating well above the quoted figures." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Laois?", answer: "A 4kW system in County Laois costs between €4,500 and €6,500 before the SEAI grant." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800 for home installations." },
    { question: "How long does installation take?", answer: "Most residential installations in Laois are completed in one working day." },
    { question: "Do I need planning permission?", answer: "No. Domestic solar panels are planning-exempt in Ireland within standard limits." },
    { question: "Do you install commercial systems?", answer: "Yes. We design and install solar systems for businesses, farms, and commercial properties across Laois." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#dce775",
  accentHover: "#e5ee9a",
};

const leitrim: CountyData = {
  slug: "leitrim",
  name: "Leitrim",
  region: "Connacht",
  province: "Connacht",
  country: "IE",
  phone: "+353-71-962-3100",
  email: "info@renewableleitrim.ie",
  domain: "renewableleitrim.ie",
  mainTown: "Carrick-on-Shannon",
  areaTowns: ["Carrick-on-Shannon", "Manorhamilton", "Drumshanbo", "Mohill", "Ballinamore", "Kinlough"],
  lat: "53.9330",
  lng: "-8.0847",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Leitrim — from Carrick-on-Shannon to Manorhamilton, Drumshanbo to Ballinamore.",
  testimonials: [
    { name: "Michael Gallagher", location: "Carrick-on-Shannon", rating: 5, text: "Renewable Leitrim provided a great service. The installation was efficient and we're very happy with the performance of our system." },
    { name: "Bernie Feeney", location: "Drumshanbo", rating: 5, text: "We chose Renewable Leitrim for their local knowledge and competitive pricing. The installation was done in a day and the results are excellent." },
    { name: "Paddy Reynolds", location: "Manorhamilton", rating: 5, text: "Very professional outfit. The team was courteous, tidy, and clearly experienced. We'd recommend Renewable Leitrim without hesitation." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Leitrim?", answer: "A 4kW system in County Leitrim costs between €4,500 and €6,500, with the SEAI grant reducing this by up to €1,800." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant provides up to €1,800. We manage the application on your behalf." },
    { question: "How long does installation take?", answer: "Residential installations in Leitrim typically take one working day." },
    { question: "Do I need planning permission?", answer: "Domestic solar installations are planning-exempt in Ireland within standard limits." },
    { question: "Do you install on farm buildings?", answer: "Yes. We have extensive experience with agricultural solar installations across County Leitrim." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#7cb342",
  accentHover: "#96c366",
};

const limerick: CountyData = {
  slug: "limerick",
  name: "Limerick",
  region: "Munster",
  province: "Munster",
  country: "IE",
  phone: "+353-61-412-3100",
  email: "info@renewablelimerick.ie",
  domain: "renewablelimerick.ie",
  mainTown: "Limerick",
  areaTowns: ["Limerick City", "Newcastle West", "Rathkeale", "Kilmallock", "Abbeyfeale", "Bruff"],
  lat: "52.6680",
  lng: "-8.6305",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Limerick — from Limerick City to Newcastle West, Rathkeale to Kilmallock.",
  testimonials: [
    { name: "Timothy O'Brien", location: "Limerick City", rating: 5, text: "Renewable Limerick installed a 5kW system on our home and the results have been outstanding. The SEAI grant was handled efficiently and the installation was done in a day." },
    { name: "Catherine O'Sullivan", location: "Kilmallock", rating: 5, text: "We added battery storage to our solar installation and are now virtually self-sufficient during the summer months. Excellent service from Renewable Limerick." },
    { name: "Gerard Meaney", location: "Newcastle West", rating: 5, text: "Professional, reliable, and competitively priced. Renewable Limerick did a great job on our property and we're seeing significant electricity savings." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Limerick?", answer: "A 4kW system in Limerick costs between €4,500 and €6,500 before the SEAI grant of up to €1,800." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800 for homes. We handle the full application process." },
    { question: "How long does installation take?", answer: "Most Limerick installations take one working day. Larger systems may take 2–3 days." },
    { question: "Do I need planning permission?", answer: "Domestic solar panels are planning-exempt in Ireland within standard size limits." },
    { question: "Do you install EV chargers?", answer: "Yes. We can pair your solar system with an EV charge point so you can charge your car using free solar electricity." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#76ff03",
  accentHover: "#93ff3d",
};

const longford: CountyData = {
  slug: "longford",
  name: "Longford",
  region: "Leinster",
  province: "Leinster",
  country: "IE",
  phone: "+353-43-334-5100",
  email: "info@renewablelongford.ie",
  domain: "renewablelongford.ie",
  mainTown: "Longford",
  areaTowns: ["Longford Town", "Ballymahon", "Granard", "Edgeworthstown", "Ardagh", "Lanesborough"],
  lat: "53.7267",
  lng: "-7.7949",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Longford — from Longford Town to Ballymahon, Granard to Edgeworthstown.",
  testimonials: [
    { name: "Brian Kenny", location: "Longford Town", rating: 5, text: "Renewable Longford were excellent. They handled everything from survey to SEAI grant, and the installation was done in a single day." },
    { name: "Rose Brady", location: "Ballymahon", rating: 5, text: "We're very pleased with our solar panels. The system is generating well and we've seen a real reduction in our electricity bills." },
    { name: "Francis McCabe", location: "Granard", rating: 5, text: "Great service from a local company. Renewable Longford were professional, competitively priced, and the installation was done to a high standard." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Longford?", answer: "A 4kW system in County Longford costs between €4,500 and €6,500. The SEAI grant of up to €1,800 applies." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800. We manage the application for you." },
    { question: "How long does installation take?", answer: "Residential installations in Longford typically take one working day." },
    { question: "Do I need planning permission?", answer: "No. Domestic solar panels are exempt from planning in Ireland within standard limits." },
    { question: "Do you install on farms?", answer: "Yes. We design and install agricultural solar systems across County Longford." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#aed581",
  accentHover: "#c2dfa0",
};

const louth: CountyData = {
  slug: "louth",
  name: "Louth",
  region: "Leinster",
  province: "Leinster",
  country: "IE",
  phone: "+353-42-932-6100",
  email: "info@renewablelouth.ie",
  domain: "renewablelouth.ie",
  mainTown: "Dundalk",
  areaTowns: ["Dundalk", "Drogheda", "Ardee", "Dunleer", "Collon", "Carlingford"],
  lat: "53.9179",
  lng: "-6.3870",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Louth — from Dundalk to Drogheda, Ardee to Carlingford.",
  testimonials: [
    { name: "John Callan", location: "Dundalk", rating: 5, text: "Renewable Louth delivered a first-class installation. The system is performing exactly as quoted and the SEAI grant was handled efficiently." },
    { name: "Michelle Mackin", location: "Drogheda", rating: 5, text: "We chose Renewable Louth based on their local reputation and they didn't disappoint. Clean, professional installation with excellent aftercare." },
    { name: "Eugene Mathews", location: "Ardee", rating: 5, text: "Very happy with our solar panels. The installation was done quickly and we've seen a significant reduction in our electricity bills." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Louth?", answer: "A 4kW system in County Louth costs between €4,500 and €6,500 before the SEAI grant." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800 for homes. We manage the full application." },
    { question: "How long does installation take?", answer: "Most installations in Louth are completed in one working day." },
    { question: "Do I need planning permission?", answer: "Domestic solar panels are planning-exempt in Ireland within standard limits." },
    { question: "Do you offer battery storage?", answer: "Yes. We install battery systems that store excess solar for use when the sun isn't shining." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#18ffff",
  accentHover: "#4fffff",
};

const mayo: CountyData = {
  slug: "mayo",
  name: "Mayo",
  region: "Connacht",
  province: "Connacht",
  country: "IE",
  phone: "+353-94-902-3100",
  email: "info@renewablemayo.ie",
  domain: "renewablemayo.ie",
  mainTown: "Castlebar",
  areaTowns: ["Castlebar", "Westport", "Ballina", "Claremorris", "Belmullet", "Achill"],
  lat: "53.8606",
  lng: "-9.2889",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Mayo — from Castlebar to Westport, Ballina to Claremorris.",
  testimonials: [
    { name: "Tommy Gallagher", location: "Castlebar", rating: 5, text: "Renewable Mayo installed a 4kW system on our home and the results have been fantastic. Even through the Atlantic weather we're generating consistently. Professional team from start to finish." },
    { name: "Maura Healy", location: "Westport", rating: 5, text: "We were recommended Renewable Mayo by a neighbour and they didn't disappoint. The installation was quick, clean, and our electricity bills have dropped by over 60%." },
    { name: "Padraig Kelly", location: "Ballina", rating: 5, text: "As a farmer outside Ballina, I needed a system that could handle heavy daytime usage. Renewable Mayo designed a solution that covers nearly all our electricity needs. Great local company." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Mayo?", answer: "A typical 4kW system in County Mayo costs between €4,500 and €6,500. The SEAI grant can reduce this by up to €1,800." },
    { question: "Does solar work in Mayo's Atlantic climate?", answer: "Yes. Solar panels generate electricity from daylight, not direct sunshine. Mayo receives ample daylight for effective solar generation, and modern panels are highly efficient in all weather conditions." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800 for homes. We manage the full application on your behalf." },
    { question: "How long does installation take?", answer: "Most residential installations in Mayo are completed in one working day. We coordinate scaffolding and grid connection." },
    { question: "Do I need planning permission?", answer: "Domestic solar panels are exempt from planning permission in Ireland within standard limits. We'll confirm during your free survey." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#00e5ff",
  accentHover: "#33ebff",
};

const meath: CountyData = {
  slug: "meath",
  name: "Meath",
  region: "Leinster",
  province: "Leinster",
  country: "IE",
  phone: "+353-46-902-3100",
  email: "info@renewablemeath.ie",
  domain: "renewableMeath.ie",
  mainTown: "Navan",
  areaTowns: ["Navan", "Ashbourne", "Dunboyne", "Kells", "Trim", "Laytown"],
  lat: "53.6535",
  lng: "-6.6879",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Meath — from Navan to Ashbourne, Kells to Trim.",
  testimonials: [
    { name: "Derek Farrell", location: "Navan", rating: 5, text: "Renewable Meath provided an excellent end-to-end service. From survey to installation, everything was professional and well-coordinated." },
    { name: "Orla Smith", location: "Ashbourne", rating: 5, text: "We're very happy with our solar installation. The SEAI grant process was handled smoothly and the system is performing well." },
    { name: "Gareth Reilly", location: "Dunboyne", rating: 5, text: "Great service from a knowledgeable team. Renewable Meath delivered exactly what they promised and we're seeing real savings." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Meath?", answer: "A 4kW system in County Meath costs between €4,500 and €6,500. The SEAI grant can reduce this by up to €1,800." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800. We handle the full application." },
    { question: "How long does installation take?", answer: "Most Meath installations are completed in one working day." },
    { question: "Do I need planning permission?", answer: "Domestic solar panels are planning-exempt within standard limits in Ireland." },
    { question: "Do you install EV chargers?", answer: "Yes. We can install EV charge points alongside your solar system for free solar-powered charging." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#b2ff59",
  accentHover: "#c5ff82",
};

const monaghan: CountyData = {
  slug: "monaghan",
  name: "Monaghan",
  region: "Ulster",
  province: "Ulster",
  country: "IE",
  phone: "+353-47-812-3100",
  email: "info@renewablemonaghan.ie",
  domain: "renewablemonaghan.ie",
  mainTown: "Monaghan",
  areaTowns: ["Monaghan Town", "Castleblayney", "Carrickmacross", "Clones", "Ballybay", "Newbliss"],
  lat: "54.2493",
  lng: "-6.9703",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Monaghan — from Monaghan Town to Castleblayney, Carrickmacross to Clones.",
  testimonials: [
    { name: "Raymond McEntee", location: "Monaghan Town", rating: 5, text: "Renewable Monaghan did an excellent job on our home. The installation was done efficiently and the SEAI grant was handled without any hassle." },
    { name: "Anne Sherry", location: "Carrickmacross", rating: 5, text: "We're delighted with our solar panels. The system is performing well and we've seen a real reduction in our electricity costs." },
    { name: "Thomas McNally", location: "Castleblayney", rating: 5, text: "Professional and thorough. Renewable Monaghan provided a great service at a competitive price. Highly recommend them." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Monaghan?", answer: "A 4kW system in County Monaghan costs between €4,500 and €6,500. The SEAI grant of up to €1,800 applies." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800. We manage the application for you." },
    { question: "How long does installation take?", answer: "Residential installations in Monaghan take one working day." },
    { question: "Do I need planning permission?", answer: "No. Domestic solar panels are planning-exempt within standard limits." },
    { question: "Do you install on farms?", answer: "Yes. We have extensive experience with agricultural solar systems in County Monaghan." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#4db6ac",
  accentHover: "#76c8c0",
};

const offaly: CountyData = {
  slug: "offaly",
  name: "Offaly",
  region: "Leinster",
  province: "Leinster",
  country: "IE",
  phone: "+353-57-932-3100",
  email: "info@renewableoffaly.ie",
  domain: "renewableoffaly.ie",
  mainTown: "Tullamore",
  areaTowns: ["Tullamore", "Birr", "Clara", "Edenderry", "Banagher", "Ferbane"],
  lat: "53.2706",
  lng: "-7.4903",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Offaly — from Tullamore to Birr, Edenderry to Banagher.",
  testimonials: [
    { name: "Pat O'Meara", location: "Tullamore", rating: 5, text: "Renewable Offaly provided an excellent service. The installation was efficient and the system is performing very well. Great local company." },
    { name: "Deirdre Flanagan", location: "Birr", rating: 5, text: "We're very pleased with our solar installation. The SEAI grant was handled smoothly and the team was professional throughout." },
    { name: "Thomas Breslin", location: "Edenderry", rating: 5, text: "Top-notch installation. Renewable Offaly delivered on every promise and we're seeing significant savings on our bills." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Offaly?", answer: "A 4kW system in County Offaly costs between €4,500 and €6,500 before the SEAI grant." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800 for home installations." },
    { question: "How long does installation take?", answer: "Most Offaly installations are completed in one working day." },
    { question: "Do I need planning permission?", answer: "Domestic solar panels are planning-exempt within standard limits in Ireland." },
    { question: "Do you install battery storage?", answer: "Yes. We install battery systems to store excess solar energy for later use." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#c5e1a5",
  accentHover: "#d5eabd",
};

const roscommon: CountyData = {
  slug: "roscommon",
  name: "Roscommon",
  region: "Connacht",
  province: "Connacht",
  country: "IE",
  phone: "+353-90-662-3100",
  email: "info@renewableroscommon.ie",
  domain: "renewableroscommon.ie",
  mainTown: "Roscommon",
  areaTowns: ["Roscommon Town", "Castlerea", "Boyle", "Strokestown", "Ballaghaderreen", "Athlone"],
  lat: "53.6306",
  lng: "-8.1990",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Roscommon — from Roscommon Town to Boyle, Castlerea to Strokestown.",
  testimonials: [
    { name: "Thomas Mannion", location: "Roscommon Town", rating: 5, text: "Renewable Roscommon did a fantastic job on our home. The installation was done efficiently and the SEAI grant was handled without any issues." },
    { name: "Brid Mulry", location: "Castlerea", rating: 5, text: "We're very happy with our solar installation. Professional team, clean work, and the system is performing well above expectations." },
    { name: "James Finan", location: "Boyle", rating: 5, text: "Great service from start to finish. Renewable Roscommon delivered on everything they promised. Highly recommend." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Roscommon?", answer: "A 4kW system in County Roscommon costs between €4,500 and €6,500. The SEAI grant of up to €1,800 applies." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800. We handle the full application process." },
    { question: "How long does installation take?", answer: "Residential installations in Roscommon take one working day." },
    { question: "Do I need planning permission?", answer: "No. Domestic solar panels are planning-exempt within standard limits." },
    { question: "Do you install on farms?", answer: "Yes. We design and install agricultural solar systems for farms across County Roscommon." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#8bc34a",
  accentHover: "#a3d16d",
};

const sligo: CountyData = {
  slug: "sligo",
  name: "Sligo",
  region: "Connacht",
  province: "Connacht",
  country: "IE",
  phone: "+353-71-914-3100",
  email: "info@renewablesligo.ie",
  domain: "renewablesligo.ie",
  mainTown: "Sligo",
  areaTowns: ["Sligo Town", "Tubbercurry", "Enniscrone", "Grange", "Ballymote", "Collooney"],
  lat: "54.2711",
  lng: "-8.4718",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Sligo — from Sligo Town to Tubbercurry, Enniscrone to Grange.",
  testimonials: [
    { name: "Declan Gilmartin", location: "Sligo Town", rating: 5, text: "Renewable Sligo provided a great service. The installation was done efficiently and our electricity bills have dropped significantly." },
    { name: "Ita Gallagher", location: "Tubbercurry", rating: 5, text: "Very happy with our solar panels. The SEAI grant was straightforward and the team at Renewable Sligo was professional throughout." },
    { name: "Michael Brennan", location: "Enniscrone", rating: 5, text: "Excellent installation on our coastal property. Renewable Sligo understood the specific considerations for our location and delivered a first-class result." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Sligo?", answer: "A 4kW system in County Sligo costs between €4,500 and €6,500 before the SEAI grant." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800. We manage the application process." },
    { question: "How long does installation take?", answer: "Most Sligo installations are completed in one working day." },
    { question: "Do I need planning permission?", answer: "Domestic solar panels are planning-exempt in Ireland within standard limits." },
    { question: "Do you install battery storage?", answer: "Yes. We install battery systems to maximise your solar self-consumption and reduce grid reliance." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#4db6ac",
  accentHover: "#76c8c0",
};

const tipperary: CountyData = {
  slug: "tipperary",
  name: "Tipperary",
  region: "Munster",
  province: "Munster",
  country: "IE",
  phone: "+353-62-512-3100",
  email: "info@renewabletipperary.ie",
  domain: "renewabletipperary.ie",
  mainTown: "Clonmel",
  areaTowns: ["Clonmel", "Nenagh", "Thurles", "Carrick-on-Suir", "Cashel", "Templemore"],
  lat: "52.3382",
  lng: "-7.7084",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Tipperary — from Clonmel to Nenagh, Thurles to Cashel.",
  testimonials: [
    { name: "Eddie Ryan", location: "Clonmel", rating: 5, text: "Renewable Tipperary installed a 5kW system on our home and the results have been excellent. The SEAI grant was handled without any hassle." },
    { name: "Mary O'Dwyer", location: "Thurles", rating: 5, text: "Very professional service from start to finish. The installation was done in a day and we're very happy with the results." },
    { name: "John Maher", location: "Nenagh", rating: 5, text: "Renewable Tipperary did a fantastic job. Clean installation, good communication, and the system is performing exactly as quoted." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Tipperary?", answer: "A 4kW system in County Tipperary costs between €4,500 and €6,500. The SEAI grant of up to €1,800 applies." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800. We handle the application on your behalf." },
    { question: "How long does installation take?", answer: "Residential installations in Tipperary take one working day." },
    { question: "Do I need planning permission?", answer: "No. Domestic solar panels are planning-exempt within standard limits." },
    { question: "Do you install on farms?", answer: "Yes. We have extensive experience with agricultural solar across County Tipperary." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#ffab00",
  accentHover: "#ffbd40",
};

const waterford: CountyData = {
  slug: "waterford",
  name: "Waterford",
  region: "Munster",
  province: "Munster",
  country: "IE",
  phone: "+353-51-842-3100",
  email: "info@renewablewaterford.ie",
  domain: "renewablewaterford.ie",
  mainTown: "Waterford",
  areaTowns: ["Waterford City", "Dungarvan", "Tramore", "Lismore", "Kilmacthomas", "Portlaw"],
  lat: "52.2593",
  lng: "-7.1101",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Waterford — from Waterford City to Dungarvan, Tramore to Lismore.",
  testimonials: [
    { name: "John Power", location: "Waterford City", rating: 5, text: "Renewable Waterford provided an excellent service. The installation was done in a day and the SEAI grant was handled efficiently." },
    { name: "Sinead Kirwan", location: "Dungarvan", rating: 5, text: "We're very pleased with our solar panels. The system is generating well and the team was professional and knowledgeable." },
    { name: "Mike Foley", location: "Tramore", rating: 5, text: "Great installation on our coastal home. Renewable Waterford were thorough, reliable, and the system has exceeded expectations." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Waterford?", answer: "A 4kW system in County Waterford costs between €4,500 and €6,500 before the SEAI grant." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800 for homes. We manage the full application." },
    { question: "How long does installation take?", answer: "Most Waterford installations are completed in one working day." },
    { question: "Do I need planning permission?", answer: "Domestic solar panels are planning-exempt within standard limits." },
    { question: "Do you install battery storage?", answer: "Yes. We install battery systems to store excess solar energy for evening and night use." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#00e676",
  accentHover: "#33ed91",
};

const westmeath: CountyData = {
  slug: "westmeath",
  name: "Westmeath",
  region: "Leinster",
  province: "Leinster",
  country: "IE",
  phone: "+353-44-933-3100",
  email: "info@renewablewestmeath.ie",
  domain: "renewablewestmeath.ie",
  mainTown: "Mullingar",
  areaTowns: ["Mullingar", "Athlone", "Kinnegad", "Moate", "Castlepollard", "Kilbeggan"],
  lat: "53.5244",
  lng: "-7.3408",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Westmeath — from Mullingar to Athlone, Kinnegad to Castlepollard.",
  testimonials: [
    { name: "Michael Smyth", location: "Mullingar", rating: 5, text: "Renewable Westmeath provided an excellent service. The installation was efficient and the SEAI grant was sorted without any issues." },
    { name: "Mary O'Brien", location: "Athlone", rating: 5, text: "We're very happy with our solar panels. The team was professional, tidy, and the system is performing very well." },
    { name: "John Connolly", location: "Kinnegad", rating: 5, text: "Great installation at a fair price. Renewable Westmeath delivered exactly what they promised and the results speak for themselves." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Westmeath?", answer: "A 4kW system in County Westmeath costs between €4,500 and €6,500. The SEAI grant can reduce this by up to €1,800." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800. We handle the application." },
    { question: "How long does installation take?", answer: "Residential installations in Westmeath typically take one working day." },
    { question: "Do I need planning permission?", answer: "Domestic solar panels are planning-exempt within standard limits in Ireland." },
    { question: "Do you install EV chargers?", answer: "Yes. We can install solar panels alongside an EV charge point for free solar-powered vehicle charging." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#64dd17",
  accentHover: "#84e54d",
};

const wexford: CountyData = {
  slug: "wexford",
  name: "Wexford",
  region: "Leinster",
  province: "Leinster",
  country: "IE",
  phone: "+353-53-912-3100",
  email: "info@renewablewexford.ie",
  domain: "renewablewexford.ie",
  mainTown: "Wexford",
  areaTowns: ["Wexford Town", "Enniscorthy", "Gorey", "New Ross", "Ferns", "Bunclody"],
  lat: "52.3369",
  lng: "-6.4633",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Wexford — from Wexford Town to Enniscorthy, Gorey to New Ross.",
  testimonials: [
    { name: "Jimmy Roche", location: "Wexford Town", rating: 5, text: "Renewable Wexford did a superb job on our home. The installation was done in a day and we're seeing excellent generation from our coastal location." },
    { name: "Margaret Kinsella", location: "Enniscorthy", rating: 5, text: "We're delighted with our solar installation. Professional team and the SEAI grant was handled smoothly from start to finish." },
    { name: "Paddy Doyle", location: "Gorey", rating: 5, text: "Excellent service from Renewable Wexford. Clean installation, good communication, and the system is performing very well." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Wexford?", answer: "A 4kW system in County Wexford costs between €4,500 and €6,500 before the SEAI grant." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800 for homes. We manage the application." },
    { question: "How long does installation take?", answer: "Most Wexford installations are completed in one working day." },
    { question: "Do I need planning permission?", answer: "Domestic solar panels are planning-exempt within standard limits." },
    { question: "Do you install battery storage?", answer: "Yes. Battery storage lets you maximise solar self-consumption and reduce evening grid reliance." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#00e5ff",
  accentHover: "#33ecff",
};

const wicklow: CountyData = {
  slug: "wicklow",
  name: "Wicklow",
  region: "Leinster",
  province: "Leinster",
  country: "IE",
  phone: "+353-404-232-3100",
  email: "info@renewablewicklow.ie",
  domain: "renewablewicklow.ie",
  mainTown: "Wicklow",
  areaTowns: ["Wicklow Town", "Bray", "Greystones", "Arklow", "Enniskerry", "Blessington"],
  lat: "52.9869",
  lng: "-6.0455",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Non-Domestic Solar PV Grant — for businesses",
    "TACs (Tax Exemption for Solar PV under €1,000 annual income)",
  ],
  heroSubtitle:
    "SEAI registered solar panel installers serving County Wicklow — from Wicklow Town to Bray, Greystones to Arklow.",
  testimonials: [
    { name: "Brian O'Toole", location: "Bray", rating: 5, text: "Renewable Wicklow provided a first-class service. The installation on our home was done efficiently and the SEAI grant was handled seamlessly." },
    { name: "Grainne Nolan", location: "Greystones", rating: 5, text: "We added solar and battery storage and couldn't be happier. Renewable Wicklow's team was professional and the results have exceeded our expectations." },
    { name: "Conor Kavanagh", location: "Arklow", rating: 5, text: "Great installation at a competitive price. The system is performing well and the aftercare from Renewable Wicklow has been excellent." },
  ],
  faqs: [
    { question: "How much do solar panels cost in Wicklow?", answer: "A 4kW system in County Wicklow costs between €4,500 and €6,500. The SEAI grant of up to €1,800 applies." },
    { question: "What SEAI grants are available?", answer: "The Domestic Solar PV Grant offers up to €1,800. We handle the full application." },
    { question: "How long does installation take?", answer: "Residential installations in Wicklow typically take one working day." },
    { question: "Do I need planning permission?", answer: "Domestic solar panels are planning-exempt within standard limits. Some heritage areas may have restrictions." },
    { question: "Do you offer EV charger installation?", answer: "Yes. We install EV charge points alongside solar so you can charge for free using your own generated electricity." },
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#1de9b6",
  accentHover: "#4eedc7",
};

// ========================
// SERVICES DATA
// ========================

export interface ServiceData {
  slug: string;
  title: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
}

export const services: ServiceData[] = [
  {
    slug: "home-solar-panels",
    title: "Home Solar Panels",
    icon: "home",
    shortDescription:
      "Reduce your household electricity bills with a professionally installed residential solar PV system. Generate free, clean energy from your roof.",
    longDescription:
      "Our residential solar panel systems are designed to maximise your home's energy independence. Using premium tier-1 panels and industry-leading inverters, we tailor every installation to your roof's unique characteristics. Whether you're in a new-build semi or a period detached property, our MCS or SEAI certified engineers will design a system that delivers maximum generation and minimum visual impact.",
    features: [
      "Free site survey and detailed performance estimate",
      "Premium tier-1 solar panels with 25-year performance warranty",
      "Industry-leading inverters with 10+ year warranty",
      "Real-time monitoring app included with every system",
      "Full scaffolding, installation, and grid connection",
      "10-year workmanship warranty as standard",
    ],
  },
  {
    slug: "commercial-solar-panels",
    title: "Commercial Solar",
    icon: "building",
    shortDescription:
      "Cut your business energy costs and demonstrate environmental commitment with a commercial solar installation tailored to your premises.",
    longDescription:
      "Energy costs are one of the biggest overheads for businesses. A commercial solar installation lets you generate your own electricity, reducing your dependence on the grid and protecting against rising energy prices. We've installed systems on offices, warehouses, retail units, and public buildings — every installation is designed around your specific energy profile and roof structure.",
    features: [
      "Detailed energy audit and system sizing",
      "ROI projection and payback analysis",
      "Tier-1 commercial-grade panels and inverters",
      "Custom mounting solutions for flat and pitched roofs",
      "Ongoing performance monitoring and maintenance",
      "Assistance with SEG/Feed-in tariff applications",
    ],
  },
  {
    slug: "agricultural-solar-panels",
    title: "Agricultural Solar",
    icon: "tractor",
    shortDescription:
      "Power your farm operations with solar energy. Ideal for dairy parlours, grain stores, poultry houses, and general farm electricity needs.",
    longDescription:
      "Farms are high energy consumers — milking parlours, grain dryers, ventilation systems, and refrigeration units run for hours every day. Agricultural solar panels let you generate free electricity to power these operations, dramatically reducing your farm's running costs. We've installed ground-mounted and roof-mounted systems on farms across the region, designed to withstand the agricultural environment.",
    features: [
      "Roof-mounted and ground-mounted options",
      "Systems designed for high daytime energy consumption",
      "Durable, weather-resistant mounting systems",
      "Three-phase compatibility for larger farm installations",
      "SEG export payments for surplus energy",
      "Designed to integrate with existing farm infrastructure",
    ],
  },
  {
    slug: "battery-storage",
    title: "Battery Storage",
    icon: "battery",
    shortDescription:
      "Store excess solar energy for evening and night use. A battery system can increase your solar self-consumption to 80% or more.",
    longDescription:
      "Without battery storage, surplus solar energy generated during the day is exported to the grid — often at a lower rate than you pay for importing electricity. A battery system stores this excess for use in the evening and overnight, dramatically increasing the proportion of your electricity that comes from your own solar panels. With a properly sized battery, some homes achieve 80–90% self-consumption.",
    features: [
      "Leading battery brands: GivEnergy, Tesla Powerwall, FoxESS",
      "Scalable systems from 5kWh to 20kWh+",
      "Seamless integration with new or existing solar installations",
      "Smart charge/discharge management",
      "Backup power capability during grid outages (select models)",
      "10-year battery warranty as standard",
    ],
  },
  {
    slug: "ev-chargers",
    title: "EV Chargers",
    icon: "zap",
    shortDescription:
      "Charge your electric vehicle using free solar energy. Combine solar panels with an EV charge point and never pay to fuel your car again.",
    longDescription:
      "If you own or are considering an electric vehicle, combining your home solar system with an EV charge point makes perfect financial sense. During daylight hours, your solar panels generate free electricity that can charge your car — effectively giving you free fuel. With a typical EV using 15–20 kWh per 100 miles, a well-sized solar system can cover a significant portion of your annual driving costs.",
    features: [
      "Home charge point installation alongside solar",
      "Smart charging that prioritises solar-generated energy",
      "Compatible with all major EV brands",
      "Scheduled charging for off-peak electricity rates",
      "OLEV/EVHS grant assistance where applicable",
      "App-controlled charging and monitoring",
    ],
  },
  {
    slug: "solar-maintenance",
    title: "Solar Maintenance",
    icon: "wrench",
    shortDescription:
      "Keep your solar system performing at its best with our comprehensive maintenance and servicing packages. Annual inspections from just £149/€169.",
    longDescription:
      "Like any investment, your solar system performs best when properly maintained. Our maintenance packages include panel cleaning, electrical safety checks, inverter inspections, and performance verification. Regular maintenance ensures your system continues to generate at its rated capacity and helps identify any issues before they affect output. We offer one-off inspections and annual service contracts.",
    features: [
      "Panel cleaning to remove dirt, debris, and bird deposits",
      "Full electrical safety inspection and testing",
      "Inverter health check and firmware updates",
      "Performance analysis against original estimates",
      "Mounting system and roof integrity inspection",
      "Priority response for warranty claims",
    ],
  },
];

// ========================
// ALL COUNTIES MAP
// ========================

export const counties: Record<string, CountyData> = {
  tyrone,
  antrim,
  armagh,
  down,
  fermanagh,
  londonderry,
  carlow,
  cavan,
  clare,
  cork,
  donegal,
  dublin,
  galway,
  kerry,
  kildare,
  kilkenny,
  laois,
  leitrim,
  limerick,
  longford,
  louth,
  meath,
  mayo,
  monaghan,
  offaly,
  roscommon,
  sligo,
  tipperary,
  waterford,
  westmeath,
  wexford,
  wicklow,
};

export const countySlugs = Object.keys(counties);

export function getCounty(slug: string): CountyData | undefined {
  return counties[slug.toLowerCase()];
}

export function getService(serviceSlug: string): ServiceData | undefined {
  return services.find((s) => s.slug === serviceSlug);
}
