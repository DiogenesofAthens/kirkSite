"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ContactModal } from "@/components/contact-modal"
import { useState } from "react"
import { Github } from "lucide-react"

export default function Reopen() {
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
              re-open.us
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
              A civic engagement landing page challenging political apathy and calling for a renewed commitment to democratic participation. Built as a fully static Next.js site with a canvas-animated waving flag and editorial typography designed to move people.
            </p>
            <div className="flex flex-wrap gap-6">
              <a
                href="https://reopen.us"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                Visit Site
              </a>
              <a
                href="https://github.com/DiogenesofAthens/reopen"
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
                  Next.js 15
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  App Router with static export — no server, no database. Deploys anywhere as a fully static site with no runtime dependencies.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Canvas API
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Custom American flag animation rendered column by column with sine-wave physics — pinned at the staff, free at the fly. No animation libraries; pure browser APIs.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Tailwind CSS
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Responsive layout with custom utility classes for typographic hierarchy — Playfair Display serif headlines paired with Inter body copy for an editorial, authoritative feel.
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
                  Animated Flag
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Canvas-based waving flag rendered column by column with configurable sine-wave physics. A ResizeObserver keeps it sized correctly across viewport changes without any layout jank.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Email Signup
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Subscriber capture form ready for integration with an email service — the front-end form handling is in place and wired to accept a real API endpoint.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Zero-Dependency Static Site
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  No backend, no database, no third-party runtime. The entire site builds to a directory of static files that can be served from any CDN with sub-millisecond TTFB.
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
