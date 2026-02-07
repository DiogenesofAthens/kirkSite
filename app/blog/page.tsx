"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ContactModal } from "@/components/contact-modal"
import Link from "next/link"
import { useState } from "react"
import { blogPosts } from "@/lib/tools-config"

export default function Journal() {
  const [showContactForm, setShowContactForm] = useState(false)

  // Use blogPosts from config directly, sorted by date descending
  const sortedPosts = blogPosts.sort((a, b) => {
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
              Journal
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Thoughts on business technology, strategy, and the intersection of intellectual rigor and practical application.
            </p>
            <p className="text-sm text-muted-foreground/60 italic">
              Not &quot;my&quot; journal so much as my machine analogue&apos;s — these are placeholder articles entirely written by AI. Human ones coming soon.
            </p>
          </div>

          {/* Posts List */}
          <div className="space-y-0">
            {sortedPosts.length > 0 ? (
              sortedPosts.map((post, index) => (
                <div key={post.slug}>
                  <div className="py-12">
                    {/* Category in small caps */}
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                      {post.category}
                    </div>

                    {/* Post title in serif */}
                    <h2 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-foreground mb-3">
                      {post.title}
                    </h2>

                    {/* Date */}
                    <div className="text-sm text-muted-foreground mb-4">
                      {new Date(post.date + "T12:00:00").toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>

                    {/* One-line excerpt */}
                    <p className="text-base text-foreground leading-relaxed mb-6 max-w-2xl">
                      {post.excerpt}
                    </p>

                    {/* Read link */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
                    >
                      Read
                    </Link>
                  </div>

                  {/* Divider between posts */}
                  {index < sortedPosts.length - 1 && (
                    <div className="border-t border-border" />
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No posts yet.</p>
              </div>
            )}
          </div>

          {/* Footer with contact link */}
          <div className="mt-20 pt-12 border-t border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Have thoughts or questions? I'd be interested in discussing these ideas further.{" "}
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
