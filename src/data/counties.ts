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
  heroTitle: string;
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

  // Generate accent-tinted backgrounds (mix with white)
  const ltR = Math.round(r + (255 - r) * 0.88);
  const ltG = Math.round(g + (255 - g) * 0.88);
  const ltB = Math.round(b + (255 - b) * 0.88);
  const mdR = Math.round(r + (255 - r) * 0.68);
  const mdG = Math.round(g + (255 - g) * 0.68);
  const mdB = Math.round(b + (255 - b) * 0.68);

  return {
    '--accent': hex,
    '--accent-hover': hover,
    '--accent-glow': `rgba(${r}, ${g}, ${b}, 0.25)`,
    '--accent-glow-md': `rgba(${r}, ${g}, ${b}, 0.30)`,
    '--accent-faint': `rgba(${r}, ${g}, ${b}, 0.20)`,
    '--accent-subtle': `rgba(${r}, ${g}, ${b}, 0.10)`,
    '--accent-bg': `rgba(${r}, ${g}, ${b}, 0.06)`,
    '--accent-bg-md': `rgba(${r}, ${g}, ${b}, 0.08)`,
    '--accent-bg-strong': `rgba(${r}, ${g}, ${b}, 0.12)`,
    '--accent-border': `rgba(${r}, ${g}, ${b}, 0.30)`,
    '--accent-border-strong': `rgba(${r}, ${g}, ${b}, 0.45)`,
    '--accent-border-faint': `rgba(${r}, ${g}, ${b}, 0.15)`,
    '--accent-border-md': `rgba(${r}, ${g}, ${b}, 0.20)`,
    '--accent-text-muted': `rgba(${r}, ${g}, ${b}, 0.50)`,
    '--accent-lt': `rgb(${ltR}, ${ltG}, ${ltB})`,
    '--accent-mid': `rgb(${mdR}, ${mdG}, ${mdB})`,
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
    "Significant energy savings — reduce electricity bills by up to 70%",
    "Energy Company Obligation (ECO) for qualifying households",
    "MCS certified installations with 25-year panel warranty",
  ],
  heroSubtitle:
    "Helping Tyrone homeowners cut electricity bills by up to 70%. MCS certified installations across Omagh, Dungannon, Cookstown and the wider county.",
  heroTitle: "Solar Panels Tyrone.\nThe Smartest Energy Investment You'll Ever Make.",
  testimonials: [
    {
      name: "Ciarán Mulgrew",
      location: "Omagh",
      rating: 5,
      text: "Solar Tyrone were different from the first phone call. No hard sell, just straight answers about what a 4kW system would do for our semi in Omagh. They turned up when they said they would, cleaned up after themselves, and our first full month's bill dropped from £142 to £38. Genuinely the best home improvement we've made.",
    },
    {
      name: "Gráinne Clarke",
      location: "Dungannon",
      rating: 5,
      text: "We run a small B&B outside Dungannon and electricity was one of our biggest overheads. Solar Tyrone installed a 6kW system on the south-facing roof of the main house and we're now generating most of our own electricity — our bills have dropped dramatically. The installation took a single day and caused zero disruption to guests. Highly recommend them to any Tyrone business owner.",
    },
    {
      name: "James Donnelly",
      location: "Cookstown",
      rating: 5,
      text: "As a dairy farmer outside Cookstown, milking parlour electricity was costing a fortune. Solar Tyrone designed a ground-mounted array that covers almost all of our daytime usage. The ROI projection they gave us at quote stage has been accurate — we're on track for a 5.5-year payback, which is better than they promised.",
    },
    {
      name: "Aoife McCullagh",
      location: "Strabane",
      rating: 5,
      text: "I was sceptical about whether solar panels would work given our weather in Strabane, but the team at Solar Tyrone explained that daylight — not direct sunshine — is what matters. Even through the winter months we've seen consistent generation. The monitoring app they set up is genuinely useful for tracking output.",
    },
    {
      name: "Patrick O'Neill",
      location: "Fivemiletown",
      rating: 5,
      text: "We had three quotes for our detached house in Fivemiletown. Solar Tyrone weren't the cheapest, but they were the only ones who came out, measured the roof properly, and explained the difference between panel brands. That level of detail gave us confidence, and the installation has been flawless for six months now.",
    },
    {
      name: "Eleanor Breslin",
      location: "Dromore",
      rating: 5,
      text: "From the initial survey to the final handover, the whole experience with Solar Tyrone was professional and straightforward. They handled everything — scaffolding, grid application, the lot. Our system has generated over 3,800 kWh in its first year, which is right in line with what they predicted. A great local company.",
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
      question: "How much will I save on electricity bills with solar panels?",
      answer:
        "Typical savings depend on your system size and electricity usage, but most Tyrone homeowners with a 4kW system see a 60–70% reduction in their electricity bills. For an average household spending £1,200–£1,800 per year on electricity, that translates to savings of £800–£1,200 annually. Adding a battery can push self-consumption even higher, reducing your grid reliance to near zero in summer months.",
    },
    {
      question: "How long do solar panels last and what warranty do I get?",
      answer:
        "Quality solar panels are designed to last 25–30 years and typically come with a 25-year linear performance warranty (guaranteeing at least 80% of original output at year 25). Inverters generally last 10–15 years and come with a 5–10 year warranty. Solar Tyrone provides a 10-year workmanship warranty on all installations, covering materials and labour. We also offer an annual maintenance service to keep your system performing at its best.",
    },
    {
      question: "Will solar panels affect my home's Energy Performance Certificate?",
      answer:
        "Yes — positively. Installing solar panels can improve your EPC rating by one or two bands, depending on your home's current rating and the system size. This is increasingly important as mortgage lenders and potential buyers look more closely at energy efficiency. In our experience, homes in Tyrone with solar panels are more attractive to buyers and can command a modest premium on the open market.",
    },
    {
      question: "Do you install battery storage and EV chargers too?",
      answer:
        "Yes. Solar Tyrone installs battery storage systems from leading manufacturers like Tesla Powerwall, GivEnergy, and FoxESS. Adding a battery lets you store excess daytime generation for use in the evening and overnight, reducing your grid dependence to near zero in summer months. We also install EV charger points — ideal if you're considering an electric vehicle, as you can charge for free using your own solar-generated electricity.",
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
    "Significant energy savings — reduce electricity bills by up to 70%",
    "Energy Company Obligation (ECO) for qualifying households",
    "MCS certified installations with 25-year panel warranty",
  ],
  heroSubtitle:
    "Antrim's trusted solar installer — from the Glens to the coast, we've helped hundreds of homes switch to clean, affordable energy.",
  heroTitle: "Solar Panels Antrim.\nPowering the Glens Since Day One.",
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
      text: "Best investment we've made in our home. The installers were courteous, tidy, and clearly experienced. We've recommended Solar Antrim to several neighbours already.",
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
      question: "How much will I save on electricity bills with solar?",
      answer:
        "Most Antrim homeowners see a 60–70% reduction in their electricity bills after installing solar panels. With a typical 4kW system, annual savings of £800–£1,200 are achievable, depending on your usage patterns and whether you add battery storage.",
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
    "Significant energy savings — reduce electricity bills by up to 70%",
    "Energy Company Obligation (ECO) for qualifying households",
    "MCS certified installations with 25-year panel warranty",
  ],
  heroSubtitle:
    "Bringing solar power to the Orchard County. Expert panel and battery installations across Armagh, Portadown and Lurgan.",
  heroTitle: "Solar Panels Armagh.\nFrom Orchard County to Energy County.",
  testimonials: [
    {
      name: "Seamus Hughes",
      location: "Portadown",
      rating: 5,
      text: "Solar Armagh installed a 5kW system on our property and the results have exceeded expectations. Professional team, clean installation, and great ongoing support.",
    },
    {
      name: "Mairead Kelly",
      location: "Lurgan",
      rating: 5,
      text: "We had quotes from three companies and Solar Armagh stood out for their detailed survey and honest advice. No pressure, no hidden costs, just a great solar installation.",
    },
    {
      name: "Frank O'Brien",
      location: "Tandragee",
      rating: 5,
      text: "Our farm barns were perfect for solar panels. Solar Armagh designed a system that covers nearly all our daytime electricity needs. Excellent service throughout.",
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
        "While Northern Ireland doesn't currently offer a direct installation grant like the Republic's SEAI scheme, solar panels in Armagh still deliver exceptional savings. The ECO scheme may provide support for qualifying households. With electricity prices rising, solar remains one of the best investments for NI homeowners. Contact us for the latest information on available incentives.",
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
    "Significant energy savings — reduce electricity bills by up to 70%",
    "Energy Company Obligation (ECO) for qualifying households",
    "MCS certified installations with 25-year panel warranty",
  ],
  heroSubtitle:
    "Powering Down with the sun — from the Mourne Mountains to Strangford Lough, premium solar installations for every home.",
  heroTitle: "Solar Panels Down.\nMourne Views. Solar Savings.",
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
      question: "How much will I save on electricity bills with solar in Down?",
      answer:
        "Most County Down homeowners with a 4kW solar system save between £800 and £1,200 per year on electricity bills — a reduction of around 60–70%. With rising energy prices, these savings are only increasing. Adding a battery storage system can maximise your savings further.",
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
    "Significant energy savings — reduce electricity bills by up to 70%",
    "Energy Company Obligation (ECO) for qualifying households",
    "MCS certified installations with 25-year panel warranty",
  ],
  heroSubtitle:
    "Fermanagh's lakeside homes are perfect for solar. Maximize your roof's potential with our MCS certified installations.",
  heroTitle: "Solar Panels Fermanagh.\nLakeside Living, Powered by Nature.",
  testimonials: [
    {
      name: "Conor Maguire",
      location: "Enniskillen",
      rating: 5,
      text: "Solar Fermanagh provided an excellent service from survey to installation. The 4kW system on our home has been performing brilliantly — even through the greyer months around Lough Erne.",
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
      text: "Top-quality installation on our farm buildings. Solar Fermanagh understood the specific needs of an agricultural setup and the system has reduced our running costs significantly.",
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
  name: "Derry",
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
    "Significant energy savings — reduce electricity bills by up to 70%",
    "Energy Company Obligation (ECO) for qualifying households",
    "MCS certified installations with 25-year panel warranty",
  ],
  heroSubtitle:
    "Derry's leading solar panel specialists — transforming homes across the North West with high-efficiency, MCS certified systems.",
  heroTitle: "Solar Panels Derry.\nThe North West's Bright Choice.",
  testimonials: [
    {
      name: "Declan Doherty",
      location: "Derry",
      rating: 5,
      text: "Excellent experience with Solar Derry. The team was knowledgeable, efficient, and the price was fair. Our system has been generating consistently for over a year now.",
    },
    {
      name: "Ann Gallagher",
      location: "Coleraine",
      rating: 5,
      text: "We got three quotes and Solar Derry was the most thorough by far. The installation was done in a day and the results speak for themselves — 70% reduction in our electricity bill.",
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
      question: "How much do solar panels cost in Derry?",
      answer:
        "A 4kW residential system in County Derry costs between £6,000 and £9,000. We provide free surveys and no-obligation written quotes.",
    },
    {
      question: "Is Derry a good location for solar panels?",
      answer:
        "Yes. While Northern Ireland has more overcast days than southern Europe, solar panels work on daylight — not direct sunshine. Derry's latitude is well within the productive range for solar energy.",
    },
    {
      question: "What warranty do you offer?",
      answer:
        "We provide a 10-year workmanship warranty, with panel performance warranties of 25 years and inverter warranties of 5–10 years from the manufacturer.",
    },
    {
      question: "How much will I save on electricity bills with solar panels?",
      answer:
        "Most Derry homeowners see a 60–70% reduction in their electricity bills. A typical 4kW system can save £800–£1,200 per year, depending on your energy usage. With energy prices continuing to rise, solar panels offer an excellent return on investment.",
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
    "Carlow's solar revolution starts here. SEAI registered installations that pay for themselves in as little as 5 years.",
  heroTitle: "Solar Panels Carlow.\nSunny Savings, Serious Returns.",
  testimonials: [
    { name: "John Murphy", location: "Carlow", rating: 5, text: "Solar Carlow made the SEAI grant process completely straightforward. Great installation and our bills have been cut dramatically since." },
    { name: "Mary Kavanagh", location: "Tullow", rating: 5, text: "Professional, punctual, and excellent value. The 4kW system on our home in Tullow has exceeded the performance estimates we were given." },
    { name: "Michael Doyle", location: "Bagenalstown", rating: 5, text: "We added a battery to our solar system and now we're virtually off the grid during summer. Fantastic service from the Solar Carlow team." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Carlow?",
      answer: "The cost of solar panels in County Carlow depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Carlow, Tullow, Bagenalstown, Hacketstown, and Leighlinbridge — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Carlow can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Carlow and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Carlow?",
      answer: "Homeowners in County Carlow can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Carlow, Tullow, Bagenalstown, Hacketstown, and Leighlinbridge. Many of our Carlow customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Carlow?",
      answer: "A standard residential solar panel installation in County Carlow is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Carlow or Tullow to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Carlow comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Carlow?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Carlow are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Carlow or Tullow is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near the Carlow area may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Carlow, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Carlow?",
      answer: "Typical savings from solar panels in County Carlow range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Carlow, Tullow, Bagenalstown, Hacketstown, and Leighlinbridge can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Carlow can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Carlow achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Carlow's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Carlow receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Carlow's south-east location means above-average Irish solar irradiance levels. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Carlow or Tullow, your system will still produce meaningful electricity. While Carlow is the south-east and experiences typical Irish weather patterns, solar panels are designed and tested to perform reliably in these conditions for 25 to 30 years. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Carlow?",
      answer: "The ideal solar panel system size for your home in County Carlow depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Carlow, Tullow, Bagenalstown, Hacketstown, and Leighlinbridge, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Bagenalstown or Hacketstown may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Carlow is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Carlow?",
      answer: "Solar panels are absolutely worth it for older homes in County Carlow — and they may actually benefit you more than newer properties. Older homes in Carlow, Tullow, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Carlow can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in the Carlow area have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Carlow home."
    },
    {
      question: "Do solar panels work on flat roofs in Carlow?",
      answer: "Yes, solar panels work very well on flat roofs in County Carlow. While most homes in Carlow and Tullow have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Carlow. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Carlow is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Bagenalstown and Hacketstown with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Carlow?",
      answer: "The best orientation for solar panels in County Carlow is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Carlow, Tullow, Bagenalstown, Hacketstown, and Leighlinbridge because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties in the south-east with varied roof lines often benefit from our expert assessment to find the most productive configuration. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Carlow. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "Cavan's wide open skies mean exceptional solar yield. We design and install systems tailored to your home and budget.",
  heroTitle: "Solar Panels Cavan.\nBig Skies, Bigger Savings.",
  testimonials: [
    { name: "Peter Reilly", location: "Cavan", rating: 5, text: "Excellent service from the Solar Cavan team. They handled our SEAI grant and the installation was done in a single day. Very happy with the results." },
    { name: "Angela Brady", location: "Cootehill", rating: 5, text: "We were impressed by the professionalism and clear communication throughout. Our electricity bills have dropped significantly since the installation." },
    { name: "Thomas Smith", location: "Bailieborough", rating: 5, text: "Solar Cavan installed panels on both our home and farm buildings. Both systems are performing well above expectations. Highly recommend." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Cavan?",
      answer: "The cost of solar panels in County Cavan depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Cavan, Cootehill, Bailieborough, Kingscourt, and Virginia — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Cavan can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Cavan and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Cavan?",
      answer: "Homeowners in County Cavan can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Cavan, Cootehill, Bailieborough, Kingscourt, and Virginia. Many of our Cavan customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Cavan?",
      answer: "A standard residential solar panel installation in County Cavan is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Cavan or Cootehill to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Cavan comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Cavan?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Cavan are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Cavan or Cootehill is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Cavan may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Cavan, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Cavan?",
      answer: "Typical savings from solar panels in County Cavan range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Cavan, Cootehill, Bailieborough, Kingscourt, and Virginia can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Cavan can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Cavan achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Cavan's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Cavan receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Cavan's wide open skies are a natural advantage for solar energy generation. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Cavan or Cootehill, your system will still produce meaningful electricity. While Cavan is the border region and experiences typical Irish weather patterns, solar panels are designed and tested to perform reliably in these conditions for 25 to 30 years. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Cavan?",
      answer: "The ideal solar panel system size for your home in County Cavan depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Cavan, Cootehill, Bailieborough, Kingscourt, and Virginia, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Bailieborough or Kingscourt may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Cavan is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Cavan?",
      answer: "Solar panels are absolutely worth it for older homes in County Cavan — and they may actually benefit you more than newer properties. Older homes in Cavan, Cootehill, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Cavan can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Cavan have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Cavan home."
    },
    {
      question: "Do solar panels work on flat roofs in Cavan?",
      answer: "Yes, solar panels work very well on flat roofs in County Cavan. While most homes in Cavan and Cootehill have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Cavan. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Cavan is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Bailieborough and Kingscourt with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Cavan?",
      answer: "The best orientation for solar panels in County Cavan is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Cavan, Cootehill, Bailieborough, Kingscourt, and Virginia because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties in the border region with varied roof lines often benefit from our expert assessment to find the most productive configuration. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Cavan. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "From the Banner's barns to its bungalows — solar panel and battery solutions built for Clare's unique landscape.",
  heroTitle: "Solar Panels Clare.\nBanner County, Bright Future.",
  testimonials: [
    { name: "Brendan Hayes", location: "Ennis", rating: 5, text: "Solar Clare did a fantastic job on our home. The SEAI grant was handled seamlessly and the system is performing beautifully. Very professional team." },
    { name: "Colette O'Brien", location: "Shannon", rating: 5, text: "We researched several companies before choosing Solar Clare. Their attention to detail during the survey gave us confidence, and the installation lived up to it." },
    { name: "Sean Flanagan", location: "Kilrush", rating: 5, text: "Great service from start to finish. The installers were efficient, tidy, and thorough. We're seeing significant savings already on our Kilrush home." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Clare?",
      answer: "The cost of solar panels in County Clare depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Ennis, Shannon, Kilrush, Ennistimon, and Lahinch — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Clare can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Clare and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Clare?",
      answer: "Homeowners in County Clare can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Ennis, Shannon, Kilrush, Ennistimon, and Lahinch. Many of our Clare customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Clare?",
      answer: "A standard residential solar panel installation in County Clare is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Ennis or Shannon to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Clare comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Clare?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Clare are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Ennis or Shannon is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Clare's coastal and rural areas may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Clare, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Clare?",
      answer: "Typical savings from solar panels in County Clare range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Ennis, Shannon, Kilrush, Ennistimon, and Lahinch can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Clare can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Clare achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Clare's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Clare receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Clare's long Atlantic coastline receives excellent daylight, and while coastal areas experience wind and salt air, quality panels are built to withstand these conditions. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Ennis or Shannon, your system will still produce meaningful electricity. As a coastal county, Clare does experience more wind and rainfall, but quality solar panels are manufactured to withstand harsh weather conditions including salt air exposure, heavy rain, and wind speeds well above what Ireland experiences. We use marine-grade mounting systems for properties near the coast. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Clare?",
      answer: "The ideal solar panel system size for your home in County Clare depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Ennis, Shannon, Kilrush, Ennistimon, and Lahinch, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Kilrush or Ennistimon may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Clare is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Clare?",
      answer: "Solar panels are absolutely worth it for older homes in County Clare — and they may actually benefit you more than newer properties. Older homes in Ennis, Shannon, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Clare can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Clare's coastal and rural areas have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Clare home."
    },
    {
      question: "Do solar panels work on flat roofs in Clare?",
      answer: "Yes, solar panels work very well on flat roofs in County Clare. While most homes in Ennis and Shannon have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Clare. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Clare is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Kilrush and Ennistimon with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Clare?",
      answer: "The best orientation for solar panels in County Clare is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Ennis, Shannon, Kilrush, Ennistimon, and Lahinch because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties along Clare's coastline sometimes face unusual orientations due to their location — we've successfully installed solar on roofs facing nearly every direction. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Clare. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "Cork's largest independent solar installer. Over 1,000 homes powered across the Rebel County — city, coast and countryside.",
  heroTitle: "Solar Panels Cork.\nThe Rebel County Goes Green.",
  testimonials: [
    { name: "Eamonn O'Sullivan", location: "Cork City", rating: 5, text: "Solar Cork provided an excellent service. The installation on our terraced house was handled with care and professionalism. Our bills are down by over 60%." },
    { name: "Fiona Murphy", location: "Bandon", rating: 5, text: "We added both solar panels and a battery storage system. Solar Cork managed the SEAI grant application and the whole process was seamless." },
    { name: "Derek O'Connor", location: "Clonakilty", rating: 5, text: "Outstanding installation on our west Cork home. The team was knowledgeable, efficient, and the system has exceeded the quoted performance figures." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Cork?",
      answer: "The cost of solar panels in County Cork depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Cork City, Mallow, Bandon, Clonakilty, and Macroom — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Cork can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Cork and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Cork?",
      answer: "Homeowners in County Cork can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Cork City, Mallow, Bandon, Clonakilty, and Macroom. Many of our Cork customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Cork?",
      answer: "A standard residential solar panel installation in County Cork is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Cork City or Mallow to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Cork comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Cork?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Cork are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Cork City or Mallow is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Cork City's Georgian and Victorian architecture and west Cork's scenic villages may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Cork, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Cork?",
      answer: "Typical savings from solar panels in County Cork range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Cork City, Mallow, Bandon, Clonakilty, and Macroom can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Cork can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Cork achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Cork's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Cork receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Cork's southerly latitude gives it some of Ireland's best solar irradiance levels. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Cork City or Mallow, your system will still produce meaningful electricity. As a coastal county, Cork does experience more wind and rainfall, but quality solar panels are manufactured to withstand harsh weather conditions including salt air exposure, heavy rain, and wind speeds well above what Ireland experiences. We use marine-grade mounting systems for properties near the coast. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Cork?",
      answer: "The ideal solar panel system size for your home in County Cork depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Cork City, Mallow, Bandon, Clonakilty, and Macroom, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Bandon or Clonakilty may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Cork is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Cork?",
      answer: "Solar panels are absolutely worth it for older homes in County Cork — and they may actually benefit you more than newer properties. Older homes in Cork City, Mallow, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Cork can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Cork City's Georgian and Victorian architecture and west Cork's scenic villages have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Cork home."
    },
    {
      question: "Do solar panels work on flat roofs in Cork?",
      answer: "Yes, solar panels work very well on flat roofs in County Cork. While most homes in Cork City and Mallow have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Cork. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Cork is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Bandon and Clonakilty with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Cork?",
      answer: "The best orientation for solar panels in County Cork is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Cork City, Mallow, Bandon, Clonakilty, and Macroom because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties along Cork's coastline sometimes face unusual orientations due to their location — we've successfully installed solar on roofs facing nearly every direction. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Cork. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "Donegal's wild Atlantic coast gets more daylight than you think. Harness it with our high-performance solar systems.",
  heroTitle: "Solar Panels Donegal.\nAtlantic Coast, Exceptional Generation.",
  testimonials: [
    { name: "Neil Gallagher", location: "Letterkenny", rating: 5, text: "Despite Donegal's weather reputation, our solar panels are generating brilliantly. Solar Donegal were upfront about expected output and have delivered exactly what they promised." },
    { name: "Martha Doherty", location: "Buncrana", rating: 5, text: "Very happy with our installation. The team was professional, tidy, and the aftercare has been excellent. Our electricity bills have never been lower." },
    { name: "Joe McFadden", location: "Donegal Town", rating: 5, text: "Solar Donegal installed a system on our hotel and the savings have been significant. Great service from a trusted local company." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Donegal?",
      answer: "The cost of solar panels in County Donegal depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Letterkenny, Donegal Town, Buncrana, Ballybofey, and Bundoran — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Donegal can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Donegal and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Donegal?",
      answer: "Homeowners in County Donegal can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Letterkenny, Donegal Town, Buncrana, Ballybofey, and Bundoran. Many of our Donegal customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Donegal?",
      answer: "A standard residential solar panel installation in County Donegal is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Letterkenny or Donegal Town to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Donegal comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Donegal?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Donegal are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Letterkenny or Donegal Town is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Donegal may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Donegal, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Donegal?",
      answer: "Typical savings from solar panels in County Donegal range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Letterkenny, Donegal Town, Buncrana, Ballybofey, and Bundoran can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Donegal can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Donegal achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Donegal's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Donegal receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Despite Donegal's northerly latitude, the county actually receives excellent daylight hours in summer — longer than much of southern Europe between May and August. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Letterkenny or Donegal Town, your system will still produce meaningful electricity. As a coastal county, Donegal does experience more wind and rainfall, but quality solar panels are manufactured to withstand harsh weather conditions including salt air exposure, heavy rain, and wind speeds well above what Ireland experiences. We use marine-grade mounting systems for properties near the coast. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Donegal?",
      answer: "The ideal solar panel system size for your home in County Donegal depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Letterkenny, Donegal Town, Buncrana, Ballybofey, and Bundoran, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Buncrana or Ballybofey may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Donegal is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Donegal?",
      answer: "Solar panels are absolutely worth it for older homes in County Donegal — and they may actually benefit you more than newer properties. Older homes in Letterkenny, Donegal Town, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Donegal can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Donegal have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Donegal home."
    },
    {
      question: "Do solar panels work on flat roofs in Donegal?",
      answer: "Yes, solar panels work very well on flat roofs in County Donegal. While most homes in Letterkenny and Donegal Town have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Donegal. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Donegal is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Buncrana and Ballybofey with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Donegal?",
      answer: "The best orientation for solar panels in County Donegal is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Letterkenny, Donegal Town, Buncrana, Ballybofey, and Bundoran because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties along Donegal's coastline sometimes face unusual orientations due to their location — we've successfully installed solar on roofs facing nearly every direction. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Donegal. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "Dublin's solar specialists — beating rising energy costs for homeowners across the capital, one roof at a time.",
  heroTitle: "Solar Panels Dublin.\nCapital Savings Start on Your Roof.",
  testimonials: [
    { name: "David O'Neil", location: "Dublin City", rating: 5, text: "Solar Dublin installed panels on our semi-detached home and the process was smooth from start to finish. Great communication, clean work, and the results speak for themselves." },
    { name: "Siobhan Walsh", location: "Swords", rating: 5, text: "We were quoted quickly, installation was done in a day, and the SEAI grant was handled entirely by the Solar Dublin team. Couldn't have asked for a better experience." },
    { name: "Paul Dunne", location: "Dundrum", rating: 5, text: "Excellent installation on our 1960s bungalow in Dundrum. The team was knowledgeable about the specific challenges of older roofs and delivered a first-class result." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Dublin?",
      answer: "The cost of solar panels in County Dublin depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Dublin City, Dundrum, Swords, Dun Laoghaire, and Blanchardstown — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Dublin can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Dublin and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Dublin?",
      answer: "Homeowners in County Dublin can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Dublin City, Dundrum, Swords, Dun Laoghaire, and Blanchardstown. Many of our Dublin customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Dublin?",
      answer: "A standard residential solar panel installation in County Dublin is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Dublin City or Dundrum to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Dublin comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Dublin?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Dublin are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Dublin City or Dundrum is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Dublin's Georgian and Victorian conservation areas may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Dublin, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Dublin?",
      answer: "Typical savings from solar panels in County Dublin range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Dublin City, Dundrum, Swords, Dun Laoghaire, and Blanchardstown can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Dublin can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Dublin achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Dublin's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Dublin receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Dublin's urban density means many homes are semi-detached or terraced, but even a modest roof area can host a productive solar system. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Dublin City or Dundrum, your system will still produce meaningful electricity. As a coastal county, Dublin does experience more wind and rainfall, but quality solar panels are manufactured to withstand harsh weather conditions including salt air exposure, heavy rain, and wind speeds well above what Ireland experiences. We use marine-grade mounting systems for properties near the coast. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Dublin?",
      answer: "The ideal solar panel system size for your home in County Dublin depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Dublin City, Dundrum, Swords, Dun Laoghaire, and Blanchardstown, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Swords or Dun Laoghaire may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Dublin is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Dublin?",
      answer: "Solar panels are absolutely worth it for older homes in County Dublin — and they may actually benefit you more than newer properties. Older homes in Dublin City, Dundrum, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Dublin can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Dublin's Georgian and Victorian conservation areas have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Dublin home."
    },
    {
      question: "Do solar panels work on flat roofs in Dublin?",
      answer: "Yes, solar panels work very well on flat roofs in County Dublin. While most homes in Dublin City and Dundrum have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Dublin. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Dublin is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Swords and Dun Laoghaire with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Dublin?",
      answer: "The best orientation for solar panels in County Dublin is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Dublin City, Dundrum, Swords, Dun Laoghaire, and Blanchardstown because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties along Dublin's coastline sometimes face unusual orientations due to their location — we've successfully installed solar on roofs facing nearly every direction. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Dublin. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "Galway's mix of city roofs and rural homesteads makes it ideal for solar. City and county installations with lifetime support.",
  heroTitle: "Solar Panels Galway.\nCity & County, Powered by the West.",
  testimonials: [
    { name: "Aiden Connolly", location: "Galway City", rating: 5, text: "Solar Galway provided a seamless experience. From the initial survey to commissioning, everything was handled professionally. We're delighted with the results." },
    { name: "Niamh O'Flaherty", location: "Athenry", rating: 5, text: "We added solar and battery storage to our home in Athenry. Solar Galway's team was excellent — knowledgeable, efficient, and very tidy." },
    { name: "Sean Joyce", location: "Loughrea", rating: 5, text: "Top quality installation at a fair price. The monitoring app shows our system is performing exactly as quoted. Highly recommend Solar Galway." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Galway?",
      answer: "The cost of solar panels in County Galway depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Galway City, Tuam, Athenry, Oranmore, and Loughrea — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Galway can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Galway and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Galway?",
      answer: "Homeowners in County Galway can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Galway City, Tuam, Athenry, Oranmore, and Loughrea. Many of our Galway customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Galway?",
      answer: "A standard residential solar panel installation in County Galway is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Galway City or Tuam to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Galway comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Galway?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Galway are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Galway City or Tuam is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Galway City and the surrounding areas may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Galway, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Galway?",
      answer: "Typical savings from solar panels in County Galway range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Galway City, Tuam, Athenry, Oranmore, and Loughrea can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Galway can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Galway achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Galway's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Galway receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Galway's mix of city and countryside means diverse installation opportunities, from compact urban roofs to expansive rural properties. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Galway City or Tuam, your system will still produce meaningful electricity. As a coastal county, Galway does experience more wind and rainfall, but quality solar panels are manufactured to withstand harsh weather conditions including salt air exposure, heavy rain, and wind speeds well above what Ireland experiences. We use marine-grade mounting systems for properties near the coast. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Galway?",
      answer: "The ideal solar panel system size for your home in County Galway depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Galway City, Tuam, Athenry, Oranmore, and Loughrea, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Athenry or Oranmore may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Galway is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Galway?",
      answer: "Solar panels are absolutely worth it for older homes in County Galway — and they may actually benefit you more than newer properties. Older homes in Galway City, Tuam, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Galway can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Galway City and the surrounding areas have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Galway home."
    },
    {
      question: "Do solar panels work on flat roofs in Galway?",
      answer: "Yes, solar panels work very well on flat roofs in County Galway. While most homes in Galway City and Tuam have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Galway. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Galway is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Athenry and Oranmore with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Galway?",
      answer: "The best orientation for solar panels in County Galway is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Galway City, Tuam, Athenry, Oranmore, and Loughrea because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties along Galway's coastline sometimes face unusual orientations due to their location — we've successfully installed solar on roofs facing nearly every direction. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Galway. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "The Kingdom's clean energy secret — Kerry homes generate impressive solar yields thanks to long summer daylight hours.",
  heroTitle: "Solar Panels Kerry.\nThe Kingdom's Clean Energy Revolution.",
  testimonials: [
    { name: "Denis O'Connor", location: "Tralee", rating: 5, text: "Solar Kerry did a superb job on our home. Professional installation, great communication, and the SEAI grant was handled without any fuss." },
    { name: "Eileen Murphy", location: "Killarney", rating: 5, text: "We were worried about the impact of Kerry's weather but Solar Kerry explained everything clearly. Our panels are performing well above expectations." },
    { name: "Michael O'Shea", location: "Listowel", rating: 5, text: "Excellent service from the Solar Kerry team. The installation was done quickly and cleanly, and we're seeing great savings on our electricity bills." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Kerry?",
      answer: "The cost of solar panels in County Kerry depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Tralee, Killarney, Listowel, Kenmare, and Dingle — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Kerry can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Kerry and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Kerry?",
      answer: "Homeowners in County Kerry can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Tralee, Killarney, Listowel, Kenmare, and Dingle. Many of our Kerry customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Kerry?",
      answer: "A standard residential solar panel installation in County Kerry is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Tralee or Killarney to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Kerry comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Kerry?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Kerry are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Tralee or Killarney is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Kerry's tourist areas and scenic landscapes may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Kerry, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Kerry?",
      answer: "Typical savings from solar panels in County Kerry range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Tralee, Killarney, Listowel, Kenmare, and Dingle can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Kerry can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Kerry achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Kerry's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Kerry receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Kerry's south-west location delivers impressive solar irradiance, and the county benefits from some of Ireland's longest summer daylight hours. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Tralee or Killarney, your system will still produce meaningful electricity. As a coastal county, Kerry does experience more wind and rainfall, but quality solar panels are manufactured to withstand harsh weather conditions including salt air exposure, heavy rain, and wind speeds well above what Ireland experiences. We use marine-grade mounting systems for properties near the coast. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Kerry?",
      answer: "The ideal solar panel system size for your home in County Kerry depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Tralee, Killarney, Listowel, Kenmare, and Dingle, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Listowel or Kenmare may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Kerry is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Kerry?",
      answer: "Solar panels are absolutely worth it for older homes in County Kerry — and they may actually benefit you more than newer properties. Older homes in Tralee, Killarney, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Kerry can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Kerry's tourist areas and scenic landscapes have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Kerry home."
    },
    {
      question: "Do solar panels work on flat roofs in Kerry?",
      answer: "Yes, solar panels work very well on flat roofs in County Kerry. While most homes in Tralee and Killarney have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Kerry. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Kerry is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Listowel and Kenmare with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Kerry?",
      answer: "The best orientation for solar panels in County Kerry is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Tralee, Killarney, Listowel, Kenmare, and Dingle because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties along Kerry's coastline sometimes face unusual orientations due to their location — we've successfully installed solar on roofs facing nearly every direction. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Kerry. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "Kildare's commuter belt homes are going green. Slash your energy bills and boost your BER rating with our solar systems.",
  heroTitle: "Solar Panels Kildare.\nCommuter Belt Homes Leading the Charge.",
  testimonials: [
    { name: "Robert Whelan", location: "Naas", rating: 5, text: "Solar Kildare provided excellent service from start to finish. The SEAI grant was sorted and the installation was completed efficiently in a single day." },
    { name: "Laura Maher", location: "Newbridge", rating: 5, text: "Very professional operation. The survey was thorough, the quote was clear, and the installation was spotless. Highly recommend." },
    { name: "Andrew Byrne", location: "Celbridge", rating: 5, text: "We chose Solar Kildare based on local recommendations and they exceeded expectations. Great communication throughout the process." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Kildare?",
      answer: "The cost of solar panels in County Kildare depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Naas, Newbridge, Kildare Town, Celbridge, and Maynooth — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Kildare can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Kildare and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Kildare?",
      answer: "Homeowners in County Kildare can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Naas, Newbridge, Kildare Town, Celbridge, and Maynooth. Many of our Kildare customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Kildare?",
      answer: "A standard residential solar panel installation in County Kildare is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Naas or Newbridge to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Kildare comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Kildare?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Kildare are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Naas or Newbridge is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Kildare may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Kildare, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Kildare?",
      answer: "Typical savings from solar panels in County Kildare range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Naas, Newbridge, Kildare Town, Celbridge, and Maynooth can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Kildare can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Kildare achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Kildare's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Kildare receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Kildare's large new-build estates are particularly well-suited to solar, with modern roofs, good insulation, and south-facing orientations common in housing developments. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Naas or Newbridge, your system will still produce meaningful electricity. While Kildare is the commuter belt and experiences typical Irish weather patterns, solar panels are designed and tested to perform reliably in these conditions for 25 to 30 years. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Kildare?",
      answer: "The ideal solar panel system size for your home in County Kildare depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Naas, Newbridge, Kildare Town, Celbridge, and Maynooth, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Kildare Town or Celbridge may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Kildare is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Kildare?",
      answer: "Solar panels are absolutely worth it for older homes in County Kildare — and they may actually benefit you more than newer properties. Older homes in Naas, Newbridge, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Kildare can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Kildare have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Kildare home."
    },
    {
      question: "Do solar panels work on flat roofs in Kildare?",
      answer: "Yes, solar panels work very well on flat roofs in County Kildare. While most homes in Naas and Newbridge have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Kildare. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Kildare is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Kildare Town and Celbridge with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Kildare?",
      answer: "The best orientation for solar panels in County Kildare is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Naas, Newbridge, Kildare Town, Celbridge, and Maynooth because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties in the commuter belt with varied roof lines often benefit from our expert assessment to find the most productive configuration. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Kildare. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "The Marble City leads the way — solar installations that blend seamlessly with Kilkenny's heritage streetscapes.",
  heroTitle: "Solar Panels Kilkenny.\nThe Marble City Shines Brighter.",
  testimonials: [
    { name: "Pat Ryan", location: "Kilkenny City", rating: 5, text: "Solar Kilkenny provided a thorough survey and transparent pricing. The installation was done professionally and the system is performing very well." },
    { name: "Aisling Brennan", location: "Thomastown", rating: 5, text: "We're very happy with our solar installation. The SEAI grant was straightforward and the team was excellent from start to finish." },
    { name: "John Phelan", location: "Castlecomer", rating: 5, text: "Great local company that delivers on its promises. The installation was clean and efficient, and we're seeing excellent generation figures." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Kilkenny?",
      answer: "The cost of solar panels in County Kilkenny depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Kilkenny City, Thomastown, Castlecomer, Callan, and Ferrybank — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Kilkenny can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Kilkenny and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Kilkenny?",
      answer: "Homeowners in County Kilkenny can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Kilkenny City, Thomastown, Castlecomer, Callan, and Ferrybank. Many of our Kilkenny customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Kilkenny?",
      answer: "A standard residential solar panel installation in County Kilkenny is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Kilkenny City or Thomastown to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Kilkenny comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Kilkenny?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Kilkenny are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Kilkenny City or Thomastown is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Kilkenny's medieval city centre and heritage buildings may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Kilkenny, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Kilkenny?",
      answer: "Typical savings from solar panels in County Kilkenny range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Kilkenny City, Thomastown, Castlecomer, Callan, and Ferrybank can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Kilkenny can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Kilkenny achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Kilkenny's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Kilkenny receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Kilkenny's inland location provides stable solar conditions without the extreme coastal weather experienced by western counties. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Kilkenny City or Thomastown, your system will still produce meaningful electricity. While Kilkenny is the south-east and experiences typical Irish weather patterns, solar panels are designed and tested to perform reliably in these conditions for 25 to 30 years. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Kilkenny?",
      answer: "The ideal solar panel system size for your home in County Kilkenny depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Kilkenny City, Thomastown, Castlecomer, Callan, and Ferrybank, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Castlecomer or Callan may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Kilkenny is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Kilkenny?",
      answer: "Solar panels are absolutely worth it for older homes in County Kilkenny — and they may actually benefit you more than newer properties. Older homes in Kilkenny City, Thomastown, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Kilkenny can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Kilkenny's medieval city centre and heritage buildings have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Kilkenny home."
    },
    {
      question: "Do solar panels work on flat roofs in Kilkenny?",
      answer: "Yes, solar panels work very well on flat roofs in County Kilkenny. While most homes in Kilkenny City and Thomastown have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Kilkenny. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Kilkenny is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Castlecomer and Callan with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Kilkenny?",
      answer: "The best orientation for solar panels in County Kilkenny is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Kilkenny City, Thomastown, Castlecomer, Callan, and Ferrybank because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties in the south-east with varied roof lines often benefit from our expert assessment to find the most productive configuration. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Kilkenny. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "Laois homeowners are seeing payback in under 5 years. Discover why the Midlands is Ireland's hidden solar hotspot.",
  heroTitle: "Solar Panels Laois.\nThe Midlands' Hidden Solar Gem.",
  testimonials: [
    { name: "James Delaney", location: "Portlaoise", rating: 5, text: "Solar Laois delivered exactly what they promised. Clean installation, good communication, and our electricity bills are significantly lower." },
    { name: "Margaret Dunne", location: "Abbeyleix", rating: 5, text: "We're very pleased with our solar panels. The SEAI grant was easy to apply for with Solar Laois's help, and the installation was done in a day." },
    { name: "Liam Fitzpatrick", location: "Mountmellick", rating: 5, text: "Professional and reliable. Solar Laois installed our system efficiently and it's been generating well above the quoted figures." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Laois?",
      answer: "The cost of solar panels in County Laois depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Portlaoise, Portarlington, Mountmellick, Abbeyleix, and Stradbally — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Laois can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Laois and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Laois?",
      answer: "Homeowners in County Laois can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Portlaoise, Portarlington, Mountmellick, Abbeyleix, and Stradbally. Many of our Laois customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Laois?",
      answer: "A standard residential solar panel installation in County Laois is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Portlaoise or Portarlington to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Laois comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Laois?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Laois are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Portlaoise or Portarlington is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Laois may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Laois, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Laois?",
      answer: "Typical savings from solar panels in County Laois range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Portlaoise, Portarlington, Mountmellick, Abbeyleix, and Stradbally can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Laois can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Laois achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Laois's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Laois receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Laois sits in the heart of Ireland's Midlands, where the mix of farmland and growing towns creates excellent opportunities for both residential and agricultural solar installations. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Portlaoise or Portarlington, your system will still produce meaningful electricity. While Laois is the Midlands and experiences typical Irish weather patterns, solar panels are designed and tested to perform reliably in these conditions for 25 to 30 years. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Laois?",
      answer: "The ideal solar panel system size for your home in County Laois depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Portlaoise, Portarlington, Mountmellick, Abbeyleix, and Stradbally, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Mountmellick or Abbeyleix may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Laois is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Laois?",
      answer: "Solar panels are absolutely worth it for older homes in County Laois — and they may actually benefit you more than newer properties. Older homes in Portlaoise, Portarlington, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Laois can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Laois have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Laois home."
    },
    {
      question: "Do solar panels work on flat roofs in Laois?",
      answer: "Yes, solar panels work very well on flat roofs in County Laois. While most homes in Portlaoise and Portarlington have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Laois. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Laois is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Mountmellick and Abbeyleix with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Laois?",
      answer: "The best orientation for solar panels in County Laois is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Portlaoise, Portarlington, Mountmellick, Abbeyleix, and Stradbally because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties in the Midlands with varied roof lines often benefit from our expert assessment to find the most productive configuration. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Laois. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "Leitrim's unspoilt landscapes deserve clean energy. Off-grid capable solar and battery systems for rural and residential homes.",
  heroTitle: "Solar Panels Leitrim.\nUntouched Landscapes, Unlimited Potential.",
  testimonials: [
    { name: "Michael Gallagher", location: "Carrick-on-Shannon", rating: 5, text: "Solar Leitrim provided a great service. The installation was efficient and we're very happy with the performance of our system." },
    { name: "Bernie Feeney", location: "Drumshanbo", rating: 5, text: "We chose Solar Leitrim for their local knowledge and competitive pricing. The installation was done in a day and the results are excellent." },
    { name: "Paddy Reynolds", location: "Manorhamilton", rating: 5, text: "Very professional outfit. The team was courteous, tidy, and clearly experienced. We'd recommend Solar Leitrim without hesitation." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Leitrim?",
      answer: "The cost of solar panels in County Leitrim depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Carrick-on-Shannon, Manorhamilton, Drumshanbo, Mohill, and Ballinamore — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Leitrim can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Leitrim and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Leitrim?",
      answer: "Homeowners in County Leitrim can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Carrick-on-Shannon, Manorhamilton, Drumshanbo, Mohill, and Ballinamore. Many of our Leitrim customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Leitrim?",
      answer: "A standard residential solar panel installation in County Leitrim is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Carrick-on-Shannon or Manorhamilton to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Leitrim comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Leitrim?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Leitrim are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Carrick-on-Shannon or Manorhamilton is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Leitrim may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Leitrim, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Leitrim?",
      answer: "Typical savings from solar panels in County Leitrim range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Carrick-on-Shannon, Manorhamilton, Drumshanbo, Mohill, and Ballinamore can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Leitrim can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Leitrim achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Leitrim's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Leitrim receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Leitrim's unspoilt rural landscape means large roof areas and minimal shading — ideal conditions for maximising solar panel output. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Carrick-on-Shannon or Manorhamilton, your system will still produce meaningful electricity. While Leitrim is the north-west and experiences typical Irish weather patterns, solar panels are designed and tested to perform reliably in these conditions for 25 to 30 years. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Leitrim?",
      answer: "The ideal solar panel system size for your home in County Leitrim depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Carrick-on-Shannon, Manorhamilton, Drumshanbo, Mohill, and Ballinamore, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Drumshanbo or Mohill may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Leitrim is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Leitrim?",
      answer: "Solar panels are absolutely worth it for older homes in County Leitrim — and they may actually benefit you more than newer properties. Older homes in Carrick-on-Shannon, Manorhamilton, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Leitrim can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Leitrim have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Leitrim home."
    },
    {
      question: "Do solar panels work on flat roofs in Leitrim?",
      answer: "Yes, solar panels work very well on flat roofs in County Leitrim. While most homes in Carrick-on-Shannon and Manorhamilton have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Leitrim. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Leitrim is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Drumshanbo and Mohill with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Leitrim?",
      answer: "The best orientation for solar panels in County Leitrim is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Carrick-on-Shannon, Manorhamilton, Drumshanbo, Mohill, and Ballinamore because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties in the north-west with varied roof lines often benefit from our expert assessment to find the most productive configuration. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Leitrim. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "Limerick's Georgian roofs and modern estates alike benefit from our tailored solar panel designs. Free surveys across the Treaty City.",
  heroTitle: "Solar Panels Limerick.\nTreaty City Homes, Future-Proofed.",
  testimonials: [
    { name: "Timothy O'Brien", location: "Limerick City", rating: 5, text: "Solar Limerick installed a 5kW system on our home and the results have been outstanding. The SEAI grant was handled efficiently and the installation was done in a day." },
    { name: "Catherine O'Sullivan", location: "Kilmallock", rating: 5, text: "We added battery storage to our solar installation and are now virtually self-sufficient during the summer months. Excellent service from Solar Limerick." },
    { name: "Gerard Meaney", location: "Newcastle West", rating: 5, text: "Professional, reliable, and competitively priced. Solar Limerick did a great job on our property and we're seeing significant electricity savings." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Limerick?",
      answer: "The cost of solar panels in County Limerick depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Limerick City, Newcastle West, Rathkeale, Kilmallock, and Abbeyfeale — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Limerick can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Limerick and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Limerick?",
      answer: "Homeowners in County Limerick can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Limerick City, Newcastle West, Rathkeale, Kilmallock, and Abbeyfeale. Many of our Limerick customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Limerick?",
      answer: "A standard residential solar panel installation in County Limerick is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Limerick City or Newcastle West to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Limerick comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Limerick?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Limerick are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Limerick City or Newcastle West is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Limerick City's Georgian Quarter may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Limerick, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Limerick?",
      answer: "Typical savings from solar panels in County Limerick range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Limerick City, Newcastle West, Rathkeale, Kilmallock, and Abbeyfeale can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Limerick can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Limerick achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Limerick's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Limerick receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Limerick's mix of urban and rural environments, from the Treaty City to the Golden Vale farmlands, provides diverse solar installation opportunities. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Limerick City or Newcastle West, your system will still produce meaningful electricity. While Limerick is the mid-west and experiences typical Irish weather patterns, solar panels are designed and tested to perform reliably in these conditions for 25 to 30 years. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Limerick?",
      answer: "The ideal solar panel system size for your home in County Limerick depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Limerick City, Newcastle West, Rathkeale, Kilmallock, and Abbeyfeale, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Rathkeale or Kilmallock may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Limerick is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Limerick?",
      answer: "Solar panels are absolutely worth it for older homes in County Limerick — and they may actually benefit you more than newer properties. Older homes in Limerick City, Newcastle West, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Limerick can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Limerick City's Georgian Quarter have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Limerick home."
    },
    {
      question: "Do solar panels work on flat roofs in Limerick?",
      answer: "Yes, solar panels work very well on flat roofs in County Limerick. While most homes in Limerick City and Newcastle West have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Limerick. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Limerick is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Rathkeale and Kilmallock with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Limerick?",
      answer: "The best orientation for solar panels in County Limerick is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Limerick City, Newcastle West, Rathkeale, Kilmallock, and Abbeyfeale because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties in the mid-west with varied roof lines often benefit from our expert assessment to find the most productive configuration. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Limerick. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "Longford's agricultural roots make it perfect for solar — farm buildings and family homes both earning from the sun.",
  heroTitle: "Solar Panels Longford.\nFarms & Family Homes, All Generating.",
  testimonials: [
    { name: "Brian Kenny", location: "Longford Town", rating: 5, text: "Solar Longford were excellent. They handled everything from survey to SEAI grant, and the installation was done in a single day." },
    { name: "Rose Brady", location: "Ballymahon", rating: 5, text: "We're very pleased with our solar panels. The system is generating well and we've seen a real reduction in our electricity bills." },
    { name: "Francis McCabe", location: "Granard", rating: 5, text: "Great service from a local company. Solar Longford were professional, competitively priced, and the installation was done to a high standard." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Longford?",
      answer: "The cost of solar panels in County Longford depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Longford Town, Ballymahon, Granard, Edgeworthstown, and Ardagh — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Longford can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Longford and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Longford?",
      answer: "Homeowners in County Longford can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Longford Town, Ballymahon, Granard, Edgeworthstown, and Ardagh. Many of our Longford customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Longford?",
      answer: "A standard residential solar panel installation in County Longford is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Longford Town or Ballymahon to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Longford comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Longford?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Longford are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Longford Town or Ballymahon is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Longford may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Longford, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Longford?",
      answer: "Typical savings from solar panels in County Longford range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Longford Town, Ballymahon, Granard, Edgeworthstown, and Ardagh can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Longford can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Longford achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Longford's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Longford receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Longford's strong agricultural community means many properties have both a family home and farm buildings — both ideal for solar panel installations. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Longford Town or Ballymahon, your system will still produce meaningful electricity. While Longford is the Midlands and experiences typical Irish weather patterns, solar panels are designed and tested to perform reliably in these conditions for 25 to 30 years. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Longford?",
      answer: "The ideal solar panel system size for your home in County Longford depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Longford Town, Ballymahon, Granard, Edgeworthstown, and Ardagh, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Granard or Edgeworthstown may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Longford is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Longford?",
      answer: "Solar panels are absolutely worth it for older homes in County Longford — and they may actually benefit you more than newer properties. Older homes in Longford Town, Ballymahon, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Longford can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Longford have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Longford home."
    },
    {
      question: "Do solar panels work on flat roofs in Longford?",
      answer: "Yes, solar panels work very well on flat roofs in County Longford. While most homes in Longford Town and Ballymahon have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Longford. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Longford is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Granard and Edgeworthstown with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Longford?",
      answer: "The best orientation for solar panels in County Longford is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Longford Town, Ballymahon, Granard, Edgeworthstown, and Ardagh because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties in the Midlands with varied roof lines often benefit from our expert assessment to find the most productive configuration. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Longford. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "The Wee County packs a big solar punch. Dundalk to Drogheda installations backed by our 25-year panel warranty.",
  heroTitle: "Solar Panels Louth.\nThe Wee County Packs a Solar Punch.",
  testimonials: [
    { name: "John Callan", location: "Dundalk", rating: 5, text: "Solar Louth delivered a first-class installation. The system is performing exactly as quoted and the SEAI grant was handled efficiently." },
    { name: "Michelle Mackin", location: "Drogheda", rating: 5, text: "We chose Solar Louth based on their local reputation and they didn't disappoint. Clean, professional installation with excellent aftercare." },
    { name: "Eugene Mathews", location: "Ardee", rating: 5, text: "Very happy with our solar panels. The installation was done quickly and we've seen a significant reduction in our electricity bills." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Louth?",
      answer: "The cost of solar panels in County Louth depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Dundalk, Drogheda, Ardee, Dunleer, and Collon — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Louth can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Louth and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Louth?",
      answer: "Homeowners in County Louth can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Dundalk, Drogheda, Ardee, Dunleer, and Collon. Many of our Louth customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Louth?",
      answer: "A standard residential solar panel installation in County Louth is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Dundalk or Drogheda to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Louth comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Louth?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Louth are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Dundalk or Drogheda is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near historic Drogheda and Dundalk may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Louth, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Louth?",
      answer: "Typical savings from solar panels in County Louth range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Dundalk, Drogheda, Ardee, Dunleer, and Collon can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Louth can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Louth achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Louth's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Louth receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Louth's east-coast location means it receives some of the highest solar irradiance levels in Ireland, particularly along the Cooley Peninsula. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Dundalk or Drogheda, your system will still produce meaningful electricity. As a coastal county, Louth does experience more wind and rainfall, but quality solar panels are manufactured to withstand harsh weather conditions including salt air exposure, heavy rain, and wind speeds well above what Ireland experiences. We use marine-grade mounting systems for properties near the coast. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Louth?",
      answer: "The ideal solar panel system size for your home in County Louth depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Dundalk, Drogheda, Ardee, Dunleer, and Collon, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Ardee or Dunleer may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Louth is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Louth?",
      answer: "Solar panels are absolutely worth it for older homes in County Louth — and they may actually benefit you more than newer properties. Older homes in Dundalk, Drogheda, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Louth can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in historic Drogheda and Dundalk have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Louth home."
    },
    {
      question: "Do solar panels work on flat roofs in Louth?",
      answer: "Yes, solar panels work very well on flat roofs in County Louth. While most homes in Dundalk and Drogheda have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Louth. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Louth is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Ardee and Dunleer with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Louth?",
      answer: "The best orientation for solar panels in County Louth is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Dundalk, Drogheda, Ardee, Dunleer, and Collon because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties along Louth's coastline sometimes face unusual orientations due to their location — we've successfully installed solar on roofs facing nearly every direction. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Louth. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#18ffff",
  accentHover: "#4fffff",
};

const meath: CountyData = {
  slug: "meath",
  name: "Meath",
  region: "Leinster",
  province: "Leinster",
  country: "IE",
  phone: "+353-46-902-3100",
  email: "info@renewableMeath.ie",
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
    "Meath's Royal heritage meets cutting-edge solar technology. New builds and period properties — we've done them all.",
  heroTitle: "Solar Panels Meath.\nRoyal Heritage Meets Clean Energy.",
  testimonials: [
    { name: "Derek Farrell", location: "Navan", rating: 5, text: "Solar Meath provided an excellent end-to-end service. From survey to installation, everything was professional and well-coordinated." },
    { name: "Orla Smith", location: "Ashbourne", rating: 5, text: "We're very happy with our solar installation. The SEAI grant process was handled smoothly and the system is performing well." },
    { name: "Gareth Reilly", location: "Dunboyne", rating: 5, text: "Great service from a knowledgeable team. Solar Meath delivered exactly what they promised and we're seeing real savings." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Meath?",
      answer: "The cost of solar panels in County Meath depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Navan, Ashbourne, Dunboyne, Kells, and Trim — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Meath can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Meath and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Meath?",
      answer: "Homeowners in County Meath can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Navan, Ashbourne, Dunboyne, Kells, and Trim. Many of our Meath customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Meath?",
      answer: "A standard residential solar panel installation in County Meath is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Navan or Ashbourne to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Meath comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Meath?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Meath are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Navan or Ashbourne is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Meath's heritage towns and conservation areas may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Meath, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Meath?",
      answer: "Typical savings from solar panels in County Meath range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Navan, Ashbourne, Dunboyne, Kells, and Trim can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Meath can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Meath achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Meath's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Meath receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Meath's rapid residential growth around Navan, Ashbourne and Dunboyne has created thousands of homes ideally suited to solar energy. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Navan or Ashbourne, your system will still produce meaningful electricity. As a coastal county, Meath does experience more wind and rainfall, but quality solar panels are manufactured to withstand harsh weather conditions including salt air exposure, heavy rain, and wind speeds well above what Ireland experiences. We use marine-grade mounting systems for properties near the coast. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Meath?",
      answer: "The ideal solar panel system size for your home in County Meath depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Navan, Ashbourne, Dunboyne, Kells, and Trim, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Dunboyne or Kells may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Meath is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Meath?",
      answer: "Solar panels are absolutely worth it for older homes in County Meath — and they may actually benefit you more than newer properties. Older homes in Navan, Ashbourne, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Meath can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Meath's heritage towns and conservation areas have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Meath home."
    },
    {
      question: "Do solar panels work on flat roofs in Meath?",
      answer: "Yes, solar panels work very well on flat roofs in County Meath. While most homes in Navan and Ashbourne have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Meath. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Meath is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Dunboyne and Kells with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Meath?",
      answer: "The best orientation for solar panels in County Meath is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Navan, Ashbourne, Dunboyne, Kells, and Trim because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties along Meath's coastline sometimes face unusual orientations due to their location — we've successfully installed solar on roofs facing nearly every direction. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Meath. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#b2ff59",
  accentHover: "#c5ff82",
};

const mayo: CountyData = {
  slug: "mayo",
  name: "Mayo",
  region: "West",
  province: "Connacht",
  country: "IE",
  phone: "+353-94-902-4000",
  email: "info@renewablemayo.ie",
  domain: "renewablemayo.ie",
  mainTown: "Castlebar",
  areaTowns: ["Westport", "Ballina", "Castlebar", "Claremorris", "Swinford", "Foxford"],
  lat: "53.8603",
  lng: "-9.2876",
  currency: "€",
  accreditation: "SEAI",
  grants: [
    "SEAI Domestic Solar PV Grant — up to €1,800 for homes",
    "SEAI Better Energy Homes: Available for insulation upgrades",
    "BER Improvement Grant: Available",
  ],
  heroSubtitle:
    "Mayo's spectacular Atlantic exposure delivers outstanding solar generation. From Westport to Ballina, we're the county's most trusted installer.",
  heroTitle: "Solar Panels Mayo.\nAtlantic Exposure. Outstanding Returns.",
  testimonials: [
    { name: "Patrick Gallagher", location: "Westport", rating: 5, text: "Fantastic service from start to finish. The team was professional and the panels are already saving us money. Highly recommend for anyone in Mayo." },
    { name: "Margaret O'Malley", location: "Castlebar", rating: 5, text: "We got quotes from several companies but Renewable Ireland offered the best value. Installation was quick and the results exceeded our expectations." },
    { name: "Tommy Walsh", location: "Ballina", rating: 5, text: "The whole process was seamless. From the initial survey to the final commissioning, everything was handled professionally. Great aftercare too." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Mayo?",
      answer: "The cost of solar panels in County Mayo depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Westport, Ballina, Castlebar, Claremorris, and Swinford — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Mayo can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Mayo and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Mayo?",
      answer: "Homeowners in County Mayo can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Westport, Ballina, Castlebar, Claremorris, and Swinford. Many of our Mayo customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Mayo?",
      answer: "A standard residential solar panel installation in County Mayo is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Westport or Ballina to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Mayo comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Mayo?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Mayo are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Westport or Ballina is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Mayo may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Mayo, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Mayo?",
      answer: "Typical savings from solar panels in County Mayo range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Westport, Ballina, Castlebar, Claremorris, and Swinford can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Mayo can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Mayo achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Mayo's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Mayo receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Mayo's Atlantic coastline actually receives excellent solar irradiance, and the county's northerly latitude brings exceptionally long summer daylight hours. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Westport or Ballina, your system will still produce meaningful electricity. As a coastal county, Mayo does experience more wind and rainfall, but quality solar panels are manufactured to withstand harsh weather conditions including salt air exposure, heavy rain, and wind speeds well above what Ireland experiences. We use marine-grade mounting systems for properties near the coast. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Mayo?",
      answer: "The ideal solar panel system size for your home in County Mayo depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Westport, Ballina, Castlebar, Claremorris, and Swinford, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Castlebar or Claremorris may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Mayo is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Mayo?",
      answer: "Solar panels are absolutely worth it for older homes in County Mayo — and they may actually benefit you more than newer properties. Older homes in Westport, Ballina, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Mayo can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Mayo have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Mayo home."
    },
    {
      question: "Do solar panels work on flat roofs in Mayo?",
      answer: "Yes, solar panels work very well on flat roofs in County Mayo. While most homes in Westport and Ballina have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Mayo. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Mayo is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Castlebar and Claremorris with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Mayo?",
      answer: "The best orientation for solar panels in County Mayo is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Westport, Ballina, Castlebar, Claremorris, and Swinford because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties along Mayo's coastline sometimes face unusual orientations due to their location — we've successfully installed solar on roofs facing nearly every direction. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Mayo. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
  ],
  avgSystemCost: "€4,500 – €6,500",
  avgPaybackYears: "5–7 years",
  accentColor: "#26a69a",
  accentHover: "#2bbbad",
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
    "Monaghan's drumlin landscape and scattered farms are ideal for rooftop and ground-mount solar. Maximise your land's earning potential.",
  heroTitle: "Solar Panels Monaghan.\nDrumlin Country, Generating Power.",
  testimonials: [
    { name: "Raymond McEntee", location: "Monaghan Town", rating: 5, text: "Solar Monaghan did an excellent job on our home. The installation was done efficiently and the SEAI grant was handled without any hassle." },
    { name: "Anne Sherry", location: "Carrickmacross", rating: 5, text: "We're delighted with our solar panels. The system is performing well and we've seen a real reduction in our electricity costs." },
    { name: "Thomas McNally", location: "Castleblayney", rating: 5, text: "Professional and thorough. Solar Monaghan provided a great service at a competitive price. Highly recommend them." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Monaghan?",
      answer: "The cost of solar panels in County Monaghan depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Monaghan Town, Castleblayney, Carrickmacross, Clones, and Ballybay — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Monaghan can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Monaghan and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Monaghan?",
      answer: "Homeowners in County Monaghan can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Monaghan Town, Castleblayney, Carrickmacross, Clones, and Ballybay. Many of our Monaghan customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Monaghan?",
      answer: "A standard residential solar panel installation in County Monaghan is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Monaghan Town or Castleblayney to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Monaghan comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Monaghan?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Monaghan are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Monaghan Town or Castleblayney is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Monaghan may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Monaghan, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Monaghan?",
      answer: "Typical savings from solar panels in County Monaghan range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Monaghan Town, Castleblayney, Carrickmacross, Clones, and Ballybay can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Monaghan can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Monaghan achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Monaghan's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Monaghan receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Monaghan's drumlin landscape creates varied roof orientations, but experienced installers can optimise panel placement to capture maximum daylight across all roof pitches. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Monaghan Town or Castleblayney, your system will still produce meaningful electricity. While Monaghan is the border region and experiences typical Irish weather patterns, solar panels are designed and tested to perform reliably in these conditions for 25 to 30 years. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Monaghan?",
      answer: "The ideal solar panel system size for your home in County Monaghan depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Monaghan Town, Castleblayney, Carrickmacross, Clones, and Ballybay, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Carrickmacross or Clones may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Monaghan is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Monaghan?",
      answer: "Solar panels are absolutely worth it for older homes in County Monaghan — and they may actually benefit you more than newer properties. Older homes in Monaghan Town, Castleblayney, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Monaghan can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Monaghan have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Monaghan home."
    },
    {
      question: "Do solar panels work on flat roofs in Monaghan?",
      answer: "Yes, solar panels work very well on flat roofs in County Monaghan. While most homes in Monaghan Town and Castleblayney have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Monaghan. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Monaghan is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Carrickmacross and Clones with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Monaghan?",
      answer: "The best orientation for solar panels in County Monaghan is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Monaghan Town, Castleblayney, Carrickmacross, Clones, and Ballybay because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties in the border region with varied roof lines often benefit from our expert assessment to find the most productive configuration. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Monaghan. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "Offaly's heartland location means some of Ireland's best solar irradiance levels. Turn your roof into a power station.",
  heroTitle: "Solar Panels Offaly.\nTurn Your Roof Into a Power Station.",
  testimonials: [
    { name: "Pat O'Meara", location: "Tullamore", rating: 5, text: "Solar Offaly provided an excellent service. The installation was efficient and the system is performing very well. Great local company." },
    { name: "Deirdre Flanagan", location: "Birr", rating: 5, text: "We're very pleased with our solar installation. The SEAI grant was handled smoothly and the team was professional throughout." },
    { name: "Thomas Breslin", location: "Edenderry", rating: 5, text: "Top-notch installation. Solar Offaly delivered on every promise and we're seeing significant savings on our bills." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Offaly?",
      answer: "The cost of solar panels in County Offaly depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Tullamore, Birr, Clara, Edenderry, and Banagher — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Offaly can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Offaly and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Offaly?",
      answer: "Homeowners in County Offaly can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Tullamore, Birr, Clara, Edenderry, and Banagher. Many of our Offaly customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Offaly?",
      answer: "A standard residential solar panel installation in County Offaly is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Tullamore or Birr to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Offaly comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Offaly?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Offaly are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Tullamore or Birr is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Offaly may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Offaly, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Offaly?",
      answer: "Typical savings from solar panels in County Offaly range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Tullamore, Birr, Clara, Edenderry, and Banagher can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Offaly can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Offaly achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Offaly's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Offaly receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Offaly's central location means it sits in one of Ireland's most consistent solar irradiance zones, with reliable year-round generation potential. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Tullamore or Birr, your system will still produce meaningful electricity. While Offaly is the Midlands and experiences typical Irish weather patterns, solar panels are designed and tested to perform reliably in these conditions for 25 to 30 years. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Offaly?",
      answer: "The ideal solar panel system size for your home in County Offaly depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Tullamore, Birr, Clara, Edenderry, and Banagher, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Clara or Edenderry may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Offaly is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Offaly?",
      answer: "Solar panels are absolutely worth it for older homes in County Offaly — and they may actually benefit you more than newer properties. Older homes in Tullamore, Birr, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Offaly can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Offaly have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Offaly home."
    },
    {
      question: "Do solar panels work on flat roofs in Offaly?",
      answer: "Yes, solar panels work very well on flat roofs in County Offaly. While most homes in Tullamore and Birr have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Offaly. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Offaly is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Clara and Edenderry with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Offaly?",
      answer: "The best orientation for solar panels in County Offaly is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Tullamore, Birr, Clara, Edenderry, and Banagher because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties in the Midlands with varied roof lines often benefit from our expert assessment to find the most productive configuration. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Offaly. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "Roscommon's spacious rural properties are natural solar generators. Large roofs, big savings — we show you exactly what's possible.",
  heroTitle: "Solar Panels Roscommon.\nLarge Roofs, Large Savings.",
  testimonials: [
    { name: "Thomas Mannion", location: "Roscommon Town", rating: 5, text: "Solar Roscommon did a fantastic job on our home. The installation was done efficiently and the SEAI grant was handled without any issues." },
    { name: "Brid Mulry", location: "Castlerea", rating: 5, text: "We're very happy with our solar installation. Professional team, clean work, and the system is performing well above expectations." },
    { name: "James Finan", location: "Boyle", rating: 5, text: "Great service from start to finish. Solar Roscommon delivered on everything they promised. Highly recommend." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Roscommon?",
      answer: "The cost of solar panels in County Roscommon depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Roscommon Town, Castlerea, Boyle, Strokestown, and Ballaghaderreen — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Roscommon can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Roscommon and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Roscommon?",
      answer: "Homeowners in County Roscommon can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Roscommon Town, Castlerea, Boyle, Strokestown, and Ballaghaderreen. Many of our Roscommon customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Roscommon?",
      answer: "A standard residential solar panel installation in County Roscommon is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Roscommon Town or Castlerea to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Roscommon comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Roscommon?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Roscommon are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Roscommon Town or Castlerea is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Roscommon may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Roscommon, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Roscommon?",
      answer: "Typical savings from solar panels in County Roscommon range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Roscommon Town, Castlerea, Boyle, Strokestown, and Ballaghaderreen can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Roscommon can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Roscommon achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Roscommon's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Roscommon receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Roscommon's large rural properties often have expansive roof areas perfect for solar arrays, with minimal shading from surrounding buildings. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Roscommon Town or Castlerea, your system will still produce meaningful electricity. While Roscommon is Connacht and experiences typical Irish weather patterns, solar panels are designed and tested to perform reliably in these conditions for 25 to 30 years. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Roscommon?",
      answer: "The ideal solar panel system size for your home in County Roscommon depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Roscommon Town, Castlerea, Boyle, Strokestown, and Ballaghaderreen, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Boyle or Strokestown may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Roscommon is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Roscommon?",
      answer: "Solar panels are absolutely worth it for older homes in County Roscommon — and they may actually benefit you more than newer properties. Older homes in Roscommon Town, Castlerea, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Roscommon can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Roscommon have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Roscommon home."
    },
    {
      question: "Do solar panels work on flat roofs in Roscommon?",
      answer: "Yes, solar panels work very well on flat roofs in County Roscommon. While most homes in Roscommon Town and Castlerea have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Roscommon. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Roscommon is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Boyle and Strokestown with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Roscommon?",
      answer: "The best orientation for solar panels in County Roscommon is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Roscommon Town, Castlerea, Boyle, Strokestown, and Ballaghaderreen because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties in Connacht with varied roof lines often benefit from our expert assessment to find the most productive configuration. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Roscommon. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "Under Sligo's expansive skies, solar panels thrive. Yeats Country meets clean energy — installations that deliver year-round returns.",
  heroTitle: "Solar Panels Sligo.\nYeats Country Meets Clean Energy.",
  testimonials: [
    { name: "Declan Gilmartin", location: "Sligo Town", rating: 5, text: "Solar Sligo provided a great service. The installation was done efficiently and our electricity bills have dropped significantly." },
    { name: "Ita Gallagher", location: "Tubbercurry", rating: 5, text: "Very happy with our solar panels. The SEAI grant was straightforward and the team at Solar Sligo was professional throughout." },
    { name: "Michael Brennan", location: "Enniscrone", rating: 5, text: "Excellent installation on our coastal property. Solar Sligo understood the specific considerations for our location and delivered a first-class result." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Sligo?",
      answer: "The cost of solar panels in County Sligo depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Sligo Town, Tubbercurry, Enniscrone, Grange, and Ballymote — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Sligo can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Sligo and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Sligo?",
      answer: "Homeowners in County Sligo can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Sligo Town, Tubbercurry, Enniscrone, Grange, and Ballymote. Many of our Sligo customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Sligo?",
      answer: "A standard residential solar panel installation in County Sligo is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Sligo Town or Tubbercurry to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Sligo comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Sligo?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Sligo are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Sligo Town or Tubbercurry is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Sligo's coastal and scenic areas may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Sligo, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Sligo?",
      answer: "Typical savings from solar panels in County Sligo range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Sligo Town, Tubbercurry, Enniscrone, Grange, and Ballymote can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Sligo can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Sligo achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Sligo's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Sligo receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Sligo's coastal location along the Atlantic provides excellent daylight exposure, and the county's open landscape minimises shading issues. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Sligo Town or Tubbercurry, your system will still produce meaningful electricity. As a coastal county, Sligo does experience more wind and rainfall, but quality solar panels are manufactured to withstand harsh weather conditions including salt air exposure, heavy rain, and wind speeds well above what Ireland experiences. We use marine-grade mounting systems for properties near the coast. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Sligo?",
      answer: "The ideal solar panel system size for your home in County Sligo depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Sligo Town, Tubbercurry, Enniscrone, Grange, and Ballymote, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Enniscrone or Grange may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Sligo is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Sligo?",
      answer: "Solar panels are absolutely worth it for older homes in County Sligo — and they may actually benefit you more than newer properties. Older homes in Sligo Town, Tubbercurry, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Sligo can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Sligo's coastal and scenic areas have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Sligo home."
    },
    {
      question: "Do solar panels work on flat roofs in Sligo?",
      answer: "Yes, solar panels work very well on flat roofs in County Sligo. While most homes in Sligo Town and Tubbercurry have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Sligo. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Sligo is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Enniscrone and Grange with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Sligo?",
      answer: "The best orientation for solar panels in County Sligo is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Sligo Town, Tubbercurry, Enniscrone, Grange, and Ballymote because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties along Sligo's coastline sometimes face unusual orientations due to their location — we've successfully installed solar on roofs facing nearly every direction. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Sligo. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "Tipperary's agricultural heritage meets the future of energy. Farm, home and business solar installations across the Premier County.",
  heroTitle: "Solar Panels Tipperary.\nThe Premier County's Premier Investment.",
  testimonials: [
    { name: "Eddie Ryan", location: "Clonmel", rating: 5, text: "Solar Tipperary installed a 5kW system on our home and the results have been excellent. The SEAI grant was handled without any hassle." },
    { name: "Mary O'Dwyer", location: "Thurles", rating: 5, text: "Very professional service from start to finish. The installation was done in a day and we're very happy with the results." },
    { name: "John Maher", location: "Nenagh", rating: 5, text: "Solar Tipperary did a fantastic job. Clean installation, good communication, and the system is performing exactly as quoted." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Tipperary?",
      answer: "The cost of solar panels in County Tipperary depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Clonmel, Nenagh, Thurles, Carrick-on-Suir, and Cashel — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Tipperary can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Tipperary and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Tipperary?",
      answer: "Homeowners in County Tipperary can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Clonmel, Nenagh, Thurles, Carrick-on-Suir, and Cashel. Many of our Tipperary customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Tipperary?",
      answer: "A standard residential solar panel installation in County Tipperary is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Clonmel or Nenagh to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Tipperary comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Tipperary?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Tipperary are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Clonmel or Nenagh is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Tipperary's heritage towns such as Cashel may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Tipperary, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Tipperary?",
      answer: "Typical savings from solar panels in County Tipperary range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Clonmel, Nenagh, Thurles, Carrick-on-Suir, and Cashel can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Tipperary can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Tipperary achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Tipperary's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Tipperary receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Tipperary's inland location and large agricultural properties create ideal conditions for both residential and farm-based solar installations. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Clonmel or Nenagh, your system will still produce meaningful electricity. While Tipperary is Munster and experiences typical Irish weather patterns, solar panels are designed and tested to perform reliably in these conditions for 25 to 30 years. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Tipperary?",
      answer: "The ideal solar panel system size for your home in County Tipperary depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Clonmel, Nenagh, Thurles, Carrick-on-Suir, and Cashel, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Thurles or Carrick-on-Suir may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Tipperary is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Tipperary?",
      answer: "Solar panels are absolutely worth it for older homes in County Tipperary — and they may actually benefit you more than newer properties. Older homes in Clonmel, Nenagh, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Tipperary can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Tipperary's heritage towns such as Cashel have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Tipperary home."
    },
    {
      question: "Do solar panels work on flat roofs in Tipperary?",
      answer: "Yes, solar panels work very well on flat roofs in County Tipperary. While most homes in Clonmel and Nenagh have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Tipperary. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Tipperary is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Thurles and Carrick-on-Suir with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Tipperary?",
      answer: "The best orientation for solar panels in County Tipperary is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Clonmel, Nenagh, Thurles, Carrick-on-Suir, and Cashel because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties in Munster with varied roof lines often benefit from our expert assessment to find the most productive configuration. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Tipperary. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "Waterford's sunny south-east coast is Ireland's solar sweet spot. The Deise's brightest investment starts on your roof.",
  heroTitle: "Solar Panels Waterford.\nThe Déise's Brightest Investment.",
  testimonials: [
    { name: "John Power", location: "Waterford City", rating: 5, text: "Solar Waterford provided an excellent service. The installation was done in a day and the SEAI grant was handled efficiently." },
    { name: "Sinead Kirwan", location: "Dungarvan", rating: 5, text: "We're very pleased with our solar panels. The system is generating well and the team was professional and knowledgeable." },
    { name: "Mike Foley", location: "Tramore", rating: 5, text: "Great installation on our coastal home. Solar Waterford were thorough, reliable, and the system has exceeded expectations." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Waterford?",
      answer: "The cost of solar panels in County Waterford depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Waterford City, Dungarvan, Tramore, Lismore, and Kilmacthomas — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Waterford can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Waterford and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Waterford?",
      answer: "Homeowners in County Waterford can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Waterford City, Dungarvan, Tramore, Lismore, and Kilmacthomas. Many of our Waterford customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Waterford?",
      answer: "A standard residential solar panel installation in County Waterford is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Waterford City or Dungarvan to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Waterford comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Waterford?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Waterford are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Waterford City or Dungarvan is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Waterford City's Viking Quarter and historic areas may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Waterford, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Waterford?",
      answer: "Typical savings from solar panels in County Waterford range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Waterford City, Dungarvan, Tramore, Lismore, and Kilmacthomas can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Waterford can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Waterford achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Waterford's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Waterford receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Waterford's south-east coastal location makes it one of Ireland's best counties for solar energy, with irradiance levels comparable to parts of northern France. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Waterford City or Dungarvan, your system will still produce meaningful electricity. As a coastal county, Waterford does experience more wind and rainfall, but quality solar panels are manufactured to withstand harsh weather conditions including salt air exposure, heavy rain, and wind speeds well above what Ireland experiences. We use marine-grade mounting systems for properties near the coast. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Waterford?",
      answer: "The ideal solar panel system size for your home in County Waterford depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Waterford City, Dungarvan, Tramore, Lismore, and Kilmacthomas, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Tramore or Lismore may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Waterford is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Waterford?",
      answer: "Solar panels are absolutely worth it for older homes in County Waterford — and they may actually benefit you more than newer properties. Older homes in Waterford City, Dungarvan, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Waterford can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Waterford City's Viking Quarter and historic areas have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Waterford home."
    },
    {
      question: "Do solar panels work on flat roofs in Waterford?",
      answer: "Yes, solar panels work very well on flat roofs in County Waterford. While most homes in Waterford City and Dungarvan have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Waterford. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Waterford is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Tramore and Lismore with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Waterford?",
      answer: "The best orientation for solar panels in County Waterford is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Waterford City, Dungarvan, Tramore, Lismore, and Kilmacthomas because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties along Waterford's coastline sometimes face unusual orientations due to their location — we've successfully installed solar on roofs facing nearly every direction. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Waterford. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "Westmeath's lake district meets green energy. Athlone to Mullingar — solar installations that cut bills and add value to your home.",
  heroTitle: "Solar Panels Westmeath.\nLake District Living, Solar Powered.",
  testimonials: [
    { name: "Michael Smyth", location: "Mullingar", rating: 5, text: "Solar Westmeath provided an excellent service. The installation was efficient and the SEAI grant was sorted without any issues." },
    { name: "Mary O'Brien", location: "Athlone", rating: 5, text: "We're very happy with our solar panels. The team was professional, tidy, and the system is performing very well." },
    { name: "John Connolly", location: "Kinnegad", rating: 5, text: "Great installation at a fair price. Solar Westmeath delivered exactly what they promised and the results speak for themselves." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Westmeath?",
      answer: "The cost of solar panels in County Westmeath depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Mullingar, Athlone, Kinnegad, Moate, and Castlepollard — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Westmeath can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Westmeath and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Westmeath?",
      answer: "Homeowners in County Westmeath can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Mullingar, Athlone, Kinnegad, Moate, and Castlepollard. Many of our Westmeath customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Westmeath?",
      answer: "A standard residential solar panel installation in County Westmeath is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Mullingar or Athlone to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Westmeath comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Westmeath?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Westmeath are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Mullingar or Athlone is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Westmeath may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Westmeath, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Westmeath?",
      answer: "Typical savings from solar panels in County Westmeath range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Mullingar, Athlone, Kinnegad, Moate, and Castlepollard can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Westmeath can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Westmeath achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Westmeath's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Westmeath receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Westmeath's lakeland setting provides open skies and minimal shading, while its growing towns around Mullingar and Athlone offer plenty of modern homes perfect for solar. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Mullingar or Athlone, your system will still produce meaningful electricity. While Westmeath is the Midlands and experiences typical Irish weather patterns, solar panels are designed and tested to perform reliably in these conditions for 25 to 30 years. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Westmeath?",
      answer: "The ideal solar panel system size for your home in County Westmeath depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Mullingar, Athlone, Kinnegad, Moate, and Castlepollard, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Kinnegad or Moate may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Westmeath is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Westmeath?",
      answer: "Solar panels are absolutely worth it for older homes in County Westmeath — and they may actually benefit you more than newer properties. Older homes in Mullingar, Athlone, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Westmeath can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Westmeath have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Westmeath home."
    },
    {
      question: "Do solar panels work on flat roofs in Westmeath?",
      answer: "Yes, solar panels work very well on flat roofs in County Westmeath. While most homes in Mullingar and Athlone have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Westmeath. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Westmeath is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Kinnegad and Moate with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Westmeath?",
      answer: "The best orientation for solar panels in County Westmeath is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Mullingar, Athlone, Kinnegad, Moate, and Castlepollard because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties in the Midlands with varied roof lines often benefit from our expert assessment to find the most productive configuration. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Westmeath. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "Wexford's south-eastern location delivers some of Ireland's highest solar yields. Model County homes lead the way in energy independence.",
  heroTitle: "Solar Panels Wexford.\nModel County Homes Leading the Way.",
  testimonials: [
    { name: "Jimmy Roche", location: "Wexford Town", rating: 5, text: "Solar Wexford did a superb job on our home. The installation was done in a day and we're seeing excellent generation from our coastal location." },
    { name: "Margaret Kinsella", location: "Enniscorthy", rating: 5, text: "We're delighted with our solar installation. Professional team and the SEAI grant was handled smoothly from start to finish." },
    { name: "Paddy Doyle", location: "Gorey", rating: 5, text: "Excellent service from Solar Wexford. Clean installation, good communication, and the system is performing very well." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Wexford?",
      answer: "The cost of solar panels in County Wexford depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Wexford Town, Enniscorthy, Gorey, New Ross, and Ferns — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Wexford can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Wexford and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Wexford?",
      answer: "Homeowners in County Wexford can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Wexford Town, Enniscorthy, Gorey, New Ross, and Ferns. Many of our Wexford customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Wexford?",
      answer: "A standard residential solar panel installation in County Wexford is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Wexford Town or Enniscorthy to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Wexford comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Wexford?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Wexford are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Wexford Town or Enniscorthy is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Wexford's historic towns and coastal villages may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Wexford, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Wexford?",
      answer: "Typical savings from solar panels in County Wexford range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Wexford Town, Enniscorthy, Gorey, New Ross, and Ferns can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Wexford can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Wexford achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Wexford's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Wexford receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Wexford's south-east position gives it some of Ireland's highest annual solar irradiance — often exceeding 1,100 kWh per square metre, making it one of the best counties in the country for solar panels. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Wexford Town or Enniscorthy, your system will still produce meaningful electricity. As a coastal county, Wexford does experience more wind and rainfall, but quality solar panels are manufactured to withstand harsh weather conditions including salt air exposure, heavy rain, and wind speeds well above what Ireland experiences. We use marine-grade mounting systems for properties near the coast. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Wexford?",
      answer: "The ideal solar panel system size for your home in County Wexford depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Wexford Town, Enniscorthy, Gorey, New Ross, and Ferns, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Gorey or New Ross may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Wexford is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Wexford?",
      answer: "Solar panels are absolutely worth it for older homes in County Wexford — and they may actually benefit you more than newer properties. Older homes in Wexford Town, Enniscorthy, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Wexford can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Wexford's historic towns and coastal villages have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Wexford home."
    },
    {
      question: "Do solar panels work on flat roofs in Wexford?",
      answer: "Yes, solar panels work very well on flat roofs in County Wexford. While most homes in Wexford Town and Enniscorthy have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Wexford. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Wexford is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Gorey and New Ross with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Wexford?",
      answer: "The best orientation for solar panels in County Wexford is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Wexford Town, Enniscorthy, Gorey, New Ross, and Ferns because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties along Wexford's coastline sometimes face unusual orientations due to their location — we've successfully installed solar on roofs facing nearly every direction. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Wexford. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
    "The Garden County grows more than plants — it grows energy. Wicklow's rooftops are among the most productive in Ireland.",
  heroTitle: "Solar Panels Wicklow.\nThe Garden County's Energy Harvest.",
  testimonials: [
    { name: "Brian O'Toole", location: "Bray", rating: 5, text: "Solar Wicklow provided a first-class service. The installation on our home was done efficiently and the SEAI grant was handled seamlessly." },
    { name: "Grainne Nolan", location: "Greystones", rating: 5, text: "We added solar and battery storage and couldn't be happier. Solar Wicklow's team was professional and the results have exceeded our expectations." },
    { name: "Conor Kavanagh", location: "Arklow", rating: 5, text: "Great installation at a competitive price. The system is performing well and the aftercare from Solar Wicklow has been excellent." },
  ],
    faqs: [
    {
      question: "How much do solar panels cost in Wicklow?",
      answer: "The cost of solar panels in County Wicklow depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in Wicklow Town, Bray, Greystones, Arklow, and Enniskerry — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in Wicklow can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County Wicklow and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever."
    },
    {
      question: "What SEAI grants are available in Wicklow?",
      answer: "Homeowners in County Wicklow can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across Wicklow Town, Bray, Greystones, Arklow, and Enniskerry. Many of our Wicklow customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint."
    },
    {
      question: "How long does a solar installation take in Wicklow?",
      answer: "A standard residential solar panel installation in County Wicklow is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in Wicklow Town or Bray to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in Wicklow comes with a thorough handover, including a demonstration of your monitoring app and system controls."
    },
    {
      question: "Do I need planning permission for solar panels in Wicklow?",
      answer: "In the vast majority of cases, no — domestic solar panel installations in County Wicklow are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in Wicklow Town or Bray is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. Properties in or near Wicklow's coastal villages and heritage areas may require additional consideration. We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County Wicklow, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement."
    },
    {
      question: "How much will I save with solar panels in Wicklow?",
      answer: "Typical savings from solar panels in County Wicklow range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in Wicklow Town, Bray, Greystones, Arklow, and Enniskerry can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in Wicklow can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County Wicklow achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually."
    },
    {
      question: "Does solar work in Wicklow's weather and climate?",
      answer: "Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County Wicklow receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. Wicklow's east-coast location provides excellent solar irradiance, and the county benefits from being close to Dublin while enjoying more open rural roofscapes in areas like Blessington and Arklow. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in Wicklow Town or Bray, your system will still produce meaningful electricity. As a coastal county, Wicklow does experience more wind and rainfall, but quality solar panels are manufactured to withstand harsh weather conditions including salt air exposure, heavy rain, and wind speeds well above what Ireland experiences. We use marine-grade mounting systems for properties near the coast. In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season."
    },
    {
      question: "What size solar panel system do I need for my home in Wicklow?",
      answer: "The ideal solar panel system size for your home in County Wicklow depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in Wicklow Town, Bray, Greystones, Arklow, and Enniskerry, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like Greystones or Arklow may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in Wicklow is tailored to your home's unique characteristics and your family's energy usage patterns."
    },
    {
      question: "Are solar panels worth it for older homes in Wicklow?",
      answer: "Solar panels are absolutely worth it for older homes in County Wicklow — and they may actually benefit you more than newer properties. Older homes in Wicklow Town, Bray, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in Wicklow can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in Wicklow's coastal villages and heritage areas have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older Wicklow home."
    },
    {
      question: "Do solar panels work on flat roofs in Wicklow?",
      answer: "Yes, solar panels work very well on flat roofs in County Wicklow. While most homes in Wicklow Town and Bray have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across Wicklow. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in Wicklow is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in Greystones and Arklow with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems."
    },
    {
      question: "What is the best orientation for solar panels in Wicklow?",
      answer: "The best orientation for solar panels in County Wicklow is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in Wicklow Town, Bray, Greystones, Arklow, and Enniskerry because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. Properties along Wicklow's coastline sometimes face unusual orientations due to their location — we've successfully installed solar on roofs facing nearly every direction. During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in Wicklow. We never recommend an installation unless we're confident it will deliver strong returns on your investment."
    }
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
      "Assistance with energy supplier applications and grid registration",
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
      "Maximised self-consumption to reduce grid dependence",
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
