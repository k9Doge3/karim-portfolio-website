import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, Database, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-balance text-foreground">Welcome to EspoCRM Dashboard</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Manage your contacts and leads efficiently with our integrated CRM system
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-foreground">Contacts</CardTitle>
              <CardDescription className="text-muted-foreground">
                View and manage all your contacts in one place
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/contacts">
                <Button variant="outline" className="w-full bg-transparent">
                  View Contacts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10">
                <UserPlus className="h-6 w-6 text-chart-2" />
              </div>
              <CardTitle className="text-foreground">Leads</CardTitle>
              <CardDescription className="text-muted-foreground">
                Track and convert your leads into customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/leads">
                <Button variant="outline" className="w-full bg-transparent">
                  View Leads
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/10">
                <Database className="h-6 w-6 text-chart-3" />
              </div>
              <CardTitle className="text-foreground">Integration</CardTitle>
              <CardDescription className="text-muted-foreground">Connected to your EspoCRM instance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-chart-3" />
                Active
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Getting Started</CardTitle>
            <CardDescription className="text-muted-foreground">
              Follow these steps to set up your EspoCRM integration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                1
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Install EspoCRM</h3>
                <p className="text-sm text-muted-foreground">
                  Set up your EspoCRM instance using Docker, shared hosting, or a cloud VPS
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                2
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Get API Key</h3>
                <p className="text-sm text-muted-foreground">
                  Create an API user in your EspoCRM admin panel and copy the API key
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                3
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Add Environment Variables</h3>
                <p className="text-sm text-muted-foreground">
                  Set ESPOCRM_BASE_URL and ESPOCRM_API_KEY in your Vercel project settings
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
