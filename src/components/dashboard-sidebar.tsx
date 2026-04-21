"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, TrendingUp, Lightbulb, Zap, Brain, LogOut } from "lucide-react"
import { useAuthStore } from "@/lib/auth-store"

export function DashboardSidebar() {
  const pathname = usePathname()
  const logout = useAuthStore((state) => state.logout)

  const routes = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      href: "/dashboard/overview",
      active: pathname === "/dashboard/overview",
    },
    {
      label: "History",
      icon: TrendingUp,
      href: "/dashboard/history",
      active: pathname === "/dashboard/history",
    },
    {
      label: "Profile",
      icon: Zap,
      href: "/dashboard/profile",
      active: pathname === "/dashboard/profile",
    },
  ]

  const nicheRoutes = [
    {
      label: "Trending",
      icon: TrendingUp,
      href: "/niche/trending",
      active: pathname === "/niche/trending",
    },
    {
      label: "Suggest",
      icon: Lightbulb,
      href: "/niche/suggest",
      active: pathname === "/niche/suggest",
    },
  ]

  const toolRoutes = [
    {
      label: "Viral Score",
      icon: Zap,
      href: "/tools/viral-score",
      active: pathname === "/tools/viral-score",
    },
    {
      label: "Model Status",
      icon: Brain,
      href: "/tools/model-status",
      active: pathname === "/tools/model-status",
    },
  ]

  const handleLogout = () => {
    logout()
    window.location.href = "/signin"
  }

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="p-6">
        <h2 className="text-2xl font-bold">AI Clipper Hub</h2>
        <p className="text-sm text-muted-foreground">Content Creator Dashboard</p>
      </div>

      <div className="flex-1 space-y-6 px-3 py-4">
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold uppercase text-muted-foreground">
            Dashboard
          </p>
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <Button
                variant={route.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  route.active && "bg-secondary"
                )}
              >
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold uppercase text-muted-foreground">
            Niche Discovery
          </p>
          {nicheRoutes.map((route) => (
            <Link key={route.href} href={route.href}>
              <Button
                variant={route.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  route.active && "bg-secondary"
                )}
              >
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold uppercase text-muted-foreground">
            AI Tools
          </p>
          {toolRoutes.map((route) => (
            <Link key={route.href} href={route.href}>
              <Button
                variant={route.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  route.active && "bg-secondary"
                )}
              >
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t p-3">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-500"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
