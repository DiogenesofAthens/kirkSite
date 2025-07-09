"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Heart,
  Download,
  CheckCircle,
  Users,
  Shield,
  Star,
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
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
              {/* Donation CTA */}
              <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-4 max-w-xl mx-auto">
                  This playbook took serious time, testing, and enterprise polish. If it helps you win deals — why not buy me lunch 🥪?
                </p>
                <Link href="/sales-playbook/confirm">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 py-4 shadow-lg hover:shadow-xl transition-all dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    <Download className="w-5 h-5 mr-3" />
                    Donate $20 via PayPal
                  </Button>
                </Link>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
                  Opens PayPal in a new tab. Return here to unlock your download.
                </p>
              </div>

              {/* What’s Inside */}
              <div className="bg-fuchsia-800/90 text-white rounded-xl p-6">
                <h3 className="text-2xl font-bold text-center mb-3">What’s Inside</h3>
                <p className="text-sm text-purple-100 text-center max-w-2xl mx-auto mb-4">
                  This 25-page playbook includes 20 sequenced B2B email campaigns, each with 5 ready-to-send messages. Proven formats for cold outreach, upsell, renewal saves, referrals, Q4 closes, and more.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-100 font-medium">
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

              {/* Testimonial */}
              <div className="bg-slate-900/80 text-white p-6 rounded-xl border border-slate-700 text-center">
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-base italic max-w-xl mx-auto mb-2">
                  “Used Campaign #4 for a competitor takeaway — got a meeting in 2 hours. This thing works.”
                </blockquote>
                <p className="text-sm text-slate-400">— Maya S., Enterprise AE</p>
              </div>

              {/* Footer */}
              <div className="text-center space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This resource includes proven messaging tested in real enterprise sales cycles.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Questions?{" "}
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
