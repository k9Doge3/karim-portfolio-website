"use client"
import { useState, useEffect } from "react"
import { Video, Heart, Eye, Calendar, ExternalLink, TrendingUp, Users } from "lucide-react"
import { GlassCard } from "./glass-card"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface TikTokVideo {
  id: string
  title: string
  view_count: number
  like_count: number
  comment_count: number
  share_count: number
  create_time: string
  cover_image_url: string
  web_video_url: string
  duration: number
}

interface TikTokProfile {
  username: string
  display_name: string
  follower_count: number
  following_count: number
  likes_count: number
  video_count: number
  avatar_url: string
  bio: string
  verified: boolean
}

interface TikTokActivity {
  profile: TikTokProfile
  recent_videos: TikTokVideo[]
  latest_video?: TikTokVideo
}

interface TikTokPlayerProps {
  className?: string
}

export function TikTokPlayer({ className }: TikTokPlayerProps) {
  const [tikTokData, setTikTokData] = useState<TikTokActivity | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mock data for demo - replace with actual TikTok API integration
  const mockData: TikTokActivity = {
    profile: {
      username: "yourhandle",
      display_name: "Your Name",
      follower_count: 12500,
      following_count: 890,
      likes_count: 156000,
      video_count: 45,
      avatar_url: "/placeholder-user.jpg",
      bio: "Creating content & sharing life ✨",
      verified: false
    },
    recent_videos: [
      {
        id: "1",
        title: "Day in my life as a developer 💻",
        view_count: 25400,
        like_count: 2100,
        comment_count: 156,
        share_count: 89,
        create_time: "2024-10-03T18:30:00Z",
        cover_image_url: "/placeholder.jpg",
        web_video_url: "https://tiktok.com/@user/video/123",
        duration: 60
      },
      {
        id: "2", 
        title: "Quick coding tips that changed everything",
        view_count: 18200,
        like_count: 1800,
        comment_count: 245,
        share_count: 156,
        create_time: "2024-10-01T14:20:00Z",
        cover_image_url: "/placeholder.jpg", 
        web_video_url: "https://tiktok.com/@user/video/124",
        duration: 45
      }
    ]
  }

  useEffect(() => {
    fetchTikTokData()
    // Refresh every 5 minutes
    const interval = setInterval(fetchTikTokData, 300000)
    return () => clearInterval(interval)
  }, [])

  const fetchTikTokData = async () => {
    try {
      setError(null)
      // For now, use mock data
      // TODO: Replace with actual API call to /api/tiktok/profile
      setTimeout(() => {
        setTikTokData(mockData)
        setIsLoading(false)
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load TikTok data')
      setIsLoading(false)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  if (isLoading) {
    return (
      <GlassCard className={cn("p-6", className)}>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/10 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/10 rounded animate-pulse" />
              <div className="h-3 bg-white/10 rounded w-2/3 animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 bg-white/10 rounded animate-pulse" />
            ))}
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
            <Video className="w-8 h-8 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white">TikTok Error</h3>
            <p className="text-white/70 text-sm">{error}</p>
            <p className="text-white/50 text-xs mt-1">Check your API configuration</p>
          </div>
        </div>
      </GlassCard>
    )
  }

  if (!tikTokData) {
    return (
      <GlassCard className={cn("p-6", className)}>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
            <Video className="w-8 h-8 text-white/50" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white">No TikTok data</h3>
            <p className="text-white/70 text-sm">Unable to load TikTok activity</p>
          </div>
        </div>
      </GlassCard>
    )
  }

  const latestVideo = tikTokData.recent_videos[0]

  return (
    <GlassCard className={cn("p-6", className)}>
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 bg-white/10 rounded-full overflow-hidden">
            <Image
              src={tikTokData.profile.avatar_url}
              alt={tikTokData.profile.display_name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          {tikTokData.profile.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">
            @{tikTokData.profile.username}
          </h3>
          <p className="text-white/70 text-sm truncate">
            {tikTokData.profile.display_name}
          </p>
          <p className="text-white/50 text-xs truncate">
            {tikTokData.profile.bio}
          </p>
        </div>

        <a
          href={`https://tiktok.com/@${tikTokData.profile.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          title="View TikTok Profile"
        >
          <ExternalLink className="w-4 h-4 text-white/70" />
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-white font-semibold">
            {formatNumber(tikTokData.profile.follower_count)}
          </div>
          <div className="text-white/50 text-xs">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-white font-semibold">
            {formatNumber(tikTokData.profile.likes_count)}
          </div>
          <div className="text-white/50 text-xs">Likes</div>
        </div>
        <div className="text-center">
          <div className="text-white font-semibold">
            {tikTokData.profile.video_count}
          </div>
          <div className="text-white/50 text-xs">Videos</div>
        </div>
      </div>

      {/* Latest Video */}
      {latestVideo && (
        <div className="space-y-4">
          <h4 className="text-white/70 text-sm font-medium">Latest Video</h4>
          
          <div className="bg-white/5 rounded-lg p-4 space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-16 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={latestVideo.cover_image_url}
                  alt="Video thumbnail"
                  width={48}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium line-clamp-2">
                  {latestVideo.title}
                </p>
                <p className="text-white/50 text-xs mt-1">
                  {formatTimeAgo(latestVideo.create_time)}
                </p>
              </div>

              <a
                href={latestVideo.web_video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-white/10 rounded transition-colors flex-shrink-0"
                title="Watch Video"
              >
                <ExternalLink className="w-4 h-4 text-white/70" />
              </a>
            </div>

            <div className="flex items-center justify-between text-xs text-white/50">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{formatNumber(latestVideo.view_count)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3" />
                  <span>{formatNumber(latestVideo.like_count)}</span>
                </div>
              </div>
              <span>{latestVideo.duration}s</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center space-x-2">
          <Video className="w-4 h-4 text-pink-400" />
          <span className="text-white/70 text-sm">TikTok</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <TrendingUp className="w-4 h-4 text-white/50" />
          <span className="text-white/50 text-xs">Creating content</span>
        </div>
      </div>
    </GlassCard>
  )
}