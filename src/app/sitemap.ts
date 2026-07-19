import { MetadataRoute } from "next";
import { counties, services } from "@/data/counties";
import { allBlogPosts } from "@/data/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const entries: MetadataRoute.Sitemap = [];

  // 1. Main site
  entries.push({
    url: "https://renewableireland.ie/",
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  // 1b. Top-level tools
  entries.push({
    url: "https://renewableireland.ie/roi-calculator",
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  });
  entries.push({
    url: "https://renewableireland.ie/referral",
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  // 2. All county homepages
  for (const county of Object.values(counties)) {
    entries.push({
      url: `https://${county.domain}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // 3. All service sub-pages per county (192 total)
  for (const county of Object.values(counties)) {
    for (const service of services) {
      entries.push({
        url: `https://${county.domain}/${service.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // 4. All privacy policy pages
  for (const county of Object.values(counties)) {
    entries.push({
      url: `https://${county.domain}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    });
  }

  // 5. All terms pages
  for (const county of Object.values(counties)) {
    entries.push({
      url: `https://${county.domain}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    });
  }

  // 6. All blog index pages
  for (const county of Object.values(counties)) {
    entries.push({
      url: `https://${county.domain}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // 7. All blog article pages per county
  for (const county of Object.values(counties)) {
    for (const post of allBlogPosts) {
      // Only include posts relevant to this county (county-specific + general)
      if (!post.county || post.county === county.slug) {
        entries.push({
          url: `https://${county.domain}/blog/${post.slug}`,
          lastModified: post.dateModified,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
