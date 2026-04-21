import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden backdrop-blur-md bg-card/50 border-primary/10 shadow-lg", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {(description || trend) && (
          <div className="flex items-center space-x-2 mt-1">
            {trend && (
              <span
                className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase",
                  trend.isPositive
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                    : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400"
                )}
              >
                {trend.isPositive ? "↑" : "↓"}
                {Math.abs(trend.value)}%
              </span>
            )}
            {description && (
              <p className="text-xs text-muted-foreground font-medium">{description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function StatCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-card/50 border-primary/5 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-24 bg-muted/50" />
        <Skeleton className="h-4 w-4 rounded-full bg-muted/50" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-8 w-20 bg-muted/50" />
        <Skeleton className="h-3 w-32 bg-muted/50" />
      </CardContent>
    </Card>
  );
}

// Attach skeleton for easier usage
StatCard.Skeleton = StatCardSkeleton;
