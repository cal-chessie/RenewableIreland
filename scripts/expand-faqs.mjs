#!/usr/bin/env node
/**
 * Script to expand Republic of Ireland county FAQs from 5 to 10 questions each.
 * Each answer is 100-200 words, county-specific, SEO-optimized, and AEO-ready.
 */

import { readFileSync, writeFileSync } from 'fs';

const filePath = './src/data/counties.ts';
let content = readFileSync(filePath, 'utf8');

// County-specific data for customization
const countyInfo = {
  carlow: {
    towns: ['Carlow', 'Tullow', 'Bagenalstown', 'Hacketstown', 'Leighlinbridge', 'Myshall'],
    traits: 'flat to gently rolling countryside in the south-east of Ireland',
    traitsShort: "Carlow's south-east location means above-average Irish solar irradiance levels",
    coastal: false,
    heritage: 'the Carlow area',
    region: 'the south-east',
  },
  cavan: {
    towns: ['Cavan', 'Cootehill', 'Bailieborough', 'Kingscourt', 'Virginia', 'Ballyjamesduff'],
    traits: 'wide open skies with minimal shading from hills, offering excellent solar exposure across its drumlin countryside',
    traitsShort: "Cavan's wide open skies are a natural advantage for solar energy generation",
    coastal: false,
    heritage: 'Cavan',
    region: 'the border region',
  },
  clare: {
    towns: ['Ennis', 'Shannon', 'Kilrush', 'Ennistimon', 'Lahinch', 'Scariff'],
    traits: 'stunning Atlantic coastline and the unique landscape of the Burren',
    traitsShort: "Clare's long Atlantic coastline receives excellent daylight, and while coastal areas experience wind and salt air, quality panels are built to withstand these conditions",
    coastal: true,
    heritage: "Clare's coastal and rural areas",
    region: 'the west coast',
  },
  cork: {
    towns: ['Cork City', 'Mallow', 'Bandon', 'Clonakilty', 'Macroom', 'Youghal'],
    traits: 'Ireland\'s largest county stretching from the bustling city to the rugged west Cork coastline',
    traitsShort: "Cork's southerly latitude gives it some of Ireland's best solar irradiance levels",
    coastal: true,
    heritage: "Cork City's Georgian and Victorian architecture and west Cork's scenic villages",
    region: 'Munster',
  },
  donegal: {
    towns: ['Letterkenny', 'Donegal Town', 'Buncrana', 'Ballybofey', 'Bundoran', 'Gweedore'],
    traits: 'dramatic Atlantic coastline and some of Ireland\'s most spectacular scenery',
    traitsShort: "Despite Donegal's northerly latitude, the county actually receives excellent daylight hours in summer — longer than much of southern Europe between May and August",
    coastal: true,
    heritage: 'Donegal',
    region: 'the north-west',
  },
  dublin: {
    towns: ['Dublin City', 'Dundrum', 'Swords', 'Dun Laoghaire', 'Blanchardstown', 'Tallaght'],
    traits: 'a dense urban environment with everything from Georgian terraces to modern estates',
    traitsShort: "Dublin's urban density means many homes are semi-detached or terraced, but even a modest roof area can host a productive solar system",
    coastal: true,
    heritage: "Dublin's Georgian and Victorian conservation areas",
    region: 'the capital',
  },
  galway: {
    towns: ['Galway City', 'Tuam', 'Athenry', 'Oranmore', 'Loughrea', 'Clifden'],
    traits: 'a vibrant mix of urban roofs in Galway City and sprawling rural homesteads across Connemara',
    traitsShort: "Galway's mix of city and countryside means diverse installation opportunities, from compact urban roofs to expansive rural properties",
    coastal: true,
    heritage: 'Galway City and the surrounding areas',
    region: 'the west',
  },
  kerry: {
    towns: ['Tralee', 'Killarney', 'Listowel', 'Kenmare', 'Dingle', 'Cahersiveen'],
    traits: 'the Kingdom\'s spectacular mountain ranges and long Atlantic coastline',
    traitsShort: "Kerry's south-west location delivers impressive solar irradiance, and the county benefits from some of Ireland's longest summer daylight hours",
    coastal: true,
    heritage: "Kerry's tourist areas and scenic landscapes",
    region: 'the south-west',
  },
  kildare: {
    towns: ['Naas', 'Newbridge', 'Kildare Town', 'Celbridge', 'Maynooth', 'Leixlip'],
    traits: 'a commuter belt known for its high proportion of modern housing estates and family homes',
    traitsShort: "Kildare's large new-build estates are particularly well-suited to solar, with modern roofs, good insulation, and south-facing orientations common in housing developments",
    coastal: false,
    heritage: 'Kildare',
    region: 'the commuter belt',
  },
  kilkenny: {
    towns: ['Kilkenny City', 'Thomastown', 'Castlecomer', 'Callan', 'Ferrybank', 'Graiguenamanagh'],
    traits: 'the Marble City\'s medieval heritage blended with surrounding agricultural countryside',
    traitsShort: "Kilkenny's inland location provides stable solar conditions without the extreme coastal weather experienced by western counties",
    coastal: false,
    heritage: "Kilkenny's medieval city centre and heritage buildings",
    region: 'the south-east',
  },
  laois: {
    towns: ['Portlaoise', 'Portarlington', 'Mountmellick', 'Abbeyleix', 'Stradbally', 'Rathdowney'],
    traits: 'a central Midlands location with large farm holdings and expanding residential areas',
    traitsShort: "Laois sits in the heart of Ireland's Midlands, where the mix of farmland and growing towns creates excellent opportunities for both residential and agricultural solar installations",
    coastal: false,
    heritage: 'Laois',
    region: 'the Midlands',
  },
  leitrim: {
    towns: ['Carrick-on-Shannon', 'Manorhamilton', 'Drumshanbo', 'Mohill', 'Ballinamore', 'Kinlough'],
    traits: 'Ireland\'s least populated county with vast open landscapes and minimal light pollution',
    traitsShort: "Leitrim's unspoilt rural landscape means large roof areas and minimal shading — ideal conditions for maximising solar panel output",
    coastal: false,
    heritage: 'Leitrim',
    region: 'the north-west',
  },
  limerick: {
    towns: ['Limerick City', 'Newcastle West', 'Rathkeale', 'Kilmallock', 'Abbeyfeale', 'Bruff'],
    traits: 'Ireland\'s third largest city surrounded by rich agricultural land in the Golden Vale',
    traitsShort: "Limerick's mix of urban and rural environments, from the Treaty City to the Golden Vale farmlands, provides diverse solar installation opportunities",
    coastal: false,
    heritage: "Limerick City's Georgian Quarter",
    region: 'the mid-west',
  },
  longford: {
    towns: ['Longford Town', 'Ballymahon', 'Granard', 'Edgeworthstown', 'Ardagh', 'Lanesborough'],
    traits: 'agricultural heartland with expansive farm buildings and family homes across gently rolling countryside',
    traitsShort: "Longford's strong agricultural community means many properties have both a family home and farm buildings — both ideal for solar panel installations",
    coastal: false,
    heritage: 'Longford',
    region: 'the Midlands',
  },
  louth: {
    towns: ['Dundalk', 'Drogheda', 'Ardee', 'Dunleer', 'Collon', 'Carlingford'],
    traits: 'Ireland\'s smallest county with a dense population stretching from Drogheda to the Cooley Peninsula',
    traitsShort: "Louth's east-coast location means it receives some of the highest solar irradiance levels in Ireland, particularly along the Cooley Peninsula",
    coastal: true,
    heritage: 'historic Drogheda and Dundalk',
    region: 'the east coast',
  },
  meath: {
    towns: ['Navan', 'Ashbourne', 'Dunboyne', 'Kells', 'Trim', 'Laytown'],
    traits: 'the Royal County\'s blend of ancient heritage sites, new housing estates, and working farmland',
    traitsShort: "Meath's rapid residential growth around Navan, Ashbourne and Dunboyne has created thousands of homes ideally suited to solar energy",
    coastal: true,
    heritage: "Meath's heritage towns and conservation areas",
    region: 'the east',
  },
  mayo: {
    towns: ['Westport', 'Ballina', 'Castlebar', 'Claremorris', 'Swinford', 'Foxford'],
    traits: 'spectacular Atlantic coastline from Achill Island to Killala Bay and the wild Nephin Beg mountains',
    traitsShort: "Mayo's Atlantic coastline actually receives excellent solar irradiance, and the county's northerly latitude brings exceptionally long summer daylight hours",
    coastal: true,
    heritage: 'Mayo',
    region: 'the west coast',
  },
  monaghan: {
    towns: ['Monaghan Town', 'Castleblayney', 'Carrickmacross', 'Clones', 'Ballybay', 'Newbliss'],
    traits: 'drumlin countryside with numerous lakes and strong agricultural traditions',
    traitsShort: "Monaghan's drumlin landscape creates varied roof orientations, but experienced installers can optimise panel placement to capture maximum daylight across all roof pitches",
    coastal: false,
    heritage: 'Monaghan',
    region: 'the border region',
  },
  offaly: {
    towns: ['Tullamore', 'Birr', 'Clara', 'Edenderry', 'Banagher', 'Ferbane'],
    traits: 'the heart of Ireland\'s Midlands with flat terrain ideal for maximising solar exposure',
    traitsShort: "Offaly's central location means it sits in one of Ireland's most consistent solar irradiance zones, with reliable year-round generation potential",
    coastal: false,
    heritage: 'Offaly',
    region: 'the Midlands',
  },
  roscommon: {
    towns: ['Roscommon Town', 'Castlerea', 'Boyle', 'Strokestown', 'Ballaghaderreen', 'Athlone'],
    traits: 'spacious rural properties and large farm buildings dotted across the heart of Connacht',
    traitsShort: "Roscommon's large rural properties often have expansive roof areas perfect for solar arrays, with minimal shading from surrounding buildings",
    coastal: false,
    heritage: 'Roscommon',
    region: 'Connacht',
  },
  sligo: {
    towns: ['Sligo Town', 'Tubbercurry', 'Enniscrone', 'Grange', 'Ballymote', 'Collooney'],
    traits: 'Yeats Country\'s dramatic coastline, Benbulben mountain, and expansive Atlantic skies',
    traitsShort: "Sligo's coastal location along the Atlantic provides excellent daylight exposure, and the county's open landscape minimises shading issues",
    coastal: true,
    heritage: "Sligo's coastal and scenic areas",
    region: 'the north-west',
  },
  tipperary: {
    towns: ['Clonmel', 'Nenagh', 'Thurles', 'Carrick-on-Suir', 'Cashel', 'Templemore'],
    traits: 'Ireland\'s largest inland county with rich farmland stretching from the Golden Vale to the Galtee Mountains',
    traitsShort: "Tipperary's inland location and large agricultural properties create ideal conditions for both residential and farm-based solar installations",
    coastal: false,
    heritage: "Tipperary's heritage towns such as Cashel",
    region: 'Munster',
  },
  waterford: {
    towns: ['Waterford City', 'Dungarvan', 'Tramore', 'Lismore', 'Kilmacthomas', 'Portlaw'],
    traits: 'Ireland\'s sunny south-east coast with some of the highest solar irradiance levels in the country',
    traitsShort: "Waterford's south-east coastal location makes it one of Ireland's best counties for solar energy, with irradiance levels comparable to parts of northern France",
    coastal: true,
    heritage: "Waterford City's Viking Quarter and historic areas",
    region: 'the south-east coast',
  },
  westmeath: {
    towns: ['Mullingar', 'Athlone', 'Kinnegad', 'Moate', 'Castlepollard', 'Kilbeggan'],
    traits: 'the lake district of Ireland with rolling countryside and growing commuter towns',
    traitsShort: "Westmeath's lakeland setting provides open skies and minimal shading, while its growing towns around Mullingar and Athlone offer plenty of modern homes perfect for solar",
    coastal: false,
    heritage: 'Westmeath',
    region: 'the Midlands',
  },
  wexford: {
    towns: ['Wexford Town', 'Enniscorthy', 'Gorey', 'New Ross', 'Ferns', 'Bunclody'],
    traits: 'Ireland\'s south-east corner with the longest coastline of any Leinster county and consistently high solar irradiance',
    traitsShort: "Wexford's south-east position gives it some of Ireland's highest annual solar irradiance — often exceeding 1,100 kWh per square metre, making it one of the best counties in the country for solar panels",
    coastal: true,
    heritage: "Wexford's historic towns and coastal villages",
    region: 'the south-east',
  },
  wicklow: {
    towns: ['Wicklow Town', 'Bray', 'Greystones', 'Arklow', 'Enniskerry', 'Blessington'],
    traits: 'the Garden County\'s dramatic coastline to the east and the Wicklow Mountains to the west',
    traitsShort: "Wicklow's east-coast location provides excellent solar irradiance, and the county benefits from being close to Dublin while enjoying more open rural roofscapes in areas like Blessington and Arklow",
    coastal: true,
    heritage: "Wicklow's coastal villages and heritage areas",
    region: 'the east coast',
  },
};

