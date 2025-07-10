"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Download,
  FileText,
  Star,
  CheckCircle,
  Users,
  Shield,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export default function SalesPlaybookPage() {
  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse dark:bg-blue-800/20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000 dark:bg-purple-800/20"></div>
      </div>

      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm dark:bg-slate-800/90 dark:border dark:border-slate-700">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                Enterprise Sales Email Playbook
              </CardTitle>
              <CardDescription className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                20 campaigns. 100 emails. Zero fluff. Built for real replies and real revenue.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Donation Box */}
              <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 text-slate-900 dark:text-white rounded-xl border border-blue-200 dark:border-blue-700">
                <div className="flex justify-center mb-3">
                  <span className="text-red-500 text-2xl">❤️</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Support This Work</h3>
                <p className="text-base mb-4">
                  This playbook took serious time, testing, and enterprise polish. If it helps you win deals — why not buy me lunch 🥪?
                </p>
                <Link href="https://www.paypal.com/donate/?hosted_button_id=Y7K2F2F6T8T3W" target="_blank">
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-3 shadow-md hover:shadow-xl transition-all"
                    >
                      <Download className="w-5 h-5 mr-3" />
                      Donate $20 via PayPal
                    </Button>
                  </div>
                </Link>
                <p className="text-sm text-blue-500 mt-3 italic">
                  Opens PayPal in a new tab – then return here to download
                </p>
              </div>

              {/* Can't Donate Box */}
              <div className="text-center p-6 bg-slate-900/80 text-white rounded-xl border border-slate-700">
                <AlertTriangle className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm mb-4">
                  Can’t donate right now? That’s okay! Everyone’s situation is different.
                  <br />
                  You’ll still get full access.
                </p>
                <Link href="/sales-playbook/confirm">
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-2"
                    >
                      No, I’m special and I deserve it for free
                    </Button>
                  </div>
                </Link>
              </div>

              {/* What's Inside */}
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 text-center">
                  What’s Inside
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 text-center mb-4 max-w-3xl mx-auto">
                  This 25-page playbook includes 20 sequenced B2B email campaigns, each with 5 ready-to-send messages. Proven formats for cold outreach, upsell, renewal saves, referrals, Q4 closes, and more.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Cold Prospecting
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Upsell & Expansion
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Demo No-Show Recovery
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Post-Event Follow-Up
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Breakup & Referral Plays
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Industry: SaaS, Healthcare, Manufacturing
                    </li>
                  </ul>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:bg-gradient-to-r dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg text-slate-700 dark:text-slate-300 italic text-center mb-4">
                  “Used Campaign #4 for competitor takeaway — got a meeting in 2 hours. This thing works.”
                </blockquote>
                <div className="text-center text-slate-600 dark:text-slate-400">
                  <strong>Maya S.</strong>
                  <br />
                  Enterprise AE
                </div>
              </div>

              {/* Footer */}
              <div className="text-center space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  This playbook includes real campaigns and messaging tested across hundreds of enterprise deals.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Questions?{' '}
                  <Link
                    href="/"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 underline"
                  >
                    Contact Grant
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
