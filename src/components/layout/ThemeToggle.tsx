"use client"

import * as React from "react"
import { Moon, Sun, Monitor, Sparkles, Droplet } from "lucide-react"
import { useTheme, type Theme } from "@/components/theme-provider"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const themes: { name: Theme; label: string; Icon: any }[] = [
    { name: "light", label: "Light", Icon: Sun },
    { name: "dark", label: "Dark", Icon: Moon },
    { name: "system", label: "System", Icon: Monitor },
    { name: "aurora", label: "Aurora", Icon: Sparkles },
    { name: "coolers", label: "Coolers", Icon: Droplet },
  ]

  const ActiveIcon = themes.find((t) => t.name === theme)?.Icon || Monitor

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 px-0">
          <ActiveIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map(({ name, label, Icon }) => (
          <DropdownMenuItem
            key={name}
            onClick={() => setTheme(name)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
            {theme === name && (
              <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
