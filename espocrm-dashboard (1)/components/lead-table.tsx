"use client"

import { useState } from "react"
import type { EspoCRMLead } from "@/lib/espocrm"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface LeadTableProps {
  leads: EspoCRMLead[]
  onEdit: (lead: EspoCRMLead) => void
  onDelete: (id: string) => void
}

export function LeadTable({ leads, onEdit, onDelete }: LeadTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    await onDelete(id)
    setDeletingId(null)
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      New: "bg-accent/20 text-accent",
      Assigned: "bg-chart-2/20 text-chart-2",
      "In Process": "bg-chart-4/20 text-chart-4",
      Converted: "bg-chart-3/20 text-chart-3",
      Recycled: "bg-muted text-muted-foreground",
      Dead: "bg-destructive/20 text-destructive",
    }
    return colors[status] || "bg-muted text-muted-foreground"
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-muted-foreground">Name</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Email</TableHead>
            <TableHead className="text-muted-foreground">Phone</TableHead>
            <TableHead className="text-muted-foreground">Source</TableHead>
            <TableHead className="text-muted-foreground">Created</TableHead>
            <TableHead className="text-right text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                No leads found
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium text-foreground">{lead.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(lead.status)}>
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{lead.emailAddress || "—"}</TableCell>
                <TableCell className="text-muted-foreground">{lead.phoneNumber || "—"}</TableCell>
                <TableCell className="text-muted-foreground">{lead.source || "—"}</TableCell>
                <TableCell className="text-muted-foreground">{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(lead)} className="h-8 w-8 p-0">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(lead.id)}
                      disabled={deletingId === lead.id}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
