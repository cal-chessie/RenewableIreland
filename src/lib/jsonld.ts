// =============================================================================
// JSON-LD Structured Data Utility Module
// Generates comprehensive Schema.org structured data for SEO/AEO/GEO/AIO
// =============================================================================

import type { CountyData } from "@/data/counties";

// ---------------------------------------------------------------------------
// Shared Constants
// ---------------------------------------------------------------------------

const SITE_URL = "https://renewableireland.ie";
const ORG_ID = `${SITE_URL}/#organization`;

/** ROI pricing tiers */
const ROI_PRICES = {
  low: "4500",
  mid: "5500",
  high: "6500",
  currency: "EUR",
} as const;

/** NI pricing tiers */
const NI_PRICES = {
  low: "6000",
  mid: "7500",
  high: "9000",
  currency: "GBP",
} as const;

/** Aggregate rating data (company-wide) */
const COMPANY_RATING = {
  ratingValue: "4.9",
  reviewCount: "2847",
  bestRating: "5",
  worstRating: "1",
} as const;

// ---------------------------------------------------------------------------
// 1. Service Schema
// ---------------------------------------------------------------------------

export interface ServiceSchemaInput {
  name: string;
  description: string;
  serviceType: string;
  category?: string;
  url?: string;
  areaServedName?: string;
  /** "IE" or "GB" — controls currency */
  country?: string;
  lowPrice?: string;
  highPrice?: string;
  priceCurrency?: string;
  offerCount?: number;
}

export function generateServiceSchema(input: ServiceSchemaInput): object {
  const {
    name,
    description,
    serviceType,
    category = "Renewable Energy",
    url,
    areaServedName = "Ireland",
    country = "IE",
    lowPrice = country === "GB" ? NI_PRICES.low : ROI_PRICES.low,
    highPrice = country === "GB" ? NI_PRICES.high : ROI_PRICES.high,
    priceCurrency = country === "GB" ? NI_PRICES.currency : ROI_PRICES.currency,
    offerCount = 3,
  } = input;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": url ? `${url}#service-${input.serviceType.toLowerCase().replace(/\s+/g, "-")}` : `${SITE_URL}/#service-${input.serviceType.toLowerCase().replace(/\s+/g, "-")}`,
    name,
    description,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: areaServedName },
    serviceType,
    category,
  };

  if (url) schema.url = url;

  schema.offers = {
    "@type": "AggregateOffer",
    lowPrice,
    highPrice,
    priceCurrency,
    offerCount: String(offerCount),
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    acceptedPaymentMethod: [
      "https://schema.org/Cash",
      "https://schema.org/BankTransfer",
      "https://schema.org/CreditCard",
    ],
    warranty: {
      "@type": "Promise",
      duration: "P25Y",
      description: "25-year manufacturer warranty on solar panels, 10-year workmanship guarantee",
    },
  };

  return schema;
}

// ---------------------------------------------------------------------------
// 2. FAQPage Schema
// ---------------------------------------------------------------------------

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// 3. HowTo Schema
// ---------------------------------------------------------------------------

export interface HowToStep {
  position: number;
  name: string;
  text: string;
  url?: string;
  image?: string;
}

export interface HowToSchemaInput {
  name: string;
  description?: string;
  totalTime?: string;
  estimatedCost?: { currency: string; value: string };
  steps: HowToStep[];
  tools?: string[];
  supplies?: string[];
}

export function generateHowToSchema(input: HowToSchemaInput): object {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
  };

  if (input.description) schema.description = input.description;
  if (input.totalTime) schema.totalTime = input.totalTime;
  if (input.estimatedCost) {
    schema.estimatedCost = {
      "@type": "MonetaryAmount",
      currency: input.estimatedCost.currency,
      value: input.estimatedCost.value,
    };
  }
  if (input.tools && input.tools.length > 0) {
    schema.tool = input.tools.map((t) => ({
      "@type": "HowToTool",
      name: t,
    }));
  }
  if (input.supplies && input.supplies.length > 0) {
    schema.supply = input.supplies.map((s) => ({
      "@type": "HowToSupply",
      name: s,
    }));
  }

  schema.step = input.steps.map((step) => {
    const s: Record<string, unknown> = {
      "@type": "HowToStep",
      position: step.position,
      name: step.name,
      text: step.text,
    };
    if (step.url) s.url = step.url;
    if (step.image) s.image = step.image;
    return s;
  });

  return schema;
}

