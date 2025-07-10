"use client"

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Rocket, DollarSign, Star } from "lucide-react"
import Lottie from "lottie-react"
import rocketAni from "@/public/images/rocket-ani.json"

export default function DigitalIdentityLaunchpad() {
  const [showForm, setShowForm] = useState(false)

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
              <div className="w-24 h-24 mx-auto mb-6">
                <Lottie animationData={rocketAni} loop autoplay />
              </div>
              <CardTitle className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                Digital Identity Launchpad
              </CardTitle>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Your fast-track to a beautiful, personal web presence. Built by Grant. No fluff.
              </p>
            </CardHeader>

            <CardContent className="space-y-12">
              {/* What You Get */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">Homepage + Animated Headers</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Based on Grant's personal template</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">Resources + 2 Sample Blog Posts</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Game section + SEO-ready starter content</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <DollarSign className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">$1000 Flat</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Add-ons: $500 per resource / $100 per blog / $250 per change</p>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg text-slate-700 dark:text-slate-300 italic text-center mb-4">
                  "Grant built my site in a fraction of the time. Clean, professional, and I didn't lift a finger."
                </blockquote>
                <div className="text-center text-slate-600 dark:text-slate-400">
                  <strong>Happy Client</strong><br />
                  Consultant & Coach
                </div>
              </div>

              {/* CTA Button + Disclaimer */}
              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-12 py-4 shadow-lg hover:shadow-xl transition-all dark:bg-blue-500 dark:hover:bg-blue-600"
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm ? "Close Form" : "Sign Me Up!"}
                </Button>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
                  Work begins after payment is received and form is completed in full.
                </p>
              </div>

              {/* Form */}
              {showForm && (
                <form
                  action="/api/launchpad-form"
                  method="POST"
                  className="space-y-6 mt-8 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <Input name="name" placeholder="Full Name" required />
                  <Input name="email" type="email" placeholder="Email" required />
                  <Input name="linkedin" placeholder="LinkedIn Profile URL" required />
                  <Input name="domain" placeholder="Preferred Domain (if any)" />
                  <Textarea name="bio" placeholder="Tell me about yourself" rows={3} />
                  <Textarea name="goals" placeholder="What should your site say or do?" rows={3} />
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Do you want me to create paid resources or blog posts?
                  </label>
                  <Textarea name="extras" placeholder="Describe any extras you want me to create" rows={3} />
                  <label className="block text-xs text-slate-500 dark:text-slate-400">
                    Provide any public links or folders with your images/content for a discount.
                  </label>
                  <Input name="assets" placeholder="Google Drive / Dropbox / Image links (optional)" />
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Submit & Start My Launch
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
