"use client";

import { DubbingTool } from "@/components/dashboard/tools/dubbing-tool";
import { ViralPredictorTool } from "@/components/dashboard/tools/viral-predictor-tool";
import { Laptop, Sparkles } from "lucide-react";

export default function AIToolsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
            <Laptop className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI Content Toolkit
          </h1>
        </div>
        <p className="text-muted-foreground flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          Gunakan alat AI kami untuk meningkatkan kualitas dan potensi viralitas setiap konten Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        <DubbingTool />
        <ViralPredictorTool />
      </div>
    </div>
  );
}
