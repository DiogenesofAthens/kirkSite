"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, User, Bot, RefreshCw, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { ContactModal } from "@/components/contact-modal"

interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
}

const KNOWLEDGE_BASE: Record<string, string> = {
  "achievements": "Grant has been recognized as SE of the Year at Conga for both FY22 and FY23, top-performing SE by revenue in FY22, and awarded Best Innovation Demo at SE Summit 2024. He's also presented on the main stage at SKO and Conga Connect.",
  "background": "Grant has 10+ years of experience in sales engineering, technical consulting, and enterprise software. He's held six progressive roles at Conga alone, where he’s helped close over $41M in business, delivered hundreds of tailored demos, and supported strategic sales across multiple verticals. Earlier in his career, he held sales and leadership roles at DNN Corp and Canto. You can view his full [resume](https://grantglazer.com/resume).",
  "tech": "Grant's personal site is built using Vercel’s V0 with GPT-4o integration and deployed through GitHub. He shares regular updates and deep dives on his [blog](https://grantglazer.com/blog) about the tools and tech stacks he uses.",
  "media server": "Grant created a comprehensive walkthrough on building an Unraid-based media server with Plex, Radarr, Sonarr, and more. View the guide here: [Media Server Guide](https://grantglazer.com/downloads/media-server-guide/confirm)",
  "sdr": "Grant built and led SDR teams, consistently achieving 150%+ of quota and generating over $8M in qualified pipeline. He also authored a detailed SDR methodology. Read it here: [SDR Process Guide](https://grantglazer.com/downloads/sdr-process-guide/confirm)",
  "career history": "Grant has held progressive roles at Conga, DNN Corp, and Canto. He began as an SDR and has advanced to Principal Sales Engineer, supporting strategic sales and driving innovation. For more details, view his [resume](https://grantglazer.com/resume).",
  "clients": "Grant has supported digital transformation initiatives at multiple Fortune 100 companies, delivering technical solutions at scale. Explore more at his [expertise page](https://grantglazer.com/my-expertise)",
  "skills": "Grant specializes in technical discovery, solution engineering, demo creation, and consultative selling. He works across Salesforce, AWS, and Microsoft Dynamics platforms and frequently leads RFPs and security reviews.",
  "certifications": "Grant is certified in Conga CPQ, CLM, Approvals, Order Management, Billing, Composer, Sign, and Grid. He also has experience with Salesforce, AWS, and Microsoft Dynamics.",
  "default": "I'm here to help with info about Grant’s background, career, tech, or projects. If I can't answer your question, you can use the contact button below to reach him directly."
}

const FAQ_QUESTIONS = [
  "What are Grant’s most notable achievements?",
  "What’s Grant’s background?",
  "What technology does Grant use?",
  "Can I view Grant’s media server setup?",
  "What is Grant’s experience with SDR teams?",
  "Where has Grant worked previously?",
  "What industries or clients has Grant supported?",
  "What are Grant’s technical skills?",
  "What certifications does Grant have?",
  "How can I contact Grant?"
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{
    id: "1",
    content: "Hi! I'm Grant's AI assistant. Select a question from the list to learn more about his work, background, or expertise.",
    isBot: true,
    timestamp: new Date(),
  }])
  const [showContactModal, setShowContactModal] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (input: string) => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    const keyword = Object.keys(KNOWLEDGE_BASE).find(key => input.toLowerCase().includes(key)) || "default"
    const response = KNOWLEDGE_BASE[keyword] || KNOWLEDGE_BASE["default"]

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      isBot: true,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, botMessage])

    if (keyword === "default") setShowContactModal(true)
  }

  const handleReset = () => {
    setMessages([{
      id: "1",
      content: "Hi! I'm Grant's AI assistant. Select a question from the list to learn more about his work, background, or expertise.",
      isBot: true,
      timestamp: new Date(),
    }])
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
      <Card className="fixed bottom-6 right-6 w-96 h-[540px] shadow-xl z-50 flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-md bg-white/70 dark:bg-slate-900/70">
        <CardHeader className="flex flex-row items-center justify-between bg-blue-600 text-white rounded-t-2xl px-4 py-3">
          <CardTitle className="text-lg">Chat with Grant's AI</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleReset} className="text-white hover:bg-blue-700">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-blue-700">
              <X className="h-4 w-4" />
            </Button>
          </div>
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
                  <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: message.content.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="underline text-blue-600 dark:text-blue-400">$1</a>') }} />
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
            <div className="pt-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Select a question:</label>
              <select
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded px-3 py-2 text-sm"
                onChange={(e) => handleSendMessage(e.target.value)}
              >
                <option value="">-- Choose a question --</option>
                {FAQ_QUESTIONS.map((q, idx) => (
                  <option key={idx} value={q}>{q}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-600 p-4">
            <Button variant="outline" size="icon" onClick={() => setShowContactModal(true)} className="w-full">
              <Mail className="h-4 w-4 mr-2" /> Contact Grant
            </Button>
          </div>
        </CardContent>
      </Card>
      <ContactModal open={showContactModal} onOpenChange={setShowContactModal} />
    </>
  )
}
