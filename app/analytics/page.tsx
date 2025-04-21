"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { Calendar, Download, Filter, ArrowLeft } from "lucide-react"

// Sample data
const efficiencyTrendData = [
  { date: "Apr 15", "Machine A": 92, "Machine B": 85, "Machine C": 90, "Machine D": 88 },
  { date: "Apr 16", "Machine A": 94, "Machine B": 87, "Machine C": 91, "Machine D": 86 },
  { date: "Apr 17", "Machine A": 91, "Machine B": 84, "Machine C": 93, "Machine D": 89 },
  { date: "Apr 18", "Machine A": 93, "Machine B": 86, "Machine C": 92, "Machine D": 87 },
  { date: "Apr 19", "Machine A": 95, "Machine B": 88, "Machine C": 94, "Machine D": 87 },
  { date: "Apr 20", "Machine A": 94, "Machine B": 89, "Machine C": 92, "Machine D": 85 },
  { date: "Apr 21", "Machine A": 95, "Machine B": 88, "Machine C": 94, "Machine D": 87 },
]

const downtimeReasonData = [
  { name: "Maintenance", value: 35, color: "#0ea5e9" },
  { name: "Breakdown", value: 25, color: "#f43f5e" },
  { name: "Setup", value: 20, color: "#eab308" },
  { name: "Material", value: 15, color: "#84cc16" },
  { name: "Other", value: 5, color: "#94a3b8" },
]

const defectTrendData = [
  { date: "Apr 15", defects: 32, target: 25 },
  { date: "Apr 16", defects: 28, target: 25 },
  { date: "Apr 17", defects: 35, target: 25 },
  { date: "Apr 18", defects: 30, target: 25 },
  { date: "Apr 19", defects: 27, target: 25 },
  { date: "Apr 20", defects: 24, target: 25 },
  { date: "Apr 21", defects: 27, target: 25 },
]

const operatorPerformanceData = [
  { name: "John Doe", efficiency: 95, target: 90 },
  { name: "Jane Smith", efficiency: 88, target: 90 },
  { name: "Robert Johnson", efficiency: 94, target: 90 },
  { name: "Sarah Williams", efficiency: 87, target: 90 },
]

