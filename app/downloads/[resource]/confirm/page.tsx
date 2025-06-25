"use client"

import type React from "react"
import { useState } from "react"
import { useParams } from "next/navigation"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Download,
  Heart,
  AlertTriangle,
  DollarSign,
  ExternalLink,
  Upload,
  CheckCircle,
  Star,
  FileText,
} from "lucide-react"
import { resourceConfigs } from "@/lib/resource-config"

export default function ResourceConfirm() {
  const params = useParams()
  const resourceId = params.resource as string
  const resource = resourceConfigs[resourceId]

  const [showSecondChance, setShowSecondChance] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [pdfFile, setPdfFile] = useState<string | null>(resource?.filePath || null)
  const [fileName, setFileName] = useState(resource?.fileName || "resource.pdf")

  if (!resource) {
    return <div>Resource not found</div>
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    ) {
      const fileUrl = URL.createObjectURL(file)
      setPdfFile(fileUrl)
      setFileName(file.name)
    } else {
      alert("Please upload a PDF or Excel file only.")
    }
  }

  const handleDownload = () => {
    if (pdfFile) {
      const link = document.createElement("a")
      link.href = pdfFile
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      alert("File not yet uploaded. Please contact Grant for access.")
    }
  }

  const handleFreeRequest = () => {
    const confirmed = window.confirm(
      `Are you sure you want to skip the donation for the ${resource.title}? This resource took significant time and effort to create. Your support helps me create more valuable content.`,
    )

    if (confirmed) {
      setShowSecondChance(true)
    }
  }

  const paypalLink = `https://paypal.me/grantglazer/${resource.donationAmount}`

  if (showSecondChance) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <FloatingNav />
        <TimezoneClock />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-slate-900 mb-2">Last Chance to Support</CardTitle>
                <p className="text-lg text-slate-600 leading-relaxed">
                  I really appreciate your interest in the {resource.title}. One more opportunity to show your support?
                </p>
              </CardHeader>

              <CardContent className="text-center space-y-6">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Your Support Makes a Difference</h3>
                  <p className="text-slate-700 mb-4 text-sm leading-relaxed">
                    Creating the {resource.title} took significant research and real-world testing. Your donation helps
                    me:
                  </p>
                  <ul className="text-left max-w-md mx-auto space-y-1 text-sm text-slate-600 mb-4">
                    <li>• Continue creating valuable content</li>
                    <li>• Keep resources updated and relevant</li>
                    <li>• Develop new guides and tools</li>
                    <li>• Maintain this website and platform</li>
                  </ul>

                  <Button
                    onClick={() => window.open(paypalLink, "_blank")}
                    size="lg"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold mb-4"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Donate ${resource.donationAmount} via PayPal
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                  <p className="text-slate-600 mb-4 text-sm">
                    I understand everyone's situation is different. If you truly can't donate right now, that's okay.
                  </p>

                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="lg"
                    className="border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Just give it to me already!
                  </Button>

                  <p className="text-xs text-slate-500 mt-3 italic">
                    Please consider sharing this resource with others who might find it valuable.
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-500">
                    Either way, thank you for your interest in improving your skills! 🚀
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
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
        <div className="max-w-2xl mx-auto">
          {/* Admin Edit Toggle */}
          <div className="mb-6 flex justify-end">
            <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "default" : "outline"} size="sm">
              {isEditing ? "Save Changes" : "Edit Resource"}
            </Button>
          </div>

          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-900 mb-2">{resource.title}</CardTitle>
              <p className="text-lg text-slate-600 leading-relaxed">{resource.longDescription}</p>
            </CardHeader>

            <CardContent className="text-center space-y-8">
              {/* PROMINENT DONATION SECTION */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-xl p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-red-500" />
                  <h2 className="text-2xl font-bold text-slate-900">Support This Work</h2>
                </div>

                <p className="text-slate-700 mb-6 text-lg leading-relaxed">
                  This {resource.pageCount} resource represents hours of research and real-world experience.{" "}
                  {resource.funText}
                </p>

                <div className="flex items-center justify-center gap-2 mb-6">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <span className="text-3xl font-bold text-slate-900">${resource.donationAmount}</span>
                  <span className="text-slate-600 text-lg">suggested donation</span>
                </div>

                <Button
                  onClick={() => window.open(paypalLink, "_blank")}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-12 py-4 mb-4 shadow-lg hover:shadow-xl transition-all"
                >
                  <Heart className="w-5 h-5 mr-3" />
                  Donate ${resource.donationAmount} via PayPal
                  <ExternalLink className="w-5 h-5 ml-3" />
                </Button>

                <p className="text-sm text-slate-500 italic">
                  Opens PayPal in a new tab - then return here to download
                </p>
              </div>

              {/* File Upload Section (Admin Only) */}
              {isEditing && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload {resource.title} File
                  </h3>
                  <input
                    type="file"
                    accept=".pdf,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Upload the {resource.title} file (store in /public/downloads/ folder)
                  </p>
                  {pdfFile && (
                    <div className="mt-3 flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">File ready: {fileName}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Download Options */}
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Already donated? Download now!
                  </h3>
                  <p className="text-slate-700 mb-4 text-sm">
                    If you completed your PayPal donation, click below to download your {resource.title}.
                  </p>

                  <Button
                    onClick={handleDownload}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                  >
                    <Download className="w-4 h-4 mr-2" />I Donated - Download Now
                  </Button>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-slate-900">Can't donate right now?</h3>
                  </div>
                  <p className="text-slate-600 mb-4 text-sm">That's okay! Everyone's situation is different.</p>

                  <Button
                    onClick={handleFreeRequest}
                    variant="outline"
                    size="lg"
                    className="border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    No, I'm special and I deserve it for free
                  </Button>
                </div>
              </div>

              {/* What's Included Preview */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
                <h3 className="font-semibold text-slate-900 mb-3 text-center">
                  What's Inside This {resource.pageCount} Guide:
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
                  <ul className="space-y-1">
                    {resource.whatYouGet.slice(0, Math.ceil(resource.whatYouGet.length / 2)).map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                  <ul className="space-y-1">
                    {resource.whatYouGet.slice(Math.ceil(resource.whatYouGet.length / 2)).map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Testimonial */}
              {resource.testimonial && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-slate-700 italic mb-3">"{resource.testimonial.text}"</blockquote>
                  <div className="text-sm text-slate-600">
                    <strong>{resource.testimonial.author}</strong>
                    <br />
                    {resource.testimonial.role}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="text-center space-y-2">
                <p className="text-xs text-slate-500">
                  This resource includes real templates and processes used at successful companies.
                </p>
                <p className="text-xs text-slate-500">
                  Questions?{" "}
                  <a href="mailto:grant@grantglazer.com" className="text-blue-600 hover:text-blue-700">
                    Contact Grant
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
