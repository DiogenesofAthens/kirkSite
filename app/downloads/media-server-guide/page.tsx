import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Star, CheckCircle, Users, Shield } from "lucide-react"
import Link from "next/link"

export default function MediaServerGuidePage() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                Personal Media Server Setup Guide
              </CardTitle>
              <CardDescription className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                Build your own professional-grade media server from scratch. Includes hardware recommendations, software
                setup, and security best practices.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Key Features */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">6 Pages</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Comprehensive step-by-step guide</p>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">Beginner Friendly</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">No prior experience required</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">Security Focused</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Remote access best practices</p>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 text-center">
                  What You'll Learn
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Hardware Selection Guide
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Unraid Installation & Setup
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Docker Container Configuration
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Plex Media Server Optimization
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Remote Access with Cloudflared
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Automated Content Management
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Backup and Recovery Strategies
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      Troubleshooting Common Issues
                    </li>
                  </ul>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:bg-gradient-to-r dark:from-blue-900/30 dark:to-green-900/30 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg text-slate-700 dark:text-slate-300 italic text-center mb-4">
                  "Followed this guide step-by-step and now have an amazing home media setup. Worth every penny!"
                </blockquote>
                <div className="text-center text-slate-600 dark:text-slate-400">
                  <strong>David Kim</strong>
                  <br />
                  Software Engineer
                </div>
              </div>

              {/* Buy Button */}
              <div className="text-center space-y-3">
                <a href="https://ko-fi.com/s/305aedade0" target="_blank" rel="noopener noreferrer">
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
                  This guide includes real hardware recommendations and tested configurations.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Questions? <Link href="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 underline">Contact Kirk</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
