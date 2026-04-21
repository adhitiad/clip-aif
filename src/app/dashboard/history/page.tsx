"use client";

import { useEffect, useState } from "react";
import { HistoryTable } from "@/components/dashboard/history/history-table";
import { ClipDetailDialog } from "@/components/dashboard/history/clip-detail-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { History as HistoryIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function HistoryPage() {
  const { t } = useLanguage();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClip, setSelectedClip] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/dashboard/history");
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch history:", error);
      toast.error(t("history.empty"));
      // Mock data for demo if API fails
      setData([
        { id: "1", title: "Rahasia Sukses Coding", topic: "Programming", viral_score: 95, status: "completed", video_url: "https://www.w3schools.com/html/mov_bbb.mp4" },
        { id: "2", title: "Masa Depan AI di 2024", topic: "Technology", viral_score: 88, status: "completed", video_url: "https://www.w3schools.com/html/mov_bbb.mp4" },
        { id: "3", title: "Tips Memasak Cepat", topic: "Lifestyle", viral_score: 72, status: "processing", video_url: "" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();

    // Listen for task completion events from useTaskPolling
    const handleTaskCompletion = () => {
      fetchHistory();
    };

    window.addEventListener("taskCompleted", handleTaskCompletion);
    return () => {
      window.removeEventListener("taskCompleted", handleTaskCompletion);
    };
  }, []);

  const handleRowClick = (clip: any) => {
    if (clip.status === 'completed') {
      setSelectedClip(clip);
      setIsDialogOpen(true);
    } else {
      toast.info(t("history.processing_info"));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
            <HistoryIcon className="w-8 h-8 text-blue-400" />
            {t("history.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("history.desc")}
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchHistory} 
          disabled={isLoading}
          className="bg-card/50 border-white/10"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {t("history.refresh")}
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-[400px] w-full rounded-xl bg-white/5" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-32 bg-white/5" />
            <Skeleton className="h-8 w-24 bg-white/5" />
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/5 bg-card/50 backdrop-blur-md shadow-xl">
          <HistoryTable 
            data={data} 
            onRowClick={handleRowClick} 
          />
        </div>
      )}

      <ClipDetailDialog 
        clip={selectedClip} 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </div>
  );
}
