"use client"
import { StarField } from "@/components/star-field"
import { GlassCard } from "@/components/glass-card"
import { Navigation } from "@/components/navigation"
import { Lock, Star, Gift, MessageCircle, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"

export default function SpecialAccessPage() {
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

    const { data: profile, error } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

    if (error) {
      console.error("[v0] Error fetching user profile:", error)
      setIsAuthorized(false)
      return
    }

    // Only personal_access users can see this (not owner)
    const hasSpecialAccess = profile?.role === "personal_access"
    setUserEmail(user.email || "")
    setIsAuthorized(hasSpecialAccess)
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Special Access Required</h1>
              <p className="text-white/70 text-lg mb-6">
                This page is only accessible to users with special access permissions.
              </p>
              {userEmail && <p className="text-white/60 text-sm mb-6">Logged in as: {userEmail}</p>}
              <button
                onClick={() => router.push("/personal")}
                className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-colors"
              >
                Back to Personal Page
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
              <div className="p-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                <Star size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Special Access Area
            </h1>
            <p className="text-white/70 text-lg">Thank you for being part of my inner circle!</p>
          </div>

          {/* Welcome Message */}
          <section className="mb-12">
            <GlassCard variant="accent" size="lg" className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-gradient-to-br from-pink-500 to-red-500">
                  <Heart size={32} className="text-white" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">Welcome, Special Friend!</h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                You've been granted special access to this exclusive area. Here you'll find content, updates, and
                insights that I only share with my closest friends and trusted connections.
              </p>
            </GlassCard>
          </section>

          {/* Exclusive Content */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard variant="default" size="md">
                <div className="flex items-center gap-3 mb-4">
                  <Gift size={24} className="text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">Exclusive Updates</h3>
                </div>
                <p className="text-white/70">
                  Get early access to my latest projects, ideas, and personal updates before anyone else.
                </p>
              </GlassCard>

              <GlassCard variant="default" size="md">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle size={24} className="text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">Direct Communication</h3>
                </div>
                <p className="text-white/70">
                  Have a direct line to reach out and share thoughts, ideas, or just catch up.
                </p>
              </GlassCard>
            </div>
          </section>

          {/* Special Content Section */}
          <section className="mb-12">
            <GlassCard variant="default" size="lg">
              <h2 className="text-2xl font-semibold mb-6 text-white">Behind the Scenes</h2>
              <div className="space-y-4">
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-white">Current Projects</h3>
                  <p className="text-white/70">
                    I'm currently working on some exciting projects that I'll be sharing more about soon. Stay tuned for
                    exclusive previews and updates!
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-white">Personal Insights</h3>
                  <p className="text-white/70">
                    This is where I share deeper thoughts, lessons learned, and personal reflections that I don't
                    typically post publicly.
                  </p>
                </div>
              </div>
            </GlassCard>
          </section>
        </div>
      </main>
    </div>
  )
}
