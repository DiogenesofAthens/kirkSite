"use client"

import type React from "react"

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Upload, CheckCircle, FileText, DollarSign } from "lucide-react"

export default function SDRProcessGuide() {
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

  const handleDonateClick = () => {
    // Open PayPal in new tab
    window.open("https://paypal.me/grantglazer/10", "_blank")

    // Open confirmation page in another new tab
    window.open("/downloads/sdr-process-guide/confirm", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-slate-100 relative overflow-hidden">
      {/* Animated Background Elements */}
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

          {/* Resource Card */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">SDR Process Guide</CardTitle>
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg mx-auto">
                A complete guide to qualifying leads, Salesforce best practices, and SDR workflows.
              </p>
            </CardHeader>

            <CardContent className="text-center space-y-6">
              {/* Price and Donation */}
              <div className="bg-slate-50 rounded-lg p-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-2xl font-bold text-slate-900">$10</span>
                  <span className="text-slate-600">suggested donation</span>
                </div>

                <Button
                  onClick={handleDonateClick}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 mb-4"
                >
                  <span className="inline-flex items-center gap-2">
                    Donate via PayPal
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </Button>

                <p className="text-sm text-slate-500 italic">
                  This will open PayPal and your download page in new tabs.
                </p>
              </div>

              {/* File Upload Section (Admin Only) */}
              {isEditing && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload PDF File
                  </h3>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Upload the SDR Process Guide PDF file for users to download
                  </p>
                  {pdfFile && (
                    <div className="mt-3 flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">File uploaded: {fileName}</span>
                    </div>
                  )}
                </div>
              )}

              {/* What's Included */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-3">What's Included:</h3>
                <ul className="text-left max-w-md mx-auto space-y-2 text-sm text-slate-700">
                  <li>• Complete SDR qualification framework</li>
                  <li>• Salesforce best practices and workflows</li>
                  <li>• Email templates and call scripts</li>
                  <li>• Lead scoring and prioritization methods</li>
                  <li>• Performance tracking and KPI guidelines</li>
                  <li>• Real-world examples and case studies</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-sm text-slate-500">
              Need help or have questions?{" "}
              <a href="mailto:grant@grantglazer.com" className="text-blue-600 hover:text-blue-700">
                Contact Grant
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
