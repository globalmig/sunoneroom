import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/inquiry/"],
    },
    sitemap: "https://sunoneroom.com/sitemap.xml",
  };
}
