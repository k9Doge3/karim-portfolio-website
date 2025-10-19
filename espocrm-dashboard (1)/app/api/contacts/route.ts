import { type NextRequest, NextResponse } from "next/server"
import { createEspoCRMClient } from "../../../lib/espocrm"

export async function GET(request: NextRequest) {
  try {
    const client = createEspoCRMClient()
    const searchParams = request.nextUrl.searchParams

    const contacts = await client.getContacts({
      offset: Number(searchParams.get("offset")) || 0,
      maxSize: Number(searchParams.get("maxSize")) || 20,
      orderBy: searchParams.get("orderBy") || "createdAt",
      order: (searchParams.get("order") as "asc" | "desc") || "desc",
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error("[v0] Error fetching contacts:", error)
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = createEspoCRMClient()
    const data = await request.json()

    const contact = await client.createContact(data)

    return NextResponse.json(contact)
  } catch (error) {
    console.error("[v0] Error creating contact:", error)
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 })
  }
}
