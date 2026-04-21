"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { nicheService } from "@/lib/niche-service";
import { Globe, Loader2, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function TrendingPage() {
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [geo, setGeo] = useState("id");

  useEffect(() => {
    loadTrending();
  }, [geo]);

  const loadTrending = async () => {
    setIsLoading(true);
    try {
      const data = await nicheService.getTrending(geo);
      setTrending(data);
    } catch (error) {
      console.error("Failed to load trending:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trending Topics</h1>
          <p className="text-muted-foreground">
            Discover what is trending on Google Trends
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <select
            value={geo}
            onChange={(e) => setGeo(e.target.value)}
            className="border rounded-md px-3 py-2 bg-background"
          >
            <option value="id">Indonesia</option>
            <option value="us">United States</option>
            <option value="global">Global</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trending.map((topic: any, index: number) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="mb-2">
                    #{index + 1}
                  </Badge>
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{topic.title}</CardTitle>
                {topic.traffic && (
                  <CardDescription>
                    Traffic: {topic.traffic.toLocaleString()}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Use This Topic
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
