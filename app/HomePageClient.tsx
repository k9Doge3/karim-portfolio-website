"use client"
import { StarField } from "@/components/star-field"
import { GlassCard } from "@/components/glass-card"
import { Navigation } from "@/components/navigation"
import { ExternalLink, Github, Linkedin, Mail, Code, Globe, Palette, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function HomePageClient() {
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

  const portfolioProjects = [
    {
      title: "KY Group Portfolio",
      description: "Professional portfolio website with animated starfield background and glass morphism design",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas API"],
      github: "https://github.com/karim-youssef",
      demo: "https://kygroup.ca",
      category: "Web Development"
    },
    {
      title: "Wildrose Painters Business",
      description: "Residential painting contractor business with project management and client services",
      tech: ["Business Management", "Customer Service", "Project Planning", "Budget Management"],
      github: "#",
      demo: "#",
      category: "Business Operations"
    },
    {
      title: "Financial Analytics Dashboard",
      description: "Data analytics project using Power BI and Excel for financial reporting",
      tech: ["Power BI", "Microsoft Excel", "Data Analytics", "Financial Reporting"],
      github: "#",
      demo: "#",
      category: "Accounting & Finance"
    }
  ]

  const businessDomains = [
    {
      title: "Portfolio Hub",
      description: "Professional development portfolio",
      icon: Code,
      href: "/",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Personal Life",
      description: "Personal interests and hobbies",
      icon: Globe,
      href: "/personal",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Wildrose Painters",
      description: "Professional contracting services",
      icon: Palette,
      href: "/wildrose-painters", 
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Resume",
      description: "Professional experience and skills",
      icon: TrendingUp,
      href: "/resume",
      color: "from-orange-500 to-red-500",
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <StarField 
        mousePosition={mousePosition}
        speed={1.5}
        hyperspaceMode={false}
        starCount={800}
      />
      
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className={cn(
            "text-center max-w-4xl mx-auto transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <GlassCard variant="default" size="lg" className="mb-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30">
                    <Image
                      src="/karim-profile.jpg"
                      alt="Karim Youssef - Professional Photo"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-black rounded-full"></div>
                </div>
                
                <div className="text-left">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Karim Youssef
                  </h1>
                  <p className="text-xl md:text-2xl text-white/80 mb-6">
                    BCom Accounting Student & CPA Candidate
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <a href="https://github.com/kyriakos-paul" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                      <Github size={20} />
                      <span>GitHub</span>
                    </a>
                    <a href="https://linkedin.com/in/karim-youssef" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                      <Linkedin size={20} />
                      <span>LinkedIn</span>
                    </a>
                    <a href="mailto:kyoussef6994@gmail.com" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                      <Mail size={20} />
                      <span>Contact</span>
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
            
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              BCom Accounting student at Grant MacEwan University pursuing CPA designation. 
              Experienced in business operations, customer service, and financial management across multiple industries.
            </p>
          </div>
        </section>

        {/* Business Domains Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                My Digital Universe
              </h2>
              <p className="text-white/70 text-lg">
                Explore my different ventures and domains
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {businessDomains.map((domain, index) => {
                const Icon = domain.icon
                return (
                  <GlassCard
                    key={index}
                    variant="accent"
                    size="md"
                    className={cn(
                      "group cursor-pointer transition-all duration-300",
                      "hover:scale-105 hover:bg-gradient-to-br",
                      domain.color
                    )}
                    onClick={() => window.location.href = domain.href}
                  >
                    <div className="text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                          <Icon size={32} className="text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {domain.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {domain.description}
                      </p>
                    </div>
                  </GlassCard>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-white/70 text-lg">
                Recent work and portfolio highlights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioProjects.map((project, index) => (
                <GlassCard key={index} variant="default" size="md" className="group">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-white/60 bg-white/10 px-2 py-1 rounded">
                        {project.category}
                      </span>
                      <div className="flex gap-2">
                        <a 
                          href={project.github} 
                          className="text-white/60 hover:text-white transition-colors"
                          title="View source code"
                        >
                          <Github size={16} />
                        </a>
                        {project.demo !== "#" && (
                          <a 
                            href={project.demo} 
                            className="text-white/60 hover:text-white transition-colors"
                            title="View live demo"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-white/90 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white/60">
              © 2025 Karim Youssef. Built with Next.js and creativity.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
