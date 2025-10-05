"use client"
import { StarField } from "@/components/star-field"
import { Navigation } from "@/components/navigation"
import { SpotifyPlayer } from "@/components/spotify-player"
import { SteamPlayer } from "@/components/steam-player"
import { TwitchPlayer } from "@/components/twitch-player"
import { GlassCard } from "@/components/glass-card"
import { Music, Gamepad2, Twitch, Heart, Coffee, Code2 } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function PersonalPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const interests = [
    {
      icon: Music,
      title: "Music Enthusiast",
      description: "Always discovering new sounds and artists",
      color: "text-green-400 bg-green-400/10",
    },
    {
      icon: Gamepad2,
      title: "Competitive Gamer",
      description: "CS2, Dota 2, and strategy games",
      color: "text-blue-400 bg-blue-400/10",
    },
    {
      icon: Twitch,
      title: "Content Creator",
      description: "Streaming gameplay and just chatting",
      color: "text-purple-400 bg-purple-400/10",
    },
    {
      icon: Code2,
      title: "Tech Explorer",
      description: "Building cool projects and learning new tech",
      color: "text-cyan-400 bg-cyan-400/10",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="fixed inset-0 z-0">
        <StarField mousePosition={mousePosition} speed={0.8} hyperspaceMode={false} starCount={400} opacity={0.3} />
      </div>

      <Navigation />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-6 flex items-center justify-center mt-16">
          <div
            className={cn(
              "text-center max-w-4xl mx-auto transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Personal Space
              </h1>
              <p className="text-xl text-white/70 mb-6">
                Welcome to my digital playground! Here's what I'm up to outside of work.
              </p>
              <div className="flex items-center justify-center gap-2 text-white/60">
                <Heart className="w-5 h-5 text-red-400" />
                <span>Gaming • Music • Streaming • Creating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Live Activities Section */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Live Activities
              </h2>
              <p className="text-white/70 text-lg">
                Real-time updates from my favorite platforms
              </p>
            </div>

            {/* Activity Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              <div className={cn("transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
                <SpotifyPlayer />
              </div>
              
              <div className={cn("transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
                <SteamPlayer />
              </div>
              
              <div className={cn("transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
                <TwitchPlayer />
              </div>
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                What I'm Passionate About
              </h2>
              <p className="text-white/70">
                Beyond the professional world, here's what drives my creativity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interests.map((interest, index) => {
                const Icon = interest.icon
                return (
                  <GlassCard
                    key={interest.title}
                    variant="default"
                    size="md"
                    className="hover:scale-105 transition-all duration-500"
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn("p-3 rounded-xl", interest.color)}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{interest.title}</h3>
                        <p className="text-white/70 text-sm">{interest.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                )
              })}
            </div>
          </div>
        </section>

        {/* Fun Quote Section */}
        <section className="py-12 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <GlassCard variant="default" size="lg" className="transition-all duration-700">
              <div className="text-center">
                <Coffee className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                <blockquote className="text-xl text-white/90 italic mb-4">
                  "Life is too short for boring games, bad music, and instant coffee."
                </blockquote>
                <p className="text-white/60 text-sm">- My personal philosophy</p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/10 mt-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white/60 text-sm">
              This page updates in real-time to show my current activities across platforms.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}