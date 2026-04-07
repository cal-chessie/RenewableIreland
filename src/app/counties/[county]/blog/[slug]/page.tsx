import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCounty, countySlugs } from "@/data/counties";
import styles from "./page.module.css";
import sharedStyles from "../../page.module.css";
import TopBar from "@/components/county/TopBar";
import CountyNav from "@/components/county/CountyNav";
import Footer from "@/components/county/Footer";

type Props = {
  params: Promise<{ county: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: Array<{ county: string; slug: string }> = [];
  for (const countySlug of countySlugs) {
    params.push({ county: countySlug, slug: `solar-panels-${countySlug}-guide` });
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { county: countySlug, slug: articleSlug } = await params;
  const county = getCounty(countySlug);
  if (!county) return {};

  const isLive = articleSlug === `solar-panels-${countySlug}-guide`;
  const title = isLive
    ? `The Complete Guide to Solar Panels in ${county.name} | Solar ${county.name}`
    : `Solar Energy Guide | Solar ${county.name}`;
  const description = isLive
    ? `Everything you need to know about solar panels in ${county.name}. Costs, savings, grants, installation process, and expert advice from Solar ${county.name}.`
    : `Solar energy guides and advice from Solar ${county.name}.`;
  const url = `https://${county.domain}/blog/${articleSlug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: `Solar ${county.name}`,
      publishedTime: "2025-01-15T00:00:00+00:00",
      authors: [`Solar ${county.name}`],
      tags: ["solar panels", county.name, "renewable energy", "solar installation"],
    },
  };
}

function getArticleContent(county: { name: string; slug: string; mainTown: string; areaTowns: string[]; country: string; currency: string; accreditation: string; avgSystemCost: string; avgPaybackYears: string; grants: string[] }, articleSlug: string) {
  if (articleSlug !== `solar-panels-${county.slug}-guide`) {
    return null;
  }

  const townList = county.areaTowns.slice(0, 3).join(", ");
  const isNI = county.country === "GB";

  return {
    title: `The Complete Guide to Solar Panels in ${county.name}`,
    category: "Installation Guides",
    date: "15 January 2025",
    readTime: "8 min read",
    author: `Solar ${county.name} Team`,
    headings: [
      "Why Solar Panels Are a Smart Investment in " + county.name,
      "How Much Do Solar Panels Cost in " + county.name + "?",
      "Available Grants and Financial Incentives",
      "Does Solar Work in " + county.name + "'s Climate?",
      "The Installation Process: What to Expect",
      "How Much Could You Save?",
      "Choosing the Right Solar System Size",
      "Battery Storage: Should You Add One?",
      "Getting Started with Solar " + county.name,
    ],
    content: (
      <>
        <p>
          Solar energy is transforming how households and businesses across County {county.name} generate and consume electricity. With rising energy costs, improved panel efficiency, and government-backed incentives, there has never been a better time to invest in solar panels. This comprehensive guide covers everything you need to know about going solar in {county.name} — from costs and savings to the installation process and available grants.
        </p>

        <h2 className={sharedStyles.headingH2}>
          Why Solar Panels Are a Smart Investment in {county.name}
        </h2>
        <p>
          The case for solar panels in County {county.name} has never been stronger. Electricity prices have risen significantly in recent years, making the prospect of generating your own clean energy increasingly attractive. A well-designed solar PV system can reduce your electricity bills by 60 to 80%, providing substantial annual savings that grow as energy prices continue to rise.
        </p>
        <p>
          Beyond the financial benefits, solar panels increase your property&apos;s value, reduce your carbon footprint, and provide a degree of energy independence. Homes with solar installations are increasingly attractive to buyers, with research suggesting a 4% premium on sale price for properties with solar panels. In a competitive property market, this can make a meaningful difference.
        </p>
        <blockquote>
          <p>
            A typical {county.name} household can expect to save {county.currency}500 to {county.currency}800 per year on electricity bills with a well-sized solar system, with a payback period of {county.avgPaybackYears}. After that, your electricity is essentially free for the remaining 20+ years of panel life.
          </p>
        </blockquote>

        <h2 className={sharedStyles.headingH2}>
          How Much Do Solar Panels Cost in {county.name}?
        </h2>
        <p>
          The cost of installing solar panels in {county.name} depends on several factors, including the system size, panel quality, inverter choice, roof complexity, and whether you opt for additional features like battery storage. Here are the typical price ranges you can expect:
        </p>
        <ul>
          <li><strong>3kW system</strong> (suitable for smaller homes): {county.currency}3,500 – {county.currency}5,500</li>
          <li><strong>4kW system</strong> (most popular for average homes): {county.avgSystemCost}</li>
          <li><strong>6kW system</strong> (larger homes or those with electric heating): {county.currency}7,000 – {county.currency}11,000</li>
          <li><strong>Battery storage addition</strong>: {county.currency}3,000 – {county.currency}6,000</li>
        </ul>
        <p>
          All prices from Solar {county.name} include scaffolding, all materials, {county.accreditation} certification, grid connection application, commissioning, and the monitoring app. There are no hidden costs. We provide a detailed written quotation after a free site survey, so you know exactly what you&apos;re paying for before you commit.
        </p>

        <h2 className={sharedStyles.headingH2}>
          Available Grants and Financial Incentives
        </h2>
        <p>
          {isNI
            ? "In Northern Ireland, while the feed-in tariff scheme has closed, the Smart Export Guarantee (SEG) requires energy suppliers to pay you for surplus electricity you export to the grid. Rates vary between suppliers but typically range from 1p to 7.5p per kWh. Additional support may be available through the Energy Company Obligation (ECO) scheme for qualifying households."
            : "The SEAI Domestic Solar PV Grant is one of the most generous government incentives available to Irish homeowners. You can receive up to €1,800 towards the cost of installing solar panels on your home, plus an additional €600 for battery storage. The grant is paid directly to your installer, reducing your upfront cost. Solar " + county.name + " handles the entire grant application process on your behalf."
          }
        </p>
        <p>
          {county.grants.length > 0 ? (
            <>Key incentives available in {county.name} include: {county.grants.join("; ")}.</>
          ) : (
            <>Contact our team for the latest information on available financial incentives in {county.name}.</>
          )}
        </p>

        <h2 className={sharedStyles.headingH2}>
          Does Solar Work in {county.name}&apos;s Climate?
        </h2>
        <p>
          This is one of the most common questions we hear, and the answer is a definitive yes. Solar panels generate electricity from daylight, not direct sunshine. Even on overcast days, your panels will produce a meaningful amount of electricity. County {county.name} receives approximately 1,000 to 1,200 kWh per square metre of solar radiation annually — roughly 65 to 75% of what southern Spain receives.
        </p>
        <p>
          Modern solar panel technology is remarkably efficient in diffuse light conditions. Premium tier-1 panels, which is all we install at Solar {county.name}, can generate 80% or more of their rated output even on cloudy days. The key factor is not the amount of sunshine but the total daylight hours, and {county.name} has more than enough to make solar a sound investment.
        </p>
        <p>
          In practical terms, a typical 4kW system in {county.name} will generate between 3,200 and 3,800 kWh per year — enough to cover a substantial portion of the average household&apos;s annual electricity consumption of approximately 4,200 kWh.
        </p>

        <h2 className={sharedStyles.headingH2}>
          The Installation Process: What to Expect
        </h2>
        <p>
          Getting solar panels installed on your {county.name} property with Solar {county.name} is a straightforward process designed to minimise disruption to your daily life. Here is what happens at each stage:
        </p>
        <ol>
          <li><strong>Free site survey</strong> — We visit your property in {townList} or elsewhere in {county.name} to assess your roof condition, orientation, shading, and electrical system. We also discuss your energy usage and goals.</li>
          <li><strong>Custom system design</strong> — Using data from the survey and satellite imagery, we design a system tailored to your roof and energy requirements. We use premium tier-1 panels and industry-leading inverters.</li>
          <li><strong>Written quotation</strong> — You receive a detailed, fixed-price quotation that includes everything — panels, inverter, scaffolding, installation, {county.accreditation} registration, and monitoring setup.</li>
          <li><strong>Scaffolding and installation</strong> — On the agreed date, our scaffolding team arrives first, followed by our {county.accreditation}-certified installation engineers. A standard residential installation is completed in one working day.</li>
          <li><strong>Commissioning and handover</strong> — We test your system, register it with {county.accreditation}, set up your monitoring app, and walk you through everything. You start generating free electricity immediately.</li>
        </ol>

        <h2 className={sharedStyles.headingH2}>
          How Much Could You Save?
        </h2>
        <p>
          Savings depend on your system size, energy consumption patterns, and whether you add battery storage. Here is what a typical {county.name} household can expect:
        </p>
        <ul>
          <li><strong>Electricity bill reduction:</strong> 60% to 80% for a well-sized system</li>
          <li><strong>Annual savings:</strong> {county.currency}500 to {county.currency}800 (without battery), {county.currency}700 to {county.currency}1,100 (with battery)</li>
          <li><strong>Export income:</strong> {county.currency}80 to {county.currency}200 per year from surplus energy</li>
          <li><strong>Payback period:</strong> {county.avgPaybackYears}</li>
          <li><strong>25-year savings:</strong> {county.currency}15,000 to {county.currency}30,000+ over the system&apos;s lifetime</li>
        </ul>
        <p>
          These figures are based on current electricity prices and are conservative estimates. As energy prices rise — and most forecasts suggest they will — your actual savings could be significantly higher. The earlier you install, the sooner you start saving and the more you benefit from future price increases.
        </p>

        <h2 className={sharedStyles.headingH2}>
          Choosing the Right Solar System Size
        </h2>
        <p>
          The right system size for your {county.name} home depends on several factors: your roof space, your current electricity consumption, your budget, and whether you want to add battery storage or an EV charger. Here is a general guide:
        </p>
        <ul>
          <li><strong>3kW system (8–10 panels):</strong> Suitable for smaller homes or single-person households with modest electricity usage.</li>
          <li><strong>4kW system (10–12 panels):</strong> The most popular choice for average family homes, providing an excellent balance of cost and output.</li>
          <li><strong>6kW system (14–16 panels):</strong> Ideal for larger homes, homes with electric heating, or properties with higher electricity consumption.</li>
        </ul>
        <p>
          During your free site survey, we will analyse your energy bills and recommend the optimal system size for your specific circumstances. We never oversell — we recommend the system that delivers the best return on investment for your property.
        </p>

        <h2 className={sharedStyles.headingH2}>
          Battery Storage: Should You Add One?
        </h2>
        <p>
          Without battery storage, any surplus solar energy generated during the day is exported to the grid, typically at a lower rate than you pay for importing electricity. A battery system stores this excess for use in the evening and overnight, when your solar panels are not generating.
        </p>
        <p>
          For most {county.name} households, adding a battery increases solar self-consumption from around 30–40% to 70–80% or more. This can add an additional {county.currency}200 to {county.currency}400 in annual savings compared to panels alone. Batteries also provide backup power during grid outages (on select models).
        </p>
        <p>
          At Solar {county.name}, we install batteries from leading manufacturers including GivEnergy, Tesla Powerwall, and FoxESS. All come with a 10-year warranty and can be added to a new solar installation or retrofitted to an existing system.
        </p>

        <h2 className={sharedStyles.headingH2}>
          Getting Started with Solar {county.name}
        </h2>
        <p>
          Ready to find out how much you could save with solar panels in {county.name}? The process starts with a free, no-obligation site survey. Our team will visit your property, assess your roof, analyse your energy usage, and provide a detailed recommendation with a fixed-price quotation.
        </p>
        <p>
          You can reach Solar {county.name} by calling <a href={`tel:${county.phone}`}>{county.phone}</a>, emailing <a href={`mailto:${county.email}`}>{county.email}</a>, or by filling in the contact form on our website. We serve the entire County {county.name} area, including {townList}, and surrounding areas.
        </p>
        <p>
          With over 500 installations completed across {county.name} and the wider region, {county.accreditation} certification, and comprehensive warranties, Solar {county.name} is the trusted local choice for solar energy. Get in touch today and take the first step towards lower energy bills and a greener future.
        </p>
      </>
    ),
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { county: countySlug, slug: articleSlug } = await params;
  const county = getCounty(countySlug);
  if (!county) notFound();

  const article = getArticleContent(county, articleSlug);

  if (!article) {
    return (
      <div className={sharedStyles.countySite}>
        <a href="#main-content" className={sharedStyles.skipLink}>
          Skip to main content
        </a>
        <TopBar phone={county.phone} email={county.email} accreditation={county.accreditation} />
        <CountyNav countyName={county.name} countySlug={county.slug} />

        <header className={styles.articleHero} id="main-content" role="banner">
          <div className="container">
            <h1 className={sharedStyles.headingH1} style={{ color: "var(--secondary-dark)" }}>
              Article Coming Soon
            </h1>
          </div>
        </header>

        <section className={styles.comingSoon} aria-labelledby="coming-soon-heading">
          <h2 id="coming-soon-heading" className={sharedStyles.headingH2}>
            This Article Is on the Way
          </h2>
          <p>
            We&apos;re working on this article and it will be published soon. In the meantime, check out our other guides or get in touch for a free solar quote.
          </p>
          <a href={`/counties/${county.slug}/blog`} className={sharedStyles.btnPrimary}>
            Back to All Articles
          </a>
        </section>

        <Footer county={county} />
      </div>
    );
  }

  const pageUrl = `https://${county.domain}/blog/${articleSlug}`;
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(article.title);

  // JSON-LD Article schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: `Everything you need to know about solar panels in ${county.name}. Expert guide by Solar ${county.name}.`,
    author: {
      "@type": "Organization",
      name: `Solar ${county.name}`,
      url: `https://${county.domain}`,
    },
    publisher: {
      "@type": "Organization",
      name: `Solar ${county.name}`,
      url: `https://${county.domain}`,
    },
    datePublished: "2025-01-15",
    dateModified: "2025-01-15",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    image: `https://${county.domain}/images/blog/solar-panels-${county.slug}-guide.jpg`,
  };

  return (
    <div className={sharedStyles.countySite}>
      <a href="#main-content" className={sharedStyles.skipLink}>
        Skip to main content
      </a>
      <TopBar phone={county.phone} email={county.email} accreditation={county.accreditation} />
      <CountyNav countyName={county.name} countySlug={county.slug} />

      <header className={styles.articleHero} id="main-content" role="banner" aria-labelledby="article-heading">
        <div className="container">
          <span className={styles.articleCategory}>{article.category}</span>
          <div className={styles.articleMeta}>
            <span className={styles.articleMetaAuthor}>{article.author}</span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {article.date}
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {article.readTime}
            </span>
          </div>
          <h1 id="article-heading" className={sharedStyles.headingH1} style={{ color: "var(--secondary-dark)" }}>
            {article.title}
          </h1>
        </div>
      </header>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className={styles.articlePage} aria-labelledby="article-content-heading">
        <div className="container">
          {/* Table of Contents */}
          <nav className={styles.toc} aria-label="Table of contents">
            <h3>Table of Contents</h3>
            <ol>
              {article.headings.map((heading, i) => (
                <li key={i}>
                  <a href={`#section-${i + 1}`}>{heading}</a>
                </li>
              ))}
            </ol>
          </nav>

          <h2 id="article-content-heading" className="srOnly" style={undefined}>
            Article Content
          </h2>

          <div className={styles.articleBody}>
            {article.headings.map((heading, i) => (
              <div key={i}>
                {i === 0 && (
                  <div>
                    {article.content}
                    <style>{`
                      .articleBody > div > h2:first-of-type { display: none; }
                    `}</style>
                  </div>
                )}
              </div>
            ))}

            {/* We render content directly */}
            {article.content}

            {/* Social Sharing */}
            <div className={styles.shareBar}>
              <span className={styles.shareLabel}>Share:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareButton}
                aria-label="Share on Facebook"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareButton}
                aria-label="Share on X (Twitter)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareButton}
                aria-label="Share on LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareButton}
                aria-label="Share on WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Related Articles */}
          <div className={styles.relatedSection}>
            <h2 className={sharedStyles.headingH2}>Related Articles</h2>
            <div className={styles.relatedGrid}>
              <div className={styles.relatedCard}>
                <h3 className={styles.relatedCardTitle}>
                  <a href={`/counties/${county.slug}/blog/seai-solar-grant-guide`}>
                    SEAI Solar PV Grants Explained: How to Claim Up to €1,800
                  </a>
                </h3>
                <p className={styles.relatedCardExcerpt}>
                  A step-by-step guide to applying for the SEAI Domestic Solar PV Grant. Learn about eligibility and the application process.
                </p>
                <span className={styles.relatedCardMeta}>Grants &amp; Funding · Coming Soon</span>
              </div>
              <div className={styles.relatedCard}>
                <h3 className={styles.relatedCardTitle}>
                  <a href={`/counties/${county.slug}/blog/battery-storage-vs-export`}>
                    Battery Storage vs Grid Export: What Makes Financial Sense?
                  </a>
                </h3>
                <p className={styles.relatedCardExcerpt}>
                  Should you store your surplus solar energy in a battery or export it to the grid? We compare the financial returns of both options.
                </p>
                <span className={styles.relatedCardMeta}>Cost &amp; Savings · Coming Soon</span>
              </div>
              <div className={styles.relatedCard}>
                <h3 className={styles.relatedCardTitle}>
                  <a href={`/counties/${county.slug}/blog/tier-1-solar-panels-explained`}>
                    Tier-1 Solar Panels: What They Are and Why They Matter
                  </a>
                </h3>
                <p className={styles.relatedCardExcerpt}>
                  Not all solar panels are created equal. We explain what tier-1 certification means and which brands we recommend.
                </p>
                <span className={styles.relatedCardMeta}>Technology · Coming Soon</span>
              </div>
              <div className={styles.relatedCard}>
                <h3 className={styles.relatedCardTitle}>
                  <a href={`/counties/${county.slug}/blog/solar-panel-savings-2025`}>
                    How Much Do Solar Panels Really Save in 2025?
                  </a>
                </h3>
                <p className={styles.relatedCardExcerpt}>
                  We break down the actual savings our customers are seeing in 2025, factoring in rising electricity prices and grant availability.
                </p>
                <span className={styles.relatedCardMeta}>Cost &amp; Savings · Coming Soon</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className={styles.articleCta}>
            <h2 className={sharedStyles.headingH2}>Ready to Go Solar in {county.name}?</h2>
            <p>Get a free, no-obligation quote for solar panels in {county.name}. Our experts will show you exactly how much you could save.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
              <a href={`tel:${county.phone}`} className={sharedStyles.btnPrimary}>
                Call {county.phone}
              </a>
              <a href={`/counties/${county.slug}`} className={sharedStyles.btnSecondary} style={{ color: "var(--support-white)", borderColor: "rgba(255,255,255,0.5)" }}>
                Back to Solar {county.name}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer county={county} />
    </div>
  );
}
