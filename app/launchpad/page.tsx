"use client"

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CheckCircle, FileText, PenTool, Rocket } from "lucide-react"
import Lottie from "lottie-react"
import rocketAnimation from "@/public/images/rocket-ani.json"

export default function LaunchpadPage() {
  const [formVisible, setFormVisible] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("/api/submit-launch", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          linkedin: formData.get("linkedin"),
          domain: formData.get("domain"),
          info: formData.get("info"),
          notes: formData.get("notes"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        setFormSubmitted(true)
        setTimeout(() => {
          setFormVisible(false)
          setFormSubmitted(false)
        }, 6000)
      } else {
        alert("There was a problem submitting your request. Please try again.")
      }
    } catch (err) {
      console.error(err)
      alert("Error sending your form. Please try again later.")
    }
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 dark:bg-blue-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 dark:bg-purple-800/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <FloatingNav />

      <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-32 sm:w-40 md:w-52 mx-auto mb-6 transition-transform duration-1000" style={{ transform: formSubmitted ? "translateY(-200vh)" : "translateY(0)" }}>
            <Lottie animationData={rocketAnimation} loop={!formSubmitted} autoplay />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4">Digital Identity Launchpad</h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            Launch your professional presence with a website just like this one — designed, built, and powered by Grant.
          </p>
          <p className="text-base text-slate-600 dark:text-slate-400 mb-10">
            Your custom site includes light/dark mode, mobile responsiveness, and a live desktop timezone clock.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left mb-10">
            <Card className="glass border-0 shadow-xl text-center">
              <CardContent className="pt-6">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">6 Pages</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Home, Expertise, Resume, Recommendations, Resources, Blog</p>
              </CardContent>
            </Card>
            <Card className="glass border-0 shadow-xl text-center">
              <CardContent className="pt-6">
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">Blog & Guides</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Base: 1 sample post. Premium: 5 posts & 2 paid guides</p>
              </CardContent>
            </Card>
            <Card className="glass border-0 shadow-xl text-center">
              <CardContent className="pt-6">
                <PenTool className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">Custom Setup</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Styled with your content, name & domain help</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <a href="https://www.paypal.com/paypalme/grantglazer/1000" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Base Package – $1000</Button>
            </a>
            <a href="https://www.paypal.com/paypalme/grantglazer/2500" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">Premium Package – $2500</Button>
            </a>
          </div>

          {!formSubmitted && (
            <div className="mb-10">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => setFormVisible(true)}>
                Sign Me Up!
              </Button>
            </div>
          )}

          {formVisible && !formSubmitted && (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white/60 dark:bg-slate-800/70 backdrop-blur-md p-6 rounded-xl shadow-lg space-y-4">
              <Input name="name" placeholder="Your Name *" required />
              <Input name="email" type="email" placeholder="Your Email *" required />
              <Input name="linkedin" placeholder="LinkedIn Profile" />
              <Input name="domain" placeholder="Preferred Domain Name (if any)" />
              <Textarea name="info" placeholder="Tell me what you'd like on your site *" rows={4} required />
              <Textarea name="notes" placeholder="Please share any public folders with your images / content, or you can send to me via email after payment is sent." rows={3} />
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                Work begins after full payment is received. Turnaround time: ~1 month. You’ll receive progress updates throughout.
              </p>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                Submit Launch Request
              </Button>
            </form>
          )}

          {formSubmitted && (
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">Thank you!</h2>
              <p className="text-slate-700 dark:text-slate-300">Grant will be in touch soon to start your launch journey 🚀</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
