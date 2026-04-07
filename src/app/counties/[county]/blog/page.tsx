import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCounty, countySlugs } from "@/data/counties";
import {
  getPostsByCounty,
  getCountySpecificPosts,
  blogCategories,
} from "@/data/blog-posts";
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
} from "@/lib/jsonld";
import styles from "./page.module.css";
import sharedStyles from "../page.module.css";
import TopBar from "@/components/county/TopBar";
import CountyNav from "@/components/county/CountyNav";
import Footer from "@/components/county/Footer";

type Props = {
  params: Promise<{ county: string }>;
  searchParams: Promise<{ page?: string; category?: string }>;
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

const POSTS_PER_PAGE = 12;

export default async function BlogPage({ params, searchParams }: Props) {
  const { county: slug } = await params;
  const { page: pageParam, category: categoryParam } = await searchParams;
  const county = getCounty(slug);
  if (!county) notFound();

  // Get all posts relevant to this county
  const allPosts = getPostsByCounty(county.slug);

  // Filter by category
  const activeCategory = categoryParam || "all";
  const filteredPosts =
    activeCategory === "all"
      ? allPosts
      : allPosts.filter((p) => p.category === activeCategory);

  // Pagination
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10));
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Featured post (latest county-specific)
  const countyPosts = getCountySpecificPosts(county.slug);
  const featuredPost = countyPosts[0] || allPosts[0];

  const domain = `https://${county.domain}`;
  const blogUrl = `${domain}/blog`;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://renewableireland.ie/" },
    { name: county.name, url: `${domain}/` },
    { name: "Blog", url: blogUrl },
  ]);

  const collectionSchema = generateCollectionPageSchema({
    name: `Solar Energy News & Guides — Solar ${county.name}`,
    description: `Expert solar energy advice, installation guides, grant information, and cost-saving tips for homeowners in ${county.name}.`,
    url: blogUrl,
    about: `Solar Energy in ${county.name}`,
  });

  function formatDate(isoDate: string): string {
    const d = new Date(isoDate);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function getCategoryLabel(cat: string): string {
    const found = blogCategories.find((c) => c.slug === cat);
    return found ? found.label : cat;
  }

  return (
    <div className={sharedStyles.countySite}>
      <a href="#main-content" className={sharedStyles.skipLink}>
        Skip to main content
      </a>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <TopBar phone={county.phone} email={county.email} accreditation={county.accreditation} />
      <CountyNav countyName={county.name} countySlug={county.slug} />

      {/* Hero */}
      <header className={styles.blogHero} id="main-content" role="banner" aria-labelledby="blog-heading">
        <div className="container">
          <h1 id="blog-heading" className={sharedStyles.headingH1}>
            Solar Energy News &amp; Guides
          </h1>
          <p className={sharedStyles.heroSubtitle}>
            Expert advice, installation guides, and the latest solar energy news for homeowners and businesses in {county.name}.
          </p>
        </div>
      </header>

      <section className={styles.blogPage} aria-labelledby="blog-articles-heading">
        <div className="container">
          {/* Featured Post */}
          {featuredPost && currentPage === 1 && activeCategory === "all" && (
            <article className={styles.featuredPost}>
              <div className={styles.featuredImage}>
                <span className={styles.featuredCategory}>{getCategoryLabel(featuredPost.category)}</span>
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(225,6,0,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </div>
              <div className={styles.featuredContent}>
                <div className={styles.featuredMeta}>
                  <span>{formatDate(featuredPost.datePublished)}</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <h2 className={styles.featuredTitle}>
                  <a href={`/counties/${county.slug}/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </a>
                </h2>
                <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
                <a href={`/counties/${county.slug}/blog/${featuredPost.slug}`} className={styles.featuredReadMore}>
                  Read Article
                  <svg className={styles.readMoreArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </article>
          )}

          <h2 id="blog-articles-heading" className={sharedStyles.headingH2} style={{ textAlign: "center", marginBottom: 8 }}>
            Latest Articles
          </h2>

          {/* Category Filters */}
          <nav className={styles.categoryFilters} aria-label="Filter articles by category">
            {blogCategories.map((cat) => {
              const isActive = activeCategory === cat.slug;
              const count =
                cat.slug === "all"
                  ? allPosts.length
                  : allPosts.filter((p) => p.category === cat.slug).length;
              const href = `/counties/${county.slug}/blog?category=${cat.slug}`;
              return (
                <a
                  key={cat.slug}
                  href={href}
                  className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {cat.label}
                  <span className={styles.filterCount}>{count}</span>
                </a>
              );
            })}
          </nav>

          {/* Blog Grid */}
          <div className={styles.blogGrid}>
            {paginatedPosts.map((post) => (
              <article key={post.slug} className={styles.blogCard}>
                <div className={styles.blogCardImage}>
                  <span className={styles.blogCardCategory}>
                    {getCategoryLabel(post.category)}
                  </span>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                      {formatDate(post.datePublished)}
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className={styles.blogCardTitle}>
                    <a href={`/counties/${county.slug}/blog/${post.slug}`}>
                      {post.title}
                    </a>
                  </h3>
                  <p className={styles.blogCardExcerpt}>{post.excerpt}</p>
                  <a href={`/counties/${county.slug}/blog/${post.slug}`} className={styles.blogCardReadMore}>
                    Read Article
                    <svg className={styles.blogCardReadMoreArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {paginatedPosts.length === 0 && (
            <p className={styles.noResults}>No articles found in this category.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className={styles.pagination} aria-label="Blog pagination">
              {currentPage > 1 && (
                <a
                  href={`/counties/${county.slug}/blog?page=${currentPage - 1}${activeCategory !== "all" ? `&category=${activeCategory}` : ""}`}
                  className={styles.pageBtn}
                  aria-label="Previous page"
                >
                  ← Previous
                </a>
              )}
              <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <a
                    key={p}
                    href={`/counties/${county.slug}/blog?page=${p}${activeCategory !== "all" ? `&category=${activeCategory}` : ""}`}
                    className={`${styles.pageBtn} ${p === currentPage ? styles.pageBtnActive : ""}`}
                    aria-label={`Page ${p}`}
                    aria-current={p === currentPage ? "page" : undefined}
                  >
                    {p}
                  </a>
                ))}
              </div>
              {currentPage < totalPages && (
                <a
                  href={`/counties/${county.slug}/blog?page=${currentPage + 1}${activeCategory !== "all" ? `&category=${activeCategory}` : ""}`}
                  className={styles.pageBtn}
                  aria-label="Next page"
                >
                  Next →
                </a>
              )}
            </nav>
          )}

          {/* CTA */}
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
