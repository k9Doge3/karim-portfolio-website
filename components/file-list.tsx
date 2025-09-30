"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Files, Trash2, ExternalLink, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FileItem {
  url: string
  filename: string
  size: number
  uploadedAt: string
  pathname: string
}

export function FileList() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingFiles, setDeletingFiles] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/list")
      if (!response.ok) throw new Error("Failed to fetch files")

      const data = await response.json()
      setFiles(data.files || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load files",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteFile = async (url: string, filename: string) => {
    setDeletingFiles((prev) => new Set(prev).add(url))

    try {
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) throw new Error("Delete failed")

      toast({
        title: "File deleted",
        description: `${filename} has been deleted`,
      })

      fetchFiles()
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "There was an error deleting the file",
        variant: "destructive",
      })
    } finally {
      setDeletingFiles((prev) => {
        const newSet = new Set(prev)
        newSet.delete(url)
        return newSet
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  useEffect(() => {
    fetchFiles()

    const handleFileUploaded = () => {
      fetchFiles()
    }

    window.addEventListener("fileUploaded", handleFileUploaded)
    return () => window.removeEventListener("fileUploaded", handleFileUploaded)
  }, [])

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Files className="h-5 w-5" />
          Files ({files.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {files.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Files className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No files uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {files.map((file) => (
              <div
                key={file.url}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium truncate">{file.filename}</p>
                    <Badge variant="secondary" className="text-xs">
                      {formatFileSize(file.size)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Uploaded {formatDate(file.uploadedAt)}</p>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => window.open(file.url, "_blank")}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteFile(file.url, file.filename)}
                    disabled={deletingFiles.has(file.url)}
                  >
                    {deletingFiles.has(file.url) ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
