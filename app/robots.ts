import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://karim-universe.vercel.app"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/family/admin/", "/family/analytics/", "/family/subscription/", "/api/", "/auth/check-email"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
