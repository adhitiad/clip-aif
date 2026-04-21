"use client";

import React, { useEffect } from "react";
import { 
  CheckCircle2, 
  Loader2, 
  Video, 
  ExternalLink, 
  X,
  AlertCircle,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useTaskStore, Task } from "@/store/taskStore";
import axiosInstance from "@/lib/axios";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function GlobalTaskManager() {
  const { tasks, updateTask, removeTask } = useTaskStore();
  const [isExpanded, setIsExpanded] = React.useState(true);

  const activeTasks = tasks.filter(t => t.status === "pending" || t.status === "processing");
  const finishedTasks = tasks.filter(t => t.status === "success" || t.status === "failed");

  useEffect(() => {
    const pollIntervals: { [key: string]: NodeJS.Timeout } = {};

    activeTasks.forEach((task) => {
      if (pollIntervals[task.id]) return;

      const poll = async () => {
        try {
          const response = await axiosInstance.get(`/clips/status/${task.id}`);
          const { status, progress, result_url } = response.data;

          updateTask(task.id, { 
            status, 
            progress: progress || (status === "success" ? 100 : task.progress),
            resultUrl: result_url 
          });

          if (status === "success" || status === "failed") {
            clearInterval(pollIntervals[task.id]);
            delete pollIntervals[task.id];
            
            // Auto-remove after 10 seconds
            setTimeout(() => {
              removeTask(task.id);
            }, 10000);
          }
        } catch (error) {
          console.error(`Error polling task ${task.id}:`, error);
          // Don't stop polling on single error, maybe backend is briefly down
        }
      };

      poll(); // Initial poll
      pollIntervals[task.id] = setInterval(poll, 5000);
    });

    return () => {
      Object.values(pollIntervals).forEach(clearInterval);
    };
  }, [activeTasks.length, updateTask, removeTask]);

  if (tasks.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] w-80 pointer-events-none">
      <Card className="pointer-events-auto border-primary/20 shadow-2xl bg-card/90 backdrop-blur-xl overflow-hidden border-2">
        <div 
          className="p-3 bg-primary/10 border-b border-primary/10 flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
              <Loader2 className="w-3 h-3 text-primary-foreground animate-spin" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Task Manager ({activeTasks.length})
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </Button>
        </div>

        {isExpanded && (
          <CardContent className="p-0 max-h-[400px] overflow-y-auto">
            <div className="divide-y divide-white/5">
              {tasks.map((task) => (
                <div key={task.id} className="p-4 space-y-3 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Video className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-sm font-medium truncate">{task.title}</span>
                    </div>
                    <button 
                      onClick={() => removeTask(task.id)}
                      className="text-muted-foreground hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                      <span className={cn(
                        task.status === "success" ? "text-green-400" : 
                        task.status === "failed" ? "text-red-400" : "text-blue-400"
                      )}>
                        {task.status === "pending" ? "Waiting..." : 
                         task.status === "processing" ? "Rendering..." : 
                         task.status.toUpperCase()}
                      </span>
                      <span className="text-muted-foreground">{Math.round(task.progress)}%</span>
                    </div>
                    <div className={cn(
                      "h-1.5 w-full bg-muted rounded-full overflow-hidden",
                      task.status === "failed" && "bg-red-500/20",
                      task.status === "success" && "bg-green-500/20"
                    )}>
                      <div 
                        className={cn(
                          "h-full transition-all duration-500",
                          task.status === "success" ? "bg-green-500" : 
                          task.status === "failed" ? "bg-red-500" : "bg-blue-500"
                        )}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>

                  {task.status === "success" && task.resultUrl && (
                    <div className="flex gap-2 pt-1 animate-in slide-in-from-top-2">
                      <Button size="sm" variant="secondary" className="w-full text-[10px] h-8 rounded-lg" asChild>
                        <Link href={task.resultUrl} target="_blank">
                          <ExternalLink className="w-3 h-3 mr-1.5" /> Lihat Hasil
                        </Link>
                      </Button>
                    </div>
                  )}
                  
                  {task.status === "failed" && (
                    <p className="text-[10px] text-red-500 flex items-center gap-1 pt-1">
                      <AlertCircle className="w-3 h-3" /> Rendering gagal. Kredit dikembalikan.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
