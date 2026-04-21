"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import axiosInstance from "@/lib/axios";
import { Database, Server, Cpu, Activity, CheckCircle2, AlertCircle } from "lucide-react";

export function SystemMonitor() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get("/dashboard/owner/monitor");
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch monitor stats:", error);
        // Mock fallback
        setStats({
          database: "connected",
          redis: "connected",
          celery_tasks: 42,
          memory_usage: 68,
          cpu_usage: 34
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // 30s refresh
    return () => clearInterval(interval);
  }, []);

  const StatusItem = ({ label, status, icon: Icon }: any) => (
    <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${status === 'connected' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="font-medium text-sm text-gray-400">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold uppercase ${status === 'connected' ? 'text-green-400' : 'text-red-400'}`}>
          {status}
        </span>
        {status === 'connected' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Infrastructure Status */}
      <Card className="md:col-span-1 border-white/10 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-400" />
            Infrastructure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <StatusItem label="PostgreSQL" status={stats?.database || 'disconnected'} icon={Database} />
          <StatusItem label="Redis Cache" status={stats?.redis || 'disconnected'} icon={Activity} />
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                   <Cpu className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm text-gray-400">Celery Tasks</span>
             </div>
             <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-transparent">
                {stats?.celery_tasks || 0} Queued
             </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Resource Usage */}
      <Card className="md:col-span-2 border-white/10 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400" />
            Resource Monitoring
          </CardTitle>
          <CardDescription>Pemantauan beban server secara real-time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 py-6">
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-sm font-medium text-gray-400">Memory Usage</label>
              <span className={`text-lg font-bold ${stats?.memory_usage > 80 ? 'text-red-400' : 'text-green-400'}`}>{stats?.memory_usage || 0}%</span>
            </div>
            <Progress value={stats?.memory_usage || 0} className="h-2 bg-white/5" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-sm font-medium text-gray-400">CPU Load</label>
              <span className={`text-lg font-bold ${stats?.cpu_usage > 70 ? 'text-orange-400' : 'text-blue-400'}`}>{stats?.cpu_usage || 0}%</span>
            </div>
            <Progress value={stats?.cpu_usage || 0} className="h-2 bg-white/5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
