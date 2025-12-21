import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/next"
import { Chatbot } from "@/components/chatbot"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { MatrixProvider } from "@/components/matrix-provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Grant Glazer - Business Technology & Process Consultant",
  description:
    "Business Technology & Process Consultant specializing in sales optimization, technology solutions, and operational excellence. Based in San Francisco Bay Area.",
  keywords:
    "business consultant, technology consultant, sales consultant, SaaS, enterprise solutions, San Francisco Bay Area",
  authors: [{ name: "Grant Glazer" }],
  openGraph: {
    title: "Grant Glazer - Business Technology & Process Consultant",
    description:
      "Helping organizations drive revenue through strategic technology solutions, sales optimization, and operational excellence.",
    url: "https://grantglazer.com",
    siteName: "Grant Glazer",
    type: "website",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/g-logo.png" type="image/png" />
        {/* You can add other <meta> or <link> tags here if needed */}
      </head>
      <body className={inter.className}>
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
