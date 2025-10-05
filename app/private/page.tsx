"use client"
import { StarField } from "@/components/star-field"
import { GlassCard } from "@/components/glass-card"
import { Navigation } from "@/components/navigation"
import { Lock, Crown, TrendingUp, Calendar, Target, FileText, BarChart3 } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"

export default function PrivatePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [userEmail, setUserEmail] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    checkAuthorization()

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const checkAuthorization = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setIsAuthorized(false)
      return
    }

    // Only owner can access this page
    const isOwner = user.email === "kyoussef6994@gmail.com"
    setUserEmail(user.email || "")
    setIsAuthorized(isOwner)
  }

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <StarField mousePosition={mousePosition} speed={0.8} hyperspaceMode={false} starCount={600} />
        <div className="relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        <StarField mousePosition={mousePosition} speed={0.8} hyperspaceMode={false} starCount={600} />
        <Navigation />
        <main className="relative z-10 pt-24 pb-12">
          <div className="max-w-2xl mx-auto px-6">
            <GlassCard variant="default" size="lg" className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-6 rounded-full bg-red-500/20">
                  <Lock size={48} className="text-red-400" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Owner Access Only</h1>
              <p className="text-white/70 text-lg mb-6">
                This page is strictly private and only accessible to the owner.
              </p>
              {userEmail && <p className="text-white/60 text-sm mb-6">Logged in as: {userEmail}</p>}
              <button
                onClick={() => router.push("/")}
                className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-colors"
              >
                Return to Homepage
              </button>
            </GlassCard>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <StarField mousePosition={mousePosition} speed={0.8} hyperspaceMode={false} starCount={600} />
      <Navigation />

      <main className="relative z-10 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div
            className={cn(
              "text-center mb-12 transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="flex justify-center mb-6">
              <div className="p-6 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500">
                <Crown size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Private Dashboard
            </h1>
            <p className="text-white/70 text-lg">Your personal space for private notes, analytics, and insights</p>
          </div>

          {/* Quick Stats */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassCard variant="accent" size="md">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-500/20">
                    <TrendingUp size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Total Views</p>
                    <p className="text-2xl font-bold text-white">1,234</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard variant="accent" size="md">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-green-500/20">
                    <Calendar size={24} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Days Active</p>
                    <p className="text-2xl font-bold text-white">42</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard variant="accent" size="md">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-purple-500/20">
                    <Target size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Goals Completed</p>
                    <p className="text-2xl font-bold text-white">8/12</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </section>

          {/* Private Notes */}
          <section className="mb-12">
            <GlassCard variant="default" size="lg">
              <div className="flex items-center gap-3 mb-6">
                <FileText size={24} className="text-white" />
                <h2 className="text-2xl font-semibold text-white">Private Notes</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-white/80">
                    Add your personal thoughts, reminders, or anything you want to keep private here. This section is
                    only visible to you.
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-white/60 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </GlassCard>
          </section>

          {/* Analytics */}
          <section className="mb-12">
            <GlassCard variant="default" size="lg">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 size={24} className="text-white" />
                <h2 className="text-2xl font-semibold text-white">Personal Analytics</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-white">Website Traffic</h3>
                  <p className="text-white/70">Track visitors, page views, and engagement metrics.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-white">Goal Progress</h3>
                  <p className="text-white/70">Monitor your personal and professional goals.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-white">Time Tracking</h3>
                  <p className="text-white/70">See how you spend your time on different activities.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-white">Financial Overview</h3>
                  <p className="text-white/70">Keep track of your personal finances and investments.</p>
                </div>
              </div>
            </GlassCard>
          </section>
        </div>
      </main>
    </div>
  )
}
