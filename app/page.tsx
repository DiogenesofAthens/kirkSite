"use client"

import { useState, useEffect } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { ContactModal } from "@/components/contact-modal"
import { TimezoneClock } from "@/components/timezone-clock"
import Link from "next/link"
import Image from "next/image"
import { blogPosts } from "@/lib/tools-config"

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  const latestPost = [...blogPosts].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0]

  return (
    <div className="min-h-screen bg-background relative">

      <FloatingNav />
      <TimezoneClock />

      {/* Hero */}
      <section className="pt-40 sm:pt-48 pb-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10 sm:gap-12">
            <div className="flex-1">
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-foreground leading-[1.1] mb-8">
                Kirk Wessman
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mb-4">
                Solutions Engineer & Technical Leader
              </p>
              <p className="text-base text-muted-foreground/60 tracking-wide">
                Santa Monica, California
              </p>
            </div>
            <div className="relative w-48 sm:w-44 aspect-[3/4] overflow-hidden flex-shrink-0">
              <Image
                src="/images/kirk_wessman.jpg"
                alt="Kirk Wessman"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="border-t border-border" />
      </div>

      {/* Introduction */}
      <section className="py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 text-lg sm:text-xl text-foreground leading-relaxed max-w-2xl">
            <p>
              I design and deploy complex enterprise systems at the intersection of business strategy and technical architecture. Over 15 years — from Wall Street data platforms to enterprise SaaS — I&apos;ve worked with some of the most sophisticated organizations in the world, helping them close the gap between what they need and what their technology can do.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground">
              I hold a B.S. Cum Laude from the University of Southern California — Marshall School of Business, where I was inducted into Phi Beta Kappa and named a Presidential Scholar.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="border-t border-border" />
      </div>

      {/* Focus Areas */}
      <section className="py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-16">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-4">
                Solution Architecture
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                Leading complex enterprise engagements from discovery through deployment — designing systems that work in the real world, not just on paper.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-4">
                Product & Data Platforms
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                Former product lead for enterprise API and data-feed platforms with eight-figure recurring revenue, serving the world&apos;s largest financial institutions.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-4">
                AI & Emerging Technology
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                Applying AI and LLMs to real business problems — from workflow automation to rapid prototyping of production-grade tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="border-t border-border" />
      </div>

      {/* Latest Writing */}
      {latestPost && (
        <>
          <section className="py-24 px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">
                Latest
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-4">
                {latestPost.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-xl">
                {latestPost.excerpt}
              </p>
              <Link
                href={`/blog/${latestPost.slug}`}
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                Read
              </Link>
            </div>
          </section>

          {/* Divider */}
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="border-t border-border" />
          </div>
        </>
      )}

      {/* Contact */}
      <section className="py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-foreground mb-6">
            Contact
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
            If something here resonates, or you&apos;d like to discuss a problem worth solving, you&apos;re welcome to reach out.
          </p>
          <div className="flex flex-wrap items-center gap-8">
            <button
              onClick={() => setShowContactForm(true)}
              className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
            >
              Send a message
            </button>
            <a
              href="https://www.linkedin.com/in/kwessman"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 sm:px-8 lg:px-12 border-t border-border">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-sm text-muted-foreground">
            &copy; {year || 2026} Kirk Wessman
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
