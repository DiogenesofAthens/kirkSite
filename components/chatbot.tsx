"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, RefreshCw, User, Bot, Mail, SendIcon } from "lucide-react"
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
      <Button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 shadow-lg z-50" size="icon">
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <>
      <Card className="fixed bottom-6 right-6 w-96 h-[540px] shadow-sm z-50 flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-md bg-white/70 dark:bg-slate-900/70">
        <CardHeader className="flex flex-row items-center justify-between bg-neutral-900 text-white rounded-t-2xl px-4 py-3">
          <CardTitle className="text-lg">Chat with Kirk&apos;s AI</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleResetChat} className="text-white hover:bg-neutral-800">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-neutral-800">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex gap-2", message.role === 'assistant' ? "justify-start" : "justify-end")}>
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-amber-700" />
                  </div>
                )}
                <div className={cn("max-w-[75%] rounded-lg px-3 py-2 text-sm break-words transition-all duration-200",
                  message.role === 'assistant' ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100" : "bg-neutral-900 text-white")}
                >
                  <div className="whitespace-pre-wrap">
                    {message.content || (message as any).parts?.map((part: any, i: number) =>
                      part.type === 'text' ? part.text : ''
                    ).join('')}
                  </div>
                </div>
                {message.role !== 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-amber-700" />
                </div>
                <div className="max-w-[75%] rounded-lg px-3 py-2 text-sm bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 animate-pulse">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-slate-200 dark:border-slate-600 space-y-3">
             <form onSubmit={handleSubmit} className="flex gap-2">
                <Input value={input} onChange={handleInputChange} placeholder="Ask about Kirk..." />
                <Button type="submit" size="icon"><SendIcon className="h-4 w-4" /></Button>
             </form>
             <p className="text-[10px] text-slate-600 dark:text-slate-400 text-center mt-1">
               Powered by AI. Answers may be incorrect. Contact Kirk for clarification.
             </p>
            <Button variant="outline" size="sm" onClick={() => setShowContactModal(true)} className="w-full">
              <Mail className="h-4 w-4 mr-2" /> Contact Kirk
            </Button>
          </div>
        </CardContent>
      </Card>
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </>
  )
}
