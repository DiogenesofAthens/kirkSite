"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, User, Bot, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import ContactModal from "@/components/contact-modal"

interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm Grant's AI assistant. Ask me anything about his background, experience, skills, or how to get in touch.",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [showContactModal, setShowContactModal] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const getAIResponse = (message: string): string => {
    const msg = message.toLowerCase()

    if (msg.includes("conga") || msg.includes("principal sales engineer")) {
      return "Grant is currently a Principal Sales Engineer at Conga. He's been with the company for over 7 years, helped close $41M+ across 90+ clients, and was SE of the Year in 2022 and 2023."
    }

    if (msg.includes("achievements") || msg.includes("awards") || msg.includes("recognition")) {
      return "Grant's recognition includes SE of the Year (2022 & 2023), top SE by revenue FY2022, SKO and Conga Connect mainstage presenter, and SE Summit Best Innovation Demo winner."
    }

    if (msg.includes("experience") || msg.includes("career") || msg.includes("background")) {
      return "Grant has 10+ years of experience in SaaS sales engineering and business development. Prior to Conga, he worked at DNN and Canto and consistently outperformed quota expectations."
    }

    if (msg.includes("education") || msg.includes("university") || msg.includes("degree")) {
      return "Grant holds a B.S. in Business Administration from California State University, Sacramento with concentrations in Marketing, Management, and Entrepreneurship."
    }

    if (msg.includes("skills") || msg.includes("expertise") || msg.includes("specialty")) {
      return "Grant specializes in CPQ, CLM, Quote-to-Cash, Salesforce, enterprise demos, website systems like DNN and WordPress, and technical consulting for media servers and home automation."
    }

    if (msg.includes("recommendation") || msg.includes("testimonial") || msg.includes("reference")) {
      return "Grant is highly recommended by past executives and peers for his intelligence, professionalism, and leadership. He's been called 'top talent' and 'a company’s secret weapon.'"
    }

    if (msg.includes("media server") || msg.includes("unraid") || msg.includes("plex")) {
      return "Grant built a self-hosted Unraid media server running Plex, Sonarr, Radarr, and Cloudflared tunnels for secure remote access. He documents and optimizes every component."
    }

    if (msg.includes("contact") || msg.includes("reach") || msg.includes("hire")) {
      return "Sure, I’ll show you a contact form where you can message Grant directly!"
    }

    if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
      return "Hey there! I can answer questions about Grant’s career, achievements, skills, and more."
    }

    if (msg.includes("thank") || msg.includes("thanks")) {
      return "You're welcome! Let me know if you'd like to contact Grant or learn more."
    }

    return "I can tell you more about Grant’s experience, skills, accomplishments, and consulting work. Try asking about his work at Conga, his demo skills, or his media server expertise!"
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
    setInputValue("")

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])

      if (response.includes("contact form") || response.includes("message Grant")) {
        setTimeout(() => setShowContactModal(true), 800)
      }
    }, 800)
  }

  const quickPrompts = [
    "What are Grant's biggest achievements?",
    "Tell me about Grant’s tech stack.",
    "How can I contact Grant?",
    "What’s Grant’s background?",
    "What’s Grant’s media server setup?"
  ]

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt)
    setTimeout(() => handleSendMessage(), 100)
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
    <>
      <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-lg">Chat with Grant's AI</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-blue-700">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex gap-2", msg.isBot ? "justify-start" : "justify-end")}>
                {msg.isBot && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                <div className={cn(
                  "max-w-[75%] rounded-lg px-3 py-2 text-sm break-words",
                  msg.isBot
                    ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    : "bg-blue-600 text-white"
                )}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
                {!msg.isBot && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
            <div className="flex flex-wrap gap-2 pt-2">
              {quickPrompts.map((text) => (
                <Button
                  key={text}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => handlePromptClick(text)}
                >
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
              <Button variant="outline" size="sm" onClick={() => setShowContactModal(true)} className="text-xs">
                <Mail className="w-3 h-3 mr-1" />
                Contact Grant
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
    </>
  )
}
