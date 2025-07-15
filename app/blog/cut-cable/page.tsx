"use client"

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPost() {
  const [isEditing, setIsEditing] = useState(false)
  const [modalImage, setModalImage] = useState<null | { url: string; alt: string }>(null)
  const [content, setContent] = useState({
    title: "Ditching Cable for Good: My OTA + Plex Setup That Replaced Xfinity TV",
    excerpt: "I canceled Xfinity TV and built a one-time setup using HDHomeRun and Plex that lets me stream and record local channels, no monthly TV bill, no regrets.",
    category: "Cord Cutting",
    readTime: "7 min read",
    publishDate: "2025-07-15",
    heroImage: "/images/cable.png",
    content: `
title: "Ditching Cable for Good: My OTA + Plex Setup That Replaced Xfinity TV"
excerpt: "I canceled Xfinity TV and built a one-time setup using HDHomeRun and Plex that lets me stream and record local channels—no monthly TV bill, no regrets."
category: "Cord Cutting"
readTime: "7 min read"
publishDate: "2025-07-02"
heroImage: "/images/cable.png",
content: `
# Ditching Cable for Good: My OTA + Plex Setup That Replaced Xfinity TV

My Xfinity cable TV promo was about to expire. That meant my bill was about to jump for the same channels, one DVR box, and internet I already had. Instead of locking into another contract, I decided to cut the TV side of the service entirely.

I wanted to keep gigabit internet with unlimited data, and I was able to lock that in for $95/month for the next five years. That left TV. I considered YouTube TV and Hulu + Live TV, but at $83/month each, they didn’t save me much—and they still came with channel bloat and monthly fees.

So I dropped cable and replaced it with a simple, solid OTA setup backed by Plex DVR. Here's what I use.

## What I Bought

- ClearStream 2V antenna – $55  
  Picks up major local channels like NBC, ABC, CBS, FOX, PBS in 1080i

- HDHomeRun Flex 4K – $200  
  Streams live TV over my local network. No coax to every TV needed. Has four tuners and integrates with Plex DVR

- 25ft quad-shield coaxial cable – $9  
  Runs from the attic-mounted antenna to the HDHomeRun box

Total cost: about $265. That’s less than three months of cable TV.

## The Experience

The antenna feeds signal to the HDHomeRun box. That box broadcasts those channels over the network. Plex (with a Plex Pass) handles everything else—live TV, guide, recording, commercial skipping, series pass rules, and mobile streaming.

I can reorder channels, filter out shopping or religious channels I don’t care about, and add favorites. The interface is smooth and modern across TV, tablet, and phone.

## Plex DVR Tips

- You can set up season passes, daily recordings, or one-offs  
- Automatically skip commercials with Comskip  
- Record to NAS or external drive  
- Access live and recorded TV from anywhere with Plex remote streaming  
- Customize your guide so only the channels you want show up in the order you want

It just works, and it’s a huge upgrade over renting a DVR box.

## Signal Testing with ChatGPT

While aiming the antenna in the attic, I wanted to test each channel one at a time to dial in reception.

I used ChatGPT to generate quick copy-paste commands for every channel I was testing. Here’s an example of what I asked:

Prompt:
Give me a command I can run in PowerShell using hdhomerun_config to test a specific virtual channel and return the tuner status. Use channel 6.2 as the example. I’m using tuner0.

Response:
.\hdhomerun_config 192.168.XX.XX set /tuner0/vchannel 6.2
Start-Sleep -Seconds 2
.\hdhomerun_config 192.168.XX.XX get /tuner0/status

I asked it to change the virtual channel number and repeat for each one. It made checking signal quality fast and easy while moving the antenna slightly between tests. Copy and paste all the results back into GPT and I got a nifty excel output!

## Why I Did It

I don’t need hundreds of channels. I wanted reliable access to local news, football, and the ability to record things on my terms. Plex and HDHomeRun delivered exactly that.

Most importantly, I’m not locked into another overpriced bundle with hidden fees and promo deadlines. I still have fast, unlimited internet. I just don’t have a cable box or TV bill anymore.

## Final Thoughts

This setup pays for itself in three months. It gives me more control, better flexibility, and fewer limitations than my old Xfinity bundle ever did. If you're thinking about cutting the cord, skip the streaming bundles and go OTA with a Plex DVR. You’ll never look back.

    `,
    images: [
      {
        id: 1,
        url: "/images/clm-process.png",
        caption: "CLM Project process flow",
        alt: "Flowchart showing CLM selling process",
      },
      {
        id: 2,
        url: "/images/clm-roi.png",
        caption: "ROI examples of a CLM solution",
        alt: "Value that CLM brings",
      },
    ],
  })

  const handleImageUpload = (imageId: number, file: File) => {
    const imageUrl = URL.createObjectURL(file)
    setContent((prev) => ({
      ...prev,
      images: prev.images.map((img) => (img.id === imageId ? { ...img, url: imageUrl } : img)),
    }))
  }

  const addNewImage = () => {
    const newId = Math.max(...content.images.map((img) => img.id)) + 1
    setContent((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        {
          id: newId,
          url: "/placeholder.svg?height=300&width=600",
          caption: "New image caption",
          alt: "New image description",
        },
      ],
    }))
  }

  const removeImage = (imageId: number) => {
    setContent((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId),
    }))
  }

  // Modal component
  function ImageModal({ image, onClose }: { image: { url: string; alt: string }, onClose: () => void }) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-all"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        <div
          className="relative max-w-3xl max-h-[90vh] w-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
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
            className="rounded shadow-xl max-h-[80vh] w-auto object-contain bg-white"
            priority
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

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

          <div className="mb-6 flex justify-end">
            <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "default" : "outline"}>
              {isEditing ? "Save Changes" : "Edit Post"}
            </Button>
          </div>

          <Card className="glass border-0 shadow-xl mb-8">
            <CardContent className="p-8">
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4">
                  {content.category}
                </Badge>
                {isEditing ? (
                  <input
                    type="text"
                    value={content.title}
                    onChange={(e) => setContent((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full text-3xl font-bold text-slate-900 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 dark:text-gray-100 dark:border-gray-700 dark:focus:border-blue-500"
                  />
                ) : (
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 dark:text-gray-100">
                    {content.title}
                  </h1>
                )}
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-600 mb-6 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {isEditing ? (
                  <input
                  type="date"
                  value={content.publishDate}
                  onChange={(e) => setContent((prev) => ({ ...prev, publishDate: e.target.value }))}
                  className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 dark:text-gray-100 dark:border-gray-700 dark:focus:border-blue-500"
                />
              ) : (
                new Date(content.publishDate + "T12:00:00").toLocaleDateString()
              )}
            </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={content.readTime}
                      onChange={(e) => setContent((prev) => ({ ...prev, readTime: e.target.value }))}
                      className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 dark:text-gray-100 dark:border-gray-700 dark:focus:border-blue-500"
                    />
                  ) : (
                    content.readTime
                  )}
                </div>
              </div>

              <div className="mb-6">
                {isEditing ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 dark:border-gray-700">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const imageUrl = URL.createObjectURL(file)
                          setContent((prev) => ({ ...prev, heroImage: imageUrl }))
                        }
                      }}
                      className="mb-2 dark:text-gray-100"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Upload hero image (recommended: 800x400px)
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="w-full"
                    style={{ background: "none", border: 0, padding: 0, cursor: "pointer" }}
                    onClick={() => setModalImage({ url: content.heroImage, alt: content.title })}
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
                )}
              </div>

              {isEditing ? (
                <textarea
                  value={content.excerpt}
                  onChange={(e) => setContent((prev) => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  rows={3}
                  placeholder="Article excerpt..."
                />
              ) : (
                <p className="text-lg text-slate-600 leading-relaxed dark:text-gray-400">{content.excerpt}</p>
              )}
            </CardContent>
          </Card>

          <Card className="glass border-0 shadow-xl mb-8">
            <CardContent className="p-8">
              {isEditing ? (
                <textarea
                  value={content.content}
                  onChange={(e) => setContent((prev) => ({ ...prev, content: e.target.value }))}
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  placeholder="Write your article content in Markdown..."
                />
              ) : (
                <div className="prose prose-lg max-w-none dark:text-gray-400 dark:prose-invert">
                  {content.content.split("\n").map((paragraph, index) => {
                    if (paragraph.startsWith("# ")) {
                      return (
                        <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
                          {paragraph.slice(2)}
                        </h1>
                      )
                    }
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h2 key={index} className="text-2xl font-bold mt-6 mb-3">
                          {paragraph.slice(3)}
                        </h2>
                      )
                    }
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h3 key={index} className="text-xl font-bold mt-4 mb-2">
                          {paragraph.slice(4)}
                        </h3>
                      )
                    }
                    if (paragraph.startsWith("- ")) {
                      return (
                        <li key={index} className="ml-4">
                          {paragraph.slice(2)}
                        </li>
                      )
                    }
                    if (paragraph.trim() === "") {
                      return <br key={index} />
                    }
                    return (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass border-0 shadow-xl mb-8">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold dark:text-gray-100">Article Images</h3>
                {isEditing && (
                  <Button onClick={addNewImage} variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {content.images.map((image) => (
                  <div key={image.id} className="space-y-3">
                    {isEditing && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium dark:text-gray-100">Image {image.id}</span>
                        <Button onClick={() => removeImage(image.id)} variant="outline" size="sm">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    {isEditing ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 dark:border-gray-700">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageUpload(image.id, file)
                          }}
                          className="mb-2 dark:text-gray-100"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Upload image (recommended: 600x300px)
                        </p>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="w-full"
                        style={{ background: "none", border: 0, padding: 0, cursor: "pointer" }}
                        onClick={() => setModalImage({ url: image.url, alt: image.alt })}
                        aria-label={`View image: ${image.caption}`}
                      >
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={image.alt}
                          width={600}
                          height={300}
                          className="w-full h-48 object-cover rounded-lg transition-transform hover:scale-105 duration-200"
                        />
                      </button>
                    )}

                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={image.caption}
                          onChange={(e) =>
                            setContent((prev) => ({
                              ...prev,
                              images: prev.images.map((img) =>
                                img.id === image.id ? { ...img, caption: e.target.value } : img,
                              ),
                            }))
                          }
                          placeholder="Image caption"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                        />
                        <input
                          type="text"
                          value={image.alt}
                          onChange={(e) =>
                            setContent((prev) => ({
                              ...prev,
                              images: prev.images.map((img) =>
                                img.id === image.id ? { ...img, alt: e.target.value } : img,
                              ),
                            }))
                          }
                          placeholder="Alt text for accessibility"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 italic dark:text-gray-400">{image.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <Link href="/blog" className="text-blue-600 hover:text-blue-700">
              ← Back to all posts
            </Link>
            <div className="text-sm text-gray-500 dark:text-gray-400">Share this post</div>
          </div>
        </div>
      </div>
    </div>
  )
}
