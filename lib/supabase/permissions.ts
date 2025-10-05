import { createServerClient } from "./server"

export type UserRole = "owner" | "admin" | "personal_access" | "guest" | "public"

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  created_at: string
  updated_at: string
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = await createServerClient()

  const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("[v0] Error fetching user profile:", error)
    return null
  }

  return data
}

export async function hasPersonalAccess(userId: string): Promise<boolean> {
  const profile = await getUserProfile(userId)

  if (!profile) return false

  // Owner, admin, personal_access, and guest roles can view personal page
  return ["owner", "admin", "personal_access", "guest"].includes(profile.role)
}

export async function isOwner(userId: string): Promise<boolean> {
  const profile = await getUserProfile(userId)
  return profile?.role === "owner"
}

export async function isOwnerByEmail(email: string): Promise<boolean> {
  return email === "kyoussef6994@gmail.com"
}

export async function isGuest(userId: string): Promise<boolean> {
  const profile = await getUserProfile(userId)
  return profile?.role === "guest"
}

export async function updateUserRole(
  targetUserId: string,
  newRole: UserRole,
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerClient()

  // Check if current user is owner
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  const isCurrentUserOwner = await isOwner(user.id)
  if (!isCurrentUserOwner) {
    return { success: false, error: "Only owner can update roles" }
  }

  const { error } = await supabase
    .from("user_profiles")
    .update({ role: newRole, updated_at: new Date().toISOString() })
    .eq("id", targetUserId)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function getAllUsers(): Promise<UserProfile[]> {
  const supabase = await createServerClient()

  const { data, error } = await supabase.from("user_profiles").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching users:", error)
    return []
  }

  return data || []
}
