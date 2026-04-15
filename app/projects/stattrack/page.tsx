"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ContactModal } from "@/components/contact-modal"
import { useState } from "react"

export default function StatTrack() {
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
              StatTrack
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
              A live NBA analytics dashboard that surfaces real-time player performance data, scoring trends, and automated insight alerts — built to demonstrate a full-stack sports data pipeline from raw API to interactive UI.
            </p>
            <div className="flex flex-wrap gap-6">
              <a
                href="https://stattrack-sandy.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                View Live Demo
              </a>
              <a
                href="https://github.com/DiogenesofAthens/stattrack"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wide uppercase text-muted-foreground border-b border-muted-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                View on GitHub
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Tech Stack */}
          <section className="py-16">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-10">
              Tech Stack
            </h2>
            <div className="space-y-10">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Next.js
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  React-based frontend with server-side rendering and a clean component architecture for rendering live stat tables and chart visualizations.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  FastAPI
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Python backend exposing RESTful endpoints for player stats and trend data, with async request handling and automatic OpenAPI documentation.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  nba_api
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Unofficial NBA statistics library providing access to the full range of player, team, and game data from the official NBA stats endpoint.
                </p>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Key Features */}
          <section className="py-16">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-10">
              Key Features
            </h2>
            <div className="space-y-10">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Real-Time Player Stats
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Live lookup of per-game averages, efficiency metrics, and season totals for any active NBA player — pulled directly from the NBA stats API on demand.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Scoring Trends
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Visual breakdowns of scoring trajectories across a season, making it easy to spot hot streaks, slumps, and inflection points in a player&apos;s performance.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Insight Alerts
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Automated surface-level analysis that flags notable statistical outliers — career highs, efficiency drops, or unusual usage patterns — without requiring manual interpretation.
                </p>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Footer */}
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
