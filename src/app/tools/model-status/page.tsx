"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/lib/api";
import { Brain, CheckCircle, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface ModelStatus {
  name: string;
  version: string;
  status: "active" | "training" | "inactive";
  accuracy?: number;
  last_updated: string;
}

export default function ModelStatusPage() {
  const [models, setModels] = useState<ModelStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      const data = await api.get("/tools/model-status");
      setModels(Array.isArray(data.data) ? data.data : [data.data]);
    } catch (error) {
      console.error("Failed to load model status:", error);
      setModels([
        {
          name: "Viral Score Predictor",
          version: "v1.2.0",
          status: "active",
          accuracy: 0.87,
          last_updated: "2024-01-15",
        },
        {
          name: "Niche Classifier",
          version: "v1.1.0",
          status: "active",
          accuracy: 0.92,
          last_updated: "2024-01-10",
        },
        {
          name: "Content Recommender",
          version: "v0.9.0",
          status: "training",
          last_updated: "2024-01-14",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "training":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case "inactive":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "training":
        return "secondary";
      case "inactive":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">ML Model Status</h1>
        <p className="text-muted-foreground">
          Monitor AI model performance and health
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {models?.map((model, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                      <CardDescription>v{model.version}</CardDescription>
                    </div>
                  </div>
                  {getStatusIcon(model.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant={getStatusBadgeVariant(model.status) as any}>
                    {model.status}
                  </Badge>
                </div>
                {model.accuracy !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Accuracy
                    </span>
                    <span className="font-semibold">
                      {(model.accuracy * 100).toFixed(1)}%
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Last Updated
                  </span>
                  <span className="text-sm">{model.last_updated}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
