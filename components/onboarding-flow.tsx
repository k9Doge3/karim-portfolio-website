"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Rocket, Calendar, FolderOpen, Star, ArrowRight, ArrowLeft, X, Sparkles, Target, Zap } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  content: React.ReactNode
  action?: {
    label: string
    href: string
  }
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to Your Digital Universe!",
    description: "Get ready to explore all the amazing features",
    icon: <Rocket className="h-8 w-8 text-purple-400" />,
    content: (
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto">
          <Sparkles className="h-10 w-10 text-purple-400" />
        </div>
        <p className="text-slate-300 text-lg">
          You've successfully joined Karim's Digital Universe! This interactive platform offers portfolio browsing,
          calendar integration, file sharing, and much more.
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="outline" className="border-purple-500/50 text-purple-300">
            Portfolio
          </Badge>
          <Badge variant="outline" className="border-blue-500/50 text-blue-300">
            Calendar
          </Badge>
          <Badge variant="outline" className="border-green-500/50 text-green-300">
            Files
          </Badge>
        </div>
      </div>
    ),
  },
  {
    id: "portfolio",
    title: "Explore the Portfolio",
    description: "Discover professional work and projects",
    icon: <Target className="h-8 w-8 text-blue-400" />,
    content: (
      <div className="space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mx-auto">
          <Target className="h-8 w-8 text-blue-400" />
        </div>
        <p className="text-slate-300">
          Browse through Karim's professional portfolio showcasing innovative projects, business ventures, and technical
          expertise. Each project includes detailed case studies and live demos.
        </p>
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <h4 className="text-white font-semibold mb-2">What you'll find:</h4>
          <ul className="text-slate-300 text-sm space-y-1">
            <li>• Web development projects</li>
            <li>• Business case studies</li>
            <li>• Technical documentation</li>
            <li>• Resume and experience</li>
          </ul>
        </div>
      </div>
    ),
    action: {
      label: "View Portfolio",
      href: "/portfolio",
    },
  },
  {
    id: "calendar",
    title: "Interactive Calendar",
    description: "Schedule meetings and see availability",
    icon: <Calendar className="h-8 w-8 text-green-400" />,
    content: (
      <div className="space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mx-auto">
          <Calendar className="h-8 w-8 text-green-400" />
        </div>
        <p className="text-slate-300">
          The interactive calendar lets you see Karim's availability and schedule meetings directly. You can also view
          upcoming events and project milestones.
        </p>
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <h4 className="text-white font-semibold mb-2">Calendar features:</h4>
          <ul className="text-slate-300 text-sm space-y-1">
            <li>• Real-time availability</li>
            <li>• Meeting scheduling</li>
            <li>• Event notifications</li>
            <li>• Project timelines</li>
          </ul>
        </div>
      </div>
    ),
    action: {
      label: "Open Calendar",
      href: "/family/calendar",
    },
  },
  {
    id: "files",
    title: "File Sharing Hub",
    description: "Upload, share, and collaborate on files",
    icon: <FolderOpen className="h-8 w-8 text-orange-400" />,
    content: (
      <div className="space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center mx-auto">
          <FolderOpen className="h-8 w-8 text-orange-400" />
        </div>
        <p className="text-slate-300">
          Share files, collaborate on documents, and access Karim's resource library. Upload photos, documents, and
          other files with cloud storage integration.
        </p>
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <h4 className="text-white font-semibold mb-2">File capabilities:</h4>
          <ul className="text-slate-300 text-sm space-y-1">
            <li>• Drag & drop uploads</li>
            <li>• Cloud storage integration</li>
            <li>• File sharing & collaboration</li>
            <li>• Resource library access</li>
          </ul>
        </div>
      </div>
    ),
    action: {
      label: "Browse Files",
      href: "/family/files",
    },
  },
  {
    id: "complete",
    title: "You're All Set!",
    description: "Start exploring your digital universe",
    icon: <Star className="h-8 w-8 text-yellow-400" />,
    content: (
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto">
          <Zap className="h-10 w-10 text-yellow-400" />
        </div>
        <p className="text-slate-300 text-lg">
          Congratulations! You've completed the onboarding tour. You now have access to all features of Karim's Digital
          Universe. Start exploring and make the most of your experience!
        </p>
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-4 rounded-lg border border-purple-500/30">
          <p className="text-purple-200 text-sm">
            💡 Tip: You can always access help and tutorials from the navigation menu
          </p>
        </div>
      </div>
    ),
    action: {
      label: "Start Exploring",
      href: "/family",
    },
  },
]

interface OnboardingFlowProps {
  isOpen: boolean
  onClose: () => void
  userId: string
}

export function OnboardingFlow({ isOpen, onClose, userId }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (isOpen && userId) {
      loadOnboardingProgress()
    }
  }, [isOpen, userId])

  const loadOnboardingProgress = async () => {
    try {
      const { data } = await supabase
        .from("onboarding_progress")
        .select("step")
        .eq("user_id", userId)
        .eq("completed", true)

      if (data) {
        setCompletedSteps(data.map((item) => item.step))
      }
    } catch (error) {
      console.error("Error loading onboarding progress:", error)
    }
  }

  const markStepCompleted = async (stepId: string) => {
    try {
      await supabase.from("onboarding_progress").upsert({
        user_id: userId,
        step: stepId,
        completed: true,
        completed_at: new Date().toISOString(),
      })

      setCompletedSteps((prev) => [...prev, stepId])
    } catch (error) {
      console.error("Error marking step completed:", error)
    }
  }

  const completeOnboarding = async () => {
    try {
      await supabase.from("user_preferences").update({ tour_completed: true }).eq("user_id", userId)

      await markStepCompleted("complete")
      onClose()
    } catch (error) {
      console.error("Error completing onboarding:", error)
    }
  }

  const handleNext = async () => {
    const step = onboardingSteps[currentStep]
    await markStepCompleted(step.id)

    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      await completeOnboarding()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = async () => {
    await completeOnboarding()
  }

  const handleActionClick = (href: string) => {
    router.push(href)
    onClose()
  }

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100
  const step = onboardingSteps[currentStep]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-900/95 border-slate-700/50 backdrop-blur-sm">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {step.icon}
              <div>
                <DialogTitle className="text-white text-xl">{step.title}</DialogTitle>
                <DialogDescription className="text-slate-300">{step.description}</DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSkip} className="text-slate-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Progress</span>
              <span className="text-slate-300">
                {currentStep + 1} of {onboardingSteps.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="border-slate-700/50 bg-slate-800/30">
            <CardContent className="p-6">{step.content}</CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-slate-600 text-slate-300 hover:text-white bg-transparent"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-2">
              {step.action && (
                <Button
                  variant="outline"
                  onClick={() => handleActionClick(step.action!.href)}
                  className="border-blue-500/50 text-blue-300 hover:text-white hover:bg-blue-500/20"
                >
                  {step.action.label}
                </Button>
              )}

              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {currentStep === onboardingSteps.length - 1 ? "Complete Tour" : "Next"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-center">
            <Button variant="ghost" size="sm" onClick={handleSkip} className="text-slate-400 hover:text-slate-300">
              Skip tour
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
