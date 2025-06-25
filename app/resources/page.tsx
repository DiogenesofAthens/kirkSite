"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Video, BookOpen, Coffee, Beer, Heart, Calculator } from "lucide-react"
import Link from "next/link"
import { resourceConfigs } from "@/lib/resource-config"

const iconMap = {
  FileText,
  BookOpen,
  Calculator,
}

const donationIconMap = {
  Coffee,
  Beer,
  Heart,
}

export default function Resources() {
  const guides = Object.values(resourceConfigs).map((resource) => ({
    id: resource.id,
    title: resource.title,
    description: resource.description,
    funText: resource.funText,
    icon: resource.id === "roi-calculator" ? "Calculator" : "FileText",
    donationIcon: resource.funText.includes("coffee") ? "Coffee" : resource.funText.includes("beer") ? "Beer" : "Heart",
    link: `/downloads/${resource.id}/confirm`,
  }))

  const freeResources = [
    {
      title: "Website Optimization Checklist",
      description: "Essential steps for improving website performance and user experience",
      icon: Video,
    },
    {
      title: "Process Optimization Framework",
      description: "Step-by-step approach to identifying and improving business processes",
      icon: BookOpen,
    },
  ]

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">Resources</h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-4">
              Helpful tools, guides, and insights for business technology and sales optimization
            </p>
          </div>

          {/* Guides Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-8">Guides</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {guides.map((guide) => {
                const Icon = iconMap[guide.icon as keyof typeof iconMap]
                const DonationIcon = donationIconMap[guide.donationIcon as keyof typeof donationIconMap]
                return (
                  <Link key={guide.id} href={guide.link}>
                    <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                      <CardHeader>
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <CardTitle className="text-xl text-slate-900 dark:text-slate-50">{guide.title}</CardTitle>
                        <CardDescription className="text-slate-700 dark:text-slate-300">
                          {guide.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                            <DonationIcon className="w-4 h-4" />
                            {guide.funText}
                          </span>
                          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm font-medium">View Guide</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Free Resources */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-8">Free Resources</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {freeResources.map((resource, index) => {
                const Icon = resource.icon
                return (
                  <Card
                    key={index}
                    className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  >
                    <CardHeader>
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <CardTitle className="text-xl text-slate-900 dark:text-slate-50">{resource.title}</CardTitle>
                      <CardDescription className="text-slate-700 dark:text-slate-300">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download Free
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="glass rounded-3xl p-8 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Stay Updated</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
              Get the latest resources, insights, and best practices delivered to your inbox monthly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
