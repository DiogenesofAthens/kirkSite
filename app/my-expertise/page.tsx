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
              Deep experience leading complex enterprise engagements from discovery through deployment. I design systems that work in the real world — not just on paper — through close collaboration with product, engineering, and executive stakeholders.
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p className="text-sm">Enterprise Solution Design</p>
              <p className="text-sm">API & Data Architecture</p>
              <p className="text-sm">Technical Discovery</p>
              <p className="text-sm">POC Development</p>
            </div>
          </div>

          {/* Product Management Section */}
          <div className="mb-20 pb-20 border-b border-muted-foreground/20">
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground mb-6">
              Product Management & Data Platforms
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground mb-8">
              Led product strategy for enterprise API and data-feed platforms with eight-figure recurring revenue. Hands-on PM who works directly with engineering and with the world&apos;s largest financial institutions.
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p className="text-sm">Product Strategy</p>
              <p className="text-sm">API & Data Feeds</p>
              <p className="text-sm">Go-to-Market Strategy</p>
              <p className="text-sm">Revenue Lifecycle Optimization</p>
            </div>
          </div>

          {/* AI & Emerging Technology Section */}
          <div className="mb-20 pb-20 border-b border-muted-foreground/20">
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground mb-6">
              AI & Emerging Technology
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground mb-8">
              Applying AI and LLMs to real business problems — from workflow automation to rapid prototyping of production-grade tools.
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p className="text-sm">Artificial Intelligence</p>
              <p className="text-sm">Large Language Models</p>
              <p className="text-sm">Generative AI</p>
              <p className="text-sm">Workflow Automation</p>
            </div>
          </div>

          {/* Strengths at a Glance Section */}
          <div className="mb-20 pb-20 border-b border-muted-foreground/20">
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground mb-10">
              Strengths at a Glance
            </h2>
            <p className="text-base text-muted-foreground mb-12">
              These are the skills I draw from every day — whether architecting enterprise solutions, managing data platforms, or exploring what&apos;s next with AI.
            </p>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-serif text-xl font-normal tracking-tight text-foreground mb-6">Technical Leadership</h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li>Solution Architecture</li>
                  <li>API & Data System Design</li>
                  <li>Cross-Functional Collaboration</li>
                  <li>Complex Enterprise Engagements</li>
                  <li>Technical RFP/RFI Execution</li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl font-normal tracking-tight text-foreground mb-6">Business & Strategy</h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li>Product Management</li>
                  <li>Client Relationship Management</li>
                  <li>Strategic Account Growth</li>
                  <li>Revenue Lifecycle Optimization</li>
                  <li>Go-to-Market Strategy</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Live AI Portfolio Section */}
          <div>
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground mb-12">
              Live AI Portfolio
            </h2>
            <div className="space-y-8">
              <div>
                <Link href="/tools/extractor" className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity">
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
                <Link href="/tools/ha-architect" className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity">
                  HA Architect
                </Link>
                <p className="text-muted-foreground text-sm mt-3">
                  Natural language to YAML generator for Home Assistant automations.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
