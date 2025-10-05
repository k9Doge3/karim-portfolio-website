"use client"
import { StarField } from "@/components/star-field"
import { GlassCard } from "@/components/glass-card"
import { Navigation } from "@/components/navigation"
import { Coffee, Heart, MessageCircle, Sparkles, Users } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"

export default function GuestPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
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

    const { data: profile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

    // Only guests can access this page
    setIsAuthorized(profile?.role === "guest")
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Access Denied</h1>
              <p className="text-white/70 text-lg mb-6">This page is only accessible to guest users.</p>
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
              <div className="p-6 rounded-full bg-gradient-to-br from-green-500 to-teal-500">
                <Sparkles size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              Guest Lounge
            </h1>
            <p className="text-white/70 text-lg">Welcome! Here's some exclusive content just for you</p>
          </div>

          {/* Welcome Message */}
          <section className="mb-16">
            <GlassCard variant="accent" size="lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-green-500/20">
                  <Heart size={24} className="text-green-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-white">Thanks for Visiting!</h2>
              </div>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                I'm so glad you're here! This is a special space where I share some fun updates, thoughts, and things
                I'm excited about. Feel free to explore and get to know me a bit better.
              </p>
            </GlassCard>
          </section>

          {/* Fun Facts */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Fun Facts About Me
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard variant="default" size="md">
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                  <Coffee size={20} />
                  Coffee Enthusiast
                </h3>
                <p className="text-white/70">
                  I can't start my day without a good cup of coffee. My favorite is a double espresso with a splash of
                  oat milk!
                </p>
              </GlassCard>

              <GlassCard variant="default" size="md">
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                  <MessageCircle size={20} />
                  Language Lover
                </h3>
                <p className="text-white/70">
                  Speaking three languages has opened so many doors for me. Currently trying to learn French - wish me
                  luck!
                </p>
              </GlassCard>

              <GlassCard variant="default" size="md">
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                  <Users size={20} />
                  Community First
                </h3>
                <p className="text-white/70">
                  I believe in giving back. Whether it's volunteering or mentoring, helping others brings me the most
                  joy.
                </p>
              </GlassCard>

              <GlassCard variant="default" size="md">
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                  <Sparkles size={20} />
                  Always Learning
                </h3>
                <p className="text-white/70">
                  From accounting principles to new tech skills, I'm constantly learning and growing. Life's too short
                  to stop exploring!
                </p>
              </GlassCard>
            </div>
          </section>

          {/* Recent Updates */}
          <section className="mb-16">
            <GlassCard variant="default" size="lg">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white">Recent Updates</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="text-white/60 text-sm mb-1">This Week</p>
                  <p className="text-white/80">
                    Just finished a challenging accounting project and feeling accomplished! Also discovered a great new
                    hiking trail near Edmonton.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="text-white/60 text-sm mb-1">Last Month</p>
                  <p className="text-white/80">
                    Started volunteering at a local community center. It's been incredibly rewarding to give back and
                    meet new people.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="text-white/60 text-sm mb-1">Coming Soon</p>
                  <p className="text-white/80">
                    Planning a trip to explore more of Western Canada. Can't wait to capture some amazing photos!
                  </p>
                </div>
              </div>
            </GlassCard>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <GlassCard variant="accent" size="lg">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">Stay Connected</h2>
              <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
                Thanks for being part of my journey! Feel free to reach out anytime - I'd love to hear from you.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => router.push("/personal")}
                  className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-colors"
                >
                  Back to Personal Page
                </button>
                <a
                  href="mailto:kyoussef6994@gmail.com"
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 px-6 py-3 rounded-lg transition-all"
                >
                  Get in Touch
                </a>
              </div>
            </GlassCard>
          </section>
        </div>
      </main>
    </div>
  )
}
