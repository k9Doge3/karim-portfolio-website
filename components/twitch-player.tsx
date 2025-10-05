"use client"
import { useState, useEffect } from "react"
import { Twitch, Users, Eye, Calendar, ExternalLink, Radio, VideoIcon } from "lucide-react"
import { GlassCard } from "./glass-card"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface TwitchStream {
  id: string
  user_name: string
  user_login: string
  game_name: string
  title: string
  viewer_count: number
  started_at: string
  thumbnail_url: string
  is_mature: boolean
}

interface TwitchChannel {
  id: string
  login: string
  display_name: string
  description: string
  profile_image_url: string
  offline_image_url: string
  view_count: number
  follower_count: number
  created_at: string
}

interface TwitchActivity {
  is_live: boolean
  stream?: TwitchStream
  channel: TwitchChannel
  recent_streams: Array<{
    title: string
    game_name: string
    duration: string
    date: string
  }>
}

interface TwitchPlayerProps {
  className?: string
}

export function TwitchPlayer({ className }: TwitchPlayerProps) {
  const [twitchData, setTwitchData] = useState<TwitchActivity | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mock data for demo - replace with actual Twitch API integration
  const mockTwitchData: TwitchActivity = {
    is_live: true,
    stream: {
      id: "123456789",
      user_name: "Karim",
      user_login: "karim",
      game_name: "Counter-Strike 2",
      title: "Grinding CS2 Competitive | Road to Global Elite",
      viewer_count: 127,
      started_at: "2025-10-04T15:30:00Z",
      thumbnail_url: "/placeholder.jpg",
      is_mature: false,
    },
    channel: {
      id: "123456789",
      login: "karim",
      display_name: "Karim",
      description: "Gaming and chill streams",
      profile_image_url: "/placeholder-user.jpg",
      offline_image_url: "/placeholder.jpg",
      view_count: 15420,
      follower_count: 1234,
      created_at: "2022-01-01T00:00:00Z",
    },
    recent_streams: [
      {
        title: "CS2 Competitive Grind",
        game_name: "Counter-Strike 2",
        duration: "3h 45m",
        date: "2025-10-03",
      },
      {
        title: "Dota 2 Ranked Games",
        game_name: "Dota 2",
        duration: "2h 30m",
        date: "2025-10-02",
      },
      {
        title: "Variety Gaming Night",
        game_name: "Just Chatting",
        duration: "4h 15m",
        date: "2025-10-01",
      },
    ],
  }

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setTwitchData(mockTwitchData)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const formatViewers = (count: number) => {
    if (count < 1000) return count.toString()
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`
    return `${(count / 1000000).toFixed(1)}M`
  }

  const getStreamDuration = (startTime: string) => {
    const start = new Date(startTime)
    const now = new Date()
    const diffMs = now.getTime() - start.getTime()
    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
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
          <div className="h-20 bg-white/10 rounded animate-pulse"></div>
        </div>
      </GlassCard>
    )
  }

  if (error || !twitchData) {
    return (
      <GlassCard variant="default" size="md" className={cn("w-full", className)}>
        <div className="flex items-center gap-4 text-white/60">
          <Twitch className="w-8 h-8" />
          <div>
            <p className="font-medium">Twitch unavailable</p>
            <p className="text-sm">Connect Twitch to see streaming activity</p>
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
          <Twitch className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-medium text-white/80">Twitch Activity</span>
          {twitchData.is_live && (
            <div className="flex items-center gap-1 px-2 py-1 bg-red-500/20 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-red-400">LIVE</span>
            </div>
          )}
        </div>

        {/* Live Stream */}
        {twitchData.is_live && twitchData.stream && (
          <div className="space-y-3">
            <div className="relative overflow-hidden rounded-lg bg-white/5">
              <div className="aspect-video relative">
                <Image
                  src="/placeholder.jpg"
                  alt="Stream thumbnail"
                  width={400}
                  height={225}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-semibold text-white text-sm line-clamp-2 mb-1">
                    {twitchData.stream.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-white/80">
                    <span className="bg-purple-500/20 px-2 py-1 rounded text-purple-300">
                      {twitchData.stream.game_name}
                    </span>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {formatViewers(twitchData.stream.viewer_count)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Radio className="w-3 h-3" />
                      {getStreamDuration(twitchData.stream.started_at)}
                    </div>
                  </div>
                </div>
                <a
                  href={`https://twitch.tv/${twitchData.channel.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Watch on Twitch"
                  className="absolute top-3 right-3 text-white/60 hover:text-purple-400 transition-colors p-2 rounded-lg bg-black/40 hover:bg-black/60"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Channel Info */}
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10">
            <Image
              src="/placeholder-user.jpg"
              alt="Profile"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white">{twitchData.channel.display_name}</p>
            <p className="text-xs text-white/60">{twitchData.channel.description}</p>
          </div>
          <a
            href={`https://twitch.tv/${twitchData.channel.login}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Visit Twitch Channel"
            className="text-white/60 hover:text-purple-400 transition-colors p-1 rounded hover:bg-white/10"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Recent Streams */}
        {!twitchData.is_live && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white/80 flex items-center gap-2">
              <VideoIcon className="w-4 h-4" />
              Recent Streams
            </h4>
            <div className="space-y-2">
              {twitchData.recent_streams.slice(0, 3).map((stream, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center">
                    <VideoIcon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{stream.title}</p>
                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <span>{stream.game_name}</span>
                      <span>{stream.duration}</span>
                      <span>{stream.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Channel Stats */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
          <div className="text-center p-2">
            <div className="text-lg font-bold text-white">{formatViewers(twitchData.channel.follower_count)}</div>
            <div className="text-xs text-white/60">Followers</div>
          </div>
          <div className="text-center p-2">
            <div className="text-lg font-bold text-white">{formatViewers(twitchData.channel.view_count)}</div>
            <div className="text-xs text-white/60">Total Views</div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}