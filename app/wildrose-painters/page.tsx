"use client"
import { StarField } from "@/components/star-field"
import { GlassCard } from "@/components/glass-card"
import { Navigation } from "@/components/navigation"
import { Palette, Shield, Clock, Award, Phone, Mail, MapPin, CheckCircle, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function WildrosePaintersPage() {
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

  const services = [
    {
      title: "Interior Painting",
      description: "Transform your home's interior with professional painting services",
      features: ["Color consultation", "Surface preparation", "Premium paint application", "Clean-up included"],
      icon: Palette,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Exterior Painting",
      description: "Protect and beautify your home's exterior with weather-resistant coatings",
      features: ["Weather damage assessment", "Power washing", "Primer and paint application", "5-year warranty"],
      icon: Shield,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Commercial Projects",
      description: "Professional painting services for offices, retail spaces, and commercial buildings",
      features: ["Flexible scheduling", "Minimal business disruption", "Industrial-grade materials", "Project management"],
      icon: Award,
      color: "from-purple-500 to-pink-500"
    }
  ]

  const whyChooseUs = [
    {
      title: "Quality Guarantee",
      description: "We stand behind our work with comprehensive warranties and quality assurance",
      icon: Award
    },
    {
      title: "Professional Team",
      description: "Experienced painters with attention to detail and professional training",
      icon: Star
    },
    {
      title: "Timely Completion",
      description: "Projects completed on schedule with minimal disruption to your daily life",
      icon: Clock
    },
    {
      title: "Fully Insured",
      description: "Licensed and insured for your peace of mind and protection",
      icon: Shield
    }
  ]

  const testimonials = [
    {
      name: "Sarah M.",
      location: "Edmonton, AB",
      rating: 5,
      comment: "Karim and his team did an amazing job painting our entire house. Professional, clean, and the results exceeded our expectations!"
    },
    {
      name: "Mike R.",
      location: "Calgary, AB", 
      rating: 5,
      comment: "Excellent service from start to finish. Great attention to detail and very reasonable pricing. Highly recommend Wildrose Painters!"
    },
    {
      name: "Jennifer L.",
      location: "Red Deer, AB",
      rating: 5,
      comment: "Fast, efficient, and high-quality work. They cleaned up perfectly after the job was done. Will definitely hire them again!"
    }
  ]

  const projectStats = [
    { number: "200+", label: "Projects Completed" },
    { number: "5+", label: "Years Experience" },
    { number: "100%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Customer Support" }
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <StarField 
        mousePosition={mousePosition}
        speed={1.0}
        hyperspaceMode={false}
        starCount={700}
      />
      
      <Navigation />
      
      <main className="relative z-10 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className={cn(
            "text-center mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Wildrose Painters
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-3xl mx-auto">
              Professional residential and commercial painting services across Alberta. 
              Quality craftsmanship, reliable service, and customer satisfaction guaranteed.
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="tel:587-501-6994"
                className="bg-blue-600/80 hover:bg-blue-600 px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Phone size={20} />
                <span>Call Now</span>
              </a>
              <a 
                href="mailto:kyoussef6994@gmail.com"
                className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Mail size={20} />
                <span>Get Quote</span>
              </a>
            </div>
          </div>

          {/* Stats Section */}
          <section className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {projectStats.map((stat, index) => (
                <GlassCard key={index} variant="accent" size="md" className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/70 text-sm">
                    {stat.label}
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Our Services
              </h2>
              <p className="text-white/70 text-lg">
                Comprehensive painting solutions for residential and commercial properties
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <GlassCard key={index} variant="default" size="md" className="group">
                    <div className="text-center mb-6">
                      <div className={cn(
                        "inline-flex p-4 rounded-full bg-gradient-to-br mb-4",
                        service.color
                      )}>
                        <Icon size={32} className="text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-white/70 text-sm mb-4">
                        {service.description}
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                          <span className="text-white/80 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                )
              })}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Why Choose Wildrose Painters?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((reason, index) => {
                const Icon = reason.icon
                return (
                  <GlassCard key={index} variant="accent" size="md" className="text-center group">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                        <Icon size={24} className="text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {reason.description}
                    </p>
                  </GlassCard>
                )
              })}
            </div>
          </section>

          {/* Testimonials */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                What Our Customers Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <GlassCard key={index} variant="default" size="md">
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-white/80 text-sm italic mb-3">
                      "{testimonial.comment}"
                    </p>
                    <div className="text-right">
                      <p className="text-white font-medium text-sm">{testimonial.name}</p>
                      <p className="text-white/60 text-xs">{testimonial.location}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <GlassCard variant="accent" size="lg" className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Transform Your Space?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Get a free, no-obligation quote for your painting project. 
                We're here to bring your vision to life with professional quality and service.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center justify-center gap-3">
                  <Phone size={20} className="text-white/60" />
                  <div>
                    <p className="text-white font-medium">(587) 501-6994</p>
                    <p className="text-white/60 text-sm">Call or Text</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Mail size={20} className="text-white/60" />
                  <div>
                    <p className="text-white font-medium">kyoussef6994@gmail.com</p>
                    <p className="text-white/60 text-sm">Email Us</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <MapPin size={20} className="text-white/60" />
                  <div>
                    <p className="text-white font-medium">Edmonton, AB</p>
                    <p className="text-white/60 text-sm">Service Area</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <a 
                  href="tel:587-501-6994"
                  className="bg-blue-600/80 hover:bg-blue-600 px-8 py-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Phone size={20} />
                  <span>Call Now</span>
                </a>
                <a 
                  href="mailto:kyoussef6994@gmail.com?subject=Painting Quote Request"
                  className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Mail size={20} />
                  <span>Request Quote</span>
                </a>
              </div>
            </GlassCard>
          </section>
        </div>
      </main>
    </div>
  )
}