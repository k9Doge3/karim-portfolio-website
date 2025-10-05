"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Eye, Edit, Save, FileText, ImageIcon, Code } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ContentItem {
  name: string
  path: string
  type: string
  content?: string
  url?: string
}

export function ContentViewer() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [editContent, setEditContent] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newFileName, setNewFileName] = useState("")
  const [newFileContent, setNewFileContent] = useState("")
  const { toast } = useToast()

  const loadContent = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/yandex/content")
      if (response.ok) {
        const data = await response.json()
        setContentItems(data.items || [])
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load content",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const viewContent = async (item: ContentItem) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/yandex/content/${encodeURIComponent(item.path)}`)
      if (response.ok) {
        const data = await response.json()
        setSelectedItem({ ...item, content: data.content, url: data.url })
        setEditContent(data.content || "")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load file content",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const saveContent = async () => {
    if (!selectedItem) return

    setLoading(true)
    try {
      const response = await fetch("/api/yandex/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: selectedItem.path,
          content: editContent,
        }),
      })

      if (response.ok) {
        setSelectedItem({ ...selectedItem, content: editContent })
        setIsEditing(false)
        toast({
          title: "Success",
          description: "Content saved successfully",
        })
      } else {
        throw new Error("Save failed")
      }
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save content",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createNewFile = async () => {
    if (!newFileName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a file name",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/yandex/content/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newFileName,
          content: newFileContent,
        }),
      })

      if (response.ok) {
        await loadContent()
        setNewFileName("")
        setNewFileContent("")
        toast({
          title: "Success",
          description: "File created successfully",
        })
      } else {
        throw new Error("Create failed")
      }
    } catch (error) {
      toast({
        title: "Create Failed",
        description: "Failed to create file",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const renderContent = (item: ContentItem) => {
    if (!item.content && !item.url) return null

    if (item.type.startsWith("image/")) {
      return (
        <div className="text-center">
          <img src={item.url || "/placeholder.svg"} alt={item.name} className="max-w-full h-auto rounded border" />
        </div>
      )
    }

    if (item.type === "text/html") {
      return (
        <div className="space-y-4">
          <div
            className="prose max-w-none border rounded p-4"
            dangerouslySetInnerHTML={{ __html: item.content || "" }}
          />
        </div>
      )
    }

    return <pre className="whitespace-pre-wrap bg-muted p-4 rounded text-sm overflow-auto max-h-96">{item.content}</pre>
  }

  useEffect(() => {
    loadContent()
  }, [])

  return (
    <div className="space-y-4">
      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Content</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Website Content
              </CardTitle>
              <CardDescription>Content files from your Yandex Disk</CardDescription>
            </CardHeader>
            <CardContent>
              {loading && !selectedItem ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="font-medium">Files</h3>
                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      {contentItems.map((item) => (
                        <div
                          key={item.path}
                          className="flex items-center gap-2 p-2 rounded border cursor-pointer hover:bg-muted"
                          onClick={() => viewContent(item)}
                        >
                          {item.type.startsWith("image/") ? (
                            <ImageIcon className="h-4 w-4 text-green-500" />
                          ) : item.type.includes("html") ? (
                            <Code className="h-4 w-4 text-blue-500" />
                          ) : (
                            <FileText className="h-4 w-4 text-gray-500" />
                          )}
                          <span className="text-sm">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {selectedItem && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{selectedItem.name}</h3>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setIsEditing(!isEditing)}>
                              {isEditing ? <Eye className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                            </Button>
                            {isEditing && (
                              <Button size="sm" onClick={saveContent} disabled={loading}>
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                              </Button>
                            )}
                          </div>
                        </div>

                        {isEditing ? (
                          <Textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="min-h-64 font-mono text-sm"
                            placeholder="Edit content..."
                          />
                        ) : (
                          renderContent(selectedItem)
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Content</CardTitle>
              <CardDescription>Create new files directly on your Yandex Disk</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="filename">File Name</Label>
                <Input
                  id="filename"
                  placeholder="e.g., about.html, config.json, style.css"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter file content..."
                  value={newFileContent}
                  onChange={(e) => setNewFileContent(e.target.value)}
                  className="min-h-32"
                />
              </div>
              <Button onClick={createNewFile} disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create File
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Alert>
        <AlertDescription>
          This website dynamically loads and serves content from your Yandex Disk. You can edit HTML files, manage
          images, and create new content directly through this interface.
        </AlertDescription>
      </Alert>
    </div>
  )
}
