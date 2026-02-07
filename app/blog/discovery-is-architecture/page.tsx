"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DiscoveryIsArchitecture() {
  const content = {
    title: "Discovery Is Architecture: Why the Best SEs Start with Questions, Not Demos",
    category: "Solutions Engineering",
    readTime: "6 min read",
    publishDate: "2026-01-15",
    body: [
      {
        type: "markdown",
        text: `# Discovery Is Architecture

The demo is the easy part. Building something that looks impressive on screen, walking through a workflow, showing the art of the possible — any competent SE can do that. The hard part, and the part that separates good SEs from great ones, is the discovery that comes before it.`
      },
      {
        type: "markdown",
        text: `## The Demo Is Not the Product

I've been in enterprise solutions engineering for seven years. The pattern I see most often when deals stall is this: the SE jumped to the demo too fast. They showed the product before they understood the problem. The prospect nodded politely and then went quiet.

What happened? The demo answered questions nobody asked. It solved problems the prospect didn't know they had — or worse, didn't actually have.`
      },
      {
        type: "markdown",
        text: `## Discovery as System Design

Good discovery is really system design in disguise. You're mapping the prospect's current state — their data flows, their pain points, their organizational constraints, their political dynamics. You're building a mental model of how they work today and where the friction lives.

This is architecture. Not software architecture in the formal sense, but the same discipline: understanding the system before you try to change it.`
      },
      {
        type: "markdown",
        text: `## The Questions That Matter

The most powerful questions in a discovery call aren't about requirements. They're about consequences:

- "What happens when this breaks today?"
- "Who feels this pain most directly?"
- "What have you tried that didn't work, and why?"
- "If you could change one thing about this process tomorrow, what would it be?"

These questions reveal the shape of the problem. They tell you what to show in the demo, what to skip, and what to emphasize. They turn a generic product walkthrough into a story about the prospect's world — with your solution as the resolution.`
      },
      {
        type: "markdown",
        text: `## The Payoff

When you do discovery right, the demo practically builds itself. The prospect sees their own reality reflected back to them, and the conversation shifts from "interesting product" to "when can we start?" That's the difference between presenting features and solving problems.

The best SEs I know spend more time in discovery than in demo prep. That's not a coincidence.`
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
