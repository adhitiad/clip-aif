"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Search, 
  Video, 
  Wand2, 
  History, 
  Settings,
  X,
  Gift,
  Wallet,
  Users2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

export function Sidebar({ className, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { t } = useLanguage();

  const sidebarItems = [
    {
      label: t("navigation.dashboard"),
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      label: t("navigation.niche"),
      icon: Search,
      href: "/dashboard/niche",
    },
    {
      label: t("navigation.generator"),
      icon: Video,
      href: "/dashboard/generator",
    },
    {
      label: t("navigation.tools"),
      icon: Wand2,
      href: "/dashboard/tools",
    },
    {
      label: t("navigation.history"),
      icon: History,
      href: "/dashboard/history",
    },
    {
      label: t("navigation.settings"),
      icon: Settings,
      href: "/dashboard/settings",
    },
    {
      label: t("navigation.referral"),
      icon: Gift,
      href: "/dashboard/referral",
    },
  ];

  const ownerItems = [
    {
      label: t("navigation.admin"),
      icon: ShieldCheck,
      href: "/dashboard/admin",
    },
    {
      label: t("navigation.finance"),
      icon: Wallet,
      href: "/dashboard/finance",
    },
    {
      label: t("navigation.investment"),
      icon: Users2,
      href: "/dashboard/investment",
    },
  ];

  return (
    <div className={cn("relative hidden lg:flex h-full w-72 flex-col border-r bg-card px-4 py-6 transition-all duration-300", className)}>
      <div className="flex items-center justify-between px-2 mb-8">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Video className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">ClipAIF</span>
        </Link>
        {onClose && (
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <nav className="flex-1 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground"
              )} />
              {item.label}
            </Link>
          );
        })}

        {user?.role === "owner" && (
          <div className="pt-4 mt-4 border-t border-primary/10">
            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground opacity-50">
              Administrative
            </p>
            {ownerItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" 
                      : "text-muted-foreground hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                    isActive ? "text-white" : "text-muted-foreground group-hover:text-indigo-600"
                  )} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      <div className="mt-auto border-t pt-4 px-2">
        <div className="rounded-2xl bg-primary/5 p-4 border border-primary/10">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            Plan: {user?.plan || "Free"}
          </p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Credits</span>
            <span className="text-sm font-bold">
              {user?.credits || 0} / {user?.plan === "pro" ? "500" : "50"}
            </span>
          </div>
          <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-1000" 
              style={{ width: `${Math.min(((user?.credits || 0) / (user?.plan === "pro" ? 500 : 50)) * 100, 100)}%` }}
            ></div>
          </div>
          {user?.plan !== "pro" && (
            <Button variant="outline" size="sm" className="w-full mt-4 rounded-xl border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all">
              Upgrade Pro
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
