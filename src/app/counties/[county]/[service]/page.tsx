import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCounty, countySlugs, getService, services } from "@/data/counties";
import styles from "../page.module.css";
import TopBar from "@/components/county/TopBar";
import CountyNav from "@/components/county/CountyNav";
import BillUpload from "@/components/county/BillUpload";
import Footer from "@/components/county/Footer";

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

  return (
    <div className={styles.countySite}>
      {/* Skip link */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      {/* Top Bar */}
      <TopBar
        phone={county.phone}
        email={county.email}
        accreditation={county.accreditation}
      />

      {/* Navigation */}
      <CountyNav countyName={county.name} countySlug={county.slug} />

      {/* Service Page Hero */}
      <header
        className={styles.servicePageHero}
        id="main-content"
        role="banner"
        aria-labelledby="service-page-heading"
      >
        <div className="container">
          <h1 id="service-page-heading" className={styles.headingH1} style={{ color: "var(--secondary-dark)" }}>
            {service.title} in {county.name}
          </h1>
          <p className={styles.heroSubtitle} style={{ color: "var(--text-mid)", maxWidth: 700 }}>
            {service.shortDescription}
          </p>
        </div>
      </header>

      {/* Service Content */}
      <section className={styles.servicePage} aria-labelledby="service-content-heading">
        <div className="container">
          <div className={styles.servicePageContent}>
            <h2 id="service-content-heading" className={styles.headingH2}>
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

            <h2 className={styles.headingH2}>
              What&apos;s Included with Every {service.title} Installation
            </h2>
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

            <h2 className={styles.headingH2}>
              How Much Does {service.title} Cost in {county.name}?
            </h2>
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

            <h2 className={styles.headingH2}>
              Our {service.title} Installation Process
            </h2>
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
              <h2 className={styles.headingH2}>
                Ready to Get Started with {service.title} in {county.name}?
              </h2>
              <p>
                Upload your electricity bill or call us for a free, no-obligation
                quote. We&apos;ll show you exactly how much you could save.
              </p>
              <a href={`tel:${county.phone}`} className={styles.btnPrimary}>
                Call {county.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bill Upload CTA */}
      <BillUpload countyName={county.name} countySlug={county.slug} />

      {/* Footer */}
      <Footer county={county} />
    </div>
  );
}
