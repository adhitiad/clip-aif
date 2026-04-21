"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function VideoCardSkeleton() {
  return (
    <Card className="overflow-hidden border-white/5 bg-white/[0.02] backdrop-blur-sm">
      <CardHeader className="p-0">
        <Skeleton className="aspect-video w-full rounded-none" />
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-10" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-9 w-full rounded-lg mt-2" />
      </CardContent>
    </Card>
  );
}
