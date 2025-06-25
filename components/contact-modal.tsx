"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Mail, CheckCircle } from "lucide-react"
import { submitContactForm } from "@/app/actions/contact"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: "", answer: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptchaQuestion({
      question: `What is ${num1} + ${num2}?`,
      answer: num1 + num2,
    })
  }

  const handleSubmit = async (formData: FormData) => {
    const captchaAnswer = formData.get("captcha") as string

    if (Number.parseInt(captchaAnswer) !== captchaQuestion.answer) {
      alert("Please solve the captcha correctly.")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitContactForm(formData)
      setSubmitMessage(result.message)
      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setSubmitMessage("")
        onClose()
      }, 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Generate captcha when modal opens
  useEffect(() => {
    if (isOpen && captchaQuestion.question === "") {
      generateCaptcha()
    }
  }, [isOpen, captchaQuestion.question])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-xl text-slate-900 dark:text-slate-50">Contact Grant</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-50">Message Sent!</h3>
              <p className="text-slate-600 dark:text-slate-400">{submitMessage}</p>
            </div>
          ) : (
            <form action={handleSubmit} className="space-y-4">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name *"
                  required
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600"
                />
              </div>

              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email *"
                  required
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600"
                />
              </div>

              <div>
                <Input
                  name="company"
                  placeholder="Company (Optional)"
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600"
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="How can Grant help you? *"
                  required
                  rows={4}
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2 text-slate-700 dark:text-slate-300">
                  Security Check: {captchaQuestion.question}
                </label>
                <Input
                  name="captcha"
                  type="number"
                  placeholder="Answer"
                  required
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600"
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
