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
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Plus, 
  Calendar, 
  Tag, 
  FileText,
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  BarChart3
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { FinanceSummary, FinanceRecordRequest, FinanceTransaction } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function FinanceDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<FinanceSummary | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [issubmitting, setIssubmitting] = useState(false);
  
  // Form State
  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useAuthStore();
  const router = useRouter();

  // Role Protection
  useEffect(() => {
    if (user && user.role !== "owner") {
      router.push("/dashboard");
    }
  }, [user, router]);

  useEffect(() => {
    fetchFinanceSummary();
  }, []);

  const fetchFinanceSummary = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/finance/summary");
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch finance summary:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecordTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount.replace(/\D/g, ""));
    
    if (!category || isNaN(numAmount) || numAmount <= 0) {
      toast.error("Mohon lengkapi data transaksi dengan benar");
      return;
    }

    try {
      setIssubmitting(true);
      await axiosInstance.post("/finance/record", {
        type,
        category,
        amount: numAmount,
        description
      });
      
      toast.success("Transaksi berhasil dicatat!");
      setIsDialogOpen(false);
      resetForm();
      fetchFinanceSummary(); // Refresh data manually as requested (tanpa runtime SWR)
    } catch (error) {
      // Error handled by axios interceptor
    } finally {
      setIssubmitting(false);
    }
  };

  const resetForm = () => {
    setType("income");
    setCategory("");
    setAmount("");
    setDescription("");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "") {
      setAmount("");
      return;
    }
    const numValue = parseInt(value);
    setAmount(`Rp ${numValue.toLocaleString("id-ID")}`);
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data || user?.role !== "owner") return null;

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Keuangan</h1>
          <p className="text-muted-foreground">
            Pantau arus kas masuk dan keluar untuk performa bisnis yang lebih baik.
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 shadow-md">
              <Plus className="mr-2 h-4 w-4" />
              Catat Transaksi Manual
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>Catat Transaksi</DialogTitle>
              <DialogDescription>
                Masukkan detail transaksi untuk memperbarui arus kas SaaS.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleRecordTransaction} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Tipe Transaksi</Label>
                <Select value={type} onValueChange={(v: "income" | "expense") => setType(v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Pemasukan</SelectItem>
                    <SelectItem value="expense">Pengeluaran</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Input 
                  id="category" 
                  placeholder="Misal: Subscription, API Cost, Gaji" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Nominal</Label>
                <Input 
                  id="amount" 
                  placeholder="Rp 0" 
                  value={amount}
                  onChange={handleAmountChange}
                  className="font-semibold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi (Opsional)</Label>
                <Input 
                  id="description" 
                  placeholder="Detail singkat transaksi" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                <Button type="submit" disabled={issubmitting}>
                  {issubmitting ? "Menyimpan..." : "Simpan Transaksi"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-emerald-500/10 via-background to-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{formatRupiah(data.total_income)}</div>
            <p className="text-xs text-muted-foreground mt-1">Akumulasi uang masuk bulan ini</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-rose-500/10 via-background to-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">{formatRupiah(data.total_expense)}</div>
            <p className="text-xs text-muted-foreground mt-1">Akumulasi biaya operasional</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-blue-500/10 via-background to-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keuntungan Bersih</CardTitle>
            <Wallet className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatRupiah(data.net_profit)}</div>
            <p className="text-xs text-muted-foreground mt-1">Laba bersih setelah pengeluaran</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8">
        {/* Cash Flow Chart */}
        <Card className="shadow-lg border-muted/20 overflow-hidden">
          <CardHeader className="border-b bg-muted/5">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Perbandingan Arus Kas
            </CardTitle>
            <CardDescription>
              Tren bulanan untuk pemasukan dan pengeluaran.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.chart_data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `Rp ${value / 1000000}jt`}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => formatRupiah(value)}
                />
                <Legend iconType="circle" />
                <Bar dataKey="income" name="Pemasukan" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="expense" name="Pengeluaran" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="shadow-lg border-muted/20">
          <CardHeader>
            <CardTitle>Transaksi Terakhir</CardTitle>
            <CardDescription>
              Daftar kegiatan keuangan yang tercatat baru-baru ini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[150px]">Tanggal</TableHead>
                    <TableHead>Tipe</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead className="font-semibold text-right">Jumlah</TableHead>
                    <TableHead>Deskripsi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.recent_transactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        Belum ada transaksi tercatat.
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.recent_transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {new Date(transaction.date).toLocaleDateString("id-ID")}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={transaction.type === "income" ? "default" : "destructive"}
                            className={transaction.type === "income" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                          >
                            {transaction.type === "income" ? "Income" : "Expense"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center gap-2">
                            <Tag className="h-3 w-3 text-muted-foreground" />
                            {transaction.category}
                          </span>
                        </TableCell>
                        <TableCell className={`text-right font-bold ${transaction.type === "income" ? "text-emerald-600" : "text-rose-600"}`}>
                          {transaction.type === "income" ? "+" : "-"} {formatRupiah(transaction.amount)}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          <span className="flex items-center gap-2">
                            <FileText className="h-3 w-3 text-muted-foreground" />
                            {transaction.description || "-"}
                          </span>
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
