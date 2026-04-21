"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

interface ClipDetailDialogProps {
  clip: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ClipDetailDialog({ clip, isOpen, onClose }: ClipDetailDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!clip) return null;

  const handleFeedback = async (score: number) => {
    setIsSubmitting(true);
    try {
      await axiosInstance.post("/clips/feedback", {
        clip_id: clip.id,
        score: score,
      });
      toast.success("Feedback terkirim! Ini membantu melatih AI kami.");
    } catch (error) {
      toast.error("Gagal mengirim feedback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-card/95 backdrop-blur-xl border-white/10 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {clip.title}
          </DialogTitle>
          <DialogDescription>
            Detail klip dan pemutar video. Berikan feedback untuk meningkatkan kualitas AI.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video Player */}
          <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/5 bg-black shadow-inner">
            <video
              src={clip.video_url}
              controls
              className="w-full h-full"
              poster={clip.thumbnail_url}
            >
              Browser Anda tidak mendukung tag video.
            </video>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="space-y-1">
              <p className="text-sm font-medium">Bantu kami melatih AI</p>
              <p className="text-xs text-muted-foreground">Apakah hasil klip ini sudah sesuai keinginan Anda?</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-green-500/20 hover:bg-green-500/10 hover:text-green-400"
                onClick={() => handleFeedback(1)}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ThumbsUp className="w-4 h-4" />}
                Puas
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                onClick={() => handleFeedback(-1)}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ThumbsDown className="w-4 h-4" />}
                Kurang Puas
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
