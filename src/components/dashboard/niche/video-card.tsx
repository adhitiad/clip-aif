"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Clock, User, Wand2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface VideoResult {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  duration: string;
  url: string;
}

interface VideoCardProps {
  video: VideoResult;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-primary/10 bg-card/50 backdrop-blur-sm">
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-full scale-90 group-hover:scale-100 transition-transform">
            <Play className="h-6 w-6 text-white fill-white" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1 font-bold border border-white/10">
          <Clock className="h-3 w-3" />
          {video.duration}
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        <div className="space-y-1">
          <h3 className="font-bold text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors h-9">
            {video.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <User className="h-3 w-3" />
            <span className="line-clamp-1 font-medium">{video.channel}</span>
          </div>
        </div>

        <Link href={`/dashboard/generator?url=${encodeURIComponent(video.url)}`} className="block">
          <Button className="w-full gap-2 rounded-xl h-9 hover:scale-[1.02] active:scale-95 transition-all bg-linear-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 border-none shadow-md shadow-primary/20 text-xs font-bold">
            <Wand2 className="h-4 w-4" />
            Process this Video
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export function VideoCardSkeleton() {
  return (
    <Card className="overflow-hidden border-primary/5 bg-card/50 shadow-sm transition-all">
      <Skeleton className="aspect-video w-full rounded-none bg-muted/60" />
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-muted/60" />
          <Skeleton className="h-4 w-2/3 bg-muted/60" />
          <div className="flex items-center gap-2 pt-1">
            <Skeleton className="h-3 w-3 rounded-full bg-muted/60" />
            <Skeleton className="h-3 w-20 bg-muted/60" />
          </div>
        </div>
        <Skeleton className="h-9 w-full rounded-xl bg-muted/60" />
      </CardContent>
    </Card>
  );
}

VideoCard.Skeleton = VideoCardSkeleton;
