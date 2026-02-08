"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ApiProductLessons() {
  const content = {
    title: "Lessons from Managing API Products at S&P Global",
    publishDate: "2026-01-05",
    readTime: "7 min read",
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
        if (line.startsWith("# ")) return <h1 key={`${index}-${i}`} className="text-4xl font-serif font-normal tracking-tight mt-12 mb-6">{line.slice(2)}</h1>
        if (line.startsWith("## ")) return <h2 key={`${index}-${i}`} className="text-2xl font-serif font-normal tracking-tight mt-10 mb-4">{line.slice(3)}</h2>
        if (line.startsWith("### ")) return <h3 key={`${index}-${i}`} className="text-xl font-serif font-normal tracking-tight mt-8 mb-3">{line.slice(4)}</h3>
        if (line.startsWith("- ")) return <li key={`${index}-${i}`} className="ml-6 list-disc text-muted-foreground leading-relaxed mb-3">{line.slice(2)}</li>
        if (line.trim() === "") return <br key={`${index}-${i}`} />
        return <p key={`${index}-${i}`} className="text-muted-foreground leading-relaxed mb-6">{line}</p>
      })
    )
  }

  return (
    <div className="min-h-screen">
      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 pb-20 px-6 sm:px-8 lg:px-12 relative">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-sm tracking-wide uppercase text-muted-foreground hover:text-foreground mb-12 inline-block transition-colors">
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Back to Portfolio
          </Link>

          <header className="mb-12">
            <h1 className="text-5xl font-serif font-normal tracking-tight mb-6">{content.title}</h1>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <time>{new Date(content.publishDate + "T12:00:00").toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              <span>{content.readTime}</span>
            </div>
          </header>

          <article className="prose prose-lg max-w-none">
            {renderBody()}
          </article>

          <div className="mt-12 pt-8 border-t border-muted">
            <Link href="/blog" className="text-sm tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors">
              &larr; Back to all posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
