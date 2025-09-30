"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "./auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { CreditCard, Check, Star, Zap, Crown, Receipt, AlertCircle, TrendingUp } from "lucide-react"

interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price_monthly: number
  price_yearly: number
  features: string[]
  max_subscribers: number
  max_file_storage_gb: number
  is_active: boolean
}

interface UserSubscription {
  id: string
  plan_id: string
  status: string
  billing_cycle: string
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  plan: SubscriptionPlan
}

interface BillingHistory {
  id: string
  amount: number
  currency: string
  status: string
  billing_date: string
}

export function SubscriptionManager() {
  const { user } = useAuth()
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null)
  const [billingHistory, setBillingHistory] = useState<BillingHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const supabase = createClient()

  useEffect(() => {
    if (user) {
      loadSubscriptionData()
    }
  }, [user])

  const loadSubscriptionData = async () => {
    try {
      // Load subscription plans
      const { data: plansData, error: plansError } = await supabase
        .from("subscription_plans")
        .select("*")
        .eq("is_active", true)
        .order("price_monthly", { ascending: true })

      if (plansError) throw plansError
      setPlans(plansData || [])

      // Load current subscription
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from("user_subscriptions")
        .select(`
          *,
          plan:subscription_plans(*)
        `)
        .eq("user_id", user?.id)
        .eq("status", "active")
        .single()

      if (subscriptionError && subscriptionError.code !== "PGRST116") {
        throw subscriptionError
      }
      setCurrentSubscription(subscriptionData)

      // Load billing history
      const { data: billingData, error: billingError } = await supabase
        .from("billing_history")
        .select("*")
        .eq("user_id", user?.id)
        .order("billing_date", { ascending: false })
        .limit(10)

      if (billingError) throw billingError
      setBillingHistory(billingData || [])
    } catch (error) {
      console.error("Error loading subscription data:", error)
      toast.error("Failed to load subscription data")
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async (plan: SubscriptionPlan) => {
    try {
      // In a real app, this would integrate with Stripe
      const { error } = await supabase.from("user_subscriptions").upsert({
        user_id: user?.id,
        plan_id: plan.id,
        status: "active",
        billing_cycle: billingCycle,
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(
          Date.now() + (billingCycle === "yearly" ? 365 : 30) * 24 * 60 * 60 * 1000,
        ).toISOString(),
      })

      if (error) throw error

      // Add billing record
      await supabase.from("billing_history").insert({
        user_id: user?.id,
        amount: billingCycle === "yearly" ? plan.price_yearly : plan.price_monthly,
        status: "paid",
        billing_date: new Date().toISOString(),
      })

      toast.success(`Successfully upgraded to ${plan.name}!`)
      setIsUpgradeDialogOpen(false)
      loadSubscriptionData()
    } catch (error) {
      console.error("Error upgrading subscription:", error)
      toast.error("Failed to upgrade subscription")
    }
  }

  const handleCancelSubscription = async () => {
    if (!currentSubscription) return

    try {
      const { error } = await supabase
        .from("user_subscriptions")
        .update({ cancel_at_period_end: true })
        .eq("id", currentSubscription.id)

      if (error) throw error

      toast.success("Subscription will be cancelled at the end of the current period")
      loadSubscriptionData()
    } catch (error) {
      console.error("Error cancelling subscription:", error)
      toast.error("Failed to cancel subscription")
    }
  }

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case "free":
        return <Star className="h-5 w-5 text-slate-400" />
      case "premium":
        return <Zap className="h-5 w-5 text-blue-400" />
      case "enterprise":
        return <Crown className="h-5 w-5 text-purple-400" />
      default:
        return <Star className="h-5 w-5 text-slate-400" />
    }
  }

  const getPlanColor = (planName: string) => {
    switch (planName.toLowerCase()) {
      case "free":
        return "border-slate-600 bg-slate-800/30"
      case "premium":
        return "border-blue-500/50 bg-blue-900/20"
      case "enterprise":
        return "border-purple-500/50 bg-purple-900/20"
      default:
        return "border-slate-600 bg-slate-800/30"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse border-slate-700/50 bg-slate-900/50">
          <CardHeader>
            <div className="h-6 bg-slate-700 rounded w-1/3"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-4 bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Current Subscription Status */}
      {currentSubscription && (
        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getPlanIcon(currentSubscription.plan.name)}
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    Current Plan: {currentSubscription.plan.name}
                    <Badge variant={currentSubscription.status === "active" ? "default" : "destructive"}>
                      {currentSubscription.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    {currentSubscription.billing_cycle === "yearly" ? "Yearly" : "Monthly"} billing • Next payment:{" "}
                    {new Date(currentSubscription.current_period_end).toLocaleDateString()}
                  </CardDescription>
                </div>
              </div>
              {currentSubscription.cancel_at_period_end && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Cancelling
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-slate-300">
                <div className="text-2xl font-bold text-white">
                  $
                  {currentSubscription.billing_cycle === "yearly"
                    ? currentSubscription.plan.price_yearly
                    : currentSubscription.plan.price_monthly}
                  <span className="text-sm font-normal text-slate-400">
                    /{currentSubscription.billing_cycle === "yearly" ? "year" : "month"}
                  </span>
                </div>
                <p className="text-sm">{currentSubscription.plan.description}</p>
              </div>
              <div className="flex gap-2">
                {!currentSubscription.cancel_at_period_end && (
                  <Button
                    variant="outline"
                    onClick={handleCancelSubscription}
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                  >
                    Cancel Subscription
                  </Button>
                )}
                <Dialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700 max-w-4xl">
                    <DialogHeader>
                      <DialogTitle className="text-white">Upgrade Your Plan</DialogTitle>
                      <DialogDescription className="text-slate-300">
                        Choose a plan that fits your needs
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <div className="flex bg-slate-700 rounded-lg p-1">
                          <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                              billingCycle === "monthly" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"
                            }`}
                          >
                            Monthly
                          </button>
                          <button
                            onClick={() => setBillingCycle("yearly")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                              billingCycle === "yearly" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"
                            }`}
                          >
                            Yearly (Save 17%)
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plans.map((plan) => (
                          <Card
                            key={plan.id}
                            className={`${getPlanColor(plan.name)} transition-all duration-300 hover:scale-105`}
                          >
                            <CardHeader>
                              <div className="flex items-center gap-2">
                                {getPlanIcon(plan.name)}
                                <CardTitle className="text-white">{plan.name}</CardTitle>
                              </div>
                              <CardDescription className="text-slate-300">{plan.description}</CardDescription>
                              <div className="text-3xl font-bold text-white">
                                ${billingCycle === "yearly" ? plan.price_yearly : plan.price_monthly}
                                <span className="text-sm font-normal text-slate-400">
                                  /{billingCycle === "yearly" ? "year" : "month"}
                                </span>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2 mb-6">
                                {plan.features.map((feature, index) => (
                                  <li key={index} className="flex items-center gap-2 text-slate-300">
                                    <Check className="h-4 w-4 text-green-400" />
                                    <span className="text-sm">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                              <Button
                                onClick={() => handleUpgrade(plan)}
                                className="w-full"
                                variant={plan.name === "Enterprise" ? "default" : "outline"}
                                disabled={currentSubscription?.plan_id === plan.id}
                              >
                                {currentSubscription?.plan_id === plan.id ? "Current Plan" : `Upgrade to ${plan.name}`}
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subscription Plans for New Users */}
      {!currentSubscription && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Choose Your Plan</h2>
            <p className="text-slate-300">Start with a plan that fits your needs</p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="flex bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "monthly" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "yearly" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                Yearly (Save 17%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className={`${getPlanColor(plan.name)} transition-all duration-300 hover:scale-105`}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {getPlanIcon(plan.name)}
                    <CardTitle className="text-white">{plan.name}</CardTitle>
                  </div>
                  <CardDescription className="text-slate-300">{plan.description}</CardDescription>
                  <div className="text-3xl font-bold text-white">
                    ${billingCycle === "yearly" ? plan.price_yearly : plan.price_monthly}
                    <span className="text-sm font-normal text-slate-400">
                      /{billingCycle === "yearly" ? "year" : "month"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-slate-300">
                        <Check className="h-4 w-4 text-green-400" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleUpgrade(plan)}
                    className="w-full"
                    variant={plan.name === "Enterprise" ? "default" : "outline"}
                  >
                    {plan.price_monthly === 0 ? "Get Started Free" : `Start ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Billing History */}
      {billingHistory.length > 0 && (
        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Billing History
            </CardTitle>
            <CardDescription className="text-slate-300">Your recent billing transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {billingHistory.map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center justify-between p-4 border border-slate-700 rounded-lg bg-slate-800/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        ${bill.amount} {bill.currency}
                      </div>
                      <div className="text-sm text-slate-400">{new Date(bill.billing_date).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      bill.status === "paid" ? "default" : bill.status === "failed" ? "destructive" : "secondary"
                    }
                  >
                    {bill.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
