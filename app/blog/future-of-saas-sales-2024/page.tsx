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
    title: "The Future of SaaS Sales: Trends to Watch in 2024",
    excerpt:
      "Exploring emerging trends in software sales and how businesses can adapt to changing customer expectations.",
    category: "Sales",
    readTime: "5 min read",
    publishDate: "2024-01-15",
    heroImage: "/placeholder.svg?height=400&width=800",
    content: `
# The Future of SaaS Sales: Trends to Watch in 2024

The SaaS industry continues to evolve at breakneck speed, and sales teams must adapt to stay competitive. As we move through 2024, several key trends are reshaping how we approach software sales.

## 1. AI-Powered Sales Intelligence

Artificial intelligence is no longer a nice-to-have—it's becoming essential for competitive sales teams. AI tools are helping sales professionals:

- Identify the best prospects faster
- Personalize outreach at scale
- Predict deal outcomes with greater accuracy
- Automate routine tasks to focus on relationship building

## 2. Product-Led Growth (PLG) Integration

The lines between marketing, product, and sales are blurring. Successful SaaS companies are integrating PLG strategies with traditional sales motions:

- Self-serve trials that convert to sales-assisted deals
- In-product signals that trigger sales outreach
- Usage data informing sales conversations

## 3. Value-Based Selling Evolution

Customers are more sophisticated than ever. They want to see clear ROI before making purchasing decisions. This means:

- Deeper discovery conversations
- Custom ROI calculations for each prospect
- Proof of concept (POC) processes that demonstrate real value
- Case studies specific to industry and use case

## 4. Remote-First Sales Processes

The pandemic accelerated remote selling, and it's here to stay. Top-performing teams are mastering:

- Virtual relationship building
- Digital sales rooms and collaboration spaces
- Video-first communication strategies
- Asynchronous sales processes

## Key Takeaways

To succeed in 2024's SaaS sales landscape:

1. **Embrace AI tools** but don't lose the human touch
2. **Align with product teams** to leverage usage data
3. **Focus on value demonstration** over feature selling
4. **Master virtual selling** while looking for in-person opportunities

The future belongs to sales teams that can blend technology with authentic relationship building.
    `,
    images: [
      {
        id: 1,
        url: "/placeholder.svg?height=300&width=600",
        caption: "AI-powered sales dashboard example",
        alt: "Sales dashboard showing AI insights",
      },
      {
        id: 2,
        url: "/placeholder.svg?height=300&width=600",
        caption: "Product-led growth funnel visualization",
        alt: "PLG funnel diagram",
      },
    ],
  })

  const handleImageUpload = (imageId: number, file: File) => {
    // In a real implementation, you'd upload to your storage service
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
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          {/* Edit Toggle */}
          <div className="mb-6 flex justify-end">
            <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "default" : "outline"}>
              {isEditing ? "Save Changes" : "Edit Post"}
            </Button>
          </div>

          {/* Article Header */}
          <Card className="glass border-0 shadow-xl">
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
                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                ) : (
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                    {content.title}
                  </h1>
                )}
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="date"
                      value={content.publishDate}
                      onChange={(e) => setContent((prev) => ({ ...prev, publishDate: e.target.value }))}
                      className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
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
                      className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                  ) : (
                    content.readTime
                  )}
                </div>
              </div>

              {/* Hero Image */}
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
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Upload hero image (recommended: 800x400px)
                    </p>
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

              {/* Excerpt */}
              {isEditing ? (
                <textarea
                  value={content.excerpt}
                  onChange={(e) => setContent((prev) => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  rows={3}
                  placeholder="Article excerpt..."
                />
              ) : (
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{content.excerpt}</p>
              )}
            </CardContent>
          </Card>

          {/* Article Content */}
          <Card className="glass border-0 shadow-xl">
            <CardContent className="p-8">
              {isEditing ? (
                <textarea
                  value={content.content}
                  onChange={(e) => setContent((prev) => ({ ...prev, content: e.target.value }))}
                  className="w-full h-96 p-2 border border-gray-300 dark:border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-sm"
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

          {/* Images Section */}
          <Card className="glass border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">Article Images</h3>
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
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Image {image.id}</span>
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
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Upload image (recommended: 600x300px)
                        </p>
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
                          className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
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
                          className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600 dark:text-slate-400 italic">{image.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link href="/blog" className="text-blue-600 hover:text-blue-700">
              ← Back to all posts
            </Link>
            <div className="text-sm text-slate-500 dark:text-slate-400">Share this post</div>
          </div>
        </div>
      </div>
    </div>
  )
}