const productionVolumeData = [
  { date: "Apr 15", actual: 3450, target: 3600 },
  { date: "Apr 16", actual: 3520, target: 3600 },
  { date: "Apr 17", actual: 3380, target: 3600 },
  { date: "Apr 18", actual: 3490, target: 3600 },
  { date: "Apr 19", actual: 3610, target: 3600 },
  { date: "Apr 20", actual: 3580, target: 3600 },
  { date: "Apr 21", actual: 3550, target: 3600 },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("week")

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
          <h1 className="text-2xl font-bold ml-4">Production Analytics</h1>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select defaultValue="week">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        <Tabs defaultValue="efficiency" className="mb-6">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
            <TabsTrigger value="downtime">Downtime</TabsTrigger>
            <TabsTrigger value="defects">Defects</TabsTrigger>
            <TabsTrigger value="operators">Operators</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
          </TabsList>

          <TabsContent value="efficiency" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Machine Efficiency Trends</CardTitle>
                <CardDescription>Efficiency percentage by machine over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={efficiencyTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Machine A" stroke="#0ea5e9" strokeWidth={2} />
                      <Line type="monotone" dataKey="Machine B" stroke="#f43f5e" strokeWidth={2} />
                      <Line type="monotone" dataKey="Machine C" stroke="#84cc16" strokeWidth={2} />
                      <Line type="monotone" dataKey="Machine D" stroke="#eab308" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Efficiency by Machine</CardTitle>
                  <CardDescription>Current efficiency percentage by machine</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "Machine A", efficiency: 95, target: 90 },
                          { name: "Machine B", efficiency: 88, target: 90 },
                          { name: "Machine C", efficiency: 94, target: 90 },
                          { name: "Machine D", efficiency: 87, target: 90 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[80, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="efficiency" fill="#0ea5e9" name="Current Efficiency" />
                        <Bar dataKey="target" fill="#94a3b8" name="Target" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Efficiency Insights</CardTitle>
                  <CardDescription>Machine learning analysis of efficiency patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Efficiency Patterns</h3>
                      <p className="text-sm text-muted-foreground">
                        Machine A shows consistent high performance with 95% efficiency, 5% above target. Machine B and
                        D are below target and should be investigated.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Correlation Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Strong correlation detected between operator experience and machine efficiency. Machines
                        operated by senior staff show 7% higher efficiency on average.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Recommendations</h3>
                      <p className="text-sm text-muted-foreground">
                        Consider scheduling maintenance for Machine B and D. Implement cross-training program to share
                        best practices from high-performing operators.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="downtime" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Downtime Analysis</CardTitle>
                <CardDescription>Breakdown of downtime reasons and duration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={downtimeReasonData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {downtimeReasonData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value} minutes`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Downtime by Machine (minutes)</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Machine A</span>
                          <span className="text-sm">45 min</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-red-500" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Machine B</span>
                          <span className="text-sm">30 min</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-red-500" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Machine C</span>
                          <span className="text-sm">15 min</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-red-500" style={{ width: "15%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Machine D</span>
                          <span className="text-sm">10 min</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-red-500" style={{ width: "10%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Downtime Prediction</CardTitle>
                <CardDescription>AI-powered prediction of potential machine downtime</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Machine A</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Risk Level:</span>
                        <span className="text-sm font-medium text-red-500">High (78%)</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on vibration patterns and historical data, Machine A has a high risk of failure in the
                        next 48 hours. Recommended action: Schedule preventive maintenance immediately.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Machine B</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Risk Level:</span>
                        <span className="text-sm font-medium text-amber-500">Medium (45%)</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Machine B shows early signs of potential issues. Recommended action: Monitor closely and plan
                        for maintenance within the next week.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Machine C</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Risk Level:</span>
                        <span className="text-sm font-medium text-green-500">Low (12%)</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Machine C is operating within normal parameters. Recommended action: Continue regular
                        maintenance schedule.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Machine D</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Risk Level:</span>
                        <span className="text-sm font-medium text-green-500">Low (8%)</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Machine D is operating optimally with no signs of issues. Recommended action: Continue regular
                        maintenance schedule.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="defects" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Defect Trend Analysis</CardTitle>
                <CardDescription>Defect rates over time with target threshold</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={defectTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="defects"
                        fill="#f43f5e"
                        stroke="#f43f5e"
                        fillOpacity={0.2}
                        name="Defects"
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#94a3b8"
                        strokeDasharray="5 5"
                        name="Target Threshold"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Defects by Machine</CardTitle>
                  <CardDescription>Current defect count by machine</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "Machine A", defects: 27 },
                          { name: "Machine B", defects: 35 },
                          { name: "Machine C", defects: 18 },
                          { name: "Machine D", defects: 42 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="defects" fill="#f43f5e" name="Defects" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Anomaly Detection</CardTitle>
                  <CardDescription>AI-detected quality issues and patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Product X-123 Quality Issue</h3>
                      <p className="text-sm text-muted-foreground">
                        Defect rate for Product X-123 is 2.5x higher than normal across all machines. Possible cause:
                        Material quality issue from recent supplier batch.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Machine D Defect Pattern</h3>
                      <p className="text-sm text-muted-foreground">
                        Machine D shows consistent pattern of edge defects on cylindrical parts. Possible cause: Tool
                        wear or alignment issue.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Recommendations</h3>
                      <p className="text-sm text-muted-foreground">
                        1. Inspect material from Supplier B for Product X-123 2. Check tool alignment and wear on
                        Machine D 3. Review operator training for defect identification
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="operators" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Operator Performance</CardTitle>
                <CardDescription>Efficiency and output by operator</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={operatorPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="efficiency" fill="#0ea5e9" name="Efficiency %" />
                      <Bar dataKey="target" fill="#94a3b8" name="Target %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Operator Output</CardTitle>
                  <CardDescription>Units produced by operator</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 bg-muted/50 p-3 font-medium">
                      <div>Operator</div>
                      <div>Units</div>
                      <div>Defects</div>
                      <div>Efficiency</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-4 p-3">
                        <div>John Doe</div>
                        <div>912</div>
                        <div>27</div>
                        <div>95%</div>
                      </div>
                      <div className="grid grid-cols-4 p-3">
                        <div>Jane Smith</div>
                        <div>845</div>
                        <div>35</div>
                        <div>88%</div>
                      </div>
                      <div className="grid grid-cols-4 p-3">
                        <div>Robert Johnson</div>
                        <div>902</div>
                        <div>18</div>
                        <div>94%</div>
                      </div>
                      <div className="grid grid-cols-4 p-3">
                        <div>Sarah Williams</div>
                        <div>835</div>
                        <div>42</div>
                        <div>87%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                  <CardDescription>AI analysis of operator performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Jane Smith Performance</h3>
                      <p className="text-sm text-muted-foreground">
                        Jane Smith's efficiency is 15% below her 30-day average. Possible causes: New product type or
                        need for additional training.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Top Performers</h3>
                      <p className="text-sm text-muted-foreground">
                        John Doe and Robert Johnson consistently maintain high efficiency. Recommended: Document their
                        best practices for training materials.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Recommendations</h3>
                      <p className="text-sm text-muted-foreground">
                        1. Schedule refresher training for Sarah Williams 2. Investigate Jane Smith's recent performance
                        drop 3. Consider cross-training operators on different machines
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="production" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Production Volume Trends</CardTitle>
                <CardDescription>Daily production volume vs target</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={productionVolumeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[3300, 3700]} />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="actual"
                        fill="#0ea5e9"
                        stroke="#0ea5e9"
                        fillOpacity={0.2}
                        name="Actual Units"
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#94a3b8"
                        strokeDasharray="5 5"
                        name="Target Units"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Production by Machine</CardTitle>
                  <CardDescription>Units produced by each machine</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "Machine A", units: 912, target: 960 },
                          { name: "Machine B", units: 845, target: 960 },
                          { name: "Machine C", units: 902, target: 960 },
                          { name: "Machine D", units: 835, target: 960 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[800, 1000]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="units" fill="#0ea5e9" name="Units Produced" />
                        <Bar dataKey="target" fill="#94a3b8" name="Target Units" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Production Forecast</CardTitle>
                  <CardDescription>AI-powered production forecasting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Weekly Forecast</h3>
                      <p className="text-sm text-muted-foreground">
                        Based on current trends, weekly production is forecasted at 17,850 units, which is 1.2% below
                        the weekly target of 18,000 units.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Optimization Opportunity</h3>
                      <p className="text-sm text-muted-foreground">
                        Reducing Machine B and D downtime by 15 minutes each could increase weekly production by
                        approximately 250 units, exceeding the target.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Recommendations</h3>
                      <p className="text-sm text-muted-foreground">
                        1. Focus on reducing setup time for Machine B 2. Investigate material supply issues for Machine
                        D 3. Consider adjusting production schedule to optimize machine utilization
                      </p>
                    </div>
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
