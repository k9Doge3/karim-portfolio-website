"use client"

import { useState } from "react"
import { StarField } from "@/components/star-field"
import { Navigation } from "@/components/navigation"
import { GlassCard } from "@/components/glass-card"
import { BusinessStatus } from "@/components/business-status"
import { Phone, Mail, MapPin, ExternalLink, ChevronDown, ChevronUp, Briefcase, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BusinessPage() {
  const [isWildroseExpanded, setIsWildroseExpanded] = useState(true)

  const services = [
    {
      title: "Interior Painting",
      description: "Transform your indoor spaces with professional painting services",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Exterior Painting",
      description: "Protect and beautify your home's exterior with weather-resistant finishes",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Commercial Projects",
      description: "Large-scale painting solutions for businesses and commercial properties",
      gradient: "from-blue-500 to-cyan-500",
    },
  ]

  const projects = [
    { name: "Residential Remodel", location: "Edmonton, AB" },
    { name: "Commercial Office", location: "Edmonton, AB" },
    { name: "Exterior Refresh", location: "Edmonton, AB" },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <StarField speed={0.4} hyperspaceMode={false} starCount={400} opacity={0.25} />
      </div>

      <Navigation />

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Briefcase size={40} className="text-blue-400" />
              <h1 className="text-4xl md:text-5xl font-bold">Business Ventures</h1>
            </div>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Explore my entrepreneurial journey and business projects
            </p>
          </div>

          {/* Business Status Dashboard */}
          <div className="max-w-4xl mx-auto mb-8">
            <BusinessStatus className="w-full" />
          </div>

          {/* Wildrose Painters - Collapsible Section */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="mb-4 text-center">
              <a
                href="https://wildrosepainters.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-105 group"
              >
                <ExternalLink size={24} className="group-hover:rotate-12 transition-transform" />
                Visit wildrosepainters.ca
                <ExternalLink size={24} className="group-hover:rotate-12 transition-transform" />
              </a>
              <p className="text-white/50 text-sm mt-2">View our dedicated website</p>
            </div>

            <button
              onClick={() => setIsWildroseExpanded(!isWildroseExpanded)}
              className="w-full bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <a
                  href="https://www.wildrosepainters.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-32 h-32 rounded-lg overflow-hidden border-2 border-white/10 hover:border-blue-500 transition-all hover:scale-105 cursor-pointer block"
                >
                  <Image
                    src="/wildrose-painters-logo.png"
                    alt="Wildrose Painters logo"
                    width={128}
                    height={128}
                    className="object-cover"
                    priority
                  />
                </a>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white/90 group-hover:text-blue-400 transition-colors">
                    Wildrose Painters
                  </h2>
                  <p className="text-white/60">Professional Painting Services in Alberta</p>
                </div>
              </div>
              <div className="text-blue-400">
                {isWildroseExpanded ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
              </div>
            </button>

            {/* Collapsible Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isWildroseExpanded ? "max-h-[5000px] opacity-100 mt-6" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-6">
                {/* Hero Section */}
                <GlassCard variant="accent" className="text-center">
                  <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
                    Professional painting services across Alberta. From residential homes to commercial properties, we
                    deliver exceptional quality and attention to detail in every project.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center mt-6">
                    <a
                      href="tel:+1-587-501-6994"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105"
                    >
                      <Phone size={20} />
                      Call Now
                    </a>
                    <a
                      href="https://maps.app.goo.gl/QBjg5w6DPeoiBXZq5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:scale-105"
                    >
                      <MapPin size={20} />
                      View on Maps
                    </a>
                    <a
                      href="https://www.facebook.com/wildrosepainters/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(29,78,216,0.5)] hover:scale-105"
                    >
                      <ExternalLink size={20} />
                      Facebook
                    </a>
                    <Link
                      href="/business/wildrose-painters/analytics"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105"
                    >
                      View Analytics
                      <ExternalLink size={20} />
                    </Link>
                  </div>
                </GlassCard>

                {/* Services Grid */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-center text-white/90">Our Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {services.map((service, index) => (
                      <GlassCard key={index} variant="accent" className="group cursor-pointer">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <div className="w-6 h-6 bg-white/20 rounded" />
                        </div>
                        <h4 className="text-xl font-semibold mb-2 text-white/90">{service.title}</h4>
                        <p className="text-white/60">{service.description}</p>
                      </GlassCard>
                    ))}
                  </div>
                </div>

                {/* Recent Projects */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-center text-white/90">Recent Projects</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {projects.map((project, index) => (
                      <GlassCard key={index} variant="accent" className="group cursor-pointer">
                        <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <span className="text-4xl">🏠</span>
                        </div>
                        <h4 className="font-semibold text-white/90">{project.name}</h4>
                        <p className="text-sm text-white/60 flex items-center gap-1 mt-1">
                          <MapPin size={14} />
                          {project.location}
                        </p>
                      </GlassCard>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-6 text-center text-white/90">What Our Clients Say</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <GlassCard variant="accent">
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-white/80 mb-3 italic">
                        "Excellent work! The team was professional, punctual, and the quality exceeded our
                        expectations."
                      </p>
                      <p className="text-white/60 text-sm">- Sarah M., Edmonton</p>
                    </GlassCard>
                    <GlassCard variant="accent">
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-white/80 mb-3 italic">
                        "Great attention to detail and very reasonable pricing. Highly recommend for any painting
                        needs!"
                      </p>
                      <p className="text-white/60 text-sm">- John D., Calgary</p>
                    </GlassCard>
                  </div>
                </div>

                {/* Why Choose Us */}
                <GlassCard variant="accent">
                  <h3 className="text-2xl font-bold mb-6 text-center text-white/90">Why Choose Wildrose Painters?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: "Quality Workmanship", desc: "Attention to detail in every brushstroke" },
                      { title: "Reliable Service", desc: "On-time completion and clear communication" },
                      { title: "Competitive Pricing", desc: "Fair quotes with no hidden fees" },
                      { title: "Customer Satisfaction", desc: "Your happiness is our priority" },
                    ].map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white/90 mb-1">{item.title}</h4>
                          <p className="text-sm text-white/60">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Contact Section */}
                <GlassCard variant="accent" className="text-center">
                  <h3 className="text-2xl font-bold mb-6 text-white/90">Get in Touch</h3>
                  <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <a
                      href="tel:+1587-501-6994"
                      className="flex items-center gap-2 text-white/80 hover:text-blue-400 transition-colors"
                    >
                      <Phone size={20} />
                      <span>587-501-6994</span>
                    </a>
                    <a
                      href="kyoussef6994@gmail.com"
                      className="flex items-center gap-2 text-white/80 hover:text-blue-400 transition-colors"
                    >
                      <Mail size={20} />
                      <span>kyoussef6994@gmail.com</span>
                    </a>
                    <div className="flex items-center gap-2 text-white/80">
                      <MapPin size={20} />
                      <span>Alberta, Canada</span>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>

          {/* Placeholder for future businesses */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl p-8 text-center">
              <p className="text-white/40 text-lg">More business ventures coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
