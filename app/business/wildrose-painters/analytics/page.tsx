import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { StarField } from "@/components/star-field"
import { GlassCard } from "@/components/glass-card"
import { Navigation } from "@/components/navigation"
import {
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function WildroseAnalyticsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Mock analytics data - in production, this would come from the database
  const metrics = {
    totalRevenue: 125000,
    revenueGrowth: 23.5,
    totalProjects: 47,
    projectsGrowth: 15.2,
    activeClients: 32,
    clientsGrowth: 18.7,
    avgProjectValue: 2659,
    valueGrowth: 7.3,
  }

  const projectStatus = {
    completed: 35,
    inProgress: 8,
    pending: 4,
  }

  const recentProjects = [
    {
      id: 1,
      client: "Sarah Mitchell",
      project: "Interior Painting - 3 Bedroom Home",
      value: 3200,
      status: "completed",
      date: "2025-01-15",
    },
    {
      id: 2,
      client: "Mike Robertson",
      project: "Exterior House Painting",
      value: 4500,
      status: "in-progress",
      date: "2025-01-20",
    },
    {
      id: 3,
      client: "Jennifer Lee",
      project: "Commercial Office Painting",
      value: 8900,
      status: "in-progress",
      date: "2025-01-22",
    },
    {
      id: 4,
      client: "David Chen",
      project: "Fence Staining",
      value: 1200,
      status: "pending",
      date: "2025-01-25",
    },
    {
      id: 5,
      client: "Emma Wilson",
      project: "Kitchen Cabinet Refinishing",
      value: 2100,
      status: "completed",
      date: "2025-01-10",
    },
  ]

  const monthlyRevenue = [
    { month: "Jul", revenue: 8500 },
    { month: "Aug", revenue: 12300 },
    { month: "Sep", revenue: 15600 },
    { month: "Oct", revenue: 18900 },
    { month: "Nov", revenue: 22400 },
    { month: "Dec", revenue: 25100 },
    { month: "Jan", revenue: 22200 },
  ]

  const serviceBreakdown = [
    { service: "Interior Painting", count: 18, revenue: 45600 },
    { service: "Exterior Painting", count: 12, revenue: 52800 },
    { service: "Commercial Projects", count: 8, revenue: 38400 },
    { service: "Fence Staining", count: 9, revenue: 10800 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400"
      case "in-progress":
        return "text-blue-400"
      case "pending":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} />
      case "in-progress":
        return <Clock size={16} />
      case "pending":
        return <AlertCircle size={16} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <StarField mousePosition={{ x: 0, y: 0 }} speed={0.8} hyperspaceMode={false} starCount={600} />

      <Navigation />

      <main className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Wildrose Painters Analytics
            </h1>
            <p className="text-white/70 text-lg">Business insights and performance metrics</p>
            <p className="text-sm text-white/50 mt-2">Logged in as: {data.user.email}</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <GlassCard variant="accent" size="md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-white mb-1">${metrics.totalRevenue.toLocaleString()}</p>
                  <p className="text-green-400 text-sm flex items-center gap-1">
                    <TrendingUp size={14} />+{metrics.revenueGrowth}% from last month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-500/20">
                  <DollarSign size={24} className="text-green-400" />
                </div>
              </div>
            </GlassCard>

            <GlassCard variant="accent" size="md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Total Projects</p>
                  <p className="text-3xl font-bold text-white mb-1">{metrics.totalProjects}</p>
                  <p className="text-green-400 text-sm flex items-center gap-1">
                    <TrendingUp size={14} />+{metrics.projectsGrowth}% from last month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-500/20">
                  <BarChart3 size={24} className="text-blue-400" />
                </div>
              </div>
            </GlassCard>

            <GlassCard variant="accent" size="md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Active Clients</p>
                  <p className="text-3xl font-bold text-white mb-1">{metrics.activeClients}</p>
                  <p className="text-green-400 text-sm flex items-center gap-1">
                    <TrendingUp size={14} />+{metrics.clientsGrowth}% from last month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-500/20">
                  <Users size={24} className="text-purple-400" />
                </div>
              </div>
            </GlassCard>

            <GlassCard variant="accent" size="md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Avg Project Value</p>
                  <p className="text-3xl font-bold text-white mb-1">${metrics.avgProjectValue.toLocaleString()}</p>
                  <p className="text-green-400 text-sm flex items-center gap-1">
                    <TrendingUp size={14} />+{metrics.valueGrowth}% from last month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-500/20">
                  <Activity size={24} className="text-orange-400" />
                </div>
              </div>
            </GlassCard>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Revenue Chart */}
                <GlassCard variant="default" size="lg">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <BarChart3 size={20} />
                    Monthly Revenue Trend
                  </h3>
                  <div className="space-y-4">
                    {monthlyRevenue.map((item, index) => {
                      const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue))
                      const percentage = (item.revenue / maxRevenue) * 100
                      return (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/70">{item.month}</span>
                            <span className="text-white font-medium">${item.revenue.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </GlassCard>

                {/* Project Status */}
                <GlassCard variant="default" size="lg">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <PieChart size={20} />
                    Project Status
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-400" />
                          <span className="text-white/80">Completed</span>
                        </div>
                        <span className="text-white font-semibold">{projectStatus.completed}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${(projectStatus.completed / (projectStatus.completed + projectStatus.inProgress + projectStatus.pending)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-blue-400" />
                          <span className="text-white/80">In Progress</span>
                        </div>
                        <span className="text-white font-semibold">{projectStatus.inProgress}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${(projectStatus.inProgress / (projectStatus.completed + projectStatus.inProgress + projectStatus.pending)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle size={16} className="text-yellow-400" />
                          <span className="text-white/80">Pending</span>
                        </div>
                        <span className="text-white font-semibold">{projectStatus.pending}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{
                            width: `${(projectStatus.pending / (projectStatus.completed + projectStatus.inProgress + projectStatus.pending)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <GlassCard variant="default" size="lg">
                <h3 className="text-xl font-semibold text-white mb-6">Recent Projects</h3>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`${getStatusColor(project.status)}`}>{getStatusIcon(project.status)}</span>
                          <h4 className="text-white font-medium">{project.client}</h4>
                        </div>
                        <p className="text-white/70 text-sm">{project.project}</p>
                        <p className="text-white/50 text-xs mt-1">{project.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold text-lg">${project.value.toLocaleString()}</p>
                        <p className={`text-xs capitalize ${getStatusColor(project.status)}`}>
                          {project.status.replace("-", " ")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <GlassCard variant="default" size="lg">
                <h3 className="text-xl font-semibold text-white mb-6">Service Breakdown</h3>
                <div className="space-y-6">
                  {serviceBreakdown.map((service, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h4 className="text-white font-medium">{service.service}</h4>
                          <p className="text-white/60 text-sm">{service.count} projects</p>
                        </div>
                        <p className="text-white font-semibold text-lg">${service.revenue.toLocaleString()}</p>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{
                            width: `${(service.revenue / Math.max(...serviceBreakdown.map((s) => s.revenue))) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
