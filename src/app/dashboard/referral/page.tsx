"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Coins, 
  Copy, 
  CheckCircle2, 
  Share2,
  Loader2,
  Gift,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface ReferralStats {
  referral_code: string;
  total_referred: number;
  credits_earned: number;
}

export default function ReferralPage() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get("/billing/referral-stats");
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch referral stats:", error);
        // Fallback for demo/development
        setStats({
          referral_code: "USER-CLIPAIF-2024",
          total_referred: 12,
          credits_earned: 600
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const referralLink = `https://clipaif.com/signup?ref=${stats?.referral_code || ""}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success(t("referral.success_copy"));
    setTimeout(() => setCopied(false), 2000);
  };

  const shareSocial = (platform: string) => {
    const text = encodeURIComponent(t("referral.share_message"));
    const url = encodeURIComponent(referralLink);
    
    let shareUrl = "";
    if (platform === "whatsapp") {
      shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    } else if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }
    
    window.open(shareUrl, "_blank");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("referral.title")}</h1>
        <p className="text-muted-foreground">{t("referral.desc")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Referral Card */}
        <Card className="md:col-span-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Gift className="w-32 h-32 text-primary" />
          </div>
          <CardHeader>
            <CardTitle>{t("referral.share_title")}</CardTitle>
            <CardDescription>
              {t("referral.share_desc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4">
              <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center gap-4">
                <span className="text-sm font-medium text-primary uppercase tracking-widest">{t("referral.your_code")}</span>
                <span className="text-4xl md:text-5xl font-black tracking-tighter text-foreground selection:bg-primary/30">
                  {stats?.referral_code}
                </span>
              </div>
              
              <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-xl border border-white/5">
                <input 
                  type="text" 
                  readOnly 
                  value={referralLink}
                  className="flex-1 bg-transparent px-3 text-sm outline-none font-mono"
                />
                <Button 
                  onClick={copyToClipboard} 
                  variant={copied ? "outline" : "default"}
                  className="rounded-lg gap-2 min-w-[120px]"
                >
                  {copied ? (
                    <><CheckCircle2 className="w-4 h-4" /> {t("referral.copied")}</>
                  ) : (
                    <><Copy className="w-4 h-4" /> {t("referral.copy_link")}</>
                  )}
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <span className="text-sm text-muted-foreground w-full text-center md:w-auto">{t("referral.share_to")}</span>
              <Button 
                variant="outline" 
                className="bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20 hover:bg-[#25D366]/20"
                onClick={() => shareSocial("whatsapp")}
              >
                <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp
              </Button>
              <Button 
                variant="outline" 
                className="bg-[#1DA1F2]/10 text-[#1DA1F2] border-[#1DA1F2]/20 hover:bg-[#1DA1F2]/20"
                onClick={() => shareSocial("twitter")}
              >
                <Share2 className="w-4 h-4 mr-2" /> Twitter / X
              </Button>
              <Button 
                variant="outline" 
                className="bg-[#4267B2]/10 text-[#4267B2] border-[#4267B2]/20 hover:bg-[#4267B2]/20"
                onClick={() => shareSocial("facebook")}
              >
                <Share2 className="w-4 h-4 mr-2" /> Facebook
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <Card className="hover:border-primary/30 transition-all group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("referral.total_referred")}</CardTitle>
            <Users className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.total_referred}</div>
            <p className="text-xs text-muted-foreground mt-1">{t("referral.total_referred_desc")}</p>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/30 transition-all group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("referral.credits_earned")}</CardTitle>
            <Coins className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+{stats?.credits_earned}</div>
            <p className="text-xs text-muted-foreground mt-1">{t("referral.credits_earned_desc")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
