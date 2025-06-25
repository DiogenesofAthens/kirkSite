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
    title: "Building Effective Sales Processes for Government Contracts",
    excerpt: "Navigate the complexities of government sales with proven strategies and compliance considerations.",
    category: "Government Sales",
    readTime: "6 min read",
    publishDate: "2024-01-05",
    heroImage: "/placeholder.svg?height=400&width=800",
    content: `
# Building Effective Sales Processes for Government Contracts

Government sales present unique challenges and opportunities. After years of selling to federal, state, and local agencies, I've learned that success requires a fundamentally different approach than commercial sales.

## Understanding the Government Buying Process

### The Procurement Lifecycle
Government purchases follow a structured process:

1. **Requirements Definition**: Agencies identify needs and create specifications
2. **Market Research**: Evaluation of available solutions and vendors
3. **Solicitation**: RFP, RFQ, or RFI publication
4. **Proposal Submission**: Vendor responses to solicitation
5. **Evaluation**: Technical and cost assessment
6. **Award**: Contract selection and negotiation
7. **Performance**: Contract execution and management

### Key Stakeholders
- **End Users**: The people who will actually use your solution
- **Technical Evaluators**: IT staff who assess technical capabilities
- **Procurement Officers**: Legal and contracting professionals
- **Budget Holders**: Financial decision makers
- **Compliance Officers**: Ensure regulatory adherence

## Building Relationships Before the RFP

### Early Engagement Strategies
- Attend industry days and vendor outreach events
- Participate in pre-solicitation conferences
- Engage through GSA schedules and contract vehicles
- Build relationships with systems integrators and prime contractors

### Understanding Agency Priorities
Research each agency's:
- Strategic plans and initiatives
- Budget cycles and constraints
- Past procurement patterns
- Current technology challenges

## Proposal Best Practices

### Technical Approach
- Address every requirement explicitly
- Provide detailed implementation plans
- Include risk mitigation strategies
- Demonstrate past performance with similar projects

### Compliance is Critical
- Follow all formatting requirements exactly
- Meet every deadline without exception
- Include all required certifications
- Ensure pricing aligns with solicitation structure

### Differentiation Strategies
- Highlight unique capabilities and innovations
- Provide relevant case studies and references
- Demonstrate cost savings and efficiency gains
- Show understanding of agency-specific challenges

## Common Pitfalls to Avoid

### 1. Underestimating Timeline
Government sales cycles are typically 12-18 months. Plan accordingly.

### 2. Ignoring Small Businesses Requirements
Many contracts have small business set-asides or subcontracting requirements.

### 3. Poor Past Performance Documentation
Maintain detailed records of all government work for future proposals.

### 4. Inadequate Compliance Tracking
Use checklists and multiple reviews to ensure full compliance.

## Post-Award Success

### Contract Management
- Establish clear communication protocols
- Track performance metrics religiously
- Manage scope changes through proper channels
- Maintain security and compliance requirements

### Building for Future Opportunities
- Exceed performance expectations
- Document successes and lessons learned
- Maintain relationships with key stakeholders
- Position for contract renewals and expansions

## Key Success Factors

1. **Patience and Persistence**: Government sales require long-term commitment
2. **Attention to Detail**: Compliance is non-negotiable
3. **Relationship Building**: Invest in long-term partnerships
4. **Past Performance**: Your track record is your best sales tool
5. **Understanding the Mission**: Align your solution with agency goals

## Conclusion

Government sales success comes from understanding the unique requirements, building strong relationships, and maintaining unwavering attention to compliance and performance. While the sales cycle is longer and more complex, the rewards can be substantial for organizations willing to invest in doing it right.

Remember: in government sales, your reputation is everything. Focus on delivering exceptional value and building trust with every interaction.
    `,
    images: [
      {
        id: 1,
        url: "/placeholder.svg?height=300&width=600",
        caption: "Government procurement process flow",
        alt: "Flowchart showing government buying process",
      },
      {
        id: 2,
        url: "/placeholder.svg?height=300&width=600",
        caption: "Stakeholder mapping for government sales",
        alt: "Diagram of government decision makers",
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