// Define 10 FAQ topics per county, with templated content
function generateFAQs(countyName, info) {
  const name = countyName;
  const Name = countyName.charAt(0).toUpperCase() + countyName.slice(1);
  const NameUC = Name;
  const t1 = info.towns[0];
  const t2 = info.towns[1];
  const t3 = info.towns[2];
  const t4 = info.towns[3];
  const t5 = info.towns[4];
  const traits = info.traits;
  const traitsShort = info.traitsShort;
  const coastal = info.coastal;
  const heritage = info.heritage;
  const region = info.region;
  const townList = `${t1}, ${t2}, ${t3}, ${t4}, and ${t5}`;

  return [
    {
      question: `How much do solar panels cost in ${Name}?`,
      answer: `The cost of solar panels in County ${NameUC} depends on system size, panel quality, and roof complexity. A typical 4kW residential solar PV system — suitable for most three- to four-bedroom homes in ${townList} — costs between €4,500 and €6,500 before any grants. This price usually includes all scaffolding, SEAI-registered installation, grid connection application, and a monitoring system. A larger 6kW system, ideal for homes with heat pumps or electric vehicles, ranges from €6,000 to €9,500. With the SEAI Domestic Solar PV Grant reducing your cost by up to €1,800, the net outlay for a standard 4kW system in ${Name} can be as low as €2,700–€4,700. We provide free, no-obligation site surveys for every home in County ${NameUC} and a detailed written quote so you know exactly what you're paying for. There are no hidden fees — ever.`
    },
    {
      question: `What SEAI grants are available in ${Name}?`,
      answer: `Homeowners in County ${NameUC} can access the SEAI Domestic Solar PV Grant, which offers up to €1,800 towards the cost of a solar panel installation. To qualify, your home must have been built and occupied before 2021, and you must use an SEAI-registered installer — which we are. The grant is paid directly to you after installation, typically within four to six weeks of submitting your claim. For properties built before 2007, there may also be additional SEAI grants available for insulation and heating upgrades through the Better Energy Homes scheme, which can further improve your home's energy performance. We handle the entire SEAI grant application process on your behalf at no extra cost, making it completely hassle-free for homeowners across ${townList}. Many of our ${Name} customers combine their solar grant with other energy upgrades for even greater savings on their electricity bills and carbon footprint.`
    },
    {
      question: `How long does a solar installation take in ${Name}?`,
      answer: `A standard residential solar panel installation in County ${NameUC} is typically completed in a single working day. Our SEAI-certified installers arrive early, erect scaffolding, mount the panel rails to your roof, fit and wire the solar panels, install the inverter, connect everything to your consumer unit (fuse board), and commission the system — all within roughly six to eight hours. Before installation day, we've already completed your ESB grid connection application, which takes two to four weeks for approval. The total timeline from your initial free survey in ${t1} or ${t2} to your system generating electricity is typically four to six weeks. Larger installations — such as 6kW+ systems, properties with complex roof shapes, or battery storage additions — may require a second day. We always confirm the exact timeline during your quote and keep you informed every step of the way. Every installation in ${NameUC} comes with a thorough handover, including a demonstration of your monitoring app and system controls.`
    },
    {
      question: `Do I need planning permission for solar panels in ${Name}?`,
      answer: `In the vast majority of cases, no — domestic solar panel installations in County ${NameUC} are exempt from planning permission under Irish building regulations. The exemption covers rooftop solar panels on private homes, provided the panels do not protrude more than 300mm from the roof surface and do not cover more than 50% of the total roof area. Ground-mounted solar arrays under 25 square metres are also generally exempt. However, there are exceptions: if your home in ${t1} or ${t2} is a listed or protected structure, located within an architectural conservation area, or near a national monument, you may need planning permission or at least a declaration of exemption from your local county council. ${heritage ? 'Properties in or near ' + heritage + ' may require additional consideration.' : ''} We check all planning requirements during your free site survey and advise you if any consent is needed before we proceed. For most homeowners across County ${NameUC}, the answer is a straightforward no — you can go ahead with your solar installation without any planning involvement.`
    },
    {
      question: `How much will I save with solar panels in ${Name}?`,
      answer: `Typical savings from solar panels in County ${NameUC} range from €600 to €1,000 per year on electricity bills, depending on your system size, household consumption, and whether you're home during the day. A 4kW solar PV system installed on a home in ${townList} can generate approximately 3,400 to 3,800 kWh of clean electricity annually. With current electricity prices in Ireland, this translates to significant annual savings — and the savings grow every time electricity prices increase. If you add battery storage, you can increase your savings further by storing excess daytime generation for evening use, potentially saving €800 to €1,300 per year. Over a 25-year panel lifespan, a solar system in ${Name} can save you €15,000 to €25,000 or more. With the SEAI grant reducing your upfront cost by up to €1,800, most homeowners in County ${NameUC} achieve full payback within five to seven years — leaving roughly 18 to 20 years of virtually free electricity. Your solar installation also reduces your carbon footprint by approximately 1.5 to 2 tonnes of CO₂ annually.`
    },
    {
      question: `Does solar work in ${Name}'s weather and climate?`,
      answer: `Yes — absolutely. Solar panels generate electricity from daylight, not direct sunshine, which is why they work effectively throughout Ireland's seasons. County ${NameUC} receives approximately 1,000 to 1,150 kilowatt-hours (kWh) of solar irradiance per square metre annually. ${traitsShort}. Modern solar panels are highly efficient in diffuse light conditions, meaning even on the cloudiest days in ${t1} or ${t2}, your system will still produce meaningful electricity. ${coastal ? "As a coastal county, " + Name + " does experience more wind and rainfall, but quality solar panels are manufactured to withstand harsh weather conditions including salt air exposure, heavy rain, and wind speeds well above what Ireland experiences. We use marine-grade mounting systems for properties near the coast." : "While " + Name + " is " + region + " and experiences typical Irish weather patterns, solar panels are designed and tested to perform reliably in these conditions for 25 to 30 years."} In fact, cooler temperatures actually improve panel efficiency — solar panels work slightly better in Irish temperatures than in extreme heat. Our monitoring systems allow you to track daily, monthly, and annual generation so you can see exactly how well your system performs through every season.`
    },
    {
      question: `What size solar panel system do I need for my home in ${Name}?`,
      answer: `The ideal solar panel system size for your home in County ${NameUC} depends on your electricity consumption, roof space, and budget. For most three- to four-bedroom households in ${townList}, a 4kW system (approximately 10 to 12 panels) is the sweet spot — generating around 3,400 to 3,800 kWh annually and covering 40 to 50% of a typical household's electricity needs. If you have a larger home, use an electric vehicle, or have a heat pump, a 6kW system (15 to 18 panels) may be more appropriate, generating 5,000 to 5,800 kWh per year. Smaller two-bedroom homes in areas like ${t3} or ${t4} may only need a 3kW system. During your free site survey, we analyse your ESB bills, assess your roof dimensions and orientation, and use satellite shading analysis to recommend the optimally sized system for your specific property. There's no one-size-fits-all — every installation in ${NameUC} is tailored to your home's unique characteristics and your family's energy usage patterns.`
    },
    {
      question: `Are solar panels worth it for older homes in ${Name}?`,
      answer: `Solar panels are absolutely worth it for older homes in County ${NameUC} — and they may actually benefit you more than newer properties. Older homes in ${t1}, ${t2}, and surrounding areas often have solid fuel heating systems, electric immersion heaters, or storage heaters that consume large amounts of electricity. A solar panel system can offset these running costs significantly, especially if you time your immersion heating to coincide with peak solar generation hours. Furthermore, installing solar panels on an older property in ${NameUC} can improve your BER (Building Energy Rating) by one to two rating bands, which is increasingly important for property value and for accessing future green mortgage rates. Many period homes in ${heritage} have large roof areas with south-facing pitches — ideal for solar installations. While we always check structural integrity during our survey, most older Irish homes can easily support the lightweight mounting systems used for modern solar panels. With the SEAI grant of up to €1,800 and typical payback periods of five to seven years, solar panels are one of the smartest investments you can make in an older ${Name} home.`
    },
    {
      question: `Do solar panels work on flat roofs in ${Name}?`,
      answer: `Yes, solar panels work very well on flat roofs in County ${NameUC}. While most homes in ${t1} and ${t2} have pitched roofs, we regularly install on flat-roofed properties including extensions, garages, commercial buildings, and farm outbuildings across ${NameUC}. On a flat roof, panels are mounted on angled frame systems — typically tilted at 15 to 30 degrees — to optimise solar exposure and allow rainwater runoff. The main consideration for flat roof installations in ${Name} is ensuring the roof structure can bear the additional weight, which is typically around 15 to 20 kilograms per square metre. We assess this during every survey. Flat roof systems can actually be more productive than some pitched roof installations because the mounting frames allow us to orient panels at the perfect angle regardless of the roof itself. For homeowners in ${t3} and ${t4} with flat-roof extensions or outbuildings, these spaces can provide excellent additional generation capacity beyond what the main house roof offers. All our flat roof installations comply with SEAI standards and come with the same comprehensive warranties as pitched roof systems.`
    },
    {
      question: `What is the best orientation for solar panels in ${Name}?`,
      answer: `The best orientation for solar panels in County ${NameUC} is south-facing, which maximises annual electricity generation. However, this doesn't mean your roof must face exactly due south. Panels facing south-east or south-west still produce approximately 85 to 95% of the output of a perfectly south-facing system — a relatively small reduction that still delivers excellent savings. In fact, east-west split installations (panels on both sides of a roof) are increasingly popular in ${townList} because they generate electricity more evenly throughout the day, which better matches the consumption patterns of households where people are out at work during the middle of the day. ${coastal ? "Properties along " + Name + "'s coastline sometimes face unusual orientations due to their location — we've successfully installed solar on roofs facing nearly every direction." : "Properties in " + region + " with varied roof lines often benefit from our expert assessment to find the most productive configuration."} During your free survey, we use satellite imagery and shading analysis tools to determine the optimal panel layout for your specific roof in ${NameUC}. We never recommend an installation unless we're confident it will deliver strong returns on your investment.`
    },
  ];
}

