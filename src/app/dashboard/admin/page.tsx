"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { SystemMonitor } from "@/components/dashboard/admin/system-monitor";
import { GodsMode } from "@/components/dashboard/admin/gods-mode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Bell, ShieldCheck, Loader2 } from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (user === undefined) return; // Wait for store initialization
    
    if (user?.role !== "owner") {
      router.push("/dashboard");
    } else {
      setIsAdmin(true);
    }
  }, [user, router]);

  if (isAdmin === null) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const systemAlerts = [
    { title: "User Credit Depleted", desc: "User 'johndoe' has reached 0 credits.", level: "warning", time: "2m ago" },
    { title: "Memory Spike Detected", desc: "Server memory usage exceeded 85%.", level: "critical", time: "15m ago" },
    { title: "Task Delay", desc: "Celery queue length is above threshold (50+).", level: "warning", time: "45m ago" },
    { title: "ML Training Completed", desc: "Periodic model refresh finished successfully.", level: "info", time: "2h ago" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-blue-500 shrink-0" />
            Admin Operations Center
          </h1>
          <p className="text-sm md:text-base text-muted-foreground underline decoration-blue-500/20 underline-offset-4">
             Pemantauan infrastruktur dan kendali tingkat tinggi (Gods Mode)
          </p>
        </div>
        <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/5 px-4 py-1.5 rounded-full uppercase tracking-widest font-bold whitespace-nowrap">
            Restricted Access
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
           <SystemMonitor />
           <GodsMode />
        </div>

        <div className="xl:col-span-1">
           <Card className="border-white/10 bg-card/50 h-full backdrop-blur-sm">
              <CardHeader className="border-b border-white/5">
                 <CardTitle className="text-lg flex items-center gap-2">
                    <Bell className="w-5 h-5 text-yellow-400" />
                    System Alerts & Logs
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                 <ScrollArea className="h-[600px]">
                    <div className="p-4 space-y-4">
                       {systemAlerts.map((alert, i) => (
                          <div key={i} className="group p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors relative overflow-hidden">
                             <div className={`absolute left-0 top-0 bottom-0 w-1 ${alert.level === 'critical' ? 'bg-red-500' : alert.level === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                             <div className="flex justify-between items-start mb-1">
                                <h4 className="font-semibold text-sm">{alert.title}</h4>
                                <span className="text-[10px] text-gray-500">{alert.time}</span>
                             </div>
                             <p className="text-xs text-gray-400">{alert.desc}</p>
                          </div>
                       ))}
                    </div>
                 </ScrollArea>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
