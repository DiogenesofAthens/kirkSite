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
      <section className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {animationData && (
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-6">
                <Lottie
                  animationData={animationData}
                  loop
                  autoplay
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            )}
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 mb-3">Grant Glazer</h1>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-4 max-w-2xl">
              Business Technology & Process Consultant
            </p>
            <p className="text-base text-blue-600 dark:text-blue-400 mb-6 max-w-xl font-medium italic">
              "Sales engineer by day, smart home architect by night — solving problems in business and life"
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setShowContactForm(true)}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
              <Link href="/my-expertise">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  View My Expertise
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center gap-8">
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

              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-6">About Grant</h2>
                <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p>
                    Driven by curiosity and a love of well-designed systems—both digital and physical—I bring structure and clarity to complex enterprise challenges.
                  </p>
                  <p>
                    I hold a <strong className="text-slate-900 dark:text-slate-100">Bachelor of Science in Business Administration</strong> from California State University, Sacramento, with concentrations in <strong className="text-slate-900 dark:text-slate-100">Marketing</strong>, <strong className="text-slate-900 dark:text-slate-100">General Management</strong>, and <strong className="text-slate-900 dark:text-slate-100">Entrepreneurship</strong>.
                  </p>
                  <p>
                    I'm a value-focused solutions consultant who helps enterprise organizations translate complex needs into actionable, scalable SaaS solutions. I bring deep expertise across CRM, Configure–Price–Quote (CPQ), Contract Lifecycle Management (CLM), Billing and Order Management, e-Signature, Document Generation, Approval Workflows, AI integrations, and Digital Asset Management. I specialize in aligning product capabilities to real-world business outcomes—accelerating revenue, streamlining operations, and reducing risk.
                  </p>
                  <p>
                    Outside of work, I enjoy building things—from home automation systems to hands-on DIY projects. That same maker mindset fuels my approach to consulting: curious, systems-oriented, and always looking for elegant, scalable solutions.
                  </p>
                </div>
                <div className="mt-8">
                  <Link href="/my-expertise">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Learn More About My Expertise</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10">I welcome your interest!</p>

          <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
            <p className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
              Ready to drive your business forward with proven technology solutions and sales expertise? Let's discuss how I can help your organization achieve its goals.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 italic">
              "Solving business problems with smart processes, strategic thinking, and hands-on tech know-how."
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setShowContactForm(true)}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
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
