"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/glass-card"
import { createBrowserClient } from "@supabase/ssr"
import { UserPlus, Check, X, UsersIcon, Shield, Crown, Eye, Sparkles, Clock, Activity } from "lucide-react"

type UserRole = "owner" | "admin" | "personal_access" | "guest" | "public"

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  created_at: string
  updated_at: string
  last_sign_in_at: string | null
}

const roleIcons = {
  owner: Crown,
  admin: Shield,
  personal_access: Eye,
  guest: Sparkles,
  public: UsersIcon,
}

const roleColors = {
  owner: "text-yellow-400",
  admin: "text-blue-400",
  personal_access: "text-green-400",
  guest: "text-teal-400",
  public: "text-gray-400",
}

const roleLabels = {
  owner: "Owner",
  admin: "Admin",
  personal_access: "Personal Access",
  guest: "Guest",
  public: "Public",
}

export function UserManagement() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole>("personal_access")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    loadUsers()
    // Refresh user list every 30 seconds to show activity
    const interval = setInterval(loadUsers, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    const { data, error } = await supabase.from("user_profiles").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error loading users:", error)
    } else {
      setUsers(data || [])
    }
    setLoading(false)
  }

  const handleUpdateRole = async (userId: string, newRole: UserRole) => {
    setActionLoading(true)
    setMessage(null)

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    const { error } = await supabase
      .from("user_profiles")
      .update({ role: newRole, updated_at: new Date().toISOString() })
      .eq("id", userId)

    if (error) {
      setMessage({ type: "error", text: `Error updating role: ${error.message}` })
    } else {
      setMessage({ type: "success", text: "Role updated successfully" })
      loadUsers()
    }

    setActionLoading(false)
  }

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setActionLoading(true)
    setMessage(null)

    // Note: This requires the user to sign up first
    // In a production app, you might want to send an invitation email
    setMessage({
      type: "error",
      text: "User must sign up first. Once they create an account, you can update their role here.",
    })

    setActionLoading(false)
  }

  const formatLastSeen = (lastSignIn: string | null) => {
    if (!lastSignIn) return "Never"

    const date = new Date(lastSignIn)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 5) return "Online now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const isOnline = (lastSignIn: string | null) => {
    if (!lastSignIn) return false
    const diffMs = new Date().getTime() - new Date(lastSignIn).getTime()
    return diffMs < 300000 // Online if active in last 5 minutes
  }

  if (loading) {
    return (
      <GlassCard variant="default" size="md">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      </GlassCard>
    )
  }

  return (
    <div className="space-y-6">
      {/* Invite User Form */}
      <GlassCard variant="default" size="md">
        <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
          <UserPlus size={24} />
          Invite User
        </h3>

        <form onSubmit={handleInviteUser} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-white/80 mb-2">
              User Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-white/80 mb-2">
              Role
            </label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
            >
              <option value="personal_access">Personal Access</option>
              <option value="guest">Guest</option>
              <option value="admin">Admin</option>
              <option value="public">Public</option>
            </select>
            <p className="text-white/60 text-sm mt-2">
              Note: Users must sign up first before you can grant them access
            </p>
          </div>

          {message && (
            <div
              className={`flex items-center gap-2 p-3 rounded-lg ${
                message.type === "success" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
              }`}
            >
              {message.type === "success" ? <Check size={20} /> : <X size={20} />}
              <span>{message.text}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={actionLoading}
            className="w-full bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed px-6 py-3 rounded-lg transition-colors text-white font-medium"
          >
            {actionLoading ? "Processing..." : "Send Invitation"}
          </button>
        </form>
      </GlassCard>

      {/* Users List */}
      <GlassCard variant="default" size="md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <UsersIcon size={24} />
            Manage Users ({users.length})
          </h3>
          <button
            onClick={loadUsers}
            disabled={loading}
            className="text-white/60 hover:text-white transition-colors disabled:opacity-50"
            title="Refresh user list"
          >
            <Activity size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="space-y-3">
          {users.map((user) => {
            const RoleIcon = roleIcons[user.role]
            const online = isOnline(user.last_sign_in_at)

            return (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {online && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Online now" />}
                    <p className="text-white font-medium">{user.email}</p>
                    <div className={`flex items-center gap-1 ${roleColors[user.role]}`}>
                      <RoleIcon size={16} />
                      <span className="text-sm">{roleLabels[user.role]}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    {user.full_name && <span>{user.full_name}</span>}
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {formatLastSeen(user.last_sign_in_at)}
                    </span>
                  </div>
                </div>

                {user.role !== "owner" && (
                  <select
                    value={user.role}
                    onChange={(e) => handleUpdateRole(user.id, e.target.value as UserRole)}
                    disabled={actionLoading}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-white/40 disabled:opacity-50"
                  >
                    <option value="public">Public</option>
                    <option value="guest">Guest</option>
                    <option value="personal_access">Personal Access</option>
                    <option value="admin">Admin</option>
                  </select>
                )}
              </div>
            )
          })}

          {users.length === 0 && (
            <p className="text-white/60 text-center py-8">No users found. Invite someone to get started!</p>
          )}
        </div>
      </GlassCard>
    </div>
  )
}
