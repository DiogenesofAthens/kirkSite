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
  const [modalImage, setModalImage] = useState<null | { url: string; alt: string; caption: string }>(null)
  const [content, setContent] = useState({
    title: "From Scripts to Speedtest Tracker: How I Monitor My Internet Like a Pro (2025 Edition)",
    excerpt:
      "I started logging my internet speeds in 2017 with a Raspberry Pi and IFTTT. Today, I use Docker and Unraid for beautiful dashboards, better reliability, and total control. Here's how you can too.",
    category: "Home Networking",
    readTime: "9 min read",
    publishDate: "2025-05-24",
    heroImage: "/images/speed-hero.png",
    content: `
# From Scripts to Speedtest Tracker: How I Monitor My Internet Like a Pro (2025 Edition)

If you've ever had to argue with your ISP about inconsistent speeds or outages, you know how hard it is to prove it—unless you're keeping your own logs.

Back in 2017, I built a Raspberry Pi project that ran speed tests every 15 minutes and logged the results to Google Sheets using IFTTT. It was effective, but required a patchwork of shell scripts, webhooks, and third-party services.

Fast-forward to 2025, and I've upgraded my setup to run in a Docker container on my Unraid server using the Speedtest Tracker project by Henry Whitaker. The difference is night and day.

This post walks through:
- My old 2017 setup (and its limitations)
- How I run Speedtest Tracker today
- What it takes to deploy your own version
- Tips on data usage, logging frequency, and long-term reliability

## Then vs Now: How This Project Has Evolved

### What I Did in 2017

I needed a simple way to log speeds when my ISP was unreliable. My solution:

- Raspberry Pi 3B
- speedtest-cli for testing
- IFTTT Webhooks to push results to Google Sheets
- Cron to run tests every 15 minutes
- Output in Google Sheets with basic download/upload/ping info

It worked, but there were clear limitations:
- IFTTT wasn't always reliable
- Google Sheets had row limits and no real graphing
- Long-term storage and analysis was difficult
- Debugging failures meant manually checking logs

### What I'm Doing in 2025

Today I run Speedtest Tracker as a Docker container on my Unraid NAS.

- Hardware: Unraid server (Intel NUC-style box)
- Software: Docker + Speedtest Tracker
- Testing: Every 15 minutes, stored in SQLite
- Interface: Web UI with graphs, test history, and uptime scoring

This solution is faster, more reliable, easier to maintain, and fully local.

Speedtest Tracker includes:
- Test scheduling and retention policies
- Alerts for performance drops
- Detailed metrics: download, upload, ping, jitter, server, IP
- Data export (CSV, JSON)
- Uptime scoring and automatic server selection

## How to Set Up Speedtest Tracker on Unraid

This assumes Docker is already configured in Unraid.

### Step 1: Install the Container

1. Go to the Community Applications tab in Unraid
2. Search for "Speedtest Tracker"
3. Click Install and configure:
   - Data storage path
   - Port (default 80 or 8080)
   - Database (SQLite for simplicity, PostgreSQL if preferred)

Set up any reverse proxy rules or custom DNS if using Nginx Proxy Manager.

### Step 2: Access the Web Interface

Visit the container’s IP and port, for example:

http://192.168.1.100:8080

Create an admin account, choose your timezone and region, and you're ready to go.

### Step 3: Configure Testing and Retention

Inside the dashboard:
- Set test frequency (every 15, 30, or 60 minutes)
- Retain results for 30 days, 90 days, or forever
- Enable alerts for speed thresholds

You can also limit testing during peak hours or high usage times.

## Be Mindful of Data Usage

Each speed test transfers a fair amount of data, especially at gigabit speeds.

Estimated usage per test:
- Download: 50–120 MB
- Upload: 10–50 MB
- Total: 60–170 MB per test

If testing every 15 minutes:
- Daily: 12–18 GB
- Monthly: 360–540 GB

If you're on a metered plan, test less frequently or during off-peak hours.

## Bonus Features and Use Cases

This setup is more than a basic speed logger. Here are a few ways I use it:

- Export monthly data to CSV and back it up to my NAS
- Get alerts if speeds drop below 300 Mbps
- Monitor performance after firmware upgrades or router changes
- Compare latency and server stability over time
- Integrate with Home Assistant for smarter automations

You can also connect Speedtest Tracker’s database to Grafana if you want custom visualizations or long-term trend reporting.

## Final Thoughts

What started as a personal workaround in 2017 has become a robust, hands-off monitoring solution in 2025. Speedtest Tracker running in Docker on Unraid gives me complete control, beautiful charts, and rock-solid logging with no cloud reliance.

Whether you're troubleshooting outages or just like having data to hold your ISP accountable, this setup is simple, powerful, and open source.

Have your own speed logging setup? Drop a comment or reach out—I'd love to compare notes.
    `,
    images: [
      {
        id: 1,
        url: "/images/test-log.png",
        caption: "Speedtest Tracker log running on Unraid",
        alt: "Speedtest Tracker log showing test history",
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

  const Modal = ({
    image,
    onClose,
  }: {
    image: { url: string; alt: string; caption: string }
    onClose: () => void
  }) => (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 cursor-zoom-out"
      aria-modal="true"
      tabIndex={-1}
    >
      <div
        className="relative max-w-3xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100 transition"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-black" />
        </button>
        <Image
          src={image.url}
          alt={image.alt}
          width={1200}
          height={800}
          className="w-full max-h-[80vh] object-contain rounded-lg"
          priority
        />
        {image.caption && (
          <div className="text-center text-white mt-2 text-sm italic drop-shadow">
            {image.caption}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-800/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <FloatingNav />
      <TimezoneClock />

      {modalImage && <Modal image={modalImage} onClose={() => setModalImage(null)} />}

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <Card className="glass border-0 shadow-xl mb-8">
            <CardContent className="p-8">
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4">
                  {content.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  {content.title}
                </h1>
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(content.publishDate + "T12:00:00").toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {content.readTime}
                </div>
              </div>

              <div className="mb-6">
                <Image
                  src={content.heroImage || "/placeholder.svg"}
                  alt={content.title}
                  width={800}
                  height={400}
                  className="w-full h-auto object-contain rounded-lg cursor-pointer"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                  onClick={
                    isEditing
                      ? undefined
                      : () =>
                          setModalImage({
                            url: content.heroImage || "/placeholder.svg",
                            alt: content.title,
                            caption: "",
                          })
                  }
                />
              </div>

              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{content.excerpt}</p>
            </CardContent>
          </Card>

          <Card className="glass border-0 shadow-xl mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none dark:prose-invert">
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
            </CardContent>
          </Card>

          <Card className="glass border-0 shadow-xl mb-8">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Article Images</h3>
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
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Image {image.id}</span>
                        <Button onClick={() => removeImage(image.id)} variant="outline" size="sm">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt}
                      width={600}
                      height={300}
                      className={`w-full h-48 object-cover rounded-lg ${!isEditing ? "cursor-pointer" : ""}`}
                      sizes="(max-width: 768px) 100vw, 600px"
                      onClick={
                        isEditing
                          ? undefined
                          : () =>
                              setModalImage({
                                url: image.url || "/placeholder.svg",
                                alt: image.alt,
                                caption: image.caption,
                              })
                      }
                    />

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
                          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 text-slate-900 dark:text-slate-100 bg-transparent"
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
                          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 text-slate-900 dark:text-slate-100 bg-transparent"
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">{image.caption}</p>
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
          </div>
        </div>
      </div>
    </div>
  )
}
