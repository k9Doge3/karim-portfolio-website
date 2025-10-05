import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const protectedPaths = ["/my-life", "/business/wildrose-painters/analytics", "/auth"]
  const shouldRunMiddleware = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (shouldRunMiddleware) {
    return await updateSession(request)
  }

  // For all other routes, just continue
  return
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
