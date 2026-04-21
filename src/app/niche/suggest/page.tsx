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
import { nicheService } from "@/lib/niche-service";
import { Lightbulb, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";

export default function SuggestNichePage() {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setIsLoading(true);
    try {
      const data = await nicheService.suggestNiche(keyword);
      setSuggestions(data);
    } catch (error) {
      console.error("Failed to get niche suggestions:", error);
      setSuggestions(["AI video editing", "Tech reviews", "Gaming highlights"]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Niche Suggester</h1>
        <p className="text-muted-foreground">
          Get AI-powered niche recommendations for your content
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Enter a Topic
            </CardTitle>
            <CardDescription>
              Provide a keyword or topic to get niche suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="keyword">Keyword or Topic</Label>
                <Input
                  id="keyword"
                  placeholder="e.g., gaming, cooking, tech"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !keyword.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Suggestions
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suggested Niches</CardTitle>
            <CardDescription>
              AI-generated niche ideas based on your input
            </CardDescription>
          </CardHeader>
          <CardContent>
            {suggestions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No suggestions yet. Enter a keyword to get started.
              </p>
            ) : (
              <div className="space-y-3">
                {suggestions.map((niche, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <span className="font-medium">{niche}</span>
                    <Button variant="outline" size="sm">
                      Use
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
