"use client"
import { StarField } from "@/components/star-field"
import { cn } from "@/lib/utils"

import { GlassCard } from "@/components/glass-card"
import { Navigation } from "@/components/navigation"
import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Briefcase,
  Code,
  TrendingUp,
} from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function HomePageClient() {
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

  const portfolioProjects = [
    {
      title: "Personal Portfolio Website",
      description: "Modern portfolio showcasing my skills, projects, and professional journey. Built with Next.js 14, featuring real-time API integrations with Steam, Spotify, and TikTok for live activity displays.",
      tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Google Analytics", "TikTok API"],
      github: "https://github.com/k9Doge3/portfolio",
      demo: "https://kygroup.ca",
      category: "Web Development",
      gradient: "from-blue-500/20 to-cyan-500/20",
      icon: Code,
    },
    {
      title: "Wildrose Painters Website",
      description: "Professional business website for painting contracting services in Alberta. Complete with service listings, project galleries, and client contact systems",
      tech: ["Business Website", "Client Management", "Service Showcase", "Contact Systems"],
      github: "#",
      demo: "https://wildrosepainters.ca",
      category: "Business Website",
      logo: "/wildrose-painters-logo.png",
      gradient: "from-green-500/20 to-emerald-500/20",
      icon: TrendingUp,
    },
  ]

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/k9Doge3",
      icon: Github,
      color: "hover:text-gray-400",
      bgColor: "bg-gray-900/50 hover:bg-gray-800/70",
      shadowColor: "shadow-gray-500/50",
    },
    {
      name: "LinkedIn", 
      url: "https://linkedin.com/in/karim-youssef-accounting",
      icon: Linkedin,
      color: "hover:text-blue-400",
      bgColor: "bg-blue-900/50 hover:bg-blue-800/70",
      shadowColor: "shadow-blue-500/50",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/ky.group.official", 
      icon: Instagram,
      color: "hover:text-pink-400",
      bgColor: "bg-pink-900/50 hover:bg-pink-800/70",
      shadowColor: "shadow-pink-500/50",
    },
    {
      name: "Email",
      url: "mailto:karim@kygroup.ca",
      icon: Mail,
      color: "hover:text-green-400",
      bgColor: "bg-green-900/50 hover:bg-green-800/70",
      shadowColor: "shadow-green-500/50",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="fixed inset-0 z-0">
        <StarField mousePosition={mousePosition} speed={0.8} hyperspaceMode={false} starCount={600} opacity={0.4} />
      </div>

      <Navigation />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-6 flex items-center justify-center mt-16">
          <div
            className={cn(
              "text-center max-w-5xl mx-auto transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95",
            )}
          >
            <GlassCard
              variant="default"
              size="lg"
              className="mb-12 hover:scale-[1.01] transition-all duration-500 ease-out"
            >
              <div className="flex flex-col md:flex-row items-center gap-8 p-2">
                <div className="relative flex-shrink-0">
                  <div className="relative w-28 h-28 md:w-32 md:h-32">
                    <div className="relative w-full h-full rounded-full overflow-hidden border-3 border-white/20 hover:border-white/40 transition-all duration-500 shadow-xl shadow-blue-500/10">
                      <Image
                        src="/profile-picture.jpg"
                        alt="Karim Youssef - Professional Photo"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-left flex-1">
                  <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Karim Youssef
                  </h1>
                  <p className="text-xl text-white/80 mb-6 font-medium">CPA Candidate & Technology Entrepreneur</p>
                  <p className="text-white/70 text-base mb-8 leading-relaxed max-w-2xl">
                    Dedicated accounting professional and business owner with expertise in financial reporting, business operations, and innovative technology solutions. Founder of KY Group and co-owner of Wildrose Painters, combining traditional business acumen with modern digital strategies.
                  </p>

                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {socialLinks.slice(0, 4).map((link) => {
                      const Icon = link.icon
                      return (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "group flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105",
                            link.bgColor,
                            "border border-white/10 hover:border-white/20",
                          )}
                          title={link.name}
                        >
                          <Icon size={20} className={cn("text-white/80 transition-colors duration-300", link.color)} />
                          <span className="hidden sm:inline text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                            {link.name}
                          </span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              {/* Education Card */}
              <GlassCard
                variant="default"
                size="sm"
                className="hover:scale-105 transition-all duration-300 ease-out"
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Education</h3>
                  <p className="text-base text-white/90 font-medium">BComm Accounting</p>
                  <p className="text-sm text-white/70 mb-3">MacEwan University</p>
                  <p className="text-xs text-white/50">November 2024</p>
                </div>
              </GlassCard>

              {/* CPA Designation Card */}
              <GlassCard
                variant="default"
                size="sm"
                className="hover:scale-105 transition-all duration-300 ease-out"
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">CPA Candidate</h3>
                  <p className="text-sm text-white/80 mb-3">Professional designation in progress</p>
                  <span className="inline-block text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                    Ready for PEP
                  </span>
                </div>
              </GlassCard>

              {/* Skills Card */}
              <GlassCard
                variant="default"
                size="sm"
                className="hover:scale-105 transition-all duration-300 ease-out"
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Key Skills</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="text-xs bg-blue-500/20 text-blue-200 px-2 py-1 rounded-full">QuickBooks</span>
                    <span className="text-xs bg-green-500/20 text-green-200 px-2 py-1 rounded-full">Excel</span>
                    <span className="text-xs bg-purple-500/20 text-purple-200 px-2 py-1 rounded-full">IFRS</span>
                  </div>
                </div>
              </GlassCard>
            </div>

            <GlassCard
              variant="default"
              size="md"
              className="hover:scale-[1.01] transition-all duration-300 ease-out max-w-4xl mx-auto"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-3">Professional Experience</h3>
                <p className="text-white/70">Multi-industry background in finance, operations, and customer service</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <svg className="w-5 h-5 mx-auto mb-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-sm text-white/90">Financial Reporting</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <svg className="w-5 h-5 mx-auto mb-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-white/90">Business Operations</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <svg className="w-5 h-5 mx-auto mb-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-sm text-white/90">Customer Service</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <svg className="w-5 h-5 mx-auto mb-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-sm text-white/90">Multi-Industry</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center pt-4 border-t border-white/10">
                <span className="text-sm bg-white/10 text-white/70 px-3 py-1.5 rounded-full">Hospitality</span>
                <span className="text-sm bg-white/10 text-white/70 px-3 py-1.5 rounded-full">Sales</span>
                <span className="text-sm bg-white/10 text-white/70 px-3 py-1.5 rounded-full">Contracting</span>
              </div>
            </GlassCard>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Recent work showcasing expertise in accounting, finance, and web development
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolioProjects.map((project, index) => {
                const IconComponent = project.icon
                return (
                  <GlassCard
                    key={index}
                    variant="default"
                    size="lg"
                    className="group hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 ease-out"
                  >
                    {/* Project Header */}
                    <div className="mb-6">
                      {project.logo ? (
                        <div className="flex justify-center mb-4">
                          <div className="w-32 h-32 relative rounded-xl p-3 flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10">
                            <Image
                              src={project.logo || "/placeholder.svg"}
                              alt={`${project.title} logo`}
                              width={120}
                              height={120}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center mb-4">
                          <div className="w-32 h-32 rounded-xl flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10">
                            <IconComponent className="w-16 h-16 text-white" />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-white/80 bg-white/10 px-3 py-1 rounded-lg">
                          {project.category}
                        </span>
                        <div className="flex gap-2">
                          <a
                            href={project.github}
                            className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                            title="View source code"
                          >
                            <Github size={18} />
                          </a>
                          {project.demo !== "#" && (
                            <a
                              href={project.demo}
                              className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                              title="View live demo"
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed mb-4">{project.description}</p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-md border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                )
              })}
            </div>
          </div>
        </section>

        {/* Professional Services Booking Section */}
        <section className="py-16 px-6 bg-gradient-to-b from-black/50 to-black/90">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Book a Professional Consultation
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Ready to take your business to the next level? Get expert accounting, financial consulting, or web development services tailored to your needs.
              </p>
            </div>

            <GlassCard variant="default" size="lg" className="max-w-3xl mx-auto">
              <form className="space-y-6">
                {/* Service Selection */}
                <div>
                  <label className="block text-white/90 text-sm font-semibold mb-3">
                    Service Needed *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: 'accounting', name: 'Accounting & Financial Reporting', icon: '📊' },
                      { id: 'tax', name: 'Tax Preparation & Planning', icon: '📋' },
                      { id: 'business', name: 'Business Consulting', icon: '💼' },
                      { id: 'web', name: 'Web Development', icon: '💻' },
                      { id: 'financial', name: 'Financial Analysis', icon: '📈' },
                      { id: 'other', name: 'Other Services', icon: '🎯' }
                    ].map((service) => (
                      <label key={service.id} className="flex items-center p-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                        <input type="checkbox" className="mr-3 accent-blue-500" />
                        <span className="mr-2">{service.icon}</span>
                        <span className="text-white/90 text-sm">{service.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/90 text-sm font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white/90 text-sm font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/90 text-sm font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="(587) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-white/90 text-sm font-semibold mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="Your Company Ltd."
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-white/90 text-sm font-semibold mb-2">
                    Project Details *
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                    placeholder="Please describe your project, timeline, budget range, and any specific requirements..."
                    required
                  ></textarea>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-white/90 text-sm font-semibold mb-2">
                    Budget Range
                  </label>
                  <select 
                    title="Budget Range"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  >
                    <option value="">Select budget range...</option>
                    <option value="under-1k">Under $1,000</option>
                    <option value="1k-5k">$1,000 - $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-plus">$25,000+</option>
                    <option value="discuss">Prefer to discuss</option>
                  </select>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-white/90 text-sm font-semibold mb-3">
                    Preferred Contact Method
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {['Email', 'Phone', 'Video Call', 'In-Person Meeting'].map((method) => (
                      <label key={method} className="flex items-center">
                        <input type="radio" name="contact_method" className="mr-2 accent-blue-500" />
                        <span className="text-white/90 text-sm">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    Request Free Consultation
                  </button>
                  <p className="text-center text-white/60 text-sm mt-3">
                    Response time: Within 24 hours • No commitment required
                  </p>
                </div>
              </form>
            </GlassCard>

            {/* Contact Information */}
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                Prefer Direct Contact?
              </h3>
              <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                <a 
                  href="mailto:karim@kygroup.ca"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Mail size={20} />
                  <span>karim@kygroup.ca</span>
                </a>
                <a 
                  href="https://linkedin.com/in/karim-youssef-accounting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Linkedin size={20} />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10 mt-12">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white/60 text-base">© 2025 Karim Youssef. Built with Next.js and creativity.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
