"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { LeadTable } from "@/components/lead-table"
import { LeadDialog } from "@/components/lead-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { EspoCRMLead } from "@/lib/espocrm"

export default function LeadsPage() {
  const [leads, setLeads] = useState<EspoCRMLead[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<EspoCRMLead | null>(null)

  const fetchLeads = async () => {
    try {
      const response = await fetch("/api/leads")
      const data = await response.json()
      setLeads(data.list || [])
    } catch (error) {
      console.error("[v0] Error fetching leads:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const handleSave = async (data: Partial<EspoCRMLead>) => {
    if (editingLead) {
      await fetch(`/api/leads/${editingLead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    } else {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    }
    setEditingLead(null)
    fetchLeads()
  }

  const handleEdit = (lead: EspoCRMLead) => {
    setEditingLead(lead)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/leads/${id}`, { method: "DELETE" })
    fetchLeads()
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leads</h1>
            <p className="mt-2 text-muted-foreground">Track and convert your leads</p>
          </div>
          <Button
            onClick={() => {
              setEditingLead(null)
              setDialogOpen(true)
            }}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Lead
          </Button>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <p className="text-muted-foreground">Loading leads...</p>
          </div>
        ) : (
          <LeadTable leads={leads} onEdit={handleEdit} onDelete={handleDelete} />
        )}

        <LeadDialog open={dialogOpen} onOpenChange={setDialogOpen} lead={editingLead} onSave={handleSave} />
      </main>
    </div>
  )
}
