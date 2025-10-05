"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Sparkles, Rocket } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface WelcomeBannerProps {
  userId: string
  displayName?: string
  onStartTour: () => void
}

export function WelcomeBanner({ userId, displayName, onStartTour }: WelcomeBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const supabase = createClient()

  const dismissBanner = async () => {
    try {
      await supabase.from("user_preferences").update({ welcome_dismissed: true }).eq("user_id", userId)

      setIsVisible(false)
    } catch (error) {
      console.error("Error dismissing welcome banner:", error)
    }
  }

  const handleStartTour = () => {
    onStartTour()
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <Card className="mb-6 border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-purple-400" />
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Welcome to your Digital Universe{displayName ? `, ${displayName}` : ""}!
                </h3>
                <p className="text-slate-300 mt-1">
                  You've successfully joined Karim's interactive platform. Ready to explore all the amazing features?
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                  <Rocket className="mr-1 h-3 w-3" />
                  Portfolio
                </Badge>
                <Badge variant="outline" className="border-blue-500/50 text-blue-300">
                  Calendar Integration
                </Badge>
                <Badge variant="outline" className="border-green-500/50 text-green-300">
                  File Sharing
                </Badge>
                <Badge variant="outline" className="border-orange-500/50 text-orange-300">
                  Interactive Features
                </Badge>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleStartTour}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  Start Tour
                </Button>
                <Button
                  variant="outline"
                  onClick={dismissBanner}
                  className="border-slate-600 text-slate-300 hover:text-white bg-transparent"
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={dismissBanner} className="text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
