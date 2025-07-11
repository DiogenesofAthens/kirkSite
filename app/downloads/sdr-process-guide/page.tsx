import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Star, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SDRProcessGuidePage() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                SDR Process Guide
              </CardTitle>
              <CardDescription className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                Complete guide to qualifying leads, Salesforce best practices, and SDR workflows
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 text-center">
                  What You'll Learn
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Managing Salesforce Queue & Lead Status
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Call Templates & Sales Scripts
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Qualifying Questions by Role
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Email Templates for Every Scenario
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Lead Conversion Best Practices
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Outlook Calendar Integration
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Duplicate Management Process
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      25+ Email Templates Ready to Use
                    </li>
                  </ul>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-r from-indigo-50 to-pink-50 dark:bg-gradient-to-r dark:from-indigo-900/30 dark:to-pink-900/30 border border-indigo-200 dark:border-indigo-700 rounded-xl p-6">
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg text-slate-700 dark:text-slate-300 italic text-center mb-4">
                  "This guide helped streamline my entire SDR onboarding process—seriously a game changer."
                </blockquote>
                <div className="text-center text-slate-600 dark:text-slate-400">
                  <strong>Alex Martinez</strong>
                  <br />
                  Sales Enablement Manager
                </div>
              </div>

              {/* Buy Button */}
              <div className="text-center space-y-3">
                <a href="https://ko-fi.com/s/c8409694f8" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    ❤️ Access This Guide
                  </Button>
                </a>
                <p className="text-sm text-slate-500 dark:text-slate-500">Buy me a pizza! 🍕</p>
              </div>

              {/* Additional Info */}
              <div className="text-center space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  This 25-page guide represents hours of research and real-world experience. Your support helps me create more valuable resources like this.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Questions? <Link href="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 underline">Contact Grant</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
