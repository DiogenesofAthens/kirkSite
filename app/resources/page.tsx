"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GameSelector } from "@/components/game-selector"
import { FileText, Coffee, Beer, Heart, Calculator, Mail } from "lucide-react"
import Link from "next/link"
import { submitContactForm } from "@/app/actions/contact"
import { useState, useEffect } from "react"
import Lottie from "lottie-react"
import animationData from "@/public/images/resources-ani.json"

const iconMap = {
  FileText,
  Calculator,
}

const donationIconMap = {
  Coffee,
  Beer,
  Heart,
}

export default function Resources() {
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: "", answer: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptchaQuestion({
      question: `What is ${num1} + ${num2}?`,
      answer: num1 + num2,
    })
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleContactSubmit = async (formData: FormData) => {
    const captchaAnswer = formData.get("captcha") as string

    if (Number.parseInt(captchaAnswer) !== captchaQuestion.answer) {
      alert("Please solve the captcha correctly.")
      return
    }

    formData.append("source", "Resources Page")
    setIsSubmitting(true)

    try {
      const result = await submitContactForm(formData)
      alert(result.message)
      const form = document.querySelector("form") as HTMLFormElement
      form?.reset()
      generateCaptcha()
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

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
  ]

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <FloatingNav />
      <TimezoneClock />

      {/* Resources Animation */}
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

          {/* Guides Section */}
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

          {/* For Fun Section */}
          <div className="mb-16">
            <GameSelector />
          </div>

          {/* Contact Me Section */}
          <div className="glass rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Get In Touch</h2>
              <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
                Have questions about business technology, sales optimization, or need consulting help? I'd love to hear
                from you and discuss how I can help solve your challenges.
              </p>
            </div>

            <form action={handleContactSubmit} className="max-w-md mx-auto space-y-4">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name *"
                  required
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600"
                />
              </div>

              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email *"
                  required
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600"
                />
              </div>

              <div>
                <Input
                  name="company"
                  placeholder="Company (Optional)"
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600"
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="How can I help you? *"
                  required
                  rows={4}
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2 text-slate-700 dark:text-slate-300">
                  Security Check: {captchaQuestion.question}
                </label>
                <Input
                  name="captcha"
                  type="number"
                  placeholder="Answer"
                  required
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600"
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
