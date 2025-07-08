// app/sales-playbook/page.tsx

"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ContactModal } from "@/components/contact-modal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Download,
  Heart,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Star,
  FileText,
} from "lucide-react"

export const metadata = {
  title: "Enterprise Sales Email Playbook – Gated Download",
  description:
    "20 high-performing B2B sales campaigns. 100 enterprise-ready emails. Real replies, sharp tone, and zero fluff.",
  openGraph: {
    title: "Enterprise Sales Email Playbook – Gated Download",
    description:
      "Download 20 sequenced campaigns designed for SDRs, AEs, and revenue teams. Sharp, witty, and built for conversion.",
    url: "https://yourdomain.com/sales-playbook",
    images: ["/images/sales-playbook-og.png"],
  },
}

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

  const testimonials = [
    {
      quote:
        "Used Campaign #4 for competitor takeaway — got a meeting in 2 hours. This thing works.",
      author: "Maya S.",
      title: "Enterprise AE",
    },
    {
      quote:
        "I’ve paid for playbooks before. None hit this level of tone, precision, and flexibility.",
      author: "Sean D.",
      title: "Growth Lead, Series B SaaS",
    },
    {
      quote:
        "Every SDR on my team is using this. It’s the new standard for cold email here.",
      author: "Christina L.",
      title: "SDR Manager",
    },
  ]

  const previewTopics = [
    "• Cold Prospecting",
    "• Demo No-Show Recovery",
    "• Upsell & Expansion",
    "• Post-Event Follow-Up",
    "• Breakup Emails",
    "• Industry: SaaS, Healthcare, Manufacturing",
  ]

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
                      className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white w-full sm:w-auto"
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

            <CardContent className="text-center space-y-6">
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

              <div className="border border-slate-200 dark:border-slate-700 p-6 rounded-lg bg-slate-50 dark:bg-slate-900">
                <AlertTriangle className="w-5 h-5 text-amber-600 mb-2" />
                <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                  Can’t donate right now? Totally fine.
                </p>
                <Button variant="outline" onClick={handleFreeRequest}>
                  No, I’m special and I deserve it for free
                </Button>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900 border border-purple-200 dark:border-purple-700 p-6 rounded-xl">
                <h3 className="text-slate-900 dark:text-white font-semibold mb-3">
                  What’s Inside
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300 text-left mx-auto max-w-md">
                  {previewTopics.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="overflow-x-auto snap-x flex gap-4 pt-6 pb-4">
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="min-w-[300px] snap-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex gap-1 mb-2 justify-center">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="italic text-slate-700 dark:text-slate-300">
                      “{t.quote}”
                    </blockquote>
                    <div className="text-xs mt-3 text-slate-500 dark:text-slate-400">
                      — <strong>{t.author}</strong>, {t.title}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center space-y-2">
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
