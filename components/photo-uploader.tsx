"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Camera } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PhotoUploaderProps {
  onPhotoUploaded?: (url: string) => void
}

export function PhotoUploader({ onPhotoUploaded }: PhotoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handlePhotoUpload = async (file: File) => {
    // Validate it's an image
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const result = await response.json()

      toast({
        title: "Photo uploaded successfully",
        description: `Your photo has been uploaded to Blob storage`,
      })

      // Call the callback with the new URL
      onPhotoUploaded?.(result.url)
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your photo",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handlePhotoUpload(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Upload Profile Photo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Camera className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-3">Drag and drop your photo here, or click to select</p>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handlePhotoUpload(file)
            }}
            disabled={isUploading}
            className="max-w-xs mx-auto"
          />
          {isUploading && (
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading photo...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
