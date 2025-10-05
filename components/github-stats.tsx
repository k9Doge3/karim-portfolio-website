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
}

interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  topLanguages: { name: string; count: number }[]
  recentRepos: GitHubRepo[]
}

export function GitHubStats({ username = "kyriakos-paul" }: { username?: string }) {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Demo data - in production, this would fetch from GitHub API
    const demoStats: GitHubStats = {
      totalRepos: 24,
      totalStars: 156,
      totalForks: 42,
      topLanguages: [
        { name: "TypeScript", count: 12 },
        { name: "JavaScript", count: 8 },
        { name: "Python", count: 3 },
        { name: "HTML", count: 1 },
      ],
      recentRepos: [
        {
          name: "portfolio-website",
          description: "Professional portfolio website with Next.js and TypeScript",
          stars: 45,
          forks: 12,
          language: "TypeScript",
          url: "https://github.com/kyriakos-paul/portfolio-website",
        },
        {
          name: "financial-dashboard",
          description: "Financial analytics dashboard with Power BI integration",
          stars: 32,
          forks: 8,
          language: "JavaScript",
        },
        {
          name: "accounting-tools",
          description: "Collection of accounting automation tools and scripts",
          stars: 28,
          forks: 6,
          language: "Python",
          url: "https://github.com/kyriakos-paul/accounting-tools",
        },
        {
          name: "wildrose-painters",
          description: "Business website for painting contracting services",
          stars: 18,
          forks: 4,
          language: "TypeScript",
          url: "https://github.com/kyriakos-paul/wildrose-painters",
        },
      ],
    }

    setTimeout(() => {
      setStats(demoStats)
      setLoading(false)
    }, 500)
  }, [username])

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
              <p className="text-3xl font-bold text-white">{stats.totalRepos}</p>
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
        {/* Top Languages */}
        <GlassCard variant="default" size="lg">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Code size={20} />
            Top Languages
          </h3>
          <div className="space-y-4">
            {stats.topLanguages.map((lang, index) => {
              const maxCount = Math.max(...stats.topLanguages.map((l) => l.count))
              const percentage = (lang.count / maxCount) * 100
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/80">{lang.name}</span>
                    <span className="text-white/60">{lang.count} repos</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${getLanguageColor(lang.name)} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>

        {/* Recent Activity */}
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
