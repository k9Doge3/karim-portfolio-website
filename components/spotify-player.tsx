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
    isPlaying: true,
    track: {
      name: "As It Was",
      artist: "Harry Styles",
      album: "Harry's House",
      image: "/placeholder.jpg",
      url: "https://open.spotify.com",
      duration: 167000, // 2:47 in milliseconds
      progress: 67000   // 1:07 progress
    }
  }

  useEffect(() => {
    fetchSpotifyData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchSpotifyData, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchSpotifyData = async () => {
    try {
      setError(null)
      setIsLoading(true)
      
      // Fetch real Spotify data from our API
      const response = await fetch('/api/spotify/now-playing')
      
      if (!response.ok) {
        throw new Error('Failed to fetch Spotify data')
      }
      
      const data = await response.json()
      
      // Transform API response to component format
      if (data.track) {
        const transformedTrack: SpotifyTrack = {
          isPlaying: data.isPlaying || false,
          track: {
            name: data.track.name,
            artist: data.track.artist,
            album: data.track.album,
            image: data.track.image || "/placeholder.jpg",
            url: data.track.url || "https://open.spotify.com",
            duration: data.track.duration || 180000,
            progress: data.track.progress || 0
          }
        }
        setCurrentTrack(transformedTrack)
      } else {
        // No track playing or no data
        setCurrentTrack(mockTrack)
      }
    } catch (err) {
      console.error('Spotify data fetch error:', err)
      setError(err instanceof Error ? err.message : 'Failed to load Spotify data')
      // Use mock data as fallback
      setCurrentTrack(mockTrack)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const progressPercentage = currentTrack?.track
    ? ((currentTrack.track.progress || 0) / (currentTrack.track.duration || 1)) * 100
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
          {currentTrack.isPlaying && (
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-green-400 animate-pulse"></div>
              <div className="w-1 h-4 bg-green-400 animate-pulse [animation-delay:0.2s]"></div>
              <div className="w-1 h-4 bg-green-400 animate-pulse [animation-delay:0.4s]"></div>
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white/10">
            <Image
              src={currentTrack.track?.image || "/placeholder.jpg"}
              alt={currentTrack.track?.album || "Album cover"}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              {currentTrack.isPlaying ? (
                <Play className="w-6 h-6 text-white" />
              ) : (
                <Pause className="w-6 h-6 text-white" />
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{currentTrack.track?.name}</h3>
            <p className="text-white/70 text-sm truncate">
              {currentTrack.track?.artist}
            </p>
            <p className="text-white/50 text-xs truncate">{currentTrack.track?.album}</p>
          </div>

          <a
            href={currentTrack.track?.url || "https://open.spotify.com"}
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
            <span>{formatTime((currentTrack.track?.progress || 0) * 1000)}</span>
            <span>{formatTime((currentTrack.track?.duration || 0) * 1000)}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}