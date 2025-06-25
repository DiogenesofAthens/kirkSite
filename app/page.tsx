"use client"

import { useState } from "react"
import { ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FloatingNav } from "@/components/floating-nav"
import { ContactModal } from "@/components/contact-modal"
import { TimezoneClock } from "@/components/timezone-clock"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-slate-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/10 to-purple-100/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <FloatingNav />
      <TimezoneClock />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center">
                <Image
                  src="/images/g-logo.png"
                  alt="Grant Glazer Logo"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">Grant Glazer</h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Business Technology & Process Consultant
            </p>
            <p className="text-lg text-slate-500 mb-6 max-w-2xl mx-auto font-medium italic">
              "Sales engineer by day, smart home architect by night — solving problems in business and life"
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowContactForm(true)}>
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
              <Link href="/my-expertise">
                <Button variant="outline" size="lg">
                  View My Expertise
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">About Grant</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 leading-relaxed mb-6">
              A San Diego native now living in the San Francisco Bay area, I earned my
              <strong> Bachelor of Science in Business Administration</strong> at California State University,
              Sacramento, with dedicated concentrations in <strong>Marketing</strong>,{" "}
              <strong>General Management</strong>, and <strong>Entrepreneurship</strong>.
            </p>
            <p className="text-slate-700 leading-relaxed mb-6">
              I've worked at a variety of organizations selling SaaS technologies, helping drive business opportunities
              and overall revenue. My experience spans Contract Management, e-Signature, Quoting, Content Management,
              and Digital Asset management solutions for governments and enterprise organizations globally.
            </p>
            
          </div>
          <div className="mt-8">
            <Link href="/my-expertise">
              <Button className="bg-blue-600 hover:bg-blue-700">Learn More About My Expertise</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/95 backdrop-blur-sm relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 mb-10">I welcome your interest!</p>

          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-slate-300 mb-8 leading-relaxed">
              Ready to drive your business forward with proven technology solutions and sales expertise? Let's discuss
              how I can help your organization achieve its goals.
            </p>
            <p className="text-sm text-slate-400 mb-6 italic">
              "Solving business problems with smart processes, strategic thinking, and hands-on tech know-how."
            </p>

            <div className="flex justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowContactForm(true)}>
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950/95 backdrop-blur-sm py-8 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 mb-4 md:mb-0">© 2024 Grant Glazer. All rights reserved.</div>
            <div className="text-slate-500 text-sm">GrantGlazer.com</div>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
    </div>
  )
}
