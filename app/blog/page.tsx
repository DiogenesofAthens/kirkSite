"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ContactModal } from "@/components/contact-modal"
import Link from "next/link"
import { useState, useRef } from "react"
import { blogPosts } from "@/lib/tools-config"

export default function Portfolio() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const sortedPosts = [...blogPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

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

          {/* Media Section */}
          <section className="mb-20">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-10">
              Media
            </h2>

            <div className="py-10 border-t border-border">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                The Conga Rap
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Sales Kickoff &middot; Co-written with AI
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-xl">
                A rap about Conga&apos;s Quote-to-Cash platform, co-authored with AI for a past sales kickoff. Equal parts product knowledge and irreverence.
              </p>

              {/* Audio Player */}
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full border border-foreground flex items-center justify-center hover:opacity-60 transition-opacity flex-shrink-0"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <rect x="2" y="1" width="3.5" height="12" rx="0.5" />
                      <rect x="8.5" y="1" width="3.5" height="12" rx="0.5" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <polygon points="3,1 13,7 3,13" />
                    </svg>
                  )}
                </button>
                <span className="text-sm text-muted-foreground tracking-wide uppercase">
                  {isPlaying ? "Now Playing" : "Play"}
                </span>
              </div>

              <audio
                ref={audioRef}
                src="/audio/conga-sko.mp3"
                onEnded={() => setIsPlaying(false)}
                preload="metadata"
              />
            </div>
          </section>

          {/* Writings Section */}
          <section>
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
