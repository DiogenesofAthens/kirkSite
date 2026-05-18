"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CapabilityOverhang() {
  const content = {
    title: "The Capability Overhang: AI Can Already Do More Than You Think",
    publishDate: "2026-02-05",
    readTime: "8 min read",
    body: [
      {
        type: "markdown",
        text: `There is a growing gap between what AI systems can do and what most people believe they can do. Sam Altman has called this "capability overhang" — the idea that deployed models already possess abilities that the majority of their users have never tested, never imagined, and in many cases wouldn't believe if you showed them.`
      },
      {
        type: "markdown",
        text: `This isn't a future problem. It's a present one. And it may be the single largest bottleneck to AI adoption in the enterprise.`
      },
      {
        type: "markdown",
        text: `## The Gap Is Not Technical

The standard narrative about AI adoption goes something like this: models need to get better, hallucination rates need to drop, trust needs to build, and then — gradually — organizations will start using AI for real work.

That narrative is wrong, or at least incomplete. The models are already far more capable than the tasks most organizations are asking them to perform. The bottleneck isn't capability. It's imagination. It's the human side of the equation — people not knowing what to ask for, not knowing what's possible, and defaulting to using a frontier model as a slightly faster search engine.`
      },
      {
        type: "markdown",
        text: `## What Overhang Looks Like in Practice

I see this constantly in enterprise software. A team will adopt an AI tool, use it for the most obvious task — summarizing documents, drafting emails, answering FAQ-style questions — and then plateau. They never discover that the same model can analyze a complex contract against a set of business rules, generate a working prototype from a verbal description, or restructure an entire data pipeline.

The capability was always there. Nobody asked.

Andrej Karpathy has made a similar observation about LLMs specifically: people dramatically underestimate what these models can do because they approach them with the mental model of previous software. They expect rigid input/output patterns. They don't realize they're interacting with something that can reason, plan, and adapt — within limits, but far beyond what most users ever test.`
      },
      {
        type: "markdown",
        text: `## Why This Matters for Enterprises

In an enterprise context, capability overhang creates a specific kind of risk: your competitors might figure out what these tools can actually do before you do. Not because they have better models — everyone has access to roughly the same frontier models — but because someone on their team had the curiosity or the background to ask the right question.

David Sacks has argued that AI is compressing the timeline between "possible" and "deployed" in ways that favor organizations with strong technical taste — people who can look at a new capability and immediately see how it maps to a real business problem. That's a human skill, not a technical one. And it's in short supply.`
      },
      {
        type: "markdown",
        text: `## The Role of the Solutions Engineer

This is where I think solutions engineering becomes unexpectedly relevant to the AI conversation. The core skill of an SE — understanding a customer's problem deeply enough to map it to a technical capability they didn't know existed — is precisely the skill that closes the capability overhang.

Every discovery call I've ever run is, at its core, an exercise in bridging a gap between what someone thinks is possible and what actually is. The technology has changed. The human dynamic hasn't.`
      },
      {
        type: "markdown",
        text: `## Closing the Gap

There are a few things that help:

- Hands-on experimentation. Not watching demos — actually using the tools on real problems. The overhang shrinks fastest when people experience capabilities firsthand rather than hearing about them secondhand.

- Cross-functional exposure. The person most likely to discover a novel AI application is often not the one you'd expect. A product manager who understands workflow pain points may see an application that a data scientist focused on model architecture would miss entirely.

- Intellectual honesty about defaults. Most people, when they encounter a new tool, try the most conservative possible use case first. That's rational — but it means the most valuable capabilities are systematically the last ones discovered.`
      },
      {
        type: "markdown",
        text: `## The Overhang Is the Opportunity

The uncomfortable truth is that the most transformative applications of current AI models probably haven't been built yet — not because the models aren't ready, but because the right person hasn't asked the right question yet.

That's not a technology problem. It's a human capital problem. And it suggests that the organizations best positioned to benefit from AI aren't necessarily the ones with the biggest data teams or the most GPUs. They're the ones with people who are deeply curious, technically literate enough to prototype, and close enough to real problems to see where capability meets need.

The overhang is real. The question is whether you're the one closing it or the one being left behind by it.`
      }
    ]
  }

  function renderBody() {
    return content.body.map((block, index) =>
      block.text.split("\n").map((line, i) => {
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
            <h1 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight mb-6">{content.title}</h1>
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
