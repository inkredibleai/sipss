import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { Layout } from "@/components/layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sunrise Edu Group - Leading Educational Institution in Sikar, Rajasthan",
  description:
    "Sunrise Edu Group offers quality education with excellent academic programs, experienced faculty, and modern facilities in Sikar, Rajasthan.",
  keywords:
    "Sunrise Edu Group, education, school, college, Sikar, Rajasthan, academic excellence, IIT coaching, NEET preparation",
  openGraph: {
    title: "Sunrise Edu Group - Leading Educational Institution in Sikar, Rajasthan",
    description:
      "Sunrise Edu Group offers quality education with excellent academic programs, experienced faculty, and modern facilities in Sikar, Rajasthan.",
    url: "https://www.sunriseedu.com",
    siteName: "Sunrise Edu Group",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunrise Edu Group - Leading Educational Institution in Sikar, Rajasthan",
    description:
      "Sunrise Edu Group offers quality education with excellent academic programs, experienced faculty, and modern facilities in Sikar, Rajasthan.",
  },
  alternates: {
    canonical: "https://www.sunriseedu.com",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Sunrise Edu Group",
              url: "https://www.sunriseedu.com",
              logo: "https://www.sunriseedu.com/logo.png",
              sameAs: [
                "https://www.facebook.com/sunriseedugroup",
                "https://twitter.com/sunriseedugroup",
                "https://www.instagram.com/sunriseedugroup",
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Necchwa",
                addressLocality: "Sikar",
                addressRegion: "Rajasthan",
                postalCode: "332001",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "27.6094",
                longitude: "75.1398",
              },
              telephone: "+91-98765-43210",
              email: "info@sunriseedu.com",
            }),
          }}
        />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
