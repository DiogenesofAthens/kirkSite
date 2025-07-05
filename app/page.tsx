"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FloatingNav } from "@/components/floating-nav"
import { ContactModal } from "@/components/contact-modal"
import { TimezoneClock } from "@/components/timezone-clock"
import Link from "next/link"
import Image from "next/image"
import Lottie from "lottie-react"

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    fetch("/images/pc-coffee-ani.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch((err) => console.error("Failed to load Lottie animation:", err))
  }, [])

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-400/3 dark:to-purple-400/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <FloatingNav />
      <TimezoneClock />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 pb-14 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          {animationData && (
            <div className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 mb-4 sm:mb-6 md:mb-8">
              <Lottie
                animationData={animationData}
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-50 mb-2">
            Grant Glazer
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-3 max-w-2xl">
            Business Technology & Process Consultant
          </p>
          <p className="text-sm sm:text-base text-blue-600 dark:text-blue-400 mb-6 max-w-xl font-medium italic">
            "Sales engineer by day, smart home architect by night — solving problems in business and life"
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white min-w-[12rem]"
              onClick={() => setShowContactForm(true)}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Button>
            <Link href="/my-expertise">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 min-w-[12rem]"
              >
                View My Expertise
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Profile Image Section */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                    <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                      <Image
                        src="/images/grant-profile.jpg"
                        alt="Grant Glazer Profile"
                        width={120}
                        height={120}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
             <div className="flex-1 text-center lg:text-left">
  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-6">
    About Grant
  </h2>
  <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
    <p>
      I'm driven by curiosity and a love of well-designed systems, both digital and physical. Whether it's streamlining enterprise workflows or building out a smart home, I look for patterns, reduce friction, and create elegant solutions.
    </p>
    <p>
      I hold a
      <strong className="text-slate-900 dark:text-slate-100"> B.S. in Business Administration </strong>
      from California State University, Sacramento, with concentrations in
      <strong className="text-slate-900 dark:text-slate-100"> Marketing</strong>,
      <strong className="text-slate-900 dark:text-slate-100"> General Management</strong>, and
      <strong className="text-slate-900 dark:text-slate-100"> Entrepreneurship</strong>.
    </p>
    <p>
      As a solutions consultant, I help enterprise teams turn complexity into clarity. My focus includes customer relationship management (CRM), configure–price–quote (CPQ), contract lifecycle management (CLM), billing, workflow automation, document generation, and AI integrations. Everything I do is geared toward helping companies grow faster, work smarter, and reduce risk.
    </p>
    <p>
      Outside of work, I like to build. Whether it's a DIY project or an integrated smart home, I bring the same mindset: curious, systems-oriented, and always aiming for clean, scalable results.
    </p>
  </div>
                <div className="mt-8">
                  <Link href="/my-expertise">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Learn More About My Expertise
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 relative border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-600 dark:text-slate-400 mb-4 md:mb-0">
              © 2025 Grant Glazer. All rights reserved.
            </div>
            <div className="text-slate-500 dark:text-slate-500 text-sm">GrantGlazer.com</div>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
    </div>
  )
}
