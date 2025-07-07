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
  "conga": "Grant is a Principal Sales Engineer at Conga with nearly 8 years of experience, progressing through 6 roles. He has closed $41M+ in business, supported 90+ customers, and led strategic demos for some of the world’s largest companies. He has presented at Conga Connect (600+ audience) and SKO (2023, 2024).",
  "achievements": "SE of the Year (2022 & 2023), top SE by revenue FY 2022, quota overachievement FY 2020–2023, SKO & Conga Connect mainstage presenter, and SE Summit 2024 Innovation Demo Award winner. Promoted to support Strategic Sales in 2025.",
  "experience": "Grant's career began in technical sales at Canto and DNN Corp, where he rose to SDR Manager and then Enterprise AE. At Conga, he moved from Sr. BDR to AE, then quickly into technical Sales Engineering. He’s consistently led the field in performance, innovation, and enablement.",
  "education": "Grant earned a Bachelor of Science in Business Administration from CSU Sacramento, with concentrations in Marketing, Management, and Entrepreneurship. Originally from San Diego, he now resides in the SF Bay Area.",
  "skills": "Grant's expertise includes technical discovery, solution consulting, custom demos, CPQ, CLM, Salesforce configuration, RFPs, AWS, and full-stack web dev. He’s certified in Conga CPQ, CLM, Approvals, Billing, Composer, Sign, and Grid.",
  "recommendations": "Colleagues and execs praise Grant as sharp, dependable, and innovative. CEOs like Navin Nagiah and Jack McGannon highlight his work ethic, attention to detail, and tenacity. Tony Mai called him ‘top talent you want on your team.’",
  "media server": "Grant built a high-performance Unraid-based media server running Plex, Radarr, Sonarr, and secure Cloudflared tunnels. See the [Media Server Guide](https://grantglazer.com/downloads/media-server-guide/confirm) for the full write-up.",
  "tech": "This site was designed by Grant using Vercel's V0, GPT-4o, and is deployed on the Hobby tier via GitHub. For tools, platforms, and coding stacks he actively uses, check out his [blog](https://grantglazer.com/blog).",
  "sdr": "Grant authored a full SDR Process Guide from his experience leading enterprise BDR teams and building $8M+ pipeline. Read the full methodology here: [SDR Process Guide](https://grantglazer.com/downloads/sdr-process-guide/confirm)",
  "default": "I'm here to help with info about Grant’s background, career, tech, or projects. If I can't answer your question, you can use the contact button below to reach him directly."
}

const PROMPT_SUGGESTIONS = [
  "Tell me about Grant's achievements",
  "What’s Grant’s background?",
  "What tech does Grant use?",
  "Where can I find Grant's media guide?"
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
  const [promptsVisible, setPromptsVisible] = useState(true)
  const [showContactModal, setShowContactModal] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const findResponse = (msg: string): string => {
    const lower = msg.toLowerCase()
    for (const keyword in KNOWLEDGE_BASE) {
      if (lower.includes(keyword)) return KNOWLEDGE_BASE[keyword]
    }
    setShowContactModal(true)
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

  const handleReset = () => {
    setMessages([{
      id: "1",
      content: "Hi! I'm Grant's AI assistant. Ask me anything about his work, background, or expertise.",
      isBot: true,
      timestamp: new Date(),
    }])
    setPromptsVisible(true)
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
      <Card className="fixed bottom-6 right-6 w-96 h-[540px] shadow-xl z-50 flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800">
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
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900">
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
            {promptsVisible && (
              <div className="flex flex-wrap gap-2 pt-2">
                {PROMPT_SUGGESTIONS.map((text) => (
                  <Button key={text} size="sm" variant="secondary" className="text-xs" onClick={() => handleSendMessage(text)}>
                    {text}
                  </Button>
                ))}
              </div>
            )}
          </div>
          <div className="border-t border-slate-200 dark:border-slate-600 p-4 bg-white dark:bg-slate-800">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Grant's experience..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                className="flex-1 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
              />
              <Button onClick={() => handleSendMessage(inputValue)} size="icon">
                <Send className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setShowContactModal(true)}>
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <ContactModal open={showContactModal} onOpenChange={setShowContactModal} />
    </>
  )
}
