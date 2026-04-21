"use client";

import React from "react";
import { 
  Bell, 
  Search, 
  Menu,
  User as UserIcon,
  LogOut,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useTaskPolling } from "@/hooks/useTaskPolling";
import { Loader2, Activity, Search as SearchIcon, Menu as MenuIcon } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user, logout } = useAuthStore();
  const { activeTasks } = useTaskPolling();

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-background/80 px-4 md:px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-none">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <Sidebar className="flex border-none shadow-none" />
          </SheetContent>
        </Sheet>
        
        <div className="hidden items-center gap-2 md:flex">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search tools..." 
              className="h-9 w-48 lg:w-64 rounded-xl border border-input bg-background pl-9 pr-4 text-sm outline-none ring-primary transition-all focus:border-primary focus:ring-1"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {activeTasks.length > 0 && (
          <div className="hidden items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary animate-pulse md:flex">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Rendering {activeTasks.length} Video{activeTasks.length > 1 ? 's' : ''}
            </span>
          </div>
        )}

        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <div className="h-8 w-px bg-border" />

        <ThemeToggle />

        <div className="h-8 w-px bg-border" />

        <LanguageSwitcher />

        <div className="h-8 w-px bg-border" />

        <div className="flex items-center gap-3">
          <div className="hidden flex-col items-end lg:flex">
            <span className="text-sm font-medium">{user?.email?.split('@')[0] || "User Account"}</span>
            <span className="text-xs text-muted-foreground capitalize">{user?.plan || "Free"} Plan</span>
          </div>
          
          <div className="group relative">
            <Button variant="ghost" className="h-10 w-fit gap-2 rounded-full px-2 hover:bg-accent">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UserIcon className="h-5 w-5" />
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-hover:rotate-180" />
            </Button>
            
            <div className="invisible absolute right-0 top-full mt-2 w-48 scale-95 rounded-2xl border bg-card p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:scale-100 group-hover:opacity-100">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Account
              </div>
              <button 
                onClick={logout}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
