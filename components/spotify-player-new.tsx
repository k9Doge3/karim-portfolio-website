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

  useEffect(() => {
    fetchCurrentTrack()
    // Refresh every 30 seconds
    const interval = setInterval(fetchCurrentTrack, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchCurrentTrack = async () => {
    try {
      setError(null)
      const response = await fetch('/api/spotify/now-playing')
      
      if (!response.ok) {
        throw new Error('Failed to fetch Spotify data')
      }
      
      const data = await response.json()
      
      if (data.error) {
        setError(data.error)
      } else {
        setCurrentTrack(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Spotify data')
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (ms?: number) => {
    if (!ms) return "0:00"
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercentage = currentTrack?.track?.duration && currentTrack?.track?.progress
    ? (currentTrack.track.progress / currentTrack.track.duration) * 100
    : 0

  if (isLoading) {
    return (
      <GlassCard className={cn("p-6", className)}>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/10 rounded-lg animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/10 rounded animate-pulse" />
            <div className="h-3 bg-white/10 rounded w-3/4 animate-pulse" />
          </div>
        </div>
      </GlassCard>
    )
  }

  if (error) {
    return (
      <GlassCard className={cn("p-6", className)}>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center">
            <Music className="w-8 h-8 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white">Spotify Error</h3>
            <p className="text-white/70 text-sm">{error}</p>
            <p className="text-white/50 text-xs mt-1">
              {error.includes('refresh token') ? (
                <>Visit <a href="/api/spotify/auth" className="underline text-green-400">/api/spotify/auth</a> to set up</>
              ) : (
                'Check your API configuration'
              )}
            </p>
          </div>
        </div>
      </GlassCard>
    )
  }

  if (!currentTrack?.track) {
    return (
      <GlassCard className={cn("p-6", className)}>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
            <Music className="w-8 h-8 text-white/50" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white">No music playing</h3>
            <p className="text-white/70 text-sm">Start playing something on Spotify!</p>
          </div>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className={cn("p-6", className)}>
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 bg-white/10 rounded-lg overflow-hidden">
            <Image
              src={currentTrack.track.image || "/placeholder.jpg"}
              alt={currentTrack.track.album}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            {currentTrack.isPlaying ? (
              <Pause className="w-3 h-3 text-white" />
            ) : (
              <Play className="w-3 h-3 text-white" />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{currentTrack.track.name}</h3>
          <p className="text-white/70 text-sm truncate">{currentTrack.track.artist}</p>
          <p className="text-white/50 text-xs truncate">{currentTrack.track.album}</p>
        </div>

        <a
          href={currentTrack.track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-white/70" />
        </a>
      </div>

      {currentTrack.track.duration && currentTrack.track.progress && (
        <div className="space-y-2">
          <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-green-400 transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/50">
            <span>{formatTime(currentTrack.track.progress)}</span>
            <span>{formatTime(currentTrack.track.duration)}</span>
          </div>
        </div>
      )}

      {!currentTrack.isPlaying && currentTrack.playedAt && (
        <p className="text-white/40 text-xs mt-2">
          Last played: {new Date(currentTrack.playedAt).toLocaleTimeString()}
        </p>
      )}

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
        <div className="flex items-center space-x-2">
          <Music className="w-4 h-4 text-green-400" />
          <span className="text-white/70 text-sm">Spotify</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Volume2 className="w-4 h-4 text-white/50" />
          {currentTrack.isPlaying && (
            <div className="flex items-center space-x-1 ml-2">
              <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" />
              <div className="w-1 h-4 bg-green-400 rounded-full animate-pulse delay-100" />
              <div className="w-1 h-2 bg-green-400 rounded-full animate-pulse delay-200" />
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  )
}