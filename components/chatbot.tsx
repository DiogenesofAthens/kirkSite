"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, RefreshCw, User, Bot, SendIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ContactModal } from "@/components/contact-modal"
import { useChat } from "@ai-sdk/react"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, setMessages, status, sendMessage } = useChat({
    api: '/api/chat',
    initialMessages: [],
  })

  const [input, setInput] = useState("")
  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: "1",
        content: "Hi! I'm Kirk's AI assistant. Ask me about his solutions engineering experience, career background, or this site.",
        role: 'assistant',
      }])
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    await sendMessage({
      content: input,
      role: 'user'
    })
    setInput("")
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading, isOpen])

  const handleResetChat = () => {
     setMessages([{
      id: "1",
      content: "Hi! I'm Kirk's AI assistant. Ask me about his solutions engineering experience, career background, or this site.",
      role: 'assistant',
    }])
  }


  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity z-50"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    )
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 w-96 h-[520px] z-50 flex flex-col rounded-sm border border-border bg-background shadow-lg">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="text-sm tracking-wide uppercase text-foreground">Kirk&apos;s AI</span>
          <div className="flex gap-1">
            <button onClick={handleResetChat} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => setIsOpen(false)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex gap-2", message.role === 'assistant' ? "justify-start" : "justify-end")}>
              {message.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              )}
              <div className={cn("max-w-[75%] rounded-sm px-3 py-2 text-sm break-words",
                message.role === 'assistant' ? "bg-muted text-foreground" : "bg-foreground text-background")}
              >
                <div className="whitespace-pre-wrap">
                  {message.content || (message as any).parts?.map((part: any, i: number) =>
                    part.type === 'text' ? part.text : ''
                  ).join('')}
                </div>
              </div>
              {message.role !== 'assistant' && (
                <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 justify-start">
              <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                <Bot className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <div className="max-w-[75%] rounded-sm px-3 py-2 text-sm bg-muted text-muted-foreground animate-pulse">
                ...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-border space-y-3">
           <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about Kirk..."
                className="text-sm border-border rounded-sm"
              />
              <button type="submit" className="px-3 py-2 bg-foreground text-background rounded-sm hover:opacity-80 transition-opacity">
                <SendIcon className="h-3.5 w-3.5" />
              </button>
           </form>
           <p className="text-[10px] text-muted-foreground text-center">
             AI-generated answers. Contact Kirk for clarification.
           </p>
          <button
            onClick={() => setShowContactModal(true)}
            className="w-full text-xs tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors py-1.5 border border-border rounded-sm"
          >
            Contact Kirk
          </button>
        </div>
      </div>
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </>
  )
}
