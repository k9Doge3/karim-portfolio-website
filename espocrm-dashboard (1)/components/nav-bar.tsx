"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Database, Users, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"

export function NavBar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Dashboard", icon: Database },
    { href: "/contacts", label: "Contacts", icon: Users },
    { href: "/leads", label: "Leads", icon: UserPlus },
  ]

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Database className="h-6 w-6 text-accent" />
              <span className="text-lg font-semibold text-foreground">EspoCRM</span>
            </Link>
            <div className="flex gap-1">
              {links.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
