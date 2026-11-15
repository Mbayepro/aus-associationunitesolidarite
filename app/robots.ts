import { MetadataRoute } from "next";
import { content } from "@/data/content";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = content.meta.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
