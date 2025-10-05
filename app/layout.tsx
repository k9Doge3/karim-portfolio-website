import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from "@/components/google-analytics"
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
    default: "Karim Youssef - CPA Candidate & Technology Entrepreneur | KY Group",
    template: "%s | Karim Youssef",
  },
  description: "Professional portfolio of Karim Youssef, CPA candidate and technology entrepreneur. Founder of KY Group and co-owner of Wildrose Painters. Expertise in accounting, financial reporting, business management, and digital innovation.",
  keywords: ["Karim Youssef", "CPA Candidate", "Accountant", "Entrepreneur", "KY Group", "Wildrose Painters", "Financial Reporting", "Business Consulting", "Technology", "Web Development"],
  authors: [{ name: "Karim Youssef", url: "https://kygroup.ca" }],
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
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://kygroup.ca",
    title: "Karim Youssef - CPA Candidate & Technology Entrepreneur",
    description: "Professional portfolio showcasing expertise in accounting, business management, and technology innovation.",
    siteName: "KY Group",
    images: [
      {
        url: "/kygroup-logo.png",
        width: 1200,
        height: 630,
        alt: "KY Group - Karim Youssef Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karim Youssef - CPA Candidate & Technology Entrepreneur",
    description: "Professional portfolio showcasing expertise in accounting, business management, and technology innovation.",
    images: ["/kygroup-logo.png"],
  },
  icons: {
    icon: [
      { url: "/kygroup-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/kygroup-logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/kygroup-logo.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/kygroup-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
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
  generator: "KY Group Portfolio",
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
        
        {/* Favicon */}
        <link rel="icon" href="/kygroup-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/kygroup-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/kygroup-logo.png" />

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
        <GoogleAnalytics />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
