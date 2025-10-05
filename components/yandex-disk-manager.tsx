"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, FolderOpen, File, Upload, Settings, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface YandexFile {
  name: string
  path: string
  type: "dir" | "file"
  size?: number
  modified?: string
  mime_type?: string
}

declare global {
  interface Window {
    YaAuthSuggest: {
      init: (config: any, origin: string) => Promise<{ handler: () => Promise<any> }>
    }
  }
}

export function YandexDiskManager() {
  const [token, setToken] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [files, setFiles] = useState<YandexFile[]>([])
  const [currentPath, setCurrentPath] = useState("/")
  const [loading, setLoading] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [sdkLoaded, setSdkLoaded] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest.js"
    script.onload = () => setSdkLoaded(true)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const connectWithYandexOAuth = async () => {
    if (!sdkLoaded || !window.YaAuthSuggest) {
      toast({
        title: "Error",
        description: "Yandex SDK not loaded yet. Please try again.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const result = await window.YaAuthSuggest.init(
        {
          client_id: process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID || "your-client-id",
          response_type: "token",
          redirect_uri: `${window.location.origin}/yandex-callback`,
        },
        window.location.origin,
      )

      const data = await result.handler()

      if (data.access_token) {
        setToken(data.access_token)
        setIsConnected(true)
        localStorage.setItem("yandex_token", data.access_token)
        await loadFiles()
        toast({
          title: "Connected",
          description: "Successfully connected to Yandex Disk",
        })
      }
    } catch (error) {
      console.error("Yandex OAuth error:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to authenticate with Yandex. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const connectToDisk = async () => {
    if (!token.trim()) {
      toast({
        title: "Error",
        description: "Please enter your Yandex OAuth token",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/yandex/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      if (response.ok) {
        setIsConnected(true)
        localStorage.setItem("yandex_token", token)
        await loadFiles()
        toast({
          title: "Connected",
          description: "Successfully connected to Yandex Disk",
        })
      } else {
        throw new Error("Failed to connect")
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Please check your OAuth token and try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const disconnect = () => {
    setToken("")
    setIsConnected(false)
    setFiles([])
    setCurrentPath("/")
    localStorage.removeItem("yandex_token")
    toast({
      title: "Disconnected",
      description: "Successfully disconnected from Yandex Disk",
    })
  }

  const loadFiles = async (path = currentPath) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/yandex/files?path=${encodeURIComponent(path)}`)
      if (response.ok) {
        const data = await response.json()
        setFiles(data.files || [])
        setCurrentPath(path)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load files",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const uploadToYandex = async () => {
    if (!uploadFile) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", uploadFile)
      formData.append("path", currentPath)

      const response = await fetch("/api/yandex/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        await loadFiles()
        setUploadFile(null)
        toast({
          title: "Success",
          description: "File uploaded successfully",
        })
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload file to Yandex Disk",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const navigateToFolder = (folderPath: string) => {
    loadFiles(folderPath)
  }

  const goBack = () => {
    const parentPath = currentPath.split("/").slice(0, -1).join("/") || "/"
    loadFiles(parentPath)
  }

  useEffect(() => {
    const savedToken = localStorage.getItem("yandex_token")
    if (savedToken) {
      setToken(savedToken)
      setIsConnected(true)
      loadFiles()
    }
  }, [])

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Connect to Yandex Disk
          </CardTitle>
          <CardDescription>Choose your preferred authentication method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button
              onClick={connectWithYandexOAuth}
              disabled={loading || !sdkLoaded}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {!sdkLoaded ? "Loading Yandex SDK..." : "Connect with Yandex ID"}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or use manual token</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="token">OAuth Token</Label>
            <Input
              id="token"
              type="password"
              placeholder="Enter your Yandex OAuth token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <Alert>
            <AlertDescription>
              Get your OAuth token from{" "}
              <a
                href="https://yandex.com/dev/id/doc/en/access"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Yandex Developer Console
              </a>
            </AlertDescription>
          </Alert>
          <Button onClick={connectToDisk} disabled={loading} variant="outline" className="w-full bg-transparent">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Connect with Token
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              File Browser
            </div>
            <Button variant="outline" size="sm" onClick={disconnect}>
              <LogOut className="h-4 w-4 mr-1" />
              Disconnect
            </Button>
          </CardTitle>
          <CardDescription>Current path: {currentPath}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentPath !== "/" && (
            <Button variant="outline" onClick={goBack} className="w-full bg-transparent">
              ← Back
            </Button>
          )}

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              files.map((file) => (
                <div
                  key={file.path}
                  className="flex items-center gap-2 p-2 rounded border cursor-pointer hover:bg-muted"
                  onClick={() => (file.type === "dir" ? navigateToFolder(file.path) : null)}
                >
                  {file.type === "dir" ? (
                    <FolderOpen className="h-4 w-4 text-blue-500" />
                  ) : (
                    <File className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="text-sm">{file.name}</span>
                  {file.size && (
                    <span className="text-xs text-muted-foreground ml-auto">{(file.size / 1024).toFixed(1)} KB</span>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload File
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="file" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} />
          <Button onClick={uploadToYandex} disabled={!uploadFile || loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Upload to {currentPath}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
