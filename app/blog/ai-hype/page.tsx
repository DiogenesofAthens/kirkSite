"use client"

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AIHypePage() {
  const [modalImage, setModalImage] = useState<null | { url: string; alt: string }>(null)

  const content = {
    title: "AI in CPQ and CLM: Hype vs Reality in 2025",
    excerpt:
      "AI is everywhere in the conversation about CPQ and CLM, but the truth is a mix of progress and overpromises. Here’s where it really helps, where it struggles, and what’s coming next.",
    category: "Technology",
    readTime: "6 min read",
    publishDate: "2025-03-28",
    heroImage: "/images/ai-cpq-clm.png",
    body: [
      {
        type: "markdown",
        text: `# AI in CPQ and CLM: Hype vs Reality in 2025

I get asked about AI in CPQ and CLM almost every week. Everyone wants to know what’s real, what’s hype, and when the big breakthroughs are coming. The truth sits somewhere in the middle. There’s progress, but also a lot of noise and unrealistic expectations.`
      },
      {
        type: "markdown",
        text: `## Where AI Helps Today`
      },
      {
        type: "markdown",
        text: `### CPQ: Helpful, but not magic

AI can recommend configurations, catch pricing mistakes, and suggest next steps. It helps, but it’s not running the show. CPQ is complicated. Every company has its own rules, exceptions, and odd cases. Sales teams deal with contract-based pricing, previously sold assets, ramps, uplifts, and custom discounts. AI needs a lot of guardrails to work well here. Right now, it’s an assistant, not a pilot.`
      },
      {
        type: "markdown",
        text: `### CLM: Data extraction that actually works

For contracts, AI is already useful. It can pull out terms, dates, clauses, and risks, and it speeds up review and migration work. Tools can even answer questions like “What’s the renewal date?” or “Does this contract have X?” for a single document.

It’s good progress, but not perfect. Table extraction still breaks when formats get messy or span multiple pages. Page numbers and hidden e-signature data sometimes creep into results. Image-based clauses are still a problem. And asking AI to search across an entire contract library sounds simple, but it’s a much bigger technical challenge than most expect.`
      },
      {
        type: "markdown",
        text: `## The Big Challenges

How do you make thousands of contracts searchable without losing context? That’s the hard part. It’s not just storing the data. You have to:

- Build reliable indexing
- Keep relationships between clauses, parties, and metadata
- Create summaries that AI can use without losing meaning
- Choose the right setup, whether that’s vector databases, data lakes, or something else

These problems aren’t solved yet, but the industry is working on it.`
      },
      {
        type: "markdown",
        text: `## What’s Next

The next breakthroughs may come from better retrieval, smarter indexing, or models that handle longer context and more complex relationships. Will it all come together in the next year or two? Maybe, but don’t count on overnight change. Progress is happening, just not at the pace the hype suggests.`
      },
      {
        type: "markdown",
        text: `## The Human Factor

One thing is clear: AI isn’t replacing people here anytime soon. The folks who learn how to use it to speed up their work will have an edge. Those who ignore it, or trust it blindly, will fall behind.

AI is best as a tool that helps you move faster and focus on the decisions that matter.`
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

  function ImageModal({ image, onClose }: { image: { url: string; alt: string }; onClose: () => void }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
        <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/80 rounded-full p-2 z-10"
            aria-label="Close image modal"
          >
            <X className="w-6 h-6" />
          </button>
          <Image
            src={image.url}
            alt={image.alt}
            width={1200}
            height={800}
            className="rounded shadow-xl w-full max-h-[80vh] object-contain"
            priority
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <FloatingNav />
      <TimezoneClock />

      {modalImage && <ImageModal image={modalImage} onClose={() => setModalImage(null)} />}

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <Card className="glass border-0 shadow-xl mb-8">
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

              <button
                type="button"
                onClick={() => setModalImage({ url: content.heroImage, alt: content.title })}
                className="w-full"
                style={{ background: "none", border: 0, padding: 0, cursor: "pointer" }}
                aria-label="View hero image"
              >
                <Image
                  src={content.heroImage || "/placeholder.svg"}
                  alt={content.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg transition-transform hover:scale-105 duration-200"
                />
              </button>

              <p className="text-lg text-slate-600 mt-6 leading-relaxed dark:text-gray-400">{content.excerpt}</p>
            </CardContent>
          </Card>

          <Card className="glass border-0 shadow-xl mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none dark:text-gray-400 dark:prose-invert whitespace-pre-wrap">
                {renderBody()}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <Link href="/blog" className="text-blue-600 hover:text-blue-700">
              ← Back to all posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
