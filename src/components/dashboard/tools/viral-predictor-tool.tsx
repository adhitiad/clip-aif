"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, AlertCircle, CheckCircle2, Info, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export function ViralPredictorTool() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: 60,
    has_broll: true,
  });
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async () => {
    if (!formData.title || !formData.description) {
      toast.error("Mohon lengkapi judul dan deskripsi.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/tools/viral-score", formData);
      setResult(response.data);
      toast.success("Analisis viralitas selesai!");
    } catch (error) {
      console.error("Prediction failed:", error);
      toast.error("Gagal menganalisis viralitas.");
      // Mock result for demo
      setResult({
        score: 7.8,
        recommendation: "Gunakan hook yang lebih kuat di 3 detik pertama. Tambahkan musik yang sedang tren.",
        viral_factor: "Topik ini sedang naik daun di kategori 'Self Improvement'.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 6.5) return "bg-green-500";
    if (score >= 4.0) return "bg-orange-500";
    return "bg-red-500";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 6.5) return <CheckCircle2 className="w-5 h-5 text-green-400" />;
    return <AlertCircle className="w-5 h-5 text-orange-400" />;
  };

  return (
    <Card className="border-purple-500/20 bg-card/50 backdrop-blur-sm overflow-hidden group h-full">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <TrendingUp className="w-5 h-5" />
          Viral Score Predictor
        </CardTitle>
        <CardDescription>
          Prediksi potensi viralitas video Anda sebelum dipublikasi.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Video</Label>
            <Input
              id="title"
              placeholder="Masukkan judul menarik..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-background/50 border-white/10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi / Script</Label>
            <Textarea
              id="description"
              placeholder="Deskripsikan isi video atau rekam script..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-background/50 border-white/10 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Durasi (detik)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="bg-background/50 border-white/10"
              />
            </div>
            <div className="flex items-center space-x-2 pt-8">
              <Checkbox
                id="broll"
                checked={formData.has_broll}
                onCheckedChange={(checked) => setFormData({ ...formData, has_broll: !!checked })}
              />
              <label
                htmlFor="broll"
                className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Memiliki B-Roll
              </label>
            </div>
          </div>
        </div>

        <Button
          onClick={handlePredict}
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow-lg shadow-purple-500/20"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Analyze Viral Potential
            </>
          )}
        </Button>

        {/* Results Section */}
        {result && (
          <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/5 space-y-4 animate-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {getScoreIcon(result.score)}
                <span className="font-bold text-lg">Prediksi Skor:</span>
              </div>
              <Badge 
                className={`${getScoreColor(result.score)} text-white border-transparent`}
              >
                {result.score >= 6.5 ? 'Potensi Tinggi' : 'Potensi Menengah'}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono">
                <span>Viral Score</span>
                <span className="font-bold text-blue-400">{result.score}/10</span>
              </div>
              <Progress value={result.score * 10} className={`h-2 ${getScoreColor(result.score)}`} />
            </div>

            <div className="pt-4 border-t border-white/5 space-y-3">
              <div className="flex gap-3">
                <Info className="w-4 h-4 text-purple-400 shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-purple-300">Rekomendasi AI:</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{result.recommendation}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <TrendingUp className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-blue-300">Viral Factor:</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{result.viral_factor}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
