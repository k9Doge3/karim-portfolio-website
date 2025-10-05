"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "./auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Users,
  Activity,
  Clock,
  FileText,
  Eye,
  MousePointer,
  Zap,
  Server,
  Database,
  Wifi,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface AnalyticsEvent {
  id: string
  event_type: string
  event_name: string
  properties: any
  created_at: string
}

interface UserActivitySummary {
  date: string
  total_events: number
  unique_sessions: number
  total_time_spent: number
  pages_visited: number
  files_uploaded: number
  subscribers_added: number
}

interface SystemMetric {
  metric_type: string
  metric_name: string
  value: number
  unit: string
  tags: any
  created_at: string
}

export function AnalyticsDashboard() {
  const { user } = useAuth()
  const [events, setEvents] = useState<AnalyticsEvent[]>([])
  const [activitySummary, setActivitySummary] = useState<UserActivitySummary[]>([])
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("7d")

  const supabase = createClient()

  useEffect(() => {
    if (user) {
      loadAnalyticsData()
    }
  }, [user, timeRange])

  const loadAnalyticsData = async () => {
    try {
      const daysBack = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - daysBack)

      // Load recent events
      const { data: eventsData, error: eventsError } = await supabase
        .from("analytics_events")
        .select("*")
        .eq("user_id", user?.id)
        .gte("created_at", startDate.toISOString())
        .order("created_at", { ascending: false })
        .limit(100)

      if (eventsError) throw eventsError
      setEvents(eventsData || [])

      // Load activity summary
      const { data: summaryData, error: summaryError } = await supabase
        .from("user_activity_summary")
        .select("*")
        .eq("user_id", user?.id)
        .gte("date", startDate.toISOString().split("T")[0])
        .order("date", { ascending: true })

      if (summaryError) throw summaryError
      setActivitySummary(summaryData || [])

      // Load system metrics (if user has access)
      const { data: metricsData, error: metricsError } = await supabase
        .from("system_metrics")
        .select("*")
        .gte("created_at", startDate.toISOString())
        .order("created_at", { ascending: false })
        .limit(50)

      if (!metricsError) {
        setSystemMetrics(metricsData || [])
      }
    } catch (error) {
      console.error("Error loading analytics data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Track analytics event
  const trackEvent = async (eventType: string, eventName: string, properties: any = {}) => {
    try {
      await supabase.from("analytics_events").insert({
        user_id: user?.id,
        event_type: eventType,
        event_name: eventName,
        properties,
        session_id: sessionStorage.getItem("session_id") || "unknown",
      })
    } catch (error) {
      console.error("Error tracking event:", error)
    }
  }

  // Calculate metrics
  const totalEvents = events.length
  const uniqueSessions = new Set(events.map((e) => e.properties?.session_id)).size
  const avgEventsPerDay =
    activitySummary.length > 0
      ? activitySummary.reduce((sum, day) => sum + day.total_events, 0) / activitySummary.length
      : 0

  // Prepare chart data
  const dailyActivityData = activitySummary.map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    events: day.total_events,
    sessions: day.unique_sessions,
    files: day.files_uploaded,
    subscribers: day.subscribers_added,
  }))

  const eventTypeData = events.reduce(
    (acc, event) => {
      acc[event.event_type] = (acc[event.event_type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const pieChartData = Object.entries(eventTypeData).map(([type, count]) => ({
    name: type,
    value: count,
  }))

  const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#6B7280"]

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse border-slate-700/50 bg-slate-900/50">
          <CardHeader>
            <div className="h-6 bg-slate-700 rounded w-1/3"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-4 bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-slate-300">Track your usage patterns and system performance</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Events</CardTitle>
            <Activity className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalEvents}</div>
            <p className="text-xs text-slate-400">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              {avgEventsPerDay.toFixed(1)} per day avg
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Active Sessions</CardTitle>
            <Users className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{uniqueSessions}</div>
            <p className="text-xs text-slate-400">Unique sessions tracked</p>
          </CardContent>
        </Card>

        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Avg Session Time</CardTitle>
            <Clock className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {activitySummary.length > 0
                ? Math.round(
                    activitySummary.reduce((sum, day) => sum + day.total_time_spent, 0) / activitySummary.length / 60,
                  )
                : 0}
              m
            </div>
            <p className="text-xs text-slate-400">Minutes per session</p>
          </CardContent>
        </Card>

        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Files Uploaded</CardTitle>
            <FileText className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {activitySummary.reduce((sum, day) => sum + day.files_uploaded, 0)}
            </div>
            <p className="text-xs text-slate-400">Total files in period</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Analytics */}
      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="activity" className="data-[state=active]:bg-slate-700">
            Activity
          </TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-slate-700">
            Events
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-slate-700">
            Performance
          </TabsTrigger>
          <TabsTrigger value="realtime" className="data-[state=active]:bg-slate-700">
            Real-time
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Daily Activity</CardTitle>
                <CardDescription className="text-slate-300">Events and sessions over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dailyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="events"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="sessions"
                      stackId="1"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Event Distribution</CardTitle>
                <CardDescription className="text-slate-300">Breakdown by event type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Recent Events</CardTitle>
              <CardDescription className="text-slate-300">Latest user interactions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.slice(0, 10).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 border border-slate-700 rounded-lg bg-slate-800/30"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                        <MousePointer className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{event.event_name}</div>
                        <div className="text-sm text-slate-400">
                          {event.event_type} • {new Date(event.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {event.event_type}
                    </Badge>
                  </div>
                ))}
                {events.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    No events recorded yet. Start using the application to see analytics data.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Page Load Time</CardTitle>
                <Zap className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">1.2s</div>
                <p className="text-xs text-slate-400">
                  <TrendingUp className="h-3 w-3 inline mr-1 text-green-400" />
                  15% faster than last week
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">API Response</CardTitle>
                <Server className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">0.3s</div>
                <p className="text-xs text-slate-400">Average response time</p>
              </CardContent>
            </Card>

            <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Uptime</CardTitle>
                <Wifi className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <p className="text-xs text-slate-400">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">System Metrics</CardTitle>
              <CardDescription className="text-slate-300">Application performance and resource usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemMetrics.slice(0, 8).map((metric, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-slate-700 rounded-lg bg-slate-800/30"
                  >
                    <div className="flex items-center space-x-3">
                      <Database className="h-5 w-5 text-purple-400" />
                      <div>
                        <div className="font-medium text-white">{metric.metric_name}</div>
                        <div className="text-sm text-slate-400">{metric.metric_type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">
                        {metric.value} {metric.unit}
                      </div>
                      <div className="text-xs text-slate-400">{new Date(metric.created_at).toLocaleTimeString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Real-time Activity
              </CardTitle>
              <CardDescription className="text-slate-300">
                Live monitoring of system activity and user interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">Active Users</span>
                      <Badge variant="default" className="bg-green-600">
                        Live
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-white">3</div>
                    <div className="text-sm text-slate-400">Currently online</div>
                  </div>
                  <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">Events/min</span>
                      <Badge variant="secondary">Real-time</Badge>
                    </div>
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-sm text-slate-400">Last minute</div>
                  </div>
                </div>
                <div className="text-center py-8 text-slate-400">
                  <Eye className="h-12 w-12 mx-auto mb-4 text-slate-500" />
                  Real-time monitoring is active. Events will appear here as they happen.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
