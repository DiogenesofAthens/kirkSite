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
    title: "Selling Enterprise Contract Management Software: Strategy, Discovery, and Results",
    excerpt: "How to uncover pain, match solutions to problems, and deliver ROI with modern CLM platforms.",
    category: "Sales",
    readTime: "6 min read",
    publishDate: "2024-01-05",
    heroImage: "/images/clm-hero.png",
    content: `
# Selling Enterprise Contract Management Software: Strategy, Discovery, and Results

Selling contract lifecycle management (CLM) software in the enterprise space means understanding process bottlenecks, uncovering operational risk, and translating feature sets into business outcomes. After years of working with complex CLM implementations, one thing is clear—every buyer has a contract problem. Your job is to map your solution to that problem in a way that delivers measurable value.

## Understanding the CLM Buying Journey

Contract management isn’t owned by one department. It's a shared challenge across legal, procurement, sales, finance, and IT. That means different stakeholders will evaluate your solution through different lenses.

Most CLM sales cycles follow a predictable pattern:

1. Request and discovery  
2. Process mapping and solution alignment  
3. Validation through demos or pilot programs  
4. Proposal and negotiation  
5. Implementation and success planning  

Winning requires positioning your platform not just as a tool, but as a strategic enabler of efficiency, compliance, and risk reduction.

## Discovery: Understand the Entire Contract Lifecycle

Discovery is where the real sale happens. You're not just asking about features—they're buying a process fix. A few key areas to explore:

### Request and Intake

- How are contract requests submitted today?
- Are requests standardized or handled ad hoc?
- Is there a formal intake form or queue?
- How are contracts prioritized and routed?

A solid CLM solution should streamline intake with structured request workflows, templates, and automated routing logic.

### Creation vs. Third-Party Paper (3PP)

- Are most agreements authored internally or based on third-party templates?
- How is third-party paper reviewed and reconciled?
- Is clause negotiation manual or automated?

A mature platform must support both native contract generation and robust third-party document ingestion, including redlining and comparison tools.

### Metadata and Obligation Tracking

- Can they report on what’s inside their contracts?
- How are key fields like renewal dates, termination clauses, and payment terms tracked?
- Are obligations monitored after execution?

CLM isn’t just about drafting—it’s about knowing what you’ve committed to. Metadata tagging, custom fields, obligation alerts, and post-signature dashboards are key differentiators.

### Approvals and Workflow Automation

- What’s the approval process for each contract type?
- Who signs off on legal, commercial, and finance?
- Are approvals based on thresholds or conditions?

Dynamic approval workflows based on contract metadata (value, type, region, etc.) save time, reduce errors, and improve visibility.

### eSignature Integration

- What platform is used for execution (DocuSign, Adobe, etc.)?
- Is eSign integrated directly or handled separately?
- How is the final, signed copy stored and tracked?

Tight eSignature integration ensures a seamless transition from approval to execution with no manual steps or version confusion.

### Versioning and Clause Management

- How are versions tracked during negotiation?
- Is there a standard clause library?
- Are fallback positions defined and reusable?

Version control and clause libraries bring consistency to legal language and reduce redline cycles. Advanced solutions also support clause-level insights across agreements.

## Leveraging AI for Contract Discovery

AI in CLM is no longer hype—it’s practical. Ask how they're currently handling:

- Legacy contract discovery  
- Third-party document classification  
- Metadata extraction  
- Risk flagging or clause comparison  

AI accelerates onboarding by analyzing executed contracts, extracting key terms, and populating fields automatically. It also enables quick audit and compliance checks across thousands of agreements.

## Matching Solution to Problem

The best sales reps don’t pitch—they prescribe. Once you’ve understood the pain, tailor your demo, proposal, and business case accordingly.

### Common Pain Points and How to Solve Them

- Long cycle times: Address with self-service templates, smart workflows, and eSign  
- Low visibility: Offer a searchable repository, metadata-driven dashboards, and alerts  
- Risk and non-compliance: Use standardized language, automated approval logic, and obligation tracking  
- Manual processes: Eliminate spreadsheets and emails with automation and integration  

Every feature should be tied back to a specific outcome—faster execution, reduced risk, improved compliance, or better insights.

## Proposal, Value, and Implementation

When presenting your solution:

- Quantify ROI with real metrics: average days saved per agreement, hours reduced for legal, faster revenue recognition  
- Speak their language: legal wants control, sales wants speed, finance wants data  
- Position implementation as a partnership with a clear success plan  

Your value doesn’t stop at the sale. It compounds through adoption.

## Final Thoughts

Enterprise CLM sales require depth, patience, and precision. Buyers aren’t looking for software—they’re looking for solutions to broken processes. Lead with curiosity, build trust through discovery, and guide them to a better contracting future.

In this space, you’re not just selling automation—you’re helping teams regain control of one of the most critical assets in their business: their contracts.
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
                  className="w-full h-auto object-contain rounded-lg transition-transform hover:scale-105 duration-200"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
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
          </div>
        </div>
      </div>
    </div>
  )
}
