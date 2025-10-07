"use client"

import { StarField } from "@/components/star-field"
import { Navigation } from "@/components/navigation"
import { GlassCard } from "@/components/glass-card"
import { BusinessStatus } from "@/components/business-status"
import { ExternalLink, Briefcase, Users, MapPin, Calendar, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function BusinessPage() {
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
              <h1 className="text-4xl md:text-5xl font-bold">Business Dashboard</h1>
            </div>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Quick overview of my business ventures and key metrics
            </p>
          </div>

          {/* Business Status Dashboard */}
          <div className="max-w-4xl mx-auto mb-8">
            <BusinessStatus className="w-full" />
          </div>

          {/* Wildrose Painters Summary */}
          <div className="max-w-6xl mx-auto mb-8">
            <GlassCard variant="accent" className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col items-center md:items-start gap-6">
                  <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-white/20">
                    <Image
                      src="/wildrose-painters-logo.png"
                      alt="Wildrose Painters logo"
                      width={96}
                      height={96}
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold text-white/90 mb-2">Wildrose Painters</h2>
                    <p className="text-white/60 mb-4">Professional Painting Services in Alberta</p>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-black/20 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Users size={16} className="text-blue-400" />
                          <span className="text-sm text-white/60">Team Size</span>
                        </div>
                        <p className="text-lg font-bold">5+ Painters</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin size={16} className="text-green-400" />
                          <span className="text-sm text-white/60">Service Area</span>
                        </div>
                        <p className="text-lg font-bold">Alberta</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar size={16} className="text-purple-400" />
                          <span className="text-sm text-white/60">Founded</span>
                        </div>
                        <p className="text-lg font-bold">2024</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp size={16} className="text-yellow-400" />
                          <span className="text-sm text-white/60">Status</span>
                        </div>
                        <p className="text-lg font-bold">Growing</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold mb-4">Services Overview</h3>
                  <ul className="space-y-2 mb-6 text-white/80">
                    <li>• Residential Interior Painting</li>
                    <li>• Commercial Property Services</li>
                    <li>• Color Consultation</li>
                    <li>• Surface Preparation & Repair</li>
                    <li>• High-Quality Finish Coatings</li>
                  </ul>
                  
                  <a
                    href="https://wildrose-painters-glowingandflowingk9dog-6457-a8db353c.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-105 group"
                  >
                    <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
                    Visit Full Website
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Future Business Ventures */}
          <div className="max-w-6xl mx-auto">
            <GlassCard className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Future Ventures</h3>
              <p className="text-white/60 text-lg mb-6">
                Exploring opportunities in technology consulting, software development, and digital marketing
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-black/20 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Tech Consulting</h4>
                  <p className="text-white/60 text-sm">Planning Phase</p>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <h4 className="font-bold mb-2">SaaS Development</h4>
                  <p className="text-white/60 text-sm">Research Phase</p>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Digital Agency</h4>
                  <p className="text-white/60 text-sm">Concept Phase</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
