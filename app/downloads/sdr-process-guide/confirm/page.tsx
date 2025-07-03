"use client"

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Heart, AlertTriangle, ExternalLink, CheckCircle } from "lucide-react"

export default function ConfirmDownload() {
  const [showSecondChance, setShowSecondChance] = useState(false)
  const [hasDonated, setHasDonated] = useState(false)
  const [showFreeDownload, setShowFreeDownload] = useState(false)

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/downloads/sdr-process-guide.pdf"
    link.download = "sdr-process-guide.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFreeRequest = () => {
    const confirmed = window.confirm(
      "Are you sure you want to skip the donation? This resource took significant time and effort to create. Your support helps me create more valuable content.",
    )
    if (confirmed) {
      setShowSecondChance(true)
    }
  }

  const paypalLink = "https://paypal.me/grantglazer/10"

  const handleDonate = () => {
    window.open(paypalLink, "_blank")
    setHasDonated(true)
  }

  // LAST CHANCE SCREEN (I'm special flow)
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
                  I really appreciate your interest in my work. One more opportunity to show your support?
                </p>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-8 dark:bg-gradient-to-r dark:from-blue-900 dark:to-blue-800 dark:border-blue-700">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-3">
                    Your Support Makes a Difference
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-4 text-sm leading-relaxed">
                    Creating quality resources takes time, research, and effort. Your donation helps me:
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
                    Donate $10 via PayPal
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <div className="flex flex-col items-center mt-4">
                    <Button
                      onClick={() => setShowFreeDownload(true)}
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-slate-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900 font-semibold"
                    >
                      Just give it to me already!
                    </Button>
                  </div>
                  {showFreeDownload && (
                    <div className="mt-6">
                      <Button
                        onClick={handleDownload}
                        size="lg"
                        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold dark:bg-green-500 dark:hover:bg-green-600"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download This File
                      </Button>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-3 italic">
                        Thank you for your interest! Please consider sharing this resource with others who might find it valuable.
                      </p>
                    </div>
                  )}
                  <p className="text-sm text-slate-500 dark:text-slate-500 italic mt-3">
                    Opens PayPal in a new tab - then return here to download
                  </p>
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

  // MAIN SCREEN
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
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                SDR Process Guide
              </CardTitle>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Complete guide to qualifying leads, Salesforce best practices, and SDR workflows
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-8 dark:bg-gradient-to-r dark:from-blue-900 dark:to-blue-800 dark:border-blue-700">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-red-500" />
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Support This Work</h2>
                </div>

                <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg leading-relaxed">
                  This comprehensive 25+ page guide represents hours of research and real-world experience. Your support helps me create more valuable resources like this.
                </p>

                <Button
                  onClick={handleDonate}
                  size="lg"
                  className="w-full sm:w-auto px-4 py-3 sm:px-12 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg mb-4 shadow-lg hover:shadow-xl transition-all dark:bg-blue-800 dark:hover:bg-blue-900 rounded-lg"
                >
                  Donate $10 via PayPal
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-sm text-slate-500 dark:text-slate-500 italic">
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
                    You can now download your SDR Process Guide below.
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
                  What's Inside This Guide:
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-slate-300">
                  <ul className="space-y-1">
                    <li>• Managing Salesforce Queue & Lead Status</li>
                    <li>• Call Templates & Sales Scripts</li>
                    <li>• Qualifying Questions by Role</li>
                    <li>• Email Templates for Every Scenario</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Lead Conversion Best Practices</li>
                    <li>• Outlook Calendar Integration</li>
                    <li>• Duplicate Management Process</li>
                    <li>• 25+ Email Templates Ready to Use</li>
                  </ul>
                </div>
              </div>

              {/* Additional Info */}
              <div className="text-center space-y-2">
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  This guide includes real templates and processes used at successful SaaS companies.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Questions?{" "}
                  <a
                    href="mailto:grant@grantglazer.com"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400"
                  >
                    Contact Grant
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
