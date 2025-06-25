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
  const [content, setContent] = useState({
    title: "How I Built My Personal Media Server (And How You Can Too)",
    excerpt:
      "A complete guide to setting up your own media server using Unraid, Plex, and automated content management.",
    category: "Technology",
    readTime: "12 min read",
    publishDate: "2024-01-01",
    heroImage: "/placeholder.svg?height=400&width=800",
    content: `
# How I Built My Personal Media Server (And How You Can Too)

A lot of my friends and family have asked me how I put together my own personal media server. I wrote this guide to help them, and if you find this useful as well, feel free to donate using the PayPal button below.

**Disclaimer**: This guide is for educational and informational purposes only. It is your responsibility to comply with all local laws and copyright regulations when using any of the tools or services described.

## Quick Glossary

- **Operating System – Unraid**: https://lime-technology.com/pricing/
- **Radarr** – Movie management and automation
- **Sonarr** – TV series tracking and automation
- **SABnzbd** – Usenet download client
- **NZBHydra** – Meta indexer for Usenet
- **Plex** – Media server front end: https://www.plex.tv
- **Overseerr** – Request management interface for Plex
- **Tautulli** – Plex usage and activity tracking
- **Cloudflared** – Tunnels to securely access services remotely without port forwarding
- **PCPartPicker** – Hardware planning and compatibility: https://www.pcpartpicker.com

## Part 1: Hardware Setup

You'll need a computer that can run Unraid and function as a headless server (controlled through a web interface with no monitor or keyboard).

### Storage
Unraid lets you combine multiple hard drives into a single storage pool with parity protection.

My setup:
- 1x 3TB parity drive
- 5x 3TB storage drives
- 2x SSDs (1 for cache, 1 for a Windows VM)

A Blu-ray rip is typically 10GB, and TV shows average 2–5GB/hr. I recommend starting with at least 15TB total capacity.

Use cases that can hold multiple 3.5" drives, and ensure good airflow and expandability.

### Hard Drives
Look for:
- Western Digital Red or HGST Ultrastar drives (refurbished drives can be reliable and cost-effective)
- Enough SATA ports (you can expand with a PCIe SATA controller if needed)

### CPU
Each 1080p stream requires about 2000 PassMark points. For example:
- Intel i7-7700 has a PassMark score of 10,796, good for around 5 simultaneous streams

### Motherboard
Choose a board that:
- Matches your CPU
- Offers enough SATA ports
- Has a reliable chipset and enough RAM slots

### RAM
16–32GB is ideal. Install RAM in matched pairs when possible.

### Power Supply
Use a Gold or Platinum rated PSU for efficiency and reliability. Use PCPartPicker to verify wattage coverage.

### Case
Choose a case that:
- Supports your motherboard form factor
- Has enough bays for your planned hard drive count
- Provides good airflow

### Optional GPU
Not required unless you're virtualizing Windows or want Plex hardware transcoding support.

## Part 2: Installing Unraid

1. Purchase a license and download Unraid
2. Install it to a USB flash drive (low profile preferred)
3. Boot from the USB drive on your server
4. Assign parity drive(s) and storage drives
5. Don't run a parity check until everything is configured (parity check can take 24+ hours)

## Part 3: Create Shares and Install Plugins

### Create These Shares in Unraid:
- appdata
- movies
- tv

### Install the Community Applications Plugin:
1. Go to the Plugins tab
2. Click "Install Plugin" and paste this:
   https://raw.githubusercontent.com/Squidly271/community.applications/master/plugins/community.applications.plg

This will add the "Apps" tab to Unraid's web UI.

## Part 4: Docker Applications Setup

Search for and install the following containers from the Apps tab (use linuxserver.io or binhex versions when available):
- Plex
- SABnzbd
- Sonarr
- Radarr
- NZBHydra
- Overseerr
- Tautulli
- Cloudflared (for tunnels)

Each container will run in isolation and have its own web UI accessible via port.

**Important**: Enable authentication for every app. Do not expose these services publicly without secure access controls.

## Part 5: External Access with Cloudflared

Use Cloudflared tunnels to avoid direct port forwarding and expose your apps securely over HTTPS. Set up a tunnel through the official Cloudflare dashboard or CLI and map subdomains (e.g., plex.yourdomain.com) to your internal services.

Cloudflared tunnels allow encrypted remote access without opening your firewall. Use access rules (Cloudflare Zero Trust Access) to lock down access to only authorized users.

## Part 6: Configure Each App

### SABnzbd
1. Go to Config > General and copy the API and NZB keys
2. In Config > Folders:
   - Incomplete downloads: /appdata/config/downloads/incomplete
   - Completed downloads: /appdata/config/downloads/complete
3. In Servers, add your Usenet providers
4. In Categories:
   - movies → /movies
   - tv → /tv

### NZBHydra
Configure indexers (you can add public and private Usenet indexers here). Enable connections from Sonarr and Radarr. Secure the web UI with authentication.

### Radarr
1. Go to Settings > Download Clients and add SABnzbd
   - Use internal IP and port
   - Enter API key from SABnzbd
   - Set category to "movies"
2. Go to Indexers and add NZBHydra
3. Set root folder to /movies

### Sonarr
1. Go to Settings > Download Clients and add SABnzbd
   - Same config as Radarr, but category = "tv"
2. Go to Indexers and add NZBHydra
3. Set root folder to /tv

### Overseerr
Connect Overseerr to your Plex account and set up user access so people can request movies and shows. Overseerr can send approved requests directly to Radarr and Sonarr.

### Tautulli
Monitor Plex activity, track who is watching what, when, and where. Also great for notifications.

### Plex
1. Sign up at https://www.plex.tv
2. Log in and launch your server from the web UI
3. Add your library folders:
   - /movies
   - /tv
4. Go to Settings > Remote Access and verify it is working (using Cloudflared for secure remote access is preferred)
5. Set authentication and manage user access under "Users and Sharing"

## Final Notes

- Always enable authentication on every service
- Avoid exposing services directly to the public internet
- Use Cloudflared tunnels or VPN for secure external access
- Keep Unraid and all Docker containers updated regularly
- This setup is intended for managing and streaming content you legally own or have the rights to view
- Unauthorized downloading or sharing of copyrighted content may be illegal

That's it! Your media server should now be fully functional, secure, and scalable. If you have questions or want a PDF or blog-ready version, let me know.
    `,
    images: [
      {
        id: 1,
        url: "/placeholder.svg?height=300&width=600",
        caption: "Unraid dashboard showing drive configuration",
        alt: "Unraid web interface with storage drives",
      },
      {
        id: 2,
        url: "/placeholder.svg?height=300&width=600",
        caption: "Plex media server interface",
        alt: "Plex dashboard with movie and TV libraries",
      },
      {
        id: 3,
        url: "/placeholder.svg?height=300&width=600",
        caption: "Docker containers running on Unraid",
        alt: "Unraid Docker tab showing running containers",
      },
      {
        id: 4,
        url: "/placeholder.svg?height=300&width=600",
        caption: "Hardware setup with multiple drives",
        alt: "Server case with multiple hard drives installed",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <FloatingNav />
      <TimezoneClock />

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

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
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
                    className="w-full text-3xl font-bold text-slate-900 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{content.title}</h1>
                )}
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="date"
                      value={content.publishDate}
                      onChange={(e) => setContent((prev) => ({ ...prev, publishDate: e.target.value }))}
                      className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    new Date(content.publishDate).toLocaleDateString()
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={content.readTime}
                      onChange={(e) => setContent((prev) => ({ ...prev, readTime: e.target.value }))}
                      className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    content.readTime
                  )}
                </div>
              </div>

              <div className="mb-6">
                {isEditing ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
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
                      className="mb-2"
                    />
                    <p className="text-sm text-gray-500">Upload hero image (recommended: 800x400px)</p>
                  </div>
                ) : null}
                <Image
                  src={content.heroImage || "/placeholder.svg"}
                  alt={content.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {isEditing ? (
                <textarea
                  value={content.excerpt}
                  onChange={(e) => setContent((prev) => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Article excerpt..."
                />
              ) : (
                <p className="text-lg text-slate-600 leading-relaxed">{content.excerpt}</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
            <CardContent className="p-8">
              {isEditing ? (
                <textarea
                  value={content.content}
                  onChange={(e) => setContent((prev) => ({ ...prev, content: e.target.value }))}
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="Write your article content in Markdown..."
                />
              ) : (
                <div className="prose prose-lg max-w-none">
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

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Article Images</h3>
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
                        <span className="text-sm font-medium">Image {image.id}</span>
                        <Button onClick={() => removeImage(image.id)} variant="outline" size="sm">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    {isEditing ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageUpload(image.id, file)
                          }}
                          className="mb-2"
                        />
                        <p className="text-xs text-gray-500">Upload image (recommended: 600x300px)</p>
                      </div>
                    ) : null}

                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt}
                      width={600}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg"
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
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 italic">{image.caption}</p>
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
            <div className="text-sm text-gray-500">Share this post</div>
          </div>
        </div>
      </div>
    </div>
  )
}
