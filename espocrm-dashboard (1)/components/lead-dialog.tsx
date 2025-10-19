"use client"

import type React from "react"

import { useState } from "react"
import type { EspoCRMLead } from "@/lib/espocrm"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LeadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead?: EspoCRMLead | null
  onSave: (data: Partial<EspoCRMLead>) => Promise<void>
}

export function LeadDialog({ open, onOpenChange, lead, onSave }: LeadDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: lead?.name || "",
    status: lead?.status || "New",
    emailAddress: lead?.emailAddress || "",
    phoneNumber: lead?.phoneNumber || "",
    source: lead?.source || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave(formData)
      onOpenChange(false)
      setFormData({
        name: "",
        status: "New",
        emailAddress: "",
        phoneNumber: "",
        source: "",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-foreground">{lead ? "Edit Lead" : "New Lead"}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {lead ? "Update lead information" : "Add a new lead to your CRM"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-foreground">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background text-foreground"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status" className="text-foreground">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="bg-background text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Assigned">Assigned</SelectItem>
                  <SelectItem value="In Process">In Process</SelectItem>
                  <SelectItem value="Converted">Converted</SelectItem>
                  <SelectItem value="Recycled">Recycled</SelectItem>
                  <SelectItem value="Dead">Dead</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.emailAddress}
                onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                className="bg-background text-foreground"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-foreground">
                Phone
              </Label>
              <Input
                id="phone"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="bg-background text-foreground"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="source" className="text-foreground">
                Source
              </Label>
              <Input
                id="source"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="bg-background text-foreground"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
