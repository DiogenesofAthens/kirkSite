"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { ContactModal } from "@/components/contact-modal"

interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
}

const KNOWLEDGE_BASE: Record<string, string> = {
  "conga": "Grant is a Principal Sales Engineer at Conga with over 7 years of experience. He has closed over $41M in business, won SE of the Year (2022, 2023), and presented at major events like Conga Connect and SKO.",
  "achievements": "Grant's achievements include SE of the Year (2022, 2023), top SE by revenue in FY 2022, SKO mainstage presenter (2023, 2024), and creator of award-winning demo at SE Summit 2024.",
  "experience": "Grant has over a decade of experience in business development and sales engineering. From leading SDR teams to creating award-winning sales demos, his journey spans Canto, DNN, and Conga.",
  "education": "Grant earned a Bachelor of Science in Business Administration from CSU Sacramento, specializing in Marketing, Management, and Entrepreneurship.",
  "skills": "His expertise includes sales engineering, CPQ, CLM, Quote-to-Cash solutions, Salesforce, technical discovery, and custom demo builds. Grant is also proficient in full-stack development and smart home integrations.",
  "recommendations": "Grant is praised as dependable, innovative, and driven. Leaders from Canto, DNN, and Conga commend his intelligence, work ethic, and consistent overachievement.",
  "media server": "Grant has built Unraid-based media servers with Plex, Sonarr, Radarr, and Cloudflared for secure tunnels. Access his full guide here: https://grantglazer.com/downloads/media-server-guide/confirm",
  "tech": "This site was designed and built by Grant using Vercel's V0 and GPT-4o. It's deployed on Vercel's Hobby plan and managed via GitHub.",
  "default": "I can help with Grant's career, achievements, skills, or certifications. Ask about his media server, his work at Conga, or what tools he uses."
}

const PROMPT_SUGGESTIONS = [
  "Tell me about Grant's achievements",
  "What’s Grant’s background?",
  "What tech does Grant use?"
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
  const [showContactModal, setShowContactModal] = useState(false)
  const [promptsVisible, setPromptsVisible] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const findResponse = (msg: string): string => {
    const lower = msg.toLowerCase()
    for (const keyword in KNOWLEDGE_BASE) {
      if (lower.includes(keyword)) return KNOWLEDGE_BASE[keyword]
    }
    return KNOWLEDGE_BASE["default"]
  }

  const handleSendMessage = async (input: string) => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setPromptsVisible(false)

    const response = findResponse(input)
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      isBot: true,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, botMessage])
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50" size="icon">
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <>
      <Card className="fixed bottom-6 right-6 w-96 h-[520px] shadow-xl z-50 flex flex-col glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-lg">Chat with Grant's AI</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-blue-700">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
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
            {promptsVisible && (
              <div className="flex flex-wrap gap-2 pt-2">
                {PROMPT_SUGGESTIONS.map((text) => (
                  <Button key={text} size="sm" variant="outline" className="text-xs" onClick={() => handleSendMessage(text)}>
                    {text}
                  </Button>
                ))}
              </div>
            )}
          </div>
          <div className="border-t border-slate-200 dark:border-slate-600 p-4 bg-white/50 dark:bg-slate-800/50">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Grant's experience..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                className="flex-1 bg-white/50 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600"
              />
              <Button onClick={() => handleSendMessage(inputValue)} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <ContactModal open={showContactModal} onOpenChange={setShowContactModal} />
    </>
  )
}
