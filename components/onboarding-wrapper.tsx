"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { OnboardingFlow } from "@/components/onboarding-flow"
import { WelcomeBanner } from "@/components/welcome-banner"
import { createClient } from "@/lib/supabase/client"

interface OnboardingWrapperProps {
  userId: string
  children: React.ReactNode
}

export function OnboardingWrapper({ userId, children }: OnboardingWrapperProps) {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    checkOnboardingStatus()
  }, [userId])

  const checkOnboardingStatus = async () => {
    try {
      const { data: preferences } = await supabase
        .from("user_preferences")
        .select("tour_completed, welcome_dismissed")
        .eq("user_id", userId)
        .single()

      if (preferences) {
        if (!preferences.tour_completed) {
          setShowOnboarding(true)
        } else if (!preferences.welcome_dismissed) {
          setShowWelcome(true)
        }
      } else {
        // No preferences found, show onboarding for new user
        setShowOnboarding(true)
      }
    } catch (error) {
      console.error("Error checking onboarding status:", error)
      // Default to showing onboarding for safety
      setShowOnboarding(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartTour = () => {
    setShowWelcome(false)
    setShowOnboarding(true)
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    setShowWelcome(false)
  }

  if (isLoading) {
    return <div>{children}</div>
  }

  return (
    <>
      {showWelcome && <WelcomeBanner userId={userId} onStartTour={handleStartTour} />}

      {showOnboarding && <OnboardingFlow isOpen={showOnboarding} onClose={handleOnboardingComplete} userId={userId} />}

      {children}
    </>
  )
}
