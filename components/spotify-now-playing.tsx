"use client"

import { useEffect, useState } from "react"
import { Music, Pause, Play } from "lucide-react"
import { GlassCard } from "./glass-card"
import Image from "next/image"

interface SpotifyTrack {
  isPlaying: boolean
  title: string
  artist: string
  album: string
  albumImageUrl: string
  songUrl: string
}

export function SpotifyNowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This would connect to Spotify API in production
    // For now, showing a demo state
    const demoTrack: SpotifyTrack = {
      isPlaying: true,
      title: "Connect Spotify",
      artist: "Add your Spotify credentials to see what you're listening to",
      album: "Demo Album",
      albumImageUrl: "/abstract-music-album.png",
      songUrl: "#",
    }

    setTrack(demoTrack)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <GlassCard variant="accent" size="sm" className="animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-white/10 rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-white/10 rounded mb-2"></div>
            <div className="h-3 bg-white/10 rounded w-2/3"></div>
          </div>
        </div>
      </GlassCard>
    )
  }

  if (!track) {
    return null
  }

  return (
    <GlassCard variant="accent" size="sm" className="group hover:scale-105 transition-all duration-300">
      <a href={track.songUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <Image
            src={track.albumImageUrl || "/placeholder.svg"}
            alt={`${track.album} cover`}
            width={64}
            height={64}
            className="w-16 h-16 rounded"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {track.isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Music className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="text-xs text-white/60">{track.isPlaying ? "Now Playing" : "Last Played"}</span>
          </div>
          <p className="text-sm font-semibold text-white truncate">{track.title}</p>
          <p className="text-xs text-white/70 truncate">{track.artist}</p>
        </div>
      </a>
    </GlassCard>
  )
}
