"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ApiProductLessons() {
  const content = {
    title: "Lessons from Managing API Products at S&P Global",
    category: "Product Management",
    readTime: "7 min read",
    publishDate: "2026-01-05",
    body: [
      {
        type: "markdown",
        text: `# Lessons from Managing API Products at S&P Global

I spent six years at S&P Global, the last three as Associate Director of Product Management for their enterprise data-feed and API platforms. These were products with eight-figure recurring revenue, serving some of the world's largest financial institutions. Here's what that experience taught me — and how it made me a better solutions engineer.`
      },
      {
        type: "markdown",
        text: `## Your Biggest Clients Are Also Your Biggest Product Managers

When your customers are Goldman Sachs and BlackRock, they don't just consume your API — they have opinions about it. Strong opinions. And they're usually right.

The best product decisions I made came from sitting in rooms with the people who actually used our feeds every day. Not from roadmap planning sessions, not from competitive analysis, but from understanding what was costing them time, what was breaking their workflows, and what they'd build themselves if they could.`
      },
      {
        type: "markdown",
        text: `## Pricing Is Product

One of the least appreciated aspects of API product management is pricing. It's not a commercial exercise — it's a design decision. How you price determines how people use your product, what they value, and what they build on top of it.

At S&P, pricing a data feed wasn't just about revenue. It was about aligning incentives. Price per call? Per dataset? Per seat? Each model creates different behavior, different adoption patterns, and different support loads. Getting this wrong is expensive in ways that don't show up for months.`
      },
      {
        type: "markdown",
        text: `## Reliability Is the Feature

Nobody calls you when your API is working. They call when it's not. And when you're delivering market data to trading desks, "not working" has a cost measured in real dollars per minute.

This made me obsessive about reliability in a way that's served me well ever since. When I'm architecting a solution at Conga now, I think about failure modes first. What breaks? What's the fallback? What does the customer see when something goes wrong? Those questions come from managing a product where downtime had a price tag.`
      },
      {
        type: "markdown",
        text: `## What Transferred to Solutions Engineering

Product management and solutions engineering share more DNA than people think. Both require you to translate between technical and business stakeholders. Both require you to scope what's possible against what's valuable. Both require you to say "no" to things that sound good but don't serve the customer's actual problem.

The biggest thing that transferred: the discipline of listening before building. In PM, you do user research before writing a spec. In SE, you do discovery before building a demo. The skill is the same — understanding the system before you try to change it.`
      },
      {
        type: "markdown",
        text: `## The Takeaway

If you're in solutions engineering and you get a chance to do a rotation in product management — take it. And if you're in PM considering a move to the field — you'll find that the skills translate more directly than you'd expect. The best technical people I know understand both the product and the problem. That understanding doesn't come from one side of the table.`
      }
    ]
  }

  function renderBody() {
    return content.body.map((block, index) =>
      block.text.split("\n").map((line, i) => {
        if (line.startsWith("# ")) return <h1 key={`${index}-${i}`} className="text-3xl font-bold mt-8 mb-4">{line.slice(2)}</h1>
        if (line.startsWith("## ")) return <h2 key={`${index}-${i}`} className="text-2xl font-bold mt-6 mb-3">{line.slice(3)}</h2>
        if (line.startsWith("### ")) return <h3 key={`${index}-${i}`} className="text-xl font-bold mt-4 mb-2">{line.slice(4)}</h3>
        if (line.startsWith("- ")) return <li key={`${index}-${i}`} className="ml-4 list-disc">{line.slice(2)}</li>
        if (line.trim() === "") return <br key={`${index}-${i}`} />
        return <p key={`${index}-${i}`} className="mb-4 leading-relaxed">{line}</p>
      })
    )
  }

  return (
    <div className="min-h-screen gradient-bg">
      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <Card className="glass border-0 shadow-sm mb-8">
            <CardContent className="p-8">
              <Badge variant="secondary" className="mb-4">{content.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 dark:text-gray-100">{content.title}</h1>
              <div className="flex items-center gap-6 text-sm text-slate-600 mb-6 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(content.publishDate + "T12:00:00").toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {content.readTime}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-0 shadow-sm mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none dark:text-gray-400 dark:prose-invert whitespace-pre-wrap">
                {renderBody()}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <Link href="/blog" className="text-amber-700 hover:text-amber-800">
              &larr; Back to all posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
