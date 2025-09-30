"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Camera, Upload, User, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const PROFILE_PHOTO_PATH = "/profile/profile-photo.jpg"

export function ProfilePhotoManager() {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { toast } = useToast()

  // Load existing profile photo on component mount
  useEffect(() => {
    loadProfilePhoto()
  }, [])

  const getAuthHeaders = () => {
    const token = localStorage.getItem("yandex_token")
    if (!token) {
      throw new Error("No Yandex token found. Please authenticate first.")
    }
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  }

  const loadProfilePhoto = async () => {
    try {
      const headers = getAuthHeaders()
      const response = await fetch("/api/yandex/profile/photo", {
        headers,
      })

      if (response.ok) {
        const data = await response.json()
        if (data.photoUrl) {
          setProfilePhotoUrl(data.photoUrl)
        }
      }
    } catch (error) {
      // Silently fail - no profile photo exists yet
      console.log("No profile photo found")
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (JPG, PNG, GIF, etc.)",
          variant: "destructive",
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        })
        return
      }

      setSelectedFile(file)
    }
  }

  const uploadProfilePhoto = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    try {
      const token = localStorage.getItem("yandex_token")
      if (!token) {
        throw new Error("No Yandex token found")
      }

      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("path", PROFILE_PHOTO_PATH)

      const response = await fetch("/api/yandex/profile/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to upload profile photo")
      }

      const data = await response.json()
      setProfilePhotoUrl(data.photoUrl)
      setSelectedFile(null)
      setIsDialogOpen(false)

      toast({
        title: "Profile photo updated",
        description: "Your profile photo has been successfully uploaded to Yandex Disk",
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload profile photo",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const removeProfilePhoto = async () => {
    try {
      const headers = getAuthHeaders()
      const response = await fetch("/api/yandex/profile/photo", {
        method: "DELETE",
        headers,
      })

      if (response.ok) {
        setProfilePhotoUrl(null)
        toast({
          title: "Profile photo removed",
          description: "Your profile photo has been deleted",
        })
      }
    } catch (error) {
      toast({
        title: "Failed to remove photo",
        description: "Could not delete profile photo",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="relative group">
      <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-primary/20">
        <AvatarImage src={profilePhotoUrl || undefined} alt="Profile photo" />
        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
          <User className="h-12 w-12" />
        </AvatarFallback>
      </Avatar>

      {/* Upload/Edit Button */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="secondary"
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Camera className="h-4 w-4 mr-1" />
            {profilePhotoUrl ? "Change" : "Add Photo"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profile Photo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Current Photo Preview */}
            {profilePhotoUrl && (
              <div className="text-center space-y-2">
                <Avatar className="w-20 h-20 mx-auto">
                  <AvatarImage src={profilePhotoUrl || "/placeholder.svg"} alt="Current profile photo" />
                  <AvatarFallback>
                    <User className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" onClick={removeProfilePhoto}>
                  <X className="h-4 w-4 mr-1" />
                  Remove Current Photo
                </Button>
              </div>
            )}

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="photo-upload">Upload New Photo</Label>
              <Input id="photo-upload" type="file" accept="image/*" onChange={handleFileSelect} />
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* Upload Button */}
            <div className="flex gap-2">
              <Button onClick={uploadProfilePhoto} disabled={!selectedFile || isUploading} className="flex-1">
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? "Uploading..." : "Upload Photo"}
              </Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
