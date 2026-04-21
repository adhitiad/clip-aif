"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  Sparkles, 
  Languages, 
  BarChart, 
  Check, 
  ArrowRight, 
  Play, 
  Menu, 
  X,
  CreditCard,
  Zap,
  Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axiosInstance from "@/lib/axios";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axiosInstance.get("/billing/plans");
        setPlans(response.data);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
        // Fallback default plans
        setPlans([
          { id: "free", name: "Free", price: "$0", features: ["5 AI Clips / bln", "Standard AI Models", "720p Resolution"] },
          { id: "premium", name: "Premium", price: "$29", features: ["Unlimited AI Clips", "Advanced AI Models", "4K Resolution", "AI Dubbing Tool"], popular: true },
          { id: "business", name: "Business", price: "$99", features: ["Everything in Premium", "Priority Rendering", "Dedicated API Access", "Custom AI Training"] }
        ]);
      } finally {
        setIsLoadingPlans(false);
      }
    };
    fetchPlans();
  }, []);

  const features = [
    {
      title: "Google Trends Discovery",
      desc: "Temukan topik viral dari Google Trends secara real-time untuk konten yang relevan.",
      icon: <TrendingUp className="w-6 h-6 text-blue-400" />
    },
    {
      title: "AI Niche Strategist",
      desc: "Analisis cerdas untuk menentukan niche konten dengan potensi pertumbuhan tertinggi.",
      icon: <Sparkles className="w-6 h-6 text-purple-400" />
    },
    {
      title: "Auto-Dubbing",
      desc: "Alih suara otomatis ke berbagai bahasa dengan mempertahankan emosi asli.",
      icon: <Languages className="w-6 h-6 text-green-400" />
    },
    {
      title: "Viral Score Predictor",
      desc: "Prediksi potensi viralitas video Anda sebelum dipublikasikan menggunakan AI.",
      icon: <BarChart className="w-6 h-6 text-orange-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter">ClipAIF</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <div className="h-4 w-[1px] bg-white/10" />
            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
            <Link href="/register">
              <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 w-full bg-black border-b border-white/10 p-6 space-y-4 animate-in slide-in-from-top-2">
            <Link href="#features" className="block text-lg" onClick={() => setIsMenuOpen(false)}>Features</Link>
            <Link href="#pricing" className="block text-lg" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
            <hr className="border-white/10" />
            <Link href="/login" className="block text-lg">Login</Link>
            <Link href="/register">
              <Button className="w-full bg-blue-600">Get Started Free</Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Dynamic Mesh Gradient Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_-20%,rgba(37,99,235,0.15),transparent_50%)]" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[0%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto px-6 text-center space-y-8">
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20 px-4 py-1 rounded-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Powered by Next-Gen AI
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 leading-[1.1]">
            Ultimate <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">AI Clipper</span> SaaS
          </h1>
          
          <p className="max-w-2xl mx-auto text-gray-400 text-base md:text-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 px-4">
            Ubah video panjang menjadi konten viral berdurasi pendek dalam hitungan detik. Biarkan AI kami bekerja, Anda cukup melihat hasilnya.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 rounded-full px-8 h-12 text-lg shadow-xl shadow-blue-600/20 group">
                Get Started for Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 rounded-full px-8 h-12 text-lg">
              <Play className="mr-2 w-4 h-4 fill-white" />
              Watch Demo
            </Button>
          </div>

          {/* Floating UI Dashboard Preview */}
          <div className="mt-16 relative mx-auto max-w-5xl rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-2 animate-in fade-in zoom-in duration-1000 delay-700">
             <div className="aspect-video bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5 relative">
                {/* Mock UI Elements */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5" />
                <div className="absolute top-4 left-4 flex gap-2">
                   <div className="w-12 h-2 rounded bg-white/10" />
                   <div className="w-8 h-2 rounded bg-white/5" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center animate-pulse">
                      <Zap className="w-8 h-8 text-blue-500" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Supercharge Kreativitasmu</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">Toolkit lengkap berbasis AI untuk membantu Anda mendominasi media sosial.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div 
                key={i} 
                className="group p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:-translate-y-1"
              >
                <div className="mb-6 p-4 rounded-2xl bg-white/5 inline-block group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />
        
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16 px-4">
            <h2 className="text-2xl md:text-5xl font-bold tracking-tight">Pilih Paket Kesuksesanmu</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg">Dari pemula hingga pro, kami punya paket yang tepat untuk Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((p, i) => (
              <Card 
                key={i} 
                className={`relative border-white/10 bg-black/40 backdrop-blur-xl flex flex-col group transition-all duration-500 hover:border-blue-500/50 ${p.popular ? 'ring-2 ring-blue-600 scale-105' : ''}`}
              >
                {p.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-lg shadow-blue-600/20">
                    Most Popular
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-2xl pt-2">{p.name}</CardTitle>
                  <CardDescription>
                     <span className="text-4xl font-bold text-white tracking-tight">{p.price}</span>
                     <span className="text-gray-500 ml-1">/bulan</span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4 flex-1">
                  {p.features.map((feat: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-gray-400 group-hover:text-gray-300">
                      <Check className="w-5 h-5 text-blue-500 shrink-0" />
                      {feat}
                    </div>
                  ))}
                </CardContent>
                
                <CardFooter>
                  <Link href="/register" className="w-full">
                    <Button className={`w-full h-12 rounded-xl text-lg font-semibold transition-all ${p.popular ? 'bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/10' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
                      {p.id === 'free' ? 'Get Started' : 'Upgrade Plan'}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 text-center space-y-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(white,transparent_80%)]" />
                <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-white relative z-10">
                  Siap untuk Viral?
                </h2>
                <p className="text-blue-100 text-lg md:text-xl max-w-xl mx-auto relative z-10 px-4">
                  Daftar sekarang dan rasakan kemudahan membuat konten video pendek berbasis AI.
                </p>
                <div className="relative z-10 pt-4">
                  <Link href="/register">
                    <Button size="lg" className="bg-white text-black hover:bg-gray-100 w-full sm:w-auto px-8 md:px-12 h-14 md:h-16 text-lg md:text-xl font-bold rounded-full shadow-2xl">
                      Mulai Gratis Sekarang
                    </Button>
                  </Link>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-2">
               <Zap className="w-6 h-6 text-blue-500" />
               <span className="font-bold text-xl uppercase tracking-tighter">ClipAIF</span>
           </div>
           <p className="text-gray-500 text-sm">© 2026 ClipAIF Inc. All rights reserved.</p>
           <div className="flex items-center gap-6 text-sm text-gray-400">
               <Link href="#" className="hover:text-white">Privacy Policy</Link>
               <Link href="#" className="hover:text-white">Terms of Service</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
