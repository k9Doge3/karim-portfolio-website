"use client"

import { useState } from "react"
import type { EspoCRMContact } from "@/lib/espocrm"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ContactTableProps {
  contacts: EspoCRMContact[]
  onEdit: (contact: EspoCRMContact) => void
  onDelete: (id: string) => void
}

export function ContactTable({ contacts, onEdit, onDelete }: ContactTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    await onDelete(id)
    setDeletingId(null)
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-muted-foreground">Name</TableHead>
            <TableHead className="text-muted-foreground">Email</TableHead>
            <TableHead className="text-muted-foreground">Phone</TableHead>
            <TableHead className="text-muted-foreground">Account</TableHead>
            <TableHead className="text-muted-foreground">Created</TableHead>
            <TableHead className="text-right text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No contacts found
              </TableCell>
            </TableRow>
          ) : (
            contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium text-foreground">{contact.name}</TableCell>
                <TableCell className="text-muted-foreground">{contact.emailAddress || "—"}</TableCell>
                <TableCell className="text-muted-foreground">{contact.phoneNumber || "—"}</TableCell>
                <TableCell className="text-muted-foreground">{contact.accountName || "—"}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(contact)} className="h-8 w-8 p-0">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(contact.id)}
                      disabled={deletingId === contact.id}
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
