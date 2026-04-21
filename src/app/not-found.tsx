import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-linear-to-b from-background to-muted/20">
      <div className="relative mb-8">
        <Ghost className="h-32 w-32 text-primary/20 animate-bounce" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-black italic tracking-tighter text-primary">404</span>
        </div>
      </div>
      
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-3xl font-bold tracking-tight">Halaman Tidak Ditemukan</h1>
        <p className="text-muted-foreground leading-relaxed">
          Sepertinya koordinat yang Anda cari tidak ada di galaksi ClipAIF ini. Mari kembali ke markas utama.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Button asChild variant="default" className="w-full sm:w-auto h-12 px-8 rounded-2xl shadow-xl shadow-primary/20">
            <Link href="/dashboard/overview" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Kembali ke Dashboard
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-2xl">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              Landing Page
            </Link>
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
    </div>
  );
}
