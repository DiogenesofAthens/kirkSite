"use client"

import { FloatingNav } from "@/components/floating-nav"
import Link from "next/link"

export default function Expertise() {
  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">

      <FloatingNav />

      <div className="pt-32 pb-20 px-6 sm:px-8 lg:px-12 relative">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="mb-20">
            <h1 className="font-serif text-5xl md:text-6xl font-normal tracking-tight text-foreground mb-8">
              My Expertise
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Customer-facing technical leader designing, prototyping, and deploying complex API- and data-driven systems.
            </p>
          </div>

          {/* Solution Architecture Section */}
          <div className="mb-20 pb-20 border-b border-muted-foreground/20">
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground mb-6">
              Solution Architecture & Enterprise Engagement
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground mb-8">
              I lead the technical sale from first call to signed contract — scoping architecture, mapping integrations, building proof-of-concepts, and designing deployment strategies that derisk enterprise rollouts. My approach pairs deep technical fluency with a product-minded eye for what will actually scale.
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p className="text-sm">Enterprise Solution Design</p>
              <p className="text-sm">API & Data Architecture</p>
              <p className="text-sm">Technical Discovery & POC Development</p>
              <p className="text-sm">Technical RFP/RFI Execution</p>
            </div>
          </div>

          {/* Product Management Section */}
          <div className="mb-20 pb-20 border-b border-muted-foreground/20">
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground mb-6">
              Product Management & Data Platforms
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground mb-8">
              At S&P Global, I owned roadmap, pricing, and go-to-market for enterprise data delivery platforms. I&apos;ve been in the room where product and engineering negotiate tradeoffs — and I know how to broker outcomes that serve both the business and the client.
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p className="text-sm">Product Strategy & Roadmap Ownership</p>
              <p className="text-sm">API & Data Feed Platforms</p>
              <p className="text-sm">Go-to-Market Execution</p>
              <p className="text-sm">Revenue Lifecycle Optimization</p>
            </div>
          </div>

          {/* AI & Emerging Technology Section */}
          <div>
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground mb-6">
              AI & Emerging Technology
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground mb-8">
              I use AI as a force multiplier — building functional prototypes, automating workflows, and exploring how large language models can reshape enterprise operations. The live tools on the{" "}
              <Link href="/portfolio" className="text-foreground border-b border-foreground/30 hover:opacity-60 transition-opacity">Portfolio</Link>{" "}
              page are working examples.
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p className="text-sm">Large Language Models & Generative AI</p>
              <p className="text-sm">Rapid Prototyping</p>
              <p className="text-sm">Workflow Automation</p>
              <p className="text-sm">AI-Assisted Development</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
