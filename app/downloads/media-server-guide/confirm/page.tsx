"use client"
import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Heart, AlertTriangle, ExternalLink, CheckCircle, Star, FileText } from "lucide-react"
import { ContactModal } from "@/components/contact-modal"

export default function MediaServerGuideConfirm() {
  const [showSecondChance, setShowSecondChance] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [hasDonated, setHasDonated] = useState(false)

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/downloads/How I Built My Personal Media Server.pdf"
    link.download = "media-server-guide.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFreeRequest = () => {
    const confirmed = window.confirm(
      `Are you sure you want to skip the donation for the Media Server Guide? This resource took significant time and effort to create. Your support helps me create more valuable content.`,
    )
    if (confirmed) {
      setShowSecondChance(true)
    }
  }

  const paypalLink = `https://paypal.me/grantglazer/12`

  const handleDonate = () => {
    window.open(paypalLink, "_blank")
    setHasDonated(true)
  }

  if (showSecondChance) {
    return (
      <div className="min-h-screen gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse dark:bg-blue-800/20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000 dark:bg-purple-800/20"></div>
        </div>

        <FloatingNav />
        <TimezoneClock />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm dark:bg-slate-800/90 dark:border dark:border-slate-700">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                  Last Chance to Support
                </CardTitle>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  I really appreciate your interest in the Media Server Guide. One more opportunity to show your
                  support?
                </p>
              </CardHeader>

              <CardContent className="text-center space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-8 dark:bg-gradient-to-r dark:from-blue-900 dark:to-blue-800 dark:border-blue-700">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-3">
                    Your Support Makes a Difference
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-4 text-sm leading-relaxed">
                    Creating the Media Server Guide took significant research and real-world testing. Your donation
                    helps me:
                  </p>
                  <ul className="text-left max-w-md mx-auto space-y-1 text-sm text-slate-600 dark:text-slate-400 mb-4">
                    <li>• Continue creating valuable content</li>
                    <li>• Keep resources updated and relevant</li>
                    <li>• Develop new guides and tools</li>
                    <li>• Maintain this website and platform</li>
                  </ul>

                  <Button
                    onClick={handleDonate}
                    size="lg"
                    className="w-full sm:w-auto px-4 py-3 sm:px-12 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg mb-4 shadow-lg hover:shadow-xl transition-all dark:bg-blue-800 dark:hover:bg-blue-900 rounded-lg"
                  >
                    Donate $12 via PayPal
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>

                  <p className="text-sm text-slate-500 dark:text-slate-500 italic mt-3">
                    Opens PayPal in a new tab - then return here to download
                  </p>
                </div>

                {/* I'm special button always available */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 dark:bg-slate-900 dark:border-slate-700">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50">Can't donate right now?</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                    That's okay! Everyone's situation is different.
                  </p>

                  <Button
                    onClick={handleFreeRequest}
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    No, I'm special and I deserve it for free
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    Either way, thank you for your interest in improving your skills! 🚀
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse dark:bg-blue-800/20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000 dark:bg-purple-800/20"></div>
      </div>

      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm dark:bg-slate-800/90 dark:border dark:border-slate-700">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                Personal Media Server Setup Guide
              </CardTitle>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Build your own professional-grade media server from scratch. Includes hardware recommendations, software
                setup, and security best practices.
              </p>
            </CardHeader>

            <CardContent className="text-center space-y-8">
              {/* Blue Donate Section */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-8 dark:bg-gradient-to-r dark:from-blue-900 dark:to-blue-800 dark:border-blue-700">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-red-500" />
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Support This Work</h2>
                </div>

                <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg leading-relaxed">
                  This 6-page resource represents hours of research and real-world experience. Buy me a pizza 🍕
                </p>

                <Button
                  onClick={handleDonate}
                  size="lg"
                  className="w-full sm:w-auto px-4 py-3 sm:px-12 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg mb-4 shadow-lg hover:shadow-xl transition-all dark:bg-blue-800 dark:hover:bg-blue-900 rounded-lg"
                >
                  Donate $12 via PayPal
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-sm text-slate-500 dark:text-slate-500 italic mt-3">
                  Opens PayPal in a new tab - then return here to download
                </p>
              </div>

              {/* GREEN BOX: Only show after donation */}
              {hasDonated && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 dark:bg-green-900 dark:border-green-700">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-3 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Thanks for downloading!
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-4 text-sm">
                    You can now download your Media Server Guide below.
                  </p>
                  <Button
                    onClick={handleDownload}
                    size="lg"
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold dark:bg-green-500 dark:hover:bg-green-600"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download This File
                  </Button>
                </div>
              )}

              {/* I'm special button always available */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 dark:bg-slate-900 dark:border-slate-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50">Can't donate right now?</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                  That's okay! Everyone's situation is different.
                </p>

                <Button
                  onClick={handleFreeRequest}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  No, I'm special and I deserve it for free
                </Button>
              </div>

              {/* What's Included Preview */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left dark:bg-blue-900 dark:border-blue-700">
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-3 text-center">
                  What's Inside This 6-Page Guide:
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-slate-300">
                  <ul className="space-y-1">
                    <li>• Hardware Selection Guide</li>
                    <li>• Unraid Installation & Setup</li>
                    <li>• Docker Container Configuration</li>
                    <li>• Plex Media Server Optimization</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Remote Access with Cloudflared</li>
                    <li>• Automated Content Management</li>
                    <li>• Backup and Recovery Strategies</li>
                    <li>• Troubleshooting Common Issues</li>
                  </ul>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 dark:bg-gradient-to-r dark:from-purple-900 dark:to-blue-900 dark:border-purple-700">
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-slate-700 dark:text-slate-300 italic mb-3">
                  "Followed this guide step-by-step and now have an amazing home media setup. Worth every penny!"
                </blockquote>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  <strong>David Kim</strong>
                  <br />
                  Software Engineer
                </div>
              </div>

              {/* Additional Info */}
              <div className="text-center space-y-2">
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  This resource includes real hardware recommendations and tested configurations.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Questions?{" "}
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 underline"
                  >
                    Contact Grant
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </div>
  )
}
