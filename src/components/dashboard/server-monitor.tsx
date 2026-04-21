"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Cpu, HardDrive, Server } from "lucide-react";

interface MonitorStats {
  cpuUsage: number;
  ramUsage: number;
  diskUsage: number;
  status: "online" | "maintenance" | "offline";
}

interface ServerMonitorProps {
  stats: MonitorStats;
}

export function ServerMonitor({ stats }: ServerMonitorProps) {
  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5 text-primary" />
          Server Monitor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-muted-foreground" />
              CPU Usage
            </span>
            <span className="font-medium">{stats.cpuUsage}%</span>
          </div>
          <Progress value={stats.cpuUsage} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Server className="h-4 w-4 text-muted-foreground" />
              RAM Usage
            </span>
            <span className="font-medium">{stats.ramUsage}%</span>
          </div>
          <Progress value={stats.ramUsage} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-muted-foreground" />
              Disk Usage
            </span>
            <span className="font-medium">{stats.diskUsage}%</span>
          </div>
          <Progress value={stats.diskUsage} className="h-2" />
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <span
              className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                stats.status === "online"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : stats.status === "maintenance"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {stats.status}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
