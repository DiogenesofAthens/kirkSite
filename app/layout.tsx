import type React from "react"
import { Suspense } from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { LINKS } from "@/lib/projects"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

const title = "Kirk Wessman — Solutions Engineer, Enterprise AI Systems"
const description =
  "Customer-facing solutions engineer for enterprise AI systems: discovery, architecture, evals, and security review. Based in Los Angeles."

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kirk Wessman",
  url: "https://kirkwessman.com",
  jobTitle: "Solutions Engineer",
  description:
    "Customer-facing solutions engineer for enterprise AI systems: discovery, architecture, evals, and security review.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    addressCountry: "US",
  },
  sameAs: [LINKS.github, LINKS.linkedin],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://kirkwessman.com"),
  title: { default: title, template: "%s — Kirk Wessman" },
  description,
  authors: [{ name: "Kirk Wessman", url: "https://kirkwessman.com" }],
  icons: { icon: { url: "/images/favicon.svg", type: "image/svg+xml" } },
  openGraph: {
    title,
    description,
    url: "https://kirkwessman.com",
    siteName: "Kirk Wessman",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
  // The site has its own dark theme; ask the Dark Reader extension not to repaint it.
  other: { "darkreader-lock": "true" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ScrollToTop />
          <SiteNav />
          <main className="px-6 sm:px-8">
            <div className="mx-auto max-w-3xl">{children}</div>
          </main>
          <SiteFooter />
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
