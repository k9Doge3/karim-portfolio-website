"use client"
import { cn } from "@/lib/utils"

interface ModernLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "full" | "icon"
}

export function ModernLogo({ className, size = "lg", variant = "full" }: ModernLogoProps) {
  const sizes = {
    sm: variant === "full" ? "h-10" : "w-10 h-10",
    md: variant === "full" ? "h-12" : "w-12 h-12", 
    lg: variant === "full" ? "h-16" : "w-16 h-16",
    xl: variant === "full" ? "h-20" : "w-20 h-20",
  }

  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14", 
    xl: "w-16 h-16",
  }

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  }

  if (variant === "icon") {
    return (
      <div className={cn("relative flex items-center justify-center", sizes[size], className)}>
        <div className="relative">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-0.5">
            <div className="w-full h-full rounded-full bg-black"></div>
          </div>
          
          {/* Inner content */}
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="font-bold text-white text-sm leading-none">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">K</span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Y</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-3", sizes[size], className)}>
      {/* Icon */}
      <div className={cn("relative flex items-center justify-center", iconSizes[size])}>
        <div className="relative">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-0.5">
            <div className="w-full h-full rounded-full bg-black"></div>
          </div>
          
          {/* Inner content */}
          <div className="relative flex items-center justify-center w-full h-full">
            <div className={cn(
              "font-bold text-white leading-none",
              textSizes[size]
            )}>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">K</span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Y</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className={cn(
          "font-bold text-white",
          textSizes[size]
        )}>
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">KY</span>
          <span className="text-white/90"> Group</span>
        </span>
        <span className={cn(
          "text-white/60 font-medium",
          size === "sm" ? "text-xs" : size === "md" ? "text-sm" : size === "lg" ? "text-base" : "text-lg"
        )}>
          Professional Services
        </span>
      </div>
    </div>
  )
}