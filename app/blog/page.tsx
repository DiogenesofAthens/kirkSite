"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, ArrowRight, Mail } from "lucide-react"
import Link from "next/link"
import { submitContactForm } from "@/app/actions/contact"
import { useState, useEffect } from "react"
import Lottie from "lottie-react"

export default function Blog() {
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: "", answer: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptchaQuestion({
      question: `What is ${num1} + ${num2}?`,
      answer: num1 + num2,
    })
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleContactSubmit = async (formData: FormData) => {
    const captchaAnswer = formData.get("captcha") as string

    if (Number.parseInt(captchaAnswer) !== captchaQuestion.answer) {
      alert("Please solve the captcha correctly.")
      return
    }

    formData.append("source", "Blog Page")
    setIsSubmitting(true)

    try {
      const result = await submitContactForm(formData)
      alert(result.message)
      const form = document.querySelector("form") as HTMLFormElement
      form?.reset()
      generateCaptcha()
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <FloatingNav />
<TimezoneClock />

{/* Blog Animation */}
<div className="pt-20 pb-6 flex justify-center">
  <div className="w-40 sm:w-48 md:w-56">
    <Lottie animationData={require("@/public/images/blog-ani.json")} loop autoplay />
  </div>
</div>
      </div>

      <div className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">Blog</h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-4">
              Insights on business technology, sales optimization, and industry trends
            </p>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-medium italic">
              "Solving business problems with smart processes, strategic thinking, and hands-on tech know-how."
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.slug} className="relative group">
                <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="secondary"
                        className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date + "T12:00:00").toLocaleDateString()}
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-slate-900 dark:text-slate-50">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:underline focus:underline focus:outline-none"
                        tabIndex={0}
                        aria-label={post.title}
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                <Link
                  href={`/blog/${post.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={`Read full post: ${post.title}`}
                  tabIndex={-1}
                />
              </div>
            ))}
          </div>

          {/* Contact Me Section */}
          <div className="mt-16 glass rounded-3xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Let's Connect</h2>
              <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
                Found these insights helpful? Have questions about implementing these strategies in your organization?
                I'd love to discuss how these concepts can be applied to your specific business challenges.
              </p>
            </div>

            <form action={handleContactSubmit} className="max-w-md mx-auto space-y-4">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name *"
                  required
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600"
                />
              </div>

              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email *"
                  required
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600"
                />
              </div>

              <div>
                <Input
                  name="company"
                  placeholder="Company (Optional)"
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600"
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="What would you like to discuss? *"
                  required
                  rows={4}
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2 text-slate-700 dark:text-slate-300">
                  Security Check: {captchaQuestion.question}
                </label>
                <Input
                  name="captcha"
                  type="number"
                  placeholder="Answer"
                  required
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600"
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Start the Conversation
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
