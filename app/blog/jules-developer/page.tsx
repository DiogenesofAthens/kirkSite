"use client"

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function JulesDeveloperPage() {
  const [modalImage, setModalImage] = useState<null | { url: string; alt: string }>(null)

  const content = {
    title: "I Hired an AI Developer (And It’s Free): How I Use Google Jules to Build My Site",
    excerpt: "I built this latest version of my website without writing a single line of code. In the past, maintaining a site meant wrestling with WordPress themes or getting stuck in \"copy-paste hell\" with early AI chat tools.",
    category: "Technology",
    readTime: "6 min read",
    publishDate: "2025-11-08",
    heroImage: "/images/blog/jules-gemini.jpg",
    body: [
      {
        type: "markdown",
        text: `# I Hired an AI Developer (And It’s Free): How I Use Google Jules to Build My Site

I built this latest version of my website without writing a single line of code.

In the past, maintaining a site meant wrestling with WordPress themes or getting stuck in "copy-paste hell" with early AI chat tools. I would describe what I wanted, copy the raw code, paste it into my files, break everything, and spend hours debugging. It was inefficient, and maintaining version control was a nightmare.

But recently, I found a workflow that actually scales. I stopped trying to be a developer and started acting like a Product Manager.

I hired a team of AI agents. Gemini is my Architect, and Google Jules is my Developer. Here is exactly how I use them to build features for grantglazer.com.`
      },
      {
        type: "markdown",
        text: `## The Stack

• **Gemini:** The Architect. I use this to brainstorm logic and generate the technical instructions for the developer.
• **Google Jules:** The Developer. An asynchronous agent that has direct access to my GitHub repo. It writes the code, creates branches, and fixes bugs.
• **Vercel:** The Staging & Production Environment. It automatically builds my site so I can see changes live.
• **GitHub:** The Version Control. Where I approve the work and push it live.`
      },
      {
        type: "markdown",
        text: `## The Managerial Workflow

I don't write code; I manage a process. Here is the lifecycle of a new feature on my blog.

### 1. The Brief (Gemini)

I start by telling Gemini exactly what I want in plain English.

• **Me:** "I want to add a dark mode toggle to the header. It should save the user's preference."
• **Gemini:** Analyzes the request and writes a detailed, technical prompt optimized for Jules.

### 2. The Assignment (Jules)

I take that prompt and feed it to Jules. I make sure Jules is building off the latest branch of my site.

• **Crucial Step:** Jules creates a new branch (e.g., feature-dark-mode) for every task. This keeps my main live site safe while we experiment.

### 3. The Build & Test (Vercel)

Jules writes the code and updates the repo. I don't even look at the code files. Instead, I wait for the Vercel Deployment. Vercel automatically builds a preview URL for that specific branch.

• **If it fails:** I copy the error logs from Vercel and feed them back to Jules: "Fix this error."
• **If it works:** I open the preview URL on my phone and desktop. I click around. Does it look good? Is the animation smooth?

### 4. The Feedback Loop

If I don't like something, I don't try to fix the CSS myself. I just tell the bots.

• **Me:** "The button is too small on mobile. Make it 20% larger and round the corners."
• **Jules:** Updates the branch, Vercel updates the preview, and I test again.

### 5. The Launch (GitHub)

When I'm happy with the Vercel preview, I go to GitHub. I find the Pull Request Jules opened, and I manually click Merge. That merges the new feature into my main branch. Vercel detects the change and automatically pushes the update to the live internet.`
      },
      {
        type: "markdown",
        text: `## Sage Advice for the Jules Rookie

After hundreds of deployments, I’ve learned that Jules is like a brilliant but junior developer. You have to manage it correctly to get the best results. Here are my top tips.

### The Secret Weapon: AGENTS.md

Most people don't know this exists. You can add a file called AGENTS.md to the root of your repository. Think of this as an "Onboarding Manual" for your AI employee. In this file, I list my project's specific quirks so I don't have to repeat them in every prompt.

• **Example content:** "Always use Tailwind for styling. We use the 'app' router in Next.js. Never install new npm packages without asking first." Jules reads this before every task. It saves me hours of correcting the same mistakes.

### One Feature per Session

Don't try to be efficient and cram five different requests into one chat. The longer the chat, the slower Jules gets.

• **My Rule:** One feature per session. If I want to build a "Related Posts" section, that's one session. Once it's merged, I start a brand new session for the next feature. A fresh brain works better.

### Review the "Plan," Ignore the Code

When you give Jules a task, it pauses and presents a Plan. Do not skip this. If the plan says "I will delete the database schema to fix the typo," you need to catch that before it executes. If the plan looks vague, reject it and tell Jules to be more specific.

### The "Loop of Death"

Sometimes Jules gets stuck. It tries to fix a bug, fails, apologizes, and tries the exact same fix again.

• **The Fix:** Don't argue with it. Pause. Close the tab. Start a new session and give it the error message from the start.

### Gemini is Your Translator

Since I focus on the "What" and not the "How," I use Gemini to translate my user feedback into developer speak.

• **Me:** "I want the text to look less squished."
• **Gemini translates to Jules:** "Increase the line-height to 1.6 and add padding-bottom to the paragraph elements."`
      },
      {
        type: "markdown",
        text: `## Final Thoughts

This workflow has changed everything for me. I’m no longer limited by syntax or time. I can dream up a feature, describe it to my "Architect," have my "Dev" build it, and test it like a user.

If you have an idea for a website, stop worrying about how to write the code. Get a Vercel account, fire up Jules, and start managing.`
      }
    ]
  }

  function renderBody() {
    return content.body.map((block, index) => {
      if (block.type === "markdown") {
        return block.text.split("\n").map((line, i) => {
          if (line.startsWith("# ")) return <h1 key={`${index}-${i}`} className="text-3xl font-bold mt-8 mb-4">{line.slice(2)}</h1>
          if (line.startsWith("## ")) return <h2 key={`${index}-${i}`} className="text-2xl font-bold mt-6 mb-3">{line.slice(3)}</h2>
          if (line.startsWith("### ")) return <h3 key={`${index}-${i}`} className="text-xl font-bold mt-4 mb-2">{line.slice(4)}</h3>
          if (line.startsWith("• ")) return <li key={`${index}-${i}`} className="ml-4 list-disc mb-2">{line.slice(2)}</li>
          if (line.trim() === "") return <br key={`${index}-${i}`} />
          return <p key={`${index}-${i}`} className="mb-4 leading-relaxed">{line}</p>
        })
      }
    })
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
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
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
