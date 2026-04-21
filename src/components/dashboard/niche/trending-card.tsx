"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, ArrowUpRight } from "lucide-react";

interface TrendingItem {
  title: string;
  traffic: string;
  category?: string;
}

interface TrendingCardProps {
  item: TrendingItem;
}

export function TrendingCard({ item }: TrendingCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-primary/10 overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
              <TrendingUp className="h-3 w-3" />
              Trending Now
            </div>
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              Estimasi Trafik: <span className="font-semibold text-foreground">{item.traffic}</span>
            </p>
          </div>
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
