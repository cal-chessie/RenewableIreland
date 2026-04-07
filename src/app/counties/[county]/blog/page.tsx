import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCounty, countySlugs } from "@/data/counties";
import styles from "./page.module.css";
import sharedStyles from "../page.module.css";
import TopBar from "@/components/county/TopBar";
import CountyNav from "@/components/county/CountyNav";
import Footer from "@/components/county/Footer";

type Props = {
  params: Promise<{ county: string }>;
};

export async function generateStaticParams() {
  return countySlugs.map((slug) => ({ county: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { county: slug } = await params;
  const county = getCounty(slug);
  if (!county) return {};

  const title = `Solar Energy News & Guides | Solar ${county.name}`;
  const description = `Expert solar energy advice, installation guides, grant information, and cost-saving tips for homeowners in ${county.name}. Stay informed with Solar ${county.name}.`;
  const url = `https://${county.domain}/blog`;

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

interface BlogArticle {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  published: boolean;
}

function getBlogArticles(countyName: string): BlogArticle[] {
  return [
    {
      title: `The Complete Guide to Solar Panels in ${countyName}`,
      slug: `solar-panels-${countyName.toLowerCase()}-guide`,
      excerpt: `Everything you need to know about installing solar panels in ${countyName} — costs, savings, grants, installation process, and how to choose the right system for your home.`,
      date: "15 January 2025",
      readTime: "8 min read",
      category: "Installation Guides",
      published: true,
    },
    {
      title: "SEAI Solar PV Grants Explained: How to Claim Up to €1,800",
      slug: "seai-solar-grant-guide",
      excerpt: "A step-by-step guide to applying for the SEAI Domestic Solar PV Grant. Learn about eligibility requirements, the application process, and how much you could receive.",
      date: "8 January 2025",
      readTime: "6 min read",
      category: "Grants & Funding",
      published: false,
    },
    {
      title: "Battery Storage vs Grid Export: What Makes Financial Sense?",
      slug: "battery-storage-vs-export",
      excerpt: "Should you store your surplus solar energy in a battery or export it to the grid? We compare the financial returns of both options using real data.",
      date: "2 January 2025",
      readTime: "7 min read",
      category: "Cost & Savings",
      published: false,
    },
    {
      title: "How Much Do Solar Panels Really Save in 2025?",
      slug: "solar-panel-savings-2025",
      excerpt: "We break down the actual savings our customers are seeing in 2025, factoring in rising electricity prices, Smart Export Guarantee rates, and grant availability.",
      date: "20 December 2024",
      readTime: "5 min read",
      category: "Cost & Savings",
      published: false,
    },
    {
      title: "Tier-1 Solar Panels: What They Are and Why They Matter",
      slug: "tier-1-solar-panels-explained",
      excerpt: "Not all solar panels are created equal. We explain what tier-1 certification means, why it matters for your investment, and which brands we recommend.",
      date: "12 December 2024",
      readTime: "6 min read",
      category: "Technology",
      published: false,
    },
    {
      title: "Solar Panel Installation: A Customer's Story from the Region",
      slug: "customer-installation-story",
      excerpt: "Follow one local family's journey from initial enquiry to installation day. See real photos, genuine savings figures, and hear about their experience.",
      date: "5 December 2024",
      readTime: "7 min read",
      category: "Case Studies",
      published: false,
    },
  ];
}

export default async function BlogPage({ params }: Props) {
  const { county: slug } = await params;
  const county = getCounty(slug);
  if (!county) notFound();

  const articles = getBlogArticles(county.name);

  return (
    <div className={sharedStyles.countySite}>
      <a href="#main-content" className={sharedStyles.skipLink}>
        Skip to main content
      </a>
      <TopBar phone={county.phone} email={county.email} accreditation={county.accreditation} />
      <CountyNav countyName={county.name} countySlug={county.slug} />

      <header className={styles.blogHero} id="main-content" role="banner" aria-labelledby="blog-heading">
        <div className="container">
          <h1 id="blog-heading" className={sharedStyles.headingH1} style={{ color: "var(--secondary-dark)" }}>
            Solar Energy News &amp; Guides
          </h1>
          <p className={sharedStyles.heroSubtitle} style={{ color: "var(--text-mid)", maxWidth: 600 }}>
            Expert advice, installation guides, and the latest solar energy news for homeowners and businesses in {county.name}.
          </p>
        </div>
      </header>

      <section className={styles.blogPage} aria-labelledby="blog-articles-heading">
        <div className="container">
          <h2 id="blog-articles-heading" className={sharedStyles.headingH2} style={{ textAlign: "center", marginBottom: 8 }}>
            Latest Articles
          </h2>
          <p className={styles.blogIntro}>
            Stay up to date with the latest in solar energy technology, grants, cost-saving strategies, and installation advice from our team of certified experts.
          </p>

          <div className={styles.blogGrid}>
            {articles.map((article) => (
              <article key={article.slug} className={styles.blogCard}>
                <div className={styles.blogCardImage}>
                  <span className={styles.blogCardCategory}>{article.category}</span>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <div className={styles.blogCardContent}>
                  <div className={styles.blogCardMeta}>
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
                  <h3 className={styles.blogCardTitle}>
                    {article.published ? (
                      <a href={`/counties/${county.slug}/blog/${article.slug}`}>{article.title}</a>
                    ) : (
                      article.title
                    )}
                  </h3>
                  <p className={styles.blogCardExcerpt}>{article.excerpt}</p>
                  {article.published ? (
                    <a href={`/counties/${county.slug}/blog/${article.slug}`} className={styles.blogCardReadMore}>
                      Read Article
                      <svg className={styles.blogCardReadMoreArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  ) : (
                    <span className={styles.blogComingSoonBadge}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      Coming Soon
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className={styles.blogCtaSection}>
            <h2 className={sharedStyles.headingH2}>Ready to Go Solar?</h2>
            <p>Get a free, no-obligation quote for solar panels in {county.name}. Our experts will show you exactly how much you could save.</p>
            <a href={`tel:${county.phone}`} className={sharedStyles.btnPrimary}>
              Call {county.phone}
            </a>
          </div>
        </div>
      </section>

      <Footer county={county} />
    </div>
  );
}
