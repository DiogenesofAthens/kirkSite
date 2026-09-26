"use client"

import { useState, useEffect } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { ContactModal } from "@/components/contact-modal"
import { TimezoneClock } from "@/components/timezone-clock"
import Link from "next/link"
import { Github } from "lucide-react"

const PRODUCTS = [
  {
    title: "PortKey",
    line: "Carry your low-rate mortgage to your next home. Three model providers, evaluated in public.",
    href: "/projects/portkey",
  },
  {
    title: "fareTrader",
    line: "An agent that watches Delta first-class fares and books the drop.",
    href: "/projects/faretrader",
  },
  {
    title: "ResourXe",
    line: "Routes GPU workloads to the cheapest compute, the greenest, or a blend.",
    href: "/projects/resourxe",
  },
  {
    title: "Save the State",
    line: "Land covenants on-chain, verifiable without a central authority.",
    href: "/projects/savethestate",
  },
  {
    title: "StatTrack",
    line: "Live NBA analytics, from raw API to interactive dashboard.",
    href: "/projects/stattrack",
  },
]

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
      <section className="pt-40 sm:pt-48 pb-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-foreground leading-[1.1] mb-8">
            Kirk Wessman
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mb-4">
            Solutions Engineer · Enterprise AI Systems
          </p>
          <p className="text-lg text-muted-foreground/70 leading-relaxed max-w-xl">
            Discovery, architecture, evals, and security review. Plus five live products, built by directing AI coding agents.
          </p>
          <div className="mt-10">
            <a
              href="https://github.com/DiogenesofAthens"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto border-t border-border" />
      </div>

      {/* Voice */}
      <section className="py-12 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg sm:text-xl text-foreground leading-relaxed max-w-2xl mb-8">
            My focus extends well beyond signature. On a practical level, I own the customer&apos;s usage curve. On a human level, I care whether they&apos;re glad they bought it.
          </p>
          <Link
            href="/about"
            className="text-sm tracking-wide uppercase text-muted-foreground border-b border-muted-foreground pb-1 hover:opacity-60 transition-opacity"
          >
            More about me
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto border-t border-border" />
      </div>

      {/* Products */}
      <section className="pt-12 pb-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-foreground mb-12">
            What I&apos;m Building
          </h2>
          <ul className="space-y-8">
            {PRODUCTS.map((product) => (
              <li key={product.href}>
                <Link href={product.href} className="group block">
                  <span className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground group-hover:opacity-60 transition-opacity">
                    {product.title}
                  </span>
                  <span className="block text-base text-muted-foreground leading-relaxed mt-1">
                    {product.line}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-14">
            <Link
              href="/portfolio"
              className="text-sm tracking-wide uppercase text-muted-foreground border-b border-muted-foreground pb-1 hover:opacity-60 transition-opacity"
            >
              View full portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto border-t border-border" />
      </div>

      {/* Contact */}
      <section className="py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
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
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 sm:px-8 lg:px-12 border-t border-border">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-sm text-muted-foreground">
            &copy; {year || 2026} Kirk Wessman
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/DiogenesofAthens"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/50 tracking-wide hover:text-muted-foreground transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
    </div>
  )
}
