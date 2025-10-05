"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Wifi, Server, Shield, FileX } from "lucide-react"

interface ErrorFallbackProps {
  error: Error
  retry: () => void
}

export function NetworkErrorFallback({ error, retry }: ErrorFallbackProps) {
  return (
    <Card className="border-orange-500/30 bg-slate-900/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wifi className="h-8 w-8 text-orange-400" />
        </div>
        <CardTitle className="text-white">Connection Problem</CardTitle>
        <CardDescription className="text-slate-300">
          Unable to connect to the server. Please check your internet connection.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button onClick={retry} className="bg-orange-600 hover:bg-orange-700">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  )
}

export function AuthErrorFallback({ error, retry }: ErrorFallbackProps) {
  return (
    <Card className="border-red-500/30 bg-slate-900/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-red-400" />
        </div>
        <CardTitle className="text-white">Authentication Required</CardTitle>
        <CardDescription className="text-slate-300">You need to sign in to access this feature.</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button onClick={retry} className="bg-red-600 hover:bg-red-700">
          <RefreshCw className="mr-2 h-4 w-4" />
          Sign In
        </Button>
      </CardContent>
    </Card>
  )
}

export function ServerErrorFallback({ error, retry }: ErrorFallbackProps) {
  return (
    <Card className="border-purple-500/30 bg-slate-900/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Server className="h-8 w-8 text-purple-400" />
        </div>
        <CardTitle className="text-white">Server Error</CardTitle>
        <CardDescription className="text-slate-300">
          Something went wrong on our end. We're working to fix it.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button onClick={retry} className="bg-purple-600 hover:bg-purple-700">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  )
}

export function NotFoundErrorFallback({ error, retry }: ErrorFallbackProps) {
  return (
    <Card className="border-blue-500/30 bg-slate-900/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileX className="h-8 w-8 text-blue-400" />
        </div>
        <CardTitle className="text-white">Not Found</CardTitle>
        <CardDescription className="text-slate-300">The requested resource could not be found.</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button onClick={retry} className="bg-blue-600 hover:bg-blue-700">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  )
}

export function GenericErrorFallback({ error, retry }: ErrorFallbackProps) {
  return (
    <Card className="border-red-500/30 bg-slate-900/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="h-8 w-8 text-red-400" />
        </div>
        <CardTitle className="text-white">Something went wrong</CardTitle>
        <CardDescription className="text-slate-300">{error.message || "An unexpected error occurred"}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button onClick={retry}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  )
}
