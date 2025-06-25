"use client"

import type React from "react"

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Heart, AlertTriangle, DollarSign, ExternalLink, Upload, CheckCircle } from "lucide-react"

export default function ConfirmDownload() {
  const [showSecondChance, setShowSecondChance] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [pdfFile, setPdfFile] = useState<string | null>(null)
  const [fileName, setFileName] = useState("sdr-process-guide.pdf")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file)
      setPdfFile(fileUrl)
      setFileName(file.name)
    } else {
      alert("Please upload a PDF file only.")
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
      // If no file uploaded, create a placeholder download
      alert("PDF file not yet uploaded. Please contact Grant for access.")
    }
  }

  const handleFreeRequest = () => {
    const confirmed = window.confirm(
      "Are you sure you want to skip the donation? This resource took significant time and effort to create. Your support helps me create more valuable content.",
    )

    if (confirmed) {
      setShowSecondChance(true)
    }
  }

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
                  I really appreciate your interest in my work. One more opportunity to show your support?
                </p>
              </CardHeader>

              <CardContent className="text-center space-y-6">
                {/* Final Donation Appeal */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Your Support Makes a Difference</h3>
                  <p className="text-slate-700 mb-4 text-sm leading-relaxed">
                    Creating quality resources takes time, research, and effort. Your donation helps me:
                  </p>
                  <ul className="text-left max-w-md mx-auto space-y-1 text-sm text-slate-600 mb-4">
                    <li>• Continue creating valuable content</li>
                    <li>• Keep resources updated and relevant</li>
                    <li>• Develop new guides and tools</li>
                    <li>• Maintain this website and platform</li>
                  </ul>

                  <Button
                    onClick={() => window.open("https://paypal.me/grantglazer/10", "_blank")}
                    size="lg"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold mb-4"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Donate $10 via PayPal
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Final Free Download */}
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

                {/* Thank You Note */}
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
                <Download className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-900 mb-2">SDR Process Guide</CardTitle>
              <p className="text-lg text-slate-600 leading-relaxed">
                Complete guide to qualifying leads, Salesforce best practices, and SDR workflows
              </p>
            </CardHeader>

            <CardContent className="text-center space-y-8">
              {/* PROMINENT DONATION SECTION - FRONT AND CENTER */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-xl p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-red-500" />
                  <h2 className="text-2xl font-bold text-slate-900">Support This Work</h2>
                </div>

                <p className="text-slate-700 mb-6 text-lg leading-relaxed">
                  This comprehensive 25+ page guide represents hours of research and real-world experience. Your support
                  helps me create more valuable resources like this.
                </p>

                <div className="flex items-center justify-center gap-2 mb-6">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <span className="text-3xl font-bold text-slate-900">$10</span>
                  <span className="text-slate-600 text-lg">suggested donation</span>
                </div>

                <Button
                  onClick={() => window.open("https://paypal.me/grantglazer/10", "_blank")}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-12 py-4 mb-4 shadow-lg hover:shadow-xl transition-all"
                >
                  <Heart className="w-5 h-5 mr-3" />
                  Donate $10 via PayPal
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
                    Upload SDR Process Guide PDF
                  </h3>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Upload the SDR Process Guide PDF file (store in /public/downloads/ folder)
                  </p>
                  {pdfFile && (
                    <div className="mt-3 flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">File uploaded: {fileName}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Download Options */}
              <div className="space-y-4">
                {/* Donation Confirmation */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Already donated? Download now!
                  </h3>
                  <p className="text-slate-700 mb-4 text-sm">
                    If you completed your PayPal donation, click below to download your guide.
                  </p>

                  <Button
                    onClick={handleDownload}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                  >
                    <Download className="w-4 h-4 mr-2" />I Donated - Download Now
                  </Button>
                </div>

                {/* Alternative Option */}
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
                <h3 className="font-semibold text-slate-900 mb-3 text-center">What's Inside This Guide:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
                  <ul className="space-y-1">
                    <li>• Managing Salesforce Queue & Lead Status</li>
                    <li>• Call Templates & Sales Scripts</li>
                    <li>• Qualifying Questions by Role</li>
                    <li>• Email Templates for Every Scenario</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Lead Conversion Best Practices</li>
                    <li>• Outlook Calendar Integration</li>
                    <li>• Duplicate Management Process</li>
                    <li>• 25+ Email Templates Ready to Use</li>
                  </ul>
                </div>
              </div>

              {/* Additional Info */}
              <div className="text-center space-y-2">
                <p className="text-xs text-slate-500">
                  This guide includes real templates and processes used at successful SaaS companies.
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
