"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { submitContactForm } from "@/app/actions/contact"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  source?: string
}

const pick = () => Math.floor(Math.random() * 10) + 1

export function ContactModal({ isOpen, onClose, source = "Contact Modal" }: ContactModalProps) {
  const [sum, setSum] = useState({ a: 0, b: 0 })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!isOpen) return
    setSum({ a: pick(), b: pick() })
    setStatus("idle")
    setMessage("")
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  async function handleSubmit(formData: FormData) {
    if (Number.parseInt(String(formData.get("captcha")), 10) !== sum.a + sum.b) {
      setStatus("error")
      setMessage("That sum isn't right. Try again.")
      return
    }
    formData.append("source", source)
    setStatus("sending")
    try {
      const result = await submitContactForm(formData)
      setStatus(result.success ? "sent" : "error")
      setMessage(result.message)
    } catch {
      setStatus("error")
      setMessage("Something went wrong sending your message. Please try again.")
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        className="w-full max-w-md rounded-md border border-border bg-background p-7 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 id="contact-title" className="text-lg font-medium text-foreground">
            Contact
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {status === "sent" ? (
          <p className="text-base leading-relaxed text-body">{message}</p>
        ) : (
          <form action={handleSubmit} className="space-y-4">
            <Input name="name" placeholder="Name" aria-label="Name" required className="rounded-sm text-sm" />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              aria-label="Email"
              required
              className="rounded-sm text-sm"
            />
            <Input
              name="company"
              placeholder="Company (optional)"
              aria-label="Company"
              className="rounded-sm text-sm"
            />
            <Textarea
              name="message"
              placeholder="Message"
              aria-label="Message"
              required
              rows={4}
              className="rounded-sm text-sm"
            />
            <div>
              <label htmlFor="contact-captcha" className="mb-2 block text-xs text-muted-foreground">
                What is {sum.a} + {sum.b}?
              </label>
              <Input
                id="contact-captcha"
                name="captcha"
                type="number"
                inputMode="numeric"
                placeholder="Answer"
                required
                className="rounded-sm text-sm"
              />
            </div>
            {status === "error" && (
              <p role="alert" className="text-sm text-destructive">
                {message}
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-sm bg-foreground py-3 text-sm text-background transition-opacity hover:opacity-80 disabled:opacity-50"
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
