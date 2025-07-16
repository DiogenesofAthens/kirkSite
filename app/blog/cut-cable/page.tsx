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

export default function CutCablePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [modalImage, setModalImage] = useState<null | { url: string; alt: string }>(null)

  const content = {
    title: "Ditching Cable for Good: My OTA + Plex Setup That Replaced Xfinity TV",
    excerpt: "How I dropped my cable bill and built a better live TV experience with Plex and HDHomeRun.",
    category: "Smart Home",
    readTime: "5 min read",
    publishDate: "2025-07-02",
    heroImage: "/images/cable.png",
    body: String.raw`# Ditching Cable for Good: My OTA + Plex Setup That Replaced Xfinity TV

My Xfinity cable TV promomotion was about to expire. That meant my bill was about to jump an additional $40/month for the same channels, one DVR box, and internet I already had. Instead of locking into another contract, I decided to cut the TV side of the service entirely.

I wanted to keep gigabit internet with unlimited data, and I was able to lock that in for $95/month for the next five years. That left TV. I considered YouTube TV and Hulu + Live TV, but at $83/month each, they didn’t save me much—and they still came with channel bloat and monthly fees.

So I dropped cable and replaced it with a simple, solid OTA setup backed by Plex DVR. Here's what I use.

## What I Bought

- ClearStream 2V antenna – $55  
  Picks up major local channels like NBC, ABC, CBS, FOX, PBS

- HDHomeRun Flex 4K – $200  
  Streams live TV over my local network. No coax to every TV needed. Has four tuners and integrates with Plex DVR

- Quad-shield coaxial cable – $5  
  Runs from the antenna to the HDHomeRun box

Total cost: about $260. That’s about 3 months of cable TV.

## The Experience

The antenna feeds signal to the HDHomeRun box. That box broadcasts those channels over the network. Plex (with a Plex Pass I bought 10 years ago) handles everything else—live TV, guide, recording, commercial skipping, series pass rules, and mobile streaming.

I can reorder channels, filter out shopping or any other channels I don’t care about, and add favorites. The interface is smooth and modern across TV, tablet, and phone.

## Plex DVR Tips

- You can set up season passes, daily recordings, or one-offs  
- Automatically skip commercials with Comskip  
- Record to NAS or external drive, in my case my unraid server  
- Access live and recorded TV from anywhere with Plex remote streaming  
- Customize your guide so only the channels you want show up in the order you want

## Signal Testing with ChatGPT

While aiming the antenna inside, I wanted to test each channel one at a time to dial in reception. The app Antenna Point also helped!

I used ChatGPT to generate quick copy-paste commands for every channel I was testing. Here’s an example of what I asked:

Prompt:
\`Give me a command I can run in PowerShell using hdhomerun_config to test a specific virtual channel and return the tuner status. Use channel 6.2 as the example. I’m using tuner0.\`

Response:

\`\`\`powershell
.\hdhomerun_config 192.168.86.XX set /tuner0/vchannel 6.2
Start-Sleep -Seconds 2
.\hdhomerun_config 192.168.86.XX get /tuner0/status
\`\`\`

You can change the virtual channel number and repeat for each one. It made checking signal quality fast and easy while moving the antenna slightly between tests.

## Why I Did It

I don’t need hundreds of channels. I wanted reliable access to local news, football, and the ability to record things on my terms. Plex and HDHomeRun delivered exactly that.

Most importantly, I’m not locked into another overpriced bundle with hidden fees and promo deadlines. I still have fast, unlimited internet. I just don’t have a cable box or TV bill anymore.

## Final Thoughts

This setup pays for itself in three months. It gives me more control, better flexibility, and fewer limitations than my old Xfinity bundle ever did. If you're thinking about cutting the cord, skip the streaming bundles and go OTA with a Plex DVR. You’ll never look back.`,
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

      {modalImage && (
        <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
      )}

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <Card className="glass border-0 shadow-xl mb-8">
            <CardContent className="p-8">
              <Badge variant="secondary" className="mb-4">{content.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 dark:text-gray-100">
                {content.title}
              </h1>

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

              <p className="text-lg text-slate-600 mt-6 leading-relaxed dark:text-gray-400">
                {content.excerpt}
              </p>
            </CardContent>
          </Card>

          <Card className="glass border-0 shadow-xl mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none dark:text-gray-400 dark:prose-invert whitespace-pre-wrap">
                {content.body.split("\n").map((paragraph, index) => {
                  if (paragraph.startsWith("# ")) {
                    return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.slice(2)}</h1>
                  }
                  if (paragraph.startsWith("## ")) {
                    return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{paragraph.slice(3)}</h2>
                  }
                  if (paragraph.startsWith("### ")) {
                    return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{paragraph.slice(4)}</h3>
                  }
                  if (paragraph.startsWith("- ")) {
                    return <li key={index} className="ml-4">{paragraph.slice(2)}</li>
                  }
                  if (paragraph.trim() === "") {
                    return <br key={index} />
                  }
                  return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
                })}
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
