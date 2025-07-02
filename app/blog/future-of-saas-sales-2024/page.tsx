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
    heroImage: "/images/ai-sales.png",
    content: `
# The Future of SaaS Sales: Trends to Watch in 2024

The SaaS industry is evolving faster than ever, and sales teams must keep pace to remain effective. In 2024, several emerging trends are redefining how software is sold, from AI-driven insights to deeply integrated product strategies.

## 1. AI-Powered Sales Intelligence

AI is no longer a futuristic add-on—it's the engine behind modern sales success. Top sales organizations are using AI to:

- Surface high-potential prospects quickly  
- Personalize outreach at scale with contextual insights  
- Forecast deal outcomes more accurately  
- Automate repetitive tasks, freeing reps to focus on human connection  

AI isn't replacing sellers—it's augmenting them with superpowers.

## 2. Product-Led Growth (PLG) Meets Sales

The PLG model is maturing, and smart sales teams are learning to ride the wave rather than compete against it. Instead of a separate sales funnel, the product itself becomes the starting point:

- Self-service trials evolve into sales-assisted conversions  
- Product usage data triggers perfectly timed outreach  
- In-app behavior fuels smarter, more relevant sales conversations  

When PLG and sales are aligned, customer acquisition becomes seamless.

## 3. Value-Based Selling, Reimagined

Today's buyers want more than a feature checklist—they want outcomes. To win deals, sales teams are moving beyond generic pitches to deliver quantifiable business value:

- Deeper, more strategic discovery conversations  
- Tailored ROI models and impact projections  
- Industry-specific case studies and benchmarks  
- POCs that deliver quick wins and prove long-term value  

It's not about selling software—it's about solving real problems.

## 4. Remote-First Is the New Normal

The pandemic redefined how sales happen, and there’s no going back. High-performing teams have embraced a remote-first approach that blends flexibility with effectiveness:

- Building trust and rapport over video  
- Using digital sales rooms to collaborate with buyers  
- Leaning into asynchronous tools for faster deal cycles  
- Knowing when to go in-person to close strategic accounts  

Virtual selling isn't just efficient—it's now a competitive advantage.

## Key Takeaways

SaaS sales in 2024 demands agility, insight, and alignment across the business. To stay ahead:

1. Leverage AI to work smarter, not harder  
2. Collaborate with product teams to harness user data  
3. Focus on outcomes, not features  
4. Get fluent in remote-first selling—without losing the personal touch  

The future belongs to sales teams that combine technology, empathy, and agility in equal measure.
    `,
    images: [
      {
        id: 1,
        url: "/images/sales-dash.png",
        caption: "AI-powered sales dashboard example",
        alt: "Sales dashboard showing AI insights",
      },
      {
        id: 2,
        url: "public/images/plg-fun.png",
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
