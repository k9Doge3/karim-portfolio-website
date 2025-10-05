"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== "undefined" && "performance" in window) {
      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log("[v0] LCP:", entry.startTime)
        }
      }).observe({ entryTypes: ["largest-contentful-paint"] })

      // First Input Delay
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log("[v0] FID:", entry.processingStart - entry.startTime)
        }
      }).observe({ entryTypes: ["first-input"] })

      // Cumulative Layout Shift
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            console.log("[v0] CLS:", entry.value)
          }
        }
      }).observe({ entryTypes: ["layout-shift"] })
    }
  }, [])

  return null
}
