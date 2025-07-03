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
    publishDate: "2025-07-02",
    heroImage: "/placeholder.svg?height=400&width=800",
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
        url: "/images/speedtest-tracker-dashboard.png",
        caption: "Speedtest Tracker dashboard running on Unraid",
        alt: "Speedtest Tracker dashboard showing speed graphs and test history",
      },
      {
        id: 2,
        url: "/images/pi-ifttt-2017.png",
        caption: "My original 2017 Raspberry Pi + IFTTT solution",
        alt: "Raspberry Pi project logging speed tests to Google Sheets",
      },
      {
        id: 3,
        url: "/images/speedtest-data-usage.png",
        caption: "Data usage per speed test session",
        alt: "Bar graph of estimated download/upload usage per test",
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

  // Modal and rendering logic same as your example...

  // (Paste the rest of your rendering logic here, unchanged from your template!)

  // ----
  // For brevity, keep the render logic identical to your sample file.
  // Just update title, excerpt, category, readTime, publishDate, heroImage, content, and images as above.
  // ----

  // ... (rest of your component code follows)
}
