import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/next"
import { Chatbot } from "@/components/chatbot"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { MatrixProvider } from "@/components/matrix-provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kirk Wessman",
  url: "https://kirkwessman.com",
  jobTitle: "Solutions Engineer",
  description:
    "Customer-facing technical leader specializing in designing, prototyping, and deploying complex API- and data-driven systems.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santa Monica",
    addressRegion: "CA",
    addressCountry: "US",
  },
  sameAs: [
    "https://github.com/DiogenesofAthens",
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://kirkwessman.com"),
  title: "Kirk Wessman — Solutions Engineer & Technical Leader",
  description:
    "Customer-facing technical leader specializing in designing, prototyping, and deploying complex API- and data-driven systems. Based in Santa Monica, CA.",
  keywords:
    "solutions engineer, technical leader, API, data platforms, enterprise, CPQ, CLM, AI, Santa Monica",
  authors: [{ name: "Kirk Wessman", url: "https://kirkwessman.com" }],
  openGraph: {
    title: "Kirk Wessman — Solutions Engineer & Technical Leader",
    description:
      "Translating ambiguous requirements into production-grade solutions through close collaboration with product, engineering, and executive stakeholders.",
    url: "https://kirkwessman.com",
    siteName: "Kirk Wessman",
    type: "website",
    images: [
      {
        url: "/images/kirk_wessman.jpg",
        width: 1200,
        height: 630,
        alt: "Kirk Wessman — Solutions Engineer & Technical Leader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kirk Wessman — Solutions Engineer & Technical Leader",
    description:
      "Translating ambiguous requirements into production-grade solutions through close collaboration with product, engineering, and executive stakeholders.",
    images: ["/images/kirk_wessman.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MatrixProvider>
            <ScrollToTop />
            {children}
            <Suspense fallback={null}>
              <Chatbot />
            </Suspense>
            <Toaster />
            <Analytics />
          </MatrixProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
