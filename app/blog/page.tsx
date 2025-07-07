"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, Mail } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Lottie from "lottie-react"
import { ContactModal } from "@/components/contact-modal"

export default function Blog() {
  const [showContactForm, setShowContactForm] = useState(false)





  const blogPosts = [
    {
      title: "From Scripts to Speedtest Tracker: How I Monitor My Internet Like a Pro (2025 Edition)",
      excerpt:
        "From using a Raspberry Pi, IFTTT and Google sheets in 2017 to using Docker and Unraid today. Here's how you can log your internet speeds too.",
      date: "2025-05-24",
      readTime: "9 min read",
      category: "Home Networking",
      slug: "speedtest-tracker",
    },
    {
      title: "The Future of SaaS Sales: Trends to Watch in 2024",
      excerpt:
        "Exploring emerging trends in software sales and how businesses can adapt to changing customer expectations.",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Sales",
      slug: "future-of-saas-sales-2024",
    },
    {
      title: "Optimizing Enterprise Technology Implementations",
      excerpt: "Best practices for successful technology rollouts in large organizations, from planning to execution.",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Technology",
      slug: "optimizing-enterprise-tech-implementations",
    },
    {
      title: "Selling Enterprise Contract Management Software: Strategy, Discovery, and Results",
      excerpt: "How to uncover pain, match solutions to problems, and deliver ROI with modern CLM platforms.",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Enterprise Sales",
      slug: "enterprise-contract-sales-processes",
    },
  ]

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>






      <FloatingNav />
      <TimezoneClock />









      <div className="pt-28 pb-2 flex justify-center">
        <div className="w-40 sm:w-48 md:w-56">
          <Lottie animationData={require("@/public/images/blog-ani.json")} loop autoplay />
        </div>
      </div>

      <div className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mt-2 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">Blog</h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-4">
              Insights on business technology, sales optimization, and industry trends
            </p>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-medium italic">
              "Solving business problems with smart processes, strategic thinking, and hands-on tech know-how."
            </p>
          </div>






