// ---------------------------------------------------------------------------
// 4. Review Schema
// ---------------------------------------------------------------------------

export interface ReviewInput {
  author: string;
  rating: number;
  text: string;
  location?: string;
  datePublished?: string;
}

export function generateReviewSchema(input: {
  itemName: string;
  itemUrl?: string;
  reviews: ReviewInput[];
  aggregateRating?: { ratingValue: string; reviewCount: string };
}): object {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: input.itemName,
    review: input.reviews.map((r) => {
      const review: Record<string, unknown> = {
        "@type": "Review",
        author: { "@type": "Person", name: r.author },
        reviewRating: {
          "@type": "Rating",
          ratingValue: String(r.rating),
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody: r.text,
      };
      if (r.datePublished) review.datePublished = r.datePublished;
      if (r.location) {
        (review as Record<string, unknown>).author = {
          "@type": "Person",
          name: r.author,
          address: { "@type": "PostalAddress", addressLocality: r.location },
        };
      }
      return review;
    }),
  };

  if (input.aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: input.aggregateRating.ratingValue,
      reviewCount: input.aggregateRating.reviewCount,
      bestRating: "5",
      worstRating: "1",
    };
  }

  if (input.itemUrl) schema.url = input.itemUrl;

  return schema;
}

// ---------------------------------------------------------------------------
// 5. VideoObject Schema (placeholder for future video content)
// ---------------------------------------------------------------------------

export interface VideoObjectInput {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}

export function generateVideoObjectSchema(input: VideoObjectInput): object {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: input.name,
    description: input.description,
    thumbnailUrl: input.thumbnailUrl,
    uploadDate: input.uploadDate,
  };

  if (input.duration) schema.duration = input.duration;
  if (input.contentUrl) schema.contentUrl = input.contentUrl;
  if (input.embedUrl) schema.embedUrl = input.embedUrl;

  return schema;
}

// ---------------------------------------------------------------------------
// 6. Product Schema (solar panel packages)
// ---------------------------------------------------------------------------

export interface ProductSchemaInput {
  name: string;
  description: string;
  price: string;
  priceCurrency: string;
  brand?: string;
  availability?: string;
  aggregateRating?: { ratingValue: string; reviewCount: string };
  image?: string;
  sku?: string;
  seller?: string;
}

export function generateProductSchema(input: ProductSchemaInput): object {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    brand: {
      "@type": "Brand",
      name: input.brand || "Renewable Ireland",
    },
    offers: {
      "@type": "Offer",
      price: input.price,
      priceCurrency: input.priceCurrency,
      priceValidUntil: "2026-12-31",
      availability: input.availability || "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: input.seller || "Renewable Ireland",
        "@id": ORG_ID,
      },
    },
  };

  if (input.aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: input.aggregateRating.ratingValue,
      reviewCount: input.aggregateRating.reviewCount,
      bestRating: "5",
      worstRating: "1",
    };
  }

  if (input.image) schema.image = input.image;
  if (input.sku) schema.sku = input.sku;

  return schema;
}

// ---------------------------------------------------------------------------
// 7. Article Schema
// ---------------------------------------------------------------------------

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  publisherName?: string;
  publisherUrl?: string;
  wordCount?: number;
}

export function generateArticleSchema(input: ArticleSchemaInput): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    author: {
      "@type": "Organization",
      name: input.author || "Renewable Ireland",
      url: input.publisherUrl || SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: input.publisherName || "Renewable Ireland",
      "@id": ORG_ID,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 300,
        height: 60,
      },
    },
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.url,
    },
    ...(input.image ? { image: input.image } : {}),
    ...(input.wordCount ? { wordCount: input.wordCount } : {}),
  };
}

