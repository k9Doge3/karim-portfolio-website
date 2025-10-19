"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { ContactTable } from "@/components/contact-table"
import { ContactDialog } from "@/components/contact-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { EspoCRMContact } from "@/lib/espocrm"

export default function ContactsPage() {
  const [contacts, setContacts] = useState<EspoCRMContact[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<EspoCRMContact | null>(null)

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contacts")
      const data = await response.json()
      setContacts(data.list || [])
    } catch (error) {
      console.error("[v0] Error fetching contacts:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const handleSave = async (data: Partial<EspoCRMContact>) => {
    if (editingContact) {
      await fetch(`/api/contacts/${editingContact.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    } else {
      await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    }
    setEditingContact(null)
    fetchContacts()
  }

  const handleEdit = (contact: EspoCRMContact) => {
    setEditingContact(contact)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/contacts/${id}`, { method: "DELETE" })
    fetchContacts()
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
            <p className="mt-2 text-muted-foreground">Manage your contact database</p>
          </div>
          <Button
            onClick={() => {
              setEditingContact(null)
              setDialogOpen(true)
            }}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Contact
          </Button>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <p className="text-muted-foreground">Loading contacts...</p>
          </div>
        ) : (
          <ContactTable contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />
        )}

        <ContactDialog open={dialogOpen} onOpenChange={setDialogOpen} contact={editingContact} onSave={handleSave} />
      </main>
    </div>
  )
}
