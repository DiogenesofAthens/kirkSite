"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GameSelector } from "@/components/game-selector"
import { FileText, Coffee, Beer, Heart, Calculator, Mail, QrCode, Clock, DollarSign, Sparkles, Code2, Home, Rocket, Crown, ExternalLink, Compass, Tv, Pizza, Sandwich } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Lottie from "@/components/lottie-client"
import animationData from "@/public/images/resources-ani.json"
import { ContactModal } from "@/components/contact-modal"
import { aiTools, utilityTools } from "@/lib/tools-config"

const iconMap = {
  FileText,
  Calculator,
  QrCode,
  Clock,
  DollarSign,
  SparkleIcon: Sparkles,
  CodeIcon: Code2,
  HomeIcon: Home,
  Compass,
  Tv,
  Mail,
  Rocket
}

const donationIconMap = { Coffee, Beer, Heart, Pizza, Sandwich, Home }

export default function Resources() {
  const [showContactForm, setShowContactForm] = useState(false)

  const guides = [
    {
      id: "sdr-process-guide",
      title: "SDR Process Guide",
      description: "Complete guide to qualifying leads, Salesforce best practices, and SDR workflows",
      funText: "Buy me a coffee ☕",
      icon: "Compass",
      donationIcon: "Coffee",
      link: "/downloads/sdr-process-guide",
    },
    {
      id: "media-server-guide",
      title: "Complete Media Server Setup Guide",
      description: "Step-by-step guide to building your own Unraid media server with Plex",
      funText: "Buy me a pizza 🍕",
      icon: "Tv",
      donationIcon: "Pizza",
      link: "/downloads/media-server-guide",
    },
    {
      id: "sales-email-playbook",
      title: "Enterprise Sales Email Playbook",
      description: "Proven outbound campaigns to cut through noise and drive enterprise pipeline.",
      funText: "Buy me a sandwich 🥪",
      icon: "Mail",
      donationIcon: "Sandwich",
      link: "/sales-playbook",
    },
      {
      id: "launchpad",
      title: "Digital Identity Launchpad",
      description: "Launch your professional presence with a website just like this one!",
      funText: "Help pay my Mortgage 🏠",
      icon: "Rocket",
      donationIcon: "Home",
      link: "/launchpad",
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

          {/* Premium Resources Section */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {guides.map((guide) => {
                // @ts-ignore
                const Icon = iconMap[guide.icon] || FileText
                // @ts-ignore
                const DonationIcon = donationIconMap[guide.donationIcon] || Heart

                return (
                  <Link key={guide.id} href={guide.link}>
                    <Card className="bg-[#111827] border-slate-800 shadow-xl hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 cursor-pointer group h-full flex flex-col p-2">
                      <CardHeader className="flex-1 p-6">
                        <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-900/20 transition-colors">
                            <Icon className="w-6 h-6 text-blue-500" />
                        </div>
                        <CardTitle className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {guide.title}
                        </CardTitle>
                        <CardDescription className="text-slate-400 text-sm leading-relaxed">
                          {guide.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-0 pb-4 px-6 mt-auto flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-slate-400 group-hover:text-slate-300 transition-colors">
                            <DonationIcon className="w-4 h-4 text-slate-500" />
                            {guide.funText}
                        </span>
                        <div className="flex items-center gap-1.5 text-blue-500 font-medium opacity-100 transition-opacity">
                            <Heart className="w-4 h-4" />
                            <span>View Guide</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* AI Tools Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-8 text-center">AI Assist Tools</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {aiTools.map((tool) => {
                // @ts-ignore
                const Icon = iconMap[tool.icon] || Sparkles
                return (
                  <Link key={tool.id} href={tool.link}>
                    <Card className="glass border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-full hover:bg-white/50 dark:hover:bg-slate-800/50">
                      <CardHeader>
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <CardTitle className="text-lg text-slate-900 dark:text-slate-50">{tool.title}</CardTitle>
                        <CardDescription className="text-slate-700 dark:text-slate-300">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Utility Tools Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-8 text-center">Free Utilities</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {utilityTools.map((tool) => {
                // @ts-ignore
                const Icon = iconMap[tool.icon] || FileText
                return (
                  <Link key={tool.id} href={tool.link}>
                    <Card className="glass border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-full hover:bg-white/50 dark:hover:bg-slate-800/50">
                      <CardHeader>
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <CardTitle className="text-lg text-slate-900 dark:text-slate-50">{tool.title}</CardTitle>
                        <CardDescription className="text-slate-700 dark:text-slate-300">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
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
