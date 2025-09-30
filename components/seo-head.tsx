import Head from "next/head"

interface SEOHeadProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  noindex?: boolean
}

export function SEOHead({ title, description, canonical, ogImage = "/og-image.jpg", noindex = false }: SEOHeadProps) {
  const siteTitle = "Karim's Digital Universe"
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const defaultDescription = "Professional portfolio, business hub, and interactive digital space by Karim"
  const metaDescription = description || defaultDescription
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://karim-universe.vercel.app"
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : baseUrl

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />

      {/* Additional SEO tags */}
      <meta name="author" content="Karim" />
      <meta name="theme-color" content="#0f0f23" />
    </Head>
  )
}
