"use client"

import { StarField } from "@/components/star-field"
import { Navigation } from "@/components/navigation"
import { UserManagement } from "@/components/user-management"
import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import { GlassCard } from "@/components/glass-card"

export default function AdminPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
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

    const { data: profile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

    // Only owner can access admin page
    setIsAuthorized(profile?.role === "owner")
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Admin Access Required</h1>
              <p className="text-white/70 text-lg mb-6">This page is only accessible to the site owner.</p>
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
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-white/70 text-lg">Manage user roles and permissions</p>
          </div>

          <UserManagement />
        </div>
      </main>
    </div>
  )
}
