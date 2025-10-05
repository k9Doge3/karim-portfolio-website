"use client"
import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Users, Globe, Activity, ExternalLink } from "lucide-react"
import { GlassCard } from "./glass-card"
import { cn } from "@/lib/utils"

interface BusinessStatusProps {
  className?: string
}

interface BusinessData {
  isOnline: boolean
  activeUsers: number
  totalVisitors: number
  lastUpdated: string
  status: "operational" | "maintenance" | "offline"
}

export function BusinessStatus({ className }: BusinessStatusProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [businessData, setBusinessData] = useState<BusinessData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBusinessStatus()
    // Update every 30 seconds
    const interval = setInterval(fetchBusinessStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchBusinessStatus = async () => {
    try {
      // TODO: Replace with actual API call to check wildrosepainters.ca status
      // For now, using mock data
      const mockData: BusinessData = {
        isOnline: true,
        activeUsers: Math.floor(Math.random() * 25) + 5, // 5-30 users
        totalVisitors: 1240 + Math.floor(Math.random() * 100),
        lastUpdated: new Date().toISOString(),
        status: "operational"
      }
      
      setBusinessData(mockData)
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to fetch business status:", error)
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "text-green-400"
      case "maintenance": return "text-yellow-400"
      case "offline": return "text-red-400"
      default: return "text-gray-400"
    }
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case "operational": return "bg-green-400"
      case "maintenance": return "bg-yellow-400"
      case "offline": return "bg-red-400"
      default: return "bg-gray-400"
    }
  }

  if (isLoading) {
    return (
      <GlassCard className={cn("p-4", className)}>
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-white/20 rounded-full animate-pulse" />
          <div className="h-4 bg-white/20 rounded animate-pulse flex-1" />
          <div className="w-4 h-4 bg-white/20 rounded animate-pulse" />
        </div>
      </GlassCard>
    )
  }

  if (!businessData) {
    return (
      <GlassCard className={cn("p-4", className)}>
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
          <span className="text-white/70 text-sm">Business status unavailable</span>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className={cn("overflow-hidden transition-all duration-300", className)}>
      {/* Collapsed Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className={cn("w-3 h-3 rounded-full animate-pulse", getStatusDot(businessData.status))} />
          <div className="flex items-center space-x-2">
            <span className="text-white font-medium text-sm">Wildrose Painters</span>
            <span className={cn("text-xs capitalize", getStatusColor(businessData.status))}>
              {businessData.status}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-white/60">
            <Users className="w-3 h-3" />
            <span className="text-xs">{businessData.activeUsers}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <a
            href="https://wildrosepainters.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 hover:bg-white/10 rounded transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3 h-3 text-white/60" />
          </a>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-white/60" />
          ) : (
            <ChevronDown className="w-4 h-4 text-white/60" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-white/70 text-xs">Live Users</span>
              </div>
              <div className="text-white font-semibold text-lg">
                {businessData.activeUsers}
              </div>
              <div className="text-white/50 text-xs">Currently browsing</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-white/70 text-xs">Total Visitors</span>
              </div>
              <div className="text-white font-semibold text-lg">
                {businessData.totalVisitors.toLocaleString()}
              </div>
              <div className="text-white/50 text-xs">This month</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-white/70 text-xs">Website Status</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={cn("w-2 h-2 rounded-full", getStatusDot(businessData.status))} />
                <span className={cn("text-sm capitalize font-medium", getStatusColor(businessData.status))}>
                  {businessData.status}
                </span>
              </div>
              <span className="text-white/50 text-xs">
                Updated {new Date(businessData.lastUpdated).toLocaleTimeString()}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <a
              href="https://wildrosepainters.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-white text-xs font-medium px-3 py-2 rounded-lg transition-all duration-200 text-center"
            >
              Visit Website
            </a>
            <a
              href="https://www.wildrosepainters.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-2 rounded-lg transition-all duration-200 text-center"
            >
              www. Version
            </a>
          </div>
        </div>
      )}
    </GlassCard>
  )
}