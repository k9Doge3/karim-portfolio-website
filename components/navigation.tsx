"use client"
import { GlassCard } from "./glass-card"
import { ModernLogo } from "./modern-logo"
import { Home, User, Briefcase, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Portfolio", icon: Home, description: "Professional portfolio" },
    { href: "/resume", label: "Resume", icon: FileText, description: "Professional experience" },
    { href: "/personal", label: "Personal", icon: User, description: "Personal interests", external: "kylife.ca" },
    { href: "/business", label: "Business", icon: Briefcase, description: "Contracting services" },
  ]

  return (
    <nav className={cn("fixed top-6 left-1/2 transform -translate-x-1/2 z-50", className)}>
      <GlassCard variant="dark" size="sm" className="flex items-center space-x-4 px-6 py-3">
        <Link href="/" className="flex items-center hover:scale-110 transition-transform duration-300">
          <ModernLogo size="md" variant="icon" />
        </Link>
        <div className="h-6 w-px bg-white/20"></div>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300",
                isActive
                  ? "bg-white/20 text-white shadow-lg font-semibold"
                  : "text-white/80 hover:text-white hover:bg-white/10 font-medium hover:scale-105",
              )}
              title={item.description}
            >
              <Icon size={18} />
              <span className="hidden sm:inline text-sm">{item.label}</span>
              {item.external && <ExternalLink size={12} className="opacity-60" />}
            </Link>
          )
        })}
      </GlassCard>
    </nav>
  )
}
