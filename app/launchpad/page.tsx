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
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: "Bearer re_GELN4Nx2_KzUZw2wL2xuMna58oAGkJxov",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Grant Glazer <launchpad@grantglazer.com>",
          to: "rockwellwildhorse@gmail.com",
          subject: "New Launchpad Submission",
          html: `<p><strong>Name:</strong> ${formData.get("name")}</p>
                 <p><strong>Email:</strong> ${formData.get("email")}</p>
                 <p><strong>LinkedIn:</strong> ${formData.get("linkedin")}</p>
                 <p><strong>Domain:</strong> ${formData.get("domain")}</p>
                 <p><strong>Info:</strong> ${formData.get("info")}</p>
                 <p><strong>Notes:</strong> ${formData.get("notes")}</p>`
        }),
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

          <div className="grid md:grid-cols-3 gap-6 text-left mb-10">
            <Card className="glass border-0 shadow-xl text-center">
              <CardContent className="pt-6">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">4 Pages</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Homepage, Resources, Blog, Contact</p>
              </CardContent>
            </Card>
            <Card className="glass border-0 shadow-xl text-center">
              <CardContent className="pt-6">
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">2 Sample Blog Posts</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Jumpstart your content strategy</p>
              </CardContent>
            </Card>
            <Card className="glass border-0 shadow-xl text-center">
              <CardContent className="pt-6">
                <PenTool className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">Custom Setup</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Styled with your content, name & domain</p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass mb-10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-50">Base Package – $1000</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Custom clone of this site with your name, details, and content. Includes setup and domain configuration help.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="text-left text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li>Home page with animated headers</li>
                <li>Resources page with 3 built-in games</li>
                <li>Blog with 2 sample posts</li>
                <li>Includes setup, styling, and domain help</li>
              </ul>
              <div className="pt-4">
                <a
                  href="https://www.paypal.com/donate/?business=launchpad@grantglazer.com&amount=1000"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-green-600 hover:bg-green-700 text-white">Pay $1000 Now via PayPal</Button>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="glass mb-10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-50">Premium Package – $2500</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Includes all base features, plus 2 paid resource guides and 3 blog posts written & integrated by Grant.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="text-left text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li>Everything in the Base Package</li>
                <li>2 Paid Resource Guide Creations</li>
                <li>3 Custom Blog Posts</li>
                <li>Tailored support and enhancements</li>
              </ul>
              <div className="pt-4">
                <a
                  href="https://www.paypal.com/donate/?business=launchpad@grantglazer.com&amount=2500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Pay $2500 Now via PayPal</Button>
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="mb-8">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg" onClick={() => setFormVisible(true)}>
              Sign Me Up!
            </Button>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Work begins once form is submitted and full payment is received.
            </p>
          </div>

          {formVisible && !formSubmitted && (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 text-left">
              <Input name="name" placeholder="Your Name *" required />
              <Input name="email" type="email" placeholder="Your Email *" required />
              <Input name="linkedin" placeholder="LinkedIn Profile *" required />
              <Input name="domain" placeholder="Preferred Domain (optional)" />
              <Textarea name="info" rows={4} placeholder="Tell me what you want to include on your site *" required />
              <Textarea name="notes" rows={3} placeholder="Any notes or requests? (Optional)" />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Submit Launch Request
              </Button>
            </form>
          )}

          {formSubmitted && (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">Thanks — Grant will be in touch soon!</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Your submission was received. You’ll get updates on your custom site soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
