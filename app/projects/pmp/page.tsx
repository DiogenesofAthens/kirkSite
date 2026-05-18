"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ContactModal } from "@/components/contact-modal"
import { useState } from "react"
import { Github } from "lucide-react"

export default function PMP() {
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
              Prince of Mulberry
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
              Coming soon page for Prince of Mulberry Productions — a film production company named after the intersection of Prince St. and Mulberry St. in Nolita, New York. Built as a single self-contained HTML file with no framework, no build step, and no dependencies.
            </p>
            <div className="flex flex-wrap gap-6">
              <a
                href="https://www.princeofmulberry.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                Visit Site
              </a>
              <a
                href="https://github.com/DiogenesofAthens/PMP"
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
                  Vanilla HTML / CSS / JS
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  The entire site is a single self-contained file — inline styles, inline scripts, and a Google Fonts import. No framework, no build step, no package.json. Deploys to Vercel as a static asset with zero configuration.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Canvas API
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  JavaScript film grain effect rendered at ~12fps via requestAnimationFrame — random noise drawn at low opacity with mix-blend-mode overlay to simulate analog film texture over the video background.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Google Fonts
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Cormorant Garamond and Cormorant SC — italic, small caps, weights 300 and 400. The typeface choices establish the cinematic, editorial aesthetic that carries the site&apos;s visual identity.
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
                  Film Grain Effect
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Canvas noise rendered at low opacity with mix-blend-mode overlay simulates analog film grain — the kind of textural detail that distinguishes a considered design from a template.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Full-Screen Video Background
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Autoplay muted loop with a CSS vignette overlay layered via radial and linear gradients. Sound is toggleable via an inline SVG icon swap — no JavaScript audio libraries required.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  One File, Zero Dependencies
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  An exercise in constraint — proving that a polished, cinematic web experience doesn&apos;t require a framework. The entire site fits in a single deployable file.
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
