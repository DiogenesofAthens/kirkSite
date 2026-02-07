"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function VibeCodingWithClaude() {
  const content = {
    title: "What I Learned Vibe-Coding This Site with Claude",
    publishDate: "2026-02-01",
    readTime: "5 min read",
    body: [
      {
        type: "markdown",
        text: `# What I Learned Vibe-Coding This Site with Claude

I didn't write a single line of code by hand. Every file, every component, every CSS change on this site was the result of a conversation between me and Claude — Anthropic's AI. Here's what that process looked like, and what it taught me about where AI-assisted development actually is right now.`
      },
      {
        type: "markdown",
        text: `## The Starting Point

A friend of mine, Grant Glazer, built a personal site on Next.js that I admired. He gave me permission to clone it and make it my own. The question was: could I take his site — his content, his structure, his aesthetic — and transform it into something authentically mine, using AI as my only coding partner?`
      },
      {
        type: "markdown",
        text: `## What "Vibe Coding" Actually Means

I've seen the term thrown around, and it can mean a lot of things. For me it meant this: I described what I wanted in plain language, reviewed what Claude produced, gave feedback, and iterated. I never opened a code editor. I never wrote a function. But I was deeply involved in every decision — what content to surface, how to structure the narrative, what felt right and what didn't.

It's not "AI did it for me." It's closer to directing a very fast, very literal collaborator who happens to know TypeScript.`
      },
      {
        type: "markdown",
        text: `## What Worked Well

The speed was remarkable. Replacing all of Grant's personal content with mine — across a dozen files, a data layer, an AI chatbot system prompt, contact forms, metadata — took minutes, not days. The kind of tedious find-and-replace work that would have taken hours was done in a single pass.

The structural changes were equally fast. Rethinking the "Recommendations" page as a "Career Highlights" page, adding an Education section to the resume, shifting the design from glass-morphism to a cleaner monochrome aesthetic — each of these was a conversation, not a sprint.`
      },
      {
        type: "markdown",
        text: `## What Required Human Judgment

Everything important. Which achievements to highlight. How to frame my career narrative. Whether "#1 in quota attainment" was the right thing to lead with (it wasn't — too aggressive). What tone to strike. Which blog topics would feel authentic versus performative.

AI can produce. Humans curate. That distinction matters more than most people realize.`
      },
      {
        type: "markdown",
        text: `## The Takeaway

If you have domain expertise and clear taste, AI coding tools can get you from zero to something real, fast. But "fast" isn't the point. The point is that the bottleneck shifts — from implementation to judgment. And judgment is where the value always was.`
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
            Back to Blog
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
