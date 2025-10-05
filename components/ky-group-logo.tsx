"use client"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function KYGroupLogo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  return (
    <div className={cn("relative", sizes[size], className)}>
      <Image
        src="/kygroup-logo.png"
        alt="KY Group Logo"
        width={128}
        height={128}
        className="w-full h-full object-contain"
      />
    </div>
  )
}
