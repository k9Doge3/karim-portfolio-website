"use client"
import { useState, useEffect } from "react"
import { Music, Play, Pause, Volume2, ExternalLink } from "lucide-react"
import { GlassCard } from "./glass-card"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface SpotifyTrack {
  isPlaying: boolean
  track: {
    name: string
    artist: string
    album: string
    image: string
    url: string
    duration?: number
    progress?: number
  } | null
  playedAt?: string
}

interface SpotifyPlayerProps {
  className?: string
}

export function SpotifyPlayer({ className }: SpotifyPlayerProps) {
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mock data for demo - replace with actual Spotify API integration
  const mockTrack: SpotifyTrack = {
    is_playing: true,
    item: {
      name: "Bohemian Rhapsody",
      artists: [{ name: "Queen" }],
      album: {
        name: "A Night at the Opera",
        images: [
          {
            url: "/placeholder.jpg",
            height: 640,
            width: 640,
          },
        ],
      },
      external_urls: {
        spotify: "https://open.spotify.com",
      },
      duration_ms: 354000,
    },
    progress_ms: 123000,
  }

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setCurrentTrack(mockTrack)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const progressPercentage = currentTrack
    ? (currentTrack.progress_ms / currentTrack.item.duration_ms) * 100
    : 0

  if (isLoading) {
    return (
      <GlassCard variant="default" size="md" className={cn("w-full", className)}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/10 rounded-lg animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/10 rounded animate-pulse"></div>
            <div className="h-3 bg-white/10 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>
      </GlassCard>
    )
  }

  if (error || !currentTrack) {
    return (
      <GlassCard variant="default" size="md" className={cn("w-full", className)}>
        <div className="flex items-center gap-4 text-white/60">
          <Music className="w-8 h-8" />
          <div>
            <p className="font-medium">Not currently playing</p>
            <p className="text-sm">Connect Spotify to see your music</p>
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
          <Music className="w-5 h-5 text-green-400" />
          <span className="text-sm font-medium text-white/80">Now Playing on Spotify</span>
          {currentTrack.is_playing && (
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-green-400 animate-pulse"></div>
              <div className="w-1 h-4 bg-green-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-1 h-4 bg-green-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white/10">
            <Image
              src={currentTrack.item.album.images[0]?.url || "/placeholder.jpg"}
              alt={currentTrack.item.album.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              {currentTrack.is_playing ? (
                <Play className="w-6 h-6 text-white" />
              ) : (
                <Pause className="w-6 h-6 text-white" />
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{currentTrack.item.name}</h3>
            <p className="text-white/70 text-sm truncate">
              {currentTrack.item.artists.map((artist) => artist.name).join(", ")}
            </p>
            <p className="text-white/50 text-xs truncate">{currentTrack.item.album.name}</p>
          </div>

          <a
            href={currentTrack.item.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-green-400 transition-colors p-2 rounded-lg hover:bg-white/10"
            title="Open in Spotify"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-white/10 rounded-full h-1">
            <div
              className="bg-green-400 h-1 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-white/50">
            <span>{formatTime(currentTrack.progress_ms)}</span>
            <span>{formatTime(currentTrack.item.duration_ms)}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}