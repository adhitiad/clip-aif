"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export function useTaskPolling() {
  const { activeTasks, removeTask } = useAuthStore();
  const pollingIntervals = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const checkTaskStatus = async (taskId: string, title: string) => {
    try {
      const response = await axiosInstance.get(`/clips/status/${taskId}`);
      const status = response.data.status;

      if (status === "success") {
        toast.success(`Video "${title}" sudah selesai dirender!`, {
          description: "Klik untuk melihat di halaman riwayat.",
          action: {
            label: "Lihat",
            onClick: () => (window.location.href = "/dashboard/history"),
          },
          duration: 10000,
        });
        stopPolling(taskId);
        removeTask(taskId);
        
        // Trigger generic event for history page optimization
        window.dispatchEvent(new CustomEvent("taskCompleted", { detail: { taskId } }));
      } else if (status === "failed") {
        toast.error(`Rendering "${title}" gagal.`, {
          description: "Silakan coba lagi beberapa saat lagi.",
        });
        stopPolling(taskId);
        removeTask(taskId);
      }
    } catch (error) {
      console.error(`Polling error for task ${taskId}:`, error);
      // We don't stop polling on error to allow transient network issues
    }
  };

  const startPolling = (taskId: string, title: string) => {
    if (pollingIntervals.current[taskId]) return;

    // Check immediately first
    checkTaskStatus(taskId, title);

    // Then set interval
    const interval = setInterval(() => {
      checkTaskStatus(taskId, title);
    }, 5000);

    pollingIntervals.current[taskId] = interval;
  };

  const stopPolling = (taskId: string) => {
    if (pollingIntervals.current[taskId]) {
      clearInterval(pollingIntervals.current[taskId]);
      delete pollingIntervals.current[taskId];
    }
  };

  useEffect(() => {
    // Start polling for all active tasks when the hook is mounted
    activeTasks.forEach((task) => {
      startPolling(task.id, task.title);
    });

    // Cleanup on unmount - though usually this hook lives in layout
    return () => {
      Object.keys(pollingIntervals.current).forEach((id) => {
        stopPolling(id);
      });
    };
  }, [activeTasks.length]); // Re-run if a new task is added

  return { activeTasks };
}
