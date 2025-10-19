"use client"

import type React from "react"

import { useState } from "react"
import type { EspoCRMContact } from "@/lib/espocrm"
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

interface ContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contact?: EspoCRMContact | null
  onSave: (data: Partial<EspoCRMContact>) => Promise<void>
}

export function ContactDialog({ open, onOpenChange, contact, onSave }: ContactDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: contact?.name || "",
    emailAddress: contact?.emailAddress || "",
    phoneNumber: contact?.phoneNumber || "",
    accountName: contact?.accountName || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave(formData)
      onOpenChange(false)
      setFormData({ name: "", emailAddress: "", phoneNumber: "", accountName: "" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-foreground">{contact ? "Edit Contact" : "New Contact"}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {contact ? "Update contact information" : "Add a new contact to your CRM"}
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
              <Label htmlFor="account" className="text-foreground">
                Account
              </Label>
              <Input
                id="account"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
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
