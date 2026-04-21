"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import axiosInstance from "@/lib/axios";
import { StatCard } from "@/components/dashboard/stat-card";
import { UserGrowthChart } from "@/components/dashboard/user-growth-chart";
import { ServerMonitor } from "@/components/dashboard/server-monitor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Video, 
  TrendingUp, 
  Users, 
  Activity,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function OverviewPage() {
  const { user } = useAuthStore();
  const { t } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Parallel requests based on role
        const requests: Promise<any>[] = [
          axiosInstance.get("/dashboard/overview")
        ];

        if (user?.role === "owner") {
          requests.push(axiosInstance.get("/dashboard/user-growth"));
          requests.push(axiosInstance.get("/dashboard/owner/monitor"));
        }

        const results = await Promise.all(requests);
        
        const dashboardData = {
          overview: results[0].data,
          userGrowth: results[1]?.data || [],
          monitor: results[2]?.data || null
        };

        setData(dashboardData);
      } catch (err: any) {
        console.error("Fetch dashboard error:", err);
        setError(err.response?.data?.message || t("dashboard.error_fetch"));
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, t]);

  const isOwner = user?.role === "owner";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("dashboard.welcome")}, {user?.username}! 👋
        </h1>
        <p className="text-muted-foreground">
          {isOwner 
            ? t("dashboard.owner_desc")
            : t("dashboard.user_desc")}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <>
            <StatCard.Skeleton />
            <StatCard.Skeleton />
            <StatCard.Skeleton />
            <StatCard.Skeleton />
          </>
        ) : isOwner ? (
          <>
            <StatCard
              title={t("dashboard.stats.total_users")}
              value={data?.overview?.totalUsers || 0}
              icon={Users}
              trend={{ value: 12, isPositive: true }}
              description={t("dashboard.stats.trend_up")}
            />
            <StatCard
              title={t("dashboard.stats.active_subs")}
              value={data?.overview?.activeSubs || 0}
              icon={CreditCard}
              trend={{ value: 5, isPositive: true }}
              description={t("dashboard.stats.paid_users")}
            />
            <StatCard
              title={t("dashboard.stats.total_clips")}
              value={data?.overview?.totalClips || 0}
              icon={Video}
              trend={{ value: 24, isPositive: true }}
              description={t("dashboard.stats.total_prod")}
            />
            <StatCard
              title={t("dashboard.stats.revenue")}
              value={`$${(data?.overview?.revenue || 0).toLocaleString()}`}
              icon={TrendingUp}
              trend={{ value: 8, isPositive: true }}
              description={t("dashboard.stats.this_month")}
            />
          </>
        ) : (
          <>
            <StatCard
              title={t("dashboard.stats.credits")}
              value={user?.credits || 0}
              icon={CreditCard}
              description={`${t("dashboard.plan")}: ${user?.plan || "Free"}`}
            />
            <StatCard
              title={t("dashboard.stats.total_videos")}
              value={data?.overview?.userClips || 0}
              icon={Video}
              description={t("dashboard.stats.all_projects")}
            />
            <StatCard
              title={t("dashboard.stats.engagement")}
              value={`${data?.overview?.engagement || 0}%`}
              icon={Activity}
              trend={{ value: 2.5, isPositive: true }}
              description={t("dashboard.stats.avg_content")}
            />
            <StatCard
              title={t("dashboard.stats.account_status")}
              value={user?.plan?.toUpperCase() || "FREE"}
              icon={TrendingUp}
              description={user?.plan === "pro" ? t("dashboard.fitur_lengkap") : t("dashboard.upgrade_pro")}
            />
          </>
        )}
      </div>

      {/* Conditional Sections */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
        {loading ? (
          <div className="col-span-full h-[300px] bg-muted/20 animate-pulse rounded-3xl border border-dashed flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : isOwner ? (
          <>
            <UserGrowthChart data={data?.userGrowth || []} />
            <ServerMonitor stats={data?.monitor || { cpuUsage: 0, ramUsage: 0, diskUsage: 0, status: "offline" }} />
          </>
        ) : (
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>{t("dashboard.recent_history")}</CardTitle>
              <CardDescription>{t("dashboard.recent_desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              {data?.overview?.recentClips?.length > 0 ? (
                <div className="space-y-4">
                  {data.overview.recentClips.map((clip: any) => (
                    <div key={clip.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <Video className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{clip.title}</p>
                          <p className="text-xs text-muted-foreground">{clip.platform} • {new Date(clip.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Badge variant={clip.status === "completed" ? "default" : "secondary"}>
                        {clip.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground italic">{t("dashboard.no_clips")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Gods Mode Call to Action (Owner only) */}
      {isOwner && !loading && (
        <div className="p-6 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold italic uppercase tracking-wider">{t("dashboard.gods_mode")}</h2>
              <p className="text-blue-100 text-sm">{t("dashboard.gods_desc")}</p>
            </div>
            <button className="px-6 py-2 bg-white text-blue-700 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg">
              {t("dashboard.manage_platform")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
