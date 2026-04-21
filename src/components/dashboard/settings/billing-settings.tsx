"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/authStore";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { CreditCard, Check, Copy, Share2, Star, Zap, Crown, Loader2 } from "lucide-react";

export function BillingSettings() {
  const { user } = useAuthStore();
  const [referralStats, setReferralStats] = useState<any>(null);
  const [isLoadingReferral, setIsLoadingReferral] = useState(true);
  const [isSubscribing, setIsSubscribing] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  const plans = [
    {
      name: "Free",
      price: "$0",
      icon: <Star className="w-5 h-5 text-gray-400" />,
      features: ["5 AI Clips / bln", "Standard AI Models", "720p Resolution"],
      id: "free"
    },
    {
      name: "Premium",
      price: "$29",
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      features: ["Unlimited AI Clips", "Advanced AI Models", "4K Resolution", "AI Dubbing Tool"],
      id: "premium"
    },
    {
      name: "Business",
      price: "$99",
      icon: <Crown className="w-5 h-5 text-purple-400" />,
      features: ["Everything in Premium", "Priority Rendering", "Dedicated API Access", "Custom AI Training"],
      id: "business"
    }
  ];

  useEffect(() => {
    const fetchReferralStats = async () => {
      try {
        const response = await axiosInstance.get("/billing/referral-stats");
        setReferralStats(response.data);
      } catch (error) {
        console.error("Failed to fetch referral stats:", error);
        // Mock data
        setReferralStats({ code: "CLIP-2024-WIN", count: 12, earnings: "$120" });
      } finally {
        setIsLoadingReferral(false);
      }
    };
    fetchReferralStats();
  }, []);

  const handleSubscribe = async (planId: string) => {
    setIsSubscribing(planId);
    try {
      await axiosInstance.post(`/billing/subscribe/${planId}`);
      toast.success(`Berhasil mengajukan upgrade ke ${planId}!`);
    } catch (error) {
      toast.error("Gagal melakukan upgrade.");
    } finally {
      setIsSubscribing(null);
    }
  };

  const copyToClipboard = () => {
    if (referralStats?.code) {
      navigator.clipboard.writeText(referralStats.code);
      setHasCopied(true);
      toast.success("Referral code disalin!");
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Plan & Referral */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-blue-500/20 bg-blue-500/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-400" />
              Paket Saat Ini
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold uppercase tracking-wider">{user?.plan || "Free"}</span>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-transparent">
                Aktif
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Sisa Kredit: <span className="font-bold text-foreground">{user?.credits}</span></p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-purple-500/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Share2 className="w-5 h-5 text-purple-400" />
              Program Referral
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 p-2 rounded-lg bg-black/20 border border-white/10 font-mono text-sm flex items-center justify-center">
                {isLoadingReferral ? <Loader2 className="w-4 h-4 animate-spin" /> : referralStats?.code}
              </div>
              <Button size="icon" variant="outline" onClick={copyToClipboard} className="shrink-0 border-white/10 bg-white/5">
                {hasCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-center">
                 <p className="text-muted-foreground mb-1">Berhasil</p>
                 <p className="text-lg font-bold">{referralStats?.count || 0}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-center">
                 <p className="text-muted-foreground mb-1">Pendapatan</p>
                 <p className="text-lg font-bold text-green-400">{referralStats?.earnings || "$0"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-center">Pilih Paket Langganan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className={`border-white/10 bg-card/30 relative flex flex-col ${user?.plan?.toLowerCase() === plan.id ? 'ring-2 ring-blue-500 shadow-2xl shadow-blue-500/10' : ''}`}>
              {user?.plan?.toLowerCase() === plan.id && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-[10px] font-bold rounded-full uppercase">
                  Paket Anda
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-white/5">
                    {plan.icon}
                  </div>
                  <span className="text-3xl font-bold">{plan.price}<span className="text-xs text-muted-foreground">/bln</span></span>
                </div>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>Cocok untuk kebutuhan {plan.name === 'Free' ? 'awal' : plan.name === 'Premium' ? 'profesional' : 'skala besar'}.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 flex-1">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    {feature}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button 
                  disabled={user?.plan?.toLowerCase() === plan.id || isSubscribing === plan.id}
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full ${user?.plan?.toLowerCase() === plan.id ? 'bg-white/10' : 'bg-blue-600 hover:bg-blue-500'}`}
                  variant={user?.plan?.toLowerCase() === plan.id ? "ghost" : "default"}
                >
                  {isSubscribing === plan.id ? <Loader2 className="w-4 h-4 animate-spin" /> : user?.plan?.toLowerCase() === plan.id ? "Paket Aktif" : "Upgrade Sekarang"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
