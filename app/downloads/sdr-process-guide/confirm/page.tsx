"use client"

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Heart, AlertTriangle, DollarSign, CheckCircle } from "lucide-react"

export default function ConfirmDownload() {
  const [showSecondChance, setShowSecondChance] = useState(false)
  const [pdfFile, setPdfFile] = useState<string | null>(null)
  const [fileName, setFileName] = useState("sdr-process-guide.pdf")

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
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 dark:border dark:border-slate-800">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-slate-900 mb-2 dark:text-slate-50">
                  Last Chance to Support
                </CardTitle>
                <p className="text-lg text-slate-600 leading-relaxed dark:text-slate-400">
                  I really appreciate your interest in my work. One more opportunity to show your support?
                </p>
              </CardHeader>

              <CardContent className="text-center space-y-6">
                {/* Final Donation Appeal */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6 dark:bg-gradient-to-r dark:from-orange-900 dark:to-red-900 dark:border-orange-700">
                  <h3 className="font-semibold text-slate-900 mb-3 dark:text-slate-50">
                    Your Support Makes a Difference
                  </h3>
                  <p className="text-slate-700 mb-4 text-sm leading-relaxed dark:text-slate-300">
                    Creating quality resources takes time, research, and effort. Your donation helps me:
                  </p>
                  <ul className="text-left max-w-md mx-auto space-y-1 text-sm text-slate-600 mb-4 dark:text-slate-400">
                    <li>• Continue creating valuable content</li>
                    <li>• Keep resources updated and relevant</li>
                    <li>• Develop new guides and tools</li>
                    <li>• Maintain this website and platform</li>
                  </ul>
                  <Button
                    onClick={() => window.open("https://paypal.me/grantglazer/10", "_blank")}
                    size="lg"
                    className="w-full max-w-xs mx-auto block bg-orange-600 hover:bg-orange-700 text-white font-semibold mb-4 dark:bg-orange-800 dark:hover:bg-orange-900 text-base md:text-lg rounded-lg px-8 py-3 transition-colors duration-200"
                  >
                    Donate $10 via PayPal
                  </Button>
                </div>

                {/* Final Free Download */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 dark:bg-slate-800 dark:border-slate-700">
                  <p className="text-slate-600 mb-4 text-sm dark:text-slate-400">
                    I understand everyone's situation is different. If you truly can't donate right now, that's okay.
                  </p>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="lg"
                    className="w-full max-w-xs mx-auto block border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-50 text-base md:text-lg rounded-lg px-8 py-3 transition-colors duration-200"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Just give it to me already!
                  </Button>
                  <p className="text-xs text-slate-500 mt-3 italic dark:text-slate-500">
                    Please consider sharing this resource with others who might find it valuable.
                  </p>
                </div>

                {/* Thank You Note */}
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
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 dark:border dark:border-slate-800">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-900 mb-2 dark:text-slate-50">
                SDR Process Guide
              </CardTitle>
              <p className="text-lg text-slate-600 leading-relaxed dark:text-slate-400">
                Complete guide to qualifying leads, Salesforce best practices, and SDR workflows
              </p>
            </CardHeader>

            <CardContent className="text-center space-y-8">
              {/* PROMINENT DONATION SECTION - FRONT AND CENTER */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-xl p-8 dark:bg-gradient-to-r dark:from-blue-900 dark:to-green-900 dark:border-blue-700">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-red-500" />
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Support This Work</h2>
                </div>
                <p className="text-slate-700 mb-6 text-lg leading-relaxed dark:text-slate-300">
                  This comprehensive 25+ page guide represents hours of research and real-world experience. Your support helps me create more valuable resources like this.
                </p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <span className="text-3xl font-bold text-slate-900 dark:text-slate-50">$10</span>
                  <span className="text-slate-600 text-lg dark:text-slate-400">suggested donation</span>
                </div>
                <Button
                  onClick={() => window.open("https://paypal.me/grantglazer/10", "_blank")}
                  size="lg"
                  className="w-full max-w-xs mx-auto block bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-12 py-4 mb-4 shadow-lg hover:shadow-xl transition-all dark:bg-blue-800 dark:hover:bg-blue-900 rounded-lg"
                >
                  Donate $10 via PayPal
                </Button>
                <p className="text-sm text-slate-500 italic dark:text-slate-500">
                  Opens PayPal in a new tab - then return here to download
                </p>
              </div>

              {/* Download Options */}
              <div className="space-y-4">
                {/* Donation Confirmation */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 dark:bg-green-900 dark:border-green-700">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center justify-center gap-2 dark:text-slate-50">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Already donated? Download now!
                  </h3>
                  <p className="text-slate-700 mb-4 text-sm dark:text-slate-300">
                    If you completed your PayPal donation, click below to download your guide.
                  </p>
                  <Button
                    onClick={handleDownload}
                    size="lg"
                    className="w-full max-w-xs mx-auto block bg-green-600 hover:bg-green-700 text-white font-semibold dark:bg-green-800 dark:hover:bg-green-900 text-base md:text-lg rounded-lg px-8 py-3 transition-colors duration-200"
                  >
                    <Download className="w-4 h-4 mr-2" />I Donated - Download Now
                  </Button>
                </div>

                {/* Alternative Option */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 dark:bg-slate-800 dark:border-slate-700">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50">Can't donate right now?</h3>
                  </div>
                  <p className="text-slate-600 mb-4 text-sm dark:text-slate-400">
                    That's okay! Everyone's situation is different.
                  </p>
                  <Button
                    onClick={handleFreeRequest}
                    variant="outline"
                    size="lg"
                    className="w-full max-w-xs mx-auto block border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-50 text-base md:text-lg rounded-lg px-8 py-3 transition-colors duration-200"
                  >
                    No, I'm special and I deserve it for free
                  </Button>
                </div>
              </div>

              {/* What's Included Preview */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left dark:bg-blue-900 dark:border-blue-700">
                <h3 className="font-semibold text-slate-900 mb-3 text-center dark:text-slate-50">
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
