import { type NextRequest, NextResponse } from "next/server"
import { createEspoCRMClient } from "@/lib/espocrm"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = createEspoCRMClient()
    const contact = await client.getContact(params.id)

    return NextResponse.json(contact)
  } catch (error) {
    console.error("[v0] Error fetching contact:", error)
    return NextResponse.json({ error: "Failed to fetch contact" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = createEspoCRMClient()
    const data = await request.json()

    const contact = await client.updateContact(params.id, data)

    return NextResponse.json(contact)
  } catch (error) {
    console.error("[v0] Error updating contact:", error)
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = createEspoCRMClient()
    await client.deleteContact(params.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting contact:", error)
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 })
  }
}
