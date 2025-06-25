"use client"

import type React from "react"
import { useState } from "react"
import { useParams } from "next/navigation"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Heart, AlertTriangle, DollarSign, ExternalLink, CheckCircle, Star, FileText } from "lucide-react"
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
    // Use the actual PDF file from the repository
    const link = document.createElement("a")
    link.href = "/downloads/sdr-process-guide.pdf"
    link.download = "sdr-process-guide.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
      <div className="min-h-screen gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse dark:bg-blue-800/20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000 dark:bg-purple-800/20"></div>
        </div>

        <FloatingNav />
        <TimezoneClock />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm dark:bg-slate-800/90 dark:border dark:border-slate-700">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                  Last Chance to Support
                </CardTitle>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  I really appreciate your interest in the {resource.title}. One more opportunity to show your support?
                </p>
              </CardHeader>

              <CardContent className="text-center space-y-6">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6 dark:bg-gradient-to-r dark:from-orange-900 dark:to-red-900 dark:border-orange-700">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-3">
                    Your Support Makes a Difference
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-4 text-sm leading-relaxed">
                    Creating the {resource.title} took significant research and real-world testing. Your donation helps
                    me:
                  </p>
                  <ul className="text-left max-w-md mx-auto space-y-1 text-sm text-slate-600 dark:text-slate-400 mb-4">
                    <li>• Continue creating valuable content</li>
                    <li>• Keep resources updated and relevant</li>
                    <li>• Develop new guides and tools</li>
                    <li>• Maintain this website and platform</li>
                  </ul>

                  <Button
                    onClick={() => window.open(paypalLink, "_blank")}
                    size="lg"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold mb-4 dark:bg-orange-500 dark:hover:bg-orange-600"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Donate ${resource.donationAmount} via PayPal
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 dark:bg-slate-900 dark:border-slate-700">
                  <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                    I understand everyone's situation is different. If you truly can't donate right now, that's okay.
                  </p>

                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="lg"
                    className="border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Just give it to me already!
                  </Button>

                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-3 italic">
                    Please consider sharing this resource with others who might find it valuable.
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-500">
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
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse dark:bg-blue-800/20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000 dark:bg-purple-800/20"></div>
      </div>

      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm dark:bg-slate-800/90 dark:border dark:border-slate-700">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                {resource.title}
              </CardTitle>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{resource.longDescription}</p>
            </CardHeader>

            <CardContent className="text-center space-y-8">
              {/* PROMINENT DONATION SECTION */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-xl p-8 dark:bg-gradient-to-r dark:from-blue-900 dark:to-green-900 dark:border-blue-700">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-red-500" />
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Support This Work</h2>
                </div>

                <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg leading-relaxed">
                  This {resource.pageCount} resource represents hours of research and real-world experience.{" "}
                  {resource.funText}
                </p>

                <div className="flex items-center justify-center gap-2 mb-6">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <span className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                    ${resource.donationAmount}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 text-lg">suggested donation</span>
                </div>

                <Button
                  onClick={() => window.open(paypalLink, "_blank")}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-12 py-4 mb-4 shadow-lg hover:shadow-xl transition-all dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  <Heart className="w-5 h-5 mr-3" />
                  Donate ${resource.donationAmount} via PayPal
                  <ExternalLink className="w-5 h-5 ml-3" />
                </Button>

                <p className="text-sm text-slate-500 dark:text-slate-500 italic">
                  Opens PayPal in a new tab - then return here to download
                </p>
              </div>

              {/* Download Options */}
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 dark:bg-green-900 dark:border-green-700">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-3 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Already donated? Download now!
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-4 text-sm">
                    If you completed your PayPal donation, click below to download your {resource.title}.
                  </p>

                  <Button
                    onClick={handleDownload}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold dark:bg-green-500 dark:hover:bg-green-600"
                  >
                    <Download className="w-4 h-4 mr-2" />I Donated - Download Now
                  </Button>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 dark:bg-slate-900 dark:border-slate-700">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50">Can't donate right now?</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                    That's okay! Everyone's situation is different.
                  </p>

                  <Button
                    onClick={handleFreeRequest}
                    variant="outline"
                    size="lg"
                    className="border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    No, I'm special and I deserve it for free
                  </Button>
                </div>
              </div>

              {/* What's Included Preview */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left dark:bg-blue-900 dark:border-blue-700">
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-3 text-center">
                  What's Inside This {resource.pageCount} Guide:
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-slate-300">
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
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 dark:bg-gradient-to-r dark:from-purple-900 dark:to-blue-900 dark:border-purple-700">
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-slate-700 dark:text-slate-300 italic mb-3">
                    "{resource.testimonial.text}"
                  </blockquote>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>{resource.testimonial.author}</strong>
                    <br />
                    {resource.testimonial.role}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="text-center space-y-2">
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  This resource includes real templates and processes used at successful companies.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Questions?{" "}
                  <a
                    href="mailto:grant@grantglazer.com"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
                  >
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
