"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Runtime Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-linear-to-b from-background to-red-50/10 dark:to-red-950/5">
      <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-full mb-8 animate-pulse">
        <AlertTriangle className="h-16 w-16 text-red-500" />
      </div>
      
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-3xl font-bold tracking-tight">Terjadi Kesalahan Sistem</h1>
        <p className="text-muted-foreground leading-relaxed">
          Mohon maaf, platform ClipAIF mengalami kendala teknis mendadak. 
          Pesan sistem: <code className="text-red-500 font-mono text-xs bg-red-50 dark:bg-red-950/30 px-2 py-1 rounded">{error.message || "An unexpected error occurred"}</code>
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Button 
            onClick={() => reset()}
            className="w-full sm:w-auto h-12 px-8 rounded-2xl bg-red-600 hover:bg-red-700 shadow-xl shadow-red-500/20"
          >
            <RefreshCcw className="h-5 w-5 mr-2" />
            Coba Segarkan
          </Button>
          
          <Button asChild variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-2xl">
            <Link href="/dashboard/overview" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Ke Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <p className="mt-12 text-[10px] text-muted-foreground uppercase tracking-widest opacity-50">
        ClipAIF Content Intelligence • Error Boundary Active
      </p>
    </div>
  );
}
