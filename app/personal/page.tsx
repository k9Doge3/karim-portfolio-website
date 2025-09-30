"use client"
import { StarField } from "@/components/star-field"
import { GlassCard } from "@/components/glass-card"
import { Navigation } from "@/components/navigation"
import { Heart, Music, Camera, Plane, Book, Coffee, MapPin, Globe, Users, Target } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function PersonalPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const interests = [
    {
      title: "Travel & Culture",
      description: "Exploring different cultures and learning about diverse traditions around the world",
      icon: Plane,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Languages",
      description: "Fluent in English, Russian, and Arabic - always excited to learn new languages",
      icon: Globe,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Photography",
      description: "Capturing moments and beautiful landscapes during travels and daily life",
      icon: Camera,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Reading",
      description: "Enjoying books on business, finance, and personal development",
      icon: Book,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Music",
      description: "Appreciating various genres and discovering new artists from different cultures",
      icon: Music,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Community Service",
      description: "Volunteering for local causes and environmental conservation projects",
      icon: Users,
      color: "from-teal-500 to-green-500"
    }
  ]

  const personalGoals = [
    "Complete CPA designation and build a successful accounting career",
    "Travel to all continents and experience different cultures",
    "Learn two additional languages (French and Spanish)",
    "Start a mentorship program for newcomers to Canada",
    "Build a sustainable business that gives back to the community"
  ]

  const favoriteQuotes = [
    {
      quote: "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: "Chinese Proverb"
    },
    {
      quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill"
    },
    {
      quote: "In the middle of difficulty lies opportunity.",
      author: "Albert Einstein"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <StarField 
        mousePosition={mousePosition}
        speed={0.8}
        hyperspaceMode={false}
        starCount={600}
      />
      
      <Navigation />
      
      <main className="relative z-10 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className={cn(
            "text-center mb-12 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="flex justify-center mb-6">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/30">
                <Image
                  src="/karim-profile.jpg"
                  alt="Karim Youssef - Personal Photo"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Welcome to My Life
            </h1>
            <p className="text-white/70 text-lg mb-6">
              Beyond the resume - discover my passions, interests, and personal journey
            </p>
            <div className="flex items-center justify-center gap-2 text-white/60">
              <MapPin size={16} />
              <span>Edmonton, Alberta, Canada</span>
            </div>
          </div>

          {/* About Me Section */}
          <section className="mb-16">
            <GlassCard variant="default" size="lg" className="text-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white">About Me</h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-4xl mx-auto mb-6">
                I'm Karim, a passionate accounting student with a love for diverse cultures and languages. 
                Born into a multicultural family, I speak English, Russian, and Arabic fluently, which has 
                given me a unique perspective on the world and helped me connect with people from all walks of life.
              </p>
              <p className="text-white/80 text-lg leading-relaxed max-w-4xl mx-auto">
                When I'm not studying for my CPA or working, you'll find me exploring new places, 
                capturing moments through photography, or volunteering for causes I care about. 
                I believe in the power of community and always strive to give back wherever I can.
              </p>
            </GlassCard>
          </section>

          {/* Interests & Hobbies */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Interests & Hobbies
              </h2>
              <p className="text-white/70 text-lg">
                Things that spark my curiosity and bring joy to my life
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interests.map((interest, index) => {
                const Icon = interest.icon
                return (
                  <GlassCard
                    key={index}
                    variant="accent"
                    size="md"
                    className={cn(
                      "group cursor-pointer transition-all duration-300",
                      "hover:scale-105"
                    )}
                  >
                    <div className="text-center">
                      <div className="mb-4 flex justify-center">
                        <div className={cn(
                          "p-4 rounded-full bg-gradient-to-br transition-all duration-300",
                          "group-hover:scale-110",
                          interest.color
                        )}>
                          <Icon size={32} className="text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-white">
                        {interest.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {interest.description}
                      </p>
                    </div>
                  </GlassCard>
                )
              })}
            </div>
          </section>

          {/* Personal Goals */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <GlassCard variant="default" size="md">
                <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
                  <Target size={24} />
                  Personal Goals
                </h2>
                <ul className="space-y-3">
                  {personalGoals.map((goal, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-2 w-2 h-2 bg-white/60 rounded-full flex-shrink-0"></div>
                      <span className="text-white/80">{goal}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard variant="default" size="md">
                <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
                  <Heart size={24} />
                  Favorite Quotes
                </h2>
                <div className="space-y-6">
                  {favoriteQuotes.map((item, index) => (
                    <div key={index} className="border-l-2 border-white/20 pl-4">
                      <p className="text-white/80 italic mb-2">"{item.quote}"</p>
                      <p className="text-white/60 text-sm">— {item.author}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </section>

          {/* Connect Section */}
          <section className="text-center">
            <GlassCard variant="accent" size="lg">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Let's Connect!
              </h2>
              <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
                I love meeting new people and learning about different perspectives. 
                Whether you want to chat about accounting, travel, languages, or life in general, 
                I'm always open to new conversations and connections.
              </p>
              <div className="flex justify-center gap-4">
                <a 
                  href="mailto:kyoussef6994@gmail.com"
                  className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Coffee size={20} />
                  <span>Let's Chat</span>
                </a>
              </div>
            </GlassCard>
          </section>
        </div>
      </main>
    </div>
  )
}