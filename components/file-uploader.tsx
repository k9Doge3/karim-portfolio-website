"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Link, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function FileUploader() {
  const [isUploading, setIsUploading] = useState(false)
  const [yandexUrl, setYandexUrl] = useState("")
  const { toast } = useToast()

  const handleFileUpload = async (file: File) => {
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
        title: "Upload successful",
        description: `${result.filename} has been uploaded to Blob storage`,
      })

      // Trigger refresh of file list
      window.dispatchEvent(new CustomEvent("fileUploaded"))
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleYandexUpload = async () => {
    if (!yandexUrl.trim()) {
      toast({
        title: "URL required",
        description: "Please enter a Yandex file URL",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      const response = await fetch("/api/upload-from-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: yandexUrl }),
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const result = await response.json()

      toast({
        title: "Upload successful",
        description: `File from Yandex has been uploaded to Blob storage`,
      })

      setYandexUrl("")
      window.dispatchEvent(new CustomEvent("fileUploaded"))
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading from Yandex URL",
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
      handleFileUpload(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Files
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="local" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="local">Local Files</TabsTrigger>
            <TabsTrigger value="yandex">From Yandex</TabsTrigger>
          </TabsList>

          <TabsContent value="local" className="space-y-4">
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">Drag and drop files here, or click to select</p>
              <Input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(file)
                }}
                disabled={isUploading}
                className="max-w-xs mx-auto"
              />
            </div>
          </TabsContent>

          <TabsContent value="yandex" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="yandex-url">Yandex File URL</Label>
                <Input
                  id="yandex-url"
                  type="url"
                  placeholder="https://disk.yandex.com/..."
                  value={yandexUrl}
                  onChange={(e) => setYandexUrl(e.target.value)}
                  disabled={isUploading}
                />
              </div>
              <Button onClick={handleYandexUpload} disabled={isUploading || !yandexUrl.trim()} className="w-full">
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Link className="h-4 w-4 mr-2" />
                    Upload from Yandex
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
