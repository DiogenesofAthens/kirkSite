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
    title: "Optimizing Enterprise Technology Implementations",
    excerpt: "Best practices for successful technology rollouts in large organizations, from planning to execution.",
    category: "Technology",
    readTime: "8 min read",
    publishDate: "2024-01-09",
    heroImage: "/images/implement-banner.png",
    content: `
# Optimizing Enterprise Technology Implementations

Enterprise technology implementations can make or break digital transformation initiatives. After helping dozens of organizations deploy complex systems, I've identified the key factors that separate successful rollouts from costly failures.

## The Planning Phase: Foundation for Success

### 1. Stakeholder Alignment
Before writing a single line of code or configuring any system, ensure all stakeholders understand:
- Project objectives and success metrics
- Timeline and resource requirements
- Roles and responsibilities
- Communication protocols

### 2. Technical Architecture Review
- Assess current infrastructure capabilities
- Identify integration points and potential conflicts
- Plan for scalability and future growth
- Document security requirements and compliance needs

## Implementation Best Practices

### Phased Rollout Strategy
Never attempt a "big bang" implementation. Instead:

1. Pilot Phase: Start with a small, representative group
2. Limited Rollout: Expand to early adopters
3. Full Deployment: Roll out to entire organization
4. Optimization: Continuous improvement based on feedback

### Change Management
Technology is only as good as user adoption. Focus on:
- Comprehensive training programs
- Clear communication about benefits
- Support systems for troubleshooting
- Feedback loops for continuous improvement

## Common Pitfalls to Avoid

### 1. Insufficient Testing
- Always test in environments that mirror production
- Include edge cases and stress testing
- Validate integrations thoroughly
- Plan for rollback scenarios

### 2. Poor Communication
- Keep all stakeholders informed of progress
- Address concerns proactively
- Celebrate milestones and wins
- Be transparent about challenges

### 3. Inadequate Training
- Start training early in the process
- Provide multiple learning formats
- Create documentation and quick reference guides
- Establish super-user networks

## Measuring Success

Key metrics to track:
- User adoption rates
- System performance metrics
- Business process improvements
- ROI achievement
- User satisfaction scores

## Conclusion

Successful enterprise technology implementations require careful planning, phased execution, and strong change management. By following these best practices, organizations can significantly improve their chances of achieving their digital transformation goals.

Remember: technology is an enabler, not a solution. Focus on the business outcomes you're trying to achieve, and let that guide your implementation strategy.
    `,
    images: [
      {
        id: 1,
        url: "/images/Scrum.png",
        caption: "Example SCRUM Implementation",
        alt: "Project timeline showing implementation phases",
      },
      {
        id: 2,
        url: "/images/stake-matrix.png",
        caption: "Stakeholder communication matrix",
        alt: "Communication plan diagram",
      },
      {
        id: 3,
        url: "/images/success-dashboard.png",
        caption: "Success Metrics Dashboard",
        alt: "A dashboard displaying key performance indicators for tracking implementation success",
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

  // MODAL COMPONENT
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
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image area
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
                {isEditing ? (
                  <input
                    type="text"
                    value={content.title}
                    onChange={(e) => setContent((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full text-3xl font-bold text-slate-900 dark:text-slate-100 bg-transparent border-b border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
                  />
                ) : (
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
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
                      className="bg-transparent border-b border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 text-slate-900 dark:text-slate-100"
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
                      className="bg-transparent border-b border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 text-slate-900 dark:text-slate-100"
                    />
                  ) : (
                    content.readTime
                  )}
                </div>
              </div>

              <div className="mb-6">
                {isEditing ? (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4">
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
                      className="mb-2 text-slate-900 dark:text-slate-100"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
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
                  className="w-full h-64 object-cover rounded-lg cursor-pointer"
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

              {isEditing ? (
                <textarea
                  value={content.excerpt}
                  onChange={(e) => setContent((prev) => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 text-slate-900 dark:text-slate-100 bg-transparent"
                  rows={3}
                  placeholder="Article excerpt..."
                />
              ) : (
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{content.excerpt}</p>
              )}
            </CardContent>
          </Card>

          <Card className="glass border-0 shadow-xl mb-8">
            <CardContent className="p-8">
              {isEditing ? (
                <textarea
                  value={content.content}
                  onChange={(e) => setContent((prev) => ({ ...prev, content: e.target.value }))}
                  className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 font-mono text-sm text-slate-900 dark:text-slate-100 bg-transparent"
                  placeholder="Write your article content in Markdown..."
                />
              ) : (
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
              )}
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

                    {isEditing ? (
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageUpload(image.id, file)
                          }}
                          className="mb-2 text-slate-900 dark:text-slate-100"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
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
                      className={`w-full h-48 object-cover rounded-lg ${!isEditing ? "cursor-pointer" : ""}`}
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
            <div className="text-sm text-gray-500 dark:text-gray-400">Share this post</div>
          </div>
        </div>
      </div>
    </div>
  )
}
