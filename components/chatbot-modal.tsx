"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatbotModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatbotModal({ isOpen, onClose }: ChatbotModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      setIsVisible(true)
      document.addEventListener("keydown", handleEscapeKey)
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300) // Match the transition duration
      return () => clearTimeout(timer)
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isOpen, onClose])

  // Handle clicks outside the modal to close it
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  if (!isVisible && !isOpen) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/70 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0",
      )}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className={cn(
          "relative w-full max-w-5xl rounded-lg bg-black shadow-[0_0_50px_rgba(150,150,150,0.5)] transition-all duration-300",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0",
        )}
      >
        {/* Floating close button - moved further up and right */}
        <button
          onClick={onClose}
          className="absolute left-1/2 -top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white transform -translate-x-1/2"
          aria-label="Close chatbot"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="h-[80vh] w-full overflow-hidden rounded-lg">
          <iframe
            src="https://chatbot.neilalliston.com/"
            title="Neil Alliston Chatbot"
            className="h-full w-full"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
