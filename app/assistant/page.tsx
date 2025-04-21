"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Send, Bot, User, Loader2 } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Sample production data for the AI to reference
const productionData = {
  machines: {
    "Machine A": {
      efficiency: 95,
      downtime: 45,
      defects: 27,
      operator: "John Doe",
      totalProduction: 912,
    },
    "Machine B": {
      efficiency: 88,
      downtime: 30,
      defects: 35,
      operator: "Jane Smith",
      totalProduction: 845,
    },
    "Machine C": {
      efficiency: 94,
      downtime: 15,
      defects: 18,
      operator: "Robert Johnson",
      totalProduction: 902,
    },
    "Machine D": {
      efficiency: 87,
      downtime: 10,
      defects: 42,
      operator: "Sarah Williams",
      totalProduction: 835,
    },
  },
  operators: {
    "John Doe": {
      machines: ["Machine A"],
      efficiency: 95,
      totalProduction: 912,
      defects: 27,
    },
    "Jane Smith": {
      machines: ["Machine B"],
      efficiency: 88,
      totalProduction: 845,
      defects: 35,
    },
    "Robert Johnson": {
      machines: ["Machine C"],
      efficiency: 94,
      totalProduction: 902,
      defects: 18,
    },
    "Sarah Williams": {
      machines: ["Machine D"],
      efficiency: 87,
      totalProduction: 835,
      defects: 42,
    },
  },
  downtimePredictions: {
    "Machine A": { risk: 78, nextMaintenance: "2025-04-25" },
    "Machine B": { risk: 45, nextMaintenance: "2025-04-28" },
    "Machine C": { risk: 12, nextMaintenance: "2025-05-10" },
    "Machine D": { risk: 8, nextMaintenance: "2025-05-15" },
  },
  anomalies: [
    {
      machine: "Machine B",
      issue: "Output Drop",
      severity: "High",
      details: "30% drop detected at 11:00 AM",
    },
    {
      operator: "Jane Smith",
      issue: "Performance",
      severity: "Medium",
      details: "15% below 30-day average",
    },
    {
      product: "X-123",
      issue: "Quality",
      severity: "Medium",
      details: "Defect rate 2.5x higher than normal",
    },
  ],
}

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI manufacturing assistant. How can I help you with your production data today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput("")
    setIsLoading(true)

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    try {
      // Create context with production data for the AI
      const context = JSON.stringify(productionData)
      const systemPrompt = `You are an AI assistant for a manufacturing floor. You have access to the following production data: ${context}. 
      Answer questions about machine performance, operator efficiency, downtime predictions, and anomalies. 
      Be concise and data-driven in your responses. If asked about data you don't have, politely explain what information you can provide.`

      // Generate AI response
      const { text } = await generateText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        prompt: userMessage,
      })

      // Add AI response to chat
      setMessages((prev) => [...prev, { role: "assistant", content: text }])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error processing your request. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/" className="font-bold text-xl">
                ManufactureAI
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/hourly-sheet">
                <Button variant="ghost">Hourly Sheet</Button>
              </Link>
              <Link href="/analytics">
                <Button variant="ghost">Analytics</Button>
              </Link>
              <Link href="/assistant">
                <Button>AI Assistant</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex items-center mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold ml-4">AI Manufacturing Assistant</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Suggested Questions</CardTitle>
                <CardDescription>Try asking about your production data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    size="sm"
                    onClick={() => {
                      setInput("Show today's total defects by machine")
                    }}
                  >
                    Show today's total defects by machine
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    size="sm"
                    onClick={() => {
                      setInput("How many units did Jane Smith produce last shift?")
                    }}
                  >
                    How many units did Jane Smith produce last shift?
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    size="sm"
                    onClick={() => {
                      setInput("Predict downtime risk for Machine A")
                    }}
                  >
                    Predict downtime risk for Machine A
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    size="sm"
                    onClick={() => {
                      setInput("Which machine has the highest efficiency?")
                    }}
                  >
                    Which machine has the highest efficiency?
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    size="sm"
                    onClick={() => {
                      setInput("What anomalies have been detected today?")
                    }}
                  >
                    What anomalies have been detected today?
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Card className="flex flex-col h-[calc(100vh-180px)]">
              <CardHeader>
                <CardTitle>Manufacturing AI Assistant</CardTitle>
                <CardDescription>
                  Ask questions about production data, machine performance, and predictions
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                    >
                      <div className="flex items-start gap-3 max-w-[80%]">
                        {message.role === "assistant" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        {message.role === "user" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-3 max-w-[80%]">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-4 py-2 bg-muted">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    placeholder="Ask about production data, machine performance, or predictions..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
