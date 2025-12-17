"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GameSelector } from "@/components/game-selector"
import { FileText, Coffee, Beer, Heart, Calculator, Mail, QrCode, Clock, DollarSign, Sparkles, Code2, Home } from "lucide-react"
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

export default function Resources() {
  const [showContactForm, setShowContactForm] = useState(false)

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
