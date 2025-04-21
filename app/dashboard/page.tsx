"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { AlertTriangle, ArrowUpRight, Clock, Plus, Settings, BarChart3, Activity, AlertCircle } from "lucide-react"

// Sample data
const hourlyData = [
  { hour: "Hour 1", target: 120, actual: 115, defects: 3 },
  { hour: "Hour 2", target: 120, actual: 118, defects: 2 },
  { hour: "Hour 3", target: 120, actual: 122, defects: 5 },
  { hour: "Hour 4", target: 120, actual: 110, defects: 4 },
  { hour: "Hour 5", target: 120, actual: 105, defects: 7 },
  { hour: "Hour 6", target: 120, actual: 117, defects: 3 },
  { hour: "Hour 7", target: 120, actual: 121, defects: 2 },
  { hour: "Hour 8", target: 120, actual: 119, defects: 1 },
]

const downtimeData = [
  { name: "Machine A", value: 45, color: "#ff6b6b" },
  { name: "Machine B", value: 30, color: "#ffa502" },
  { name: "Machine C", value: 15, color: "#1e90ff" },
  { name: "Machine D", value: 10, color: "#2ed573" },
]

const efficiencyData = [
  { day: "Mon", efficiency: 92 },
  { day: "Tue", efficiency: 89 },
  { day: "Wed", efficiency: 93 },
  { day: "Thu", efficiency: 87 },
  { day: "Fri", efficiency: 91 },
  { day: "Sat", efficiency: 84 },
  { day: "Sun", efficiency: 90 },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Manufacturing Dashboard</h1>
          <div className="flex items-center gap-2">
            <Link href="/hourly-sheet">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Hourly Entry
              </Button>
            </Link>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Production Efficiency</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91.2%</div>
              <p className="text-xs text-muted-foreground">+2.5% from yesterday</p>
              <div className="h-[60px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={efficiencyData}>
                    <Line type="monotone" dataKey="efficiency" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Downtime Today</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">102 minutes</div>
              <p className="text-xs text-muted-foreground">-15 minutes from yesterday</p>
              <div className="h-[60px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={downtimeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={18}
                      outerRadius={30}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {downtimeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Defect Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground">+0.5% from yesterday</p>
              <div className="h-[60px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyData}>
                    <Line type="monotone" dataKey="defects" stroke="#f43f5e" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Production</CardTitle>
                <CardDescription>Hourly production metrics for the current shift</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="target" fill="#94a3b8" name="Target" />
                      <Bar dataKey="actual" fill="#0ea5e9" name="Actual" />
                      <Bar dataKey="defects" fill="#f43f5e" name="Defects" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>AI Predictions</CardTitle>
                  <CardDescription>Machine learning predictions based on current data</CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="mb-4 border-amber-500 bg-amber-500/10">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <AlertTitle className="text-amber-500">Downtime Risk Alert</AlertTitle>
                    <AlertDescription>
                      Machine A has a 78% risk of downtime in the next 2 hours based on historical patterns.
                    </AlertDescription>
                  </Alert>
                  <Alert className="border-green-500 bg-green-500/10">
                    <Activity className="h-4 w-4 text-green-500" />
                    <AlertTitle className="text-green-500">Production Forecast</AlertTitle>
                    <AlertDescription>
                      Current production rate suggests you'll exceed today's target by 3.5% if current efficiency is
                      maintained.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Anomaly Detection</CardTitle>
                  <CardDescription>Unusual patterns detected by our AI system</CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="mb-4 border-red-500 bg-red-500/10">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <AlertTitle className="text-red-500">Output Anomaly</AlertTitle>
                    <AlertDescription>
                      Machine B's output dropped by 30% in Hour 4. Possible issue detected!
                    </AlertDescription>
                  </Alert>
                  <Alert className="border-blue-500 bg-blue-500/10">
                    <AlertCircle className="h-4 w-4 text-blue-500" />
                    <AlertTitle className="text-blue-500">Defect Pattern</AlertTitle>
                    <AlertDescription>
                      Unusual increase in defects for Product X-123 across all machines. Quality check recommended.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="production" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Production Details</CardTitle>
                <CardDescription>Detailed production metrics by machine and operator</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 bg-muted/50 p-3 font-medium">
                    <div>Machine</div>
                    <div>Operator</div>
                    <div>Target</div>
                    <div>Actual</div>
                    <div>Efficiency</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-5 p-3">
                      <div>Machine A</div>
                      <div>John Doe</div>
                      <div>960</div>
                      <div>912</div>
                      <div>
                        <Badge className="bg-green-500">95%</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 p-3">
                      <div>Machine B</div>
                      <div>Jane Smith</div>
                      <div>960</div>
                      <div>845</div>
                      <div>
                        <Badge className="bg-amber-500">88%</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 p-3">
                      <div>Machine C</div>
                      <div>Robert Johnson</div>
                      <div>960</div>
                      <div>902</div>
                      <div>
                        <Badge className="bg-green-500">94%</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 p-3">
                      <div>Machine D</div>
                      <div>Sarah Williams</div>
                      <div>960</div>
                      <div>835</div>
                      <div>
                        <Badge className="bg-amber-500">87%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>Ask questions about your production data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Try asking:</p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start text-left" size="sm">
                        Show today's total defects by machine
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-left" size="sm">
                        How many units did Jane Smith produce last shift?
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-left" size="sm">
                        Predict downtime risk for Machine A
                      </Button>
                    </div>
                  </div>
                  <Link href="/assistant">
                    <Button className="w-full">
                      Open AI Assistant
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Downtime Prediction</CardTitle>
                  <CardDescription>Machine learning predictions for potential downtime</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Machine A</div>
                        <div className="text-xs text-muted-foreground">Based on 12-month history</div>
                      </div>
                      <Badge className="bg-red-500">High Risk (78%)</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Machine B</div>
                        <div className="text-xs text-muted-foreground">Based on 12-month history</div>
                      </div>
                      <Badge className="bg-amber-500">Medium Risk (45%)</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Machine C</div>
                        <div className="text-xs text-muted-foreground">Based on 12-month history</div>
                      </div>
                      <Badge className="bg-green-500">Low Risk (12%)</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Machine D</div>
                        <div className="text-xs text-muted-foreground">Based on 12-month history</div>
                      </div>
                      <Badge className="bg-green-500">Low Risk (8%)</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Anomaly Detection</CardTitle>
                  <CardDescription>Unusual patterns detected in production data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert className="border-red-500 bg-red-500/10">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <AlertTitle className="text-red-500">Machine B Output Drop</AlertTitle>
                      <AlertDescription className="text-xs">
                        30% drop detected at 11:00 AM. Maintenance check recommended.
                      </AlertDescription>
                    </Alert>
                    <Alert className="border-amber-500 bg-amber-500/10">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <AlertTitle className="text-amber-500">Operator Performance</AlertTitle>
                      <AlertDescription className="text-xs">
                        Jane Smith's efficiency is 15% below her 30-day average.
                      </AlertDescription>
                    </Alert>
                    <Alert className="border-blue-500 bg-blue-500/10">
                      <AlertCircle className="h-4 w-4 text-blue-500" />
                      <AlertTitle className="text-blue-500">Quality Issue</AlertTitle>
                      <AlertDescription className="text-xs">
                        Defect rate for Product X-123 is 2.5x higher than normal.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
