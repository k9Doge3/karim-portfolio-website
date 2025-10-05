"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Rocket, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { sendEmail } from "@/app/actions/send-email"

type FieldErrors = {
  name?: string
  email?: string
  message?: string
}

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once visible, no need to observe anymore
          if (formRef.current) {
            observer.unobserve(formRef.current)
          }
        }
      },
      {
        // Start animation when form is 10% visible
        threshold: 0.1,
      },
    )

    if (formRef.current) {
      observer.observe(formRef.current)
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current)
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    // Clear server error when user makes any changes
    if (serverError) {
      setServerError(null)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FieldErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setServerError(null)

    try {
      // Send email using the server action
      const result = await sendEmail(formData)

      if (result.success) {
        // Success toast with 2 second duration
        toast({
          title: "Message sent!",
          description: result.message || "Thank you for reaching out. We'll get back to you soon.",
          duration: 2000, // 2 seconds
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      } else {
        // Handle field-specific errors if they exist
        if (result.fieldErrors) {
          setErrors(result.fieldErrors as FieldErrors)
        }

        // Set server error message
        setServerError(result.message || "Your message couldn't be sent. Please try again.")

        toast({
          title: "Something went wrong",
          description: result.message || "Your message couldn't be sent. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      setServerError(errorMessage)

      toast({
        title: "Something went wrong",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      ref={formRef}
      className={cn(
        "mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      )}
    >
      {serverError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          <div className="flex items-center gap-2 font-medium">
            <AlertCircle className="h-4 w-4" />
            <span>Error</span>
          </div>
          <p className="mt-1 ml-6">{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center justify-between">
            Your name
            {errors.name && (
              <span className="text-xs font-normal text-red-500 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.name}
              </span>
            )}
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={cn(errors.name && "border-red-500 focus-visible:ring-red-500")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <span id="name-error" className="sr-only">
              {errors.name}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center justify-between">
            Your email address
            {errors.email && (
              <span className="text-xs font-normal text-red-500 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.email}
              </span>
            )}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={cn(errors.email && "border-red-500 focus-visible:ring-red-500")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" className="sr-only">
              {errors.email}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Your phone number (optional)</Label>
          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="flex items-center justify-between">
            Your message
            {errors.message && (
              <span className="text-xs font-normal text-red-500 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.message}
              </span>
            )}
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            className={cn("min-h-[120px]", errors.message && "border-red-500 focus-visible:ring-red-500")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <span id="message-error" className="sr-only">
              {errors.message}
            </span>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          <Rocket className="mr-2 h-4 w-4" />
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  )
}
