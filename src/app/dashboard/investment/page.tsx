"use client";

import React, { useEffect, useState, useMemo } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from "recharts";
import { 
  TrendingUp, 
  Wallet, 
  PieChart as PieChartIcon, 
  Info,
  ChevronRight,
  Coins,
  User,
  Mail,
  Star,
  Users,
  Gem
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { InvestmentStatus, Shareholder } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";
import { toast } from "sonner";

export default function InvestmentPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<InvestmentStatus | null>(null);
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [investAmount, setInvestAmount] = useState<string>("");
  const [issubmitting, setIssubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statusRes, shareholdersRes] = await Promise.all([
        axiosInstance.get("/investment/status"),
        axiosInstance.get("/investment/shareholders")
      ]);
      setData(statusRes.data);
      setShareholders(shareholdersRes.data);
    } catch (error) {
      console.error("Failed to fetch investment data:", error);
    } finally {
      setLoading(false);
    }
  };

  const shareData = useMemo(() => {
    if (!data) return [];
    return [
      { name: "Founder", value: data.founder_share, color: "#22c55e" },
      { name: "Terjual", value: data.investors_share, color: "#3b82f6" },
      { name: "Tersedia", value: data.available_share, color: "#94a3b8" },
    ];
  }, [data]);

  const estimatedShare = useMemo(() => {
    const amount = parseFloat(investAmount.replace(/\D/g, ""));
    if (!data || isNaN(amount) || amount <= 0) return 0;
    return (amount / data.valuation) * 100;
  }, [data, investAmount]);

  const handleInvest = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(investAmount.replace(/\D/g, ""));
    
    if (isNaN(amount) || amount <= 0) {
      toast.error("Masukkan nominal investasi yang valid");
      return;
    }

    try {
      setIssubmitting(true);
      await axiosInstance.post("/investment/buy", { invest_amount: amount });
      toast.success("Investasi berhasil dilakukan! Akun Anda kini memiliki plan ENTERPRISE.");
      setInvestAmount("");
      fetchData(); // Refresh all data
    } catch (error) {
      // Error handled by interceptor
    } finally {
      setIssubmitting(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "") {
      setInvestAmount("");
      return;
    }
    const numValue = parseInt(value);
    setInvestAmount(`Rp ${numValue.toLocaleString("id-ID")}`);
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Micro-Investment</h1>
        <p className="text-muted-foreground">
          Kelola kepemilikan saham dan dukung ekosistem AI kita melalui Urun Dana.
        </p>
      </div>

      {/* Overview & Form Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: Pie Chart */}
        <Card className="shadow-lg border-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-primary" />
              Alokasi Saham
            </CardTitle>
            <CardDescription>
              Representasi visual dari distribusi kepemilikan SaaS saat ini.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={shareData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {shareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `${value.toFixed(2)}%`}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <div className="px-6 pb-6 grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Valuasi Total</p>
              <p className="text-lg font-bold">{formatRupiah(data.valuation)}</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/10">
              <p className="text-[10px] uppercase font-bold text-emerald-600 tracking-tighter">Dana Terkumpul</p>
              <p className="text-lg font-bold text-emerald-700">{formatRupiah(data.total_collected)}</p>
            </div>
          </div>
        </Card>

        {/* Right: Investment Form */}
        <Card className="shadow-lg border-muted/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Gem className="h-24 w-24" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-600">
              <Coins className="h-5 w-5" />
              Beli Saham Urun Dana
            </CardTitle>
            <CardDescription>
              Investasikan modal Anda dan jadilah bagian dari perjalanan kami.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInvest} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-semibold">Nominal Investasi</Label>
                <Input
                  id="amount"
                  placeholder="Contoh: Rp 1.000.000"
                  value={investAmount}
                  onChange={handleAmountChange}
                  className="pl-4 py-8 text-2xl font-bold border-indigo-200 focus:border-indigo-500 bg-indigo-50/20"
                />
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-200">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-500/20 p-2 rounded-lg">
                    <Star className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-amber-900">Penawaran Eksklusif</p>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Dengan berinvestasi, Anda akan otomatis di-upgrade ke plan <span className="font-bold underline">ENTERPRISE</span> seumur hidup.
                    </p>
                  </div>
                </div>
                {estimatedShare > 0 && (
                  <div className="mt-4 pt-4 border-t border-amber-200/50">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground uppercase">Estimasi Kepemilikan:</span>
                      <span className="text-lg font-black text-indigo-600">{estimatedShare.toFixed(4)}%</span>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full py-8 text-xl font-black shadow-xl bg-indigo-600 hover:bg-indigo-700 transition-all active:scale-95"
                disabled={issubmitting || !investAmount || estimatedShare === 0}
              >
                {issubmitting ? "Memproses..." : "Investasi Sekarang"}
                <ChevronRight className="ml-2 h-6 w-6" />
              </Button>
            </form>
          </CardContent>
          <div className="px-6 pb-4">
             <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
               <TrendingUp className="h-3 w-3" /> NILAI INVESTASI DAPAT BERTAMBAH SEIRING KENAIKAN VALUASI
             </p>
          </div>
        </Card>
      </div>

      {/* Bottom: Shareholders Directory */}
      <Card className="shadow-lg border-muted/20">
        <CardHeader className="border-b bg-muted/5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Shareholders Directory
              </CardTitle>
              <CardDescription>
                Daftar investor resmi yang telah berkontribusi dalam Urun Dana.
              </CardDescription>
            </div>
            <Badge variant="outline" className="px-3 py-1 bg-white border-primary/20 text-primary">
              <User className="h-3 w-3 mr-1" /> {shareholders.length} Investors
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="pl-6 w-[250px]">Investor Email</TableHead>
                  <TableHead>Role & Plan</TableHead>
                  <TableHead className="text-right">Invested Amount</TableHead>
                  <TableHead className="text-right pr-6">Ownership (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shareholders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                      Belum ada investor untuk periode ini.
                    </TableCell>
                  </TableRow>
                ) : (
                  shareholders.map((investor) => (
                    <TableRow key={investor.id} className="hover:bg-muted/20 transition-colors">
                      <TableCell className="pl-6 font-medium">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Mail className="h-4 w-4 text-primary" />
                          </div>
                          <span>{investor.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {investor.role === "owner" && (
                            <Badge className="bg-slate-950 text-white border-transparent">
                              OWNER
                            </Badge>
                          )}
                          <Badge 
                            className={
                              investor.plan === "enterprise" 
                                ? "bg-gradient-to-r from-amber-500 to-purple-600 border-none shadow-sm" 
                                : "bg-blue-100 text-blue-700 hover:bg-blue-100 border-none"
                            }
                          >
                            {investor.plan.toUpperCase()}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatRupiah(investor.invested_amount)}
                      </TableCell>
                      <TableCell className="text-right pr-6 text-indigo-600 font-bold">
                        {investor.ownership_percentage.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
