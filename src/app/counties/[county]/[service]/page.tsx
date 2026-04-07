import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCounty, countySlugs, getService, services } from "@/data/counties";
import {
  generateServiceSchema,
  generateHowToSchema,
  generateBreadcrumbSchema,
  generateReviewSchema,
  generateOfferCatalogSchema,
} from "@/lib/jsonld";
import styles from "../page.module.css";
import CountyNav from "@/components/county/CountyNav";
import Footer from "@/components/county/Footer";

const ROI_PRICE_LOW = "4500";
const ROI_PRICE_HIGH = "6500";
const NI_PRICE_LOW = "6000";
const NI_PRICE_HIGH = "9000";

type Props = {
  params: Promise<{ county: string; service: string }>;
};

export async function generateStaticParams() {
  const params: Array<{ county: string; service: string }> = [];
  for (const countySlug of countySlugs) {
    for (const service of services) {
      params.push({ county: countySlug, service: service.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { county: countySlug, service: serviceSlug } = await params;
  const county = getCounty(countySlug);
  const service = getService(serviceSlug);
  if (!county || !service) return {};

  const title = `${service.title} in ${county.name} | Solar ${county.name}`;
  const description = `Professional ${service.title.toLowerCase()} in ${county.name}. ${county.accreditation} certified installers. Get your free quote for ${service.title.toLowerCase()} in ${county.name} today.`;
  const url = `https://${county.domain}/${serviceSlug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: `Solar ${county.name}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { county: countySlug, service: serviceSlug } = await params;
  const county = getCounty(countySlug);
  const service = getService(serviceSlug);
  if (!county || !service) notFound();

  // Generate JSON-LD schemas
  const isNI = county.country === "GB";
  const domain = `https://${county.domain}`;
  const serviceUrl = `${domain}/${serviceSlug}`;
  const cur = isNI ? "GBP" : "EUR";

  // Service schema with OfferCatalog
  const serviceSchema = generateServiceSchema({
    name: `${service.title} in ${county.name}`,
    description: service.longDescription,
    serviceType: service.title,
    url: serviceUrl,
    areaServedName: county.name,
    country: county.country,
    lowPrice: isNI ? NI_PRICE_LOW : ROI_PRICE_LOW,
    highPrice: isNI ? NI_PRICE_HIGH : ROI_PRICE_HIGH,
    priceCurrency: cur,
  });

  // HowTo schema for this specific service
  const howToSchema = generateHowToSchema({
    name: `How to Get ${service.title} in ${county.name}`,
    description: `Step-by-step guide to getting ${service.title} installed on your ${county.name} property with Solar ${county.name}.`,
    totalTime: "P3W",
    estimatedCost: {
      currency: cur,
      value: isNI ? "6000-9000" : "4500-6500",
    },
    steps: [
      {
        position: 1,
        name: "Free Site Survey",
        text: `Our ${county.accreditation}-certified surveyor visits your ${county.name} property to assess roof condition, orientation, shading, and your energy requirements.`,
        url: `${serviceUrl}#process`,
      },
      {
        position: 2,
        name: "Custom Design",
        text: `We design a system tailored to your ${county.name} property and energy goals, using premium tier-1 panels and equipment.`,
        url: `${serviceUrl}#process`,
      },
      {
        position: 3,
        name: "Professional Installation",
        text: `Our ${county.accreditation} certified engineers install your ${service.title.toLowerCase()} system in ${county.name}, typically in one working day.`,
        url: `${serviceUrl}#process`,
      },
      {
        position: 4,
        name: "Commissioning & Handover",
        text: `We register your system with ${county.accreditation} and set up monitoring so you can track generation in real time.`,
      },
    ],
    tools: [service.title + " Equipment", "Inverter", "Mounting System", "Monitoring System"],
    supplies: ["Tier 1 Solar Panels", "Premium Inverter", "Roof Mounting Kit", "Monitoring Equipment"],
  });

  // Breadcrumb schema: Home → County → Service
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://renewableireland.ie/" },
    { name: county.name, url: `${domain}/` },
    { name: service.title, url: serviceUrl },
  ]);

  // Review schema from county testimonials
  let reviewSchema: object | null = null;
  if (county.testimonials.length >= 2) {
    const avgRating =
      county.testimonials.reduce((sum, t) => sum + t.rating, 0) /
      county.testimonials.length;
    reviewSchema = generateReviewSchema({
      itemName: `Solar ${county.name}`,
      itemUrl: serviceUrl,
      reviews: county.testimonials.slice(0, 5).map((t) => ({
        author: t.name,
        rating: t.rating,
        text: t.text,
        location: t.location,
      })),
      aggregateRating: {
        ratingValue: avgRating.toFixed(1),
        reviewCount: String(county.testimonials.length),
      },
    });
  }

  // Per-county accent CSS custom properties are set by the parent layout

  return (
    <div className={styles.countySite}>
      {/* Skip link */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {reviewSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      )}

      {/* Navigation */}
      <CountyNav
        countyName={county.name}
        countySlug={county.slug}
        phone={county.phone}
      />

      {/* Service Page Hero */}
      <header
        className={styles.servicePageHero}
        id="main-content"
        role="banner"
        aria-labelledby="service-page-heading"
      >
        <div className="container">
          <h1 id="service-page-heading" style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-1px",
            color: "var(--white)",
            marginBottom: 16,
            lineHeight: 1.15,
          }}>
            {service.title} in{" "}
            <span style={{ color: "var(--accent)" }}>{county.name}</span>
          </h1>
          <p style={{
            color: "rgba(255,255,255,.55)",
            maxWidth: 700,
            fontSize: "1.15rem",
            lineHeight: 1.8,
            marginBottom: 32,
          }}>
            {service.shortDescription}
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href={`tel:${county.phone.replace(/[^+\d]/g, "")}`} className={`${styles.btn} ${styles.btnPrimary}`}>
              Get a Free Quote
            </a>
            <a href={`/counties/${county.slug}`} className={`${styles.btn} ${styles.btnSecondary}`}>
              Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* Service Content */}
      <section className={styles.servicePage} aria-labelledby="service-content-heading">
        <div className="container">
          <div className={styles.servicePageContent}>
            <h2 id="service-content-heading">
              Expert {service.title} Across {county.name}
            </h2>
            <p>
              {service.longDescription}
            </p>
            <p>
              We serve the entire {county.name} area including{" "}
              {county.areaTowns.slice(0, 4).join(", ")}, and surrounding
              communities. Whether you&apos;re a homeowner looking to reduce
              electricity bills, a business owner aiming to cut overheads, or a
              farmer seeking to power operations more cost-effectively, our{" "}
              {county.accreditation} certified team has the experience and
              expertise to deliver the right {service.title.toLowerCase()}{" "}
              solution for your needs.
            </p>
            <p>
              With over 500 installations completed across {county.name} and
              the wider region, we understand the unique characteristics of
              local properties — from roof orientations and shading patterns
              to the specific energy profiles of {county.name} homes and
              businesses. Every system we design is tailored to your property,
              not a generic template.
            </p>

            <h3>
              What&apos;s Included with Every {service.title} Installation
            </h3>
            <ul className={styles.servicePageFeatures}>
              {service.features.map((feature, i) => (
                <li key={i}>
                  <svg className={styles.servicePageFeatureIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <h3>
              How Much Does {service.title} Cost in {county.name}?
            </h3>
            <p>
              The cost of {service.title.toLowerCase()} in {county.name}{" "}
              depends on your specific requirements — system size, panel type,
              inverter choice, roof complexity, and whether you add battery
              storage. A typical residential solar system in {county.name}{" "}
              costs between {county.avgSystemCost}, with{" "}
              {county.grants.length > 0
                ? `available grants such as ${county.grants[0]} potentially reducing this further`
                : "potential savings through energy export payments"}
              .
            </p>
            <p>
              We provide a comprehensive, no-obligation quote after a free
              site survey. There are no hidden costs — our quotes include
              scaffolding, all materials, installation, commissioning, and
              registration with {county.accreditation}.
            </p>

            <h3>
              Our {service.title} Installation Process
            </h3>
            <p>
              Getting {service.title.toLowerCase()} installed on your{" "}
              {county.name} property is straightforward with Solar{" "}
              {county.name}. Here&apos;s how it works:
            </p>
            <ol className={styles.servicePageFeatures}>
              <li>
                <svg className={styles.servicePageFeatureIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
                <span>
                  <strong>Free Site Survey</strong> — We visit your{" "}
                  {county.name} property to assess roof condition, orientation,
                  shading, and your energy requirements.
                </span>
              </li>
              <li>
                <svg className={styles.servicePageFeatureIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
                <span>
                  <strong>Custom Design</strong> — We design a system tailored
                  to your property and energy goals, using premium tier-1
                  panels and equipment.
                </span>
              </li>
              <li>
                <svg className={styles.servicePageFeatureIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
                <span>
                  <strong>Professional Installation</strong> — Our{" "}
                  {county.accreditation} certified engineers install your
                  system, typically in one working day for residential
                  properties.
                </span>
              </li>
              <li>
                <svg className={styles.servicePageFeatureIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
                <span>
                  <strong>Commissioning &amp; Handover</strong> — We register
                  your system with {county.accreditation} and set up monitoring
                  so you can track generation in real time.
                </span>
              </li>
            </ol>

            <div className={styles.servicePageCTA}>
              <h2>
                Ready to Get Started with {service.title} in {county.name}?
              </h2>
              <p>
                Upload your electricity bill or call us for a free, no-obligation
                quote. We&apos;ll show you exactly how much you could save.
              </p>
              <a href={`tel:${county.phone.replace(/[^+\d]/g, "")}`} className={`${styles.btn} ${styles.btnPrimary}`}>
                Call {county.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer county={county} />
    </div>
  );
}
