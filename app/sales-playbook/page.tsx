"use client"

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ContactModal } from "@/components/contact-modal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Download,
  Heart,
  ExternalLink,
  CheckCircle,
  Star,
  FileText,
} from "lucide-react"

export default function SalesPlaybookPage() {
  const [hasDonated, setHasDonated] = useState(false)
  const [showSecondChance, setShowSecondChance] = useState(false)
  const [showFreeDownload, setShowFreeDownload] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  const fileUrl = "/downloads/Enterprise Sales Email Playbook.pdf"
  const paypalLink = "https://paypal.me/grantglazer/20"

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = fileUrl
    link.download = "Enterprise Sales Email Playbook.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDonate = () => {
    const newTab = window.open(paypalLink, "_blank")
    if (newTab) {
      newTab.focus()
      setHasDonated(true)
    }
  }

  const handleFreeRequest = () => {
    const confirmed = window.confirm(
      `Skip the $20 donation and still get the playbook?\n\nThis resource took real time and strategy to create — but if you truly can’t swing it, I’d rather you still have it.`
    )
    if (confirmed) {
      setShowSecondChance(true)
    }
  }

  if (showSecondChance) {
    return (
      <div className="min-h-screen gradient-bg relative">
        <FloatingNav />
        <TimezoneClock />

        <div className="pt-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/90 dark:bg-slate-800/90 border-0 shadow-xl backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold dark:text-white">
                  Last Chance to Support
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400 text-lg mt-2">
                  I appreciate your interest in the Playbook. Want to chip in before downloading?
                </p>
              </CardHeader>

              <CardContent className="text-center space-y-6">
                <Button
                  onClick={handleDonate}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 text-white text-lg font-semibold px-6 py-4"
                >
                  Donate $20 via PayPal
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setShowFreeDownload(true)}
                  className="text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900"
                >
                  Just give it to me already
                </Button>

                {showFreeDownload && (
                  <>
                    <Button
                      onClick={handleDownload}
                      className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white w-full sm:w-auto mt-4"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Playbook
                    </Button>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">
                      No guilt trip. Just go send better emails.
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg relative">
      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 dark:bg-slate-800/90 border-0 shadow-xl backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold dark:text-white">
                Enterprise Sales Email Playbook
              </CardTitle>
              <p className="text-slate-600 dark:text-slate-400 text-lg mt-2">
                20 campaigns. 100 emails. Zero fluff. Built for real replies and real revenue.
              </p>
            </CardHeader>

            <CardContent className="text-center space-y-8">
              {/* PayPal Donation */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-8">
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <p className="text-lg text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                  This playbook took serious time, testing, and enterprise polish. If it helps you win deals — why not support?
                </p>
                <Button onClick={handleDonate} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 text-white font-semibold px-6 py-3">
                  Donate $20 via PayPal
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-sm text-slate-500 dark:text-slate-400 italic mt-2">
                  PayPal opens in a new tab. Come back here to download.
                </p>
              </div>

              {/* Download Unlock */}
              {hasDonated && (
                <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-6">
                  <h3 className="text-slate-900 dark:text-white font-semibold mb-3 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Thanks for supporting!
                  </h3>
                  <Button
                    onClick={handleDownload}
                    className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Playbook
                  </Button>
                </div>
              )}

              {/* What’s Inside Section */}
              <div className="bg-gradient-to-br from-purple-700 to-purple-800 text-white p-6 rounded-xl border border-purple-600 shadow-inner">
                <h3 className="text-2xl font-semibold mb-4 text-center">What’s Inside</h3>
                <p className="text-sm text-purple-100 text-center max-w-lg mx-auto mb-4">
                  This 25-page playbook includes 20 sequenced B2B email campaigns, each with 5 ready-to-send messages. Proven formats for cold outreach, upsell, renewal saves, referrals, Q4 closes, and more.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm font-medium text-purple-100">
                  <ul className="space-y-1">
                    <li>• Cold Prospecting</li>
                    <li>• Upsell & Expansion</li>
                    <li>• Demo No-Show Recovery</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Post-Event Follow-Up</li>
                    <li>• Breakup & Referral Plays</li>
                    <li>• Industry: SaaS, Healthcare, Manufacturing</li>
                  </ul>
                </div>
              </div>

              {/* Single Testimonial */}
              <div className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-6 rounded-lg text-center">
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="italic text-slate-800 dark:text-slate-200 text-base mb-3 max-w-xl mx-auto">
                  “Used Campaign #4 for a competitor takeaway — got a meeting in 2 hours. This thing works.”
                </blockquote>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  — <strong>Maya S.</strong>, Enterprise AE
                </p>
              </div>

              {/* Can't Donate Section */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-6 rounded-lg text-center">
                <img
                  src="/images/emoji-sigh.png"
                  alt="Support optional"
                  className="w-8 h-8 mx-auto mb-3"
                />
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                  Can’t donate right now? Totally fine.
                </p>
                <Button variant="outline" onClick={handleFreeRequest}>
                  No, I’m special and I deserve it for free
                </Button>
              </div>

              {/* Contact */}
              <div className="text-center space-y-2 pt-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Want help using the playbook?{" "}
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
                    aria-label="Contact Grant"
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
