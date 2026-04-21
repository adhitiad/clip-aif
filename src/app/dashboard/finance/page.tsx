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
  TrendingUp, 
  TrendingDown,
  Wallet, 
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Plus,
  History,
  FileText,
  Calendar
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { FinanceSummary, FinanceTransaction } from "@/lib/types";
import { formatRupiah, cn } from "@/lib/utils";
import { toast } from "sonner";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function FinancePage() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<FinanceSummary | null>(null);
  const [txType, setTxType] = useState<"income" | "expense">("income");
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/finance/summary");
      setSummary(res.data);
    } catch (error) {
      console.error("Failed to fetch finance summary:", error);
      // toast.error("Gagal mengambil data keuangan");
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "") {
      setFormData(prev => ({ ...prev, amount: "" }));
      return;
    }
    const numValue = parseInt(value);
    setFormData(prev => ({ ...prev, amount: `Rp ${numValue.toLocaleString("id-ID")}` }));
  };

  const handleRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAmount = parseFloat(formData.amount.replace(/\D/g, ""));
    
    if (isNaN(cleanAmount) || cleanAmount <= 0 || !formData.category) {
      toast.error("Lengkapi data transaksi dengan benar");
      return;
    }

    try {
      setIsSubmitting(true);
      await axiosInstance.post("/finance/record", {
        type: txType,
        category: formData.category,
        amount: cleanAmount,
        description: formData.description
      });
      toast.success(`Transaksi ${txType === 'income' ? 'Pemasukan' : 'Pengeluaran'} berhasil dicatat`);
      setFormData({ amount: "", category: "", description: "" });
      fetchSummary();
    } catch (error) {
       // Error handled by interceptor
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && !summary) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 animate-in fade-in duration-700">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent">
          Cash Flow Tracking
        </h1>
        <p className="text-muted-foreground">
          Monitor arus kas masuk dan keluar secara real-time (Owner Only).
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
             <ArrowUpRight className="h-24 w-24" />
           </div>
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium flex items-center gap-2 opacity-90">
               <TrendingUp className="h-4 w-4" /> TOTAL PEMASUKAN
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-3xl font-black">{formatRupiah(summary?.total_income || 0)}</div>
             <div className="text-xs mt-1 text-emerald-100 flex items-center gap-1">
               <Badge className="bg-white/20 hover:bg-white/30 text-[10px] h-4">Gross Revenue</Badge>
             </div>
           </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-gradient-to-br from-rose-500 to-orange-700 text-white overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
             <ArrowDownLeft className="h-24 w-24" />
           </div>
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium flex items-center gap-2 opacity-90">
               <TrendingDown className="h-4 w-4" /> TOTAL PENGELUARAN
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-3xl font-black">{formatRupiah(summary?.total_expense || 0)}</div>
             <div className="text-xs mt-1 text-rose-100 flex items-center gap-1">
               <Badge className="bg-white/20 hover:bg-white/30 text-[10px] h-4">Operational Costs</Badge>
             </div>
           </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-gradient-to-br from-indigo-600 to-purple-800 text-white overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
             <DollarSign className="h-24 w-24" />
           </div>
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium flex items-center gap-2 opacity-90">
               <Wallet className="h-4 w-4" /> NET PROFIT
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-3xl font-black">{formatRupiah(summary?.net_profit || 0)}</div>
             <div className="text-xs mt-1 text-indigo-100 flex items-center gap-1">
               <Badge className="bg-white/20 hover:bg-white/30 text-[10px] h-4">Post-Expense Profit</Badge>
             </div>
           </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Record Transaction Form */}
        <Card className="lg:col-span-2 shadow-2xl border-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Catat Arus Kas
            </CardTitle>
            <CardDescription>
              Input transaksi baru untuk laporan keuangan ClipAIF.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRecord} className="space-y-5">
              <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
                <Button 
                  type="button"
                  variant={txType === "income" ? "default" : "ghost"}
                  onClick={() => setTxType("income")}
                  className={cn(
                    "rounded-md text-xs h-8",
                    txType === "income" && "bg-emerald-600 hover:bg-emerald-700 shadow-md"
                  )}
                >
                  <ArrowUpRight className="h-3 w-3 mr-1" /> Pemasukan
                </Button>
                <Button 
                  type="button"
                  variant={txType === "expense" ? "default" : "ghost"}
                  onClick={() => setTxType("expense")}
                  className={cn(
                    "rounded-md text-xs h-8",
                    txType === "expense" && "bg-rose-600 hover:bg-rose-700 shadow-md"
                  )}
                >
                  <ArrowDownLeft className="h-3 w-3 mr-1" /> Pengeluaran
                </Button>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="amount">Nominal</Label>
                <Input 
                  id="amount"
                  placeholder="Rp 0"
                  value={formData.amount}
                  onChange={handleAmountChange}
                  className="font-bold text-lg h-12"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category">Kategori</Label>
                <Input 
                  id="category"
                  placeholder="Misal: Subscription, Hosting, Iklan..."
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">Keterangan (Opsional)</Label>
                <textarea 
                  id="description"
                  placeholder="Detail transaksi..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11"
                disabled={isSubmitting || !formData.amount}
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Transaksi"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Transactions List */}
        <Card className="lg:col-span-3 shadow-2xl border-muted/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Aktivitas Terbaru
              </CardTitle>
              <CardDescription>
                10 transaksi terakhir yang tercatat di sistem.
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={fetchSummary}>
              Refresh
            </Button>
            </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="pl-6">Data</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead className="text-right pr-6">Nominal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!summary?.recent_transactions.length ? (
                    <TableRow>
                      <TableCell colSpan={3} className="h-48 text-center text-muted-foreground">
                        <FileText className="h-8 w-8 mx-auto mb-2 opacity-20" />
                        Belum ada riwayat transaksi.
                      </TableCell>
                    </TableRow>
                  ) : (
                    summary.recent_transactions.map((tx) => (
                      <TableRow key={tx.id} className="group transition-colors hover:bg-muted/30">
                        <TableCell className="pl-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "p-2 rounded-lg",
                              tx.type === "income" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                            )}>
                              {tx.type === "income" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-sm leading-tight">{tx.description || "Tanpa keterangan"}</span>
                              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-2.5 w-2.5" />
                                {format(new Date(tx.created_at), "dd MMM yyyy, HH:mm", { locale: id })}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal border-slate-200">
                             {tx.category}
                          </Badge>
                        </TableCell>
                        <TableCell className={cn(
                          "text-right pr-6 font-bold",
                          tx.type === "income" ? "text-emerald-600" : "text-rose-600"
                        )}>
                          {tx.type === "income" ? "+" : "-"} {formatRupiah(tx.amount)}
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
    </div>
  );
}
