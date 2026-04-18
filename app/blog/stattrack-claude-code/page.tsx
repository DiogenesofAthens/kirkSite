"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function StatTrackClaudeCode() {
  const content = {
    title: "NBA analytics dashboard in two sessions with Claude Code",
    publishDate: "2026-04-18",
    readTime: "7 min read",
    body: [
      {
        type: "markdown",
        text: `# NBA analytics dashboard in two sessions with Claude Code`
      },
      {
        type: "markdown",
        text: `## The goal

I wanted something concrete to put on this site — not a tutorial I followed, not a template I tweaked, but a thing I actually built. I picked an NBA analytics dashboard because it sits at the intersection of things I find genuinely interesting: real-time data, clean interfaces, and the kind of contextual insight that makes raw numbers actually useful. The secondary goal was to get hands-on with Claude Code, a tool I'd been meaning to dig into seriously. Both goals were met faster than I expected.`
      },
      {
        type: "markdown",
        text: `## What Claude Code is

Claude Code is an agentic coding tool that runs in your terminal. You give it a goal in plain English, and it reads your codebase, writes and edits files, runs shell commands, and iterates — on its own, across multiple files, without you micromanaging each step. It's not autocomplete. It's closer to a junior developer who works very fast and never needs to be told the same thing twice.`
      },
      {
        type: "markdown",
        text: `## Session 1: scaffolding

The first session produced a working Next.js frontend and a FastAPI backend, both from scratch. The frontend has eight components — metric cards, a scoring trends chart, a top scorers sidebar, insight alerts. The backend pulls live NBA data using the nba_api library, no API key required, with three real endpoints returning current player and team stats. Both repos got CLAUDE.md files — a plain markdown file committed to the project that Claude Code reads at the start of every session. It's where you put the things you'd otherwise repeat every time: the tech stack, naming conventions, how the project is structured. One file, and Claude Code stays oriented across sessions without re-explanation. Total time: one evening.`
      },
      {
        type: "markdown",
        text: `## Session 2: shipping

The second session wired the frontend hooks to the live backend, pushed both repos to GitHub, deployed the frontend to Vercel, and added a project page to this site. The backend is running on Railway at api.kirkwessman.com. The frontend is live at stattrack.kirkwessman.com. Real data, real infrastructure, publicly accessible. The prompts that did this work were not long. The longest was maybe three sentences.`
      },
      {
        type: "markdown",
        text: `## When the agentic loop clicked

There's a specific kind of productivity that happens when you hand off a task and go do something else — make coffee, take a walk — and come back to find it done correctly. Claude Code operates at that cadence. You write a prompt, it works through the problem across however many files it needs to touch, and surfaces a clean summary of what changed and why. You're not watching it type. You're reviewing results.

The compounding effect of this is real. In the time it would have taken me to scaffold the backend and wire up one endpoint by hand, Claude Code had scaffolded the entire project, handled field mapping between the API's snake_case and the frontend's camelCase, added loading and error states, and matched the existing component patterns without being asked. The loop ran. I came back. It was done.`
      },
      {
        type: "markdown",
        text: `## Judgment at scale

What's worth dwelling on isn't just the speed — it's the judgment. When Claude Code updated the frontend hooks to call the live backend, it didn't just swap URLs. It noticed that the API didn't return a position field and silently removed the position display from the player row so it wouldn't render as an empty string. It noticed the date format from the NBA API was "APR 10, 2024" and wrote a parser to convert it to ISO format for the chart. It matched the existing site's design patterns — serif headings, specific divider styles, exact spacing conventions — without being shown them explicitly. It read the codebase and inferred.

This is what makes the current generation of AI development tools qualitatively different from what came before. It's not that they autocomplete syntax. It's that they apply the kind of contextual reasoning human developers apply — "what would break, what would look wrong, what does the rest of this codebase imply I should do" — but across the entire project surface, simultaneously, in seconds.`
      },
      {
        type: "markdown",
        text: `## What's next for StatTrack

The near-term additions are predictive modeling — using historical performance data to forecast player output — and expanding beyond NBA to other leagues. The more interesting longer-term direction is using AI to surface personnel decision recommendations: the kind of analysis that front offices pay analysts to produce, made accessible at a fraction of the cost. That's where the product gets genuinely useful rather than just technically interesting.`
      },
      {
        type: "markdown",
        text: `## Bottom line

Building StatTrack was joyful in a way that reminded me why I got into this work. Not because it was easy — there were DNS propagation waits, CORS configurations, Dropbox sync quirks, the usual texture of real projects. But because the gap between idea and working software has compressed dramatically. You can build things of real quality, quickly, and iterate on them in the same session.

Human beings are wired to make things. Tools that remove friction from that process don't just save time — they change what feels possible. StatTrack is live. The code is on GitHub. The data is real. That's the proof of work.`
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
