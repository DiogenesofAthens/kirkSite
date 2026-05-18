"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ContactModal } from "@/components/contact-modal"
import { useState } from "react"
import { Github } from "lucide-react"

export default function FareTrader() {
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
              fareTrader
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
              An autonomous Python agent that monitors Delta Air Lines first-class and Delta One fares across configured routes and date windows, booking automatically when prices drop below your threshold — using eCredits as zero-cost options on premium seats.
            </p>
            <div className="flex flex-wrap gap-6">
              <a
                href="https://fare-trader.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                View Live Demo
              </a>
              <a
                href="https://github.com/DiogenesofAthens/fareTrader"
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
                  Python
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Core agent logic with dataclass-driven route configuration, a continuous scan scheduler, and env-var-first secrets management — no hardcoded credentials anywhere.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  FastAPI
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  RESTful backend exposing scan status, booking inventory, price history, and a manual scan trigger — served via Vercel&apos;s Python runtime with automatic OpenAPI docs.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Playwright
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Headless browser automation against delta.com — handles login, fare search, seat selection, and booking confirmation with a configurable DRY_RUN mode for safe testing.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  SQLite
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Local database tracking held bookings, price history across every scanned route and date, and a full scan log with trigger counts, booking counts, and error rates.
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
                  Autonomous Fare Monitoring
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Continuously scans configured route and date combinations on a set interval. Triggers a booking attempt the moment a fare drops to or below the configured price threshold.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Auto-Booking via eCredits
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Executes the full Playwright flow through delta.com — login, search, selection, and confirmation — using eCredits as a zero-financial-risk way to hold premium inventory before deciding whether to fly.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Web Dashboard
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  FastAPI-backed UI showing real-time scan status, held booking inventory, price history charts by route, and a full scan log — with a button to trigger a manual scan on demand.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Push Notifications
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Pushover integration delivers instant alerts for booking events and scan summaries — no need to watch the dashboard.
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
