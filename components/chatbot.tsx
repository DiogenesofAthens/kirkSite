"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, X, Send, User, Bot, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
}

interface ContactFormData {
  name: string
  email: string
  message: string
  captcha: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm Grant's AI assistant. I can answer detailed questions about his background, experience, and expertise based on his website content. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    captcha: "",
  })
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: "", answer: 0 })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    generateCaptcha()
  }, [showContactForm])

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptchaQuestion({
      question: `What is ${num1} + ${num2}?`,
      answer: num1 + num2,
    })
  }

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Detailed responses based on actual website content
    if (message.includes("conga") || message.includes("principal sales engineer")) {
      return "Grant is currently a Principal Sales Engineer at Conga (formerly Apttus), a position he's held since March 2024. He's been with Conga for over 7 years total, progressing through multiple roles. He's personally helped close over $41 million in business across 90+ enterprise customers. He was awarded SE of the Year in both 2022 and 2023, and was the top performing SE by revenue in FY 2022. He's also been a SKO Mainstage Presenter in 2023 and 2024, and presented at Conga Connect 2024 to over 600 people."
    }

    if (message.includes("achievements") || message.includes("awards") || message.includes("recognition")) {
      return "Grant has impressive achievements: SE of the Year 2022 & 2023 at Conga, Top performing SE by revenue FY 2022, overachieved quota in FY 2020-2023, SKO Mainstage Presenter 2023 & 2024, Conga Connect Mainstage Presenter 2024 (600+ audience), SE Summit 2024 Best Innovation Demo award, and was promoted to support the Strategic Sales team in Feb 2025. He's also generated over $8 million in pipeline and consistently exceeded quotas by 150% in previous roles."
    }

    if (message.includes("experience") || message.includes("career") || message.includes("background")) {
      return "Grant has 10+ years of experience in sales engineering and business development. At Conga since 2017, he started as Sr. BDR and progressed to Principal Sales Engineer. Before Conga, he worked at DNN Corp (2015-2017) where he was promoted from SDR to Team Manager to Account Executive, and at Canto as Account Executive. He's worked with major companies like Salesforce, Docusign, Workday, Twilio, HealthEquity, Splunk, TriNet, ServiceNow, Apple, Tesla, and Western Union."
    }

    if (message.includes("education") || message.includes("university") || message.includes("degree")) {
      return "Grant earned his Bachelor of Science in Business Administration from California State University, Sacramento, with dedicated concentrations in Marketing, General Management, and Entrepreneurship. He's originally from San Diego but now lives in the San Francisco Bay Area."
    }

    if (message.includes("expertise") || message.includes("skills") || message.includes("specialization")) {
      return "Grant specializes in three main areas: 1) Sales & Marketing - extensive SaaS and enterprise sales experience with proven methodologies, 2) Website Design & Implementation - using .NET, PHP, WordPress, and DNN systems, and 3) Technology Consulting - from system integration to home automation and server setup. He's certified in Conga/Apttus CPQ, CLM, Approvals, Order Management & Billing, plus CongaSign, Composer, & Conga Grid."
    }

    if (message.includes("recommendations") || message.includes("testimonials") || message.includes("references")) {
      return "Grant has 9+ professional recommendations from colleagues and executives. CEOs like Navin Nagiah (DNN) praised his 'intelligence, energy and attention to detail,' while Jack McGannon (Canto) highlighted his 'strong work ethic and tenacity.' Tony Mai (Apttus) called him 'one of our department's top talents' and said any company hiring him 'would be smiling all the way to the bank.' He's consistently described as hardworking, reliable, analytical, and a true team player."
    }

    if (message.includes("dnn") || message.includes("team lead") || message.includes("manager")) {
      return "At DNN Corp (2015-2017), Grant started as an SDR and quickly became Team Lead of the SDR group, then promoted to Account Executive. He was Top Sales Rep Q1 2017, generated 5 new opportunities per week, managed 30-40 relationships, and sold over $200k in licensing and services. He created training documentation that increased opportunities passed to AEs by 25% and achieved 125% of quota in his first two quarters."
    }

    if (message.includes("quote-to-cash") || message.includes("procure-to-pay") || message.includes("solutions")) {
      return "Grant specializes in Conga's Quote-to-Cash and Procure-to-Pay solutions, helping transform the revenue lifecycle for enterprise clients. His responsibilities include building custom product demonstrations, executing qualification and discovery calls, configuring Salesforce.com and AWS platforms, conducting technical security calls, assisting with Professional Services scoping, and completing technical RFP/RFI responses."
    }

    if (message.includes("media server") || message.includes("unraid") || message.includes("plex")) {
      return "Grant has technical expertise in building personal media servers. He's written guides on setting up Unraid systems with Plex, Radarr, Sonarr, and other applications. His setup includes multiple TB of storage with parity protection, and he provides detailed instructions on hardware selection, Docker applications, and secure remote access using Cloudflared tunnels."
    }

    if (message.includes("location") || message.includes("where") || message.includes("based")) {
      return "Grant is based in the San Francisco Bay Area, though he's originally from San Diego, California. He works with enterprise clients globally, particularly in government and large organization sectors."
    }

    if (message.includes("contact") || message.includes("reach") || message.includes("hire")) {
      return "I'd be happy to help you get in touch with Grant! He's available for consulting on business technology, sales optimization, and process improvement. Let me show you a contact form where you can send him a message directly about your specific needs."
    }

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! I'm here to help answer detailed questions about Grant Glazer's extensive background and expertise. I have access to his complete resume, recommendations, and project details. What specific aspect of his experience would you like to know about?"
    }

    if (message.includes("thank") || message.includes("thanks")) {
      return "You're welcome! I have comprehensive information about Grant's 10+ years of experience, his achievements at Conga, his technical expertise, and client testimonials. Is there anything else specific you'd like to know?"
    }

    // If no specific match, provide a helpful response
    return "I have detailed information about Grant's experience at Conga (7+ years, $41M+ in closed business), his expertise in sales engineering and technology consulting, his educational background, and testimonials from colleagues and CEOs. Could you be more specific about what you'd like to know? For example, you could ask about his achievements, technical skills, work at specific companies, or his consulting services."
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    const response = getAIResponse(inputValue)

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])

      // Show contact form if the response suggests it
      if (response.includes("contact form")) {
        setTimeout(() => setShowContactForm(true), 1000)
      }
    }, 1000)

    setInputValue("")
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (Number.parseInt(contactForm.captcha) !== captchaQuestion.answer) {
      alert("Please solve the captcha correctly.")
      return
    }

    // Here you would typically send the form data to your backend
    console.log("Contact form submitted:", contactForm)
    alert("Thank you for your message! Grant will get back to you soon.")
    setShowContactForm(false)
    setContactForm({ name: "", email: "", message: "", captcha: "" })
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col bg-white/95 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-lg">Chat with Grant's AI</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-blue-700">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {!showContactForm ? (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex gap-2", message.isBot ? "justify-start" : "justify-end")}>
                  {message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[75%] rounded-lg px-3 py-2 text-sm break-words",
                      message.isBot ? "bg-gray-100 text-gray-900" : "bg-blue-600 text-white",
                    )}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                  {!message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4 bg-white">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about Grant's experience..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowContactForm(true)} className="text-xs">
                  <Mail className="w-3 h-3 mr-1" />
                  Contact Grant
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* Contact Form */
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">Contact Grant</h3>
              <p className="text-sm text-gray-600">Send Grant a message and he'll get back to you soon.</p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Textarea
                  placeholder="Your Message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                  required
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium">{captchaQuestion.question}</label>
                <Input
                  type="number"
                  placeholder="Answer"
                  value={contactForm.captcha}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, captcha: e.target.value }))}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Send Message
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowContactForm(false)}>
                  Back to Chat
                </Button>
              </div>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
