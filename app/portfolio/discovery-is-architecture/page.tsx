"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DiscoveryIsArchitecture() {
  const content = {
    title: "Discovery Is Architecture: Why the Best SEs Start with Questions, Not Demos",
    publishDate: "2026-01-15",
    readTime: "6 min read",
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
          <Link href="/portfolio" className="text-sm tracking-wide uppercase text-muted-foreground hover:text-foreground mb-12 inline-block transition-colors">
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
            <Link href="/portfolio" className="text-sm tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors">
              &larr; Back to all posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
