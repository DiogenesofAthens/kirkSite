"use client"

import { FloatingNav } from "@/components/floating-nav"
import { Linkedin } from "lucide-react"
import { TimezoneClock } from "@/components/timezone-clock"

export default function Recommendations() {
  const highlights = [
    {
      label: "Consistently Top-Performing",
      description: "Consistently among the highest-performing Solutions Engineers across an 80-person global SE organization.",
    },
    {
      label: "Portfolio Managed",
      description: "Owned and grew an eight-figure portfolio of investment banking and private equity clients at S&P Global.",
    },
    {
      label: "USC Marshall",
      description: "B.S. Cum Laude in Business Administration with a 3.7 GPA. Presidential Scholar and Dean's List all four years.",
    },
    {
      label: "Cross-Functional Experience",
      description: "From Wall Street data platforms to enterprise SaaS to independent consulting — a career built on translating complexity into clarity.",
    },
  ];

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 pb-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <section className="mb-16">
            <h1 className="font-serif font-normal tracking-tight text-5xl md:text-6xl text-foreground mb-8">
              Career Highlights
            </h1>
            <p className="text-lg leading-relaxed text-foreground mb-6">
              A track record of delivering results across solutions engineering, product management, and enterprise data platforms.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground italic">
              &quot;I build systems that work in the real world — not just on paper.&quot;
            </p>
          </section>

          {/* Highlights Section */}
          <section className="mb-16 border-t border-border pt-12">
            <div className="space-y-12">
              {highlights.map((highlight, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="font-serif font-normal tracking-tight text-2xl text-foreground">
                    {highlight.label}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Vibe-Coded Section */}
          <section className="mb-16 border-t border-border pt-12">
            <h2 className="font-serif font-normal tracking-tight text-3xl text-foreground mb-6">
              This Site Was Vibe-Coded with Claude
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                I didn&apos;t just update a template — I used Claude (Anthropic&apos;s AI) as a collaborative coding partner to transform a friend&apos;s Next.js site into my own professional presence. From rewriting data models to restructuring pages to crafting copy, every change was a conversation between domain expertise and AI capability.
              </p>
              <p>
                It&apos;s a small example of something I believe deeply: the best results come from pairing human judgment with the right tools. That&apos;s true whether you&apos;re architecting an enterprise CPQ deployment or building a personal website.
              </p>
            </div>
          </section>

          {/* LinkedIn CTA Section */}
          <section className="border-t border-border pt-12">
            <p className="text-base text-muted-foreground mb-6">
              Want to know what colleagues and clients say about working with me? Connect on LinkedIn.
            </p>
            <a
              href="https://www.linkedin.com/in/kwessman"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
            >
              <Linkedin className="w-4 h-4" />
              View LinkedIn Profile
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