// ROI county list
const roiCounties = [
  'carlow', 'cavan', 'clare', 'cork', 'donegal', 'dublin',
  'galway', 'kerry', 'kildare', 'kilkenny', 'laois', 'leitrim',
  'limerick', 'longford', 'louth', 'meath', 'mayo', 'monaghan',
  'offaly', 'roscommon', 'sligo', 'tipperary', 'waterford',
  'westmeath', 'wexford', 'wicklow'
];

let replacedCount = 0;

for (const county of roiCounties) {
  const info = countyInfo[county];
  if (!info) {
    console.error(`No info for county: ${county}`);
    continue;
  }

  const faqs = generateFAQs(county, info);

  // Build the new FAQs string
  const faqEntries = faqs.map(f => {
    return `    {\n      question: "${f.question}",\n      answer: "${f.answer}"\n    }`;
  }).join(',\n');

  const newFaqs = `  faqs: [\n${faqEntries}\n  ]`;

  // Find the existing faqs section for this county
  // Pattern: find "const countyName:" then find "faqs: [" then replace until the matching "],"
  const regex = new RegExp(`(const ${county}: CountyData = \\{[\\s\\S]*?)faqs: \\[[\\s\\S]*?\\](\\s*,\\s*avgSystemCost)`, 'm');

  const match = content.match(regex);
  if (match) {
    const beforeFaqs = match[1];
    const afterFaqs = match[2];
    const replacement = beforeFaqs + newFaqs + afterFaqs;
    content = content.replace(match[0], replacement);
    replacedCount++;
    console.log(`✅ Expanded FAQs for ${county}`);
  } else {
    console.error(`❌ Could not find faqs section for ${county}`);
  }
}

writeFileSync(filePath, content, 'utf8');
console.log(`\n✅ Done! Expanded FAQs for ${replacedCount}/${roiCounties.length} counties.`);
