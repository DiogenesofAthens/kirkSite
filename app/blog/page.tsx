"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ContactModal } from "@/components/contact-modal"
import Link from "next/link"
import { useState } from "react"
import { blogPosts } from "@/lib/tools-config"

export default function Portfolio() {
  const [showContactForm, setShowContactForm] = useState(false)
  const sortedPosts = [...blogPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 pb-20 relative">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="mb-16">
            <h1 className="font-serif text-5xl md:text-6xl font-normal tracking-tight text-foreground mb-4">
              Portfolio
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Selected work, writing, and the occasional creative detour.
            </p>
          </div>

          {/* Projects Section */}
          <section className="mb-20">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-10">
              Projects
            </h2>

            <div className="py-12 border-t border-border">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                Analytics
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-foreground mb-3">
                StatTrack
              </h3>
              <p className="text-base text-foreground leading-relaxed mb-6 max-w-2xl">
                Live NBA analytics dashboard built with Next.js, FastAPI, and the nba_api library. Surfaces real-time player stats, scoring trends, and automated insight alerts.
              </p>
              <Link
                href="/projects/stattrack"
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                View Project
              </Link>
            </div>

            <div className="py-12 border-t border-border">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                Automation
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-foreground mb-3">
                fareTrader
              </h3>
              <p className="text-base text-foreground leading-relaxed mb-6 max-w-2xl">
                Autonomous Python agent that monitors Delta Air Lines first-class fares and auto-books when prices drop below a configured threshold — using eCredits as zero-cost options on premium seats.
              </p>
              <Link
                href="/projects/faretrader"
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                View Project
              </Link>
            </div>

            <div className="py-12 border-t border-border">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                Blockchain / Civic Tech
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-foreground mb-3">
                Save the State
              </h3>
              <p className="text-base text-foreground leading-relaxed mb-6 max-w-2xl">
                Blockchain-anchored land covenant registry targeting county government. Covenants are recorded as immutable on-chain transactions; SQLite serves as a queryable enrichment layer.
              </p>
              <Link
                href="/projects/savethestate"
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                View Project
              </Link>
            </div>

            <div className="py-12 border-t border-border">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                Infrastructure
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-foreground mb-3">
                ResourXe
              </h3>
              <p className="text-base text-foreground leading-relaxed mb-6 max-w-2xl">
                GPU compute routing engine that queries cloud marketplaces and scores instances by price and carbon intensity — find the cheapest compute, the greenest, or any blend in between.
              </p>
              <Link
                href="/projects/resourxe"
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                View Project
              </Link>
            </div>

            <div className="py-12 border-t border-border">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                Fintech
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-foreground mb-3">
                PortKey
              </h3>
              <p className="text-base text-foreground leading-relaxed mb-6 max-w-2xl">
                Mortgage portability neobank prototype. Lets homeowners carry an existing low-rate mortgage to a new property instead of refinancing at today&apos;s rates. Your rate moves with you.
              </p>
              <Link
                href="/projects/portkey"
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                View Project
              </Link>
            </div>

            <div className="py-12 border-t border-border">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                Civic
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-foreground mb-3">
                re-open.us
              </h3>
              <p className="text-base text-foreground leading-relaxed mb-6 max-w-2xl">
                Civic engagement landing page challenging political apathy and calling for renewed democratic participation. Static Next.js site with a canvas-animated waving flag.
              </p>
              <Link
                href="/projects/reopen"
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                View Project
              </Link>
            </div>

            <div className="py-12 border-t border-border">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                Creative
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-foreground mb-3">
                Prince of Mulberry
              </h3>
              <p className="text-base text-foreground leading-relaxed mb-6 max-w-2xl">
                Coming soon page for a Nolita-based film production company. Full-screen video, canvas film grain, and a Cormorant Garamond editorial aesthetic — in a single dependency-free HTML file.
              </p>
              <Link
                href="/projects/pmp"
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                View Project
              </Link>
            </div>
          </section>

          {/* Media Section */}
          <section className="mb-20">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-10">
              Media
            </h2>

            <div className="py-10 border-t border-border">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                The Conga Rap
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-xl">
                Conga-themed rap produced for a past sales kickoff&apos;s main stage. Combines ChatGPT/Gemini for voice and lyrics with audio samples and custom chord progressions. Artist credit:{" "}
                <a
                  href="https://www.linkedin.com/in/rgrobins/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground border-b border-foreground/30 hover:opacity-60 transition-opacity"
                >
                  Notorious RGR
                </a>
                .
              </p>

              {/* SoundCloud Embed */}
              <div className="max-w-xl">
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/kw_sc/cr&color=%23333333&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
                  className="rounded"
                />
              </div>
            </div>
          </section>

          {/* Writings Section */}
          <section className="mb-20">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-10">
              Writings
            </h2>
            <p className="text-sm text-muted-foreground/60 italic mb-10">
              Not my writings so much as my machine analogue&apos;s — these are placeholder articles entirely written by AI. Human ones coming soon.
            </p>

            <div className="space-y-0">
              {sortedPosts.length > 0 ? (
                sortedPosts.map((post, index) => (
                  <div key={post.slug}>
                    <div className="py-12 border-t border-border">
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                        {post.category}
                      </div>

                      <h3 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-foreground mb-3">
                        {post.title}
                      </h3>

                      <div className="text-sm text-muted-foreground mb-4">
                        {new Date(post.date + "T12:00:00").toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>

                      <p className="text-base text-foreground leading-relaxed mb-6 max-w-2xl">
                        {post.excerpt}
                      </p>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
                      >
                        Read
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No posts yet.</p>
                </div>
              )}
            </div>
          </section>

          {/* Live AI Tools Section */}
          <section>
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-10">
              Live AI Tools
            </h2>

            <div className="space-y-8 border-t border-border pt-10">
              <div>
                <Link href="/resources/tools/extractor" className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity">
                  Entity Extractor
                </Link>
                <p className="text-muted-foreground text-sm mt-3">
                  AI-powered document analysis converting unstructured text to JSON.
                </p>
              </div>
              <div>
                <Link href="/tools/translator" className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity">
                  Code Translator
                </Link>
                <p className="text-muted-foreground text-sm mt-3">
                  Legacy code modernization tool using LLMs for architectural translation.
                </p>
              </div>
              <div>
                <Link href="/resources/tools/ha-architect" className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity">
                  HA Architect
                </Link>
                <p className="text-muted-foreground text-sm mt-3">
                  Natural language to YAML generator for Home Assistant automations.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-20 pt-12 border-t border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Thoughts or questions?{" "}
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
