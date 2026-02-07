"use client"

import { useState, useEffect } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { ContactModal } from "@/components/contact-modal"
import { TimezoneClock } from "@/components/timezone-clock"
import Link from "next/link"

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <div className="min-h-screen bg-background relative">

      <FloatingNav />
      <TimezoneClock />

      {/* Hero */}
      <section className="pt-40 sm:pt-48 pb-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-foreground leading-[1.1] mb-8">
            Kirk Wessman
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mb-4">
            Solutions Engineer & Technical Leader
          </p>
          <p className="text-lg text-muted-foreground/70 leading-relaxed max-w-xl mb-12">
            Translating ambiguous requirements into production-grade solutions — then shipping them.
          </p>
          <div className="flex gap-6 items-center">
            <button
              onClick={() => setShowContactForm(true)}
              className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
            >
              Get in touch
            </button>
            <Link
              href="/my-expertise"
              className="text-sm tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              View expertise
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="border-t border-border" />
      </div>

      {/* About */}
      <section className="py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-foreground mb-10">
            About
          </h2>
          <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              Customer-facing technical leader with 15+ years designing, prototyping, and deploying complex systems at the intersection of business and technology.
            </p>
            <p>
              I specialize in translating ambiguous requirements into production-grade solutions through close collaboration with product, engineering, and executive stakeholders. My background spans solution architecture, product management, and enterprise technical engagements — with a focus on building systems that work in the real world, not just on paper.
            </p>
            <p>
              At Conga, I&apos;ve been consistently among the top-performing Solutions Engineers across an 80-person global organization. At S&P Global, I managed API products with eight-figure recurring revenue and a $10M+ client portfolio serving the world&apos;s largest financial institutions.
            </p>
            <p>
              I hold a B.S. Cum Laude in Business Administration from the University of Southern California — Marshall School of Business, where I was inducted into Phi Beta Kappa and named a Presidential Scholar.
            </p>
            <p>
              This site was built with Claude as a collaborative coding partner — a small example of pairing domain expertise with modern AI tools to produce real results, fast.
            </p>
          </div>
          <div className="mt-10">
            <Link
              href="/resume"
              className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
            >
              View full resume
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="border-t border-border" />
      </div>

      {/* Connect */}
      <section className="py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-foreground mb-6">
            Let&apos;s Connect
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
            Whether you&apos;re looking for a solutions engineer who can own complex enterprise engagements end-to-end, or you&apos;re curious about how AI can accelerate your workflow — I&apos;d love to talk.
          </p>
          <button
            onClick={() => setShowContactForm(true)}
            className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
          >
            Contact me
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 sm:px-8 lg:px-12 border-t border-border">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {year || 2026} Kirk Wessman
          </div>
          <div className="text-xs text-muted-foreground/50 tracking-wide">
            Built with Claude
          </div>
        </div>
      </footer>

      <ContactModal isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
    </div>
  )
}
