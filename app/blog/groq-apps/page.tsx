"use client"

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft, X, ChevronDown, ChevronUp, Check, Copy } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function GroqAppsPage() {
  const [modalImage, setModalImage] = useState<null | { url: string; alt: string }>(null)

  const content = {
    title: "I Built 4 AI Apps for $0: How Groq’s Free API Powers My Life",
    excerpt: "I love free stuff. I also love fast stuff. Usually, in the tech world, you have to pick one. Here are the four apps I built using Groq’s free API.",
    category: "Technology",
    readTime: "8 min read",
    publishDate: "2025-12-18",
    heroImage: "/images/blog/groq-apps.jpg",
    body: [
      {
        type: "markdown",
        text: `# I Built 4 AI Apps for $0: How Groq’s Free API Powers My Life

I love free stuff. I also love fast stuff. Usually, in the tech world, you have to pick one.

If you want an AI API that is lightning fast, you pay for it (like OpenAI's GPT-5). If you want free, you usually get slow, throttled, or "dumber" models.

Then I found Groq.

If you haven't heard of Groq, they don't make the chips you're used to (GPUs). They make LPUs (Language Processing Units), which are essentially rocket fuel for text generation. The result? It is blisteringly fast. We're talking 300+ tokens per second.

And the best part? They have a generous Free Tier for developers.

Naturally, I decided to abuse this power to automate my life. Here are the four apps I built using Groq’s free API, and how you can do it too.`
      },
      {
        type: "markdown",
        text: `## Why Groq? (Besides the Price)

When you are building a chatbot or a tool that needs to "think" in real-time, latency is the enemy. Waiting 5 seconds for a chatbot to reply feels like an eternity. Groq returns answers in milliseconds. It makes the AI feel like it's actually chatting, not buffering.

• **The Model:** I mostly use llama-3.1-8b-instant for speed or llama-3.3-70b-versatile for complex logic.
• **The Cost:** $0 (up to reasonable rate limits, which I haven't hit yet).`
      },
      {
        type: "markdown",
        text: `---

## App 1: The Code Translator

I am not a coder by trade but I am a Prompt Engineer / Product Manager. Sometimes I find a great snippet of code on GitHub, but it's in Python, and my site is Next.js (JavaScript).

I built a simple tool where I paste code, and Groq instantly rewrites it for my stack.

• **The Setup:** A simple input box.
• **The Prompt:** "You are an expert software engineer. Translate the following Python code into idiomatic TypeScript for a Next.js 14 application. Do not explain the code, just return the translated code block."
• **The Result:** Because Groq is so fast, the translation happens almost as soon as I click the button. No more waiting for ChatGPT to "type" out the answer character by character.`
      },
      {
        type: "markdown",
        text: `## App 2: The Entity Extractor

I get a lot of emails and logs that are just messy blocks of text. I wanted to turn them into structured data (JSON) so I could use them in other automations.

• **The Use Case:** Extracting specific details from agreements or other important documents to summarize it.
• **The "Secret Sauce":** Groq supports JSON Mode. This guarantees that the AI will only output valid JSON, not a bunch of conversational fluff like "Here is the data you requested..."
• **The Prompt:** "Extract the 'device_name', 'battery_level', and 'last_seen' timestamp from this log. Return ONLY JSON."`
      },
      {
        type: "markdown",
        text: `## App 3: The "Home Assistant Architect"

My Home Assistant setup is complex. I use "Picture-Elements" cards that require precise X/Y coordinate positioning in YAML. Writing this manually is torture. I built a "Home Assistant Architect" bot.

• **How it works:** I tell it: "I want a floorplan card with a light toggle for the Kitchen at 40% top, 20% left, and a temperature sensor for the Living Room at 60% top, 50% left."
• **The Groq Magic:** It churns out 50 lines of perfectly formatted YAML in under a second. I copy, paste, and reload my dashboard.
• **Why Speed Matters:** When I'm tweaking a dashboard, I want to iterate fast. Groq keeps up with my "trial and error" workflow.`
      },
      {
        type: "markdown",
        text: `## App 4: The "Grant Glazer" Chatbot (RAG)

I wanted a chatbot on this website that could answer questions as me, using data from my actual blog posts. To do this, I used RAG (Retrieval-Augmented Generation).

1. **The Index:** I scraped my own blog posts and stored them as "vectors" (math representations of text).
2. **The Search:** When you ask the bot "What did Grant do at DNN?", my system finds the relevant paragraphs from my resume.
3. **The Generation:** I send those paragraphs + your question to Groq.
4. **The Response:** Groq reads the context and answers: " Grant held various positions at DNN Corp., including Enterprise Account Executive, Inside Sales Development Team Manager, and Inside Sales Development Representative. In these roles, he achieved notable successes such as exceeding sales targets and implementing effective training processes."

Because Groq is free, I don't have to worry about a surprise $500 bill if one of my posts goes viral and everyone starts chatting with the bot.`
      },
      {
        type: "markdown",
        text: `## How to Get Started

You don't need a PhD to use this.

1. Go to console.groq.com and sign up.
2. Generate an API Key.
3. If you know a little Python, it looks like this:`
      },
      {
        type: "code-block",
        title: "Python Example",
        language: "python",
        code: `from groq import Groq

client = Groq(api_key="YOUR_API_KEY")

completion = client.chat.completions.create(
    model="llama-3.1-8b-instant",
    messages=[
        {"role": "user", "content": "Write a haiku about Home Assistant."}
    ]
)

print(completion.choices[0].message.content)`
      },
      {
        type: "markdown",
        text: `## Final Thoughts

We are living in the golden age of "Free Tier" AI. You don't need to pay monthly subscriptions to build cool tools. Groq gives you enterprise-grade speed for hobbyist-grade prices ($0).

If you have a website, a smart home, or just a messy folder of code, grab an API key and start building.`
      }
    ]
  }

  function CollapsibleCodeBlock({ title, language, code }: { title: string, language: string, code: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
      navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div className="my-8 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="font-mono text-sm font-medium">{title}</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-normal text-xs">{language}</Badge>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>
        {isOpen && (
          <div className="relative">
             <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 rounded-md bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Copy code"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="bg-slate-950 text-slate-50 p-4 overflow-x-auto m-0">
              <code className="text-sm font-mono whitespace-pre">{code}</code>
            </pre>
          </div>
        )}
      </div>
    )
  }

  function renderBody() {
    return content.body.map((block, index) => {
      if (block.type === "markdown") {
        return block.text.split("\n").map((line, i) => {
          if (line.startsWith("# ")) return <h1 key={`${index}-${i}`} className="text-3xl font-bold mt-8 mb-4">{line.slice(2)}</h1>
          if (line.startsWith("## ")) return <h2 key={`${index}-${i}`} className="text-2xl font-bold mt-6 mb-3">{line.slice(3)}</h2>
          if (line.startsWith("### ")) return <h3 key={`${index}-${i}`} className="text-xl font-bold mt-4 mb-2">{line.slice(4)}</h3>
          if (line.startsWith("• ")) return <li key={`${index}-${i}`} className="ml-4 list-disc mb-2">{line.slice(2)}</li>
          if (line.startsWith("1. ")) return <li key={`${index}-${i}`} className="ml-4 list-decimal mb-2">{line.slice(3)}</li>
          if (line.startsWith("2. ")) return <li key={`${index}-${i}`} className="ml-4 list-decimal mb-2">{line.slice(3)}</li>
          if (line.startsWith("3. ")) return <li key={`${index}-${i}`} className="ml-4 list-decimal mb-2">{line.slice(3)}</li>
          if (line.startsWith("4. ")) return <li key={`${index}-${i}`} className="ml-4 list-decimal mb-2">{line.slice(3)}</li>
          if (line.trim() === "") return <br key={`${index}-${i}`} />
          return <p key={`${index}-${i}`} className="mb-4 leading-relaxed">{line}</p>
        })
      } else if (block.type === "code-block") {
        return (
          <CollapsibleCodeBlock
            key={index}
            title={block.title || "Code"}
            language={block.language || "text"}
            code={block.code || ""}
          />
        )
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
