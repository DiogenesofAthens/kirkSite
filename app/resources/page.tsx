"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GameSelector } from "@/components/game-selector"
import { FileText, Coffee, Beer, Heart, Calculator, Mail, QrCode, Clock, DollarSign, Sparkles, Code2, Home, Rocket, Crown, ExternalLink } from "lucide-react"
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
  HomeIcon: Home
}

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
      link: "/downloads/sdr-process-guide",
    },
    {
      id: "media-server-guide",
      title: "Complete Media Server Setup Guide",
      description: "Step-by-step guide to building your own Unraid media server with Plex",
      funText: "Buy me a pizza 🍕",
      icon: "FileText",
      donationIcon: "Heart",
      link: "/downloads/media-server-guide",
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
      {
      id: "launchpad",
      title: "Digital Identity Launchpad",
      description: "Launch your professional presence with a website just like this one!",
      funText: "Help pay my Mortgage 🏠",
      icon: "FileText",
      donationIcon: "Heart",
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
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-8 text-center flex items-center justify-center gap-2">
              <Crown className="w-6 h-6 text-yellow-500" />
              Premium Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {guides.map((guide) => {
                // @ts-ignore
                const Icon = iconMap[guide.icon] || FileText
                // @ts-ignore
                const DonationIcon = donationIconMap[guide.donationIcon] || Heart

                return (
                  <Link key={guide.id} href={guide.link}>
                    <Card className="glass border-2 border-yellow-500/10 dark:border-yellow-500/5 shadow-xl hover:shadow-2xl hover:border-yellow-500/30 transition-all duration-300 cursor-pointer group h-full hover:bg-white/60 dark:hover:bg-slate-800/60 flex flex-col">
                      <CardHeader className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                           <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                             <Icon className="w-6 h-6 text-yellow-700 dark:text-yellow-500" />
                           </div>
                           {guide.id === 'launchpad' && (
                             <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                               Featured
                             </span>
                           )}
                        </div>
                        <CardTitle className="text-xl text-slate-900 dark:text-slate-50 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {guide.title}
                        </CardTitle>
                        <CardDescription className="text-slate-700 dark:text-slate-300 line-clamp-3">
                          {guide.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-0 pb-6 px-6">
                         <div className="w-full flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                            <span className="flex items-center gap-1.5">
                              <DonationIcon className="w-3.5 h-3.5 text-pink-500" />
                              {guide.funText}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
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
