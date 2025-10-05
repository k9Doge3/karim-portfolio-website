"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Briefcase, Users, FolderOpen, Calendar, CheckSquare, DollarSign, Menu, ArrowLeft } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "Subscribers Hub", href: "/family", icon: Users },
  { name: "File Manager", href: "/files", icon: FolderOpen },
]

const familyNavigation = [
  { name: "Calendar", href: "/family/calendar", icon: Calendar },
  { name: "Todo Lists", href: "/family/todos", icon: CheckSquare },
  { name: "Finances", href: "/family/finances", icon: DollarSign },
  { name: "Files", href: "/family/files", icon: FolderOpen },
]

interface MainNavigationProps {
  showFamilyNav?: boolean
}

export function MainNavigation({ showFamilyNav = false }: MainNavigationProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = showFamilyNav ? familyNavigation : navigation

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            {showFamilyNav && (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/family">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Subscribers Hub
                </Link>
              </Button>
            )}
            <Link href="/" className="font-bold text-xl">
              My Digital Space
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button key={item.href} variant={pathname === item.href ? "default" : "ghost"} size="sm" asChild>
                  <Link href={item.href}>
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                </Button>
              )
            })}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="font-semibold text-lg mb-4">
                  {showFamilyNav ? "Subscribers Navigation" : "Main Navigation"}
                </div>
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.href}
                      variant={pathname === item.href ? "default" : "ghost"}
                      className="justify-start"
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={item.href}>
                        <Icon className="h-4 w-4 mr-2" />
                        {item.name}
                      </Link>
                    </Button>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
