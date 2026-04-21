"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { ShieldAlert, UserPlus, Coins, RefreshCw, Loader2, Sparkles } from "lucide-react";

export function GodsMode() {
  const [isRetraining, setIsRetraining] = useState(false);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [adjustData, setAdjustData] = useState({
    user_id: "",
    amount: 0,
    reason: ""
  });

  const handleAdjustCredits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustData.user_id || adjustData.amount === 0) {
      toast.error("Mohon isi ID User dan jumlah kredit.");
      return;
    }
    setIsAdjusting(true);
    try {
      await axiosInstance.post("/dashboard/godsmode/adjust-credits", adjustData);
      toast.success(`Berhasil menyesuaikan kredit untuk User ${adjustData.user_id}`);
      setAdjustData({ user_id: "", amount: 0, reason: "" });
    } catch (error) {
      toast.error("Gagal menyesuaikan kredit.");
    } finally {
      setIsAdjusting(false);
    }
  };

  const handleRetrainML = async () => {
    setIsRetraining(true);
    try {
      await axiosInstance.post("/dashboard/godsmode/retrain-viral-model");
      toast.success("Pelatihan ulang model ML Viral Predictor dimulai di background.");
    } catch (error) {
      toast.error("Gagal memicu pelatihan ulang model.");
    } finally {
      setIsRetraining(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Credit Adjustment Form */}
      <Card className="border-red-500/20 bg-red-500/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            Adjust User Credits
          </CardTitle>
          <CardDescription>Tambah atau kurangi kredit user secara manual (Gods Mode).</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdjustCredits} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>User ID / Email</Label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    value={adjustData.user_id}
                    onChange={(e) => setAdjustData({ ...adjustData, user_id: e.target.value })}
                    placeholder="nama_user atau email" 
                    className="pl-9 bg-black/40 border-white/10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Amount</Label>
                <div className="relative">
                  <Coins className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="number"
                    value={adjustData.amount}
                    onChange={(e) => setAdjustData({ ...adjustData, amount: parseInt(e.target.value) || 0 })}
                    placeholder="Jumlah (contoh: 100 or -50)" 
                    className="pl-9 bg-black/40 border-white/10"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Reason (Internal Note)</Label>
              <Input 
                value={adjustData.reason}
                onChange={(e) => setAdjustData({ ...adjustData, reason: e.target.value })}
                placeholder="Alasan perubahan kredit..." 
                className="bg-black/40 border-white/10"
              />
            </div>
            <Button 
                type="submit" 
                disabled={isAdjusting}
                className="w-full bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/20"
            >
              {isAdjusting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ShieldAlert className="w-4 h-4 mr-2" />}
              Hacker Spirit: Apply Adjustment
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* ML & System Control */}
      <Card className="border-blue-500/20 bg-blue-500/5 backdrop-blur-sm flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            AI Intelligence Control
          </CardTitle>
          <CardDescription>Otomasi dan pemeliharaan model kecerdasan buatan.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-center space-y-6">
           <div className="text-center space-y-2">
              <div className="p-4 rounded-full bg-blue-500/10 w-16 h-16 mx-auto flex items-center justify-center">
                 <RefreshCw className={`w-8 h-8 text-blue-400 ${isRetraining ? 'animate-spin' : ''}`} />
              </div>
              <h4 className="font-bold text-lg">Retrain Viral ML Model</h4>
              <p className="text-sm text-gray-400 max-w-xs mx-auto">Memicu proses pelatihan ulang model prediksi viral menggunakan data feedback terbaru.</p>
           </div>
        </CardContent>
        <CardFooter>
           <Button 
             variant="outline" 
             onClick={handleRetrainML} 
             disabled={isRetraining}
             className="w-full border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 h-14 text-lg font-bold"
           >
             {isRetraining ? (
               <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Training in Progress...</>
             ) : (
               "Picu Retrain Model Sekarang"
             )}
           </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
