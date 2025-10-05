"use client"
import { StarField } from "@/components/star-field"
import { GlassCard } from "@/components/glass-card"
import { Navigation } from "@/components/navigation"
import { Mail, Phone, MapPin, Calendar, Download, Users, Briefcase, GraduationCap, Languages } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function ResumePage() {
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

  const experience = [
    {
      title: "Car Salesperson",
      company: "ProCredit Auto & Go Auto Outlet Leduc",
      period: "November 2024 – March 2025",
      location: "Leduc, AB",
      achievements: [
        "Cold called customers for credit applications for vehicle financing",
        "Generated leads through online marketing on Facebook",
        "Ensured quality customer service when customers were in-house",
        "Worked as a team to help other salespeople and coordinate appointment schedules",
        "Learned urgency creation skills and followed the sales process to close deals",
      ],
    },
    {
      title: "Administrator Assistant (Internship)",
      company: "Multilinguabilities",
      period: "July 2024",
      location: "Edmonton, AB",
      achievements: [
        "Processed and verified invoices for accuracy, ensuring timely payments",
        "Maintained financial records and tracked deadlines",
        "Supported development and implementation of project timelines",
      ],
    },
    {
      title: "Delivery Driver/Courier",
      company: "FedEx Express, UberEATS and various apps",
      period: "2019–2020",
      location: "Edmonton, AB",
      achievements: [
        "Ensured timely and proper delivery of packages across the city",
        "Developed strong organizational and time-tracking skills",
        "Maintained attention to detail and accurate record-keeping",
      ],
    },
    {
      title: "Residential Painter/Contractor",
      company: "Wildrose Painters, Student-Works Painters",
      period: "2017-2019",
      location: "Edmonton, AB",
      achievements: [
        "Prepared surfaces by cleaning, sanding, and repairing imperfections",
        "Selected appropriate tools for each job to ensure quality work",
        "Maintained safe and organized working spaces that boosted efficiency",
        "Handled budgeting, expense tracking, and invoice preparation for painting projects",
      ],
    },
  ]

  const education = [
    {
      degree: "Bachelor of Commerce in Accounting",
      school: "Grant MacEwan University",
      period: "Graduating August 2025",
      location: "Edmonton, AB",
      details: "Human Resource Minor • CPA designation courses included",
    },
  ]

  const volunteerExperience = [
    {
      title: "Stollery Children Hospital Hockey Tournament",
      period: "2016",
      description: "Tracked scores for hockey fundraiser event for Stollery Children's Hospital",
    },
    {
      title: "Edmonton & Area Land Trust: Golden Ranches",
      period: "2020",
      description: "Removed invasive plants and helped maintain perimeter with landscaping and trail maintenance",
    },
  ]

  const skills = [
    {
      category: "Hard Skills",
      items: [
        "Microsoft Office",
        "Power BI",
        "Intuit QuickBooks",
        "Data Analytics",
        "Microsoft Excel",
        "Corporate Tax Software",
      ],
    },
    {
      category: "Soft Skills",
      items: ["Communication", "Teamwork", "Problem-Solving", "Time Management", "Work Ethic", "Customer Service"],
    },
    {
      category: "Languages",
      items: ["English (Fluent)", "Russian (Native)", "Arabic (Fluent)"],
    },
  ]

  const references = [
    {
      name: "Elias",
      title: "Manager",
      company: "GoAuto Outlet Leduc",
      phone: "587-778-4670",
    },
    {
      name: "Michelle Malin",
      title: "Associate Professor, MPAcc; CPA; CA",
      company: "Department of Accounting & Finance",
      phone: "780-633-3328",
    },
    {
      name: "Anoura Ramli",
      title: "Admin Coordinator",
      company: "Multilinguabilities - Newcomer Center",
      phone: "437-254-6599",
    },
    {
      name: "Matthew Durnie",
      title: "Professional Painter",
      company: "Student-Works-West; Brushed-Up Painters Owner",
      phone: "780-995-1157",
      email: "matthewdd09@gmail.com",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="fixed inset-0 z-0">
        <StarField mousePosition={mousePosition} speed={0.7} hyperspaceMode={false} starCount={550} opacity={0.3} />
      </div>

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
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/30">
                <Image
                  src="/profile-picture.jpg"
                  alt="Karim Youssef - Professional Photo"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Karim Youssef
            </h1>
            <p className="text-white/70 text-lg mb-6">
              BCom Accounting Student • CPA Candidate • Business Professional
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                <Download size={16} />
                <span>Download PDF</span>
              </button>
              <a
                href="mailto:kyoussef6994@gmail.com"
                className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors"
              >
                <Mail size={16} />
                <span>Contact Me</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Information */}
              <GlassCard variant="default" size="md">
                <h2 className="text-xl font-semibold mb-4 text-white">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-white/60" />
                    <span className="text-white/80">kyoussef6994@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-white/60" />
                    <span className="text-white/80">(587) 501-6994</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-white/60" />
                    <span className="text-white/80">Edmonton, AB, Canada</span>
                  </div>
                </div>
              </GlassCard>

              {/* Professional Summary */}
              <GlassCard variant="default" size="md">
                <h2 className="text-xl font-semibold mb-4 text-white">Professional Summary</h2>
                <p className="text-white/80 text-sm leading-relaxed">
                  Currently a student graduating in August from Grant MacEwan University pursuing a BCom in Accounting
                  with a Human Resource Minor. Completing all required courses for CPA designation. Proficient in
                  corporate tax software including Intuit QuickBooks and skilled in data analytics tools such as
                  Microsoft Excel. Looking for diverse opportunities to apply accounting skills and gain valuable
                  experience across various industries.
                </p>
              </GlassCard>

              {/* Skills */}
              <GlassCard variant="default" size="md">
                <h2 className="text-xl font-semibold mb-4 text-white">Skills & Competencies</h2>
                <div className="space-y-4">
                  {skills.map((skillGroup, index) => (
                    <div key={index}>
                      <h3 className="text-white/90 font-medium mb-2 flex items-center gap-2">
                        {skillGroup.category === "Languages" ? <Languages size={16} /> : null}
                        {skillGroup.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <span key={skillIndex} className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* References */}
              <GlassCard variant="default" size="md">
                <h2 className="text-xl font-semibold mb-4 text-white">References</h2>
                <div className="space-y-3">
                  {references.map((ref, index) => (
                    <div key={index} className="border-l-2 border-white/20 pl-3">
                      <h3 className="text-white/90 font-medium text-sm">{ref.name}</h3>
                      <p className="text-white/70 text-xs">{ref.title}</p>
                      <p className="text-white/60 text-xs">{ref.company}</p>
                      <p className="text-white/60 text-xs">{ref.phone}</p>
                      {ref.email && <p className="text-white/60 text-xs">{ref.email}</p>}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Professional Experience */}
              <GlassCard variant="default" size="md">
                <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
                  <Briefcase size={24} />
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((job, index) => (
                    <div key={index} className="border-l-2 border-white/20 pl-6 relative">
                      <div className="absolute -left-2 top-2 w-4 h-4 bg-white/20 rounded-full"></div>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Calendar size={14} />
                          <span>{job.period}</span>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                        <p className="text-white/80 font-medium">{job.company}</p>
                        <span className="hidden md:inline text-white/40">•</span>
                        <p className="text-white/60 text-sm">{job.location}</p>
                      </div>
                      <ul className="space-y-2">
                        {job.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="text-white/70 text-sm">
                            • {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Education */}
              <GlassCard variant="default" size="md">
                <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
                  <GraduationCap size={24} />
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-white/20 pl-6 relative">
                      <div className="absolute -left-2 top-2 w-4 h-4 bg-white/20 rounded-full"></div>
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-32 h-32 bg-white rounded-lg p-2 flex items-center justify-center flex-shrink-0">
                          <Image
                            src="/macewan-logo.jpg"
                            alt="MacEwan University Logo"
                            width={128}
                            height={128}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                            <div className="flex items-center gap-2 text-white/60 text-sm">
                              <Calendar size={14} />
                              <span>{edu.period}</span>
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                            <p className="text-white/80 font-medium">{edu.school}</p>
                            <span className="hidden md:inline text-white/40">•</span>
                            <p className="text-white/60 text-sm">{edu.location}</p>
                          </div>
                          <p className="text-white/70 text-sm">{edu.details}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Volunteer Experience */}
              <GlassCard variant="default" size="md">
                <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
                  <Users size={24} />
                  Volunteer Experience
                </h2>
                <div className="space-y-4">
                  {volunteerExperience.map((vol, index) => (
                    <div key={index} className="border-l-2 border-white/20 pl-6 relative">
                      <div className="absolute -left-2 top-2 w-4 h-4 bg-white/20 rounded-full"></div>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">{vol.title}</h3>
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Calendar size={14} />
                          <span>{vol.period}</span>
                        </div>
                      </div>
                      <p className="text-white/70 text-sm">{vol.description}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
