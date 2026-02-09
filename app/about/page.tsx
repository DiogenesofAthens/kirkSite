"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import Image from "next/image"
import Link from "next/link"

export default function About() {
  return (
    <div className="min-h-screen bg-background relative">
      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 pb-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">

          {/* Photo */}
          <div className="mb-16">
            <div className="relative w-full aspect-[3/4] max-w-sm overflow-hidden">
              <Image
                src="/images/kirk_wessman.jpg"
                alt="Kirk Wessman"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Bio */}
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-foreground mb-4">
            Kirk Wessman
          </h1>
          <p className="text-sm tracking-wide uppercase text-muted-foreground mb-12">
            Santa Monica, California
          </p>

          <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              Customer-facing technical leader with 15+ years designing, prototyping, and deploying complex systems at the intersection of business and technology.
            </p>
            <p>
              I specialize in translating ambiguous requirements into production-grade solutions through close collaboration with product, engineering, and executive stakeholders. My background spans solution architecture, product management, and enterprise technical engagements — with a focus on building systems that work in the real world, not just on paper.
            </p>
            <p>
              At Conga, I&apos;ve been consistently among the top-performing Solutions Engineers across an 80-person global organization, managing relationships with Fortune 500 pharmaceutical and biomedical companies. At S&P Global, I managed API products with eight-figure recurring revenue and a portfolio serving the world&apos;s largest investment banks and private equity firms.
            </p>
            <p>
              I hold a B.S. Cum Laude in Business Administration from the University of Southern California — Marshall School of Business, where I was inducted into Phi Beta Kappa and named a Presidential Scholar.
            </p>
          </div>

          {/* Links */}
          <div className="mt-12 pt-12 border-t border-border flex gap-8">
            <Link
              href="/resume"
              className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
            >
              Resume
            </Link>
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
      </div>
    </div>
  )
}
