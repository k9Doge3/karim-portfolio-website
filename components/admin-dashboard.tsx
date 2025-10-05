"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import {
  Users,
  UserPlus,
  Settings,
  BarChart3,
  FileText,
  DollarSign,
  Trash2,
  Edit,
  TrendingUp,
  Download,
} from "lucide-react"
import { useAuth } from "./auth-provider"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

interface AdminDashboardProps {
  user: User
  profile: any
  subscribers: any[]
  files: any[]
}

export function AdminDashboard({ user, profile, subscribers, files }: AdminDashboardProps) {
  const { signOut } = useAuth()
  const [isAddSubscriberOpen, setIsAddSubscriberOpen] = useState(false)
  const [newSubscriber, setNewSubscriber] = useState({
    name: "",
    email: "",
    subscription_type: "free" as const,
    status: "active" as const,
  })

  const supabase = createClient()

  const handleAddSubscriber = async () => {
    try {
      const { error } = await supabase.from("subscribers").insert([
        {
          ...newSubscriber,
          user_id: user.id,
        },
      ])

      if (error) throw error

      toast.success("Subscriber added successfully!")
      setIsAddSubscriberOpen(false)
      setNewSubscriber({ name: "", email: "", subscription_type: "free", status: "active" })

      // Refresh the page to show new data
      window.location.reload()
    } catch (error) {
      toast.error("Failed to add subscriber")
      console.error(error)
    }
  }

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return

    try {
      const { error } = await supabase.from("subscribers").delete().eq("id", id)

      if (error) throw error

      toast.success("Subscriber deleted successfully!")
      window.location.reload()
    } catch (error) {
      toast.error("Failed to delete subscriber")
      console.error(error)
    }
  }

  const totalRevenue = subscribers.reduce((sum, sub) => {
    const amounts = { free: 0, premium: 29, enterprise: 99 }
    return sum + (amounts[sub.subscription_type as keyof typeof amounts] || 0)
  }, 0)

  const subscriptionStats = subscribers.reduce(
    (acc, sub) => {
      acc[sub.subscription_type] = (acc[sub.subscription_type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Settings className="h-6 w-6 text-purple-400" />
          <h1 className="text-5xl font-bold text-white">Admin Dashboard</h1>
          <Settings className="h-6 w-6 text-blue-400" />
        </div>
        <p className="text-xl text-slate-300 text-pretty max-w-3xl mx-auto">
          Complete control center for managing subscribers, analytics, and system settings
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{subscribers.length}</div>
            <p className="text-xs text-slate-400">
              +
              {
                subscribers.filter((s) => new Date(s.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
                  .length
              }{" "}
              this month
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${totalRevenue}</div>
            <p className="text-xs text-slate-400">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Active Files</CardTitle>
            <FileText className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{files.length}</div>
            <p className="text-xs text-slate-400">
              {Math.round(files.reduce((sum, f) => sum + (f.file_size || 0), 0) / 1024 / 1024)} MB total
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Conversion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {subscribers.length > 0
                ? Math.round(
                    (subscribers.filter((s) => s.subscription_type !== "free").length / subscribers.length) * 100,
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-slate-400">Free to paid conversion</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="subscribers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="subscribers" className="data-[state=active]:bg-slate-700">
            Subscribers
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-700">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="files" className="data-[state=active]:bg-slate-700">
            Files
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-slate-700">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="subscribers" className="space-y-6">
          <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Subscriber Management</CardTitle>
                  <CardDescription className="text-slate-300">
                    Manage your subscriber base and their subscription levels
                  </CardDescription>
                </div>
                <Dialog open={isAddSubscriberOpen} onOpenChange={setIsAddSubscriberOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Subscriber
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Add New Subscriber</DialogTitle>
                      <DialogDescription className="text-slate-300">Create a new subscriber account</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-200">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={newSubscriber.name}
                          onChange={(e) => setNewSubscriber({ ...newSubscriber, name: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-200">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={newSubscriber.email}
                          onChange={(e) => setNewSubscriber({ ...newSubscriber, email: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subscription" className="text-slate-200">
                          Subscription Type
                        </Label>
                        <Select
                          value={newSubscriber.subscription_type}
                          onValueChange={(value: any) =>
                            setNewSubscriber({ ...newSubscriber, subscription_type: value })
                          }
                        >
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="premium">Premium ($29/mo)</SelectItem>
                            <SelectItem value="enterprise">Enterprise ($99/mo)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={() => setIsAddSubscriberOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddSubscriber}>Add Subscriber</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscribers.map((subscriber) => (
                  <div
                    key={subscriber.id}
                    className="flex items-center justify-between p-4 border border-slate-700 rounded-lg bg-slate-800/30"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">{subscriber.name}</span>
                          <Badge
                            variant={
                              subscriber.subscription_type === "enterprise"
                                ? "default"
                                : subscriber.subscription_type === "premium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {subscriber.subscription_type}
                          </Badge>
                          <Badge variant={subscriber.status === "active" ? "default" : "destructive"}>
                            {subscriber.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-400">
                          {subscriber.email} • Joined {new Date(subscriber.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleDeleteSubscriber(subscriber.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {subscribers.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    No subscribers yet. Add your first subscriber to get started!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Subscription Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Free</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-slate-400 rounded-full"
                          style={{
                            width: `${subscribers.length > 0 ? ((subscriptionStats.free || 0) / subscribers.length) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-slate-400">{subscriptionStats.free || 0}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Premium</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-400 rounded-full"
                          style={{
                            width: `${subscribers.length > 0 ? ((subscriptionStats.premium || 0) / subscribers.length) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-slate-400">{subscriptionStats.premium || 0}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Enterprise</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-400 rounded-full"
                          style={{
                            width: `${subscribers.length > 0 ? ((subscriptionStats.enterprise || 0) / subscribers.length) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-slate-400">{subscriptionStats.enterprise || 0}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Premium Subscriptions</span>
                    <span className="text-green-400 font-semibold">${(subscriptionStats.premium || 0) * 29}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Enterprise Subscriptions</span>
                    <span className="text-green-400 font-semibold">${(subscriptionStats.enterprise || 0) * 99}</span>
                  </div>
                  <div className="border-t border-slate-700 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">Total Monthly Revenue</span>
                      <span className="text-green-400 font-bold text-lg">${totalRevenue}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Advanced Analytics</CardTitle>
                  <CardDescription className="text-slate-300">
                    Detailed insights and performance metrics
                  </CardDescription>
                </div>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href="/family/analytics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Full Analytics
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-400">
                    {
                      subscribers.filter((s) => new Date(s.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
                        .length
                    }
                  </div>
                  <div className="text-sm text-slate-400">New subscribers this week</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-400">
                    {Math.round(
                      (subscribers.filter((s) => s.subscription_type !== "free").length /
                        Math.max(subscribers.length, 1)) *
                        100,
                    )}
                    %
                  </div>
                  <div className="text-sm text-slate-400">Conversion rate</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-purple-400">
                    {
                      files.filter((f) => new Date(f.uploaded_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
                        .length
                    }
                  </div>
                  <div className="text-sm text-slate-400">Files uploaded this week</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">File Management</CardTitle>
              <CardDescription className="text-slate-300">Manage uploaded files and storage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 border border-slate-700 rounded-lg bg-slate-800/30"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-orange-400" />
                      <div>
                        <div className="font-medium text-white">{file.name}</div>
                        <div className="text-sm text-slate-400">
                          {Math.round((file.file_size || 0) / 1024)} KB •{" "}
                          {new Date(file.uploaded_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {files.length === 0 && <div className="text-center py-8 text-slate-400">No files uploaded yet.</div>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Account Settings</CardTitle>
              <CardDescription className="text-slate-300">Manage your account and profile settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">Display Name</Label>
                  <Input
                    value={profile?.display_name || ""}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Your display name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">Email</Label>
                  <Input value={user.email || ""} disabled className="bg-slate-700 border-slate-600 text-slate-400" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">Bio</Label>
                  <Input
                    value={profile?.bio || ""}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Tell us about yourself"
                  />
                </div>
              </div>
              <div className="flex justify-between pt-6 border-t border-slate-700">
                <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
                  Save Changes
                </Button>
                <Button variant="destructive" onClick={() => signOut()} className="bg-red-600 hover:bg-red-700">
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
