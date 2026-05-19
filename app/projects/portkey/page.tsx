"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ContactModal } from "@/components/contact-modal"
import { useState } from "react"
import { Github } from "lucide-react"

export default function Portkey() {
  const [showContactForm, setShowContactForm] = useState(false)

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 pb-20 relative">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Hero */}
          <div className="mb-16">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">
              Project
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-normal tracking-tight text-foreground mb-6">
              PortKey
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
              A mortgage portability neobank prototype. When a homeowner sells and buys, PortKey lets them carry their existing low-rate mortgage to the new property — instead of refinancing at today&apos;s rates. Your rate moves with you.
            </p>
            <div className="flex flex-wrap gap-6">
              <a
                href="https://portkey-one.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                View Live Demo
              </a>
              <a
                href="https://github.com/DiogenesofAthens/portkey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-muted-foreground border-b border-muted-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </div>

          <div className="border-t border-border" />

          {/* Tech Stack */}
          <section className="py-16">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-10">
              Tech Stack
            </h2>
            <div className="space-y-10">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Next.js 14
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  App Router with TypeScript throughout — server components for layout and metadata, client components for interactive calculator and application flows.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Recharts
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Savings visualizations and rate comparison charts that make the financial case for portability legible at a glance — key for an investor demo context.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  shadcn/ui + Tailwind CSS
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Accessible component primitives styled with Tailwind — rapid iteration on UI without sacrificing polish or keyboard accessibility.
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-border" />

          {/* Key Features */}
          <section className="py-16">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-10">
              Key Features
            </h2>
            <div className="space-y-10">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Rate Portability Calculator
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Models the blended monthly payment across the carried mortgage and a gap loan at current market rates — showing homeowners exactly what they&apos;d save versus a full refinance.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Three-Persona Dashboard
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  A single app surfaces three distinct views: consumer portal for homeowners, loan officer workflow for lenders, and an admin marketplace overview for internal stakeholders and investors.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Investor Demo Ready
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Fully interactive with realistic financial modeling and no backend dependencies — the entire prototype runs client-side via localStorage, making it instantly deployable for pitches.
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-border" />

          <div className="mt-16 pt-12">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Questions or feedback?{" "}
              <button
                onClick={() => setShowContactForm(true)}
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity inline"
              >
                Get in Touch
              </button>
            </p>
          </div>

        </div>
      </div>

      <ContactModal isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
    </div>
  )
}
