"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ContactModal } from "@/components/contact-modal"
import { useState } from "react"
import { Github } from "lucide-react"

export default function Resourxe() {
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
              ResourXe
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
              A GPU compute routing engine that queries cloud marketplaces and scores available instances by price and carbon intensity — helping AI workloads find the cheapest or the greenest compute, depending on what you optimize for.
            </p>
            <div className="flex flex-wrap gap-6">
              <a
                href="https://resourxe.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                View Live Demo
              </a>
              <a
                href="https://github.com/DiogenesofAthens/resourxe"
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
                  Modular provider architecture — each marketplace integration is an independent module exposing a normalized record schema, making it straightforward to add new providers without touching the scorer.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Vast.ai API
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Queries available GPU instances filtered to rentable, un-rented nodes and ordered by hourly price — surfacing GPU model, reliability score, and geographic location for each result.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  WattTime API
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Fetches real-time marginal carbon intensity for datacenter locations, enabling the engine to score and rank compute options by their actual grid emissions — not just location-level averages.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Composite Scorer
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  A configurable weight parameter from 0.0 (pure price) to 1.0 (pure carbon) blends price rank and carbon index into a single score — letting users dial between cost minimization and emissions minimization.
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
                  Multi-Provider GPU Search
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Normalized results across cloud GPU marketplaces with price, reliability, and geolocation data — presented in a consistent schema regardless of the underlying provider&apos;s API structure.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Carbon Intensity Scoring
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Integrates real-time marginal grid emissions to surface not just the cheapest compute, but the cleanest — a meaningful distinction as AI infrastructure&apos;s environmental footprint grows.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Configurable Optimization
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  A single parameter controls the tradeoff between cost and carbon — useful for organizations with sustainability commitments that need to balance budget constraints against emissions targets.
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
