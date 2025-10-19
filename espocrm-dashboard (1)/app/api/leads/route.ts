import { type NextRequest, NextResponse } from "next/server"
import { createEspoCRMClient } from "@/lib/espocrm"

export async function GET(request: NextRequest) {
  try {
    const client = createEspoCRMClient()
    const searchParams = request.nextUrl.searchParams

    const leads = await client.getLeads({
      offset: Number(searchParams.get("offset")) || 0,
      maxSize: Number(searchParams.get("maxSize")) || 20,
      orderBy: searchParams.get("orderBy") || "createdAt",
      order: (searchParams.get("order") as "asc" | "desc") || "desc",
    })

    return NextResponse.json(leads)
  } catch (error) {
    console.error("[v0] Error fetching leads:", error)
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = createEspoCRMClient()
    const data = await request.json()

    const lead = await client.createLead(data)

    return NextResponse.json(lead)
  } catch (error) {
    console.error("[v0] Error creating lead:", error)
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 })
  }
}
