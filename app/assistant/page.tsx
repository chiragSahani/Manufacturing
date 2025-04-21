"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bot, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Sample AI assistant responses for manufacturing questions
const aiResponses: Record<string, string> = {
  "production efficiency":
    "Based on today's data, your production efficiency is at 87%, which is 5% higher than last week. The improvement appears to be related to the recent adjustments to Line 3's conveyor speed.",
  "maintenance schedule":
    "Your next scheduled maintenance is for Machine Unit B7 on Friday at 2:00 PM. Based on vibration sensor data, I also recommend checking Unit A4's bearings within the next 72 hours.",
  bottlenecks:
    "Current production bottlenecks are occurring at Station 4, where processing time is 23% longer than optimal. Analysis suggests recalibrating the precision sensors could resolve this issue.",
  "inventory levels":
    "Raw material inventory is currently at 78% capacity. Based on current production rates, you'll need to reorder aluminum components within 5 days to avoid production delays.",
  "quality issues":
    "Quality control has flagged a 2.3% increase in defects from Assembly Line 2 over the past 24 hours. The vision system indicates potential misalignment in the positioning mechanism.",
  "shift performance":
    "The morning shift is currently outperforming the evening shift by 12% in units per hour. The difference appears to be related to machine warmup procedures that could be standardized.",
  "energy usage":
    "Factory energy consumption is 8% higher than last month. The largest increase is coming from the cooling systems. I recommend scheduling an inspection of the HVAC efficiency.",
  downtime:
    "Total downtime this week is 4.3 hours, primarily due to changeovers on Line 1. This is within expected parameters but could be optimized by sequencing similar products together.",
  "production forecast":
    "Based on current trends and historical data, I project next month's production to reach 28,500 units, approximately 4% higher than this month.",
  "machine learning":
    "Our machine learning models have identified a pattern in the quality control data that suggests a correlation between ambient temperature and precision in Assembly Station 3.",
  "predictive maintenance":
    "Predictive maintenance algorithms indicate that Pump System 2 may require servicing within the next 14 days based on changes in power consumption patterns and vibration signatures.",
  optimization:
    "I've analyzed your production sequences and can suggest an optimized order that could reduce changeover times by approximately 18%, potentially adding 45 minutes of productive time per shift.",
  "worker safety":
    "Safety metrics are currently excellent with zero incidents in the past 30 days. The new proximity sensors on the robotic arms appear to be functioning as intended.",
  "supply chain":
    "There's a potential supply chain disruption for component XJ-42 due to transportation delays. I recommend increasing safety stock by 15% or sourcing from alternative supplier B.",
  "quality control":
    "Quality control metrics show 99.2% of products are within specification. The vision system has detected a 0.3% improvement since the last calibration.",
  "machine utilization":
    "Machine utilization across all production lines is averaging 82.7%. Line 3 has the highest utilization at 91.2%, while Line 5 is underutilized at 68.4%.",
}

// Sample suggested questions for the AI assistant
const suggestedQuestions = [
  "What's our current production efficiency?",
  "When is the next scheduled maintenance?",
  "Are there any production bottlenecks?",
  "What are our current inventory levels?",
  "Any quality issues detected today?",
  "How is shift performance comparing?",
  "What's our energy usage this month?",
  "What's our total downtime this week?",
  "Can you predict next month's production?",
]

export default function AIAssistant() {
  const [question, setQuestion] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content:
        "Hello! I'm your ManufactureAI assistant. Ask me anything about your factory operations, production metrics, or maintenance schedules.",
    },
  ])

  const handleSendQuestion = () => {
    if (!question.trim()) return

    // Add user question to chat
    setChatHistory((prev) => [...prev, { role: "user", content: question }])

    // Generate AI response based on keywords in the question
    setTimeout(() => {
      let response =
        "I don't have specific data on that topic yet. Would you like me to analyze this area for your factory?"

      // Check if any keywords match our predefined responses
      for (const [keyword, answer] of Object.entries(aiResponses)) {
        if (question.toLowerCase().includes(keyword)) {
          response = answer
          break
        }
      }

      setChatHistory((prev) => [...prev, { role: "assistant", content: response }])
    }, 500)

    setQuestion("")
  }

  const handleSuggestedQuestion = (q: string) => {
    setQuestion(q)
    setTimeout(() => {
      handleSendQuestion()
    }, 100)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-bold">ManufactureAI</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Export Chat
            </Button>
            <Button className="bg-black text-white hover:bg-gray-800" size="sm">
              Settings
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <Card className="border-none shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Bot className="mr-2 h-6 w-6" />
                AI Manufacturing Assistant
              </CardTitle>
              <CardDescription className="text-base">
                Ask questions about your manufacturing data and get instant insights powered by AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] overflow-y-auto mb-4 space-y-4 p-4 border rounded-md bg-gray-50">
                {chatHistory.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "user" ? "bg-black text-white" : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {chatHistory.length <= 2 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Suggested questions:</h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.slice(0, 6).map((q, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestedQuestion(q)}
                        className="text-xs"
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  placeholder="Ask about production efficiency, maintenance schedules, bottlenecks..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendQuestion()
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSendQuestion} className="bg-black text-white hover:bg-gray-800">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
