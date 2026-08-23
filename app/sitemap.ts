import type { MetadataRoute } from "next";

// Single-page site, so the sitemap is one entry. Keep the origin in step with
// `siteUrl` in layout.tsx if the production domain ever changes.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.pilatesgremlin.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
