import { type NextRequest, NextResponse } from "next/server"
import { createEspoCRMClient } from "@/lib/espocrm"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = createEspoCRMClient()
    const lead = await client.getLead(params.id)

    return NextResponse.json(lead)
  } catch (error) {
    console.error("[v0] Error fetching lead:", error)
    return NextResponse.json({ error: "Failed to fetch lead" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = createEspoCRMClient()
    const data = await request.json()

    const lead = await client.updateLead(params.id, data)

    return NextResponse.json(lead)
  } catch (error) {
    console.error("[v0] Error updating lead:", error)
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = createEspoCRMClient()
    await client.deleteLead(params.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting lead:", error)
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 })
  }
}
