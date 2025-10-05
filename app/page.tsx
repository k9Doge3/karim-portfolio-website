import HomePageClient from "./HomePageClient"

export const metadata = {
  title: "Karim Youssef - CPA Candidate & Technology Entrepreneur | KY Group",
  description: "Professional portfolio of Karim Youssef, CPA candidate and technology entrepreneur. Founder of KY Group and co-owner of Wildrose Painters. Expertise in accounting, business management, and digital innovation.",
  keywords: "Karim Youssef, CPA candidate, accountant, entrepreneur, KY Group, Wildrose Painters, financial reporting, business consulting, web development",
  author: "Karim Youssef",
  openGraph: {
    title: "Karim Youssef - CPA Candidate & Technology Entrepreneur",
    description: "Professional portfolio showcasing expertise in accounting, business management, and technology innovation.",
    type: "website",
    url: "https://kygroup.ca",
    images: [
      {
        url: "/kygroup-logo.png",
        width: 1200,
        height: 630,
        alt: "KY Group Logo",
      },
    ],
  },
}

export default function HomePage() {
  return <HomePageClient />
}
