import { StarField } from "@/components/star-field"
import { Navigation } from "@/components/navigation"
import { GitHubStats } from "@/components/github-stats"
import { Github } from "lucide-react"

export default function GitHubPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <StarField mousePosition={{ x: 0, y: 0 }} speed={0.8} hyperspaceMode={false} starCount={600} />

      <Navigation />

      <main className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-white/10">
                <Github size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              GitHub Statistics
            </h1>
            <p className="text-white/70 text-lg mb-6">Explore my open source contributions and development activity</p>
            <a
              href="https://github.com/kyriakos-paul"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-colors"
            >
              <Github size={20} />
              <span>View GitHub Profile</span>
            </a>
          </div>

          <GitHubStats username="kyriakos-paul" />
        </div>
      </main>
    </div>
  )
}
