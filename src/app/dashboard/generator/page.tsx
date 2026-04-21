"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Video, Wand2, Sparkles, Sliders, Loader2 } from "lucide-react";
import { useTaskStore } from "@/store/taskStore";
import { toast } from "sonner";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ClipGeneratorPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("videoUrl");
  const [url, setUrl] = useState(videoUrl || "");

  const addTask = useTaskStore(state => state.addTask);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (videoUrl) {
      setUrl(videoUrl);
    }
  }, [videoUrl]);

  const handleGenerate = async () => {
    if (!url) {
      toast.error(t("generator.error_no_url"));
      return;
    }

    setIsSubmitting(true);
    try {
      // Real API Call
      // const response = await axiosInstance.post("/clips/generate", { url });
      // const { task_id, title } = response.data;
      
      // Mock for development
      const mockTaskId = `task-${Math.random().toString(36).substr(2, 9)}`;
      const videoTitle = url.includes("youtube.com") ? "YouTube Video Processing" : "New AI Clip Project";
      
      addTask({
        id: mockTaskId,
        title: videoTitle,
        status: "pending"
      });

      toast.success(t("generator.success_task"));
      
    } catch (error) {
      console.error("Failed to start generation:", error);
      toast.error(t("generator.error_task"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {t("generator.title")}
        </h1>
        <p className="text-muted-foreground">
          {t("generator.desc")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <Card className="lg:col-span-2 border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-blue-400" />
              {t("generator.source")}
            </CardTitle>
            <CardDescription>
              {t("generator.source_desc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video-url">{t("generator.url_label")}</Label>
              <div className="flex gap-2">
                <Input
                  id="video-url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-background/50 border-white/10"
                />
                <Button variant="secondary">{t("generator.fetch")}</Button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">{t("generator.ai_settings")}</Label>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                  {t("generator.advanced_ai")}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{t("generator.moment_title")}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("generator.moment_desc")}
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-2">
                    <Wand2 className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{t("generator.caption_title")}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("generator.caption_desc")}
                  </p>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/20"
              onClick={handleGenerate}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("generator.preparing")}
                </>
              ) : (
                t("generator.start")
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Sidebar Settings/Info */}
        <Card className="border-white/5 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              {t("generator.export_options")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t("generator.aspect_ratio")}</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="text-xs h-16 flex flex-col gap-1 border-primary/50 bg-primary/10">
                  <div className="w-3 h-5 border border-current rounded-sm" />
                  9:16
                </Button>
                <Button variant="outline" className="text-xs h-16 flex flex-col gap-1 opacity-50">
                  <div className="w-5 h-3 border border-current rounded-sm" />
                  16:9
                </Button>
                <Button variant="outline" className="text-xs h-16 flex flex-col gap-1 opacity-50">
                  <div className="w-4 h-4 border border-current rounded-sm" />
                  1:1
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
