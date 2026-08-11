"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ContactModal } from "@/components/contact-modal"
import { useState } from "react"
import { Github } from "lucide-react"

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
              A live NBA analytics dashboard built around a FastAPI pipeline, translating NBA data into player summaries, scoring views, and an alert-ready interface from raw API to interactive UI.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-10">
              The FastAPI service runs on free-tier hosting, and the unofficial NBA stats API can rate-limit cloud IPs, so live data may be intermittent—especially in the offseason.
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
                className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-muted-foreground border-b border-muted-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                <Github className="h-4 w-4" />
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
                  Player Data Pipeline
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Player requests move from the Next.js interface through FastAPI to the NBA data source, with clear loading and availability states when the upstream feed cannot respond.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Scoring Snapshot
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  A focused leaderboard view turns available season scoring data into a quick, scan-friendly comparison across players.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Insight Framework
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  An alert-ready section makes room for anomaly insights as live game data becomes available, with honest empty states when the feed is quiet or unavailable.
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
