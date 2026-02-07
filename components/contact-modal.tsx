"use client"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, Mail } from "lucide-react"
import { submitContactForm } from "@/app/actions/contact"
import Lottie from "@/components/lottie-client"
import planeAnimation from "@/public/images/plane-ani.json"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  source?: string
}

export function ContactModal({ isOpen, onClose, source = "Contact Modal" }: ContactModalProps) {
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

    formData.append("source", source)
    setIsSubmitting(true)

    try {
      const result = await submitContactForm(formData)
      setSubmitMessage(result.message)
      setIsSubmitted(true)

      setTimeout(() => {
        setIsSubmitted(false)
        setSubmitMessage("")
        onClose()
      }, 6000)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (isOpen && captchaQuestion.question === "") {
      generateCaptcha()
    }
  }, [isOpen, captchaQuestion.question])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-background border border-border rounded-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl font-normal tracking-tight text-foreground">Contact</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="max-w-full w-72 h-72 sm:w-80 sm:h-80 mx-auto mb-4">
              <Lottie animationData={planeAnimation} loop={false} />
            </div>
            <h3 className="font-serif text-xl font-normal mb-2 text-foreground">Sent</h3>
            <p className="text-sm text-muted-foreground">{submitMessage}</p>
          </div>
        ) : (
          <form action={handleSubmit} className="space-y-5">
            <Input
              name="name"
              placeholder="Name"
              required
              className="border-border rounded-sm text-sm"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="border-border rounded-sm text-sm"
            />
            <Input
              name="company"
              placeholder="Company (optional)"
              className="border-border rounded-sm text-sm"
            />
            <Textarea
              name="message"
              placeholder="Message"
              required
              rows={4}
              className="border-border rounded-sm text-sm"
            />
            <div>
              <label className="text-xs text-muted-foreground block mb-2">
                {captchaQuestion.question}
              </label>
              <Input
                name="captcha"
                type="number"
                placeholder="Answer"
                required
                className="border-border rounded-sm text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-foreground text-background text-sm tracking-wide uppercase rounded-sm hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
