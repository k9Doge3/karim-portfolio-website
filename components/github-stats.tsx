"use client"

import { useEffect, useState } from "react"
import { GlassCard } from "./glass-card"
import { Github, Star, GitFork, Code, TrendingUp } from "lucide-react"

interface GitHubRepo {
  name: string
  description: string
  stars: number
  forks: number
  language: string
  url: string
  updated?: string
}

interface GitHubStats {
  username: string
  name: string
  bio?: string
  avatar: string
  followers: number
  following: number
  publicRepos: number
  totalStars: number
  totalForks: number
  recentRepos: GitHubRepo[]
  profileUrl: string
  company?: string
  location?: string
  blog?: string
  createdAt: string
}

export function GitHubStats({ username = "kyriakos-paul" }: { username?: string }) {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGitHubStats()
  }, [username])

  const fetchGitHubStats = async () => {
    try {
      setError(null)
      setLoading(true)
      
      // Fetch real GitHub data from our API
      const response = await fetch(`/api/github/stats?username=${username}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub stats')
      }
      
      const data = await response.json()
      setStats(data)
    } catch (err) {
      console.error('GitHub stats fetch error:', err)
      setError(err instanceof Error ? err.message : 'Failed to load GitHub stats')
      // The API endpoint handles fallback data, so we should still get data
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <GlassCard key={i} variant="accent" size="md" className="animate-pulse">
              <div className="h-20 bg-white/10 rounded"></div>
            </GlassCard>
          ))}
        </div>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      TypeScript: "from-blue-500 to-cyan-500",
      JavaScript: "from-yellow-500 to-orange-500",
      Python: "from-green-500 to-emerald-500",
      HTML: "from-red-500 to-pink-500",
      CSS: "from-purple-500 to-pink-500",
    }
    return colors[language] || "from-gray-500 to-gray-600"
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard variant="accent" size="md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/60 text-sm mb-1">Total Repositories</p>
              <p className="text-3xl font-bold text-white">{stats.publicRepos}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-500/20">
              <Github size={24} className="text-blue-400" />
            </div>
          </div>
        </GlassCard>

        <GlassCard variant="accent" size="md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/60 text-sm mb-1">Total Stars</p>
              <p className="text-3xl font-bold text-white">{stats.totalStars}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-500/20">
              <Star size={24} className="text-yellow-400" />
            </div>
          </div>
        </GlassCard>

        <GlassCard variant="accent" size="md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/60 text-sm mb-1">Total Forks</p>
              <p className="text-3xl font-bold text-white">{stats.totalForks}</p>
            </div>
            <div className="p-3 rounded-full bg-green-500/20">
              <GitFork size={24} className="text-green-400" />
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <GlassCard variant="accent" size="lg">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Code size={20} />
            Profile Stats
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-white/80">Followers</span>
              <span className="text-white font-semibold">{stats.followers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">Following</span>
              <span className="text-white font-semibold">{stats.following}</span>
            </div>
            {stats.company && (
              <div className="flex justify-between">
                <span className="text-white/80">Company</span>
                <span className="text-white font-semibold">{stats.company}</span>
              </div>
            )}
            {stats.location && (
              <div className="flex justify-between">
                <span className="text-white/80">Location</span>
                <span className="text-white font-semibold">{stats.location}</span>
              </div>
            )}
            {stats.bio && (
              <div className="pt-2">
                <span className="text-white/80 text-sm">{stats.bio}</span>
              </div>
            )}
          </div>
        </GlassCard>        {/* Recent Activity */}
        <GlassCard variant="default" size="lg">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <TrendingUp size={20} />
            Recent Repositories
          </h3>
          <div className="space-y-4">
            {stats.recentRepos.map((repo, index) => (
              <a
                key={index}
                href={repo.url || `https://github.com/${username}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-medium">{repo.name}</h4>
                  <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded">{repo.language}</span>
                </div>
                <p className="text-white/70 text-sm mb-3">{repo.description}</p>
                <div className="flex items-center gap-4 text-xs text-white/60">
                  <span className="flex items-center gap-1">
                    <Star size={12} />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={12} />
                    {repo.forks}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
