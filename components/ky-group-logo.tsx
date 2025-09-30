"use client"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function KYGroupLogo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  }

  return (
    <div className={cn("relative", sizes[size], className)}>
      <Image
        src="/kygroup-logo.png"
        alt="KY Group Logo"
        width={64}
        height={64}
        className="w-full h-full object-contain"
      />
    </div>
  )
}