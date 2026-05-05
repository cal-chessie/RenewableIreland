import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCounty, countySlugs } from "@/data/counties";
import { getPostBySlug, getRelatedPosts, allBlogPosts, blogCategories } from "@/data/blog-posts";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/jsonld";
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
    const slugs = allBlogPosts
      .filter((p) => !p.county || p.county === countySlug)
      .map((p) => p.slug);
    for (const s of slugs) {
      params.push({ county: countySlug, slug: s });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { county: countySlug, slug: articleSlug } = await params;
  const county = getCounty(countySlug);
  if (!county) return {};

  const post = getPostBySlug(articleSlug);
  if (!post) return {};

  const url = `https://${county.domain}/blog/${articleSlug}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      siteName: `Solar ${county.name}`,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

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

function extractHeadings(html: string): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /<h([23])>([^<]+)<\/h[23]>/g;
  const headings: Array<{ id: string; text: string; level: number }> = [];
  let match;
  let counter = 0;
  while ((match = headingRegex.exec(html)) !== null) {
    counter++;
    const text = match[2].trim();
    const id = `section-${counter}`;
    // We'll add the id to the HTML later
    headings.push({ id, text, level: parseInt(match[1]) });
  }
  return headings;
}

function addHeadingIds(html: string): string {
  let counter = 0;
  return html.replace(/<h([23])(>)/g, (_match, level, close) => {
    counter++;
    return `<h${level} id="section-${counter}"${close}`;
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const { county: countySlug, slug: articleSlug } = await params;
  const county = getCounty(countySlug);
  if (!county) notFound();

  const post = getPostBySlug(articleSlug);

  if (!post) {
    return (
      <div className={sharedStyles.countySite}>
        <a href="#main-content" className={sharedStyles.skipLink}>
          Skip to main content
        </a>
        <TopBar phone={county.phone} email={county.email} accreditation={county.accreditation} />
        <CountyNav countyName={county.name} countySlug={county.slug} />

        <header className={styles.articleHero} id="main-content" role="banner">
          <div className="container">
            <h1 className={sharedStyles.headingH1}>
              Article Not Found
            </h1>
          </div>
        </header>

        <section className={styles.comingSoon} aria-labelledby="not-found-heading">
          <h2 id="not-found-heading" className={sharedStyles.headingH2}>
            This Article Doesn&apos;t Exist
          </h2>
          <p>
            The article you&apos;re looking for doesn&apos;t exist. Browse our other guides or get in touch for a free solar quote.
          </p>
          <a href={`/counties/${county.slug}/blog`} className={sharedStyles.btnPrimary}>
            Back to All Articles
          </a>
        </section>

        <Footer county={county} />
      </div>
    );
  }

  // Process content: add heading IDs
  const processedContent = addHeadingIds(post.content);
  const headings = extractHeadings(processedContent);

  const pageUrl = `https://${county.domain}/blog/${articleSlug}`;
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(post.title);

  // Related posts
  const relatedPosts = getRelatedPosts(post, county.slug, 3);

  // JSON-LD schemas
  const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.metaDescription,
    url: pageUrl,
    image: `https://${county.domain}${post.image}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: post.author,
    publisherName: `Solar ${county.name}`,
    publisherUrl: `https://${county.domain}`,
    wordCount: Math.floor(post.content.length / 6),
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://renewableireland.ie/" },
    { name: county.name, url: `https://${county.domain}/` },
    { name: "Blog", url: `https://${county.domain}/blog` },
    { name: post.title, url: pageUrl },
  ]);

  const faqSchemas = post.faqs
    ? [generateFAQSchema(post.faqs)]
    : [];

  return (
    <div className={sharedStyles.countySite}>
      <a href="#main-content" className={sharedStyles.skipLink}>
        Skip to main content
      </a>
      <TopBar phone={county.phone} email={county.email} accreditation={county.accreditation} />
      <CountyNav countyName={county.name} countySlug={county.slug} />

      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <div className="container">
          <ol className={styles.breadcrumbList}>
            <li><a href={`https://renewableireland.ie/`}>Home</a></li>
            <li><a href={`https://${county.domain}/`}>{county.name}</a></li>
            <li><a href={`/counties/${county.slug}/blog`}>Blog</a></li>
            <li aria-current="page"><span>{post.title}</span></li>
          </ol>
        </div>
      </nav>

      {/* Article Hero */}
      <header className={styles.articleHero} id="main-content" role="banner" aria-labelledby="article-heading">
        <div className="container">
          <a href={`/counties/${county.slug}/blog`} className={styles.backToBlog}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="16" height="16">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Blog
          </a>
          <span className={styles.articleCategory}>{getCategoryLabel(post.category)}</span>
          <div className={styles.articleMeta}>
            <span className={styles.articleMetaAuthor}>{post.author}</span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" width="14" height="14">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {formatDate(post.datePublished)}
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" width="14" height="14">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {post.readTime}
            </span>
          </div>
          <h1 id="article-heading" className={sharedStyles.headingH1}>
            {post.title}
          </h1>
        </div>
      </header>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className={styles.articlePage} aria-labelledby="article-content-heading">
        <div className="container">
          <div className={styles.articleLayout}>
            {/* Table of Contents (Sidebar) */}
            {headings.length > 0 && (
              <aside className={styles.toc} aria-label="Table of contents">
                <h3>Table of Contents</h3>
                <ol>
                  {headings.map((heading, i) => (
                    <li key={i} className={heading.level === 3 ? styles.tocSubItem : ""}>
                      <a href={`#${heading.id}`}>{heading.text}</a>
                    </li>
                  ))}
                </ol>
              </aside>
            )}

            {/* Article Body */}
            <main className={styles.articleBody} id="article-content-heading">
              <h2 className={sharedStyles.headingH2} style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)" }}>
                Article Content
              </h2>
              <div
                className={styles.articleContent}
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* FAQ Section */}
              {post.faqs && post.faqs.length > 0 && (
                <div className={styles.faqSection}>
                  <h2 className={sharedStyles.headingH2}>Frequently Asked Questions</h2>
                  <div className={styles.faqList}>
                    {post.faqs.map((faq, i) => (
                      <details key={i} className={styles.faqItem}>
                        <summary className={styles.faqQuestion}>
                          {faq.question}
                          <svg className={styles.faqIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="20" height="20">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <polyline points="19 12 12 19 5 12" />
                          </svg>
                        </summary>
                        <div className={styles.faqAnswer}>
                          <p>{faq.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Sharing */}
              <div className={styles.shareBar}>
                <span className={styles.shareLabel}>Share this article:</span>
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
            </main>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className={styles.relatedSection}>
              <h2 className={sharedStyles.headingH2}>Related Articles</h2>
              <div className={styles.relatedGrid}>
                {relatedPosts.map((rp) => (
                  <article key={rp.slug} className={styles.relatedCard}>
                    <span className={styles.relatedCategory}>{getCategoryLabel(rp.category)}</span>
                    <h3 className={styles.relatedCardTitle}>
                      <a href={`/counties/${county.slug}/blog/${rp.slug}`}>
                        {rp.title}
                      </a>
                    </h3>
                    <p className={styles.relatedCardExcerpt}>{rp.excerpt}</p>
                    <span className={styles.relatedCardMeta}>
                      {formatDate(rp.datePublished)} · {rp.readTime}
                    </span>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className={styles.articleCta}>
            <h2 className={sharedStyles.headingH2}>Ready to Switch to Solar?</h2>
            <p>Get a free, no-obligation quote for solar panels in {county.name}. Our experts will show you exactly how much you could save.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
              <a href={`tel:${county.phone}`} className={sharedStyles.btnPrimary}>
                Call {county.phone}
              </a>
              <a href={`/counties/${county.slug}`} className={sharedStyles.btnSecondary} style={{ color: "var(--white)", borderColor: "rgba(255,255,255,0.3)" }}>
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
