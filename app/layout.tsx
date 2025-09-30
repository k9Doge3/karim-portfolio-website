import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { Suspense } from "react"

import { Quicksand, Inter } from "next/font/google"

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
  preload: true,
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "Karim's Portfolio - Business Domains",
    template: "%s | Karim's Portfolio",
  },
  description: "Simple portfolio showcasing Karim's business domains and professional links.",
  keywords: ["Karim", "portfolio", "business", "domains", "entrepreneur", "developer"],
  authors: [{ name: "Karim" }],
  creator: "Karim",
  publisher: "Karim",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://karim-portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Karim's Portfolio - Business Domains",
    description: "Simple portfolio showcasing Karim's business domains and professional links.",
    siteName: "Karim's Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Karim's Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karim's Portfolio - Business Domains",
    description: "Simple portfolio showcasing Karim's business domains and professional links.",
    creator: "@karim",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f23" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${quicksand.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Karim",
              jobTitle: "Entrepreneur & Developer",
              description: "Passionate entrepreneur and developer building innovative solutions",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://karim-portfolio.vercel.app",
              sameAs: ["https://github.com/karim", "https://linkedin.com/in/karim", "https://twitter.com/karim"],
              knowsAbout: ["Web Development", "Entrepreneurship", "Digital Innovation", "Business Strategy"],
              alumniOf: "University",
              worksFor: {
                "@type": "Organization",
                name: "Karim's Digital Universe",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
