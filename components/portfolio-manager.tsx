"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Plus, Edit, Trash2, Github, Globe, FileText } from "lucide-react"

const categories = [
  "Personal Projects",
  "Contracting Business",
  "Web Development",
  "Mobile App",
  "Desktop Application",
  "API/Backend",
  "Design",
  "Data Science",
  "DevOps",
  "Other",
]

const clientTypes = ["Startup", "Small Business", "Enterprise", "Non-Profit", "Government", "Individual", "Other"]

interface PortfolioItem {
  id: string
  title: string
  description: string
  longDescription?: string
  category: string
  tags: string[]
  images: string[]
  demoUrl?: string
  githubUrl?: string
  technologies: string[]
  status: "completed" | "in-progress" | "planned"
  featured: boolean
  clientName?: string
  clientType?: string
  projectDuration?: string
  budget?: string
  testimonial?: string
  isContractWork: boolean
  createdAt: string
  updatedAt: string
}

const statusColors = {
  completed: "bg-green-500",
  "in-progress": "bg-yellow-500",
  planned: "bg-blue-500",
}

export function PortfolioManager() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    category: "",
    tags: "",
    images: "",
    demoUrl: "",
    githubUrl: "",
    technologies: "",
    status: "completed" as const,
    featured: false,
    clientName: "",
    clientType: "",
    projectDuration: "",
    budget: "",
    testimonial: "",
    isContractWork: false,
  })

  useEffect(() => {
    loadPortfolioItems()
  }, [])

  const getAuthHeaders = () => {
    const token = localStorage.getItem("yandex_token")
    if (!token) {
      toast.error("Please connect to Yandex Disk first")
      return null
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }

  const loadPortfolioItems = async () => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const response = await fetch("/api/yandex/portfolio", { headers })
      if (response.ok) {
        const data = await response.json()
        setPortfolioItems(data.items || [])
      }
    } catch (error) {
      console.error("Failed to load portfolio items:", error)
    } finally {
      setLoading(false)
    }
  }

  const savePortfolioItem = async () => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const itemData: Omit<PortfolioItem, "id" | "createdAt" | "updatedAt"> = {
        title: formData.title,
        description: formData.description,
        longDescription: formData.longDescription,
        category: formData.category,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        images: formData.images
          .split(",")
          .map((img) => img.trim())
          .filter(Boolean),
        demoUrl: formData.demoUrl,
        githubUrl: formData.githubUrl,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
        status: formData.status,
        featured: formData.featured,
        clientName: formData.clientName,
        clientType: formData.clientType,
        projectDuration: formData.projectDuration,
        budget: formData.budget,
        testimonial: formData.testimonial,
        isContractWork: formData.isContractWork,
      }

      const url = editingItem ? `/api/yandex/portfolio/${editingItem.id}` : "/api/yandex/portfolio"

      const method = editingItem ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(itemData),
      })

      if (response.ok) {
        toast.success(editingItem ? "Portfolio item updated!" : "Portfolio item created!")
        setIsDialogOpen(false)
        resetForm()
        loadPortfolioItems()
      } else {
        const error = await response.text()
        toast.error(`Failed to save portfolio item: ${error}`)
      }
    } catch (error) {
      toast.error("Failed to save portfolio item")
      console.error("Save error:", error)
    }
  }

  const deletePortfolioItem = async (id: string) => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const response = await fetch(`/api/yandex/portfolio/${id}`, {
        method: "DELETE",
        headers,
      })

      if (response.ok) {
        toast.success("Portfolio item deleted!")
        loadPortfolioItems()
      } else {
        toast.error("Failed to delete portfolio item")
      }
    } catch (error) {
      toast.error("Failed to delete portfolio item")
      console.error("Delete error:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      longDescription: "",
      category: "",
      tags: "",
      images: "",
      demoUrl: "",
      githubUrl: "",
      technologies: "",
      status: "completed",
      featured: false,
      clientName: "",
      clientType: "",
      projectDuration: "",
      budget: "",
      testimonial: "",
      isContractWork: false,
    })
    setEditingItem(null)
  }

  const openEditDialog = (item: PortfolioItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description,
      longDescription: item.longDescription || "",
      category: item.category,
      tags: item.tags.join(", "),
      images: item.images.join(", "),
      demoUrl: item.demoUrl || "",
      githubUrl: item.githubUrl || "",
      technologies: item.technologies.join(", "),
      status: item.status,
      featured: item.featured,
      clientName: item.clientName || "",
      clientType: item.clientType || "",
      projectDuration: item.projectDuration || "",
      budget: item.budget || "",
      testimonial: item.testimonial || "",
      isContractWork: item.isContractWork || false,
    })
    setIsDialogOpen(true)
  }

  const filteredItems = portfolioItems.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory,
  )

  const contractingItems = filteredItems.filter((item) => item.isContractWork)
  const personalItems = filteredItems.filter((item) => !item.isContractWork)
  const featuredItems = filteredItems.filter((item) => item.featured)
  const regularItems = filteredItems.filter((item) => !item.featured)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            All ({portfolioItems.length})
          </Button>
          <Button
            variant={selectedCategory === "contracting" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("contracting")}
          >
            Contracting ({contractingItems.length})
          </Button>
          <Button
            variant={selectedCategory === "personal" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("personal")}
          >
            Personal ({personalItems.length})
          </Button>
          {categories.map((category) => {
            const count = portfolioItems.filter((item) => item.category === category).length
            if (count === 0) return null
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({count})
              </Button>
            )
          })}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Portfolio Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Portfolio Item" : "Add Portfolio Item"}</DialogTitle>
              <DialogDescription>Create or edit a portfolio item stored in your Yandex Disk</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
                <input
                  type="checkbox"
                  id="isContractWork"
                  checked={formData.isContractWork}
                  onChange={(e) => setFormData({ ...formData, isContractWork: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="isContractWork" className="text-sm font-medium">
                  This is contracting/client work
                </Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Project title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.isContractWork && (
                <div className="space-y-4 p-4 border rounded-lg bg-blue-50/50 dark:bg-blue-950/20">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">Client Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Client Name</Label>
                      <Input
                        id="clientName"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="Company or individual name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientType">Client Type</Label>
                      <Select
                        value={formData.clientType}
                        onValueChange={(value) => setFormData({ ...formData, clientType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select client type" />
                        </SelectTrigger>
                        <SelectContent>
                          {clientTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectDuration">Project Duration</Label>
                      <Input
                        id="projectDuration"
                        value={formData.projectDuration}
                        onChange={(e) => setFormData({ ...formData, projectDuration: e.target.value })}
                        placeholder="e.g., 3 months, 6 weeks"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Input
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder="e.g., $5k-10k, $50/hour"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="testimonial">Client Testimonial</Label>
                    <Textarea
                      id="testimonial"
                      value={formData.testimonial}
                      onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                      placeholder="Client feedback or testimonial"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longDescription">Detailed Description</Label>
                <Textarea
                  id="longDescription"
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  placeholder="Detailed project description"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Featured</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="featured" className="text-sm">
                      Feature this item
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, Node.js, TypeScript (comma separated)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="web, mobile, api (comma separated)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="demoUrl">Demo URL</Label>
                  <Input
                    id="demoUrl"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    placeholder="https://demo.example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/user/repo"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Image URLs</Label>
                <Textarea
                  id="images"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg (comma separated)"
                  rows={2}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={savePortfolioItem}>{editingItem ? "Update" : "Create"}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {selectedCategory === "contracting" || selectedCategory === "all"
        ? contractingItems.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-semibold">Contracting Projects</h2>
                <Badge variant="secondary">Business</Badge>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {contractingItems.map((item) => (
                  <Card
                    key={item.id}
                    className="group hover:shadow-lg transition-shadow border-blue-200 dark:border-blue-800"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <div className={`w-2 h-2 rounded-full ${statusColors[item.status]}`} />
                            {item.featured && (
                              <Badge variant="secondary" className="text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <CardDescription>{item.description}</CardDescription>
                          {item.clientName && (
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>Client:</span>
                              <Badge variant="outline" className="text-xs">
                                {item.clientName} ({item.clientType})
                              </Badge>
                            </div>
                          )}
                          <Badge variant="outline" className="w-fit">
                            {item.category}
                          </Badge>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deletePortfolioItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {item.longDescription && (
                        <p className="text-sm text-muted-foreground line-clamp-3">{item.longDescription}</p>
                      )}

                      {(item.projectDuration || item.budget) && (
                        <div className="flex gap-4 text-sm">
                          {item.projectDuration && (
                            <div>
                              <span className="text-muted-foreground">Duration:</span> {item.projectDuration}
                            </div>
                          )}
                          {item.budget && (
                            <div>
                              <span className="text-muted-foreground">Budget:</span> {item.budget}
                            </div>
                          )}
                        </div>
                      )}

                      {item.testimonial && (
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-sm text-muted-foreground">
                          "{item.testimonial}"
                        </blockquote>
                      )}

                      {item.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex space-x-2">
                        {item.demoUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={item.demoUrl} target="_blank" rel="noopener noreferrer">
                              <Globe className="h-4 w-4 mr-1" />
                              Demo
                            </a>
                          </Button>
                        )}
                        {item.githubUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-1" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        : null}

      {(selectedCategory === "personal" || selectedCategory === "all") &&
        contractingItems.length > 0 &&
        personalItems.length > 0 && <Separator />}

      {selectedCategory === "personal" || selectedCategory === "all"
        ? personalItems.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-semibold">Personal Projects</h2>
                <Badge variant="secondary">Personal</Badge>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {personalItems.map((item) => (
                  <Card key={item.id} className="group hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <CardTitle className="text-base">{item.title}</CardTitle>
                            <div className={`w-2 h-2 rounded-full ${statusColors[item.status]}`} />
                            {item.featured && (
                              <Badge variant="secondary" className="text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-sm">{item.description}</CardDescription>
                          <Badge variant="outline" className="w-fit text-xs">
                            {item.category}
                          </Badge>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(item)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deletePortfolioItem(item.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {item.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {item.technologies.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{item.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex space-x-2">
                        {item.demoUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={item.demoUrl} target="_blank" rel="noopener noreferrer">
                              <Globe className="h-3 w-3 mr-1" />
                              Demo
                            </a>
                          </Button>
                        )}
                        {item.githubUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-3 w-3 mr-1" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        : null}

      {portfolioItems.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">No Portfolio Items</h3>
                <p className="text-muted-foreground">Start building your portfolio by adding your first project</p>
              </div>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Project
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
