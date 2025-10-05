"use client"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "dark" | "accent"
  size?: "sm" | "md" | "lg"
  blur?: "none" | "sm" | "md" | "lg"
  onClick?: () => void
}

export function GlassCard({ 
  children, 
  className = "", 
  variant = "default",
  size = "md",
  blur = "md",
  onClick 
}: GlassCardProps) {
  const baseStyles = "relative border border-white/20 backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-105 hover:border-white/30"
  
  const variants = {
    default: "bg-white/10 hover:bg-white/15",
    dark: "bg-black/20 hover:bg-black/25",
    accent: "bg-gradient-to-br from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30"
  }
  
  const sizes = {
    sm: "p-4 rounded-lg",
    md: "p-6 rounded-xl", 
    lg: "p-8 rounded-2xl"
  }
  
  const blurs = {
    none: "",
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg"
  }

  return (
    <div 
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        blurs[blur],
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
