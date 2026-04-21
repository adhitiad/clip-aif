"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages, Volume2, Video, Loader2, Wand2 } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export function DubbingTool() {
  const [videoPath, setVideoPath] = useState("");
  const [targetLang, setTargetLang] = useState("id");
  const [volumeRatio, setVolumeRatio] = useState([0.3]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDubbing = async () => {
    if (!videoPath) {
      toast.error("Mohon masukkan path video asli.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/tools/dub", {
        video_path: videoPath,
        target_lang: targetLang,
        volume_ratio: volumeRatio[0],
      });
      toast.success("Proses dubbing dimulai! Cek riwayat untuk progres.");
    } catch (error) {
      console.error("Dubbing failed:", error);
      toast.error("Gagal memulai proses dubbing.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-blue-400" />
          AI Auto Dubbing
        </CardTitle>
        <CardDescription>
          Alih bahasa video Anda secara otomatis dengan suara AI natural.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="video-path" className="flex items-center gap-2">
            <Video className="w-4 h-4 text-muted-foreground" />
            Path Video Asli
          </Label>
          <Input
            id="video-path"
            placeholder="/path/ke/video/mentah.mp4"
            value={videoPath}
            onChange={(e) => setVideoPath(e.target.value)}
            className="bg-background/50 border-white/10 focus:border-blue-500/50 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Target Language</Label>
            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger className="bg-background/50 border-white/10">
                <SelectValue placeholder="Pilih Bahasa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id">Indonesian (ID)</SelectItem>
                <SelectItem value="en">English (EN)</SelectItem>
                <SelectItem value="es">Spanish (ES)</SelectItem>
                <SelectItem value="ja">Japanese (JP)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                Original Volume
              </Label>
              <span className="text-xs font-mono text-blue-400">{(volumeRatio[0] * 100).toFixed(0)}%</span>
            </div>
            <Slider
              value={volumeRatio}
              onValueChange={setVolumeRatio}
              max={1}
              step={0.01}
              className="py-4"
            />
          </div>
        </div>

        <Button
          onClick={handleDubbing}
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/20 transition-all font-semibold"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Wand2 className="w-5 h-5 mr-2" />
              Start Transcription & Dubbing
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
