"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"

export default function Portkey() {
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
              A mortgage portability neobank prototype. When a homeowner sells and buys, PortKey lets them carry their existing low-rate mortgage to the new property instead of refinancing at today&apos;s rates. Your rate moves with you. Architected and shipped solo by directing AI coding agents, with an AI intake demo that runs on three model providers and a public page showing how each one measured up.
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
                href="https://portkey-one.vercel.app/evals"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wide uppercase text-muted-foreground border-b border-muted-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                View Eval Results
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
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  OpenAI, Anthropic, and Groq
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Three model providers behind one interface, all fed the same system prompts. Swapping providers is a query parameter, and adding a fourth is a template file. API keys stay in server routes and never reach the browser.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  zod + vitest
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  One schema validates every model output, whichever provider produced it. Offline unit tests cover the app and the eval harness itself.
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
                  Mortgage Maven AI Intake
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  A conversational assistant pulls a loan application out of a mortgage statement and a short borrower conversation. Every field records where it came from. Plain code decides which lenders qualify; the model only writes the explanation, and a human approves the handoff.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Layered Eval Harness
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Every provider change runs through three layers: nine deterministic gates per case, a model judge from a different model family scoring against a locked rubric, and a human calibration step that checks the judge against my own blind labels. Results are published as static JSON on the evals page, which makes no model calls.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
