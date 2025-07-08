"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GameSelector } from "@/components/game-selector"
import { FileText, Coffee, Beer, Heart, Calculator, Mail } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Lottie from "lottie-react"
import animationData from "@/public/images/resources-ani.json"
import { ContactModal } from "@/components/contact-modal"

const iconMap = { FileText, Calculator }
const donationIconMap = { Coffee, Beer, Heart }

export default function Resources() {
  const [showContactForm, setShowContactForm] = useState(false)

const guides = [
  {
    id: "sdr-process-guide",
    title: "SDR Process Guide",
    description: "Complete guide to qualifying leads, Salesforce best practices, and SDR workflows",
    funText: "Buy me a coffee ☕",
    icon: "FileText",
    donationIcon: "Coffee",
    link: "/downloads/sdr-process-guide/confirm",
  },
  {
    id: "media-server-guide",
    title: "Complete Media Server Setup Guide",
    description: "Step-by-step guide to building your own Unraid media server with Plex",
    funText: "Buy me a pizza 🍕",
    icon: "FileText",
    donationIcon: "Heart",
    link: "/downloads/media-server-guide/confirm",
  },
  {
    id: "sales-email-playbook",
    title: "Enterprise Sales Email Playbook",
    description: "Proven outbound campaigns to cut through noise and drive enterprise pipeline.",
    funText: "Buy me a sandwich 🥪",
    icon: "FileText",
    donationIcon: "Heart",
    link: "/sales-playbook",
  },
]

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <FloatingNav />
      <TimezoneClock />

      <div className="pt-28 pb-2 flex justify-center">
        <div className="w-40 sm:w-48 md:w-56">
          <Lottie animationData={animationData} loop autoplay />
        </div>
      </div>

      <div className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mt-2 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">Resources</h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-4">
              Helpful tools, guides, and insights for business technology and sales optimization
            </p>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-medium italic mt-4">
              "Engineer. Consultant. Tinkerer. I turn complexity into solutions."
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-8">Premium Guides</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {guides.map((guide) => {
                const Icon = iconMap[guide.icon as keyof typeof iconMap]
                const DonationIcon = donationIconMap[guide.donationIcon as keyof typeof donationIconMap]
                return (
                  <Link key={guide.id} href={guide.link}>
                    <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                      <CardHeader>
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <CardTitle className="text-xl text-slate-900 dark:text-slate-50">{guide.title}</CardTitle>
                        <CardDescription className="text-slate-700 dark:text-slate-300">
                          {guide.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                            <DonationIcon className="w-4 h-4" />
                            {guide.funText}
                          </span>
                          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm font-medium">View Guide</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="mb-16">
            <GameSelector />
          </div>

          <div className="glass rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Get In Touch</h2>
              <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
                Have questions about business technology, sales optimization, or need consulting help? I'd love to hear
                from you and discuss how I can help solve your challenges.
              </p>
            </div>
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
      </div>

      <ContactModal isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
    </div>
  )
}
