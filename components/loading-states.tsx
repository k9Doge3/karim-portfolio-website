import type React from "react"
import { Loader2, Sparkles, Calendar, FolderOpen, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return <Loader2 className={`animate-spin text-purple-400 ${sizeClasses[size]} ${className}`} />
}

export function FullPageLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="h-10 w-10 text-purple-400 animate-pulse" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <LoadingSpinner size="lg" />
          <p className="text-slate-300 text-lg">{message}</p>
        </div>
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-xl bg-slate-700/50" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32 bg-slate-700/50" />
            <Skeleton className="h-4 w-48 bg-slate-700/50" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full bg-slate-700/50" />
          <Skeleton className="h-4 w-3/4 bg-slate-700/50" />
          <Skeleton className="h-10 w-full bg-slate-700/50" />
        </div>
      </CardContent>
    </Card>
  )
}

export function CalendarSkeleton() {
  return (
    <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
            <Calendar className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-white">Loading Calendar...</CardTitle>
            <CardDescription className="text-slate-300">Fetching your events and schedule</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {Array.from({ length: 35 }).map((_, i) => (
            <Skeleton key={i} className="h-10 bg-slate-700/50" />
          ))}
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-slate-700/50" />
          <Skeleton className="h-4 w-2/3 bg-slate-700/50" />
        </div>
      </CardContent>
    </Card>
  )
}

export function FileManagerSkeleton() {
  return (
    <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center">
            <FolderOpen className="h-6 w-6 text-orange-400" />
          </div>
          <div>
            <CardTitle className="text-white">Loading Files...</CardTitle>
            <CardDescription className="text-slate-300">Fetching your file library</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-700/50">
              <Skeleton className="w-8 h-8 bg-slate-700/50" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-32 bg-slate-700/50" />
                <Skeleton className="h-3 w-20 bg-slate-700/50" />
              </div>
              <Skeleton className="w-16 h-6 bg-slate-700/50" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-6">
        <div className="flex justify-center items-center gap-3">
          <Skeleton className="w-6 h-6 bg-slate-700/50" />
          <Skeleton className="h-12 w-64 bg-slate-700/50" />
          <Skeleton className="w-6 h-6 bg-slate-700/50" />
        </div>
        <Skeleton className="h-6 w-96 mx-auto bg-slate-700/50" />
      </div>

      <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-6 w-32 bg-slate-700/50" />
                <Skeleton className="h-4 w-48 bg-slate-700/50" />
              </div>
            </div>
            <Skeleton className="w-24 h-10 bg-slate-700/50" />
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

interface LoadingOverlayProps {
  isLoading: boolean
  message?: string
  children: React.ReactNode
}

export function LoadingOverlay({ isLoading, message = "Loading...", children }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
          <div className="text-center space-y-3">
            <LoadingSpinner size="lg" />
            <p className="text-slate-300">{message}</p>
          </div>
        </div>
      )}
    </div>
  )
}
