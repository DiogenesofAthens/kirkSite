"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, X, Send, User, Bot, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { submitContactForm } from "@/app/actions/contact"

interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
}

const KNOWLEDGE_BASE: Record<string, string> = {
  "conga": "Grant is a Principal Sales Engineer at Conga with over 7 years of experience. He has closed over $41M in business, won SE of the Year (2022, 2023), and presented at major events like Conga Connect and SKO.",
  "achievements": "Grant's achievements include SE of the Year (2022, 2023), top SE by revenue in FY 2022, SKO mainstage presenter (2023, 2024), and creator of award-winning demo at SE Summit 2024.",
  "experience": "Grant has 10+ years of experience spanning business development and sales engineering. He has worked at DNN Corp, Canto, and Conga, with a proven record of exceeding sales targets.",
  "education": "Grant holds a Bachelor of Science in Business Administration from California State University, Sacramento, with concentrations in Marketing, Management, and Entrepreneurship.",
  "skills": "His specialties include sales engineering, Quote-to-Cash systems, CLM, CPQ, Salesforce, and full-stack web development. He’s also skilled in automation, media server setups, and home tech.",
  "recommendations": "Colleagues describe Grant as hardworking, innovative, and reliable. CEOs and managers have praised his work ethic, intelligence, and leadership.",
  "media server": "Grant has built custom Unraid-based media servers using Plex, Sonarr, Radarr, and Cloudflared for secure access. He provides technical guides and optimization insights.",
  "location": "Grant lives in the San Francisco Bay Area and works with clients globally, particularly in government and large enterprise sectors.",
  "contact": "I'd be happy to help you reach out to Grant. Please fill out the contact form below.",
  "default": "I can answer questions about Grant's achievements, technical skills, experience, and education. Try asking about his work at Conga, his certifications, or how to contact him."
}

const PROMPT_SUGGESTIONS = [
  "Tell me about Grant's achievements",
  "What’s Grant’s background?",
  "What tech does Grant use?",
  "Where is Grant located?",
  "How can I contact Grant?"
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{
    id: "1",
    content: "Hi! I'm Grant's AI assistant. Ask me anything about his work, background, or expertise.",
    isBot: true,
    timestamp: new Date(),
  }])
  const [inputValue, setInputValue] = useState("")
  const [showContactForm, setShowContactForm] = useState(false)
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: "", answer: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (showContactForm) generateCaptcha()
  }, [showContactForm])

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptchaQuestion({ question: `What is ${num1} + ${num2}?`, answer: num1 + num2 })
  }

  const findResponse = (msg: string): string => {
    const lower = msg.toLowerCase()
    for (const keyword in KNOWLEDGE_BASE) {
      if (lower.includes(keyword)) return KNOWLEDGE_BASE[keyword]
    }
    return KNOWLEDGE_BASE["default"]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    const response = findResponse(inputValue)
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      isBot: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botMessage])
    if (response.includes("contact form")) setTimeout(() => setShowContactForm(true), 800)
  }

  const handleContactSubmit = async (formData: FormData) => {
    const captchaAnswer = formData.get("captcha") as string
    if (Number.parseInt(captchaAnswer) !== captchaQuestion.answer) {
      alert("Please solve the captcha correctly.")
      return
    }
    formData.append("source", "AI Chatbot")
    setIsSubmitting(true)
    try {
      const result = await submitContactForm(formData)
      alert(result.message)
      setShowContactForm(false)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error sending your message.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50" size="icon">
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[520px] shadow-xl z-50 flex flex-col glass">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-lg">Chat with Grant's AI</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-blue-700">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {!showContactForm ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex gap-2", message.isBot ? "justify-start" : "justify-end")}> 
                  {message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  <div className={cn("max-w-[75%] rounded-lg px-3 py-2 text-sm break-words",
                    message.isBot ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100" : "bg-blue-600 text-white")}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                  {!message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
              <div className="flex flex-wrap gap-2 pt-2">
                {PROMPT_SUGGESTIONS.map((text) => (
                  <Button key={text} size="sm" variant="outline" className="text-xs" onClick={() => setInputValue(text)}>
                    {text}
                  </Button>
                ))}
              </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-600 p-4 bg-white/50 dark:bg-slate-800/50">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about Grant's experience..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-white/50 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowContactForm(true)} className="text-xs">
                  <Mail className="w-3 h-3 mr-1" /> Contact Grant
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-50">Contact Grant</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Send Grant a message and he'll get back to you soon.</p>
            </div>
            <form action={handleContactSubmit} className="space-y-4">
              <Input name="name" placeholder="Your Name" required className="bg-white/50 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600" />
              <Input name="email" type="email" placeholder="Your Email" required className="bg-white/50 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600" />
              <Textarea name="message" placeholder="Your Message" required rows={3} className="bg-white/50 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600" />
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{captchaQuestion.question}</label>
                <Input name="captcha" type="number" placeholder="Answer" required className="bg-white/50 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600" />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send Message"}</Button>
                <Button type="button" variant="outline" onClick={() => setShowContactForm(false)}>Back to Chat</Button>
              </div>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