// ---------------------------------------------------------------------------
// 8. BreadcrumbList Schema
// ---------------------------------------------------------------------------

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ---------------------------------------------------------------------------
// 9. Organization Schema (reusable company info)
// ---------------------------------------------------------------------------

export function generateOrganizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Renewable Ireland",
    alternateName: "Renewable Ireland Solar",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 300,
      height: 60,
      caption: "Renewable Ireland Logo",
    },
    description:
      "Ireland's leading solar panel installation company. SEAI registered, Safe Electric certified, with over 2,847 installations nationwide.",
    email: "hello@renewableireland.ie",
    telephone: "+353873958424",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+353873958424",
      contactType: "sales",
      areaServed: "IE",
      availableLanguage: ["English"],
    },
    sameAs: [
      "https://www.facebook.com/renewableireland",
      "https://www.instagram.com/renewableireland",
      "https://www.linkedin.com/company/renewableireland",
      "https://twitter.com/renewableireland",
      "https://www.youtube.com/@renewableireland",
    ],
    foundingDate: "2018",
    foundingLocation: { "@type": "Place", name: "Dublin, Ireland" },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 20,
      maxValue: 50,
    },
  };
}

// ---------------------------------------------------------------------------
// 10. LocalBusiness Schema (for service areas / county pages)
// ---------------------------------------------------------------------------

export interface LocalBusinessSchemaInput {
  name: string;
  url: string;
  telephone: string;
  email: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
  latitude: string;
  longitude: string;
  areaServedTowns: string[];
  image?: string;
  priceRange?: string;
}

export function generateLocalBusinessSchema(
  input: LocalBusinessSchemaInput
): object {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${input.url}#localbusiness`,
    name: input.name,
    image: input.image || `${input.url}/images/og-image.jpg`,
    url: input.url,
    telephone: input.telephone,
    email: input.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: input.addressLocality,
      addressRegion: input.addressRegion,
      addressCountry: input.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: input.latitude,
      longitude: input.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    priceRange: input.priceRange,
    aggregateRating: {
      "@type": "AggregateRating",
      ...COMPANY_RATING,
    },
    areaServed: input.areaServedTowns.map((town) => ({
      "@type": "AdministrativeArea",
      name: town,
    })),
  };
}

// ---------------------------------------------------------------------------
// 11. ImageObject Schema
// ---------------------------------------------------------------------------

export interface ImageObjectInput {
  url: string;
  width?: number;
  height?: number;
  caption?: string;
  creditText?: string;
}

export function generateImageObjectSchema(input: ImageObjectInput): object {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    url: input.url,
  };

  if (input.width) schema.width = input.width;
  if (input.height) schema.height = input.height;
  if (input.caption) schema.caption = input.caption;
  if (input.creditText) schema.creditText = input.creditText;

  return schema;
}

// ---------------------------------------------------------------------------
// 12. OfferCatalog Schema
// ---------------------------------------------------------------------------

export interface OfferItem {
  name: string;
  description: string;
  price: string;
  priceCurrency: string;
}

export function generateOfferCatalogSchema(input: {
  name: string;
  url?: string;
  offers: OfferItem[];
}): object {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: input.name,
    itemListElement: input.offers.map((offer, index) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: offer.name,
        description: offer.description,
      },
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      position: index + 1,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Renewable Ireland",
        "@id": ORG_ID,
      },
    })),
  };

  if (input.url) schema.url = input.url;

  return schema;
}

// ---------------------------------------------------------------------------
// CollectionPage Schema (for blog listing pages)
// ---------------------------------------------------------------------------

export interface CollectionPageInput {
  name: string;
  description: string;
  url: string;
  about?: string;
}

export function generateCollectionPageSchema(
  input: CollectionPageInput
): object {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: input.url,
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.url,
    },
    ...(input.about ? { about: { "@type": "Thing", name: input.about } } : {}),
  };
}

