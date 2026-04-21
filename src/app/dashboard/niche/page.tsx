"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingCard } from "@/components/dashboard/niche/trending-card";
import { VideoCard, VideoResult } from "@/components/dashboard/niche/video-card";
import axiosInstance from "@/lib/axios";
import { 
  Search, 
  TrendingUp, 
  Sparkles, 
  Video, 
  Loader2, 
  AlertCircle 
} from "lucide-react";

export default function NichePage() {
  const [activeTab, setActiveTab] = useState("trending");
  const [trendingData, setTrendingData] = useState<any[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [videoResults, setVideoResults] = useState<VideoResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState({
    trending: false,
    suggest: false,
    search: false
  });
  const [error, setError] = useState<string | null>(null);

  // Initial load for trending and suggestions
  useEffect(() => {
    fetchTrending();
    fetchSuggestions();
  }, []);

  const fetchTrending = async () => {
    try {
      setLoading(prev => ({ ...prev, trending: true }));
      const res = await axiosInstance.get("/niche/trending");
      setTrendingData(res.data);
    } catch (err) {
      console.error("Error fetching trending:", err);
    } finally {
      setLoading(prev => ({ ...prev, trending: false }));
    }
  };

  const fetchSuggestions = async () => {
    try {
      setLoading(prev => ({ ...prev, suggest: true }));
      const res = await axiosInstance.get("/niche/suggest");
      setAiSuggestions(res.data);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    } finally {
      setLoading(prev => ({ ...prev, suggest: false }));
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(prev => ({ ...prev, search: true }));
      setError(null);
      const res = await axiosInstance.get(`/niche/find-videos?q=${encodeURIComponent(searchQuery)}`);
      setVideoResults(res.data);
    } catch (err: any) {
      setError("Gagal melakukan pencarian video. Coba lagi nanti.");
      console.error("Search error:", err);
    } finally {
      setLoading(prev => ({ ...prev, search: false }));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Niche Discovery</h1>
          <p className="text-sm md:text-base text-muted-foreground">Temukan konten viral dan niche terbaik untuk channel AI Anda.</p>
        </div>
        <div className="flex items-center self-start md:self-auto gap-2 text-xs md:text-sm text-primary font-medium bg-primary/5 px-3 md:px-4 py-2 rounded-full border border-primary/10">
          <Sparkles className="h-4 w-4 shrink-0" />
          AI Powered Insights
        </div>
      </div>

      <Tabs defaultValue="trending" className="w-full" onValueChange={setActiveTab}>
        <ScrollArea className="w-full">
          <TabsList className="flex w-max lg:w-[600px] h-12 p-1.5 rounded-2xl bg-muted/50 border mb-2">
            <TabsTrigger value="trending" className="rounded-xl gap-2 h-full px-4 data-[state=active]:shadow-lg transition-all">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="suggest" className="rounded-xl gap-2 h-full px-4 data-[state=active]:shadow-lg transition-all">
              <Sparkles className="h-4 w-4" />
              AI Suggestions
            </TabsTrigger>
            <TabsTrigger value="search" className="rounded-xl gap-2 h-full px-4 data-[state=active]:shadow-lg transition-all">
              <Video className="h-4 w-4" />
              Find Content
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" className="h-1.5" />
        </ScrollArea>

        <div className="mt-8">
          {/* TAB 1: TRENDING */}
          <TabsContent value="trending" className="space-y-6 focus-visible:outline-none">
            {loading.trending ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => <VideoCard.Skeleton key={i} />)}
              </div>
            ) : trendingData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trendingData.map((item, i) => (
                  <TrendingCard key={i} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState message="Tidak ada tren terbaru yang ditemukan." />
            )}
          </TabsContent>

          {/* TAB 2: AI SUGGESTIONS */}
          <TabsContent value="suggest" className="space-y-6 focus-visible:outline-none">
            {loading.suggest ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-40 w-full rounded-2xl" />)}
              </div>
            ) : aiSuggestions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiSuggestions.map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl border bg-card hover:border-primary/50 transition-all">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                       <span className="text-primary">✨</span> {item.niche}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.keywords?.map((kw: string, idx: number) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-muted font-medium">#{kw}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message="AI sedang memikirkan saran terbaik untuk Anda..." />
            )}
          </TabsContent>

          {/* TAB 3: FIND VIDEOS */}
          <TabsContent value="search" className="space-y-8 focus-visible:outline-none">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto w-full">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  className="pl-12 h-14 rounded-2xl text-lg shadow-xl shadow-primary/5 border-primary/10 focus:ring-primary/20 transition-all"
                  placeholder="Cari topik video YouTube (contoh: 'Top AI Tools 2024')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  disabled={loading.search}
                  className="absolute right-2 top-2 h-10 rounded-xl px-6 bg-primary hover:bg-primary/90"
                >
                  {loading.search ? <Loader2 className="h-4 w-4 animate-spin" /> : "Cari"}
                </Button>
              </div>
            </form>

            {error && (
              <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm border border-red-100 dark:border-red-900/10">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            {loading.search ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <VideoCard.Skeleton key={i} />)}
              </div>
            ) : videoResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-5 duration-500">
                {videoResults.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : searchQuery && !loading.search ? (
              <div className="text-center py-20 space-y-4">
                <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto opacity-50">
                  <Video className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium">Banyak video menarik menunggu Anda</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">Gunakan kolom pencarian di atas untuk menemukan referensi video YouTube.</p>
              </div>
            ) : null}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-20 border-2 border-dashed rounded-3xl opacity-50">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
