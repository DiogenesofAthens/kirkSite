"use client"

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ExternalLink, Download } from "lucide-react"

export default function SalesPlaybookConfirmPage() {
  const [showDownload, setShowDownload] = useState(false)

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/downloads/Enterprise Sales Email Playbook.pdf"
    link.download = "Enterprise Sales Email Playbook.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFreeClick = () => {
    setShowDownload(true)
    setTimeout(() => {
      handleDownload()
    }, 300)
  }

  const paypalLink = "https://paypal.me/kirkwessman/20"

  return (
    <div className="min-h-screen gradient-bg relative">
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
                I really appreciate your interest in the Enterprise Sales Email Playbook. One more opportunity to show your support?
              </p>
            </CardHeader>

            <CardContent className="text-center space-y-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 dark:bg-blue-900 dark:border-blue-700 text-slate-700 dark:text-slate-300">
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">
                  Your Support Makes a Difference
                </h3>
                <p className="text-sm mb-4">
                  Creating this Playbook took serious time, testing, and a few too many late nights. Your donation helps me:
                </p>
                <ul className="text-left max-w-md mx-auto space-y-1 text-sm">
                  <li>• Keep resources updated and relevant</li>
                  <li>• Build more high-value playbooks</li>
                  <li>• Share expert content freely</li>
                  <li>• Maintain this site + tools</li>
                </ul>

                <Button
                  onClick={() => {
                    window.open(paypalLink, "_blank")
                  }}
                  size="lg"
                  className="mt-6 w-full sm:w-auto px-4 py-3 sm:px-12 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all dark:bg-blue-800 dark:hover:bg-blue-900 rounded-lg"
                >
                  Donate $20 via PayPal
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>

                <div className="flex flex-col items-center mt-6">
                  <Button
                    onClick={handleFreeClick}
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-slate-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900 font-semibold"
                  >
                    Just give it to me already!
                  </Button>
                </div>

                {showDownload && (
                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
                    Download should start shortly. If not, <span className="underline cursor-pointer" onClick={handleDownload}>click here</span>.
                  </p>
                )}

                <p className="text-sm text-slate-500 dark:text-slate-400 italic mt-4">
                  Opens PayPal in a new tab — then return here to download.
                </p>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Either way, thanks for checking out this resource. Go close some pipeline 💼
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
