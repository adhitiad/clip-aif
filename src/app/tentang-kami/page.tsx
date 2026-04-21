import { Button } from "@/components/ui/button";
import { Users, Target, Rocket, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TentangKamiPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                Misi Kami
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                Membantu Kreator Menguasai <span className="text-primary italic">Masa Depan</span> Digital
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ClipAIF lahir dari kebutuhan mendasar para kreator konten untuk memahami data di balik viralitas. Kami menggabungkan kecerdasan buatan (AI) dengan analisis data real-time untuk memberikan keunggulan kompetitif bagi Anda.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/signup">
                  <Button size="lg" className="px-8 shadow-xl shadow-primary/20">Mulai Sekarang</Button>
                </Link>
                <Link href="/kontak">
                  <Button size="lg" variant="outline" className="px-8">Hubungi Kami</Button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-white/10 group">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-colors duration-500" />
              <div className="relative text-center p-8">
                 <div className="h-20 w-20 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6 shadow-2xl">
                   <span className="text-primary-foreground font-bold text-4xl">C</span>
                 </div>
                 <h2 className="text-2xl font-bold">Inovasi AI untuk Kreator</h2>
                 <p className="text-sm text-muted-foreground mt-2">Dibuat di Indonesia, untuk Seluruh Dunia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nilai Inti Kami</h2>
            <p className="text-muted-foreground">Prinsip-prinsip yang memandu setiap baris kode dan keputusan yang kami buat.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Rocket size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Kecepatan</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dunia digital bergerak cepat. Algoritma kami dirancang untuk memberikan hasil dalam hitungan detik, bukan jam.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Akurasi</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Data tanpa akurasi tidak berguna. Kami terus melatih model kami untuk memberikan prediksi dengan tingkat keberhasilan 98%.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Fokus ke Pengguna</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Setiap fitur dibuat berdasarkan masukan dari komunitas kreator kami. Kesuksesan Anda adalah kesuksesan kami.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Inklusivitas</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Teknologi canggih harus dapat diakses oleh semua orang, mulai dari kreator kecil hingga agensi raksasa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-center">Cerita Kami</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
              <p>
                Dimulai dari sebuah garasi kecil di Jakarta pada tahun 2023, tim insinyur data dan pecinta konten visual kami melihat sebuah pola: jutaan video diunggah setiap hari, tetapi hanya sedikit yang mendapatkan perhatian yang layak.
              </p>
              <p>
                Masalahnya bukan selalu pada kualitas konten—seringkali, itu adalah masalah menempatkan konten yang tepat di niche yang tepat pada waktu yang tepat.
              </p>
              <p>
                Itulah mengapa kami membangun ClipAIF. Kami ingin menghilangkan unsur "keberuntungan" dari viralitas dan menggantinya dengan analitik yang dapat ditindaklanjuti. Hingga saat ini, kami telah membantu lebih dari 10.000 kreator melipatgandakan engagement mereka hingga 10x lipat dalam waktu kurang dari 3 bulan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
