"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, RefreshCw, User, Bot, Mail, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { ContactModal } from "@/components/contact-modal"
import Fuse from "fuse.js"

interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
}

const KNOWLEDGE_BASE_ENTRIES = [
  {
    key: "achievements",
    question: "What are Grant's most notable achievements?",
    answer: "Grant has been recognized as SE of the Year at Conga for both FY22 and FY23, top-performing SE by revenue in FY22, and awarded Best Innovation Demo at SE Summit 2024. He's also presented on the main stage at SKO and Conga Connect."
  },
  {
    key: "background",
    question: "What's Grant's background?",
    answer: "Grant has 10+ years of experience in sales engineering, technical consulting, and enterprise software. He’s held six progressive roles at Conga, advancing from Sr. BDR to Principal Sales Engineer. At Conga, he supported strategic sales efforts, built custom demos, and helped close over $50M in enterprise business. Prior to Conga, he held sales and leadership roles at DNN Corp and Canto. See his full <a href='https://grantglazer.com/resume' target='_blank' class='underline text-blue-600 dark:text-blue-400'>Resume</a>."
  },
  {
    key: "tech",
    question: "What technology does Grant use?",
    answer: "Grant is highly skilled in Salesforce, AWS, Microsoft Dynamics, and modern web development. He designed and built this site himself using cutting-edge tools like Vercel v0 and GPT-4o. For a deeper dive, read his insights on the <a href='https://grantglazer.com/blog' target='_blank' class='underline text-blue-600 dark:text-blue-400'>Blog</a>."
  },
  {
    key: "media server",
    question: "Can I view Grant's media server setup?",
    answer: "Grant created a comprehensive walkthrough on building an Unraid-based media server with Plex, Radarr, Sonarr, and more. View the guide here: <a href='https://grantglazer.com/downloads/media-server-guide/confirm' target='_blank' class='underline text-blue-600 dark:text-blue-400'>Media Server Guide</a>"
  },
  {
    key: "sdr",
    question: "What is Grant's experience with SDR teams?",
    answer: "Grant built and led SDR teams, consistently achieving 150%+ of quota and generating over $8M in qualified pipeline. He also authored a detailed SDR methodology. Read it here: <a href='https://grantglazer.com/downloads/sdr-process-guide/confirm' target='_blank' class='underline text-blue-600 dark:text-blue-400'>SDR Process Guide</a>"
  },
  {
    key: "career history",
    question: "What is Grant's career history?",
    answer: "Grant has worked across a range of enterprise roles—from SDR to Principal Sales Engineer—primarily at Conga, with prior experience at DNN Corp and Canto. He’s helped close over $50M in enterprise business and driven success in technical sales, process improvement, and solution engineering. See full <a href='https://grantglazer.com/resume' target='_blank' class='underline text-blue-600 dark:text-blue-400'>Resume</a>."
  },
  {
    key: "clients",
    question: "What industries or clients has Grant supported?",
    answer: "Grant has supported digital transformation initiatives at multiple Fortune 100 companies, delivering technical solutions at scale. Explore more on his <a href='https://grantglazer.com/my-expertise' target='_blank' class='underline text-blue-600 dark:text-blue-400'>Expertise Page</a>."
  },
  {
    key: "skills",
    question: "What are Grant's technical skills?",
    answer: "Grant specializes in technical discovery, solution engineering, demo creation, and consultative selling. He is proficient in Salesforce, AWS, and Microsoft Dynamics platforms and frequently leads RFPs and security reviews."
  },
  {
    key: "certifications",
    question: "What certifications does Grant have?",
    answer: "Grant is certified in Conga CPQ, CLM, Approvals, Order Management, Billing, Composer, Sign, and Grid. He also has experience with Salesforce, AWS, and Microsoft Dynamics."
  }
]

const fuseOptions = {
  keys: ["key", "question", "answer"],
  threshold: 0.4,
  distance: 100,
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning! I'm Grant's AI assistant."
  if (hour < 18) return "Good afternoon! I'm Grant's AI assistant."
  return "Good evening! I'm Grant's AI assistant."
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [showContactModal, setShowContactModal] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize Fuse instance
  const fuse = useMemo(() => new Fuse(KNOWLEDGE_BASE_ENTRIES, fuseOptions), [])

  useEffect(() => {
    if (messages.length === 0) {
        setMessages([{
            id: "1",
            content: `${getGreeting()} How can I help you today? Ask me about my background, skills, or achievements.`,
            isBot: true,
            timestamp: new Date(),
        }])
    }
  }, [messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      isBot: false,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate network delay
    setTimeout(() => {
      const results = fuse.search(text)
      let response = "I'm not sure I have an answer for that. Try asking about my **skills**, **background**, or **projects**."

      if (results.length > 0) {
        response = results[0].item.answer
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 600)
  }

  const handleReset = () => {
    setMessages([{
      id: Date.now().toString(),
      content: `${getGreeting()} How can I help you today? Ask me about my background, skills, or achievements.`,
      isBot: true,
      timestamp: new Date(),
    }])
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50 animate-bounce" size="icon">
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <>
      <Card className="fixed bottom-6 right-6 w-[90vw] max-w-[400px] h-[540px] shadow-xl z-50 flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-md bg-white/90 dark:bg-slate-900/90">
        <CardHeader className="flex flex-row items-center justify-between bg-blue-600 text-white rounded-t-2xl px-4 py-3 shrink-0">
          <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5" /> Grant's AI
          </CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={handleReset} className="text-white hover:bg-blue-700 h-8 w-8">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-blue-700 h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex gap-2 animate-in fade-in slide-in-from-bottom-2", message.isBot ? "justify-start" : "justify-end")}>
                {message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                <div className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                    message.isBot
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none"
                        : "bg-blue-600 text-white rounded-tr-none"
                    )}
                >
                  <div className="whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: message.content }} />
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 justify-start animate-in fade-in">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
                <div className="max-w-[75%] rounded-2xl rounded-tl-none px-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 text-slate-500">
                  <span className="animate-pulse">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Chips */}
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar mask-gradient">
             {["Skills", "Resume", "Contact", "Media Server"].map(chip => (
                 <button
                    key={chip}
                    onClick={() => handleSendMessage(chip)}
                    className="whitespace-nowrap px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-xs font-medium rounded-full transition-colors border border-slate-200 dark:border-slate-700"
                 >
                    {chip}
                 </button>
             ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage(inputValue)
                }}
                className="flex gap-2"
            >
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask anything..."
                    className="flex-1 bg-slate-50 dark:bg-slate-800"
                />
                <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                    <Send className="w-4 h-4" />
                </Button>
            </form>
            <div className="mt-2 text-center">
                <button
                    onClick={() => setShowContactModal(true)}
                    className="text-xs text-muted-foreground hover:text-primary underline flex items-center justify-center gap-1 w-full"
                >
                    <Mail className="w-3 h-3" /> Still have questions? Contact Grant
                </button>
            </div>
          </div>
        </CardContent>
      </Card>
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </>
  )
}
