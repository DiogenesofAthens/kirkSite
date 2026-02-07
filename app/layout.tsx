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
  title: "Kirk Wessman — Solutions Engineer & Technical Leader",
  description:
    "Customer-facing technical leader specializing in designing, prototyping, and deploying complex API- and data-driven systems. Based in Santa Monica, CA.",
  keywords:
    "solutions engineer, technical leader, API, data platforms, enterprise, CPQ, CLM, AI, Santa Monica",
  authors: [{ name: "Kirk Wessman" }],
  openGraph: {
    title: "Kirk Wessman — Solutions Engineer & Technical Leader",
    description:
      "Translating ambiguous requirements into production-grade solutions through close collaboration with product, engineering, and executive stakeholders.",
    url: "https://kirkwessman.com",
    siteName: "Kirk Wessman",
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
