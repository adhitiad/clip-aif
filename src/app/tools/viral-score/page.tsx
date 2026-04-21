"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { Loader2, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";

export default function ViralScorePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await api.post("/tools/viral-score", {
        title,
        description,
        tags: tags.split(",").map((t) => t.trim()),
      });
      setResult(data.data);
    } catch (error) {
      console.error("Failed to calculate viral score:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const scorePercent = result ? Math.round(result.score || 0) : 0;
  const dashArray = result ? `${(result.score || 0) * 283} 283` : "0 283";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Viral Score Predictor</h1>
        <p className="text-muted-foreground">
          Predict how viral your content will be using AI
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Input Details
            </CardTitle>
            <CardDescription>
              Enter your content details to get a viral prediction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter content title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter content description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  placeholder="gaming, tech, tutorial"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Predict Viral Score
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Prediction Result
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative h-32 w-32">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      className="text-muted"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeDasharray={dashArray}
                      className="text-primary"
                      transform="rotate(-90 50 50)"
                    />
                    <text
                      x="50"
                      y="50"
                      textAnchor="middle"
                      dy=".3em"
                      fontSize="24"
                      fontWeight="bold"
                    >
                      {scorePercent}%
                    </text>
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Viral Potential</span>
                  <span className="font-semibold">
                    {result.viral_potential || "Medium"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Recommendation</span>
                  <span className="font-semibold">
                    {result.recommendation || "Consider optimizing"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
