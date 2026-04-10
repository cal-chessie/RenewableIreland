import { notFound } from "next/navigation";
import { getCounty, countySlugs } from "@/data/counties";
import {
  generateServiceSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateProductSchema,
  generateBreadcrumbSchema,
  generateReviewSchema,
} from "@/lib/jsonld";
import styles from "./page.module.css";
import CountyNav from "@/components/county/CountyNav";
import Hero from "@/components/county/Hero";
import BillUpload from "@/components/county/BillUpload";
import Services from "@/components/county/Services";
import TrustSection from "@/components/county/TrustSection";
import Testimonials from "@/components/county/Testimonials";
import FAQ from "@/components/county/FAQ";
import FinalCTA from "@/components/county/FinalCTA";
import Footer from "@/components/county/Footer";
import CalculatorClient from "@/components/county/CalculatorClient";
import ScrollReveal from "@/components/county/ScrollReveal";
import { getPostsByCounty } from "@/data/blog-posts";

type Props = {
  params: Promise<{ county: string }>;
};

export async function generateStaticParams() {
  return countySlugs.map((slug) => ({ county: slug }));
}

function generateLocalBusinessSchema(county: ReturnType<typeof getCounty>) {
  if (!county) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ElectricalContractor",
    name: `Renewable ${county.name}`,
    description: `${county.accreditation} accredited solar panel installers serving ${county.name}`,
    url: `https://${county.domain}`,
    telephone: county.phone,
    email: county.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: county.mainTown,
      addressRegion: county.name,
      addressCountry: county.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: county.lat,
      longitude: county.lng,
    },
    areaServed: county.areaTowns.map((town) => ({
      "@type": "AdministrativeArea",
      name: town,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
    priceRange: county.country === "GB" ? "££" : "€€",
    image: `https://${county.domain}/images/og-image.jpg`,
    sameAs: [],
  };
}

function generateCountyFAQSchema(county: ReturnType<typeof getCounty>) {
  if (!county) return null;
  return generateFAQSchema(
    county.faqs.map((f) => ({ question: f.question, answer: f.answer }))
  );
}

function generateCountyReviewSchema(county: ReturnType<typeof getCounty>) {
  if (!county || county.testimonials.length < 3) return null;
  const avgRating =
    county.testimonials.reduce((sum, t) => sum + t.rating, 0) /
    county.testimonials.length;
  return generateReviewSchema({
    itemName: `Renewable ${county.name}`,
    itemUrl: `https://${county.domain}`,
    reviews: county.testimonials.map((t) => ({
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

function generateCountyServiceSchemas(county: ReturnType<typeof getCounty>) {
  if (!county) return [];
  const domain = `https://${county.domain}`;
  const isNI = county.country === "GB";
  const services = [
    {
      name: `Solar Panel Installation in ${county.name}`,
      description: `Professional solar panel installation in ${county.name}. ${county.accreditation} certified, 1-day install, from ${county.avgSystemCost}.`,
      serviceType: "Solar Panel Installation",
    },
    {
      name: `Commercial Solar Panels in ${county.name}`,
      description: `Commercial solar panel installation for businesses in ${county.name}. Reduce overheads with tailored commercial solar from Renewable ${county.name}.`,
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

function generateCountyHowToSchema(county: ReturnType<typeof getCounty>) {
  if (!county) return null;
  const isNI = county.country === "GB";
  const domain = `https://${county.domain}`;
  return generateHowToSchema({
    name: `How to Get Solar Panels Installed in ${county.name}`,
    description: `A step-by-step guide to getting solar panels installed on your ${county.name} home with Renewable ${county.name}.`,
    totalTime: "P2W",
    estimatedCost: {
      currency: isNI ? "GBP" : "EUR",
      value: isNI ? "6000-9000" : "4500-6500",
    },
    steps: [
      {
        position: 1,
        name: "Upload Your Bill",
        text: `Upload your electricity bill to receive an instant system recommendation and savings estimate for your ${county.name} home.`,
        url: `${domain}/#calculator`,
      },
      {
        position: 2,
        name: "Free Site Survey",
        text: `Our ${county.accreditation}-certified surveyor visits your ${county.name} property to assess roof orientation, shading, and electrical infrastructure.`,
        url: `${domain}/#process`,
      },
      {
        position: 3,
        name: "Custom Design",
        text: `We create a custom system design with 3D roof renderings, expected output, and a transparent fixed price for your ${county.name} property.`,
      },
      {
        position: 4,
        name: `${isNI ? "Grid Connection" : "Grant"} Application`,
        text: `Renewable ${county.name} handles the full ${isNI ? "grid connection and energy supplier registration" : "grant"} application on your behalf — no paperwork hassle.`,
      },
      {
        position: 5,
        name: "1-Day Install",
        text: `Our certified team installs your complete system in ${county.name} in a single day and commissions it on the spot.`,
      },
    ],
    tools: ["Solar Panel System", "Inverter", "Mounting System", "Monitoring System"],
    supplies: ["Tier 1 Solar Panels", "Premium Inverter", "Roof Mounting Kit", "Monitoring Equipment"],
  });
}

function generateCountyProductSchemas(county: ReturnType<typeof getCounty>) {
  if (!county) return [];
  const isNI = county.country === "GB";
  const cur = isNI ? "GBP" : "EUR";
  const domain = `https://${county.domain}`;
  const packages = [
    {
      name: `Essential Solar Package (4kWp) — ${county.name}`,
      description: `10-panel solar PV system ideal for smaller homes in ${county.name}. Full installation, mounting, inverter, monitoring, and ${county.accreditation} certification.`,
      price: isNI ? "6000" : "4500",
    },
    {
      name: `Popular Solar Package (6kWp) — ${county.name}`,
      description: `14-panel solar PV system — the most popular choice for average homes in ${county.name}. Full installation with ${county.accreditation} registration.`,
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
      aggregateRating: { ratingValue: "4.9", reviewCount: "2847" },
      image: `${domain}/images/og-image.jpg`,
      seller: `Renewable ${county.name}`,
    })
  );
}

function generateCountyBreadcrumbSchema(county: ReturnType<typeof getCounty>) {
  if (!county) return null;
  return generateBreadcrumbSchema([
    { name: "Home", url: "https://renewableireland.ie/" },
    { name: county.name, url: `https://${county.domain}/` },
    { name: `Solar Panels ${county.name}`, url: `https://${county.domain}/` },
  ]);
}

export default async function CountyHomePage({ params }: Props) {
  const { county: slug } = await params;
  const county = getCounty(slug);
  if (!county) notFound();

  const localBusinessSchema = generateLocalBusinessSchema(county);
  const faqSchema = generateCountyFAQSchema(county);
  const reviewSchema = generateCountyReviewSchema(county);
  const serviceSchemas = generateCountyServiceSchemas(county);
  const howToSchema = generateCountyHowToSchema(county);
  const productSchemas = generateCountyProductSchemas(county);
  const breadcrumbSchema = generateCountyBreadcrumbSchema(county);

  const isNI = county.country === "GB";
  const cur = isNI ? "£" : "€";
  const statInstallations = "500+";
  const statRating = "5★";
  const statPayback = county.avgPaybackYears || "6–8 Years";
  const statInstall = "1 Day";

  // Get latest blog posts for this county
  const latestPosts = getPostsByCounty(county.slug).slice(0, 3);

  return (
    <div className={styles.countySite}>
      {/* Skip link */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      {/* JSON-LD Structured Data */}
      {localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      )}
      {serviceSchemas.map((schema, i) => (
        <script
          key={`service-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema),
          }}
        />
      )}
      {productSchemas.map((schema, i) => (
        <script
          key={`product-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      {reviewSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(reviewSchema),
          }}
        />
      )}

      {/* Scroll Reveal Observer */}
      <ScrollReveal />

      {/* Navigation */}
      <CountyNav
        countyName={county.name}
        countySlug={county.slug}
        phone={county.phone}
      />

      {/* Hero */}
      <Hero
        countyName={county.name}
        countySlug={county.slug}
        subtitle={county.heroSubtitle}
        heroTitle={county.heroTitle}
        phone={county.phone}
        accreditation={county.accreditation}
      />

      {/* Stats Bar */}
      <div className={styles.statsBar} aria-label="Company statistics">
        <div className={styles.statItem}>
          <div className={styles.statNumber} aria-label="500 plus installations">{statInstallations}</div>
          <div className={styles.statLabel}>Installations Complete</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber} aria-label="5 out of 5 star rating">{statRating}</div>
          <div className={styles.statLabel}>Customer Rating</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber} aria-label={`${statPayback} payback`}>{statPayback}</div>
          <div className={styles.statLabel}>Average Payback</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber} aria-label="1-day installation">{statInstall}</div>
          <div className={styles.statLabel}>Typical Install Time</div>
        </div>
      </div>

      {/* Services / Features Grid */}
      <Services countyName={county.name} countySlug={county.slug} />

      {/* 5-Step Process */}
      <section className={`${styles.section} ${styles.processSection} reveal`} id="process" aria-labelledby="process-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>How It Works</div>
            <h2 id="process-heading">Your Solar Journey in 5 Simple Steps</h2>
            <p>From first enquiry to generating your own clean energy — we make the entire process effortless.</p>
          </div>
          <div className={styles.processSteps}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber} aria-hidden="true">1</div>
              <h3>Upload Your Bill</h3>
              <p>Upload your electricity bill for an instant system recommendation and savings estimate.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber} aria-hidden="true">2</div>
              <h3>Free Site Survey</h3>
              <p>Our {county.accreditation}-certified surveyor visits your home to assess roof space, orientation, and electrical setup.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber} aria-hidden="true">3</div>
              <h3>Custom Design</h3>
              <p>Receive a tailored system design with 3D roof renderings, expected output, and a transparent fixed price.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber} aria-hidden="true">4</div>
              <h3>{isNI ? "Grid Connection" : "Grant"} Application</h3>
              <p>We handle the full {isNI ? "grid connection and energy supplier registration" : "grant"} application on your behalf — no paperwork hassle.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber} aria-hidden="true">5</div>
              <h3>1-Day Install</h3>
              <p>Our certified team installs your complete system in a single day and commissions it on the spot.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grant Section */}
      <section className={`${styles.section} ${styles.grantSection} reveal`} id="grant" aria-labelledby="grant-heading">
        <div className="container">
          <div className={styles.grantGrid}>
            <div>
              <div className={styles.sectionLabel}>Government Support</div>
              <h2 id="grant-heading" className={styles.grantSectionTitle}>
                {isNI
                  ? "Solar Savings for Northern Ireland"
                  : `Understanding the ${county.accreditation} Grant for Solar Panels`}
              </h2>
              <p className={styles.grantSectionText}>
                {isNI
                  ? `Solar panels are one of the smartest investments for Northern Ireland homeowners. With electricity prices continuing to rise, a well-designed solar PV system in ${county.name} can reduce your annual electricity bills by up to 70%. Combined with falling installation costs and panel lifetimes of 25+ years, solar delivers exceptional long-term value.`
                  : `The ${county.accreditation} offers generous grants for solar photovoltaic panel installations. This covers everything you need to know about eligibility, the application process, and how we make it completely hassle-free.`}
              </p>
              <div className={styles.grantDetails}>
                <div className={styles.grantDetail}>
                  <div className={styles.grantCheck} aria-hidden="true">&#10003;</div>
                  <p><strong>Bill Savings:</strong> {isNI
                    ? "Reduce your electricity bills by up to 70% with a properly sized solar system. A typical 4kW system saves £800–£1,200 per year, with greater savings for larger systems or properties with high daytime energy use."
                    : `Generous government grants available for solar PV installations. The grant covers systems of various sizes.`}</p>
                </div>
                <div className={styles.grantDetail}>
                  <div className={styles.grantCheck} aria-hidden="true">&#10003;</div>
                  <p><strong>Eligibility:</strong> {isNI
                    ? "Solar panels are suitable for most homes with a south, east, or west facing roof. We carry out a free survey to confirm your property's suitability. Must use an MCS-certified installer."
                    : "Available to homeowners whose property meets the age and eligibility requirements. You must use a registered installer."}</p>
                </div>
                <div className={styles.grantDetail}>
                  <div className={styles.grantCheck} aria-hidden="true">&#10003;</div>
                  <p><strong>Application Process:</strong> {isNI
                    ? `Renewable ${county.name} handles everything — from the initial survey and system design to scaffolding, installation, and grid connection registration. We manage all the paperwork so you don't have to.`
                    : `We handle the entire application process on your behalf. We submit all documentation and manage communication — you simply provide your details.`}</p>
                </div>
                <div className={styles.grantDetail}>
                  <div className={styles.grantCheck} aria-hidden="true">&#10003;</div>
                  <p><strong>Additional Savings:</strong> {isNI
                    ? "Combined with self-consumption savings, a typical 6kWp system in Northern Ireland can save £800-£1,400 per year on electricity bills."
                    : "Beyond the grant, you'll save on electricity bills and can earn additional income from exporting excess energy to the grid."}</p>
                </div>
              </div>
            </div>
            <div className={styles.grantAmountWrap}>
              <div className={styles.grantAmount}>
                {isNI ? "£800+" : "€1,800"}<span> {isNI ? "Annual Savings" : "Government Grant"}</span>
              </div>
              <p className={styles.grantAmountSubtext}>
                {isNI
                  ? "Typical annual savings for a 6kWp solar system in Northern Ireland. Plus export earnings on top."
                  : "Deducted directly from your installation cost. No waiting, no paperwork, no hassle."}
              </p>
              <a href="#contact" className={`${styles.btn} ${styles.btnPrimary}`}>
                Check Your Eligibility
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bill Upload */}
      <BillUpload countyName={county.name} countySlug={county.slug} />

      {/* Calculator */}
      <section className={`${styles.section} ${styles.calculatorSection} reveal`} id="calculator" aria-labelledby="calculator-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>Estimate Your Savings</div>
            <h2 id="calculator-heading">Solar Savings Calculator</h2>
            <p>Get an instant estimate of how much you could save with solar panels based on your home and energy usage.</p>
          </div>
          <CalculatorClient isNI={isNI} countyName={county.name} />
        </div>
      </section>

      {/* Cost Section */}
      <section className={`${styles.section} ${styles.costSection} reveal`} id="cost" aria-labelledby="cost-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>Transparent Pricing</div>
            <h2 id="cost-heading">
              How Much Do Solar Panels Cost in {county.name}?
            </h2>
            <p>A detailed, honest breakdown of solar panel costs and real ROI calculations.</p>
          </div>
          <div className={styles.contentGrid}>
            <div>
              <p>
                Solar panel costs have fallen dramatically over the past decade, making residential solar energy more accessible than ever.
                At Renewable {county.name}, we believe in complete pricing transparency.
              </p>
              <h3>Our Pricing</h3>
              <p>
                {isNI
                  ? "Our Essential 4kWp package starts at £6,000, perfect for smaller homes. The Popular 6kWp package at £7,500 is our most popular option, ideal for the average Northern Ireland 3-bedroom home. Our Premium 8kWp system with battery-ready design is £9,000, suited for larger homes with higher energy demands. All prices include full installation, mounting, inverter, monitoring system, commissioning, and MCS certification."
                  : `Our systems start from €4,500 after grant. A typical 6kWp system costs €5,500, ideal for a 3-bedroom home. Our premium 8kWp system with battery-ready design is €6,500. All prices include full installation, mounting, inverter, monitoring, and grant handling.`}
              </p>
              <h3>Factors Affecting Your Price</h3>
              <p>
                Your final price depends on several factors: roof complexity (pitch, accessibility, and material),
                whether you choose a battery storage add-on, the type of inverter, whether your electrical panel needs upgrading,
                and scaffolding requirements. We assess all these factors during the free site survey and provide a single, fixed price.
              </p>
              <h3>Return on Investment</h3>
              <p>
                {isNI
                  ? "With annual savings of £800 to £1,400 and system lifetimes of 25 to 30 years, solar panels represent an exceptional investment. At a 6kWp system cost of £7,500 and annual savings of £1,100, the payback period is approximately 6-8 years. Over 25 years, total savings amount to approximately £27,500."
                  : "With annual savings of €800 to €1,400 and system lifetimes of 25+ years, solar panels are an exceptional investment. Most homeowners achieve full payback within 5-7 years, with net savings of €22,000+ over 25 years."}
              </p>
            </div>
            <aside className={styles.contentSidebar} aria-label="Pricing overview">
              <div className={styles.sidebarItem}>
                <strong>{isNI ? "£6,000" : "€4,500"}</strong>
                <span>{isNI ? "4kWp Essential Package" : "4kWp Essential Package"}</span>
              </div>
              <div className={styles.sidebarItem}>
                <strong>{isNI ? "£7,500" : "€5,500"}</strong>
                <span>{isNI ? "6kWp Popular Package" : "6kWp Popular Package"}</span>
              </div>
              <div className={styles.sidebarItem}>
                <strong>{isNI ? "£9,000" : "€6,500"}</strong>
                <span>{isNI ? "8kWp Premium Package" : "8kWp Premium Package"}</span>
              </div>
              <div className={styles.sidebarItem}>
                <strong>{isNI ? "6–8 Years" : "5–7 Years"}</strong>
                <span>Typical payback period</span>
              </div>
              <div className={styles.sidebarItem}>
                <strong>{isNI ? "£22,000+" : "€22,000+"}</strong>
                <span>Net return over 25 years</span>
              </div>
              <div className={styles.sidebarItem}>
                <strong>£0</strong>
                <span>Hidden fees — guaranteed</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Trust / Why Us */}
      <TrustSection
        countyName={county.name}
        accreditation={county.accreditation}
        currency={county.currency}
        avgPaybackYears={county.avgPaybackYears}
      />

      {/* Testimonials */}
      <Testimonials
        testimonials={county.testimonials}
        countyName={county.name}
      />

      {/* Latest Blog Posts */}
      {latestPosts.length > 0 && (
        <section className={styles.section} id="blog" aria-labelledby="blog-heading">
          <div className="container">
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>Solar Energy News & Guides</div>
              <h2 id="blog-heading">Latest Articles for {county.name}</h2>
              <p>Expert advice, installation guides, and solar energy news for homeowners in County {county.name}.</p>
            </div>
            <div className={styles.blogTeaserGrid}>
              {latestPosts.map((post) => (
                <article key={post.slug} className={styles.blogTeaserCard}>
                  <div className={styles.blogTeaserCardBody}>
                    <span className={styles.blogTeaserCategory}>
                      {post.category === "county-savings" ? "County Savings" :
                       post.category === "grants" ? "Grants" :
                       post.category === "seasonal" ? "Seasonal" :
                       post.category === "customer-stories" ? "Customer Stories" : "Technical"}
                    </span>
                    <h3 className={styles.blogTeaserTitle}>
                      <a href={`/counties/${county.slug}/blog/${post.slug}`}>
                        {post.title}
                      </a>
                    </h3>
                    <p className={styles.blogTeaserExcerpt}>
                      {post.excerpt.length > 120 ? post.excerpt.slice(0, 120) + "..." : post.excerpt}
                    </p>
                    <div className={styles.blogTeaserMeta}>
                      <span>{post.readTime}</span>
                      <span>·</span>
                      <span>{new Date(post.datePublished).toLocaleDateString("en-IE", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className={styles.blogTeaserLink}>
              <a href={`/counties/${county.slug}/blog`} className={`${styles.btn} ${styles.btnSecondary}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                View All Articles
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQ faqs={county.faqs} countyName={county.name} />

      {/* Final CTA */}
      <FinalCTA countyName={county.name} phone={county.phone} />

      {/* Footer */}
      <Footer county={county} />
    </div>
  );
}