// ---------------------------------------------------------------------------
// Convenience: Generate all product schemas for a given country
// ---------------------------------------------------------------------------

export function generateCountyProducts(county: CountyData): object[] {
  const isNI = county.country === "GB";
  const cur = isNI ? "GBP" : "EUR";
  const domain = `https://${county.domain}`;
  const currencySymbol = county.currency;

  const packages = [
    {
      name: `Essential Solar Package (4kWp) — ${county.name}`,
      description: `10-panel solar PV system ideal for smaller homes in ${county.name}. Includes full installation, mounting, inverter, monitoring, and ${county.accreditation} certification.`,
      price: isNI ? "6000" : "4500",
    },
    {
      name: `Popular Solar Package (6kWp) — ${county.name}`,
      description: `14-panel solar PV system — the most popular choice for average homes in ${county.name}. Full installation with ${county.accreditation} registration included.`,
      price: isNI ? "7500" : "5500",
    },
    {
      name: `Premium Solar + Battery (8kWp) — ${county.name}`,
      description: `18-panel solar PV system with battery-ready design for larger homes in ${county.name}. Maximum output and energy independence.`,
      price: isNI ? "9000" : "6500",
    },
  ];

  return packages.map((pkg) =>
    generateProductSchema({
      ...pkg,
      priceCurrency: cur,
      aggregateRating: COMPANY_RATING,
      image: `${domain}/images/og-image.jpg`,
      seller: `Solar ${county.name}`,
    })
  );
}

// ---------------------------------------------------------------------------
// Convenience: Generate all service schemas for a county
// ---------------------------------------------------------------------------

export function generateCountyServiceSchemas(county: CountyData): object[] {
  const isNI = county.country === "GB";
  const domain = `https://${county.domain}`;
  const services = [
    {
      name: `Solar Panel Installation in ${county.name}`,
      description: `Professional solar panel installation in ${county.name}. ${county.accreditation} certified, 1-day install, full ${county.accreditation} registration included. From ${county.avgSystemCost}.`,
      serviceType: "Solar Panel Installation",
    },
    {
      name: `Commercial Solar Panels in ${county.name}`,
      description: `Commercial solar panel installation for businesses in ${county.name}. Reduce overheads with a tailored commercial solar system from Solar ${county.name}.`,
      serviceType: "Commercial Solar Panel Installation",
    },
    {
      name: `Agricultural Solar Panels in ${county.name}`,
      description: `Agricultural solar panel systems for farms in ${county.name}. Power milking parlours, grain stores, and more with free solar energy.`,
      serviceType: "Agricultural Solar Panel Installation",
    },
    {
      name: `Battery Storage in ${county.name}`,
      description: `Battery storage installation in ${county.name}. Store excess solar energy for evening use with systems from GivEnergy, Tesla Powerwall, and FoxESS.`,
      serviceType: "Battery Storage Installation",
    },
    {
      name: `EV Charger Installation in ${county.name}`,
      description: `Home EV charge point installation in ${county.name}. Charge your electric vehicle using free solar-generated electricity.`,
      serviceType: "EV Charger Installation",
    },
    {
      name: `Solar Panel Maintenance in ${county.name}`,
      description: `Professional solar panel maintenance and servicing in ${county.name}. Panel cleaning, electrical safety checks, and performance verification.`,
      serviceType: "Solar Panel Maintenance",
    },
  ];

  return services.map((svc) =>
    generateServiceSchema({
      ...svc,
      url: domain,
      areaServedName: county.name,
      country: county.country,
    })
  );
}

// ---------------------------------------------------------------------------
// Convenience: Generate the HowTo schema for a county
// ---------------------------------------------------------------------------

