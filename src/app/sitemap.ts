import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  // Only publish URLs that belong to the active Renewable Ireland site. County
  // templates represent future franchise work and must not be offered to search
  // engines as independent local businesses before their evidence exists.
  return [
    {
      url: "https://renewableireland.ie/",
      lastModified: new Date("2026-08-29T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://renewableireland.ie/solar-grant-ireland",
      lastModified: new Date("2026-08-29T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
