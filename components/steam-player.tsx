"use client"
import { useState, useEffect } from "react"
import { Gamepad2, Clock, Trophy, Users, ExternalLink, Zap } from "lucide-react"
import { GlassCard } from "./glass-card"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface SteamGame {
  appid: number
  name: string
  playtime_forever: number
  playtime_2weeks?: number
  img_icon_url: string
  img_logo_url: string
}

interface SteamActivity {
  steamid: string
  personaname: string
  profileurl: string
  avatar: string
  personastate: number // 0=offline, 1=online, 2=busy, 3=away, 4=snooze, 5=looking to trade, 6=looking to play
  gameextrainfo?: string // Current game name
  gameid?: string
  recent_games: SteamGame[]
  total_games: number
}

interface SteamPlayerProps {
  className?: string
}

export function SteamPlayer({ className }: SteamPlayerProps) {
  const [steamData, setSteamData] = useState<SteamActivity | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mock data for demo - replace with actual Steam API integration
  const mockSteamData: SteamActivity = {
    steamid: "76561198000000000",
    personaname: "Karim",
    profileurl: "https://steamcommunity.com/id/karim",
    avatar: "/placeholder-user.jpg",
    personastate: 1, // Online
    gameextrainfo: "Counter-Strike 2",
    gameid: "730",
    recent_games: [
      {
        appid: 730,
        name: "Counter-Strike 2",
        playtime_forever: 1250,
        playtime_2weeks: 45,
        img_icon_url: "placeholder",
        img_logo_url: "placeholder",
      },
      {
        appid: 570,
        name: "Dota 2",
        playtime_forever: 890,
        playtime_2weeks: 23,
        img_icon_url: "placeholder",
        img_logo_url: "placeholder",
      },
      {
        appid: 271590,
        name: "Grand Theft Auto V",
        playtime_forever: 456,
        playtime_2weeks: 12,
        img_icon_url: "placeholder",
        img_logo_url: "placeholder",
      },
    ],
    total_games: 127,
  }

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setSteamData(mockSteamData)
      setIsLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  const formatPlaytime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    if (hours < 1) return `${minutes}m`
    if (hours < 100) return `${hours}h ${minutes % 60}m`
    return `${hours}h`
  }

  const getStatusColor = (state: number) => {
    switch (state) {
      case 1:
        return "text-green-400 bg-green-400/20"
      case 2:
        return "text-red-400 bg-red-400/20"
      case 3:
        return "text-yellow-400 bg-yellow-400/20"
      default:
        return "text-gray-400 bg-gray-400/20"
    }
  }

  const getStatusText = (state: number) => {
    switch (state) {
      case 1:
        return "Online"
      case 2:
        return "Busy"
      case 3:
        return "Away"
      default:
        return "Offline"
    }
  }

  if (isLoading) {
    return (
      <GlassCard variant="default" size="md" className={cn("w-full", className)}>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-lg animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/10 rounded animate-pulse"></div>
              <div className="h-3 bg-white/10 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-white/10 rounded animate-pulse"></div>
            <div className="h-3 bg-white/10 rounded animate-pulse"></div>
          </div>
        </div>
      </GlassCard>
    )
  }

  if (error || !steamData) {
    return (
      <GlassCard variant="default" size="md" className={cn("w-full", className)}>
        <div className="flex items-center gap-4 text-white/60">
          <Gamepad2 className="w-8 h-8" />
          <div>
            <p className="font-medium">Steam unavailable</p>
            <p className="text-sm">Connect Steam to see gaming activity</p>
          </div>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard variant="default" size="md" className={cn("w-full", className)}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-medium text-white/80">Steam Gaming Activity</span>
          <div className={cn("px-2 py-1 rounded-full text-xs font-medium", getStatusColor(steamData.personastate))}>
            {getStatusText(steamData.personastate)}
          </div>
        </div>

        {/* Currently Playing */}
        {steamData.gameextrainfo && (
          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white/80">Currently Playing</p>
                <p className="text-white font-semibold">{steamData.gameextrainfo}</p>
              </div>
              <a
                href={steamData.profileurl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-blue-400 transition-colors p-1 rounded hover:bg-white/10"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Recent Games */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white/80 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recent Games
          </h4>
          <div className="space-y-2">
            {steamData.recent_games.slice(0, 3).map((game) => (
              <div key={game.appid} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-white/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{game.name}</p>
                  <div className="flex items-center gap-3 text-xs text-white/60">
                    <span>{formatPlaytime(game.playtime_forever)} total</span>
                    {game.playtime_2weeks && <span>{formatPlaytime(game.playtime_2weeks)} past 2 weeks</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Game Library Stats */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
          <div className="text-center p-2">
            <div className="text-lg font-bold text-white">{steamData.total_games}</div>
            <div className="text-xs text-white/60">Games Owned</div>
          </div>
          <div className="text-center p-2">
            <div className="text-lg font-bold text-white">{steamData.recent_games.length}</div>
            <div className="text-xs text-white/60">Recently Played</div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}