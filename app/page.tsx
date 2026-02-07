"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FloatingNav } from "@/components/floating-nav"
import { ContactModal } from "@/components/contact-modal"
import { TimezoneClock } from "@/components/timezone-clock"
import Link from "next/link"
import Image from "next/image"
import Lottie from "@/components/lottie-client"

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [animationData, setAnimationData] = useState<any>(null)
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    fetch("/images/pc-coffee-ani.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch((err) => console.error("Failed to load Lottie animation:", err))

    setYear(new Date().getFullYear())
  }, [])

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">

      <FloatingNav />
      <TimezoneClock />

      <section className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {animationData && (
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-6">
                <Lottie animationData={animationData} loop autoplay style={{ width: "100%", height: "100%" }} />
              </div>
            )}
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 mb-3">Kirk Wessman</h1>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-4 max-w-2xl">
              Solutions Engineer & Technical Leader — API & Data-Driven Systems
            </p>
            <p className="text-base text-amber-700 dark:text-amber-400 mb-6 max-w-xl font-medium italic">
              "Translating ambiguous requirements into production-grade solutions — then shipping them."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 text-white" onClick={() => setShowContactForm(true)}>
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
              <Link href="/my-expertise">
                <Button variant="outline" size="lg" className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                  My Expertise
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-neutral-900 dark:bg-white p-1">
                    <div className="w-full h-full rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center">
                      <span className="text-white dark:text-neutral-900 font-bold text-4xl">KW</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-6">About Kirk</h2>
                <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p className="text-xl font-semibold">
                    Customer-facing technical leader with 15+ years designing, prototyping, and deploying complex systems at the intersection of business and technology.
                  </p>
                  <p>
                    I specialize in translating ambiguous requirements into production-grade solutions through close collaboration with product, engineering, and executive stakeholders. My background spans solution architecture, product management, and enterprise technical engagements — with a focus on building systems that work in the real world, not just on paper.
                  </p>
                  <p>
                    I hold a <strong className="text-slate-900 dark:text-slate-100">B.S. Cum Laude in Business Administration</strong> from the <strong className="text-slate-900 dark:text-slate-100">University of Southern California — Marshall School of Business</strong>, where I was inducted into <strong className="text-slate-900 dark:text-slate-100">Phi Beta Kappa</strong> and named a <strong className="text-slate-900 dark:text-slate-100">USC Presidential Scholar</strong>.
                  </p>
                  <p>
                    My expertise spans CPQ, CLM, enterprise API and data-feed platforms, AI integrations, and revenue lifecycle management. At Conga I&apos;ve been consistently among the top-performing SEs across an 80-person global org. At S&amp;P Global I managed API products with eight-figure recurring revenue and a $10M+ client portfolio.
                  </p>
                  <p>
                    I&apos;m passionate about AI and what it makes possible. This site itself was vibe-coded with Claude — proof that pairing domain expertise with modern AI tools can produce real results, fast.
                  </p>
                </div>
                <div className="mt-8">
                  <Link href="/resume">
                    <Button className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 text-white">
                      View My Resume
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-6">Let&apos;s Connect</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10">I welcome your interest.</p>
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
              Whether you&apos;re looking for a solutions engineer who can own complex enterprise engagements end-to-end, or you&apos;re curious about how AI can accelerate your workflow — I&apos;d love to talk.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 italic">
              "I&apos;m most effective in environments where the problem space is evolving and the path to deployment isn&apos;t fully defined."
            </p>
            <div className="flex justify-center mt-6">
              <Button size="lg" className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 text-white" onClick={() => setShowContactForm(true)}>
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 relative border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-600 dark:text-slate-400 mb-4 md:mb-0">
              © {year || 2026} Kirk Wessman. All rights reserved.
            </div>
            <div className="text-slate-500 dark:text-slate-500 text-sm">Vibe-coded with Claude</div>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
    </div>
  )
}
