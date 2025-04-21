"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function HourlySheetPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Hourly sheet submitted",
        description: "Your production data has been recorded successfully.",
      })
      setIsSubmitting(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="container py-10">
      <div className="flex items-center mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-2xl font-bold ml-4">Hourly Production Sheet</h1>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Production Data Entry</CardTitle>
          <CardDescription>
            Record hourly production metrics for real-time tracking and AI-powered insights.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shift">Shift</Label>
                <Select defaultValue="morning">
                  <SelectTrigger id="shift">
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (6AM-2PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (2PM-10PM)</SelectItem>
                    <SelectItem value="night">Night (10PM-6AM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="machine">Machine/Workstation ID</Label>
                <Select defaultValue="machine-a">
                  <SelectTrigger id="machine">
                    <SelectValue placeholder="Select machine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="machine-a">Machine A</SelectItem>
                    <SelectItem value="machine-b">Machine B</SelectItem>
                    <SelectItem value="machine-c">Machine C</SelectItem>
                    <SelectItem value="machine-d">Machine D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="operator">Operator Name</Label>
                <Select defaultValue="john-doe">
                  <SelectTrigger id="operator">
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-doe">John Doe</SelectItem>
                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                    <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
                    <SelectItem value="sarah-williams">Sarah Williams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="product">Product Name / Part Number</Label>
                <Input id="product" placeholder="Enter product name or part number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hour">Hour</Label>
                <Select defaultValue="1">
                  <SelectTrigger id="hour">
                    <SelectValue placeholder="Select hour" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 8 }, (_, i) => (
                      <SelectItem key={i} value={(i + 1).toString()}>
                        Hour {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="target">Target Output</Label>
                <Input id="target" type="number" min="0" placeholder="Units per hour" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="actual">Actual Output</Label>
                <Input id="actual" type="number" min="0" placeholder="Units produced" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="defects">Defects/Rework Units</Label>
                <Input id="defects" type="number" min="0" placeholder="Number of defects" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="downtime">Downtime (Minutes)</Label>
                <Input id="downtime" type="number" min="0" max="60" placeholder="Minutes of downtime" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="downtime-reason">Reason for Downtime</Label>
                <Select defaultValue="none">
                  <SelectTrigger id="downtime-reason">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Downtime</SelectItem>
                    <SelectItem value="maintenance">Scheduled Maintenance</SelectItem>
                    <SelectItem value="breakdown">Machine Breakdown</SelectItem>
                    <SelectItem value="setup">Setup/Changeover</SelectItem>
                    <SelectItem value="material">Material Shortage</SelectItem>
                    <SelectItem value="quality">Quality Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Operator Remarks (Optional)</Label>
              <Textarea
                id="remarks"
                placeholder="Enter any additional comments or observations"
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              <Save className="h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Submit Hourly Data"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
