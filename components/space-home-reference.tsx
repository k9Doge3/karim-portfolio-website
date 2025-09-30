"use client"
import { StarField } from "@/components/star-field"
import { ExternalLink, User, Briefcase, Heart, Building } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isLinksVisible, setIsLinksVisible] = useState(false)
  const [blurAmount, setBlurAmount] = useState(0)
  const [initialHeight, setInitialHeight] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const linksRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef(0)
  const ticking = useRef(false)
  const mouseTimeoutRef = useRef<NodeJS.Timeout>()

  // Store initial height on first render
  useEffect(() => {
    if (initialHeight === 0) {
      setInitialHeight(window.innerHeight)
    }
  }, [initialHeight])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsMouseMoving(true)

      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current)
      }

      mouseTimeoutRef.current = setTimeout(() => {
        setIsMouseMoving(false)
      }, 100)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current)
      }
    }
  }, [])

  // Handle scroll events to calculate blur amount
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const maxBlur = 8
          const triggerHeight = initialHeight * 0.8
          const newBlurAmount = Math.min(maxBlur, (scrollRef.current / triggerHeight) * maxBlur)
          setBlurAmount(newBlurAmount)
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [initialHeight])

  // Intersection observer for links visibility
  useEffect(() => {
    const linksObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLinksVisible(true)
          if (linksRef.current) {
            linksObserver.unobserve(linksRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (linksRef.current) {
      linksObserver.observe(linksRef.current)
    }

    return () => {
      if (linksRef.current) {
        linksObserver.unobserve(linksRef.current)
      }
    }
  }, [])

  const scaleFactor = 1 + blurAmount / 16
  const warpSpeedStyle = {
    transform: `scale(${scaleFactor})`,
    transition: "transform 0.2s ease-out",
  }

  const heroStyle = {
    height: initialHeight ? `${initialHeight}px` : "100vh",
  }

  const navigationLinks = [
    {
      title: "Personal Life",
      description: "Thoughts, interests, and personal journey",
      icon: User,
      href: "https://v0.app/chat/duplicate-of-yandex-file-upload-w9xEl6OOXNH",
      color: "from-blue-500 to-cyan-500",
      emoji: "🌟",
    },
    {
      title: "Portfolio",
      description: "Projects, work, and professional achievements",
      icon: Briefcase,
      href: "#", // Replace with your portfolio website URL
      color: "from-purple-500 to-pink-500",
      emoji: "💼",
    },
    {
      title: "Family",
      description: "Family moments and shared experiences",
      icon: Heart,
      href: "#", // Replace with your family website URL
      color: "from-red-500 to-orange-500",
      emoji: "❤️",
    },
    {
      title: "Business",
      description: "Ventures, services, and professional endeavors",
      icon: Building,
      href: "#", // Replace with your business website URL
      color: "from-green-500 to-emerald-500",
      emoji: "🚀",
    },
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div
        className={cn(
          "fixed w-6 h-6 pointer-events-none z-50 transition-all duration-300 ease-out",
          "bg-white/20 rounded-full blur-sm",
          isMouseMoving ? "scale-100 opacity-100" : "scale-0 opacity-0",
        )}
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      />

      <div className="fixed inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden" style={heroStyle}>
        <div className="absolute inset-0" style={warpSpeedStyle}>
          <StarField blurAmount={blurAmount} mousePosition={mousePosition} />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <div
              className={cn(
                "backdrop-blur-sm px-8 py-6 rounded-lg inline-block relative transition-all duration-500",
                "hover:scale-105 hover:backdrop-blur-md",
              )}
              style={{
                background: "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)",
              }}
            >
              <h1 className="text-5xl font-bold text-white md:text-7xl font-heading mb-4 animate-pulse">
                Karim Youssef
              </h1>
              <p className="text-xl text-gray-300 md:text-2xl max-w-md mx-auto">Welcome to my digital universe</p>
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Links Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-white rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={linksRef}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-1000 ease-out",
              isLinksVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {navigationLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8",
                      "transition-all duration-500 hover:scale-105 hover:bg-gray-800/70 hover:border-gray-600",
                      "hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-2",
                    )}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-20 transition-all duration-500`}
                    />

                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${link.color} opacity-20 animate-pulse`}
                      />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Icon className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                          <span className="text-2xl group-hover:animate-bounce">{link.emoji}</span>
                        </div>
                        <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 font-heading group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {link.title}
                      </h3>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                        {link.description}
                      </p>
                    </div>

                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${20 + i * 20}%`,
                            animationDelay: `${i * 0.2}s`,
                          }}
                        />
                      ))}
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 border-t border-gray-800 relative">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
            © 2025 Neil Alliston. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