export function generateCountyHowToSchema(county: CountyData): object {
  const isNI = county.country === "GB";
  const domain = `https://${county.domain}`;

  return generateHowToSchema({
    name: `How to Get Solar Panels Installed in ${county.name}`,
    description: `A step-by-step guide to getting solar panels installed on your ${county.name} home with Solar ${county.name}, from initial enquiry to commissioning.`,
    totalTime: "P2W",
    estimatedCost: {
      currency: isNI ? "GBP" : "EUR",
      value: isNI ? "6000-9000" : "4500-6500",
    },
    steps: [
      {
        position: 1,
        name: "Upload Your Bill",
        text: `Upload your electricity bill to receive an instant system recommendation and savings estimate for your ${county.name} home. This helps us understand your energy usage and recommend the optimal system size.`,
        url: `${domain}/#calculator`,
      },
      {
        position: 2,
        name: "Free Site Survey",
        text: `Our ${county.accreditation}-certified surveyor visits your ${county.name} property to assess roof orientation, shading, structural integrity, and electrical infrastructure. We use satellite imagery and on-site measurements to design the optimal layout.`,
        url: `${domain}/#process`,
      },
      {
        position: 3,
        name: "Custom Design",
        text: `We create a custom system design with a detailed proposal including expected generation, savings calculations, ROI timeline, and a transparent fixed price for your ${county.name} property.`,
      },
      {
        position: 4,
        name: `${isNI ? "SEG" : "Grant"} Application`,
        text: `Solar ${county.name} handles the full ${isNI ? "Smart Export Guarantee" : "grant"} application on your behalf. We submit all documentation and manage the process from start to finish.`,
      },
      {
        position: 5,
        name: "1-Day Install",
        text: `Our certified installation team completes your solar panel installation in ${county.name} in a single day. This includes scaffolding, panel mounting, inverter installation, electrical connection, and system commissioning.`,
      },
    ],
    tools: [
      "Solar Panel System",
      "Inverter",
      "Mounting System",
      "Monitoring System",
    ],
    supplies: [
      "Tier 1 Solar Panels",
      "Premium Inverter",
      "Roof Mounting Kit",
      "Monitoring Equipment",
    ],
  });
}

// ---------------------------------------------------------------------------
// Convenience: Generate the county-specific HowTo for a service page
// ---------------------------------------------------------------------------

export function generateServiceHowToSchema(
  county: CountyData,
  serviceTitle: string,
  serviceSlug: string
): object {
  const domain = `https://${county.domain}`;
  const isNI = county.country === "GB";

  return generateHowToSchema({
    name: `How to Get ${serviceTitle} in ${county.name}`,
    description: `Step-by-step guide to getting ${serviceTitle} installed on your ${county.name} property with Solar ${county.name}.`,
    totalTime: "P3W",
    estimatedCost: {
      currency: isNI ? "GBP" : "EUR",
      value: isNI ? "6000-9000" : "4500-6500",
    },
    steps: [
      {
        position: 1,
        name: "Free Site Survey",
        text: `Our ${county.accreditation}-certified surveyor visits your ${county.name} property to assess roof condition, orientation, shading, and your energy requirements.`,
        url: `${domain}/${serviceSlug}#process`,
      },
      {
        position: 2,
        name: "Custom Design",
        text: `We design a system tailored to your ${county.name} property and energy goals, using premium tier-1 panels and equipment.`,
        url: `${domain}/${serviceSlug}#process`,
      },
      {
        position: 3,
        name: "Professional Installation",
        text: `Our ${county.accreditation} certified engineers install your ${serviceTitle.toLowerCase()} system in ${county.name}, typically in one working day for residential properties.`,
        url: `${domain}/${serviceSlug}#process`,
      },
      {
        position: 4,
        name: "Commissioning & Handover",
        text: `We register your system with ${county.accreditation} and set up monitoring so you can track generation in real time from your ${county.name} home.`,
      },
    ],
    tools: [serviceTitle + " Equipment", "Inverter", "Mounting System", "Monitoring System"],
    supplies: ["Tier 1 Solar Panels", "Premium Inverter", "Roof Mounting Kit", "Monitoring Equipment"],
  });
}
