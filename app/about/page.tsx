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
            Los Angeles, with a lot of time in San Francisco and New York
          </p>

          <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              I&apos;m a customer-facing solutions engineer. I spent the last seven-plus years at Conga, a top-two Salesforce ISV, in the space between enterprise customers and the product: cross-vertical, with the most depth in financial services, tech, and health and life sciences.
            </p>
            <p>
              I run the whole customer lifecycle, from commercial and technical discovery through solution design, the demo or proof of concept, and security review. The mandate, as I see it, is that the solution works in production, not just on a whiteboard. My focus extends well beyond signature. On a practical level, I own the customer&apos;s usage curve. On a human level, I care whether they&apos;re glad they bought it.
            </p>
            <p>
              For the last year I&apos;ve also been building full-stack products solo, directing frontier coding agents through the whole dev cycle: architecture, API and data design, code review, and cloud deployment. Equal parts curiosity, skills development, and entrepreneurial streak. They&apos;re live on the{" "}
              <Link href="/portfolio" className="text-foreground border-b border-foreground/30 hover:opacity-60 transition-opacity">Work</Link>{" "}
              page. What I&apos;m working on now (Sep 2026): I&apos;ve taken one of them,{" "}
              <Link href="/projects/portkey" className="text-foreground border-b border-foreground/30 hover:opacity-60 transition-opacity">PortKey</Link>
              , swapped out the underlying model provider three times, and measured the changes under a layered eval harness: deterministic gates, a model judge under a locked rubric that never grades its own family, and a human calibration step. The results are on the app&apos;s{" "}
              <a href="https://portkey-one.vercel.app/evals" target="_blank" rel="noopener noreferrer" className="text-foreground border-b border-foreground/30 hover:opacity-60 transition-opacity">evals page</a>.
            </p>
            <p>
              I do my best work in dynamic, sometimes ambiguous environments, building new things rather than simply maintaining what exists. I&apos;m an extrovert and a collaborator at heart, energized by the work between engineering, product, and the customer.
            </p>
            <p>
              Before Conga, I spent six years at S&amp;P Global, owning roadmap, pricing, and go-to-market for enterprise API and data-feed products, then managing a portfolio of investment banking and private equity clients. I hold a B.S. Cum Laude in Business Administration from USC Marshall, where I was Phi Beta Kappa and a full merit scholarship recipient.
            </p>
          </div>

          {/* About This Site */}
          <div className="mt-16 pt-12 border-t border-border">
            <h2 className="font-serif text-2xl font-normal tracking-tight text-foreground mb-4">
              About This Site
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              This site was built using AI coding tools from the frontier labs — a practical exercise in pairing domain expertise with modern tooling to ship something real, fast.
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
