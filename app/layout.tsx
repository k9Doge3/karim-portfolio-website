import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { Suspense } from "react"

import { Inter, JetBrains_Mono } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "Karim Youssef - Professional Portfolio",
    template: "%s | Karim Youssef",
  },
  description: "Professional portfolio of Karim Youssef, CPA Candidate and BComm Accounting graduate specializing in financial reporting, business operations, and modern technology solutions.",
  keywords: ["Karim Youssef", "CPA", "Accounting", "Finance", "Portfolio", "Professional", "Business", "KY Group"],
  authors: [{ name: "Karim Youssef" }],
  creator: "Karim Youssef",
  publisher: "KY Group",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kygroup.ca"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Karim Youssef - Professional Portfolio",
    description: "Professional portfolio of Karim Youssef, CPA Candidate and BComm Accounting graduate.",
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
  generator: "v0.app",
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
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
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
